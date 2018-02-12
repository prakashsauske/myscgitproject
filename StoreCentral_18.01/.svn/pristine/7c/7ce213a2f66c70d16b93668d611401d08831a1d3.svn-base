$(document).ready(function() {
//start of new code from Haresh
	
	// New type of the tag
	/*var replacementTag = 'button';

	// Replace all a tags with the type of replacementTag
	$('label.actionBtn, label.secondaryActionBtn').each(function() {
		var outer = this.outerHTML;

		// Replace opening tag
		var regex = new RegExp('<' + this.tagName, 'i');
		var newTag = outer.replace(regex, '<' + replacementTag + ' type=button');

		// Replace closing tag
		regex = new RegExp('</' + this.tagName, 'i');
		newTag = newTag.replace(regex, '</' + replacementTag);

		$(this).replaceWith(newTag);
		
	});*/
		
	// Code to handle key press event
	$(".actionBtn, .secondaryActionBtn").bind('click', function(){
		clickedId = this.id;
		$(this).checkWhatClicked(clickedId);
		$(this).blur();			
	});	
	
	$('.actionBtn, .secondaryActionBtn').keydown(function(e){
		//(event.which == 13)
		if(e.which == 13) { //13 is the char code for Enter
			event.preventDefault();
			clickedId = this.id;
			$(this).checkWhatClicked(clickedId);
			$(this).blur();					
		}
	});
	
	jQuery.fn.checkWhatClicked = function() {
		if(clickedId == 'saveSOH'){
			//$( "#dialog-modal" ).dialog( "open" );						
			//$('#okSOH').focus();
			submitNewSOh();
		}
		if(clickedId == 'dialog-modal-ok'){
			$('#dialog-modal').dialog('close');
			$('#new-soh').focus();
		}
		if(clickedId == 'confirmYES'){
			if($('#confirmYES').attr('forWhat')=='sohSubmit'){
				
				$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');
				
			}else if($('#confirmYES').attr('forWhat')=='cancel'){
				goBack();
				
			}
		}
		if(clickedId == 'confirmNO'){
			
			$('#dialog-cancelOrder').dialog('close');
		}
		if(clickedId == 'articleHistory'){
			
			sohHistoryFetch();
		}
		if(clickedId == 'cancelSOH'){
			cancelCall(); 
		}
			 
		if(clickedId == 'back'){
			cancelCall();
		}
			
		// Add code for Cancel here
		if(clickedId == 'okSOH'){
			$( "#dialog-modalSuccess" ).dialog( "close" );			
		}
		return;	
	};

	
	//end of new code from Haresh
	
	$('.trimDecimalForSoh').filter(function(){
		var value=$(this).text();
		$(this).text(value.split(".")[0]);
		});

	
	if(Number($('#carton').text())!=0){
		var baseQty = $('#uom-txt').text();
		
		var sohWithDecimal = $('#uom-value').text();
		var soh=sohWithDecimal;
		
		
		if(baseQty.toLowerCase() != "kg"){
			soh=sohWithDecimal.split(".")[0];
			$('#uom-value').text(soh);
			//$('#adjust').val(adjustFloat.toFixed(0));
		}
		
		var carton = Number($('#carton').text());
		var car=soh/carton;
		var finalCar=car.toFixed(3);
		
		
		$('#car').html(finalCar+" CAR | ");
		
	}
	//$( "#dialog-modalSuccess" ).dialog( "open" );
	$('#new-soh').focus();
	/*$(document).keypress(function(event) {
		if ((event.which == 13)&&(!$( "#dialog-modalSuccess" ).dialog( "isOpen" ))) {
			event.preventDefault();
			submitNewSOh();

		}
	});*/
	$('.decimalPrecision').filter(function(){
		var value=Number($(this).text());
		$(this).text(value.toFixed(3));
		});
	
	//$('#confirmYES').click($('#confirmYES').attr('onclick', ""));
}

);
var isChangedFlag = false;
function cancelCallForLookup() {

	// javascript:window.location.href=${prevPage}

	$("#dialog-modal").parent().addClass("popupWrapper");
	$("#dialog-cancelOrder").parent().addClass("popupWrapper");
	// var prevId=$('#prevPageLink').val().split("'");
	var link = "../article/onPageLoadArticleScreen.htm";

	if (isChangedFlag == true) {
		// pop up
		$('.alertText').text("Do you want to cancel the changes?");
		// var yesOnClick="javascript:window.location.href="+link;
		$('#confirmYES').attr('onclick', 'goBackForLookup();');
		$("#dialog-cancelOrder").dialog("open");

		/*
		 * var confirmBoxVal=confirm("Do you want to cancel the changes?"); if
		 * (confirmBoxVal==true) { javascript:window.location.href=link; } else {
		 * $('#adjust').focus(); }
		 */

	} else
		window.location.href = link;

}
function cancelCall() {

	// javascript:window.location.href=${prevPage}

	$('#confirmYES').attr('forWhat', "cancel");
	$("#dialog-modal").parent().addClass("popupWrapper");
	$("#dialog-cancelOrder").parent().addClass("popupWrapper");
	var prevId = $('#prevPageLink').val().split("'");
	var link = prevId[1];

	if (isChangedFlag == true) {
		// pop up
		$('.alertText').text("Do you want to cancel the changes?");
		// var yesOnClick="javascript:window.location.href="+link;
		$('#confirmYES').attr('onclick', 'goBack();');
		$("#dialog-cancelOrder").dialog("open");

		/*
		 * var confirmBoxVal=confirm("Do you want to cancel the changes?"); if
		 * (confirmBoxVal==true) { javascript:window.location.href=link; } else {
		 * $('#adjust').focus(); }
		 */

	} else
		window.location.href = link;
}
function goBackForLookup() {
	// var prevId=$('#prevPageLink').val().split("'");
	var link = "../article/onPageLoadArticleScreen.htm";
	window.location.href = link;

}
function goBack() {
	var prevId = $('#prevPageLink').val().split("'");
	var link = prevId[1];
	window.location.href = link;
}
setTimeout(function() {
	$('#ordNum').text(($('#ordNum').text() / 10) * 10);
}, 100);
window.onresize = function() {
	if ($(document).height() != $(window).height())
		$('#footerDiv').css('position', 'relative');
	else
		$('#footerDiv').css('position', 'absolute');

};
function adjustedSOH() {
	$("#dialog-modal").parent().addClass("popupWrapper");

	var baseQty = $('#uom-txt').text();
	if ($('select option:selected').val() == "default") {

		$('#msg').html("You must select a reason prior to adjustment");
		
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');
		//$("#dialog-modal").dialog("open");

		// $('#msg').html("You must select a reason prior to adjustment");

		$('#selectReason').focus();
	} else if (baseQty.toLowerCase() == "ea") {
		if ($('#new-soh').val().indexOf('.') != -1) {

			$('#msg').html(
					"Please enter non-decimal values for weighted articles.");
			
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
			//$("#dialog-modal").dialog("open");

			//$("#dialog-modal").parent().addClass("popupWrapper");

			// $('#msg').html("Please enter a whole number in New SOH field");

			$('#new-soh').val('');
			$('#new-soh').focus();
		} else if ($('#adjust').val().indexOf('.') != -1) {
			$('#msg').html(
			"Please enter non-decimal values for weighted articles.");
	
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
			// $('#msg').html("Please enter a whole number in Adjustment
			// field");

			$('#adjust').val('');
			$('#adjust').focus();
		}
	}

}

