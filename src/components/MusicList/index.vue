<!-- 音乐列表 -->
<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImageRef">
      <!-- <div class="play-btn-wrapper">
        <div class="play-btn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div> -->
      <!-- <div class="filter"></div> -->
    </div>
    <Scroll @scroll="onScroll" class="list" v-loading="loading" :probeType="3" :style="scrollStyle">
      <div class="song-list-wrapper">
        <SongList :songs="songs"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted } from 'vue'
import SongList from '@/components/base/SongList/index.vue'
import Scroll from '@/components/Scroll'
const props = defineProps({
  title: {
    type: String
  },
  pic: {
    type: String
  },
  songs: {
    type: Array,
    default() {
      return []
    }
  },
  loading: {
    type: Boolean
  }
})
// 图片的高度
const bgImageRef = ref(null)
const imgHeight = ref(0)
onMounted(() => {
  imgHeight.value = bgImageRef.value.clientHeight
  maxTranslateY.value = imgHeight.value - 40
})
const bgImageStyle = computed(() => {
  // 默认层级
  let zIndex = 0
  // 默认padding
  let paddingTop = '70%'
  let height = 0
  // 解决IOS端层级的问题
  let translateZ = 0
  // 如果y轴滚动的距离大于它能滚动的最大距离那么此时改变样式
  if (scrollY.value > maxTranslateY.value) {
    zIndex = 10
    paddingTop = 0
    height = 40 + 'px'
    translateZ = 1
  }
  return {
    paddingTop,
    height,
    zIndex,
    backgroundImage: `url(${props.pic})`,
    transform: `translateZ(${translateZ}px)`
  }
})
const scrollStyle = computed(() => {
  return {
    top: imgHeight.value + 'px'
  }
})
// y轴滚动距离
const scrollY = ref(0)
// 最大滚动距离
const maxTranslateY = ref(0)
// 监听滚动事件
const onScroll = (pos) => {
  scrollY.value = -pos.y
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
