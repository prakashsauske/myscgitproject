$( document ).ready(function() {
		
	    $( "#storeTab" ).tabs();
	    $( "#sellPriceTab" ).tabs();
	    $( "#inventoryTab" ).tabs();
		$( "#dnArrow" ).click(function(){
			$( "#upArrow" ).show();
			$( "#dnArrow" ).hide();
			$( "#quantityDetails" ).show();
		});
		$( "#upArrow" ).click(function(){
			$( "#dnArrow" ).show();
			$( "#upArrow" ).hide();
			$( "#quantityDetails" ).hide();
		});
		$( "#dnArrow1" ).click(function(){
			$( "#upArrow1" ).show();
			$( "#dnArrow1" ).hide();
			$( "#quantityConversion" ).show();
		});
		$( "#upArrow1" ).click(function(){
			$( "#dnArrow1" ).show();
			$( "#upArrow1" ).hide();
			$( "#quantityConversion" ).hide();
		});
		$( "#dnArrow2" ).click(function(){
			$( "#upArrow2" ).show();
			$( "#dnArrow2" ).hide();
			$( "#GlobalTrade" ).show();
		});
		$( "#upArrow2" ).click(function(){
			$( "#dnArrow2" ).show();
			$( "#upArrow2" ).hide();
			$( "#GlobalTrade" ).hide();
		});
		$( "#dnArrow3" ).click(function(){
			$( "#upArrow3" ).show();
			$( "#dnArrow3" ).hide();
			$( "#storeTab" ).show();
		});
		$( "#upArrow3" ).click(function(){
			$( "#dnArrow3" ).show();
			$( "#upArrow3" ).hide();
			$( "#storeTab" ).hide();
		});
		$( "#dnArrow4" ).click(function(){
			$( "#upArrow4" ).show();
			$( "#dnArrow4" ).hide();
			$( "#freshFood" ).show();
		});
		$( "#upArrow4" ).click(function(){
			$( "#dnArrow4" ).show();
			$( "#upArrow4" ).hide();
			$( "#freshFood" ).hide();
		});
		$( "#dnArrow5" ).click(function(){
			$( "#upArrow5" ).show();
			$( "#dnArrow5" ).hide();
			$( "#packBreakDown" ).show();
		});
		$( "#upArrow5" ).click(function(){
			$( "#dnArrow5" ).show();
			$( "#upArrow5" ).hide();
			$( "#packBreakDown" ).hide();
		});
		$( "#dnArrow6" ).click(function(){
			$( "#upArrow6" ).show();
			$( "#dnArrow6" ).hide();
			$( "#posData" ).show();
		});
		$( "#upArrow6" ).click(function(){
			$( "#dnArrow6" ).show();
			$( "#upArrow6" ).hide();
			$( "#posData" ).hide();
		});
		$( "#dnArrow7" ).click(function(){
			$( "#upArrow7" ).show();
			$( "#dnArrow7" ).hide();
			$( "#productNotes" ).show();
		});
		$( "#upArrow7" ).click(function(){
			$( "#dnArrow7" ).show();
			$( "#upArrow7" ).hide();
			$( "#productNotes" ).hide();
		});
		$( "#dnArrow8" ).click(function(){
			$( "#upArrow8" ).show();
			$( "#dnArrow8" ).hide();
			$( "#ArticleSite" ).show();
		});
		$( "#upArrow8" ).click(function(){
			$( "#dnArrow8" ).show();
			$( "#upArrow8" ).hide();
			$( "#ArticleSite" ).hide();
		});
		$( "#dnArrow10" ).click(function(){
			$( "#upArrow10" ).show();
			$( "#dnArrow10" ).hide();
			$( "#inventoryTab" ).show();
		});
		$( "#upArrow10" ).click(function(){
			$( "#dnArrow10" ).show();
			$( "#upArrow10" ).hide();
			$( "#inventoryTab" ).hide();
		});
		$("#arrow").click(function(){
		$("#userProfile").toggle();
		});
		$( "#dnArrow13" ).click(function(){
			$( "#upArrow13" ).show();
			$( "#dnArrow13" ).hide();
			$( "#articleHierarchy" ).show();
		});
		$( "#upArrow13" ).click(function(){
			$( "#dnArrow13" ).show();
			$( "#upArrow13" ).hide();
			$( "#articleHierarchy" ).hide();
		});
	  });