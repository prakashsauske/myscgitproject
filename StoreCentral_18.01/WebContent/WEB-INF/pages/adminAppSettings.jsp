<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Application Settings</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<!-- <link href="../../styles/home.css?version=${properties.version}" rel="stylesheet" type="text/css" /> -->
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/applicationSettingsjWizard.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/adminAppSettings.js?version=${properties.version}"></script>
<script type="text/javascript">
	var manageMenuMapJson = "${manageMenuMapJson}";
	var rootCodeMap ="${rootCodeMap}";
	try{
		if(rootCodeMap!=null && rootCodeMap!=undefined){
			rootCodeMap = $.parseJSON(rootCodeMap);
		}else{
			rootCodeMap = {};
		}
	}catch(err){
		rootCodeMap = {};
	}
</script>

</head>
<body>

	<div class="mainWrapper">
		<div class="headWrapper">
			<input id="navBarHighlight" type="hidden" value="admin" />
			<%@include file="header.jsp"%>
			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Application Settings</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->
				<div class="statusWrapper">
					<label class="loading hideBlock">We are getting data,
						please wait</label> <label class="secondaryActionBtn" id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->
			</div>
			<!-- End of breadcrumb wrapper -->
		</div>
		<!-- End of head wrapper -->

		<div class="contentWrapper directContent settings">
			<!-- For displaying report results -->
			<div class="ContentTableWrapper">
				<div class="tableInfo">
					<div class="tableTitle">
						<h4>
							<strong>Application Settings</strong>
						</h4>
					</div>
					<!-- End of table title -->
				</div>
				<div id="platform-tab">
					<ul class="ui-tabs-sales-org">
						<li onclick="setPlateForm('BW');"><a id="tabs-BW-link" class="" href="#tabs-BW">Browser/Mobile</a></li>
						<li onclick="setPlateForm('RF');"><a id="tabs-RF-link" class="" href="#tabs-RF">RF Gun</a></li>
					</ul>
				<div id="tabs-BW" class="app-settings-tabs salesOrgTabs">
					<div class="tableTitle banner-title">
						<h4>
							<span class="step-count">1</span> <label>Select Banner</label>
							<div class="icon-arrow">&nbsp;</div>
						</h4>
					</div>
					<ul class="ui-tabs-BW-sales-org">
						<c:forEach items="${salesOrgMap}" var="salesOrgMap">
							<li><a id="${salesOrgMap.key}" class="salesOrgTab"
								href="#tabs-BW-${salesOrgMap.key}">${salesOrgMap.value}</a></li>
							<!-- onclick="deselectCheckBoxes(${salesOrgMap.key});" -->
						</c:forEach>
					</ul>
					<c:set var="j" value="0"></c:set>
					<c:forEach items="${salesOrgMap}" var="salesOrgMap">
						<c:set var="j" value="${j + 1}"></c:set>
						<div id="tabs-BW-${salesOrgMap.key}" class="sales-org-tabs inner-pad">
							<div class="tableTitle">
								<h4>
									<span class="step-count">2</span> <label>Select Role</label>
									<div class="icon-arrow-down">&nbsp;</div>
								</h4>
							</div>
							<div id="edittabs-BW-${salesOrgMap.key}"
								class="ui-vertical-tabs roleTabs">
								<ul class="ui-tabs-role">
									<c:forEach items="${roleList}" var="roleList">
										<c:if test="${salesOrgMap.key==roleList.salesOrg}">
											<li class="full-width"><a id="${roleList.code}"
												class="roleTab"
												href="#edittabs-BW-${salesOrgMap.key}-${roleList.code}">${roleList.desc}</a></li>
										</c:if>
									</c:forEach>

									<li class="full-width"><a id="allRoles" class="roleTab"
										href="#edittabs-BW-${salesOrgMap.key}-all">All Roles</a></li>
								</ul>
								<c:set var="i" value="0"></c:set>
								<c:forEach items="${roleList}" var="roleList">
									<c:if test="${salesOrgMap.key==roleList.salesOrg}">

										<div id="edittabs-BW-${salesOrgMap.key}-${roleList.code}"
											class="ui-menus-panel functionsTabs">
											<div class="tableTitle">
												<h4>
													<span class="step-count">3</span> <label>Select
														Function & Apply Settings</label>
													<div class="icon-arrow-down">&nbsp;</div>
												</h4>
											</div>

											<div id="menutabs-BW-${salesOrgMap.key}-${roleList.code}"
												class="app-settings-tabs ui-tabs-horizontal ui-tabs ui-widget ui-widget-content ui-corner-all ui-helper-clearfix menuTabs">
											</div>
											<div class="pageActions" id="beforePublish">
												<label class="actionBtn save-app-settings" id="save"><label
													class="thumbUp">Save </label></label> <label
													class="actionBtn replicate" id="replicate"><label
													class="replicate">Replicate Settings</label></label>
											</div>
											<!-- End of page actions-->
										</div>
									</c:if>
								</c:forEach>

								<div id="edittabs-BW-${salesOrgMap.key}-all"
									class="ui-menus-panel functionsTabs">
									<div class="tableTitle">
										<h4>
											<span class="step-count">3</span> <label>Select
												Function & Apply Settings</label>
											<div class="icon-arrow-down">&nbsp;</div>
										</h4>
									</div>

									<div id="menutabs-BW-${salesOrgMap.key}-all"
										class="app-settings-tabs ui-tabs-horizontal ui-tabs ui-widget ui-widget-content ui-corner-all ui-helper-clearfix menuTabs">
									</div>
									<div class="pageActions" id="beforePublish">
										<label class="actionBtn save-app-settings" id="save-all"><label
											class="thumbUp">Save </label></label> <label
											class="actionBtn replicate" id="replicate-all"><label
											class="replicate">Replicate Settings</label></label>
									</div>
									<!-- End of page actions-->
								</div>
							</div>

						</div>
						<!-- End of tab - 1 -->
					</c:forEach>
				</div>
				<!-- End of tabs -->
				<div id="tabs-RF" class="app-settings-tabs salesOrgTabs">
					<div class="tableTitle banner-title">
						<h4>
							<span class="step-count">1</span> <label>Select Banner</label>
							<div class="icon-arrow">&nbsp;</div>
						</h4>
					</div>
					<ul class="ui-tabs-sales-org">
						<c:forEach items="${salesOrgMap}" var="salesOrgMap">
							<li><a id="${salesOrgMap.key}" class="salesOrgTab"
								href="#tabs-RF-${salesOrgMap.key}">${salesOrgMap.value}</a></li>
							<!-- onclick="deselectCheckBoxes(${salesOrgMap.key});" -->
						</c:forEach>
					</ul>
					<c:set var="j" value="0"></c:set>
					<c:forEach items="${salesOrgMap}" var="salesOrgMap">
						<c:set var="j" value="${j + 1}"></c:set>
						<div id="tabs-RF-${salesOrgMap.key}" class="sales-org-tabs inner-pad">
							<div class="tableTitle">
								<h4>
									<span class="step-count">2</span> <label>Select Role</label>
									<div class="icon-arrow-down">&nbsp;</div>
								</h4>
							</div>
							<div id="edittabs-RF-${salesOrgMap.key}"
								class="ui-vertical-tabs roleTabs">
								<ul class="ui-tabs-role">
									<c:forEach items="${roleList}" var="roleList">
										<c:if test="${salesOrgMap.key==roleList.salesOrg}">
											<li class="full-width"><a id="${roleList.code}"
												class="roleTab"
												href="#edittabs-RF-${salesOrgMap.key}-${roleList.code}">${roleList.desc}</a></li>
										</c:if>
									</c:forEach>

									<li class="full-width"><a id="allRoles" class="roleTab"
										href="#edittabs-RF-${salesOrgMap.key}-all">All Roles</a></li>
								</ul>
								<c:set var="i" value="0"></c:set>
								<c:forEach items="${roleList}" var="roleList">
									<c:if test="${salesOrgMap.key==roleList.salesOrg}">

										<div id="edittabs-RF-${salesOrgMap.key}-${roleList.code}"
											class="ui-menus-panel functionsTabs">
											<div class="tableTitle">
												<h4>
													<span class="step-count">3</span> <label>Select
														Function & Apply Settings</label>
													<div class="icon-arrow-down">&nbsp;</div>
												</h4>
											</div>

											<div id="menutabs-RF-${salesOrgMap.key}-${roleList.code}"
												class="app-settings-tabs ui-tabs-horizontal ui-tabs ui-widget ui-widget-content ui-corner-all ui-helper-clearfix menuTabs">
											</div>
											<div class="pageActions" id="beforePublish">
												<label class="actionBtn save-app-settings" id="save"><label
													class="thumbUp">Save </label></label> <label
													class="actionBtn replicate" id="replicate"><label
													class="replicate">Replicate Settings</label></label>
											</div>
											<!-- End of page actions-->
										</div>
									</c:if>
								</c:forEach>

								<div id="edittabs-RF-${salesOrgMap.key}-all"
									class="ui-menus-panel functionsTabs">
									<div class="tableTitle">
										<h4>
											<span class="step-count">3</span> <label>Select
												Function & Apply Settings</label>
											<div class="icon-arrow-down">&nbsp;</div>
										</h4>
									</div>

									<div id="menutabs-RF-${salesOrgMap.key}-all"
										class="app-settings-tabs ui-tabs-horizontal ui-tabs ui-widget ui-widget-content ui-corner-all ui-helper-clearfix menuTabs">
									</div>
									<div class="pageActions" id="beforePublish">
										<label class="actionBtn save-app-settings" id="save-all"><label
											class="thumbUp">Save </label></label> <label
											class="actionBtn replicate" id="replicate-all"><label
											class="replicate">Replicate Settings</label></label>
									</div>
									<!-- End of page actions-->
								</div>
							</div>

						</div>
						<!-- End of tab - 1 -->
					</c:forEach>

				</div>
				<!-- End of tabs -->
				</div>
			</div>
			<!-- End of Content Table Wrapper-->
		</div>
		<!-- End of content wrapper -->
	</div>
	<%@include file="applicationSettingsPopUp.jsp"%>
	<%@include file="footer.jsp"%>
</body>
</html>