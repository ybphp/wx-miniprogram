var local_database = [{
  // 微信授权后得到的信息
  wx_user_info: {
    // id唯一
    open_id: "agagastewfatwe",
    user_name: "忆梦",
    user_avatar: "/images/menu/head.png",
    // 用户性别
    user_gender: "1",
    user_city: "汕头"
  },
  // 用户填写的设置信息
  user_info: {
    // 用户生日
    user_brithday: "1998-02-01",
    user_target: "复旦大学",
    user_motto: "考研路上，我们都不是孤单的",
    // 用户设置的考研日期
    user_exam_date: "2020-12-22"
  },
  // 考研计划
  exam_plan:
    [{
      plan_id: 1,
      plan_content: "图书馆学习",
      plan_star_time: "2019-02-01 8:00",
      plan_end_time: "2019-02-01 9:00",
      //  是否每日重复
      plan_if_repeat: "true",
      //  是否打开微信未完成提示
      plan_if_prompt: "true",
      //  提示的时间
      plan_if_prompt_time: "2019-02-01 8:30",
      //  是否已完成
      plan_if_finish: "false",
      //  用户左滑窗口
      right: 0
    }, {
      plan_id: 2,
      plan_content: "图书馆学习",
      plan_star_time: "2019-02-01 8:00",
      plan_end_time: "2019-02-01 9:00",
      //  是否每日重复
      plan_if_repeat: "true",
      //  是否打开微信未完成提示
      plan_if_prompt: "true",
      //  提示的时间
      plan_if_prompt_time: "2019-02-01 8:30",
      //  是否已完成
      plan_if_finish: "false",
      //  用户左滑窗口
      right: 0
    }],
  //  考研日记
  exam_diary: [{
    diary_id: 1,
    diary_title: "考研小日记",
    diary_content: "快考研啦！",
    diary_write_time: "2019-02-01 8:00",
    diary_write_place: "广东财经大学",
    //  用户左滑窗口
    right: 0
  }, {
    diary_id: 2,
    diary_title: "考研小日记",
    diary_content: "快考研啦！",
    diary_write_time: "2019-02-01 8:00",
    diary_write_place: "广东财经大学",
    //  用户左滑窗口
    right: 0
  }],
  // 考研安排
  exam_arrangement: [{
    exam_id: 1,
    exam_content: "数学考试",
    exam_place: "广财1教101",
    exam_time: "2019-03-01 8:00",
    //  是否打开微信提示考试时间
    plan_if_prompt: "true",
    //  提示的时间
    plan_if_prompt_time: "2019-02-01 8:30",

    //  用户左滑窗口
    right: 0
  }, {
    exam_id: 2,
    exam_content: "数学考试",
    exam_place: "广财1教101",
    exam_time: "2019-03-01 8:00",
    //  是否打开微信提示考试时间
    plan_if_prompt: "true",
    //  提示的时间
    plan_if_prompt_time: "2019-02-01 8:30",
    //  用户左滑窗口
    right: 0
  }],
},
]

module.exports = {
  postList: local_database
}