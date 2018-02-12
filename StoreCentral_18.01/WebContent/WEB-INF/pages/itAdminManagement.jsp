<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

<title>User Management</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/itAdminMgt.js?vertion=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/inStore_PromoCreation_utils.js?vertion=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.tablesorter.latest.js?vertion=${properties.version}"></script>
<script src="../../scripts/customTable.js?version=${properties.version}"></script> 
<script src="../../scripts/table.js?version=${properties.version}"></script> 

</head>
</head>
<body>
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">User Management</li>
						<li class="hideBlock"><a href='#'>User Management</a></li>
						<li class="currentPage hideBlock">User Details</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label id="statusImg" class="loading hideBlock">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
		<form:form name="usrRoleMgt" id="usrRoleMgt">
			<input type="hidden" id="recordCnt" value="${recordCnt}" />
			<input type="hidden" id="roleListJson" value='${roleList}' />
			<input type="hidden" id="isStoreManager" value='${isStoreManager}' />
			<input type="hidden" id="isItAdmin" value='${isItAdmin}' />
			<input type="hidden" id="isSalesOrgManager" value='${isSalesOrgManager}' />
			<input type="hidden" id="isStockTakeManager" value='${isStockTakeManager}' />
			<div id="timException" class="hideBlock">${timException}</div>
			<div id="userVerifiedContent" class="hideBlock"></div>

			<div class="contentWrapper adminWrapper">

				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4 class="sectionTitle">User Management</h4>
						</div>
						<!-- End of table title -->

					</div>
					<!-- End of table info -->


					<div class="tableActionsBtnsWrapper">
						<div class="lookupActionWrapper">
							<label class="linkBtn" id="serachUser"><label
								class="advancedSearch">Search</label></label> <!-- <label class="linkBtn linkBtnFix"
								id="filterOpen" > <label
								class="filter"> Filters</label>
							</label> <label class="linkBtn linkBtnFix hideBlock" id="filterClear"
								> <label class="negativeFlag">Clear
									Filters</label></label> --><label class="linkBtn ${properties.Linkexistingusertostore}"
								id="addUser"><label
								class="addRow ">Add
									User</label></label>


							<div class="errorDiv hideBlock errorDivition" style="display: inline-table;">
								<label class="warnin">No results found for '<strong>xhbr2</strong>'.
									Please try a different User ID.
								</label> <label class="closeMessage">&nbsp;</label>
							</div>

						</div>
						<!-- End of lookup action wrapper -->

					</div>
					<!-- End of table actions btn wrapper -->

					<div class="tableActionsWrapper hideBlock" id="tableAddAction">

						<form method="POST" action="" id="">
							<div class="formWrapper alignParameter">

								<div class="parameter">


									<label for="userID">User&nbsp;&nbsp;</label> <input type="#"
										class="textbox" name="userId" id="userID"
										placeholder="User ID or Name"> <label class="linkBtn"
										id="verifyUser"><label
										class="advancedSearch verifyUser">Verify</label></label> <label
										class="linkBtn hideBlock" id="verifyLabel"><label
										class="verified">Verified</label></label>
									<!-- <div class="userOptions">&nbsp;&nbsp;
									<input type="radio" checked="" id="uid" value="uid" name="userVerify"><label class="labelText" for="uid">ID</label>
									<input type="radio" id="uname" value="uname" name="userVerify"><label class="labelText" for="uname">Name</label>
								</div> -->


								</div>
								<!-- End of parameter -->


								<div class="parameter hideBlock">


									<label for="userID1" class="">Copy User</label> <input type="#"
										class="textbox" name="userIdSearch" id="userID1"
										placeholder="User ID or Name"> <label class="linkBtn"
										id="copyUser"><label class="advancedSearch copyUser">Verify</label></label>
									<!-- <div class="userOptions">&nbsp;&nbsp;
									<input type="radio" checked="" id="uid" value="uid" name="userVerify"><label class="labelText" for="uid">ID</label>
									<input type="radio" id="uname" value="uname" name="userVerify"><label class="labelText" for="uname">Name</label>
								</div> -->


								</div>
								<!-- End of parameter -->



								<div class="parameter clearfix">
									<label for="store">Active Date</label> <input type="#"
										class="textbox defaultTextbox inputDate" name="dateFrom"
										id="dateFrom" defaultVal="dd/mm/yyyy"> to <input
										type="#" class="textbox defaultTextbox inputDate"
										name="dateTo" id="dateTo" defaultVal="dd/mm/yyyy">
								</div>
								<!-- End of parameter -->


								<div class="parameter clearfix hideIfSM">
									<label for="salesOrg">Sales Org.</label> <select
										class="selectOptions salesOrgMap" name=saleOrg style="width: 51%;">
										<option>Select</option>
										<c:forEach items="${salesOrgMap}" var="salesOrgMap">
											<option id="${salesOrgMap.key}" value="${salesOrgMap.key}">${salesOrgMap.value}</option>
										</c:forEach>
									</select>
								</div>

								<div class="parameter clearfix">
									<label for="article">Role</label> <select
										class="selectOptions roleList" name="roleId" style="width: 51%;" >
										<option>Select</option>
										<%-- <c:forEach items="${roleList}" var="roleList">
											<option class="salesOrgFil hideBlock sales-${roleList.salesOrg}" id="${roleList.code}" value="${roleList.code}">${roleList.desc}</option>
										</c:forEach> --%>
									</select>
								</div>
								<div class="parameter clearfix">
										
									<label for="article">Department</label>
									
									<label for="article">Select Primary Department(s)</label><label for="article"></label>
								</div>
								<div class="parameter clearfix">
										<label for="article"></label>
										<label><div class="hierarchyWrapper" id="hierarchyDiv2" style="width: 235px;  /* padding-left: 24.5%; */  padding-top: 5px;padding-right: 8px;letter-spacing: 24.5%;/* left: 59px; *//* position: inherit; */">
					
												<div class="hierarchyContent" id="deptDiv" style="width: auto !important;  min-width: 233px;">
						
													<div class="hierarchyTitle" style="
    background-image: none;
