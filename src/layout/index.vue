<!--首页-->
<template>
  <Header></Header>
  <TabBar></TabBar>
  <router-view />
</template>

<script setup>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
</script>

<style lang="scss" scoped>
.user {
  color: red;
  font-size: 26px;
}
</style>
