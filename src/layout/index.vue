<!--首页-->
<template>
  <Header></Header>
  <TabBar></TabBar>
  <router-view :style="viewStyle" />
  <Player></Player>
</template>

<script setup>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Player from '@/components/Player/Player.vue'
import { usePlayerStore } from '@/stores/player'
import { computed } from 'vue'
const playerStore = usePlayerStore()

// 处理迷你播放器遮挡
const viewStyle = computed(() => {
  const bottom = playerStore.playList.length === 0 ? '0' : '60px'
  return {
    bottom
  }
})
</script>

<style lang="scss" scoped>
.user {
  color: red;
  font-size: 26px;
}
</style>
