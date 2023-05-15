

//   公网	mq-internet-access	ons.mq-internet-access.aliyuncs.com	
//   华北1（青岛）	cn-qingdao	ons.cn-qingdao.aliyuncs.com	ons-vpc.cn-qingdao.aliyuncs.com
//   华北2（北京）	cn-beijing	ons.cn-beijing.aliyuncs.com	ons-vpc.cn-beijing.aliyuncs.com
//   华北3（张家口）	cn-zhangjiakou	ons.cn-zhangjiakou.aliyuncs.com	ons-vpc.cn-zhangjiakou.aliyuncs.com
//   华北5（呼和浩特）	cn-huhehaote	ons.cn-huhehaote.aliyuncs.com	ons-vpc.cn-huhehaote.aliyuncs.com
//   华东1（杭州）	cn-hangzhou	ons.cn-hangzhou.aliyuncs.com	ons-vpc.cn-hangzhou.aliyuncs.com
//   华东2（上海）	cn-shanghai	ons.cn-shanghai.aliyuncs.com	ons-vpc.cn-shanghai.aliyuncs.com
//   华南1（深圳）	cn-shenzhen	ons.cn-shenzhen.aliyuncs.com	ons-vpc.cn-shenzhen.aliyuncs.com
//   西南1（成都）	cn-chengdu	ons.cn-chengdu.aliyuncs.com	ons-vpc.cn-chengdu.aliyuncs.com
//   中国（香港）	cn-hongkong	ons.cn-hongkong.aliyuncs.com	ons-vpc.cn-hongkong.aliyuncs.com
//   日本（东京）	ap-northeast-1	ons.ap-northeast-1.aliyuncs.com	ons-vpc.ap-northeast-1.aliyuncs.com
//   新加坡	ap-southeast-1	ons.ap-southeast-1.aliyuncs.com	ons-vpc.ap-southeast-1.aliyuncs.com
//   澳大利亚（悉尼）	ap-southeast-2	ons.ap-southeast-2.aliyuncs.com	ons-vpc.ap-southeast-2.aliyuncs.com
//   马来西亚（吉隆坡）	ap-southeast-3	ons.ap-southeast-3.aliyuncs.com	ons-vpc.ap-southeast-3.aliyuncs.com
//   印度尼西亚（雅加达）	ap-southeast-5	ons.ap-southeast-5.aliyuncs.com	ons-vpc.ap-southeast-5.aliyuncs.com
//   菲律宾（马尼拉）	ap-southeast-6	ons.ap-southeast-6.aliyuncs.com	ons-vpc.ap-southeast-6.aliyuncs.com
const Region = [
    { regionId: "mq-internet-access", endpoint: "ons.mq-internet-access.aliyuncs.com", name: "公网" },
    { regionId: "cn-qingdao", endpoint: "ons.cn-qingdao.aliyuncs.com", name: "华北1（青岛）" },
    { regionId: "cn-beijing", endpoint: "ons.cn-beijing.aliyuncs.com", name: "华北2（北京）" },
    { regionId: "cn-zhangjiakou", endpoint: "ons.cn-zhangjiakou.aliyuncs.com", name: "华北3（张家口）" },
    { regionId: "cn-huhehaote", endpoint: "ons.cn-huhehaote.aliyuncs.com", name: "华北5（呼和浩特）" },
    { regionId: "cn-hangzhou", endpoint: "ons.cn-hangzhou.aliyuncs.com", name: "华东1（杭州）" },
    { regionId: "cn-shanghai", endpoint: "ons.cn-shanghai.aliyuncs.com", name: "华东2（上海）" },
    { regionId: "cn-shenzhen", endpoint: "ons.cn-shenzhen.aliyuncs.com", name: "华南1（深圳）" },
    { regionId: "cn-chengdu", endpoint: "ons.cn-chengdu.aliyuncs.com", name: "西南1（成都）" },
    { regionId: "cn-hongkong", endpoint: "ons.cn-hongkong.aliyuncs.com", name: "中国（香港）" },
    { regionId: "ap-northeast-1", endpoint: "ons.ap-northeast-1.aliyuncs.com", name: "日本（东京）" },
    { regionId: "ap-southeast-1", endpoint: "ons.ap-southeast-1.aliyuncs.com", name: "新加坡" },
    { regionId: "ap-southeast-2", endpoint: "ons.ap-southeast-2.aliyuncs.com", name: "澳大利亚（悉尼）" },
    { regionId: "ap-southeast-3", endpoint: "ons.ap-southeast-3.aliyuncs.com", name: "马来西亚（吉隆坡）" },
    { regionId: "ap-southeast-5", endpoint: "ons.ap-southeast-5.aliyuncs.com", name: "印度尼西亚（雅加达）" },
    { regionId: "ap-southeast-6", endpoint: "ons.ap-southeast-6.aliyuncs.com", name: "菲律宾（马尼拉）" }
];

const MessageType = [
    { name: "普通消息", value: 0 },
    { name: "分区顺序消息", value: 1 },
    { name: "全局顺序消息", value: 2 },
    { name: "事务消息", value: 4 },
    { name: "定时/延时消息", value: 5 }
];



export default {
    region: Region,
    messageType: MessageType
}