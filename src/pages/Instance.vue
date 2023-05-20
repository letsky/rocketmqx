<template>
    <v-card color="grey-lighten-4" flat>
        <v-toolbar>
            <v-toolbar-title :text="regionInfo.name"/>
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
                    实例名称
                </th>
                <th>查看</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" :key="item.instanceId">
                <td>{{ item.instanceId }}</td>
                <td>{{ item.instanceName }}</td>
                <td>
                    <router-link :to="{ name: 'topic', params: { regionId: regionId, instanceId: item.instanceId } }">
                        查看
                    </router-link>
                </td>
            </tr>
        </tbody>
    </v-table>

    <CreateTopic 
        :open="dialogParams.open"
        :instanceDisabled="false"
        :region-id="dialogParams.regionId"
        @close-click="onDialogCloseClick"
        @confirm-click="onDialogSubmitClick"
        :selected-instance-ids="dialogParams.selectedInstanceIds"
        @on-instance-change="onInstanceChange"
    />
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppConfig from '../app.config';
import { mdiPlus } from '@mdi/js';
import CreateTopic from '../components/CreateTopic.vue';

const axios = inject("axios")
const route = useRoute();

const data = ref([])
const regionId = route.params.regionId;
console.log(regionId)
const regionInfo = AppConfig.region.find(e => e.regionId === regionId);
console.log(regionInfo)

const dialogParams = ref({
    open: false,
    regionId: regionId,
    topicName: "",
    remark: "",
    selectedInstanceIds: [],
    messageType: 0
})

const getInstanceList = () => axios.get('/mq/instance/list', {
    params: { endpoint: regionInfo.endpoint }
}).then(response => {
    data.value = response.data.map(item => {
        return {
            instanceId: item.InstanceId,
            instanceName: item.InstanceName
        }
    })
})

const onCreateTopicClick = () => {
    console.log("create")
    dialogParams.value.open = true
}

const onDialogCloseClick = () => {
    dialogParams.value.open = false
}

const onDialogSubmitClick = (params) => {
    console.log(params)
    axios.post("/mq/create/topic", {
        "topicName": params.topicName,
        "messageType": params.messageType,
        "remark": params.topicName,
        "endpoint": regionInfo.endpoint,
        "instanceId": params.selectedInstanceIds
    }).then(response => {
        //http status code == 200
        const reponseStatus = response.status
        const code = response.data.code
        if (reponseStatus == 200 && code == 200) {
            getInstanceList()
            dialogParams.value.open = false
        } else {
            console.log("create topic error: ", response)   
        }
    });
    
}

const onInstanceChange = (newValue) => {
    console.log("parent changed: ", newValue)
    dialogParams.value.selectedInstanceIds = newValue
}

getInstanceList()

</script>

<style lang="scss" scoped></style>