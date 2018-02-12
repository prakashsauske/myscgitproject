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
			<td class="dataLabel">Article No</td>
			<td class="dataLabel">Internal Id</td>
			<td class="dataLabel">Product Category Description</td>
			<td class="dataLabel">Product Category Hierarchy Id</td>
			<td class="dataLabel">Product Category Hierarchy Description</td>
			<td class="dataLabel">Product Category Hierarchy Type 1</td>
			<td class="dataLabel">Product Category Hierarchy Type</td>

		</tr>

		<c:forEach items="${articleProductCategoryList}"
			var="articleProductCategory" varStatus="artInvInfo">
			<tr class="dataRow">
				<td class="dataField">${articleProductCategory.articleNo}</td>
				<td class="dataField">${articleProductCategory.internalId}</td>
				<td class="dataField">${articleProductCategory.prodCatDescription}</td>
				<td class="dataField">${articleProductCategory.prodCatHierId}</td>
				<td class="dataField">${articleProductCategory.prodCatHierDes}</td>
				<td class="dataField">${articleProductCategory.prodCatHierty1}</td>
				<td class="dataField">${articleProductCategory.prodCatHierTyp}</td>

			</tr>
		</c:forEach>
	</table>




</form:form>
