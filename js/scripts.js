function displayTime() {

    var formatString='HH:mm:ss Z'
    var zones = JSON.parse(data);

    zones.map(function(item) {
            item['time']=moment().tz(item['zone']).format(formatString);
            return item;
        });

    itemValue2='<div class="col-md-4 ftco-animate">'
    itemValue2+='<div class="blog-entry">'
    itemValue2+='<div class="text d-flex">'
    itemValue2+='<blockquote class="blockquote">'
    itemValue2+='<h4 class="name"></h4>'
    itemValue2+=' <em><small><span class="badge badge-primary"></span></small></em>'
    itemValue2+='<footer class="blockquote-footer"><strong class="time"></strong> <span> - <small class="zone"></small></span></footer>'
    itemValue2+='</blockquote>'
    itemValue2+='</div>'
    itemValue2+='</div>'
    itemValue2+='<hr>'
    itemValue2+='</div>'

    var options ={
        valueNames: ['name','time','zone'],
        item: itemValue2,
        page: 30,
        pagination: [{
            outerWindow:1
        }]
    };
    
    $("#noticeListData").html("");
    $("#noticeListPagination").html("");
    var noticeList = new List('noticeList', options, zones);
    
    setTimeout(displayTime, 1000);

}

$(document).ready(function() {
    displayTime();
});