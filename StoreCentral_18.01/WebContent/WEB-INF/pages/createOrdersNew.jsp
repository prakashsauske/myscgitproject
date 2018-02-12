<script>
	function loadCreateJs() {
		$('head').append('<script src="../../scripts/createOrdersNew.js?version=${properties.version}">');
		$('head').append('<script src="../../scripts/articleValidation.js?version=${properties.version}">');
	}
</script>

<ul>
	<li><a href="#my-orders" id="myOrdersBtn">My Orders</a></li>
	<li class=""><a href="#my-orders" id="allOrdersBtn">All Orders</a>
	</li>
	
	<li class="${properties.LCreateOrderOnReceipt}" id="orderOnReceipt-tab-link"><a
		href="#ordersReceipt">Order on Receipt</a></li>
</ul>
<div id="my-orders">
	<div class="ContentTableWrapper">
		<div id="myDrafts">
			<input type="hidden" id='vendorCheck' value="false"></input> <input
				type="hidden" id='articleNoHidden' value="false"></input>
			<div class="ContentTableWrapper " id="editMode">
				<div class="tableActionsBtnsWrapper">
					<div class="lookupActionWrapper">
						<label class="linkBtn addActionBtn" id="md_addActionBtn">
							<a> <label class="addRow">Add Article</label>
						</a>
						</label> <label class="linkBtn" id="md_filterOpen"> <label
							class="filter">Filters</label>
						</label> <label class="linkBtn hideBlock" id="md_filterClear"> <label
							class="negativeFlag">Clear Filters</label>
						</label> <label class="linkBtn groupByOpen" id="md_groupByOpen"> <a>
								<label class="group">Group By</label>
						</a>
						</label> <label class="linkBtn groupByClear hideBlock"
							id="md_groupByClear"> <a> <label class="negativeFlag">Clear
									Group By</label>
						</a>
						</label>
						<div class="errorDiv draftErrorDiv hideBlock" id="draftErrorDiv">
							<label id="draftErrorMsg">No article found for ' <strong>3234</strong>'.
								Please try a different number.
							</label> <label class="closeMessage"
								onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
						</div>
					</div>
					<!-- End of lookup action wrapper -->
				</div>
				<!-- End of table actions btn wrapper -->
				<div class="tableActionsWrapper" id="articleSearchDivForCreate">
					<form method="POST" action="" class="articleForm" data-map="obj"
						id="articleSearchFormForCreate">
						<div class="formWrapper">
							<div class="parameter">
								<label class="" for="searchBox">Article</label> <input
									data-item="iv_article" name="iv_article" type="#"
									class="textbox textboxDefaultText searchbox"
									placeholder="Type number, description, or EAN / TUN / PLU and press Enter"
									id="searchBox"> <input type="hidden"
									data-item="iv_site" name="iv_site" /> <input type="hidden"
									data-item="iv_ranged" name="iv_ranged" value="Y" />
							</div>
							<div class="parameter">
								<label class="" for="qty">Order Qty.</label> <input type="#"
									data-item="orderQty" name="oredrQty" tabindex="2" id="qty"
									class="textbox  numberBox">
							</div>
							<div class="parameter">
								<label class="" for="delDate">Delivery Date</label> <input
									data-item="deliveryDate" name="deliveryDate" type="#"
									class="textbox textboxDefaultText inputDate" maxlength="10"
									placeholder="dd/mm/yyyy" id="delDate">
							</div>
							<div class="parameter">
								<label for="sourceOfSupply" class="">Source of Supply</label> <input
									type="radio" name="iv_src_supply" value="" id="all1" checked
									tabindex="3" linkItem="allField1"> <label for="all"
									class="labelText">All</label> <input type="radio"
									name="iv_src_supply" value="warehouse" id="warehouse1"
									linkItem="warehouseField1" tabindex="4"> <label
									for="warehouse" class="labelText">Warehouse</label> <input
									type="radio" name="iv_src_supply" value="vendor"
									linkItem="vendorField1" id="vendor1" tabindex="5"> <label
									for="vendor" class="labelText">Direct Vendor</label>
								<div class="parameter supplierSource">
									<span id="allField1" class="options"> <label>Both
											warehouse and direct vendor</label>
									</span> <span id="vendorField1" class="hideBlock"> <input
										type="#" class="textbox mediumbox" name="wareHouse"
										id="vendorText" placeholder="Type number or name "> <label
										class="linkBtn" id="verifySupplier1"> <label
											class="advancedSearch">Verify <input type="hidden"
												id="isVerified" value="false" />
										</label>
									</label>
									</span> <span id="warehouseField1" class="hideBlock"> <select
										class="selectOptions supplyDrop" name="directVendor"
										id="mo_wareHouseDropDown">
											<option value="0">Select Warehouse</option>
											<option>2013 - Chester Hill</option>
											<option>2045</option>
											<option>2023</option>
											<option>2001</option>
											<option>2003</option>
											<option>2011</option>
									</select>
									</span>
								</div>
								<!-- End of parameter -->
							</div>
							<!-- End of parameter -->
							<div class="formActions">
								<label class="actionBtn" id="searchAndAdd"> <a>Search
										& Add</a>
								</label> <label class="secondaryActionBtn closeLink" id="closeLink">
									<a>Close</a>
								</label>
							</div>
							<!-- End of form actions -->
						</div>
						<!-- End of content table wrapper -->
					</form>
					<form method="POST" action="" id="mo_groupByForm"
						class="groupByForm">
						<div class="formWrapper">
							<div class="parameter">
								<label for="" class="">Group By</label> <input type="radio"
									class="userOption" id="user" value="user" name="groupByOptions">
								<label class="labelText userOption" for="user">User</label> <input
									type="radio" id="deptName" value="department"
									name="groupByOptions"> <label class="labelText"
									for="deptName">Department</label> <input type="radio" id="del"
									value="deliveryDate" name="groupByOptions"> <label
									class="labelText" for="del">Delivery Date</label> <input
									type="radio" id="supp" value="supplier" name="groupByOptions">
								<label class="labelText" for="supp">Supplier</label>
							</div>
							<!-- End of parameter -->
							<!--	<div class="formActions"><label class="actionBtn" id="applyGroupBy1"><a >Apply</a></label><label class="secondaryActionBtn closeLink" id="closeLink"><a >Close</a></label></div>
                                                                        <!-- End of form actions -->
						</div>
						<!-- End of content table wrapper -->
					</form>
				</div>
				<!-- End of table Actions Wrapper -->
				<div id="ordersList"></div>
			</div>
			<!-- End of ContentTableWrapper -->
		</div>
		<!-- End of My Orders id -->
	</div>
	<!-- End of content table wrapper -->