">
														<input type="checkbox" name="deptAll1" value="" id="deptAll1" class="hideBlock">
														<input type="checkbox" name="deptAll" value="" id="deptAll" style="display: inline-block;">
														<label for="deptAll" class="">Select All</label>
													</div>
							
												<div class="hierarchyList">Select Sales org to load department list.
												</div>
												</div></div>
										</label>
												
											
												
							
												
												
												
												
												
									
										
										
									</div>
								<!-- End of parameter -->

								<div class="parameter parameterRow parameterOptions hideIfSM showIfSOM">
									<label for="pos">Access to</label> <span
										class="parameterOptionsRadio"> <input type="radio"
										name="pos" value="multiple" id="multiple" checked><label
										for="multiple" class="labelText">Stores</label> <!-- <input type="radio" name="pos" value="single" id="single" ><label for="single" class="labelText">Region</label> -->
									</span>



									<div class="parameter parameterOptionsInputBox">


										<span id="multiplePOS" class=""> <input type="#"
											class="textbox" placeholder="Enter store # or name">
											<label class="linkBtn"><label
												class="advancedSearch verifyStore">Verify & Add</label></label>

											<ul class=" storeList parameterOptionsListInline">


											</ul>

										</span>


										<!-- <span id="singlePOS">
											<select class="selectOptions">
												<option>Select</option>
												<option>Region 1</option>
												<option>Region 2</option>
												
											</select>
											<label class="linkBtn" id=""><label class="advancedSearch ">Show Stores</label></label>
											
											<ul class="parameterOptionsListInline">
												<li>
													<label>1518 | Richmond store </label>
													<label class="closeMessage">&nbsp;</label>
												</li>
												<li>
													<label>1618 | Bella Vista store </label>
													<label class="closeMessage">&nbsp;</label>
												</li>
												<li>
													<label>1610 | Dural store </label>
													<label class="closeMessage">&nbsp;</label>
												</li>
													
											</ul>
											
										</span>	 -->


									</div>
									<!-- End of parameter -->

								</div>
								<!-- End of parameter -->




								<div class="formActions">
									<label class="actionBtn">Save</label> <label
										class="secondaryActionBtn closeLink" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
						</form>

					</div>
					<!-- End of table Actions Wrapper -->


					<div class="tableActionsWrapper hideBlock" id="tableSearchAction">

						<form method="POST" action="" id="">
							<div class="formWrapper">

								<div class="parameter">
									<label for="userID" class="">Search</label> <input type="#"
										class="textbox" id="userID"
										placeholder="Enter User ID or Name">


								</div>
								<div class="parameter">
									<label for="searchStatus" class="">Status</label> <select 
										class="selectOptions " id="searchStatus">
										<option value="">All</option>
										<option value="Active">Active</option>
										<option value="inActive">Inactive</option>
									</select>


								</div>
								<!-- End of parameter -->

								<div class="formActions">
									<label class="actionBtn searchLink">Search</label> <label
										class="secondaryActionBtn resetLink">Reset</label> <label
										class="secondaryActionBtn closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
						</form>

					</div>
					<!-- End of table Actions Wrapper -->



					<table cellspacing="0" class="ContentTable  sortTable drilldownTable treetable "
						id="userList"><!-- removed actionRows class to avoid cursor on hovering the tr for UAT defect no 2101 -->
						<thead>
							<tr>
								<th data-sort="string">User ID</th>
								<th data-sort="string" class="sorted ascending">User Name</th>
								<th data-sort="string">Role</th>
								<th>Primary Dept.</th>
								<th data-sort="string">Store</th>
								<th data-sort="string">Primary</th>
								<th data-sort="string">Status</th>
								<th data-sort="string">Created on</th>
								<th class="lastColumn centerValue" data-sort="string"
									width="70px">Actions</th>
							</tr>
							<!--  
							<tr id="filterRowHead">
								<td class="headH"><input type="#" class="textbox Filter"
									data-filterfor="userId"></td>
								<td class="headH"><input type="#" class="textbox Filter"
									data-filterfor="userName"></td>
								<td class="headH"><input type="#" class="textbox Filter"
									data-filterfor="role"></td>
								<td class="headH"><input type="#" class="textbox Filter"
									data-filterfor="primaryDpt"></td>
								<td class="headH"><input type="#" class="textbox Filter"
									data-filterfor="store"></td>
								<th data-sort="string">Primary</th>
								<td class="headH"><input type="#" class="textbox Filter"
									data-filterfor="status"></td>
								<td data-sort="string"></tb>
								<td class="lastColumn centerValue" data-sort="string"
									width="70px">Actions</td>
							</tr>
							-->
						</thead>
						<c:set value="0" var="count"></c:set>
						<c:set value="1" var="pageCnt"></c:set>

						<c:forEach items="${userSiteDtlList}" var="userSiteDtlList">
							<c:set value="${userSiteDtlList.value}" var="userDtlList"></c:set>

							<tr
								class=' pageNo-<c:out value="${pageCnt}"></c:out> contentTr <c:if test="${pageCnt>1}"> hideBlock </c:if> 
								<c:if
										test="${userDtlList.size()==1}"> actionRows  contentRow </c:if>'>

								<td class="${properties.ViewUserdetails}">${userDtlList.get(0).userId}</td>
								<td>${userDtlList.get(0).userName}</td>
								<td>${userDtlList.get(0).roleDesc}</td>
								<td>${userDtlList.get(0).dept}</td>
								<td>${userDtlList.get(0).siteId}</td>
								<td class="primaryFlag"><c:if
															test="${userDtlListDtl.activeFlag=='Y'}"><label class="positiveStatus"></label></c:if> <c:if
															test="${userDtlListDtl.activeFlag=='N'}"><label class="negativeStatus"></label></c:if></td>
								
								<td class="statusFlag"><c:if
										test="${userDtlList.get(0).activeFlag=='Y'}">Active</c:if> <c:if
										test="${userDtlList.get(0).activeFlag=='N'}">Deactive</c:if></td>
								<td>${userDtlList.get(0).createdDate}</td>
								<td class="lastColumn centerValue"><c:if
										test="${userDtlList.size()==1}">
										<label class="linkBtn"> <label
											class="changePassword "
											title="Reset Password">Reset Password</label>
										</label>
										<label
											class="linkBtn  <c:if test="${userDtlList.get(0).activeFlag=='N'}">hideBlock</c:if>	 ">
											<label class="deactivateUser ${properties.UpdateUserDetails}"
											title="De-activate User">De-activate </label>
										</label>
									</c:if> <c:if test="${userDtlList.size()>1}">
										<a class="moreNumber moreDisplayBtn"><span>+ </span> <c:out
												value="${userDtlList.size()}"></c:out></a>
									</c:if></td>
							</tr>
							<!-- <tr> -->

							<%-- 
								<td colspan="6" class="contentTd"><img
									id="266868-promo-trigger" class="add-info-img"
									src="../../images/woolworths/iconOpenAccordion.png">
									${userSiteDtlList.key} - ${userDtlList.get(0).userName}</td> --%>
							<c:if test="${not empty userDtlList}">
								<tr class="hideBlock accord">
									<td colspan="11">
										<table class="secondaryTable actionRows" style="width: 100%;">
											<tr>
												<th data-sort="string">User ID</th>
												<th data-sort="string">User Name</th>
												<th data-sort="string">Role</th>
												<th>Primary Dept.</th>
												<th data-sort="string">Store</th>
												<th data-sort="string">Primary</th>
												<th data-sort="string">Status</th>
												<th data-sort="string">Created on</th>
												<th class="lastColumn centerValue" data-sort="string"
													width="70px">Actions</th>
											</tr>
											<c:forEach items="${userDtlList}" var="userDtlListDtl">
												<tr class=" contentRow">
													<td class="${properties.ViewUserdetails}">${userDtlListDtl.userId}</td>
													<td class="">${userDtlListDtl.userName}</td>
													<td>${userDtlListDtl.roleDesc}</td>
													<td>${userDtlListDtl.dept}</td>
													<td>${userDtlListDtl.siteId}</td>
													<td class="primaryFlag"><c:if
															test="${userDtlListDtl.activeFlag=='Y'}"><label class="positiveStatus"></label></c:if> <c:if
															test="${userDtlListDtl.activeFlag=='N'}"><label class="negativeStatus"></label></c:if></td>

													<td class="statusFlag"><c:if
															test="${userDtlListDtl.activeFlag=='Y'}">Active</c:if> <c:if
															test="${userDtlListDtl.activeFlag=='N'}">Deactive</c:if></td>
													<td>${userDtlListDtl.createdDate}</td>
													<td class="lastColumn centerValue"><label
														class="linkBtn"> <label
															class="changePassword ${properties.UpdateUserDetails} "
															title="Reset Password">Reset Password</label>
													</label> <label
														class="linkBtn  <c:if test="${userDtlListDtl.activeFlag=='N'}">hideBlock</c:if>	 ">
															<label
															class="deactivateUser ${properties.UpdateUserDetails}"
															title="De-activate User">De-activate </label>
													</label></td>
												</tr>
											</c:forEach>
										</table>
							</c:if>
							</td>
							</tr>
							<c:set value="${count+1}" var="count"></c:set>
							<c:if test="${count%10==0}">
								<c:set value="${pageCnt+1}" var="pageCnt"></c:set>
							</c:if>
						</c:forEach>

					</table>
					<div id="table-legend" class="tableFooter legendDiv"><div class="legend"> Legend: <label class="positiveStatus">Primary Store</label><label class="negativeStatus">Non Primary Store</label><label>
								</label></div>
					<div
						class="paginationWrapper bottomPagination paginationDiv searchPagination"
						id="paginationDiv2">
						<div class="pagination-holder clearfix">
							<div id="compact-pagination"
								class="compact-theme simple-pagination"></div>
						</div>
					</div>			
					</div>
					
				</div>
				<!-- End of content table wrapper -->




			</div>


		</form:form>

		<input id="navBarHighlight" type="hidden" value="admin" />

	</div>
	<%@include file="footer.jsp"%>
	<div id="dialog-modal" title="User Role Management">
		<div class="popupContent">

			<div class="popupData">
				<h4 class="alertText">User Preferences has been saved
					successfully.</h4>

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn okBtn"
						onclick="$('#dialog-modal').dialog('close');">Ok</label>
					</span>
				</div>
				<!-- End of popup actions-->
			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-modalDeactive" title="User Management">
		<div class="popupContent">

			<div class="popupData">


				<h4 class="alertText" id="alertBox">There is no article to be
					received. Cannot finalize the order.</h4>
				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn" id="no">No</label>
					</span> <span class="popupActions"> <label class="actionBtn"
						id="yes">Yes</label>
					</span>
				</div>
				<!-- End of popup actions-->
			</div>
		</div>
		<!-- End of popupContent -->
	</div>
	<%@include file="verifyStorePopUp.jsp" %>


	<div id="dialog-modal-Edit" title="Edit User Details" tabIndex="1">
		<div class="popupContent">

			<div class="popupData">




				<form method="POST" action="" id="">
					<div class="ContentTableWrapper formWrapper" style="max-height: 600px">


						<div class="parameter clearfix"> 
						<input type="hidden" autofocus="autofocus" />
							<label for="store" class="">Active Date</label> <input type="#"
								class="textbox defaultTextbox inputDate" name="fromDte"
								id="fromDte" placeholder="dd/mm/yyyy"> to <input
								type="#" class="textbox defaultTextbox inputDate" name="toDte"
								id="toDte" placeholder="dd/mm/yyyy">
						</div>
						<!-- End of parameter -->

						<div class="parameter clearfix hideIfSM">
							<label for="article" class="">Sales org.</label> <select
								class="selectOptions popUpSalesOrg" style="width: 42%;" >
								<option>Select</option>
								<c:forEach items="${salesOrgMapForEdit}" var="salesOrgMap">
									<option id="${salesOrgMap.key}" value="${salesOrgMap.key}">${salesOrgMap.value}</option>
								</c:forEach>
							</select>
						</div>
						<div class="parameter clearfix">
							<label for="article" class="">Role</label> <select
								class="selectOptions popUpRoles" style="width: 42%;" >
								<option>Select</option>
								<%-- <c:forEach items="${roleList}" var="roleList">
											<option class="salesOrgPopup hideBlock ${roleList.code} popUpSales-${roleList.salesOrg}" id="${roleList.code}" value="${roleList.code}">${roleList.desc}</option>
										</c:forEach> --%>
							</select>
						</div>
						<!-- End of parameter -->


						<!-- <div class="parameter clearfix">
							<label for="article" class="">Primary Dept.</label> <select
								class="selectOptions popUpDept">
								<option>Select</option>
								<%-- <c:forEach items="${model.deptInfoList}" var="deptInfo">
									<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
								</c:forEach> --%>
							</select>
						</div>
						<!-- End of parameter -->
						
						<div class="parameter clearfix">
										
									<label for="article">Department</label>
									
									<label for="article">Select Primary Department(s)</label><label for="article"></label>
								</div>
								<div class="parameter clearfix">
										<label for="article"></label>
										<label><div class="hierarchyWrapper" id="hierarchyDiv2" style="width: 235px;  /* padding-left: 24.5%; */  padding-top: 5px;padding-right: 8px;letter-spacing: 24.5%;/* left: 59px; *//* position: inherit; */">
					
												<div class="hierarchyContent" id="deptDiv" style="width: auto !important;  min-width: 233px;">
						
													<div class="hierarchyTitle" style="
    background-image: none;
