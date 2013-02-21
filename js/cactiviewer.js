;
var inhtml = "";
var spancnt = 0;
var Year,month,day,hour,minute,second;
var unixstartdatetime,unixenddatetime;
$(function() {
	$('#startdate').datetimepicker({pickTime: false});
	$('#enddate').datetimepicker({pickTime: false});
	$('#starttime').datetimepicker({pickDate: false});
	$('#endtime').datetimepicker({pickDate: false});
	$("#h1title").text(settingList.SiteName);
	$("#burl").attr("href",settingList.baseurl);
	var idx = 1;
	for(var i in itemList){
		$("#navul").append("<li><a id=\"listidx"+idx+"\" class=\"navli\" href=\"#\">"+itemList[i].titlelabel+"</li>");
		idx += 1;
	}
	dateinit();
	labelload("listidx1");
	$(".navli").click(function(e) {
		labelload($(this).attr("id"));
	});
	$("#reloadcheck").click(function(){
		if ($('#reloadcheck').attr("checked") == "checked"){
			$("#timeform").css('display', 'none');
			imgintarvalload();
			timerID = setInterval(imgintarvalload,60000);
		} else {
			$("#timeform").css('display', '');
			clearInterval(timerID);
		};
	});
	$("#timepickerbtn").click(function(){
		var startdatetime = $('.startdate').val() + " " + $('.starttime').val();
		var enddatetime = $('.enddate').val() + " " + $('.endtime').val();
		startdatetime = new Date(startdatetime);
		enddatetime = new Date(enddatetime);
		unixstartdatetime = Math.round(startdatetime.getTime() / 1000);
		unixenddatetime = Math.round(enddatetime.getTime() / 1000);
		imgload();
	});
});
//labelclick
function labelload(selectlabel){
	var idx = 1;
	$("#loadcontents").empty();
	$("#navul").children().attr("class","");
	$("#"+selectlabel).parent("li").attr("class","active");
	for(var i in itemList){
		if(selectlabel == "listidx" + idx){
			inhtml = "<div class=\"row-fluid\">";
			spancnt = 0;
			for(var j in itemList[i].item){
				imagecreate(itemList[i].item[j].id,itemList[i].item[j].title);
			}
			inhtml += "</div>";
			$("#loadcontents").append(inhtml);
		}
		idx += 1;
	}
	$(".span6").mouseover(function(){
		$(this).css("backgroundColor", "AliceBlue");
	});
	$(".span6").mouseout(function(){
		$(this).css("backgroundColor", "white");
	});
};
function imgintarvalload(){
	var date  = new Date();
	var arr = datecalc(date,0,0,0,-1,0,0);
    $(".startdate").val(arr[0]);
    $(".starttime").val(arr[1]);
    unixstartdatetime = Math.round(arr[2].getTime() / 1000);
	var arr = datecalc(date,0,0,0,0,0,0);
    $(".enddate").val(arr[0]);
    $(".endtime").val(arr[1]);
    unixenddatetime = Math.round(arr[2].getTime() / 1000);
	console.log(unixstartdatetime+" "+unixenddatetime);

	imgload();
}
function imgload() {
	$('img').each(function(i){
		$(this).fadeOut("fast");
		$(this).attr('src',settingList.baseurl+settingList.beturl+$(this).attr("title")+settingList.starttime+unixstartdatetime+settingList.endtime+unixenddatetime);
		$(this).fadeIn("fast");
	});
}
//imagecreate
function imagecreate(urlid,titlelabel){
	if (typeof urlid !== "undefined") {
		if(urlid == "hr"){
			inhtml += "</div><hr><div class=\"row-fluid\">";
			spancnt = 0;
		} else {
			if(spancnt == 2){
				inhtml += "</div><div class=\"row-fluid\"><div class=\"span6\"><h5>"+titlelabel+"</h5>";
				spancnt = 1;
			} else {
				inhtml += "<div class=\"span6\"><h5>"+titlelabel+"</h5>";
				spancnt += 1;
			}
			inhtml += "<a href=\""+settingList.baseurl+settingList.imgurl+urlid+settingList.imgurl2+settingList.starttime+unixstartdatetime+settingList.endtime+unixenddatetime+"\" target=\"_blank\">";
			inhtml += "<img class=\"cactiimg\" title=\""+urlid+"\" src=\""+settingList.baseurl+settingList.beturl+urlid+settingList.starttime+unixstartdatetime+settingList.endtime+unixenddatetime+urlid+"\"></a></div>";
		}
	}
};

function dateinit(){
	var date  = new Date();
	var arr = datecalc(date,0,0,-1,0,0,0);
    $(".startdate").val(arr[0]);
    $(".starttime").val(arr[1]);
    unixstartdatetime = Math.round(arr[2].getTime() / 1000);
	var arr = datecalc(date,0,0,0,0,0,0);
    $(".enddate").val(arr[0]);
    $(".endtime").val(arr[1]);
    unixenddatetime = Math.round(arr[2].getTime() / 1000);
};

function datecalc(datetime,y,M,d,h,m,s){
	Year = datetime.getFullYear() + y;
	month = datetime.getMonth()+1 + M;
	day = datetime.getDate() + d;
	hour   = datetime.getHours() + h;
	minute = datetime.getMinutes() + m;
	second = datetime.getSeconds() + s;
	if (month < 10) {month = "0" + month;}
	if (day < 10) {day = "0" + day;}
	if (hour < 10) {hour = "0" + hour;}
	if (minute < 10) {minute = "0" + minute;}
	if (second < 10) {second = "0" + second;}
	var time = Year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	time = new Date(time);
	return [Year+"-"+month+"-"+day,hour+":"+minute+":"+second,time];
};