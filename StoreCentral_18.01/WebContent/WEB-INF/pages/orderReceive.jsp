<script>
	function loadReceiveOrderJs(){
		removejscssfile("orderReceive.js?version=${properties.version}", "js");
		$('head').append('<script src="../../scripts/orderReceive.js?version=${properties.version}"><script>');
	}
</script>


<!-- ganesh 02062015 -->
<div class="receiveOuterDiv  wizardPage  orderReceive" id="orderReceiveStep">
			<div class="wizardContent ">
					
					<div class="jw-widget ui-widget-content ui-helper-clearfix"><div class=""><ol class="jw-menu ui-menu ui-widget ui-widget-content" id="ui-id-6" tabindex="0">
                        <li class="ui-menu-item ui-state-highlight ui-state-disabled" id="tab-1" tabindex="-1" ><a class="tabAnchor">Step 1: Provide Basic Details</a></li>
                        <li class="ui-menu-item ui-state-disabled" id="tab-2" tabindex="-1" ><a class="tabAnchor">Step 2: Receive Articles</a></li>
                        <li class="ui-menu-item ui-state-disabled" id="tab-3" tabindex="-1" ><a class="tabAnchor">Step 3: Review Discrepancies</a></li>
                        <li class="ui-menu-item ui-state-disabled" id="tab-4" tabindex="-1" ><a class="tabAnchor">Step 4: Provide ULD Details</a></li>
                        <li class="ui-menu-item ui-state-disabled" id="tab-5" tabindex="-1" ><a class="tabAnchor">Step 5: Receive Summary</a></li></ol></div><div class="jw-steps-wrap">
                        <div id="step-1" class="receiveDiv formWrapper" style="display: block;">
						<h2 class="recvTabTitle">Select receiving method and then provide invoice / docket number and temperature. </h2>
						<hr class="sectionDivider clearfix">
						
						<div class="ContentTableWrapper clearfix">
							
							<div class="tableTitle clearfix">
								<h4 class="sectionTitle"><strong>Receiving Method</strong></h4>
							</div>
							
							<hr class="sectionDivider clearfix">
							<div class="parameter">
								<input type="hidden" id="asnNo" value="" />
								<input type="hidden" id="deliverySegNo" value="" />
								<span class="reportRadio">
									<span class="methodRL hideBlock"><input type="radio" id="RM" value="RM" name="type" checked=""><label class="labelText" for="RM">Receive Line-by-line</label><label class="actualReceiveMethod hideBlock" for="">RL</label></span>
									<span class="methodRE hideBlock"><input type="radio" id="MF" value="MF" name="type"><label class="labelText" for="MF">Receive by Exception</label><label class="actualReceiveMethod hideBlock" for="">RE</label></span> 
									<span class="methodRF hideBlock"><input type="radio" id="MM" value="MM" name="type"><label class="labelText" for="MM">Receive in Full</label><label class="actualReceiveMethod hideBlock" for="">RF</label></span>
									<span class="methodRC hideBlock"><input type="radio" id="RC" value="RC" name="type"><label class="labelText" for="RC">Receive by Carton</label><label class="actualReceiveMethod hideBlock" for="">RC</label></span>
								</span>					
							</div>						
							
							<div class="delvDtl">
								<div class="tableTitle clearfix">
									<h4 class="sectionTitle"><br><strong>Delivery Details</strong></h4>
								</div>
								
								<hr class="sectionDivider clearfix">
								
									
								
								<div class="parameter clearfix">
									<label for="invoice" class="mandatory">Invoice / Docket #</label>
									<input type="#" class="textbox" id="invoice" maxlength="14">
								</div> <!-- End of parameter -->	
							</div>
							
							<p>&nbsp;</p>
							<div class="tempDtl hideBlock">
								<div class="tableTitle clearfix">
									<h4><br><strong>Temperature Details</strong></h4>
								</div>
								
								<hr class="sectionDivider clearfix">
								
								
								<div class="parameter clearfix chilled hideBlock">
									<label for="temperature" class="mandatory">Chilled Temperature</label>
									<!-- <input type="#" class="textbox temperatureChange" id="temperature1" maxlength="4"> -->
									<input type="#" class="textbox temperatureChange" id="temperature1" maxlength="6">
								</div> <!-- End of parameter -->
								
								<div class="parameter clearfix hardFrozen hideBlock">
									<label for="temperature" class="mandatory">Hard Frozen Temperature</label>
									<!-- <input type="#" class="textbox temperatureChange2" id="temperature2"  maxlength="7"> -->
									<input type="#" class="textbox temperatureChange2" id="temperature2"  maxlength="6">
								</div> <!-- End of parameter -->
							</div>
							
							<div class="warningMessage clearfix hideBlock">
								<h4>Warning message should be added in case input temperature is less or greater than the range......</h4>
							</div>
							
						
							
							<div class="errorDiv parameter clearfix hideBlock" id="dockErrorDiv">
								<label id="errorMsg">Error text</label>
							</div>
						</div> <!-- End of 	ContentTableWrapper -->				
												
					</div>
					<div id="step-2" class="recvArticleStep receiveStep formWrapper" style="display: none;">
						<h2 class="recvTabTitle">Check and confirm received qty. for each article.</h2>
						<hr class="sectionDivider clearfix" />
									
						<div class="ContentTableWrapper clearfix" id="receiveMode">
							
							<div class="tableInfo padtop10">
				
								<div class="tableTitle">
									<h4 class="articleHdr"><strong>List of Articles (3) - Example receive line-by-line</strong></h4>
								</div> <!-- End of table title -->
							</div> <!-- End of table info -->
						
						<div id="CartonAddBox" class="hideBlock">
						<div class="tableActionsBtnsWrapper hideBlock">
								<div class="lookupActionWrapper">
									<label class="linkBtn addRow" id="addCartonBtn">Add SSCC carton</label>

									<div class="errorDiv hideBlock" id="artErrorDiv" style="float:right">
										<label id="errorMsg">No article found for '<strong>3234</strong>'. Please try a different number.</label>
										<label class="closeMessage">&nbsp;</label>
									</div>
								   
								</div> <!-- End of lookup action wrapper -->
							 </div> <!-- End of table actions btn wrapper -->
							 <div class="tableActionsWrapper hideBlock" id="cartonAddAction">
								
							
									<div class="formWrapper">
									
										<div class="parameter">
											<label class="" for="">Carton No</label>							
											<input type="#" class="textbox textboxDefaultText" placeholder="Type 20 digit barcode" id="cartonToAdd">
										</div>																	
										

										<div class="formActions">
											<label class="actionBtn" id="addCartonRow"><a >Add Carton</a></label>
											<label class="secondaryActionBtn " id="closebtn"><a >Close</a></label>						
										</div> <!-- End of form actions -->
																
									</div> <!-- End of formWrapper  -->
								
								
							</div> <!-- End of table Actions Wrapper -->
							 
							  </div>
						<div id="searchBoxArea" class="lineByLine ">	
							<div class="tableActionsBtnsWrapper">
								<div class="lookupActionWrapper">
									<label class="linkBtn addRow" id="addActionBtn" addcarton="">Add Missing Article</label>

									&nbsp;									
									<span style="float:right">
										<input type="checkbox" id="changeOM" /><label for="checkboxActive">Change order multiple and input expiry date</label>
									</span>
									
									<div class="errorDiv hideBlock" id="artErrorDiv" style="float:right">
										<label id="errorMsg">No article found for '<strong>3234</strong>'. Please try a different number.</label>
										<label class="closeMessage">&nbsp;</label>
									</div>
								   
								</div> <!-- End of lookup action wrapper -->
							 </div> <!-- End of table actions btn wrapper -->
							 
							 
							<div class="tableActionsWrapper" id="tableAddAction">
								
							
									<div class="formWrapper">
									
										<div class="parameter">
											<label class="" for="searchBox">Article</label>							
											<input type="#" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" id="searchBox">
										</div>							
										
										
										<div class="parameter">
											<label class="" for="qty">Received Qty.</label>
											<input type="#" tabindex="2" id="qty" class="textbox numberBox">
											
										</div>
										
										
										
										
										
										<div class="formActions">
											<label class="actionBtn" id="searchAndAdd" carton_id=""><a >Search & Add</a></label>
											<label class="secondaryActionBtn closeLink" id="closeLink" Close_id=""><a >Close</a></label>						
										</div> <!-- End of form actions -->
																
									</div> <!-- End of formWrapper  -->
								
								
							</div> <!-- End of table Actions Wrapper -->
						</div>	
						
						<div class="" > 
							<table id="SSCCGroup" class="ContentTable drilldownTable treetab treetable">
							<thead ></thead>
							</table>
						</div>
							
							<table cellspacing="0" class="ContentTable drilldownTable treetab treetable hideBlock " id="recvArticleTable"  style=" margin-top: 5px;" >
								<thead> 
								<tr>
									<th rowspan="2">Article # </th>
									<th rowspan="2">Vendor<br>Ref #</th>
									<th rowspan="2">Description</th>	
									<th class="centerValue columnDivider"  rowspan="2" width="80px">OM</th>
									<th class="centerValue columnDivider" colspan="2">Ordered </th>	
									<th class="centerValue columnDivider" colspan="2">Dispatched </th>	
									<th class="centerValue columnDivider" colspan="2">Received</th>
									<th class="centerValue columnHide" width="70px" rowspan="2">New OM</th>
									<th class="centerValue columnHide" width="70px" rowspan="2">Expiry Date</th>
									<th class="lastColumn centerValue confirmCol lineByLine" width="80px" rowspan="2">Confirm<br />Received<br />(0/0)</th>
								</tr>
								<tr class="subHeader">
															
									<th class="centerValue" width="80px">Qty.</th>						
									<th class="centerValue columnDivider">Total Units</th>
									<th class="centerValue" width="80px">Qty.</th>						
									<th class="centerValue columnDivider">Total Units</th>
									<th class="centerValue">Qty.</th>						
									<th class="centerValue columnDivider">Total Units</th>
								</tr>
								
								</thead>
								
								<tbody>
							
									<tr id="row-1" class="rowHighlight">
										<td>2001</td>
										<td>2222</td>
										<td>Article Description One</td>
										<td class="centerValue columnDivider">5 CAR</td>
										<td class="centerValue ">8 EA</td>
										<td class="centerValue columnDivider"><strong>40 EA</strong></td>
										<td class="centerValue ">4 CAR</td>
										<td class="centerValue columnDivider"><strong>32 EA</strong></td>	
										<td id="receivedEdit-1" class="centerValue ">
											<input type="#" value="##" class="editNumCell textbox textboxDefaultText">
											<label class="moreInput">
												<strong>Total Weight (kg)</strong>
											</label>
											
											<input type="#" value="##" class="editNumCell textbox textboxDefaultText">
										</td>	
										<td id="received-1" class="centerValue columnDivider">### </td>
															
										
										<td id="packOMEdit-1" class="centerValue  columnHide hideBlock">
											<input type="#" value="##" class="editNumCell textbox textboxDefaultText">
										</td>
										<td id="expiryEdit-1" class="centerValue  columnHide hideBlock">
											<input type="#" placeholder="dd/mm/yyyy" class="textbox textboxDefaultText inputDate editDateCell hasDatepicker">
										</td>
										<td class="centerValue lastColumn"><input type="checkbox"></td>	
										
									</tr>					
									<tr class="warningIndicator " id="row-2">
										<td class="tooltip" title="Article is not-ranged">2001</td>
										<td>2222</td>
										<td>Article Description One</td>
										<td class="centerValue columnDivider">5 CAR</td>
										<td class="centerValue ">8 EA</td>
										<td class="centerValue columnDivider"><strong>40 EA</strong></td>
										<td class="centerValue ">4 CAR</td>
										<td class="centerValue columnDivider"><strong>32 EA</strong></td>	
										<td id="received-2" class="centerValue ">### </td>
										<td id="receivedEdit-2" class="centerValue hideBlock columnDivider">
											<input type="#" value="##" class="editNumCell textbox textboxDefaultText">
										</td>						
										<td id="packOM-2" class="centerValue columnDivider">###</td>
										<td id="packOMEdit-2" class="centerValue hideBlock columnDivider">
											<input type="#" value="##" class="editNumCell textbox textboxDefaultText">
										</td>
										<td class="centerValue columnHide hideBlock"><strong>##</strong></td>
										<td class="centerValue  columnHide hideBlock">
											dd/mm/yy
										</td>
										<td class="centerValue lastColumn"><input type="checkbox" checked></td>
									</tr>
									<tr class="lastRow urgentIndicator " id="row-3">
										<td class="tooltip" title="Article is Recalled ">2001</td>
										<td>2222</td>
										<td>Article Description One</td>
										<td class="centerValue columnDivider">5 CAR</td>
										<td class="centerValue ">8 EA</td>
										<td class="centerValue columnDivider"><strong>40 EA</strong></td>
										<td class="centerValue ">4 CAR</td>
										<td class="centerValue columnDivider"><strong>32 EA</strong></td>	
										<td id="received-3" class="centerValue ">### </td>
										<td id="receivedEdit-3" class="centerValue hideBlock columnDivider">
											<input type="#" value="##" class="editNumCell textbox textboxDefaultText">
										</td>						
										<td id="packOM-3" class="centerValue columnDivider">###</td>
										<td id="packOMEdit-3" class="centerValue hideBlock columnDivider">
											<input type="#" value="##" class="editNumCell textbox textboxDefaultText">
										</td>
										<td class="centerValue columnHide hideBlock"><strong>##</strong></td>
										<td class="centerValue  columnHide hideBlock">
											dd/mm/yy
										</td>
										<td class="centerValue lastColumn"><input type="checkbox" checked></td>
									</tr>
								</tbody>
							</table>
							
						</div>
						
					</div>
					
						<div id="step-3" class="receiveDiv formWrapper jw-step" data-jwizard-title="Step 3: Review Discrepancies" style="display: none;">
						<h2 class="recvTabTitle">The order quantity does not match with received qty. for following article so 'Confirm' each discrepancy.</h2>
						<hr class="sectionDivider clearfix">
									
						<div class="ContentTableWrapper clearfix">
						
							<div class="errorDiv hideBlock" id="discErrorDiv">
								<label id="errorMsg">No article found for '<strong>3234</strong>'. Please try a different number.</label>
								<label class="closeMessage">&nbsp;</label>
							</div>															
							<div class="tableInfo">
				
								<div class="tableTitle">
									<h4 class="" id="discrepancyHdr"><strong>Discrepancies (2)</strong></h4>
								</div> <!-- End of table title -->
							</div> <!-- End of table info -->
							
							<div class="" > 
							<table id="SSCCGroupForDescripencies" class="ContentTable drilldownTable treetab treetable hideBlock">
							<thead ></thead>							
							</table>
						    </div>
						
							<table cellspacing="0" class="ContentTable hideBlock" id="discrepancyTable">
							<thead><tr>
								<th rowspan="2">Article #</th>
								<th rowspan="2">Vendor<br>Ref #</th>
								<th rowspan="2" width="100px">Description</th>
								<th class="centerValue" colspan="2">Ordered </th>
								<th class="centerValue" colspan="2">Dispatched </th>
								<th class="centerValue" colspan="2">Received </th>						
								
								<th rowspan="2" width="40px" class="centerValue ">Difference</th>
								<th rowspan="2" class="">Reason</th>
								<th rowspan="2" class="centerValue confirmCol lastColumn">Confirm<br>Discrepancies<br>(0/0)</th>
							</tr>
							<tr class="subHeader">
								<th class="centerValue">Qty.</th>
								<th class="centerValue">Total Units</th>
								<th class="centerValue">Qty.</th>
								<th class="centerValue">Total Units</th>
								<th class="centerValue">Qty.</th>
								<th class="centerValue">Total Units</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>2001</td>	
								<td>1234</td>	
								<td>Homebrand Pineapple Pieces Nat Juice 440g</td>
								<td class="numberColumn">###</td>
								<td class="numberColumn ">### </td>
								<td class="numberColumn">###</td>
								<td class="numberColumn">### </td>
								
								<td class="sorted centerValue "><label class="valueDown">10</label></td>
								<td class="sorted">Not Ranged </td>
								<td class="lastColumn centerValue sorted"><input type="checkbox"> </td>
							</tr>
							
							<tr class="lastRow">
								<td>2002</td>	
								<td>1234</td>	
								<td>Homebrand Pineapple Pieces Nat Juice 440g</td>
								<td class="numberColumn">###</td>
								<td class="numberColumn ">### </td>
								<td class="numberColumn">###</td>
								<td class="numberColumn">### </td>
								<td class="sorted centerValue "><label class="valueDown">10</label></td>
								<td class="sorted">Pack Size </td>
								<td class="lastColumn centerValue sorted"><input type="checkbox"> </td>
							</tr>
							
															
						</tbody></table>		
						</div> <!-- End of content table wrapper -->
					
						
										
					</div>
						<div id="step-4" class="receiveStep formWrapper jw-step" data-jwizard-title="Step 4: Provide ULD Details" style="display: none;">
						<h2 class="recvTabTitle">Confirm received ULD qty. and input returned qty., if any.</h2>
						<hr class="sectionDivider clearfix">
						
						<div class="errorDiv parameter clearfix hideBlock" id="uldErrorDiv">
							<label id="errorMsg">Error text</label>
						</div>
						
						<div class="ContentTableWrapper clearfix">
						
							<div class="uldWrapper formWrapper">
							
								<div class="tableTitle clearfix">
									<h4 class="sectionTitle"><strong>Delivery Details</strong></h4>
								</div>
								
								<hr class="sectionDivider clearfix">
								
								<div class="parameter">
									<label for="did" class="mandatory">Docket ID</label>
									<input type="text" class="textbox largebox" id="did" maxlength="14">
								</div> <!-- End of parameter -->
								
								<div class="parameter uldFields hideBlock">
									<label for="rec">Receiver</label>
									<input type="text" class="textbox largebox" id="rec" maxlength="50">
								</div> <!-- End of parameter -->
								
								
								<div class="parameter clearfix">
									<label for="car" id="carLabel">Carrier</label>
									<input type="text" class="textbox largebox" id="car"  maxlength="20">
								</div> <!-- End of parameter -->							
								
								<div class="parameter uldFields hideBlock">
									<label for="sen">Sender</label>
									<input type="text" class="textbox largebox" id="sen"  maxlength="50">
								</div> <!-- End of parameter -->
								
								<div class="parameter uldFields hideBlock clearfix">
									<label for="consign">Consignment Note #</label>
									<input type="text" class="textbox" id="consign" maxlength="30">
	
								</div> <!-- End of parameter -->
								
								<div class="parameter uldFields hideBlock">
									<label for="reg">Rego #</label>
									<input type="text" class="textbox" id="reg"  maxlength="20">
								</div> <!-- End of parameter -->
								
								
								<div class="parameter uldFields hideBlock clearfix">
									<label for="comments" class="">Comments</label>							
									<textarea id="comments" placeholder="" class="textbox textboxDefaultText largebox" maxlength="30"></textarea>
								</div>						
								
								<div class="parameter uldFields hideBlock">
									<label for="tra">Trailer #</label>
									<input type="text" class="textbox" id="tra"  maxlength="20">
								</div> <!-- End of parameter -->
							</div>	
							
							
							<div class="tableInfo clearfix">
				
								<div class="tableTitle">
									<h4 class=""><br><strong>List of ULDs</strong></h4>
								</div> <!-- End of table title -->
							</div> <!-- End of table info -->
							
							<div id="uldSearchArea">
								<div class="tableActionsBtnsWrapper ">
									<div class="lookupActionWrapper">
										<label class="linkBtn" id="addActionBtn"><label class="addRow">Add ULD Type</label></label>
									<div class="errorDiv hideBlock" id="uldAddErrorDiv">
										<label id="errorMsg">No article found for '<strong>3234</strong>'. Please try a different number.</label>
										<label class="closeMessage">&nbsp;</label>
									</div>
									</div> <!-- End of lookup action wrapper -->						
								
								 </div> <!-- End of table actions btn wrapper -->
								 
								<div class="tableActionsWrapper" id="tableAddAction">
									
									
										<div class="formWrapper">

											<div class="parameter">
												<label for="store" class="">Type</label>
												<select class="selectOptions" id="typeSelect">
													<option value="">Select</option>
													<option value="Type One">Type One</option>
													<option value="Type Two">Type Two</option>
												</select>
											</div> <!-- End of parameter -->	
	
											<div class="parameter">
												<label for="req" class="">Received Qty.</label>
												<input type="#" class="textbox xsmallbox " id="req" maxlength="3">
											</div> <!-- End of parameter -->
											
											<div class="parameter">
												<label for="ret" class="">Returned Qty.</label>
												<input type="#" class="textbox xsmallbox " id="ret" maxlength="3">
											</div> <!-- End of parameter -->
											
											<div class="formActions">
												<label class="actionBtn" id="addULD">Add</label>
												<label class="secondaryActionBtn closeLink" id="closeLink">Close</label>						
											</div> <!-- End of form actions -->
																	
										</div> <!-- End of content table wrapper -->
								
									
									
									
								</div> <!-- End of table Actions Wrapper -->
							</div>
						
						
							<table class="ContentTable" cellspacing="0" id="addULDTable">
								<thead><tr>
									
									
									<th class="">Type</th>
									<th class="centerValue">Received Qty.</th>
									<th class="centerValue">Returned Qty.</th>
									<th class="centerValue" width="45px">Delete</th>
								</tr>
								</thead>
								<tbody>							
							</tbody></table>
						
							
							
							
							
						
						
						</div> <!-- End of 	ContentTableWrapper -->		
										
					</div>
						<div id="step-5" class="receiveStep formWrapper jw-step" data-jwizard-title="Step 5: Receive Summary" style="display: none;">
						<h2 class="recvTabTitle">Check summary and submit the order</h2>
						<hr class="sectionDivider clearfix">
						
						<div class="articleContent orderDetails">
				
											
							<div class="articleContentInner">
							
								<div class="articleDetails multiple" id="invoiceDetails">
									
									<table width="100%" cellspacing="0" class="ContentTable" id="recvSummaryTable">
										
										<tbody><tr>
											<td class="keyInfo">	
												Received By:
											</td>
											<td class="valueInfo recvBy">
												James Smith
											</td>
											<td class="keyInfo"  id = "CHTemp_lbl">	
												Chilled Temperature:
											</td>
											<td class="valueInfo CHTemp" id = "CHTemp_cont">
												22
											</td>
											<td class="keyInfo" id = "HFTemp_lbl">	
												Hard Frozen Temperature:
											</td>
											<td class="valueInfo lastColumn HFTemp" id = "HFTemp_cont">
												22
											</td>
										</tr>
										<tr>
											<td class="keyInfo">	
												Total Articles Ordered:
											</td>
											<td class="valueInfo totOrdArticles">
												##
											</td>
											<td id="cartonsOrderedRecvSumTxt" class="keyInfo ">	
												Total Cartons Ordered:
											</td>
											<td class="valueInfo totOrdCartons">
												##
											</td>
											<td class="keyInfo ">	
												Total ULDs Received:
											</td>
											<td class="valueInfo lastColumn totULDRec">
												##
											</td>
										</tr>
										<tr class="lastRow">
											<td class="keyInfo">	
												Total Articles Received:
											</td>
											<td class="valueInfo totRecvArticles">
												##
											</td>
											<td id="cartonsReceivedRecvSumTxt" class="keyInfo ">	
												Total Cartons Received:
											</td>
											<td class="valueInfo totRecvCartons">
												##
											</td>
											<td class="keyInfo ">	
												Total ULDs Returned:
											</td>
											<td class="valueInfo lastColumn totULDRet">
												##
											</td>
										</tr>
									</tbody></table>
								</div>								
							    <div class="articleDetails multiple hideBlock" id="bigwSSCCCartonDtls">
									
									<table width="100%" cellspacing="0" class="ContentTable" id="SSCCCartonDetails">
										<tbody>										
										<tr class="lastRow">
											<td class="keyInfo">	
												Total SSCC Cartons Received:
											</td>
											<td class="valueInfo totalSSCCCartonsReceived">
												##
											</td>
											<td class="keyInfo ssccCartonDisLabel">	
												Total SSCC Cartons Dispatched:
											</td>
											<td class="valueInfo totalSSCCCartonsOrdered">
												##
											</td>
										</tr>
									</tbody></table>
								</div>		
							
								<div class="articleDetails multiple" id="invoiceDetails">
									
									<table width="100%" cellspacing="0" class="ContentTable" id="discDetails">
										<tbody><tr>
											<td class="subTitle" colspan="6">	
												Discrepancies
											</td>
										</tr>
										
										<tr class="lastRow">
											<td class="keyInfo">	
												Pack  Size:
											</td>
											<td class="valueInfo packSize">
												#
											</td>
											<td class="keyInfo ">	
												Zero Qty.:
											</td>
											<td class="valueInfo zeroQty">
												##
											</td>
											<td class="keyInfo ">	
												Other Qty.:
											</td>
											<td class="valueInfo lastColumn otherQty">
												##
											</td>
										</tr>
									</tbody></table>
								</div>								
							
							
							</div> <!-- End of article content inner -->	
						</div> <!-- End of article content  -->
						
						<div class="innerSection postRadio">
							<h4 class="sectionTitle">
								<label>Choose to post and apply the Stock on Hand updates</label>
								<input type="radio" checked="" name="ptype" value="P" id="PN"><label for="PN" class="labelText"><strong>Post Now</strong></label>
							<label id="plRadioDiv" class="" ><input type="radio" name="ptype" value="L" id="PL"><label for="PL" class="labelText"><strong>Post Later</strong></label></label> 
								
							</h4>					
						</div>
					
					
					</div>
					</div>
					</div>
				
					
				
				</form>	
				
				<div class="pageActions">     				
					<label class="secondaryActionBtn" id="cancelbtn"><a >Cancel Receiving</a></label>
					<label class="secondaryActionBtn hideBlock" id="savebtn"><a ><label class="">Save & Continue Later</label></a></label>	
					<label class="actionBtn hideBlock" id="prevbtn"><a ><label class="">Prev Step</label></a></label>															
					<label class="actionBtn" id="nextbtn"><a ><label class="">Next Step</label></a></label>	
					<label class="actionBtn hideBlock" id="submitbtn"><a ><label class="thumbUp">Submit</label></a></label>	
				</div>
				
			
  </div> <!--  End of wizard content -->		
		

	<div
			class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
			tabindex="-1" role="dialog" aria-describedby="dialog-recvConfirmation"
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
			<div id="dialog-recvConfirmation"
				class="ui-dialog-content ui-widget-content">
				<div class="popupContent">

					<div class="popupData popupTitle">

						<h4 class="warning" id="message">
							Please note that In-store Promotions will be available in
							Promotions Planning screens after <strong>approximately
								2 hours</strong>, once it is successfully created.
						</h4>

					</div>
					<!-- End of pop up data -->


					<div class="popupActionsWrapper">
						<span class="popupActions" id="continue"> <label
							class="actionBtn">Continue</label>
						</span><span class="popupActions" id="cancel"> <label
							class="secondaryActionBtn">Cancel </label>
						</span><span class="popupActions hideBlock confirmation-nobtn" id="nobtn">
							<label class="actionBtn">No</label>
						</span> <span class="popupActions hideBlock confirmation-yesbtn"
							id="yesbtn"> <label class="actionBtn">Yes </label>
						</span><span class="popupActions hideBlock confirmation-rejectbtn"
							id="rejectbtn"> <label class="secondaryActionBtn">Reject</label>
						</span><span class="popupActions hideBlock confirmation-acceptbtn" id="acceptbtn">
							<label class="actionBtn">Accept</label>
						</span>
					</div>
					<!-- End of popup actions-->


				</div>
				<!-- End of popupContent -->
			</div>
		</div>
		
	<div id="dialog-selectArticle" title="Select an Article">
		<div class="popupContent">
			<!-- <div class="popupSearchWrapper" id="popupSearch">
				<h3>Supplier Name:</h3>
				<input type="#" placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDescEnq"> <label
					class="actionBtn" id="goButtonSample1">Go</label>
			</div>-->
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDivItem"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>

		</div>
	</div>
	
	<div class="quickHelpWrapper hideBlock"
		id="recvNotRangedWrapper">
		<div class="quickHelpContent">
			<div class="quickHelpTitle">
				<h4 class="title" id="header">Articles Not-ranged</h4>
				<a class="close" title="Close"
					onclick="$('#recvNotRangedWrapper').addClass('hideBlock');">Close</a>
				<p class="description" id="titleContent">Creation failed for few
					supplier.</p>
			</div>
			<!-- End of quick help title -->
			<div class="content">

				<!-- <h4 class="title"></h4>
				<ul id="errorContent">

				</ul> -->
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>
 

	</div>