<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<title>Invoice Reconciliation Report</title>
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
<script type="text/javascript" src="../../scripts/print.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>

</head>
<body>
	<input type="hidden" id="listCount" name="listCount"
		value="${model.param.recordCount}" />
	<input type="hidden" id="pageNumber" name="pageNumber"
		value="${model.param.pageNumber}" />
	<input type="hidden" id="invoiceHidden" name="invoiceHidden"
		value="${model.param.invFlag}" />
	<input type="hidden" id="rangedHidden" name="rangedHidden"
		value="${model.param.adjFlag}" />
	<input type="hidden" id="deptHidden" name="deptHidden"
		value="${model.param.dept}" />
	<input type="hidden" id="index" name="index" value="" />
	<input type="hidden" id="reconFlag" name="reconFlag" value="" />
	<input type="hidden" id="errorLength" name="errorLength"
		value="${noData}" />

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>


			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>
						<li class="currentPage">Invoice Reconciliation Report</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->

		</div>
		<!-- End of head wrapper -->


		<form name="reconcileReport" id="reconcileReport"
			action="generateReconcilReport.htm" method="GET">


			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3>Generate Invoice Reconciliation Report</h3>
						<div>
							<div class="formWrapper">

								<div class="parameter">
									<label for="department">Department</label> <select
										class="selectOptions DGMSDepartmentOptions" id="department"
										name="department">
										<option value="">All</option>
										<c:forEach items="${model.deptInfoList}" var="deptInfo">
											<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
										</c:forEach>
									</select>
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label for="store">GRN Date</label> <input type="#"
										class="textbox defaultTextbox inputDate" name="fromDateGrn"
										id="fromDate" value="${model.param.fromDateGrn}"
										maxlength="10" placeholder="dd/mm/yyyy"> to <input
										type="#" class="textbox defaultTextbox inputDate"
										name="toDateGrn" id="toDate" value="${model.param.toDateGrn}"
										maxlength="10" placeholder="dd/mm/yyyy">
								</div>
								<!-- End of parameter -->

								<div class="parameter clearfix">
									<label>Order #</label> <input type="#" class="textbox"
										placeholder="Enter Order no." value="${model.param.orderNo}"
										name="orderNo" id="orderNo" maxlength="20">
								</div>
								<!-- End of parameter -->
								<div class="parameter"></div>
								<!-- End of parameter -->

								<div class="parameter clearfix">
									<label for="transactionType">Discrepancy</label> <input
										type="#" class="textbox" placeholder="Enter Amount excl GST"
										value="${model.param.discrpAmt}" name="discrpAmt"
										id="discrpAmt" onkeypress="return isNumberKeyTemp(event)"
										maxlength="20">
								</div>
								<!-- End of parameter -->

								<div class="parameter">
									<label>Receipt with</label> <span> <input
										type="checkbox" name="invoice" value="invoice" id="invoice"><label
										for="invoice" class="labelText paramCheckBox">No
											Invoice</label> <input type="checkbox" name="adjust"
										value="adjustment" id="ranged"><label for="ranged"
										class="labelText">Adjustment</label> <span>
								</div>
								<!-- End of parameter -->



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
					<div class="ContentTableWrapper">
						<div class="addTableInfo">

							<div class="tableTitle nodataMessage" id="errorMsgDiv">
								<h4 id="msg">${noData}</h4>
							</div>
							<!-- End of table title -->


						</div>
					</div>


					<!-- For displaying report results -->
					<div class="ContentTableWrapper searchResults">
						<c:if test="${not empty reconcileList}">
							<div class="tableInfo">

								<div class="tableTitle">
									<h4>
										Total <strong>${model.param.recordCount}</strong> Orders with
										Discrepancies
									</h4>
								</div>
								<!-- End of table title -->

								<div class="tableActionBtns">
									<label class="actionBtn" onclick="invoicePrint();"><label
										class="print">Print</label></label>
								</div>
								<!-- End of pagination Wrapper -->
							</div>
							<!-- End of table info -->
						</c:if>
						<c:if
							test="${not empty reconcileList && model.param.recordCount>20}">
							<div class="paginationWrapper" id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</c:if>
						<c:if test="${not empty reconcileList}">
							<table cellspacing="0"
								class="ContentTable treetable drilldownTable" id="treetable">
								<tr>
									<th rowspan="2">Order #</th>
									<th colspan="5" class="centerValue">Goods Receipts</th>
									<th colspan="4" class="centerValue">Invoice</th>
									<th rowspan="2" class="numberColumn lastColumn">Discrepancy
										excl-GST $</th>
								</tr>
								<tr class="subHeader ">
									<th>Date</th>
									<th>GRN Doc No.</th>
									<th>Type</th>

									<th>User ID</th>
									<th class="numberColumn">Amount</th>
									<th>Date</th>
									<th>INV Doc No.</th>
									<th>Tax</th>
									<th class="numberColumn">Amount</th>
								</tr>
								<%int i=0;%>
								<c:forEach items="${reconcileList}" var="reconcileInfo">
									<tr onclick="navigateToDetail(<%=i++%>);">
										<td>${reconcileInfo.purchaseOrder}</td>
										<td>${reconcileInfo.grPostingDate}</td>
										<td>${reconcileInfo.grNo}</td>
										<td>${reconcileInfo.grAdjType}</td>
										<td>${reconcileInfo.grUserId}</td>
										<td class="numberColumn">${reconcileInfo.grAmount}</td>
										<td>${reconcileInfo.invPostingDate}</td>
										<td>${reconcileInfo.invoiceNo}</td>
										<td>${reconcileInfo.invoiceTax}</td>
										<td class="numberColumn">${reconcileInfo.invoiceAmount}</td>
										<td class="lastColumn numberColumn">${reconcileInfo.discrpAmtExclGst}</td>
									</tr>

								</c:forEach>
							</table>
							<c:if
								test="${not empty reconcileList && model.param.recordCount>20}">
								<div class="paginationWrapper bottomPagination"
									id="paginationDiv2">
									<div class="pagination-holder clearfix">
										<div id="compact-pagination"
											class="compact-theme simple-pagination"></div>
									</div>
								</div>
							</c:if>

						</c:if>
					</div>
					<!-- End of Content Table Wrapper-->


				</div>
				<!-- End of article Additional Info -->


			</div>
			<!-- End of content wrapper -->
		</form>
		<input id="navBarHighlight" type="hidden" value="reports" />



		<div id="dialog-cancelOrder" title="Invoice">


			<div class="popupContent">

				<div class="popupData">
					<h4 class="alertText">Discrepancy amount will be defaulted
						before submit</h4>

					<div class="popupActionsWrapper">
						<span class="popupActions"> <label class="actionBtn"
							id="confirmYES">Ok</label> <label class="secondaryActionBtn"
							id="confirmNO"
							onclick="$('#dialog-cancelOrder').dialog('close');">Cancel</label>
						</span>
					</div>
					<!-- End of popup actions-->
				</div>
				<!-- End of pop up data -->
			</div>

			<!-- End of popupContent -->
		</div>
	</div>
	<%@include file="footer.jsp"%>


	<!--  Print Data -->

	<div id="printData" style="display: none">
		<div id="printbody">
			<link rel="stylesheet" href="../../styles/printstyle.css?version=${properties.version}" />

			<div class="width100" style="">

				<div style="" class="width70 reportName bold inline-block">Invoice
					Reconciliation Report</div>
				<div style="width: 25%" class="width25  right">
					<div class="  margin5 text-align-right ">${user.siteNo} |
						${user.siteName}</div>
				</div>
				<div class="width70 margontopnone inline-block">
					<label class="">Created on: </label><label class="currentDate"></label>
				</div>
			</div>
			<div class="width100 border">
				<div class="width70 margin5 bold ">Report for:</div>
				<div class="margin5 margontopnone">
					<label class="">Department: </label><label
						class="trading printDept" id=""></label><label
						class="separator ordHide">|</label><label class="ordHide">Order
						Number: </label><label class="transaction printOrdNo ordHide" id="">${model.param.orderNo}</label><label
						class="separator">|</label><label class="">Discrepancy: </label><label
						class="reason printDiscrepancy" id="">${model.param.discrpAmt}</label><label
						class="separator receiptHide">|</label><label class="receiptHide">Receipt
						With: </label><label class="emp receiptHide receipt">${model.param.receiptsWithText}</label><label
						class="separator">|</label><label class="">GRN From Date:
					</label><label class="">${model.param.fromDateGrn}</label><label
						class="separator">|</label><label class="">GRN To Date: </label><label
						class="">${model.param.toDateGrn}</label>
				</div>
			</div>

			<c:if test="${not empty reconcilePrintList}">
				<% int recCount=1,pageNo=0;%>
				<table cellspacing="0" cellpadding="1" id=""
					class="printtableinv stext-align-left font11  width100" border="1">

					<tr class="height30 bold border-bottom">
						<th rowspan="1" class="border-bottom">Order #</th>
						<th colspan="5" class="centerValue border-bottom-main">Goods
							Receipts</th>
						<th colspan="4" class="centerValue border-bottom-main">Invoice</th>
						<th rowspan="1"
							class="numberColumn border-bottom text-align-right lastColumn">Discrepancy
							excl-GST $</th>
					</tr>
					<tr class="height30 bold subHeader border-bottom">
						<th>&nbsp;</th>
						<th>Date</th>
						<th>GRN Doc No.</th>
						<th>Type</th>
						<th>User ID</th>
						<th class="numberColumn  text-align-right">Amount</th>
						<th>Date</th>
						<th>INV Doc No.</th>
						<th>Tax</th>
						<th class="numberColumn  text-align-right">Amount</th>
						<th>&nbsp;</th>
					</tr>

					<c:forEach items="${reconcilePrintList}" var="reconcilePrintList">
						<%if(recCount%17!=0) {%>
						<tr class="normal invrow">
							<td>${reconcilePrintList.purchaseOrder}</td>
							<td>${reconcilePrintList.grPostingDate}</td>
							<td>${reconcilePrintList.grNo}</td>
							<td>${reconcilePrintList.grAdjType}</td>
							<td>${reconcilePrintList.grUserId}</td>
							<td class=" text-align-right numberColumn">${reconcilePrintList.grAmount}</td>
							<td>${reconcilePrintList.invPostingDate}</td>
							<td>${reconcilePrintList.invoiceNo}</td>
							<td>${reconcilePrintList.invoiceTax}</td>
							<td class=" text-align-right numberColumn">${reconcilePrintList.invoiceAmount}</td>
							<td class="lastColumn  text-align-right numberColumn">${reconcilePrintList.discrpAmtExclGst}</td>
						</tr>
						<%}else{pageNo++; %>
						<tr style="height: 30px !important" class="">
							<td style="padding: 0px;" colspan="6"><label
								class="margin5 bold">Printed on: </label><label
								class="currentDate"></label> <label class="separator">|</label>
								<label class="currentTime"></label></td>
							<td style="padding: 0px" colspan="5"><div
									class=" lineheight15 margin5 text-align-right ">
									Page <label class="pageno"><%=pageNo%></label> of <label
										class="totalpage"></label>
								</div></td>
						</tr>
				</table>
				<table cellspacing="0" cellpadding="1" id="printtableinv"
					class="printtableinv text-align-left font11  width100" border=""
					style="page-break-before: always; width: 100%">
					<tr>
						<td style="padding: 0px;" colspan="11">
							<div id="contentDiv" class="width100" style="">

								<div class="width70 reportName bold inline-block">Invoice
									Reconciliation Report</div>
								<div style="width: 25%" class="width25  right">
									<div class="  margin5 text-align-right ">${user.siteNo} |
										${user.siteName}</div>
								</div>
								<div class="width70  margontopnone inline-block">
									<label class="">Created on: </label><label class="currentDate"></label>
								</div>
							</div>
							<div class="width100  border">
								<div class="width70 margin5 bold ">Report for:</div>
								<div class="margin5 margontopnone">
									<label class="">Department: </label><label
										class="trading printDept" id=""></label><label
										class="separator ordHide">|</label><label class="ordHide">Order
										Number: </label><label class="printOrdNo ordHide" id="">${model.param.orderNo}</label><label
										class="separator">|</label><label class="">Discrepancy:
									</label><label class="reason printDiscrepancy" id="">${model.param.discrpAmt}</label><label
										class="separator receiptHide">|</label><label
										class="receiptHide">Receipt With: </label><label
										class="receipt receiptHide">${model.param.receiptsWithText}</label><label
										class="separator">|</label><label class="">GRN From
										Date: </label><label class="">${model.param.fromDateGrn}</label><label
										class="separator">|</label><label class="">GRN To
										Date: </label><label class="">${model.param.toDateGrn}</label>
								</div>
							</div>

						</td>
					</tr>

					<tr class="height30 bold border-bottom">
						<th rowspan="1" class="border-bottom">Order #</th>
						<th colspan="5" class="centerValue border-bottom-main">Goods
							Receipts</th>
						<th colspan="4" class="centerValue border-bottom-main">Invoice</th>
						<th rowspan="1"
							class="numberColumn border-bottom text-align-right lastColumn">Discrepancy
							excl-GST $</th>
					</tr>
					<tr class="height30 bold subHeader border-bottom">
						<th>&nbsp;</th>
						<th>Date</th>
						<th>GRN Doc No.</th>
						<th>Type</th>
						<th>User ID</th>
						<th class="numberColumn  text-align-right">Amount</th>
						<th>Date</th>
						<th>INV Doc No.</th>
						<th>Tax</th>
						<th class="numberColumn  text-align-right">Amount</th>
						<th>&nbsp;</th>
					</tr>
					<tr class="normal invrow">
						<td>${reconcilePrintList.purchaseOrder}</td>
						<td>${reconcilePrintList.grPostingDate}</td>
						<td>${reconcilePrintList.grNo}</td>
						<td>${reconcilePrintList.grAdjType}</td>
						<td>${reconcilePrintList.grUserId}</td>
						<td class=" text-align-right numberColumn">${reconcilePrintList.grAmount}</td>
						<td>${reconcilePrintList.invPostingDate}</td>
						<td>${reconcilePrintList.invoiceNo}</td>
						<td>${reconcilePrintList.invoiceTax}</td>
						<td class=" text-align-right numberColumn">${reconcilePrintList.invoiceAmount}</td>
						<td class="lastColumn  text-align-right numberColumn">${reconcilePrintList.discrpAmtExclGst}</td>
					</tr>
					<%recCount++;}recCount++; %>
					</c:forEach>

				</table>
			</c:if>

			<!-- <p class="text-align-center  bold">
					<b>End of Report</b>
				</p> -->
			<div style="margin-top: 0px" id="foot" class="width98">
				<div class="width35  left inline-block">
					<label class="bold">Printed on: </label><label class="currentDate"></label>
					<label class="separator">|</label> <label class="currentTime"></label>
				</div>
				<div class="inline-block  hideBlock endOfReport">
					<div>
						<strong>End of Report</strong>
					</div>
				</div>
				<div class="width35  inline-block right">
					<div class=" lineheight15 margin5 text-align-right ">
						Page <label class="totalpagee"></label> of <label
							class="totalpage"></label>
					</div>
				</div>
			</div>
		</div>
	</div>




	<script>
	$(document)
	.ready(
			function() {
				//document.forms[0].autocomplete="off";
				if($('#errorLength').val().length>0)
					$('.addTableInfo').addClass('tableInfo');
				if($('#invoiceHidden').val()=="On")
					$('#invoice').click();
					if($('#rangedHidden').val()=="On")
					$('#ranged').click();
					var deptVal=$('#deptHidden').val();
					$('select option[value='+deptVal+']').prop('selected',true);

					$( "#printDept").text($('select option[value='+deptVal+']').text());
			});
		$(function() {
			//Code for accordion
			$("#accordion").accordion({
				header:"h3",
				collapsible: true, 		
				heightStyle: "content" 
			});
			$("#dialog-cancelOrder").dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				minHeight : 120,
				maxHeight : 600,
				width : 350
			});
			
			// Code for profile menu
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			//Code for input box default text handling
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
			
			//Code for calndar control
			$(".inputDate").datepicker({
				zIndex:50
			});
			
			/* Code to 
				- Close accordion when report is generated
				- Show results
				
				Need to write a code by developer to handle a case when there is no data. The accordion in this case should remain open */


			var recordCount= $('#listCount').val();
	          var currentPage=$('#pageNumber').val();

			 $('#paginationDiv1').pagination({
				items: recordCount,
				itemsOnPage: 20,
				cssStyle: 'compact-theme',
				currentPage:currentPage,
				onPageClick: function(pageNumber){
				    getArticlesForPage(pageNumber);

				}

			});

			 $('#paginationDiv2').pagination({
					items: recordCount,
					itemsOnPage: 20,
					cssStyle: 'compact-theme',
					currentPage:currentPage,
					onPageClick: function(pageNumber){
					    getArticlesForPage(pageNumber);

					    
					}

						
				});
				
			 if($('#listCount').val()>0)
					$('.ui-accordion-header').click();	
						
	$('#ranged').click(function(){
	if($('#ranged').is(':checked'))
	$('#rangedHidden').val('On');
	else
	$('#rangedHidden').val('Off');
	});
	
	$('#invoice').click(function(){
	if($('#invoice').is(':checked'))
	$('#invoiceHidden').val('On');
	else
	$('#invoiceHidden').val('Off');
	});
	
			$("#generateReport").click(function(){
				$('#noData').text('');
				$('#msg').text('');
				$('.searchResults').hide();
				$(".ContentTableWrapper").removeClass('hideBlock'); 
				
				//var fromDate=formateDate($('#fromDate').val());
				//var toDate=formateDate($('#toDate').val());
				validateReconcilation();
			});


			$("#confirmYES").click(function(){
				$('#orderNo').val('');
				$('#discrpAmt').val('');

				$('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');

				
				$('#reconcileReport').submit();
				});

			
			$("#tabs").tabs();

			$("#backBtn").click(function(e) {
				window.location.href="../login/goingHome.htm";
			});

			$("#closeLink").click(function(e) {
				$('#accordion').accordion({active : true });	
			});
			
		});

		function getArticlesForPage(pageNumber){
			
			$('#statusImg').removeClass('loading hideBlock');
			$('#statusImg').addClass('loading');
			
			$('#pageNumber').val(pageNumber);	
			$('#reconcileReport').attr('action','requestSearchForPaginationRecon.htm');

			
			
			$('#reconcileReport').submit();
		}
		
		//onkeypress="return isNumberKey(event)"
		function isNumberKey(evt)
					    {
					       var charCode = (evt.which) ? evt.which : event.keyCode;
					       if (charCode > 31 && (charCode< 48 || charCode >57))
					          return false;

					       return true;
					    }

		function isNumberKeyTemp(evt)
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
	    

		$(document).keypress(function(event) {
		    if (event.which == 13) {
		        event.preventDefault();
		        $('#noData').text('');
				$('#msg').text('');
				$('.searchResults').hide();
				$(".ContentTableWrapper").removeClass('hideBlock'); 
				validateReconcilation();
		    }
	 });

		function formateDate(v,l){
			if(v.length==8 && l==3)
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
		function navigateToDetail(index){

			$('#index').val(index);	
			$('#reconFlag').val('true');

			$('#statusImg').removeClass('loading hideBlock');
			$('#statusImg').addClass('loading');
			
			$('#reconcileReport').attr('action','requestOrderDetail.htm');
			$('#reconcileReport').attr('method','POST');
			$('#reconcileReport').submit();
		  
			
			
		}
function validateReconcilation()
{
	
	var fromDate=formateDate($('#fromDate').val(),$('#fromDate').val().split('/').length);
	var toDate=formateDate($('#toDate').val(),$('#toDate').val().split('/').length);
	var crntDate = new Date();

	var date = new Date();
	var partsOne = fromDate.split('/');
	date.setFullYear(partsOne[2], partsOne[1]-1, partsOne[0]); 
	date.setTime(date.getTime());

	var splittedOne = partsOne[0] + partsOne[1] + partsOne[2];

	var date1 = new Date();
	var partsTwo = toDate.split('/');
	var splittedTwo = partsTwo[0]
	+ partsTwo[1] + partsTwo[2];
	date1.setFullYear(partsTwo[2], partsTwo[1]-1, partsTwo[0]); 
	date1.setTime(date1.getTime());


	if($('#orderNo').val()=="" && $('#fromDate').val()=="" && $('#toDate').val()==""){
		$('#msg').text('Please enter details to generate a report');
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');
		$("#errorMsgDiv").parent().addClass('tableInfo');
	}
	else if($('#orderNo').val()!="")
	{
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');
		$('#invoice,#ranged').prop('checked',false);
		$('#discrpAmt').val('');
		$('#fromDate,#toDate').val('');
		$('#rangedHidden,#invoiceHidden').val('Off');
		$('#department options[value="Select"]').prop('selected',true);
		$('#statusImg').removeClass('loading hideBlock');
		$('#statusImg').addClass('loading');
		$('#reconcileReport').submit();
	}
	else if($('#orderNo').val()=="" && $('#fromDate').val()=="" && $('#toDate').val()!="")
	{
		$('#msg').text('Please enter GRN from date');
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');
		$("#errorMsgDiv").parent().addClass('tableInfo');
	} 
	else if($('#orderNo').val()=="" && $('#fromDate').val()!="" && $('#toDate').val()=="")
	{
		$('#msg').text('Please enter GRN to date');
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');
		$("#errorMsgDiv").parent().addClass('tableInfo');
	} 
/*	else if($('#orderNo').val()=="" && $('#fromDate').val()!="")
	{*/
	else if($('#fromDate').val()!="" && !(splittedOne.length == 8 || splittedOne.length == 6 || partsOne.length==3)) 
		{
			$("#msg").html('Please enter valid GRN from date');
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
			$("#errorMsgDiv").parent().addClass('tableInfo');
		} 
		else if ($('#fromDate').val()!="" && partsOne != "" &&  (partsOne[0] > 31 || partsOne[1] > 12 || partsOne[2] > 9999) || isNaN(splittedOne)) {
			$("#msg").html('Please enter valid GRN from date');
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
			$("#errorMsgDiv").parent().addClass('tableInfo');
		}
		
	//}
	/*else if($('#orderNo').val()=="" && $('#toDate').val()!="")
	{*/
	else if ($('#toDate').val()!="" &&  partsTwo != "" &&  !(partsTwo.length==3 || splittedTwo.length == 8 || splittedTwo.length == 6)) {
			$("#msg").html('Please enter valid GRN to date');
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
			$("#errorMsgDiv").parent().addClass('tableInfo');
		} 
		else if ($('#toDate').val()!="" && partsTwo != "" &&  (partsTwo[0] > 31	|| partsTwo[1] > 12 || partsTwo[2] > 9999)	|| isNaN(splittedTwo)) 
		{
			$("#msg").html('Please enter valid GRN to date');
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
			$("#errorMsgDiv").parent().addClass('tableInfo');
		}
	//}
	/*else if($('#orderNo').val()=="" && $('#fromDate').val()!="" && $('#toDate').val()!="")
	{*/
	else if($('#fromDate').val()!="" && $('#toDate').val()!="" && (date1.getTime() - date.getTime()) < 0)
		{
			$('#msg').text('GRN to date should not be lesser than the from date');
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
			$("#errorMsgDiv").parent().addClass('tableInfo');
		//error msg GSt from & to date greater than one year range
		}
		else if($('#fromDate').val()!="" && $('#toDate').val()!="" && date.getTime() < (crntDate.getTime()-(86400000*365*2)))
		{
		$('#msg').text('GRN from date should not be before two years from now');
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');
		$("#errorMsgDiv").parent().addClass('tableInfo');
		}
		else if($('#fromDate').val()!="" && $('#toDate').val()!="" && date.getTime() > (crntDate.getTime())){
			$("#msg")
			.html(
					"GRN to date cannot be greater than Today");
		$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
		$("#errorMsgDiv").addClass('tableTitle errorDiv');
		$("#errorMsgDiv").parent().addClass('tableInfo');
			}
		else if($('#fromDate').val()!="" && $('#toDate').val()!="" && date1.getTime() > (crntDate.getTime()))
		{
		//error msg GSt to date greater than current date
			$('#msg').text('GRN to date cannot be greater than Today');
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
			$("#errorMsgDiv").parent().addClass('tableInfo');
		}
		else if($('#fromDate').val()!="" && $('#toDate').val()!="" && (date1.getTime() - date.getTime()) > (86400000*365))
		{
			$('#msg').text('GRN from & to date range should not be greater than twelve months');
			$("#errorMsgDiv").parent().addClass('tableInfo');
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
		//error msg GSt from & to date greater than one year range
		}
	//}
	else if($('#orderNo').val()!="" && isNaN($('#orderNo').val()))
		{
			$('#msg').text('Please enter valid order number');
			$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
			$("#errorMsgDiv").addClass('tableTitle errorDiv');
			$("#errorMsgDiv").parent().addClass('tableInfo');
			//order val not a number
		}
	else  if($('#ranged').is(':checked') && (($('#orderNo').val()=="" ) || ($('#discrpAmt').val()!="")))
	{
		$("#dialog-cancelOrder").parent().addClass("popupWrapper");
		$("#dialog-cancelOrder").dialog("open");
	}
	/* else  if($('#invoice').is(':checked') && (($('#orderNo').val()=="" ) || ($('#discrpAmt').val()!="")))
	{
		$("#confirmYES").click();
	} */
	else
	{
		$('#statusImg').removeClass('loading hideBlock');
		$('#statusImg').addClass('loading');
		$('#reconcileReport').submit();
		//$('#accordion').accordion({active : true });
	}
}
		
	</script>

</body>
</html>
