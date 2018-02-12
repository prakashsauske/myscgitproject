<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/reportPrintStyle.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>

<script type="text/javascript" src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/articleDtls.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_validation.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/uldSweep.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/common.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/basicSort.js?version=${properties.version}"></script>
<script>
	var globalUserImgLoc = "${user.imgLocation}";
</script>

<title>Process ULDs</title>

</head>
<body>
	<div class="mainWrapper woolworths">
		<div class="headWrapper">
			
<input id="navBarHighlight" type="hidden" value="reports"/>

	<%@include file="header.jsp" %>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a onclick="leavePrcsULDBreadCrumbNavigation();" >Home</a></li>
						<li>Orders</li>
						<li class="currentPage">Process ULDs</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper" >
					<label class="loading hideBlock" id="statusImg">We are getting data,
						please wait</label> <label class="secondaryActionBtn" id="backBtn">Back</label>
				</div>

				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->
	<div class="contentWrapper reportWrapper">		
			<div class="ContentTableWrapper">
			
				<div class="tableInfo uldSweepHeader">
				
					<div class="tableTitle">
						<h4 class="sectionTitle">Process ULDs</h4>
					</div> <!-- End of table title -->
					
					<div class="instructionalText">
						<label>Process ULDs function should be used when order information is not available.</label>
					</div> <!-- End of instructional Text -->
					
				</div> <!-- End of table info -->
			
				<form method="POST" action="" id="uldSweepForm">
				<div class="subSectionWrapper formWrapper">				
					<div class="subSectionContent">
						
							<div class="parameter parameterRow">
								<label for="sen" class="">Sender</label>
								<input type="#" class="textbox largebox greyedText" id="sen" maxlength="50"><label id="verifySender" class="linkBtn uldSweepLink hideBlock"><label class="advancedSearch">Verify</label></label>
							</div> <!-- End of parameter -->
							
							<div class="parameter clearfix parameterRow">
								<label for="rec" class="">Receiver</label>
								<input type="#" class="textbox largebox" id="rec" maxlength="50"><label id="verifySupplier" class="linkBtn uldSweepLink"><label class="advancedSearch">Verify</label></label>
							</div> <!-- End of parameter -->
						
						
							<div class="parameter clearfix consignDiv hideBlock">
								<label for="cnpn" class="consignPan">Consignment #</label>
								<input type="#" class="textbox largebox" id="cnpn" maxlength="30">
							</div> <!-- End of parameter -->
							
							<div class="parameter hideBlock carDiv">
								<label for="car" class="">Carrier </label>
								<input type="#" class="textbox largebox" id="car" maxlength="20">
							</div> <!-- End of parameter -->
							
							
							
							
							<div class="parameter">
								<label for="reg" class="regLblBigW hideBlock">Rego / Trailer #</label>
								<label for="reg" class="regLblNotBigW">Rego / Trailer # / Pan no.</label>
								<input type="#" class="textbox largebox" id="reg" maxlength="20">
							</div> <!-- End of parameter -->
							
							
							<div class="parameter hideBlock dcrDiv clearfix">
								<label for="dcr" class="">Delivery Control Register #</label>
								<label class="dcrValue"></label>
							</div> <!-- End of parameter -->
						
					</div> <!-- End of sub section Content -->					
				</div> <!-- End of sub section wrapper -->
				</form>
				
				<div class="tableInfo uldSweepHeader clearfix">
				
					<div class="tableTitle">
						<h4 class=""><br /><strong>List of ULDs</strong></h4>
					</div> <!-- End of table title -->
				</div>
			
			
				
				
				
				
				<div class="tableActionsBtnsWrapper">
                    <div class="lookupActionWrapper">
                        <label class="linkBtn" id="addActionBtn"><a href="#"><label class="hideRow">Add ULD Type</label></a></label>                     
                       
                    </div> <!-- End of lookup action wrapper -->
                                      		
				
				 </div> <!-- End of table actions btn wrapper -->
				  
							<div class="tableActionsWrapper hideBlock1" id="uldSearchArea">
								
								
									<div class="formWrapper">
									
										
										
										<div class="parameter">
											<label for="store"  class="">Type</label>
											<select class="selectOptions" id="typeSelect">
												<option>Select</option>
												<option value="t1">Type One</option>
												<option value="t2">Type Two</option>
											</select>
										</div> <!-- End of parameter -->	

										<div class="parameter hideBlock">
											<label for="req"  class="">Received Qty.</label>
											<input type="#" class="textbox xsmallbox qtyField" id="req" maxlength="3">
										</div> <!-- End of parameter -->
										
										<div class="parameter">
											<label for="ret"  class="">Returned Qty.</label>
											<input type="#" class="textbox xsmallbox qtyField" id="ret" maxlength="3">
										</div> <!-- End of parameter -->
										
										<div class="formActions">
											<label class="actionBtn" id="searchAndAdd">Add</label>
											<label class="secondaryActionBtn closeLink" id="closeLink">Close</label>						
										</div> <!-- End of form actions -->
																
									</div> <!-- End of content table wrapper -->
							
								
								
								
							</div> <!-- End of table Actions Wrapper -->

						
						
							<table class="ContentTable" cellspacing="0" id="addULDTable">
								<thead class="hideBlock">
									<tr class="firstULDRow">
										<th class="">Type</th>
										<th class="centerValue">Returned Qty.</th>
										<th class="centerValue" width="45px">Delete</th>
									</tr>
								</thead>
								<tbody>

								</tbody>							
							</table>
			
				
			
			</div>  <!-- End of content table wrapper -->	
			
			<div class="pageActions hideBlock" id="uldButtonDiv">
				<label class="actionBtn" id="uldSubmitBtn"><a href="#"><label class="thumbUp">Submit</label></a></label>
				<label class="secondaryActionBtn" id="uldCancelBtn"><a href="#">Cancel</a></label>
			</div> <!-- End of page actions-->
			
			
		</div> <!-- End of content wrapper -->
		
	</div>	 <!-- End of main wrapper -->		


	<%@include file="footer.jsp" %>
	<div id="dialog-verifySupplier" class="visible-hide" title="Verify Receiver">
		<div class="popupContent">
			<div class="popupData" id="popupDataDiv"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>
		</div>
	</div>	

</body>
</html>