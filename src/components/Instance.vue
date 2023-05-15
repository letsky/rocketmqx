<template>
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
                    <router-link :to="{name: 'topic', params: {regionId: regionId, instanceId: item.instanceId}}">
                        查看
                    </router-link>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppConfig from '../app.config';

const axios = inject("axios")
const route = useRoute();

const data = ref([])
const regionId = route.params.regionId;
console.log(regionId)
const regionInfo = AppConfig.region.find(e => e.regionId === regionId);
console.log(regionInfo)

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

getInstanceList()

</script>

<style lang="scss" scoped></style>