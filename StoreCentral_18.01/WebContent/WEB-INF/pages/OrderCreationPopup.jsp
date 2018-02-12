<div
	class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
	tabindex="-1" role="dialog" aria-describedby="dialog-mulipleArticles"
	aria-labelledby="ui-id-1" style="display: none;">
	<div
		class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
		<span id="ui-id-1" class="ui-dialog-title">Select Articles</span>
		<button
			class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
			role="button" aria-disabled="false" title="close">
			<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
				class="ui-button-text">close</span>
		</button>
	</div>
	<div id="dialog-mulipleArticles"
		class="ui-dialog-content ui-widget-content">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning">
					Total <strong id="searchArticleCount">3</strong> articles found for
					search criteria.
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
</div>

<div
	class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
	tabindex="-1" role="dialog" aria-describedby="dialog-mulipleArticles"
	aria-labelledby="ui-id-1" style="display: none;">
	<div
		class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
		<span id="ui-id-1" class="ui-dialog-title">Select Articles</span>
		<button
			class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
			role="button" aria-disabled="false" title="close">
			<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
				class="ui-button-text">close</span>
		</button>
	</div>
	<div id="dialog-mulipleArticles_oorm"
		class="ui-dialog-content ui-widget-content">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning">
					Total <strong id="searchArticleCount_oor">3</strong> articles found for
					search criteria.
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
					<label class="actionBtn" id="addtolist_oorm">Add to List</label>
				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>
</div>

<div
	class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
	tabindex="-1" role="dialog" aria-describedby="dialog-mulipleArticles"
	aria-labelledby="ui-id-1" style="display: none;">
	<div
		class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
		<span id="ui-id-1" class="ui-dialog-title">Select Articles</span>
		<button
			class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
			role="button" aria-disabled="false" title="close">
			<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
				class="ui-button-text">close</span>
		</button>
	</div>
	<div id="dialog-mulipleArticles_oor"
		class="ui-dialog-content ui-widget-content">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning">
					Total <strong id="searchArticleCount_oor">3</strong> articles found for
					search criteria.
				</h4>

			</div>
			<!-- End of pop up data -->


			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<thead id="articleSearchTbody">
						<tr>
							<th>Article</th>
							<th>Description</th>
							<th class="centerValue">Supplier</th>
							<th width="40px" class="centerValue lastColumn">Action</th>
						</tr>
					</thead>
					<tbody id="popupContent_oor">
					</tbody>
				</table>
			</div>
			<!-- End of content table wrapper -->

		</div>
		<!-- End of popupContent -->
	</div>
</div>

<div id="dialog-supplier-modal" title="Verify Supplier">
	<div class="popupContent">
		<!-- <div class="popupSearchWrapper" id="popupSearchVendor">
			<h3>Supplier Name:</h3>
			<input placeholder="Enter supplier name"
				class="textbox textboxDefaultText" id="vendorDesc"> <label
				class="actionBtn" id="goButtonSample1">Go</label>
		</div>-->
		<!-- End of popup search wrapper -->

		<div class="popupData" id="popupVendorDataDiv"></div>
		<!-- End of pop up data -->
		<div class="popupActions hideBlock">
			<label class="actionBtn">Select & Close</label> <label
				class="actionBtn">Cancel</label>
		</div>
	</div>
</div>

<div id="dialog-modal-his" title="Sales History">
	<div class="popupContent">


		<div class="popupData">

			<h4>
				Showing sales history for Article #<label class="articleNoAndName"></label>
			</h4>

			<div class="tableTitle">
				<h4>
					Values displayed in: <strong class="unitOrCarton"></strong> |
					Carton Qty. (OM): <strong class="cartonQty"></strong>
				</h4>
			</div>


			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<thead>
						<tr>
							<th>&nbsp;</th>
							<th>Monday</th>
							<th>Tuesday</th>
							<th>Wednesday</th>
							<th>Thursday</th>
							<th>Friday</th>
							<th>Saturday</th>
							<th>Sunday</th>
							<th class="lastColumn">Total</th>
						</tr>
					</thead>
					<tbody id="salesHistContent"></tbody>


				</table>
			</div>
			<!-- End of content table wrapper -->

		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn closeBtn">OK</label>
			</span>
		</div>



	</div>
	<!-- End of popupContent -->
</div>



<div
	class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
	tabindex="-1" role="dialog" aria-describedby="dialog-confirmation"
	aria-labelledby="ui-id-2" style="display: none;">
	<div
		class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
		<span id="ui-id-2" class="ui-dialog-title">Confirmation</span>
		<button
			class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
			role="button" aria-disabled="false" title="close">
			<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
				class="ui-button-text">close</span>
		</button>
	</div>
	<div id="dialog-confirmation"
		class="ui-dialog-content ui-widget-content">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning" id="message">
					Please note that In-store Promotions will be available in
					Promotions Planning screens after <strong>approximately 2
						hours</strong>, once it is successfully created.
				</h4>

			</div>
			<!-- End of pop up data -->


			<div class="popupActionsWrapper">
				<span class="popupActions" id="ok"> <label class="actionBtn">Ok
				</label>

				</span><span class="popupActions" id="cancel"> <label
					class="secondaryActionBtn">Cancel </label>

				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>
