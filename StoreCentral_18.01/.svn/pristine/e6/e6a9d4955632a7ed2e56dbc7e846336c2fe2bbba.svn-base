<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- Add to display list -->
<input type="hidden" value="${isbigw}" id="isBigw" />
<input type="hidden" value="${user.imgLocation}" id="currentBanner" />
<div id="dialog-listDisplay" title="Added to Display">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText" id="msgId">The article has been added the
				Display List.</h4>

			<h4 class="alertText">Please note that you need to Publish the
				list once you are finished with the entire list. Click 'View List'
				to navigate to the list.</h4>

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Ok
				</label> <label class="secondaryActionBtn" id="redirectDisplay">View
						List</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of popup -->

<!-- Add to Clearance list -->
<div id="dialog-listClearance" title="Added to Clearance">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText" id="msgId">The article has been added the
				Clearance List.</h4>

			<h4 class="alertText">Please note that you need to Publish the
				list once you are finished with the entire list. Click 'View List'
				to navigate to the list.</h4>

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Ok
				</label> <label class="secondaryActionBtn" id="redirectClearance">View
						List</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of popup -->

<!-- Add to Competition list -->
<div id="dialog-listCompetition" title="Added to Competition">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText" id="msgId">The article has been added the
				Competition List.</h4>

			<h4 class="alertText">Please note that you need to Publish the
				list once you are finished with the entire list. Click 'View List'
				to navigate to the list.</h4>

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Ok
				</label> <label class="secondaryActionBtn" id="redirectCompetition">View
						List</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of popup -->


<div id="dialog-confirmation"
	class="ui-dialog-content ui-widget-content">
	<div class="popupContent">

		<div class="popupData popupTitle">

			<h4 class="warning" id="message">
				Please note that In-store Promotions will be available in Promotions
				Planning screens after <strong>approximately 2 hours</strong>, once
				it is successfully created.
			</h4>

		</div>
		<!-- End of pop up data -->


		<div class="popupActionsWrapper">
			<span class="popupActions" id="ok"> <label class="actionBtn">Ok
			</label>

			</span><span class="popupActions" id="cancel"> <label
				class="secondaryActionBtn">Cancel </label>

			</span>
		</div>
		<!-- End of popup actions-->


	</div>
	<!-- End of popupContent -->
</div>

<!-- create Display -->
<div id="dialog-display" title="Create In-store Display Promotion">
	<div class="popupContent">

		<div class="popupData">

			<div class="formWrapper">

				<div class="parameter" id="instoreDispalyForm">

					<table width="100%" class="plainTable" data-map="obj"
						id="createDisplayPromo">
						<tr>
							<td><input type="hidden" data-item="articleNo" />
								<input type="hidden" data-item="articleUom" />
								<input type="hidden" data-item="om" />
								<input type="hidden" data-item="baseFrct" />
								<input type="hidden" data-item="wtd" />
								<label for="q1">Start
									Date</label></td>
							<td><input type="#" placeholder="dd/mm/yyyy"
								class="textbox defaultTextbox inputDate" id="d1"
								data-item="promoStartDate"></td>
						</tr>
						<tr>
							<td><label for="q2">End Date</label></td>
							<td><input type="#" placeholder="dd/mm/yyyy"
								class="textbox defaultTextbox inputDate" id="d2"
								data-item="promoEndDate"></td>
						</tr>
						<tr>
							<td><label for="q3">Delivery Date</label></td>
							<td><input type="#" placeholder="dd/mm/yyyy"
								class="textbox defaultTextbox inputDate" id="d3"
								data-item="deliveryDate"></td>
						</tr>
						<tr>
							<td><label for="q4">Store Demand</label></td>
							<td><input type="#" class="textbox numberBox" id="d4"
								data-item="demandQty"></td>
						</tr>
						<tr>
							<td><label for="q5">Store Display</label></td>
							<td><input type="#" class="textbox numberBox" id="d5"
								data-item="displayQty"></td>
						</tr>
						<tr>
							<td><label for="q6">Store Build</label></td>
							<td><input type="#" class="textbox numberBox" id="d6"
								data-item="buildQty"></td>
						</tr><!--  
						<c:if test="${isbigw==true}">
							<tr>
								<td><label for="q7">Advertising Display</label></td>
								<td><label for="display2" class="">Advertising
										Display</label> <select class="selectOptions" name="sr_adType"
									style="width: 78px;" id="adType" data-item="displayType">
										<option>Select</option>
										<c:forEach items="${displaylist}" var="element">
											<option value="${element.display_code}">${element.display_code_desc}</option>
										</c:forEach>

								</select></td>
							</tr>
						</c:if>-->
						<tr>
							<td><label for="q8">Notes</label></td>
							<td><input type="#" class="textbox longTextbox"
								placeholder="Enter notes" id="d8" data-item="notes"></td>
						</tr>
					</table>

				</div>
				<!-- End of parameter -->
				<div class="errorDiv hideBlock" id="errorMsgDiv">
					<label id="errorMsg">Please enter article to search.</label> <label
						class="closeMessage"
						onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
				</div>
				<p class="notes">
					Please note that In-store Promotions will be available in
					Promotions Planning screens <strong>after approximately 2
						hours</strong>.
				</p>

			</div>
			<!-- End of form wrapper  -->

		</div>
		<!-- End of pop up data -->





		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn"
				id="createDisplayPromoBtn"><label class="thumbUp">Create
						Promotion</label></label> <label class="secondaryActionBtn" id="popupCancel">Cancel</label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of display -->

