$(function() {
	$("#dialog-modal2").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});
	$("#dialog-modal2").parent().addClass("popupWrapper");
	$( "#dialog-modal1" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 120,
		maxHeight: 600,
		width: 350
	});
	$("#dialog-modal1").parent().addClass("popupWrapper"); 
	setTimeout(function() {
		$('#articleNo').focus();
	}, 200);
	$('#EAN').click(function() {
		setTimeout(function() {
			$('#articleNo').focus();
		}, 100);
	});
	$('#Description').click(function() {
		setTimeout(function() {
			$('#articleNo').focus();
		}, 100);
	});
	$('#ArticleNumber').click(function() {
		setTimeout(function() {
			$('#articleNo').focus();
		}, 100);
	});

	$("#backBtn").click(function(e) {
		// $('#content').html(response);
		if ($('#backBtn').hasClass('showHome')) {
			window.location.href = "../login/goingHome.htm";
		} else {
			showLookup();
		}
	});

	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			if($('#dialog-modal2').dialog('isOpen'))
				{
				$("#goButtonSample2").click();
				}
			else{
			$("#sohSearch").click();
			}
		}
	});

	$("#goButtonSample2").click(function() {

		if($('#vendorDesc2').val()==''){
			$('#DescriptionTableTitle').text('Please enter a keyword to lookup.');
			$('#vendorDesc2').focus();
			$('#popupDataDiv2 .ContentTableWrapper').html('');
		}
		else{
		$('#articleNo').val($('#vendorDesc2').val());
		$('#Description').click();
		$('#sohSearch').click();
		}

	});

	$("#sohSearch")
			.click(
					function() {
						var radioSelected = getRadioValue("articleType");
						$('#msg').html("");
						$("#errorMsgDiv").removeClass(
								'tableTitle nodataMessage');
						$("#errorMsgDiv").addClass('tableTitle errorDiv');

						if ($('#articleNo').val() == ""
								|| $.trim($('#articleNo').val()).length == 0) {
							$('#msg').html("Please enter a keyword to lookup.");
						} else if (radioSelected.toLowerCase() == "articlenumber"
								&& isNaN($('#articleNo').val())) {

							$('#msg').html("Please enter an article number");
						} else if (radioSelected.toLowerCase() == "ean"
								&& isNaN($('#articleNo').val())) {
							$('#msg').html("Please enter an EAN number");
						} else {
							var formData = $('#sohSubmit').serialize();
							var articleType = $('input:radio[name=articleType]:checked').val();
							
							$.ajax({
										data : formData,
										url : "searchArticle.htm",
										type : "post",
										beforeSend : function() {
											$('#statusImg').removeClass(
													'loading hideBlock');
											$('#statusImg').addClass('loading');
										},
										success : function(response) {
											var option = $("<h4>").html(
													response).find("#option")
													.val();
											$('#statusImg').addClass(
													'loading hideBlock');
											$('#statusImg').removeClass(
													'loading');
											
											if (option == 1) {
												$('#popupDataDiv2').html(response);
													$('#dialog-modal2').dialog(
															'open');
											} else if (option == 2) {
												loadUpdateContent(response);
											} else {
												$('#content').html(response);
												$('#content').removeClass(
														'hideBlock');
											}
										},
										error : function(response) {
											goToLogin();
											$('#content').html(
													"Some error occured");
											

										}
									});
						}
					});
});

function getRadioValue(name) {
	var group = document.getElementsByName(name);

	for ( var i = 0; i < group.length; i++) {
		if (group[i].checked) {
			return group[i].value;
		}
	}

	return '';
}
function selectItem(id,articleNo) {
	$('#dialog-modal2').dialog('close');
	$.ajax({
		data : {
			index : id
		},
		url : "selectArticle.htm",
		type : "post",
		beforeSend : function() {
			$('#statusImg').removeClass('loading hideBlock');
			$('#statusImg').addClass('loading');
		},
		success : function(response) {
			loadUpdateContent(response);
		},
		error : function(response) {
			goToLogin();
			$('#content').html("Some error occured");

		}
	});

}
function loadUpdateContent(response) {
	$('#content').append(response);
	$('.tableInfo').addClass('hideBlock');
	$('#content').removeClass('hideBlock');
	$('#lookupContainer').addClass('hideBlock');
	$('.showBrudcrum').removeClass('brudcrumHide');
	$('.hideBrudcrum').addClass('brudcrumHide');
	$("#backBtn").addClass('showLookup');
	$("#backBtn").removeClass('showHome');
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function showLookup() {
	$('#lookupContainer').removeClass('hideBlock');
	$('.tableInfo').removeClass('hideBlock');
	$('#content .updateContent').addClass('hideBlock');
	$('.showBrudcrum').addClass('brudcrumHide');
	$('.hideBrudcrum').removeClass('brudcrumHide');
	$("#backBtn").removeClass('showLookup');
	$("#backBtn").addClass('showHome');
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function goToLogin()
{
	window.location.href = "../../";
}
$(document).on('click','#saveSOH',function() {
    var id = $(this).attr('id');
    //alert(id);    
});
$(document).on('click','#cancelSOH',function() {
	showLookup();
    //alert(id);    
});