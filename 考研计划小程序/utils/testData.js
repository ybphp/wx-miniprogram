/* 测试数据，最后会删除掉 */

//首页显示的计划
var index_plans = [{
  content: "1、早上：8:00-10:30 记一单元单词",
  flag_star: true,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: false,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: true,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: false,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: false,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: false,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: false,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: false,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: false,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: false,
}, {
  content: "2、下午：14:00-17:30 学习数学理论",
  flag_star: false,
}]

//考研计划 页面中的初始计划
var plans = [{
  date: "2019年02月",
  data: [{
      day: '03日 星期几',
      plan: [{
        time: "8:00-9:00",
        content: "背单词"
      }, {
        time: "9:00-10:00",
        content: "高数"
      }]
    },
    {
      day: '02日 星期几',
      plan: [{
        time: "8:00-9:00",
        content: "背单词"
      }, {
        time: "9:00-10:00",
        content: "高数"
      }]
    },
  ]
}, {
    date: "2019年01月",
    data: [{
      day: '03日 星期几',
      plan: [{
        time: "8:00-9:00",
        content: "背单词"
      }, {
        time: "9:00-10:00",
        content: "高数"
      }]
    },
    {
      day: '02日 星期几',
      plan: [{
        time: "8:00-9:00",
        content: "背单词"
      }, {
        time: "9:00-10:00",
        content: "高数"
      }]
    },
    ]
  }]

//考研计划 页面中点击 加载更多 获取的计划
var morePlans = [{
  date: "2018年11月",
  data: [{
    day: '03日 星期几',
    plan: [{
      time: "8:00-9:00",
      content: "背单词"
    }, {
      time: "9:00-10:00",
      content: "高数"
    }]
  },
  {
    day: '02日 星期几',
    plan: [{
      time: "8:00-9:00",
      content: "背单词"
    }, {
      time: "9:00-10:00",
      content: "高数"
    }]
  },
  ]
}]

module.exports = {
  index_plan: index_plans, //首页显示的计划
  plan: plans, //初始计划
  morePlan: morePlans, //更多计划
}