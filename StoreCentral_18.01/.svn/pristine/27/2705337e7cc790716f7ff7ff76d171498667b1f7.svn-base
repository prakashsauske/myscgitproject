<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<!-- HostName :  <%=java.net.InetAddress.getLocalHost().getHostName()%> -->
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/userAccess.js?version=${properties.version}"></script>
<script type="text/javascript">
	/*var managerUM = "${properties.UserManagement}";
	var adminUM = "${properties.AdminRoleManagement}"; commenting as this is never used */
	/*var clearanceIN="${properties.clrDeactivate}";
	var competitionIN="${properties.compDeactivate}"; commenting as merged with create function code*/
	var storehostdefined="${properties.storehostdefined}";
	var environment="${properties.environment}";
	var createMarketing="${properties.CreateInstoreLocalMarketing}";
	var createSpecial="${properties.CreateInstoreSpecialActivity}";
	var createAdvertised="${properties.CreateInstoreAdvertising}";
	var viewMarketing="${properties.ViewInstoreLocalMarketing}";
	var viewSpecial="${properties.ViewInstoreSpecialActivity}";
	var viewAdvertised="${properties.ViewInstoreAdvertising}";
	var createClearance="${properties.InstoreClearanceCreate}";
	var createCompetition="${properties.InstoreCompetitionCreate}";
</script>

<audio id="notificationAlert" src="../../sounds/chimes.wav"
	preload="auto"></audio>
<audio id="broadcastAlert" src="../../sounds/chimes.wav" preload="auto"></audio>

<div class="notificationDetails broadcastDetails hideBlock"
	style="top: 65px; left: 500.5px;">
	<span class="arrow-up"></span>
	<div class="broadcastDetailsContent unactioned">
		<div class="broadcastTitle">Priority One Notifications (4)</div>
		<label class="settings"></label> <label class="notification-close">Close</label>

		<div class="broadcastItem unactioned">
			<div class="iconHolder">
				<label class="title homeLinkText">Refill Opportunity</label> <label
					class="message">7 Articles with Sales greater than Shelf
					Capacity</label> <label class="timestamp">3mins ago</label>
			</div>
			<label class="dismiss"></label>
		</div>
		<div class="broadcastItem viewed">
			<div class="iconHolder ">
				<label class="title homeLinkText">Stock Transfer Rejected</label> <label
					class="message">2 Stock Transfers rejected by ALH Venue /
					Warehouse</label> <label class="timestamp">35mins ago </label>
			</div>
			<label class="dismiss"></label>

		</div>
		<div class="broadcastItem">
			<div class="iconHolder ">
				<label class="title homeLinkText">Articles with
					Recall/Withdrawn status</label> <label class="message">3 articles
					in this store are recalled/withdrawn </label> <label class="timestamp">1hr
					5mins ago</label>
			</div>
			<label class="dismiss"></label>

		</div>
		<div class="broadcastItem lastItem">
			<div class="iconHolder ">
				<label class="message">2 Customer Orders due Today</label> <label
					class="timestamp">2hr 7 mins ago</label>
			</div>
			<label class="dismiss"></label>

		</div>
		<div class="broadcastTitle actioned">Previously Read (2)</div>
	</div>
	<div class="broadcastDetailsContent actioned hideBlock">
		<div class="broadcastTitle">Previously Read (2)</div>
		<label class="backBtn"></label>
		<div class="broadcastItem unactioned viewed">
			<div class="iconHolder">
				<label class="title homeLinkText">Awaiting Ticket Print</label> <label
					class="message">4 of the requested tickets awaits printing</label>
				<label class="timestamp">4hrs 2mins ago</label>
			</div>

		</div>
		<div class="broadcastItem viewed lastItem">
			<div class="iconHolder">
				<label class="title homeLinkText">New Online Collect in
					Store Orders to Pick</label> <label class="timestamp">4hrs 34mins
					ago</label>
			</div>

		</div>
	</div>
	<div class="broadcastDetailsContent settings hideBlock">
		<div class="broadcastTitle">Notify for</div>
		<label class="backBtn"></label>
		<div class="broadcastItem settings-radio">
			<input checked="" id="notification_allDepartments" type="radio"
				name="notificationSettings"> <label for="notification_allDepartments">All Departments</label>
		</div>
		<div class="broadcastItem settings-radio">
			<input id="notification_myDepartments" type="radio" name="notificationSettings"><label for="notification_myDepartments">My
			Departments</label>
		</div>
		<div class="broadcastTitle actioned">View Notifications (4)</div>
	</div>
</div>

<div id="broadCastContent">
	<div class="broadcastWrapper hideBlock">
		<div class="broadcastContent">
			<div class="broadcastText">IMPORTANT: 2 broadcasts requires
				your attention. Click to view them</div>
			<div class="broadcastAction actionBtn hideBlock">View All</div>
		</div>
	</div>

	<div class="lookupWrapper detailedBroadcastContent hideBlock">
		<div class="broadcastContent">
			<div class="broadcastTitleText">
				List of Broadcasts (2): <label class="linkBtn"
					id="closeBroadcastDetails"><label class="closeWindow">Close</label></label>
				<label class="actionBtn hideBlock">Acknowledge All</label>
			</div>
			<h3 class="broadcastLineItem">
				Night Fill Planner is currently down. We expect this should be
				resolved by 6pm. <label class="actionBtn">Done</label>
			</h3>
			<h3 class="broadcastLineItem">
				Temperature expected to be over 40 degrees today. Ensure you are
				adequately hydrated. <label class="actionBtn">Done</label>
			</h3>
		</div>
	</div>
