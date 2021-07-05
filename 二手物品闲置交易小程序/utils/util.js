var app = getApp();

/**
 * 公共微信https请求封装
 * @param url
 * @param type
 * @param data
 * @param callBack
 */
function https(url, type, data, callBack, header) {
    if (!data.isHideLoad) {
        wx.showLoading({
            title: '加载中',
        })
    }
    wx.showNavigationBarLoading();
    wx.request({
        url: url,
        method: type,
        data: data,
        header: header ? header : ( {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + wx.getStorageSync('token')
        }),
        success: function (res) {
            callBack(res.data);
        },
        fail: function (error) {
            showToast("收收请求失败");
        },
        complete: function (res) {
            console.log(res);
            if (res.statusCode === 401) {
                showToast("收收请求未授权");
            }
            wx.hideLoading();
            wx.stopPullDownRefresh();
            wx.hideNavigationBarLoading();
        }
    })
}

/**
 * 接口API授权 type 1.是公共授权  2.登录授权  immediately立刻执行授权
 */
function authorization(type, callback, immediately) {
    var timePromise1 = undefined;
    var timePromise2 = undefined;
    var that = this;
    if (type == 1) { //1.是公共授权
        var auth1 = function () {
            //获取公共接口授权token  公共接口授权token两个小时失效  超过两个小时重新请求
            if (!wx.getStorageSync("userid") && (immediately || (!wx.getStorageSync("token") || wx.getStorageSync("token") == "undefined" || ((new Date().getTime() - new Date(wx.getStorageSync("expires_in")).getTime()) / 1000) > 7199))) {
                clearInterval(timePromise2);
                that.https(app.globalData.api + "/token", "POST", {grant_type: 'client_credentials'},
                    function (data) {
                        if (data.access_token) {
                            wx.setStorageSync('token', data.access_token);//公共接口授权token
                            wx.setStorageSync('expires_in', new Date());//公共接口授权token 有效时间
                        }
                        callback.call(that, data)

                    }, {
                        'Authorization': 'Basic MTcwNjE0MDAwMTozNzliYjljNi1kNTYwLTQzMjUtYTQxMi0zMmIyMjRlMjg3NDc=',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                )
            } else { //没有执行授权
                callback.call(that)
            }

        }
        auth1();
        timePromise1 = setInterval(auth1, 7199000);
    } else if (type == 2) {  //2.登录授权
        var auth2 = function () {
            //获取登录接口授权token  登录接口授权token两个小时失效  超过两个小时重新请求
            if (wx.getStorageSync("userid") && (immediately || ((new Date().getTime() - new Date(wx.getStorageSync("expires_in")).getTime()) / 1000) > 7199)) {
                clearInterval(timePromise1);
                that.https(app.globalData.api + "/token", "POST", {
                        grant_type: 'password',
                        username: wx.getStorageSync("userid"),
                        password: wx.getStorageSync("usersecret")
                    },
                    function (data) {
                        if (data.access_token) {
                            wx.setStorageSync('token', data.access_token);//登录接口授权token
                            wx.setStorageSync('expires_in', new Date());//登录接口授权token 有效时间
                        }
                        callback.call(that, data)

                    }, {
                        'Authorization': 'Basic MTcwNjE0MDAwMTozNzliYjljNi1kNTYwLTQzMjUtYTQxMi0zMmIyMjRlMjg3NDc=',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                )
            } else { //没有执行授权
                callback.call(that)
            }

        }
        auth2();
        timePromise2 = setInterval(auth2, 7199000);
    }
}

/**
 * 是否登录
 */
function isLogin() {
    return wx.getStorageSync("userid") ? true : false;
}

/**
 * 是否登录提示
 */
function isLoginModal(isShow) {
    if (!wx.getStorageSync("userid")) {
        if (isShow) {
            wx.showModal({
                title: '收收提示',
                content: "登录收收,体验更完善功能",
                showCancel: true,
                confirmColor: "#00ACFF",
                confirmText: "登录",
                success: function (res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/account/login'
                        })
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        //返回上一页
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                }
            })
        } else {
            wx.navigateTo({
                url: '/pages/account/login'
            })
        }
    }
}


/**
 * Toast提示框
 */
function showToast(title, icon, duration) {
    wx.showToast({
        title: title || "",
        icon: icon || 'success',
        duration: duration || 2000
    })
}

/**
 * ​Modal显示模态弹窗
 */
function showModal(title, content, confirmText, cancelText, callback, showCancel) {
    var that = this;
    wx.showModal({
        title: title,
        content: content,
        confirmText: confirmText,
        cancelText: cancelText,
        showCancel: showCancel || true,
        confirmColor: "#00ACFF",
        cancelColor: "#33cd5f",
        success: function (res) {
            callback.call(that, res)
            /*          if (res.confirm) {
                          console.log('用户点击确定')
                      } else if (res.cancel) {
                          console.log('用户点击取消')
                      }*/
        }
    })
}

