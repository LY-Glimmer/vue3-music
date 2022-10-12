<!-- 歌手详情 -->
<template>
  <div class="singer-detail">
    <SingerList :loading="loading" :songs="songsList" :pic="pic" :title="title"></SingerList>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import SingerList from '@/components/MusicList/index.vue'
import { SING_KEY } from '@/utils/constant'
import storage from 'good-storage'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps({
  singer: {
    type: Object
  }
})
// 照片
const pic = computed(() => {
  const singer = computedSinger.value
  return singer && singer.pic
})
// 标题
const title = computed(() => {
  const singer = computedSinger.value
  return singer && singer.name
})
const route = useRoute()
const router = useRouter()
// 从缓存或者参数中拿到数据
const computedSinger = computed(() => {
  const cacheSinger = storage.session.get(SING_KEY)
  // 如果参数里有直接用参数里的 不然从缓存里拿 缓存里拿到的不对那也不能用
  const singer = props.singer
    ? props.singer : (cacheSinger && cacheSinger.mid === route.params.id)
      ? cacheSinger : null
  return singer
})
// 加载
const loading = ref(true)
// 获取歌手详情歌曲列表
const songsList = ref([])
const getSingerDetailData = async () => {
  if (!computedSinger.value) {
    const path = route.matched[0].path
    return router.push(path)
  }
  const result = await getSingerDetail(computedSinger.value)
  const songs = await processSongs(result.songs)
  songsList.value = songs
  loading.value = false
  // console.log(songsList.value, 'songs')
}
getSingerDetailData()
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
