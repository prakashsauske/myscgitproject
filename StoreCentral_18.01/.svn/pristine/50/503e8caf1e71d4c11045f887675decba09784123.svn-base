<!DOCTYPE html>
<html>
<head>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>In-store Other Markdown Promotions</title>



<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoOtherMarkdown.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_validation.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/autoComplete.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreationAngular.js?version=${properties.version}"></script>

<link href="../../styles/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />


</head>
<body ng-app="myapp">
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" value="${isbigw}" id="isBigw" /> <input
				type="hidden" value="${user.imgLocation}" id="currentBanner" />
			<c:forEach items="${addedArticles}" var="element">
				<input type="hidden" value="${element}" name="addedArticleList" />
			</c:forEach>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li>Pricing</li>
						<li>In-store Promotions</li>
						<li class="currentPage">Other Markdown</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<span><label class="loading hideBlock" id="statusImg">We
							are getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label></span>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
		

			<div class="contentWrapper orderDetails">

				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4 class="sectionTitle">Other Markdown Promotions</h4>
						</div>
						<!-- End of table title -->

						<div class="instructionalText " id="instructionalText1">
							<label>Check existing draft list, select articles for
								Other Markdown, and click 'Proceed to Create'.</label>
						</div>
						<div class="instructionalText hideBlock" id="instructionalText2">
							<label>Input necessary details, validate, and then
								create!</label>
						</div>
						<div class="instructionalText" id="instructionalText3">
							<label> Please select a reason for the promotion to view </label>
						</div>

					</div>
					<!-- End of table info -->

					<div class="innerSection">
						<h4 class="sectionTitle">
							<strong>View : </strong> <input type="radio" name="status"
								value="MM" id="MM" checked="checked"> <select
								class="selectOptions" id="listOption" for="MM" style="min-width: inherit !important;"
								>
								<option value="myDrafts">My Drafts</option>
								<option value="allDrafts">All Drafts</option>
							</select>
							<span class="viewAccess"> 
							<input type="radio" name="status" value="MF" id="MF"><label
								for="MF" class="labelText">Active &amp; Future
								Promotions</label> <input type="radio" name="status" value="MR" id="MR"><label
								for="MR" class="labelText">Past Promotions</label>
								</span>
						</h4>

					</div>
					<!-- End of inner section -->
					
					<label class="commonMsg hideBlock"></label>
					<div id="drafts" class="">
						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<label class="linkBtn linkBtnFix" id="addActionBtn"><label
									class="addRow">Add Article</label></label> <label class="linkBtn linkBtnFix"
									id="filterOpen"> <label class="filter">
										Filters</label>
								</label> <label class="linkBtn linkBtnFix hideBlock" id="filterClear"> <label
									class="negativeFlag">Clear Filters</label>
								</label>


								<div class="errorDiv hideBlock" id="errorMsgDiv">
									<label id='errorMsg'>No article found for '<strong
										id="notfoundArticle">3234</strong>'. Please try a different
										number.
									</label> <label class="closeMessage"
										onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
								</div>

							</div>
							<!-- End of lookup action wrapper -->


						</div>
						<!-- End of table actions btn wrapper -->

						<div class="tableActionsWrapper" id="tableAddAction">
<form:form id="submitQuery" modelAttribute="InstoreSearchParam">
							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter">
										<label for="article" class=" mandatoryFix">Article</label> <input
											type="#" class="textbox searchbox articleSearchText" id="article"
											placeholder="Type number, description, or EAN / TUN / PLU " tabindex="1"
											name="sr_article">
										<div class="searchByOptions hideBlock">
											<input type="radio" checked="" id="number" value="number"
												name="sr_searchOption"><label class="labelText"
												for="number">Number</label> <input type="radio"
												id="description" value="description" name="sr_searchOption"><label
												class="labelText" for="description">Description</label> <input
												type="radio" id="reference" value="reference"
												name="sr_searchOption"><label class="labelText"
												for="reference">EAN</label>
										</div>
									</div>
									<!-- End of parameter -->


									<div class="parameter">
										<label for="store" class="">Start Date</label> <input type="#"
											class="textbox defaultTextbox inputDate" id="start" maxlength="10"
											placeholder="dd/mm/yyyy" name="sr_startDate">
									</div>
									<!-- End of parameter -->

									<div class="parameter">
										<label for="store" class="">End Date</label> <input type="#"
											class="textbox defaultTextbox inputDate" id="end" maxlength="10"
											placeholder="dd/mm/yyyy" name="sr_endDate">
									</div>
									<!-- End of parameter -->
									<!--<div class="parameter ">
									<label for="reason" class="mandatoryFix" id="labelforDraftsD">Reason:</label>
									</div>-->
									 <div class="parameter otherReasonDiv clearfix"><!-- for defect 8435 -->
							<label for="reason" class="mandatoryFix" id="labelfordrafts">Reason</label> 
							
									</div>
									<!-- End of parameter -->

									<div class="formActions">
										<label class="actionBtn" id="searchAndAdd">Search
											&amp; Add</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
									</div>
									<!-- End of form actions -->
	

	
								</div>
								<!-- End of content table wrapper -->
								
								
							</form>
