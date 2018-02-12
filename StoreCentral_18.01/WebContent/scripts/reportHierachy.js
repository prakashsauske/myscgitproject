var defaultOption = false;
var reportName = '';
$(function() {
	$('#depDropDwnList').addClass('muliple-checkbox');
	//Registers Department select all event
	$("#deptSelectAll").click(function(event){
		if($('#deptSelectAll').is(':checked')){
			$( "input[name='departmentList']" ).each(function(){
				$(this).prop('checked', true);
			});
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});			
		}else{
			$( "input[name='departmentList']" ).each(function(){
				$(this).prop('checked', false);
			});
			$('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			$(".subCatgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					$('[id^=seg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			$("#noSelectionSeg").removeClass('hideBlock');
			$("#segSelectAll").prop("checked",false);
			
			$(".catgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					$('[id^=scatg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			$("#noSelectionSub").removeClass("hideBlock");
			$("#sCatSelectAll").prop("checked",false);
			
			
			$('[id^=catg-]').each(function(){
				$(this).remove();
			});
			
			$("#noSelectionCat").removeClass("hideBlock");
			$("#catSelectAll").prop("checked",false);//deptDiv
		}
		setDeptCount();
		setCatCount();
		setSCatCount();
		setSegCount();
		
		if(typeof onChangeDeptDropDown === "function"){
			onChangeDeptDropDown();
		}
	});
	//Registers category select all event
	$("#catSelectAll").click(function(event){
		if($('#catSelectAll').is(':checked')){
			$( "input[name='category']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', true);
				}
				
			});
		}else{
			$( "input[name='category']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', false);
					$(this).parent().find('strong').addClass('hideBlock');//To hide the numbers on unselect all
				}
				
			});
			
			$(".subCatgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					$('[id^=seg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			$("#noSelectionSeg").removeClass('hideBlock');
			$("#segSelectAll").prop("checked",false);
			
			$(".catgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					$('[id^=scatg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			$("#noSelectionSub").removeClass("hideBlock");
			$("#sCatSelectAll").prop("checked",false);
			
		}	
		setCatCount();
		setSCatCount();
		setSegCount();
	});
	//Registers sub-category select all event
	$("#sCatSelectAll").click(function(event){
		if($('#sCatSelectAll').is(':checked')){
			$( "input[name='subCat']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', true);
				}
			});
		}else{
			$( "input[name='subCat']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', false);
					$(this).parent().find('strong').addClass('hideBlock');//To hide the numbers on unselect all
				}
			});
			
			$(".subCatgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					$('[id^=seg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			$("#noSelectionSeg").removeClass('hideBlock');
		}
		setSCatCount();
		setSegCount();
	});
	//Registers segment select all event
	$("#segSelectAll").click(function(event){
		if($('#segSelectAll').is(':checked')){
			$( "input[name='segmentList']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', true);
				}
			});
		}else{
			$( "input[name='segmentList']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', false);
				}
			});
		}
		setSegCount();
	});
});

/**
 * Populates values in article hierarchy area
 */
