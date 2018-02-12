<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<Style>
.selectbtn1 {
	background: -webkit-linear-gradient(top, #51B848, #119A49);
	background: -moz-linear-gradient(top, #51B848, #119A49);
	background: -ms-linear-gradient(top, #51B848, #119A49);
	background: -o-linear-gradient(top, #51B848, #119A49);
	height: 25px;
	width: 75px;
	border-radius: 5px;
	color: #fff;
	font-size: 18px;
	font-weight: bold;
	box-shadow: 0px 2px 2px #009a3d;
}

.noData {
	color: #f37821;
	position: absolute;
}

.tableHeader1 {
	background-color: #D4CBC0;
	font-weight: bold;
	font-size: 16px;
	height: 40px;
}

.tableTdHeight {
	height: 40px;
	border-bottom: 1px solid #D4CBC0;
	border-bottom-style: dashed;
	color: #009a3d;
	font-size: 16px;
	background: #fff;
	font-family: arial;
}
</Style>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:if test="${not empty storeDtlsList}">
	<table class="GlobalTradeTable" id=""
		style="border: 1px solid #D4cbc0; text-align: center;">
		<tr class="tableHeader1" id="tableHeader">
			<th style="padding-left: 10px;">Store Number</th>
			<th>Store Description</th>
			<th></th>
		</tr>
		<% int j=0;%>

		<c:forEach items="${storeDtlsList}" var="storeDtlsList">
			<tr class="tableTdHeight">

				<td id="5<%=j%>">${storeDtlsList.siteNumber}</td>
				<td id="6<%=j%>">${storeDtlsList.siteDescription}</td>
				<td><input type="button" id="<%=j%>" class="selectbtn1"
					value="Select" /></td>
				<%j++; %>
			</tr>
		</c:forEach>

	</table>
</c:if>
<div>
	<p class="noData">
		<c:if test="${not empty noSearchResults}">
			<b>${noSearchResults}</b>
		</c:if>
	</p>
</div>



<Script>
		$(document).ready(function(){
			//alert("called");
			document.forms[0].autocomplete="off";
			$(".selectbtn1").click(function() {
				var id=$(this).attr("id");
				$('#store-search,#overlay-back').fadeOut(500);
				$("#storeNo").val($("#5"+id+"").text());
				$("#storeName").val($("#6"+id+"").text());
	
			
			});
		});
</Script>
