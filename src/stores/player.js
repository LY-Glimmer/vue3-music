/**
 * 关于播放器的全局状态
 **/
import { defineStore } from 'pinia'
import { PLAY_MODE } from '@/utils/constant'
export const useStore = defineStore('player', {
  state() {
    return {
      // 原始播放列表
      sequenceList: [],
      // 真实播放列表
      playList: [],
      // 正在播放状态
      playing: false,
      // 播放模式 默认为0顺序播放
      playMode: PLAY_MODE.sequence,
      // 当前播放索引
      currentIndex: 0,
      // 当前播放器状态 默认为收缩状态
      fullScreen: false
    }
  },
  getters: {
    // 当前播放的歌曲
    currentSong: (state) => {
      return state.playList[state.currentIndex]
    }
  },
  actions: {
    // 选择播放 通过传递的参数统一设置播放器状态
    setPlayer({ list, index }) {
      this.sequenceList = list
      this.playList = list
      this.playing = true
      this.playMode = PLAY_MODE.sequence
      this.currentIndex = index
      this.fullScreen = true
    }
  }
})
