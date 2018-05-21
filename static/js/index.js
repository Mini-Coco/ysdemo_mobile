//展示医生全景视图
function toFullView(index,crt_info){
    window.location.href = "page/doctor_all.html";
    sessionStorage.doc_id=index;
    sessionStorage.crt_info=crt_info;
}
//计算当前条数
function crt_num(){
    var num=0;
    for(var i=0;i<$('.content_doc .border_b').length;i++){
        if($('.content_doc .border_b').eq(i).css('display')=='block'){
            num++;
        }
    }
    $('.text_num').text(num);
}
crt_num();
//搜索
$('#search_select').keyup(function () {
    if($('#search_select').val()!=''){
        var searchContent=$('#search_select').val();
        $('.content_doc div.border_b').hide();
        $('.search_key:contains('+searchContent+')').parent().show();
        crt_num();
    }else{
        $('.content_doc div').show();
        $('.text_num').text($('.content_doc .border_b').length);
    }
});

//备忘录--获取当前时间
function crt_date() {
    var myDate = new Date();
    var T = {
        year : myDate.getFullYear(),
        month : myDate.getMonth(),
        day : myDate.getDate(),
        hour : myDate.getHours(),
        minute : myDate.getMinutes()
    };
    var goDate = T.year+"年"+(T.month+1)+"月"+T.day+"日 "+T.hour+":"+T.minute;
    return goDate;
}
//添加备忘录
function addMemo(state,_this) {
    $('.mask').show();
    $('.editMemo').show();
    if(state=='add'){
        $('#memo_textarea').val('');
        $('.editMemo .mome_head').text('添加记录');
    }else if(state=='edit'){
        $(_this).addClass('editThis');
        sessionStorage.crt_text=$(_this).text();
        $('#memo_textarea').val($(_this).text());
        $('.editMemo .mome_head').text('编辑记录');
    }
}
//确定/取消备忘录
function operateMemo(state) {
    if(state==1 && $('#memo_textarea').val()!=''){
        if($('.editMemo .mome_head').text()=='编辑记录'){
            var crt_text=sessionStorage.crt_text;
            if(crt_text!=$('#memo_textarea').val()){
                $('.editThis').parent().remove();
                preMemo();
            }else{
                $('.editThis').removeClass('editThis');
            }
        }else if($('.editMemo .mome_head').text()=='添加记录'){
            preMemo();
        }
        crt_num();
    }
    $('.mask').hide();
    $('.editMemo').hide();
}
//追加备忘录
function preMemo() {
    var memo_textarea=$('#memo_textarea').val();
    var str='';
    str+='<div class="col-xs-12 border_b" style="padding: 12px 15px;">';
    str+='<div class="search_key memo_text" onclick="addMemo(\'edit\',this)">'+memo_textarea+'</div>';
    str+='<div style="margin-top: 8px;">';
    str+='<span style="font-size: 1.2rem">'+crt_date()+'</span>';
    str+='<i class="fa fa-trash-o" style="float: right;" onclick="removeMemo(this)"></i>';
    str+='</div>';
    str+='</div>';
    $('.memo_box').prepend(str);
}
//删除备忘录
function removeMemo(_this) {
    var isTrue = confirm('确定要删除么？');
    if(isTrue){
        $(_this).parent().parent().remove();
    }
    crt_num();
}

//底部导航切换
// function changeTab(_this) {
//     //文字变色
//     $('.menu').removeClass('active');
//     $(_this).addClass('active');
//     //所有图标变成灰色
//     var nodes = $('.menu img');
//     for(var i=0; i<nodes.length; i++){
//         nodes[i].src = nodes[i].src.replace(/.png|_blue.png/,'.png');
//     }
//     //选中图标变成蓝色
//     var crt_src=$(_this).children('img')[0];
//     crt_src.src=crt_src.src.replace(/.png|_blue.png/,'_blue.png');
// }