</div>


<div class="header">

	<div class="logoWrapper">
		<div class="logoImg ${user.imgLocation}">&nbsp;</div>
	</div>
	<!-- End of logo wrapper -->
	<input type="hidden" id="posStore" value='${user.posStore}'> <input
		type="hidden" id="posSite" value='${user.siteNo}'> <input
		type="hidden" id="posSiteName" value='${user.siteName}'> <input
		type="hidden" id="firstName" value="${user.firstName}"> <input
		type="hidden" id="lastName" value="${user.lastName}"><input
		type="hidden" id="fullName" value="${user.fullName}"> <input
		type="hidden" id="salesOrg" value='${user.salesOrg}'><input
		type="hidden" id="siteList" value='${user.siteListString}'> <input
		type="hidden" id="department" value='${user.department}'><input
		type="hidden" id="loginFlag" value="${loginFlag}"> <input
		type="hidden" id="secretQuesFlag" value="${user.secretQuesFlag}"><input
		type="hidden" id="roleId" value="${user.roleID}"> <input
		type="hidden" id="loginUserId" value="${user.userId}"> <input
		type="hidden" id="userAccess" value='${user.userAccess}'><input
		type="hidden" id="district" value='${user.district}'> <input
		type="hidden" id="storeHost" value='${user.storeHost}'> <input
		type="hidden" id="sese"
		value='${pageContext.session.maxInactiveInterval}'>
		<input type="hidden" id="primaryDept" value='${user.primaryDeptString}' />
		<input type="hidden" id="ngboPilotStore" value='${user.NGBOStoreFlag}'>
		<input type="hidden" id="ngbo1S3StoreFlag" value='${user.NGBO1S3StoreFlag}'>
		
		<input type="hidden" id="directHome" value='${Key}'>
	<form class="searchByDept" action="">
		<input style="display: none" value='select' id='hierarchyID'></input>
		<input style="display: none" value='select' id='hierarchyLVL'></input>
		<input type="hidden" id="loggedInEncryptedSAPPwd" value='${user.loggedInEncryptedSAPPwd}'/>
	</form>

	<div id="printDataForDG" class="hideBlock">
		<div id="printbodyForDG" class="printbody"></div>
	</div>
	<div id="printDataForStockFill" class="hideBlock">
		<div id="printbodyForStockFill" class="printbody"></div>
	</div>

	<div class="globalLinksWrapper hideBlock">

		<div class="userProfile">

			<ul id="menu">
				<li class="globalLinkLabel">Username: <a href="#"
					class="globalLinkAccountName">${user.firstName}
						${user.lastName}</a>

					<ul>
						<li><a href="#">${properties.version}</a></li>
						<!--<c:if test="${user.roleID==properties.ADMIN}">
							<li><a href="../login/applicationSettings.htm">Application
									Settings</a></li>
						</c:if>-->
						<c:if
							test="${user.roleID!=properties.ADMIN && user.roleID!='ITS'&& user.roleID!='BR'&& user.roleID!='POSRP' &&  user.roleID!= 'STTM'	&& user.roleID!= 'RDOU'	&& user.roleID!= 'ITS1'	&& user.roleID!= 'ITS2'	&& user.roleID!= 'ITUA' && user.roleID!= 'SS' && user.roleID!='STOTM'}">
							<li class=""><a href="../prefer/userPreferences.htm">User
									Preferences</a></li>
						</c:if>

						<li class="changeStr"><a href="../login/changeStore.htm">Change
								Store</a></li>
						<li><a href="../login/resetPwdOnpageLoad.htm">Change
								Password</a></li>
						<c:if test="${user.NGBOStoreFlag eq 'Y'}">
							<li class=""><a href="../login/setSecretQues.htm">Set
									Security Question</a></li>
						</c:if>
						<li class="lastMenuItem"><a href="../login/logout.htm" id="logOutTrace" >Logout</a></li>
					</ul>
				</li>
			</ul>

		</div>
		<div class="store">
			<label class="globalLinkLabel">Store: ${user.siteNo} |
				${user.siteName}</label>
		</div>
	</div>

	<!-- start Alerts and notification -->
	<div class="globalLinksWrapper alertsWrapper hideBlock" id="headerNofifyArea">
		<div class="alertsIcon priorityOne notification-open">
			<label>4</label>
		</div>
		<div class="alertsIcon priorityTwo">
			<label>7</label>
		</div>
		<div class="alertsIcon priorityThree">
			<label>1</label>
		</div>
	</div>
	<!-- end Alerts and notification -->

</div>
<!-- End of Header -->