">	
														<input type="checkbox" name="deptAll1" value="" id="deptAll1" class="hideBlock">
														<input type="checkbox" name="deptAll" value="" id="deptAll" style="display: inline-block;">
														<label for="deptAll" class="">Select All</label>
													</div>
							
												<div class="hierarchyList">Select Sales org to load department list.
												</div>
												</div></div>
										</label>
												
											
												
							
												
												
												
												
												
									
										
										
									</div>


						<div
							class="parameter parameterRow parameterOptions hideBlock clearfix">
							<label for="pos">Store</label> <span id="singlePOS"> <input
								type="#" style="width: auto;" class="textbox"
								placeholder="Enter store # or name"> <label
								class="linkBtn" id=""><label
									class="advancedSearch verifyPopupStore">Verify</label></label>
							</span>
							<!-- <span
								class="parameterOptionsRadio"> <input type="radio"
								name="pos" value="single" id="single" checked><label
								for="single" class="labelText">Single</label> <input
								type="radio" name="pos" value="multiple" id="multiple"><label
								for="multiple" class="labelText">Multiple</label>
							</span> -->



							<div class="parameter parameterOptionsInputBox">

								<!-- <span id="singlePOS"> <input type="#" class="textbox"
									placeholder="Enter store # or name"> <label
									class="linkBtn" id="verifyUser"><label
										class="advancedSearch">Verify</label></label>
								</span>  <span id="multiplePOS" class="hideBlock"> <input
									type="#" class="textbox" placeholder="Enter store # or name">
									<label class="linkBtn" id="verifyUser"><label
										class="advancedSearch">Verify & Add</label></label>

									<ul class="parameterOptionsListInline">
										<li><label>1518 | Richmond store </label> <label
											class="closeMessage">&nbsp;</label></li>
										<li><label>1618 | Bella Vista store </label> <label
											class="closeMessage">&nbsp;</label></li>
										<li><label>1610 | Dural store </label> <label
											class="closeMessage">&nbsp;</label></li>

									</ul>

								</span> -->
							</div>
							<!-- End of parameter -->

						</div>
						<!-- End of parameter	 -->

						<div class="errorDiv parameter">
							<label style="width:90%"></label>
						</div>



					</div>
					<!-- End of content table wrapper -->
				</form>
			</div>
			<!-- End of pop up data -->

		
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"
					tabindex="2" id="saveBtn">Save</label> <label
					class="secondaryActionBtn"
					onclick="$('#dialog-modal-Edit').dialog('close');" tabindex="3"
					id="cancelDelivery">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of popupContent -->
		
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
						</span><span class="popupActions hideBlock confirmation-nobtn" id="nobtn">
							<label class="actionBtn">No</label>
						</span> <span class="popupActions hideBlock confirmation-yesbtn"
							id="yesbtn"> <label class="actionBtn">Yes </label>
						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
		</div>
		
	</div>

</body>
</html>