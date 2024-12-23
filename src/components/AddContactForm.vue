<template>
  <v-container elevation="0">
    <h2>Add Contact</h2>

    <v-form>
      <v-text-field label="Name" v-model="name" required></v-text-field>
      <v-card v-if="name && names && suggestions" elevation="0" class="suggestion-card">
        <ul>
          <li
            v-for="person in suggestions"
            :key="person?._id"
            class="pa-2 rounded-lg"
            @click="selectPerson(person); name = ''"
          >{{ person?.firstName }} {{ person?.lastName }}</li>
        </ul>
      </v-card>
      <v-btn tag="a" :href="newPersonLink" variant="tonal" class="bg-grey-lighten-5">New Person</v-btn>
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
const names = ref<any>(["Start typing..."]);
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
    height: 100px;
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
