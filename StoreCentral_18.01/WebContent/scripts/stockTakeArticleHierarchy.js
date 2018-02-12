
function bindSelectAllArticleEvents(area){
	//Registers Department select all event
	area.find(".deptSelectAll").click(function(event){
		if(area.find('.deptSelectAll').is(':checked')){
			area.find( "input[name='departmentList']" ).each(function(){
				$(this).prop('checked', true);
			});
			area.find('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', true);
			});
		}else{
			area.find( "input[name='departmentList']" ).each(function(){
				$(this).prop('checked', false);
			});
			area.find('.dropdown').find("input[type=checkbox]").each(function() {
				$(this).prop('checked', false);
			});
			area.find('.parentSCatDiv,.parentCatDiv,.parentSegDiv').empty();
			area.find('.noSelectionCat,.noSelectionSub,.noSelectionSeg').removeClass('hideBlock');
			area.find('.catLstCnt,.sCatLstCnt,.segLstCnt').text('0');
			area.find('.sCatSelectAll,.catSelectAll,.segSelectAll').prop('checked',false);
			/*area.find(".subCatgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					$('[id^=seg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			area.find(".noSelectionSeg").removeClass('hideBlock');
			area.find(".segSelectAll").prop("checked",false);
			
			area.find(".catgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					$('[id^=scatg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			area.find(".noSelectionSub").removeClass("hideBlock");
			area.find(".sCatSelectAll").prop("checked",false);
			
			
			area.find('[id^=catg-]').each(function(){
				$(this).remove();
			});
			
			area.find(".noSelectionCat").removeClass("hideBlock");
			area.find(".catSelectAll").prop("checked",false);*/
		}
		setDeptCount(area);
		setCatCount(area);
		setSCatCount(area);
		setSegCount(area);
		enableDisableExcludeArticles();
	});
	//Registers category select all event
	area.find(".catSelectAll").click(function(event){
		if(area.find('.catSelectAll').is(':checked')){
			area.find( "input[name='category']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', true);
				}
				
			});
		}else{
			area.find( "input[name='category']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', false);
					$(this).parent().find('strong').addClass('hideBlock');//To hide the numbers on unselect all
				}
				
			});
			
			area.find(".subCatgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					$('[id^=seg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			area.find(".noSelectionSeg").removeClass('hideBlock');
			area.find(".segSelectAll").prop("checked",false);
			
			area.find(".catgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					area.find('[id^=scatg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			area.find(".noSelectionSub").removeClass("hideBlock");
			area.find(".sCatSelectAll").prop("checked",false);
			
		}	
		setCatCount(area);
		setSCatCount(area);
		setSegCount(area);
	});
	//Registers sub-category select all event
	area.find(".sCatSelectAll").click(function(event){
		if(area.find('.sCatSelectAll').is(':checked')){
			var $parent = '';
			var totCount = 0;
			area.find( "input[name='subCat']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$parent = $("#"+$(this).attr('catid'));
					$(this).prop('checked', true);
					totCount++;//find the no of items checked
				}
			});
			//to change the number on parent of unslected sub-cat
			$parent.parent().find('strong').text(totCount);
		}else{
			var $parent = '';
			area.find( "input[name='subCat']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$parent = $("#"+$(this).attr('catid'));
					$(this).prop('checked', false);
					$(this).parent().find('strong').addClass('hideBlock');//To hide the numbers on unselect all
				}
			});
			//to change the number on parent of unslected sub-cat
			$parent.parent().find('strong').text('0');
			
			area.find(".subCatgDiv").each(function(){
				if(!$(this).hasClass("hideBlock")){
					var temp = $(this).attr('id').split("-")[1];
					$('[id^=seg-'+temp+']').each(function(){
						$(this).remove();
					});
				}
			});
			area.find(".noSelectionSeg").removeClass('hideBlock');
		}
		setSCatCount(area);
		setSegCount(area);
	});
	//Registers segment select all event
	area.find(".segSelectAll").click(function(event){
		if(area.find('.segSelectAll').is(':checked')){
			area.find( "input[name='segmentList']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', true);
				}
			});
		}else{
			area.find( "input[name='segmentList']" ).each(function(){
				if(!$(this).parent().parent().parent().hasClass('hideBlock')){
					$(this).prop('checked', false);
				}
			});
		}
		setSegCount(area);
	});
}

