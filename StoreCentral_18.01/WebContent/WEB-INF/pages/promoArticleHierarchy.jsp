
<span id="articleList" class="hideBlock">${articleList}</span>
<ul>
	<c:if test="${not empty promSearchResultMetadata}">
		<c:set var="count" value="0"></c:set>
		<c:forEach var="promSearchResultMetadata"
			items="${promSearchResultMetadata}">
			<c:set var="promSearchResultMetadataList"
				value="${promSearchResultMetadata.value}"></c:set>
			<li class="ui-tabs-status-default default-${count}"><a
				href="#sec-${count}"
				onclick="getArticles($(this),'${promSearchResultMetadata.key}','${count}','tabs','1')">${promSearchResultMetadata.key}<label
					class="tabStatus">&nbsp;</label></a></li>
			<c:set var="count" value="${count+1}"></c:set>
		</c:forEach>
		<!-- 	<li class="ui-tabs-status-allOk"><a href="#section-2">Food<label
					class="tabStatus">&nbsp;</label></a></li>
			<li class="ui-tabs-status-errors"><a href="#section-3">Non
					Food<label class="tabStatus">&nbsp;</label>
			</a></li>
			<li><a href="#section-4">Meat<label class="tabStatus">&nbsp;</label></a>
			</li> -->
		<%-- <c:if  test="${promSearchResultMetadataList.get(0).firstLevelType=='SEGMENT'}"> onclick="getArticles($(this),'${promSearchResultMetadata.key}','${count}','tabs')" </c:if>>${promSearchResultMetadata.key}<label --%>
	</c:if>
</ul>



<c:set var="index" value="0"></c:set>
<c:forEach var="promSearchResultMetadata"
	items="${promSearchResultMetadata}">
	<div id="sec-${index}">
		<div class="ContentTableWrapper default-${index}">
			<div class="tableTitle errorDiv error default-${index}"
				id="errorMsgDiv">
				<h4 id="errorMsg"></h4>

				<!-- End of table title -->



			</div>
			<div class="tableInfo">

				<div class="tableTitle header default">
					<h4>
						Total <strong class="recordCount default-${index}">7</strong>
						articles found
					</h4>
				</div>
				<!-- End of table title -->

				<div class="paginationWrapper default-${index}">
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
						class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  default-${index}">
						<%@include file="promoTableHeader.jsp"%>

						<tr class="subHeader  default-${index}">

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

		<div class="pageActions default-${index}">
			<lable class="actionBtn saveBtn"> <label>Save & Next</label>
			</lable>
			<button class="secondaryActionBtn">Reset</button>
		</div>
		<c:set var="index" value="${index+1}"></c:set>
	</div>
</c:forEach>