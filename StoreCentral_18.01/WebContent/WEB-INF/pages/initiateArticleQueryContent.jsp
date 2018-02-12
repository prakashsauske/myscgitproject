<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div id="content">
	<input type="hidden" id="option" value="${model.param.option}">
	<c:choose>
		<c:when test="${model.param.option=='result'}">
			<c:set value="0" var="count"></c:set>
			<table cellspacing="0" class="ContentTable treetable drilldownTable"
				id="treetable">
				<tr>

					<th>Article #</th>
					<th>Description</th>
					<th>UOM</th>
					<th width="25%">Reason</th>
					<th width="25%">Comments</th>
					<th class="lastColumn centerValue" width="70px">Actions</th>
				</tr>
				<c:forEach items="${articleSearchResutlsList}" var="articlelist">
					<tr id="row-<c:out value="${count}"></c:out>">

						<td id="refNo-<c:out value="${count}"></c:out>" class="article-no">${articlelist.articleNo}
							<c:if test="${not empty articlelist.packBreakDownArticleNo}">(</c:if>${articlelist.packBreakDownArticleNo}<c:if
								test="${not empty articlelist.packBreakDownArticleNo}">)</c:if>
						</td>
						<td>${articlelist.description}</td>
						<td id="uom-<c:out value="${count}"></c:out>" class="article-uom">${articlelist.uom}</td>
						<td id="qty-<c:out value="${count}"></c:out>"
							class="<c:if test="${articlelist.saveFlag=='N'}">hideBlock</c:if>">${articlelist.storeReasonCodeDesc}</td>
						<td id="qtyEdit-<c:out value="${count}"></c:out>"
							class="<c:if test="${articlelist.saveFlag=='Y'}">hideBlock</c:if> saveCheck"><select
							name="aQMReasonCode" value="${articlelist.storeReasonCode}"
							class="selectOptions"
							id="qtyValue-<c:out value="${count}"></c:out>">
								<option value="Select">Select</option>
								<c:forEach items="${aQMReasonCodeList}" var="whVal">
									<option value="${whVal.reasonCode}" id="${whVal.reasonCode}">${whVal.reasonCodeDescription}</option>
								</c:forEach>
						</select>
						<td id="pcode_id-<c:out value="${count}"></c:out>"
							class="pcode_id hideBlock">${articlelist.pcode_id}</td>
						<td id="comments-<c:out value="${count}"></c:out>"
							class="<c:if test="${articlelist.saveFlag=='N'}">hideBlock</c:if>">${articlelist.lineItemComments}</td>
						<td id="commentsEdit-<c:out value="${count}"></c:out>"
							class="aqm-input <c:if test="${articlelist.saveFlag=='Y'}">hideBlock</c:if>"><input
							maxlength="40" type="#" value="${articlelist.lineItemComments}"
							id="commentsValue-<c:out value="${count}"></c:out>"
							class="editTextCell textbox textboxDefaultText"></td>
						<td class="lastColumn centerValue"><label
							class="linkBtn editRowBtn <c:if test="${articlelist.saveFlag=='N'}">hideBlock</c:if>"
							id="editRecord-<c:out value="${count}"></c:out>"> <label
								class="editRecord">Edit</label>
						</label><label
							class="linkBtn saveRowBtn <c:if test="${articlelist.saveFlag=='Y'}">hideBlock</c:if>"
							id="saveRecord-<c:out value="${count}"></c:out>"> <label
								class="saveRecord">Save</label>
						</label> <label class="linkBtn deleteRowBtn"
							id="DeleteRecord-<c:out value="${count}"></c:out>"> <label
								class="deleteRecord ">Delete</label>
						</label></td>
					</tr>
					<c:set value="${count+1}" var="count"></c:set>
				</c:forEach>
			</table>
			<!-- End of table footer -->
		</c:when>
	</c:choose>
	<script type="text/javascript"
		src="../../scripts/initiateArticleQueryContent.js?version=${properties.version}"></script>
</div>