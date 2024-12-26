<template>
	<div>
		<ul>
			<v-expansion-panels>
				<div
					v-for="(properties, collectionName) in config.enumerators"
					:key="collectionName"
					class="wide"
				>
					<EnumDropdownItem
						v-if="shouldBeDisplayed(collectionName)"
						:collectionName="(collectionName as unknown as string)"
						:properties="properties"
					/>
				</div>
			</v-expansion-panels>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { usePartnersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import EnumDropdownItem from '@/components/EnumDropdownItem.vue';

const store = usePartnersStore();
const { config } = storeToRefs(store);


function shouldBeDisplayed (name: any) {
  return name !== "_id";
}
</script>

<style scoped>
.wide {
	width: 100%;
}

.left {
	text-align: left;
}

.bold {
	font-weight: bold;
}

.box {
	margin: 5px;
	border: 1px solid #ccc;
	border-radius: 1px;
}
</style>
