<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" alt="">
      </div>
      <!-- 顶部 -->
      <div class="top">
        <div class="back" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{currentSong.name}}</h1>
        <h2 class="subtitle">{{currentSong.singer}}</h2>
      </div>
      <!-- 操作按钮 -->
      <div class="bottom">
        <!-- 进度条 -->
        <div class="progress-wrapper">
          <!-- 已播放时间 -->
          <span class="time time-l">{{formatTime(currentTime)}}</span>
          <!-- 进度 -->
          <div class="progress-bar-wrapper">
            <progressBar :progress="progress"></progressBar>
          </div>
          <!-- 总时间 -->
          <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
        </div>
        <div class="operators">
          <!-- 切换播放状态 -->
          <div class="icon i-left">
            <i :class="modeIcon" @click="changeMode"></i>
          </div>
          <!-- 上一首 -->
          <div class="icon i-left" :class="disableCls">
            <i @click="prev" class="icon-prev"></i>
          </div>
          <!-- 开始 暂停 -->
          <div class="icon i-center" :class="disableCls">
            <i @click="togglePlay" :class="playIcon"></i>
          </div>
          <!-- 下一首 -->
          <div class="icon i-right" :class="disableCls">
            <i @click="next" class="icon-next"></i>
          </div>
          <!-- 是否喜欢 -->
          <div class="icon i-right">
            <i @click="toggleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 音乐播放 -->
    <audio ref="audioRef" @pause="pause" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script setup>
import progressBar from './components/progress-bar.vue'
import { ref, computed, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'
// 处理时间
import { formatTime } from '@/utils/tool'
// 处理播放模式
import { useMode } from './useMode'
// 处理是否喜欢
import { useFavorite } from './useFavorite'
const playerStore = usePlayerStore()
// 音乐DOM
const audioRef = ref(null)
// 控制歌曲是否已经就绪
const isSongReady = ref(false)
// 已播放时间
const currentTime = ref(0)

// 当前播放器状态
const fullScreen = computed(() => {
  return playerStore.fullScreen
})
// 当前播放的歌曲
const currentSong = computed(() => {
  return playerStore.currentSong
})
// 播放按钮样式
const playIcon = computed(() => {
  return playerStore.playing ? 'icon-pause' : 'icon-play'
})
// 按钮的样式
const disableCls = computed(() => {
  return isSongReady.value ? '' : 'disable'
})
// 当前播放的进度
const progress = computed(() => {
  return currentTime.value / currentSong.value.duration
})

// 监听当前音乐的变化
watch(currentSong, (newSong) => {
  if (!newSong.id || !newSong.url) return
  // 歌曲发生变化改变isSongReady要为false
  isSongReady.value = false
  // 歌曲发生变化的时候当前播放时间要重置
  currentTime.value = 0
  // 替换歌曲url
  audioRef.value.src = newSong.url
  // 播放歌曲
  audioRef.value.play()
})

// 监听播放状态
watch(() => playerStore.playing, (newPlaying) => {
  // 如果歌曲没有就绪
  if (!isSongReady.value) return
  newPlaying ? audioRef.value.play() : audioRef.value.pause()
})

// 关闭
const goBack = () => {
  playerStore.fullScreen = false
}
// 点击了播放按钮
const togglePlay = () => {
  if (!isSongReady.value) return
  playerStore.playing = !playerStore.playing
}
// audio因各种原因停止播放
const pause = () => {
  playerStore.playing = false
}
// 歌曲已经就绪
const ready = () => {
  if (isSongReady.value) return
  isSongReady.value = true
}
// 只有一首歌曲的时候 从头开始播放
const loop = () => {
  const audioElement = audioRef.value
  // 从头开始播放
  audioElement.currentTime = 0
  audioElement.play()
}
// 点击了上一首
const prev = () => {
  // 如果列表中没有歌曲或者歌曲没有就绪
  if (playerStore.playList.length === 0 || !isSongReady.value) return
  // 如果列表中就一首歌曲 那么执行循环播放
  if (playerStore.playList.length === 1) return loop()
  // 歌曲的索引-1
  playerStore.currentIndex -= 1
  // 如果是第一首歌曲 那么上一首歌就是最后一首歌曲
  if (playerStore.currentIndex === -1) {
    playerStore.currentIndex = playerStore.playList.length - 1
  }
  // 处理播放按钮 为打开状态
  if (!playerStore.playing) {
    playerStore.playing = true
  }
}
// 点击了下一首
const next = () => {
  // 如果列表中没有歌曲或者歌曲没有就绪
  if (playerStore.playList.length === 0 || !isSongReady.value) return
  // 如果列表中就一首歌曲 那么执行循环播放
  if (playerStore.playList.length === 1) return loop()
  // 歌曲的索引+1
  playerStore.currentIndex += 1
  // 如果是最后一首歌 那么下一首歌就是第一首歌
  if (playerStore.currentIndex === playerStore.playList.length) {
    playerStore.currentIndex = 0
  }
  // 处理播放按钮 为打开状态
  if (!playerStore.playing) {
    playerStore.playing = true
  }
}
// 歌曲出错了
const error = () => {
  isSongReady.value = true
}
// 监听歌曲的播放时间
const updateTime = (event) => {
  currentTime.value = event.target.currentTime
}
// hooks
/**
 * 切换播放状态
 **/
const { modeIcon, changeMode } = useMode()
/**
 * 切换喜欢与不喜欢
 **/
const { getFavoriteIcon, toggleFavorite } = useFavorite()
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }

      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;

            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }

            .playing {
              animation: rotate 20s linear infinite
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }

          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.normal-enter-active,
    &.normal-leave-active {
      transition: all .6s;

      .top,
      .bottom {
        transition: all .6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }

    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0)
      }
    }
  }
}
</style>
