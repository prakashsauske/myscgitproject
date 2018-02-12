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
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<link href="../../styles/slider.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/stockTransfer.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/basicSort.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/commonObjects.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/common.js?version=${properties.version}"></script>
<script>
	var globalUserImgLoc = "${user.imgLocation}";
</script>

<title>Stock Transfer</title>
</head>
<body>
	<!-- Start of main wrapper -->
	<div class="mainWrapper">
		<!-- Start of head wrapper -->
		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="stockManage" />
			<!-- Start of breadcrumb wrapper -->
			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="">Stock Management</li>	 
						<li class="currentPage">Stock Transfer</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<!-- <div class="statusWrapper hideBlock" id="statusImg">
					<label class="loading">We are getting data, please wait</label>
				</div> -->
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->
		</div>
		<!-- End of head wrapper -->
		
		<form method="POST" action="" id="stockTransferForm">
		<!-- Start of content wrapper -->
		<div class="contentWrapper stockTransferDiv">
			<div class="ContentTableWrapper">
				<div class="tableInfo">
					<div class="tableTitle">
						<h4>
							<strong>List of Stock Transfers</strong>
						</h4>
					</div>
					<!-- End of table title -->
				</div>
				<!-- End of table info -->
				<div class="tableActionsBtnsWrapper">
					<div class="lookupActionWrapper">
						<label class="linkBtn" id="addIBT"><label class="addRow">Create Stock Transfer</label></label>
						<div class="errorDivition errorDiv hideBlock">
							<label class="warnin"></label> <label class="closeMessage">&nbsp;</label>
						</div>
					</div>
					<!-- End of lookup action wrapper -->
				</div>
				<div class="tableActionsWrapper hideBlock1" id="tableCreateAction">
						<div class="formWrapper alignParameter">
							<div class="parameter parameterTitle">
								<label class="ibt-site-title"><strong>Target
										Site Details</strong></label>
							</div>
							<div class="parameter parameterSingle clearfix">
								<label for="pos">Target Site</label> <span id="multiplePOS"
									class=""> <input type="#" class="textbox sitebox targetSite"
									placeholder="Type target site number or name "> <label
									class="linkBtn "><label
										class="advancedSearch verifyStore">Search & Add</label></label>

									<ul class=" storeList parameterOptionsListInline">


									</ul>

								</span>
							</div>

