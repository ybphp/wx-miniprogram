App({
  globalData: {
    userInfo: {}, //用户信息
    goal: '未填写', //目标，应该在登录时候获取
    motto: '你还没有填写座右铭', //座右铭，应该在登录时候获取
    plan: [], //今日计划
  },

  onLaunch: function(e) {
    var that = this
    var timeOut = 10 //回调函数设置超时阈值
    //检查版本
    if (wx.canIUse('button.open-type.getUserInfo')) {
      // 版本支持，查看用户是否授权过
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            //授权过，可以直接使用
            wx.getUserInfo({
              lang: "zh_CN",
              success: function(res) {
                that.globalData.userInfo = res.userInfo
                that.globalData.userInfo['gender'] = (that.globalData.userInfo['gender'] == 1 ? "男" : "女")
                that.getOpenID() //获取用户 openid
                while (--timeOut != 0) {
                  if (that.userInfoReadyCallback) { //回调函数
                    that.userInfoReadyCallback()
                    break
                  }
                }
                //回调函数设置超时重启程序
                if (timeOut == 0) {
                  wx.reLaunch({
                    url: '/pages/login/login',
                  })
                }
              }
            })
          } else {
            var i = 10
            //如果未授权，将在 login 页面授权
            while (--timeOut != 0) {
              if (that.needAuthorizeCallback) { //回调函数
                that.needAuthorizeCallback()
                break
              }
            }
            //回调函数设置超时重启程序
            if (timeOut == 0) {
              wx.reLaunch({
                url: '/pages/login/login',
              })
            }
          }
        }
      })
    } else {
      //如果版本太低，则告诉 login 页面版本太低
      that.globalData.userInfo = {
        userInfo: {
          "version_mismatch": true
        }
      }
    }
  },

  // 获取用户 openid
  getOpenID: function(e) {
    console.log("模拟获取用户 openid")
  },
})