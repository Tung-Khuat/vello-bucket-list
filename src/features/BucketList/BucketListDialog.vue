<script setup>
import { deleteListItem, getListItems, updateListItem } from '@/services/api';
import { onMounted, ref } from 'vue';
import CheckBox from '../../components/buttons/CheckBox.vue';
import ContainedButton from '../../components/buttons/ContainedButton.vue';
import Dialog from '../../components/dialogs/StandardDialog.vue';
import OptionsDialog from './OptionsDialog.vue';

const listItems = ref([]);

onMounted(async () => {
   const response = await getListItems();
   listItems.value = response.data.data;
});
</script>

<template>
   <Dialog :open="open" :closeDialog="closeDialog">
      <section class="bucket-list-section">
         <header>
            <h1>Bucket List</h1>
         </header>
         <div v-if="listItems">
            <div class="bucket-list-header">
               <div>Done</div>
               <div></div>
               <div class="justify-end">Do before age</div>
               <div></div>
            </div>
            <div v-for="item in listItems" class="bucket-list-item">
               <div>
                  <CheckBox
                     :checked="item.done"
                     @click="onCheckBoxClick(item)"
                  />
               </div>
               <div>{{ item.description }}</div>
               <div class="justify-end">{{ item.do_before }}</div>
               <div
                  class="more-options"
                  @click="toggleItemOptionDialogVisibility(item.uuid)"
               >
                  <font-awesome-icon :icon="['fas', 'ellipsis']" />
                  <div v-if="currentItemUUIDInOptionDialog === item.uuid">
                     <OptionsDialog
                        :open="
                           optionsDialogVisible && currentItemUUIDInOptionDialog
                        "
                        :closeDialog="closeItemOptionDialogVisibility"
                     >
                        <div class="option-item-description">
                           {{ item.description }}
                        </div>
                        <div class="option-item" @click="onBucketAction1Click">
                           <font-awesome-icon :icon="['fas', 'calendar-day']" />
                           <span> Bucket item action 1 </span>
                        </div>
                        <div
                           class="option-item danger"
                           @click="onBucketItemDeleteClick(item.uuid, $event)"
                        >
                           <font-awesome-icon :icon="['fas', 'close']" />
                           <span> Delete bucket item </span>
                        </div>
                     </OptionsDialog>
                  </div>
               </div>
            </div>
         </div>
         <div v-else>List is empty.</div>
         <footer>
            <ContainedButton :_onClick="closeDialog"> Done </ContainedButton>
         </footer>
      </section>
   </Dialog>
   <div
      v-if="optionsDialogVisible"
      class="close-dialog-backdrop"
      @click="closeItemOptionDialogVisibility"
   ></div>
</template>

<script>
export default {
   props: ['open', 'closeDialog'],
   data() {
      return {
         currentItemUUIDInOptionDialog: null,
         optionsDialogVisible: false,
      };
   },
   methods: {
      onCheckBoxClick(item) {
         const newItem = {
            ...item,
            done: !item.done,
         };
         updateListItem(item.uuid, newItem);
      },
      toggleItemOptionDialogVisibility(itemUUID) {
         this.currentItemUUIDInOptionDialog = itemUUID;
         this.optionsDialogVisible = !this.optionsDialogVisible;
      },
      closeItemOptionDialogVisibility() {
         this.currentItemUUIDInOptionDialog = null;
         this.optionsDialogVisible = false;
      },
      onBucketAction1Click(event) {
         event.stopPropagation();
         window.alert('Option 1 clicked!');
      },
      async onBucketItemDeleteClick(itemUUID, event) {
         event.stopPropagation();
         await deleteListItem(itemUUID);
         // better way to update is to wait for delete request to succeed and just remove item from UI
         const newList = await getListItems();
         this.listItems = newList.data.data;
      },
   },
};
</script>

<style scoped>
h1 {
   font-size: 32px;
   font-weight: 700;
   margin-bottom: 24px;
}
.bucket-list-section {
   display: grid;
   grid-template-rows: auto 1fr auto;
   height: 100%;
   min-height: 300px;
}
.bucket-list-header > div {
   font-size: 12px;
   font-weight: bold;
}

.bucket-list-item,
.bucket-list-header {
   text-align: center;
   padding-block: 8px;
   display: grid;
   grid-template-columns: minmax(40px, auto) 1fr minmax(80px, auto) minmax(
         30px,
         auto
      );
   gap: 16px;
}
.bucket-list-item > div {
   display: grid;
   place-items: center;
   justify-content: start;
}
.bucket-list-item > div:first-child {
   justify-content: center;
}

.justify-end {
   justify-content: end !important;
}
footer {
   border-top: 1px solid #b5c5d0;
   padding: 32px;
   margin-top: 32px;
   display: flex;
   justify-content: end;
}
.more-options {
   border-radius: 50%;
   cursor: pointer;
   display: flex;
   justify-content: center !important;
   place-items: center;
}
.more-options:hover {
   background-color: #d6e0e8;
}
.option-item {
   white-space: nowrap;
   display: flex;
   place-items: center;
   cursor: pointer;
   padding: 8px;
   gap: 16px;
}
.option-item-description {
   text-align: left;
   font-weight: bold;
   font-size: 20px;
   margin-bottom: 16px;
}
.danger {
   color: #ff5093;
}
.close-dialog-backdrop {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   width: 100vh;
   height: 100vh;
   z-index: 4;
}
@media (max-width: 624px) {
   footer {
      justify-content: center;
   }
}
</style>
