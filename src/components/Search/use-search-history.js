/*
 * @Author: LY_Glimmer
 * @Date: 2022-11-12 16:51:55
 * @Last Modified by: LY_Glimmer
 * @Last Modified time: 2022-11-12 17:02:21
 */
// 保存查询关键字
import { save, remove, clear } from '@/utils/array-storage'
import { SEARCH_KEY } from '@/constant/constant'
import { usePlayerStore } from '@/stores/player'

export default function useSearchHistory() {
  const maxLen = 200

  const playerStore = usePlayerStore()

  function saveSearch(query) {
    const searches = save(query, SEARCH_KEY, (item) => {
      return item === query
    }, maxLen)
    console.log(searches)
    playerStore.searchHistory = searches
  }

  function deleteSearch(query) {
    const searches = remove(SEARCH_KEY, (item) => {
      return item === query
    })
    playerStore.searchHistory = searches
  }

  function clearSearch() {
    const searches = clear(SEARCH_KEY)
    playerStore.searchHistory = searches
  }

  return {
    saveSearch,
    deleteSearch,
    clearSearch
  }
}
