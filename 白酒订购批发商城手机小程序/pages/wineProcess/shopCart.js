// pages/wineProcess/shopCart.js
Page({
  data:{
      

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      foodsgroup:[{
        foctory_id:1,
        foctory_name:'仁怀市茅台镇永泰酒业有限公司',
        foodlist:[{
           id:1,
           food_name:'永泰老酒1915 六瓶/件',
           food_price:2699,
           food_norm:'6瓶/ 件',
           food_num:1,
           checked: true
        },
        {
           id:2,
           food_name:'永泰老酒1915 六瓶/件',
           food_price:2699,
           food_norm:'6瓶/ 件',
           food_num:1
        },
        {
           id:3,
           food_name:'永泰老酒1915 六瓶/件',
           food_price:2699,
           food_norm:'6瓶/ 件',
           food_num:1
        }]

      },
      
    
      ]
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value,e.currentTarget.dataset.id);
        let checkboxItems=this.data.foodsgroup, values = e.detail.value, idx=e.currentTarget.dataset.id;
        for (let i = 0, lenI = checkboxItems[idx].foodlist.length; i < lenI; ++i) {
            checkboxItems[idx].foodlist[i].checked = false;
            for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(i == values[j]){
                     checkboxItems[idx].foodlist[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            foodsgroup: checkboxItems
        });
       
    },
   goConOrder(){
     wx.navigateTo({
       url: 'confirmOrder'
     })
   }
})