$(function() {

	setWidth();
	setHeight();

	$('.js-min-window').on('click',minWindow)
	$('.js-close-window').on('click',closeWindow)

	$('#chat').draggable();
	var unixtimeToDateTime = function(unixtime, type) {
		if(unixtime == '' || unixtime == '--' || isNaN(unixtime))
			return unixtime;
		var date;
		if(typeof(unixtime) == 'string') {
			date = new Date(parseInt(unixtime));
		} else
			date = new Date(unixtime);
		Y = date.getFullYear() + '.';
		M = (date.getMonth() + 1 < 10 ?
			'0' + (date.getMonth() + 1) :
			date.getMonth() + 1) + '.';
		D = (date.getDate() < 10 ?
			('0' + date.getDate()) :
			date.getDate()) + ' ';
		h = (date.getHours() < 10 ?
			'0' + (date.getHours()) :
			date.getHours()) + ':';
		m = (date.getMinutes() < 10 ?
			'0' + (date.getMinutes()) :
			date.getMinutes()) + ':';
		s = (date.getSeconds() < 10 ?
			'0' + (date.getSeconds()) :
			date.getSeconds());
		if(type == "年月日:") {
			return Y.replace(".", "") + "年" + M.replace(".", "") + "月" + D.replace(" ", "") + "日&nbsp;" + h + m.replace(":", "");
		} else {
			return Y + M + D + h + m + s;
		}
	};
	
//	var ue = UE.getEditor('container');
	$('.push').click(function() {
		var content = $('#texterea textarea').val();
		var currenttime = unixtimeToDateTime($.now( ));
		var message_box = '<div class="message clearfix"><div class="user-logo"><img src="img/2024.jpg" /></div><div class="wrap-text"><div></div></div><div class="wrap-ri"><div clsss="clearfix"><span>2017-9-4  14:6:47</span></div></div></div>'
		message_box = $(message_box)
		message_box.find('.wrap-text').find('div').html(content);
		message_box.find('.wrap-ri').find('div').find('span').text(currenttime);
		message_box.appendTo('.message_box');
		$('#texterea textarea').val('');

		{
			/*var box ='<div id="chat1" class="chat"><div id="chattop"><i><a href="javascript:;">王旭</a></i><a class="close_btn iconfont icon-cuohao" href="javascript:;"></a></div><div id="chatmiddle"></div><script id="container1" name="content" type="text/plain"></script><div id="chatbottom"><a class="push" href="javascript:;">发送</a></div></div>'
			  ;		$(box).appendTo('body');
			  		$('#chat1').draggable();
			  		var ue1 = UE.getEditor('container1');*/
		}
		//    	$('#chat').clone().appendTo('body');
	});

})