/**
 * Populates values in article hierarchy area
 * 
 * Default Flag is set to true if the article hierarchy has to be prepopulated. This is applicable in edit screen alone.
 */
function populateDepartment(area,depType,editFlag, createPage) {
	articleHierArea = area;
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : "ALL DEPARTMENTS",
		"iv_platform" : "B",
		"iv_session_id" : "100"
	};
	if(responseDeptDropDown == undefined || responseDeptDropDown == ''){
	console.log(gethierarchyDetailsST + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetailsST,
				data : JSON.stringify(param),
				success : function(response) {
					responseDeptDropDown = response;
					formDeptArticleHierContent(area,depType,editFlag, createPage);
				},
				error : function(response) {
				},
			});
	}else{
		formDeptArticleHierContent(area,depType,editFlag, createPage);
	}

}
function formDeptArticleHierContent(area,depType,editFlag, createPage){
	var temList = responseDeptDropDown;
	if (temList.length > 0) {
		var content = '';
		for ( var i = 0; i < temList.length; i++) {
			content += '<li >	<input class="department" data_fresh_food_flag="'+(temList[i].fresh_food_flag||'Y')+'" type="'+depType+'" name="departmentList" '
					+ 'value="'
					+ temList[i].node_id
					+ '" id="'
					+ temList[i].node_id
					+ '">'
					+ '<label class="labelText deptLbl">'
					+ temList[i].node_desc + '</label></li>';
		}
		area.find('.deptlst').html(content);
		if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
			area.find('.department').prop('type','radio');
			area.find(".deptSelectAll").addClass("hideBlock");
			area.find(".catSelectAll").addClass("hideBlock");
			area.find(".deptLstCnt").parent().addClass("hideBlock");
			$("#baseCountFilterButtonDiv").find('#filterOpen').addClass('hideBlock');
		}else{
			area.find('.department').prop('type','checkbox');
			area.find(".deptSelectAll").removeClass("hideBlock").prop('type','checkbox');
			area.find(".catSelectAll").removeClass("hideBlock");
			area.find(".deptLstCnt").parent().removeClass("hideBlock");
			$("#baseCountFilterButtonDiv").find('#filterOpen').removeClass('hideBlock');
		}
		if(createPage){
			selectDefPrimaryDepts("createSTDeptDrpDwnUl",area,"createSTDeptDrpDwnLabel");//to default primary depts
			bindAfterArticleHierarchyReady(area,"createSTDeptDrpDwnUl","createSTallDeptChkBox","createSTDeptDrpDwnLabel");
		}
		//area.find(".deptLstCnt").text(temList.length);
		if(editFlag){
			area.find('.deptlst input[name="departmentList"]').each(function(){
				if(deptSet[$(this).val()]){
					$(this).prop('checked',true).addClass('prepopulated');
					delete deptSet[$(this).val()];
				}
			});
		}
		bindDepartmentSelectEvent(area, editFlag);
	}
}
/**
 * Binds deparment select event
 */
