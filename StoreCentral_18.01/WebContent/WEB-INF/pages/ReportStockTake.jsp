	
	<div class="contentWrapper hideBlock" id="stocktakeReportsDiv">	
			<div class="articleHead">
				
				<div class="articleHeaderWrapper">
					<h2 class="articleTitle" id="stockTakeNameReportDetailsScreen"></h2>					
				</div>
				<div class="articleActionBtns">
					<label class="highlightStatus">Status: <strong id="statusId">Open</strong></label>
					<label id="refresh" class="actionBtn"><a  id="refreshSTReportDetailsId"><label class="refresh">Refresh</label></a></label> 
					<label id="ignore" class="actionBtn disabled hideBlock"><a><label class="ignore">Overide Stocktake</label></a></label>
					<label id="editRecord" class="actionBtn disabled hideBlock"><a><label class="editBtn">Edit</label></a></label>
					<label id="editActions" class="actionBtn disabled hideBlock"><a><label class="deleteBtn">Delete</label></a></label>
					<label id="editLocation" class="actionBtn hideBlock"><a><label class="deleteBtn">Add Location</label></a></label>
					<label id="reportDetailsStockTakeId" class="hideBlock"></label>
					<label id="reportDetailsStockTakeSource" class="hideBlock"></label>
				</div>
				
				<div class="articleInfoWrapper">				
					<p class="secondaryInfo">
						<label class="articlePriceLabel" id="departmentsLabel">Department One, Department Two, Department Three</label>
					</p>
				</div>
			</div> <!-- End of article head -->
			
			
			<div class="articleContent orderDetails">
				
								
				<div class="articleContentInner">
				
					<div class="articleDetails">
				
						
						<table cellspacing="0" class="ContentTable" width="100%">
							
							<tr>
								<td class="keyInfo" width="15%" >	
									Last Completed:
								</td>
								<td class="valueInfo" width="15%" id="lastCompletedId">
									dd/mm/yy
								</td>
								<td class="keyInfo" width="15%">	
									Source:
								</td>
								<td class="valueInfo" width="15%" id="sourceId">
									Central / Store
								</td>
								<td class="keyInfo" width="15%">
								Created User:
								</td>
								<td class="valueInfo" width="15%" id="createdSTUser">																
								</td>								
							</tr>							
							
							<tr class="lastRow">
								<td class="keyInfo">	
									Next Due:
								</td>
								<td class="valueInfo" id="nextDueId">
									dd/mm/yy
								</td>
								<td class="keyInfo ">	
									Frequency:
								</td>
								<td class="valueInfo " id="freqId">
									Monthly
								</td>
								<td class="keyInfo" width="15%">
								Finalised User:
								</td>
								<td class="valueInfo" width="15%" id="finalizedUser">									
								</td>
								</tr>	
								<tr class="lastRow">
								<td class="keyInfo">	
									Date Created:
								</td>
								<td class="valueInfo" id="createdSTDate">
									
								</td>
							</tr>	
						
						</table>
						
					
					</div>  <!-- End of article details -->											
				
					
					
					
				</div> <!-- End of article content inner -->
				
				
		
			
			</div> <!-- End of article content -->
			
			
			
			<div class="articleAdditionalInfo">
			
				
				<div class="ContentTableWrapper">
					
					<div class="tableInfo">
					
						<div class="tableTitle">
							<h4 class="sectionTitle">Completion Summary</h4>
						</div> <!-- End of table title -->
						
					</div>

				</div> <!-- End of content table wrapper -->
		
				
				<div id="mainTabs">
					<ul>
						
						<li id="baseCountTabli" class=""><a href="#mainTabs-1" id="baseCountTabLabel"><label class="tabStatus">&nbsp;</label></a></li>
						<li id="missedArtTabli" class=""><a href="#mainTabs-2" id="missedArtTabLabel"><label class="tabStatus">&nbsp;</label></a></li>
						<li id="varReportTabli"><a href="#mainTabs-3" id="varReportTabLabel"><label class="tabStatus">&nbsp;</label></a></li>
						<li class=""><a href="#mainTabs-4">Audit Summary</a></li>
						
						<li class="${properties.TeamPerformance}  highlightTab" id="teamPerformanceTab" style="float: right"><a href="#mainTabs-6">Team Performance</a></li>
						<li class="${properties.UserPerformance}  highlightTab" id="userPerformanceTab" style="float: right"><a href="#mainTabs-7">User Performance</a></li>
						<li class="${properties.StockValuation}  highlightTab" id="stockValuationTab" style="float: right"><a href="#mainTabs-5">Stock Valuation</a></li>
						<li class="highlightTab hideBlock" id="stockValuationTab" style="float: right"><a href="#mainTabs-8">Finalise</a></li>
					</ul>
					
					
					<div id="mainTabs-1" class="tabContent">
						
						<div id="baseCountTabs" class="filterTabs ContentTableWrapper">
							
							
							<ul>
							    <li><a href="#promo-1" id="articleCountCountedLabel"></a></li>
								<li><a href="#promo-2" id="articleCountBeingCountedLabel"></a></li>
								<li><a href="#promo-3" id="articleCountNotCountedLabel"></a></li>								
							</ul>
							<div id="promo-1">
							
								<div class="ContentTableWrapper">
								
													
									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle" id="articleCountCountedCount">Completed Article Count:</h2>											
										</div>									
									</div>
									
									
									<div class="articleContent orderDetails">
										
														
										<div class="articleContentInner">
										
											<div class="articleDetails">
										
										
												<table cellspacing="0" class="" width="100%">
													
													<tr>
														<td class="keyInfo" width="8%">
															Aisles:
														</td>
														<td class="valueInfo aisleCol" width="15%">
															
														</td>	

														<td class="keyInfo" width="8%">	
															Sub-categories:
														</td>
														<td class="valueInfo subCatCol" width="35%">
															
														</td>											
														<td class="keyInfo" width="8%">
															Users:
														</td>
														<td class="valueInfo lastColumn userCol" width="25%">
															
														</td>															
													</tr>
													<tr>
														<td class="keyInfo">
															Other Locations:
														</td>
														<td class="valueInfo locCol" colspan="5">
															
														</td>	

																												
													</tr>
													
													
													
													
												</table>
											</div>  <!-- End of article details -->											
										</div> <!-- End of article content inner -->
												
										
									</div><!-- End of article content -->
									
									
									
									
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>List of all completed articles</strong></h5>
										  <!-- Not to tech team: Change label 'List of all completed articles' to 'List of articles (##)' when user applies filter -->
									   </div>
										<div class="tableActionBtns stDtlActionBtns" style="margin-top:0">
											<label class="actionBtn"><a  class="articleCntExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label id="" class="articleCountPrintBtn print">Print</label></a></label>				
										</div>
										
										<div class="instructionalText stDtlActionBtns" id="instructionalText1">
											<label>Before printing, use 'Filters' to view specific articles.</label>
										</div>
									</div> <!-- End of table info -->
					
					
									<div class="tableActionsBtnsWrapper hideBlock" id="baseCountFilterButtonDiv">
									   <div class="lookupActionWrapper" >
										  <label id="filterOpen" class="linkBtn">
												<a ><label class="filter">Filters</label></a>								
                                          </label>
										  <label id="filterClear" class="linkBtn hideBlock">
												<a ><label class="negativeFlag">Clear Filters</label>	</a>								
                                          </label>
										  
										  
										  
										  
									   </div> <!-- End of lookup action wrapper -->					  
									</div> <!-- End of table action wrapper -->
					
					
					
									<div class="tableActionsWrapper hideBlock" id="tableAddAction">
									   
									 
										  <div class="formWrapper">
											 <div class="parameter">
												<label for=""  class="">Group By</label>
												<input type="radio" id="deptName" value="deptName" name="groupByOptions" checked><label class="labelText" for="deptName">Sub-category</label> 
												<input type="radio" id="del" value="deptName" name="groupByOptions"><label class="labelText" for="del">Location </label> 
												<input type="radio" id="supp" value="deptName" name="groupByOptions"><label class="labelText" for="supp">User</label> 
											 </div> <!-- End of parameter -->	
										  </div> <!-- End of form wrapper -->				
									</div><!-- End of table Actions Wrapper -->
									
									<div class="tableActionsWrapper hideBlock hideOnLoadST" id="tablefilters">
									   
									 <div class="tableActionsWrapper hideBlock"  id="baseCountFilterDiv"><div class="formWrapper">
										  <div class="formWrapper alignParameter">
												<div class="parameter">
													<label for="aisles">Aisles</label>
													<div id="articleCountAisleDrpDwnDiv" class="selectDropdown"><label id="articleCountAisleDrpDwnActiveId" class="selectLabel"><a  id="articleCountAisleDrpDwnLabel">All Aisles</a></label>
														<ul class="dropdown" id="articleCountAisleDrpDwnUl">
															<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="articleCountallAisleChkBox" name="articleCountallAisleChkBox"><label class="dropdownLabel" for="">All Aisles</label></li></div>
														</ul>
													</div>
													 <!-- "SC-526  -->
													<div class="searchByOptions onlyCheckbox hideBlock">
														<input type="checkbox" class="baseAisleH" value="baseAisleH" name="baseAisleH" id="baseAisleH"><label class="labelText" for="baseAisleH">Select bays </label>
													</div>
												</div> <!-- End of parameter -->
												
												<div class="parameter">
													<label for="article">Users</label>
													<div id="articleCountUsrDrpDwnDiv" class="selectDropdown"><label id="articleCountUsrDrpDwnActiveId" class="selectLabel"><a  id="articleCountUsrDrpDwnLabel">All Users</a></label>
														<ul class="dropdown" id="articleCountUsrDrpDwnUl">
															<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="articleCountallUsrChkBox" name="articleCountallUsrChkBox"><label class="dropdownLabel" for="">All Users</label></li></div>
														</ul>
													</div>												
												</div> <!-- End of parameter -->
												
																					
												<div class="hierarchyWrapper clearfix hideBlock baseBaysHierarchy" id="baseBaysHId">
																		
													<!-- Department -->
													<div class="hierarchyContent" id="baystDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="aisleSelectAll">Aisles</h3> 
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
															<ul id="aisleLst"></ul>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount">
																<label>Total Selected:<strong id="aisleLstCnt">10</strong></label>
															</span>							
																				
														</div> <!-- End of hierarchy bottom -->
														
													</div> <!-- End of hierarchy Content --> 	
																													
														<div class="hierarchyContent sideContent" id="sideDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="sideSelectAll">Side</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection" id="sidenoSelection">
																<label>Please select any aisle to select bays.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div id="parentSideDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span id="sideLstTotal" class="totalCountSide hideBlock">
																<label>Total Selected:<strong id="sideLstCnt">5</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
													
													<div class="hierarchyContent lastContent" id="bayDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="baySelectAll">Bays</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection" id="baynoSelection">
																<label>Please select any aisle & side to select bays.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div id="parentBayDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span id="bayLstTotal" class="totalCount hideBlock">
																<label>Total Selected:<strong id="bayLstCnt">5</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
												
											</div> <!-- end of hierarchy Wrapper -->
											
												
												
												
												<div class="parameter clearfix">
													<label for="articleCountLocDrpDwnActiveId">Other Locations</label>
													<div id="articleCountLocDrpDwnDiv" class="selectDropdown"><label id="articleCountLocDrpDwnActiveId" class="selectLabel"><a id="articleCountLocDrpDwnLabel">All Locations</a></label>
														<ul class="dropdown" id="articleCountLocDrpDwnUl">
															<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="articleCountallLocChkBox" name="articleCountallLocChkBox"><label class="dropdownLabel" for="">All Locations</label></li></div>
														</ul>
													</div>
													<!-- "SC-526  -->
													<div class="searchByOptions onlyCheckbox hideBlock">
														<input type="checkbox" id="articleCountLocH" value="locinner" name="locinner"><label class="labelText" for="articleCountLocH">Select sub-locations</label>
													</div>
												</div> <!-- End of parameter -->
												<div class="hierarchyWrapper clearfix hideBlock" id="articleCountLocHierarchyId">
																		
													<!-- Department -->
													<div class="hierarchyContent">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="locSelectAll">Other Locations</h3> 
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
															<ul class="locLst"></ul>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount">
																<label>Total Selected:<strong class="locLstCnt">10</strong></label>
															</span>							
																				
														</div> <!-- End of hierarchy bottom -->
														
													</div> <!-- End of hierarchy Content --> 																	
													
													<div class="hierarchyContent lastContent sublocDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="sublocSelectAll">Sub-locations</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection sublocnoSelection">
																<label>Please select any location to select sub-locations.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div class="parentSublocDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock sublocLstTotal">
																<label>Total Selected:<strong id="sublocLstCnt">5</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
												
											</div> <!-- end of hierarchy Wrapper -->
												
												<div class="parameter clearfix">
													<label for="dept">Departments</label>
													<div id="articleCountDeptDrpDwnDiv" class="selectDropdown"><label id="articleCountDeptDrpDwnActiveId" class="selectLabel"><a  class = "drpDwnLbl" id="articleCountDeptDrpDwnLabel">All departments</a></label>
														<ul class="dropdown" id="articleCountDeptDrpDwnUl">
															<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="articleCountallDeptChkBox" name="articleCountallDeptChkBox"><label class="dropdownLabel" for="">All departments</label></li></div>
														</ul>
													</div>
													<div class="searchByOptions onlyCheckbox">
														<input type="checkbox" id="basedepH" value="depH" name="depH"><label class="labelText" for="basedepH">Select multiple departments or sub-categories</label>
													</div>
												</div> <!-- End of parameter -->
																
																					
												<div class="hierarchyWrapper clearfix hideBlock" id="baseCountArticleHierarchyId">
																		
													<!-- Department -->
													<div class="hierarchyContent deptDiv" >				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="deptSelectAll">Department</h3> 
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
															<ul class="deptlst">
							
															</ul>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount">
																<label>Total Selected:<strong class="deptLstCnt">0</strong></label>
															</span>							
																				
														</div> <!-- End of hierarchy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
																		
													<!-- Category -->
													<div class="hierarchyContent catDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="catSelectAll">Category</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection noSelectionCat">
																<label>Please select any department to see it's associated categories.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															<div class="parentCatDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock categoryLstTotal">
																<label>Total Selected:<strong class="catLstCnt">0</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
													<!-- Sub-category -->
													<div class="hierarchyContent subCatDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="sCatSelectAll">Sub-category</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection noSelectionSub">
																<label>Please select any category to see sub-categories.</label>
															</div> <!-- End of -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div class="parentSCatDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock subCatTotal">
																<label>Total Selected:<strong class="sCatLstCnt">0</strong></label>
															</span>			
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
																		
													<!-- Segment -->
													<div class="hierarchyContent lastContent segDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="segSelectAll">Segment</h3>
														</div> <!-- End of hierarchy Title -->								
														
														<div class="hierarchyList">
															
															<div class="noSelection noSelectionSeg">
																<label>Please select any sub-category to see segments.</label>
															</div> <!-- End of -->
															
															<label class="loading hideBlock">&nbsp;</label>
														
															<div class="parentSegDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock segmentTotal">
																<label>Total Selected:<strong class="segLstCnt">0</strong></label>
															</span>							
																				
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 

												
											</div> <!-- end of hierarchy Wrapper -->
								
											
																
												<div class="formActions">
													<label class="actionBtn" id="baseCountFilterBtn"><a>Apply</a></label>
													<label class="secondaryActionBtn closeLink" id="baseCountcloseLink"><a>Cancel</a></label>						
												</div> <!-- End of form actions -->
												
												
										  </div> <!-- End of form wrapper -->	</div></div>			
									</div><!-- End of table Actions Wrapper -->
												
								
									<div id="reportContent0" class="displayArea" style=""></div>	
								
								</div> <!-- End of content table wrapper -->
							
							</div>
							<div id="promo-2">
								<div class="ContentTableWrapper">
								
													
									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle" id="articleCountBeingCountedCount">Articles Being Counted:</h2>
										</div>									
									</div>
									
									
									<div class="articleContent orderDetails">
										
														
										<div class="articleContentInner">
										
											<div class="articleDetails">
										
										
												<table cellspacing="0" class="" width="100%">
													
													<tr>
														<td class="keyInfo" width="8%">
															Aisles:
														</td>
														<td class="valueInfo aisleCol" width="15%">
															
														</td>	

														<td class="keyInfo" width="8%">	
															Sub-categories:
														</td>
														<td class="valueInfo subCatCol" width="35%">
															
														</td>											
														<td class="keyInfo" width="8%">
															Users:
														</td>
														<td class="valueInfo lastColumn userCol" width="25%">
															
														</td>															
													</tr>
													<tr>
														<td class="keyInfo">
															Other Locations:
														</td>
														<td class="valueInfo locCol" colspan="5">
															
														</td>	

																												
													</tr>
													
													
													
													
												</table>
											</div>  <!-- End of article details -->											
										</div> <!-- End of article content inner -->
												
										
									</div><!-- End of article content -->
									
									
								<div class="tableInfo emptyTable hideBlock">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>List of all being counted articles</strong></h5>
										  <!-- Not to tech team: Change label 'List of all completed articles' to 'List of articles (##)' when user applies filter -->
									   </div>
										<div class="tableActionBtns stDtlActionBtns" style="margin-top:0">
											<label class="actionBtn"><a  class="articleCntExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label id="" class="articleCountPrintBtn print">Print</label></a></label>				
										</div>
										
										<div class="instructionalText stDtlActionBtns" id="instructionalText1">
											<label>Before printing, use 'Filters' to view specific articles.</label>
										</div>
									</div> <!-- End of table info -->	
										
								
								</div> <!-- End of content table wrapper -->
							</div>
							<div id="promo-3">
								
								<div class="ContentTableWrapper">
								
													
									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle" id="articleCountNotCountedCount">Articles Not Counted:</h2>
										</div>									
									</div>
									
									
									<div class="articleContent orderDetails">
										
														
										<div class="articleContentInner">
										
											<div class="articleDetails">
										
										
												<table cellspacing="0" class="" width="100%">
													
													<tr>
														<td class="keyInfo" width="8%">
															Aisles:
														</td>
														<td class="valueInfo aisleCol" width="15%">
															
														</td>	

														<td class="keyInfo" width="8%">	
															Sub-categories:
														</td>
														<td class="valueInfo subCatCol" width="35%">
															
														</td>											
														<td class="keyInfo noDivider" width="8%">
															
														</td>
														<td class="valueInfo lastColumn" width="25%">
															
														</td>															
													</tr>
													<tr>
														<td class="keyInfo">
															Other Locations:
														</td>
														<td class="valueInfo locCol" colspan="5">
															
														</td>	

																												
													</tr>
													
													
													
													
												</table>
											</div>  <!-- End of article details -->											
										</div> <!-- End of article content inner -->
												
										
									</div><!-- End of article content -->
									
								<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>List of all not counted articles</strong></h5>
										  <!-- Not to tech team: Change label 'List of all completed articles' to 'List of articles (##)' when user applies filter -->
									   </div>
										<div class="tableActionBtns stDtlActionBtns" style="margin-top:0">
											<label class="actionBtn"><a  class="articleCntExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label id="" class="articleCountPrintBtn print">Print</label></a></label>				
										</div>
										
										<div class="instructionalText stDtlActionBtns" id="instructionalText1">
											<label>Before printing, use 'Filters' to view specific articles.</label>
										</div>
									</div> <!-- End of table info -->
								
								</div> <!-- end of content table wrapper -->
							
							</div> <!-- End of promo 3 -->
							
												
						</div> <!-- End of filter tabs -->
				
					</div> <!-- End of main tab 7 -->
					
					
					<div id="mainTabs-2" class="tabContent">
						
						<div id="missedArticlesTabs" class="filterTabs ContentTableWrapper">
							
							
							<ul>
							    <li><a href="#missed-1" id="missedArticlePendingLabel">Pending</a></li>
								<li><a href="#missed-2" id="missedArticleInProgressLabel">In-progress</a></li>
								<li><a href="#missed-3" id="missedArticleCompletedLabel">Completed</a></li>								
							</ul>
							<div id="missed-1">
								<div class="ContentTableWrapper">
								
													
									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle" id="missedArticlePendingCount">Missed Articles:</h2>											
										</div>									
									</div>
									
									
									<div class="articleContent orderDetails">
										
														
										<div class="articleContentInner">
										
											<div class="articleDetails">
										
										
												<table cellspacing="0" class="" width="100%">
													
													<tr>
														<td class="keyInfo" width="8%">	
															Sub-categories:
														</td>
														<td class="valueInfo lastColumn subCatCol" width="35%">
															
														</td>																										
													</tr>
													
													
													
													
													
												</table>
											</div>  <!-- End of article details -->											
										</div> <!-- End of article content inner -->
												
										
									</div><!-- End of article content -->
									
									
									
									
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>List of all pending missed articles</strong></h5>
									   </div>
										<div class="tableActionBtns stDtlActionBtns" style="margin-top:0">
											<label class="actionBtn"><a  class="missArticleExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label class="print missedArticlesPrintBtn">Print</label></a></label>				
										</div>
										
										<div class="instructionalText stDtlActionBtns" id="instructionalText1">
											<label>Before printing, use 'Filters' to view specific articles.</label>
										</div>
									</div> <!-- End of table info -->
					
									<div id="reportContent1" class="displayArea"></div>	
									
									
	
									
								</div> <!-- End of content table wrapper -->
							</div>
							<div id="missed-2">
								<div class="ContentTableWrapper">
								
													
									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle" id="missedArticleInProgressCount">Articles Being Counted:</h2>
										</div>									
									</div>
									
									
									<div class="articleContent orderDetails">
										
														
										<div class="articleContentInner">
										
											<div class="articleDetails">
										
										
												<table cellspacing="0" class="" width="100%">
													
													<tr>
														<td class="keyInfo" width="8%">	
															Sub-categories:
														</td>
														<td class="valueInfo lastColumn subCatCol" width="35%">
															
														</td>																										
													</tr>
													
													
													
													
													
												</table>
											</div>  <!-- End of article details -->											
										</div> <!-- End of article content inner -->
												
										
									</div><!-- End of article content -->
									
									<div class="tableActionsBtnsWrapper  hideBlock" id="missedArticleFilterButtonDiv">
									   <div class="lookupActionWrapper">
										  <label id="filterOpen2" class="linkBtn">
												<a ><label class="filter">Filters</label></a>								
                                          </label>
										  <label id="filterClear2" class="linkBtn hideBlock">
												<a ><label class="negativeFlag">Clear Filters</label>	</a>								
                                          </label>
										
										  
									   </div> <!-- End of lookup action wrapper -->					  
									</div> <!-- End of table action wrapper -->
					
					
					
									
									<div class="tableActionsWrapper hideBlock hideOnLoadST margin-bottom10px" id="tablefilters2" >
									   
									 
										 
										  <div class="tableActionsWrapper hideBlock"  id="missedArticlesFilterDiv"><div class="formWrapper alignParameter">	
												
												
																					
												<div class="hierarchyWrapper clearfix hideBlock" id="missedArticleHId">
																		
													<!-- Department -->
													<div class="hierarchyContent" id="baystDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="aisleSelectAll">Aisles</h3> 
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
															<ul id="aisleLst"></ul>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount">
																<label>Total Selected:<strong id="aisleLstCnt">10</strong></label>
															</span>							
																				
														</div> <!-- End of hierarchy bottom -->
														
													</div> <!-- End of hierarchy Content --> 																	
													
													<div class="hierarchyContent lastContent" id="bayDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="baySelectAll">Bays</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection" id="baynoSelection">
																<label>Please select any aisle to select bays.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div id="parentBayDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span id="bayLstTotal" class="totalCount hideBlock">
																<label>Total Selected:<strong id="bayLstCnt">5</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
												
											</div> <!-- end of hierarchy Wrapper -->
											
												
												
												
												
												<div class="parameter clearfix" id="missed-dept-cont">
													<label for="dept">Departments</label>
													<div id="missedArticlesDeptDrpDwnDiv" class="selectDropdown"><label id="missedArticlesDeptDrpDwnActiveId" class="selectLabel"><a class = "drpDwnLbl"  id="missedArticlesDeptDrpDwnLabel">All departments</a></label>
														<ul class="dropdown" id="missedArticlesDeptDrpDwnUl">
															<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="missedArticlesallDeptChkBox" name="missedArticlesallDeptChkBox"><label class="dropdownLabel" for="">All departments</label></li></div>
														</ul>
													</div>
													<div class="searchByOptions onlyCheckbox">
														<input type="checkbox" id="missedArtilcedepH" value="depH" name="depH"><label class="labelText" for="missedArtilcedepH">Select multiple departments or sub-categories</label>
													</div>
												</div> <!-- End of parameter -->
																
																					
												<div class="hierarchyWrapper clearfix hideBlock" id="missedArticleHierarchyId">
																		
													<!-- Department -->
													<div class="hierarchyContent deptDiv" >				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="deptSelectAll">Department</h3> 
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
															<ul class="deptlst">
							
															</ul>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount">
																<label>Total Selected:<strong class="deptLstCnt">0</strong></label>
															</span>							
																				
														</div> <!-- End of hierarchy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
																		
													<!-- Category -->
													<div class="hierarchyContent catDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="catSelectAll">Category</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection noSelectionCat">
																<label>Please select any department to see it's associated categories.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															<div class="parentCatDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock categoryLstTotal">
																<label>Total Selected:<strong class="catLstCnt">0</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
													<!-- Sub-category -->
													<div class="hierarchyContent subCatDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="sCatSelectAll">Sub-category</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection noSelectionSub">
																<label>Please select any category to see sub-categories.</label>
															</div> <!-- End of -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div class="parentSCatDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock subCatTotal">
																<label>Total Selected:<strong class="sCatLstCnt">0</strong></label>
															</span>			
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
																		
													<!-- Segment -->
													<div class="hierarchyContent lastContent segDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="segSelectAll">Segment</h3>
														</div> <!-- End of hierarchy Title -->								
														
														<div class="hierarchyList">
															
															<div class="noSelection noSelectionSeg">
																<label>Please select any sub-category to see segments.</label>
															</div> <!-- End of -->
															
															<label class="loading hideBlock">&nbsp;</label>
														
															<div class="parentSegDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock segmentTotal">
																<label>Total Selected:<strong class="segLstCnt">0</strong></label>
															</span>							
																				
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 

												
											</div> <!-- end of hierarchy Wrapper -->
																							
												<hr class="sectionDivider clearfix">
												
												<div class="parameter clearfix parameterRow">
																			
													
													<span class="multipleOptions">
														<span class="option">
															<label>Exclude articles not sold for <input type="#" class="textbox textboxDefaultText numberBox greyedText" maxlength="2" id="exDaysChk"  value="28"> days</label>
																								
														</span> <!-- End of options -->														
													</span> <!-- End of multiple options -->
													
												
												</div> <!-- End of parameter -->
												
												
												
												<div class="parameter clearfix onlyCheckbox">							
													<input type="checkbox" name="exArtSohChk" value="exArtSohChk" id="exArtSohChk"><label for="exArtSohChk" class="labelText">Exclude Articles without a SOH value</label>		
														
												</div>
												
												
												
												<div class="formActions">
													<label class="actionBtn" id="missedArticlesFilterBtn"><a >Apply</a></label>
													<label class="secondaryActionBtn closeLink" id="missedArticlescloseLink"><a >Cancel</a></label>						
												</div> <!-- End of form actions -->
												
												
										  </div> <!-- End of form wrapper -->	</div>			
									</div><!-- End of table Actions Wrapper -->
												
								
									 <div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>List of all in progress missed articles</strong></h5>
									   </div>
										<div class="tableActionBtns stDtlActionBtns" style="margin-top:0">
											<label class="actionBtn"><a  class="missArticleExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label class="print missedArticlesPrintBtn">Print</label></a></label>				
										</div>
						
									   <div class="instructionalText stDtlActionBtns" id="instructionalText1">
											<label>Before printing, use 'Filters' to view specific articles.</label>
										</div>
									</div> <!-- End of table info -->
									
									<div id="reportContent2" class="displayArea"></div>	
										
								
								</div> <!-- End of content table wrapper -->
							</div>
							<div id="missed-3">
								
								<div class="ContentTableWrapper">
								
													
									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle" id="missedArticleCompletedCount">Articles Counted:</h2>
										</div>									
									</div>
									
									
									<div class="articleContent orderDetails">
										
														
										<div class="articleContentInner">
										
											<div class="articleDetails">
										
										
												<table cellspacing="0" class="" width="100%">
													
													<tr>
														<td class="keyInfo" width="8%">	
															Sub-categories:
														</td>
														<td class="valueInfo subCatCol" width="35%">
															
														</td>																										
													</tr>
													
													
													
													
													
												</table>
											</div>  <!-- End of article details -->											
										</div> <!-- End of article content inner -->
												
										
									</div><!-- End of article content -->
									
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>List of all completed missed articles</strong></h5>
									   </div>
										<div class="tableActionBtns stDtlActionBtns" style="margin-top:0">
											<label class="actionBtn"><a  class="missArticleExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label class="print missedArticlesPrintBtn">Print</label></a></label>				
										</div>
										
										<div class="instructionalText stDtlActionBtns" id="instructionalText1">
											<label>Before printing, use 'Filters' to view specific articles.</label>
										</div>
									</div> <!-- End of table info -->
									
									<div id="reportContent3" class="displayArea"></div>	
									
									<!--Defect_4384 commented><!-- <p class="notes warningMessage"><label>To view completed articles, click on the first tab under 'Completion Summary' i.e. '1. Base Count'. </label></p> -->									
									
								</div> <!-- end of content table wrapper -->
							
							</div> <!-- End of promo 3 -->
							
												
						</div> <!-- End of filter tabs -->
				
					</div> <!-- End of main tab 7 -->
					
					
					<div id="mainTabs-3" class="tabContent">
					
						
						<div id="varianceReportTabs" class="filterTabs ContentTableWrapper">
							
							
							<ul>
							    <li><a href="#review-1" id="varaincePendingLabel">Pending</a></li>
								<li><a href="#review-2" id="varianceInProgressLabel">In-progress</a></li>
								<li><a href="#review-3" id="varianceCompletedLabel">Completed</a></li>								
							</ul>
							<div id="review-1">
							
								<div class="ContentTableWrapper">
								
													
									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle" id="variancePendingCount">Pending Review - Total Value($): </h2>											
										</div>		
										
										<!-- <div class="articleInfoWrapper">				
											<p class="secondaryInfo">
												<label class="articlePriceLabel">Department: <strong class="summaryDeptStr"></strong> </label>
												<label class="articlePriceLabel">|</label>
												
												<label class="articlePriceLabel">Sub-categories: <strong></strong></label>
												
											</p>
										</div> -->

										
									</div>
									
									
									<div class="articleContent orderDetails">
										
														
										<div class="articleContentInner">
										
											<div class="articleDetails">
										
										
												<table cellspacing="0" class="" width="100%">
													
													<tr>
														<td class="keyInfo" width="8%">
															Departments:
														</td>
														
														<td class="valueInfo deptCol" width="35%">
															
														</td>
														<td class="keyInfo" width="8%">
															Sub-categories:
														</td>
														
														<td class="valueInfo subCatCol lastColumn"  width="35%">
															
														</td>															
													</tr>
													
													
													
													
													
												</table>
											</div>  <!-- End of article details -->											
										</div> <!-- End of article content inner -->
												
										
									</div><!-- End of article content -->
									
									
									
								
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>List of all pending sub-categories and articles</strong></h5>
									   </div>
										<div class="tableActionBtns stDtlActionBtns" style="margin-top:0">
											<label class="actionBtn"><a  id="varianceExportBtn" class="varianceExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label class="print variancePrintBtn" id="">Print</label></a></label>				
										</div>
										
										<div class="instructionalText stDtlActionBtns" id="instructionalText1">
											<label>Before printing, use 'Filters' to view specific articles.</label>
										</div>
									</div> <!-- End of table info -->
					
					
									<div class="tableActionsBtnsWrapper hideBlock" id="varianceFilterButtonDiv">
									   <div class="lookupActionWrapper">
										  <label id="filterOpen3" class="linkBtn">
												<a ><label class="filter">Filters</label></a>								
                                          </label>
										  <label id="filterClear3" class="linkBtn hideBlock">
												<a ><label class="negativeFlag">Clear Filters</label>	</a>								
                                          </label>
										
										  
									   </div> <!-- End of lookup action wrapper -->					  
									</div> <!-- End of table action wrapper -->
					
					
					
									
									<div class="tableActionsWrapper hideBlock hideOnLoadST" id="tablefilters3">
										  

										 <div class="tableActionsWrapper hideBlock"  id="varianceFilterDiv"><div class="formWrapper alignParameter">	
												
													
												
												
												
												<div class="parameter clearfix">
													<label for="dept">Departments</label>
													<div id="varianceReportDeptDrpDwnDiv" class="selectDropdown"><label id="varianceReportDeptDrpDwnActiveId" class="selectLabel"><a class = "drpDwnLbl"  id="varianceReportDeptDrpDwnLabel">All departments</a></label>
														<ul class="dropdown" id="varianceReportDeptDrpDwnUl">
															<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="varianceReportallDeptChkBox" name="varianceReportallDeptChkBox"><label class="dropdownLabel" for="">All departments</label></li></div>
														</ul>
													</div>
													<div class="searchByOptions onlyCheckbox">
														<input type="checkbox" id="varianceArticleH" value="depH" name="depH"><label class="labelText" for="varianceArticleH">Select multiple departments or sub-categories</label>
													</div>
												</div> <!-- End of parameter -->
												
												<div class="hierarchyWrapper clearfix hideBlock" id="varianceReportArticleHierarchyId">
																		
													<!-- Department -->
													<div class="hierarchyContent deptDiv" >				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="deptSelectAll">Department</h3> 
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
															<ul class="deptlst">
							
															</ul>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount">
																<label>Total Selected:<strong class="deptLstCnt">0</strong></label>
															</span>							
																				
														</div> <!-- End of hierarchy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
																		
													<!-- Category -->
													<div class="hierarchyContent catDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="catSelectAll">Category</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection noSelectionCat">
																<label>Please select any department to see it's associated categories.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															<div class="parentCatDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock categoryLstTotal">
																<label>Total Selected:<strong class="catLstCnt">0</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
													<!-- Sub-category -->
													<div class="hierarchyContent subCatDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="sCatSelectAll">Sub-category</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection noSelectionSub">
																<label>Please select any category to see sub-categories.</label>
															</div> <!-- End of -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div class="parentSCatDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock subCatTotal">
																<label>Total Selected:<strong class="sCatLstCnt">0</strong></label>
															</span>			
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
																		
													<!-- Segment -->
													<div class="hierarchyContent lastContent segDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="segSelectAll">Segment</h3>
														</div> <!-- End of hierarchy Title -->								
														
														<div class="hierarchyList">
															
															<div class="noSelection noSelectionSeg">
																<label>Please select any sub-category to see segments.</label>
															</div> <!-- End of -->
															
															<label class="loading hideBlock">&nbsp;</label>
														
															<div class="parentSegDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock segmentTotal">
																<label>Total Selected:<strong class="segLstCnt">0</strong></label>
															</span>							
																				
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 

												
											</div> <!-- end of hierarchy Wrapper -->													
												<!-- <div class="parameter parameterRow clearfix ">
													<label for="addi">Variance Criteria</label>
													<span class="multipleOptions">
														<span class="option">
															<label>OM Greater than</label>													
															<input type="#" class="textbox numberBox" id="om_gt">
														</span>
													</span>
													<span class="multipleOptions ">
														<span class="option">
															<label>Qty Greater than</label>													
															<input type="#" class="textbox numberBox" id="qty_gt">
														</span>
													</span>
													<span class="multipleOptions ">
														<span class="option">
															<label>$ Value Greater than</label>													
															<input type="#" class="textbox numberBox" id="value_gt">
														</span>
													</span>	
													
												</div>
												<div class="parameter parameterRow clearfix ">
												<label for="addi"></label>
													<span class="multipleOptions">
														<span class="option">
															<label>OM Lesser than </label>													
															<input type="#" class="textbox numberBox" id="om_gt">
														</span>
													</span>
													<span class="multipleOptions ">
														<span class="option">
															<label>Qty Lesser than </label>													
															<input type="#" class="textbox numberBox" id="qty_gt">
														</span>
													</span>
													<span class="multipleOptions ">
														<span class="option">
															<label>$ Value Lesser than </label>													
															<input type="#" class="textbox numberBox" id="value_gt">
														</span>
													</span>	
													
												</div>  --><!-- End of parameter -->
											<!-- Release 17.07 Variance Filter Crieteria changes -->
											<div id="addParameterVar">
											<div class="parameterOptionsInputBoxVar articleList" id="">								
											<div class="parameter parameterRow clearfix ">
												<label for="addi" id="addCriteriaLabel">Variance Criteria</label>
												<!-- <label class="linkBtn addActionBtn varLableList" style="padding-right: 31px !important;">OM</label> -->
												<input value="OM" readonly class="textbox numberBox" style="width: 40px;text-align: left;">
												<span class="multipleOptions">
												<label>Greater than  </label>													
												<input type="#" name = "GT" class="textbox numberBox weight-box decimalTextBox valueCritOm" >
												<label class="space">&nbsp;&nbsp;</label>
												<label>Less than  </label>													
												<input type="#" name = "LT" class="textbox numberBox weight-box decimalTextBox valueCritLessOm" >
												</span>
											</div> 
											</div>
											</div>
											
											<div id="newParameterVar1">
											<div class="parameterOptionsInputBoxVar varAddList" id="">								
											<div class="parameter parameterRow clearfix ">
												<label for="addi" id="addCriteriaLabel"></label>
												
												<!-- <label class="linkBtn addActionBtn varLableList" style="padding-right: 26px !important;">QTY</label> -->
												<input value="QTY" readonly class="textbox numberBox" style="width: 40px;text-align: left;">
												<span class="multipleOptions"> 
													<label>Greater than  </label>			
													<input type="#" name = "GT" class="textbox numberBox weight-box decimalTextBox valueCritQty" >
													<label class="space">&nbsp;&nbsp;</label>
													<label>Less than  </label>			
													<input type="#" name = "LT" class="textbox numberBox weight-box decimalTextBox valueCritLessQty" >
												</span>
											</div> 
											</div>
											</div>
											<div id="newParameterVar2">
											<div class="parameterOptionsInputBoxVar varAddList" id="">								
											<div class="parameter parameterRow clearfix ">
											<label for="addi" id="addCriteriaLabel"></label>
												<!-- <label class="linkBtn addActionBtn varLableList" style="padding-right: 9px !important;">$ Value</label> -->
												<input value="$ Value" readonly class="textbox numberBox" style="width: 40px;text-align: left;">
												<span class="multipleOptions"> 
													<label>Greater than  </label>
													<input type="#" name = "GT" class="textbox numberBox weight-box decimalTextBox valueCritValue" >
													<label class="space">&nbsp;&nbsp;</label>
													<label>Less than  </label>	
													<input type="#" name = "LT" class="textbox numberBox weight-box decimalTextBox valueCritLessValue" >
												</span>
											</div>
											</div>
											</div>
											<!-- Release 17.07 Variance Filter Crieteria changes -->
												
												<div class="formActions">
													<label class="actionBtn" id="varianceFilterBtn"><a >Apply</a></label>
													<label class="secondaryActionBtn closeLink" id="varcloseLink"><a >Cancel</a></label>						
												</div> <!-- End of form actions -->
												
												
										  </div> <!-- End of form wrapper -->	</div>			
									</div><!-- End of table Actions Wrapper -->
													
									<div id="reportContent2_pend" class="displayArea emptyTable"></div>	
										
										<div class="tableFooter varianceFooter stDtlActionBtns variance-foot">
										
										<!--	<div class="legend">
												 <label> Legend: <label class="pb">Pack Breakdown</label> <label class="linked">Linked</label> <label class="d">Deleted</label><label class="style">Style</label><label class="d">Product Recalled</label></label> 
											</div> -->
																					
											<!--<div class="pageActions ">											 
											    <label id="acceptVariance" class="actionBtn actionModeST"><a ><label class="thumbUp">Accept Variance</label></a></label>											  
											</div> -->
											
										</div>
									
								</div> <!-- End of content table wrapper -->
							
							</div>
							
							<div id="review-2">
								<div class="ContentTableWrapper">
								
													
									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle" id="varianceInProgressCount">Articles Being Counted:</h2>
										</div>									
									</div>
									
									
									<div class="articleContent orderDetails">
										
														
										<div class="articleContentInner">
										
											<div class="articleDetails">
										
										
												<table cellspacing="0" class="" width="100%">
													
													<tr>
														<td class="keyInfo" width="8%">
															Departments:
														</td>
														<td class="valueInfo deptCol" width="35%">
															
														</td>	

														<td class="keyInfo" width="8%">	
															Sub-categories:
														</td>
														<td class="valueInfo subCatCol lastColumn" width="35%">
															
														</td>																										
													</tr>
													
													
													
													
													
												</table>
											</div>  <!-- End of article details -->											
										</div> <!-- End of article content inner -->
												
										
									</div><!-- End of article content -->
									
									
									<div class="tableInfo">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>List of all in-progress sub-categories and articles</strong></h5>
									   </div>
										<div style="margin-top:0" class="tableActionBtns stDtlActionBtns">
											<label class="actionBtn"><a ><label class="export">Export</label></a></label><label class="actionBtn"><a ><label class="print">Print</label></a></label>				
										</div>
										
									</div>

									<div id="reportContent2_ip" class="displayArea emptyTable"></div>												
									
								</div> <!-- End of content table wrapper -->
							</div>
							<div id="review-3">
								
								<div class="ContentTableWrapper">
								
													
									<div class="articleHead">
										<div class="articleHeaderWrapper">
											<h2 class="articleTitle" id="varianceCompletedCount">Articles Counted:</h2>
										</div>									
									</div>
									
									<div class="articleContent orderDetails">
										
														
										<div class="articleContentInner">
										
											<div class="articleDetails">
										
										
												<table cellspacing="0" class="" width="100%">
													
													<tr>
														<td class="keyInfo" width="8%">
															Departments:
														</td>
														<td class="valueInfo deptCol" width="35%">
															
														</td>	

														<td class="keyInfo" width="8%">	
															Sub-categories:
														</td>
														<td class="valueInfo subCatCol lastColumn" width="35%">
															
														</td>																									
													</tr>
													
													
													
													
													
												</table>
											</div>  <!-- End of article details -->											
										</div> <!-- End of article content inner -->
												
										
									</div><!-- End of article content -->
									
									
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>List of all completed sub-categories and articles</strong></h5>
									   </div>
										<div style="margin-top:0" class="tableActionBtns stDtlActionBtns">
											<label class="actionBtn"><a id="varianceExportBtn" class="varianceExportBtn"><label class="export">Export</label></a></label><label class="actionBtn variancePrintBtn"><a ><label class="print">Print</label></a></label>				
										</div>
										
									</div>

													
									<div id="reportContent2_comp" class="displayArea"></div>
									
									<div class="tableFooter varianceFooter stDtlActionBtns  variance-foot">
										<!--<div class="legend">
											 <label> Legend: <label class="pb">Pack Breakdown</label> <label class="linked">Linked</label> <label class="d">Deleted</label><label class="style">Style</label><label class="d">Product Recalled</label></label>										
										</div> -->	 
										
										 <!--<div class="pageActions ">											 
										   <label id="finaliseStocktake" class="actionBtn actionModeST finaliseStocktakeClass"><a ><label class="thumbUp">Finalise Stocktake</label></a></label>											  
										</div>  -->
										
									</div>
								</div> <!-- end of content table wrapper -->
							
							</div> <!-- End of promo 3 -->
							
												
						</div> <!-- End of filter tabs -->
				
					
					</div> <!-- End of main tab 3 -->	
				
					<div id="mainTabs-4" class="tabContent">
						<div class="ContentTableWrapper">
							
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong id="auditSummaryTotalCount">List of articles audited</strong></h5>
										
									   </div>
									   <div  class="tableActionBtns">
											<label class="actionBtn"><a  id="auditExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label class="print" id="auditSummaryPrintBtn">Print</label></a></label>				
										</div>
										
									</div> <!-- End of table info -->
					
					
									<!-- <div class="tableActionsBtnsWrapper">
									   <div class="lookupActionWrapper">
										 
										  
										  <label class="linkBtn groupByOpen"  id="groupByOpena"><a ><label class="group">Group By</label></a></label>
										  <label class="linkBtn groupByClear hideBlock" id="groupByCleara"><a ><label class="negativeFlag">Clear Group By</label></a></label>
										  
									   </div> End of lookup action wrapper					  
									</div> End of table action wrapper -->
					
					
					
									<div class="tableActionsWrapper hideBlock" id="tableAddActiona">
									   
									 
										  <div class="formWrapper">
											 <div class="parameter">
												<label for=""  class="">Group By</label>
												<input type="radio" id="aus" value="audit" name="audit" checked><label class="labelText" for="aus">Sub-category</label> 
												<input type="radio" id="auu" value="audit" name="audit"><label class="labelText" for="auu">User </label> 
												
											 </div> <!-- End of parameter -->	
										  </div> <!-- End of form wrapper -->				
									</div><!-- End of table Actions Wrapper -->
												
								
									<div id="reportContent3_audit" class="displayArea"></div>	
								
							
						</div> <!-- End of content table wrapper -->
					</div>
				
					<div id="mainTabs-5" class="tabContent">
						
								<div class="ContentTableWrapper">
								
									
									
									
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>Stock Valuation</strong></h5>
										
									   </div>
										
										<div class="tableActionBtns" >
											<label class="actionBtn"><a ><label class="refresh" id="stockValuationRefreshId">Refresh</label></a></label><label class="actionBtn"><a  id="stockValueExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label class="print" id="stockValuationPrintBtn">Print</label></a></label>				
										</div>
										
										
									</div> <!-- End of table info -->
					
					
									<div id="reportContent6" class="displayArea"></div>	
								
									
								
								
								</div> <!-- End of content table wrapper -->
							
					</div> <!-- End of main tabs 7 -->
				
					<div id="mainTabs-6" class="tabContent">
						
								<div class="ContentTableWrapper">
									
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>Team Performance</strong></h5>
									   </div>
										<div class="tableActionBtns stDtlActionBtns" >
											<label class="actionBtn"><a  id="teamPerfExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label class="print" id="teamPerformancePrintBtn">Print</label></a></label>				
										</div>
										
									
									</div> <!-- End of table info -->
					
					
									<div class="tableActionsBtnsWrapper emptyTable">
									   <div class="lookupActionWrapper">
										  <label id="filterOpent" class="linkBtn">
												<a ><label class="filter">Filters</label></a>								
                                          </label>
										  <label id="filterCleart" class="linkBtn hideBlock">
												<a ><label class="negativeFlag">Clear Filters</label>	</a>								
                                          </label>
										 
										  
										   <div class="tableActionsExtra">
											  <span class="check-mpl-sc"><strong>Show variance in:</strong>
												
												<input type="radio" id="MPK1" value="EA" name="searchByMPLSC" checked><label class="labelText" for="MPK1">EA</label> 
												<input type="radio" id="Fac" value="OM" name="searchByMPLSC"><label class="labelText" for="Fac">OM</label> 											
												</span>
											</div>
											
										  
									   </div> <!-- End of lookup action wrapper -->					  
									</div> <!-- End of table action wrapper -->
					
									
									
									<div class="tableActionsWrapper hideBlock" id="teamPerfFilterDiv">
									   
									 
										  <div class="formWrapper alignParameter">
												
											<div id="addParameter">				
								
											<div class="parameter parameterRow clearfix varianceCrit">
												<label for="addi">Variance Criteria</label>
												
												<span class="multipleOptions">
													<select class="selectOptions criteria">								
														<option title="Less than" value="LT">% Less than</option>	
														<option title="Greater than" value="GT">% Greater than</option>											
																												
													</select>	
												</span>
												<span class="multipleOptions">
													<input type="#" class="textbox numberBox valueCrit">
												</span>
												
												 
												 
												
											</div> <!-- End of parameter -->
											
											<!-- <div class="parameterOptionsInputBox articleList varianceCrit" id="">
												<div class="parameterOptions clearfix">
												
													<span class="multipleOptions hideBlock">
														<select class="selectOptions criteria">								
															<option title="Less than" value="LT">% Less than</option>	
														<option title="Greater than" value="GT">% Greater than</option>														
														</select>		
													</span>
													<span class="multipleOptions">
														<input type="#" class="textbox numberBox valueCrit">
													</span>
													<label id="addActionBtn" class="linkBtn addActionBtn">
													  <a ><label class="addRow">Add more</label></a>
													 </label>
												
												</div> End of parameter
											</div> End of parameter -->
												
											</div><!-- End of add parameter -->
								
												
											
											
																
												<div class="formActions">
													<label class="actionBtn" id="teamPerfFilterBtn"><a >Apply</a></label>
													<label class="secondaryActionBtn closeLink" id="teamPerfcloseLink"><a >Cancel</a></label>						
												</div> <!-- End of form actions -->
												
												
										  </div> <!-- End of form wrapper -->				
									</div><!-- End of table Actions Wrapper -->
									
									<div id="reportContent4" class="displayArea"></div>	
									
									
								</div> <!-- End of content table wrapper -->
							
					</div> <!-- end of mian tabs 6 -->
					
					
					<div id="mainTabs-7" class="tabContent">
						
								<div class="ContentTableWrapper">
								
									
									
									
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>User Performance</strong></h5>
										
									   </div>
										<div class="tableActionBtns stDtlActionBtns" style="margin-top:0">
											<label class="actionBtn"><a id="userPerfExportBtn"><label class="export">Export</label></a></label><label class="actionBtn"><a ><label class="print" id="userPerformancePrintBtn">Print</label></a></label>
															
										</div>
										
										
									</div> <!-- End of table info -->
					
					
									<div class="tableActionsBtnsWrapper emptyTable">
									   <div class="lookupActionWrapper">
										  <label id="filterOpenu" class="linkBtn">
												<a ><label class="filter">Filters</label></a>								
                                          </label>
										  <label id="filterClearu" class="linkBtn hideBlock">
												<a ><label class="negativeFlag">Clear Filters</label>	</a>								
                                          </label>
										  
										  
									   </div> <!-- End of lookup action wrapper -->					  
									</div> <!-- End of table action wrapper -->
					
					
					
								
									
									<div class="tableActionsWrapper hideBlock hideOnLoadST" id="tablefiltersu">
									   
									 
										  <div class="formWrapper alignParameter" id="userPerfFilterDiv">
												<div class="parameter">
													<label for="aisles">Aisles</label>
													<div id="userPerfAisleDrpDwnDiv" class="selectDropdown"><label id="userPerfAisleDrpDwnActiveId" class="selectLabel"><a  id="userPerfAisleDrpDwnLabel">All Aisles</a></label>
														<ul class="dropdown" id="userPerfAisleDrpDwnUl">
															<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="userPerfallAisleChkBox" name="userPerfallAisleChkBox"><label class="dropdownLabel" for="">All Aisles</label></li></div>
														</ul>
													</div>
													<div class="searchByOptions onlyCheckbox">
														<input type="checkbox" id="userPerfAisleH" value="missedArticleAisleH" name="missedArticleAisleH"><label class="labelText" for="userPerfAisleH">Select bays </label>
													</div>
												</div> <!-- End of parameter -->
												
												<div class="parameter">
													<label for="article">Users</label>
													<div id="userPerfUsrDrpDwnDiv" class="selectDropdown"><label id="userPerfUsrDrpDwnActiveId" class="selectLabel"><a  id="userPerfUsrDrpDwnLabel">All Users</a></label>
														<ul class="dropdown" id="userPerfUsrDrpDwnUl">
															<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="userPerfallUsrChkBox" name="userPerfallUsrChkBox"><label class="dropdownLabel" for="">All Users</label></li></div>
														</ul>
													</div>												
												</div> <!-- End of parameter -->
												
											<div class="hierarchyWrapper clearfix hideBlock baseBaysHierarchy" id="userPerfAisleHId">
																		
													<!-- Department -->
													<div class="hierarchyContent" id="baystDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="aisleSelectAll">Aisles</h3> 
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
															<ul id="aisleLst"></ul>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount">
																<label>Total Selected:<strong id="aisleLstCnt">10</strong></label>
															</span>							
																				
														</div> <!-- End of hierarchy bottom -->
														
													</div> <!-- End of hierarchy Content --> 																	
													
													<div class="hierarchyContent lastContent" id="bayDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" id="baySelectAll">Bays</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection" id="baynoSelection">
																<label>Please select any aisle to select bays.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div id="parentBayDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span id="bayLstTotal" class="totalCount hideBlock">
																<label>Total Selected:<strong id="bayLstCnt">5</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
												
											</div> <!-- end of hierarchy Wrapper -->
											
												
												
												
												<div class="parameter clearfix">
													<label for="ol">Other Locations</label>
													<div id="userPerfLocDrpDwnDiv" class="selectDropdown"><label id="userPerfLocDrpDwnActiveId" class="selectLabel"><a  id="userPerfLocDrpDwnLabel">All Locations</a></label>
														<ul class="dropdown" id="userPerfLocDrpDwnUl">
															<div class="inner-drop-down hierDrp"><li><input type="checkbox" id="userPerfallLocChkBox" name="userPerfallLocChkBox"><label class="dropdownLabel" for="">All Locations</label></li></div>
														</ul>
													</div>
													<div class="searchByOptions onlyCheckbox">
														<input type="checkbox" id="userPerfLocH" class="locH" value="locinner" name="locinner"><label class="labelText" for="userPerfLocH">Select sub-locations</label>
													</div>
												</div> <!-- End of parameter -->
												
												<div class="hierarchyWrapper clearfix hideBlock" id="userPerfLocHId">
																		
													<!-- Department -->
													<div class="hierarchyContent">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="locSelectAll">Other Locations</h3> 
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
															<ul class="locLst"></ul>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount">
																<label>Total Selected:<strong class="locLstCnt">10</strong></label>
															</span>							
																				
														</div> <!-- End of hierarchy bottom -->
														
													</div> <!-- End of hierarchy Content --> 																	
													
													<div class="hierarchyContent lastContent sublocDiv">				
														
														<div class="hierarchyTitle">
															<h3><input type="checkbox" class="sublocSelectAll">Sub-locations</h3>
														</div> <!-- End of hierarchy Title -->
														
														<div class="hierarchyList">
														
															<div class="noSelection sublocnoSelection">
																<label>Please select any location to select sub-locations.</label>
															</div> <!-- End of no selection -->
															
															<label class="loading hideBlock">&nbsp;</label>
															
															<div class="parentSublocDiv">
															</div>
														</div> <!-- End of hierarchy Title -->
														
														<div class="heirachyBottom">
															<span class="totalCount hideBlock sublocLstTotal">
																<label>Total Selected:<strong id="sublocLstCnt">5</strong></label>
															</span>									
														</div> <!-- End of heirachy bottom -->
														
													</div> <!-- End of hierarchy Content --> 
													
													
												
											</div> <!-- end of hierarchy Wrapper -->
												
																
												<div class="formActions">
													<label class="actionBtn" id="userPerfFilterBtn"><a >Apply</a></label>
													<label class="secondaryActionBtn closeLink" id="userPerfcloseLink"><a >Cancel</a></label>						
												</div> <!-- End of form actions -->
												
												
										  </div> <!-- End of form wrapper -->				
									</div><!-- End of table Actions Wrapper -->
												
								
									<div id="reportContent5" class="displayArea" style=""></div>	
								
								
								</div> <!-- End of content table wrapper -->
							
					</div> <!-- End of main tabs 7 -->
					<div id="mainTabs-8" class="tabContent">
						
								<div class="ContentTableWrapper">
									
									<div class="tableInfo emptyTable">
										<div class="tableTitle">
										  <h5 class="sectionTitle"><strong>Finalise Stocktake</strong></h5>
										
									   </div>
									</div> <!-- End of table info -->
									<div id="reportContent7" class="displayArea"></div>	
									<div class="pageActions ">											 
										   <label id="finaliseStocktakeButton" class="actionBtn actionModeST"><a ><label class="thumbUp">Finalise</label></a></label>											  
									</div>
								</div> <!-- End of content table wrapper -->
							
					</div> <!-- End of main tabs 7 -->
				
				</div> <!-- End of main tabs -->
				
			</div> <!-- End of articleAdditionalInfo -->
				
		</div> <!-- End of content wrapper -->
	<div id="newParameter">
		<div class="parameterOptionsInputBox articleList varianceCrit hideBlock" style="padding-left: 113px;">
			<div class="parameterOptions clearfix">
			
				<span class="multipleOptions hideBlock">
					<select class="selectOptions criteria">								
						<option title="Less than" value="LT">% Less than</option>	
					<option title="Greater than" value="GT">% Greater than</option>														
					</select>		
				</span>
				<span class="multipleOptions">
					<input type="#" class="textbox numberBox valueCrit">
				</span>
				<label id="addActionBtn" class="linkBtn addActionBtn">
				  <a ><label class="addRow">Add more</label></a>
				 </label>
			
			</div> <!-- End of parameter -->
		</div> <!-- End of parameter -->
	</div>
	
	<!-- Edit Location  popup  -->
      <div id="dialog-editLocation" title="Edit Locations">
         <div class="popupContent">
            <div class="popupData contentWrapper">
			
				<div class="ContentTableWrapper alignParameter" style="max-height: 500px !important">
				<table cellspacing="0" class="ContentTable treetable drilldownTable" style="border:1;margin-top:20px" id="stLocTable">
					<thead>
						<tr>
							<th width="30%" class="columnDivider">Location Name</th>
							<th width="10%"class="centerValue columnDivider">Locations</th>							
							<th class="columnDivider">
							<input type="checkbox" class="unchecked"  value="selectAllActivate" name="selectAllActivate" id="selectAllActivate">
							<label style="margin-left: 80px;">Activate</label></th>							
							<th>
							<input type="checkbox" class="unchecked" value="selectAllDeactivate" name="selectAllDeactivate" id="selectAllDeactivate">
							<label style="margin-left: 80px;">Deactivate</label></th>						
						</tr>
					</thead>
					<tbody>						
					</tbody>
				</table>
			</div> <!-- End of form wrapper -->
				 
               <div class="popupActionsWrapper">
                  <span class="popupActions">
	                  <label class="actionBtn" id="applyLocation">Apply</label>
	                  <label class="actionBtn" id="printLocation">Print</label>
	                  <label class="actionBtn" id="cancelLocation">Cancel</label>
                  </span>
               </div>
              
               <!-- End of popup actions-->
            </div>
            <!-- End of pop up data -->	
         </div>
         <!-- End of popupContent -->
      </div>
      <!-- End Edit Stocktake  popup -->
	<div id="dialog-reduced-print" title="Confirm Print Locations">
		<div class="popupContent">
			<div class="popupData" id="dialog-reduced-print-content">
			</div>
			<div class="popupActionsWrapper">
			<span class="popupActions">				
				<label class="actionBtn" id="noReducedLocPrint">No</label>
				<label class="actionBtn" id="yesReducedLocPrint">Yes</label>
			</span>
			</div>		
	</div>	
	</div>
	<div id="dialog-com-locationsST" title="Location Details">
	 <div class="popupContent ">
	 <div class="popupData pos_prc_cont ContentTableWrapper">
	</div>
	<div class="popupActionsWrapper">
			<span class="popupActions">				
				<label class="actionBtn hideBlock " onclick="$('#dialog-com-locationsST').dialog('close');">ok</label>
			</span>
			</div>
	</div>
	</div>
		
	<div id="printDataForSTArticleCount" class="hideBlock">
		<div id="printbodyForSTArticleCount" class="printbody"></div>
	</div>
	<div id="printDataForSTMissedArticles" class="hideBlock">
		<div id="printbodyForSTMissedArticles" class="printbody"></div>
	</div>
	<div id="printDataForSTVarianceReport" class="hideBlock">
		<div id="printbodyForSTVarianceReport" class="printbody"></div>
	</div>
	<div id="printDataForSTAuditSummary" class="hideBlock">
		<div id="printbodyForSTAuditSummary" class="printbody"></div>
	</div>
	<div id="printDataForSTStockValuation" class="hideBlock">
		<div id="printbodyForSTStockValuation" class="printbody"></div>
	</div>
	<div id="printDataForSTUserPerformance" class="hideBlock">
		<div id="printbodyForSTUserPerformance" class="printbody"></div>
	</div>
	<div id="printDataForSTTeamPerformance" class="hideBlock">
		<div id="printbodyForSTTeamPerfromance" class="printbody"></div>
	</div>