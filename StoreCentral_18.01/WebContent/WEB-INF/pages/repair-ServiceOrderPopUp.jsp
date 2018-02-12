<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- Quick help -->
<div class="pageStatusWrapper hideBlock" id="reqCreated">
	<div class="pageStatusContent">
		<div class="pageStatusTitle">
			<h4 class="title">Service Order created sucessfully !</h4>
			<a class="close" title="Close">Close</a>
			<p class="description hideBlock">The filters allows you to
				minimise the list of records and let you quickly find relevant
				information.</p>
		</div>
		<!-- End of quick help title -->
		<div class="content">

			<h4 class="title">What next?</h4>
			<ul>
				<li>Provide service request number <strong>3710002408498</strong>
					to the customer
				</li>
				<li>Check with customer if they want the Good Acceptance Note
					print</li>
			</ul>
		</div>
		<!-- End of content -->
	</div>
	<!-- End of quick help content -->
</div>
<!-- End of quick help wrapper -->


<div class="pageErrorsWrapper hideBlock temp-fix-pop-up" id="errorWrapper">
	<div class="pageErrorsContent">
		<div class="pageErrorsTitle">
			<h4 class="title">Errors</h4>
			<a class="close" title="Close">Close</a>
			<p class="description">The In-store Display creation failed for
				few articles.</p>
		</div>
		<!-- End of quick help title -->
		<div class="content">

			<h4 class="title">Reason for failure</h4>
			<ol id="validateErrors">

			</ol>
		</div>
		<!-- End of content -->
	</div>
	<!-- End of quick help content -->
</div>

<div id="dialog-created" title="Service Request Created">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText serviceOrderNoText">
				Repair service order ( <strong></strong> ) Updated successfully.
			</h4>

			<div class="popupActionsWrapper">
				<span class="popupActions"><label class="secondaryActionBtn"><a
						href="">Ok</a></label> </span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>


<!-- create Display -->
<div id="dialog-copies" title="Print Acceptance Note" class="hideBlock">
	<div class="popupContent">

		<div class="popupData">

			<div class="formWrapper">

				<div class="parameter">

					<table width="100%" class="plainTable">
						<tr>
							<td><label for="co5">Number of copies</label></td>
							<td><input  class="textbox numberBox" value="2"></td>
						</tr>
					</table>

				</div>
				<!-- End of parameter -->

			</div>
			<!-- End of form wrapper  -->

		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn"><a
					><label class="print">Print</label></a></label> <label
				class="secondaryActionBtn"><a >Cancel</a></label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of Competition -->


<!-- Cancel Request -->
<div id="dialog-cancel" title="Cancel Service Order #1234" class="">
	<div class="popupContent">

		<div class="popupData">
			<form:form id="cancelForm" modelAttribute="RepairSearchParam">
				<div class="formWrapper">
						<div class="instructionalText " style="padding-bottom: 5px;">
							<!-- <label class="centerValue">No changes can be made to Completed or Cancelled Orders, Please ensure to fill in the correct <br> &nbsp; &nbsp; &nbsp;details 
							before you click OK.</label> -->
						</div>
					<div class="parameter">

						<table width="100%" class="plainTable">
							<tr>
								<td><label for="co4">Closure Action Code</label></td>
								<td><select id="co4"
									class="selectOptions cancel-closure-act-code">
										<c:forEach items="${closureList}" var="closureCode">
											<option value="${closureCode}">${closureCode}</option>
										</c:forEach>
								</select></td>
							</tr>
							<tr>
								<td><label for="co2">Cancellation Reason</label></td>
								<td><textarea
										class="textbox textboxDefaultText largebox cancel-reason"
										placeholder="" id="co2"></textarea></td>
							</tr>
							</tr>
							<tr class="hideBlock">
								<td><label for="com1">Payable Amount</label></td>
								<td><input class="textbox mediumbox cancel-amount"
									value="0" id="com1"></td>
							</tr>
							<!-- <tr>
								<td><label for="co1">Authorisation Code</label></td>
								<td><input 
									class="textbox numberBox mediumbox cancel-auth-code" value=""
									id="co1"></td>
							</tr> -->
							<tr>
								<td><label for="co3">Remarks</label></td>
								<td><textarea
										class="textbox textboxDefaultText largebox cancel-remarks"
										placeholder="" id="co3"></textarea></td>
							</tr>

						</table>

					</div>
					<!-- End of parameter -->

				</div>
			</form:form>
			<!-- End of form wrapper  -->
