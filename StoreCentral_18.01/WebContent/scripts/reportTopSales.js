var report_name = 'Report_Top_Sales';
var report_title = '';
var requestParam = '';
$(function() {
	
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	/* Autocomplete Off */
	 
	document.forms[0].autocomplete="off";
	
	 $("#backBtn").click(function(e) {
		 window.location.href="../login/homepage.htm";
	 }); 
	
	//When opening by default cat,subcat,seg select all to be disabled
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
		$(".ContentTableWrapper").removeClass('hideBlock'); 
		$('#accordion').accordion({active : true });
		buildReqParam();
		callReportService();	
	});
	
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
	
	//Checkbox DropDown functions
	$(".selectDropdownActions .actionBtn, .selectDropdownActions .secondaryActionBtn").click(function(){ 
		$(".selectDropdown").removeClass('active');
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
	
	$(document).keypress(function(event) {
		  event.stopPropagation();
		  if (event.which == 13) {	//Enter key				
			 if ($(".ui-menu").find('li').length > 0) {
				 if($(".parameterOptionsListBlock").find("#"+$("#searchBox").val().split('-')[0]).length > 0){
					 showReportErrorMsg("Article added already","Duplicate Article");
				 }else{
					 $(".parameterOptionsListBlock").append('<li><label class="articleLabel" id="'+$("#searchBox").val().split('-')[0]+'">'+$("#searchBox").val()+'</label><label class="closeMessage" onclick="$(this).parent().remove()">&nbsp;</label></li>');
				 }						
				$("#searchBox").val('');
				$(".ui-menu").children().remove();//To hide the list of suggestions displayed
				$(".ui-menu").css("display", "none");//To hide the list of suggestions displayed
				return false;
			} 
		  }
	  });
	 //Registers Department select all event
	$("#deptSelectAll").click(function(event){
		if($('#deptSelectAll').is(':checked')){
			$( "input[name='departmentList']" ).each(function(){
				$(this).prop('checked', true);
			});
		}else{
			$( "input[name='departmentList']" ).each(function(){
				$(this).prop('checked', false);
			});
		}
		setDeptCount();
	});
	//Registers category select all event
	$("#catSelectAll").click(function(event){
		if($('#catSelectAll').is(':checked')){
			$( "input[name='category']" ).each(function(){
				$(this).prop('checked', true);
			});
		}else{
			$( "input[name='category']" ).each(function(){
				$(this).prop('checked', false);
			});
		}	
		setCatCount();
	});
	//Registers sub-category select all event
	$("#sCatSelectAll").click(function(event){
		if($('#sCatSelectAll').is(':checked')){
			$( "input[name='subCat']" ).each(function(){
				$(this).prop('checked', true);
			});
		}else{
			$( "input[name='subCat']" ).each(function(){
				$(this).prop('checked', false);
			});
		}
		setSCatCount();
	});
	//Registers segment select all event
	$("#segSelectAll").click(function(event){
		if($('#segSelectAll').is(':checked')){
			$( "input[name='segmentList']" ).each(function(){
				$(this).prop('checked', true);
			});
		}else{
			$( "input[name='segmentList']" ).each(function(){
				$(this).prop('checked', false);
			});
		}
		setSegCount();
	});
	populateDepartmentDropDown(); //populates values in department drop down

	populateDepartment();//populates the value in article hierarchy area
	
	createAutoSuggest($('.reportWrapper').find('#searchBox')); //Auto suggestion for articles		
	
	//Registers dept dropdown's select 'All departments' event
	$("#allDeptChkBox").click(function(){
		if($("#allDeptChkBox").is(':checked')){//Select all
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
		}else{ //unselect all
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
		}
	});
	//on change of checkbox under Department drop down
	$(document).on('change', $('.depDrpDwnChkBx').find("input[type=checkbox]"), function() {	
		if($('.depDrpDwnChkBx:checked').length == $(".depDrpDwnChkBx").length){
			$("#allDeptChkBox").prop("checked",true);
		}else{
			$("#allDeptChkBox").prop("checked",false);
		}				
	});	
});
function createAutoSuggest(elem, elemToBeTriggered,maxAutoListSize) {
	  // code for article auto suggest in the text box
	 var maxAutoListSize = 10;
	 var param = {};
	  $(elem)
	    .autocomplete({
	      delay: 0,
	      source: function(request, response) {
	    	param = {iv_article: request.term, iv_auto_stockR: 'N', iv_ranged: 'Y',  iv_session_id: '', iv_auto_stockr_flag: ''};
	    	//changed search length 2 as 3 for better performance
	        if (request.term.length == 3) {
	          console.log(getarticleguggestions + ' ' + JSON.stringify(param));
	          // $.ajaxSetup({async: false});
	          $.post(getarticleguggestions, JSON.stringify(param), function(data) {
	            if (data != '') {
	              suggestionList = data;
	              response($.map(data.slice(0, maxAutoListSize), function(item) {
	                return {
	                  value: item.article_no + '-' + item.article_desc,
	                  text: item.article_no + '-' + item.article_desc
	                };
	              }));
	            }
	          });
	        } else {
	          setTimeout(function() {
	            if (suggestionList != null && suggestionList != undefined && suggestionList.length > 0) {
	              response(sliceFilteredList(request, suggestionList, maxAutoListSize));
	            }
	          }, 50);
	        }
	      },
	      select: function(event, ui) {
	    	  if($(".parameterOptionsListBlock").find("#"+ui.item.text.toString().split('-')[0]).length > 0){
	    		  showReportErrorMsg("Article added already","Duplicate Article");
	    	  }else{
	    		  $(".parameterOptionsListBlock").append('<li><label class="articleLabel" id="'+ui.item.text.toString().split('-')[0]+'">'+ui.item.text.toString()+'</label><label class="closeMessage" onclick="$(this).parent().remove()">&nbsp;</label></li>'); 
	    	  }
	    	  
	    	 $(':hidden[id=hdnmedicineid]')
	          .val(ui.item.text.toString());
	        $(':hidden[id=hdnmedicinenm]')
	          .val(ui.item.value.toString());
	        if (elemToBeTriggered != undefined) {
	          setTimeout(function() {
	            $(elemToBeTriggered)
	              .trigger('click');
	          }, 10);
	        }
	      },
	      minLength: 2,
	      autoFocus: true
	    });
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
						});
					
					}
				},
				error : function(response) {
				},
			});

}
/**
 * Populates values in article hierarchy area
 */
