<template>
  <teleport to="body">
    <transition name="list-fade">
      <div class="playlist" v-show="visible && playlist.length" @click="hide">
        <!-- 内容 -->
        <div class="list-wrapper" @click.stop>
          <!-- 播放模式 -->
          <div class="list-header">
            <h1 class="title">
              <i class="icon" :class="modeIcon" @click="changeMode">
              </i>
              <span class="text">{{ modeText }}</span>
              <!-- 清空 -->
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
          </div>
          <!-- 播放列表 -->
          <Scroll ref="scrollRef" class="list-content">
            <transition-group ref="listRef" name="list" tag="ul">
              <li class="item" v-for="song in sequenceList" :key="song.id" @click="selectItem(song)">
                <!-- 当前播放歌曲 -->
                <i class="current" :class="getCurrentIcon(song)"></i>
                <span class="text">{{ song.name }}</span>
                <!-- 是否喜欢 -->
                <span class="favorite" @click.stop="toggleFavorite(song)">
                  <i :class="getFavoriteIcon(song)"></i>
                </span>
                <!-- 删除歌曲 -->
                <span class="delete" @click.stop="removeSong(song)">
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </Scroll>
          <!-- 添加 -->
          <div class="list-add">
            <div class="add" @click="showAddSong">
              <i class="icon-add"></i>
              <span class="text">添加歌曲到队列</span>
            </div>
          </div>
          <!-- 关闭 -->
          <div class="list-footer" @click.stop="hide">
            <span>关闭</span>
          </div>
          <Confirm ref="confirmRef" @confirm="confirmClear" text="是否清空播放列表？" confirm-btn-text="清空">
          </Confirm>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import Scroll from '@/components/Scroll/index.vue'
import Confirm from '@/components/base/Confirm/index.vue'
import { ref, defineExpose, computed, nextTick, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useMode } from '../useMode'
import { useFavorite } from '../useFavorite'
// 控制显示和隐藏
const visible = ref(false)
// 滚动列表实例
const scrollRef = ref(null)
// 是否删除完毕
const removing = ref(false)
// 歌曲列表实例
const listRef = ref(null)
// 确认框实例
const confirmRef = ref(null)

const playerStore = usePlayerStore()

const playlist = computed(() => playerStore.playList)
const sequenceList = computed(() => playerStore.sequenceList)
// 正在播放的歌曲添加一个icon
const getCurrentIcon = (song) => {
  return song.id === playerStore.currentSong.id ? 'icon-play' : ''
}
// 重新计算
const refreshScroll = () => {
  scrollRef.value.scroll.refresh()
}
// 滚动到当前的歌曲
const scrollToCurrent = () => {
  const index = playerStore.sequenceList.findIndex((song) => playerStore.currentSong.id === song.id)
  if (index === -1) return
  const target = listRef.value.$el.children[index]
  scrollRef.value.scroll.scrollToElement(target, 300)
}

// 切换歌曲
const selectItem = (song) => {
  playerStore.currentIndex = playlist.value.findIndex((item) => song.id === item.id)
}

// 监听歌曲变化
watch(() => playerStore.currentSong, async (newSong) => {
  if (!visible.value || !newSong.id) return
  await nextTick()
  scrollToCurrent()
})

// 删除歌曲
const removeSong = (song) => {
  if (removing.value) return
  removing.value = true

  const sequenceIndex = sequenceList.value.findIndex((sequenceItem) => sequenceItem.id === song.id)
  const playListIndex = playlist.value.findIndex((playListItem) => playListItem.id === song.id)
  if (sequenceIndex < 0 || playListIndex < 0) return

  playerStore.sequenceList.splice(sequenceIndex, 1)
  playerStore.playList.splice(playListIndex, 1)

  if (playerStore.currentIndex > playListIndex || playerStore.currentIndex === playlist.value.length) {
    playerStore.currentIndex--
  }

  setTimeout(() => {
    removing.value = false
  }, 300)

  if (playlist.value.length === 0) {
    playerStore.playing = false
    visible.value = false
  }
}

// 隐藏
const hide = () => {
  visible.value = false
}
// 显示
const show = async () => {
  visible.value = true
  await nextTick()
  refreshScroll()
  scrollToCurrent()
}
// 清空播放列表
const showConfirm = () => {
  confirmRef.value.show()
}
const confirmClear = () => {
  playerStore.sequenceList = []
  playerStore.playList = []
  playerStore.currentIndex = 0
  playerStore.playing = false
  visible.value = false
}
// 播放器状态 hooks
const {
  modeIcon,
  modeText,
  changeMode
} = useMode()
// 歌曲是否喜欢 hooks
const {
  getFavoriteIcon,
  toggleFavorite
} = useFavorite()

defineExpose({
  show
})
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;

  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity .3s;

    .list-wrapper {
      transition: all .3s;
    }
  }

  &.list-fade-enter-from,
  &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  .list-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 210;
    width: 100%;
    background-color: $color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 24px;
          color: $color-theme;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
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

    .list-content {
      max-height: 240px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme;
        }

        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }

        .favorite {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;

          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }
        }
      }
    }

    .list-add {
      width: 140px;
      margin: 20px auto 30px auto;

      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;

        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }

        .text {
          font-size: $font-size-small;
        }
      }
    }

    .list-footer {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>
