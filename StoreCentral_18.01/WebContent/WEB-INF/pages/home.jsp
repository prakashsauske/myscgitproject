<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Home</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?vertion=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script src="../../scripts/home.js?vertion=${properties.version}"></script>
<script src="../../scripts/pwdManagement.js?vertion=${properties.version}"></script>

<script>
	$(document).ready(function() {
		if ($('.homeLinkBox').length % 3 == 0)
			$('.homeBorderHorz').last().remove();
		var i = 1;
		$('.homeLinkBox').each(function() {
			if (i > 3)
				$(this).addClass('borderBottom');
			if (i % 3 == 0)
				$(this).addClass('borderLast').removeClass('borderBottom');
			if($('.homeLinkBox').length == i)
				$(this).addClass('borderLast').removeClass('borderBottom');
			i++;
		});
		$("#menu").menu({
			position : {
				my : "right top",
				at : "right top+20"
			}
		});
		rearrangeShortCuts();
	});
</script>
</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>


		</div>
		<!-- End of head wrapper -->

		<div class="contentWrapper">
			<input type="hidden" name="inStore" id="inStore" value="${inStore}"> 
			<input type="hidden" value="${option}" id="option" /> <input
				type="hidden" value="${changeStoreFlag}" id="changeStoreFlag" />
				<div class="hideBlock" id="notifyData" >${notify}</div>

			<div class="homeContentWelcome">
				<h2 class="homeContentWelcomeTitle">Welcome To Store Central</h2>

			</div>


			<div class="homeLinkBoxes">
				<c:set var="count" value="1"></c:set>
				<c:forEach items="${preferenceMap}" var="preferenceMap">
					<c:set var="value" value="${preferenceMap.value}"></c:set>

<c:choose>
					<c:when test="${(preferenceMap.key == 'AC_TKCT') || (preferenceMap.key == 'AC_LAYBY')}">
					<div class="homeLinkBox ${preferenceMap.key}">
						<div class="homeLinkTextWrapper"
							onclick="window.open('${value.url}','_blank')">
							<div class="homeImgSize  ${value.icon}"></div>
							<h4 class="centreAlign homeLinkText">${value.description}</h4>
						</div>

					</div>
					</c:when>
					<c:otherwise>
					<div class="homeLinkBox ${preferenceMap.key}">
						<div class="homeLinkTextWrapper"
							onclick="javascript:window.location.href='${value.url}'">
							<div class="homeImgSize  ${value.icon}"></div>
							<h4 class="centreAlign homeLinkText">${value.description}</h4>
						</div>

					</div>
					</c:otherwise>
</c:choose>					
					<c:if test="${count%3==0}">
						<div class="homeBorderHorz"></div>
					</c:if>

					<%-- <c:when test="${preferenceMap.key=='OD'}">
				
				<div class="homeLinkBox">
					<div class="homeLinkTextWrapper"  onclick="javascript:window.location.href='../order/onPageLoad.htm'">
						<div class="homeImgSize ordersHome"></div>
						<h4 class="centreAlign homeLinkText">Orders</h4>

					</div>

				</div>
				<c:if test="${count%3==0}"><div class="homeBorderHorz"></div></c:if> 
				</c:when>
			<c:when test="${preferenceMap.key=='RP'}">
				<div class="homeLinkBox">
					<div class="homeLinkTextWrapper"
					onclick="javascript:window.location.href='../sohAdjustLog/onPageLoad.htm'">
						<div class="homeImgSize reportsHome"></div>
						<h4 class="centreAlign homeLinkText">Reports</h4>
					</div>
				</div>
				<c:if test="${count%3==0}"><div class="homeBorderHorz"></div></c:if> 
					</c:when>
               
               
                
                <c:when test="${preferenceMap.key=='SM'}">
				<div class="homeLinkBox">
					<div class="homeLinkTextWrapper"
						onclick="javascript:window.location.href='../article/stockAdjustFromHome.htm'">
						<div class="homeImgSize stockManagementHome"></div>
						<h4 class="centreAlign homeLinkText">Stock Management</h4>
					</div>

				</div>
				<c:if test="${count%3==0}"><div class="homeBorderHorz"></div></c:if> 
				</c:when>
				
				<c:when test="${preferenceMap.key=='PR'}">
				<div class="homeLinkBox">
					<div class="homeLinkTextWrapper">
						<div class="homeImgSize pricingHome"></div>
						<h4 class="centreAlign homeLinkText">Pricing</h4>
					</div>
				</div>
				<c:if test="${count%3==0}"><div class="homeBorderHorz"></div></c:if> 
				</c:when>
				
				<c:when test="${preferenceMap.key=='TK'}">
				<div class="homeLinkBox">
					<div class="homeLinkTextWrapper">
						<div class="homeImgSize ticketingHome"></div>
						<h4 class="centreAlign homeLinkText">Ticketing</h4>
					</div>

				</div>
				<c:if test="${count%3==0}"><div class="homeBorderHorz"></div></c:if> 
				</c:when> --%>

					<c:set var="count" value="${count+1}"></c:set>
				</c:forEach>
			</div>
			
			<div class="homeLinkBoxesNew hideBlock">
			
			</div>
		</div>

	</div>
	
	<div class="pageErrorsWrapper hideBlock" id="notifyArea" onclick="$('#notifyArea').addClass('hideBlock')">
			<div class="pageErrorsContent">
				<div class="pageErrorsTitle">
					<h4 class="title">Your access expiry Notification!</h4>
					<a class="close" title="Close" onclick="$('#notifyArea').addClass('hideBlock')">Close</a>
					<div  class="contentList">
					<p class="description">RoleName access to store #### - store name is due to expire in X day(s). </p>
					</div>
				</div> <!-- End of quick help title -->
				<div class="content">
					
					<h4 class="title">What next?</h4>
					<ol>
						<li id="whatNextArea">Inform Administrator / Store Manager if extension is required.</li>
					</ol>
				</div> <!-- End of content -->
			</div> <!-- End of quick help content -->	
		</div>
		
	<%@include file="footer.jsp"%>
	<%@include file="verifyStr.jsp"%>

	<input id="navBarHighlight" type="hidden" value="home" />
	<input id="passFlag" type="hidden" value="" />
	<input id="passExpDate" type="hidden" value="${user.expiryDate}" />
	<input id="secQues" type="hidden" value="${secQues}" />
	<input id="timOffline" type="hidden" value="${timOffline}" />
	<input id="timMessage" type="hidden" value="${timMessage}" />
	<input id="pwdExpIn" type="hidden" value="${pwdExpIn}" />
	



</body>
</html>