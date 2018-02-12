$(function() {
	
	setTimeout(function(){
		$('#articleNo').focus();
	},200);
	$('#EAN').click(function(){
		setTimeout(function(){
			$('#articleNo').focus();
		},100);
	});
$('#Description').click(function(){
	setTimeout(function(){
		$('#articleNo').focus();
	},100);	
	});
$('#ArticleNumber').click(function(){
	setTimeout(function(){
		$('#articleNo').focus();
	},100);
});

	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
			$("#menu").menu({
				position : {
					my : "right top",
					at : "right top+20"
				}
			});
			
			 $(document).keypress(function(event) {
				    if (event.which == 13) {
				        event.preventDefault();

						var radioSelected=getRadioValue("articleType");
						
						/*if ($('#articleNo').val() == "Enter article no."
								|| $.trim($('#articleNo').val()).length == 0) {

							$('#msg').html(
									"Oops! please enter an article number");

						} else */
						$('#msg').html(
						"");
						$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
						$("#errorMsgDiv").addClass('tableTitle errorDiv');
						if($('#articleNo').val()==""||$.trim($('#articleNo').val()).length == 0){
							
							$('#msg').html(
							"Please enter a keyword to lookup.");
						}
						else if (radioSelected.toLowerCase()=="articlenumber" && isNaN($('#articleNo').val())) {
						
							$('#msg').html(
									"Please enter an article number");
						}else if(radioSelected.toLowerCase()=="ean" && isNaN($('#articleNo').val())){
							$('#msg').html(
							"Please enter an EAN number");
						} 
						else {
							//new code
						
							$('#buttonVal').val('addArticle');
							//$('#ibtSite').submit();
							$('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							$('#sohSubmit').submit();
						}
					
				     
				        
				    }
			 });
			//new code

			$(".linkBtn2").click(function() {

				var id = $(this).attr("id");

				$('#multiArtIndex').val(id);
				$('#buttonVal').val('multiArticleSelect');
				if ($("#dialog-modal2").dialog("isOpen"))

					$("#dialog-modal2").dialog("close");
				$('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
				$('#sohSubmit').submit();
				/* 
				$("#articleNo").val($("#artNo"+id+"").text());
				$("#artNo").val($("#artNo"+id+"").text()); */

				

			});
			
			$("#goButtonSample2").click(function() {

				  
				$('#articleNo').val($('#vendorDesc2').val());
				$('#buttonVal').val('addArticle');
				//$('#ibtSite').submit();
				$('#statusImg').removeClass('loading hideBlock');
				$('#statusImg').addClass('loading');
				$('#sohSubmit').submit();

				

			});
			
			if($('#articleTypeFromService').val().toLowerCase()=="ean"){
				$("#EAN").click();
			}else if($('#articleTypeFromService').val().toLowerCase()=="articlenumber"){
				$("#ArticleNumber").click();
			}else if($('#articleTypeFromService').val().toLowerCase()=="desc"){
				$("#Description").click();
			}else{
				$("#ArticleNumber").click();
			}

			if ($('#searchResSize').val() == "0"
					|| $('#searchResSize').val() == "1"
					|| $('#searchResSize').val() == ""
					|| $.trim($('#searchResSize').val()).length == 0) {
				/*if ($("#dialog-modal2").dialog("isOpen"))

					$("#dialog-modal2").dialog("close");*/
				

			} else {
				if (!$("#dialog-modal2").dialog("isOpen")) {
					$('#vendorDesc2').val($('#articleNo').val());
					$("#dialog-modal2").parent().addClass("popupWrapper");
					$("#dialog-modal2").dialog("open");
					$("#searchWarning").addClass('hideBlock');
					$("#popupSearch").removeClass('hideBlock');
				}
			}

			/* 
			 $(".selectbtn1").click(function() {
			 var id=$(this).attr("id");
			 $('#multipleArtIndex').val(id);
			 $('#article-search,#overlay-back').fadeOut(500);
			 $('#buttonVal').val('multiArticleSelect');
			 $('#ibtSite').submit();
			
			
			 }); */

			$(".closePopup1").click(function() {
				$('#article-search,#overlay-back').fadeOut(500);

			});

			//new code end

			$("#sohSearch").click(
					function() {
						var radioSelected=getRadioValue("articleType");
						
						/*if ($('#articleNo').val() == "Enter article no."
								|| $.trim($('#articleNo').val()).length == 0) {

							$('#msg').html(
									"Oops! please enter an article number");

						} else */
						$('#msg').html(
						"");
						$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
						$("#errorMsgDiv").addClass('tableTitle errorDiv');
						
						if($('#articleNo').val()==""||$.trim($('#articleNo').val()).length == 0){
							$('#msg').html(
							"Please enter a keyword to lookup.");
						}
						else if (radioSelected.toLowerCase()=="articlenumber" && isNaN($('#articleNo').val())) {

							$('#msg').html(
									"Please enter an article number");
						}else if(radioSelected.toLowerCase()=="ean" && isNaN($('#articleNo').val())){
							$('#msg').html(
							"Please enter an EAN number");
						} 
						else {
							//new code
							$('#buttonVal').val('addArticle');
							
							//$('#ibtSite').submit();
							$('#statusImg').removeClass('loading hideBlock');
							$('#statusImg').addClass('loading');
							$('#sohSubmit').submit();
						}
					});
		});

		$(".secondaryActionBtn").click(function(e) {
			window.history.back();
		});
		
		
		
		$( "#dialog-modal" ).dialog({				
			autoOpen: false,
			modal: true,
			resizable: false,
			minHeight: 120,
			maxHeight: 600,
			width: 350
		});
		//$("#dialog-modal2").parent().addClass("popupWrapper");
		function getRadioValue(name) {
		    var group = document.getElementsByName(name);

		    for (var i=0;i<group.length;i++) {
		        if (group[i].checked) {
		            return group[i].value;
		        }
		    }

		    return '';
		}
