<!--首页-->
<template>
  <Header></Header>
  <TabBar></TabBar>
  <router-view />
  <Player></Player>
</template>

<script setup>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import Player from '@/components/Player/Player.vue'
</script>

<style lang="scss" scoped>
.user {
  color: red;
  font-size: 26px;
}
</style>
