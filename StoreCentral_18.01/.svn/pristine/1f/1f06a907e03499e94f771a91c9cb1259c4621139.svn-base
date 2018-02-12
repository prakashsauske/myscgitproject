$(document).ready(function(){
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	//Popup formatting

	$( "#dialog-modal" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 100,
		maxHeight: 600,
		width: 400
	});
	
	$("#dialog-modal").parent().addClass("popupWrapper");
	
	$("#tabs").tabs({
		collapsible: true,
		active: false
	});
	
	$('.labelText').click(function(){
		$('.'+$(this).attr('id').split('_')[0]+'Total_'+$(this).attr('id').split('_')[1]).text($('.'+$(this).attr('id').split('_')[0]+'_'+$(this).attr('id').split('_')[1]+':checked').length);
		});
	
	if($('#salesOrgExcludeMap').val()!=''){
		for(var i=0;i<=$('#salesOrgExcludeMap').val().split(',').length;i++){
			if($('#salesOrgExcludeMap').val().split(',')[i]!=undefined && $('#salesOrgExcludeMap').val().split(',')[i]!='')
			{
			var id=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[0].trim();
			var code=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[1].trim();
			$('#orderList_'+id+'_'+code).prop('checked',false);
			$('#lookupList_'+id+'_'+code).prop('checked',false);
			$('#reportsList_'+id+'_'+code).prop('checked',false);
			$('#stockManagementList_'+id+'_'+code).prop('checked',false);
			$('#pricingList_'+id+'_'+code).prop('checked',false);
			$('#otherToolsList_'+id+'_'+code).prop('checked',false);
			$('#ticketingList_'+id+'_'+code).prop('checked',false);
			$('#adminList_'+id+'_'+code).prop('checked',false);
			$('#promoList_'+id+'_'+code).prop('checked',false);
			$('#routinesList_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#alertList_'+id+'_'+code+'_'+type).prop('checked',false);
			}
			}
		}
	//back button click function
	$('.backBtn').click(function(){
		window.location.href="../login/goingHome.htm";
	});
	
	//save button click function
	$('.saveBtn').click(function(){
		var i=1;
		var string="";
		$("input:radio[name=selected-checkbox]:visible").filter(function(){
		$(this).attr('id',i++);
		});
		$("input:radio[name=selected-checkbox]:visible").filter(function(){
		if(string=="")
		string=$(this).val();
		else
		string=string+","+$(this).val();
		console.log(string);
		});
		callAjax("savePreferences.htm",{"userSelectedPreference":string},"get");
	});
	
	//cancel button click function
	$('.cancelBtn').click(function(){
		window.location.href='../login/goingHome.htm';
	});
	
	//preview button click function
	$('.previewBtn').click(function(){
		var i=1;
		var string="";
		$("input:radio[name=selected-checkbox]:visible").filter(function(){
		$(this).attr('id',i++);
		});
		$("input:radio[name=selected-checkbox]:visible").filter(function(){
		if(string=="")
		string=$(this).val()+':'+$(this).next().text().trim();
		else
		string=string+","+$(this).val()+':'+$(this).next().text().trim();
		console.log(string);
		});
		$('#iframeData').prop('src','showHomePreview.htm?userSelectedPreference='+string.trim());  
		$( "#dialog-modal-userPreview" ).dialog('open');
		//var data=$('#userPreferences').serialize();
		//callAjax('showHomePreview.htm',data,'get');
	});
	
	//add button click function
	$('.addBtn').click(function(){
		if($('#userPreferenceSize').val()!=$("input:radio[name=selected-checkbox]:visible").length && ($('.un-selected-list input:checkbox[name=unselected-checkbox]:checked').length-$('.un-selected-list input:checkbox[name=unselected-checkbox]:checked:disabled').length)+$("input:radio[name=selected-checkbox]:visible").length<=$('#userPreferenceSize').val())
		{
			$('.un-selected-list input:checkbox[name=unselected-checkbox]:checked').filter(function(){
			addedClass=$(this).val();
			addedDesc=$(this).next().text().trim();
			/*$('.selected-list').filter(function(){
			if($(this).hasClass(addedClass))
			$(this).removeClass('hideBlock rowHighlight').find(':checkbox').removeAttr('disabled').prop('checked',false);
			});*/
			
				if($(this).attr('disabled')!='disabled')
			$('#sortable').append('<li id="'+($('.selected-list').length+1)+'" class="selected-list '+addedClass+'"><input type="radio" name="selected-checkbox" value="'+addedClass+'" id="'+addedClass+'"><label for="'+addedClass+'" class="labelText">'+addedDesc+'</label></li>');
			});
			
			$(".un-selected-list input:checkbox[name=unselected-checkbox]:checked").attr('disabled','disabled').parent().addClass('alreadyAddedRow');
	bindSelectedList();
	$('.selected-count').text($('.selected-list:visible').length);	
		}
		else{
			 $('.alertText').text('Sorry! Cannot select more than '+$('#userPreferenceSize').val()+' shortcuts.');
			 $('#dialog-modal').dialog('open');
		}
	});
	
	//remove button click function
	$('.removeBtn').click(function(){
		
		$('.rowHighlight').filter(function(){
			removedClass=$(this).find(':radio').val();
			$('.un-selected-list').filter(function(){
			if($(this).hasClass(removedClass))
			$(this).removeClass('alreadyAddedRow').find(':checkbox').removeAttr('disabled').removeAttr('checked').prop('checked',false);
			});
			});
			$('.rowHighlight').remove();
			$('.selected-count').text($('.selected-list:visible').length);	
	});
	
	//up button click function
	$('.upBtn').click(function(){
		$('.rowHighlight').insertBefore($('.rowHighlight').prev());
	});
	
	//down button click function
	$('.downBtn').click(function(){
		$('.rowHighlight').insertAfter($('.rowHighlight').next());
	});
	
	
	
	$('.selected-list').click(function() {	
		$('.selected-list').removeClass('rowHighlight');
			if(!$(this).hasClass('rowHighlight'))
			  $(this).addClass('rowHighlight').find(':radio').prop('checked',true);
			else
			  $(this).removeClass('rowHighlight').find(':radio').prop('checked',false);
	});
$( "#sortable" ).sortable({
      placeholder: "highlight-placeholder"  
 });

$('.selected-list').filter(function() {	
	var id=$(this).find(':radio').val();
	$('.un-selected-list').filter(function(){
		if($(this).hasClass(id))
			$(this).addClass('alreadyAddedRow').find(':checkbox').prop('checked',true).attr('disabled','disabled');
	});
});

$('.thumbUp').click(function(){
	var string="";
	$('.orderList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	$('.lookupList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
	});
	$('.reportsList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	$('.stockManagementList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	$('.pricingList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	$('.otherToolsList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	
	$('.ticketingList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
		});
	$('.adminList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
		});
	$('.promoList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
		});
	$('.routinesList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
		});
	$('.alertList_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
		});	
	
	console.log(string);
	if(string.trim()=='')
		string=$(this).attr('id').split('_')[1]+':'+'empty';
	callAjax('saveApllicationSettings.htm',{"selectedApllicationSettings":string},'get');
	});
});