<input type="hidden" id="isVerified" value="false">
<input type="hidden" id="alhFlag" >
							<!-- End of parameter -->
							<div class="parameter parameterRow parameterOptions clearfix">
								<label>Select from</label> <span class="parameterOptionsRadio">
									<input type="radio" name="targetSiteOpt" value="nearby"
									id="nearby"><label for="nearby" class="labelText">Nearby
										Stores</label> <input type="radio" name="targetSiteOpt" value="wh"
									id="wh"><label for="wh" class="labelText">My
										Warehouses</label>
								</span>
								<div class="parameter parameterOptionsInputBox">
									<span id="nblist" class="hideBlock">
										<ul class="parameterOptionsListInline store-list-selected">
											<!-- <li><label>1518 | Richmond store </label> <label
															class="closeMessage">&nbsp;</label></li> -->

										</ul>

									</span> <span id="mywhlist" class="hideBlock"> <select
										class="selectOptions" id="warehouse" name="warehouseVal">
											<option value="0">Select</option>
											<!-- <c:forEach items="${whList}" var="whVal">
														<option value="${whVal.siteNo}" id="${whVal.siteNo}">${whVal.siteNo} | ${whVal.siteName}</option>
												</c:forEach> -->
									</select>


									</span>

								</div>
								<!-- End of parameter -->

							</div>
							<!-- End of parameter -->



							<div class="formActions">
								<label class="actionBtn create-btn">Create</label> <label
									class="secondaryActionBtn closeLink" id="closeLink">Close</label>
							</div>
							<!-- End of form actions -->

						</div>
						<!-- End of content table wrapper -->

				</div>
				<table cellspacing="0"
					class="ContentTable treetable drilldownTable tableSorter"
					id="viewModeTable3">
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		<!-- End of content wrapper -->



	</form>
	</div>
	<!-- End of main wrapper -->
	
	<div id="dialog-modal-alertBox" title="Stock Transfer">
		<div class="popupContent">

			<div class="popupData">


				<h4 class="alertText" id="alertBox"></h4>



				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						onmousedown="$( '#dialog-modal-alertBox' ).dialog( 'close' );"
						id="okBtn">OK</label>  <label class="actionBtn hideBlock noBtn"
						id="okBtn">No</label> <label class="actionBtn hideBlock yesBtn"
						id="okBtn">Yes</label>
					</span>
				</div>
				<!-- End of popup actions-->



			</div>
		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-modal-alert" title="Stock Transfer">
		<div class="popupContent">

			<div class="popupData">


				<h4 class="alert-text"></h4>



				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="ok-btn-alert">OK</label> <!-- <label class="actionBtn hideBlock yesBtn"
					id="okBtn">Yes</label>
					<label class="actionBtn hideBlock noBtn"
					id="okBtn">No</label> -->
					</span>
				</div>
				<!-- End of popup actions-->



			</div>
		</div>
		<!-- End of popupContent -->
	</div>


	<%-- <%@include file=nearbyStorePopUp.jsp %>  --%>
	<div id="dialog-siteSearchPop" title="Nearby Stores">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>Sales Orgs:</h3>

				<select class="selectOptions salesOrgMap" name=saleOrg>
					<!-- <option>Select</option> -->
					<c:forEach items="${salesOrgMap}" var="salesOrgMap">
						<option id="${salesOrgMap.key}" value="${salesOrgMap.key}">${salesOrgMap.key}
							| ${salesOrgMap.value}</option>
					</c:forEach>
				</select>


				<h3>Distance(km):</h3>
				<select class="selectOptions nearby-distance">
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="40">40</option>
					<option value="50">50</option>
					<option value="80">80</option>
					<option value="100">100</option>
				</select>
				<h3>Max Results:</h3>
				<select class="selectOptions nearby-max-store">
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="40">40</option>
					<option value="50">50</option>
					<option value="80">80</option>
					<option value="100">100</option>
				</select> <label class="actionBtn popupSearchBtn nearby-store-search-btn"
					id="goButtonSample">Search Stores</label>

			</div>
			<!-- End of popup search wrapper -->
			<label id="siteError"></label>

			<div class="popupData">

				<div class="tableInfo">

					<div class="warningMessage hideBlock" id="searchWarning" style="padding-top: 13px;padding-bottom: 26px;">
						<h4>
							Too many search results for '<strong>supplier name</strong>'.
							Please select a supplier from the list below.
						</h4>
					</div>
					<div class="paginationWrapper nearby-pagination bottomPagination"
						style="padding-top: 5px;">
						<div class="pagination-holder clearfix">
							<div id="compact-pagination"
								class="compact-theme simple-pagination">
								<ul>
									<li class="active"><span class="disabled prev">Prev</span></li>
									<li class="active"><span class="current">1</span></li>
									<li><a class="page-link" href="#page-2">2</a></li>
									<li><a class="page-link" href="#page-3">3</a></li>
									<li><a class="page-link next" href="#page-2">Next</a></li>
								</ul>
							</div>
						</div>
					</div>

					<div class="tableTitle">
						<h4>
							Total <strong>526</strong> results found
						</h4>
					</div>
					<!-- End of table title -->


				</div>
				<!-- End of table info -->

				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<!-- <thead>
							<tr>
								<th>Site No</th>
								<th>Site Name</th>
								<th>Proximity (km)</th>

								<th width="25px" class="lastColumn">&nbsp;</th>
							</tr>
						</thead> -->
						<tbody>

						</tbody>
					</table>
				</div>
				<div class="popupActionsWrapper">
					<span class="popupActions"> <label
						class="secondaryActionBtn">Cancel</label> <label class="actionBtn"
						id="addtolistStore">Add to List</label>
					</span>
				</div>
				<!-- End of content table wrapper -->

			</div>


		</div>

	</div>
	
	<div id="dialog-tempCheck" title="Finish IBT Submit">
		<div class="popupContent ">
			
			<div class="popupData">
			
				<h4 class="alertText">Please provide following information</h4>
			
					<div class="formWrapper">
												
						<div class="tableTitle temperatureHeader">
							<h4><strong>Temperature Details</strong></h4>
						</div>
						
						<hr class="sectionDivider clearfix temperatureHeader">
						<br />	
						
						<div class="parameter">
							<label for="temperature" class="mandatory">Chilled Temperature</label>
							<!-- <input type="#" class="textbox number" id="temperature1" maxlength="5"> -->
							<input type="#" class="textbox number" id="temperature1"  maxlength="6">
						</div> <!-- End of parameter -->
						
						<div class="parameter">
							<label for="temperature" class="mandatory">Hard Frozen Temperature</label>
							<!-- <input type="#" class="textbox number" id="temperature2" maxlength="5"> -->
							<input type="#" class="textbox number" id="temperature2"  maxlength="6">
						</div> <!-- End of parameter -->
						
						<div class="warningMessage hideBlock" id="finWarning">
							<h4>Warning message should be added in case input temperature is less or greater than the range......</h4>
						</div>
						
					
						
						<div class="errorDiv parameter hideBlock" id="finError">
							<label id="tempError">Error text</label>
						</div>
												
					</div> <!-- End of content table wrapper -->
					
					
					<div class="popupActionsWrapper ">
								
						<span class="popupActions">
							<label class="secondaryActionBtn" id="cancelSubmit"><a >Cancel</a></label>
							<label class="actionBtn" id="okSubmit"><a ><label class="thumbUp">Ok</label></a></label>
						</span>
					</div> <!-- End of popup actions-->
					
				
				
			</div> <!-- End of pop up data -->
			
		</div> <!-- End of popupContent -->
	</div> <!-- End of popup -->
	
	<div class="pageErrorsWrapper hideBlock temp-fix-pop-up"
		id="stockErrorWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title" id="header">Errors</h4>
				<a class="close" title="Close"
					onclick="$('#stockErrorWrapper').addClass('hideBlock');">Close</a>
				<p class="description" id="titleContent">Stock Transfer Draft Submit failed.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">Reason for failure</h4>
				<ul id="errorContent">

				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>
	
	<div
			class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
			tabindex="-1" role="dialog" aria-describedby="dialog-stockTempConfirm"
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
			<div id="dialog-stockTempConfirm"
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
						<span class="popupActions" id="okBtnTemp"> <label
							class="actionBtn">Ok</label>
						</span><span class="popupActions" id="cancelBtnTemp"> <label
							class="secondaryActionBtn">Cancel </label>
						</span><span class="popupActions" id="acceptQty"> <label
							class="actionBtn">Accept Quantity</label>
						</span><span class="popupActions" id="changeQty"> <label
							class="secondaryActionBtn">Change Quantity</label>
						</span>
					</div>
					<!-- End of popup actions-->

				</div>
				<!-- End of popupContent -->
			</div>
	</div>
	
	
