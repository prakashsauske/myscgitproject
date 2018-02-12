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
<script type="text/javascript" src="../../scripts/userMgtStoreMgt.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
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
								class="advancedSearch">Search</label></label>
								<label id = "filterOpen" class = "linkBtn"><a><label class = "filter">Filters</label></a></label>
								<label id="filterClear" class = "linkBtn hideBlock"><a><label class = "negativeFlag">Clear Filter</label></a></label>
							   <label class="linkBtn"
								id="addUser">
								<label
								class="addRow  ${properties.Linkexistingusertostore}">Add
									User</label></label>


							<div class="errorDiv hideBlock">
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
										placeholder="User ID or Name"> <input type="hidden"
										name="saleOrg" id="saleOrg" /> <label class="linkBtn"
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

								<div class="parameter clearfix">
									<label for="article">Role</label> <select
										class="selectOptions roleList" name="roleId">
										<option>Select</option>
										<c:forEach items="${roleList}" var="roleList">
											<c:if test="${user.salesOrg==roleList.salesOrg}">
												<option class="sales-${roleList.salesOrg}"
													id="${roleList.code}" value="${roleList.code}">${roleList.desc}</option>
											</c:if>
										</c:forEach>
									</select>
								</div>
								<!-- End of parameter -->


								<div class="parameter clearfix">
									<label for="article">Primary Dept.</label> <select
										class="selectOptions department" name="dept">
										<option>Select</option>
										<c:forEach items="${model.deptInfoList}" var="deptInfo">
											<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
										</c:forEach>
									</select>
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
										placeholder="enter User ID or Name">


								</div>
								<!-- End of parameter -->

								<div class="formActions">
									<!-- <label class="actionBtn searchLink">Search</label>
								<label class="secondaryActionBtn resetLink">Reset</label> -->
									<label class="secondaryActionBtn closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
						</form>

					</div>
					<!-- End of table Actions Wrapper -->



					<table cellspacing="0" class="ContentTable  sortTable "
						id="userList"><!-- removed actionRows class to avoid cursor on hovering the tr for UAT defect no 2101 -->
						<thead>
							<tr>
								<th data-sort="string"  width="60px">User ID</th>
								<th data-sort="string">User Name</th>
								<th data-sort="string" width="110px">Role</th>
								<th data-sort="string">Primary Dept.</th>
								<th class = "centerValue" data-sort="string" width="50px">Status</th>
								<th data-sort="string">Last Login Date</th>
								<th class="lastColumn centerValue" data-sort="string"
									width="70px">Actions</th>
							</tr>
							<tr class="filterRow hideBlock" id="searchUserList">
							<td> <input type="#" class="textBox" width="60px"></td>
							<td> <input type="#" class="textBox" width="90px"></td>
							<td> <input type="#" class="textBox"></td>
							<td> <input type="#" class="textBox"></td>
							<td> <input type="#" class="textBox" width="50px"></td>
							<td> <input type="#" class="textBox"></td>
							</tr>
						</thead>
						<c:set value="0" var="count"></c:set>
						<c:set value="1" var="pageCnt"></c:set>
						<c:forEach items="${userSiteDtlList}" var="userSiteDtlList">
							<tr
								class='pageNo-<c:out value="${pageCnt}"></c:out> contentRow <c:if test="${pageCnt>1}"> hideBlock </c:if>'>

								<td> <a href="#" class="navigate">${userSiteDtlList.userId}</a></td>
								<td>${userSiteDtlList.userName}</td>
								<td>${userSiteDtlList.roleDesc}</td>
								<td>${userSiteDtlList.dept}</td>

								<td class="statusFlag centerValue"><c:if
										test="${userSiteDtlList.activeFlag=='Y'}"><label class = "success">Active</label></c:if> <c:if
										test="${userSiteDtlList.activeFlag=='N'}"><label class = "deactive">Inactive</label></c:if></td>
								<td> ${ userSiteDtlList.lastLoggedinTime}</td>
								<td class="lastColumn centerValue"><label class="linkBtn">
										<label class="changePassword ${properties.UpdateUserDetails}"
										title="Reset Password">Reset Password</label>
								</label> <label
									class="linkBtn  <c:if test="${userSiteDtlList.activeFlag=='N'}">hideBlock</c:if>	 ">
										<label class="deactivateUser ${properties.UpdateUserDetails}"
										title="De-activate User">De-activate </label>
								</label></td>
							</tr>
							<c:set value="${count+1}" var="count"></c:set>
							<c:if test="${count%10==0}">
								<c:set value="${pageCnt+1}" var="pageCnt"></c:set>
							</c:if>
						</c:forEach>

					</table>
					<div
						class="paginationWrapper bottomPagination paginationDiv searchPagination"
						id="paginationDiv2">
						<div class="pagination-holder clearfix">
							<div id="compact-pagination"
								class="compact-theme simple-pagination"></div>
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
	<div id="dialog-verify" title="Verify User">
		<div class="popupContent">

			<div class="tableInfo warningMessage">
				<h4>
					Too many search results for '<strong>James Smith</strong>'. Please
					select a user from the list below.
				</h4>
			</div>
			<!-- End of table info -->

			<div class="popupSearchWrapper" id="popupSearch">

				<div class="searchWrapper">
					<h3>Search:</h3>
					<input type="#" class="textbox textboxDefaultText"
						placeholder="Enter store no. or name">
				</div>
				<!-- End of search wrapper -->
				<div class="paginationWrapper verifyPagination bottomPagination"
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
				<div class="filterWrapper">
					<h3>Sales Organisation:</h3>
					<select class="selectOptions">
						<option>All</option>
						<option>BigW</option>
						<option>BWS</option>
						<option>Woolworths</option>


					</select>
				</div>
				<!-- End of search wrapper -->


			</div>
			<!-- End of popup search wrapper -->

			<div class="popupData">



				<div class="ContentTableWrapper">
					<table class="ContentTable sortPopUpTbl" cellspacing="0">


					</table>









				</div>
				<!-- End of content table wrapper -->

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of changeStore -->


	<div id="dialog-modal-Edit" title="Edit User Details">
		<div class="popupContent">

			<div class="popupData">




				<form method="POST" action="" id="">
					<div class="ContentTableWrapper formWrapper">


						<div class="parameter clearfix">
							<label for="store" class="">Active Date</label> <input type="#"
								class="textbox defaultTextbox inputDate" name="fromDte"
								id="fromDte" placeholder="dd/mm/yyyy"> to <input
								type="#" class="textbox defaultTextbox inputDate" name="toDte"
								id="toDte" placeholder="dd/mm/yyyy">
						</div>
						<!-- End of parameter -->



						<div class="parameter clearfix">
							<label for="article" class="">Role</label> <select
								class="selectOptions">
								<option>Select</option>
								<c:forEach items="${roleList}" var="roleList">
									<c:if test="${user.salesOrg==roleList.salesOrg}">
										<option class="sales-${roleList.salesOrg}"
											id="${roleList.code}" value="${roleList.code}">${roleList.desc}</option>
									</c:if>
								</c:forEach>
							</select>
						</div>
						<!-- End of parameter -->


						<div class="parameter clearfix">
							<label for="article" class="">Primary Dept.</label> <select
								class="selectOptions popUpDept">
								<option>Select</option>
								<c:forEach items="${model.deptInfoList}" var="deptInfo">
									<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
								</c:forEach>
							</select>
						</div>
						<!-- End of parameter -->


						<!-- <div class="parameter parameterRow parameterOptions clearfix">
							<label for="pos">Store</label>
							
								<span class="parameterOptionsRadio">
									
									<input type="radio" name="pos" value="single" id="single" checked><label for="single" class="labelText">Single</label>
									<input type="radio" name="pos" value="multiple" id="multiple"><label for="multiple" class="labelText">Multiple</label>
								</span>
								

								
								<div class="parameter parameterOptionsInputBox">
									
									<span id="singlePOS">
										<input type="#" class="textbox" placeholder="Enter store # or name">
										<label class="linkBtn" id="verifyUser"><label class="advancedSearch">Verify</label></label>
									</span>		
									
								
									
									<span id="multiplePOS" class="hideBlock">
										<input type="#" class="textbox" placeholder="Enter store # or name">
										<label class="linkBtn" id="verifyUser"><label class="advancedSearch">Verify & Add</label></label>
										
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

									</span>
								</div> End of parameter
							 
						</div> End of parameter	 -->

						<div class="errorDiv parameter">
							<label></label>
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
	</div>

</body>
</html>