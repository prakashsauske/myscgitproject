<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Markdown Details and Summary Report</title>



<link href="../../styles/jqueryUI.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<%-- <link href="../../styles/NewScroll.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" /> --%>
<link href="../../styles/${user.imgLocation}.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />

<link href="../../styles/simplePagination.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/slider_1POS.css?${properties.CachedCssAndJsFilesVersion}" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?${properties.CachedCssAndJsFilesVersion}"></script>

<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/1POS/script/common_1pos.js?${properties.CachedCssAndJsFilesVersion}"></script>	
<script type="text/javascript"
	src="../../scripts/1POS/script/markdownDetails.js?${properties.CachedCssAndJsFilesVersion}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?${properties.CachedCssAndJsFilesVersion}"></script>
<!-- <script type="text/javascript"
	src="../../scripts/jquery.tablesorter.min.js?${properties.CachedCssAndJsFilesVersion}"></script> -->
<script type="text/javascript" src="../../scripts/jquery.filtertable.js?${properties.CachedCssAndJsFilesVersion}"></script>

<script src="../../scripts/table.js?${properties.CachedCssAndJsFilesVersion}"></script>

<script type="text/javascript" src="../../scripts/date-formatter.js?${properties.CachedCssAndJsFilesVersion}"></script>

</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%-- <%@include file="header.jsp"%> --%>

			<%@include file="../header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Markdown Details Report</li>
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
		<form action="onPageLoad.htm" id="markdownDetails" action=""
			method="get">



			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Markdowns Report</h3>
						<div>

							<form method="POST" action="" id="">
								<div class="formWrapper">

									<div class="parameter parameterRow">
										<label for="store">Date</label> <input type="#"
											class="textbox defaultTextbox inputDate" name="dateFrom"
											id="dateFrom"> to <input type="#"
											class="textbox defaultTextbox inputDate" name="dateTo"
											id="dateTo"> <input type="hidden" id="dateFromHide"
											name="dateFromHide" /> <input type="hidden" id="dateToHide"
											name="dateToHide" />
									</div>
									<!-- End of parameter -->

									<div class="parameter clearfix">
										<label for="department" title="${properties.Department}">Department</label>
										<select class="selectOptions" id="department_1pos"
											name="department">
											<option value="Select">Select Department</option>
											<c:forEach items="${model.deptInfoList}" var="deptInfo">
												<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
											</c:forEach>

										</select>
										<div class="searchByOptions onlyCheckbox">
											<input type="checkbox" name="depH" value="depH" id="depH"><label
												for="depH" class="labelText">Select Sub-Category
												from Hierarchy</label>
										</div>
										<!-- End of search options -->

								<input type="hidden" name="departmentHide" id="departmentHide"/>
									</div>
									<!-- End of parameter -->


									<input type="hidden" class="hierarchyname" id="hierarchyname"
										value="" />
									<div class="hierarchyWrapper clearfix hideBlock"
										id="articleHierarchy">

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
															<input type="hidden" id="hdnDepLst" name="hdnDepLst" value="">

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
											<input type="hidden" name="categoryListHdn" value="" id="categoryListHdn"/>
											<input type="hidden" name="subCategoryListHdn" value="" id="subCategoryListHdn"/>
											<input type="hidden" name="segmentListHdn" value="" id="segmentListHdn"/>
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
										<!-- Segment -->
										<div class="hierarchyContent lastContent" id="segDiv">

											<div class="hierarchyTitle">
												<h3>Segment</h3>
											</div>
											<!-- End of hierarchy Title -->



											<div class="hierarchyList">

												<div class="noSelection" id="segment">
													<label>Please select any sub-category to see
														segments.</label>
												</div>
												<!-- End of -->

												<label class="loading hideBlock">&nbsp;</label>

												<ul class="hideBlock" id="segmentLst">

												</ul>
											</div>
											<!-- End of hierarchy Title -->

											<div class="heirachyBottom">
												<span id="segmentTotal" class="totalCount hideBlock">
													<label>Total:<strong id="segmentTotalCnt"></strong></label>
												</span> <span id="segmentBtn" class="heirachyAction hideBlock">
													<!-- <label class="actionBtn">Go</label> -->
												</span>

											</div>
											<!-- End of heirachy bottom -->

										</div>
										<!-- End of hierarchy Content -->
											<input type="hidden" name="dep" value="" id="dep"/>
											<input type="hidden" name="cat" value="" id="cat"/>
											<input type="hidden" name="sub" value="" id="sub"/>
											<input type="hidden" name="seg" value="" id="seg"/>


									</div>
									<!-- end of hierarchy Wrapper -->
									<div class="parameter clearfix">
										<label for="article" title="${properties.Article}">Article</label>
										<input type="#" class="textbox articleSearchText"
											name="articleNo" id="articleNo" placeHolder="Search By" maxlength="20">
										<div class="searchByOptions">
											<input type="radio" checked="" id="number" value="number"
												name="searchByOptions"><label class="labelText"
												for="number">Number</label> <input type="radio"
												id="description" value="description" name="searchByOptions"><label
												class="labelText" for="description">Description</label> <input
												type="radio" id="reference" value="reference"
												name="searchByOptions"><label class="labelText"
												for="reference">EAN</label>
											<!--  <label class="linkBtn"
												id="searchArticle"><label class="advancedSearch">Search</label></label> -->
											<input type="hidden" id="hiddenArticleNo"
												name="hiddenArticleNo" /> <input type="hidden"
												id="hiddenVerified" name="hiddenVerified" />
										</div>

									</div>
									<!-- End of parameter -->
									<div class="parameter sourceofsupply supplierSource IBTSource">
										<!-- <div class="parameter"> -->
										<label for="sourceOfSupply"
											title="${properties.SourceofSupply}" style="width: 65px;">Vendor</label>

										<span id="vendorField" class=""> <input type="#"
											class="textbox" name="supplier" id="supplier"
											placeHolder="Enter vendor no. or name" style="width: 33%;" maxlength="20"> <label
											class="linkBtn" id="verifySupplier" style="width: 50px;" ><label
												class="advancedSearch" >Verify</label></label>
													<label
										class="linkBtn hideBlock" id="verifyLabel" style="width: 25px;"><label
										class="verified" >Verified</label></label>
										</span>
										<input type="hidden" name="artNoHide" id="artNoHide"
										value="" />
										<input type="hidden" name="vendorNoHide" id="vendorNoHide"
										value="" />
										<!-- <span class="reportRadio"> <input type="radio"
											name="sourceSupply" value="all" id="all" checked><label
											for="all" class="labelText">All</label> <input type="radio"
											name="sourceSupply" value="warehouse" id="warehouse"><label
											for="warehouse" class="labelText">Warehouse</label> <input
											type="radio" name="sourceSupply" value="vendor" id="vendor"><label
											for="vendor" class="labelText">Vendor</label>
										</span> -->
										<!-- End of parameter -->

										<!-- <div class="parameter supplierSource IBTSource">
											
										</div> -->
										<!-- End of parameter -->

									</div>

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

						<!-- <div class="articleHead">
							<div class="articleHeaderWrapper">
								<h2 class="articleTitle">Overall Total</h2>
								<p>
									<label class="articlePriceLabel">Price Override/RTC: <strong
										class="pric"></strong>
									</label> <label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Clearance: <strong
										class="clea"></strong>
										</label> <label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Advert: <strong
										class="adver"></strong>
									</label> <label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Scanning Policy: <strong
										class="scanp"></strong>
									</label><label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Team Discount: <strong
										class="staf"></strong>
									</label><label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Loyalty: <strong
										class="loya"></strong>
									</label>
								</p>
								<p>
									<label
										class="articlePriceLabel">Promotions: <strong
										class="prom"></strong>
									</label><label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Comp: <strong
										class="comp"></strong>
									</label><label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Special Activity: <strong
										class="splActivity"></strong>
									</label><label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Total Markdown: <strong
										class="tota"></strong>
									</label><label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Deferred Loyalty ($): <strong
										class="dfrdLylt"></strong>
									</label><label class="articlePriceLabel">|</label> <label
										class="articlePriceLabel">Total After Deferred Loyalty ($): <strong
										class="totAftrDfrdLylt"></strong>
									</label>
								</p>

							</div> 
							

						</div>-->
						<div class="ContentTableWrapper" style="overflow-y: unset;">

							<div class="tableInfo">
					<input type="hidden" id="markdownAttr" name="markdownAttr" />
								<div class="tableTitle">
									<h4 class="sectionTitle">Markdown Details Report</h4>
									
								</div>
							<div class="tableActionBtns">
									<label class="actionBtn" onclick="markdownDetailsJasperPrint();"><label
										class="print">Print</label></label>
								</div>
								
								<div
									class="paginationWrapper  paginationDivMarkdown paginationDiv"
									id="paginationDiv1">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
								<!-- End of table title -->
							
								<!-- End of table action buttons -->

							</div>
							<!-- End of table info -->

								<!-- scroller functions -->
										<div id="scrollBtns" class="tableScroller">
											<ul>
												<li id="previous-column" class="scrollLeft"><a href="#">
												</a></li>
												<li id="next-column" class="scrollRight"><a href="#">
												</a></li>
											</ul>
										</div>
										<!-- End scroller functions -->
							<div id="scrollTable" class="scrollTableContainer">
								<div id="scrollWindow" class="scrollWindow" >

							<table cellspacing="0"
								class="ContentTable drilldownTable sortTable tableSorter tablesorter sortVal treetable pagenationCallbackClass"
								data-user_id="paginationDivMarkdown" id="sortTable">
							
									
								<thead class="hdrMain">
									<tr>
										<th width="200px" class="" sortAttr="mapKey" sortDataType="string" nulls="first">Department &
											Articles</th>
										<th class="" sortAttr="priceTransSet" sortDataType="string" nulls="first">QTY<span class="right">Price Override/RTC</span></th>
										<th sortAttr="clearTransSet" sortDataType="double" nulls="first">QTY<span class="right">Clearance</span></th>
										<th sortAttr="adverTransSet" sortDataType="double" nulls="first">QTY<span class="right">Advert</span></th>
										<th sortAttr="scanPTransSet" sortDataType="double" nulls="first">QTY<span class="right">Scanning Policy</span></th> 
										<th sortAttr="staffTransSet" sortDataType="double" nulls="first">QTY<span class="right">Team Discount</span></th>
										<th sortAttr="loyaltyTransSet" sortDataType="double" nulls="first">QTY<span class="right">Loyalty</span></th>
										<th sortAttr="promotionsTransSet" sortDataType="double" nulls="first">QTY<span class="right">Promotions</span></th>
										<th sortAttr="compTransSet" sortDataType="double" nulls="first">QTY<span class="right">Comp</span></th>
										<th sortAttr="splActivityTransSet" sortDataType="double" nulls="first">QTY<span class="right">Special </br>Activity</span></th>
										<th sortAttr="totalMarkdown" sortDataType="double" nulls="first">QTY<span class="right">Total Markdown</span></th>
										<th sortAttr="deferedLoyalty" sortDataType="double" nulls="first">Deferred </br>Loyalty ($)</th>
										<th sortAttr="totalMarkdownAftrDfrdLylt" sortDataType="double" nulls="first">Total after </br>
