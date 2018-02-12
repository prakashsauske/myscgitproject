<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Preferences</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/home.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
</head>
<body>


	<div class="mainWrapper">
		<input type="hidden" id="userPreferenceSize"
			value="${model.param.userPreferencesSize}">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Preferences</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label
						class="secondaryActionBtn backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>

		</div>
		<!-- End of head wrapper -->
		<form:form id="userPreferences" method="get" action="#"
			modelAttribute="userPreferences">

			<div class="contentWrapper directContent">
			<div class='tabs'>
			<ul id="listOfTabs">
				<li class="myShortCutsTab"><a href="#myShortCuts" class="">My Shortcuts</a></li>
				<li class="myDepartmentsTab"><a href="#myDepartments" class="">My Departments</a></li>
			</ul>
			
			<div class="directContent" id="myShortCuts">
				<div class="innerSection" style="padding: 6px 9px!important;">
						<h4 class="sectionTitle">
							<strong>Platform </strong>   <input type="radio" name="platform" value="B" id="BROWSER" checked><label for="BROWSER" class="labelText">Browser</label> <input type="radio" name="platform" value="M" id="MOBILE"><label for="MOBILE" class="labelText">Mobile</label>
						</h4>

				</div>
				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4>Select shortcut links for Home page</h4>
						</div>
						<!-- End of table title -->

						<div class="paginationWrapper">
							<label id="preview" class="linkBtn"><label
								class="advancedSearch previewBtn">Preview</label></label>
						</div>
						<!-- End of pagination Wrapper -->

					</div>
					<!-- End of table info -->
					<div class="articleHead orderHead">
						<div class="articleHeaderWrapper">
							<h2 class="articleTitle">
								Role <select class="selectOptions role-dropdown">
									<!-- <option value="Select">Select</option> -->
									<c:forEach items="${roleList}" var="siteDtlsList">
										<c:if test="${siteDtlsList.salesOrg==user.salesOrg}">
											<option value="${siteDtlsList.roleId}">${siteDtlsList.roleDesc}</option>
										</c:if>
									</c:forEach>
								</select>


							</h2>
							<p>
								<label class="articlePriceLabel" id="selectRole">You are
									assigned multiple roles, so select a role to define role
									specific shortcuts</label> <label class="articlePriceLabel hideBlock"
									id="storesList"><strong>Stores:</strong> 1008 - Chester
									Hills, 2008 - Lane Cove</label>
							</p>
						</div>
						<div class="articleActionBtns ">

							<label class="actionBtn" id="createOrderButton"><label
								class="thumbUp saveBtn">Save</label></label> <label class="secondaryActionBtn cancelBtn">Cancel</label>


						</div>
					</div>
					<!-- End of Article head -->
					<div class="hierarchyWrapper accumulatorWrapper "><!-- userPreferenceAlignFix -->

						<!-- available  -->
						<div class="hierarchyContent">

							<div class="hierarchyTitle">
								<h3>Available Shortcuts</h3>
							</div>
							<!-- End of hierarchy Title -->

							<div class="hierarchyList">
								<ul>
									<c:forEach items="${model.defaultPreferenceMap}"
										var="defaultPreferenceMap">
										<c:set value="${defaultPreferenceMap.value}" var="value"></c:set>
										<c:if test="${not empty value}">
											<li><label class="titleText">${value.get(0).rootCodeDesc}</label></li>
											<c:forEach items="${value}" var="pref">
												<li class="un-selected-list ${pref.code}"><input
													type="checkbox" name="unselected-checkbox"
													value="${pref.code}" id="${pref.code}"><label
													for="${pref.code}" class="labelText">${pref.description}</label></li>
											</c:forEach>
										</c:if>
									</c:forEach>
								</ul>
							</div>
							<!-- End of hierarchy list -->
							<div class="heirachyBottom">
								<span class="totalCount"> <label>Total:<strong>${defaultPreferenceMap.size()}</strong></label>
								</span>
							</div>
							<!-- End of heirachy bottom -->
						</div>
						<!-- End of hierarchy Content -->


						<div class="hierarchyActions accumulatorActions">
							<ul>
								<li><button type="button" class="secondaryActionBtn"> <label
										class="addItem addBtn">Add</label>
								</button></li>
								<li><button type="button" class="secondaryActionBtn"> <label
										class="removeItem removeBtn">Remove</label>
								</button></li>
							</ul>
						</div>
						<!-- End of hierarchy actions -->


						<!-- Selected  -->
						<div class="hierarchyContent lastContent">

							<div class="hierarchyTitle">
								<h3>Selected Shortcuts</h3>
							</div>
							<!-- End of hierarchy Title -->

							<div class="hierarchyList">
								<c:set var="count" value="1"></c:set>
								<ul id="sortable">
									<c:forEach items="${model.userPreferenceMap}"
										var="userPreferenceMap">
										<c:set value="${userPreferenceMap.value}" var="value"></c:set>
										<li id="${count}"
											class="selected-list ${defaultPreferenceMap.key}"><input
											type="checkbox" name="selected-checkbox"
											value="${userPreferenceMap.key}"
											id="${userPreferenceMap.key}_up"><label
											class="labelText">${value.description}</label></li>
										<c:set var="count" value="${count+1}"></c:set>
									</c:forEach>
								</ul>
							</div>
							<!-- End of hierarchy list -->

							<div class="heirachyBottom">
								<span class="totalCount"> <label>Total:<strong
										class="selected-count">${userPreferenceMap.size()}</strong></label>
								</span>
							</div>
							<!-- End of heirachy bottom -->


						</div>
						<!-- End of hierarchy Content -->


						<div class="hierarchyActions accumulatorActions lastRight">
							<ul>
								<li><button type="button" class="secondaryActionBtn"> <label
										class="upItem upBtn">Up</label>
								</buttob></li>
								<li><button type="button" class="secondaryActionBtn"> <label
										class="downItem downBtn">Down</label>
								</button></li>
							</ul>
						</div>
						<!-- End of hierarchy actions -->



					</div>
					<!-- end of hierarchy Wrapper -->

				</div>
				<!-- End of Content Table Wrapper -->

				<div class="pageActions ">
					<label class="actionBtn" id="createOrderButton"><label
						class="thumbUp saveBtn">Save</label></label> <label
						class="secondaryActionBtn cancelBtn">Cancel</label>
				</div>
				<!-- End of page actions-->

			</div>
			
			
			<div class="tableActionsWrapper" id="myDepartments" style="heigth:370px!important">

						
							<div class="formWrapper alignParameter">
								
								<div class="hideBlock" id="deptInfoList" >${deptInfoList}</div>
								<div class="hideBlock" id="usrDeptInfoList" >${usrDeptInfoList}</div>
								
								<div class="parameter clearfix">
									<label for="article"></label> 
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
">							<input type="checkbox" name="deptAll1" value="" id="deptAll1" style="
    display: none;