function populateDepartment(depType) {
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
							content += '<li >	<input class="department" '+ (defaultOption ? "checked" : "")+ ' type="'+depType+'" name="departmentList" '
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
						if(typeof selectDefPrimaryDeptList === "function"){
							selectDefPrimaryDeptList();
							setDeptLblBasedOnDefPrimaryDept();
						}
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
							//$("#subCatTotal").addClass('hideBlock');
							//$("#segmentTotal").addClass('hideBlock');

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
							//$("#catSelectAll").prop("checked", false);//Disable cat select all when no cat shown	
							$('[id^=seg-'+selectedValue+']').remove();
							$('[id^=scatg-'+selectedValue+']').remove();
							$('[id^=catg-'+selectedValue+']').remove();
						}
					selUnSelTotdept();
					
					
					
					$('#deptlst').find("li input[type=checkbox]").change(function() {//To select or unselect dept dropdown
						if($(this).is(':checked')){
							$('#depDropDwnList :input[value="'+$(this).attr('id')+'"]').prop('checked', true);
						}else{
							$('#depDropDwnList :input[value="'+$(this).attr('id')+'"]').prop('checked', false);
						}						
						if(typeof onChangeDeptDropDown === "function"){
							onChangeDeptDropDown();
						}
					});				
					
					
					
					setCatCount();
					setSCatCount();
					setSegCount();

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
						$("#segmentLst").addClass('hideBlock');
						//$("#subCatTotal").addClass('hideBlock');
						//$("#segmentTotal").addClass('hideBlock');

						$("#subTotal").text('');
						$("#segmentTotalCnt").text('');


						$('#hierarchyID').val(selectedValue);
						$('#hierarchyLVL').val(3);
						if($(this).is(':checked')){							
							$("#noSelectionSeg").removeClass('hideBlock');
							$("#noSelectionSub").addClass('hideBlock');
							
							callCatSelectService(selectedValue);
						}else{
							$("#noSelectionSeg").removeClass('hideBlock');
							$("#noSelectionSub").removeClass('hideBlock');
							
							$("#sCatSelectAll").prop("checked", false);//Uncheck sub category when no sub cat shown
							$("[lbl-id=" + selectedValue + "]").addClass("hideBlock");//To remove the number label when unselected-Number Inclusion
							
							$('[id^=seg-'+selectedValue+']').remove();
							$('[id^=scatg-'+selectedValue+']').remove();
						}
						selUnSelTotCat($("#"+$(this).attr('depid')));//To check or uncheck total Cat checkbox on change.

						//}
						setSCatCount();
						setSegCount();
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
				/*var a = 4556;
				var totCount = $("input[catid='"+a+"']").length;
				$(this).append('<strong class="number">'+totCount+'</strong>');*/
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
						//$("#segmentTotal").addClass('hideBlock');
						$("#subTotal").text('');

						$('#hierarchyID').val(selectedValue);
						$('#hierarchyLVL').val(4);
						if($(this).is(':checked')){
							callSCatSelectService(selectedValue);
							$("#noSelectionSeg").addClass('hideBlock');
						}else{
							$("#noSelectionSeg").removeClass('hideBlock');
							$("#segSelectAll").prop("checked", false);//Uncheck select all segment when no segement displayed.
							$("[lbl-id=" + selectedValue + "]").addClass("hideBlock");//To remove the number label when unselected-Number Inclusion
							
							$('[id^=seg-'+selectedValue+']').remove();
						}
						selUnSelTotSCat($("#"+$(this).attr('catid')));
						//}
						setSegCount();
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
						$("#catg-"+no).remove();//Removes the old Div
						var content = '';
						var headerName = '';
						if($("#"+no).parent().find(".deptLbl").html()){
							headerName = $("#"+no).parent().find(".deptLbl").html();
						}else{
							headerName = $("#"+no).parent().find(".dropdownLabel").html();
						}
						content += '<div id="catg-'+no+'" class="catgDiv"><ul id="categoryLst">';
						content += '<li><label class="titleText">'+headerName+'</label></li>';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li><input type="checkbox" name="category" class="category" data-tt-id="'
									+ temList[i].node_id
									+ '" depId="'
									+ no
									+ '" id="'
									+ temList[i].node_id
									+ '" value="'
									+ temList[i].node_id
									+ '"/><label class="catgLbl lastColumns">'
									+ temList[i].node_desc
									+ '<strong class="number hideBlock" lbl-id="'+temList[i].node_id+'"></strong></label></li>';
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
						$(".titleText").find('strong').remove();//Removes the number next to titles
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
						$("#scatg-"+no).remove();
						$("[lbl-id=" + selectedValue + "]").removeClass('hideBlock');//To remove the number label when unselected-Number Inclusion
						$("[lbl-id=" + selectedValue + "]").html(temList.length );//To remove the number label when unselected-Number Inclusion
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
									+ '<strong class="number hideBlock" lbl-id="'+temList[i].node_id+'"></strong></label></li>';
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
						$(".titleText").find('strong').remove();//Removes the number next to titles
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
						$("#seg-"+no).remove();
						$("[lbl-id=" + selectedValue + "]").removeClass('hideBlock');//To remove the number label when unselected-Number Inclusion
						$("[lbl-id=" + selectedValue + "]").html(temList.length );//To remove the number label when unselected-Number Inclusion
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
						$(".titleText").find('strong').remove();//Removes the number next to titles
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
	var totCount = 0;	
	$('#deptlst').find('input[type=checkbox]:checked').each(function(){//Executed if Department is of type checkbox
		var temp = $(this).attr('id');
		$('[id^=catg-'+temp+'] input[type=checkbox]:checked').each(function(){
			totCount++;
		});	
	});
	$('#deptlst').find('input[type=radio]:checked').each(function(){//Executed if dept is of type radio button
		var temp = $(this).attr('id');
		$('[id^=catg-'+temp+'] input[type=checkbox]:checked').each(function(){
			totCount++;
		});	
	});
	$("#catLstCnt").text(totCount);//Length of Category List
	
}
/**
 * Sets total sub-categories selected
 */
function setSCatCount(){
	var totCount = 0;
	$('#parentCatDiv strong').each(function(){
		if(!$(this).hasClass("hideBlock")){
			totCount += parseInt($(this).html());
		}
	});
	/*var totCount = 0;	
	$('#categoryLst').find('input[type=checkbox]:checked').each(function(){//Executed if Department is of type checkbox
		var temp = $(this).attr('id');
		$('[id^=scatg-'+temp+'] input[type=checkbox]:checked').each(function(){
			totCount++;
		});	
	});*/
	
	$("#sCatLstCnt").text(totCount);//Length of sub Category List
}
/**
 * Sets total segment selected
 */
