<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Service Requests</title>



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
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.jWizard.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/printRepairs.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/repair-Lookup.js?version=${properties.version}"></script>
<link href="../../styles/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />


</head>
<body ng-app="myapp">
<form id="tobacco" method="get">

<input type="hidden" value="${total}" id="total" />

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li>Pricing </li>
						<li class="lookup currentPage">Tobacco Pricing</li>
						
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper hideBlock">
					<span><label class="loading hideBlock" id="statusImg">We
							are getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label></span>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->



<div class="contentWrapper ">
		<div class="ContentTableWrapper">
			
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4 class="sectionTitle simpleMargin ">Tobacco Price Board</h4>
					</div> <!-- End of table title -->
					
				
							<div class="tableActionBtns">
								<label class="actionBtn" onclick="tobaccoPricingPrint();"><label
									class="print">Print</label></label>
							</div>
				</div> <!-- End of table info -->
				
				
				
					<table cellspacing="0" class="ContentTable2 treetable" data-user_id="paginationDivMarkdown"  id="sortTable">
						
						<thead> 
						<tr>					
							<th>BRAND</th>
							<th>SIZE</th>
							<th>PACK</th>
							<th>CARTON</th>					
						</tr>	
						</thead>
						<tbody>
									 <c:forEach  var="report" items="${tobaccoPricings}">
												
												<tr class="itms">
													<td><c:out value="${report.brand}" /></td>
													<td><c:out value="${report.size}" /></td>
													<td><c:out	value="${report.pack}" /></td>
													<td><c:out value="${report.carton}" /></td>
												</tr>
									</c:forEach>
						</tbody>
						
													
					</table>
					
				
				
				
								<div class="pagination-page simpleMargin">
									</div>
				
				</div>
				
				
			</div>	
			
			</div> 
		<!-- End of content table wrapper -->
	
	</div>




	
	<!-- <div id="printDataForCtnLbl" class="hideBlock">
		<div id="printbodyForCtnLbl" class="printbody"></div>
	</div>
	<div id="printDataForRemLtr" class="hideBlock">
		<div id="printbodyForRemLtr" class="printbody"></div>
	</div>
	<div id="printDataForSerOdr" class="hideBlock">
		<div id="printbodyForSerOdr" class="printbody"></div>
	</div> -->
	</form>
</body>



<script>
var recordCount = $('#total').val();
var currentPage = 1;
jQuery(function($) {
    // consider adding an id to your table,
    // just incase a second table ever enters the picture..?
 	var items = $(".itms");

    var numItems = items.length;
    var perPage = 10;

    // only show the first 2 (or "first per_page") items initially
    items.slice(perPage).hide();

    // now setup your pagination
    // you need that .pagination-page div before/after your table
    $(".pagination-page").pagination({
        items: recordCount,
        itemsOnPage: 10,
        cssStyle: "compact-theme simple-pagination",
        onPageClick: function(pageNumber) { // this is where the magic happens
            // someone changed page, lets hide/show trs appropriately
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;

            items.hide() // first hide everything, then show for the new page
            .slice(showFrom, showTo).show();
        }

    
    });

});

function tobaccoPricingPrint(){
	$("#tobacco").attr("action","tobaccoPagePrint.htm");
	$("#tobacco").attr("target","_blank");
	$("#tobacco").submit();
}

</script>

</html>
