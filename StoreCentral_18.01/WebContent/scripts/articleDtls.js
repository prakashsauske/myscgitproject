var recordCount;

/*----------------******  Department change function   *****--------------- */
$(document)
		.ready(
				function() {
					$('.history').addClass('hideBlock');
					/*$('#accordion-2 #Rep').click(function(){
						var articleno=$("#articleNo").val();
						var siteno= $("#siteNo").val();
						checkFplan();
						if($('.replenishmentDiv').children().length==2)
							{
							
							getPackBrkArticles(articleno,siteno,$('#article-packBrkFlag').val(),$('#linked_art_flag').val());
							}
					});*/
					
					$('#accordion-1 #ArtHier').click(function(){
						var articleno=$("#articleNo").val();
						var siteno= $("#siteNo").val();
						if($("#accordion-1 .articleDiv .ContentTable tbody").text().length > 0)
						{
							
						}
						else
							getArticleHierarchy(articleno,siteno);
					});
					
					$('#accordion-2 #Rep').click(function(){
						var articleno=$("#articleNo").val();
						var siteno= $("#siteNo").val();
						
						if($('#accordion-2 .replenishmentDiv #repTable1 tbody').text().length > 0)
						{
							
						}
						else
							getReplenishmentDtls(articleno,siteno);
						checkFplan();
							
					});
				
					$("#PriInfo").click(function(e) {
						var articleno=$("#articleNo").val();
						var siteno= $("#siteNo").val();
						if(($("#articleNo").val()!=null)&&($("#siteNo").val()!=null) && ($("#PriceDetailsDiv").text()==""))
						{
						
						if($('#article-packBrkFlag').val()!='Y'){
						$.ajax({
							type : "GET",
							url : "gtin.htm",
							beforeSend: function(){
								
								},
							data : "articleNo=" + articleno + "&siteNo=" + siteno,
							success : function(response) {
								$("#PriceDetailsDiv").html(response).tabs();
								getPackBrkArticles(articleno,siteno,$('#article-packBrkFlag').val(),$('#linked_art_flag').val());
								$('#PriceDetailsDiv').removeClass('ui-tabs');//.css('border','1px solid #C8F369').css('border-top-width','1px').css('border-bottom-width','1px');
								
							},
						});
						}else{
							getPackBrkArticles(articleno,siteno,$('#article-packBrkFlag').val(),$('#linked_art_flag').val());
						}
						}

			  }); 
					$("#AddiItem").click(function(e) {

						if(($("#articleNo").val()!=null)&&($("#siteNo").val()!=null) && ($("#AddiItemDiv").text()==""))
						{
						var articleno=$("#articleNo").val();
						var siteno= $("#siteNo").val();
						$.ajax({
							type : "GET",
							url : "freshFoodLabel.htm",
							beforeSend: function(){
								
								},
							data : "articleNo=" + articleno + "&siteNo=" + siteno,
							success : function(response) {
								$("#AddiItemDiv").html(response).tabs();
								getPosInfo(articleno,siteno);
								$("#AddiItemDiv").removeClass('ui-tabs');
							},
						});
						}

			     });

					var tabContent='<div id="openOrders"><ul><li><a href="#tabs-2">Orders</a></li><li><a href="#tabs-3">Forecast Orders</a></li></ul>'
					+'<div id="tabs-2"><div class="ContentTableWrapper"><div class="tableInfo "><div class="tableTitle topTitle"><h4>List of Orders</h4>'
					+'</div> <table cellspacing="0" class=" ContentTable " id="sortTable">'
					+'<thead><tr><th class="">Order #</th><th class="centerValue">Order Qty.</th><th class="centerValue">Delivery Date</th><th class="">Supplier</th>'
					+'<th class="">Source</th><th class="lastColumn centerValue">Status</th></tr></thead><tbody>'
					+'</tbody></table>'
					+'</div> </div></div>' 					
					+'<div id="tabs-3"><div class="ContentTableWrapper"><div class="tableInfo "><div class="tableTitle topTitle"><h4>AutoStockR planned forecast for <strong>next 7 days</strong></h4>'
					+'</div> </div><table cellspacing="0" class="ContentTable" id="sortTable"></table></div></div> </div>';
					
					$(".newWindowAfter").click(function() {
						hideError();
							generateReport({segme:$('.segmentNo').text().split('-')[0].trim(),articleNo:$('#articleNo').val()}, 1);
					});
					//$("#tabs").tabs();
					$('#dialog-openOrders .popupData .paginationDiv').before(tabContent);
					
					$("#openOrders").tabs();
					
					$( "#dialog-openOrders" ).dialog({				
						autoOpen: false,
						modal: true,
						resizable: false,
						minHeight: 200,
						maxHeight: 600,
						width: 700
					});
					$( "#dialog-openOrders" ).parent().addClass('popupWrapper');
					//getArticleImg($('#article-articleNo').val());	
				});