function populateDepartment() {
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
							content += '<li >	<input class="department" type="checkbox" name="departmentList" '
									+ 'value="'
									+ temList[i].node_id
									+ '" id="'
									+ temList[i].node_id
									+ '">'
									+ '<label class="labelText deptLbl">'
									+ temList[i].node_desc + '</label></li>';
						}
						$('#deptlst').html(content);
						//$("#deptLstCnt").text(temList.length);
						bindDepartmentSelectEvent();
					}
				},
				error : function(response) {
				},
			});

}

/**
 * Binds deparment select event
 */
function bindDepartmentSelectEvent() {
	$('.department')
			.on(
					'click',
					function() {
						var deptCount = $("[name='departmentList']:checked").length;
						if(deptCount > 0){
							 $("#deptSelectAll").removeAttr("disabled");
						}
						$("#deptLstCnt").text(deptCount);//Length of Dept List
						
						
						
						var selectedValue = this.id.toString();
//						if (selectedValue != $('#hierarchyID').val()) {
						
							$(".catgDiv").addClass('hideBlock');
							$(".segmentDiv").addClass('hideBlock');
							$(".subCatgDiv").addClass('hideBlock');
							$("#noSelectionSeg").removeClass('hideBlock');
							$("#noSelectionSub").removeClass('hideBlock');
							$("#segmentLst").addClass('hideBlock');
							// my line
							$("#subCatTotal").addClass('hideBlock');
							$("#segmentTotal").addClass('hideBlock');

							$("#categoryLstCnt").text('');
							$("#subTotal").text('');
							$("#segmentTotalCnt").text('');

							$('#hierarchyID').val(selectedValue);
							$('#hierarchyLVL').val(2);
							
						if($(this).is(':checked')){
							// category ajax call
							callDepartmentSelectService(selectedValue);
							$("#noSelectionCat").addClass('hideBlock');
							
						}else{
							$("#noSelectionCat").removeClass('hideBlock');						
							$("#catSelectAll").prop("checked", false);//Disable cat select all when no cat shown
						}
					selUnSelTotdept();

					});
	
	$('.deptLbl')
	.on(
			'click',
			function() {
							
				var $dept = $(this).siblings('input[type="checkbox"]');
				
				if($dept.prop('checked')){
					$('#catDiv').find('.catgDiv').addClass('hideBlock');
					if($('#catDiv').find('#catg-' + $dept.val()).length != 0){
						$('#catDiv').find('#catg-' + $dept.val()).removeClass('hideBlock');
						selUnSelTotCat($dept);
						
					}else{
						callDepartmentSelectService($dept.attr('id'));
						//$("#catSelectAll").attr("disabled", true);
					}
					$("#noSelectionCat").addClass('hideBlock');
				}else{
					$('#catDiv').find('.catgDiv').addClass('hideBlock');
					$("#noSelectionCat").removeClass('hideBlock');
				}
			});
}

