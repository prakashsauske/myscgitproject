var currDateInPlanogram=new Date();
$(document)
		.ready(
				function() {
					
					try{
						$('.time').filter(function(){
							if($(this).text()!='' && $(this).text()!=undefined 
									&& $(this).text()!=null && $(this).text().trim()!=''){
								$(this).text($(this).text().trim().substring(0,2)+':'+$(this).text().trim().substring(2,4));
							}
						});
						
					}catch(err){
						console.log(err);
					}
					
					/*****code for alert box**********/
					$("#dialog-modal1").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 350
					});
					
					$("#dialog-confirmation").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 480
					});
					/*$('.time').filter(function(){var temp=$(this).text().trim().replace('PT','').replace('H',' ').replace('M',' ').replace('S','');
					$(this).text(temp.split(' ')[0]+':'+temp.split(' ')[1]);});*/
					
					$('.ContentTableWrapper').css('overflow-y','inherit');
					
					if($('#tabs-4').find('tr').length==1){$('#tabs-4').find('table').addClass('hideBlock');$('#tabs-4').find('.tableFooter').addClass('hideBlock');}
					if($('#tabs-1').find('tr').length==1){$('#tabs-1').find('table').addClass('hideBlock');$('#tabs-1').find('.tableFooter').addClass('hideBlock');}
					if($('#tabs-2').find('tr').length==1){$('#tabs-2').find('table').addClass('hideBlock');$('#tabs-2').find('.tableFooter').addClass('hideBlock');}
					if($('#tabs-3').find('tr').length==1){$('#tabs-3').find('table').addClass('hideBlock');$('#tabs-3').find('.tableFooter').addClass('hideBlock');}
					
					$("#dialog-modal1").parent().addClass("popupWrapper");
					/*****end of code for alert box**********/

					/** *************code for back button click*** */
					$('#backBtn').click(function() {
						window.location.href = "../login/goingHome.htm";
					});
					/** *************end of code for back button click*** */
					
					
					var prevDate=new Date();;
					var futureDate=new Date(); 
					prevDate.setTime(currDateInPlanogram.getTime()-(86400000));
					futureDate.setTime(currDateInPlanogram.getTime()+(86400000));
					month1=currDateInPlanogram.getMonth()+1;
					month2=prevDate.getMonth()+1;
					month3=futureDate.getMonth()+1;
					$('.currDate').text(currDateInPlanogram.getDate()+"/"+month1+"/"+currDateInPlanogram.getFullYear());
					$('.prevDate').text(prevDate.getDate()+"/"+month2+"/"+prevDate.getFullYear());
					$('.futureDate').text(futureDate.getDate()+"/"+month3+"/"+futureDate.getFullYear());
					$('input[type="checkbox"]').click(function(){
						$(this).parent().parent().parent().find('#receivedEdit-1 input').val((currDateInPlanogram.getDate()<10 ? '0' : '')+currDateInPlanogram.getDate()+"/"+(month1<10 ? '0' : '') +month1+"/"+currDateInPlanogram.getFullYear());
						$(this).parent().parent().parent().find('#receivedEdit-1 input').val((currDateInPlanogram.getDate()<10 ? '0' : '')+currDateInPlanogram.getDate()+"/"+(month1<10 ? '0' : '') +month1+"/"+currDateInPlanogram.getFullYear());
						});
					console.log(currDateInPlanogram.getDate());
					$(".thumbUp")
					.click(
							function() {
								var errorFlag=false;
								var changeFlag=true;
								var str='';
						$(this).parent().parent().parent().parent().find('.index').filter(function(){
						var id=$(this).attr('id');
						var dueDate=$(this).find(':nth-child(2)').text();
                        var comDate=$(this).find(':nth-child(3)').find('input').val();
                        var checkBox=$(this).find(':nth-child(4)').find('input').is(':checked');
                        var orginalVal=$(this).find(':nth-child(5)').next().val();
                        //console.log(id.split('-')[0]+'_'+id.split('-')[1]+dueDate+'_'+comDate+'_'+checkBox);
                        if((comDate!=undefined && orginalVal!=comDate) || checkBox){
                        	changeFlag=false;
                        if(str=='')
                        	str=id.split('-')[0]+'_'+id.split('-')[1]+'_'+dueDate+'_'+comDate+'_'+checkBox;
                        else
                        	str=str+':'+id.split('-')[0]+'_'+id.split('-')[1]+'_'+dueDate+'_'+comDate+'_'+checkBox;
                        
                        var msg='';
                        if(comDate!=undefined && dueDate!=undefined)
                        msg=validateDateRoster(comDate,dueDate);
                        
                        if(msg.trim()!='')
                        	{
                        	$(this).find(':nth-child(3)').find('input').addClass('errorField').attr('title',msg);
                        	errorFlag=true;
                        	}else{
                        		$(this).find(':nth-child(3)').find('input').removeClass('errorField').attr('title','');
                        	}
                        }
							});
						if(errorFlag){
							$(this).parent().parent().parent().find('h4').text('Please correct the highlighted fields.');
							initialiseTooltip();
						}
						else if(changeFlag)
							{
							$(this).parent().parent().parent().find('h4').text('No changes done.');
							}
						else{
							$(this).parent().parent().parent().find('h4').text('');
							console.log(str);
							saveDetail(str);
							/*if(msg!=''){
								$(this).parent().parent().parent().find('h4').text(msg);
							}
							else{
								$(this).parent().parent().parent().find('h4').text('');
							}*/
							
						}
					
				});
					$('form').removeClass('popupWrapper');
				});