function iterateResult(response, pageNumber) {
	var output = $.parseJSON(response);

	if (output.msg != null && output.msg.length > 0) {
		showErrorTab2(output.msg);
	} else if (output.data != null && output.data.length > 0) {
		var descList = output.data;
		recordCount = descList[0].count;
		currentPage = pageNumber;
		var myDate=new Date();
		var dayOne=new Date();
		var dayTwo =new Date();
		var dayThree =new Date();
		var dayFour=new Date();
		var dayFive =new Date();
		var daySix =new Date();
		dayOne.setDate(dayOne.getDate()+1);
		dayTwo.setDate(dayTwo.getDate()+2);
		dayThree.setDate(dayThree.getDate()+3);
		dayFour.setDate(dayFour.getDate()+4);
		dayFive.setDate(dayFive.getDate()+5);
		daySix.setDate(daySix.getDate()+6);
		var content = '<tr><th class="header hideBlock">Article #</th><th class="header hideBlock">Description</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', myDate)+'</th>'
				+ '<th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayOne)+'</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayTwo)+'</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayThree)+'</th>'
				+ '<th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayFour)+'</th><th class="centerValue header">'+$.datepicker.formatDate('dd/mm', dayFive)+'</th><th class="lastColumn centerValue header">'+$.datepicker.formatDate('dd/mm', daySix)+'</th></tr>';
		// $('.appended').remove();
		$.each(descList, function(i, item) {

			content += '<tr class="appended ';
			if (i == descList.length)
				content += content + ' lastRow ';
			content += '" id=" ' + i + '">' + '<td class="art-no hideBlock">'
					+ item.articleNo + '</td>' + '<td class="hideBlock">' + item.articleDesc
					+ '</td>' + '<td class="centerValue">' + item.day1Qty
					+ '</td>' + '<td class="centerValue">' + item.day2Qty
					+ '</td>' + '<td class="centerValue">' + item.day3Qty
					+ '</td>' + '<td class="centerValue">' + item.day4Qty
					+ '</td>' + '<td class="centerValue">' + item.day5Qty
					+ '</td>' + '<td class="centerValue">' + item.day6Qty
					+ '</td>' + '<td class="centerValue">' + item.day7Qty
					+ '</td> </tr>';
			// console.log(item.articleNo);

		});
		$('#dialog-openOrders #tabs-3 #sortTable').html('');
		$('#dialog-openOrders #tabs-3 #sortTable').html(content);
		hideContent();
		
	}
	if (recordCount > 20) {
		showPaginatedContent(recordCount);
	} else {
		showContent(recordCount);
	}
	//stopLoading();

}
function iterateTransitOrderResult(response) {
	var output = $.parseJSON(response);

	if ((output.data!=null && output.data!=undefined && output.data[0].msg!=undefined && output.data[0].msg.trim()!='') ||
			(output.msg != null && output.msg.length > 0)) {
		showErrorTab1(output.msg==''?output.data[0].msg:output.msg);
	} else if (output.data != null && output.data.length > 0) {
		var descList = output.data;
		//recordCount = descList[0].count;
		//currentPage = pageNumber;
		var content = '<thead><tr><th class="">Order #</th><th class="centerValue">Order Qty.</th><th class="centerValue">In-transit Qty.</th>'
			+'<th class="centerValue">Delivery Date</th><th class="centerValue">Supplier</th><th class="centerValue">Source</th>'
			+'<th class="lastColumn centerValue">Status</th></tr></thead>';
		// $('.appended').remove();
		$.each(descList, function(i, item) {

			content += '<tr class="appended ';
			if (i == descList.length)
				content += content + ' lastRow ';
			content += '" id=" ' + i + '">' + '<td class="art-no centerValue ">'
					+ item.orderNo.replace(/^0+/, '') + '</td>' + '<td class="centerValue">' + item.orderQty
					+ '</td>' + '<td class="centerValue">' + item.intransitQty
					+ '</td>' + '<td class="centerValue">' + item.deliveryDate.replace('.', '/').replace('.', '/')
					+ '</td>' + '<td class="centerValue">' + item.supplier.replace(/^0+/, '');
			if(item.supplier!='' && item.supplierName!='')content+=' - ';
			content+=item.supplierName
					+ '</td>' + '<td class="centerValue">' + item.source
					+ '</td>' + '<td class="centerValue">' + item.orderStatus
					+ '</td> </tr>';
			// console.log(item.articleNo);

		});
		$('#dialog-openOrders #tabs-2 #sortTable').html('');
		$('#dialog-openOrders #tabs-2 #sortTable').html(content);
		hideContent();
		
	}
	$('#dialog-openOrders').dialog('open');
	stopLoading();

}