function setSegCount(){	
	var totCount = 0;
	$('#parentSCatDiv strong').each(function(){		
		if(!$(this).parent().hasClass("titleText") && !$(this).hasClass("hideBlock")){
			totCount += parseInt($(this).html());
		}
	});
	/*var totCount = 0;	
	$('#subCategoryLst').find('input[type=checkbox]:checked').each(function(){//Executed if Department is of type checkbox
		var temp = $(this).attr('id');
		$('[id^=seg-'+temp+'] input[type=checkbox]:checked').each(function(){
			totCount++;
		});	
	});*/
	
	$("#segLstCnt").text(totCount);//Length of sub Segment List
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
	$("[lbl-id=" + $dept.val() + "]").html(selCat );
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
	$("[lbl-id=" + $cat.val() + "]").html(selSCat );//Number Inclusion
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
	$("[lbl-id=" + $scat.val() + "]").html(selSeg );//Number Inclusion
}

/************************************************Report hierarchy depts chk************************************************/

function generateReportDtl(area){
	selectedListDtl = [];
	createStItemInfoDept = [];
	createStItemInfoCat = [];
	createStItemInfoSubCate = [];
	createStItemInfoSeg= [];
	checkAllDeptSelectedReport(area);
	selectedListDtl.dept = (createStItemInfoDept);
	selectedListDtl.cate = (createStItemInfoCat); 
	selectedListDtl.subcate = (createStItemInfoSubCate); 
	selectedListDtl.seg= (createStItemInfoSeg); 
	console.log(selectedListDtl);
	return selectedListDtl;
}
function checkAllDeptSelectedReport(area){
	area.find("input[name='departmentList']:checked").each(function() {
		var deptId = $(this).val();	
		if(checkAllCatSelectedReport(area, deptId)){
			createStItemInfoDept.push(deptId);
		}
	});
}

function checkAllCatSelectedReport(area, deptId){
	var allSelected = true;	
	var catIdListTemp = [];
	var count = 0;
	var $cat = area.find('#catg-' + deptId);	
	var $checkedCat = $cat.find('input[name="category"]:checked');
	if($checkedCat.length == 0){
		allSelected = true;
	}else{
		$checkedCat.each(function() {
			var catId = $(this).val();
			if(!checkAllSubCatSelectedReport(area, catId, deptId)){	
				var subCatListTemp = getSelSubCatforCat(area, catId);
				if(subCatListTemp.length >0){
					for ( var i = 0; i < subCatListTemp.length; i++) {
						createStItemInfoSubCate.push(subCatListTemp[i]);
					}	
				}
				allSelected = false;
			}else{
				catIdListTemp.push(catId);
				count ++;
			}
		});
	}
	if(count != $cat.find('input[name="category"]').length){
		if(count >0){
			for ( var i = 0; i < catIdListTemp.length; i++) {	
				createStItemInfoCat.push(catIdListTemp[i]);
			}	
		}		
		allSelected = false;
	}

	return allSelected;
}
function checkAllSubCatSelectedReport(area, catId, deptId){
	var allSelected = true;
	var subCatIdListTemp = [];
	var count = 0;
	var $subCat = area.find('#scatg-'+ catId);	
	var $checkedSubCat = $subCat.find('input[name="subCat"]:checked');
	if($checkedSubCat.length == 0){
		allSelected = true;	
	}else{
		$checkedSubCat.each(function() {
			var subCatId = $(this).val();
			if(!checkAllSegSelectedReport(area, subCatId)){	
				var temp = getSelSegforSubCat(area, subCatId);
				if(temp.length >0){
					for ( var i = 0; i < temp.length; i++) {
						createStItemInfoSeg.push(temp[i]);
					}
				}
				allSelected = false;
			}else{
				subCatIdListTemp.push(subCatId);			
				count++;
			}
		});

	}
	if(count != $subCat.find('input[name="subCat"]').length){
		if(count >0){
			for ( var i = 0; i < subCatIdListTemp.length; i++) {
				createStItemInfoSubCate.push(subCatIdListTemp[i]);
			}
		}
		allSelected = false;
	}
	return allSelected;
}
function checkAllSegSelectedReport(area, subCatId){
	var $seg = area.find('#seg-'+ subCatId);		
	var $checkedSeg = $seg.find('input[name="segmentList"]:checked');
	if($checkedSeg.length == 0 || $checkedSeg.length == $seg.find('input[name="segmentList"]').length){
		return true;
	}else return false;
}
function getSelSubCatforCat(area, catId){
	var subCatList =[];
	var $subCat = area.find('#scatg-'+ catId);
	var $checkedCat = $subCat.find('input[name="category"]:checked');	
	$checkedCat.each(function() {
		subCatList.push($(this).val());
	});
	return subCatList;
}

function getSelSegforSubCat(area, subCatId){
	var segIdList =[];
	var $seg = area.find('#seg-'+ subCatId);
	var $checkedSubCat = $seg.find('input[name="segmentList"]:checked');
	$checkedSubCat.each(function() {
		segIdList.push($(this).val());
	});
	return segIdList;
}
