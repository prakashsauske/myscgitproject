
<!DOCTYPE html>
<html>
<head>
<title>Create New Request</title>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Service Requests</title>



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
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.jWizard.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/printRepairs.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/repair-CreateServiceOrder.js?version=${properties.version}"></script>
<link href="../../styles/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script>
	var globalUserImgLoc = "${user.imgLocation}";
</script>

</head>
<body>

	<input type="hidden" id="fromPage" value="${model.fromPage}">

	<div class="mainWrapper">

		<div class="headWrapper">

			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage"><a>Create New Request</a></li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock">We are getting data,
						please wait</label> <label class="secondaryActionBtn" id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->

		<div class="contentWrapper">

			<div class="ContentTableWrapper">
				<div class="tableInfo repairTitle">
					<div class="tableTitle">
						<h4 class="sectionTitle">New Service Order</h4>
					</div>
					<!-- End of table title -->
					<div class="errorDiv hideBlock rightAlign" id="errorMsgDiv">
						<label id='errorMsg'>No article found for '<strong
							id="notfoundArticle">3234</strong>'. Please try a different
							number.
						</label> <label class="closeMessage"
							onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
					</div>
				</div>
				<!-- End of table info -->
			</div>
			<!-- End of Content Table wrapper -->



			<div class="innerSection">
				<h4 class="sectionTitle">
					<strong>Request Type: </strong> <input checked type="radio"
						name="type" value="Repair" id="MM"><label for="MM"
						class="labelText">Repair</label> <label class="raDiv"><input
						type="radio" name="type" value="Spare" id="MF"></label><label
						for="MF" class="labelText raDiv">Spare</label>
				</h4>
				<div class="innerSectionActions">
					<label class="actionBtn submitRequest" id=""><label
						class="thumbUp">Submit Request</label></label> <label
						class="secondaryActionBtn "><a
						href="../login/goingHome.htm">Cancel</a></label>
				</div>

			</div>
			<!-- End of inner section -->