function formReplenishmentData(response) {
	//var output = $.parseJSON(response);

	/*if (output.msg != null && output.msg.length > 0) {
		showErrorTab2(output.msg);
	} else if (output.data != null && output.data.length > 0) {*/
		var descList = response;
		var validFrom=$('#valid-from').val();
		var validTo=$('#valid-to').val();
		var fPlan=$('#future-plan').val();
		//recordCount = descList[0].count;
		//currentPage = pageNumber;
			
		var content = '<div class="tableInfo "><div class="tableTitle"><h4 class="sectionTitle">&nbsp; Unit of Measure:';
		var uniTblContent='';
		// $('.appended').remove();
		var tempUom='';
		$.each(descList, function(i, item) {

			//if(i==0){
				/*validFrom=$('#valid-from').val();
				validTo=$('#valid-from').val()
				fPlan=item.futurePlanReason;*/
			//}
			if(tempUom=='' || tempUom!=item.uom)
			{
				tempUom=item.uom;
			content += '<input type="radio" class="uomRadio" name="searchByOptions" value="'+item.uom+'" id="uomRep-'+item.uom+'"';
			if(i==0)
				content +=' checked=checked ';
			content += '><label for="uomRep-'+item.uom+'" class="labelText ">'+item.uom+'</label>';
			
			uniTblContent+='<table class="ContentTable uomTbl uomRep-'+item.uom+'';
			if(i>0)
				uniTblContent+=' hideBlock ';
			uniTblContent+=' " cellspacing="0" ><tbody><tr>'
					+'<td width="20%">Default MPL:</td><td width="13%" class="valueInfo">'+item.default_mpl+'</td>'
					+'<td width="20%">Default Shelf Capacity:</td><td width="13%" class="valueInfo">'+item.def_shelf_capacity+'</td>'
					+'<td width="33%" class="lastColumn">&nbsp;</td></tr><tr class="lastRow">'
					+'<td width="20%">Current MPL:</td><td width="13%" class="valueInfo">'
					+'<!--<a title="Adjust MPL" class="navigate" href="#">-->'+item.current_mpl+'<!--</a>--></td><td width="20%">Current Shelf Capacity:</td>'
					+'<td width="13%" class="valueInfo"><!--<a title="Adjust SC" class="navigate" href="#">-->'+item.cur_shelf_capacity+'<!--</a>--></td>'
					+'<td width="33%" class="lastColumn">&nbsp;</td></tr></tbody></table>';
			}

		});
		content+='</h4></div></div>'+uniTblContent;
		
		
		var currentDate=new Date();
		validFrom.replace('.','/').replace('.','/');
		validTo.replace('.','/').replace('.','/');
		var fromDate=new Date(validFrom.split('/')[1]+'/'+validFrom.split('/')[0]+'/'+validFrom.split('/')[2]);
		var toDate=new Date(validTo.split('/')[1]+'/'+validTo.split('/')[0]+'/'+validTo.split('/')[2]);
		
		if(fPlan==''){
			$('.fPlanRsn').parent().addClass('hideBlock');	
		}
		
		if(toDate>currentDate)
		$('.fPlanDTe').text(validTo);
		else if(fromDate>currentDate)
			$('.fPlanDte').text(validFrom);
		else
			$('.fPlanDte').text('');
		
		
		if($('.fPlanDte').text().trim()==''){
			$('.fPlanDte').parent().addClass('hideBlock');	
		}
		$('.fPlanRsn').text(fPlan);
		
		$('.replenishmentDiv').append(content);
		$('.uomRadio').click(function(e){
			e.stopPropagation();
			var id;
			if($(this).hasClass('labelText')){
				id=$(this).text().trim();
				//$('.uomRadio').removeProp('checked');$('#rep-'+id).prop('checked','checked');
			}else{
				id=$(this).attr('id');
			}
			$('.uomTbl').addClass('hideBlock');
			var cn='.'+id;
			$(cn).removeClass('hideBlock').show();
		});
		//$('#dialog-openOrders #tabs-2 #sortTable').html('');
		//$('#dialog-openOrders #tabs-2 #sortTable').html(content);
		//hideContent();
		
	//}
	//$('#dialog-openOrders').dialog('open');
	//stopLoading();

}
function checkFplan(){
	var validFrom=$('#valid-from').val();
	var validTo=$('#valid-to').val();
	var fPlan=$('#future-plan').val();
	
	var currentDate=new Date();
	validFrom.replace('.','/').replace('.','/');
	validTo.replace('.','/').replace('.','/');
	var fromDate=new Date(validFrom.split('/')[1]+'/'+validFrom.split('/')[0]+'/'+validFrom.split('/')[2]);
	var toDate=new Date(validTo.split('/')[1]+'/'+validTo.split('/')[0]+'/'+validTo.split('/')[2]);
	
	if(fPlan==''){
		$('.fPlanRsn').parent().addClass('hideBlock');	
	}
	
	if(toDate>currentDate)
	$('.fPlanDte').text(validTo);
	else if(fromDate>currentDate)
		$('.fPlanDte').text(validFrom);
	else
		$('.fPlanDte').text('');
	
	
	if($('.fPlanDte').text().trim()==''){
		$('.fPlanDte').parent().addClass('hideBlock');	
	}
	$('.fPlanRsn').text(fPlan);
}
function generateReport(data, pageNumber) {

	$.ajax({
		type : "get",
		url : "generateReport.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			iterateResult(response, pageNumber);
			//stopLoading();
			getIntrasitOrders(data);
		},
		error : function() {
			// goToLogin();
		},
	});

}
function getIntrasitOrders(data) {

	$.ajax({
		type : "get",
		url : "getIntrasitOrderDtl.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			iterateTransitOrderResult(response);
			stopLoading();
			//getIntrasitOrders(data);
		},
		error : function() {
			// goToLogin();
		},
	});

}

