import service from "../../plugins/axios";

export async function getRocketMQInstanceList(endpoint) {
  return await service.get("/mq/instance/list", {
    params: { endpoint: endpoint },
  });
}