function submitNewSOh() {

	$('#msg').html(" ");
	$("#dialog-cancelOrder").parent().addClass("popupWrapper");
	$("#dialog-modal").parent().addClass("popupWrapper");
	var adjustThreshold = 9;
	var baseQty = $('#uom-txt').text();
	var soh = Number($('#uom-value').text());
	var newSOH = Number($('#new-soh').val());
	var select = $('select option:selected').attr('indicator');
	if ($('select option:selected').val() == "default") {
	
		$('#msg').html("Please select a reason code");

$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
$("#errorMsgDiv").addClass('tableTitle errorDiv');

	} else if ($('#new-soh').val() == ""
			|| $.trim($('#new-soh').val()).length == 0) {
		$('#msg').html("Please enter New SOH value ");
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');

	} else if (isNaN($('#new-soh').val())) {
		$('#msg').html("Please enter a number");
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');
		$('#new-soh').val('');
		$('#new-soh').focus();
	} /*else if ($('#new-soh').val() < 0) {
		$('#msg').html("New SOH value cannot be negative ");
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');

		$('#new-soh').focus();
	}*/ else if ($('#adjust').val() == "" || $('#adjust').val() == 0
			|| $.trim($('#adjust').val()).length == 0) {
		$('#msg').html("Current value is same as the existing value. Please provide the changed value");
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');

		$('#new-soh').focus();
	} else if (select == "S" && newSOH < soh) {
		$('#msg').html("For the selected reason, new SOH should be greater than current SOH value '"+soh+"'.");
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');

		$('#new-soh').focus();
	} else if (select == "H" && newSOH > soh) {
		/*
		 * errorOkPopup("For the selected reason, New SOH should be lesser than
		 * Current SOH value", ".reason-code");
		 */
		$('#msg').html("For the selected reason, new SOH should be less than current SOH value '"+soh+"'.");
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');

		$('#new-soh').focus();
	}

	else if (baseQty.toLowerCase() == "kg") {

		if ($('#adjust').val() > adjustThreshold) {
			// pop up
			$('#confirmYES').attr('onclick', "$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');");
			$('#confirmYES').attr('forWhat', "sohSubmit");
			$('.alertText')
					.text(
							"Adjustment Value is greater than the threshold value.Do you want to save the changes?");

			$("#dialog-cancelOrder").dialog("open");

			/*
			 * var confirmBoxVal=confirm("Adjustment Value is greater than the
			 * threshold value.Do you want to save the changes?"); if
			 * (confirmBoxVal==true) { $('#sohSubmit').submit(); } else {
			 * $('#adjust').focus(); }
			 */

		} else if ($('#adjust').val() < 0
				&& $('#adjust').val() < -(adjustThreshold)) {

			// pop up
			$('#confirmYES').attr('onclick', "$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');");
			$('#confirmYES').attr('forWhat', "sohSubmit");
			$('.alertText')
					.text(
							"Adjustment Value is greater than the threshold value.Do you want to save the changes?");

			$("#dialog-cancelOrder").dialog("open");
			/*
			 * var confirmBoxVal=confirm("Adjustment Value is greater than the
			 * threshold value.Do you want to save the changes?"); if
			 * (confirmBoxVal==true) { $('#sohSubmit').submit(); } else {
			 * $('#adjust').focus(); }
			 */

		} else {

			// pop up
			$('#confirmYES').attr('onclick', "$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');");
			$('#confirmYES').attr('forWhat', "sohSubmit");
			$('.alertText').text("Do you want to save the changes?");

			$("#dialog-cancelOrder").dialog("open");
			/*
			 * var confirmBoxVal=confirm("Do you want to save the changes?"); if
			 * (confirmBoxVal==true) { $('#sohSubmit').submit(); } else {
			 *  }
			 */

		}
	}

	else if (baseQty.toLowerCase() == "ea") {
		if ($('#new-soh').val().indexOf('.') != -1) {
			$('#msg').html(
					"Please enter non-decimal values for weighted articles.");
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');

			$('#new-soh').val('');
			$('#new-soh').focus();
		} else if ($('#adjust').val().indexOf('.') != -1) {
			$('#msg').html(
					"Please enter non-decimal values for weighted articles.");
			
			
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
			
			
			//$("#dialog-modal").dialog("open");
			// $('#msg').html("Please enter a whole number in Adjustment
			// field");

			$('#adjust').val('');
			$('#adjust').focus();
		} else if ($('#adjust').val() > adjustThreshold) {
			// pop up
			$('#confirmYES').attr('onclick', "$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');");
			$('#confirmYES').attr('forWhat', "sohSubmit");
			$('.alertText')
					.text(
							"Adjustment Value is greater than the threshold value.Do you want to save the changes?");

			$("#dialog-cancelOrder").dialog("open");
			/*
			 * var confirmBoxVal=confirm("Adjustment Value is greater than the
			 * threshold value.Do you want to save the changes?"); if
			 * (confirmBoxVal==true) { $('#sohSubmit').submit(); } else {
			 * $('#adjust').focus(); }
			 */

		} else if ($('#adjust').val() < 0
				&& $('#adjust').val() < -(adjustThreshold)) {
			// pop up
			$('#confirmYES').attr('onclick', "$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');");
			$('#confirmYES').attr('forWhat', "sohSubmit");
			$('.alertText')
					.text(
							"Adjustment Value is greater than the threshold value.Do you want to save the changes?");

			$("#dialog-cancelOrder").dialog("open");
			/*
			 * var confirmBoxVal=confirm("Adjustment Value is greater than the
			 * threshold value.Do you want to save the changes?"); if
			 * (confirmBoxVal==true) { $('#sohSubmit').submit(); } else {
			 * $('#adjust').focus(); }
			 */

		} else {
			// pop up
			$('#confirmYES').attr('onclick', "$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');");
			$('#confirmYES').attr('forWhat', "sohSubmit");
			$('.alertText').text("Do you want to save the changes?");

			$("#dialog-cancelOrder").dialog("open");
			/*
			 * var confirmBoxVal=confirm("Do you want to save the changes?"); if
			 * (confirmBoxVal==true) { $('#sohSubmit').submit(); } else { }
			 */

		}
	}
	else{
		if ($('#adjust').val() > adjustThreshold) {
			// pop up
			$('#confirmYES').attr('onclick', "$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');");
			$('#confirmYES').attr('forWhat', "sohSubmit");
			$('.alertText')
					.text(
							"Adjustment Value is greater than the threshold value.Do you want to save the changes?");

			$("#dialog-cancelOrder").dialog("open");

			/*
			 * var confirmBoxVal=confirm("Adjustment Value is greater than the
			 * threshold value.Do you want to save the changes?"); if
			 * (confirmBoxVal==true) { $('#sohSubmit').submit(); } else {
			 * $('#adjust').focus(); }
			 */

		} else if ($('#adjust').val() < 0
				&& $('#adjust').val() < -(adjustThreshold)) {

			// pop up
			$('#confirmYES').attr('onclick', "$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');");
			$('#confirmYES').attr('forWhat', "sohSubmit");
			$('.alertText')
					.text(
							"Adjustment Value is greater than the threshold value.Do you want to save the changes?");

			$("#dialog-cancelOrder").dialog("open");
			/*
			 * var confirmBoxVal=confirm("Adjustment Value is greater than the
			 * threshold value.Do you want to save the changes?"); if
			 * (confirmBoxVal==true) { $('#sohSubmit').submit(); } else {
			 * $('#adjust').focus(); }
			 */

		} else {

			// pop up
			$('#confirmYES').attr('onclick', "$('#sohSubmit').submit();$('#confirmYES').attr('onclick', '');");
			$('#confirmYES').attr('forWhat', "sohSubmit");
			$('.alertText').text("Do you want to save the changes?");

			$("#dialog-cancelOrder").dialog("open");
			/*
			 * var confirmBoxVal=confirm("Do you want to save the changes?"); if
			 * (confirmBoxVal==true) { $('#sohSubmit').submit(); } else {
			 *  }
			 */

		}
	}

}

