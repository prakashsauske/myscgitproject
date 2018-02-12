<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Create Vendor Order</title>
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
<script src="../../scripts/delivery-date.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/descriptionPopup.js?version=${properties.version}"></script>


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
						<li class="currentPage"><a href='#'>Create Vendor Order</a></li>
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
						<h4 class="sectionTitle">Create a Vendor Order with Articles</h4>
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

					<form method="POST" action="" id="manualOrderSearchSubmit">
						<input type="hidden" name="index" id="index" value="" /> <input
							type="hidden" name="buttonRetain" id="buttonRetain"
							value="${buttonRetain}" /> <input type="hidden"
							name="vendorValidity" id="vendorValidity"
							value="${vendorValidity}" /> <input type="hidden" value=""
							id="desIndex" name="desIndex" /> <input type="hidden"
							value="${invalidQty}" id="invalidQty" name="invalidQty" /> <input
							type="hidden" value="" id="warehouseValue" name="warehouseValue" />
						<input type="hidden" value="${listSize}" id="listSize"
							name="listSize" /> <input type="hidden" value="${articleNo}"
							id="article-articleNo" /> <input type="hidden"
							value="${articlesuppNo}" id="article-suppNo" /> <input
							type="hidden" value="${articlesuppName}" id="article-suppName" />
						<input type="hidden" value="${articlesrcsupply}"
							id="article-srcsupply" />




						<div class="formWrapper">

							<div class="parameter">
								<label for="article" class="mandatory">Article</label> <input
									type="#" class="textbox articleSearchText" tabindex="1"
									id="articleNo" name="articleNo" maxlength="20"
									placeholder="Search by">
								<div class="searchByOptions">
									<input type="radio" checked="" id="article"
										value="ArticleNumber" name="articleType"><label
										class="labelText" for="article">Number</label> <input
										type="radio" id="description" value="description"
										name="articleType"><label class="labelText"
										for="description">Description</label> <input type="radio"
										id="article-Ean" value="EAN" name="articleType"><label
										class="labelText" for="article-Ean">EAN/TUN/PLU</label>
								</div>
							</div>
							<!-- End of parameter -->

							<div class="parameter hideBlock">
								<label for="qty" class="mandatory">Qty.</label> <input type="#"
									class="textbox  numberBox" tabindex="2" name="ordqty"
									id="ordqty" maxlength="20" placeholder="Quantity"
									onkeypress="return isDecimalNumber(this)">

							</div>
							<!-- End of parameter -->

							<div class="parameter">
								<label for="sourceOfSupply" class="">Source of Supply</label>
								<!--
									<input type="radio" name="sourceSupply" value="2" id="warehouse" checked><label for="warehouse" class="labelText">Warehouse</label>
									-->
								<input type="radio" name="sourceSupply" value="1" id="vendor"
									checked="checked"><label for="vendor" class="labelText">Vendor</label>


								<div class="parameter IBTSource supplierSource">
									<!--
										<span id="warehouseField"> <select
										class="selectOptions" id="warehouseDropdown" name="warehouseDropdown">
											<option value="0">Select</option>
											<c:forEach items="${whList}" var="whVal">
												<option value="${whVal.siteNo}" id="${whVal.siteNo}">${whVal.siteNo} |
													${whVal.siteName}</option>
											</c:forEach>
									</select>
									
									</span> -->

									<span id="vendorField"> <input type="#" class="textbox"
										name="suppName" value="" id="supplier" maxlength="20"
										placeholder="Enter supplier no. or name"> <label
										class="linkBtn" id="verifySupplier"><label
											class="advancedSearch">Verify</label></label>
									</span>
								</div>



							</div>
							<!-- End of parameter -->



							<div class="formActions">
								<label class="actionBtn" id="searchAndAdd">Search & Add</label>
								<label class="secondaryActionBtn" id="closeLink">Close</label>
							</div>
							<!-- End of form actions -->

						</div>
						<!-- End of content table wrapper -->
						<input type="hidden" name="supplierNumber" id="supplierNumber"
							value="${manualOrderParam.supplierDesc}" /> <input type="hidden"
							name="dropDownVal" id="dropDownVal"
							value="${manualOrderParam.warehouseDropdown}" />
					</form>

				</div>
				<!-- End of table Actions Wrapper -->

				<%int nodeId=1; %>
				<%int j=1; %>
				<c:if test="${not empty articleList}">
					<table cellspacing="0"
						class="ContentTable treetable drilldownTable" id="treetable">
						<tr>
							<th>&nbsp;</th>
							<th>Article #</th>
							<th>Description</th>
							<th>SOH</th>
							<th class="numberColumn" width="70px">Qty.</th>
							<th class="numberColumn">Order Multiple</th>
							<th class="numberColumn" width="70px">Total Ordered</th>
							<th class="numberColumn" width="80px">Roster Date</th>
							<th class="numberColumn" width="80px">Delivery Date</th>
							<th class="lastColumn centerValue" width="70px">Actions</th>
						</tr>


						<c:forEach items="${articleList}" var="articleSearchResults">
							<tr id="row-1" class="row-1" data-tt-id="<%=nodeId%>">
								<%nodeId++; %>
								<td>&nbsp;</td>
								<td class="article-no">${articleSearchResults.articleNo}</td>
								<td>${articleSearchResults.description}</td>
								<td
									class="<c:if test="${articleSearchResults.baseUom!='KG'}">trimDecimalForSoh</c:if>">${articleSearchResults.SOH}</td>

								<td id="qty-<%=j%>" class="numberColumn nullCheck hideBlock">${articleSearchResults.inputQty}</td>
								<td id="qtyEdit-<%=j%>" class="numberColumn "><input
									id="qtyValue-<%=j%>" maxlength="20" placeholder="" type="#"
									value="${articleSearchResults.inputQty}"
									class="editNumCell textbox textboxDefaultText qtyValue inputQty"
									autocomplete="off"></td>

								<td class="numberColumn" id="om-<%=j%>">${articleSearchResults.OM}</td>

								<td class="numberColumn" id="totalOrder-<%=j%>">${articleSearchResults.totalOrdered}</td>

								<td id="rosterDate-<%=j%>" class="numberColumn hideBlock">${articleSearchResults.orderDate}</td>
								<td id="rosterDateEdit-<%=j%>" class="numberColumn  dateCheck">
									<input type="#" value="${articleSearchResults.orderDate}"
									id="rosterDateValue-<%=j%>"
									class="roster-date textbox textboxDefaultText inputDate editDateCell">
								</td>
								<td id="deliverDate-<%=j%>" class="numberColumn hideBlock">${articleSearchResults.deliveryDate}</td>
								<td id="deliverDateEdit-<%=j%>" class="numberColumn  "><input
									id="deliverDateValue-<%=j%>" maxlength="20" type="#"
									value="${articleSearchResults.deliveryDate}"
									class="delivery-date textbox textboxDefaultText inputDate editDateCell">
								</td>
								<td class="lastColumn centerValue"><label
									class="linkBtn editRowBtn hideBlock" id="editRecord-<%=j%>">
										<label class="editRecord">Edit</label>
								</label> <label class="linkBtn saveRowBtn " id="saveRecord-<%=j%>">
										<label class="saveRecord">Save</label>
								</label> <input type="hidden" class="saveFlagCheck"
									value="${articleSearchResults.saveFlag}" id="saveFlag-<%=j%>" />
									<input type="hidden"
									value="${articleSearchResults.baseUOMDesc}" id="baseUom-<%=j%>" />
									<label class="linkBtn deleteBtn" id="DeleteRecord-<%=j%>">
										<label class="deleteRecord ">Delete</label>
										<%j++;%>
								</label></td>
							</tr>

							<tr data-tt-id="<%=nodeId%>" data-tt-parent-id="<%=nodeId-1%>">
								<td colspan="10">
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
													History</label> <label class="notpadLink"
												id="${articleSearchResults.articleNo}">Open Orders</label></td>
										</tr>
									</table>
								</td>
							</tr>
						</c:forEach>

					</table>
				</c:if>
				<c:if test="${empty articleList}">
					<table cellspacing="0"
						class="ContentTable treetable drilldownTable" id="treetable">
						<tr>
							<th>&nbsp;</th>
							<th>Article #</th>
							<th>Description</th>
							<th>SOH</th>
							<th class="numberColumn" width="70px">Qty.</th>
							<th class="numberColumn">Order Multiple</th>
							<th class="numberColumn" width="70px">Total Ordered</th>
							<th class="numberColumn" width="80px">Roster Date</th>
							<th class="numberColumn" width="80px">Delivery Date</th>
							<th class="lastColumn centerValue" width="80px">Actions</th>
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
					<label class="actionBtn" id="confirmAndFinalise"> <label
						class="thumbUp">Confirm & Finalise</label></label> <label
						class="secondaryActionBtn" id="clear">Clear</label>
				</div>
				<!-- End of page actions-->
			</c:if>
			<%-- <c:if test="${not empty msg}"> --%>
			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle nodataMessage" id="errorMsgDiv">

						<h4 id="validMsg">${msg}</h4>
					</div>




				</div>
			</div>
			<%-- </c:if> --%>
			<!-- End of content wrapper -->
			<div id="dialog-PReqPop"
				title="Purchase Requisition Created Successfully">
				<div class="popupContent">

					<div class="popupData">

						<h4 class="alertText">
							<strong id="message"></strong>
						</h4>

						<h4 class="alertText">
							Do you want to create a purchase order now?<br />
						</h4>
						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="confirmYES1">Yes</label> <label class="secondaryActionBtn"
								id="confirmNO1">No, later</label>
							</span>
						</div>
						<!-- End of popup actions-->

					</div>
					<!-- End of pop up data -->

				</div>
				<!-- End of popupContent -->
			</div>




			<div id="dialog-modal" title="Create Purchase Requisition">
				<div class="popupContent">

					<div class="popupData">


						<h4 class="alertText" id="alertBox"></h4>



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
		<div id="dialog-modal-orders" title="Open Orders">
			<div class="popupContent">
				<div class="popupData" id="ordersWithOpenStatus"></div>
				<!-- End of pop up data -->


				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="closePopup">OK</label>
					</span>
				</div>



			</div>
			<!-- End of popupContent -->
		</div>
		<!-- End of popup -->

		<%@include file="descpopup.jsp"%>

		<div id="dialog-cancelOrder" title="Create Purchase Requisition">
			<div class="popupContent">

				<div class="popupData">
					<h4 class="alertText" id="cancelId">Are you sure you want to
						cancel the order?</h4>

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
		<!-- End Cancel order popup -->


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
						onclick="window.location.href= '../login/goingHome.htm'">Yes</label>
						<label class="secondaryActionBtn"
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

	<script>
		$(function() {
			fromSave=false;
			document.forms[0].autocomplete="off";

			$('.trimDecimalForSoh').filter(function(){
				var value=$(this).text();
				//alert(value.split(".")[0]);
				$(this).text(value.split(".")[0]);
				});
			
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
								$(("#qtyEdit-").concat(id)).addClass('hideBlock');
								$(("#qty-").concat(id)).removeClass('hideBlock');
							
			 					$(("#rosterDateEdit-").concat(id)).addClass('hideBlock');
								$(("#rosterDate-").concat(id)).removeClass('hideBlock');	

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
			/* if($("#buttonRetain").val()=='Warehouse')
			{
			$('#warehouse').click();
			$("#warehouseField").removeClass('hideBlock');
			$("#vendorField").addClass('hideBlock');
			$('#warehouse').val($("#dropDownVal").val());
			
			//$("#storeLabel").text("To Warehouse");
			}	
			else if($("#buttonRetain").val()=='Store')
			{
			$('#vendor').click();
			$("#vendorField").removeClass('hideBlock');
			$("#warehouseField").addClass('hideBlock');
			//$('#warehouse').val($("#dropDownVal").val());
			//$("#storeLabel").text("To Store");
			} */
			 //checks radio buttons in IBT Site
			$(".notpadLink").click(function() {		
				$('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
				var articleNo = (this.id);
				
				$.ajax({
					type : "GET",
					url : "getOrderWithOpenStatus.htm",
					
					data : "articleNo=" + articleNo,
					success : function(response) {
						$('#ordersWithOpenStatus').html('');
						$("#dialog-modal-orders" ).dialog("open");
						$('#ordersWithOpenStatus').html(response);
						$('#statusImg').addClass('loading hideBlock');
						$('#statusImg').removeClass('loading');	
					},
				});							
					
				});
				
				$("#closePopup").click(function() {									
					$("#dialog-modal-orders" ).dialog("close");
				});
					
			$('#warehouse').click(function(){
				if($('.row-1').text()==''){
				$("#warehouseField").removeClass('hideBlock');
				$("#vendorField").addClass('hideBlock');
				$('#supplier').val('');
				}
				//$("#storeLabel").text("To Warehouse");
			});
			
			$('#vendor').click(function(){
				if($('.row-1').text()==''){
				$("#vendorField").removeClass('hideBlock');
				$("#warehouseField").addClass('hideBlock');
				$('#warehouseDropdown').val("0");
				}
				//$("#storeLabel").text("To Store");
			});
			
			
			if($('#article-articleNo').val()!=''){
			$('#articleNo').val($('#article-articleNo').val());
			
			if($('#article-srcsupply').val()=='1')
				{
				
				$('#vendor').click();
				if($('#article-suppName').val()!='No Supplier Found' && $('#article-suppName').val()!='' && $('#article-suppNo').val()!='' && $('#article-suppNo').val()!='No Supplier Found'){
					$('#supplier').val($('#article-suppNo').val()+'-'+$('#article-suppName').val());
					}
					else if( $('#article-suppNo').val()!='' && $('#article-suppNo').val()!='No Supplier Found'){
						$('#supplier').val($('#article-suppNo').val());
						}
				}
			else{
				$('#warehouse').click();
				 if( $('#article-suppNo').val()!='' && $('#article-suppNo').val()!='No Supplier Found'){
					 $('#warehouseDropdown').val($('#article-suppNo').val());
						}
				
				}	
				}
			if($('#invalidQty').val()=='true')
				{
				$('#alertBox').text('Article quantity cannot be decimal value. It is truncated to whole number');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					});;
					$('#invalidQty').val('');
				}
			//onkeypress="return isNumberKey(event)"
			//
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
			$("#addActionBtn").click(function(){ 
				$("#tableAddAction").removeClass('hideBlock');
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
			
			if($('.row-1').text()=='')
				{
				$('#supplier').removeAttr('readonly');
				$('#warehouseDropdown').removeAttr('disabled','disabled');
				
				}
			else{
				$('#supplier').attr('readonly','readonly');
				$('#warehouseDropdown').attr('disabled','disabled');
				}
			
			/*when edit button is clicked displays input box in editable cells*/
		
			$(".editRowBtn").click(function(){
				$('#validMsg').text('');
				var id = (this.id).split('-')[1];
								
				$(("#row-").concat(id)).addClass('rowHighlight');
				$(("#qtyEdit-").concat(id)).removeClass('hideBlock');
				$(("#qty-").concat(id)).addClass('hideBlock');
				
				$(("#rosterDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#rosterDate-").concat(id)).addClass('hideBlock');
				
				$(("#deliverDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#deliverDate-").concat(id)).addClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).removeClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
			});
			var retainFlag=true;

			if($("#buttonRetain").val()==1)
			{
			$('#vendor').click();
			if($('.row-1').text()!=''){
			$('#warehouse').click(function(){
			    return false;
			});
			$("#warehouseField").addClass('hideBlock');
			$("#vendorField").removeClass('hideBlock');
			$('#supplier').val($("#supplierNumber").val());
			retainFlag=false;
			}
			}	
			else if($("#buttonRetain").val()==2)
			{
			$('#warehouse').click();
			if($('.row-1').text()!=''){
			$('#vendor').click(function(){
			    return false;
			});
			$("#vendorField").addClass('hideBlock');
			$("#warehouseField").removeClass('hideBlock');
			$('#warehouseDropdown').val($("#dropDownVal").val());
			retainFlag=false;
			}
			}
			
			$('#vendor').click(function(e){
			if(retainFlag)
				$('#supplier').val('');
			});
			$('#warehouse').click(function(e){
				if(retainFlag)
			$('#supplier').val('');
			});
			$("#closeLink").click(function(){ 
				
				$("#tableAddAction").addClass('hideBlock');
			});
		/*$(".rosDate").change(function(){
							var id = (this.id).split('-')[1];
						var currentDate=new Date();
						var rosDate=$(("#rosterDateValue-").concat(id)).val();
						var delDate=$(("#deliverDateValue-").concat(id)).val();
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
						if(splittedOne=="")
						{
							$('#alertBox').text('Please fill the roster date');
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								});;
								$(("#rosterDateValue-").concat(id)).val(rosDate);
								$(("#deliverDateValue-").concat(id)).val(delDate);
								$(("#rosterDateValue-").concat(id)).focus();
						}
						else if((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999) || splittedOne.length!=8)
						{
							$('#alertBox').text('Please enter a valid date');
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								});;
								$(("#rosterDateValue-").concat(id)).val(rosDate);
								$(("#deliverDateValue-").concat(id)).val(delDate);
								$(("#rosterDateValue-").concat(id)).focus();
						}
						else if(currentDate.getTime()>actualRosDate.getTime()){
							
								$('#alertBox').text('Please enter today date or future date');
								$( "#dialog-modal" ).dialog( "open" );
								$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$(("#rosterDateValue-").concat(id)).val(rosDate);
								$(("#deliverDateValue-").concat(id)).val(delDate);
								$(("#rosterDateValue-").concat(id)).focus();
								});;
								
							}
						else {
							var date1=new Date();
							date1.setTime(actualRosDate.getTime() + (86400000));
							month3=(date1.getMonth()+1)<10?"0"+(date1.getMonth()+1):(date1.getMonth()+1);
							var newDate=date1.getDate()<10?"0"+date1.getDate():date1.getDate();
							var newDelDate=newDate+"/"+month3+"/"+date1.getFullYear();
							$(("#deliverDateValue-").concat(id)).val(newDelDate);
							
							}
						
						});*/
		$(".saveRowBtn").click(function(){
			$('#validMsg').text('');
			var id = (this.id).split('-')[1];
			var currentDate=new Date();
			var index=id;
			var delDate=formateDate($(("#deliverDateValue-").concat(id)).val());
			var rosDate=formateDate($(("#rosterDateValue-").concat(id)).val());
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
			/* 	$('#alertBox').text('please enter a valid quantity');
				$(("#qtyValue-").concat(id)).val('');
				$(("#qtyValue-").concat(id)).focus();
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
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
			else if((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999) || splittedOne.length!=8)
			{
				$('#alertBox').text('Please enter a valid date');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$(("#rosterDateValue-").concat(id)).focus();
					$( "#dialog-modal" ).dialog( "close" );
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
					$(("#deliverDateValue-").concat(id)).focus();
					$( "#dialog-modal" ).dialog( "close" );
					});;
				
					
			}
			else if((splittedDelDate[0] > 31 || splittedDelDate[1] > 12 || splittedDelDate[2] > 9999) || splittedTwo.length!=8)
			{
				$('#alertBox').text('Please enter a valid date');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#deliverDateValue-").concat(id)).focus();
					});;
					
			}
			else if(currentDate.getTime()>actualDelDate.getTime()){
				
				$('#alertBox').text('Delivery date shoud not be less than current date.');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				$(("#deliverDateValue-").concat(id)).focus();
				});;
				
			}
			else if(actualRosDate.getTime()>actualDelDate.getTime()){
				
					$('#alertBox').text('Delivery date shoud not be less than roster date');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#deliverDateValue-").concat(id)).focus();
					});;
					
				}
			
			else{
				// $( "#dialog-cancelOrder" ).dialog( "open" );
				 $('#cancelId').text('Are you sure you want to confirm?');				
				
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						$.ajax({
							type : "GET",
							url : "saveDetail.htm",
							
							data : "index=" + index + "&orderDate=" + rosDate + "&deliveryDate=" + delDate + "&inputQty=" + qty  + "&totalOrdered=" + totalOrdered,
							success : function(response) {
								$('#statusImg').addClass('loading hideBlock');
								$('#statusImg').removeClass('loading');	
							},
						});
									
						$(("#row-").concat(id)).removeClass('rowHighlight');
						$(("#qtyEdit-").concat(id)).addClass('hideBlock');
						$(("#qty-").concat(id)).removeClass('hideBlock');
						$(("#qty-").concat(id)).text($(("#qtyValue-").concat(id)).val());
						
						$(("#rosterDateEdit-").concat(id)).addClass('hideBlock');
						$(("#rosterDate-").concat(id)).removeClass('hideBlock');
						$(("#rosterDate-").concat(id)).text($(("#rosterDateValue-").concat(id)).val());
						
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
		});
		$("#confirmAndFinalise").click(function(){
			$('#validMsg').text('');
			var flag=false;
			var flag1=false;
		var supplier=$('#supplier').val();
		var wareHouse=$('#warehouseDropdown').val();
		var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
		var srcSupply=$('input:radio[name=sourceSupply]:checked').val();
		$('.dateCheck').filter(function()
				{
			if($(this).css('display')=='table-cell')
			{
				var id = (this.id).split('-')[1];
				$('#alertBox').text('Please save the articles before you finalise the order.');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#qtyValue-").concat(id)).focus();
					});;
					flag1=true;/* 
					var temp=$(this).attr('id');
					$('#'+temp+'').focus(); */
					
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
					$(this).focus();
					});;
					flag=true;/* 
					var temp=$(this).attr('id');
					$('#'+temp+'').focus(); */
					
					}	
			}
		);
		
		/* if(srcSupply=='' || srcSupply=='Enter supplier no. or name' )
			{
			
			$('#alertBox').text('Please enter enter source of suppy to finalize');
			$( "#dialog-modal" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				});;
			}
			
		else  */if($('.row-1').text()=='')
			{
			//alert("list is empty");
			$('#alertBox').text('There is no article to be received. Cannot finalize the order');
			$( "#dialog-modal" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				});;
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
			$('#alertBox').text('Please provide quantity to be ordered.');
			$( "#dialog-modal" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				});;
			}
		
		else{
			$.ajax({
				type : "GET",
				url : "finalizePurchaseReq.htm",
				
				beforeSend: function(){
					$('#statusImg').removeClass('loading hideBlock');
					$('#statusImg').addClass('loading');
					},
				data : "srcSupply=" + srcSupply,
				success : function(response) {

					var data=response.split(':');
					var status=data[0];
					var message=data[1];
					if(status=='true'){
				
					$("#message").text('Your purchase requisition reference number is #'+message);
					$( "#dialog-PReqPop" ).dialog( "open" );
					$('#confirmYES1').click(function(e){
						$( "#dialog-PReqPop" ).dialog( "close" );

                              sendOrder(message);
						
						});;
						$('#confirmNO1').click(function(e){
							$( "#dialog-PReqPop" ).dialog( "close" );


							$("#manualOrderSearchSubmit").attr('action','onPageLoadPReq.htm');
							$("#manualOrderSearchSubmit").attr('method','GET');
							$("#manualOrderSearchSubmit").submit();
														
							
							});;
							$('.closePopUp').click(function(e){
								//$( "#dialog-modal" ).dialog( "close" );

								$("#manualOrderSearchSubmit").attr('action','onPageLoadPReq.htm');
								$("#manualOrderSearchSubmit").attr('method','GET');
								$("#manualOrderSearchSubmit").submit();
								});;	
					}
					else{
						$('#alertBox').text(message);
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						});;

						$('#statusImg').addClass('loading hideBlock');
					    $('#statusImg').removeClass('loading');	}		
				},
			});
			
			}

			});




			
			/*when save button is clicked displays input box is disabled*/
			/* $(".saveBtn").click(function(){
				var id = (this.id).split('-')[1];
				var index=id;
				var delDate=$(("#deliverDateValue-").concat(id)).val();
				var rosDate=$(("#rosterDateValue-").concat(id)).val() ;
				var qty=$(("#qtyValue-").concat(id)).val();
				var totalOrdered=$(("#totalOrder-").concat(id)).text();
				if(qty=='')
					{
					$('#alertBox').text('Please enter fill quantity');
					$(("#qtyValue-").concat(id)).focus();
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						});
					}
				else if((qty<0)||isNaN(qty)||qty==0){
					$('#alertBox').text('please enter a valid quantity');
					$(("#qtyValue-").concat(id)).val('');
					$(("#qtyValue-").concat(id)).focus();
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						});
					}
				else{
				$.ajax({
					type : "GET",
					url : "saveDetail.htm",
					beforeSend: function(){
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "index=" + index + "&orderDate=" + rosDate + "&deliveryDate=" + delDate + "&inputQty=" + qty  + "&totalOrdered=" + totalOrdered,
					success : function(response) {

						$('#statusImg').addClass('loading hideBlock');
					    $('#statusImg').removeClass('loading');			
					},
				});
							
				$(("#row-").concat(id)).removeClass('rowHighlight');
				$(("#qtyEdit-").concat(id)).addClass('hideBlock');
				$(("#qty-").concat(id)).removeClass('hideBlock');
				$(("#qty-").concat(id)).text($(("#qtyValue-").concat(id)).val());
				
				$(("#rosterDateEdit-").concat(id)).addClass('hideBlock');
				$(("#rosterDate-").concat(id)).removeClass('hideBlock');
				$(("#rosterDate-").concat(id)).text($(("#rosterDateValue-").concat(id)).val());
				
				$(("#deliverDateEdit-").concat(id)).addClass('hideBlock');
				$(("#deliverDate-").concat(id)).removeClass('hideBlock');
				$(("#deliverDate-").concat(id)).text($(("#deliverDateValue-").concat(id)).val());
				
				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).removeClass('hideBlock');}
			});
 */

			$( ".deleteBtn" ).click(function(){
				$('#validMsg').text('');
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
				 $("#confirmYES").click(function(e) {
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						$("#manualOrderSearchSubmit").attr('action','deleteItem.htm');
						$("#manualOrderSearchSubmit").attr('method','GET');
						$("#manualOrderSearchSubmit").submit();
					  }); 
				 $("#confirmNO").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });
				/* $('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
				 */
				
			});

			$( ".qtyValue" ).change(function(){
				var id=(this.id).split('-')[1];
				
				//parseFloat(25.777777777).toFixed(2)
				if(($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text())%1==0){
				$(("#totalOrder-").concat(id)).text($(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text());
				}
				else{
					var quantity=$(("#qtyValue-").concat(id)).val()*$(("#om-").concat(id)).text();
					$(("#totalOrder-").concat(id)).text(parseFloat(quantity).toFixed(2));
					}
			});
			
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
			
			$("#treetable").treetable({
			expandable: true
		});
			 $(".secondaryActionBtn").click(function(e) {
				// window.history.back();
			  });

			 $("#back").click(function(e) {
				 $('#validMsg').text('');
				 if($('.ContentTable .indenter').parent().text()=="No articles added in the order.")
				 window.location.href= "../login/goingHome.htm";		// window.history.back();'
				 else
					$("#dialog-back").dialog("open");
				 
					  });
			 $("#clear").click(function(e) {
				 $('#validMsg').text('');
				 $('#cancelId').text('Are you sure you want to clear the order?');
					 $( "#dialog-cancelOrder" ).dialog( "open" );				
					 $("#confirmYES").click(function(e) {
						 $('#manualOrderSearchSubmit').attr('action','onPageLoadPReq.htm');
							$('#manualOrderSearchSubmit').attr('method','GET');
							$('#manualOrderSearchSubmit').submit();
						  }); 
					 });

					 $("#confirmNO").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );				
					 });  
					  

			 $("#goButtonSample")
				.click(
						function() {
							$('#validMsg').text('');
							var vendorNo=$('#vendorDesc').val().split("-")[0];
							var vendorName=$('#vendorDesc').val().split("-")[1];
							//var vendorDesc=$('#vendorDesc').val();
							 var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
							
							$.ajax({
								type : "GET",
								url : "autocomplete.htm",
								beforeSend: function(){
									$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									},
								//data : "vendorDesc=" + vendorDesc + "&sourceSupply="+sourceSupply  ,
								//data : "vendorNo=" + vendorNo + "&sourceSupply="+sourceSupply + "&vendorName="+vendorName ,
								data: { vendorNo: vendorNo, sourceSupply: sourceSupply, vendorName:vendorName},
								success : function(response) {
									 $('#popupDataDiv').html(response);
									 $('#statusImg').addClass('loading hideBlock');
										$('#statusImg').removeClass('loading');
								},
							});



							}
						
						);	
			 

				$( "#verifySupplier" ).click(function() {
					$('#validMsg').text('');
					if($('.row-1').text()==''){
						
						var vendorNo=$('#supplier').val().split("-")[0];
						var vendorName=$('#supplier').val().split("-")[1];
						 var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
						if(($('#supplier').val()!='' && $('#supplier').val()!='Enter supplier no. or name')){
						$.ajax({
							type : "GET",
							url : "autocomplete.htm",
							beforeSend: function(){

								$('#statusImg').removeClass('loading hideBlock');
																$('#statusImg').addClass('loading');
								},
								data: { vendorNo: vendorNo, sourceSupply: sourceSupply, vendorName:vendorName},
							//data : "vendorNo=" + vendorNo + "&sourceSupply="+sourceSupply + "&vendorName="+vendorName ,
										success : function(response) {
											 $('#popupDataDiv').html(response);
											 if($('#sizeCheck').val()==0){
												 if(sourceSupply=='2'){
												 $('#alertBox').text('Invalid warehouse');
												 }
												 else{
												 $('#alertBox').text('Invalid vendor');
												 }
													$( "#dialog-modal" ).dialog( "open" );
													$('#okBtn').click(function(e){
														$( "#dialog-modal" ).dialog( "close" );
														});
													$('#supplier').focus();												 
												 }
											 else if($('#sizeCheck').val()>1){
												 if(!$( "#dialog-modal1" ).dialog( "isOpen" )){
													$('#vendorDesc').val($('#supplier').val());
													$("#dialog-modal1").parent().addClass("popupWrapper");			
													$("#dialog-modal1" ).dialog( "open" );
													$("#searchWarning").addClass('hideBlock');
													$("#popupSearch").removeClass('hideBlock');
													}
											 }
											 else{
													$("#supplier").val($("#suppNo0").text()+"-"+$("#suppName0").text());
												 }
											 $('#statusImg').addClass('loading hideBlock');
												$('#statusImg').removeClass('loading'); 
										},
									});}
									else{
										$('#alertBox').text('Please fill supplier field');
										$( "#dialog-modal" ).dialog( "open" );
										$('#okBtn').click(function(e){
											$( "#dialog-modal" ).dialog( "close" );
											});
										$('#supplier').focus();
										}

					
					/* if(!$( "#dialog-modal1" ).dialog( "isOpen" )){
						$('#vendorDesc').val($('#supplier').val());
					$("#dialog-modal1").parent().addClass("popupWrapper");			
					$("#dialog-modal1" ).dialog( "open" );
					$("#searchWarning").addClass('hideBlock');
					$("#popupSearch").removeClass('hideBlock'); 
					}*/
					}
				});
				$("#goButtonSample2")
				.click(
						
						function() {
							$('#validMsg').text('');
							
							var vendorDesc=$('#vendorDesc2').val();
							var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
							var suppName=$('#supplier').val().split('-')[0];
							var warehouse=$('#warehouseDropdown').val();
							if(vendorDesc!=''){
							$.ajax({
								type : "GET",
								url : "getDescription.htm",
								beforeSend: function(){
									$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									},
								data : "vendorDesc=" + vendorDesc + "&sourceSupply=" +sourceSupply + "&suppName=" +suppName + "&warehouse=" +warehouse,
								success : function(response) {
									$('#nodataMsg').text('');
									 $('.dialog-modal2').html(response);
									 if($('#nodata').val()=='N'){
									 if($('#sizeCheck1').val()>1){
										 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
											 $('#nodataMsg').text('');
											 //$("#nodataMsg").removeClass('tableTitle nodataMessage');
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
											$('#manualOrderSearchSubmit').attr('action','addArticleDescription.htm');
											$('#manualOrderSearchSubmit').attr('method','GET');
											$('#manualOrderSearchSubmit').submit();
										 }
									 }
									 else{
										
											 //$("#nodataMsg").addClass('tableTitle nodataMessage');
												$('#nodataMsg').html('Sorry no results returned for your search criteria. Please try again');
												$('.dialog-modal2').html('');
												//$("#dialog-modal2").parent().addClass("popupWrapper");			
												//$("#dialog-modal2" ).dialog( "open" );
												//$("#searchWarning").addClass('hideBlock');
												//$("#popupSearch").removeClass('hideBlock');
												
										 }
									 $('#statusImg').addClass('loading hideBlock');
										$('#statusImg').removeClass('loading');
										bindMultipleSelect();
								},
							});
							}
							else{
								 
								//$("#nodataMsg").addClass('tableTitle nodataMessage'); 
								$('#nodataMsg').text('Please enter article description.');
								$('.dialog-modal2').html('');
								}



							}
						
						);
		$('#searchAndAdd').click(function() {
			$('#warehouseValue').val($('#warehouseDropdown').val());
					//$('.noData').html('');
					//$('.error').html('');
					$('#validMsg').text('');
					var articleNo = $('#articleNo').val();
					var vendorDesc=$('#supplier').val();
					var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
					var suppName=$('#supplier').val().split('-')[0];
				    /*var article = $('#article').val();
					var article_Ean=$('#article-Ean').val(); */
					var warehouse=$('#warehouseDropdown').val();
					var artType=$('input:radio[name=articleType]:checked').val();
					var ordQty=$('#ordqty').val();
					if (articleNo == "" || $.trim(articleNo).length == 0 || $('#articleNo').val()=='Search by') {
						/* $('#alertBox').text('Please enter the article to add');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
						$('#validMsg').text('Please enter all mandatory details to search and add an article.');
							/* $("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						$('#articleNo').focus();
					}
					else if(artType=="ArticleNumber" && isNaN(articleNo)){
						/* $('#alertBox').html('Please enter a valid article number');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
							$('#validMsg').text('Please enter a valid article number');
							/* $("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						$('#articleNo').focus();
						}
					//else if (vendorDesc == "" || $.trim(vendorDesc).length == 0 || vendorDesc=='Enter supplier no. or name') {
						/* $('#alertBox').text('Please enter the article to add');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
						//	$('#validMsg').text('Please provide supplier information.');
						/* 	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						//$('#supplier').focus();
					//}
					//else if (ordQty == "" || $.trim(ordQty).length == 0) {
						/* $('#alertBox').html('Please enter the quantity');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
							//$('#validMsg').text('Please provide quantity to be ordered.');
							/* $("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						//$('#ordqty').focus();
					//}else if(isNaN(ordQty)||ordQty<0 || ordQty==0){
						/* $('#alertBox').html('Please enter a valid quantity');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							}); */
							//$('#validMsg').text('Please enter a valid quantity');
							/* $("#errorMsgDiv").removeClass('tableTitle nodataMessage');
							$("#errorMsgDiv").addClass('tableTitle errorDiv'); */
						//$('#ordqty').focus();
						//} 
					
					else if(artType=="description" && articleNo!=''){
						
						$.ajax({
							type : "GET",
							url : "getDescription.htm",
							beforeSend: function(){
								$('#statusImg').removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');
								},
								data : "vendorDesc=" + articleNo + "&sourceSupply=" +sourceSupply + "&suppName=" +suppName + "&warehouse=" +warehouse,
							//data : "vendorDesc=" + articleNo + "&sourceSupply=" +sourceSupply + "&suppName=" +suppName,
							success : function(response) {
								$('#nodataMsg').text('');
								 $('.dialog-modal2').html(response);
								 if($('#nodata').val()=='N'){
								 if($('#sizeCheck1').val()>1){
									 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
										 //$("#nodataMsg").removeClass('tableTitle nodataMessage');
											$('#nodataMsg').html('');
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
										$('#manualOrderSearchSubmit').attr('action','addArticleDescription.htm');
										$('#manualOrderSearchSubmit').attr('method','GET');
										$('#manualOrderSearchSubmit').submit();
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
								 bindMultipleSelect();	
							},
						});
						}
					else {

						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						$('#manualOrderSearchSubmit').attr('action','createManualOrder.htm');
						$('#manualOrderSearchSubmit').attr('method','POST');
						$('#manualOrderSearchSubmit').submit();
				}
				}); 
			
			
		});
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
		 $( "#dialog-back" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
		 $("#dialog-back").parent().addClass("popupWrapper");
		 $( "#dialog-cancelOrder" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
		 $("#dialog-cancelOrder").parent().addClass("popupWrapper");
			$( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
			$("#dialog-modal").parent().addClass("popupWrapper");

			 $( "#dialog-PReqPop" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 120,
					maxHeight: 600,
					width: 400
				});
			 $( "#dialog-modal-orders" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 200,
					maxHeight: 600,
					width: 800
				});
				
				$("#dialog-modal-orders").parent().addClass("popupWrapper");
				
				
				$("#dialog-PReqPop").parent().addClass("popupWrapper");
				$(".inputDate").datepicker({
					zIndex:50
				});
				function isNumber(id)
				{
					if(!$.isNumeric($(id).val()))	
					var str = $(id).val();
					$(id).val(str.substring(0, str.length - 1));	
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
				
				function isNumber1(id)
				{
					id="#"+id;
					if(!$.isNumeric($(id).val()))	
					var str = $(id).val();
					$(id).val(str.substring(0, str.length - 1));	
				}
				function isNumberKey(evt)
			    {
			       var charCode = (evt.which) ? evt.which : event.keyCode;
			       if (charCode > 31 && (charCode< 48 || charCode >57))
			          return false;

			       return true;
			    }


				
				$( "#dialog-IBTSitePop" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 200,
					maxHeight: 600,
					width: 400
				});
				$("#dialog-IBTSitePop").parent().addClass("popupWrapper");
				
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
					$('#validMsg').text('');			
					$("#dialog-SalesHistoryPop" ).dialog("close");
				});

				function sendOrder(prNo){
					$.ajax({
						type : "GET",
						url : "sendOrder.htm",
						
						beforeSend: function(){
							$('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							},
						data : "prNo=" + prNo,
						success : function(response) {

							var data=response.split(':');
							var status=data[0];
							var message=data[1];
							if(status=='true'){
							$("#supplier").val('');
							$("#con-final").text('');
							$("#con-final").css('display','none');
							$("#treetable").text('');
							$("#treetable").css('display','none');
							$("#con-final").css('display','none');	
							$('#alertBox').text('Purchase order created successfully with the reference #'+message);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$("#manualOrderSearchSubmit").attr('action','onPageLoadPReq.htm');
								$("#manualOrderSearchSubmit").attr('method','GET');
								$("#manualOrderSearchSubmit").submit();
								});;
								$('.closePopUp').click(function(e){
									//$( "#dialog-modal" ).dialog( "close" );

									$("#manualOrderSearchSubmit").attr('action','onPageLoadPReq.htm');
									$("#manualOrderSearchSubmit").attr('method','GET');
									$("#manualOrderSearchSubmit").submit();
									});;
							
							}
							else{
								$('#alertBox').text(message);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$("#manualOrderSearchSubmit").attr('action','onPageLoadPReq.htm');
								$("#manualOrderSearchSubmit").attr('method','GET');
								$("#manualOrderSearchSubmit").submit();
							     });;

								
						}
						},
					});
					
										

			   }



				$(".deleteBtn").click(function(){
					
					var id = (this.id).split('-')[1];


					 $( "#dialog-cancelOrder" ).dialog( "open" );				


					 
					 $("#confirmYES1").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );
						 $( "#index1" ).val(id);
						 
						 $("#manualOrderSearchSubmit").attr('action','deleteItem.htm');
							$("#manualOrderSearchSubmit").attr('method','GET');
							$("#manualOrderSearchSubmit").submit();
						
						
					 });

					 $("#confirmNO1").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );				
					 });  			
					
				});
	</script>
</body>
</html>
