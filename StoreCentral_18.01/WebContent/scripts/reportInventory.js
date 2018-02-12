var report_name = 'Report_Inventory_Table';
var report_title = '';
var totalRecords = '';
var requestParam = '';
var responseO = '';
var responseN = '';
var headerContent = '';	
var allInputs = '';
var sohChkBox = '';
var mplChkBox = '';
var facingsChkBox = '';
var supp_invalid_msg ='Invalid supplier.';
var enter_supp_msg = 'Please fill supplier field.';
var groupByValue = '';
$(function() {
	
	if($('#salesOrg').val()!=1060){
		$('#facings').addClass('hideBlock');
		$('.facings').addClass('hideBlock');
		$('#standard').removeClass('hideBlock');
		$('.standardMPL').removeClass('hideBlock');
	}else{
		$('#standard').addClass('hideBlock');
		$('.standardMPL').addClass('hideBlock');
		$('#facings').removeClass('hideBlock');
		$('.facings').removeClass('hideBlock');
	}
	
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });	/* Autocomplete Off */
			 
			document.forms[0].autocomplete="off";
			
			 $("#backBtn").click(function(e) {
				 window.location.href="../login/homepage.htm";
				});  
			 
			 //Disable cat,sub-cat,seg by default
			$("#catSelectAll").attr("disabled", true);
			$("#sCatSelectAll").attr("disabled", true);
			$("#segSelectAll").attr("disabled", true);
	
			$( "#dialog-email" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 100,
				maxHeight: 600,
				width: 450
			});
			
			
			$("#dialog-email").parent().addClass("popupWrapper");	
			
			$(".email").click(function(){ 
				$("#dialog-email" ).dialog("open");				
			});
			
			$("#dialog-email .popupActions label").click(function(){ 
				$("#dialog-email" ).dialog("close");				
			});
		
			$("#inventoryReportForm").find('#all').prop("checked", true);//defect_8549
		
			// Code for adding scorllers to the table
			
			var tableCols = 0;
			
			$("#tableData tbody tr").each(function(){
				var currCount = 0
				$(this).children("td").each(function(){
					currCount++;
					var colSpan = $(this).attr("colspan");
					if (colSpan > 0) {
						currCount = currCount + (colSpan - 1);
					}
					if (currCount > tableCols)
						tableCols = currCount;
					
					
				}); // next td
			}); // next tr
			
			
			var width = 0;
			if (tableCols < 12) {
				$("#scrollTable").removeClass('scrollTableContainer');
				$("#scrollWindow").removeClass('scrollWindow');
				$("#scrollBtns").addClass('hideBlock');
			}
			
			if (tableCols > 11){
				width = (tableCols * 45) - 100 ;				
					document.getElementById("scrollWindow").style.width=width + "px"; 
			
			}
		
			$('#next-column').click(function(event){
				event.preventDefault();
				$('.scrollTableContainer').animate({scrollLeft:'+=150'}, 'fast');
			});
			
			
			$('#previous-column').click(function(event){
				event.preventDefault();
				$('.scrollTableContainer').animate({scrollLeft:'-=150'}, 'fast');
			});
			
			//Code for accordion
			$("#accordion").accordion({
				header:"h3.mainAccordion",
				collapsible: true, 		
				heightStyle: "content" 
			});
			
			$("#generateReport").click(function(){
				$(".ContentTableWrapper").addClass('hideBlock'); //TO hide the table
				$("input[value='All']").prop('checked',true);
				if(buildReqParam()){
					$(".tableFooter").removeClass("hideBlock");
					/*if($("#pb").is(":checked")){//Show all to be availble in Include Pack Breakdown is checked
						$("#showAllOptions").removeClass("hideBlock");
					}else {
						$("#showAllOptions").addClass("hideBlock");
					}*/
					callReportService();
				}
			});
			
			initialiseTooltip();
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			/* Code for hierarchy  */
					
			$("input[name='departmentList']").click(function() {				
				$("#catDiv").find(".noSelection").addClass('hideBlock');
				$("#catDiv").find("ul").removeClass('hideBlock');
				$("#catDiv").find(".totalCount").removeClass('hideBlock');

				$("#subCatDiv").find(".noSelection").removeClass('hideBlock');
				$("#subCatDiv").find("ul").addClass('hideBlock');
				$("#subCatDiv").find(".totalCount").addClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');				

				$("#segDiv").find(".noSelection").removeClass('hideBlock');
				$("#segDiv").find("ul").addClass('hideBlock');
				$("#segDiv").find(".totalCount").addClass('hideBlock');	
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			
			$("input[name='categoryList']").click(function() {	
				$("#subCatDiv").find(".noSelection").addClass('hideBlock');
				$("#subCatDiv").find("ul").removeClass('hideBlock');
				$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeOut(300);

				$("#segDiv").find(".noSelection").removeClass('hideBlock');
				$("#segDiv").find("ul").addClass('hideBlock');
				$("#segDiv").find(".totalCount").addClass('hideBlock');	
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			$("input[name='subCatList']").click(function() {	
				$("#subCatDiv").find(".heirachyAction").fadeIn(400);
								
				$("#segDiv").find(".noSelection").addClass('hideBlock');
				$("#segDiv").find("ul").removeClass('hideBlock');
				$("#segDiv").find(".totalCount").removeClass('hideBlock');
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			$("input[name='segmentList']").click(function() {	
				$("#subCatDiv").find(".heirachyAction").fadeOut(300);
				$("#segDiv").find(".heirachyAction").fadeIn(400);
			});
			
			
			
			// code for table sorter 
			$(".actionRows").tablesorter();
			
			$(".actionRows th").click(function(){
				$('.actionRows tr td').each(function(){				
					$(this).removeClass("sorted");				
				});
				
				col=$(this).parent().children().index($(this));		
				
				$('.actionRows tr').each(function(){				
					$(this).find('td').eq(col).addClass("sorted");				
				});				
			});		
			
			// Code to show and hide article heirarchy
			
			$('#depH').click(function() {		
				if($(this).is(':checked'))
					$("#articleHierarchy").removeClass('hideBlock');
				else
					$("#articleHierarchy").addClass('hideBlock');
			});			
				
			//checks radio buttons for location and include
			$('#multiple').click(function(){
				$(".articleHierarchy").removeClass('hideBlock');
				$(".planoLoc").addClass('hideBlock');
				$(".articleList").addClass('hideBlock');
				$(".otherLoc").addClass('hideBlock');
				
			});	
						
			$('#single').click(function(){
				$(".articleList").removeClass('hideBlock');
				$(".planoLoc").addClass('hideBlock');
				$(".articleHierarchy").addClass('hideBlock');
				$(".otherLoc").addClass('hideBlock');
				$("#articleHierarchy").addClass('hideBlock');	
				$("#articleHierarchy").addClass('hideBlock');
			});
			
			$('#plano').click(function(){
				$(".planoLoc").removeClass('hideBlock');
				$(".articleHierarchy").addClass('hideBlock');
				$(".articleList").addClass('hideBlock');
				$(".otherLoc").addClass('hideBlock');
				$("#articleHierarchy").addClass('hideBlock');
			});
			
			$('#nonplano').click(function(){
				$(".otherLoc").removeClass('hideBlock');
				$(".planoLoc").addClass('hideBlock');
				$(".articleHierarchy").addClass('hideBlock');
				$(".articleList").addClass('hideBlock');	
				$("#articleHierarchy").addClass('hideBlock');
			});	
			
			
			// code for Source of supply selection
			$('#ssa').click(function(){
				$("#comboBoth").removeClass('hideBlock');
				
				$("#comboWarehouse").addClass('hideBlock');	
				$("#comboDirect").addClass('hideBlock');
			});
			
			$('#ssm').click(function(){
				$("#comboWarehouse").removeClass('hideBlock');
				
				$("#comboBoth").addClass('hideBlock');
				$("#comboDirect").addClass('hideBlock');
			});
			
			$('#sss').click(function(){
				$("#comboDirect").removeClass('hideBlock');
				
				$("#comboBoth").addClass('hideBlock');	
				$("#comboWarehouse").addClass('hideBlock');
			});
			
			// Code for calendar
			
			$("#dateFrom").datepicker({
				dateFormat: "dd/mm/yy",
				zIndex:50,
				onClose: function( selectedDate ) {
					$( "#dateTo" ).focus();
				}
				
			});
			
			$("#dateTo").datepicker({
				dateFormat: "dd/mm/yy",
				zIndex:50
				
			});
			
			$(".tooltip").tooltip({ 
				position: { 
					my: "left bottom", 
					at: "left top" 
				} 
			});
			
			$("#ds").click(function(){ 
				if( $('#pds').hasClass('active')){
					$("#pds").removeClass('active');
				} else {
					$("#pds").addClass('active');
				}
			});	
			
			$('html').click(function() {
					$(".selectDropdown").removeClass('active');
			});
			
			$('.selectDropdown').click(function(event){
				   event.stopPropagation();
			});
			
			populateDepartmentDropDown();
			populateSeasonalDropDown();

			populateDepartment("checkbox");	
			
			populateWarehouseList();
			
			//populateVendorList();

			//bindPrint();
			
			bindAllDeptCheckBox();
			
			$("#addParameter").on("click", ".addRow", function(){
				//$(this).remove();
				if($("#addParameter").find('.linkBtn').length<=4){
					$(this).removeClass("addRow");
					$(this).addClass("hideRow");
					$(this).html("Remove Row");	
					addRow();
				}else{
					$(this).addClass("addRow");
					$(this).removeClass("hideRow");
					$(this).html("Add More");	
					$.fn.showCustomMsg(['Maximum number of allowed "Additonal Criteria" is 5.'],information,'Inventory Report');
				}
			});
			
			$("#addParameter").on("click", ".hideRow", function(){
				$(this).parent().parent().parent().parent().remove();
				if($("#addParameter").find('#addCriteriaLabel').length == 0){
					$("<label for='addi' id='addCriteriaLabel'>Additional Criteria</label>").prependTo($("#addParameter").find(".parameterOptionsInputBox .parameterRow").eq(0));
				}
			});
			
			
				if($('#salesOrg').val() == '1060'){
					$("#addParameter").find(".parameterOptionsInputBox .parameterRow").find(".mplV").addClass('hideBlock');
					$("#addParameter").find(".parameterOptionsInputBox .parameterRow").find(".scap").addClass('hideBlock');
					$("#addParameter").find(".parameterOptionsInputBox .parameterRow").find(".facing").removeClass('hideBlock');
				}else{
					$("#addParameter").find(".parameterOptionsInputBox .parameterRow").find(".mplV").removeClass('hideBlock');
					$("#addParameter").find(".parameterOptionsInputBox .parameterRow").find(".scap").removeClass('hideBlock');
					$("#addParameter").find(".parameterOptionsInputBox .parameterRow").find(".facing").addClass('hideBlock');
				}
		
			//Filter by All/EA/MPK/CAR
			
			$(document).on('change', 'input[name=searchByMPLSC]:radio', function() {					
				var $tblhold = $("#reportContent");
				filterResponseByUom(responseO);
				totalRecords = responseN.length;
				var uom = $(".check-mpl-sc input[type=radio]:checked").val();
				loadReportContentTbl(responseN,$tblhold);
				$("input[value='"+uom+"']").prop('checked',true);
				toController();
			});
			
			//Close Button
			$("#closeLink").click(function(){
				$('#accordion').accordion({active : true });	
			});
			
			$('#nonSoldArt').onlyNumbers();
			$('.valueCrit').onlyNumbersIncNegative();
			
			$("#dialog-verifySupplier").dialog({
			    autoOpen: false,
			    modal: true,
			    resizable: false,
			    minHeight: 120,
			    maxHeight: 600,
			    width: 865
			  });
			
			$("#verifySupplier").click(function() {
				var errors = [];
				var $supplierElem =$('#supplier');
			    var vendorNo = $supplierElem.val().split('-')[0];
			    if (vendorNo != '') {
			    	vendorTextBox = $("#supplier");
			    	isVendorChecked =  $('#vendorCheck');
			    	getVendorLookup(vendorNo,vendorTextBox,isVendorChecked);
			    } else {
				    //$advanceLink.trigger('click');
				    errors.push(enter_supp_msg);
				    showAllErrors(errors);
				    $supplierElem.focus();
			    }
		  });
			
		$("#vendorPopUpGo").click(function() {
			 var $supplierElem = $('#vendorDesc');
			 var $messHoldElem = $('#error_div');
			 errors =[];
		    if ($supplierElem.val().trim() == '') {
		    	$messHoldElem.addClass('errorDiv');
		    	$messHoldElem.removeClass('warningMessage');
		    	$('#message-div,.paginationDivVerifyVendorPopup').addClass('hideBlock');
		      	//$('.error-div').removeClass('hideBlock').text(enter_supp_msg);
		      	$('.verifyVendorContent').parent().addClass('hideBlock');
		      	errors.push(enter_supp_msg);
		        showAllErrors(errors);
		      $supplierElem.focus();
		    } else {
		      getVendorLookup($supplierElem.val(),vendorTextBox,isVendorChecked);
		    }
		  });
		$('#nonSoldArt').addClass('tooltip').attr('title', "Maximum day range search is 28 days").tooltip({  position: {   my: "left center",  at: "right+10 center"   }});
});
		
function showAllErrors(content) {
	$.fn.showCustomMsg(content,error);
}	
		
		// Code for Auto Complete with select box		
 (function( $ ) {
	$.widget( "custom.combobox", {
_create: function() {
this.wrapper = $( "<span>" )
.addClass( "custom-combobox" )
.insertAfter( this.element );
this.element.hide();
this._createAutocomplete();
this._createShowAllButton();
},
_createAutocomplete: function() {
var selected = this.element.children( ":selected" ),
value = selected.val() ? selected.text() : "";
this.input = $( "<input>" )
.appendTo( this.wrapper )
.val( value )
.attr( "title", "")
.attr("placeholder", "Type or select" )
.addClass( "custom-combobox-input textbox defaultTextbox" )
.autocomplete({
delay: 0,
minLength: 0,
source: $.proxy( this, "_source" ),
open: function () {
	//console.log($(this));
    $(this).data("uiAutocomplete").menu.element.addClass("combobox-pos");
}
})
.tooltip({
tooltipClass: "ui-state-highlight"
});
this._on( this.input, {
autocompleteselect: function( event, ui ) {
ui.item.option.selected = true;
this._trigger( "select", event, {
item: ui.item.option
});
},
autocompletechange: "_removeIfInvalid"
});
},
_createShowAllButton: function() {
var input = this.input,
wasOpen = false;
$( "<a>" )
.attr( "tabIndex", -1 )
.attr( "title", "Show All Items" )

.appendTo( this.wrapper )
.button({
icons: {
primary: "ui-icon-triangle-1-s"
},
text: false
})
.removeClass( "ui-corner-all" )
.addClass( "custom-combobox-toggle" )
.mousedown(function() {
wasOpen = input.autocomplete( "widget" ).is( ":visible" );
})
.click(function() {
input.focus();
// Close if already visible
if ( wasOpen ) {
return;
}
// Pass empty string as value to search for, displaying all results
input.autocomplete( "search", "" );
});
},
_source: function( request, response ) {
var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
response( this.element.children( "option" ).map(function() {
var text = $( this ).text();
if ( this.value && ( !request.term || matcher.test(text) ) )
return {
label: text,
value: text,
option: this
};
}) );
},
_removeIfInvalid: function( event, ui ) {
// Selected an item, nothing to do
if ( ui.item ) {
return;
}
// Search for a match (case-insensitive)
var value = this.input.val(),
valueLowerCase = value.toLowerCase(),
valid = false;
this.element.children( "option" ).each(function() {
if ( $( this ).text().toLowerCase() === valueLowerCase ) {
this.selected = valid = true;
return false;
}
});
// Found a match, nothing to do
if ( valid ) {
return;
}
// Remove invalid value
this.input
.val( "" )
.attr( "title", "" )
.tooltip( "open" );
this.element.val( "" );
this._delay(function() {
this.input.tooltip( "close" ).attr( "title", "" );
}, 2500 );
this.input.autocomplete( "instance" ).term = "";
},
_destroy: function() {
this.wrapper.remove();
this.element.show();
}
});
})( jQuery );


 $(function() {
	$( ".combobox" ).combobox();

});
//Related to supplier verify option
 function getVendorLookup(vendor,from,toCheck,fromOrderOnReceipt) {
 	
 	  startLoading();
 	  var param = { "iv_vendor": vendor, "iv_session_id": "" };
 	  console.log(vendorLookupServiceURL + ' ' + JSON.stringify(param));
 	  errors = [];
 	  var $verifyPopup = $("#dialog-verifySupplier");
 	  $.post(vendorLookupServiceURL, JSON.stringify(param)).done(function(data) {
 	      if (data != undefined && data != null && data.length > 0 && data[0].vendor_no != undefined) {
 	        var response = data;
 	        var i = 1;
 	        var cnt = 1;
 	        var content = formVendorContent(response, vendor);
 	        var $paginatioDiv = '';
 	        var $supplierElem = $('#vendorDesc');
 			var $messHoldElem = $('#error_div');
 	        $('#popupDataDiv').html('').append(content);
 	        var recCnt = response.length;
 	        currentPageInPopup = 1;
 	        $paginatioDiv = $('.paginationDivVerifyVendorPopup');
 	        
 	        if (recCnt > 9) {
 	        	$paginatioDiv.removeClass('hideBlock').pagination({ 
 	        	  items: recCnt,  
 	        	  itemsOnPage: 9,  
 	        	  cssStyle: 'compact-theme', 
 	        	  currentPage: currentPageInPopup, 
 	        	  onPageClick: function(pageNumber) {
 	                getVendorsForPagination(pageNumber);
 	              }
 	            });
 	        } else {
 	        	$paginatioDiv.addClass('hideBlock');
 	        }
 	       
 	        $('.verifyVendorContent tbody tr').each(function() {
 	            $(this).attr('class', '');
 	            $(this).addClass('verifyContentInPopUp').addClass('pagNo-' + cnt);
 	            if (cnt > 1){ 
 	            	$(this).addClass('hideBlock'); 
 	            }
 	            if (i % 9 == 0) {
 	              cnt++;
 	            }
 	            i++;
 	          });
 	        if ($('#sizeCheck').val() == 0) {
 	          if ($verifyPopup.dialog("isOpen")) {
 	            $verifyPopup.dialog("close");
 	          }
 	          if ($verifyPopup.dialog("isOpen")) {
 	        	 $messHoldElem.addClass('warningMessage').removeClass('errorDiv');
 	            $('#message-div,.paginationDivVerifyVendorPopup').addClass('hideBlock');
 	            //$('.error-div').removeClass('hideBlock').text(supp_invalid_msg);
 	            errors.push(supp_invalid_msg);
 		        showAllErrors(errors);
 	          } else {
 	            errors.push(supp_invalid_msg);
 	            from.focus();
 	            showAllErrors(errors);
 	          }
 	        } else if ($('#sizeCheck').val() > 1) {
 	          if (!$verifyPopup.dialog("isOpen")) {
 	        	$supplierElem.val($('#supplier').val());
 	            $verifyPopup.parent().addClass("popupWrapper");
 	            $verifyPopup.dialog("open").removeClass('visible-hide');
 	            $('.verifyVendorContent').parent().removeClass('hideBlock');
 	            $("#searchWarning").addClass('hideBlock');
 	            $("#popupSearchVendor").removeClass('hideBlock');
 	            $messHoldElem.parent().parent().removeClass('warningMessage').removeClass('errorDiv');
 	            $('#message-div,.paginationDivVerifyVendorPopup').removeClass('hideBlock');
 	            $('.error-div').addClass('hideBlock');
 	          }
 	        } else {
 	          from.val($("#suppNo0").text() + "-" + $("#suppName0").text());
 	          toCheck.val(true);
 	          if(fromOrderOnReceipt != undefined && fromOrderOnReceipt)
 	        	  {
 	        	  loadDraftOOR($("#suppNo0").text());
 					lockSupplier({"supplier":$("#suppNo0").text(),"supplier_name":$("#suppName0").text()});
 					$('#oor_viewModeTable').removeClass('hideBlock');
 	        	  }
 	          $verifyPopup.dialog("close");
 	        }
 	        bindVendorSelect(from,toCheck,fromOrderOnReceipt);
 	      } else {
 	        if ($verifyPopup.dialog("isOpen")) {
 	          //$('#message-div').parent().parent().addClass('errorDiv').removeClass('warningMessage');
 	          $('#message-div,.paginationDivVerifyVendorPopup').addClass('hideBlock');
 	          //$('.error-div').removeClass('hideBlock').text(supp_invalid_msg);
 	          $('.verifyVendorContent').parent().addClass('hideBlock');
 	          errors.push(supp_invalid_msg);
 		      showAllErrors(errors);
 	        } else {
 	        	errors.push(supp_invalid_msg);
 	            showAllErrors(errors);
 	        }
 	      }
 	      stopLoading();
 	    });
 	}
 function getVendorsForPagination(pageNo) {
	  currentPageInPopup = pageNo;
	  var pageClass = 'pagNo-' + pageNo;
	  $('.verifyContentInPopUp').filter(function() {
	      if ($(this).hasClass(pageClass)) { $(this).removeClass('hideBlock');}
	      else { $(this).addClass('hideBlock'); }
	    });
	}
 function formVendorContent(list, text) {
	  var content = '';
	  var rowContent = '';
	  content += '<div class="popupSearchWrapper" id="error_div">';
	  content += '<div class="tableInfo "style="display: inline-block;float: left;"><h4 id="message-div">Total <strong>' + list.length + '</strong> results found for <strong class="searchString">"' + text + '"</strong>. Please select a vendor from the list below.</h4></div>' + '<h4 class="error-div"></h4>';
	  content += '<div class="paginationWrapper  paginationDivVerifyVendorPopup paginationDiv hideBlock" id="paginationDiv1">' + '<div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>' + '</div></div></div><!-- End of search wrapper --></div>';
	  content += '<div class="ContentTableWrapper"><table class="ContentTable verifyVendorContent" cellspacing="0">' + '<thead><tr><th>Vendor #</th><th>Description</th><th>Phone Number</th><th>Fax Number</th>' + '<th>Suburb</th><th>State</th><th>Lead Time</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead><tbody>';
	  if (list != null && list != undefined && list.length > 0) {
	    for (var i = 0; i < list.length; i++) {
	      rowContent += '<tr><td class="pagNo-';
	      if (i > 9) rowContent += 'hideBlock';
	      rowContent += '" id="suppNo' + i + '">' + list[i].vendor_no + '</td><td id="suppName' + i + '">' + list[i].vendor_name + '</td><td>' + list[i].telephone + '</td><td>' + list[i].fax + '</td><td>' + list[i].city + '</td><td>' + list[i].region + '</td><td>' + (list[i].lead_time != null && list[i].lead_time != undefined ? list[i].lead_time : '') + '</td><td class="sorted lastColumn"><label class="linkBtn linkBtn1" id="' + i + '"><label class="selectItem">Select</label></label></td></tr>';
	    }
	  }
	  content += rowContent + '</tbody></table>' + '<div class="tableFooter"><div class="paginationWrapper bottomPagination  paginationDivVerifyVendorPopup paginationDiv hideBlock"' + 'id="paginationDiv2"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>' + '</div></div></div>' + '</div><input type="hidden" value="' + list.length + '" id="sizeCheck" />';
	  return content;
}
 function bindVendorSelect(from,toCheck,fromOrderOnReceipt) {
	  $(".linkBtn1").click(function() {
	      //clearAllErrors();
	      var id = $(this).attr("id");
	      from.val($("#suppNo" + id + "").text() + "-" + $("#suppName" + id + "").text());
	     toCheck.val(true);
	     if(fromOrderOnReceipt != undefined && fromOrderOnReceipt)
	     {
	    	 loadDraftOOR($("#suppNo" + id + "").text());
			lockSupplier({"supplier":$("#suppNo" + id + "").text(),"supplier_name":$("#suppName" + id + "").text()});
			$('#oor_viewModeTable').removeClass('hideBlock');
	     }
	      if ($("#dialog-verifySupplier").dialog("isOpen")) { $("#dialog-verifySupplier").dialog("close"); }
	    });
}
//Related to supplier verify option-ends
 function populateWarehouseList() {
	// service call to get warehouse list
	startLoading();
	var param = {
		"iv_site" : $('#posSite').val(),
		"iv_session_id" : ""
	};
	console.log(warehouseLookupServiceURL + ' ' + JSON.stringify(param));
	$.post(warehouseLookupServiceURL, JSON.stringify(param)).done(
			function(data) {
				var content = '';
				content += '<option value="0">Select</option>';
				for ( var i = 0; i < data.length; i++) {
					content += '<option value="' + data[i].site_no + '">' + data[i].site_no
							+ ' | ' + data[i].site_desc + '</option>';
				}
				//$('#warehouseID').html('');
				$('#warehouseID').append(content);
				stopLoading();
			});
}
 function populateVendorList() {
		// service call to get warehouse list
		startLoading();
		var param = {
			"iv_site" 		: $('#posSite').val(),
			"iv_session_id" : "",
			"iv_vendor"		: ""
				
		};
		console.log(vendorLookupServiceURL + ' ' + JSON.stringify(param));
		$.post(vendorLookupServiceURL, JSON.stringify(param)).done(
				function(data) {
					console.log(data);
					var content = '';
					if(data != undefined && data != '' && data.length >0){
						content += '<option value="0">Select</option>';
						for ( var i = 0; i < data.length; i++) {
							content += '<option value="' + data[i].vendor_no + '">' + data[i].vendor_no
									+ ' | ' + data[i].vendor_name + '</option>';
						}
						//$('#warehouseID').html('');
						$('#vendorID').append(content);
					}					
					stopLoading();
				});
	}
function addRow(){		
		//$("#addActionBtn").addClass('hideBlock');
	if($('#salesOrg').val() == '1060'){
		$("#newParameter").find(".parameterOptionsInputBox .parameterRow").find(".mplV").addClass('hideBlock');
		$("#newParameter").find(".parameterOptionsInputBox .parameterRow").find(".scap").addClass('hideBlock');
		$("#newParameter").find(".parameterOptionsInputBox .parameterRow").find(".facing").removeClass('hideBlock');
	}else{
		$("#newParameter").find(".parameterOptionsInputBox .parameterRow").find(".mplV").removeClass('hideBlock');
		$("#newParameter").find(".parameterOptionsInputBox .parameterRow").find(".scap").removeClass('hideBlock');
		$("#newParameter").find(".parameterOptionsInputBox .parameterRow").find(".facing").addClass('hideBlock');
	}

		$("#newParameter").find(".parameterOptionsInputBox").removeClass('hideBlock');
		$("#addParameter").append($("#newParameter").html());
		$("#newParameter").find(".parameterOptionsInputBox").addClass('hideBlock');
		$('.valueCrit').onlyNumbersIncNegative();
	}
 /**
  * Builds request parameters
 * @returns
 */
function buildReqParam(){
		var deptArray = new Array();
		var catArray = new Array();
		var subCatArray = new Array();
		var segArray = new Array();
		var addCritArray =  [];
		headerContent = '';	
		var supplierList = '';
		allInputs = '';
		var criteriaCheck=true;
		var seasonCode = '';

		//INC02015608
		if($('#inventoryReportForm .custom-combobox-input').val().trim()!=''){
			$('.seasonalActivity').find('option').each(function(){ 
				if($(this).prop("value") == $('.seasonalActivity').val()){
					console.log("selected season code"+$(this).attr("seasoncode"));
					seasonCode = $(this).attr("seasoncode");
				}
			});
		}
		$(".parameterOptionsInputBox").each(function(){			
			if ($(this).find(".filter").val() != undefined
					&& $(this).find(".filter").val() != "Select filter") {
				addCritArray.push({ iv_field: $(this).find(".filter").val(),
					iv_criteria: $(this).find(".criteria").val(),iv_value:$(this).find(".valueCrit").val() });
			}
			if(($(this).find(".filter").val() == undefined
					|| $(this).find(".filter").val() == "Select filter") && $(this).find(".valueCrit").val()!="" ){
				$.fn.showCustomMsg(['Please enter filter Criteria.'],error,reportName);
				 criteriaCheck=false;
			}
		});
		var fieldValues = ["SOH", "DAYS_SOH", "MPL","SHELF_CAPACITY","INVENTORY_VALUE"];
		if(criteriaCheck){
		var valid = validateAddCrit(fieldValues,addCritArray,'Inventory Report');
}
		var nonSoldArt = $("#nonSoldArt").val();
		if(nonSoldArt > 90){
			$.fn.showCustomMsg(['Include articles not sold within past days value cannot be greater than 90.'],error,'Inventory Report');
			valid = false;
		}
		
		
		if(valid){
			sohChkBox = $('#all').is(':checked')?'Y':'N';
			if($('#salesOrg').val()!=1060){
				mplChkBox = $('#standard').is(':checked')?'Y':'N';	
			}else{
				facingsChkBox = $('#facings').is(':checked')?'Y':'N';
			}
			var seaAct = $("#sa").val();
			var sos = $(".parameterOptionsRadio input[type=radio]:checked").val();			
			
			var deleted = $('#del').is(':checked')?'Y':'N';	
			var onPromo = $('#onp').is(':checked')?'Y':'N';	
			var packBrkDwn = $('#pb').is(':checked')?'Y':'N';	
			var nonPerpInv = $('#pi').is(':checked')?'Y':'N';	
			
			var soldArt = $("#soldArt").val();
			
			if(sos == '2'){
				supplierList = $("#warehouseID").val();
			}else if(sos == '1'){
				supplierList = $('#supplier').val().split('-')[0];
			}
			
			if($("#depH").is(':checked')){	//If Select multiple dept or sub cat is checked
			
				//Department selection
				$( "input[name='departmentList']" ).each(function(){
					if($(this).is(':checked')){
						deptArray[deptArray.length] = $(this).val();
					}
				});
				
				//Category
				$( "input[name='category']" ).each(function(){
					if($(this).is(':checked')){
						catArray[catArray.length] = $(this).val();
						var index = deptArray.indexOf($(this).attr('depid'));
						if(index > -1){
							deptArray.splice(index, 1);
						}
					}
				});
				
				//Sub Category
				$( "input[name='subCat']" ).each(function(){
					if($(this).is(':checked')){
						subCatArray[subCatArray.length] = $(this).val();
						var index = catArray.indexOf($(this).attr('catid'));
						if(index > -1){
							catArray.splice(index, 1);
						}
					}
				});
			
								
				//Segment
				$( "input[name='segmentList']" ).each(function(){
					if($(this).is(':checked')){
						segArray[segArray.length] = $(this).val();
						var index = subCatArray.indexOf($(this).attr('scatid'));
						if(index > -1){
							subCatArray.splice(index, 1);
						}
					}
				});
			}else{				
				if($("#allDeptChkBox").is(":checked")){
					deptArray[deptArray.length] = "ALL";
				}else{
					$('#depDropDwnList').find("input[type=checkbox]:checked").each ( function() {
						if($(this).attr('id') != "allDeptChkBox"){
							deptArray[deptArray.length] = $(this).val();
						}
					});
				}
			}
			if(segArray.length > 0){
				groupByValue = "SEG";
			}else if(subCatArray.length > 0){
				groupByValue = "SUB_CAT";
			}else if(catArray.length > 0){
				groupByValue = "CAT";
			}else if(deptArray.length > 0){
				groupByValue = "DEPT";
			}
			if(true){
				requestParam = {
						"iv_soh_flag"		:sohChkBox,
						"iv_mpl_sc_flag"	:mplChkBox,
						"iv_facing_flag"	:facingsChkBox,	
						"iv_dept_list"		:deptArray.join(","),
						"iv_cat_list"       :catArray.join(","),
						"iv_sub_cat_list"   :subCatArray.join(","),
						"iv_seg_list"       :segArray.join(","),
						"iv_season_code"	:(seasonCode == undefined || seasonCode == null)?'':seasonCode,
						"iv_season_year"	:'',
						"iv_src_of_sup"		:sos,
						"iv_del_article"	:deleted,
						"iv_on_promo"		:onPromo,
						"iv_pack_brk_down"	:packBrkDwn,
						"iv_perpetual_flag"	:nonPerpInv,
						"iv_day_no"			:nonSoldArt,
						"addl_crit_info"	:addCritArray,
						"iv_supplier_list"  :supplierList
						};
			}
			
			//Frames Header for Print
			var deptNamePrint = '';
			var includesValueOfPrint = '';
			var seaActPrint = '';
			var sosPrint = '';
			var addCriPrint = '';
			var displaysArticlesPrint = '';
			var nonSoldArtPrint = '';
			deptArray = new Array();
			
			if(sos == 1){
				sos = "Direct Vendor";
			}else if(sos == 2){
				sos = "Warehouse";
			}else if(sos == ''){
				sos = "All";
			}
			//Includes values of
			if(sohChkBox == "Y"){
				includesValueOfPrint = "Displays Values of: "+ $('#all').val();
			}
			if(mplChkBox == "Y"){
				if(includesValueOfPrint == ''){
					includesValueOfPrint = "Displays Values of: "+ $('#standard').val();
				}else{
					includesValueOfPrint += ","+$('#standard').val();
				}									
			}
			if(facingsChkBox == "Y"){
				if(includesValueOfPrint == ''){
					includesValueOfPrint = "Displays Values of: "+ $('#facings').val();
				}else{
					includesValueOfPrint += ","+$('#facings').val();
				}					
			}
			//Department
			deptArray = [];
			if($("#depH").is(':checked')){
				$( "input[name='departmentList']" ).each(function(){
					if($(this).is(':checked')){
						deptArray[deptArray.length] = $(this).parent().find('.deptLbl').html();
					}
				});
			}else{
				if($("#allDeptChkBox").is(":checked")){
					deptArray[deptArray.length] = "ALL";
				}else{
					$('#depDropDwnList').find("input[type=checkbox]:checked").each ( function() {
						if($(this).attr('id') != "allDeptChkBox"){
							deptArray[deptArray.length] = $(this).parent().find('.dropdownLabel').html();
						}
					});
				}
			}
			if(deptArray.length > 0){
				deptNamePrint = "Department: "+deptArray.join(",");
			}
			//Seasonal Activity
			if(seaAct.length > 0){
				seaActPrint = "Seasonal Activity: "+seaAct;
			}
			//Source of Supply
			if(sos.length > 0){
				sosPrint = "Source of Supply: " + sos;
			}
			if(addCritArray.length > 0){
				addCriPrint = "Additional Criteria: ";
				for(var i=0;i<addCritArray.length;i++){
					addCriPrint += addCritArray[i].iv_field +" "+ addCritArray[i].iv_criteria +" "+addCritArray[i].iv_value;
				}
			}			
			
			if(deleted == "Y"){
				displaysArticlesPrint = "Displays Articles of: "+$('#del').val();
			}
			if(onPromo == "Y"){
				if(displaysArticlesPrint == ''){
					displaysArticlesPrint = "Displays Articles of: "+ $('#onp').val();
				}else{
					displaysArticlesPrint += ","+$('#onp').val();
				}	
			}
			if(packBrkDwn == "Y"){
				if(displaysArticlesPrint == ''){
					displaysArticlesPrint = "Displays Articles of: "+ $('#pb').val();
				}else{
					displaysArticlesPrint += ","+$('#pb').val();
				}	
			}
			if(nonPerpInv == "Y"){
				if(displaysArticlesPrint == ''){
					displaysArticlesPrint = "Displays Articles of: "+ $('#pi').val();
				}else{
					displaysArticlesPrint += ","+$('#pi').val();
				}	
			}
			//Non sold articles within past days
			if(nonSoldArt > 0){
				nonSoldArtPrint = "Includes articles not sold within past "+nonSoldArt+" days";
			}
			
			
			if(includesValueOfPrint.length > 0){
				allInputs = includesValueOfPrint;
			}
			if(allInputs.length > 0 && deptNamePrint.length > 0){
				allInputs += " | "+deptNamePrint;
			}else if(deptNamePrint.length > 0){
				allInputs += deptNamePrint;
			}
			if(allInputs.length > 0 && seaActPrint.length > 0){
				allInputs += " | "+seaActPrint;
			}else if(seaActPrint.length > 0){
				allInputs += seaActPrint;
			}
			if(allInputs.length > 0 && sosPrint.length > 0){
				allInputs += " | "+sosPrint;
			}else if(sosPrint.length > 0){
				allInputs += sosPrint;
			}
			if(allInputs.length > 0 && addCriPrint.length > 0){
				allInputs += " | "+addCriPrint;
			}else if(addCriPrint.length > 0){
				allInputs += addCriPrint;
			}
			if(allInputs.length > 0 && displaysArticlesPrint.length > 0){
				allInputs += " | "+displaysArticlesPrint;
			}else if(displaysArticlesPrint.length > 0){
				allInputs += displaysArticlesPrint;
			}
			if(allInputs.length > 0 && nonSoldArtPrint.length > 0){
				allInputs += " | "+nonSoldArtPrint;
			}else if(nonSoldArtPrint.length > 0){
				allInputs += nonSoldArtPrint;
			}
			
			
			
			//console.log('Inventory Report Request- '+requestParam);		
		}else{
			//$.fn.showCustomMsg(['Invalid additional criterias selected.'],error,'Inventory Report');
		}
		//TODO to remove this hardcoded input
		/*requestParam = {
		    "iv_soh_flag":"N",
		    "iv_mpl_sc_flag":"Y",
		    "iv_facing_flag":"Y",
		    "iv_dept_list":"10",
		    "iv_cat_list":"",
		    "iv_sub_cat_list":"",
		    "iv_seg_list":"",
		    "iv_season_code":"",
		    "iv_season_year":"",
		    "iv_src_of_sup":"",
		    "iv_del_article":"",
		    "iv_on_promo":"",
		    "iv_pack_brk_down":"",
		    "iv_perpetual_flag":"",
		    "iv_day_no":"",
		    "addl_crit_info":[
			{
			    "iv_field":"",
			    "iv_criteria":"",
			    "iv_value":""
			}
		    ]
		};*/
		return valid;
		//return valid; //TODO to uncomment
	}
			
/**
 * Calls inventory report service
 * @param recvParam
 */
function callReportService(){	
	console.log(reportInventoryUrl + ' ' + JSON.stringify(requestParam));		
	$.ajax({
	    type: "POST",
	    url: reportInventoryUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  //responseO = [{"msg":null,"article_no":"256983","article_desc":"Vanilla Creme Crown","uom":"EA","pack_size":1,"om":1,"soh":"0","mpl":0,"shelf_capacity":0,"facings":0,"days_soh":"19.22222222","sit":0,"soo":0,"std_sell_price":2.4,"inv_sales_val":0,"last_sold_date":"No sales in last 28 days","del_ind":"N","pbd_ind":"N","pi_flag":"Y","promo_flag":"Y","dept_name":"BAKEHOUSE","cat_name":"INSTORE BAKERY","sub_cat_name":"INSTORE MANUF CAKE/PASTRY","seg_name":"ROLL UNIT DANISH AND BROWNIE","grp_col_key":"dept_name","group_key":"BAKEHOUSE"}];
		  responseO = response;
		  //console.log(JSON.stringify(responseO));	
		  if(responseO != undefined && responseO.length > 0 && responseO[0].article_no != undefined ){
				$(".ContentTableWrapper").removeClass('hideBlock'); 
				$('#accordion').accordion({active : true });
				var $tblhold = $("#reportContent");
				filterResponseByUom(responseO);
				totalRecords = responseN.length;
				var uom = $(".check-mpl-sc input[type=radio]:checked").val();
				loadReportContentTbl(responseN,$tblhold);
				$("input[value='"+uom+"']").prop('checked',true);
				//$("#"+report_name+'_head').remove();//For Css alignment
				//$("#"+report_name+'_foot').remove();//For css alignment
				toController();
			} else {
				if(responseO != undefined && responseO.length <= 0 ){
					$.fn.showCustomMsg(['Sorry, No records found.'],success,'Inventory Report');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Inventory Report');
				}
				stopLoading();
			}	
	  }).fail(function() {
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Inventory Report');
		  stopLoading();
	  }).always(function() {
		 
	  });
}
function filterResponseByUom(response){
	var responseArray = [];
	for ( var i = 0; i < response.length; i++) {		
		var uom = $(".check-mpl-sc input[type=radio]:checked").val();
		if(uom == "EA"){
				if(response[i].uom == "EA"){
					responseArray.push(response[i]);
				}		
		}else if(uom == "MPK"){
			if(response[i].uom == "MPK"){
				responseArray.push(response[i]);
			}			
		}else if(uom == "CAR"){
			if(response[i].uom == "CAR"){
				responseArray.push(response[i]);
			}	
		}else if(uom == "CA1"){
			if(response[i].uom == "CA1"){
				responseArray.push(response[i]);
			}	
		}else{//All
			responseArray.push(response[i]);
		}		
	}
	responseN = responseArray;	
	//console.log("Reframed responseafter filtering by UOM");
	//console.log(responseN);
}
function toController(){
	var reportResultArray = [];			
	reportResultArray = $('#'+report_name+'_table').data('confObj').content;
	callInventoryJasperPrint(reportResultArray); 
}

/**
 * Binds generate report click event
 * @param response
 */
function bindPrint(){
	$("#printReport").unbind('click');
	$("#printReport").on('click',function() {
		$('#inventoryReportForm').attr("action", "downloadInventoryReportPdf.pdf");
		$('#inventoryReportForm').attr('target','_blank');
		$('#inventoryReportForm').attr('method','get');
		$('#inventoryReportForm').submit();

		
		/*frameReport();
		//document
		var a = window.open();
		$("#printDataForReport").show();
		a.document
				.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
		a.document
				.write(document
						.getElementById('printDataForReport').innerHTML);

		$("#printDataForReport").hide();
		a.focus();
		// call print
		$(a).ready(function(){
			 //a.close();   
			setTimeout(function(){$(document).unbind('click');
			doc=a;
			$(document).click(function(){
				doc.close();
				doc='';
				$(document).unbind('click');
			});a.print();},1000);
			 return true;
		    });		*/
	});
}
/**
 * Sets the report content area and the table
 * @param data
 * @param $tblhold
 */
function loadReportContentTbl(data,$tblhold){
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+$selectedTab.attr('aria-controls')) : $tblhold;
	var  confObj= (new tblReport(report_name,report_title,data));
	$tblhold.loadtbl(confObj);
	$tblhold.find('thead tr th').not('.noSort').click(function(){
		toController();
	});
	$("#"+report_name+"_head").before('<label id="printReport" class=" printButtonFix actionBtn"><label class="print"><a target="_blank">Print</a></label></label>');
	$("#"+report_name+"_head").css("padding-bottom","5px");//to hav some gap b/w print button
	if($("#pb").is(":checked")){//Show all to be availble in Include Pack Breakdown is checked
		$(".showAllOptions").clone().insertBefore($("#"+report_name+"_table"));
		$(".showAllOptions").eq(1).removeClass("hideBlock");
	}
	$("<h4>Total <strong>"+totalRecords+"</strong> articles found </h4>").insertBefore($("#"+report_name+"_head").find(".sectionTitle").eq(0));
	$("#action_btn_wrap_"+report_name).remove();//clear group by related div
	$("#grou_cont_"+report_name).remove();//clear group by related div
	bindPrint();		
}

/**
 * Cofiguration to generate the report table
 * @param table_name
 * @param table_title
 * @param data
 * @returns {tblReport}
 */
function tblReport(table_name,table_title,data){
	this.option = 'build';
	if(sohChkBox == 'Y'){
		if(mplChkBox == 'Y'){
			if(facingsChkBox == 'Y'){
				//soh,mpl&facings
				this.key = ['article_no','article_desc','uom','om','newSoh','mpl','shelf_capacity','facings','days_soh','sit','soo','std_sell_price','inv_sales_val','last_sold_date'];
				displayFacings = true;displaySOH = true;displayMPL = true;
			}else{
				//soh & mpl
				this.key = ['article_no','article_desc','uom','om','newSoh','mpl','shelf_capacity','days_soh','sit','soo','std_sell_price','inv_sales_val','last_sold_date'];
				displayFacings = false;displaySOH = true;displayMPL = true;
			}
		}else if(facingsChkBox == 'Y'){
			//soh & facings
			this.key = ['article_no','article_desc','uom','om','newSoh','facings','days_soh','sit','soo','std_sell_price','inv_sales_val','last_sold_date'];
			displayFacings = true;displaySOH = true;displayMPL = false;
		}else{
			//soh
			this.key = ['article_no','article_desc','uom','om','newSoh','days_soh','sit','soo','std_sell_price','inv_sales_val','last_sold_date'];
			displayFacings = false;displaySOH = true;displayMPL = false;
		}
	}else if(mplChkBox == 'Y'){
		if(facingsChkBox == 'Y'){
			//mpl&facings
			this.key = ['article_no','article_desc','uom','om','mpl','shelf_capacity','facings','days_soh','sit','soo','std_sell_price','inv_sales_val','last_sold_date'];
			displayFacings = true;displaySOH = false;displayMPL = true;
		}else{
			// mpl
			this.key = ['article_no','article_desc','uom','om','mpl','shelf_capacity','days_soh','sit','soo','std_sell_price','inv_sales_val','last_sold_date'];
			displayFacings = false;displaySOH = false;displayMPL = true;
		}
	}else if(facingsChkBox == 'Y'){
		//facings
		this.key = ['article_no','article_desc','uom','om','facings','days_soh','sit','soo','std_sell_price','inv_sales_val','last_sold_date'];
		displayFacings = true;displaySOH = false;displayMPL = false;
	}else{
		//no soh,mpl,facings
		this.key = ['article_no','article_desc','uom','om','days_soh','sit','soo','std_sell_price','inv_sales_val','last_sold_date'];
		displayFacings = false;displaySOH = false;displayMPL = false;
	}
	//this.key = ['article_no','article_desc','uom','om','newSoh','mpl','shelf_capacity','facings','days_soh','sit','soo','std_sell_price','inv_sales_val','last_sold_date'];
	this.table_name = table_name;
	this.table_title = table_title;
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {article_no:'Article',article_desc:'Description',uom:'UOM',om:'OM',newSoh:'SOH',mpl:'MPL',shelf_capacity:'Capacity',facings:'Facings',days_soh:'Days on Hand',sit:'SIT',soo:'SOO',std_sell_price:'Std.Sell</br>Price ($)',inv_sales_val:'Inventory</br>Sales</br>Value ($)',last_sold_date:'Last</br>Sold</br>Date'},
	this.header_td_label = {newSoh:'SOH'},
	this.header_data_type = {article_no:'number',article_desc:'char',uom:'number',om:'number',newSoh:'number',mpl:'number',shelf_capacity:'number',facings:'number',days_soh:'number',sit:'number',soo:'number',std_sell_price:'number',inv_sales_val:'number',last_sold_date:'date'},
	this.header_row_type = {article_no:'main',article_desc:'main',uom:'main',om:'main',newSoh:'main',mpl:'main',shelf_capacity:'main',facings:'main',days_soh:'main',sit:'main',soo:'main',std_sell_price:'main',inv_sales_val:'main',last_sold_date:'main'},
	this.header_class = {article_no:'leftValue',article_desc:'leftValue',uom:'centerValue',om:'centerValue',newSoh:'centerValue',mpl:'centerValue',shelf_capacity:'centerValue',facings:'centerValue',days_soh:'centerValue',sit:'centerValue',soo:'centerValue',std_sell_price:'centerValue',inv_sales_val:'centerValue',last_sold_date:'centerValue lastColumn'},
	this.header_title = {uom:'Unit of Measure',om:'Order Multiple',newSoh:'Stock on Hand',mpl:'Minimum Presentation Level',shelf_capacity:'Shelf Capacity',sit:'Stock in Transit',soo:'Stock on Order'},
	this.header_width = {article_no:'7%',article_desc:'12%',uom:'7%',om:'7%',newSoh:'7%',mpl:'7%',shelf_capacity:'7%',facings:'7%',days_soh:'7%',sit:'7%',soo:'7%',std_sell_price:'7%',inv_sales_val:'7%',last_sold_date:'7%'},
	this.content_class = {article_no:'leftValue',article_desc:'leftValue',uom:'centerValue',om:'centerValue',newSoh:'centerValue',mpl:'centerValue',shelf_capacity:'centerValue',facings:'centerValue',days_soh:'centerValue',sit:'centerValue',soo:'centerValue',std_sell_price:'centerValue',inv_sales_val:'centerValue',last_sold_date:'centerValue lastColumn'},
	this.content_title = {},
	this.content_format = {article_no:'removeNull',article_desc:'removeNull',om:'removeNull',newSoh:'removeNull',mpl:'removeNull',duration:'removeNull',shelf_capacity:'removeNull',facings:'removeNull',days_soh:'removeNull',sit:'removeNull',soo:'removeNull',std_sell_price:'removeNull',inv_sales_val:'removeNull',last_sold_date:'removeNull'},
	this.content_width =  {article_no:'7%',article_desc:'12%',uom:'7%',om:'7%',newSoh:'7%',mpl:'7%',shelf_capacity:'7%',facings:'7%',days_soh:'7%',sit:'7%',soo:'7%',std_sell_price:'7%',inv_sales_val:'7%',last_sold_date:'7%'},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby= true;
		if(groupByValue == "DEPT"){
		this.default_groupbyColumn = [ 'dept_name' ];
		this.groupbyColumn = {'dept_name' : 'dept_name'};
		this.group_cont_function = {dept_name : getDeptGrpCont};
	}else if(groupByValue == "CAT"){
		this.default_groupbyColumn = [ 'cat_name' ];
		this.groupbyColumn = {'cat_name' : 'cat_name'};
		this.group_cont_function = {cat_name : getCatGrpCont};
	}else if(groupByValue == "SUB_CAT"){
		this.default_groupbyColumn = [ 'sub_cat_name' ];
		this.groupbyColumn = {'sub_cat_name' : 'sub_cat_name'};
		this.group_cont_function = {sub_cat_name : getSubCatGrpCont};
	}else if(groupByValue == "SEG"){
		this.default_groupbyColumn = [ 'seg_name' ];
		this.groupbyColumn = {'seg_name' : 'seg_name'};
		this.group_cont_function = {seg_name : getSegGrpCont};
	}	
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.curr_page= 1;
	this.sort=true;
	this.cont_data_function = {newSoh: getNewSoh,days_soh:showDaysSOH,std_sell_price:getstdSellPriceDetails,inv_sales_val:getInvSalesDetails,last_sold_date:getFormattedDateDetails};
	this.cont_sort_function = {article_no:getArticleNo,newSoh:showNewSoh};
	this.data_td_class = {article_no:getArticleTdclass};
	this.data_tr_class = {func_class:getArticleTrclass};
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
	this.legend = '<div class="legend"><label> Legend: <label class="d">Deleted</label><label class="plannerThisPromo">On Promotion</label><label class="pb">Pack Breakdown</label><label class="pi">Perpetual Inventory</label> </div>';
}

var showNewSoh = function(){
	return 'newSoh';
};

var getNewSoh = function(obj){
	obj.newSoh = (obj.uom == 'KG') ? Number(obj.soh||'').toFixed(3) : Number(obj.soh||'').toFixed(0);
	return obj.newSoh;
};
var getDeptGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.dept_name || '') + '</td></tr>';
	}
	return cont;
};
var getCatGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.cat_name || '') + '</td></tr>';
	}
	return cont;
};
var getSubCatGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.sub_cat_name || '') + '</td></tr>';
	}
	return cont;
};
var getSegGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.seg_name|| '') + '</td></tr>';
	}
	return cont;
};
var getArticleTdclass = function(obj,$td){
	var colClass = '';
	if(obj.del_ind == 'Y'){
		colClass = 'd right tooltip';
	}else if(obj.pbd_ind == 'Y'){
		colClass = 'pb right';
	} else if(obj.pi_flag == 'Y'){
		colClass = 'pi right';
	} else if(obj.promo_flag == 'Y'){
		colClass = 'plannerThisPromo plannerRight';
	}
	$td.addClass(colClass);
};

