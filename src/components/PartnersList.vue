<template>
	<v-container>
		<h1 class="text-left">Partners</h1>
		<div class="mb-5 mt-5 d-flex justify-space-between">
			<a :href="newPartnerLink()" target="_blank">
				<v-btn size="large" variant="tonal" class="bg-grey-lighten-5">
					Add New Partner
				</v-btn>
			</a>
			<a :href="adminLink()" target="_blank">
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

<script>
import axios from "axios";

export default {
	data() {
		return {
			partners: [],
		};
	},
	mounted() {
		document.title = "Partners";
		this.getData(); // Call getData() when the component is mounted
		document.addEventListener("visibilitychange", this.handleVisibilityChange);
	},
	beforeUnmount() {
		document.removeEventListener(
			"visibilitychange",
			this.handleVisibilityChange
		);
	},
	methods: {
		handleVisibilityChange() {
			if (document.visibilityState === "visible") {
				this.getData();
			}
		},
		async getData() {
			const apiUrl = `/api/partner/`;

			try {
				// create parameter to prevent cache on flat API calls
				const params = { params: { _: new Date().getTime() } };
				const apiResponse = await axios.get(apiUrl, params);
				this.partners = apiResponse.data;
			} catch (error) {
				console.log("Error:", error);
				console.error("An error occurred:", error);
			}
		},
		newPartnerLink() {
			return this.$router.resolve({ name: "AddPartner" }).href;
		},
		editPartnerLink(id) {
			// Generate the link for EditPartner route
			return this.$router.resolve({ name: "EditPartner", params: { id: id } })
				.href;
		},
		adminLink() {
			// Generates link for Admin route
			return this.$router.resolve({ name: "Admin" }).href;
		},
	},
};
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
	background-color: rgba(0, 0, 0, 0.05);
}
</style>