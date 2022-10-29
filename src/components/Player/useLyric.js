/*
 * @Author: LY_Glimmer
 * @Date: 2022-10-21 21:09:26
 * @Last Modified by: LY_Glimmer
 * @Last Modified time: 2022-10-29 14:53:49
 */

// 歌词相关
import { usePlayerStore } from '@/stores/player'
import { watch, ref } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'

export const useLyric = ({ isSongReady, currentTime }) => {
  const playerStore = usePlayerStore()
  // 当前的歌词
  const currentLyric = ref(null)
  // 当前正在播放的歌词
  const playingLyric = ref(null)
  // 无歌词情况
  const pureMusicLyric = ref(null)
  // 当前显示的行号
  const currentLineNum = ref(0)
  // 滚动组件实例
  const lyricScrollRef = ref(null)
  // 歌词列表DOM
  const lyricListRef = ref(null)
  // 监听歌曲变化
  watch(() => playerStore.currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) return
    /*
      切换之前先停止歌词 并且清理
      解决当歌曲准备完毕之后触发歌词播放此时歌词还没返回的情况
      那么歌词就以上一首的歌词来播放了会导致来回歌词来回跳
     */
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = null
    pureMusicLyric.value = null
    playingLyric.value = null
    // 获取歌词
    const lyric = await getLyric(newSong)
    // 如果歌曲上没有歌词那么请求去获取歌词
    newSong.lyric = lyric
    // 如果当前歌曲的歌词的歌词不等于获取的歌词 那么什么事情都不做
    if (playerStore.currentSong.lyric !== lyric) return
    // 把解析的歌词赋值给当前的歌词
    currentLyric.value = new Lyric(lyric, handleLyric)
    // 无歌词情况
    const hasLyric = currentLyric.value.lines.length
    // 如果解析出歌词
    if (hasLyric) {
      // 如果歌曲就绪
      if (isSongReady.value) {
        playLyric()
      }
    } else {
      // 如果当前没有歌词
      playingLyric.value = pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, '')
    }
  })

  // 歌词回调
  const handleLyric = ({ lineNum, txt }) => {
    currentLineNum.value = lineNum
    // 给当前正在播放的歌词赋值
    playingLyric.value = txt
    // 滚动组件实例
    const scrollComp = lyricScrollRef.value
    // 滚动列表DOM
    const listEl = lyricListRef.value
    // 如果列表不存在
    if (!listEl) return
    // console.log('lineNum', lineNum)
    if (lineNum > 5) {
      // 保持歌词在中间
      const lineEl = listEl.children[lineNum - 5]
      // 滚动到当前DOM
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollToElement(0, 0, 1000)
    }
  }
  // 播放歌词
  const playLyric = () => {
    currentLyric.value && currentLyric.value.seek(currentTime.value * 1000)
  }
  // 停止播放歌词
  const stopLyric = () => {
    currentLyric.value && currentLyric.value.stop()
  }
  return {
    currentLyric,
    currentLineNum,
    playLyric,
    lyricScrollRef,
    lyricListRef,
    stopLyric,
    pureMusicLyric,
    playingLyric
  }
}