<div class="navWrapper">
	<ul class="sf-menu" id="mainmenu">
		<li id="home" class="home text-color"><a
			href="../login/goingHome.htm?disableKey=disableKey" class="homeLink">&nbsp;</a></li>
		<li id="lookUp"
			class="text-color ${properties.Lookup} iconlookupHomeLink headerLink"><a
			href="#">Lookup</a>
			<ul class="innermenu first-level">
				<li
					class="reportBtmBrdr ${properties.ArticlesCentral} hideBlock first-search"><a
					href="../article/onPageLoad.htm" class="text-color highlight">Articles</a></li>

				<li class="reportBtmBrdr ${properties.ArticlesLocal} first-search"><a
					href="../articlelookup/onPageLoad.htm" class="text-color highlight">Articles</a></li>
			</ul></li>
		<li id="orders"
			class="text-color ${properties.Orders} ordersHomeLink headerLink"><a
			href="#">Orders</a>
			<ul class="innermenu first-level">
					<!-- removed c:choose as for petrol banner it was navigating to old code-->
						<li
							class="reportBtmBrdr ${properties.EnquiryCentral} enquiry first-search"><a
							href="../allocation/onPageLoad.htm" class="text-color  highlight">Order
								Enquiry</a></li>
						<li
							class="reportBtmBrdr ${properties.EnquiryLocal} enquiry first-search"><a
							href="../orderInquiry/onPageLoad.htm"
							class="text-color  highlight">Order Enquiry</a></li>
				<!-- application settings CR <li
					class="reportBtmBrdr ${properties.CreateWarehouseOrder} first-search"><a
					href="../order/onPageLoadCreateManualOrder.htm"
					class="text-color  highlight">Create Warehouse Order</a></li> -->
				<!-- application settings CR<li
					class="reportBtmBrdr ${properties.CreateOrderOnReceipt} first-search"><a
					href="../poReceipt/onPageLoadPORecipt.htm"
					class="text-color  highlight">Create Order On Receipt</a></li>-->
				<!-- application settings CR <li
					class="reportBtmBrdr ${properties.CreateVendorOrder} first-search"><a
					href="../preq/onPageLoadPReq.htm" class="text-color  highlight">Create
						Vendor Order</a></li>-->
				<!-- application settings CR <li
					class="reportBtmBrdr ${properties.InterBranchTranfer} first-search"><a
					href="../ibtOrder/onPageLoad.htm" class="text-color  highlight">Inter
						Branch Transfer</a></li> -->
				<li
					class="reportBtmBrdr ${properties.uldSweep} first-search"><a
					href="../uldSweep/getULDSweep.htm" class="text-color  highlight">Process ULDs</a></li>						

			</ul></li>
		<li id="reports"
			class="text-color ${properties.Reports}  reportsHomeLink headerLink"><a
			href="#">Reports</a>

			<ul class="innermenu first-level">
				<!-- application settings CR<li
					class="reportBtmBrdr first-search  ${properties.reportStockTake} first-search"><a
					href="../report/loadStockTakeReport.htm" class="text-color highlight"> Stock Take </a></li>-->
				
				<li class="reportBtmBrdr subMenu"><!-- ${properties.ReportsOrder} --><a
					href="#" class="text-color">Orders</a>
					<ul class="innermenu">
						<!-- application settings CR <li
							class="reportBtmBrdr ${properties.ProduceLoadlist} first-search"><a
							href="../produce/onPageLoadProduceLoadListSearch.htm"
							class="text-color  highlight">Produce Load List</a></li>-->
						<li
							class="reportBtmBrdr ${properties.OrderBookReport} first-search"><a
							href="../manualOrderBook/onPageLoad.htm"
							class="text-color  highlight">Manual Order Book Report</a></li>

						 <li class="reportBtmBrdr ${properties.SUGOReport} first-search"><a
							href="../SUGOController/onPageLoad.htm"
							class="text-color highlight">SUGO Review Report</a></li>
					</ul></li>
				<li
					class="reportBtmBrdr subMenu"><!-- ${properties.ReportsReplenishment} --><a
					href="#" class="text-color">Replenishment</a>
					<ul class="innermenu">
						<li
							class="reportBtmBrdr ${properties.OrderRosterReport} first-search"><a
							href="../orderRosterReport/onPageLoad.htm"
							class="text-color  highlight">Order Roster Report</a></li>
						<!--  application setting CR <li
							class="reportBtmBrdr ${properties.DailyStoreProfiles} first-search"><a
							href="../dailyStoreProfile/onPageLoad.htm"
							class="text-color highlight">Daily Store Profiles</a></li>
						<li class="reportBtmBrdr ${properties.ZeroMPLReport} first-search"><a
							href="../zeroMPL/onPageLoad.htm" class="text-color highlight">Zero
								MPL Report</a></li> -->
						<li
							class="reportBtmBrdr ${properties.AutostockRplannedorders} first-search"><a
							href="../autoStockR/onPageLoad.htm" class="text-color  highlight">AUTOSTOCKR
								Planned Forecast</a></li>
					</ul></li>
				<li class="reportBtmBrdr ${properties.Finanace}  "><a href="#"
					class="text-color">Finance</a>
					<ul class="innermenu">
						<li
							class="reportBtmBrdr ${properties.DailyGoodsMovementSummary} first-search"><a
							href="../report/onPageLoad.htm" class="text-color highlight">Daily
								Goods Movement Summary</a></li>

						<li
							class="reportBtmBrdr ${properties.ElectronicDailyGoodsMovementSummary} first-search"><a
							href="../edgms/onPageLoadEDGMS.htm" class="text-color highlight">Electronic
								Daily Goods Movement Summary</a></li>
						<li
							class="reportBtmBrdr ${properties.eDGMSDiscrepanciesReport} first-search"><a
							href="../edgmsDiscrepancy/onPageLoad.htm"
							class="text-color highlight">eDGMS Discrepancies Report</a></li>
						<li
							class="reportBtmBrdr ${properties.InvoiceReconciliationReport} first-search"><a
							href="../invoiceRecon/onPageLoad.htm"
							class="text-color highlight">Invoice Reconciliation Report</a></li>


						<li
							class="reportBtmBrdr ${properties.WarehouseVarianceReport} first-search"><a
							href="../allocation/varianceOnPageLoad.htm"
							class="text-color  highlight">Warehouse Variance Report</a></li>
					</ul></li>

				<li
					class="reportBtmBrdr ${properties.CashOffice} subMenu ${properties.PosTabs}   "><a
					href="#" class="text-color">Cash Office</a>
					<ul class="innermenu">
						<li class="reportBtmBrdr ${properties.POSConsolidationReport}"><a
							href="../posconsolidation/onPageLoad.htm"
							class="text-color  highlight">POS Consolidation</a></li>
						<li class="reportBtmBrdr ${properties.POSDeclarationResult}"><a
							href="../posdeclaration/onPageLoad.htm"
							class="text-color  highlight">POS Declaration Result</a></li>
						<li class="reportBtmBrdr ${properties.PaidInPaidOut}"><a
							href="../paidinpaidout/onPageLoad.htm"
							class="text-color  highlight">Paid In &amp; Paid Out Report</a></li>
						<li class="reportBtmBrdr ${properties.ALHFinancialReport}"><a
							href="../posconsolidation/onPageLoad1.htm"
							class="text-color  highlight">ALH Financial DATA</a></li>
					</ul></li>



				<li
					class="reportBtmBrdr ${properties.Operations} subMenu ${properties.PosTabs} " ><a
					href="#" class="text-color">Operations</a>
					<ul class="innermenu">
						<li class="reportBtmBrdr ${properties.StarReport} first-search"><a
							href="../starreport/onPageLoad.htm" class="text-color highlight">STAR</a>
						</li>
						<li
							class="reportBtmBrdr ${properties.storeWeeklyMarkdowns} first-search">
							<a href="../storeWeekly/onPageLoad.htm"
							class="text-color highlight">Store Weekly Markdowns </a>
						</li>
						<li
							class="reportBtmBrdr ${properties.MarkdownDetails} first-search"><a
							href="../markdowndetails/onPageLoad.htm"
							class="text-color highlight">Markdowns - Detail</a></li>
						<li
							class="reportBtmBrdr ${properties.UnknownArticlesUnRanged} first-search">
							<a href="../unknownarticle/onPageLoad.htm"
							class="text-color highlight">Unknown or Unranged Articles</a>
						</li>
						<!-- <li class="reportBtmBrdr ${properties.storeWithUnkownArticle}">
										<a href="#" class="text-color highlight">Stores with Unknown or Unranged Artciles</a>
									</li>	
									<li class="reportBtmBrdr ${properties.manualMarkdowns}">
										<a href="#" class="text-color highlight">Manual Markdowns / Reduced to Clear Transactions</a>
									</li>	
									<li class="reportBtmBrdr ${properties.noSalesTrasactions}">
										<a href="#" class="text-color highlight">'No Sales' Transactions</a>
									</li> -->
						<li
							class="reportBtmBrdr ${properties.InvestigateTransaction} ${properties.PosTabs}">
							<a href="#" class="text-color highlight">Investigate
								Transactions</a>
							<ul class="">
								<li
									class="reportBtmBrdr ${properties.departmentSaleTransactions} ">
									<a href="../investigate/onPageLoad.htm?dropDown=deptSales"
									class="text-color highlight articleSoldMenu">Article Sold
										By Department</a>
								</li>

								<li class="reportBtmBrdr ${properties.operatorHistory} "><a
									href="../investigate/onPageLoad.htm?dropDown=operatorHistory"
									class="text-color highlight operatorMenu">Operator and
										Location History </a></li>
								<li class="reportBtmBrdr  ${properties.noSalesTransactions} ">
									<a href="../investigate/onPageLoad.htm?dropDown=noSales"
									class="text-color highlight noSalesMenu">No Sale
										Transactions</a>
								</li>
								<li class="reportBtmBrdr  ${properties.markdownTransactions} ">
									<a href="../investigate/onPageLoad.htm?dropDown=priceMarkdown"
									class="text-color highlight priceMarkdownMenu">Manual Price
										Override /RTC Transactions</a>
								</li>


								<li class="reportBtmBrdr  ${properties.savedTransactions} ">
									<a href="../investigate/onPageLoad.htm?dropDown=savedTrans"
									class="text-color highlight savedTransMenu">Unrecalled Saved
										Transactions</a>
								</li>
								<li class="reportBtmBrdr  ${properties.soldOverTransactions} ">
									<a href="../investigate/onPageLoad.htm?dropDown=soldOver"
									class="text-color highlight soldOverMenu">Sold Over
										Restricted Quantity</a>
								</li>
								<li class="reportBtmBrdr  ${properties.PriceInquiry} ">
									<a href="../investigate/onPageLoad.htm?dropDown=priceInquiry"
									class="text-color highlight priceInquiryMenu">Price Inquiry</a>
								</li>
							</ul>
						</li>
						<li class="reportBtmBrdr ${properties.VoidRefund} first-search">
							<a href="../voidrefund/onPageLoad.htm"
							class="text-color highlight">Voids/Refunds</a>
						</li>
						<!-- <li class="reportBtmBrdr ${properties.refunds}">
										<a href="#" class="text-color highlight">Refunds</a>
									</li> 
									
									 <li class="reportBtmBrdr ${properties.departmentSaleTransactions}">
										<a href="#" class="text-color highlight">Department Sale Transactions</a>
									</li>	
									<li class="reportBtmBrdr ${properties.operatorLocationHistory}">
										<a href="#" class="text-color highlight">Operator and Location History </a>
									</li>	
									<li class="reportBtmBrdr ${properties.savedTrasactions}">
										<a href="#" class="text-color highlight">Saved Transactions</a>
									</li>	
									<li class="reportBtmBrdr ${properties.soldOverRestrictedQty}">
										<a href="#" class="text-color highlight">Sold Over Restricted Quantity </a>
									</li> -->
						<li class="reportBtmBrdr ${properties.AgeVerificationDetail}"><a
							href="../ageVerificationDetail/onPageLoad.htm"
							class="text-color  highlight">Age Verification Detailed
								Report</a></li>
						<li class="reportBtmBrdr ${properties.AgeVerificationSummary}"><a
							href="../ageVerificationSummary/onPageLoad.htm"
							class="text-color highlight">Age Verification Summary Report
						</a></li>
					</ul></li>
				<li
					class="reportBtmBrdr ${properties.Sales} subMenu ${properties.PosTabs}   "><a
					href="#" class="text-color">Sales</a>
					<ul class="innermenu">
						<li class="reportBtmBrdr ${properties.StorePerformance}"><a
							href="../storeperfomance/onPageLoad.htm"
							class="text-color highlight">Store Performance</a></li>
						<li class="reportBtmBrdr ${properties.DepartmentSales}"><a
							href="../posdepartmentsales/onPageLoad.htm"
							class="text-color highlight">Department Sales and Tax Report
						</a></li>
						<li class="reportBtmBrdr ${properties.SalesByArticle}"><a
							href="../salesByArticle/onPageLoad.htm"
							class="text-color highlight">Sales by Article</a></li>
						<li class="reportBtmBrdr ${properties.SCOSalesSummary}"><a
							href="../salesSummary/onPageLoad.htm"
							class="text-color highlight">POS / SCO Sales Summary </a></li>
						<li class="reportBtmBrdr ${properties.ManaualFuelPromotions}"><a
							href="../manualFuelPromotions/onPageLoad.htm"
							class="text-color highlight">Manual Fuel Promotion Report</a></li>
						<li class="reportBtmBrdr ${properties.ManaualFuelSales}"><a
							href="../manualFuelSales/onPageLoad.htm"
							class="text-color highlight">Manual Fuel Sales Report</a></li>
					</ul></li>
				<li class="reportBtmBrdr  ${properties.ProdutionPlanner}  "><a
					href="../plannerReport/onPageLoad.htm" class="text-color highlight">Production
						Planner</a></li>
				<!-- <li class="reportBtmBrdr  ${properties.NightFillLabourPlan}  "><a
					href="../nightFillReport/onPageLoad.htm" class="text-color highlight">Night Fill Labour Plan</a></li>
					 -->
				<li
					class="reportBtmBrdr  ${properties.NightFillLabourPlan} "><!-- ${properties.NFLPTab}  --><a
					href="../breakLoad/onPageLoad.htm" class="text-color highlight">Night
						Fill Labour Plan</a></li>
				<li
					class="reportBtmBrdr ${properties.reportAdmin} subMenu "><a
					href="#" class="text-color">Admin</a>
					<ul class="innermenu">
					<li
							class="reportBtmBrdr first-search  ${properties.reportDeviceLog} first-search"><a
							href="../report/loadDeviceLogReport.htm"
							class="text-color highlight"> Device Log Report </a></li>
			</ul></li>
				<li
						class="reportBtmBrdr ${properties.reportStockMangement} subMenu "><a
						href="#" class="text-color">Stock Management</a>
						<ul class="innermenu" >
						<li class="reportBtmBrdr ${properties.GoodsMovementSummary} first-search"><a
						href="../goodMovement/goodMovementSummOnPageLoad.htm"
						class="text-color  highlight">Goods Movement Summary</a></li>
						<li
							class="reportBtmBrdr first-search  ${properties.reportGapScan} first-search"><a
							href="../gapScanReport/loadGapScanReport.htm" class="text-color highlight">
								Gap Scan Report </a></li>
						<li
					class="reportBtmBrdr first-search  ${properties.reportStockFill} first-search"><a
					href="#" class="text-color highlight"> Stock Fill </a></li>
					
					<li
							class="reportBtmBrdr first-search  ${properties.reportOverstock} first-search"><a
							href="../overstockReport/loadOverstockReport.htm"
							class="text-color highlight"> Overstock Investigation Report </a></li>
					<li	class="reportBtmBrdr first-search  ${properties.reportPLU} first-search"><a
							href="../PLUreport/loadPLUReport.htm" class="text-color highlight">PLU List Report
						</a></li>
							<li
					class="reportBtmBrdr first-search  ${properties.reportDG} first-search"
					id="reportDGID"><a href="#" class="text-color highlight">
						Dangerous & Hazardous Goods Report</a></li>
						<li
							class="reportBtmBrdr first-search  ${properties.reportOOC} first-search"><a
							href="../oocReport/loadOOCReport.htm" class="text-color highlight">
								Out of Code </a></li>
								<li
							class="reportBtmBrdr first-search ${properties.reportDSC} first-search"><a
							href="../dailyStockCheckReport/loadDailyStockReport.htm" class="text-color highlight">
								Daily Stock Check Report</a></li>
								<li
							class="reportBtmBrdr first-search  ${properties.reportLTO} first-search"><a
							href="../report/loadLTOReport.htm" class="text-color highlight">
								LTO Report</a></li>	
								<li
							class="reportBtmBrdr first-search  ${properties.ltoDiscrepanciesReport} first-search"><a
							target="_blank"  href="#" onclick="downloadDispReportPDF();"
							class="text-color highlight"  > LTO Discrepancy Report </a></li>
							<li
							class="reportBtmBrdr first-search  ${properties.ltoArticlestoFillReport} first-search"><a
							target="_blank" href="#" onclick="downloadArticlestoFillReportPDF();" class="text-color highlight"   > LTO Articles to Fill
								Report </a></li>
								<li
							class="reportBtmBrdr first-search  ${properties.reportInventory} first-search"><a
							href="../inventoryReport/loadInventoryReport.htm"
							class="text-color highlight"> Inventory Report </a></li>
						<li
							class="reportBtmBrdr first-search  ${properties.reportStockAdj} first-search"><a
							href="../stockAdjReport/loadStockAdjReport.htm"
							class="text-color highlight"> Adjustment Log Report </a></li>
						<li
							class="reportBtmBrdr first-search  ${properties.reportRTC} first-search"><a
							href="../rtcReport/loadRTCReport.htm" class="text-color highlight">
								Reduced to Clear Label Report </a></li>
						</ul>	
						
					</li>
				</ul></li>
		<li id="stockManage"
			class="text-color ${properties.StockManagement} stockManagementHomeLink headerLink"><a
			href="#">Stock Management</a>
			<ul class="innermenu first-level">
			
			<li class="reportBtmBrdr ${properties.LtoManagement} first-search"><a
					href="../ltoMgmnt/onPageLoad.htm"
					class="text-color  highlight">LTO Management</a></li>
				<li
					class="reportBtmBrdr first-search  ${properties.StockTake} first-search"><a
					href="../stockTake/loadStockTakePage.htm" class="text-color highlight">Stocktake</a></li>
				<li class="reportBtmBrdr ${properties.StockAdjustmentLocal} first-search"><a
					href="../articlelookup/onPageLoad.htm?param=navigate" class="text-color  highlight">Stock
						Adjustment</a></li>
				<!--  li class="reportBtmBrdr ${properties.StockAdjustmentCentral} first-search"><a
					href="../article/stockAdjustFromHome.htm" class="text-color  highlight">Stock
						Adjustment</a></li>-->
				<!--""-->
				<li class="reportBtmBrdr ${properties.StockTransfer} first-search"><a
					href="../stockTransfer/stockTransferOnPageLoad.htm"
					class="text-color  highlight">Stock Transfer</a></li>
				<li
					class="reportBtmBrdr subMenu ${properties.StockReplenishment} first-search"><a
					href="#" class="text-color">Replenishment</a>
					<ul class="innermenu">
						<li
							class="reportBtmBrdr ${properties.PlanOGrams} first-search"><!--   ${properties.ViewPlanogramDueDates} ${properties.PlanOGramSubMenu} --><a
							href="../planOGram/onPageLoad.htm" class="text-color">Plan-O-Grams</a></li>
					<!-- application settings CR	<li
							class="reportBtmBrdr ${properties.MPLSCAdjustment} first-search"><a
							href="../MPLorSCAdj/onPageLoad.htm" class="text-color">MPL /
								SC Adjustment</a></li> -->
					</ul></li>
				<li
					class="reportBtmBrdr ${properties.AutoStockRQueryManagement} subMenu "><a
					href="#" class="text-color">AutoStockR Query Management</a>
					<ul class="innermenu">
						<li
							class="reportBtmBrdr ${properties.ViewArticleQuery} first-search"><a
							href="../articleQuery/onPageLoad.htm" class="text-color">View
								Article Query</a></li>
						<li
							class="reportBtmBrdr ${properties.SubmitArticleQuery} first-search"><a
							href="../AQMInitiateQuery/onPageLoad.htm" class="text-color">Submit
								Article Query</a></li>
					</ul></li>
				<li class="reportBtmBrdr subMenu ${properties.claims} first-search"><a
					href="#" class="text-color"> Return to Vendor and Claims</a>
					<ul class="innermenu">
					<li class="reportBtmBrdr ${properties.claimsLookUp} first-search"><a
							href="../order/claimsOnPageLoad.htm"
							class="text-color  highlight">Claim Enquiry</a></li>
						<li
							class="reportBtmBrdr ${properties.returnCreateClaims} first-search"><a
							href="../order/claimsOnPageLoad.htm?param=createNewClaim"
							class="text-color  highlight">Raise New Claim</a></li>
					</ul>
					</li>
				<li
					class="reportBtmBrdr subMenu ${properties.RepairCentre} first-search"><a
					href="#" class="text-color">Repairs</a>
					<ul class="innermenu">
						<li
						class="reportBtmBrdr  ${properties.RepairAndSpares} first-search "><a
						href="../repair/onPageLoad.htm" class="text-color">Repair Order
							Enquiry</a></li>
				<%-- <c:if test="${user.salesOrg==1060}"> --%>
				
					
					<li
						class="reportBtmBrdr  ${properties.NewServiceOrder} first-search"><a
						href="../repair/redirectToCreateRepairServiceOrder.htm?fromPage=navBar"
						class="text-color">Create Repair Order</a></li>
					</ul>
					
					</li>
					
				<%-- <li
					class="reportBtmBrdr subMenu ${properties.createClaims} first-search"><a
					href="#" class="text-color">Return</a>
					<ul class="innermenu">
						<li
							class="reportBtmBrdr ${properties.returnCreateClaims} first-search"><a
							href="../order/claimsOnPageLoad.htm?param=createNewClaim"
							class="text-color  highlight">RTV and Claims</a></li>
					</ul></li> --%>

				

			</ul>
		<%-- <li id="promotions" class="text-color ${properties.Promotions}">
						<a href="#">Promotions</a>
						<ul class="innermenu">
							<li class="reportBtmBrdr ${properties.PromotionPlanning}">
								<a href="../promoPlanning/onPageLoad.htm" class="text-color">Promotions Planning</a>
							</li>
								<li class="reportBtmBrdr ${properties.PromotionAuditTrail}">
								<a href="../auditTrail/onPageLoadAuditTrail.htm" class="text-color">Audit Trail</a>
							</li>
								<li class="reportBtmBrdr ${properties.PromotionArticleReveiw}">
								<a href="../articleReview/onPageLoadArticleReview.htm" class="text-color">Promotion Article Review</a>
							</li>
						</ul>
					</li> --%>
		<li id="price"
			class="text-color ${properties.Pricing} pricingHomeLink headerLink"><a
			href="#">Pricing</a>

			<ul class="innermenu first-level   ">
				<li
					class="reportBtmBrdr subMenu ${properties.Promotions} ${properties.PromotionTabs} ${properties.InStorePromotionDisplayTAB} "><a
					href="#" class="text-color">Promotions</a>
					<ul class="innermenu">
						<li
							class="reportBtmBrdr ${properties.PromotionPlanning} ${properties.PromotionTabs}  first-search"><a
							href="../promoPlanning/onPageLoad.htm" class="text-color">Promotions
								Management</a></li>
						<li
							class="reportBtmBrdr ${properties.PromotionAuditTrail} ${properties.PromotionTabs}  first-search">
							<a href="../auditTrail/onPageLoadAuditTrail.htm"
							class="text-color">Audit Trail</a>
						</li>
						<li
							class="reportBtmBrdr ${properties.PromotionArticleReveiw} ${properties.PromotionTabs}  first-search">
							<a href="../articleReview/onPageLoadArticleReview.htm"
							class="text-color">Promotion Article Review</a>
						</li>
						<li
							class="reportBtmBrdr ${properties.InstorePromotionsDisplayReport} ${properties.PromotionTabs}  first-search"><a
							href="../instoreDisplayReport/onPageLoad.htm" class="text-color">In-Store
								Display Report</a></li>

						<li
							class="reportBtmBrdr ${properties.InStorePromotionDisplayCentral} first-search">
							<a href="../instore/onPageLoadCentral.htm" class="text-color">In-Store
								Display Promotions</a>
						</li>

					</ul></li>
				<li
					class="reportBtmBrdr subMenu ${properties.InStorePromotion} ${properties.PromotionTabs}  first-search"><a
					href="#" class="text-color">In-store Promotions</a>
					<ul class="innermenu">
						<li
							class="reportBtmBrdr ${properties.InStorePromotionDisplayLocal} first-search">
							<a href="../instore/onPageLoad.htm" class="text-color">Display</a>
						</li>

						<li
							class="reportBtmBrdr ${properties.InStorePromotionClearance} first-search"><a
							href="../instore/clearanceOnPageLoad.htm" class="text-color">Clearance</a></li>

						<li
							class="reportBtmBrdr ${properties.InStorePromotionCompetion} first-search"><a
							href="../instore/compOnPageLoad.htm" class="text-color">Competition</a></li>

						 <li
							class="reportBtmBrdr ${properties.InStorePromotionOtherMarkdown} first-search"><a
							href="../instore/otherMarkdownOnPageLoad.htm" class="text-color">Other Markdown</a></li> 


						<!-- <li
							class="reportBtmBrdr ${properties.MPLSCAdjustment} first-search"><a
							href="../MPLorSCAdj/onPageLoad.htm" class="text-color">MPL /
								SC Adjustment</a></li> -->


					</ul></li>
				<%-- <li id="PPSTool" class="text-color ${properties.PPSTool} PPSToolLink ${properties.PromoPlanSystemMenu} ">
			<a href="#" class="launch">${properties.PPSToolDisc}</a></li> --%>

				<li
					class="reportBtmBrdr ${properties.TobaccoPricing}  first-search"><!-- ${properties.TPBTAB}  --><a
					href="../tobacco/tobaccoPageLoad.htm" class="text-color">Tobacco
						Pricing</a></li>

			</ul></li>
		<!-- <li id="ticket"
			class="text-color ${properties.Ticketing} ticketingHomeLink headerLink"><a
			href="#">Ticketing</a>
			
