var currentPage='';
var currPage='';
var userNumber='';
var saleOrg='';
var BR='BR';
var RR = 'POSRP';
$(document).ready(function(){
	//$('.footerWrapper').css('margin','0 auto');
	$( "#dialog-verify" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 800
	});
	
	$("#dialog-verify").parent().addClass("popupWrapper");	
	$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
	//Popup formatting
	
	$("#dialog-modalDeactive").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-modalDeactive").parent().addClass("popupWrapper");

	$( "#dialog-modal" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 100,
		maxHeight: 600,
		width: 400
	});
	
	$("#dialog-modal").parent().addClass("popupWrapper");
	
	// Receive Order popup attributes
	$( "#dialog-modal-Edit" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 150,
		maxHeight: 600,
		width: 430,
		open: function(event, ui) {
	          $('#fromDte').datepicker();
	             
	     },
	          close: function(event,ui) {
	        	  $('#fromDte').datepicker('destroy');
	         }
	});
	
	$("#dialog-modal-Edit").parent().addClass("popupWrapper");
	
	
	$("#tabs").tabs({
		collapsible: true,
		active: false
	});
	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			hideError();
			
			if(!$('#verifyLabel').hasClass('hideBlock'))
				$('#tableAddAction .formActions .actionBtn:visible').click();
				else
					$('#verifyUser').click();
			
			
		}
	});
	$('option[value="ITS"],option[value="ADM"],option[value="'+BR+'"],option[value="'+RR+'"],option[value="SS"]').addClass('hideBlock');
	$('#dialog-verify #popupSearch .filterWrapper').addClass('hideBlock');
	$(".deactivateUser").click(function(e) {
		hideError();
        e.stopPropagation();
        $('#dialog-modalDeactive #alertBox').text('Are you sure you want to Deactivate the user?');
        var userId=$(this).parent().parent().parent().find('td:first').text();
        var event=$(this);
		$("#dialog-modalDeactive").dialog('open').removeClass('visible-hide');
		$("#dialog-modalDeactive #yes").click(function(){
			hideError();
			deactivateUser({userId:userId},event);
			
		});
        //console.log('deactivateUser');
    });
	$('.changePassword')
	.click(function(e){
		hideError();
		e.stopPropagation();
		$('#dialog-changePassword .ContentTableWrapper.formWrapper ').children(':first').addClass('hideBlock');
	//$('#dialog-changePassword').dialog('open').removeClass('visible-hide');
	changePwd('',$(this).parent().parent().parent().find('td:first').text().trim());
	});
	
			$("#dialog-modalDeactive #no").click(function(){
		hideError();
		$("#dialog-modalDeactive").dialog('close');
		
	});
	
			bindContentRow();
	$(".sortTable").tablesort();
	$('option[value="SS"]').addClass('hideBlock');
	
	
	var date =new Date();
	var month='';if(date.getMonth()+1<10){month=date.getMonth()+1;month='0'+month;}else month=date.getMonth()+1;
	var day='';if(date.getDate()<10){day=date.getDate();day='0'+day;}else day=date.getDate();
	$('#dateFrom,#fromDte').val(day+'/'+month+'/'+date.getFullYear());
	
	var totalMonth=12;
	var time=date.getTime()+(60*60*24*1000*30*totalMonth);
	date.setTime(time);
	var month='';if(date.getMonth()+1<10){month=date.getMonth()+1;month='0'+month;}else month=date.getMonth()+1;
	var day='';if(date.getDate()<10){day=date.getDate();day='0'+day;}else day=date.getDate();
	$('#dateTo,#toDte').val(day+'/'+month+'/'+date.getFullYear());
		
	//End	
	
	
	$("#dateFrom").datepicker({
		dateFormat: "dd/mm/yy",
		zIndex:50,
		
	});
	
	$("#dateTo,#toDte").datepicker({
		dateFormat: "dd/mm/yy",
		zIndex:50
		
	});	
	
	populateDept();
	$('#dialog-modal-Edit #saveBtn').click(function(){
		hideErrorInPopup('dialog-forgotWizard');
		var role=$('#dialog-modal-Edit .selectOptions');
		

		var fromDate = formateDate($('#fromDte').val());
		var date1 = new Date(fromDate.split('/')[1]+'/'+fromDate.split('/')[0]+'/'+fromDate.split('/')[2]);
		
		var toDate = formateDate($('#toDte').val());
		var date2 = new Date(toDate.split('/')[1]+'/'+toDate.split('/')[0]+'/'+toDate.split('/')[2]);
		
		var curDate = new Date();
		var today=new Date((Number(curDate.getMonth())+1)+'/'+curDate.getDate()+'/'+curDate.getFullYear());

		if (fromDate == "") {
			showErrorInPopup('Please enter From Date.','dialog-forgotWizard');
		$('fromDte').focus();
		} else if (toDate == "") {
			showErrorInPopup('Please enter To Date.','dialog-forgotWizard');
		$('toDte').focus();
		} else if (date1=='Invalid Date' && !$('#fromDte').is(':disabled')) {
			showErrorInPopup('Invalid From Date.','dialog-forgotWizard');
		$('fromDte').focus();
		} else if (date2=='Invalid Date') {
		showErrorInPopup('Invalid To Date.','dialog-forgotWizard');$('toDte').focus();
		} else if (today > date1 && !$('#fromDte').is(':disabled')) {
			showErrorInPopup('From Date should not be lesser than Today Date','dialog-forgotWizard');$('fromDte').focus();
		} else if (date1 > date2) {
			showErrorInPopup('To Date should not be lesser than the From Date','dialog-forgotWizard');$('toDte').focus();
		}else if(role.val()=='Select'){
	showErrorInPopup('Please select a role.','dialog-forgotWizard');
role.mousedown();
}
/*else if($('.popUpDept').val()=='Select'){
	showErrorInPopup('Please select a department.','dialog-forgotWizard');
role.mousedown();
}*/
else{
	var dep=$('.popUpDept').val();
	if(dep=='Select')
	dep='';
updateUser({userId:userNumber,dateFrom:fromDate,dateTo:toDate,roleId:role.val(),dept:dep});
}
	
	});
	
	
	$('#verifyUser,#copyUser').click(function(){
		hideError();
	if($(this).attr('id')!='copyUser'){
		hideError();
		if($('#tableAddAction input:first').val().trim()==''){
			$('#tableAddAction input:first').focus();
			showError('Please fill user Id or Name.');
			
		}
		else{
			
			verityUser({userId:$('#tableAddAction input:first').val().trim().split('-')[0].trim()},'user');
		}
	}else{
		hideError();
		if(($('#tableAddAction #userID1').val().trim()=='' || ($('#tableAddAction #userID1').val().indexOf('-')!= -1))){
			$('#tableAddAction #userID1').focus();
			showError('Please fill user Id/Name.');
			
		}
		else{
			
			verityUser({userId:$('#tableAddAction #userID1').val().trim().split('-')[0].trim()},'copy');
		}
	}
		
	});
	
	
	$('#tableAddAction .formActions .actionBtn').click(function(){
		hideError();
		var flag=false;
		$.when(	$('.contentRow').filter(function(){
				if($('#tableAddAction input:first').val()!='' && 
						($(this).children(':nth-child(1)').text().trim()==$('#tableAddAction input:first').val().split('-')[0].trim() 
						))
				{
				flag=true;
				}
				}) ).done(function(){
					var fromDate = formateDate($('#dateFrom').val());
					var date1 = new Date(fromDate.split('/')[1]+'/'+fromDate.split('/')[0]+'/'+fromDate.split('/')[2]);
					
					var toDate = formateDate($('#dateTo').val());
					var date2 = new Date(toDate.split('/')[1]+'/'+toDate.split('/')[0]+'/'+toDate.split('/')[2]);
					
					var curDate = new Date();
					var today=new Date((Number(curDate.getMonth())+1)+'/'+curDate.getDate()+'/'+curDate.getFullYear());
	
					if($('#tableAddAction input:first').val().trim()==''){
						showError('Please fill user Id or Name.');
						$('#tableAddAction input:first').focus();
					}
					else if(($('#verifyLabel').hasClass('hideBlock'))){
					showError('Please Verify the user before create.');
					$('#tableAddAction input:first').focus();
					}
					else if(flag){
						showError('User already added to your store.');
						$('#tableAddAction input:first').focus();
					}
					else if (fromDate == "") {
						showError('Please enter From Date.');
						$('dateFrom').focus();
					} else if (toDate == "") {
						showError('Please enter To Date.');
						$('dateTo').focus();
					} else if (date1=='Invalid Date') {
						showError('Invalid From Date.');$('dateFrom').focus();
						$('dateFrom').focus();
					} else if (date2=='Invalid Date') {
						showError('Invalid To Date.');$('dateTo').focus();
					} else if (today> date1) {
						showError('From Date should not be lesser than Today Date');$('dateFrom').focus();
					} else if (date1> date2) {
						showError('To Date should not be lesser than the From Date');$('dateTo').focus();
					}else if($('.roleList').val()=='Select'){
			showError('Please select a role.');
			$('.roleList').mousedown();
		}
		/*else if($('.department').val()=='Select'){
			showError('Please select a department.');
			$('.department').mousedown();
		}*/
		else{
			var dep=$('.department').val();
			if(dep=='Select')
			dep='';
			var newRow='<tr class="contentRow hideBlock"><td>'+$('#tableAddAction input:first').val().split('-')[0].trim()+'</td>'
			+'<td>'+$('#tableAddAction input:first').val().split('-')[1].trim()+'</td><td>'+$('option[value="'+$('.roleList').val()+'"]:first').text()+'</td>'	
			+'<td>'+dep+'-'+$('.department option[value="'+$('.department').val()+'"]').text()+'</td>'
			+'<td>Active</td>'+
			'<td class="lastColumn centerValue"><label class="linkBtn">'+
					'<label class="changePassword" title="Reset Password">Reset Password</label></label>'
				+'<label class="linkBtn"><label class="deactivateUser" title="Deactivate User">Inactivate </label>'
				+'</label></td></tr>';
			createUser($('#usrRoleMgt').serialize(),newRow);
		}
				});
	});
	
	$('.closeMessage').click(function(){
		$('.lookupActionWrapper .errorDiv').addClass('hideBlock');
		$('.lookupActionWrapper .warnDiv').addClass('hideBlock');
	});


	
	
	$("#addUser").click(function(){ 
		hideError();
		$("#tableSearchAction").addClass('hideBlock');
		$("#tableAddAction").toggleClass('hideBlock');
		$('#tableSearchAction input').val('');
		$('#tableSearchAction input').keyup();
		$('#tableAddAction input:first').focus();
	});
	
	//XPSNV
	$("#filterOpen").click(function(){ 
		hideError();
		$("#filterOpen").toggleClass('hideBlock');
		$("#filterClear").toggleClass('hideBlock');
		$("#searchUserList").toggleClass('hideBlock');
		
	});
	
	$("#filterClear").click(function(){ 
		hideError();
		$("#filterOpen").toggleClass('hideBlock');
		$("#filterClear").toggleClass('hideBlock');
		$("#searchUserList").toggleClass('hideBlock');
		
	});
	//XPSNV
	
	$("#serachUser").click(function(){ 
		hideError();
		$("#tableAddAction").addClass('hideBlock');
		$("#tableSearchAction").toggleClass('hideBlock');$('#tableSearchAction input').focus();
		resetFields();
	});
	
	$(".closeLink").click(function(){ 
		$("#tableAddAction").addClass('hideBlock');
		$("#tableSearchAction").addClass('hideBlock');
	});
	
	
	
	if($('.contentRow:visible').length==0){
		$('#userList').find('tr :first').addClass('hideBlock');
	}
	else{
		$('#userList').find('tr :first').removeClass('hideBlock');
	}
	
	
	var value='';
	$('#tableSearchAction input').keyup(function(){
	value=$(this).val();

	$('.contentRow').filter(function(){
	
	if( value!=''){
	if(($(this).children(':nth-child(1)').text().trim().toLowerCase().indexOf(value) != -1 || $(this).children(':nth-child(2)').text().trim().toLowerCase().indexOf(value) != -1))
	{
		$(this).removeClass('hideBlock');
		////console.log(i++);
	}
	else 
	$(this).addClass('hideBlock');
	}
	else
	{
	$(this).removeClass('hideBlock');
	}
	if($('.contentRow:visible').length==0){
		$('#userList').find('tr :first').addClass('hideBlock');
	}
	else{
		$('#userList').find('tr :first').removeClass('hideBlock');
	}
	});
	var recCnt=$('.contentRow:visible').length;
	currentPage=1;
	if(recCnt>10){
		$('.searchPagination').removeClass('hideBlock');
	$('.searchPagination').pagination({
		items : recCnt,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			showPage(pageNumber);

		}

	});
	}
	else{
		$('.searchPagination').addClass('hideBlock');
	}
	
	var i =1;
	var cnt=1;
	$('.contentRow:visible ').each(function(){
		$(this).attr('class','');
		$(this).addClass('contentRow').addClass('pageNo-'+cnt);
		if(cnt>1)
			$(this).addClass('hideBlock');
		if(i%10==0){
			cnt++;
		}
		i++;
		////console.log(i++);
		});
	});
	
	
	$('#dialog-verify .textbox ').keyup(function(){
		value=$(this).val();

		$('.verifyContent').filter(function(){
		
		if( value!=''){
		if(($(this).children(':nth-child(1)').text().trim().toLowerCase().indexOf(value) != -1 || $(this).children(':nth-child(2)').text().trim().toLowerCase().indexOf(value) != -1))
		{
			$(this).removeClass('hideBlock');
			////console.log(i++);
		}
		else 
		$(this).addClass('hideBlock');
		}
		else
		{
		$(this).removeClass('hideBlock');
		}
		});
		var recCnt=$('.verifyContent:visible').length;
		currentPage=1;
		if(recCnt>9){
			$('.verifyPagination').removeClass('hideBlock');
		$('.verifyPagination').pagination({
			items : recCnt,
			itemsOnPage : 9,
			cssStyle : 'compact-theme',
			currentPage : currentPage,
			onPageClick : function(pageNumber) {
				showVerifyPage(pageNumber);

			}

		});
		}
		else{
			$('.verifyPagination').addClass('hideBlock');
		}
		
		var i =1;
		var cnt=1;
		$('.verifyContent:visible ').each(function(){
			$(this).attr('class','');
			$(this).addClass('verifyContent').addClass('pagNo-'+cnt);
			if(cnt>1)
				$(this).addClass('hideBlock');
			if(i%9==0){
				cnt++;
			}
			i++;
			////console.log(i++);
			});
		});
	//back button click function
	$('#backBtn').click(function(){
		if(!$('.adminWrapper').hasClass('hideBlock'))
		window.location.href="../login/goingHome.htm";
		else
			showSearchPage();
	});
	
	$('#tableAddAction input:first').keyup(function(){
		$('#verifyLabel').addClass('hideBlock');
	});
	//cancel button click function
	$('.cancelBtn').click(function(){
		window.location.href='../login/goingHome.htm';
	});
	
	$( "#sortable" ).sortable({
      placeholder: "highlight-placeholder"  
 });
	if($('#recordCnt').val()>10){
		$('.searchPagination').pagination({
			items : $('#recordCnt').val(),
			itemsOnPage : 10,
			cssStyle : 'compact-theme',
			currentPage : 1,
			onPageClick : function(pageNumber) {
				showPage(pageNumber);

			}

		});
		$('.searchPagination').removeClass('hideBlock');
		//$('.footerWrapper').css('margin-right','184px');
		//setTimeout(function(){$('.footerWrapper').css('margin','auto');},500);
		
		
		
	}


});