var getArticleTrclass = function(obj,$td,$tr){
	if(obj.del_ind == 'Y'){
		$tr.addClass('warningIndicator');
	}
};
/**
 * Customizes the article no display
 */
var showArticleNo = function(obj){
	var classes;
	if(obj.article_no == "149539"){
		classes =" plannerThisPromo plannerRight";
	}else if(obj.article_no == "149538"){
		classes =" d right tooltip";
	}else if(obj.article_no == "149537"){
		classes = " pb right";
	}
	var inpu= '<label>'+obj.article_no+'</label><label class="'+classes+'"'+'</label>';
	return (inpu);
};
/**
 * Sets the data by which sorting has to be done.
 */
var getArticleNo = function(){
	return 'article_no';
};
var getstdSellPriceDetails = function(obj){
	return Number(obj.std_sell_price).toFixed(2);
};
var showDaysSOH = function(obj){
	obj.days_soh = formatTo2DecimalPlaces(obj.days_soh);
	return obj.days_soh;
};
var getInvSalesDetails = function(obj){
	return Number(obj.inv_sales_val).toFixed(2);
};
var getFormattedDateDetails =  function(obj){
	return getFormattedDate(obj.last_sold_date);
};
function formatTo2DecimalPlaces(inputString){
	var str = Number(inputString).toFixed(2);
	if(str.substr(str.length-3, str.length) == ".00"){
		return str.substr(0 , str.length-3);
	}else{
		return str;
	}
}
function getFormattedDate(date){//yyyy-mm-dd to dd/mm/yyyy
	var formatedDate = '';//dd/mm/yy
	var formatedDateArray = new Array();
	if(date != '' && date != undefined){
		formatedDateArray = date.split("-");
		if(formatedDateArray.length == 3){
			formatedDate = formatedDateArray[2]+"/"+formatedDateArray[1]+"/"+formatedDateArray[0];
		}else{
			formatedDate = date;
		}		
	}
	return formatedDate;
}