</form:form>
						</div>
						<!-- End of table Actions Wrapper -->
						<table cellspacing="0"
						class="ContentTable treetable drilldownTable hideBlock"
						id="promoList">
						<thead id="promoArticleList">
							<tr>
								<th rowspan="2" width="10px" data-addon-sh><input
									type="checkbox" id="promolistcheckboxall"></th>
								<th rowspan="2" width="20px" data-addon><span class="indenter expandAll_drafts">
									<a  title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>
									<a  title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>
								</span></th>
								<th rowspan="2" class="headH ">Article</th>
								<th rowspan="2" class="headH ">Description</th>
								<th rowspan="2" class="centerValue columnDivider" style="width: 45px;" >UOM</th>
								<th class="centerValue columnDivider" colspan="2">Date</th>
								<th class="centerValue columnDivider" colspan="3" data-addon>Price ($)</th>
								<th class="centerValue columnDivider" rowspan="2" >Reason</th>
								
								<th class="centerValue columnDivider" rowspan="2" width="50px">Status</th>
								<th class="lastColumn centerValue" width="60px" rowspan="2">Actions</th>
							</tr>


							<tr class="subHeader">
								<th class="centerValue" width="85px">Start Date</th>
								<th class="centerValue columnDivider" width="85px">End Date</th>
								<th class="centerValue" width="45px" data-addon>Standard</th>
								<th class="centerValue" width="45px" data-addon>Promo</th>
								<th class="centerValue columnDivider" width="12%" data-addon>New</th>
							
							</tr>

							<tr class="filterRow hideBlock drillsOpenDefault">

								<td>&nbsp;</td>
								<td class="headH" ><input type="#" class="textbox Filter"
									data-filterfor="articleNo"></td>
								<td class="headH"><input type="#" class="textbox Filter"
									data-filterfor="description"></td>
								<td class="columnDivider "><input type="#"
									class="textbox Filter" data-filterfor="uom"></td>

								<td class="centerValue"  width="85px" ><input type="#" class="textbox inputDate Filter" maxlength="10"
									data-filterfor="startDate" placeholder="dd/mm/yyyy" style="width: 80px;"
									id="startdatefilterdasa"></td>
								<td class="centerValue" width="85px"><input  type="#" class="textbox inputDate Filter" maxlength="10"
									data-filterfor="endDate" placeholder="dd/mm/yyyy" style="width: 80px;"
									id="enddatefilterasd"></td>
								<td class="centerValue" width="45px" data-addonfilter><input type="#" 
									class="textbox numberBox Filter" data-filterfor="standardPrice"></td>
								<td class="centerValue"  width="45px" data-addonfilter><input type="#"
									class="textbox numberBox Filter" data-filterfor="promoPrice"></td>
								<td data-addonfilter class="centerValue" width="12%" ><input type="#" 
									class="textbox numberBox Filter" data-filterfor="newPrice"></td>
							 	<td class="columnDivider centerValue" width="50px" ><input type="#" 
									class="textbox Filter" data-filterfor="reason"></td>
								<td class="columnDivider centerValue" width="50px"><input type="#" style="width: 45px;"
									class="textbox Filter" data-filterfor="status"></td>

								<td width="60px">&nbsp;</td>
							</tr>

						</thead>
						<tbody id="promoListTbody"></tbody>
					</table>
					</div>
					<form id="activeReasonForm">
					<div>
					<div class=" actives tableActionsWrapper" >
				<!--	<div class="parameter ">
					<label for="reason" class="mandatoryFix" id="labelforActiveA">Reason:</label>
										<select
											class="selectOptions selectFix" name="reason" id="reasonDrpDwnActive" >
										</select>
									</div>-->
					<div class=" parameter">
							<label for="store" class="mandatoryFix" id="labelforActive">Reason</label> 
							</div>
					</div>
					</div>
					</form>
					<!-- <div class=" active tableActionsWrapper " >
					<div class="parameter ">
					<div class="popupSearchWrapper" id="activeCount"></div>
					</div>
					</div>-->
					<div id="actives" class="hideBlock">
						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<label class="linkBtn linkBtnFix" id="filterOpenSearch"> <label	class="filter">Filters</label></label> 
								<label class="linkBtn linkBtnFix hideBlock" id="filterClearSearch"> <label class="negativeFlag">Clear Filters</label></label>
							</div>
							<!-- End of lookup action wrapper -->


						</div>
						<!-- End of table actions btn wrapper -->

						<!--  Pagination fix for UAT --> <!-- For defect 8418 -->
						<div class="tableInfo activesResultTitle" style="padding-top: 10px;">
						<div class="tableTitle">
						<h5 class="sectionTitle">
						<label id="activeCount"></label>
						</h5>
						</div>
						<div id="activePagination" style="float: right;"></div>
						</div>
						<!--  Pagination fix for UAT -->

						<!-- End of table Actions Wrapper -->
						<table cellspacing="0"
						class="ContentTable treetable drilldownTable"
						id="promoListSearch">
						<thead>
						<tr>
								<th rowspan="2" width="20px" ><span class="indenter expandAll_active">
									<a  title="Expand All" class="expandAll" id="expandAll_active">&nbsp;</a>
									<a  title="Collapse All" class="collapseAll hideBlock" id="collapseAll_active">&nbsp;</a>
								</span></th>
								<th rowspan="2" class="hideBlock">Article</th>
								<th rowspan="2" class="hideBlock">Description</th>
								<th rowspan="2" class=" centerValue columnDivider" style="width:45px">UOM</th>
								<th class="centerValue columnDivider" colspan="2">Date</th>
								<th class="centerValue columnDivider" colspan="2" >Price ($)</th>
								<!-- <th class="centerValue columnDivider" rowspan="2" >Limit
									Qty.</th>-->
								<th class="centerValue columnDivider" rowspan="2" width="50px">Status</th>
								 <th class="lastColumn centerValue" width="60px" rowspan="2">Actions</th> 
							</tr>


								<tr class="subHeader">
									<th class="centerValue" width="85px">Start Date</th>
									<th class="centerValue columnDivider" width="85px">End
										Date</th>
									<th class="centerValue" width="45px">Standard</th>
									<th class="centerValue columnDivider" width="45px">Promo</th>
									<!-- <th class="centerValue columnDivider" width="12%">New</th> -->

								</tr>

								<tr class="filterRowSearch hideBlock drillsOpenDefault">

								<td>&nbsp;</td>
							<!-- 	<td><input type="#" class="textbox FilterSearch" style="width: 35px;"
									data-filterfor="articleNo"></td>
								<td><input type="#" class="textbox FilterSearch" 
									data-filterfor="description"></td>-->
								<td class="columnDivider centerValue"><input type="#" style="width: 40px;"
									class="textbox FilterSearch" data-filterfor="uom"></td> 

								<td class="centerValue"><input type="#" class="textbox inputDate FilterSearch" style="width: 80px;" maxlength="10"
									data-filterfor="startDate" placeholder="dd/mm/yyyy"
									id="startdatefilter321"></td>
								<td class="centerValue"><input type="#" class="textbox inputDate FilterSearch" style="width: 80px;" maxlength="10"
									data-filterfor="endDate" placeholder="dd/mm/yyyy"
									id="enddatefilter123"></td>
								<td class="centerValue" data-addonfilter><input type="#" style="width: 35px;"
									class="textbox numberBox FilterSearch" data-filterfor="standardPrice"></td>
								<td class="centerValue" data-addonfilter><input type="#" style="width: 35px;"
									class="textbox numberBox FilterSearch" data-filterfor="promoPrice"></td>
								<!-- <td class="centerValue" data-addonfilter><input type="#" style="width: 35px;"
									class="textbox numberBox FilterSearch" data-filterfor="newPrice"></td> -->
								<!-- <td class="columnDivider centerValue" data-addonfilter><input type="#" style="width: 55px;"
									class="textbox numberBox FilterSearch" data-filterfor="limitQty"></td>-->
								<td class="columnDivider centerValue"><input type="#" style="width: 35px;"
									class="textbox FilterSearch" data-filterfor="status"></td>

								<td>&nbsp;</td>
							</tr>
						</thead>
						<tbody id="promoArticleListSearch">
							

						</tbody>
					</table>


					</div>
					
					<div id="pasts" class="hideBlock">
					
						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<label class="linkBtn linkBtnFix" id=""><label class="advancedSearch" id="advancedSearch">Search Promotions</label></label>
								<label class="linkBtn linkBtnFix" id="filterOpenSearchPast"> <label	class="filter">Filters</label></label> 
								<label class="linkBtn linkBtnFix hideBlock" id="filterClearSearchPast"> <label class="negativeFlag">Clear Filters</label></label>
								<div class="errorDiv hideBlock" id="errorMsgDivClr">
								<label id="errorMsg">No article found for '<strong>3234</strong>'. Please try a different number.</label>
								<label class="closeMessage" onclick="$(this).parent().addClass('hideBlock');" >&nbsp;</label>
						</div>
							</div>
							<!-- End of lookup action wrapper -->


						</div>
						<!-- End of table actions btn wrapper -->
						<div class="tableActionsWrapper" id="pastSearchArea" >

							<form method="POST" action="" id="searchForm" modelAttribute="InstoreSearchParam" >
							
								<div class="formWrapper alignParameter">

									<div class="parameter">
										<label for="store" class="">Start Date</label> <input name="dateFrom" type="#"
											class="textbox defaultTextbox inputDate" maxlength="10"
											id="startSearch" placeholder="dd/mm/yyyy">
									</div>
									<!-- End of parameter -->
									
									<div class="parameter ">
										<label for="department">Department</label> <select
											class="selectOptions selectFix" name="department" id="departmentDrpDwn" >
										<!-- 	<option>Select</option>
											<c:forEach items="${model.deptInfoList}" var="deptInfo">
											<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
											</c:forEach>-->

										</select>
									</div>
									<!-- End of parameter -->

									<div class="parameter clearfix">
										<label for="store" class="">End Date</label> <input name="dateTo" type="#"
											class="textbox defaultTextbox inputDate " maxlength="10"
											id="endSearch" placeholder="dd/mm/yyyy">
									</div>
									<!-- End of parameter -->


									<div class="parameter ">
										<label for="article" class="">Article</label> <input type="#"
											class="textbox articleSearchText searchBox" id="articleSearch" name="article"
											
											placeholder="Type number, description, or EAN / TUN / PLU " tabindex="1">
										<div class="searchByOptions hideBlock">
											<input type="radio" checked="" id="number" value="number"
												name="searchByOptions"><label class="labelText"
												for="number">Number</label> <input type="radio"
												id="description" value="description" name="searchByOptions"><label
												class="labelText" for="description">Description</label> <input
												type="radio" id="reference" value="reference"
												name="searchByOptions"><label class="labelText"
												for="reference">EAN</label>
										</div>
									</div>
									<!-- End of parameter -->
									
							<!-- 	<div class="parameter clearfix  parameterAlign parameterAlignFix">
										<label for="price" class="">Price</label> <input name="newPrice" type="#"
											class="textbox defaultTextbox numberBox" id="priceSearch"
											placeholder="">
									</div>
									
										
								<div class="parameter ">
									<label for="suppr" class="">Supplier</label>
									<span class="" id="">
									   <input type="#" placeholder="Type number or name and click verify" class="textbox" id="suppr" tabindex="2">
									   <label id="verifySupplier" class="linkBtn linkBtnFix"><label class="advancedSearch">Verify</label></label>								
									</span>
								</div>--> 

									<div class="parameter  clearfix  parameterAlign parameterAlignFix">
										<label for="cr" class="">Created By</label> <input type="#"
											class="textbox defaultTextbox" id="cr"
											placeholder="Type employee name or id" name="createdBy" >
									</div>
									<!-- End of parameter -->
									<!--<div class="parameter ">
									<label for="reason" class="mandatoryFix" id="labelforPastP">Reason:</label>
										<select
											class="selectOptions selectFix" name="reason" id="reasonDrpDwnPast" >
										</select>
									</div>-->
									<div class=" parameter">
							<label for="store" class="mandatoryFix" id="labelforPast">Reason</label> 
							</div>



									<div class="formActions">
										<label class="actionBtn" id="searchAndAddPast">Search</label> <label
											class="secondaryActionBtn closeLink" id="closeAdvanceSearch">Close</label>
									</div>
									<!-- End of form actions -->

								</div>
								<!-- End of content table wrapper -->
							</form>
						</div>
						<!-- <div class=" past tableActionsWrapper" >
					<div class="parameter ">
					<div class="popupSearchWrapper" id="pastCount"></div>
					</div>
					</div>-->

						<!-- End of table Actions Wrapper -->
						
						<!--  Pagination fix for UAT --><!-- For defect 8418 -->
						<div class="tableInfo pastsResultTitle" style="padding-top: 10px;">
						<div class="tableTitle">
						<h5 class="sectionTitle">
						<label id="pastCount"></label>
						</h5>
						</div>
						<div id="pastPagination" style="float: right;"></div>
						</div>
						<!--  Pagination fix for UAT -->
						
						<table cellspacing="0"
						class="ContentTable treetable drilldownTable hideBlock"
						id="promoListSearchPast" >
						<thead>
						<tr>
								<th rowspan="2" width="20px"><span class="indenter expandAll_pasts">
									<a  title="Expand All" class="expandAll" id="expandAll_pasts">&nbsp;</a>
									<a  title="Collapse All" class="collapseAll hideBlock" id="collapseAll_pasts">&nbsp;</a>
								</span></th>
								<th rowspan="2" class="hideBlock">Article</th>
								<th rowspan="2" class="hideBlock">Description</th>
								<th rowspan="2" class="centerValue columnDivider" width="45px">UOM</th>
								<th class="centerValue columnDivider" colspan="2">Date</th>
								<th class="centerValue columnDivider" colspan="2" >Price ($)</th>
								<!-- <th class="centerValue columnDivider" rowspan="2" >Limit
									Qty.</th>-->
								<th class="centerValue columnDivider" width="90px" rowspan="2" >Status</th>
							</tr>


							<tr class="subHeader">

								<th class="centerValue">Start Date</th>
								<th class="centerValue columnDivider">End Date</th>
								<th class="centerValue" >Standard</th>
								<th class="centerValue columnDivider" >Promo</th>
								<!-- <th class="centerValue columnDivider" >New</th> -->
								
							</tr>

							<tr class="filterRowSearchPast hideBlock drillsOpenDefault">

								<td>&nbsp;</td>
								<!-- <td><input type="#" class="textbox FilterSearchPast"
									data-filterfor="articleNo"></td>
								<td><input type="#" class="textbox FilterSearchPast"
									data-filterfor="description"></td>-->
								<td class=" centerValue columnDivider"><input type="#" style="width:40px"
									class="textbox FilterSearchPast" data-filterfor="uom"></td>

								<td class="centerValue"><input type="#" class="textbox inputDate FilterSearchPast" style="width: 80px;" maxlength="10"
									data-filterfor="startDate" placeholder="dd/mm/yyyy"
									id="startdatefilter"></td>
								<td class="centerValue"><input type="#" class="textbox inputDate FilterSearchPast" style="width: 80px;" maxlength="10"
									data-filterfor="endDate" placeholder="dd/mm/yyyy"
									id="enddatefilter"></td>
								<td class="centerValue" data-addonfilter><input type="#" style="width: 35px;"
									class="textbox numberBox FilterSearchPast" data-filterfor="standardPrice"></td>
								<td class="centerValue" data-addonfilter><input type="#" style="width: 35px;"
									class="textbox numberBox FilterSearchPast" data-filterfor="promoPrice"></td>
								<!-- <td class="centerValue" data-addonfilter><input type="#" style="width: 35px;"
									class="textbox numberBox FilterSearchPast" data-filterfor="newPrice"></td>-->
								<td class="columnDivider centerValue" data-addonfilter><input type="#" style="width: 55px;"
									class="textbox numberBox FilterSearchPast" data-filterfor="status"></td>
							</tr>
						</thead>
						<tbody id="promoArticleListSearchPast" >
							
						</tbody>
					</table>
					</div>
				
					<div id="overlay"></div>
				</div>
				<!-- End of content table wrapper -->

				<div class="pageActions hideBlock" id="beforePublish">
					<label class="actionBtn" id="beforePublishBtn"><label
						class="thumbUp">Proceed to Create</label></label>

				</div>
				<div class="pageActions hideBlock" id="afterPublishDiv">
					<label class="actionBtn" id="validateButton"><a ><label
							class="validate">Validate</label></a></label> <label
						class="actionBtn disabled" id="PublishButton"><a ><label
							class="thumbUp">Create</label></a></label>
				</div>
				<!-- End of page actions-->

			</div>


		<!-- End of content wrapper -->


		<div
			class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
			tabindex="-1" role="dialog" aria-describedby="dialog-mulipleArticles"
			aria-labelledby="ui-id-1" style="display: none;">
			<div
				class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
				<span id="ui-id-1" class="ui-dialog-title">Select Articles</span>
				<button
					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
					role="button" aria-disabled="false" title="close">
					<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
						class="ui-button-text">close</span>
				</button>
			</div>
			<div id="dialog-mulipleArticles"
				class="ui-dialog-content ui-widget-content">
				<div class="popupContent">

					<div class="popupData popupTitle">

						<h4 class="warning">
							Total <strong id="searchArticleCount">3</strong> articles found
							for '<strong id="searchText">T-shirt</strong>'
						</h4>

					</div>
					<!-- End of pop up data -->


					<div class="ContentTableWrapper">
						<table class="ContentTable" cellspacing="0">
							<tbody id="articleSearchTbody">
								<tr>
									<th>Article</th>
									<th>Description</th>
									<th class="centerValue">UOM</th>
									<th width="40px" class="centerValue lastColumn">Select</th>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- End of content table wrapper -->

					<div class="popupActionsWrapper">
						<span class="popupActions"> <label
							class="secondaryActionBtn">Cancel</label> <label
							class="actionBtn" id="addtolist">Add to List</label>
						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
		</div>
		<div
			class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
			tabindex="-1" role="dialog" aria-describedby="dialog-confirmation"
			aria-labelledby="ui-id-2" style="display: none;">
			<div
				class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
				<span id="ui-id-2" class="ui-dialog-title">Confirmation</span>
				<button
					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
					role="button" aria-disabled="false" title="close">
					<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
						class="ui-button-text">close</span>
				</button>
			</div>
			<div id="dialog-confirmation"
				class="ui-dialog-content ui-widget-content">
				<div class="popupContent">

					<div class="popupData popupTitle">

						<h4 class="warning" id="message">
							Please note that In-store Promotions will be available in
							Promotions Planning screens after <strong>approximately
								2 hours</strong>, once it is successfully created.
						</h4>

					</div>
					<!-- End of pop up data -->


					<div class="popupActionsWrapper">
						<span class="popupActions" id="ok"> <label
							class="actionBtn">Ok </label>

						</span><span class="popupActions" id="cancel"> <label
							class="secondaryActionBtn">Cancel </label>

						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
		</div>
		<input id="navBarHighlight" type="hidden" value="price" />
	</div>
	<div id="suggestionWrapper-instore" style ="display: none;">
	<div  class="suggestionWrapper hideBlock">
		<div class="suggestionContent">
			<div class="suggestionTitle">
				<h4 class="title">In-Store Other Markdown</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">These batches are required to be authorised by the Buying Team before being created</p>
			</div>
		</div>
		<!-- End of quick help content -->
	</div>
	</div>
	<div class="quickHelpWrapper hideBlock">
		<div class="quickHelpContent">
			<div class="quickHelpTitle">
				<h4 class="title">Filters</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">The filters allows you to minimise the
					list of records and let you quickly find relevant information.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">How to use it?</h4>
				<ul>
					<li>Identify the columnn you want to filter</li>
					<li>Locate the input box in the filter row corresponding to
						the identified column</li>
					<li>Start typing letters or numbers based on the column values</li>
					<li>The list filters based on every character or number entry</li>
					<li>Click on 'Clear Filter' to remove filters</li>
				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>
	<div class="pageErrorsWrapper hideBlock temp-fix-pop-up" id="errorWrapper" style="margin-left: 184px;">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Errors</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">In-Store Other Markdown creation failed.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">Reason for failure</h4>
				<ol id="validateErrors">

				</ol>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div class="pageErrorsWrapper hideBlock" id="warningWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">WARNING</h4>
				<a class="close" title="Close">Close</a>

			</div>
			<!-- End of quick help title -->
			<div class="content">

				<ol id="warningList">

				</ol>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

