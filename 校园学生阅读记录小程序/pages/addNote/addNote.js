// pages/addNote/addNote.js
var apiRequest = require('../../utils/api.js');
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        starNum: 5,
        stars: 5,
        files: [],
        readTime: 0,
        readWay: 0,
        comment: "",
        instro: ["一般", "喜欢", "很喜欢", "满意", "非常满意"],        
        timeCont: ["10分钟", "15分钟", "15分钟以上"],
        timeNum:[10,15,25],
        wayText: ["自读", "亲子阅读"],
        timeText:0,
        readText:"",
        pictureStr:'',
        is_buy_card:false,
        bookInfo:[]        
    },
    onLoad: function (option){
        this.setData({
            id:option.id,
            bookId:option.book_id,
            babyId:app.globalData.userData.baby_id,
            timeText: this.data.timeNum[0],
            readText:this.data.wayText[0],
            is_buy_card:app.globalData.is_buy_card,
            bookInfo:wx.getStorageSync("bookInfo")          
        });
        wx.setStorageSync("comment", false);
    },
    // 设置阅读时长
    setReadTime: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            readTime: index,
            timeText: this.data.timeNum[index]
        });
    },
    // 设置阅读方式
    setReadWay: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            readWay: index,
            readText:this.data.wayText[index]
        });
    },
    //   校园阅读评分
    setStar: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            starNum: index
        });
    },
    //   上传评论图片
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
                that.uploadimg({
                    url:'https://m.woduhuiben.com/schoolapi/picture',//这里是你图片上传的接口
                    path:tempFilePaths  //这里是选取的图片的地址数组,
                 });
            }
        })
    },
    // 已上传图片预览
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },
    //   设置评论内容
    textCont: function (e) {
        this.setData({
            comment: e.detail.value
        });
    },
    
    // 提交评论
    pushEdit: function () {
        var id = this.data.id;
        var bookId = this.data.bookId;
        var baby_id = this.data.babyId;
        var score = this.data.starNum;
        var timeText = this.data.timeText;
        var readText = this.data.readText;
        var comment = this.data.comment;
        var files = this.data.files;
        var pictures = this.data.pictureStr.substring(1);
        var params = {
            id:id,
            book_id: bookId,
            baby_id:baby_id,
            star:score,
            read_time: timeText,
            read_by: readText,
            content: comment,
            pictures:pictures
        }
        apiRequest.request("schoolapi/comment_add",params,true,function(res){
            if(res.code == 1){
                wx.showModal({
                    title: '提示',
                    content: '评论已完成',                    
                    showCancel: false,
                    success: function(res) {
                      wx.switchTab({
                          url: '../noteList/noteList',
                      })
                      wx.setStorageSync("comment", true);
                    }
                  })
            }else{
                apiRequest.alert(res.msg);
            }
        });
    },


    //多张图片上传
    uploadimg : function(data){
        var that=this,
            i=data.i?data.i:0,
            success=data.success?data.success:0,
            fail=data.fail?data.fail:0;
            var pictures = that.data.pictureStr;
         wx.uploadFile({
               url: data.url, 
               filePath: data.path[i],
               name: 'File',//这里根据自己的实际情况改
               formData:{},
               header:{
                'content-type': 'multipart/form-data',
                'X-Apikey': app.globalData.apikey
                },
               success: function(res) {
                   console.log(pictures)
                   that.setData({
                    pictureStr:pictures + ',' + JSON.parse(res.data).data[0].id
                   });
                   success++;
               },
               fail: function(res) {
                   fail++;
                   console.log('fail:'+i+"fail:"+fail);
               },
               complete: function() {
                   i++;
               if(i==data.path.length){   //当图片传完时，停止调用    
                   console.log('执行完毕');
                   console.log('成功：'+success+" 失败："+fail);
               }else{//若图片还没有传完，则继续调用函数
                   data.i=i;
                   data.success=success;
                   data.fail=fail;
                   that.uploadimg(data);
               }
                   
               }
           });
       }
})