<div class="errorDiv hideBlock" id="errorMsgDivCnclPop" style="padding-top: 0px;">
					<label id='errorMsgCnclPop'>
					</label> <label class="closeMessage"
						onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
				</div>
		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label
				class="actionBtn  cancel-done"><a ><label
						class="thumbUp">Done</label></a></label> <label
				class="secondaryActionBtn   cancel-cancel"><a >Cancel</a></label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of Competition -->


<!-- Complete Request -->
<div id="dialog-complete" title="Complete Service Order # 1234" class="">
	<div class="popupContent">

		<div class="popupData">
			<form:form id="completeForm" modelAttribute="RepairSearchParam">
				<div class="formWrapper">
					<div class="instructionalText " style="padding-bottom: 5px;">
							<!-- <label class="centerValue">No changes can be made to Completed or Cancelled Orders, Please ensure to fill in the correct <br> &nbsp; &nbsp; &nbsp;details 
							before you click OK.</label> -->
						</div>
					<div class="parameter">

						<table width="100%" class="plainTable">

							<tr>
								<td><label for="com4">Closure Action Code</label></td>
								<td><select id="com4"
									class="selectOptions complete-closure-act-code">
										<c:forEach items="${closureList}" var="closureCode">
											<option value="${closureCode}">${closureCode}</option>
										</c:forEach>
								</select></td>
							</tr>
							<tr>
								<td><label for="com3">Remarks</label></td>
								<td><textarea
										class="textbox textboxDefaultText largebox complete-remarks"
										placeholder="" id="com3"></textarea></td>
							</tr>
							<!-- <tr>
								<td><label for="userID">User ID</label></td>
								<td><input 
									class="textbox mediumbox complete-user" id="userID"
									placeholder=""></td>
							</tr>
							<tr>
									<td><label for="date">Create Date</label></td>
									<td> <input
										name="createDate"
										class="textbox textboxDefaultText complete-date" placeholder=""
										maxlength="16" id="date" readonly></td>
							</tr> -->	
							<tr>
								<td><label for="com2">Service Feedback</label></td>
								<td><textarea
										class="textbox textboxDefaultText largebox complete-feedback"
										placeholder="Type customer feedback here" id="com2"></textarea></td>
							</tr>

						</table>

					</div>
					<!-- End of parameter -->

				</div>
				<!-- End of form wrapper  -->
			</form:form>
			<div class="errorDiv hideBlock" id="errorMsgDivCompPop" style="padding-top: 0px;">
					<label id='errorMsgCompPop'>
					</label> <label class="closeMessage"
						onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
				</div>
		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn complete-done"><a
					><label class="thumbUp ">Done</label></a></label> <label
				class="secondaryActionBtn complete-cancel"><a >Cancel</a></label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of Competition -->


<div class="quickHelpWrapper hideBlock temp-fix-pop-up" id="emailSent">
		<div class="quickHelpContent">
			<div class="quickHelpTitle">
				<h4 class="title">Reminder sent</h4>
				<a class="close" title="Close">Close</a>
				<p class="description">Reminder email sent to the Repair /Spare Agent</p>
			</div>
			<!-- End of quick help title -->
			<div class="content hideBlock">

				<h4 class="title"></h4>
				<ul>
					
				</ul>
			</div>
			<!-- End of content -->
		</div>
		<!-- End of quick help content -->
	</div>

<!-- Quick help -->
<div class="pageStatusWrapper hideBlock" >
	<div class="pageStatusContent">
		<div class="pageStatusTitle">
			<h4 class="title">Reminder email sent to the Repair /Spare Agent</h4>
			<a class="close" title="Close">Close</a>
			<p class="description hideBlock">The filters allows you to
				minimise the list of records and let you quickly find relevant
				information.</p>
		</div>
		<!-- End of quick help title -->
		<div class="content hideBlock">

			<h4 class="title">What next?</h4>
			<ul>
				<li>Some text</li>
				<li>Some text</li>
			</ul>
		</div>
		<!-- End of content -->
	</div>
	<!-- End of quick help content -->
