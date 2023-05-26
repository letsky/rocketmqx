<template>
    <v-toolbar>
        <v-btn icon @click="onLeftClick">
            <v-icon :icon="mdiArrowLeft"></v-icon>
        </v-btn>
        <v-toolbar-title>{{ instanceId }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :prepend-icon="mdiPlus" @click="onCreateTopicClick">
            创建Topic
        </v-btn>
    </v-toolbar>

    <v-table fixed-header>
        <thead>
            <tr>
                <th class="text-left">
                    Topic
                </th>
                <th class="text-left">
                    备注
                </th>
                <th class="text-left">消息类型</th>
                <th class="text-left">创建时间</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in data" :key="item.instanceId">
                <td>{{ item.topic }}</td>
                <td>{{ item.remark }}</td>
                <td>{{ item.messageTypeName }}</td>
                <td>{{ formatTimestamp(item.createTime) }}</td>
            </tr>
        </tbody>
    </v-table>

    <CreateTopic :open="dialogParams.open" :instanceDisabled="true" :region-id="dialogParams.regionId"
        @close-click="onDialogCloseClick" @confirm-click="onDialogSubmitClick"
        :selected-instance-ids="dialogParams.selectedInstanceIds" @on-instance-change="onInstanceChange" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import AppConfig from '@/app.config';
import { inject, ref } from 'vue';
import { mdiArrowLeft, mdiMagnify, mdiPlus } from '@mdi/js';
import CreateTopic from '@/components/CreateTopic.vue';
import { formatTimestamp } from '../utils/date';
import { getRocketMQTopicList } from '@/api/js/instance';

const axios = inject("axios")
const route = useRoute();
const router = useRouter();
const regionId = route.params.regionId;
const instanceId = route.params.instanceId;
const regionInfo = AppConfig.region.find(e => e.regionId === regionId);
const messageTypeMap = AppConfig.messageTypeMap;

console.log("messageTypeMap:", messageTypeMap)

const data = ref([])
const dialogParams = ref({
    open: false,
    regionId: regionId,
    topicName: "",
    remark: "",
    selectedInstanceIds: [instanceId],
    messageType: 0
})

const getTopicList = () => getRocketMQTopicList(regionInfo.endpoint, instanceId).then(response => {
    data.value = response.data.map(item => {
        return {
            instanceId: item.InstanceId,
            messageType: item.MessageType,
            messageTypeName: messageTypeMap[item.MessageType],
            remark: item.Remark,
            topic: item.Topic,
            createTime: item.CreateTime
        }
    })

    console.log("TopicList:", data.value)
})

const onLeftClick = () => {
    router.go(-1)
}

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
            getTopicList()
            dialogParams.value.open = false
        } else {
            console.log("create topic error: ", response)
        }
    });

}

const onInstanceChange = (newValue) => {
    console.log("parent changed: " + newValue)
    dialogParams.value.selectedInstanceIds = newValue
}

getTopicList()
</script>

<style lang="scss" scoped></style>