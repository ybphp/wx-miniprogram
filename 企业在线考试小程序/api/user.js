import request from "./../utils/request.js";

/**
 * 小程序用户登录
 * @param data object 小程序用户登陆信息
 */
export function login(data) {
  return request.post("user/login", data, { noAuth : true });
}

/**
 * 获取用户信息
 * 
 */
export function getUserInfo(data) {
     return request.post("user/getUserInfo", data);
}
/**
 * 获取用户答题
 *
 */
export function getMyAnswer(data) {
     return request.get("user/getAnswer", data);
}


/**
 * 获取用户数据
 *
 */
export function getUserData() {
     return request.get("user/getData");
}
/**
 * 获取我的收藏
 */
export function getCollect(data) {
     return request.get("user/getCollect", data);
}
/**
 * 收藏操作
 */
export function doCollect(data) {
     return request.get("user/doCollect", data);
}


/**
 * 获取收藏状态
 */
export function getCollectStatus(data) {
     return request.get("user/getCollectStatus", data);
}
/**
 * 获取答题信息
 */
export function getAnswerDetail(data) {
     return request.get("user/answerDetail", data);
}

/**
 * 获取答题结果
 */
export function getAnswerResult(data) {
     return request.get("user/answerResult", data);
}
