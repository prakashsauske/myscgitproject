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
	
	$('input[type="radio"]').click(function(){
		$(this).parent().parent().parent().find('.parent').addClass('hideBlock');
		var val=$(this).prop('id').split('-')[0];
		var id=$(this).prop('id').split('-')[1];
		if(val=='MM'){
		$('.manageMenu-'+id).removeClass('hideBlock');
		}else if(val=='MF'){
		$('.manageFunc-'+id).removeClass('hideBlock');
		}else{
		$('.manageRoles-'+id).removeClass('hideBlock');
		}
		});
	
	$("#dialog-modal").parent().addClass("popupWrapper");
	
	$("#tabs").tabs({
		collapsible: true,
		active: false
	});
	//$('input[type="checkBox"]').prop('checked',true);
	$('.radioLable').click(function(){
		$('.'+$(this).attr('id').split('_')[0]+'Total_'+$(this).attr('id').split('_')[1]).text($('.'+$(this).attr('id').split('_')[0]+'_'+$(this).attr('id').split('_')[1]+':checked').length);
		});
	
	if($('#menuExcludeMap').val()!='' && $('#menuExcludeMap').val()!=undefined){
		for(var i=0;i<=$('#menuExcludeMap').val().split(',').length;i++){
			if($('#menuExcludeMap').val().split(',')[i]!=undefined && $('#menuExcludeMap').val().split(',')[i]!='')
			{
			var id=$('#menuExcludeMap').val().split(',')[i].split(':')[0].trim();
			var code=$('#menuExcludeMap').val().split(',')[i].split(':')[1].trim();
			$('#orderListMenu_'+id+'_'+code).prop('checked',false);
			$('#lookupListMenu_'+id+'_'+code).prop('checked',false);
			$('#reportsListMenu_'+id+'_'+code).prop('checked',false);
			$('#stockManagementListMenu_'+id+'_'+code).prop('checked',false);
			$('#pricingListMenu_'+id+'_'+code).prop('checked',false);
			$('#ticketingListMenu_'+id+'_'+code).prop('checked',false);
			$('#adminListMenu_'+id+'_'+code).prop('checked',false);
			$('#repairListMenu_'+id+'_'+code).prop('checked',false);
			$('#promoListMenu_'+id+'_'+code).prop('checked',false);
			$('#otherToolsListMenu_'+id+'_'+code).prop('checked',false);
			
			}
			}
		}
	//back button click function
	$('.backBtn').click(function(){
		window.location.href="../login/goingHome.htm";
	});
	

$('.thumbUpMenu').click(function(){
	var string="";
	$('.orderListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	$('.lookupListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
	});
	$('.reportsListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	$('.stockManagementListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	$('.pricingListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	$('.otherToolsListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			//console.log(string);
		});
	
	$('.ticketingListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
		});
	$('.adminListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
		});
	
	$('.repairListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2];
		});
	
	$('.promoListMenu_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
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
	$('.orderListMenuTotal_'+id).text($(('.orderListMenu_'+id).concat(':checked')).length);
	$('.lookupListMenuTotal_'+id).text($(('.lookupListMenu_'+id).concat(':checked')).length);
	$('.reportsListMenuTotal_'+id).text($(('.reportsListMenu_'+id).concat(':checked')).length);
	$('.stockManagementListMenuTotal_'+id).text($(('.stockManagementListMenu_'+id).concat(':checked')).length);
	$('.pricingListMenuTotal_'+id).text($(('.pricingListMenu_'+id).concat(':checked')).length);
	$('.otherToolsListMenuTotal_'+id).text($(('.otherToolsListMenu_'+id).concat(':checked')).length);
	$('.ticketingListMenuTotal_'+id).text($(('.ticketingListMenu_'+id).concat(':checked')).length);
	$('.adminListMenuTotal_'+id).text($(('.adminListMenu_'+id).concat(':checked')).length);
	$('.repairListMenuTotal_'+id).text($(('.repairListMenu_'+id).concat(':checked')).length);
	$('.promoListMenuTotal_'+id).text($(('.promoListMenu_'+id).concat(':checked')).length);
	
	$('.orderListRoleTotal_'+id).text($(('.orderListRole_'+id).concat(':checked')).length);
	$('.lookupListRoleTotal_'+id).text($(('.lookupListRole_'+id).concat(':checked')).length);
	$('.reportsListRoleTotal_'+id).text($(('.reportsListRole_'+id).concat(':checked')).length);
	$('.stockManagementListRoleTotal_'+id).text($(('.stockManagementListRole_'+id).concat(':checked')).length);
	$('.pricingListRoleTotal_'+id).text($(('.pricingListRole_'+id).concat(':checked')).length);
	$('.otherToolsListRoleTotal_'+id).text($(('.otherToolsListRole_'+id).concat(':checked')).length);
	$('.ticketingListRoleTotal_'+id).text($(('.ticketingListRole_'+id).concat(':checked')).length);
	$('.adminListRoleTotal_'+id).text($(('.adminListRole_'+id).concat(':checked')).length);
	$('.promoListRoleTotal_'+id).text($(('.promoListRole_'+id).concat(':checked')).length);	
	$('.repairListRoleTotal_'+id).text($(('.repairListRole_'+id).concat(':checked')).length);	
	
	$('.orderListFuncTotal_'+id).text($(('.orderListFunc_'+id).concat(':checked')).length);
	$('.lookupListFuncTotal_'+id).text($(('.lookupListFunc_'+id).concat(':checked')).length);
	$('.reportsListFuncTotal_'+id).text($(('.reportsListFunc_'+id).concat(':checked')).length);
	$('.stockManagementListFuncTotal_'+id).text($(('.stockManagementListFunc_'+id).concat(':checked')).length);
	$('.pricingListFuncTotal_'+id).text($(('.pricingListFunc_'+id).concat(':checked')).length);
	$('.otherToolsListFuncTotal_'+id).text($(('.otherToolsListFunc_'+id).concat(':checked')).length);
	$('.ticketingListFuncTotal_'+id).text($(('.ticketingListFunc_'+id).concat(':checked')).length);
	$('.adminListFuncTotal_'+id).text($(('.adminListFunc_'+id).concat(':checked')).length);
	$('.promoListFuncTotal_'+id).text($(('.promoListFunc_'+id).concat(':checked')).length);	
	$('.repairListFuncTotal_'+id).text($(('.repairListFunc_'+id).concat(':checked')).length);
	
}
