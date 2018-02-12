var recordCount;
var currentPage;
var prevRes = '';
var NDF = "Sorry, no results found for your search criteria. Please try again.";
redoHide = true;
visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"]';
hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"]';
allInputCtrls = 'input[name="dateFrom"],input[name="dateTo"]';
var fuelBanners = "petrol";
var isNotAssigned = false;
$(function() {

  $('#filter').css('padding-top', '4px').css('width', '18%');

  $("#dateFrom").datepicker({
    dateFormat: "dd/mm/yy",
    zIndex: 50,
    /*onClose : function(selectedDate) {
			$("#dateTo").focus();
		}*/

  });

  $("#dateTo").datepicker({
    dateFormat: "dd/mm/yy",
    zIndex: 50,
    onClose: function(selectedDate) {
      //$("#dateTo").focus();
    }

  });

  /*$('#deptFilterOpen').click(function(){
		$('#deptFilterOpen').addClass('hideBlock');
		$('#deptFilterClear').removeClass('hideBlock');
		showdeptFilter();
		});
		$('#deptFilterClear').click(function(){
		$('#deptFilterOpen').removeClass('hideBlock');
		$('#deptFilterClear').addClass('hideBlock');
		hidedeptFillter();
		});*/

  $("#timeTo, #timeFrom").timepicker({
    hours: {
      starts: 0,
      ends: 23
    },
    minutes: {
      interval: 5
    },
    rows: 4,
    showPeriodLabels: true,
    minuteText: 'Min'
  });

  var today = new Date();
  var newDate = today.getDate();
  var newMonth = today.getMonth() + 1;
  if (newDate < 10) {
    newDate = '0' + newDate;
  }
  if (newMonth < 10) {
    newMonth = '0' + newMonth;
  }
  var presentDate = (newDate + "/" + (newMonth) + "/" + today.getFullYear());
  $('#dateTo').val(presentDate);

  var previousDate = new Date();
  previousDate.setTime(previousDate.getTime() - (60 * 60 * 24 * 1000));

  var newPrevDate = previousDate.getDate();
  var newPrevMonth = previousDate.getMonth() + 1;

  if (newPrevDate < 10) {
    newPrevDate = '0' + newPrevDate;
  }
  if (newPrevMonth < 10) {
    newPrevMonth = '0' + newPrevMonth;
  }

  var oneDayBefCurDate = (newPrevDate + "/" + (newPrevMonth) + "/" + previousDate.getFullYear());
  $('#dateFrom').val(oneDayBefCurDate);
  if($("#deptSaleTaxBanner").val() == fuelBanners) {
	  $('#reportContentFuel').removeClass('hideBlock');
	  $("#sortTableFuel").removeClass('hideBlock');
	  $("#sortTableFuel tbody:first").html('');
	  $("#sortTableFuel").tablesorter({
		    emptyTo: 'top'
		  });
}
else {
	  $('#reportContent').removeClass('hideBlock');
	  $("#sortTable").removeClass('hideBlock');
	  $("#sortTable tbody:first").html('');
	  $("#sortTable").tablesorter({
	    emptyTo: 'top'
	  });
}
  if($("#deptSaleTaxBanner").val() == fuelBanners) {
	  $('#reportContentFuel').addClass('hideBlock');
	  $("#sortTableFuel").addClass('hideBlock');
}
else {
	  $('#reportContent').addClass('hideBlock');
	  $("#sortTable").addClass('hideBlock');
}

  /* $("table").trigger("update"); 
     // set sorting column and direction, this will sort on the first and third column 
     var sorting = [[2,1],[0,0]]; 
     // sort on the first column 
     $("table").trigger("sorton",[sorting]);*/

  // Code for accordion
  $("#accordion").accordion({
    header: "h3.mainAccordion",
    collapsible: true,
    heightStyle: "content"
  });

  $("#dateFrom").blur(function() {

    if ($('#dateFrom').val().split('/')[2].length != 4) {
      var fromYear = parseDate($('#dateFrom').val()).getFullYear();
      console.log(fromYear);
      var fromDateFYear = $('#dateFrom').val().split('/');
      var finalFromDate = fromDateFYear[0] + '/' + fromDateFYear[1] + '/' + fromYear;
      $('#dateFrom').val(finalFromDate);
      console.log(finalFromDate);
    }
  });

  $("#dateTo").blur(function() {

    if ($('#dateTo').val().split('/')[2].length != 4) {
      var toYear = parseDate($('#dateTo').val()).getFullYear();
      console.log(toYear);
      var toDateFYear = $('#dateTo').val().split('/');
      var finalToDate = toDateFYear[0] + '/' + toDateFYear[1] + '/' + toYear;
      $('#dateTo').val(finalToDate);
      console.log(finalToDate);
    }
  });
  $("#generateReport")
    .click(

  function() {
    hideError();
    $('#filter').val('');
    var fromDate = formateDate($('#dateFrom').val());
    var toDate = formateDate($('#dateTo').val());
    var start = $("#dateFrom").datepicker("getDate");
    var end = $("#dateTo").datepicker("getDate");
    var days = (end - start) / (1000 * 60 * 60 * 24);
    $('#dateToHide').text(toDate);
    $('#dateFromHide').text(fromDate);

    var today = new Date();
    var newDate = today.getDate();
    var newMonth = today.getMonth();
    var newYear = today.getFullYear();
    var curDate = new Date(newYear, newMonth, newDate);
    var date1 = new Date();

    var parts = fromDate.split('/');
    var partsLen = parts.length;
    var date1Len = fromDate.length;
    date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
    var newTime = Number(date1.getTime());

    var dateComFrom = new Date(fromDate.split('/')[2],
    fromDate.split('/')[1], fromDate.split('/')[0]);
    var dateComTo = new Date(toDate.split('/')[2], toDate.split('/')[1], toDate.split('/')[0]);
    var toYear = dateComTo.getFullYear();
    var fromYear = dateComFrom.getFullYear();
    var toMonth = dateComTo.getMonth();
    var fromMonth = dateComFrom.getMonth();
    var toDay = dateComTo.getDate();
    var fromDay = dateComFrom.getDate();
    var rangeDate = new Date(toDate.split('/')[2],
    toDate.split('/')[1] - 1, toDate.split('/')[0]);
    var date2 = new Date();
    var part = toDate.split('/');
    var partLen = part.length;
    var date2Len = toDate.length;
    date2.setFullYear(part[2], part[1] - 1, part[0]);

    var splittedDate = formateDate($('#dateTo').val(),
    $('#dateTo').val().split('/').length)
      .split('/');
    var splittedTwo = splittedDate[0] + splittedDate[1] + splittedDate[2];

    newTime = Number(newTime) + Number(24 * 60 * 60 * 1000 * 90);

    if (fromDate == "") {
      showError('Please enter From Date.');
      callFrom();
    } else if (toDate == "") {
      showError('Please enter To Date.');
      callTo();
    } else if (partsLen != 3 || date1Len != 10 || fromDate.split('/')[0] > 31 || fromDate.split('/')[1] > 12 || fromDate.split('/')[2].length != 4) {
      showError('Invalid From Date.');
      callFrom();
    } else if (partLen != 3 || date2Len != 10 || toDate.split('/')[0] > 31 || toDate.split('/')[1] > 12 || toDate.split('/')[2].length != 4) {
      showError('Invalid To Date.');
      callTo();
    } else if (date1.getTime() > date2.getTime()) {
      showError('To Date should not be lesser than the From Date');
      callTo();
    } else if ((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999) || isNaN(splittedTwo)) {

      showError("Invalid Date Format");
    }else if(days >6){
		showError('Date Range is more than one week.');
		callFrom();
	}
		 else if (rangeDate > curDate) {
      showError("Future Dates are not allowed for To Date.");
      callTo();
    } else if ((toYear - fromYear) == 1) {
      if (((toMonth - fromMonth) + 12) > 3) {
        showError('Date difference should not be greater than 3 months');
        callFrom();
      } else if ((((toMonth - fromMonth) + 12) == 3) && (((toDay - fromDay) + 30) > 30)) {
        showError('Date difference should not be greater than 3 months');
        callFrom();
      } else {
        departmentSalesTax($('#departmentSalestax')
          .serialize());

      }
    } else if (toYear - fromYear == 0) {
      if ((toMonth - fromMonth) > 3) {
        showError('Date difference should not be greater than 3 months');
        callFrom();
      } else if (((toMonth - fromMonth) == 3) && (((toDay - fromDay) + 30) > 30)) {
        showError('Date difference should not be greater than 3 months');
        callFrom();
      } else {
        departmentSalesTax($('#departmentSalestax')
          .serialize());
      }
    } else if ((toYear - fromYear) >= 2) {
      showError('Date difference should not be greater than 3 months');
      callFrom();
    } else {
      departmentSalesTax($('#departmentSalestax')
        .serialize());
    }

  });


  $(document).keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      $('#dateFrom').blur();
      $('#dateTo').blur();
      $('#generateReport').click();

    }

  });

  $("#closeLink").click(function() {
    $('#accordion').accordion({
      active: true
    });

  });

  $(".backBtn").click(function(e) {
    window.location.href = "../login/goingHome.htm";
  });

  $("#menu").menu({
    position: {
      my: "right top",
      at: "right top+20"
    }
  });

  // code for table sorter
  //$(".actionRows").tablesorter();

  $(".actionRows tr th").click(function() {

    $('.actionRows tr td').each(function() {
      $(this).removeClass("sorted");
    });
  });

  $(".actionRows th").click(function() {

    $('.actionRows tr td').each(function() {
      $(this).removeClass("sorted");
    });

    col = $(this).parent().children().index($(this));

    // col=$('th.sorted').index();

    $('.actionRows tr').each(function() {
      $(this).find('td').eq(col).addClass("sorted");
    });

  });

  $("label.toolTip").tooltip({
    position: {
      my: "left top",
      at: "left top-70"
    }
  });

  $('#sortTable').on('click','.sorting',function () {
	    var th = $('#sortTable th').eq($(this).index());
	    $(th).attr('aria-sort');
	    headerDesc = th.text().replace( /[\s\n\r]+/g,' ').trim();
	    headIndex=Number($(this).index());
	   // returns [object Object]       
	});
  
});

function updateSortPlugin() {
	if($("#deptSaleTaxBanner").val() == fuelBanners) {
  $(".sortTableFuel").trigger("update");
	}
	else {
		  $(".sortTable").trigger("update");
	}


}

function departmentSalesTax(data) {
	
	backupInputParams();
  $.ajax({
    type: "get",
    url: "getDeartmentSaleTax.htm",
    data: data,
    beforeSend: function() {
      fullScreenLoader();
    },
    success: function(response) {
      prevRes = '';
      if($("#deptSaleTaxBanner").val() == fuelBanners) {
    	  formDepartmentSalesTaxContentFuel(response, '');
      }
      else {
    	  formDepartmentSalesTaxContent(response, '');
      }
      prevRes = response;
      //bindFilter();
      $.loader('close');
      if($("#deptSaleTaxBanner").val() == fuelBanners) {
    		setScrollerPosition($("#sortTableFuel"), $("#previous-columnFuel"), $("#next-columnFuel"));
      }
      else {
    		setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
      }
    },
    error: function() {
      showError('Technical issue occurred. Due to service unavailability.');
      $.loader('close');
    },
  });
}

