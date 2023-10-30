<template>
  <n-space vertical>
    <n-select v-model:value="comValue" :label-field="label" :value-field="keys" filterable :options="select" />
  </n-space>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null
    },
    select: {
      type: Array,
      default: () => []
    },
    // select组件类型option取值字段
    keys: {
      type: String,
      default: 'id'
    },
    // select组件类型option显示字段
    label: {
      type: String,
      default: 'label'
    },
    // 回显名字
    valueName: {
      type: String,
      default: 'id'
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  emits: ['update:value', 'update:valueLabel'],
  data() {
    return {
      valueLabel: ''
    };
  },
  computed: {
    comValue: {
      get() {
        return this.$props.value;
      },
      set(val) {
        console.log(this.select);
        this.$emit('update:value', val);
        this.$nextTick(() => {
          this.select.forEach(item => {
            if (item[this.keys] === this.value) {
              console.log(item);
              this.valueLabel = item[this.valueName];
            }
          });
          this.$emit('update:valueLabel', this.valueLabel);
        });
      }
    }
  },
  watch: {}
};
</script>

<style></style>