</div>
<div id="all-orders" class="hideBlock">
	<div class="ContentTableWrapper" id="allDrafts">
		<div class="tableActionsBtnsWrapper">
			<div class="lookupActionWrapper">
				<label class="linkBtn addActionBtn2" id="addActionBtn"> <a>
						<label class="addRow">Add Article</label>
				</a>
				</label> <label class="linkBtn" id="groupByOpen2"> <a> <label
						class="group">Group By</label>
				</a>
				</label> <label class="linkBtn hideBlock" id="groupByClear"> <a>
						<label class="negativeFlag">Clear Group By</label>
				</a>
				</label>
			</div>
			<!-- End of lookup action wrapper -->
		</div>
		<!-- End of table actions btn wrapper -->
		<div class="tableActionsWrapper hideBlock" id="tableGroupAction">
			<form method="POST" action="" class="articleForm2" id="articleForm">
				<div class="formWrapper">
					<div class="parameter">
						<label class="" for="searchBox">Article</label> <input type="#"
							class="textbox textboxDefaultText searchbox"
							placeholder="Type number, description, or EAN / TUN / PLU and press Enter"
							id="searchBox">
					</div>
					<div class="parameter">
						<label class="" for="qty">Order Qty.</label> <input type="#"
							tabindex="2" id="qty" class="textbox  numberBox">
					</div>
					<div class="parameter">
						<label class="" for="delDate">Delivery Date</label> <input
							type="#" class="textbox textboxDefaultText inputDate"
							placeholder="dd/mm/yyyy" id="delDate">
					</div>
					<div class="parameter">
						<label for="sourceOfSupply" class="">Source of Supply</label> <input
							type="radio" name="sourceSupply" value="all" id="all2" checked
							tabindex="3"> <label for="all" class="labelText">All</label>
						<input type="radio" name="sourceSupply" value="warehouse"
							id="warehouse2" tabindex="4"> <label for="warehouse"
							class="labelText">Warehouse</label> <input type="radio"
							name="sourceSupply" value="vendor" id="vendor2" tabindex="5">
						<label for="vendor" class="labelText">Direct Vendor</label>
						<div class="parameter supplierSource">
							<span id="allField2" class="options"> <label>Both
									warehouse and direct vendor</label>
							</span> <span id="vendorField2" class="hideBlock"> <input
								type="#" class="textbox mediumbox"
								placeholder="Type number or name "> <label
								class="linkBtn" id="verifySupplier"> <label
									class="advancedSearch">Verify</label>
							</label>
							</span> <span id="warehouseField2" class="hideBlock"> <select
								class="selectOptions supplyDrop">
									<option>Select Warehouse</option>
									<option>2013 - Chester Hill</option>
									<option>2045</option>
									<option>2023</option>
									<option>2001</option>
									<option>2003</option>
									<option>2011</option>
							</select>
							</span>
						</div>
						<!-- End of parameter -->
					</div>
					<!-- End of parameter -->
					<div class="formActions">
						<label class="actionBtn" id="searchAndAdd"> <a>Search
								& Add</a>
						</label> <label class="secondaryActionBtn closeLink" id="closeLink">
							<a>Close</a>
						</label>
					</div>
					<!-- End of form actions -->
				</div>
				<!-- End of content table wrapper -->
			</form>
			<form method="POST" action="" id="groupByForm2"
				class="groupByForm2 hideBlock">
				<div class="formWrapper">
					<div class="parameter">
						<label for="" class="">Group By</label> <input type="radio"
							id="deptName" value="deptName" name="groupByOptions"> <label
							class="labelText" for="deptName">Department</label> <input
							type="radio" id="del" value="deptName" name="groupByOptions">
						<label class="labelText" for="del">Delivery Date</label> <input
							type="radio" id="supp" value="deptName" name="groupByOptions">
						<label class="labelText" for="supp">Supplier</label> <input
							type="radio" id="creat" value="deptName" name="groupByOptions">
						<label class="labelText" for="creat">Created User</label>
					</div>
					<!-- End of parameter -->
					<!--	<div class="formActions"><label class="actionBtn" id="applyGroupBy"><a >Apply</a></label><label class="secondaryActionBtn closeLink" id="closeLink"><a >Close</a></label></div>
                                                                                                            <!-- End of form actions -->
				</div>
				<!-- End of content table wrapper -->
			</form>
		</div>
		<!-- End of table Actions Wrapper -->
		<div class="pageActions ">
			<label> <strong>Total Ordered Qty.: 15 CAR</strong>
			</label> <label class="actionBtn" id="createOrder"> <a> <label
					class="thumbUp">Submit All</label>
			</a>
			</label>
			<!--<label class="actionBtn" id=""><a ><label class="">Save All</label></a></label>-->
			<!--<label class="secondaryActionBtn"><a >Cancel</a></label>-->
		</div>
		<!-- End of page actions-->
	</div>
	<!-- End of Content Table Wrapper -->
