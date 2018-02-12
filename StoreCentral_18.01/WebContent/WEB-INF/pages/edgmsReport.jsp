<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Electronic Daily Goods Movement Summary</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/NewScroll.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/common.js?version=${properties.version}"></script>
<script src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
</head>
<script>
	$(function() {

		var tableCols = 0;

		$("#treetable tbody tr").each(function() {
			var currCount = 0
			$(this).children("td").each(function() {
				currCount++;
				var colSpan = $(this).attr("colspan");
				if (colSpan > 0) {
					currCount = currCount + (colSpan - 1);
				}
				if (currCount > tableCols)
					tableCols = currCount;
			}); // next td
		}); // next tr

		var width = 0;
		if (tableCols < 12) {
			$("#scrollTable").removeClass('scrollTableContainer');
			$("#scrollWindow").removeClass('scrollWindow');
			$("#scrollBtns").addClass('hideBlock');
		}

		if (tableCols > 11) {
			width = (tableCols * 100) - 100;
			document.getElementById("scrollWindow").style.width = width;
		}

		$("#dialog-modal").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 200,
			maxHeight : 600,
			width : 350
		});

		$('#next-column').click(function(event) {
			event.preventDefault();
			$('.scrollTableContainer').animate({
				scrollLeft : '+=150'
			}, 'fast');
		});
		$('#previous-column').click(function(event) {
			event.preventDefault();
			$('.scrollTableContainer').animate({
				scrollLeft : '-=150'
			}, 'fast');
		});

		$('#next-column1').click(function(event) {
			event.preventDefault();
			$('.scrollTableContainer').animate({
				scrollLeft : '+=150'
			}, 'fast');
		});
		$('#previous-column1').click(function(event) {
			event.preventDefault();
			$('.scrollTableContainer').animate({
				scrollLeft : '-=150'
			}, 'fast');
		});

		$("#dialog-modal").parent().addClass("popupWrapper");

		$("#menu").menu({
			position : {
				my : "right top",
				at : "right top+20"
			}
		});

	});