/**
 * Binds category select event
 */
function bindCategorySelectEvent() {	
			$('.category')
					.on(
						'click',
								function() {
							setCatCount();

						var selectedValue = this.id.toString();
//						if (selectedValue != $('#hierarchyID').val()) {
						
						$(".segmentDiv").addClass('hideBlock');
						$(".subCatgDiv").addClass('hideBlock');
						$("#noSelectionSeg").removeClass('hideBlock');
						$("#noSelectionSub").addClass('hideBlock');
						$("#segmentLst").addClass('hideBlock');
						$("#subCatTotal").addClass('hideBlock');
						$("#segmentTotal").addClass('hideBlock');

						$("#subTotal").text('');
						$("#segmentTotalCnt").text('');


						$('#hierarchyID').val(selectedValue);
						$('#hierarchyLVL').val(3);
						if($(this).is(':checked')){
							callCatSelectService(selectedValue);
						}else{
							$("#sCatSelectAll").prop("checked", false);//Uncheck sub category when no sub cat shown
						}
						selUnSelTotCat($("#"+$(this).attr('depid')));//To check or uncheck total Cat checkbox on change.

						//}
					});
	
	$('.catgLbl')
	.on(
			'click',
			function() {
				var $catg = $(this).siblings('input[type="checkbox"]');
				
				if($catg.prop('checked')){
					$('#parentSCatDiv').find('.subCatgDiv').addClass('hideBlock');
					if($('#parentSCatDiv').find('#scatg-' + $catg.val()).length != 0){
						$('#parentSCatDiv').find('#scatg-' + $catg.val()).removeClass('hideBlock');
						selUnSelTotSCat($catg);
					}else{
						callCatSelectService($catg.attr('id'));
					}
					$("#noSelectionSub").addClass('hideBlock');
				}else{
					$('#parentSCatDiv').find('.subCatgDiv').addClass('hideBlock');
					$("#noSelectionSub").removeClass('hideBlock');
				}
		});

}

/**
 * Bind sub-category select event
 */
