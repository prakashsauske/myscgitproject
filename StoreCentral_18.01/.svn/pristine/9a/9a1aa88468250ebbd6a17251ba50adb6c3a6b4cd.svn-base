<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script src="../../scripts/table.js?version=${properties.version}"></script>
<script src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.ui.timepicker.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<link href="../../styles/slider.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<script type="text/javascript"
	src="../../scripts/instoreMobilinkServices.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/stockTransfer.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/basicSort.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/commonObjects.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/createClaim.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/common.js?version=${properties.version}"></script>
<script src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}"></script>


<title>Claims Lookup</title>
</head>
<body>
	<!-- Start of main wrapper -->
	<div class="mainWrapper">
		<!-- Start of head wrapper -->
		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="stockManage" />
			<!-- Start of breadcrumb wrapper -->
			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<!-- <li class="">Stock Management</li>	 -->
						<li class="currentPage">RTV and Claims</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper hideBlock" id="statusImg">
					<label class="loading">We are getting data, please wait</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->
		</div>
		<!-- End of head wrapper -->
	
		<div class="contentWrapper lookup claims">
		
			<div class="lookupWrapper" id="lookupContainer">
			
				<div class="lookupTitleWrapper">
					<h2>Lookup</h2>
				</div> <!-- End of lookup title wrapper -->
				
				<div class="lookupParamWrapper">
					
					<form id="search" action="" method="POST">
						<div class="searchBox">
							<input type="#" class="textbox textboxDefaultText" placeholder="Search orders" id="orderNo">
						</div> <!-- End of main search box -->
						<label class="actionBtn goButton">Go</label>
						
						 <div class="searchByOptions">
							<label for="searchBox" class="labelText" id="preSearchText">Type Order No. and press Enter</label>
						 
												
						 </div> <!-- End of search by options -->
						 
						 
						 <div class="advancedParam hideBlock advancedSearchFormat" id="advDiv">
						
							<div class="parameter">
								<h3>Create Date:</h3>
								<input type="#" class="textbox defaultTextbox inputDate" id="fromDate" placeholder="dd/mm/yyyy"> to 
								<input type="#" class="textbox defaultTextbox inputDate" id="toDate" placeholder="dd/mm/yyyy">
							</div>
							<div class="parameter">
								<h3>Created By:</h3>
								<input type="#" class="textbox defaultTextbox " id="createdBy" placeholder="">
							</div>
						
							<div class="parameter">
								<h3 for="supplier">Supplier</h3>
								<input type="#" class="textbox textboxDefaultText mediumbox" placeholder="Enter Supplier no or name" id="supplier">
								<label class="linkBtn" id="verifySupplier"><label class="advancedSearch">Search</label></label>
								<input type="hidden" name="supplierVerified" />
							</div> <!-- End of parameter -->
								
								<div class="parameter">
								<h3 for="custName">Order Status:</h3>
								<select class="selectOptions mediumbox " id="claimStatus">
												<option value="">Select Status</option>
												<option value="DRAFT">Open</option>
												<option value="FINALISED">Finalised</option>
											</select>
							</div> <!-- End of parameter -->
								<div class="parameter">
								<h3 for="custName">Source:</h3>
								<select class="selectOptions mediumbox " id="claimSource">
												<option value="">Select Source</option>
												<option value="CENTRAL">Central</option>
												<option value="STORE">Store</option>
											</select>
							</div> <!-- End of parameter -->
						
							<label class="actionBtn goButton1">Go</label>
							
							
						</div> <!-- End of Advanced Param -->
						
						 
						
						
					</form>
				
				</div> <!-- End of lookup param wrapper -->
				
				
				<div class="lookupActionWrapper">
					<label class="linkBtn" id="advLink1"><label class="advancedSearch">Advanced Search</label></label>
					<label class="linkBtn hideBlock" id="closeLink"><label class="closeWindow">Close</label></label>
				</div> <!-- End of lookup action wrapper -->
			
				<!-- wrapper that handles the box under the advanced search form -->
				<div id="advWrapper" class="hideBlock" style="height:55px;">
					
				</div>
			
			
			
			</div> <!-- End of lookup wrapper -->
			
				<div class="ContentTableWrapper errorDivWrapper hideBlock" style="padding-top:5px;">
					<div class="tableInfo">

						<div class="nodataMessage" id="errorMsgDiv">
							<label id="errorMsg"></label>

							<!-- End of table title -->

						</div>
					</div>

				</div>
			
			<div class="ContentTableWrapper claimLookupContentWrapper hideBlock" id="todaysOrders">
			
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4><strong>List of Claims</strong></h4>
					</div> <!-- End of table title -->
				
				
				</div> <!-- End of table info -->
				
					
				<div id="tabs"  class="tabs">			
					<ul id="listOfTabs">
					<li><a href="#tabs-2">Draft (3)</a></li>		
					<li><a href="#tabs-3">Finalised (3)</a></li>
						
					</ul>	
				
					<div id="tabs-3">
						<div class="ContentTableWrapper" id="todaysOrders">
					
							<div class="tableInfo">
				
								<div class="tableTitle">
									<h5 class="sectionTitle"><strong>List of Finalised Claims </strong></h5>
									
								</div> <!-- End of table title -->
							</div> <!-- End of table info -->

							<div class="paginationWrapper  paginationDiv  paginationDivFinal"
								id="paginationDivFinal">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>


							<table cellspacing="0" class="ContentTable actionRows" id="beforeSubmit">
					<thead> 
					<tr>
						<!--<th width="20px" class="noSort {sorter: false}"></th>-->
						<th class="noSort" width="100px">Return Order # </th>
						<th class="noSort" >Supplier </th>
						<th class="noSort" >Source </th>
						<th class="noSort" >Reason </th>
						<th class="centerValue noSort">Create Date</th>
						<th class=" centerValue noSort" width="100px">Status</th>
						<th class="lastColumn centerValue noSort" width="100px">Article Count</th>
					</tr>
					</thead> 
					<tbody> 
					<tr class="filterRow hideBlock drillsOpenDefault">	
						<td>&nbsp;</td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox inputDate" placeHolder="dd/mm/yyyy"></td>
						<td><input type="#" class="textbox inputDate" placeHolder="dd/mm/yyyy"></td>
						
						<td><input type="#" class="textbox"></td>
					</tr>
					<tr>
						<td colspan="8" class="groupBy1 rowSection rowHighlight">
							Supplied By: xxxxx xxxxx xxxxxx			
						</td>						
					</tr>
					<tr>
						<td>3223</td>
						<td class="centerValue">76434</td>
						<td>Tip Top Bakeries (71816001)</td>
						<td>Central</td>
												<td>xxxx xxxx</td>

						<td class="centerValue">13/11/2014</td>					
						<td class="centerValue">Finalised</td>
						<td class="lastColumn centerValue">12</td>
					</tr>
					<tr>
						<td>6756</td>
						<td class="centerValue">23435</td>

						<td>Tip Top Bakeries (71816001)</td>
						<td>Central</td>
												<td>xxxx xxxx</td>
						<td class="centerValue">13/11/2014</td>					
						<td class=" centerValue">Finalised</td>
						<td class="lastColumn centerValue">33</td>
					</tr>
					<tr>
						<td colspan="8" class="groupBy1 rowSection rowHighlight">
							Supplied By: xxxxx xxxxx xxxxxx			
						</td>						
					</tr>
					<tr>
						<td>987</td>
						<td class="centerValue">564</td>
						<td>Sydney Limited (65735426)</td>
						<td>Store</td>
												<td>xxxx xxxx</td>

						<td class="centerValue">13/11/2014</td>					
						<td class=" centerValue">Finalised</td>
						<td class="lastColumn centerValue">45</td>
					</tr>
					
					</tbody> 					
				</table>
				</div>	
				</div>
				<div id="tabs-2">
					<div class="tableInfo">
				
					<div class="tableTitle">
						<h5 class="sectionTitle"><strong>List of Draft Claims </strong></h5>
					
					</div> <!-- End of table title -->
					
					
				
				</div>
				
				<div class="paginationWrapper  paginationDiv  paginationDivDraft"
								id="paginationDivDraft">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
				 
				
				<div class="tableActionsBtnsWrapper">
                    <div class="lookupActionWrapper">
                        <label class="linkBtn" id="addActionBtn">
							<a href="#"><label class="addRow">Create New Claim</a></label>
						</label>
						<label class="linkBtn hideBlock" id="groupByOpen">
							<a href="#"><label class="group">Group By</label>	</a>								
						</label>
 
                    </div> <!-- End of lookup action wrapper -->
                                      		
				
				 </div> <!-- End of table actions btn wrapper -->
				
			
						
				
				<table cellspacing="0" class="ContentTable actionRows" id="beforeSubmit">
					<thead> 
					<tr>
						<!--<th width="20px" class="noSort {sorter: false}"></th>-->
						<th class="noSort" width="100px">Return Order # </th>
						<th class="noSort" >Supplier </th>
						<th class="noSort" >Source </th>
						<th class="noSort" >Reason </th>
						<th class="centerValue noSort">Create Date</th>
						<th class=" centerValue noSort" width="100px">Status</th>
						<th class="lastColumn centerValue noSort" width="100px">Article Count</th>
					</tr>
					</thead> 
					<tbody> 
					<tr class="filterRow hideBlock drillsOpenDefault">	
						<td>&nbsp;</td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox inputDate" placeHolder="dd/mm/yyyy"></td>
						<td><input type="#" class="textbox inputDate" placeHolder="dd/mm/yyyy"></td>
						
						<td><input type="#" class="textbox"></td>
					</tr>
					<tr>
						<td colspan="8" class="groupBy1 rowSection rowHighlight">
							Supplied By: xxxxx xxxxx xxxxxx			
						</td>						
					</tr>
					<tr>
						<td>1234</td>
						<td class="centerValue">234562</td>
						<td>Tip Top Bakeries (71816001)</td>
						<td>Central</td>
												<td>xxxx xxxx</td>

						<td class="centerValue">13/11/2014</td>					
						<td class="centerValue">Draft</td>
						<td class="lastColumn centerValue">12</td>
					</tr>
					<tr>
						<td colspan="8" class="groupBy1 rowSection rowHighlight">
							Supplied By: xxxxx xxxxx xxxxxx			
						</td>						
					</tr>
					<tr>
						<td>2662</td>
						<td class="centerValue">12734</td>

						<td>Tip Top Bakeries (71816001)</td>
						<td>Store</td>
												<td>xxxx xxxx</td>
						<td class="centerValue">13/11/2014</td>					
						<td class=" centerValue">Draft</td>
						<td class="lastColumn centerValue">34</td>
					</tr>
					<tr>
						<td>2454</td>
						<td class="centerValue">7452</td>
						<td>Sydney Limited (65735426)</td>
						<td>Central</td>
												<td>xxxx xxxx</td>

						<td class="centerValue">13/11/2014</td>					
						<td class=" centerValue">Draft</td>
						<td class="lastColumn centerValue">88</td>
					</tr>
					
					</tbody> 					
				</table>
				
			
				<div class="tableFooter">
					
				
					<div class="pageActions hideBlock" id="afterSubmit">
						<label class="secondaryActionBtn"><a href="#">Cancel</a></label>
						<label class="actionBtn" id=""><a href="#"><label class="thumbUp">Complete (01)</label></a></label>						
					</div> <!-- End of page actions-->				
					
				
				</div> <!-- End of table footer -->				
				</div>
				</div>
			</div>  <!-- End of article details -->
			
		</div> <!-- End of content table wrapper -->
		

	
	</div>	
	
	
	<%@include file="footer.jsp"%><!-- End of footer wrapper -->
	
	
	<a href="#" class="scrollup">Top</a>
	
	
	
	
	
	
