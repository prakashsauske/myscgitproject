<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<title>Stock Adjustment</title>



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
<script type="text/javascript"
	src="../../scripts/jquery.simplePagination.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/stockAdjust.js?version=${properties.version}"></script>


</head>
<body onload="loadSOH()">
	<input id="navBarHighlight" type="hidden" value="stockManage" />
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href="../login/goingHome.htm">Home</a></li>

						<c:if test="${model.indicatorFromHome!='true'}">
							<li onclick="cancelCallForLookup();"><a href="#">Lookup
									Articles</a></li>
						</c:if>
						<c:set var="prevPage" value="Article Details" />
						<c:if test="${model.indicatorFromHome=='true'}">
							<c:set var="prevPage" value="Stock Search" />
						</c:if>
						<c:set var="prevPageLink" value="'goToArticleDetail.htm'" />
						<c:if test="${model.indicatorFromHome=='true'}">
							<c:set var="prevPageLink" value="'goTosohFromHome.htm'" />
						</c:if>
						<li onclick="cancelCall();"><a href='#'>${prevPage}</a></li>
						<li class="currentPage">Stock Adjustment</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper" onclick="cancelCall();">
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

			<div class="articleHead">
				<div class="articleHeaderWrapper">
					<h2 class="articleTitle">${model.stockAdjustModel.articleNo} -
						${model.stockAdjustModel.articleName}</h2>
					<p>
						<label class="articlePriceLabel">Stock On Hand: <strong><span
								id="uom-value">${model.stockAdjustModel.uomValue}</span> <span
								id="uom-txt">${model.stockAdjustModel.uom}</span></strong></label> <label
							class="articlePriceLabel">|</label> <strong><span
							id="car"></span></strong><label class="articlePriceLabel">Order
							Multiple: <strong><span id="carton">${model.stockAdjustModel.carton}</span></strong>
						</label>
					</p>
				</div>
				<div class="articleActionBtns" onclick="sohHistoryFetch();">
					<button type="button" class="actionBtn" id="articleHistory">
						<label class="notepad">History</label>
					</button>
				</div>
			</div>


			<div class="articleContent orderDetails">


				<div class="articleContentInner">

					<div class="articleDetails">
						<div class="tableActionsWrapper">
							<form method="POST" action="postSOHAdjustment.htm" id="sohSubmit">
								<div class="formWrapper">

									<div class="parameter">
										<label class="mandatory" for="store">Reason:</label> <select
											id="selectReason" name="selectReason" class="selectOptions">
											<option value="default" reason-code="">Select Stock
												Adjust Reason code</option>
											<!-- 	
											<option value="damaged" reason-code="06">Damaged</option>
											<option value="missing" reason-code="06">Missing</option>
											<option value="plus-stock" reason-code="07">+Stock
												Correction</option>
											<option value="minus-stock" reason-code="06">-Stock
												Correction</option>
												 -->
											<c:forEach items="${model.mvmtTypeList}" var="mvmtTypeInfo">
												<option value="${mvmtTypeInfo.mvmtType}"
													indicator="${mvmtTypeInfo.indicator}">${mvmtTypeInfo.mvmtTypeDesc}</option>
											</c:forEach>
										</select>

									</div>
									<!-- End of parameter -->

									<div class="parameter">
										<label class="mandatory" for="salesOrg">New SOH:</label> <input
											onchange="adjustedSOH();" onclick="adjustedSOH();"
											maxlength="10" tabindex="0"
											onkeypress="return isNumberKeySOH(event)" type="text"
											class="textbox numberBox" id="new-soh" name="new-soh">
									</div>
									<!-- End of parameter -->

									<div class="parameter">
										<label class="mandatory" for="salesOrg">Adjustment:</label><span
											id="signIndicator"></span> <input onchange="adjustedSOH();"
											onclick="adjustedSOH();" maxlength="10" tabindex="0"
											onkeypress="return isNumberKeyADJ(event)" type="text"
											class="textbox numberBox" id="adjust" name="adjust">
									</div>
									<!-- End of parameter -->


									<div class="formActions">
										<button type="button" class="actionBtn" id="saveSOH"
											tabindex="0" onclick="submitNewSOh();">Save</button>
										<button type="button" class="secondaryActionBtn"
											id="cancelSOH" tabindex="0" onclick="cancelCall();">Cancel</button>
									</div>
									<!-- End of form actions -->

								</div>
								<!-- End of content table wrapper -->
								<c:set var="prevPage" value="'goToArticleDetail.htm'" />
								<c:if test="${model.indicatorFromHome=='true'}">
									<c:set var="prevPage" value="'goTosohFromHome.htm'" />
								</c:if>
								<input type="hidden" value="${prevPageLink}" id="prevPageLink" />
								<input type="hidden" name="uomVal" id="uomVal"
									value="${model.stockAdjustModel.uom}" /> <input type="hidden"
									name="siteNo" id="siteNo" value="${model.param.siteNo}" /> <input
									type="hidden" value="${prevPage}" id="prepage" /> <input
									type="hidden" value="" name="mvmtType" id="mvmtType" /> <input
									type="hidden" value="${model.stockAdjustModel.articleNo}"
									name="articleNumber" /> <input type="hidden"
									id="sohPostStatus" value="${model.sohPostStatus}"
									name="sohPostStatus" /> <input type="hidden" name="sohHistory"
									id="sohHistory" /><input type="hidden" name="artDesc"
									id="artDesc" value="${model.stockAdjustModel.articleName}" />
								<input type="hidden" name="noDataSoh" id="noDataSoh"
									value="${model.noDataSoh}" /> <input type="hidden"
									value="${model.reasonCodeDropRetain}" id="dropretainReasonCode" />
							</form>
						</div>
					</div>
					<!-- End of article details -->
				</div>
				<!-- End of article content inner -->


			</div>



			<div class="ContentTableWrapper">

				<div class="tableInfo">

					<div class="tableTitle nodataMessage" id="errorMsgDiv">
						<h4 id="msg">
							<c:if test="${not empty model.noDataSoh}"></c:if>
						</h4>

						<!-- End of table title -->



					</div>
				</div>
				<c:if test="${not empty model.sohAdjustLogList}">
					<table cellspacing="0" class="ContentTable noTableSort">
						<tr>
							<th>Adjustment Date</th>
							<th>Modified By</th>
							<th>Adjustment</th>
							<th>SOH</th>
							<th class="lastColumn ">Reason</th>
						</tr>
						<c:forEach items="${model.sohAdjustLogList}" var="history">
							<c:if test="${history.articleNo!=''}">

								<tr>

									<td>${history.adjustmentDate}<c:if
											test="${not empty history.adjustmentDate && not empty history.adjustmentTime}"> | </c:if>${history.adjustmentTime}
									</td>
									<td>${history.userId}<c:if
											test="${not empty history.userId && not empty history.userName}"> | </c:if>${history.userName}
									</td>
									<td><span
										class="<c:if test="${model.stockAdjustModel.uom=='KG'}">decimalPrecision</c:if>">${history.adjustmentQuantity}</span>
										<c:if test="${not empty history.adjustmentQuantity}">${history.uom}</c:if></td>
									<td><span
										class="<c:if test="${model.stockAdjustModel.uom=='KG'}">decimalPrecision</c:if>">${history.endSoh}</span>
										<c:if test="${not empty history.endSoh}">${history.uom}</c:if></td>
									<td class="lastColumn">${history.mvmtTypeDesc}</td>
								</tr>
							</c:if>
						</c:forEach>


					</table>
				</c:if>
			</div>



		</div>
		<!-- End of article content -->




		<!-- End of content wrapper -->





		<div id="dialog-cancelOrder" title="Submit Adjustment">
			<div class="popupContent">

				<div class="popupData">

					<h4 class="alertText">Are you sure you want to save the
						changes?</h4>
					<!-- Commented by Haresh
					<div class="ContentTableWrapper popMessage">

						<label>Are you sure you want to save the changes?</label>

					</div>
					 End of content table wrapper -->



					<div class="popupActionsWrapper">
						<span class="popupActions">
							<button type="button" class="actionBtn" forWhat="" tabindex="0"
								id="confirmYES" onclick="$('#sohSubmit').submit();">Yes</button>
							<button type="button" class="secondaryActionBtn" tabindex="0"
								forWhat="" id="confirmNO"
								onclick="$('#dialog-cancelOrder').dialog('close');">No</button>
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
		<div id="dialog-modal" title="Stock Adjustment">
			<div class="popupContent">

				<div class="popupData">


					<h4 class="alertText" id="msgText"></h4>




					<div class="popupActionsWrapper">
						<span class="popupActions">
							<button type="button" tabindex="0" class="actionBtn"
								id="dialog-modal-ok"
								onclick="$('#dialog-modal').dialog('close');$('#new-soh').focus();">OK</button>
						</span>
					</div>
					<!-- End of popup actions-->



				</div>
			</div>
			<!-- End of popupContent -->
		</div>
		<!-- End of popup -->
		<!-- SOH Adjustment success message -->
		<div id="dialog-modalSuccess" title="Stock Adjustment Successful">
			<div class="popupContent">

				<div class="popupData">

					<h4 class="alertText">Stock adjustment for Article
						${model.stockAdjustModel.articleNo} -
						${model.stockAdjustModel.articleName} was successful.</h4>

					<h4 class="alertText">
						<strong>New SOH value is <span id="updatedSohInPopup">${model.stockAdjustModel.uomValue}</span>.
						</strong>
					</h4>

				</div>
				<!-- End of pop up data -->
				<div class="popupData">

					<div class="popupActionsWrapper">
						<span class="popupActions">
							<button type="button" class="actionBtn" id="okSOH" tabindex="0">OK</button>
						</span>
					</div>
					<!-- End of popup actions-->

				</div>
			</div>
			<!-- End of popupContent -->
		</div>
		<!-- End of popup -->



		<div id="dialog-modal" title="Provide Invoice Information">
			<div class="popupContent">

				<div class="popupData"></div>
				<!-- End of pop up data -->


				<div class="popupActionsWrapper">
					<span class="popupInfo"> <label class="mandatory">mandatory</label>
					</span> <span class="popupActions">
						<button type="button" tabindex="0" class="actionBtn">Proceed</button>
						<button type="button" tabindex="0" class="secondaryActionBtn">Cancel</button>
					</span>
				</div>
				<!-- End of popup actions-->

			</div>
			<!-- End of popupContent -->
		</div>
	</div>
	<%@include file="footer.jsp"%>

