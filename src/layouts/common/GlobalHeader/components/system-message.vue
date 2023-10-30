<template>
  <div class="w-40px" style="margin-right: 20px">
    <n-popover class="!p-0" trigger="click" placement="bottom">
      <template #trigger>
        <hover-container
          :tooltip-content="$t('messageCenter.notice')"
          :inverted="theme.header.inverted"
          class="relative w-40px h-full"
        >
          <icon-clarity:notification-line class="text-18px" />
          <n-badge
            :value="count"
            :max="99"
            :class="[count < 10 ? '-right-2px' : '-right-10px']"
            class="absolute top-5px"
          />
        </hover-container>
      </template>
      <n-tabs
        v-model:value="currentTab"
        :class="[isMobile ? 'w-276px' : 'w-360px']"
        type="line"
        justify-content="space-evenly"
      >
        <n-tab-pane v-for="(item, index) in tabData" :key="item.key" :name="index">
          <template #tab>
            <div class="flex-x-center items-center" :class="[isMobile ? 'w-92px' : 'w-120px']">
              <span class="mr-5px">{{ item.name }}</span>
              <!-- <n-badge
                v-bind="item.badgeProps"
                :value="item.list.filter(message => !message.isRead).length"
                :max="99"
                show-zero
              /> -->
            </div>
          </template>
          <loading-empty-wrapper
            class="h-360px"
            :loading="loading"
            :empty="item.list.length === 0"
            placeholder-class="bg-$n-color transition-background-color duration-300 ease-in-out"
          >
            <message-list :list="item.list" @read="handleRead" />
          </loading-empty-wrapper>
        </n-tab-pane>
      </n-tabs>
      <div v-if="showAction" class="flex border-t border-$n-divider-color cursor-pointer">
        <div class="flex-1 text-center py-10px border-l border-$n-divider-color" @click="handleAllRead">
          {{ $t('messageCenter.allread') }}
        </div>
        <div class="flex-1 text-center py-10px border-l border-$n-divider-color" @click="handleLoadMore">
          {{ $t('messageCenter.seeMore') }}
        </div>
      </div>
    </n-popover>
    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" :title="$t('messageCenter.message_diond')">
      <div v-html="detailFrom.systemMessagContent"></div>
      <template #action>
        <n-button class="M_r_10" @click="showModal = false"> {{ $t('btnLang.cancel') }} </n-button>
        <n-button type="success" @click="showModal = false">{{ $t('btnLang.confirm') }} </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  QuerySystemMessageList,
  QuerySystemMessageNoReadCount,
  UpdateSystemMessage,
  BatchUpdateSystemMessage
} from '@/service';
import { useThemeStore } from '@/store';
import { useBasicLayout } from '@/composables';
import { useBoolean } from '@/hooks';
import { localStg } from '@/utils';
import MessageList from './message-list.vue';
defineOptions({ name: 'SystemMessage' });
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const showModal = ref(false);
const theme = useThemeStore();
const router = useRouter();
const { isMobile } = useBasicLayout();
const { bool: loading, setBool: setLoading } = useBoolean();
const proxy = getCurrentInstance()?.proxy as any;

const currentTab = ref(0);

const tabData = ref<any>([
  {
    key: 1,
    name: t('messageCenter.notice'),
    badgeProps: { type: 'warning' },
    list: []
  }
]);
const count = ref(0);

const getMessageList = async () => {
  const { data } = await QuerySystemMessageList({
    pageIndex: 1,
    pageSize: 5,
    processorType: 2,
    parcelShopId: Number(localStg.get('userInfo').id)
  });
  tabData.value[0].list = data.data;
  tabData.value[0].list = tabData.value[0].list.map(
    ({
      id,
      systemMessageCode,
      systemMessageName,
      systemMessagContent,
      systemMessageSimple,
      systemMessageStatus,
      createTime
    }) => ({
      title: systemMessageSimple,
      systemMessagContent,
      isRead: systemMessageStatus !== 0,
      date: createTime,
      icon: 'ri:message-3-line',
      systemMessageName,
      systemMessageCode,
      id
    })
  );
};
const getMessageCount = async () => {
  const { data } = await QuerySystemMessageNoReadCount({
    processorType: 2,
    parcelShopId: Number(localStg.get('userInfo').id)
  });
  count.value = data;
};
const batchMessage = async () => {
  await BatchUpdateSystemMessage({
    processorType: 2,
    parcelShopId: Number(localStg.get('userInfo').id)
  });
  getMessageCount();
  tabData.value[currentTab.value].list.forEach(item => Object.assign(item, { isRead: true }));
};
getMessageList();
getMessageCount();
// computed(() => {
//   return tabData.value.reduce((acc, cur) => {
//     return acc + cur.list.filter(item => !item.isRead).length;
//   }, 0);
// });

const showAction = computed(() => tabData.value[currentTab.value].list.length > 0);
const detailFrom = reactive({
  systemMessagContent: ''
});
const handleRead = async (index: number) => {
  const { data } = await QuerySystemMessageList({
    id: tabData.value[0].list[index].id
  });
  await UpdateSystemMessage({
    id: tabData.value[0].list[index].id,
    processorType: 2,
    systemMessageName: tabData.value[0].list[index].systemMessageName,
    systemMessageCode: tabData.value[0].list[index].systemMessageCode,
    systemMessagContent: tabData.value[0].list[index].systemMessagContent,
    systemMessageStatus: 1,
    dealWithDateTime: proxy?.$Utils.dateFormat(new Date(), 'yyyy-MM-ddThh:mm:ss')
  });
  getMessageCount();
  detailFrom.systemMessagContent = data.data[0].systemMessagContent;
  showModal.value = true;
  tabData.value[currentTab.value].list[index].isRead = true;
};

function handleAllRead() {
  batchMessage();
  tabData.value[currentTab.value].list.forEach(item => Object.assign(item, { isRead: true }));
}

function handleClear() {
  tabData.value[currentTab.value].list = [];
}

function handleLoadMore() {
  router.push('/home/message');
  // const { list } = tabData.value[currentTab.value];
  // setLoading(true);
  // setTimeout(() => {
  //   list.push(...tabData.value[currentTab.value].list);
  //   setLoading(false);
  // }, 1000);
}
</script>
<style scoped></style>
