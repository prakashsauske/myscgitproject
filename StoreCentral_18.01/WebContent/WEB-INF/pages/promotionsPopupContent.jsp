<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<input type="hidden" value="${model.param.option}" id="option" />
<c:choose>
	<c:when test="${model.param.option=='multipleResult'}">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning hideBlock">
					Selected supplier: <strong class="vend-name"></strong>
				</h4>

				<label class="linkBtn"><label class="unselect hideBlock">Unselect
						Supplier</label></label>

			</div>
			<!-- End of pop up data -->

			<label id="nodataMsg"></label>
			<div class="popupData" id="popupDataDiv2">
				<div class="tableInfo">

					<div class="">
						<c:if test="${articleSearchResutlsList.size()>0}">
							<h4>
								Total <strong class="total-count-list">${articleSearchResutlsList.size()}</strong>
								results found for '<strong class="searchString"></strong>'
							</h4>
						</c:if>
					</div>
					<!-- End of table title -->


				</div>
				<!-- End of table info -->
			</div>
			<!-- End of pop up data -->




			<c:if test="${not empty articleSearchResutlsList}">
				<%
			int i = 0;
		%>
				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tr>
							<th>Article #</th>
							<th>Description</th>
							<th>UOM</th>
							<!-- <th>SOH</th> 
					<th>OM</th>-->
							<th width="40px" class="centerValue lastColumn">Select</th>
						</tr>

						<c:forEach items="${articleSearchResutlsList}"
							var="articleSearchResutlsList">

							<tr class="article-list" id="<%=i%>">
								<td id="artNo<%=i%>" class="art-no">${articleSearchResutlsList.articleNo}</td>
								<td id="artName<%=i%>"><c:choose>
										<c:when
											test="${not empty articleSearchResutlsList.pbdArticleDesc}">
						${articleSearchResutlsList.pbdArticleDesc} 
						<c:if test="${not empty articleSearchResutlsList.pbdArticleNo}">( ${articleSearchResutlsList.pbdArticleNo} )</c:if>
										</c:when>
										<c:otherwise>${articleSearchResutlsList.description}</c:otherwise>
									</c:choose></td>
								<td id="uom<%=i%>">${articleSearchResutlsList.uom}</td>
								<%-- <td id="soh<%=i%>">${vendorList.SOH}</td> 
						<td id="om<%=i%>">${vendorList.OM}</td>--%>
								<input type="hidden" value="" class="vendor-no" />
								<input type="hidden" value="" class="vendor-name" />
								<td class="sorted centerValue lastColumn"><input
									type="checkbox" class="checkbox"></td>
							</tr>
							<%
						i++;
					%>
						</c:forEach>
						<input type="hidden" value="<%=i%>" id="sizeCheck1" />

						<%-- <input type="hidden" value="${nodata}" id="nodata" />
				<input type="hidden" value="${divideSubmit}" id="divideSubmit" />
				<input type="hidden" value="${receiveCall}" id="receiveCall" />
				<input type="hidden" value="${receiveCall1}" id="receiveCall1" /> 
				<input type="hidden" id="msgChk" value="${msgChk}" />--%>


					</table>
				</div>
				<!-- End of content table wrapper -->
			</c:if>
			<div class="popupActionsWrapper">
				<label><strong>Note:</strong> You need to create an order
					for single supplier.</label> <span class="popupActions"
					style="width: 180px !important"> <label
					class="secondaryActionBtn"
					onclick="$('#dialog-modal2').dialog('close');">Cancel</label> <label
					class="actionBtn addToList hideBlock linkBtn2"
					onclick="$('#dialog-modal2').dialog('close');addToList();">Add
						to List <span class="list-count hideBlock"></span>
				</label>

				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of popupContent -->

		<Script src="../../scripts/description.js?version=${properties.version}" type="text/javascript" />

	</c:when>
</c:choose>