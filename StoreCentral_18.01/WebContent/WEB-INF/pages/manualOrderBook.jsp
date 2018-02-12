<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Manual Order Book Report</title>



<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/slider.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/manualOrderBook.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery-barcode-last.min.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>


<script type="text/javascript"
	src="../../scripts/JsBarcode.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/ITF14.js?version=${properties.version}"></script>




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
						<li class="currentPage">Manual Order Book Report</li>
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
		<form method="POST" action="" id="manualOrderBookReportPdf"></form>
		<form action="manualOrderBook.htm" id="orderBook" method="get">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion" class="ui-accordion ui-widget ui-helper-reset"
						role="tablist">

						<h3
							class="mainAccordion ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active ui-corner-top"
							role="tab" id="ui-accordion-accordion-header-0"
							aria-controls="ui-accordion-accordion-panel-0"
							aria-selected="true" tabindex="0">
							<span
								class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>
							Generate Manual Order Book Report
						</h3>
						<div
							class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active"
							id="ui-accordion-accordion-panel-0"
							aria-labelledby="ui-accordion-accordion-header-0" role="tabpanel"
							aria-expanded="true" aria-hidden="false" style="display: block;">
						<input type="hidden"  id="depName" class="depName" name="depName">
						<input type="hidden"  id="catName" class="catName" name="catName">
						<input type="hidden"  id="subcatName" class="subcatName" name="subcatName">

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="hierarchyWrapper clearfix" id="articleHierarchy">

										<div class="hierarchyContent" id="deptDiv">

											<div class="hierarchyTitle">
												<h3>Department</h3>
											</div>
											<!-- End of hierarchy Title -->

											<div class="hierarchyList">

												<ul id="deptlst">
													<c:if test="${not empty model.deptInfoList}">
														<%
								int j = 1;
							%>
														<c:forEach items="${model.deptInfoList}" var="deptInfo">

															<input type="hidden" id="child<%=j%>"
																value="${deptInfo.childExists}">
															<c:if test="${deptInfo.level=='1'}">


																<li><input class="department" type="radio"
																	name="departmentList" value="${deptInfo.node}"
																	data-tt-id="<%=j%>" id="${deptInfo.node}"> <label
																	for="${deptInfo.node}" class="labelText">${deptInfo.nodeDesc}</label></li>
														
															</c:if>
															<%
									j++;
								%>
														</c:forEach>

													</c:if>
												</ul>
											</div>
											<!-- End of hierarchy Title -->
											<div class="heirachyBottom">
												<span class="totalCount"> <label>Total:<strong
														id="deptLstCnt"></strong></label>
												</span>

											</div>
											<!-- End of hierarchy bottom -->

										</div>
										<!-- End of hierarchy Content -->


										<!-- Category -->
										<div class="hierarchyContent" id="catDiv">

											<div class="hierarchyTitle">
												<h3>Category</h3>
											</div>
											<!-- End of hierarchy Title -->

											<div class="hierarchyList">

												<div class="noSelection" id="noSelectionCat">
													<label>Please select any department to see it's
														associated categories.</label>
												</div>
												<!-- End of no selection -->

												<label class="loading hideBlock">&nbsp;</label>

												<ul id="categoryLst" class="hideBlock">
													<li class="category"></li>
												</ul>
											</div>
											<!-- End of hierarchy Title -->

											<div class="heirachyBottom">
												<span id="categoryLstTotal" class="totalCount hideBlock">
													<label>Total:<strong id="categoryLstCnt"></strong></label>
												</span>
											</div>
											<!-- End of heirachy bottom -->

										</div>
										<!-- End of hierarchy Content -->
										<!-- Sub-category -->
										<div class="hierarchyContent" id="subCatDiv">

											<div class="hierarchyTitle">
												<h3>Sub-category</h3>
											</div>
											<!-- End of hierarchy Title -->

											<div class="hierarchyList">

												<div class="noSelection" id="subCat">
													<label>Please select any category to see
														sub-categories.</label>
												</div>
												<!-- End of -->

												<label class="loading hideBlock">&nbsp;</label>

												<ul class="hideBlock" id="subCategoryLst">
												</ul>
											</div>
											<!-- End of hierarchy Title -->

											<div class="heirachyBottom">
												<span id="subCatTotal" class="totalCount hideBlock">
													<label>Total:<strong id="subTotal"></strong></label>
												</span> <span class="heirachyAction hideBlock"> <!-- 	<label class="actionBtn">Go</label> -->
												</span>
											</div>
											<!-- End of heirachy bottom -->

										</div>
										<!-- End of hierarchy Content -->

										<!-- End of hierarchy Content -->


									</div>
									<!-- end of hierarchy Wrapper -->



									<div class="formActions">
										<label class="actionBtn" id="generateReport">Generate
											Report</label> <label class="actionBtn priBtn" onclick="showPrint()">
											<label class="print">Print</label>
										</label> <label class="secondaryActionBtn" id="closeLink"
											onclick="$('.ui-accordion-header').click();">Close</label>
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
					<div id="reportContent" class="hideBlock"></div>
					<!-- end of report info -->

				</div>
				<!-- End of article Additional Info -->


			</div>
			<!-- End of content wrapper -->
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
				class="scPrint"></label><label class="segPrint"></label>
		</div>
	</div>
</body>
</html>