function bindSubCategorySelectEvent() {
	
	$('.subCat')
				.on(
					'click',
							function() {
						var selectedValue = this.id.toString();					
						
						$(".segmentDiv").addClass('hideBlock');
						$("#noSelectionSeg").addClass('hideBlock');
						$("#segmentTotal").addClass('hideBlock');
						$("#subTotal").text('');

						$('#hierarchyID').val(selectedValue);
						$('#hierarchyLVL').val(4);
						if($(this).is(':checked')){
							callSCatSelectService(selectedValue);
						}else{
							$("#segSelectAll").prop("checked", false);//Uncheck select all segment when no segement displayed.
						}
						selUnSelTotSCat($("#"+$(this).attr('catid')));
						//}
					});
	
	$('.scatgLbl')
	.on(
			'click',
			function() {
				var $scatg = $(this).siblings('input[type="checkbox"]');
				
				if($scatg.prop('checked')){
					$('#segDiv').find('.segmentDiv').addClass('hideBlock');
					if($('#segDiv').find('#seg-' + $scatg.val()).length != 0){
						$('#segDiv').find('#seg-' + $scatg.val()).removeClass('hideBlock');
						selUnSelTotSeg($scatg);
					}else{
						callSCatSelectService($scatg.attr('id'));
					}
					$("#noSelectionSeg").addClass('hideBlock');
				}else{
					$('#segDiv').find('.segmentDiv').addClass('hideBlock');
					$("#noSelectionSeg").removeClass('hideBlock');
				}
		});

}

/**
 * Binds segment select event
 */
function bindSegmentSelectEvent() {	
		$('.segment').on('click',function() {
			selUnSelTotSeg($("#"+$(this).attr('scatid')));
			setSegCount();
		});
}
/**
 * Invokes service on selection of department
 * @param selectedValue
 */
function callDepartmentSelectService(selectedValue){
	var so = $('#salesOrg').val();
	var no = selectedValue;
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : no,
		"iv_session_id" : "100"
	};
	console.log('get category' + gethierarchyDetails + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetails,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var content = '';
						content += '<div id="catg-'+no+'" class="catgDiv"><ul id="categoryLst">';
						content += '<li><label class="titleText">'+$("#"+no).parent().find(".dropdownLabel").html();+'</label></li>';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li><input type="checkbox" name="category" class="category" data-tt-id="'
									+ temList[i].node_id
									+ '" depId="'
									+ no
									+ '" id="'
									+ temList[i].node_id
									+ '" value="'
									+ temList[i].node_id
									+ '"/><label class="catgLbl lastColumn">'
									+ temList[i].node_desc
									+ '</label></li>';
						}
						content += '</ul></div>';
						$('#parentCatDiv').append(content);
						$("#categoryLstCnt").text(
								temList.length);
						$("#categoryLstTotal")
								.removeClass(
										'hideBlock');
						if($('#parentCatDiv').length != 0){
							$("#catSelectAll").removeAttr("disabled");
							$('#catSelectAll').prop('checked',false);//By default should be select all
							$('#catSelectAll').trigger('click');//By default should be select all
							$("#sCatSelectAll").attr("disabled", true);
							$("#segSelectAll").attr("disabled", true);
						}
						 $(".category").unbind().click(function() {});
						 $(".catgLbl").unbind().click(function() {});
						 
						bindCategorySelectEvent();
					}
				},
				error : function(response) {

				},
			});
}
/**
 * Invokes service on selection of category
 * @param selectedValue
 */
function callCatSelectService(selectedValue){
	var so = $('#salesOrg').val();
	var no = selectedValue;
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : no,
		"iv_session_id" : "100"
	};
	
	console.log('get sub category' + gethierarchyDetails + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetails,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var content = '';
						content += '<div id="scatg-'+no+'" class="subCatgDiv"><ul id="subCategoryLst">';
						content += '<li><label class="titleText">'+$("#"+no).parent().find(".catgLbl").html();+'</label></li>';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li><input type="checkbox" name="subCat" class="subCat" data-tt-id="'
									+ temList[i].node_id
									+ '" catId="'
									+ no
									+ '" id="'
									+ temList[i].node_id
									+ '" value="'
									+ temList[i].node_id
									+ '"/><label class="scatgLbl lastColumn">'
									+ temList[i].node_desc
									+ '</label></li>';
						}
						content += '</ul></div>';
						$('#parentSCatDiv').append(
								content);
						$("#subTotal").text(
								temList.length);
						$("#subCatTotal").removeClass(
								'hideBlock');
						if($('#parentSCatDiv').length != 0){
							$("#sCatSelectAll").removeAttr("disabled");
							$('#sCatSelectAll').prop('checked',false);//By default should be select all
							$('#sCatSelectAll').trigger('click');//By default should be select all
							$("#segSelectAll").attr("disabled", true);
						}
						 $(".subCat").unbind().click(function() {});
						 $(".subCatLbl").unbind().click(function() {});
						bindSubCategorySelectEvent();
						
					}
				},
				error : function(response) {

				},
			});
}
					