function bindDepartmentSelectEvent(area, editFlag) {
	selUnSelTotdept(area);
	area.find('.department')
			.on(
					'click',
					function() {
						enableDisableExcludeArticles();		
						var deptCount = area.find("[name='departmentList']:checked").length;
						if(deptCount > 0){
							 area.find(".deptSelectAll").removeAttr("disabled");
						}
						area.find(".deptLstCnt").text(deptCount);//Length of Dept List
						
						
						
						var selectedValue = this.id.toString();
//						if (selectedValue != $('.hierarchyID').val()) {
						
													
							area.find(".catgDiv").addClass('hideBlock');
							area.find(".segmentDiv").addClass('hideBlock');
							area.find(".subCatgDiv").addClass('hideBlock');
							area.find(".noSelectionSeg").removeClass('hideBlock');
							area.find(".noSelectionSub").removeClass('hideBlock');
							$(".segmentLst").addClass('hideBlock');
							// my line
							//area.find(".subCatTotal").addClass('hideBlock');
							//area.find(".segmentTotal").addClass('hideBlock');
							if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
								area.find('.parentSCatDiv,.parentCatDiv,.parentSegDiv').empty();
							}
							area.find(".catLstCnt").text('');
							area.find(".sCatLstCnt").text('');
							area.find(".segLstCnt").text('');

							$('#hierarchyID').val(selectedValue);
							$('#hierarchyLVL').val(2);
							
						if($(this).is(':checked')){
							// category ajax call
							var $dept = $(this).siblings('input[type="checkbox"]');
							callDepartmentSelectService(area,selectedValue,editFlag,$dept);
							area.find(".noSelectionCat").addClass('hideBlock');
							if(editFlag){
								//addDeptToArray(selectedValue, false);
							}
													
						}else{
							if(editFlag){
								/*addDeptToArray(selectedValue, true);
								area.find('[id^=seg-'+selectedValue+']').find('input[name="segmentList"]').each(function(){
									addSegToArray($(this).val(), true); 
								});
								
								area.find('[id^=scatg-'+selectedValue+']').find('input[name="subCat"]').each(function(){
									addScatToArray($(this).val(), true); 
								});
								
								area.find('[id^=catg-'+selectedValue+']').find('input[name="category"]').each(function(){
									addCatgToArray($(this).val(), true); 
								});*/
							}
							area.find(".noSelectionCat").removeClass('hideBlock');	
							area.find('[id^=seg-'+selectedValue+']').remove();
							area.find('[id^=scatg-'+selectedValue+']').remove();
							area.find('[id^=catg-'+selectedValue+']').remove();
							//$(".catSelectAll").prop("checked", false);//Disable cat select all when no cat shown							
						}
					selUnSelTotdept(area);
					area.find('.deptlst').find("li input[type=checkbox]").change(function() {//To select or unselect dept dropdown
						if(area.find('#depDropDwnList')!=undefined && area.find('#depDropDwnList').length>0){
							if($(this).is(':checked')){
								area.find('#depDropDwnList :input[value="'+$(this).attr('id')+'"]').prop('checked', true);
							}else{
								area.find('#depDropDwnList :input[value="'+$(this).attr('id')+'"]').prop('checked', false);
							}
						}
					});				
					setCatCount(area);
					setSCatCount(area);
					setSegCount(area);

					});
	
	area.find('.deptLbl')
	.on(
			'click',
			function() {
							
				var $dept = $(this).siblings('input[type="checkbox"]');
				
				if($dept.prop('checked')){
					area.find('.catDiv').find('.catgDiv').addClass('hideBlock');
					area.find('.parentSCatDiv').find('.subCatgDiv').addClass('hideBlock');
					area.find('.segDiv').find('.segmentDiv').addClass('hideBlock');
					area.find(".noSelectionSeg").removeClass('hideBlock');
					area.find(".noSelectionSub").removeClass('hideBlock');
					if(area.find('.catDiv').find('#catg-' + $dept.val()).length != 0){
						area.find('.catDiv').find('#catg-' + $dept.val()).removeClass('hideBlock');
						selUnSelTotCat(area,$dept);
						
					}else{
						callDepartmentSelectService(area,$dept.attr('id'), editFlag,$dept);
					}
					area.find(".noSelectionCat").addClass('hideBlock');
				}else{
					area.find('.catDiv').find('.catgDiv').addClass('hideBlock');
					area.find('.subCatgDiv,.segmentDiv').addClass('hideBlock');
					area.find(".noSelectionCat,.noSelectionSub,.noSelectionSeg").removeClass('hideBlock');
				}
			});
}

