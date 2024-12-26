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
      meta: { title: "Mentor Hub | New Partner" },
    },
    {
      path: "/partner/:id",
      name: "EditPartner",
      component: EditPartnerView,
      meta: { title: "Mentor Hub | Edit Partner" },
    },
    {
      path: "/partners",
      name: "ListPartners",
      component: PartnersView,
      meta: { title: "Mentor Hub | Partners" },
    },
    {
      path: "/admin",
      name: "Admin",
      component: AdminView,
      meta: { title: "Mentor Hub | Configuration" },
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router
