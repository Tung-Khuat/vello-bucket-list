<template>
   <div v-show="open" class="content-card">
      <slot></slot>
   </div>
</template>

<script>
export default {
   props: ['open'],
};
</script>

<style scoped>
.content-card {
   position: absolute;
   top: 4px;
   left: 0;
   transform: translateX(-50%);
   z-index: 9;
   padding: 24px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   background-color: #ffffff;
   transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
   border-radius: 16px;
   box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
}
@media (max-width: 624px) {
   .content-card {
      position: fixed;
      width: 100%;
      bottom: 0;
      left: 0;
      top: 75%;
      transform: none;
   }
}
</style>
