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
			<td class="dataField">Article No</td>
			<td class="dataField">Quantity Unit Code</td>
			<td class="dataField">Quantity Content</td>
			<td class="dataField">Correct Quantity Unit Code</td>
			<td class="dataField">Correct Quantity Unit Content</td>
		</tr>

		<c:forEach items="${articleQuantityConversionList}"
			var="articleQuantityConversion" varStatus="artInvInfo">
			<tr class="dataRow">
				<td class="subDataField">${articleQuantityConversion.articleNo}</td>
				<td class="subDataField">${articleQuantityConversion.quantityUnitCode}</td>
				<td class="subDataField">${articleQuantityConversion.quantityContent}</td>
				<td class="subDataField">${articleQuantityConversion.correctQUnitCode}</td>
				<td class="subDataField">${articleQuantityConversion.correctQUnitContent}</td>
			</tr>
		</c:forEach>
	</table>



</form:form>
