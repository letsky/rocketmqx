<template>
    <v-row justify="center">
        <v-dialog v-model="props.open" persistent width="1024">
            <v-card>
                <v-card-title>
                    <span class="text-h5">新建Topic</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="地域*" disabled :model-value="regionInfo.name"></v-text-field>
                        <v-select 
                            :items="instanceList" 
                            item-title="instanceName" 
                            item-value="instanceId"
                            :modelValue="selectedInstanceIds"
                            @update:modelValue="onInstanceChange"
                            label="实例*" 
                            multiple
                            :disabled="props.instanceDisabled"
                            >
                        </v-select>
                        <v-text-field label="Topic名称*" required v-model="topicName"></v-text-field>
                        <v-text-field 
                            label="备注" 
                            hint="example of helper text only on focus"
                            v-model="remark"
                        >
                        </v-text-field>
                        <v-select 
                            label="消息类型*" 
                            v-model="messageType"
                            :items="messageTypeList" 
                            required 
                            item-title="name"
                            item-value="value"
                        >
                        </v-select>
                    </v-form>

                    <small>*indicates required field</small>
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
    </v-row>
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
const remark = ref('')
const messageType = ref(0)
const selectedInstanceIds = ref(props.selectedInstanceIds)

const regionInfo = AppConfig.region.find(e => e.regionId === props.regionId);

const messageTypeList = AppConfig.messageType
const instanceList = ref([])

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
    selectedInstanceIds.value = newValue;
    emit("onInstanceChange", newValue)
}

getInstanceList()

</script>

<style lang="scss" scoped></style>