<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<title>Night Fill Report</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/NewScroll.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/printNFLP.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/NFLPBreakLoad.js?version=${properties.version}"></script>
<!-- <script type="text/javascript"
	src="../../scripts/nightFill.js?version=${properties.version}"></script> -->
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.min.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?version=${properties.version}"></script>

<script src="../../scripts/table.js?version=${properties.version}"></script>

<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>

</head>
<body>

<input id="workHourManager" type="hidden" value="${properties.NFLPManagerWorkingHours}" />

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%-- <%@include file="header.jsp"%> --%>

			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">NightFill Labour Plan Report</li>
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
		<form action="onPageLoad.htm" id="nightFillLabourPlan" action=""
			method="get">



			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Fill Labour Plan Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter parameterRow">
										<label for="store" class="mandatory">Date</label> <input
											type="#" class="textbox defaultTextbox inputDate"
											id="dateFrom" name="fromDate" value="" >
									</div>
									<!-- End of parameter -->






									<div class="parameter clearfix parameterRow">
										<label>Department</label> <span> <input type="checkbox"
											id="GM" value="gm" name="Departmen" onClick="isCheck(id)"
											checked><label class="labelText" for="GM">General
												Merchandise</label> <input type="checkbox" id="Groceries"
											value="groceries" name="Department" onClick="isCheck(id)"
											checked><label class="labelText paramCheckBox"
											for="Groceries">Groceries </label> <input type="checkbox"
											id="Perishables" value="perishables" name="Department"
											onClick="isCheck(id)" checked><label
											class="labelText" for="Perishables">Perishables</label>
										</span>
									</div>
									<!-- End of parameter -->


									<div class="parameter clearfix parameterRow">
										<label>Include</label> <span> <input type="checkbox"
											name="promo" value="fs" id="FS" onClick="isCheck(id)"
											checked="checked"><label for="FS" class="labelText">Bulk Load
												</label> <input type="checkbox" name="promo" value="promotion"
											id="promo" onClick="isCheck(id)" checked="checked"><label
											for="promo" class="labelText">Articles on promotion</label>
											<input type="checkbox" name="advert" value="advert" hidden="true"
											id="advert" onClick="isCheck(id)" ><label
											for="advert" id="advertLabel" class="labelText"></label>
											<input type="checkbox" name="jobBuy" value="jobBuy" hidden="true"
											id="jobBuy" onClick="isCheck(id)" ><label
											for="jobBuy" id="jobBuyLabel"  class="labelText"></label>
										</span>
									</div>
									<!-- End of parameter -->


									<div class="parameter clearfix parameterRow  parameterOptions ">
										<label for="sourceOfSupply">Source of Supply</label> <span
											class="reportRadio"> <input type="radio" checked=""
											id="all" value="all" name="sourceSupply"><label
											class="labelText" for="all">All</label> <input type="radio"
											id="warehouse" value="warehouse" name="sourceSupply"><label
											class="labelText" for="warehouse">Warehouse</label>
										</span>
										<!-- End of report radio -->

										<input id="deptPerishablesHide" type="hidden" value="" /> <input
											id="deptGroceriesHide" type="hidden" value="" /> <input
											id="deptGMHide" type="hidden" value="" /> <input
											id="bulkIndicatorHide" type="hidden" value="" /> <input
											id="promotionIndicatorHide" type="hidden" value="" />
											<input
											id="advertIndicatorHide" type="hidden" value="" />
											<input
											id="jobBuyIndicatorHide" type="hidden" value="" />

										<div class="parameter parameterOptionsInputBox">

											<span id="allField"> <label class="instructions">All
													warehouse excluding DSD</label><input type="#"
												style="visibility: hidden;" class="textbox">
											</span> <span class="hideBlock" id="warehouseField"> <!-- <input
												type="#" placeholder="Enter warehouse no. or name"
												class="textbox" ID="supplier"> <label
												id="verifySupplier" class="linkBtn"><label
													class="advancedSearch">Verify & Add</label></label> -->


												<ul class="userList parameterOptionsListInline"
													id="usersList">

												</ul>
											</span>


										</div>
										<!-- End of inner parameter -->

									</div>
									<!-- End of parameter -->

									<div id="warehouseSection" class="hideBlock"></div>
																													


									<div class="formActions">
									
										<label class="actionBtn" id="generateReport">Generate
											Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
									</div>
									<!-- End of form actions -->

								</div>
								<!-- End of content table wrapper -->
								<!--  Testing -->
							
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

						<!-- <div class="articleHead">
							<div class="ContentTableWrapper"> -->
						<div class="ContentTableWrapper">
							<div class="articleHead">
								<div class="articleHeaderWrapper">
									<h2 class="articleTitle">Night Fill Labour Plan</h2>
									<p>

										<label class="articlePriceLabel">Hours needed to fill: <strong><label id="hoursFillHead"></label></strong>
										</label> <label class="articlePriceLabel">|</label> <label
											class="articlePriceLabel">Hours in Kronos: <strong><label id="grandTotalHead"></label></strong><label
											class="positiveValue" id="negValue"></label></label>
										 <label class="articlePriceLabel">|</label>
										 <label class="articlePriceLabel">Planned Carton Rate: 
										 <strong><label id="cartonRateHead"></label></strong>
										</label>

									</p>
								</div>
								<!-- End of artcile head wrapper -->

								<div class="articleActionBtns">
									<!-- <label class="actionBtn"><label class="print">Print</label></label>-->
									<label class="actionBtn" id="printBtn"
										onclick="nightFillLabourPlanReportPrint();"><label
										class="print">Print</label></label>
								</div>

							</div>
							<!-- End of Artcile Head -->


							<div class="articleContent orderDetails">

								<div class="articleContentInner">

									<div class="articleDetails">


										<table cellspacing="0" class="" width="100%"
											id="reportSummaryTable">

											<tbody></tbody>
										</table>
									</div>
									<!-- End of article details -->
								</div>
								<!-- End of article content inner -->

							</div>
							<!-- End of article content -->

							<br />
							<div id="filterTabs">
								<ul>

									<li><a href="#tabs-1">Labour Hours by Tasks</a></li>
									<li><a href="#tabs-2">KRONOS Rosters</a></li>
								<!-- 	<li><a href="#tabs-3">KRONOS Rosters (Error Sample)</a></li> -->

								</ul>
								<div id="tabs-1">


									<table cellspacing="0" class="ContentTable" id="breakLoadTable">

										<thead>


											<tr>
												<th>&nbsp;</th>
												<th class="numberColumn columnDivider">No. of Cartons</th>
												<!-- <th class="numberColumn columnDivider">Carton Rate</th>  --> <!-- SC-448 -->
												<th class="numberColumn columnDivider">No. of Hours</th>
												<th class="numberColumn columnDivider">No. of Excess
													Cartons</th>      <!-- SC-448 -->
												<th class="numberColumn lastColumn columnDivider">No. of Hours for
													Excess Cartons</th>

											</tr>

										</thead>
										<tbody>
											<!-- <tr>
									<td colspan="6" class="rowSection rowHighlight">Break Load (Sort and split)</td>
								</tr>
								<tr>						
									<td class="">General Merchandise</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>									
								<tr>						
									<td class="">Groceries  </td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>
								<tr>						
									<td class="">Perishables</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>	
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
																	
									<td class="numberColumn lastColumn valueInfo" colspan="2"> </td>
								</tr>	
								
								
								
								
								

								<tr>
									<td colspan="6" class="rowSection rowHighlight">Drop / Run Cartons on shop floor</td>
								</tr>
								<tr>						
									<td class="">General Merchandise</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>									
								<tr>						
									<td class="">Groceries  </td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>
								<tr>						
									<td class="">Perishables</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
																	
									<td class="numberColumn lastColumn valueInfo" colspan="2"> </td>
								</tr>									
								
								
								
								
								
								<tr>
									<td colspan="6" class="rowSection rowHighlight">Filling / Packing</td>
								</tr>							
								<tr>						
									<td class=""><strong>Aisle 1:</strong> General Merchandise </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 2:</strong> General Merchandise </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 3:</strong> General Merchandise  </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								
								<tr>						
									<td class=""><strong>Aisle 4:</strong> General Merchandise, Groceries</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 5:</strong> General Merchandise, Groceries  </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 6:</strong> Groceries</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 7:</strong> Groceries </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 8:</strong> Groceries </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 9:</strong> Groceries, Perishables </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 10:</strong> Perishables </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 11:</strong> Perishables </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 12:</strong> Perishables </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>								
									<td class="numberColumn lastColumn valueInfo"> xx</td>
								</tr>
								
								
								
								
								<tr>
									<td colspan="6" class="rowSection rowHighlight">Rubbish Removal</td>
								</tr>
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
																	
									<td class="numberColumn lastColumn valueInfo" colspan="2"> </td>
								</tr>	
								
								
								
								<tr>
									<td colspan="6" class="rowSection rowHighlight">Presentation</td>
								</tr>
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
																	
									<td class="numberColumn lastColumn valueInfo" colspan="2"> </td>
								</tr>	
								
								
								
								<tr>
									<td class="rowSection rowHighlight">Total Night Fill Tasks</td>
									<td class="rowSection numberColumn rowHighlight columnDivider">xxx</td>
									<td class="rowSection numberColumn rowHighlight columnDivider">xxx</td>
									<td class="rowSection numberColumn rowHighlight columnDivider">xxx</td>
									<td class="rowSection rowHighlight"></td>
									<td class="rowSection rowHighlight"> </td>
								</tr>
								
								 -->

										</tbody>
									</table>


								</div>
								<!-- End of tabs -1 -->




								<div id="tabs-2">


									<table cellspacing="0" class="ContentTable" id="kronosTable">
										<thead>
											<tr>								<!-- SC-448 -->
												<th colspan="5" class="centerValue lastColumn columnDivider"
													width="67%">Night Fill Team</th>
												<!-- <th rowspan="2" class="centerValue columnDivider blankCell" width="6%">&nbsp;</th> -->
												<!-- <th colspan="2" class="centerValue"  width="27%">Suggested Available Staff</th>-->
											</tr>
											<tr class="subHeader">
												<th width="20%">Employee</th>
												<th width="20%" class="">Employee Status</th>
												<th width="20%" class="">Shift Time</th>
												<th width="20%" class="">Work Hours</th>
																					<!-- SC-448 -->
												<th width="20%" class="numberColumn lastColumn" colspan="2">Non
													Night Fill Hours</th>
												<!-- <th>Employee</th>												
												<th class="centerValue lastColumn">Time</th> -->
											</tr>
										</thead>

										<tbody></tbody>

									</table>


								</div>
								<!-- End of tabs - 2 -->

								<!-- <div id="tabs-3">
									<div class=" errorDiv">
										<h4>We are facing technical issues to retrieve KRONOS
											Rosters information, please try again later.</h4>
									</div>
								</div> -->
								<!-- End of tabs 3 -->




							</div>
							<!-- End of tabs -->

						</div>
					</div>
					<!-- End of Content Table Wrapper-->



				</div>
				<!-- end of report info -->

			</div>
			<!-- End of article Additional Info -->

			<!-- 
			</div>
			End of content wrapper

