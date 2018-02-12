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
<form:form id="form" commandName="param">


	<table class="dataContent" style="width: 50%">
		<tr class="dataRow">
			<td class="dataField">Promotion Id</td>
			<td class="dataField">Promotional Price</td>
			<td class="dataField">Valid From</td>
			<td class="dataField">Valid To</td>
		</tr>

		<c:forEach items="${promotionServiceInfo}" var="promotionServiceInfo"
			varStatus="artInvInfo">
			<tr class="dataRow">
				<td class="subDataField">${promotionServiceInfo.promotionId}</td>
				<td class="subDataField">${promotionServiceInfo.promotionalPrice}</td>
				<td class="subDataField">${promotionServiceInfo.validFrom}</td>
				<td class="subDataField">${promotionServiceInfo.validTo}</td>

			</tr>
		</c:forEach>
	</table>



</form:form>
