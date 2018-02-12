
<script>
	function loadOrderOnReceiptJs(){
		
		$('head').append('<script src="../../scripts/orderOnReceipt.js?version=${properties.version}"><script>');
		
	}
</script>


			 <div class="tableActionsBtnsWrapper">
                              <div class="lookupActionWrapper">
                                 <!-- <label class="linkBtn" id="addOrderOnReceipt"><a><label class="hideRow" id="showHideAdd">Create Order on Receipt</label></a></label> -->
                                 <div class="parameter parameterRow parameterOptions clearfix">
									 <span class="parameterOptionsRadio">
										<input type="radio" class="${properties.LCreateOrderOnReceipt}" name="on_receipt_btn" value="on_rece_vendor" id="on_rece_vendor" checked="checked"><label for="on_rece_vendor" class="labelText ${properties.LCreateOrderOnReceipt}">Vendor</label> <input type="radio" class="${properties.OrderOnReceiptStore}" name="on_receipt_btn" value="on_rece_store" id="on_rece_store"><label for="on_rece_store" class="labelText ${properties.OrderOnReceiptStore}">Store</label>
									</span>
								</div>
                                 <div class="errorDiv hideBlock" id="oor_errorDiv">
                                    <label id="oor_errorTxt">Error text...</label>
                                    <label class="closeMessage" id="oor_closeMessage">&nbsp;</label>
                                 </div>
                              </div>
                              <!-- End of lookup action wrapper -->
                           </div>
                           <div class="tableActionsWrapper " id="tableCreateAction">
                              <form method="POST" action="" id="">
                                 <div class="formWrapper alignParameter">
                                    <div class="parameter parameterTitle clearfix">
                                       <label class="" style="width: 100%!important;"><strong>Search article to select a supplier or type directly supplier details</strong></label>							
                                    </div>
                                    <div class="parameter clearfix parameterSingle">
                                       <label for="searchBox" class="">Article</label>							
                                       <input type="#" id="oor_articlesearchBox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" class="textbox textboxDefaultText searchbox">
                                    </div>
                                    <div class="parameter parameterTitle clearfix">
                                       <label class=""><strong>Or</strong></label>							
                                    </div>
                                    <div class="parameter parameterSingle clearfix">
                                       <label for="searchBox1" class="">Supplier</label>							
                                       <input type="#" id="oor_supplierSearchBox" placeholder="Type supplier ID or name and press Enter" class="textbox textboxDefaultText searchbox">
                                       <input type="hidden" value="false" id="oor_vendorVerify"/>
                                    </div>
                                 </div>
                                 <!-- End of content table wrapper -->
                              </form>
                           </div>
                           <div class="tableActionsWrapper hideBlock" id="on_receipt_tab_store">
                                 <div class="formWrapper alignParameter">
                                    <div class="parameter parameterTitle clearfix">
                                       <label class="" style="width: 100%!important;"><strong>Search order to select a store or type directly store details</strong></label>							
                                    </div>
                                    <div class="parameter clearfix parameterSingle">
                                       <label for="on_receipt_order_no" class="">Order</label>							
                                       <input type="#" id="on_receipt_order_no" placeholder="Type order number and press Enter" class="textbox textboxDefaultText searchbox">
                                    </div>
                                    <div class="parameter parameterTitle clearfix">
                                       <label class=""><strong>Or</strong></label>							
                                    </div>
                                    <div class="parameter parameterSingle clearfix">
                                       <label for="on_receipt_store_no" class="">Store</label>							
                                       <input type="#" id="on_receipt_store_no" placeholder="Type store ID or name and press Enter" class="textbox textboxDefaultText searchbox">
                                    </div>
                                 </div>
                                 <!-- End of content table wrapper -->
                           </div>
                           <table cellspacing="0" class="ContentTable" id="oor_viewModeTable">
                              <tr>
                                 <td>
									<div class="tableInfo">
				
										<div class="tableTitle">
											<h4 class="sectionTitle" ><b id="oor_listOfArticle">List of Articles</b>
											<span>
													<input type="checkbox" id="checkboxChangeOm"><label for="checkboxActive">Change order multiple and input expiry date</label>
												</span>
											
											</h4>
										</div> <!-- End of table title -->
									</div> <!-- End of table info -->
								 
                                    <div class="tableActionsBtnsWrapper">
                                       <div class="lookupActionWrapper">
                                          <label id="oor_addActionBtn" class="linkBtn"><a ><label class="addRow">Add Article</label></a></label>
                                           	<div class="errorDiv hideBlock" id="oorsr_errorDiv">
                                    			<label id="oorsr_errorTxt">Error text...</label>
                                    			<label class="closeMessage" id="oor_closeMessage">&nbsp;</label>
                                		  	</div>
                                       </div>
                                      
                                       <!-- End of lookup action wrapper -->	
                                    </div>
                                    <div class="tableActionsWrapper" id="tableIBTActionsWrapper">
                                       <form method="POST" action="" class="articleForm3" id="articleForm3">
                                          <div class="formWrapper" id="oor_searchArea">
                                             <div class="parameter">
                                                <label class="" for="searchBox">Article</label>							
                                                <input type="#" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" id="oor_searchBox">
                                             </div>
                                             <div class="parameter">
                                                <label class="" for="qty">Received Qty.</label>
                                                <input type="#" tabindex="2" id="qty" class="textbox  numberBox">
                                             </div>
                                             <div class="formActions">
                                                <label class="actionBtn" id="searchAndAdd"><a >Search &amp; Add</a></label>
                                                <label class="secondaryActionBtn closeLink" id="oor_closeLink"><a >Close</a></label>						
                                             </div>
                                             <!-- End of form actions -->
                                          </div>
                                          <!-- End of content table wrapper -->
                                       </form>
                                    </div>
                                    <div id="oor_articleResultArea">
                                    <table cellspacing="0" class="ContentTable treetable drilldownTable tableSorter " id="oor_articleListTable">
                                    	<thead>
                                       <tr class="groupByTr2 ">
                                          <th class="noSort expander" width="20px">
                                             <span class="indenter">
                                             <a  title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>
                                             <a  title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>
                                             </span>
                                          </th>
                                          <th>Article #</th>
                                          <th>Description</th>
                                          <th class="centerValue">UOM</th>
                                          <th class="centerValue title" title="Stock on Hand">SOH</th>
                                          <th class="centerValue">Received  Qty.</th>
                                          <th class="centerValue title" title="Order Multiple">OM</th>
										  <th class="centerValue columnHide onCheckOnly hideBlock" width="70px">New OM</th>
											
                                          <th class="centerValue">Total Units Received </th>
										  <th class="centerValue columnHide onCheckOnly hideBlock" width="70px">Expiry Date</th>
                                          <th class="lastColumn centerValue noSort">Actions</th>
                                       </tr>
                                       </thead>
                                       <tbody class='tbody'>
                                       </tbody>
                                       <tfoot class="groupByTr2 ">
                                       <tr>
                                          <td colspan="15" class="">
                                             <div class="pageActions ">
                                                <label><strong>Total Received Qty.: <b id="oor_totalUnits"></b></strong></label>                               
                                                <label class="actionBtn" id="oor_createOrder"><a><label class="thumbUp">Submit Order</label></a></label>
                                                <label id="oor_cancelOrder" class="secondaryActionBtn closeLink"><a>Cancel</a></label>
                                             </div>
                                             <!-- End of page actions-->			
                                          </td>
                                          </tr>
                                       </tfoot>
                                       
                                     
                                    </table>
                       				</div>
								</td>
							</tr>
                        </table>

		
		<div id="dialog-receive" title="Finish Order on Receipt">
		<div class="popupContent ">
		
			
			
			<div class="popupData">
			
				<h4 class="alertText">Please provide following information</h4>
			
				
				
				
				
					<div class="formWrapper">
						
						<form id="orderOnReceiptDialogForm">
											
						<div class="tableTitle" style="padding:0px !important;">
							<h4><strong>Delivery Details</strong></h4>
						</div>
						
						<hr class="sectionDivider clearfix">
						<br />		
					
						<div class="parameter">
							<label for="invoice" class="mandatory">Invoice / Docket #</label> 
							<input type="#" class="textbox" id="invoice" maxlength="14">
						</div> <!-- End of parameter -->					
					
						<div class="parameter">  <!-- For Defect_6837 -->
							<label for="cf" >Consignment / Freight #</label>
							<input type="#" class="textbox number" id="cf" maxlength="10">
						</div> <!-- End of parameter -->
						
						<div class="parameter">
							<label for="dgms" >DGMS Department</label>
							<input type="#" class="textbox mediumbox" id="dgms" maxlength="10">
						</div> <!-- End of parameter -->	
						
						<div class="parameter">
							<label for="carr" >Carrier</label>
							<input type="#" class="textbox largebox" id="carr" maxlength="10">
						</div> <!-- End of parameter -->
							
						
						<div class="tableTitle temperatureHeader">
							<h4><strong>Temperature Details</strong></h4>
						</div>
						
						<hr class="sectionDivider clearfix temperatureHeader">
						<br />	
						
						<div class="parameter">
							<label for="temperature" class="mandatory">Chilled Temperature</label>
							<!-- <input type="#" class="textbox number" id="temperature1" maxlength="5"> -->
							<input type="#" class="textbox number" id="temperature1_OOR" maxlength="6">
						</div> <!-- End of parameter -->
						
						<div class="parameter">
							<label for="temperature" class="mandatory">Hard Frozen Temperature</label>
							<!-- <input type="#" class="textbox number" id="temperature2" maxlength="5"> -->
							<input type="#" class="textbox number" id="temperature2_OOR"  maxlength="6">
						</div> <!-- End of parameter -->
						
						<div class="warningMessage hideBlock" id="finWarning">
							<h4>Warning message should be added in case input temperature is less or greater than the range......</h4>
						</div>
						
					
						
						<div class="errorDiv parameter hideBlock" id="finError">
							<label>Error text</label>
						</div>
							</form>					
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