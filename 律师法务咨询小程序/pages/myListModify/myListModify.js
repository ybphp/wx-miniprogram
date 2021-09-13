
var Utils = require("../../utils/util.js");

var datas = {
    images:"/images/user.png",           // 上传图片的图片
    ipone:"",         // 手机号码
    disabled:true,             // 禁用
    sex: [{ id: "0", name: "男", checked:"true" }, { id: "1", name: "女" }], 
    sexId:"0",   // 默认是0 => 男
    dataImg:"",  // 提交的img
    name: "",     // 昵称 
    Email: ""     // 邮箱 
};

Page({
data: datas,
onLoad: function (options) {
    var logValue = wx.getStorageSync("login");
    this.setData({
        ipone: logValue.telphone
    })
},
onShow:function(){
    var loginData = wx.getStorageSync("login");
    var _this = this;
   
    Utils.requestFn({
        url: '/index.php/modifygetuser?server=1',
        data: {
            sdk: loginData.sdk,
            uid: loginData.uid
        },
        success: function (res) {
            var res = res.data.data.user;
            var imgsrc = res.image != null ? Utils.url + res.image : _this.data.images;
           
            if (res.email != null){
                _this.setData({
                    name: res.nickname,
                    Email: res.email,
                    images: imgsrc,
                    sexId: res.sex
                })
            }
        }
    })
},
formSubmit:function(e){   //提交数据
    var value = e.detail.value;
    var bool = this.bNameFn(value) && this.bEmail(value);
    var logValue = wx.getStorageSync("login");
    if (bool){    //验证都为真的话 那么验证通过
        this.request(value, logValue)
    }
},
request: function (value, logValue){   // 请求ajax
    var _this = this;
    Utils.requestFn({
        url: '/index.php/modifyuser?server=1',
        method:"POST",
        data: {
            sdk: logValue.sdk,
            uid: logValue.uid,
            nickname: value.name,
            sex: _this.data.sexId,
            email: value.Email,
            image: _this.data.dataImg
        },
        success: function (res) {
            if (res.data.status){
                Utils.reLaunch("修改成功","/pages/myList/myList");
                return false;
            }
        }
    })
},
bNameFn: function (data){   // 验证昵称
    var value = data.name;     // 获取提交的昵称
    var resPhone = Utils.Verification.special; // 获取公共的验证方法
    if ( value == "" ) {
        Utils.showModal("昵称不能为空");
        return false;
    }
    return true;
},
bEmail: function (data){    // 验证
    var value = data.Email;
    var resPhone = Utils.Verification.email; // 获取公共的验证方法
    if (!resPhone.test(value)) {
        Utils.showModal("E-mail格式不正确");
        return false;
    }
    return true;
},
uploadFn:function(){    // 上传图片
    var _this = this;
    wx.chooseImage({
        count: 1, 
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'], 
        success: function (res) {
            var tempFilePaths = res.tempFilePaths;
            wx.uploadFile({
                url: Utils.url + '/index.php/upload?server=1', 
                filePath: tempFilePaths[0],
                name: 'file',
                formData: {
                    'user': 'test'
                },
                success: function (res) {
                    var data = JSON.parse(res.data).data.path;  // 解析img的src
                    _this.setData({
                        images: Utils.url + data,
                        dataImg: data   // 提交时用到的img
                    })
                }
            })
        }
    })
},
radioChange:function(e){    // 选择男女
    var value = e.detail.value;
    this.setData({
        sexId: value
    })
}
})