/**
 * Frames print screen content
 * @param data
 */
function frameReport(){
	data = responseN;	
	var content = '';	
	var firstPageCreated = false;
	var headers = '';
	
	headerContent = '<label><strong>Inventory Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
	+'Report for:</label></br><label class="subtitle">'+ allInputs
	+'</label></br></br><label class="subtitle"><strong>List of articles ('+data.length+')</strong></label></br></br>';
	
	headers =
		'<th align="left" style="width:50px">Article</th>'
		+'<th align="center" style="width:20px"></th>'
		+'<th align="left" style="width:200px">Description</th>'
		+'<th align="center" style="width:40px">UOM</th>'
		+'<th align="center" style="width:40px">OM</th>';
	if(displaySOH){
		headers += '<th align="center" style="width:80px">SOH</th>';
	}
	if(displayMPL){
		headers += '<th align="center" style="width:40px">MPL</th><th align="center" style="width:50px">Capacity</th>';
	}
	if(displayFacings){
		headers += '<th align="center" style="width:50px">Facings</th>';
	}
		headers += '<th align="center" style="width:50px">Days on</br>Hand</th>';
		headers += '<th align="center" style="width:40px">SIT</th>';
		headers += '<th align="center" style="width:40px">SOO</th>';
		headers += '<th align="center" style="width:50px">Std.Sell</br>Price ($)</th>';
		headers += '<th align="center" style="width:95px">Inventory Sales</br>Value ($)</th>';
		headers += '<th align="center" style="width:80px">Last Sold</br>Date</th>';
	//	/**/ removed for defect 
	var printHeadInnerTable = '<table style="font-size: 15px;height:45%;min-height:820px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable">'
			+'<tr>'+headers+'</tr>';
		
	//only min height chnaged- for firsst table alone /**/ removed for defect 
	var printHeadInnerTable1 = '<table style="font-size: 15px;height:45%;min-height:600px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable">'
		+'<tr>'+headers+'</tr>';
	if(firstPageCreated){
		content += printHeadInnerTable;
	}else{
		content += printHeadInnerTable1;
	}
	var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;"   class="width98">'

		+ ' <div class="width35 margin5 left inline-block" style="float:left;">'
		+ ' <label class="bold">Printed on: </label>'
		+ '<label class="currentDate"></label>'
		+ '<label class="separator">|</label>'
		+ '<label class="currentTime"></label>'
		+ '</div>'
		+ '<div class="inline-block margin5 width45"><div class="hideBlock endOfReport"><strong>End of Report</strong></div></div>'
		+ '<div class="width35  inline-block right">'
		+ '<div class=" lineheight15 margin5 text-align-right ">Page'

		+ '<label class="currentPagePrint">1</label> of '

		+ '<label class="totalPage">1</label>'

		+ ' </div>' + '</div>' + '</div>';
	var count = 0;var legendIndicator = '';
	for ( var i = 0; i < data.length; i++) {
		//Legend Indicator value
		if(data[i].pbd_ind == 'Y'){
			legendIndicator = 'PB';
		} else if(data[i].pi_flag == 'Y'){
			legendIndicator = 'PI';
		} else if(data[i].del_ind == 'Y'){
			legendIndicator = 'D';
		} else if(data[i].promo_flag == 'Y'){
			legendIndicator = 'P';
		} else{
			legendIndicator = '';
		}
		
		var dynamicContent =  '<td align="center">' + data[i].article_no
		+ '</td><td  align="center">' + legendIndicator
		+ '</td><td  align="left">' + data[i].article_desc
		+ '</td><td  align="center">' + data[i].uom
		+ '</td><td  align="center">' + data[i].om;
		
		if(displaySOH){
			dynamicContent += '</td><td  align="center">' + Number(data[i].soh).toFixed(2);
		}
		if(displayMPL){
			dynamicContent += '</td><td  align="center">' + data[i].mpl;
			dynamicContent += '</td><td  align="center">' + data[i].shelf_capacity;
		}
		if(displayFacings){
			dynamicContent += '</td><td  align="center">' + data[i].facings;
		}
		dynamicContent += '</td><td  align="center">' + data[i].days_soh
		+ '</td><td  align="center">' + data[i].sit
		+ '</td><td  align="center">' + data[i].soo
		+ '</td><td  align="center">' + Number(data[i].std_sell_price).toFixed(2)
		+ '</td><td  align="center">' + Number(data[i].inv_sales_val).toFixed(2)
		+ '</td><td  align="center">' + getFormattedDate(data[i].last_sold_date);
		
		content += '<tr class="border_bottom">'+dynamicContent + '</td></tr>';
			
				
		//Split Pages - Starts		
		var firstPageRecords = 15;
		var otherPageRecords = 23;
		if(data[i].article_desc.length > 27){
			count = count + 0.5*(data[i].article_desc.length/27);
		}else if(data[i].last_sold_date.length > 14){
			count = count + 0.5*(data[i].last_sold_date.length/14);
		}
		if (i >= (data.length - 1)){
			content += '</tbody></table>';
			//content +='<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>' + printFoot + '</div>';
			content +='<table><tbody><tr></br><label style=" font-weight: normal;"><i>Legend: D Deleted, P On Promotion, PB Pack Breakdown, PI Perpetual Inventory</i></label></tr><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>' ;//+ '</div>';
		}
		if(count>=firstPageRecords && !firstPageCreated){
			count =0;
			firstPageCreated = true;
			if(firstPageCreated){
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable;
			}else{
				content += '</tbody></table>' + printFoot+'</div>'
				+ printHeadInnerTable1;
			}
			
		}else {
			if (i >= (data.length - 1)){
					if(count != otherPageRecords && i> firstPageRecords){
					content += '<table><tbody>';
					for(var n=0;n<((otherPageRecords)-count);n++){
						content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
					}
					content += '</tbody></table>';
				}else{
					content += '<table><tbody>';
					for(var n=0;n < ((firstPageRecords)-count);n++){
						content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
					}
					content += '</tbody></table>';
				}
				//content += '</tbody></table>' + printFoot + '</div>';					
			}
			else if(count >= otherPageRecords){
				count = 0;	
				if(firstPageCreated){
					content += '</tbody></table>' + printFoot+'</div>'
					+ printHeadInnerTable;
				}else{
					content += '</tbody></table>' + printFoot+'</div>'
					+ printHeadInnerTable1;
				}
			}
			
		}
		count++;
		//Split Pages - Ends

	}
		$('#printbodyForReport')
		.html('')
		.append(headerContent+content)
		.append(
				'<link rel="stylesheet" href="../../styles/reportPrintStyle.css" />');
		$('.currentDate').text(dateformat());
		$('.currentTime').text(timeformat());
		var len = 0;
		$('.currentPagePrint').each(function() {
			len++;
			$(this).text(len);
		});
		$('.totalPage').text($('.currentPagePrint').length);		
}

