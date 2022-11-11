<!-- 推荐详情 -->
<template>
  <div class="singer-detail">
    <MusicList :loading="loading" :songs="songsList" :pic="pic" :title="title"></MusicList>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'
import { getAlbum } from '@/service/recommend'
import { processSongs } from '@/service/song'
import MusicList from '@/components/MusicList/index.vue'
import { ALBUM_KEY } from '@/constant/constant'
import storage from 'good-storage'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps({
  album: {
    type: Object
  }
})
// 照片
const pic = computed(() => {
  const album = computedAlbum.value
  return album && album.pic
})
// 标题
const title = computed(() => {
  const album = computedAlbum.value
  return album && album.name
})
const route = useRoute()
const router = useRouter()
// 从缓存或者参数中拿到数据
const computedAlbum = computed(() => {
  const cacheAlbum = storage.session.get(ALBUM_KEY)
  // 如果参数里有直接用参数里的 不然从缓存里拿 缓存里拿到的不对那也不能用
  const album = props.album
    ? props.album : (cacheAlbum && cacheAlbum.mid === route.params.id)
      ? cacheAlbum : null
  return album
})
// 加载
const loading = ref(true)
// 获取推荐歌曲数据
const songsList = ref([])
const getAlbumDetailData = async () => {
  if (!computedAlbum.value) {
    const path = route.matched[0].path
    return router.push(path)
  }
  const result = await getAlbum(computedAlbum.value)
  const songs = await processSongs(result.songs)
  songsList.value = songs
  loading.value = false
}
getAlbumDetailData()
</script>
<style scoped lang='scss'>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
