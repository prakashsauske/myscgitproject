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
			<td class="dataField">Description</td>

		</tr>

		<c:forEach items="${articleDescriptionList}" var="articleDescription"
			varStatus="artInvInfo">
			<tr class="dataRow">
				<td class="subDataField">${articleDescription.articleNo}</td>
				<td class="subDataField">${articleDescription.description}</td>

			</tr>
		</c:forEach>
	</table>



</form:form>
