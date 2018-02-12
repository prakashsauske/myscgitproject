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
<form:form id="form">


	<table class="dataContent" style="width: 50%">
		<tr class="dataRow">

			<td class="dataField" rowspan="2">Article</td>
			<td class="dataField" rowspan="2">Product Id</td>
			<td class="dataField" rowspan="2" colspan="2">Measurement Unit</td>

			<td class="dataField" rowspan="2" colspan="2">Distance Channel</td>

			<td class="dataField" rowspan="2" colspan="2">Sales Organisation</td>

			<td class="dataField" rowspan="2" colspan="2">Plant</td>
			<td class="dataField" rowspan="2" colspan="2">Sales Price
				Specification Level</td>
			<td class="dataField" colspan="2">Validity Period</td>

			<td class="dataField" colspan="4">Price Specification</td>



		</tr>
		<tr class="dataRow">
			<td class="dataField">Start</td>
			<td class="dataField">End</td>
			<td class="dataField">Element1</td>
			<td class="dataField">Element2</td>
			<td class="dataField">Element3</td>
			<td class="dataField">Element4</td>
		</tr>
		<c:forEach items="${salesPriceList}" var="salesPriceList">
			<tr class="dataRow">
				<td class="subDataField">${salesPriceList.article}</td>
				<td class="subDataField">${salesPriceList.productId}</td>
				<td class="subDataField">${salesPriceList.measurementUnitCode}</td>
				<td class="subDataField">${salesPriceList.measurementUnitName}</td>
				<td class="subDataField">${salesPriceList.distanceChannelCode}</td>
				<td class="subDataField">${salesPriceList.distanceChannelName}</td>
				<td class="subDataField">${salesPriceList.salesOrgId}</td>
				<td class="subDataField">${salesPriceList.salesOrgFormatted}</td>
				<td class="subDataField">${salesPriceList.plantId}</td>
				<td class="subDataField">${salesPriceList.plantName}</td>
				<td class="subDataField">${salesPriceList.salesPriceSpecLevelCode}</td>
				<td class="subDataField">${salesPriceList.salesPriceSpecLevelName}</td>
				<td class="subDataField">${salesPriceList.startDate}</td>
				<td class="subDataField">${salesPriceList.endDate}</td>
				<td class="subDataField">${salesPriceList.priceSpecElement1}</td>
				<td class="subDataField">${salesPriceList.priceSpecElement2}</td>
				<td class="subDataField">${salesPriceList.priceSpecElement3}</td>
				<td class="subDataField">${salesPriceList.priceSpecElement4}</td>

			</tr>
		</c:forEach>


	</table>


</form:form>
