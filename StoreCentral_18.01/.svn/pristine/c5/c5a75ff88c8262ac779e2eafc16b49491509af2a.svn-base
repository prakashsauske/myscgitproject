
<div class="contentWrapper hideBlock" id="editServiceOrderWrapper">
	<form name="repeirsUpdateForm" method="POST" action="#">
		
		<div class="ContentTableWrapper">
			<div class="tableInfo repairTitle">
				<div class="tableTitle">
					<h4 class="sectionTitle">Edit Service Order</h4>
				</div>
				<!-- End of table title -->
				<div class="errorDiv hideBlock rightAlign" id="errorMsgDivEdit">
						<label id='errorMsg'>No article found for '<strong
							id="notfoundArticle">3234</strong>'. Please try a different
							number.
						</label> <label class="closeMessage"
							onclick="$(this).parent().addClass('hideBlock');">&nbsp;</label>
					</div>
			</div>
			<!-- End of table info -->
		</div>
		<!-- End of Content Table wrapper -->



		<div class="innerSection">
			<h4 class="sectionTitle">
				<strong>Service Order @ <label class="serviceOrderNo"></label></strong>
				<input type="hidden" class="serviceOrderNo" name="serviceOrderNo" />
			</h4>

			<div class="innerSectionActions">
				<label class="actionBtn updateServiceBtn" id=""><a><label
						class="thumbUp">Save</label></a></label> <label
					class="secondaryActionBtn editCancelBtn"><a>Cancel</a></label>
			</div>
		</div>
		<!-- End of inner section -->



		<div class="formWrapper twoColumn sixtyFourty">

			<div class="formWrapperLeft">
				<div class="twoColumnContent">

					<div class="parameter">
						<input type="hidden" name="articleNo" class="articleNo" /> <input
							type="hidden" name="articleDesc" class="articleDesc" /> <input
							type="hidden" name="stockType" class="stockType" /> <label
							class="" for="searchBox">Article:</label> <label
							class="articleNo"></label>&nbsp;-&nbsp;<label class="articleDesc"
							style="display: initial;"></label>
					</div>

					<div class="parameter">
						<label class="" for="stockType">Stock Type:</label> <label
							class="stockType">Customer</label>
					</div>

					<hr class="sectionDivider clearfix customerDetails">

					<div class="parameter parameterTitle customerDetails">
						<label class=""><strong>Customer Details</strong></label>
					</div>
					<div class="parameter customerDetails">
						<label class="" for="custName">Name</label> <input
							name="customerName" 
							class="textbox textboxDefaultText customerName mediumbox"
							id="custName">
					</div>
					<div class="parameter customerDetails">
						<label class="" for="address">Address</label> <input
							name="address" 
							class="textbox textboxDefaultText largebox address" id="address">
						<input name="postCode" maxlength="12" class="textbox postcode textboxDefaultText"
					 id="code">
					</div>
					<div class="parameter customerDetails">
						<label class="" for="contactNum">Contact Number</label> <input
							name="contactNumber" maxlength="16"
							class="textbox contactNumber textboxDefaultText"
							 id="contactNum">
					</div>
					<div class="parameter customerDetails">
						<label class="" for="email">Email</label> <input name="emailId"
							maxlength="132"
							class="textbox email textboxDefaultText mediumbox"
							disabled="disabled" id="email">
					</div>

					<hr class="sectionDivider clearfix">

					<div class="parameter parameterTitle">
						<label class=""><strong>Purchase & Repair Details</strong></label>
					</div>
					<div class="parameter">
						<label class="" for="pdate">Date of Purchase</label> <input
							name="dateOfPurchase" id="pdate"
							class="textbox defaultTextbox dateOfPurchase inputDate "
							>
					</div>
					<div class="parameter">
						<label class="purchaseProof" for="proof">Proof of Purchase</label> <input
							name="proofOfPurchase"
							class="textbox textboxDefaultText proofOfPurchase purchaseProof mediumbox"
							id="proof" >
					</div>
					<div class="parameter">
						<label class="" for="fault">Fault Description</label>
						<textarea
							class="textbox textboxDefaultText faultDescription largebox"
							placeholder="" name="faultDesc" id="fault"></textarea>
					</div>

					<hr class="sectionDivider clearfix">

					<div class="parameter parameterTitle">
						<label class=""><strong>Charges Details</strong> (aprrox.)</label>
					</div>
					<div class="parameter">
						<label class="" for="service">Article Under </label> <span
							class="radioOptions"> <input type="radio"
							id="warr" value="Warranty" name="service"><label
							class="labelText" for="warr">Warranty</label> <input
							type="radio" id="quot" value="Quote"
							name="service"><label class="labelText" for="quot">Quote</label>
							<input type="radio"  id="char" value="Charged"
							name="service"><label class="labelText" for="char">Charged</label>
						</span>
					</div>
					
						<div class="parameter">
							<label class="" for="costBorneBy"> Freight Cost </label>
							<span class="radioOptions">
								Borne by  
								<input type="radio" checked="" id="st" value="1" name="costBorneBy"><label class="labelText" for="st">Store</label>
								<input type="radio" id="ve" value="2" name="costBorneBy"><label class="labelText" for="ve">Vendor</label>							
							</span>
						</div>

					<div class="parameter">
						<label class="" for="ta">Amount Payable </label> <input
							name="totalAmount" maxlength="132"
							class="textbox textboxDefaultText totalAmount numberBox two-digits"
							placeholder="" id="ta">
					</div>
					<div class="parameter">
						<label class="" for="comments">Comments</label>
						<textarea class="textbox comments textboxDefaultText largebox"
							placeholder="" id="comments" name="comments"></textarea>
					</div>

					<div class="parameter">
						<label class="" for="returnDate">Vendor Goods Return Date
						</label> <input name="vendorReturnDate" id="returnDate"
							class="textbox defaultTextbox vendorReturnDate inputDate"
							maxlength="10" placeholder="dd/mm/yyyy">
					</div>

					 <hr class="sectionDivider clearfix VendorOrRepairAgentDetails">

					<div class="parameter parameterTitle VendorOrRepairAgentDetails">
						<label class=""><strong>Vendor or Repair Agent
								Details</strong></label>
					</div>
					<div class="parameter VendorOrRepairAgentDetails">
						<label class="" for="authCode">Authorisation Code</label> <input
							name="authorisationCode" maxlength="132"
							class="textbox textboxDefaultText authorisationCode mediumbox"
							placeholder="" id="authCode">
					</div>
					<div class="parameter VendorOrRepairAgentDetails">
						<label class="" for="authName">Authoriser Name</label> <input
							name="authorizerName" maxlength="132"
							class="textbox textboxDefaultText authorityName mediumbox"
							placeholder="" id="authName">
					</div>

					<hr class="sectionDivider clearfix">

					<div class="parameter parameterTitle">
						<label class=""><strong>Despatch Details</strong></label>
					</div>
					<div class="parameter">
						<label class="" for="pickDate">Goods Pickup Date</label> <input
							name="pickUpDate" id="pickDate" placeholder="dd/mm/yyyy"
							maxlength="10"
							class="textbox pickUpDate defaultTextbox inputDate ">
							<input type="hidden" class="pickUpDate" id="prevPickDate">
					</div>


					<div class="parameter">
						<label class="" for="fud">Due Date</label> <input name="dueDate"
							maxlength="10" id="fud" class="textbox dueDate defaultTextbox "
							placeholder="dd/mm/yyyy" readonly="readonly">
					</div>
					<div class="parameter">
						<label class="" for="conNote">Consignment Note</label> <input
							name="consignementNote"
							class="textbox textboxDefaultText consignementNote mediumbox"
							placeholder="" maxlength="132" id="conNote">
					</div>
					<div class="parameter">
						<label class="" for="carr">Carrier</label> <input
							name="carrierName"
							class="textbox carrierName textboxDefaultText mediumbox"
							maxlength="132" placeholder="" id="carr">
					</div>
					<div class="parameter">
						<label class="" for="ccn">Contact Number</label> <input
							name="carrierContact"
							class="textbox textboxDefaultText carrierContact mediumbox"
							placeholder="" maxlength="132" id="ccn">
					</div>

					<hr class="sectionDivider clearfix">



				</div>
				<!-- End of left content-->



			</div>
			<!-- End of form wrapper left -->

			<div class="formWrapperRight">
				<input type="hidden" id="serviceAggrementLoadedFlag" value="false" />
				<div class="twoColumnContent subtleHighlight" id="serviAgreement">

					<p class="notes">
						<strong>Service Agreement </strong>
					</p>

					<div class="parameter">


						<table width="100%" class="plainTable">

							<tr>
								<td>Repair Agent:</td>
								<td>Name (Code)</td>
							</tr>
							<tr>
								<td>Contact:</td>
								<td>######</td>
							</tr>
							<tr>
								<td>Can raise repair request?</td>
								<td>Yes / No</td>
							</tr>
							<tr>
								<td>Can raise claim?</td>
								<td>Yes / No</td>
							</tr>
							<tr>
								<td>Need repair authorisation?</td>
								<td>Yes / No</td>
							</tr>
							<tr>
								<td>Under warranty?</td>
								<td>Yes / No</td>
							</tr>
							<tr>
								<td>Warranty Period:</td>
								<td>##</td>
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
								<td colspan="2">&nbsp;</td>
							</tr>
							<tr>
								<td>Spare parts?</td>
								<td>Yes / No</td>
							</tr>
							<tr>
								<td>Contact Number:</td>
								<td>##########</td>
							</tr>
							<tr>
								<td colspan="2">&nbsp;</td>
							</tr>
							<tr>
								<td>S&D markdown?</td>
								<td>Yes / No</td>
							</tr>
							<tr>
								<td>Valid From:</td>
								<td>dd/mm/yyyy</td>
							</tr>


							<tr>
								<td>Special Communications:</td>
								<td>xxxx xxxxx xxxxxx</td>
							</tr>

						</table>

					</div>
					<!-- End of parameter -->

				</div>
				<!-- End of right content -->
			</div>
			<!-- End of form wrapper left -->



		</div>
		<!-- End of form wrapper -->




		<div class="pageActions ">
			<label class="actionBtn updateServiceBtn" id=""><a><label
					class="thumbUp">Save</label></a></label> <label
				class="secondaryActionBtn editCancelBtn" id="editCancelBtn"><a>Cancel</a></label>
		</div>
		<!-- End of page actions-->
	</form>
</div>