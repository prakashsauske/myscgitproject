<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Receive IBT</title>

<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />

<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/common.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>


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
						<li id="bcHome" onclick="bcHome();"><a href="#">Home</a></li>
						<li id="bcOrdSrch" onclick="bcOrdSrch();"><a href="#">Search
								Orders</a></li>
						<li id="bcOrdDet" class="hideContent" onclick="bcOrdDet();"><a
							href="#">Order Details</a></li>
						<li class="currentPage">Receive IBT</li>

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




		<div class="contentWrapper">
			<form method="GET" action="goodsReceive.htm" id="receiveForm">
				<input type="hidden" name="index" id="index" value="" /> <input
					type="hidden" name="msg" id="msg" value="${msg}" /> <input
					type="hidden" name="orderStat" id="orderStat"
					value="${order.orderStatus}" /> <input type="hidden"
					name="hideContent" id="hideContent" value="${hideContent}" />
				<div class="articleHead">
					<div class="articleHeaderWrapper">
						<h2 class="articleTitle">
							Order #${order.orderNo} <span>
								<!-- (Invoice #${orderdet.invoiceNo})-->
							</span>
						</h2>
						<p>
							<label class="articlePriceLabel"><c:if
									test="${not empty orderdet.suppName}">${orderdet.suppName}</c:if>
								(${orderdet.suppNo}) </label> <label class="articlePriceLabel">|</label>
							<label class="articlePriceLabel">Total Cartons Received:
								<strong>${order.totalOmRecvd}</strong>
							</label>

						</p>
					</div>
					<div class="articleActionBtns">
						<label class="orderStatus">Status: <strong>${order.orderStatus}</strong></label>
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
									<td class="keyInfo">Department:</td>
									<td class="valueInfo">${order.tradDeptNo}<c:if
											test="${not empty order.tradDeptNo and not empty order.tradingDepName}"> | ${order.tradingDepName}</c:if>
									</td>
								</tr>

								<tr>


									<td class="keyInfo">Temperature:</td>
									<td class="valueInfo"><input type="text" value=""
										onkeypress="return isNumberKeyTemp(event)" id="temperature"
										name="temperatureFromUser" maxlength="5"
										class="editNumCell textbox textboxDefaultText"></td>

								</tr>





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
					<!-- End of table info -->



					<table cellspacing="0" class="ContentTable">
						<tr>
							<th>Article #</th>
							<th>Description</th>
							<th>Vendor Ref. #</th>
							<th class="numberColumn">Transfer Qty.</th>
							<th class="numberColumn">Received Qty.</th>
							<th width="140px">Movement Type.</th>
							<th class="numberColumn" width="70px">Adjusted Value</th>
							<th class="lastColumn centerValue hideContent" width="80px">Actions</th>
						</tr>
						<%int j=0; int i=1; %>
						<c:forEach items="${orderDetails}" var="orderDetails">
							<tr id="row-<%=i%>">
								<td>${orderDetails.article}</td>
								<td>${orderDetails.articleDesc}</td>
								<td>${orderDetails.vendorRefNo}</td>

								<td class="numberColumn">${orderDetails.orderQty} <c:if
										test="${not empty orderDetails.orderUOM}">${orderDetails.orderUOM}</c:if></td>
								<td class="numberColumn">${orderDetails.receivedQty} <c:if
										test="${not empty orderDetails.orderUOM}">${orderDetails.orderUOM}</c:if></td>


								<td id="received-<%=i%>" class="damaged"></td>
								<td id="receivedEdit-<%=i%>" class="hideBlock"><select
									class="selectOptions editSelectCell ${orderDetails.article}"
									name="mvmType" id="receivedTxt-<%=i%>">
										<c:forEach items="${model.mvmtTypeList}" var="mvmtTypeInfo">
											<option value="${mvmtTypeInfo.mvmtType}">${mvmtTypeInfo.mvmtTypeDesc}</option>
										</c:forEach>
										<!-- <option value="Damaged">Damaged</option>
								<option value="Missing">Missing</option>
								<option value="+ Stock Correction">+ Stock Correction</option>
								<option value="- Stock Correction">- Stock Correction</option> -->
								</select></td>
								<input type="hidden" class="" value="${orderDetails.baseUom}"
									id="baseUom-<%=i%>" />
								<td id="packOM-<%=i%>" class="numberColumn"></td>
								<td id="packOMEdit-<%=i%>" class="numberColumn hideBlock">
									<input type="#" onkeypress="return isNumberKey(event)"
									name="adjQty" value="##"
									class="editNumCell inputQty textbox textboxDefaultText"
									id="packOMTxt-<%=i%>">
								</td>
								<td class="lastColumn centerValue hideContent"><label
									class="linkBtn editBtn" id="editRecord-<%=i%>"> <label
										class="editRecord">Edit</label>
								</label> <label class="linkBtn saveBtn hideBlock"
									id="saveRecord-<%=i++%>"> <label class="saveRecord">Save</label>
								</label> <%-- <label class="linkBtn deleteOneRecord" id="DeleteRecord-<%=i++%>">
								<label class="deleteRecord">Delete</label>
							</label> --%></td>
							</tr>
						</c:forEach>
					</table>
				</div>
				<!-- End of content table wrapper -->
				<input type="hidden" value="${temperatureForIbtReceive}"
					id="tempFromService" /> <input type="hidden"
					value="${deptForIbtReceive}" id="deptFromService" /> <input
					type="hidden" value="${user.salesOrg}" id="userSalesOrg"
					name="userSalesOrg" />

			</form>
			<div class="pageActions hideContent">
				<label class="actionBtn"><label class="thumbUp">Confirm
						& Finalise</label></label> <label class="secondaryActionBtn" id="cancelLink">Cancel</label>
			</div>
			<!-- End of page actions-->


		</div>
		<!-- End of content wrapper -->

	</div>
	<%@include file="footer.jsp"%>

	<div id="dialog-cancelOrder" title="Cancel Order">
		<div class="popupContent">

			<div class="popupData">

				<div class="ContentTableWrapper popMessage">

					<label>Are you sure you want to cancel receiving this
						order?</label>

				</div>
				<!-- End of content table wrapper -->

				<div class="popMessageBtnWrapper">
					<label class="actionBtn popMessageBtn" id="confirmYES">Yes</label>
					<label class="actionBtn popMessageBtn" id="confirmNO">No</label>
				</div>

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>
	<div id="dialog-modal1" title="Receive IBT">
		<div class="popupContent">

			<div class="popupData">

				<h4 class="alertText" id="alertBox">There is no article to be
					received. Cannot finalize the order</h4>
				<!-- <div class="ContentTableWrapper popMessage">

									<label id="alertBox">There is no article to be
										received. Cannot finalize the order</label>

								</div> -->
				<!-- End of content table wrapper -->

			</div>
			<!-- End of pop up data -->
			<div class="popupData">

				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						id="okBtn">OK</label>
					</span>
				</div>
				<!-- <span class="popMessageBtnWrapper"> <label
									class="actionBtn popMessageBtn" id="okBtn">OK</label>
								</span> -->

			</div>
		</div>
		<!-- End of popupContent -->
	</div>

	<div id="dialog-temperature" title="Receive IBT">
		<div class="popupContent">

			<div class="popupData">

				<h4 class="alertText popMessagetemp" id="confirmMsg">Are you
					sure you want to save the changes?</h4>
				<!-- <div class="ContentTableWrapper popMessage popMessagetemp">

					<label>Are you sure you want to save the changes?</label>

				</div> -->
				<!-- End of content table wrapper -->
				<div class="popupActionsWrapper">
					<span class="popupActions"> <label
						class="actionBtn confirmYesTemp" onclick="" id="confirmYES">Yes</label>
						<label class="secondaryActionBtn confirmNoTemp"
						onclick="$('#dialog-temperature').dialog('close');" id="confirmNO">No</label>
					</span>
				</div>
				<!-- <div class="popMessageBtnWrapper">
					<label class="actionBtn popMessageBtn confirmYesTemp" id="confirmYES"
						onclick="">Yes</label> <label
						class="actionBtn popMessageBtn confirmNoTemp" id="confirmNO"
						onclick="$('#dialog-temperature').dialog('close');">No</label>
				</div> -->

			</div>
			<!-- End of pop up data -->

		</div>
		<!-- End of popupContent -->
	</div>

	<!-- verify supplier pop up-->
	<!-- <div id="dialog-modal" title="Remove Article">
		<div class="popupContent">		
			<div class="popupData">
				<h4 class="alertText">Are you sure you want to remove Article #2001 - Homebrand Pineapple Pieces Nat Juice 440g?</h4>
			</div> End of pop up data
			
			
			<div class="popupActionsWrapper">
				<span class="popupActions">
					<label class="actionBtn">Yes</label>
					<label class="secondaryActionBtn">No</label>
				</span>
			</div> End of popup actions
			
			
		</div> End of popupContent
		
		
	</div> End of main Wrapper -->





	<script>
	/* function isNumberKey(evt)
    {
       var charCode = (evt.which) ? evt.which : event.keyCode;
       if (charCode > 31 && (charCode< 48 || charCode >57))
          return false;

       return true;
    } */
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
    var changesMadeIndicator=0;
		$(function() {
			document.forms[0].autocomplete="off";
			$('.inputQty').filter(function()
					{
					var id = (this.id).split('-')[1];
					
					
				if($(("#baseUom-").concat(id)).val()=='EA')
					{
					//onkeyup="isNumber1('#ordqty')"
					//$(("#receivedTxt-").concat(id)).attr('onkeypress','return isNumberKey(event)');
					$(("#packOMTxt-").concat(id)).attr('onkeypress','return isNumberKey(event)');
					}	
				else
					{
					//var id1=$(("#qtyValue-").concat(id));
					//var id1='#qtyValue-'+id;
					//$(("#receivedTxt-").concat(id)).attr('onkeypress','return isDecimalNumber(this)');
					$(("#packOMTxt-").concat(id)).attr('onkeypress','return isDecimalNumber(this)');
					//$(("#qtyValue-").concat(id)).attr('onkeypress','return isDecimalNumber(this)');
					}
				}
				);
			if($('#orderStat').val()=='Received'){
				$('.damaged').text('');
				}

			
			$('#temperature').change(function() {
				$('#temperature').val(parseFloat($('#temperature').val()).toFixed(1));
			});
		
			/* $( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 600,
				width: 400
			});
		 */
			
		/* 	$(".deleteRecord").click(function() {
				$("#dialog-modal").parent().addClass("popupWrapper");					
				$("#dialog-modal").dialog( "open" );			
			}); */
		
			if($('#hideContent').val()=='true'){
				$('.hideContent').hide();
				}
			if($('#msg').val().split(':')[0]=='created')
				{
				window.location.href= "../order/backToOrderDetails.htm";
				}
			else if($('#msg').val().split(':')[0]=='adjusted'){
				$('#alertBox').text($('#msg').val().split(':')[1]);
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal1" ).dialog( "close" );
					$('#msg').val('');
					});;
				}
			else if($('#msg').val().split(':')[0]=='false'){
				$('#alertBox').text($('#msg').val().split(':')[1]);
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal1" ).dialog( "close" );
					$('#msg').val('');
					});;
				}
			$("#addActionBtn").click(function(){ 
				$("#tableAddAction").removeClass('hideBlock');
			});
			$("#closeLink").click(function(){ 
				$("#tableAddAction").addClass('hideBlock');
			});
			$("#cancelLink").click(function(e) {
				

				 $( "#dialog-cancelOrder" ).dialog( "open" );				


				 
				 $("#confirmYES").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );
					 window.location.href= "../order/backToOrderDetails.htm";
					 /* 
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
								else if(response=="false"){
									$('#alertBox').text("Request for cancelling the Order  failed");
									$( "#dialog-modal1" ).dialog( "open" );
									$('#okBtn').click(function(e){
										$( "#dialog-modal1" ).dialog( "close" );
										$('#msg').val('');
										});;
										
									}
										
							},
							
						}); */
					
				 });

				 $("#confirmNO").click(function(e) {
					 $( "#dialog-cancelOrder" ).dialog( "close" );				
				 });  
				  
				 
				 //window.history.back();
			  }); 
			 
			$("#back").click(function(e) {
				if(changesMadeIndicator==1 || ($.trim($('#tempFromService').val()).length > 0 && $.trim($('#temperature').val()).length > 0)){
					$('.popMessagetemp').text('Do you want to discard the changes?');
					$( "#dialog-temperature" ).dialog( "open" );


					$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog( "close" );');
					$('.confirmYesTemp').attr('onclick','goBack();');
					}else{
						goBack();
				/* if($('#hideContent').val()=='false'){
					window.location.href= "../order/backToOrderDetails.htm";
					}
					else if($('#hideContent').val()=='true'){
						window.location.href= "../order/backToOrderSearch.htm";
						} */// window.history.back();		// window.history.back();'
					}
				
				  });
			
			$("#bcOrdSrch").click(function(e) {

							
							
							  });
			//for ibt receipt
			
			$("#bcHome").click(function(e) {
				
							
							  });
			//for ibt receipt
			$("#bcOrdDet").click(function(e) {
						
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
		
			
			/*when edit button is clicked displays input box in editable cells*/
			$(".editBtn").click(function(){
				changesMadeIndicator=1;
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
				changesMadeIndicator=1;
				var id = (this.id).split('-')[1];
				var qty=$(("#packOMTxt-").concat(id)).val();


				if(isNaN(qty)){
				$('#alertBox').text('Please enter a valid quantity');
				$(("#packOMTxt-").concat(id)).val();
				$(("#packOMTxt-").concat(id)).focus();
				$( "#dialog-modal1" ).dialog( "open" );
				$('#okBtn').click(function(e){
					$( "#dialog-modal1" ).dialog( "close" );
					});
				}
				else{
				
				$(("#row-").concat(id)).removeClass('rowHighlight');
				$(("#receivedEdit-").concat(id)).addClass('hideBlock');
				$(("#received-").concat(id)).removeClass('hideBlock');
				
				$(("#packOMEdit-").concat(id)).addClass('hideBlock');
				$(("#packOM-").concat(id)).removeClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).removeClass('hideBlock');
				var recQty=$(("#receivedTxt-").concat(id)).val();
					

				if(recQty!=null &&  $.trim(recQty).length != 0)
				$(("#received-").concat(id)).text($('#receivedTxt-'+id+' option[value='+recQty+']').text());
				var packOm=$(("#packOMTxt-").concat(id)).val();
				
				/* if($(("#receivedTxt-").concat(id)).val()=="+ Stock Correction")
					recQty="252";
				else
					recQty="251"; */

				if(packOm!=null &&  $.trim(packOm).length != 0)
				$(("#packOM-").concat(id)).text(packOm);
				var index=id;
				//var receiveQty=$(("#receivedEdit-").concat(id)).val();
				
				
				$.ajax({
					type : "GET",
					url : "confirmAdjustedQty.htm",
					
					data : "index=" + index + "&mvmType=" + recQty + "&adjVal=" + packOm,
					success : function(response) {
									
					},
				});}
				
			});
			$( ".deleteOneRecord" ).click(function(){
				
				var index=(this.id).split('-')[1];
				$("#index").val(index);
				$("#receiveForm").attr('action','deleteArticle.htm');
				$("#receiveForm").attr('method','GET');
				$("#receiveForm").submit();
				
			});
				
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			$(".thumbUp").click(function(){
				
				if($("#row-1").text()=="")
					{
					$('#statusImg').removeClass('loading hideBlock');
					$('#statusImg').addClass('loading');
					$( "#dialog-modal1" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal1" ).dialog( "close" );
							});
					//var msg=confirm('');
					}
				else{
					
					
					if($.trim($('#tempFromService').val()).length > 0 && $.trim($('#temperature').val()).length < 1){
						$('#alertBox').text('Please enter the temperature');
						$( "#dialog-modal1" ).dialog( "open" );
						$('#okBtn').click(function(e){
							$( "#dialog-modal1" ).dialog( "close" );
							
							});;
						
					}else{
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						$( "#flag" ).val('Finalize');
						$("#receiveForm").attr('action','goodsReceive.htm');
						$("#receiveForm").attr('method','GET');
						
						$("#receiveForm").submit();
						}
				
				}
				
			});
			
			
			
			
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
		$( "#dialog-modal1" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 120,
			maxHeight: 600,
			width: 350
		});
		$("#dialog-modal1").parent().addClass("popupWrapper");
		$("#dialog-temperature").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 120,
			maxHeight : 600,
			width : 350
		});
		$("#dialog-temperature").parent().addClass("popupWrapper");
		function goBack(){
			  if($('#hideContent').val()=='false'){
					window.location.href= "../order/backToOrderDetails.htm";
					}
					else if($('#hideContent').val()=='true'){
						window.location.href= "../order/backToOrderSearch.htm";
						}
			  }


		function bcOrdDet(){


							if(changesMadeIndicator==1 || ($.trim($('#tempFromService').val()).length > 0 && $.trim($('#temperature').val()).length > 0)){
								$('.popMessagetemp').text('Do you want to discard the changes?');
								$('#dialog-temperature').attr('title','Receive IBT');
								$( "#dialog-temperature" ).dialog( "open" );


								$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog( "close" );');
								$('.confirmYesTemp').attr('onclick','goBackOrdDet();');
								}else{
									goBackOrdDet();
							
								}
						  }

		function bcHome(){


						if(changesMadeIndicator==1 || ($.trim($('#tempFromService').val()).length > 0 && $.trim($('#temperature').val()).length > 0)){
							$('.popMessagetemp').text('Do you want to discard the changes?');
							$('#dialog-temperature').attr('title','Receive IBT');
							$( "#dialog-temperature" ).dialog( "open" );


							$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog( "close" );');
							$('.confirmYesTemp').attr('onclick','goBackHome();');
							}else{
								goBackHome();
						/* if($('#hideContent').val()=='false'){
							window.location.href= "../order/backToOrderDetails.htm";
							}
							else if($('#hideContent').val()=='true'){
								window.location.href= "../order/backToOrderSearch.htm";
								} */// window.history.back();		// window.history.back();'
							}
						}

		function bcOrdSrch(){
						if(changesMadeIndicator==1 || ($.trim($('#tempFromService').val()).length > 0 && $.trim($('#temperature').val()).length > 0)){
							$('.popMessagetemp').text('Do you want to discard the changes?');
							$('#dialog-temperature').attr('title','Receive IBT');
							$( "#dialog-temperature" ).dialog( "open" );


							$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog( "close" );');
							$('.confirmYesTemp').attr('onclick','goBackOrdSrch();');
							}else{
								goBackOrdSrch();
						/* if($('#hideContent').val()=='false'){
							window.location.href= "../order/backToOrderDetails.htm";
							}
							else if($('#hideContent').val()=='true'){
								window.location.href= "../order/backToOrderSearch.htm";
								} */// window.history.back();		// window.history.back();'
							}
						}
		function goBackHome(){
			   
			window.location.href="../login/goingHome.htm";
  }
function goBackOrdSrch(){
   
window.location.href="../order/backToOrderSearch.htm";
}
function goBackOrdDet(){
   
window.location.href="../order/backToOrderDetails.htm";
}


//Back Fn

 function canBack()
 {
	 if(changesMadeIndicator==1 || ($.trim($('#tempFromService').val()).length > 0 && $.trim($('#temperature').val()).length > 0)){
			$('.popMessagetemp').text('Do you want to discard the changes?');
			$('#dialog-temperature').attr('title','Receive IBT');
			$( "#dialog-temperature" ).dialog( "open" );


			$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog( "close" );');
			$('.confirmYesTemp').attr('onclick','goBackOrdDet();');
			}else{
				goBackOrdDet();
		
			}
	 }
	</script>
	<script type="text/javascript">
/* Autocomplete Off */
 
$(document).ready(function(){
	document.forms[0].autocomplete="off";
 });

</script>
</body>
</html>
