<div class="contentWrapper openOrderDetail hideBlock">
		
			<div class="articleHead">
				
				<div class="articleHeaderWrapper">
					<h2 class="articleTitle orderNumber">Order #1234567 </h2>					
				</div>
				<div class="articleActionBtns">
					<label class="orderStatus">Status: <strong class="orderSatatus">Open</strong></label>
					<label class="actionBtn" id="cancelOrderBtn"><a href="#"><label class="deactivate" >Cancel Order</label></a></label>
					<label class="actionBtn" id="editOrderBtn"><a href="#"><label class="editBtn" >Edit</label></a></label>							
				</div>
				
				<div class="articleInfoWrapper">				
					<p class="secondaryInfo">
						<label class="articlePriceLabel">Supplier: <strong class="supplier">Warehouse</strong></label>
						<label class="articlePriceLabel">|</label>
						<label class="articlePriceLabel">Delivery Date: <strong class="deliveryDate">dd/mm/yyyy</strong></label>
						<label class="articlePriceLabel">|</label>
						<label class="articlePriceLabel">Cut-off Date before Authorisation: <strong class="cutOffDate">dd/mm/yyyy</strong></label>						
						
					</p>
				</div>
			
			
			</div> <!-- End of article head -->
			
			
			<div class="articleContent orderDetails">
				
								
				<div class="articleContentInner">
				
					<div class="articleDetails">
				
						
						<table cellspacing="0" class="ContentTable" width="100%">
							
							<tbody><tr>
								<td class="keyInfo" width="20%">	
									Total Articles:
								</td>
								<td class="valueInfo" width="15%">
									<span class="totalArticles">0</span>
								</td>
								<td class="keyInfo noDivider" width="15%">	
									
								</td>
								<td class="valueInfo noDivider" width="20%">
									
								</td>
								<td class="keyInfo noDivider" width="15%">	
									
								</td>
								<td class="valueInfo lastColumn">
									
								</td>
							</tr>							
							
							<tr class="lastRow">
								<td class="keyInfo">	
									Total Cartons Ordered:
								</td>
								<td class="valueInfo totalCartons">
									##
								</td>
								<td class="keyInfo noDivider">	
									
								</td>
								<td class="valueInfo noDivider">
									
								</td>
								<td class="keyInfo noDivider">	
									
								</td>
								<td class="valueInfo lastColumn">
									
								</td>
							</tr>	
						
						</tbody></table>
						
					
					</div>  <!-- End of article details -->											
				
					
					
					
				</div> <!-- End of article content inner -->
				
				
		
			
			</div> <!-- End of article content -->
			
			<div class="ContentTableWrapper hideBlock" id="viewMode">
			
				<div class="tableInfo orderDetailsInfoHeader ">
				
					<div class="tableTitle">
						<h4 class="sectionTitle">List of Articles (<span class="totalArticles">0</span>)</h4>
					</div> <!-- End of table title -->
					
				</div> <!-- End of table info -->
				
				
				<div class="tableActionsBtnsWrapper">
                    <div class="lookupActionWrapper">
                       
						
						
						
						<!--<label class="linkBtn" id="groupByOpen">
							<a href="#"><label class="group">Group By</label></a>								
						</label>
						
						<label class="linkBtn hideBlock" id="groupByClear">
							<a href="#"><label class="negativeFlag">Clear Group By</label></a>								
						</label>			-->	
                       
                    </div> <!-- End of lookup action wrapper -->
				 
				 </div> <!-- End of table actions btn wrapper -->
					
					<div class="tableActionsWrapper hideBlock" id="tableGroupAction">
						
						
						<form method="POST" action="" id="groupByForm" class="">
							<div class="formWrapper">
							
								<div class="parameter">
									<label for="" class="">Group By</label>							
									
									<input type="radio" id="deptName" value="deptName" name="groupByOptions"><label class="labelText" for="deptName">Department</label> 
									<input type="radio" id="del" value="deptName" name="groupByOptions"><label class="labelText" for="del">Delivery Date</label> 
									<input type="radio" id="supp" value="deptName" name="groupByOptions"><label class="labelText" for="supp">Supplier</label> 
									<input type="radio" checked="" id="none" value="none" name="groupByOptions"><label class="labelText" for="none">None</label>
								</div> <!-- End of parameter -->							
								
								
							
								
								
								<div class="formActions">
									<label class="actionBtn" id="applyGroupBy"><a href="#">Apply</a></label>
									<label class="secondaryActionBtn closeLink" id="closeLink"><a href="#">Close</a></label>						
								</div> <!-- End of form actions -->
														
							</div> <!-- End of content table wrapper -->
						</form>	
						
						
					</div> <!-- End of table Actions Wrapper -->
				
				 
				
				
				<table cellspacing="0" class="ContentTable treetable drilldownTable tableSorter" id="viewModeTable1">
					<tbody><tr>
						<th class="noSort expander" width="20px">
							<span class="indenter">
								<a href="#" title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>
								<a href="#" title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>
							</span>
						</th>
						<th>Article #</th>
						<th>Description</th>
						<th class="centerValue title" title="Unit of Measure">UOM</th>
						<th class="centerValue title" title="Stock on Hand">SOH</th>
						<th class="centerValue">Order Qty.</th>
						<th class="centerValue title" title="Order Multiple">OM</th>
						<th class="centerValue">Total Units Ordered</th>
						<th class="lastColumn centerValue">Delivery Date</th>
					</tr>
					
					<tr data-tt-id="1" class="collapsed">
						<td class="expander"><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span>&nbsp;</td>
						<td>2001</td>
						<td>Article Description One</td>						
						<td class="centerValue ">EA</td>
						<td class="centerValue ">20</td>				
						<td class="centerValue ">5</td>
						<td class="centerValue ">8 EA</td>
						<td class="centerValue "><strong>40 EA</strong></td>					
						<td class="centerValue lastColumn">dd/mm/yyyy</td>	
							
					</tr>

					<tr data-tt-id="2" data-tt-parent-id="1" style="display: none;">
						<td colspan="10"><span class="indenter"></span>
							<table cellspacing="0" class="ContentTable" width="100%">
								
								<tbody><tr>
									<td class="keyInfo">
										Supplier:
									</td>
									<td class="valueInfo lastColumn" colspan="5">
										Tip Top Bakeries (71816001)
									</td>
								</tr>
								
								<tr>
									<td width="20%" class="keyInfo">	
										Stock on Order:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										<label class="linkBtn"><a href="#">30</a></label>
									</td>
									<td width="20%" class="keyInfo">	
										Standard Price:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										1.25
									</td>
									<td width="20%" class="keyInfo noDivider">	
										
									</td>
									<td width="13%" class="valueInfo lastColumn">
										
									</td>	
								</tr>
								<tr>
									<td class="keyInfo">	
										Stock in Transit:
									</td>
									<td class="valueInfo columnDivider">
										##
									</td>
									<td class="keyInfo noDivider">	

									</td>
									<td class="valueInfo columnDivider noDivider">
									
									</td>
									<td class="keyInfo noDivider">	
										
									</td>
									<td class="valueInfo lastColumn">
										
									</td>	
								</tr>
								
								<tr class="lastRow">
									<td colspan="6" class="lastColumn">
										  <label class="history">Sales History</label><label class="history">Alternate Pricing</label>
                                                   <label class="notpadLink">Check Allocations</label><label class="notpadLink promotionsLink">Check Promotions</label>
									</td>									
								</tr>
							</tbody></table>
						</td>
					</tr>
					
					<tr data-tt-id="3" class="collapsed">
						<td class="expander"><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span>&nbsp;</td>
						<td>2002</td>
						<td>Article Description Two</td>						
						<td class="centerValue ">EA</td>
						<td class="centerValue ">20</td>				
						<td class="centerValue ">5</td>
						<td class="centerValue ">8 EA</td>
						<td class="centerValue "><strong>40 EA</strong></td>					
						<td class="centerValue lastColumn">dd/mm/yyyy</td>	
							
					</tr>

					<tr data-tt-id="4" data-tt-parent-id="3" style="display: none;" class="collapsed">
						<td colspan="10"><span class="indenter" style="padding-left: 19px;"></span>
							<table cellspacing="0" class="ContentTable" width="100%">
								
								<tbody><tr>
									<td class="keyInfo">
										Supplier:
									</td>
									<td class="valueInfo lastColumn" colspan="5">
										Tip Top Bakeries (71816001)
									</td>
								</tr>
								
								<tr>
									<td width="20%" class="keyInfo">	
										Stock on Order:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										<label class="linkBtn"><a href="#">30</a></label>
									</td>
									<td width="20%" class="keyInfo">	
										Standard Price:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										1.25
									</td>
									<td width="20%" class="keyInfo noDivider">	
										
									</td>
									<td width="13%" class="valueInfo lastColumn">
										
									</td>	
								</tr>
								<tr>
									<td class="keyInfo">	
										Stock in Transit:
									</td>
									<td class="valueInfo columnDivider">
										##
									</td>
									<td class="keyInfo noDivider">	
										
									</td>
									<td class="valueInfo columnDivider noDivider">
										
									</td>
									<td class="keyInfo noDivider">	
										
									</td>
									<td class="valueInfo lastColumn">
										
									</td>	
								</tr>
								
								<tr class="lastRow">
									<td colspan="6" class="lastColumn">
										  <label class="history">Sales History</label><label class="history">Alternate Pricing</label>
                                                   <label class="notpadLink">Check Allocations</label><label class="notpadLink promotionsLink">Check Promotions</label>
									</td>									
								</tr>
							</tbody></table>
						</td>
					</tr>
					
				</tbody></table>								
			
				
				<table cellspacing="0" class="ContentTable treetable drilldownTable tableSorter hideBlock" id="viewModeTable2">
					<tbody><tr>
						<th class="noSort expander" width="20px">
							<span class="indenter">
								<a href="#" title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>
								<a href="#" title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>
							</span>
						</th>
						<th>Article #</th>
						<th>Description</th>
						<th class="centerValue title" title="Unit of Measure">UOM</th>
						<th class="centerValue title" title="Stock on Hand">SOH</th>
						<th class="centerValue">Order Qty.</th>
						<th class="centerValue title" title="Order Multiple">OM</th>
						<th class="centerValue">Total Units Ordered</th>
						<th class="lastColumn centerValue">Delivery Date</th>
					</tr>
					
					<tr>
						<td colspan="15" class="rowSection rowHighlight">
							Delivery Date: 15/01/2015				
						</td>						
					</tr>
					
					<tr data-tt-id="1" class="collapsed">
						<td class="expander"><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span>&nbsp;</td>
						<td>2001</td>
						<td>Article Description One</td>						
						<td class="centerValue ">EA</td>
						<td class="centerValue ">20</td>				
						<td class="centerValue ">5</td>
						<td class="centerValue ">8 EA</td>
						<td class="centerValue "><strong>40 EA</strong></td>					
						<td class="centerValue lastColumn">dd/mm/yyyy</td>	
							
					</tr>

					<tr data-tt-id="2" data-tt-parent-id="1" style="display: none;">
						<td colspan="10"><span class="indenter"></span>
							<table cellspacing="0" class="ContentTable" width="100%">
								
								<tbody><tr>
									<td class="keyInfo">
										Supplier:
									</td>
									<td class="valueInfo lastColumn" colspan="5">
										Tip Top Bakeries (71816001)
									</td>
								</tr>
								
								<tr>
									<td width="20%" class="keyInfo">	
										Stock on Order:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										<label class="linkBtn"><a href="#">30</a></label>
									</td>
									<td width="20%" class="keyInfo">	
										Standard Price:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										1.25
									</td>
									<td width="20%" class="keyInfo noDivider">	
										
									</td>
									<td width="13%" class="valueInfo lastColumn">
										
									</td>	
								</tr>
								<tr>
									<td class="keyInfo">	
										Stock in Transit:
									</td>
									<td class="valueInfo columnDivider">
										##
									</td>
									<td class="keyInfo noDivider">	
									
									</td>
									<td class="valueInfo columnDivider noDivider">
										
									</td>
									<td class="keyInfo noDivider">	
										
									</td>
									<td class="valueInfo lastColumn">
										
									</td>	
								</tr>
								
								<tr class="lastRow">
									<td colspan="6" class="lastColumn">
										  <label class="history">Sales History</label><label class="history">Alternate Pricing</label>
                                                   <label class="notpadLink">Check Allocations</label><label class="notpadLink promotionsLink">Check Promotions</label>
									</td>									
								</tr>
							</tbody></table>
						</td>
					</tr>
					
					<tr data-tt-id="3" class="collapsed">
						<td class="expander"><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span>&nbsp;</td>
						<td>2002</td>
						<td>Article Description Two</td>						
						<td class="centerValue ">EA</td>
						<td class="centerValue ">20</td>				
						<td class="centerValue ">5</td>
						<td class="centerValue ">8 EA</td>
						<td class="centerValue "><strong>40 EA</strong></td>					
						<td class="centerValue lastColumn">dd/mm/yyyy</td>	
							
					</tr>

					<tr data-tt-id="4" data-tt-parent-id="3" style="display: none;">
						<td colspan="10"><span class="indenter"></span>
							<table cellspacing="0" class="ContentTable" width="100%">
								
								<tbody><tr>
									<td class="keyInfo">
										Supplier:
									</td>
									<td class="valueInfo lastColumn" colspan="5">
										Tip Top Bakeries (71816001)
									</td>
								</tr>
								
								<tr>
									<td width="20%" class="keyInfo">	
										Stock on Order:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										<label class="linkBtn"><a href="#">30</a></label>
									</td>
									<td width="20%" class="keyInfo">	
										Standard Price:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										1.25
									</td>
									<td width="20%" class="keyInfo noDivider">	
										
									</td>
									<td width="13%" class="valueInfo lastColumn">
										
									</td>	
								</tr>
								<tr>
									<td class="keyInfo">	
										Stock in Transit:
									</td>
									<td class="valueInfo columnDivider">
										##
									</td>
									<td class="keyInfo noDivider">	
										
									</td>
									<td class="valueInfo columnDivider noDivider">
										
									</td>
									<td class="keyInfo noDivider">	
										
									</td>
									<td class="valueInfo lastColumn">
										
									</td>	
								</tr>
								
								<tr class="lastRow">
									<td colspan="6" class="lastColumn">
										  <label class="history">Sales History</label><label class="history">Alternate Pricing</label>
                                                   <label class="notpadLink">Check Allocations</label><label class="notpadLink promotionsLink">Check Promotions</label>
									</td>									
								</tr>
							</tbody></table>
						</td>
					</tr>
					
				</tbody></table>								
			
			
			</div> <!-- End of ContentTableWrapper -->
			
			
			<div class="ContentTableWrapper" id="editMode">
			
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4 class="sectionTitle">List of Articles (<span class="totalArticles">0</span>)</h4>
					</div> <!-- End of table title -->				
				</div> <!-- End of table info -->
				
				
				<div class="tableActionsBtnsWrapper onEditOnly hideBlock" id="articleSearchHeader">
							<div class="lookupActionWrapper">
								<label class="linkBtn addActionBtn" id="md_addActionBtn"> <a
									><label class="addRow">Add Article</label></a>
								</label> 
								<!-- <label class="linkBtn" id="md_filterOpen"> <label
									class="filter">Filters</label>
								</label> <label class="linkBtn hideBlock" id="md_filterClear"> <label
									class="negativeFlag">Clear Filters</label>
								</label>  -->
								<!-- <label class="linkBtn groupByOpen" id="md_groupByOpen"> <a
									><label class="group">Group By</label> </a>
								</label> <label class="linkBtn groupByClear hideBlock"
									id="md_groupByClear"> <a ><label
										class="negativeFlag">Clear Group By</label></a>
								</label> -->

								<div class="errorDiv draftErrorDivOpen hideBlock" id="draftErrorDivGrp">
									<label id="draftErrorMsgGrp">No article found for '<strong>3234</strong>'.
										Please try a different number.
									</label> <label class="closeMessage" onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
								</div>

							</div>
							<!-- End of lookup action wrapper -->


						</div>
						<!-- End of table actions btn wrapper -->

						<div class="tableActionsWrapper onEditOnly hideBlock" id="articleSearchDivForCreate" >

							<form method="POST" action="" class="articleForm" data-map="obj"
								id="articleSearchFormForCreate">
								<div class="formWrapper">

									<div class="parameter">
										<label class="" for="searchBox">Article</label> <input data-item="iv_article" name="iv_article"
											type="#" class="textbox textboxDefaultText searchbox"
											placeholder="Type number, description, or EAN / TUN / PLU and press Enter"
											id="searchBox">
										<input type="hidden" data-item="iv_site" name="iv_site" />
										<input type="hidden" data-item="iv_ranged" name="iv_ranged" value="Y"/>
									</div>


									<div class="parameter">
										<label class="" for="qty">Order Qty.</label> <input type="#" data-item="orderQty" name="oredrQty"
											tabindex="2" id="qty" class="textbox  numberBox">

									</div>

									<div class="parameter">
										<label class="" for="delDate">Delivery Date</label> <input data-item="deliveryDate" name="deliveryDate"
											type="#" class="textbox textboxDefaultText inputDate"
											placeholder="dd/mm/yyyy" id="delDate">
									</div>

									
									<div class="parameter">
										<label for="sourceOfSupply" class="">Source of Supply</label>
										<input type="radio" name="iv_src_supply" value="" id="all1"
											checked tabindex="3" linkItem="allField1"><label for="all"
											class="labelText">All</label> <input type="radio"
											name="iv_src_supply" value="warehouse" id="warehouse1" linkItem="warehouseField1"
											tabindex="4"><label for="warehouse" class="labelText">Warehouse</label>
										<input type="radio" name="iv_src_supply" value="vendor" linkItem="vendorField1"
											id="vendor1" tabindex="5"><label for="vendor"
											class="labelText">Direct Vendor</label>


										<div class="parameter supplierSource">
											<span id="allField1" class="options"> <label>Both
													warehouse and direct vendor</label>
											</span> <span id="vendorField1" class="hideBlock"> <input
												type="#" class="textbox mediumbox" name="wareHouse" id="vendorText"
												placeholder="Type number or name "> <label
												class="linkBtn" id="verifySupplier1"><label
													class="advancedSearch">Verify <input type="hidden" id="isVerified" value="false" /></label></label>
													
											</span> <span id="warehouseField1" class="hideBlock"> <select
												class="selectOptions supplyDrop" name="directVendor" id="mo_wareHouseDropDown" >
													<option value="0">Select Warehouse</option>
													<option>2013 - Chester Hill</option>
													<option>2045</option>
													<option>2023</option>
													<option>2001</option>
													<option>2003</option>
													<option>2011</option>
											</select>
											</span>
										</div>
										<!-- End of parameter -->

									</div>
									<!-- End of parameter -->



									<div class="formActions">
										<label class="actionBtn" id="searchAndAdd"><a >Search
												& Add</a></label> <label class="secondaryActionBtn closeLink"
											id="closeLink"><a>Close</a></label>
									</div>
									<!-- End of form actions -->

								</div>
								<!-- End of content table wrapper -->
							</form>

							<form method="POST" action="" id="mo_groupByForm"
								class="groupByForm">
								<div class="formWrapper">

									<div class="parameter">
										<label for="" class="">Group By</label> <input type="radio" class="userOption" checked
											id="user" value="user" name="groupByOptions"><label
											class="labelText userOption" for="userName">User</label>
											<input type="radio"
											id="deptName" value="department" name="groupByOptions"><label
											class="labelText" for="deptName">Department</label> <input
											type="radio" id="del" value="deliveryDate"
											name="groupByOptions"><label class="labelText"
											for="del">Delivery Date</label> <input type="radio" id="supp"
											value="supplier" name="groupByOptions"><label
											class="labelText" for="supp">Supplier</label>

									</div>
									<!-- End of parameter -->





									<!--	<div class="formActions">
									<label class="actionBtn" id="applyGroupBy1"><a >Apply</a></label>
									<label class="secondaryActionBtn closeLink" id="closeLink"><a >Close</a></label>						
								</div> <!-- End of form actions -->

								</div>
								<!-- End of content table wrapper -->
							</form>

						</div> <!-- End of table Actions Wrapper -->
				
				<div id="ordersList">
				
				<table cellspacing="0" class="ContentTable treetable drilldownTable tableSorter" id="editModeTable">
					<tbody><tr>
						<th class="noSort expander" width="20px">
							<span class="indenter">
								<a href="#" title="Expand All" class="expandAll" id="expandAll">&nbsp;</a>
								<a href="#" title="Collapse All" class="collapseAll hideBlock" id="collapseAll">&nbsp;</a>
							</span>
						</th>
						<th>Article #</th>
						<th>Description</th>
						<th class="centerValue title" title="Unit of Measure">UOM</th>
						<th class="centerValue title" title="Stock on Hand">SOH</th>
						<th class="centerValue">Order Qty.</th>
						<th class="centerValue title" title="Order Multiple">OM</th>
						<th class="centerValue">Total Units Ordered</th>
						<th class="centerValue">Delivery Date</th>
						<th class="lastColumn centerValue noSort">Actions</th>
					</tr>
					<tr data-tt-id="11" class="collapsed">
						<td class="expander"><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span>&nbsp;</td>
						<td>2001</td>
						<td>Article Description One</td>						
						<td class="centerValue ">EA</td>
						<td class="centerValue ">20</td>				
						<td class="centerValue ">
							<input type="#" value="5" class="editNumCell textbox textboxDefaultText">
						</td>
						<td class="centerValue ">8 EA</td>
						<td class="centerValue "><strong>40 EA</strong></td>					
						<td class="centerValue">
							<input type="#" class="textbox textboxDefaultText inputDate editDateCell hasDatepicker" placeholder="dd/mm/yyyy" id="dp1430997391944">
						</td>
						<td class="lastColumn centerValue">
							<label class="linkBtn">
								<a href="#"><label class="deleteRecord">&nbsp;</label></a>
							</label>
						</td>
							
					</tr>

					<tr data-tt-id="12" data-tt-parent-id="11" style="display: none;">
						<td colspan="10"><span class="indenter"></span>
							<table cellspacing="0" class="ContentTable" width="100%">
								
								<tbody><tr>
									<td class="keyInfo">
										Supplier:
									</td>
									<td class="valueInfo lastColumn" colspan="5">
										Tip Top Bakeries (71816001)
									</td>
								</tr>
								
								<tr>
									<td width="20%" class="keyInfo">	
										Stock on Order:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										<label class="linkBtn"><a href="#">30</a></label>
									</td>
									<td width="20%" class="keyInfo">	
										Standard Price:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										1.25
									</td>
									<td width="20%" class="keyInfo noDivider">	
										
									</td>
									<td width="13%" class="valueInfo lastColumn">
										
									</td>	
								</tr>
								<tr>
									<td class="keyInfo">	
										Stock in Transit:
									</td>
									<td class="valueInfo columnDivider">
									</td>
									<td class="keyInfo noDivider">											
									</td>
									<td class="valueInfo columnDivider noDivider">								
									</td>
									<td class="keyInfo noDivider">										
									</td>
									<td class="valueInfo lastColumn">										
									</td>	
								</tr>
								
								<tr class="lastRow">
									<td colspan="6" class="lastColumn">
										  <label class="history">Sales History</label><label class="history">Alternate Pricing</label>
                                                   <label class="notpadLink">Check Allocations</label><label class="notpadLink promotionsLink">Check Promotions</label>
									</td>									
								</tr>
							</tbody></table>
						</td>
					</tr>
					
					<tr data-tt-id="13" class="collapsed">
						<td class="expander"><span class="indenter" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span>&nbsp;</td>
						<td>2002</td>
						<td>Article Description Two</td>						
						<td class="centerValue ">EA</td>
						<td class="centerValue ">20</td>				
						<td class="centerValue ">
							<input type="#" value="5" class="editNumCell textbox textboxDefaultText">
						</td>
						<td class="centerValue ">8 EA</td>
						<td class="centerValue "><strong>40 EA</strong></td>					
						<td class="centerValue">
							<input type="#" class="textbox textboxDefaultText inputDate editDateCell hasDatepicker" placeholder="dd/mm/yyyy" id="dp1430997391945">
						</td>
						<td class="lastColumn centerValue">
							<label class="linkBtn">
								<a href="#"><label class="deleteRecord">&nbsp;</label></a>
							</label>
						</td>	
							
					</tr>

					<tr data-tt-id="14" data-tt-parent-id="13" style="display: none;">
						<td colspan="10"><span class="indenter"></span>
							<table cellspacing="0" class="ContentTable" width="100%">
								
								<tbody><tr>
									<td class="keyInfo">
										Supplier:
									</td>
									<td class="valueInfo lastColumn" colspan="5">
										Tip Top Bakeries (71816001)
									</td>
								</tr>
								
								<tr>
									<td width="20%" class="keyInfo">	
										Stock on Order:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										<label class="linkBtn"><a href="#">30</a></label>
									</td>
									<td width="20%" class="keyInfo">	
										Standard Price:
									</td>
									<td width="13%" class="valueInfo columnDivider">
										1.25
									</td>
									<td width="20%" class="keyInfo noDivider">	
										
									</td>
									<td width="13%" class="valueInfo lastColumn">
										
									</td>	
								</tr>
								<tr>
									<td class="keyInfo">	
										Stock in Transit:
									</td>
									<td class="valueInfo columnDivider">
										##
									</td>
									<td class="keyInfo noDivider">	
									
									</td>
									<td class="valueInfo columnDivider noDivider">
									
									</td>
									<td class="keyInfo noDivider">	
										
									</td>
									<td class="valueInfo lastColumn">
										
									</td>	
								</tr>
								
								<tr class="lastRow">
									<td colspan="6" class="lastColumn">
										  <label class="history">Sales History</label><label class="history">Alternate Pricing</label>
                                                   <label class="notpadLink">Check Allocations</label><label class="notpadLink promotionsLink">Check Promotions</label>
									</td>									
								</tr>
							</tbody></table>
						</td>
					</tr>
					
				</tbody></table>								
			
				
				</div>
				
				<div class="pageActions onEditOnly hideBlock">
					<label class="actionBtn" id="saveOpenOrders"><a href="#"><label class="">Done</label></a></label>
					<label class="secondaryActionBtn" id="cancelOpenOrders"><a href="#">Cancel</a></label>
				</div> <!-- End of page actions-->
			
				
			</div> <!-- End of ContentTableWrapper -->
			
			
			
			
		</div>