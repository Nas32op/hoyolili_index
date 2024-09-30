$(document).ready(function () {
    $(".loading").hide();
    getAchives();
    getHitokoto();
});

$('.menu a').click(function () {
    target = $(this).attr('goto');
    switchTo(target);
});

function switchTo(target) {
    $('.right section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

function getAchives() {
    t = ``;
    $.ajax({
        type: "GET",
        url: api + "wp-json/wp/v2/posts?per_page=10&page=1&_fields=date,title,link",
        dataType: "json",
        success: function (json) {
            for (var i = 0; i < json.length; i++) {
                title = json[i].title.rendered;
                link = json[i].link;
                time = new Date(json[i].date).Format("yyyy-MM-dd");
                t += `<li><a href="${link}" target="_blank">${title} <span class="meta">/ ${time}</span></a></li>`;
                $('.archive-list').html(t);
            }
        }
    })
}

function getHitokoto() {
    $.ajax({
        url: "https://v1.hitokoto.cn/",
        dataType: "json",
        success: function (result) {
            write(result.hitokoto + " 鈥斺€� " + result.from);
        },
        error: function () {
            write("Error...");
        }
    });
}

function write(text) {
    if (text.length < 30) {
        $('#hitokoto').html(text);
    } else {
        getHitokoto();
    }
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(),  
        "h+": this.getHours(), 
        "m+": this.getMinutes(), 
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function blobToDataURI(blob, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    }
    reader.readAsDataURL(blob);
}
var url = "assets/img/bg.jpg";
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = "blob";
xhr.onload = function () {
    if (this.status == 200) {
        var blob = this.response;
        blobToDataURI(blob, function (t) {
            $("body").css("background-image", "url('" + t + "')");
            $("#background-small").addClass("smallBg");
            $("#background-small").css("opacity", "0");
        });
    }
}
xhr.send();