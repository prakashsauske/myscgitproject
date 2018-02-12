 $(document).ready(function() {
	
	 $( "#dialog-VerifyStore" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 100,
			maxHeight: 600,
			width: 400,
			closeOnEscape: false,
			open: function(event, ui) { $(".ui-dialog-titlebar-close").hide();}
			
		});
		
		$("#dialog-VerifyStore").parent().addClass("popupWrapper");
		
		if($('#verify').val()=='Y'  || $('#verify').val()=='S'){
			$('#dialog-VerifyStore').dialog('open').removeClass('visible-hide');
		}
		
		$('.verify').click(function(){
			$( "#dialog-VerifyStore .errorDiv ").addClass('hideBlock');
			$( "#dialog-VerifyStore .errorDiv label").text('');
			$.ajax({
				type : "get",
				url : "verifyStore.htm",
				data : {site:$('.verifyNm').val().trim(),salesOrg: $('#verify').val()=='S'?$('#verify').val():''},
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					if(response!='false' && response!='invalid_salesorg'){
						stopLoading();
						$( "#dialog-VerifyStore" ).dialog('close');
						//<!-- Defect_12074 -->
						//var offset = today.stdTimezoneOffset();
						var offset = moment.tz.guess();
						//if(){
							selectStore(response.split('-')[2].trim(),response.split('-')[3].trim(),response.split('-')[1].trim());
						//}
							$( "#dialog-confirm #yes" ).unbind('click');
							$( "#dialog-confirm #yes" ).click(function(){
								$.ajax({
									type : "get",
									url : "createSession.htm?timeZoneOffSet="+offset,
									data : {site:$('.verifyNm').val().trim()},
									beforeSend : function() {
										startLoading();
									},
									success : function(response) {
										if(response!='false'){
										window.location.href=response.split('-')[1].trim()+"/login/homepage.htm";
										}else{
											$( "#dialog-confirm" ).dialog('close');
											$( "#dialog-VerifyStore").dialog('open').removeClass('visible-hide');
											$( "#dialog-VerifyStore .errorDiv ").removeClass('hideBlock');
											$( "#dialog-VerifyStore .errorDiv label").text('Invalid Store no.');
											$('.verifyNm').focus();
											stopLoading();
											}
										
									},
									error: function(){
										$( "#dialog-confirm" ).dialog('close');
										$( "#dialog-VerifyStore").dialog('open').removeClass('visible-hide');
										$( "#dialog-VerifyStore .errorDiv ").removeClass('hideBlock');
										$( "#dialog-VerifyStore .errorDiv label").text('Invalid Store no.');
										$('.verifyNm').focus();
										stopLoading();
										}
									});
								
							});
						}else if(response=='invalid_salesorg'){
							$( "#dialog-VerifyStore .errorDiv ").removeClass('hideBlock');
							$( "#dialog-VerifyStore .errorDiv label").text('User not authorised.');
							$('.verifyNm').focus();
							stopLoading();
						}
					else{
						$( "#dialog-VerifyStore .errorDiv ").removeClass('hideBlock');
						$( "#dialog-VerifyStore .errorDiv label").text('Invalid Store no.');
						$('.verifyNm').focus();
						stopLoading();
						}
				},
				error : function() {
					$( "#dialog-confirm" ).dialog('close');
					$( "#dialog-VerifyStore").dialog('open').removeClass('visible-hide');
					$( "#dialog-VerifyStore .errorDiv ").removeClass('hideBlock');
					$( "#dialog-VerifyStore .errorDiv label").text('Invalid Store no.');
					$('.verifyNm').focus();
					stopLoading();
				}
			});
			});
  
		$( "#dialog-confirm #no" ).click(function(){
			$( "#dialog-VerifyStore").dialog('open').removeClass('visible-hide');
			$( "#dialog-confirm ").dialog('close');
			$('.verifyNm').focus();
		});
		function selectStore(siteNo,siteNm,salesNm){
			
			$( "#dialog-confirm h4").html('You have selected <strong>'+ siteNo+' - '+siteNm+'</strong> ('+salesNm+')<br><br>Do you want to continue?');
			$( "#dialog-confirm ").dialog('open').removeClass('visible-hide');
			
		};
	//<!-- Defect_12074 -->
	$("#timeZoneOffSet").val(moment.tz.guess());
 });