</div> -->
		</form>
		<input id="navBarHighlight" type="hidden" value="reports" />
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



	<div id="printData" class="hideBlock">
		<div id="printbody"></div>
		<div class="hideBlock">
			<label class="siteNoName">${user.siteNo} | ${user.siteName}</label><label
				class="depPrint"></label><label class="catPrint"></label><label
				class="scPrint"></label><label class="segPrint"></label> <label
				class="artPrint"></label><label class="artPrint"></label> <label
				class="supPrint"></label><label class="supPrint"></label>
		</div>
	</div>
	<div id="printBulkOrdersData" class="hideBlock">
		<div id="printBulkOrdersbody"></div>
		<div class="hideBlock">
			<label class="siteNoName">${user.siteNo} | ${user.siteName}</label><label
				class="depPrint"></label><label class="catPrint"></label><label
				class="scPrint"></label><label class="segPrint"></label> <label
				class="artPrint"></label><label class="artPrint"></label> <label
				class="supPrint"></label><label class="supPrint"></label>
		</div>
	</div>
	<div id="dialog-modal" title="Markdown Details Report">
		<div class="popupContent">

			<div class="popupData">


				<h4 class="alertText" id="alertBox"></h4>



				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						onmousedown="$( '#dialog-modal' ).dialog( 'close' );" id="okBtn">OK</label>
					</span>
				</div>
				<!-- End of popup actions-->



			</div>
		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-supplier-verify" title="Verify Supplier">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>Supplier Name:</h3>
				<input type="#" placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDesc"> <label
					class="actionBtn" id="goButtonSample1">Go</label>
			</div>
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDiv"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>

		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-article-search" title="Article Search">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>Article Search:</h3>
				<input type="#" placeholder="Enter Article"
					class="textbox textboxDefaultText" id="articleNoName"> <label
					class="actionBtn" id="goButtonSample2">Go</label>
			</div>
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDivArticle"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- <div id="dialog-modal1" title="Article search">
						<div class="popupContent">

							<div class="popupData">
							
							
								<h4 class="alertText" id="alertBox">There is no article to be
										received. Cannot finalize the order.</h4>
								
								Commented by Haresh
								<div class="ContentTableWrapper popMessage">

									<label id="alertBox">There is no article to be
										received. Cannot finalize the order</label>

								</div>
								 End of content table wrapper

							</div>
							End of pop up data
							<div class="popupData">
							
								<div class="popupActionsWrapper">
									<span class="popupActions">
										<label class="actionBtn" id="okBtn">OK</label>
									</span>
								</div> End of popup actions
							
							
									 Commented by Haresh 
								<span class="popMessageBtnWrapper"> <label
									class="actionBtn popMessageBtn" id="okBtn">OK</label>
								</span>
								
								

							</div>
						</div>
						End of popupContent
					</div> -->
</body>
<script>
	function isCheck(id) {
		var isChecked = $('#' + id).attr('checked') ? true : false;
		if (isChecked)
			$('#' + id).removeAttr('checked');
		else
			$('#' + id).attr('checked', 'checked');
	}
</script>
</html>
