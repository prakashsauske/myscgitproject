function bindFinaliseSTTabEvents(){
	$('#finaliseStocktakeButton').click(function(){
		if(finaliseSTSelectedDept == undefined || finaliseSTSelectedDept == ''){
			$.fn.showCustomMsg(['Please select a row to finalise.'],error,'Stocktake-StocktakeValuation');
		}else{
			callServiceToFinaliseSTDetails();	
		}		
	});	
}
function callServiceToGetFinaliseStocktakeDetails(){
	var requestParam = {"iv_stocktake_id" : $("#reportDetailsStockTakeId").html()};	
	console.log(reportSTValuationUrl + ' ' + JSON.stringify(requestParam));	
	
	$.ajax({
	    type: "POST",
	    url: reportSTValuationUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseP = response;
		 responseP = [ {'department_name': '149539','finalise_status':'FINALIZED','ttl_rsrv_flr_val': '40','ttl_stock_val': '50'},
		                {'department_name': '1499','finalise_status':'NOT FINALIZED','ttl_rsrv_flr_val': '41','ttl_stock_val': '50'}];
		  //console.log(JSON.stringify(responseP));	
			if(responseP != undefined  && responseP.length > 0 && responseP[0].department_name != undefined){
				$("#reportContent7").removeClass("hideBlock");
				loadReportContentTbl();
				totalRecords = responseP.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
				//bindStockValueExport();
			} else {
				if(responseP != undefined && responseP.length <= 0 ){
					//$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-StocktakeValuation');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-StocktakeValuation');
				}	
			}			
	  }).fail(function() {		  
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-StocktakeValuation');
	  }).always(function() {
		  stopLoading();
	  });
}
function tblFinaliseStocktake(data){
	this.option = 'build';
	this.key = ['label','department_name','ttl_stock_val'];
	this.table_name = "Finalise_Stocktake";
	this.table_title = "";
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {department_name:'Department',ttl_stock_val:'Total Stock($)',label:'Select'},
	this.header_data_type = {department_name:'char',ttl_stock_val:'number',label:''},
	this.header_row_type = {department_name:'main',ttl_stock_val:'main'},
	this.header_class = {department_name:' leftValue ',ttl_stock_val:' rightvalue ',label:'centerValue'},
	this.header_title = {},
	this.header_width = {department_name:'10%',ttl_stock_val:'10%',label:'10%'},
	this.content_class = {department_name:' leftValue ',ttl_stock_val:' rightvalue ',label:'centerValue'},
	this.content_title = {},
	this.content_format = {department_name:'removeNull',ttl_stock_val:'removeNull',label:''},
	this.content_width =  {department_name:'10%',ttl_stock_val:'10%',label:'10%'},
	this.comp_key_parser = {};
	this.content =  data;
	this.pagination = true;
	this.groupby = false;
	this.recordPerPage= 10;
	this.filter= false;
	this.curr_page= 1;
	this.sort=false;
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {label:{'input':{event:{click : onFinaliseStockTakeSelect},display: retainCheck}}};
	this.content_label = {label:showFinaliseSTRadio};
	this.header_td_addon = {label:{'input':{event:{click : function(){}},display: function(){}}}}; 
	this.header_td_label = {label:' '};
}

var showFinaliseSTRadio = function(obj){
	if(obj.finalise_status == 'FINALIZED'){
		return '<input type="radio" name="finaliseSTRadio">';
	}else{
		return '';
	}
};
var onFinaliseStockTakeSelect = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	finaliseSTSelectedDept =$tr.data('obj');
};
function callServiceToFinaliseSTDetails(){
	var requestParam = {"iv_stocktake_id" : $("#reportDetailsStockTakeId").html()};	
	console.log(reportSTValuationUrl + ' ' + JSON.stringify(requestParam));	
	
	$.ajax({
	    type: "POST",
	    url: reportSTValuationUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseP = response;
		 responseP = [ {'department_name': '149539','finalise_status':'FINALIZED','ttl_rsrv_flr_val': '40','ttl_stock_val': '50'},
		                {'department_name': '1499','finalise_status':'NOT FINALIZED','ttl_rsrv_flr_val': '41','ttl_stock_val': '50'}];
		  //console.log(JSON.stringify(responseP));	
			if(responseP != undefined  && responseP.length > 0 && responseP[0].department_name != undefined){
				$("#reportContent7").removeClass("hideBlock");
				loadReportContentTbl();
				totalRecords = responseP.length;
				$("#noRecords").html(totalRecords);//Sets the no of records
				callServiceToGetFinaliseStocktakeDetails();//To regenerate the table after update
				//bindStockValueExport();
			} else {
				if(responseP != undefined && responseP.length <= 0 ){
					//$.fn.showCustomMsg(['Sorry, No records found.'],success,'Stocktake-StocktakeValuation');
				}else{
					$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-StocktakeValuation');
				}	
			}			
	  }).fail(function() {		  
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stocktake-StocktakeValuation');
	  }).always(function() {
		  finaliseSTSelectedDept = '';
		  stopLoading();
	  });
}