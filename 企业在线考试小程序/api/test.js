import request from "./../utils/request.js";

export function getTestList(data) {
     return request.get("test/getList", data, { noAuth: true });
}

export function getTestDetail(data) {
     return request.get("test/detail", data, { noAuth: true });
}

export function getTestAnswer(data) {
     return request.get("test/answer", data);
}

export function postTest(data) {
     return request.get("test/post", data, { noAuth: true });
}

export function getTestRank(data) {
     return request.get("test/rank", data, { noAuth: true });
}

export function getSubjectList(data) {
     return request.get("test/getSubjectList", data, { noAuth: true });
}



