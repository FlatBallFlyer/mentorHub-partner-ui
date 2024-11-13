<template>
  <v-container>
    <h2>Contacts</h2>
		<div class="mb-5 mt-5 d-flex justify-space-between">
			<a :href="addContactLink()" target="_blank">
				<v-btn size="large" variant="tonal" class="bg-grey-lighten-5">
					Add New Contact
				</v-btn>
			</a>
			<a :href="newPersonLink()" target="_blank">
				<v-btn size="large" variant="tonal" class="bg-grey-lighten-5">
					Create New Person
				</v-btn>
			</a>
		</div>
    <v-table>
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
          <!-- TODO: Make delete feature functional -->
          <td class="text-left"><v-btn>DELETE</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>


<script setup lang="ts">
import { useRouter } from "vue-router";
import { usePartnersStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = usePartnersStore();
const { partner } = storeToRefs(store);

defineProps<{
  saveMe: (event: any, field: string) => void,
  rules: any,
}>();

function addContactLink() {
  // TODO: Make add contact route
  return router.resolve({ name: "EditPartner" }).href;
}

function newPersonLink() {
  // TODO: Figure out how to link to person SPA
  return router.resolve({ name: "EditPartner" }).href;
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
