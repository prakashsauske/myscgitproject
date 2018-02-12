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
	$('#cancelInTemp').click(function(){
		$( "#dialog-modalTemperature" ).dialog( "close" );
	});
	
	
	
	$('#proceedInTemp').click(function(){
		//alert("proceed click");
		
		var radioVal=getRadioValue("questionibt");
		//alert('radioVal'+radioVal);
		//alert('quesLevel'+quesLevel);
		if(($('#temperatureIBT').val()=="" || $.trim(temperatureIBT).length == 0)){
			$('.warningMessage h4').text("Please enter the temperature");
			$('.formQuestion').addClass('hideBlock');
			$('.warningMessage h4').removeClass('hideBlock');
		}else if(quesLevel==7){
			//do nothing
			
		}
		else if(quesLevel==1){
			if(radioVal=="no"){
				//alert("level 1 - clicked no");
				sendIbtNow();
				
			}else if(radioVal=="yes"){
				//alert('calling callnext pop up()');
				callNextPopup(quesLevel);
				quesLevel=2;
			//	alert('quesLevel'+quesLevel);
			}else{
				$('.warningMessage h4').text("Please select Yes/No and then click Proceed");
				//$('.formQuestion').addClass('hideBlock');
				$('.warningMessage h4').removeClass('hideBlock');
			}
			
		}else if(quesLevel==2){
			//alert("level 2");
			if(radioVal=="no"){
			//	alert("level 2 no");
				$('.formQuestion').addClass('hideBlock');
				$('.warningMessage h4').addClass('hideBlock');
				
				$('#temperatureIBT').val('');
				$('#temperatureIBT').focus();
				
				
				
			}else if(radioVal=="yes"){
			//	alert("calling cancel order");
				callCancelOrderIBT();
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
				callCancelOrderIBT();
			}else if(radioVal=="no"){

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
	
	
	
	$("#temperatureIBT").keyup(function(){
		$('.formQuestion').addClass('hideBlock');
		$('.warningMessage h4').addClass('hideBlock');
		$('.errorDiv h4,.formQuestion p').text('');
		/*$('#ui-id-2,#ui-id-3,#prev,#next,#receiveAmount,#receiveDocket').click(function(){
			$('#next').addClass('jw-button-next');
			if(tempChange==false)
			$('.errorDiv h4').text('');
		});*/
		if ($('#temperatureIBT').val() != "" && $.trim($('#temperatureIBT').val()).length > 0 && !(isNaN($('#temperatureIBT').val()))){
		//alert("temp blur func");
		//var dept=$('#deptFromServiceIBT').val();
		tempChange=true;
		//alert("dept"+dept);
		//dept="005,006";
		//alert("dept"+dept);
		//var deptArray=dept.split(",");
	
		var salesOrg=$('#userSalesOrg').val();
		var range=$('#tempFromService').val();
		if(salesOrg==1020){
			range="(-15 to 5)";
			}
		var slicedRange=range.slice(1,-1);
		var tempValArray=slicedRange.split(" to ");
		
		var rank=$('#deptFromServiceIBT').val();
		/*for(var i=0;i<deptArray.length;i++){
			if(deptArray[i]=="003" || deptArray[i]=="004" || deptArray[i]=="008" || deptArray[i]=="070" || deptArray[i]=="012"){
				rank=1;
			//	alert("rank=1");
				break;
			}else if(deptArray[i]=="006"){
				if(rank>2){
					rank=2;
				}
				
			}else if(deptArray[i]=="005"){
				if(rank>3){
					rank=3;
				}
					
			}
		}*/
		if(rank==4){
			/*if(tempValArray[0]<0){
				rank=1;
			}else if(tempValArray[0]>=0 && tempValArray[0]<=5){
				rank=2;
			}else{
				rank=3;
			}*/
			rank=3;
			
		}
		//alert("rank ="+rank);
		var question1="";
		var question2="";
		if(rank=="1"){
			//alert("rank==1");
			question1="Are the frozen products not frozen?";
			question2="Temperature is too high. Will load be rejected?";
		}else if(rank=="2"){
			//alert("rank==2");
			question1="Is this delivery high risk produce?";
			question2="Incorrect temperature. Will load be rejected?";
		}else if(rank=="3"){
			//alert("rank==3");
			question1="Is the delivery carcass meat?";
			question2="Incorrect temperature. Will load be rejected?";
		}
		
		if((Number($('#temperatureIBT').val())<-99.9 || Number($('#temperatureIBT').val())>99.9))
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
			
			 
			 
			 
			 if((Number($('#temperatureIBT').val())<tempValArray[1] && Number($('#temperatureIBT').val())>tempValArray[0]))
				{
				 
					$('.formQuestion p').text(question1);
					$('.errorDiv h4').text('');
					quesLevel=4;
					$('.formQuestion').removeClass('hideBlock');
					$('.formQuestion p').removeClass('hideBlock');
					
					
					
				}else if(Number($('#temperatureIBT').val())>=tempValArray[1]){
					focus="temperatureIBT";
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
			 
		if((Number($('#temperatureIBT').val())<tempValArray[1] && Number($('#temperatureIBT').val())>tempValArray[0]))
		{
			
			$('.formQuestion p').text(question1);
			$('.errorDiv h4').text('');
			quesLevel=1;
			$('.formQuestion').removeClass('hideBlock');
			$('.formQuestion p').removeClass('hideBlock');
			
			
			
		}else if(Number($('#temperatureIBT').val())>=tempValArray[1]){
			focus="temperatureIBT";
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
	
	
	 function callNextPopup(quesLevel){
		
		 	var question3="Items from temperature check vendors are to be rejected due to incorrect temperature. Is this correct? ";

		 	//$('.callCancel').attr('onclick','callCancelOrderIBT();');
		 			$('.formQuestion p').text('');
		 			$('.warningMessage h4').removeClass('hideBlock');
					$('.warningMessage h4').text(question3);
					quesLevel=2;
					//alert("q3"+question3);
					$('.warningMessage h4').removeClass('hideBlock');
					
					
		 			//$('.popMessagetemp').text(question3);
		 			//$('.confirmNoTemp').attr('onclick','$( "#dialog-temperature" ).dialog("close");$("#temperature").focus()');
		 			//$('.confirmYesTemp').attr('onclick','callCancelOrderIBT();');
		 			
					//alert('quesLevel 2'+quesLevel);
		 	}

		 	function callCancelOrderIBT(){
		 		
		 		//alert("call cancel");
		 		//var orderNoToCanel=orderNoForTemp;
		 		var goodsSite=$('#storeNoForCancel').val();
		 		var orderNoToCanel=$('#orderNo').val();
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
		 						$( "#dialog-modal1" ).dialog( "open" );
		 						$('#okBtn').click(function(e){
		 							$( "#dialog-modal1" ).dialog( "close" );
		 							$('#msg').val('');
		 							window.location.href= "../order/backToOrderDetails.htm";
		 							});;
		 							
		 						}
		 						else {
		 							$('#alertBox').text(response);
		 							$( "#dialog-modal1" ).dialog( "open" );
		 							$('#okBtn').click(function(e){
		 								$( "#dialog-modal1" ).dialog( "close" );
		 								$('#msg').val('');
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
		 	
		 	
		 	function sendIbtNow(){
		 		$( "#dialog-modalTemperature" ).dialog( "close" );
		 		var vendorDesc='';
				var sourceSupply='';
				var temperatureForRecord=$('#temperatureIBT').val();
				$.ajax({
					type : "GET",
					url : "sendIBT.htm",
					beforeSend: function(){
						$('#statusImg').removeClass('loading hideBlock');
						$('#statusImg').addClass('loading');
						},
					data : "vendorDesc=" + vendorDesc + "&temperatureForRecord="+temperatureForRecord  ,
					success : function(response) {
						var status=response.split(':')[0];
						if(status=='true'){
							$('#alertBox').text(response.split(':')[1]);
							$('.hideForOpenIBT').addClass('hideBlock');
							$('#showRecQty').addClass('lastColumn');
							$('#colSpan').attr('colspan','7');
							$( "#dialog-modal1" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								$('#change-status').text('Authorised');
								$('#sendIBTLabel').hide();
								if($('#recSite').val()==$('#sendSite').val()){
								$('#receiveOrder').show();
								}
								
								$('#cancelOrder').hide();
								$('#editdDate').hide();
								//$('#msg').val('');
								});
							$(".closePopUp").click(function(e) {
								//$( "#dialog-modal1" ).dialog( "close" );
								$('#change-status').text('Authorised');
								$('#sendIBTLabel').hide();
								if($('#recSite').val()==$('#sendSite').val()){
								$('#receiveOrder').show();
								}
								
								$('#cancelOrder').hide();
								$('#editdDate').hide();
							
												 
								  });
							}
						else{
							$('#alertBox').text(response.split(':')[1]);
							$( "#dialog-modal1" ).dialog( "open" );
							$('#okBtn').click(function(e){
								$( "#dialog-modal1" ).dialog( "close" );
								
								//$('#msg').val('');
								});
							}
						
					
						 //$('#popupDataDiv').html(response);
						 $('#statusImg').addClass('loading hideBlock');
				         $('#statusImg').removeClass('loading');
					},
				});
		 		
		 		
		 	}
		 	

});
//end of document ready
		 	