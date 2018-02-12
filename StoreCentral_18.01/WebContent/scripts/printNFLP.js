var doc='';
//Voids Refunds
/*function nightFillLabourPlanReportPrint(){
	console.log(expandedParents);
	console.log("---------------------");
	console.log(document.getElementById('printData').innerHTML);
	$('#printbody').children(':first').removeClass('pageBreak');
	
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFromHide').text());
	
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
var lastPageTrLen=15-($('.KRONOSactionRowPrint:last tr').length-1);

$('.KRONOSactionRowPrint.appendedMob').remove();

	//$('.appendedMob').remove();
	if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('.KRONOSactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
		else 
			{
		$('.KRONOSactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr style="border-bottom:solid 1px!important"></tr><tr class="appendedMob"><td class="noteFont"  colspan="9"><label class="" style="font-style: italic">Note: Labour Plan is a FORECAST ONLY<br>Use back of this page for any comments</label></td></tr></tbody></table>').
		append('<table cellspacing="0" class=" sortTable "><tbody><tr style="border-bottom:solid 1px!important"></tr><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11"><strong>End of Report1</strong></td></tr></tbody></table>');	
			}
	}
	}
	else if(lastPageTrLen==0){
		//$('.endOfReport:last').removeClass('hideBlock');
		$('.staredMark:last').removeClass('hideBlock');
	}
	if(lastPageTrLen == -1 )
	{
	//$('.endOfReport:last').removeClass('hideBlock');
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
	
	
}*/

function nightFillLabourPlanReportPrint(){
	//$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	var len=0;
	$('.currentPagePrint').each(function(){
		len++;
		$(this).text(len);
	});
	$('.totalPage').text($('.currentPagePrint').length);
	$('.fromDatePrint').text($('#dateFrom').val());
	
	$('.departmentPrint').text($("#deptGMHide").val()+"  "+$("#deptGroceriesHide").val()+"  "+$("#deptPerishablesHide").val());

	$('.indicatorPrint').text($("#bulkIndicatorHide").val()+"  "+$("#promotionIndicatorHide").val());
	/*	if($("#deptGMHide").val()!="")
		{
	$('.departmentPrint').text($("#deptGMHide").val());
		}
	else if($("#deptGroceriesHide").val() !="")
		{
		$('.departmentPrint').text("  "+$("#deptGroceriesHide").val());
		}
	else if($("#deptPerishablesHide").val() !="")
	{
	$('.departmentPrint').text("  "+$("#deptPerishablesHide").val());
	}*/
	
	var date=new Date();
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	

	
	
	
var lastPageTrLen=17-($('#breakLoadTablePrint:last tr').length-1);	
	
	$('.appendedMob').remove();
	/*if(lastPageTrLen!=0){
	for(var i=0;i<lastPageTrLen;i++){
		if(i!=0)
		$('#breakLoadTablePrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
		else 
		$('#breakLoadTablePrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');	
	
	}
	}
	else if(lastPageTrLen==0){
		
		$('.endOfReport:last').removeClass('hideBlock');
	}*/
	
	var lastPageTrLenK=15-($('.KRONOSactionRowPrint:last tr').length-1);

	$('.KRONOSactionRowPrint.appendedMob').remove();

		//$('.appendedMob').remove();
		if(lastPageTrLenK!=0){
		for(var i=0;i<lastPageTrLenK;i++){
			if(i!=0)
			$('.KRONOSactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr class="height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
			else 
				{
			//$('.KRONOSactionRowPrint').last().append('<table cellspacing="0" class=" sortTable "><tbody><tr style="border-bottom:solid 1px!important"></tr><tr class="appendedMob"><td class="noteFont"  colspan="9"><label class="" style="font-style: italic">Note: Labour Plan is a FORECAST ONLY<br>Use back of this page for any comments</label></td></tr></tbody></table>').
			//append('<table cellspacing="0" class=" sortTable "><tbody><tr style="border-bottom:solid 1px!important"></tr><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11"><strong>End of Report1</strong></td></tr></tbody></table>');	
				}
		}
		}
		else if(lastPageTrLenK == -1 )
		{
		//$('.endOfReport:last').removeClass('hideBlock');
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
function nightFillLabourPlanBulkReportPrint(){
	
	
	$('.siteNoNamePrint').text($('.siteNoName').text());
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	var a = window.open ();
	$("#printBulkOrdersData").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>'); 
	a.document.write(document.getElementById('printBulkOrdersData').innerHTML);
	
	$("#printBulkOrdersData").hide();
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