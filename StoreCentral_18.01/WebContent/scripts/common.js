flag=false;
focus="";
$( document ).ready(function() {
	if(sessionStorage.salesOrg=="1020") {
		$('.logo-img').attr('src','../../images/petrol.jpg').css('width','175px');
		$('.logoImg').attr('src','../../images/petrol.jpg').css('width','175px');
	}		
	else if(sessionStorage.salesOrg=="1005"){
		$('.logo-img').attr('src','../../images/logo1.png');
		$('.logoImg').attr('src','../../images/logo1.png');
	}	
	else if(sessionStorage.salesOrg=="2010") {
		$('.logo-img').attr('src','../../images/countdown.png');
		$('.logoImg').attr('src','../../images/countdown.png');
	}
	
	$('#popup-msg').text('');
	 if($('#error-field').text()=="false")
		 {
		 $('#error-field').text('');
		 $('.prompt').hide();
			$('.message').show();
			$('#popup-msg').text('Receive order request failed. Please try again after sometime.');
			$('#confirm-popup,#overlay-back').fadeIn(500);
			
		 }
	 if($('#error-field').text()=="exists")
	 {
	 $('#error-field').text('');
	 $('.prompt').hide();
		$('.message').show();
		$('#popup-msg').text('Article already exist in the list');
		$('#confirm-popup,#overlay-back').fadeIn(500);
		
	 }
	 if($('#error-field').text()=="failed")
	 {
	 $('#error-field').text('Create order request failed. Please try again after sometime.');
	 $('.prompt').hide();
		$('.message').show();
		$('#popup-msg').text('');
		$('#confirm-popup,#overlay-back').fadeIn(500);
		
	 }
	 if($('#error-field').text()=="true")
	 {
	 $('#error-field').html('Receive order request successfully submitted');
	 }
	 $('.time-slice').filter(function(){
			var slicedHour=$(this).text().slice(2,4);
			var slicedMin=$(this).text().slice(5,7);
			$(this).text(slicedHour+":"+slicedMin);
		});
				

	$( "#addReceiveBtn" ).click(function(){
		$('#popup-msg').text('');
		if($('#recQty').val()=="" && $('#artEan').val()=="")
		{
			focus="artEan";
		$('.prompt').hide();
		$('.message').show();
		$('#popup-msg').text('Please enter article no/EAN and received quantity');
		$('#confirm-popup,#overlay-back').fadeIn(500);
		}
		else if($('#recQty').val()=="" && $('#artEan').val()!="")
		{
			//if(isNaN($('#artEan').val()))
			focus="recQty";
			$('.prompt').hide();
			$('.message').show();
			$('#popup-msg').text('Please enter received quantity');
			$('#confirm-popup,#overlay-back').fadeIn(500);
				
		}
		else if( $('#artEan').val()!="" && isNaN($('#artEan').val()) )
		{
			//if(isNaN($('#artEan').val()))
			focus="artEan";
			$('.prompt').hide();
			$('.message').show();
			$('#popup-msg').text('Please enter valid article no/EAN');
			$('#confirm-popup,#overlay-back').fadeIn(500);
			
				
		}
		else if($('#recQty').val()!="" && $('#artEan').val()=="")
		{
			focus="artEan";
			$('.prompt').hide();
			$('.message').show();
			$('#popup-msg').text('Please enter article no/EAN');
			$('#confirm-popup,#overlay-back').fadeIn(500);	
		}
		else if($('#recQty').val()!="" && (isNaN($('#recQty').val()) || $('#recQty').val()<0))
		{
			focus="recQty";
			$('.prompt').hide();
			$('.message').show();
			$('#popup-msg').text('Please enter valid received quantity');
			$('#confirm-popup,#overlay-back').fadeIn(500);	
			
		}
		else if(isNaN($('#artEan').val()) && isNaN($('#recQty').val()))
		{
			focus="artEan";
			$('.prompt').hide();
			$('.message').show();
			$('#popup-msg').text('Please enter valid article no/EAN and received quantity');
			$('#confirm-popup,#overlay-back').fadeIn(500);	
			
		}
		else
			{
			
		$( "#flag" ).val('');
		$('#receiveForm').submit();
			}
		
	});
	var editFlag=true;
	$('.placeHolder').attr('ondragstart','return false').attr('ondragstart','return false').attr('oncut','return false').attr('onpaste','return false').attr('oncopy','return false');
	$('.placeHolder').change(function(){
		if($('.placeHolder').val()!="")
			editFlag=true;
	});
	$(".delDate").filter(function(){
		if($(this).text()=="")
			flag=true;
	});
	$(".qtyInput").filter(function(){
		if($(this).text()=="")
			flag=true;
	});
	/*$('#navigation-section').click(function(){
		$('#popup-msg').text('');
		if($('.placeHolder').val()!="")
			{
			$('.prompt').show();		
			$('.message').hide();
			$('#popup-msg').text('Do you want to discard the changes?');
		$('#confirm-popup,#overlay-back').fadeIn(500);
		}});*/
	setTimeout(function(){	
	if($(document).height()!=$(window).height())
		$('#foot-section').css('position','relative');
				else
		$('#foot-section').css('position','absolute');
	},100);
$(document).click(function(){	
	setTimeout(function(){	
	if($(document).height()!=$(window).height())
		$('#foot-section,#footerDiv').css('position','relative');
				else
		$('#foot-section,#footerDiv').css('position','absolute');
	},100);
});

/*$("#temperature").blur(function(){
	var str=$('#tempFromService').val();
	var n=str.slice(1,-1);
	
	var tempVal=n.split(" to ");
	if(($('#temperature').val()>tempVal[1] || $('#temperature').val()<tempVal[0]))
	{
		focus="temperature";
		$('.prompt').hide();		
		$('.message').show();
		$('#popup-msg').text('Temperature should be between the inbound & outbound limit.');
		$('#confirm-popup,#overlay-back').fadeIn(500);
	}	
	
});*/


//for ibt receipt temperature check
$("#temperature").blur(function(){
	if ($('#temperature').val() != "" && $.trim($('#temperature').val()).length > 0 ){
		changesMadeIndicator=1;
	//alert("temp blur func");
	//var dept=$('#deptFromService').val();
	//alert("dept"+dept);
	//dept="005,006";
	//alert("dept"+dept);
	//var deptArray=dept.split(",");
		var salesOrg=$('#userSalesOrg').val();
		var range=$('#tempFromService').val();
		if(salesOrg==1020){
			range="(-15 to 5)";
			}
	var slicedRange=range.slice(1,-1);
	
	var tempValArray=slicedRange.split(" to ");
	var rank=$('#deptFromService').val();
	/*for(var i=0;i<deptArray.length;i++){
		if(deptArray[i]=="003" || deptArray[i]=="004" || deptArray[i]=="008" || deptArray[i]=="070" || deptArray[i]=="012"){
			rank=1;
		//	alert("rank=1");
			break;
		}else if(deptArray[i]=="006"){
			if(rank>2){
				rank=2;
			}
			
		}else if(deptArray[i]=="005"){
			if(rank>3){
				rank=3;
			}
				
		}
		
	}*/
	if(rank==4){
		/*if(tempValArray[0]<0){
			rank=1;
		}else if(tempValArray[0]>=0 && tempValArray[0]<=5){
			rank=2;
		}else{
			rank=3;
		}*/
		rank=3;
		
	}
	//alert("rank ="+rank);
	
	if(rank=="1"){
		//alert("rank==1");
		question1="Are the frozen products not frozen?";
		question2="Temperature is too high. Will load be rejected?";
	}else if(rank=="2"){
		//alert("rank==2");
		question1="Is this delivery high risk produce?";
		question2="Incorrect temperature. Will load be rejected?";
	}else if(rank=="3"){
		//alert("rank==3");
		question1="Is the delivery carcass meat?";
		question2="Incorrect temperature. Will load be rejected?";
	}
	if((Number($('#temperature').val())<-99.9 || Number($('#temperature').val())>99.9))
	{
	
		temperatureOutOfRange();	
		
	
		
		
	}
	else if(salesOrg==1020){
		 question1="Does this order contain frozen items?";
		 question2="Are products hard frozen?";
		 question3="Temperature too high. Will entire order be rejected/cancelled?";
		 question4="Temperature too high.Refer to Food Safety Guide and receive rejected items as zero QTY. Ok?";
		 question5="Entire load is being rejected/cancelled due to incorrect temperature. Is this correct?";
		 question6="Do you wish to receive  every item in this order as ZERO Qty?";
		
		 
		 
		 
		 if((Number($('#temperature').val())<tempValArray[1] && Number($('#temperature').val())>tempValArray[0]))
			{
			
				$('.popMessagetemp').text(question1);
				$('.confirmNoTemp').attr('onclick','$("#invoiceNo").focus();$( "#dialog-temperature" ).dialog( "close" );');
				$('.confirmYesTemp').attr('onclick','callQuestion2Petrol()');
				$( "#dialog-temperature" ).dialog( "open" );	
				
			
				
				
			}else if(Number($('#temperature').val())>=tempValArray[1]){
				
				callQuestion3Petrol();	
				$( "#dialog-temperature" ).dialog( "open" );
			}	
			

		 
	}else{
	
		
		if((Number($('#temperature').val())<tempValArray[1] && Number($('#temperature').val())>tempValArray[0]))
		{
			//alert("temp in range");
			//alert("question1"+question1);
			
			
			//*******
			$('.popMessagetemp').text(question1);
			$( "#dialog-temperature" ).dialog( "open" );	
		
			
			
		}else if(Number($('#temperature').val())>=tempValArray[1]){
			//alert("temp above range");
			//alert(question2);
			focus="temperature";
			$('.popMessagetemp').text(question2);
			$( "#dialog-temperature" ).dialog( "open" );		
		}	
		$('.confirmNoTemp').attr('onclick','$("#invoiceNo").focus();$( "#dialog-temperature" ).dialog( "close" );');
		$('.confirmYesTemp').attr('onclick','callNextPopup()');
	}
	
	
	
	
}
});
/*$('.yesButton').click(function(){	
	callNextPopup();
});
$('.noButton').click(function(){	
	$('#confirm-popup,#overlay-back').fadeOut(500);
	$('#invoiceNo').focus();
});*/

$('#articleRadio').click();
//for ibt receipt temperature check
if($('#orderStat').val()=='Received'){
	$("#temperature").attr("style","display:none;");
	
	
}else{
	if($("#tempFromService").val()!="" && $("#temperature").val()=="")
		$("#temperature").focus();
		else if($("#tempFromService").val()!="" ){
			
		}
		else
		$("#temperature").attr("disabled","disabled");
}

/*if($("#tempFromService").val()!="" && $("#temperature").val()=="")
$("#temperature").focus();
else if($("#tempFromService").val()!="" ){
	
}*/
/*else
$("#temperature").attr("disabled","disabled");*/
/*function callNextPopup(){

var question3="Items from temperature check vendors are to be rejected due to incorrect temperature. Is this correct? ";

$('.callCancel').attr('onclick','');
$('.prompt').show();		
		$('.message').hide();
		$('#popup-msg').text(question3);
		$('#confirm-popup-temperature,#overlay-back').fadeIn(500);


}*/




$( "#WCDate" ).click(function(){
	if($('#date').val()!='' && $('#date').val().split('/').length==3){
		var mydate=$('#date').val();
		var date1 = new Date();
		var parts = mydate.split('/');
		date1.setFullYear(parts[2], parts[1]-1, parts[0]); 
		if(date1.getDay()=='0'){
			date1.setTime(date1.getTime() + (86400000));
		}else if(date1.getDay()=='1'){
			date1.setTime(date1.getTime());
			}
		else if(date1.getDay()=='2'){
			date1.setTime(date1.getTime() - (86400000));
		}
		else if(date1.getDay()=='3'){
			date1.setTime(date1.getTime() - (86400000*2));
		}
		else if(date1.getDay()=='4'){
			date1.setTime(date1.getTime() - (86400000*3));
		}
		else if(date1.getDay()=='5'){
			date1.setTime(date1.getTime() - (86400000*4));
		}
		else if(date1.getDay()=='6'){
			date1.setTime(date1.getTime() - (86400000*5));
		}
		var newDate=date1.getDate();
		var newMonth=date1.getMonth()+1;
		if(newDate<10)
			{
			newDate='0'+newDate;
			}
		if(newMonth<10)
		{
			newMonth='0'+newMonth;
		}
		var date7=(newDate+"/"+(newMonth)+"/"+date1.getFullYear());
		$('#date').val(date7);
	}
	
});


$('#date').change(function ()
		{
	if($('#date').val().split('/').length==3)
	{
	var dateType=getRadioValue('searchByOptions');
	if(dateType=="WCDate"){
		if($('#date').val()!=''){
			var mydate=$('#date').val();
			var date1 = new Date();
			var parts = mydate.split('/');
			date1.setFullYear(parts[2], parts[1]-1, parts[0]); 
			if(date1.getDay()=='0'){
				date1.setTime(date1.getTime() + (86400000));
			}else if(date1.getDay()=='1'){
				date1.setTime(date1.getTime());
				}
			else if(date1.getDay()=='2'){
				date1.setTime(date1.getTime() - (86400000));
			}
			else if(date1.getDay()=='3'){
				date1.setTime(date1.getTime() - (86400000*2));
			}
			else if(date1.getDay()=='4'){
				date1.setTime(date1.getTime() - (86400000*3));
			}
			else if(date1.getDay()=='5'){
				date1.setTime(date1.getTime() - (86400000*4));
			}
			else if(date1.getDay()=='6'){
				date1.setTime(date1.getTime() - (86400000*5));
			}
			var newDate=date1.getDate();
			var newMonth=date1.getMonth()+1;
			if(newDate<10)
				{
				newDate='0'+newDate;
				}
			if(newMonth<10)
			{
				newMonth='0'+newMonth;
			}
			var date7=(newDate+"/"+(newMonth)+"/"+date1.getFullYear());
			$('#date').val(date7);
		}
		
	}
	
	}
			
});


$("#validateGst").blur(function(){
	$('#popup-msg').text('');
if($('#validateGst').val()!=$('#Gst').val())
{
	focus="validateGst";
	$('.prompt').hide();		$('.message').show();
	$('#popup-msg').text('GST details do not match. Please re-enter again.');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	//$('#validateGst,#Gst').val('');
	//$('#Gst').focus();
}
}); 
$("#validateInvoiceNo").blur(function(){
	focus="validateInvoiceNo";
if($('#invoiceNo').val()!=$('#validateInvoiceNo').val())
{$('.prompt').hide();		$('.message').show();
	$('#popup-msg').text('Invoice number details do not match. Please re-enter again.');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	//$('#validateInvoiceNo,#invoiceNo').val('');
	//$('#invoiceNo').focus();
}

}); 
$("#validateInvoiceTotal").blur(function(){
	focus="validateInvoiceTotal";
if($('#invoiceTotal').val()!=$('#validateInvoiceTotal').val())
{$('.prompt').hide();		$('.message').show();
	$('#popup-msg').text('Invoice total details do not match. Please re-enter again.');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	//$('#invoiceTotal,#validateInvoiceTotal').val('');
	//$('#invoiceTotal').focus();
}

}); 
$("#validateDock").blur(function(){
	focus="validateDock";
if($('#validateDock').val()!=$('#delDock').val())
{$('.prompt').hide();		$('.message').show();
	$('#popup-msg').text('Delivery docket details do not match. Please re-enter again.');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	//$('#validateDock,#delDock').val('');
	//$('#delDock').focus();
}


}); 

$("#invoiceTotal").blur(function(){

$('#validateInvoiceTotal').removeAttr('readonly');
}); 
$("#invoiceNo").blur(function(){

$('#validateInvoiceNo').removeAttr('readonly');

}); 
$("#Gst").blur(function(){

$('#validateGst').removeAttr('readonly');

}); 
$("#delDock").blur(function(){

$('#validateDock').removeAttr('readonly');

}); 

$(".updateBtn").click(function(){
	//var id="#"+this.id;
	$('.receive-field').removeAttr('readonly','readonly');
});
$(".editIcon").click(function(){
	var id="#"+this.id;
	$('.receive-field').attr('readonly','readonly');
	$(id).removeAttr('readonly');
	$(id).focus();
});

$("#invoiceTotal").focus(function(){
	focus="validateInvoiceNo";
if($("#invoiceNo").val()!="" && $('#validateInvoiceNo').val()=="")
{$('.prompt').hide();		$('.message').show();
	$('#popup-msg').text('Please re-enter invoice number for confirmation');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	$('#validateInvoiceTotal').val('');

	
	}

}); 
$("#invoiceNo").focus(function(){

$('#validateInvoiceNo').val('');

}); 
$("#Gst").focus(function(){
	focus="validateInvoiceTotal";
if($("#invoiceTotal").val()!="" && $('#validateInvoiceTotal').val()=="")
{$('.prompt').hide();		$('.message').show();
	$('#popup-msg').text('Please re-enter invoice total for confirmation');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	
	$('#validateGst').val('');
	}


}); 


$("#delDock").focus(function(){focus="validateGst";
if($("#Gst").val()!="" && $('#validateGst').val()=="")
{$('.prompt').hide();		$('.message').show();
	$('#popup-msg').text('Please re-enter GST for confirmation');
	$('#confirm-popup,#overlay-back').fadeIn(500);

	$('#validateDock').val('');
	}
}); 
$("#finalizeBtn").click(function(){
	$( "#flag" ).val('Finalize');
	if($("#delDock").val()!="" && $('#validateDock').val()=="")
	{$('.prompt').hide();		$('.message').show();focus="validateDock";
	$('#popup-msg').text('Please re-enter delivery docket for confirmation');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	}
	if(($('#Gst').val()=="" || $('#invoiceNo').val()=="" || $('#invoiceTotal').val()=="") && $('#delDock').val()=="")
	{
	focus="invoiceNo";
		$('.prompt').hide();		$('.message').show();
		$('#popup-msg').text('Please enter the mandatory fields before finalising');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	$('#validateDock').focus();	
	}
	else if($('#invoiceNo').val()!=$('#validateInvoiceNo').val())
	{$('.prompt').hide();		$('.message').show();
	$('#popup-msg').text('Invoice number details do not match. Please re-enter again.');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	//$('#validateInvoiceNo,#invoiceNo').val('');
	//$('#invoiceNo').focus();
	}
	else if($('#invoiceTotal').val()!=$('#validateInvoiceTotal').val())
	{$('.prompt').hide();		$('.message').show();
		$('#popup-msg').text('Invoice total details do not match. Please re-enter again.');
		$('#confirm-popup,#overlay-back').fadeIn(500);
		//$('#invoiceTotal,#validateInvoiceTotal').val('');
		//$('#invoiceTotal').focus();
	}
	else if($('#validateDock').val()!=$('#delDock').val())
	{$('.prompt').hide();		$('.message').show();
		$('#popup-msg').text('Delivery docket details do not match. Please re-enter again.');
		$('#confirm-popup,#overlay-back').fadeIn(500);
		//$('#validateDock,#delDock').val('');
		//$('#delDock').focus();
	}
	else if($('#validateGst').val()!=$('#Gst').val())
	{
		focus="validateGst";
		$('.prompt').hide();		$('.message').show();
		$('#popup-msg').text('GST details do not match. Please re-enter again.');
		$('#confirm-popup,#overlay-back').fadeIn(500);
		//$('#validateGst,#Gst').val('');
		//$('#Gst').focus();
	}
else if($("#Gst").val()!="" && $('#validateGst').val()=="")
{$('.prompt').hide();focus="validateGst";		$('.message').show();
$('#popup-msg').text('Please re-enter GST for confirmation');
$('#confirm-popup,#overlay-back').fadeIn(500);
$('#validateDock').val('');
}
else if($("#invoiceTotal").val()!="" && $('#validateInvoiceTotal').val()=="")
{$('.prompt').hide();focus="validateInvoiceTotal";			$('.message').show();
$('#popup-msg').text('Please re-enter invoice total for confirmation');
$('#confirm-popup,#overlay-back').fadeIn(500);
$('#validateGst').val('');
}
else if($("#invoiceNo").val()!="" && $('#validateInvoiceNo').val()=="")
{$('.prompt').hide();focus="validateInvoiceNo";		$('.message').show();
$('#popup-msg').text('Please re-enter invoice number for confirmation');
$('#confirm-popup,#overlay-back').fadeIn(500);
$('#validateInvoiceTotal').val('');
}
else if($('.list-content').html()==undefined)
	{
	$('.prompt').hide();		$('.message').show();
	$('#popup-msg').text('There is no article to be received. Cannot finalise the order');
	$('#confirm-popup,#overlay-back').fadeIn(500);
	$('#error-field').text('');
	}
else
	$('#receiveForm').submit();
}); 
if($("#disable").val()=='CLOSE')
{
	$('#cancel_pro').prop('disabled',true);
	$('#update_pro').prop('disabled',true);
	$('#search_pro').prop('disabled',true);
	$("#disable").val('');	
}
else if($("#disable").val()=='PARTIAL')
{
	$('#update_pro').removeProp('disabled');
	$('#cancel_pro').prop('disabled',true);
	$('#search_pro').removeProp('disabled');
	$('.display-none').show();
	$(".datepic").datepicker();
	$("#disable").val('');
}
else 
{
	$('#update_pro').removeProp('disabled');
	$('#cancel_pro').removeProp('disabled');
	$('#search_pro').removeProp('disabled');
	$('.display-none').show();
	$(".datepic").datepicker();
	$("#disable").val('');
}
$( "#userIcon1" ).click(function(){
	$( "#highlight" ).show();
	$( "#userIcon1" ).hide();
	$( "#userProfile" ).show();
	
});
$( "#highlight" ).click(function(){
	$( "#userIcon1" ).show();
	$( "#highlight" ).hide();
	$( "#userProfile" ).hide();
});
});

