var images = [];//存放九宫格背景图的数组
images[0] = "img/1.png";
images[1] = "img/2.png";
images[2] = "img/3.png";
images[3] = "img/4.png";
images[4] = "img/5.png";
images[5] = "img/6.png";
images[6] = "img/7.png";
images[7] = "img/8.png";
images[8] = "img/9.png";
function randomNum(){//随机背景图函数
    var image = images;
    var randomNum = [];
    for(var i = 0; i < 9; i++){
        var num = parseInt(Math.random() * (image.length - 1));//随机数用于选取数组的背景图
        randomNum[i] = image[num];//将选取到到的随机背景图放入一个新的数组
        image.splice(num, 1);//删除随机的到的图片路径
    }
    return randomNum;//返回随机排序的九张背景图数组
}

function inputPic(){
    var randomNum2 = randomNum();//调用随机图函数获取背景图路径
    for(var i = 0; i < randomNum2.length; i++){
        var doc = document.getElementById('p' + i);//循环遍历获取类名p1-9
        doc.style.backgroundImage = "url(" + randomNum2[i] + ")";//dom操作更改背景图
    }
}
inputPic();//调用函数应用更改九宫格div背景图
//判断是否还原
function ifSuccess(){
    var box = document.getElementsByClassName('box')[0];//获取类名为box的元素由于用类名获取它返回的是数据集所以需要取第一个  用[0]
    var nodes = box.children;//获取所有的子节点（也可以使用childNodes但是这个会获取到后面的空白文本需要多一步删除文本的操作）
    var temp = [];
    for(var q = 0; q < nodes.length; q++){
        temp[q] = nodes[q].getAttribute('style');
    }
    console.log(temp);//测试
    var success = 0;
    for(var i = 0; i < temp.length; i++){//遍历 temp 数组中的元素。temp 数组存储了九宫格每个格子的样式信息
        if(temp[i].indexOf(i + 1) != -1){//indexOf数组方法返回数组的值在数组出现的位置下标
            continue;//indexOf 方法返回字符串中指定值的第一个匹配位置的索引，如果找不到则返回 -1，continue结束当前剩下代码继续下一次循环
        }else{//这个关键字用于跳过当前循环的剩余代码，继续下一次循环。在这里，
              //如果当前格子的样式信息中包含了当前格子的编号，那么说明该格子已经放置了正确的内容，可以继续检查下一个格子。
            success = 1;
        }
    }//
    if(success == 0){
        alert("完成");
    }
}
var kongbai = 8;//初始化空白位置
function move(e){//被点击的子节点传入参数e
    var box = document.getElementsByClassName('box')[0];
    var nodes = box.children;
    var temp = [];
    var exiabiao;
    for(var q = 0; q < nodes.length; q++){
        temp[q] = nodes[q];//将子节点存入temp数组
    }
    for(var o=0;o<temp.length;o++){
        if(temp[o]==e){
            exiabiao=o;//找到被点击的子节点的索引
        }
    }
    var xiabiao=kongbai;//将空白位置的索引存入xiabiao变量
    var kong=temp[kongbai];//将空白节点存入kong
    if(xiabiao==0){//空白位置所在的下标位
        if(exiabiao==1||exiabiao==3){//判断是否能交换
            exchange(e, kong);//交换被点击的子节点和空白位置的子节点
            kongbai=exiabiao;//更新空白位置的索引
        }
    }else if(xiabiao==1){
        if(exiabiao==0||exiabiao==2||exiabiao==4){
            exchange(e, kong);
            kongbai=exiabiao;
        }
    }else if(xiabiao==2){
        if(exiabiao==1||exiabiao==5){
            exchange(e, kong);
            kongbai=exiabiao;
        }
    }else if(xiabiao==3){
        if(exiabiao==0||exiabiao==4||exiabiao==6){
            exchange(e, kong);
            kongbai=exiabiao;
        }
    }else if(xiabiao==4){
        if(exiabiao==1||exiabiao==3||exiabiao==5||exiabiao==7){
            exchange(e, kong);
            kongbai=exiabiao;
        }
    }else if(xiabiao==5){
        if(exiabiao==2||exiabiao==4||exiabiao==8){
            exchange(e, kong);
            kongbai=exiabiao;
        }
    }else if(xiabiao==6){
        if(exiabiao==3||exiabiao==7){
            exchange(e, kong);
            kongbai=exiabiao;
        }
    }else if(xiabiao==7){
        if(exiabiao==4||exiabiao==6||exiabiao==8){
            exchange(e, kong);
            kongbai=exiabiao;
        }
    }else if(xiabiao==8){
        if(exiabiao==7||exiabiao==5){
            exchange(e, kong);
            kongbai=exiabiao;
        }
    }  
    ifSuccess();//调用判断方法判断是否完成
}

function exchange(e1, e2) {
    var temp1,temp2;//getAttribute获取指定元素的方法并且返回值
    temp1=e1.getAttribute('style');//获取被点击子节点的style属性值
    temp2=e2.getAttribute('style');//获取空白位置子节点的style属性值
    e2.setAttribute('style',temp1);//将被点击子节点的style属性值赋给空白位置子节点的style属性
    e1.setAttribute('style',temp2);//将空白位置子节点的style属性值赋给被点击子节点的style属性
}
