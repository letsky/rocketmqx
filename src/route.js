import * as VueRouter from "vue-router";
import App from "./App.vue";
import Greet from "./components/Greet.vue";
import Instance from "./pages/Instance.vue";
import Topic from "./pages/Topic.vue";
import AppConfig from "./app.config.js";

const routes = [
  {
    path: "/",
    redirect: {
      name: "instance",
      params: { regionId: AppConfig.region[0].regionId },
    },
  },
  { path: "/:regionId/instances", name: "instance", component: Instance },
  { path: "/:regionId/instance/:instanceId", name: "topic", component: Topic },
];

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