function validateFields(){
	$('#buttonVal').val('Finalise');
	var delDate = $('.delDate').text();
	var inputQty = $('.qtyInput').text();
	if (flag==true) {
		$('.prompt').hide();
		$('.message').show();
		$('#popup-msg').text('Some of the articles are missing delivery date or quantity. Please enter the details.');
		$('#confirm-popup,#overlay-back').fadeIn(500);
	}
	else{
		$('#manualOrderSearchSubmit').submit();
		}
	
}

function callFocus()
{
	var focusId="#"+focus;
	$(focusId).focus();
}

function validateReport()
{
	var currentdate = new Date();
	var splittedDate=$('#date').val().split('/');
	var wcdate=$('#wcdate').val().split('/');
	var splittedOne=wcdate[0]+wcdate[1]+wcdate[2];
	var splittedTwo=splittedDate[0]+splittedDate[1]+splittedDate[2];
	if(splittedDate=="" && wcdate=="")
		{
		$("#msg").text('Please enter date or w/c date');
		$("#reports").html('');
		}
	else if(wcdate!=""){

	if((wcdate[0] > 31 || wcdate[1] > 12 || wcdate[2] > 9999) || splittedOne.length!=8 || isNaN(splittedOne))
		{
		$("#msg").text('Please enter valid date');
		$("#reports").html('');
		}
	else if(currentdate.getFullYear()<wcdate[2] || (currentdate.getFullYear()==wcdate[2] && (currentdate.getMonth()+1)<wcdate[1]) || (currentdate.getFullYear()==wcdate[2] && (currentdate.getMonth()+1)==wcdate[1] && currentdate.getDate()<wcdate[0])){
		$("#msg").text("Please enter other than future dates");
	$("#reports").html('');}
	else{
		$("#msg").text("");
			$('#reportForm').submit();
	}
	}
	else if(splittedDate!="")
		{
		if((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999) || splittedTwo.length!=8 || isNaN(splittedTwo))
			{
			$("#msg").text('Please enter valid date');
			$("#reports").html('');
			}
		else if(currentdate.getFullYear()<splittedDate[2] || (currentdate.getFullYear()==splittedDate[2] && (currentdate.getMonth()+1)<splittedDate[1]) || (currentdate.getFullYear()==splittedDate[2] && (currentdate.getMonth()+1)==splittedDate[1] && currentdate.getDate()<splittedDate[0])){
			$("#msg").text("Please enter other than future dates");
		$("#reports").html('');}
		else{
			$("#msg").text("");
				$('#reportForm').submit();
		}
		}
	
}

