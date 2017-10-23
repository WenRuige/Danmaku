// 加载config.json   ./ -> 上级  ../ -> 上上级
const offlineDanmu = require("../danmu.json");

//直接执行导入的方法
barrage = function (config) {
    let node = 0;  //节点
    //初始化
    core = (config) => {
        let obj = createObj();
        addAnimationRule();
        addStyle(obj, config);
        document.getElementById("danmu").appendChild(obj);   //追加对象
        document.getElementById(obj.id).appendChild(addImg());
        obj.addEventListener("animationend", animationend.bind(this), false);    //监听css动画结束回调
        obj.style.webkitAnimationName = 'animation';    //加动画
        obj.className += "animation";
    };
    addImg = () => {
        let imgNode = document.createElement('img');
        imgNode.setAttribute('src', config.img);
        imgNode.className += "img";
        return imgNode;
    };
    createObj = () => {
        let obj = document.createElement('div');
        obj.id = "node" + node++;  //弹幕编号
        return obj;
    };
    //配置弹幕对象的属性
    //长和宽应该取自适应浏览器的长和宽而不是固定的长和宽
    addStyle = (obj, config) => {
        obj.style.color = config.color;
        obj.style.font = config.font;
        obj.innerText = config.text;
        obj.style.top = (config.top || Math.random() * window.innerHeight) + 'px';
    };
    //添加动画规则
    addAnimationRule = () => {
        let style = document.createElement('style');
        document.head.appendChild(style);
        style.type = 'text/css';
        let start = config.start;  //初始位置[屏幕的宽度]
        let end = config.end;    //结束位置
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
            temp = offlineDanmu.pop();
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
    //不能使用style.display="block"/"none"这样会使css重新运行
    document.getElementById('clear').onclick = () => {
        let opacityNum = document.getElementById("danmu").style.opacity;
        if (opacityNum === "" || opacityNum === "1") {
            document.getElementById("danmu").style.opacity = 0.0
        } else {
            document.getElementById("danmu").style.opacity = 1
        }
    };
    //调用方法
    this.test = () => {
        alert('test');
    }
};
module.exports = barrage;