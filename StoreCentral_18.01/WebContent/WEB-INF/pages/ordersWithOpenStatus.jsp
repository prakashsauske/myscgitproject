<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:choose>
	<c:when test="${not empty noResults}"></c:when>
	<c:otherwise>
		<h4>Showing open orders for Article #${articleNo} -
			${articleName}</h4>
		<div class="tableTitle">
			<h4>
				Total <strong>${size}</strong> orders found
			</h4>
		</div>
	</c:otherwise>
</c:choose>
<!-- End of table info -->
<c:if test="${not empty openOrderList}">

	<div class="ContentTableWrapper">
		<table class="ContentTable" cellspacing="0">
			<tr>
				<th>Order/PReq #</th>
				<th>Roster Date</th>
				<th class="lastColumn">Delivery Date</th>
			</tr>
			<c:forEach items="${openOrderList}" var="openOrderList">
				<tr>
					<td><c:choose>
							<c:when test="${not empty openOrderList.orderNo}">${openOrderList.orderNo}</c:when>
							<c:otherwise>${openOrderList.pReqNo}</c:otherwise>
						</c:choose></td>
					<td>${openOrderList.rosterDate}</td>
					<td class="lastColumn">${openOrderList.deliveryDate}</td>
				</tr>
			</c:forEach>

		</table>
		<%-- <table class="ContentTable" cellspacing="0">
			<tr>
				<th>Article #</th>
				<th>Description</th>
				<th width="25px" class="lastColumn">&nbsp;</th>
			</tr>

			<c:forEach items="${vendorList}" var="vendorList">
				
				<tr>
					<td id="artNo<%=i%>">${vendorList.articleNo}</td>
					<td id="artName<%=i%>">${vendorList.description}</td>
					<td class="sorted lastColumn"><label class="linkBtn linkBtn2" id="<%=i%>"><label
							class="selectItem">Select</label></label></td>
				</tr>
				<%i++; %>
			</c:forEach>
			<input type="hidden" value="<%=i%>" id="sizeCheck1"/>
			
			<input type="hidden" value="${nodata}" id="nodata"/>
			<input type="hidden" value="${divideSubmit}" id="divideSubmit"/>


		</table> --%>
	</div>
	<!-- End of content table wrapper -->
</c:if>

<!-- <Script>
		$(document).ready(function(){
		
			$(".linkBtn2").click(function() {
				$('tr td').addClass('cursorProgress');
				var id=$(this).attr("id");
				
				$("#articleNo").val($("#artNo"+id+"").text());
				$("#artNo").val($("#artNo"+id+"").text());
				$('#desIndex').val(id);
				if($( "#dialog-modal2" ).dialog( "isOpen" ))

                    $("#dialog-modal2").dialog( "close" );  
				
				$('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
				if($('#divideSubmit').val()=='Y')
					{
				$('#manualOrderSearchSubmit').attr('action','addArticleDescription.htm');
				$('#manualOrderSearchSubmit').attr('method','GET');
				$('#manualOrderSearchSubmit').submit(); 
					}
				else if($('#divideSubmit').val()=='N')
					{
				$('#ibtSite').attr('action','addArticleDescription.htm');
				$('#ibtSite').attr('method','GET');
				$('#ibtSite').submit();
					}

				
			});
		});
			
		</Script> 	 -->
<script type="text/javascript">
/* Autocomplete Off */
 
$(document).ready(function(){
	document.forms[0].autocomplete="off";
 });

</script>
