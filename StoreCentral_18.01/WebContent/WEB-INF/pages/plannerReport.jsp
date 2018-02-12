<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>

<title>Production Planner Report</title>
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

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/plannerReport.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>

<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<style type="text/css">
/* popup_box DIV-Styles*/
#popup_box { 
    display:none; /* Hide the DIV */
    position:fixed;  
    _position:absolute; /* hack for internet explorer 6 */  
    height:100px;  
    width:200px;  
    background:#FFFFFF;  
    left: 300px;
    top: 150px;
    z-index:0; /* Layering ( on-top of others), if you have lots of layers: I just maximized, you can change it yourself */
    margin-left: 15px;  
    /* additional features, can be omitted */
    border:2px solid #ff0000;      
    padding:15px;  
    font-size:15px;  
    -moz-box-shadow: 0 0 5px #ff0000;
    -webkit-box-shadow: 0 0 5px #ff0000;
    box-shadow: 0 0 5px #ff0000;
}
/* This is for the positioning of the Close Link */
#popupBoxClose {
    font-size:20px;  
    line-height:15px;  
    right:5px;  
    top:5px;  
    position:absolute;  
    color:#6fa5e2;  
    font-weight:500;      
}
</style>   

</head>
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
						<li>Reports</li>
						<li class="currentPage">Planner Report</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label id="statusImg" class="loading hideBlock">We are
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
					<h3 class="mainAccordion">Generate a Production Planner Report
					</h3>
					<div>
						<form:form method="post"  id="plannerDetailsFetch" >
							<input type="hidden" name="siteNo" id="siteNo"
								value="${user.siteNo}" /><input type="hidden"
								name="hierarchyText" id="hierarchyText" value="" /> <input
								type="hidden" name="hierarchySearchValue"
								id="hierarchySearchValue" value="" /><input type="hidden"
								name="salesOrg" id="salesOrg" value="${user.salesOrg}" /> <input
								type="hidden" id="listCount" name="listCount"
								value="${model.param.recordCount}" /> <input type="hidden"
								id="pageNumber" name="pageNumber"
								value="${model.param.pageNumber}" /> <input type="hidden"
								id="option" value="${model.param.option}" /> <input
								type="hidden" id="index" name="index" /> <input type="hidden"
								id="iv_parent_node" name="iv_parent_node" /> <input
								type="hidden" id="deptIndex" name="deptIndex" /> <input 
								type="hidden" id="siteDistrict" name="siteDistrict" 
								value="${user.district}">
								
								<input type="hidden"
								id="categoryList" name="categoryList" />
								<input type="hidden"
								id="updateFlag" name="updateFlag" />
								<input type="hidden"
								id="requiredQty" name="requiredQty" />
							<div class="formWrapper">
								<div class="parameter">
									<label for="department">Planner Type</label> <select
										class="selectOptions" name="department" id="departmentId" onchange="disableWeekly(this.value);">
											<option value="MEAT">Meat</option>
											<option value="BAKERY">Proprietary Bakery</option>
											<option value="CHICKEN">Hot Food</option>
											<option value="MINCE">Mince</option>
											<option value="BAKERY DOUGH">Bakery Dough Calculator</option>
											<!-- <option value="SEAFOOD">Seafood</option> -->
											<option value="BAKERY THAW">Proprietary Thaw</option>
									</select>
								</div>
								<!-- End of parameter -->
								<div class="parameter">
									<label for="article" class="">Article</label> <input type="#"
										class="textbox articleSearchText" id="article" name="article"
										placeHolder="Search article by" tabindex="1">
									<div class="searchByOptions">
										<input type="radio" checked="" id="number" value="number"
											name="searchByOptions"><label class="labelText"
											for="number">Number</label> <input type="radio"
											id="description" value="description" name="searchByOptions"><label
											class="labelText" for="description">Description</label> <input
											type="radio" id="reference" value="reference"
											name="searchByOptions"><label class="labelText"
											for="reference">EAN/TUN/PLU</label>
									</div>
								</div>
								<!-- End of parameter -->
								<div class="parameter parameterOptions parameterAlign clearfix">
									<label for="store">Schedule</label> <span
										class="parameterOptionsRadio"> <input type="radio"
										name="schedule" value="daily" id="daily" checked><label
										for="daily" class="labelText">Daily</label> <input
										type="radio" name="schedule" value="weekly" id="weekly"><label
										for="weekly" class="labelText">Weekly</label>

									</span>
									<div class="parameter parameterOptionsInputBox">
										<span id="dailySelect"> <select class="selectOptions"
											id="inputDay" name="inputDay" disabled="disabled">
												<option selected="selected">${model.param.day}</option>
										</select>
										<select class="selectOptions"
											id="inputBakeryDay" name="inputBakeryDay" style ="display:none">
											<c:forEach var="plannerDateParam" items="${model.param.plannerDateParamList}">
												<option value="${plannerDateParam.day}-${plannerDateParam.date}">${plannerDateParam.day}, ${plannerDateParam.date}</option>
											</c:forEach>
										</select>
										</span> <span id="weeklySelect" class="hideBlock"> <select
											class="selectOptions" id="inputWeek" name="inputWeek">
												<option value="CURRENT">Current Week</option>
												<option value="NEXT">Next Week</option>
										</select>
										</span>
										<!-- <span id="singlePOS">
												<input type="#" name="dateFrom" class="textbox defaultTextbox inputDate" id="dateFrom">												
											</span>	 -->

									</div>
									<!-- End of parameter -->
								</div>
								<!-- End of parameter -->
									
									<div class="parameter bakeryDoughDiv hideBlock">
												<label for="category" id="category">Category</label>
												<div id="bakeryCategoryDrpDwnDiv" class="selectDropdown ">
												<label id="bakeryCategoryDrpDwnActiveId" class="selectLabel"><a id="bakeryCategoryDrpDwnLabel">Select Category</a></label>
														<ul class="dropdown" id="bakeryCategoryDrpDwnUl">
															<div class="planner-inner-drop-down hierDrp">
															<li class="allChkLi"><input type="checkbox" id="allCatChkBox" name="allCatChkBox"><label class="dropdownLabel" for="allCatChkBox">All Categories</label></li>
															</div>
															<li class="selectDropdownActions"><label id="bakeryCategoryDrpDwnDone" class="actionBtn"><a>Done</a></label><label id="bakeryCategoryDrpDwnCancel" class="secondaryActionBtn"><a>Cancel</a></label></li><!-- for defect 14744 -->
															</ul>
															</div>
												
											</div>
								<!-- End of parameter -->

								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="actionBtn"><label class="print">Print</label></label>
									<label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
						</form:form>

					</div>
					<!-- End of div for jQuery handling -->

				</div>
				<!-- End of ui-accordion -->

				<!-- For displaying report results -->
				<div class="ContentTableWrapper ContentTableWrapperError hideBlock">
					<div class="tableInfo tableInfoError  tableStart">
						<div class="tableTitle  errorDiv" id="errorMsgDiv">
							<h4 id="errorMsg">${noData}</h4>
						</div>
					</div>
				</div>
				<div id="reportContent" class="reportContent">	
				</div>
					<div id="dialog-saveChanges" title="Save Changes" style="display: none;">
						<div class="popupContent">
							<div class="popupData">
								<h4 class="alertText">Do you want to save the changes?</h4>
								<div class="popupActionsWrapper">
									<label class="secretPopMsg"></label> <span class="popupActions">
										<label class="actionBtn passwordExpiredOkBtn" id= "okbtn">Ok</label>
										<label class="secondaryActionBtn" id="cancelbtn">Cancel</label>
									</span>
								</div>
								<!-- End of popup actions-->
							</div>
							<!-- End of pop up data -->
						</div>
						<!-- End of popupContent -->
</div>
			</div>
		</div>
		<!-- End of article Additional Info -->
	</div>
	<!-- End of content wrapper -->
	<input id="navBarHighlight" type="hidden" value="reports" />
	<%@include file="footer.jsp"%>
	<div id="printData" class="hideBlock">
		<div id="printTable"></div>
	</div>
	<script>
$( "#dialog-saveChanges" ).dialog({				
	autoOpen: false,
	modal: true,
	resizable: false,
	minHeight: 100,
	maxHeight: 600,
	width: 400
});
$("#dialog-saveChanges").parent().addClass("popupWrapper");
</script>
</body>
</html>