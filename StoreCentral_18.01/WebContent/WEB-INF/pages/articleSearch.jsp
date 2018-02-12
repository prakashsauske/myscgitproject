<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link rel="stylesheet" href="../../styles/jquery.treetable.css?version=${properties.version}" />
<link rel="stylesheet"
	href="../../styles/jquery.treetable.theme.default.css?version=${properties.version}" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>

<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>

<title>Article Lookup</title>

<script>
	$(document).ready(function() {

		
		//document.forms[0].autocomplete="off";
		$(window).resize(function() {
			if($(document).height()==$(window).height() || $(document).height()==($(window).height())+1)
				$('.scrollup').hide();
			else
				$('.scrollup').show();
		});
		$(".sortTable").tablesort();
		
		$("#expandable-table").treetable({
			expandable: true
			
		});

		$("#expandable-table").click(function(){
			setTimeout(function(){
				if($(document).height()==$(window).height() || $(document).height()==($(window).height())+1)
					$('.scrollup').hide();
				else
					$('.scrollup').show();
				},500);
		});
		
		/*----------------******  Department Click function   *****--------------- */
		$("#deptLstCnt").text($("#deptlst li").size());
		deptFlag="Null";
		var nodeDesc=0;
		$('.department').on('click',function() {
			$("#segmentLst").addClass('hideBlock');
			$("#segmentBtn").addClass('hideBlock');
			$("#subCategoryLst").addClass('hideBlock');
			$("#segment").removeClass('hideBlock'); 
			$("#subCat").removeClass('hideBlock');
			$("#noSelectionCat").addClass('hideBlock');
			$("#segmentLst").addClass('hideBlock');
			$("#subCategoryLst").addClass('hideBlock');
			//my line
			$("#subCatTotal").addClass('hideBlock');
			$("#segmentTotal").addClass('hideBlock');
			
			$("#categoryLst").removeClass('hideBlock');
			$("#categoryLst").empty();
			$("#categoryLstCnt").text('');
			$("#subTotal").text('');
			$("#segmentTotalCnt").text('');
			var selectedValue = this.id.toString();	
			var selectedValueId = "#"+this.id;
			var departmentStr="";
			var i=1;
			
			//if(deptFlag!=selectedValue){
			var deptHierarchyId=parseInt($(selectedValueId).attr('data-tt-id'));		
			var servletUrl = 'fetchDetails.htm?iv_parent_node='	+ selectedValue;
			var c=0;
			$.getJSON(servletUrl,function(options) {

				if (options) {
					$.map(options.categoryInfoList,function(item) {
						nodeID=deptHierarchyId+"."+i;
						nodeIdTemp=nodeID+".1";
						departmentStr='<li><input type="radio" name="category" class="category" data-tt-id="'+nodeID+'" data-tt-parent-id="'+deptHierarchyId+'" id="'+item.node+'" value="'+item.node+'"/><label for="'+item.node+'" class="lastColumn">'+item.nodeDesc+'</label></li>';
						$("#categoryLst").append(departmentStr);
						i++;
						deptFlag=selectedValue;
						$("#categoryLstTotal").removeClass('hideBlock');
						$("#categoryLstCnt").text($("#categoryLst li").size());
					});
				}
			});
			//}
			
		});
		/*----------------******  End Department Click function   *****--------------- */
		
		/*----------------******  Category Click function   *****--------------- */
		catFlag="Null";
		$(document).on("click", ".category", function(){ 
	       
	        $("#segmentLst").addClass('hideBlock');
	        $("#segmentBtn").addClass('hideBlock');
	        $("#segment").removeClass('hideBlock');
	        //my line
	        $("#segmentTotal").addClass('hideBlock');
	        
	        $("#subCategoryLst").empty(); 
	        $("#subTotal").text('');
	        $("#segmentTotalCnt").text('');
			$('#subCat').addClass('hideBlock');
			$('#subCategoryLst').removeClass('hideBlock');
			var selectedValue = this.id.toString();	
			var selectedValueId = "#"+this.id;
			var categoryStr="";
			var i=1;
			//if(catFlag!=selectedValue){/
			var catHierarchyId=($(selectedValueId).attr('data-tt-id'));
			var servletUrl = 'fetchSubCategoryDetails.htm?iv_parent_node='	+ selectedValue;
			$.getJSON(servletUrl,function(options) {
				
				if (options) {
					$.map(options.subCategoryInfoList,function(item) {
						nodeID=catHierarchyId+"."+i;
						nodeIdTemp=nodeID+".1";
						categoryStr='<li><input type="radio" name="subCat" class="subCat" data-tt-id="'+nodeID+'" data-tt-parent-id="'+catHierarchyId+'" id="'+item.node+'" value="'+item.node+'"/><label for="'+item.node+'" class="lastColumn">'+item.nodeDesc+'</label></li>';
						$('#subCategoryLst').append(categoryStr);
						i++;
						catFlag=selectedValue;
						$("#subCatTotal").removeClass('hideBlock');
						$("#subTotal").text($("#subCategoryLst li").size());	
					});
					$('#segmentBtn').removeClass('hideBlock');
				}
			});
			//}
			
			});
		/*----------------******  End Category Click function   *****--------------- */		
		/*----------------******  SubCategory Click function   *****---------------- */
		subCatFlag="Null";
		$(document).on("click", ".subCat", function(){ 
		//$('.subCat').click(function() {
			//$(this).removeClass('subCat');
			$('#segment').addClass('hideBlock');
			$('#segmentLst').removeClass('hideBlock');
			$("#segmentBtn").addClass('hideBlock');
			$("#segmentTotalCnt").text('');
			$("#segmentLst").empty(); 
			
			
			var selectedValue = this.id.toString();		
			var selectedValueId = "#"+this.id;
			var subCatStr="";
			var i=1;
			//if(subCatFlag!=selectedValue){
			var subCatHierarchyId=($(selectedValueId).attr('data-tt-id'));
			var servletUrl = 'fetchSegmentDetails.htm?iv_parent_node='	+ selectedValue;
			$.getJSON(servletUrl,function(options) {
				if (options) {
					$.map(options.segmentInfoList,function(item) {
						
						subCatStr='<li><input type="radio" name="hierarchySearch" class="segment" data-tt-id="" data-tt-parent-id="'+subCatHierarchyId+'" id="'+item.node+'" value="'+item.node+'"/><label for="'+item.node+'" class="lastColumn">'+item.nodeDesc+'</label></li>';
						$('#segmentLst').append(subCatStr);
						subCatFlag=selectedValue;
						
						$("#segmentTotal").removeClass('hideBlock');
						$("#segmentTotalCnt").text($("#segmentLst li").size());
					});
					
					$('#segmentBtn').removeClass('hideBlock');
					
					} 	
				});
			
			//}	
			});//subcat 	
			/*----------------******  End SubCategory Click function   *****--------------- */

		$("#menu").menu({ position: { my: "right top", at: "right top+20" } });	

			if($('#option').val()== ''){

				//$("#number").attr('checked', true);
				$("#number").click();
			}else{

			   if($('#option').val()=='number'){
				   $("#number").click();//.attr('checked', true);
			    }
			   if($('#option').val()=='description'){
				   $("#description").attr('checked', true);
			    }
			   if($('#option').val()=='reference'){
				   $("#reference").attr('checked', true);
			    }
			}
			
		
		$("#advLink1")
		.click( 
				function() {
					$('.tableInfoError').addClass('hideBlock');
					//$('.records-section,.tableInfoError').addClass('hideBlock'); //removed .records-section for defct no 14583
					$('#noData').text('');
					$('#statMsg').text('');
					var scroll = $(window).scrollTop();
					
					
					var lookupHeight = $('#lookupContainer').height();
					
					document.getElementById("advWrapper").style.marginTop=((lookupHeight - scroll) +"px");
					document.getElementById("advDiv").style.marginTop=(("0" - scroll) +"px");
				
				
				
				$("#advDiv").removeClass('advancedParam hideBlock');
				$("#advDiv").addClass('advancedParam');
			   
				$("#advWrapper").removeClass('advancedSearchFormatWrapper hideBlock');
				$("#advWrapper").addClass('advancedSearchFormatWrapper');

				$("#closeLink").removeClass('linkBtn hideBlock');
				$("#closeLink").addClass('linkBtn');
			   
				$("#advLink1").hide();
				
				
				}

		); 


		$("#closeLink1")
		.click( 
				function() {

					
				$("#advDiv").removeClass('advancedParam');
				$("#advDiv").addClass('advancedParam hideBlock');

				$("#closeLink").removeClass('linkBtn');
				$("#closeLink").addClass('linkBtn hideBlock');
				
				$("#advLink1").show();

				/*$("#suppName").val("");
				$("#suppNo").val("");*/
				
				}

		);

		
		$('.rangedCheck').click(function(){
			if($('input:checkbox[name=ranged]:checked').val()!=undefined || $('input:checkbox[name=ranged]:checked').val()=='Y'){
				$('#rangedFlag').val('Y');
				}else{
					$('#rangedFlag').val('N');
					}
						});
		
	


  $("#searchBtn")
	.click(

			function() {
				$('.records-section,.tableInfoError').addClass('hideBlock');	
				
				$('#noData').text('');
				$('#statMsg').text('');
				if($('#supplier').val()!=""){
		                var supplier=$('#supplier').val().split('-');

		                	$('#suppNo').val(supplier[0]);
						} 
						var radioVal=$('input:radio[name=hierarchySearch]:checked').val();
						var supplierRadio=$('input:radio[name=sourceSupply]:checked').val();
						var val=$("input:radio[name='subCat']:checked").val();
						var segmentText=$('input:radio[name=hierarchySearch]:checked + label').text();
						var subCategoryText=$("input:radio[name='subCat']:checked + label").text();
						/*if(radioVal!=undefined)
						{
							 $('#search').submit();
						}else*/
						if((supplierRadio=='1' || supplierRadio=='2')&&( $('#supplier').val()==""))
						{
							$("#closeLink").click();
							$('.records-section').hide();
							$('#statMsg').text('Please enter vendor/warehouse to lookup');
							$(".hierarchySearchDiv,.tableInfoError").removeClass('hideBlock');$(".secondaryActionBtn").addClass('hideBlock');
							$("#statMsgDiv").removeClass('tableTitle nodataMessage');
							$("#statMsgDiv").addClass('tableTitle errorDiv');
			              	$('#statMsgDiv').show();
						 
						}
						else  if($('input[name=departmentList]:checked').length==1 && $('input[name=subCat]:checked').length==0)
						{
								//&& ($('#supplier').val()=="" || $('#supplier').val()=="Enter supplier no. or name")
							//$('div.tableTitle h4').html('');
							$("#closeLink").click();
							$('.records-section').hide();
							$('#statMsg').text('Please select till sub-category');
							$(".hierarchySearchDiv,.tableInfoError").removeClass('hideBlock');$(".secondaryActionBtn").addClass('hideBlock');
							$(".secondaryActionBtn").addClass('hideBlock');
							$("#statMsgDiv").removeClass('tableTitle nodataMessage');
							$("#statMsgDiv").addClass('tableTitle errorDiv');
			              	$('#statMsgDiv').show();
						}
						else  if(val==undefined && $('#value').val()=="" && supplierRadio=="")
						{
								//&& ($('#supplier').val()=="" || $('#supplier').val()=="Enter supplier no. or name")
							//$('div.tableTitle h4').html('');
							$("#closeLink").click();
							$('.records-section').hide();
							$('#statMsg').text('Please enter keyword to lookup or Select till sub-category');
							$(".hierarchySearchDiv,.tableInfoError").removeClass('hideBlock');$(".secondaryActionBtn").addClass('hideBlock');
							$(".secondaryActionBtn").addClass('hideBlock');
							$("#statMsgDiv").removeClass('tableTitle nodataMessage');
							$("#statMsgDiv").addClass('tableTitle errorDiv');
			              	$('#statMsgDiv').show();
						}
					     else{
		                	/*$('#statMsg').val('Please enter keyword to lookup or Select till sub-category');
		                	$('#statMsgDiv').show();*/
		                	$('#statusImg').addClass('loading');
		                	$('#statusImg').removeClass('hideBlock');
		    				 //$('#statusImg').addClass('statusWrapper');
		    				 localStorage.searchByOptions=$('#searchByOptions').val();
		    				 if(radioVal==undefined){
								 $("#hierarchySearchValue").val(val);
								 $('#hierarchyText').val(subCategoryText);
							 }
							 else{
								 $("#hierarchySearchValue").val(radioVal);
								 $('#hierarchyText').val(segmentText)
								 }
		    				 $('#search').submit();
		                }
						});
		  $("#tooManysupplier")
			.click(

					function() {
				
						var val=$("input:radio[name='subCat']:checked").val();
						var subCategoryText=$("input:radio[name='subCat']:checked + label").text(); 
						$('.records-section,.tableInfoError').addClass('hideBlock');
				$('#noData').text('');
				$('#statMsg').text('');
						if($('#supplier').val()!="" && $('#supplier').val()!="Enter supplier no. or name"){
		              var supplier=$('#supplier').val().split('-');

		              	$('#suppNo').val(supplier[0]);
						} 
						var radioVal=$('input:radio[name=hierarchySearch]:checked').val();
						var supplierRadio=$('input:radio[name=sourceSupply]:checked').val();
						var segmentText=$("input:radio[name='hierarchySearch']:checked + label").text();
						if((supplierRadio=='1' || supplierRadio=='2')&&( $('#supplier').val()==""))
						{
							$("#closeLink").click();
							$('.records-section').hide();
							$('#statMsg').text('Please enter vendor/warehouse to lookup');
							$(".hierarchySearchDiv,.tableInfoError").removeClass('hideBlock');$(".secondaryActionBtn").addClass('hideBlock');
							$("#statMsgDiv").removeClass('tableTitle nodataMessage');
							$("#statMsgDiv").addClass('tableTitle errorDiv');
			              	$('#statMsgDiv').show();
						 
						}
						else  if($('input[name=departmentList]:checked').length==1 && $('input[name=subCat]:checked').length==0)
						{
								//&& ($('#supplier').val()=="" || $('#supplier').val()=="Enter supplier no. or name")
							//$('div.tableTitle h4').html('');
							$("#closeLink").click();
							$('.records-section').hide();
							$('#statMsg').text('Please select till sub-category');
							$(".hierarchySearchDiv,.tableInfoError").removeClass('hideBlock');$(".secondaryActionBtn").addClass('hideBlock');
							$(".secondaryActionBtn").addClass('hideBlock');
							$("#statMsgDiv").removeClass('tableTitle nodataMessage');
							$("#statMsgDiv").addClass('tableTitle errorDiv');
			              	$('#statMsgDiv').show();
						}
						else if(val==undefined && $('#value').val()=="" && supplierRadio=="")
						{
							$("#closeLink").click();
							$('.records-section').hide();
								$('#statMsg').text('Please enter keyword to lookup or Select till sub-category');
								$(".hierarchySearchDiv,.tableInfoError").removeClass('hideBlock');$(".secondaryActionBtn").addClass('hideBlock');
								$("#statMsgDiv").removeClass('tableTitle nodataMessage');
								$("#statMsgDiv").addClass('tableTitle errorDiv');
				              	$('#statMsgDiv').show();
						}
						else{
							$('#statusImg').addClass('loading');
		                	 $('#statusImg').removeClass('hideBlock');
		    				 //$('#statusImg').addClass('statusWrapper');
		    				 localStorage.searchByOptions=$('#searchByOptions').val();
		    				 if(radioVal==undefined){
								 $("#hierarchySearchValue").val(val);
								 
								  $('#hierarchyText').val(subCategoryText);
								  
							 }
							 else{
								 $("#hierarchySearchValue").val(radioVal);
								 $('#hierarchyText').val(segmentText);
								 }
		    				 $('#search').submit();
		                }
						}
						);
		  $("#segmentBtn").click(function() {
				var val=$("input:radio[name='subCat']:checked").val();
				var subCategoryText=$("input:radio[name='subCat']:checked + label").text();
				$('.records-section,.tableInfoError').addClass('hideBlock');	
				$('#noData').text('');
				$('#statMsg').text('');
				if($('#supplier').val()!=""){
		                var supplier=$('#supplier').val().split('-');

		                	$('#suppNo').val(supplier[0]);
						} 
						var radioVal=$('input:radio[name=hierarchySearch]:checked').val();
						var segmentText=$('input:radio[name=hierarchySearch]:checked + label').text();
						
						var supplierRadio=$('input:radio[name=sourceSupply]:checked').val();
						
						/*if(radioVal!=undefined)
						{
							 $('#search').submit();
						}else*/
						if((supplierRadio=='1' || supplierRadio=='2')&&( $('#supplier').val()==""))
						{
							$("#closeLink").click();
							$('.records-section').hide();
							$('#statMsg').text('Please enter vendor/warehouse to lookup');
							$(".hierarchySearchDiv,.tableInfoError").removeClass('hideBlock');$(".secondaryActionBtn").addClass('hideBlock');
							$("#statMsgDiv").removeClass('tableTitle nodataMessage');
							$("#statMsgDiv").addClass('tableTitle errorDiv');
			              	$('#statMsgDiv').show();
						 
						}
						else  if($('input[name=departmentList]:checked').length==1 && $('input[name=subCat]:checked').length==0)
						{
								//&& ($('#supplier').val()=="" || $('#supplier').val()=="Enter supplier no. or name")
							//$('div.tableTitle h4').html('');
							$("#closeLink").click();
							$('.records-section').hide();
							$('#statMsg').text('Please select till sub-category');
							$(".hierarchySearchDiv,.tableInfoError").removeClass('hideBlock');$(".secondaryActionBtn").addClass('hideBlock');
							$(".secondaryActionBtn").addClass('hideBlock');
							$("#statMsgDiv").removeClass('tableTitle nodataMessage');
							$("#statMsgDiv").addClass('tableTitle errorDiv');
			              	$('#statMsgDiv').show();
						}
						else  if(val==undefined && $('#value').val()=="" && supplierRadio=="")
						{
								//&& ($('#supplier').val()=="" || $('#supplier').val()=="Enter supplier no. or name")
							//$('div.tableTitle h4').html('');
							$("#closeLink").click();
							$('.records-section').hide();
							$('#statMsg').text('Please enter keyword to lookup or Select till sub-category');
							$(".hierarchySearchDiv,.tableInfoError").removeClass('hideBlock');$(".secondaryActionBtn").addClass('hideBlock');
							$("#statMsgDiv").removeClass('tableTitle nodataMessage');
							$("#statMsgDiv").addClass('tableTitle errorDiv');
			              	$('#statMsgDiv').show();
						}
					     else{
		                	/*$('#statMsg').val('Please enter keyword to lookup or Select till sub-category');
		                	$('#statMsgDiv').show();*/
		                	$('#statusImg').addClass('loading');
		                	$('#statusImg').removeClass('hideBlock');
		    				 //$('#statusImg').addClass('statusWrapper');
		    				 localStorage.searchByOptions=$('#searchByOptions').val();
		    				 if(radioVal==undefined){
		    					 $("#hierarchySearchValue").val(val);
		    					 $('#hierarchyText').val(subCategoryText);
		    				 }
		    				 else{
		    					 $("#hierarchySearchValue").val(radioVal);
		    					 $('#hierarchyText').val(segmentText);
		    					
			    				 }
		    				 $('#search').submit();
		                }
			});

			

          var recordCount= $('#listCount').val();
          var currentPage=$('#pageNumber').val();

		 $('#paginationDiv1').pagination({
			items: recordCount,
			itemsOnPage: 20,
			cssStyle: 'compact-theme',
			currentPage:currentPage,
			onPageClick: function(pageNumber){
			    getArticlesForPage(pageNumber);

			    
			}

				
		});

		 $('#paginationDiv2').pagination({
				items: recordCount,
				itemsOnPage: 20,
				cssStyle: 'compact-theme',
				currentPage:currentPage,
				onPageClick: function(pageNumber){
				    getArticlesForPage(pageNumber);

				    
				}

					
			});
  


		 $(document).keypress(function(event) {
			    if (event.which == 13) {
			        event.preventDefault();
			     
			       
			        if($( "#dialog-modal" ).dialog( "isOpen" )){
			        	$("#goButtonSample")
						.click();
			        }
			        else{
			        	$("#tooManysupplier")
						.click();
				        }
			        
			    }
		 });



		 $("#goButtonSample")
			.click(
					function() {
$('.records-section,.tableInfoError').addClass('hideBlock');
						$('#noData').text('');
						$('#statMsg').text('');
						var vendorNo=$('#vendorDesc').val().split("-")[0];
						var vendorName=$('#vendorDesc').val().split("-")[1];
						//var vendorDesc=$('#vendorDesc').val();
						 var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
						
						$.ajax({
							type : "GET",
							url : "autocomplete.htm",
							beforeSend: function(){
								
								},
							//data : "vendorDesc=" + vendorDesc + "&sourceSupply="+sourceSupply  ,
							data: { vendorNo: vendorNo, sourceSupply: sourceSupply, vendorName:vendorName},
							//data : "vendorNo=" + vendorNo + "&sourceSupply="+sourceSupply + "&vendorName="+vendorName ,
							success : function(response) {
								 $('#popupDataDiv').html(response);
								
							},
						});



						}
					
					);
			
		
				if($('.rangedCheck').val()=='Y'){
					$('.rangedCheck').prop('checked',true);
				}else{
					$('.rangedCheck').prop('checked',false);
					}
		 

	});



