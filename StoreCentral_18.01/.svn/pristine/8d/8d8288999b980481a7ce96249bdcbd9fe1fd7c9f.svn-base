<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<title>Stock Adjustment Log</title>
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
<script src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
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
						<li class="currentPage">Stock Adjustment Log</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="back">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->


		</div>
		<!-- End of head wrapper -->




		<div class="contentWrapper reportWrapper">


			<div class="articleAdditionalInfo">



				<div id="accordion">

					<h3>Generate Stock Adjustment Log</h3>
					<div>

						<form action="sohAdjustLog.htm" method="get" id="sohAdjustLog">
							<div class="formWrapper">
								<div class="parameter">
									<label for="department">Department</label> <select
										class="selectOptions" name="tradingDeptType"
										id="tradingDeptType">
										<option value="default">All</option>
										<c:forEach items="${model.deptInfoList}" var="deptInfo">
											<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
										</c:forEach>
									</select>

								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="date">Date</label> <input type="#"
										class="textbox textboxDefaultText inputDate"
										placeholder="dd/mm/yyyy" name="fromDate" id="fromDate"
										maxlength="10" value="${model.param.fromDate}"> to <input
										type="#" name="toDate" id="toDate"
										value="${model.param.toDate}"
										class="textbox textboxDefaultText inputDate"
										placeholder="dd/mm/yyyy" maxlength="10">
								</div>
								<!-- End of parameter -->

								<div class="parameter clearfix">
									<label for="reasonCode">Reason Code</label> <select
										class="selectOptions" name="transactionType"
										id="transactionType">
										<option value="default">All</option>
										<c:forEach items="${model.mvmtTypeList}" var="mvmtTypeInfo">
											<option value="${mvmtTypeInfo.mvmtType}">${mvmtTypeInfo.mvmtTypeDesc}</option>
										</c:forEach>
									</select>
									<!--  <select
										class="selectOptions" name="reasonCode" id="reasonCode">
										<option value="default">Select</option>
										<option value="0000">Damaged</option>
										<option value="0001">Missing</option>
										<option value="0002">+ Stock Correction</option>
										<option value="0003">- Stock Correction</option>
									</select>-->

								</div>
								<div class="parameter">
									<label>Employee</label> <select class="selectOptions"
										name="userIdNameList" id="userIdNameList">
										<option value="default">All</option>
										<c:forEach items="${model.userIdNameList}" var="userInfo">
											<option value="${userInfo.userId}">${userInfo.userName}</option>
										</c:forEach>
									</select>

									<%-- <input type="#" class="textbox"
										placeholder="Enter emp# / blank for all" id="employeeId" maxlength="20"
										name="employeeId" value="${model.param.employee}"> --%>
								</div>
								<!-- End of parameter -->

								<!--  
								<div class="parameter clearfix">
									<label for="transactionType">Transaction Type</label> <select
										class="selectOptions" name="transactionType"
										id="transactionType">
										<option value="default">Select</option>
										<c:forEach items="${model.mvmtTypeList}" var="mvmtTypeInfo">
											<option value="${mvmtTypeInfo.mvmtType}">${mvmtTypeInfo.mvmtTypeDesc}</option>
										</c:forEach>
									</select>
								</div>-->
								<!-- End of parameter -->




								<!-- End of parameter -->

								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->

							<input type="hidden" value="${param.tradingDeptType}"
								id="dropretainTradDept" /> <input type="hidden"
								value="${model.param.singleReasonCode}"
								id="dropretainReasonCode" /> <input type="hidden"
								value="${param.transactionType}" id="dropretainTransType" /> <input
								type="hidden" value="${noResults}" id="noResults" /> <input
								type="hidden" id="listCount" name="listCount"
								value="${model.param.recordCount}" /> <input type="hidden"
								id="pageNumber" name="pageNumber" value="${model.param.pageNo}" />
							<input type="hidden" value="${model.param.dropretainEmployee}"
								id="dropretainEmployee" />

						</form>

					</div>
					<!-- End of div for jQuery handling -->


				</div>
				<!-- End of ui-accordion -->




				<!-- For displaying report results -->


				<div class="ContentTableWrapper clearfix">

					<div class="tableInfo">
						<c:if test="${not empty sohAdjustLogList}">
							<div class="tableTitle listSizeHidePurpose" id="errorMsgDiv">

								<h4 id="msg">
									Total <strong>${model.param.recordCount}</strong> records found
								</h4>

							</div>
						</c:if>
						<c:if test="${empty sohAdjustLogList}">
							<div class="tableTitle nodataMessage" id="errorMsgDiv">

								<h4 id="msg">${noResults}</h4>

							</div>
						</c:if>
						<!-- End of table title -->
						<c:if test="${not empty sohAdjustLogList}">
							<div class="tableActionBtns" id="printHidePurpose">
								<label class="actionBtn" id="printBtn" onclick="sohPrint();"><label
									class="print">Print</label></label>
							</div>
						</c:if>

					</div>
					<!-- End of table info -->
					<c:if
						test="${not empty sohAdjustLogList && model.param.recordCount>20}">
						<div class="paginationWrapper" id="paginationDiv1">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
					</c:if>
					<c:if test="${not empty sohAdjustLogList}">
						<table cellspacing="0" class="ContentTable">
							<tr>
								<th class="sorted">Department</th>
								<th>Adjustment Date</th>
								<th>Article</th>
								<th>Employee</th>
								<th>Adjustment Time</th>
								<th>Adjustment Qty.</th>
								<th>End Stock on Hand</th>
								<th class="lastColumn width13">Reason</th>
							</tr>
							<c:forEach items="${sohAdjustLogList}" var="sohAdjustLogList">
								<tr>
									<td class="sorted">${sohAdjustLogList.deptId} <c:if
											test="${not empty sohAdjustLogList.deptId && not empty sohAdjustLogList.deptName}"> | </c:if>${sohAdjustLogList.deptName}
									</td>
									<td>${sohAdjustLogList.adjustmentDate}</td>
									<td>${sohAdjustLogList.articleNo} |
										${sohAdjustLogList.articleDesc}</td>
									<td>${sohAdjustLogList.userName} <!-- | ${sohAdjustLogList.userId} for #479--></td>
									<td>${sohAdjustLogList.adjustmentTime}</td>
									<td>${sohAdjustLogList.adjustmentQuantity} <c:if
											test="${not empty sohAdjustLogList.adjustmentQuantity}">${sohAdjustLogList.uom}</c:if></td>
									<td>${sohAdjustLogList.endSoh} <c:if
											test="${not empty sohAdjustLogList.endSoh}">${sohAdjustLogList.uom}</c:if></td>
									<td class="lastColumn">${sohAdjustLogList.mvmtTypeDesc}</td>
								</tr>
							</c:forEach>

						</table>

						<c:if
							test="${not empty sohAdjustLogList && model.param.recordCount>20}">
							<div class="paginationWrapper bottomPagination"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</c:if>
					</c:if>

				</div>

				<!-- End of content table wrapper -->
			</div>
			<!-- End of article Additional Info -->

		</div>
		<!-- End of content wrapper -->

		<input id="navBarHighlight" type="hidden" value="reports" />
	</div>
	<div id="printData" style="display: none">
		<div id="printbody">
			<link href="../../styles/printstyle.css?version=${properties.version}" rel="stylesheet"
				type="text/css" />
			<div class="width100" style="">

				<div class="width70 reportName bold inline-block">Stock
					Adjustment Log</div>
				<div style="width: 25%" class="width25  right">
					<div class="  margin5 text-align-right ">${user.siteNo} |
						${user.siteName}</div>
				</div>
				<div class="width70  margontopnone inline-block">
					<label class="">Created on: </label><label class="currentDate"></label>
				</div>
			</div>
			<div class="width100 border">
				<div class="width70 margin5 bold ">Report for:</div>
				<div class="margin5 margontopnone">
					<label class="">Department: </label><label class="printTrading"></label>
					<label class="separator">|</label> <label class="">Reason
						Type: </label><label class="printTransaction"></label> <label
						class="separator">|</label> <label class="">Employee: </label><label
						class="emp">${user.firstName} ${user.lastName}</label> <label
						class="separator">|</label> <label class="">Date from: </label><label
						class="">${model.param.fromDate}</label> <label class="separator">|</label>
					<label class="">Date to: </label><label class="">${model.param.toDate}</label>
				</div>
			</div>



			<table cellspacing="0" cellpadding="1" id="printtablesoh"
				class="printtablesoh text-align-left font11 width100" border="0"
				style="width: 100%;">
				<tr id="tableHeader" class="height30 border-bottom">
					<th class="text-align-left bold width20">Reason</th>

					<th class="text-align-left bold width25">Item Description</th>

					<th class="text-align-left bold width15">Employee</th>

					<th class="text-align-left bold width10">Time</th>

					<th class="text-align-left bold width10">Qty Adj</th>

					<th class="text-align-left bold width10">End SOH</th>


				</tr>
				<%int recCount=1,pageNo = 0; %>
				<tr class="height40 sohrow">

					<td class="bold" colspan="7">Department:
						${model.param.tradingDeptNo} &nbsp;${model.param.tradingDeptName}</td>
				</tr>
				<% recCount++;%>
				<c:forEach items="${mapForPrint}" var="eachItem">


					<%if(recCount==17){recCount=1;pageNo++;%>
					<tr>
						<td class="print-td" style="padding: 0px;" colspan="3"><label
							class="bold">Printed on: </label><label class="currentDate"></label>
							<label class="separator">|</label> <label class="currentTime"></label>

						</td>
						<td style="padding: 0px" colspan="3"><div
								class=" lineheight15 margin5 text-align-right ">
								Page <label class="pageno"><%=pageNo%></label> of <label
									class="totalpage"></label>
							</div></td>
					</tr>
			</table>

			<table cellspacing="0" cellpadding="1" id="printtablesoh"
				class="printtablesoh text-align-left font11  width100" border=""
				style="page-break-before: always; width: 100%;">
				<tr>
					<td style="padding: 0px;" colspan="6">
						<div class="width100">

							<div class="width70   reportName bold inline-block">Stock
								Adjustment Log</div>
							<div style="width: 25%" class="width25  right">
								<div class="  margin5 text-align-right ">${user.siteNo} |
									${user.siteName}</div>
							</div>
							<div class="width70  margontopnone inline-block">
								<label class="">Created on: </label><label class="currentDate"></label>
							</div>
						</div>
						<div class="width100 border">
							<div class="width70 margin5 bold ">Report for:</div>
							<div class="margin5 margontopnone">
								<label class="">Department: </label><label class="printTrading"></label>
								<label class="separator">|</label> <label class="">Reason
									Type: </label><label class="printTransaction"></label> <label
									class="separator">|</label> <label class="">Employee: </label><label
									class="emp">${user.firstName} ${user.lastName}</label> <label
									class="separator">|</label> <label class="">Date from:
								</label><label class="">${model.param.fromDate}</label> <label
									class="separator">|</label> <label class="">Date to: </label><label
									class="">${model.param.toDate}</label>
							</div>
						</div>
					</td>
				</tr>


				<tr id="tableHeader" class="height30 border-bottom">
					<th class="text-align-left bold width20">Reason</th>

					<th class="text-align-left bold width25">Item Description</th>

					<th class="text-align-left bold width15">Employee</th>

					<th class="text-align-left bold width10">Time</th>

					<th class="text-align-left bold width10">Qty Adj</th>

					<th class="text-align-left bold width10">End SOH</th>


				</tr>
				<tr class="height40 sohrow">
					<td colspan="7" class="bold">Adjustment Date: ${eachItem.key}</td>
				</tr>

				<%}else{%>
				<tr class="height40 sohrow">
					<td colspan="7" class="bold">Adjustment Date: ${eachItem.key}</td>
				</tr>
				<% }recCount++;%>
				<c:forEach items="${eachItem.value}" var="eachItemValue">

					<%if(recCount!=17){ %>

					<tr class="height40 sohrow">
						<td class="normal">${eachItemValue.mvmtTypeDesc}</td>
						<td class="normal">${eachItemValue.articleNo}
							&nbsp;|&nbsp;${eachItemValue.articleDesc}</td>
						<td class="normal">${eachItemValue.userId}
							&nbsp;|&nbsp;${eachItemValue.userName}</td>
						<td class="normal">${eachItemValue.adjustmentTime}</td>
						<td class="normal">${eachItemValue.adjustmentQuantity} <c:if
								test="${not empty eachItemValue.adjustmentQuantity}">${eachItemValue.uom}</c:if></td>
						<td class="normal">${eachItemValue.endSoh} <c:if
								test="${not empty eachItemValue.endSoh}">${eachItemValue.uom}</c:if></td>

					</tr>
					<%recCount++;}else{ ++pageNo;recCount=2; %>
					<tr>
						<td class="print-td" style="padding: 0px;" colspan="3"><label
							class="bold">Printed on: </label><label class="currentDate"></label>
							<label class="separator">|</label> <label class="currentTime"></label>

						</td>
						<td style="padding: 0px" colspan="3"><div
								class=" lineheight15 margin5 text-align-right ">
								Page <label class="pageno"><%=pageNo%></label> of <label
									class="totalpage"></label>
							</div></td>
					</tr>
			</table>

			<table cellspacing="0" cellpadding="1" id="printtablesoh"
				class="printtablesoh text-align-left font11  width100" border=""
				style="page-break-before: always; width: 100%;">
				<tr>
					<td style="padding: 0px !important;" colspan="6">
						<div class="width100">

							<div class="width70   reportName bold inline-block">Stock
								Adjustment Log</div>
							<div style="width: 25%" class="width25  right">
								<div class="  margin5 text-align-right ">${user.siteNo} |
									${user.siteName}</div>
							</div>
							<div class="width70  margontopnone inline-block">
								<label class="">Created on: </label><label class="currentDate"></label>
							</div>
						</div>
						<div class="width100 border">
							<div class="width70 margin5 bold ">Report for:</div>
							<div class="margin5 margontopnone">
								<label class="">Department: </label><label class="printTrading"></label>
								<label class="separator">|</label> <label class="">Reason
									Type: </label><label class="printTransaction"></label> <label
									class="separator">|</label> <label class="">Employee: </label><label
									class="emp">${user.firstName} ${user.lastName}</label> <label
									class="separator">|</label> <label class="">Date from:
								</label><label class="">${model.param.fromDate}</label> <label
									class="separator">|</label> <label class="">Date to: </label><label
									class="">${model.param.toDate}</label>
							</div>
						</div>
					</td>
				</tr>


				<tr id="tableHeader" class="height30 border-bottom">
					<th class="text-align-left bold width20">Reason</th>

					<th class="text-align-left bold width25">Item Description</th>

					<th class="text-align-left bold width15">Employee</th>

					<th class="text-align-left bold width10">Time</th>

					<th class="text-align-left bold width10">Qty Adj</th>

					<th class="text-align-left bold width10">End SOH</th>


				</tr>
				<tr class="height40 sohrow">
					<td class="normal">${eachItemValue.mvmtTypeDesc}</td>
					<td class="normal">${eachItemValue.articleNo}
						&nbsp;|&nbsp;${eachItemValue.articleDesc}</td>
					<td class="normal">${eachItemValue.userId}
						&nbsp;|&nbsp;${eachItemValue.userName}</td>
					<td class="normal">${eachItemValue.adjustmentTime}</td>
					<td class="normal">${eachItemValue.adjustmentQuantity} <c:if
							test="${not empty eachItemValue.adjustmentQuantity}">${eachItemValue.uom}</c:if></td>
					<td class="normal">${eachItemValue.endSoh} <c:if
							test="${not empty eachItemValue.endSoh}">${eachItemValue.uom}</c:if></td>

				</tr>

				<% } %>

				</c:forEach>
				</c:forEach>

			</table>

			<div style="margin-top: 0px" id="foot" class="width98">
				<div class="width35  left inline-block">
					<label class="bold">Printed on: </label><label class="currentDate"></label>
					<label class="separator">|</label> <label class="currentTime"></label>
				</div>
				<div class="inline-block  hideBlock endOfReport">
					<div>NB: The prices shown in this reports are GST exclusive</div>
					<div>
						<strong>End of Report</strong>
					</div>
				</div>
				<div class="width35  inline-block right">
					<div class=" lineheight15 margin5 text-align-right ">
						Page <label class="totalpagee"></label> of <label
							class="totalpage"></label>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script>