/**
 * Binds category select event
 */
function bindCategorySelectEvent(area, editFlag) {	
			area.find('.category')
					.on(
						'click',
								function() {

						var selectedValue = this.id.toString();
//						if (selectedValue != $('#hierarchyID').val()) {
						
						
						
						area.find(".segmentDiv").addClass('hideBlock');
						area.find(".subCatgDiv").addClass('hideBlock');						
						area.find(".segmentLst").addClass('hideBlock');
						//$(".subCatTotal").addClass('hideBlock');
						//$(".segmentTotal").addClass('hideBlock');
						if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
							area.find('.parentSCatDiv,.parentSegDiv').empty();
						}
						area.find(".subTotal").text('');
						area.find(".segmentTotalCnt").text('');


						$('#hierarchyID').val(selectedValue);
						$('#hierarchyLVL').val(3);
						if($(this).is(':checked')){							
							area.find(".noSelectionSeg").removeClass('hideBlock');
							area.find(".noSelectionSub").addClass('hideBlock');
							
							callCatSelectService(area,selectedValue,editFlag,$(this));
							
							if(editFlag){
								//addCatgToArray(selectedValue, false);
							}
						}else{
							if(editFlag){
								/*addCatgToArray(selectedValue, true);
								
								area.find('[id^=seg-'+selectedValue+']').find('input[name="segmentList"]').each(function(){
									addSegToArray($(this).val(), true); 
								});
								
								area.find('[id^=scatg-'+selectedValue+']').find('input[name="subCat"]').each(function(){
									addScatToArray($(this).val(), true); 
								});*/
							}
							area.find(".noSelectionSeg").removeClass('hideBlock');
							area.find(".noSelectionSub").removeClass('hideBlock');
							
							area.find('[id^=seg-'+selectedValue+']').remove();
							area.find('[id^=scatg-'+selectedValue+']').remove();
							
							area.find(".sCatSelectAll").prop("checked", false);//Uncheck sub category when no sub cat shown
							area.find("[lbl-id=" + selectedValue + "]").addClass("hideBlock");//To remove the number label when unselected-Number Inclusion							
						}
						if(editFlag){//if all cat unslected unselect the corresponding dept
							if($(this).is('checked') && area.find('.catDiv').find('.catLstCnt').text() == "0"){
								var parentid = $(this).attr('depid');
								area.find("#"+parentid).prop("checked",false);
							}
						}
						selUnSelTotCat(area,$("#"+$(this).attr('depid')));//To check or uncheck total Cat checkbox on change.

						//}

						setCatCount(area);
						setSCatCount(area);
						setSegCount(area);
					});
	
	area.find('.catgLbl')
	.on(
			'click',
			function() {				
				var $catg = $(this).siblings('input[type="checkbox"]');
				
				if($catg.prop('checked')){
					area.find('.parentSCatDiv').find('.subCatgDiv').addClass('hideBlock');
					area.find('.segDiv').find('.segmentDiv').addClass('hideBlock');
					area.find(".noSelectionSub").removeClass('hideBlock');
					area.find(".noSelectionSeg").removeClass('hideBlock');
					if(area.find('.parentSCatDiv').find('#scatg-' + $catg.val()).length != 0){
						area.find('.parentSCatDiv').find('#scatg-' + $catg.val()).removeClass('hideBlock');
						selUnSelTotSCat(area,$catg);
					}else{
						callCatSelectService(area,$catg.attr('id'), editFlag,$catg);
					}
					area.find(".noSelectionSub").addClass('hideBlock');
				}else{
					area.find('.parentSCatDiv').find('.subCatgDiv').addClass('hideBlock');
					area.find(".noSelectionSub").removeClass('hideBlock');
				}
				/*var a = 4556;
				var totCount = $("input[catid='"+a+"']").length;
				$(this).append('<strong class="number">'+totCount+'</strong>');*/
				setCatCount(area);
				setSCatCount(area);
				setSegCount(area);
		});

}

