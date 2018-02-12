<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<title>SUGO Review Report</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet" 	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet" 	type="text/css" />
<link href="../../styles/NewScroll.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet" 	type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet" 	type="text/css" />
<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" 	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>
<script type="text/javascript" 	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/SUGOReviewReport.js?version=${properties.version}"></script>
<script type="text/javascript" 	src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript" 	src="../../scripts/jquery.tablesorter.min.js?version=${properties.version}"></script>
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
						<li class="currentPage">SUGO Review Report</li>
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
						<h3 class="mainAccordion">Generate SUGO Review Report</h3>
						<div>
							<form method="POST" action="" id="">
								<div class="formWrapper">
									<div class="parameter parameterRow">
										<label for="store" class="">Delivery Date :</label> <output
											type="#" class="  "
											id="dateFrom" name="fromDate" value="" readonly="readonly" >
									</div>
									<div class="formActions">
									
										<label class="actionBtn" id="generateReport">Generate
											Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
									</div>
									<!-- End of form actions -->
								</div>
							</form>
						</div>

					</div>
					<!-- End of ui-accordion -->
					<div class="ContentTableWrapper ContentTableWrapperError hideBlock">
						<div class="tableInfo tableInfoError  tableStart">
							<div class="tableTitle  errorDiv" id="errorMsgDiv">
								<h4 id="errorMsg">
									<c:if test="${not empty noResults}">${noResults}</c:if>
								</h4>
								<!-- End of table title -->
							</div>
						</div>
					</div>
					<div id="reportContent">
						<div class="ContentTableWrapper">
							<div class="articleHead">
								<div class="articleHeaderWrapper">
									<p>
										<label class="articlePriceLabel">Delivery date: <strong><label id="deliveryDate">24/08/2015</label></strong></label> 
										<label class="articlePriceLabel">|</label>
										<label class="articlePriceLabel">Review by Time: <strong><label id="reviewByTime">5.10 PM</label></strong></label> 
										<label class="articlePriceLabel">|</label>
										<label class="articlePriceLabel">Roster Date: <strong><label id="rosterDate">24/08/2015</label></strong></label> 
									</p>
								</div>
								<!-- End of artcile head wrapper -->
							</div>
							<br/>
							<div id="filterTabs">
								<div id="tabs-1">
								
									<div class="tableInfo">
										<div class="tableTitle">
												<input type="hidden" id="recordListFlag" value="1">
												<h4>
													Total <strong id="totalRecords">355</strong> results found 								</h4>
										</div>
								<!-- End of table title -->
									<div class="sugoPaginationArea" style="float: right;"></div>
									</div>
									<table cellspacing="0" class="ContentTable" id="breakLoadTable">
										<thead>
											<tr>
												<th rowspan="2" class=" columnDivider">Supplier</th>
												<th rowspan="2" class=" columnDivider">Article#</th>
												<th rowspan="2" class=" columnDivider">Article </br>UOM</th>
												<th rowspan="2" class=" columnDivider">Article Description</th>
												<th rowspan="2" class="numberColumn columnDivider">OM</th>
												<th rowspan="2" class="numberColumn columnDivider">SOO/SIT</th>
												<th rowspan="2" class="numberColumn columnDivider">MPL</th>
												<th colspan="2" class="centerValue columnDivider">SUGO Qty.</th>
												<th colspan="2" class="centerValue columnDivider">Order Qty.</th>
											</tr>
											<tr>
												<th class="numberColumn columnDivider">Qty. 1</th>
												<th class="numberColumn columnDivider">Qty. 2</th>
												<th class="numberColumn columnDivider">Qty. 1</th>
												<th class="numberColumn columnDivider">Qty. 2</th>
											</tr>
										</thead>
										<tbody id="searchResults">
											<tr>						
												<td class="">General Merchandise</td>
												<td class="numberColumn columnDivider">xxx</td>
												<td class="numberColumn columnDivider">xxx</td>
												<td class="columnDivider">xxx</td>
												<td class="numberColumn columnDivider">xxx</td>
												<td class="numberColumn columnDivider">xxx</td>
												<td class="numberColumn columnDivider">xxx</td>
												<td class="numberColumn columnDivider">xxx</td>
												<td class="numberColumn columnDivider">xxx</td>
												<td class="numberColumn columnDivider">xxx</td>
												<td class="numberColumn columnDivider">xxx</td>
											</tr>			
										</tbody>
										<tfoot>
										<tr>
											<td colspan="11" ><div class=" sugoPaginationArea hideBlock" style="float: right;"></div></td>
										</tr>
										</tfoot>
									</table>
								</div>
								<!-- End of tabs -1 -->
							</div>
							<!-- End of tabs -->
						</div>
					</div>
					<!-- End of Content Table Wrapper-->
				</div>
				<!-- end of report info -->
			</div>
			<!-- End of article Additional Info -->
		</form>
		<input id="navBarHighlight" type="hidden" value="reports" />
	</div>  
	<%@include file="footer.jsp"%>
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
