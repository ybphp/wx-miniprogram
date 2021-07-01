// pages/cart/cart.js
var recordStartX = 0;
var currentOffsetX = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    chooseNum:0,
    listItem:[
      { id: '1', title: 'Apple/苹果iPhone 11 ProMAX官网旗舰店256G全网通国行正品iPhone11手机', img: '../../assets/imgs/listImg2.png', num: 2, price: 10, attr: '属性1;属性2', checked:false},
      { id: '2', title: 'Apple/苹果iPhone 11 ProMAX官网旗舰店256G全网通国行正品iPhone11手机', img: '../../assets/imgs/listImg2.png', num: 3, price: 20, attr: '属性1;属性2', checked:false },
      { id: '3', title: 'Apple/苹果iPhone 11 ProMAX官网旗舰店256G全网通国行正品iPhone11手机', img: '../../assets/imgs/listImg2.png', num: 3, price: 20, attr: '属性1;属性2', checked: true }
        ],
    allPrice:0,
    selectedAllStatus: false,
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.calculateTotal();
 
  },
   toConfirm() {
    wx.navigateTo({
      url: '../orderConfirm/orderConfirm'
    })
  },
  
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    let listItem = this.data.listItem;
    listItem[e.currentTarget.dataset.index].num=num;
    // 将数值与状态写回
    this.setData({
      listItem:listItem
    });
    this.calculateTotal();
  },
  toHomePage(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
     * 删除购物车当前商品
     */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let listItem = this.data.listItem;
    listItem.splice(index, 1);
    this.setData({
      listItem: listItem
    });
    if (!listItem.length) {
      this.setData({
        iscart: true
      });
    } else {
      this.calculateTotal();
    }
  },

  /**
   * 计算商品总数
   */
  calculateTotal: function () {
    var listItem = this.data.listItem;
    var chooseNum = 0;
    var allPrice = 0;
    for (var i = 0; i < listItem.length; i++) {
      var good = listItem[i];
      if (good.checked) {
        chooseNum += parseInt(good.num);
        allPrice += good.num * good.price;
      }
    }
    allPrice = allPrice.toFixed(2);
    this.setData({
      'chooseNum': chooseNum,
      'allPrice': allPrice
    })
  },

  /**
   * 用户点击商品减1
   */
  subtracttap: function (e) {
    var index = e.target.dataset.index;
    var listItem = this.data.listItem;
    var num = listItem[index].num;
    if (num <= 1) {
      return;
    } else {
      listItem[index].num--;
      this.setData({
        'listItem': listItem
      });
      this.calculateTotal();
    }
  },

  /**
   * 用户点击商品加1
   */
  addtap: function (e) {
    var index = e.target.dataset.index;
    var listItem = this.data.listItem;
    var num = listItem[index].num;
    listItem[index].num++;
    this.setData({
      'listItem': listItem
    });
    this.calculateTotal();
  },
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e);
    var checkboxItems = this.data.listItem;
    var values = e.detail.value;
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].id == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    var selectedAllStatus = false;
    if (checkboxItems.length == values.length) {
      selectedAllStatus = true;
    }

    this.setData({
      'listItem': checkboxItems,
      'selectedAllStatus': selectedAllStatus
    });
    this.calculateTotal();
  },

  /**
   * 用户点击全选
   */
  selectalltap: function (e) {
    // console.log('用户点击全选，携带value值为：', e.detail.value);
    var value = e.detail.value;
    var selectedAllStatus = false;
    if (value && value[0]) {
      selectedAllStatus = true;
    }
    var listItem = this.data.listItem;
    for (var i = 0; i < listItem.length; i++) {
      var good = listItem[i];
      good['checked'] = selectedAllStatus;
    }

    this.setData({
      'selectedAllStatus': selectedAllStatus,
      'listItem': listItem
    });
    this.calculateTotal();
  },
  recordStart: function (e) {
    recordStartX = e.touches[0].clientX;
    currentOffsetX = this.data.listItem[0].offsetX;
    console.log('start x ', recordStartX);
  }
  ,


  // 左滑删除
  recordMove: function (e) {
    var listItem = this.data.listItem;
    var item = listItem[0];
    var x = e.touches[0].clientX;
    var mx = recordStartX - x;
    console.log('move x ', mx);

    var result = currentOffsetX - mx;
    if (result >= -80 && result <= 0) {
      item.offsetX = result;
    }
    this.setData({
      listItem: listItem
    });
  }
  ,
  recordEnd: function (e) {
    var listItem = this.data.listItem;
    var item = listItem[0];
    console.log('end x ', item.offsetX);

    if (item.offsetX < -40) {
      item.offsetX = -80;

    } else {
      item.offsetX = 0;

    }
    this.setData({
      listItem: listItem
    });
  }


})