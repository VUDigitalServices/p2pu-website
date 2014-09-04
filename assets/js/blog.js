/*global jQuery, window, console, can, document */


var P2PU = window.P2PU || {};

(function ($, P2PU) {

	'use strict';


	var init = function () {
		$(function () {
			var image,
				re_image = /<img(.*?)>/,
				tmp = document.createElement("div");

			$.ajax({
				url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent("http://info.p2pu.org/feed/"),
				dataType: 'json',
				success: function (data) {
					if (data.responseData.feed && data.responseData.feed.entries) {
						var entries = data.responseData.feed.entries;
						$.each(entries, function (i, e) {
							image = re_image.exec(e.content);

							if (image !== null && image !== undefined){
								image = /"(.*?)"/.exec(/src="(.*?)"/.exec(image[0])[0]);
								e.image = image[0];
								console.log(e.image);
							}

							tmp.innerHTML = e.content;
							e.content = tmp.textContent || tmp.innerText || "";


							/*console.log(e);
							 console.log("------------------------");
							 console.log("title      : " + e.title);
							 console.log("description: " + e.content);
							 console.log("url        : " + e.link);*/
						});
						$("#data").html(can.view("app-template", {reports: new can.List(entries)}));
					}
				},
				error: function () {
					$("#data").html('<h1>Oh dear, something went wrong, could you try again please? Or tell us about this <a href="http://community.p2pu.org/category/tech/support">here</a></h1>');
				}
			});
		});
	};

	P2PU.Blog = {};
	P2PU.Blog.init = init;

}(jQuery, P2PU));