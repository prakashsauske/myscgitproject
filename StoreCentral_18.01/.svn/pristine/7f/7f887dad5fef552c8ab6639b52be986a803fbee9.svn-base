$(document)
		.ready(
				function() {
					$(document).keypress(function(event) {
						if (event.which == 13) {
							hideErrorDiv();
							event.preventDefault();
							
								$("#searchAndAdd").click();
							
						}
					});
					$("#tableAddAction").addClass('hideBlock');
					document.forms[0].autocomplete = "off";
					$("#dialog-modal").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 600,
						width : 400
					});
					$("#dialog-modal").parent().addClass("popupWrapper");
					$("#dialog-modal2").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 700
					});
					$("#dialog-modal2").parent().addClass("popupWrapper");
					$("#dialog-cancelOrder").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 350
					});
					$("#dialog-cancelOrder").parent().addClass("popupWrapper");

					$("#addActionBtn").click(function() {
						$("#tableAddAction").removeClass('hideBlock');
					});
					$("#closeLink").click(function() {
						$("#tableAddAction").addClass('hideBlock');
					});
					$('#backBtn').click(function(){
						window.location.href="../login/goingHome.htm";
					});
					$('#searchAndAdd')
							.click(
									function() {
										hideErrorDiv();
										var articleNo = $('#article').val()
												.trim();
										var articleType = $(
												':input:radio[name="searchByOptions"]:checked')
												.val().trim();

										if (articleNo == "") {
											showError('Please enter an article.');
											$('#article').focus();
										} else if (articleType.toLowerCase() == "articlenumber"
												&& articleNo != ""
												&& !($.isNumeric(articleNo))) {
											showError('Please enter a valid article number.');
											$('#article').focus();
										} else {
											var formData = $('#submitQuery')
													.serialize();
											searchAndAdd(formData,
													"searchAndAddArticle.htm");
										}

									});

					$('#submitQueryBtn')
							.click(
									function() {
										hideErrorDiv();
										var saveStatus = false;
										$('.saveCheck')
												.filter(
														function() {
															if ($(this).css(
																	'display') == 'table-cell') {
																var id = (this.id)
																		.split('-')[1];
																saveStatus = true;
															}

														});
										var listCount = $('#treetable tr').length;
										var comments = $('#comments').val();

										if (listCount == 0
												&& comments.trim() == "") {
											showError('Please enter query comments.');
											$('#comments').focus();
										} else if (saveStatus) {
											showAlert('Please save the articles before you submitting the query.');
											$(("#qtyValue-").concat(id))
													.focus();
										} 
										else {
											comments = comments.replace(/\'/g,'\'\'');// added for defect 14603
											submitQuery({
												storeComment : comments
											}, "submitQuery.htm");
										}

									});
					$('#cancel')
							.click(
									function() {
										hideErrorDiv();
										if($('#treetable tr').length!=0 || $('#comments').val()!='')
										{
											$('#cancelId')
												.text(
														'Are you sure you want to cancel the query?');
										$("#dialog-cancelOrder").dialog("open");
										$("#confirmYES")
												.click(
														function(e) {
															window.location.href = "../AQMInitiateQuery/onPageLoad.htm";
														});
										}
									});
					
					  $("#goButtonSample2").click(function() {
						  hideErrorDiv();
						  
						  if($('#vendorDesc2').val()==''){
							 $('#DescriptionTableTitle').text('Please enter a keyword to lookup.'); 
							 $('#vendorDesc2').focus();
						 
						 } else{
							 $('#popupDataDiv2 .ContentTableWrapper').html('');
							 $('#popupDataDiv2 #DescriptionTableTitle').html(''); 
						 //$('#articleNo').val(); 
							 $('#article').val($('#vendorDesc2').val());
						 //getDescriptionDetail();
						 $('#description').click(); 
						 $('#searchAndAdd')
							.click();
						 //$('#sohSearch').click();
						 }
						  
						  });

					$('#number,#description,#reference').click(function() {
						hideErrorDiv();
						setTimeout(function() {
							$('#article').focus();
						}, 500);
					});
					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});
					$("#treetable").treetable({
						expandable : true
					});
					$('.closeMessage').click(function(){$('.errorMsgDiv').addClass('hideBlock');});
				});

