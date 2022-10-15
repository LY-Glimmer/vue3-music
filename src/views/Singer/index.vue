<!--歌手页面组件-->
<template>
  <div class="singer" v-loading="!singerList.length">
    <!-- 音乐列表组件 -->
    <IndexList @select="selectSinger" :data="singerList"></IndexList>
    <!-- 路由视图 -->
    <router-view v-slot="{Component}">
      <Transition name="slide">
        <component :singer="singer" :is="Component"></component>
      </Transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { SING_KEY } from '@/constant/constant'
import storage from 'good-storage'
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
// 保存参数 利用本地存储防止刷新数据丢失
const cacheSinger = (singer) => {
  storage.session.set(SING_KEY, singer)
}
// 跳转到歌手详情
const singer = ref(null)
const selectSinger = (singerObj) => {
  singer.value = singerObj
  // 缓存歌手信息
  cacheSinger(singer.value)
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
