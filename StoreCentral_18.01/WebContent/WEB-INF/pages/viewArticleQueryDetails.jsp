<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:set var="firstRecord" value="${queryListHdr.get(0)}">
</c:set>
<div class="contentWrapper detailsContent">

	<div class="articleHead">
		<div class="articleHeaderWrapper">
			<h2 class="articleTitle">
				Query
				<c:if test="${not empty firstRecord.queryId}"># </c:if>
				${firstRecord.queryId}
			</h2>
			<p>
				<label class="articlePriceLabel">Submitted By: <strong>${firstRecord.submitBy}</strong>
				</label> <label class="articlePriceLabel">|</label> <label
					class="articlePriceLabel">Submitted Date: <strong>${firstRecord.submitDate}</strong>
				</label>

			</p>
		</div>
		<div class="articleActionBtns">
			<label class="orderStatus">Status: <strong>${firstRecord.queryStatus}</strong></label>

		</div>
	</div>


	<div class="articleContent orderDetails">


		<div class="articleContentInner">

			<div class="articleDetails">

				<table cellspacing="0" class="ContentTable" width="100%">

					<tr>
						<td class="keyInfo" width="15%">Store Comments:</td>
						<td class="valueInfo lastColumn">${firstRecord.storeComment}
						</td>

					</tr>

					<tr class="lastRow">
						<td class="keyInfo">Replenishment Teams' Comment:</td>

						<td class="valueInfo lastColumn"><c:if
								test="${not empty firstRecord.rcComment}">${firstRecord.rcComment}</c:if></td>
					</tr>
				</table>
			</div>
			<!-- End of article details -->
		</div>
		<!-- End of article content inner -->









	</div>
	<!-- End of article content -->
	<c:if test="${viewArticleQueryDetailList.get(0).articleNo  != null}">
		<div class="ContentTableWrapper">

			<div class="tableInfo">

				<div class="tableTitle">
					<h4 class="sectionTitle">List of Articles</h4>
				</div>
				<!-- End of table title -->
			</div>
			<!-- End of table info -->



			<table cellspacing="0" class="ContentTable">
				<tr>

					<th>Article #</th>
					<th>Description</th>
					<th>UOM</th>
					<th>Reason</th>
					<th>Comments</th>
					<th>Status</th>
					<th class="lastColumn">Resolution</th>

				</tr>
				<c:forEach items="${viewArticleQueryDetailList}"
					var="viewArticleQueryDetailList">
					<tr class="lastRow">
						<td>${viewArticleQueryDetailList.articleNo}</td>
						<td>${viewArticleQueryDetailList.articleDesc}</td>
						<td>${viewArticleQueryDetailList.articleUom}</td>
						<td>${viewArticleQueryDetailList.lineReasonCode}<c:if
								test="${not empty viewArticleQueryDetailList.lineReasonCode && not empty viewArticleQueryDetailList.lineReasonDesc}"> | </c:if>${viewArticleQueryDetailList.lineReasonDesc}
						</td>
						<td>${viewArticleQueryDetailList.lineStoreCmt}</td>
						<td>${viewArticleQueryDetailList.articleStatus}</td>
						<td class="lastColumn"><c:if
								test="${viewArticleQueryDetailList.lineRCReasonCmt != 'null'  }">${viewArticleQueryDetailList.lineRCReasonCmt}</c:if>
						</td>
					</tr>
				</c:forEach>
			</table>
		</div>
	</c:if>
	<!-- End of content table wrapper -->
</div>
<!-- End of content wrapper -->
