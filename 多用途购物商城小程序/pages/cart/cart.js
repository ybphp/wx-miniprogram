import Storage from '../../utils/storage'

// pages/cart/cart.js
const app = getApp();
Page({

    data: {
        cart_img: "http://gw.alicdn.com/tfscom/TB1xdQSJFXXXXcuXXXXy7S8WFXX-176-176.png",

        // 加入购物车的商品
        commodities: [
            {
                shopName: 'xxxxxx店铺',
                shopType: "qiye",
                selected: false,    // 店铺全选
                isEdit: false,
                commodity: [
                    {
                        name: "黑曼巴变形玩具金刚MPM04合金晴天SS柱霸王龙钢索红蜘蛛氮气模型",
                        price: 91,
                        params: "规格: 暂无; 大小: 暂无",
                        count: 1,
                        selected: false    // 商品选中
                    },
                    {
                        name: "黑曼巴变形玩具金刚MPM04合金晴天SS柱霸王龙钢索红蜘蛛氮气模型",
                        price: 91,
                        params: "规格: 暂无; 大小: 暂无",
                        count: 1,
                        selected: false    // 商品选中
                    }
                ]
            },
            {
                shopName: '又一家店铺',
                selected: false,
                shopType: "tianmao",
                isEdit: false,
                commodity: [
                    {
                        name: "这里是购买货物的名称",
                        price: 31,
                        params: "规格: 暂无; 大小: 暂无",
                        count: 1,
                        selected: false

                    }
                ]
            },
            {
                shopName: '又一家店铺',
                selected: false,
                shopType: "tianmao",
                isEdit: false,
                commodity: [
                    {
                        name: "这里是购买货物的名称",
                        price: 31,
                        params: "规格: 暂无; 大小: 暂无",
                        count: 1,
                        selected: false

                    }
                ]
            },
            {
                shopName: '又一家店铺',
                selected: false,
                shopType: "tianmao",
                isEdit: false,
                commodity: [
                    {
                        name: "这里是购买货物的名称",
                        price: 31,
                        params: "规格: 暂无; 大小: 暂无",
                        count: 1,
                        selected: false

                    }
                ]
            }
        ],
        accountInfo: {
            allCount: 0,
            allAccount: 0,
        },
        checkedAll: false,
    },

    onLoad: function (options) {
        if (!app.globalData.userInfo) {
            console.log('未登录');
            wx.redirectTo({
                url: '/pages/login/login',
                url: `/pages/login/login?from=${this.route}&tab=true`,
            })
        }
    },

    onShow: function () {
        this.getCommodities();
    },

    onPullDownRefresh: function () {

    },


    // 选择 店铺 或 商品
    checked(ev) {
        let dataset = ev.currentTarget.dataset,
            commodities = [].slice.call(this.data.commodities),
            type = dataset.type,
            shopidx = dataset.shopidx;
        if (type === 'shop') {
            let selected = commodities[shopidx]['selected'];
            if (selected) {
                // 取消选中当前店铺包括商品全部
                this.setSelected(commodities, shopidx, null, false);
            } else {
                // 全部选中当前店铺包括商品
                this.setSelected(commodities, shopidx, null, true);
            }
        } else {
            let commodityIdx = dataset.index,
                selected = commodities[shopidx]['commodity'][commodityIdx].selected;
            if (selected) {
                // 取消选中当前店铺包括商品全部
                this.setSelected(commodities, shopidx, commodityIdx, false);
            } else {
                // 全部选中当前店铺包括商品
                this.setSelected(commodities, shopidx, commodityIdx, true);
            }
        };

        // this.setData({ commodities: result })
    },

    // 全选
    checkedAll() {
        let checked = this.data.checkedAll,
            commodities = [].slice.call(this.data.commodities),
            allCount = 0,
            allAccount = 0;
        commodities.forEach(shop => {
            shop['selected'] = !checked;
            shop['commodity'].forEach(i => {
                i['selected'] = !checked;
                allCount += i['count'];
                allAccount += i['price'] * i['count'];
            })
        });
        
        this.setData({
            commodities,
            accountInfo: {
                allAccount: checked ? 0 : allAccount,
                allCount: checked ? 0 : allCount
            },
            checkedAll: !checked
        })
    },

    setSelected(commodities, shopidx, commodityIdx, boolean) {
        if (!commodities || shopidx == undefined) return;

        let allCount = 0,
            allAccount = 0,
            accountInfo = Object.assign({}, this.data.accountInfo);
        if (commodityIdx == undefined) {
            commodities[shopidx]['selected'] = boolean;
            commodities[shopidx].commodity.forEach(item => {
                    item['selected'] = boolean;
                    allCount += item['count'];
                    allAccount += item['price'] * item['count'];
            });
            if (!boolean) { allAccount = allAccount * -1; allCount = allCount * -1 };
        } else {
            commodities[shopidx].commodity[commodityIdx]['selected'] = boolean;
            allCount += commodities[shopidx].commodity[commodityIdx]['count'];
            allAccount += commodities[shopidx].commodity[commodityIdx]['price'] * commodities[shopidx].commodity[commodityIdx]['count'];
            if (!boolean) { allAccount = allAccount * -1; allCount = allCount * -1 };
            let result = true;
            commodities[shopidx].commodity.forEach(item => {
                result = result && item['selected']
            });
            commodities[shopidx]['selected'] = result;
        }

        accountInfo['allCount'] += allCount;
        accountInfo['allAccount'] += allAccount;

        this.setData({ commodities, accountInfo })
    },

    // 商品编辑
    edit(ev) {
        let shopIdx = ev.currentTarget.dataset['shopidx'],
        commodities = [].slice.call(this.data.commodities);
        commodities[shopIdx]['isEdit'] = !commodities[shopIdx]['isEdit'];
        this.setData({ commodities });
    },

    // 删除商品
    delCommodity(ev) {
        let dataset = ev.currentTarget.dataset,
            shopIdx = dataset['shopidx'],
            commodityIdx = dataset['index'],
            commodities = [].slice.call(this.data.commodities);
        commodities[shopIdx]['commodity'].splice(commodityIdx, 1);

        // 判断 店铺中是否还有商品
        if (commodities[shopIdx]['commodity'].length <= 0) commodities.splice(shopIdx, 1);

        this.setData({ commodities })

    },

    getCommodities() {
        let that = this;
        new Storage().get('commodities', false, function(data) {
            that.setData({ commodities: JSON.parse(data) || [] })
        });

    },

    // 修改购买数量
    change(ev) {
        let dataset = ev.currentTarget.dataset,
            event = dataset['event'],
            shopidx = dataset['shopidx'],
            commodityidx = dataset['index'],
            commodities = [].concat(this.data.commodities),
            count = commodities[shopidx]['commodity'][commodityidx].count;
        if (event === 'decrease') {
            if (count <= 1) {
                wx.showToast({ title: "宝贝数量已经不能再减少啦！", icon: 'none' });
            } else {
                commodities[shopidx]['commodity'][commodityidx].count = count - 1;
            }
        } else if (event === 'increase') {
            // 需要判断库存
            commodities[shopidx]['commodity'][commodityidx].count = count + 1;
        };

        this.setData({ commodities });
    }

})