/**
 * Populates value in department drop down
 */
function populateDepartmentDropDown() {
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : "ALL DEPARTMENTS",
		"iv_session_id" : "100"
	};
	console.log(gethierarchyDetails + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetails,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var content = '';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li >	<input  class="depDrpDwnChkBx" type="checkbox" '
									+ 'value="'
									+ temList[i].node_id
									+ '" id="'
									+ temList[i].node_id
									+ '">'
									+ '<label class="dropdownLabel">'
									+ temList[i].node_desc + '</label></li>';							
						}
						$('.dropdown').append(content);
						$('.dropdown').append('<li class="selectDropdownActions"><label id="dropdownDoneBtn" class="actionBtn"><a href="#">Done</a></label><label class="secondaryActionBtn"><a href="#">Cancel</a></label></li>');
						$("#dropdownDoneBtn").on( "click", function() {//DOne btn inside drop down
							$(".selectDropdown").removeClass('active');
						});
						$(".secondaryActionBtn").on("click", function() {//cancel button inside dropdown
							$(".selectDropdown").removeClass('active');
							//bindAfterDepDrpDwnReady();
						});
						bindAfterDepDrpDwnReady();
						setDeptLblBasedOnDefPrimaryDept();
						selectDefPrimaryDepts();
						if($('.depDrpDwnChkBx').is(':checked') == false){
							$("#allDeptChkBox").prop("checked",true);
							if($("#allDeptChkBox").is(':checked')){//Select all
								$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
								$('.dropdown').find("input[type=checkbox]").each(function() {
									$(this).prop('checked', true);
								});					
								$('#deptlst').find("input[type=checkbox]").each(function() {
									$(this).prop('checked', true);
								});
								$("#deptSelectAll").prop('checked', true);
							}
						}
					}
				},
				error : function(response) {
				},
			});

}