</div>
<div id="ordersReceipt" class=""></div>

<div id="dialog-modal-his" title="Sales History">
	<div class="popupContent">


		<div class="popupData">

			<div class="warningMessage">
					<h4>Please note that Sales History for yesterday could be inaccurate and it will be updated after next data refresh.</h4>
				</div>
				
					<div id="uomRadio_salesHist"></div>


			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<thead>
						<tr>
							<th>&nbsp;</th>
							<th>Monday</th>
							<th>Tuesday</th>
							<th>Wednesday</th>
							<th>Thursday</th>
							<th>Friday</th>
							<th>Saturday</th>
							<th>Sunday</th>
							<th class="lastColumn">Total</th>
						</tr>
					</thead>
					<tbody id="salesHistContent"></tbody>


				</table>
			</div>
			<!-- End of content table wrapper -->


		<div class="tableTitle">
				<!-- Fix For Defect - 6510 SMKT_Product Lookup_Browser _UI  Issue in the sales history tab  -->
					<!-- <p class="notes"><strong>Average Sales:</strong> <strong>Daily</strong> <label id="dailyAvgSales">- 3 EA or 0.4 CAR</label>  |   <strong>Weekly</strong><label id="weeklyAvgSales"> 3 EA or 0.4 CAR </label>  |  <strong>15 Week</strong><label id="avgSales15Week">3 EA or 0.4 CAR</label> </p> -->
					<h4> Order Multiple: <label id="packSizeValueHist"></label></h4>
				</div>
		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn closeBtn">OK</label>
			</span>
		</div>



	</div>
	<!-- End of popupContent -->
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
					Promotions Planning screens after <strong>approximately 2
						hours</strong>, once it is successfully created.
				</h4>

			</div>
			<!-- End of pop up data -->


			<div class="popupActionsWrapper">
				<span class="popupActions" id="ok"> <label class="actionBtn">Ok
				</label>

				</span><span class="popupActions" id="cancel"> <label
					class="secondaryActionBtn">Cancel </label>

				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>