</div>
<!-- End of quick help wrapper -->

<!-- Quick help -->
<div class="pageStatusWrapper hideBlock" id="reqCreated">
	<div class="pageStatusContent">
		<div class="pageStatusTitle">
			<h4 class="title">Service Order created sucessfully !</h4>
			<a class="close" title="Close">Close</a>
			<p class="description hideBlock">The filters allows you to
				minimise the list of records and let you quickly find relevant
				information.</p>
		</div>
		<!-- End of quick help title -->
		<div class="content">

			<h4 class="title">What next?</h4>
			<ul>
				<li>Provide service request number <strong>3710002408498</strong>
					to the customer
				</li>
				<li>Check with customer if they want the Good Acceptance Note
					print</li>
			</ul>
		</div>
		<!-- End of content -->
	</div>
	<!-- End of quick help content -->
</div>
<!-- End of quick help wrapper -->








<!-- Service agreement -->
<div id="dialog-sa" title="Service Agreement" class="hideBlock">
	<div class="popupContent">

		<div class="popupData">

			<div class="formWrapper">

				<p class="notes">
					<strong>12345 - T-shirt for kids small </strong>
				</p>

				<div class="parameter">

					<table width="100%" class="plainTable">

						<tr>
							<td>Can raise a repair order?</td>
							<td>Yes / No</td>
						</tr>
						<tr>
							<td>Can raise ullage?</td>
							<td>Yes / No</td>
						</tr>
						<tr>
							<td>Ullage Comments:</td>
							<td>Some text</td>
						</tr>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td>Repair Agent Number:</td>
							<td>###</td>
						</tr>
						<tr>
							<td>Carrier:</td>
							<td>xxxxx</td>
						</tr>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td>Can request spare parts?</td>
							<td>Yes / No</td>
						</tr>
						<tr>
							<td>Contact Number:</td>
							<td>##########</td>
						</tr>
						<tr>
							<td>Address:</td>
							<td>xxxx xxxxx xxxxxx</td>
						</tr>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td width="50%">Can raise claim?</td>
							<td>Yes / No</td>
						</tr>
						<tr>
							<td>Claim Agent:</td>
							<td>xxxxxxxx</td>
						</tr>
						<tr>
							<td>Need an authority?</td>
							<td>Yes / No</td>
						</tr>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td>Replacement packaging?</td>
							<td>Yes / No</td>
						</tr>
						<tr>
							<td>Contact Number:</td>
							<td>##########</td>
						</tr>
						<tr>
							<td>Address:</td>
							<td>xxxx xxxxx xxxxxx</td>
						</tr>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr>
							<td>Supplier on warranty?</td>
							<td>Yes / No</td>
						</tr>
						<tr>
							<td>Warranty Period:</td>
							<td>xxxxx</td>
						</tr>
						<tr>
							<td>Contact Number:</td>
							<td>##########</td>
						</tr>
						<tr>
							<td>Special Comments:</td>
							<td>xxxx xxxxx xxxxxx</td>
						</tr>

					</table>

				</div>
				<!-- End of parameter -->



			</div>
			<!-- End of form wrapper  -->

		</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn"><label
					class="thumbUp">New Service Order</label></label> <label
				class="secondaryActionBtn">Close</label>
			</span>
		</div>
		<!-- End of popup actions-->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of Competition -->


