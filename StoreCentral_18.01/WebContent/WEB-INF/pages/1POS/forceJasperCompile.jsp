<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Force Jasper Compile</title>





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
<link href="../../styles/NewScroll.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/common_1pos.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/forceJasperCompile.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.min.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.highlights.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>




</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="../header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Force Jasper Compile</li>
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
		<form action="onPageLoad.htm" id="forceJasperCompile" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Force Jasper Compile</h3>
						<div>


							<div class="formWrapper">

								<div class="parameter parameterRow">
									<label for="store">Jasper User</label> 
									<input type="#"	class="textbox defaultTextbox" name="jaspUser" id="jaspUser">
									<label for="store">Jasper Password</label> 
									<input type="password"	class="textbox defaultTextbox" name="jaspPwd" id="jaspPwd">
									
								</div>

								<div class="formActions">
									<label class="actionBtn" id="forceComp">Compile
										Reports</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->


						</div>
						<!-- End of div for jQuery handling -->


					</div>
					<!-- End of ui-accordion -->
					<div class="JasperCompileRpt">
						<div id="jasperTxt"></div>
					</div>
					
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

					<div id="reportContentBoth" class="hideBlock">


						<div class="ContentTableWrapper hideBlock">

							<div class="tableInfo">

								<div class="tableTitle">
									<h4 class="sectionTitle"></h4>
								</div>
								<!-- End of table title -->


								<div class="tableActionBtns">
									<label class="actionBtn" onclick="ageVerifDetlPrintJasper();"><label
										class="print">Print</label></label>
								</div>
								<!-- End of table action buttons -->


							</div>
							<!-- End of table info -->




							<div class="tableActionsBtnsWrapper filterBoth">
								<div class="lookupActionWrapper">
									<!-- <label class="linkBtn">Filter</label>
								<input type="search" id="posFilter" onsearch="showPOSSearch()"
								 class="textbox textboxDefaultText filterText" placeholder="Enter some keyword"> -->
									<label class="linkBtn " id="posFilterOpenBoth"> <label
										class="filterBoth filter">Apply Filters</label>
									</label> <label class="linkBtn hideBlock" id="posFilterClearBoth">
										<label class="negativeFlag">Clear Filters</label>
									</label>

								<!-- <div class="parameter clearfix parameterRow selectType">
									<label>Select</label> <span> <input type="radio"
										name="selectType" value="POS" id="pos"><label
										for="pos" class="labelText paramCheckBox">POS </label> <input
										type="radio" name="selectType" value="SCO" id="sales"><label
										for="sales" class="labelText">SCO</label> <input type="radio"
										name="selectType" value="Both" id="both" checked><label
										for="both" class="labelText">Both</label> <span>
								</div> -->
									<div class="void-type-radio">
										<label>Select :</label><span> <input type="radio"
											name="selectType" value="Approved" id="approved"><label
											for="approve" class="labelText paramCheckBox">Approved</label>
											<input type="radio" name="selectType" value="Rejected" id="rejected"><label
											for="reject" class="labelText">Rejected</label> <input
											type="radio" name="selectType" value="Both" id="both"
											checked><label for="all" class="labelText">Both</label>
										</span>
									</div>

									<div class="paginationWrapper  paginationDiv paginationDivBoth"
										id="paginationDiv1">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
									<!-- Should work like this http://sunnywalker.github.io/jQuery.FilterTable/filtertable-sample.html -->


								</div>
								<!-- End of lookup action wrapper -->
							</div>
							<!-- end of tableActionsBtnsWrapper -->

							<input type="hidden" id="ageVerificationDetailsAttr" name="ageVerificationDetailsAttr" />
							<table cellspacing="0"
								class="sortTable ContentTable pagenationCallbackClass tableSorter tbl-print typeBoth"
								id="treeTableBothType" data-user_id="paginationDivBoth">

								<thead>


									<tr>
										<th class="centerValue" style="padding-right: 30px;" sortAttr="date" sortDataType="date">Date</th>
										<th class="centerValue" sortAttr="cashierName" sortDataType="string">POS Operator <br />Name
										</th>
										<th class="centerValue" sortAttr="transactionNumber" sortDataType="long">Trans. #</th>
										<th class="centerValue" sortAttr="time" sortDataType="time">Time
										</th>
										<th class="centerValue" sortAttr="posNumber" sortDataType="int">POS ID #
										</th>
										<th class="centerValue" sortAttr="ageVerificationDateKeyed" sortDataType="java_date">Age Verification Date <br /> Keyed
										</th>
										<th class="centerValue" sortAttr="ageVerificationResult" sortDataType="string">Age Verification Result
										</th>
										<!-- <th class="centerValue" sortAttr="ofeftTransaction" sortDataType="double">% of EFT <br />Transaction
										</th>
										<th class="centerValue lastColumn" sortAttr="otherTenderTransaction" sortDataType="double">% of Other Tender <br />Transaction
										</th>  -->
									</tr>

								</thead>
								<tbody>

								</tbody>
								
								<tr class="totVal hideBlock">
									<td class="columnDivider valueInfo storeNdsub " colspan="3">Total Age Verification Dates Keyed</td>
								<!-- <td class="numberColumn valueInfo "></td>
									<td class="numberColumn valueInfo "></td> -->
									<td class="numberColumn valueInfo "></td>
									<td class="numberColumn valueInfo "></td>
									<td class="numberColumn valueInfo ageKeyed"></td>
									<td class="numberColumn valueInfo "></td>
									<!-- <td class="numberColumn valueInfo "></td>
									<td class="numberColumn lastColumn valueInfo "></td> -->
								</tr>
							</table>
							<!-- </div>
					</div> -->
							<div
								class="paginationWrapper bottomPagination paginationDiv paginationDivBoth"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>

					</div>
					<!-- End of Tabs -->
				</div>
				<!-- End of content table wrapper -->


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
	<%@include file="../footer.jsp"%>






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
				class="scPrint"></label><label class="segPrint"></label>
		</div>
	</div>
</body>
</html>
