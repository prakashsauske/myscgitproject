$(document).ready(function(){
	
	if($('#funcExcludeMap').val()!='' && $('#funcExcludeMap').val()!=undefined){
		for(var i=0;i<=$('#funcExcludeMap').val().split(',').length;i++){
			if($('#funcExcludeMap').val().split(',')[i]!=undefined && $('#funcExcludeMap').val().split(',')[i]!='')
			{
			var id=$('#funcExcludeMap').val().split(',')[i].split(':')[0].trim();
			var code=$('#funcExcludeMap').val().split(',')[i].split(':')[1].split('-')[1].trim();
			var role=$('#funcExcludeMap').val().split(',')[i].split(':')[1].split('-')[0].trim();
			var type=$('#funcExcludeMap').val().split(',')[i].split(':')[1].split('-')[2].trim();
			if(role=='All'){
			$('#orderListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#lookupListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#reportsListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#stockManagementListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#pricingListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#ticketingListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#adminListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#promoListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#repairListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			$('#otherToolsListFunc_'+id+'_'+code+'_'+type).prop('checked',false);
			
			}
			}
			}
		deselectCheckBoxes();
		}
	$('.roleName').text($('#'+$('h2 .selectOptions').val()).text());
	//back button click function
	

$('.thumbUpFunc').click(function(){
	var string="";
	var salesOrg=$(this).attr('id').split('_')[1];
	//if($('h2 .selectOptions').val()=='Select'){
		// $('.alertText').text('Please select a role.');
		// $('#dialog-modal').dialog('open');
	//}else{
	
	$('.orderListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.lookupListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
	});
	$('.reportsListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.stockManagementListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.pricingListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	$('.otherToolsListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			//console.log(string);
		});
	
	$('.ticketingListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	
	$('.adminListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	$('.promoListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	$('.repairListFunc_'+$(this).attr('id').split('_')[1]+':not(:checked)').filter(function(){
		//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
		if(string=="")
			string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			else
			string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
		});
	
	console.log(string);
	
	if(string.trim()=='')
		string=$(this).attr('id').split('_')[1]+':'+'empty'+':'+'empty';
	callAjax('saveFuncSettings.htm',{"selectedApllicationSettings":string,"roleId":$('h2 .selectOptions').val(),"salesOrg":salesOrg},'get');
	//}
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