<form id="createForm"></form>

			<form:form id="createOrder" modelAttribute="RepairCreateParam">
				<div class="formWrapper twoColumn sixtyFourty">
					<input type="hidden" id="articleDesc" name="articleDesc"> <input
						type="hidden" id="articleNo" name="articleNo"> <input
						type="hidden" id="vendorNo" name="mainVendor"> <input
						type="hidden" id="repairAgent" name="repairAgent">
					<div class="formWrapperLeft">
						<div class="twoColumnContent">

							<div class="parameter">
								<label class="mandatory" for="searchBox">Article</label> <input
									name="createSearch"
									class="textbox textboxDefaultText searchbox"
									placeholder="Type number, description, or EAN / TUN / PLU and press Enter"
									id="searchBox">
							</div>

							<div class="parameter">
								<label class="" for="stockType">Stock Type</label> <span
									class="radioOptions"> <input type="radio" id="cust"
									value="CUSTOMER" class="spareDiv" name="stockType"><label
									class="labelText spareDiv" for="cust">Customer</label> <label
									class="raDiv"><input type="radio" id="store"
										value="STORE" name="stockType"></label><label
									class="labelText raDiv" for="store">Store</label>
								</span>
							</div>


							<div class="spareDiv">
								<hr class="sectionDivider clearfix">
								<div class="parameter parameterTitle">
									<label class=""><strong>Customer Details</strong></label>
								</div>
								<div class="parameter">
									<label class="mandatory" for="custName">Name</label> <input
										name="customerName"
										class="textbox textboxDefaultText mediumbox"
										placeholder="Type first and last name" maxlength="30"
										id="custName">
								</div>
								<div class="parameter">
									<label class="mandatory" for="address">Address</label> <input
										name="address" class="textbox textboxDefaultText largebox"
										placeholder="Type full address" id="address"> <input
										name="postCode" class="textbox textboxDefaultText"
										maxlength="12" placeholder="Type postcode" id="code">

								</div>
								<div class="parameter">
									<label class="mandatory" for="contactNum">Contact Number</label> <input
										name="contactNumber" class="textbox textboxDefaultText"
										placeholder="" maxlength="16" id="contactNum">
								</div>

								<div class="parameter">
									<label class="" for="email">Email</label> <input name="emailId"
										maxlength="132" class="textbox textboxDefaultText mediumbox"
										placeholder="" id="email">
								</div>
							</div>
							<hr class="sectionDivider clearfix">

							<div class="parameter parameterTitle">
								<label class=""><strong>Purchase & Repair
										Details</strong></label>
							</div>
							<div class="spareDiv">
								<div class="parameter">
									<label class="mandatory" for="pdate">Date of Purchase</label> <input
										name="dateOfPurchase" id="pdate"
										class="textbox defaultTextbox inputDate " maxlength="10"
										placeholder="dd/mm/yyyy">
								</div>
								<div class="parameter">
									<label class="" for="proof">Proof of Purchase</label> <input
										name="proofOfPurchase"
										class="textbox textboxDefaultText mediumbox" placeholder=""
										maxlength="132" id="proof">
								</div>
							</div>
							<div class="parameter">
								<label class="mandatory" for="fault">Fault Description</label>
								<textarea maxlength="130" name="faultDesc"
									class="textbox textboxDefaultText largebox" placeholder=""
									id="fault"></textarea>
							</div>

                             <div class="parameter">
									<label class="" for="date">Create Date</label> <input
										name="createDate"
										class="textbox textboxDefaultText" placeholder=""
										maxlength="16" id="date" readonly>
								</div>
							<hr class="sectionDivider clearfix">

							<div class="parameter parameterTitle">
								<label class=""><strong>Charges Details</strong>
									(aprrox.)</label>
							</div>
							<div class="parameter">
								<label class="" for="service">Article Under </label> <span
									class="radioOptions"> <input type="radio" checked=""
									id="warr" value="Warranty" name="service"><label
									class="labelText" for="warr">Warranty</label> <input
									type="radio" id="quot" value="Quote" name="service"><label
									class="labelText" for="quot">Quote</label> <input type="radio"
									id="char" value="Charged" name="service"><label
									class="labelText" for="char">Charged</label>
								</span>
							</div>
							<!-- <div class="parameter raDiv">
								<label class="" for="costBorneBy"> Freight Cost </label> <span
									class="radioOptions"> Borne by <input type="radio"
									checked="" id="st" value="1" name="costBorneBy"><label
									class="labelText" for="st">Store</label> <input type="radio"
									id="ve" value="2" name="costBorneBy"><label
									class="labelText" for="ve">Vendor</label>
								</span>
							</div>  -->
							<div class="parameter">
								<label class="" for="ta">Amount Payable ($)</label> <input
									name="totalAmount"
									class="textbox textboxDefaultText numberBox two-digits" value="0.00" placeholder=""
									maxlength="132" id="ta">
							</div>

							<div class="parameter raDiv ">
								<label class="mandatory" for="comments" id="repairs-comments">Comments</label>
								<textarea name="comments"
									class="textbox textboxDefaultText largebox" placeholder=""
									id="comments"></textarea>
							</div>
							<hr class="sectionDivider clearfix">
							<div class="parameter parameterTitle custDiv raDiv">
								<label class=""><strong>Vendor or Repair Agent
										Details</strong></label>
							</div>
							<div class="parameter custDiv raDiv">
								<label class="" for="authCode">Authorisation Code</label> <input
									name="authorisationCode"
									class="textbox textboxDefaultText mediumbox"
									placeholder="Vendor or repair agent" id="authCode">
							</div>
							<div class="parameter custDiv raDiv">
								<label class="" for="aname">Authoriser Name</label> <input
									name="authorizerName"
									class="textbox textboxDefaultText mediumbox"
									placeholder="Type first and last name" id="aname">
							</div>

							<hr class="sectionDivider clearfix custDiv raDiv">
	<!-- 						
							<div class="parameter parameterTitle raDiv">
								<label class=""><strong>Dispatch Details</strong></label>
							</div>
							<div class="parameter raDiv">
								<label class="" for="pickDate">Goods Pickup Date</label> <input
									name="pickUpDate" id="pickDate" maxlength="10"
									class="textbox defaultTextbox inputDate "
									placeholder="dd/mm/yyyy">
							</div>


							<div class="parameter raDiv">
								<label class="" for="fud"> Due Date</label> <input
									name="dueDate" id="fud" maxlength="10"
									class="textbox defaultTextbox inputDate "
									placeholder="dd/mm/yyyy">
							</div>-->
							 
						</div>
						<!-- End of left content-->
					</div>
					<!-- End of form wrapper left -->

					<div class="formWrapperRight">
						<div class="twoColumnContent subtleHighlight" id="serviAgreement">



						</div>
						<!-- End of right content -->
					</div>
					<!-- End of form wrapper left -->



				</div>
				<!-- End of form wrapper -->


			</form:form>
			<div class="pageActions ">
				<label class="actionBtn submitRequest" id=""><a href="#"><label
						class="thumbUp">Submit Request</label></a></label> <label
					class="secondaryActionBtn"><a onclick="resetForm();">Reset</a></label>
				<label class="secondaryActionBtn"><a
					href="../login/goingHome.htm">Cancel</a></label>
			</div>
			<!-- End of page actions-->



		</div>
		<!-- End of content wrapper -->




	</div>
	<!-- end of main content wrapper -->

	<!-- Request created confirmation -->
	<div id="dialog-created" title="Service Request Created">
		<div class="popupContent">

			<div class="popupData">
				<h4 class="alertText serviceOrderNo">
					<strong></strong>
				</h4>

				<h4 class="alertText">Please take a print out of Goods
					Acceptance Note and hand it over to the customer or communicate
					service request number to the customer for future reference.</h4>

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"><a
							onclick="repairAcceptanceNotePrint();"><label class="print">Acceptance
									Note</label></a> </label> <label  class="secondaryActionBtn printOk"><a>Ok</a></label>
					</span>
				</div>
				<!-- End of popup actions-->
			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of popup -->
