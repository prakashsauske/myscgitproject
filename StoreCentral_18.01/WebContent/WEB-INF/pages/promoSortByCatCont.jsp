<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:when
	test="${promSearchResultMetadataList.get(0).firstLevelType=='TABS' && promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}">
	<c:choose>
		<c:when
			test="${promSearchResultMetadata.key=='A' || promSearchResultMetadata.key=='a'}">
			<div id="section-1">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='B' || promSearchResultMetadata.key=='b'}">
			<div id="section-2">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='C' || promSearchResultMetadata.key=='c'}">
			<div id="section-3">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='D' || promSearchResultMetadata.key=='d'}">
			<div id="section-4">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='E' || promSearchResultMetadata.key=='e'}">
			<div id="section-5">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='F' || promSearchResultMetadata.key=='f'}">
			<div id="section-6">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='G' || promSearchResultMetadata.key=='g'}">
			<div id="section-7">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='H' || promSearchResultMetadata.key=='h'}">
			<div id="section-8">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='I' || promSearchResultMetadata.key=='i'}">
			<div id="section-9">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='J' || promSearchResultMetadata.key=='j'}">
			<div id="section-10">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='K' || promSearchResultMetadata.key=='k'}">
			<div id="section-11">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='L' || promSearchResultMetadata.key=='l'}">
			<div id="section-12">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='M' || promSearchResultMetadata.key=='m'}">
			<div id="section-13">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>
		<c:when
			test="${promSearchResultMetadata.key=='N' || promSearchResultMetadata.key=='n'}">
			<div id="section-14">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='O' || promSearchResultMetadata.key=='o'}">
			<div id="section-15">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='P' || promSearchResultMetadata.key=='p'}">
			<div id="section-16">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='Q' || promSearchResultMetadata.key=='q'}">
			<div id="section-17">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='R' || promSearchResultMetadata.key=='r'}">
			<div id="section-18">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='S' || promSearchResultMetadata.key=='s'}">
			<div id="section-19">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='T' || promSearchResultMetadata.key=='t'}">
			<div id="section-20">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='U' || promSearchResultMetadata.key=='u'}">
			<div id="section-21">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='V' || promSearchResultMetadata.key=='v'}">
			<div id="section-22">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='W' || promSearchResultMetadata.key=='w'}">
			<div id="section-23">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='X'|| promSearchResultMetadata.key=='x'}">
			<div id="section-24">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='Y' || promSearchResultMetadata.key=='y'}">
			<div id="section-25">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when
			test="${promSearchResultMetadata.key=='Z' || promSearchResultMetadata.key=='z' }">
			<div id="section-26">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

		<c:when test="${promSearchResultMetadata.key=='Others'}">
			<div id="section-27">
				<div id="accordion-1" class="accordionWrapper innerAccordion">
					<c:set var="index" value="0"></c:set>
					<c:forEach items="${promSearchResultMetadataList}"
						var="promSearchResultMetadataValList">
						<h3 class="${promSearchResultMetadataValList.subCategoryId}"
							onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','${promSearchResultMetadataValList.subCategoryId}','1')">
							${promSearchResultMetadataValList.subCategoryName}</h3>
						<div class="accordionContentHolder">

							<label
								class="loading hideBlock ${promSearchResultMetadataValList.subCategoryId}">We
								are getting data, please wait</label>


							<div
								class="ContentTableWrapper ${promSearchResultMetadataValList.subCategoryId}">
								<div
									class="tableTitle errorDiv error ${promSearchResultMetadataValList.subCategoryId}"
									id="errorMsgDiv">
									<h4 id="errorMsg"></h4>
								</div>
								<div class="tableInfo">
									<div
										class="tableTitle header ${promSearchResultMetadataValList.subCategoryId}">
										<h4>
											Total <strong
												class="recordCount ${promSearchResultMetadataValList.subCategoryId}">7</strong>
											articles found
										</h4>
									</div>
									<div
										class="paginationWrapper ${promSearchResultMetadataValList.subCategoryId}">
										<div class="pagination-holder clearfix">
											<div id="compact-pagination"
												class="compact-theme simple-pagination"></div>
										</div>
									</div>
								</div>
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
											class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  ${promSearchResultMetadataValList.subCategoryId}">
											<%@include file="promoTableHeader.jsp"%>
											<tr
												class="subHeader  ${promSearchResultMetadataValList.subCategoryId}">
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
							<!-- End of pagination bottom -->
							<div class="tableTitle errorDiv error errorDivProm"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="pageActions ${categoriesMapValList.subCategoryId}">
								<lable class="actionBtn  saveBtn"> <label>Save &
									Next</label> </lable>
								<button class="secondaryActionBtn">Reset</button>
							</div>
						</div>
						<c:set var="index" value="${index+1}"></c:set>
					</c:forEach>
				</div>
			</div>
			<c:set var="count" value="${count+1}"></c:set>
		</c:when>

	</c:choose>
</c:when>