function getReplenishData(data) {

	$.ajax({
		type : "get",
		url : "getArticleReplenishData.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			formReplenishmentData(response);
			stopLoading();
		},
		error : function() {
			// goToLogin();
		},
	});

}
function showContent(count) {
	
	
	
}
function hideContent() {
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('.paginationWrapper').hide();
}
function showError(msg) {
	$('#dialog-openOrders .errorAddtnlDtls').remove();
	$('#dialog-openOrders .popupData #tabs-3')
	.append(
			'<h4 class="errorAddtnlDtls" style="padding-left:15px;margin-top:20px;color:red;background:url(../../images/iconError.png) 0 3px no-repeat">'+msg+'<h4>');
}
function showErrorTab2(msg) {
	$('#dialog-openOrders #tabs-3 .errorAddtnlDtls').remove();
	$('#dialog-openOrders .popupData #tabs-3')
	.append(
			'<h4 class="errorAddtnlDtls" style="padding-left:15px;margin-top:20px;color:red;background:url(../../images/iconError.png) 0 3px no-repeat">'+msg+'<h4>');
}
function showErrorTab1(msg) {
	$('#dialog-openOrders #tabs-2 .errorAddtnlDtls').remove();
	$('#dialog-openOrders .popupData #tabs-2')
	.append(
			'<h4 class="errorAddtnlDtls" style="padding-left:15px;margin-top:20px;color:red;background:url(../../images/iconError.png) 0 3px no-repeat">'+msg+'<h4>');
}
function hideError() {
	$('#dialog-openOrders .errorAddtnlDtls').remove();
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function showPaginatedContent(count) {
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			generateReport({
				pageNo : pageNumber
			}, pageNumber);

		}

	});
	//$('#dialog-openOrders').dialog('open');
}
function getArticleImg(articleNumber){
	var zeros="";
	for(var j=0;j<18-(articleNumber.length);j++) 
		zeros+='0';
	articleNumber=zeros+articleNumber;
	$.ajax({
	    url: "http://woolworthsapi.sites.tigerspike.com/Products/GetProductByarticle?article="+articleNumber+"&store=1141",
	    dataType: "xml",
	    success: function(data) {
		var $xml = $(data);
		console.log($xml.find('ImageUrl').text());
		
		$('.articleImg img').attr('src',$xml.find('ImageUrl').text().trim());
		$(".articleImg img").load(function() {
			$(this).css('padding-top','10px').css('padding-right','10px').css('padding-bottom','10px').css('padding-left','22px');
			$(this).css('height','140px').css('width','170px');
			$(this).parent().parent().css('overflow','hidden');
			
		});
		$(".articleImg img").error(function() {
			$('.articleImg img').attr('src','../../images/product1.jpg');
		});
		
	    },error:function(){
	    	$('.articleImg img').attr('src','../../images/product1.jpg');	
	    }
	});
}
function getPackBrkArticles(articleno,siteno,flag,linkFlag){
	var data={articleNo:articleno,siteno:siteno,option:flag,linkFlag:linkFlag};
	$.ajax({
		type : "get",
		url : "getArticlePackBrkData.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		datatype:"json",
		success : function(response) {
			//iterateTransitOrderResult(response);
			var json=$.parseJSON(response);
			
			
			if(json!=undefined && json!=null){
				if(flag!='Y'){
					if(json.msg3!=undefined && json.msg3!=null && json.msg3==''){
						var linkedArticles=json.link;
						formLinkContent(linkedArticles);
					}
				}else{
					if(//json.msg2!=undefined && json.msg2!=null && json.msg2=='' 
						//&& 
						json.msg1!=undefined && json.msg1!=null && json.msg1==''){
						var packBrkData=$.parseJSON(json.pbdData);
						//var packBrkArticle=$.parseJSON(json.pbk);
						formPbdContent(packBrkData);
						formReplenishmentData(packBrkData);
					}
				}
			}
			stopLoading();
			//getIntrasitOrders(data);
		},
		error : function() {
			// goToLogin();
		},
	});
}