function getArticlesForPage(pageNumber){
	$('#statusImg').addClass('loading');
	$('#statusImg').removeClass('hideBlock');
	//$('#statusImg').addClass('statusWrapper');
	
	$('#pageNumber').val(pageNumber);	
	$('#search').attr('action','requestSearchForPagination.htm');
	$('#search').submit();
}

function navigateToDetail(index){
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
	
	$('tr td').addClass('cursorProgress');
	$('#index').val(index);	
	if($('input:checkbox[name=ranged]:checked').val()!=undefined || $('input:checkbox[name=ranged]:checked').val()=='Y'){
		$('#rangedFlag').val('Y');
		}else{
			$('#rangedFlag').val('N');
			}
	
	$('#search').attr('action','requestArticleDetail.htm');
	$('#search').submit();
  
	
	
}
</script>
</head>
<body onload="resetCheckBox()">

	<div class="mainWrapper">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="lookUp" />
			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage">Lookup Articles</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label>

					<c:if test="${not empty articleSearchResutlsList}">
						<label class="secondaryActionBtn" onclick="">Clear Results</label>
					</c:if>
					<!-- End of status wrapper -->

				</div>


				<!-- End of breadcrumb wrapper -->






			</div>


		</div>
		<!-- End of head wrapper -->



		<div class="contentWrapper lookup">

			<div class="lookupWrapper" id="lookupContainer">

				<div class="lookupTitleWrapper">
					<h2>Lookup</h2>
				</div>
				<!-- End of lookup title wrapper -->

				<div class="lookupParamWrapper">
					<form id="search" action="requestSearch.htm" method="post">
						<input type="hidden" name="siteNo" id="siteNo"
							value="${user.siteNo}" /><input type="hidden"
							name="hierarchyText" id="hierarchyText" value="" /> <input
							type="hidden" name="hierarchySearchValue"
							id="hierarchySearchValue" value="" /><input type="hidden"
							name="salesOrg" id="salesOrg" value="${user.salesOrg}" /> <input
							type="hidden" id="listCount" name="listCount"
							value="${model.param.recordCount}" /> <input type="hidden"
							id="pageNumber" name="pageNumber"
							value="${model.param.pageNumber}" /> <input type="hidden"
							id="option" value="${model.param.option}" /> <input
							type="hidden" id="index" name="index" /> <input type="hidden"
							id="iv_parent_node" name="iv_parent_node" /> <input
							type="hidden" id="deptIndex" name="deptIndex" /> <input
							type="hidden" id="rangedFlag" name="rangedFlag" value="" />


						<div class="searchBox">
							<input type="#" value="${model.param.value}"
								placeholder="Search article by"
								class="textbox textboxDefaultText focus" name="value" id="value"
								maxlength="20">
						</div>
						<label class="actionBtn"
							id="searchBtn">Go</label>
							<!-- class="actionBtn ${properties.Reviewlookupresults}"applicationSettings CR-->
						<div class="searchByOptions">
							<input type="radio" name="searchByOptions" value="number"
								class="lookupRadio" id="number"><label for="number"
								class="labelText">Number</label> <input type="radio"
								name="searchByOptions" value="description" class="lookupRadio"
								id="description"><label for="description"
								class="labelText">Description</label> <input type="radio"
								class="lookupRadio" name="searchByOptions" value="reference"
								id="reference"><label for="reference" class="labelText">EAN
								/ TUN / PLU</label>
						</div>
						<!-- End of search by options -->

						<div class="advancedParam hideBlock advancedSearchFormat"
							id="advDiv">

							<div class="parameter">
								<h3>Source of Supply:</h3>
								<input type="radio" name="sourceSupply" value="" id="All"
									checked><label for="warehouse" class="labelText">All</label>
								<input type="radio" name="sourceSupply" value="2" id="warehouse"><label
									for="warehouse" class="labelText">Warehouse</label> <input
									type="radio" name="sourceSupply" value="1" id="vendor"><label
									for="vendor" class="labelText">Vendor</label>
							</div>
							<!-- End of parameter -->


							<input type="hidden" name="suppNo" id="suppNo"
								value="${model.param.suppNo}" />
							<!--  value="${model.param.supplier}" -->
							<div class="parameter">
								<h3>Supplier:</h3>
								<input type="#" class="textbox"
									placeholder="Enter supplier no. or name" name="supplier"
									maxlength="20" id="supplier" readonly="readonly"> <label
									class="linkBtn"><label class="advancedSearch"
									id="verifySupplier">Verify</label></label>
							</div>
							<!-- End of parameter -->

							<div class="parameter hideBlock">
								<h3>Supplier Name:</h3>
								<input type="#" class="textbox" id="samplePopupTest"
									maxlength="20">

							</div>

							<!-- End of parameter -->
							<div class="parameter">
								<h3>&nbsp;</h3>
								<!-- <c:if test="${model.param.rangeFlag=='N'}">
								<input type="checkbox" class="rangedCheck" name="ranged"  value="${model.param.rangeFlag}" ><h3>Ranged Articles Only</h3><br>
								</c:if>
								<c:if test="${model.param.rangeFlag=='Y'}">
								<input type="checkbox" class="rangedCheck" name="ranged"  value="${model.param.rangeFlag}" checked><h3>Ranged Articles Only</h3><br>
								</c:if> -->
								<c:if test="${model.param.rangeFlag=='N'}">
									<input type="checkbox" name="ranged" id="rangedChk"
										value="${model.param.rangeFlag}">
									<label for="ranged" class="labelText">Ranged Articles
										Only</label>
								</c:if>
								<c:if test="${model.param.rangeFlag=='Y'}">
									<input type="checkbox" name="ranged" id="rangedChk"
										value="${model.param.rangeFlag}" checked>
									<label for="ranged" class="labelText">Ranged Articles
										Only</label>
								</c:if>
							</div>
							<!-- End of parameter -->


							<label class="actionBtn"
								id="tooManysupplier">Go</label>
						<!-- class="actionBtn ${properties.Reviewlookupresults}"applicationSettings CR-->
						</div>
						<!-- End of Advanced Param -->
						<!-- End of Advanced Param -->


					</form>

				</div>
				<!-- End of lookup param wrapper -->

				<div class="lookupActionWrapper">
					<label class="linkBtn" id="advLink1"><label
						class="advancedSearch  ${properties.Advancedarticlesearch}">Advanced
							Search</label></label> <label class="linkBtn hideBlock" id="closeLink"><label
						class="closeWindow" id="closeBTN">Close</label></label>
				</div>
				<!-- End of lookup action wrapper -->
				<!-- wrapper that handles the box under the advanced search form -->
				<div id="advWrapper"></div>
			</div>
			<!-- End of lookup wrapper -->




			<div class="ContentTableWrapper">
				<div class="tableInfo  tableInfoError hideBlock">
					<div class="tableTitle nodataMessage articleNoData" id="statMsgDiv">
						<h4 id="statMsg"></h4>

					</div>
					<!-- End of table title -->

				</div>


				<c:if
					test="${not empty noData || not empty articleSearchResutlsList}">
					<div class="ContentTableWrapper records-section">

						<div class="tableInfo">
							<c:if test="${not empty noData}">
								<div class="tableTitle nodataMessage">

									<h4 id="noData">${noData}</h4>

								</div>
							</c:if>


							<div class="tableTitle">
								<c:if test="${not empty articleSearchResutlsList}">
									<input type="hidden" id="recordListFlag" value="1" />
									<h4>
										Total <strong>${model.param.recordCount}</strong> results
										found for '<strong class="searchString"><c:if
												test="${not empty model.param.value}">
						${model.param.value}
						</c:if> <c:if test="${not empty model.param.suppNo}">
						${model.param.suppNo}&nbsp;${model.param.suppName}
						</c:if> <c:if test="${not empty model.param.hierarchyText}">
						${model.param.hierarchyText}
						</c:if> </strong>'
									</h4>
								</c:if>
							</div>
							<!-- End of table title -->
							<c:if
								test="${not empty articleSearchResutlsList && model.param.recordCount>20 }">
								<div class="paginationWrapper" id="paginationDiv1">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
							</c:if>

						</div>
						<!-- End of table info -->

						<%
				int i = 0;
			%>

						<c:if test="${not empty articleSearchResutlsList}">
							<table cellspacing="0" class="sortTable ContentTable actionRows">
								<thead>
									<tr>
										<th data-sort="int">Article #</th>
										<th data-sort="string" class="sorted ascending">Article
											Description</th>
										<th data-sort="float" class="numberColumn">Sell Price ($)</th>
										<th data-sort="float" class="numberColumn">Promo Price
											($)</th>
										<th data-sort="string">Stock</th>
										<th class="lastColumn">Ranged</th>
									</tr>
								</thead>
								<tbody>
									<c:forEach items="${articleSearchResutlsList}"
										var="articleInfo">


										<tr onclick="navigateToDetail(<%=i++%>);"
										class="">
											<!--  class="${properties.ViewItemdetails}">applicationSettings CR-->
											<td>${articleInfo.articleNo}</td>
											<td class="sorted">${articleInfo.description}</td>
											<td class="numberColumn">${articleInfo.salesPrice}</td>
											<td class="numberColumn">${articleInfo.promoSalesPrice}</td>
											<td>${articleInfo.SOH}${articleInfo.baseUom}</td>
											<td class="lastColumn numberColumn"><c:if
													test="${articleInfo.rangedFlag == 'Y'}">
													<label class="positiveStatus">&nbsp;</label>
												</c:if> <c:if test="${articleInfo.rangedFlag != 'Y'}">
													<label class="negativeStatus">&nbsp;</label>
												</c:if></td>
										</tr>

									</c:forEach>
									<!--	<tr class="lastRow">
						<td>1</td>
						<td class="sorted">2002</td>
						<td>Homebrand Pineapple Pieces Nat Juce 440g</td>
						<td class="numberColumn">2.00</td>
						<td class="numberColumn">1.50</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td class="lastColumn numberColumn"><label class="positiveStatus">&nbsp;</label></td>
					</tr>	 	 -->
								</tbody>
							</table>


							<div class="tableFooter">
								<div class="legend">
									<label> Legend: <label class="positiveStatus">Ranged</label><label
										class="negativeStatus">Not Ranged</label><label>
								</div>

								<c:if test="${ model.param.recordCount>20 }">
									<div class="paginationWrapper bottomPagination"
										id="paginationDiv2">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</c:if>
							</div>
							<!--  end of table footer -->






						</c:if>

					</div>
				</c:if>



				<div class="tableInfo hierarchySearchDiv">

					<div class="tableTitle">
						<h4>Select Department Hierarchy to include in Lookup</h4>
					</div>
					<!-- End of table title -->


				</div>
				<!-- End of table info -->

				<div class="hierarchyWrapper hierarchySearchDiv">

					<!-- Department -->
					<div class="hierarchyContent" id="deptDiv">

						<div class="hierarchyTitle">
							<h3>Department</h3>
						</div>
						<!-- End of hierarchy Title -->

						<div class="hierarchyList">

							<ul id="deptlst">
								<c:if test="${not empty model.deptInfoList}">
									<%
								int j = 1;
							%>
									<c:forEach items="${model.deptInfoList}" var="deptInfo">

										<input type="hidden" id="child<%=j%>"
											value="${deptInfo.childExists}">
										<c:if test="${deptInfo.level=='1'}">


											<li><input class="department" type="radio"
												name="departmentList" value="${deptInfo.node}"
												data-tt-id="<%=j%>" id="${deptInfo.node}"> <label
												for="${deptInfo.node}" class="labelText">${deptInfo.nodeDesc}</label></li>



										</c:if>
										<%
									j++;
								%>
									</c:forEach>

								</c:if>
							</ul>
						</div>
						<!-- End of hierarchy Title -->
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									id="deptLstCnt"></strong></label>
							</span>

						</div>
						<!-- End of hierarchy bottom -->

					</div>
					<!-- End of hierarchy Content -->


					<!-- Category -->
					<div class="hierarchyContent" id="catDiv">

						<div class="hierarchyTitle">
							<h3>Category</h3>
						</div>
						<!-- End of hierarchy Title -->

						<div class="hierarchyList">

							<div class="noSelection" id="noSelectionCat">
								<label>Please select any department to see it's
									associated categories.</label>
							</div>
							<!-- End of no selection -->

							<label class="loading hideBlock">&nbsp;</label>

							<ul id="categoryLst" class="hideBlock">
								<li class="category"></li>
							</ul>
						</div>
						<!-- End of hierarchy Title -->

						<div class="heirachyBottom">
							<span id="categoryLstTotal" class="totalCount hideBlock">
								<label>Total:<strong id="categoryLstCnt"></strong></label>
							</span>
						</div>
						<!-- End of heirachy bottom -->

					</div>
					<!-- End of hierarchy Content -->
					<!-- Sub-category -->
					<div class="hierarchyContent" id="subCatDiv">

						<div class="hierarchyTitle">
							<h3>Sub-category</h3>
						</div>
						<!-- End of hierarchy Title -->

						<div class="hierarchyList">

							<div class="noSelection" id="subCat">
								<label>Please select any category to see sub-categories.</label>
							</div>
							<!-- End of -->

							<label class="loading hideBlock">&nbsp;</label>

							<ul class="hideBlock" id="subCategoryLst">
							</ul>
						</div>
						<!-- End of hierarchy Title -->

						<div class="heirachyBottom">
							<span id="subCatTotal" class="totalCount hideBlock"> <label>Total:<strong
									id="subTotal"></strong></label>
							</span> <span class="heirachyAction hideBlock"> <label
								class="actionBtn">Go</label>
							</span>
						</div>
						<!-- End of heirachy bottom -->

					</div>
					<!-- End of hierarchy Content -->
					<!-- Segment -->
					<div class="hierarchyContent lastContent" id="segDiv">

						<div class="hierarchyTitle">
							<h3>Segment</h3>
						</div>
						<!-- End of hierarchy Title -->



						<div class="hierarchyList">

							<div class="noSelection" id="segment">
								<label>Please select any sub-category to see segments.</label>
							</div>
							<!-- End of -->

							<label class="loading hideBlock">&nbsp;</label>

							<ul class="hideBlock" id="segmentLst">

							</ul>
						</div>
						<!-- End of hierarchy Title -->

						<div class="heirachyBottom">
							<span id="segmentTotal" class="totalCount hideBlock"> <label>Total:<strong
									id="segmentTotalCnt"></strong></label>
							</span> <span id="segmentBtn" class="heirachyAction hideBlock"> <label
								class="actionBtn">Go</label>
							</span>

						</div>
						<!-- End of heirachy bottom -->

					</div>
					<!-- End of hierarchy Content -->




				</div>
				<!-- end of hierarchy Wrapper -->
			</div>

			<!-- End of article details -->

			<!-- End of article details -->



			<a href="#" class="scrollup">Top</a>
		</div>
		<!-- End of content wrapper -->


	</div>
	<%@include file="footer.jsp"%>

	<!-- verify supplier pop up-->
	<div id="dialog-modal" title="Verify Supplier">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>Supplier Name:</h3>
				<input type="#" placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDesc" maxlength="20">
				<label class="actionBtn" id="goButtonSample">Go</label>
			</div>
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDiv"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>

		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-modal1" title="Article search">
		<div class="popupContent">

			<div class="popupData">


				<h4 class="alertText" id="alertBox">There is no article to be
					received. Cannot finalize the order.</h4>

				<!-- Commented by Haresh
								<div class="ContentTableWrapper popMessage">

									<label id="alertBox">There is no article to be
										received. Cannot finalize the order</label>

								</div>
								 End of content table wrapper -->

			</div>
			<!-- End of pop up data -->
			<div class="popupData">

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="okBtn">OK</label>
					</span>
				</div>
				<!-- End of popup actions-->


				<!--  Commented by Haresh 
								<span class="popMessageBtnWrapper"> <label
									class="actionBtn popMessageBtn" id="okBtn">OK</label>
								</span>
								
								-->

			</div>
		</div>
		<!-- End of popupContent -->
	</div>



