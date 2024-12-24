<template>
  <v-container elevation="0" class="overflow-hidden position-relative popup-container">
    <h2 class="">Add Contact</h2>

    <v-form @submit.prevent class="">
      <v-text-field tabindex="0" label="Name" v-model="name" required></v-text-field>
      <v-card v-if="name && suggestions.length > 0" elevation="1" class="suggestion-card position-absolute bg-white">
        <ul>
          <li
            tabindex="0"
            v-for="person in suggestions"
            :key="person?._id"
            class="pa-2"
            @keypress.enter="selectPerson(person); name = ''"
            @click="selectPerson(person); name = ''"
          >{{ person?.firstName }} {{ person?.lastName }}</li>
        </ul>
      </v-card>
      <p :class="`my-5 font-italic text-medium-emphasis${name && suggestions.length > 0 ? ' opacity-0' : ''}`">Start typing to see suggestions...</p>
      <v-btn tag="a" :href="newPersonLink" variant="tonal" class="bg-grey-lighten-5 mt-4">New Person</v-btn>
    </v-form>
  </v-container>
</template>


<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { usePartnersStore } from "@/stores";
import { storeToRefs } from "pinia";

const store = usePartnersStore();
const { config, partner } = storeToRefs(store);
const { selectPerson, getPeople } = store;

const name = ref("");
const names = ref<any>([]);
const suggestions = computed(() => (
  names.value
  ?.filter((person: any) => (
    person?.firstName?.toLocaleLowerCase().match(new RegExp(`^${name.value.toLocaleLowerCase()}`)) ||
    person?.lastName?.toLocaleLowerCase().match(new RegExp(`^${name.value.toLocaleLowerCase()}`))
  ))
));

const newPersonLink = computed(() => `${
  config.value.configItems.find((item: any) => item.name === "PERSON_UI_HOST").value
}/person?partner_id=${partner.value._id}`);

onMounted(async () => {
  names.value = await getPeople();
})

</script>

<style scoped>
  .suggestion-card {
    max-height: 120px;
    width: calc(100% - 32px);
    overflow-y: auto;
    z-index: 10;
  }

  ul {
    height: 100%;
    overflow: hidden;
  }
  li {
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }

</style>
