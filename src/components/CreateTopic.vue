<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <v-card>
                <v-card-title>
                    <span class="text-h5">新建Topic</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Topic名称*" required v-model="createParams.topic"></v-text-field>
                        <v-text-field label="备注" hint="example of helper text only on focus" v-model="createParams.remark"></v-text-field>
                        <v-select 
                                    label="消息类型*"
                                    v-model="createParams.messageType"
                                    :items="messageType" 
                                    required 
                                    item-title="name" 
                                    item-value="value"
                                >
                                </v-select>
                        <v-container>
                    </v-container>
                    </v-form>
                    
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="onSubmitClick">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import AppConfig from '../app.config';
const dialog = ref(true);

const messageType = AppConfig.messageType
const createParams = ref({
    topic: "",
    remark: "",
    messageType: ""
})

const onSubmitClick = () => {
    console.log(createParams.value)
    dialog.value = false
}

const onCloseClick = () => {
    createParams.value = null
    dialog.value = false
}

</script>

<style lang="scss" scoped></style>