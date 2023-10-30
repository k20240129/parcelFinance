<template>
  <span class="underline" :style="{ color: textColor }" @mouseover="isHovering = true" @mouseleave="isHovering = false">
    {{ text }}
    <span class="underline__bar" :style="{ backgroundColor: barColor, width: isHovering ? '100%' : '0' }"></span>
  </span>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    },
    textColor: {
      type: String,
      default: '#000'
    },
    barColor: {
      type: String,
      default: '#000'
    }
  },
  setup(props) {
    const isHovering = ref(false);

    return {
      isHovering
    };
  }
});
</script>

<style>
.underline {
  position: relative;
}

.underline__bar {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  width: 0;
  height: 2px;
  transition: 0.2s;
}

.underline:hover .underline__bar {
  transform: translateX(-50%) scaleX(1);
  width: 100%;
}

.underline:hover {
  color: #000;
}
</style>
