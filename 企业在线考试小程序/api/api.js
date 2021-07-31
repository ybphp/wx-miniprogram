import request from "./../utils/request.js"; 

//获取配置信息
export function getSiteInfo(data) {
     return request.get("common/getSiteInfo", data, { noAuth: true });
}

//获取科目列表
export function getSubjectList(data) {
     return request.get("subject/getList", data, { noAuth: true });
}

//获取广告列表
export function getAdList(data) {
     return request.get("ad/getList", data, { noAuth: true });
}

//获取广告
export function getAd(data) {
     return request.get("ad/getAd", data, { noAuth: true });
}
export function getCategoryList(data) {
     return request.get("article/getCategoryList", data, { noAuth: true });
}
//获取文章列表
export function getArticleList(data) {
     return request.get("article/getList", data, { noAuth: true });
}
//获取文章详情
export function getArticleDetail(data) {
     return request.get("article/detail", data, { noAuth: true });
}

//获取试卷列表
export function getTestList(data) {
     return request.get("test/getList", data, { noAuth: true });
}

//获取试卷详情
export function getTestDetail(data) {
     return request.get("test/detail", data, { noAuth: true });
}

//提交试卷
export function postTest(data) {
     return request.get("test/post", data, { noAuth: true });
}

//提交试卷
export function testReward(data) {
     return request.get("test/test_reward", data);
}