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
			<td class="dataField">Measure Unit Code</td>
			<td class="dataField">Measure Unit Name</td>
			<td class="dataField">Base Quantity UnitIndicator</td>
			<td class="dataField">Supplier Quantity Unit u1</td>
			<td class="dataField">Supplier Quantity Unit us</td>
		</tr>

		<c:forEach items="${articleQuantityUnitList}"
			var="articleQuantityList" varStatus="artInvInfo">
			<tr class="dataRow">
				<td class="subDataField">${articleQuantityList.articleNo}</td>
				<td class="subDataField">${articleQuantityList.measureUnitCode}</td>
				<td class="subDataField">${articleQuantityList.measureUnitName}</td>
				<td class="subDataField">${articleQuantityList.baseQtyUnitInd}</td>
				<td class="subDataField">${articleQuantityList.suppQtyUnitu1}</td>
				<td class="subDataField">${articleQuantityList.suppQtyUnitus}</td>
			</tr>
		</c:forEach>
	</table>



</form:form>
