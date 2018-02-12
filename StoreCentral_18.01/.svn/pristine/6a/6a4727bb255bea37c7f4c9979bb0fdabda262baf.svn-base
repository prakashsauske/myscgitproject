<c:if
	test="${not empty promSearchResultMetadata && promSearchResultMetadata.key=='MEDIA'}">
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
				<%-- <div class="tableTitle errorDiv error default-${index}"
						id="errorMsgDiv">
						<h4 id="errorMsg"></h4>

						<!-- End of table title -->



					</div> --%>
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
</c:if>
<c:if
	test="${not empty promSearchResultMetadata && promSearchResultMetadata.key=='DISP'}">
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
		</c:if>
	</ul>



	<c:set var="index" value="0"></c:set>
	<c:forEach var="promSearchResultMetadata"
		items="${promSearchResultMetadata}">
		<div id="sec-${index}">
			<div class="ContentTableWrapper default-${index}">
				<%-- <div class="tableTitle errorDiv error default-${index}"
						id="errorMsgDiv">
						<h4 id="errorMsg"></h4>

						<!-- End of table title -->



					</div> --%>
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
</c:if>
<c:if
	test="${promSearchResultMetadataList.get(0).firstLevelType=='DISP'}">
	<div id="sec-${count}">

		<c:if
			test="${promSearchResultMetadataList.get(0).secondLevelType!='NONE'}">
			<div id="accordion-1" class="accordionWrapper innerAccordion">
				<c:set var="index" value="0"></c:set>
				<c:forEach items="${promSearchResultMetadataList}"
					var="promSearchResultMetadataValList">

					<h3
						class=" <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>"
						onclick="getArticles($(this),'${promSearchResultMetadata.key}','${index}','<c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}">${promSearchResultMetadataValList.categoryId}</c:if><c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}">${promSearchResultMetadataValList.segmentId}</c:if><c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}">${promSearchResultMetadataValList.subCategoryId}</c:if>','1')">
						<c:if
							test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}">${promSearchResultMetadataValList.categoryName}</c:if>
						<c:if
							test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentName}</c:if>
						<c:if
							test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT' || promSearchResultMetadataList.get(0).secondLevelType=='NONE'}">${promSearchResultMetadataValList.subCategoryName}</c:if>

						<!-- <span class="summaryInfo">
											<span class="completionStatus"><label class="allOk">&nbsp;</label></span>
											<label>Total: <strong>7</strong> articles</label>
										</span> -->
					</h3>
					<div class="accordionContentHolder">

						<label
							class="loading hideBlock <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>">We
							are getting data, please wait</label>


						<div
							class="ContentTableWrapper <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>">
							<div
								class="tableTitle errorDiv error <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>"
								id="errorMsgDiv">
								<h4 id="errorMsg"></h4>

								<!-- End of table title -->



							</div>
							<div class="tableInfo">

								<div
									class="tableTitle header <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>">
									<h4>
										Total <strong
											class="recordCount <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>">7</strong>
										articles found
									</h4>
								</div>
								<!-- End of table title -->

								<div
									class="paginationWrapper <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>">
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
										class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>">
										<%@include file="promoTableHeader.jsp"%>

										<tr
											class="subHeader  <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>">

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
							class="pageActions <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='CAT'}"> ${promSearchResultMetadataValList.categoryId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SEGMENT'}"> ${promSearchResultMetadataValList.segmentId} </c:if> <c:if test="${promSearchResultMetadataList.get(0).secondLevelType=='SUBCAT'}"> ${promSearchResultMetadataValList.subCategoryId} </c:if>">
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

			<div class="ContentTableWrapper default">
				<div class="tableTitle errorDiv error default" id="errorMsgDiv">
					<h4 id="errorMsg"></h4>

					<!-- End of table title -->



				</div>
				<div class="tableInfo">

					<div class="tableTitle header default">
						<h4>
							Total <strong class="recordCount default">7</strong> articles
							found
						</h4>
					</div>
					<!-- End of table title -->

					<div class="paginationWrapper default">
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
							class="ContentTable treetable drilldownTable drillsOpenDefault compactTable  default">
							<%@include file="promoTableHeader.jsp"%>

							<tr class="subHeader  default">

								<%@include file="promoTableSubHeader.jsp"%>
							</tr>
						</table>
					</div>
				</div>

				<div
					class="paginationWrapper bottomPagination ${promSearchResultMetadataValList.subCategoryId}">
					<div class="pagination-holder clearfix">
						<div id="compact-pagination"
							class="compact-theme simple-pagination default"></div>
					</div>
				</div>


			</div>


			<div class="tableTitle errorDiv error errorDivProm" id="errorMsgDiv">
				<h4 id="errorMsg"></h4>

				<!-- End of table title -->



			</div>

			<div class="pageActions default">
				<lable class="actionBtn saveBtn"> <label>Save & Next</label>
				</lable>
				<button class="secondaryActionBtn">Reset</button>
			</div>
		</c:if>


	</div>
	<!-- End of section 1 -->
	<!-- End of section 1 -->

	<!-- <div id="section-2">2</div>
		End of section 2 -->

	<!-- <div id="section-3">3</div>
		End of section 3 -->

	<!-- <div id="section-4">4</div>
		End of section 4 -->
	<c:set var="count" value="${count+1}"></c:set>
</c:if>