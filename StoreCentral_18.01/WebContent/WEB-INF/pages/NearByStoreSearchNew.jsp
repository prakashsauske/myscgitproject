

		<div class="contentWrapper nearByLookup hideBlock">

			<div class="ContentTableWrapper">

				<div class="tableInfo tempFix">

					<div class="tableTitle ">
						<h4>
							Nearby Stores for '<strong><label class="nearByTitle"></label></strong>'
						</h4>
					</div>
					<!-- End of table title -->
					
					<div
							class="paginationWrapper  nearByPagination paginationDiv hideBlock"
							id="paginationDiv1">
							<div class="pagination-holder clearfix">
								<div id="compact-pagination"
									class="compact-theme simple-pagination"></div>
							</div>
						</div>

				</div>
				<!-- End of table info -->


				<div class="tableActionsBtnsWrapper">
					<div class="lookupActionWrapper">
						<label class="linkBtn" id="addActionBtn"><label
							class="filter">Refine Search</label></label>
						<div class="errorDiv" id="errorMsgDivNear">
							
								<label id="msg"> </label>
						</div>

					</div>
					<!-- End of lookup action wrapper -->


				</div>
				<!-- End of table actions btn wrapper -->

				<div class="tableActionsWrapper" id="tableAddAction">

					<form 
						id="NearbyStoreSearchForm">
						<input type="hidden" id="index" name="index" /> <input
							type="hidden" class="articleNo" name="articleNo"
							id="articleNo" /> <input type="hidden"
							class="articleName" name="articleName"
							id="articleName" /> <input type="hidden" id="articleBaseUom"
							name="articleBaseUom" class="uom" /> <input
							type="hidden" id="checkedValues" name="checkedValues"
							value="" /> <input type="hidden"
							id="retainSalesOrg" name="retainSalesOrg"
							value="${user.salesOrg}" />
						<div class="formWrapper">

							<div class="parameter">
								<label for="store">Store #</label> <input type="text"
									class="textbox  siteNoField"
									placeholder="Enter store no or name" name="siteNo" id="siteNo"
									 maxlength="10"/>

							</div>
							<!-- End of parameter -->

							<div class="parameter dropdownAlign nearbyStore">
																<%
									int j = 1;
								%>
								<label for="salesOrg">Sales Org.</label>

								<div id="dropdown" class="selectDropdown">
										
									<label id="dropdownSelect" class="selectLabel">${model.param.salesOrgLabel}</label>


									<ul class="dropdown">

											
																					
										  <c:forEach items="${salesOrgTypes}" var="salesOrgTypes">
											<li><input type="checkbox" class="pointerFix" id="store-<%= j %>"
												name="salesOrg" value="${salesOrgTypes.salesOrgNO}"
												<c:if test="${salesOrgTypes.checked=='Y'}">checked</c:if>>
												<label class="dropdownLabel pointerFix" for="=" store-<%=j++%>">${salesOrgTypes.salesOrgNO}
													| ${salesOrgTypes.salesOrgName}</label></li>
										</c:forEach>
										<li><label class="secondaryActionBtn dropdownActions"
											id="dropdownCancelBtn" style="display:inline-block;">Cancel</label> <label
											id="dropdownDoneBtn" class="actionBtn dropdownActions">Done</label>


										</li>
									</ul>
								</div>

							</div>
							<!-- End of parameter -->
							<!-- End of parameter -->



							<div class="parameter">
								<label for="distance">Distance</label> <select
									class="selectOptions" name="distance" id="distance"
									value="${model.param.distance}">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
									<option value="40">40</option>
									<option value="50">50</option>
									<option value="80">80</option>
									<option value="100">100</option>
								</select> <label for="">KM</label>
							</div>

							<div class="parameter">
								<label for="numStores">Max No. of Stores</label> <select
									class="selectOptions" name="maxStores" id="maxStores"
									 value="${model.param.maxStores}">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
									<option value="40">40</option>
									<option value="50">50</option>
									<option value="80">80</option>
									<option value="100">100</option>
								</select>
							</div>

							<div class="formActions">
								<label class="actionBtn" id="searchNear">Search</label> <label
									class="secondaryActionBtn" id="closeLinkNear">Close</label>
							</div>
							<!-- End of form actions -->

						</div>

						<!-- End of content table wrapper -->
					<!--  <input type="hidden" value="${model.param.salesOrg}"
							id="dropretainSalesOrg" /> <input type="hidden"
							value="${model.param.maxStores}" id="dropretainMaxStore" /> <input
							type="hidden" value="${model.param.distance}"
							id="dropretainDistance" /> -->
					</form>

				</div>


				<!-- End of table Actions Wrapper -->


					<table cellspacing="0" class="ContentTable hideBlock drilldownTable" id="nearbyStoresResultTable">
						<thead>
							<tr class="collapsed"><th class="noSort expander" width="10px">
								<!-- <span class="indenter">
									<a href="#" title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>
								</span> -->
								</th>
								<th data-sort="int">Store #</th>
								<th data-sort="string">Store Name</th>
								<th data-sort="float"
								id="soh"
									class="numberColumn ${properties.ViewSOHofotherstores}">Stock
									on Hand</th>
								<th data-sort="float"
								id="sp"
									class="numberColumn ${properties.ViewSellPriceofotherstores}">Sell
									Price</th>
								<th data-sort="float" class="numberColumn">Promo Price</th>
								<th id="rangedFlag" class="numberColumn ${properties.ViewRangingofotherstores}">Ranged</th>
								<th data-sort="float" class="numberColumn">Distance (km)</th>
							</tr>
						</thead>
						<tbody>

							<!-- onclick="navigateToDetail();"-->
								
						</tbody>
					</table>
					
					<div
									class="paginationWrapper bottomPagination  nearByPagination paginationDiv hideBlock"
									id="paginationDiv2">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
			</div>
			<!-- End of content table wrapper -->



		</div>