<div id="dialog-cartonCount" class="dialog-cartonCounts"
		title="Enter Carton Count">
		<div class="popupContent">


			<div class="popupData">
				<form action="" id="claimsCartonCountPopUpForm">
					<div class="formWrapper">

						<div class="parameter">

							<table width="100%" class="plainTable">

								<tbody>
									<tr>
										<td><label for="com1">Carton Pick Up Qty: </label></td>
										<td><input type="#" class="textbox smallbox cartonCounts"
											value="" id="cartonCount" placeholder="Enter Carton Qty" maxlength="5"></td>
									</tr>
								</tbody>
							</table>

						</div>
						<!-- End of parameter -->

					</div>
					<!-- End of form wrapper  -->
				</form>
			</div>
			<!-- End of pop up data -->
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn okButton"><a>Ok</a></label>
					<label class="secondaryActionBtn"><a>Cancel</a></label>
				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>

	<div id="dialog-mulipleArticles"
		class="ui-dialog-content ui-widget-content">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning">
					Total <strong id="searchArticleCount">3</strong> articles found for
					'<strong id="searchText">T-shirt</strong>'
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
				<span class="popupActions"> <label class="secondaryActionBtn">Cancel</label>
					<label class="actionBtn" id="addtolist">Add to List</label>
				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>

	<div id="dialog-mulipleVendors"
		class="ui-dialog-content ui-widget-content">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning">
					Total <strong id="searchVendorCount"></strong> vendors found for '<strong
						id="searchArticleText"></strong>'
				</h4>

			</div>
			<!-- End of pop up data -->


			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tbody id="vendorSearchTbody">
						<tr>
							<th>Vendor No</th>
							<th width="40px" class="centerValue lastColumn">Select</th>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- End of content table wrapper -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="secondaryActionBtn">Cancel</label>
					<label class="actionBtn" id="selectVendor">Select</label>
				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>

	<div class="pageErrorsWrapper hideBlock" id="errorWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Errors</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">The Repair Service Order creation failed.</p>
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

	<%@include file="footer.jsp"%>
	<div id="printDataForAcpNot" class="hideBlock">
		<div id="printbodyForAcpNot" class="printbody"></div>
		<div class="hideBlock">
			<label class="siteNoName">${user.siteNo} | ${user.siteName}</label>
		</div>
	</div>
	<div id="printDataForAcpNote" class="hideBlock">
		<div id="printbodyForAcpNote" class="printbody"></div>
		<div class="hideBlock">
			<label class="siteNoName">${user.siteNo} | ${user.siteName}</label>
		</div>
	</div>
	
</body>
</html>