/**
 * Invokes service on selection of sub-category
 * @param selectedValue
 */
function callSCatSelectService(selectedValue){
	var so = $('#salesOrg').val();
	var no = selectedValue;
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : no,
		"iv_session_id" : "100"
	};

	console.log('get segment' + gethierarchyDetails + ' ' + JSON.stringify(param));
	
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetails,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var content = '';
						content += '<div id="seg-'+no+'" class="segmentDiv"><ul id="segmentLst">';
						content += '<li><label class="titleText">'+$("#"+no).parent().find(".scatgLbl").html();+'</label></li>';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li><input type="checkbox" name="segmentList" class="segment" data-tt-id="'
									+ temList[i].node_id
									+ '" scatId="'
									+ no
									+ '" id="'
									+ temList[i].node_id
									+ '" value="'
									+ temList[i].node_id
									+ '"/><label for="'
									+ temList[i].node_id
									+ '" class="lastColumn">'
									+ temList[i].node_desc
									+ '</label></li>';
						}
						content += '</ul></div>';
						$('#parentSegDiv').append(content);
						$("#segmentTotalCnt").text(
								temList.length);
						$("#segmentTotal").removeClass(
								'hideBlock');
						 $(".segment").unbind().click(function() {});
						bindSegmentSelectEvent();
						if($('#parentSegDiv').length != 0){
							$("#segSelectAll").removeAttr("disabled");
							$('#segSelectAll').prop('checked',false);//By default should be select all
							$('#segSelectAll').trigger('click');//By default should be select all
						}
					}
				},
				error : function(response) {

				},
			});
}	
/**
 * Sets total departments selected
 */
function setDeptCount(){
	var deptCount = $("[name='departmentList']:checked").length;	
	$("#deptLstCnt").text(deptCount);//Length of Dept List
}
/**
 * Sets total categories selected
 */
function setCatCount(){
	$("#catLstCnt").text($("[name='category']:checked").length);//Length of Category List
}
/**
 * Sets total sub-categories selected
 */
function setSCatCount(){
	$("#sCatLstCnt").text($("[name='subCat']:checked").length);//Length of Sub Category List
}
/**
 * Sets total segment selected
 */
function setSegCount(){
	$("#segLstCnt").text($("[name='segmentList']:checked").length);//Length of Segment List
}
/**
 * Invoked on click of select all departmet check box
 */
function selUnSelTotdept(){
	var totDep = $('#deptlst').find('input[type=checkbox]').length;
	var selDep = $('#deptlst').find('input[type=checkbox]:checked').length;
	if(totDep == selDep){
		$("#deptSelectAll").prop('checked',true);
	}else{
		$("#deptSelectAll").prop('checked',false);
	}
}
/**
 * Invoked on click of select all category check box
 * @param $dept
 */
function selUnSelTotCat($dept){
	var totCat = $('#catDiv').find('#catg-' + $dept.val()).find('input[type=checkbox]').length;
	var selCat = $('#catDiv').find('#catg-' + $dept.val()).find('input[type=checkbox]:checked').length;
	if(totCat== selCat){
		$("#catSelectAll").prop('checked',true);
	}else{
		$("#catSelectAll").prop('checked',false);
	}
}
/**
 * Invoked on click of select all sub-category check box
 * @param $cat
 */
