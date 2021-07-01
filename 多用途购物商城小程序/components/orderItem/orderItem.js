// components/orderItem/orderItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    types: String,
    order: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    // order: {
    //   sellType: "http://gw.alicdn.com/tfs/TB1LmH7SXXXXXXYXFXXXXXXXXXX-63-63.png",
    //   sellName: "统一官方旗舰店",
    //   status: "pay",
    //   goods: [
    //     {
    //       img: "http://img.alicdn.com/imgextra/i1/2757793292/TB2lEUJcSzqK1RjSZPxXXc4tVXa_!!2757793292-0-item_pic.jpg_200x200.jpg",
    //       price: 54.90,
    //       count: 1,
    //       SevenDay: false,  // 7天退换
    //       TianMao: false, // 天猫无忧购
    //       title: "统一汤达人方便面酸酸辣辣豚骨面杯面 12杯整箱装 泡面",
    //       remark: "小杯装"
    //     }
    //   ],
    //   allCount: 1,  // 商品总数
    //   allPrice: 54.90, //商品总价
    // },
    // lists: [
    //   {
    //     sellType: "http://gw.alicdn.com/tfs/TB1LmH7SXXXXXXYXFXXXXXXXXXX-63-63.png",
    //     sellName: "统一官方旗舰店",
    //     status: "pay",
    //     goods: [
    //       {
    //         img: "http://img.alicdn.com/imgextra/i1/2757793292/TB2lEUJcSzqK1RjSZPxXXc4tVXa_!!2757793292-0-item_pic.jpg_200x200.jpg",
    //         price: 54.90,
    //         count: 1,
    //         SevenDay: false,  // 7天退换
    //         TianMao: false, // 天猫无忧购
    //         title: "统一汤达人方便面酸酸辣辣豚骨面杯面 12杯整箱装 泡面",
    //         remark: ""
    //       }
    //     ],
    //     allCount: 1,  // 商品总数
    //     allPrice: 54.90, //商品总价
    //   },
    //   {
    //     sellType: "http://gw.alicdn.com/tfs/TB1LmH7SXXXXXXYXFXXXXXXXXXX-63-63.png",
    //     sellName: "鲜满多官方旗舰店",
    //     status: "pay",
    //     goods: [
    //       {
    //         img: "http://img.alicdn.com/imgextra/i4/2395306235/TB1oTNgk5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_200x200.jpg",
    //         price: 1.72,
    //         count: 2,
    //         SevenDay: true,  // 7天退换
    //         TianMao: false, // 天猫无忧购
    //         title: "【鲜满多】50g劲辣秘酱糖醋香烤鸡鸭脖子特产肉类小零食满30包邮",
    //         remark: "劲辣脖子50g 一只"
    //       },
    //       {
    //         img: "http://img.alicdn.com/imgextra/i4/2395306235/TB1oTNgk5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_200x200.jpg",
    //         price: 1.72,
    //         count: 2,
    //         SevenDay: true,  // 7天退换
    //         TianMao: false, // 天猫无忧购
    //         title: "【鲜满多】50g劲辣秘酱糖醋香烤鸡鸭脖子特产肉类小零食满30包邮  ",
    //         remark: "秘酱脖子50g 一只"
    //       },
    //       {
    //         img: "http://img.alicdn.com/imgextra/i4/2395306235/TB1oTNgk5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_200x200.jpg",
    //         price: 1.72,
    //         count: 10,
    //         SevenDay: true,  // 7天退换
    //         TianMao: false, // 天猫无忧购
    //         title: "【鲜满多】50g香辣麻辣蜜汁奥尔良烤翅真空办公室小吃零食鸭翅BBQ  ",
    //         remark: "奥尔良（50g烤翅）一只"
    //       },
    //     ],
    //     allCount: 14,  // 商品总数
    //     allPrice: 54.90, //商品总价
    //   }
    // ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
