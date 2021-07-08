var express = require('express');
var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

function get_location_name() {
    return {
        status: 1,
        msg: '',
        data: '奥运村街道'
    };
}

function get_shop_list(){
    return {
        status: 1,
        msg: '',
        data: [{
            'id':1,
            'name': "36524便利店",
            'img': "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582136728999&di=58ee5fdd35845246943d1359ada8f23d&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2F3812b31bb051f81906b6b4e0d3b44aed2f73e78d.jpg",
            'sales_volumes': '月销123',//销售
            'time': "30分钟",//配送时间
            'distance':'1.2km',//距离 km
            'delivery_price':'起送 ¥20',//起送价格
            'distribution_fee': '配送 ¥3',//运费
            'score':5,//评分
            'items':[{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },
            {
                'img':'http://p0.meituan.net/deal/__41054685__9917551.jpg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },
            {
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            }]
        },
        {
            'id':1,
            'name': "36524便利店",
            'img': "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582136728999&di=58ee5fdd35845246943d1359ada8f23d&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2F3812b31bb051f81906b6b4e0d3b44aed2f73e78d.jpg",
            'sales_volumes': '月销123',//销售
            'time': "30分钟",//配送时间
            'distance':'1.2km',//距离 km
            'delivery_price':'起送 ¥20',//起送价格
            'distribution_fee': '配送 ¥3',//运费
            'score':5,//评分
            'items':[{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },
            {
                'img':'http://p0.meituan.net/deal/__41054685__9917551.jpg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },
            {
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            }]
        },{
            'id':1,
            'name': "36524便利店",
            'img': "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582136728999&di=58ee5fdd35845246943d1359ada8f23d&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2F3812b31bb051f81906b6b4e0d3b44aed2f73e78d.jpg",
            'sales_volumes': '月销123',//销售
            'time': "30分钟",//配送时间
            'distance':'1.2km',//距离 km
            'delivery_price':'起送 ¥20',//起送价格
            'distribution_fee': '配送 ¥3',//运费
            'score':5,//评分
            'items':[{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },
            {
                'img':'http://p0.meituan.net/deal/__41054685__9917551.jpg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },
            {
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            }]
        },{
            'id':1,
            'name': "36524便利店",
            'img': "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582136728999&di=58ee5fdd35845246943d1359ada8f23d&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2F3812b31bb051f81906b6b4e0d3b44aed2f73e78d.jpg",
            'sales_volumes': '月销123',//销售
            'time': "30分钟",//配送时间
            'distance':'1.2km',//距离 km
            'delivery_price':'起送 ¥20',//起送价格
            'distribution_fee': '配送 ¥3',//运费
            'score':5,//评分
            'items':[{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },
            {
                'img':'http://p0.meituan.net/deal/__41054685__9917551.jpg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },
            {
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            },{
                'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                'name':'卫龙 辣条',
                'price': '¥12',
            }]
        }]
    };
}


function get_shop_detail(){
    return {
        status: 1,
        msg: '',
        data: {
            'id':1,
            'name': "36524便利店",
            'img': "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582136728999&di=58ee5fdd35845246943d1359ada8f23d&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2F3812b31bb051f81906b6b4e0d3b44aed2f73e78d.jpg",
            'sales_volumes': '月销123',//销售
            'time': "30分钟",//配送时间
            'distance':'1.2km',//距离 km
            'delivery_price':'起送 ¥20',//起送价格
            'distribution_fee': '配送 ¥3',//运费
            'notice':'由于天气原因，外卖速度会比较慢',
            'score':5,//评分
            'nav':[{
                'id':1,
                'name':'饮品'
            },{
                'id':2,
                'name':'美食'
            },{
                'id':3,
                'name':'生活用品'
            },{
                'id':4,
                'name':'生活用品'
            },{
                'id':5,
                'name':'生活用品'
            }],
            'items':{
                1:[{
                    'id':1,
                    'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                    'name':'卫龙 辣条',
                    'price': '¥12',
                    'sales_volumes':'月销量1',
                },{
                    'id':2,
                    'img':'http://p0.meituan.net/deal/__41054685__9917551.jpg',
                    'name':'卫龙 辣条',
                    'price': '¥12',
                    'sales_volumes':'月销量1',
                }],
                2:[{
                    'id':1,
                    'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                    'name':'卫龙 辣条',
                    'price': '¥12',
                    'sales_volumes':'月销量1',
                },{
                    'id':2,
                    'img':'http://p0.meituan.net/deal/__41054685__9917551.jpg',
                    'name':'卫龙 辣条',
                    'price': '¥12',
                    'sales_volumes':'月销量1',
                }],
                3:[{
                    'id':1,
                    'img':'http://p0.meituan.net/deal/__41054685__9917551.jpg',
                    'name':'卫龙 辣条',
                    'price': '¥12',
                    'sales_volumes':'月销量1',
                },{
                    'id':2,
                    'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                    'name':'卫龙 辣条',
                    'price': '¥12',
                    'sales_volumes':'月销量1',
                }],
                4:[{
                    'id':1,
                    'img':'http://p0.meituan.net/deal/__41054685__9917551.jpg',
                    'name':'卫龙 辣条',
                    'price': '¥12',
                    'sales_volumes':'月销量1',
                },{
                    'id':2,
                    'img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582225513632&di=d0adbb9ccaaf1474f17b2efb338af145&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F369349930.jpeg',
                    'name':'卫龙 辣条',
                    'price': '¥12',
                    'sales_volumes':'月销量1',
                }]
            }
        }
    };
}



function order_list(){
    return {
        status: 1,
        msg: '',
        data: [{
            'id':1,
            'status_anme':'订单完成',
            'shop':{
                'name': "36524便利店",
                'img': "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582136728999&di=58ee5fdd35845246943d1359ada8f23d&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2F3812b31bb051f81906b6b4e0d3b44aed2f73e78d.jpg",
            },
            'goods':[
            {
                'name':'平菇 250克',
                'num':2
            },{
                'name':'平菇 100克',
                'num':2
            },{
                'name':'金针菇 400克',
                'num':2
            }],
            'num':5,
            'totle': 29.99
        }]
    };
}



//写个接口123
app.post('/api/v1/other/get_location_name', function(req, res) {
    res.status(200),
    res.json(get_location_name())
});

app.post('/api/v1/shop/list', function(req, res) {
    res.status(200),
    res.json(get_shop_list())
});

app.post('/api/v1/shop/detail', function(req, res) {
    res.status(200),
    res.json(get_shop_detail())
});

app.post('/api/v1/order/list', function(req, res) {
    res.status(200),
    res.json(order_list())
});





//配置服务端口
var server = app.listen(3000, function() {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})