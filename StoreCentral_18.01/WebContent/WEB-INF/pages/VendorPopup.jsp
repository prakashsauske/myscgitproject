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
				<th>Vendor #</th>
				<th>Description</th>
				<th width="25px" class="lastColumn">&nbsp;</th>
			</tr>

			<c:forEach items="${vendorList}" var="vendorList">
				<tr>
					<td id="suppNo<%=i%>">${vendorList.supplierNo}</td>
					<td id="suppName<%=i%>">${vendorList.supplierName}</td>
					<td class="sorted lastColumn"><label class="linkBtn linkBtn1"	id="<%=i%>"><label class="selectItem">Select</label></label></td>
				</tr>
				<%i++; %>
			</c:forEach>
		</table>
	</div>
	<!-- End of content table wrapper -->
</c:if>
<input type="hidden" value="<%=i%>" id="sizeCheck" />
<Script>
			$(".linkBtn1").click(function() {
				$(".linkBtn1").unbind('click');
				var id=$(this).attr("id");
				$("#vendorText").val($("#suppNo"+id+"").text()+"-"+$("#suppName"+id+"").text());
				$('#vendorCheck').val(true);
				if($( "#dialog-supplier-modal" ).dialog( "isOpen" ))
                    $("#dialog-supplier-modal").dialog( "close" );   
				if($( "#dialog-supplier-modal1" ).dialog( "isOpen" ))
                    $("#dialog-supplier-modal1").dialog( "close" ); 
			});
			
		</Script>