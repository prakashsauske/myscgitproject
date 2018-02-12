/*$(function() {
	getEncSAPPassword();
	//changed to 45 days
	dateT.setTime(new Date().getTime() - (45 * 24 * 60 * 60 * 1000));
	var mon = '00' + (dateT.getMonth() + 1);
	var dat = '00' + (dateT.getDate());
	dateT = (dat.substr((dat.length - 2), dat.length)) + '/' + (mon.substr((mon.length - 2), mon.length))
			+ '/' + dateT.getFullYear();
	$("#dialog-sohHistory").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 650,
			width : 900
		});
	$("#dialog-sohHistory").parent().addClass("popupWrapper");
});
*//**
 * Configuration to generate table
 * 
 * @param data
 * @returns {tblGoodsMovementSummary}
 *//*
function tblGoodsMovementSummary(data){
	this.option = 'build';
	this.key = ['article_no', 'article_desc', 'uom', 'reason_code_desc', 'date_time_sap', 'user_name', 'oldSOH',
			 'end_soh', 'adjustment_qty_new'];
	this.table_name = pop_report_name;
	this.table_title = title;
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_name = {
		article_no : 'Article </br> Number',
		article_desc : 'Article </br> Description',
		uom : 'UOM',
		user_name : 'User/System',
		oldSOH : 'Prev </br> SOH',		
		std_sell_price : 'Std. Sell </br> Price ($)',
		adjustment_value : 'Stock </br> Value </br> Adjusted ($)',
		end_soh : 'New </br> SOH',
		mvmt_type_desc : 'Additional Info'
	}, this.header_data_type = {
		article_no : 'char',
		article_desc : 'char',
		uom : 'char',
		reason_code_desc : 'char',
		date_time_sap : 'date',
		user_name : 'char',
		oldSOH : 'number',
		adjustment_qty_new : 'number',
		end_soh : 'number',		
		std_sell_price : 'number',
		adjustment_value : 'number',
		mvmt_type_desc : 'char'
	}, this.header_row_type = {
		article_no : 'main',
		article_desc : 'main',
		uom : 'main',
		reason_code_desc : 'main',
		date_time_sap : 'main',
		user_name : 'main',
		oldSOH : 'main',		
		adjustment_qty_new : 'main',
		end_soh : 'main',
		std_sell_price : 'main',
		adjustment_value : 'main',
		mvmt_type_desc : 'main'
	}, this.header_class = {
		article_no : '',
		article_desc : '',
		uom : '',
		reason_code_desc : '',
		date_time_sap : '',
		user_name : 'centerValue',
		oldSOH : 'centerValue',		
		adjustment_qty_new : 'centerValue',
		end_soh : 'centerValue',
		std_sell_price : 'centerValue',
		adjustment_value : 'centerValue',
		mvmt_type_desc : 'centerValue lastColumn'
	}, this.header_title = {}, this.header_width = {
		article_no : '',
		article_desc : '',
		uom : '',
		reason_code_desc : '',
		date_time_sap : '17%',
		user_name : '',
		oldSOH : '',		
		adjustment_qty_new : '',
		end_soh : '',
		std_sell_price : '',
		adjustment_value : '',
		mvmt_type_desc : ''
	}, this.content_class = {
		article_no : '',
		article_desc : '',
		uom : '',
		reason_code_desc : '',
		date_time_sap : '',
		user_name : 'centerValue',
		oldSOH : '',		
		adjustment_qty_new : 'centerValue',
		end_soh : '',
		std_sell_price : 'centerValue',
		adjustment_value : 'centerValue',
		mvmt_type_desc : 'centerValue lastColumn'
	}, this.content_title = {}, this.content_format = {
		article_no : 'removeNull',
		article_desc : 'removeNull',
		uom : 'removeNull',
		reason_code_desc : 'removeNull',
		date_time_sap : '',
		user_name : 'removeNull',
		oldSOH : 'removeNull',		
		adjustment_qty_new : 'removeNull',
		end_soh : 'removeNull',
		std_sell_price : 'removeNull',
		adjustment_value : 'removeNull',
		mvmt_type_desc : 'removeNull'
	}, this.content_width = {
		article_no : '',
		article_desc : '',
		uom : '',
		reason_code_desc : '',
		date_time_sap : '17%',
		user_name : '',
		oldSOH : '',		
		adjustment_qty_new : '',
		end_soh : '',
		std_sell_price : '',
		adjustment_value : '',
		mvmt_type_desc : ''
	};
	this.header_td_label = {
		date_time_sap : 'Date & Time',
		reason_code_desc : 'Reason Code & </br> Description',
		adjustment_qty_new : 'Qty. </br> Adjusted',
		oldSOH : 'Prev </br> SOH'
	};
	this.content = data;
	this.pagination = true;
	this.groupby = true;
	this.groupbyColumn = {
		'article_no' : 'Article',
		'dept_id' : 'Sub Category'
	};
	this.group_cont_function = {
		article_no : getGMSArticleGrpCont,
		dept_id : getGMSSubCatGrpCont
	};
	this.cont_data_function = {
		user_name : showGMSUserName, 
		oldSOH : showGMSOldSOH,
		date_time_sap : showGMSAdjDateTime,
		reason_code_desc : showGMSReasonDescSAPCall,
		end_soh : showGMSEnd_soh,
		adjustment_qty_new : showGMSAdjustment_qty
	};
	this.cont_sort_function = {
		oldSOH : getGMSOldSOH,
		date_time_sap : getGMSAdjDateTime,
		reason_code_desc : getGMSReasonDesc,
		adjustment_qty_new : getGMSAdjustment_qty
	};
	this.recordPerPage = 10;
	this.filter = false;
	this.curr_page = 1;
	this.sort = true;
	this.content_bind_event = {
		click : ''
	};
	this.content_tr_addon = {
		click : ''
	};
	this.content_td_addon = {
		click : ''
	};
	this.content_label = {};
	this.grp_tot = true;
	this.group_tot_cont_function = {
		article_no : getGMSTotalStcokAdjValueByArticle,
		reason_code_desc : getTotalStcokAdjValueByReasonSAP,
		user_name : getTotalStcokAdjValueByUser,
		date_time_sap : getTotalStcokAdjValueByDateSAP
	};
	this.default_groupbyColumn = [ 'article_no' ];
}

*//**
 * Group by article content
 *//*
var getGMSArticleGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.article_no || '')
				+ '</td></tr>';
	}
	return cont;
};
*//**
 * Group by article content
 *//*
var getGMSSubCatGrpCont = function(obj, confObj) {
	var cont = '<tr id="none"></tr>';
	if (obj != null && obj != undefined) {
		cont = '<tr><td class="valueInfo" colspan="12">'
				+ (obj.dept_id || '')
				+ '</td></tr>';
	}
	return cont;
};



var showGMSUserName = function(obj){
	if(obj.user_id != '' && obj.user_id != undefined){
		return obj.user_name+"("+obj.user_id+")"; // defect no 9624
	}else{
		return obj.user_name;
	}
};
var showGMSEnd_soh = function(obj)
{
	return Number(obj.end_soh).toFixed(2);// defect no 7289
};

var showGMSAdjDateTime = function(obj) {
	var dateTime = '';

	if (obj.adjustment_date != undefined && obj.adjustment_date != '') {// dd.mm.yyyy
		var dateArray = obj.adjustment_date.split(".");
		dateTime = dateArray[0] + "/" + dateArray[1] + "/" + dateArray[2];
	}

	if (obj.adjustment_time != undefined && obj.adjustment_time != '') {
		dateTime = dateTime + ' ' + obj.adjustment_time;
	}
	obj.date_time_sap = dateTime;

	return obj.date_time_sap;
};

var showGMSReasonDescSAPCall = function(obj) {
	return ((obj.store_reason_code_long_desc||'') !='' ? obj.store_reason_code_long_desc : obj.mvmt_type_desc)
				+ ((obj.store_reason_code||'')!= '' ? ((obj.store_reason_code || '') != '' ? "(" +obj.store_reason_code+ ")" : '') : ((obj.mvmt_type || '') != '' ? "(" + obj.mvmt_type + ")" : ''));
		
};
var showGMSOldSOH = function(obj) {
	if (obj.end_soh != undefined && obj.adjustment_qty != undefined && obj.shkzg != undefined) {
		if(obj.shkzg != undefined && obj.shkzg != null && obj.shkzg !='' && obj.shkzg == 'S' )
		obj.oldSOH = Number(obj.end_soh) - Number(obj.adjustment_qty);
		if(obj.shkzg != undefined && obj.shkzg != null && obj.shkzg !='' && obj.shkzg == 'H' )
			obj.oldSOH = Number(obj.end_soh) + Number(obj.adjustment_qty);	
	} else {
		obj.oldSOH = '';
	}
	return Number(obj.oldSOH).toFixed(2);// defect no 7289
};

var showGMSAdjustment_qty = function(obj)
{
	if (obj.adjustment_qty != undefined && obj.adjustment_qty != null && obj.adjustment_qty != '') {
		if(obj.shkzg != undefined && obj.shkzg != null && obj.shkzg !='' && obj.shkzg == 'S' ){
			obj.adjustment_qty_new = Math.abs(obj.adjustment_qty);
			return '+'+Number(obj.adjustment_qty).toFixed(2);
		}if(obj.shkzg != undefined && obj.shkzg != null && obj.shkzg !='' && obj.shkzg == 'H' ){
			obj.adjustment_qty_new = -Math.abs(obj.adjustment_qty);
			obj.adjustment_qty = Math.abs(obj.adjustment_qty);
			return '-'+Number(obj.adjustment_qty).toFixed(2);
		}
		
		return Number(obj.adjustment_qty).toFixed(2);
	} 
};


var getGMSAdjDateTime = function() {
	return 'date_time_sap';
};
var getGMSReasonDesc = function() {
	return 'mvmt_type_desc';
};
var getGMSOldSOH = function() {
	return 'oldSOH';
};
var getGMSAdjustment_qty = function()
{
	return 'adjustment_qty_new';
};
var getGMSTotalStcokAdjValueByArticle = function(obj, confObj) {
	var array = confObj.groupedContObj[obj.group_key + ' '];
	var tot = 0;
	// console.log(array);
	if (array != undefined && array.length > 0) {
		for ( var i = 0; i < array.length; i++) {
			tot += array[i].stk_adj_value != undefined
					&& array[i].stk_adj_value != null ? Number(array[i].stk_adj_value)
					: 0;
		}
	}
	return '';
	return '<tr><td class="valueInfo" colspan="9">Total Stock Value Adjusted :  </td><td class="centerValue valueInfo">'
			+ Number(tot).toFixed(2)
			+ '</td><td class=" lastColumn valueInfo" colspan="3">&nbsp;</td></tr>';
};*/