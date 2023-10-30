<template>
  <div>
    <n-modal v-model:show="showModal" style="width: 50%" :show-icon="false" preset="dialog" :title="title">
      <n-form ref="formRef" label-placement="top" :model="formData" :size="size">
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-form-item
              label="洲名称"
              path="provinceConfigId"
              :rule="[formItemRule('请选择洲名称', ['blur', 'change'], 'number')]"
              style="width: 100%"
            >
              <n-select
                v-model:value="formData.provinceConfigId"
                label-field="provinceName"
                value-field="id"
                filterable
                :options="objAll.provinceConfigAll"
                placeholder="洲名称"
                @update:value="getCityAll(formData.cityId)"
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item
              label="城市名称"
              path="cityId"
              :rule="[formItemRule('请选择城市名称', ['blur', 'change'], 'number')]"
              style="width: 100%"
            >
              <n-select
                v-model:value="formData.cityId"
                label-field="cityName"
                :disabled="!formData.provinceConfigId"
                value-field="id"
                :placeholder="'请选择城市名称'"
                filterable
                :options="objAll.cityAll"
                @update:value="getAreaAll(formData.cityId)"
              />
            </n-form-item>
          </n-gi>
          <n-gi>
            <n-form-item
              label="区域名称"
              :rule="[formItemRule('请选择区域名称', ['blur', 'change'], 'number')]"
              path="districtId"
              style="width: 100%"
            >
              <n-select
                v-model:value="formData.districtId"
                :disabled="!formData.cityId"
                label-field="districtKazakhstanName"
                value-field="id"
                filterable
                :placeholder="'请选择区域名称'"
                :options="objAll.areaAll"
              />
            </n-form-item>
          </n-gi>

          <n-gi>
            <n-form-item
              label="包裹店名称"
              path="parcelShopName"
              :rule="[formItemRule('请填写包裹店名称', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopName"
                style="width: 100%"
                type="text"
                clearable
                placeholder="包裹店名称"
              />
            </n-form-item> </n-gi
          ><n-gi>
            <n-form-item
              label="包裹店俄语名称"
              path="parcelShopRussiaName"
              :rule="[formItemRule('请填写包裹店俄语名称', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopRussiaName"
                style="width: 100%"
                type="text"
                clearable
                placeholder="包裹店俄语名称"
              />
            </n-form-item> </n-gi
          ><n-gi>
            <n-form-item
              label="包裹店英文名称"
              path="parcelShopEnglishName"
              :rule="[formItemRule('请填写包裹店英文名称', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopEnglishName"
                style="width: 100%"
                type="text"
                clearable
                placeholder="包裹店英文名称"
              />
            </n-form-item> </n-gi
          ><n-gi>
            <n-form-item
              label="包裹店哈方名称"
              path="parcelShopPrincipal"
              :rule="[formItemRule('请填写包裹店哈方名称', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopKazakhstanName"
                style="width: 100%"
                type="text"
                clearable
                placeholder="包裹店哈方名称"
              />
            </n-form-item> </n-gi
          ><n-gi>
            <n-form-item
              label="包裹店负责人"
              path="parcelShopPrincipal"
              :rule="[formItemRule('请填写包裹店负责人', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopPrincipal"
                style="width: 100%"
                type="text"
                clearable
                placeholder="包裹店负责人"
              />
            </n-form-item> </n-gi
          ><n-gi>
            <n-form-item
              label="包裹店电话"
              path="parcelShopPhone"
              :rule="[formItemRule('请填写包裹店电话', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input-group>
                <n-input-group-label>+77</n-input-group-label>
                <n-input
                  v-model:value="formData.parcelShopPhone"
                  style="width: 100%"
                  type="text"
                  clearable
                  placeholder="包裹店电话"
                />
              </n-input-group>
            </n-form-item> </n-gi
          ><n-gi>
            <n-form-item
              label="裹店首字母"
              path="parcelShopLetter"
              :rule="[formItemRule('请填写裹店首字母', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopLetter"
                style="width: 100%"
                type="text"
                clearable
                placeholder="裹店首字母"
              />
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-row>
          <n-col :span="24">
            <n-form-item
              label="包裹店地址"
              path="parcelShopAddress"
              :rule="[formItemRule('请填写包裹店地址', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopAddress"
                style="width: 100%"
                type="textarea"
                :maxlength="200"
                show-count
                clearable
                placeholder="包裹店地址"
              />
            </n-form-item>
          </n-col>
        </n-row>
        <n-row>
          <n-col :span="24">
            <n-form-item
              label="包裹店地址（俄方地址）"
              path="parcelShopRussiaAddress"
              :rule="[formItemRule('请填写包裹店地址（俄方地址）', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopRussiaAddress"
                style="width: 100%"
                type="textarea"
                :maxlength="200"
                show-count
                clearable
                placeholder="包裹店地址（俄方地址）"
              />
            </n-form-item>
          </n-col>
        </n-row>
        <n-row>
          <n-col :span="24">
            <n-form-item
              label="包裹店地址（哈方地址）"
              path="parcelShopKazakhstanAddress"
              :rule="[formItemRule('请填写包包裹店地址（哈方地址）', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopKazakhstanAddress"
                style="width: 100%"
                type="textarea"
                :maxlength="200"
                show-count
                clearable
                placeholder="包裹店地址（哈方地址）"
              />
            </n-form-item>
          </n-col>
        </n-row>
        <n-row>
          <n-col :span="24">
            <n-form-item
              label="包裹店地址（英方地址）"
              path="parcelShopEnglishAddress"
              :rule="[formItemRule('请填写包包裹店地址（英方地址）', ['blur', 'change'])]"
              style="width: 100%"
            >
              <n-input
                v-model:value="formData.parcelShopEnglishAddress"
                style="width: 100%"
                type="textarea"
                :maxlength="200"
                show-count
                clearable
                placeholder="包裹店地址（英方地址）"
              />
            </n-form-item>
          </n-col>
        </n-row>
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
import {
  QueryCountryConfigList,
  QueryCityConfigList,
  QueryDistrictConfigList,
  AddAndUpdateParcelShop,
  QueryProvinceConfigList
} from '@/service';
import useMousePosition from '@/hooks/common/validation';
const emit = defineEmits(['getSearch']);
// hooks
const { formItemRule } = useMousePosition();
const showModal = ref(false);
const formRef = ref<any>(null);
// 表单参数
const formData = reactive({
  id: undefined,
  provinceConfigId: null
});
// 空间对象
const control = reactive({
  type: false // false 新增  true 修改
});
const title = ref('增加包裹店');
// 所有国家集合
const objAll: any = reactive({
  countryAll: [], // 国家集合
  cityAll: [], // 城市集合
  areaAll: [],
  provinceConfigAll: [] // 洲集合
});

