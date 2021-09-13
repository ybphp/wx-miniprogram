var Utils = require("../../../utils/util.js");

var datas = {
    nickname: "",        // 姓名
    image:"",           // logo
    orderArr:[]         // 数据
};

Page({
data: datas,
onLoad: function (options) {
    this.request();
},
onShow: function () {

},
request:function(){ // 请求列表接口
    var _this = this;
    var loginData = wx.getStorageSync("login");
    Utils.requestFn({
        url: '/index.php/myfaqs?server=1', 
        data: {
            sdk: loginData.sdk,
            uid: loginData.uid
        },
        success: function (res) {
            if (res.data.status){
                var datas = res.data.data;
                _this.setData({
                    nickname: datas.user.nickname,
                    image: Utils.url + datas.user.image,
                    orderArr: datas.faqs
                })
                
            }
            
        }
    })
},
Jump:function(e){
    var data = e.currentTarget.dataset;
    this.JumpRequest(data.uid,data.id);
},
JumpRequest: function (uid,id){
    var loginData = wx.getStorageSync("login");
    var loginJosn = {};
    Utils.requestFn({
        url: '/index.php/consultdetail?server=1',
        data: {
            sdk: loginData.sdk,
            uid: uid,
            id:id
        },
        success: function (res) {
            datas = JSON.stringify(res.data.data);
            // 记录一下传入详情的值，为详情刷新做准备
            loginJosn = {
                sdk: loginData.sdk || "",
                uid: loginData.uid || "",
                id: id
            }
            Utils.setStorage("details", loginJosn)
            wx.navigateTo({
                url: "/pages/Consultation_details/Consultation_details?a=" + datas
            })
        }
    })
}
})