function selUnSelTotSCat($cat){
	var totSCat = $('#parentSCatDiv').find('#scatg-' + $cat.val()).find('input[type=checkbox]').length;
	var selSCat = $('#parentSCatDiv').find('#scatg-' + $cat.val()).find('input[type=checkbox]:checked').length;
	if(totSCat == selSCat){
		$("#sCatSelectAll").prop('checked',true);
	}else{
		$("#sCatSelectAll").prop('checked',false);
	}
}
/**
 * Invoked on click of select all segment check box
 * @param $scat
 */
function selUnSelTotSeg($scat){
	var totSeg = $('#segDiv').find('#seg-' + $scat.val()).find('input[type=checkbox]').length;
	var selSeg = $('#segDiv').find('#seg-' + $scat.val()).find('input[type=checkbox]:checked').length;
	if(totSeg == selSeg){
		$("#segSelectAll").prop('checked',true);
	}else{
		$("#segSelectAll").prop('checked',false);
	}
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
		
		
		
		
			var greatestSales = $(".greatestSalesRadio input[type=radio]:checked").val();// Adjustment
			var dateFrom = $("#dateFrom").val();
			var dateTo = $("#dateTo").val();
			
			var imgLineChkBox = $('#imageLineChkBox').is(':checked')?'Y':'N';
			var profitableChkBox = $('#profitableChkBox').is(':checked')?'Y':'N';
			var sosChkBox = $('#sosChkBox').is(':checked')?'Y':'N';
			var seasonChkBox = $('#seasonChkBox').is(':checked')?'Y':'N';	
			var statusChkBox = $('#statusChkBox').is(':checked')?'Y':'N';
			
			var totalArticles = $("#arti").val();
				
			
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
					$('#deptDropDwnList').find("input[type=checkbox]").each ( function() {
						deptArray[deptArray.length] = $(this).val();
					});
				}else{
					$('#deptDropDwnList').find("input[type=checkbox]:checked").each ( function() {
						deptArray[deptArray.length] = $(this).val();
					});
				}
			}
			
			if(true){
				requestParam = {
						"iv_soh_flag"		:greatestSales,
						"iv_mpl_sc_flag"	:dateFrom,
						"iv_facing_flag"	:dateTo,	
						"iv_dept_list"		:deptArray.join(","),
						"iv_cat_list"       :catArray.join(","),
						"iv_sub_cat_list"   :subCatArray.join(","),
						"iv_seg_list"       :segArray.join(","),
						"iv_src_of_sup"		:imgLineChkBox,
						"iv_del_article"	:profitableChkBox,
						"iv_on_promo"		:sosChkBox,
						"iv_pack_brk_down"	:seasonChkBox,
						"iv_pack_asdfabrk_down"	:statusChkBox,
						"iv_perpetual_flag"	:totalArticles
						};
			}
			console.log('Inventory Report Request- '+requestParam);	
		
	}
			
/**
* Calls inventory report service
* @param recvParam
*/
function callReportService(){	
	console.log(reportInventoryUrl + ' ' + JSON.stringify(requestParam));	
	//$.post(reportInventoryUrl, JSON.stringify(recvParam)).done(function(response) {
		response = [ {'msg': 'null','plu_code': '','article_no': '149539','article_desc': 'Chicken Breast Stir Fry Rw','department_name': 'EA',
			'category_name': 'MEAT','sub_category_name': 'FRESH POULTRY','segment_name': 'STIR FRY','article_stat': 'Deleted Article',
			'created_date': '17/09/2015','created_time': '18:02'},{'msg': 'null','plu_code': '','article_no': '149538','article_desc': 'Mutton  Stir Fry Rw','department_name': 'MPK',
				'category_name': 'MEAT','sub_category_name': 'FRESH POULTRY','segment_name': 'STIR FRY','article_stat': 'Deleted Article',
				'created_date': '17/09/2015','created_time': '18:02'},{'msg': 'null','plu_code': '','article_no': '149537','article_desc': 'Fish  Stir Fry Rw','department_name': 'CAR',
					'category_name': 'MEAT','sub_category_name': 'FRESH POULTRY','segment_name': 'STIR FRY','article_stat': 'Deleted Article',
					'created_date': '17/09/2015','created_time': '18:02'}];
		console.log(JSON.stringify(response));	
		if(response != undefined && response[0].plu_code != undefined && response.length > 0){
			var $tblhold = $("#reportContent");
			loadReportContentTbl(response,$tblhold);
			totalRecords = response.length;
			$("#noRecords").html(totalRecords);//Sets the no of records
			//bindPrint(response);
		} else {
			showReportErrorMsg('Sorry, Some technical issue occured ', 'Inventory Report');
		}			
	//});
}
/**
* Sets the report content area and the table
* @param data
* @param $tblhold
*/
function loadReportContentTbl(data,$tblhold){
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'+$selectedTab.attr('aria-controls')) : $tblhold;
	var  confObj= (new tblReport(report_name,report_title,data));
	$tblhold.loadtbl(confObj);}

