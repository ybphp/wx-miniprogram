
# 企业上班打卡签到小程序

用微信小程序实现的一个简单的打卡签到的小程序

## 截图
![预览](images/screen.jpg)

## 拒绝授权-unAuth

这是一个比较孤立的页面，只有一个入口，也就是用户在登录页面拒绝授权后才会跳转至此页面。

## 登录页面-login

该页面是程序的初始页面，小程序有几个入口，该页面就可以从这些入口进入，主要分为两类：

1. 某公司生成的带有参数的，用于打卡的二维码
2. 其他（包括搜索、发现 -> 小程序、推广时不带参数的小程序二维码）

该页面程序逻辑包括：

```
  if(登录) {
    switch(用户类型) {
      case: '某公司的管理员'： 跳转至 管理界面
      case: '某公司的员工'： {
        if（打卡二维码进入）扫码签到
        else 个人考勤
      }
      case: '以上都不是': 跳转至选择页面
    }
  }
  handleLoginBtn() {
    //获取token
    //设置localStorage，包括：access_token, 能判断出用户类型的字段
    //跳转至选择页面
  }
```

get 员工列表  asdfa /token
```
GET token 
type: 'admin','staff','user',

```
## 选择页面-select

选择页面有三个入口，一是登录页面过来，二是员工退出团队后而来，三是管理员解散团队而来。
这三种情况可以算作一种情况，用户都是已登录过的普通用户！

- handleCreateBtn()
- handleJoinBtn()

## 创建团队-create

```
POST 创建团队
```

弹出提示创建成功，跳转至 管理页面


## 加入团队/公司列表-list

```
GET 所有公司列表
```
给 确认加入 页面传入 公司id

## 确认加入-confirm
从之前的页面获取 公司id
```
GET 单个公司信息
```

```
POST 加入某个公司
```

## 审核页面-audit

该页面属于 纯静态页面

-----------------

## 员工列表信息-workers
```
获取员工列表
```

## 单个员工信息-worker

```
获取单个员工
修改单个员工的真实姓名，即备注信息
```

## boss

```
修改团队的信息，包括上下班时间，地理位置
还能生成二维码
```

--------------------------
## 扫码页面-scan
调用wx.scanCode(),只能获取信息，





- unAuth: 拒绝授权
- login: 登录页面
- select: 选择页面
- create: 创建团队/公司
- list: 公司列表
- confirm: 确认加入
- audit：审核页面
- workers：员工列表信息，tarbar左部页面
- worker: 查看单个员工考勤信息
- boss: 管理者，tarbar右部页面
- 
- scan-扫码页面
- clock-打卡页面
- success 打卡成功
- fail 打卡失败
- self-查看个人考勤信息


问题： ？

1. 判断用户类型
2. 打卡二维码的参数
3. 怎么打卡
4. 生成打卡二维码的API

推广时的二维码：
```
{
  "path": "pages/login/login?",
  "width": 430
}
```

打卡时的二维码
```
{
  "path": "pages/login/login?add=''"
}
```

生产二维码码
httpx...
post
{
  compantId
  location
}

返回二维码的图片



打卡的时候

(获取二维码的信息。(公司的companyId + location)
+ 打卡的信息，位置，时间啊，token


打卡成功

打卡失败

## bug修复，界面与逻辑的优化
1. 在scan.js增加定时器，增加打卡逻辑判断，当点击一次后将禁用10秒
2. 在self.js更改增加获取今天日期并显示
3. util.js 增加方法 obtainIndate
4. scan界面样式.seconds和其二级父元素
5. login界面样式.button
6. 在login.js将按钮登陆增加用户类型判断，由于现阶段无扫码进入，

|                                           
|   默认登陆过(非按钮登陆)增加一个虚拟 encrypt   
|   则判定为扫了公司二维码                      
|_________________________________________|__
                                          |  登陆按钮点击则判断用户类型 员工不会跳转去公司列表
                                          |  并且不会有虚拟 encrypt 所以会跳往打卡详情
                                          _____________________________________________

7. 修改了scan.js
8. 修改了success
9. 修改了fail
10. 修改了applylist的无申请人员显示界面
11. 增加了日期选择右边箭头
12. self 修改了暂无打卡纪录显示界面
13. 稍微调整了以下workers界面，只要能获得打卡时间等数据就可以设置为可能异常就黄色，其他的就灰色
14. 修改了app.json 的底部tebar
 －－－－
 增加图片 icons: signOk.png  signoff.png  nosign.png noquick.png