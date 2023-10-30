<template>
  <div class="w-20px h-full lang">
    <selectHz v-model:model-key="app.lang" :menu-items="options" @update="updateOpention">
      <template #title>
        <div style="cursor: pointer">
          <svg viewBox="0 0 24 24" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
              class="css-c4d79v"
            ></path>
          </svg>
        </div>
      </template>
    </selectHz>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/store';
import selectHz from '@/components/select/selectHz.vue';
const { locale } = useI18n();
const app = useAppStore();

const options = [
  {
    label: '中文',
    key: 0,
    render: item =>
      `<div style="display:flex;align-items: center;">    <svg width="12" height="12" viewBox='0 0 960 640' transform="scale(1)" >
        <rect x='0' y='0' width='960' height='640' fill='red'/>
        <path d="M160,79
        L112.3894,225.5304
        L237.0356,134.9696
        L82.9644,134.9696
        L207.6106,225.5304
        Z" fill='yellow'/>
        <path d="M292.5602,80.4639
        L351.8765,66.8091
        L295.8626,42.9908
        L327.1787,95.1844
        L332.522,34.5518
        Z" fill='yellow'/>
        <path d="M352.3216,132.5255
        L406.9683,105.7187
        L378.5148,159.5264
        L369.9069,99.2705
        L412.2884,142.9589
        Z" fill='yellow'/>
        <path d="M353.2312,215.2089
        L403.7252,249.1976
        L382.8547,192.0206
        L366.1311,250.5462
        L414.0597,213.0267
        Z" fill='yellow'/>
        <path d="M295.0122,268.0098
        L351.9655,289.485
        L293.2665,305.5875
        L331.2902,258.0579
        L328.4656,318.8599
        Z" fill='yellow'/>
       
    </svg><div style="margin-left:10px">${item}</div></div>`
  },
  // {
  //   label: 'қазақ',
  //   key: 1,
  //   render: item =>
  //     `<div style="display:flex;align-items: center;"><svg  t="1687664536610" class="icon" viewBox="0 0 1544 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7950" width="12" height="12"><path d="M10.052 1017.718H1529.09V7.538H10.052v1010.18z m1521.55 2.513v-3.77 3.77zM3.77 1024V0h1531.603v1022.744H3.769z" fill="#353636" p-id="7951"></path><path d="M6.282 680.991h1525.32v339.24H6.282z" fill="#E51F1F" p-id="7952"></path><path d="M6.282 343.009h1525.32v339.239H6.282z" fill="#232B8C" p-id="7953"></path><path d="M6.282 3.77h1525.32v339.239H6.282z" fill="#FFFFFF" p-id="7954"></path></svg><div style="margin-left:10px">${item}</div></div>`
  // },
  {
    label: 'Русский',
    key: 1,
    render: item =>
      `<div style="display:flex;align-items: center;"><svg  t="1687664536610" class="icon" viewBox="0 0 1544 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7950" width="12" height="12"><path d="M10.052 1017.718H1529.09V7.538H10.052v1010.18z m1521.55 2.513v-3.77 3.77zM3.77 1024V0h1531.603v1022.744H3.769z" fill="#353636" p-id="7951"></path><path d="M6.282 680.991h1525.32v339.24H6.282z" fill="#E51F1F" p-id="7952"></path><path d="M6.282 343.009h1525.32v339.239H6.282z" fill="#232B8C" p-id="7953"></path><path d="M6.282 3.77h1525.32v339.239H6.282z" fill="#FFFFFF" p-id="7954"></path></svg><div style="margin-left:10px">${item}</div></div>`
  }
];
const obj = {
  0: 'zh',
  1: 'rs',
  2: 'kh'
};

const updateOpention = row => {
  locale.value = obj[row];
  localStorage.setItem('lang', obj[row]);
  app.langChange(row);
  location.reload();
};
defineOptions({ name: 'LanguageChange' });

// const { isFullscreen, toggle } = useFullscreen();
// const theme = useThemeStore();
</script>

<style scoped lang="scss">
.lang {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
