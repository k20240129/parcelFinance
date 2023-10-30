<template>
  <div class="dropdown" @mouseover="openDropdown" @mouseleave="closeDropdown">
    <slot name="title">测试</slot>
    <transition name="dropdown">
      <div class="dropdown-menu">
        <ul v-if="isOpen" class="dp_item">
          <li
            v-for="item in props.menuItems"
            :key="item.key"
            :class="['dropdown-item', { active: item.key === props.modelKey }]"
            @click="handleMenuItemClick(item)"
          >
            <span v-html="item.render ? item.render(item.label) : item.label"></span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => []
  },
  modelKey: {
    type: Number || String,
    default: null
  }
});
const emit = defineEmits(['update:modelKey', 'update']);
const isOpen = ref(false);
function openDropdown() {
  isOpen.value = true;
}

function closeDropdown() {
  isOpen.value = false;
}
function handleMenuItemClick(item) {
  emit('update:modelKey', item.key);
  emit('update', item.key);
  isOpen.value = false;
}
</script>

<style>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background-color: #4caf50;
  color: #ffffff;
  /* padding: 12px 24px; */
  border: none;
  cursor: pointer;
}

.dropdown-menu {
}
.dp_item {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  padding: 5px 0;
  margin: 0;
  list-style: none;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}
.dropdown-item {
  padding: 2px 14px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #eeeeee;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
.active {
  background-color: #e6f7ff !important;
  color: #1890ff !important;
}
</style>
