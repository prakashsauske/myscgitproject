<div class="contentWrapper wizardPage updateRecvdQty hideBlock">	
			<input type="hidden" id="asnNo" value="" />	
			<div class="ContentTableWrapper">
			
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4 class="sectionTitle">Update Received Qty.</h4>
					</div> <!-- End of table title -->
				
				</div> <!-- End of table info -->
			
			</div> <!-- End of Content Table wrapper -->
			
			<div class="articleHead">
				
				<div class="articleHeaderWrapper">
					<h2 class="articleTitle recvOrderNumber">Order #1234567 </h2>					
				</div>
				<div class="articleActionBtns">
					<label class="orderStatus">Status: <strong>Received</strong></label>
					 <label class="actionBtn urqSaveBtn" id=""><a href="#"><label class="thumbUp">Save</label></a></label>
					 <label id="cancelbtn" class="secondaryActionBtn urqCancelBtn"><a href="#">Cancel</a></label>
				</div>
				
				<div class="articleInfoWrapper">				
					<p class="secondaryInfo">
						<label class="articlePriceLabel recvSupplier">Supplier: <strong>Warehouse name (1234)</strong></label>					
					</p>
				</div>
			
			
			</div> <!-- End of article head -->
			
			<div class="articleDtlDiv ContentTableWrapper">
				
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4 class="sectionTitle articleHdr">List of Articles already Received (2)</h4>
					</div> <!-- End of table title -->
					
				</div>

				<div id="searchBoxArea" class="lineByLine">					
					<div class="tableActionsBtnsWrapper">
						<div class="lookupActionWrapper">
							<label class="linkBtn" id="addActionBtn"><label class="addRow">Add Missing Article</label></label>
							
							&nbsp;
							<span style="float:right">
								<input type="checkbox" id="changeOM"><label for="checkboxActive">Change order multiple and input expiry date</label>
							</span>
						   
						</div> <!-- End of lookup action wrapper -->
												
					
					 </div> <!-- End of table actions btn wrapper -->
					
					 
					<div class="tableActionsWrapper" id="tableAddAction">
	
						<form method="POST" action="" class="articleForm" id="articleForm">
							<div class="formWrapper">
							
								<div class="parameter">
									<label class="" for="searchBox">Article</label>							
									<input type="#" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" id="searchBox">
								</div>							
								
								
								<div class="parameter">
									<label class="" for="qty">Received Qty.</label>
									<input type="#" tabindex="2" id="qty" class="textbox  numberBox">
									
								</div>
																
								<div class="formActions">
									<label class="actionBtn" id="searchAndAdd"><a href="#">Search & Add</a></label>
									<label class="secondaryActionBtn closeLink" id="closeLink"><a href="#">Close</a></label>						
								</div> <!-- End of form actions -->
														
							</div> <!-- End of content table wrapper -->
						</form>	
						
					</div> <!-- End of table Actions Wrapper -->
				</div>
			
				<table cellspacing="0" class="ContentTable" id="editArticleTable">
				<thead> 
				<tr>
					<th rowspan="2">Article # </th>
					<th rowspan="2">Vendor Ref #</th>
					<th rowspan="2">Description</th>	
					<th class="centerValue columnDivider"  rowspan="2">OM</th>
					<th class="centerValue columnDivider" colspan="2">Ordered </th>	
					<th class="centerValue columnDivider" colspan="2">Dispatched </th>	
					<th class="centerValue columnDivider" colspan="2">Received</th>
					<th class="centerValue columnHide" width="70px" rowspan="2">New OM</th>
					<th class="centerValue columnHide" width="70px" rowspan="2">Expiry Date</th>
					
				</tr>
				<tr class="subHeader">
											
					<th class="centerValue">Qty.</th>						
					<th class="centerValue columnDivider">Total Units</th>
					<th class="centerValue">Qty.</th>						
					<th class="centerValue columnDivider">Total Units</th>
					<th class="centerValue">Qty.</th>						
					<th class="centerValue columnDivider">Total Units</th>
				</tr>
				
				</thead>
				
				<tbody>
					<tr id="rr-1" class="">
						<td>2001</td>
						<td>2222</td>
						<td>Article Description One</td>
						<td class="centerValue columnDivider">5 CAR</td>
						<td class="centerValue ">8 EA</td>
						<td class="centerValue columnDivider"><strong>40 EA</strong></td>
						<td class="centerValue ">4 CAR</td>
						<td class="centerValue columnDivider"><strong>32 EA</strong></td>	
						
						<td  class="centerValue">
							<input type="#" class="editNumCell textbox textboxDefaultText" value="##">
						</td>
						<td  class="centerValue columnDivider">### </td>					
						
						<td id="" class="centerValue  columnHide hideBlock">
							<input type="#" value="##" class="editNumCell textbox textboxDefaultText">
						</td>
						<td id="" class="centerValue  columnHide hideBlock">
							<input type="#" placeholder="dd/mm/yyyy" class="textbox textboxDefaultText inputDate editDateCell hasDatepicker">
						</td>
					
					
						
					</tr>					
					<tr class="lastRow" id="rr-2">
						<td>2001</td>
						<td>2222</td>
						<td>Article Description One</td>
						<td class="centerValue columnDivider">5 CAR</td>
						<td class="centerValue ">8 EA</td>
						<td class="centerValue columnDivider"><strong>40 EA</strong></td>
						<td class="centerValue ">4 CAR</td>
						<td class="centerValue columnDivider"><strong>32 EA</strong></td>	
						<td  class="centerValue ">
							<input type="#" class="editNumCell textbox textboxDefaultText" value="##">
						</td>
											
						<td  class="centerValue columnDivider">###</td>
						
						<td id="" class="centerValue  columnHide hideBlock">
							<input type="#" value="##" class="editNumCell textbox textboxDefaultText">
						</td>
						<td id="" class="centerValue  columnHide hideBlock">
							<input type="#" placeholder="dd/mm/yyyy" class="textbox textboxDefaultText inputDate editDateCell hasDatepicker">
						</td>
						
					</tr>
				</tbody>									
			</table>	
				
				<div class="pageActions" id="urqb">     				
					<label class="actionBtn urqSaveBtn"><a href="#"><label class="thumbUp">Save</label></a></label>											
					<label class="secondaryActionBtn urqCancelBtn"><a href="#">Cancel</a></label>
				</div>

			</div> <!-- End of content table wrapper -->
		
		
		
		
		</div> <!-- End of content wrapper -->