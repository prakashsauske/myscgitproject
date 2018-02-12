<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Broadcast Create</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?vertion=${properties.version}"
	rel="stylesheet" type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script src="../../scripts/broadcast.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?vertion=${properties.version}"></script>
</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage">Broadcasts</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->
				<div class="statusWrapper">
					<label class="loading hideBlock">We are getting data,
						please wait</label> <label class="secondaryActionBtn" id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->
			</div>

		</div>
		<!-- End of head wrapper -->

		<div class="contentWrapper adminWrapper">

			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle">
						<h4 class="sectionTitle">Broadcasts Management</h4>
					</div>
					<!-- End of table title -->

				</div>
				<!-- End of table info -->






				<div class="tableActionsBtnsWrapper">
					<div class="lookupActionWrapper">
						<label class="linkBtn hideBlock" id="searchMessageBtn"><a><label
								class="advancedSearch">Search</label></a></label> <label class="linkBtn"
							id="createBrodcastBtnHdr"><a><label class="addRow">Create
									Broadcast</label></a></label>



						<div class="errorDiv hideBlock" id="searchCreateErrorDiv">
							<label id="searchCreateErrorDivLbl">No results found for
								'<strong>xhbr2</strong>'. Please try a different Broadcast
								message.
							</label> <label class="closeMessage"
								onclick="$('#searchCreateErrorDiv').addClass('hideBlock');">&nbsp;</label>
						</div>

					</div>
					<!-- End of lookup action wrapper -->


				</div>
				<!-- End of table actions btn wrapper -->



				<div class="tableActionsWrapper hideBlock" id="tableSearchAction">

					<form method="POST" action="" id="">
						<div class="formWrapper">

							<div class="parameter">
								<label for="userID" class="">Search</label> <input type="#"
									class="textbox" id="userID" placeholder="by Boradcast message">


							</div>
							<!-- End of parameter -->

							<div class="formActions">
								<label class="actionBtn searchLink">Search</label> <label
									class="secondaryActionBtn closeLink">Close</label>
							</div>
							<!-- End of form actions -->

						</div>
						<!-- End of content table wrapper -->
					</form>

				</div>
				<!-- End of table Actions Wrapper -->


				<div class="tableActionsWrapper hideBlock"
					id="createBrodcastContainer">

					<div
						class="formWrapper alignParameter createBrodcastInputContainer">
						<form action="">
							<div class="parameter">
								<label class="" for="fault">Message</label>
								<textarea class="textbox textboxDefaultText messageTxtBx"
									placeholder="" style="width: 310px" id="fault" maxlength="250"></textarea>
							</div>

							<div class="parameter clearfix">
								<label for="store" class="">Active From</label> <input type="#"
									class="textbox defaultTextbox inputDate dateFromTxtBx"
									maxlength="10" placeHolder="dd/mm/yyyy"> <input
									type="#" class="textbox defaultTextbox inputTime timeFromTxtBx" maxlength="5" value="00:00">
							</div>
							<!-- End of parameter -->
							<div class="parameter clearfix">
								<label for="store" class="">Active Till</label> <input type="#"
									maxlength="10" class="textbox defaultTextbox inputDate dateToTxtBx" placeHolder="dd/mm/yyyy"> <input
									type="#" maxlength="5" class="textbox defaultTextbox inputTime timeToTxtBx" value="00:00">
							</div>
							<!-- End of parameter -->
							<div class="parameter parameterRow clearfix">
								<label for="store" class="">Acknowledge</label> <input
									type="radio"  disabled name="ackReqRd" value="TRUE"
									id="deptValue1">Required <input type="radio"
									name="ackReqRd" checked value="FALSE" id="deptValue1">Not
								Required
							</div>
							<div class="parameter clearfix">
								<label for="article">Sales Org</label> <select name="salesOrg"
									id="salesOrgSelectBx" class="selectOptions salesOrgMap">
									<option value="All">All</option>
									<c:forEach items="${salesOrgList}" var="salesOrgMap">
										<option id="${salesOrgMap.key}" value="${salesOrgMap.key}">${salesOrgMap.value}</option>
									</c:forEach>
								</select>


							</div>
							<!-- End of parameter -->



							<div class="parameter clearfix singleOrg hideBlock hideIf">
								<label for="article">Department</label> <label>Select
									Department(s)</label>
								<div class="hierarchyWrapper hierarchySingle clearfix">

									<!-- Department -->
									<div class="hierarchyContent lastContent" id="deptDiv">


										<div class="hierarchyList">
											<ul>
												<li><input type="checkbox" name="departmentList"
													value="deptValue1" id="deptValue1"><label
													for="deptValue1" class="labelText">All</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue1" id="deptValue1"><label
													for="deptValue1" class="labelText">General
														Merchandise</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue2" id="deptValue2"><label
													for="deptValue2" class="labelText">Perishables</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue3" id="deptValue3"><label
													for="deptValue3" class="labelText">Groceries</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue4" id="deptValue4"><label
													for="deptValue4" class="labelText">Non Trading</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue5" id="deptValue5"><label
													for="deptValue5" class="labelText">Meat</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue6" id="deptValue6"><label
													for="deptValue6" class="labelText">Liquor</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue7" id="deptValue7"><label
													for="deptValue7" class="labelText">Personal Care</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue8" id="deptValue8"><label
													for="deptValue8" class="labelText">Health</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue9" id="deptValue9"><label
													for="deptValue9" class="labelText">Baked Items</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue10" id="deptValue10"><label
													for="deptValue10" class="labelText">Coupons</label></li>
											</ul>
										</div>
										<!-- End of hierarchy Title -->


									</div>
									<!-- End of hierarchy Content -->


								</div>
								<!-- end of hierarchy Wrapper -->


							</div>
							<!-- End of parameter -->

							<div class="parameter singleOrg hideBlock hideIf">
								<label for="article">Role</label> <label>Select Roles</label>
								<div class="hierarchyWrapper hierarchySingle clearfix">

									<!-- Department -->
									<div class="hierarchyContent lastContent" id="rolesDiv">


										<div class="hierarchyList">
											<ul>
												<li><input type="checkbox" name="departmentList"
													value="deptValue1" id="deptValue1"><label
													for="deptValue1" class="labelText">All</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue2" id="deptValue2"><label
													for="deptValue2" class="labelText">Store Manager</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue2" id="deptValue2"><label
													for="deptValue2" class="labelText">Department
														Manager</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue2" id="deptValue2"><label
													for="deptValue2" class="labelText">Team Member</label></li>
												<li><input type="checkbox" name="departmentList"
													value="deptValue2" id="deptValue2"><label
													for="deptValue2" class="labelText">IT Manager</label></li>

											</ul>
										</div>
										<!-- End of hierarchy Title -->


									</div>
									<!-- End of hierarchy Content -->


								</div>
								<!-- end of hierarchy Wrapper -->


							</div>
							<!-- End of parameter -->


							<div
								class="parameter parameterRow parameterOptions singleOrg hideBlock hideIf">
								<label for="pos">Area</label> <span
									class="parameterOptionsRadio"> <input type="radio"
									name="pos" value="multiple" id="multiple"><label
									for="multiple" class="labelText">Stores</label> <input
									type="radio" name="pos" value="single" id="single"><label
									for="single" class="labelText">Region</label><input
									type="radio" name="pos" value="all" id="all" checked><label
									for="all" class="labelText">All</label>
								</span>



								<div class="parameter parameterOptionsInputBox">


									<span id="multiplePOS" class="hideBlock"> <input
										type="#" id="searchStoreTxt" maxlength="20" class="textbox"
										placeholder="Enter store # or name"> <label
										class="linkBtn" id="verifyStoreBtn"><label
											class="advancedSearch">Verify & Add</label></label>
										<div class="hierarchyList"
											style="padding: 6px; max-height: 120px;overflow-y: auto; overflow-x: auto; width: 260px;">
											<ul class="parameterOptionsListBlock" id="multiplePOSBlock">
												<li><label>1518 | Richmond store </label> <label
													class="closeMessage">&nbsp;</label></li>
												<li><label>1618 | Bella Vista store </label> <label
													class="closeMessage">&nbsp;</label></li>
												<li><label>1610 | Dural store </label> <label
													class="closeMessage">&nbsp;</label></li>

											</ul>
										</div>

									</span> <span id="singlePOS"> <select class="selectOptions"
										id="searchAreaSelect">
											<option>Select</option>
											<option>Region 1</option>
											<option>Region 2</option>

									</select> <label class="linkBtn" id="showStoresBtn"><label
											class="advancedSearch">Show Stores</label></label>
										<div class="hierarchyList"
											style="padding: 6px; max-height: 120px;overflow-y: auto; overflow-x: auto; width: 260px;">
											<ul class="parameterOptionsListBlock" id="singlePOSBlock">
												<li><label>1518 | Richmond store </label> <label
													class="closeMessage">&nbsp;</label></li>
												<li><label>1618 | Bella Vista store </label> <label
													class="closeMessage">&nbsp;</label></li>
												<li><label>1610 | Dural store </label> <label
													class="closeMessage">&nbsp;</label></li>

											</ul>
										</div>

									</span>


								</div>
								<!-- End of parameter -->

							</div>
							<!-- End of parameter -->







							<div class="formActions">
								<label class="actionBtn" id="createBrodcastBtn">Create</label> <label
									class="secondaryActionBtn closeLink" id="cancelBrodcastBtn">Close</label>
							</div>
							<!-- End of form actions -->
						</form>
					</div>
					<!-- End of content table wrapper -->

				</div>
				<!-- End of table Actions Wrapper -->

				<table cellspacing="0"
					class="ContentTable treetable drilldownTable tableSorter"
					id="broadcastTable">
					<thead>
						<tr>
							<th class="noSort">Broadcast Message</th>
							<th class="centerValue noSort">Active From</th>
							<th class="centerValue noSort">Active Till</th>
							<th class=" centerValue noSort">Acknownedge</th>
							<th class="lastColumn centerValue noSort">Actions</th>
						</tr>
					</thead>
					<tbody id="searchResultContent">

						<tr data-tt-id="1" class="collapsed">
							<td>xxxx xxxx xxxxx xxxxx xxxxx</td>
							<td class="centerValue ">22/08/2015 12:00 PM</td>
							<td class="centerValue ">23/08/2015 12:00 PM</td>
							<td class="centerValue ">Required</td>
							<td class="centerValue "><label class="deactivate"></label>
								<label class="linkBtn editRowBtn " id="editRecord-1"> <a><label
										class="editRecord">&nbsp;</label></a>
							</label> <label class="linkBtn hideBlock saveRowBtn" id="saveRecord-1">
									<a><label class="saveRecord">&nbsp;</label></a>
							</label></td>

						</tr>

						<tr class="editable hideBlock">
							<td colspan="8">
								<div class="tableActionsWrapper" id="tableAddAction2">

									<form method="POST" action="" id="">
										<div class="formWrapper alignParameter">

											<div class="parameter">
												<label class="" for="fault">Message</label>
												<textarea class="textbox textboxDefaultText" placeholder=""
													style="width: 300px" id="fault">xxxx xxxx xxxxx  xxxxx  xxxxx</textarea>
											</div>

											<div class="parameter clearfix">
												<label for="store" class="">Active From</label> <input
													type="#" disabled="disabled"
													class="textbox defaultTextbox inputDate" id="dateFrom"
													placeHolder="22/08/2015"> <input type="#"
													disabled="disabled"
													class="textbox defaultTextbox inputTime" id="timeFrom"
													value="01:00">
											</div>
											<!-- End of parameter -->
											<div class="parameter clearfix">
												<label for="store" class="">Active Till</label> <input
													type="#" class="textbox defaultTextbox inputDate"
													id="dateTo" placeHolder="23/08/2015"> <input
													type="#" class="textbox defaultTextbox inputTime"
													id="timeFrom" value="12:00">
											</div>
											<!-- End of parameter -->
											<div class="parameter clearfix">
												<label for="store" class="">Acknowledge</label> <input
													type="radio" checked name="ackReq" value="deptValue1"
													id="deptValue1">Required <input type="radio"
													name="ackReq" value="deptValue1" id="deptValue1">Not
												Required
											</div>
											<div class="parameter clearfix">
												<label for="article">Sales Org</label> <select
													name="salesOrg" id="salesOrgDrpDwn" class="salesOrg">
													<option value="">All</option>
													<option value="VENDOR">Supermarket</option>
													<option value="STOCK_TRANSFER">BigW</option>
													<option value="WAREHOUSE">BWS</option>
													<option value="WAREHOUSE">Dan Murphy</option>
													<option value="WAREHOUSE">Thomas Dux</option>
												</select>

											</div>
											<!-- End of parameter -->



											<div class="parameter clearfix">
												<label for="article">Department</label> <label>Select
													Primary Department(s)</label>
												<div class="hierarchyWrapper hierarchySingle clearfix">

													<!-- Department -->
													<div class="hierarchyContent lastContent" id="deptDiv">


														<div class="hierarchyList">
															<ul>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue1" id="deptValue1"><label
																	for="deptValue1" class="labelText">All</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue1" id="deptValue1"><label
																	for="deptValue1" class="labelText">General
																		Merchandise</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue2" id="deptValue2"><label
																	for="deptValue2" class="labelText">Perishables</label></li>
																<li><input type="checkbox" name="departmentList"
																	checked value="deptValue3" id="deptValue3"><label
																	for="deptValue3" class="labelText">Groceries</label></li>
																<li><input type="checkbox" name="departmentList"
																	checked value="deptValue4" id="deptValue4"><label
																	for="deptValue4" class="labelText">Non Trading</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue5" id="deptValue5"><label
																	for="deptValue5" class="labelText">Meat</label></li>
																<li><input type="checkbox" name="departmentList"
																	checked value="deptValue6" id="deptValue6"><label
																	for="deptValue6" class="labelText">Liquor</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue7" id="deptValue7"><label
																	for="deptValue7" class="labelText">Personal
																		Care</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue8" id="deptValue8"><label
																	for="deptValue8" class="labelText">Health</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue9" id="deptValue9"><label
																	for="deptValue9" class="labelText">Baked Items</label></li>
																<li><input type="checkbox" name="departmentList"
																	checked value="deptValue10" id="deptValue10"><label
																	for="deptValue10" class="labelText">Coupons</label></li>
															</ul>
														</div>
														<!-- End of hierarchy Title -->


													</div>
													<!-- End of hierarchy Content -->


												</div>
												<!-- end of hierarchy Wrapper -->


											</div>
											<!-- End of parameter -->

											<div class="parameter">
												<label for="article">Role</label> <label>Select
													Roles</label>
												<div class="hierarchyWrapper hierarchySingle clearfix">

													<!-- Department -->
													<div class="hierarchyContent lastContent" id="deptDiv">


														<div class="hierarchyList">
															<ul>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue1" id="deptValue1"><label
																	for="deptValue1" class="labelText">All</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue2" id="deptValue2"><label
																	for="deptValue2" class="labelText">Store
																		Manager</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue2" id="deptValue2"><label
																	for="deptValue2" class="labelText">Department
																		Manager</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue2" id="deptValue2"><label
																	for="deptValue2" class="labelText">Team Member</label></li>
																<li><input type="checkbox" name="departmentList"
																	value="deptValue2" id="deptValue2"><label
																	for="deptValue2" class="labelText">IT Manager</label></li>


															</ul>
														</div>
														<!-- End of hierarchy Title -->


													</div>
													<!-- End of hierarchy Content -->


												</div>
												<!-- end of hierarchy Wrapper -->


											</div>
											<!-- End of parameter -->


											<div class="parameter parameterRow parameterOptions">
												<label for="pos">Area</label> <span
													class="parameterOptionsRadio"> <input type="radio"
													name="pos" value="multiple" id="multiple"><label
													for="multiple" class="labelText">Stores</label> <input
													type="radio" name="pos" value="single" id="single" checked><label
													for="single" class="labelText">Region</label>
												</span>



												<div class="parameter parameterOptionsInputBox">


													<span id="multiplePOS" class="hideBlock"> <input
														type="#" class="textbox"
														placeholder="Enter store # or name"> <label
														class="linkBtn" id="verifyUser"><label
															class="advancedSearch">Verify & Add</label></label>

														<ul class="parameterOptionsListBlock">
															<li><label>1518 | Richmond store </label> <label
																class="closeMessage">&nbsp;</label></li>
															<li><label>1618 | Bella Vista store </label> <label
																class="closeMessage">&nbsp;</label></li>
															<li><label>1610 | Dural store </label> <label
																class="closeMessage">&nbsp;</label></li>

														</ul>

													</span> <span id="singlePOS"> <select class="selectOptions">
															<option>Select</option>
															<option>Region 1</option>
															<option>Region 2</option>

													</select> <label class="linkBtn" id=""><label
															class="advancedSearch">Show Stores</label></label>

														<ul class="parameterOptionsListBlock">
															<li><label>1518 | Richmond store </label> <label
																class="closeMessage">&nbsp;</label></li>
															<li><label>1618 | Bella Vista store </label> <label
																class="closeMessage">&nbsp;</label></li>
															<li><label>1610 | Dural store </label> <label
																class="closeMessage">&nbsp;</label></li>

														</ul>

													</span>


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

								</div> <!-- End of table Actions Wrapper -->
							</td>
						</tr>

						<tr data-tt-id="3" class="collapsed">
							<td>xxxx xxx xxx xxxxxxx xxx xx xxx</td>
							<td class="centerValue ">21/08/2015 10:00 AM</td>
							<td class="centerValue ">23/08/2015 03:30 PM</td>
							<td class="centerValue ">Not Required</td>
							<td class="centerValue "><label class="deactivate"></label>
								<label class="linkBtn editRowBtn " id="editRecord-1"> <a><label
										class="editRecord">&nbsp;</label></a>
							</label> <label class="linkBtn hideBlock saveRowBtn" id="saveRecord-1">
									<a><label class="saveRecord">&nbsp;</label></a>
							</label></td>


						</tr>

						<tr data-tt-id="4" data-tt-parent-id="3" class="hideBlock">


							</td>
						</tr>

					</tbody>
				</table>







			</div>
			<div id="paginationArea" style="float: right;"></div>
			<!-- End of content table wrapper -->

		</div>


		<input id="navBarHighlight" type="hidden" value="admin" />
		<%@include file="verifyStorePopUp.jsp"%>
	</div>
	<div id="error-warn-wrapper"
		onclick="$('#error-warn-wrapper').fadeOut(50);" style="display: none;">
		<div class="pageErrorsWrapper " id="errorWrapper">
			<div class="pageErrorsContent">
				<div class="pageErrorsTitle">
					<h4 class="title">Errors</h4>
					<a class="close" title="Close"
						onclick="$('#error-warn-wrapper').fadeOut(50);">Close</a>
					<p class="description" id="error_title">Broadcasts.</p>
				</div>
				<div class="content">
					<h4 class="err_sub_title visible-hide" id="error_sub_title">Reason
						for failure</h4>
					<ol class="err_msg" id="error_msg">
						<li>Please enter Article keyword to lookup</li>
					</ol>
				</div>
			</div>
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
	
	<%@include file="footer.jsp"%>
</body>
</html>