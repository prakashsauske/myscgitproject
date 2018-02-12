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



<title>Create Claim</title>
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
						<li class="currentPage">Raise a Claim</li>
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
		
			
			
			
			
			<div class="ContentTableWrapper" id="editMode">
			
				<div class="errorDiv hideBlock" id="errorMsgDiv" style="padding-top: 20px;">
					<label id="errorMsg"> </label> <label class="closeMessage"
						onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
				</div>
			
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4 class="sectionTitle">Raise a Claim</h4>
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
				 
				<div class="tableActionsWrapper" id="articleSearchDivForCreate">
					
					<form method="POST" action="" class="articleForm" data-map="obj"
								id="articleSearchFormForCreate">
						<div class="formWrapper">
						
							<div class="parameter">
								<label class="" for="searchBox">Article</label>							
								<input data-item="iv_article" name="iv_article"
											type="#" class="textbox textboxDefaultText searchbox"
											placeholder="Type number, description, or EAN / TUN / PLU and press Enter"
											id="searchBox">
								<input type="hidden" data-item="iv_site" name="iv_site" />
								<input type="hidden" data-item="iv_ranged" name="iv_ranged" value="Y"/>											
							</div>							
							
							
							<div class="parameter">
								<label class="" for="qty">Return Quantity</label>
								<input type="#" data-item="iv_qty" name="iv_qty" tabindex="2" id="qty" class="textbox  numberBox">
								
							</div>
							
													
							<div class="parameter">
								<label for="sourceOfSupply" class="">Supplier</label>
									<span id="vendorField" class="">
											<input class="textbox mediumbox" placeholder="Type number or name and click search" id="vendorText">
											<label class="linkBtn" id="verifySupplier"><label class="advancedSearch">Search<input type="hidden" id="isVerified" value="false" /></label></label>								
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
						<th width="30%">Description</th>
						<th class="centerValue">UOM</th>
						<th class="centerValue">Return quantity</th>
						<!--<th class="centerValue title">Cost Price ($)</th>
						<th width="200px" class="centerValue rightAlign">Total Value ($)</th>-->
						<th class="lastColumn centerValue noSort">Actions</th>
					</tr>
					<tr data-tt-id="11">
						<td>2001</td>
						<td>Article Description One</td>
					<td class="centerValue ">
							EA
						</td>

						<td class="centerValue ">
							<input type="#" value="5" class="editNumCell textbox textboxDefaultText">
						</td>
						
						<!--<td class="centerValue ">
5						</td>
						<td class="centerValue rightAlign">30.55</td>-->
						
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
							EA
						</td>	
						<td class="centerValue ">
							<input type="#" value="5" class="editNumCell textbox textboxDefaultText">
						</td>
						
						<!--<td class="centerValue ">
5						</td>
						<td class="centerValue rightAlign">23.12</td>	-->			
					
						<td class="lastColumn centerValue">
							<label class="linkBtn">
								<a href="#"><label class="deleteRecord">&nbsp;</label></a>
							</label>
						</td>	
							
					</tr>
					
					<!--<tr>
					    <td class="" colspan="5"></td>
						<td  class="rightAlign">Total Claim Amount: <strong>$57.45</strong></td>
						<td class="centerValue">Total Articles: <strong>2</strong></td>
							
					</tr>-->

					
					
				</table>								
			
				
			
				
				<div class="pageActions ">
					<label class="actionBtn draft-btn" id=""><a href="#"><label class="notepad">Save as Draft</a></label>	
						<label class="actionBtn finalise-btn" id=""><a href="#"><label class="thumbUp">Finalise</label></a></label>	
				</div> <!-- End of page actions-->
			
				
			</div> <!-- End of ContentTableWrapper -->
			
			
			
			
		</div> <!-- end of content wrapper -->			
				
			
		
		
	</div> <!-- end of main content wrapper -->			
				
	<%@include file="footer.jsp"%>

	<!-- multiple articles pop up-->
		<div id="dialog-promptDelete" title="Delete Order">
			<div class="popupContent">
			
				<div class="popupData popupTitle">
				
					<h4 class="warning">Are you sure you want to remove this article? </h4>								
					
				</div> <!-- End of pop up data -->				
				<div class="popupActionsWrapper">
					<span class="popupActions">
						<label class="secondaryActionBtn">Cancel</label>
						<label class="actionBtn">Delete</label>
						
						
						
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
									<input type="#" class="textbox textboxDefaultText inputDate  hasDatepicker" placeholder="dd/mm/yyyy" id="dp1423706448624">					

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
		
		<!-- multiple articles pop up-->
		<div id="dialog-promptDraft" class="dialog-promptFinalise" title="Save as Draft">
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
						<label class="actionBtn"><a href="#">Save</a></label>
						<label class="secondaryActionBtn"><a href="#">Cancel</a></label>
						
						
						
						
					</span>
				</div> <!-- End of popup actions-->
		
				
			</div> <!-- End of popupContent -->
		</div> 
		
	<!-- verify supplier pop up-->
	<div id="dialog-supplier-modal" title="Verify Supplier">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearchVendor">
				<h3>Supplier Name:</h3>
				<input  placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDesc"> <label
					class="actionBtn" id="goButtonSample1">Go</label>
			</div>
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDiv"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>
		</div>
	</div>
	<!-- verify supplier pop up-->
	
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
			
			$(".deleteRecord").click(function() {		
				$("#dialog-promptDelete").parent().addClass("popupWrapper");
				$("#dialog-promptDelete" ).dialog("open");
			});
			
			$( "#dialog-promptFinalise,#dialog-promptDraft" ).dialog({				
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
			$(".draft-btn").click(function() {		
				$("#dialog-promptDraft").parent().addClass("popupWrapper");
				$("#dialog-promptDraft" ).dialog("open");
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