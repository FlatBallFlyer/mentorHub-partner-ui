<template>
	<v-container>
		<h1 class="text-left">Partners</h1>
		<div class="mb-5 mt-5 d-flex justify-space-between">
			<a :href="newPartnerLink" target="_blank">
				<v-btn size="large" variant="tonal" class="bg-grey-lighten-5">
					Add New Partner
				</v-btn>
			</a>
			<a :href="adminLink" target="_blank">
				<v-btn size="large" variant="tonal" class="bg-grey-lighten-5">
					Admin
				</v-btn>
			</a>
		</div>
		<v-table>
			<thead>
				<tr>
					<th class="text-left">Name</th>
					<th class="text-left">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="partner in partners" :key="partner.ID">
					<td class="text-left">{{ partner.name }}</td>
					<td class="text-left">
						<v-btn :href="editPartnerLink(partner._id)" target="_blank"
							>Edit</v-btn
						>
					</td>
				</tr>
			</tbody>
		</v-table>
	</v-container>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePartnersStore } from "@/stores/index";

const store = usePartnersStore();
const { getPartners } = store;

const router = useRouter();
const partners = ref();
const newPartnerLink = computed(() => router.resolve({ name: "AddPartner" }).href);
const adminLink = computed(() => router.resolve({ name: "Admin" }).href);

onMounted(async () => {
	document.title = "Partners";
	partners.value = await getPartners();
	document.addEventListener("visibilitychange", handleVisibilityChange);
});

onBeforeMount(() => {
	document.removeEventListener(
		"visibilitychange",
		handleVisibilityChange
	);
});

function handleVisibilityChange() {
	if (document.visibilityState === "visible") {
		getPartners();
	}
}

function editPartnerLink(id: any) {
	// Generate the link for EditPartner route
	return router.resolve({ name: "EditPartner", params: { id: id } }).href;
}
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
	background-color: rgba(0, 0, 0, 0.05);
}
</style>