</div>
<div id="dialog-allo" class="ui-dialog-content ui-widget-content"
	style="width: auto; min-height: 93px; max-height: none; height: auto;">
	<div class="popupContent">

		<div class="popupData popupTitle">

			<h4 class="warning" id="totalCountAllocation"></h4>

		</div>
		<!-- End of pop up data -->


		<div class="ContentTableWrapper">
			<table class="ContentTable" cellspacing="0">
				<tbody id="allocationTablePopUp">



				</tbody>
			</table>
		</div>
		<!-- End of content table wrapper -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn"><a>OK</a></label>



			</span>
		</div>
		<!-- End of popup actions-->


	</div>
	<!-- End of popupContent -->
</div>

<div id="dialog-modal-promo" class="ui-dialog-content ui-widget-content"
	style="width: auto; min-height: 143px; max-height: 543px; height: auto;">
	<div class="popupContent ">
		<div class="popupData contentWrapper ">
			<div id="mainTabs-7"
				class="tabContent ui-tabs ui-widget ui-widget-content ui-corner-all">
				<div id="promo" class="filterTabs">
					<ul
						class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
						role="tablist">
						<li id="curActTab"
							class="ui-state-default ui-corner-top ui-tabs-active ui-state-active"
							role="tab" tabindex="0" aria-controls="promo-1"
							aria-labelledby="ui-id-10" aria-selected="true"
							aria-expanded="true"><a href="#promo-1"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-10">Currently Active</a></li>
						<li id="futActTab" class="ui-state-default ui-corner-top"
							role="tab" tabindex="-1" aria-controls="promo-2"
							aria-labelledby="ui-id-11" aria-selected="false"
							aria-expanded="false"><a href="#promo-2"
							class="ui-tabs-anchor" role="presentation" tabindex="-1"
							id="ui-id-11">Future</a></li>
					</ul>
					<div id="promo-1" aria-labelledby="ui-id-10"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="false">
						<input type="hidden" id="curActTabF" value='0'> <input
							type="hidden" id="futActTabF" value='0'>
						<div class="ContentTableWrapper">
							<div class="tableInfo  currentTitle hideBlock">

								<div class="tableTitle" style="padding-top: 0px !important;">
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
					<div id="promo-2" aria-labelledby="ui-id-11"
						class="ui-tabs-panel ui-widget-content ui-corner-bottom"
						role="tabpanel" aria-hidden="true" style="display: none;">
						<div class="ContentTableWrapper">
							<div class="tableInfo  futureTitle hideBlock">

								<div class="tableTitle" style="padding-top: 0px !important;">
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
		</div>
		<!-- End of pop up data -->
		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn">OK</label>
			</span>
		</div>
	</div>
	<!-- End of popupContent -->
</div>
<div id="dialog-alertBox" title="Order Enquiry">
	<div class="popupContent">

		<div class="popupData">


			<h4 class="alertText" id="alertBox">There is no article to be
				received. Cannot finalize the order.</h4>
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"
					id="okBtn">OK</label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
	</div>
	<!-- End of popupContent -->
</div>

<div id="dialog-openOrders" title="Orders for this Article"
	class="ui-dialog-content ui-widget-content"
	style="width: auto; min-height: 93px; max-height: none; height: auto;">
	<div class="popupContent ">


		<div class="popupData contentWrapper ">

			<div id="openOrders">
				<ul id="OnOrdersTabInPopUp">

					<li id="orderTabInPopUp"><a href="#tabs-2">Orders</a></li>
					<li id="frcstTabInPopUp"><a href="#tabs-3">Forecast Orders</a></li>
				</ul>

				<div id="tabs-2">


					<div class="ContentTableWrapper">

						<div class="tableInfo ">

							<div class="tableTitle topTitle">
								<h4 class="onOrderTitle">
									Total <strong><label id="onOrderCount"></label></strong> Orders
									found
								</h4>
							</div>
							<!-- End of table title -->
							<div
								class="paginationWrapper  onOrderPaginationDiv paginationDiv hideBlock"
								id="paginationDiv11">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>


						</div>
						<!-- End of table info -->
						<div id="orderPopUpCntnt"></div>
						<div class="tableFooter">
							<div
								class="paginationWrapper bottomPagination  onOrderPaginationDiv paginationDiv hideBlock"
								id="paginationDiv12">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
					</div>
					<!-- End of Content Table Wrapper -->


				</div>
				<!-- End of tab 2 -->
				<div id="tabs-3">

					<div class="ContentTableWrapper">

						<div class="tableInfo ">

							<div class="tableTitle topTitle">
								<h4>
									AutoStockR planned forecast for <strong>next 7 days</strong>
								</h4>
							</div>
							<!-- End of table title -->



						</div>
						<!-- End of table info -->
						<div id="frcstOrdersPopUpCntnt"></div>

					</div>
					<!-- End of Content Table Wrapper -->

				</div>
				<!-- End of tab 3 -->
			</div>
			<!-- end of tabs -->



		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn">OK</label>
			</span>
		</div>



	</div>
	<!-- End of popupContent -->
