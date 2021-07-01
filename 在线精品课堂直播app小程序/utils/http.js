// const path = 'http://127.0.0.1:3000/api/';
const path = 'http://192.168.1.107:3000/api/';

const GET_BANNER = 'banner/get' //获取列表数据
const GET_COURSE_LIST = 'list'//获取课程课表
const GET_DETAIL = 'detail' //获取详情数据
const GET_VIDEO = 'video'//获取视频

module.exports = {
    GET_BANNER,
    GET_COURSE_LIST,
    GET_DETAIL,
    GET_VIDEO,
    get(apiUrl, yes, error) {
        wx.request({
            url: path + apiUrl,
            header: { 'Content-Type': 'json' },
            success: yes,
            fail: error
        })
    },
    post(apiUrl, params, yes, error) {
        wx.request({
            url: path + apiUrl,
            method: "POST",
            data: params,
            header: { 'Content-Type': 'json' },
            success: yes,
            fail: error
        })
    }
}