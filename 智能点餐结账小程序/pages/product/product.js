//index.js
const allProduct = require('./../../public/data/allProduct.js');
const pinyin = require('./../../utils/lib/pinying.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    category: '',
    sidebar: 'category0',
    searchIconColor: '#666',
    keyboardVal: '输入首字母或编码智能搜索',
    lists: {},
    navActive: 0,
    keyboardShowFlag: true,//键盘输入显示状态
    searchProductShowFlag: true,//搜索商品显示
    searchScrollTop: 0,
    searchProductData: [],//搜索商品数据
    specificationsShowFlag: true,//选择规格弹窗显示状态
    selectProductObj: [],//选择商品的值
    oldSelectProductObj: [],//储存选择商品的原始值
    currentCategoryIndex: null,
    currentProductIndex: null,
    currentTableNumber: null,
    currentTableNumberArea: null,
    oldPrice: 0,//选择单个商品价格
    newPrice: 0,//储存选择的单个商品原始价格
    requiredOptionLength: 0,//必选规格选项的长度
    isSearchFlag: false,//是否为搜索的状态
    remarks: '',
    shopCart: {
      lists: [],
      totalPrice: 0
    },
    animationData: {},
    recommendedScrollTop: 0,
    countData: {
      tableNumber: null
    }
  },

  onLoad: function (options) {
    console.log(options);
    if (!app.globalData.allProduct) {
      // 添加搜索检索，当前分类下标，当前商品下标
      let searchIndexData = allProduct.data.map((item, index) => {
        item.products.map((el, i) => {
          el.searchIndex = pinyin(el.name).toString();
          el.currentCategoryIndex = index;
          el.currentProductIndex = i;
          return el;
        });
        return item;
      });
      app.globalData.allProduct = searchIndexData;

    }

    // 创建动画
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });

    this.setData({
      animationData: animation.export(),
      currentTableNumber: options.tableNumber,
      currentTableNumberArea: options.currentTableNumberArea
    });

    if (!options.selectedPeopleNumber) {
      const tableNumber = `countData.tableNumber`;
      const peopleNumber = `countData.peopleNumber`;
      const area = `countData.area`;
      this.setData({
        [tableNumber]: options.tableNumber,
        [peopleNumber]: options.peopleNumber,
        [area]: options.currentTableNumberArea,
        lists: app.globalData.allProduct,
      });
      console.log(this.data.countData);
      const tableNumberSelet = wx.getStorageSync('tableNumberSelect').data;
      let currentTableNumberData = tableNumberSelet.map(item => {
        if (item.tableNumber === options.tableNumber) {
          item.peopleNumber = options.peopleNumber;
        }
        return item;
      });
      wx.setStorageSync('tableNumberSelect', { data: currentTableNumberData });
    } else {
      //获取当前桌号已点的菜
      const tableNumberSelectData = wx.getStorageSync('tableNumberSelect').data;
      console.log(tableNumberSelectData);
      let currentTableNumberData = [];
      tableNumberSelectData.forEach(item=>{
        if (item.tableNumber === options.tableNumber) {
          currentTableNumberData = item;
          return;
        }
      });
      console.log(currentTableNumberData);
      this.setData({
        lists: currentTableNumberData.allLists,
        shopCart: currentTableNumberData.shopCart
      });
    }

    this.animation = animation;
    console.log(this.data.lists)
  },
  onShow: function () {
    //获取当前桌号已点的菜
    const tableNumberSelet = wx.getStorageSync('tableNumberSelect').data;
    console.log(tableNumberSelet);

    let currentTableNumberData = [];
    console.log(tableNumberSelet);
    tableNumberSelet.map(item => {
      if (item.tableNumber === this.data.currentTableNumber) {
        if (item.allLists) {
          currentTableNumberData = item;
          this.setData({
            lists: currentTableNumberData.allLists,
            shopCart: currentTableNumberData.shopCart,
            countData: currentTableNumberData
          })
        }
      }
    });
  },
  // 侧边栏跳转
  toCategory: function (e) {
    const dataSet = e.currentTarget.dataset;
    this.setData({
      category: dataSet.category,
      navActive: dataSet.index
    });
    this.closeKeyboard();
  },
  getAllProduct: function () {
    wx.request({
      url: '',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  // 选择商品规格
  selectOption: function (e) {
    const dataSet = e.currentTarget.dataset;
    const currentSelect = `selectProductObj.optionGroups[${dataSet.optionsIndex}].options`;
    console.log(dataSet);
    let requiredOptionLength = this.data.requiredOptionLength;
    let singleGroups = this.data.selectProductObj.optionGroups[dataSet.optionsIndex];
    console.log(singleGroups);
    let data;

    if (!dataSet.multiple) {
      //单选
      console.log(singleGroups.required);
      data = singleGroups.options.map((el, index) => {
        el.default = false;
        if (index === dataSet.currentIndex) {
          el.default = true;
          //必选
          if (singleGroups.required && !singleGroups.requiredState) {
            requiredOptionLength--;
            singleGroups.requiredState = true;
          }
        }
        return el;
      })
    } else {
      //多选
      console.log(singleGroups.options);
      data = singleGroups.options.map((el, index) => {
        console.log(el);
        if (index === dataSet.currentIndex) {
          el.default = !el.default;
        }
        return el;
      });
      //必选
      if (singleGroups.required) {
        let optionNumber = 0;
        data.forEach(el => {
          if (el.default) {
            optionNumber++;
          }
        });
        if (optionNumber === 0 && singleGroups.requiredState) {
          requiredOptionLength++;
          singleGroups.requiredState = false;
        }
        if (optionNumber > 0 && !singleGroups.requiredState) {
          requiredOptionLength--;
          singleGroups.requiredState = true;
        }
      }
    }
    console.log(this.data.selectProductObj.optionGroups);

    // 选中商品总价计算
    let totalPrice = this.data.oldPrice;
    let defaultSelectFlag = false;
    let totalRemarks = '';
    this.data.selectProductObj.optionGroups.forEach(item => {
      item.options.forEach(el => {
        if (el.default) {
          totalPrice += el.price;
          defaultSelectFlag = true;
          if (totalRemarks.length == 0) {
            totalRemarks = el.name;
          } else {
            totalRemarks = totalRemarks + ',' + el.name;
          }
        }
      })
    });

    this.data.selectProductObj.totalRemarks = totalRemarks;
    this.setData({
      [currentSelect]: data,
      newPrice: totalPrice,
      defaultSelectFlag: defaultSelectFlag,
      requiredOptionLength: requiredOptionLength
    });

  },
  // 商品选择弹出框
  selectProduct: function (e) {
    const dataSet = e.currentTarget.dataset;

    console.log(this.data.lists);
    console.log(dataSet);
    const data = this.data.lists[dataSet.currentListIndex].products[dataSet.currentProductIndex];

    let totalPrice = data.price;
    let defaultSelectFlag = false;
    let requiredOptionLength = 0;
    let totalRemarks = '';
    //单个商品总价计算
    data.optionGroups.forEach(item => {

      if (item.required) {
        requiredOptionLength++;
      }
      item.options.forEach(el => {
        if (el.default) {
          defaultSelectFlag = true;
          totalPrice += el.price;
          if (totalRemarks.length == 0) {
            totalRemarks = el.name;
          } else {
            totalRemarks = totalRemarks + ',' + el.name;
          }
          console.log(totalRemarks);
          if (item.required) {
            requiredOptionLength--;
            item.requiredState = true;
          }
        }
      })
    });
    data.totalRemarks = totalRemarks;

    this.setData({
      specificationsShowFlag: false,
      selectProductObj: data,
      oldSelectProductObj: data,
      currentCategoryIndex: dataSet.currentListIndex,
      currentProductIndex: dataSet.currentProductIndex,
      oldPrice: data.price,
      newPrice: totalPrice,
      requiredOptionLength: requiredOptionLength,
      defaultSelectFlag: defaultSelectFlag,
      remarks: '',
      recommendedScrollTop: 0
    });
    console.log(data.optionGroups.length);
  },
  // 关闭商品选择弹出框
  closeSelectProduct: function () {
    this.setData({
      specificationsShowFlag: true,
      selectProductObj: [],
      oldSelectProductObj: [],
      currentCategoryIndex: null,
      currentProductIndex: null,
      oldPrice: null,
      newPrice: null,
      requiredOptionLength: 0
    })
  },
  // 备注
  changeRemarks: function (e) {
    console.log(e.detail.value);
    this.setData({
      remarks: e.detail.value,
      defaultSelectFlag: true
    })
  },
  // 确认选购商品
  sureProduct: function (e) {
    console.log(e);
    if (!this.data.requiredOptionLength == 0) {
      return false;
    }
    this.data.selectProductObj.remarks = this.data.remarks || '';

    // 获取当前选择的商品位置和分类位置
    let updateProduct = `lists[${this.data.currentCategoryIndex}].products[${this.data.currentProductIndex}]`;
    let updateCategory = `lists[${this.data.currentCategoryIndex}]`;

    // 设置当前分类下选中商品的总数
    let currentCategory = this.data.lists[this.data.currentCategoryIndex];
    if (currentCategory.countNumber) {
      currentCategory.countNumber = parseInt(currentCategory.countNumber) + 1;
    } else {
      currentCategory.countNumber = 1;
    }
    // 设置当前商品下的选中数量
    let oldSelectProductData = this.data.oldSelectProductObj;
    console.log(oldSelectProductData);
    if (oldSelectProductData.selectNumber) {
      oldSelectProductData.selectNumber = parseInt(oldSelectProductData.selectNumber) + 1;
    } else {
      oldSelectProductData.selectNumber = 1;
    }


    this.data.selectProductObj.price = this.data.newPrice;
    // 购物车
    let shopCart = this.data.shopCart;

    if (this.data.shopCart.lists.length > 0) {
      this.data.shopCart.lists.forEach((item, index) => {
        if (item.id === this.data.selectProductObj.id && item.totalRemarks === this.data.selectProductObj.totalRemarks && item.remarks === this.data.selectProductObj.remarks) {
          item.count = item.count + 1;
        } else if (index === this.data.shopCart.lists.length - 1) {
          this.data.selectProductObj.count = 1;
          shopCart.lists.push(this.data.selectProductObj);
        }
      })
    } else {
      this.data.selectProductObj.count = 1;
      shopCart.lists.push(this.data.selectProductObj);
    }


    // 购物车总价
    let totalPrice = 0;
    let allCount = 0;
    shopCart.lists.forEach(item => {
      totalPrice += item.price * item.count;
      allCount += item.count;
    });

    shopCart.allCount = allCount;
    shopCart.totalPrice = totalPrice.toFixed(2).replace('.00', '');
    let translateY = wx.getSystemInfoSync().windowHeight - 32 - e.detail.y;
    // 开始动画
    this.animation.width(20).height(20).translate(0, translateY).opacity(0.4).step({ duration: 300 });
    // 重置动画
    this.animation.width(72).height(32).translate(0).opacity(1).step({ duration: 0 });

    this.setData({
      shopCart: shopCart,
      [updateProduct]: oldSelectProductData,
      [updateCategory]: currentCategory,
      animationStart: true,
      animationData: this.animation.export()
    });

    // 购物车数据和当前选中的菜品加入全局对应桌号
    const selectData = this.data.countData;
    selectData.state = 'state1';
    selectData.shopCart = shopCart;
    selectData.allLists = this.data.lists;
    selectData.tableNumber = this.data.currentTableNumber;

    const tableNumberSelect = wx.getStorageSync('tableNumberSelect').data;
    console.log(tableNumberSelect);
    let tableNumberSelectData = {};
    tableNumberSelectData.data = tableNumberSelect.map(item => {
      if (item.tableNumber === selectData.tableNumber) {
        item = selectData;
      }
      return item;
    });
    wx.setStorageSync('tableNumberSelect', tableNumberSelectData);
    console.log(wx.getStorageSync('tableNumberSelect').data);
    if (this.data.isSearchFlag) {
      this.searchData();
    }

  },
  // 跳转购物车
  toShopCart: function () {
    wx.navigateTo({ url: `/pages/shopcart/shopcart?tableNumber=${this.data.currentTableNumber}` });
  },
  // 显示键盘
  showKeyboard: function () {
    this.setData({
      keyboardShowFlag: false,
      navActive: null,
      searchIconColor: '#ea5b5b',
      searchProductShowFlag: false,
      searchScrollTop: 0,
      isSearchFlag: true
    })
  },
  // 关闭键盘
  closeKeyboard: function () {
    this.setData({
      keyboardShowFlag: true,
      searchIconColor: '#666',
      searchProductShowFlag: true,
      keyboardVal: '输入首字母或编码智能搜索',
      isSearchFlag: false
    })
  },

  numberKeydown: function (e) {
    const number = e.currentTarget.dataset.number;
    let keyboardVal = null;
    if (this.data.keyboardVal !== '输入首字母或编码智能搜索') {
      keyboardVal = this.data.keyboardVal + '' + number;
    } else {
      keyboardVal = number;
    }
    this.setData({
      keyboardVal: keyboardVal
    });
    this.searchData()
  },
  // 删除
  deleteKeydown: function () {
    if (this.data.keyboardVal === '输入首字母或编码智能搜索') {
      return false;
    }
    let keyboardVal = this.data.keyboardVal.slice(0, -1);
    if (keyboardVal.length === 0) {
      keyboardVal = '输入首字母或编码智能搜索';
    }
    this.setData({
      keyboardVal: keyboardVal
    });
    this.searchData();
  },
  // 清空搜索
  emptyKeydown: function () {
    this.setData({
      keyboardVal: '输入首字母或编码智能搜索'
    });
    this.searchData();
  },
  // 搜索菜品
  searchData: function () {
    let filterData = [];
    let filter = this.data.keyboardVal;

    this.data.lists.forEach(item => {
      item.products.forEach(el => {
        if (el.searchIndex.indexOf(filter) >= 0 || filter === '输入首字母或编码智能搜索') {
          filterData.push(el);
        }
      })
    });

    this.setData({
      searchProductData: filterData
    });
  }
})
