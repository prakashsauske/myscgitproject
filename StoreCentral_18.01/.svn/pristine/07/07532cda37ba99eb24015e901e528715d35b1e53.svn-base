<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:when
	test="${promSearchResultMetadataList.get(0).firstLevelType=='MEDIA'}">
	<div id="sec-${count}">

		<c:if
			test="${promSearchResultMetadataList.get(0).secondLevelType!='NONE'}">
			<div id="accordion-1" class="accordionWrapper innerAccordion">
				<c:set var="index" value="0"></c:set>
				<c:forEach items="${promSearchResultMetadataList}"
					var="promSearchResultMetadataValList">

					<h3 class="  ${promSearchResultMetadataValList.subCategoryId} "
						onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
						${promSearchResultMetadataValList.subCategoryName}</h3>
					<div class="accordionContentHolder">

						<label
							class="loading hideBlock  ${promSearchResultMetadataValList.subCategoryId} ">We
							are getting data, please wait</label>


						<div
							class="ContentTableWrapper  ${promSearchResultMetadataValList.subCategoryId} ">
							<div
								class="tableTitle errorDiv error  ${promSearchResultMetadataValList.subCategoryId} "
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="tableInfo">

								<div
									class="tableTitle header  ${promSearchResultMetadataValList.subCategoryId} ">
									<h4>
										Total <strong
											class="recordCount  ${promSearchResultMetadataValList.subCategoryId} ">7</strong>
										articles found
									</h4>
								</div>
								<!-- End of table title -->

								<div
									class="paginationWrapper  ${promSearchResultMetadataValList.subCategoryId} ">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
								<!-- End of pagination Wrapper -->

							</div>
							<!-- End of table info -->


							<div id="scrollBtns" class="tableScroller">
								<ul>
									<li id="previous-column" class="scrollLeft"><a href="#">&nbsp;</a></li>
									<li id="next-column" class="scrollRight"><a href="#">&nbsp;</a></li>
								</ul>
							</div>
							<div id="scrollTable" class="scrollTableContainer">
								<div id="scrollWindow" class="scrollWindow"
									style="width: 1000px">
									<table cellspacing="0" id="treetable"
										class="ContentTable treetable drilldownTable drillsOpenDefault compactTable   ${promSearchResultMetadataValList.subCategoryId} ">
										<%@include file="promoTableHeader.jsp"%>

										<tr
											class="subHeader   ${promSearchResultMetadataValList.subCategoryId} ">

											<%@include file="promoTableSubHeader.jsp"%>
										</tr>


									</table>
								</div>
							</div>

							<div
								class="paginationWrapper bottomPagination ${promSearchResultMetadataValList.subCategoryId}">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>


						</div>


						<div class="tableTitle errorDiv error errorDivProm"
							id="errorMsgDiv">
							<h4 id="errorMsg"></h4>

							<!-- End of table title -->



						</div>

						<div
							class="pageActions  ${promSearchResultMetadataValList.subCategoryId} ">
							<lable class="actionBtn saveBtn"> <label>Save &
								Next</label> </lable>
							<button class="secondaryActionBtn">Reset</button>
						</div>
						<!-- End of page actions-->


					</div>
					<!-- end of accordion Content Holder -->



					<c:set var="index" value="${index+1}"></c:set>
				</c:forEach>


			</div>
			<!-- end of inner Accordion -->
		</c:if>
		<c:if
			test="${promSearchResultMetadataList.get(0).secondLevelType=='NONE'}">
			<div class="accordionContentHolder">
				<div class="ContentTableWrapper default">
					<div class="tableTitle errorDiv error default-${tabIndex}"
						id="errorMsgDiv">
						<h4 id="errorMsg"></h4>

						<!-- End of table title -->



					</div>
					<div class="tableInfo">

						<div class="tableTitle header default-${tabIndex}">
							<h4>
								Total <strong class="recordCount default-${tabIndex}">7</strong>
								articles found
							</h4>
						</div>
						<!-- End of table title -->

						<div class="paginationWrapper default-${tabIndex}">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
						<!-- End of pagination Wrapper -->

					</div>
					<!-- End of table info -->


					<div id="scrollBtns" class="tableScroller">
						<ul>
							<li id="previous-column" class="scrollLeft"><a href="#">&nbsp;</a></li>
							<li id="next-column" class="scrollRight"><a href="#">&nbsp;</a></li>
						</ul>
					</div>
					<div id="scrollTable" class="scrollTableContainer">
						<div id="scrollWindow" class="scrollWindow" style="width: 1000px">
							<table cellspacing="0" id="treetable"
								class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  default-${tabIndex}">
								<%@include file="promoTableHeader.jsp"%>

								<tr class="subHeader  default-${tabIndex}">

									<%@include file="promoTableSubHeader.jsp"%>
							</table>
						</div>
					</div>

					<div
						class="paginationWrapper bottomPagination ${promSearchResultMetadataValList.subCategoryId}">
						<div class="pagination-holder clearfix">
							<div id="compact-pagination"
								class="compact-theme simple-pagination"></div>
						</div>
					</div>


				</div>


				<div class="tableTitle errorDiv error errorDivProm" id="errorMsgDiv">
					<h4 id="errorMsg"></h4>

					<!-- End of table title -->



				</div>


				<div class="pageActions default-${tabIndex} pad-bot18">
					<lable class="actionBtn saveBtn"> <label>Save &
						Next</label> </lable>
					<button class="secondaryActionBtn">Reset</button>
				</div>
			</div>
		</c:if>






	</div>

	<c:set var="count" value="${count+1}"></c:set>
</c:when>