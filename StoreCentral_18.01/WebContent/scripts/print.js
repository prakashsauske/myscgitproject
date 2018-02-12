var doc='';
//Voids Refunds
function posDeclarationPrint(){
	//$('.pageBreak :first').removeClass('pageBreak');
	
	$('#printbody').children(':first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	
	$('.weekPrint').text($('#weekHide').text());
//$('.toDatePrint').text($('#dateTo').val());
$('.posType').text($("#posOperatorType").text());
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
var lastPageTrLen=15-($('.actionRowPrint:last tr').length-1);
console.log("lastPageTrLen"+lastPageTrLen);
if(lastPageTrLen == -1 )
{
//lastPageTrLen=17;
$('.endOfReport:last').removeClass('hideBlock');
}
	//$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
			{
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="8">End of Report</td></tr>');	
			}
	}
	}
	else if(lastPageTrLen==0){
		//$('.staredMark:last').removeClass('hideBlock');
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
//	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
	
	
}
function storeWeeklyMarkdown(){
	$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
$('.fromDatePrint').text($('#dateFromHide').text());
	
	$('.weekPrint').text($('#weekHide').text());
	$('.posType').text($("input[name='pos']:checked").val());
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	$('.appendedMob').remove();
	var lastPageTrLen=18-($('.actionRowPrint:last tr').length-1);
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="14">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		//$('.staredMark:last').removeClass('hideBlock');
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
//	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
}
//Voids Refunds
function posConsolidationPrint(){
	//$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	
$('.weekPrint').text($('#weekHide').text());
//$('.toDatePrint').text($('#dateTo').val());
$('.posType').text($("#posOperatorType").text());
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	$('.appendedMob').remove();
	

	
	var lastPageTrLen=15-($('.actionRowPrintHead:last tr').length-1);
	
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrintHead').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$('.ContentTable.actionRowPrintHead').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="10">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		//$('.staredMark:last').removeClass('hideBlock');
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
//	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	lastPageTrLen=0;
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
}