</body>
</html>

<script>
	
	<!-- Code is taken from http://flaviusmatis.github.io/simplePagination.js/#page-20 -->
	
		$(function() {
			$('.lookupRadio').click(function(){
				setTimeout(function(){$('.focus').focus();},500);
				});
			setTimeout(function(){$('.focus').focus();},500);
			$( "#number,#reference" ).click(function() {
				$('#rangedChk').prop('checked',false);
			});
			$( "#description" ).click(function() {
				$('#rangedChk').prop('checked',true);
			});
			if($('#recordListFlag').length==1)
				$('.hierarchySearchDiv').addClass('hideBlock');
			$('#closeBTN,#closeLink').click(function(){
				$("#value").focus();
				$('#All').click();
				 $("#supplier").attr('readonly','readonly');
				 var radioVal=$('input:radio[name=searchByOptions]:checked').val();
				 if(radioVal=='number' || radioVal=='reference'){
					 $('#rangedChk').prop('checked',false);
					 }else{
						 $('#rangedChk').prop('checked',true);
						 }
				});

			
			$(window).resize(function() {
				if($(document).height()==$(window).height() || $(document).height()==($(window).height())+1)
					$('.scrollup').hide();
				else
					$('.scrollup').show();
			});
			setTimeout(function(){
				if($(document).height()==$(window).height() || $(document).height()==($(window).height())+1)
					$('.scrollup').hide();
				else
					$('.scrollup').show();
				},50);
						$('#All').click();
			 $("#supplier").attr('readonly','readonly');
			$( "#All" ).click(function() {
				//$("#vendorField").removeClass('hideBlock');
				//$("#warehouseField").addClass('hideBlock');
				$("#supplier").attr('readonly','readonly');
				$("#supplier").val('');
			});

			
			
			$( "#warehouse,#vendor" ).click(function() {
				$("#supplier").removeAttr('readonly');	
			});

		/* 	$('#warehouse').click(function(){
				$("#warehouseField").removeClass('hideBlock');
				$("#vendorField").addClass('hideBlock');
				//$("#storeLabel").text("To Warehouse");
			});


			$('#vendor').click(function(){
				$("#vendorField").removeClass('hideBlock');
				$("#warehouseField").addClass('hideBlock');
				$("#supplier").removeAttr('readonly');	
				//$("#storeLabel").text("To Store");
			}); */

			function getRadioValue(name) {
			    var group = document.getElementsByName(name);

			    for (var i=0;i<group.length;i++) {
			        if (group[i].checked) {
			            return group[i].value;
			        }
			    }

			    return '';
			}

			
			//$('#supplier').val('');
			//$("#rangedCheck").checked=true;
			$('input:checkbox[name=ranged]').prop('checked',true);
			$( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 700
			});
			$( "#dialog-modal1" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
			$("#dialog-modal1").parent().addClass("popupWrapper"); 

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
			  $( "#verifySupplier" ).click(function() {
				  var radioSelected = getRadioValue('sourceSupply');
					if(radioSelected=="1" || radioSelected=="2" ){
						
				  var vendorNo=$('#supplier').val().split("-")[0];
					var vendorName=$('#supplier').val().split("-")[1];
					 var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
					if(($('#supplier').val()!='' && $('#supplier').val()!='Enter supplier no. or name')){
					$.ajax({
						type : "GET",
						url : "autocomplete.htm",
						beforeSend: function(){

							$('#statusImg').removeClass('loading hideBlock');
															$('#statusImg').addClass('loading');
							},
							data: { vendorNo: vendorNo, sourceSupply: sourceSupply, vendorName:vendorName},
						//data : "vendorNo=" + vendorNo + "&sourceSupply="+sourceSupply + "&vendorName="+vendorName ,
						success : function(response) {
							 $('#popupDataDiv').html(response);
							 if($('#sizeCheck').val()==0){
								 $('#alertBox').text('Invalid supplier');
									$( "#dialog-modal1" ).dialog( "open" );
									$('#okBtn').click(function(e){
										$( "#dialog-modal1" ).dialog( "close" );
										});
									$('#supplier').focus();												 
								 }
							 else if($('#sizeCheck').val()>1){
								 if(!$( "#dialog-modal" ).dialog( "isOpen" )){
									$('#vendorDesc').val($('#supplier').val());
									$("#dialog-modal").parent().addClass("popupWrapper");			
									$("#dialog-modal" ).dialog( "open" );
									$("#searchWarning").addClass('hideBlock');
									$("#popupSearch").removeClass('hideBlock');
									}
							 }
							 else{
									$("#supplier").val($("#suppNo0").text()+"-"+$("#suppName0").text());
								 }
							 $('#statusImg').addClass('loading hideBlock');
								$('#statusImg').removeClass('loading'); 
						},
					});}
					else{
						$('#alertBox').text('Please fill the supplier field');
						$( "#dialog-modal1" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal1" ).dialog( "close" );
							});
						$('#supplier').focus();
						}

					}

	});
		/* 	
		$( "#verifySupplier" ).click(function() {
			if(!$( "#dialog-modal" ).dialog( "isOpen" )){
			$("#dialog-modal").parent().addClass("popupWrapper");			
			$("#dialog-modal" ).dialog( "open" );
			$("#searchWarning").addClass('hideBlock');
			$("#popupSearch").removeClass('hideBlock');
			}
		}); */
		
		//shows advanced search box when advanced search link is clicked-->

		//closes advanced search when close is clicked -->
		 $(".secondaryActionBtn").click(function(e) {
			// window.history.back();
			 window.location.href="../article/onPageLoad.htm";
		  }); 
		$("#closeLink").click(function()
		{
			closeAdvSearchClasses();           
		});
		
		//closes advanced search box when windowed are scrolled unless in popup menu -->
		$(window).scroll(function()	{    
			if ($('#dialog-modal').dialog( "isOpen" ) == true) {
				var scroll = $(window).scrollTop();
				var lookupHeight = $('#lookupContainer').height();
				document.getElementById("advWrapper").style.marginTop=((lookupHeight - scroll) +"px");
				document.getElementById("advDiv").style.marginTop=(("0" - scroll) +"px");	
			} else {
				closeAdvSearchClasses();
			}
		});
		
		//closes advanced search box when cotent out side of the box is clicked -->
		$('.mainWrapper').click(function() 
		{
			closeAdvSearchClasses();
		});
		
		//disable close box function when lookup box is clicked -->
		$('#lookupContainer').click(function(event){
			event.stopPropagation();
		});
		
		// disable close box function when lookup box is clicked -->
	   $('.popupWrapper').click(function(event){
			  event.stopPropagation();
	   });
	   
		 
		 //method called to close advanced search box in css -->
		function closeAdvSearchClasses()
		{
			$("#advDiv").removeClass('advancedParam');
			$("#advDiv").addClass('advancedParam hideBlock');

			$("#advWrapper").removeClass('advancedSearchFormatWrapper');
			$("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');
		   
			$("#closeLink").removeClass('linkBtn');
			$("#closeLink").addClass('linkBtn hideBlock');
		   
			$("#advLink1").show();

			$("#suppName").val("");
			$("#suppNo").val("");
		}
		
		
		$("#treetable").treetable({
			expandable: true,
			
		});
		setTimeout(function(){$('.to-be-hidden').hide();},500);
		
		});
		
		
		


		

		/*function expandLevel2(Id,parentIndex,index){

			  var deptNo=Id;

			  var count2=$("#count2"+parentIndex+index).val();
			  if(count2=='0'){
			  $("#deptIndex").val(parentIndex);
			  $("#index").val(index);
	          $("#iv_parent_node").val(deptNo);

	          $('#search').attr('action','fetchSubCategoryDetails.htm');
	          $('#search').submit();
			  }
		}
		
		function expand(Id,level,dummyId){

            var deptNo=Id;
            var count= $("#child"+dummyId).val();


            if(count=='false'){
            $("#deptIndex").val(dummyId);
            $("#iv_parent_node").val(deptNo);
 

           
            $('#search').attr('action','fetchDetails.htm');
            $('#search').submit();
            
            }
	
            
	    }*/
	function resetCheckBox(){
		if($('#rangedChk').val()=="N"){
			$('#rangedChk').attr('checked',false);
			}
	    	}
	
				
	</script>