/**
 * Bind sub-category select event
 */
function bindSubCategorySelectEvent(area, editFlag) {
	
	area.find('.subCat')
				.on(
					'click',
							function() {
						var selectedValue = this.id.toString();	
						
						area.find(".segmentDiv").addClass('hideBlock');
						//$("#segmentTotal").addClass('hideBlock');
						area.find(".subTotal").text('');

						$('#hierarchyID').val(selectedValue);
						$('#hierarchyLVL').val(4);
						if($(this).is(':checked')){
							callSCatSelectService(area,selectedValue,editFlag,$("#"+$(this).attr('id')));
							area.find(".noSelectionSeg").addClass('hideBlock');
							if(editFlag){
								//addScatToArray(selectedValue, false);
							}
						}else{
							if(editFlag){
								/*addScatToArray(selectedValue, true);
								
								area.find('[id^=seg-'+selectedValue+']').find('input[name="segmentList"]').each(function(){
									addSegToArray($(this).val(), true); 
								});*/
							}
							area.find(".noSelectionSeg").removeClass('hideBlock');
							area.find(".segSelectAll").prop("checked", false);//Uncheck select all segment when no segement displayed.
							area.find("[lbl-id=" + selectedValue + "]").addClass("hideBlock");//To remove the number label when unselected-Number Inclusion
							
							area.find('[id^=seg-'+selectedValue+']').remove();
						}
						if(editFlag){//if all sub-cat unslected unselect the corresponding cat
							if($(this).is('checked') && area.find('.subCatDiv').find('.sCatLstCnt').text() == "0"){
								var parentid = $(this).attr('catid');
								area.find("#"+parentid).prop("checked",false);
							}
						}
						selUnSelTotSCat(area,$("#"+$(this).attr('catid')));
						//}
						setSegCount(area);
						setSCatCount(area);
						
					});
	
	area.find('.scatgLbl')
	.on(
			'click',
			function() {
				var $scatg = $(this).siblings('input[type="checkbox"]');
				
				if($scatg.prop('checked')){
					area.find('.segDiv').find('.segmentDiv').addClass('hideBlock');
					if(area.find('.segDiv').find('#seg-' + $scatg.val()).length != 0){
						area.find('.segDiv').find('#seg-' + $scatg.val()).removeClass('hideBlock');
						selUnSelTotSeg(area,$scatg);
					}else{
						callSCatSelectService(area,$scatg.attr('id'), editFlag,$scatg);
					}
					area.find(".noSelectionSeg").addClass('hideBlock');
				}else{
					area.find('.segDiv').find('.segmentDiv').addClass('hideBlock');
					area.find(".noSelectionSeg").removeClass('hideBlock');
				}
				selUnSelTotSCat(area,$("#"+$(this).attr('catid')));
				setSegCount(area);
		});
	
	
}

/**
 * Binds segment select event
 */
function bindSegmentSelectEvent(area,editFlag) {	
		area.find('.segment').on('click',function() {
			if(editFlag){
				if($(this).is('checked')){
					//addSegToArray(selectedValue, false);
				} else {
					//addSegToArray(selectedValue, true);
				}
			}
			if(editFlag){//if all seg unslected unselect the corresponding sub-cat
				if($(this).is('checked') && area.find('.segDiv').find('.segLstCnt').text() == "0"){
					var parentid = $(this).attr('scatid');
					area.find("#"+parentid).prop("checked",false);
				}
			}
			selUnSelTotSeg(area,$("#"+$(this).attr('scatid')));
			setSegCount(area);
		});
}
/**
 * Invokes service on selection of department
 * @param selectedValue
 */