//STAR Report
function starReportPrint()
{

	$('.pageBreak :first').removeClass('pageBreak');
		$('.siteNoNamePrint').text($('.siteNoName').text());
		var len=0;
		$('.currentPagePrint').each(function(){
			len++;
			$(this).text(len);
		});
		
		$('.totalPage').text($('.currentPagePrint').length);
		$('.fromDatePrint').text($('#dateFromHide').text());
		$('.toDatePrint').text($('#dateToHide').text());
		var date=new Date();
		$('.currentDate').text(dateformat());
		$('.currentTime').text(timeformat());
	var lastPageTrLenStaff=16-($('.StaffactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint.appendedMob').remove();
		if(lastPageTrLenStaff!=0){
		for(var i=0;i<lastPageTrLenStaff;i++){
			if(i!=0){
			$('.StaffactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
			else {
			$('.StaffactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr style="border-bottom:solid 1px!important"></tr><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr></tbody></table>');	
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenStaff==0){
			$('.endOfReport:last').removeClass('hideBlock');
		}
var lastPageTrLenTender=16-($('.TenderactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint.appendedMob').remove();
		if(lastPageTrLenTender!=0){
		for(var i=0;i<lastPageTrLenTender;i++){
			if(i!=0)
			$('.TenderactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
			else {
			$('.TenderactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr></tbody></table>');	
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenTender==0){
			$('.tenderTime.endOfReport:last').removeClass('hideBlock');
		}
var lastPageTrLenEDR=16-($('.EDRactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint.appendedMob').remove();
		if(lastPageTrLenEDR!=0){
		for(var i=0;i<lastPageTrLenEDR;i++){
			if(i!=0)
			$('.EDRactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
			else {
			$('.EDRactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr></tbody></table>');	
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenEDR==0){
			$('.edr.endOfReport:last').removeClass('hideBlock');
		}
var lastPageTrLenCash=16-($('.CashactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint.appendedMob').remove();
		if(lastPageTrLenCash!=0){
		for(var i=0;i<lastPageTrLenCash;i++){
			if(i!=0)
			$('.CashactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
			else {
			$('.CashactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr><tbody></table>');	
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenCash==0){
			$('.cash.endOfReport:last').removeClass('hideBlock');
		}
	var lastPageTrLenPrice=16-($('.PriceactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint .appendedMob').remove();
		if(lastPageTrLenPrice!=0){
		for(var i=0;i<lastPageTrLenPrice;i++){
			if(i!=0){
			$('.PriceactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="emptyCells height30 appendedMob" ><td colspan="11"></td></tr></tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
			else {
			$('.PriceactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr></tbody></table>');	
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenPrice==0){
			$('.price.endOfReport:last').removeClass('hideBlock');
		}
		var lastPageTrLenSaved=16-($('.SavedactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint .appendedMob').remove();
		if(lastPageTrLenSaved!=0){
		for(var i=0;i<lastPageTrLenSaved;i++){
			if(i!=0){
			$('.SavedactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="emptyCells height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
			else {
			$('.SavedactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr></tbody></table>');	
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenSaved==0){
			$('.saved.endOfReport:last').removeClass('hideBlock');
		}
		var lastPageTrLenTrans=16-($('.TransactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint .appendedMob').remove();
		if(lastPageTrLenTrans!=0){
		for(var i=0;i<lastPageTrLenTrans;i++){
			if(i!=0){
			$('.TransactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="emptyCells height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
			else {
			$('.TransactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr></tbody></table>');	
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenTrans==0){
			$('.trans.endOfReport:last').removeClass('hideBlock');
		}
		var lastPageTrLenArt=16-($('.ArtactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint .appendedMob').remove();
		if(lastPageTrLenArt!=0){
		for(var i=0;i<lastPageTrLenArt;i++){
			if(i!=0){
			$('.ArtactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="emptyCells height30 appendedMob"><td colspan="11"></td></tr><tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
			else {
			$('.ArtactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr><tbody></table>');	
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenArt==0){
			$('.art.endOfReport:last').removeClass('hideBlock');
		}
		var lastPageTrLenNoSales=16-($('.NoSalesactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint .appendedMob').remove();
		if(lastPageTrLenNoSales!=0){
		for(var i=0;i<lastPageTrLenNoSales;i++){
			if(i!=0){
			$('.NoSalesactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="emptyCells height30 appendedMob"><td colspan="11"></td></tr><tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
			else {
			$('.NoSalesactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr><tbody></table>');	
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenNoSales==0){
			$('.noSales.endOfReport:last').removeClass('hideBlock');
		}
		
		var lastPageTrLenRefunds=16-($('.RefundsactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint .appendedMob').remove();
		if(lastPageTrLenRefunds!=0){
		for(var i=0;i<lastPageTrLenRefunds;i++){
			if(i!=0){
			$('.RefundsactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class=" emptyCells height30 appendedMob"><td colspan="11"></td></tr><tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
			else {
			$('.RefundsactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr><tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenRefunds==0){
			$('.refunds.endOfReport:last').removeClass('hideBlock');
		}
		var lastPageTrLenSummary=13-($('.SummaryactionRowPrint:last tr').length-1);	
		
		$('.StoreactionRowPrint .appendedMob').remove();
		if(lastPageTrLenSummary!=0){
		for(var i=0;i<lastPageTrLenSummary;i++){
			if(i!=0){
			$('.SummaryactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="emptyCells height30 appendedMob"><td colspan="11"></td></tr><tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
			else {
			$('.SummaryactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr><tbody></table>');
			//$('#sortTable').removeClass('printTable');
			}
		}
		}
		else if(lastPageTrLenSummary==0){
			$('.summary.endOfReport:last').removeClass('hideBlock');
		}
		var a = window.open ();
		$("#printData").show();
		a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
		  a.document.write(document.getElementById('printData').innerHTML);
		
		$("#printData").hide();
		//$(".submitBtnStyle").show();
//		a.document.close();
		//a.document.title='Load List Report';
		a.focus();
		//call print
		$(a).ready(function(){
			 //a.close();   
			setTimeout(function(){$(document).unbind('click');
			doc=a;
			$(document).click(function(){
				doc.close();
				doc='';
			});a.print();},1000);
			 return true;
		    });

}

//Voids Refunds
function voidsRefundsPrint(){
	
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('#printbody').children(':first').removeClass('pageBreak');
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	$('.toDatePrint').text($('#dateToHide').text());
	$('.type,.reportTitleType').text($("input[name='Performance']:checked").val());
	//var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	var lastPageTrLenvoids=14-($('.voidActionRowPrint :last tr').length-1);	
	
	$('.voidActionRowPrint  .appendedMob').remove();
	if(lastPageTrLenvoids!=0){
	for(var i=0;i<lastPageTrLenvoids;i++){
		if(i!=0)
		$('.voidActionRowPrint ').last().append('<tr class="height30 appendedMob"><td colspan="13"></td></tr>');
		else 
		$('.voidActionRowPrint ').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLenvoids==0){
		$('.endOfReportVoid :last').removeClass('hideBlock');
	}
	
	var lastPageTrLen=11-($('.refundActionRowPrint:last tr').length-1);	
	
	$('.refundActionRowPrint .appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.refundActionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="13"></td></tr>');
		else 
		$('.refundActionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReportRefund :last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
//	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
}

//Sales Summary Print
function salesSummayPrint(){
$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	$('.toDatePrint').text($('#dateToHide').text());

	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	if($("input[name='selectType']:checked").val()=='POS'|| $("input[name='selectType']:checked").val()=='SCO')
		{
var lastPageTrLenpos=16-($('.actionRowPrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	if(lastPageTrLenpos!=0){
	for(var i=0;i<lastPageTrLenpos;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="11"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLenpos==0){
		$('.endOfReport:last').removeClass('hideBlock');
	}
		}
	if($("input[name='selectType']:checked").val()=='Both')
		{
		var lastPageTrLenpos=16-($('.actionRowPrint:last tr').length-1);	
		
		$('.appendedMob').remove();
		if(lastPageTrLenpos!=0){
		for(var i=0;i<lastPageTrLenpos;i++){
			if(i!=0)
			$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="11"></td></tr>');
			else 
			$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr>');	
		
		}
		}
		else if(lastPageTrLenpos==0){
			$('.endOfReport:last').removeClass('hideBlock');
		}
			}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
//	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
}

//Store Perf Print
function storePerfPrint(){
//$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	var lastPageTrLen=0;
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text()+' '+$('#timeFromHide').text());
	$('.toDatePrint').text($('#dateToHide').text()+' '+$('#timeToHide').text());

	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
 lastPageTrLen=14-($('.actionRowPrint:last tr').length);
 console.log("lastPageTrLen"+lastPageTrLen);

	
	//$('.appendedMob').remove();
 if(lastPageTrLen < 0)
	 {
	 lastPageTrLen=17;
	 $('.appendedMob').remove();
	 }

	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="9"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="noteFont"  colspan="9"><label class="">* INCLUDES VOIDED TRANSACTIONS.</label></td></tr>').
		append('<tr class="appendedMob"><td class="noteFont"  colspan="9"><label class="">** INCLUDES VOIDED, SUBTRACTED AND CANCELLED ARTICLES.</label></td></tr>').
		append('<tr class="appendedMob"><td class="noteFont"  colspan="9"><label class="">*** Average is reflective of the activity within the specific time period.</label></td></tr>').
		append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$('.staredMark:last').removeClass('hideBlock');
		$('.endOfReport:last').removeClass('hideBlock'); 
	}

	
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
//	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
}

//Umknown & Unranged Articles Print
function UnkUnraggedPrint(){
	$('#printbody').children(':first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	$('.toDatePrint').text($('#dateToHide').text());
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());	
	$('.appendedMob').remove();
	$('.actionRowPrint').each(function(){
	var lastPageTrLen=16-($(this).children().find('tr').length-1);	
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$(this).last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$(this).last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="13">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$(this).children().find('.endOfReport').removeClass('hideBlock');
	}
	});
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
}

//Investigation Transaction Print
function investTransacPrint(){
	//$('.pageBreak:first').removeClass('pageBreak');
var rprtVal=$('#reportType').val($('#investypeDropDown').text());
var reportTypeInves = '';
reportTypeInves = $('#reportType option[value="'+$('#investypeDropDown').text().trim()+'"]').text();

$('.reportName').text(reportTypeInves+" Report");
//$('.pageBreak :first').removeClass('pageBreak');
$('#printbody').children(':first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
$('.fromDatePrint').text($('#dateFromHide').text());
$('.toDatePrint').text($('#dateToHide').text());
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
var lastPageTrLen=16-($('.actionRowPrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="8">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
}

//SoldOverRestricted Qty
function soldOverRestrictedPrint(){
	//$('.pageBreak:first').removeClass('pageBreak');
var rprtVal=$('#reportType').val($('#investypeDropDown').text());
var reportTypeInves = '';
reportTypeInves = $('#reportType option[value="'+$('#investypeDropDown').text().trim()+'"]').text();

$('.reportName').text(reportTypeInves+" Report");
//$('.pageBreak :first').removeClass('pageBreak');
$('#printbody').children(':first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	$('.toDatePrint').text($('#dateToHide').text());
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
var lastPageTrLen=16-($('.actionRowPrint:last tr').length);	
	
	$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="11">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
}
//Investigation Transaction Print
function priceMarkdownPrint(){
var rprtVal=$('#reportType').val($('#investypeDropDown').text());
if($('#investypeDropDown').text()!=undefined && $('#investypeDropDown').text()!=null)
	
var reportTypeInves = '';
reportTypeInves = $('#reportType option[value="'+$('#investypeDropDown').text().trim()+'"]').text();

$('.reportName').text(reportTypeInves+" Report");
$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	$('.toDatePrint').text($('#dateToHide').text());
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
var lastPageTrLen=13-($('.actionRowPrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="14">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
//	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
}


function markdownDetailsPrint(){
	var rprtVal=$('#reportType').val();
	//$('.reportName').text($('#reportType [value="'+rprtVal+'"]').text()+" Report");
	$('.pageBreak :first').removeClass('pageBreak');
		$('.siteNoNamePrint').text($('.siteNoName').text());
		var len=0;
		$('.currentPagePrint').each(function(){
			len++;
			$(this).text(len);
		});
		$('.totalPage').text($('.currentPagePrint').length);
		$('.fromDatePrint').text($('#dateFromHide').text());
		$('.toDatePrint').text($('#dateToHide').text());
		
		$('.dept').text($('.depPrint').text());
		$('.cat').text($(".catPrint").text());
		$('.subCate').text($('.scPrint').text());
		$('.seg').text($('.segPrint').text());

		if($('.seg').text().trim()!="")
		$('.receiptHide').removeClass('hideBlock');
		if($('.cat').text().trim()!="")
			$('.cateHide').removeClass('hideBlock');
		if($('.subCate').text().trim()!="")
			$('.subcatHide').removeClass('hideBlock');

		

		/*if($('#promo').is(':checked'))
				{
			$('.promotionCheck').text('Y');
				}
		else
			{
			$('.promotionCheck').text('N');
			}*/
		if($('.seg').text().trim()=="")
			{
			$('.receiptHide').removeClass('hideBlock');
			$('.seg').text('All');
			}
			if($('.cat').text().trim()=="" || $('.cat').text().trim()== 0)
				{
				$('.cateHide').removeClass('hideBlock');
				$('.cat').text('All');
				}
				
			if($('.subCate').text().trim()=="")
				{
				$('.subcatHide').removeClass('hideBlock');
				$('.subCate').text('All');
				}
			
			if($('#artNoHide').val()=='')
				{
				$('.promotionCheck').text('All');
				
				}
			else if($('#artNoHide').val()!='')
				
				{
				$('.promotionCheck').text($('#artNoHide').val());
				
				}
			

			if($('#vendorNoHide').val()=='')
				{
				$('.supplierCheck').text('All');
				}
			else
				{
				$('.supplierCheck').text($('#vendorNoHide').val());
				}
		var date=new Date();
		$('.currentDate').text(dateformat());
		$('.currentTime').text(timeformat());
	var lastPageTrLen=14-($('.actionRowPrint:last tr').length-1);	
		
		$('.appendedMob').remove();
		if(lastPageTrLen!=0){
		for(var i=0;i<lastPageTrLen;i++){
			if(i!=0)
			$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
			else 
			$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="14">End of Report</td></tr>');	
		
		}
		}
		else if(lastPageTrLen==0){
			$('.endOfReport:last').removeClass('hideBlock');
		}
		var a = window.open ();
		$("#printData").show();
		a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
		  a.document.write(document.getElementById('printData').innerHTML);
		
		$("#printData").hide();
		//$(".submitBtnStyle").show();
//		a.document.close();
		//a.document.title='Load List Report';
		a.focus();
		//call print
		$(a).ready(function(){
			 //a.close();   
			setTimeout(function(){$(document).unbind('click');
			doc=a;
			$(document).click(function(){
				doc.close();
				doc='';
			});a.print();},1000);
			 return true;
		    });
	}
//Department Sales Tax
function deptSalesTaxPrint() {
	$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	$('.toDatePrint').text($('#dateToHide').text());
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
var lastPageTrLen=15-($('.actionRowPrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="8">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
//	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
	}


function salesByArticlePrint() {
	$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	$('.toDatePrint').text($('#dateToHide').text());
$('.dept').text($('.depPrint').text());
$('.cat').text($(".catPrint").text());
$('.subCate').text($('.scPrint').text());
$('.seg').text($('.segPrint').text());

if($('.seg').text().trim()!="")
$('.receiptHide').removeClass('hideBlock');
if($('.cat').text().trim()!="")
	$('.cateHide').removeClass('hideBlock');
if($('.subCate').text().trim()!="")
	$('.subcatHide').removeClass('hideBlock');

$('.promotionCheck').text($('#promotionButtonCheck').text());

/*if($('#promo').is(':checked'))
		{
	$('.promotionCheck').text('Y');
		}
else
	{
	$('.promotionCheck').text('N');
	}*/
if($('.seg').text().trim()=="")
	{
	$('.receiptHide').removeClass('hideBlock');
	$('.seg').text('All');
	}
	if($('.cat').text().trim()=="" || $('.cat').text().trim()== 0)
		{
		$('.cateHide').removeClass('hideBlock');
		$('.cat').text('All');
		}
		
	if($('.subCate').text().trim()=="")
		{
		$('.subcatHide').removeClass('hideBlock');
		$('.subCate').text('All');
		}
	var date=new Date();
	
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
var lastPageTrLen=15-($('.actionRowPrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="noteFont"  colspan="9"><label class="">* indicates article is on Promotion</label></td></tr>')
		.append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="13">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$('.staredMark:last').removeClass('hideBlock');
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
//	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
	}
//Article void print
function avrPrint() {
	$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	
	$('.fromDatePrint').text($('#dateFromHide').text());
	$('.toDatePrint').text($('#dateToHide').text());
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	
var lastPageTrLenre=25-($('.voidactionRowPrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	if(lastPageTrLenre!=0){
	for(var i=0;i<lastPageTrLenre;i++){
		if(i!=0)
	
			
		$('.voidContent.voidactionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		
		else
		
			
		$('.voidContent.voidactionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="13">End of Report</td></tr>');	
	
		
	}
	}
	else if(lastPageTrLenre==0){
		$('.endOfReportVoid:last').removeClass('hideBlock');
	}
var lastPageTrLen=25-($('.actionRowPrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="10">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReportRefund:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
	//a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			doc.close();
			doc='';
		});a.print();},1000);
		 return true;
	    });
	}

function manualOrderBookPrint(a) {
	//eve.preventDefault();
	$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.dept').text($('.depPrint').text());
	$('.cat').text($('.catPrint').text());
	$('.subCate').text($('.scPrint').text());
	$('.seg').text($('.segPrint').text());
	
	if($('.segPrint').text().trim()!="")
	$('.seg-lab').removeClass('hideBlock');
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	var lastPageTrLen=7-($('.reportName:last').parent().next().next().find('tr').length-2)/3;
	
	
	$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.print.printContent').last().append('<tr class="height90 appendedMob"><td colspan="41"></td></tr>');
		else
			$('.ContentTable.print.printContent').last().append('<tr class="height90 appendedMob"><td class="mobReportEnd" colspan="41">End of Report</td></tr>');	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	
	//$('.wait').remove();
	a.document.body.innerHTML = '';
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();

	a.document.close();

	a.focus();
	//call print
	//a.print();
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){$(document).unbind('click');
		doc=a;
		$(document).click(function(){
			if(doc!=undefined)doc.close();
			doc='';
		});a.print();},200);
		 return true;
	    });
	//a.close();
	//return false;
	}
function zeromplPrint() {
	$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.dept').text($('.depPrint').text());
	$('.cat').text($('.catPrint').text());
	$('.subCate').text($('.scPrint').text());
	$('.seg').text($('.segPrint').text());
	
	if($('.segPrint').text().trim()!="")
	$('.seg-lab').removeClass('hideBlock');
	if($('.cat').text().trim()!="")
		$('.cateHide').removeClass('hideBlock');
	if($('.subCate').text().trim()!="")
		$('.subcatHide').removeClass('hideBlock');
	
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
var lastPageTrLen=18-($('.actionRowPrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
		else 
		$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="6">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	//$(".submitBtnStyle").show();
	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	a.print();
	//a.close();
	return false;
	}
function warehouseVariancePrint() {
	$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.dept').text($('.depPrint').text());
	$('.cat').text($('.catPrint').text());
	$('.subCate').text($('.scPrint').text());
	$('.seg').text($('.segPrint').text());
	
	if($('.segPrint').text().trim()!="")
	$('.seg-lab').removeClass('hideBlock');
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	var lastPageTrLen=18-($('.actionRowPrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="9"></td></tr>');
		else 
			$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd wvrReportEnd" colspan="9">End of Report</td></tr>');	
	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReport:last').removeClass('hideBlock');
	}
	var a = window.open ();
	$("#printData").show();
	  a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();

	a.document.close();

	a.focus();
	//call print
	a.print();
	//a.close();
	return false;
	}
function produceDetailsPrint() {
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	var a = window.open ();
	$("#printData").show();
	$("#printTable").css('text-align','right');

	$(".printTableValue").css('text-align','left');
	$(".printTableValue").css('padding-left','15px');
	$(".submitBtnStyle").hide();
	$('.totalpagee,.totalpage').text($('.totalpagee').text());
	var currentdate = new Date();
	var datetime =  currentdate.getDate() + "/"+(currentdate.getMonth())+1 
	+ "/" + currentdate.getFullYear() + "        " 
	+ currentdate.getHours() + ":" 
	+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	$('#datentime').html(datetime);
	//write gridview data into newly open window
	var i=0;
	if($('.prod-end').length==0)
		$('.printtableprod').last().append('<tr class="height40 prod-end prodrow"><td colspan="14"><p class="text-align-center  bold"><b>End of Report</b></p></td></tr>');
		var lastPageRows=14-$('.printtableprod').last().find('.prodrow').length;
		for(i=0;i<lastPageRows-4;i++)
				$('.printtableprod').last().append('<tr class="height40 prodrow"><td></td></tr>');
		var fileref=document.createElement("link");
	  fileref.setAttribute("rel", "stylesheet");
	  fileref.setAttribute("type", "text/css");
	  fileref.setAttribute("href", "../../styles/printstyle.css");
	  a.document.getElementsByTagName("head")[0].appendChild(fileref);
	  a.document.write(document.getElementById('printData').innerHTML);
	
	$("#printData").hide();
	$(".submitBtnStyle").show();
	a.document.close();
	//a.document.title='Load List Report';
	a.focus();
	//call print
	a.print();
	//a.close();
	return false;
	}

function sohPrint() {
	var i=0;
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	
	var trading=$("#tradingDeptType option[value='"+$('#dropretainTradDept').val()+"']").text();
	var transaction=$("#transactionType option[value='"+$('#dropretainTransType').val()+"']").text();
	var reason=$("#reasonCode option[value='"+$('#dropretainReasonCode').val()+"']").text();
	if($('.soh-end').length==0)

	var lastPageRows=16-$('.printtablesoh').last().find('.sohrow').length;
	
	if(lastPageRows!=0){
	for(i=0;i<lastPageRows;i++){
		if(i!=0)
	$('.printtablesoh').last().append('<tr class="height40 sohrow"><td></td></tr>');
		else
		$('.printtablesoh').last().append('<tr class="height40 sohrow soh-end"><td colspan="6">	<p class=" font11">NB: The prices shown in this reports are GST exclusive</p><p class="text-align-center font11  bold width100">End of Report</p></td></tr>	');
	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReport:last').removeClass('hideBlock');
	}
	/*if($('.sohrow').length%11==10)
	$('.totalpagee,.totalpage').text(parseInt($('.sohrow').length/11));
	else if($('.sohrow').length%13==11  || $('.sohrow').length%11==9)
	$('.totalpagee,.totalpage').text(parseInt($('.sohrow').length/11)+1);	
	else*/
	$('.totalpagee,.totalpage').text($('.reportName').length);	
	
	$('.printReason').text(reason);
	$('.printTransaction').text(transaction);
	$('.printTrading').text(trading);
	var a = window.open ();
	a.document.write(document.getElementById('printData').innerHTML);
	$("#printReport").hide();
 	a.document.close();
	a.focus();
	a.print();
	//a.close();
	return false; 
}

function dgmsDetailsPrint(){
	var date=new Date();
	$('.currentDate1').text(dateformat());
	$('.currentTime1').text(timeformat());
	var reportIdInv="";
	var reportIdNoInv="";
	var salesOrg="";
	if($('#salesOrgUsr').val()==1020){//woolworths Petrol
		salesOrg="PT";
		 reportIdInv="71";
		 reportIdNoInv="70";
		
		
	}else if($('#salesOrgUsr').val()==1015){//Dan Murphy
		
		salesOrg="DM";
		reportIdInv="31";
		 reportIdNoInv="30";
	}else if($('#salesOrgUsr').val()==3000){
		
		salesOrg="CD";
	}else if($('#salesOrgUsr').val()==1010){//bws
		salesOrg="BWS";	
		reportIdInv="31";
		 reportIdNoInv="30";
	}
	else if($('#salesOrgUsr').val()==1005){//bws
		salesOrg="SM";	
		reportIdInv="11";
		 reportIdNoInv="10";
	}
	
	var currentdate = new Date();
	var month=parseInt(currentdate.getMonth(),10)+1;
	var curDate=currentdate.getDate()<10?"0"+currentdate.getDate() : currentdate.getDate();
	var curMonth=month<10?"0"+month : month;

		
	var date=curDate+curMonth;
	var dateWithSlash=curDate + "/"+curMonth
	+ "/" + currentdate.getFullYear();
	var time=currentdate.getHours() + ":" 
	+ currentdate.getMinutes();
	var datetime =  currentdate.getDate() + "/"+month 
	+ "/" + currentdate.getFullYear() + "        " 
	+ currentdate.getHours() + ":" 
	+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	//$(".currentDate").text(date);
	//$(".currentTime").text(time);
	//$('.dateWithSlash').text(dateWithSlash);
	if($('#date').val()!=""){
		var dateType=getRadioValue("searchByOptions");
		if(dateType.toLowerCase()=="wcdate"){
			var mydate=formateDate($('#date').val());
			var date1 = new Date();
			var parts = mydate.split('/');
			var actualYear=parts[2];
			date1.setFullYear(parts[2], parts[1]-1, parts[0]); 
			date1.setTime(date1.getTime() + (86400000*6));
			
			//var date7=(date1.getDate()+"/"+(date1.getMonth()+1)+"/"+date1.getFullYear());
			var fullYearVal=date1.getFullYear().toString();
			if(fullYearVal.length==4)
			{
				fullYearVal=fullYearVal.substr(2,3);
			}
			var toMonth=date1.getMonth()+1;
			toMonth=toMonth<10?"0"+toMonth : toMonth;
			/* if(toMonth<10){
				toMonth="0"+toMonth;
				} */
			var toDate=date1.getDate();
				toDate=toDate<10?"0"+toDate : toDate;
			/* if(toDate<10){
				toDate="0"+toDate;
				} */
		date7=(toDate+"/"+(toMonth)+"/"+fullYearVal);
			if(actualYear.length==4)
				{
				actualYear=actualYear.substr(2,3);
				}
			mydate=(parts[0]+"/"+parts[1]+"/"+ actualYear);
			$('.fromDate').text(mydate);
			$('.toDate').text(date7);
			$(".currentDate").text(toDate+toMonth);
		
	}
	else
	{
	var splittedDate=formateDate($('#date').val()).split('/');
	var inYearStr=splittedDate[2].toString();
	var inYear=inYearStr.length==4?inYearStr.substr(2,3):inYearStr;
	var inDate=splittedDate[0]+"/"+splittedDate[1]+"/"+inYear;
	$('.fromDate').text(inDate);
	$('.toDate').text('');
	$('.to,.days').text('');
	$(".currentDate").text(splittedDate[0]+splittedDate[1]);
	}
	}
	$('.totalpagee,.totalpage').text($('.totalpagee').text());
	$('#withoutInV').text(reportIdNoInv);
	$('#withInV').text(reportIdInv);
	$('.decimalPrecision').filter(function(){
		var value=Number($(this).text());
		$(this).text(value.toFixed(2));
		});
	var a=window.open();
	var fileref=document.createElement("link");
	  fileref.setAttribute("rel", "stylesheet");
	  fileref.setAttribute("type", "text/css");
	  fileref.setAttribute("href", "../../styles/printstyle.css");
	  a.document.getElementsByTagName("head")[0].appendChild(fileref);	$(".salesOrgName").text(salesOrg);
	$("#printReport").show();
	//$(".right").css('float','right');
	//$("#contentDiv").css({'margin-left':'40px','margin-right':'40px'});
	//$("#contentDiv").css('margin-right','40px');
	//$("#withInvoice").css({'margin-left':'40px','margin-right':'40px'});
	//$(".center").css('text-align','center');
	///$(".margin0").css('margin-top','0px');
	//$(".margin-22").css('margin-top','-22px');
	//$(".margin-32").css('margin-top','-32px');
	//$(".margin10").css('margin-top','10px');
	//$(".table").css('border-collapse','collapse');
	//$(".table").css('font-size','12px');
	//$(".table").css('text-align','left');
	//$("#detail tr").css('border-bottom','1px solid black');
	//$("#detail1 tr").css('border-bottom','1px solid black');
	//$("#detail tr").css('height','35px');
	//$("#detail1 tr").css('height','35px');
	//$(".bold").css('font-weight','bold');
	//$(".underLine").css('text-decoration','underline');
	//$(".pad5").css('padding-left','5px');
	//$(".pad50").css('padding-left','50px');
	//$(".pad20").css('padding-left','20px');
	//$(".pad10").css('padding-left','10px');
	//$(".pad30").css('padding-left','30px');
	//$(".txtRight").css('text-align','right');
	//$(".reltable").css('position','relative');
	//$(".reltable").css('left','51%');
	//$(".reltable").css('margin-top','10px');
	//$("#detail").css('width','100%');
	//$("#detail1").css('width','100%');
	$("#contentDiv").css('page-break-before',' always');
	
	
	
	
	
	
	
	//a.document.title='DGMS Report';
	a.document.write(document.getElementById('print').innerHTML);
	$("#printReport").hide();
	a.document.close();
	
	
	a.focus();
	
	a.print();
	//a.close();

	
	return false;
	
}


function edgmsDetailsPrint() {
	
	var salesOrg="";
	//var page=parseInt(($('#pageNum').val().trim()/9)+1);
	//alert(page);
	//$('.pageNum').text(page);
	//console.log('page num',page);
	
	if($('#salesOrgUsr').val()==1020){//woolworths Petrol
		salesOrg="PT";
		
	}else if($('#salesOrgUsr').val()==1015){//Dan Murphy
		
		salesOrg="DM";
	}else if($('#salesOrgUsr').val()==3000){
		
		salesOrg="CD";
	}else if($('#salesOrgUsr').val()==1010){//bws
		salesOrg="BWS";	
	}
	else if($('#salesOrgUsr').val()==1005){//bws
		salesOrg="SM";	
	}
	var currentdate = new Date();
	var month=parseInt(currentdate.getMonth(),10)+1;
	var curDate=currentdate.getDate()<10?"0"+currentdate.getDate() : currentdate.getDate();
	var curMonth=month<10?"0"+month : month;
	var date=curDate + "/"+curMonth 
	+ "/" + currentdate.getFullYear();
	var time=currentdate.getHours() + ":" 
	+ currentdate.getMinutes();
	var datetime =  currentdate.getDate() + "/"+month 
	+ "/" + currentdate.getFullYear() + "        " 
	+ currentdate.getHours() + ":" 
	+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
	//$(".currentDate").text(date);
	//$(".currentTime").text(time);
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime1').text(timeformat());
	
	if($('#date').val()!=""){
		var dateType=getRadioValue("searchByOptions");
		if(dateType.toLowerCase()=="wcdate"){
			var mydate=formateDate($('#date').val());
		var date1 = new Date();
		var parts = mydate.split('/');
		var actualYear=parts[2];
		date1.setFullYear(parts[2], parts[1]-1, parts[0]); 
		date1.setTime(date1.getTime() + (86400000*6));
		
		//var date7=(date1.getDate()+"/"+(date1.getMonth()+1)+"/"+date1.getFullYear());
		var fullYearVal=date1.getFullYear().toString();
		if(fullYearVal.length==4)
		{
			fullYearVal=fullYearVal.substr(2,3);
		}
		var toMonth=date1.getMonth()+1;
		toMonth=toMonth<10?"0"+toMonth : toMonth;
		/* if(toMonth<10){
			toMonth="0"+toMonth;
			} */
		var toDate=date1.getDate();
			toDate=toDate<10?"0"+toDate : toDate;
		/* if(toDate<10){
			toDate="0"+toDate;
			} */
	date7=(toDate+"/"+(toMonth)+"/"+fullYearVal);
		if(actualYear.length==4)
			{
			actualYear=actualYear.substr(2,3);
			}
		mydate=(parts[0]+"/"+parts[1]+"/"+ actualYear);
		$('.fromDate').text(mydate);
		$('.toDate').text(date7);
	
	}
	else
		{
		var splittedDate=formateDate($('#date').val()).split('/');
		var inYearStr=splittedDate[2].toString();
		var inYear=inYearStr.length==4?inYearStr.substr(2,3):inYearStr;
		var inDate=splittedDate[0]+"/"+splittedDate[1]+"/"+inYear;
		$('.fromDate').text(inDate);
		$('.toDate').text('');
		$('.to,.week').text('');
		}
	}
	$('.totalpagee1,.totalpage1').text($('.reportCount').size());
	$('.totalpagee2,.totalpage2').text($('.reportCount1').size());
	parseFloat($('#inv-total').text()).toFixed(2);
	
	var i=0,j=0;
	if($('.with-end').length==0)
	$('.with-invoice-table').last().append("<tr class='with-end'><td colspan='15'><p class='text-align-center margintop20 bold'><b>End of Report</b></p></td></tr><tr><td class='width50 text-align-left' colspan='7'>Manager's Signature:   ________________________________</td><td class='width50 text-align-right' colspan='8'>Department Manager's Signature:    _________________________________</td></tr>");
	var lastPageRows1=10-$('.with-invoice-table').last().find('.with-invoice-records').length;
	for(i=0;i<lastPageRows1-4;i++)/*{
		if(i!=0)*/
	$('.with-invoice-table').last().append('<tr class="height40 "><td></td></tr>');
	
	
	if($('.without-end').length==0)
	$('.without-invoice-table').last().append("<tr class='without-end'><td colspan='14'><p class='text-align-center margintop20 bold'><b>End of Report</b></p></td></tr><tr><td class='width50 text-align-left' colspan='7'>Manager's Signature:   ________________________________</td><td class='width50 text-align-right' colspan='7'>Department Manager's Signature:    _________________________________</td></tr>");
	var lastPageRows=12-$('.without-invoice-table').last().find('.without-invoice-records').length;
	for(j=0;j<lastPageRows-4;j++)/*{
		if(i!=0)*/
	$('.without-invoice-table').last().append('<tr class="height40 "><td></td></tr>');
	
	var a = window.open();
	var fileref=document.createElement("link");
	  fileref.setAttribute("rel", "stylesheet");
	  fileref.setAttribute("type", "text/css");
	  fileref.setAttribute("href", "../../styles/printstyle.css");
	  a.document.getElementsByTagName("head")[0].appendChild(fileref);	
	  $(".salesOrgName").text(salesOrg);
	$("#printReport").show();
	$(".right").css('float', 'right');
	$("table").css('border', 'none');
	$("table").css('border-collapse', 'collapse');
	//$("#contentDiv").css('margin-left', '40px');
	$("#contentDiv").css('page-break-before', ' always');
	$('.totalpagee,.totalpage').text($('.reportName').length);
	a.document.write(document.getElementById('printReport').innerHTML);
	
	$("#printReport").hide();
	 a.document.close();

	a.focus();

	a.print();
	//a.close();
	return false;
 
}


function invoicePrint() {
	var date=new Date();
	var i=0;
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());	
	
	var department=$("#department option[value='"+$('#dropretainTradDept').val()+"']").text();
	var transaction=$("#transactionType option[value='"+$('#dropretainTransType').val()+"']").text();
	var reason=$("#reasonCode option[value='"+$('#dropretainReasonCode').val()+"']").text();
	if(department=="" || department==null)
		{department="All";}
	
	$('.inv-row-fill').remove();
	var lastPageRows=16-$('.printtableinv').last().find('.invrow').length;
	if(lastPageRows!=0){
	for(i=0;i<lastPageRows;i++){
		if(i!=0)
			$('.printtableinv').last().append('<tr class="height40 invrow inv-row-fill"><td></td></tr>');
		else
			$('.printtableinv').last().append('<tr class="appendedMob  inv-row-fill"><td class="mobReportEnd wvrReportEnd" colspan="11"><strong>End of Report</strong></td></tr>');	
	}
	}
	else if(lastPageTrLen==0){
		$('.endOfReport:last').removeClass('hideBlock');
	}
	/*if($('.inv-end').length==0)
	$('.printtableinv').last().append('<tr class="height40 inv-end invrow"><td colspan="11"><p class="text-align-center  bold"><b>End of Report</b></p></td></tr>');
	var lastPageRows=16-$('.printtableinv').last().find('.invrow').length;
	for(i=0;i<lastPageRows;i++){
		if(i!=0)
			$('.printtableinv').last().append('<tr class="height40 invrow"><td></td></tr>');
		else
			$('.printtableinv').last().append('<p class="text-align-center  bold"><b>End of Report</b></p>');
	}*/
		
	$('.totalpagee,.totalpage').text($('.reportName').length);
	$('.reason').text(reason);
	$('.printDiscrepancy').text($('#discrpAmt').val());
	$('.printDept').text($('option:selected').text());
	if($('#orderNo').val()=="")
		{$('.ordHide').hide();}
	/*else
		{$('.nonOrdHide').hide();}*/
	if($('.receipt').text().trim()=="")
		$('.receiptHide').hide();
	
	var a = window.open ();
	//write gridview data into newly open window
	var fileref=document.createElement("link");
	  fileref.setAttribute("rel", "stylesheet");
	  fileref.setAttribute("type", "text/css");
	  fileref.setAttribute("href", "../../styles/printstyle.css");
	  a.document.getElementsByTagName("head")[0].appendChild(fileref);	
	  $("#contentDiv").css('page-break-before',' always');
	a.document.write(document.getElementById('printData').innerHTML);
	a.document.close();
	a.focus();
	//call print
	a.print();
	//a.close();
	return false;
}
function getRadioValue(name) {
    var group = document.getElementsByName(name);

    for (var i=0;i<group.length;i++) {
        if (group[i].checked) {
            return group[i].value;
        }
    }

    return '';
}
function discrepancyPrint() {
if($('tr.dis-end').length == 0)
	{
var footer='<div style="height: 30px !important; margin-top: 10px" id="foot"  class="width98">	<div class="width35  left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block  hideBlock endOfReport"><div><strong>End of Report</strong></div></div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="pageno"></label> of <label class="totalpage"></label></div></div>	</div>';
var tableLast='<table cellspacing="0" cellpadding="1" id="" class="printtabledis text-align-left font11  width100" border="0" style="page-break-before:always;width: 100%">'
+'	<tr><td colspan="11" style="padding: 0px; ">'
+'<div style="" id="contentDiv" class="width100 ">'
+'<div class="width70   reportName bold inline-block">eDGMS Discrepancies for Previous Day Report as of <label class="date-from-input"></label></div>'
+'<div style="width: 25%" class="width25  right"><div class="  margin5 text-align-right "></div></div>'
+'<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label> </div>'
+'</div>	'
+'</td></tr>'

+'<tr class="height30 bold border-bottom" id="tableHeader">'
+'<th>PO #</th>'
+'<th class="columnDivider">GRN #</th>'
+'<th class="centerValue">PO Qty.</th>'
+'<th class="centerValue">GRN Qty.</th>'
+'<th class="centerValue columnDivider">Difference in Qty.</th>'
+'<th class="numberColumn">PO Amount</th>'
	+'<th class="numberColumn">GRN Amount</th>'
	+'<!--<th class="numberColumn">Invoice Amount</th>-->'
	+'<th class="numberColumn ">Difference in Amount</th>'
	+'<th class="numberColumn text-align-center">Act</th>'
	+'<th class="numberColumn lastColumn">Sign.off</th>'
+'</tr>';

	var lastPageRows=19-$('.printtabledis').last().find('tr').length;

	if((lastPageRows-9)>=0){
		for(var i=0;i<lastPageRows-9;i++){
			if(i!=0)
				$('.printtabledis').last().append('<tr class="height40"><td></td></tr>');
			else
				{
				//$('.printtabledis').last().append("<tr class='dis-end'><td colspan='11'>Legend for Action Undertaken: Short Deliveries (SD), Date Entry Error (DE)</td></tr><tr><td colspan='9'>Note: The store manager's signature indicates that discrepancies/differences have been cleared unless indicated on the report.</td></tr><tr><td colspan='11'><strong>End of Report</strong></td></tr><tr><td class='width50 text-align-left' colspan='6'>Manager's Name:   ________________________________</td><td class='width50 text-align-right' colspan='5'>Manager's Signature:    _________________________________</td></tr>");
				$('.printtabledis').last().append("<tr class='dis-end'><td colspan='10'></td></tr>"
						+"<tr class='dis-end'>"
						+"<td colspan='8'></td>"
						+"<td colspan='1'>ACTION UNDERTAKEN (ACT)</td>"
						+"<td colspan='1'>ABBRV</td>"
					+"</tr>"
					+"<tr class='dis-end'>"
						+"<td colspan='8'></td>"
						+"<td colspan='1'>1.Short Deliveries</td>"
						+"<td colspan='1'>SD</td>"
					+"</tr>"
					+"<tr class='dis-end'>"
						+"<td colspan='8'></td>"
						+"<td colspan='1'>2.Qty Receiving Error </td>"
						+"<td colspan='1'>RE</td>"
					+"</tr>"
					+"<tr class='dis-end'>"
						+"<td colspan='8'></td>"
						+"<td colspan='1'>3.GRN Correct </td>"
						+"<td colspan='1'>GC</td>"
					+"</tr>"
					+"<!--<tr class='dis-end'>"
						+"<td colspan='8'></td>"
						+"<td colspan='1'>4.Invoice Entry Error </td>"
						+"<td colspan='1'>IE</td>"
					+"</tr>-->"
					+"<tr>"
						+"<td colspan='8'>Note: Discrepancies/differences must be cleared unless indicated on the report.</td>"
					+"</tr>"
					+"<tr>"
						+"<td style='text-align:center' colspan='10'><strong>End of Report</strong></td>"
					+"</tr>");
				}
			
			}
		}
		else if((lastPageRows-9)<=0){
			var tempTr=$('.printtabledis tr:last-child')[0].outerHTML;
			$('.printtabledis tr:last-child').html('<td></td>');
		//	$('#printbody').append(tableLast+tempTr+"<tr class='dis-end'><td colspan='11'>Legend for Action Undertaken: Short Deliveries (SD), Date Entry Error (DE)</td></tr><tr><td colspan='9'>Note: The store manager's signature indicates that discrepancies/differences have been cleared unless indicated on the report.</td></tr><tr><td colspan='11' class='text-align-center'><strong>End of Report</strong></td></tr><tr><td class='width50 text-align-left' colspan='6'>Manager's Name:   ________________________________</td><td class='width50 text-align-right' colspan='5'>Manager's Signature:    _________________________________</td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='height40 ><td></td></tr><tr class='dis-end' style='height: 23px !important;'><td colspan='11' style='    padding: 0px;'>"+footer+"</tr></table>");
var count = (lastPageRows-9)*(-1);
for(var i=0;i<count;i++)
	{
	if(i==0)
		{
			$('#printbody').append(tableLast+tempTr+
					"<tr class='dis-end'><td colspan='10'></td></tr>"
					+"<tr class='dis-end'>"
						+"<td colspan='8'></td>"
						+"<td colspan='1'>ACTION UNDERTAKEN (ACT)</td>"
						+"<td colspan='1'>ABBRV</td>"
					+"</tr>"
					+"<tr class='dis-end'>"
						+"<td colspan='8'></td>"
						+"<td colspan='1'>1.Short Deliveries</td>"
						+"<td colspan='1'>SD</td>"
					+"</tr>"
					+"<tr class='dis-end'>"
						+"<td colspan='8'></td>"
						+"<td colspan='1'>2.Qty Receiving Error </td>"
						+"<td colspan='1'>RE</td>"
					+"</tr>"
					+"<tr class='dis-end'>"
					+"<td colspan='8'></td>"
					+"<td colspan='1'>3.GRN Correct </td>"
					+"<td colspan='1'>GC</td>"
				+"</tr>"
				+"<!--<tr class='dis-end'>"
					+"<td colspan='8'></td>"
					+"<td colspan='1'>4.Invoice Entry Error </td>"
					+"<td colspan='1'>IE</td>"
				+"</tr>-->"
					+"<tr>"
						+"<td colspan='8'>Note: Discrepancies/differences must be cleared unless indicated on the report.</td>"
					+"</tr>");
	}
	else if(i!=0)
		{
		$('#printbody').append("<tr class='height40' ><td></td></tr><tr class='height40' ><td></td></tr><tr class='height40' ><td></td></tr><tr class='height40' ><td></td></tr><tr class='height40' ><td></td></tr><tr class='height40' ><td></td></tr>");
		}
	}

$('#printbody').append("<tr class='dis-end' style='height: 23px !important;'><td colspan='10' style='    padding: 0px;'>"+footer+"</tr></table>");
			//$('.endOfReport:last').removeClass('hideBlock');
		}
	}
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());	

	
	var len=0;
	$('.pageno').filter(function(){
		len++;
		$(this).text(len);
	});
	$('.totalpage').text($('.pageno').length);
	$('.date-from-input').text($('.print-head-date').text());
	$('#printbody > div.width100 > div.width25.right > div').text($('#printbody > div.width100 > div.width25.right > div').text());
	var a = window.open ();
	//write gridview data into newly open window
	var fileref=document.createElement("link");
	  fileref.setAttribute("rel", "stylesheet");
	  fileref.setAttribute("type", "text/css");
	  fileref.setAttribute("href", "../../styles/printstyle.css");
	  a.document.getElementsByTagName("head")[0].appendChild(fileref);	
	//a.document.title='eDGMS Discrepancy Report';
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	a.document.write(document.getElementById('printData').innerHTML);
	$("#printData").hide();
	a.focus();
	
	//call print
	$(a).ready(function(){
		 //a.close();   
		setTimeout(function(){
		doc=a;
		$(document).click(function(){
			a.close();// for Defect_14720 
			doc='';
			$(document).unbind('click');
		});a.print();},1000);
		 return true;
	    });
}
function timeformat()
{
	var date=new Date();
	if(date.getHours()>12)
	{
		hours=(date.getHours())-12;
		ampm="pm";
	}
else
	{
	hours=(date.getHours());
		ampm="am";
	}
return (hours<10?("0"+hours):hours)+":"+(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+" "+ampm;
}

function dateformat()
{
	var date=new Date();
	day=date.getDate();
	month=date.getMonth()+1;
	year=date.getFullYear();
	return (day<10?("0"+day):day)+"/"+(month<10?("0"+month):month)+"/"+(year<10?("0"+year):year);
}
function inStoreDisplayReportPrint()
{
	$('.pageBreak :first').removeClass('pageBreak');
		$('.siteNoNamePrint').text($('.siteNoName').text());
		var len=0;
		$('.currentPagePrint').each(function(){
			len++;
			$(this).text(len);
		});
		$('.totalPage').text($('.currentPagePrint').length);
		$('.fromDatePrint').text($('#promStartDate').val());
		$('.toDatePrint').text($('#promEndDate').val());
		$('.currentDate').text(dateformat());
		$('.currentTime').text(timeformat());
		
		$('.dept').text($('.depPrint').text());
		$('.cat').text($(".catPrint").text());
		$('.subCate').text($('.scPrint').text());
		$('.seg').text($('.segPrint').text());

		if($('.seg').text().trim()!="")
		$('.receiptHide').removeClass('hideBlock');
		if($('.cat').text().trim()!="")
			$('.cateHide').removeClass('hideBlock');
		if($('.subCate').text().trim()!="")
			$('.subcatHide').removeClass('hideBlock');
		
		
	var lastPageTrLen=17-($('.actionRowPrint:last tr').length-1);	
		
		$('.appendedMob').remove();
		if(lastPageTrLen!=0){
		for(var i=0;i<lastPageTrLen;i++){
			if(i!=0)
			$('.ContentTable.actionRowPrint').last().append('<tr class="height30 appendedMob"><td colspan="6"></td></tr>');
			else 
			$('.ContentTable.actionRowPrint').last().append('<tr class="appendedMob"><td class="mobReportEnd mplReportEnd" colspan="14">End of Report</td></tr>');	
		
		}
		}
		else if(lastPageTrLen==0){
			$('.endOfReport:last').removeClass('hideBlock');
		}
		var a = window.open ();
		$("#printData").show();
		a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
		  a.document.write(document.getElementById('printData').innerHTML);
		
		$("#printData").hide();
		a.focus();
		$(a).ready(function(){
			setTimeout(function(){$(document).unbind('click');
			doc=a;
			$(document).click(function(){
				doc.close();
				doc='';
			});a.print();},1000);
			 return true;
		    });
	
}
//Article Details Nutrition Info Print
function articleNutritionInfoPrint()
{
	$('.pageBreak :first').removeClass('pageBreak');
		var len=0;
		$('.currentPagePrint').each(function(){
			len++;
			$(this).text(len);
		});
		$('.totalPage').text($('.currentPagePrint').length);
		$('.currentDate').text(dateformat());
		$('.currentTime').text(timeformat());
		
		var a = window.open ();
		$("#printDataForNutrition").show();
		a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
		  a.document.write(document.getElementById('printDataForNutrition').innerHTML);
		
		$("#printDataForNutrition").hide();
		a.focus();
		$(a).ready(function(){
			setTimeout(function(){$(document).unbind('click');
			doc=a;
			$(document).click(function(){
				if(doc!=undefined && doc!=null && doc!=''){
					doc.close();
					$(document).unbind('click');
					doc='';
				}
			});a.print();},1000);
			 return true;
		    });
	
}