function initialiseTooltip() {
	$("input.editNumCell,input.editDateCell").tooltip({
		position : {
			my : "top center-40",
			at : "top center"
		}
	});
	$("input.editNumCell,input.editDateCell").tooltip().off(
			"mouseover mouseout");
}
function saveDetail(details){
	$.ajax({
		type : "get",
		url : "saveDetails.htm",
		data : {details:details},
		//async:false,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//iterateResult(response,pageNumber);
		if(response.trim()==''){
			showInformation("Updated successfully.");//pop up added for shwing updated successfully msg. defect 14594
		}
		else{
			$('.thumbUp:visible').parent().parent().parent().find('h4').text(response);
		}
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});
}
function formateDate(v) {
	if (v.length == 8) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/"
				+ finalDate;
		return finalDate;
	} else {
		return v;
	}
	;
}
function validateDateRoster(rosDate, delDate) {
	var msg = 'Store Active Date';
	var resultMsg='';
	var currentDate = new Date();
	var splittedRosDate = formateDate(rosDate).split('/');
	var splittedDelDate = formateDate(delDate).split('/');
	var actualRosDate = new Date();
	var actualDelDate = new Date();
	var month1 = splittedRosDate[1] - 1;
	var month2 = splittedDelDate[1] - 1;
	actualRosDate.setFullYear(splittedRosDate[2], month1,
			splittedRosDate[0]);
	actualDelDate.setFullYear(splittedDelDate[2], month2,
			splittedDelDate[0]);
	var date1 = new Date();
	date1.setTime(actualDelDate.getTime()/* + (86400000 * 7)*/);
	
	var splittedOne = splittedRosDate[0]
			+ splittedRosDate[1] + splittedRosDate[2];
	var splittedTwo = splittedDelDate[0]
			+ splittedDelDate[1] + splittedDelDate[2];

	if ((splittedRosDate[0] > 31 || splittedRosDate[1] > 12 || splittedRosDate[2] > 9999)
			|| (splittedOne.length != 8 && splittedOne.length != 6)) {
		resultMsg='Please enter a ' + msg
						+ ' date in dd/mm/yyyy format.';
	} else if ((splittedDelDate[0] > 31
			|| splittedDelDate[1] > 12 || splittedDelDate[2] > 9999)
			|| (splittedTwo.length != 8 && splittedTwo.length != 6)) {
		resultMsg=
				'Please enter ' + msg
						+ ' date in dd/mm/yyyy format.';
		
	} else if (actualRosDate.getTime() < currentDate
			.getTime()) {
		resultMsg='Store Active Date must be equal to current or future date.';
		
	} else if (actualRosDate.getTime() > date1.getTime()) {
		resultMsg='Date not allowed, please enter earlier date.';
	} 
		return resultMsg;
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function showInformation(msg) {
	if(msg != '')
		{
	$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
	$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").find('#message').html(msg);
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
			'Information');
	$("#dialog-confirmation").find('#ok').unbind('click');
	$("#dialog-confirmation").find('#ok').click(function() {
		
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
		window.location.href='../planOGram/onPageLoad.htm';
	

		});

	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}
}