var express = require('express');
var bodyParser = require("body-parser"); 
var app = express();
    app.use(bodyParser.urlencoded({extended: false}));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


function get_lsit(){
    return {
        status: 1,
        msg: '',
        data: [{
            id:1,
            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585160691655&di=8ec75674a50f72d1956b5962d017bfc1&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F120331%2F6349-12033110350786.jpg",
            title:'ps从小白到精通全程课程',
            desc:'9.4万人学习了此课程',
            price_text:'免费'
        },{
            id:2,
            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585160691655&di=8ec75674a50f72d1956b5962d017bfc1&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F120331%2F6349-12033110350786.jpg",
            title:'ps从小白到精通全程课程',
            desc:'9.4万人学习了此课程',
            price_text:'免费'
        },{
            id:2,
            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585160691655&di=8ec75674a50f72d1956b5962d017bfc1&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F120331%2F6349-12033110350786.jpg",
            title:'ps从小白到精通全程课程',
            desc:'9.4万人学习了此课程',
            price_text:'免费'
        },{
            id:1,
            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585160691655&di=8ec75674a50f72d1956b5962d017bfc1&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F120331%2F6349-12033110350786.jpg",
            title:'ps从小白到精通全程课程',
            desc:'9.4万人学习了此课程',
            price_text:'免费'
        },{
            id:2,
            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585160691655&di=8ec75674a50f72d1956b5962d017bfc1&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F120331%2F6349-12033110350786.jpg",
            title:'ps从小白到精通全程课程',
            desc:'9.4万人学习了此课程',
            price_text:'免费'
        },{
            id:2,
            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585160691655&di=8ec75674a50f72d1956b5962d017bfc1&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F120331%2F6349-12033110350786.jpg",
            title:'ps从小白到精通全程课程',
            desc:'9.4万人学习了此课程',
            price_text:'免费'
        }]
           
    };
}

function get_banner() {
    return {
        status: 1,
        msg: '',
        data: [
            {
                'id':1,
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585073753183&di=219f308625a13d6e099f819d2b5cd685&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F04%2F30%2F04%2F645840320236ac4.JPG', 
            },{
                'id':2,
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585109520394&di=05dbb3fa30e30470649ad14750a74a33&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D2437909414%2C3398876843%26fm%3D214%26gp%3D0.jpg', 
            }
        ]
    };
}

function get_detail() {
    return {
        status: 1,
        msg: '',
        data: {
            'id':1,
            'title':'ps从小白到精通全程课程',
            'num_text':'122人在学',
            'desc_items':[
                {
                    'type':1, 
                    "desc":"课程介绍"
                },
                {
                    'type':2, 
                    "desc":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585245585023&di=b0fa52f2b87847dfef6148cbab59bb35&imgtype=0&src=http%3A%2F%2Fn1image.hjfile.cn%2Faudio_video%2F2019%2F08%2F05%2Fb44fab2b9eb59cb9c9df7f8ac6123441.jpg"
                },
                {
                    'type':1, 
                    "desc":"我的的课程面对广大用户"
                }
            ],
            'curriculum_items':[
                {
                    'id':1, 
                    "title":"1.【学前必看】带你认识ps"
                }, {
                    'id':3, 
                    "title":"2.【学前必看】认识ps常用工具"
                },
                {
                    'id':1, 
                    "title":"1.【学前必看】带你认识ps"
                }, {
                    'id':3, 
                    "title":"2.【学前必看】认识ps常用工具"
                },
                {
                    'id':1, 
                    "title":"1.【学前必看】带你认识ps"
                }, {
                    'id':3, 
                    "title":"2.【学前必看】认识ps常用工具"
                },
                {
                    'id':1, 
                    "title":"1.【学前必看】带你认识ps"
                }, {
                    'id':3, 
                    "title":"2.【学前必看】认识ps常用工具"
                }
            ]
        }
    };
}

function get_video() {
    return {
        status: 1,
        msg: '',
        data: {
            id:1,
            title:'ps从小白到精通全程课程',
            class_hour:'共69个课时',
            url:'http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8',
            curriculum_items:[
                {
                    'id':1, 
                    "title":"1.【学前必看】带你认识ps"
                }, {
                    'id':2, 
                    "title":"2.【学前必看】认识ps常用工具"
                },
                {
                    'id':3, 
                    "title":"1.【学前必看】带你认识ps"
                }, {
                    'id':4, 
                    "title":"2.【学前必看】认识ps常用工具"
                },
                {
                    'id':5, 
                    "title":"1.【学前必看】带你认识ps"
                }, {
                    'id':6, 
                    "title":"2.【学前必看】认识ps常用工具"
                },
                {
                    'id':7, 
                    "title":"1.【学前必看】带你认识ps"
                }, {
                    'id':8, 
                    "title":"2.【学前必看】认识ps常用工具"
                }
            ]
        }
    };
}




//写个接口123
app.post('/api/banner/get', function(req, res) {
    console.log(req.body)
    res.status(200),
    res.json(get_banner())
});
app.post('/api/list', function(req, res) {
    console.log(req.body)
    res.status(200),
    res.json(get_lsit())
});
app.post('/api/detail', function(req, res) {
    console.log(req.body)
    res.status(200),
    res.json(get_detail())
});

app.post('/api/video', function(req, res) {
    console.log(req.body)
    res.status(200),
    res.json(get_video())
});

//配置服务端口
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})