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
	
	$('h2 .selectOptions').change(function(){
		$('.roleName').text($('#'+$('h2 .selectOptions').val()).text());
		$('input[type="checkBox"]').prop('checked',false);
	if($('#salesOrgExcludeMap').val()!=''){
		for(var i=0;i<=$('#salesOrgExcludeMap').val().split(',').length;i++){
			if($('#salesOrgExcludeMap').val().split(',')[i]!=undefined && $('#salesOrgExcludeMap').val().split(',')[i]!='')
			{
			var id=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[0].trim();
			var code=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[1].split('-')[1].trim();
			var role=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[1].split('-')[0].trim();
			var type=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[1].split('-')[2].trim();
			if(role==$('h2 .selectOptions').val()){
			$('#orderList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#lookupList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#reportsList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#stockManagementList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#pricingList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#otherToolsList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#ticketingList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#adminList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#promoList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#routinesList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#alertList_'+id+'_'+code+'_'+type).prop('checked',true);
			}
			}
			}
		deselectCheckBoxes();
		}
	});
	
	$('input[type="checkBox"]').prop('checked',false);
	if($('#salesOrgExcludeMap').val()!=''){
		for(var i=0;i<=$('#salesOrgExcludeMap').val().split(',').length;i++){
			if($('#salesOrgExcludeMap').val().split(',')[i]!=undefined && $('#salesOrgExcludeMap').val().split(',')[i]!='')
			{
			var id=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[0].trim();
			var code=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[1].split('-')[1].trim();
			var role=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[1].split('-')[0].trim();
			var type=$('#salesOrgExcludeMap').val().split(',')[i].split(':')[1].split('-')[2].trim();
			if(role==$('h2 .selectOptions').val()){
			$('#orderList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#lookupList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#reportsList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#stockManagementList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#pricingList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#otherToolsList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#ticketingList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#adminList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#promoList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#routinesList_'+id+'_'+code+'_'+type).prop('checked',true);
			$('#alertList_'+id+'_'+code+'_'+type).prop('checked',true);
			}
			}
			}
		deselectCheckBoxes();
		}
	$('.roleName').text($('#'+$('h2 .selectOptions').val()).text());
	//back button click function
	$('#backBtn').click(function(){
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
	var salesOrg=$(this).attr('id').split('_')[1];
	if($('h2 .selectOptions').val()=='Select'){
		 $('.alertText').text('Please select a role.');
		 $('#dialog-modal').dialog('open');
	}else{
	
	$('.orderList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.lookupList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
	});
	$('.reportsList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.stockManagementList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.pricingList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.otherToolsList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.ticketingList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	
	$('.adminList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	$('.promoList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});	
	$('.routinesList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	
	$('.alertList_'+$(this).attr('id').split('_')[1]+':checked').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	
	
	console.log(string);
	
	if(string.trim()=='')
		string=$(this).attr('id').split('_')[1]+':'+'empty'+':'+'empty';
	callAjax('saveRolePrflSettings.htm',{"selectedApllicationSettings":string,"roleId":$('h2 .selectOptions').val(),"salesOrg":salesOrg},'get');
	}
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
				 $('.okBtn').click(function(){window.location.href='../roleMgt/userRoleMgt.htm';});
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
