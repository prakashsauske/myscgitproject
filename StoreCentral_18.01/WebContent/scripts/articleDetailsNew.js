$(function() {
		
				
				$( "#dialog-display, #dialog-competition, #dialog-clearance" ).dialog({				
					autoOpen: false,
					modal: true,
					resizable: false,
					minHeight: 100,
					maxHeight: 600,
					width: 380
				});
				
				
				$("#dialog-display, #dialog-competition, #dialog-clearance").parent().addClass("popupWrapper");	

				$("#createDisplay").click(function(){ 
					$("#dialog-display" ).dialog("open");
					$("#d2").focus();
				});
				
				$("#createCompetition").click(function(){ 
					$("#dialog-competition" ).dialog("open");
					$("#co2").focus();
				});
				
				$("#createClearance").click(function(){ 
					$("#dialog-clearance" ).dialog("open");
					$("#cl2").focus();
				});
				
			//End		
		
			$(".popupActions .actionBtn, .popupActions .secondaryActionBtn").click(function() {					
				$("#dialog-display").dialog("close");	
				$("#dialog-clearance" ).dialog("close");
				$("#dialog-competition" ).dialog("close");
				$("#dialog-editFunctions").dialog("close");
			});
			
			
			
			// Edit functions popup
			
			$( "#dialog-editFunctions" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				width: 700
			});
			
			$("#dialog-editFunctions").parent().addClass("popupWrapper");	
			
			$(".sectionTitle input").change(function() {					
				$(".innerSectionContent").addClass("hideBlock");	
				tempSelected = "#" + $(this).val() + "content";
				$(tempSelected).removeClass("hideBlock");	
			});
			
			$("#editActions").click(function() {									
				$("#dialog-editFunctions" ).dialog("open");
			});
			
			
			
			
			$( "#dialog-copies" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 100,
				maxHeight: 600,
				width: 250
			});
			
			
			$("#dialog-copies").parent().addClass("popupWrapper");	
			
			$(".printTemplate").click(function(){ 
				$("#dialog-copies" ).dialog("open");				
			});
			
			$("#dialog-copies .popupActions label").click(function(){ 
				$("#dialog-copies" ).dialog("close");				
			});
			
			
			$( "#dialog-email" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 100,
				maxHeight: 600,
				width: 450
			});
			
			
			$("#dialog-email").parent().addClass("popupWrapper");	
			
			$(".email").click(function(){ 
				$("#dialog-email" ).dialog("open");				
			});
			
			$("#dialog-email .popupActions label").click(function(){ 
				$("#dialog-email" ).dialog("close");				
			});
			
			
			
			$( "#dialog-priceHistory" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 100,
				maxHeight: 600,
				width: 450
			});
			
			
			$("#dialog-priceHistory").parent().addClass("popupWrapper");	
			
			$("#otherPriceHistory").click(function(){ 
				$("#dialog-priceHistory" ).dialog("open");				
			});
			
			$("#dialog-priceHistory .popupActions label").click(function(){ 
				$("#dialog-priceHistory" ).dialog("close");				
			});
			
			
		
			//Checkbox DropDown functions
			
			
			$(".actionBtn").click(function(){ 
				$(".selectDropdown").removeClass('active');
				if($(this).parent().hasClass('active')){
					$(this).parent().removeClass('active');
				} else {
					$(this).parent().addClass('active');
				}
			});
			
			
			 $('html').click(function() {
				$(".selectDropdown").removeClass('active');
			});

			$('.selectDropdown .actionBtn').click(function(event){
			   event.stopPropagation();
			});
			
			
			
			
			
		
		
			
			$(document).ready(function(){ 
				var articleTable0Height = $('#articleTable0').height();
				var articleTable1Height = $('#articleTable1').height();
				var articleTable2Height = $('#articleTable2').height();
				var articleTable3Height = $('#articleTable3').height();
				
				var tableHeight = Math.max(articleTable0Height, articleTable1Height, articleTable2Height, articleTable3Height);
				
				document.getElementById("articleTable0").style.height= tableHeight+"px";
				document.getElementById("articleTable1").style.height= tableHeight+"px";
				document.getElementById("articleTable2").style.height= tableHeight+"px";
				document.getElementById("articleTable3").style.height= tableHeight+"px";
			});
			
			
			$( "#dialog-modal" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 800
			});
			
			$("#dialog-modal").parent().addClass("popupWrapper");
			
			$("#salesHistory").click(function() {									
				$("#dialog-modal" ).dialog("open");
			});
			
		
			$(".accordionWrapper").accordion({
				header:"h3",
				collapsible: true, 
				active: true,
				heightStyle: "content" 
			});
			
			$("#tabs, #itemInfo, #mainTabs, #editTabs, .filterTabs").tabs();
			
			$( "#editTabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
			$( "#editTabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
			
			
		
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			$(".buttonMenu").menu({ position: { my: "left top", at: "left+3 top+23" } });
			
			
			
			
			// code for Open orders requirement
			
			$("#openOrders").tabs();
			
			$( "#dialog-openOrders" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 200,
				maxHeight: 600,
				width: 700
			});
			
			
			
			$("#openOrdersLink").click(function() {	
				$("#dialog-openOrders").parent().addClass("popupWrapper");
				$("#dialog-openOrders" ).dialog("open");
			});
			
			
			
			
			
			// code for add to list			
			$( "#dialog-listDisplay, #dialog-listClearance, #dialog-listCompetition" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 100,
				maxHeight: 600,
				width: 400
			});			
			$( "#dialog-addToDraft" ).dialog({				
				autoOpen: false,
				modal: true,
				resizable: false,
				minHeight: 100,
				maxHeight: 600,
				width: 250
			});
			
			$("#addToDisplay").click(function() {	
				$("#dialog-listDisplay").parent().addClass("popupWrapper");
				$("#dialog-listDisplay" ).dialog("open");
			});
			
			$("#addToClearance").click(function() {	
				$("#dialog-listClearance").parent().addClass("popupWrapper");
				$("#dialog-listClearance" ).dialog("open");
			});
			
			$("#addToCompetition").click(function() {	
				$("#dialog-listCompetition").parent().addClass("popupWrapper");
				$("#dialog-listCompetition" ).dialog("open");
			});
			
			$(".popupActions .actionBtn, .popupActions .secondaryActionBtn ").click(function() {					
				$("#dialog-listDisplay").dialog("close");
				$("#dialog-listClearance").dialog("close");
				$("#dialog-listCompetition").dialog("close");
				$("#dialog-addToDraft" ).dialog("close");
			});
			
			$("#addToDraftOrder").click(function() {	
				//Add to draft order
				$("#dialog-addToDraft").parent().addClass("popupWrapper");
				$("#dialog-addToDraft" ).dialog("open");
				
			});
			
		
			// Redirection code
			$("#redirectDisplay").click(function() {	
				location.href='InStorePromo_Display_BR1.2.html'				
			});
			
			$("#redirectClearance").click(function() {	
				location.href='InStorePromo_Clearance_BR1.2.html'				
			});
			
			$("#redirectCompetition").click(function() {	
				location.href='InStorePromo_Competition_BR1.2.html'				
			});
			
			
			$(".inputDate").datepicker({
				firstDay: 1,
				zIndex:50
			});
			
			/*when edit button is clicked displays input box in editable cells*/
			$(".editRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				tempParent = $(this).parents().eq(1).attr('id').split('-')[0];
				
				if(tempParent == "rowExpiry") {
				 
					$(("#rowExpiry-").concat(id)).addClass('rowHighlight');
					
					$(("#aisleEdit-").concat(id)).removeClass('hideBlock');
					$(("#aisle-").concat(id)).addClass('hideBlock');
					
					$(("#qtyEdit-").concat(id)).removeClass('hideBlock');
					$(("#qty-").concat(id)).addClass('hideBlock');
					
					$(("#expDateEdit-").concat(id)).removeClass('hideBlock');
					$(("#expDate-").concat(id)).addClass('hideBlock');
									
					$(("#saveExpiryRecord-").concat(id)).removeClass('hideBlock');
					$(("#editExpiryRecord-").concat(id)).addClass('hideBlock');
					
				} else if (tempParent == "rowLTO") {
				
					$(("#rowLTO-").concat(id)).addClass('rowHighlight');
					
					$(("#typeLTOEdit-").concat(id)).removeClass('hideBlock');
					$(("#typeLTO-").concat(id)).addClass('hideBlock');
					
					$(("#aisleLTOEdit-").concat(id)).removeClass('hideBlock');
					$(("#aisleLTO-").concat(id)).addClass('hideBlock');
					
					$(("#locLTOEdit-").concat(id)).removeClass('hideBlock');
					$(("#locLTO-").concat(id)).addClass('hideBlock');
					
					$(("#notesLTOEdit-").concat(id)).removeClass('hideBlock');
					$(("#notesLTO-").concat(id)).addClass('hideBlock');
					
					$(("#activeLTOEdit-").concat(id)).removeClass('hideBlock');
					$(("#activeLTO-").concat(id)).addClass('hideBlock');
												
					$(("#saveLTORecord-").concat(id)).removeClass('hideBlock');
					$(("#editLTORecord-").concat(id)).addClass('hideBlock');
				
				}
				
			});
			
			/*when save button is clicked displays input box is disabled*/
			$(".saveRowBtn").click(function(){
				var id = (this.id).split('-')[1];
				tempParent = $(this).parents().eq(1).attr('id').split('-')[0];
				
				if(tempParent == "rowExpiry") {
				
					$(("#rowExpiry-").concat(id)).removeClass('rowHighlight');	
					
					$(("#aisleEdit-").concat(id)).addClass('hideBlock');
					$(("#aisle-").concat(id)).removeClass('hideBlock');
					
					$(("#qtyEdit-").concat(id)).addClass('hideBlock');
					$(("#qty-").concat(id)).removeClass('hideBlock');
					
					$(("#expDateEdit-").concat(id)).addClass('hideBlock');
					$(("#expDate-").concat(id)).removeClass('hideBlock');
					
					$(("#saveExpiryRecord-").concat(id)).addClass('hideBlock');
					$(("#editExpiryRecord-").concat(id)).removeClass('hideBlock');
					
				} else if (tempParent == "rowLTO") {
					
					$(("#rowLTO-").concat(id)).removeClass('rowHighlight');	
					
					$(("#typeLTOEdit-").concat(id)).addClass('hideBlock');
					$(("#typeLTO-").concat(id)).removeClass('hideBlock');
					
					$(("#aisleLTOEdit-").concat(id)).addClass('hideBlock');
					$(("#aisleLTO-").concat(id)).removeClass('hideBlock');
					
					$(("#locLTOEdit-").concat(id)).addClass('hideBlock');
					$(("#locLTO-").concat(id)).removeClass('hideBlock');
					
					$(("#notesLTOEdit-").concat(id)).addClass('hideBlock');
					$(("#notesLTO-").concat(id)).removeClass('hideBlock');
					
					$(("#activeLTOEdit-").concat(id)).addClass('hideBlock');
					$(("#activeLTO-").concat(id)).removeClass('hideBlock');
					
					$(("#saveLTORecord-").concat(id)).addClass('hideBlock');
					$(("#editLTORecord-").concat(id)).removeClass('hideBlock');
				
				
				}
			});
			
			// Code to show and hide add Aisle			
			$("#addActionBtn").click(function(){ 
				$("#tableAddAction").toggleClass('hideBlock');										
			});	
			$("#addLTOBtn").click(function(){ 
				$("#tableLTOAction").toggleClass('hideBlock');										
			});	
			
			
			
			$(".formActions .actionBtn, .formActions .secondaryActionBtn").click(function(){ 
				$("#tableAddAction").addClass('hideBlock');										
			});	
			
			
			// Code to show history	
			$("#fullHistory").click(function(){ 
				$("#beforeHistory").addClass('hideBlock');	
				$("#afterHistory").removeClass('hideBlock');					
			});	
			
			
			
			
			
		});


