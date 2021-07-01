class Storage {
    constructor() {
    }

    get(key, isAlert, cb) {
        wx.getStorage({
            key: key,
            success(res) {
                cb && cb(res.data)
            },
            fail() {},
        })
    }

    getSync(key, isParse) {
        let result;
        try {
            result = wx.getStorageSync(key);
            result = result ? (!!isParse ? JSON.parse(result) : wx.getStorageSync(key)) : null;
        } catch(err) {
            console.log('err: ', err)
        }
        return result
    }

    set(key, data, isArr, isAlert, cb) {
    
        if (!key || !data) return;
        isAlert = !!isAlert;
        // data = isArr ? [data] : data;
        // let val = this.getSync(key, true);
        // if (val && Object.prototype.toString.call(val) === '[object Array]') {
        //     val = val.concat(data)
        // } else {
        //     val = data;
        // }
        wx.setStorage({
            key,
            data: JSON.stringify(data),
            success() {
                isAlert && wx.showToast({
                    title: '加入购物车成功',
                    icon: 'success',
                    duration: 1200
                });
                cb && cb();
            },
            fail() {
                isAlert && wx.showToast({
                    title: '加入购物车失败',
                    icon: 'none',
                    duration: 1200
                  })
            }
        })
    }

    remove(key, isAlert) {
        wx.removeStorage({
            key,
            success(res) {
                console.log('删除存储', res)
            },
            fail(res) {
                !!isAlert && wx.showToast({
                    title: '从购物车删除失败',
                    icon: 'none',
                    duration: 1200
                  })
            }
        })
    }
}

export default Storage