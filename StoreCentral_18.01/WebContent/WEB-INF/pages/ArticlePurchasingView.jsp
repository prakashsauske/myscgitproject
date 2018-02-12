<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
/* Autocomplete Off */
 
$(document).ready(function(){
	document.forms[0].autocomplete="off";
 });

</script>
<div class="quantityDetails">
	<table class="GlobalTradeTable">
		<tr class="tableHeader1">
			<th class="padding10">Store</th>
			<th>Vendor Number</th>
			<th>Vendor Name</th>

		</tr>



		<tr class="tableTdHeight">

			<td class="padding10">${articleSearchResutls.siteNo}</td>
			<td class="padding10">${articleSearchResutls.vendorNo}</td>
			<td class="padding10">${articleSearchResutls.vendorName}</td>



		</tr>

	</table>
</div>