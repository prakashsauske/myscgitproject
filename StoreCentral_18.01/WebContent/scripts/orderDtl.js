$(document).ready(function(){
	// Code to handle key press event
	$(".actionBtn, .secondaryActionBtn").bind('click', function(){
		$( "#dialog-modal-delivery" ).dialog("close");				
					
	});	
	
	$('.actionBtn, .secondaryActionBtn').keyup(function(e){
		if(e.which === 13){ //13 is the char code for Enter
			clickedId = this.id;
			if(clickedId == 'changeDelivery' || clickedId == 'cancelDelivery')
				$( "#dialog-modal-delivery" ).dialog("close");
		}
	});
	
	
	
	
	$(".inputDate").datepicker({
		zIndex:50
	});
	
	
	
	// Receive Order popup attributes
	$( "#dialog-modal-delivery" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 150,
		maxHeight: 600,
		width: 430
	});
	
	$("#dialog-modal-delivery").parent().addClass("popupWrapper");
	
	// code to open popup on Receive Order
	$( "#editdDate" ).click(function() {
					
		$( "#dialog-modal-delivery" ).dialog( "open" );				
	});

	
	$("#wizard").jWizard();
		
		$( "#dialog-modal" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 200,
			maxHeight: 600,
			width: 430
		});
	
	$("#dialog-modal").parent().addClass("popupWrapper");
	
	// code to open popup on Receive Order
	$( "#receiveOrder" ).click(function() {
					
		$( "#dialog-modal" ).dialog( "open" );				
	});
	
	
	 //checks radio buttons in Invoice Info
	$('#receiveAmount').click(function(){
		$("#invoiceEntry").removeClass('hideBlock');
		$("#docketEntry").addClass('hideBlock');
		$("#invoiceEntryConfirm").removeClass('hideBlock');
		$("#docketEntryConfirm").addClass('hideBlock');
		
	});
	
	$('#receiveDocket').click(function(){
		$("#docketEntry").removeClass('hideBlock');
		$("#invoiceEntry").addClass('hideBlock');
		$("#docketEntryConfirm").removeClass('hideBlock');
		$("#invoiceEntryConfirm").addClass('hideBlock');
	});
	
		
	
	
	//Checkbox DropDown functions
	
	
	$("#dropdownSelect").click(function(){ 
		if( $('#dropdown').hasClass('active')){
			$("#dropdown").removeClass('active');
		} else {
			$("#dropdown").addClass('active');
		}
	});
	
	
	 $('html').click(function() {
		$("#dropdown").removeClass('active');
	});

	$('#dropdownSelect').click(function(event){
	   event.stopPropagation();
	});
	
	
	
	
	
	
	$('.textbox').focus(function(){
		if ( $(this).val() == $(this).attr('defaultVal') ){
		  $(this).val('');
		  $(this).removeClass("textboxDefaultText"); 				 
		}
	});
	
	  $('.textbox').blur(function(){
		if ( $(this).val() == '' ){
		  $(this).val($(this).attr('defaultVal'));
		  $(this).addClass("textboxDefaultText"); 
		}
		});
		

	
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });

		
	
});

// code to initialise tree table
$(".treetable").treetable({
	expandable: true
});


// Code for Expand and Collapse all
	$('#expandAll').click(function(){
		$("#treetable").treetable('expandAll'); 
		$("#expandAll").addClass('hideBlock');
		$("#collapseAll").removeClass('hideBlock');
		$('#treetable tr:even').removeClass('expanded');
	});
	
	$('#collapseAll').click(function(){
		$("#treetable").treetable('collapseAll'); 
		$("#expandAll").removeClass('hideBlock');
		$("#collapseAll").addClass('hideBlock');
	});
	
// Code to expand collapse Delivery status more information

$("#moreDetails").click(function(){ 
	$("#deliveryStatusDetails").removeClass('hideBlock');
	$("#lessDetails").removeClass('hideBlock');
	$("#moreDetails").addClass('hideBlock');			
});


$("#lessDetails").click(function(){ 
	$("#deliveryStatusDetails").addClass('hideBlock');
	$("#lessDetails").addClass('hideBlock');
	$("#moreDetails").removeClass('hideBlock');			
});



$("#tabs").tabs();
$("#sections").tabs({ active: 2});


$("#tabs a.ui-tabs-anchor").click(function(){
	$("#FilterResult").css("display","none");
});


// Code to show GRN filter
$("#showFilterResult").click(function(){
		$('#tabs .ui-tabs-active').attr("tabindex", "-1");;
	 $('#tabs .ui-tabs-active').removeClass('ui-tabs-active ui-state-active');
	 
	 
	 $('#tabs .ui-tabs-panel').css("display","none");
	 $("#FilterResult").removeClass('hideBlock');
	 $("#FilterResult").css("display","block");
});





$(selector).pagination({
	items: 100,
	itemsOnPage: 10,
	cssStyle: 'compact-theme'
});			