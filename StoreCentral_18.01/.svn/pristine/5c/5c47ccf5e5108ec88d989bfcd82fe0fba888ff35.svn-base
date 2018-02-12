<!DOCTYPE html>
<html>
<head>
<title>In-store Display Promotion - v4</title>

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

<link href="style/bigW.css?version=${properties.version}" rel="stylesheet" type="text/css" />



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
									<li><a href="#">User Profile</a></li>
									<li><a href="#">Account Settings</a></li>
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
					<li class="text-color"><a href="#">Lookup</a>
						<ul class="innermenu">
							<li class="reportBtmBrdr"><a href="#" class="text-color">Articles</a>
							</li>
						</ul></li>
					<li class="text-color"><a href="#">Orders</a></li>
					<li class="text-color lastMenuItem"><a href="#">Reports</a></li>
					<li class="text-color"><a href="#">Stock Management</a></li>
					<li class="text-color selectedMenu"><a href="#">Pricing</a>
						<ul class="innermenu">
							<li class="reportBtmBrdr"><a href="#" class="text-color">Promotions
									Management</a></li>
							<li class="reportBtmBrdr"><a href="#" class="text-color">In-store
									Promotion</a>
								<ul class="innermenu">
									<li class="reportBtmBrdr"><a
										href="Promotion_Display_BigW_v4.html" class="text-color">Display</a>
									</li>
								</ul></li>
							<li class="reportBtmBrdr"><a href="#" class="text-color">Audit
									Trail</a></li>
							<li class="reportBtmBrdr"><a href="#" class="text-color">Promotion
									Article Review</a></li>
						</ul></li>
					<li class="text-color"><a href="#">Ticketing</a></li>
					<li class="text-color"><a href="#">Admin</a></li>


				</ul>

			</div>


			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='#'>Home</a></li>
						<li>Pricing</li>
						<li class="currentPage">In-store Promotion</li>

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




		<div class="contentWrapper orderDetails">

			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle">
						<h4 class="sectionTitle">In-store Display Promotion</h4>
					</div>
					<!-- End of table title -->

					<div class="instructionalText ">
						<label>This list will be available only for the current
							session so don't forget to click 'Create Promotion'. </label>
					</div>

				</div>
				<!-- End of table info -->


				<div class="tableActionsBtnsWrapper">
					<div class="lookupActionWrapper">
						<label class="linkBtn" id="addActionBtn"><label
							class="addRow">Add Article</label></label> <label class="linkBtn"
							id="filterOpen"> <label class="filter">Apply
								Filters</label>
						</label> <label class="linkBtn hideBlock" id="filterClear"> <label
							class="negativeFlag">Clear Filters</label>
						</label>


						<div class="errorDiv hideBlock">
							<label>No article found for '<strong>3234</strong>'.
								Please try a different number.
							</label> <label class="closeMessage">&nbsp;</label>
						</div>

					</div>
					<!-- End of lookup action wrapper -->


				</div>
				<!-- End of table actions btn wrapper -->

				<div class="tableActionsWrapper" id="tableAddAction">

					<form method="POST" action="" id="">
						<div class="formWrapper">

							<div class="parameter">
								<label for="article" class="mandatory">Article</label> <input
									type="#" class="textbox articleSearchText" id="article"
									defaultVal="Search article by" tabindex="1">
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
								<label for="store" class="">Start Date</label> <input type="#"
									class="textbox defaultTextbox inputDate" id="start"
									placeHolder="dd/mm/yyyy">
							</div>
							<!-- End of parameter -->

							<div class="parameter">
								<label for="store" class="">End Date</label> <input type="#"
									class="textbox defaultTextbox inputDate" id="end"
									placeHolder="dd/mm/yyyy">
							</div>
							<!-- End of parameter -->


							<div class="parameter">
								<label for="display" class="">Advertising Display</label> <select
									class="selectOptions">
									<option>Select</option>
									<option>Option</option>
									<option>Option</option>
								</select>
							</div>
							<!-- End of parameter -->

							<div class="formActions">
								<label class="actionBtn" id="searchAndAdd">Search & Add</label>
								<label class="secondaryActionBtn" id="closeLink">Close</label>
							</div>
							<!-- End of form actions -->

						</div>
						<!-- End of content table wrapper -->
					</form>

				</div>
				<!-- End of table Actions Wrapper -->



				<table cellspacing="0" class="ContentTable treetable drilldownTable"
					id="beforeCreate">
					<tr>
						<th rowspan="2" width="20px">&nbsp;</th>
						<th rowspan="2">Article #</th>
						<th rowspan="2" class="">Description</th>
						<th rowspan="2" class="centerValue columnDivider" width="120px">UOM</th>
						<th class="centerValue columnDivider" colspan="2">Date</th>
						<th class="centerValue columnDivider">Advertising</th>
						<th class="centerValue columnDivider" rowspan="2" width="120px">Status</th>
						<th class="lastColumn centerValue" width="30px" rowspan="2">Actions</th>
					</tr>


					<tr class="subHeader">

						<th class="centerValue" width="90px">Start Date</th>
						<th class="centerValue columnDivider" width="90px">End Date</th>
						<th class="centerValue columnDivider" width="120px">Display</th>
					</tr>


					<tr class="filterRow hideBlock drillsOpenDefault">
						<td>&nbsp;</td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td class="columnDivider"><input type="#" class="textbox"></td>

						<td><input type="#" class="textbox inputDate"
							placeHolder="dd/mm/yyyy"></td>
						<td class="columnDivider"><input type="#"
							class="textbox inputDate " placeHolder="dd/mm/yyyy"></td>
						<td class="columnDivider centerValue"><input type="#"
							class="textbox"> <select class="selectOptions hideBlock">
								<option>Option</option>
								<option>Option</option>
								<option>Option</option>
						</select></td>
						<td class="columnDivider centerValue"><input type="#"
							class="textbox"> <select class="selectOptions hideBlock">
								<option>Draft</option>
								<option>Failed</option>
								<option>Created</option>
						</select></td>
						<td>&nbsp;</td>
					</tr>

					<tr id="row-1" data-tt-id="1" class="drillsOpenDefault">
						<td>&nbsp;</td>
						<td>043081</td>
						<td class="">Kids T-shirt 1</td>

						<td id="UOM-1" class="centerValue columnDivider">MPK</td>
						<td id="UOMEdit-1" class="centerValue columnDivider hideBlock">
							<select class="selectOptions editSelectCell">
								<option>Select</option>
								<option>EA</option>
								<option>MPK</option>
						</select>
						</td>


						<td id="startDate-1" class="centerValue ">###</td>
						<td id="startDateEdit-1" class="centerValue hideBlock"><input
							type="#"
							class="textbox textboxDefaultText inputDate editDateCell"
							placeHolder="dd/mm/yyyy"></td>
						<td id="endDate-1" class="centerValue  columnDivider">###</td>
						<td id="endDateEdit-1" class="centerValue columnDivider hideBlock">
							<input type="#"
							class="textbox textboxDefaultText inputDate editDateCell"
							placeHolder="dd/mm/yyyy">
						</td>

						<td id="advDisplay-1" class="centerValue columnDivider">###</td>
						<td id="advDisplayEdit-1"
							class="centerValue columnDivider hideBlock"><select
							class="selectOptions editSelectCell">
								<option>Select</option>
								<option>Option</option>
								<option>Option</option>
						</select></td>

						<td class="centerValue columnDivider">Draft</td>


						<td class="lastColumn rightAlign"><label
							class="linkBtn editRowBtn " id="editRecord-1"> <label
								class="editRecord">Edit</label>
						</label> <label class="linkBtn saveRowBtn hideBlock" id="saveRecord-1">
								<label class="saveRecord">Save</label>
						</label> <label class="linkBtn" id="DeleteRecord-1"> <label
								class="deleteRecord">Delete</label>
						</label></td>
					</tr>

					<tr data-tt-id="2" data-tt-parent-id="1">
						<td colspan="9">
							<table cellspacing="0" class="ContentTable" width="100%">

								<tr>
									<td class="keyInfo" width="10%">Supplier:</td>
									<td class="valueInfo lastColumn" colspan="5">##</td>
								</tr>


							</table>
						</td>
					</tr>


					<tr id="row-2" data-tt-id="3" class="drillsOpenDefault">
						<td>&nbsp;</td>
						<td>043083</td>
						<td class="">Kids T-shirt 3</td>

						<td class="centerValue columnDivider">MPK</td>



						<td id="startDate-2" class="centerValue ">###</td>
						<td id="startDateEdit-2" class="centerValue hideBlock"><input
							type="#"
							class="textbox textboxDefaultText inputDate editDateCell"
							placeHolder="dd/mm/yyyy"></td>
						<td id="endDate-2" class="centerValue  columnDivider">###</td>
						<td id="endDateEdit-2" class="centerValue columnDivider hideBlock">
							<input type="#"
							class="textbox textboxDefaultText inputDate editDateCell"
							placeHolder="dd/mm/yyyy">
						</td>

						<td id="advDisplay-2" class="centerValue columnDivider">###</td>
						<td id="advDisplayEdit-2"
							class="centerValue columnDivider hideBlock"><select
							class="selectOptions editSelectCell">
								<option>Select</option>
								<option>Option</option>
								<option>Option</option>
						</select></td>

						<td class="centerValue columnDivider">Draft</td>


						<td class="lastColumn rightAlign"><label
							class="linkBtn editRowBtn " id="editRecord-2"> <label
								class="editRecord">Edit</label>
						</label> <label class="linkBtn saveRowBtn hideBlock" id="saveRecord-2">
								<label class="saveRecord">Save</label>
						</label> <label class="linkBtn" id="DeleteRecord-2"> <label
								class="deleteRecord">Delete</label>
						</label></td>
					</tr>

					<tr data-tt-id="4" data-tt-parent-id="3">
						<td colspan="9">
							<table cellspacing="0" class="ContentTable" width="100%">

								<tr>
									<td class="keyInfo" width="10%">Supplier:</td>
									<td class="valueInfo lastColumn" colspan="5">##</td>
								</tr>


							</table>
						</td>
					</tr>


				</table>


				<table cellspacing="0"
					class="ContentTable treetable drilldownTable hideBlock"
					id="afterCreate">
					<tr>
						<th rowspan="2" width="20px">&nbsp;</th>
						<th rowspan="2">Article #</th>
						<th rowspan="2" class="">Description</th>
						<th rowspan="2" class="centerValue columnDivider" width="120px">UOM</th>
						<th class="centerValue columnDivider" colspan="2">Date</th>
						<th class="centerValue columnDivider">Advertising</th>
						<th class="centerValue columnDivider" rowspan="2" width="120px">Status</th>
						<th class="lastColumn centerValue" width="30px" rowspan="2">Actions</th>
					</tr>


					<tr class="subHeader">

						<th class="centerValue" width="90px">Start Date</th>
						<th class="centerValue columnDivider" width="90px">End Date</th>
						<th class="centerValue columnDivider" width="120px">Display</th>
					</tr>


					<tr class="filterRow hideBlock drillsOpenDefault">
						<td>&nbsp;</td>
						<td><input type="#" class="textbox"></td>
						<td><input type="#" class="textbox"></td>
						<td class="columnDivider"><input type="#" class="textbox"></td>

						<td><input type="#" class="textbox inputDate"
							placeHolder="dd/mm/yyyy"></td>
						<td class="columnDivider"><input type="#"
							class="textbox inputDate " placeHolder="dd/mm/yyyy"></td>
						<td class="columnDivider centerValue"><input type="#"
							class="textbox"> <select class="selectOptions hideBlock">
								<option>Option</option>
								<option>Option</option>
								<option>Option</option>
						</select></td>
						<td class="columnDivider centerValue"><input type="#"
							class="textbox"> <select class="selectOptions hideBlock">
								<option>Draft</option>
								<option>Failed</option>
								<option>Created</option>
						</select></td>
						<td>&nbsp;</td>
					</tr>

					<tr id="row-1" data-tt-id="1" class="drillsOpenDefault">
						<td>&nbsp;</td>
						<td>043081</td>
						<td class="">Kids T-shirt 1</td>

						<td id="UOM-1" class="centerValue columnDivider">MPK</td>
						<td id="UOMEdit-1" class="centerValue columnDivider hideBlock">
							<select class="selectOptions editSelectCell">
								<option>Select</option>
								<option>EA</option>
								<option>MPK</option>
						</select>
						</td>


						<td id="startDate-1" class="centerValue ">###</td>
						<td id="startDateEdit-1" class="centerValue hideBlock"><input
							type="#"
							class="textbox textboxDefaultText inputDate editDateCell"
							placeHolder="dd/mm/yyyy"></td>
						<td id="endDate-1" class="centerValue  columnDivider">###</td>
						<td id="endDateEdit-1" class="centerValue columnDivider hideBlock">
							<input type="#"
							class="textbox textboxDefaultText inputDate editDateCell"
							placeHolder="dd/mm/yyyy">
						</td>

						<td id="advDisplay-1" class="centerValue columnDivider">###</td>
						<td id="advDisplayEdit-1"
							class="centerValue columnDivider hideBlock"><select
							class="selectOptions editSelectCell">
								<option>Select</option>
								<option>Option</option>
								<option>Option</option>
						</select></td>

						<td class="centerValue columnDivider"><label class="failed">Failed</label>
						</td>


						<td class="lastColumn rightAlign"><label
							class="linkBtn editRowBtn " id="editRecord-1"> <label
								class="editRecord">Edit</label>
						</label> <label class="linkBtn saveRowBtn hideBlock" id="saveRecord-1">
								<label class="saveRecord">Save</label>
						</label> <label class="linkBtn" id="DeleteRecord-1"> <label
								class="deleteRecord">Delete</label>
						</label></td>
					</tr>

					<tr data-tt-id="2" data-tt-parent-id="1">
						<td colspan="9">
							<table cellspacing="0" class="ContentTable" width="100%">

								<tr>
									<td class="keyInfo" width="10%">Supplier:</td>
									<td class="valueInfo lastColumn" colspan="5">##</td>
								</tr>


							</table>
						</td>
					</tr>



				</table>



			</div>
			<!-- End of content table wrapper -->

			<div class="pageActions" id="beforePublish">
				<label class="actionBtn" id="createButton"><label
					class="thumbUp">Create Promotion</label></label>

			</div>
			<!-- End of page actions-->




		</div>
		<!-- End of content wrapper -->

	</div>

	<div class="footerWrapper">
		<div class="footer">
			<div class="copyrightsInfo">Copyright &copy Woolworths 2013</div>
			<div class="policyInfo">
				<a href="#">Privacy Policy</a> <label class="divider">|</label> <a
					href="#">Terms of Use</a>
			</div>
		</div>

	</div>








	<!-- multiple articles pop up-->
	<div id="dialog-mulipleArticles" title="Select Articles">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning">
					Total <strong>3</strong> articles found for '<strong>T-shirt</strong>'
				</h4>

			</div>
			<!-- End of pop up data -->


			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
						<th>Article #</th>
						<th>Description</th>
						<th class="centerValue">UOM</th>
						<th width="40px" class="centerValue lastColumn">Select</th>
					</tr>
					<tr>
						<td>043081</td>
						<td>Kids T-shirt 1</td>
						<td class="centerValue">EA</td>
						<td class="sorted centerValue lastColumn"><input
							type="checkbox"></td>
					</tr>
					<tr>
						<td>043081</td>
						<td>Kids T-shirt 1</td>
						<td class="centerValue">MPK</td>
						<td class="sorted centerValue lastColumn"><input
							type="checkbox"></td>
					</tr>
					<tr class="lastRow">
						<td>043083</td>
						<td>Kids T-shirt 3</td>
						<td class="centerValue">EA</td>
						<td class="sorted centerValue lastColumn"><input
							type="checkbox"></td>
					</tr>

				</table>
			</div>
			<!-- End of content table wrapper -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="secondaryActionBtn">Cancel</label>
					<label class="actionBtn">Add to List</label>



				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>




	<!-- multiple articles pop up-->
	<div id="dialog-create" title="For Your Information">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning">
					Please note that In-store Promotions will be available in
					Promotions Planning screens after <strong>approximately 2
						hours</strong>, once it is successfully created.
				</h4>

			</div>
			<!-- End of pop up data -->


			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Ok
				</label>

				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>









	<script>
		$(function() {
		
			
			
			// code for setting default parameters for popups
			$( "#dialog-mulipleArticles" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 800,
				width: 450
			});
			
			
			$( "#dialog-create" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 800,
				width: 480
			});
			
			
			
			// (Temp - Dev team need to change it) Code to show multiple articles popup
			
			$("#searchAndAdd").click(function() {		
				$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
				$("#dialog-mulipleArticles" ).dialog("open");
			});
			
			
			// (Temp - Dev team need to change it) Code to show a message once Create is clicked
			
			$("#createButton").click(function() {		
				$("#dialog-create").parent().addClass("popupWrapper");
				$("#dialog-create" ).dialog("open");
			});
			
			
			
			
			$(".popupActions .actionBtn, .popupActions .secondaryActionBtn").click(function() {					
				$("#dialog-mulipleArticles").dialog("close");
				$("#dialog-create").dialog("close");				
			});
		
			
		
			$("#addActionBtn").click(function(){ 
				$("#tableAddAction").toggleClass('hideBlock');
			});
			$("#closeLink").click(function(){ 
				$("#tableAddAction").addClass('hideBlock');
			});
			
			
			
			
			$("#dialog-create").click(function() {					
				$("#beforeCreate").addClass('hideBlock');	
				$("#afterCreate").removeClass('hideBlock');				
			});
		
			
			
			
			$('.textbox').focus(function(){
				if ( $(this).val() == $(this).attr('defaultVal') ){
				  $(this).val('');
				  $(this).removeClass("textboxDefaultText"); 				 
				}
			});
			
			$('.textbox').blur(function(){
				if ( $(this).val() == '' ){
				  $(this).val($(this).attr('defaultVal'));
				  $(this).addClass("textboxDefaultText"); 
				}
			});
			
			Date.format = 'dd/mm/yy';
			$(".inputDateInput").datepicker({
				zIndex:50
			});
			
			$(".inputDate").datepicker({
				zIndex:50
			});
			
			/*when edit button is clicked displays input box in editable cells*/
			$(".editRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				
				$(("#row-").concat(id)).addClass('rowHighlight');
				
				$(("#UOMEdit-").concat(id)).removeClass('hideBlock');
				$(("#UOM-").concat(id)).addClass('hideBlock');
				
				$(("#deliveryDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#deliveryDate-").concat(id)).addClass('hideBlock');
				
				$(("#startDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#startDate-").concat(id)).addClass('hideBlock');
				
				$(("#endDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#endDate-").concat(id)).addClass('hideBlock');
				
				$(("#demandEdit-").concat(id)).removeClass('hideBlock');
				$(("#demand-").concat(id)).addClass('hideBlock');
				
				$(("#displayEdit-").concat(id)).removeClass('hideBlock');
				$(("#display-").concat(id)).addClass('hideBlock');
				
				$(("#buildEdit-").concat(id)).removeClass('hideBlock');
				$(("#build-").concat(id)).addClass('hideBlock');
				
				$(("#advDisplayEdit-").concat(id)).removeClass('hideBlock');
				$(("#advDisplay-").concat(id)).addClass('hideBlock');
				
				$(("#notesEdit-").concat(id)).removeClass('hideBlock');
				$(("#notes-").concat(id)).addClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).removeClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
			});
			
			/*when save button is clicked displays input box is disabled*/
			$(".saveRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				
				$(("#row-").concat(id)).removeClass('rowHighlight');
				
				$(("#UOMEdit-").concat(id)).addClass('hideBlock');
				$(("#UOM-").concat(id)).removeClass('hideBlock');
				
				$(("#deliveryDateEdit-").concat(id)).addClass('hideBlock');
				$(("#deliveryDate-").concat(id)).removeClass('hideBlock');
				
				$(("#startDateEdit-").concat(id)).addClass('hideBlock');
				$(("#startDate-").concat(id)).removeClass('hideBlock');
				
				$(("#endDateEdit-").concat(id)).addClass('hideBlock');
				$(("#endDate-").concat(id)).removeClass('hideBlock');
				
				$(("#demandEdit-").concat(id)).addClass('hideBlock');
				$(("#demand-").concat(id)).removeClass('hideBlock');
				
				$(("#displayEdit-").concat(id)).addClass('hideBlock');
				$(("#display-").concat(id)).removeClass('hideBlock');
				
				$(("#buildEdit-").concat(id)).addClass('hideBlock');
				$(("#build-").concat(id)).removeClass('hideBlock');
				
				$(("#advDisplayEdit-").concat(id)).addClass('hideBlock');
				$(("#advDisplay-").concat(id)).removeClass('hideBlock');
				
				$(("#notesEdit-").concat(id)).addClass('hideBlock');
				$(("#notes-").concat(id)).removeClass('hideBlock');				
				
				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).removeClass('hideBlock');
			});
			
			
			// Code to show and hide filter
			
			$('#filterOpen').click(function() {		
				$("#filterClear").removeClass('hideBlock');	
				$(".filterRow").removeClass('hideBlock');	
				$(this).addClass('hideBlock');	
			});
			
			$('#filterClear').click(function() {		
				$("#filterOpen").removeClass('hideBlock');
				$(".filterRow").addClass('hideBlock');	
				$(this).addClass('hideBlock');				
			});
			
			
			$(".tooltip").tooltip({ 
				position: { 
					my: "left center", 
					at: "right+10 center" 
				} 
			});
			
			
			
			
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
			
			
			
			$("#beforeCreate, #afterCreate").treetable({
				expandable: true
			});
			
			
			
			
			
			
		
			
			
		});
	</script>

</body>


</html>