function getRadioValue(name) {
    var group = document.getElementsByName(name);

    for (var i=0;i<group.length;i++) {
        if (group[i].checked) {
            return group[i].value;
        }
    }

    return '';
}


		





function validateReportEDGMS()
{
	var currentdate = new Date();
	var splittedDate=$('#date').val().split('/');
	var wcdate=$('#wcdate').val().split('/');
	var splittedOne=wcdate[0]+wcdate[1]+wcdate[2];
	var splittedTwo=splittedDate[0]+splittedDate[1]+splittedDate[2];
	if(splittedDate=="" && wcdate=="")
		{
		$("#msg").text('Please enter date or w/c date');
		$("#reports").html('');
		}
	else if(wcdate!=""){

	if((wcdate[0] > 31 || wcdate[1] > 12 || wcdate[2] > 9999) || splittedOne.length!=8 || isNaN(splittedOne))
		{
		$("#msg").text('Please enter valid date');
		$("#reports").html('');
		}
	else if(currentdate.getFullYear()<wcdate[2] || (currentdate.getFullYear()==wcdate[2] && (currentdate.getMonth()+1)<wcdate[1]) || (currentdate.getFullYear()==wcdate[2] && (currentdate.getMonth()+1)==wcdate[1] && currentdate.getDate()<wcdate[0])){
		$("#msg").text("Please enter other than future dates");
	$("#reports").html('');}
	else{
		$("#msg").text("");
			$('#reportForm').submit();
	}
	}
	else if(splittedDate!="")
		{
		if((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999) || splittedTwo.length!=8 || isNaN(splittedTwo))
			{
			$("#msg").text('Please enter valid date');
			$("#reports").html('');
			}
		else if(currentdate.getFullYear()<splittedDate[2] || (currentdate.getFullYear()==splittedDate[2] && (currentdate.getMonth()+1)<splittedDate[1]) || (currentdate.getFullYear()==splittedDate[2] && (currentdate.getMonth()+1)==splittedDate[1] && currentdate.getDate()<splittedDate[0])){
			$("#msg").text("Please enter other than future dates");
		$("#reports").html('');}
		else{
			$("#msg").text("");
				$('#reportForm').submit();
		}
		}
	
}
//for ibt receipt temperature check
function callNextPopup(){
	

	var question3="Items from temperature check vendors are to be rejected due to incorrect temperature. Is this correct? ";

	//$('.callCancel').attr('onclick','callCancelOrder();');
			
			$('.popMessagetemp').text(question3);
			$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog("close");$("#temperature").focus()');
			$('.confirmYesTemp').attr('onclick','callCancelOrder();');
			

	}
