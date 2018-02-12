
<!DOCTYPE html>
<html>
<head>
	<title>LTO Management</title>
	
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<style>
#lto_locations_head_page{
    margin-top: 6px;    
    margin-right:4px;
    
}
</style>	
	
	
</head>
<body>
<input type="hidden" id="salesorgName" value='${user.imgLocation}' />
	<div class="mainWrapper woolworths">
	
		<div class="headWrapper">
			<%@include file="header.jsp"%>
		
			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label> 
					<ul>
						<li><a >Home</a></li>
						<li>Stock Management</li>
						<li class="currentPage">LTO Management</li>					
					</ul>
				</div> <!-- End of breadcrumbs -->
				
				<div class="statusWrapper">
					<label class="loading hideBlock">We are getting data, please wait</label>
					<label class="secondaryActionBtn">Back</label>
				</div> <!-- End of status wrapper -->
				
			</div>	<!-- End of breadcrumb wrapper -->
			
		</div> <!-- End of head wrapper -->
		
		<div class="contentWrapper adminWrapper">			
			
			<div class="ContentTableWrapper">
			
				<div class="tableInfo">
				
					<div class="tableTitle">
						<h4 class="sectionTitle">LTO Management</h4>
					</div> <!-- End of table title -->
				
				</div> <!-- End of table info -->
				
				
				<div class="tableActionsBtnsWrapper ${properties.AddOrEditLocation}">
                    <div class="lookupActionWrapper">
                        
						<label class=" linkBtn" id="addUser"><a ><label class="addRow">Add LTO Location</label></a></label>
						
						
                        <div class="errorDiv hideBlock">
							<label>Error text...</label>
							<label class="closeMessage">&nbsp;</label>
						</div>
                       
                    </div> <!-- End of lookup action wrapper -->
                                      		
				
				 </div> <!-- End of table actions btn wrapper -->
				 
				<div class="tableActionsWrapper hideBlock" id="tableAddAction">
					
					<form id="ltoCreateForm">
						<div class="formWrapper alignParameter">
						
							
						
							
							<div class="parameter clearfix" id="type">
								<label for="article" class="">Fixture Type:</label>
								<select id="ltoFixtureType" class="selectOptions">
									
								</select>
							</div> <!-- End of parameter -->
							
							
							<div class="parameter clearfix otherDiv">
								<label for="article" class="">Aisles</label>
								<span id="ltoAisleDetails" class="parameterOptionsRadio">
																		
								</span>
							</div> <!-- End of parameter -->
							
							<div class="parameter clearfix bigwDiv categ">
								<label for="dept" class="category">Category </label>
								<!-- <label for="dept" class="subCate hideBlock">Sub-Category</label>
								<label for="dept" class="deptmnt hideBlock">Department</label> -->
								<div id="ltoCatDrpDwnDiv" class="selectDropdown"><label id="ltoCatDrpDwnActiveId" class="selectLabel"><a id="ltoCatDrpDwnLabel">Select Category</a></label>
										<ul class="dropdown" id="ltoCategoryDrpDwn">
										</ul>
								</div>
							</div> 
						 <div class="parameter clearfix bigwDiv subCateg ">
						 <label for="dept" class="subCate ">Sub-Category</label>
								<!-- <label for="dept" class="deptmnt hideBlock">Department</label> -->
								<div id="ltoCatDrpDwnDivSub" class="selectDropdown "><label id="ltoCatDrpDwnActiveIdSubCate" class="selectLabel"><a id="ltoCatDrpDwnLabelSubCate">Select Sub-Category</a></label>
										<ul class="dropdown " id="ltoCategoryDrpDwnSubCate">
										</ul>
								</div>
							</div>  
							 <div class="parameter clearfix bigwDiv deptmnts ">
								 <label for="dept" class="deptmnt ">Department</label>
								<div id="ltoCatDrpDwnDivDept" class="selectDropdown "><label id="ltoCatDrpDwnActiveIdDept" class="selectLabel"><a id="ltoCatDrpDwnLabelDept">Select Department</a></label>
										<ul class="dropdown " id="ltoCategoryDrpDwnDept">
										</ul>
								</div>
							</div>  
							<!-- End of parameter -->
						
							
							
							
							<div class="formActions">
								<label id="ltoSaveAndAdd" class="actionBtn"><a >Save & Add</a></label>
								<label class="secondaryActionBtn closeLink" id="closeLink"><a >Cancel</a></label>						
							</div> <!-- End of form actions -->
													
						</div> <!-- End of content table wrapper -->
					</form>	
					
				</div> <!-- End of table Actions Wrapper -->
				
				
				<div id="ltoLocationList"></div>
			
				
				
				<div class="tableActionsBtnsWrapper hideBlock">
                    <div class="lookupActionWrapper">
                        
						<label class="linkBtn" id="addUser"><a ><label class="addRow">Add Pallet</label></a></label>
						
						
                        <div class="errorDiv hideBlock">
							<label>Error text...</label>
							<label class="closeMessage">&nbsp;</label>
						</div>
                       
                    </div> <!-- End of lookup action wrapper -->
                                      		
				
				 </div> <!-- End of table actions btn wrapper -->
				 
				
				
				<div class="tableActionsWrapper hideBlock" id="tableAddAction">
					
					<form method="POST" action="" id="">
						<div class="formWrapper alignParameter">
							
							<div class="parameter clearfix" id="pall">
								<label for="pall" class="">Select Department Hierarchy</label>
								
							</div> <!-- End of parameter -->
							
							<div class="hierarchyWrapper clearfix" id="articleHierarchy">
																
									<!-- Department -->
									<div class="hierarchyContent" id="deptDiv">				
										
										<div class="hierarchyTitle">
											<h3>Department</h3>
										</div> <!-- End of hierarchy Title -->
										
										<div class="hierarchyList">
											<ul>
												<li><input type="radio" name="departmentList" value="deptValue1" id="deptValue1"><label for="deptValue1" class="labelText">General Merchandise</label></li>
												<li><input type="radio" name="departmentList" value="deptValue2" id="deptValue2"><label for="deptValue2" class="labelText">Perishables</label></li>
												<li><input type="radio" name="departmentList" value="deptValue3" id="deptValue3"><label for="deptValue3" class="labelText">Groceries</label></li>
												<li><input type="radio" name="departmentList" value="deptValue4" id="deptValue4"><label for="deptValue4" class="labelText">Non Trading</label></li>
												<li><input type="radio" name="departmentList" value="deptValue5" id="deptValue5"><label for="deptValue5" class="labelText">Meat</label></li>
												<li><input type="radio" name="departmentList" value="deptValue6" id="deptValue6"><label for="deptValue6" class="labelText">Liquor</label></li>
												<li><input type="radio" name="departmentList" value="deptValue7" id="deptValue7"><label for="deptValue7" class="labelText">Personal Care</label></li>
												<li><input type="radio" name="departmentList" value="deptValue8" id="deptValue8"><label for="deptValue8" class="labelText">Health</label></li>
												<li><input type="radio" name="departmentList" value="deptValue9" id="deptValue9"><label for="deptValue9" class="labelText">Baked Items</label></li>
												<li><input type="radio" name="departmentList" value="deptValue10" id="deptValue10"><label for="deptValue10" class="labelText">Coupons</label></li>
											</ul>
										</div> <!-- End of hierarchy Title -->
										
										<div class="heirachyBottom">
											<span class="totalCount">
												<label>Total:<strong>7</strong></label>
											</span>							
																
										</div> <!-- End of hierarchy bottom -->
										
									</div> <!-- End of hierarchy Content --> 
														
									
										<!-- Sub-category -->
									<div class="hierarchyContent lastContent" id="subCatDiv">				
										
										<div class="hierarchyTitle">
											<h3>Sub-category</h3>
										</div> <!-- End of hierarchy Title -->
										
										<div class="hierarchyList">
										
											<div class="noSelection">
												<label>Please select any category to see sub-categories.</label>
											</div> <!-- End of -->
											
											<label class="loading hideBlock">&nbsp;</label>
											
											<ul class="hideBlock" class="hideBlock">
												<li><input type="checkbox" name="subCatList" value="subValue1" id="subValue1"><label for="subValue1" class="labelText">Sub-category One</label></li>
												<li><input type="checkbox" name="subCatList" value="subValue2" id="subValue2"><label for="subValue2" class="labelText">Sub-category Two</label></li>
												<li><input type="checkbox" name="subCatList" value="subValue3" id="subValue3"><label for="subValue3" class="labelText">Sub-category Three</label></li>
												<li><input type="checkbox" name="subCatList" value="subValue4" id="subValue4"><label for="subValue4" class="labelText">Sub-category Four</label></li>
												<li><input type="checkbox" name="subCatList" value="subValue5" id="subValue5"><label for="subValue5" class="labelText">Sub-category Five</label></li>
												<li><input type="checkbox" name="subCatList" value="subValue6" id="subValue6"><label for="subValue6" class="labelText">Sub-category Six</label></li>
												<li><input type="checkbox" name="subCatList" value="subValue7" id="subValue7"><label for="subValue7" class="labelText">Sub-category Seven</label></li>
												<li><input type="checkbox" name="subCatList" value="subValue8" id="subValue8"><label for="subValue8" class="labelText">Sub-category Eight</label></li>
												<li><input type="checkbox" name="subCatList" value="subValue9" id="subValue9"><label for="subValue9" class="labelText">Sub-category Nine</label></li>
												<li><input type="checkbox" name="subCatList" value="subValue10" id="subValue10"><label for="subValue10" class="labelText">Sub-category Ten</label></li>
											</ul>
										</div> <!-- End of hierarchy Title -->
										
										<div class="heirachyBottom">
											<span class="totalCount hideBlock">
												<label>Total:<strong>10</strong></label>
											</span>			
										</div> <!-- End of heirachy bottom -->
										
									</div> <!-- End of hierarchy Content --> 
									
								</div> <!-- end of hierarchy Wrapper -->
								
						
							
							<div class="formActions">
								<label class="actionBtn"><a >Save & Add</a></label>
								<label class="secondaryActionBtn closeLink" id="closeLink"><a >Cancel</a></label>						
							</div> <!-- End of form actions -->
													
						</div> <!-- End of content table wrapper -->
					</form>	
					
				</div> <!-- End of table Actions Wrapper -->
				
				
				
				<table cellspacing="0" class="ContentTable hideBlock tableSorter actionRows" id="userList">
					<tr>
						<th>Location</th>
						<th>Departments</th>
						<th class="centerValue">Status</th>	
						
						<th>No. of Articles </th>											
						<th class="lastColumn centerValue noSort" width="70px">Actions</th>
					</tr>
					<tr>						
						<td>RC2.5</td>
						<td>Department One, Department Two, and <a class="moreNumber" >+2 more</a></td>
						<td class="centerValue"><label class="deactive">Not in use</label></td>	
																
						<td>0</td>										
						<td class="lastColumn centerValue">
							<label class="linkBtn" title="Edit Details">
								<a ><label class="editRecord">&nbsp;</label></a>
							</label>
							<label class="linkBtn" title="Print Barcode">
								<a ><label class="printRecord">&nbsp;</label></a>
							</label>
						</td>
					</tr>
					<tr>						
						<td>RC2.4</td>
						<td>Department One, Department Two, and <a class="moreNumber" >+2 more</a></td>
						<td class="centerValue"><label class="success">In use</label></td>	
																	
						<td>20</td>										
						<td class="lastColumn centerValue">
							<label class="linkBtn" title="Edit Details">
								<a ><label class="editRecord">&nbsp;</label></a>
							</label>
							<label class="linkBtn" title="Print Barcode">
								<a ><label class="printRecord">&nbsp;</label></a>
							</label>
						</td>
					</tr>
					
					
				
					
					
				</table>								
			
			
			</div>  <!-- End of content table wrapper -->	
			
			
			
			
		</div> <!-- End of content wrapper -->
	
	</div>	
	
		<%@include file="footer.jsp"%>
		
</body>
<head>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}">
	
</script>
<script type="text/javascript"
	src="../../scripts/jquery.tablesorter.latest.js?version=${properties.version}">
	
</script>
<script src="../../scripts/table.js?version=${properties.version}">
	
</script>
<script src="../../scripts/jquery.treetable.js?version=${properties.version}">
	
</script>
<link href="../../styles/slider.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<script src="../../scripts/instoreMobilinkServices.js?version=${properties.version}">
	
</script>
<script src="../../scripts/inStore_PromoCreation_utils.js?version=${properties.version}">
	
</script>
<script src="../../scripts/basicSort.js?version=${properties.version}">
	
</script>
<script src="../../scripts/ltoManagement.js?version=${properties.version}">
</script>
</head>
</html>