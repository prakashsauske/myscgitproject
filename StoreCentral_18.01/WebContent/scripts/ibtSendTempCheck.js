$(document).ready(function(){
	var quesLevel=0;
	
	
/*
	if($("#tempFromService").val()!="" && $("#temperature").val()==""){
		//$("#temperatureDiv").show();
		$(".temperatureExist").show();
		temperatureFlag=true;
		$("#wizard").jWizard();
		
	}else if($("#tempFromService").val()!="" ){
		$(".temperatureExist").show();
		temperatureFlag=true;
		$("#wizard").jWizard();
		}
		else{
			$(".temperatureExist").remove();
			temperatureFlag=false;
			$("#wizard").jWizard();
		//$("#temperature").attr("disabled","disabled");
		}*/
	$('#cancelInTemp,#dialog-modalTemperature .ui-dialog-titlebar-close').click(function(){
		$( "#dialog-modalTemperature" ).dialog( "close" );
		window.location.href="../ibtOrder/onPageLoad.htm";
	});
	
	
	
	$('#proceedInTemp').click(function(){
		
		var radioVal=getRadioValue("question");
		
		if(($('#temperature').val()=="" || $.trim(temperature).length == 0)){
			$('.warningMessage h4').text("Please enter the temperature");
			$('.formQuestion').addClass('hideBlock');
			$('.warningMessage h4').removeClass('hideBlock');
		}else if(quesLevel==7){
			//do nothing
			
		}
		else if(quesLevel==1){
			if(radioVal=="no"){
				sendIbtNow();
				$( "#dialog-modalTemperature" ).dialog( "close" );
			}else if(radioVal=="yes"){
				callNextPopup(quesLevel);
				quesLevel=2;
			}else{
				$('.warningMessage h4').text("Please select Yes/No and then click Proceed");
				//$('.formQuestion').addClass('hideBlock');
				$('.warningMessage h4').removeClass('hideBlock');
			}
			
		}else if(quesLevel==2){
			if(radioVal=="no"){
				$('.formQuestion').addClass('hideBlock');
				$('.warningMessage h4').addClass('hideBlock');
				
				$('#temperature').val('');
				$('#temperature').focus();
				
				
				
			}else if(radioVal=="yes"){
				callCancelOrder();
				//$( "#dialog-modalTemperature" ).dialog( "close" );
			}
			
		}else if(quesLevel==4){
			if(radioVal=="yes"){
				callNextPopupPetrol(quesLevel);
				quesLevel=6;
			}else if(radioVal=="no"){

				sendIbtNow();
				
			}
			
		}else if(quesLevel==5){
			if(radioVal=="yes"){
				callCancelOrder();
			}else if(radioVal=="no"){
				$('#ibtSite').attr('action','onPageLoad.htm');
				$('#ibtSite').attr('method','GET');
				$('#ibtSite').submit();
				$( "#dialog-modalTemperature" ).dialog( "close" );
				
			}
			
		}else if(quesLevel==6){
			if(radioVal=="yes"){

				sendIbtNow();
				
			}else if(radioVal=="no"){
				call3rdquestionPetrol(quesLevel);
				quesLevel=5;
				
			}
			
		}else{
			sendIbtNow();
		}
		
		
	});
	
	
	
	$("#temperature").keyup(function(){
		$('.formQuestion').addClass('hideBlock');
		$('.warningMessage h4').addClass('hideBlock');
		$('.errorDiv h4,.formQuestion p').text('');
		
		if ($('#temperature').val() != "" && $.trim($('#temperature').val()).length > 0 && !(isNaN($('#temperature').val()))){
		var dept=$('#deptFromService').val();
		var rankFromUtilService=$('#deptFromService').val();
		tempChange=true;
		
		var salesOrg=$('#userSalesOrg').val();
		var range=$('#tempFromService').val();
		if(salesOrg==1020){
			range="(-15 to 5)";
			}
		var slicedRange=range.slice(1,-1);
		var tempValArray=slicedRange.split(" to ");
		
		if(rankFromUtilService==4){
			/*if(tempValArray[0]<0){
				rank=1;
			}else if(tempValArray[0]>=0 && tempValArray[0]<=5){
				rank=2;
			}else{
				rank=3;
			}*/
			rank=3;
			
		}else{
			rank=rankFromUtilService;
		}
		var question1="";
		var question2="";
		if(rank=="1"){
			question1="Are the frozen products not frozen?";
			question2="Temperature is too high. Will load be rejected?";
		}else if(rank=="2"){
			question1="Is this delivery high risk produce?";
			question2="Incorrect temperature. Will load be rejected?";
		}else if(rank=="3"){
			question1="Is the delivery carcass meat?";
			question2="Incorrect temperature. Will load be rejected?";
		}
		
		if((Number($('#temperature').val())<-99.9 || Number($('#temperature').val())>99.9))
		{
		
			$('.formQuestion p').text('');
			$('.warningMessage h4').text('Please enter the temperature within the range "-99.9 to 99.9"');
			quesLevel=7;
			$('.radioHide').addClass('hideBlock');
			$('.warningMessage h4').removeClass('hideBlock');
			$('.formQuestion').addClass('hideBlock');
			
			
			
			
			
		}else if(salesOrg==1020){
			$('.warningMessage h4').addClass('hideBlock');
			 $('.radioHide').removeClass('hideBlock');
			
			 question1="Does this order contain frozen items?";
			 question2="Are products hard frozen?";
			 question3="Temperature too high. Will entire order be rejected/cancelled?";
			 question4="Temperature too high.Refer to Food Safety Guide and receive rejected items as zero QTY. Ok?";
			 question5="Entire load is being rejected/cancelled due to incorrect temperature. Is this correct?";
			 question6="Do you wish to receive  every item in this order as ZERO Qty?";
			
			 if((Number($('#temperature').val())<tempValArray[1] && Number($('#temperature').val())>tempValArray[0]))
				{
					
					$('.formQuestion p').text(question1);
					$('.errorDiv h4').text('');
					quesLevel=4;
					$('.formQuestion').removeClass('hideBlock');
					$('.formQuestion p').removeClass('hideBlock');
					
					
					
				}else if(Number($('#temperature').val())>=tempValArray[1]){
					focus="temperature";
					$('.errorDiv h4').text('');
					$('.formQuestion p').text(question3);
					quesLevel=5;
					$('.formQuestion').removeClass('hideBlock');
					$('.formQuestion p').removeClass('hideBlock');
					
				}
				else{
					$('.errorDiv h4').text('');
					$('.formQuestion p').text('');
					quesLevel=3;
					}
			 	 
		}else{
			$('.warningMessage h4').addClass('hideBlock');
			 $('.radioHide').removeClass('hideBlock');
		if((Number($('#temperature').val())<tempValArray[1] && Number($('#temperature').val())>tempValArray[0]))
		{
			
			$('.formQuestion p').text(question1);
			$('.errorDiv h4').text('');
			quesLevel=1;
			$('.formQuestion').removeClass('hideBlock');
			$('.formQuestion p').removeClass('hideBlock');
			
			
			
		}else if(Number($('#temperature').val())>=tempValArray[1]){
			focus="temperature";
			$('.errorDiv h4').text('');
			$('.formQuestion p').text(question2);
			quesLevel=1;
			$('.formQuestion').removeClass('hideBlock');
			$('.formQuestion p').removeClass('hideBlock');
			
		}
		else{
			$('.errorDiv h4').text('');
			$('.formQuestion p').text('');
			quesLevel=3;
			}	
	}
		}
	});
	
	
});
	
	 function callNextPopup(quesLevel){

		 	var question3="Items from temperature check vendors are to be rejected due to incorrect temperature. Is this correct? ";

		 			$('.formQuestion p').text('');
					$('.warningMessage h4').text(question3);
					quesLevel=2;
					$('.warningMessage h4').removeClass('hideBlock');
					
					
		 	}

		 	function callCancelOrder(){
		 		
		 		//alert("call cancel");
		 		var goodsSite=$('#storeNoForCancel').val();
		 		var orderNoToCanel=orderNoForTemp;
		 			$( "#dialog-modalTemperature" ).dialog( "close" );
		 			  $.ajax({
		 					type : "GET",
		 					url : "cancelGoodsOrder.htm",
		 					beforeSend: function(){
		 						$('#statusImg').removeClass('loading hideBlock');
		 						$('#statusImg').addClass('loading');
		 						},
		 					data : "orderNoToCanel=" + orderNoToCanel + "&goodsSite=" +goodsSite+"" ,
		 					success : function(response) {
		 						//$('#tempValue').val(response);
		 						$('#statusImg').addClass('loading hideBlock');
		 						$('#statusImg').removeClass('loading');	
		 						if(response=="true"){
		 						$('#alertBox').text("Request for cancelling the Order is successfully submitted");
		 						$( "#dialog-modal" ).dialog( "open" );
		 						$('#okBtn').click(function(e){
		 							$( "#dialog-modal" ).dialog( "close" );
		 							$('#msg').val('');
		 							window.location.href= "../ibtOrder/onPageLoad.htm";
		 							});;
		 							
		 						}
		 						else {
		 							$('#alertBox').text(response);
		 							$( "#dialog-modal" ).dialog( "open" );
		 							$('#okBtn').click(function(e){
		 								$( "#dialog-modal" ).dialog( "close" );
		 								$('#msg').val('');
		 								window.location.href= "../ibtOrder/onPageLoad.htm";
		 								});;
		 								
		 							}
		 								
		 					},
		 					
		 				}); 
		 			
		 		 
		 		
		 	}

		 	function getRadioValue(name) {
		 	    var group = document.getElementsByName(name);

		 	    for (var i=0;i<group.length;i++) {
		 	        if (group[i].checked) {
		 	            return group[i].value;
		 	        }
		 	    }

		 	    return '';
		 	}
		 	
		 	
		 	function sendIbtNow(){
		 		$( "#dialog-modalTemperature" ).dialog( "close" );
		 		var orderNo=orderNoForTemp;
		 		var sourceSupply='';
		 		var temperatureForRecord=$('#temperature').val();
				$.ajax({
					type : "GET",
					url : "sendIBT.htm",
					beforeSend: function(){
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "orderNo=" + orderNo + "&temperatureForRecord="+temperatureForRecord  ,
					success : function(response) {
						var status=response.split(':')[0];
						if(status=='true'){
							$('#alertBox').text(response.split(':')[1]);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$('#ibtSite').attr('action','onPageLoad.htm');
								$('#ibtSite').attr('method','GET');
								$('#ibtSite').submit();
								//$('#change-status').text('Authorized');
								//$('#sendIBTLabel').hide();
								//if($('#recSite').val()==$('#sendSite').val()){
								//$('#receiveOrder').show();
								//}
								//$('#cancelOrder').hide();
								//$('#editdDate').hide();
								//$('#msg').val('');
								});
							$(".closePopUp").click(function(e) {
								//$( "#dialog-modal1" ).dialog( "close" );
								$('#ibtSite').attr('action','onPageLoad.htm');
								$('#ibtSite').attr('method','GET');
								$('#ibtSite').submit();
								  });
							}
						else{
							$('#alertBox').text(response.split(':')[1]);
							$( "#dialog-modal" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal" ).dialog( "close" );
								$('#ibtSite').attr('action','onPageLoad.htm');
								$('#ibtSite').attr('method','GET');
								$('#ibtSite').submit();
								//$('#msg').val('');
								});;
							}
						
					
						 //$('#popupDataDiv').html(response);
						 $('#statusImg').addClass('loading hideBlock');
				         $('#statusImg').removeClass('loading');
					},
				});
		 		
		 		
		 	}
		 	function call3rdquestionPetrol(quesLevel){

		 		 //5th question
		 		 var question3="Temperature too high. Will entire order be rejected/cancelled?";

		 		 			$('.formQuestion p').text('');
		 					$('.warningMessage h4').text(question3);
		 					quesLevel=5;
		 					$('.warningMessage h4').removeClass('hideBlock');
		 					$('.formQuestion p').addClass('hideBlock');
		 					
		 					
		 					
		 		 	}
		 	
		 	function callNextPopupPetrol(quesLevel){

		 		 //2nd question
		 		 	var question="Are products hard frozen?";

		 		 			$('.formQuestion p').text(question);
		 					$('.warningMessage h4').text('');
		 					quesLevel=6;
		 					$('.warningMessage h4').addClass('hideBlock');
		 					$('.formQuestion').removeClass('hideBlock');
		 					$('.formQuestion p').removeClass('hideBlock');
		 					
		 					
		 		 	}
		 	function isNumberKeyTemp(evt)
		    {
		       var charCode = (evt.which) ? evt.which : event.keyCode;
		       if ((charCode > 31 && (charCode< 48 || charCode >57))){
		    	   if(charCode==45 || charCode==46){
		    		   return true;
		    	   }
		    	   return false;
		       }
		          
				
		       return true;
		    }