function callQuestion2Petrol(){
	

	var question2="Are products hard frozen?";
	
	//$('.callCancel').attr('onclick','callCancelOrder();');
			
			$('.popMessagetemp').text(question2);
			$('.confirmNoTemp').attr('onclick','callQuestion3Petrol();');
			$('.confirmYesTemp').attr('onclick','$( "#dialog-temperature" ).dialog( "close" );');
			

	}
function callQuestion3Petrol(){
	

	var question3="Temperature too high. Will entire order be rejected/cancelled?";
	
	//$('.callCancel').attr('onclick','callCancelOrder();');
			
			$('.popMessagetemp').text(question3);
			$('.confirmNoTemp').attr('onclick','callQuestion4Petrol()');
			$('.confirmYesTemp').attr('onclick','callQuestion5Petrol();');
			

	}

function temperatureOutOfRange(){
	

	var question='Please enter the temperature within the range "-99.9 to 99.9"';
	
	
			$('#alertBox').text(question);
			$( "#dialog-modal1" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal1" ).dialog( "close" );
				$("#temperature").val('');
				$("#temperature").focus();
				});;
			

	}

function callQuestion4Petrol(){
	

	var question4="Temperature too high.Refer to Food Safety Guide and receive rejected items as zero QTY. Ok?";
	
	$( "#dialog-temperature" ).dialog( "close" );
	$('#alertBox').text(question4);
	$( "#dialog-modal1" ).dialog( "open" );
	$('#okBtn').click(function(e){
		$( "#dialog-modal1" ).dialog( "close" );
	
		});;
	
	//$('.callCancel').attr('onclick','callCancelOrder();');
			
			
			

	}
