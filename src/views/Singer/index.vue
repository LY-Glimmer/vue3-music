<!--歌手页面组件-->
<template>
  <div class="singer" v-loading="!singerList.length">
    <IndexList @select="selectSinger" :data="singerList"></IndexList>
    <router-view :singer="singer" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Api
import { getSingerList } from '@/service/singer'
// 列表组件
import IndexList from '@/components/base/IndexList/index.vue'
// 获取路由
const router = useRouter()
// 歌手数据
const singerList = ref([])
// 获取歌手数据
const getSingerListData = async () => {
  const res = await getSingerList()
  singerList.value = res.singers
}
getSingerListData()

// 跳转到歌手详情
const singer = ref(null)
const selectSinger = (singerObj) => {
  singer.value = singerObj
  router.push({
    path: `/singer/${singer.value.mid}`
  })
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
