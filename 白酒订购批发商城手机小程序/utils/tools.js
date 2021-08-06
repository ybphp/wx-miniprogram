//微信移除了 ES6 异步回调 Promise    这里使用es6-Promise   
const Promise = require('es6-promise').Promise

class Tools{
    constructor(){
       this.Promise=Promise;
       this.host='';
    }
    request(method,url,callback,data=""){
        return new Promise((resolve, reject)=>{
            if(method.toLocaleUpperCase()=='GET'){
                 wx.request({
                    url:`${this.host}${url}`,
                    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                        'content-type': 'application/json',
                        'token': 'token'
                    }, // 设置请求的 header
                    success: (res)=>{
                        // success
                        if (res.data.status == 100) {
                            callback(res.data.data);
                        }else if (res.data.status == 401) {
                            wx.redirectTo({
                                url: '/pages/index/index'
                            })
                        } else {
                            this.alert('提示', res.data.message)
                        }
                        resolve();
                    },
                    fail: (res)=> {
                        // fail
                        console.log('xiaoxi' + res.errMsg);
                        reject()
                    },
                    complete: function() {
                        // complete
                    }
                })

            }else if(method.toLocaleUpperCase()=='POST'){
                 wx.request({
                    url:`${this.host}${url}`,
                    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                        'content-type': 'application/json',
                        'token': 'token'
                    }, // 设置请求的 header
                    data: data,
                    success: (res)=>{
                        // success
                        if (res.data.status == 100) {
                            callback(res.data.data);
                        }else if (res.data.status == 401) {
                            wx.redirectTo({
                                url: '/pages/index/index'
                            })
                        } else {
                            this.alert('提示', res.data.message)
                        }
                        resolve();
                    },
                    fail: (res)=> {
                        // fail
                        console.log('xiaoxi' + res.errMsg);
                        reject()
                    },
                    complete: function() {
                        // complete
                    }
                })

            }

           

        })
    }
    
}
export default Tools
