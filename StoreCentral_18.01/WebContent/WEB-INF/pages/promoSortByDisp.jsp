<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:when
	test="${promSearchResultMetadataList.get(0).firstLevelType=='DISP'}">
	<div id="sec-${count}">


		<div id="accordion-1" class="accordionWrapper innerAccordion">
			<c:set var="index" value="0"></c:set>
			<c:forEach items="${promSearchResultMetadataList}"
				var="promSearchResultMetadataValList">

				<h3
					class="${promSearchResultMetadataValList.subCategoryId}-${index} "
					onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">

					${promSearchResultMetadataValList.subCategoryName}</h3>
				<div
					class="accordionContentHolder 	${fn:replace(promSearchResultMetadataValList.subCategoryName, ' ', '')}"
					id="${fn:replace(promSearchResultMetadataValList.subCategoryName, ' ', '')}">

					<!-- <label
						class="loading hideBlock  ${fn:replace(promSearchResultMetadataValList.subCategoryId, ' ', '')}-${index} ">We
						are getting data, please wait</label> -->


					<div
						class="ContentTableWrapper  ${promSearchResultMetadataValList.subCategoryId}-${index} ">
						<div
							class="tableTitle errorDiv error  ${promSearchResultMetadataValList.subCategoryId}-${index} "
							id="errorMsgDiv">
							<h4 id="errorMsg"></h4>

							<!-- End of table title -->



						</div>
						<div class="tableInfo">

							<div
								class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}-${index} ">
								<h4>
									Total <strong
										class="recordCount  ${promSearchResultMetadataValList.subCategoryId}-${index} ">7</strong>
									articles found
								</h4>
							</div>
							<!-- End of table title -->

							<div
								class="paginationWrapper  ${promSearchResultMetadataValList.subCategoryId}-${index} ">
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
									class="ContentTable treetable drilldownTable drillsOpenDefault compactTable   ${promSearchResultMetadataValList.subCategoryId}-${index} ">
									<%@include file="promoTableHeader.jsp"%>

									<tr
										class="subHeader   ${promSearchResultMetadataValList.subCategoryId}-${index} ">

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
						class="pageActions  ${promSearchResultMetadataValList.subCategoryId}-${index} ">
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
	</div>
	<c:set var="count" value="${count+1}"></c:set>
</c:when>