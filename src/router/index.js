import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/LoginForm.vue";
import UserMainForm from "../views/UserMainForm.vue";
import AdminMainForm from "../views/AdminMainForm.vue";
import CompanyForm from "../views/CompanyForm.vue";
import CompanyGradeForm from "../views/CompanyGradeForm.vue";
import ManagerForm from "../views/ManagerForm.vue";
import ManagerGradeForm from "../views/ManagerGradeForm.vue";
import ChargerModelForm from "../views/ChargerModelForm.vue";
import ChecklistForm from "../views/ChecklistForm.vue";
import ChargerStationForm from "../views/ChargerStationForm.vue";
import ChargerStationInsertForm from "../views/ChargerStationInsertForm.vue";

const routes = [
  { path: "/", name: "LoginForm", component: LoginForm },
  { path: "/AdminMainForm", name: "AdminMainForm", component: AdminMainForm },
  { path: "/UserMainForm", name: "UserMainForm", component: UserMainForm },
  { path: "/CompanyForm", name: "CompanyForm", component: CompanyForm },
  { path: "/CompanyGradeForm", name: "CompanyGradeForm", component: CompanyGradeForm },
  { path: "/ManagerForm", name: "ManagerForm", component: ManagerForm },
  { path: "/ManagerGradeForm", name: "ManagerGradeForm", component: ManagerGradeForm },
  { path: "/ChargerModelForm", name: "ChargerModelForm", component: ChargerModelForm },
  { path: "/ChecklistForm", name: "ChecklistForm", component: ChecklistForm },
  { path: "/ChargerStationForm", name: "ChargerStationForm", component: ChargerStationForm },
  { path: '/ChargerStationInsertForm/:idx', name: 'ChargerStationInsertForm', component: ChargerStationInsertForm, props: true },
  { path: '/ChargerStationInsertFormNew', name: 'ChargerStationInsertFormNew', component: ChargerStationInsertForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;