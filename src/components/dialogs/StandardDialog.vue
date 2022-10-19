<template>
   <div v-show="open">
      <div class="content-card">
         <div class="dialog-toolbar">
            <div class="close-button" @click="closeDialog">
               <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
         </div>
         <div class="content">
            <slot></slot>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: ['open', 'closeDialog'],
};
</script>

<style scoped>
.dialog-toolbar {
   width: 100%;
   display: flex;
   justify-content: end;
   align-items: center;
   padding-inline: 12px;
   padding-top: 24px;
}
.close-button {
   margin-inline: 16px;
   padding: 4px;
   cursor: pointer;
   font-size: 20px;
   color: #8f8f8f;
}
.content-card {
   display: grid;
   grid-template-rows: auto 1fr;
   position: fixed;
   width: 80vw;
   min-height: 600px;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background-color: #ffffff;
   transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
   border-radius: 16px;
   box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px,
      rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
}
@media (max-width: 624px) {
   .content-card {
      width: calc(100vw - 40px);
   }
}
@media (min-width: 1000px) {
   .content-card {
      max-width: 700px;
   }
}
.content {
   padding: 32px;
}
</style>