</div>
<!-- <div
	class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable popupWrapper"
	tabindex="-1" role="dialog" aria-describedby="dialog-allo"
	aria-labelledby="ui-id-4"
	style="height: auto; width: 920px; top: 439.5px; left: 213px; display: block; z-index: 101;">
	<div
		class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix ui-draggable-handle">
		<span id="ui-id-4" class="ui-dialog-title">Allocations for this
			Article</span>
		<button type="button"
			class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
			role="button" title="Close">
			<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
				class="ui-button-text">Close</span>
		</button>
	</div>-->
	<div id="dialog-allo" class="ui-dialog-content ui-widget-content"
		style="width: auto; min-height: 93px; max-height: none; height: auto;">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning" id="totalCountAllocation">
					
				</h4>

			</div>
			<!-- End of pop up data -->


			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tbody id="allocationTablePopUp">
						


					</tbody>
				</table>
			</div>
			<!-- End of content table wrapper -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"><a
						>OK</a></label>



				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>

<!-- <div
	class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable popupWrapper"
	tabindex="-1" role="dialog" aria-describedby="dialog-modal-promo"
	aria-labelledby="ui-id-9"
	style="height: auto; width: 800px; top: 322px; left: 273px; display: block; z-index: 101;">
	<div
		class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix ui-draggable-handle">
		<span id="ui-id-9" class="ui-dialog-title">Promotions for this
			Article</span>
		<button type="button"
			class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
			role="button" title="Close">
			<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
				class="ui-button-text">Close</span>
		</button>
	</div>-->
	<div id="dialog-modal-promo" class="ui-dialog-content ui-widget-content"
		style="width: auto; min-height: 143px; max-height: 543px; height: auto;">
		<div class="popupContent ">
			<div class="popupData contentWrapper ">
				<div id="mainTabs-7"
					class="tabContent ui-tabs ui-widget ui-widget-content ui-corner-all">
					<div id="promo" class="filterTabs">
						<ul
							class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
							role="tablist">
							<li id="curActTab"
								class="ui-state-default ui-corner-top ui-tabs-active ui-state-active"
								role="tab" tabindex="0" aria-controls="promo-1"
								aria-labelledby="ui-id-10" aria-selected="true"
								aria-expanded="true"><a href="#promo-1"
								class="ui-tabs-anchor" role="presentation" tabindex="-1"
								id="ui-id-10">Currently Active</a></li>
							<li id="futActTab" class="ui-state-default ui-corner-top" role="tab"
								tabindex="-1" aria-controls="promo-2" aria-labelledby="ui-id-11"
								aria-selected="false" aria-expanded="false"><a
								href="#promo-2" class="ui-tabs-anchor" role="presentation"
								tabindex="-1" id="ui-id-11">Future</a></li>
						</ul>
						<div id="promo-1" aria-labelledby="ui-id-10"
							class="ui-tabs-panel ui-widget-content ui-corner-bottom"
							role="tabpanel" aria-hidden="false">
							<div class="ContentTableWrapper">
								<table class="ContentTable" cellspacing="0">
									
										<tbody id="curPromContent">
										
									</tbody>
								</table>
							</div>
							<!-- End of content table wrapper -->
						</div>
						<div id="promo-2" aria-labelledby="ui-id-11"
							class="ui-tabs-panel ui-widget-content ui-corner-bottom"
							role="tabpanel" aria-hidden="true" style="display: none;">
							<div class="ContentTableWrapper">
								<table class="ContentTable" cellspacing="0">
								
										<tbody id="futurePromTable">
										
									</tbody>
								</table>
							</div>
							<!-- End of content table wrapper -->
						</div>
					</div>
					<!-- End of filter tabs -->
				</div>
			</div>
			<!-- End of pop up data -->
			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">OK</label>
				</span>
			</div>
		</div>
		<!-- End of popupContent -->
	</div>

