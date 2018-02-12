<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>STAR Report</title>

<link href="../../styles/jqueryUI.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/NewScroll.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/slider.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />


<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/common_1pos.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/starReport.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.highlights.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script src="../../scripts/table.js?${properties.CachedCssAndJsFilesVersion}"></script>
<link rel="stylesheet" type="text/css"
	href="../../scripts/jchartfx/styles/jchartfx.css?${properties.CachedCssAndJsFilesVersion}" />
<!-- <link rel="stylesheet" type="text/css" href="../../scripts/jchartfx/styles/chartStyles.css?${properties.CachedCssAndJsFilesVersion}" /> -->
<script type="text/javascript"
	src="../../scripts/jchartfx/js/jchartfx.system.js?${properties.CachedCssAndJsFilesVersion}"></script>

<script type="text/javascript"
	src="../../scripts/jchartfx/js/jchartfx.coreBasic.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jchartfx/js/jchartfx.advanced.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jchartfx/js/jchartfx.animation.js?${properties.CachedCssAndJsFilesVersion}"></script>
<!-- <script type="text/javascript" src="../../scripts/jchartfx/js/jChartfxUser.js?${properties.CachedCssAndJsFilesVersion}"></script> -->

</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@ include file="../header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">STAR Report</li>
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
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->
		<form action="onPageLoad.htm" id="starReport" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate STAR Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter">
										<label for="store">Date</label> <input type="#"
											class="textbox defaultTextbox inputDate" id="dateFrom"
											name="dateFrom" value=""> to <input type="#"
											class="textbox defaultTextbox inputDate" id="dateTo"
											name="dateTo" value=""> <input type="hidden"
											id="dateFromHide" name="dateFromHide" /> <input
											type="hidden" id="dateToHide" name="dateToHide" />

									</div>
									<!-- End of parameter -->

									<div class="parameter clearfix parameterRow">
										<label>Performance</label> <span> <input type="radio"
											name="performance" value="Staff" id="POSRadio"><label
											for="posRadio" class="labelText paramCheckBox">Team</label>
											<input type="radio" name="performance" value="Store"
											id="salesRadio"><label for="salesRadio"
											class="labelText">Store</label> <input type="radio"
											name="performance" value="Both" id="bothRadio" checked><label
											for="bothRadio" class="labelText">Both</label>
											<div class="parameter supplierSource posDropDiv hideBlock">
												<span id=""> <select class="selectOptions"
													id="posDropDwn" name="posDropDwn">
														<option value="0">Select</option>
														<option value="5">5</option>
														<option value="10">10</option>
												</select>
												</span>
											</div>
										</span>
										<input type="hidden" id="performanceHide" name="performanceHide" />
										<input type="hidden" id="posDropDwnStaffHide" name="posDropDwnHide" />
									</div>
									<!-- End of parameter -->






									<div class="formActions">
										<label class="actionBtn" id="generateReport">Generate
											Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
									</div>
									<!-- End of form actions -->

								</div>
								<!-- End of content table wrapper -->
							</form>

						</div>
						<!-- End of div for jQuery handling -->


					</div>
					<!-- End of ui-accordion -->
					<div class="ContentTableWrapper hideBlock ContentTableWrapperError">


						<div class="tableInfo tableInfoError  tableStart">


							<div class="tableTitle  errorDiv" id="errorMsgDiv">
								<h4 id="errorMsg">
									<c:if test="${not empty noResults}">${noResults}</c:if>
								</h4>

								<!-- End of table title -->



							</div>
						</div>
					</div>

					<div id="reportContent" class="hideBlock">


						<!-- For displaying report results -->
						<div class="ContentTableWrapper hideBlock"
							style="overflow-y: hidden !important;">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4>
										<strong>Team and Store Performance</strong>
									</h4>
								</div>
								<!-- End of table title -->


							</div>
							<!-- End of table info -->


							<div id="mainTabs">

								<div class="tableActionBtns">
									<label class="actionBtn" id="printBtn"
										onclick="starReportJasper();"><label class="print">Print</label></label>
								</div>


								<ul>
									<li><a href="#mainTabs-1">Team</a></li>
									<li><a href="#mainTabs-2">Store</a></li>
								</ul>




								<div id="mainTabs-1">


									<div id="subTabs">
										<div class="tableTitle star-pos-title">
											<h4>
												<strong>Service Team Action Report - POS Operator
													Performance</strong>
											</h4>
										</div>
										<!-- End of table title -->

										<div class="tableActionBtns">
											<label class="display-graph"></label> <label
												class="display-table"></label>
										</div>


										<ul>
											<li><a href="#subTabs-1">Scanning Rate</a></li>
											<li><a href="#subTabs-2">Tendering Time</a></li>
											<li><a href="#subTabs-3">Loyalty</a></li>
											<li><a href="#subTabs-4">Cashout</a></li>
										</ul>
										<!-- 
										<div class="graph-layout" id="TempsubTabs-1">
											<h1>1</h1>
										</div>
										<div class="graph-layout" id="TempsubTabs-2">
											<h1>2</h1>
										</div>
										<div class="graph-layout" id="TempsubTabs-3">
											<h1>3</h1>
										</div>
										<div class="graph-layout" id="TempsubTabs-4">
											<h1>4</h1>
										</div>
										-->


										<div class="graph-layout" id="subTabs-1">

											<div id="scan-graph-block" class="graph-block hideBlock">

												<div class="left">
													<label class="bar-heads">Leading Scannes</label>
													<div id="scan_lead" class="leading-scanners-graph"></div>
													<label class="bar-heads">Oppurtunity Scannes</label>
													<div id="scan_opps" class="oppurtunity-scanners-graph">

													</div>
												</div>
												<div id="scan_right" class="right"></div>

											</div>

											<table cellspacing="0"
												class="posTbl ContentTable hideBlock tab-block scanTableopp"
												id="sortTable">

												<thead>
													<tr>
														<th colspan="3" class="centerValue columnDivider"
															width="47%">Leading Scanners</th>
														<th rowspan="2" class="centerValue columnDivider"
															width="6%">&nbsp;</th>
														<th colspan="3" class="centerValue" width="47%">Opportunity
															Scanners</th>
													</tr>

													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Articles/min</th>
														<th class="numberColumn">QTY</th>

														<th>POS Operator Name</th>
														<th class="numberColumn">Articles/min</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>

												</thead>
												<tbody></tbody>

											</table>


										</div>
										<div class="graph-layout" id="subTabs-2">


											<div id="tt-graph-block" class="graph-block hideBlock">

												<div class="left">
													<label class="bar-heads">Leading Scannes</label>
													<div id="tt_lead" class="leading-scanners-graph"></div>
													<label class="bar-heads">Oppurtunity Scannes</label>
													<div id="tt_opps" class="oppurtunity-scanners-graph">

													</div>
												</div>
												<div id="tt_right" class="right"></div>

											</div>

											<table cellspacing="0"
												class="posTbl ContentTable hideBlock tab-block"
												id="timeTable">

												<thead>


													<tr>
														<th colspan="2" class="centerValue columnDivider"
															width="47%">Leading Scanners</th>
														<th rowspan="2" class="centerValue columnDivider"
															width="6%">&nbsp;</th>
														<th colspan="3" class="centerValue" width="47%">Opportunity
															Scanners</th>
													</tr>
													<tr class="subHeader">
														<th>POS Operator Name</th>
														<th class="numberColumn columnDivider">Sec/Tran</th>
														<th>POS Operator Name</th>
														<th class="numberColumn lastColumn">Sec/Tran</th>
													</tr>

												</thead>
												<tbody>
												</tbody>






											</table>

										</div>
										<div classa="graph-layout" id="subTabs-3">

											<div id="edr-graph-block" class="graph-block hideBlock">

												<div class="left">
													<label class="bar-heads">Leading Scannes</label>
													<div id="edr_lead" class="leading-scanners-graph"></div>
													<label class="bar-heads">Oppurtunity Scannes</label>
													<div id="edr_opps" class="oppurtunity-scanners-graph">

													</div>
												</div>
												<div id="edr_right" class="right"></div>

											</div>

											<table cellspacing="0"
												class="posTbl ContentTable hideBlock tab-block"
												id="edrTable">

												<thead>


													<tr>
														<th colspan="2" class="centerValue columnDivider"
															width="47%">Leading Scanners</th>
														<th rowspan="2" class="centerValue columnDivider"
															width="6%">&nbsp;</th>
														<th colspan="3" class="centerValue" width="47%">Opportunity
															Scanners</th>
													</tr>
													<tr class="subHeader">
														<th>POS Operator Name</th>
														<th class="numberColumn columnDivider">% Loyalty</th>
														<th>POS Operator Name</th>
														<th class="numberColumn lastColumn">% Loyalty</th>
													</tr>

												</thead>
												<tbody></tbody>






											</table>

										</div>
										<div class="graph-layout" id="subTabs-4">

											<div id="cash-graph-block" class="graph-block hideBlock">

												<div class="left">
													<label class="bar-heads">Leaders</label>
													<div id="cash_lead" class="leading-scanners-graph"></div>
													<label class="bar-heads">Opportunity</label>
													<div id="cash_opps" class="oppurtunity-scanners-graph">

													</div>
												</div>
												<div id="cash_right" class="right"></div>

											</div>

											<table cellspacing="0"
												class="posTbl ContentTable hideBlock tab-block"
												id="cashTable">

												<thead>


													<tr>
														<th colspan="3" class="centerValue columnDivider"
															width="47%">Leaders</th>
														<th rowspan="2" class="centerValue columnDivider"
															width="6%">&nbsp;</th>
														<th colspan="3" class="centerValue" width="47%">Opportunity</th>
													</tr>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Total</th>
														<th class="numberColumn">QTY</th>

														<th>POS Operator Name</th>
														<th class="numberColumn">Total</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>

												</thead>
												<tbody>
												</tbody>






											</table>

										</div>
									</div>
									<!-- End of tabs -->




								</div>
								<div id="mainTabs-2">
									<div class="tableInfo">
										<div class="tableTitle star-pos-title">
											<h4>
												<strong>Service Team Action Report - Sales and
													Transactions</strong>
											</h4>
										</div>
									</div>


									<!-- <div class="articleHead hideBlock">
										<div class="articleHeaderWrapper" id="summaryDetails"></div>
									</div>

									<div class="articleContent orderDetails hideBlock">


										<div class="articleContentInner">

											<div class="articleDetails">


												<table cellspacing="0" class="" width="100%" id="summaryTbl">
													<tbody></tbody>
												</table>
											</div>
											End of article details
										</div>
										End of article content inner


									</div> -->
									<!-- End of article content -->

									<div id="filterTabs" class="filterTabs">
										<ul>

											<li><a href="#tabs-1">Price Override</a></li>
											<li><a href="#tabs-2">Unrecalled Saved Transactions</a></li>
											<li><a href="#tabs-3">Void Transactions</a></li>
											<li><a href="#tabs-4">Void Articles</a></li>
											<li><a href="#tabs-5">No Sales</a></li>
											<li><a href="#tabs-6">Refunds</a></li>
											<li><a href="#tabs-7">Article Sold by Department</a></li>
											<li><a href="#tabs-8">Team Discount</a></li>
											<li><a href="#tabs-9">Price Inquiry</a></li>
											<li><a href="#tabs-10">One Card</a></li>
										</ul>
										<div id="tabs-1">
										<div class="starRptHyperLink hideBlock">
											<a href="../investigate/onPageLoad.htm" target="_blank" 
											   onclick="return setParamsNRedirect(this,'priceMarkdown','InvestigateRpts');" >Click here for details</a>
										</div>
											<table cellspacing="0" class="ContentTable storeTbl"
												id="priceTable">
												<thead>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Total</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>
											</table>


										</div>
										<!-- End of tabs -1 -->




										<div id="tabs-2">
										<div class="starRptHyperLink hideBlock" >
											<a href="../investigate/onPageLoad.htm" target="_blank" 
											   onclick="return setParamsNRedirect(this,'savedTrans','InvestigateRpts');" >Click here for details</a>
										</div>
											<table cellspacing="0" class="ContentTable storeTbl"
												id="transTable">
												<thead>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Total</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>
											</table>


										</div>
										<!-- End of tabs - 2 -->

										<div id="tabs-3">
										<div class="starRptHyperLink hideBlock">
											<a href="../voidrefund/onPageLoad.htm" target="_blank" 
											   onclick="return setParamsNRedirect(this,'Voids','VoidRefundRpts','Transaction');" >Click here for details</a>
										</div>


											<table cellspacing="0" class="ContentTable storeTbl"
												id="voidTransTable">
												<thead>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Total</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>

											</table>


										</div>
										<!-- End of tabs - 3 -->

										<div id="tabs-4">
										<div class="starRptHyperLink hideBlock">
											<a href="../voidrefund/onPageLoad.htm" target="_blank" 
											   onclick="return setParamsNRedirect(this,'Voids','VoidRefundRpts','Article');" >Click here for details</a>
										</div>


											<table cellspacing="0" class="ContentTable storeTbl"
												id="voidArtTable">
												<thead>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Total</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>
											</table>


										</div>
										<!-- End of tabs - 4 -->

										<div id="tabs-5">
										<div class="starRptHyperLink hideBlock">
											<a href="../investigate/onPageLoad.htm" target="_blank" 
											   onclick="return setParamsNRedirect(this,'noSales','InvestigateRpts');" >Click here for details</a>
										</div>


											<table cellspacing="0" class="ContentTable storeTbl"
												id="noSalesTable">
												<thead>
													<tr>
														<th>POS Operator Name</th>

														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>

											</table>


										</div>
										<!-- End of tabs - 5 -->

										<div id="tabs-6">
										<div class="starRptHyperLink hideBlock">
											<a href="../voidrefund/onPageLoad.htm" target="_blank" 
											   onclick="return setParamsNRedirect(this,'Refunds','VoidRefundRpts');" >Click here for details</a>
										</div>


											<table cellspacing="0" class="ContentTable storeTbl"
												id="refundTable">
												<thead>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Total</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>

											</table>


										</div>
										<!-- End of tabs - 6 -->
										<div id="tabs-7">
										<div class="starRptHyperLink hideBlock">
											<a href="../investigate/onPageLoad.htm" target="_blank" 
											   onclick="return setParamsNRedirect(this,'deptSales','InvestigateRpts');" >Click here for details</a>
										</div>


											<table cellspacing="0" class="ContentTable storeTbl"
												id="artclSldByDept">
												<thead>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Total</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>

											</table>


										</div>
										<!-- End of tabs - 7 -->
										<div id="tabs-8">


											<table cellspacing="0" class="ContentTable storeTbl"
												id="staffDisc">
												<thead>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Repeat</th>
														<th class="numberColumn">Total</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>

											</table>


										</div>
										<!-- End of tabs - 8 -->
										<div id="tabs-9">
										<div class="starRptHyperLink hideBlock">
											<a href="../investigate/onPageLoad.htm" target="_blank" 
											   onclick="return setParamsNRedirect(this,'priceInquiry','InvestigateRpts');" >Click here for details</a>
										</div>


											<table cellspacing="0" class="ContentTable storeTbl"
												id="priceInquiry">
												<thead>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>

											</table>


										</div>
										<!-- End of tabs - 9 -->
										<div id="tabs-10">


											<table cellspacing="0" class="ContentTable storeTbl"
												id="oneCard">
												<thead>
													<tr>
														<th>POS Operator Name</th>
														<th class="numberColumn">Repeat</th>
														<th class="numberColumn lastColumn">QTY</th>
													</tr>
												</thead>
												<tbody></tbody>

											</table>


										</div>
										<!-- End of tabs - 10 -->






									</div>
									<!-- End of filtertabs -->


								</div>
								<!-- End of Main tabs 2  -->
							</div>
							<!-- End of Main tabs -->




						</div>
						<!-- End of Content Table Wrapper-->



					</div>
					<!-- end of report info -->

				</div>
				<!-- End of article Additional Info -->


			</div>
			<!-- End of content wrapper -->

		</form>
		<input id="navBarHighlight" type="hidden" value="reports" />
	</div>
	<%@include file="jasperPrintValidate.jsp"%>
	<%@ include file="../footer.jsp"%>






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



	<div id="printData" class="hideBlock">
		<div id="printbody"></div>
		<div class="hideBlock">
			<label class="siteNoName">${user.siteNo} | ${user.siteName}</label> <label
				class="depPrint"></label><label class="catPrint"></label><label
				class="scPrint"></label><label class="segPrint"></label>
		</div>
	</div>
</body>
</html>