function callDepartmentSelectService(area,selectedValue, editFlag,$dept){
	var so = $('#salesOrg').val();
	var no = selectedValue;
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : no,
		"iv_platform" : "B",
		"iv_session_id" : "100"
	};
	console.log('get category' + gethierarchyDetailsST + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetailsST,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						area.find("#catg-"+no).remove();//Removes the old Div
						var content = '';
						var headerName = area.find("[name='departmentList'][value='"+no+"']").parent().find(".deptLbl").html();
						
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
						area.find('.parentCatDiv').append(content);
						if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
							area.find('.category').prop('type','radio');
							area.find(".catSelectAll").addClass('hideBlock');
						}else{
							area.find(".catSelectAll").removeClass('hideBlock');
						}
						area.find(".catLstCnt").text(
								temList.length);
						area.find(".categoryLstTotal")
								.removeClass(
										'hideBlock');
						if(area.find('.parentCatDiv').length != 0 && (!isNationalStocktake || (isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') == 'varianceReportArticleHierarchyId'))){
							area.find(".catSelectAll").removeAttr("disabled");
							area.find('.catSelectAll').prop('checked',false);//By default should be select all
							if(editFlag){
								selectCategoryForEdit(area,selectedValue);
							} else {
								area.find('.catSelectAll').trigger('click');//By default should be select all
							}
							area.find(".sCatSelectAll").attr("disabled", true);
							area.find(".segSelectAll").attr("disabled", true);
						}
						 area.find(".category").unbind().click(function() {});
						 area.find(".catgLbl").unbind().click(function() {});
						 
						bindCategorySelectEvent(area, editFlag);
						area.find(".titleText").find('strong').remove();//Removes the number next to titles
						selUnSelTotCat(area,$dept);
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
function callCatSelectService(area,selectedValue,editFlag,$catg){
	var so = $('#salesOrg').val();
	var no = selectedValue;
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : no,
		"iv_platform" : "B",
		"iv_session_id" : "100"
	};
	
	console.log('get sub category' + gethierarchyDetailsST + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetailsST,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						area.find("#scatg-"+no).remove();
						area.find("[lbl-id=" + selectedValue + "]").removeClass('hideBlock');//To remove the number label when unselected-Number Inclusion
						area.find("[lbl-id=" + selectedValue + "]").html(temList.length );//To remove the number label when unselected-Number Inclusion
						var content = '';
						content += '<div id="scatg-'+no+'" class="subCatgDiv"><ul id="subCategoryLst">';
						content += '<li><label class="titleText">'+area.find("#"+no).parent().find(".catgLbl").html();+'</label></li>';
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
						if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
							area.find('.parentSCatDiv').html(
									content);
						}else{
							area.find('.parentSCatDiv').append(
									content);
						}
						area.find(".subTotal").text(
								temList.length);
						area.find(".subCatTotal").removeClass(
								'hideBlock');
						if(area.find('.parentSCatDiv').length != 0 && (!isNationalStocktake || (isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') == 'varianceReportArticleHierarchyId'))){
							area.find(".sCatSelectAll").removeAttr("disabled");
							area.find('.sCatSelectAll').prop('checked',false);//By default should be select all
							if(editFlag){
								selectSubCategoryForEdit(area);
							} else {
							area.find('.sCatSelectAll').trigger('click');//By default should be select all
							}
							area.find(".segSelectAll").attr("disabled", true);
						}
						 area.find(".subCat").unbind().click(function() {});
						 area.find(".subCatLbl").unbind().click(function() {});
						bindSubCategorySelectEvent(area, editFlag);
						area.find(".titleText").find('strong').remove();//Removes the number next to titles
						selUnSelTotSCat(area,$catg);
						setCatCount(area);
						setSCatCount(area);
						setSegCount(area);
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
function callSCatSelectService(area,selectedValue,editFlag,$scatg){
	var so = $('#salesOrg').val();
	var no = selectedValue;
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : no,
		"iv_platform" : "B",
		"iv_session_id" : "100"
	};

	console.log('get segment' + gethierarchyDetailsST + ' ' + JSON.stringify(param));
	
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetailsST,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						area.find("#seg-"+no).remove();
						area.find("[lbl-id=" + selectedValue + "]").removeClass('hideBlock');//To remove the number label when unselected-Number Inclusion
						area.find("[lbl-id=" + selectedValue + "]").html(temList.length );//To remove the number label when unselected-Number Inclusion
						var content = '';
						content += '<div id="seg-'+no+'" class="segmentDiv"><ul id="segmentLst">';
						content += '<li><label class="titleText">'+area.find("#"+no).parent().find(".scatgLbl").html();+'</label></li>';
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
						area.find('.parentSegDiv').append(content);
						area.find(".segmentTotalCnt").text(
								temList.length);
						area.find(".segmentTotal").removeClass(
								'hideBlock');
						 area.find(".segment").unbind().click(function() {});
						bindSegmentSelectEvent(area,editFlag);
						area.find(".titleText").find('strong').remove();//Removes the number next to titles
						if(area.find('.parentSegDiv').length != 0){
							area.find(".segSelectAll").removeAttr("disabled");
							area.find('.segSelectAll').prop('checked',false);//By default should be select all
							if(editFlag){
								selectSegmentForEdit(area);
							} else {
								area.find('.segSelectAll').trigger('click');//By default should be select all
							}	
						}
						//selUnSelTotSCat(area,$scatg);
						selUnSelTotSeg(area,$scatg);
						//}
						setSCatCount(area);
						setSegCount(area);
					}
				},
				error : function(response) {

				},
			});
}	
/**
 * Sets total departments selected
 */
