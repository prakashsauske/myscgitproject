<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<title>Article Lookup</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />	

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>

<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>
<style>
.ppsNotAvil{
color: #4ba4c4;
font-size: 1.333em;
padding-top: 50px;
text-align: center;
}
</style>
</head>
<body>
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
		<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value=""/> <!--value="PPSTool"  -->

		</div>
		<!-- End of head wrapper -->

		<div class="contentWrapper lookup">

		<div class="ppsNotAvil">PPS TOOL Not Available</div>

		</div>
		<!-- End of content wrapper -->


	</div>
	<%@include file="footer.jsp"%>



</body>
</html> 