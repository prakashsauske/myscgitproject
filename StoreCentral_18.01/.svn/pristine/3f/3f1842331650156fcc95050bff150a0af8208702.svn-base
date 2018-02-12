function validateArticleforOrder(articleList, removeFromList, formData){	
	console.log("validation start");
	var errorMsg=[];
	var errorMsgList=[];
	var psArticleMap={};
	var blockedArticlesMap={};
	var alcStatusArticleMap={};
	
	if(articleList != undefined && articleList.length >0){
		
	for(var i=0; i<articleList.length; i++){
	var articleDetail = articleList[i];
    var articleNo = articleDetail.article == undefined ? articleDetail.article_no : articleDetail.article;
 	var supplierNo = articleDetail.supplier == undefined ? (articleDetail.supplier_no) : (articleDetail.supplier);
 	var id = articleNo + '_' + supplierNo;
 	var uom = articleDetail.article_uom;
	
	//Validation using alc_status
	if (articleDetail.alc_status == 'DA' || articleDetail.alc_status == 'ES') {
		var alcStatusArray = [];
		  	alcStatusArray["articleNo"]=articleNo;
		  	alcStatusArray["alc_status"]=articleDetail.alc_status;
		  	alcStatusArray["uom"]=uom;
		  	alcStatusArray["desc"]=articleDetail.article_desc;
		  	alcStatusArticleMap[id]=alcStatusArray;
		  	if(removeFromList)
		  	articleList.splice(i, 1);
	}
	
	   
    //Validation using ps article status
    if(articleDetail.ps_article_status != '' /* && articleDetail.block_flag != 'Y'*/ 
    	&& (articleDetail.ps_article_status == '08' || articleDetail.ps_article_status == 'ZA' 
    		|| articleDetail.ps_article_status == '02' ||articleDetail.ps_article_status == 'CA' 
    			||articleDetail.ps_article_status == 'HF'))    	
	{
  	  var from=formatDateMobi(articleDetail.ps_stat_start_date);
	  var to=formatDateMobi(articleDetail.ps_stat_end_date);			
	  var psArtcleArray=[];
	  var check1 = currDate();
	  if(formData != undefined && formData.deliveryDate != undefined && formData.deliveryDate != ''){
		  check1=formData.deliveryDate;  
	  }else if(removeFromList){
		  check1=formatDateMobi(articleDetail.delivery_date); 
	  }else{
		  check1=articleDetail.delivery_date;
	  }
	  if(check1 == '' || check1 == undefined || check1 == null){
		  check1 = currDate();
	  }
	  if(liesBetweenDateRange(from,to,check1))
			{
				psArtcleArray["articleNo"]=articleNo;
				psArtcleArray["uom"]=uom;
				psArtcleArray["from"]=from;
				psArtcleArray["to"]=to;
				psArtcleArray["articleStatus"]=articleDetail.ps_article_status;
				psArtcleArray["desc"]=articleDetail.article_desc;
				psArticleMap[id]=psArtcleArray;	
				if(removeFromList)
				articleList.splice(i, 1);
			}		
	}
    
    //Defect 10859 Fix - Validateion for Article & Order uom
    if(/*articleDetail.article_uom == null || articleDetail.article_uom == undefined || articleDetail.article_uom == '' 
    	|| */articleDetail.order_uom == null || articleDetail.order_uom == undefined || articleDetail.order_uom.trim() == ''){
		errorMsgList.push("Source of supply error");
	}
	}
	
	}
	
    if (!isEmptyMap(alcStatusArticleMap)) {
    	errorMsg = getAlcStatusArticleMessage(alcStatusArticleMap);
    	$.merge(errorMsgList, errorMsg);
    }
    if(!isEmptyMap(psArticleMap))
    {
    	errorMsg = getPSArticleStatusMessage(psArticleMap);
    	$.merge(errorMsgList, errorMsg);
    }
    
    //commenting as we handled in order redesign validation    
  //Validation for blocking
    /*if (articleDetail.block_flag == 'Y') {
  	var blockedArticlesArray = [];
      blockedArticlesArray["articleNo"]=articleNo;
      blockedArticlesArray["blockReason"]=articleDetail.block_reason;
      blockedArticlesArray["uom"]=uom;
      blockedArticlesArray["desc"]=articleDetail.article_desc;
      blockedArticlesMap[id]=blockedArticlesArray;
      if(removeFromList)
      articleList.splice(i, 1);
    }
    if (!isEmptyMap(blockedArticlesMap)) {
    	errorMsg = getBlockedArticlesMessage(blockedArticlesMap);
    	$.merge(errorMsgList, errorMsg);
    }*/
    return errorMsgList;
}