function setDeptCount(area){
	if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
		area.find(".deptLstCnt").parent().addClass('hideBlock');//Length of Category List
		return;
	}else{
		area.find(".deptLstCnt").parent().removeClass('hideBlock');//Length of Category List
	}
	var deptCount = area.find("[name='departmentList']:checked").length;	
	area.find(".deptLstCnt").text(deptCount);//Length of Dept List
}
/**
 * Sets total categories selected
 */
function setCatCount(area){//total count is nothing but the tot vals selecte including hidden ones
	if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
		area.find(".catLstCnt").parent().addClass('hideBlock');//Length of Category List
		return;
	}else{
		area.find(".catLstCnt").parent().removeClass('hideBlock');//Length of Category List
	}
	var totCount = 0;
	area.find('.deptlst').find('input[type=checkbox]:checked').each(function(){//Executed if Department is of type checkbox
		var temp = $(this).attr('id');
		area.find('[id^=catg-'+temp+'] input[type=checkbox]:checked').each(function(){
			totCount++;
		});	
	});
	area.find('.deptlst').find('input[type=radio]:checked').each(function(){//Executed if dept is of type radio button
		var temp = $(this).attr('id');
		area.find('[id^=catg-'+temp+'] input[type=checkbox]:checked').each(function(){
			totCount++;
		});	
	});
	area.find(".catLstCnt").text(totCount);//Length of Category List
	
}
/**
 * Sets total sub-categories selected
 */
function setSCatCount(area){
	if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
		area.find(".sCatLstCnt").text(area.find("#subCategoryLst").find("input[type='checkbox']:checked").length);
	}else{
	
	var totCount = 0;
	area.find('.parentCatDiv strong').each(function(){
		if(!$(this).hasClass("hideBlock")){
			totCount += parseInt($(this).html());
		}
	});
	
	area.find(".sCatLstCnt").text(totCount);//Length of sub Category List
	}
}
/**
 * Sets total segment selected
 */
function setSegCount(area){	
	var totCount = 0;
	area.find('.parentSCatDiv strong').each(function(){
		if(!$(this).parent().hasClass("titleText") && !$(this).hasClass("hideBlock")){
			totCount += parseInt($(this).html());
		}
	});
	
	area.find(".segLstCnt").text(totCount);//Length of sub Segment List
	
	
}
/**
 * Invoked on click of select all departmet check box
 */
