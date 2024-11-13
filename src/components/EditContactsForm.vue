<template>
  <v-container>
    <div class="mb-5 mt-5 d-flex justify-space-between">
      <p class="text-h6">Contacts</p>
      <v-btn variant="tonal" class="bg-grey-lighten-5" @click="toggleAddContactDialog">
        Add New Contact
      </v-btn>
		</div>
    <v-table v-if="partner.contactDetails?.length">
      <thead>
        <tr>
          <th class="text-left">First Name</th>
          <th class="text-left">Last Name</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Email</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in partner.contactDetails" :key="contact._id">
          <td class="text-left">{{ contact.firstName }}</td>
          <td class="text-left">{{ contact.lastName }}</td>
          <td class="text-left">{{ contact.phone }}</td>
          <td class="text-left">{{ contact.eMail }}</td>
          <!-- TODO: Make remove feature functional -->
          <td class="text-left"><v-btn @click="removePerson(contact)">REMOVE</v-btn></td>
        </tr>
      </tbody>
    </v-table>
    <p v-else class="font-italic">{{ partner.name }} has no contacts yet...</p>

    <v-dialog v-model="addContactDialog" width="auto">
      <v-surface class="bg-white rounded-sm pa-7">
        <AddContactForm :handle-close="toggleAddContactDialog" />
        <v-btn @click="toggleAddContactDialog">Close</v-btn>
      </v-surface>
    </v-dialog>
  </v-container>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { usePartnersStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import axios from "axios";
import AddContactForm from "@/components/AddContactForm.vue";

const route = useRoute();

const store = usePartnersStore();
const { partner } = storeToRefs(store);
const { getPartner } = store;

const addContactDialog = ref(false);

function toggleAddContactDialog() {
  addContactDialog.value = !addContactDialog.value;
}

async function removePerson(person: any) {
  const apiUrl = `/api/partner/${route.params.id}/contact/${person._id}`;
      
  try {
    await axios.delete(apiUrl);
    getPartner(route.params.id as string);
  } catch (error) {
    throw new Error(`Duplicate Name. ${error}`);
  }
}

</script>


<style scoped>

.flex-container {
display: flex;
justify-content: space-between; /* Distributes the items evenly across the container */
align-items: center; /* Aligns the items vertically in the center */
}

.flex-item {
flex: 1; /* Each item takes an equal share of the container */
}

tbody tr:nth-of-type(odd) {
	background-color: rgba(0, 0, 0, 0.05);
}

</style>
