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
const props = defineProps({
  singer: {
    type: Object
  }
})
// 照片
const pic = computed(() => {
  return props.singer && props.singer.pic
})
// 标题
const title = computed(() => {
  return props.singer && props.singer.name
})
// 加载
const loading = ref(true)
// 获取歌手详情歌曲列表
const songsList = ref([])
const getSingerDetailData = async () => {
  const result = await getSingerDetail(props.singer)
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