function populateSeasonalDropDown() {
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_session_id" : "100"
	};
	console.log(inventorySeaonCodeUrl + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : inventorySeaonCodeUrl,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					var content = '';					
					//content +='<option value="All seasonal activities">All seasonal activities</option>'
					if (temList.length > 0) {						
						for ( var i = 0; i < temList.length; i++) {
							content +='<option value="'+temList[i].season_name+'" seasonCode="'+temList[i].season_code+'">'+temList[i].season_name+'</option>';													
							//content +='<ul class="seasonInvDropDown"><li value="'+temList[i].season_name+'" seasonCode="'+temList[i].season_code+'">'+temList[i].season_name+'</li></ul>'
						}											
					}else{
						content +='<option value="All seasonal activities">All seasonal activities</option>';
					}
					$('.seasonalActivity').append(content);
				},
				error : function(response) {
				},
			});

}
/**
 * Binds the click event for All departments checkbox under Departments drop down
 * in Create stock take page
 */
function setDeptLblBasedOnDefPrimaryDept(){
	
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	if(userPrimaryDepts == undefined ){
		userPrimaryDepts = primaryDepts['NONE'];
	}
	if(userPrimaryDepts ==undefined || userPrimaryDepts.length <= 0 ){
		$("#deptDropDwnLabel").html('Select Departments');//Department drop down value displayed
	}else if(userPrimaryDepts.length == 1){
		$("#deptDropDwnLabel").html($('.dropdown').find("#"+userPrimaryDepts[0]).parent().find('label').html());
	}else if(userPrimaryDepts.length == $(".depDrpDwnChkBx").length){
		$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
		$("#allDeptChkBox").prop("checked",true);//defect_9621
		$("#deptSelectAll").prop('checked', true);
	}else{
		$("#deptDropDwnLabel").html('Multiple Departments');//Department drop down value displayed
	}
}
function selectDefPrimaryDepts(){
	//Default Primary department as selected department
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	if(userPrimaryDepts == undefined ){
		userPrimaryDepts = primaryDepts['NONE'];
	}
	if(userPrimaryDepts != undefined && userPrimaryDepts.length > 0){
		for(var i=0;i<userPrimaryDepts.length;i++){
			$("#depDropDwnList").find("#"+userPrimaryDepts[i]).prop('checked',true);//To check the drop down
			$('#deptlst').find("#"+userPrimaryDepts[i]).prop('checked',true);//To check dept in article hierarchy
		}
	}
	
}
function bindAllDeptCheckBox(){
	//Registers dept dropdown's select 'All departments' event
	$("#allDeptChkBox").click(function(){
		if($("#allDeptChkBox").is(':checked')){//Select all
			$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});					
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
			$("#deptSelectAll").prop('checked', true);
		}else{ //unselect all
			$("#deptDropDwnLabel").html('Select Departments');//Department drop down value displayed
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$('#deptlst').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$("#deptSelectAll").prop('checked', false);
		}
	});
}
function bindAfterDepDrpDwnReady()
{
	$('#depDropDwnList').find("li input[type=checkbox]").change(function() {
		if($(this).attr('id') != "allDeptChkBox"){
			onChangeDeptDropDown();	
			if($(this).is(':checked')){
				$('#deptlst :input[value="'+$(this).attr('id')+'"]').prop('checked', true);
			}else{
				$('#deptlst :input[value="'+$(this).attr('id')+'"]').prop('checked', false);
			}
		}	
	});	
//	$("#allDeptChkBox").trigger('click');//to select all dept by default
		
}
/**
 * onCahnge of department drop down invoke this method
 */
