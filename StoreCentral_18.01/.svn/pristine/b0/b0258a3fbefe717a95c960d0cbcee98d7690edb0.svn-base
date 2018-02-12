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



<title>Claims draft</title>
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
						<li><a href="../claims/claimLookup.htm">RTV and Claims</a></li>
						<li><a href="../claims/claimLookup.htm">Claim Enquiry</a></li>
						<li class="currentPage">Claim Details</li>
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
		
		
	
		
		<div class="contentWrapper">
		
			<div class="articleHead">
				
				<div class="articleHeaderWrapper">
					<h2 class="articleTitle">Draft Claim #11</h2>					
				</div>
				<div class="articleActionBtns">
					<label class="orderStatus">Status: Draft <strong></strong></label>
					<label class="actionBtn" id="editAction"><a href="#"><label class="editBtn">Edit</label></a></label>
					<!--<label class="actionBtn" id=""><a href="#"><label class="notepad">Save as Draft</a></label>	-->
						<label class="actionBtn finalise-btn" id=""><a href="#"><label class="thumbUp">Finalise</label></a></label>	
					<label id="deleteOrder" class="actionBtn"><a href="#"><label class="notepadCross">Delete</label></a></label>						
				</div>
				
				<div class="articleInfoWrapper">				
					<p class="secondaryInfo">
						<label class="articlePriceLabel">Supplier: <strong>71816001-Tip Top Bakeries </strong></label>
						<label class="articlePriceLabel">|</label>
						<label class="articlePriceLabel">Source: <strong>Store</strong></label>
						<label class="articlePriceLabel">|</label>
						<label class="articlePriceLabel">Created By: <strong>James Smith</strong></label>
						<label class="articlePriceLabel">|</label>
						<label class="articlePriceLabel">Create Date: <strong>23/12/2014</strong></label>
						
						
					</p>
				</div>
			
			
			</div> <!-- End of article head -->
			
			
			<div class="articleContent orderDetails">
				
								
				<div class="articleContentInner">
				
					<div class="articleDetails">
				
						
						<table cellspacing="0" class="ContentTable" width="100%">
							
							<tr>
								<td class="keyInfo" width="20%">	
									Total Articles:
								</td>
								<td class="valueInfo" width="15%">
									2
								</td>
								<td class="keyInfo">	
									Authorisation Code
								</td>
								<td class="valueInfo authorisation-code ">
									<label>FR66879</label>
									<input type="#"  class="textbox editElement hideBlock smallbox" value="xxx">
								</td>
								<td class="keyInfo" width="15%">	
									  Reason:
								</td>
								<td class="valueInfo lastColumn" width="20%">
									<label>Out of Date</label>
									<select class="selectOptions hideBlock editElement supplyDrop">
												<option>Select Reason</option>
												<option>Returns Damaged(10)</option>
												<option>Returns Not Ordered(20)</option>
												<option>General Returns(30)</option>
												<option>General Claim(40)</option>
												<option>STOCK WRITE OFF(91)</option>
												<option>OUT OF DATE(52)</option>\
												<option>Ullage(63)</option>
												<option>Central Withdrawals / Recalls(95)</option>
												<option>Stock Loss - Insurance Claim(99)</option> 
									</select>	
								</td>
								
							</tr>							
							
							<tr class="lastRow">
							
								<td class="keyInfo">	
									Delivery Control Reg No:
								</td>
								<td class="valueInfo">
									<label>23245</label>
									<input type="#"  class="textbox editElement hideBlock smallbox" value="xxx">
								</td>
								<td class="keyInfo">	
									Authorisation Date
								</td>
								<td class="valueInfo ">
								<label>24/12/2014</label>
								<input type="#" class="textbox textboxDefaultText inputDate editDateCell hasDatepicker editElement hideBlock" placeholder="dd/mm/yyyy" id="dp1423706448624">					

								</td>
									<td class="keyInfo">	
								
								</td>
								<td class="valueInfo lastColumn">
									
								</td>
							</tr>	
						
						</table>
						
					
					</div>  <!-- End of article details -->											
				
					
					
					
				</div> <!-- End of article content inner -->
				
				
		
			
			</div> <!-- End of article content -->
			
			<div class="ContentTableWrapper" id="viewMode">
			
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4 class="sectionTitle">List of Articles (2)</h4>
					</div> <!-- End of table title -->
					
				</div> <!-- End of table info -->
				
			
					<div class="tableActionsWrapper hideBlock" id="tableGroupAction">
						
						
						<form method="POST" action="" id="groupByForm" class="">
							<div class="formWrapper">
							
								<div class="parameter">
									<label for=""  class="">Group By</label>
									
									<input type="radio" id="supp" value="deptName" name="groupByOptions"><label class="labelText" for="supp">Reason Code</label> 
									
								</div> <!-- End of parameter -->							
								
								
							
								
								
								<div class="formActions">
									<label class="actionBtn" id="applyGroupBy"><a href="#">Apply</a></label>
									<label class="secondaryActionBtn closeLink" id="closeLink"><a href="#">Close</a></label>						
								</div> <!-- End of form actions -->
														
							</div> <!-- End of content table wrapper -->
						</form>	
						
						
					</div> <!-- End of table Actions Wrapper -->
				
				 
				
				
				<table cellspacing="0" class="ContentTable treetable drilldownTable tableSorter" id="viewModeTable1">
					<tr>
						<th>Article #</th>
						<th>Description</th>
						<th class="centerValue ">UOM</th>
						<th class="centerValue">Return quantity.</th>
						
					</tr>
					
					<tr data-tt-id="1">
						<td>2001</td>
						<td>Article Description One</td>	
						<td class="centerValue ">EA</td>
						<td class="centerValue ">5</td>
									

							
					</tr>
					
					<tr data-tt-id="3">
						<td>2001</td>
						<td>Article Description One</td>	
						<td class="centerValue ">EA</td>
						<td class="centerValue ">19</td>
										
							
					</tr>

					
				</table>								
				
				<table cellspacing="0" class="ContentTable treetable drilldownTable tableSorter hideBlock" id="viewModeTable2">
					<tr>
						
						<th>Article #</th>
						<th>Description</th>
						<th class="centerValue ">UOM</th>
						<th class="centerValue">Return quantity</th>
						
					</tr>
								
					<tr data-tt-id="1">
									<td>2001</td>
						<td>Article Description One</td>	
