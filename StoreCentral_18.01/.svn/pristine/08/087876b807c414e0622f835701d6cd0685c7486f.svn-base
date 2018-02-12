$(document).ready(function(){
	
	$('.roleDrop').change(function(){
		$(this).parent().parent().parent().parent().find('input[type="checkBox"]').prop('checked',true);
		var id=$(this).prop('id').split('-')[1];
		$('.roleName-'+id).text($('#'+$(this).val()).text());
	if($('#funcExcludeMap').val()!=''){
		
		for(var i=0;i<=$('#funcExcludeMap').val().split(',').length;i++){
			if($('#funcExcludeMap').val().split(',')[i]!=undefined && $('#funcExcludeMap').val().split(',')[i]!='')
			{
			id=$('#funcExcludeMap').val().split(',')[i].split(':')[0].trim();
			var code=$('#funcExcludeMap').val().split(',')[i].split(':')[1].split('-')[1].trim();
			var role=$('#funcExcludeMap').val().split(',')[i].split(':')[1].split('-')[0].trim();
			var type=$('#funcExcludeMap').val().split(',')[i].split(':')[1].split('-')[2].trim();
			
			if(role==$(this).val()){
			$('#orderListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#lookupListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#reportsListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#stockManagementListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#pricingListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#otherToolsListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#ticketingListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#adminListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#promoListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#repairListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			
			}
			if(role=='All'){
				$('#orderListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#lookupListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#reportsListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#stockManagementListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#pricingListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#otherToolsListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#ticketingListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#adminListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#promoListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#repairListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				}
			}
			}
		deselectCheckBoxes(id);
		}
	});
	
	if($('#funcExcludeMap').val()!='' && $('#funcExcludeMap').val()!=undefined){
		for(var i=0;i<=$('#funcExcludeMap').val().split(',').length;i++){
			if($('#funcExcludeMap').val().split(',')[i]!=undefined && $('#funcExcludeMap').val().split(',')[i]!='')
			{
			var id=$('#funcExcludeMap').val().split(',')[i].split(':')[0].trim();
			var code=$('#funcExcludeMap').val().split(',')[i].split(':')[1].split('-')[1].trim();
			var role=$('#funcExcludeMap').val().split(',')[i].split(':')[1].split('-')[0].trim();
			var type=$('#funcExcludeMap').val().split(',')[i].split(':')[1].split('-')[2].trim();
			if(role==$('#roleDrop-'+id).val()){
			$('#orderListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#lookupListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#reportsListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#stockManagementListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#pricingListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#otherToolsListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#ticketingListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#adminListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#promoListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#repairListRole_'+id+'_'+code+'_'+type).prop('checked',false);
			}
			if(role=='All'){
				$('#orderListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#lookupListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#reportsListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#stockManagementListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#pricingListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#otherToolsListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#ticketingListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#adminListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#promoListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				$('#repairListRole_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
				
				}
			}
			}
		deselectCheckBoxes();
		}
	//$('.roleName').text($('#'+$('h2 .selectOptions').val()).text());
	//back button click function
	

$('.thumbUpRole').click(function(){
	var string="";
	var salesOrg=$(this).attr('id').split('_')[1];
	if($('h2 .selectOptions').val()=='Select'){
		 $('.alertText').text('Please select a role.');
		 $('#dialog-modal').dialog('open');
	}else{
	
	$('.orderListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.lookupListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
	});
	$('.reportsListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.stockManagementListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.pricingListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.otherToolsListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	
	$('.ticketingListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	
	$('.adminListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	$('.promoListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	$('.repairListRole_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	console.log(string);
	
	if(string.trim()=='')
		string=$(this).attr('id').split('_')[1]+':'+'empty'+':'+'empty';
	callAjax('saveRolePrflSettings.htm',{"selectedApllicationSettings":string,"roleId":$('#roleDrop-'+salesOrg).val(),"salesOrg":salesOrg},'get');
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

