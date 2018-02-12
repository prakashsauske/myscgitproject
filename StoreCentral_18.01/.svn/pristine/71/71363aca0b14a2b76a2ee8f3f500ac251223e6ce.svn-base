<%@ page isErrorPage="true"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="ISO-8859-1">
<title>Store Portal - Application Error</title>
<link rel="stylesheet" href="styles/detailed.css?version=${properties.version}" />
<link rel="shortcut icon" href="images/woolworths-icon.jpg">
</head>
<body>
	<h1>
		<a href="home.htm" style="text-decoration: none"> <img
			src="images/WOWLogo1.png" style="border: 0; vertical-align: middle">
			Store Portal
		</a>
	</h1>
	<h1>
		Web app encountered an error <span>:(</span>
	</h1>
	<p>
		Use browser back button and try accessing the page again. <br>Alternatively
		send the below error details to the tech support team.
	</p>
	<br>
	<!-- Get the exception object -->
	<c:set var="exception"
		value="${requestScope['javax.servlet.error.exception']}" />
	<!-- Exception message(s) -->
	<table class="dataContent" style="width: 50%">
		<tr class="dataRow">
			<td class="dataField">Error Message :</td>
			<td>${exception.message}</td>
		</tr>
		<tr class="dataRow">
			<td class="dataField">Cause :</td>
			<td>${exception.cause.message}</td>
		</tr>
	</table>
	<!-- Stack trace -->
	<table class="dataContent" style="width: 50%">
		<tr class="dataRow">
			<td class="dataField">Error Details for Tech Support</td>
		</tr>
		<tr class="dataRow">
			<td>
				<jsp:scriptlet>exception.printStackTrace(new java.io.PrintWriter(out));</jsp:scriptlet>
			</td>
		</tr>
	</table>
</body>
</html>