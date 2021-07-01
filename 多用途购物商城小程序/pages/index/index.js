// pages/index.js
Page({
  data: {
    swiper: {
      imgsUrl: [
        "http://gw.alicdn.com/imgextra/i4/49/O1CN011CETsQSQXZPSVFM_!!49-0-lubanu.jpg",
        "https://img.alicdn.com/simba/img/TB19heYdwn.PuJjSZFkSuw_lpXa.jpg_q50.jpg",
        "https://img.alicdn.com/simba/img/TB1oo4fkVYqK1RjSZLeSuvXppXa.jpg_q50.jpg",
        "http://gw.alicdn.com/imgextra/i4/194/O1CN011DItIzqQ4W4g3n3_!!194-0-lubanu.jpg",
        "http://gw.alicdn.com/imgextra/i3/132/O1CN011CqUkZLSHggADjP_!!132-0-luban.jpg"
      ],
      interval: 3000,
      duration: 900,
      circular: true,
    },
    DFrames: {
      bg: "https://gw.alicdn.com/tps/TB155AUPpXXXXajXVXXXXXXXXXX-1125-480.png_.webp",
      layOut: [
        { imgUrl: "https://gw.alicdn.com/tfs/TB1Wxi2trsrBKNjSZFpXXcXhFXa-183-144.png_.webp", text: "天猫", route: "tianmao"},
        { imgUrl: "https://img.alicdn.com/tfs/TB10UHQaNjaK1RjSZKzXXXVwXXa-183-144.png?getAvatar=1_.webp", text: "聚划算" },
        { imgUrl: "https://gw.alicdn.com/tfs/TB11rTqtj7nBKNjSZLeXXbxCFXa-183-144.png?getAvatar=1_.webp", text: "天猫国际" },
        { imgUrl: "https://gw.alicdn.com/tps/TB1eXc7PFXXXXb4XpXXXXXXXXXX-183-144.png?getAvatar=1_.webp", text: "外卖" },
        { imgUrl: "https://gw.alicdn.com/tfs/TB1IKqDtpooBKNjSZFPXXXa2XXa-183-144.png_.webp", text: "天猫超市" },
        { imgUrl: "https://gw.alicdn.com/tfs/TB1o0FLtyMnBKNjSZFoXXbOSFXa-183-144.png_.webp", text: "充值中心" },
        { imgUrl: "https://gw.alicdn.com/tfs/TB1ydXzhCzqK1RjSZPcXXbTepXa-183-144.png?getAvatar=1_.webp", text: "飞猪旅行" },
        { imgUrl: "https://gw.alicdn.com/tfs/TB1BqystrZnBKNjSZFrXXaRLFXa-183-144.png?getAvatar=1_.webp", text: "领金币" },
        { imgUrl: "https://gw.alicdn.com/tfs/TB1CMf4tlnTBKNjSZPfXXbf1XXa-183-144.png?getAvatar=1_.webp", text: "拍卖" },
        { imgUrl: "https://gw.alicdn.com/tfs/TB18P98tyQnBKNjSZFmXXcApVXa-183-144.png?getAvatar=1_.webp", text: "分类" },
      ]
    },
    topLine: {
      tips: [
          { 
            category1: "热文", 
            text1: "10G运存滑盖全面屏，小米MIX3发布",
            category2: "评测",
            text2: "滑一下开启全新世界 小米MIX 3评测"
          },
          { 
            category1: "海贼",
            text1: "海贼：赏金仅次于路飞的他，到底有多强？",
            category2: "影视",
            text2: "漫威另类英雄《毒液》强势来袭 主创力荐IMAX3D版颠覆感官"
          }
      ],
      interval: 1800,
      duration: 400
    },
    recommend: [
      {
        title: "https://gw.alicdn.com/tfs/TB1317ISFXXXXbxXVXXXXXXXXXX-563-78.png_.webp",
        subTitle: "",
        imgUrl1: "http://gw.alicdn.com/imgextra/O1CN011CSg9OUhlugwQbN_!!80-0-lubanu.jpg_100x100q85s150.jpg_.webp",
        imgUrl2: "http://gw.alicdn.com/imgextra/O1CN011DG8vZEAqV62kTI_!!188-0-lubanu.jpg_200x200q85s150.jpg_.webp"
      },
      {
        title: "https://gw.alicdn.com/tfs/TB1ANZGSFXXXXXdXVXXXXXXXXXX-563-78.png_.webp",
        subTitle: "高颜值美物",
        imgUrl1: "http://gw.alicdn.com/imgextra/i4/52/TB2XeAmnr9YBuNjy0FgXXcxcXXa_!!52-0-luban.jpg_100x100q85s150.jpg_.webp",
        imgUrl2: "http://gw.alicdn.com/imgextra/i1/56/TB2v0TUqbsrBKNjSZFpXXcXhFXa_!!56-0-luban.jpg_200x200q85s150.jpg_.webp"
      },
      {
        title: 'https://img.alicdn.com/tfs/TB1NnpaxljTBKNjSZFuXXb0HFXa-563-78.png_.webp',
        subTitle: "2018流行啥",
        imgUrl1: "http://gw.alicdn.com/imgextra/i3/172/TB2PBBYnuOSBuNjy0FdXXbDnVXa_!!172-0-luban.jpg_100x100q85s150.jpg_.webp",
        imgUrl2: "http://gw.alicdn.com/imgextra/i1/157/TB2FF7Ve98YBeNkSnb4XXaevFXa_!!157-0-luban.jpg_200x200q85s150.jpg_.webp"
      },
      {
        title: "https://gw.alicdn.com/tfs/TB1FqhfSVXXXXaqXXXXXXXXXXXX-563-78.png_.webp",
        subTitle: "帮您整理好",
        imgUrl1: "http://gw.alicdn.com/imgextra/i3/18/TB28ky8nxWYBuNjy1zkXXXGGpXa_!!18-0-luban.jpg_100x100q85s150.jpg_.webp",
        imgUrl2: "http://gw.alicdn.com/imgextra/i1/50/TB2FwYanr9YBuNjy0FgXXcxcXXa_!!50-0-luban.jpg_200x200q85s150.jpg_.webp"
      },
      
    ],
    TBlive: {
      bg_mask: "https://gw.alicdn.com/tfs/TB1wx_RQFXXXXbGXFXXXXXXXXXX-250-125.png_200x200q85s150.jpg_.webp",
      top_bg: "https://gw.alicdn.com/tfs/TB1MGnKQFXXXXcAXpXXXXXXXXXX-1125-87.png?getAvatar=1_.webp",
      top_left_bg: "http://gw.alicdn.com/tfscom/i4/O1CN011ui6aeDZXUzeL0r_!!0-dgshop.jpg",
      top_left_title: "21世纪吃土患者的福音",
      top_left_subTitle: "看直播是一种习惯",
      top_heart: "https://gw.alicdn.com/tfs/TB1I1vQQFXXXXcaXFXXXXXXXXXX-54-54.png_.webp",
      top_right_bg: "https://gw.alicdn.com/imgextra/i1/80/TB2ah6zaQfb_uJkHFJHXXb4vFXa_!!80-0-luban.jpg_200x200q85s150.jpg_.webp",
      top_right_title: "主播优选",
      top_right_subTitle: "中老年人皮鞋",
      btm: [{
          bg: "https://gw.alicdn.com/imgextra/i3/57/TB2Pnk_k2xNTKJjy0FjXXX6yVXa_!!57-0-luban.jpg_200x200q85s150.jpg_.webp",
          title: "乐家乐活",
          subTitle: "珊瑚绒四件套"
        }, {
          bg: "https://gw.alicdn.com/imgextra/i2/39/TB2fb7eaYwrBKNjSZPcXXXpapXa_!!39-0-luban.jpg_200x200q85s150.jpg_.webp",
          title: "珠光宝气",
          subTitle: "绿花翡翠吊坠"
        }, {
          bg: "https://gw.alicdn.com/imgextra/i4/110/TB2g4kwcjgy_uJjSZSgXXbz0XXa_!!110-0-luban.jpg_200x200q85s150.jpg_.webp",
          title: "全球现场",
          subTitle: "做旧卡通卫衣"
        }
      ],
      btm_live_bg: "https://gw.alicdn.com/tfs/TB1mQYqQFXXXXXKapXXXXXXXXXX-90-44.png_.webp"
    },
  },

  goto (ev) {
    let route = ev.currentTarget.dataset.route;
    if (route) {
      console.log(route)
      wx.navigateTo({
        url: `/pages/${route}/${route}`,
      })
    }
  },
  
  onLoad: function (options) {

  },
})