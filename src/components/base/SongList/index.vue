<!-- 歌曲列表 -->
<template>
  <ul class="song-list">
    <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs" :key="song.id">
      <div class="rank">
        <span :class="rankCls">{{ getRankText(index) }}</span>
      </div>
      <div class="content">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ getDesc(song) }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  songs: {
    type: Array,
    required: true
  },
  rank: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['select'])
// 处理索引
const getRankText = (index) => {
  return index + 1
}
// 组合歌手和歌曲
const getDesc = (song) => {
  return `${song.singer}·${song.album}`
}
const rankCls = computed(() => {
  return props.rank ? 'text' : ''
})

// 点击列表项
const selectItem = (song, index) => {
  emit('select', { song, index })
}
</script>

<style lang="scss" scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;

    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 20px;
      text-align: center;

      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
      }

      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }

    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        @include no-wrap();
        color: $color-text
      }

      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>
