var choosenTime='0';
var fixedTimeZone = 'Atlantic/South_Georgia';

function displayTime() {

    var formatString='HH:mm:ss Z'
    var zones = JSON.parse(data);
    var gameToday=moment().tz(fixedTimeZone).startOf('day').add(choosenTime, 'hours');

    zones.map(function(item) {
            item['time']=moment().tz(item['zone']).format(formatString);
            item['future_time']=(gameToday.tz(item['zone']).clone().tz(item['zone'])).calendar();
            return item;
        });

    itemValue2='<div class="col-md-4 ftco-animate">'
    itemValue2+='<div class="blog-entry">'
    itemValue2+='<div class="text d-flex">'
    itemValue2+='<blockquote class="blockquote">'
    itemValue2+='<span><h5 class="name"></h5>'
    itemValue2+=' <em><span class="badge badge-secondary"><strong class="future_time"></strong></span></em><span>'
    itemValue2+='<footer class="blockquote-footer"><strong class="time"></strong> <span> - <small class="zone"></small></span></footer>'
    itemValue2+='</blockquote>'
    itemValue2+='</div>'
    itemValue2+='</div>'
    itemValue2+='<hr>'
    itemValue2+='</div>'

    var options ={
        valueNames: ['name','time','zone','future_time'],
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
    instantiateTimePicker();
});


function instantiateTimePicker(){
    var timeOptions=[{'value':'0','label':'Reset'}]

    for (var i = 1; i < 24; i++) {
        timeOptions.push({'value':i,'label':'+'+i})
    }
    populateSelect('expectedTime',timeOptions);

     $('#expectedTime').on('change',function(){
        var chosenTime = $('#expectedTime').val();
        choosenTime=chosenTime
     });
}

function populateSelect(id,data){
    // IdName :- ID name of select option
    // Data :- Dict with option value and label to populate
    var html='';
    data.forEach(function(option){
        html+='<option value="'+option.value+'">'+option.label+'</option>';
    });
    $('#'+id).html(html);
    $('#'+id).selectpicker('refresh');
}