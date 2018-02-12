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
			<td class="dataField">Material Number</td>
			<td class="dataField">Site No</td>
			<td class="dataField">EFT Group ID</td>
			<td class="dataField">Age Proof</td>
			<td class="dataField">SRT Display</td>
			<td class="dataField">EAS Indicator</td>
		</tr>

		<c:forEach items="${posDataInfo}" var="posData" varStatus="artInvInfo">
			<tr class="dataRow">
				<td class="subDataField">${posData.materialName}</td>
				<td class="subDataField">${posData.siteNo}</td>
				<td class="subDataField">${posData.groupID}</td>
				<td class="subDataField">${posData.ageFlag}</td>
				<td class="subDataField">${posData.srtDisplay}</td>
				<td class="subDataField">${posData.easIndicator}</td>
			</tr>
		</c:forEach>
	</table>



</form:form>
