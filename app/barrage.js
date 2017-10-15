// 加载config.json   ./ -> 上级  ../ -> 上上级
const offlineDanmu = require("../danmu.json");
let config = {
    'text': '',
    'color': ''
};
//直接执行导入的方法
barrage = function () {
    let node = 0;  //节点
    let flag = 0;
    //初始化
    core = (config) => {
        // let dom = this.getCanvas();
        let obj = createObj();
        addAnimationRule();
        addStyle(obj, config);
        document.getElementById("danmu").appendChild(obj);   //追加对象
        obj.addEventListener("animationend", animationend.bind(this), false);    //监听css动画结束回调
        obj.style.webkitAnimationName = 'animation';    //加动画
        obj.className += "animation";
    };
    createObj = () => {
        let obj = document.createElement('div');
        obj.id = "node" + node++;  //弹幕编号
        return obj;
    };
    //配置弹幕对象的属性
    addStyle = (obj, config) => {
        obj.style.color = config.color || "black";
        obj.style.font = '';
        obj.innerText = config.text;
        obj.style.top = Math.random() * screen.availHeight + 'px';
    };
    //添加动画规则
    addAnimationRule = () => {
        let style = document.createElement('style');
        document.head.appendChild(style);
        style.type = 'text/css';
        let start = screen.availWidth;  //初始位置[屏幕的宽度]
        let end = 0;    //结束位置
        let from = `from { -webkit-transform: translateX(${start}px); }`;
        let to = `to {  -webkit-transform: translateX(${end}px); }`;
        style.sheet.insertRule(`@-webkit-keyframes animation { ${from} ${to} }`, 0);
    };
    //监听 css 动画结束,并且在结束的时候将弹幕移除
    animationend = (event) => {
        document.getElementById("danmu").removeChild(event.target);
    };
    //获取画布的大小
    getCanvas = () => document.getElementById("canvas").getBoundingClientRect();
    //获取弹幕
    this.getDanMu = () => {
        flag = setInterval(() => {
            let temp = offlineDanmu.pop();
            if (temp !== undefined) {
                core(temp)
            }
            //清空
        }, 1000)

    };
    //监听键盘操作
    document.getElementById('input').onkeypress = (event) => {
        if (event.code === "Enter") {
            let data = document.getElementById("input").value;
            if (data !== '') {
                config.text = data;
                core(config);
            }
        }
    };
    //调用方法
    this.test = () => {
        alert('test');
    }
};
module.exports = barrage;