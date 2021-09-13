
var Utils = require("../../utils/util.js");

var datas = {
    bAuto:true,     // 是否自动拉起键盘
    parent_id: "",  // 传入的回复的id
    master_id: "",  // 传入的回复的id
    sdk: "",        // 登陆的sdk
    uid: "",        // 登陆的uid
    faqid:"",       // 详情的唯一ID
    content:"",      // 提交的value
}

Page({

  /**
   * 页面的初始数据
   */
    data: datas,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // 跳转加载数据
    if (JSON.stringify(options) == "{}") return false;
    var datas = JSON.parse(options.data);
    this.setData({
        parent_id: datas.parent_id,
        master_id: datas.master_id,
        sdk: datas.sdk,
        uid: datas.uid,
        faqid: datas.faqid
    })
  },
  textareaFn:function(e){   // 处理用户输入的内容
      var value = e.detail.value;
      var Ftrim = Utils.Verification.Ftrim;
      value = value.replace(Ftrim,"");
      if (value == "" ) return false;
    

      this.setData({
          content: value
      })
  },
  SubmitFn:function(){      // 提交数据加载
    var _this = this;
    var content = _this.data.content;
    var masterId = _this.data.master_id;
    var parentId = _this.data.parent_id;
    if (masterId == "0" || masterId == ""){
        this.setData({
            master_id: parentId
        })
    }
    if (content == "") return false;

    // 发送数据
    Utils.requestFn({
        url: '/index.php/faqreply?server=1', 
        method:"POST",
        data: {
            sdk: _this.data.sdk,
            uid: _this.data.uid,
            faqid: _this.data.faqid,
            content: _this.data.content,
            master_id: _this.data.master_id,
            parent_id: _this.data.parent_id
        },
        success: function (res) {
            if (res.data.status){
                wx.navigateBack({
                    data:1
                })
            }else{
                var mage = res.data.message;
                wx.showModal({
                    title: '提示',
                    content: mage,
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateBack({
                                data: 1
                            })
                        }
                    }
                })
            }
        }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})