<%-- 	

	<!-- Print Carton Labels -->
	<div id="dialog-print" title="Print Carton Labels">
		<div class="popupContent wizardContent">
		
			<div class="popupData">
			
				<h4 class="alertText">Provide supplier code and select service requets to print carton labels</h4>
				
				<form method="POST" action="" id="wizard">
					<div class="formWrapper" title="Print parameters">
						<h2 class="wizardTitle">Provide print parameters </h2>
						
						
						<div class="parameter">
						
							<table width="100%" class="plainTable">
								<tr>
									<td><label for="p7">Number of copies</label></td>
									<td><input type="#" class="textbox numberBox" value="" id="p7"></td>
								</tr>
								
								<tr>
									<td colspan="2"><hr class="sectionDivider clearfix"></td>
								</tr>
								
								<tr>
									<td><label for="p1">Request Type</label></td>
									<td>
										<input type="radio" checked="" id="cust" value="cust" name="stockType"><label class="labelText" for="cust">Claim</label>
										<input type="radio" id="store" value="store" name="stockType"><label class="labelText" for="store">Repair</label>
									</td>
								</tr>
								
								<tr>
									<td colspan="2"><hr class="sectionDivider clearfix"></td>
								</tr>							
								<tr>
									<td><label for="p3">Supplier Code</label></td>
									<td><input type="#" class="textbox smallbox" value="" id="p1"><label id="verifySupplier" class="linkBtn"><a href="#"><label class="advancedSearch">Verify</label></a></label></td>
								</tr>
								<tr>
									<td><label for="p4">Supplier Name</label></td>
									<td>XXXXX XXXXXXX</td>
								</tr>
								<tr>
									<td><label for="p5">Contact Number</label></td>
									<td>## ##########</td>
								</tr>
								<tr>
									<td><label for="p6">Authority / Attention Name</label></td>
									<td><input type="#" class="textbox mediumbox" value="" id="p6"></td>
								</tr>
								
								
								
							</table>
						
						</div> <!-- End of parameter -->		
						
						
					</div> <!-- End of form wrapper step 1 -->
			
					
					<div class="formWrapper" title="Select service requests">
						<h2 class="wizardTitle">Select service requests for print</h2>
						
						<div class="ContentTableWrapper">
							<table cellspacing="0" class="ContentTable">										
								<thead> 
								<tr>					
									<th class=" centerValue"  width="10px"><input type="checkbox" name="sel"> </th>
									<th>Article #</th>
									<th>Description</th>
									<th class="centerValue">Create Date</th>
									<th class="centerValue lastColumn">Due Date </th>	
								</tr>
								</thead> 
								<tbody>
								<tr>						
									<td class="centerValue"><input type="checkbox" name="sel"></td>
									<td>12345</td>
									<td>T-shirt for kids small </td>
									<td class="centerValue">13/11/2014</td>
									<td class="centerValue lastColumn">04/12/2014</td>	
								</tr>
								<tr>						
									<td class="centerValue"><input type="checkbox" name="sel"></td>
									<td>12345</td>
									<td>T-shirt for kids small </td>
									<td class="centerValue">13/11/2014</td>
									<td class="centerValue lastColumn">04/12/2014</td>	
								</tr>							
																	
							
								</tbody>				
							</table>
						</div> <!-- End of content table wrapper -->
						
					
					</div> <!-- End of form wrapper step 2 -->
					
				</form>						
			</div> <!-- End of pop up data -->
			
			
			
		</div> <!-- End of popupContent -->
	</div> <!-- End of Competition -->

	
	<!-- Multiple action cofirmation -->
	<div id="dialog-confirm" title="Send Reminder Email / Mark as Complete / Cancel">
		<div class="popupContent">
			
			<div class="popupData">
				<h4 class="alertText" >Are you sure you want to Send Reminder Email / Mark as Complete / Cancel selected <strong>number</strong> requests?</h4>						

				<div class="popupActionsWrapper">
					<span class="popupActions">
						<label class="actionBtn">Yes</label>
						<label class="secondaryActionBtn">No</label>
					</span>
				</div> <!-- End of popup actions-->
			</div> <!-- End of pop up data -->	
			
		</div> <!-- End of popupContent -->
	</div><!-- End Cancel order popup -->
	--%>	

	<!-- Quick help -->		
	<div id="printDataForCtnLbl" class="hideBlock">
		<div id="printbodyForCtnLbl" class="printbody cartonLabel"></div>
	</div>
	<div class="quickHelpWrapper hideBlock">
		<div class="quickHelpContent">
			<div class="quickHelpTitle">
				<h4 class="title">Three Drafted Claims are pending to submit</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">The draft claims# <strong>1234567</strong> , <strong>2345678</strong> and <strong>7454342</strong> are pending to submit</p>
			</div> <!-- End of quick help title -->
			<div class="content">
				
				<h4 class="title">What next?</h4>
				<ul>
					<li>Click on the draft tab and the claims to edit and submit</li>
					
				</ul>
			</div> <!-- End of content -->
		</div> <!-- End of quick help content -->	
	</div> <!-- End of quick help wrapper -->
	
	<!-- verify supplier pop up-->
	<div id="dialog-verifySupplier" title="Verify Supplier">
		<div class="popupContent">
			<!-- <div class="popupSearchWrapper" id="popupSearch">
				<h3>Supplier Name:</h3>
				<input type="#" placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDescEnq"> <label
					class="actionBtn" id="goButtonSample1">Go</label>
			</div>-->
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDivEnq"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>

		</div>
		</div>
	

</body>
</html>