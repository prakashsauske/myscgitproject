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
	<c:forEach items="${scaleArticleResult}" var="scaleArticledata">
		<table class="dataContent" style="width: 50%">
			<tr class="dataRow">
				<td class="dataField" colspan="2">Article Number</td>
				<td class="dataField">Site</td>
				<td class="dataField">UoM</td>
				<td class="dataField">Scale Article</td>
				<td class="dataField">Forced Quantity</td>
				<td class="dataField">Forced Price</td>
				<td class="dataField">Tare Code Weight</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField" colspan="2">${scaleArticledata.article}</td>
				<td class="subDataField">${scaleArticledata.site}</td>
				<td class="subDataField">${scaleArticledata.uom}</td>
				<td class="subDataField">${scaleArticledata.scaleArticle}</td>
				<td class="subDataField">${scaleArticledata.forcedQty}</td>
				<td class="subDataField">${scaleArticledata.forcedPrice}</td>
				<td class="subDataField">${scaleArticledata.tareWeight}</td>
			</tr>
		</table>
	</c:forEach>

</form:form>
