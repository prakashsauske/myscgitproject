<script src="http://maps.googleapis.com/maps/api/js"></script>
<div class="contentWrapper hideBlock" id="detailsDivision">
	<input type="hidden" id="repTabF" value='0'> <input
		type="hidden" id="priTabF" value='0'> <input type="hidden"
		id="offerTabF" value='0'> <input type="hidden" id="ltoTabF"
		value='0'> <input type="hidden" id="expTabF" value='0'>
	<input type="hidden" id="posTabF" value='0'> <input
		type="hidden" id="detTabF" value='0'> <input type="hidden"
		id="vendorTabF" value='0'> <input type="hidden" id="freTabF"
		value='0'> <input type="hidden" id="nriTabF" value='0'>
	<input type="hidden" id="cusTabF" value='0'> <input
		type="hidden" id="tstTabF" value='0'> <input type="hidden"
		id="gftTabF" value='0'> <input type="hidden" id="curActTabF"
		value='0'> <input type="hidden" id="futActTabF" value='0'>
	<input type="hidden" id="pastActTabF" value='0'> <input
		type="hidden" id="gftTabF" value='0'> <input
		type="hidden" id="sizeTabF" value='0'><input
		type="hidden" id="styleTabF" value='0'><input
		type="hidden" id="seasonTabF" value='0'>

	<div class="articleHead">

		<div class="articleHeaderWrapper">
			<h2 class="articleTitle" id='articleTitle'></h2>
		</div>




		<div class="articleActionBtns">
			<label class="offers">Offers</label> <label
				class="positiveStatus rangedInd">Ranged</label> <label class="negativeStatus notRangedInd">Not Ranged</label>
				<label class="highlightStatus" id="flagValueForRecall"></label><label class="highlightStatus" id="flagValue"></label><label
				class="actionBtn ${properties.LookUpNearByStoreSearch}" id="nearBy"><a><label
					class="nearbyBtn">Nearby Store</label></a></label> <label
				class="actionBtn ${properties.LookUpEditArticleDetails}"
				id="editActions"><a><label class="editBtn">Edit</label></a></label>
			
			<label
				class="actionBtn ${properties.LookUpRangeArticle}"
				id="rangingAction"><a><label class="">Req. for Ranging</label></a></label>

			<!-- CR <ul id="createDrpDwn"
				class="selectDropdown buttonMenu" >
				class="selectDropdown buttonMenu  ${properties.LookUpCreate} " 
				<li  class="ui-menu-item"  ><span
					class=" "></span> <label
					class="actionBtn"><a id=""><label class="createBtn">Create</label></a></label>

					<ul class="dropdown">
						<%-- Commenting LCOR functioncode properties for 
						<li class="${properties.LCreateOrderOnReceipt}"
							><a
							href="../poReceipt/onPageLoadPORecipt.htm"><label
								class="dropdownLabel ">Order on Receipt</label></a></li> --%>
						<li class=""
							>
							class=" ${properties.LCreateWarehouseOrder}"  
							<a
							href="../order/onPageLoadCreateManualOrder.htm"><label
								class="dropdownLabel ">Manual Order</label></a></li>
						<li  class="">
						class="${properties.LCreateVendorOrder}"  
						<a
							href="../preq/onPageLoadPReq.htm"><label
								class="dropdownLabel  ">Vendor Order</label></a></li>
						 <li class="ui-menu-item" id="ui-id-37" tabindex="-1" role="menuitem"><a ><label class="dropdownLabel" id="createDisplay">In-store Display</label></a></li>	
								<li class="ui-menu-item" id="ui-id-38" tabindex="-1" role="menuitem"><a ><label class="dropdownLabel" id="createClearance">Clearance Promotion</label></a></li>	
								<li class="ui-menu-item" id="ui-id-39" tabindex="-1" role="menuitem"><a ><label class="dropdownLabel" id="createCompetition">Competition Promotion</label></a></li>	
						
					</ul></li>
			</ul> applicationSettings  MODIFICATIONS-->


			<ul id="ticketDrpDwn"
				class="selectDropdown buttonMenu ticketButton  ${properties.LookUpPrintTicket}"
				>
				<li class="active" ><span
					></span> <label
					class="actionBtn"><a id=""><label class="print">Ticket</label></a></label>

					<ul id="templateList" class="dropdown "
						>
						
					</ul></li>
			</ul>


			<ul id="orderDrpDwn"
				class="selectDropdown buttonMenu ${properties.LookUpMoreInfo} ">
				<li ><span
					class=""></span> <label
					class="actionBtn"><a id=""><label class="createBtn">Add To</label></a></label>

					<ul class="dropdown">
						<li class="${properties.addToDraftOrder}" ><a><label class="dropdownLabel "
								id="addToDraftOrder">Draft Order</label></a></li>
						<li class="${properties.InStorePromotionDisplayLocal} " ><a><label class="dropdownLabel "
								id="addToDisplay">Display Promotion</label></a></li>
						<li class="${properties.InStorePromotionClearance} " ><a><label class="dropdownLabel "
								id="addToClearance">Clearance Promotion</label></a></li>
						<li class="${properties.InStorePromotionCompetion} " ><a><label class="dropdownLabel "
								id="addToCompetition">Competition Promotion</label></a></li>
						<li class="${properties.CreateInstoreAdvertising}" ><a><label class="dropdownLabel "
								id="addToAdvertised">Advertised Promotion</label></a></li>
						<li class="${properties.CreateInstoreSpecialActivity}" ><a><label class="dropdownLabel "
								id="addToSpecial">Sp. Activity Promotion</label></a></li>
						<li class="${properties.CreateInstoreLocalMarketing}" ><a><label class="dropdownLabel "
								id="addToLocalMarketing">Lo. Marketing Promotion</label></a></li>
					</ul></li>
			</ul>

		</div>

		<div class="articleInfoWrapper">
			<p class="secondaryInfo" style="">
				<label class="articlePriceLabel">Standard Sell Price: <strong
					id='standardPrice'></strong>
				</label> <label class="articlePriceLabel promoLabel">|</label> <label
					class="articlePriceLabel promoLabel">Promo Sell Price: <strong
					id="promoPrice"></strong></label> <label class="articleDate promoLabel"
					id="proDateInfo"></label> <label
					class="articlePriceLabel ">|</label> <label
					class="articlePriceLabel ${properties.articleLookupCheckPOSPrice}"><a id="posInd" class="navigate "
					title="Check POS Price ">Check POS Price</a></label><label
					class="articlePriceLabel ${properties.checkGrossProfit}" id="gpLookLink"> |</label> 
					<label class="articlePriceLabel ${properties.checkGrossProfit}" id="gpLookUP" ><a id="getGP" class="navigate " title="Get GP%">Check Gross Profit</a></label>
			</p>
			
		</div>


		<div class="articleInfoSecondary">
			<div class="hierarchy">
				<label class="title hideBlock">Article Hierarchy</label>
				<ul id="articleHierarchy" class="">

				</ul>
			</div>
			<!-- End of heirarchy -->
		</div>
		<!-- End of article info secondary -->



	</div>

	<div class="articleContent">
		<div class="articleContentInner">

			<div class="articleDetails" id="articleTable0" style="height: 254px;">

				<div class="articleInfoTop">
					<label class="articleName" id="aisleInfo"></label>
				</div>
				<div class="articleImg articleImgDefault">&nbsp;</div> 
				<div class="ImgForAnArticle" style="    text-align: center;">&nbsp;</div>

				<!-- <div class="articleInfoBottom">
							<label class="articleLocation">3F  </label> 
							
						</div> -->

			</div>
			<!-- End of article details -->

		</div>
		<!-- End of article content inner -->

		<div class="articleContentInner">

			<div class="articleDetails" id="articleTable1" style="height: 254px;">

				<table cellspacing="0" class="ContentTable">
					<tbody>
						<tr>
							<th colspan="2">Stock <label class="history ${properties.articleLookupSalesHistory}"
								id="salesHistory">Sales History</label>
							</th>
						</tr>
						<tr>
							<td class="keyInfo">On Hand:</td>
							<!-- applicationSettings CR -->
							<td class="valueInfo ${properties.StockAdjustmentLocal}"><a title="Adjust SOH"
								class="navigate "
								onclick="navigateToSOHWithPiVerifyReasonCode();"
								id="sohValue"></a></td>
						</tr>
						<tr>
							<td class="keyInfo">Min. Pres. Level:</td>							
							<td class="valueInfo ${properties.LookUpEditMPL}"><a title="Adjust MPL/SC"
								class="navigate "
								onclick="attachMPLScreen();"
								id="minPresLevelValue"></a></td>							
						</tr>
						<tr>
							<td class="keyInfo">Shelf Capacity:</td>
							<td class="valueInfo ${properties.LookUpEditMPL}"><a title="Adjust MPL/SC"
								class="navigate "
								onclick="attachMPLScreen();"
								id="shelfcapacityValue"></a></td>
						</tr>
						<tr>
							<td class="keyInfo">In Transit:</td>
							<td class="valueInfo" id="inTransitValue"></td>
						</tr>
						<tr>
							<td class="keyInfo">On Order:</td>
							<td class="valueInfo"><label
								class="linkBtn "> <label
									id="openOrdersLink" class="newWindowAfter onOrderValue ${properties.ShowOnOrder}"></label>
							</label></td>
						</tr>
						<tr class="ltoTr">
							<td class="keyInfo">Long Term Overs:</td>
							<td class="valueInfo" id="ltoOversValue"></td>
						</tr>
						<tr>
							<td class="keyInfo" id="facingsText">Facings:</td>
							<td class="valueInfo ${properties.LookUpEditMPL}" ><a title="Adjust MPL/SC"
								class="navigate "
								onclick="attachMPLScreen();"
								id="facingsValue"></a></td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
		<!-- End of article content inner -->


		<div class="articleContentInner">

			<div class="articleDetails" id="articleTable2"
				style="height: 254px; ">

				<table cellspacing="0" class="ContentTable">
					<tbody>
						<tr>
							<th colspan="2">Supplier Info</th>
						</tr>
						<tr>
							<td class="keyInfo">Order Multiple:</td>
							<td class="valueInfo" id="omValue"></td>
						</tr>
						<tr>
							<td class="keyInfo">Source:</td>
							<td class="valueInfo" id="sourceValue"></td>
						</tr>
						<tr>
							<td class="keyInfo">Supplier No.:</td>
							<td class="valueInfo" id="supplierNoValue"></td>
						</tr>
						<tr>
							<td class="keyInfo">Supplier Name:</td>
							<td class="valueInfo" id="supplierNameValue"></td>
						</tr>
						<tr>
							<td class="keyInfo" colspan="2" id="perpInd"></td>
						</tr>
						<tr>
							<td class="keyInfo" colspan="2" id="saleInd"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- End of article details -->
		</div>
		<!-- End of article content inner -->


		<div class="articleContentInner articleContentInnerLast">

			<div class="articleDetails" id="articleTable3" style="height: 254px;">

				<table cellspacing="0" class="ContentTable">
					<tbody>
						<tr>
							<th colspan="2"><label class="articleDetailHeading">Unit
									Info</label></th>
						</tr>
						<tr>
							<td class="keyInfo">EAN:</td>
							<td class="valueInfo" id="eanValue"></td>
						</tr>
						<tr>
							<td class="keyInfo">UOM:</td>
							<td class="valueInfo" id="uomValue"></td>
						</tr>
						<tr>
							<td class="keyInfo">PLU:</td>
							<td class="valueInfo" id="pluValue"></td>
						</tr>
						<tr>
							<td class="keyInfo">Brand:</td>
							<td class="valueInfo" id="brandValue"></td>
						</tr>
						<tr>
							<td class="keyInfo" colspan="2" id="packBrkInd"></td>

						</tr>
						<tr>
							<td class="keyInfo" colspan="2" id="linkArtInd"></td>

						</tr>
					</tbody>
				</table>
			</div>
			<!-- End of article details -->
		</div>
		<!-- End of article content inner -->




	</div>
	<!-- End of article content -->


	<div class="articleAdditionalInfo">

		<!-- Accordion code picked up from this -->

		<div id="mainTabs"
			class="ui-tabs ui-widget ui-widget-content ui-corner-all">
			<ul
				class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
				role="tablist">

				<li id="repTab"
					class="ui-state-default ui-corner-top  ui-tabs-active ui-state-active"
					role="tab" tabindex="-1" aria-controls="mainTabs-2"
					aria-labelledby="ui-id-9" aria-selected="true" aria-expanded="true"><a
					href="#mainTabs-2" class="ui-tabs-anchor" role="presentation"
					tabindex="-1" id="ui-id-9">Replenishment </a></li>
				<li id="priTab" class="ui-state-default ui-corner-top" role="tab"
					tabindex="-1" aria-controls="mainTabs-3" aria-labelledby="ui-id-10"
					aria-selected="false" aria-expanded="false"><a
					href="#mainTabs-3" class="ui-tabs-anchor" role="presentation"
					tabindex="-1" id="ui-id-10">Price / Unit Details </a></li>
				<li id="offerTab" class="ui-state-default ui-corner-top" role="tab"
					tabindex="-1" aria-controls="mainTabs-7" aria-labelledby="ui-id-11"
					aria-selected="false" aria-expanded="false"><a
					href="#mainTabs-7" class="ui-tabs-anchor" role="presentation"
					tabindex="-1" id="ui-id-11">Offers &amp; Promotions </a></li>
				<li id="ltoTab" class="ui-state-default ui-corner-top" role="tab"
					tabindex="0" aria-controls="mainTabs-5" aria-labelledby="ui-id-12"
					aria-selected="false" aria-expanded="false"><a
					href="#mainTabs-5" class="ui-tabs-anchor" role="presentation"
					tabindex="-1" id="ui-id-12">Long Term Overs</a></li>
				<li id="expTab" class="ui-state-default ui-corner-top" role="tab"
					tabindex="-1" aria-controls="mainTabs-6" aria-labelledby="ui-id-13"
					aria-selected="false" aria-expanded="false"><a
					href="#mainTabs-6" class="ui-tabs-anchor" role="presentation"
					tabindex="-1" id="ui-id-13">Out of Code  </a></li>
				<li id="posTab" class="ui-state-default ui-corner-top" role="tab"
					tabindex="-1" aria-controls="mainTabs-8" aria-labelledby="ui-id-14"
					aria-selected="false" aria-expanded="false"><a
					href="#mainTabs-8" class="ui-tabs-anchor" role="presentation"
					tabindex="-1" id="ui-id-14">POS Details</a></li>
				<li id="detTab"
					class="ui-state-default ui-corner-top ${properties.ViewAdditionalItemDetails}"
					role="tab" tabindex="-1" aria-controls="mainTabs-4"
					aria-labelledby="ui-id-15" aria-selected="false"
					aria-expanded="false"><a href="#mainTabs-4"
					class="ui-tabs-anchor" role="presentation" tabindex="-1"
					id="ui-id-15">Additional Item Details </a></li>
				<li id="vendorTab" class="ui-state-default ui-corner-top" role="tab"
					tabindex="-1" aria-controls="mainTabs-9" aria-labelledby="ui-id-16"
					aria-selected="false" aria-expanded="false"><a
					href="#mainTabs-9" class="ui-tabs-anchor" role="presentation"
					tabindex="-1" id="ui-id-16">Supplier Details</a></li>

			</ul>

			<div id="mainTabs-2"
				class="tabContent ui-tabs-panel ui-widget-content ui-corner-bottom"
				aria-labelledby="ui-id-9" role="tabpanel" aria-hidden="true"
				style="display: none;">

				<div class="ContentTableWrapper repTabDiv">
					<table class="ContentTable" cellspacing="0">

						<tbody id="replenishmentTop">

						</tbody>
					</table>



					<div class="tableInfo">
						<div class="tableTitle">
							<h4 class="sectionTitle" id="rplRadioUOM"></h4>
						</div>
						<div class="tableTitle floatRight" style = "margin-top: 15px;float:right!important;">
							<label class="blockingReason" id="checkBlockingReason" style="float:right" onclick="showblockingReason();">Check Blocking Reason</label>
							<label class="${properties.StockAdjustmentFullLog} history" id="sohFullLog" style="float:right" onclick="showFullAdjLog(articleNo);">SOH Full Log</label>
							<%-- <label class="${properties.GoodsMovementSummary} history" id="sohHistory" style="float:right" onclick="showSOHHistoryinLookup(articleNo);">SOH History</label> --%>
						</div>
						<!-- End of table title -->
					</div>
					<!-- End of table info -->

					<div class="uomRadioTables"></div>





				</div>
				<!-- End of content table wrapper -->

			</div>
			<!-- End of main tab 2 -->

			<div id="mainTabs-3"
				class="tabContent ui-tabs-panel ui-widget-content ui-corner-bottom"
				aria-labelledby="ui-id-10" role="tabpanel" aria-hidden="true"
				style="display: none;">

				<div class="ContentTableWrapper priceTabDiv">

					<table class="ContentTable price-tab-content" cellspacing="0">
						<tbody id="priceUnitHead">
						</tbody>
					</table>



					<div class="tableInfo price-tab-content">
						<div class="tableTitle">
							<h4 class="sectionTitle" id="prcUnitRadio"></h4>
						</div>
						<!-- End of table title -->

						<div class="tableActionBtns priceHistoryDiv">
							<label id="otherPriceHistory" class="linkBtn"> <a><label
									class="history" id="">Price History</label></a>
							</label>
						</div>




					</div>
					<!-- End of table info -->

					<div class="uomDtlsInfo price-tab-content"></div>

					<div class="tableInfo other-price-info-tbl hideBlock">
						<div class="tableTitle">
							<h4 class="sectionTitle">&nbsp; Other Prices</h4>
						</div>
						<!-- End of table title -->
					</div>
					<!-- End of table info -->

					<div class="otherPriceInfo price-tab-content"></div>
					<div class="tableInfo linked-item-info-tbl price-tab-content">
						<div class="tableTitle">
							<h4 class="sectionTitle">&nbsp; Linked Items</h4>
						</div>
						<!-- End of table title -->
					</div>
					<!-- End of table info -->


					<table class="ContentTable price-tab-content" cellspacing="0">
						<tbody id="prciceParentChild">

						</tbody>
					</table>


					<div class="tableInfo addtional-ean-info-tbl price-tab-content">
						<div class="tableTitle">
							<h4 class="sectionTitle">&nbsp; Additional EAN</h4>
						</div>
						<!-- End of table title -->
					</div>
					<!-- End of table info -->

					<div class="addEanInfo price-tab-content"></div>



				</div>
				<!-- End of content table wrapper -->

			</div>
			<!-- End of main tab 3 -->

			<div id="mainTabs-7"
				class="tabContent ui-tabs-panel ui-widget-content ui-corner-bottom"
				aria-labelledby="ui-id-11" role="tabpanel" aria-hidden="true"
				style="display: none;">

				<div id="promo"
					class="filterTabs ui-tabs ui-widget ui-widget-content ui-corner-all">
					<ul
						class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
						role="tablist">
						<li id="curActTab"
							class="ui-state-default ui-corner-top ui-tabs-active ui-state-active"
							role="tab" tabindex="-1" aria-controls="promo-1"
							aria-labelledby="ui-id-17" aria-selected="true"
							aria-expanded="true"><a href="#promo-1"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-17">Active</a></li>
						<li id="pastActTab" class="ui-state-default ui-corner-top "
							role="tab" tabindex="0" aria-controls="promo-3"
							aria-labelledby="ui-id-17a" aria-selected="false"
							aria-expanded="false"><a href="#promo-3"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-17a">Past</a></li>
						<li id="futActTab" class="ui-state-default ui-corner-top"
							role="tab" tabindex="1" aria-controls="promo-2"
							aria-labelledby="ui-id-18" aria-selected="false"
							aria-expanded="true"><a href="#promo-2"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-18">Future</a></li>
					</ul>
					<div id="promo-3" aria-labelledby="ui-id-17a"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="true" style="display: none;">
						<div class="ContentTableWrapper">
							<!-- <div
							class="paginationWrapper  paginationDivPastPromo paginationDiv hideBlock"
							id="">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
						<div class="tableTitle pastTitle hideBlock">
						<h4>
							Total <strong id="pastPromoCount">0</strong> results found for '<strong
								id="">Past Promotion</strong>'
						</h4>
					</div> -->
							<div class="tableInfo  pastTitle hideBlock">

								<div class="tableTitle">
									<h4 class=" totalRecCount">
										Total <strong id="pastPromoCount"></strong> records found
										<!-- '<strong class="searchString">ap</strong>' -->
									</h4>
								</div>
								<!-- End of table title -->
								<div
									class="paginationWrapper  paginationDivPastPromo paginationDiv hideBlock"
									id="paginationDiv1"></div>
							</div>

							<table class="ContentTable" cellspacing="0">
								<tbody id="pasPromContent">
								</tbody>
							</table>
							<div
								class="paginationWrapper bottomPagination  paginationDivPastPromo paginationDiv hideBlock"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
						<!-- End of content table wrapper -->
					</div>
					<div id="promo-1" aria-labelledby="ui-id-17"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="true" style="display: none;">
						<div class="ContentTableWrapper">
							<!-- <div
							class="paginationWrapper  paginationDivCurrentPromo paginationDiv hideBlock"
							id="">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div> -->
							<!-- <div class="tableTitle currentTitle hideBlock">
						<h4>
							Total <strong id="curPromoCount">0</strong> results found for '<strong
								id="">Current Promotion</strong>'
						</h4>
					</div> -->
							<div class="tableInfo  currentTitle hideBlock">

								<div class="tableTitle">
									<h4 class=" totalRecCount">
										Total <strong id="curPromoCount"></strong> records found
										<!-- '<strong class="searchString">ap</strong>' -->
									</h4>
								</div>
								<!-- End of table title -->
								<div
									class="paginationWrapper  paginationDivCurrentPromo paginationDiv hideBlock"
									id="paginationDiv1"></div>
							</div>
							<table class="ContentTable" cellspacing="0">
								<tbody id="curPromContent">
								</tbody>
							</table>
							<div
								class="paginationWrapper bottomPagination  paginationDivCurrentPromo paginationDiv hideBlock"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
						<!-- End of content table wrapper -->
					</div>
					<div id="promo-2" aria-labelledby="ui-id-18"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="false" style="display: block;">

						<div class="ContentTableWrapper">
							<!-- 	<div
							class="paginationWrapper  paginationDivFuturePromo paginationDiv hideBlock"
							id="">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
						<div class="tableTitle futureTitle hideBlock">
						<h4>
							Total <strong id="futurePromoCount">0</strong> results found for '<strong
								id="">Future Promotion</strong>'
						</h4>
					</div> -->
							<div class="tableInfo  futureTitle hideBlock">

								<div class="tableTitle">
									<h4 class=" totalRecCount">
										Total <strong id="futurePromoCount"></strong> records found
										<!-- '<strong class="searchString">ap</strong>' -->
									</h4>
								</div>
								<!-- End of table title -->
								<div
									class="paginationWrapper  paginationDivFuturePromo paginationDiv hideBlock"
									id="paginationDiv1"></div>
							</div>
							<table class="ContentTable" cellspacing="0">
								<tbody id="futurePromTable">

								</tbody>
							</table>
							<div
								class="paginationWrapper bottomPagination  paginationDivFuturePromo paginationDiv hideBlock"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
						<!-- End of content table wrapper -->
					</div>


				</div>
				<!-- End of filter tabs -->

			</div>
			<!-- End of main tab 7 -->


			<div id="mainTabs-5"
				class="tabContent ui-tabs-panel ui-widget-content ui-corner-bottom"
				aria-labelledby="ui-id-12" role="tabpanel" aria-hidden="false"
				style="display: block;">

				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tbody id="ltoTabData">
						</tbody>
					</table>
				</div>
				<!-- End of content table wrapper -->

			</div>
			<!-- End of main tab 2 -->


			<div id="mainTabs-6"
				class="tabContent ui-tabs-panel ui-widget-content ui-corner-bottom"
				aria-labelledby="ui-id-13" role="tabpanel" aria-hidden="true"
				style="display: none;">

				<div class="ContentTableWrapper">
				<div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle" id="expDateRadioUOM">
				</h4></div><!-- End of table title -->
				<!-- code for pagination -->
				<div
							class="paginationWrapper  expireTabResultsPagination  paginationDiv hideBlock"
							id="paginationDiv1">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>
				
				</div>
				
					<table class="ContentTable" cellspacing="0">
						<tbody id="outOfCodeData">
						</tbody>
					</table>
				</div>
				<!-- End of content table wrapper -->

			</div>
			<!-- End of main tab 2 -->


			<div id="mainTabs-8"
				class="tabContent ui-tabs-panel ui-widget-content ui-corner-bottom"
				aria-labelledby="ui-id-14" role="tabpanel" aria-hidden="true"
				style="display: none;">
				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tbody id="posDetailsContent">
						</tbody>
					</table>
				</div>
				<!-- End of content table wrapper -->
			</div>


			<div id="mainTabs-4"
				class="tabContent ui-tabs-panel ui-widget-content ui-corner-bottom"
				aria-labelledby="ui-id-15" role="tabpanel" aria-hidden="true"
				style="display: none;">

               <div class="tableActionBtns printAndEmailDiv"
						style="padding-top: 8px;padding-bottom: 8px; text-align:right">
						<label id="emailBtn" class="actionBtn"
							title="Email nutritional / ingredients information, product notes, and tasting notes"><a><label
								class="email">Email</label></a></label> <label
							id="printNutriInfo"
							class="${properties.LookUpPrintNutriInfoLocal} actionBtn"
							title="Print nutritional / ingredients information, product notes, and tasting notes"><a><label
								class="print">Print</label></a></label> <%-- <label
							class="${properties.LookUpPrintNutriInfoLocal} actionBtn"
							id="printBtnInLookup"
							title="Print nutritional / ingredients information, product notes, and tasting notes"><a><label
								class="print">Print</label></a></label> --%>
				</div>

				<div id="itemInfo"
					class="filterTabs ContentTableWrapper ui-tabs ui-widget ui-widget-content ui-corner-all">					
					<ul
						class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
						role="tablist">
						<li id="freTab"
							class="additionalTab ui-state-default ui-corner-top ui-tabs-active ui-state-active"
							role="tab" tabindex="-1" aria-controls="itemInfo-1"
							aria-labelledby="ui-id-19" aria-selected="false"
							aria-expanded="false"><a href="#itemInfo-1"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-19">Fresh Food</a></li>
						<li id="nriTab"
							class="additionalTab ui-state-default ui-corner-top" role="tab"
							tabindex="-1" aria-controls="itemInfo-2"
							aria-labelledby="ui-id-20" aria-selected="false"
							aria-expanded="false"><a href="#itemInfo-2"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-20">Nutritional / Ingredients Info</a></li>
						<li id="cusTab"
							class="additionalTab ui-state-default ui-corner-top" role="tab"
							tabindex="-1" aria-controls="itemInfo-3"
							aria-labelledby="ui-id-21" aria-selected="false"
							aria-expanded="false"><a href="#itemInfo-3"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-21">Customer Product Notes</a></li>
						<li id="tstTab"
							class="additionalTab ui-state-default ui-corner-top" role="tab"
							tabindex="-1" aria-controls="itemInfo-4"
							aria-labelledby="ui-id-22" aria-selected="false"
							aria-expanded="false"><a href="#itemInfo-4"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-22">Tasting Notes</a></li>
						<li id="gftTab"
							class="additionalTab ui-state-default ui-corner-top" role="tab"
							tabindex="0" aria-controls="itemInfo-6"
							aria-labelledby="ui-id-23" aria-selected="true"
							aria-expanded="true"><a href="#itemInfo-6"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-23">Gift Card Details</a></li>
						<li id="sizeTab"
							class="additionalTab ui-state-default ui-corner-top hideBlock" role="tab"
							tabindex="0" aria-controls="itemInfo-7"
							aria-labelledby="ui-id-24" aria-selected="true"
							aria-expanded="true"><a href="#itemInfo-7"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-24">Article Size Details</a></li>	
                          <li id="styleTab"
							class="additionalTab ui-state-default ui-corner-top hideBlock" role="tab"
							tabindex="0" aria-controls="itemInfo-8"
							aria-labelledby="ui-id-25" aria-selected="true"
							aria-expanded="true"><a href="#itemInfo-8"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-25">Article Style Details</a></li>
						  <li id="seasonTab"
							class="additionalTab ui-state-default ui-corner-top hideBlock" role="tab"
							tabindex="0" aria-controls="itemInfo-9"
							aria-labelledby="ui-id-25" aria-selected="true"
							aria-expanded="true"><a href="#itemInfo-9"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-26">Seasonality Status</a></li>		

					</ul>
					<div id="itemInfo-1" aria-labelledby="ui-id-19"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="true" style="display: none;">
						<div class="ContentTableWrapper">
							<table class="ContentTable" cellspacing="0">
								<tbody id="freshTable">
								</tbody>
							</table>
						</div>
						<!-- End of content table wrapper -->
					</div>
					<div id="itemInfo-2" aria-labelledby="ui-id-20"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="true" style="display: none;">
						<div class="ContentTableWrapper nutrionTab">
							<table class="ContentTable" cellspacing="0">
								<tbody id="nutritionTable">
								</tbody>
							</table>

							<div class="tableInfo divNutriValTitle">
								<div class="tableTitle">
									<h4 class="sectionTitle">Nutritional Value</h4>
								</div>
								<!-- End of table title -->


							</div>
							<!-- End of table info -->

							<table class="ContentTable" cellspacing="0">
								<tbody id="nutriVal">
								</tbody>
							</table>


						</div>
						<!-- End of content table wrapper -->






					</div>
					<div id="itemInfo-3" aria-labelledby="ui-id-21"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="true" style="display: none;">
						<div class="ContentTableWrapper">
							<table class="ContentTable" cellspacing="0">

								<tbody id="customerNotesTable">


								</tbody>
							</table>
						</div>
						<!-- End of content table wrapper -->
					</div>
					<div id="itemInfo-4" aria-labelledby="ui-id-22"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="true" style="display: none;">
						<div class="ContentTableWrapper">
							<table class="ContentTable" cellspacing="0">
								<tbody id="tastingNotesTable">

								</tbody>
							</table>
						</div>
						<!-- End of content table wrapper -->
					</div>


					<div id="itemInfo-6" aria-labelledby="ui-id-23"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="false" style="display: block;">
						<div class="ContentTableWrapper">
							<table class="ContentTable" cellspacing="0">
								<tbody id="giftCardTable">
								</tbody>
							</table>
						</div>
						<!-- End of content table wrapper -->
					</div>
					<div id="itemInfo-7" aria-labelledby="ui-id-24"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="false" style="display: block;">
						<div class="ContentTableWrapper">
							<table class="ContentTable" cellspacing="0">
								<tbody id="sizeTable">
								</tbody>
							</table>
						</div>
						<!-- End of content table wrapper -->
					</div>
					<div id="itemInfo-8" aria-labelledby="ui-id-25"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="false" style="display: block;">
						<div class="ContentTableWrapper">
							<table class="ContentTable" cellspacing="0">
								<tbody id="styleTable">
								</tbody>
							</table>
						</div>
						<!-- End of content table wrapper -->
					</div>
					<div id="itemInfo-9" aria-labelledby="ui-id-26"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="false" style="display: block;">
						<div class="ContentTableWrapper">
							<table class="ContentTable" cellspacing="0">
								<tbody id="seasonTable">
								</tbody>
							</table>
						</div>
						<!-- End of content table wrapper -->
					</div>
					

				</div>

			</div>
			<!-- End of main tab 4 -->


			<div id="mainTabs-9"
				class="tabContent ui-tabs-panel ui-widget-content ui-corner-bottom"
				aria-labelledby="ui-id-16" role="tabpanel" aria-hidden="true"
				style="display: none;">

				<div class="ContentTableWrapper vendorTabDiv">

					<table class="ContentTable" cellspacing="0">
						<tbody id="vendorInfoTable">
						</tbody>
					</table>




					<div class="tableInfo">
						<div class="tableTitle">
							<h4 class="sectionTitle">&nbsp; Order Details</h4>
						</div>
						<!-- End of table title -->
					</div>
					<!-- End of table info -->


					<table class="ContentTable" cellspacing="0">
						<tbody id="suplierUOM">
						</tbody>
					</table>




				</div>
				<!-- End of content table wrapper -->

			</div>
			<!-- End of main tab 3 -->


		</div>
		<!-- End of main tabs -->


	</div>
	<!-- End of article additional details -->
	
	<div id="dialog-addToDraft" title="Provide Qty. to Order">
		<div class="popupContent">
		
			<div class="popupData">
				
					<div class="formWrapper">						
						
						<div class="parameter">
							<input type="hidden" id="popUpOrderDeliveryDate">
							<table width="100%" class="plainTable">
								<tr>
									<td><label for="co5">Order Qty.</label></td>
									<td><input class="textbox numberBox" id="popupOrderOty" type="text" maxlength="3"/> <span id="orderPopupUom">CAR</span></td>
								</tr>
								<tr>
									<td><label for="co5">OM</label></td>
									<td><label class="textbox numberBox" id="popupOrderOM"></label></td>
								</tr>
								<tr>
									<td><label for="co5">Total Units</label></td>
									<td><label class="textbox numberBox" id="popupTotalUnit"></label> <span id="orderPopupLUom">EA</span></td>
								</tr>
							</table>
						
						</div> <!-- End of parameter -->		
						
					</div> <!-- End of form wrapper  -->
		
			</div> <!-- End of pop up data -->
			
			<div class="popupActionsWrapper">
				<span class="popupActions">
					<label class="actionBtn" id="addToDraftSubmit"><a ><label class="">Add</label></a></label>
					<label class="secondaryActionBtn" id="addToDraftCancel"><a >Cancel</a></label>
				</span>
			</div> <!-- End of popup actions-->
			
		</div> <!-- End of popupContent -->
	</div> <!-- End of Competition -->
	



</div>


