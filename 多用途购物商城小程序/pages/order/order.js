// pages/order/order.js
const app = getApp();
var time = 0,
    touchX = 0,
    interval;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // all,  pay,     delivery, waiting, comment,  done(完成评价)
        titles: ["全部", "待付款", "待发货", "待收货", "待评价"],
        cart_img: "http://gw.alicdn.com/tfscom/TB1xdQSJFXXXXcuXXXXy7S8WFXX-176-176.png",
        lists: [
            {
                left: 0,
                types: "all"
            },
            {
                left: 0,
                types: "pay"
            },
            {
                left: 0,
                types: "delivery"
            },
            {
                left: 0,
                types: "waiting"
            },
            {
                left: 0,
                types: 'comment'
            }
        ],
        currentTab: 0,
        _SysWidth: wx.getSystemInfoSync().windowWidth,
        flag: true, // 防止多次点击
    },

    // 点击 tab 切换
    changeTab(ev) {
        if (ev.currentTarget.dataset) {
            let index = ev.currentTarget.dataset.current;
            if (this.data.currentTab == index) { return }
            else {
                if (this.data.flag) {
                    this.setData({ flag: false })
                    // 点击的tab 在 当前tab 的左侧, 当前页面向右滑动
                    if (index > this.data.currentTab) {
                        // console.log('左滑')
                        this.animate(this.data.currentTab, this.data._SysWidth * -1);
                        let dom = `lists[${index}].left`;
                        this.setData({ [dom]: this.data._SysWidth, currentTab: index })
                        this.animate(this.data.currentTab, 0, () => { this.setData({ flag: true }) });

                    } else {
                        // 点击的tab 在 当前tab 的右侧, 当前页面向左滑动
                        // console.log('右滑')
                        this.animate(this.data.currentTab, this.data._SysWidth);
                        let dom = `lists[${index}].left`;
                        this.setData({ [dom]: this.data._SysWidth * -1, currentTab: index })
                        this.animate(this.data.currentTab, 0, () => { this.setData({ flag: true }) });
                    }
                }
            }
        }
    },

    // 运动函数
    animate(index, target, cb) {
        clearInterval(timer);
        let that = this;
        let dom = `lists[${index}].left`;
        let timer = setInterval(() => {
            let flag = true;
            let current = that.data.lists[index].left;
            let step = ((target - current) / 5);
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            that.setData({ [dom]: current + step });
            if (that.data.lists[index].left != target) { flag = false }
            if (flag) { clearInterval(timer); cb && cb() }
        }, 15)
    },

    touchStart(ev) {
        // console.log(ev.touches[0].pageX)
        touchX = ev.touches[0].pageX;
        interval = setInterval(() => {
            time++;
        })
    },

    touchMove(ev) {
        let touchMoveX = ev.touches[0].pageX;
        let disX = touchMoveX - touchX;
        if (disX <= -40 && time < 200) {
            if (this.data.currentTab == this.data.lists.length - 1) { return }
            else {
                if (this.data.flag) {
                    this.setData({ flag: false })
                    // console.log('左滑');
                    let index = this.data.currentTab + 1;
                    this.animate(this.data.currentTab, this.data._SysWidth * - 1);
                    let dom = `lists[${index}].left`;
                    this.setData({ [dom]: this.data._SysWidth, currentTab: index })
                    this.animate(this.data.currentTab, 0, () => { this.setData({ flag: true }) });
                }
            }
        } else if (disX >= 40 && time < 200) {
            if (this.data.currentTab == 0) { return }
            else {
                if (this.data.flag) {
                    this.setData({ flag: false })
                    // console.log('右滑');
                    let index = this.data.currentTab - 1;
                    this.animate(this.data.currentTab, this.data._SysWidth);
                    let dom = `lists[${index}].left`;
                    this.setData({ [dom]: this.data._SysWidth * -1, currentTab: index })
                    this.animate(this.data.currentTab, 0, () => { this.setData({ flag: true }) });
                }
            }
        }
    },

    touchEnd(ev) {
        time = 0;
        clearInterval(interval)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('load')
        if (!app.globalData.userInfo) {
            console.log('未登录');
            wx.redirectTo({
                url: '/pages/login/login',
                url: `/pages/login/login?from=${this.route}&tab=true`,
            })
        } else {
            wx.showLoading({
                title: '加载中',
            });
            this.data.lists.map((el, index) => {
                if (index == 0) return
                else { let dom = `lists[${index}].left`; this.setData({ [dom]: this.data._SysWidth * -1 }) }
            })

            wx.request({
                url: 'https://api.myjson.com/bins/13qn4a',
                method: 'GET',
                success: res => {
                    this.data.lists.map((list, index) => {
                        let temp = [];
                        if (index == 0) {
                            let target = `lists[0].content`;
                            this.setData({ [target]: res.data.orders });
                            return
                        }
                        res.data.orders.map(order => {
                            if (order.status == list.types) {
                                temp.push(order)
                            }
                        });
                        let target = `lists[${index}].content`;
                        this.setData({ [target]: temp });
                    });

                    wx.hideLoading();
                },
            })
        }
    }
})