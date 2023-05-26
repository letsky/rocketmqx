<template>
    <v-dialog v-model="props.open" width="1024" scrollable>
        <v-card>
            <v-card-title>
                <span class="text-h5">新建Topic</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-text-field label="地域*" disabled :model-value="regionInfo.name"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-select :items="instanceList" item-title="instanceName" item-value="instanceId"
                            v-model="props.selectedInstanceIds" @update:modelValue="onInstanceChange" label="实例*" multiple
                            :disabled="props.instanceDisabled" :rules="selectedInstanceIdsRule" chips
                            hint="选择实例" persistent-hint>
                        </v-select>
                    </v-row>

                    <v-row>
                        <v-text-field label="Topic名称*" :rules="topicNameRule" required v-model="topicName"></v-text-field>
                    </v-row>

                    <v-row>
                        <v-text-field label="备注" hint="example of helper text only on focus"
                            v-model="remark"></v-text-field>
                    </v-row>

                    <v-row>
                        <v-select label="消息类型*" v-model="messageType" :items="messageTypeList" required item-title="name"
                            item-value="value">
                        </v-select>
                    </v-row>
                    <small>*indicates required field</small>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="onDialogCloseClick">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="onDialogSubmitClick">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, inject } from 'vue';
import AppConfig from '../app.config';

const axios = inject("axios")

const props = defineProps({
    open: Boolean,
    instanceDisabled: Boolean,
    regionId: String,
    selectedInstanceIds: Array,
    onConfirmClick: Function,
    onCloseClick: Function
})

const emit = defineEmits(["onInstanceChange"])

console.log("component props: " + props.instanceDisabled)

const topicName = ref('')
const topicNameRule = [
    value => {
        if (value) return true;
        return "Topic名称不能为空"
    }
]

const remark = ref('')
const messageType = ref(0)
const instanceList = ref([])
const selectedInstanceIdsRule = [
    value => {
        if (value.length > 0) return true;
        return "实例不能为空"
    }
]

const regionInfo = AppConfig.region.find(e => e.regionId === props.regionId);

const messageTypeList = AppConfig.messageType


const getInstanceList = () => axios.get('/mq/instance/list', {
    params: { endpoint: regionInfo.endpoint }
}).then(response => {
    instanceList.value = response.data.map(item => {
        return {
            instanceId: item.InstanceId,
            instanceName: item.InstanceName
        }
    })
});

const onDialogSubmitClick = () => {
    props.onConfirmClick({
        regionId: props.regionId,
        topicName: topicName.value,
        remark: remark.value,
        messageType: messageType.value,
        selectedInstanceIds: props.selectedInstanceIds
    })
}

const onDialogCloseClick = () => {
    props.onCloseClick()
}

const onInstanceChange = (newValue) => {
    console.log("component value change: " + newValue)
    emit("onInstanceChange", newValue)
}

getInstanceList()

</script>

<style lang="scss" scoped></style>