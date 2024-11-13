<template>
  <v-container elevation="0" width="300">
    <h2>Add Contact</h2>

    <v-form>
      <v-text-field label="Name" v-model="name" required></v-text-field>
      <v-card elevation="auto" class="pa-3" style="height: 50px; overflow-y: auto;">
        <ul v-if="name && names">
          <li
            v-for="person in suggestions"
            :key="person?._id"
            @click="selectPerson(person)"
          >{{ person?.firstName }} {{ person?.lastName }}</li>
        </ul>
      </v-card>
    </v-form>
  </v-container>
</template>


<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { usePartnersStore } from "@/stores";
import { storeToRefs } from "pinia";

const store = usePartnersStore();
const { partner } = storeToRefs(store);
const { getPartner } = store;

const route = useRoute();

const name = ref("");
const names = ref<any>(["Start typing..."]);
const suggestions = computed(() => (
  names.value
  ?.filter((person: any) => (
    person?.firstName?.toLocaleLowerCase().includes(name.value.toLocaleLowerCase()) ||
    person?.lastName?.toLocaleLowerCase().includes(name.value.toLocaleLowerCase())
  ))
))

async function selectPerson(person: any) {
  const apiUrl = `/api/partner/${route.params.id}/contact/${person._id}`;
      
  try {
    await axios.post(apiUrl);
    getPartner(route.params.id as string);
    name.value = "";
  } catch (error) {
    throw new Error(`Duplicate Name. ${error}`);
  }
}

async function getPeople() {
  const apiUrl = `/api/people/`;
  const partnerContacts = partner.value?.contactDetails?.map((contact: any) => contact._id);

  try {
    // create parameter to prevent cache on flat API calls
    const params = { params: { _: new Date().getTime() } };
    const apiResponse = await axios.get(apiUrl, params);
    names.value = apiResponse.data?.filter((person: any) => !partnerContacts.includes(person._id));
  } catch (error) {
    console.log("Error:", error);
    console.error("An error occurred:", error);
  }
}

onMounted(() => {
  getPeople();
})

</script>

<style scoped>
  ul {
    height: 100%;
    overflow: hidden;
  }
  li {
    cursor: pointer;
  }
</style>
