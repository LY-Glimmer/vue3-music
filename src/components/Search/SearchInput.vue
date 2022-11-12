<!-- 搜索框 -->
<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input class="input-inner" v-model="query" :placeholder="placeholder" />
    <i v-show="query" class="icon-dismiss" @click="clear"></i>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
import { debounce } from 'throttle-debounce'

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: '搜索歌曲、歌手'
  }
})
const query = ref(props.moduleValue)

const emit = defineEmits()
// 双向绑定
watch(query, debounce(300, newQuery => {
  // v-model默认事件
  emit('update:modelValue', newQuery.trim())
}))

watch(() => props.modelValue, newVal => {
  query.value = newVal
})
// 清空
const clear = () => {
  query.value = ''
}
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 6px;

  .icon-search {
    font-size: 24px;
    color: $color-text-d;
  }

  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    outline: 0;

    &::placeholder {
      color: $color-text-d;
    }
  }

  .icon-dismiss {
    font-size: 16px;
    color: $color-text-d;
  }
}
</style>
