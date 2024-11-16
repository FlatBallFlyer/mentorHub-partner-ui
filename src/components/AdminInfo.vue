<template>
  <v-container>
    <h1>Admin Dashboard</h1>
    <v-text-field label="UI Version" v-model="config.uiVersion"></v-text-field>
    <v-text-field label="API Version" v-model="config.apiVersion"></v-text-field>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title><h2>Database Collections</h2></v-expansion-panel-title>
        <v-expansion-panel-text><AdminCollections/></v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title><h2>API Config Items</h2></v-expansion-panel-title>
        <v-expansion-panel-text><AdminConfigItems/></v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title><h2>Enumerators</h2></v-expansion-panel-title>
        <v-expansion-panel-text><AdminEnumerators/></v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePartnersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import AdminCollections from '@/components/AdminCollections.vue';
import AdminConfigItems from '@/components/AdminConfigItems.vue';
import AdminEnumerators from '@/components/AdminEnumerators.vue';


const store = usePartnersStore();
const { config } = storeToRefs(store);

onMounted(() => {
    document.title = 'Configuration';
});

</script>