function selUnSelTotdept(area){
	var totDep = area.find('.deptlst').find('input[type=checkbox]').length;
	var selDep = area.find('.deptlst').find('input[type=checkbox]:checked').length;
	if(totDep == selDep){
		area.find(".deptSelectAll").prop('checked',true);
	}else{
		area.find(".deptSelectAll").prop('checked',false);
	}
	area.find('.deptLstCnt').text(area.find('.deptlst').find('input[name="departmentList"]:checked').length);
}
/**
 * Invoked on click of select all category check box
 * @param $dept
 */
function selUnSelTotCat(area,$dept){
	var totCat = area.find('.catDiv').find('#catg-' + $dept.val()).find('input[type=checkbox]').length;
	var selCat = area.find('.catDiv').find('#catg-' + $dept.val()).find('input[type=checkbox]:checked').length;
	if(totCat== selCat){
		area.find(".catSelectAll").prop('checked',true);
	}else{
		area.find(".catSelectAll").prop('checked',false);
	}
	//if(!isNationalStocktake){
	area.find("[lbl-id=" + $dept.val() + "]").html(selCat );
	//}
	if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
		area.find("[lbl-id=" + $dept.val() + "]").addClass('hideBlock');
	}else{
		area.find("[lbl-id=" + $dept.val() + "]").removeClass('hideBlock');
	}
}
/**
 * Invoked on click of select all sub-category check box
 * @param $cat
 */
function selUnSelTotSCat(area,$cat){
	var totSCat = area.find('.parentSCatDiv').find('#scatg-' + $cat.val()).find('input[type=checkbox]').length;
	var selSCat = area.find('.parentSCatDiv').find('#scatg-' + $cat.val()).find('input[type=checkbox]:checked').length;
	if(totSCat == selSCat && selSCat!=0){
		area.find(".sCatSelectAll").prop('checked',true);
	}else{
		area.find(".sCatSelectAll").prop('checked',false);
	}
	area.find("[lbl-id=" + $cat.val() + "]").html(selSCat );//Number Inclusion
	if(isNationalStocktake  && area.attr('id')!=undefined && area.attr('id') != 'varianceReportArticleHierarchyId'){
		area.find("[lbl-id=" + $cat.val() + "]").addClass('hideBlock');
	}else{
		area.find("[lbl-id=" + $cat.val() + "]").removeClass('hideBlock');
	}
	
}
/**
 * Invoked on click of select all segment check box
 * @param $scat
 */
function selUnSelTotSeg(area,$scat){
	var totSeg = area.find('.segDiv').find('#seg-' + $scat.val()).find('input[type=checkbox]').length;
	var selSeg = area.find('.segDiv').find('#seg-' + $scat.val()).find('input[type=checkbox]:checked').length;
	if(totSeg == selSeg && selSeg!=0){
		area.find(".segSelectAll").prop('checked',true);
	}else{
		area.find(".segSelectAll").prop('checked',false);
	}
	area.find("[lbl-id=" + $scat.val() + "]").html(selSeg );//Number Inclusion
}

function selectCategoryForEdit(area,selectedValue){
	area.find('#categoryLst input[name="category"]').each(function(){
		if(catSet[$(this).val()] || catSet.length == 0){
			$(this).prop('checked',true).addClass('prepopulated');
			delete catSet[$(this).val()];
		}
	});
}

function selectSubCategoryForEdit(area,selectedValue){
	area.find('#subCategoryLst input[name="subCat"]').each(function(){
		if(scatSet[$(this).val()] || scatSet.length == 0){
			$(this).prop('checked',true).addClass('prepopulated');
			delete scatSet[$(this).val()];
		}
	});
}

function selectSegmentForEdit(area,selectedValue){
	area.find('#segmentLst input[name="segmentList"]').each(function(){
		if(segSet[$(this).val()] || segSet.length == 0){
			$(this).prop('checked',true).addClass('prepopulated');
			delete segSet[$(this).val()];
		}
	});
}