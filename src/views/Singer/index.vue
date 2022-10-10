<!--歌手页面组件-->
<template>
  <div class="singer" v-loading="!singerList.length">
    <IndexList :data="singerList"></IndexList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Api
import { getSingerList } from '@/service/singer'
// 列表组件
import IndexList from '@/components/base/IndexList/index.vue'

// 歌手数据
const singerList = ref([])
// 获取歌手数据
const getSingerListData = async () => {
  const res = await getSingerList()
  singerList.value = res.singers
  // console.log(toRaw(singerList.value))
}
getSingerListData()
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
