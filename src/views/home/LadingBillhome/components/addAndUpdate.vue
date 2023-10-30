<template>
  <div>
    <n-modal v-model:show="showModal" preset="dialog" :title="title">
      <!-- @positive-click="submitCallback"
      @negative-click="cancelCallback"
      positive-text="确认"
      negative-text="取消" -->
      <n-form ref="formRef" label-width="100" label-placement="left" :model="formData" :size="size">
        <n-form-item
          label="字典标签"
          path="dictionaryTag"
          :rule="[formItemRule('请填写字典标签', ['blur', 'change'])]"
          style="width: 100%"
        >
          <n-input
            v-model:value="formData.dictionaryTag"
            clearable
            style="width: 100%"
            type="text"
            placeholder="字典标签"
          />
        </n-form-item>
        <n-form-item
          label="字典标签值"
          path="dictionaryTagValue"
          :rule="[formItemRule('请填写字典标签值', ['blur', 'change'])]"
          style="width: 100%"
        >
          <!-- , 'number'  :show-button="false"-->
          <n-input v-model:value="formData.dictionaryTagValue" style="width: 100%" placeholder="字典标签值" clearable />
        </n-form-item>
        <n-form-item
          label="状态"
          path="state"
          :rule="[formItemRule('请选择状态', ['blur', 'change'], 'number')]"
          style="width: 100%"
        >
          <n-radio-group v-model:value="formData.state" name="radiogroup">
            <n-space> <n-radio :value="0">正常</n-radio><n-radio :value="1">停用</n-radio></n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="备注" path="remark" style="width: 100%">
          <n-input v-model:value="formData.remark" type="textarea" placeholder="备注" maxlength="100" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button class="M_r_10" @click="showModal = false"> 取消 </n-button>
        <n-button type="success" @click="submitCallback"> 确认 </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AddAndUpdateSystemDictionaryDetailModel } from '@/service';
import useMousePosition from '@/hooks/common/validation';
const emit = defineEmits(['getSearch']);
const route = useRoute();
const router = useRouter();
// hooks
const { formItemRule } = useMousePosition();
const showModal = ref(false);
const formRef = ref<any>(null);
// 表单参数
const formData = reactive({
  state: 0,
  dictionaryTag: '',
  remark: '',
  dictionaryTagValue: '',
  id: undefined
});
const title = ref('新增字典标签');
// 对话框打开函数
const openAdd = () => {
  title.value = '新增字典标签';
  showModal.value = true;
  Object.assign(formData, {
    state: 0,
    dictionaryTag: '',
    remark: '',
    dictionaryTagValue: '',
    id: undefined
  });
};
// 对话框编辑打开
const openUpdate = data => {
  title.value = '修改字典标签';

  Object.assign(
    formData,
    (({ state, dictionaryTag, remark, dictionaryTagValue, id }) => ({
      state,
      dictionaryTag,
      remark,
      dictionaryTagValue,
      id
    }))(data)
  );
  console.log(formData, data);

  showModal.value = true;
};
defineExpose({
  openAdd,
  openUpdate
});
// 保存
const submitCallback = () => {
  formRef.value?.validate(async error => {
    if (error) return;
    const { data } = await AddAndUpdateSystemDictionaryDetailModel({
      ...formData,
      systemDictionaryId: Number(route.query.id),
      dictionaryTypeCode: route.query.dictionaryTypeCode
    });
    if (data.code === 200) {
      window.$notification?.success({
        title: '成功',
        content: `${data.message}`,
        duration: 3000
      });
      showModal.value = false;
      emit('getSearch');
    } else {
      window.$notification?.error({
        title: '失败',
        content: `${data.message}`,
        duration: 3000
      });
    }
  });
};
</script>

<style></style>
