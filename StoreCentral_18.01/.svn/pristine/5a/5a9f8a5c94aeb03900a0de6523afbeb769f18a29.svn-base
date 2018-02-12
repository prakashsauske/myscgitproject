<div id="dialog-modal2" class="dialog-modal2"
	title="Article Description"></div>
<div id="dialog-date-error" title="Delivery Date">
	<div class="popupContent">


		<div class="popupData" id="">Delivery date should not be lesser
			than roster date.</div>
		<!-- End of pop up data -->

		<div class="popupActionsWrapper">
			<span class="popupActions"> <label class="actionBtn" id=""
				onclick="$('#dialog-date-error').dialog('close');$('#'+tempId).click();">OK</label>
			</span>
		</div>



	</div>
	<!-- End of popupContent -->
</div>
<div id="dialog-date-roster" title="Roster Date Change">
	<div class="popupContent">

		<div class="popupData">

			<h4 class="alertText">This will change all the roster and
				delivery dates. Are you sure you want to continue?</h4>
			<!-- Commented by Haresh
					<div class="ContentTableWrapper popMessage">

						<label>Are you sure you want to save the changes?</label>

					</div>
					 End of content table wrapper -->



			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn" id=""
					onclick="changeDeliveryDate();">Yes</label> <label
					class="secondaryActionBtn" id=""
					onclick="$('#'+tempId).val(tempDate);$('#dialog-date-roster').dialog('close');">No</label>
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

<div id="dialog-date-delivery" title="Delivery Date Change">
	<div class="popupContent">

		<div class="popupData">

			<h4 class="alertText">This will change all the delivery dates.
				Are you sure you want to continue?</h4>
			<!-- Commented by Haresh
					<div class="ContentTableWrapper popMessage">

						<label>Are you sure you want to save the changes?</label>

					</div>
					 End of content table wrapper -->



			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn" id=""
					onclick="checkDeliveryDate();">Yes</label> <label
					class="secondaryActionBtn" id=""
					onclick="$('#'+tempId).val(tempDate);$('#dialog-date-delivery').dialog('close');">No</label>
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
	$(document).ready(function(){

	setTimeout(function(){
	$("#dialog-date-roster").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-date-roster").parent().addClass("popupWrapper");
	$("#dialog-date-delivery").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-date-delivery").parent().addClass("popupWrapper");
	$("#dialog-date-error").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-date-error").parent().addClass("popupWrapper");
	},100);
	});
	</script>