Deferred Loyalty ($)</th>
									</tr>
								</thead>
								<tbody></tbody>

								<tr class="totVal hideBlock">
									<td class="columnDivider valueInfo storeNdsub exclSort" >Store Total</td>
									<td class=" valueInfo pricFtrCount exclSort"></td>
									<td class=" valueInfo cleaFtrCount exclSort"></td>
									<td class=" valueInfo adverFtrCount exclSort"></td>
									 <td class=" valueInfo scanPFtrCount exclSort"></td> 
									<td class=" valueInfo stafFtrCount exclSort"></td>
									<td class=" valueInfo loyaFtrCount exclSort"></td>
									<td class=" valueInfo promFtrCount exclSort"></td>
									<td class=" valueInfo compFtrCount exclSort"></td>
									<td class=" valueInfo splActivityFtrCount exclSort"></td>
									<td class=" valueInfo totaFtrCount exclSort"></td>
									<td class="numberColumn valueInfo dfrdLyltFtr exclSort"></td>
									<td class="numberColumn lastColumn valueInfo totAftrDfrdLyltFtr exclSort"></td>
								</tr>
							</table>

							</div>
							</div>
							<div
								class="paginationWrapper bottomPagination paginationDiv paginationDivMarkdown"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
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
	<%-- <%@include file="pages/footer.jsp"%> --%>
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
			<div class="popupSearchWrapper" id="popupSearch" style="padding: 0 0 10px;">
				<h4>Total <strong class="total-count-list-vendr">0</strong> results found for '<strong class="searchStringVendr"></strong>'</h4>
				<!-- <h3>Supplier Name:</h3>
				<input type="#" placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDesc"> <label
					class="actionBtn" id="goButtonSample1">Go</label> -->
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
			<div class="popupSearchWrapper" id="popupSearch" style="padding: 0 0 10px;">
				<h4>Total <strong class="total-count-list">0</strong> results found for '<strong class="searchString"></strong>'</h4>
				<!-- <input type="#" placeholder="Enter Article"
					class="textbox textboxDefaultText" id="articleNoName"> <label
					class="actionBtn" id="goButtonSample2">Go</label> -->
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

</body>
</html>