<td class="centerValue ">EA</td>						
						<td class="centerValue ">5</td>
									
	
							
					</tr>

					<tr data-tt-id="3">
										<td>2001</td>
						<td>Article Description One</td>
<td class="centerValue ">EA</td>						
						<td class="centerValue ">5</td>
										

							
					</tr>

					
					
				</table>								
			
						
			</div> <!-- End of ContentTableWrapper -->
			
			
			<div class="ContentTableWrapper hideBlock" id="editMode">
			
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4 class="sectionTitle">List of Articles (2)</h4>
					</div> <!-- End of table title -->				
				</div> <!-- End of table info -->
				
				
				<div class="tableActionsBtnsWrapper">
                    <div class="lookupActionWrapper">
                        
						
						
						<label class="linkBtn" id="addActionBtn">
							<a href="#"><label class="addRow">Add Article</label></a>
						</label>
						
						
						<label class="linkBtn hideBlock" id="groupByOpen">
							<a href="#"><label class="group">Group By</label>	</a>								
						</label>
						
                        <div class="errorDiv hideBlock">
							<label>No article found for '<strong>3234</strong>'. Please try a different number.</label>
							<label class="closeMessage">&nbsp;</label>
						</div>
                       
                    </div> <!-- End of lookup action wrapper -->
                                      		
				
				 </div> <!-- End of table actions btn wrapper -->
				 
				<div class="tableActionsWrapper" id="tableAddAction">
					
					<form method="POST" action="" id="articleForm">
						<div class="formWrapper">
						
							<div class="parameter">
								<label class="" for="searchBox">Article</label>							
								<input type="#" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" id="searchBox">
							</div>							
							
							
							<div class="parameter">
								<label class="" for="qty">Return quantity</label>
								<input type="#" tabindex="2" id="qty" class="textbox  numberBox">
								
							</div>
							
													
							<div class="parameter">
								<label for="sourceOfSupply" class="">Supplier</label>
									<span id="vendorField" class="">
											<input type="#" readonly="readonly" class="textbox mediumbox" placeholder="Tip Top Bakeries (71816001)">
											<label class="linkBtn" id="verifySupplier"><label class="advancedSearch">Search</label></label>								
										</span>	
							</div> <!-- End of parameter -->	
							<div class="formActions">
								<label class="actionBtn" id="searchAndAdd"><a href="#">Search & Add</a></label>
								<label class="secondaryActionBtn closeLink" id="closeLink"><a href="#">Close</a></label>						
							</div> <!-- End of form actions -->
													
						</div> <!-- End of content table wrapper -->
					</form>	
					
					
					
				</div> <!-- End of table Actions Wrapper -->
				
				
				
				<table cellspacing="0" class="ContentTable treetable drilldownTable tableSorter" id="editModeTable">
					<tr>
						<th>Article #</th>
						<th>Description</th>
						<th class="centerValue">Return quantity</th>
						<!--<th class="centerValue title" title="Order Multiple">Cost Price ($)</th>
						<th class="centerValue">Claim Value ($)</th>-->
						<th class="lastColumn centerValue noSort">Actions</th>
					</tr>
					<tr data-tt-id="11">
						<td>2001</td>
						<td>Article Description One</td>
											

						<td class="centerValue ">
							<input type="#" value="5" class="editNumCell textbox textboxDefaultText">
						</td>
						
						<!--<td class="centerValue ">
							5
						</td>
						<td class="centerValue ">30.55</td>-->
						
						<td class="lastColumn centerValue">
							<label class="linkBtn">
								<a href="#"><label class="deleteRecord">&nbsp;</label></a>
							</label>
						</td>
							
					</tr>

					
					
					<tr data-tt-id="13">
						<td>2002</td>
						<td>Article Description Two</td>						
							
						<td class="centerValue ">
							<input type="#" value="5" class="editNumCell textbox textboxDefaultText">
						</td>
						
						<!--<td class="centerValue ">
							5
						</td>
						<td class="centerValue ">23.12</td>		-->		
					
						<td class="lastColumn centerValue">
							<label class="linkBtn">
								<a href="#"><label class="deleteRecord">&nbsp;</label></a>
							</label>
						</td>	
							
					</tr>

					
					
				</table>								
			
				
			
				
				<div class="pageActions ">
					<label class="actionBtn" id=""><a href="#"><label class="">Save</label></a></label>
					<label class="secondaryActionBtn"><a href="#">Cancel</a></label>
				</div> <!-- End of page actions-->
			
				
			</div> <!-- End of ContentTableWrapper -->
			
			
			
			
		</div> <!-- end of content wrapper -->			
				
			
		
		
	</div> <!-- end of main content wrapper -->			
				
	<%@include file="footer.jsp"%>

	<!-- multiple articles pop up-->
		<div id="dialog-promptDelete" title="Delete Order">
			<div class="popupContent">
			
				<div class="popupData popupTitle">
				
					<h4 class="warning">Are you sure you want to delete the order? </h4>								
					
				</div> <!-- End of pop up data -->				
				<div class="popupActionsWrapper">
					<span class="popupActions">
						<label class="actionBtn"><a href="#">Delete</a></label>
						<label class="secondaryActionBtn"><a href="#">Cancel</a></label>
						
						
						
						
					</span>
				</div> <!-- End of popup actions-->
		
				
			</div> <!-- End of popupContent -->
		</div> 
			<!-- multiple articles pop up-->
		<div id="dialog-promptFinalise" class="dialog-promptFinalize" title="Finalise the Claim">
			<div class="popupContent">
			
			
					<div class="popupData">
				
					<div class="formWrapper">						
						
						<div class="parameter">
						
							<table width="100%" class="plainTable">
								
								<tbody><tr>
									<td><label for="com4">Reason</label></td>
									<td>
										<select class="selectOptions supplyDrop">
												<option>Select Reason</option>
												<option>Returns Damaged(10)</option>
												<option>Returns Not Ordered(20)</option>
												<option>General Returns(30)</option>
												<option>General Claim(40)</option>
												<option>STOCK WRITE OFF(91)</option>
												<option>OUT OF DATE(52)</option>\
												<option>Ullage(63)</option>
												<option>Central Withdrawals / Recalls(95)</option>
												<option>Stock Loss - Insurance Claim(99)</option> 
											</select>	
									</td>
								</tr>								
							
								<tr>
									<td><label for="com1">Delivery Control Reg No: </label></td>
									<td><input type="#" class="textbox mediumbox" value="" id="com1" placeholder="Type reference number"></td>
								</tr>
								<tr>
									<td><label for="com2">Authorisation Code</label></td>
									<td>
									<input type="#" class="textbox mediumbox" value="" id="com1" placeholder="Type authorisation code">
									</td>
								</tr>
								<tr>
									<td><label for="com2">Authorisation Date</label></td>
									<td>
									<input type="#" class="textbox textboxDefaultText inputDate hasDatepicker" placeholder="dd/mm/yyyy" id="dp1423706448624">					

									</td>
								</tr>
								
							</tbody></table>
						
						</div> <!-- End of parameter -->		
						
					</div> <!-- End of form wrapper  -->
		
			</div>
			 <!-- End of pop up data -->				
				<div class="popupActionsWrapper">
					<span class="popupActions">
						<label class="actionBtn"><a href="#">Finalise</a></label>
						<label class="secondaryActionBtn"><a href="#">Cancel</a></label>
						
						
						
						
					</span>
				</div> <!-- End of popup actions-->
		
				
			</div> <!-- End of popupContent -->
		</div> 

	<script>	
		
		
		$(function() {		
		// code for setting default parameters for popups
			$( "#dialog-promptDelete" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 600,
				width: 450
			});
			
			$("#deleteOrder").click(function() {		
				$("#dialog-promptDelete").parent().addClass("popupWrapper");
				$("#dialog-promptDelete" ).dialog("open");
			});
			$( "#dialog-promptFinalise" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 600,
				width: 700
			});
			
			$(".finalise-btn").click(function() {		
				$("#dialog-promptFinalise").parent().addClass("popupWrapper");
				$("#dialog-promptFinalise" ).dialog("open");
			});
			$(".inputDate").datepicker({
				firstDay: 1,
				zIndex:50
			});
				
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });

			// code for table sorter 
			$(".tableSorter").tablesorter();	
			
			
			$(".tableSorter th").click(function(){
				$('.tableSorter tr td').each(function(){				
					$(this).removeClass("sorted");				
				});
				
				col=$(this).parent().children().index($(this));		
				
				$('.tableSorter tr').each(function(){				
					$(this).find('td').eq(col).addClass("sorted");				
				});			
			});
			
			
			
				// Code to show and hide group By			
			$('#groupByOpen').click(function() {		
				//$("#filterClear").trigger( "click" );
				$("#groupByClear").removeClass( "hideBlock" );
				
				$("#tableGroupAction").removeClass('hideBlock');
				$(this).addClass('hideBlock');					
			});
			
			$('#groupByClear').click(function() {		
				$("#groupByOpen").removeClass('hideBlock');		
				$(this).addClass('hideBlock');
				$("#tableGroupAction").addClass('hideBlock');
				$("#viewModeTable1").removeClass('hideBlock');
				$("#viewModeTable2").addClass('hideBlock');
			});	

			// Code to apply group by
			$("#applyGroupBy").click(function(){
				$("#tableGroupAction").addClass('hideBlock');
				$("#viewModeTable1").addClass('hideBlock');
				$("#viewModeTable2").removeClass('hideBlock');
			});
			
			
		
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
			
		
		
		
			// Code for Auto Complete
		
		var sampleList = [
			"12345 - T-shirt for kids small",
			"12347 - T-shirt for kids Med",
			"12348 - T-shirt for kids Large",
			"12349 - T-shirt for boys small",
			"12350 - T-shirt for boys Med",
			"12351 - T-shirt for boys Large",
			"12352 - T-shirt for men small",
			"12363 - T-shirt for men Med",
			"12364 - T-shirt for men Large"
		];
		$( "#searchBox" ).autocomplete({
			source: sampleList
		});
		
		
	
		
		// Code for Edit the Draft
		
		$('#editAction').click(function(){
			$("#editMode,.editElement").removeClass('hideBlock');
			$("#viewMode,.articleDetails label").addClass('hideBlock');
			
			$('.articleActionBtns  .actionBtn').each(function(){				
				$(this).addClass("disabled");				
			});

			
		});
		
		$('#editMode .pageActions label').click(function(){
			$("#editMode,.editElement").addClass('hideBlock');
			$("#viewMode,.articleDetails label").removeClass('hideBlock');	
			
			$('.articleActionBtns  .actionBtn').each(function(){				
				$(this).removeClass("disabled");				
			});
		});
		
		
		
			// Code for tool tips
		$(".title").tooltip({
			position: { my: "left bottom", at: "left-2 top" }
		});
		
		
		// code for tree table
		$(".treetable").treetable({
			expandable: true
		});
		
		
		
		
		
		
		
		
		
	</script>	

</body>
</html>