function getArticleHierarchy(articleno,siteno){
	var data={articleNo:articleno,siteno:siteno};
	$.ajax({
		type : "get",
		url : "getArticleHierarchy.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		datatype:"json",
		success : function(response) {
			//alert(response);
			//iterateTransitOrderResult(response);
			var json=$.parseJSON(response);
			
		
			
			if(json!=undefined && json!=null && json.data!=undefined && json.data!=null){
				var output = json.data[0];
					if(json.msg!=undefined && json.msg!=null && json.msg==''){
						formDeptContent(output);
					}
			}
			stopLoading();
			//getIntrasitOrders(data);
		},
		error : function() {
			// goToLogin();
		},
	});
}

function getReplenishmentDtls(articleno,siteno){
	var data={articleNo:articleno,siteno:siteno};
	$.ajax({
		type : "get",
		url : "getReplenishment.htm",
		data : data,
		beforeSend : function() {
	startLoading();
			//fullScreenLoader();
		},
		datatype:"json",
		success : function(response) {
			
			
			//iterateTransitOrderResult(response);
			var json=$.parseJSON(response);
			
			
			
			if(json!=undefined && json!=null && json.data!=undefined && json.data!=null){
				var output = json.data[0];
					if(json.msg!=undefined && json.msg!=null && json.msg==''){
						formReplenishmentContent(output);
					}
			}
			stopLoading();
			//$.loader('close');
			//getIntrasitOrders(data);
		},
		error : function() {
			// goToLogin();
			//$.loader('close');
			stopLoading();
		},
	});
}

function formLinkContent(linkedArticles){
	if(linkedArticles!=null && linkedArticles!=undefined && linkedArticles.length>0){
		var link=$.parseJSON(linkedArticles);
		var linkContent='<div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">&nbsp; Linked Items</h4></div></div>';
			
			linkContent+='<table class="ContentTable" cellspacing="0"><tbody><tr><td width="20%">Parent Article #:</td>'
			//if(link[0].relation=='PARENT')	
			+'<td colspan="5" class="lastColumn">'+link[0].article.replace(/^0+/, '')+'</td></tr>';
		for(var i=0;i<link.length;i++){
			if(link[i].relation!='PARENT'){
			linkContent+='<tr><td width="20%">Child Article #	:</td>'
			+'<td width="13%" class="valueInfo">'+link[i].article.replace(/^0+/, '')+'</td>'
			+'<td width="20%">Order Multiple (OM):</td>'
			+'<td width="13%" class="valueInfo">'+link[i].om+'</td>'
			+'<td width="20%">Linkage Factor:</td>'
			+'<td width="13%" class="lastColumn valueInfo">'+link[i].linkageFactor+'</td></tr>';
			}
		}
		linkContent+='</tbody></table>';
		$('#PriceDetailsDiv #PriceDetails').append(linkContent);
	}else{
		
	}
	
}