</li> -->
		<%-- <c:if test="${user.salesOrg==1060}">
			<li id="repair"
				class="text-color ${properties.RepairCentre} repairHomeLink headerLink"><a
				href="#">Repair Centre</a>
	
				<ul class="innermenu first-level">
					
					<li
						class="reportBtmBrdr  ${properties.NewServiceOrder} first-search"><a
						href="../repair/redirectToCreateRepairServiceOrder.htm?fromPage=navBar"
						class="text-color">New Service Order</a></li>
	
				</ul></li>
		</c:if> --%>
		<li id="admin" class="text-color  ${properties.Admin} headerLink">
			<a href="#">Admin</a>
			<ul class="innermenu first-level">
				<%-- <li class="reportBtmBrdr ${properties.AdminRoleManagement}">
								<a href="../roleMgt/userRoleMgt.htm" class="text-color">User Role Management</a>
							</li> --%>		
						
				
					<li
					class="reportBtmBrdr ${properties.UserManagement} first-search"
					><!-- ${properties.AdminRoleManagement}  --><a href="#" class="text-color">User
						Management</a></li>
				<c:if test="${user.roleID==properties.ADMIN}">
					<li class="reportBtmBrdr applic-settings  first-search"><a href="../login/adminAppSettings.htm" class="text-color">Application
							Settings</a></li>
				</c:if>
				<li class="reportBtmBrdr ${properties.pilotStrategy} first-search">
				<a href="../login/pilotStrategy.htm" class="text-color">Pilot Strategy</a></li>
				<li class="reportBtmBrdr ${properties.broadcastCreate}  first-search"
						"><a href="../broadcast/create.htm" class="text-color">Broadcasts Management</a></li>
					<li class="reportBtmBrdr ${properties.NotificationSettings}  first-search"
						"><a href="../notification/settings.htm" class="text-color">Notification Settings</a></li>
	
				<!-- <li class="reportBtmBrdr ">
								<a href="../itAdmin/itAdminUserMgt.htm" class="text-color">IT Admin</a>
							</li> -->

			</ul>
		</li>
		<li id="otherTools"
			class="text-color lastMenuItem ${properties.OtherTools} otherToolsHomeLink headerLink"><a
			href="#">Other Tools</a>

			<ul class="innermenu first-level">


				<!--  li id="PPSTool"
					class="text-color ${properties.PPSTool} reportBtmBrdr PPSToolLink "><!-- ${properties.PromoPlanSystemMenu}
					<a href="#" class="launch">${properties.PPSToolDisc}</a>
				</li>-->


				<li id="ctLink"
					class="text-color ${properties.CentralTicketing} reportBtmBrdr PPSToolLink ">
					<a href="#" class="launch">${properties.CentralTicketingDesc}</a>
				</li>
				<!--commenting layby changes since it can be used for next release as per advice from Sindhu--> 
				<li id="lay_By"
					class="text-color ${properties.layByScreen} reportBtmBrdr lay_ByLink ">
					<a href="#" class="launch">${properties.layByScreenDesc}</a>
				</li>

			</ul></li>

	</ul>
	</ul>