function calculateAdjustment() {
	// $('#msg').html("");
	isChangedFlag = true;
	//var select = $('select option:selected').attr('indicator');
	// var newSOH = (select == "S") ? soh + adjust : soh - adjust;
	// var indicator=(select == "S") ? "(+)":"(-)";
	//$('#signIndicator').text(indicator);
	
	var baseQty = $('#uom-txt').text();
	var soh = Number($('#uom-value').text());
	var newSOH = Number($('#new-soh').val());
	var select = $('select option:selected').attr('indicator');
	 var adjust = ((newSOH - soh) >0) ? newSOH - soh :  soh - newSOH ;
	//var adjust = newSOH - soh;
	var adjustFloat = parseFloat(adjust);
	/*if (select == "07") {
		$('#mvmtType').val('252');
	} else {
		$('#mvmtType').val('251');
	}*/

	if (baseQty.toLowerCase() == "ea") {
		$('#adjust').val(adjustFloat.toFixed(0));
	} else {
		$('#adjust').val(adjustFloat.toFixed(3));
	}

}
function calculateNewSoh() {
	isChangedFlag = true;
	// $('#msg').html("");
	var select = $('select option:selected').attr('indicator');
	// var newSOH = (select == "S") ? soh + adjust : soh - adjust;
	 var indicator=(select == "S") ? "(+)":"(-)";
	$('#signIndicator').text(indicator);
	
	var baseQty = $('#uom-txt').text();
	var soh = Number($('#uom-value').text());
	var adjust = Number($('#adjust').val());
	var select = $('select option:selected').attr('indicator');
	 var newSOH = (select == "S") ? soh + adjust : soh - adjust;
	//var newSOH = soh + adjust;
	var newSOHFloat = parseFloat(newSOH);
	

	if (baseQty.toLowerCase() == "ea") {
		$('#new-soh').val(newSOHFloat.toFixed(0));
	} else {
		$('#new-soh').val(newSOHFloat.toFixed(3));
	}
}
function clearValues() {
	// $('#msg').html("");
	$('#adjust').val("");
	$('#new-soh').val("");

}