function formPbdContent(pbdData){
	if(pbdData!=null && pbdData!=undefined && pbdData.length>0 
			//&& pbk!=null && pbk!=undefined && pbk.length>0
			){
		var commonTbl='<table class="ContentTable" cellspacing="0"><tbody><tr class="lastRow"><td width="20%">GST Rate:</td>'
		+'<td width="13%" class="valueInfo">'+$('#article-gst').val()+' %</td><td width="20%">Sell Price Group:</td>'
		+'<td width="22%" class="valueInfo">'+$('#article-sellGrp').val()+' - '+$('#article-sellGrpDesc').val()+'</td><td width="33%" class="lastColumn">&nbsp;</td></tr></tbody></table>';
			
		var uomContent='<div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">&nbsp; Unit of Measure(UOM):';
		var uomTblContent='';
		var EANcontent='<div class="tableInfo"><div class="tableTitle"><h4 class="sectionTitle">&nbsp; Additional EAN</h4></div></div>';
		var EANTblcontent='<table class="ContentTable" cellspacing="0"><tbody><tr><th width="25%">EAN / TUN</th><th width="25%">Unit of Measure (UOM)</th>'	
			+'<th width="25%">Base UOM</th><th width="25%" class="lastColumn">Pack Size</th></tr>';
		var tempUom='';
		for(var i=0;i<pbdData.length;i++){
			//pbdData[i].z2ean!=undefined && pbdData[i].z2ean.trim()!='')
			if(tempUom=='' || tempUom!=pbdData[i].uom)
			{
				tempUom=pbdData[i].uom;
				uomContent+='<input type="radio" name="searchByOption" ';
				//if(i==0){
					//uomContent+=' checked=checked ';
				//}
					uomContent+=' value="'+pbdData[i].uom+'" id="pdb-'+pbdData[i].uom+'" class="uomBTN uomInputRadio">'
				+'<label for="pdb-'+pbdData[i].uom+'" class="labelText ">'+pbdData[i].uom+'</label>';
				uomTblContent+='<table class="ContentTable uomInputTbl pdb-'+pbdData[i].uom+'" cellspacing="0"><tbody><tr>'
				+'<td width="20%">ISIS Ref #:</td><td colspan="5" class="lastColumn">';
				if(pbdData[i].z2ean!='')
					uomTblContent+=pbdData[i].z2ean;
				else
					uomTblContent+='ISISUOM-'+pbdData[i].uom;
				uomTblContent+='</td></tr>'
				+'<tr><td width="20%">Description:</td><td colspan="5" class="lastColumn">';
				if(pbdData[i].description!='')
					uomTblContent+=pbdData[i].description;
				//else
					//uomTblContent+='DESC-'+pbdData[i].uom;
				
				uomTblContent+='</td></tr>'
				+'<tr><td width="20%">Scan Description:</td><td colspan="5" class="lastColumn">';
				if(pbdData[i].scan_desc!='')
					uomTblContent+=pbdData[i].scan_desc;
				//else
					//uomTblContent+='SDESC-'+pbdData[i].uom;
				uomTblContent+='</td></tr>'
				+'<tr><td width="20%">Standard CUP Price:</td><td width="13%" class="valueInfo">';
				
				if(pbdData[i].cup!=undefined && pbdData[i].cup!='' && pbdData[i].cup!='0.00')
					uomTblContent+='$ '+pbdData[i].cup+' '+$('#article-compPriceUnit').val(); 
				uomTblContent+='</td>'
				+'<td width="20%">Promo Type:</td><td width="13%" class="valueInfo">'+pbdData[i].promoType +' '+$('#promoTypeDesc').val()+'</td>'
				+'<td width="20%">Promo Price:</td><td width="13%" class="lastColumn valueInfo">';
				if(pbdData[i].promoSellPrice!='' && pbdData[i].promoSellPrice!='0.00')
					uomTblContent+='$ '+pbdData[i].promoSellPrice;
				uomTblContent+='</td></tr>'
				+'<tr><td>Standard Sell Price:</td><td class="valueInfo">';
				if(pbdData[i].stdSellPrice!='')
					uomTblContent+='$ ';
				uomTblContent+=pbdData[i].stdSellPrice+'</td>'
				+'<td>Promo Start Date:</td><td class="valueInfo">'+pbdData[i].promoStartDate.replace('/','.').replace('/','.')
				+'</td><td><!--Promo Gross Profit:--></td><td class="lastColumn valueInfo">';
				//if(pbdData[i].promoGrossProfit!='' && pbdData[i].promoGrossProfit!='0.00')
					//uomTblContent+=pbdData[i].promoGrossProfit+' %';
				uomTblContent+='</td></tr>'
				+'<tr class="lastRow"><td><!--Standard Gross Profit:--></td><td class="valueInfo">';//+pbdData[i].stdGrossProfitPercent;
				//if(pbdData[i].stdGrossProfitPercent!='')
					//uomTblContent+=' %';
				uomTblContent+='</td>'
				+'<td>Promo End Date:</td><td class="valueInfo">'+pbdData[i].promoEndDate.replace('/','.').replace('/','.')+'</td><td class="lastColumn" colspan="2">&nbsp;</td></tr></tbody></table>';
			}else if(tempUom==pbdData[i].uom){
				var str='';
				var zean='';
				if(pbdData[i].z2ean!=''){
					str='ISISUOM-'+pbdData[i].uom;
					zean=pbdData[i].z2ean;
					uomTblContent=uomTblContent.replace(str,zean);
					str='UOM-'+pbdData[i].uom+$('#article-articleNo').val();
					uomTblContent=uomTblContent.replace(str,zean);
				/*	
					str='SDESC-'+pbdData[i].uom;
					zean=pbdData[i].desc;
					uomTblContent=uomTblContent.replace(str,zean);
					
					str='DESC-'+pbdData[i].uom;
					zean=pbdData[i].scanDesc;
					uomTblContent=uomTblContent.replace(str,zean);*/
					
				}else
					{
					str='ISISUOM-'+pbdData[i].uom;
					zean='UOM-'+pbdData[i].uom+$('#article-articleNo').val();
					uomTblContent=uomTblContent.replace(str,zean);
					}
			}
			
		}
		for(var i=0;i<pbdData.length;i++){
			var str='';
			//var zean='';
			str='ISISUOM-'+pbdData[i].uom;
			var ct='UOM-'+pbdData[i].uom;

			uomTblContent=uomTblContent.replace(str,$('#article-articleNo').val());
			//uomTblContent=uomTblContent.replace(str,zean);
			uomTblContent=uomTblContent.replace(ct,'');
			
			
			/*//*/
		}
		var tempUom='';
		for(var i=0;i<pbdData.length;i++){
			if(pbdData[i].uom!=undefined && pbdData[i].uom.trim()!='')
			{
				if(tempUom=='')
					{
					tempUom=pbdData[i].uom;
					EANcontent+='<table class="ContentTable uomInputTbl pdb-'+pbdData[i].uom+'" cellspacing="0"><tbody><tr><th width="25%">EAN / TUN</th><th width="25%">Unit of Measure (UOM)</th>'	
					+'<th width="25%">Base UOM</th><th width="25%" class="lastColumn">Pack Size</th></tr>';
					}
				if(pbdData[i].uom==tempUom){
					if(pbdData[i].ean!='')
					EANcontent+='<tr class="lastRow"><td>'+pbdData[i].ean+'</td><td>'+pbdData[i].uom+'</td><td>'+pbdData[i].baseUom+'</td><td class="lastColumn">'+pbdData[i].packSize+'</td></tr>';
					if(i==pbdData.length)
						EANcontent+='</tbody></table>';
				}
				else{
					EANcontent+='</tbody></table>';
					tempUom=pbdData[i].uom;
					if(i!=pbdData.length)
						{
						EANcontent+='<table class="ContentTable uomInputTbl pdb-'+pbdData[i].uom+'" cellspacing="0"><tbody><tr><th width="25%">EAN / TUN</th><th width="25%">Unit of Measure (UOM)</th>'	
							+'<th width="25%">Base UOM</th><th width="25%" class="lastColumn">Pack Size</th></tr>';
						if(pbdData[i].ean!='')
						EANcontent+='<tr class="lastRow"><td>'+pbdData[i].ean+'</td><td>'+pbdData[i].uom+'</td><td>'+pbdData[i].baseUom+'</td><td class="lastColumn">'+pbdData[i].packSize+'</td></tr>';
						}
				}
			}
		}
		
		uomContent+='</h4></div></div>';
		$('#PriceDetailsDiv ').html("").html('<div class="ContentTableWrapper">'+commonTbl+
				uomContent+uomTblContent+EANcontent+'</div>');
	}else{
		
	}
	$('.uomInputRadio').click(function(){
		var id;
		if($(this).hasClass('labelText')){
			id=$(this).text().trim();
			$('#pdb-'+id).attr('checked','checked');
		}else{
			id=$(this).attr('id');
		}
		$('.uomInputTbl').addClass('hideBlock');
		$('.'+id).removeClass('hideBlock');
	});
	$('.uomInputRadio:first').click();
	
}

