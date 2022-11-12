<template>
  <div ref="rootRef" class="suggest" v-loading:[loadingText]="loading" v-empty:[noResultText]="noResult">
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li class="suggest-item" v-for="song in songs" :key="song.id" @click="selectSong(song)">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">
            {{ song.singer }}-{{ song.name }}
          </p>
        </div>
      </li>
    </ul>
    <div class="suggest-item" v-loading:[loadingText]="pullUpLoading"></div>
  </div>
</template>

<script>
import { ref, watch, computed, nextTick } from 'vue'
import { search } from '@/service/search'
import { processSongs } from '@/service/song'
import usePullUpLoad from './use-pull-upload'

export default {
  name: 'suggest',
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select-song', 'select-singer'],
  setup(props, { emit }) {
    const singer = ref(null)
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(1)
    const loadingText = ref(' ')
    const noResultText = ref('抱歉，暂无搜索结果')
    const manualLoading = ref(false)
    // 加载中
    const loading = computed(() => {
      return !singer.value && songs.value.length === 0 && !noResult.value
    })
    // 无结果
    const noResult = computed(() => {
      return !singer.value && songs.value.length === 0 && !hasMore.value
    })
    // 上拉加载
    const pullUpLoading = computed(() => {
      return isPullUpLoad.value && hasMore.value
    })
    // 停止
    const preventPullUpLoad = computed(() => {
      return loading.value || manualLoading.value
    })

    // 上拉加载
    const {
      isPullUpLoad,
      rootRef,
      scroll
    } = usePullUpLoad(searchMore, preventPullUpLoad)
    // 关键词变化 重新搜索
    watch(() => props.query, async (newQuery) => {
      if (!newQuery) {
        return
      }
      await searchFirst()
    })

    // 初始化搜索
    async function searchFirst() {
      if (!props.query) {
        return
      }
      page.value = 1
      songs.value = []
      singer.value = null
      hasMore.value = true

      const result = await search(props.query, page.value, props.showSinger)
      songs.value = await processSongs(result.songs)
      singer.value = result.singer
      hasMore.value = result.hasMore
      await nextTick()
      await makeItScrollable()
    }

    // 搜索更多
    async function searchMore() {
      if (!hasMore.value || !props.query) {
        return
      }
      page.value++
      const result = await search(props.query, page.value, props.showSinger)
      songs.value = songs.value.concat(await processSongs(result.songs))
      hasMore.value = result.hasMore
      await nextTick()
      await makeItScrollable()
    }
    // 不满一屏幕查询下一页
    async function makeItScrollable() {
      if (scroll.value.maxScrollY >= -1) {
        manualLoading.value = true
        await searchMore()
        manualLoading.value = false
      }
    }
    // 选择了歌曲
    function selectSong(song) {
      emit('select-song', song)
    }
    // 选择歌手
    function selectSinger(singer) {
      emit('select-singer', singer)
    }

    return {
      singer,
      songs,
      loadingText,
      noResultText,
      loading,
      noResult,
      pullUpLoading,
      selectSong,
      selectSinger,
      // pullUpLoad
      rootRef
    }
  }
}
</script>

<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;

      .icon {
        flex: 0 0 30px;
        width: 30px;

        [class^="icon-"] {
          font-size: 14px;
          color: $color-text-d;
        }
      }

      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;

        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>
