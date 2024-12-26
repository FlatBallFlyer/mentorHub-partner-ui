<template>
  <div class="home">
    <PartnersList></PartnersList>
  </div>
</template>

<script>
import PartnersList from "@/components/PartnersList.vue";

export default {
  components: {
    PartnersList
  },
  displayName: "PartnersListViewComponent",
}
</script>