/**
 * toolTip方法 type 1是提示色 2是警告色
 */
function toolTip(that, msg, type) {
    //提示字段值
    that.setData(
        {
            popMsg: msg,
            popType: type == 1 ? "tool-tip-message-success" : "tool-tip-message" || "tool-tip-message"
        }
    );
}

/**
 * 调用验证表单方法
 */
function wxValidate(e, that, callback) {
    toolTip(that, "")
    const params = e.detail.value
    /*    console.log(params);*/
    if (!that.WxValidate.checkForm(e)) {
        const error = that.WxValidate.errorList
        //提示字段值
        toolTip(that, error[0].msg)
        /*      console.log(error)*/

        return false
    } else {
        callback.call(this)
    }
}

/**
 * 改变验证码按钮状态
 */
function verifyCodeBtn(e, that) {
    if (e.currentTarget.id == 'user' && (/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value))) {
        that.setData({
            vcdisabled: false
        })
    } else if (e.currentTarget.id == 'user' && !(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value))) {
        that.setData({
            vcdisabled: true
        })
    }
}

/**
 * 获取验证码公共方法
 */
function getVerifyCode(account, that, callback) {
    var second = 120,
        timePromise = undefined;
    timePromise = setInterval(function () {
        if (second <= 0) {
            clearInterval(timePromise);
            that.setData({
                paracont: "重发验证码",
                vcdisabled: false

            })
        } else {
            that.setData({
                paracont: second + "秒后重试",
                vcdisabled: true

            })
            second--;
        }
    }, 1000, 122);

    this.https(app.globalData.api + "/api/util/send_sms_validcode/" + account, "GET", {},
        function (data) {
            if (data.code == 1001) {
                callback.call(this, data)
            }
        }
    )
}

/**
 * 点击tab切换
 */
function swichNav(e, that) {
    if (that.data.currentTab === e.target.dataset.current) {
        return false;
    } else {
        that.setData({
            currentTab: e.target.dataset.current
        })
    }
}

/**
 * 微信授权登录
 */
function wxLogin() {
    var that = this;
    //调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid）
    if (!wx.getStorageSync("openid")) { //初次授权登录 获取openid
        wx.login({
            success: function (res) {
                if (res.code) {
                    //根据微信Code获取对应的openId
                    that.https(app.globalData.api + "/api/wc/GetOpenid", "GET", {
                            code: res.code,
                            UserLogID: wx.getStorageSync("userid") || ""
                        },
                        function (data) {
                            if (data.code == 1001) {
                                wx.setStorageSync("openid", data.data.OpenId);//微信openid
                                wx.setStorageSync("userid", data.data.UserLogID);
                                wx.setStorageSync("usersecret", data.data.usersecret);
                                //根据会员ID获取会员账号基本信息
                                that.getUserInfo(function () {

                                });
                            }

                        })

                } else {
                    console.log('获取微信用户登录状态失败！' + res.errMsg);
                }
            }
        });
    }
}

/**
 * 根据会员ID获取会员账号基本信息
 */
function getUserInfo(callback) {
    var that = this;
    this.https(app.globalData.api + "/api/user/get/" + wx.getStorageSync("userid"), "GET", {isHideLoad:true},
        function (data) {
            if (data.code == 1001) {
                wx.setStorageSync("user", data.data);
                var services = data.data.services;
                //用户会员类型  0 无 1信息提供者  2回收者
                wx.setStorageSync("usertype", (services == null || services.length == 0) ? 0 : (services.length == 1 && services.indexOf('1') != -1) ? 1 : 2);
                if (services == null || services.length == 0) {//旧会员 完善信息
                    that.showModal('收收提示', '尊敬的用户,您好！旧会员需完善资料后才能进行更多的操作！', '完善资料', '暂不完善', function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        }
                    })

                }
                callback.call(this, data)
            }
        }
    )
}

/**
 * 获取省市县数据
 */
function getAddressPCCList(that, item, level, callback) {
    //获取省份信息
    if (!item) {
        this.https(app.globalData.api + "/api/addr/getplist", "GET", {},
            function (data) {
                if (data.code == 1001) {
                    wx.pageScrollTo({
                        scrollTop: 0
                    })
                    that.setData({
                        isShowPCC: true,
                        addressinfo: data.data
                    })

                } else {
                    toolTip(that, data.message)
                }

            }
        )
        return;
    }
    //获取市信息
    if (item.Level == 1) {
        this.https(app.globalData.api + "/api/addr/getclist", "GET", {pid: item.ID},
            function (data) {
                if (data.code == 1001) {
                    wx.pageScrollTo({
                        scrollTop: 0
                    })
                    that.setData({
                        addressinfo: data.data
                    })

                } else {
                    toolTip(that, data.message)
                }

            }
        )
    }
    //获取县或地区信息
    if (item.Level == 2) {
        this.https(app.globalData.api + "/api/addr/getdlist", "GET", {cid: item.ID},
            function (data) {
                if (data.code == 1001) {
                    wx.pageScrollTo({
                        scrollTop: 0
                    })
                    that.setData({
                        addressinfo: data.data
                    })

                } else {
                    toolTip(that, data.message)
                }

            }
        )
    }

    //获取最后一级地址信息 关闭modal
    if (level == item.Level || item.Level == 3) {
        that.setData({
            isShowPCC: false,
            addresspcd: item.MergerName,
            addressone: item,
            longitude: null,//自动详情经度
            latitude: null,//自动详情纬度
            handlongitude: item.Lng,//手动经度
            handlatitude: item.Lat//手动纬度
        })
    }
}

