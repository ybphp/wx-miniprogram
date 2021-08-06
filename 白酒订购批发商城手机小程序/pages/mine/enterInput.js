// pages/mine/enterInput.js
Page({
  data:{
    pagetype:'',
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let pagetype = options.type=='name' ? 'name' : 'phone';
    let title= options.type=='name' ? '编辑真实姓名' : '修改手机号';
    let phone= options.phone ||'';
    let name = options.name  || '';

    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      pagetype:pagetype,
      phone:phone,
      name:name
    })
  },
  inputValue(e){
      if(this.data.pagetype=='name'){
        this.setData({
            'name':e.detail.value
        })
      }else{
        this.setData({
            'phone':e.detail.value
        })

      }
     
    
  },
  backWind(){
      //获改变的值
      let changedata= this.data.pagetype=='name' ? {name:this.data.name} : {phone:this.data.phone} 
      //保存并且刷新  获得当前页面的栈
      let pages=getCurrentPages();
      //判断当前栈的长度是否大于一   否则不能返回   (第一个栈为首页  最后一个栈为当前页)
      if(pages.length>1){
            //上一个页面实例对象
            let prePage = pages[pages.length - 2];
            //调用上一个页面的方法 changeData()
            prePage.changeData(changedata);
      }
      wx.navigateBack();  
      
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
  }
})