<div class="pageErrorsWrapper hideBlock" id="warningWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">WARNING</h4>
				<a class="close" title="Close">Close</a>

			</div>
			<!-- End of quick help title -->
			<div class="content">

				<ol id="warningList">

				</ol>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>
	
	<div id="dialog-alt-pricing" class="ui-dialog-content ui-widget-content"
		style="width: auto; min-height: 93px; max-height: none; height: auto;">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning" id="">
					
				</h4>

			</div>
			<!-- End of pop up data -->


			<div class="ContentTableWrapper">
			
				<div class="tableTitle">
									<h4 class="sectionTitle" id="prcUnitRadioInPop"></h4>	
								</div>
				<div class="otherPriceInfoInPop">
							
						</div>
						
				
			</div>
			<!-- End of content table wrapper -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"><a
						>OK</a></label>



				</span>
			</div>
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>
	
	<div id="dialog-openOrders" class="ui-dialog-content ui-widget-content" style="width: auto; min-height: 93px; max-height: none; height: auto;">
         <div class="popupContent ">
            <div class="popupData contentWrapper ">
               <div id="openOrders">
                  <div class="ContentTableWrapper">
                     <div class="tableInfo ">
                        <div class="tableTitle topTitle">
                           <h4>List of Orders</h4>
                        </div>
                        <!-- End of table title -->					
                     </div>
                     <!-- End of table info -->
                     <table cellspacing="0" class=" ContentTable " id="stockOnOrderPopUp">
                        <thead id="stockOnOrderPopUpHead">
                           <tr>
                              <th class="">Order #</th>
                              <th class="centerValue">Order Qty.</th>
                              <th class="centerValue">Delivery Date</th>
                              <th class="">Supplier</th>
                              <th class="">Source</th>
                              <th class="lastColumn centerValue">Status</th>
                           </tr>
                        </thead>
                        <tbody>
                           
                        </tbody>
                     </table>
                  </div>
                  <!-- End of Content Table Wrapper -->
               </div>
               <!-- end of tabs -->
            </div>
            <!-- End of pop up data -->
            <div class="popupActionsWrapper">
               <span class="popupActions">
               <label class="actionBtn">OK</label>				
               </span>
            </div>
         </div>
         <!-- End of popupContent -->
      </div>
      <div class="pageErrorsWrapper hideBlock" id="errorWrapper">
		<div class="pageErrorsContent">
			<div class="pageErrorsTitle">
				<h4 class="title">Errors</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">Order Enquiry.</p>
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
	
	<div id="dialog-sessionRCV" title="Receiving">
			<div class="popupContent">
			
				<div class="popupData popupTitle">
				
					<h4 class="warning warningName">There are few articles in this order are <strong>captured as received</strong> in the system.</h4> 
					<h4 class="warning">Resume previous session or start a new session to receive articles. </h4>
					
					
					
					
					<!-- There are few articles in this order are <strong>received by <span class='recei'>James Smith</strong> in previous session. --> 
					
					
					
					
				</div> <!-- End of pop up data -->				
				<div class="popupActionsWrapper">
					<span class="popupActions">
						
						<label class="actionBtn" id="resumeSessRCV"><a >Resume Receiving</a></label>
						<label class="secondaryActionBtn" id="cancelSessRCV"><a >Cancel Receiving</a></label>
						
						
						
						
					</span>
				</div> <!-- End of popup actions-->
		
				
			</div> <!-- End of popupContent -->
		</div> 
		
		<div id="dialog-receive" title="Finish Order on Receipt">
		<div class="popupContent ">
		
			
			
			<div class="popupData">
			
				<h4 class="alertText">Please provide following information</h4>
			
				
				
				
				
					<div class="formWrapper">
						
						
											
						<div class="tableTitle">
							<h4><strong>Delivery Details</strong></h4>
						</div>
						
						<hr class="sectionDivider clearfix">
						<br />		
					
						<div class="parameter">
							<label for="invoice" class="mandatory">Invoice / Docket #</label>
							<input type="#" class="textbox" id="invoice" maxlength="10">
						</div> <!-- End of parameter -->					
					
						<div class="parameter">
							<label for="cf" class="mandatory">Consignment / Freight #</label>
							<input type="#" class="textbox number" id="cf" maxlength="10">
						</div> <!-- End of parameter -->
						
						<div class="parameter">
							<label for="dgms" class="mandatory">DGMS Department</label>
							<input type="#" class="textbox mediumbox" id="dgms" maxlength="10">
						</div> <!-- End of parameter -->	
						
						
						
						<div class="parameter">
							<label for="carr" class="mandatory">Carrier</label>
							<input type="#" class="textbox largebox" id="carr" maxlength="10">
						</div> <!-- End of parameter -->
							
						
						<div class="tableTitle">
							<h4><strong>Temperature Details</strong></h4>
						</div>
						
						<hr class="sectionDivider clearfix">
						<br />	
						
						<div class="parameter">
							<label for="temperature" class="mandatory">Chilled Temperature</label>
							<input type="#" class="textbox number" id="temperature1" maxlength="5">
						</div> <!-- End of parameter -->
						
						<div class="parameter">
							<label for="temperature" class="mandatory">Hard Frozen Temperature</label>
							<input type="#" class="textbox number" id="temperature2" maxlength="5">
						</div> <!-- End of parameter -->
						
						<div class="warningMessage hideBlock" id="finWarning">
							<h4>Warning message should be added in case input temperature is less or greater than the range......</h4>
						</div>
						
					
						
						<div class="errorDiv parameter hideBlock" id="finError">
							<label>Error text</label>
						</div>
												
					</div> <!-- End of content table wrapper -->
					
					
					<div class="popupActionsWrapper ">
								
						<span class="popupActions">
							<label class="actionBtn" id="proceedFin"><a ><label class="thumbUp">Finish</label></a></label>
							<label class="secondaryActionBtn" id="cancelFin"><a >Cancel</a></label>
						</span>
					</div> <!-- End of popup actions-->
					
				
				
			</div> <!-- End of pop up data -->
			
			
			
			
		</div> <!-- End of popupContent -->
	</div> <!-- End of popup -->
		
		