function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function bindSelectedList(){
	$('.selected-list').click(function() {	
		$('.selected-list').removeClass('rowHighlight');
			if(!$(this).hasClass('rowHighlight'))
			  $(this).addClass('rowHighlight').find(':radio').prop('checked',true);
			else
			  $(this).removeClass('rowHighlight').find(':radio').prop('checked',false);
	});
}

function callAjax(url,data,type){
	$.ajax({
		data :data,
		url : url,
		type : type,

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//var option = $("<h4>").html(response).find("#option").val();
			 if(response.trim()=="success")
				{
				 $('.alertText').text('Settings has been saved successfully.');
				 $('#dialog-modal').dialog('open');
				 $('.okBtn').click(function(){window.location.href='../login/applicationSettings.htm';});
				}
			 else {
				 $('.alertText').text(response.trim());
				 $('#dialog-modal').dialog('open');
			 }
			stopLoading();
		},
		error : function() {
			//goToLogin();
		}
	});
}
function deselectCheckBoxes(id){
	$('.orderListTotal_'+id).text($(('.orderList_'+id).concat(':checked')).length);
	$('.lookupListTotal_'+id).text($(('.lookupList_'+id).concat(':checked')).length);
	$('.reportsListTotal_'+id).text($(('.reportsList_'+id).concat(':checked')).length);
	$('.stockManagementListTotal_'+id).text($(('.stockManagementList_'+id).concat(':checked')).length);
	$('.pricingListTotal_'+id).text($(('.pricingList_'+id).concat(':checked')).length);
	$('.ticketingListTotal_'+id).text($(('.ticketingList_'+id).concat(':checked')).length);
	$('.adminListTotal_'+id).text($(('.adminList_'+id).concat(':checked')).length);
	$('.promoListTotal_'+id).text($(('.promoList_'+id).concat(':checked')).length);
	$('.otherToolsListTotal_'+id).text($(('.otherToolsList_'+id).concat(':checked')).length);
	$('.routinesListTotal_'+id).text($(('.routinesList_'+id).concat(':checked')).length);
	$('.alertListTotal_'+id).text($(('.alertList_'+id).concat(':checked')).length);
}
