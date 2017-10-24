//逻辑实现
'use strict';
const barrage = require('./barrage');
//配置信息
import './main.css';
//加载弹幕
let config = {
    'text': '',        //文字
    'color': 'green',    //颜色
    'font': '',        //字体
    'img': 'http://127.0.0.1:8888/test/timg.jpeg',   //图片
    'start': window.innerWidth,       //起始位置
    'end': -10000,                       //结束位置(头部距离终点的距离)
    'top': 400
};
let barrageObj = new barrage(config);
//读取弹幕
barrageObj.getDanMu();







