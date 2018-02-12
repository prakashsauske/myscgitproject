
function changeDeliveryDate() {
	$('#dialog-date-roster').dialog('close');
	$('.roster-date').val($('#' + tempId).val());
	$('.roster-date').parent().prev().text($('#' + tempId).val());
	var fromDate = $('#' + tempId).val();
	var date1 = new Date();
	var parts = fromDate.split('/');
	date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
	date1.setTime(date1.getTime()+86400000);
	var newDate = date1.getDate();
	var newMonth = date1.getMonth() + 1;
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	var delDate = (newDate + "/" + (newMonth) + "/" + date1.getFullYear());
	$('.delivery-date').val(delDate);
	$('.delivery-date').parent().prev().text(delDate);
}
function checkDeliveryDate() {
$('#dialog-date-delivery').dialog('close');
$('.delivery-date').val($('#'+tempId).val());
$('.delivery-date').parent().prev().text($('#'+tempId).val());
var fromDate = $('.roster-date').val();
var toDate = $('.delivery-date').val();
var date1 = new Date();
var date2 = new Date();
var parts = fromDate.split('/');
date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
var partsTwo = toDate.split('/');
date2.setFullYear(partsTwo[2], partsTwo[1] - 1, partsTwo[0]);
if(date1.getTime()>date2.getTime()){
	$('#dialog-date-error').dialog('open');
	$('.delivery-date').val(tempDate);
	$('.delivery-date').parent().prev().text(tempDate);
}
}
				