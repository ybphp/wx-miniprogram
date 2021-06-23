function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let imgUrls = {
        shuzi:[
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/1.jpg',name:'1',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/2.jpg',name:'2',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/3.jpg',name:'3',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/4.jpg',name:'4',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/5.jpg',name:'5',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/6.jpg',name:'6',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/7.jpg',name:'7',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/8.jpg',name:'8',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/9.jpg',name:'9',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/10.jpg',name:'10',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/11.jpg',name:'11',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/12.jpg',name:'12',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/13.jpg',name:'13',nameEn:''},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuzi/14.jpg',name:'14',nameEn:''}
      ],
      shuiguo:[
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/apple.jpg',name:'苹果'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/pear.jpg',name:'梨'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/apricot.jpg',name:'杏'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/banana.jpg',name:'香蕉'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/carambola.jpg',name:'杨桃'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/cherry.jpg',name:'樱桃'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/coconut.jpg',name:'椰子'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/grape.jpg',name:'葡萄'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/grapefruit.jpg',name:'柚子'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/hamimelon.jpg',name:'哈密瓜'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/hawthorn.jpg',name:'山楂'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/jujube.jpg',name:'枣'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/kiwifruit.jpg',name:'猕猴桃'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/lemon.jpg',name:'柠檬'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/loquat.jpg',name:'枇杷'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/mango.jpg',name:'芒果'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/mangosteen.jpg',name:'山竹'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/olive.jpg',name:'橄榄'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/peach.jpg',name:'桃'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/persimmon.jpg',name:'柿子'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/pineapple.jpg',name:'菠萝'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/plum.jpg',name:'李子'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/pomegranate.jpg',name:'石榴'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/strawberry.jpg',name:'草莓'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/shuiguo/watermelon.jpg',name:'西瓜'}
      ],
      dongwu:[
        {url:'http://images-1251567240.cosgz.myqcloud.com/dongwu/ma.jpg',name:'马'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/dongwu/niu.jpg',name:'牛'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/dongwu/yang.jpg',name:'羊'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/dongwu/yu.jpg',name:'鱼'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/dongwu/chong.jpg',name:'虫'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/dongwu/niao.jpg',name:'鸟'}
      ],
      shentibuwei:[
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/ren.jpg',name:'人'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/tou.jpg',name:'头'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/mu.jpg',name:'目'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/mei.jpg',name:'眉'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/bi.jpg',name:'鼻'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/er.jpg',name:'耳'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/kou.jpg',name:'口'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/ya.jpg',name:'牙'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/she.jpg',name:'舌'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/xin.jpg',name:'心'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/shou.jpg',name:'手'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/zu.jpg',name:'足'},
        {url:'http://images-1251567240.cosgz.myqcloud.com/qiguan/shen.jpg',name:'身'}
      ]
    };

module.exports = {
  formatTime: formatTime,
  imgUrls:imgUrls
}
