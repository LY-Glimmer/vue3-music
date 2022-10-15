/**
 * 处理是否喜欢
 **/
import { usePlayerStore } from '@/stores/player'
import { save, remove } from '@/utils/array-storage'
import { FAVORITE_KEY } from '@/constant/constant'
export const useFavorite = () => {
  const playerStore = usePlayerStore()
  // 判断当前是不是喜欢
  const isFavorite = (song) => {
    return playerStore.favoriteList.some(item => song.id === item.id)
  }
  // 是不是喜欢的icon类名
  const getFavoriteIcon = (song) => {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }

  // 点击了是否喜欢的按钮
  const toggleFavorite = (song) => {
    // 比对函数
    const compare = (item) => item.id === song.id
    // 如果喜欢就移除 不喜欢就添加
    let list = null
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare)
    } else {
      list = save(song, FAVORITE_KEY, compare)
    }
    playerStore.favoriteList = list
  }
  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
