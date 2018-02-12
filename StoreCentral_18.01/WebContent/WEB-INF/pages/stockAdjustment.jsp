		<div id="adjustSOHDiv" class="contentWrapper lookup hideBlock">
		
			<div class="lookupWrapper" id="sohLookupContainer">
			
				<div class="lookupTitleWrapper">
					<h2>Lookup</h2>
				</div> <!-- End of lookup title wrapper -->
				
				<div class="lookupParamWrapper">
					
					<form id="sohSearchForm">
						<div class="searchBox">
							<input type="#" class="textbox textboxDefaultText ui-autocomplete-input" placeholder="Search article" id="sohSearchBox" autocomplete="off">
							<input type="text" style="display: none;" />
						</div> <!-- End of main search box -->
						<label id="sohArticleSearch" class="actionBtn">Go</label>
						
						 <div class="searchByOptions">
							<label for="searchBox" class="labelText" id="preSearchText">Type number, description, or EAN / TUN / PLU and press Enter</label>
						 
												
						 </div> <!-- End of search by options -->
						
						
						
					</form>
				
				</div> <!-- End of lookup param wrapper -->
				
				
				
			
				
				
			
			
			
			</div> <!-- End of lookup wrapper -->
			
			<div class="ContentTableWrapper sohArticleDetails hideBlock" id="soh-adj-dtl-cont">
				<div id="selectedArticleObj"></div>
				<div id="selectedArticleObjTransferTo"></div>
				<div class="tableInfo">				
					<div class="tableTitle">
						<h4>Select reason for adjustment and enter the value in applicable unit of measure</h4>
					</div> <!-- End of table title -->					
				</div> <!-- End of table info -->
				
				<div class="articleHead">
				
					<div class="articleHeaderWrapper">
						<h2 class="articleTitle" id="sohArticleTitle"></h2>					
					</div>
				
			
				
				
					<div class="articleActionBtns">
						<label class="actionBtn sohAdjustHistory" id="editActions" ><a href="#"><label class="notepad">History</label></a></label>
						<!-- <label class="actionBtn sohAdjustHistory" id="editActions" onclick = "showFullAdjLog(articleNo)"><a href="#"><label class="notepad">History</label></a></label> -->
						<!-- <label class="actionBtn sohHistoryinAdjustNew ${properties.GoodsMovementSummary}" id="sohHistoryinAdjustNew" ><a href="#"><label class="notepad">SOH History</label></a></label> --!>
					</div>
				
					<div class="articleInfoWrapper">				
						<p class="secondaryInfo" id="secondaryDetails">
							
							
						</p>
					</div>	
					
					<div class="articleInfoSecondary">
						<label id="sohRecentHistory" class="text"></label>
					</div>
				
				
				</div> <!-- End of article head -->
				
	
				<div class="articleContent orderDetails">
					
									
					<div class="articleContentInner">
					
						<div class="articleDetails">
							<div class="tableActionsWrapper">
								<form method="POST" action="" id="sohDetails">
									<div class="formWrapper">
									
										<!-- <div class="parameter">
											<label class="" for="UOM">Unit of Measure (UOM):</label>
											<span id="uomRadioContent">
												
											</span>										
										</div>--> <!-- End of parameter -->
									
										<div class="parameter spaceIssueFix clearfix">
											<label class="mandatory" for="store">Reason for Adjustment:</label>
											<select id="reasonsForSOHAdjust" class="selectOptions">
											</select>
											
										</div> <!-- End of parameter -->
										<div class="damagedDiv allParamdivs hideBlock">
										<div class="parameter spaceIssueFix" id="">
											<label class="" for="store">Charity:</label>
											<select id="charityList" class="selectOptions">
																						
											</select>
											
										</div>
										</div>
										<div class="writeOffDiv allParamdivs hideBlock">
										<div class="parameter spaceIssueFix">
											<label class="" for="store">Production Date:</label>
											<input type="#" class="textbox textboxDefaultText inputDate" id="prodDate" placeholder="dd/mm/yyyy">
											
										</div>
										</div>
										<div class="idtReverseDiv allParamdivs hideBlock">
										<div class="parameter spaceIssueFix" id="">
											<label class="mandatory" for="store">IDT purchase:</label>
											<select id="idtToSubCatList" class="selectOptions"  style="width: 200px" >																						
											</select>
											
										</div>
										</div>
										
										<div class="idtPurchaseDiv allParamdivs hideBlock">
										<div class="parameter spaceIssueFix" id="">
											<label class="mandatory" for="store">Sub-Cateogry:</label>
											<select id="subCatToList" class="selectOptions">
																						
											</select>
											
										</div>
										</div>
										<div class="idtPurchaseDiv idtReverseDiv allParamdivs hideBlock">
										<div class="parameter spaceIssueFix">
											<label class="" for="store">Comments:</label>
											<textarea class="" id="idt_comments" placeholder="" style="width: 200px" maxlength="250"></textarea>
											
										</div>
										</div>
										<div class="idtReverseDiv allParamdivs hideBlock" style="padding-left: 43.5%;">
										<div class="parameter spaceIssueFix" id="">
											<select id="idtToQtyList" class="selectOptions" style="width: 200px;">
																						
											</select>
											
										</div>
										</div>
										<div class="writeOffDiv undrDelvryDiv damagedDiv otherReasonsDiv idtPurchaseDiv allParamdivs parameter spaceIssueFix">
											<label class="mandatory sohByText hideBlock" for="salesOrg">Adjust SOH by:</label>
											<label class="mandatory endSohText hideBlock" for="salesOrg">End SOH :</label>		
											<span class="stepper">
												<a class="stepDown hideBlock" href="#">&nbsp;</a>
												<!-- <input type="#" class="textbox numberBox" id="adjustSOH"> -->
												<span id="weightSpan" class="hideBlock">
												<input type="#" class="textbox numberBox adjustSOHKeyPress" id="adjustSOHWeight" placeholder="Qty.">
												</span>
												<span  id="uomRadioContent">
												</span>
												<a class="stepUp hideBlock" href="#">&nbsp;</a>
											</span>
										</div> <!-- End of parameter -->	
										
										<!-- For BWS Tranfser  to other ref  reason code -->
										<div class="transferToDiv allParamdivs hideBlock" id="transferToDivId">
											<div class="parameter spaceIssueFix">
												<label class="mandatory" for="store">Transfer Qty :</label>
												<span class="stepper">
												<input type="#" class="textbox numberBox adjustTransferSOHKeyPress" id="transQty" placeholder="EA"></span>
											</div>
											
											<div class="parameter">
												<label class="mandatory" for="store">Article :</label>
												<input type="#" class="textbox smallBox" id="transToArticle" placeholder="Search article">
												<!-- <label id="transToArticleSearch" class="actionBtn">Go</label> -->
												<label class="linkBtn" id="transToArticleSearch"><label class="advancedSearch">Verify</label></label> 
												<label class="linkBtn hideBlock" verified ="false" id="verifyTransToArticleLabel"><label class="verified">Verified</label>
											</div>
											
										</div>
										
										 
										<div class="undrDelvryDiv allParamdivs hideBlock">
										<div class="parameter spaceIssueFix">
											<label class="mandatory" for="store">Authorization Code:</label>
											<input type="#" id="authCodeUndrWhse" class="textbox smallboxFix">
											
										</div>
										</div>
										
										<div class="undrDelvryDiv allParamdivs hideBlock">
										<div class="parameter spaceIssueFix parameterLast">
											<label class="mandatory" for="store">Order# :</label>
											<input type="#" id="orderNoUndrWhse" class="textbox smallbox"><label id="searchOrder" class="linkBtn"><a href="#"><label class="advancedSearch">Search</label></a></label>
											<input type="hidden" id="orderVerify" value="false">
										</div>
										</div>
										
										<div class="formActions" id ="linkFactor">
										<label class="" for="finalVal"><strong><label class="likageFactor hideBlock" for="">Linkage Factor :</label>&nbsp;<label class="likageFactor hideBlock "  id="linkageFactorVal"></label><label class="likageFactor hideBlock"> | </label><label class="sohByTextTotal hideBlock" for="">Adjust SOH by : </label><label id="endSOHValueAdj" class = "adjSohByHide hideBlock"></label>&nbsp;<label id="endSOHUomAdj" class = "adjSohByHideUom hideBlock"></label>
											<label class="endSohTextTotal hideBlock" for="">End SOH :</label> <label class="pisohFix" id="endPiSOHValue"></label><label class="pisohFix"  >&nbsp;</label><label class="pisohFix" id="endPiSOHUom">EA</label><label class="pisohFix"  >&nbsp;&amp;&nbsp;</label><label id="endSOHValue"></label>&nbsp;<label id="endSOHUom"></label> </strong></label>
											<label class="actionBtn" id="saveSOH" tabindex="0"><a href="#">Save &amp; Next</a></label>
											<label class="secondaryActionBtn" tabindex="0" id="cancelSOH"><a href="#">Cancel</a></label>						
										</div> <!-- End of form actions -->
										
																
									</div> <!-- End of form wrapper -->
								</form>
							</div>  <!-- End of table actions Wrapper -->	
						</div>  <!-- End of article details -->											
					</div> <!-- End of article content inner -->
						
					
				</div><!-- End of article content -->
				<!--<div id="sohHistoryInAdjustNewContent" class="hideBlock"/>-->
				<div id="historyDiv" class="hideBlock">
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4 class="sectionTitle">Last 28 days history</h4>
					</div> <!-- End of table title -->
					
				</div>			
				
			
				<table cellspacing="0"  class="ContentTable">
				<thead>
					<tr>
						<th>Reason</th>
						<th>Date &amp; Time</th>
						<th>User</th>	
						<th class="centerValue">Adjustment Qty</th>
						<th class="centerValue">Old Value</th>										
						<th class="centerValue lastColumn">New Value</th>
					</tr>
					</thead>
					<tbody id="historyTable">
					
					</tr>
				</tbody></table>
				</div>

			</div>  <!-- End of content table wrapper  -->	
			
	
			
				
			
		</div> <!-- End of content wrapper -->
		
		
		
		
		
			
		
	
	
	
	
	
	
	<a href="#" class="scrollup" style="display: none;">Top</a>
	
	<div id="dialog-common" class="visible-hide" title="">
		<div class="popupContent">
			<div class="popupData" id="popupDataDiv"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn ">Select & Close</label> <label
					class="actionBtn " id="cancelCharity">Cancel</label>
			</div>
		</div>
	</div>
	<div id="dialog-unreceived-orders" class="visible-hide" title="">
		<div class="popupContent">
			<div class="tableInfo" id=""><div class="tableTitle"><h5 class="sectionTitle"><span class="table_title">Following orders are Unreceived/Not posted, Do you wish to continue or discard the stock adjustment ?</span></h5></div></div>
			<div class="popupData" ></div>
			<!-- End of pop up data -->
			<div class="popupActionsWrapper">
			<div class="popupActions">
				<label class="actionBtn " id="yes-btn-orders" onclick ="$('#dialog-unreceived-orders').dialog('close');">Continue</label> <label
					class="actionBtn " id="no-btn-orders" onclick= "goBack();">Discard</label>
			</div>
			</div>
		</div>
	</div>
	
	<ul class="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content" id="ui-id-1" tabindex="0" style="display: none;"></ul><span role="status" aria-live="assertive" aria-relevant="additions" class="ui-helper-hidden-accessible"></span>
			


