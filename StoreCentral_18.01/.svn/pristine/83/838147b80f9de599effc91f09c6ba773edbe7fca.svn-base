<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Order Receive Confirmation</title>
<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>

<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/delivery-date.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.loader-0.3.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/descriptionPopup.js?version=${properties.version}"></script>

</head>
<body>

	<div class="mainWrapper woolworths">
		<form method="POST" action="finaliseOrder.htm" id="receiveForm">
			<input type="hidden" name="flag" id="flag" />
			<div class="headWrapper">
				<%@include file="header.jsp"%>
				<input type="hidden" id="navBarHighlight" value="orders" /> <input
					type="hidden" id="index" name="index" value="${receiveParam.index}" />
				<input type="hidden" id="brudCrumCheck"
					value="${receiveParam.reconFlag}" /> <input type="hidden"
					id="successMsg" value="${msg}" /> <input type="hidden" id="status"
					value="${status}" /> <input type="hidden" id="recSite"
					value="${order.recvSite}" /> <input type="hidden" id="sendSite"
					value="${user.siteNo}" /> <input type="hidden" id="fromReceive"
					name="fromReceive" value="" /> <input type="hidden"
					id="focusIndex" value="${focusIndex}" /> <input type="hidden"
					id="popupFlag" value="${popupFlag}" />


				<div class="breadcrumbWrapper">
					<div class="breadcrumbs">
						<label class="breadcrumbLabel"> You are here: </label>
						<ul>
							<li><a href="../login/goingHome.htm">Home</a></li>
							<li class="orderDet"><a
								href="../order/backToOrderSearch.htm">Search Orders</a></li>
							<li class="reconFlag" style="display: none;"><a
								href="../order/backToRecon.htm">Reconciliation Report</a></li>
							<li class="hideContent"><a
								href="../order/backToOrderDetails.htm">Order Details</a></li>
							<li class="currentPage">Finalise Order</li>
						</ul>
					</div>
					<!-- End of breadcrumbs -->

					<div class="statusWrapper">
						<label class="loading hideBlock" id="statusImg">We are
							getting data, please wait</label> <label class="secondaryActionBtn"
							id="backLink">Back</label>
					</div>
					<!-- End of status wrapper -->

				</div>
				<!-- End of breadcrumb wrapper -->







			</div>
			<!-- End of head wrapper -->




			<div class="contentWrapper">
				<div class="articleHead">
					<div class="articleHeaderWrapper">
						<h2 class="articleTitle">
							Order #${order.orderNo} <span>
								<!-- (Order Ref. #${order.orderRefNo}) -->
							</span>
						</h2>
						<p>
							<input type="hidden" value="${orderdet.suppNo}"
								id="supplier-no-preq" name="supplier-no-preqs" /> <input
								type="hidden" value="${orderdet.suppName}"
								id="supplier-name-preq" name="supplier-name-preqs" /> <label
								class="articlePriceLabel"><c:if
									test="${not empty orderdet.suppName}">${orderdet.suppName}</c:if>
								(${orderdet.suppNo}) </label> <label class="articlePriceLabel">|</label>
							<label class="articlePriceLabel " id="headervendorAutho"
								style="display: none;">Vendor Authorisation # <strong>${receiveParam.vendorAuthNo}</strong><label
								class="editRecord" id="editAutho">&nbsp;</label><label
								class="articlePriceLabel"> |</label></label> <label
								class="articlePriceLabel">Delivery Date: <strong>${orderdet.deliveryDate}</strong></label>
							<label class="articlePriceLabel">|</label> <label
								class="articlePriceLabel">Total OM Received: <strong>${order.totalOmRecvd}</strong></label>

						</p>
					</div>
					<div class="articleActionBtns">
						<label class="orderStatus">Status: <strong>${order.orderStatus}</strong></label>
						<label
							class="actionBtn receive ${properties.EnterVendorClaimAuthorityNumber}"
							style="display: none;" id="vendorAutho"><label
							class="notepad">Vendor Authorisation #</label></label>
					</div>
				</div>


				<div class="articleContent orderDetails">


					<div class="articleContentInner">

						<div class="articleDetails">

							<table cellspacing="0" class="ContentTable" width="100%">

								<tr>
									<td class="keyInfo">Total Cartons:</td>
									<td class="valueInfo">${order.totalCartons}</td>
									<td class="keyInfo">Total Pallets:</td>
									<td class="valueInfo">${order.totalPallets}</td>
									<td class="keyInfo">Total Cartons Received:</td>
									<td class="valueInfo lastColumn">${order.totalOmRecvd}</td>
								</tr>

								<tr>
									<td class="keyInfo">Department:</td>
									<td class="valueInfo">${order.tradDeptNo} <c:if
											test="${not empty order.tradDeptNo and not empty order.tradingDepName}"> | ${order.tradingDepName}</c:if>
									</td>
									<td class="keyInfo">Roster Date:</td>
									<td class="valueInfo">${order.rosterDate}</td>
									<td class="keyInfo">Creation Date:</td>
									<td class="valueInfo lastColumn" name="">
										${orderdet.dateCreated}</td>
								</tr>

								<tr class="">
									<td class="keyInfo">Invoice No.:</td>
									<td class="valueInfo" id="invoiceNumber">
										${receiveParam.invoiceNo}</td>
									<td class="keyInfo">Invoice Total ($):</td>
									<td class="valueInfo" id="invoiceTotal">
										${receiveParam.invoiceTotal}</td>
									<td class="keyInfo" id="gst">GST ($):</td>
									<td class="valueInfo lastColumn">${receiveParam.gst}</td>
								</tr>

								<tr>
									<td class="keyInfo" id="delNo">Delivery Docket No.:</td>
									<td class="valueInfo ">${receiveParam.delDock}</td>
									<td class="keyInfo">Temperature:</td>
									<td class="valueInfo">${receiveParam.temperature}</td>
									<td class="keyInfo">Received Date:</td>
									<td class="valueInfo lastColumn">${order.recvdate}</td>
								</tr>

								<tr>
									<td class="keyInfo">GRN:</td>
									<td class="valueInfo">${orderdet.grn}</td>
									<td class="keyInfo">Temperature 2:</td>
									<td class="valueInfo"></td>
									<td class="keyInfo">Received Time:</td>
									<td class="valueInfo lastColumn">${order.recvtime}</td>
								</tr>


								<tr class="lastRow">
									<td class="keyInfo">
										<!-- Receiving Store: -->
									</td>
									<td class="valueInfo">
										<%-- ${order.recvSite}| ${order.recvSiteName} --%>
									</td>
									<td class="keyInfo"></td>
									<td class="valueInfo"></td>
									<td class="keyInfo">
										<!-- Value ($): -->
									</td>
									<td class="valueInfo lastColumn">
										<%-- ${order.orderValue} --%>
									</td>
								</tr>

							</table>
						</div>
						<!-- End of article details -->
					</div>
					<!-- End of article content inner -->









				</div>
				<!-- End of article content -->

				<div class="ContentTableWrapper">

					<div class="tableInfo hideContent">

						<div class="tableTitle">
							<h4 class="sectionTitle">List of Articles</h4>
						</div>
						<!-- End of table title -->

					</div>
					<!-- End of table info -->


					<div class="tableActionsBtnsWrapper hideContent">
						<div class="lookupActionWrapper">
							<label class="linkBtn" id="addActionBtn"><label
								id="addRowClass" class="addRow">Add</label></label>




							<div class="errorDiv hideBlock" id="divMsg">
								<label id="msgLabel"></label> <label
									class="closeMessage msgClose">&nbsp;</label>
							</div>
							<c:if test="${not empty msg}">
								<div class="errorDiv" id="statusMsg">
									<label>${msg}</label> <label class="closeMessage msgClose">&nbsp;</label>
								</div>
							</c:if>

						</div>
						<!-- End of lookup action wrapper -->


					</div>
					<!-- End of table actions btn wrapper -->

					<div class="tableActionsWrapper hideBlock hideContent"
						id="tableAddAction">



						<input type="hidden" name="index1" id="index1" value="" /> <input
							type="hidden" value="" id="desIndex" name="desIndex" /> <input
							type="hidden" value="${invalidQty}" id="invalidQty"
							name="invalidQty" /> <input type="hidden" name="msg" id="msg"
							value="${msg}" /> <input type="hidden" name="hideContent"
							id="hideContent" value="${hideContent}" /> <input type="hidden"
							name="cancelStatus" id="cancelStatus" value="${cancelStatus}" />
						<input type="hidden" name="receiveStatus" id="receiveStatus"
							value="${receiveStatus}" /> <input type="hidden"
							id="VndrorderState" value="${order.orderStatus}" /> <input
							type="hidden" name="orderNoVendorClaim" id="orderNoVendorClaim"
							value="${order.orderNo}" /> <input type="hidden"
							id="vendorClaimVal" name="vendorClaimVal"
							value="${receiveParam.vendorAuthNo}" /> <input type="hidden"
							name="sos" id="sos" value="${order.sos}" /> <input type="hidden"
							name="suppNo" id="suppNo" value="${order.suppNo}" /> <input
							type="hidden" name="vendorclaimHidden" id="vendorclaimHidden"
							value="${order.vendorclaim}" />

						<div class="formWrapper">

							<div class="parameter">
								<label for="article" class="mandatory">Article</label> <input
									type="#" class="textbox" maxlength="20"
									placeholder="Enter article number / EAN" id="artEan"
									value="${receiveParam.artEAN}" name="artEAN">
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

							<div class="parameter">
								<label for="qty" class="mandatory">Received Qty.</label> <input
									type="#" maxlength="13" class="textbox numberBox" id="recQty"
									value="" name="recqty">
							</div>
							<!-- End of parameter -->

							<div class="formActions">
								<label class="actionBtn" id="addArticle">Search & Add</label> <label
									class="secondaryActionBtn" id="closeLink">Close</label>
							</div>
							<!-- End of form actions -->



						</div>
						<!-- End of content table wrapper -->


					</div>
					<!-- End of table Actions Wrapper -->


					<%
					int i = 1;
				%>
					<table cellspacing="0" class="ContentTable">
						<tr>
							<th>Article #</th>
							<th>Description</th>
							<th class="popupHide">Vendor Ref. #</th>
							<th class="numberColumn">Order Qty.</th>
							<th class="numberColumn popupHide">Dispatch Qty.</th>
							<th class="numberColumn" width="70px">Received Qty.</th>
							<th class="numberColumn popupHide" width="70px">Pack OM</th>
							<th class="lastColumn centerValue hideContent popupHide"
								width="80px">Actions</th>
						</tr>

						<c:forEach items="${orderDetails}" var="orderDetails">

							<tr id="row-<%=i%>" class="saveFlag">
								<td class="article-no">${orderDetails.article}</td>
								<td>${orderDetails.articleDesc}</td>
								<td class="popupHide">${orderDetails.vendorRefNo}</td>

								<td class="numberColumn" id="orderedQty-<%=i%>">${orderDetails.orderQty}
									<c:if test="${not empty orderDetails.orderUOM}">${orderDetails.orderUOM}</c:if>
								</td>

								<td class="numberColumn popupHide">${orderDetails.despatchQty}</td>

								<td id="received-<%=i%>"
									class="numberColumn showContent removeHide hideBlock">${orderDetails.receivedQty}
									<c:if test="${not empty orderDetails.orderUOM}">${orderDetails.orderUOM}</c:if>
								</td>
								<td id="receivedEdit-<%=i%>"
									class="numberColumn  hideContent dateCheck popupHide"><input
									type="#" maxlength="13" value="${orderDetails.receivedQty}"
									class="editNumCell textbox textboxDefaultText inputQty"
									id="receivedTxt-<%=i%>"></td>
								<td id="packOM-<%=i%>"
									class="popupHide numberColumn showContent hideBlock">${orderDetails.OM}</td>
								<td id="packOMEdit-<%=i%>"
									class="numberColumn popupHide hideContent"><input type="#"
									maxlength="13"
									class="editNumCell textbox textboxDefaultText inputQty"
									value="${orderDetails.OM}" id="packOMTxt-<%=i%>"></td>
								<input type="hidden" class="saveFlagCheck"
									value="${orderDetails.saveFlag}" id="saveFlag-<%=i%>" />
								<input type="hidden" class="" value="${orderDetails.baseUom}"
									id="baseUom-<%=i%>" />
								<input type="hidden" class="" value="${orderDetails.operation}"
									id="operation-<%=i%>" />
								<td class="lastColumn centerValue hideContent popupHide"><label
									class="linkBtn editBtn hideBlock" id="editRecord-<%=i%>">
										<label class="editRecord">Edit</label>
								</label> <label class="linkBtn saveBtn " id="saveRecord-<%=i%>">
										<label class="saveRecord">Save</label>
								</label> <%-- <input type="hidden" value="${orderDetails.baseUOMDesc}" id="baseUom-<%=i%>"/> --%>
									<label class="linkBtn deleteOneRecord"
									id="DeleteRecord-<%=i++%>"> <label class="deleteRecord">Delete</label>
								</label></td>
							</tr>

						</c:forEach>

					</table>
				</div>
				<!-- End of content table wrapper -->

				<div class="pageActions hideContent">
					<label class="actionBtn"><label class="thumbUp">Confirm
							& Finalise</label></label> <label class="secondaryActionBtn" id="cancelLink">Cancel</label>
				</div>
				<!-- End of page actions-->


			</div>
			<!-- End of content wrapper -->

			<div id="dialog-cancelOrder" title="Cancel Order">
				<div class="popupContent">

					<div class="popupData">

						<h4 class="alertText" id="confirmMsg">Are you sure you want
							to cancel receiving this order?</h4>


						<!-- Commented by Haresh
				<div class="ContentTableWrapper popMessage">
						
					<label>Are you sure you want to cancel the order?</label>						
												
				</div> End of content table wrapper -->

						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="confirmYES">Yes</label> <label class="secondaryActionBtn"
								id="confirmNO">No</label>
							</span>
						</div>
						<!-- End of popup actions-->

						<!--  Commented by Haresh 
				<div class="popMessageBtnWrapper">
					<label class="actionBtn popMessageBtn" id="confirmYES">Yes</label>
					<label class="actionBtn popMessageBtn" id="confirmNO">No</label>
				</div> -->

					</div>
					<!-- End of pop up data -->

				</div>
				<!-- End of popupContent -->
			</div>
			<div id="dialog-alreadyPresent" title="Receive Order">
				<div class="popupContent">

					<div class="popupData">

						<h4 class="alertText" id="alreadyPresentMsg">
							<c:if test="${not empty exists}">${exists}</c:if>
							due today.Are you sure you want to add item to this order?"
						</h4>

						<!-- Commented by Haresh
				<div class="ContentTableWrapper popMessage">
						
					<label>Are you sure you want to cancel the order?</label>						
												
				</div> End of content table wrapper -->

						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="confirmYES5">Yes</label> <label class="secondaryActionBtn"
								id="confirmNO5">No</label>
							</span>
						</div>
						<!-- End of popup actions-->

						<!--  Commented by Haresh 
				<div class="popMessageBtnWrapper">
					<label class="actionBtn popMessageBtn" id="confirmYES">Yes</label>
					<label class="actionBtn popMessageBtn" id="confirmNO">No</label>
				</div> -->

					</div>
					<!-- End of pop up data -->

				</div>
				<!-- End of popupContent -->
			</div>
			<div id="dialog-modal2" class="dialog-modal2"
				title="Article Description">
				<div class="popupContent">
					<div class="popupSearchWrapper" id="popupSearch">
						<h3>Article Description :</h3>
						<input type="#" maxlength="20"
							placeholder="Enter article description"
							class="textbox textboxDefaultText" id="vendorDesc2"> <label
							class="actionBtn" id="goButtonSample2">Go</label>
					</div>
					<!-- End of popup search wrapper -->
					<label id="nodataMsg"></label>
					<div class="popupData" id="popupDataDiv2"></div>
					<!-- End of pop up data -->
					<div class="popupActions hideBlock">
						<label class="actionBtn">Select & Close</label> <label
							class="actionBtn">Cancel</label>
					</div>

				</div>
				<!-- End of popupContent -->

			</div>
			<div id="dialog-modal-quantity" title="Received Quantity Mismatch">
				<div class="popupContent">


					<div class="popupData">

						<h4 class="alertText">
							For following <strong id="qtyCount"></strong> articles, the order
							quantity does not match with received quantity .
						</h4>



						<div class="ContentTableWrapper">
							<table cellspacing="0" class="ContentTable popupTableDataTwo">
								<tr>
									<th>Article #</th>
									<th>Description</th>
									<th class="numberColumn">Order Qty.</th>
									<th class="numberColumn" width="70px">Received Qty.</th>

								</tr>

							</table>
						</div>
						<!-- End of content table wrapper -->

					</div>
					<!-- End of pop up data -->

					<div class="popupActionsWrapper">

						<span class="popupActions"> <label class="actionBtn"
							id="proceedOrder">I know, Proceed</label> <label
							class="secondaryActionBtn closePopup" id="cancelpopup">Cancel</label>
						</span>
					</div>

				</div>
				<!-- End of popupContent -->
			</div>


			<div id="dialog-modal-save" title="Save Article">
				<div class="popupContent">


					<div class="popupData">

						<h4 class="alertText">
							For following <strong id="saveCount"></strong> articles, you
							haven't provided confirmation. Please click on Save against each
							articles.
						</h4>



						<div class="ContentTableWrapper">
							<table cellspacing="0" class="ContentTable popupTableData">
								<tr class="">
									<th>Article #</th>
									<th>Description</th>
									<th class="numberColumn">Order Qty.</th>
									<th class="numberColumn" width="70px">Received Qty.</th>

								</tr>

								<!-- <tr>
						<td></td>	
						<td></td>
						<td class="numberColumn"></td>
						<td class="numberColumn "></td>
					</tr>
									
					<tr class="lastRow">
						<td>2002</td>
						<td>Homebrand Pineapple Pieces Nat Juice 440g</td>
						<td class="numberColumn">###</td>
						<td class="numberColumn">###</td>						
					</tr> -->
							</table>
						</div>
						<!-- End of content table wrapper -->

					</div>
					<!-- End of pop up data -->

					<div class="popupActionsWrapper">
						<span> <input type="radio" checked="checked"
							value="reviewItems" id="reviewItems" name="review"><label
							class="labelText" for="reviewItems"><strong>Review
									Items</strong></label> <input type="radio" value="setZero" id="setZero"
							name="review"><label class="labelText" for="setZero"><strong>Receive
									Items With Zero Qty.</strong></label>
						</span> <span class="popupActions"> <label class="actionBtn"
							id="knowProceed">Proceed</label> <label
							class="secondaryActionBtn" id="cancelSave">Cancel</label>
						</span>
					</div>

				</div>
				<!-- End of popupContent -->
			</div>

			<div id="dialog-modal" title="Receive Order">
				<div class="popupContent">

					<div class="popupData">

						<h4 class="alertText" id="alertBox">There is no article to be
							received. Cannot finalize the order.</h4>

						<!-- Commented by Haresh
				<div class="ContentTableWrapper popMessage">
						
					<label id="alertBox">There is no article to be received. Cannot finalize the order</label>						
												
				</div>  End of content table wrapper -->

					</div>
					<!-- End of pop up data -->
					<div class="popupData">

						<div class="popupActionsWrapper">
							<span class="popupActions"> <label class="actionBtn"
								id="okBtn">OK</label>
							</span>
						</div>
						<!-- End of popup actions-->

						<!-- Commented by Haresh 
				<span class="popMessageBtnWrapper">
					<label class="actionBtn popMessageBtn" id="okBtn">OK</label>
				</span> -->

					</div>
				</div>
				<!-- End of popupContent -->
			</div>
			<!-- End of popup -->

			<!-- vendor authorization number popup -->
			<div id="dialog-modal-autho" title="Edit Vendor Authorisation Number">
				<div class="popupContent">

					<div class="popupData">





						<div class="ContentTableWrapper formWrapper">

							<div class="parameter">
								<label for="dDate">Authorisation #</label> <input type="#"
									class="textbox" id="vendorAuthNo" name="vendorAuthNo"
									placeholder="Enter authorisation number"
									onkeypress="return isNumberKey(event)" maxlength="15" />
							</div>
							<!-- End of parameter -->

						</div>
						<!-- End of content table wrapper -->

					</div>
					<!-- End of pop up data -->


					<div class="popupActionsWrapper">
						<span class="popupActions"> <label class="actionBtn"
							id="saveVendorAuthNo">Save</label> <label
							class="secondaryActionBtn" id="cancelVendorAuthNo">Cancel</label>
						</span>
					</div>
					<!-- End of popup actions-->

				</div>
				<!-- End of popupContent -->

			</div>



		</form>
	</div>
	<%@include file="footer.jsp"%>


	<script>
	unsavedRows="";
	c=0;
	d=0;
	e=0;
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
		$(function() {
			document.forms[0].autocomplete="off";
			$('.saveFlagCheck').filter(function()
					{
				if($(this).val()=='Y')
				{
					var id = (this.id).split('-')[1];
					$(("#receivedEdit-").concat(id)).addClass('hideBlock');
					$(("#received-").concat(id)).removeClass('hideBlock');
				
 					$(("#packOMEdit-").concat(id)).addClass('hideBlock');
					$(("#packOM-").concat(id)).removeClass('hideBlock');	

					/* $(("#deliverDateEdit-").concat(id)).addClass('hideBlock');
					$(("#deliverDate-").concat(id)).removeClass('hideBlock'); */

					$(("#saveRecord-").concat(id)).addClass('hideBlock');
					$(("#editRecord-").concat(id)).removeClass('hideBlock');					
						
				}
				
				}
			);
			//<!-- (Invoice #${orderdet.invoiceNo},Order Ref. #${order.orderRefNo}) -->
			if($('#popupFlag').val()=='true'){
				
				$( "#dialog-alreadyPresent" ).dialog( "open" );
				$('#confirmNO5').click(function(e){
					$( "#dialog-alreadyPresent" ).dialog( "close" );
					});
				$('#confirmYES5').click(function(e){
					$( "#dialog-alreadyPresent" ).dialog( "close" );
					$("#receiveForm").attr('action','addToReceiveList.htm');
					$("#receiveForm").attr('method','GET');
					$('#divMsg').removeClass('errorDiv');
					$('#divMsg').addClass('errorDiv hideBlock');
					$('#statusMsg').removeClass('errorDiv');
					$('#statusMsg').addClass('errorDiv hideBlock');
					$("#receiveForm").submit();
					});
				
				}
			setTimeout(function(){if($('#focusIndex').val()==""){
				$('#receivedTxt-1').focus(function() { 
				    var elem = $(this);
				    elem.val(elem.val());
				} );

				$('#receivedTxt-1').focus();

			}
			else {
				var id=$('#focusIndex').val();
				$(("#receivedTxt-").concat(id)).focus(function() { 
				    var elem = $(this);
				    elem.val(elem.val());
				});
				$(("#receivedTxt-").concat(id)).focus();
				}},100);
			if($('#brudCrumCheck').val()=='true'){
				$('.orderDet').hide().addClass('hideBlock');
				$('.reconFlag').show().removeClass('hideBlock');
				}
			if($('#successMsg').val()=='vendorsuccess')
			{
				$('#alertBox').text('Vendor claim authority number updated successfully');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					});
				
			}else if($('#successMsg').val()=='vendorfailure'){
				$('#alertBox').text($('#status').val());
				
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					});
				}
				$('.inputQty').filter(function()
					{
					var id = (this.id).split('-')[1];
					
					
				if($(("#baseUom-").concat(id)).val()=='EA')
					{
					//onkeyup="isNumber1('#ordqty')"
					$(("#receivedTxt-").concat(id)).attr('onkeypress','return isNumberKey(event)');
					$(("#packOMTxt-").concat(id)).attr('onkeypress','return isNumberKey(event)');
					}	
				else
					{
					//var id1=$(("#qtyValue-").concat(id));
					//var id1='#qtyValue-'+id;
					$(("#receivedTxt-").concat(id)).attr('onkeypress','return isDecimalNumber(this)');
					$(("#packOMTxt-").concat(id)).attr('onkeypress','return isDecimalNumber(this)');
					//$(("#qtyValue-").concat(id)).attr('onkeypress','return isDecimalNumber(this)');
					}
				}
				);

			if($('#hideContent').val()=='true'){
				$('.hideContent').hide().addClass('hideBlock');
				$('.showContent').show().removeClass('hideBlock').removeClass('hideBlock');
				}
			$("#addActionBtn").click(function(){ 
				$("#tableAddAction").removeClass('hideBlock');
			});
			$("#closeLink").click(function(){ 
				$('#divMsg').hide().addClass('hideBlock');
				 $('#statusMsg').hide().addClass('hideBlock');
				$("#tableAddAction").addClass('hideBlock');
			});
			if($('#cancelStatus').val()=='true'){
				window.location.href= "../order/backToOrderDetails.htm";
					}
			if($('#receiveStatus').val()=='true'){
				$('#fromReceive').val('true');
				$('.hideContent').hide().addClass('hideBlock');
				$('#hideContent').val('true');
				$('#brudCrumCheck').val('true');
				$('#alertBox').text('Order is received successfully.');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$("#receiveForm").attr('action','requestOrderDetail.htm');
					$("#receiveForm").attr('method','POST');
					$('#divMsg').removeClass('errorDiv');
					$('#divMsg').addClass('errorDiv hideBlock');
					$('#statusMsg').removeClass('errorDiv');
					$('#statusMsg').addClass('errorDiv hideBlock');
					$("#receiveForm").submit();
					
					});
				$(".closePopUp").click(function(e) {
					
					$("#receiveForm").attr('action','requestOrderDetail.htm');
					$("#receiveForm").attr('method','POST');
					$('#divMsg').removeClass('errorDiv');
					$('#divMsg').addClass('errorDiv hideBlock');
					$('#statusMsg').removeClass('errorDiv');
					$('#statusMsg').addClass('errorDiv hideBlock');
					$("#receiveForm").submit();
				
									 
					  });
				//window.location.href= "../order/backToOrderDetails.htm";
					}
			$('.textbox').focus(function(){
				if ( $(this).val() == $(this).attr('defaultVal') ){
				  $(this).val('');
				  $(this).removeClass("textboxDefaultText"); 				 
				}
			});
			if($('#msg').val()=='true'){
				$('#msgLabel').text('');
				$('#msgLabel').text('Receive order request successfully submitted.');
				$('#msg').val('');
				}
			else if($('#msg').val()=='false'){
				$('#msgLabel').text('');
				$('#divMsg').text('');
				$('#addRowClass').removeClass('addRow');
				$('#alertBox').text('Receive order request failed. Please try again after sometime.');
				$( "#dialog-modal" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					});
				$('#msg').val('');
				}else if($('#msg').val()=='vendorfailure'){
					$('#msgLabel').text('');
					$('#divMsg').text('');
					$('#addRowClass').removeClass('addRow');
					$('#alertBox').text('Vendor Claims failed due to Service unavaliabilty.Please try again after sometime.');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						});
					$('#msg').val('');
					}else if($('#msg').val()=='vendorsuccess'){
						$('#msgLabel').text('');
						$('#divMsg').text('');
						$('#addRowClass').removeClass('addRow');
						$( "#vendorAutho" ).hide().addClass('hideBlock');
			 	 		$( "#headervendorAutho" ).show().removeClass('hideBlock');
						$('#msg').val('');
						}
			
			$('.textbox').blur(function(){
				if ( $(this).val() == '' ){
				  $(this).val($(this).attr('defaultVal'));
				  $(this).addClass("textboxDefaultText"); 
				}
			});
		
			
			/*when edit button is clicked displays input box in editable cells*/
			$(".editBtn").click(function(){
				$('#divMsg').hide().addClass('hideBlock');
				 $('#statusMsg').hide().addClass('hideBlock');
				var id = (this.id).split('-')[1];
			
				$(("#row-").concat(id)).addClass('rowHighlight');
				$(("#receivedEdit-").concat(id)).removeClass('hideBlock');
				$(("#received-").concat(id)).addClass('hideBlock');
				
				$(("#packOMEdit-").concat(id)).removeClass('hideBlock');
				$(("#packOM-").concat(id)).addClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).removeClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
				$(("#receivedTxt-").concat(id)).val("");
				$(("#packOMTxt-").concat(id)).val("");
				
			});
			
			/*when save button is clicked displays input box is disabled*/
			$(".saveBtn").click(function(){
				$('#divMsg').hide().addClass('hideBlock');
				 $('#statusMsg').hide().addClass('hideBlock');
				$(this).parent().parent().removeClass('saveFlag');
				var flag=true;
				var id = (this.id).split('-')[1];
				var receiveQty=$(("#receivedTxt-").concat(id)).val();
				var orderedQty=$(("#orderedQty-").concat(id)).text();
				
				/* if(Number(receiveQty)<Number(orderedQty)){
					$('#confirmMsg').text('Are you sure you want to confirm?');
				}
				else if(Number(receiveQty)>Number(orderedQty))
					{
					$('#confirmMsg').text('Are you sure you want to confirm?');
					}
				if(Number(receiveQty)<0 && isNAN(receiveQty) ){
					flag=false;
					$('#alertBox').text('please enter valid qunatity');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						});
					} */
				/* if(flag){
					$( "#dialog-cancelOrder" ).dialog( "open" );
									
					 
					 $("#confirmYES").click(function(e) { */
						 $(("#row-").concat(id)).removeClass('rowHighlight');
							$(("#receivedEdit-").concat(id)).addClass('hideBlock');
							$(("#received-").concat(id)).removeClass('hideBlock');
							
							$(("#packOMEdit-").concat(id)).addClass('hideBlock');
							$(("#packOM-").concat(id)).removeClass('hideBlock');
							
							$(("#saveRecord-").concat(id)).addClass('hideBlock');
							$(("#editRecord-").concat(id)).removeClass('hideBlock');

							var recQty=$(("#receivedTxt-").concat(id)).val();

							if(recQty!=null &&  $.trim(recQty).length != 0)
							$(("#received-").concat(id)).text(recQty);
							var packOm=$(("#packOMTxt-").concat(id)).val();

							if(packOm!=null &&  $.trim(packOm).length != 0)
							$(("#packOM-").concat(id)).text(packOm);
							var index=id;
							//var receiveQty=$(("#receivedEdit-").concat(id)).val();
							
							$( "#dialog-cancelOrder" ).dialog( "close" );
							$.ajax({
								type : "GET",
								url : "saveReceiveQty.htm",
								
								data : "index=" + index + "&recQty=" + recQty + "&packOm=" + packOm,
								success : function(response) {
												
								},
							});
							
						
					// });

					 $("#confirmNO").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );				
					 }); 

			//	}
				
				
			});
				
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			$(".thumbUp").click(function(){
				c=0;
				d=0;
				e=0;
				$('.popupTableData,.popupTableDataTwo').html('').append('<tr class="">	<th>Article #</th><th>Description</th>	<th class="numberColumn">Order Qty.</th>	<th class="numberColumn" width="70px">Received Qty.</th>	</tr>');
				//$('.').html('').append('<tr class="">	<th>Article #</th><th>Description</th>	<th class="numberColumn">Order Qty.</th>	<th class="numberColumn" width="70px">Received Qty.</th>	</tr>');
				$('#divMsg').hide().addClass('hideBlock');
				
				var flag1=true;
				var flag2=true;
				/* $('.nullCheck').filter(function()
						{
					if($(this).text()==0)
					{
						$('#alertBox').text('Please provide quantity to be ordered.');
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							});;
							flag=true;/* 
							var temp=$(this).attr('id');
							$('#'+temp+'').focus(); 
							
							}	
					}
				); */
				$('.dateCheck').filter(function()
				{c++;
					if($(this).css('display')=='table-cell')
					{e++;
						
						var id = (this.id).split('-')[1];
						//unsavedRows=unsavedRows+'<tr class="unsavedRow">'+($(("#row-").concat(id)).html())+'</tr>';
							$('.popupTableData').append('<tr class="unsavedRow">'+($(("#row-").concat(id)).html())+'</tr>');
							$(('.popupTableData #received-').concat(id)).text($(('#receivedTxt-').concat(id)).val());
							$(('.popupTableData #receivedEdit-').concat(id)).removeClass('popupHide');
							$('.popupTableData .removeHide').removeClass('hideBlock');
							$('#saveCount').text(e);
							//$('packOMTxt-'+c).val($('packOMTxt-'+c).val());
							//$('#alertBox').text('Please save the articles before you finalise the order.');
						$( "#dialog-modal-save" ).dialog( "open" );
						$( "#dialog-modal-quantity" ).dialog( "close" );
						$('#knowProceed').click(function(e){
							if($('#reviewItems').is(':checked')){
							$( "#dialog-modal-save" ).dialog( "close" );
							$('#receivedEdit-'+e).focus();
							}
							else{
								$( "#dialog-modal-save" ).dialog( "close" );
								$('.dateCheck').filter(function()
								{
									if($(this).css('display')=='table-cell')
									{
												
									var id = (this.id).split('-')[1];
									$(('#receivedTxt-').concat(id)).val('0');
									$(('#saveRecord-').concat(id)).click();
													//$(('#receivedTxt-').concat(id)).val('0');
								}
											
							});
							}	
								
							});
						$('#cancelSave').click(function(e){
							$( "#dialog-modal-save" ).dialog( "close" );
							$('#receivedEdit-'+e).focus();
							});
						//$('#okBtn').click(function(e){
						//	$( "#dialog-modal" ).dialog( "close" );
						//	$(("#rosterDateValue-").concat(id)).focus();
							//});;
							flag1=false;
							flag2=false/* 
							var temp=$(this).attr('id');
							$('#'+temp+'').focus(); */
							
					}
					
					
					});
				if(flag2)
					 {
					$('.dateCheck').filter(function(){
						var id = (this.id).split('-')[1];
						if(Number($(("#orderedQty-").concat(id)).text().split(' ')[0])!=Number($(("#received-").concat(id)).text().split(' ')[0])){
							d++;
							$('.popupTableDataTwo').append('<tr class="unsavedRow">'+($(("#row-").concat(id)).html())+'</tr>');
							$('#qtyCount').text(d);
							$( "#dialog-modal-quantity" ).dialog( "open" );
							$('#proceedOrder').click(function(e){
								$( "#dialog-modal-quantity" ).dialog( "close" );
								$('#divMsg').removeClass('errorDiv');
								$('#divMsg').addClass('errorDiv hideBlock');
								$('#statusMsg').removeClass('errorDiv');
								$('#statusMsg').addClass('errorDiv hideBlock');
								//$('#statusImg').removeClass('loading hideBlock');
								//$('#statusImg').addClass('loading');
								fullScreenLoader();
								$("#flag" ).val('Finalize');
								$("#receiveForm").attr('action','addArticle.htm');
								$("#receiveForm").attr('method','GET');
								$("#receiveForm").submit();
								
								});
							$('#cancelpopup').click(function(e){
								$( "#dialog-modal-quantity" ).dialog( "close" );
							});

							
							
							flag1=false;
							}
					});
					}
				
				//$('.popupTableData').append(unsavedRows);
				if($("#row-1").text()=="")
					{
					$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							});
					//var msg=confirm('');
					}
				else if(flag1){
					$('#divMsg').removeClass('errorDiv');
					$('#divMsg').addClass('errorDiv hideBlock');
					fullScreenLoader();
					  $('#statusMsg').removeClass('errorDiv');
						$('#statusMsg').addClass('errorDiv hideBlock');
					
					//$('#statusImg').removeClass('loading hideBlock');
					//$('#statusImg').addClass('loading');
				$( "#flag" ).val('Finalize');
				$("#receiveForm").attr('action','addArticle.htm');
				$("#receiveForm").attr('method','GET');
				
				$("#receiveForm").submit();
				}
				
			});
			
			/* $( "#addArticle" ).click(function(){
				
				$('#statusImg').removeClass('statusWrapper hideBlock');
				$('#statusImg').addClass('statusWrapper');
				
				$( "#flag" ).val('Add');
				$("#receiveForm").attr('action','addArticle.htm');
				$("#receiveForm").attr('method','GET');
				
				$("#receiveForm").submit();
				
			}); */
			if($('#invalidQty').val()=='true')
			{
			$('#alertBox').text('Article quantity cannot be decimal value. It is truncated to whole number');
			$( "#dialog-modal" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				});;
				$('#invalidQty').val('');
			}
			$( ".deleteOneRecord" ).click(function(){
				$('#divMsg').hide().addClass('hideBlock');
				 $('#statusMsg').hide().addClass('hideBlock');
				var index=(this.id).split('-')[1];
				if($(('#operation-').concat(index)).val().trim()=='5'){
				$("#index1").val(index);
				$("#receiveForm").attr('action','deleteArticle.htm');
				$("#receiveForm").attr('method','GET');
				$('#divMsg').removeClass('errorDiv');
				$('#divMsg').addClass('errorDiv hideBlock');

				  $('#statusMsg').removeClass('errorDiv');
					$('#statusMsg').addClass('errorDiv hideBlock');
				$("#receiveForm").submit();}
				
			});
			$('#addArticle').click(function() {
				
				$('#divMsg').hide().addClass('hideBlock');
				 $('#statusMsg').hide().addClass('hideBlock');

				$('#msgLabel').text('');
				var suppName=$('#suppNo').val();
				var sourceSupply=$('#sos').val();;
				var warehouse='';
				var artType=$('input:radio[name=articleType]:checked').val();
				var articleNo = $('#artEan').val();
				var ordQty=$('#recQty').val();
				if (articleNo == "" || $.trim(articleNo).length == 0) {
					$('#msgLabel').text('Please enter article number.');
					$('#statusMsg').hide().addClass('hideBlock');
					$('#artEan').focus();
					$('#divMsg').show().removeClass('hideBlock');
				}
				else if(artType=="ArticleNumber" && isNaN(articleNo)){
					$('#msgLabel').text('Please enter a valid article number');
					$('#statusMsg').hide().addClass('hideBlock');
					$('#artEan').focus();
					$('#divMsg').show().removeClass('hideBlock');
					}
				else if (ordQty == "" || $.trim(ordQty).length == 0) {
					$('#msgLabel').text('Please enter quantity.');
					$('#statusMsg').hide().addClass('hideBlock');
					$('#recQty').focus();
					$('#divMsg').show().removeClass('hideBlock');
				}else if(isNaN(ordQty)||ordQty<0 || ordQty==0){
					$('#msgLabel').text('Please enter valid quantity');
					$('#divMsg').show().removeClass('hideBlock');
					$('#statusMsg').hide().addClass('hideBlock');
					$('#recQty').focus();
					$('#divMsg').show().removeClass('hideBlock');
					}
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
								 $("#artEan").val($("#artNo0").text());
								 $('#desIndex').val('0');
								 	$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									$('#receiveForm').attr('action','addArticleDescriptionDetail.htm');
									$('#receiveForm').attr('method','GET');
									$('#divMsg').removeClass('errorDiv');
									$('#divMsg').addClass('errorDiv hideBlock');

									  $('#statusMsg').removeClass('errorDiv');
										$('#statusMsg').addClass('errorDiv hideBlock');
									$('#receiveForm').submit();
								 }
							 }else{
								 $('#msgLabel').text('Sorry no results returned for your search criteria. Please try again');
									$('#divMsg').show().removeClass('hideBlock');
									$('#statusMsg').hide().addClass('hideBlock');
									$('#recQty').focus();
									$('#divMsg').show().removeClass('hideBlock');
								/* 	
								 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
									 
										 //$("#nodataMsg").addClass('tableTitle nodataMessage');
										$('#nodataMsg').html('Sorry no results returned for your search criteria. Please try again');
										$('.dialog-modal2').html('');
										$("#dialog-modal2").parent().addClass("popupWrapper");			
										$("#dialog-modal2" ).dialog( "open" );
										$("#searchWarning").addClass('hideBlock');
										$("#popupSearch").removeClass('hideBlock');
										} */
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
					$("#flag" ).val('Add');
					$("#receiveForm").attr('action','addArticle.htm');
					$("#receiveForm").attr('method','GET');
					$('#divMsg').removeClass('errorDiv');
					$('#divMsg').addClass('errorDiv hideBlock');

					  $('#statusMsg').removeClass('errorDiv');
						$('#statusMsg').addClass('errorDiv hideBlock');
					$("#receiveForm").submit();

			}
				
			}); 
		
			$("#goButtonSample2")
			.click(
					
					function() {
						//$('#validMsg').text('');
						
						var vendorDesc=$('#vendorDesc2').val();
						var suppName=$('#suppNo').val();
						var sourceSupply=$('#sos').val();;
						var warehouse='';
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
									 $("#artEan").val($("#artNo0").text());
									 $('#desIndex').val('0');
									 	$('#statusImg').removeClass('loading hideBlock');
										$('#statusImg').addClass('loading');
										$('#receiveForm').attr('action','addArticleDescriptionDetail.htm');
										$('#receiveForm').attr('method','GET');
										$('#divMsg').removeClass('errorDiv');
										$('#divMsg').addClass('errorDiv hideBlock');

										  $('#statusMsg').removeClass('errorDiv');
											$('#statusMsg').addClass('errorDiv hideBlock');
										$('#receiveForm').submit();
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
	
			$("#backLink").click(function(e) {
				$('#divMsg').hide().addClass('hideBlock');
				if($('#hideContent').val()=='false'){
				window.location.href= "../order/backToOrderDetails.htm";
				}
				else if($('#hideContent').val()=='true' && $('#brudCrumCheck').val()!='true'){
					window.location.href= "../order/backToOrderSearch.htm";
					}
				else{
					window.location.href= "../order/backToRecon.htm";
					}// window.history.back();
				
			  });
			$("#confirmOrder").click(function() {
				$("#dialog-modal-quantity").parent().addClass("popupWrapper");					
				$("#dialog-modal-quantity").dialog( "open" );			
			});
		
			$("#cancelLink").click(function(e) {
				$('#divMsg').hide().addClass('hideBlock');
				 $('#statusMsg').hide().addClass('hideBlock');
				$('#confirmMsg').text('Are you sure you want to cancel receiving this order?');
				 $( "#dialog-cancelOrder" ).dialog( "open" );				


				 
				 $("#confirmYES").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );
					 window.location.href= "../order/backToOrderDetails.htm";	
						 
				 });

				 $("#confirmNO").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });  


				  
				 //window.history.back();
			  }); 
			 
			
		});
		
  // VENDOR AUTH POP UP CODE
 	
 	$(function() {
 		document.forms[0].autocomplete="off";
 	 	if($('#VndrorderState').val()=="Received"){
 	 	 	//if($('#vendorclaimHidden').val()==''){
 	 		//$( "#vendorAutho" ).show().removeClass('hideBlock');
 	 		//$( "#headervendorAutho" ).show().removeClass('hideBlock');
 	 		if($('#vendorClaimVal').val()==''){
 	 	 		if($('#recSite').val()==$('#sendSite').val()){
 	 	 		$( "#headervendorAutho" ).hide().addClass('hideBlock');
 	 	 		$( "#vendorAutho" ).show().removeClass('hideBlock');
 	 	 		}
 	 	 	}else{
 	 	 		if($('#recSite').val()==$('#sendSite').val()){
 	 	 		$( "#headervendorAutho" ).show().removeClass('hideBlock');
 	 	 		$( "#vendorAutho" ).hide().addClass('hideBlock');
 	 	 	 	}
 	 	 	}
 			
 	 	 }else{
 	 		//$('#authHeader').show().removeClass('hideBlock')
 	 	 		$( "#vendorAutho" ).hide().addClass('hideBlock');
 	 	 		$( "#headervendorAutho" ).hide().addClass('hideBlock');
 	 	 	 	}
 	 	securityMatrix();
 	}
 	);
		// code to open popup on vendor authorization
		$( "#vendorAutho" ).click(function() {							
			$( "#dialog-modal-autho" ).dialog( "open" );				
		});
		
		$( "#editAutho" ).click(function() {							
			$( "#dialog-modal-autho" ).dialog( "open" );				
		});

		// vendor -- new
		   $("#cancelVendorAuthNo").click(function(e) {
			 $( "#dialog-modal-autho" ).dialog( "close" );				
		 }); 
		   $("#saveVendorAuthNo").click(function(e) {
			   $('#vendorClaimVal').val($('#vendorAuthNo').val());
			   if($('#vendorAuthNo').val()=="" || (isNaN($('#vendorAuthNo').val())))
				{
				   $('#alertBox').text('Please enter a valid Vendor Claim Authorization number.');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
					});
				}else{
					$( "#dialog-modal-autho" ).dialog( "close" );	
					$("#receiveForm").attr('action','saveVendorClaimAuth.htm');
					$("#receiveForm").attr('method','POST');
					$('#divMsg').removeClass('errorDiv');
					$('#divMsg').addClass('errorDiv hideBlock');

					  $('#statusMsg').removeClass('errorDiv');
						$('#statusMsg').addClass('errorDiv hideBlock');
					$("#receiveForm").submit(); 
				} 
			 });

		// vendor authorization popup 
			$( "#dialog-modal-autho" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 150,
				maxHeight: 600,
				width: 430
			});
			
			$("#dialog-modal-autho").parent().addClass("popupWrapper");

		//END
		
		
		$(".msgClose").click(function(e) {

			  $('#divMsg').hide().addClass('hideBlock');
				$('#divMsg').addClass('errorDiv hideBlock');

				  $('#statusMsg').hide().addClass('hideBlock');
					$('#statusMsg').addClass('errorDiv hideBlock');
		  });
		
		$( "#dialog-cancelOrder" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 120,
			maxHeight: 600,
			width: 350
		});
		$("#dialog-cancelOrder").parent().addClass("popupWrapper");
		$( "#dialog-alreadyPresent" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 120,
			maxHeight: 600,
			width: 350
		});
		$("#dialog-alreadyPresent").parent().addClass("popupWrapper");
		
		$( "#dialog-modal" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 120,
			maxHeight: 600,
			width: 350
		});
		$( "#dialog-modal-quantity" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 200,
			maxHeight: 600,
			width: 700
		});
		$( "#dialog-modal-save" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 200,
			maxHeight: 600,
			width: 700
		});
		$("#dialog-modal-quantity").parent().addClass("popupWrapper");
		$("#dialog-modal-save").parent().addClass("popupWrapper");
		$("#dialog-modal").parent().addClass("popupWrapper");
		$( "#dialog-modal2" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 200,
			maxHeight: 600,
			width: 700
		});

		
		securityMatrix();
		
	</script>
	<script type="text/javascript">
/* Autocomplete Off */
 
$(document).ready(function(){
	document.forms[0].autocomplete="off";


	if (document.getElementsByTagName) {

		var inputElements = document.getElementsByTagName("input");

		for (i=0; inputElements[i]; i++) {

		if (inputElements[i].className && (inputElements[i].className.indexOf("disableAutoComplete") != -1)) {

		inputElements[i].setAttribute("autocomplete","off");

		}

		}

		}
 });

</script>
	<style>
.popupTableData .popupHide,.popupTableData .dateCheck,.popupTableDataTwo .popupHide,.popupTableDataTwo .dateDate
	{
	display: none
}
</style>
</body>
</html>
