<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Service Requests</title>



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
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
	<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.jWizard.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/printRepairs.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/repair-Lookup.js?version=${properties.version}"></script>
<link href="../../styles/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script>
	var globalUserImgLoc = "${user.imgLocation}";
</script>

</head>
<body ng-app="myapp">
<input type="hidden" value="${user.siteNo}" id="loggedInSite">
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="lookup currentPage"><a>Service Order Lookup</a></li>
						<li class="details hideBlock"><a >Service Request Details</a></li>
						<li class="editOrder hideBlock"><a >Edit Order</a></li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper hideBlock">
					<span><label class="loading hideBlock" id="statusImg">We
							are getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label></span>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->

		<div class="contentWrapper lookup" id="repairLookUpWrapper">

			<div class="lookupWrapper" id="lookupContainer">

				<div class="lookupTitleWrapper">
					<h2>Lookup</h2>
				</div>
				<!-- End of lookup title wrapper -->

				<div class="lookupParamWrapper">

					<form:form id="search" modelAttribute="RepairSearchParam">
					<input name="carCount" id="carCount" value="" type="hidden"/>
					<input name="attention" id="attention" value="" type="hidden"/>
					<input type="hidden" value="${created_order}" id="created-service-order">
						<div class="searchBox">
							<input name="searchText" class="textbox textboxDefaultText"
								placeholder="Search service order or service agreement" maxlength="10"
								id="searchBox">
						</div>
						<!-- End of main search box -->
						<label class="actionBtn goButton">Go</label>

						<div class="searchByOptions">
							<label for="searchBox" class="labelText" id="preSearchText">Type
								service order number and press Enter</label>


						</div>
						<!-- End of search by options -->


						<div class="advancedParam hideBlock advancedSearchFormat" style="margin-top: -10px;"
							id="advDiv">

							<div class="parameter">
								<h3>Create Date:</h3>
								<input name="dateFrom" class="textbox defaultTextbox inputDate"
									id="dateFrom" placeholder="dd/mm/yyyy" maxlength="10"> to <input
									name="dateTo" class="textbox defaultTextbox inputDate" maxlength="10"
									id="dateTo" placeholder="dd/mm/yyyy">
							</div>
                                
                             <div class="parameter">
								<h3>Status:</h3> 
                                 <select name="status"
									class="selectOptions supplyDrop" id="StatusID">	
									 <option value="">Select</option>
	                                   <option value="OPEN" name="">OPEN</option>
	                                   <option value="COMPLETED" name="">COMPLETED</option>
	                                     <option value="CANCELLED" name="">CANCELLED</option>								
								</select>
										       
                               </div>  
							<div class="parameter">
								<h3 for="custName">Customer Name:</h3>
								<input name="customerName"
									class="textbox textboxDefaultText mediumbox" maxlength="30"
									placeholder="Type first or last name" id="custName">
							</div>
							<!-- End of parameter -->

							<div class="parameter">
								<h3 for="conNum">Contact Number:</h3>
								<input name="contactNo"
									class="textbox textboxDefaultText smallbox" placeholder="" maxlength="16"
									id="conNum">
							</div>
							<!-- End of parameter -->

							<div class="parameter">
								<h3 for="pcode">Postcode:</h3>
								<input name="postCode"
									class="textbox textboxDefaultText xsmallbox" placeholder="" maxlength="12"
									id="pcode">
							</div>
							<!-- End of parameter -->







							<label class="actionBtn goButton">Go</label>


						</div>
						<!-- End of Advanced Param -->




					</form:form>

				</div>
				<!-- End of lookup param wrapper -->


				<div class="lookupActionWrapper">
					<label class="linkBtn1" id="advLink1"><label
						class="advancedSearch">Advanced Search</label></label> <label
						class="linkBtn1 hideBlock" id="closeLink"><label
						class="closeWindow">Close</label></label>
				</div>
				<!-- End of lookup action wrapper -->

				<!-- wrapper that handles the box under the advanced search form -->
				<div id="advWrapper" class="hideBlock" style="height: 55px;">

				</div>



			</div>
			<!-- End of lookup wrapper -->
			<div class="ContentTableWrapper " id="todaysOrders">
				<div class="errorDiv hideBlock" id="errorMsgDiv" style="padding-top: 25px;">
					<label id='errorMsg'>No article found for '<strong
						id="notfoundArticle">3234</strong>'. Please try a different
						number.
					</label> <label class="closeMessage"
						onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
				</div>
				<div class="serviceOrderTablewrapper hideBlock padding-top35">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4>
								Total <strong><label class="totalCount"></label></strong>Service Orders Found
							</h4>
						</div>
						<!-- End of table title -->

						<div
							class="paginationWrapper paginationDiv hideBlock paginationDivRepair allocationPage"
							id="paginationDiv1">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
						<!-- End of pagination Wrapper -->

					</div>
					<!-- End of table info -->



					<div class="tableActionsBtnsWrapper">
						<div class="lookupActionWrapper">
							<label class="linkBtn1" id="addActionBtn"> <a
								href="../repair/redirectToCreateRepairServiceOrder.htm?fromPage=lookUp"><label
									class="addRow bigwcolor">New Service Order</a></label> </label> <span
								id="dropdownSelect" class="selectDropdown hideBlock"> <label
								class="linkBtn1" id="" tabindex="3"><a id=""><label
										class="moreActions">Actions</label></a></label>

								<ul class="dropdown">
									<li><a><label class="dropdownLabel" id="multiEmail">Send
												Reminder Email</label></a></li>
									<li><a><label class="dropdownLabel"
											id="multiComplete">Mark as Complete</label></a></li>
									<li><a><label class="dropdownLabel" id="multiCancel">Cancel</label></a></li>
								</ul>
							</span>



						</div>
						<!-- End of lookup action wrapper -->


					</div>
					<!-- End of table actions btn wrapper -->

	<div id="dialog-cartonCount" class="dialog-cartonCount"
		title="Enter Carton Count">
		<div class="popupContent">

			<div class="popupData">
				<form action="" id="claimsCartonCountPopUpForm">
					<div class="formWrapper">

						<div class="parameter">

							<table width="100%" class="plainTable">

								<tbody>
								<tr>
										<td><label for="com1">Attention : </label></td>
										<td><textarea width="40%" type="#" class=""
											value="" autocomplete="off" id="Attention" placeholder="Enter Attention Name" ></textarea></td>
									</tr>
									<tr>
										<td><label for="com1">Carton Pick Up Qty : </label></td>
										<td><input type="#" class="textbox mediumbox cartonCount mandatory"
											value="" autocomplete="off" id="cartonCount" placeholder="Enter Carton Qty" maxlength="5"></td>
									</tr>											                           
								</tbody>
							</table>
                                   
						</div>
						<!-- End of parameter -->

					</div>
					<!-- End of form wrapper  -->
				</form>
			</div>
			<!-- End of pop up data -->
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"><a>Ok</a></label>
					<label class="secondaryActionBtn"><a>Cancel</a></label>
				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>


					<table cellspacing="0" data-user_id=""
						class=" ContentTable  sortTable actionRows servcieOrderTable" id="beforeSubmit">
						<thead>
							<tr>
								<th width="20px" class="noSort {sorter: false} hideBlock"></th>
								<th width="65px">Service Order #</th>
								<th class="centerValue" width="65px">Type</th>
								<th width="65px">Article #</th>
								<th>Description</th>
								<th>Supplier</th>
								<th width="">Repair Agent</th>
								<th class="centerValue" width="85px">Create Date</th>
								<th class="centerValue" width="85px">Due Date</th>
								<th class="lastColumn centerValue">Status</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>


					<div class="tableFooter">
						<div class="legend">
							<label> Legend: <label class="urgent">Overdue
									Service Orders</label>
						</div>

						<div
							class="paginationWrapper paginationDiv hideBlock paginationDivRepair bottomPagination"
							id="paginationDiv2">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>

						<div class="pageActions hideBlock" id="afterSubmit">
							<label class="secondaryActionBtn"><a>Cancel</a></label> <label
								class="actionBtn" id=""><a><label class="thumbUp">Complete
										(01)</label></a></label>
						</div>
						<!-- End of page actions-->


					</div>
					<!-- End of table footer -->
				</div>
			</div>
			<!-- End of article details -->

		</div>
		<!-- End of content table wrapper -->
		<%@include file="repair-serviceOrderDetails.jsp"%>
		<%@include file="repair-EditServiceOrder.jsp"%>
	</div>


	<a class="scrollup">Top</a>


	<%@include file="repair-ServiceOrderPopUp.jsp"%>


	<%@include file="footer.jsp"%>
	<div id="printDataForAcpNot" class="hideBlock">
		<div id="printbodyForAcpNot" class="printbody"></div>
		<div class="hideBlock">
			<label class="siteNoName">${user.siteNo} | ${user.siteName}</label>
		</div>
	</div>
	<div id="printDataForCtnLbl" class="hideBlock">
		<div id="printbodyForCtnLbl" class="printbody cartonLabel"></div>
	</div>
	<div id="printDataForRemLtr" class="hideBlock">
		<div id="printbodyForRemLtr" class="printbody"></div>
	</div>
	<div id="printDataForSerOdr" class="hideBlock">
		<div id="printbodyForSerOdr" class="printbody serviceOrder"></div>
	</div>
</body>
</html>