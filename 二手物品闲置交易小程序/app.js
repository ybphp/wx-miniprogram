//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        /*    var logs = wx.getStorageSync('logs') || []
            logs.unshift(Date.now())
            wx.setStorageSync('logs', logs)*/
        //启动时执行的初始化工作 全局只触发一次
        //存储当前经纬度地址到本地
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                wx.setStorageSync("longitude", res.longitude);//经度
                wx.setStorageSync("latitude", res.latitude);//纬度
            }
        })
    },

    getUserInfo: function (cb) {
        /*    var that = this
            if (this.globalData.userInfo) {
              typeof cb == "function" && cb(this.globalData.userInfo)
            } else {
              //调用登录接口
              wx.getUserInfo({
                withCredentials: false,
                success: function(res) {
                  that.globalData.userInfo = res.userInfo
                  typeof cb == "function" && cb(that.globalData.userInfo)
                }
              })
            }*/
    },

    globalData: {
        api: "https://hs.api.boolv.com",//接口服务地址
        imgUrl: "http://f.boolv.com",//图片服务地址
        mobApi: "https://s.boolv.com",//手机服务地址
        gaoDeKey: '972cafdc2472d8f779c5274db770ac22',//高德web API服务key
        version: '0.1.0' //当前版本号
    }
})
