<script setup>
defineProps({
   _onClick: {
      type: Function,
      required: true,
   },
});
</script>

<template>
   <button class="contained-button" @click="_onClick">
      <slot></slot>
   </button>
</template>

<style scoped>
.contained-button {
   padding: 16px 40px;
   background-color: #002844;
   color: #fff;
   border-radius: 8px;
   cursor: pointer;
}
</style>
