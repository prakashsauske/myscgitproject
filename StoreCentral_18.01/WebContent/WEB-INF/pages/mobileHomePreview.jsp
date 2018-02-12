<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Home</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />



<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
	<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
	<link href="../../styles/iFrame.css?version=${properties.version}" rel="stylesheet" type="text/css" />



</head>
<body>
	<input type="hidden" value="${model.param.option}">

	<div class="mainWrapper woolworths" style="height:518px!important">
	
		<div class="headWrapper hideBlock">
			<div class="header">
			
				<div class="logoWrapper">
					<div class="logoImg">&nbsp;</div>
				</div> <!-- End of logo wrapper -->
				
				
 				<div class="globalLinksWrapper">
					<div class="userProfile">
												
						<ul id="menu">
							<li class="globalLinkLabel">Username: <a href="#" class="globalLinkAccountName">James Smith</a>
							
								<ul>
									<li><a href="#">User Profile</a></li>
									<li><a href="#">Account Settings</a></li>
									<li class="lastMenuItem"><a href="#">Logout</a></li>
								</ul>
							</li>
						</ul>
						
					</div>
					<div class="store">
						<label class="globalLinkLabel">Store: Chester Hill</label>
					</div>
				</div>
				
			</div> <!-- End of Header -->
			
			
			
			<div class="navWrapper iframe-nav-bar">
				<ul class="sf-menu" id="mainmenu">
					<li id="home" class="home text-color selectedMenu">
						<a href="#" class="homeLink">&nbsp;</a>
					</li>
					<li class="text-color">
						<a href="#">Lookup</a>
						<ul class="innermenu">
							<li class="reportBtmBrdr">
								<a href="#" class="text-color">Articles</a></li>
							<li class="reportBtmBrdr">
								<a href="#" class="text-color">Stores</a>
							</li>
						</ul>
					</li>
					<li class="text-color">
						<a href="#">Orders</a>
					</li>
					
					<li class="text-color">
						<a href="#">Reports</a>
					</li>
					
					<li class="text-color">
						<a href="#">Stock Management</a>
					</li>
					<li class="text-color">
						<a href="#">Pricing</a>
					</li>
					<li class="text-color ">
						<a href="#">Ticketing</a>
					</li>
					<li class="text-color">
						<a href="#">Repair Centre</a>
					</li>
					<li class="text-color">
						<a href="#">Admin</a>
					</li>
					<li class="text-color lastMenuItem">
						<a href="#">Other Tools</a>
					</li>
					
					
				</ul>
			
			</div>	
		

		
		</div> <!-- End of head wrapper -->
		
		<div class="contentWrapper">

			<div class="homeContentWelcome hideBlock">
				<h2 class="homeContentWelcomeTitle">Welcome To Store Central</h2>

			</div>

			
			<div class="homeLinkBoxes">
			<c:set var="count" value="1"></c:set>
			<c:forEach items="${preferenceMap}" var="preferenceMap">
			<c:set var="value" value="${preferenceMap.value}"></c:set>
			
			
				<div class="homeLinkBox">
					<div class="homeLinkTextWrapper"
						onclick="javascript:window.location.href='${value.url}'">
						<div class="homeImgSize ${value.icon}"></div>
						<h4 class="centreAlign homeLinkText">${value.description}</h4>
					</div>

				</div>
				<c:if test="${count%2==0}"><div class="homeBorderHorz"></div></c:if> 
				
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


		
		</div>
		
		<div class="footerWrapper">
			<div class="footer">
				<div class="copyrightsInfo">
					Copyright &copy Woolworths 2013
				</div>
				<div class="policyInfo">
					<a href="#">Privacy Policy</a>
					<label class="divider">|</label>
					<a href="#">Terms of Use</a>
				</div>
			</div>
			
		</div>
		
	</div>



	<script>
	$(document).ready(function() {
		if($('.homeLinkBox').length%2==0)$('.homeBorderHorz').last().remove();
		var i=1;$('.homeLinkBox').each(function(){if(i>2)$(this).addClass('borderBottom');if(i%2==0)$(this).addClass('borderLast').removeClass('borderBottom');i++});
		$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	});
</script>



</body>
</html>