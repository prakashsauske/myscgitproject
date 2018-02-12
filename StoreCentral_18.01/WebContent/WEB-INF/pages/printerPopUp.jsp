<div
	class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-draggable"
	tabindex="-1" role="dialog" aria-describedby="dialog-printer-list"
	aria-labelledby="ui-id-1" style="display: none;">
	<div
		class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
		<span id="ui-id-1" class="ui-dialog-title">Select Printer</span>
		<button
			class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close"
			role="button" aria-disabled="false" title="close">
			<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span
				class="ui-button-text">close</span>
		</button>
	</div>
	<div id="dialog-printer-list"
		class="ui-dialog-content ui-widget-content">
		<div class="popupContent">

			<div class="popupData popupTitle">

				<h4 class="warning">
					Total <strong id="searchArticleCount"></strong> printers
					connected.
				</h4>

			</div>
			<div class="parameter no-of-copy"
				style="">
				<label for="invoice" class="">No of Copies</label> <input type="#"
					class="textbox numberBox" value="2"id="invoice">
			</div>
			<!-- End of pop up data -->


			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tbody id="articleSearchTbody">
						<tr>
							<th>Printer Name</th>
							<th width="40px" class="centerValue lastColumn">Select</th>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- End of content table wrapper -->

			<!-- <div class="popupActionsWrapper">
				<span class="popupActions"> <label class="secondaryActionBtn">Cancel</label>
					<label class="actionBtn" id="addtolist">Add to List</label>
				</span>
			</div> -->
			<!-- End of popup actions-->


		</div>
		<!-- End of popupContent -->
	</div>
</div>