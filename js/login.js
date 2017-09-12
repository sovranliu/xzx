$(function () {

	// setWidth();
	// setHeight();

	// $('.js-min-window').on('click',minWindow)
	// $('.js-close-window').on('click',closeWindow)

	$('#formsSubmit').validate({
		submitHandler:function(form){
			$.ajax({
				type: "get",
				//			同步处理
				async: true,
				//			请求超时时间
				timeout: 5000,
				//			dataType: 'JSONP',
				url: "http://121.40.90.141:8003/xzx/login",
				data: {
					account: $('#loginName').val(),
					password: $('#password').val(),
				},
				success: (responseText, statusText) => {
					if (responseText.code==0) {
						var data = JSON.stringify(responseText);
						//todo
						//setData(data);
						window.location.href = "list.html?data=" + data;
					} else{
						alert(responseText.msg)
					}
				},
				error: (xhr, status, error) => {
				},

			});
		},
		rules: {
			loginName: {
				required: true,
			},
			password: {
				required: true,
			}
		},
		messages: {
			loginName: {
				required: "不得为空！",
			},
			password: {
				required: '不得为空！',
			},
		}
	});
	$('#login').draggable();
	$('#login .view i:nth-of-type(3)').click(function  () {
		
	})
})


