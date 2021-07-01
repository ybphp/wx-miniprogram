import Storage from '../../utils/storage'

Component({
    properties: {
        shopInfo: {
            type: Object
        }
    },
    data: {
        show: false,
        footerType: false,  // 底部类型切换
        purchaseCount: 1,
        commodity: {
            img: "http:////gw.alicdn.com/bao/uploaded/i4/3566834623/TB2VcSVr9YTBKNjSZKbXXXJ8pXa_!!3566834623.jpg_200x200Q50s50.jpg",
            defaultPrice: '69',
            stockAll: 4284,    // 总库存
            // stocks: {
            //     ""
            // },
            // selection: [    // 选择条件
            //     {
            //         title: "颜色",
            //         category: [
            //             {
            //                 name: "A款/棉汗布/深麻灰",
            //                 img: "",
            //                 stockAll: 1153,
            //                 stock: {
            //                     S: 215,
            //                     M: 522,
            //                     L: 246,
            //                     XL: 148,
            //                     XXL: 22
            //                 },
            //                 // price: 69,
            //             },
            //             {
            //                 name: "A款/棉汗布/咖啡",
            //                 img: "",
            //                 stockAll: 965,
            //                 stock: {
            //                     S: 254,
            //                     M: 43,
            //                     L: 96,
            //                     XL: 531,
            //                     XXL: 41
            //                 }
            //                 // price: 69,
            //             },
            //             {
            //                 name: "A款/棉汗布/粉红",
            //                 img: "",
            //                 stockAll: 0,
            //                 stock: {
            //                     S: 0,
            //                     M: 0,
            //                     L: 0,
            //                     XL: 0,
            //                     XXL: 0
            //                 },
            //             },
            //             {
            //                 name: "A款/竹节棉/浅麻灰",
            //                 img: "",
            //                 stockAll: 0,
            //                 stock: {
            //                     S: 0,
            //                     M: 0,
            //                     L: 0,
            //                     XL: 0,
            //                     XXL: 0
            //                 },
            //             },
            //             {
            //                 name: "A款/竹节棉/粉红",
            //                 img: "",
            //                 stockAll: 61,
            //                 stock: {
            //                     S: 0,
            //                     M: 61,
            //                     L: 0,
            //                     XL: 0,
            //                     XXL: 0
            //                 },
            //             },
            //             {
            //                 name: "A款/竹节棉/深麻灰",
            //                 img: "",
            //                 stockAll: 20,
            //                 stock: {
            //                     S: 0,
            //                     M: 0,
            //                     L: 20,
            //                     XL: 0,
            //                     XXL: 0
            //                 },
            //             },
            //             {
            //                 name: "备用1",
            //                 img: "",
            //                 stockAll: 0,
            //                 stock: {
            //                     S: 0,
            //                     M: 0,
            //                     L: 0,
            //                     XL: 0,
            //                     XXL: 0
            //                 },
            //             },
            //             {
            //                 name: "备用2",
            //                 img: "",
            //                 stockAll: 0,
            //                 stock: {
            //                     S: 0,
            //                     M: 0,
            //                     L: 0,
            //                     XL: 0,
            //                     XXL: 0
            //                 }
            //             },
            //         ]
            //     },
            //     {
            //         title: "尺码",
            //         category: [
            //             {
            //                 name: "S"
            //             },
            //             {
            //                 name: "M"
            //             },
            //             {
            //                 name: "L"
            //             },
            //             {
            //                 name: "XL"
            //             },
            //             {
            //                 name: "XXL"
            //             },
            //         ]
            //     }
            // ]
            details: {    // 库存
                "A款/棉汗布/深麻灰,S": {
                    stock: 215,
                    price: 69,
                },
                "A款/棉汗布/深麻灰,M": {
                    stock: 522,
                    price: 69,
                },
                "A款/棉汗布/深麻灰,L": {
                    stock: 0,
                    price: 69,
                },
                "A款/棉汗布/深麻灰,XL": {
                    stock: 148,
                    price: 69,
                },
                "A款/棉汗布/深麻灰,XXL": {
                    stock: 22,
                    price: 69,
                },
                "A款/棉汗布/浅麻灰,S": {
                    stock: 254,
                    price: 69,
                },
                "A款/棉汗布/浅麻灰,M": {
                    stock: 43,
                    price: 69,
                },
                "A款/棉汗布/浅麻灰,L": {
                    stock: 96,
                    price: 69,
                },
                "A款/棉汗布/浅麻灰,XL": {
                    stock: 0,
                    price: 69,
                },
                "A款/棉汗布/浅麻灰,XXL": {
                    stock: 531,
                    price: 69,
                },
                "备用,S": {
                    stock: 0,
                    price: 69,
                },
                "备用,M": {
                    stock: 0,
                    price: 69,
                },
                "备用,L": {
                    stock: 0,
                    price: 69,
                },
                "备用,XL": {
                    stock: 0,
                    price: 69,
                },
                "备用,XXL": {
                    stock: 0,
                    price: 69,
                },
                
            },
            selection: [
                {
                    title: "颜色",
                    isMain: true,   // 主分类
                    category: [
                        {
                            name: "A款/棉汗布/深麻灰",
                            img: "http:////img.alicdn.com/imgextra/i3/3566834623/O1CN011k1NSqT4kp9hXyP_!!3566834623.png_200x200Q50s50.jpg",
                            disabled: false,
                        },
                        {
                            name: "A款/棉汗布/浅麻灰",
                            img: "http:////gw.alicdn.com/bao/uploaded/i3/3566834623/TB2dGFTsbZnBKNjSZFhXXc.oXXa_!!3566834623.jpg_200x200Q50s50.jpg",
                            disabled: false,
                        },
                        {
                            name: "备用",
                            disabled: false,
                        }
                        // {
                        //     name: "A款/棉汗布/粉红",
                        //     disabled: false,
                        // },
                        // {
                        //     name: "A款/竹节棉/深麻灰",
                        //     disabled: false,
                        // },
                        // {
                        //     name: "A款/竹节棉/浅麻灰",
                        //     disabled: false,
                        // },
                        // {
                        //     name: "A款/竹节棉/粉红",
                        //     disabled: false,
                        // },
                        // {
                        //     name: "备用",
                        //     disabled: false,
                        // },
                        // {
                        //     name: "备用",
                        //     disabled: false,
                        // }
                    ]
                },
                {
                    title: "尺码",
                    category: [
                        {
                            name: "S",
                            disabled: false,
                        },
                        {
                            name: "M",
                            disabled: false,
                        },
                        {
                            name: "L",
                            disabled: false,
                        },
                        {
                            name: "XL",
                            disabled: false,
                        },
                        {
                            name: "XXL",
                            disabled: false,
                        },
                    ]
                }
            ]
        },
        selected: {},
        selectedInfo: {},  // 选择商品的信息
    },
    lifetimes: {
        attached() {
            this.data.canObserve = false;
        },
    
        ready() {
            let obj = {};
            // 遍历 selection，查看主分类中的条目，是否有库存，没有则设置disabled为true
            this.data.commodity.selection.forEach(item => {
                obj[item.title] = null;
            });
            
            this.setData({ selected: obj })
        }
    },
    methods: {
        prevent() { return false },

        select(ev) {
            if (ev.target.dataset.disabled) return;
            let that = this,
                obj = JSON.parse(JSON.stringify(this.data.selected)),
                commodity = JSON.parse(JSON.stringify(this.data.commodity)),
                title = ev.target.dataset.title,
                content = ev.target.dataset.content;

            obj[title] === content ? obj[title] = null : obj[title] = content;
            this.setData({ selected: obj })
        },

        sort(arr) {
            if (!Array.isArray(arr)) return;
            arr.sort(function(a, b) {
                if (a < b) return -1;
                return 1
            });
            return arr.join(",");
        },

        // 查看是否有库存
        hasStock(stockObj, key) {
            if (!stockObj || !key) return;

            let stock = 0;
            for(let i in stockObj) {
                if (i.split(',').includes(key)) {
                    stock += stockObj[i].stock
                }
            };
            return stock > 0 ? true : false;
        },
    
        // 获取没有库存的字段
        getStock(stockObj, key) {
            if (!stockObj || !key) return;

            let arr = [];
            for(let i in stockObj) {
                let temp = i.split(',');
                if (temp.includes(key) && stockObj[i].stock <= 0) {
                    arr = temp.filter(function(item) { return item !== key });
                }
            };
            // console.log(key, arr)
            return arr
        },

        setDisabled(commodity, noStockCateArr, boolean) {
            commodity.selection.forEach(item => {
                
                item.category.forEach(cate => {
                    if (!noStockCateArr) {
                        cate.disabled = false
                    } else if (noStockCateArr.includes(cate.name)) {
                        cate.disabled = boolean;
                    }
                })
            });
            return commodity            
        },

        // 只要有一个元素相同，就返回true
        contain(origin, arr) {
            let result = false;
            arr.forEach(item => {
                if (item && origin.includes(item)) result = true;
            })
            return result;
        },
        
        // 两个数组过滤
        filter(origin, arr) {
            let result = [];
            origin.forEach(function(item) {
                if (!arr.includes(item)) { result.push(item);}
            });

            return result
        },

        init() {
            let that = this,
                commodity = JSON.parse(JSON.stringify(this.data.commodity));
            
            // 遍历 selection，查看主分类中的条目，是否有库存，没有则设置disabled为true
            commodity.selection.forEach(item => {
                if (item.isMain) {
                    item.category.forEach(cate => {
                        cate.disabled = false;
                        if (!that.hasStock(commodity.details, cate.name)) {  // 没有库存
                            cate.disabled = true;
                        }
                    })
                } else {
                    item.category.forEach(cate => {
                        cate.disabled = false;
                    })
                }
            });
            
            this.setData({ commodity })
        },

        getNullKey(obj) {
            if (typeof obj !== 'object') return;
            var result = []
            for (var i in obj) {
                obj.hasOwnProperty(i) && obj[i] === null && result.push(i)
            }
            return result.join(" ");
        },

        slide(flag) {
            // 选择框已显示
            if (this.data.show) {
                this.selectComponent("#mask").hide();
            } else {
                this.selectComponent("#mask").show();
            };
            this.setData({
                show: !this.data.show,
                footerType: flag ? flag : false
            })
        },

        decrease() {
            if (this.data.purchaseCount > 1) {
                this.setData({ purchaseCount: this.data.purchaseCount - 1 })
            }
        },

        increase() {
            if (this.data.purchaseCount < this.data.selectedInfo.stock) {
                this.setData({ purchaseCount: this.data.purchaseCount + 1 })
            }
        },
        
        purchase() {
            if (!this.data.selectedInfo.currSelect) {
                wx.showToast({ title: '请选择商品参数！', duration: 1200, icon: 'none' })
            } else {
                let obj = {
                        name: this.data.shopInfo.commodity,
                        count: this.data.purchaseCount,
                        price: this.data.selectedInfo.price,
                        params: this.data.selectedInfo.currSelect,
                        selected: false,
                    },
                    that = this,
                    storage = new Storage(),
                    temp = storage.getSync('commodities', true) || [],
                    { exist ,idx } = that.exist(temp, 'shopName', this.data.shopInfo.name);
                    console.log(temp)
                if (!exist) {
                    temp.push({
                        shopName: this.data.shopInfo.name,
                        shopType: this.data.shopInfo.type,
                        selected: false,
                        isEdit: false,
                        commodity: [obj]
                    })
                } else {
                    let flag = false;
                    console.log(idx, temp, this.data.shopInfo)
                    temp[idx]['commodity'].forEach(item => {
                        if (item.name === that.data.shopInfo.commodity && item.params === that.data.selectedInfo.currSelect) {
                            item.count += that.data.purchaseCount;
                            flag = true;
                        }
                    })
                    !flag && temp[idx]['commodity'].push(obj)
                }

                new Storage().set('commodities', temp, true, true, function() {
                    that.slide()
                })
            }
        },
                
        exist(arr, key, value) {
            if (!arr || !key) return;

            let result = false,
                idx = -1;
            arr.forEach((item, index) => {
                if (item[key] === value) { result = true; idx = index };
            })
            console.log(idx, result)
            return {
                exist: result,
                idx: idx
            }
        }
    },
    observers: {
        "selected"(data) {
            // 初始化
            let that = this;
            // that.setData({ commodity: that.setDisabled(that.data.commodity) });
            that.init();
            let vals = Object.values(this.data.selected);
            // console.log(vals);

            // 遍历 details，查找出在当前选择条件下，没有库存的商品数组；
            let details = JSON.parse(JSON.stringify(this.data.commodity.details)),
                noStockArr = [];
            for (var i in details) {
                if (details[i].stock === 0) {
                    noStockArr.push(i)
                }
            };

            // console.log('没有库存的商品', noStockArr)

            // 遍历没有库存的 商品数组
            let result = [];
            noStockArr.forEach(item => {
                let cateArr = item.split(',');
                if (that.contain(cateArr, vals)) {
                    result.push(that.filter(cateArr, vals));
                }
            });

            // console.log('没有库存的商品字段', result)

            let commodity = JSON.parse(JSON.stringify(this.data.commodity));
            if (result.length > 0) {
                result.forEach(function(item) {
                    item.forEach(function(noStock) {
                        commodity.selection.forEach(function(selection) {
                            selection.category.forEach(function(cate) {
                                if (cate.name === noStock) {
                                    cate.disabled = true;
                                }
                            })
                        })
                    })                
                });

                that.setData({ commodity })
            };


            // 显示选择商品对应的信息
            var key = that.sort(Object.values(data)),
                hasVal = typeof details[key] === 'object',
                selectedInfo = {
                    price: hasVal ? details[key].price : commodity.defaultPrice,
                    stock: hasVal ? details[key].stock : commodity.stockAll,
                    noSelect: that.getNullKey(data),
                    currSelect: hasVal ? Object.values(data).join(" ") : null,
                    img: hasVal ? '' : commodity.img,
                }
            that.setData({ selectedInfo });
            // console.log(this.data.selectedInfo)
        }
    }
})