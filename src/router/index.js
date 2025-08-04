import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/LoginForm.vue";
import UserMainForm from "../views/UserMainForm.vue";
import AdminMainForm from "../views/AdminMainForm.vue";

const routes = [
  { path: "/UserMainForm", name: "UserMainForm", component: UserMainForm },
  { path: "/AdminMainForm", name: "AdminMainForm", component: AdminMainForm },
  { path: "/", name: "LoginForm", component: LoginForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;