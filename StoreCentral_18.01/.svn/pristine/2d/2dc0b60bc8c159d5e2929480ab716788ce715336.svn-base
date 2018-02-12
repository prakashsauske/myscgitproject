<!DOCTYPE html>
<html>
<head>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>In-store Display Promotion</title>



<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?vertion=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?vertion=${properties.version}" rel="stylesheet"
	type="text/css" />

<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.5/angular.min.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreationCentral.js?vertion=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils_Central.js?vertion=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_validation_Central.js?vertion=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/autoComplete.js?vertion=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreationAngular.js?version=${properties.version}"></script>
<link href="../../styles/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />


</head>
<body ng-app="myapp">
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" value="${isbigw}" id="isBigw" /> <input
				type="hidden" value="${user.imgLocation}" id="currentBanner" />
				<input type="hidden" id="cmpDisplayQtyPer" value="${model.restrictionParam.cmpDisplayQtyPer}">
				<input type="hidden" id="cmpBuildQuantity" value="${model.restrictionParam.cmpBuildQuantity}">
				<input type="hidden" id="cmpStoreDemand" value="${model.restrictionParam.cmpStoreDemand}">
				<input type="hidden" id="cmpBuildQuantityPer" value="${model.restrictionParam.cmpBuildQuantityPer}">
				<input type="hidden" id="cmpDisplayQty" value="${model.restrictionParam.cmpDisplayQty}">
				<input type="hidden" id="daysOut" value="${model.restrictionParam.daysOut}">
			<c:forEach items="${addedArticles}" var="element">
				<input type="hidden" value="${element}" name="addedArticleList" />
			</c:forEach>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="hideBlock">Pricing</li>
						<li class="hideBlock">In Store Promotion</li>
						<li class="currentPage">Display</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<span><label class="loading hideBlock" id="statusImg">We
							are getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label></span>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
		<form:form id="submitQuery" modelAttribute="InstoreSearchParam">

			<div class="contentWrapper orderDetails">

				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4 class="sectionTitle">In-store Display Promotion</h4>
						</div>
						<!-- End of table title -->

						<!-- <div class="instructionalText " id="instructionalText1">
							<label>Check existing draft list, select articles for
								display, and click 'Proceed to Create'.</label>
						</div> -->
						<div class="instructionalText hideBlock" id="instructionalText2">
							<label>Input necessary details, validate, and then
								create!</label>
						</div>

					</div>
					<!-- End of table info -->


					<div class="tableActionsBtnsWrapper">
						<div class="lookupActionWrapper">
							<label class="linkBtn" id="addActionBtn"><label
								class="addRow">Add Article</label></label> <label class="linkBtn"
								id="filterOpen" style="display: none;"> <label
								class="filter">Apply Filters</label>
							</label> <label class="linkBtn hideBlock" id="filterClear"
								style="display: none;"> <label class="negativeFlag">Clear
									Filters</label>
							</label>


							<div class="errorDiv hideBlock" id="errorMsgDiv">
								<label id='errorMsg'>No article found for '<strong
									id="notfoundArticle">3234</strong>'. Please try a different
									number.
								</label> <label class="closeMessage"
									onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
							</div>
							&nbsp

						</div>
						<!-- End of lookup action wrapper -->


					</div>
					<!-- End of table actions btn wrapper -->

					<div class="tableActionsWrapper" id="tableAddAction">

						<form method="POST" action="" id="">
							<div class="formWrapper">

								<div class="parameter">
									<label for="article" class="mandatory">Article</label> <input
										type="#" class="textbox articleSearchText" id="article"
										placeholder="Search article by" tabindex="1" name="sr_article">
									<div class="searchByOptions">
										<input type="radio" checked="" id="number" value="number"
											name="sr_searchOption"><label class="labelText"
											for="number">Number</label> <input type="radio"
											id="description" value="description" name="sr_searchOption"><label
											class="labelText" for="description">Description</label> <input
											type="radio" id="reference" value="reference"
											name="sr_searchOption"><label class="labelText"
											for="reference">EAN</label>
									</div>
								</div>
								<!-- End of parameter -->


								<div class="parameter">
									<label for="store" class="">Start Date</label> <input type="#"
										class="textbox defaultTextbox inputDate" id="start"
										placeholder="dd/mm/yyyy" name="sr_startDate" maxlength="10"
										tabindex="2">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="store" class="">End Date</label> <input type="#"
										class="textbox defaultTextbox inputDate" id="end"
										placeholder="dd/mm/yyyy" name="sr_endDate" maxlength="10"
										tabindex="3">
								</div>
								<!-- End of parameter -->


								<!-- <div class="parameter" data-isbigw="$(isbigw)">
									<c:if test="${isbigw==true}">
										<label for="display2" class="">Advertising Display</label>
										<select class="combobox" name="sr_adType" style="width: 78px;"
											id="adType">
											<option>Select</option>
											<c:forEach items="${displaylist}" var="element">
												<option value="${element.display_code}">${element.display_code_desc}</option>
											</c:forEach>

										</select>
									</c:if>
								</div>-->


								<!-- End of parameter -->

								<div class="formActions">
									<label class="actionBtn" id="searchAndAdd">Search &amp;
										Add</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
						</form>

					</div>
					<!-- End of table Actions Wrapper -->



					<table cellspacing="0"
						class="ContentTable treetable drilldownTable hideBlock"
						id="promoList">
						<tbody id="promoArticleList">
							<tr>
								<th rowspan="2" width="10px" data-addon-sh><input
									type="checkbox" id="promolistcheckboxall"></th>
								<th rowspan="2" width="20px" data-addon>&nbsp;</th>
								<th rowspan="2" class="headH">Article</th>
								<th rowspan="2" class="headH">Description</th>
								<th rowspan="2" class="centerValue columnDivider headH"
									width="120px">UOM</th>
								<th class="centerValue columnDivider" colspan="3"
									data-changeColspan>Date</th>
								<th class="centerValue columnDivider" colspan="2" data-addon>Forecast</th>
								<th class="centerValue columnDivider" rowspan="2" data-addon>OM</th>
								<th class="centerValue columnDivider" colspan="4" data-addon>Store</th>
								<!--<c:if test="${isbigw==true}">
									<th class="centerValue columnDivider">Advertising</th>
								</c:if>-->
								<th class="centerValue columnDivider" rowspan="2" width="120px">Status</th>
								<th class="lastColumn centerValue" width="30px" rowspan="2">Actions</th>
							</tr>


							<tr class="subHeader">

								<th class="centerValue" width="90px">Start Date</th>
								<th class="centerValue " width="90px">End Date</th>
								<th class="centerValue columnDivider" data-addon>Base</th>
								<th class="centerValue columnDivider" data-addon>Prom</th>
								<th class="centerValue" data-addon>Demand</th>
								<th class="centerValue" data-addon>Display</th>
								<th class="centerValue columnDivider" data-addon>Build</th>
								<th class="centerValue columnDivider" width="90px" data-addon>Delivery
									Date</th>
								<!--<c:if test="${isbigw==true}">
									<th class="centerValue">Display</th>
								</c:if>-->
							</tr>

							<tr class="filterRow hideBlock drillsOpenDefault">

								<td>&nbsp;</td>
								<td><input type="#" class="textbox Filter"
									data-filterfor="articleNo"></td>
								<td><input type="#" class="textbox Filter"
									data-filterfor="description"></td>
								<td class="columnDivider"><input type="#"
									class="textbox Filter" data-filterfor="uom"></td>

								<td><input type="#" class="textbox inputDate Filter"
									data-filterfor="startDate" placeholder="dd/mm/yyyy"
									id="startdatefilter"></td>
								<td><input type="#" class="textbox inputDate Filter"
									data-filterfor="endDate" placeholder="dd/mm/yyyy"
									id="enddatefilter"></td>
								<td data-addonfilter class="columnDivider"><input type="#"
									class="textbox inputDate Filter" data-filterfor="deliveryDate"
									placeholder="dd/mm/yyyy" id="deliverydatefilter"></td>
								<td data-addonfilter><input type="#"
									class="textbox numberBox Filter" data-filterfor="base"></td>
								<td data-addonfilter><input type="#"
									class="textbox numberBox Filter" data-filterfor="prom"></td>
								<td data-addonfilter><input type="#"
									class="textbox numberBox Filter" data-filterfor="demand"></td>
								<td data-addonfilter><input type="#"
									class="textbox numberBox Filter" data-filterfor="display"></td>
								<td class="columnDivider" data-addonfilter><input type="#"
									class="textbox numberBox buildFilter" data-filterfor="build"></td>
								<!--<c:if test="${isbigw==true}">
									<td class="columnDivider centerValue"><input type="#"
										class="textbox Filter" data-filterfor="advDisplay"></td>
								</c:if>-->
								<td class="columnDivider centerValue"><input type="#"
									class="textbox Filter" data-filterfor="status"></td>

								<td>&nbsp;</td>
							</tr>

						</tbody>
					</table>
					<div id="overlay"></div>
				</div>
				<!-- End of content table wrapper -->

				<div class="pageActions ${properties.InstoreDisplayCreate} hideBlock" id="beforePublish">
					<label class="actionBtn" id="beforePublishBtn"><label
						class="thumbUp">Proceed to Create</label></label>

				</div>
				<div class="pageActions hideBlock" id="afterPublishDiv">
					<label class="actionBtn" id="validateButton"><a><label
							class="validate">Validate</label></a></label> <label
						class="actionBtn disabled" id="PublishButton"><a><label
							class="thumbUp">Create</label></a></label>
				</div>
				<!-- End of page actions-->




			</div>

		</form:form>

		<!-- End of content wrapper -->


		<div
			class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
			tabindex="-1" role="dialog" aria-describedby="dialog-mulipleArticles"
			aria-labelledby="ui-id-1" style="display: none;">
			<div
				class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
				<span id="ui-id-1" class="ui-dialog-title">Select Articles</span>
				<button
					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
					role="button" aria-disabled="false" title="close">
					<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
						class="ui-button-text">close</span>
				</button>
			</div>
			<div id="dialog-mulipleArticles"
				class="ui-dialog-content ui-widget-content">
				<div class="popupContent">

					<div class="popupData popupTitle">

						<h4 class="warning">
							Total <strong id="searchArticleCount">3</strong> articles found
							for '<strong id="searchText">T-shirt</strong>'
						</h4>

					</div>
					<!-- End of pop up data -->


					<div class="ContentTableWrapper">
						<table class="ContentTable" cellspacing="0">
							<tbody id="articleSearchTbody">
								<tr>
									<th>Article</th>
									<th>Description</th>
									<th class="centerValue">UOM</th>
									<th width="40px" class="centerValue lastColumn">Select</th>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- End of content table wrapper -->

					<div class="popupActionsWrapper">
						<span class="popupActions"> <label
							class="secondaryActionBtn">Cancel</label> <label
							class="actionBtn" id="addtolist">Add to List</label>
						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
	</div>
	
	<div
			class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
			tabindex="-1" role="dialog" aria-describedby="dialog-ISDconfirmation"
			aria-labelledby="ui-id-2" style="display: none;">
			<div
				class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
				<span id="ui-id-2" class="ui-dialog-title">Confirmation</span>
				<button
					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
					role="button" aria-disabled="false" title="close">
					<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
						class="ui-button-text">close</span>
				</button>
			</div>
			<div id="dialog-ISDconfirmation"
				class="ui-dialog-content ui-widget-content">
				<div class="popupContent">

					<div class="popupData popupTitle">

						<h4 class="warning" id="ISDmessage">
							
						</h4>

					</div>
					<!-- End of pop up data -->


					<div class="popupActionsWrapper">
						<span class="popupActions" id="proceed"> <label
							class="actionBtn">Proceed to Create </label>

						</span><span class="popupActions" id="cancelProceed"> <label
							class="secondaryActionBtn">Cancel </label>
						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
		</div>
		
		<div
			class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
			tabindex="-1" role="dialog" aria-describedby="dialog-confirmation"
			aria-labelledby="ui-id-2" style="display: none;">
			<div
				class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
				<span id="ui-id-2" class="ui-dialog-title">Confirmation</span>
				<button
					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
					role="button" aria-disabled="false" title="close">
					<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
						class="ui-button-text">close</span>
				</button>
			</div>
			<div id="dialog-confirmation"
				class="ui-dialog-content ui-widget-content">
				<div class="popupContent">

					<div class="popupData popupTitle">

						<h4 class="warning" id="message">
							Please note that In-store Promotions will be available in
							Promotions Planning screens after <strong>approximately
								2 hours</strong>, once it is successfully created.
						</h4>

					</div>
					<!-- End of pop up data -->


					<div class="popupActionsWrapper">
						<span class="popupActions" id="ok"> <label
							class="actionBtn">Ok </label>

						</span><span class="popupActions" id="cancel"> <label
							class="secondaryActionBtn">Cancel </label>
						</span><span class="popupActions hideBlock confirmation-nobtn" id="nobtn">
							<label class="actionBtn">No</label>
						</span> <span class="popupActions hideBlock confirmation-yesbtn"
							id="yesbtn"> <label class="actionBtn">Yes </label>
						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
		</div>
		<input id="navBarHighlight" type="hidden" value="price" />
	</div>
	<div class="quickHelpWrapper hideBlock">
		<div class="quickHelpContent">
			<div class="quickHelpTitle">
				<h4 class="title">Filters</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">The filters allows you to minimise the
					list of records and let you quickly find relevant information.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">How to use it?</h4>
				<ul>
					<li>Identify the columnn you want to filter</li>
					<li>Locate the input box in the filter row corresponding to
						the identified column</li>
					<li>Start typing letters or numbers based on the column values</li>
					<li>The list filters based on every character or number entry</li>
					<li>Click on 'Clear Filter' to remove filters</li>
				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>
	<div class="pageErrorsWrapper hideBlock temp-fix-pop-up"
		id="errorWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Errors</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">The In-store Display creation failed for
					few articles.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<h4 class="title">Reason for failure</h4>
				<ol id="validateErrors">

				</ol>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div class="pageErrorsWrapper hideBlock temp-fix-pop-up"
		id="warningWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">WARNING</h4>
				<a class="close" title="Close">Close</a>

			</div>
			<!-- End of quick help title -->
			<div class="content">

				<ol id="warningList">

				</ol>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

	<div
		class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
		tabindex="-1" role="dialog"
		aria-describedby="dialog-mulipleArticlesCONFIRM"
		aria-labelledby="ui-id-1" style="display: none;">
		<div
			class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-1" class="ui-dialog-title">Select Articles</span>
			<button
				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
				role="button" aria-disabled="false" title="close">
				<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
					class="ui-button-text">close</span>
			</button>
		</div>
		<div id="dialog-mulipleArticlesCONFIRM"
			class="ui-dialog-content ui-widget-content">
			<div class="popupContent">

				<div class="popupData popupTitle">

					<h4 class="warning">Articles are already on an In-store
						Display during the selected period.</h4>

				</div>
				<!-- End of pop up data -->


				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tbody id="articleTbody">
							<tr>
								<th>Article</th>
								<th>Description</th>
								<th class="centerValue">UOM</th>
								<th width="40px" class="centerValue lastColumn">Select</th>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- End of content table wrapper -->

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label
						class="secondaryActionBtn">Cancel</label> <label class="actionBtn"
						id="addanyway">Add anyway</label>
					</span>
				</div>
				<!-- End of popup actions-->


			</div>
			<!-- End of popupContent -->
		</div>
	</div>

	<!-- Promotion Sales history Popup -->
	<div
		class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
		tabindex="-1" role="dialog" aria-describedby="dialog-salesHistory"
		aria-labelledby="ui-id-1" style="display: none;">
		<div
			class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
			<span id="ui-id-1" class="ui-dialog-title">Sales History</span>
			<button
				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
				role="button" aria-disabled="false" title="close">
				<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
					class="ui-button-text">close</span>
			</button>
		</div>
		<div id="dialog-salesHistory" title="Promotion Sales History">
			<div class="popupContent">

				<!--  <div class="popupSearchWrapper" id="popupSearch">
					<h3>No. of Month:</h3>
					<select class="selectOptions months">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="13">13</option>
					</select>


					<h3 class="hideBlock">Promotion Type:</h3>
					<select class="selectOptions promoType hideBlock">
						<option value='I'>Instore</option>
						<option value='C'>Central</option>
						<option value='A'>All</option>
					</select> <label id="apply" class="actionBtn popupSearchBtn">Apply</label>-->

			</div>
			<!-- End of popup search wrapper -->


			<div class="popupData">

				<div class="tableInfo">

					<div class="tableTitle filtered-count">
						<h4>
							Total <strong class="saleTotalCount">1</strong> results found
						</h4>
					</div>
					<!-- End of table title -->

				</div>
				<!-- End of table info -->
			</div>
			<!-- End of pop up data -->


			<div class="ContentTableWrapper dialogbox-scroll" >
				<!-- <table class="ContentTable" cellspacing="0">
						<tr class="promoSaleHistoryPopupTr">
							<th class="centerValue">From</th>
							<th class="centerValue">To</th>
							<th class="numberColumn">Promo Price</th>
							<th class="numberColumn">Saving</th>
							<th class="centerValue">Sub-type</th>
							<th>Media</th>
							<th class="centerValue">Avg. Qty. Sold</th>
							<th>Store Info</th>
							<th width="150px">Store Feedback</th>
							<th class="lastColumn centerValue" width="25px">&nbsp;</th>
						</tr>						
						
						
					</table> -->
			</div>
			<!-- End of content table wrapper -->

			<!-- <div class="popupActionsWrapper">
					<span class="popupActions"> <label
						class="actionBtn saleHistorySaveBtn">Save</label> <label
						class="actionBtn closeBtn">Close</label>
					</span>
				</div> -->
			<!-- End of popup actions-->



		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of Promotion Sales history popup -->
	</div>

	<%@include file="footer.jsp"%>

</body>
</html>
