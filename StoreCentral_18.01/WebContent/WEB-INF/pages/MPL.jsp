<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Stock Search</title>



<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/MPL.js?version=${properties.version}"></script>


</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage">Stock Search</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->
		<form action="sohSearchArticle.htm" id="sohSubmit" method="get">

			<div class="lookupWrapper" id="lookupContainer">

				<div class="lookupTitleWrapper">
					<h2>Search</h2>
				</div>
				<!-- End of lookup title wrapper -->

				<div class="lookupParamWrapper">


					<div class="searchBox">

						<span id="numberInputs"> <input type="#"
							class="textbox textboxDefaultText"
							placeholder="Search article by" name="articleNo" id="articleNo"
							maxlength="20" value="${model.stockAdjustParam.articleNo}">
						</span>


					</div>
					<!-- End of main search box -->
					<label class="actionBtn" id="sohSearch">Go</label>
					<div class="searchByOptions">
						<input type="radio" name="articleType" value="ArticleNumber"
							id="ArticleNumber"><label for="ArticleNumber"
							class="labelText">Number</label> <input type="radio"
							name="articleType" value="Description" id="Description"><label
							for="Description" class="labelText">Description</label> <input
							type="radio" name="articleType" value="EAN" id="EAN"><label
							for="EAN" class="labelText">EAN / TUN / PLU</label>
					</div>



					<input type="hidden" id="searchResSize" value="${size}" /> <input
						type="hidden" value="" name="buttonVal" id="buttonVal" /> <input
						type="hidden" id="articleTypeFromService"
						value="${articleType.articleType}" />


				</div>
			</div>
			<div class="ContentTableWrapper">
				<div class="tableInfo">

					<div class="tableTitle nodataMessage" id="errorMsgDiv">
						<h4 id="msg">
							<c:if test="${not empty noDataFound}">${noDataFound}</c:if>
						</h4>

						<!-- End of table title -->



					</div>
				</div>
			</div>
			<div id="dialog-modal2" title="Article Description">
				<div class="popupContent">
					<div class="popupSearchWrapper" id="popupSearch">
						<h3>Article Description:</h3>
						<input type="#" placeholder="Enter supplier name"
							class="textbox textboxDefaultText" id="vendorDesc2"> <label
							class="actionBtn" id="goButtonSample2">Go</label>
					</div>
					<!-- End of popup search wrapper -->
					<label id="nodataMsg"></label>
					<div class="popupData" id="popupDataDiv2">



						<div class="tableInfo">

							<div class="tableTitle">
								<!--	<h4>
			Total <strong>526</strong> results found for '<strong
				class="searchString"> apple </strong>'
		</h4> -->
							</div>
							<!-- End of table title -->


						</div>
						<!-- End of table info -->
						<c:if test="${not empty multiArtRes}">
							<%
								int i = 0;
							%>
							<div class="ContentTableWrapper">
								<table class="ContentTable" cellspacing="0">
									<tr>
										<th>Article No</th>
										<th>Description</th>
										<th width="25px" class="lastColumn">&nbsp;</th>
									</tr>

									<c:forEach items="${multiArtRes}" var="vendorList">

										<tr>
											<td id="artNo<%=i%>">${vendorList.articleNo}</td>
											<td id="artName<%=i%>">${vendorList.description}</td>
											<td class="sorted lastColumn"><label
												class="linkBtn linkBtn2" id="<%=i%>"><label
													class="selectItem">Select</label></label></td>
										</tr>
										<%
											i++;
										%>
									</c:forEach>

								</table>
								<input type="hidden" value="<%=i%>" id="sizeCheck1" /> <input
									type="hidden" value="${nodata}" id="nodata" />

							</div>
							<!-- End of content table wrapper -->
						</c:if>

					</div>
					<!-- End of pop up data -->
					<div class="popupActions hideBlock">
						<label class="actionBtn">Select & Close</label> <label
							class="actionBtn">Cancel</label>
					</div>

				</div>
				<!-- End of popupContent -->

			</div>
			<input type="hidden" id="multiArtIndex" name="multiArtIndex" value="" />
		</form>
		<input id="navBarHighlight" type="hidden" value="stockManage" />
	</div>

	<%@include file="footer.jsp"%>





	<script>
	//document.forms[0].autocomplete="off";
	$( "#dialog-modal2" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 700
	});
	$(".secondaryActionBtn").click(function(e) {

		
		window.location.href="../login/goingHome.htm";
	});
	//$("#dialog-modal2").parent().addClass("popupWrapper");
	
	
	</script>

</body>
</html>