">
														<input type="checkbox" name="deptAll" value="" id="deptAll" style="
    display: inline-block;
"><label for="deptValue0" class="">Select All</label>
													</div>
							
												<div class="hierarchyListTmp" id="deptList">Select Sales org to load department list.
												</div>
												</div></div>
										</label>
												
											
												
							
												
												
												
												
												
									
										
										
									</div>
									<div class="errorDiv parameter myDepError hideBlock">
									<label style="width:100%!important;">Select 1 department.</label><!-- Changed msg for UAT defect no 2123 -->
								</div>
								<!-- End of parameter -->

								
								<!-- End of parameter -->



					
								<div class="formActions">
									<label class="actionBtn" id="savePrimaryDepts">Save</label> <label class="secondaryActionBtn closeLink" id="closeLink" onclick="$('.backBtn').trigger('click');">Cancel</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
						

					</div>
	</div>
			</div>
			<!-- End of content wrapper -->
		</form:form>


	</div>
	<%@include file="footer.jsp"%>

	<input id="navBarHighlight" type="hidden" value="home" />
	<!-- Password expired popup -->
	<div id="dialog-modal" title="User Preferences">
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
	<!-- End Cancel order popup -->
	<div id="dialog-modal-userPreview" title="Preview">
		<div class="popupContent">

			<div class="popupData ">
				<div class="iFrameWrapper previewData">
					<iframe class="iframeWrapper" id="iframeData"></iframe>
				</div>
				<!-- End of iFrame Wrapper -->

				<div class="iframeBlocker">&nbsp;</div>
				<!-- End of iFrame blocker -->

			</div>
			<!-- End of pop up data -->
			<div class="popupData">

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						onclick="$('#dialog-modal-userPreview').dialog('close');">OK</label>
					</span>
				</div>
				<!-- End of popup actions-->

			</div>
		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of popup -->
	
	<div id="dialog-info-alert" title="User Management">
	<div class="popupContent">

		<div class="popupData">


			<h4 class="alertText" id="alertInfoText">There is no article to
			
				be received. Cannot finalize the order.</h4>

			<!-- Commented by Haresh
								<div class="ContentTableWrapper popMessage">

									<label id="alertBox">There is no article to be
										received. Cannot finalize the order</label>

								</div>
								 End of content table wrapper -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn" id=""
					onclick="$('#dialog-info-alert').dialog('close');">OK</label>
				</span>
			</div>
			<!-- End of popup actions-->

			<!-- Commented by Haresh 
								<span class="popMessageBtnWrapper"> <label
									class="actionBtn popMessageBtn" id="okBtn">OK</label>
								</span> -->

		</div>
	</div>
	<!-- End of popupContent -->
</div>
</body>
<script src="../../scripts/userPreferences.js?version=${properties.version}"></script>
</html>