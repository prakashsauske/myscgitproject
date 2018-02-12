<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<input type="hidden" value="${model.param.option}" id="option" />
<h2 class="wizardTitle"></h2>
<%@include file="promotionFixedHdr.jsp"%>
<c:choose>
	<c:when test="${model.param.option=='promotionDetails'}">
		<%@include file="promoSortByCat.jsp"%>
		<c:set var="count" value="0"></c:set>
		<c:set var="tabIndex" value="0"></c:set>
		<c:forEach var="promSearchResultMetadata"
			items="${promSearchResultMetadata}">
			<c:set var="promSearchResultMetadataList"
				value="${promSearchResultMetadata.value}"></c:set>
			<c:choose>
				<%@include file="promoSortByDisp.jsp"%>
				<%@include file="promoSortByMedia.jsp"%>
				<%@include file="promoSortByDisc.jsp"%>
				<%@include file="promoSortByCatCont.jsp"%>
			</c:choose>
			<c:set var="tabIndex" value="${tabIndex+1}"></c:set>
		</c:forEach>
	</c:when>
	<c:when test="${model.param.option=='articleListJson'}">
		<%@include file="promoArticleSearch.jsp"%>
	</c:when>
	<%-- <c:when test="${model.param.option=='articleHierarchy'}">
	<%@include file="promoArticleHierarchy.jsp" %>
	</c:when> --%>
	<%-- <c:when test="${model.param.option=='promotionDetail'}">
<%@include file="promoLoadDtl.jsp" %>
		</c:when> --%>
</c:choose>
<div id="dialog-saveChanges" title="Save Changes">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText">Do you want to save the changes?</h4>

			<div class="popupActionsWrapper">
				<label class="secretPopMsg"></label> <span class="popupActions">
					<label class="actionBtn passwordExpiredOkBtn"
					onclick="$('.actionBtn.saveBtn:visible').click();$('#dialog-saveChanges').dialog('close');">Ok</label>
					<label class="secondaryActionBtn"
					onclick="$('#dialog-saveChanges').dialog('close');window.location.href='../promoPlanning/onPageLoad.htm';">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End Cancel order popup -->
<script>
	$( "#dialog-saveChanges" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 100,
		maxHeight: 600,
		width: 400
	});

	$("#dialog-saveChanges").parent().addClass("popupWrapper");
	</script>
<link href="../../styles/NewScroll.css?version=${properties.version}" rel="stylesheet" type="text/css" />