function getAlcStatusArticleMessage(alcArticleMap)
{
	
var objectExists = false;	
var content ='';
var errorMsgList = []; 
	for(var m in alcArticleMap)
		{
		objectExists = true;
		var articleStatus= '';
		if(alcArticleMap[m].alc_status == 'DA' )
		{				
			articleStatus='Deleted Line';
		}
		if(alcArticleMap[m].alc_status == 'ES' )
		{				
			articleStatus='End of stock ( deleted)';
		}
		content= 'Article '+ alcArticleMap[m].articleNo +' -- '+alcArticleMap[m].desc +' is a '+articleStatus+ '. Order creation not allowed <br>' ;
		errorMsgList.push(content);
		}
	if(objectExists)
	{
	return errorMsgList;	
	}
	else
	return '';
}

function getPSArticleStatusMessage(psArticleMap)
{	
var objectExists = false;	
var content ='';
var errorMsgList = []; 
for(var m in psArticleMap)
{
	objectExists = true;
	var articleStatus= '';
	if(psArticleMap[m].articleStatus == 'ZA' )
	{				
		articleStatus='Ready for Archiving';
	}
	else if(psArticleMap[m].articleStatus == '08')
	{
		articleStatus='Product Recall/Hold';
	}
	else if(psArticleMap[m].articleStatus == '02')
	{
		articleStatus='Blocked for Procurement';
	}
	else if(psArticleMap[m].articleStatus == 'CA')
	{
		articleStatus='Clear Article';
	}
	else if(psArticleMap[m].articleStatus == 'HF')
	{
		articleStatus='Hold Faulty';
	}
	content = 'PS_Block - '+ articleStatus +', article '+psArticleMap[m].articleNo+' -- '+psArticleMap[m].desc	+' cannot be ordered<br>';
	//' from '+psArticleMap[m].from+' to '+psArticleMap[m].to+'.'+'<br>' ;
	errorMsgList.push(content);	
	}
	if(objectExists)
	{
	return errorMsgList;
	}
	else
		return '';
	
}

function getBlockedArticlesMessage(blockedArticleMap)
{	
var objectExists = false;	
var content ='';
var errorMsgList = []; 
	for(var m in blockedArticleMap)
		{
		objectExists = true;
		content= 'Article ' + blockedArticleMap[m].articleNo+' - '+ blockedArticleMap[m].uom + 'cannot be added due to ' + blockedArticleMap[m].blockReason+'<br>';
		errorMsgList.push(content);
		}
	if(objectExists)
	{
	return errorMsgList;		
	
	}
	else
		return '';
}