<%-- 	<div id="dialog-stockContactTemp" title="Stock Transfer">
		<div class="popupContent stockContactPopup">
		
			
			
			<div class="popupData">
			
				<p class="notes warningMessage" id="tempWarning"><label></label></p>
			
				<h4 class="alertText">Please provide following information to complete stock transfer.</h4>
					<div class="formWrapper">
											
						<div class="tableTitle" style="padding-top:10px">
							<h4><strong>Delivery Details</strong></h4>
						</div>
						
						<hr class="sectionDivider clearfix">
						<br />		
					
						 <div class="parameter clearfix">
							<label id="nameLabel" class="" for="contactName">Name</label>							
							<input type="#" maxlength="30" class="textbox textboxDefaultText mediumbox clearText" placeholder="" id="contactName" maxlength="50">
						</div>
						<div class="parameter clearfix ">
							<label class="" for="contactNo">Contact</label>							
							<input type="#" maxlength="30" class="textbox textboxDefaultText mediumbox clearText" placeholder="" id="contactNo" maxlength="15">
						</div>
						<div class="parameter parameterRow clearfix">
								<label for="store">Pickup Date & Time</label>
								<input type="#" class="textbox defaultTextbox inputDate" id="dateFrom" value="28/03/2014" maxlength="10">
								<input type="#" class="textbox defaultTextbox inputTime" id="timeFrom" value="00:00" maxlength="8">
														
						</div> <!-- End of parameter -->
						
						<div class="parameter clearfix ">
							<label id="authNoLabel" class="" for="warehouseAuthNo">Authorisation #</label>							
							<input type="#" maxlength="30" class="textbox textboxDefaultText mediumbox clearText" placeholder="" id="warehouseAuthNo" maxlength="50">
						</div>
						
						<div class="parameter clearfix ">
							<label class="" for="courierName">Courier</label>							
							<input type="#" class="textbox textboxDefaultText mediumbox clearText" placeholder="" id="courierName" maxlength="50">
						</div>
						
						<div class="parameter clearfix ">
							<label class="" for="rego">Vehicle Rego</label>							
							<input type="#" maxlength="10" class="textbox textboxDefaultText mediumbox clearText" placeholder="" id="rego" maxlength="50">
						</div>
						
						
						
						<div class="parameter clearfix">
							<label class="" for="comments">Comments</label>							
							<textarea class="textbox textboxDefaultText largebox clearText" placeholder="" id="comments" maxlength="100"></textarea>
						</div>
							
						<div id="stockTempDiv">
							<div class="tableTitle">
								<h4><strong>Temperature Details</strong></h4>
							</div>
							
							<hr class="sectionDivider clearfix">
							<br />	
							
							<div class="parameter">
								<label for="temperature" class="mandatoryNew">Chilled Temperature</label>
								<input type="#" class="textbox clearText" id="temperature1" maxlength="5">
							</div> <!-- End of parameter -->
							
							<div class="parameter">
								<label for="temperature" class="mandatoryNew">Hard Frozen Temperature</label>
								<input type="#" class="textbox clearText" id="temperature2" maxlength="7">
							</div> <!-- End of parameter -->
						</div>
						
						<div class="warningMessage hideBlock">
							<h4>Warning message should be added in case input temperature is less or greater than the range......</h4>
						</div>
						
					
						
						<div class="errorDiv hideBlock">
							<label>Unable to stock transfer due to incorrect temperature. </label>
						</div>
												
					</div> <!-- End of content table wrapper -->
					
					<div class="popupActionsWrapper ">
								
						<span class="popupActions">
							<label class="actionBtn" id="ibtProceed"><a href="#"><label class="thumbUp">Finish</label></a></label>
							<label class="secondaryActionBtn" id="ibtCancel"><a href="#">Cancel</a></label>
						</span>
					</div> <!-- End of popup actions-->
					
				
				
			</div> <!-- End of pop up data -->
			
			
			
			
		</div> <!-- End of popupContent -->
	</div> <!-- End of popup --> --%>
	
 	<div id="dialog-stockContactTemp" title="Stock Transfer">
		<div class="popupContent stockContactPopup">
		
			
			
			<div class="popupData">
			
				<p class="notes warningMessage" id="tempWarning"><label></label></p>
			
				<h4 class="alertText">Please provide following information to complete stock transfer.</h4>
				<div class="wizardContent">	
						<div class="jw-widget">	
						<div class="jw-content ui-widget-content ui-helper-clearfix">
						<div class="jw-menu-wrap">
							<ol class="jw-menu ui-menu ui-widget ui-widget-content"
								id="ui-id-2" tabindex="0">
								<li class="ui-menu-item ui-state-highlight ui-state-disabled"
									id="tab-1" tabindex="-1"><a class="tabAnchor">Step 1: Delivery Details</a></li>
								<li class="ui-menu-item ui-state-disabled" id="tab-2"
									tabindex="-1"><a href="javascript:void(0);">Step 2: ULD Details</a></li>
							</ol>
						</div>
						<div class="jw-steps-wrap">
							<div id="step-1" class="formWrapper" style="display: block;">
								<h2 class="recvTabTitle">Provide receiving store contact
									details, transport information, and delivery temperature.</h2>
								<hr class="sectionDivider clearfix">

								<div class="ContentTableWrapper clearfix">

									<div class="clearfix">
										<h4 class="sectionTitle">
											<strong>Delivery Details</strong>
										</h4>
									</div>
									<hr class="sectionDivider clearfix">
									<br>

									<div class="parameter clearfix">
										<label id="nameLabel" class="" for="contactName">Name</label> <input type="#"
											class="textbox textboxDefaultText mediumbox clearText" placeholder=""
											id="contactName" maxlength="50">
									</div>
									<div class="parameter clearfix ">
										<label class="" for="contactNo">Contact</label> <input type="#"
											class="textbox textboxDefaultText mediumbox clearText" placeholder=""
											id="contactNo" maxlength="15">
									</div>
									<div class="parameter parameterRow clearfix">
										<label for="store">Pickup Date &amp; Time</label> <input
											type="#"
											class="textbox defaultTextbox inputDate"
											id="dateFrom" value="28/03/2014" maxlength="12"> <input type="#"
											class="textbox defaultTextbox inputTime" id="timeFrom"
											value="00:00" maxlength="5">

									</div>
									<!-- End of parameter -->

									<div class="parameter clearfix ">
										<label id="authNoLabel" class="" for="warehouseAuthNo">Authorisation #</label>							
										<input type="#" maxlength="30" class="textbox textboxDefaultText mediumbox clearText" placeholder="" id="warehouseAuthNo" maxlength="50">
									</div>

									<div class="parameter ">
										<label for="car" class="">Carrier </label>  <input type="#"
											class="textbox largebox clearText" id="car" maxlength="40">
									</div>
									<!-- End of parameter -->

									<div class="parameter clearfix ">
										<label class="" for="rego">Rego / Trailer #</label> <input
											type="#" class="textbox textboxDefaultText mediumbox clearText"
											placeholder="" id="rego" maxlength="50">
									</div>



									<div class="parameter clearfix">
										<label class="" for="comments">Comments</label>
										<textarea class="textbox textboxDefaultText largebox clearText"
											placeholder="" id="comments" maxlength="80"></textarea>
									</div>

									<div id="stockTempDiv">
										<div class="tableTitle">
											<h4>
												<strong>Temperature Details</strong>
											</h4>
										</div>
	
										<hr class="sectionDivider clearfix">
										<br>
	
										<div class="parameter">
											<label for="temperature" class="mandatoryNew">Chilled
												<!-- Temperature</label> <input type="#" class="textbox clearText " id="temperature1" maxlength="5"> -->
												Temperature</label> <input type="#" class="textbox clearText temperature1Class" id="temperature1"  maxlength="6">
										</div>
										<!-- End of parameter -->
	
										<div class="parameter">
											<label for="temperature" class="mandatoryNew">Hard Frozen
												<!-- Temperature</label> <input type="#" class="textbox clearText temperature2Class" id="temperature2" maxlength="7"> -->
												Temperature</label> <input type="#" class="textbox clearText temperature2Class" id="temperature2"  maxlength="6">
										</div>
										<!-- End of parameter -->
									</div>
									
									<div class="warningMessage hideBlock">
										<h4>Warning message should be added in case input
											temperature is less or greater than the range......</h4>
									</div>



									<div class="errorDiv hideBlock">
										<label>Unable to stock transfer due to incorrect
											temperature. </label>
									</div>

								</div>
								<!-- End of content table wrapper -->

							</div>
							<div id="step-2" class="formWrapper" style="display: none;">
								<h2 class="recvTabTitle">Confirm transferred ULD qty, if
									any.</h2>
								<hr class="sectionDivider clearfix">

								<div class="ContentTableWrapper clearfix">

									<div class="clearfix">
										<h4 class="sectionTitle">
											<strong>List of ULDs</strong>
										</h4>
									</div>

									<br>

									<div class="tableActionsBtnsWrapper ">
										<div class="lookupActionWrapper">
											<label class="linkBtn" id="addActionBtn"><label
												id="addULDRow" class="addRow">Add ULD Type</label></label>
										</div>
										<!-- End of lookup action wrapper -->


									</div>
									<!-- End of table actions btn wrapper -->

									<div class="tableActionsWrapper" id="uldSearchArea">


										<div class="formWrapper">



											<div class="parameter">
												<label for="store" class="">Type</label> <select
													class="selectOptions" id="typeSelect">
												</select>
											</div>
											<!-- End of parameter -->

											<div class="parameter">
												<label for="req" class="">Transferred Qty</label> <input
													type="#" class="textbox xsmallbox " id="req" maxlength="3">
											</div>
											<!-- End of parameter -->



											<div class="formActions">
												<label class="actionBtn" id="uldAdd">Add</label> <label
													class="secondaryActionBtn closeLink" id="closeLink">Close</label>
											</div>
											<!-- End of form actions -->

										</div>
										<!-- End of content table wrapper -->




									</div>
									<!-- End of table Actions Wrapper -->



									<table class="ContentTable" cellspacing="0" id="addULDTable">
										<thead class="hideBlock">
											<tr>
												<th class="">Type</th>
												<th class="centerValue">Transferred Qty</th>

												<th class="centerValue" width="45px">Delete</th>
											</tr>
										</thead>
										<tbody>
											
										</tbody>
									</table>






								</div>
								<!-- End of content table wrapper -->

							</div>
						</div>
					</div> <!-- End of form wrapper -->
					
						
						 <!-- End of form wrapper -->
					<div class="jw-footer popupActionsWrapper">
						<div style="padding-top:10px">     				
							<label class="actionBtn" id="ibtNextBtn"><a href="javaScript:void(0);">Next</a></label>
							<label class="actionBtn hideBlock" id="ibtBackBtn"><a href="javaScript:void(0);"><label class="">Back</label></a></label>	
							<label class="actionBtn hideBlock" id="ibtFinishBtn"><a href="javaScript:void(0);"><label class="">Finish</label></a></label>															
							<label class="secondaryActionBtn" id="ibtCancelBtn"><a href="javaScript:void(0);"><label class="">Cancel</label></a></label>	
						</div>
					</div>	
				</div>					
				</div>
					
				
				
			</div> <!-- End of pop up data -->
			
			
			
			
		</div> <!-- End of popupContent -->
	</div> <!-- End of popup -->	

	<%@include file="verifyStorePopUp.jsp"%>
	<%@include file="footer.jsp"%>

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
	
		
		
		
		<!-- open Orders Popup-->
	<div id="dialog-openOrders" title="Orders for this Article">
		<div class="popupContent ">


			<div class="popupData contentWrapper ">

				<div id="openOrders">
					<ul id="OnOrdersTabInPopUp">

						<li id="orderTabInPopUp"><a href="#tabs-2">Orders</a></li>
						<li id="frcstTabInPopUp"><a href="#tabs-3">Forecast
								Orders</a></li>
					</ul>

					<div id="tabs-2">


						<div class="ContentTableWrapper">

							<div class="tableInfo ">

								<div class="tableTitle topTitle">
									<h4 class="onOrderTitle">Total <strong><label id="onOrderCount"></label></strong> Orders found</h4>
								</div>
								<!-- End of table title -->