<!-- Print Carton Labels -->
<div id="dialog-print" title="Print Carton Labels">
	<div class="popupContent wizardContent">

		<div class="popupData">

			<h4 class="alertText">Provide supplier code and select service
				requets to print carton labels</h4>

			<form method="POST" action="" id="wizard">
				<div class="formWrapper" title="Print parameters">
					<h2 class="wizardTitle">Provide print parameters</h2>


					<div class="parameter">

						<table width="100%" class="plainTable">
							<tr>
								<td><label for="p7">Number of copies</label></td>
								<td><input  class="textbox numberBox" value=""
									id="p7"></td>
							</tr>

							<tr>
								<td colspan="2"><hr class="sectionDivider clearfix"></td>
							</tr>

							<tr>
								<td><label for="p1">Order Type</label></td>
								<td><input type="radio" checked="" id="cust" value="cust"
									name="stockType"><label class="labelText" for="cust">Claim</label>
									<input type="radio" id="store" value="store" name="stockType"><label
									class="labelText" for="store">Repair</label></td>
							</tr>

							<tr>
								<td colspan="2"><hr class="sectionDivider clearfix"></td>
							</tr>
							<tr>
								<td><label for="p3">Supplier Code</label></td>
								<td><input  class="textbox smallbox" value=""
									id="p1"><label id="verifySupplier" class="linkBtn"><a
										><label class="advancedSearch">Verify</label></a></label></td>
							</tr>
							<tr>
								<td><label for="p4">Supplier Name</label></td>
								<td>XXXXX XXXXXXX</td>
							</tr>
							<tr>
								<td><label for="p5">Contact Number</label></td>
								<td>## ##########</td>
							</tr>
							<tr>
								<td><label for="p6">Authority / Attention Name</label></td>
								<td><input  class="textbox mediumbox" value=""
									id="p6"></td>
							</tr>



						</table>

					</div>
					<!-- End of parameter -->


				</div>
				<!-- End of form wrapper step 1 -->


				<div class="formWrapper" title="Select service order">
					<h2 class="wizardTitle">Select service order for print</h2>

					<div class="ContentTableWrapper">
						<table cellspacing="0" class="ContentTable">
							<thead>
								<tr>
									<th class=" centerValue" width="10px"><input
										type="checkbox" name="sel"></th>
									<th>Article #</th>
									<th>Description</th>
									<th class="centerValue">Create Date</th>
									<th class="centerValue lastColumn">Due Date</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="centerValue"><input type="checkbox" name="sel"></td>
									<td>12345</td>
									<td>T-shirt for kids small</td>
									<td class="centerValue">13/11/2014</td>
									<td class="centerValue lastColumn">04/12/2014</td>
								</tr>
								<tr>
									<td class="centerValue"><input type="checkbox" name="sel"></td>
									<td>12345</td>
									<td>T-shirt for kids small</td>
									<td class="centerValue">13/11/2014</td>
									<td class="centerValue lastColumn">04/12/2014</td>
								</tr>


							</tbody>
						</table>
					</div>
					<!-- End of content table wrapper -->


				</div>
				<!-- End of form wrapper step 2 -->

			</form>
		</div>
		<!-- End of pop up data -->



	</div>
	<!-- End of popupContent -->
</div>
<!-- End of Competition -->


<!-- Multiple action cofirmation -->
<div id="dialog-confirm"
	title="Send Reminder Email / Mark as Complete / Cancel">
	<div class="popupContent">

		<div class="popupData">
			<h4 class="alertText">
				Are you sure you want to Send Reminder Email / Mark as Complete /
				Cancel selected <strong>number</strong> order?
			</h4>

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Yes</label>
					<label class="secondaryActionBtn">No</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End Cancel order popup -->


<!-- Activity Success message -->
<div class="pageStatusWrapper hideBlock" id="updated">
	<div class="pageStatusContent">
		<div class="pageStatusTitle">
			<h4 class="title">Reminder Email Sent / Orders Marked as
				Complete / Orders Cancelled</h4>
			<a class="close" title="Close">Close</a>
			<p class="description hideBlock">The filters allows you to
				minimise the list of records and let you quickly find relevant
				information.</p>
		</div>
		<!-- End of quick help title -->
		<div class="content">

			<h4 class="title hideBlock">Followin</h4>
			<ul>
				<li>Service Order #1234</li>
				<li>Service Order #1235</li>
			</ul>
		</div>
		<!-- End of content -->
	</div>
	<!-- End of quick help content -->
</div>
<!-- End of quick help wrapper -->