function onChangeDeptDropDown(){
	if($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length){
		$("#allDeptChkBox").prop("checked",true);
		$("#deptSelectAll").prop('checked', true);
		$("#deptDropDwnLabel").html('All Departments');//Department drop down value displayed
	}else if($('.depDrpDwnChkBx:checked').length == 0){
		$("#deptDropDwnLabel").html('Select Departments');//Department drop down value displayed
		//$("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('.dropdownLabel').html());//Department drop down value displayed
	}else if($('.depDrpDwnChkBx:checked').length == 1){
		$("#deptDropDwnLabel").html($('.depDrpDwnChkBx:checked').parent().find('label').html());
	}else{
		$("#allDeptChkBox").prop("checked",false);
		$("#deptSelectAll").prop('checked', false);
		$("#deptDropDwnLabel").html('Multiple Departments');//Department drop down value displayed
	}		
}

function initialiseTooltip() {
	
	$("input.editNumCell,input.editDateCell").tooltip().off(
			"mouseover mouseout");

	$("td").tooltip({
		position : {
			my : "top center-30",
			at : "top center"
		}
	});
	$("th").tooltip({
		position : {
			my : "top center-30",
			at : "top center"
		}
	});
}

/**
 * Time format
 * @returns {String}
 */
function timeformat()
{
	var date=new Date();
	if(date.getHours()>12)
	{
		hours=(date.getHours())-12;
		ampm="pm";
	}
else
	{
	hours=(date.getHours());
		ampm="am";
	}
return (hours<10?("0"+hours):hours)+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+" "+ampm;
}

