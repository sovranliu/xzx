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
//native func
//todo delete
onMessage('章三','',1,'test');

function onMessage(form,target,type,content) {
	$('.from-name').html(form);
	var currenttime = unixtimeToDateTime($.now());
	var msg;
	if(type == 1) {
		msg = content;
	}
	if(type == 2) {
		msg = '<img src="' + content + '">';
	}
	var _html = '<div class="message other-message pull-left clearfix">' +
					'<div class="wrap-ri">' +
						'<div clsss="clearfix">' +
							'<span>' + currenttime + '</span>' +
						'</div>' +
					'</div>' +
					'<div class="user-logo pull-left">' +
						'<img src="img/2024.jpg">' +
					'</div>' +
					'<div class="wrap-text pull-left">' +
						'<div>' + msg + '</div>' +
					'</div>' +
				'</div>';
	$('#chatmiddle').append(_html)

}
$(function() {

	_init();

	function _init() {
		// setWidth();
		// setHeight();

		// $('.js-min-window').on('click',minWindow)
		// $('.js-close-window').on('click',closeWindow)
		_bindActions();
	}


	function _bindActions() {
		$(document).on('keypress',_sendMessages);
	}

	function _sendMessages(e) {
		if (e.ctrlKey && e.which == 13) {
				var content = $('#texterea').find('textarea').val();
				if ($.trim(content).length != 0) {
					var currenttime = unixtimeToDateTime($.now());
					var message_box = '<div class="message self-message clearfix">' + 
									'<div class="wrap-ri"><div clsss="clearfix"><span>2017-9-4  14:6:47</span>' +
									'</div></div><div class="user-logo pull-right"><img src="img/2024.jpg" /></div>'+
									'<div class="wrap-text pull-right"><div></div></div></div>';

					message_box = $(message_box);
					message_box.find('.wrap-text').find('div').html(content);
					message_box.find('.wrap-ri').find('div').find('span').text(currenttime);
					message_box.appendTo($('#chatmiddle'));

					$('.chat #chatmiddle').scrollTop($('.chat #chatmiddle')[0].scrollHeight);
					$('#texterea').find('textarea').val('');
				}
			}
	}
})