</div>

<div id="dialog-alt-pricing" class="ui-dialog-content ui-widget-content"
	style="width: auto; min-height: 93px; max-height: none; height: auto;">
	<div class="popupContent">

		<!-- 	<div class="popupData popupTitle">

				<h4 class="warning" id="">
					
				</h4>

			</div>-->
		<!-- End of pop up data -->


		<div class="ContentTableWrapper">

			<div class="tableTitle" style="padding-top: 0px;">
				<h4 class="sectionTitle">
					<strong>Other Price</strong>
				</h4>
			</div>
			<table class="ContentTable" cellspacing="0">
				<tbody class="otherPriceInfoInPop">

				</tbody>
			</table>

		</div>
		<!-- End of content table wrapper -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn"><a>OK</a></label>



			</span>
		</div>
		<!-- End of popup actions-->


	</div>
	<!-- End of popupContent -->
</div>
<div class="quickHelpWrapper filterWrapper hideBlock">
	<div class="quickHelpContent">
		<div class="quickHelpTitle">
			<h4 class="title">Filters</h4>
			<a class="close" onClick="$('.filterWrapper').fadeOut(50);"
				title="Close">Close</a>
			<p class="description">The filters allows you to minimise the
				list of records and let you quickly find relevant information.</p>
		</div>
		<!-- End of quick help title -->
		<div class="content">
			<h4 class="title">How to use it?</h4>
			<ul>
				<li>Identify the columnn you want to filter</li>
				<li>Locate the input box in the filter row corresponding to the
					identified column</li>
				<li>Start typing letters or numbers based on the column values</li>
				<li>The list filters based on every character or number entry</li>
				<li>Click on 'Clear Filter' to remove filters</li>
			</ul>
		</div>
		<!-- End of content -->
	</div>
	<!-- End of quick help content -->
</div>


<div id="submitAll-dialog" title="Create Orders">
	<div class="popupContent">

		<div class="popupData popupTitle">

			<h4 class="warning">
				Please click on <label class="saveRecord">&nbsp;</label> button to create order.
			</h4>

		</div>
		<!-- End of pop up data -->


		<div class="ContentTableWrapper" style="max-height: 451px;!important">
			<table class="ContentTable" cellspacing="0">
				<thead id="articleSearchTbody">
					<tr>
						<th>Supplier</th>
						<th>Delivery Date</th>
						<th class="centerValue">No of Articles</th>
						<th width="40px" class="centerValue lastColumn">Submit</th>
					</tr>
				</thead>
				<tbody id="submitOrderContent">
				</tbody>
			</table>
		</div>
		<!-- End of content table wrapper -->

		<div class="popupActionsWrapper">
			<span class=""> <b>Note : </b>Article count should not exceed <b><I id="maxArticleLimit"></I></b> to create order. 
			</span>
			<span class="popupActions"> <label class="secondaryActionBtn" id="cancelButton">Cancel</label>
				<label class="actionBtn hideBlock" id="addtolist">Add to List</label>
			</span>
		</div>
		<!-- End of popup actions-->


	</div>
	<!-- End of popupContent -->
</div>
<div id="dialog-delivery-result" title="Confirm Modified Delivery Date">
		<div class="popupContent">
			<div class="popupData" id="dialog-delivery-result-content">
			</div>
			<div class="popupActionsWrapper">
				<span class="popupActions"> 
				<label class="actionBtn" onclick="$('#dialog-delivery-result').dialog('close');">Cancel</label>
				<label class="actionBtn" id="nextDD">Next</label>
				<label class="actionBtn" id="previousDD">Previous</label>
				<label class="actionBtn" id="submitDeliveryDateList">Proceed To Create</label>
				</span>
			</div>
		</div>
	</div>
