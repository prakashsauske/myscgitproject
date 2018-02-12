<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<title>Create Inter Branch Transfer</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/ui.daterangepicker.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>

<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/daterangepicker.jQuery.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script src="../../scripts/ibtSendTempCheck.js?version=${properties.version}"></script>
<script src="../../scripts/delivery-date.js?version=${properties.version}"></script>

</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="orders" />


			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage"><a href='#'>Create Inter Branch
								Transfer</a></li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="back">Back</label>
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
						<h4 class="sectionTitle">Create an IBT Order with Articles</h4>
					</div>
					<!-- End of table title -->

				</div>
				<!-- End of table info -->


				<div class="tableActionsBtnsWrapper">
					<div class="lookupActionWrapper">
						<label class="linkBtn" id="addActionBtn"><label class="">Add
								Article</label></label>


					</div>
					<!-- End of lookup action wrapper -->


				</div>
				<!-- End of table actions btn wrapper -->

				<div class="tableActionsWrapper" id="tableAddAction">

					<form method="POST" action="" id="ibtSite">
						<input type="hidden" name="index" id="index" value="" /> <input
							type="hidden" id="costVal" name="costVal" value="" /> <input
							type="hidden" id="buttonRetain" name="buttonRetain"
							value="${buttonRetain}" /> <input type="hidden"
							value="${listSize}" id="listSize" name="listSize" /> <input
							type="hidden" value="" id="desIndex" name="desIndex" /> <input
							type="hidden" value="${user.siteNo}" id="fromStoreNo"
							name="fromStoreNo" /> <input type="hidden"
							value="${user.siteName}" id="fromStoreName" name="fromStoreName" />
						<input type="hidden" value="${user.salesOrg}" id="userSalesOrg"
							name="userSalesOrg" /> <input type="hidden" value="${invalidQty}"
							id="invalidQty" name="invalidQty" /> <input type="hidden"
							id="dropDownVal" name="dropDownVal" value="${param.warehouse}" />
						<input type="hidden" id="dropDownValWarehouse" name="warehouse"
							value="" /> <input type="hidden" id="storeNoForCancel"
							name="storeNoForCancel" value="" />


						<div class="formWrapper">

							<div class="parameter">
								<label for="article" class="mandatory">Article</label> <input
									type="#" class="textbox articleSearchText" tabindex="1"
									id="articleNo" name="articleNo" maxlength="20"
									placeholder="Search by">
								<div class="searchByOptions">
									<input type="radio" checked="" id="articleType"
										name="articleType" value="ArticleNumber"><label
										class="labelText" for="number">Number</label> <input
										type="radio" id="articleType" value="description"
										name="articleType"><label class="labelText"
										for="description">Description</label> <input type="radio"
										id="articleType" name="articleType" value="EAN"><label
										class="labelText" for="reference">EAN/TUN/PLU</label>
								</div>
							</div>
							<!-- End of parameter -->

							<div class="parameter hideBlock">
								<label for="qty" class="mandatory">Qty.</label> <input type="#"
									placeholder="Quantity" maxlength="20" placeholder=""
									class="textbox  numberBox" id="ordqty" tabindex="2"
									name="ordqty" onkeypress="return isDecimalNumber(this)">

							</div>
							<!-- End of parameter -->


							<div class="parameter">
								<label for="sourceOfSupply" class="mandatory">IBT Site</label> <input
									type="radio" tabindex="3" value="Warehouse" id="ibtSiteType"
									name="ibtSiteType" checked> <label for="warehouse"
									class="labelText">Warehouse</label> <input type="radio"
									value="Store" tabindex="4" id="ibtSiteType1" name="ibtSiteType">
								<label for="vendor" class="labelText">Store</label>

								<div class="parameter IBTSource">
									<span id="warehouseField"> <select class="selectOptions"
										id="warehouse" name="warehouseVal">
											<option value="0">Select</option>
											<c:forEach items="${whList}" var="whVal">
												<option value="${whVal.siteNo}" id="${whVal.siteNo}">${whVal.siteNo}
													| ${whVal.siteName}</option>
											</c:forEach>
									</select>
									</span> <span id="vendorField" class="hideBlock"> <input
										type="#" class="textbox" name="storeNo"
										value="${param.storeNo}" id="storeNo"
										placeholder="Enter store no. or name" maxlength="20">
										<label class="linkBtn" id="verifySupplier"><label
											class="advancedSearch">Verify</label></label>
									</span>
								</div>
								<!-- End of parameter -->

							</div>
							<!-- End of parameter -->



							<div class="formActions">
								<label class="actionBtn" id="searchAndAdd">Search & Add</label>
								<label class="secondaryActionBtn" id="closeLink">Close</label>
							</div>
							<!-- End of form actions -->

						</div>
						<!-- End of content table wrapper -->
						<input type="hidden" value="${user.salesOrg}" id="userSalesOrg"
							name="userSalesOrg" />
					</form>

				</div>
				<!-- End of table Actions Wrapper -->

				<%
					int nodeId = 1;
				%>
				<%
					int j = 1;
				%>
				<c:if test="${not empty articleList}">
					<table cellspacing="0"
						class="ContentTable treetable drilldownTable" id="treetable">
						<tr>
							<th>&nbsp;</th>
							<th>Article #</th>
							<th>Description</th>
							<th>SOH</th>
							<th class="numberColumn" width="70px">Transfer qty.</th>
							<th width="90px">UOM Type</th>
							<th class="numberColumn">Order Multiple</th>
							<th class="numberColumn" width="70px">Total Ordered</th>
							<th class="numberColumn" width="80px">Roster Date</th>
							<th class="numberColumn" width="80px">Delivery Date</th>
							<th class="lastColumn centerValue" width="70px">Actions</th>
						</tr>
						<c:forEach items="${articleList}" var="articleSearchResults">
							<tr id="row-1" class="row-1" data-tt-id="<%=nodeId%>">
								<%
									nodeId++;
								%>
								<td>&nbsp;</td>
								<td class="article-no">${articleSearchResults.articleNo}</td>
								<td>${articleSearchResults.description}</td>
								<td
									class="<c:if test="${articleSearchResults.baseUom!='KG'}">trimDecimalForSoh</c:if>">${articleSearchResults.SOH}</td>

								<td id="qty-<%=j%>" class="numberColumn nullCheck hideBlock">${articleSearchResults.inputQty}</td>
								<td id="qtyEdit-<%=j%>" class="numberColumn  qtyValue dateCheck"><input
									id="qtyValue-<%=j%>" type="#"
									value="${articleSearchResults.inputQty}"
									class="editNumCell textbox textboxDefaultText inputQty"
									maxlength="20"></td>
								<td id="uom-<%=j%>" class="numberColumn hideBlock">${articleSearchResults.ordUOMDesc}</td>
								<td id="uomEdit-<%=j%>" class="numberColumn  uomValue"><select
									id="uomValue-<%=j%>" class="selectOptions editSelectCell">
										<option id="<%=j%>1" value="<%=j%>1">${articleSearchResults.ordUOMDesc}</option>
										<option id="<%=j%>2" value="<%=j%>2">${articleSearchResults.baseUOMDesc}</option>
								</select></td>

								<td class="numberColumn" id="om-<%=j%>">${articleSearchResults.OM}</td>

								<td class="numberColumn" id="totalOrder-<%=j%>">${articleSearchResults.totalOrdered}</td>

								<td id="rosterDate-<%=j%>" class="numberColumn ">${articleSearchResults.orderDate}</td>
								<td id="rosterDateEdit-<%=j%>" class="numberColumn hideBlock">
									<input type="#" value="${articleSearchResults.orderDate}"
									id="rosterDateValue-<%=j%>" maxlength="20"
									class="textbox roster-date textboxDefaultText inputDate editDateCell">
								</td>
								<td id="deliverDate-<%=j%>" class="numberColumn hideBlock">${articleSearchResults.deliveryDate}</td>
								<td id="deliverDateEdit-<%=j%>" class="numberColumn "><input
									id="deliverDateValue-<%=j%>" type="#"
									value="${articleSearchResults.deliveryDate}" maxlength="20"
									class="delivery-date textbox textboxDefaultText inputDate editDateCell">
								</td>
								<td class="lastColumn centerValue"><label
									class="linkBtn editRowBtn hideBlock" id="editRecord-<%=j%>">
										<label class="editRecord">Edit</label>
								</label> <label class="linkBtn saveRowBtn " id="saveRecord-<%=j%>">
										<label class="saveRecord">Save</label>
								</label> <input type="hidden" value="${articleSearchResults.uomFlag}"
									id="saveUom-<%=j%>" /> <input type="hidden"
									class="saveFlagCheck" value="${articleSearchResults.saveFlag}"
									id="saveFlag-<%=j%>" /> <input type="hidden"
									value="${articleSearchResults.baseUOMDesc}" id="baseUom-<%=j%>" />
									<label class="linkBtn deleteBtn" id="DeleteRecord-<%=j%>">
										<label class="deleteRecord ">Delete</label>
										<%j++;%>
								</label></td>
							</tr>

							<tr data-tt-id="<%=nodeId%>" data-tt-parent-id="<%=nodeId-1%>">
								<td colspan="11">
									<table cellspacing="0" class="ContentTable" width="100%">

										<tr>
											<td class="keyInfo">Vendor:</td>
											<td class="valueInfo" colspan="5">
												${articleSearchResults.vendorNo}<c:if
													test="${not empty articleSearchResults.vendorName}"> | ${articleSearchResults.vendorName}</c:if>
											</td>
										</tr>

										<tr>
											<td width="20%" class="keyInfo">Carton Qty.:</td>
											<td width="13%" class="valueInfo">
												${articleSearchResults.OM}</td>
											<td width="20%" class="keyInfo">Unit Cost:</td>
											<td class="valueInfo" width="13%">
												${articleSearchResults.purChasePrice}</td>
											<td width="20%" class="keyInfo">Sell Out Days:</td>
											<td class="valueInfo lastColumn" width="13%"></td>
										</tr>
										<tr class="lastRow">
											<td colspan="6" class="lastColumn"><label
												class="history"
												onclick="showHistoryPopUp('${articleSearchResults.articleNo}','${articleSearchResults.description}','${articleSearchResults.OM}')">Sales
													History</label></td>
										</tr>
									</table>
								</td>
							</tr>
						</c:forEach>
					</table>
				</c:if>

				<c:if test="${ empty articleList}">
					<table cellspacing="0"
						class="ContentTable treetable drilldownTable" id="treetable">
						<tr>
							<th>&nbsp;</th>
							<th>Article #</th>
							<th>Description</th>
							<th>SOH</th>
							<th class="numberColumn" width="70px">Qty.</th>
							<th>UOM Type</th>
							<th class="numberColumn">Order Multiple</th>
							<th class="numberColumn" width="70px">Total Ordered</th>
							<th class="numberColumn" width="80px">Roster Date</th>
							<th class="numberColumn" width="80px">Delivery Date</th>
							<th class="lastColumn centerValue" width="70px">Actions</th>
						</tr>
						<tr id="row-1" data-tt-id="1">
							<td colspan="11">No articles added in the order.</td>

						</tr>


					</table>
				</c:if>


			</div>
			<!-- End of content table wrapper -->


			<c:if test="${not empty articleList}">
				<div class="pageActions " id="con-final">
					<label class="actionBtn" id="confirmAndFinalise"><label
						class="thumbUp">Confirm & Finalise</label></label> <label
						class="secondaryActionBtn" id="clear">Clear</label>
				</div>
				<!-- End of page actions-->

			</c:if>


			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle nodataMessage">

						<h4 id="validMsg">${msg}</h4>
					</div>

				</div>
			</div>

			<!-- End of content wrapper -->

			<div id="dialog-cancelOrder" title="Create IBT order">
				<div class="popupContent">

					<div class="popupData">
						<h4 class="alertText" id="cancelId">Are you sure you want to
							delete the article ?</h4>

						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="confirmYES">Yes</label> <label class="secondaryActionBtn"
								id="confirmNO">No</label>
							</span>
						</div>
						<!-- End of popup actions-->
					</div>
					<!-- End of pop up data -->

				</div>
				<!-- End of popupContent -->
			</div>
		</div>
		<!-- End of content wrapper -->

		<div id="dialog-modal" title="IBT Order">
			<div class="popupContent">

				<div class="popupData">


					<h4 class="alertText" id="alertBox">There is no article to be
						received. Cannot finalize the order.</h4>

					<div class="popupActionsWrapper">
						<span class="popupActions"> <label class="actionBtn"
							id="okBtn">OK</label>
						</span>
					</div>
					<!-- End of popup actions-->



				</div>
			</div>
			<!-- End of popupContent -->
		</div>

		<!-- End of popup -->

	</div>


	<%@include file="footer.jsp"%>

	<div id="dialog-back" title="Create Order">
		<div class="popupContent">

			<div class="popupData">

				<h4 class="alertText">Are you sure you want to discard the
					changes?</h4>
				<!-- Commented by Haresh
					<div class="ContentTableWrapper popMessage">

						<label>Are you sure you want to save the changes?</label>

					</div>
					 End of content table wrapper -->



				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="confirmYES"
						onclick="window.location.href= '../login/goingHome.htm'">Yes</label>
						<label class="secondaryActionBtn" id="confirmNO"
						onclick="$('#dialog-back').dialog('close');">No</label>
					</span>
				</div>
				<!-- End of popup actions-->


				<!--  commented by Haresh
					<div class="popMessageBtnWrapper">
						<label class="actionBtn popMessageBtn" id="confirmYES"
							onclick="$('#sohSubmit').submit();">Yes</label> <label
							class="actionBtn popMessageBtn" id="confirmNO"
							onclick="$('#dialog-cancelOrder').dialog('close');">No</label>
					</div>  -->

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>





	<div id="dialog-modal1" title="Verify Supplier">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>Supplier Name:</h3>
				<input type="#" placeholder="Enter supplier name"
					class="textbox textboxDefaultText" id="vendorDesc"> <label
					class="actionBtn" id="goButtonSample">Go</label>
			</div>
			<!-- End of popup search wrapper -->

			<div class="popupData" id="popupDataDiv"></div>
			<!-- End of pop up data -->
			<div class="popupActions hideBlock">
				<label class="actionBtn">Select & Close</label> <label
					class="actionBtn">Cancel</label>
			</div>

		</div>
		<!-- End of popupContent -->
	</div>
	<%@include file="descpopup.jsp"%>
	<div id="dialog-siteSearchPop" title="Site Search Results">
		<div class="popupContent">
			<div class="popupSearchWrapper" id="popupSearch">
				<h3>Sales Orgs:</h3>
				<select class="selectOptions" name="selectHeight" id="selectHeight">
					<c:forEach items="${salesOrgTypes}" var="salesOrgTypes">
						<option value="${salesOrgTypes.salesOrgNO}"
							<c:if test="${salesOrgTypes.salesOrgNO==user.salesOrg}">selected</c:if>>${salesOrgTypes.salesOrgNO}
							| ${salesOrgTypes.salesOrgName}</option>
					</c:forEach>
				</select>
				<h3>Distance(km):</h3>
				<select class="selectOptions" id="distance">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
					<option>80</option>
					<option>100</option>
				</select>
				<h3>Max Results:</h3>
				<select class="selectOptions" id="resSize">
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
					<option>80</option>
					<option>100</option>
				</select> <label class="actionBtn popupSearchBtn" id="vendorbtn">Search
					Stores</label>
			</div>
			<!-- End of popup search wrapper -->

			<label id="siteError"></label>
			<div class="popupData" id="popupData3">
				<!-- End of content table wrapper -->
			</div>
			<!-- End of pop up data -->
		</div>
		<!-- End of popupContent -->
	</div>


	<!--IBT site Popup -->
	<div id="dialog-IBTSitePop" title="Send to Receiving Site">
		<div class="popupContent">

			<div class="popupData">

				<h4 class="alertText" id="siteText">Please check following
					details before creating the order.</h4>


				<div class="ContentTableWrapper formWrapper">


					<div class="parameter">
						<label>IBT Order:</label> <label class="valueInfo" id="IBT-site"></label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label>Creation Date:</label> <label class="valueInfo"
							id="creation-Date"></label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label>Status:</label> <label class="valueInfo" id="status"></label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label>From:</label> <label class="valueInfo" id="fromStore"></label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label>To Store:</label> <label class="valueInfo" id="toStore"></label>
					</div>
					<!-- End of parameter -->

					<div class="parameter">
						<label>Total Value:</label> <label class="valueInfo"
							id="totalValue"></label>
					</div>
					<!-- End of parameter -->


				</div>
				<!-- End of content table wrapper -->



				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="confirmYES1">OK</label> <label class="secondaryActionBtn"
						id="confirmNO1">Cancel</label>
					</span>
				</div>
				<!-- End of popup actions-->

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<!-- End Cancel order popup -->


	<div id="dialog-modalTemperature" title="Send IBT Order">
		<div class="popupContent wizardContent">



			<div class="popupData ui-widget">

				<h4 class="alertText">Please provide the temperature to proceed
					to send the IBT order.</h4>


				<form method="POST" action=""
					class="jw-widget jw-hasmenu jw-hasprogress">
					<div class="jw-content ui-widget-content ui-helper-clearfix">
						<div class="jw-menu-wrap">
							<ol
								class="jw-menu ui-menu ui-widget ui-widget-content ui-corner-all">
								<li class="ui-menu-item ui-state-highlight ui-state-disabled">
									<a href="javascript:void(0);">Temperature Information</a>
								</li>
							</ol>
						</div>
					</div>


					<div class="formWrapper" title="Temperature Information">
						<h2 class="wizardTitle">Enter Temperature Information</h2>
						<div class="parameter">
							<label for="temperature" class="mandatory">Temperature</label> <input
								type="#" class="textbox" id="temperature"
								placeholder="Enter temperature" maxlength="5"
								onkeypress="return isNumberKeyTemp(event)">
						</div>
						<!-- End of parameter -->

						<div class="warningMessage">
							<h4>Warning message should be added in case input
								temperature is less or greater than the range......</h4>
						</div>

						<div class="parameter formQuestion">

							<p class="question">Question goes here... on selection of
								'Yes' Or 'No' Give message about what will happen</p>
							<input type="radio" name="question" value="yes" id="ansyes"
								checked><label for="ansyes" class="labelText">Yes</label>
							<input type="radio" name="question" value="no" id="ansno"><label
								for="ansno" class="labelText">No</label>
						</div>
						<!-- End of parameter -->

					</div>
					<!-- End of content table wrapper -->



					<div
						class="jw-footer ui-widget-header ui-corner-bottom popupActionsWrapper">
						<div class="jw-buttons ui-helper-clearfix">

							<label
								class="ui-state-highlight actionBtn jw-button-finish ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
								id="proceedInTemp"> <span class="ui-button-text">Proceed</span>
							</label> <label
								class="secondaryActionBtn jw-button-cancel ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
								id="cancelInTemp"> <span class="ui-button-text">Cancel</span>
							</label>
						</div>
					</div>
			</div>
			<!-- End of pop up data -->
			<!--  
			<input type="hidden" value="(-3 to 6)" id="tempFromService" />
			<input type="hidden" value="" id="deptFromService" /> 
			 -->
			<input type="hidden" value="${tempFromServiceIbtCreate}"
				id="tempFromService" /> <input type="hidden"
				value="${deptFromServiceIbtCreate}" id="deptFromService" />


		</div>
		<!-- End of popupContent -->
	</div>

	<div id="dialog-SalesHistoryPop" title="Sales History">
		<div class="popupContent">


			<div class="popupData" id="salesHistoryPopupData"></div>
			<!-- End of pop up data -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"
					id="historyClose">OK</label>
				</span>
			</div>



		</div>
		<!-- End of popupContent -->
	</div>
	<script>
	var orderNoForTemp=0;
	var refresh=false;
		$(function() {

			//new
			$('#temperature').change(function() {
				if($('#temperature').val().trim()!=""){  
				$('#temperature').val(parseFloat($('#temperature').val()).toFixed(1));
					}
			});
			$('.trimDecimalForSoh').filter(function(){
				var value=$(this).text();
				//alert(value.split(".")[0]);
				$(this).text(value.split(".")[0]);
				});
			
			fromSave=false;
			document.forms[0].autocomplete="off";
			//enter key press
			 $(document).keypress(function(event) {
				    if (event.which == 13) {
				        event.preventDefault();	
				        $('#searchAndAdd').click();
				        }
			 });
			$('.saveFlagCheck').filter(function()
					{
				if($(this).val()=='Y')
				{
					var id = (this.id).split('-')[1];
					var saveUom=$(("#saveUom-").concat(id)).val();
					$(("#uom-").concat(id)).text($('#'+saveUom).text());
					$(("#qtyEdit-").concat(id)).addClass('hideBlock');
					$(("#qty-").concat(id)).removeClass('hideBlock');
					$(("#uomValue-").concat(id)).val(saveUom);
 					$(("#uomEdit-").concat(id)).addClass('hideBlock');
					$(("#uom-").concat(id)).removeClass('hideBlock');	

					$(("#deliverDateEdit-").concat(id)).addClass('hideBlock');
					$(("#deliverDate-").concat(id)).removeClass('hideBlock');

					$(("#saveRecord-").concat(id)).addClass('hideBlock');
					$(("#editRecord-").concat(id)).removeClass('hideBlock');					
						
				}
				
				}
			);
			setTimeout(function(){
							$(("#qtyValue-").concat($('#listSize').val())).focus(function() { 
							    var elem = $(this);
							    elem.val(elem.val());
							});

							$(("#qtyValue-").concat($('#listSize').val())).focus();
						
						},200);
			$('#dropDownValWarehouse').val($('#warehouse').val());
			
			if($('#invalidQty').val()=='true')
			{
			$('#alertBox').text('Article quantity cannot be decimal value. It is truncated to whole number');
			$( "#dialog-modal" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				});;
				$('#invalidQty').val('');
			}
			//new changes
			var supplierRadio=$('input:radio[name=ibtSiteType]:checked').val();
			if(supplierRadio=="Warehouse"){
				$("#warehouseField").removeClass('hideBlock');
				$('#warehouse').val($("#dropDownVal").val());
				$("#vendorField").addClass('hideBlock');
				}else{
					$("#vendorField").removeClass('hideBlock');
					$('#storeNo').val($("#storeNo").val());
					$("#warehouseField").addClass('hideBlock');
					}
			if($('.row-1').text()=='')
				{
				$('#storeNo').removeAttr('readonly');
				$('#warehouse').removeAttr('disabled','disabled');
				
				}
			else{
				$('#storeNo').attr('readonly','readonly');
				$('#warehouse').attr('disabled','disabled');
				}
			
			var retainFlag=true;		
			if($("#buttonRetain").val()=='Warehouse')
			{
			$('#ibtSiteType').click();
			if($('.row-1').text()!=''){
				$('#ibtSiteType1').click(function(){
				    return false;
				});
			$("#warehouseField").removeClass('hideBlock');
			$('#warehouse').val($("#dropDownVal").val());
			$("#vendorField").addClass('hideBlock');
			retainFlag=false;
			}
			$("#warehouseField").removeClass('hideBlock');
			$('#warehouse').val($("#dropDownVal").val());
			$("#vendorField").addClass('hideBlock');
			}
			else if($("#buttonRetain").val()=='Store')
			{
			$('#ibtSiteType1').click();
			if($('.row-1').text()!=''){
				$('#ibtSiteType').click(function(){
				    return false;
				});
			$("#vendorField").removeClass('hideBlock');
			$('#storeNo').val($("#storeNo").val());
			$("#warehouseField").addClass('hideBlock');
			retainFlag=false;
			}
			$("#vendorField").removeClass('hideBlock');
			$('#storeNo').val($("#storeNo").val());
			$("#warehouseField").addClass('hideBlock');
			//$('#warehouse').val($("#dropDownVal").val());
			//$("#storeLabel").text("To Store");
			}
			
					
			 //checks radio buttons in IBT Site
			$('#ibtSiteType').click(function(){
				if($('.row-1').text()==''){
				$("#warehouseField").removeClass('hideBlock');
				$("#vendorField").addClass('hideBlock');
				$('#storeNo').val('');
				}
			});
			
			$('#ibtSiteType1').click(function(){
				if($('.row-1').text()==''){
				$("#vendorField").removeClass('hideBlock');
				$("#warehouseField").addClass('hideBlock');
				$('#warehouse').val("0");
				}
			});
			
			 //checks radio buttons in IBT Site
			$('#ibtSiteType').click(function(){
				if(retainFlag)
					$('#warehouse').val('0');
				//$("#warehouseField").removeClass('hideBlock');
				//$("#vendorField").addClass('hideBlock');
				//$("#storeLabel").text("To Warehouse");
			});
			
			$('#ibtSiteType1').click(function(){
				if(retainFlag)
					$('#storeNo').val('');
				//$("#vendorField").removeClass('hideBlock');
				//$("#warehouseField").addClass('hideBlock');
				//$("#storeLabel").text("To Store");
			});
			
			
			$("#addActionBtn").click(function(){ 
				$("#tableAddAction").removeClass('hideBlock');
			});
			$("#closeLink").click(function(){ 
				$('#validMsg').text('');
				$("#tableAddAction").addClass('hideBlock');
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
			 $( "#verifySupplier" ).click(function() {
				 if($('.row-1').text()==''){	
				 $('#validMsg').text('');
				 var vendorDesc=$('#storeNo').val().split("-")[0];
				 var vendorName=$('#storeNo').val().split("-")[1];
				 var sourceSupply=$('input:radio[name=ibtSiteType]:checked').val();
				 if($('#storeNo').val()==''){
					 $('#siteError').text('');
						$("#dialog-siteSearchPop").dialog( "open" );
						$("#resSize").val('20');
						$("#distance").val('25');
						$("#popupData3").html(''); 
					 
				 }
				 else if(vendorDesc!=''){
						$.ajax({
							type : "GET",
							url : "storeNoValidation.htm",
							beforeSend: function(){
								$('#statusImg').removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');
								},
							data : "vendorDesc=" + vendorDesc + "&ibtSiteType="+sourceSupply +"&vendorName="+vendorName ,
							success : function(response) {
								 $('#statusImg').addClass('loading hideBlock');
	 							$('#statusImg').removeClass('loading');
	 							var responseData=response.split("-");
	 							if(responseData[0]=='true'){
	 								$('#storeNo').val(responseData[1]+"-"+responseData[2]);
	 							}
	 							else if(responseData[0]=='multiple'){
	 								var distance=10;
	 								var maxResults=20;
	 								var salesOrg=$("#userSalesOrg").val();
	 								$.ajax({
	 									type : "GET",
	 									url : "nearByStoreValidation.htm",
	 									beforeSend: function(){
	 										$('#statusImg').removeClass('loading hideBlock');
	 										$('#statusImg').addClass('loading');
	 										},
	 									data : "distance=" + distance + "&maxResults="+maxResults +"&salesOrg="+salesOrg ,
	 									success : function(response) {
	 										 $('#statusImg').addClass('loading hideBlock');
	 			 							$('#statusImg').removeClass('loading');
	 			 							$('#siteError').text('');
	 			 							$("#dialog-siteSearchPop").dialog( "open" );
	 			 							$("#resSize").val('20');
	 			 							$("#distance").val('25');
	 			 							$("#popupData3").html(''); 
	 			 							$("#popupData3")
	 										.html(response);
	 								
	 									},
	 										error:function(data){
	 											$('#validMsg').text("Some problem in with service call");
	 											$('#statusImg').addClass('loading hideBlock');
	 				 							$('#statusImg').removeClass('loading');
	 										}
	 								});
	 							}
	 							else{
	 								$('#alertBox').text('Invalid store');
	 								$( "#dialog-modal" ).dialog( "open" );
	 								$('#okBtn').click(function(e){
	 									$( "#dialog-modal" ).dialog( "close" );
	 									});;
		 							}
							},
								error:function(data){
									$('#validMsg').text("Some problem in with service call");
									$('#statusImg').addClass('loading hideBlock');
		 							$('#statusImg').removeClass('loading');
								}
						}); 
				 }
				 }
				 });
			$('#searchAndAdd').click(function() {
				$('#dropDownValWarehouse').val($('#warehouse').val());
				
				$('#validMsg').text('');
				//$('.noData').html('');
				//$('.error').html('');
				var articleNo = $('#articleNo').val();
				//var vendorDesc="";//$('#supplier').val();
				var sourceSupply="";//$('input:radio[name=sourceSupply]:checked').val();
				var suppName="";//$('#supplier').val().split('-')[0];
			    /*var article = $('#article').val();
				var article_Ean=$('#article-Ean').val(); */
				var artType=$('input:radio[name=articleType]:checked').val();
				var ordQty=$('#ordqty').val();
				//var srcSupply=$('input:radio[name=ibtSiteType]:checked').val();
				//var warehouse=$('#warehouse').val();
				var storeNum = $('#storeNo').val();
				var suppNoTrimmed=$('#storeNo').val().split('-')[0];
				var srcSupply=$('input:radio[name=ibtSiteType]:checked').val();
				var warehouse=$('#warehouse').val();
				var storeNo=$('#storeNo').val().split('-')[0];
				if (articleNo == "" || $.trim(articleNo).length == 0 || $('#articleNo').val()=='Search by') {
					/* $('#alertBox').text('Please enter the article to add');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						}); */
					$('#validMsg').text('Please enter all mandatory details to search and add an article.');
					$('#articleNo').focus();
				}
				else if(artType=="ArticleNumber" && isNaN(articleNo)){
					/* $('#alertBox').html('Please enter a valid article number');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						}); */
						$('#validMsg').text('Please enter a valid article number.');
					$('#articleNo').focus();
					}
				/* else if (vendorDesc == "" || $.trim(vendorDesc).length == 0 || vendorDesc=='Enter supplier no. or name') {
					 $('#alertBox').text('Please enter the article to add');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						}); 
						$('#validMsg').text('Please enter the suppler number');
					$('#supplier').focus();
				} */
				//else if (ordQty == "" || $.trim(ordQty).length == 0) {
					/* $('#alertBox').html('Please enter the quantity');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						}); */
						//$('#validMsg').text('Please provide quantity to be ordered.');
					//$('#ordqty').focus();
				//}else if(isNaN(ordQty)||ordQty<0 || ordQty==0){
					/* $('#alertBox').html('Please enter a valid quantity');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						}); */
						//$('#validMsg').text('Please enter a valid quantity.');
					//$('#ordqty').focus();
					//}
					else if(srcSupply=='Warehouse' && warehouse=='0' )
						{
						$('#validMsg').text('Please select a warehouse');
						}
						else if(srcSupply=='Store' && (storeNum=='' || storeNum=='Enter store no. or name' || suppNoTrimmed=='' || $.trim(suppNoTrimmed).length == 0  ))
						{
							$('#validMsg').text('Please enter valid store number.');
						}else if(srcSupply=='Warehouse' && warehouse!='0' && warehouse==$('#fromStoreNo').val()){
							
							
							$('#validMsg').text('Sending and receiving site is the same, please choose a different warehouse.');
							
							} 
						else if(srcSupply=='Store' && (storeNum==$('#fromStoreNo').val() || suppNoTrimmed==$('#fromStoreNo').val())  ){
							
							$('#validMsg').text('Sending and receiving site is the same, please enter a different Store.');
							
							} 
				 
				else if(artType=="description" && articleNo!=''){
					if(srcSupply=='Warehouse'){
						$.ajax({
							type : "GET",
							url : "getDescription.htm",
							beforeSend: function(){
								$('#statusImg').removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');
								},
							//data : "vendorDesc=" + articleNo + "&sourceSupply=" +sourceSupply + "&suppName=" +suppName,
							data : "vendorDesc=" + articleNo + "&sourceSupply=" +srcSupply + "&suppName=" +storeNum + "&warehouse=" +warehouse,
							success : function(response) {
								// $('#warehouse').attr('disabled','disabled');
								if($('#msgChk').val()=='Please enter valid Store'){
									$('#validMsg').text('Please enter valid store number.');
								}else{
								$('#nodataMsg').text('');
								 $('.dialog-modal2').html(response);
								 if($('#nodata').val()=='N'){
								 if($('#sizeCheck1').val()>1){
									 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
										 $('#nodataMsg').text('');
										$('#vendorDesc2').val(articleNo);
										$("#dialog-modal2").parent().addClass("popupWrapper");			
										$("#dialog-modal2" ).dialog( "open" );
										$("#searchWarning").addClass('hideBlock');
										$("#popupSearch").removeClass('hideBlock');
										}
								 }
								 else{
									 $("#articleNo").val($("#artNo0").text());
									 $('#desIndex').val('0');
									 	$('#statusImg').removeClass('loading hideBlock');
										$('#statusImg').addClass('loading');
										$('#ibtSite').attr('action','addArticleDescription.htm');
										$('#ibtSite').attr('method','GET');
										$('#ibtSite').submit();
									 }
								 }else{
									 
									 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
										 $('#validMsg').text('Sorry no results returned for your search criteria. Please try again');
											 //$("#nodataMsg").addClass('tableTitle nodataMessage');
											//$('#nodataMsg').html('Sorry no results returned for your search criteria. Please try again');
											//$('.dialog-modal2').html('');
											//$("#dialog-modal2").parent().addClass("popupWrapper");			
											$("#dialog-modal2" ).dialog( "close" );
											//$("#searchWarning").addClass('hideBlock');
											//$("#popupSearch").removeClass('hideBlock');
											}
									 }
								 $('#statusImg').removeClass('loading');
								 $('#statusImg').addClass('loading hideBlock');
								
							}
								 bindMultipleSelect();		
							},
						});
						}else{
					$.ajax({
						type : "GET",
						url : "validateStoreForDes.htm",
						beforeSend: function(){
							$('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							},
						data : "ibtSiteType=" + srcSupply + "&warehouse=" + warehouse + "&storeNo=" + storeNo,
						success : function(response) {
						if(response=='true'){
							$.ajax({
								type : "GET",
								url : "getDescription.htm",
								beforeSend: function(){
									$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									},
								//data : "vendorDesc=" + articleNo + "&sourceSupply=" +sourceSupply + "&suppName=" +suppName,
								data : "vendorDesc=" + articleNo + "&sourceSupply=" +srcSupply + "&suppName=" +storeNum + "&warehouse=" +warehouse,
								success : function(response) {
									// $('#warehouse').attr('disabled','disabled');
									if($('#msgChk').val()=='Please enter valid Store'){
										$('#validMsg').text('Please enter valid store number.');
									}else{
									$('#nodataMsg').text('');
									 $('.dialog-modal2').html(response);
									 if($('#nodata').val()=='N'){
									 if($('#sizeCheck1').val()>1){
										 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
											 $('#nodataMsg').text('');
											$('#vendorDesc2').val(articleNo);
											$("#dialog-modal2").parent().addClass("popupWrapper");			
											$("#dialog-modal2" ).dialog( "open" );
											$("#searchWarning").addClass('hideBlock');
											$("#popupSearch").removeClass('hideBlock');
											}
									 }
									 else{
										 $("#articleNo").val($("#artNo0").text());
										 $('#desIndex').val('0');
										 	$('#statusImg').removeClass('loading hideBlock');
											$('#statusImg').addClass('loading');
											$('#ibtSite').attr('action','addArticleDescription.htm');
											$('#ibtSite').attr('method','GET');
											$('#ibtSite').submit();
										 }
									 }else{
										 
										 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
											 $('#validMsg').text('Sorry no results returned for your search criteria. Please try again');
												 //$("#nodataMsg").addClass('tableTitle nodataMessage');
												//$('#nodataMsg').html('Sorry no results returned for your search criteria. Please try again');
												//$('.dialog-modal2').html('');
												//$("#dialog-modal2").parent().addClass("popupWrapper");			
												$("#dialog-modal2" ).dialog( "close" );
												//$("#searchWarning").addClass('hideBlock');
												//$("#popupSearch").removeClass('hideBlock');
												}
										 }
									 $('#statusImg').removeClass('loading');
									 $('#statusImg').addClass('loading hideBlock');

								}
									 bindMultipleSelect();			
								},
							});
							}
						else{
							 $('#statusImg').removeClass('loading');
							 $('#statusImg').addClass('loading hideBlock');
							 $('#validMsg').text('Please enter valid store number.');
							
							}
						}
				 });
				}
					
					}
				else {

					$('#statusImg').removeClass('loading hideBlock');
					$('#statusImg').addClass('loading');
					$('#ibtSite').attr('action','createManualOrder.htm');
					$('#ibtSite').attr('method','POST');
					$('#ibtSite').submit();
			}
			}); 
			$('#sendIBT').click(function(){
				var vendorDesc='';
				var sourceSupply='';
				var temperatureForRecord=$('#temperature').val();
				$.ajax({
					type : "GET",
					url : "sendIBT.htm",
					beforeSend: function(){
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "vendorDesc=" + vendorDesc + "&temperatureForRecord="+temperatureForRecord,
					success : function(response) {
						var status=response.split(':')[0];
						if(status=='true'){
							$('#alertBox').text(response.split(':')[1]);
							$( "#dialog-modal1" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								$('#change-status').text('Authorized');
								$('#sendIBTLabel').hide();
								if($('#recSite').val()==$('#sendSite').val()){
								$('#receiveOrder').show();
								}
								$('#cancelOrder').hide();
								$('#editdDate').hide();
								//$('#msg').val('');
								});
							}
						else{
							$('#alertBox').text(response.split(':')[1]);
							$( "#dialog-modal1" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								
								//$('#msg').val('');
								});;
							}
						
					
						 //$('#popupDataDiv').html(response);
						 $('#statusImg').addClass('loading hideBlock');
				         $('#statusImg').removeClass('loading');
					},
				});
				});
		$("#goButtonSample2")
						.click(
								function() {
									$('#validMsg').text('');
									$('#dropDownValWarehouse').val($('#warehouse').val());
									//$('#warehouse').removeAttr('disabled','disabled');
									
									var vendorDesc=$('#vendorDesc2').val();
									//var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
									if(vendorDesc!=''){
									$.ajax({
										type : "GET",
										url : "getDescription.htm",
										beforeSend: function(){


											$('#statusImg').removeClass('loading hideBlock');
																			$('#statusImg').addClass('loading');
																				
											},
										data : "vendorDesc=" + vendorDesc,
										success : function(response) {
											$('#nodataMsg').text('');
											 $('.dialog-modal2').html(response);
											 if($('#nodata').val()=='N'){
											 if($('#sizeCheck1').val()>1){
												 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
													 $('#nodataMsg').text('');
													$('#vendorDesc2').val(articleNo);
													$("#dialog-modal2").parent().addClass("popupWrapper");			
													$("#dialog-modal2" ).dialog( "open" );
													$("#searchWarning").addClass('hideBlock');
													$("#popupSearch").removeClass('hideBlock');
													}
											 }
											 else{
												 
												 $("#articleNo").val($("#artNo0").text());
												 $('#desIndex').val('0');
												 	$('#statusImg').removeClass('loading hideBlock');
													$('#statusImg').addClass('loading');
													$('#ibtSite').attr('action','addArticleDescription.htm');
													$('#ibtSite').attr('method','GET');
													$('#ibtSite').submit();
												 }
											 }
											 else{
												 //if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
														$('#nodataMsg').text('Sorry no results returned for your search criteria. Please try again');
														$('.dialog-modal2').html('');
														//$("#dialog-modal2").parent().addClass("popupWrapper");			
														//$("#dialog-modal2" ).dialog( "open" );
														//$("#searchWarning").addClass('hideBlock');
														//$("#popupSearch").removeClass('hideBlock');
														//}
												 }


											 $('#statusImg').addClass('loading hideBlock');
											 		

											 $('#statusImg').removeClass('loading');
											 bindMultipleSelect();		
										},
									});
									}
									else{
										$('#nodataMsg').text('Please enter article description.');
										$('.dialog-modal2').html('');
										}



									}
								
								);
					 $("#goButtonSample")
						.click(
								function() {
									$('#validMsg').text('');
									
									var vendorDesc=$('#vendorDesc').val();
									 var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
									
									$.ajax({
										type : "GET",
										url : "autocomplete.htm",
										beforeSend: function(){
											$('#statusImg').removeClass('loading hideBlock');
											$('#statusImg').addClass('loading');
											},
											data: { vendorDesc: vendorDesc, sourceSupply: sourceSupply},
										//data : "vendorDesc=" + vendorDesc + "&sourceSupply="+sourceSupply  ,
										success : function(response) {
											 $('#popupDataDiv').html(response);
											 $('#statusImg').addClass('loading hideBlock');
									         $('#statusImg').removeClass('loading');
										},
									});



									}
								
								);	
					 $("#confirmAndFinalise").click(function(){
						 $('#validMsg').text('');
						
							var srcSupply=$('input:radio[name=ibtSiteType]:checked').val();
							var warehouse=$('#warehouse').val();
							var storeNo=$('#storeNo').val().split('-')[0];
							
							var flag=false;
							var flag1=false;
							$('.dateCheck').filter(function()
									{
								if($(this).css('display')=='table-cell')
								{
									var id = (this.id).split('-')[1];
									$('#alertBox').text('Please save the articles before you finalise the order.');
									$( "#dialog-modal" ).dialog( "open" );
									$('#okBtn').click(function(e){
										$( "#dialog-modal" ).dialog( "close" );
										$(("#qtyEdit-").concat(id)).focus();
										});;
										flag1=true;
										
										}
								
								}
							);
						
						$('.nullCheck').filter(function()
								{
							if($(this).text()==0)
							{
								$('#alertBox').text('Please provide quantity to be ordered.');
								$( "#dialog-modal" ).dialog( "open" );
								$('#okBtn').click(function(e){
									$( "#dialog-modal" ).dialog( "close" );
									});;
									flag=true;
									
									}	
							}
						);
					
						
						if(srcSupply!='' && warehouse!='0')
						{
							validWarehouse=true;
							  
						}
										
						if(srcSupply=='Warehouse' && warehouse=='0' )
						{
						makeAlert('Please select a warehouse to finalize');
						}
						else if(srcSupply=='Store' && (storeNo=='' || storeNo=='Enter store no. or name'))
						{
						makeAlert('Please enter valid store number to finalize');	
						}
						
						else if($('#row-1').text()=='')
						{
						
						makeAlert('There is no article to be received. Cannot finalize the order');
						
						}
						else if(flag1)
						{
						$('#alertBox').text('Please save the articles before you finalise the order.');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							});;
						}
						else if(flag)
						{
						makeAlert('Please provide quantity to be ordered.');
						
						}
						
						else if(srcSupply!='' && (storeNo!='' || warehouse!='0'))
							{
								 $.ajax({
										type : "GET",
										url : "validateStore.htm",
										beforeSend: function(){
											$('#statusImg').removeClass('loading hideBlock');
											$('#statusImg').addClass('loading');
											},
										data : "ibtSiteType=" + srcSupply + "&warehouse=" + warehouse + "&storeNo=" + storeNo,
										success : function(response) {
											$('#statusImg').removeClass('loading');
											$('#statusImg').addClass('loading hideBlock');
											if(response!='false' && response!=''){
												var a=response.split("-");
												$('#IBT-site').text(a[1]);
												$('#creation-Date').text(a[2]);
												$('#fromStore').text($('#fromStoreNo').val()+'-'+$('#fromStoreName').val());
												if(srcSupply=='Store'){
												$('#toStore').text(a[5]+'-'+a[6]);
												$('#storeNoForCancel').val(a[5]);
												}
												else{
													var wareHouseNo=$('#'+warehouse).text().split('|')[0];
													var wareHouseName=$('#'+warehouse).text().split('|')[1].trim();
													$('#toStore').text(wareHouseNo+'-'+wareHouseName);
													$('#storeNoForCancel').val(wareHouseNo);
													}	
												$('#status').text(a[3]);
												$('#totalValue').text('$'+parseFloat(a[4]).toFixed(2));
												$("#dialog-IBTSitePop" ).dialog( "open" );
												
												$("#confirmYES1").click(function(e) {

													if($("#confirmYES1").text()=="OK"){
													 $( "#dialog-IBTSitePop" ).dialog( "close" );
													 $.ajax({
															type : "GET",
															url : "finalizeManualOrder.htm",
															beforeSend: function(){
																$('#statusImg').removeClass('loading hideBlock');
																$('#statusImg').addClass('loading');
																},
															data : "ibtSiteType=" + srcSupply + "&warehouse=" + warehouse + "&storeNo=" + storeNo,
															success : function(response) {
																var result=response.split('#')[0];
																var orderRefNo=response.split('#')[1];
																var temp=response.split('#')[2];
																var dept=response.split('#')[3];
																$('#tempFromService').val(temp);
																$('#deptFromService').val(dept);
																orderNoForTemp=orderRefNo;
																refresh=true;
																if(result=='true'){
																	//makeAlert1('Order creation request was successfully submitted with the reference #'+orderRefNo);			
																	//makeAlert1('Order creation request was successfully submitted');
																	$("#storeNo").val('');
																	$("#con-final").text('');
																	$("#con-final").css('display','none');
																	$("#treetable").text('');
																	$("#treetable").css('display','none');
																	$("#con-final").css('display','none');
																	$("#buttonRetain").val('');
																	$('#ibtSiteType').click();
																	$("#warehouseField").removeClass('hideBlock');
																	$("#vendorField").addClass('hideBlock');
																	$("#storeLabel").text("To Warehouse");
																	$('#statusImg').removeClass('loading');
																	$('#statusImg').addClass('loading hideBlock');
																	
																	$("#dialog-IBTSitePop" ).dialog( "open" );
																	
																	$('#siteText').text('Order created successfully. Do you want to send to order now?');
																	$('#IBT-site').text(orderRefNo);
																	$('#confirmYES1').text('Send Now');
																	$('#confirmYES1').attr('id','sendNow');
																	$('#confirmNO1').text('Send Later');
																	$('#confirmNO1').attr('id','sendLater');


																	$("#sendNow").click(function(e) {

																		if($('#tempFromService').val()!="" && $.trim($("#tempFromService").val()).length != 0){

																			$("#dialog-IBTSitePop" ).dialog( "close" );
																			$('.warningMessage h4').addClass('hideBlock');
																			$('.formQuestion').addClass('hideBlock');		
																			$( "#dialog-modalTemperature" ).dialog( "open" );
																			$('#temperature').focus();


																			}else{


																				$("#dialog-IBTSitePop" ).dialog( "close" );
																				var orderNo=orderRefNo;
																				var sourceSupply='';
																				var temperatureForRecord=$('#temperature').val();
																				
																				$.ajax({
																					type : "GET",
																					url : "sendIBT.htm",
																					beforeSend: function(){
																						$('#statusImg').removeClass('loading hideBlock');
																						$('#statusImg').addClass('loading');
																						},
																					data : "orderNo=" + orderNo + "&temperatureForRecord="+temperatureForRecord,
																					success : function(response) {
																						var status=response.split(':')[0];
																						if(status=='true'){
																							$('#alertBox').text(response.split(':')[1]);
																							$( "#dialog-modal" ).dialog( "open" );
																							$('#okBtn').click(function(e){
																								$( "#dialog-modal" ).dialog( "close" );
																								$('#ibtSite').attr('action','onPageLoad.htm');
																								$('#ibtSite').attr('method','GET');
																								$('#ibtSite').submit();
																								//$('#change-status').text('Authorized');
																								//$('#sendIBTLabel').hide();
																								//if($('#recSite').val()==$('#sendSite').val()){
																								//$('#receiveOrder').show();
																								//}
																								//$('#cancelOrder').hide();
																								//$('#editdDate').hide();
																								//$('#msg').val('');
																								});
																							}
																						else{
																							$('#alertBox').text(response.split(':')[1]);
																							$( "#dialog-modal" ).dialog( "open" );
																							$('#okBtn').click(function(e){
																								$( "#dialog-modal" ).dialog( "close" );
																								$('#ibtSite').attr('action','onPageLoad.htm');
																								$('#ibtSite').attr('method','GET');
																								$('#ibtSite').submit();
																								//$('#msg').val('');
																								});;
																							}
																						
																					
																						 //$('#popupDataDiv').html(response);
																						 $('#statusImg').addClass('loading hideBlock');
																				         $('#statusImg').removeClass('loading');
																					},
																				});
																				}
																		

																		});
																	/* $("#sendNow").click(function(e) {
																		$("#dialog-IBTSitePop" ).dialog( "close" );
																			var orderNo=orderRefNo;
																			var sourceSupply='';
																			$.ajax({
																				type : "GET",
																				url : "sendIBT.htm",
																				beforeSend: function(){
																					$('#statusImg').removeClass('loading hideBlock');
																					$('#statusImg').addClass('loading');
																					},
																				data : "orderNo=" + orderNo + "&sourceSupply="+sourceSupply  ,
																				success : function(response) {
																					var status=response.split(':')[0];
																					if(status=='true'){
																						$('#alertBox').text(response.split(':')[1]);
																						$( "#dialog-modal" ).dialog( "open" );
																						$('#okBtn').click(function(e){
																							$( "#dialog-modal" ).dialog( "close" );
																							$('#ibtSite').attr('action','onPageLoad.htm');
																							$('#ibtSite').attr('method','GET');
																							$('#ibtSite').submit();
																							//$('#change-status').text('Authorized');
																							//$('#sendIBTLabel').hide();
																							//if($('#recSite').val()==$('#sendSite').val()){
																							//$('#receiveOrder').show();
																							//}
																							//$('#cancelOrder').hide();
																							//$('#editdDate').hide();
																							//$('#msg').val('');
																							});
																						}
																					else{
																						$('#alertBox').text(response.split(':')[1]);
																						$( "#dialog-modal" ).dialog( "open" );
																						$('#okBtn').click(function(e){
																							$( "#dialog-modal" ).dialog( "close" );
																							$('#ibtSite').attr('action','onPageLoad.htm');
																							$('#ibtSite').attr('method','GET');
																							$('#ibtSite').submit();
																							//$('#msg').val('');
																							});;
																						}
																					
																				
																					 //$('#popupDataDiv').html(response);
																					 $('#statusImg').addClass('loading hideBlock');
																			         $('#statusImg').removeClass('loading');
																				},
																			});
																			}); */
																	
																	$("#sendLater").click(function(e) {
																		$('#ibtSite').attr('action','onPageLoad.htm');
																		$('#ibtSite').attr('method','GET');
																		$('#ibtSite').submit();
																	});
																	
																	
																	
																}
																else{
																	
																	$('#statusImg').removeClass('loading');
																	$('#statusImg').addClass('loading hideBlock');
																	makeAlert("Order creation failed due to SAP error -"+response);
																	
																}
																//$( "#dialog-IBTSitePop" ).dialog( "close" );
																									
															},
														});
													}
												  }); 
												 $("#confirmNO1").click(function(e) {
													 //if("#confirmYES1")
													 $( "#dialog-IBTSitePop" ).dialog( "close" );	
													
												 });
																				
											}
											else{
												$('#statusImg').addClass('loading hideBlock');
												$('#statusImg').removeClass('loading');	
												$('#validMsg').text('Please enter a valid Store');
												
											}
										
										}
								 });
								  
							}
					 });

					 
						function makeAlert(msg){
							$('#alertBox').text(msg);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								});;
							
							}
						function makeAlert1(msg){
							$('#alertBox').text(msg);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$('#ibtSite').attr('action','onPageLoad.htm');
								$('#ibtSite').attr('method','GET');
								$('#ibtSite').submit();
								});;
							
							}
						function formateDate(v){
							if(v.length==8)
							{
							var finalDate=parseDate(v).getFullYear();
							var splitDate=v.split("/");
							finalDate =splitDate[0]+"/"+splitDate[1]+"/"+finalDate;
							return finalDate;
							}
							else{
								return v;	
								}
							}
			$("#back").click(function(e) {
				$('#validMsg').text('');

				 if($('.ContentTable .indenter').parent().text()=="No articles added in the order.")
								 window.location.href= "../login/goingHome.htm";		// window.history.back();'
								 else
									$("#dialog-back").dialog("open");	// window.history.back();'
				  });
			$(".closePopUp").click(function(e) {
				
				if(refresh){
				$("#ibtSite").attr('action','onPageLoad.htm');
				$("#ibtSite").attr('method','GET');
				$("#ibtSite").submit();}
			
								 
				  });
			
			 $( "#dialog-back" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 120,
					maxHeight: 600,
					width: 350
				});
			 $("#dialog-back").parent().addClass("popupWrapper");

			/*when edit button is clicked displays input box in editable cells*/
			$(".editRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				
				$(("#row-").concat(id)).addClass('rowHighlight');
				$(("#qtyEdit-").concat(id)).removeClass('hideBlock');
				$(("#qty-").concat(id)).addClass('hideBlock');

				$(("#uomEdit-").concat(id)).removeClass('hideBlock');
				$(("#uom-").concat(id)).addClass('hideBlock');
				
				//$(("#rosterDateEdit-").concat(id)).removeClass('hideBlock');
				//$(("#rosterDate-").concat(id)).addClass('hideBlock');
				
				$(("#deliverDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#deliverDate-").concat(id)).addClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).removeClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
			});
			
			/*when save button is clicked displays input box is disabled*/
			$(".saveRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				var index=id;
				if($(("#deliverDateValue-").concat(id)).val().split('/').length==3)
				{
					var delDate=formateDate($(("#deliverDateValue-").concat(id)).val());
				var rosDate=formateDate($(("#rosterDate-").concat(id)).text());
				var currentDate=new Date();
				var splittedRosDate=rosDate.split('/');
				var splittedDelDate=delDate.split('/');
				var actualRosDate=new Date();
				var actualDelDate=new Date();
				var month1=splittedRosDate[1]-1;
				var month2=splittedDelDate[1]-1;
				actualRosDate.setFullYear(splittedRosDate[2],month1,splittedRosDate[0]);
				actualDelDate.setFullYear(splittedDelDate[2],month2,splittedDelDate[0]);
				var splittedOne=splittedRosDate[0]+splittedRosDate[1]+splittedRosDate[2];
				var splittedTwo=splittedDelDate[0]+splittedDelDate[1]+splittedDelDate[2];	
				var qty=$(("#qtyValue-").concat(id)).val();
				var uom=$(("#uomValue-").concat(id)).val();
				var totalOrdered=$(("#totalOrder-").concat(id)).text();
				if(qty=='')
					{
					$('#alertBox').text('Please provide quantity to be ordered.');
					$(("#qtyValue-").concat(id)).focus();
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						});
					}
				else if((qty<0)||isNaN(qty)||qty==0){
								//$('#alertBox').text('please enter a valid quantity');
								//$(("#qtyValue-").concat(id)).val('');
								//$(("#qtyValue-").concat(id)).focus();
								//$( "#dialog-modal" ).dialog( "open" );
								/* $('#okBtn').click(function(e){
									
									$( "#dialog-modal" ).dialog( "close" );
									}); */
								fromSave=true;
								$(("#DeleteRecord-").concat(id)).click();
								}
				else if(splittedOne=="")
				{
					$('#alertBox').text('Please fill roster date');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						$(("#rosterDateValue-").concat(id)).focus();
						});;
					
						
				}
				else if((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999) || (splittedOne.length!=8 && splittedOne.length!=6))
				{
					$('#alertBox').text('Please enter a valid date');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						$(("#rosterDateValue-").concat(id)).focus();
						});;
					
						
				}
				else if(currentDate.getTime()>actualRosDate.getTime()){
					
						$('#alertBox').text('Roster date must be later than today.');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
				
						$(("#rosterDateValue-").concat(id)).focus();
						});;
						
					}
				else if(splittedTwo=="")
				{
					$('#alertBox').text('Please fill roster date');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						$(("#deliverDateValue-").concat(id)).focus();
						});;
					
					
				}
				else if((splittedDelDate[0] > 31 || splittedDelDate[1] > 12 || splittedDelDate[2] > 9999) || (splittedTwo.length!=8) && splittedTwo.length!=6)
				{
					$('#alertBox').text('Please enter a valid date');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						$(("#deliverDateValue-").concat(id)).focus();
						});;
						
				}
				else if(currentDate.getTime()>actualDelDate.getTime()){
					
					$('#alertBox').text('Delivery date shoud not be  less than roster date');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#deliverDateValue-").concat(id)).focus();
					});;
					
				}
				else if(actualRosDate.getTime()>actualDelDate.getTime()){
					
						$('#alertBox').text('Delivery date shoud not be  less than roster date');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						$(("#deliverDateValue-").concat(id)).focus();
						});;
						
					}
				else{
					// $('#cancelId').text('Are you sure you want to confirm?');
					 //$( "#dialog-cancelOrder" ).dialog( "open" );				
					
						 $.ajax({
								type : "GET",
								url : "saveDetail.htm",
								beforeSend: function(){
									$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									},
							
								data : "index=" + index + "&orderDate=" + rosDate + "&deliveryDate=" + delDate + "&inputQty=" + qty  + "&totalOrdered=" + totalOrdered + "&uom=" + uom,
								success : function(response) {
									$('#costVal').val(response);
									$('#statusImg').addClass('loading hideBlock');
									$('#statusImg').removeClass('loading');		
								},
							});
							
							$(("#row-").concat(id)).removeClass('rowHighlight');
							$(("#qtyEdit-").concat(id)).addClass('hideBlock');
							$(("#qty-").concat(id)).removeClass('hideBlock');
							$(("#qty-").concat(id)).text($(("#qtyValue-").concat(id)).val());

							$(("#uomEdit-").concat(id)).addClass('hideBlock');
							$(("#uom-").concat(id)).removeClass('hideBlock');
							var idVal=$(("#uomValue-").concat(id)).val();
							$(("#uom-").concat(id)).text($("#"+idVal).text());
						
							
							$(("#deliverDateEdit-").concat(id)).addClass('hideBlock');
							$(("#deliverDate-").concat(id)).removeClass('hideBlock');
							$(("#deliverDate-").concat(id)).text($(("#deliverDateValue-").concat(id)).val());
							$('#articleNo').focus();
							$(("#saveRecord-").concat(id)).addClass('hideBlock');
							$(("#editRecord-").concat(id)).removeClass('hideBlock');
							 $( "#dialog-cancelOrder" ).dialog( "close" );
						
					 $("#confirmNO").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );				
					 });
				}
			}
			else if($(("#deliverDateValue-").concat(id)).val().split('/').length!=3){
				$('#alertBox').text('Please enter a valid date');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#deliverDateValue-").concat(id)).focus();
					});;
					}
			else{
				$('#alertBox').text('Please enter a valid date');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#rosterDate-").concat(id)).focus();
					});;
					
				}
			});
			 $("#clear").click(function(e) {
				 $('#validMsg').text('');	
				 $('#cancelId').text('Are you sure you want to clear the order?');
				 $( "#dialog-cancelOrder" ).dialog( "open" );				


				 
				 $("#confirmYES").click(function(e) {
					 $("#ibtSite").attr('action','onPageLoad.htm');
						$("#ibtSite").attr('method','GET');
						$("#ibtSite").submit();
					  }); 
				 $("#confirmNO").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });
				 });

				  
				  

			$( ".deleteBtn" ).click(function(){
				$('#dropDownValWarehouse').val($('#warehouse').val());
				var index=(this.id).split('-')[1];
				$("#index").val(index);
				$( "#dialog-cancelOrder" ).dialog( "open" );
				 if( fromSave==false)
				 {
					 $('#cancelId').text('Are you sure you want to delete the article?');
					 $("#confirmYES").text('Yes');
					 $("#confirmNO").text('No');
				 }	
			 else
				 {
					 $('#cancelId').text('Setting Quantity to zero will remove this item');	
					 $("#confirmYES").text('Ok');
					 $("#confirmNO").text('Cancel');
				 }
				 fromSave=false;
			
				 
				 //$('#cancelId').text('Are you sure you want to delete the article?');				
				 $("#confirmYES").click(function(e) {
					 $('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						$("#ibtSite").attr('action','deleteItem.htm');
						$("#ibtSite").attr('method','GET');
						$("#ibtSite").submit();
					  }); 
				 $("#confirmNO").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });
				
				
			});
			$('.inputQty').filter(function()
					{
					var id = (this.id).split('-')[1];
					
					
				if($(("#baseUom-").concat(id)).val()=='each')
					{
					//onkeyup="isNumber1('#ordqty')"
					$(("#qtyValue-").concat(id)).attr('onkeypress','return isNumberKey(event)');
					}	
				else
					{
					//var id1=$(("#qtyValue-").concat(id));
					//var id1='#qtyValue-'+id;
					$(("#qtyValue-").concat(id)).attr('onkeypress','return isDecimalNumber(this)');
					}
				}
				);
			$( ".qtyValue" ).change(function(){
				/* var id=(this.id).split('-')[1];
				
				//parseFloat(25.777777777).toFixed(2)
				if(($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text())%1==0){
				$(("#totalOrder-").concat(id)).text($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text());
				}
				else{
					var quantity=$(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text();
					$(("#totalOrder-").concat(id)).text(parseFloat(quantity).toFixed(2));
					} */
					var id=(this.id).split('-')[1];
					var val = id + "1" ;
					if($(("#qtyValue-").concat(id)).val()!=''){
					if($(("#uomValue-").concat(id)).val()==val)
						{
						if(($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text())%1==0){
							$(("#totalOrder-").concat(id)).text($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text());
							}
						else{
							var quantity=$(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text();
							$(("#totalOrder-").concat(id)).text(parseFloat(quantity).toFixed(2));
						}
						}
					else
						{
						var quantity=$(("#qtyValue-").concat(id)).val();
					$(("#totalOrder-").concat(id)).text(parseFloat(quantity).toFixed(2));
						}}
					else{
						$(("#totalOrder-").concat(id)).text('0');}
			});

			/* $( ".qtyValue" ).keyup(function(){
				var id=(this.id).split('-')[1];
				if($(("#uomValue-").concat(id)).val()==1)
					{
					if(($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text())%1==0){
						$(("#totalOrder-").concat(id)).text($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text());
						}
					else{
						var quantity=$(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text();
						$(("#totalOrder-").concat(id)).text(parseFloat(quantity).toFixed(2));
					}
					}
				else
					{
					var quantity=$(("#qtyValue-").concat(id)).val();
				$(("#totalOrder-").concat(id)).text(parseFloat(quantity).toFixed(2));
					}
			}); */
			$( ".uomValue" ).change(function(){
				var id=(this.id).split('-')[1];
				var val = id + "1" ;
				if($(("#qtyValue-").concat(id)).val()!=''){
				if($(("#uomValue-").concat(id)).val()==val){
					$(("#totalOrder-").concat(id)).text($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text());
					}
				else{
					$(("#totalOrder-").concat(id)).text($(("#qtyValue-").concat(id)).val());
					}
			}
				else{
					$(("#totalOrder-").concat(id)).text('0');}
			});
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
			
			$("#treetable").treetable({
			expandable: true
		});
		
			 $(".secondaryActionBtn").click(function(e) {
				 //window.history.back();
			  }); 
			
			/* // code to open popup on cancel order
				$( "#siteSearchPop" ).click(function() {
				$( "#dialog-siteSearchPop" ).dialog( "open" ); 
				}); */
				/* $("#vendorSearch").click(function() {
					var radioSelected = getRadioValue('ibtSiteType');
					if(radioSelected=="Warehouse"){
						}else{
							$('.siteError').html('');
							$('#store-search,#overlay-back').fadeIn(500);
							$("#resSize").val('20');
							$("#distance").val('25');
							$("#siteDet").html('');
							$("#siteDet").hide();

							}

				}); */
			
			 $("#vendorbtn")
			 .click(
			 		function() {

			 			$('#siteError').text('');
			 			$('#popupData3').html('');
			 			/* if(($(
			 			"#distance").val() == "") && $.trim($("#distance").val()).length == 0){
			 				$('.siteError').html('Please enter the distance');
			 				$('#distance').focus();
			 				$('#siteDet').html('');
			 			}else if(($(
			 			"#resSize").val() == "") && $.trim($("#resSize").val()).length == 0){
			 				$('.siteError').html('Please enter the result size');
			 				$('#resSize').focus();
			 				$('#siteDet').html('');
			 			}
			 			else if($('.ui-multiselect span').text()=="Select options")
			 				{
			 				$('.siteError').html('Please select the sales org');
			 				$('#siteDet').html('');
			 				}
			 			else */{
			 				
			 				var distance = $("#distance")
			 						.val();
			 				var resSize = $("#resSize")
			 						.val();
			 				var optionsList=$("#selectHeight")
	 						.val();;

			 				$.ajax({
			 							type : "GET",
			 							url : "siteSearch.htm",
			 							data : "distance="
			 									+ distance
			 									+ "&resSize="
			 									+ resSize
			 									+ "&optionsList="
			 									+optionsList,
			 							success : function(
			 									response) {

			 								$("#popupData3")
			 										.html(response);
			 								

			 							},
			 						});
			 			}
			 		});
			 	
				function makeAlert(msg){
					$('#alertBox').text(msg);
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						});;
					
					}
				
		
			
		});
		    $( "#dialog-siteSearchPop" ).dialog({ 
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 200,
			maxHeight: 600,
			width: 750
			});
			$("#dialog-siteSearchPop").parent().addClass("popupWrapper");

		$( "#dialog-modal1" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 200,
			maxHeight: 600,
			width: 700
		});
		$( "#dialog-modal2" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 200,
			maxHeight: 600,
			width: 700
		});
			$( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
			$("#dialog-modal").parent().addClass("popupWrapper");

			 $( "#dialog-cancelOrder" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 120,
					maxHeight: 600,
					width: 350
				});
				$("#dialog-cancelOrder").parent().addClass("popupWrapper");
				$(".inputDate").datepicker({
					zIndex:50
				});

				function isNumberKey(evt)
			    {
			       var charCode = (evt.which) ? evt.which : event.keyCode;
			       if (charCode > 31 && (charCode< 48 || charCode >57))
			          return false;

			       return true;
			    }
				function isDecimalNumber(evt)
				{
				var charCode = (evt.which) ? evt.which : event.keyCode
				var str=evt.value;
				if ((str.indexOf('.')>=0) && (event.keyCode==46)) return false;
				 
				          if (charCode != 46 && charCode >31
				            && (charCode< 48 || charCode >57))
				             return false;
				 
				          return true;
				 
				}

				//temperature check pop up
				$( "#dialog-modalTemperature" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 200,
					maxHeight: 600,
					width: 430
				});
			
			$("#dialog-modalTemperature").parent().addClass("popupWrapper");
				
			//Ibt site pop up
				$( "#dialog-IBTSitePop" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 200,
					maxHeight: 600,
					width: 400
				});
				$("#dialog-IBTSitePop").parent().addClass("popupWrapper")
				
				function showHistoryPopUp(articleNo,articleName,om){
					$('#statusImg').removeClass('loading hideBlock');
					$('#statusImg').addClass('loading');
					$.ajax({
						type : "GET",
						url : "getSalesHistory.htm",
						
						data : "articleNo=" + articleNo,
						success : function(response) {
							$('#salesHistoryPopupData').html('');
							$("#dialog-SalesHistoryPop").parent().addClass("popupWrapper");	

							$('#salesHistoryPopupData').html(response);

							$("#historyArticleInfo").html("Showing sales history for Article"+articleNo+"-"+articleName);
							$("#omVal").html(om);
							$('.salesRow').filter(function(){
								
								if($(this).find('.salesMonday').text().trim()=="" || $(this).find('.salesMonday').text().trim()==null)
									mon=0;
								else
									mon=parseFloat($(this).find('.salesMonday').text().trim());

								if($(this).find('.salesTuesday').text().trim()=="" || $(this).find('.salesTuesday').text().trim()==null)
									tue=0;
								else
									tue=parseFloat($(this).find('.salesTuesday').text().trim());

								if($(this).find('.salesWednesday').text().trim()=="" || $(this).find('.salesWednesday').text().trim()==null)
									wed=0;
								else
									wed=parseFloat($(this).find('.salesWednesday').text().trim());

								if($(this).find('.salesThursday').text().trim()=="" || $(this).find('.salesThursday').text().trim()==null)
									thu=0;
								else
									thu=parseFloat($(this).find('.salesThursday').text().trim());

								if($(this).find('.salesFriday').text().trim()=="" || $(this).find('.salesFriday').text().trim()==null)
									fri=0;
								else
									fri=parseFloat($(this).find('.salesFriday').text().trim());

								if($(this).find('.salesSaturday').text().trim()=="" || $(this).find('.salesSaturday').text().trim()==null)
									sat=0;
								else
									sat=parseFloat($(this).find('.salesSaturday').text().trim());

								if($(this).find('.salesSunday').text().trim()=="" || $(this).find('.salesSunday').text().trim()==null)
									sun=0;
								else
									sun=parseFloat($(this).find('.salesSunday').text().trim());

								$(this).find('.totalHistory').text((mon+tue+wed+thu+fri+sat+sun).toFixed(3));

								});
							var date1 = new Date();
							var parts = (date1.getDate()+"/"+(date1.getMonth()+1)+"/"+date1.getFullYear()).split('/');
							date1.setFullYear(parts[2], parts[1]-1, parts[0]); 
							if(date1.getDay()=='0'){
								date1.setTime(date1.getTime() + (86400000));
							}else if(date1.getDay()=='1'){
								date1.setTime(date1.getTime());
								}
							else if(date1.getDay()=='2'){
								date1.setTime(date1.getTime() - (86400000));
							}
							else if(date1.getDay()=='3'){
								date1.setTime(date1.getTime() - (86400000*2));
							}
							else if(date1.getDay()=='4'){
								date1.setTime(date1.getTime() - (86400000*3));
							}
							else if(date1.getDay()=='5'){
								date1.setTime(date1.getTime() - (86400000*4));
							}
							else if(date1.getDay()=='6'){
								date1.setTime(date1.getTime() - (86400000*5));
							}
							var time=date1.getTime();
							var fristWeek=new Date();
							var secondWeek=new Date();
							fristWeek.setTime(time - (86400000*14));
							secondWeek.setTime(time - (86400000*21));

							var newDate1=fristWeek.getDate();
							var newMonth1=fristWeek.getMonth()+1;
							if(newDate1<10)
								{
								newDate1='0'+newDate1;
								}
							if(newMonth1<10)
							{
								newMonth1='0'+newMonth1;
							}
							var dateOne=(newDate1+"/"+(newMonth1)+"/"+fristWeek.getFullYear());
							$('.firstWeek').text(dateOne);

							var newDate1=secondWeek.getDate();
							var newMonth1=secondWeek.getMonth()+1;
							if(newDate1<10)
								{
								newDate1='0'+newDate1;
								}
							if(newMonth1<10)
							{
								newMonth1='0'+newMonth1;
							}
							var dateTwo=(newDate1+"/"+(newMonth1)+"/"+secondWeek.getFullYear());
							$('.secondWeek').text(dateTwo);
							$("#dialog-SalesHistoryPop" ).dialog("open");
							
							$('#statusImg').addClass('loading hideBlock');
							$('#statusImg').removeClass('loading');	
						},
						error: function(response){
							$('#salesHistoryPopupData').html('');
							$("#dialog-SalesHistoryPop").parent().addClass("popupWrapper");	
							
							$('#salesHistoryPopupData').html(response);

							$("#historyArticleInfo").html("Showing sales history for Article"+articleNo+"-"+articleName);
							$("#omVal").html(om);
							$("#dialog-SalesHistoryPop" ).dialog("open");
							
							$('#statusImg').addClass('loading hideBlock');
							$('#statusImg').removeClass('loading');	},
					});		
					
				}


				$( "#dialog-SalesHistoryPop" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 200,
					maxHeight: 600,
					width: 800
				});


				$("#historyClose").click(function() {			
					$("#dialog-SalesHistoryPop" ).dialog("close");
				});
								
				
	</script>

</body>
</html>