/**
 * 获取当前位置 省市县数据
 */
function getCurrentCity(that, level, callback) {
    that.setData({
        isShowSearch: true
    })
    this.https("https://restapi.amap.com/v3/geocode/regeo", "GET", {
            key: app.globalData.gaoDeKey,
            location: Number(that.data.handlongitude || wx.getStorageSync("longitude")).toFixed(6) + "," + Number(that.data.handlatitude || wx.getStorageSync("latitude")).toFixed(6),
            radius: 3000,//	查询POI的半径范围。取值范围：0~3000,单位：米
            extensions: 'all',//返回结果控制
            batch: false, //batch=true为批量查询。batch=false为单点查询
            roadlevel: 0 //可选值：1，当roadlevel=1时，过滤非主干道路，仅输出主干道路数据
        },
        function (data) {
            var addressComponent = data.regeocode.addressComponent;
            that.setData({
                city: addressComponent.city,
                addresspois: data.regeocode.pois,
                ssx: (addressComponent.province + addressComponent.city + (level == 2 ? "" : addressComponent.district)),//省市县
                addrdetail: addressComponent.township + addressComponent.streetNumber.street
            })
        }
    )
}

/**
 * 获取通过用POI的关键字进行条件搜索数据
 */
function getSearchAddress(that, addrname, callback) {
    this.https("https://restapi.amap.com/v3/place/text", "GET", {
            key: app.globalData.gaoDeKey,
            keywords: addrname,//查询关键词
            city: that.data.city || "深圳",
            extensions: 'all'//返回结果控制
        },
        function (data) {
            that.setData({
                addresspois: data.pois

            })
        }
    )
}

/**
 * 打开相机或者相册
 */
function uploadActionSheet(that, callback) {
    wx.showActionSheet({
        itemList: ['从手机相册选择', '拍照'],
        itemColor: "#00ACFF",
        success: function (res) {
            if (res.tapIndex == 0) { //从手机相册选择
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        //上传文件
                        uploadFile(res, that)
                    }
                })
            } else if (res.tapIndex == 1) { //拍照
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'],
                    sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        //上传文件
                        uploadFile(res, that)
                    }
                })
            }
            console.log(res.tapIndex)
        },
        fail: function (res) {
            console.log(res.errMsg)
        }
    })
}

/**
 * 上传文件
 */
function uploadFile(res, that) {
    // // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    var tempFilePaths = res.tempFilePaths
    wx.showLoading({title: '正在上传'})
    wx.uploadFile({
        url: app.globalData.api + "/api/util/uploadimg/" + that.data.filename, //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],//要上传文件资源的路径
        name: 'file',//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        formData: {//HTTP 请求中其他额外的 form data
        },
        header: {"authorization": "Bearer " + wx.getStorageSync('token')}, //授权
        success: function (res) {
            console.log(res);
            var data = res.data
            //do something
            toolTip(that, "上传成功", 1)
        }, fail: function (res) {
            toolTip(that, "上传失败")
        }, complete: function () {
            wx.hideLoading();
        }
    })
}

/**
 * 获取产品品类
 */
function getProductList(that, callback) {
    this.https(app.globalData.api + "/api/product/getgrplist", "GET", {},
        function (data) {
            callback.call(this, data)
        }
    )
}

/**
 * 根据产品品类及是否统货取产品列表
 */
function getProductListIsth(that, callback) {
    this.https(app.globalData.api + "/api/product/getpronew", "GET", {grpid: that.data.grpid, isth: that.data.isth},
        function (data) {
            callback.call(this, data)
        }
    )
}

module.exports = {
    https: https,
    authorization: authorization,
    isLogin: isLogin,
    isLoginModal: isLoginModal,
    showToast: showToast,
    showModal: showModal,
    toolTip: toolTip,
    wxValidate: wxValidate,
    verifyCodeBtn: verifyCodeBtn,
    getVerifyCode: getVerifyCode,
    swichNav: swichNav,
    wxLogin: wxLogin,
    getUserInfo: getUserInfo,
    getAddressPCCList: getAddressPCCList,
    getCurrentCity: getCurrentCity,
    getSearchAddress: getSearchAddress,
    uploadActionSheet: uploadActionSheet,
    uploadFile: uploadFile,
    getProductList: getProductList,
    getProductListIsth: getProductListIsth
}
