<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Plan-O-Gram</title>



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
<script type="text/javascript" src="../../scripts/planOGram.js?version=${properties.version}"></script>



</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='#'>Home</a></li>
						<li><a href='#'>Admin</a></li>
						<li class="currentPage">User Role Management</li>
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
		<div class="contentWrapper directContent settings">



			<!-- For displaying report results -->
			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle">
						<h4>
							<strong>User Role Management</strong>
						</h4>
					</div>
					<!-- End of table title -->


				</div>
				<!-- End of table info -->



				<div class="articleHead">
					<div class="articleHeaderWrapper">
						<h2 class="articleTitle">
							Role <select class="selectOptions">
								<option>Select</option>
								<option>Team Member</option>
							</select>


						</h2>
						<p>
							<label class="articlePriceLabel">Select a role to
								activate various features for it. </label>
						</p>
					</div>
					<div class="articleActionBtns hideBlock">

						<label class="actionBtn" id="createOrderButton"><label
							class="thumbUp">Save</label></label> <label class="secondaryActionBtn">Cancel</label>


					</div>
				</div>
				<!-- End of Article head -->



				<div id="tabs">


					<ul>

						<li><a href="#tabs-1">BigW</a></li>
						<li><a href="#tabs-2">BWS</a></li>
						<li><a href="#tabs-3">Countdown</a></li>
						<li><a href="#tabs-4">Dan Murphy's</a></li>
						<li><a href="#tabs-5">Petrol</a></li>
						<li><a href="#tabs-6">Thomas Dux </a></li>
						<li><a href="#tabs-7">Woolworths</a></li>
					</ul>



					<div id="tabs-1">



						<div class="ContentTableWrapper">


							<div class="hierarchyWrapper settingsWrapper">

								<div class="tableInfo">

									<div class="tableTitle">
										<h4>
											<strong>Select features to be available for users
												with 'Team Member' role</strong>
										</h4>
									</div>
									<!-- End of table title -->

								</div>




								<!-- Lookup  -->
								<div class="hierarchyContent noProcess">

									<div class="hierarchyTitle">
										<h3>Lookup</h3>
									</div>
									<!-- End of hierarchy Title -->

									<div class="hierarchyList">

										<ul>
											<li><input type="checkbox" name="lookupList"
												value="lookupList1" id="lookupList1"><label
												for="lookupList1" class="labelText">Lookup Articles</label></li>


										</ul>
									</div>
									<!-- End of hierarchy list -->

									<div class="heirachyBottom">
										<span class="totalCount"> <label>Total:<strong>1</strong>
												selected
										</label>
										</span>
									</div>
									<!-- End of heirachy bottom -->


								</div>
								<!-- End of hierarchy Content -->



								<!-- Orders  -->
								<div class="hierarchyContent noProcess">

									<div class="hierarchyTitle">
										<h3>Orders</h3>
									</div>
									<!-- End of hierarchy Title -->

									<div class="hierarchyList">

										<ul>
											<li><input type="checkbox" name="orderList"
												value="orderList1" id="orderList1"><label
												for="catValue1" class="labelText">Enquiry</label></li>
											<li><input type="checkbox" name="orderList"
												value="orderList2" id="orderList2"><label
												for="orderList2" class="labelText">Produce Load List</label></li>
											<li><input type="checkbox" name="orderList"
												value="orderList3" id="orderList3"><label
												for="orderList3" class="labelText">Create Warehouse
													Order</label></li>
											<li><input type="checkbox" name="orderList"
												value="orderList4" id="orderList4"><label
												for="orderList4" class="labelText">Create Order On
													Receipt</label></li>
											<li><input type="checkbox" name="orderList"
												value="orderList5" id="orderList5"><label
												for="orderList5" class="labelText">Create Vendor
													Order</label></li>
											<li><input type="checkbox" name="orderList"
												value="orderList6" id="orderList6"><label
												for="orderList6" class="labelText">Inter Branch
													Transfer</label></li>


										</ul>
									</div>
									<!-- End of hierarchy list -->

									<div class="heirachyBottom">
										<span class="totalCount"> <label>Total:<strong>6</strong>
												selected
										</label>
										</span>
									</div>
									<!-- End of heirachy bottom -->


								</div>
								<!-- End of hierarchy Content -->



								<!-- Reports  -->
								<div class="hierarchyContent noProcess">

									<div class="hierarchyTitle">
										<h3>Reports</h3>
									</div>
									<!-- End of hierarchy Title -->

									<div class="hierarchyList">

										<ul>
											<li class="alreadyAddedRow"><input type="checkbox"
												name="categoryList" value="catValue1" id="catValue1"><label
												for="catValue1" class="labelText">Stock Adjustment
													Log</label></li>
											<li><input type="checkbox" name="categoryList"
												value="catValue2" id="catValue2"><label
												for="catValue2" class="labelText">Daily Goods
													Movement Summary</label></li>
											<li><input type="checkbox" name="categoryList"
												value="catValue3" id="catValue3"><label
												for="catValue3" class="labelText">Electronic Daily
													Goods Movement Summary </label></li>
											<li><input type="checkbox" name="categoryList"
												value="catValue4" id="catValue4"><label
												for="catValue4" class="labelText">Invoice
													Reconciliation Report </label></li>
											<li><input type="checkbox" name="categoryList"
												value="catValue5" id="catValue5"><label
												for="catValue5" class="labelText">eDGMS
													Discrepancies Report</label></li>


										</ul>
									</div>
									<!-- End of hierarchy list -->

									<div class="heirachyBottom">
										<span class="totalCount"> <label>Total:<strong>5</strong>
												selected
										</label>
										</span>
									</div>
									<!-- End of heirachy bottom -->


								</div>
								<!-- End of hierarchy Content -->


								<!-- Stock Management  -->
								<div class="hierarchyContent lastContent">

									<div class="hierarchyTitle">
										<h3>Stock Management</h3>
									</div>
									<!-- End of hierarchy Title -->

									<div class="hierarchyList">

										<ul>
											<li><input type="checkbox" name="lookupList"
												value="lookupList1" id="lookupList1"><label
												for="lookupList1" class="labelText">Lookup Articles</label></li>


										</ul>
									</div>
									<!-- End of hierarchy list -->

									<div class="heirachyBottom">
										<span class="totalCount"> <label>Total:<strong>1</strong>
												selected
										</label>
										</span>
									</div>
									<!-- End of heirachy bottom -->


								</div>
								<!-- End of hierarchy Content -->


								<!-- Pricing  -->
								<div class="hierarchyContent  noProcess">

									<div class="hierarchyTitle">
										<h3>Pricing</h3>
									</div>
									<!-- End of hierarchy Title -->

									<div class="hierarchyList">

										<ul>
											<li><input type="checkbox" name="lookupList"
												value="lookupList1" id="lookupList1"><label
												for="lookupList1" class="labelText">Lookup Articles</label></li>


										</ul>
									</div>
									<!-- End of hierarchy list -->

									<div class="heirachyBottom">
										<span class="totalCount"> <label>Total:<strong>1</strong>
												selected
										</label>
										</span>
									</div>
									<!-- End of heirachy bottom -->


								</div>
								<!-- End of hierarchy Content -->



								<!-- Ticketing  -->
								<div class="hierarchyContent noProcess">

									<div class="hierarchyTitle">
										<h3>Ticketing</h3>
									</div>
									<!-- End of hierarchy Title -->

									<div class="hierarchyList">

										<ul>
											<li><input type="checkbox" name="lookupList"
												value="lookupList1" id="lookupList1"><label
												for="lookupList1" class="labelText">Lookup Articles</label></li>


										</ul>
									</div>
									<!-- End of hierarchy list -->

									<div class="heirachyBottom">
										<span class="totalCount"> <label>Total:<strong>1</strong>
												selected
										</label>
										</span>
									</div>
									<!-- End of heirachy bottom -->


								</div>
								<!-- End of hierarchy Content -->



							</div>
							<!-- end of hierarchy Wrapper -->


						</div>
						<!-- End of content table wrapper -->


						<div class="pageActions ">
							<label class="actionBtn" id="createOrderButton"><label
								class="thumbUp">Save</label></label> <label class="secondaryActionBtn">Cancel</label>
						</div>
						<!-- End of page actions-->


					</div>
					<!-- End of tab - 1 -->





					<div id="tabs-2"></div>



					<div id="tabs-3"></div>



					<div id="tabs-4"></div>

					<div id="tabs-5"></div>



					<div id="tabs-6"></div>



					<div id="tabs-7"></div>










				</div>
				<!-- End of tabs -->




			</div>
			<!-- End of Content Table Wrapper-->






		</div>
		<!-- End of content wrapper -->


	</div>
	<!-- End of main wrapper -->

	<div class="footerWrapper">
		<div class="footer">
			<div class="copyrightsInfo">Copyright &copy Woolworths 2013</div>
			<div class="policyInfo">
				<a href="#">Privacy Policy</a> <label class="divider">|</label> <a
					href="#">Terms of Use</a>
			</div>
		</div>

	</div>