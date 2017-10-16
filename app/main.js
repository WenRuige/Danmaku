//逻辑实现
'use strict';
const barrage = require('./barrage');
//配置信息
import './main.css';
//加载弹幕
let config = {
    'text': '',        //文字
    'color': 'green',  //颜色
    'img': '',         //图片
    'pic':'http://127.0.0.1:8888/test/timg.jpeg',
    'start': window.innerWidth,       //起始位置
    'end': 0          //结束位置

};
let barrageObj = new barrage(config);
barrageObj.getDanMu();







