<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

	<title>Application Settings - v2</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>

<script type="text/javascript" src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>

	
	<script src="../../scripts/jquery.jWizard.js?version=${properties.version}"></script>	
	
	<!-- 
		v2 - 4th Nov
		Changed instructional text
		Added settings for In-store Promotion
	
	-->
	
</head>
<body>

	<div class="mainWrapper">
	
		<div class="headWrapper">
			<input id="navBarHighlight" type="hidden" value="admin"/>

	<%@include file="header.jsp" %>
		
			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label> 
					<ul>
						<li><a href='#'>Home</a></li>						
						<li class="currentPage">Application Settings</li>					
					</ul>
				</div> <!-- End of breadcrumbs -->
				
				<div class="statusWrapper">
					<label class="loading hideBlock">We are getting data, please wait</label>
					<label class="secondaryActionBtn">Back</label>
				</div> <!-- End of status wrapper -->
				
			</div>	<!-- End of breadcrumb wrapper -->
			
			
			
			
			
		
		
		</div> <!-- End of head wrapper -->
		
		
		
		<div class="contentWrapper directContent settings">
			
					
				
				<!-- For displaying report results -->
				<div class="ContentTableWrapper">
			
					<div class="tableInfo">
					
						<div class="tableTitle">
							<h4><strong>Application Settings</strong></h4>
						</div> <!-- End of table title -->					
						
					
					</div> <!-- End of table info -->
					
					
					<div id="tabs" class="app-settings-tabs">			
						<div class="tableTitle banner-title">
							<h4>
								<span class="step-count">1</span>
								<label>Select Banner</label>
								<div class="icon-arrow">&nbsp;</div>
							</h4>
						</div>
		              
						<ul>
							<li><a href="#tabs-1">BigW</a></li>
							<li><a href="#tabs-2">BWS</a></li>
							<li><a href="#tabs-3">Countdown</a></li>
							<li><a href="#tabs-4">Dan Murphy's</a></li>							
							<li><a href="#tabs-5">Petrol</a></li>
							<li><a href="#tabs-6">Thomas Dux </a></li>
							<li><a href="#tabs-7">Woolworths</a></li>							
						</ul>					
						
						
						
						<div id="tabs-1" class="sales-org-tabs inner-pad">
							<div class="tableTitle">
							<h4>
								<span class="step-count">2</span>
								<label>Select Role</label>
								<div class="icon-arrow-down">&nbsp;</div>
							</h4>
						</div>
					<div id="editTabs" class="ui-vertical-tabs">
					<ul class="ui-tabs-role">
						<li class="full-width"><a href="#editTabs-1">Store Manager</a></li>						
						<li class="full-width"><a href="#editTabs-2">Department Manager</a></li>
						<li class="full-width"><a href="#editTabs-3">Team Member</a></li>
						<li class="full-width"><a href="#editTabs-4">Customer Assistant</a></li>
						<li class="full-width"><a href="#editTabs-5">Office Support</a></li>
						<li class="full-width"><a href="#editTabs-6">Office Assistant</a></li>
						<li class="full-width"><a href="#editTabs-7">Store Support</a></li>
						<li class="full-width"><a href="#editTabs-8">Business Review</a></li>
						<li class="full-width"><a href="#editTabs-9">Stocktake Manager</a></li>
						<li class="full-width"><a href="#editTabs-10">Stocktake Team Member</a></li>
						<li class="full-width"><a href="#editTabs-11">IT Support</a></li>
						<li class="full-width"><a href="#editTabs-12">All Roles</a></li>
						
					</ul>
					
					<div id="editTabs-1" class="ui-menus-panel">
						<div class="tableTitle">
							<h4>
								<span class="step-count">3</span>
								<label>Select Function & Apply Seetings</label>
								<div class="icon-arrow-down">&nbsp;</div>
							</h4>
						</div>
							
					<div id="menuTabs" class="app-settings-tabs ui-tabs-horizontal ui-tabs ui-widget ui-widget-content ui-corner-all ui-helper-clearfix">			
			              
							<ul class="ui-tabs-menus">
								<li><a href="#menuTabs-1">Lookups</a></li>
								<li><a href="#menuTabs-2">Orders</a></li>
								<li><a href="#menuTabs-3">Reports</a></li>
								<li><a href="#menuTabs-4">Stock management</a></li>							
								<li><a href="#menuTabs-5">Pricing</a></li>
								<li><a href="#menuTabs-6">Ticketing </a></li>							
							</ul>					
							<label class="help-text">Define access level and stores for each activities within Orders</label>
							
							
								<div id="menuTabs-1" class="ui-menus">
								<table cellspacing="0" class="ContentTable treetable drilldownTable" id="initial">
								<tbody><tr>
								<th rowspan="2" width="10px"><input type="checkbox" class="select-all-menu"></th>
								<th rowspan="2">Activities</th>
								<th class="centerValue columnDivider" colspan="2">Access Level</th>
								<th class="centerValue columnDivider" colspan="2">Include Stores</th>
							
							
								<th class="centerValue columnDivider" rowspan="2" width="50px">Exclude Stores</th> 						
								
							</tr>
							
							
							<tr class="subHeader">
								<th class="centerValue" width="85px">Read Only</th>
								<th class="centerValue columnDivider" width="85px">Full</th>
								<th class="centerValue" width="85px">All</th>
								<th class="centerValue columnDivider" width="85px">Only a few</th>	
								
							</tr>
							
							
							
							
							<tr id="row-1" data-tt-id="1" class="drillsOpenDefault collapsed">
								<td><span class="indenter" style="padding-left: 0px;"></span><input class="menu-checkbox" type="checkbox"></td>
								<td>Order Enquiry</td>
								<td class="centerValue columnDivider"><input type="radio" name="access-radio-1"/></td>
								<td class="centerValue columnDivider"><input type="radio" checked name="access-radio-1"/></td>
						
								
								<td id="startDate-1" class="centerValue "><input class="all-store-checkbox" type="checkbox"/></td>
														
								<td id="endDate-1" class="centerValue include-store  columnDivider"><label class="linkBtn"><a href="#"><label class="addRow">Add</label></a></label></td>
								
								
								
							
								
								<td class="centerValue exclude-store columnDivider"><label class="linkBtn"><a href="#"><label class=""></label></a></label></td>
								
								
							</tr>
							<tr id="row-1" data-tt-id="1" class="drillsOpenDefault collapsed">
								<td><span class="indenter" style="padding-left: 0px;"></span><input  class="menu-checkbox"type="checkbox"></td>
								<td>Manual Order</td>
								<td class="centerValue columnDivider"><input type="radio" name="access-radio-2"/></td>
								<td class="centerValue columnDivider"><input type="radio" checked name="access-radio-2"/></td>
						
								
								<td id="startDate-1" class="centerValue "><input class="all-store-checkbox" type="checkbox"/></td>
														
								<td id="endDate-1" class="centerValue include-store columnDivider"><label class="linkBtn"><a href="#"><label class="addRow">Add</label></a></label></td>
								
								
								
							
								
								<td class="centerValue exclude-store columnDivider"><label class="linkBtn"><a href="#"><label class=""></label></a></label></td>
								
								
							</tr>
							<tr id="row-1" data-tt-id="1" class="drillsOpenDefault collapsed">
								<td><span class="indenter" style="padding-left: 0px;"></span><input  class="menu-checkbox" type="checkbox"></td>
								<td>Inter Branch Transfer</td>
								<td class="centerValue columnDivider"><input type="radio" name="access-radio-3"/></td>
								<td class="centerValue columnDivider"><input type="radio" checked name="access-radio-3"/></td>
						
								
								<td id="startDate-1" class="centerValue "><input class="all-store-checkbox" type="checkbox"/></td>
								<td class="centerValue include-store columnDivider"><label class="linkBtn"><a href="#"><label class="addRow">Add</label></a></label></td>						
								<td id="endDate-1" class="centerValue exclude-store columnDivider"><label class="linkBtn"><a href="#"><label class=""></label></a></label></td>
							</tr>
						</tbody>
						</table>
						<label class="legend-text">Legend: <strong>Read Only</strong> - View Access, <strong>Full</strong> - View, Add & Edit Access</label>
						
					</div>
					<div id="menuTabs-2" class="ui-menus">
					</div>
					<div id="menuTabs-3" class="ui-menus">
					</div>
					<div id="menuTabs-4" class="ui-menus">
					</div>
					<div id="menuTabs-5" class="ui-menus">
					</div>
					<div id="menuTabs-6" class="ui-menus">
					</div>
					</div>
				</div>
			<div id="editTabs-2" class="ui-menus-panel"></div>
			<div id="editTabs-3" class="ui-menus-panel"></div>
			<div id="editTabs-4" class="ui-menus-panel"></div>
			<div id="editTabs-5" class="ui-menus-panel"></div>
			<div id="editTabs-6" class="ui-menus-panel"></div>
			<div id="editTabs-7" class="ui-menus-panel"></div>
			<div id="editTabs-8" class="ui-menus-panel"></div>
			<div id="editTabs-9" class="ui-menus-panel"></div>
			<div id="editTabs-10" class="ui-menus-panel"></div>
			<div id="editTabs-11" class="ui-menus-panel"></div>	
			<div id="editTabs-12" class="ui-menus-panel"></div>		
		</div>
		<div class="pageActions" id="beforePublish">
							<label class="actionBtn" id="replicate"><label class="replicate">Replicate Settings</label></label>
							<label class="actionBtn" id="save"><label class="thumbUp">Save </label></label>
						</div> <!-- End of page actions-->
		</div> <!-- End of tab - 1 -->
		<div id="tabs-2" class="sales-org-tabs">
								
							
		</div>
		
		
		
		<div id="tabs-3" class="sales-org-tabs">
		
		
		</div>
		
		
		
		<div id="tabs-4" class="sales-org-tabs">
		
		
		</div>
		
		<div id="tabs-5" class="sales-org-tabs">
		
		
		</div>
		
		
		
		<div id="tabs-6" class="sales-org-tabs">
		
		
		</div>
		
		
		
		<div id="tabs-7" class="sales-org-tabs">
		
		
		</div>
		
	</div> <!-- End of tabs -->
		
	</div>  <!-- End of Content Table Wrapper-->	

	</div> <!-- End of content wrapper -->
		
		
	</div>	<!-- End of main wrapper -->
			
	<div class="footerWrapper">
		<div class="footer">
			<div class="copyrightsInfo">
				Copyright &copy Woolworths 2013
			</div>
			<div class="policyInfo">
				<a href="#">Privacy Policy</a>
				<label class="divider">|</label>
				<a href="#">Terms of Use</a>
			</div>
		</div>
		
	</div>
	
	
	<!-- All Edit functions -->
	<div id="dialog-editFunctions" title="Add or Edit">
		<div class="popupContent">
			
			<div class="popupData">
				<h4 class="alertText hideBlock">Select what you want to Edit</h4>	
				
				

					<div class="ContentTableWrapper">
					
						
						<div class="tableActionsBtnsWrapper">
							<div class="lookupActionWrapper">
								<label class="linkBtn" id="addActionBtn"><label class="addRow">Add Store</label></label>
							</div> <!-- End of lookup action wrapper -->
													
						
						 </div> <!-- End of table actions btn wrapper -->
						 
						<div class="tableActionsWrapper hideBlock" id="tableAddAction">
							
							<form method="POST" action="" id="articleForm">
								<div class="formWrapper">
															
									<div class="parameter">
										<label for="store" class="">Store</label>
										 <input type="text" placeholder="Enter store no."/>
									</div> <!-- End of parameter -->
									
									
									<div class="formActions">
										<label class="actionBtn" id="searchAndAdd">Add</label>
										<label class="secondaryActionBtn closeLink" id="closeLink">Close</label>						
									</div> <!-- End of form actions -->
															
								</div> <!-- End of content table wrapper -->
							</form>	
							
							
							
						</div> <!-- End of table Actions Wrapper -->

					
					
						<table class="ContentTable" cellspacing="0">
							<tr>
								<th class="">Store</th>
							
								<th class="centerValue" width="45px">Actions</th>
							</tr>
							<tr id="rowExpiry-1">
								<td>1111 - Bella Vista</td>
								<td class="centerValue">													
									<label class="linkBtn" id="DeleteExpiryRecord-1">
										<label class="deleteRecord">Delete</label>
									</label>
								</td>
							</tr>	
							<tr id="rowExpiry-1">
								<td>2222 - Chester Hills</td>
								<td class="centerValue">													
									<label class="linkBtn" id="DeleteExpiryRecord-1">
										<label class="deleteRecord">Delete</label>
									</label>
								</td>
							</tr>	
							<tr id="rowExpiry-1">
								<td>3333 - Circa</td>
								<td class="centerValue">													
									<label class="linkBtn" id="DeleteExpiryRecord-1">
										<label class="deleteRecord">Delete</label>
									</label>
								</td>
							</tr>	
						</table>
					</div> <!-- End of ContentTableWrapper -->
						
				
			</div> <!-- End of pop up data -->
			
			<div class="popupActionsWrapper">
				<span class="popupActions">
					<label class="actionBtn" id="createOrderButton"><a href="#"><label class="thumbUp">Save</label></a></label>
					<label class="secondaryActionBtn"><a href="#">Cancel</a></label>
				</span>
			</div> <!-- End of popup actions-->
			
			
		</div> <!-- End of popupContent -->
	</div><!-- End of popup -->
	
	
		<!-- Replicate settings -->
	
	<div id="dialog-replicate" title="Replicate Settings">
		<div class="popupContent wizardContent">
		
			
			
			<div class="popupData">
			
				<h4 class="alertText">Replicate '<strong>Store Manager</strong>' settings to other roles</h4>
			
				
				<form method="POST" action="" id="wizard">
					<div class="formWrapper" title="Choose functions & activities">
						<h2 class="wizardTitle">Choose functions & activities you want to replicate</h2>
						<div id="mainTabs-4" class="tabContent">
						
							<div id="functions" class="filterTabs">
								<ul>
									<li><a href="#itemInfo-1">Lookup</a></li>
									<li><a href="#itemInfo-2">Orders</a></li>
									<li><a href="#itemInfo-3">Reports</a></li>
									<li><a href="#itemInfo-4">Stock Management</a></li>								
									<li><a href="#itemInfo-6">Pricing</a></li>
									<li><a href="#itemInfo-7">Ticketing</a></li>
								</ul>
								<div id="itemInfo-1">
									<div class="ContentTableWrapper">
										
										<table cellspacing="0" class="ContentTable">										
											<thead> 
											<tr>					
												<th class="centerValue"  width="10px"><input type="checkbox" name="sel"> </th>	
												<th class="lastColumn">Activities </th>	
											</tr>
											</thead> 
											<tbody>
											<tr>						
												<td class="centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Article Enquiry</td>	
											</tr>												
											</tbody>				
										</table>
				
									</div> <!-- End of content table wrapper -->
								</div>
								<div id="itemInfo-2">
									<div class="ContentTableWrapper">
										<table cellspacing="0" class="ContentTable">										
											<thead> 
											<tr>					
												<th class=" centerValue"  width="10px"><input type="checkbox" name="sel"> </th>	
												<th class="lastColumn">Activities </th>	
											</tr>
											</thead> 
											<tbody>
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Order Enquiry</td>	
											</tr>	
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Manual Order</td>											
											</tr>				
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Inter Branch Transfer</td>											
											</tr>	
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Receive Orders</td>											
											</tr>
											</tbody>				
										</table>					
										
									</div> <!-- End of content table wrapper -->	
								</div>
								<div id="itemInfo-3">
									<div class="ContentTableWrapper">
										<table cellspacing="0" class="ContentTable">										
											<thead> 
											<tr>					
												<th class=" centerValue"  width="10px"><input type="checkbox" name="sel"> </th>	
												<th class="lastColumn">Activities </th>	
											</tr>
											</thead> 
											<tbody>
											<tr class="rowSection rowHighlight">						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Finance</td>	
											</tr>	
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Finance Report One</td>										
											</tr>				
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Finance Report Two</td>											
											</tr>	
											<tr class="rowSection rowHighlight">						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Operations</td>	
											</tr>	
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Operations Report One</td>										
											</tr>				
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Operations Report Two</td>											
											</tr>	
											</tbody>				
										</table>	
									</div> <!-- End of content table wrapper -->
								</div>
								<div id="itemInfo-4">
									<div class="ContentTableWrapper">
										<table cellspacing="0" class="ContentTable">										
											<thead> 
											<tr>					
												<th class=" centerValue"  width="10px"><input type="checkbox" name="sel"> </th>	
												<th class="lastColumn">Activities </th>	
											</tr>
											</thead> 
											<tbody>
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Activity Name One</td>	
											</tr>	
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Activity Name Two</td>												
											</tr>			
										
											</tbody>				
										</table>		
									</div> <!-- End of content table wrapper -->
								</div>
								<div id="itemInfo-6">
									<div class="ContentTableWrapper">
										<table cellspacing="0" class="ContentTable">										
											<thead> 
											<tr>					
												<th class=" centerValue"  width="10px"><input type="checkbox" name="sel"> </th>	
												<th class="lastColumn">Activities </th>	
											</tr>
											</thead> 
											<tbody>
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Activity Name One</td>	
											</tr>	
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Activity Name Two</td>												
											</tr>			
										
											</tbody>				
										</table>
									</div> <!-- End of content table wrapper -->
								</div>
								<div id="itemInfo-7">
									<div class="ContentTableWrapper">
										<table cellspacing="0" class="ContentTable">										
											<thead> 
											<tr>					
												<th class=" centerValue"  width="10px"><input type="checkbox" name="sel"> </th>	
												<th class="lastColumn">Activities </th>	
											</tr>
											</thead> 
											<tbody>
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Activity Name One</td>	
											</tr>	
											<tr>						
												<td class=" centerValue"><input type="checkbox" name="sel"></td>
												<td class="lastColumn">Activity Name Two</td>												
											</tr>			
										
											</tbody>				
										</table>
									</div> <!-- End of content table wrapper -->
								</div>
														
							</div> <!-- End of filter tabs -->
					
						</div> <!-- End of main tab 4 -->
					
												
					</div> <!-- End of form wrapper step 1 -->
					
					<div class="formWrapper" title="Select roles & apply">
						<h2 class="wizardTitle">Select roles to apply settings</h2>
						
						<div class="ContentTableWrapper">
							<table cellspacing="0" class="ContentTable">										
								<thead> 
								<tr>					
									<th class=" centerValue"  width="10px"><input type="checkbox" name="sel"> </th>	
									<th class="lastColumn">Roles </th>	
								</tr>
								</thead> 
								<tbody>
								<tr>						
									<td class=" centerValue"><input type="checkbox" name="sel"></td>
									<td class="lastColumn">Department Manager</td>	
								</tr>	
								<tr>						
									<td class=" centerValue"><input type="checkbox" name="sel"></td>
									<td class="lastColumn">Team Member</td>												
								</tr>	
								<tr>						
									<td class=" centerValue"><input type="checkbox" name="sel"></td>
									<td class="lastColumn">Office Support</td>	
								</tr>	
								<tr>						
									<td class=" centerValue"><input type="checkbox" name="sel"></td>
									<td class="lastColumn">Office Assistant</td>												
								</tr>									
							
								</tbody>				
							</table>
						</div> <!-- End of content table wrapper -->
						
												
					</div> <!-- End of form wrapper step 2 -->
					
					
					
				</form>	
			</div> <!-- End of pop up data -->
			
			
			<div class="popupActionsWrapper hideBlock">
				<span class="popupInfo">
					<label class="mandatory">mandatory</label>
				</span>			
				<span class="popupActions">
					<label class="actionBtn">Apply</label>
					<label class="secondaryActionBtn">Cancel</label>
				</span>
			</div> <!-- End of popup actions-->
			
		</div> <!-- End of popupContent -->
	</div> 
	
	
	
	

	
	
	
	
	

	
	
	
	
	
	
	

	<script>
	
	
					
		
		
		
		$(function() {
			
			// Edit functions popup
			
			$( "#dialog-editFunctions" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				width: 400
			});
			
			$("#dialog-editFunctions").parent().addClass("popupWrapper");
			
			$(".sectionTitle input").change(function() {					
				$(".innerSectionContent").addClass("hideBlock");	
				tempSelected = "#" + $(this).val() + "content";
				$(tempSelected).removeClass("hideBlock");	
			});
			
			$("#functions").tabs();
			$("#tabs").tabs({
				collapsible: true,
				active: false
			});
			$("#editTabs").tabs({
				collapsible: true,
				active: false
			}).addClass( "ui-helper-clearfix" );
			
			$( "#editTabs ul" ).addClass( "ui-tabs-role" );	
			$( "#editTabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );	
				
			$("#menuTabs").tabs({
				collapsible: true,
				active: false
			});	
			$( "#menuTabs ul" ).removeClass( "ui-tabs-role" );	
			
			
			$("label.linkBtn").click(function(){ 
				$("#dialog-editFunctions").dialog( "open" );											
			});	
			
			$(".popupActions label").click(function(){ 
				$("#dialog-editFunctions").dialog( "close" );											
			});	
			
			
			
		
		// Code to show and hide add Aisle			
			$("#addActionBtn").click(function(){ 
				$("#tableAddAction").toggleClass('hideBlock');										
			});	
			$("#addLTOBtn").click(function(){ 
				$("#tableLTOAction").toggleClass('hideBlock');										
			});	
			
			
			
			
			// For Replicate Settings
			
				$("#wizard").jWizard();
				
				$( "#dialog-replicate" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 200,
					maxHeight: 600,
					width: 550
				});
			
			$("#dialog-replicate").parent().addClass("popupWrapper");
			$(".jw-button-finish span").text("Apply");
		
			$("#replicate").click(function(){ 
				$("#dialog-replicate").dialog( "open" );										
			});	
		
			
					
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
		
			
		});
		
		
		
		
		// Code for Auto Complete with select box
		
		
		 (function( $ ) {
			$.widget( "custom.combobox", {
			_create: function() {
			this.wrapper = $( "<span>" )
			.addClass( "custom-combobox" )
			.insertAfter( this.element );
			this.element.hide();
			this._createAutocomplete();
			this._createShowAllButton();
			},
			_createAutocomplete: function() {
			var selected = this.element.children( ":selected" ),
			value = selected.val() ? selected.text() : "";
			this.input = $( "<input>" )
			.appendTo( this.wrapper )
			.val( value )
			.attr( "title", "")
			.attr("placeholder", "Type or select" )
			
			.addClass( "custom-combobox-input textbox defaultTextbox" )
			.autocomplete({
			delay: 0,
			minLength: 0,
			source: $.proxy( this, "_source" )
			})
			.tooltip({
			tooltipClass: "ui-state-highlight"
			});
			this._on( this.input, {
			autocompleteselect: function( event, ui ) {
			ui.item.option.selected = true;
			this._trigger( "select", event, {
			item: ui.item.option
			});
			},
			autocompletechange: "_removeIfInvalid"
			});
			},
			_createShowAllButton: function() {
			var input = this.input,
			wasOpen = false;
			$( "<a>" )
			.attr( "tabIndex", -1 )
			.attr( "title", "Show All Items" )
			
			.appendTo( this.wrapper )
			.button({
			icons: {
			primary: "ui-icon-triangle-1-s"
			},
			text: false
			})
			.removeClass( "ui-corner-all" )
			.addClass( "custom-combobox-toggle" )
			.mousedown(function() {
			wasOpen = input.autocomplete( "widget" ).is( ":visible" );
			})
			.click(function() {
			input.focus();
			// Close if already visible
			if ( wasOpen ) {
			return;
			}
			// Pass empty string as value to search for, displaying all results
			input.autocomplete( "search", "" );
			});
			},
			_source: function( request, response ) {
			var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
			response( this.element.children( "option" ).map(function() {
			var text = $( this ).text();
			if ( this.value && ( !request.term || matcher.test(text) ) )
			return {
			label: text,
			value: text,
			option: this
			};
			}) );
			},
			_removeIfInvalid: function( event, ui ) {
			// Selected an item, nothing to do
			if ( ui.item ) {
			return;
			}
			// Search for a match (case-insensitive)
			var value = this.input.val(),
			valueLowerCase = value.toLowerCase(),
			valid = false;
			this.element.children( "option" ).each(function() {
			if ( $( this ).text().toLowerCase() === valueLowerCase ) {
			this.selected = valid = true;
			return false;
			}
			});
			// Found a match, nothing to do
			if ( valid ) {
			return;
			}
			// Remove invalid value
			this.input
			.val( "" )
			.attr( "title", "Select from available display types" )
			.tooltip( "open" );
			this.element.val( "" );
			this._delay(function() {
			this.input.tooltip( "close" ).attr( "title", "" );
			}, 2500 );
			this.input.autocomplete( "instance" ).term = "";
			},
			_destroy: function() {
			this.wrapper.remove();
			this.element.show();
			}
			});
			})( jQuery );
			
			
			 $(function() {
				$( ".combobox" ).combobox();
				$('.select-all-menu').click(function(){
					if($(this).is(':checked'))
						$('.menu-checkbox').prop('checked',true);
					else
						$('.menu-checkbox').prop('checked',false);
				});
				$('.menu-checkbox').click(function(){
						$('.select-all-menu').prop('checked',false);
				});
				$('.all-store-checkbox').click(function(){
					if($(this).is(':checked')){
						$(this).parent().parent().find('.include-store label').removeClass('addRow').text('');
						$(this).parent().parent().find('.exclude-store label').addClass('addRow').text('Add');
					}
					else{
						$(this).parent().parent().find('.include-store label').addClass('addRow').text('Add');
						$(this).parent().parent().find('.exclude-store label').removeClass('addRow').text('');
					}
				});
				$('.ui-tabs-role').click(function(){
					$('.ui-menus-panel.ui-tabs-panel').width($('.ui-vertical-tabs').width()-$('.ui-tabs-role.ui-tabs-nav').width()-35);
					setTimeout(function(){
						if($('.ui-menus-panel.ui-tabs-panel ').is(':visible')){
							$('.pageActions').removeClass('hideBlock');
							}
						else
							{
							$('.pageActions').addClass('hideBlock');
							}
					},10);
				});
				$(window).resize(function(){
					$('.ui-menus-panel.ui-tabs-panel').width($('.ui-vertical-tabs').width()-$('.ui-tabs-role.ui-tabs-nav').width()-35);
				});
			});
	

		
		

		
	
	</script>	

</body>
</html>