function formDeptContent(deptData) {
	var content = '';
	
		content += '<tr class="lastRow"><td>' + deptData.department + '-'
				+ deptData.deptName + '</td>' + '<td>' + deptData.category
				+ ' -' + deptData.catName + '</td>' + '<td>'
				+ deptData.subCategory + '-' + deptData.subCatName + '</td>'
				+ '<td class="lastColumn segmentNo">' + deptData.segment + '-'
				+ deptData.segmentName + '</td></tr>';

	
	$('#accordion-1 .articleDiv .ContentTable tbody').append(content);
}

function formReplenishmentContent(articleSearchResutls){
	var validFrom=$('#valid-from').val();
	var validTo=$('#valid-to').val();
	var fPlan=$('#future-plan').val();
	
	var currentDate=new Date();
	validFrom.replace('.','/').replace('.','/');
	validTo.replace('.','/').replace('.','/');
	var fromDate=new Date(validFrom.split('/')[1]+'/'+validFrom.split('/')[0]+'/'+validFrom.split('/')[2]);
	var toDate=new Date(validTo.split('/')[1]+'/'+validTo.split('/')[0]+'/'+validTo.split('/')[2]);
	
	var content = '';
		
				content += '<tr><td width="20%">Last Received:</td>'
				+'<td width="13%" class="valueInfo">'+articleSearchResutls.lastDelDate
				+'</td><td width="20%">Next Delivery Qty:</td>'
				+'<td width="13%" class="valueInfo">'+articleSearchResutls.nextOrderQty
				+'</td><td width="20%">Vendor SKU:</td>'
				+'<td width="13%" class="lastColumn valueInfo">'+articleSearchResutls.vendorSku
				+'</td></tr>'
				+'<tr><td>Last Ordered Qty: </td>'
				+'<td class="valueInfo">';
				if(articleSearchResutls.nextDelDate !="" && articleSearchResutls.lastOrderQty!='0.000')
				content += articleSearchResutls.lastOrderQty;
				content+='</td><td>Perpetual Inventory UOM:</td><td class="valueInfo">';
				if(articleSearchResutls.piUom != "")
				content += articleSearchResutls.piUom;
				content+= '</td><td>Next Delivery Date: </td><td class="lastColumn valueInfo" >'
				+articleSearchResutls.nextDelDate+'</td></tr>';
				content+= '<tr><td>Last Received Qty:</td><td class="valueInfo">';
				if(articleSearchResutls.lastDelDate !="" && articleSearchResutls.lastReceiveQty!='0.000')
				content+= articleSearchResutls.lastReceiveQty;
				content+= '</td><td>Perpetual Inventory OM:</td><td class="valueInfo">';
				if(articleSearchResutls.piOm != "" && articleSearchResutls.piOm!='0')
				content+= articleSearchResutls.piOm;
				content+= '</td><td class="lastColumn" colspan="2">&nbsp;</td></tr>';
				var fPlanContent = '' ;
				
				if(toDate>currentDate)
					fPlanContent +=	'<tr><td>Future Plan Date:</td><td class="lastColumn fPlanDte" colspan="5">'+validTo+'</td></tr>';
				else if(fromDate>currentDate)
					fPlanContent +=	'<tr><td>Future Plan Date:</td><td class="lastColumn fPlanDte" colspan="5">'+validFrom+'</td></tr>';
				else
					fPlanContent +=	'<tr class="hideBlock"><td>Future Plan Date:</td><td class="lastColumn fPlanDte" colspan="5">'+ ' ' +'</td></tr>';
				
				if(fPlan==''){
					fPlanContent += '<tr class="hideBlock"><td>Future Plan Reason:</td>'
						+'<td class="lastColumn fPlanRsn" colspan="5">' +fPlan+'</td></tr>';
				}
				else
					{
					fPlanContent += '<tr><td>Future Plan Reason:</td>'
						+'<td class="lastColumn fPlanRsn" colspan="5">' +fPlan+'</td></tr>';
					}
				
				content+= fPlanContent;
				
				content+= '<tr class="lastRow"><td class="lastColumn " colspan="6">';
				if(articleSearchResutls.srt=='X')
					content+=	'<label class="positiveFlag">Shelf Ready</label>';
				if (articleSearchResutls.srt!='X')
					content+= '<label class="negativeFlag">Shelf Ready</label>';
					content+= '</td></tr> <div class="tableInfo "></div>';
				
					if (articleSearchResutls.defaultMpl != null && articleSearchResutls.defaultMpl != "" )
					$('#defaultMpl').text(articleSearchResutls.defaultMpl);
					
					if (articleSearchResutls.defaultShelfCapacity != null && articleSearchResutls.defaultShelfCapacity != "" )
						$('#defaultShelf').text(articleSearchResutls.defaultShelfCapacity);
	
		
					$('#accordion-2 .replenishmentDiv #repTable1 tbody').html('');		
	$('#accordion-2 .replenishmentDiv #repTable1 tbody').append(content);	
			}

