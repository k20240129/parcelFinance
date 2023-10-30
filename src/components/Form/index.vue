<template>
  <div class="content">
    <div class="deflut">
      <!-- <div class="input"> -->
      <div style="display: flex">
        <slot name="deflutContent"></slot>
        <div v-if="type" class="search">
          <n-button type="info" style="margin-left: 20px" size="small" @click="getSearch"> 查询 </n-button>
          <n-button v-if="props.overflowShow" style="margin-left: 10px" type="primary" text icon-placement="right"
            @click="unfoldToggle">
            <template #icon>
              <n-icon v-if="overflow" size="18" class="unfold-icon">
                <icon-local-zk class="text-24px" />
              </n-icon>
              <n-icon v-else size="18" class="unfold-icon">
                <icon-local-sq class="text-24px" />
              </n-icon>
            </template>
            {{ overflow ? '收起' : '展开' }}
          </n-button>
        </div>
      </div>
      <!-- </div> -->
      <div v-if="overflow">
        <slot name="content"></slot>
      </div>
    </div>
    <div v-if="!type" class="search">
      <n-button type="info" style="margin-left: 20px" size="small" @click="getSearch"> 查询 </n-button>
      <n-button v-if="props.overflowShow" style="margin-left: 10px" type="primary" text icon-placement="right"
        @click="unfoldToggle">
        <template #icon>
          <n-icon v-if="overflow" size="18" class="unfold-icon">
            <icon-local-zk class="text-24px" />
          </n-icon>
          <n-icon v-else size="18" class="unfold-icon">
            <icon-local-sq class="text-24px" />
          </n-icon>
        </template>
        {{ overflow ? '收起' : '展开' }}
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
const overflow = ref(false);
const props = defineProps({
  overflowShow: {
    type: Boolean,
    default: true
  },
  type: {
    type: Boolean,
    default: true // true长度不够 false长度够
  }
});
const show = ref(false);
const emit = defineEmits(['getSearch']);
const getSearch = () => {
  emit('getSearch');
};
const unfoldToggle = () => {
  overflow.value = !overflow.value;
};
</script>

<style scoped lang="scss">
// 表单下多余的地方
::v-deep .n-form-item-feedback-wrapper {
  min-height: 10px !important;
}

.content {
  width: 100%;
  margin-bottom: 0px;
  display: flex;

  .deflut {
    width: 100%;
  }

  .search {
    display: flex;
    align-items: center;
    min-width: 150px;
    max-height: 35px;
  }
}

.light-green {
  height: 18px;
  background-color: rgba(0, 128, 0, 0.12);
}

.green {
  height: 18px;
  background-color: rgba(0, 128, 0, 0.24);
}

.unfold-icon {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: -3px;
}
</style>
