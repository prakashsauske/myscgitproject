<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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

.textLeft {
	text-align: left;
}

.padLeft {
	padding-left: 10px;
}
</Style>
<c:if test="${not empty vendorList}">
	<table class="GlobalTradeTable" id=""
		style="border: 1px solid #D4cbc0;">
		<tr class="tableHeader1" id="tableHeader">
			<th style="padding-left: 10px;" class="textLeft">Vendor Number</th>
			<th class="textLeft">Vendor Description</th>
			<th></th>
		</tr>
		<% int i=0;%>
		<c:forEach items="${vendorList}" var="vendorList">
			<tr class="tableTdHeight">

				<td id="1<%=i%>" class="textLeft padLeft">${vendorList.supplierNo}</td>
				<td id="2<%=i%>" class="textLeft padLeft">${vendorList.supplierName}</td>
				<td><input type="button" id="<%=i%>" class="selectbtn1"
					value="Select" /></td>
				<%i++; %>
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
			document.forms[0].autocomplete="off";
			//alert("called");
			$(".selectbtn1").click(function() {
				
				var id=$(this).attr("id");
			
				$('#vendor-search,#overlay-back').fadeOut(500);
				
				
				$("#VendorNumber").val($("#1"+id+"").text());
				$("#VendorName").val($("#2"+id+"").text());
	
			
			});
		});
			/* $(".selectbtn1").css('color','#Fff');
			$(".selectbtn1").css('background','#000');

			}); */

		</Script>
