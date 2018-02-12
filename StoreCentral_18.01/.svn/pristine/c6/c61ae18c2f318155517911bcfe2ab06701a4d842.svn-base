var report_DSC_name = 'Report_DSC_Table';
var report_DSC_title = '';
var responseP;
var deptNamePrint = '';
var totalRecords = '';
var isRequestDone=false;
$(document).ready(function() {
	$("#dialog-modal-alertBox")
    .dialog({
      autoOpen: false,
      modal: true,
      resizable: false,
      minHeight: 120,
      maxHeight: 600,
      width: 350
    });
	$("#dialog-modal-alertBox")
    .parent()
    .addClass("popupWrapper");
			// Code for profile menu
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
				//Code for accordion
			$("#accordion").accordion({
				header:"h3.mainAccordion",
				collapsible: true, 		
				heightStyle: "content" 
			});
			
			$("#backBtn").click(function(e) {
				 window.location.href="../login/homepage.htm";
			}); 
			
			
			$("#closeLink, #generateReport").click(function(){				
				$('#accordion').accordion({active : true });			
			});
			
			
			
			// Code for calendar
			
			$("#dateFrom").datepicker({
				dateFormat: "dd/mm/yy",
				zIndex:50,
				onClose: function( selectedDate ) {
					$( "#dateTo" ).focus();
				}
				
			});
			
			$("#dateTo").datepicker({
				dateFormat: "dd/mm/yy",
				zIndex:50
				
			});
			
			
			
			
			// Code to show and hide article heirarchy
			
			$('#depH').click(function() {		
				if($(this).is(':checked'))
					$("#articleHierarchy").removeClass('hideBlock');
				else
					$("#articleHierarchy").addClass('hideBlock');
			});
			
			
			
			
			/* Code for hierarchy  */
					
			$("input[name='departmentList']").click(function() {				
				$("#catDiv").find(".noSelection").addClass('hideBlock');
				$("#catDiv").find("ul").removeClass('hideBlock');
				$("#catDiv").find(".totalCount").removeClass('hideBlock');

				$("#subCatDiv").find(".noSelection").removeClass('hideBlock');
				$("#subCatDiv").find("ul").addClass('hideBlock');
				$("#subCatDiv").find(".totalCount").addClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');				

				$("#segDiv").find(".noSelection").removeClass('hideBlock');
				$("#segDiv").find("ul").addClass('hideBlock');
				$("#segDiv").find(".totalCount").addClass('hideBlock');		
				//$("#segDiv").find(".heirachyAction").addClass('hideBlock');
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			
			$("input[name='categoryList']").click(function() {	
				$("#subCatDiv").find(".noSelection").addClass('hideBlock');
				$("#subCatDiv").find("ul").removeClass('hideBlock');
				$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
				//$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeOut(300);

				$("#segDiv").find(".noSelection").removeClass('hideBlock');
				$("#segDiv").find("ul").addClass('hideBlock');
				$("#segDiv").find(".totalCount").addClass('hideBlock');	
				//$("#segDiv").find(".heirachyAction").addClass('hideBlock');
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			$("input[name='subCatList']").click(function() {	
				//$("#subCatDiv").find(".heirachyAction").removeClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeIn(400);
								
				$("#segDiv").find(".noSelection").addClass('hideBlock');
				$("#segDiv").find("ul").removeClass('hideBlock');
				$("#segDiv").find(".totalCount").removeClass('hideBlock');	
				//$("#segDiv").find(".heirachyAction").addClass('hideBlock');
				$("#segDiv").find(".heirachyAction").fadeOut(300);
			});
			
			$("input[name='segmentList']").click(function() {	
				//$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
				$("#subCatDiv").find(".heirachyAction").fadeOut(300);
					
				//$("#segDiv").find(".heirachyAction").removeClass('hideBlock');
				$("#segDiv").find(".heirachyAction").fadeIn(400);
			});
			
			
			$("#tabs").tabs();
			
			$(".tooltip").tooltip({ 
				position: { 
					my: "left bottom", 
					at: "left top" 					
				} 
			});
			
			populateDSCDepartment();//populates the value in article hierarchy area
			
			$('#generateDSCReport').unbind('click');
			
			$('#generateDSCReport').click(function(){
				var param = prepareDSCReportParam();

				if(param.valid == 'Y'){
					callDSCReportService(param, false);
				}
			});
			
			bindDirectPrint();
			bindDSCPrint();
			
		});

function prepareDSCReportParam(){
	
	var deptArray = new Array();
	var deptNameArray = new Array();
	var deptNameStr = '';
	$('#articleHierarchy #deptlst').find('input[name="departmentList"]:checked').each(function(){
		deptArray[deptArray.length] = $(this).val();
		deptNameArray[deptNameArray.length] = $(this).attr('deptName');
	});
	
	if(deptNameArray.length == $('#articleHierarchy #deptlst').find('input[name="departmentList"]').length){
		deptNameStr = 'All Departments';
	} else {
		deptNameStr = deptNameArray.join(",");
	}
	
	var dateArray = getDesiredFutureDate(0).split("/");
	
	var param = {
			"iv_session_id":"",
			"iv_sales_org":$('#salesOrg').val(),
			"iv_site_no":$('#posSite').val(),
			"iv_date":dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0],
			//"iv_date":"2016-01-20",
			"iv_flag":"UNACTIONED",
			"iv_user_ids":"ALL",
			"iv_department_ids":deptArray.join(","),
			"iv_article_no":"",
			"iv_article_barcode":"",
			"iv_barcode_flag":"",
			"valid":"Y",
			"deptNameStr":deptNameStr
	};
	
	if(deptArray.length == 0){
		$.fn.showCustomMsg(['Department is mandatory'],error,'Daily Stock Check Report');
		param.valid = 'N';
	}
	
	return param;
}



		
/**
 * Populates values in article hierarchy area
 */
function populateDSCDepartment() {
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : "ALL DEPARTMENTS",
		"iv_session_id" : "100"
	};
	console.log(gethierarchyDetails + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetails,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var content = '<li >	<input class="department" type="checkbox" name="departmentListAll" value="" /><label class="labelText">Select All</label></li>';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li >	<input class="department" type="checkbox" name="departmentList" '
									+ 'value="'
									+ temList[i].node_id
									+ '" id="'
									+ temList[i].node_id
									+ '" deptName="'
									+ temList[i].node_desc
									+ '">'
									+ '<label class="labelText deptLbl">'
									+ temList[i].node_desc + '</label></li>';
						}
						$('#deptlst').html(content);
						bindAllCheckboxEvent($('#deptlst'));
						//$("#deptLstCnt").text(temList.length);
					}
				},
				error : function(response) {
				},
			});

}
function bindAllCheckboxEvent(container){
	container.find('[name="departmentListAll"]').unbind('change');
	container.find('[name="departmentListAll"]').change(function() {
		if ($(this).prop('checked')) {
			container.find('[name="departmentList"]').prop('checked', true);
		} else {
			container.find('[name="departmentList"]').prop('checked', false);
		}
	});

	container.find('[name="departmentList"]').unbind('change');
	container
			.find('[name="departmentList"]')
			.change(
					function() {
						if (container.find('[name="departmentList"]').length == container
								.find('[name="departmentList"]:checked').length) {
							container.find('[name="departmentListAll"]').prop(
									'checked', true);
						} else {
							container.find('[name="departmentListAll"]').prop(
									'checked', false);
						}
					});
	container.find('[name="departmentListAll"]').prop(
			'checked', true).trigger('change');
}
var successRs=true;