function showOldSearch() {
  if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0) {
	  if($("#deptSaleTaxBanner").val() == fuelBanners) {
		  formDepartmentSalesTaxContentFuel(response, '');
  }
  else {
	  formDepartmentSalesTaxContent(prevRes, '');
  }
  }

  if ($('.parentTr:visible').length == 0) {
    $('.treetable ').find('tr :first').addClass(
      'hideBlock');
    $('.totVal').addClass('hideBlock');
  } else {
    $('.treetable').find('tr :first').removeClass(
      'hideBlock');
    $('.totVal').removeClass('hideBlock');
  }

}

function formDepartmentSalesTaxContent(response, value) {
  output = $.parseJSON(response);
  deptSalesTax = output.deptSalesTax;
  msg = output.msg;
  var transCount = Number(output.transCount);
  var nextContent ='';
  var s = 0;
  currentPage = 1;

  var flag = false;
  if (msg != undefined &&  msg == '' && deptSalesTax != null && deptSalesTax != undefined && !(deptSalesTax.length == 1 && (deptSalesTax[0].department == null || deptSalesTax[0].department == undefined || deptSalesTax[0].department == ''))) {
    recordCount = deptSalesTax.length;
    var content = '';
    setReportGenerationFlags();
    var list = deptSalesTax;
    if (deptSalesTax != null) {

   
      var listSize = 0;
      if(list.length > 0 && list[list.length - 1].departmentNo=='#') {//list[departmentNo].substring(1)
    	  listSize = list.length - 1;
      }
      else if(list.length > 1 && list[list.length - 2].departmentNo=='#') { // if(grpCount==1)
    	  listSize = list.length - 2;
      }
      else if(list.length > 1 && list[list.length - 3].departmentNo=='#') { // if(grpCount==1)
    	  listSize = list.length - 3;
      }
      else if(list.length > 0  && (list[list.length - 1].departmentNo.substring(1)=='100' ||
    		  (list[list.length - 1].departmentNo.substring(1)=='19594'))){
    	  listSize = list.length - 1;
      }
      else if(list.length > 2  && (list[list.length - 1].departmentNo.substring(1)=='120') && !(list[list.length - 2].departmentNo.substring(1)=='100') && $('input[name=yes]:checked').val()=='Yes'){
    	  listSize = list.length - 1;
      }
      else if(list.length > 2  && (list[list.length - 1].departmentNo.substring(1)=='120') && (list[list.length - 2].departmentNo.substring(1)=='100') && $('input[name=yes]:checked').val()=='Yes'){
    	  listSize = list.length - 2;
      }
      else {
    	  listSize = list.length;
      }
      }
      else {
    	  listSize = list.length;
      }
      for (var i = 0; i < listSize; i++) {
    	
        s++;
        list[i].countSiteDayDept = (list[i].countSiteDayDept != null && list[i].countSiteDayDept != undefined) ? Number(list[i].countSiteDayDept).toFixed(0) : '';
        list[i].noOfReceiptItems = (list[i].noOfReceiptItems != null && list[i].noOfReceiptItems != undefined) ? Number(list[i].noOfReceiptItems).toFixed(0) : '';
        list[i].avgArticlePrice = (list[i].avgArticlePrice != null && list[i].avgArticlePrice != undefined) ? Number(list[i].avgArticlePrice).toFixed(2) : '';
        list[i].salesTaxRetailIncl = (list[i].salesTaxRetailIncl != null && list[i].salesTaxRetailIncl != undefined) ? Number(list[i].salesTaxRetailIncl).toFixed(2) : '';
        list[i].totalTaxAmount = (list[i].totalTaxAmount != null && list[i].totalTaxAmount != undefined) ? Number(list[i].totalTaxAmount).toFixed(2) : '';
        list[i].avgTransactionPurchase = (list[i].avgTransactionPurchase != null && list[i].avgTransactionPurchase != undefined) ? Number(list[i].avgTransactionPurchase).toFixed(2) : '';
        list[i].netSalesExlTax = (list[i].netSalesExlTax != null && list[i].netSalesExlTax != undefined) ? Number(list[i].netSalesExlTax).toFixed(2) : '';
        list[i].department = (list[i].department != null && list[i].department != undefined) ? list[i].department : '';
        list[i].deferedLoyalty = (list[i].deferedLoyalty != null && list[i].deferedLoyalty != undefined) ? Number(list[i].deferedLoyalty).toFixed(2) : '';
        list[i].onlineSales = (list[i].onlineSales != null && list[i].onlineSales != undefined) ? Number(list[i].onlineSales).toFixed(2) : '';
   
        flag = true;
          content += '<tr id="' + i + '" class="parentTr ';

  
        content += '">';
        content += '<td class="leftValue " >' + list[i].department + '</td>' + '<td class="rightValue " >';
        if (list[i].countSiteDayDept.trim() != '' && list[i].countSiteDayDept.trim() != undefined) content += list[i].countSiteDayDept;
        content += '</td>' + '<td class="rightValue " >';
        if (list[i].noOfReceiptItems.trim() != '' && list[i].noOfReceiptItems.trim() != undefined) content += list[i].noOfReceiptItems;
        content += '</td>' + '<td class="rightValue" >';
        if (list[i].avgArticlePrice.trim() != '' && list[i].avgArticlePrice.trim() != undefined) content += list[i].avgArticlePrice;
        content += '</td>' + '<td class="rightValue" >';
        if (list[i].avgTransactionPurchase.trim() != '' && list[i].avgTransactionPurchase.trim() != undefined) content += list[i].avgTransactionPurchase;
        content += '</td>' + '<td class="rightValue">';
        if (list[i].salesTaxRetailIncl.trim() != '' && list[i].salesTaxRetailIncl.trim() != undefined) content += list[i].salesTaxRetailIncl;
        content += '</td>' + '<td class=" rightValue ">';
        if (list[i].totalTaxAmount.trim() != '' && list[i].totalTaxAmount.trim() != undefined) content += list[i].totalTaxAmount;
        content += '<td class=" rightValue">';
        if (list[i].netSalesExlTax.trim() != '' && list[i].netSalesExlTax.trim() != undefined) content += list[i].netSalesExlTax;
        content += '</td>';
        content += '<td class=" rightValue">';
        if (list[i].deferedLoyalty.trim() != '' && list[i].deferedLoyalty.trim() != undefined) content += list[i].deferedLoyalty;
        content += '</td>';
        content += '<td class=" rightValue">';
        content += ((isValidNumeric(list[i].netSalesExlTax)?Number(list[i].netSalesExlTax):0.0) - (isValidNumeric(list[i].deferedLoyalty)?Number(list[i].deferedLoyalty):0.0)).toFixed(2);
        content += '</td>';
        content += '<td class=" rightValue lastColumn">';
        content += ((isValidNumeric(list[i].onlineSales)?Number(list[i].onlineSales):0.0)).toFixed(2);
        content += '</td>';
        content += '</tr>';
        
        //console.log(list[0].transactionTotalCount+"   =========Transaccount");
      }
      if(list.length > 1) {
    	  var notAsgnd = list.length - 1;
    	  if(list[list.length - 1].departmentNo=='#') {
    		  notAsgnd = list.length - 1;
    		  isNotAssigned = true;
    	  }
    	  else if(list[list.length - 2].departmentNo == "#") {
    		  notAsgnd = list.length - 2;
    		  isNotAssigned = true;
    	  }
    	  else if(list[list.length - 3].departmentNo == "#") {
    		  notAsgnd = list.length - 3;
    		  isNotAssigned = true;
    	  }
    	  
    	  if(isNotAssigned == true) {
    		  $("#nonFuelNotAsgndLgnd").removeClass("hideBlock");
          nextContent += '<tr class="notAssignedTr';
          nextContent += '">';
          nextContent += '<td class="leftValue " >' + list[notAsgnd].department + '</td>' + '<td class="rightValue notAssignedTransCnt" >';
          if (list[notAsgnd].countSiteDayDept.trim() != '' && list[notAsgnd].countSiteDayDept.trim() != undefined) nextContent += Number(list[notAsgnd].countSiteDayDept).toFixed(0);
          nextContent += '</td>' + '<td class="rightValue notAssignedArtSld" >';
          if (list[notAsgnd].noOfReceiptItems.trim() != '' && list[notAsgnd].noOfReceiptItems.trim() != undefined) nextContent += Number(list[notAsgnd].noOfReceiptItems).toFixed(0);
          nextContent += '</td>' + '<td class="rightValue notAssignedAvgArtPric" >';
          if (list[notAsgnd].avgArticlePrice.trim() != '' && list[notAsgnd].avgArticlePrice.trim() != undefined) nextContent += Number(list[notAsgnd].avgArticlePrice).toFixed(2);
          nextContent += '</td>' + '<td class="rightValue notAssignedTransPur" >';
          if (list[notAsgnd].avgTransactionPurchase.trim() != '' && list[notAsgnd].avgTransactionPurchase.trim() != undefined) nextContent += Number(list[notAsgnd].avgTransactionPurchase).toFixed(2);
          nextContent += '</td>' + '<td class="rightValue notAssignedSales">';
          if (list[notAsgnd].salesTaxRetailIncl.trim() != '' && list[notAsgnd].salesTaxRetailIncl.trim() != undefined) nextContent += Number(list[notAsgnd].salesTaxRetailIncl).toFixed(2);
          nextContent += '</td>' + '<td class=" rightValue notAssignedGstAmt">';
          if (list[notAsgnd].totalTaxAmount.trim() != '' && list[notAsgnd].totalTaxAmount.trim() != undefined) nextContent += Number(list[notAsgnd].totalTaxAmount).toFixed(2);
          nextContent += '<td class=" rightValue notAssignedNetSales">';
          if (list[notAsgnd].netSalesExlTax.trim() != '' && list[notAsgnd].netSalesExlTax.trim() != undefined) nextContent += Number(list[notAsgnd].netSalesExlTax).toFixed(2);
          nextContent += '</td>';
          nextContent += '<td class=" rightValue notAssignedDfrdLylt">';
          if (list[notAsgnd].deferedLoyalty.trim() != '' && list[notAsgnd].deferedLoyalty.trim() != undefined) nextContent += Number(list[notAsgnd].deferedLoyalty).toFixed(2);
          nextContent += '</td>';
          nextContent += '<td class=" rightValue   notAssignedNetSlsAftDrfdLylt">';
          nextContent += ((isValidNumeric(list[notAsgnd].netSalesExlTax)?Number(list[notAsgnd].netSalesExlTax):0.0) - (isValidNumeric(list[notAsgnd].deferedLoyalty)?Number(list[notAsgnd].deferedLoyalty):0.0)).toFixed(2);
          nextContent += '</td>';
          nextContent += '<td class=" rightValue  lastColumn notAssignedOnlineSales">';
          nextContent += ((isValidNumeric(list[notAsgnd].onlineSales)?Number(list[notAsgnd].onlineSales):0.0)).toFixed(2);
          nextContent += '</td>';
          nextContent += '</tr>';
    	  }
      }
      if(list.length > 1 && list[list.length - 1].departmentNo != "#" && ((list[list.length - 1].departmentNo.substring(1)=='100') ||
    		  (list[list.length - 1].departmentNo.substring(1)=='19594') ||  
    		  (list[list.length - 1].departmentNo.substring(1)=='120' && $('input[name=yes]:checked').val()=='Yes'))) {//departmentNo
          nextContent+='<tr class="totVal secondStoreTot">'
            	+'<td class="columnDivider valueInfo storeNdsub ">Store Sales Total</td>'
            	+'<td class="numberColumn valueInfo transacCount" style="width: 130px;"></td>'
            	+'<td class="numberColumn valueInfo articleSold" style="width: 83px;"></td>'
            	+'<td class="numberColumn valueInfo avgArticlePrice" style="width: 109px;"></td>'
            	+'<td class="numberColumn valueInfo avgTransactionPrice" style="width: 106px;"></td>'
            	+'<td class="numberColumn valueInfo sales" style="width: 46px;"></td>'
            	+'<td class="numberColumn valueInfo gstAmt" style="width: 78px;"></td>'
            	+'<td class="numberColumn valueInfo netSales"></td>'
            	+'<td class="numberColumn valueInfo deferdVal"></td>'
            	+'<td class="numberColumn valueInfo netSalesAftrDfrdVal"></td>'
            	+'<td class="numberColumn lastColumn valueInfo onlineSalesStoreTot"></td>'
            	+'<td class=" rightValue transacCount hideBlock"></td>'
            	+'</tr>';
      /*}*/
      if(list.length > 1 && list[list.length - 1].departmentNo != "#" && ((list[list.length - 1].departmentNo.substring(1)=='100') ||
    		  (list[list.length - 1].departmentNo.substring(1)=='19594') )) {
          var lstRecIdx = deptSalesTax.length - 1;
      	  deptSalesTax[lstRecIdx].countSiteDayDept = (deptSalesTax[lstRecIdx].countSiteDayDept != null && deptSalesTax[lstRecIdx].countSiteDayDept != undefined) ? Number(deptSalesTax[lstRecIdx].countSiteDayDept).toFixed(0) : '';
            deptSalesTax[lstRecIdx].noOfReceiptItems = (deptSalesTax[lstRecIdx].noOfReceiptItems != null && deptSalesTax[lstRecIdx].noOfReceiptItems != undefined) ? Number(deptSalesTax[lstRecIdx].noOfReceiptItems).toFixed(0) : '';
            deptSalesTax[lstRecIdx].avgArticlePrice = (deptSalesTax[lstRecIdx].avgArticlePrice != null && deptSalesTax[lstRecIdx].avgArticlePrice != undefined) ? Number(deptSalesTax[lstRecIdx].avgArticlePrice).toFixed(2) : '';
            deptSalesTax[lstRecIdx].salesTaxRetailIncl = (deptSalesTax[lstRecIdx].salesTaxRetailIncl != null && deptSalesTax[lstRecIdx].salesTaxRetailIncl != undefined) ? Number(deptSalesTax[lstRecIdx].salesTaxRetailIncl).toFixed(2) : '';
            deptSalesTax[lstRecIdx].totalTaxAmount = (deptSalesTax[lstRecIdx].totalTaxAmount != null && deptSalesTax[lstRecIdx].totalTaxAmount != undefined) ? Number(deptSalesTax[lstRecIdx].totalTaxAmount).toFixed(2) : '';
            deptSalesTax[lstRecIdx].avgTransactionPurchase = (deptSalesTax[lstRecIdx].avgTransactionPurchase != null && deptSalesTax[lstRecIdx].avgTransactionPurchase != undefined) ? Number(deptSalesTax[lstRecIdx].avgTransactionPurchase).toFixed(2) : '';
            deptSalesTax[lstRecIdx].netSalesExlTax = (deptSalesTax[lstRecIdx].netSalesExlTax != null && deptSalesTax[lstRecIdx].netSalesExlTax != undefined) ? Number(deptSalesTax[lstRecIdx].netSalesExlTax).toFixed(2) : '';
            deptSalesTax[lstRecIdx].department = (deptSalesTax[lstRecIdx].department != null && deptSalesTax[lstRecIdx].department != undefined) ? deptSalesTax[lstRecIdx].department : '';
            deptSalesTax[lstRecIdx].deferedLoyalty = (deptSalesTax[lstRecIdx].deferedLoyalty != null && deptSalesTax[lstRecIdx].deferedLoyalty != undefined) ? Number(deptSalesTax[lstRecIdx].deferedLoyalty).toFixed(2) : '';
            deptSalesTax[lstRecIdx].onlineSales = (deptSalesTax[lstRecIdx].onlineSales != null && deptSalesTax[lstRecIdx].onlineSales != undefined) ? Number(deptSalesTax[lstRecIdx].onlineSales).toFixed(2) : '';

            nextContent += '<tr class="secondStoreTot nonTradeTr';
            nextContent += '">';
            nextContent += '<td class="leftValue " >' + deptSalesTax[lstRecIdx].department + '</td>' + '<td class="rightValue " >';
            if (deptSalesTax[lstRecIdx].countSiteDayDept.trim() != '' && deptSalesTax[lstRecIdx].countSiteDayDept.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].countSiteDayDept;
            nextContent += '</td>' + '<td class="rightValue " >';
            if (deptSalesTax[lstRecIdx].noOfReceiptItems.trim() != '' && deptSalesTax[lstRecIdx].noOfReceiptItems.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].noOfReceiptItems;
            nextContent += '</td>' + '<td class="rightValue" >';
            if (deptSalesTax[lstRecIdx].avgArticlePrice.trim() != '' && deptSalesTax[lstRecIdx].avgArticlePrice.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].avgArticlePrice;
            nextContent += '</td>' + '<td class="rightValue" >';
            if (deptSalesTax[lstRecIdx].avgTransactionPurchase.trim() != '' && deptSalesTax[lstRecIdx].avgTransactionPurchase.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].avgTransactionPurchase;
            nextContent += '</td>' + '<td class="rightValue">';
            if (deptSalesTax[lstRecIdx].salesTaxRetailIncl.trim() != '' && deptSalesTax[lstRecIdx].salesTaxRetailIncl.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].salesTaxRetailIncl;
            nextContent += '</td>' + '<td class=" rightValue ">';
            if (deptSalesTax[lstRecIdx].totalTaxAmount.trim() != '' && deptSalesTax[lstRecIdx].totalTaxAmount.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].totalTaxAmount;
            nextContent += '<td class=" rightValue">';
            if (deptSalesTax[lstRecIdx].netSalesExlTax.trim() != '' && deptSalesTax[lstRecIdx].netSalesExlTax.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].netSalesExlTax;
            nextContent += '</td>';
            nextContent += '<td class=" rightValue ">';
            if (deptSalesTax[lstRecIdx].deferedLoyalty.trim() != '' && deptSalesTax[lstRecIdx].deferedLoyalty.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].deferedLoyalty;
            nextContent += '</td>';
            nextContent += '<td class=" rightValue  ">';
            nextContent += ((isValidNumeric(deptSalesTax[lstRecIdx].netSalesExlTax)?Number(deptSalesTax[lstRecIdx].netSalesExlTax):0.0) - (isValidNumeric(deptSalesTax[lstRecIdx].deferedLoyalty)?Number(list[lstRecIdx].deferedLoyalty):0.0)).toFixed(2);
            nextContent += '</td>';
            nextContent += '<td class=" rightValue  lastColumn">';
            nextContent += ((isValidNumeric(deptSalesTax[lstRecIdx].onlineSales)?Number(deptSalesTax[lstRecIdx].onlineSales):0.0)).toFixed(2);
            nextContent += '</td>';
            nextContent += '</tr>';
      }
      
      if(list.length > 1 && list[list.length - 1].departmentNo != "#" && (list[list.length - 1].departmentNo.substring(1)=='120' && $('input[name=yes]:checked').val()=='Yes')) {
          var lstRecIdx = deptSalesTax.length - 1;
      	  deptSalesTax[lstRecIdx].countSiteDayDept = (deptSalesTax[lstRecIdx].countSiteDayDept != null && deptSalesTax[lstRecIdx].countSiteDayDept != undefined) ? Number(deptSalesTax[lstRecIdx].countSiteDayDept).toFixed(0) : '';
            deptSalesTax[lstRecIdx].noOfReceiptItems = (deptSalesTax[lstRecIdx].noOfReceiptItems != null && deptSalesTax[lstRecIdx].noOfReceiptItems != undefined) ? Number(deptSalesTax[lstRecIdx].noOfReceiptItems).toFixed(0) : '';
            deptSalesTax[lstRecIdx].avgArticlePrice = (deptSalesTax[lstRecIdx].avgArticlePrice != null && deptSalesTax[lstRecIdx].avgArticlePrice != undefined) ? Number(deptSalesTax[lstRecIdx].avgArticlePrice).toFixed(2) : '';
            deptSalesTax[lstRecIdx].salesTaxRetailIncl = (deptSalesTax[lstRecIdx].salesTaxRetailIncl != null && deptSalesTax[lstRecIdx].salesTaxRetailIncl != undefined) ? Number(deptSalesTax[lstRecIdx].salesTaxRetailIncl).toFixed(2) : '';
            deptSalesTax[lstRecIdx].totalTaxAmount = (deptSalesTax[lstRecIdx].totalTaxAmount != null && deptSalesTax[lstRecIdx].totalTaxAmount != undefined) ? Number(deptSalesTax[lstRecIdx].totalTaxAmount).toFixed(2) : '';
            deptSalesTax[lstRecIdx].avgTransactionPurchase = (deptSalesTax[lstRecIdx].avgTransactionPurchase != null && deptSalesTax[lstRecIdx].avgTransactionPurchase != undefined) ? Number(deptSalesTax[lstRecIdx].avgTransactionPurchase).toFixed(2) : '';
            deptSalesTax[lstRecIdx].netSalesExlTax = (deptSalesTax[lstRecIdx].netSalesExlTax != null && deptSalesTax[lstRecIdx].netSalesExlTax != undefined) ? Number(deptSalesTax[lstRecIdx].netSalesExlTax).toFixed(2) : '';
            deptSalesTax[lstRecIdx].department = (deptSalesTax[lstRecIdx].department != null && deptSalesTax[lstRecIdx].department != undefined) ? deptSalesTax[lstRecIdx].department : '';
            deptSalesTax[lstRecIdx].deferedLoyalty = (deptSalesTax[lstRecIdx].deferedLoyalty != null && deptSalesTax[lstRecIdx].deferedLoyalty != undefined) ? Number(deptSalesTax[lstRecIdx].deferedLoyalty).toFixed(2) : '';
            deptSalesTax[lstRecIdx].onlineSales = (deptSalesTax[lstRecIdx].onlineSales != null && deptSalesTax[lstRecIdx].onlineSales != undefined) ? Number(deptSalesTax[lstRecIdx].onlineSales).toFixed(2) : '';

            nextContent += '<tr class="secondStoreTot liquorTr';
            nextContent += '">';
            nextContent += '<td class="leftValue " >' + deptSalesTax[lstRecIdx].department + '</td>' + '<td class="rightValue " >';
            if (deptSalesTax[lstRecIdx].countSiteDayDept.trim() != '' && deptSalesTax[lstRecIdx].countSiteDayDept.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].countSiteDayDept;
            nextContent += '</td>' + '<td class="rightValue " >';
            if (deptSalesTax[lstRecIdx].noOfReceiptItems.trim() != '' && deptSalesTax[lstRecIdx].noOfReceiptItems.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].noOfReceiptItems;
            nextContent += '</td>' + '<td class="rightValue" >';
            if (deptSalesTax[lstRecIdx].avgArticlePrice.trim() != '' && deptSalesTax[lstRecIdx].avgArticlePrice.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].avgArticlePrice;
            nextContent += '</td>' + '<td class="rightValue" >';
            if (deptSalesTax[lstRecIdx].avgTransactionPurchase.trim() != '' && deptSalesTax[lstRecIdx].avgTransactionPurchase.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].avgTransactionPurchase;
            nextContent += '</td>' + '<td class="rightValue">';
            if (deptSalesTax[lstRecIdx].salesTaxRetailIncl.trim() != '' && deptSalesTax[lstRecIdx].salesTaxRetailIncl.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].salesTaxRetailIncl;
            nextContent += '</td>' + '<td class=" rightValue ">';
            if (deptSalesTax[lstRecIdx].totalTaxAmount.trim() != '' && deptSalesTax[lstRecIdx].totalTaxAmount.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].totalTaxAmount;
            nextContent += '<td class=" rightValue">';
            if (deptSalesTax[lstRecIdx].netSalesExlTax.trim() != '' && deptSalesTax[lstRecIdx].netSalesExlTax.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].netSalesExlTax;
            nextContent += '</td>';
            nextContent += '<td class=" rightValue ">';
            if (deptSalesTax[lstRecIdx].deferedLoyalty.trim() != '' && deptSalesTax[lstRecIdx].deferedLoyalty.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].deferedLoyalty;
            nextContent += '</td>';
            nextContent += '<td class=" rightValue  ">';
            nextContent += ((isValidNumeric(deptSalesTax[lstRecIdx].netSalesExlTax)?Number(deptSalesTax[lstRecIdx].netSalesExlTax):0.0) - (isValidNumeric(deptSalesTax[lstRecIdx].deferedLoyalty)?Number(list[lstRecIdx].deferedLoyalty):0.0)).toFixed(2);
            nextContent += '</td>';
            nextContent += '<td class=" rightValue  lastColumn">';
            nextContent += ((isValidNumeric(deptSalesTax[lstRecIdx].onlineSales)?Number(deptSalesTax[lstRecIdx].onlineSales):0.0)).toFixed(2);
            nextContent += '</td>';
            nextContent += '</tr>';
            if(list.length > 1 && list[list.length - 2].departmentNo != "#" && ((list[list.length - 2].departmentNo.substring(1)=='100') ||
          		  (list[list.length - 2].departmentNo.substring(1)=='19594') )){
            lstRecIdx = deptSalesTax.length - 2;
        	  deptSalesTax[lstRecIdx].countSiteDayDept = (deptSalesTax[lstRecIdx].countSiteDayDept != null && deptSalesTax[lstRecIdx].countSiteDayDept != undefined) ? Number(deptSalesTax[lstRecIdx].countSiteDayDept).toFixed(0) : '';
              deptSalesTax[lstRecIdx].noOfReceiptItems = (deptSalesTax[lstRecIdx].noOfReceiptItems != null && deptSalesTax[lstRecIdx].noOfReceiptItems != undefined) ? Number(deptSalesTax[lstRecIdx].noOfReceiptItems).toFixed(0) : '';
              deptSalesTax[lstRecIdx].avgArticlePrice = (deptSalesTax[lstRecIdx].avgArticlePrice != null && deptSalesTax[lstRecIdx].avgArticlePrice != undefined) ? Number(deptSalesTax[lstRecIdx].avgArticlePrice).toFixed(2) : '';
              deptSalesTax[lstRecIdx].salesTaxRetailIncl = (deptSalesTax[lstRecIdx].salesTaxRetailIncl != null && deptSalesTax[lstRecIdx].salesTaxRetailIncl != undefined) ? Number(deptSalesTax[lstRecIdx].salesTaxRetailIncl).toFixed(2) : '';
              deptSalesTax[lstRecIdx].totalTaxAmount = (deptSalesTax[lstRecIdx].totalTaxAmount != null && deptSalesTax[lstRecIdx].totalTaxAmount != undefined) ? Number(deptSalesTax[lstRecIdx].totalTaxAmount).toFixed(2) : '';
              deptSalesTax[lstRecIdx].avgTransactionPurchase = (deptSalesTax[lstRecIdx].avgTransactionPurchase != null && deptSalesTax[lstRecIdx].avgTransactionPurchase != undefined) ? Number(deptSalesTax[lstRecIdx].avgTransactionPurchase).toFixed(2) : '';
              deptSalesTax[lstRecIdx].netSalesExlTax = (deptSalesTax[lstRecIdx].netSalesExlTax != null && deptSalesTax[lstRecIdx].netSalesExlTax != undefined) ? Number(deptSalesTax[lstRecIdx].netSalesExlTax).toFixed(2) : '';
              deptSalesTax[lstRecIdx].department = (deptSalesTax[lstRecIdx].department != null && deptSalesTax[lstRecIdx].department != undefined) ? deptSalesTax[lstRecIdx].department : '';
              deptSalesTax[lstRecIdx].deferedLoyalty = (deptSalesTax[lstRecIdx].deferedLoyalty != null && deptSalesTax[lstRecIdx].deferedLoyalty != undefined) ? Number(deptSalesTax[lstRecIdx].deferedLoyalty).toFixed(2) : '';
              deptSalesTax[lstRecIdx].onlineSales = (deptSalesTax[lstRecIdx].onlineSales != null && deptSalesTax[lstRecIdx].onlineSales != undefined) ? Number(deptSalesTax[lstRecIdx].onlineSales).toFixed(2) : '';

              nextContent += '<tr class="secondStoreTot nonTradeTr';
              nextContent += '">';
              nextContent += '<td class="leftValue " >' + deptSalesTax[lstRecIdx].department + '</td>' + '<td class="rightValue " >';
              if (deptSalesTax[lstRecIdx].countSiteDayDept.trim() != '' && deptSalesTax[lstRecIdx].countSiteDayDept.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].countSiteDayDept;
              nextContent += '</td>' + '<td class="rightValue " >';
              if (deptSalesTax[lstRecIdx].noOfReceiptItems.trim() != '' && deptSalesTax[lstRecIdx].noOfReceiptItems.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].noOfReceiptItems;
              nextContent += '</td>' + '<td class="rightValue" >';
              if (deptSalesTax[lstRecIdx].avgArticlePrice.trim() != '' && deptSalesTax[lstRecIdx].avgArticlePrice.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].avgArticlePrice;
              nextContent += '</td>' + '<td class="rightValue" >';
              if (deptSalesTax[lstRecIdx].avgTransactionPurchase.trim() != '' && deptSalesTax[lstRecIdx].avgTransactionPurchase.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].avgTransactionPurchase;
              nextContent += '</td>' + '<td class="rightValue">';
              if (deptSalesTax[lstRecIdx].salesTaxRetailIncl.trim() != '' && deptSalesTax[lstRecIdx].salesTaxRetailIncl.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].salesTaxRetailIncl;
              nextContent += '</td>' + '<td class=" rightValue ">';
              if (deptSalesTax[lstRecIdx].totalTaxAmount.trim() != '' && deptSalesTax[lstRecIdx].totalTaxAmount.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].totalTaxAmount;
              nextContent += '<td class=" rightValue">';
              if (deptSalesTax[lstRecIdx].netSalesExlTax.trim() != '' && deptSalesTax[lstRecIdx].netSalesExlTax.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].netSalesExlTax;
              nextContent += '</td>';
              nextContent += '<td class=" rightValue ">';
              if (deptSalesTax[lstRecIdx].deferedLoyalty.trim() != '' && deptSalesTax[lstRecIdx].deferedLoyalty.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].deferedLoyalty;
              nextContent += '</td>';
              nextContent += '<td class=" rightValue  ">';
              nextContent += ((isValidNumeric(deptSalesTax[lstRecIdx].netSalesExlTax)?Number(deptSalesTax[lstRecIdx].netSalesExlTax):0.0) - (isValidNumeric(deptSalesTax[lstRecIdx].deferedLoyalty)?Number(list[lstRecIdx].deferedLoyalty):0.0)).toFixed(2);
              nextContent += '</td>';
              nextContent += '<td class=" rightValue  lastColumn">';
              nextContent += ((isValidNumeric(deptSalesTax[lstRecIdx].onlineSales)?Number(deptSalesTax[lstRecIdx].onlineSales):0.0)).toFixed(2);
              nextContent += '</td>';
              nextContent += '</tr>';
            } 
      }
      
      }
      nextContent+='<tr class="totVal secondStoreTot">'
        	+'<td class="columnDivider valueInfo storeNdsub ">Store Total</td>'
        	+'<td class="numberColumn valueInfo transacCountSecond" style="width: 130px;">'+transCount+'</td>'
        	+'<td class="numberColumn valueInfo articleSoldSecond" style="width: 83px;"></td>'
        	+'<td class="numberColumn valueInfo avgArticlePriceSecond" style="width: 109px;"></td>'
        	+'<td class="numberColumn valueInfo avgTransactionPriceSecond" style="width: 106px;"></td>'
        	+'<td class="numberColumn valueInfo salesSecond" style="width: 46px;"></td>'
        	+'<td class="numberColumn valueInfo gstAmtSecond" style="width: 78px;"></td>'
        	+'<td class="numberColumn valueInfo netSalesSecond"></td>'
        	+'<td class="numberColumn valueInfo deferdValSecond"></td>'
        	+'<td class="numberColumn valueInfo netSalesAftrDfrdValSecond"></td>'
        	+'<td class="numberColumn lastColumn valueInfo onlineSalesSecond"></td>'
        	+'</tr>';
    }
  
  $('.sortTable tbody:first').html('');
  $('.sortTable tbody').append(content);
  showContentDepartmentSalesTaxBlock();
  
  $('.sortTable tfoot').html('');
  $('.sortTable tfoot').append(nextContent);
  sortTotVal();
  sortTotValSecond();
  if (flag) {

      updateSortPlugin();
      $("#deptSaleTaxAttr").val('');//groupNo,int,asc
      setTimeout(function() {
        // set sorting column and direction, this will sort on the first 
        var sorting = [
          [0, 0]
        ];
        // sort on the first column 
        $("#sortTable").trigger("sorton", [sorting]);
      }, 30);
    } 
 else {
    if (msg == 'null' || msg == NDF) showWarning(NDF);
    else if (msg == '' || (deptSalesTax != null && deptSalesTax != undefined && deptSalesTax.length > 0 && (deptSalesTax[0].department == null || deptSalesTax[0].department == undefined || deptSalesTax[0].department == ''))) showWarning(NDF);
    else showError(msg);
  }


}

