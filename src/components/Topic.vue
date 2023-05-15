<template>
    <v-card color="grey-lighten-4" flat>
        <v-toolbar>
            <v-btn icon @click="onLeftClick">
                <v-icon :icon="mdiArrowLeft"></v-icon>
            </v-btn>
            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="onCreateTopicClick">
                <v-icon :icon="mdiPlus"></v-icon>
            </v-btn>
        </v-toolbar>
    </v-card>

    <v-table fixed-header>
        <thead>
            <tr>
                <th class="text-left">
                    实例ID
                </th>
                <th class="text-left">
                    备注
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" :key="item.instanceId">
                <td>{{ item.instanceId }}</td>
                <td>{{ item.remark }}</td>
            </tr>
        </tbody>
    </v-table>

    <CreateTopic></CreateTopic>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import AppConfig from '../app.config';
import { inject, ref } from 'vue';
import { mdiArrowLeft, mdiMagnify, mdiPlus } from '@mdi/js';
import CreateTopic from './CreateTopic.vue';

const axios = inject("axios")
const route = useRoute();
const router = useRouter();
const regionId = route.params.regionId;
const instanceId = route.params.instanceId;
const regionInfo = AppConfig.region.find(e => e.regionId === regionId);

const data = ref([])

const getTopicList = () => axios.get('/mq/topic/show', {
    params: { endpoint: regionInfo.endpoint, instanceId: instanceId }
}).then(response => {
    data.value = response.data.map(item => {
        return {
            instanceId: item.InstanceId,
            messageType: item.MessageType,
            remark: item.Remark
        }
    })
})

const onLeftClick = () => {
    router.go(-1)
}

const onCreateTopicClick = () => {
    console.log("create")
}

getTopicList()
</script>

<style lang="scss" scoped></style>