function getPosInfo(articleno,siteno){
	var data={articleNo:articleno,siteno:siteno};
	$.ajax({
		type : "get",
		url : "getArticlePOSData.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		datatype:"json",
		success : function(response) {
			//iterateTransitOrderResult(response);
			var json=$.parseJSON(response);
			if(json!=undefined && json!=null){
					if(json.msg!=undefined && json.msg!=null && json.msg==''){
						var posList=json.data;
						formPOSContent(posList);
					}else{
						
					}
			}
			stopLoading();
			//getIntrasitOrders(data);
		},
		error : function() {
			// goToLogin();
		},
	});
	
}
function formPOSContent(posList){
	if(posList!=null && posList!=undefined && posList.length>0){
		if(posList[0].posWeighed=='Y')
			$('.pos-pw').addClass('positiveFlag');
		else
			$('.pos-pw').addClass('negativeFlag');
		
		if(posList[0].prohibitPrcOverride=='Y')
			$('.pos-ppo').addClass('positiveFlag');
		else
			$('.pos-ppo').addClass('negativeFlag');	
		
		if(posList[0].defaultPrice=='Y')
			$('.pos-df').addClass('positiveFlag');
		else
			$('.pos-df').addClass('negativeFlag');
		
		if(posList[0].forceQty=='Y')
			$('.pos-fq').addClass('positiveFlag');
		else
			$('.pos-fq').addClass('negativeFlag');
		
		if(posList[0].prohibitDiscount=='Y')
			$('.pos-pd').addClass('positiveFlag');
		else
			$('.pos-pd').addClass('negativeFlag');
		
		if(posList[0].foodStamp=='Y')
			$('.pos-fs').addClass('positiveFlag');
		else
			$('.pos-fs').addClass('negativeFlag');
		
		if(posList[0].manualPrice=='Y')
			$('.pos-mp').addClass('positiveFlag');
		else
			$('.pos-mp').addClass('negativeFlag');
		
		if(posList[0].inhibitQtyRepeat=='Y')
			$('.pos-iqr').addClass('positiveFlag');
		else
			$('.pos-iqr').addClass('negativeFlag');
		
		$('.pos-ptw').text(posList[0].posTareWeight);
			
	}
}