/**
* Cofiguration to generate the report table
* @param table_name
* @param table_title
* @param data
* @returns {tblReport}
*/
function tblReport(table_name,table_title,data){
	this.option = 'build';
	this.key = ['article_no','article_desc','department_name','category_name','sub_category_name','segment_name','article_stat'];
	this.table_name = table_name;
	this.table_title = table_title;
	this.table_class = ' ContentTable actionRows';
	this.header_name = {article_no:'Article',article_desc:'Description',department_name:'Sales(units)',category_name:'Sales($)',sub_category_name:'SOH',segment_name:'LTO Qty.',article_stat:'LTO Location'},
	this.header_data_type = {article_no:'char',article_desc:'char',department_name:'char',category_name:'char',sub_category_name:'char',segment_name:'char',article_stat:'char'},
	this.header_row_type = {article_no:'main',article_desc:'main',department_name:'main',category_name:'main',sub_category_name:'main',segment_name:'main',article_stat:'main'},
	this.header_class = {article_no:'centerValue',article_desc:'',department_name:'',category_name:'',sub_category_name:'',segment_name:'',article_stat:'lastColumn '},
	this.header_title = {},
	this.header_width = {article_no:'7%',article_desc:'',department_name:'12%',category_name:'7%',sub_category_name:'7%',segment_name:'7%',article_stat:'lastColumn'},
	this.content_class = {article_no:'centerValue',article_desc:'',department_name:'',category_name:'',sub_category_name:'',segment_name:'lastColumn numberColumn ',article_stat:'lastColumn '},
	this.content_title = {},
	this.content_format = {article_no:'removeNull',article_desc:'removeNull',category_name:'removeNull',sub_category_name:'removeNull',segment_name:'removeNull',duration:'removeNull',article_stat:'removeNull'},
	this.content_width =  {article_no:'7%',article_desc:'',department_name:'12%',category_name:'7%',sub_category_name:'7%',segment_name:'7%',article_stat:'7%'},
	this.comp_key_parser = {supplier_name: 'twoKeySplit'};
	this.content =  data;
	this.pagination = true;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.curr_page= 1;
	this.sort=true;
	this.cont_data_function = {article_no:showArticleNo};
	this.cont_sort_function = {article_no:getArticleNo};
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
	this.content_label = {};
}
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
	var inpu= '<label class="'+classes+'">'+obj.article_no+'</label>';
	return (inpu);
};
/**
* Sets the data by which sorting has to be done.
*/
var getArticleNo = function(){
	return 'article_no';
};
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
/**
 * Shows error message
 * @param msg
 * @param title
 */
function showReportErrorMsg(msg, title){
	var errorContent = '<li><ol><li>'+msg+'</li></ol></li>';
	$('#reportErrorWrapper').find('#titleContent').html(title);
	$('#reportErrorWrapper').find('#errorContent').html(errorContent);
	$('#reportErrorWrapper').removeClass('hideBlock');
}