function showPage(pageNo){
	currentPage=pageNo;
	var pageClass='pageNo-'+pageNo;
	$('.contentRow').filter(function(){
		if($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}

function showVerifyPage(pageNo){
	currPage=pageNo;
	var pageClass='pagNo-'+pageNo;
	$('.verifyContent').filter(function(){
		if($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}

function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}

function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}

function verityUser(data,flag){
	$.ajax({
		data :data,
		url : "/usrMgt/verifyUser.htm",
		type : 'get',

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//var option = $("<h4>").html(response).find("#option").val();
			 var res=$.parseJSON(response);
			 var tblHdr='<thead><tr><th data-sort="string">User ID</th><th data-sort="string" class="sorted ascending" >User Name</th><th data-sort="string" >Role </th><th data-sort="int" >Sales Organisation</th><th>Stores </th><th width="15%" class="lastColumn">&nbsp;</th></tr></thead>';
			//myMap
			 var activeFlag=false;
			 if(res.data!=null && res.msg=='true')
				{
				 var storeMap=res.data;
				 var j=0;
				 var k=1;
				 var userId='';
				 var role='';
				 var saleOrg='';
				 var salesOrgContent='';
				 var siteContent='';
				 var selectContent='';
				 var activeStore='';
				
				 for (var m in storeMap){
					 //console.log(j++);
					 j++;
					 var list=storeMap[m];
					 list[0].userId=((list[0].userId!=null && list[0].userId!=undefined && list[0].userId!='')?list[0].userId :'');
					 list[0].userName=((list[0].userName!=null && list[0].userName!=undefined && list[0].userName!='')?list[0].userName :'');
					 list[0].roleId=((list[0].roleId!=null && list[0].roleId!=undefined && list[0].roleId!='')?list[0].roleId :'');
					 list[0].roleDesc=((list[0].roleDesc!=null && list[0].roleDesc!=undefined && list[0].roleDesc!='')?list[0].roleDesc :'');
					
					 userId=list[0].userId+' - '+list[0].userName;
					 role=list[0].roleId;
					 saleOrg=list[0].salesOrg;
					 tblHdr+='<tr class="verifyContent ';if(k>1){tblHdr+=' hideBlock ';} 
						 tblHdr+=' pagNo-'+k+'"><td>'+list[0].userId+'</td><td>'+list[0].userName+'</td>'+
						 '<td class="hideBlock">'+list[0].roleId+'</td><td>'+list[0].roleDesc+'</td>';
					
						 for(var f=0;f<list.length;f++){
							 list[f].salesOrg=((list[f].salesOrg!=null && list[f].salesOrg!=undefined && list[f].salesOrg!='')?list[f].salesOrg :'');
							 list[f].salesOrgName=((list[f].salesOrgName!=null && list[f].salesOrgName!=undefined && list[f].salesOrgName!='')?list[f].salesOrgName :'');
							 list[f].siteName=((list[f].siteName!=null && list[f].siteName!=undefined && list[f].siteName!='')?list[f].siteName :'');
							 list[f].siteId=((list[f].siteId!=null && list[f].siteId!=undefined && list[f].siteId!='')?list[f].siteId :'');
							 if(list[f].salesOrg!='' )
							 {salesOrgContent+='<label class="multiSalesOrg">'+list[f].salesOrg;
							 if(list[f].salesOrg!='' && list[f].salesOrgName!='' )salesOrgContent+=' | ';
							 salesOrgContent+=list[f].salesOrgName +'</label></br>'; }
							 //siteContent+='<label class="multi">'+list[f].siteId; +' | '+ list[f].siteName +'</label>';
							 if(list[f].siteId!='' ){
							 siteContent+='<label class="multiSalesOrg">'+list[f].siteId;
							 if(list[f].siteId!='' && list[f].siteName!='' )siteContent+=' | ';
							 siteContent+=list[f].siteName +'</label></br>'; }
							 
							 if(list[f].linkedFlag=='Y')
							 {activeFlag=true;
								 if(selectContent=='')
									 {
									 selectContent+='User is active in store '+list[f].siteId;
									 activeStore+= 'Cannot add user " '+userId+' " is active in store '+list[f].siteId;
									 }else{
										 selectContent+=','+list[f].siteId;
										 activeStore+=','+list[f].siteId;
									 }
							 }
							 
						 }
					
						 tblHdr+='<td>'+salesOrgContent+'</td>';
						   
						   if(selectContent=='')
						   {
							   tblHdr+='<td>'+''+'</td><td class="sorted lastColumn">';
							   tblHdr+='<label class="linkBtn"><label class="selectItem verifyItem">Select</label></label>';
						   }
						   else
							   {
							   tblHdr+='<td>'+siteContent+'</td><td class="sorted lastColumn">';
							   tblHdr+= '<label class="linkBtn">'+''+'</label>';
							   }
						   tblHdr+='</td></tr>';   
						   
						   salesOrgContent='';
						   siteContent='';
						   selectContent='';
						   if(j%9==0){
							 k++;
						 }
					    
					} 
				if(j>1){
					currPage=1;
					$('#dialog-verify h4 strong').text($('#tableAddAction input:first').val().trim());
					$('#dialog-verify .ContentTable').html('');
					 $('#dialog-verify .ContentTable').html(tblHdr);
					 $('#dialog-verify .noteLbl').remove();
					$('<label class="noteLbl" style=" position: relative; top: 5px;">Note: Cannot add employees already linked to store. Contact respective store to Deactivate user.</label>').insertAfter('#dialog-verify .popupData');
					 $("#dialog-verify").dialog("open");
					 if(j>9){
							$('.verifyPagination').removeClass('hideBlock');
						$('.verifyPagination').pagination({
							items : j,
							itemsOnPage : 9,
							cssStyle : 'compact-theme',
							currentPage : currPage,
							onPageClick : function(pageNumber) {
								showVerifyPage(pageNumber);

							}

						});
						}
					 else{
						 $('.verifyPagination').addClass('hideBlock');
					 }
					 bindVerifyContent(flag);
				}
				else{
					if(flag=='user')
					{
						if(!activeFlag)
						{
							$('#tableAddAction input:first').val(userId);
							$('#saleOrg').val(saleOrg);
							$('#verifyLabel').removeClass('hideBlock');
							}else{
								showError(activeStore);
							}
					}
					else
						{
						$('#tableAddAction #userID1').val(userId);
						$('.roleList').val(role);
						}
				}
				 
				}
			 else {
				 showError('Invalid User Id/Name');
				 //$('#dialog-modal').dialog('open').removeClass('visible-hide');
			 }
			stopLoading();
		},
		error : function() {
			//goToLogin();
		}
	});
}

function showError(text){
	
	$('.closeMessage').parent().removeClass('warnDiv').removeClass('errorDiv').addClass('errorDiv').removeClass('hideBlock');
	$('.lookupActionWrapper .errorDiv label:first').text(text);
}

function hideError(){
	$('.closeMessage').parent().removeClass('warnDiv').removeClass('errorDiv').addClass('errorDiv').addClass('hideBlock');
	$('.lookupActionWrapper .errorDiv label:first').text('');
}

function showWarn(text){
	$('.closeMessage').parent().removeClass('errorDiv').removeClass('warnDiv').addClass('warnDiv').removeClass('hideBlock');
	$('.lookupActionWrapper .warnDiv label:first').text(text);
}

function bindVerifyContent(flag){
	//if(flag=='user')
	$(".sortPopUpTbl").tablesort();
	$('.verifyItem').click(function(){
		hideError();
		if(flag=='user')
		{
			$('#tableAddAction input:first').val($(this).parent().parent().parent().find('td:first').text().trim()+' - '+$(this).parent().parent().parent().find('td:nth-child(2)').text().trim());
			$('#saleOrg').val($(this).parent().parent().parent().find('td:nth-child(5)').text().trim());
			$('#verifyLabel').removeClass('hideBlock');
		}
		else
			{
			$('#tableAddAction #userID1').val($(this).parent().parent().parent().find('td:first').text().trim()+' - '+$(this).parent().parent().parent().find('td:nth-child(2)').text().trim());
			$('.roleList').val($(this).parent().parent().parent().find('td:nth-child(3)').text());
			}
		 $("#dialog-verify").dialog("close");
	});
	
}

function formateDate(v) {
	if (v.length == 8) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
		return finalDate;
	} else {
		return v;
	}
}

function createUser(data,newRow){
	
	$.ajax({
		data :data,
		url : "createUser.htm",
		type : 'get',

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if(response=='true'){
				arrangeRow(newRow);
				showWarn('User created successfully.');
				resetFields();
			}else{
				showError('User creation Failed.');
			}
			stopLoading();
		},
		error : function() {
			//goToLogin();
		}
	});
	
}

function arrangeRow(newRow){
	
	$('#userList tbody').children(':first').before(newRow);
	bindContentRow(newRow);
var recCnt=$('.contentRow').length;
currentPage=1;
if(recCnt>10){
	$('.searchPagination').removeClass('hideBlock');
$('.searchPagination').pagination({
	items : recCnt,
	itemsOnPage : 10,
	cssStyle : 'compact-theme',
	currentPage : currentPage,
	onPageClick : function(pageNumber) {
		showPage(pageNumber);

	}

});
}
else{
	$('.searchPagination').addClass('hideBlock');
}

var i =1;
var cnt=1;
$('.contentRow ').each(function(){
	$(this).attr('class','');
	$(this).addClass('contentRow').addClass('pageNo-'+cnt);
	if(cnt>1)
		$(this).addClass('hideBlock');
	if(i%10==0){
		cnt++;
	}
	i++;
	////console.log(i++);
	});
}

function resetFields(){
	$('#tableAddAction #userID1').val('');
	$('#tableAddAction input:first').val('');
	$('.roleList,.department').val('Select');
	$('#verifyLabel').addClass('hideBlock');
	$(".deactivateUser").click(function(e) {
		hideError();
        e.stopPropagation();
        $('#dialog-modalDeactive #alertBox').text('Are you sure you want to Deactivate the user?');
        var userId=$(this).parent().parent().parent().find('td:first').text();
        var event=$(this);
		$("#dialog-modalDeactive").dialog('open').removeClass('visible-hide');
		$("#dialog-modalDeactive #yes").click(function(){
			hideError();
			deactivateUser({userId:userId},event);
			
		});
        //console.log('deactivateUser');
    });
}

function deactivateUser(data,event){
$.ajax({
	data :data,
	url : "deActivateUser.htm",
	type : 'get',

	beforeSend : function() {
		startLoading();
	},
	success : function(response) {
		if(response=='true'){
			event.addClass('hideBlock');
			event.parent().parent().parent().find('.statusFlag').text('Inactive');
			//event.parent().parent().parent().find('td:nth-child(4)').text('Deactive');
			
		}else{
			showError('User Deactivation Failed.');
		}
		stopLoading();
		$("#dialog-modalDeactive").dialog('close');
	},
	error : function() {
		//goToLogin();
	}
});
}

function restPwd(data,userId) {

	$.ajax({
		type : "get",
		url : "resetPwd.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			// iterateResult(response,pageNumber);
			if (response == '') {
				//showWarningInPopup('Password changed successfully.',
					//	'dialog-forgotWizard');
				//$("#dialog-modal .alertText").text('Password reset to username '+userId);
				$("#dialog-modal .alertText").text('Password successfully reset to Username');
				$("#dialog-modal").dialog('open');
			} else {
				//showErrorInPopup(response, 'dialog-forgotWizard');
				
				$("#dialog-modal .alertText").text(response);
				$("#dialog-modal").dialog('open');
			}
			stopLoading();
		},
		error : function() {
			// goToLogin();
		}
	});

}

