<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Daily Goods Movement Summary</title>
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
<script>
		

		
		$(function() {

			var tableCols = 0;
			
			$("#treetable tbody tr").each(function(){
				var currCount = 0
				$(this).children("td").each(function(){
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
			
			if (tableCols > 11){
				width = (tableCols * 100) - 100 ;
				document.getElementById("scrollWindow").style.width=width;
			}
			
			
			$( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 350
			});	
			

			$('#next-column').click(function(event){
				event.preventDefault();
				$('.scrollTableContainer').animate({scrollLeft:'+=150'}, 'fast');
			});
			$('#previous-column').click(function(event){
				event.preventDefault();
				$('.scrollTableContainer').animate({scrollLeft:'-=150'}, 'fast');
			});
			
			
			
			
			
			
			
			$("#dialog-modal").parent().addClass("popupWrapper");		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
		});
			
	</script>
</head>
<body>

	<div class="NoPrint mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage">Daily Goods Movement Summary</li>
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

					<h3>Generate Daily Goods Movement Summary</h3>
					<div>

						<form method="post" id="reportForm" action="reportSearch.htm"
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
								type="hidden" id="salesOrgUsr" value="${user.salesOrg}" />

						</form>

					</div>
					<!-- End of div for jQuery handling -->


				</div>
				<!-- End of ui-accordion -->

				<!--Print Button-->

				<div class="ContentTableWrapper">

					<div class="tableInfo">
						<c:if
							test="${ empty dgmsReportWithInvoice &&  empty dgmsReportWithOutInvoice}">
							<div class="tableTitle nodataMessage" id="errorMsgDiv">
								<h4 id="msg">${msg}</h4>
							</div>
						</c:if>

						<c:if
							test="${not empty dgmsReportWithInvoice || not empty dgmsReportWithOutInvoice}">
							<div class="tableTitle" id="errorMsgDiv">
								<h4 id="msg">
									Total <strong>${dgmsReportWithInvoice.size()+dgmsReportWithOutInvoice.size()}</strong>
									records found
								</h4>
							</div>
						</c:if>
						<!-- End of table title -->



					</div>
					<!-- End of table info -->

					<c:if
						test="${not empty dgmsReportWithInvoice || not empty dgmsReportWithOutInvoice}">
						<div id="tabs">

							<div class="tableActionBtns">

								<label class="actionBtn" onclick="dgmsDetailsPrint();"
									id="printBtn"><label class="print">Print</label></label>

							</div>

							<ul>
								<li><a href="#tabs-1">Report with Invoice <c:if
											test="${not empty dgmsReportWithInvoice}">
					(${dgmsReportWithInvoice.size()})
					</c:if>
								</a></li>
								<li><a href="#tabs-2">Report without Invoice<c:if
											test="${not empty dgmsReportWithOutInvoice}">
					(${dgmsReportWithOutInvoice.size()})
					</c:if>
								</a></li>
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
												<th>Fine</th>
												<th>Vendor</th>
												<th>Employee</th>
												<th>Date</th>
												<th>Time</th>
												<th>Invoice #</th>
												<th>Invoice Total</th>
												<th>Temp</th>
												<th>GST</th>
												<th>Carrier</th>
												<th class="lastColumn">Freight/Note No</th>
											</tr>
											<c:forEach items="${dgmsReportWithInvoice}" var="dgmsReport">
												<tr>
													<td class="sorted">${dgmsReport.tradingDeptNo}<c:if
															test="${not empty dgmsReport.tradingDeptNo && not empty dgmsReport.tradingDeptName}"> | </c:if>
														${dgmsReport.tradingDeptName}
													</td>
													<td>
														<!-- ${dgmsReport.fineDeptNo} -->
													</td>
													<td>${dgmsReport.vendorNo}<c:if
															test="${not empty dgmsReport.vendorName && not empty dgmsReport.vendorNo}"> | </c:if>${dgmsReport.vendorName}
													</td>
													<td>${dgmsReport.userId}<c:if
															test="${not empty dgmsReport.userId && not empty dgmsReport.userName}"> | </c:if>${dgmsReport.userName}
													</td>
													<td>${dgmsReport.receiptDate}</td>
													<td class="time-slice">${dgmsReport.receiptTime}</td>
													<td>${dgmsReport.invoiceNo}</td>
													<td>${dgmsReport.invoiceTotal}</td>
													<td>${dgmsReport.temperature}</td>
													<td>${dgmsReport.gstValue}</td>
													<td>${dgmsReport.carrier}</td>
													<td class="lastColumn">${dgmsReport.consignment}</td>
												</tr>
											</c:forEach>

										</table>

									</div>
								</div>
								<!-- End of content table wrapper -->
							</div>
							<div id="tabs-2">
								<div class="ContentTableWrapper">
									<table cellspacing="0"
										class="ContentTable treetable drilldownTable" id="treetable">
										<tr>
											<th class="sorted">Dept.</th>
											<th>Fine</th>
											<th>Vendor</th>
											<th>Doc No.</th>
											<th>Employee</th>
											<th>Date</th>
											<th>Time</th>
											<th>Temp</th>
											<th>Cost</th>
											<th>GST</th>
											<th>Carrier</th>
											<th class="lastColumn">Freight/Note No</th>
										</tr>
										<c:forEach items="${dgmsReportWithOutInvoice}"
											var="dgmsReport">
											<tr>
												<td class="sorted">${dgmsReport.tradingDeptNo}<c:if
														test="${not empty dgmsReport.tradingDeptNo && not empty dgmsReport.tradingDeptName}"> | </c:if>
													${dgmsReport.tradingDeptName}
												</td>
												<td>
													<!-- ${dgmsReport.fineDeptNo} -->
												</td>
												<td>${dgmsReport.vendorNo}<c:if
														test="${not empty dgmsReport.vendorName && not empty dgmsReport.vendorNo}"> | </c:if>${dgmsReport.vendorName}
												</td>
												<td>${dgmsReport.deliveryDocketNo}</td>
												<td>${dgmsReport.userId}<c:if
														test="${not empty dgmsReport.userId && not empty dgmsReport.userName}"> | </c:if>${dgmsReport.userName}
												</td>
												<td>${dgmsReport.receiptDate}</td>
												<td class="time-slice">${dgmsReport.receiptTime}</td>
												<td>${dgmsReport.temperature}</td>
												<td>${dgmsReport.cost}</td>
												<td>${dgmsReport.gstValue}</td>
												<td>${dgmsReport.carrier}</td>
												<td class="lastColumn">${dgmsReport.consignment}</td>
											</tr>
										</c:forEach>

									</table>
								</div>
								<!-- End of content table wrapper -->
							</div>

						</div>

					</c:if>
				</div>

				<!-- End of Content Table Wrapper-->

			</div>
			<!-- End of article Additional Info -->


		</div>
		<!-- End of content wrapper -->

		<input id="navBarHighlight" type="hidden" value="reports" />
	</div>
	<%@include file="footer.jsp"%>

	<div id="print">

		<div id="printReport" style="display: none">
			<div id="printbody">
				<link rel="stylesheet" href="../../styles/printstyle.css?version=${properties.version}" />
				<div id="withInvoice">
					<div class="width100">

						<div class="width70 margin5 reportName bold inline-block">Daily
							Goods Movement Summary With Invoices</div>
						<div class="width25 reportName right">
							<div class=" margin5 text-align-right ">
								<label class="salesOrgName"></label><label class="separator"></label><label
									class="currentDate"></label> ${storeNo} <span id="withInV"></span>
							</div>
						</div>
						<div class="width70 margin5 margontopnone inline-block">
							<label class="">Created on: </label><label class="currentDate1"></label>
						</div>
						<div class="width25 right">
							<div class=" margin5 text-align-right ">${storeNo} |
								${storeName}</div>
						</div>
					</div>
					<div class="width100 margintop20 border">
						<div class="width70 margin5 bold ">Report for:</div>
						<div class="margin5 margontopnone">
							<label class="">Date from: </label><label class="fromDate"></label><label
								class="separator">|</label><label class="">Date to: </label><label
								class="toDate"></label>
						</div>
					</div>
					<div class="width100 margintop20 border">

						<div class="width49 inline-block">
							<div class="margin5 bold ">Store to Complete</div>
							<div class=" margin5 margontopnone">
								<label>Total no of documents sent to TPC </label><label
									class="right">_______________________________</label>
							</div>
							<div class=" margin5 margontopnone">
								<label>Total Invoice Value of Documents(GST Inc) </label><label
									class="right"><c:if test="${not empty totalCost}">$</c:if>
									<span class="decimalPrecision">${totalCost}</span></label>
							</div>
							<div class=" margin5 margontopnone">
								<label>GST: </label><label class="right"><c:if
										test="${not empty totalCost}">$</c:if> <span
									class="decimalPrecision">${totalGst}</span></label>
							</div>
						</div>
						<div class="width49 border-left  right">
							<div class="margin5 bold">TPC to Complete</div>
							<div class=" margin5 margontopnone">
								<label>Total No. Documents </label><label class="right">_______________________________</label>
							</div>
							<div class=" margin5 margontopnone">
								<label>Total Cost Value(GST Inc) </label><label class="right">_______________________________</label>
							</div>
							<div class=" margin5 margontopnone">
								<label>GST</label><label class="right">_______________________________</label>
							</div>
						</div>
					</div>


					<table cellspacing="0" cellpadding="1" id=""
						class="text-align-left font11 margintop20 width100" border="1">
						<tr class="bold">
							<th>No</th>
							<th class="pad5">Dept</th>
							<th class="pad5">Fine</th>
							<th class="pad5">Vendor</th>
							<th class="pad5">Employee</th>
							<th class="pad5">Date</th>
							<th class="pad5">Time</th>
							<th class="pad5">Temp</th>
							<th class="pad5">Invoice Number</th>
							<th class="pad5 text-align-right">Invoice Total</th>
							<th class="pad5 text-align-right">GST</th>
							<th class="pad5">Carrier</th>
							<th class="pad5">Freight/Note No</th>
						</tr>
						<%
						int j = 1, k = 1;
					%>
						<c:forEach items="${dgmsReportWithInvoice}" var="dgmsReport">

							<tr class="normal">

								<td><%=j++%></td>
								<td class="pad5">${dgmsReport.tradingDeptNo} <c:if
										test="${not empty dgmsReport.tradingDeptNo && not empty dgmsReport.tradingDeptName}"> | </c:if>
									${dgmsReport.tradingDeptName}
								</td>
								<td class="pad5">
									<!-- ${dgmsReport.fineDeptNo} -->
								</td>
								<td class="pad5">${dgmsReport.vendorNo} <c:if
										test="${not empty dgmsReport.vendorName && not empty dgmsReport.vendorNo}"> | </c:if>${dgmsReport.vendorName}
								</td>
								<td class="pad5">${dgmsReport.userId} <c:if
										test="${not empty dgmsReport.userId && not empty dgmsReport.userName}"> | </c:if>${dgmsReport.userName}
								</td>
								<td class="pad5">${dgmsReport.receiptDate}</td>
								<td class="pad5 time-slice">${dgmsReport.receiptTime}</td>
								<td class="pad5">${dgmsReport.temperature}</td>
								<td class="pad5">${dgmsReport.invoiceNo}</td>
								<td class="pad5 text-align-right">${dgmsReport.invoiceTotal}</td>

								<td class="pad5 text-align-right">${dgmsReport.gstValue}</td>
								<td class="pad5">${dgmsReport.carrier}</td>
								<td class="pad5">${dgmsReport.consignment}</td>

							</tr>

						</c:forEach>
						<%
						boolean index = true;
					%>
						<c:forEach items="${mapWithInvoice}" var="map">
							<tr class="height30">
								<td colspan="9" class="bold"><c:if test="<%=index%>">Totals by Dept : </c:if>
									<c:set var="mapvalue" value="${map.value}" /> <label
									class="normal right"> ${mapvalue.tradingDeptNo} <%-- <c:if test="${not empty mapvalue.tradingDeptNo && not empty mapvalue.tradingDeptName}"> | </c:if> --%>${mapvalue.tradingDeptName}
								</label></td>
								<td class="text-align-right" colspan="1"><label
									class="normal right decimalPrecision">${mapvalue.invoiceTotal}</label></td>
								<td class="text-align-right" colspan="1"><label
									class="normal right decimalPrecision">${mapvalue.gstValue}</label></td>
								<%
								index = false;
							%>
								<td colspan="2"></td>
							</tr>
						</c:forEach>
					</table>



					<p class="text-align-center margintop20 bold">
						<b>End of Report</b>
					</p>
					<table border="0" class="font11 bold bordernone"
						style="width: 50%; float: left">
						<tr>
							<td>Manager's Signature:</td>
							<td>___________________________</td>
						</tr>
						<tr>
							<td>Preparer:</td>
							<td>___________________________</td>
						</tr>
					</table>
					<div id="foot" class=" margintop100 width98">
						<div class="width48 margin5 inline-block">
							<label class="bold">Printed on: </label><label
								class="currentDate1"></label> <label class="separator">|</label>
							<label class="currentTime1"></label>
						</div>
						<div class="width48  inline-block right">
							<div class=" lineheight15 margin5 text-align-right ">
								Page <label class="pageno">#</label> of <label class="totalpage">#</label>
							</div>
						</div>
					</div>
				</div>
				<div id="contentDiv">
					<div class="width100 ">
						<div class="width70 margin5 reportName bold inline-block">Daily
							Goods Movement Summary Without Invoices</div>
						<div class="width25 reportName right">
							<div class=" margin5 text-align-right ">
								<label class="salesOrgName"></label><label class="separator"></label><label
									class="currentDate"></label> ${storeNo} <span id="withoutInV"></span>
							</div>
						</div>
						<div class="width70 margin5 margontopnone inline-block">
							<label class="">Created on: </label><label class="currentDate1"></label>
						</div>
						<div class="width25 right">
							<div class=" margin5 text-align-right ">${storeNo} |
								${storeName}</div>
						</div>
					</div>
					<div class="width100 margintop20 border">
						<div class="width70 margin5 bold ">Report for:</div>
						<div class="margin5 margontopnone">
							<label class="">Date from: </label><label class="fromDate"></label><label
								class="separator">|</label><label class="">Date to: </label><label
								class="toDate"></label>
						</div>
					</div>

					<div class="width100 margintop20 border">

						<div class="width49 inline-block">
							<div class="margin5 bold ">Store to Complete</div>
							<div class=" margin5 margontopnone">
								<label>Total no of documents sent to TPC </label><label
									class="right">_______________________________</label>
							</div>
							<div class=" margin5 margontopnone">
								<label>Total Invoice Value of Documents(GST Inc) </label><label
									class="right"><c:if test="${not empty totalCostOut}">$</c:if>
									<span class="decimalPrecision">${totalCostOut}</span></label>
							</div>
							<div class=" margin5 margontopnone">
								<label>GST: </label><label class="right"><c:if
										test="${not empty totalCostOut}">$</c:if> <span
									class="decimalPrecision">${totalGstOut}</span></label>
							</div>
						</div>
						<div class="width49 border-left  right">
							<div class="margin5 bold">TPC to Complete</div>
							<div class=" margin5 margontopnone">
								<label>Total No. Documents </label><label class="right">_______________________________</label>
							</div>
							<div class=" margin5 margontopnone">
								<label>Total Cost Value(GST Inc) </label><label class="right">_______________________________</label>
							</div>
							<div class=" margin5 margontopnone">
								<label>GST</label><label class="right">_______________________________</label>
							</div>
						</div>
					</div>


					<table cellspacing="0" id="" cellpadding="1"
						class="text-align-left font11 margintop20 width100" border="1">
						<tr class="bold">
							<th>No</th>
							<th class="pad5">Dept</th>
							<th class="pad5">Fine</th>
							<th class="pad5">Vendor</th>
							<th class="pad5">Doc No</th>
							<th class="pad5">Employee</th>
							<th class="pad5">Date</th>
							<th class="pad5">Time</th>
							<th class="pad5">Temp</th>
							<th class="pad5 text-align-right">Cost</th>
							<th class="pad5 text-align-right">GST</th>
							<th class="pad5">Carrier</th>
							<th class="pad5">Freight/Note No</th>
						</tr>
						<%
						int i = 1, l = 1;
					%>
						<c:forEach items="${dgmsReportWithOutInvoice}" var="dgmsReport">

							<tr class="normal">

								<td><%=i++%></td>
								<td class="pad5">${dgmsReport.tradingDeptNo} <c:if
										test="${not empty dgmsReport.tradingDeptNo && not empty dgmsReport.tradingDeptName}"> | </c:if>${dgmsReport.tradingDeptName}
								</td>
								<td class="pad5">
									<!-- ${dgmsReport.fineDeptNo} -->
								</td>
								<td class="pad5">${dgmsReport.vendorNo} <c:if
										test="${not empty dgmsReport.vendorName && not empty dgmsReport.vendorNo}"> | </c:if>${dgmsReport.vendorName}
								</td>
								<td class="pad5">${dgmsReport.deliveryDocketNo}</td>
								<td class="pad5">${dgmsReport.userId} <c:if
										test="${not empty dgmsReport.userId && not empty dgmsReport.userName}"> | </c:if>${dgmsReport.userName}
								</td>
								<td class="pad5">${dgmsReport.receiptDate}</td>
								<td class="pad5 time-slice">${dgmsReport.receiptTime}</td>
								<td class="pad5">${dgmsReport.temperature}</td>
								<td class="pad5 text-align-right">${dgmsReport.cost}</td>
								<td class="pad5 text-align-right">${dgmsReport.gstValue}</td>
								<td class="pad5">${dgmsReport.carrier}</td>
								<td class="pad5">${dgmsReport.consignment}</td>

							</tr>
						</c:forEach>
						<%
						boolean index1 = true;
					%>
						<c:forEach items="${mapWithOutInvoice}" var="map">
							<tr>
								<td colspan="9" class="bold"><c:if test="<%=index1%>">Totals by Dept :</c:if>
									<c:set var="mapvalue" value="${map.value}" /> <label
									class="pad5 normal right">${mapvalue.tradingDeptNo} <%-- <c:if test="${not empty mapvalue.tradingDeptNo && not empty mapvalue.tradingDeptName}"> | </c:if> --%>${mapvalue.tradingDeptName}
								</label></td>
								<td class="text-align-right" colspan="1"><label
									class="decimalPrecision right normal">${mapvalue.cost}</label></td>
								<td class="text-align-right" colspan="1"><label
									class="decimalPrecision right normal">${mapvalue.gstValue}</label></td>
								<%
								index1 = false;
							%>
								<td colspan="2"></td>
							</tr>
						</c:forEach>

					</table>

					<p class="text-align-center margintop20 bold">
						<b>End of Report</b>
					</p>
					<table border="0" class="font11 bordernone bold"
						style="width: 50%; float: left">
						<tr>
							<td>Manager's Signature:</td>
							<td>___________________________</td>
						</tr>
						<tr>
							<td>Preparer:</td>
							<td>___________________________</td>
						</tr>
					</table>


				</div>
				<div id="foot" class=" margintop100 width98">
					<div class="width48 margin5 inline-block">
						<label class="bold">Printed on: </label><label
							class="currentDate1"></label> <label class="separator">|</label>
						<label class="currentTime1"></label>
					</div>
					<div class="width48  inline-block right">
						<div class=" lineheight15 margin5 text-align-right ">
							Page <label class="pageno">#</label> of <label class="totalpage">#</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script>
	function getArticlesForPage(pageNumber){
		
		$('#statusImg').removeClass('statusWrapper hideBlock');
		$('#statusImg').addClass('statusWrapper');
		
		$('#pageNumber').val(pageNumber);	
		$('#sohAdjustLog').attr('action','reportSearchForPagination.htm');
		$('#sohAdjustLog').submit();

	}
		$(function() {

			

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
				$(document).keypress(function(event) {
					
					
				    if (event.which == 13) {
				        event.preventDefault();
				       // $('.paginationWrapper').hide();
				        $("#msg").html('');

				        var currentdate = new Date();
						var splittedDate = formateDate($('#date').val(),$('#date').val().split('/').length).split('/');
						//var wcdate=$('#wcdate').val().split('/');
						//var splittedOne=wcdate[0]+wcdate[1]+wcdate[2];
						var splittedTwo = splittedDate[0]
								+ splittedDate[1] + splittedDate[2];
						if (splittedDate == "") {
							$("#msg").html('Please enter details to generate a report.');
							$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv');

							$('#tabs').html("");
							$('#printBtn').removeClass(
									'articleActionBtns');
							$('#printBtn').addClass(
									'articleActionBtns hideBlock');

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
							if (!(splittedTwo.length == 8 || splittedTwo.length == 6 ) || splittedDate.length!=3) {

								$("#msg").html(
										'Please enter date in dd/mm/yy format.');
								$('#tabs').html("");
								$('#printBtn').removeClass(
										'articleActionBtns');
								$('#printBtn').addClass(
										'articleActionBtns hideBlock');
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');

							} else if ((splittedDate[0] > 31
									|| splittedDate[1] > 12 || splittedDate[2] > 9999)
									|| isNaN(splittedTwo)) {
								$("#msg").html(
										'Please enter date in dd/mm/yy format.');
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');
								$('#tabs').html("");
							} else if (currentdate.getFullYear() < splittedDate[2]
									|| (currentdate.getFullYear() == splittedDate[2] && (currentdate
											.getMonth() + 1) < splittedDate[1])
									|| (currentdate.getFullYear() == splittedDate[2]
											&& (currentdate.getMonth() + 1) == splittedDate[1] && currentdate
											.getDate() < splittedDate[0])) {
								$("#msg")
										.html(
												"Please enter other than future dates");
								$('#tabs').html("");
								$('#printBtn').removeClass(
										'articleActionBtns');
								$('#printBtn').addClass(
										'articleActionBtns hideBlock');
								$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
								$("#errorMsgDiv").addClass('tableTitle errorDiv');
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
					
					
				     //*************
				        
				    }
			 });
			$("#generateReport")
					.click(
							function() {

								//$('.paginationWrapper').hide();
								$("#msg").html('');
								var currentdate = new Date();
								var splittedDate = formateDate($('#date').val(),$('#date').val().split('/').length).split('/');
								//var wcdate=$('#wcdate').val().split('/');
								//var splittedOne=wcdate[0]+wcdate[1]+wcdate[2];
								var splittedTwo = splittedDate[0]
										+ splittedDate[1] + splittedDate[2];
								if (splittedDate == "") {
									$("#msg").html('Please enter details to generate a report.');
									$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
									$("#errorMsgDiv").addClass('tableTitle errorDiv');

									$('#tabs').html("");
									$('#printBtn').removeClass(
											'articleActionBtns');
									$('#printBtn').addClass(
											'articleActionBtns hideBlock');

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
									if (!(splittedTwo.length == 8 || splittedTwo.length == 6) || splittedDate.length!=3) {

										$("#msg").html(
												'Please enter date in dd/mm/yy format.');
										$('#tabs').html("");
										$('#printBtn').removeClass(
												'articleActionBtns');
										$('#printBtn').addClass(
												'articleActionBtns hideBlock');
										$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
										$("#errorMsgDiv").addClass('tableTitle errorDiv');

									} else if ((splittedDate[0] > 31
											|| splittedDate[1] > 12 || splittedDate[2] > 9999)
											|| isNaN(splittedTwo)) {
										$("#msg").html(
												'Please enter date in dd/mm/yy format.');
										$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
										$("#errorMsgDiv").addClass('tableTitle errorDiv');
										$('#tabs').html("");
									} else if (currentdate.getFullYear() < splittedDate[2]
											|| (currentdate.getFullYear() == splittedDate[2] && (currentdate
													.getMonth() + 1) < splittedDate[1])
											|| (currentdate.getFullYear() == splittedDate[2]
													&& (currentdate.getMonth() + 1) == splittedDate[1] && currentdate
													.getDate() < splittedDate[0])) {
										$("#msg")
												.html(
														"Please enter other than future dates");
										$('#tabs').html("");
										$('#printBtn').removeClass(
												'articleActionBtns');
										$('#printBtn').addClass(
												'articleActionBtns hideBlock');
										$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
										$("#errorMsgDiv").addClass('tableTitle errorDiv');
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
			window.location.href="../login/goingHome.htm";
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
	</script>

</body>
</html>