function formDepartmentSalesTaxContentFuel(response, value) {

	  output = $.parseJSON(response);
	  deptSalesTax = output.deptSalesTax;
	  msg = output.msg;
	  var transCount = Number(output.transCount);
	  var nextContent ='';
	  var s = 0;
	  currentPage = 1;
	  var avgArticlePrice = 0;

	  var flag = false;
	  if (msg != undefined &&  msg == '' && deptSalesTax != null && deptSalesTax != undefined && !(deptSalesTax.length == 1 && (deptSalesTax[0].department == null || deptSalesTax[0].department == undefined || deptSalesTax[0].department == ''))) {
	    recordCount = deptSalesTax.length;
	    var content = '';
	    setReportGenerationFlags();
	    if (deptSalesTax != null) {

	      var list = deptSalesTax;
	      var listSize = 0;
		      if(list.length > 0 && list[list.length - 1].departmentNo=='#') {//list[departmentNo].substring(1)
		    	  listSize = list.length - 1;
		      }
		      else if(list.length > 1 && list[list.length - 2].departmentNo=='#') { // if(grpCount==1)
		    	  listSize = list.length - 2;
		      }
		      else if(list.length > 0 && list[list.length - 1].departmentNo.substring(1)=='100'){
		    	  listSize = list.length - 1;
		      }
		      else {
		    	  listSize = list.length;
		      }
	      for (var i = 0; i < listSize; i++) {
	        s++;
	        list[i].countSiteDayDept = (list[i].countSiteDayDept != null && list[i].countSiteDayDept != undefined) ? Number(list[i].countSiteDayDept).toFixed(0) : '';
	        list[i].noOfReceiptItems = (list[i].noOfReceiptItems != null && list[i].noOfReceiptItems != undefined) ? Number(list[i].noOfReceiptItems).toFixed(0) : '';
	        list[i].avgArticlePrice = (list[i].avgArticlePrice != null && list[i].avgArticlePrice != undefined) ? Number(list[i].avgArticlePrice).toFixed(2) : '';
	        list[i].salesTaxRetailIncl = (list[i].salesTaxRetailIncl != null && list[i].salesTaxRetailIncl != undefined) ? Number(list[i].salesTaxRetailIncl).toFixed(2) : '';
	        list[i].totalTaxAmount = (list[i].totalTaxAmount != null && list[i].totalTaxAmount != undefined) ? Number(list[i].totalTaxAmount).toFixed(2) : '';
	        list[i].avgTransactionPurchase = (list[i].avgTransactionPurchase != null && list[i].avgTransactionPurchase != undefined) ? Number(list[i].avgTransactionPurchase).toFixed(2) : '';
	        list[i].netSalesExlTax = (list[i].netSalesExlTax != null && list[i].netSalesExlTax != undefined) ? Number(list[i].netSalesExlTax).toFixed(2) : '';
	        list[i].department = (list[i].department != null && list[i].department != undefined) ? list[i].department : '';
	        list[i].deferedLoyalty = (list[i].deferedLoyalty != null && list[i].deferedLoyalty != undefined) ? Number(list[i].deferedLoyalty).toFixed(2) : '';
	        avgArticlePrice = (Number(list[i].noOfReceiptItems) == 0)? (Number(list[i].netSalesExlTax)/Number(list[i].litersSold)) : (Number(list[i].netSalesExlTax)/Number(list[i].noOfReceiptItems)) ;
	        list[i].onlineSales = (list[i].onlineSales != null && list[i].onlineSales != undefined) ? Number(list[i].onlineSales).toFixed(2) : '';
	        flag = true;

	          content += '<tr id="' + i + '" class="parentTr ';

	  
	        content += '">';
	        content += '<td class="leftValue " >' + list[i].department + '</td>' + '<td class="rightValue " >';
	        if (list[i].countSiteDayDept.trim() != '' && list[i].countSiteDayDept.trim() != undefined) content += list[i].countSiteDayDept;
	        content += '</td>' + '<td class="rightValue " >';
	        if (list[i].noOfReceiptItems.trim() != '' && list[i].noOfReceiptItems.trim() != undefined) content += list[i].noOfReceiptItems;
	        content += '</td>' + '<td class="rightValue" >';
	        //if (list[i].avgArticlePrice.trim() != '' && list[i].avgArticlePrice.trim() != undefined) 
	        	content += Number(avgArticlePrice).toFixed(2);
	        content += '</td>' + '<td class="rightValue" >';
	        if (list[i].avgTransactionPurchase.trim() != '' && list[i].avgTransactionPurchase.trim() != undefined) content += list[i].avgTransactionPurchase;
	        content += '</td>' + '<td class="rightValue">';
	        if (list[i].salesTaxRetailIncl.trim() != '' && list[i].salesTaxRetailIncl.trim() != undefined) content += list[i].salesTaxRetailIncl;
	        content += '</td>' + '<td class=" rightValue ">';
	        if (list[i].totalTaxAmount.trim() != '' && list[i].totalTaxAmount.trim() != undefined) content += list[i].totalTaxAmount;
	        content += '<td class=" rightValue">';
	        if (list[i].netSalesExlTax.trim() != '' && list[i].netSalesExlTax.trim() != undefined) content += list[i].netSalesExlTax;
	        content += '</td>';
	        content += '<td class=" rightValue">';
	        if (list[i].litersSold.trim() != '' && list[i].litersSold.trim() != undefined) content += Number(list[i].litersSold).toFixed(3);
	        content += '</td>';
	      
	        content += '<td class=" rightValue">';
	        if (list[i].deferedLoyalty.trim() != '' && list[i].deferedLoyalty.trim() != undefined) content += list[i].deferedLoyalty;
	        content += '</td>';
	        content += '<td class=" rightValue">';
	        content += ((isValidNumeric(list[i].netSalesExlTax)?Number(list[i].netSalesExlTax):0.0) - (isValidNumeric(list[i].deferedLoyalty)?Number(list[i].deferedLoyalty):0.0)).toFixed(2);
	        content += '</td>';
	        content += '<td class=" rightValue lastColumn">';
	        content += ((isValidNumeric(list[i].onlineSales)?Number(list[i].onlineSales):0.0)).toFixed(2);
	        content += '</td>';
	        content += '</tr>';
	        
	        //console.log(list[0].transactionTotalCount+"   =========Transaccount");
	      }
	      if(list.length > 1) {
	    	  var notAsgnd = list.length - 1;
	    	  if(list[list.length - 1].departmentNo=='#') {
	    		  notAsgnd = list.length - 1;
	    		  isNotAssigned = true;
	    	  }
	    	  else if(list[list.length - 2].departmentNo == "#") {
	    		  notAsgnd = list.length - 2;
	    		  isNotAssigned = true;
	    	  }
	    	  if(isNotAssigned==true) {
	    		  $("#fuelNotAsgndLgnd").removeClass("hideBlock");
		        avgArticlePrice = (Number(list[notAsgnd].noOfReceiptItems) == 0)? (Number(list[notAsgnd].netSalesExlTax)/Number(list[notAsgnd].litersSold)) : (Number(list[notAsgnd].netSalesExlTax)/Number(list[notAsgnd].noOfReceiptItems)) ;
	            nextContent += '<tr class="notAssignedTr';
	            nextContent += '">';
	            nextContent += '<td class="leftValue " >' + list[notAsgnd].department + '</td>' + '<td class="rightValue " >';
	            if (list[notAsgnd].countSiteDayDept.trim() != '' && list[notAsgnd].countSiteDayDept.trim() != undefined) nextContent += Number(list[notAsgnd].countSiteDayDept).toFixed(0);
	            nextContent += '</td>' + '<td class="rightValue " >';
	            if (list[notAsgnd].noOfReceiptItems.trim() != '' && list[notAsgnd].noOfReceiptItems.trim() != undefined) nextContent += Number(list[notAsgnd].noOfReceiptItems).toFixed(0);
	            nextContent += '</td>' + '<td class="rightValue" >';
	            //if (list[notAsgnd].avgArticlePrice.trim() != '' && list[notAsgnd].avgArticlePrice.trim() != undefined) nextContent += list[notAsgnd].avgArticlePrice;
	            nextContent += Number(avgArticlePrice).toFixed(2);
	            nextContent += '</td>' + '<td class="rightValue" >';
	            if (list[notAsgnd].avgTransactionPurchase.trim() != '' && list[notAsgnd].avgTransactionPurchase.trim() != undefined) nextContent += Number(list[notAsgnd].avgTransactionPurchase).toFixed(2);
	            nextContent += '</td>' + '<td class="rightValue">';
	            if (list[notAsgnd].salesTaxRetailIncl.trim() != '' && list[notAsgnd].salesTaxRetailIncl.trim() != undefined) nextContent += Number(list[notAsgnd].salesTaxRetailIncl).toFixed(2);
	            nextContent += '</td>' + '<td class=" rightValue ">';
	            if (list[notAsgnd].totalTaxAmount.trim() != '' && list[notAsgnd].totalTaxAmount.trim() != undefined) nextContent += Number(list[notAsgnd].totalTaxAmount).toFixed(2);
	            nextContent += '<td class=" rightValue">';
	            if (list[notAsgnd].netSalesExlTax.trim() != '' && list[notAsgnd].netSalesExlTax.trim() != undefined) nextContent += Number(list[notAsgnd].netSalesExlTax).toFixed(2);
	            nextContent += '</td>';
	            nextContent += '<td class=" rightValue ">';
	            if (list[notAsgnd].litersSold.trim() != '' && list[notAsgnd].litersSold.trim() != undefined) nextContent += Number(list[notAsgnd].litersSold).toFixed(3);
	            nextContent += '</td>';
	            nextContent += '<td class=" rightValue notAssignedDfrdLylt">';
	            if (list[notAsgnd].deferedLoyalty.trim() != '' && list[notAsgnd].deferedLoyalty.trim() != undefined) nextContent += Number(list[notAsgnd].deferedLoyalty).toFixed(2);
	            nextContent += '</td>';
	            nextContent += '<td class=" rightValue   notAssignedNetSlsAftDrfdLylt">';
	            nextContent += ((isValidNumeric(list[notAsgnd].netSalesExlTax)?Number(list[notAsgnd].netSalesExlTax):0.0) - (isValidNumeric(list[notAsgnd].deferedLoyalty)?Number(list[notAsgnd].deferedLoyalty):0.0)).toFixed(2);
	            nextContent += '</td>';
	            nextContent += '<td class=" rightValue  lastColumn notAssignedOnlineSales">';
	            nextContent += ((isValidNumeric(list[notAsgnd].onlineSales)?Number(list[notAsgnd].onlineSales):0.0)).toFixed(2);
	            nextContent += '</td>';
	            nextContent += '</tr>';
	    	  }
	      }
	      if(list.length > 1 && list[list.length - 1].departmentNo != "#" && list[list.length - 1].departmentNo.substring(1)=='100') {//departmentNo
	          nextContent+='<tr class="totVal secondStoreTot">'
	            	+'<td class="columnDivider valueInfo storeNdsub ">Store Sales Total</td>'
	            	+'<td class="numberColumn valueInfo transacCount" style="width: 130px;"></td>'
	            	+'<td class="numberColumn valueInfo articleSold" style="width: 83px;"></td>'
	            	+'<td class="numberColumn valueInfo avgArticlePrice" style="width: 109px;"></td>'
	            	+'<td class="numberColumn valueInfo avgTransactionPrice" style="width: 106px;"></td>'
	            	+'<td class="numberColumn valueInfo sales" style="width: 46px;"></td>'
	            	+'<td class="numberColumn valueInfo gstAmt" style="width: 78px;"></td>'
	            	+'<td class="numberColumn valueInfo netSales"></td>'
	            	+'<td class="numberColumn valueInfo deferdVal"></td>'
	            	+'<td class="numberColumn valueInfo  deferLiterVal"></td>'
	            	+'<td class="numberColumn valueInfo netSalesAftrDfrdVal"></td>'
	            	+'<td class="numberColumn lastColumn valueInfo onlineSalesStoreTot"></td>'
	            	//+'<td class="numberColumn lastColumn valueInfo netSalesAftrDfrdVal"></td>'
	            	+'<td class=" rightValue transacCount hideBlock"></td>'
	            	+'</tr>';
	      /*}
	      if(list.length > 1 && list[list.length - 1].departmentNo != "#" && list[list.length - 1].departmentNo.substring(1)=='100') {*/
	          var lstRecIdx = deptSalesTax.length - 1;
	      	  deptSalesTax[lstRecIdx].countSiteDayDept = (deptSalesTax[lstRecIdx].countSiteDayDept != null && deptSalesTax[lstRecIdx].countSiteDayDept != undefined) ? Number(deptSalesTax[lstRecIdx].countSiteDayDept).toFixed(0) : '';
	            deptSalesTax[lstRecIdx].noOfReceiptItems = (deptSalesTax[lstRecIdx].noOfReceiptItems != null && deptSalesTax[lstRecIdx].noOfReceiptItems != undefined) ? Number(deptSalesTax[lstRecIdx].noOfReceiptItems).toFixed(0) : '';
	            deptSalesTax[lstRecIdx].avgArticlePrice = (deptSalesTax[lstRecIdx].avgArticlePrice != null && deptSalesTax[lstRecIdx].avgArticlePrice != undefined) ? Number(deptSalesTax[lstRecIdx].avgArticlePrice).toFixed(2) : '';
	            deptSalesTax[lstRecIdx].salesTaxRetailIncl = (deptSalesTax[lstRecIdx].salesTaxRetailIncl != null && deptSalesTax[lstRecIdx].salesTaxRetailIncl != undefined) ? Number(deptSalesTax[lstRecIdx].salesTaxRetailIncl).toFixed(2) : '';
	            deptSalesTax[lstRecIdx].totalTaxAmount = (deptSalesTax[lstRecIdx].totalTaxAmount != null && deptSalesTax[lstRecIdx].totalTaxAmount != undefined) ? Number(deptSalesTax[lstRecIdx].totalTaxAmount).toFixed(2) : '';
	            deptSalesTax[lstRecIdx].avgTransactionPurchase = (deptSalesTax[lstRecIdx].avgTransactionPurchase != null && deptSalesTax[lstRecIdx].avgTransactionPurchase != undefined) ? Number(deptSalesTax[lstRecIdx].avgTransactionPurchase).toFixed(2) : '';
	            deptSalesTax[lstRecIdx].netSalesExlTax = (deptSalesTax[lstRecIdx].netSalesExlTax != null && deptSalesTax[lstRecIdx].netSalesExlTax != undefined) ? Number(deptSalesTax[lstRecIdx].netSalesExlTax).toFixed(2) : '';
	            deptSalesTax[lstRecIdx].department = (deptSalesTax[lstRecIdx].department != null && deptSalesTax[lstRecIdx].department != undefined) ? deptSalesTax[lstRecIdx].department : '';
	            deptSalesTax[lstRecIdx].deferedLoyalty = (deptSalesTax[lstRecIdx].deferedLoyalty != null && deptSalesTax[lstRecIdx].deferedLoyalty != undefined) ? Number(deptSalesTax[lstRecIdx].deferedLoyalty).toFixed(2) : '';
		        avgArticlePrice = (Number(deptSalesTax[i].noOfReceiptItems) == 0)? (Number(deptSalesTax[i].netSalesExlTax)/Number(deptSalesTax[i].litersSold)) : (Number(deptSalesTax[i].netSalesExlTax)/Number(deptSalesTax[i].noOfReceiptItems)) ;
		        deptSalesTax[lstRecIdx].deferedLoyalty = (deptSalesTax[lstRecIdx].deferedLoyalty != null && deptSalesTax[lstRecIdx].deferedLoyalty != undefined) ? Number(deptSalesTax[lstRecIdx].deferedLoyalty).toFixed(2) : '';
	            deptSalesTax[lstRecIdx].onlineSales = (deptSalesTax[lstRecIdx].onlineSales != null && deptSalesTax[lstRecIdx].onlineSales != undefined) ? Number(deptSalesTax[lstRecIdx].onlineSales).toFixed(2) : '';
	            nextContent += '<tr class="secondStoreTot nonTradeTr';
	            nextContent += '">';
	            nextContent += '<td class="leftValue " >' + deptSalesTax[lstRecIdx].department + '</td>' + '<td class="rightValue " >';
	            if (deptSalesTax[lstRecIdx].countSiteDayDept.trim() != '' && deptSalesTax[lstRecIdx].countSiteDayDept.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].countSiteDayDept;
	            nextContent += '</td>' + '<td class="rightValue " >';
	            if (deptSalesTax[lstRecIdx].noOfReceiptItems.trim() != '' && deptSalesTax[lstRecIdx].noOfReceiptItems.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].noOfReceiptItems;
	            nextContent += '</td>' + '<td class="rightValue" >';
	            //if (deptSalesTax[lstRecIdx].avgArticlePrice.trim() != '' && deptSalesTax[lstRecIdx].avgArticlePrice.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].avgArticlePrice;
	            nextContent += deptSalesTax[lstRecIdx].avgArticlePrice;
	            nextContent += '</td>' + '<td class="rightValue" >';
	            if (deptSalesTax[lstRecIdx].avgTransactionPurchase.trim() != '' && deptSalesTax[lstRecIdx].avgTransactionPurchase.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].avgTransactionPurchase;
	            nextContent += '</td>' + '<td class="rightValue">';
	            if (deptSalesTax[lstRecIdx].salesTaxRetailIncl.trim() != '' && deptSalesTax[lstRecIdx].salesTaxRetailIncl.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].salesTaxRetailIncl;
	            nextContent += '</td>' + '<td class=" rightValue ">';
	            if (deptSalesTax[lstRecIdx].totalTaxAmount.trim() != '' && deptSalesTax[lstRecIdx].totalTaxAmount.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].totalTaxAmount;
	            nextContent += '<td class=" rightValue">';
	            if (deptSalesTax[lstRecIdx].netSalesExlTax.trim() != '' && deptSalesTax[lstRecIdx].netSalesExlTax.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].netSalesExlTax;
	            nextContent += '</td>';
	            nextContent += '<td class=" rightValue">';
	            if (deptSalesTax[lstRecIdx].litersSold.trim() != '' && deptSalesTax[lstRecIdx].litersSold.trim() != undefined) nextContent += Number(deptSalesTax[lstRecIdx].litersSold).toFixed(3);
	            nextContent += '</td>';
	            nextContent += '<td class=" rightValue ">';
	            if (deptSalesTax[lstRecIdx].deferedLoyalty.trim() != '' && deptSalesTax[lstRecIdx].deferedLoyalty.trim() != undefined) nextContent += deptSalesTax[lstRecIdx].deferedLoyalty;
	            nextContent += '</td>';
	            nextContent += '<td class=" rightValue  ">';
	            nextContent += ((isValidNumeric(deptSalesTax[lstRecIdx].netSalesExlTax)?Number(deptSalesTax[lstRecIdx].netSalesExlTax):0.0) - (isValidNumeric(deptSalesTax[lstRecIdx].deferedLoyalty)?Number(list[lstRecIdx].deferedLoyalty):0.0)).toFixed(2);
	            nextContent += '</td>';
	            nextContent += '<td class=" rightValue  lastColumn">';
	            nextContent += ((isValidNumeric(deptSalesTax[lstRecIdx].onlineSales)?Number(deptSalesTax[lstRecIdx].onlineSales):0.0)).toFixed(2);
	            nextContent += '</td>';
	            nextContent += '</tr>';
	      }
	      nextContent+='<tr class="totVal secondStoreTot">'
	        	+'<td class="columnDivider valueInfo storeNdsub ">Store Total</td>'
	        	+'<td class="numberColumn valueInfo transacCountSecond" style="width: 130px;">'+transCount+'</td>'
	        	+'<td class="numberColumn valueInfo articleSoldSecond" style="width: 83px;"></td>'
	        	+'<td class="numberColumn valueInfo avgArticlePriceSecond" style="width: 109px;"></td>'
	        	+'<td class="numberColumn valueInfo avgTransactionPriceSecond" style="width: 106px;"></td>'
	        	+'<td class="numberColumn valueInfo salesSecond" style="width: 46px;"></td>'
	        	+'<td class="numberColumn valueInfo gstAmtSecond" style="width: 78px;"></td>'
	        	+'<td class="numberColumn valueInfo netSalesSecond"></td>'
	        	
	        	+'<td class="numberColumn valueInfo deferdValSecond"></td>'
	        	+'<td class="numberColumn  valueInfo deferliterValSecond"></td>'
	        	+'<td class="numberColumn valueInfo netSalesAftrDfrdValSecond"></td>'
	        	+'<td class="numberColumn lastColumn valueInfo onlineSalesSecond"></td>'
	        	//+'<td class="numberColumn lastColumn valueInfo netSalesAftrDfrdValSecond"></td>'
	        	+'</tr>';
	    }
	  
	  $('.sortTableFuel tbody:first').html('');
	  $('.sortTableFuel tbody').append(content);
	  showContentDepartmentSalesTaxBlock();
	  
	  $('.sortTableFuel tfoot').html('');
	  $('.sortTableFuel tfoot').append(nextContent);
	  sortTotVal();
	  sortTotValSecond();
	  if (flag) {

	      updateSortPlugin();
	      $("#deptSaleTaxAttr").val('');//groupNo,int,asc
	      setTimeout(function() {
	        // set sorting column and direction, this will sort on the first 
	        var sorting = [
	          [0, 0]
	        ];
	        // sort on the first column 
	        $("#sortTableFuel").trigger("sorton", [sorting]);
	      }, 30);
	    } 

	  } else {
	    if (msg == 'null' || msg == NDF) showWarning(NDF);
	    else if (msg == '' || (deptSalesTax != null && deptSalesTax != undefined && deptSalesTax.length > 0 && (deptSalesTax[0].department == null || deptSalesTax[0].department == undefined || deptSalesTax[0].department == ''))) showWarning(NDF);
	    else showError(msg);
	}
}

