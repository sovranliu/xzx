$(function() {

	setWidth();
	setHeight();

	$('.js-min-window').on('click',minWindow)
	$('.js-close-window').on('click',closeWindow)

	$('#list').draggable();
	$('#profile').draggable();
	$('#store').draggable();
	var loc = location.href;
	var n1 = loc.length; //地址的总长度
	var n2 = loc.indexOf("="); //取得=号的位置
	//var id = decodeURI(loc.substr(n2 + 1, n1 - n2)); //从=号后面的内容
	var id = getData();
	var infor = $.parseJSON(id);
	$('#list .top img').attr('src', infor.data.userInfo.avatarUri);
	$('#list .top .head span:nth-of-type(1)').text(infor.data.userInfo.name);
	$('#list .top .head span:nth-of-type(2)').text(infor.data.userInfo.department);
	var recentlyArry = infor.data.conversation;
	$.each(recentlyArry, function(index, value) {
		var $li = $('<li>' + value.name + '</li>');
		$li.css({
			'background': 'url(' + value.avatarUri + ')  no-repeat left center',
			'background-size': '20px 20px',
		})
		$li.appendTo($('.fire'));
	});
	var dockerArry = infor.data.docker;
		$.each(dockerArry, function(index, value) {
		var $div = $('<div class="single"><a target="_blank" href=" ' + value.url + '"><img src="' +  value.icon +  '"></a><h4>' + value.name +  '</h4></div>');
		$div.appendTo($('#store #middle'));
	});
	
	var groupArry = infor.data.groupList;
	$('.tab li:nth-of-type(2) span').text(groupArry[1].title);
	$('.tab li:nth-of-type(3) span').text(groupArry[2].title);
	//	$('#list .top .head span').click(function  () {
	//		$('.profile').dialog('open')
	//	})
	$('.tab li').click(function() {
		$(this).addClass('background');
		$(this).siblings().removeClass('background');
	});
	$('.tab li:nth-of-type(1)').click(function() {
		$('.fire').show().animate({
			right: "0"
		}, 100);
		$('.personal,.afa').hide().animate({
			right: "-300px"
		}, 0);
	});
	$('.tab li:nth-of-type(2)').click(function() {
		$('.personal').show().animate({
			right: "0"
		}, 100);
		$('.fire').hide().animate({
			right: "300px"
		}, 0);
		$('.afa').hide().animate({
			right: "-300px"
		}, 0);

	});
	$('.tab li:nth-of-type(3)').click(function() {
		$('.afa').show().animate({
			right: "0"
		}, 100);;
		$('.fire,.personal').hide().animate({
			right: "300px"
		}, 0);
	})
	$('.contactList li').mouseover(function() {
		$(this).addClass('hover')
	}).mouseleave(function() {
		$(this).removeClass('hover')
	})
	$('#list .top .head img').click(function() {
			$('#profile').show()
	});
	$('#profile .view .icon-cuohao').click(function() {
		$('#profile').hide()
	});
	$('#list .bottom li:nth-of-type(3)').click(function() {
		$('#store').show()
	});
	$('#store .top .view .icon-cuohao').click(function() {
		$('#store').hide()
	});
	$('.contactList').on('dblclick', 'li', function() {
		window.open(location.href.split("list")[0] + "chat.html?");
	});
	$("#search").on('input', function(e) {
		if($.trim($(this).val()) == '') {
			console.log(3212)
			$('.result').hide();
		}
	});
	$('#search').keydown(function(event) {
		var e = event || window.event;
		if(e && e.keyCode == 13) {
			if($.trim($(this).val()) != '') {
				$.ajax({
					type: "get",
					//			同步处理
					async: true,
					//			请求超时时间
					timeout: 5000,
					//			dataType: 'JSONP',
					url: "http://121.40.90.141:8003/xzx/contactSeatch",
					data: {
						account: $(this).val(),
					},
					success: (responseText, statusText) => {
						var resultArry = responseText.data.conversation;
						$('#list .result li').remove();
						$.each(resultArry, function(index, value) {
							var $li = $('<li>' + value.name + '</li>');
							$li.css({
								'background': 'url(' + value.avatarUri + ')  no-repeat left center',
								'background-size': '20px',
							})
							$li.appendTo($('.result'));
						});
						$('.result').show();

					},
					error: (xhr, status, error) => {},

				});

			} else {
				$('.result').hide();
			}
		}
	})
})