function callQuestion5Petrol(){
	

	var question5="Entire load is being rejected/cancelled due to incorrect temperature. Is this correct?";
	 

	//$('.callCancel').attr('onclick','callCancelOrder();');
			
			$('.popMessagetemp').text(question5);
			$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog("close");');
			$('.confirmYesTemp').attr('onclick','callCancelOrder()');
			

	}
/*function callQuestion6Petrol(){
	

	var question6="Do you wish to receive  every item in this order as ZERO Qty?";
	
	 
	//$('.callCancel').attr('onclick','callCancelOrder();');
			
			$('.popMessagetemp').text(question6);
			$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog("close");');
			$('.confirmYesTemp').attr('onclick','callCancelOrder();');
			

	}*/

//for ibt receipt temperature check
	function callCancelOrder(){
		
		
			 $( "#dialog-temperature" ).dialog( "close" );
			 $.ajax({
					type : "GET",
					url : "cancelGoodsOrder.htm",
					beforeSend: function(){
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "index=" + "" + "&recQty=" + "" ,
					success : function(response) {
						//$('#tempValue').val(response);
						$('#statusImg').addClass('loading hideBlock');
						$('#statusImg').removeClass('loading');	
						if(response=="true"){
						$('#alertBox').text("Request for cancelling the Order is successfully submitted");
						$( "#dialog-modal1" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal1" ).dialog( "close" );
							$('#msg').val('');
							});;
							window.location.href= "../order/backToOrderDetails.htm";
						}
						else {
							$('#alertBox').text(response);
							$( "#dialog-modal1" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								$('#msg').val('');
								});;
								
							}
								
					},
					
				});
			
		 
		
	}
	//for ibt receipt temperature check
	function isNumberKeyTemp(evt)
    {
       var charCode = (evt.which) ? evt.which : event.keyCode;
       if ((charCode > 31 && (charCode< 48 || charCode >57))){
    	   if(charCode==45 || charCode==46){
    		   return true;
    	   }
    	   return false;
       }
          
		
       return true;
    }
	
	function validateInvoiceFields()
	{
		
	}
	
	function getDesiredPastDate(count) {
		var desiredDate = '';
		var thatDay = new Date(new Date().getTime() - 86400000 * count);
		var newDate = thatDay.getDate();
		var newMonth = thatDay.getMonth() + 1;

		if (newDate < 10) {
			newDate = '0' + newDate;
		}
		if (newMonth < 10) {
			newMonth = '0' + newMonth;
		}
		desiredDate = (newDate + "/" + (newMonth) + "/" + thatDay.getFullYear());
		return desiredDate;

	}

	function getDesiredFutureDate(count) {
		var desiredDate = '';
		var thatDay = new Date(new Date().getTime() + 86400000 * count);
		var newDate = thatDay.getDate();
		var newMonth = thatDay.getMonth() + 1;

		if (newDate < 10) {
			newDate = '0' + newDate;
		}
		if (newMonth < 10) {
			newMonth = '0' + newMonth;
		}
		desiredDate = (newDate + "/" + (newMonth) + "/" + thatDay.getFullYear());
		return desiredDate;

	}
	
	function getDesiredFutureDateInMMDDYYYY(count) {
		var desiredDate = '';
		var thatDay = new Date(new Date().getTime() + 86400000 * count);
		var newDate = thatDay.getDate();
		var newMonth = thatDay.getMonth() + 1;

		if (newDate < 10) {
			newDate = '0' + newDate;
		}
		if (newMonth < 10) {
			newMonth = '0' + newMonth;
		}
		desiredDate = (newMonth + "/" + newDate + "/" + thatDay.getFullYear());
		return desiredDate;

	}
	
	function getEmptyIfNull(value)
	{
		return (value != undefined && value != null) ? $.trim(value) : '';
	}
	
	function getNbspIfNull(value)
	{
		return (value != undefined && value != null && $.trim(value) != '') ? $.trim(value) : '&nbsp;';
	}
	
	//This method takes a number as input & returns 1 as  a default value for order multiple if input is null. 
	function getOneIfEmpty(value)
	{
		return (value != undefined && value != null && value != 0) ? value : 1;
	}
	

	function convertDateStringToMMDDYYYY(val)
	{
		var outDate = '';
		if(val != undefined && val != null && val != ''){
			var inDate = val.split('/');
			outDate = inDate[1]+'/'+inDate[0]+'/'+inDate[2];
		}
		
		return outDate;
	}

