<%@ page language="java" isErrorPage="true"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Store Portal - Page Not Found</title>
<link rel="stylesheet" href="./styles/detailed.css?version=${properties.version}" />
<link rel="shortcut icon" href="images/woolworths-icon.jpg">
</head>
<body>
	<table style="width: 90%; text-align: center;">
		<tr>
			<td style="width: 1%; text-align: left; vertical-align: bottom;">
				<a href="#" onclick="history.back()"><img
					src="images/back_button1.png"></a>
			</td>
			<td style="width: 99%; text-align: center; vertical-align: middle;"><a
				href="home.htm" style="text-decoration: none"> <img
					src="images/WOWLogo1.png" style="border: 0; vertical-align: middle">
			</a></td>
		</tr>
	</table>
	<br>
	<h1>
		Page not found <span>:(</span>
	</h1>
	<p>Sorry, but the page you were trying to view does not exist.</p>
	<p>It looks like this was the result of either:</p>
	<ul>
		<li>a mistyped address</li>
		<li>page temporary unavailable being under construction</li>
	</ul>
	<br>
	<p>
		<!-- Error Code: ${pageContext.errorData.statusCode} -->
		<b>Request URI:</b>
		${pageContext.request.scheme}://${header.host}${pageContext.errorData.requestURI}
	</p>
</body>
</html>