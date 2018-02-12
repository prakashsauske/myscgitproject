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
<ul class="tabUl">
	<li class="tabLi"><a href="#tabs-1"
		style="padding-right: 40px; margin-left: 0px; padding-left: 40px;">Stock
			On Hand</a></li>
	<li class="tabLi"><a href="#tabs-2"
		style="padding-right: 40px; margin-left: 0px; padding-left: 40px;">Stock
			In Transit</a></li>
	<li class="tabLi"><a href="#tabs-3"
		style="padding-right: 40px; margin-left: 0px; padding-left: 40px;">Stock
			On Order</a></li>
</ul>
<div id="tabs-1">
	<div id="SOHDiv" class="tabtableDiv ">
		<div class="quantityDetails" style="width: 100%;">
			<table id="tab1table" border="0" class="GlobalTradeTable"
				style="font-size: 13px;">
				<tr id="tableHeading" style="font-size: 15px;">
					<td class="padding10" width="216" style="white-space: normal;">Stock
						On Hand</td>
					<td width="216" style="white-space: normal;">Stock in Quality
						Inspection</td>
					<td width="216" style="white-space: normal;">Total Stock of
						All Restricted Batches</td>
					<td width="216" style="white-space: normal;">Stock in transfer</td>
					<td width="216" style="white-space: normal;">Blocked Stock</td>
					<td width="216" style="white-space: normal;">Blocked Stock
						Returns</td>
				</tr>
				<tr class="tableTdHeight">
					<td class="padding10">${inventorySOHInfo[0].stockOnHand}
						${inventorySOHInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySOHInfo[0].stockinQualityInspection}
						${inventorySOHInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySOHInfo[0].totalStockofAllRestBatches}
						${inventorySOHInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySOHInfo[0].stockinTransfer}
						${inventorySOHInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySOHInfo[0].blockedStock}
						${inventorySOHInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySOHInfo[0].blockedStockReturns}
						${inventorySOHInfo[0].baseUnitofMeasure}</td>
				</tr>
				<tr class="tableTdHeight">
					<td colspan="6" class="padding10"><c:if
							test="${not empty inventorySOHInfo[0].stockOnHand}">
							<a id="sohLnk" href="stockAdjustFromArticleDetail.htm">Stock
								Adjustment</a>
						</c:if></td>
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
					<td class="padding10" width="216" style="white-space: normal;">Stock
						in Transfer (Store to Store)</td>
					<td width="216" style="white-space: normal;">Stock in Transit</td>
					<td width="216" style="white-space: normal;">Tied Empties
						Stock</td>
					<td width="216" style="white-space: normal;">Valuated Goods
						Receipt Blocked Stock</td>
				</tr>
				<tr class="tableTdHeight">
					<td class="padding10">${inventorySITInfo[0].stockinTransfer}</td>
					<td>${inventorySITInfo[0].stockinTransit}
						${inventorySITInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySITInfo[0].tiedEmptiesStock}
						${inventorySITInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySITInfo[0].valuatedGoodsReceiptBlockedStock}</td>
				</tr>
			</table>
		</div>
	</div>
</div>
<div id="tabs-3">
	<div id="SOODiv" class="tabtableDiv">
		<div class="quantityDetails" style="width: 100%;">
			<table id="tab1table" border="0" class="GlobalTradeTable"
				style="font-size: 13px;">
				<tr id="tableHeading" style="font-size: 15px;">

					<td class="padding10" width="216" style="white-space: normal;">Stock
						On Order</td>
					<td width="216" style="white-space: normal;">On-Order Stock
						Quantity for Consignment</td>
					<td width="216" style="white-space: normal;">GR Blocked Stock</td>
					<td width="216" style="white-space: normal;">Release Quantity
						from Stock Transport Orders</td>
					<td width="216" style="white-space: normal;">Transit Stock for
						Cross-Company Code Stock Transfer</td>
				</tr>
				<tr class="tableTdHeight">
					<td class="padding10">${inventorySOOInfo[0].stockOnOrder}
						${inventorySOOInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySOOInfo[0].onOrderConsign}
						${inventorySOOInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySOOInfo[0].grBlockedStock}
						${inventorySOOInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySOOInfo[0].transportOrders}
						${inventorySOOInfo[0].baseUnitofMeasure}</td>
					<td>${inventorySOOInfo[0].transitCrossCompany}
						${inventorySOOInfo[0].baseUnitofMeasure}</td>

				</tr>
			</table>
		</div>
	</div>
</div>