function callDSCReportService(param, printFlag){
	//replaced for performance tuning
	//var url = reportDailyStockCheckUrl;
	var url = reportDailyStockCheckNewUrl;
	console.log(url + ' ' + JSON.stringify(param));	
	$.ajax({
	    type: "POST",
	    url: url,
	    data: JSON.stringify(param),
	    beforeSend: function() {
	    	  startLoading();
	      }
	  }).done(function(response) {
		  responseP = response;
		  //responseP = [ {'article_number': '149539','scanned_ean':'4564','article_description': 'Chicken Breast Stir Fry Rw','uom': 'CAR','om':'15','soh': '52','sell_price': '45','location_name': 'STIR FRY','base_count': '12','recount_1': '12015','recount_2': '182','recount_3': '182','recount_4': '182','final_count': '182','total_value': '182','soh': '182','subcat_name': 'sub1','user': 'user1'}];
		  //console.log(JSON.stringify(responseP));	
		  if(responseP != undefined  && responseP.length > 0 && responseP[0].article_no != undefined){
			  deptNamePrint = param.deptNameStr;
			
			 /****************Fix for 7214 defect - Start*************************/ 
			 /* for(var i =0; i<responseP.length; i++){
				  if(responseP[i].soh != undefined && responseP[i].base_uom != undefined)
					  responseP[i].soh = responseP[i].soh+" "+responseP[i].base_uom;
				  }
				  if(responseP[i].om != undefined)
					  responseP[i].om = Math.trunc(responseP[i].om);
				  if(responseP[i].lto_qty != undefined)
					  responseP[i].lto_qty = Math.trunc(responseP[i].lto_qty);*/				  
			  

			  /*********************Fix for 7214 defect End*************************/
			  if(printFlag){
				 // commonDSCPrint();
//				  toControllerDirect();
				  var reportResultArray = [];			
				  reportResultArray = responseP;
				  callDailyStockCheckJasperPrint(reportResultArray,true); 
			  } else {
				  $(".reportContent").removeClass('hideBlock');
					$('#accordion').accordion({active : true});
					var $tblhold = $("#reportDSCContent");
					loadReportContentTbl(responseP, $tblhold);
					totalRecords = responseP.length;
					$("#noRecords").html(totalRecords);//Sets the no of records
					toControllerDSC();
			  }	
			  
			  
			  
		  } else {
			  $(".reportContent").addClass('hideBlock');
			  $.fn.showCustomMsg(['No records found.'],error,'Daily Stock Check Report');
		  }			
	  }).fail(function() {	
		  $.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Daily Stock Check Report');
	  }).always(function() {
		  stopLoading();
	  });
}
		
	/**
	 * Sets the area & table for report generation
	 * @param data
	 * @param $tblhold
	 */
	function loadReportContentTbl(data, $tblhold) {
		$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'
				+ $selectedTab.attr('aria-controls')) : $tblhold;
		var confObj = (new tblReportDSC(data));
		$tblhold.loadtbl(confObj);
		$tblhold.find('thead tr th').not('.noSort').click(function(){
			toControllerDSC();
	});
	}
	
	/**
	 * Configuration for the creation of PLU report's table
	 * @param data
	 * @returns {tblReportPLU}
	 */
	function tblReportDSC(data){
		this.option = 'build';
		this.key = ['article_no','promo_flag','article_desc','om','soh','sit','lto_details','display_type','stock_check_desc'];
		this.table_name = report_DSC_name;
		this.table_title = report_DSC_title;
		this.table_class = ' ContentTable actionRows cursor-def';
		this.header_name = {article_no:'Article',promo_flag:'',article_desc:'Description',om:'OM',soh:'SOH',sit:'SIT',lto_details:'LTO Location(s)',display_type:'Display Location(s)',stock_check_desc:'Reason'},
		this.header_data_type = {article_no:'char',promo_flag:'char',article_desc:'char',om:'number',soh:'number',sit:'number',lto_details:'char',display_type:'char',stock_check_desc:'char'},
		this.header_row_type = {article_no:'main',promo_flag:'main',article_desc:'main',om:'main',soh:'main',sit:'main',lto_details:'main',display_type:'main',stock_check_desc:'main'},
		this.header_class = {article_no:'centerValue',promo_flag:'',article_desc:'',om:'',soh:'',sit:'',lto_details:'',display_type:'',stock_check_desc:''},
		this.header_title = {},
		this.header_width = {article_no:'2%',promo_flag:'1%',article_desc:'9%',om:'1%',soh:'5%',sit:'1%',lto_details:'7%',display_type:'7%',stock_check_desc:'14%'},
		this.content_class = {article_no:'centerValue',promo_flag:'noSort',article_desc:'',om:'',soh:'',sit:'',lto_details:'',display_type:'',stock_check_desc:''},
		this.content_title = {},
		this.content_format = {article_no:'removeNull',promo_flag:'removeNull',article_desc:'removeNull',om:'removeNull',soh:'removeNull',sit:'removeNull',lto_details:'removeNull',display_type:'removeNull',stock_check_desc:'removeNull'},
		this.content_width =  {article_no:'2%',promo_flag:'1%',article_desc:'9%',om:'1%',soh:'5%',sit:'1%',lto_details:'7%',display_type:'7%',stock_check_desc:'14%'},
		this.cont_data_function = {promo_flag:showDSCLegendDetails, soh:showDSCRandom, om:showDSCRandomOm ,sit:showSIT};
		//this.cont_data_funct = {soh:showDSCRandom};
		this.comp_key_parser = {};
		this.content =  data;
		this.pagination = true;
		this.groupby= false;
		this.recordPerPage= 10;
		this.groupbyColumn =[];
		this.filter= false;
		this.curr_page= 1;
		this.sort=true;
		this.content_bind_event = {click: ''};
		this.content_tr_addon = {click: ''};
		this.content_td_addon = {click: ''};
		this.content_label = {};
		this.legend = '<div class="legend"><label> Legend: * Single Price Promo, # Multibuy, @  In-Store Promo </label></div>';
	}
	
	var showDSCLegendDetails = function(obj){
		
		var legend = '';
		
		if(obj.promo_flag == 'Y'){
			legend = '*';
		} else if(obj.offer_flag == 'Y'){
			legend = '#';
		}
		return legend;
	};			// For  Defect_7214
	var  showDSCRandom=function(obj){
			
	 var isRandomWghtArticle='';
	var quantity=obj.soh;
	 if(obj.base_uom=="KG" && (obj.soh != ' ' || obj.soh != 0) && quantity != null && quantity!=undefined && quantity.toString().indexOf('.')!=-1){
		 obj.soh= parseFloat(quantity).toFixed(3) ;
		// obj.soh = obj.soh.toFixed(3);
		 
	 }
	 if(obj.base_uom !="KG"  && (obj.soh != ' ' || obj.soh != 0) && quantity != null && quantity!=undefined && quantity.toString().indexOf('.')!=-1){
		 obj.soh= parseFloat(quantity).toFixed(3) ;
		// obj.soh = obj.soh.toFixed(3);
		 
	 }
	  if(obj.random_weight_flg == 'Y')
		{
		isRandomWghtArticle = true;
		}
	else
		{
		isRandomWghtArticle = false;
		}
		  if(isRandomWghtArticle){
			  
			  if (obj.soh != ' ' && obj.soh != 0 && obj.soh != null){		// 	obj.soh != null added condition - In tbl getting null values	
				  
			return  ( obj.pi_soh != null && obj.pi_soh != undefined ?obj.pi_soh : "0" )+" "+obj.pi_uom+" & "+(obj.base_uom == "KG" ? parseFloat(obj.soh).toFixed(3) :  obj.soh )+" "+obj.base_uom;
			  }else {return 0;}
		  }
		 
		  else{
		  if(obj.soh != undefined && obj.base_uom != undefined){
			  if (obj.soh != ' ' || obj.soh != 0){
			 return  obj.soh+" "+obj.base_uom; }
			  else{return 0;}}
		  else{return 0;}
				 
		  }};
		  
	var showSIT=function(obj){
		var sitQuantity=obj.sit;
		if(sitQuantity!= ' ' && sitQuantity!= 0 && sitQuantity != null && sitQuantity!=undefined && sitQuantity.toString().indexOf('.')!=-1){
			 obj.sit=obj.sit.toFixed(3);
			 
		 }
		 return (obj.sit==null || obj.sit==undefined)?"":obj.sit;
	};
	 var showDSCRandomOm=function (obj){
		  
		  if(obj.om != undefined){
			 return Math.trunc(obj.om);
		  }
		  else {
			  return 0;
		  }
	 
	 };
	 var showDSCRandomLTOQty = function (obj){
		  if(obj.lto_qty != undefined)
			  return Math.trunc(obj.lto_qty);		  
	};
	
	function toControllerDirect(){
		var param = prepareDSCReportParam();

		if(param.valid == 'Y'){
			callDSCReportService(param, true);
		}
		
	}
	
	function toControllerDSC(){
		try{
		reportResultArray = $('#'+report_DSC_name+'_table').data('confObj').content;
		callDailyStockCheckJasperPrint(reportResultArray); 
		}catch(err){
			
		}
	}
	/**
	 * Registers 'Print' Click event
	 * @param response
	 */
	function bindDirectPrint(){		
		successRs=false;
		$("#printDSC").unbind('click');
		$("#printDSC").on('click',function() {
			/*var recCall = function() {
				setTimeout(function() {
					if (isRequestDone) {
						isRequestDone=false;
						if(successRs){
							$('#dailyStockCheckReportForm').attr("action",
									"downloadDailyStockCheckReportPdf.pdf");
							$('#dailyStockCheckReportForm').attr('target',
									'_blank');
							$('#dailyStockCheckReportForm').attr('method',
									'get');
							$('#dailyStockCheckReportForm').submit();
						}
					} else {
						recCall();
					}
				}, 100);
			};
			isRequestDone=false;
			recCall();*/
			/*var param = prepareDSCReportParam();

			if(param.valid == 'Y'){
				callDSCReportService(param, true);
			}
			
			var reportResultArray = [];			
			reportResultArray = responseP;
			callDailyStockCheckJasperPrint(reportResultArray);*/
			toControllerDirect();
		});
	}
	function bindDSCPrint(){
		$("#printReportDSC").unbind('click');
		$("#printReportDSC").on('click',function() {
			/*var reportResultArray = [];			
			reportResultArray = $('#'+report_DSC_name+'_table').data('confObj').content;
			callDailyStockCheckJasperPrint(reportResultArray); */
			$('#dailyStockCheckReportForm').attr("action", "downloadDailyStockCheckReportPdf.pdf");
			$('#dailyStockCheckReportForm').attr('target','_blank');
			$('#dailyStockCheckReportForm').attr('method','get');
			$('#dailyStockCheckReportForm').submit();
		});
	}
	
	function commonDSCPrint(){
		/*frameReportDSC(responseP);
		//document
		var a = window.open();
		$("#printDataForDSCReport").show();
		a.document
				.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
		a.document
				.write(document
						.getElementById('printDataForDSCReport').innerHTML);

		$("#printDataForDSCReport").hide();
		a.focus();
		// call print
		$(a).ready(function(){
			setTimeout(function(){$(document).unbind('click');
			doc=a;
			$(document).click(function(){
				doc.close();
				doc='';
			});a.print();},1000);
			 return true;
		    });*/
	}
	
	
	
	/**
	 * Frames the content for print screen
	 * @param data
	 */
	function frameReportDSC(data){
		//console.log(data);
		var content = '';
		var headerContent = '';
		var firstPageCreated = false;
		headerContent = '<label><strong>Daily Stock Check Report</strong></label><div style="float:right"><label class="subtitle">'+$("#posSite").val()+'</label><label class="subtitle">|<label><label class="subtitle">'+$("#posSiteName").val()+'</label></div></br></br><label class="subtitle-bold">'
		+'Report for:</label></br><label class="subtitle"> Department: '+deptNamePrint
		+'</label></br></br><label class="subtitle">Total <strong id="noRecords">'+totalRecords+'</strong> records </label>';
		
		var printHeadInnerTable = '<div class="page"><table style="font-size: 15px;height:90%;min-height:500px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable"><thead><tr><th align="left" width="7px">Article</th><th align="left" width="2px">&nbsp;</th><th align="left" width="15px">Description</th><th align="left" width="3px">OM</th><th align="left" width="3px">SOH</th><th align="left" width="3px">SIT</th><th align="left" width="10px">LTO Location</th><th align="left" width="10px">Display Location</th><th align="left" width="10px">Reason</th></tr></thead><tbody style="min-height:650px">';
		var printHeadInnerTable1 = '<div class="page"><table style="font-size: 15px;height:45%;min-height:180px;max-height:180px;table-layout: fixed; width: 1100px;" class="printDeviceLogTable"><thead><tr><th align="left" width="7px">Article</th><th align="left" width="2px">&nbsp;</th><th align="left" width="15px">Description</th><th align="left" width="3px">OM</th><th align="left" width="3px">SOH</th><th align="left" width="3px">SIT</th><th align="left" width="10px">LTO Location</th><th align="left" width="10px">Display Location</th><th align="left" width="10px">Reason</th></tr></thead><tbody style="min-height:650px">';
		if(firstPageCreated){
			content += printHeadInnerTable;
		}else{
			content += printHeadInnerTable1;
		}
		
		var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;"   class="width98">'
			+ '<div class="legend"><label> <strong>Legend:</strong> * Single Price Promo, # Multibuy, @ In-store Promo</label></div>'
			+ ' <div class="width35 margin5 left inline-block" style="float:left;">'
			+ ' <label class="bold">Printed on: </label>'
			+ '<label class="currentDate"></label>'
			+ '<label class="separator"> </label>'
			+ '<label class="currentTime"></label>'
			+ '</div>'
			+ '<div class="inline-block margin5 width45"><div class="hideBlock endOfReport"><strong>End of Report</strong></div></div>'
			+ '<div class="width35  inline-block right">'
			+ '<div class=" lineheight15 margin5 text-align-right ">Page '

			+ '<label class="currentPagePrint">1</label> of '

			+ '<label class="totalPage">1</label>'

			+ ' </div>' + '</div>' + '</div>';
		var count = 0;
		for ( var i = 0; i < data.length; i++) {
			content += '<tr class="border_bottom">'
					+ '</td><td  align="left">' + data[i].article_no
					+ '</td><td  align="left">' + showDSCLegendDetails(data[i])
					+ '</td><td  align="left">' + data[i].article_desc
					+ '</td><td  align="left">' + data[i].om
					+ '</td><td  align="left">' + data[i].soh
					+ '</td><td  align="left">' + data[i].sit
					+ '</td><td  align="left">' + data[i].lto_details
					+ '</td><td  align="left">' + data[i].display_type
					+ '</td><td  align="left">' + data[i].stock_check_desc
					+ '</td></tr>';
			//Split Pages - Starts		
			var firstPageRecords = 5;
			var otherPageRecords = 10;
			if(data[i].article_desc.length > 27){
				count = count + 0.5*(data[i].article_desc.length/27);
			}
			if (i >= (data.length - 1)){
				content += '</tbody></table>';
				content +='<table><tbody><tr class="endOfReportMain"><td>End of Report</td></tr></tbody></table>' + printFoot + '</div>';
			}
			if(i>=firstPageRecords && !firstPageCreated){
				count =0;
				firstPageCreated = true;
				if(firstPageCreated){
					content += '</tbody></table>' + printFoot+'</div>'
					+ printHeadInnerTable;
				}else{
					content += '</tbody></table>' + printFoot+'</div>'
					+ printHeadInnerTable1;
				}
				
			}else {
				if (i >= (data.length - 1)){
						if(count != otherPageRecords && i> firstPageRecords){
						content += '<table><tbody>';
						for(var n=0;n<((otherPageRecords)-count);n++){
							content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
						}
						content += '</tbody></table>';
					}else{
						content += '<table><tbody>';
						for(var n=0;n < ((firstPageRecords)-count);n++){
							content += '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
						}
						content += '</tbody></table>';
					}
					//content += '</tbody></table>' + printFoot + '</div>';					
				}
				else if(count >= otherPageRecords){
					count = 0;	
					if(firstPageCreated){
						content += '</tbody></table>' + printFoot+'</div>'
						+ printHeadInnerTable;
					}else{
						content += '</tbody></table>' + printFoot+'</div>'
						+ printHeadInnerTable1;
					}
				}
				
			}
			count++;
			//Split Pages - Ends

		}
				
		
			$('#printbodyForDSCReport')
			.html('')
			.append(headerContent+content)
			.append(
					'<link rel="stylesheet" href="../../styles/reportPrintStyle.css" />');
			$('.currentDate').text(dateformat());
			$('.currentTime').text(timeformat());
			var len = 0;
			$('.currentPagePrint').each(function() {
				len++;
				$(this).text(len);
			});
			$('.totalPage').text($('.currentPagePrint').length);		
	}
	
	function callDailyStockCheckJasperPrint(reportResultArray,flag){
		try{
		var obj={			
				reportResult	: reportResultArray,
				dept			: deptNamePrint,
				StoreNo 		: $('#posSite').val(),
				StoreName 		: $('#posSiteName').val(),
				count			: reportResultArray.length
				};
		//console.log(JSON.stringify(obj));
		$.ajax({
		url: "printReportDailyStockCheckPDF.htm",
		type: "POST",
		dataType: "json",
		contentType:"application/json",
		data:JSON.stringify(obj),
	    cache: false,    //This will force requested pages not to be cached by the browser  
	    processData:false, //To avoid making query String instead of JSON
	    beforeSend: function() {
	        startLoading();
	    },
		success: function(response, textStatus ){
		//console.log(response.data);
		if(response.data == 'success')
			{
			/*$('#dailyStockCheckReportForm').attr("action", "downloadDailyStockCheckReportPdf.pdf");
			$('#dailyStockCheckReportForm').attr('target','_blank');
			$('#dailyStockCheckReportForm').attr('method','get');
			$('#dailyStockCheckReportForm').submit();*/
			if(flag!=undefined){
				printPopup('Report generated successfully.');
			}
			successRs=true;
			}else successRs=false;
		//console.log("success");
		},
		error: function(xhr, textStatus, errorThrown){
		console.log('request failed'+errorThrown);
		successRs=false;
		},complete:function(){
			  stopLoading();
			  isRequestDone=true;
		}
		});
	}catch(err){
		isRequestDone=true;
		successRs=false;
	}
	}
	
	function printPopup(msg){
		$("#dialog-modal-alertBox").find('#alertBox').html(msg);
		$("#dialog-modal-alertBox").dialog('open');
	}
	function printConfirmed(){
		$('#dailyStockCheckReportForm').attr("action",
		"downloadDailyStockCheckReportPdf.pdf");
		$('#dailyStockCheckReportForm').attr('target',
		'_blank');
		$('#dailyStockCheckReportForm').attr('method',
		'get');
		$('#dailyStockCheckReportForm').submit();
		$("#dialog-modal-alertBox").dialog('close');
		setTimeout(function(){toControllerDSC();},300);
		$("#dialog-modal-alertBox").parent().find('.closePopUp').unbind('click');
		$("#dialog-modal-alertBox").parent().find('.closePopUp').click(function(){
			toControllerDSC();
		});
		
	}