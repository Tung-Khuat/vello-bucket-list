<script setup>
import ContainedButton from '../components/buttons/ContainedButton.vue';
import BucketListDialog from '../features/BucketList/BucketListDialog.vue';
</script>

<template>
   <div class="page-wrapper">
      <ContainedButton :_onClick="openBucketListDialog">
         Show Bucket List
      </ContainedButton>
      <div v-if="bucketListDialogVisible">
         <BucketListDialog
            :open="this.bucketListDialogVisible"
            :closeDialog="closeBucketListDialog"
         />
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         bucketListDialogVisible: true,
      };
   },
   methods: {
      openBucketListDialog() {
         this.bucketListDialogVisible = true;
      },
      closeBucketListDialog() {
         this.bucketListDialogVisible = false;
      },
   },
};
</script>

<style scoped>
.page-wrapper {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100vh;
   width: 100%;
}
</style>