function showContentDepartmentSalesTaxBlock() {

	if($("#deptSaleTaxBanner").val() == fuelBanners) { // $('#reportContent').val()=="petrol"
		$('#reportContentFuel').removeClass('hideBlock');
		  $('.sortTableFuel').removeClass('hideBlock');
	}
	else {
		$('#reportContent').removeClass('hideBlock');
		  $('.sortTable').removeClass('hideBlock');
	}
  $('.ContentTableWrapperError').addClass('hideBlock');

}

function deptSalesTaxPrintJasper()
{
	if (isNotJasperPrintValid()) {
	printJasperValMsg();
}
else
	{
	if(headIndex !="" && headIndex!= null)
	{
headerSort = $("#sortTable thead tr th:nth-child("+(Number(headIndex)+1)+")").attr('aria-sort');
	}
$("#headerDesc").val(headerDesc);
$("#headerSort").val(headerSort);
$('#departmentSalestax').attr("action", "printReportDeptSalesTaxPDF.pdf");
$('#departmentSalestax').attr('target','_blank');
$('#departmentSalestax').submit();
	}

}

function printReport() {
  printResult();
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

function showContent() {

	if($("#deptSaleTaxBanner").val() == fuelBanners) {
		  $('#reportContentFuel,#reportContentFuel .tableInfo .tableTitle,#reportContentFuel,.ContentTable.actionRows')
		    .removeClass('hideBlock');
}
else {
	  $('#reportContent,#reportContent .tableInfo .tableTitle,#reportContent,.ContentTable.actionRows')
	    .removeClass('hideBlock');
}
  closeAccordian();
}

function hideContent() {

	if($("#deptSaleTaxBanner").val() == fuelBanners) {
		  $('#reportContentFuel,#reportContentFuel,.ContentTable.actionRows')
		    .addClass('hideBlock');
}
else {
	  $(
	    '#reportContent,#reportContent,.ContentTable.actionRows')
	    .addClass('hideBlock');
}
  //$('.paginationWrapper').hide();
}

function showError(msg) {
  $('.ContentTableWrapperError').removeClass('hideBlock');
	if($("#deptSaleTaxBanner").val() == fuelBanners) {
		  $('#reportContentFuel').addClass('hideBlock');
		  $('.sortTableFuel').addClass('hideBlock');
}
else {
	  $('#reportContent').addClass('hideBlock');
	  $('.sortTable').addClass('hideBlock');
}

  $('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
  $("#errorMsgDiv").removeClass('nodataMessage');
  hideContent();
}

function hideError() {
  $('.ContentTableWrapperError').addClass('hideBlock');
}

function startLoading() {
  $('#statusImg').removeClass('loading hideBlock');
  $('#statusImg').addClass('loading');
}

function stopLoading() {
  $('#statusImg').addClass('loading hideBlock');
  $('#statusImg').removeClass('loading');
}

function closeAccordian() {
  $('#accordion').accordion({
    active: true
  });
}

function callFrom() {
  setTimeout(function() {
    $('#dateFrom').focus();
  }, 200);
}

function callTo() {
  setTimeout(function() {
    $('#dateTo').focus();
  }, 200);
}

function convertTime() {
  $('.time').filter(

  function() {
    var temp = $(this).text().trim();

    if (temp != '') {
      var time = temp.replace('/', '').replace('/', '').replace(
        '(', '').replace(')', '').split('Date')[1];
      var today = new Date();
      today.setTime(time);
      var newHour = today.getHours();
      var newMinu = today.getMinutes();
      if (newHour < 10) {
        newHour = '0' + newHour;
      }
      if (newMinu < 10) {
        newMinu = '0' + newMinu;
      }
      $(this).text((newHour + ":" + newMinu));

    }
  });

}

function sortTotValSecond() {

	  var transacCount = 0;
	  var articleSold = 0;
	  var avgArticlePrice = 0;
	  var avgTransactionPrice = 0;
	  var sales = 0;
	  var gstAmt = 0;
	  var netSales = 0;
	  var avgArticlePriceTotal = 0;
	  //var avgTransactionPriceTotal = 0;
	  var deferdValTot = 0;
	  var netSalesAftrDfrdValTot = 0;
	  var litresSoldTot = 0; 
	  var onlineSalesTot = 0; 

	  $('.parentTr')//.secondStoreTot')
	    .filter(

	  function() {

	    transacCount += Number($(this)
	      .children(':nth-child(9)').text().trim().replace(',', ''));

	    articleSold += Number($(this).children(':nth-child(3)')
	      .text().trim().replace(',', ''));
	    avgArticlePrice += Number($(this).children(
	      ':nth-child(4)').text().trim().replace(',', ''));
	    avgTransactionPrice += Number($(this).children(
	      ':nth-child(5)').text().trim().replace(',', ''));
	    sales += Number($(this).children(':nth-child(6)')
	      .text().trim().replace(',', ''));
	    gstAmt += Number($(this).children(':nth-child(7)')
	      .text().trim().replace(',', ''));

	    netSales += Number($(this).children(':nth-child(8)')
	      .text().trim().replace(',', ''));
	  	  if($("#deptSaleTaxBanner").val() == fuelBanners) {
			  litresSoldTot += Number($(this).children(':nth-child(9)')
		    	      .text().trim().replace(',', ''));
			  deferdValTot += Number($(this).children(':nth-child(10)')
		    	      .text().trim().replace(',', ''));
		    netSalesAftrDfrdValTot += Number($(this).children(':nth-child(11)')
		    	      .text().trim().replace(',', ''));
		    onlineSalesTot += Number($(this).children(':nth-child(12)')
		    	      .text().trim().replace(',', ''));
	  }
	  else {
		    deferdValTot += Number($(this).children(':nth-child(9)')
		    	      .text().trim().replace(',', ''));
		    netSalesAftrDfrdValTot += Number($(this).children(':nth-child(10)')
		    	      .text().trim().replace(',', ''));
		    onlineSalesTot += Number($(this).children(':nth-child(11)')
		    	      .text().trim().replace(',', ''));
	  }

	  });
	  if(isNotAssigned==true) {
	  	    articleSold += Number($('.notAssignedTr').children(':nth-child(3)')
	  	  	      .text().trim().replace(',', ''));
	  	    avgTransactionPrice += Number($('.notAssignedTr').children(
	  	      ':nth-child(5)').text().trim().replace(',', ''));
	  	    avgArticlePrice += Number($('.notAssignedTr').children(
	  	      ':nth-child(4)').text().trim().replace(',', ''));
	  	    sales += Number($('.notAssignedTr').children(':nth-child(6)')
		  	  	      .text().trim().replace(',', ''));
	  	    gstAmt += Number($('.notAssignedTr').children(':nth-child(7)')
		  	  	      .text().trim().replace(',', ''));
	  	    netSales += Number($('.notAssignedTr').children(':nth-child(8)')
		  	  	      .text().trim().replace(',', ''));
		  	  if($("#deptSaleTaxBanner").val() == fuelBanners) {
				litresSoldTot += Number($('.notAssignedTr').children(':nth-child(9)')
			    	      .text().trim().replace(',', ''));
				 deferdValTot += Number($('.notAssignedTr').children(':nth-child(10)')
			    	      .text().trim().replace(',', ''));
			    netSalesAftrDfrdValTot += Number($('.notAssignedTr').children(':nth-child(11)')
			    	      .text().trim().replace(',', ''));
			    onlineSalesTot += Number($('.notAssignedTr').children(':nth-child(12)')
			    	      .text().trim().replace(',', ''));
			  }
			  else {
			    deferdValTot += Number($('.notAssignedTr').children(':nth-child(9)')
			    	      .text().trim().replace(',', ''));
			    netSalesAftrDfrdValTot += Number($('.notAssignedTr').children(':nth-child(10)')
			    	      .text().trim().replace(',', ''));
			    onlineSalesTot += Number($('.notAssignedTr').children(':nth-child(11)')
			    	      .text().trim().replace(',', ''));
			  }
	  }
		    transacCount += Number($('.nonTradeTr')
			  	      .children(':nth-child(9)').text().trim().replace(',', ''));

	  	    articleSold += Number($('.nonTradeTr').children(':nth-child(3)')
	  	      .text().trim().replace(',', ''));
	  	    avgArticlePrice += Number($('.nonTradeTr').children(
	  	      ':nth-child(4)').text().trim().replace(',', ''));

	  	    avgTransactionPrice += Number($('.nonTradeTr').children(
	  	      ':nth-child(5)').text().trim().replace(',', ''));

	  	    sales += Number($('.nonTradeTr').children(':nth-child(6)')
	  	      .text().trim().replace(',', ''));

	  	    gstAmt += Number($('.nonTradeTr').children(':nth-child(7)')
	  	      .text().trim().replace(',', ''));

	  	    netSales += Number($('.nonTradeTr').children(':nth-child(8)')
	  	      .text().trim().replace(',', ''));
	  	  if($("#deptSaleTaxBanner").val() == fuelBanners) {
			  litresSoldTot += Number($('.nonTradeTr').children(':nth-child(9)')
		    	      .text().trim().replace(',', ''));
			  deferdValTot += Number($('.nonTradeTr').children(':nth-child(10)')
		    	      .text().trim().replace(',', ''));
		    netSalesAftrDfrdValTot += Number($('.nonTradeTr').children(':nth-child(11)')
		    	      .text().trim().replace(',', ''));
		    onlineSalesTot += Number($('.nonTradeTr').children(':nth-child(12)')
		    	      .text().trim().replace(',', ''));
		  }
		  else {
			    deferdValTot += Number($('.nonTradeTr').children(':nth-child(9)')
			    	      .text().trim().replace(',', ''));
			    netSalesAftrDfrdValTot += Number($('.nonTradeTr').children(':nth-child(10)')
			    	      .text().trim().replace(',', ''));
			    onlineSalesTot += Number($('.nonTradeTr').children(':nth-child(11)')
			    	      .text().trim().replace(',', ''));
		  }
	  	  
	  	 transacCount += Number($('.liquorTr')
		  	      .children(':nth-child(9)').text().trim().replace(',', ''));

 	    articleSold += Number($('.liquorTr').children(':nth-child(3)')
 	      .text().trim().replace(',', ''));
 	    avgArticlePrice += Number($('.liquorTr').children(
 	      ':nth-child(4)').text().trim().replace(',', ''));

 	    avgTransactionPrice += Number($('.liquorTr').children(
 	      ':nth-child(5)').text().trim().replace(',', ''));

 	    sales += Number($('.liquorTr').children(':nth-child(6)')
 	      .text().trim().replace(',', ''));

 	    gstAmt += Number($('.liquorTr').children(':nth-child(7)')
 	      .text().trim().replace(',', ''));

 	    netSales += Number($('.liquorTr').children(':nth-child(8)')
 	      .text().trim().replace(',', ''));
 	  if($("#deptSaleTaxBanner").val() == fuelBanners) {
		  litresSoldTot += Number($('.liquorTr').children(':nth-child(9)')
	    	      .text().trim().replace(',', ''));
		  deferdValTot += Number($('.liquorTr').children(':nth-child(10)')
	    	      .text().trim().replace(',', ''));
	    netSalesAftrDfrdValTot += Number($('.liquorTr').children(':nth-child(11)')
	    	      .text().trim().replace(',', ''));
	    onlineSalesTot += Number($('.liquorTr').children(':nth-child(12)')
	    	      .text().trim().replace(',', ''));
	  }
	  else {
		    deferdValTot += Number($('.liquorTr').children(':nth-child(9)')
		    	      .text().trim().replace(',', ''));
		    netSalesAftrDfrdValTot += Number($('.liquorTr').children(':nth-child(10)')
		    	      .text().trim().replace(',', ''));
		    onlineSalesTot += Number($('.liquorTr').children(':nth-child(11)')
		    	      .text().trim().replace(',', ''));
	  }
	  	  
	  if (articleSold != 0) {
	    avgArticlePriceTotal = Number(netSales).toFixed(2) / Number(articleSold).toFixed(0);
	  }
	  if (transacCount != 0) {
	    avgTransactionPriceTotal = Number(netSales).toFixed(2) / Number(transacCount).toFixed(0);
	  }
	  //$('.transacCountSecond').text(transacCount.toFixed(0));
	  var avgTransprc = (Number($('.transacCountSecond').text().trim().replace(',', ''))==0?"0.00":(netSales / Number($('.transacCountSecond').text().trim().replace(',', ''))).toFixed(2));
	  $('.articleSoldSecond').text(articleSold.toFixed(0));
	  if($("#deptSaleTaxBanner").val() != fuelBanners) {
	  $('.avgArticlePriceSecond').text(avgArticlePriceTotal.toFixed(2));
	  }
	  $('.avgTransactionPriceSecond').text(avgTransprc);
	  $('.salesSecond').text(sales.toFixed(2));
	  $('.gstAmtSecond').text(gstAmt.toFixed(2));
	  $('.netSalesSecond').text(netSales.toFixed(2));
	  if($("#deptSaleTaxBanner").val() == fuelBanners) {
		  $('.deferdValSecond').text(litresSoldTot.toFixed(3));
		  $('.deferliterValSecond').text(deferdValTot.toFixed(2));
		  $('.netSalesAftrDfrdValSecond').text(netSalesAftrDfrdValTot.toFixed(2));
		  $('.onlineSalesSecond').text(onlineSalesTot.toFixed(2));
	  }
	  else {
		  $('.deferdValSecond').text(deferdValTot.toFixed(2));
		  $('.netSalesAftrDfrdValSecond').text(netSalesAftrDfrdValTot.toFixed(2));
		  $('.onlineSalesSecond').text(onlineSalesTot.toFixed(2));
	  }

	}

function sortTotVal() {

  var transacCount = 0;
  var articleSold = 0;
  var avgArticlePrice = 0;
  var avgTransactionPrice = 0;
  var sales = 0;
  var gstAmt = 0;
  var netSales = 0;
  var avgArticlePriceTotal = 0;
  //var avgTransactionPriceTotal = 0;
  var deferdValTot = 0;
  var literSold = 0;
  var netSalesAftrDfrdValTot = 0;
  var onlineSalesTot = 0;
  $('.parentTr')
    .filter(

  function() {

    transacCount += Number($(this)
      .children(':nth-child(9)').text().trim().replace(',', ''));

    articleSold += Number($(this).children(':nth-child(3)')
      .text().trim().replace(',', ''));
    avgArticlePrice += Number($(this).children(
      ':nth-child(4)').text().trim().replace(',', ''));
    avgTransactionPrice += Number($(this).children(
      ':nth-child(5)').text().trim().replace(',', ''));
    sales += Number($(this).children(':nth-child(6)')
      .text().trim().replace(',', ''));
    gstAmt += Number($(this).children(':nth-child(7)')
      .text().trim().replace(',', ''));

    netSales += Number($(this).children(':nth-child(8)')
      .text().trim().replace(',', ''));
    if($("#deptSaleTaxBanner").val() == fuelBanners) {
    	literSold += Number($(this).children(':nth-child(9)')
      	      .text().trim().replace(',', ''));
    	 deferdValTot += Number($(this).children(':nth-child(10)')
         	      .text().trim().replace(',', ''));
         netSalesAftrDfrdValTot += Number($(this).children(':nth-child(11)')
         	      .text().trim().replace(',', ''));
         onlineSalesTot += Number($(this).children(':nth-child(12)')
         	      .text().trim().replace(',', ''));
    }
    else {
        deferdValTot += Number($(this).children(':nth-child(9)')
      	      .text().trim().replace(',', ''));
      netSalesAftrDfrdValTot += Number($(this).children(':nth-child(10)')
      	      .text().trim().replace(',', ''));
      onlineSalesTot += Number($(this).children(':nth-child(11)')
      	      .text().trim().replace(',', ''));
    }

  });
  if(isNotAssigned==true) {
    articleSold += Number($('.notAssignedTr').children(':nth-child(3)')
	  	      .text().trim().replace(',', ''));
	    
	    avgArticlePrice += Number($('.notAssignedTr').children(
	      ':nth-child(4)').text().trim().replace(',', ''));

	    avgTransactionPrice += Number($('.notAssignedTr').children(
	      ':nth-child(5)').text().trim().replace(',', ''));

	    sales += Number($('.notAssignedTr').children(':nth-child(6)')
	  	      .text().trim().replace(',', ''));

	    gstAmt += Number($('.notAssignedTr').children(':nth-child(7)')
	  	      .text().trim().replace(',', ''));

	    netSales += Number($('.notAssignedTr').children(':nth-child(8)')
	  	      .text().trim().replace(',', ''));
	    if($("#deptSaleTaxBanner").val() == fuelBanners) {
	    	literSold += Number($('.notAssignedTr').children(':nth-child(9)')
	      	      .text().trim().replace(',', ''));
	    	 deferdValTot += Number($('.notAssignedTr').children(':nth-child(10)')
		      	      .text().trim().replace(',', ''));
		      netSalesAftrDfrdValTot += Number($('.notAssignedTr').children(':nth-child(11)')
		      	      .text().trim().replace(',', ''));
		      onlineSalesTot += Number($('.notAssignedTr').children(':nth-child(12)')
		      	      .text().trim().replace(',', ''));
	    }
	    else {
	        deferdValTot += Number($('.notAssignedTr').children(':nth-child(9)')
	      	      .text().trim().replace(',', ''));
	      netSalesAftrDfrdValTot += Number($('.notAssignedTr').children(':nth-child(10)')
	      	      .text().trim().replace(',', ''));
	      onlineSalesTot += Number($('.notAssignedTr').children(':nth-child(11)')
	      	      .text().trim().replace(',', ''));
	    }
}
  if (articleSold != 0) {
    avgArticlePriceTotal = Number(netSales).toFixed(2) / Number(articleSold).toFixed(0);
  }
  if (transacCount != 0) {
    avgTransactionPriceTotal = Number(netSales).toFixed(2) / Number(transacCount).toFixed(0);
  }
  $('.articleSold').text(articleSold.toFixed(0));
  if($("#deptSaleTaxBanner").val() != fuelBanners) {
  $('.avgArticlePrice').text(avgArticlePriceTotal.toFixed(2));
  }
  //$('.avgTransactionPrice').text(avgTransactionPriceTotal.toFixed(2));
  $('.sales').text(sales.toFixed(2));
  $('.gstAmt').text(gstAmt.toFixed(2));
  $('.netSales').text(netSales.toFixed(2));
  if($("#deptSaleTaxBanner").val() == fuelBanners) {
	  $('.deferdVal').text(literSold.toFixed(2));
	  
	  $('.deferLiterVal').text(deferdValTot.toFixed(2));
	  $('.netSalesAftrDfrdVal').text(netSalesAftrDfrdValTot.toFixed(2));
	  $('.onlineSalesStoreTot').text(onlineSalesTot.toFixed(2));
  }
  else {
	  $('.deferdVal').text(deferdValTot.toFixed(2));
	  $('.netSalesAftrDfrdVal').text(netSalesAftrDfrdValTot.toFixed(2));
	  $('.onlineSalesStoreTot').text(onlineSalesTot.toFixed(2));
  }

}

function showWarning(text) {
	if($("#deptSaleTaxBanner").val() == fuelBanners) {
		  $('#reportContentFuel').addClass('hideBlock');
}
else {
	  $('#reportContent').addClass('hideBlock');
}
  $('.ContentTableWrapperError').removeClass('hideBlock');
  $('#errorMsg').text(text);
  $("#errorMsgDiv,.tableStart").removeClass('hideBlock');
  $("#errorMsgDiv").addClass('tableTitle nodataMessage');
  $("#errorMsgDiv").removeClass('tableTitle errorDiv');

 /* $('.paginationDiv').hide();*/
}
$( document ).ready(function() {
	bindTableHeaderClickEvent();
	if($("#deptSaleTaxBanner").val() == fuelBanners) {
		bindTableSortEndEvent($("#sortTableFuel"), $("#deptSaleTaxAttr"));
	}
	else {
		bindTableSortEndEvent($("#sortTable"), $("#deptSaleTaxAttr"));
	}
});
function shiftKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable' || tableIdName == 'sortTableFuel') {
		shiftKeyFunction(tableHeaderObj, $("#deptSaleTaxAttr"));
	}
}
function ctrlKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable' || tableIdName == 'sortTableFuel') {
		ctrlKeyFunction($("#deptSaleTaxAttr"));
	}
}
function clickCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable' || tableIdName == 'sortTableFuel') {
		clickFunction(tableHeaderObj, $("#deptSaleTaxAttr"));
	}
}
$(document).ready(function() {
	  if($("#deptSaleTaxBanner").val() == fuelBanners) {
			$('#scrollWindowFuel').css('width','1200px');
			 $('#next-columnFuel').click(function(event) {
					event.preventDefault();
					$('.scrollTableContainer').animate({
						scrollLeft : '+=150'
					}, 'fast');
				});
				$('#previous-columnFuel').click(function(event) {
					event.preventDefault();
					$('.scrollTableContainer').animate({
						scrollLeft : '-=150'
					}, 'fast');
				});
			setScrollerPosition($("#sortTableFuel"), $("#previous-columnFuel"), $("#next-columnFuel"));
			$(window).resize(function() {
				setScrollerPosition($("#sortTableFuel"), $("#previous-columnFuel"), $("#next-columnFuel"));
			});
			$(window).scroll(function() {
				setScrollerPosition($("#sortTableFuel"), $("#previous-columnFuel"), $("#next-columnFuel"));
			});
	  }
	  else {
			$('#scrollWindow').css('width','1300px');
			 $('#next-column').click(function(event) {
					event.preventDefault();
					$('.scrollTableContainer').animate({
						scrollLeft : '+=150'
					}, 'fast');
				});
				$('#previous-column').click(function(event) {
					event.preventDefault();
					$('.scrollTableContainer').animate({
						scrollLeft : '-=150'
					}, 'fast');
				});
			setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
			$(window).resize(function() {
				setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
			});
			$(window).scroll(function() {
				setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
			});
	  }
});
