// @ts-ignore
import { createRouter, createWebHistory } from "vue-router";
const AddPartnerView = () => import("@/views/AddPartnerView.vue");
const EditPartnerView = () => import("@/views/EditPartnerView.vue");
const AdminView = () => import("@/views/AdminView.vue");
const PartnersView = () => import("@/views/PartnersView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/partners", // Redirect to the default route
    },
    {
      path: "/partner",
      name: "AddPartner",
      component: AddPartnerView,
    },
    {
      path: "/partner/:id",
      name: "EditPartner",
      component: EditPartnerView,
    },
    {
      path: "/partners",
      name: "ListPartners",
      component: PartnersView,
    },
    {
      path: "/admin",
      name: "Admin",
      component: AdminView,
    },
  ]
})

export default router
