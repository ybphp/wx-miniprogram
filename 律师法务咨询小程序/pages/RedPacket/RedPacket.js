//  引入函数库
var Utils = require("../../utils/util.js");
var payModel = {};
// 定义数据
var data  = {
    Marr: ['2元', '5元', '8元', '18元', '28元', '58元'],   // 打赏的金额
    value:"2",   // 选中的id、进行对比
    money:"",  // 选中的金钱
    close:false,  // 是否关闭其他金额的弹层
    imageSrc:"/images/user.png",    // 打赏头像
    imageName:"你瞅啥",   // 打赏name
    dataJson:"",        // load过来的数据
    txmoeny:"",     // 其他金额输入值
    ismoney:"0",    // 判断金额是否正确
}
Page({
  data: data,
  onLoad: function (options) {
      if (JSON.stringify(options) == "{}") return false;
      this.setData({
          dataJson : JSON.parse(options.data)
      })
      this.loadValue(this.data.dataJson); // 加载数据
  },
  loadValue(obj){  // 点击红包进来加载头像、name
    var _this = this;
    this.setData({
          imageSrc: obj.img,
          imageName: obj.name,
          money: _this.data.Marr[_this.data.value].split("元")[0]
    })
  },
  actionFn(e){   // 选择金额
      var Doid = e.target.id;
      var Marr = this.data.Marr;
      this.setData({
          value: Doid,
          money: Marr[Doid].split("元")[0]
      })
  },
  otherFn(){    // 其他金额
      this.setData({ close:true });
  },
  closeFn(){     //关闭其他金额的弹层 
      this.setData({ close: false });
  },
  smReward(){   // 确定支付
      var money = this.data.money;
      this.request(money);
  },
  request(money){    // 请求接口
      var _this = this;
      Utils.requestFn({ // 重新获取数据
          url: '/index.php/redfaq?server=1',
          method: "POST",
          data: {
              sdk: _this.data.dataJson.sdk,
              uid: _this.data.dataJson.uid,
              faqid: _this.data.dataJson.faqid,
              ansid: _this.data.dataJson.ansid,
              attid: _this.data.dataJson.attid,
              money: money,
              openid: _this.data.dataJson.openid,
          },
          success: function (res) {
              if (res.data.status) {
                //  返回的支付信息
                  var data = res.data.data;
                  payModel = {
                      appId: data.appId,
                      nonceStr: data.nonceStr,
                      package: data.package,
                      paySign: data.paySign,
                      signType: data.signType,
                      timeStamp: data.timeStamp
                  }
                  _this.requestPayment(payModel);
              }else{
                  Utils.showModal(res.data.message);
              }
          }
      })
  },
  sumbtn(){ // 其他金额塞钱
      var isBool = this.data.ismoney;
      var txmoeny = this.data.txmoeny
      if (isBool){
          this.request(txmoeny);
      }else{
          Utils.showModal("请输入正确的金额、谢谢");
      }
  },
  inputFn(e){    // 输入金额
    var value =  e.detail.value;
    var re = Utils.Verification.money;
    this.setData({
        ismoney: re.test(value),
        txmoeny: value
    })
  },
  requestPayment(payModel){
      //  获取微信支付的数据
      wx.requestPayment({
          'timeStamp': payModel.timeStamp,
          'nonceStr': payModel.nonceStr,
          'package': payModel.package,
          'signType': 'MD5',
          'paySign': payModel.paySign,
          "total_fee": "8",
          'success': function (res) {   // 成功的状态
              Utils.reLaunch("支付成功", "/pages/Consultation/Consultation");
          },
          'fail': function (res) {      // 失败的状态
              Utils.reLaunch("支付失败", "/pages/Consultation/Consultation");
          }
      })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})