<!-- Promotion Sales history Popup -->
	<div
		class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
		tabindex="-1" role="dialog" aria-describedby="dialog-salesHistory"
		aria-labelledby="ui-id-1" style="display: none;">
		<div
			class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-1" class="ui-dialog-title">Sales History</span>
			<button
				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
				role="button" aria-disabled="false" title="close">
				<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
					class="ui-button-text">close</span>
			</button>
		</div>
		<div id="dialog-salesHistory" title="Promotion Sales History">
			<div class="popupContent">

				  <div class="popupSearchWrapper" id="popupSearch">
					<h3>No. of Month:</h3>
					<select class="selectOptions months" style="min-width: inherit !important;" >
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="13">13</option>
					</select>


					<h3 class="hideBlock">Promotion Type:</h3>
					<select class="selectOptions promoType hideBlock">
						<option value='I'>Instore</option>
						<option value='C'>Central</option>
						<option value='A'>All</option>
					</select> <label id="apply" class="actionBtn popupSearchBtn">Apply</label>

			</div>
			<!-- End of popup search wrapper -->


			<div class="popupData">

				<div class="tableInfo">

					<div class="tableTitle filtered-count">
						<h4>
							Total <strong class="saleTotalCount">1</strong> results found
						</h4>
					</div>
					<!-- End of table title -->

				</div>
				<!-- End of table info -->
			</div>
			<!-- End of pop up data -->


			<div class="ContentTableWrapper dialogbox-scroll">
				<!-- <table class="ContentTable" cellspacing="0">
						<tr class="promoSaleHistoryPopupTr">
							<th class="centerValue">From</th>
							<th class="centerValue">To</th>
							<th class="numberColumn">Promo Price</th>
							<th class="numberColumn">Saving</th>
							<th class="centerValue">Sub-type</th>
							<th>Media</th>
							<th class="centerValue">Avg. Qty. Sold</th>
							<th>Store Info</th>
							<th width="150px">Store Feedback</th>
							<th class="lastColumn centerValue" width="25px">&nbsp;</th>
						</tr>						
						
						
					</table> -->
			</div>
			<!-- End of content table wrapper -->

			<!-- <div class="popupActionsWrapper">
					<span class="popupActions"> <label
						class="actionBtn saleHistorySaveBtn">Save</label> <label
						class="actionBtn closeBtn">Close</label>
					</span>
				</div> -->
			<!-- End of popup actions-->



		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of Promotion Sales history popup -->
</div>
<div
		class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
		tabindex="-1" role="dialog"
		aria-describedby="dialog-mulipleArticlesCONFIRM"
		aria-labelledby="ui-id-1" style="display: none;">
		<div
			class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-1" class="ui-dialog-title">Select Articles</span>
			<button
				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
				role="button" aria-disabled="false" title="close">
				<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
					class="ui-button-text">close</span>
			</button>
		</div>
		<div id="dialog-mulipleArticlesCONFIRM"
			class="ui-dialog-content ui-widget-content">
			<div class="popupContent">

				<div class="popupData popupTitle">

					<h4 class="warning">Article(s) are already on a promotion during the selected period.</h4>

				</div>
				<!-- End of pop up data -->


				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tbody id="articleTbody">
							<tr>
								<th>Article</th>
								<th>Description</th>
								<th class="centerValue">UOM</th>
								<th width="40px" class="centerValue lastColumn">Select</th>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- End of content table wrapper -->

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label
						class="secondaryActionBtn">Cancel</label> <label class="actionBtn"
						id="addanyway">Add anyway</label>
					</span>
				</div>
				<!-- End of popup actions-->


			</div>
			<!-- End of popupContent -->
		</div>
	</div>

	<%@include file="footer.jsp"%>

</body>
</html>
