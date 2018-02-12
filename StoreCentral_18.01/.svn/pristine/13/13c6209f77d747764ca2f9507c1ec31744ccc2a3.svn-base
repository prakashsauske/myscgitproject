<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Plan-O-Gram</title>



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
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/planOGram.js?version=${properties.version}"></script>



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
						<li class="currentPage">Plan-O-Gram</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->
		<form action="sohSearchArticle.htm" id="sohSubmit" method="get">


			<div class="contentWrapper directContent">

				<div class="articleAdditionalInfo">


					<!-- For displaying report results -->
					<div class="ContentTableWrapper">

						<div class="tableInfo">

							<div class="tableTitle">
								<h4>
									<strong>List of Plan-O-Gram</strong>
								</h4>
							</div>
							<!-- End of table title -->


						</div>
						<!-- End of table info -->


						<div id="tabs">


							<ul>

								<li><a href="#tabs-1">Overdue</a></li>
								<li><a href="#tabs-2">Due Now</a></li>
								<li><a href="#tabs-3">Upcoming</a></li>
								<li><a href="#tabs-4">Completed</a></li>
							</ul>



							<div id="tabs-1">



								<div class="ContentTableWrapper">
									<table cellspacing="0" class="ContentTable actionRows">
										<tr class="overDue">
											<th>Plan-O-Gram Description</th>
											<th class="centerValue" width="100px">Due Date</th>
											<th class="centerValue" width="100px">Active Date</th>
											<th class="centerValue" width="100px">Complete</th>
											<th width="100px">Approx Completion (hh:mm)</th>

										</tr>
										<c:set var="count" value="0"></c:set>
										<c:forEach items="${pogDataExtractOverDueList}"
											var="pogDataExtractList">
											<c:if test="${pogDataExtractList.tabName=='OverDue'}">
												<tr class="overDue index" id="overDue-${count}">
													<td><label class="">&nbsp;</label>${pogDataExtractList.layoutModDesc}&nbsp;(${pogDataExtractList.layoutModule})
													</td>
													<td class="centerValue">${pogDataExtractList.pogAcceptDuedate}</td>
													<td id="received-1" class="centerValue">${pogDataExtractList.pogAcceptRecvOn}</td>
													<%-- <td id="receivedEdit-1" class="hideBlock centerValue"><input
														type="#" value="${pogDataExtractList.pogAcceptRecvOn}"
														class="textbox textboxDefaultText inputDate editDateCell">
													</td> --%>
													<td class="centerValue overDueCheckBox  ${properties.MarkPOGasComplete}"><span>
															<input type="checkbox" name="confirm1" value="yes"
															id="yes">
													</span></td>
													<td class="centerValue time">${pogDataExtractList.pog_imp_time}</td>
													<input type="hidden"
														value="${pogDataExtractList.pogAcceptRecvOn}"
														class="hiddenDate" />
												</tr>
											</c:if>
											<c:set var="count" value="${count+1}"></c:set>
										</c:forEach>
									</table>

									<div class="tableFooter overDue">
										<div class="legend">
											<!-- <label> Legend: <label class="urgent">Active
													Plan-O-Grams </label></label> -->
										</div>
										<div class="tableInfo tableInfoError errorAlign tableStart">


											<div class="tableTitle  errorDiv" id="errorMsgDiv">
												<h4 id="errorMsg"></h4>

												<!-- End of table title -->



											</div>
										</div>
										<div class="paginationWrapper pageActions ">
											<label class="actionBtn"><label class="thumbUp">Save</label></label>

										</div>
										<!-- End of page actions-->
									</div>
									<!-- End of table footer -->






								</div>
								<!-- End of content table wrapper -->

							</div>





							<div id="tabs-2">



								<div class="ContentTableWrapper">
									<table cellspacing="0" class="ContentTable actionRows">
										<tr>
											<th>Plan-O-Gram Description</th>
											<th class="centerValue" width="100px">Due Date</th>
											<th class="" width="100px">Active Date</th>
											<th class="centerValue" width="100px">Complete</th>
											<th width="100px">Approx Completion (hh:mm)</th>

										</tr>
										<c:set var="count" value="0"></c:set>
										<c:forEach items="${pogDataExtractDueNowList}"
											var="pogDataExtractList">
											<c:if test="${pogDataExtractList.tabName=='DueNow'}">
												<tr class="dueNow index" id="dueNow-${count}">
													<td><label class="">&nbsp;</label>${pogDataExtractList.layoutModDesc}&nbsp;(${pogDataExtractList.layoutModule})
													</td>
													<td class="centerValue">${pogDataExtractList.pogAcceptDuedate}</td>
													<td id="received-1" class="centerValue">${pogDataExtractList.pogAcceptRecvOn}</td>
													<%-- <td id="receivedEdit-1" class="hideBlock centerValue"><input
														type="#" value="${pogDataExtractList.pogAcceptRecvOn}"
														class="textbox textboxDefaultText inputDate editDateCell">
													</td> --%>

													<td class="centerValue dueNowCheckBox ${properties.MarkPOGasComplete} "><span> <input
															type="checkbox" name="confirm1" value="yes" id="yes">
													</span></td>
													<td class="centerValue time">${pogDataExtractList.pog_imp_time}</td>
													<input type="hidden"
														value="${pogDataExtractList.pogAcceptRecvOn}"
														class="hiddenDate" />
													<%--  --%>

												</tr>
											</c:if>
											<c:set var="count" value="${count+1}"></c:set>
										</c:forEach>
									</table>

									<div class="tableFooter dueNow">
										<div class="tableInfo  errorAlign tableInfoError  tableStart">


											<div class="tableTitle  errorDiv" id="errorMsgDiv">
												<h4 id="errorMsg"></h4>

												<!-- End of table title -->



											</div>
										</div>
										<div class="paginationWrapper pageActions">
											<label class="actionBtn"><label class="thumbUp">Save</label></label>

										</div>
										<!-- End of page actions-->
									</div>
									<!-- End of table footer -->


								</div>
								<!-- End of content table wrapper -->





							</div>








							<div id="tabs-3">



								<div class="ContentTableWrapper">
									<table cellspacing="0" class="ContentTable actionRows">
										<tr>
											<th>Plan-O-Gram Description</th>
											<th class="centerValue" width="100px">Due Date</th>
											<th class="" width="100px">Active Date</th>
											<th class="centerValue" width="100px">Complete</th>
											<th width="100px">Approx Completion (hh:mm)</th>

										</tr>
										<c:set var="count" value="0"></c:set>
										<c:forEach items="${pogDataExtractUpcomingList}"
											var="pogDataExtractList">
											<c:if test="${pogDataExtractList.tabName=='Upcoming'}">
												<tr class="upComing index" id="upComing-${count}">
													<td><label class="">&nbsp;</label>${pogDataExtractList.layoutModDesc}&nbsp;(${pogDataExtractList.layoutModule})
													</td>
													<td class="centerValue">${pogDataExtractList.pogAcceptDuedate}</td>
													<td id="receivedEdit-1" class=" centerValue"><input
														type="#" value="${pogDataExtractList.pogAcceptRecvOn}"
														class="textbox textboxDefaultText inputDate editDateCell  ${properties.UpdateStoreCompletionDate}">
													</td>

													<td class="centerValue upComingCheckBox ${properties.MarkPOGasComplete}"><span>
															<input type="checkbox" name="confirm1" value="yes"
															id="yes">
													</span></td>
													<td class="centerValue time">${pogDataExtractList.pog_imp_time}</td>
													<input type="hidden"
														value="${pogDataExtractList.pogAcceptRecvOn}"
														class="hiddenDate" />
												</tr>
											</c:if>
											<c:set var="count" value="${count+1}"></c:set>
										</c:forEach>
									</table>

									<div class="tableFooter upComing">
										<div class="tableInfo errorAlign tableInfoError  tableStart">


											<div class="tableTitle  errorDiv" id="errorMsgDiv">
												<h4 id="errorMsg"></h4>

												<!-- End of table title -->



											</div>
										</div>
										<div class="paginationWrapper pageActions">
											<label class="actionBtn"><label class="thumbUp">Save</label></label>

										</div>
										<!-- End of page actions-->
									</div>
									<!-- End of table footer -->

								</div>
								<!-- End of content table wrapper -->





							</div>






							<div id="tabs-4">


								<div class="ContentTableWrapper">
									<table cellspacing="0" class="ContentTable actionRows">
										<tr>
											<th>Plan-O-Gram Description</th>
											<th class="centerValue" width="100px">Due Date</th>
											<th class="" width="100px">Active Date</th>
											<th class="centerValue" width="100px">Complete</th>
											<th width="100px">Approx Completion (hh:mm)</th>

										</tr>
										<c:set var="count" value="0"></c:set>
										<c:forEach items="${pogDataExtractCompletedList}"
											var="pogDataExtractList">
											<c:if test="${pogDataExtractList.tabName=='Completed'}">
												<tr class="completed index" id="completed-${count}">
													<td><label class="">&nbsp;</label>${pogDataExtractList.layoutModDesc}&nbsp;(${pogDataExtractList.layoutModule})
													</td>
													<td class="centerValue">${pogDataExtractList.pogAcceptDuedate}</td>
													<td id="received-1" class="centerValue">${pogDataExtractList.pogAcceptRecvOn}</td>

													<td id="packOMEdit-1" class="centerValue completedCheckBox ${properties.MarkPOGasComplete}"><span>
															<input type="checkbox" name="confirm1" value="yes"
															id="yes" checked disabled>
													</span></td>
													<td class="centerValue time">${pogDataExtractList.pog_imp_time}</td>
													<input type="hidden"
														value="${pogDataExtractList.pogAcceptRecvOn}"
														class="hiddenDate" />
												</tr>
											</c:if>
											<c:set var="count" value="${count+1}"></c:set>
										</c:forEach>
									</table>
								</div>
								<!-- End of content table wrapper -->




							</div>










						</div>
						<!-- End of tabs -->




					</div>
					<!-- End of Content Table Wrapper-->










				</div>
				<!-- End of article Additional Info -->


			</div>
			<!-- End of content wrapper -->

			<div id="dialog-modal1" title="Plan-O-Gram">
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

						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="okBtn">OK</label>
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
			<!--  pop up added for shwing updated successfully msg. defect 14594-->
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
			<input type="hidden" id="multiArtIndex" name="multiArtIndex" value="" />
		</form>
		<input id="navBarHighlight" type="hidden" value="stockManage" />
	</div>

	<%@include file="footer.jsp"%>





	<!-- <script>
	//document.forms[0].autocomplete="off";
	$( "#dialog-modal2" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 700
	});
	$("#tabs").tabs();
	$(".secondaryActionBtn").click(function(e) {

		
		window.location.href="../login/goingHome.htm";
	});
	//$("#dialog-modal2").parent().addClass("popupWrapper");
	
	
	</script> -->
	<script>
		$(function() {

			//Confirm Complete Popup		

			$("#dialog-confirm").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				minHeight : 120,
				maxHeight : 600,
				width : 350
			});
			$("#dialog-confirm").parent().addClass("popupWrapper");

			// code to open popup 
			$(".saveRecord").click(function() {

				$("#dialog-confirm").dialog("open");
			});

			//Code to close the popup

			$(".popupActions label").click(function() {

				$("#dialog-confirm").dialog("close");
			});

			//End	

			// Code for profile menu
			$("#menu").menu({
				position : {
					my : "right top",
					at : "right top+20"
				}
			});

			//Code for input box default text handling
			$('.textbox').focus(function() {
				if ($(this).val() == $(this).attr('defaultVal')) {
					$(this).val('');
					$(this).removeClass("textboxDefaultText");
				}
			});

			$('.textbox').blur(function() {
				if ($(this).val() == '') {
					$(this).val($(this).attr('defaultVal'));
					$(this).addClass("textboxDefaultText");
				}
			});

			//Code for calndar control
			$(".inputDate").datepicker({
				dateFormat : "dd/mm/yy",
				zIndex : 50
			});

			$("#tabs").tabs();

			/*when edit button is clicked displays input box in editable cells*/
			/* $(".editRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				
				$(("#row-").concat(id)).addClass('rowHighlight');
				$(("#receivedEdit-").concat(id)).removeClass('hideBlock');
				$(("#received-").concat(id)).addClass('hideBlock');
				
				$(("#packOMEdit-").concat(id)).removeClass('hideBlock');
				$(("#packOM-").concat(id)).addClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).removeClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
			}); */

			/*when save button is clicked displays input box is disabled*/
			/* $(".saveRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				
				$(("#row-").concat(id)).removeClass('rowHighlight');
				$(("#receivedEdit-").concat(id)).addClass('hideBlock');
				$(("#received-").concat(id)).removeClass('hideBlock');
				
				$(("#packOMEdit-").concat(id)).addClass('hideBlock');
				$(("#packOM-").concat(id)).removeClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).removeClass('hideBlock');
			}); */

		});
	</script>

</body>
</html>
