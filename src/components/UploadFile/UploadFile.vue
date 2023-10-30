<template>
  <!-- 公共文件上传组件，包含图片、文件等 -->
  <div class="uploadPage">
    <n-upload
      v-if="listType == 'image-card'"
      v-model:file-list="fileList"
      :accept="fileType"
      :list-type="listType"
      directory-dnd
      :max="maxNum"
      show-preview-button
      show-download-button
      :disabled="disabledIs"
      @change="changeFile"
    >
      {{ $t('packageShopMessage.uploadFiles') }}
    </n-upload>
    <n-upload
      v-else
      v-model:file-list="fileList"
      :accept="fileType"
      :list-type="listType"
      directory-dnd
      :max="maxNum"
      show-preview-button
      show-download-button
      @change="changeFile"
    >
      <n-button> {{ $t('packageShopMessage.uploadFiles') }} </n-button>
    </n-upload>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, getCurrentInstance, onMounted } from 'vue';
import { ImportData } from '@/service';

export default {
  name: 'UploadPage',
  props: {
    saveFileArr: Array, // 保存的文件数组编号
    fileType: String, // 文件类型格式 image-card(照片墙)  image  text
    maxNum: Number, // 最大上传文件数
    listType: String, // 文件形式  .doc,.docx,.pdf,.xls,.xlsx,.zip,.rar,.jpg,.png,.jpeg,.svg,.gif
    disabledIs: Boolean
  },
  setup(props, { emit }) {
    const allData = reactive({
      fileList: [],
      maxNum: props.maxNum ? props.maxNum : 10
    });
    // 获取Component实例
    const proxy = getCurrentInstance();
    // 文件上传和删除

    const changeFile = async file => {
      if (file.event) {
        // 文件上传
        const formdata = new FormData();
        formdata.append('file', file.file.file);
        console.log(file);
        const config = {
          // headers: { 'Content-Type': 'multipart/form-data' }
        };
        const loading = proxy.proxy?.$loading({
          lock: true,
          text: '上传中...',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const { data } = await ImportData(formdata);
        loading.close();
        if (data) {
          if (data) {
            const datas = data;
            const arr = props.saveFileArr;
            arr.push({
              id: file.file.id,
              name: file.file.name,
              url: datas,
              status: 'finished'
            });
            emit('save-file-arr', arr);
            allData.fileList = arr;
          }
        } else {
          allData.fileList = [];
          const param = {
            id: file.file.id,
            name: file.file.name,
            status: 'error'
          };
          allData.fileList.push(param);
        }
      } else {
        // 文件删除,根据文件名进行匹配
        let fileIndex = null;
        props.saveFileArr.map((item, index) => {
          if (file.file.name === item.name) {
            fileIndex = index;
          }
        });
        props.saveFileArr.splice(fileIndex, 1);
      }
    };
    onMounted(() => {
      // 修改时图片回显
      allData.fileList = [];
      if (props.saveFileArr.length > 0) {
        props.saveFileArr.map(item => {
          const params = {
            id: item.id,
            name: item.name,
            url: item.url,
            status: 'finished'
          };
          allData.fileList.push(params);
        });
      }
    });
    onBeforeMount(() => {
      allData.fileList = [];
    });
    return {
      ...toRefs(allData),
      changeFile
    };
  }
};
</script>
<style lang="scss">
.uploadPage {
  width: 100%;
}
</style>