const getCountryAll = async () => {
  const res = await QueryCountryConfigList({
    pageSize: 1000,
    pageIndex: 1
  });
  objAll.countryAll = res.data.data;
};
const getProvinceConfigAll = async () => {
  const { data } = await QueryProvinceConfigList({
    pageSize: 1000,
    pageIndex: 1
  });
  objAll.provinceConfigAll = data.data;
};
const getCityAll = async () => {
  const res = await QueryCityConfigList({
    pageSize: 1000,
    pageIndex: 1,
    provinceConfigId: formData.provinceConfigId
  });
  objAll.cityAll = res.data.data;
};
const getAreaAll = async cityId => {
  const res = await QueryDistrictConfigList({
    pageSize: 1000,
    pageIndex: 1,
    cityId
  });
  objAll.areaAll = res.data.data;
};
// 对话框打开函数
const openAdd = () => {
  title.value = '增加包裹店';
  showModal.value = true;
  Object.assign(formData, {
    cityId: null,
    districtId: null,
    parcelShopAddress: null,
    parcelShopPhone: null,
    parcelShopPrincipal: null,
    parcelShopName: null,
    parcelShopLetter: null,
    parcelShopCode: null,
    isBlacklist: 0,
    parcelShopRussiaAddress: '',
    parcelShopKazakhstanAddress: '',
    parcelShopEnglishAddress: '',
    parcelShopRussiaName: '',
    parcelShopEnglishName: '',
    parcelShopKazakhstanName: '',
    provinceConfigId: null,
    id: undefined
  });
  getProvinceConfigAll();
  getCountryAll();
  // getCityAll();
  // getAreaAll();
  control.type = false;
};

// 对话框编辑打开
const openUpdate = data => {
  title.value = '编辑包裹店';
  Object.assign(
    formData,
    (({
      cityId,
      districtId,
      parcelShopAddress,
      parcelShopPhone,
      parcelShopPrincipal,
      parcelShopName,
      parcelShopLetter,
      parcelShopCode,
      parcelShopRussiaAddress,
      parcelShopKazakhstanAddress,
      parcelShopEnglishAddress,
      parcelShopRussiaName,
      parcelShopEnglishName,
      parcelShopKazakhstanName,
      provinceConfigId,
      id
    }) => ({
      cityId,
      districtId,
      parcelShopAddress,
      parcelShopPhone,
      parcelShopPrincipal,
      parcelShopName,
      parcelShopLetter,
      parcelShopCode,
      parcelShopRussiaAddress,
      parcelShopKazakhstanAddress,
      parcelShopEnglishAddress,
      parcelShopRussiaName,
      parcelShopEnglishName,
      parcelShopKazakhstanName,
      provinceConfigId,
      id
    }))(data)
  );
  control.type = true;
  getCountryAll();
  getCityAll();
  getProvinceConfigAll();

  // getAreaAll();
  getAreaAll(formData.cityId);
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
    // formData.countryName = objAll.countryAll.filter(item => formData.countryId === item.id)[0].countryName;
    // formData.cityName = objAll.cityAll.filter(item => formData.cityId === item.id)[0].cityName;

    const { data } = await AddAndUpdateParcelShop({
      ...formData
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
