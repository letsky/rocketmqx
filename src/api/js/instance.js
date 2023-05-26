import service from "../../plugins/axios";

export async function getRocketMQInstanceList(endpoint) {
  return await service.get("/mq/instance/list", {
    params: { endpoint: endpoint },
  });
}

export async function getRocketMQTopicList(endpoint, instanceId) {
  return await service.get("/mq/topic/show", {
    params: { endpoint: endpoint, instanceId: instanceId },
  });
}