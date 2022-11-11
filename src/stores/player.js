/**
 * 关于播放器的全局状态
 **/
import { defineStore } from 'pinia'
import { PLAY_MODE, FAVORITE_KEY } from '@/constant/constant'
import { randomPlay } from '@/utils/tool'
import { load } from '@/utils/array-storage'
export const usePlayerStore = defineStore('player', {
  state() {
    return {
      // 原始播放列表
      sequenceList: [],
      // 真实播放列表
      playList: [],
      // 喜欢的音乐列表
      favoriteList: load(FAVORITE_KEY),
      // 正在播放状态
      playing: false,
      // 播放模式 默认为0顺序播放
      playMode: PLAY_MODE.sequence,
      // 当前播放索引
      currentIndex: 0,
      // 当前播放器打开状态 默认为收缩状态
      fullScreen: false
    }
  },
  getters: {
    // 当前播放的歌曲
    currentSong: (state) => {
      return state.playList[state.currentIndex] || {}
    }
  },
  actions: {
    // 选择播放
    setSequencePlayer({ list, index }) {
      // 设置原始播放列表
      this.sequenceList = [...list]
      // 设置真实播放列表
      this.playList = [...list]
      // 设置播放器状态
      this.playing = true
      // 设置播放模式
      this.playMode = PLAY_MODE.sequence
      // 设置当前播放歌曲索引
      this.currentIndex = index
      // 设置播放器打开状态 收缩为false 打开为true
      this.fullScreen = true
    },
    // 随机播放
    setRandomPlayer({ list }) {
      // 设置原始播放列表
      this.sequenceList = [...list]
      // 设置真实播放列表
      this.playList = randomPlay(list)
      // 设置播放器状态
      this.playing = true
      // 设置播放模式
      this.playMode = PLAY_MODE.random
      // 设置当前播放歌曲索引
      this.currentIndex = 0
      // 设置播放器打开状态 收缩为false 打开为true
      this.fullScreen = true
    },
    // 切换模式
    changeMode() {
      // 改变播放模式
      this.playMode = (this.playMode + 1) % 3
      // 获取当前歌曲的id
      const currentSongId = this.currentSong.id
      switch (this.playMode) {
        case PLAY_MODE.random:
          this.playList = randomPlay(this.sequenceList)
          break
        case PLAY_MODE.sequence:
          this.playList = [...this.sequenceList]
          break
      }
      // 切换模式但是不切换歌曲
      this.currentIndex = this.playList.findIndex(song => song.id === currentSongId)
    }
  }
})
