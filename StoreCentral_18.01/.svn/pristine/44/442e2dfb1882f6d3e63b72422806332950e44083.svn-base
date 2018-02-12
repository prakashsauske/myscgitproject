$(document).ready(function() {
	$("#lookup-field").click(function() {
		// window.location.href="lookup.html"
	});
	$("#receive-field").click(function() {
		// window.location.href="receive.html"
	});
	$("#order-field").click(function() {
		// window.location.href="order.html"
	});
	$("#about-field").click(function() {
		// window.location.href="about.html"
	});
	/*$('.homeLinkTextWrapper').click(function() {
		var id = $(this).attr("class").split(" ")[1];
		// alert(id);
		$("." + id + " .first-search").each(function() {
			if (!($(this).hasClass('hideBlock'))) {
				window.location.href = $(this).find('a').attr('href');
				return false;
			}
		});

	});*/
	$(document).keypress(function(event) {
	    if (event.which == 13) {
	        event.preventDefault();	
	        if($('#dialog-VerifyITAdminStore').dialog('isOpen')){
	        $('#dialog-VerifyITAdminStore .verify').click();
	        }else if($( "#dialog-confirm").dialog('isOpen')){
	        	$( "#dialog-confirm #yes").click();
	        }else if($( "#dialog-changePassword").dialog('isOpen')){
	        	$( "#dialog-changePassword #changePassword").click();
	        }else if($( "#dialog-secretQuestion").dialog('isOpen')){
	        	$( "#dialog-secretQuestion #setSecQues").click();
	        }else if($("#dialog-confirmation_forPrimary").dialog('isOpen')){
	        	$( "#dialog-confirmation_forPrimary #ok").click();
	        }
	    }
	    });

	 
	 $( "#dialog-VerifyITAdminStore" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 100,
			maxHeight: 600,
			width: 400,
			closeOnEscape: false,
//			open: function(event, ui) { //$(".ui-dialog-titlebar-close").hide();
//				}
			
		});
		
		$("#dialog-VerifyITAdminStore").parent().addClass("popupWrapper");
		
		if($('#verify').val()=='Y'){
			$('#dialog-VerifyITAdminStore').dialog('open').removeClass('visible-hide');
		}
		
		$('.verify').click(function(){
			$( "#dialog-VerifyITAdminStore .errorDiv ").addClass('hideBlock');
			$( "#dialog-VerifyITAdminStore .errorDiv label").text('');
			$.ajax({
				type : "get",
				url : "verifyItAdminStore.htm",
				data : {site:$('.verifyNm').val().trim()},
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					if(response!='false' && response!='invalid_salesorg'){
						$('#dialog-VerifyITAdminStore').dialog('close');
						//if(){
							setStore(response.split('-')[2].trim(),response.split('-')[3].trim(),response.split('-')[1].trim());
						//}
							$( "#dialog-confirm #yes" ).unbind('click');
							$( "#dialog-confirm #yes" ).click(function(){
								console.log('itA');
								$.ajax({
									type : "get",
									url : "createSession.htm",
									data :{site:$('.verifyNm').val().trim()},
									beforeSend : function() {
										startLoading();
									},
									success : function(response) {
										stopLoading();
										if(response!='false'){
										window.location.href='../../'+response.split('-')[1].trim()+"/login/goingHome.htm?disableKey=Change";
										}else{
											$( "#dialog-confirm" ).dialog('close');
											$( "#dialog-VerifyITAdminStore").dialog('open').removeClass('visible-hide');
											$( "#dialog-VerifyITAdminStore .errorDiv ").removeClass('hideBlock');
											$( "#dialog-VerifyITAdminStore .errorDiv label").text('Invalid Store no.');
											$('.verifyNm').focus();
											}
										
									},
									error: function(){
										stopLoading();
										$( "#dialog-confirm" ).dialog('close');
										$( "#dialog-VerifyITAdminStore").dialog('open').removeClass('visible-hide');
										$( "#dialog-VerifyITAdminStore .errorDiv ").removeClass('hideBlock');
										$( "#dialog-VerifyITAdminStore .errorDiv label").text('Invalid Store no.');
										$('.verifyNm').focus();
										}
									});
								
							});
						}else if(response=='invalid_salesorg'){
							$( "#dialog-VerifyITAdminStore .errorDiv ").removeClass('hideBlock');
							$( "#dialog-VerifyITAdminStore .errorDiv label").text('User not authorised.');
							$('.verifyNm').focus();
						}
					else{
						$( "#dialog-VerifyITAdminStore .errorDiv ").removeClass('hideBlock');
						$( "#dialog-VerifyITAdminStore .errorDiv label").text('Invalid Store no.');
						$('.verifyNm').focus();
						}
					stopLoading();
				},
				error : function() {
					stopLoading();
					$( "#dialog-confirm" ).dialog('close');
					$( "#dialog-VerifyITAdminStore").dialog('open').removeClass('visible-hide');
					$( "#dialog-VerifyITAdminStore .errorDiv ").removeClass('hideBlock');
					$( "#dialog-VerifyITAdminStore .errorDiv label").text('Invalid Store no.');
					$('.verifyNm').focus();
					stopLoading();
				}
			});
			});
  
		
		function setStore(siteNo,siteNm,salesNm){
			stopLoading();
			$( "#dialog-confirm h4").html('You have selected <strong>'+ siteNo+' - '+siteNm+'</strong> ('+salesNm+')<br><br>Do you want to continue?');
			$( "#dialog-confirm ").dialog('open').removeClass('visible-hide');
			
		};
  /*$(".login-btn").click(function() {
   $('#msg-field-user').html('').fadeIn(500);
	  $('#msg-field-invalid').html('').fadeIn(500);
	  $('#msg-field-pass').html('').fadeIn(500);
  if($('#user-input').val()=="")
  {
   $('#msg-field-user').html('Username should not be empty').fadeIn(500);
  }
   if($('#pass-input').val()=="")
  {
   $('#msg-field-pass').html('Password should not be empty').fadeIn(500);
  }
  else if($('#user-input').val()=="Woolworths" && $('#pass-input').val()=="pass@123")
  {
 window.location.href="WoWHome.html"
  }
 else
 {
    $('#msg-field-invalid').html('Invalid Credentials').fadeIn(500);

 }
});*/
		$('.homeLinkBox ').removeClass('hideBlock').show();
		
		try{
		var nofifyObj=$.parseJSON($('#notifyData').text());
		if(nofifyObj!=undefined && nofifyObj.data!=undefined && nofifyObj.data!=null && nofifyObj.data!=null && nofifyObj.data.length>0){
			$('#notifyArea').find('.contentList').html('');
			var content='';
			for(var i in nofifyObj.data){
				var itm=nofifyObj.data[i];
				if(itm.exp_in_days-1>=0){
					var expStr='';
					if(itm.exp_in_days-1==0){
						expStr='going to expire today.';
					}else if(itm.exp_in_days-1<0){
						expStr='expired <i>'+Math.abs(itm.exp_in_days-1)+'</i> days before.';
					}else{
					    expStr='due to expire in <i>'+(itm.exp_in_days-1)+'</i> day(s). ';
					}
					if(isAdminRole(itm.roleId)){
						content+='<p class="description"><i>'+itm.roleDesc+'</i> access to stores is '+expStr+'</p><br>';
					}else{
						content+='<p class="description"><i>'+itm.roleDesc+'</i> access to store <i>'+itm.siteId+' - '+itm.siteName+'</i> is '+expStr+'</p><br>';
					}
				}
			}
			if(content!=''){
				$('#notifyArea').find('.contentList').html(content);
				$('#notifyArea').removeClass('hideBlock');
			}
		}
		
		}catch(err){
			console.log(err);
		}
		
		if($('#ngboPilotStore').val() == 'Y'
			&& $("#directHome").val() != "" ){
			sessionStorage.removeItem("password");		
			getEncSAPPassword();
		}

});

function rearrangeShortCuts(){
	var $htmlCon=$('.homeLinkBoxesNew');
	var index=1;
    $('.homeLinkBoxes .homeLinkBox:visible').each(function(){
    	
    	if(index==0){
    		$htmlCon.append('<div class="homeBorderHorz"></div>');
    		index=1;
    	}
    	
    	if(index==3){
    		$htmlCon.append('<div class="homeLinkBox borderLast" >'+$(this).html()+'</div>');
    		index=0;
    	}else{
    		$htmlCon.append('<div class="homeLinkBox" >'+$(this).html()+'</div>');
    		index++;
    	}
    	
    });
    $('.homeLinkBoxes').addClass('hideBlock');
    $('.homeLinkBoxesNew').removeClass('hideBlock');
}