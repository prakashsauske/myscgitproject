<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div id="itemInfo">
	<ul>
		<li><a href="#itemInfo-1">Fresh Food</a></li>
		<li><a href="#itemInfo-2">Nutritional / Ingredients</a></li>
		<li><a href="#itemInfo-3">Customer Product Notes</a></li>
		<li><a href="#itemInfo-4">Tasting Notes</a></li>
		<li><a href="#itemInfo-6">Limit Details</a></li>
		<li class="posInfo"><a href="#itemInfo-7">POS Information</a></li>
	</ul>
	<div id="itemInfo-1">
		<div class="ContentTableWrapper">
			<table class="ContentTable" cellspacing="0">
				<tr>
					<td>Label Description:</td>
					<td class="lastColumn" colspan="5">${custNutritionalInfo.zzLabelDesc1}
						${custNutritionalInfo.zzLabelDesc2}</td>
				</tr>
				<tr>
					<td width="20%">Best Before Days:</td>
					<td width="13%" class="valueInfo">${freshFoodLabel.bestBeforeDays}</td>
					<td width="20%">Use By Days:</td>
					<td width="13%" class="valueInfo">${freshFoodLabel.useByDays}</td>
					<td width="20%"></td>
					<td width="13%" class="lastColumn valueInfo"></td>
				</tr>

				<tr>
					<td width="20%">Fresh Food Item Flag:</td>
					<td width="13%" class="valueInfo">${freshFoodLabel1.fresh_food_item_flag}</td>
					<td width="20%">Counter Weighed Flag:</td>
					<td width="13%" class="valueInfo">${custNutritionalInfo.zzScaleArticle}</td>
					<td width="20%">Mandatory Warning:</td>
					<td width="13%" class="lastColumn valueInfo">${custNutritionalInfo.zzMandWarning}</td>
				</tr>
				<tr>
					<td>Shelf Life:</td>
					<td class="valueInfo">${articleSearchResutls.shelfLife}
						${articleSearchResutls.shlPeriod}</td>
					<td>Tray No.:</td>
					<td class="valueInfo">${custNutritionalInfo.zzTrayId}</td>
					<td>Storage & Handling:</td>
					<td class="lastColumn valueInfo">${freshFoodLabel.storageRequirements}</td>
				</tr>
				<tr class="lastRow">
					<td>Tare (G):</td>
					<td class="valueInfo">${custNutritionalInfo.zzTareCode}</td>
					<td>Wrap Tare (G):</td>
					<td class="valueInfo">${custNutritionalInfo.wrapTare}</td>
					<td>Label Format:</td>
					<td class="lastColumn valueInfo"><c:if
							test="${not empty freshFoodLabel.labelFormatId}"> ${freshFoodLabel.labelFormatId} - </c:if>
						${freshFoodLabel.formateDesc}</td>

				</tr>
			</table>
		</div>
		<!-- End of content table wrapper -->

	</div>
	<div id="itemInfo-2">
		<div class="ContentTableWrapper">
			<table class="ContentTable" cellspacing="0">
				<tr>
					<td width="20%">NIP Notification Method:</td>
					<td width="13%" class="valueInfo">${custNutritionalInfo.zznipInitStat}</td>
					<td width="20%">Nutritional Claim:</td>
					<td width="13%" class="valueInfo">${custNutritionalInfo.zzNutritionClm}</td>
					<td width="20%">Approval Status:</td>
					<td width="13%" class="lastColumn valueInfo">${custNutritionalInfo.zzApprovalStat}</td>
				</tr>
				<tr>
					<td>Health Nutrition Info:</td>
					<td class="valueInfo"></td>
					<td>Servings Per Pack Size:</td>
					<td class="valueInfo">${custNutritionalInfo.zzSrvPerPack}</td>
					<td>Serving Size:</td>
					<td class="lastColumn valueInfo">${custNutritionalInfo.zzSrvSize}
						${custNutritionalInfo.zzSrvSizeUom}</td>
				</tr>

				<tr class="lastRow">
					<td>Ingredients:</td>
					<td colspan="5" class="lastColumn"><c:if
							test="${not empty custNutritionalInfo.zzProdIngrd01}"> ${custNutritionalInfo.zzProdIngrd01} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd02}"> ${custNutritionalInfo.zzProdIngrd02} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd03}"> ${custNutritionalInfo.zzProdIngrd03} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd04}"> ${custNutritionalInfo.zzProdIngrd04} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd05}"> ${custNutritionalInfo.zzProdIngrd05} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd06}"> ${custNutritionalInfo.zzProdIngrd06} ,</c:if>

						<c:if test="${not empty custNutritionalInfo.zzProdIngrd07}"> ${custNutritionalInfo.zzProdIngrd07} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd08}"> ${custNutritionalInfo.zzProdIngrd08} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd09}"> ${custNutritionalInfo.zzProdIngrd09} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd10}"> ${custNutritionalInfo.zzProdIngrd10} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd11}"> ${custNutritionalInfo.zzProdIngrd11} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd12}"> ${custNutritionalInfo.zzProdIngrd12} ,</c:if>


						<c:if test="${not empty custNutritionalInfo.zzProdIngrd13}"> ${custNutritionalInfo.zzProdIngrd13} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd14}"> ${custNutritionalInfo.zzProdIngrd14} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd15}"> ${custNutritionalInfo.zzProdIngrd15} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd16}"> ${custNutritionalInfo.zzProdIngrd16} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd17}"> ${custNutritionalInfo.zzProdIngrd17} ,</c:if>
						<c:if test="${not empty custNutritionalInfo.zzProdIngrd18}"> ${custNutritionalInfo.zzProdIngrd18} </c:if>
					</td>
				</tr>
			</table>

			<div class="tableInfo">
				<div class="tableTitle">
					<h4 class="sectionTitle">Nutritional Value</h4>
				</div>
				<!-- End of table title -->
			</div>
			<!-- End of table info -->

			<table class="ContentTable" cellspacing="0">
				<tr>
					<th>Nutrition</th>
					<th colspan="2" class="centerValue">Serving Qty.
					</td>
					<th colspan="2" class="centerValue lastColumn">Per 100 Qty.
					</td>
				</tr>
				<c:if test="${not empty custNutritionalInfo.zzNutrient01}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient01}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty01}</td>
						<td class="">${custNutritionalInfo.zzServeUom01}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty01}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom01}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient02}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient02}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty02}</td>
						<td class="">${custNutritionalInfo.zzServeUom02}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty02}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom02}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient03}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient03}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty03}</td>
						<td class="">${custNutritionalInfo.zzServeUom03}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty03}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom03}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient04}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient04}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty04}</td>
						<td class="">${custNutritionalInfo.zzServeUom04}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty04}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom04}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient05}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient05}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty05}</td>
						<td class="">${custNutritionalInfo.zzServeUom05}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty05}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom05}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient06}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient06}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty06}</td>
						<td class="">${custNutritionalInfo.zzServeUom06}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty06}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom06}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient07}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient07}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty07}</td>
						<td class="">${custNutritionalInfo.zzServeUom07}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty07}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom07}
						</td>
					</tr>
				</c:if>

				<c:if test="${not empty custNutritionalInfo.zzNutrient08}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient08}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty08}</td>
						<td class="">${custNutritionalInfo.zzServeUom08}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty08}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom08}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient09}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient09}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty09}</td>
						<td class="">${custNutritionalInfo.zzServeUom09}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty09}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom09}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient10}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient10}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty10}</td>
						<td class="">${custNutritionalInfo.zzServeUom10}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty10}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom10}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient11}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient11}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty11}</td>
						<td class="">${custNutritionalInfo.zzServeUom11}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty11}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom11}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient12}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient12}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty12}</td>
						<td class="">${custNutritionalInfo.zzServeUom12}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty12}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom12}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient13}">
					<tr>
						<td>${custNutritionalInfo.zzNutrient13}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty13}</td>
						<td class="">${custNutritionalInfo.zzServeUom13}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty13}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom13}
						</td>
					</tr>
				</c:if>
				<c:if test="${not empty custNutritionalInfo.zzNutrient14}">
					<tr class="lastRow">
						<td>${custNutritionalInfo.zzNutrient14}</td>
						<td class="numberColumn valueInfo">
							${custNutritionalInfo.zzServeQty14}</td>
						<td class="">${custNutritionalInfo.zzServeUom14}</td>
						<td class="numberColumn valueInfo">${custNutritionalInfo.zzPer100Qty14}
						</td>
						<td class="lastColumn ">${custNutritionalInfo.zzPer100Uom14}
						</td>
					</tr>
				</c:if>


			</table>
		</div>
		<!-- End of content table wrapper -->
	</div>
	<div id="itemInfo-3">
		<div class="ContentTableWrapper">
			<%-- <table class="ContentTable" cellspacing="0">
				<c:forEach items="${productNotesList}" var="productNotesList">
					<tr>
						<td class="lastColumn">Notes 1 : ${productNotesList.productNote1}</td>
					</tr>
					<tr>
						<td class="lastColumn">Notes 2 : ${productNotesList.productNote2}</td>
					</tr>
					<tr class="lastRow">
						<td class="lastColumn">Notes 3 : ${productNotesList.productNote2}</td>
					</tr>
				</c:forEach>
			</table> --%>
			<table class="ContentTable" cellspacing="0">
				<tbody>
					<c:forEach items="${productNotesList}" var="productNotesList">
						<tr>
							<td width="20%">Customer Product Notes:</td>
							<td class="lastColumn">${productNotesList.productNote1}
								${productNotesList.productNote2}
								${productNotesList.productNote3}.</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		<!-- End of content table wrapper -->
	</div>
	<div id="itemInfo-4">
		<div class="ContentTableWrapper">
			<%-- <table class="ContentTable" cellspacing="0">
				<c:forEach items="${productNotesList}" var="productNotesList">
					<tr>
						<td class="lastColumn">Tasting Notes 1 : ${productNotesList.tastingNote1}</td>
					</tr>
					<tr>
						<td class="lastColumn">Tasting Notes 2 : ${productNotesList.tastingNote2}</td>
					</tr>
					<tr>
						<td class="lastColumn">Tasting Notes 3 : ${productNotesList.tastingNote3}</td>
					</tr>
					<tr>
						<td class="lastColumn">Tasting Notes 4 : ${productNotesList.tastingNote4}</td>
					</tr>
					<tr class="lastRow">
						<td class="lastColumn">Tasting Notes 5 : ${productNotesList.tastingNote5}</td>
					</tr>
				</c:forEach>
			</table> --%>
			<table class="ContentTable" cellspacing="0">
				<tbody>
					<c:forEach items="${productNotesList}" var="productNotesList">
						<tr>
							<td width="20%">Tasting Notes:</td>
							<td class="lastColumn">${productNotesList.tastingNote1}
								${productNotesList.tastingNote2}
								${productNotesList.tastingNote3}
								${productNotesList.tastingNote4}
								${productNotesList.tastingNote5}.</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		<!-- End of content table wrapper -->
	</div>
	<div id="itemInfo-6">
		<div class="ContentTableWrapper">
			<table class="ContentTable" cellspacing="0">
				<tr>
					<td width="20%">Min Value:</td>
					<td width="13%" class="valueInfo">${articleSearchResutls.minValue}</td>
					<td width="20%">Max Value:</td>
					<td width="13%" class="valueInfo">${articleSearchResutls.maxValue}</td>
					<td width="20%">Expiry Period:</td>
					<td width="13%" class="lastColumn valueInfo">${articleSearchResutls.expiryPeriod}</td>
				</tr>
				<tr class="lastRow">
					<td>Expiry Type:</td>
					<td class="valueInfo">${articleSearchResutls.expiryPeriodType}</td>
					<td colspan="4">&nbsp;</td>
				</tr>
			</table>
		</div>
		<!-- End of content table wrapper -->
	</div>
	<div id="itemInfo-7">
		<div class="ContentTableWrapper">
			<table class="ContentTable" cellspacing="0">
				<tr>
					<td><label class="pos-pd">Prohibit Discount</label></td>
					<td colspan="3" class="lastColumn"><label class="pos-ppo">Prohibit
							Price Override</label></td>
				</tr>
				<tr>
					<td><label class="pos-iqr">Inhibit QTY Repeat</label></td>
					<td colspan="3" class="lastColumn"><label class="pos-fq">Force
							QTY</label></td>
				</tr>
				<tr>
					<td><label class="pos-mp">Manual Price</label></td>
					<td colspan="3" class="lastColumn"><label class="pos-df">Default
							Price</label></td>
				</tr>
				<tr>
					<td width="25%"><label class="pos-pw">POS Weighed</label></td>
					<td width="25%"><c:if
							test="${articleSearchResutls.forSaleFlag=='N'}">
							<label class="positiveFlag">Sale Prohibited</label>
						</c:if> <c:if test="${articleSearchResutls.forSaleFlag=='Y'}">
							<label class="negativeFlag">Sale Prohibited</label>
						</c:if></td>
					<td width="25%"><c:if
							test="${articleSearchResutls.checkAgeProof!='X'}">
							<label class="negativeFlag">Proof of Age</label>
						</c:if> <c:if test="${articleSearchResutls.checkAgeProof=='X'}">
							<label class="positiveFlag">Proof of Age</label>
						</c:if></td>
					<td width="25%" class="lastColumn"><label class="pos-fs">Food
							Stamp</label></td>
				</tr>

				<tr>
					<td><c:if test="${articleSearchResutls.salesSetFlag=='N'}">
							<label class="negativeFlag">Sales Set Flag </label>
						</c:if> <c:if test="${articleSearchResutls.salesSetFlag=='Y'}">
							<label class="positiveFlag">Sales Set Flag </label>
						</c:if></td>
					<td><c:if
							test="${articleSearchResutls.easInd=='N' ||articleSearchResutls.easInd==''}">
							<label class="negativeFlag">Security Item</label>
						</c:if> <c:if
							test="${articleSearchResutls.easInd=='Y' || articleSearchResutls.easInd=='S'}">
							<label class="positiveFlag">Security Item</label>
						</c:if></td>

					<td colspan="2" class="lastColumn"><label></label></td>


				</tr>


				<tr class="lastRow">
					<td colspan="4" class="lastColumn">POS Tare Weight (G): <strong
						class="pos-ptw"></strong>
					</td>
				</tr>
			</table>
		</div>
		<!-- End of content table wrapper -->
	</div>


</div>

<script type="text/javascript">
							$(function() {
								$("#itemInfo").tabs();
								document.forms[0].autocomplete="off";
							});
						</script>