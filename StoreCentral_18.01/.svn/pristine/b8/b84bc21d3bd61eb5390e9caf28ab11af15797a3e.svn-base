<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<title>Purchase Requisition Details</title>



<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/jquery.jWizard.css?version=${properties.version}" rel="stylesheet">
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
<script src="../../scripts/jquery.jWizard.js?version=${properties.version}"></script>
<script src="../../scripts/delivery-date.js?version=${properties.version}"></script>


</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>
			<input type="hidden" id="navBarHighlight" value="orders" /> <input
				type="hidden" id="recSite" value="${order.recvSite}" /> <input
				type="hidden" id="suppNo" value="${order.suppNo}" /> <input
				type="hidden" id="sendSite" value="${user.siteNo}" /> <input
				type="hidden" id="updateStatus" value="${updateStatus}" /> <input
				type="hidden" id="prNo" value="${order.pReqNo}" /> <input
				type="hidden" id="deptNo" value="${order.tradDeptNo}" />

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="orderDet"><a href="../order/backToOrderSearch.htm">Lookup
								Orders</a></li>
						<li class="orderDet"><a href="../order/backToOrderSearch.htm">Order
								Results</a></li>
						<li style="display: none;" class="reconFlag"><a
							href="../order/backToRecon.htm">Reconciliation Report</a></li>

						<li class="currentPage">Purchase Requisition Details</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtnId">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->


		<form method="POST" action="deletePReqArticle.htm" id="pReqForm">
			<input type="hidden" value="" id="articleIndex" name="articleIndex" />
			<div class="contentWrapper">

				<div class="articleHead">
					<div class="articleHeaderWrapper">
						<h2 class="articleTitle">
							PReq. #${order.pReqNo} <span>
								<!-- (Ref. #${order.orderRefNo})-->
							</span>
						</h2>

						<p>
							<input type="hidden" value="${order.suppNo}"
								id="supplier-no-preq" name="supplier-no-preqs" /> <input
								type="hidden" value="${order.suppName}" id="supplier-name-preq"
								name="supplier-name-preqs" /> <label class="articlePriceLabel">
								${order.suppName} (${order.suppNo}) </label> <label
								class="articlePriceLabel">|</label> <label
								class="articlePriceLabel"> <label
								class="articlePriceLabel">Delivery Date: <strong
									id="deliDate">${order.deliveryDate}</strong> <!-- <label
								class="editRecord" id="editdDate">&nbsp;</label> --></label>
						</p>
					</div>
					<div class="articleActionBtns" id="createDiv">
						<label class="orderStatus">Status: <strong
							id="preqStatus">${order.orderStatus}</strong></label>
						<c:if test="${empty order.orderNo}">
							<c:if test="${order.rosterDateFlag=='Y'}">
								<label class="actionBtn hideContent createDiv"> <label
									class="notepad" id="createOrder">Create PO</label></label>
							</c:if>


							<label class="actionBtn hideContent createDiv" id="cancelPReq"><label
								class="notepadCross" id="cancelLink">Cancel PReq</label></label>

						</c:if>
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
									<td class="keyInfo">Type:</td>
									<td class="valueInfo lastColumn">${order.pReqTypeDesc}</td>
								</tr>

								<tr>
									<td class="keyInfo">Department:</td>
									<td class="valueInfo">${order.tradDeptNo}</td>
									<td class="keyInfo">Roster Date:</td>
									<td class="valueInfo">${order.rosterDate}</td>
									<td class="keyInfo">Creation Date:</td>
									<td class="valueInfo lastColumn">${orderdet.dateCreated}</td>
								</tr>
								<!--
							<tr class="lastRow">
								<td class="keyInfo">Receiving Store:</td>
								<td class="valueInfo">${order.recvSite}|
									${order.recvSiteName}</td>
								<td class="keyInfo hideStore"></td>
								<td class="valueInfo hideStore"></td>
								<td class="keyInfo">Value ($):</td>
								<td class="valueInfo lastColumn">${orderdet.gstAmount}</td>
							</tr>
							 -->
							</table>
						</div>
						<!-- End of article details -->
					</div>
					<!-- End of article content inner -->









				</div>
				<!-- End of article content -->

				<div class="ContentTableWrapper">

					<div class="tableInfo">

						<div class="tableTitle">
							<h4 class="sectionTitle">List of Articles</h4>
						</div>
						<!-- End of table title -->
					</div>
					<c:if test="${empty order.orderNo}">
						<div class="tableActionsBtnsWrapper hideContent" id="addDiv1">
							<div class="lookupActionWrapper">
								<label class="linkBtn" id="addActionBtn"><label
									id="addRowClass" class="addRow">Add</label></label>




								<div class="errorDiv hideBlock" id="divMsg">
									<label id="msgLabel"></label> <label
										class="closeMessage msgClose" id="msgClose">&nbsp;</label>
								</div>
								<c:if test="${not empty msg}">
									<div class="errorDiv" id="statusMsg">
										<label>${msg}</label> <label class="closeMessage msgClose"
											id="msgClose">&nbsp;</label>
									</div>
								</c:if>

							</div>
							<!-- End of lookup action wrapper -->


						</div>
						<!-- End of table actions btn wrapper -->

						<div class="tableActionsWrapper hideBlock hideContent"
							id="tableAddAction">


							<input type="hidden" name="flag" id="flag" /> <input
								type="hidden" name="index1" id="index1" value="" /> <input
								type="hidden" value="" id="desIndex" name="desIndex" /> <input
								type="hidden" value="${invalidQty}" id="invalidQty"
								name="invalidQty" /> <input type="hidden" name="msg" id="msg"
								value="${msg}" /> <input type="hidden" name="hideContent"
								id="hideContent" value="${hideContent}" /> <input type="hidden"
								name="orderNoVendorClaim" id="orderNoVendorClaim"
								value="${order.orderNo}" /> <input type="hidden" name="sos"
								id="sos" value="1" />
							<!-- ${order.sos} -->
							<input type="hidden" name="suppNo" id="suppNo"
								value="${order.suppNo}" />
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
									<label for="qty" class="mandatory">Order Qty.</label> <input
										type="#" maxlength="20" class="textbox numberBox" id="recQty"
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


					</c:if>

					<%int nodeId=1; %>
					<%int j=1; %>
					<c:if test="${not empty orderDetails}">
						<table cellspacing="0"
							class="ContentTable treetable drilldownTable" id="treetable">
							<tr>
								<th>&nbsp;</th>
								<th>Article #</th>
								<th>Description</th>

								<th class="numberColumn" width="70px">Qty.</th>
								<th class="numberColumn">Order Multiple</th>
								<th class="numberColumn" width="70px">Total Ordered</th>
								<th class="numberColumn" width="80px">Roster Date</th>
								<th class="numberColumn" width="80px">Delivery Date</th>
								<th class="lastColumn centerValue" width="70px">Actions</th>
							</tr>


							<c:forEach items="${orderDetails}" var="orderDetails">
								<c:if test="${orderDetails.operation!='D'}">


									<tr id="row-1" class="row-1" data-tt-id="<%=nodeId%>">
										<%nodeId++; %>
										<td>&nbsp;</td>
										<td class="article-no">${orderDetails.article}</td>
										<td>${orderDetails.articleDesc}</td>

										<input type="hidden" value="${orderDetails.article}"
											id="articleIndex-<%=j%>" />
										<td id="qty-<%=j%>" class="numberColumn nullCheck">${orderDetails.orderQty}</td>
										<td id="qtyEdit-<%=j%>" class="numberColumn hideBlock"><input
											id="qtyValue-<%=j%>" maxlength="20" placeholder="" type="#"
											value="${orderDetails.orderQty}"
											class="editNumCell textbox textboxDefaultText qtyValue inputQty">
											<input type="hidden" value="${orderDetails.UOM}"
											id="baseUom-<%=j%>" /></td>

										<td class="numberColumn" id="om-<%=j%>">${orderDetails.OM}
										</td>

										<td class="numberColumn" id="totalOrder-<%=j%>">${orderDetails.totalOrd}
										</td>

										<td id="rosterDate-<%=j%>" class="numberColumn ">${orderDetails.dateCreated}</td>
										<td id="rosterDateEdit-<%=j%>" class="numberColumn hideBlock"><input
											type="#" value="${orderDetails.dateCreated}"
											id="rosterDateValue-<%=j%>"
											class="textbox textboxDefaultText inputDate editDateCell">
										</td>
										<td id="deliverDate-<%=j%>" class="numberColumn">${orderDetails.deliveryDate}</td>
										<td id="deliverDateEdit-<%=j%>"
											class="numberColumn hideBlock dateCheck "><input
											id="deliverDateValue-<%=j%>" maxlength="20" type="#"
											value="${orderDetails.deliveryDate}"
											class="delivery-date textbox textboxDefaultText inputDate editDateCell">
										</td>


										<td class="lastColumn centerValue"><c:if
												test="${empty order.orderNo}">
												<label class="linkBtn editRowBtn" id="editRecord-<%=j%>">
													<label class="editRecord">Edit</label>
												</label>
												<label class="linkBtn saveRowBtn hideBlock"
													id="saveRecord-<%=j%>"> <label class="saveRecord">Save</label>
												</label>
												<input type="hidden" value="" id="baseUom-<%=j%>" />
												<label class="linkBtn deleteBtn" id="DeleteRecord-<%=j%>">
													<label class="deleteRecord ">Delete</label> <%j++;%>


												</label>
											</c:if></td>
									</tr>

									<tr data-tt-id="<%=nodeId%>" data-tt-parent-id="<%=nodeId-1%>">
										<td colspan="10">
											<table cellspacing="0" class="ContentTable" width="100%">

												<tr>
													<td class="keyInfo">Vendor:</td>
													<td class="valueInfo" colspan="5">
														${orderDetails.suppNo}| ${orderDetails.suppName}</td>
												</tr>
											</table>
										</td>
									</tr>
								</c:if>
							</c:forEach>

						</table>

					</c:if>





				</div>
				<!-- End of content table wrapper -->
				<c:if test="${empty order.orderNo}">
					<div class="pageActions" id="con-final">
						<label class="actionBtn" id="confirmAndFinalise"> <label
							class="thumbUp">Update Purchase Requisition</label></label>
					</div>
				</c:if>

			</div>
		</form>
		<!-- End of content wrapper -->


	</div>
	<%@include file="footer.jsp"%>

	<div id="dialog-temperature" title="Temperature check">
		<div class="popupContent">

			<div class="popupData">

				<div class="ContentTableWrapper popMessage popMessagetemp">

					<label>Are you sure you want to save the changes?</label>

				</div>
				<!-- End of content table wrapper -->

				<div class="popMessageBtnWrapper">
					<label class="actionBtn confirmYesTemp" id="confirmYES" onclick="">Yes</label>
					<label class="secondaryActionBtn confirmNoTemp" id="confirmNO"
						onclick="$('#dialog-temperature').dialog('close');">No</label>
				</div>

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<%@include file="descpopup.jsp"%>
	<div id="dialog-modal" title="Update Purchase Requisition">
		<div class="popupContent">

			<div class="popupData">


				<h4 class="alertText" id="alertBox">There is no article to be
					received. Cannot finalize the order.</h4>

				<!-- Commented by Haresh
								<div class="ContentTableWrapper popMessage">

									<label id="alertBox">There is no article to be
										received. Cannot finalize the order</label>

								</div>
								 End of content table wrapper -->

				<div class="popupActionsWrapper">
					<span class="popupActions"> <!-- onclick='$("#dialog-modal1" ).dialog( "close" );' -->
						<label class="actionBtn" id="okBtn">OK</label>
					</span>
				</div>
				<!-- End of popup actions-->

				<!-- Commented by Haresh 
								<span class="popMessageBtnWrapper"> <label
									class="actionBtn popMessageBtn" id="okBtn">OK</label>
								</span> -->

			</div>
		</div>
		<!-- End of popupContent -->
	</div>


	<div id="dialog-modal-delivery" title="Change Delivery Date">
		<div class="popupContent">

			<div class="popupData">

				<h4 class="alertText">
					Current delivery date is <strong>dd/mm/yyyy</strong>.
				</h4>


				<form method="POST" action="deletePReqArticle.htm" id="pReqForm">
					<div class="ContentTableWrapper formWrapper">
						<input type="hidden" value="${order.orderType}" id="idStatus" />
						<input type="hidden" value="${order.orderStatus}"
							id="sendIBTStatus" /> <input type="hidden"
							value="${cancelStatus}" id="cancelStatus" /> <input
							type="hidden" name="receiveStatus" id="receiveStatus"
							value="${receiveStatus}" /> <input type="hidden"
							name="updateRights" id="updateRights" value="${updateRights}" />

						<input type="hidden" value="${order.orderNo}" id="orderNo-update" />
						<input type="hidden" name="olddelDate-update"
							id="olddelDate-update" value="${orderdet.deliveryDate}" /> <input
							type="hidden" name="openOrder" id="openOrder"
							value="${openOrder}" /> <input type="hidden"
							value="${order.orderNo}" id="orderNo" name="orderNo" /> <input
							type="hidden" value="${model.param.reconFlag}" id="brudCrumCheck"
							name="brudCrumCheck" />

						<div class="parameter">
							<label for="dDate" class="mandatory">New Delivery Date</label> <input
								type="text" class="textbox inputDate" maxlength="20" id="dDate">
						</div>
						<!-- End of parameter -->

					</div>
					<!-- End of content table wrapper -->
				</form>
			</div>
			<!-- End of pop up data -->


			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn"
					id="changeDate">Change</label> <label class="secondaryActionBtn"
					id="delCancel">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of popupContent -->
	</div>

	<!-- Cancel order popup message -->
	<div id="dialog-cancelOrder" title="Update Purchase Requisition">
		<div class="popupContent">

			<div class="popupData">
				<h4 class="alertText" id="canceltext">Are you sure you want to
					delete the article ?</h4>

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="confirmYES1">Yes</label> <label class="secondaryActionBtn"
						id="confirmNO1">No</label>
					</span>
				</div>
				<!-- End of popup actions-->
			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>



	<script>

	
		
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
			// new
			$(".msgClose").click(function(e) {

				  $('#divMsg').hide();
					$('#divMsg').addClass('errorDiv hideBlock');

					  $('#statusMsg').hide();
						$('#statusMsg').addClass('errorDiv hideBlock');
			  });
			
		    
			  //new
			  $('.inputQty').filter(function()
				{
				var id = (this.id).split('-')[1];
				
				
			if($(("#baseUom-").concat(id)).val()=='EA')
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
			});
				
			  // new
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
									 alert("1");
									 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
										 alert("2");
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
										$('#pReqForm').attr('action','addArticlePreqDescriptionDetail.htm');
										$('#pReqForm').attr('method','GET');
										$('#divMsg').removeClass('errorDiv');
										$('#divMsg').addClass('errorDiv hideBlock');

										  $('#statusMsg').removeClass('errorDiv');
											$('#statusMsg').addClass('errorDiv hideBlock');
										$('#pReqForm').submit();
									 }
								 }
								 else{
											$('#nodataMsg').html('Sorry no results returned for your search criteria. Please try again');
											$('.dialog-modal2').html('');
											
											
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
	
			
	

			
			if($('#recSite').val()==$('#sendSite').val())
				{
				$('#receiveOrder').show();
				}
			else{
				$('#receiveOrder').hide();
				}
			if($('#idStatus').val()=='ZNB')
				{
				$('.hideStore').text('');
				}
			
			if($('#brudCrumCheck').val()=='true'){
				$('.orderDet').hide();
				$('.reconFlag').show();
				}
			if($('#sendIBTStatus').val()=='Open' && $('#idStatus').val()=='ZUB'){
				if($('#suppNo').val()==$('#sendSite').val())
				$('#sendIBTLabel').show();
				}
			$('#sendIBT').click(function(){
				var vendorDesc='';
				var sourceSupply='';
				$.ajax({
					type : "GET",
					url : "sendIBT.htm",
					beforeSend: function(){
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "vendorDesc=" + vendorDesc + "&sourceSupply="+sourceSupply  ,
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
			$('#ui-id-2,#ui-id-3,#prev,#next,#receiveAmount,#receiveDocket').click(function(){
					$('#next').addClass('jw-button-next');
					if(tempChange==false)
					$('.errorDiv h4').text('');
			});
			$('#ui-id-2,#ui-id-3').click(function(){
				$('#next').addClass('jw-button-next');
				$('.errorDiv h4').text('');
				$('.formQuestion').addClass('hideBlock');
				$('#temperature').val('');
		});
			if($('#updateRights').val()=='true'){
			$('#editdDate').show();
			}
			else{
			$('#editdDate').hide();
			}
			if($('#openOrder').val()=='true')
			{
			$('#receiveOrder').hide();
			$('#cancelOrder').show();
			}
			else{
				$('#cancelOrder').hide();
				}
			
			
			if($("#tempFromService").val()!="" && $("#temperature").val()==""){
				//$("#temperatureDiv").show();
				$(".temperatureExist").show();
				temperatureFlag=true;
				$("#wizard").jWizard();
				
			}else if($("#tempFromService").val()!="" ){
				$(".temperatureExist").show();
				temperatureFlag=true;
				$("#wizard").jWizard();
				}
				else{
					$(".temperatureExist").remove();
					temperatureFlag=false;
					$("#wizard").jWizard();
				//$("#temperature").attr("disabled","disabled");
				}

			$(".inputDate").datepicker({
				zIndex:50
			});
			
			$(".alphaNumeric").bind("keypress", function (event) {
			    if (event.charCode!=0) {
			        var regex = new RegExp("^[a-zA-Z0-9]+$");
			        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
			        if (!regex.test(key)) {
			            event.preventDefault();
			            return false;
			        }
			    }
			});
											
			$("#cancelLink").click(function(e) {
				
				$('#canceltext').text("Are you sure you want to cancel the purchase requisition ?");
				
				 $( "#dialog-cancelOrder" ).dialog( "open" );				

				 
				 $("#confirmYES1").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );
				
						var prNo=$("#prNo").val();
						
						$.ajax({
							type : "GET",
							url : "cancelPurchaseReq.htm",
							
							data : "prNo=" + prNo,
							beforeSend: function(){
								$('#statusImg').removeClass('loading hideBlock');
								$('#statusImg').addClass('loading');
								},
							success : function(response) {
								$('#statusImg').addClass('loading hideBlock');
							    $('#statusImg').removeClass('loading');

								var data=response.split(':');
								var status=data[0];
								var message=data[1];
								if(status=='true'){


									$( "#dialog-modal" ).dialog( "close" );
									$('.createDiv').hide();
									
									$('#con-final').hide();
									$('#addDiv1').hide();
									$('#tableAddAction').hide();
									$('.editRowBtn').hide();
									$('.deleteBtn').hide();
									
									$('#alertBox').text("Purchase requisition cancelled successfully");
									$( "#dialog-modal" ).dialog( "open" );
									$('#okBtn').click(function(e){
										$( "#dialog-modal" ).dialog( "close" );
										window.location.href="../order/backToOrderSearch.htm";
										});;
								}
								else{
									$('#alertBox').text(message);
								$( "#dialog-modal" ).dialog( "open" );
								$('#okBtn').click(function(e){
									$( "#dialog-modal" ).dialog( "close" );
									});;

									}		
							},
						});
					
				 });

				 $("#confirmNO1").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });  
				  
				 
				 
			  }); 
			
			
			$( "#editdDate" ).click(function() {
				$( "#dialog-modal-delivery" ).dialog( "open" );	
			});
			$( "#delCancel" ).click(function() {
				$( "#dialog-modal-delivery" ).dialog( "close" );	
			});
			
			$( "#changeDate" ).click(function()
					{
				var flag=true;
				var orderNo=$('#orderNo-update').val();
				var delDate=formateDate1($('#olddelDate-update').val());
				var changedDelDate=formateDate($('#dDate').val());
				var currentDate=new Date();
				
				var splitteddelDate=delDate.split('.');
				var month1=splitteddelDate[1]-1;
				var actualdelDate=new Date();
				actualdelDate.setFullYear(splitteddelDate[2],month1,splitteddelDate[0]);
				
				var splittedchangedDelDate=changedDelDate.split('/');
				var month2=splittedchangedDelDate[1]-1;
				var actualChangedDelDate=new Date();
				actualChangedDelDate.setFullYear(splittedchangedDelDate[2],month2,splittedchangedDelDate[0]);

				if(validateDate(changedDelDate,dDate,"delivery"))
				{
				flag=false;
				}
				if(actualChangedDelDate.getTime()<currentDate.getTime())
				{
				flag=false;
				$('#alertBox').text('Delivery date must be later than today.');
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal1" ).dialog( "close" );
					});
				
				}
				if(actualChangedDelDate.getTime()==actualdelDate.getTime()){
					flag=false;
					$( "#dialog-modal-delivery" ).dialog( "close" );
					 $('#alertBox').text('Request for updating the order is successfully submitted');
						$( "#dialog-modal1" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal1" ).dialog( "close" );
							});
				}
				
				
				if(flag)
				{
					$( "#dialog-modal-delivery" ).dialog( "close" );
				$.ajax({
					type : "GET",
					url : "updateDeliveryDate.htm",
					beforeSend: function(){

						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "orderNo=" + orderNo + "&delDate="+changedDelDate ,
					success : function(response) {
						$('#statusImg').addClass('loading hideBlock');
						$('#statusImg').removeClass('loading');
						 if(response=="true")
						 {
							// $('#alertBox').text('Order delivery date updated successfully');
							//$( "#dialog-modal1" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								});
							$('#deliDate').html(changedDelDate);
							 }
						 else{
							 $('#alertBox').text(response);
								$( "#dialog-modal1" ).dialog( "open" );
								$('#okBtn').click(function(e){
									$( "#dialog-modal1" ).dialog( "close" );
									});
						 }
						
						 }
						 /*else{
								$("#supplier").val($("#suppNo0").text()+"-"+$("#suppName0").text());
							 }
						 $('#statusImg').addClass('loading hideBlock');
							$('#statusImg').removeClass('loading'); 
					},*/
				});
				}
		});/*
			
				}
				else{
					$('#alertBox').text('Please fill the supplier field');
					$( "#dialog-modal1" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal1" ).dialog( "close" );
						});
					$('#supplier').focus();
					}*/


			function validateDate(rosDate,id1,msg)
			{
			var currentDate=new Date();
			var splittedRosDate=formateDate(rosDate).split('/');
			var actualRosDate=new Date();
			var month1=splittedRosDate[1]-1;
			actualRosDate.setFullYear(splittedRosDate[2],month1,splittedRosDate[0]);
			var splittedOne=splittedRosDate[0]+splittedRosDate[1]+splittedRosDate[2];

			if((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999) || (splittedOne.length!=8 && splittedOne.length!=6))
			{
			$('#alertBox').text('Please enter a '+msg+' date in dd/mm/yy format.');
			$( "#dialog-modal1" ).dialog( "open" );
			$('#okBtn').click(function(e){
			$("#dialog-modal1").dialog( "close" );
			
			});
			return true;
			}
			else {
			return false;
			}
			
			}

			$("#temperature").keyup(function(){
				$('.formQuestion').addClass('hideBlock');
				$('.errorDiv h4,.formQuestion p').text('');
				$('#ui-id-2,#ui-id-3,#prev,#next,#receiveAmount,#receiveDocket').click(function(){
					$('#next').addClass('jw-button-next');
					if(tempChange==false)
					$('.errorDiv h4').text('');
				});
				if ($('#temperature').val() != "" && $.trim($('#temperature').val()).length > 0 && !(isNaN($('#temperature').val()))){
				//alert("temp blur func");
				var dept=$('#deptFromService').val();
				tempChange=true;
				//alert("dept"+dept);
				//dept="005,006";
				//alert("dept"+dept);
				var deptArray=dept.split(",");
			
				var range=$('#tempFromService').val();
				var slicedRange=range.slice(1,-1);
				var tempValArray=slicedRange.split(" to ");
				
				var rank=4;
				for(var i=0;i<deptArray.length;i++){
					if(deptArray[i]=="003" || deptArray[i]=="004" || deptArray[i]=="008" || deptArray[i]=="070" || deptArray[i]=="012"){
						rank=1;
					//	alert("rank=1");
						break;
					}else if(deptArray[i]=="006"){
						if(rank>2){
							rank=2;
						}
						
					}else if(deptArray[i]=="005"){
						if(rank>3){
							rank=3;
						}
							
					}
				}
				if(rank==4){
					/* if(tempValArray[0]<0){
						rank=1;
					}else if(tempValArray[0]>=0 && tempValArray[0]<=5){
						rank=2;
					}else{
						rank=3;
					} */
					rank=3;
					
				}
				//alert("rank ="+rank);
				var question1="";
				var question2="";
				if(rank=="1"){
					//alert("rank==1");
					question1="Are the frozen products not frozen?";
					question2="Temperature is too high. Will load be rejected?";
				}else if(rank=="2"){
					//alert("rank==2");
					question1="Is this delivery high risk produce?";
					question2="Incorrect temperature. Will load be rejected?";
				}else if(rank=="3"){
					//alert("rank==3");
					question1="Is the delivery carcass meat?";
					question2="Incorrect temperature. Will load be rejected?";
				}
				
				
				if((Number($('#temperature').val())<tempValArray[1] && Number($('#temperature').val())>tempValArray[0]))
				{
					//alert("temp in range");
					//alert("question1"+question1);
					
					
					//*******
					//$('.popMessagetemp').text(question1);
					//$( "#dialog-temperature" ).dialog( "open" );	
					$('.formQuestion p').text(question1);
					$('.errorDiv h4').text('');
					quesLevel=1;
					$('.formQuestion').removeClass('hideBlock');
					
					
					
				}else if(Number($('#temperature').val())>=tempValArray[1]){
					//alert("temp above range");
					//alert(question2);
					focus="temperature";
					//$('.popMessagetemp').text(question2);
					//$( "#dialog-temperature" ).dialog( "open" );	
					$('.errorDiv h4').text('');
					$('.formQuestion p').text(question2);
					quesLevel=1;
					$('.formQuestion').removeClass('hideBlock');
					
				}
				else{
					$('.errorDiv h4').text('');
					$('.formQuestion p').text('');
					quesLevel=3;
					}	
				$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog( "close" );$("#invoiceNo").focus();');
				$('.confirmYesTemp').attr('onclick','callNextPopup()');
			}
			});
			/*$('.yesButton').click(function(){	
				callNextPopup();
			});
			$('.noButton').click(function(){	
				$('#confirm-popup,#overlay-back').fadeOut(500);
				$('#invoiceNo').focus();
			});

			$('#cancel').click(function(){
				$( "#dialog-modal" ).dialog( "close" );
				$( ".textbox" ).val('');
				quesLevel=1;
			});*/

			
			
			
			
		if($('#cancelStatus').val()=="true" || $('#receiveStatus').val()=="true"){
			$('.hideContent').hide();
			}
			//$("#wizard").jWizard();
			
			$( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
			$("#dialog-modal").parent().addClass("popupWrapper");
			 //checks radio buttons in Invoice Info
			$('#receiveAmount').click(function(){
				$("#invoiceEntry").removeClass('hideBlock');
				$("#docketEntry").addClass('hideBlock');
				$("#invoiceEntryConfirm").removeClass('hideBlock');
				$("#docketEntryConfirm").addClass('hideBlock');
				
			});
			
			$('#receiveDocket').click(function(){
				$("#docketEntry").removeClass('hideBlock');
				$("#invoiceEntry").addClass('hideBlock');
				$("#docketEntryConfirm").removeClass('hideBlock');
				$("#invoiceEntryConfirm").addClass('hideBlock');
			});
		$("#dialog-temperature").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 120,
			maxHeight : 600,
			width : 350
		});
		$("#dialog-temperature").parent().addClass("popupWrapper");
			
			
			
			// Delivery date
			$( "#dialog-modal-delivery" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 150,
				maxHeight: 600,
				width: 350
			});
			
			$("#dialog-modal-delivery").parent().addClass("popupWrapper");
			$( "#dialog-modal2" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 700
			});
			$( "#dialog-modal1" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
			$("#dialog-modal1").parent().addClass("popupWrapper"); 
			//cancell order
			$( "#dialog-cancelOrder" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 120,
				maxHeight: 600,
				width: 350
			});
			$("#dialog-cancelOrder").parent().addClass("popupWrapper");
			
			// code to open popup on Receive Order
			$( "#receiveOrder" ).click(function() {
				if($('#idStatus').val()=='ZUB'){
					$('#wizard').submit();
					}
				else{
					$('#ui-id-2,#receiveAmount').click();
					$('.textbox').val('');	
					$('.formQuestion').addClass('hideBlock');		
				$( "#dialog-modal" ).dialog( "open" );	}			
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
				
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });

				
			
		});
				

		
		$('.aiphaNumericCheck').keypress(function(e) 
				{ 
				var code = e.keyCode ? e.keyCode:e.which;
				var pressedKey = String.fromCharCode(code); 
				if(pressedKey.match(/[a-zA-Z0-9]/g)) 
				{ 
				e.preventDefault(); 
				} 
				});
		  $("#proceed")
			.click(

					function() {
						var invoiceNo=$('#invoiceNo').val();
						var invoiceTotal=$('#invoiceTotal').val();
						var delDock=$('#delDock').val();
						var gst=$('#gst').val();
						var tempr=$("#temperature").val();
						
						 
							if($("#tempFromService").val()!="" && $.trim(tempr).length == 0){
								$('#alertBox').text('Please fill the temperature');
								$( "#dialog-modal1" ).dialog( "open" );
								$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								$("#invoiceNo").focus();
								});

								}else if ((($.trim(invoiceNo).length != 0
							&& $.trim(invoiceTotal).length != 0
							
							&& $.trim(gst).length != 0)&&
							 $.trim(delDock).length == 0)||(($.trim(invoiceNo).length == 0
										&& $.trim(invoiceTotal).length == 0
										
										&& $.trim(gst).length == 0)&&
										 $.trim(delDock).length != 0)) {
						$('#wizard').submit();
					}else if(($.trim(invoiceNo).length != 0
							&& $.trim(delDock).length != 0)||($.trim(invoiceTotal).length != 0
									&& $.trim(delDock).length != 0)||($.trim(gst).length != 0
											&& $.trim(delDock).length != 0)){
						$('#alertBox').text('Please fill either Invoice details or Delivery Docket details to proceed');
						$( "#dialog-modal1" ).dialog( "open" );
						$('#okBtn').click(function(e){
						$( "#dialog-modal1" ).dialog( "close" );
						$("#invoiceNo").focus();
						});
					}else{
				$('#alertBox').text('Please fill the mandatory fields to proceed');
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
				$( "#dialog-modal1" ).dialog( "close" );
				$("#invoiceNo").focus();
				});
				}
					});

		$("#treetable").treetable({
			expandable : true
		});

		
		
		
		 function callNextPopup(){
		 	

		 	var question3="Items from temperature check vendors are to be rejected due to incorrect temperature. Is this correct? ";

		 	//$('.callCancel').attr('onclick','callCancelOrder();');
		 			$('.formQuestion p').text('');
					$('.warningMessage h4').text(question3);
					quesLevel=2;
					$('.formQuestion').removeClass('hideBlock');
					
		 			//$('.popMessagetemp').text(question3);
		 			//$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog("close");$("#temperature").focus()');
		 			//$('.confirmYesTemp').attr('onclick','callCancelOrder();');
		 			

		 	}

		 	function callCancelOrder(){
		 		
		 		//alert("call cancel");
		 			 
		 			$( "#dialog-modal" ).dialog( "close" );
		 			  $.ajax({
		 					type : "GET",
		 					url : "cancelGoodsOrder.htm",
		 					beforeSend: function(){
		 						$('#statusImg').removeClass('loading hideBlock');
		 						$('#statusImg').addClass('loading');
		 						},
		 					data : "index=" + "" + "&recQty=" + "" ,
		 					success : function(response) {
		 						//$('#tempValue').val(response);
		 						$('#statusImg').addClass('loading hideBlock');
		 						$('#statusImg').removeClass('loading');	
		 						if(response=="true"){
		 						$('#alertBox').text("Request for cancelling the Order is successfully submitted");
		 						$( "#dialog-modal1" ).dialog( "open" );
		 						$('#okBtn').click(function(e){
		 							$( "#dialog-modal1" ).dialog( "close" );
		 							$('#msg').val('');
		 							});;
		 							window.location.href= "../order/backToOrderDetails.htm";
		 						}
		 						else {
		 							$('#alertBox').text(response);
		 							$( "#dialog-modal1" ).dialog( "open" );
		 							$('#okBtn').click(function(e){
		 								$( "#dialog-modal1" ).dialog( "close" );
		 								$('#msg').val('');
		 								});;
		 								
		 							}
		 								
		 					},
		 					
		 				}); 
		 			
		 		 
		 		
		 	}
		 	function isNumberKeyTemp(evt)
		    {
		       var charCode = (evt.which) ? evt.which : event.keyCode;
		       if ((charCode > 31 && (charCode< 48 || charCode >57))){
		    	   if(charCode==45 || charCode==46){
		    		   return true;
		    	   }
		    	   return false;
		       }
		          
				
		       return true;
		    }
		    function isDecimal(evt)
		    {
		       var charCode = (evt.which) ? evt.which : event.keyCode;
		       if ((charCode > 31 && (charCode< 48 || charCode >57))){
		    	   if(charCode==46){
		    		   return true;
		    	   }
		    	   return false;
		       }
		          
				
		       return true;
		    }
		    $(function() {
		    	fromSave=false;
		    	 $("#cancelBtn").click(function(e) {
						$( "#dialog-modal" ).dialog( "close" );
				  }); 

		    	 $("#cancel").click(function(e) {
						$( "#dialog-modal" ).dialog( "close" );
				  }); 
		    	 

			if($('#receiveStatus').val()=="true"){

				//$( "#dialog-modal1" ).dialog( "open" );

				$('#alertBox').text("Order is received successfully.");
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
				$( "#dialog-modal1" ).dialog( "close" );
				//$("#invoiceNo").focus();
				});
			}
		    });

			
			$(".editRowBtn").click(function(){
				
				var id = (this.id).split('-')[1];
				$(("#row-").concat(id)).addClass('rowHighlight');
				$(("#qtyEdit-").concat(id)).removeClass('hideBlock');
				$(("#qty-").concat(id)).addClass('hideBlock');
				// new
				if($(("#baseUom-").concat(id)).val()=='EA')
				{
				$(("#qtyValue-").concat(id)).val($(("#qtyValue-").concat(id)).val()/1);
				}	
				else
				{
				$(("#qtyValue-").concat(id)).val($(("#qtyValue-").concat(id)).val());
				}
				
				
				//$(("#rosterDateEdit-").concat(id)).removeClass('hideBlock');
				//$(("#rosterDate-").concat(id)).addClass('hideBlock');
				
				$(("#deliverDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#deliverDate-").concat(id)).addClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).removeClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
			});


			$(".deleteBtn").click(function(){
				
				var id = (this.id).split('-')[1];


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
							 
				 $("#confirmYES1").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );
					 $( "#index1" ).val(id);
					 $("#articleIndex" ).val($(("#articleIndex-").concat(id)).val().trim());
					 $("#pReqForm").submit();
					
					
				 });

				 $("#confirmNO1").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });  			
				
			});

	
