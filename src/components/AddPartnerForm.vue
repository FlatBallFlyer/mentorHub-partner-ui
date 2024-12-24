<template>
  <v-container>
    <h1>Add Partner</h1>
    <v-form>
      <!-- <v-text-field label="ID" v-if="mode==='edit'" v-bind:model-value="$route.params.id" v-bind:readonly="true"></v-text-field> -->
      <v-text-field label="Partner Name" v-model="partner.name" required></v-text-field>
      <v-btn @click="newPartner">Create New Partner</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { usePartnersStore } from "@/stores";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const store = usePartnersStore();
const { partner } = storeToRefs(store);
const { postPartner } = store;

async function newPartner() {      
  try {
    const response = await postPartner();
    router.push({ name: "EditPartner", params: { id: response._id } });
  } catch (error: any) {
    alert(error.message);
  }
}
</script>