</div>


<%@include file="passwordPopups.jsp"%>
<input type="hidden" id="menuBarOptions"
	value="<c:forEach items="${menuBarOptions}" var="menuBarOptions">${menuBarOptions},</c:forEach>">
<script>
	var Manager = 'MA';
	var StoreSupport = 'SS';
	var ITSupport = 'ITS';
	var ADMIN = 'ADM';
	var BusinessReview = 'BR';
	var Reporting = 'POSRP';
	
	$(document).ready(function() {
		localStorage.clear();
		$('#mainmenu').find('li ul.first-level').each(function() {
			$(this).css('left', $(this).parent().position().left);
		}); 
		setTimeout(function() {
			var id = '#' + $("#navBarHighlight").val();
			$(id).addClass('selectedMenu');
			$('.globalLinksWrapper').removeClass('hideBlock');
		}, 100);

	});
	function callAppSettings() {
		window.location.href = '../login/adminAppSettings.htm';
	}	
	function downloadDispReportPDF(){
		window.open('../ltoDispReport/printLTODiscrepancyReportPDF.pdf' ,'_blank');
		}
	function downloadArticlestoFillReportPDF(){
		window.open('../ltoArtFillReport/printLTOArticlestoFillReportPDF.pdf' ,'_blank');
		}
	$("#logOutTrace1").click(function (e)
	{
		var origin = "";
		if(e.hasOwnProperty('originalEvent'))
			{
			origin = "REAL";
			}
		else
			{
			origin = "FAKE";
			}
		$.ajax({
		      url: '../login/logoutTrace.htm',
		      data : {
		    	  origin : origin
				}
			}).done(function() {
				window.location.href='../login/logout.htm';
			}).fail(function() {
				window.location.href='../login/logout.htm';
			});

	});
	

	<%--$("#PPSTool").click(function() {
		window.open('../login/redirect.htm');
	});--%>
	