function callFrom() {
	$('#dialog-modalUser').dialog('close');
	setTimeout(function() {
		$('#from').focus();
	}, 200);
}
function goToLogin() {
	//window.location.href = "../../";
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function resetData() {
	$('#number').click();
	$('#article').val('');
}
function showWarning(text) {
	$('#errorMsg').text(text);
	$(".errorMsgDiv").addClass('tableTitle nodataMessage');
	$(".errorMsgDiv").removeClass('tableTitle errorDiv');
	$(".errorMsgDiv").removeClass('hideBlock');
}
function showError(text) {
	$('#errorMsg').text(text);
	$(".errorMsgDiv").removeClass('hideBlock');
	$(".errorMsgDiv").removeClass('tableTitle nodataMessage');
	$(".errorMsgDiv").addClass('tableTitle errorDiv');
}
function hideError() {
	$(".errorMsgDiv").addClass('hideBlock');
}
function searchAndAdd(data, url) {
	$('#defaultTable').addClass('hideBlock');
	$
			.ajax({
				data : data,
				url : url,
				type : "post",

				beforeSend : function() {
					hideError();
					startLoading();
				},
				success : function(response) {
					var option = $("<h4>").html(response).find("#option").val();
					if (option == 1) {
						showDescriptionList(response);
						if(!$('#treetable').length)
							$('#defaultTable').removeClass('hideBlock');
						//resetData();
					} else if (option == 'result') {
						showArticleList(response);
						resetData();
						if(!$('#treetable').length)
							$('#defaultTable').removeClass('hideBlock');
					} else if (option == 'noData') {
						showError('Sorry, no results found for your search criteria. Please try again');
						if(!$('#treetable').length)
						$('#defaultTable').removeClass('hideBlock');
					}
					else if(option!='' && option.trim().length>0)
						{
						showError(option);
						
						if($('#dialog-modal2').dialog('isOpen')){$('#dialog-modal2').dialog('close');}
						$('#defaultTable').removeClass('hideBlock');
						}
					else if (option=='' && option.trim().length==0)
						{
						showError('Sorry, no results found for your search criteria. Please try again');
						if(!$('#treetable').length)
						$('#defaultTable').removeClass('hideBlock');
						}
					stopLoading();

				},
				error : function() {
					goToLogin();
				}
			});
}
function submitQuery(data, url) {
	$
			.ajax({
				data : data,
				url : url,
				type : "post",

				beforeSend : function() {
					hideError();
					startLoading();
				},
				success : function(response) {
					if (response != 'false') {
						//var queryNo=response;
						showAlert(response);
						$('#okBtn').click(function(){
							//window.location.href='../articleQuery/onPageLoad.htm?queryNo='+queryNo+'&option=Y';
							window.location.href='../AQMInitiateQuery/onPageLoad.htm';
						});
					} else {
						showAlert('Query submission failed, due to service unavailability.');
					}
					stopLoading();

				},
				error : function() {
					goToLogin();
				}
			});
}
function showArticleList(response) {
	$('#content').remove();
	$('#tableAddAction').after(response);
	bindTreeTable();
	$(".errorMsgDiv").addClass("hideBlock");
	$('.footerSection').removeClass('hideBlock');
	if($('#dialog-modal2').dialog('isOpen')){$('#dialog-modal2').dialog('close');}
}
function bindTreeTable()
{
$('#treetable td').unbind('hover');
$('#treetable td').hover(function()
		{
	
		});
}
function showDescriptionList(response) {
	//$('#popupDataDiv2').html(response);
	$('.dialog-modal2').html(response);
	$('#dialog-modal2').dialog('open');
	 bindMultipleSelect();
}
function selectItem(id, article) {
	$('#dialog-modal2').dialog('close');
	searchAndAdd({
		articleNo : article,
		index : id
	}, "searchAndAddArticle.htm");
}
function showAlert(msg) {
	$(".errorMsgDiv").addClass('hideBlock');
	$('#dialog-modal').dialog('open');
	$('#alertBox').text(msg);
}
function hideErrorDiv(){
	$('.errorMsgDiv').addClass('hideBlock');
}