</script>
<body>

	<div class="NoPrint mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage">Electronic Daily Goods Movement
							Summary</li>
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




		<div class="contentWrapper reportWrapper">





			<div class="articleAdditionalInfo">



				<div id="accordion">

					<h3>Generate Electronic Daily Goods Movement Summary</h3>

					<div>

						<form id="reportForm" method="post" action="reportSearchEDGMS.htm"
							modelAttribute="model">
							<div class="formWrapper">

								<div class="parameter">
									<label for="department">Department</label> <select
										class="selectOptions DGMSDepartmentOptions" id="department"
										name="tradingDept">
										<option value="">All</option>
										<c:forEach items="${model.deptInfoList}" var="deptInfo">
											<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
										</c:forEach>
									</select>
								</div>
								<!-- End of parameter -->




								<div class="parameter">

									<label for="date">Date</label> <input type="#"
										value="${param.inputDate}"
										class="textbox defaultTextbox inputDate" id="date"
										name="inputDate" placeholder="dd/mm/yyyy" maxlength="10">
									<div class="searchByOptions reportRadio">
										<input type="radio" name="searchByOptions" value="Date"
											id="Date" checked><label for="Date" class="labelText">Date</label>
										<input type="radio" name="searchByOptions" value="WCDate"
											id="WCDate"><label for="WCDate" class="labelText">W/C
											Date</label>
									</div>
									<!-- End of search by options -->

								</div>
								<!-- End of main search box -->


								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
							<input name="siteNo" type="hidden" value="${user.siteNo}" /> <input
								type="hidden" id="retain" value="${param.searchByOptions}" /> <input
								type="hidden" value="${param.tradingDept}" id="dropretain" /> <input
								type="hidden" id="reportFetchStatus" value="${msg}" /> <input
								type="hidden" id="salesOrgUsr" value="${user.salesOrg}" /> <input
								id="pageNum" type="hidden"
								value='${edgmsReportWithInvoice.size()}' />
						</form>

					</div>
					<!-- End of div for jQuery handling -->


				</div>
				<!-- End of ui-accordion -->

				<!--Print Button-->

				<!--End Print Button-->

				<!-- For no data information -->

				<div class="ContentTableWrapper">


					<div class="tableInfo">
						<c:if
							test="${ empty edgmsReportWithInvoice &&  empty edgmsReportWithOutInvoice}">
							<div class="tableTitle nodataMessage" id="errorMsgDiv">
								<h4 id="msg">${msg}</h4>
							</div>
						</c:if>
						<c:if
							test="${not empty edgmsReportWithInvoice || not empty edgmsReportWithOutInvoice}">
							<div class="tableTitle" id="errorMsgDiv">
								<h4 id="msg">
									Total <strong>${edgmsReportWithInvoice.size()+edgmsReportWithOutInvoice.size()}</strong>
									records found
								</h4>
							</div>
						</c:if>
						<!-- End of table title -->



					</div>
					<!-- End of table info -->




					<!-- For displaying report results -->

					<c:if
						test="${not empty edgmsReportWithInvoice || not empty edgmsReportWithOutInvoice}">
						<div id="tabs">

							<div class="tableActionBtns">
								<label class="actionBtn" onclick="edgmsDetailsPrint();"
									id="printBtn"><label class="print">Print</label></label>
							</div>


							<ul>
								<li><a href="#tabs-1">Report with Invoice<c:if
											test="${not empty edgmsReportWithInvoice}">
					(${edgmsReportWithInvoice.size()})
					</c:if></a></li>
								<li><a href="#tabs-2">Report without Invoice<c:if
											test="${not empty edgmsReportWithOutInvoice}">
					(${edgmsReportWithOutInvoice.size()})
					</c:if></a></li>
							</ul>
							<div id="tabs-1">
								<!-- <div class="ContentTableWrapper"> -->
								<!-- scroller functions -->
								<div id="scrollBtns" class="tableScroller">
									<ul>
										<li id="previous-column" class="scrollLeft"><a href="#">&nbsp;</a>
										</li>
										<li id="next-column" class="scrollRight"><a href="#">&nbsp;</a>
										</li>
									</ul>
								</div>
								<!-- End scroller functions -->
								<div id="scrollTable" class="scrollTableContainer">
									<div id="scrollWindow" class="scrollWindow">

										<table cellspacing="0"
											class="ContentTable treetable drilldownTable" id="treetable">
											<tr>
												<th class="sorted">Dept.</th>
												<th>Vendor</th>
												<th>Employee</th>
												<th>Order #</th>
												<th>Order Type</th>
												<th>Date</th>
												<th>Time</th>
												<th>GRN #</th>
												<th>Invoice #</th>
												<th>Invoice Total</th>
												<th>Cartons (OM)</th>
												<th>GST</th>
												<th>Temp</th>
												<th class="lastColumn">Receipt Method</th>
											</tr>


											<c:forEach items="${edgmsReportWithInvoice}"
												var="edgmsReport">
												<tr>
													<td class="sorted">${edgmsReport.tradingDeptNo}<c:if
															test="${not empty edgmsReport.tradingDeptNo && not empty edgmsReport.tradingDeptName}"> | </c:if>${edgmsReport.tradingDeptName}
													</td>
													<td>${edgmsReport.vendorNo}<c:if
															test="${not empty edgmsReport.vendorNo && not empty edgmsReport.vendorName}"> | </c:if>${edgmsReport.vendorName}
													</td>
													<td>${edgmsReport.userId}<c:if
															test="${not empty edgmsReport.userId && not empty edgmsReport.userName}"> | </c:if>${edgmsReport.userName}
													</td>
													<td>${edgmsReport.orderNo}</td>
													<td>${edgmsReport.orderType}</td>
													<td>${edgmsReport.receiptDate}</td>
													<td class="time-slice">${edgmsReport.receiptTime}</td>
													<td>${edgmsReport.grnNo}</td>
													<td>${edgmsReport.invoiceNo}</td>
													<td>${edgmsReport.invoiceTotal}</td>
													<td>${edgmsReport.cartonsNo}</td>
													<td>${edgmsReport.gstValue}</td>
													<td>${edgmsReport.temperature}</td>
													<td class="lastColumn">${edgmsReport.receiptMethod}</td>
												</tr>
											</c:forEach>

										</table>

									</div>
								</div>
								<!-- End of content table wrapper -->
							</div>
							<div id="tabs-2">
								<!-- <div class="ContentTableWrapper"> -->
								<!-- scroller functions -->
								<div id="scrollBtns" class="tableScroller">
									<ul>
										<li id="previous-column1" class="scrollLeft"><a href="#">&nbsp;</a>
										</li>
										<li id="next-column1" class="scrollRight"><a href="#">&nbsp;</a>
										</li>
									</ul>
								</div>
								<!-- End scroller functions -->
								<div id="scrollTable" class="scrollTableContainer">
									<div id="scrollWindow" class="scrollWindow">
										<table cellspacing="0"
											class="ContentTable treetable drilldownTable" id="treetable">
											<tr>
												<th class="sorted">Dept.</th>
												<th>Vendor</th>
												<th>Employee</th>
												<th>Order #</th>
												<th>Order Type</th>
												<th>Date</th>
												<th>Time</th>
												<th>GRN #</th>
												<th>Doc #</th>
												<th>Cartons (OM)</th>
												<th>Cost</th>
												<th>Temp</th>
												<th class="lastColumn">Receipt Method</th>
											</tr>
											<c:forEach items="${edgmsReportWithOutInvoice}"
												var="edgmsReport">
												<tr>
													<td class="sorted">${edgmsReport.tradingDeptNo}<c:if
															test="${not empty edgmsReport.tradingDeptNo && not empty edgmsReport.tradingDeptName}"> | </c:if>${edgmsReport.tradingDeptName}
													</td>
													<td>${edgmsReport.vendorNo}<c:if
															test="${not empty edgmsReport.vendorNo && not empty edgmsReport.vendorName}"> | </c:if>${edgmsReport.vendorName}
													</td>
													<td>${edgmsReport.userId}<c:if
															test="${not empty edgmsReport.userId && not empty edgmsReport.userName}"> | </c:if>${edgmsReport.userName}
													</td>
													<td>${edgmsReport.orderNo}</td>
													<td>${edgmsReport.orderType}</td>
													<td>${edgmsReport.receiptDate}</td>
													<td class="time-slice">${edgmsReport.receiptTime}</td>
													<td>${edgmsReport.grnNo}</td>
													<td>${edgmsReport.deliveryDocketNo}</td>
													<td>${edgmsReport.cartonsNo}</td>
													<td>
														<%-- ${edgmsReport.cost}--%>
													</td>
													<td>${edgmsReport.temperature}</td>
													<td>${edgmsReport.receiptMethod}</td>
												</tr>
											</c:forEach>

										</table>
									</div>
								</div>
								<!-- End of content table wrapper -->
							</div>

						</div>

					</c:if>
					<%--  --%>
				</div>


				<!-- End of Content Table Wrapper-->

			</div>
			<!-- End of article Additional Info -->


		</div>
		<!-- End of content wrapper -->

		<input id="navBarHighlight" type="hidden" value="reports" />
	</div>
	<%@include file="footer.jsp"%>

	<c:set var="sizeOfWithInvoice" value="32"></c:set>
	<fmt:parseNumber var="totalSize" integerOnly="true" type="number"
		value="${sizeOfWithInvoice}" />

	<div id="printReport" style="display: none">
		<div id="printbody">
			<link rel="stylesheet" href="../../styles/printstyle.css?version=${properties.version}" />
			<div id="withInvoice">
				<div class="width100">

					<div style=""
						class="width70 reportCount reportName bold inline-block">Electronic
						Daily Goods Movement Summary With Invoices</div>
					<div class="width25 reportName right">
						<div class="  margin5 text-align-right salesOrgName"></div>
					</div>
					<div class="width70 margin5 margontopnone inline-block">
						<label class="">Created on: </label><label class="currentDate"></label>
					</div>
					<div class="width25  right">
						<div class="  margin5 text-align-right ">${storeNo} |
							${storeName}</div>
					</div>
				</div>
				<div class="width100 border">
					<div class="width70 margin5 bold ">Report for:</div>
					<div class="margin5 margontopnone">
						<label class="">Department: </label><label class=""><c:if
								test="${not empty param.tradingDept}">
								<c:forEach items="${model.deptInfoList}" var="deptInfo">
									<c:if test="${deptInfo.node==param.tradingDept}">${deptInfo.nodeDesc}</c:if>
								</c:forEach>
							</c:if> <c:if test="${empty param.tradingDept}">All</c:if></label><label
							class="separator">|</label><label class="">Sequence By: </label><label
							class="">Date / Time</label><label class="separator">|</label><label
							class="">Date from: </label><label class="fromDate"></label><label
							class="separator">|</label><label class="">Date to: </label><label
							class="toDate"></label>
					</div>
				</div>
				<div class="width100 height30">

					<div class="text-align-right right">Total no of documents
						sent to Financial Services: _____________</div>
				</div>


				<table cellspacing="0" cellpadding="1" id="with-invoice-table"
					class="text-align-left with-invoice-table font11 width100"
					border="1">


					<tr class="height30 bold with-invoive-header border-bottom"
						style="height: 35px !important">
						<th>No</th>
						<th>Dept</th>
						<th>Vendor Name</th>
						<th>Employee</th>
						<th>Ord Type</th>
						<th>Ord No</th>
						<th>Date</th>
						<th>Time</th>
						<th>GRN No</th>
						<th>Invoice No</th>
						<th>No of Pkgs</th>
						<th class="text-align-right">Invoice Total</th>
						<th class="text-align-right">GST Amount</th>
						<th>Temp</th>
						<th>Recv Method</th>
					</tr>
					<%
						int j = 1, k = 1, recCount = 1, pageNo = 0;
					%>
					<c:forEach items="${edgmsReportWithInvoice}" var="edgmsReport">
						<%
							if (recCount % 10 != 0) {
						%>
						<tr class="height25 normal with-invoice-records">
							<td><%=j++%></td>

							<td>${edgmsReport.tradingDeptNo}
								${edgmsReport.tradingDeptName}</td>
							<td>${edgmsReport.vendorNo} | ${edgmsReport.vendorName}</td>
							<td>${edgmsReport.userId} | ${edgmsReport.userName}</td>
							<td>${edgmsReport.orderType}</td>
							<td>${edgmsReport.orderNo}</td>
							<td>${edgmsReport.receiptDate}</td>
							<td class="time-slice">${edgmsReport.receiptTime}</td>
							<td>${edgmsReport.grnNo}</td>
							<td>${edgmsReport.invoiceNo}</td>
							<td>${edgmsReport.cartonsNo}OM's</td>
							<td class="text-align-right">${edgmsReport.invoiceTotal}</td>
							<td class="text-align-right">${edgmsReport.gstValue}</td>
							<td>${edgmsReport.temperature}</td>
							<td>${edgmsReport.receiptMethod}</td>
						</tr>
						<%
							} else {
									pageNo++;
						%>
						<tr class="height30" style="height: 30px !important">
							<td style="padding: 0px;" colspan="8"><label class="bold">Printed
									on: </label><label class="currentDate"></label> <label
								class="separator">|</label> <label class="currentTime1"></label>

							</td>
							<td style="padding: 0px" colspan="7"><div
									class=" lineheight15 margin5 text-align-right ">
									Page <label class="pageno"><%=pageNo%></label> of <label
										class="totalpage1"></label>
								</div></td>
						</tr>
				</table>
				<input type="hidden" id="pageCount"
					value='${edgmsReportWithInvoice.size()}' />
				<table cellspacing="0" cellpadding="1" id="with-invoice-table"
					style="page-break-before: always; position: relative;"
					class="text-align-left with-invoice-table font11 width100"
					border="1">
					<tr>
						<td colspan="15" style="padding: 0px; position: relative;">
							<div id="eDGMSWithOutInvoice" class="width100  pageBreak"
								style="page-break-before: always; position: relative;">

								<div style=""
									class="width70 reportCount  reportName bold inline-block">Electronic
									Daily Goods Movement Summary With Invoices</div>
								<div class="width25 reportName right">
									<div class="  margin5 text-align-right salesOrgName"></div>
								</div>
								<div class="width70 margin5 margontopnone inline-block">
									<label class="">Created on: </label><label class="currentDate"></label>
								</div>
								<div class="width25  right">
									<div class="  margin5 text-align-right ">${storeNo} |
										${storeName}</div>
								</div>
							</div>
							<div class="width100  border">
								<div class="width70 margin5 bold ">Report for:</div>
								<div class="margin5 margontopnone">
									<label class="">Department: </label><label class=""><c:if
											test="${not empty param.tradingDept}">
											<c:forEach items="${model.deptInfoList}" var="deptInfo">
												<c:if test="${deptInfo.node==param.tradingDept}">${deptInfo.nodeDesc}</c:if>
											</c:forEach>
										</c:if> <c:if test="${empty param.tradingDept}">All</c:if></label><label
										class="separator">|</label><label class="">Sequence
										By: </label><label class="">Date / Time</label><label
										class="separator">|</label><label class="">Date from:
									</label><label class="fromDate"></label><label class="separator">|</label><label
										class="">Date to: </label><label class="toDate"></label>
								</div>
							</div>
							<div class="width100  height30">

								<div class="text-align-right right">Total no of documents
									sent to Financial Services: _____________</div>
							</div>
						</td>
					</tr>
					<tr class="height30 bold with-invoive-header  border-bottom"
						style="height: 35px !important">
						<th>No</th>
						<th>Dept</th>
						<th>Vendor Name</th>
						<th>Employee</th>
						<th>Ord Type</th>
						<th>Ord No</th>
						<th>Date</th>
						<th>Time</th>
						<th>GRN No</th>
						<th>Invoice No</th>
						<th>No of Pkgs</th>
						<th class="text-align-right">Invoice Total</th>
						<th class="text-align-right">GST Amount</th>
						<th>Temp</th>
						<th>Recv Method</th>
					</tr>
					<tr class="height25 normal with-invoice-records">
						<td><%=j++%></td>

						<td>${edgmsReport.tradingDeptNo}
							${edgmsReport.tradingDeptName}</td>
						<td>${edgmsReport.vendorNo} | ${edgmsReport.vendorName}</td>
						<td>${edgmsReport.userId} | ${edgmsReport.userName}</td>
						<td>${edgmsReport.orderType}</td>
						<td>${edgmsReport.orderNo}</td>
						<td>${edgmsReport.receiptDate}</td>
						<td class="time-slice">${edgmsReport.receiptTime}</td>
						<td>${edgmsReport.grnNo}</td>
						<td>${edgmsReport.invoiceNo}</td>
						<td>${edgmsReport.cartonsNo}OM's</td>
						<td class="text-align-right">${edgmsReport.invoiceTotal}</td>
						<td class="text-align-right">${edgmsReport.gstValue}</td>
						<td>${edgmsReport.temperature}</td>
						<td>${edgmsReport.receiptMethod}</td>
					</tr>
					<%recCount++;
						}
							recCount++;
					%>

					</c:forEach>


					<tr class="bold height30">
						<td colspan="9">Total No of Entries : <%=j - 1%></td>

						<td class="text-align-right" colspan="2">InvoiceTotal :</td>
						<input type="hidden" val="${totalInvoice}" class="invoice-tot" />
						<td class="text-align-right" colspan="1" class="inv-tot">
							${totalInvoice}</td>
						<td colspan="3"></td>
					</tr>
				</table>

			</div>

			<div id="foot" class="height30 width98"
				style="height: 30px !important;">
				<div class="width48 margin5 inline-block">
					<label class="bold">Printed on: </label><label class="currentDate"></label>
					<label class="separator">|</label> <label class="currentTime1"></label>
				</div>
				<div class="width48  inline-block right">
					<div class=" lineheight15 margin5 text-align-right ">
						Page <label class="totalpage1"></label> of <label
							class="totalpage1"></label>
					</div>
				</div>
			</div>

			<div id="eDGMSWithOutInvoice"
				style="page-break-before: always; position: relative;">
				<div class="width100">

					<div style=""
						class="width70 reportCount1 reportName bold inline-block">Electronic
						Daily Goods Movement Summary Without Invoices</div>
					<div class="width25 reportName right">
						<div class="  margin5 text-align-right salesOrgName"></div>
					</div>
					<div class="width70 margin5 margontopnone inline-block">
						<label class="">Created on: </label><label class="currentDate"></label>
					</div>
					<div class="width25  right">
						<div class="  margin5 text-align-right ">${storeNo} |
							${storeName}</div>
					</div>
				</div>
				<div class="width100  border">
					<div class="width70 margin5 bold ">Report for:</div>
					<div class="margin5 margontopnone">
						<label class="">Department: </label><label class=""><c:if
								test="${not empty param.tradingDept}">
								<c:forEach items="${model.deptInfoList}" var="deptInfo">
									<c:if test="${deptInfo.node==param.tradingDept}">${deptInfo.nodeDesc}</c:if>
								</c:forEach>
							</c:if> <c:if test="${empty param.tradingDept}">All</c:if></label><label
							class="separator">|</label><label class="">Sequence By: </label><label
							class="">Date / Time</label><label class="separator">|</label><label
							class="">Date from: </label><label class="fromDate"></label><label
							class="separator">|</label><label class="">Date to: </label><label
							class="toDate"></label>
					</div>
				</div>
				<div class="width100  height30">

					<div class="text-align-right right">Total no of documents
						sent to Financial Services: _____________</div>
				</div>


				<table cellspacing="0" cellpadding="1" id="without-invoice-table"
					class="font11 without-invoice-table text-align-left width100"
					border="1" style="">

					<tr class="bold height30 without-invoice-header border-bottom"
						style="height: 35px !important">
						<th>No</th>
						<th>Dept</th>
						<th>Vendor Name</th>
						<th>Employee</th>
						<th>Ord Type</th>
						<th>Ord No</th>
						<th>Date</th>
						<th>Time</th>
						<th>GRN No</th>
						<th>Delivery Doc</th>
						<th>No of Pkgs</th>
						<th class="text-align-right">Cost</th>
						<th>Temp</th>

						<th>Recv Method</th>
					</tr>

					<%
						int l = 1, m = 1, recCount1 = 1, pageNo1 = 0;
					%>
					<c:forEach items="${edgmsReportWithOutInvoice}" var="edgmsReport">
						<%
							if (recCount1 % 12 != 0) {
						%>

						<tr class="normal height25 without-invoice-records">
							<td><%=l++%></td>
							<td>${edgmsReport.tradingDeptNo}
								${edgmsReport.tradingDeptName}</td>
							<td>${edgmsReport.vendorNo} | ${edgmsReport.vendorName}</td>
							<td>${edgmsReport.userId} | ${edgmsReport.userName}</td>
							<td>${edgmsReport.orderType}</td>
							<td>${edgmsReport.orderNo}</td>
							<td>${edgmsReport.receiptDate}</td>
							<td class="time-slice">${edgmsReport.receiptTime}</td>
							<td>${edgmsReport.grnNo}</td>
							<td>${edgmsReport.deliveryDocketNo}</td>
							<td>${edgmsReport.cartonsNo}OM'S</td>
							<td class="text-align-right">
								<%-- ${edgmsReport.cost} --%>
							</td>

							<td>${edgmsReport.temperature}</td>
							<td>${edgmsReport.receiptMethod}</td>
						</tr>


						<%
							} else {
									pageNo1++;
						%>
						<tr class="height30" style="height: 30px !important;">
							<td style="padding: 0px;" colspan="7"><label class="bold">Printed
									on: </label><label class="currentDate"></label> <label
								class="separator">|</label> <label class="currentTime1"></label>

							</td>
							<td style="padding: 0px" colspan="7"><div
									class=" lineheight15 margin5 text-align-right ">
									Page <label class="pageno"><%=pageNo1%></label> of <label
										class="totalpage2"></label>
								</div></td>
						</tr>
				</table>
				<input type="hidden" id="withoutPage"
					value='${edgmsReportWithOutInvoice.size()}' />
				<table cellspacing="0" cellpadding="1" id="with-invoice-table"
					style="page-break-before: always; position: relative;"
					class="text-align-left without-invoice-table font11 width100"
					border="1">
					<tr>
						<td colspan="14" style="padding: 0px; position: relative;">

							<div class="width100 pageBreak"
								style="page-break-before: always; position: relative;">

								<div style="padding-top: 0px"
									class="width70 reportCount1 reportName bold inline-block">Electronic
									Daily Goods Movement Summary Without Invoices</div>
								<div class="width25 reportName right">
									<div class="  margin5 text-align-right salesOrgName"></div>
								</div>
								<div class="width70 margin5 margontopnone inline-block">
									<label class="">Created on: </label><label class="currentDate"></label>
								</div>
								<div class="width25  right">
									<div class="  margin5 text-align-right ">${storeNo} |
										${storeName}</div>
								</div>
							</div>
							<div class="width100  border">
								<div class="width70 margin5 bold ">Report for:</div>
								<div class="margin5 margontopnone">
									<label class="">Department: </label><label class=""><c:if
											test="${not empty param.tradingDept}">
											<c:forEach items="${model.deptInfoList}" var="deptInfo">
												<c:if test="${deptInfo.node==param.tradingDept}">${deptInfo.nodeDesc}</c:if>
											</c:forEach>
										</c:if> <c:if test="${empty param.tradingDept}">All</c:if></label><label
										class="separator">|</label><label class="">Sequence
										By: </label><label class="">Date / Time</label><label
										class="separator">|</label><label class="">Date from:
									</label><label class="fromDate"></label><label class="separator">|</label><label
										class="">Date to: </label><label class="toDate"></label>
								</div>
							</div>
							<div class="width100  height30">

								<div class="text-align-right right">Total no of documents
									sent to Financial Services: _____________</div>
							</div>
						</td>
					</tr>
					<tr class="bold height30  border-bottom"
						style="height: 35px !important">
						<th>No</th>
						<th>Dept</th>
						<th>Vendor Name</th>
						<th>Employee</th>
						<th>Ord Type</th>
						<th>Ord No</th>
						<th>Date</th>
						<th>Time</th>
						<th>GRN No</th>
						<th>Delivery Doc</th>
						<th>No of Pkgs</th>
						<th class="text-align-right">Cost</th>
						<th>Temp</th>

						<th>Recv Method</th>
					</tr>

					<tr class="normal height25 without-invoice-records">
						<td><%=l++%></td>
						<td>${edgmsReport.tradingDeptNo}
							${edgmsReport.tradingDeptName}</td>
						<td>${edgmsReport.vendorNo} | ${edgmsReport.vendorName}</td>
						<td>${edgmsReport.userId} | ${edgmsReport.userName}</td>
						<td>${edgmsReport.orderType}</td>
						<td>${edgmsReport.orderNo}</td>
						<td>${edgmsReport.receiptDate}</td>
						<td class="time-slice">${edgmsReport.receiptTime}</td>
						<td>${edgmsReport.grnNo}</td>
						<td>${edgmsReport.deliveryDocketNo}</td>
						<td>${edgmsReport.cartonsNo}OM'S</td>
						<td class="text-align-right">
							<%-- ${edgmsReport.cost} --%>
						</td>

						<td>${edgmsReport.temperature}</td>
						<td>${edgmsReport.receiptMethod}</td>
					</tr>

					<%recCount1++;
						}
							recCount1++;
					%>
					</c:forEach>
					<%-- <c:if test="${edgmsReportWithInvoice.size()%9=='0'}"> --%>

					<%-- </c:if> --%>
					<tr class="bold height30">
						<td colspan="9">Total No of Entries : <%=l - 1%></td>

						<td class="text-align-right" colspan="2">Total Cost :</td>
						<td class="text-align-right" colspan="1">
							<%-- ${totalCost} --%>
						</td>
						<td colspan="2"></td>
					</tr>
				</table>

			</div>
			<div style="height: 30px !important; margin-top: 10px" id="foot"
				class="width98">
				<div class="width35 margin5 inline-block">
					<label class="bold">Printed on: </label><label class="currentDate"></label>
					<label class="separator">|</label> <label class="currentTime"></label>
				</div>
				<div class="inline-block margin5 hideBlock endOfReport">End of
					Report</div>
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
		$(function() {
			var recordCount = $('#listCount').val();
			var currentPage = $('#pageNumber').val();

			/* $('#paginationDiv1').pagination({
			items: recordCount,
			itemsOnPage: 20,
			cssStyle: 'compact-theme',
			currentPage:currentPage,
			onPageClick: function(pageNumber){
			    getArticlesForPage(pageNumber);

			    
			}

				
			}); */

			/*  $('#paginationDiv2').pagination({
					items: recordCount,
					itemsOnPage: 20,
					cssStyle: 'compact-theme',
					currentPage:currentPage,
					onPageClick: function(pageNumber){
					    getArticlesForPage(pageNumber);

					    
					}

						
				}); */
var invTotal=parseFloat($('.invoice-tot').val()).toFixed(2);
				$('.inv-tot').text(invTotal);
			var deptVal = $('#dropretain').val();
			$("#department option[value='" + deptVal + "']").prop('selected',
					true);

			if ($("#retain").val() == "Date") {
				$("#Date").click();
			} else {
				$("#WCDate").click();
			}
			if (!($('#reportFetchStatus').val == "" || $.trim($(
					'reportFetchStatus').val()).length == 0))
				$(".nodataMessage").html($('#reportFetchStatus').val());

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

			$(document)
					.keypress(
							function(event) {

								if (event.which == 13) {
									event.preventDefault();

									$("#msg").html('');
									//$('.paginationWrapper').hide();
									var currentdate = new Date();
									var splittedDate = formateDate(
											$('#date').val(),
											$('#date').val().split('/').length)
											.split('/');
									//var wcdate=$('#wcdate').val().split('/');
									//var splittedOne=wcdate[0]+wcdate[1]+wcdate[2];
									var splittedTwo = splittedDate[0]
											+ splittedDate[1] + splittedDate[2];
									if (splittedDate == "") {
										$("#msg")
												.html(
														'Please enter details to generate a report.');
										$('#errorMsgDiv')
												.removeClass(
														'ContentTableWrapper hideBlock');
										$('#errorMsgDiv').addClass(
												'ContentTableWrapper');

										$('#tabs').html("");
										$('#printBtn').removeClass(
												'articleActionBtns');
										$('#printBtn').addClass(
												'articleActionBtns hideBlock');
										$("#errorMsgDiv").removeClass(
												'tableTitle nodataMessage');
										$("#errorMsgDiv").addClass(
												'tableTitle errorDiv');
									}
									/* else if(wcdate!=""){

									if((wcdate[0] > 31 || wcdate[1] > 12 || wcdate[2] > 9999) || splittedOne.length!=8 || isNaN(splittedOne))
									{
									$("#msg").text('Please enter valid date');
									$("#reports").html('');
									}
									else if(currentdate.getFullYear()<wcdate[2] || (currentdate.getFullYear()==wcdate[2] && (currentdate.getMonth()+1)<wcdate[1]) || (currentdate.getFullYear()==wcdate[2] && (currentdate.getMonth()+1)==wcdate[1] && currentdate.getDate()<wcdate[0])){
									$("#msg").text("Please enter other than future dates");
									$("#reports").html('');}
									else{
									$("#msg").text("");
										$('#reportForm').submit();
									}
									} */
									else if (splittedDate != "") {
										if (!(splittedTwo.length == 8 || splittedTwo.length == 6)
												|| splittedDate.length != 3) {

											$("#msg")
													.html(
															'Please enter date in dd/mm/yy format.');
											$("#errorMsgDiv").removeClass(
													'tableTitle nodataMessage');
											$("#errorMsgDiv").addClass(
													'tableTitle errorDiv');
											$('#tabs').html("");

										} else if ((splittedDate[0] > 31
												|| splittedDate[1] > 12 || splittedDate[2] > 9999)
												|| isNaN(splittedTwo)) {
											$("#msg")
													.html(
															'Please enter date in dd/mm/yy format.');
											$('#tabs').html("");
											$('#printBtn').removeClass(
													'articleActionBtns');
											$('#printBtn')
													.addClass(
															'articleActionBtns hideBlock');
											$("#errorMsgDiv").removeClass(
													'tableTitle nodataMessage');
											$("#errorMsgDiv").addClass(
													'tableTitle errorDiv');
										} else if (currentdate.getFullYear() < splittedDate[2]
												|| (currentdate.getFullYear() == splittedDate[2] && (currentdate
														.getMonth() + 1) < splittedDate[1])
												|| (currentdate.getFullYear() == splittedDate[2]
														&& (currentdate
																.getMonth() + 1) == splittedDate[1] && currentdate
														.getDate() < splittedDate[0])) {
											$("#msg")
													.html(
															"Please enter other than future dates");
											$("#errorMsgDiv").removeClass(
													'tableTitle nodataMessage');
											$("#errorMsgDiv").addClass(
													'tableTitle errorDiv');
											$('#tabs').html("");
											$('#printBtn').removeClass(
													'articleActionBtns');
											$('#printBtn')
													.addClass(
															'articleActionBtns hideBlock');
										} else {
											$("#msg").html("");
											$(".ContentTableWrapper")
													.removeClass('hideBlock');

											$('#statusImg').removeClass(
													'loading hideBlock');
											$('#statusImg').addClass('loading');
											$('#reportForm').submit();

										}
									}

								}
							});
			$("#generateReport")
					.click(
							function() {

								$("#msg").html('');
								//$('.paginationWrapper').hide();
								var currentdate = new Date();
								var splittedDate = formateDate(
										$('#date').val(),
										$('#date').val().split('/').length)
										.split('/');
								//var wcdate=$('#wcdate').val().split('/');
								//var splittedOne=wcdate[0]+wcdate[1]+wcdate[2];
								var splittedTwo = splittedDate[0]
										+ splittedDate[1] + splittedDate[2];
								if (splittedDate == "") {
									$("#msg")
											.html(
													'Please enter details to generate a report.');
									$('#errorMsgDiv').removeClass(
											'ContentTableWrapper hideBlock');
									$('#errorMsgDiv').addClass(
											'ContentTableWrapper');

									$('#tabs').html("");
									$('#printBtn').removeClass(
											'articleActionBtns');
									$('#printBtn').addClass(
											'articleActionBtns hideBlock');
									$("#errorMsgDiv").removeClass(
											'tableTitle nodataMessage');
									$("#errorMsgDiv").addClass(
											'tableTitle errorDiv');
								}
								/* else if(wcdate!=""){

								if((wcdate[0] > 31 || wcdate[1] > 12 || wcdate[2] > 9999) || splittedOne.length!=8 || isNaN(splittedOne))
								{
								$("#msg").text('Please enter valid date');
								$("#reports").html('');
								}
								else if(currentdate.getFullYear()<wcdate[2] || (currentdate.getFullYear()==wcdate[2] && (currentdate.getMonth()+1)<wcdate[1]) || (currentdate.getFullYear()==wcdate[2] && (currentdate.getMonth()+1)==wcdate[1] && currentdate.getDate()<wcdate[0])){
								$("#msg").text("Please enter other than future dates");
								$("#reports").html('');}
								else{
								$("#msg").text("");
									$('#reportForm').submit();
								}
								} */
								else if (splittedDate != "") {
									if (!(splittedTwo.length == 8 || splittedTwo.length == 6)
											|| splittedDate.length != 3) {

										$("#msg")
												.html(
														'Please enter date in dd/mm/yy format.');
										$("#errorMsgDiv").removeClass(
												'tableTitle nodataMessage');
										$("#errorMsgDiv").addClass(
												'tableTitle errorDiv');
										$('#tabs').html("");

									} else if ((splittedDate[0] > 31
											|| splittedDate[1] > 12 || splittedDate[2] > 9999)
											|| isNaN(splittedTwo)) {
										$("#msg")
												.html(
														'Please enter date in dd/mm/yy format.');
										$('#tabs').html("");
										$('#printBtn').removeClass(
												'articleActionBtns');
										$('#printBtn').addClass(
												'articleActionBtns hideBlock');
										$("#errorMsgDiv").removeClass(
												'tableTitle nodataMessage');
										$("#errorMsgDiv").addClass(
												'tableTitle errorDiv');
									} else if (currentdate.getFullYear() < splittedDate[2]
											|| (currentdate.getFullYear() == splittedDate[2] && (currentdate
													.getMonth() + 1) < splittedDate[1])
											|| (currentdate.getFullYear() == splittedDate[2]
													&& (currentdate.getMonth() + 1) == splittedDate[1] && currentdate
													.getDate() < splittedDate[0])) {
										$("#msg")
												.html(
														"Please enter other than future dates");
										$("#errorMsgDiv").removeClass(
												'tableTitle nodataMessage');
										$("#errorMsgDiv").addClass(
												'tableTitle errorDiv');
										$('#tabs').html("");
										$('#printBtn').removeClass(
												'articleActionBtns');
										$('#printBtn').addClass(
												'articleActionBtns hideBlock');
									} else {
										$("#msg").html("");
										$(".ContentTableWrapper").removeClass(
												'hideBlock');

										$('#statusImg').removeClass(
												'loading hideBlock');
										$('#statusImg').addClass('loading');
										$('#reportForm').submit();

									}
								}

							});
			$("#tabs").tabs();
		});

		$("#backBtn").click(function(e) {
			window.location.href = "../login/goingHome.htm";
		});

		$("#closeLink").click(function(e) {
			$('#accordion').accordion({
				active : true
			});
		});
		function formateDate(v, l) {
			if (v.length == 8 && l == 3) {
				var finalDate = parseDate(v).getFullYear();
				var splitDate = v.split("/");
				finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
				return finalDate;
			} else {
				return v;
			}
		}
	</script>

</body>
</html>
