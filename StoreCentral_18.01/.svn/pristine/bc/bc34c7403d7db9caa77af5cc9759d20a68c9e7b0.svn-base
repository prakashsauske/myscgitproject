<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<title>Night Fill Labour Plan</title>


<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script type="text/javascript" src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/printNFLP.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/nightFill.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>

<link href="../../styles/slider.css?version=${properties.version}" rel="stylesheet" type="text/css" />


</head>
<body>
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>

						<li class="currentPage">Night Fill Labour Plan</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label id="statusImg" class="loading hideBlock">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->
		<form id="nightFillReport" method="GET">

			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3 class="mainAccordion">Generate Night Fill Labour Plan</h3>
						<div>



							<div class="formWrapper">

								<div class="parameter parameterRow">
									<label for="store" class="mandatory">Date</label> <input
										type="#" class="textbox defaultTextbox inputDate"
										id="dateFrom" name="fromDate"> <input type="hidden"
										id="dateFromHide" name="dateFromHide" />
								</div>
								<!-- End of parameter -->






								<!-- 	<div class="parameter clearfix parameterRow">
									<label>Department</label>
									<span>
										<input type="checkbox" id="GM" value="Department" name="Department" checked><label class="labelText" for="GM">General Merchandise</label>
										<input type="checkbox" id="Groceries" value="Department" name="Department" checked><label class="labelText paramCheckBox" for="Groceries">Groceries </label>
										<input type="checkbox" id="Perishables" value="Department" name="Department" checked><label class="labelText" for="Perishables">Perishables</label>
									</span>								
								</div>  <!-- End of parameter -->


								<!-- 	<div class="parameter clearfix parameterRow">
									<label>Include</label>
									<span>
										<input type="checkbox" name="promo" value="promo" id="FS" checked ><label for="FS" class="labelText">Fill shelf</label>
										<input type="checkbox" name="promo" value="promo" id="promo" ><label for="promo" class="labelText">Articles on promotion</label>
									</span>
								</div> <!-- End of parameter -->


								<!-- 	<div class="parameter clearfix parameterRow  parameterOptions ">
									<label for="sourceOfSupply">Source of Supply</label>
									<span class="reportRadio">
										<input type="radio" checked="" id="all" value="all" name="sourceSupply"><label class="labelText" for="all">All</label>
										<input type="radio" id="warehouse" value="warehouse" name="sourceSupply"><label class="labelText" for="warehouse">Warehouse</label>										
									</span> <!-- End of report radio -->



								<!-- 	<div class="parameter parameterOptionsInputBox">
										
										<span id="allField">
											<label class="instructions">All warehouse excluding DSD</label><input type="#" style="visibility:hidden;" class="textbox">											
										</span>
										
										<span class="hideBlock" id="warehouseField">
											<input type="#" placeholder="Enter warehouse no. or name" class="textbox">
											<label id="verifySupplier" class="linkBtn"><label class="advancedSearch">Verify & Add</label></label>
											
											
											<ul class="parameterOptionsListInline ">
												<li>
													<label>12345 - Sydney NDC </label>
													<label class="closeMessage">&nbsp;</label>
												</li>
												<li>
													<label>45678 - Sydney RDC - Fresh</label>
													<label class="closeMessage">&nbsp;</label>
												</li>												
											</ul>										
										</span>
										
									
									</div> <!-- End of inner parameter -->

								<!-- 	</div> <!-- End of parameter -->





								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="secondaryActionBtn" id="closeLink">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->



						</div>
						<!-- End of div for jQuery handling -->


					</div>
					<!-- End of ui-accordion -->

					<div class="ContentTableWrapper hideBlock ContentTableWrapperError">


						<div class="tableInfo tableInfoError  tableStart">


							<div class="tableTitle  errorDiv" id="errorMsgDiv">
								<h4 id="errorMsg">
									<c:if test="${not empty noResults}">${noResults}</c:if>
								</h4>

								<!-- End of table title -->



							</div>
						</div>
					</div>

					<div id="reportContent" class="hideBlock">

						<!-- For displaying report results -->

						<div class="ContentTableWrapper">

							<div class="articleHead">
								<div class="articleHeaderWrapper">
									<h2 class="articleTitle">Night Fill Labour Plan</h2>
									<!-- <p>
									
									<label class="articlePriceLabel">Hours to Fill: <strong>70.76</strong> </label>
									<label class="articlePriceLabel">|</label>
									<label class="articlePriceLabel">Work Hours: <strong>63.5</strong><label class="negativeValue">7.26</label></label>
									
								</p>-->
								</div>
								<!-- End of artcile head wrapper -->

								<div class="articleActionBtns">
									<label class="actionBtn" id="printBtn"
										onclick="nightFillLabourPlanReportPrint();"><label
										class="print">Print</label></label>
								</div>

							</div>
							<!-- End of Artcile Head -->

							<!-- 	
						<div class="articleContent orderDetails">
							
							<div class="articleContentInner">
							
								<div class="articleDetails">
							
							
									<table cellspacing="0" class="" width="100%">
										
										<tr>
											<td class=" columnDivider" width="20%">
												&nbsp;
											</td>	
											<td class="numberColumn columnDivider" width="20%">
												<strong>General Merchandise</strong>
											</td>	

											<td class="numberColumn columnDivider" width="20%">
												<strong>Groceries</strong>
											</td>
											<td class="numberColumn columnDivider" width="20%">
												<strong>Perishables</strong>
											</td>
											<td class="numberColumn columnDivider lastColumn" width="20%">
												<strong>Total</strong>
											</td>
										</tr>
										
										<tr>
											<td class="keyInfo columnDivider">
												Cartons on Loads/Forecast:
											</td>
											<td class="numberColumn columnDivider">
												xxxxx
											</td>											
											<td class="numberColumn columnDivider">
												xxxx
											</td>
											<td class="numberColumn columnDivider">
												xxxx
											</td>											
											<td class="valueInfo numberColumn lastColumn">
												xxxxx
											</td>															
										</tr>
										
										<tr>
											<td class="keyInfo columnDivider">
												Bulk Cartons:
											</td>
											<td class="numberColumn columnDivider">
												xxxxx
											</td>												
											<td class="numberColumn columnDivider">
												xxxx
											</td>											
											<td class="numberColumn columnDivider">
												xxxx
											</td>
											<td class="valueInfo numberColumn lastColumn">
												xxxxx
											</td>															
										</tr>
										
										<tr>
											<td class="keyInfo columnDivider">
												Promotional Cartons:
											</td>
											<td class="numberColumn columnDivider">
												xxxxx
											</td>											
											<td class="numberColumn columnDivider">
												xxxx
											</td>		
											<td class="numberColumn columnDivider">
												xxxx
											</td>
											<td class="valueInfo numberColumn lastColumn">
												 xxxxx
											</td>															
										</tr>
										<tr>
											<td class="keyInfo columnDivider">
												Cartons to Fill:
											</td>
											<td class="numberColumn columnDivider">
												xxxxx
											</td>	
											
											<td class="numberColumn columnDivider">
												xxxx
											</td>										
											<td class="numberColumn columnDivider">
												xxxx
											</td>
											<td class="valueInfo numberColumn lastColumn">
												 xxxxx
											</td>															
										</tr>
										<tr>
											<td class="keyInfo columnDivider">
												Excess Cartons:
											</td>
											<td class="numberColumn columnDivider">
												xxxxx
											</td>
											
											<td class="numberColumn columnDivider">
												xxxx
											</td>										
											<td class="numberColumn columnDivider">
												xxxx
											</td>
											<td class="valueInfo numberColumn lastColumn">
												 xxxxx
											</td>															
										</tr>
									</table>
								</div>  <!-- End of article details										
							</div> <!-- End of article content inner 
							
						</div><!-- End of article content   -->

							<br />
							<div id="filterTabs">
								<ul>

									<!--  <li><a href="#tabs-1">Labour Hours by Tasks</a></li>-->
									<li><a href="#tabs-2">KRONOS Rosters</a></li>
									<!-- <li><a href="#tabs-3">KRONOS Rosters (Error Sample)</a></li>  -->

								</ul>
								<!-- <div id="tabs-1">						
								
								
								<table cellspacing="0" class="ContentTable">
								
								<thead> 
								
								
								<tr>					
									<th>&nbsp;</th>						
									<th class="numberColumn columnDivider">No. of Cartons </th>
									<th class="numberColumn columnDivider">Carton Rate </th>
									<th class="numberColumn columnDivider">No. of Hours</th>
									<th class="numberColumn columnDivider">No. of Excess Cartons </th>
									<th class="numberColumn columnDivider">No. of Hours for Excess Cartons </th>					
																	
								</tr>
								
								</thead> 
								<tbody>
								<tr>
									<td colspan="6" class="rowSection rowHighlight">Break Load (Sort and split)</td>
								</tr>
								<tr>						
									<td class="">General Merchandise</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>									
								<tr>						
									<td class="">Groceries  </td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>
								<tr>						
									<td class="">Perishables</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>	
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
																	
									<td class="numberColumn lastColumn valueInfo" colspan="2"> </td>
								</tr>	
								
								
								
								
								

								<tr>
									<td colspan="6" class="rowSection rowHighlight">Drop / Run Cartons on shop floor</td>
								</tr>
								<tr>						
									<td class="">General Merchandise</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>									
								<tr>						
									<td class="">Groceries  </td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
									<td class="numberColumn columnDivider">xxx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>
								<tr>						
									<td class="">Perishables</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
																	
									<td class="numberColumn lastColumn" colspan="2"> </td>
								</tr>
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
																	
									<td class="numberColumn lastColumn valueInfo" colspan="2"> </td>
								</tr>									
								
								
								
								
								
								<tr>
									<td colspan="6" class="rowSection rowHighlight">Filling / Packing</td>
								</tr>							
								<tr>						
									<td class=""><strong>Aisle 1:</strong> General Merchandise </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 2:</strong> General Merchandise </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 3:</strong> General Merchandise  </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								
								<tr>						
									<td class=""><strong>Aisle 4:</strong> General Merchandise, Groceries</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 5:</strong> General Merchandise, Groceries  </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 6:</strong> Groceries</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 7:</strong> Groceries </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 8:</strong> Groceries </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 9:</strong> Groceries, Perishables </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 10:</strong> Perishables </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 11:</strong> Perishables </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class=""><strong>Aisle 12:</strong> Perishables </td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn columnDivider">xx</td>
									<td class="numberColumn lastColumn">xx</td>
								</tr>
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>								
									<td class="numberColumn lastColumn valueInfo"> xx</td>
								</tr>
								
								
								
								
								<tr>
									<td colspan="6" class="rowSection rowHighlight">Rubbish Removal</td>
								</tr>
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
																	
									<td class="numberColumn lastColumn valueInfo" colspan="2"> </td>
								</tr>	
								
								
								
								<tr>
									<td colspan="6" class="rowSection rowHighlight">Presentation</td>
								</tr>
								<tr>						
									<td class="valueInfo">Total</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
									<td class="numberColumn columnDivider valueInfo">xx</td>
																	
									<td class="numberColumn lastColumn valueInfo" colspan="2"> </td>
								</tr>	
								
								
								
								<tr>
									<td class="rowSection rowHighlight">Total Night Fill Tasks</td>
									<td class="rowSection numberColumn rowHighlight columnDivider">xxx</td>
									<td class="rowSection numberColumn rowHighlight columnDivider">xxx</td>
									<td class="rowSection numberColumn rowHighlight columnDivider">xxx</td>
									<td class="rowSection rowHighlight"></td>
									<td class="rowSection rowHighlight"> </td>
								</tr>
								
								
								
								
								
								
								
							
								
							
								
								
								
									
								
								</tbody>
								
								
								
							
								
															
							</table>
				
							
							</div> <!-- End of tabs -1 -->




								<div id="tabs-2">


									<table cellspacing="0" class="ContentTable" id="kronosTable">
										<thead>
											<tr>
												<th colspan="5" class="centerValue columnDivider"
													width="67%">Night Fill Team</th>
												<!-- <th rowspan="2" class="centerValue columnDivider blankCell" width="6%">&nbsp;</th> -->
												<!-- <th colspan="2" class="centerValue"  width="27%">Suggested Available Staff</th>-->
											</tr>
											<tr class="subHeader">
												<th>Employee</th>
												<th>Employee Status</th>
												<th class="centerValue">Shift Time</th>
												<th class="numberColumn ">Break Hours</th>
												<th class="numberColumn columnDivider">Work Hours</th>

												<!-- <th>Employee</th>												
												<th class="centerValue lastColumn">Time</th> -->
											</tr>
										</thead>

										<tbody></tbody>

									</table>


								</div>
								<!-- End of tabs - 2 -->

								<!-- <div id="tabs-3">	
								<div class=" errorDiv">
									<h4>We are facing technical issues to retrieve KRONOS Rosters information, please try again later. </h4>
								</div>
							</div> <!-- End of tabs 3 -->




							</div>
							<!-- End of tabs -->

						</div>
						<!-- End of Content Table Wrapper-->




					</div>
					<!-- end of report info -->

				</div>
				<!-- End of article Additional Info -->


			</div>
			<!-- End of content wrapper -->

		</form>
		<input id="navBarHighlight" type="hidden" value="reports" />

	</div>
	<!-- End of main wrapper -->


	<%@include file="footer.jsp"%>


	<!-- verify supplier pop up-->
	<div id="dialog-selectStore" title="Change Store">
		<div class="popupContent">

			<div class="popupData">

				<div class="ContentTableWrapper formWrapper">
					<div class="parameter">
						<label for="dDate">Store No.</label> <input type="text"
							class="textbox verifyNm">
					</div>
					<!-- End of parameter -->
				</div>
				<!-- End of content table wrapper -->

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn">Change
							Store</label> <label class="secondaryActionBtn">Cancel</label>
					</span>
				</div>
				<!-- End of popup action wrapper -->


			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End of changeStore -->


	<div id="printData" class="hideBlock">
		<div id="printbody"></div>

	</div>
	<div class="hideBlock">
		<label class="siteNoName">${user.siteNo} | ${user.siteName}</label><label
			class="depPrint"></label><label class="catPrint"></label><label
			class="scPrint"></label><label class="segPrint"></label>
	</div>
</body>
</html>