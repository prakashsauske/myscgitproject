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
<form:form id="form" commandName="param">
	<c:forEach items="${articleCustomNutritionalResult}"
		var="custNutritionalInfo">
		<table class="dataContent" style="width: 50%">
			<tr class="dataRow">
				<td class="dataField">Material (Article) Number</td>
				<td class="dataField">Effective date</td>
				<td class="dataField">NIP Initial Status</td>
				<td class="dataField">Approval Status</td>
				<td class="dataField">Odour Indicator</td>

			</tr>

			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.matnr}</td>
				<td class="subDataField">${custNutritionalInfo.zzEffectiveDate}</td>
				<td class="subDataField">${custNutritionalInfo.zznipInitStat}</td>
				<td class="subDataField">${custNutritionalInfo.zzApprovalStat}</td>
				<td class="subDataField">${custNutritionalInfo.zzOdourInd}</td>

			</tr>
			<tr class="dataRow">
				<td class="dataField">Hazardous Goods</td>
				<td class="dataField">Hazard Unit Code</td>
				<td class="dataField">Hazard Unit Volume</td>
				<td class="dataField">Hazard Class</td>
				<td class="dataField">Hazard Subsidiary Code</td>
			</tr>

			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzHazardGoods}</td>
				<td class="subDataField">${custNutritionalInfo.zzHazUnitCode}</td>
				<td class="subDataField">${custNutritionalInfo.zzHazUnitVol}</td>
				<td class="subDataField">${custNutritionalInfo.zzHazardClass}</td>
				<td class="subDataField">${custNutritionalInfo.zzHazSubsidCde}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Ethylene Indicator</td>
				<td class="dataField">Wraps Quantity</td>
				<td class="dataField">Tray ID</td>
				<td class="dataField">Soaker Quantity</td>
				<td class="dataField">Hazard Packing Group</td>

			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzEthyleneInd}</td>
				<td class="subDataField">${custNutritionalInfo.zzWrapsQty}</td>
				<td class="subDataField">${custNutritionalInfo.zzTrayId}</td>
				<td class="subDataField">${custNutritionalInfo.zzSoakerQty}</td>
				<td class="subDataField">${custNutritionalInfo.zzHazPackGroup}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Label Format ID</td>
				<td class="dataField">Label Description 1</td>
				<td class="dataField">Label Description 2</td>
				<td class="dataField">Print Packed Date</td>
				<td class="dataField">Print Packed Time</td>

			</tr>

			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzLabelFormId}</td>
				<td class="subDataField">${custNutritionalInfo.zzLabelDesc1}</td>
				<td class="subDataField">${custNutritionalInfo.zzLabelDesc2}</td>
				<td class="subDataField">${custNutritionalInfo.zzPrntPackDat}</td>
				<td class="subDataField">${custNutritionalInfo.zzPrntPackTim}</td>


			</tr>
			<tr class="dataRow">
				<td class="dataField">Scale Article Indicator</td>
				<td class="dataField">Mandatory warning on label</td>
				<td class="dataField">Storage requirements on label</td>
				<td class="dataField">Nutritional claim</td>
				<td class="dataField">Country of origin</td>

			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzScaleArticle}</td>
				<td class="subDataField">${custNutritionalInfo.zzMandWarning}</td>
				<td class="subDataField">${custNutritionalInfo.zzStrgReqmnt}</td>
				<td class="subDataField">${custNutritionalInfo.zzNutritionClm}</td>
				<td class="subDataField">${custNutritionalInfo.zzCountryOrign}</td>

			</tr>
			<tr class="dataRow">
				<td class="dataField">Perpetual inventory UOM</td>
				<td class="dataField">Tray ID</td>
				<td class="dataField">Tare Code</td>
				<td class="dataField">Servings per Pack / KG</td>
				<td class="dataField">Serving Size</td>

			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzPiUom}</td>
				<td class="subDataField">${custNutritionalInfo.zzTrayId}</td>
				<td class="subDataField">${custNutritionalInfo.zzTareCode}</td>
				<td class="subDataField">${custNutritionalInfo.zzSrvPerPack}</td>
				<td class="subDataField">${custNutritionalInfo.zzSrvSize}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Serving Size UOM</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzTrayId}</td>
			</tr>
			<tr>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 1</td>
				<td class="dataField">Quantity per Serve 1</td>
				<td class="dataField">Per Serving UOM 1</td>
				<td class="dataField">Quantity per 100 1</td>
				<td class="dataField">UOM of Quantity per 100 1</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient01}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty01}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom01}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty01}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom01}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 2</td>
				<td class="dataField">Quantity per Serve 2</td>
				<td class="dataField">Per Serving UOM 2</td>
				<td class="dataField">Quantity per 100 2</td>
				<td class="dataField">UOM of Quantity per 100 2</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient02}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty02}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom02}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty02}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom02}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 3</td>
				<td class="dataField">Quantity per Serve 3</td>
				<td class="dataField">Per Serving UOM 3</td>
				<td class="dataField">Quantity per 100 3</td>
				<td class="dataField">UOM of Quantity per 100 3</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient03}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty03}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom03}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty03}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom03}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 4</td>
				<td class="dataField">Quantity per Serve 4</td>
				<td class="dataField">Per Serving UOM 4</td>
				<td class="dataField">Quantity per 100 4</td>
				<td class="dataField">UOM of Quantity per 100 4</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient04}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty04}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom04}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty04}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom04}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 5</td>
				<td class="dataField">Quantity per Serve 5</td>
				<td class="dataField">Per Serving UOM 5</td>
				<td class="dataField">Quantity per 100 5</td>
				<td class="dataField">UOM of Quantity per 100 5</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient05}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty05}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom05}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty05}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom05}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 6</td>
				<td class="dataField">Quantity per Serve 6</td>
				<td class="dataField">Per Serving UOM 6</td>
				<td class="dataField">Quantity per 100 6</td>
				<td class="dataField">UOM of Quantity per 100 6</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient06}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty06}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom06}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty06}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom06}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 7</td>
				<td class="dataField">Quantity per Serve 7</td>
				<td class="dataField">Per Serving UOM 7</td>
				<td class="dataField">Quantity per 100 7</td>
				<td class="dataField">UOM of Quantity per 100 7</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient07}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty07}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom07}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty07}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom07}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 8</td>
				<td class="dataField">Quantity per Serve 8</td>
				<td class="dataField">Per Serving UOM 8</td>
				<td class="dataField">Quantity per 100 8</td>
				<td class="dataField">UOM of Quantity per 100 8</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient08}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty08}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom08}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty08}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom08}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 9</td>
				<td class="dataField">Quantity per Serve 9</td>
				<td class="dataField">Per Serving UOM 9</td>
				<td class="dataField">Quantity per 100 9</td>
				<td class="dataField">UOM of Quantity per 100 9</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient09}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty09}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom09}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty09}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom09}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 10</td>
				<td class="dataField">Quantity per Serve 10</td>
				<td class="dataField">Per Serving UOM 10</td>
				<td class="dataField">Quantity per 100 10</td>
				<td class="dataField">UOM of Quantity per 100 10</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient10}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty10}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom10}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty10}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom10}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 11</td>
				<td class="dataField">Quantity per Serve 11</td>
				<td class="dataField">Per Serving UOM 11</td>
				<td class="dataField">Quantity per 100 11</td>
				<td class="dataField">UOM of Quantity per 100 11</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient11}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty11}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom11}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty11}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom11}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 12</td>
				<td class="dataField">Quantity per Serve 12</td>
				<td class="dataField">Per Serving UOM 12</td>
				<td class="dataField">Quantity per 100 12</td>
				<td class="dataField">UOM of Quantity per 100 12</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient12}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty12}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom12}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty12}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom12}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 13</td>
				<td class="dataField">Quantity per Serve 13</td>
				<td class="dataField">Per Serving UOM 13</td>
				<td class="dataField">Quantity per 100 13</td>
				<td class="dataField">UOM of Quantity per 100 13</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient13}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty13}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom13}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty13}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom13}</td>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Nutrient ID 14</td>
				<td class="dataField">Quantity per Serve 14</td>
				<td class="dataField">Per Serving UOM 14</td>
				<td class="dataField">Quantity per 100 14</td>
				<td class="dataField">UOM of Quantity per 100 14</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzNutrient14}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeQty14}</td>
				<td class="subDataField">${custNutritionalInfo.zzServeUom14}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Qty14}</td>
				<td class="subDataField">${custNutritionalInfo.zzPer100Uom14}</td>
			</tr>
			<tr>
			</tr>
			<tr class="dataRow">
				<td class="dataField">Product Ingredient Note 1</td>
				<td class="dataField">Product Ingredient Note 2</td>
				<td class="dataField">Product Ingredient Note 3</td>
				<td class="dataField">Product Ingredient Note 4</td>
				<td class="dataField">Product Ingredient Note 5</td>

			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd01}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd02}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd03}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd04}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd05}</td>

			</tr>
			<tr class="dataRow">
				<td class="dataField">Product Ingredient Note 6</td>
				<td class="dataField">Product Ingredient Note 7</td>
				<td class="dataField">Product Ingredient Note 8</td>
				<td class="dataField">Product Ingredient Note 9</td>
				<td class="dataField">Product Ingredient Note 10</td>


			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd06}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd07}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd08}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd09}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd10}</td>


			</tr>
			<tr class="dataRow">
				<td class="dataField">Product Ingredient Note 11</td>
				<td class="dataField">Product Ingredient Note 12</td>
				<td class="dataField">Product Ingredient Note 13</td>
				<td class="dataField">Product Ingredient Note 14</td>
				<td class="dataField">Product Ingredient Note 15</td>


			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd11}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd12}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd13}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd14}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd15}</td>


			</tr>
			<tr class="dataRow">
				<td class="dataField">Product Ingredient Note 16</td>
				<td class="dataField">Product Ingredient Note 17</td>
				<td class="dataField">Product Ingredient Note 18</td>
			</tr>
			<tr class="dataRow">
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd16}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd17}</td>
				<td class="subDataField">${custNutritionalInfo.zzProdIngrd18}</td>
			</tr>
		</table>
	</c:forEach>

</form:form>