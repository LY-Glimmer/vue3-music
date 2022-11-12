<!-- 搜索页面组件 -->
<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-input-wrapper">
      <SearchInput v-model="query"></SearchInput>
    </div>
    <Scroll ref="scrollRef" class="search-content" v-show="!query">
      <div>
        <!-- 热词 -->
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKeys" :key="item.id" @click="addQuery(item.key)">
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <!-- 搜索历史 -->
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <Confirm ref="confirmRef" text="是否清空所有搜索历史" confirm-btn-text="清空" @confirm="clearSearch">
          </Confirm>
          <!-- 历史记录 -->
          <SearchList :searches="searchHistory" @select="addQuery" @delete="deleteSearch"></SearchList>
        </div>
      </div>
    </Scroll>
    <!-- 搜索结果 -->
    <div class="search-result" v-show="query">
      <Suggest :query="query" @select-song="selectSong" @select-singer="selectSinger"></Suggest>
    </div>
    <!-- 歌手详情 -->
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import SearchInput from '@/components/Search/SearchInput.vue'
import Suggest from '@/components/Search/Suggest.vue'
import SearchList from '@/components/Search/SearchList.vue'
import Confirm from '@/components/base/Confirm/index.vue'
import { ref, computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
// import { getHotKeys } from '@/service/search'
import Scroll from '@/components/WrapScroll/index'
import { usePlayerStore } from '@/stores/player'
import storage from 'good-storage'
import { SING_KEY } from '@/constant/constant'
import useSearchHistory from '@/components/Search/use-search-history'
// 搜索内容双向绑定
const query = ref('')

// 滚动
const scrollRef = ref(null)
function refreshScroll() {
  scrollRef.value.scroll.refresh()
}
watch(query, async () => {
  await nextTick()
  refreshScroll()
})
// 获取热词
const hotKeys = ref([])
const getHotKeysData = async () => {
  // 接口不行咯
  // const res = await getHotKeys()
  hotKeys.value = [{
    id: 1,
    key: '富强'
  }, {
    id: 2,
    key: '民主'
  }, {
    id: 3,
    key: '文明'
  }, {
    id: 4,
    key: '和谐'
  }, {
    id: 5,
    key: '自由'
  }, {
    id: 6,
    key: '平等'
  }, {
    id: 7,
    key: '公正'
  }, {
    id: 8,
    key: '法治'
  }, {
    id: 9,
    key: '爱岗'
  }, {
    id: 10,
    key: '敬业'
  }, {
    id: 11,
    key: '诚信'
  }, {
    id: 12,
    key: '友善'
  }]
}
getHotKeysData()

// 点击热词
const addQuery = (val) => {
  query.value = val
}
const playerStore = usePlayerStore()
// 点击了歌曲
const selectSong = (song) => {
  saveSearch(query.value)
  const playIndex = playerStore.playList.findIndex(item => item.id === song.id)
  if (playIndex > -1) {
    playerStore.currentIndex = playIndex
  } else {
    playerStore.playList.push(song)
    playerStore.currentIndex = playerStore.playList.length - 1
  }
  const sequenceIndex = playerStore.sequenceList.findIndex(item => item.id === song.id)
  if (sequenceIndex === -1) {
    playerStore.sequenceList.push(song)
  }
  playerStore.playing = true
  playerStore.fullScreen = true
}
// 点击了歌手
const router = useRouter()
const selectedSinger = ref(null)
const selectSinger = (singer) => {
  saveSearch(query.value)

  selectedSinger.value = singer
  storage.session.set(SING_KEY, singer)
  router.push({
    path: `/search/${singer.mid}`
  })
}
const confirmRef = ref(null)
const showConfirm = () => {
  confirmRef.value.show()
}
// 搜索历史
const searchHistory = computed(() => playerStore.searchHistory)

// 保存搜索记录
const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .search-input-wrapper {
    margin: 20px;
  }

  .search-content {
    flex: 1;
    overflow: hidden;

    .hot-keys {
      margin: 0 20px 20px 20px;

      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }

      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 18px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }

    .search-history {
      position: relative;
      margin: 0 20px;

      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;

        .text {
          flex: 1;
        }

        .clear {
          @include extend-click();

          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }

  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
