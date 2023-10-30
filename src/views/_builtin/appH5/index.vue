<template>
  <div class="home">
    <h1>下单人：{{ contact.orderPerson }}</h1>
    <h1>入库单号：{{ contact.kyInStorageNumber }}</h1>

    <div class="Sm">
      <img src="" alt="" srcset="" />
    </div>

    <van-field v-model="value" label="取件时间" placeholder="请选择取件时间" @click="showPicker = true" />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items" />
    </van-popup>
    <!-- <van-button type="primary">主要按钮</van-button> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
/**
 * @param name
 */
interface contacts {
  orderPerson: string;
  kyInStorageNumber: string;
}
const route = useRoute();
const contact = reactive<contacts>({
  orderPerson: '', // 下单人
  kyInStorageNumber: '' // 入库单号
});
const showPicker = ref(false);
const activeId = ref(null);
const activeIndex = ref(null);
const items = [
  {
    text: '今天',
    children: [
      { text: '10:00-11:00', id: 1 },
      { text: '11:00-12:00', id: 2 },
      { text: '13:00-14:00', id: 3 }
    ]
  },
  {
    text: '明天',
    children: [
      { text: '10:00-11:00', id: 1 },
      { text: '11:00-12:00', id: 2 },
      { text: '13:00-14:00', id: 3 }
    ]
  },
  {
    text: '后天',
    children: [
      { text: '10:00-11:00', id: 1 },
      { text: '11:00-12:00', id: 2 },
      { text: '13:00-14:00', id: 3 }
    ]
  }
];
const { orderPerson, kyInStorageNumber } = route.query;
contact.orderPerson = orderPerson as string;
contact.kyInStorageNumber = kyInStorageNumber as string;
onMounted(() => {
  (function (win) {
    const doc = win.document;
    const docEl = doc.documentElement;
    let tid;
    function refreshRem() {
      const width = docEl.getBoundingClientRect().width; // 注释1
      console.log(width);
      const rem = (width < 1000 ? 1600 : width) / 37; // 注释2
      console.log(rem);
      docEl.style.fontSize = `${rem}px`;
      document.getElementsByTagName('html')[0].style.cssText = `font-size: ${rem}px`;
      if (parseInt(rem) != parseInt(getComputedStyle(document.getElementsByTagName('html')[0]).fontSize)) {
        // 注释3
        const remtrue = rem * (rem / parseInt(getComputedStyle(document.getElementsByTagName('html')[0]).fontSize));
        docEl.style.fontSize = `${remtrue}px`;
        document.getElementsByTagName('html')[0].style.cssText = `font-size: ${remtrue}px`;
      }
    }
    win.addEventListener(
      'resize',
      function () {
        // 注释4
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      },
      false
    );
    win.addEventListener(
      'pageshow',
      function (e) {
        // 注释5
        if (e.persisted) {
          clearTimeout(tid);
          tid = setTimeout(refreshRem, 300);
        }
      },
      false
    );
    refreshRem();
    document.addEventListener('DOMContentLoaded', refreshRem, false); // 注释6
  })(window);
});
</script>

<style scoped lang="scss">
.home {
}
.Sm {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 4rem;
    height: 4rem;
  }
}
</style>