<div class="paginationWrapper  onOrderPaginationDiv paginationDiv hideBlock" id="paginationDiv11">
			<div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>
								</div></div>


							</div>
							<!-- End of table info -->
							<div id="orderPopUpCntnt"></div>
	<div class="tableFooter"><div class="paginationWrapper bottomPagination  onOrderPaginationDiv paginationDiv hideBlock"
									id="paginationDiv12"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>
									</div></div></div>
						</div>
						<!-- End of Content Table Wrapper -->


					</div>
					<!-- End of tab 2 -->
					<div id="tabs-3">

						<div class="ContentTableWrapper">

							<div class="tableInfo ">

								<div class="tableTitle topTitle">
									<h4>
										AutoStockR planned forecast for <strong>next 7 days</strong>
									</h4>
								</div>
								<!-- End of table title -->



							</div>
							<!-- End of table info -->
							<div id="frcstOrdersPopUpCntnt"></div>

						</div>
						<!-- End of Content Table Wrapper -->

					</div>
					<!-- End of tab 3 -->
				</div>
				<!-- end of tabs -->



			</div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">OK</label>
				</span>
			</div>



		</div>
		<!-- End of popupContent -->
	</div>
		
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
							class="secondaryActionBtn artCancel">Cancel</label> <label
							class="actionBtn" id="addtolist">Add to List</label>
						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
		</div>
		
	<div class="pageStatusWrapper hideBlock temp-fix-pop-up"
		id="stockStatusWrapper">
		<div class="pageStatusContent">
			<div class="pageStatusTitle">
				<h4 class="title" id=''>STATUS</h4>
				<a class="close" title="Close"
					onclick="$('#stockStatusWrapper').addClass('hideBlock');">Close</a>
				<p class="description" id="st_titleContent">Creation failed for
					few supplier.</p>
			</div>
			<!-- End of quick help title -->
	<!-- 		<div class="content">
				<h4 class="title">List of supplier and status</h4>
				<ul id="st_errorContent">

				</ul>
			</div> -->
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>
	
		
		
</body>
</html>