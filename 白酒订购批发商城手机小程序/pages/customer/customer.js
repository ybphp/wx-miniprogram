// pages/customer/customer.js
import pinyin from '../../utils/getabc';
console.log(pinyin)
Page({
   data: {
    // 当前选择的导航字母
    selected: 0,
    // 选择字母视图滚动的位置id
    scrollIntoView: null,
    // 导航字母
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'
    ],
    groups: [],
    searchstatus:false,
    inputShowed: false,
    inputVal: "",      //搜索框里面的内容
    inputValGroup:[],  //符合搜索框内容的联系人
    lettersPosition:null
  },
  onLoad: function (options) {
     const res = wx.getSystemInfoSync(),
      letters = this.data.letters;
    
    // 设备信息
    this.setData({
      windowHeight: res.windowHeight,
      windowWidth: res.windowWidth,
      pixelRatio: res.pixelRatio,
    });
    //获取自己的信息
    wx.getUserInfo({
      success: (res)=> {
        let nickName = res.userInfo.nickName
        this.setData({
          myuser:{
            name:'懂你',
            firstname:'懂你'.substr(0,1),
            nickname:nickName,
          }
        })
      }
    })
    // 第一个字母距离顶部高度，css中定义nav高度为94%，所以 *0.94
    const navHeight = this.data.windowHeight * 0.94, // 
      eachLetterHeight = navHeight / 26,
      comTop = (this.data.windowHeight - navHeight) / 2,
      temp = [];
    this.setData({
      eachLetterHeight: eachLetterHeight
    });
    // 求各字母距离设备左上角所处位置
    for (let i = 0, len = letters.length; i < len; i++) {
      const x = this.data.windowWidth - (10 + 50) / this.data.pixelRatio,
        y = comTop + (i * eachLetterHeight);
      temp.push([x, y]);
    }
     
    //获得客户信息
    // app.tools.get('/seller/allcustomer', (data) => {
    let data={
        list: [
      {
        "id": 2719,
        "name": "1号"
      },
      {
        "id": 2716,
        "name": "1号"
      },
      {
        "id": 2717,
        "name": "2号"
      },
      {
        "id": 2529,
        "name": "啊连"
      },
      {
        "id": 2533,
        "name": "啊连"
      },
      {
        "id": 2532,
        "name": "啊连"
      },
      {
        "id": 2531,
        "name": "啊连"
      },
      {
        "id": 2530,
        "name": "啊连"
      },
      {
        "id": 2964,
        "name": "冰岛"
      },
      {
        "id": 2629,
        "name": "测试1"
      },
      {
        "id": 2630,
        "name": "测试2"
      },
      {
        "id": 2633,
        "name": "陈"
      },
      {
        "id": 2635,
        "name": "陈顺刚"
      },
      {
        "id": 2879,
        "name": "陈顺刚"
      },
      {
        "id": 2956,
        "name": "陈文虎"
      },
      {
        "id": 2443,
        "name": "董理"
      },
      {
        "id": 2947,
        "name": "懂你"
      },
      {
        "id": 2660,
        "name": "哈哈"
      },
      {
        "id": 2718,
        "name": "娇"
      },
      {
        "id": 2720,
        "name": "舅舅"
      },
      {
        "id": 2518,
        "name": "李某"
      },
      {
        "id": 2445,
        "name": "刘长顺"
      },
      {
        "id": 2895,
        "name": "刘国梁"
      },
      {
        "id": 2705,
        "name": "刘某某"
      },
      {
        "id": 2526,
        "name": "吴二"
      },
      {
        "id": 2537,
        "name": "袁娇"
      },
      {
        "id": 2520,
        "name": "张三"
      },
      {
        "id": 2939,
        "name": "张三三"
      },
      {
        "id": 2519,
        "name": "张胜武"
      }
    ]
      }
      wx.setStorageSync('customer', data.list);
      const groups = [];
      for (let n = 0; n < letters.length; n++) {
        let obj = {};
        obj.groupName = letters[n];
        obj.users = [];
        for (let i = 0; i < data.list.length; i++) {
          let first = pinyin.getCamelChars(data.list[i].name).substr(0, 1);
          let firstname = data.list[i].name.substr(0, 1);
          if (first == letters[n]) {
            obj.users.push({name:data.list[i].name,firstname:firstname,id:data.list[i].id});
          }
        }
        if (obj.users.length > 0) groups.push(obj);
      }

      this.setData({
        lettersPosition: temp,
        groups: groups
      })
      console.log(this.data.groups);
      console.log(this.data.lettersPosition);
  },
 
  tabLetter(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selected: index,
      scrollIntoView: index
    })

    this.cleanAcitvedStatus();
  },
  // 清除字母选中状态
  cleanAcitvedStatus() {
    setTimeout(() => {
      this.setData({
        selected: 0
      })
    }, 500);
  },
  touchmove(e) {
    const x = e.touches[0].clientX,
      y = e.touches[0].clientY,
      lettersPosition = this.data.lettersPosition,
      eachLetterHeight = this.data.eachLetterHeight,
      letters = this.data.letters;
    console.log(y);
    // 判断触摸点是否在字母导航栏上
    if (x >= lettersPosition[0][0]) {
      for (let i = 0, len = lettersPosition.length; i < len; i++) {
        // 判断落在哪个字母区域，取出对应字母所在数组的索引，根据索引更新selected及scroll-into-view的值
        const _y = lettersPosition[i][1], // 单个字母所处高度
          __y = _y + eachLetterHeight; // 单个字母最大高度取值范围
        if (y >= _y && y <= __y) {
          this.setData({
            selected: letters[i],
            scrollIntoView: letters[i]
          });
          break;
        }
      }
    }
  },
  touchend(e) {
    this.cleanAcitvedStatus();
  },
   showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false,
            searchstatus:false,
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: "",
            inputValGroup:''
        });

    },
    inputTyping: function (e) {
        let inputValGroup=[];
        for(let group of this.data.groups){
           for (let user of group.users ){
             //es6    判断是包含字符串  返回   Boolean 类型
              if(user.name.includes(e.detail.value) && e.detail.value){
                    inputValGroup.push(user);
                    console.log(user)
              }
              
           }
        }
         this.setData({
            inputVal: e.detail.value,
            inputValGroup:inputValGroup
        });

    },
    showSearch(e){
      //console.log(11)
        this.setData({
            searchstatus:true,
            inputShowed: true,
        })
    },
    addcustomer(e){
      wx.navigateTo({
        url: 'customerDetail?type=add'
      })
    }
})