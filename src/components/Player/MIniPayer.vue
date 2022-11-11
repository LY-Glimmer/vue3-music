<!-- 迷你播放器 -->
<template>
  <transition name="mini">
    <div class="mini-player" @click="showNormalPlayer" v-show="!playerStore.fullScreen">
      <!-- 图片 -->
      <div class="cd-wrapper" ref="cdWrapperRef">
        <div ref="cdRef" class="cd">
          <img ref="cdImageRef" width="40" height="40" :class="cdClass" :src="playerStore.currentSong.pic">
        </div>
      </div>
      <!-- 歌曲信息 -->
      <div ref="sliderWrapperRef" class="slider-wrapper">
        <div class="slider-group">
          <div class="slider-page" v-for="song in playerStore.playList" :key="song.id">
            <h2 class="name">{{ song.name }}</h2>
            <p class="desc">{{ song.singer }}</p>
          </div>
        </div>
      </div>
      <!-- 播放按钮 -->
      <div class="control">
        <ProgressCircle :radius="32" :progress="progress">
          <i class="icon-mini" :class="miniPlayIcon" @click.stop="togglePlay"></i>
        </ProgressCircle>
      </div>
      <!-- 歌曲列表 -->
      <div class="control" @click.stop="showPlaylist">
        <i class="icon-playlist"></i>
      </div>
      <!-- 播放列表 -->
      <PlayList ref="playListRef"></PlayList>
    </div>
  </transition>
</template>

<script setup>
import ProgressCircle from './components/ProgressCircle.vue'
import { usePlayerStore } from '@/stores/player'
import { useCd } from './useCd'
import { ref, defineProps, computed } from 'vue'
import PlayList from './components/PlayList.vue'
// 手指滑动切歌
import { useMiniSlider } from './useMiniSlider'
// 唱片的动画
import { useAnimation } from './useAnimation'
defineProps({
  // 进度
  progress: {
    type: Number,
    default: 0
  },
  togglePlay: {
    type: Function
  }
})

const playerStore = usePlayerStore()
// 播放列表ref
const playListRef = ref(null)
// 显示播放列表
const showPlaylist = () => {
  playListRef.value.show()
}
// 点击了迷你播放器
const showNormalPlayer = () => {
  playerStore.fullScreen = true
}
// 迷你播放器Icon
const miniPlayIcon = computed(() => {
  return playerStore.playing ? 'icon-pause-mini' : 'icon-play-mini'
})

/**
 * 唱片的相关逻辑
 **/
const {
  cdClass,
  cdImageRef,
  cdRef
} = useCd()
/**
 * 手指滑动切歌
 **/
const { sliderWrapperRef } = useMiniSlider()
/**
 * 唱片的动画
 **/
const { cdWrapperRef } = useAnimation()
</script>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-highlight-background;

  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;

    .cd {
      height: 100%;
      width: 100%;

      img {
        border-radius: 50%;

        &.playing {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }

  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;

    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;

      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;

        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }

        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }

  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;

    .icon-playlist {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-theme;
    }

    .icon-mini {
      position: absolute;
      left: 0;
      top: 0;
      color: $color-theme-d;
      font-size: 32px;
    }
  }

  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }

  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0)
  }
}
</style>
