<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

<title>User Role Management</title>
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
<script type="text/javascript" src="../../scripts/adminRoleMgt.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>

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
						<li class="currentPage">User Role Management</li>
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


			<div class="contentWrapper directContent settings">



				<!-- For displaying report results -->
				<div class="ContentTableWrapper">

					<div class="tableInfo tempPadding" style="padding-top:0px!important;">

						<div class="tableTitle" >
							<h4>
								<strong>User Role Management</strong>
							</h4>
						</div>
						<!-- End of table title -->


					</div>
					<!-- End of table info -->



					<div class="articleHead">
						<div class="articleHeaderWrapper">
							<h2 class="articleTitle">
								Role <select class="selectOptions">
									<option id="All" value="All">All</option>
									<c:forEach items="${roleList}" var="roleList">
										<option id="${roleList.code}" value="${roleList.code}" status="${roleList.checked}">${roleList.desc}</option>
									</c:forEach>
								</select>


							</h2>
							<p>
								<label class="articlePriceLabel">Select a role to
									activate various features for it. </label>
							</p>
						</div>
						<div class="articleActionBtns hideBlock">

							<label class="actionBtn" id="createOrderButton"><label
								class="thumbUp">Save</label></label> <label class="secondaryActionBtn">Cancel</label>


						</div>
					</div>
					<!-- End of Article head -->



					<div id="tabs">

						<ul>
							<c:forEach items="${salesOrgMap}" var="salesOrgMap">
								<li><a href="#tabs-${salesOrgMap.key}"
									onclick="deselectCheckBoxes(${salesOrgMap.key});">${salesOrgMap.value}</a></li>
							</c:forEach>
						</ul>

						<c:forEach items="${salesOrgMap}" var="salesOrgMap">
							<%-- <div id="tabs-${salesOrgMap.key}"></div> --%>

							<div id="tabs-${salesOrgMap.key}">
								<div class="ContentTableWrapper">

									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle">
												Role <select class="selectOptions">
													<option id="All" value="All">All</option>
													<c:forEach items="${roleList}" var="roleList">
														<option id="${roleList.code}" value="${roleList.code}" >${roleList.desc}</option>
													</c:forEach>
												</select>
											</h2>
											<p>
												<label class="articlePriceLabel">Select a role to
													activate various features for it.</label>
											</p>
										</div>
										<div class="articleActionBtns">

											<label class="actionBtn" id="createOrderButton"><label
												class="thumbUp">Save</label></label> <label
												class="secondaryActionBtn">Cancel</label>


										</div>
									</div>
									<!-- End of Article head -->

									<div class="hierarchyWrapper settingsWrapper">
										<div class="tableInfo">
											<div class="tableTitle">
												<h4>
													<strong>Select features to be available for users
														with <strong class="roleName"></strong> role
													</strong>
												</h4>
											</div>
										</div>
										<c:forEach items="${applicationSettingsDetailMap}"
											var="applicationSettingsDetailMap">
											<c:set var="menuOptionMap"
												value="${applicationSettingsDetailMap.value}"></c:set>
											<c:choose>
												<c:when
													test="${applicationSettingsDetailMap.key==properties.Lookup}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Lookup</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		name="lookupList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="lookupList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="lookupList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText lookupList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="lookupList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="lookupListTotal_${salesOrgMap.key}">1</strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												<c:when
													test="${applicationSettingsDetailMap.key==properties.Orders}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Orders</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		name="orderList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="orderList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="orderList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText orderList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="orderList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="orderListTotal_${salesOrgMap.key}">6</strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												<c:when
													test="${applicationSettingsDetailMap.key==properties.Reports}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Reports</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li class="alreadyAddedRow"><input type="checkbox"
																		${menuOptionMapList.checked} disabled
																		name="reportsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="reportsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="reportsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText reportsList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="reportsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="reportsListTotal_${salesOrgMap.key}">5</strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												<c:when
													test="${applicationSettingsDetailMap.key==properties.StockManagement}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Stock Management</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		name="stockManagementList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="stockManagementList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="stockManagementList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText stockManagementList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="stockManagementList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="stockManagementListTotal_${salesOrgMap.key}">1</strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												<c:when
													test="${applicationSettingsDetailMap.key==properties.Pricing}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Pricing</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		name="pricingList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="pricingList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="pricingList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText pricingList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="pricingList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="pricingListTotal_${salesOrgMap.key}">1</strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												<c:when
													test="${applicationSettingsDetailMap.key==properties.Ticketing}">
													<div class="hierarchyContent">
														<div class="hierarchyTitle">
															<h3>Ticketing</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		class="labelText ticketing_${salesOrgMap.key}"
																		name="ticketingList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="ticketingList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="ticketingList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"><label title="${menuOptionMapList.description}"
																		for="ticketingList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">
																			${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="ticketingListTotal_${salesOrgMap.key}">1</strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												<c:when
													test="${applicationSettingsDetailMap.key==properties.Admin}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Admin</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		name="adminList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="adminList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="adminList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText adminList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="adminList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="adminListTotal_${salesOrgMap.key}">6</strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												<c:when
													test="${applicationSettingsDetailMap.key==properties.Promotions}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Promotions</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		name="promoList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="promoList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="promoList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText promoList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="promoList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="promoListTotal_${salesOrgMap.key}">6</strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												<c:when
													test="${applicationSettingsDetailMap.key==properties.Routines}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Routines</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		name="routinesList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="routinesList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="routinesList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText routinesList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="routinesList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="promoListTotal_${salesOrgMap.key}">6</strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												<c:when test="${applicationSettingsDetailMap.key==properties.RepairCentre and user.salesOrg!='1060' and salesOrgMap.key!='1060' }">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Repair Centre</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		name="otherToolsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="otherToolsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="otherToolsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText radioLable otherToolsList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="otherToolsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="repairListMenuTotal_${salesOrgMap.key}"></strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												
												<c:when test="${applicationSettingsDetailMap.key==properties.OtherTools}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>Other Tools</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked} disabled
																		name="otherToolsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="otherToolsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="otherToolsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText radioLable otherToolsList_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="otherToolsList_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="repairListMenuTotal_${salesOrgMap.key}"></strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												
												<c:when test="${applicationSettingsDetailMap.key==properties.posroles}">
													<div class="hierarchyContent noProcess">
														<div class="hierarchyTitle">
															<h3>1POS Roles</h3>
														</div>
														<div class="hierarchyList">
															<ul>
																<c:forEach items="${menuOptionMap}"
																	var="menuOptionMapList">
																	<li><input type="checkbox" ${menuOptionMapList.checked}
																		name="1posroles_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		value="1posroles_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		id="1posroles_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
																		class="labelText radioLable 1posroles_${salesOrgMap.key}"><label title="${menuOptionMapList.description}"
																		for="1posroles_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
																</c:forEach>
															</ul>
														</div>
														<div class="heirachyBottom">
															<span class="totalCount"> <label>Total:<strong
																	class="1posrolesTotal_${salesOrgMap.key}"></strong>
																	selected
															</label>
															</span>
														</div>
													</div>
												</c:when>
												
											

											</c:choose>
										</c:forEach>
									</div>
									<div class="pageActions ">
										<label class="actionBtn"><label class="thumbUp"
											id="saveBtn_${salesOrgMap.key}">Save</label></label> <label
											class="secondaryActionBtn cancelBtn-${salesOrgMap.key}"
											onclick="javaScript:window.location.href='../login/goingHome.htm'"
											id="cancelBtn_${salesOrgMap.key}">Cancel</label>
									</div>
								</div>

							</div>
						</c:forEach>
					</div>


				</div>
				<!-- End of Content Table Wrapper-->






			</div>
			<!-- End of content wrapper -->




		</form:form>

		<input id="navBarHighlight" type="hidden" value="admin" /> <input
			id="salesOrgExcludeMap" type="hidden"
			value="<c:forEach items="${salesOrgExcludeMap}" var="salesOrgExcludeMap"> 
		<c:set var="salesOrgExcludeMapValue" value="${salesOrgExcludeMap.value}"></c:set>
		<c:forEach items="${salesOrgExcludeMapValue}" var="salesOrgExcludeMapValueList"> 
		${salesOrgExcludeMap.key}:${salesOrgExcludeMapValueList},</c:forEach></c:forEach>" />


		<input id="additionalAccess" type="hidden"
			value="<c:forEach items="${additionalAccess}" var="additionalAccess"> 
		<%-- <c:set var="salesOrgExcludeMapValue" value="${salesOrgExcludeMap.value}"></c:set> --%>
		${additionalAccess},</c:forEach>" />


	</div>
	<%@include file="footer.jsp"%>

</body>
</html>