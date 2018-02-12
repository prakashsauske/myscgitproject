function addToList() {
	var strIndex = "";
	$('.article-list').filter(function() {
		if ($(this).find('.checkbox').is(':checked') == true) {
			if (strIndex != "")
				strIndex = strIndex + ":" + $(this).attr('id');
			else
				strIndex = $(this).attr('id');
		}
	});
	selectItem(strIndex,'');
	$('tr td').addClass('cursorProgress');
	if ($("#dialog-modal2").dialog("isOpen"))
		$("#dialog-modal2").dialog("close");

}
function bindMultipleSelect() {
	/*$('.unselect').click(function() {
		$('.article-list').filter(function() {
			if ($(this).find('.checkbox').is(':checked') == true)
				$(this).find('.checkbox').click();
		});
		$('.article-list').removeClass('hideBlock');
		$('.list-count,.unselect,.warning,.addToList').addClass('hideBlock');
	});
*/
	$('.searchString').text($('#article').val());
	$('.checkbox')
			.click(
					function() {
						if ($(this).is(':checked')) {
							vendorNo = $(this).parent().parent().find(
									'.vendor-no').val();
							/*$('.article-list')
									.filter(
											function() {
												if ($(this).find('.vendor-no')
														.val() != vendorNo
														&& $(this).find(
																'.vendor-no')
																.val() != undefined)
													$(this).addClass(
															'hideBlock');
											});*/
							$('.addToList').removeClass(
									'hideBlock');
							

						} else {
							var countFlag = false;
							$('.article-list').filter(
									function() {
										if ($(this).find('.checkbox').is(
												':checked') == true)
											countFlag = true;
									});
							if (countFlag == false) {
								//$('.article-list').removeClass('hideBlock');
								$('.addToList').addClass('hideBlock');
								/*if (($('#supplier').val() != "" && $(
										'#supplier').val() != undefined)
										|| ($('.vendor-name-no').first() != undefined && $(
												'.vendor-name-no').first()
												.text() != "")
										|| $('#supplier-no-preq').val() != undefined
										&& $('#supplier-no-preq').val() != "")
									$('.warning').removeClass('hideBlock');
								else
									$('.warning').addClass('hideBlock');*/
							}/* else {
								if ($('#supplier').val() != "")
									$('.unselect').addClass('hideBlock');
							}*/

						}
						var count = 0;
						$('.article-list').filter(
								function() {
									if ($(this).find('.checkbox')
											.is(':checked') == true)
										count++;
								});
						if (count == 0)
							$('.list-count').addClass('hideBlock');
						else {
							$('.list-count').text('(' + count + ')');
							$('.list-count').removeClass('hideBlock');
						}
						/*if (($('#supplier').val() != undefined && $('#supplier')
								.val() != ""))
							$('.unselect').remove();
						if ($('.vend-name').text() == ""
								|| $('.vend-name').text() == undefined)
							$('.vend-name').text("No Vendor Linked");
						if (($('input[name=ibtSiteType]:radio:checked').val() == "Store"
								|| $('input[name=ibtSiteType]:radio:checked')
										.val() == "Warehouse" || $(
								'input[name=sourceSupply]:radio:checked').val() == "2"))
							$('.article-list').removeClass('hideBlock');
						if ($('#supplier-no-ibt').val() != undefined
								&& $('#supplier-no-ibt').val() != "")
							$('.article-list').removeClass('hideBlock');*/
						$('.total-count-list')
								.text(
										$('.article-list').length
												- $('.article-list').filter(
														":hidden").length);
					});

	// End of click

	vendorNo = $('.article-list').find('.vendor-no').val();

	// Remove existing Articles
	$('.article-no').filter(function() {
		var artNo = $(this).text().split('(')[0].trim();
		var uom=$(this).next().next().text().trim();
		$('.article-list').filter(function() {
			if ($(this).find('.art-no').text().trim() == artNo && $(this).find('.art-no').next().next().text().trim()==uom)
				$(this).remove();
		});
	});

/*	// Remove other vendors
	if ($('#supplier').val() != undefined && $('#supplier').val() != "") {
		vendNo = $('#supplier').val().split('-')[0].trim();
		$('.article-list').filter(
				function() {
					if ($(this).find('.vendor-no').val() != vendNo
							&& $(this).find('.vendor-no').val() != undefined)
						$(this).remove();
				});
	}*/

	/*// Remove unlinked vendor
	if (!($('input[name=ibtSiteType]:radio:checked').val() == "Store"
			|| $('input[name=ibtSiteType]:radio:checked').val() == "Warehouse"
			|| $('input[name=sourceSupply]:radio:checked').val() == "2" || ($(
			'#supplier-no-ibt').val() != undefined && $('#supplier-no-ibt')
			.val() != ""))) {
		$('.article-list').filter(
				function() {
					if ($(this).find('.vendor-no').val() == undefined
							|| $(this).find('.vendor-no').val() == "")
						$(this).remove();
				});
	}*/

	// Remove unselect supplier option in pReq
	/*if ($('#supplier-no-preq').val() != undefined
			&& $('#supplier-no-preq').val() != "") {
		vendorNo = parseInt($('#supplier-no-preq').val());
		$('.article-list').filter(function() {
			if ($(this).find('.vendor-no').val().trim() != vendorNo)
				$(this).remove();

		});
		$('.unselect').remove();
	}*/

	/*if ($('#supplier-no-ibt').val() != undefined
			&& $('#supplier-no-ibt').val() != "") {
		$('.article-list').removeClass('hideBlock');
		$('.unselect,.warning').remove();
	}
	if (($('input[name=ibtSiteType]:radio:checked').val() == "Store"
			|| $('input[name=ibtSiteType]:radio:checked').val() == "Warehouse" || $(
			'input[name=sourceSupply]:radio:checked').val() == "2")) {
		$('.article-list').removeClass('hideBlock');
		$('.unselect,.warning').remove();
	}
	if ($('#supplier-no-ibt').val() != undefined
			&& $('#supplier-no-ibt').val() != "") {
		$('.article-list').removeClass('hideBlock');
		$('.unselect,.warning').remove();
	}*/

	
	/*vendName = "";
	    if ($('.article-no').length != 0) {
		$('.warning').removeClass('hideBlock');
		if ($('#supplier').val() != undefined && $('#supplier').val() != "") {
			vendName = $('#supplier').val().split('-')[1];
			vendorNo = $('#supplier').val().split('-')[0].trim();
			$('.article-list').filter(function() {
				if ($(this).find('.vendor-no').val().trim() != vendorNo)
					$(this).remove();
			});
		} else if ($('#supplier-name-preq').val() != undefined
				&& $('#supplier-name-preq').val() != "")
			vendName = $('#supplier-name-preq').val();
	} else {
		$('.warning').removeClass('hideBlock');
		if ($('#supplier').val() != undefined && $('#supplier').val() != "")
			vendName = $('#supplier').val().split('-')[1];
		if ($('#supplier-name-preq').val() != undefined
				&& $('#supplier-name-preq').val() != "")
			vendName = $('#supplier-name-preq').val();
	}*/
	$('.total-count-list').text(
			$('.article-list').length
					- $('.article-list').filter(":hidden").length);
	setTimeout(
			function() {
				if ($('.article-list').length == 0) {
					var	articleNo = $('#article').val();
					
					var articleType = $('input[name=searchByOptions]:radio:checked')
							.val();
					/*if (($('input[name=ibtSiteType]:radio:checked').val() == "Store"
							|| $('input[name=ibtSiteType]:radio:checked').val() == "Warehouse" || $(
							'input[name=sourceSupply]:radio:checked').val() == "2")
							|| ($('#supplier-no-ibt').val() != undefined && $(
									'#supplier-no-ibt').val() != ""))
						msg = "Article number '<strong>"
								+ articleNo
								+ "</strong>' are already added to the list"
					else */
					if (articleType == "description")
						msg = "Article(s) of  description '<strong>"
								+ articleNo
								+ "</strong>' are already added to the list";
					else
						msg = "Articles related to '"+ articleNo
								+ "' are already added to the list";
					showError(msg);
					$("#dialog-modal2").dialog("close");
					/*$('.dialog-modal2 .popupData').html('');
					$('.dialog-modal2 #popupDataDiv2').css('height', '95px')
							.html(msg);
					$(
							'.dialog-modal2 .ContentTableWrapper,.dialog-modal2 .secondaryActionBtn')
							.addClass('hideBlock');
					$('.dialog-modal2 .addToList').removeClass('hideBlock')
							.removeAttr('onclick').html('OK').attr('onclick',
									'$("#dialog-modal2").dialog("close");');*/
				}
			}, 50);
	/*$('.vend-name').text(vendName);
	$('.warning').removeClass('hideBlock');
	if (vendName == "" || vendName == undefined)
		$('.warning,.unselect').addClass('hideBlock');*/
}