</body>
</html>







<script>
	$(function() {
		document.forms[0].autocomplete="off";
		$( "#dialog-modalSuccess" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 120,
			maxHeight: 600,
			width: 350
		});
		$("#dialog-modalSuccess").parent().addClass("popupWrapper");
		
		$( "#okSOH" ).click(function() {							
			$( "#dialog-modalSuccess" ).dialog( "close" );				
		});
		
		
			
	
		
		$("#menu").menu({ position: { my: "right top", at: "right top+20" } });





		

		$("#dialog-modal").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 200,
			maxHeight : 600,
			width : 350
		});

		// code to open popup on Receive Order
		$("#receiveOrder").click(function() {
			alert("receive order clicked");

			$("#dialog-modal").dialog("open");
		});

		$('.textbox').focus(function() {
			if ($(this).val() == $(this).attr('defaultVal')) {
				$(this).val('');
				$(this).removeClass("textboxDefaultText");
			}
		});

		$('.textbox').blur(function() {
			if ($(this).val() == '') {
				$(this).val($(this).attr('defaultVal'));
				$(this).addClass("textboxDefaultText");
			}
		});

		$("#menu").menu({
			position : {
				my : "right top",
				at : "right top+20"
			}
		});

	});
	$("#treetable").treetable({
		expandable : true
	});
	/*  $(selector).pagination({
		items : 100,
		itemsOnPage : 10,
		cssStyle : 'compact-theme'
	}); */

	$("#dialog-cancelOrder").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});

	$("#dialog-modal").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
</script>