<!-- create Clearance -->
<div id="dialog-clearance" title="Create In-store Clearance Promotion">
	<div class="popupContent">

		<div class="popupData">

			<div class="formWrapper">

				<div class="parameter">

					<table width="100%" class="plainTable" data-map="obj"
						id="createClearancePromo">

						<tr>
							<td><input type="hidden" data-item="articleNo" /> <input
								type="hidden" data-item="articleUom" /> <label
								class="hideBlock" data-item="stdPrice">${articleSearchResutls.salesPrice}</label>
								<label class="hideBlock" data-item="promoPrice">${articleSearchResutls.promoSalesPrice}</label>
								<label for="q1">Start Date</label></td>
							<td><input type="#" placeholder="dd/mm/yyyy"
								class="textbox defaultTextbox inputDate"
								data-item="promoStartDate"></td>
						</tr>
						<tr>
							<td><label for="q2">End Date</label></td>
							<td><input type="#" placeholder="dd/mm/yyyy"
								class="textbox defaultTextbox inputDate"
								data-item="promoEndDate"></td>
						</tr>
						<tr>
							<td><label for="cl4">New Price</label></td>
							<td><input type="#" class="textbox numberBox" id="cl4"
								data-item="newPrice"></td>
						</tr>
						<tr>
							<td><label for="cl5">Limit Qty.</label></td>
							<td><input type="#" class="textbox numberBox" id="cl5"
								data-item="limitQty"></td>
						</tr>
						<tr>
							<td><label for="q8">Notes</label></td>
							<td><input type="#" class="textbox longTextbox"
								placeholder="Enter notes" id="d8" data-item="notes"></td>
						</tr>
					</table>

				</div>
				<!-- End of parameter -->


				<p class="notes">
					Please note that In-store Promotions will be available in
					Promotions Planning screens <strong>after approximately 2
						hours</strong>.
				</p>

			</div>
			<!-- End of form wrapper  -->

		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn"
				id="createClearancePromoBtn"><label class="thumbUp">Create
						Promotion</label></label> <label class="secondaryActionBtn" id="popupCancel">Cancel</label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of Clearance -->




<!-- create Display -->
<div id="dialog-competition"
	title="Create In-store Competition Promotion">
	<div class="popupContent">

		<div class="popupData">

			<div class="formWrapper">

				<div class="parameter">

					<table width="100%" class="plainTable" data-map="obj"
						id="createCompetitionPromo">
						<tr>
							<td><input type="hidden" data-item="articleNo" /> <input
								type="hidden" data-item="articleUom" /> <label
								class="hideBlock" data-item="stdPrice">${articleSearchResutls.salesPrice}</label>
								<label class="hideBlock" data-item="promoPrice">${articleSearchResutls.promoSalesPrice}</label>
								<label for="q1">Start Date</label></td>
							<td><input type="#" placeholder="dd/mm/yyyy"
								class="textbox defaultTextbox inputDate"
								data-item="promoStartDate"></td>
						</tr>
						<tr>
							<td><label for="q2">End Date</label></td>
							<td><input type="#" placeholder="dd/mm/yyyy"
								class="textbox defaultTextbox inputDate"
								data-item="promoEndDate"></td>
						</tr>
						<tr>
							<td><label for="cl4">New Price</label></td>
							<td><input type="#" class="textbox numberBox" id="cl4"
								data-item="newPrice"></td>
						</tr>

						<tr>
							<td><label for="q4">Store Demand</label></td>
							<td><input type="#" class="textbox numberBox" id="d4"
								data-item="demandQty"></td>
						</tr>
						<tr>
							<td><label for="q5">Store Display</label></td>
							<td><input type="#" class="textbox numberBox" id="d5"
								data-item="displayQty"></td>
						</tr>
						<tr>
							<td><label for="q6">Store Build</label></td>
							<td><input type="#" class="textbox numberBox" id="d6"
								data-item="buildQty"></td>
						</tr>
						<tr>
							<td><label for="cl5">Limit Qty.</label></td>
							<td><input type="#" class="textbox numberBox" id="cl5"
								data-item="limitQty"></td>
						</tr>
						<tr>
							<td><label for="q7">Competitor</label></td>
							<td><select class="selectOptions" style="width: 78px;"
								id="adType" data-item="competitor">
									<option>Select</option>
									<c:forEach items="${competitorList}" var="element">
										<option value="${element.competitor_no}">${element.competitor_name}</option>
									</c:forEach>

							</select></td>
						</tr>
						<c:if test="${isbigw==true}">
							<tr>
								<td><label for="q7">Advertising Display</label></td>
								<td><select class="selectOptions" name="sr_adType"
									style="width: 78px;" id="adType" data-item="displayType">
										<option>Select</option>
										<c:forEach items="${displaylist}" var="element">
											<option value="${element.display_code}">${element.display_code_desc}</option>
										</c:forEach>

								</select></td>
							</tr>
						</c:if>
						<tr>
							<td><label for="co8">Notes</label></td>
							<td><input type="#" class="textbox longTextbox"
								placeholder="Enter notes" id="co8" data-item="notes"></td>
						</tr>
					</table>

				</div>
				<!-- End of parameter -->

				<p class="notes">
					Please note that In-store Promotions will be available in
					Promotions Planning screens <strong>after approximately 2
						hours</strong>.
				</p>

			</div>
			<!-- End of form wrapper  -->

		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn"
				id="createCompetitionPromoBtn"><label class="thumbUp">Create
						Promotion</label></label> <label class="secondaryActionBtn" id="popupCancel">Cancel</label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of Competition -->
