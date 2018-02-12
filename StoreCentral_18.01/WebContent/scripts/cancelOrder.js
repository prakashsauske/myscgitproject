
function cancelOrders(formData,elem) {
	elem.click(function(){
		var orderType=formData.IV_PREQ_NO
		var itemInfo=[];
		for(var i in formData.itemInfo){
		itemInfo.push({
			"IV_PO_NO"  :formData.IV_PO_NO,
			"IV_SITE"  :formData.IV_SITE,
			"IV_PR_TYPE":  formData.IV_PR_TYPE,
			"IV_DOC_TYPE":  formData.IV_DOC_TYPE,
			"IV_ITEM_CAT" : formData.IV_ITEM_CAT,
			"IV_RETURNS"  :formData.IV_RETURNS,
			"IV_PREQ_NO"  :formData.IV_PREQ_NO,
			"IV_ITEM_NO"  :formData.IV_ITEM_NO,
			"IV_ARTICLE"  :formData.IV_ARTICLE,
			"IV_QUANTITY"  :formData.IV_QUANTITY,
			"IV_UOM"  :formData.IV_UOM,
			"IV_FLAG"  :formData.IV_FLAG,
			"IV_RECEVING_SITE"  :formData.IV_RECEVING_SITE,
			"IV_SUPPLYING_SITE"  :formData.IV_SUPPLYING_SITE
			});
		}
		var cancelParam = {
				"IV_SITE":formData.IV_SITE,
				"IV_USER_NAME":formData.IV_USER_NAME,
				"IV_SAP":formData.IV_SAP,
				"ITEM_INFO":itemInfo
				};
		
		if(orderType=='PREQ'){
			cancelPREQ(cancelParam);
		}else if(orderType=='PO'){//End of PO
			cancelPO(cancelParam);
		}else if(orderType=='IBT'){//End of STO
			cancelIBT(cancelParam);
		}//End of Cancel IBT
		
		
	});
}
//
function cancelPREQ(cancelParam){
	$.ajax({
		type : "post",
		url : "/orders/updatePreq.htm",
		data : cancelParam,
		beforeSend : function() {
		},
		success : function(response) {
			showInformation("Order updated successfully.");
		},
		error : function() {
			// goToLogin();
		},
	});
}

function cancelPO(cancelParam){
	$.ajax({
		type : "post",
		url : "/orders/updateOrder.htm",
		data : cancelParam,
		beforeSend : function() {
		},
		success : function(response) {
			showInformation("Order updated successfully.");
		},
		error : function() {
			// goToLogin();
		},
	});
}

function cancelIBT(cancelParam){
	$.ajax({
		type : "post",
		url : "/orders/ibtCancel.htm",
		data : cancelParam,
		beforeSend : function() {
		},
		success : function(response) {
			showInformation("Order updated successfully.");
		},
		error : function() {
			// goToLogin();
		},
	});
}