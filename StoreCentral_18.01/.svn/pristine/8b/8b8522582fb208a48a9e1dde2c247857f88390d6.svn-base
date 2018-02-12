<!DOCTYPE html>
<html>
<head>
<title>Promotions Planning</title>

<link href="style/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="style/common.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="style/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<link href="style/simplePagination.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="style/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="script/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="script/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="script/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="script/date.js?version=${properties.version}"></script>
<script type="text/javascript" src="script/daterangepicker.jQuery.js?version=${properties.version}"></script>
<script type="text/javascript" src="script/jquery.treetable.js?version=${properties.version}"></script>

<link href="style/bigw.css?version=${properties.version}" rel="stylesheet" type="text/css" />


<script src="script/jquery.jWizard.js?version=${properties.version}"></script>


</head>
<body>

	<div class="mainWrapper">



		<div class="headWrapper">
			<div class="header">

				<div class="logoWrapper">
					<div class="logoImg">&nbsp;</div>
				</div>
				<!-- End of logo wrapper -->


				<div class="globalLinksWrapper">
					<div class="userProfile">

						<ul id="menu">
							<li class="globalLinkLabel">Username: <a href="#"
								class="globalLinkAccountName">James Smith</a>

								<ul>
									<li><a href="#">Preferences</a></li>
									<li><a href="#">Change Stores</a></li>
									<li><a href="#">Change Password</a></li>
									<li class="lastMenuItem"><a href="#">Logout</a></li>
								</ul>
							</li>
						</ul>

					</div>
					<div class="store">
						<label class="globalLinkLabel">Store: Chester Hill</label>
					</div>
				</div>

			</div>
			<!-- End of Header -->



			<div class="navWrapper">
				<ul class="sf-menu" id="mainmenu">
					<li id="home" class="home text-color"><a href="#"
						class="homeLink">&nbsp;</a></li>

					<li class="text-color"><a href="#">Lookup</a></li>
					<li class="text-color "><a href="#">Orders</a></li>
					<li class="text-color "><a href="#">Reports</a></li>
					<li class="text-color"><a href="#">Stock Management</a></li>
					<li class="text-color selectedMenu"><a href="#">Pricing</a>
						<ul class="innermenu">
							<li class="reportBtmBrdr"><a href="#" class="text-color">Promotions
									Management</a></li>
							<li class="reportBtmBrdr"><a href="#" class="text-color">In-store
									Promotion</a>
								<ul class="innermenu">
									<li class="reportBtmBrdr"><a
										href="Promotion_Display_BigW_v3.html" class="text-color">Display</a>
									</li>
								</ul></li>
							<li class="reportBtmBrdr"><a href="#" class="text-color">Audit
									Trail</a></li>
							<li class="reportBtmBrdr"><a href="#" class="text-color">Promotion
									Article Review</a></li>
						</ul></li>

					<li class="text-color lastMenuItem"><a href="#">Ticketing</a>
					</li>


				</ul>

			</div>


			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='#'>Home</a></li>

						<li class="currentPage">Promotions Planning</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock">We are getting data,
						please wait</label> <label class="secondaryActionBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->






		<div class="contentWrapper directContent reportWrapper wizardPage">

			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle">
						<h4 class="sectionTitle">Promotions Planning</h4>
					</div>
					<!-- End of table title -->

				</div>
				<!-- End of table info -->

			</div>
			<!-- End of Content Table wrapper -->


			<div class="wizardContent">

				<form method="POST" action="" id="wizard">



					<div class="formWrapper"
						data-jwizard-title="Step 1: Select Criteria">
						<p>&nbsp;</p>

						<div class="parameter">
							<label for="department" class="">Promotions for</label> <select
								class="selectOptions">
								<option>Current Week</option>
								<option>Next Week</option>
								<option>Two Weeks Out</option>
								<option>Three Weeks Out</option>
							</select>
						</div>
						<!-- End of parameter -->


						<div class="parameter clearfix">
							<label for="department">Department</label> <select
								class="selectOptions">
								<option>Select</option>
								<option>General Merchandise</option>
								<option>Perishables</option>
								<option>Groceries</option>
								<option>Non Trading</option>
								<option>Meat</option>
								<option>Liquor</option>
								<option>Personal Care</option>
								<option>Health</option>
								<option>Baked Items</option>

							</select>

							<div class="searchByOptions onlyCheckbox">
								<input type="checkbox" name="depH" value="depH" id="depH"><label
									for="depH" class="labelText">Select Sub-category from
									Hierarchy</label>
							</div>
							<!-- End of search options -->


						</div>
						<!-- End of parameter -->



						<div class="hierarchyWrapper clearfix hideBlock"
							id="articleHierarchy">

							<!-- Department -->
							<div class="hierarchyContent" id="deptDiv">

								<div class="hierarchyTitle">
									<h3>Department</h3>
								</div>
								<!-- End of hierarchy Title -->

								<div class="hierarchyList">
									<ul>
										<li><input type="radio" name="departmentList"
											value="deptValue1" id="deptValue1"><label
											for="deptValue1" class="labelText">General
												Merchandise</label></li>
										<li><input type="radio" name="departmentList"
											value="deptValue2" id="deptValue2"><label
											for="deptValue2" class="labelText">Perishables</label></li>
										<li><input type="radio" name="departmentList"
											value="deptValue3" id="deptValue3"><label
											for="deptValue3" class="labelText">Groceries</label></li>
										<li><input type="radio" name="departmentList"
											value="deptValue4" id="deptValue4"><label
											for="deptValue4" class="labelText">Non Trading</label></li>
										<li><input type="radio" name="departmentList"
											value="deptValue5" id="deptValue5"><label
											for="deptValue5" class="labelText">Meat</label></li>
										<li><input type="radio" name="departmentList"
											value="deptValue6" id="deptValue6"><label
											for="deptValue6" class="labelText">Liquor</label></li>
										<li><input type="radio" name="departmentList"
											value="deptValue7" id="deptValue7"><label
											for="deptValue7" class="labelText">Personal Care</label></li>
										<li><input type="radio" name="departmentList"
											value="deptValue8" id="deptValue8"><label
											for="deptValue8" class="labelText">Health</label></li>
										<li><input type="radio" name="departmentList"
											value="deptValue9" id="deptValue9"><label
											for="deptValue9" class="labelText">Baked Items</label></li>
										<li><input type="radio" name="departmentList"
											value="deptValue10" id="deptValue10"><label
											for="deptValue10" class="labelText">Coupons</label></li>
									</ul>
								</div>
								<!-- End of hierarchy Title -->

								<div class="heirachyBottom">
									<span class="totalCount"> <label>Total:<strong>10</strong></label>
									</span>

								</div>
								<!-- End of hierarchy bottom -->

							</div>
							<!-- End of hierarchy Content -->

							<!-- Category -->
							<div class="hierarchyContent" id="catDiv">

								<div class="hierarchyTitle">
									<h3>Category</h3>
								</div>
								<!-- End of hierarchy Title -->

								<div class="hierarchyList">

									<div class="noSelection">
										<label>Please select any department to see it's
											associated categories.</label>
									</div>
									<!-- End of no selection -->

									<label class="loading hideBlock">&nbsp;</label>

									<ul class="hideBlock">
										<li><input type="radio" name="categoryList"
											value="catValue1" id="catValue1"><label
											for="catValue1" class="labelText">Category One</label></li>
										<li><input type="radio" name="categoryList"
											value="catValue2" id="catValue2"><label
											for="catValue2" class="labelText">Category Two</label></li>
										<li><input type="radio" name="categoryList"
											value="catValue3" id="catValue3"><label
											for="catValue3" class="labelText">Category Three</label></li>
										<li><input type="radio" name="categoryList"
											value="catValue4" id="catValue4"><label
											for="catValue4" class="labelText">Category Four</label></li>
										<li><input type="radio" name="categoryList"
											value="catValue5" id="catValue5"><label
											for="catValue5" class="labelText">Category Five</label></li>
										<li><input type="radio" name="categoryList"
											value="catValue6" id="catValue6"><label
											for="catValue6" class="labelText">Category Six</label></li>
										<li><input type="radio" name="categoryList"
											value="catValue7" id="catValue7"><label
											for="catValue7" class="labelText">Category Seven</label></li>
										<li><input type="radio" name="categoryList"
											value="catValue8" id="catValue8"><label
											for="catValue8" class="labelText">Category Eight</label></li>
										<li><input type="radio" name="categoryList"
											value="catValue9" id="catValue9"><label
											for="catValue9" class="labelText">Category Nine</label></li>
										<li><input type="radio" name="categoryList"
											value="catValue10" id="catValue10"><label
											for="catValue10" class="labelText">Category Ten</label></li>
									</ul>
								</div>
								<!-- End of hierarchy Title -->

								<div class="heirachyBottom">
									<span class="totalCount hideBlock"> <label>Total:<strong>10</strong></label>
									</span>
								</div>
								<!-- End of heirachy bottom -->

							</div>
							<!-- End of hierarchy Content -->


							<!-- Sub-category -->
							<div class="hierarchyContent" id="subCatDiv">

								<div class="hierarchyTitle">
									<h3>Sub-category</h3>
								</div>
								<!-- End of hierarchy Title -->

								<div class="hierarchyList">

									<div class="noSelection">
										<label>Please select any category to see
											sub-categories.</label>
									</div>
									<!-- End of -->

									<label class="loading hideBlock">&nbsp;</label>

									<ul class="hideBlock" class="hideBlock">
										<li><input type="radio" name="subCatList"
											value="subValue1" id="subValue1"><label
											for="subValue1" class="labelText">Sub-category One</label></li>
										<li><input type="radio" name="subCatList"
											value="subValue2" id="subValue2"><label
											for="subValue2" class="labelText">Sub-category Two</label></li>
										<li><input type="radio" name="subCatList"
											value="subValue3" id="subValue3"><label
											for="subValue3" class="labelText">Sub-category Three</label></li>
										<li><input type="radio" name="subCatList"
											value="subValue4" id="subValue4"><label
											for="subValue4" class="labelText">Sub-category Four</label></li>
										<li><input type="radio" name="subCatList"
											value="subValue5" id="subValue5"><label
											for="subValue5" class="labelText">Sub-category Five</label></li>
										<li><input type="radio" name="subCatList"
											value="subValue6" id="subValue6"><label
											for="subValue6" class="labelText">Sub-category Six</label></li>
										<li><input type="radio" name="subCatList"
											value="subValue7" id="subValue7"><label
											for="subValue7" class="labelText">Sub-category Seven</label></li>
										<li><input type="radio" name="subCatList"
											value="subValue8" id="subValue8"><label
											for="subValue8" class="labelText">Sub-category Eight</label></li>
										<li><input type="radio" name="subCatList"
											value="subValue9" id="subValue9"><label
											for="subValue9" class="labelText">Sub-category Nine</label></li>
										<li><input type="radio" name="subCatList"
											value="subValue10" id="subValue10"><label
											for="subValue10" class="labelText">Sub-category Ten</label></li>
									</ul>
								</div>
								<!-- End of hierarchy Title -->

								<div class="heirachyBottom">
									<span class="totalCount hideBlock"> <label>Total:<strong>10</strong></label>
									</span>
								</div>
								<!-- End of heirachy bottom -->

							</div>
							<!-- End of hierarchy Content -->

							<!-- Segment -->
							<div class="hierarchyContent lastContent" id="segDiv">

								<div class="hierarchyTitle">
									<h3>Segment</h3>
								</div>
								<!-- End of hierarchy Title -->

								<div class="hierarchyList">

									<div class="noSelection">
										<label>Please select any sub-category to see segments.</label>
									</div>
									<!-- End of -->

									<label class="loading hideBlock">&nbsp;</label>

									<ul class="hideBlock">
										<li><input type="radio" name="segmentList"
											value="segValue1" id="segValue1"><label
											for="segValue1" class="labelText">Segment One</label></li>
										<li><input type="radio" name="segmentList"
											value="segValue2" id="segValue2"><label
											for="segValue2" class="labelText">Segment Two</label></li>
										<li><input type="radio" name="segmentList"
											value="segValue3" id="segValue3"><label
											for="segValue3" class="labelText">Segment Three</label></li>
										<li><input type="radio" name="segmentList"
											value="segValue4" id="segValue4"><label
											for="segValue4" class="labelText">Segment Four</label></li>
										<li><input type="radio" name="segmentList"
											value="segValue5" id="segValue5"><label
											for="segValue5" class="labelText">Segment Five</label></li>
										<li><input type="radio" name="segmentList"
											value="segValue6" id="segValue6"><label
											for="segValue6" class="labelText">Segment Six</label></li>
										<li><input type="radio" name="segmentList"
											value="segValue7" id="segValue7"><label
											for="segValue7" class="labelText">Segment Seven</label></li>
										<li><input type="radio" name="segmentList"
											value="segValue8" id="segValue8"><label
											for="segValue8" class="labelText">Segment Eight</label></li>
										<li><input type="radio" name="segmentList"
											value="segValue9" id="segValue9"><label
											for="segValue9" class="labelText">Segment Nine</label></li>
										<li><input type="radio" name="segmentList"
											value="segValue10" id="segValue10"><label
											for="segValue10" class="labelText">Segment Ten</label></li>
									</ul>
								</div>
								<!-- End of hierarchy Title -->

								<div class="heirachyBottom">
									<span class="totalCount hideBlock"> <label>Total:<strong>10</strong></label>
									</span>

								</div>
								<!-- End of heirachy bottom -->

							</div>
							<!-- End of hierarchy Content -->


						</div>
						<!-- end of hierarchy Wrapper -->






						<div class="parameter clearfix">
							<label for="article">Article</label> <input type="#"
								class="textbox articleSearchText" id="article"
								placeHolder="search by">
							<div class="searchByOptions">
								<input type="radio" checked="" id="number" value="number"
									name="searchByOptions"><label class="labelText"
									for="number">Number</label> <input type="radio"
									id="description" value="description" name="searchByOptions"><label
									class="labelText" for="description">Description</label> <input
									type="radio" id="reference" value="reference"
									name="searchByOptions"><label class="labelText"
									for="reference">EAN</label>
							</div>
						</div>
						<!-- End of parameter -->





						<div class="parameter">
							<label for="sourceOfSupply">Source of Supply</label> <span
								class="reportRadio"> <input type="radio"
								name="sourceSupply" value="all" id="all" checked><label
								for="all" class="labelText">All</label> <input type="radio"
								name="sourceSupply" value="warehouse" id="warehouse"><label
								for="warehouse" class="labelText">Warehouse</label> <input
								type="radio" name="sourceSupply" value="vendor" id="vendor"><label
								for="vendor" class="labelText">Vendor</label>
							</span>
							<!-- End of report radio -->



							<div class="parameter supplierSource IBTSource">

								<span id="allField"> <input type="#" class="textbox"
									style="visibility: hidden;">

								</span> <span id="warehouseField" class="hideBlock"> <input
									type="#" class="textbox"
									placeHolder="Enter warehouse no. or name"> <label
									class="linkBtn" id="verifySupplier"><label
										class="advancedSearch">Verify</label></label>
								</span> <span id="vendorField" class="hideBlock"> <input
									type="#" class="textbox" placeHolder="Enter vendor no. or name">
									<label class="linkBtn" id="verifySupplier"><label
										class="advancedSearch">Verify</label></label>

								</span>
							</div>
							<!-- End of parameter -->

						</div>
						<!-- End of parameter -->

						<div class="parameter clearfix">
							<label for="group">Sort by</label> <select
								class="selectOptions supplyDrop">
								<option>Category</option>
								<option>Display</option>
								<option>Media</option>
								<option>Promotion Details</option>
								<option>Sales</option>

							</select>
						</div>
						<!-- End of parameter -->


						<hr class="sectionDivider clearfix" />


						<div class="parameter ">
							<label for="promotions">Promotions</label> <select
								class="selectOptions" id="promotions">
								<option>All</option>
								<option>New</option>
								<option>Modified</option>
								<option>Old</option>
							</select>
						</div>
						<!-- End of parameter -->

						<div class="parameter clearfix">
							<label for="type">Type</label> <select class="selectOptions"
								id="type">
								<option>All</option>
								<option>Central</option>
								<option>Instore</option>
							</select>
						</div>
						<!-- End of parameter -->

						<hr class="sectionDivider clearfix" />




						<div class="parameter clearfix parameterRow">
							<label for="filter">Filter by</label> <span
								class="multipleOptions"> <span class="option"> <label>Min.
										Discount</label> <input type="#"
									class="textbox textboxDefaultText numberBox">%
							</span> <!-- End of options --> <span class="option"> <label>Display
										Type</label> <select class="selectOptions">
										<option>
											Select
											</seletc>
										<option>FGE</option>
										<option>TV</option>
								</select>
							</span> <!-- End of options --> <span class="option"> <label>Difference
										in OM</label> <input type="#"
									class="textbox textboxDefaultText numberBox"> <span
									class="reportRadio"> <input type="radio" name="diffOM"
										value="unit" id="unit" checked><label for="unit"
										class="labelText">Unit</label> <input type="radio"
										name="diffOM" value="perc" id="perc"><label for="perc"
										class="labelText">%</label>
								</span> <!-- End of report radio -->


							</span> <!-- End of options -->
							</span>
							<!-- End of multiple options -->


						</div>
						<!-- End of parameter -->

						<hr class="sectionDivider clearfix" />


						<div class="parameter clearfix onlyCheckbox">
							<input type="checkbox" name="ranged" value="ranged" id="actioned"><label
								for="actioned" class="labelText">Don't show previously
								completed articles</label>
						</div>
						<!-- End of parameter -->

						<div class="parameter clearfix onlyCheckbox">
							<input type="checkbox" name="resi" value="resi" id="resi"><label
								for="resi" class="labelText">Show articles containing
								Display / Residual Qty. </label>
						</div>
						<!-- End of parameter -->




					</div>
					<!-- End of content table wrapper -->



					<div class="formWrapper"
						data-jwizard-title="Step 2: Review or Plan Promotion Details">
						<h2 class="wizardTitle">
							Current Week: Sales Plan for Grocery <label>- Grouped by
								Category </label>
						</h2>


						<div id="sections">
							<ul>
								<li><a href="#section-1">A</a></li>
								<li><a href="#section-2">B</a></li>
								<li><a href="#section-3">C</a></li>
								<li><a href="#section-4">D</a></li>
								<li><a href="#section-5">E</a></li>
								<li><a href="#section-6">F</a></li>
								<li><a href="#section-7">G</a></li>
								<li><a href="#section-8">H</a></li>
								<li><a href="#section-9">I</a></li>
								<li><a href="#section-10">J</a></li>
								<li><a href="#section-11">K</a></li>
								<li><a href="#section-12">L</a></li>
								<li><a href="#section-13">M</a></li>
								<li><a href="#section-14">N</a></li>
								<li><a href="#section-15">O</a></li>
								<li><a href="#section-16">P</a></li>
								<li><a href="#section-17">Q</a></li>
								<li><a href="#section-18">R</a></li>
								<li><a href="#section-19">S</a></li>
								<li><a href="#section-20">T</a></li>
								<li><a href="#section-21">U</a></li>
								<li><a href="#section-22">V</a></li>
								<li><a href="#section-23">W</a></li>
								<li><a href="#section-24">X</a></li>
								<li><a href="#section-25">Y</a></li>
								<li><a href="#section-26">Z</a></li>
								<li><a href="#section-27">Others</a></li>




							</ul>


							<div id="section-1">

								<div id="accordion-1" class="accordionWrapper innerAccordion">

									<h3>
										Aircare <span class="summaryInfo"> <span
											class="completionStatus"><label class="allOk">&nbsp;</label></span>
											<label>Total: <strong>3</strong> articles
										</label>
										</span>
									</h3>
									<div class="accordionContentHolder">

										<label class="loading hideBlock">We are getting data,
											please wait</label>


										<div class="ContentTableWrapper">



											<div class="tableInfo">

												<div class="tableTitle">
													<h4>
														Total <strong>3</strong> articles
													</h4>
												</div>
												<!-- End of table title -->

												<div class="paginationWrapper hideBlock">
													<div class="pagination-holder clearfix">
														<div id="compact-pagination"
															class="compact-theme simple-pagination">
															<ul>
																<li class="active"><span class="disabled prev">Prev</span></li>
																<li class="active"><span class="current">1</span></li>
																<li><a class="page-link" href="#page-2">2</a></li>
																<li><a class="page-link" href="#page-3">3</a></li>

																<li><a class="page-link next" href="#page-2">Next</a></li>
															</ul>
														</div>
													</div>

												</div>
												<!-- End of pagination Wrapper -->

											</div>
											<!-- End of table info -->

											<table cellspacing="0" id="treetable"
												class="ContentTable treetable drilldownTable drillsOpenDefault compactTable">

												<thead>
													<tr>

														<th rowspan="2" class="centerValue columnDivider">UOM</th>
														<th colspan="4" class="centerValue columnDivider">Promotion</th>
														<th colspan="2" class="centerValue columnDivider">Advertising</th>
														<th colspan="2" class="centerValue columnDivider">Forecast</th>
														<th rowspan="2" class="centerValue columnDivider">OM</th>
														<th colspan="2" class="centerValue columnDivider">Sales</th>
														<th colspan="3" class="centerValue columnDivider">Store</th>
														<th colspan="2" class="centerValue lastColumn">Source</th>

													</tr>

													<tr class="subHeader">


														<th>Week</th>
														<th class="centerValue">Days</th>
														<th class="numberColumn">Price</th>
														<th class="numberColumn">Savings</th>

														<th class="centerValue">Display</th>
														<th class="centerValue columnDivider">Media</th>

														<th class="centerValue">Base</th>
														<th class="centerValue columnDivider">Promo</th>

														<th class="centerValue">WTD</th>
														<th class="centerValue columnDivider">Est. WTD</th>


														<th class="centerValue" width="40px">Demand</th>
														<th class="centerValue" width="40x">Display</th>
														<th class="centerValue columnDivider" width="40px">Residual</th>

														<th class="centerValue lastColumn">Supplier</th>
													</tr>

												</thead>

												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">82503 - GLEN 20
														SURFACE DISOCOUNTRY SCENT 300G <span class="rowActions">

															<span id="dropdown" class="selectDropdown"> <label
																class="actionBtn" id="dropdownSelect" tabindex="3"><label
																	class="createBtn">In-store</label></label>
																<ul class="dropdown">
																	<li><label class="dropdownLabel" id="deactivate">De-activate</label></li>
																</ul>
														</span> <label class="history"><a href="#">Promotion
																	Sales History</a></label>

													</span>

													</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">5.49</td>
													<td class="numberColumn">1.30</td>

													<td class="columnDivider">F-000</td>
													<td class="centerValue"></td>

													<td class="centerValue">0</td>
													<td class="centerValue columnDivider">1</td>

													<td class="columnDivider">9</td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">2</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode deactivate"
														placeholder="2" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode deactivate"
														placeholder="0" title="Store Display"></td>
													<td class="centerValue columnDivider"></td>
													<td class="centerValue lastColumn">1979</td>

												</tr>





												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">15587 - GLEN 20
														SURFACE DISOORIGINAL 300G <span class="rowActions">
															<label class="history"><a href="#">Promotion
																	Sales History</a></label>
													</span>

													</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">5.49</td>
													<td class="numberColumn">1.30</td>

													<td class="columnDivider">F-000 <a class="moreNumber"
														href="#">+1</a></td>
													<td class="centerValue"></td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">2</td>

													<td class="columnDivider">9</td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">3</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="3" title="Store Demand" disabled></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="" title="Store Display" disabled></td>
													<td class="centerValue columnDivider"></td>
													<td class="centerValue lastColumn">1979</td>

												</tr>


												<tr class="noChild additionalPromos" data-tt-parent-id="8"
													data-tt-id="10">
													<td colspan="18">

														<table cellspacing="0" width="100%" class="secondaryTable">
															<tbody>
																<tr>
																	<th class="centerValue columnDivider" colspan="4">Promotion</th>
																	<th class="centerValue columnDivider" colspan="2">Advertising</th>
																	<th class="centerValue storeSubHr" colspan="1">Store</th>
																	<th class="residueTd centerValue columnDivider"
																		colspan="1">Sales</th>
																	<th width="100px" class="centerValue lastColumn "
																		rowspan="2">De-activate</th>
																</tr>
																<tr class="subHeader">
																	<th class="centerValue" style="width: 100px">Day</th>
																	<th class="centerValue" style="width: 150px">Date</th>
																	<th class="numberColumn centerValue">Price</th>
																	<th class="numberColumn columnDivider centerValue">Savings</th>
																	<th class="centerValue ">Display</th>
																	<th class="columnDivider centerValue">Media</th>
																	<th width="50px" class="centerValue displayTd">Display</th>

																	<th width="50px"
																		class="residueTd centerValue columnDivider">Residual</th>
																</tr>
																<tr id="0"
																	class="secondary-line-item line-item onlyRows">
																	<td class="centerValue">Wed - Tue</td>
																	<td class="centerValue">12/11 - 18/11/2014</td>
																	<td class="numberColumn centerValue">$4.01</td>
																	<td class="numberColumn columnDivider centerValue">$-4.01</td>
																	<td class="centerValue displayMore">F-000</td>
																	<td title="" class="centerValue columnDivider"></td>
																	<td class="centerValue centerValue"><input
																		type="text" title="Store Display" value=""
																		class="editNumCell tabIndex  5-0553055  textbox textboxDefaultText restrict editMode displayQty displayQty-first"
																		tabindex="6"></td>

																	<td class="residueTd centerValue columnDivider">0</td>
																	<td class="centerValue"></td>

																</tr>
																<tr id="1"
																	class="secondary-line-item line-item onlyRows">
																	<td class=" centerValue">Wed - Tue<span
																		class="start-end-day hideBlock">Wed - Tue</span></td>
																	<td class="centerValue">12/11 - 18/11/2014</td>
																	<td class="numberColumn centerValue">$4.01</td>
																	<td class="numberColumn  centerValue columnDivider">$-4.01</td>
																	<td class="centerValue displayMore"><label>In-store</label></td>
																	<td title="" class="centerValue columnDivider"></td>

																	<td class="centerValue"><input type="text"
																		title="Store Display" value="" maxlength="4"
																		class="editNumCell tabIndex  8-0553055  textbox textboxDefaultText restrict editMode displayQty"
																		id="8-0553055" tabindex="7"></td>

																	<td class="residueTd centerValue columnDivider ">0</td>
																	<td class="centerValue"><a href="#"
																		id="deactiveInner"><label class="negativeFlag">&nbsp;</label></a></td>

																</tr>
															</tbody>
														</table>

													</td>
												<tr>
												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">331029 - GLEN20
														SURFACE DISCO CITRUS BREEZE 300G</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">5.49</td>
													<td class="numberColumn">1.30</td>

													<td class="columnDivider">F-000</td>
													<td class="centerValue"></td>

													<td class="centerValue">0</td>
													<td class="centerValue columnDivider">1</td>

													<td class="columnDivider">9</td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">1</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="1" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="0" title="Store Display"></td>
													<td class="centerValue columnDivider"></td>
													<td class="centerValue lastColumn">1979</td>

												</tr>




											</table>


											<div class="paginationWrapper bottomPagination hideBlock">
												<div class="pagination-holder clearfix">
													<div id="compact-pagination"
														class="compact-theme simple-pagination">
														<ul>
															<li class="active"><span class="disabled prev">Prev</span></li>
															<li class="active"><span class="current">1</span></li>
															<li><a class="page-link" href="#page-2">2</a></li>
															<li><a class="page-link" href="#page-3">3</a></li>
															<li><a class="page-link next" href="#page-2">Next</a></li>
														</ul>
													</div>
												</div>
											</div>
											<!-- End of pagination wrapper -->



										</div>
										<!-- End of content table wrapper -->

										<div class="pageActions ">

											<div class="instructionalText hideBlock">
												<label>Please verify all <strong>50</strong>
													articles before you click on Save and move to next.
												</label>
											</div>
											<!-- End of instructional text -->

											<button class="actionBtn">
												<label>Save & Next</label>
											</button>
											<button class="secondaryActionBtn hideBlock">Reset</button>
										</div>
										<!-- End of page actions-->



									</div>
									<!-- end of accordion Content Holder -->





								</div>
								<!-- end of inner Accordion -->



							</div>
							<!-- End of section 1 -->


							<div id="section-3">

								<div id="accordion-3" class="accordionWrapper innerAccordion">

									<h3>
										Coffee <span class="summaryInfo"> <span
											class="completionStatus"><label class="allOk">&nbsp;</label></span>
											<label>Total: <strong>2</strong> articles
										</label>
										</span>
									</h3>
									<div class="accordionContentHolder">

										<label class="loading hideBlock">We are getting data,
											please wait</label>


										<div class="ContentTableWrapper">



											<div class="tableInfo">

												<div class="tableTitle">
													<h4>
														Total <strong>2</strong> articles
													</h4>
												</div>
												<!-- End of table title -->

												<div class="paginationWrapper hideBlock">
													<div class="pagination-holder clearfix">
														<div id="compact-pagination"
															class="compact-theme simple-pagination">
															<ul>
																<li class="active"><span class="disabled prev">Prev</span></li>
																<li class="active"><span class="current">1</span></li>
																<li><a class="page-link" href="#page-2">2</a></li>
																<li><a class="page-link" href="#page-3">3</a></li>

																<li><a class="page-link next" href="#page-2">Next</a></li>
															</ul>
														</div>
													</div>

												</div>
												<!-- End of pagination Wrapper -->

											</div>
											<!-- End of table info -->

											<table cellspacing="0" id="treetable"
												class="ContentTable treetable drilldownTable drillsOpenDefault compactTable">

												<thead>
													<tr>

														<th rowspan="2" class="centerValue columnDivider">UOM</th>
														<th colspan="4" class="centerValue columnDivider">Promotion</th>
														<th colspan="2" class="centerValue columnDivider">Advertising</th>
														<th colspan="2" class="centerValue columnDivider">Forecast</th>
														<th rowspan="2" class="centerValue columnDivider">OM</th>
														<th colspan="2" class="centerValue columnDivider">Sales</th>
														<th colspan="3" class="centerValue columnDivider">Store</th>
														<th colspan="2" class="centerValue lastColumn">Source</th>

													</tr>

													<tr class="subHeader">


														<th>Week</th>
														<th class="centerValue">Days</th>
														<th class="numberColumn">Price</th>
														<th class="numberColumn">Savings</th>

														<th class="centerValue">Display</th>
														<th class="centerValue columnDivider">Media</th>

														<th class="centerValue">Base</th>
														<th class="centerValue columnDivider">Promo</th>

														<th class="centerValue">WTD</th>
														<th class="centerValue columnDivider">Est. WTD</th>


														<th class="centerValue" width="40px">Demand</th>
														<th class="centerValue" width="40x">Display</th>
														<th class="centerValue columnDivider" width="40px">Residual</th>

														<th class="centerValue lastColumn">Supplier</th>
													</tr>

												</thead>

												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">321100 - NESCAFE
														COFFEE GOLD DARK 200G</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">12.00</td>
													<td class="numberColumn">5.99</td>

													<td class="columnDivider">FGE</td>
													<td class="centerValue">TV</td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">4</td>

													<td class="columnDivider">6</td>

													<td class="centerValue">3</td>
													<td class="centerValue columnDivider">7</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="8" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="2" title="Store Display"></td>
													<td class="centerValue columnDivider">1</td>
													<td class="centerValue lastColumn">1979</td>

												</tr>





												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">321111 - NESCAFE
														COFFEE GOLD RICH 200G</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">12.00</td>
													<td class="numberColumn">5.99</td>

													<td class="columnDivider">FGE</td>
													<td class="centerValue">TV</td>

													<td class="centerValue">2</td>
													<td class="centerValue columnDivider">8</td>

													<td class="columnDivider">6</td>

													<td class="centerValue">5</td>
													<td class="centerValue columnDivider">10</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="9" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="2" title="Store Display"></td>
													<td class="centerValue columnDivider"></td>
													<td class="centerValue lastColumn">1979</td>

												</tr>



											</table>


											<div class="paginationWrapper bottomPagination hideBlock">
												<div class="pagination-holder clearfix">
													<div id="compact-pagination"
														class="compact-theme simple-pagination">
														<ul>
															<li class="active"><span class="disabled prev">Prev</span></li>
															<li class="active"><span class="current">1</span></li>
															<li><a class="page-link" href="#page-2">2</a></li>
															<li><a class="page-link" href="#page-3">3</a></li>
															<li><a class="page-link next" href="#page-2">Next</a></li>
														</ul>
													</div>
												</div>
											</div>
											<!-- End of pagination wrapper -->



										</div>
										<!-- End of content table wrapper -->

										<div class="pageActions ">

											<div class="instructionalText hideBlock">
												<label>Please verify all <strong>50</strong>
													articles before you click on Save and move to next.
												</label>
											</div>
											<!-- End of instructional text -->

											<button class="actionBtn">
												<label>Save & Next</label>
											</button>
											<button class="secondaryActionBtn hideBlock">Reset</button>
										</div>
										<!-- End of page actions-->



									</div>
									<!-- end of accordion Content Holder -->





								</div>
								<!-- end of inner Accordion -->



							</div>
							<!-- End of section 1 -->



							<div id="section-12">

								<div id="accordion-12" class="accordionWrapper innerAccordion">

									<h3>
										Laundry - Fabric Care <span class="summaryInfo"> <span
											class="completionStatus"><label class="allOk">&nbsp;</label></span>
											<label>Total: <strong>3</strong> articles
										</label>
										</span>
									</h3>
									<div class="accordionContentHolder">

										<label class="loading hideBlock">We are getting data,
											please wait</label>


										<div class="ContentTableWrapper">



											<div class="tableInfo">

												<div class="tableTitle">
													<h4>
														Total <strong>3</strong> articles
													</h4>
												</div>
												<!-- End of table title -->

												<div class="paginationWrapper hideBlock">
													<div class="pagination-holder clearfix">
														<div id="compact-pagination"
															class="compact-theme simple-pagination">
															<ul>
																<li class="active"><span class="disabled prev">Prev</span></li>
																<li class="active"><span class="current">1</span></li>
																<li><a class="page-link" href="#page-2">2</a></li>
																<li><a class="page-link" href="#page-3">3</a></li>

																<li><a class="page-link next" href="#page-2">Next</a></li>
															</ul>
														</div>
													</div>

												</div>
												<!-- End of pagination Wrapper -->

											</div>
											<!-- End of table info -->

											<table cellspacing="0" id="treetable"
												class="ContentTable treetable drilldownTable drillsOpenDefault compactTable">

												<thead>
													<tr>

														<th rowspan="2" class="centerValue columnDivider">UOM</th>
														<th colspan="4" class="centerValue columnDivider">Promotion</th>
														<th colspan="2" class="centerValue columnDivider">Advertising</th>
														<th colspan="2" class="centerValue columnDivider">Forecast</th>
														<th rowspan="2" class="centerValue columnDivider">OM</th>
														<th colspan="2" class="centerValue columnDivider">Sales</th>
														<th colspan="3" class="centerValue columnDivider">Store</th>
														<th colspan="2" class="centerValue lastColumn">Source</th>

													</tr>

													<tr class="subHeader">


														<th>Week</th>
														<th class="centerValue">Days</th>
														<th class="numberColumn">Price</th>
														<th class="numberColumn">Savings</th>

														<th class="centerValue">Display</th>
														<th class="centerValue columnDivider">Media</th>

														<th class="centerValue">Base</th>
														<th class="centerValue columnDivider">Promo</th>

														<th class="centerValue">WTD</th>
														<th class="centerValue columnDivider">Est. WTD</th>


														<th class="centerValue" width="40px">Demand</th>
														<th class="centerValue" width="40x">Display</th>
														<th class="centerValue columnDivider" width="40px">Residual</th>

														<th class="centerValue lastColumn">Supplier</th>
													</tr>

												</thead>

												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">259135 - FLUFFY
														FAB SOFT ULT CONC S/BREEZE 500ML</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">3.00</td>
													<td class="numberColumn">0.99</td>

													<td class="columnDivider">FGE</td>
													<td class="centerValue">Brochure</td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">6</td>

													<td class="columnDivider">8</td>

													<td class="centerValue">3</td>
													<td class="centerValue columnDivider">7</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="8" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="2" title="Store Display"></td>
													<td class="centerValue columnDivider">1</td>
													<td class="centerValue lastColumn">1979</td>

												</tr>




												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">759702 - FLUFFY
														FAB SOFT ULT DVINE BLND POM 450ML</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">3.00</td>
													<td class="numberColumn">0.99</td>

													<td class="columnDivider">FGE</td>
													<td class="centerValue">Brochure</td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">5</td>

													<td class="columnDivider">8</td>

													<td class="centerValue">2</td>
													<td class="centerValue columnDivider">5</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="4" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="2" title="Store Display"></td>
													<td class="centerValue columnDivider"></td>
													<td class="centerValue lastColumn">1979</td>

												</tr>



												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">364018 - FLUFFY
														FAB SOFT ULT SPICE ALLURE 500ML</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">3.00</td>
													<td class="numberColumn">0.99</td>

													<td class="columnDivider">FGE</td>
													<td class="centerValue">Brochure</td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">6</td>

													<td class="columnDivider">8</td>

													<td class="centerValue">4</td>
													<td class="centerValue columnDivider">8</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="8" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="2x" title="Store Display"></td>
													<td class="centerValue columnDivider"></td>
													<td class="centerValue lastColumn">1979</td>

												</tr>



											</table>


											<div class="paginationWrapper bottomPagination hideBlock">
												<div class="pagination-holder clearfix">
													<div id="compact-pagination"
														class="compact-theme simple-pagination">
														<ul>
															<li class="active"><span class="disabled prev">Prev</span></li>
															<li class="active"><span class="current">1</span></li>
															<li><a class="page-link" href="#page-2">2</a></li>
															<li><a class="page-link" href="#page-3">3</a></li>
															<li><a class="page-link next" href="#page-2">Next</a></li>
														</ul>
													</div>
												</div>
											</div>
											<!-- End of pagination wrapper -->



										</div>
										<!-- End of content table wrapper -->

										<div class="pageActions ">

											<div class="instructionalText hideBlock">
												<label>Please verify all <strong>50</strong>
													articles before you click on Save and move to next.
												</label>
											</div>
											<!-- End of instructional text -->

											<button class="actionBtn">
												<label>Save & Next</label>
											</button>
											<button class="secondaryActionBtn hideBlock">Reset</button>
										</div>
										<!-- End of page actions-->



									</div>
									<!-- end of accordion Content Holder -->





								</div>
								<!-- end of inner Accordion -->



							</div>
							<!-- End of section 1 -->



							<div id="section-19">

								<div id="accordion-19" class="accordionWrapper innerAccordion">

									<h3>
										Soft Drink Mineral Water <span class="summaryInfo"> <span
											class="completionStatus"><label class="allOk">&nbsp;</label></span>
											<label>Total: <strong>3</strong> articles
										</label>
										</span>
									</h3>
									<div class="accordionContentHolder">

										<label class="loading hideBlock">We are getting data,
											please wait</label>


										<div class="ContentTableWrapper">



											<div class="tableInfo">

												<div class="tableTitle">
													<h4>
														Total <strong>3</strong> articles
													</h4>
												</div>
												<!-- End of table title -->

												<div class="paginationWrapper hideBlock">
													<div class="pagination-holder clearfix">
														<div id="compact-pagination"
															class="compact-theme simple-pagination">
															<ul>
																<li class="active"><span class="disabled prev">Prev</span></li>
																<li class="active"><span class="current">1</span></li>
																<li><a class="page-link" href="#page-2">2</a></li>
																<li><a class="page-link" href="#page-3">3</a></li>

																<li><a class="page-link next" href="#page-2">Next</a></li>
															</ul>
														</div>
													</div>

												</div>
												<!-- End of pagination Wrapper -->

											</div>
											<!-- End of table info -->

											<table cellspacing="0" id="treetable"
												class="ContentTable treetable drilldownTable drillsOpenDefault compactTable">

												<thead>
													<tr>

														<th rowspan="2" class="centerValue columnDivider">UOM</th>
														<th colspan="4" class="centerValue columnDivider">Promotion</th>
														<th colspan="2" class="centerValue columnDivider">Advertising</th>
														<th colspan="2" class="centerValue columnDivider">Forecast</th>
														<th rowspan="2" class="centerValue columnDivider">OM</th>
														<th colspan="2" class="centerValue columnDivider">Sales</th>
														<th colspan="3" class="centerValue columnDivider">Store</th>
														<th colspan="2" class="centerValue lastColumn">Source</th>

													</tr>

													<tr class="subHeader">


														<th>Week</th>
														<th class="centerValue">Days</th>
														<th class="numberColumn">Price</th>
														<th class="numberColumn">Savings</th>

														<th class="centerValue">Display</th>
														<th class="centerValue columnDivider">Media</th>

														<th class="centerValue">Base</th>
														<th class="centerValue columnDivider">Promo</th>

														<th class="centerValue">WTD</th>
														<th class="centerValue columnDivider">Est. WTD</th>


														<th class="centerValue" width="40px">Demand</th>
														<th class="centerValue" width="40x">Display</th>
														<th class="centerValue columnDivider" width="40px">Residual</th>

														<th class="centerValue lastColumn">Supplier</th>
													</tr>

												</thead>

												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">94121 - DEEP
														SPRING MINERAL WTR LEM/LM/ORG 1.25L</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">1.79</td>
													<td class="numberColumn">0.80</td>

													<td class="columnDivider">OGE</td>
													<td class="centerValue">Brochure</td>

													<td class="centerValue">2</td>
													<td class="centerValue columnDivider">9</td>

													<td class="columnDivider">12</td>

													<td class="centerValue">3</td>
													<td class="centerValue columnDivider">10</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="12" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="12" title="Store Display"></td>
													<td class="centerValue columnDivider">2</td>
													<td class="centerValue lastColumn">1979</td>

												</tr>




												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">8319 - DEEP SPRING
														MINERAL WTR ORANG MANGO1.25L</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">1.79</td>
													<td class="numberColumn">0.80</td>

													<td class="columnDivider">OGE</td>
													<td class="centerValue">Brochure</td>

													<td class="centerValue">3</td>
													<td class="centerValue columnDivider">12</td>

													<td class="columnDivider">12</td>

													<td class="centerValue">4</td>
													<td class="centerValue columnDivider">15</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="16" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="3" title="Store Display"></td>
													<td class="centerValue columnDivider">1</td>
													<td class="centerValue lastColumn">1979</td>

												</tr>





												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">91635 - DEEP
														SPRING MINERAL WTR ORNG PSFRT 1.25L</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>1 of 1</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">1.79</td>
													<td class="numberColumn">0.80</td>

													<td class="columnDivider">OGE</td>
													<td class="centerValue">Brochure</td>

													<td class="centerValue">2</td>
													<td class="centerValue columnDivider">8</td>

													<td class="columnDivider">12</td>

													<td class="centerValue">3</td>
													<td class="centerValue columnDivider">9</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="10" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="2" title="Store Display"></td>
													<td class="centerValue columnDivider">1</td>
													<td class="centerValue lastColumn">1979</td>

												</tr>




											</table>


											<div class="paginationWrapper bottomPagination hideBlock">
												<div class="pagination-holder clearfix">
													<div id="compact-pagination"
														class="compact-theme simple-pagination">
														<ul>
															<li class="active"><span class="disabled prev">Prev</span></li>
															<li class="active"><span class="current">1</span></li>
															<li><a class="page-link" href="#page-2">2</a></li>
															<li><a class="page-link" href="#page-3">3</a></li>
															<li><a class="page-link next" href="#page-2">Next</a></li>
														</ul>
													</div>
												</div>
											</div>
											<!-- End of pagination wrapper -->



										</div>
										<!-- End of content table wrapper -->

										<div class="pageActions ">

											<div class="instructionalText hideBlock">
												<label>Please verify all <strong>50</strong>
													articles before you click on Save and move to next.
												</label>
											</div>
											<!-- End of instructional text -->

											<button class="actionBtn">
												<label>Save & Next</label>
											</button>
											<button class="secondaryActionBtn hideBlock">Reset</button>
										</div>
										<!-- End of page actions-->



									</div>
									<!-- end of accordion Content Holder -->





								</div>
								<!-- end of inner Accordion -->



							</div>
							<!-- End of section 1 -->


							<div id="section-20">

								<div id="accordion-20" class="accordionWrapper innerAccordion">

									<h3>
										Tissues <span class="summaryInfo"> <span
											class="completionStatus"><label class="allOk">&nbsp;</label></span>
											<label>Total: <strong>3</strong> articles
										</label>
										</span>
									</h3>
									<div class="accordionContentHolder">

										<label class="loading hideBlock">We are getting data,
											please wait</label>


										<div class="ContentTableWrapper">



											<div class="tableInfo">

												<div class="tableTitle">
													<h4>
														Total <strong>3</strong> articles
													</h4>
												</div>
												<!-- End of table title -->

												<div class="paginationWrapper hideBlock">
													<div class="pagination-holder clearfix">
														<div id="compact-pagination"
															class="compact-theme simple-pagination">
															<ul>
																<li class="active"><span class="disabled prev">Prev</span></li>
																<li class="active"><span class="current">1</span></li>
																<li><a class="page-link" href="#page-2">2</a></li>
																<li><a class="page-link" href="#page-3">3</a></li>

																<li><a class="page-link next" href="#page-2">Next</a></li>
															</ul>
														</div>
													</div>

												</div>
												<!-- End of pagination Wrapper -->

											</div>
											<!-- End of table info -->

											<table cellspacing="0" id="treetable"
												class="ContentTable treetable drilldownTable drillsOpenDefault compactTable">

												<thead>
													<tr>

														<th rowspan="2" class="centerValue columnDivider">UOM</th>
														<th colspan="4" class="centerValue columnDivider">Promotion</th>
														<th colspan="2" class="centerValue columnDivider">Advertising</th>
														<th colspan="2" class="centerValue columnDivider">Forecast</th>
														<th rowspan="2" class="centerValue columnDivider">OM</th>
														<th colspan="2" class="centerValue columnDivider">Sales</th>
														<th colspan="3" class="centerValue columnDivider">Store</th>
														<th colspan="2" class="centerValue lastColumn">Source</th>

													</tr>

													<tr class="subHeader">


														<th>Week</th>
														<th class="centerValue">Days</th>
														<th class="numberColumn">Price</th>
														<th class="numberColumn">Savings</th>

														<th class="centerValue">Display</th>
														<th class="centerValue columnDivider">Media</th>

														<th class="centerValue">Base</th>
														<th class="centerValue columnDivider">Promo</th>

														<th class="centerValue">WTD</th>
														<th class="centerValue columnDivider">Est. WTD</th>


														<th class="centerValue" width="40px">Demand</th>
														<th class="centerValue" width="40x">Display</th>
														<th class="centerValue columnDivider" width="40px">Residual</th>

														<th class="centerValue lastColumn">Supplier</th>
													</tr>

												</thead>

												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">172610 - KLEENEX
														FACIAL TISS LARGE N THICK 95PK</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>2 of 4</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">2.00</td>
													<td class="numberColumn">2.14</td>

													<td class="columnDivider">OGE</td>
													<td class="centerValue">Paper</td>

													<td class="centerValue">2</td>
													<td class="centerValue columnDivider">15</td>

													<td class="columnDivider">24</td>

													<td class="centerValue">8</td>
													<td class="centerValue columnDivider">18</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="20" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="4" title="Store Display"></td>
													<td class="centerValue columnDivider">2</td>
													<td class="centerValue lastColumn">1979</td>

												</tr>




												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">79502 - KLEENEX
														FACIAL TISS XCARE ALOEVERA 95PK</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>2 of 4</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">2.00</td>
													<td class="numberColumn">2.14</td>

													<td class="columnDivider">OGE</td>
													<td class="centerValue">Paper</td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">10</td>

													<td class="columnDivider">24</td>

													<td class="centerValue">6</td>
													<td class="centerValue columnDivider">14</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="16" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="2" title="Store Display"></td>
													<td class="centerValue columnDivider">2</td>
													<td class="centerValue lastColumn">1979</td>

												</tr>




												<tr data-tt-id="0" class="defaultExpanded">
													<td colspan="16" class="rowSection">79492 - KLEENEX
														FACIAL TISS XCARE EUCALYPTUS 95S</td>
												</tr>

												<tr data-tt-id="1" class="noChild">
													<td class="columnDivider">EA</td>

													<td>2 of 4</td>
													<td class="centerValue">7</td>
													<td class="numberColumn">2.00</td>
													<td class="numberColumn">2.14</td>

													<td class="columnDivider">OGE</td>
													<td class="centerValue">Paper</td>

													<td class="centerValue">1</td>
													<td class="centerValue columnDivider">8</td>

													<td class="columnDivider">24</td>

													<td class="centerValue">3</td>
													<td class="centerValue columnDivider">10</td>

													<td class="centerValue"><input
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="10" title="Store Demand"></td>
													<td class="centerValue"><input type="#"
														class="editNumCell textbox textboxDefaultText editMode"
														placeholder="" title="Store Display"></td>
													<td class="centerValue columnDivider"></td>
													<td class="centerValue lastColumn">1979</td>

												</tr>



											</table>


											<div class="paginationWrapper bottomPagination hideBlock">
												<div class="pagination-holder clearfix">
													<div id="compact-pagination"
														class="compact-theme simple-pagination">
														<ul>
															<li class="active"><span class="disabled prev">Prev</span></li>
															<li class="active"><span class="current">1</span></li>
															<li><a class="page-link" href="#page-2">2</a></li>
															<li><a class="page-link" href="#page-3">3</a></li>
															<li><a class="page-link next" href="#page-2">Next</a></li>
														</ul>
													</div>
												</div>
											</div>
											<!-- End of pagination wrapper -->



										</div>
										<!-- End of content table wrapper -->

										<div class="pageActions ">

											<div class="instructionalText hideBlock">
												<label>Please verify all <strong>50</strong>
													articles before you click on Save and move to next.
												</label>
											</div>
											<!-- End of instructional text -->

											<button class="actionBtn">
												<label>Save & Next</label>
											</button>
											<button class="secondaryActionBtn hideBlock">Reset</button>
										</div>
										<!-- End of page actions-->



									</div>
									<!-- end of accordion Content Holder -->





								</div>
								<!-- end of inner Accordion -->



							</div>
							<!-- End of section 1 -->



						</div>
						<!-- End of #sections and numeric tabs -->









					</div>
					<!-- End of form wrapper -->



				</form>

			</div>
			<!-- End of wizard content -->




		</div>
		<!-- End of content wrapper -->








	</div>
	<!-- End of main wraper -->


	<div class="footerWrapper">
		<div class="footer">
			<div class="copyrightsInfo">Copyright &copy Woolworths 2013</div>
			<div class="policyInfo">
				<a href="#">Privacy Policy</a> <label class="divider">|</label> <a
					href="#">Terms of Use</a>
			</div>
		</div>

	</div>
	<!-- End of footer wrapper -->












	<!-- multiple articles pop up-->
	<div id="dialog-mulipleArticles" title="Select Articles">
		<div class="popupContent">


			<div class="popupData">

				<div class="popupData">

					<h4 class="warning">
						Total <strong>3</strong> articles found
					</h4>

				</div>
				<!-- End of pop up data -->


				<div class="ContentTableWrapper">
					<table class="ContentTable" cellspacing="0">
						<tr>
							<th>Article #</th>
							<th>Description</th>
							<th class="centerValue">UOM</th>
							<th class="centerValue">OM</th>
							<th width="40px" class="centerValue lastColumn">Select</th>
						</tr>
						<tr>
							<td>043083</td>
							<td>Moro Oil Olive Extra Light 4L</td>
							<td class="centerValue">MPK</td>
							<td class="centerValue">x</td>
							<td class="sorted centerValue lastColumn"><input
								type="checkbox"></td>
						</tr>
						<tr>
							<td>043083</td>
							<td>Moro Oil Olive Extra Light 4L</td>
							<td class="centerValue">CAR</td>
							<td class="centerValue">x</td>
							<td class="sorted centerValue lastColumn"><input
								type="checkbox"></td>
						</tr>
						<tr class="lastRow">
							<td>043083</td>
							<td>Moro Oil Olive Extra Light 4L</td>
							<td class="centerValue">EA</td>
							<td class="centerValue">x</td>
							<td class="sorted centerValue lastColumn"><input
								type="checkbox"></td>
						</tr>

					</table>
				</div>
				<!-- End of content table wrapper -->

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn">Select</label>
						<label class="secondaryActionBtn">Cancel</label>
					</span>
				</div>
				<!-- End of popup actions-->

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>



	<!-- Promotion Sales history Popup -->
	<div id="dialog-salesHistory" title="Promotion Sales History">
		<div class="popupContent">

			<div class="popupSearchWrapper" id="popupSearch">
				<h3>No. of Month:</h3>
				<select class="selectOptions">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>


				<h3>Promotion Type:</h3>
				<select class="selectOptions">
					<option>All</option>
					<option>Instore</option>
					<option>Central</option>
				</select> <label class="actionBtn popupSearchBtn">Apply</label>

			</div>
			<!-- End of popup search wrapper -->


			<div class="popupData">

				<div class="tableInfo">

					<div class="tableTitle">
						<h4>
							Total <strong>1</strong> results found
						</h4>
					</div>
					<!-- End of table title -->

				</div>
				<!-- End of table info -->
			</div>
			<!-- End of pop up data -->


			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
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

					<tr class="lastRow" id="row-1">
						<td class="centerValue">12/01/2012</td>
						<td class="centerValue">18/01/2012</td>
						<td class="numberColumn">1.96</td>
						<td class="numberColumn">0</td>
						<td class="centerValue">Multi</td>
						<td>Brochure</td>
						<td class="centerValue">104</td>
						<td>Multi-buy 2 for $1.96</td>
						<td id="feedback-1">Incorrect stock on hand</td>
						<td id="feedbackEdit-1" class="hideBlock"><textarea>Incorrect stock on hand</textarea>
						</td>
						<td><label class="linkBtn editRowBtn" id="editRecord-1">
								<label class="editRecord">Edit</label>
						</label> <label class="linkBtn saveRowBtn hideBlock" id="saveRecord-1">
								<label class="saveRecord">Save</label>
						</label></td>


					</tr>

				</table>
			</div>
			<!-- End of content table wrapper -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Close</label>
				</span>
			</div>
			<!-- End of popup actions-->



		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of Promotion Sales history popup -->





	<!-- Multi Buy Popup -->
	<div id="dialog-MultiBuy" title="Multi-buy / Offers / Deals">
		<div class="popupContent">

			<div class="popupData">

				<h4 class="alertText">
					<strong>Additional Promotion Information</strong>
				</h4>


				<div class="ContentTableWrapper formWrapper">


					<div class="parameter">
						<label class="">Week Start Date:</label> <label class="valueInfo">30/10/2013</label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label>Promo Start Date:</label> <label class="valueInfo">30/10/2013</label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label>Promo End Date:</label> <label class="valueInfo">12/10/2013</label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label>Store Info:</label> <label class="valueInfo">Multi-buy
							- 2 for 5.99</label>
					</div>
					<!-- End of parameter -->

				</div>
				<!-- End of content table wrapper -->

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn">Close</label>
					</span>
				</div>
				<!-- End of popup actions-->

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End Multi Buy popup -->




	<!-- Allocations pop up-->
	<div id="dialog-modal" title="Allocations">
		<div class="popupContent">
			<div class="popupData">

				<h4 class="alertText">
					Total <strong>1</strong> order(s) found
				</h4>

			</div>
			<!-- End of pop up data -->

			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
						<th>Order #</th>
						<th>Allocated Qty.</th>
						<th>Schedule</th>
						<th>Source</th>
						<th class="centerValue">Delivery Status</th>
						<th class="centerValue">Delivery Date</th>
						<th class="lastColumn centerValue">On Show Date</th>
					</tr>

					<tr class="lastRow">
						<td>80726573</td>
						<td>8</td>
						<td>51NSW1896</td>
						<td>Sydney RDC - Produce (1986)</td>
						<td class="centerValue">Ordered</td>
						<td class="centerValue">5/11/2013</td>
						<td class="centerValue lastColumn">6/11/2013</td>
					</tr>

				</table>
			</div>
			<!-- End of content table wrapper -->




			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Close</label>
				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of allocations popup -->




	<!-- multiple articles pop up-->
	<div id="dialog-deactivate" title="De-activate Promotion">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning">Are you sure you want to end the promotion?
				</h4>

			</div>
			<!-- End of pop up data -->


			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"
					id="yesDeactivate">Yes</label> <label class="secondaryActionBtn">No</label>
				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>

















	<script>
		$(function() {
			
			
			
				
			$( "#dialog-deactivate" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 800,
				width: 450
			});
			
				// (Temp - Dev team need to change it) Code to show De-activate Promotion popup
			
			$("#deactivate, #deactiveInner").click(function() {		
				$("#dialog-deactivate").parent().addClass("popupWrapper");
				$("#dialog-deactivate" ).dialog("open");
			});
			
			$(".popupActions .actionBtn, .popupActions .secondaryActionBtn").click(function() {					
				$("#dialog-deactivate").dialog("close");				
			});
			
			
			$("#yesDeactivate").click(function() {		
				$("#dialog-deactivate").dialog("close");
				$(".deactivate").prop('disabled', true);
				$(".createBtn").addClass('nomenu');
				$("#dropdown").attr('id','dropdownDisabled' );
				
			});
			
			
			
			
			
			//Checkbox DropDown functions
			
			
			$("#dropdownSelect").click(function(){ 
				if( $('#dropdown').hasClass('active')){
					$("#dropdown").removeClass('active');
				} else {
					$("#dropdown").addClass('active');
				}
			});
			
			
			 $('html').click(function() {
				$("#dropdown").removeClass('active');
			});

			$('#dropdownSelect').click(function(event){
			   event.stopPropagation();
			});
			
			
			
			
			// code for wizard
			$("#wizard").jWizard();
			
			
			// code to replace text for finish button
			$('.jw-button-next').html('Load Articles');
			$('.jw-button-finish').html('Next');
			$('.jw-button-finish').addClass('hideBlock');
			
			
			// (Temp - Dev team need to change it) Code to show multiple articles popup
			
			$(".jw-button-next").click(function() {		
				$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
				//$("#dialog-mulipleArticles" ).dialog("open");
			});
			
			
			
			// Code to show and hide article heirarchy
			
			$('#depH').click(function() {		
				if($(this).is(':checked'))
					$("#articleHierarchy").removeClass('hideBlock');
				else
					$("#articleHierarchy").addClass('hideBlock');
			});
			
			
			
			
			/* Code for hierarchy  */
					
			$("input[name='departmentList']").click(function() {				
				$("#catDiv").find(".noSelection").addClass('hideBlock');
				$("#catDiv").find("ul").removeClass('hideBlock');
				$("#catDiv").find(".totalCount").removeClass('hideBlock');

				$("#subCatDiv").find(".noSelection").removeClass('hideBlock');
				$("#subCatDiv").find("ul").addClass('hideBlock');
				$("#subCatDiv").find(".totalCount").addClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');				

				$("#segDiv").find(".noSelection").removeClass('hideBlock');
				$("#segDiv").find("ul").addClass('hideBlock');
				$("#segDiv").find(".totalCount").addClass('hideBlock');		
				
			});
			
			
			$("input[name='categoryList']").click(function() {	
				$("#subCatDiv").find(".noSelection").addClass('hideBlock');
				$("#subCatDiv").find("ul").removeClass('hideBlock');
				$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
				//$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeOut(300);

				$("#segDiv").find(".noSelection").removeClass('hideBlock');
				$("#segDiv").find("ul").addClass('hideBlock');
				$("#segDiv").find(".totalCount").addClass('hideBlock');					
			});
			
			$("input[name='subCatList']").click(function() {	
				//$("#subCatDiv").find(".heirachyAction").removeClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeIn(400);
								
				$("#segDiv").find(".noSelection").addClass('hideBlock');
				$("#segDiv").find("ul").removeClass('hideBlock');
				$("#segDiv").find(".totalCount").removeClass('hideBlock');					
			});
			
			$("input[name='segmentList']").click(function() {	
				
			});
			
			
			
			//checks radio buttons in Souce of Supply
			$('#warehouse').click(function(){
				$("#warehouseField").removeClass('hideBlock');
				$("#vendorField").addClass('hideBlock');
				$("#allField").addClass('hideBlock');
			});
			
			$('#vendor').click(function(){
				$("#vendorField").removeClass('hideBlock');
				$("#warehouseField").addClass('hideBlock');
				$("#allField").addClass('hideBlock');
			});
			
			$('#all').click(function(){
				$("#allField").removeClass('hideBlock');
				$("#warehouseField").addClass('hideBlock');
				$("#vendorField").addClass('hideBlock');
			});
			
			
			
			// Code for inner tabs to dispay sections
			$("#sections").tabs( { disabled: [1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,20,21,22,23,24,25,26],  active: [0] });
			//$("#sections").tabs( );
			
			
			// Code for accordion in the tab section
			$(".accordionWrapper").accordion({
				header:"h3",
				collapsible: true, 				
				heightStyle: "content" 
			});
			
			
			// Code for display qty. for daily basis
			$(".editNumCell").focus(function(){ 
				
				if($(this).next().hasClass('active')){
					$(this).next().removeClass('active');
				} else {					
					$('.stickyForm').removeClass('active');
					$(this).next().addClass('active');
					event.stopPropagation();
				}
				
			});
			
			$('html').click(function(e) {
				if(e.target.className.indexOf('editMode') == -1){					
					$(".stickyForm").removeClass('active');
					event.stopPropagation();			
				}
			});			

			$('.stickyForm').click(function(event){			  
			   event.stopPropagation();
			});
			
			
			
			
			// code for setting default parameters for popups
			$( "#dialog-mulipleArticles" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 800,
				width: 850
			});
			
			
			$( "#dialog-salesHistory" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 800,
				width: 900
			});
			
			$( "#dialog-MultiBuy" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 600,
				width: 400
			});
			
			$( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 800,
				width: 800
			});
			
			
			// Code for opening popups
						
			$("#dialog-salesHistory").parent().addClass("popupWrapper");
			$("#dialog-MultiBuy").parent().addClass("popupWrapper");
			$("#dialog-modal").parent().addClass("popupWrapper");
			
			
			$(".history").click(function() {									
				$("#dialog-salesHistory" ).dialog("open");
			});
									
			$(".offers").click(function() {									
				$("#dialog-MultiBuy" ).dialog("open");
			});
			
			$(".notpadLink").click(function() {									
				$("#dialog-modal" ).dialog("open");
			});	
			
			$(".popupActions .actionBtn").click(function() {									
				$("#dialog-mulipleArticles" ).dialog("close");
				$("#dialog-salesHistory" ).dialog("close");
				$("#dialog-MultiBuy" ).dialog("close");
				$("#dialog-modal" ).dialog("close");				
			});
			
			
			// Code for tooltip
					
			$("input.editNumCell").tooltip({ 
				position: { 
					my: "top center-30", 
					at: "top center" 					
				} 
			});
			
			$("a").tooltip({ 
				position: { 
					my: "left top", 
					at: "left top-40" 
				} 
			});
			
			$("input.editNumCell").tooltip().off("mouseover mouseout");
			
				
			
			// Code for tree table
			//$(".treetable").treetable({
			//	expandable: true
			//});	
			
			
			// Code for table row clicking to activate '+' icon code
			$(".defaultExpanded").click(function(e){			
				   //alert(e.target.className);		
					// $(this).find( '.indenter a' ).trigger( "click" ); (making jquery work slow
					//$(".defaultExpanded .indenter a" ).trigger( "click" );
				  
			});
			
		
			



			// Code for Store feedback edit in Promotiona Sales History popup
			
			$(".editRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				
				$(("#row-").concat(id)).addClass('rowHighlight');
				
				$(("#feedbackEdit-").concat(id)).removeClass('hideBlock');
				$(("#feedback-").concat(id)).addClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).removeClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
			});
			
			/*when save button is clicked displays input box is disabled*/
			$(".saveRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				
				$(("#row-").concat(id)).removeClass('rowHighlight');
				
				$(("#feedbackEdit-").concat(id)).addClass('hideBlock');
				$(("#feedback-").concat(id)).removeClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).removeClass('hideBlock');
			});
			
						
			
			
			// Code for text focus highlight
			$('.textbox').focus(function(){
				if ( $(this).val() == $(this).attr('placeHolder') ){
				  $(this).val('');
				  $(this).removeClass("textboxDefaultText"); 				 
				}
			});
			
			$('.textbox').blur(function(){
				if ( $(this).val() == '' ){
				  $(this).val($(this).attr('placeHolder'));
				  $(this).addClass("textboxDefaultText"); 
				}
			});
			
			
			// Date picker code
			Date.format = 'dd/mm/yy';
			$(".inputDateInput").datepicker({
				zIndex:50
			});
			
			$(".inputDate").datepicker({
				zIndex:50
			});
			
			
		
			// Code for global menu
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
			
			// Code for pagination
			$(selector).pagination({
				items: 100,
				itemsOnPage: 10,
				cssStyle: 'compact-theme'
			});		
			
			
		});
	</script>

</body>
</html>