//commenting layby changes since it can be used for next release as per advice from Sindhu
function redirectToLayBy()
	{
		window.open('../login/redirectToLayBy.htm');
	}
	
	function redirectToCT() {
		window.open('../login/redirectToCT.htm');
	}
	
	function roleIdCall() {
		if ($('#roleId').val() == Manager)
			window.location.href = '../itAdmin/itAdminUserMgt.htm';
		else if ($('#roleId').val() == ITSupport
		//|| $('#roleId').val() == StoreSupport
		|| $('#roleId').val() == ADMIN || $('#roleId').val() == BusinessReview
				|| $('#roleId').val() == Reporting) {
			window.location.href = '../itAdmin/itAdminUserMgt.htm';
		} else {
			window.location.href = '../itAdmin/itAdminUserMgt.htm';
		}
	}
	//var sessionTimeOut = "${Session.Timeout}";
	$('#mainmenu #reports .subMenu').hover(function(){
	var screenHeight = $(window).height();
	var $elem = $(this).find('.innermenu');
	var submentOffsetObj = $elem.offset();
	var summenuTopPosition = submentOffsetObj.top;
	var submenuHeight = $elem.height()+summenuTopPosition;
	//console.log(13);
		if(submenuHeight > screenHeight){
			var temp = summenuTopPosition - (submenuHeight-screenHeight);
			submentOffsetObj.top = temp < 0 ? 0 : temp;
			$elem.offset(submentOffsetObj);
		}
	});
</script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_validation.js?version=${properties.version}"></script>