<!-- 音乐列表 -->
<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" ref="titleRef">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImageRef">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div @click="randomPlayAll" class="play-btn" v-show="songs.length > 0">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <Scroll @scroll="onScroll" class="list" v-loading="loading" v-empty:[emptyText]="isEmpty" :probeType="3"
      :style="scrollStyle">
      <div class="song-list-wrapper">
        <SongList @select="selectSong" :songs="songs"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'
import SongList from '@/components/base/SongList/index.vue'
import Scroll from '@/components/Scroll'
import { useRouter } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
const props = defineProps({
  // 歌手的名字
  title: {
    type: String
  },
  // 歌手照片
  pic: {
    type: String
  },
  // 用于渲染列表的数据
  songs: {
    type: Array,
    default() {
      return []
    }
  },
  // 控制加载loading效果
  loading: {
    type: Boolean
  },
  // 数据为空时候的提示文字
  emptyText: {
    type: String,
    default: '抱歉，没有找到可播放的歌曲'
  }
})
// 获取路由
const router = useRouter()
// 图片的高度
const bgImageRef = ref(null)
const imgHeight = ref(0)
onMounted(() => {
  // 计算图片容器的高度
  imgHeight.value = bgImageRef.value.clientHeight
  // 计算可以滚动的最大距离 图片容器高度 - 标题的高度 = 歌曲列表可以滚动的最大距离
  maxTranslateY.value = imgHeight.value - titleHeight.value
})
const bgImageStyle = computed(() => {
  // 默认层级
  let zIndex = 0
  // 默认padding
  let paddingTop = '70%'
  let height = 0
  // 解决IOS端层级的问题 兼容
  let translateZ = 0
  // 缩放
  let scale = 1
  if (scrollY.value < 0) {
    scale = 1 + Math.abs(scrollY.value / imgHeight.value)
  }
  // 如果y轴滚动的距离大于它能滚动的最大距离那么此时改变样式
  if (scrollY.value > maxTranslateY.value) {
    zIndex = 10
    paddingTop = 0
    height = titleHeight.value + 'px'
    // 解决IOS端层级的问题 兼容
    translateZ = 1
  }
  return {
    paddingTop,
    height,
    zIndex,
    backgroundImage: `url(${props.pic})`,
    transform: `scale(${scale}) translateZ(${translateZ}px)`
  }
})
// 滚动层的样式
const scrollStyle = computed(() => {
  return {
    top: imgHeight.value + 'px'
  }
})
// 遮罩层的样式
const filterStyle = computed(() => {
  let blur = 0
  // 往上推的时候
  if (scrollY.value >= 0) {
    blur = Math.min(maxTranslateY.value / imgHeight.value, (scrollY.value / imgHeight.value)) * 20
  }
  return {
    backdropFilter: `blur(${blur}px)`
  }
})
// 随机播放按钮样式
const playBtnStyle = computed(() => {
  return {
    // 滚动距离大于最大滚动距离时候 隐藏随机播放按钮
    display: scrollY.value > maxTranslateY.value ? 'none' : 'block'
  }
})
// 数据是不是空的
const isEmpty = computed(() => {
  return !props.loading && !props.songs.length
})
// 标题的高度 用于计算列表滚动的最大距离
const titleRef = ref(null)
const titleHeight = computed(() => {
  return titleRef.value.clientHeight
})
// y轴滚动距离
const scrollY = ref(0)
// 最大滚动距离
const maxTranslateY = ref(0)
// 监听滚动事件
const onScroll = (pos) => {
  scrollY.value = -pos.y
}
// 返回按钮被点击
const goBack = () => {
  router.back()
}
// 选择了某一首歌
const playerStore = usePlayerStore()
const selectSong = ({ song, index }) => {
  playerStore.setSequencePlayer({
    list: props.songs,
    index
  })
}
// 随机播放全部
const randomPlayAll = () => {
  playerStore.setRandomPlayer({
    list: props.songs
  })
}
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    padding-top: 70%;
    height: 0;
    transform-origin: top;
    background-size: cover;

    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;

      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }

      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }

      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;

    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