/**
 * Date format
 * @returns {String}
 */
function dateformat()
{
	var date=new Date();
	day=date.getDate();
	month=date.getMonth()+1;
	year=date.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
}
function callInventoryJasperPrint(reportResultArray)
{	
	var obj={			
			reportResult	: reportResultArray,
			reportFor		: allInputs,
			storeNo 		: $('#posSite').val(),
			storeName 		: $('#posSiteName').val(),
			facingFlag	 	: displayFacings,
			sohFlag 		: displaySOH,
			mplFlag 		: displayMPL,
			totalCount		: reportResultArray.length,
			groupByValue	: groupByValue
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "printReportInventoryPDF.htm",
	type: "POST",
	dataType: "json",
	contentType:"application/json",
	data:JSON.stringify(obj),
    cache: false,    //This will force requested pages not to be cached by the browser  
    processData:false, //To avoid making query String instead of JSON
    beforeSend: function() {
        startLoading();
    },
	success: function(response, textStatus ){
	//console.log(response.data);
	if(response.data == 'success')
		{
		/*$('#inventoryReportForm').attr("action", "downloadInventoryReportPdf.pdf");
		$('#inventoryReportForm').attr('target','_blank');
		$('#inventoryReportForm').attr('method','get');
		$('#inventoryReportForm').submit();*/
//		stopLoading();
		}
	//console.log("success");
	},
	error: function(xhr, textStatus, errorThrown){
	console.log('request failed'+errorThrown);
	},complete: function(){
		stopLoading();
	}
		
	});
}
