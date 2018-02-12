<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript">
/* Autocomplete Off */
 
$(document).ready(function(){
	document.forms[0].autocomplete="off";
 });

</script>
<div>
	<ul class="tabUl">
		<li class="tabLi"><a href="#tabs-1"
			style="padding-right: 40px; margin-left: 0px; padding-left: 40px;">Delivery</a></li>
		<li class="tabLi"><a href="#tabs-2"
			style="padding-right: 40px; margin-left: 0px; padding-left: 40px;">Replenishment</a></li>

	</ul>
	<div id="tabs-1">
		<div id="SOHDiv" class="tabtableDiv ">
			<div class="quantityDetails" style="width: 100%;">
				<table id="tab1table" border="0" class="GlobalTradeTable"
					style="font-size: 13px;">
					<tr class="tableHeading" style="font-size: 15px;">
						<td class="padding10" width="216" style="white-space: normal;">Last
							Delivery Date</td>
						<td width="216" style="white-space: normal;">Last Ordered
							Quantity</td>
						<td width="216" style="white-space: normal;">Last Received
							Quantity</td>
						<td width="216" style="white-space: normal;">Next Delivery
							Date</td>
						<td width="216" style="white-space: normal;">Next Ordered
							Quantity</td>

					</tr>
					<tr class="tableTdHeight">
						<td class="tdmdstyl">${articleSearchResutls.lastDelDate}</td>
						<td class="tdmdstyl">${articleSearchResutls.lastOrdQty}</td>
						<td class="tdmdstyl">${articleSearchResutls.lastRcvQty}</td>
						<td class="tdmdstyl">${articleSearchResutls.nextDelDate}</td>
						<td class="tdmdstyl">${articleSearchResutls.nextOrdQty}</td>
					</tr>

				</table>
			</div>
		</div>
	</div>
	<div id="tabs-2">
		<div id="SITDiv" class="tabtableDiv" style="width: 100%">
			<div class="quantityDetails" style="width: 102%">
				<table id="tab1table" border="0" class="GlobalTradeTable">
					<tr id="tableHeading" style="font-size: 15px;">
						<td class="padding10" width="216" style="white-space: normal;">Current
							MPL</td>
						<td width="216" style="white-space: normal;">Default MPL</td>
						<td width="216" style="white-space: normal;">Shelf Capacity</td>
						<td width="216" style="white-space: normal;">SUGO Open Order
							Quantity</td>
						<td width="216" style="white-space: normal;">Manual Open
							Order Quantity</td>
					</tr>
					<tr class="tableTdHeight">
						<td class="padding10">${articleSearchResutls.curMPL}</td>
						<td>${articleSearchResutls.defMPL}</td>
						<td>${articleSearchResutls.shelfCapacity}</td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>