$(function() {
		
			// code for setting default parameters for popups
			$( "#dialog-mulipleArticles" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 800,
				width: 450
			});
		
			
			$( "#dialog-create" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				maxHeight: 800,
				width: 450
			});
		
		
			//Code for accordion
			$("#accordion").accordion({
				header:"h3.mainAccordion",
				collapsible: true, 		
				heightStyle: "content" 
			});
			
			
		
			
			
			// (Temp - Dev team need to change it) Code to show multiple articles popup
			
			$("#searchAndAdd").click(function() {		
				$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
				$("#dialog-mulipleArticles" ).dialog("open");
			});
			
			$(".popupActions .actionBtn, .popupActions .secondaryActionBtn").click(function() {					
				$("#dialog-mulipleArticles").dialog("close");			
			});
			
			
			// (Temp - Dev team need to change it) Code to show a message once Submit is clicked
			
			$("#beforePublishButton").click(function() {	
				$("#initial").addClass("hideBlock");
				$("#initialStore").addClass("hideBlock");
				$("#listOption").attr("disabled","disabled");
				$("#treetable").removeClass("hideBlock");
				$("#treetableGroup").addClass("hideBlock");
				$("#tableAddAction").addClass("hideBlock");
				$("#addActionBtn").addClass("hideBlock");
				$("#instructionalText1").addClass("hideBlock");
				$("#instructionalText2").removeClass("hideBlock");
				$("#beforePublish").addClass("hideBlock");
				$("#afterPublish").removeClass("hideBlock");
				
				
				
				//$("#dialog-create").parent().addClass("popupWrapper");
				//$("#dialog-create" ).dialog("open");
			});
			
			$("#validateButton").click(function() {	
				
				$("#treetable").addClass("hideBlock");
				$(".pageErrorsWrapper").removeClass("hideBlock");
				$("#afterCreate").removeClass("hideBlock");
				
				
				
				//$("#dialog-create").parent().addClass("popupWrapper");
				//$("#dialog-create" ).dialog("open");
			});
			
			
			
			//status radio buttons
			$('#MM').click(function(){
				$("#drafts").removeClass('hideBlock');
				$("#actives").addClass('hideBlock');
				$("#pasts").addClass('hideBlock');
				$("#beforePublish").removeClass('hideBlock');
				
			});
			
			$('#MF').click(function(){
				$("#actives").removeClass('hideBlock');
				$("#drafts").addClass('hideBlock');
				$("#pasts").addClass('hideBlock');
				$("#beforePublish").addClass('hideBlock');
				$("#afterPublish").addClass('hideBlock');
				
			});
			
			$('#MR').click(function(){
				$("#pasts").removeClass('hideBlock');
				$("#drafts").addClass('hideBlock');
				$("#actives").addClass('hideBlock');
				$("#beforePublish").addClass('hideBlock');
				$("#afterPublish").addClass('hideBlock');
			});
			
			
			
			
			
			
			
			
			
			$("#createOrderButton").click(function() {
				$("#dialog-modal").parent().addClass("popupWrapper");					
				$("#dialog-modal").dialog( "open" );			
			});
			
		
			
			//checks radio buttons in Souce of Supply
			$('#warehouse').click(function(){
				$("#warehouseField").removeClass('hideBlock');
				$("#vendorField").addClass('hideBlock');
				$("#allField").addClass('hideBlock');
			});
			
			$('#vendor').click(function(){
				$("#vendorField").removeClass('hideBlock');
				$("#warehouseField").addClass('hideBlock');
				$("#allField").addClass('hideBlock');
			});
			
			$('#all').click(function(){
				$("#allField").removeClass('hideBlock');
				$("#warehouseField").addClass('hideBlock');
				$("#vendorField").addClass('hideBlock');
			});
			
			
			
			// Code for opening open orders popup
			
			$( "#dialog-modal-orders" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 800
			});
			
			$("#dialog-modal-orders").parent().addClass("popupWrapper");
			
			$(".notpadLink").click(function() {									
				$("#dialog-modal-orders" ).dialog("open");
			});
			
			$("#closePopup").click(function() {									
				$("#dialog-modal-orders" ).dialog("close");
			});
			
			
			
						
			Date.format = 'dd/mm/yy';
			$(".inputDateInput").datepicker({
				zIndex:50
			});
			
			$(".inputDate").datepicker({
				zIndex:50
			});
			
			/*when edit button is clicked displays input box in editable cells*/
			$(".editRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				
				$(("#row-").concat(id)).addClass('rowHighlight editRow');
				
				$(("#deliveryDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#deliveryDate-").concat(id)).addClass('hideBlock');
				
				$(("#startDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#startDate-").concat(id)).addClass('hideBlock');
				
				$(("#endDateEdit-").concat(id)).removeClass('hideBlock');
				$(("#endDate-").concat(id)).addClass('hideBlock');
				
				$(("#demandEdit-").concat(id)).removeClass('hideBlock');
				$(("#demand-").concat(id)).addClass('hideBlock');
				
				$(("#displayEdit-").concat(id)).removeClass('hideBlock');
				$(("#display-").concat(id)).addClass('hideBlock');
				
				$(("#buildEdit-").concat(id)).removeClass('hideBlock');
				$(("#build-").concat(id)).addClass('hideBlock');
				
				$(("#advDisplayEdit-").concat(id)).removeClass('hideBlock');
				$(("#advDisplay-").concat(id)).addClass('hideBlock');
				
				$(("#notesEdit-").concat(id)).removeClass('hideBlock');
				$(("#notes-").concat(id)).addClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).removeClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
			});
			
			/*when save button is clicked displays input box is disabled*/
			$(".saveRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				
				$(("#row-").concat(id)).removeClass('rowHighlight editRow');
				
				$(("#deliveryDateEdit-").concat(id)).addClass('hideBlock');
				$(("#deliveryDate-").concat(id)).removeClass('hideBlock');
				
				$(("#startDateEdit-").concat(id)).addClass('hideBlock');
				$(("#startDate-").concat(id)).removeClass('hideBlock');
				
				$(("#endDateEdit-").concat(id)).addClass('hideBlock');
				$(("#endDate-").concat(id)).removeClass('hideBlock');
				
				$(("#demandEdit-").concat(id)).addClass('hideBlock');
				$(("#demand-").concat(id)).removeClass('hideBlock');
				
				$(("#displayEdit-").concat(id)).addClass('hideBlock');
				$(("#display-").concat(id)).removeClass('hideBlock');
				
				$(("#buildEdit-").concat(id)).addClass('hideBlock');
				$(("#build-").concat(id)).removeClass('hideBlock');
				
				$(("#advDisplayEdit-").concat(id)).addClass('hideBlock');
				$(("#advDisplay-").concat(id)).removeClass('hideBlock');
				
				$(("#notesEdit-").concat(id)).addClass('hideBlock');
				$(("#notes-").concat(id)).removeClass('hideBlock');
				
				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).removeClass('hideBlock');
			});
			
			
			// Code to close all wrapper
			$("#closeLink, .closeLink").click(function(){ 						
				$(".tableActionsWrapper").addClass('hideBlock');
			});
			
			
			// Code to show and hide add article			
			$("#addActionBtn").click(function(){ 
				$("#groupByClear").trigger( "click" );
				$("#filterClear").trigger( "click" );
				$(".tableActionsWrapper").removeClass('hideBlock');
				$("#tableGroupAction").addClass('hideBlock');	
				$("#tableAddAction").removeClass('hideBlock');										
			});		
			
			// Code to show and hide filter			
			$('#filterOpen').click(function() {		
				$("#filterClear").removeClass('hideBlock');	
				$(".filterRow").removeClass('hideBlock');
				$(".quickHelpWrapper").removeClass('hideBlock');				
				$(this).addClass('hideBlock');
				
				//$("#groupByClear").trigger( "click" );
			});
			
			$('#filterClear').click(function() {		
				$("#filterOpen").removeClass('hideBlock');
				$(".filterRow").addClass('hideBlock');	
				$(this).addClass('hideBlock');
				$(".tableActionsWrapper").addClass('hideBlock');
				$(".quickHelpWrapper").addClass('hideBlock');
			});
			
			
			// Code to show and hide group By			
			$('#groupByOpen').click(function() {		
				//$("#filterClear").trigger( "click" );
				$("#groupByClear").removeClass( "hideBlock" );
				$("#tableAddAction").addClass('hideBlock');
				$("#tableGroupAction").removeClass('hideBlock');
				$(this).addClass('hideBlock');					
			});
			
			$('#groupByClear').click(function() {		
				$("#groupByOpen").removeClass('hideBlock');		
				$(this).addClass('hideBlock');
				$(".tableActionsWrapper").addClass('hideBlock');
				$("#treetable").removeClass('hideBlock');
				$("#treetableGroup").addClass('hideBlock');
			});
			
			// Code to apply group by
			$("#applyGroupBy").click(function(){ 						
				$("#treetable").addClass('hideBlock');
				$("#treetableGroup").removeClass('hideBlock');
			});
			
			
			// Code to close
			$(".close").click(function(){ 						
				$(".quickHelpWrapper").addClass('hideBlock');
				$(".pageErrorsWrapper").addClass('hideBlock');
			});
			
			
			// My list and store list change 
			$("#listOption").change(function(){ 						
				$("#initial").toggleClass('hideBlock');
				$("#initialStore").toggleClass('hideBlock');
				$("#addActionBtn").toggleClass('hideBlock');
				$("#tableAddAction").addClass('hideBlock');
				
			});
			
			
			
			
	
			
			
			$('#dialog-create .actionBtn, #afterPublish .secondaryActionBtn').click(function() {	
				$("#addActionBtn").removeClass('hideBlock');	
				
				
				$("#treetablePublish").addClass('hideBlock');	
				$("#treetable").removeClass('hideBlock');	
				
				$("#afterPublish").addClass('hideBlock');	
				$("#beforePublish").removeClass('hideBlock');	

				$("#instructionalText2").addClass('hideBlock');	
				$("#instructionalText1").removeClass('hideBlock');	
				
			});
			
			$(".popupActions .actionBtn, .popupActions .secondaryActionBtn").click(function() {					
				$("#dialog-create").dialog("close");				
			});
			
			
			$(".tooltip").tooltip({ 
				position: { 
					my: "left center", 
					at: "right+10 center" 
				} 
			});
			
		
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			
			
			
			
			$("#treetable, #treetablePublish, .treetable").treetable({
				expandable: true
			});
			
			// Code for Expand and Collapse all
			$('#expandAll').click(function(){
				$("#treetable").treetable('expandAll'); 
				$("#expandAll").addClass('hideBlock');
				$("#collapseAll").removeClass('hideBlock');
				$('#treetable tr:even').removeClass('expanded');
			});
			
			$('#collapseAll').click(function(){
				$("#treetable").treetable('collapseAll'); 
				$("#expandAll").removeClass('hideBlock');
				$("#collapseAll").addClass('hideBlock');
			});
			
		
		});
		
		
			
		// Code for Auto Complete with select box
		
		
		 (function( $ ) {
			$.widget( "custom.combobox", {
			_create: function() {
			this.wrapper = $( "<span>" )
			.addClass( "custom-combobox" )
			.insertAfter( this.element );
			this.element.hide();
			this._createAutocomplete();
			this._createShowAllButton();
			},
			_createAutocomplete: function() {
			var selected = this.element.children( ":selected" ),
			value = selected.val() ? selected.text() : "";
			this.input = $( "<input>" )
			.appendTo( this.wrapper )
			.val( value )
			.attr( "title", "")
			.attr("placeholder", "Type or select" )
			
			.addClass( "custom-combobox-input textbox defaultTextbox" )
			.autocomplete({
			delay: 0,
			minLength: 0,
			source: $.proxy( this, "_source" )
			})
			.tooltip({
			tooltipClass: "ui-state-highlight"
			});
			this._on( this.input, {
			autocompleteselect: function( event, ui ) {
			ui.item.option.selected = true;
			this._trigger( "select", event, {
			item: ui.item.option
			});
			},
			autocompletechange: "_removeIfInvalid"
			});
			},
			_createShowAllButton: function() {
			var input = this.input,
			wasOpen = false;
			$( "<a>" )
			.attr( "tabIndex", -1 )
			.attr( "title", "Show All Items" )
			
			.appendTo( this.wrapper )
			.button({
			icons: {
			primary: "ui-icon-triangle-1-s"
			},
			text: false
			})
			.removeClass( "ui-corner-all" )
			.addClass( "custom-combobox-toggle" )
			.mousedown(function() {
			wasOpen = input.autocomplete( "widget" ).is( ":visible" );
			})
			.click(function() {
			input.focus();
			// Close if already visible
			if ( wasOpen ) {
			return;
			}
			// Pass empty string as value to search for, displaying all results
			input.autocomplete( "search", "" );
			});
			},
			_source: function( request, response ) {
			var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
			response( this.element.children( "option" ).map(function() {
			var text = $( this ).text();
			if ( this.value && ( !request.term || matcher.test(text) ) )
			return {
			label: text,
			value: text,
			option: this
			};
			}) );
			},
			_removeIfInvalid: function( event, ui ) {
			// Selected an item, nothing to do
			if ( ui.item ) {
			return;
			}
			// Search for a match (case-insensitive)
			var value = this.input.val(),
			valueLowerCase = value.toLowerCase(),
			valid = false;
			this.element.children( "option" ).each(function() {
			if ( $( this ).text().toLowerCase() === valueLowerCase ) {
			this.selected = valid = true;
			return false;
			}
			});
			// Found a match, nothing to do
			if ( valid ) {
			return;
			}
			// Remove invalid value
			this.input
			.val( "" )
			.attr( "title", "Select from available display types" )
			.tooltip( "open" );
			this.element.val( "" );
			this._delay(function() {
			this.input.tooltip( "close" ).attr( "title", "" );
			}, 2500 );
			this.input.autocomplete( "instance" ).term = "";
			},
			_destroy: function() {
			this.wrapper.remove();
			this.element.show();
			}
			});
			})( jQuery );
			
			
			 $(function() {
				$( ".combobox" ).combobox();

			});
		
		