function minMaxQtyValidation(draftList, response,  isfromUpdate)
{	
	var errorMsg = '';
	var errorMsgList = [];
	var group = {};
	var dlist = '';
	if(response != undefined && response != ''){
		dlist = executeVendorConValDraftList(draftList, response);
	}else{
		dlist = draftList;
	}	
	if(dlist != null && dlist != ''){
	if(isfromUpdate){
		var id = 'update';		
		group[id]=dlist;
	}else{
		group = formOrderGroup(dlist);
	}
	if(group != null && group != undefined){
	  for(var m in group)
		{
		  var list = group[m];	
		  var totalOrderedQty = 0;
		  var totalOrderedValue = 0;
		  var vendorMinQty = list[0].min_order_qty;
		  var vendorMaxQty = list[0].max_order_qty;		  
		  var supplier = (list[0].supplier ==undefined || list[0].supplier == "")?list[0].supplier_no:list[0].supplier;
		  var supplierName = list[0].supplier_name;
		 /* var vendorMinValue = list[0].min_order_value;
		  var vendorMaxValue = list[0].max_order_value;*/
		  
		  if((vendorMinQty !=null && vendorMinQty !=undefined && vendorMinQty !='') ||
				  (vendorMaxQty!=null && vendorMaxQty !=undefined && vendorMaxQty !='') /*||
				  (vendorMinValue!=null && vendorMinValue !=undefined && vendorMaxQty !='') ||
				  (vendorMaxValue!=null && vendorMaxValue !=undefined && vendorMaxValue !='')*/){
			if(isfromUpdate)
				for (var i = 0; i < list.length; i++) {	
				  if(list[i].newQty != "")
				      totalOrderedQty += (list[i].om != undefined && list[i].om != "")?
				    		  Number(list[i].newQty*list[i].om):Number(list[i].newQty);
				      //totalOrderedValue += Number(list[i].cost_price*list[i].qty); 
				  }
			else
				  for (var i = 0; i < list.length; i++) {	
					  if(list[i].qty != "")
				      totalOrderedQty += (list[i].om != undefined && list[i].om != "")?
				    		  Number(list[i].qty*list[i].om):Number(list[i].qty);
				      //totalOrderedValue += Number(list[i].cost_price*list[i].qty); 
				  }
		  if(totalOrderedQty != 0 && vendorMinQty!=null && vendorMinQty!=undefined && vendorMinQty!=''
			  && vendorMinQty != 0){
			  if(totalOrderedQty<vendorMinQty){
				 // errorMsg = supplier+" - "+supplierName+" : Total order Quantity "+totalOrderedQty+" can't be less than vendor minimum order qty "+vendorMinQty+"</br>";
				  errorMsg = "Vendor - "+supplier+" : Total order Quantity "+totalOrderedQty+" can't be less than vendor minimum order qty "+vendorMinQty+"</br>";
				  
				  //errorMsg = list[0].supplier_name+" vendor order should have minimum of "+vendorMinQty+" quantity for the delivery date "+list[0].delivery_date+'</br>';
				  errorMsgList.push(errorMsg);
			  }
		  }
		  if(totalOrderedQty != 0 && vendorMaxQty!=null && vendorMaxQty!='' && vendorMaxQty!=undefined
				  && vendorMaxQty != 0){
			  if(totalOrderedQty>vendorMaxQty){
				 // errorMsg = supplier+" - "+supplierName+" : Total order Quantity "+totalOrderedQty+" can't be greater than vendor maximum order qty "+vendorMaxQty+"</br>";				 
				  errorMsg = "Vendor - "+supplier+" : Total order Quantity "+totalOrderedQty+" can't be greater than vendor maximum order qty "+vendorMaxQty+"</br>";
				  errorMsgList.push(errorMsg);
			  }
		  }
		 /* if(totalOrderedValue != 0 && vendorMinValue!=null && vendorMinValue!=''&& vendorMinValue!=undefined){
			  if(totalOrderedValue<vendorMinValue){
				  errorMsg = "Total order value "+totalOrderedValue+" can't be less than vendor minimum order value "+vendorMinValue+"</br>";				
				  errorMsgList.push(errorMsg);
			  }
		  }
		  if(totalOrderedQty != 0 && vendorMaxValue!=null && vendorMaxValue!=''&& vendorMaxValue!=undefined){
			  if(totalOrderedValue>vendorMaxValue){
				  errorMsg = "Total order value "+totalOrderedValue+" can't be greater than vendor maximum order value "+vendorMaxValue+"</br>";				  
				  errorMsgList.push(errorMsg);
			  }
		  }*/
		  }
		}
	}
	}
	return errorMsgList;
}
function formOrderGroup(draftList){
	var group = {};	
	  if (draftList.length > 0) {
		  for (var i = 0; i < draftList.length; i++) {			 
			  var article = draftList[i];
		      var supplierNo = article.supplier == undefined ? (article.supplier_no) : (article.supplier);
		      var deliveryDate = article.delivery_date;		      
		      var id = supplierNo + '_' + deliveryDate;		     
		      if( group[id] != undefined){
		    	  group[id].push(article);
		      }else{
		    	  var articleList = [];
		    	  articleList.push(article);
		    	  group[id]=articleList;
		      }
		  }
	  }
	  return group;
}


function executeVendorConValDraftList(drafts, response, area){
	var dList =  [];
	if(response != '' && response != undefined && response.articles != undefined
			&& response.articles != '' && response.articles.length >0){ 
		for (var j = 0; j < drafts.length; j++) {
			for (var i = 0; i < response.articles.length; i++) {
				var result = response.articles[i];	
				if(drafts[j].article == result.article && result.vendor_constraint_flag != null
					&& result.vendor_constraint_flag != '' && result.vendor_constraint_flag == 'Y'){
						dList.push(drafts[j]);
						}	
  					}
			}
	}
return dList;
}
//# sourceURL=articleValidation.js