import * as VueRouter from 'vue-router';
import App from "./App.vue";
import Greet from "./components/Greet.vue"
import Instance from "./components/Instance.vue"
import Topic from "./components/Topic.vue"

const routes = [
    { path: "/", component: App },
    { path: '/greet', component: Greet },
    { path: "/:regionId/instances", name: "instance", component: Instance },
    { path: "/:regionId/instance/:instanceId", name: "topic", component: Topic },
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router;