$(".saveRowBtn").click(function(){

	
				
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
				/* else if((qty<0)||isNaN(qty)||qty==0){
					$('#alertBox').text('please enter a valid quantity');
					$(("#qtyValue-").concat(id)).val('');
					$(("#qtyValue-").concat(id)).focus();
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						});
					} */
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
				else if((splittedDelDate[0] > 31 || splittedDelDate[1] > 12 || splittedDelDate[2] > 9999) || splittedTwo.length!=8)
				{
					$('#alertBox').text('Please enter a valid date');
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
		        else if(currentDate.getTime()>actualDelDate.getTime()){
					
					$('#alertBox').text('Delivery date shoud not be less than current date.');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
					$( "#dialog-modal" ).dialog( "close" );
					$(("#deliverDateValue-").concat(id)).focus();
					});;
					
				} 
				 else{


					$('#statusImg').removeClass('loading hideBlock');
					$('#statusImg').addClass('loading');
					var articleIndex=$(("#articleIndex-").concat(id)).val().trim();
					$("#updateStatus").val('false');
					$.ajax({
						type : "GET",
						url : "savePReqDetail.htm",
						
						data : "index=" + index + "&orderDate=" + rosDate + "&deliveryDate=" + delDate + "&inputQty=" + qty  + "&totalOrdered=" + totalOrdered  + "&articleIndex=" + articleIndex,
						success : function(response) {
							$('#statusImg').addClass('loading hideBlock');
							$('#statusImg').removeClass('loading');	
						},
					});
										
							$(("#row-").concat(id)).removeClass('rowHighlight');
							$(("#qtyEdit-").concat(id)).addClass('hideBlock');
							$(("#qty-").concat(id)).removeClass('hideBlock');
							$(("#qty-").concat(id)).text($(("#qtyValue-").concat(id)).val());
							
						
							
							$(("#deliverDateEdit-").concat(id)).addClass('hideBlock');
							$(("#deliverDate-").concat(id)).removeClass('hideBlock');
							$(("#deliverDate-").concat(id)).text($(("#deliverDateValue-").concat(id)).val());
							
							$(("#saveRecord-").concat(id)).addClass('hideBlock');
							$(("#editRecord-").concat(id)).removeClass('hideBlock');
							
				}
			});


			
			$("#createOrder").click(function(){

				var updateStatus=$("#updateStatus").val();

				
				if(updateStatus=='true'){

				var prNo=$("#prNo").val();
				var dept=$("#deptNo").val();
				
					$.ajax({
						type : "GET",
						url : "createOrder.htm",
						
						beforeSend: function(){
							$('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							},
						data : "prNo=" + prNo+"&dept="+dept,
						success : function(response) {

							var data=response.split(':');
							var status=data[0];
							var message=data[1];

							$('#statusImg').removeClass('loading');
							$('#statusImg').addClass('loading  hideBlock');
							
							if(status=='true'){
								
							$('#alertBox').text('Purchase order created successfully with the reference #'+message);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$('.createDiv').hide();
								$('#preqStatus').text('Closed');
								$('#con-final').hide();
								$('#addDiv1').hide();
								$('#tableAddAction').hide();
								$('.editRowBtn').hide();
								$('.deleteBtn').hide();
								
								
								});;
							
							}
							else{
								$('#alertBox').text(message);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
							});;
						}
						},
					});
				}else{
					$('#alertBox').text('Please save the changes before creating the purchase order');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
					});;

					}

			});

			$("#addActionBtn").click(function(){ 
				$("#tableAddAction").removeClass('hideBlock');
			});

			$('#addArticle').click(function() {
		
				var suppName=$('#suppNo').val();
				var sourceSupply=$('#sos').val();;
				var warehouse='';
				var artType=$('input:radio[name=articleType]:checked').val();
				var articleNo = $('#artEan').val();
				var ordQty=$('#recQty').val();
				if (articleNo == "" || $.trim(articleNo).length == 0) {
					$('#msgLabel').text('Please enter article number.');
					$('#statusMsg').hide();
					$('#artEan').focus();
					$('#divMsg').removeClass('hideBlock');
				}
				else if(artType=="ArticleNumber" && isNaN(articleNo)){
					$('#msgLabel').text('Please enter a valid article number');
					$('#statusMsg').hide();
					$('#artEan').focus();
					$('#divMsg').removeClass('hideBlock');
					}
				else if (ordQty == "" || $.trim(ordQty).length == 0) {
					$('#msgLabel').text('Please enter quantity.');
					$('#statusMsg').hide();
					$('#recQty').focus();
					$('#divMsg').removeClass('hideBlock');
				}else if(isNaN(ordQty)||ordQty<0 || ordQty==0){
					$('#msgLabel').text('Please enter valid quantity');
					$('#statusMsg').hide();
					$('#divMsg').removeClass('hideBlock');
					$('#recQty').focus();
					}
				else if(artType=="description" && articleNo!=''){
					
					$.ajax({
						type : "GET",
						url : "getDescription.htm",
						beforeSend: function(){
							$('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							$('#statusMsg').hide();
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
								/* $("#artEan").val($("#artNo0").text());
								 $('#desIndex').val('0');
								 	$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									$("#flag" ).val('Finalize');
									$("#pReqForm").attr('action','addArticle.htm');
									$('#pReqForm').attr('method','GET');
									$('#divMsg').removeClass('errorDiv');
									$('#divMsg').addClass('errorDiv hideBlock');

									  $('#statusMsg').removeClass('errorDiv');
										$('#statusMsg').addClass('errorDiv hideBlock');

										
									$('#pReqForm').submit();*/

								 $("#artEan").val($("#artNo0").text());
								 $('#desIndex').val('0');
								 	$('#statusImg').removeClass('loading hideBlock');
									$('#statusImg').addClass('loading');
									$('#pReqForm').attr('action','addArticlePreqDescriptionDetail.htm');
									$('#pReqForm').attr('method','GET');
									$('#divMsg').removeClass('errorDiv');
									$('#divMsg').addClass('errorDiv hideBlock');

									  $('#statusMsg').removeClass('errorDiv');
										$('#statusMsg').addClass('errorDiv hideBlock');
									$('#pReqForm').submit();
								 }
							 }else{
								 
								 if(!$( "#dialog-modal2" ).dialog( "isOpen" )){
									 $('#msgLabel').text('Sorry no results returned for your search criteria. Please try again');
									// $('#statusMsg').hide();
										$('#divMsg').removeClass('hideBlock');
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
					$("#flag" ).val('Add');
					$("#pReqForm").attr('method','GET');
					$("#pReqForm").attr('action','addPReqArticle.htm');
					
					$('#divMsg').removeClass('errorDiv');
					$('#divMsg').addClass('errorDiv hideBlock');

					  $('#statusMsg').removeClass('errorDiv');
						$('#statusMsg').addClass('errorDiv hideBlock');



							
						$('#pReqForm').submit();

			}
				//
			}); 


			$("#confirmAndFinalise").click(function(){
				
				var flag=false;
				var flag1=false;
			var supplier=$('#supplier').val();
			var wareHouse=$('#warehouseDropdown').val();
			var sourceSupply=$('input:radio[name=sourceSupply]:checked').val();
			var srcSupply=$('input:radio[name=sourceSupply]:checked').val();
			$('.nullCheck').filter(function()
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
						$('#'+temp+'').focus(); */
						
						}	
				}
			);
			$('.dateCheck').filter(function()
					{
				if($(this).css('display')=='table-cell')
				{
					var id = (this.id).split('-')[1];
					$('#alertBox').text('Please save the articles before you update the purchase requisition.');
					$( "#dialog-modal" ).dialog( "open" );
					$('#okBtn').click(function(e){
						$( "#dialog-modal" ).dialog( "close" );
						$(("#deliverDateValue-").concat(id)).focus();
						});;
						flag1=true;/* 
						var temp=$(this).attr('id');
						$('#'+temp+'').focus(); */
						
						}
				
				}
			);
	         if($('.row-1').text()=='')
				{
				//alert("list is empty");
				$('#alertBox').text('There is no article to be received. Cannot finalize the order');
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
			else if(flag1)
			{
			$('#alertBox').text('Please save the articles before you update the purchase requisition.');
			$( "#dialog-modal" ).dialog( "open" );
			$('#okBtn').click(function(e){
				$( "#dialog-modal" ).dialog( "close" );
				});;
			}
			else{
				var prNo=$("#prNo").val();
				var dept=$("#deptNo").val();

				$("#updateStatus").val('true');
				
				$.ajax({
					type : "GET",
					url : "updatePurchaseReq.htm",
					
					beforeSend: function(){
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "prNo=" + prNo+"&dept="+dept,
					success : function(response) {
						$('#statusImg').addClass('loading hideBlock');
					    $('#statusImg').removeClass('loading');

						var data=response.split(':');
						var status=data[0];
						var message=data[1];
						if(status=='true'){
							$('#alertBox').text("Purchase requisition updated successfully");
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								window.location.href="../order/requestPReqDetailRefresh.htm";
								$( "#dialog-modal" ).dialog( "close" );
								});;
								$(".closePopUp").click(function(e) {
									window.location.href="../order/requestPReqDetailRefresh.htm";
									  });
						}
						else{
							$('#alertBox').text(message);
						$( "#dialog-modal" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal" ).dialog( "close" );
							});;

							}		
					},
				});
				
				}

				});

			$("#closeLink").click(function(){ 
				$('#divMsg').hide();
				$("#tableAddAction").addClass('hideBlock');
			});

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

			 $("#backBtnId").click(function(e) {

					var updateStatus=$("#updateStatus").val();

					
					if(updateStatus=='false'){
					
					$('#canceltext').text("Do you want to cancel the changes?");
					
					 $( "#dialog-cancelOrder" ).dialog( "open" );				

					 
					 $("#confirmYES1").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );

						 
				 window.location.href="../order/backToOrderSearch.htm";
					  }); 

					 $("#confirmNO1").click(function(e) {
						 $( "#dialog-cancelOrder" ).dialog( "close" );				
					 });   
			
			 }else{
				 window.location.href="../order/backToOrderSearch.htm";

				 }
			  }); 
	</script>
	<script type="text/javascript">
/* Autocomplete Off */
 
$(document).ready(function(){
	document.forms[0].autocomplete="off";
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

</script>
</body>
</html>