function getArticlesForPage(pageNumber){
	
	/* $('#statusImg').removeClass('statusWrapper hideBlock');
	$('#statusImg').addClass('statusWrapper'); */
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
	$('#pageNumber').val(pageNumber);	
	$('#sohAdjustLog').attr('action','sohAdjustLogForPagination.htm');
	$('#sohAdjustLog').submit();

}

	$(function() {
		$('.ContentTable').show();
		$('#printHidePurpose').show();
		$('.listSizeHidePurpose').show();
		$('.paginationWrapper').show();


		var recordCount= $('#listCount').val();
        var currentPage=$('#pageNumber').val();

		 $('#paginationDiv1').pagination({
			items: recordCount,
			itemsOnPage: 20,
			cssStyle: 'compact-theme',
			currentPage:currentPage,
			onPageClick: function(pageNumber){
			    getArticlesForPage(pageNumber);

			    
			}

				
		});

		 $('#paginationDiv2').pagination({
				items: recordCount,
				itemsOnPage: 20,
				cssStyle: 'compact-theme',
				currentPage:currentPage,
				onPageClick: function(pageNumber){
				    getArticlesForPage(pageNumber);

				    
				}

					
			});
		if ($('#noResults').val() != "") {
			$("#msg").html($('#noResults').val());
		}

		var dropretainTradDept = $('#dropretainTradDept').val();
		$("#tradingDeptType option[value='" + dropretainTradDept + "']").prop(
				'selected', true);
		var dropretainReasonCode = $('#dropretainReasonCode').val();
		$("#reasonCode option[value='" + dropretainReasonCode + "']").prop(
				'selected', true);
		var dropretainTransType = $('#dropretainTransType').val();
		$("#transactionType option[value='" + dropretainTransType + "']").prop(
				'selected', true);

		var dropretainEmployee = $('#dropretainEmployee').val();
		$("#userIdNameList option[value='" + dropretainEmployee + "']").prop(
				'selected', true);

		//Code for accordion
		$("#accordion").accordion({
			header : "h3",
			collapsible : true,
			heightStyle : "content"
		});

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
			zIndex : 50
		});

		/* Code to 
			- Close accordion when report is generated
			- Show results
			
			Need to write a code by developer to handle a case when there is no data. The accordion in this case should remain open */

		$("#generateReport")
				.click(
						function() {
							$('#msg').html(" ");
							$('.ContentTable').hide();
							$('#printHidePurpose').hide();
							$('.paginationWrapper').hide();

							//temp

							//var tradingDeptType = $('#tradingDeptType').val();
							var currentdate = new Date();
							var fromDate = formateDate($('#fromDate').val(),$('#fromDate').val().split('/').length).split('/');
							var toDate = formateDate($('#toDate').val(),$('#toDate').val().split('/').length).split('/');
							var fromDateSplit = fromDate[0] + fromDate[1]
									+ fromDate[2];
							var toDateSplit = toDate[0] + toDate[1] + toDate[2];

							//var employee = $('#employeeId').val();
							var transactionType = $('#transactionType').val();
							var reasonCode = $('#reasonCode').val();
 
							if (($('#fromDate').val() == ""
								|| $.trim($('#fromDate').val()).length == 0)&& 
								($('#toDate').val() == ""
									|| $.trim($('#toDate').val()).length == 0) && 
									($('#employeeId').val() == ""
										|| $.trim($('#employeeId').val()).length == 0)) {
							$("#msg").html("Please enter details to generate a report.");

							$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');

							}
							else if ($('#fromDate').val() == ""
									|| $.trim($('#fromDate').val()).length == 0) {
								$("#msg").html("Please enter date in dd/mm/yy format.");

								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (fromDateSplit != ""
									&& (!(fromDateSplit.length == 8 || fromDateSplit.length == 6 || fromDate.length==3))) {

								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');
							} else if (isNaN(fromDate[0]) || isNaN(fromDate[1])
									|| isNaN(fromDate[2])) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (fromDate[0] > 31 || fromDate[1] > 12
									|| fromDate[2] > 9999) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							}
							else if((currentdate.getFullYear() < fromDate[2]
							|| (currentdate.getFullYear() == fromDate[2] && (currentdate
									.getMonth() + 1) < fromDate[1])
							|| (currentdate.getFullYear() == fromDate[2]
									&& (currentdate.getMonth() + 1) == fromDate[1] && currentdate
									.getDate() < fromDate[0]))){

								$("#msg")
								.html(
										"From date cannot be greater than Today.");
						$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
						$("#errorMsgDiv").addClass('tableTitle errorDiv');
						
								} else if ($('#toDate').val() == ""
									|| $.trim($('#toDate').val()).length == 0) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (toDateSplit != ""
									&& (!(toDateSplit.length == 8 || toDateSplit.length == 6 ||  toDate.length==3))) {

								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (isNaN(toDate[0]) || isNaN(toDate[1])
									|| isNaN(toDate[2])) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (toDate[0] > 31 || toDate[1] > 12
									|| toDate[2] > 9999) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							}else if((currentdate.getFullYear() < toDate[2]
							|| (currentdate.getFullYear() == toDate[2] && (currentdate
									.getMonth() + 1) < toDate[1])
							|| (currentdate.getFullYear() == toDate[2]
									&& (currentdate.getMonth() + 1) == toDate[1] && currentdate
									.getDate() < toDate[0]))){

								$("#msg")
								.html(
										"To date cannot be greater than Today.");
						$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
						$("#errorMsgDiv").addClass('tableTitle errorDiv');
						
								} else if (fromDate[2] > toDate[2]) {
								$("#msg")
										.html("Please enter valid date range for delivery. 'To' date can not be before "+$('#fromDate').val() +". ");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if ((fromDate[2] == toDate[2])
									&& (fromDate[1] > toDate[1])) {
								$("#msg")
										.html("Please enter valid date range for delivery. 'To' date can not be before "+$('#fromDate').val() +". ");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if ((fromDate[2] == toDate[2])
									&& (fromDate[1] == toDate[1])
									&& (fromDate[0] > toDate[0])) {
								$("#msg")
										.html("Please enter valid date range for delivery. 'To' date can not be before "+$('#fromDate').val() +". ");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');
							}  /* else if (reasonCode == "default") {
								$("#msg")
								.html("Please select the reason code ");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');
								$('#transactionType').focus();

							} */

							else if (transactionType == "default") {


								
								var t2 = compareDate($('#toDate').val()).getTime();
						
						        var t1 = compareDate($('#fromDate').val()).getTime();
						        var days=parseInt((t2-t1)/(24*3600*1000));
						    

						        if(days>7){
								
								$("#msg").html(
										"Please select the date range below 7 days");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');
								$('#toDate').focus();
						        }else{
						        	$('.listSizeHidePurpose').hide();
									
									$('#statusImg')
											.removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');


									
									$('#sohAdjustLog').submit();



							     }
								

							}  else {
								$('.listSizeHidePurpose').hide();
								
								$('#statusImg')
										.removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');


								
								$('#sohAdjustLog').submit();
							}

							//temp

							/*   $('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							$('#sohAdjustLog').submit(); */

						});

	});

	$(document).keypress(function(event) {
					    if (event.which == 13) {
					        event.preventDefault();
					        $('#msg').html(" ");
					        $('.ContentTable').hide();
							$('#printHidePurpose').hide();
							$('.paginationWrapper').hide();
							
							//temp

							//var tradingDeptType = $('#tradingDeptType').val();
							var currentdate = new Date();
							var fromDate = formateDate($('#fromDate').val(),$('#fromDate').val().split('/').length).split('/');
							var toDate = formateDate($('#toDate').val(),$('#toDate').val().split('/').length).split('/');
							var fromDateSplit = fromDate[0] + fromDate[1]
									+ fromDate[2];
							var toDateSplit = toDate[0] + toDate[1] + toDate[2];

							//var employee = $('#employeeId').val();
							var transactionType = $('#transactionType').val();
							var reasonCode = $('#reasonCode').val();
							if (($('#fromDate').val() == ""
								|| $.trim($('#fromDate').val()).length == 0)&& 
								($('#toDate').val() == ""
									|| $.trim($('#toDate').val()).length == 0) && 
									($('#employeeId').val() == ""
										|| $.trim($('#employeeId').val()).length == 0)) {
							$("#msg").html("Please enter details to generate a report.");

							$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');

							}
							else if ($('#fromDate').val() == ""
									|| $.trim($('#fromDate').val()).length == 0) {
								$("#msg").html("Please enter date in dd/mm/yy format.");

								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (fromDateSplit != ""
									&& (!(fromDateSplit.length == 8 || fromDateSplit.length == 6 || fromDate.length==3) )) {

								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');
							} else if (isNaN(fromDate[0]) || isNaN(fromDate[1])
									|| isNaN(fromDate[2])) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (fromDate[0] > 31 || fromDate[1] > 12
									|| fromDate[2] > 9999) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							}
							else if((currentdate.getFullYear() < fromDate[2]
							|| (currentdate.getFullYear() == fromDate[2] && (currentdate
									.getMonth() + 1) < fromDate[1])
							|| (currentdate.getFullYear() == fromDate[2]
									&& (currentdate.getMonth() + 1) == fromDate[1] && currentdate
									.getDate() < fromDate[0]))){

								$("#msg")
								.html(
										"From date cannot be greater than Today.");
						$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
						$("#errorMsgDiv").addClass('tableTitle errorDiv');
						
								} else if ($('#toDate').val() == ""
									|| $.trim($('#toDate').val()).length == 0) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (toDateSplit != ""
								&& (!(toDateSplit.length == 8 || toDateSplit.length == 6 || toDate.length==3) )) {

								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (isNaN(toDate[0]) || isNaN(toDate[1])
									|| isNaN(toDate[2])) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if (toDate[0] > 31 || toDate[1] > 12
									|| toDate[2] > 9999) {
								$("#msg").html("Please enter date in dd/mm/yy format.");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							}else if((currentdate.getFullYear() < toDate[2]
							|| (currentdate.getFullYear() == toDate[2] && (currentdate
									.getMonth() + 1) < toDate[1])
							|| (currentdate.getFullYear() == toDate[2]
									&& (currentdate.getMonth() + 1) == toDate[1] && currentdate
									.getDate() < toDate[0]))){

								$("#msg")
								.html(
										"To date cannot be greater than Today.");
						$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
						$("#errorMsgDiv").addClass('tableTitle errorDiv');
						
								} else if (fromDate[2] > toDate[2]) {
								$("#msg")
										.html("Please enter valid date range for delivery. 'To' date can not be before "+$('#fromDate').val() +". ");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if ((fromDate[2] == toDate[2])
									&& (fromDate[1] > toDate[1])) {
								$("#msg")
										.html("Please enter valid date range for delivery. 'To' date can not be before "+$('#fromDate').val() +". ");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if ((fromDate[2] == toDate[2])
									&& (fromDate[1] == toDate[1])
									&& (fromDate[0] > toDate[0])) {
								$("#msg")
										.html("Please enter valid date range for delivery. 'To' date can not be before "+$('#fromDate').val() +". ");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');
							} else if (transactionType == "default") {


								
								var t2 = compareDate($('#toDate').val()).getTime();
						
						        var t1 = compareDate($('#fromDate').val()).getTime();
						        var days=parseInt((t2-t1)/(24*3600*1000));
						    

						        if(days>7){
								
								$("#msg").html(
										"Please selecte the date range below 7 days");
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');
								$('#toDate').focus();
						        }else{
						        	$('.listSizeHidePurpose').hide();
									
									$('#statusImg')
											.removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');


									
									$('#sohAdjustLog').submit();



							     }
								

							}  else {
								$('.listSizeHidePurpose').hide();
								
								$('#statusImg')
										.removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');


								
								$('#sohAdjustLog').submit();
							}
						
					     
					        
					    }
				 });
	$("#back").click(function(e) {
		window.location.href = "../login/goingHome.htm";
	});

	$("#closeLink").click(function(e) {
		$('#accordion').accordion({active : true });	
		
	});

	
	function formateDate(v,l){
		if(v.length==8 && l==3)
		{
		var finalDate=parseDate(v).getFullYear();
		var splitDate=v.split("/");
		finalDate =splitDate[0]+"/"+splitDate[1]+"/"+finalDate;
		return finalDate;
		}
		else{
			return v;	
			}
		}
	/* function formateDate(v){
				if(v.length==8)
				{
				var finalDate=parseDate(v).getFullYear();
				var splitDate=v.split("/");
				finalDate =splitDate[0]+"/"+splitDate[1]+"/"+finalDate;
				return finalDate;
				}
				else{
					return v;	
					}
				} */


				function compareDate(str1){
					// str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
					var dt1   = parseInt(str1.substring(0,2));
					var mon1  = parseInt(str1.substring(3,5));
					var yr1   = parseInt(str1.substring(6,10));
					var date1 = new Date(yr1, mon1-1, dt1);
					return date1;
				}
	
</script>
	<%@include file="footer.jsp"%>

</body>
</html>
