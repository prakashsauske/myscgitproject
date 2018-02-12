<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:when
	test="${promSearchResultMetadataList.get(0).firstLevelType=='DISC'}">
	<div id="sec-${count}">


		<c:if
			test="${promSearchResultMetadataList.get(0).secondLevelType=='NONE'}">
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


			<div class="tableTitle errorDiv error errorDivProm" id="errorMsgDiv">
				<h4 id="errorMsg"></h4>

				<!-- End of table title -->



			</div>

			<div class="pageActions default-${tabIndex} pad-bottom10">
				<lable class="actionBtn saveBtn display-inline-block"> <label>Save
					& Next</label> </lable>
				<button class="secondaryActionBtn">Reset</button>
			</div>

		</c:if>






	</div>

	<c:set var="count" value="${count+1}"></c:set>
</c:when>