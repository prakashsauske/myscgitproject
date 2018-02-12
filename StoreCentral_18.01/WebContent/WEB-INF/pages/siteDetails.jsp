<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:if test="${not empty siteDtlsList}">
	<div class="tableInfo">
		<div class="warningMessage hideBlock" id="searchWarning">
			<h4>
				Too many search results for '<strong>supplier name</strong>'. Please
				select a supplier from the list below.
			</h4>
		</div>
		<div class="tableTitle">
			<h4>
				Total <strong>${size}</strong> results found
			</h4>
		</div>
		<!-- End of table title -->
	</div>
	<!-- End of table info -->
	<div class="ContentTableWrapper">
		<table class="ContentTable" cellspacing="0">
			<tr>
				<th>Site No</th>
				<th>Site Name</th>
				<th>Proximity(km)</th>
				<th>Sales Org</th>
				<th width="25px" class="lastColumn">&nbsp;</th>
			</tr>
			<%
				int j = 0;
			%>
			<c:forEach items="${siteDtlsList}" var="siteDtlsList">
				<tr>
					<td id="3<%=j%>">${siteDtlsList.siteNo}</td>
					<td id="4<%=j%>">${siteDtlsList.mvmtType}</td>
					<td>${siteDtlsList.distance}</td>
					<td>${siteDtlsList.salesOrgNo}<c:if
							test="${not empty siteDtlsList.salesOrgNo}"> | ${siteDtlsList.salesOrgName}</c:if></td>
					<td class="sorted lastColumn"><label
						class="linkBtn selectbtn3" id="<%=j%>"><label
							class="selectItem">Select</label></label></td>
				</tr>
				<%
					j++;
				%>
			</c:forEach>
		</table>
	</div>
</c:if>
<input type="hidden" value="${flag}" id="flag" />
<div>
	<p class="noData">
		<c:if test="${not empty noSearchResults}">
			<b>${noSearchResults}</b>
		</c:if>
	</p>
</div>



<Script>
	//$(document).ready(function() {
document.forms[0].autocomplete="off";
		$(".selectbtn3").click(function() {
			var id = $(this).attr("id");
			if($('#flag').val()=='Y')
			$("#storeNo").val($("#3" + id + "").text()+"-"+$("#4" + id + "").text());
			else
			$("#supplier").val($("#3" + id + "").text()+"-"+$("#4" + id + "").text());
			//$('#store-search,#overlay-back').fadeOut(500);
			//$("#storeNo").val($("#3" + id + "").text());
			//$("#storeName").val($("#4" + id + "").text());
			if($( "dialog-siteSearchPop" ).dialog( "isOpen" ))

                $("#dialog-siteSearchPop").dialog( "close" );   

		});
	//});
</Script>