function showErrorInPopup(msg, id) {
	
	//
	if(id=='dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text(msg);
	else
		{
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
		.removeClass('popupWarning').addClass('popupError').text(msg);
		$('#'+id+' .popupActions').parent().removeClass('hideBlock');
		}
}

function showWarningInPopup(msg, id) {
	if(id=='dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text(msg).removeClass('popupWarning').addClass('popupWarning').text(msg);
	else
	$('#' + id + ' .popupActions').prev().removeClass('popupError')
			.removeClass('popupWarning').addClass('popupWarning').text(msg);
	//$('#'+id+' .popupActions').parent().removeClass('hideBlock');
}

function hideErrorInPopup(id) {
	//$('#'+id+' .popupActions').prev().removeClass('popupError,popupWarning').addClass('popupError').text('');
	if(id=='dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text('');
	else
	$('#' + id + ' .popupActions').prev().removeClass('popupError')
			.removeClass('popupWarning').text('');
}

function changePwd(e,user){
	var userId=user;
	 $('.newPass').val('');
	 $('.conNewPass').val('');
	 hideErrorInPopup('dialog-forgotWizard');
	/*$('.changePass')
	.click(
	function() */{
		hideErrorInPopup('dialog-forgotWizard');
		$('.errorDiv label').text('');
		
		var newPassword = user;//$('.newPass').val();
		//var currPass = $('.currPass').val();
		var conNewPass = user;//$('.conNewPass').val();
		//var regex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,16})$/;
		if (newPassword == ""
				|| newPassword == null)
			{
			showErrorInPopup(
					'Please enter New Password',
					'dialog-forgotWizard');
			}
		else if (conNewPass == ""
				|| conNewPass == null)
			{
			showErrorInPopup(
					'Please enter Confirm Password',
					'dialog-forgotWizard');
			}
		else if (conNewPass != newPassword
		)
	{
			showErrorInPopup(
			'Passwords does not match.',
			'dialog-forgotWizard');
	}
		else {
			restPwd({
				oldPwd : "",
				newPwd : newPassword,
				userNo:userId
			},userId);
		}

	}//);

}

function getUserDtl(data){
	
	$.ajax({
		data :data,
		url : "userDtls.htm",
		type : 'get',

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			//var option = $("<h4>").html(response).find("#option").val();
			 var res=$.parseJSON(response);
			 if(res.data!=null && res.msg=='true')
				{
				 var storeMap=res.data;
				 var j=0;
				 var content='';
				 for (var m in storeMap){
					 //console.log(j++);
					 j++;
					 var list=storeMap[m];
					 
					 userId=list[0].userId;
					 role=list[0].roleId;
					 saleOrg=list[0].salesOrg;
					 siteNo=list[0].siteId;
					 siteName=list[0].siteName;
					 list[0].updatedDate=(list[0].updatedDate!=null)? list[0].updatedDate:'';
					 list[0].updatedUserId=(list[0].updatedUserId!=null)? list[0].updatedUserId:'';
					 list[0].dept=(list[0].dept!=null)? list[0].dept:'';
					 content+='<div class="contentWrapper detailsContent"><div class="articleHead"><div class="articleHeaderWrapper"><h2 class="articleTitle">'
							+list[0].userName+' ('+list[0].userId+') </h2><p><label class="articlePriceLabel">Role: <strong class="usrRole hideBlock">'+list[0].roleId+'</strong><strong class="roleDesc">'+list[0].roleDesc+'</strong></label>'
							+'<label class="articlePriceLabel">|</label><label class="articlePriceLabel">Primary Dept.: <strong class="deptDtl">'+list[0].dept;
					 if(list[0].dept!='')content+=' | ';
					 content+= $('.department option[value="'+list[0].dept+'"]').text() +'</strong></label>'
							//+'<label class="articlePriceLabel">|</label><label class="articlePriceLabel">Stores <strong>'+'Store'+'</strong></label>'
							+'</p></div><div class="articleActionBtns">'
							+'<label class="orderStatus">Status: <strong class="dtlStatus">';
							if(list[0].activeFlag=='Y')content+='Active';else content+='Inactive';
							content+='</strong></label><label class="actionBtn editButton "><label class="editBtn">Edit</label></label>'	
							+'<label class="actionBtn changePwd"><label class="key ">Reset Password</label></label></div></div><div class="articleContent orderDetails"><div class="articleContentInner">'
							+'<div class="articleDetails"><table cellspacing="0" class="ContentTable" width="100%"><tbody><tr><td class="keyInfo">Active From:</td>'
							+'<td class="valueInfo activeFrom">'+list[0].acticeStartDate+'</td><td class="keyInfo">Sales Organisation:</td><td class="valueInfo">'+list[0].salesOrg+' | ' +list[0].salesOrgName +'</td><td class="keyInfo">'	
							+'Updated By:</td><td class="valueInfo lastColumn">'+list[0].updatedUserId+'</td></tr><tr class="lastRow"><td class="keyInfo">Active To:</td><td class="valueInfo activeTo">'
							+ list[0].acticeEndDate+'</td><td class="keyInfo">Stores:</td><td class="valueInfo">';
					    for (var i=0;i<list.length;i++){
					    	
					    	if(list[i].siteId==null)
					    		list[i].siteId='';
					    	if(list[i].siteName==null)
					    		list[i].siteName='';
					    	
					    	content+='<label class="multi">'+list[i].siteId;
					    	if(list[i].siteId!='' && list[i].siteName!='')
					    	content+=' | ';
					    		content+=list[i].siteName+'</label>' ;
					    	
					    	
					   if(i==list.length-1){
						   content+='</td><td class="keyInfo">Updated On:</td><td class="valueInfo lastColumn">'+list[0].updatedDate+'</td></tr></tbody></table></div></div></div>'
							+'<div class="ContentTableWrapper" ><div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle adTitle hideBlock">Access to various functions</h4>'
							+'</div><div class="tableActionBtns"><label class="actionBtn"><label class="notepad additionalAccess">Additional Access</label></label></div></div></div></div>';  
					   }
					   }
					} 
				
				 showDetailsPage(content,userId);
				}
			 else {
				 showError('Sorry no results found.');
				 
			 }
			stopLoading();
		},
		error : function() {
			//goToLogin();
		}
	});
}

function showDetailsPage(content,userId){
	$('.adminWrapper').addClass('hideBlock');
	 $('.adminWrapper').after(content);
	 $('.breadcrumbWrapper li:nth-child(2)').addClass('hideBlock');
	 $('.breadcrumbWrapper li:nth-child(3),.breadcrumbWrapper li:nth-child(4)').removeClass('hideBlock');
	 $('.detailsContent .ContentTableWrapper').css('overflow-y','visible');
	 $('.detailsContent .ContentTableWrapper .tableInfo').css('overflow','visible');
	 
	
	 
	 $('.editButton').click(function(){
		//console.log('edit');
		 $('#dialog-modal-Edit .selectOptions').val('Select');
		 hideErrorInPopup('dialog-forgotWizard');
		 $('#fromDte').removeAttr('disabled');
		 $('#dialog-modal-Edit .popupData select:first').val($('.usrRole ').text());
		 $('#fromDte').val($('.activeFrom').text());
		 $('#toDte').val($('.activeTo').text());
		 $('.popUpDept').val($('.deptDtl').text().split('|')[0].trim());
		 $('#dialog-modal-Edit').dialog('open').removeClass('visible-hide');
		 hideErrorInPopup('dialog-forgotWizard');
		 $('.popUpDept').focus();
		 if($('.dtlStatus').text().trim()=='Active')
				$('#fromDte').attr('disabled','disabled');	

	 });
	 $('.breadcrumbWrapper li:nth-child(3)').click(function(){
		 showSearchPage();
	 });
	 $('.additionalAccess').click(function(){
		 $('.adTitle').removeClass('hideBlock');
		 $('.detailsContent .ContentTableWrapper .tableInfo').css('overflow','auto');
		 getAdditionalAccess({userNo:userNumber});
		 });
	 
	 $('.changePwd').click(function(){
			hideError();
			//e.stopPropagation();
			$('#dialog-changePassword .ContentTableWrapper.formWrapper ').children(':first').addClass('hideBlock');
		//$('#dialog-changePassword').dialog('open').removeClass('visible-hide');
		 changePwd('',userId);
		 });
	 
	 $('.additionalAccess').click();$('.additionalAccess').parent().addClass('hideBlock');	 
	 
}

function showSearchPage(){
	$('.adminWrapper').removeClass('hideBlock');
	 $('.adminWrapper').next().remove();
	 $('.breadcrumbWrapper li:nth-child(2)').removeClass('hideBlock');
	 $('.breadcrumbWrapper li:nth-child(3),.breadcrumbWrapper li:nth-child(4)').addClass('hideBlock');
	 
}

function updateUser(data){

	
	$.ajax({
		data :data,
		url : "updateUser.htm",
		type : 'get',

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if(response=='true'){
				showErrorInPopup('User details update successfully.');
				setTimeout(function(){$('#dialog-modal-Edit').dialog('close');},100);
				$('.additionalAccess').click();$('.additionalAccess').parent().addClass('hideBlock');
				updateDtsAndSearch();
			}else{
				showErrorInPopup('User detail update Failed.');
			}
			stopLoading();
		},
		error : function() {
			//goToLogin();
		}
	});
	

}

function updateDtsAndSearch(){
	var fromDt=$('#fromDte').val();
	var toDt=$('#toDte').val();
	var role=$('option[value="'+$('#dialog-modal-Edit .selectOptions:first').val()+'"]:first').text();	
	var status='';
	var dept=($('.popUpDept').val()=='Select')? '':$('.popUpDept').val()+' | '+$('.popUpDept option[value="'+$('.popUpDept').val()+'"]').text();
	var flag=true;
	
	var date2 = new Date();
	var part = toDt.split('/');
	date2.setFullYear(part[2], part[1] - 1, part[0]);
	
	var curDate = new Date();
	var today=new Date();
	curDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());

	if(curDate.getTime()>date2.getTime())
		{
		status='Inactive';
		flag=false;
		}
	else
		{
		status='Active';
		flag=true;
		}
	
	$('.activeFrom').text(fromDt);
	$('.activeTo').text(toDt);
	$('.roleDesc').text(role);
	$('.usrRole').text($('#dialog-modal-Edit .selectOptions').val());
	$('.dtlStatus').text(status);
	$('.deptDtl').text(dept);
	
	
	$('.contentRow').filter(function(){
		if($(this).children(':nth-child(1)').text().trim()==userNumber)
		{
			$(this).children(':nth-child(3)').text(role);
			$(this).children(':nth-child(5)').text(status);
			$(this).children(':nth-child(4)').text(dept);
			
			if(flag)
				{
				$(this).children(':nth-child(6)').find('.deactivateUser').parent().removeClass('hideBlock');
			$(this).children(':nth-child(6)').find('.deactivateUser').removeClass('hideBlock');
				}
			else
				{
				$(this).children(':nth-child(6)').find('.deactivateUser').parent().addClass('hideBlock');
				$(this).children(':nth-child(6)').find('.deactivateUser').addClass('hideBlock');
				}
		}
		});
	
}
function getAdditionalAccess(data){
$.ajax({
	data :data,
	url : "userRoleMgt.htm",
	type : 'get',

	beforeSend : function() {
		startLoading();
	},
	success : function(response) {
		var option = $("<h4>").html(response).find('#tabs .hierarchyWrapper.settingsWrapper');
		var salesOrgExcludeMap = $("<h4>").html(response).find('#salesOrgExcludeMap').val();
		var saveContent=$("<h4>").html(response).find('#tabs .pageActions');
		var additionalAccess=$("<h4>").html(response).find('#additionalAccess').val();
		
		
		if(option!='' && option!=undefined){
			$('.detailsContent .ContentTableWrapper .tableInfo').next().remove();
			$('.detailsContent .ContentTableWrapper .tableInfo').after(option);
			bindAddtionalAcces(salesOrgExcludeMap,saveContent,additionalAccess);
		}
		 else {
			 //showError('Invalid User Id/Name');
			 //$('#dialog-modal').dialog('open').removeClass('visible-hide');
		 }
		stopLoading();
	},
	error : function() {
		//goToLogin();
	}
});
}
function bindAddtionalAcces(salesOrgExcludeMap,saveContent,additionalAccess){
	$('.hierarchyWrapper.settingsWrapper .tableInfo').addClass('hideBlock');
	$('.hierarchyWrapper.settingsWrapper').next().remove();
	$('.hierarchyWrapper.settingsWrapper').after(saveContent);
	$('.thumbUp').parent().addClass('hideBlock');
	thumUpbind();
	
	$('input[type="checkBox"]').prop('checked',true).prop('disabled','disabled').next().addClass('lable-disable');;
	if(salesOrgExcludeMap!=''){
		var id='';
		for(var i=0;i<=salesOrgExcludeMap.split(',').length;i++){
			if(salesOrgExcludeMap.split(',')[i]!=undefined && salesOrgExcludeMap.split(',')[i]!='')
			{
			id=salesOrgExcludeMap.split(',')[i].split(':')[0].trim();
			var code=salesOrgExcludeMap.split(',')[i].split(':')[1].split('-')[1].trim();
			var role=salesOrgExcludeMap.split(',')[i].split(':')[1].split('-')[0].trim();
			var type=salesOrgExcludeMap.split(',')[i].split(':')[1].split('-')[2].trim();
			if(role==$('.usrRole').text().trim() || role.toLowerCase()=='all'){
			$('#orderList_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
			$('#lookupList_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
			$('#reportsList_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
			$('#stockManagementList_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
			$('#pricingList_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
			$('#ticketingList_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
			$('#adminList_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
			$('#promoList_'+id+'_'+code+'_'+type).prop('checked',false).prop('disabled','disabled').next().addClass('lable-disable');
			}
			}
			}
		deselectCheckBoxes(id);
		}
	if(additionalAccess!=''){
		for(var i=0;i<=additionalAccess.split(',').length;i++){
			if(additionalAccess.split(',')[i]!=undefined)
		$('input[type="checkBox"]:not(:checked)').filter(function(){
			console.log($(this).attr('id').split('_')[2]+'__'+additionalAccess.split(',')[i].trim());
			if($(this).attr('id').split('_')[2]==additionalAccess.split(',')[i].trim())
				$(this).prop('checked',true);
			});
		}
		deselectCheckBoxes(id);
	}
	$('.labelText').click(function(){
		$('.'+$(this).attr('id').split('_')[0]+'Total_'+$(this).attr('id').split('_')[1]).text($('.'+$(this).attr('id').split('_')[0]+'_'+$(this).attr('id').split('_')[1]+':checked').length);
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
}
function thumUpbind(){
	$('.hierarchyWrapper.settingsWrapper').next().find('.secondaryActionBtn').addClass('hideBlock');
	$('.thumbUp').click(function(){
		var string="";
		
		
		$('.orderList_'+$(this).attr('id').split('_')[1]+':checked:not(:disabled)').filter(function(){
			//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
			if(string=="")
				string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				else
				string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				//console.log(string);
			});
		$('.lookupList_'+$(this).attr('id').split('_')[1]+':checked:not(:disabled)').filter(function(){
			//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
			if(string=="")
				string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				else
				string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				//console.log(string);
		});
		$('.reportsList_'+$(this).attr('id').split('_')[1]+':checked:not(:disabled)').filter(function(){
			//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
			if(string=="")
				string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				else
				string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				//console.log(string);
			});
		$('.stockManagementList_'+$(this).attr('id').split('_')[1]+':checked:not(:disabled)').filter(function(){
			//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
			if(string=="")
				string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				else
				string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				//console.log(string);
			});
		$('.pricingList_'+$(this).attr('id').split('_')[1]+':checked:not(:disabled)').filter(function(){
			//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
			if(string=="")
				string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				else
				string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				//console.log(string);
			});
		$('.ticketingList_'+$(this).attr('id').split('_')[1]+':checked:not(:disabled)').filter(function(){
			//console.log($(this).attr('id').split('_')[1],$(this).attr('id').split('_')[2]);
			if(string=="")
				string=$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
				else
				string=string+","+$(this).attr('id').split('_')[1]+':'+$(this).attr('id').split('_')[2]+':'+$(this).attr('id').split('_')[3];
			});
		console.log(string);
		
		if(string.trim()=='')
			string=$(this).attr('id').split('_')[1]+':'+'empty'+':'+'empty';
		callAjax('saveRolePrflSettings.htm',{"selectedApllicationSettings":string,"userId":userNumber},'get');
		
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
				 $('#dialog-modal').dialog('open').removeClass('visible-hide');
				 $('.okBtn').click(function(){$('#dialog-modal').dialog('close');});
				}
			 else {
				 $('.alertText').text(response.trim());
				 $('#dialog-modal').dialog('open').removeClass('visible-hide');
			 }
			stopLoading();
		},
		error : function() {
			//goToLogin();
		}
	});
}
function bindContentRow(newRow){
	$('.contentRow').unbind('click');
	$('.contentRow').click(function(){
		hideError();
		var user=$(this).find('td:first').text().trim();
		userNumber=$(this).find('td:first').text().trim();
		getUserDtl({userId:user});
		//console.log('content');
		});
	if(newRow!=undefined && newRow!='' && newRow.length>0)
	$('.contentRow:first').click();
}
function populateDept(){
	$('.contentRow').filter(function(){
		var value=$(this).children(':nth-child(4)').text().trim();
		if(value!='')
		$(this).children(':nth-child(4)').text($(this).children(':nth-child(4)').text()+ ' | ' + $('.department option[value="'+$(this).children(':nth-child(4)').text()+'"]').text());

		});
}
