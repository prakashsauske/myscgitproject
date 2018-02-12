<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="tableInfo">

	<div class="tableTitle hideBlock">
		<h4 class="countTitle">
			Total <strong class="titleCount">526</strong> results found for '<strong
				class="searchString"> apple </strong>'
		</h4>
		<h4 class="popupError"></h4>
	</div>
	<!-- End of table title -->

	<% int i=0;%>
</div>
<!-- End of table info -->
<c:if test="${not empty vendorList}">

	<div class="ContentTableWrapper">
		<table class="ContentTable" cellspacing="0">
			<tr>
				<th>Warehouse #</th>
				<th>Description</th>
				<th width="25px" class="lastColumn">&nbsp;</th>
			</tr>

			<c:forEach items="${vendorList}" var="vendorList">

				<tr>
					<td id="suppNo<%=i%>">${vendorList.supplierNo}</td>
					<td id="suppName<%=i%>">${vendorList.supplierName}</td>
					<td class="sorted lastColumn"><label class="linkBtn linkBtn1"
						id="<%=i%>"><label class="selectItem">Select</label></label></td>
				</tr>
				<%i++; %>
			</c:forEach>




		</table>
	</div>
	<!-- End of content table wrapper -->
</c:if>
<input type="hidden" value="<%=i%>" id="sizeCheck" />
<Script>
		//$(document).ready(function(){
		
			$(".linkBtn1").click(function() {
				
				var id=$(this).attr("id");
				
				$("#supplier").val($("#suppNo"+id+"").text());
				$("#suppNo").val($("#suppNo"+id+"").text());
				if($( "#dialog-modal" ).dialog( "isOpen" ))

                    $("#dialog-modal").dialog( "close" );   
				if($( "#dialog-modal1" ).dialog( "isOpen" ))

                    $("#dialog-modal1").dialog( "close" ); 
				if($( "#dialog-supplier-verify" ).dialog( "isOpen" ))

                    $("#dialog-supplier-verify").dialog( "close" ); 

				 if($( "#dialog-verifySupplier" ).text().length>0 && $( "#dialog-verifySupplier" ).dialog( "isOpen" ))

	                    $("#dialog-verifySupplier").dialog( "close" );
				
			});
		//});
			
		</Script>
