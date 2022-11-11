<!-- 推荐页面组件 -->
<template>
  <div class='recommend' v-loading="loading">
    <Scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider v-if="sliders.length" :sliders="sliders"></Slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in albums" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic">
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getRecommend } from '@/service/recommend'
import Slider from '@/components/base/Slider'
import Scroll from '@/components/WrapScroll/index'
// 轮播图数据
const sliders = ref([])
// 歌曲数据
const albums = ref([])
// loading的文本
// const loadingText = '正在加载中...'
// 获取数据
const getRecommendData = async () => {
  const data = await getRecommend()
  sliders.value = data.sliders
  albums.value = data.albums
  // console.log('sliders:', sliders.value)
  // console.log('albums:', albums.value)
}
// 获取数据
getRecommendData()
// loading
const loading = computed(() => !sliders.value.length && !albums.value.length)
</script>

<style lang='scss' scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    // 轮播图样式
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }

    // 歌曲列表
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }

        .name {
          margin-bottom: 10px;
          color: $color-text;
        }

        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
