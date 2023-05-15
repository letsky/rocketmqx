const Region = [
    { regionId: "cn-shanghai", endpoint: "ons.cn-shanghai.aliyuncs.com", name: "华东2（上海）" },
    { regionId: "mq-internet-access", endpoint: "ons.mq-internet-access.aliyuncs.com", name: "公网" }
  ];
  
const MessageType = [
    { name: "普通消息", value: 0 },
    { name: "分区顺序消息", value: 1 },
    { name: "全局顺序消息", value: 2 },
    { name: "事务消息", value: 4 },
    { name: "定时/延时消息", value: 5}
  ];
  
  

export default {
    region: Region,
    messageType: MessageType
}