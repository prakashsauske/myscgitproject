var id,refno;
$(document)
		.ready(
				function() {
					// when edit button is clicked displays input box in
					// editable cells
					$(".editRowBtn").click(
							function() {
								var id = (this.id).split('-')[1];

								$(("#row-").concat(id))
										.addClass('rowHighlight');
								$(("#qtyEdit-").concat(id)).removeClass(
										'hideBlock');
								$(("#qty-").concat(id)).addClass('hideBlock');
								
								$(("#commentsEdit-").concat(id)).removeClass(
								'hideBlock');
								$(("#comments-").concat(id)).addClass('hideBlock');
								
								$(("#saveRecord-").concat(id)).removeClass(
										'hideBlock');
								$(("#editRecord-").concat(id)).addClass(
										'hideBlock');
							});

					$(".saveRowBtn")
							.click(
									function() {
										var id = (this.id).split('-')[1];
										var selectedId=$(
												("#qtyValue-")
														.concat(id))
												.val();
										var qty = $(("#qtyValue-").concat(id))
												.val();
										var comments = $(("#commentsValue-").concat(id))
												.val();
										var refNo = $(("#refNo-").concat(id))
										.text().trim();
										var uom = $(("#uom-").concat(id))
										.text().trim();
										if (qty == 'Select') {
											showAlert('Please provide Reason Code.');
										} else {
											// 
											
											comments = comments.replace(/\'/g,'\'\'');// added for defect 14603
											
																editOrDeleteArticle({
																	saveOrDeleteFlag : "s",
																	index : id,
																	storeReasonCode : qty,
																	lineItemComments : comments,
																	saveFlag : 'Y',
																	articleNo: refNo,
																	uom: uom,
																	storeReasonCodeDesc: $('#'+selectedId).text()
																},id,refNo);
																$(
																		("#row-")
																				.concat(id))
																		.removeClass(
																				'rowHighlight');
																$(
																		("#qtyEdit-")
																				.concat(id))
																		.addClass(
																				'hideBlock');
																$(
																		("#qty-")
																				.concat(id))
																		.removeClass(
																				'hideBlock');
																
																$(
																		("#qty-")
																				.concat(id))
																		.text(
																				$('#'+selectedId).text());
																
																$(
																		("#commentsEdit-")
																				.concat(id))
																		.addClass(
																				'hideBlock');
																$(
																		("#comments-")
																				.concat(id))
																		.removeClass(
																				'hideBlock');
																$(
																		("#comments-")
																				.concat(id))
																		.text(
																				$(
																						("#commentsValue-")
																								.concat(id))
																						.val());

																$('#articleNo')
																		.focus();
																$(
																		("#saveRecord-")
																				.concat(id))
																		.addClass(
																				'hideBlock');
																$(
																		("#editRecord-")
																				.concat(id))
																		.removeClass(
																				'hideBlock');
																$(
																		"#dialog-cancelOrder")
																		.dialog(
																				"close");
															

										}
									});
					$(".deleteRowBtn") .click( function() {$("#dialog-cancelOrder").dialog("open");
								 id = (this.id).split('-')[1];
								 refno = $(('#refNo-').concat(id))
										.text().trim();
								 $('#cancelId')
									.text(
											'Are you sure you want to delete the article?');
								 
							});
					
					$("#confirmYES").click(
							function() { editOrDeleteArticle({
								saveOrDeleteFlag : "d",
								index : id,
								articleNo : refno
							},id,refno);
							$("#dialog-cancelOrder").dialog("close");
							});
					$("#confirmNO").click(function(e) {
						$("#dialog-cancelOrder").dialog("close");
					});
				});
function editOrDeleteArticle(data,id,refNo) {
	console.log(data,id,refNo);
	$.ajax({
		type : "get",
		url : "editOrDeleteArticle.htm",
		data : data,
		beforeSend : function() {
			hideError();
			startLoading();
		},
		success : function(response) {
			// alert(response);
			if (response == 'deleted') {
				deleteRow(id);
			} else if (response == 'saved')
				{
				
				}
			stopLoading();
		},
		error : function() {
			stopLoading();
			status = false;
		}
	});
}
function deleteRow(id) {
	//alert(id);
	//console.log(id);
	$(('#row-').concat(id)).remove();
	if ($('#treetable tr').length == 1) {
		$('.footerSection').addClass('hideBlock');
		$('#content').remove();
		if(!$('#treetable').length)
			$('#defaultTable').removeClass('hideBlock');
	}
}