<template>
  <div class="tabBox">
    <span>{{ props.tabname }}：</span>
    <div :class="tabindex === item.id ? 'colorred' : 'colorthree'" v-for="(item, index) in props.tablist" :key="index"
      @click="cligetdata(item.id)">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
const props = defineProps({
  tablist: {
    type: Array,
    default: []
  },
  tabname: {
    type: String,
    default: '状态分类'
  }
})
const emit = defineEmits(['tabsemit']);
const list = ref([]) as any
const tabindex = ref() as any

const cligetdata = (val: number) => {
  tabindex.value = val
  emit('tabsemit', val)
}
watch(() => props.tablist,
  (val) => {
    if (Array.isArray(val) && val.length > 0) {
      list.value = val
      tabindex.value = val[0].id
    }
  },
  { immediate: true, deep: true }
)
</script>

<style scoped lang="scss">
.tabBox {
  width: 100%;
  height: 34px;
  display: flex;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  font-weight: normal;
  color: #333333;

  >div {
    margin: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0 10px;
  }


  .colorred {
    height: 34px;
    border-radius: 17px;
    background: #FFEDED;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    color: #FB4A4C;
  }

  .colorthree {
    height: 34px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: normal;
    color: #333333;
  }
}
</style>