// Stock Adjust screen
function checkSelectField() {
	// $('#msg').html("");
	if ($('select option:selected').val() == "default") {
		$('#msg').html("You must select a reason prior to adjustment");
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');

		// $('#msg').html("You must select a reason prior to adjustment ");
		/*
		 * errorOkPopup("You must select a reason prior to adjustment",
		 * ".reason-code");
		 */
	}
}
function sohHistoryFetch() {
	$('#msg').html(" ");
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
	$('#sohHistory').val("sohHistoryFetch");
	$('#sohSubmit').submit();

}
function loadSOH() {
	var itemNo = $('#articleNo').val();
	var desc = $('#articleName').val();
	var baseQty = $('#uom-txt').text();
	
	var sohWithDecimal = $('#uom-value').text();
	var soh=sohWithDecimal;
	
	
	if(baseQty.toLowerCase() != "kg"){
		soh=sohWithDecimal.split(".")[0];
		$('#uom-value').text(soh);
		//$('#adjust').val(adjustFloat.toFixed(0));
	}
	
var dropretainReasonCode = $('#dropretainReasonCode').val();
	
	

	$('#sohHistory').val("");
	var sohPostStatus = $('#sohPostStatus').val();
	
	
	if (localStorage.sohFromHome == "true") {
		$('#sohSubmit').show();
	}
	
	
	/*
	 * if (sohPostStatus == "True") { $('.popMessage').text("Stock adjustment
	 * has been done successfully"); $( "#dialog-modal" ).dialog( "open" );
	 * //$('#msg').html("Stock adjustment has been done successfully"); } else
	 * 
	 */if (sohPostStatus != "True" && $.trim(sohPostStatus).length != 0) {
		$("#dialog-modal").parent().addClass("popupWrapper");
		$('#msgText').html(sohPostStatus);
		$("#dialog-modal").dialog("open"); 
		

	}else if($('#noDataSoh').val()=="Stock adjusted successfully"){
		$('#updatedSohInPopup').text(soh);
		$( "#dialog-modalSuccess" ).dialog( "open" );
	}else{
		$('#msg').html($('#noDataSoh').val());
		
	}
	 
		

	

	if(dropretainReasonCode!="" && $.trim(dropretainReasonCode).length != 0){
		$("#selectReason option[value='" + dropretainReasonCode + "']").prop(
				'selected', true);
		$('#adjust').val('1');
		calculateNewSoh();
		
	}else 
	{
		if (Number(soh) <= 0) {
		$('#selectReason option[value="Z77"]').prop('selected', true);
		
		} else {
		$('#selectReason option[value="Z78"]').prop('selected', true);
		}
		
		
		if (baseQty.toLowerCase() == "kg") {
			if (Number(soh) <= 0) {
				$('#new-soh').val('0');
				calculateAdjustment();
				
			} else {
				$('#new-soh').val('');
				$('#adjust').val('');
				// calculateAdjustment();
			}
		}
		if (baseQty.toLowerCase() == "ea") {
			if (Number(soh) <= 0) {
				$('#new-soh').val('0');
				calculateAdjustment();
			} else {
				$('#new-soh').val(Number(soh) - 1);
				calculateAdjustment();
				// only numbers - no decimals
				/*
				 * $('#new-soh').keypress(function() { return !isNaN(event); } );
				 */
			}
		}
		
		
	}
	

	
	
	var select = $('select option:selected').attr('indicator');
	// var newSOH = (select == "S") ? soh + adjust : soh - adjust;
	 var indicator=(select == "S") ? "(+)":"(-)";
	$('#signIndicator').text(indicator);
	
	
	$('#new-soh').keyup(function(){
		if($('#new-soh').val()!=""){
		calculateAdjustment();}
		else{
			$('#adjust').val('');	
		}
		
	});
	$('#adjust').keyup(function(){if($('#adjust').val()!="")calculateNewSoh();
	else
		$('#new-soh').val('');
	});
	$('#selectReason').change(calculateNewSoh);

	isChangedFlag = false;
	/*
	 * if ($('#uom-value').text().split(1)[0] == '-')
	 * $('#adjust').val($('#adjust').val() * (-1));
	 */
}
function isNumberKeyADJ(evt) {
	var baseQty = $('#uom-txt').text();
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
		if (charCode == 46) {
			if(baseQty.toLowerCase() == "ea"){
				return false;
			}else{
				return true;
			}
			
		}
		return false;
	}

	return true;
}
function isNumberKeySOH(evt) {
	var baseQty = $('#uom-txt').text();
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
		if (charCode == 45) {
			return true;
		}
		if (charCode == 46) {
			if(baseQty.toLowerCase() == "ea"){
				return false;
			}else{
				return true;
			}
		}
		return false;
	}

	return true;
}
