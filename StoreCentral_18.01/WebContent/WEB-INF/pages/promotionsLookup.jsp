<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="formWrapper" data-jwizard-title="Step 1: Select Criteria">
	<p>&nbsp;</p>

	<div class="parameter">
	<input type="hidden" id="cmpDisplayQtyPer" value="${model.restrictionParam.cmpDisplayQtyPer}">
	<input type="hidden" id="cmpBuildQuantity" value="${model.restrictionParam.cmpBuildQuantity}">
	<input type="hidden" id="cmpStoreDemand" value="${model.restrictionParam.cmpStoreDemand}">
	<input type="hidden" id="cmpBuildQuantityPer" value="${model.restrictionParam.cmpBuildQuantityPer}">
	<input type="hidden" id="cmpDisplayQty" value="${model.restrictionParam.cmpDisplayQty}">
	
		<label for="department" class="" title="${properties.PromotionsFor}">Promotions
			For</label> <select class="selectOptions" id="promotionWeek"
			name="promotionWeek">
			<option value="Select">Select Promotional Week</option>
			<%-- <option value="0" title="${properties.CurrentWeek}">Current
				Week</option>
			<option value="1" title="${properties.NextWeek}">Next Week</option>
			<option value="2" title="${properties.TwoWeeksOut}">Two
				Weeks Out</option>
			<option value="3" title="${properties.ThreeWeeksOut}">Three
				Weeks Out</option> --%>
			<c:forEach items="${promotionWeekDropdownList}" var="weeks">
				<option value="${weeks.weekCode}" title="${weeks.title}">${weeks.weekDesc}</option>
			</c:forEach>
		</select>
	</div>
	<!-- End of parameter -->


	<div class="parameter clearfix">
		<label for="department" title="${properties.Department}">Department</label>
		<select class="selectOptions" id="departmentInPromotions" name="department">
			<option value="Select">Select Department</option>
			<c:forEach items="${model.deptInfoList}" var="deptInfo">
				<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
			</c:forEach>

		</select>
		<div class="searchByOptions onlyCheckbox">
			<input type="checkbox" name="depH" value="depH" id="depH"><label
				for="depH" class="labelText">Select Sub-Category from
				Hierarchy</label>
		</div>
		<!-- End of search options -->


	</div>
	<!-- End of parameter -->


	<input type="hidden" class="hierarchyname" id="hierarchyname" value="" />
	<div class="hierarchyWrapper clearfix hideBlock" id="articleHierarchy">

		<div class="hierarchyContent" id="deptDiv">

			<div class="hierarchyTitle">
				<h3>Department</h3>
			</div>
			<!-- End of hierarchy Title -->

			<div class="hierarchyList">

				<ul id="deptlst">
					<c:if test="${not empty model.deptInfoList}">
						<%
							int j = 1;
						%>
						<c:forEach items="${model.deptInfoList}" var="deptInfo">

							<input type="hidden" id="child<%=j%>"
								value="${deptInfo.childExists}">
							<c:if test="${deptInfo.level=='1'}">


								<li><input class="department" type="radio"
									name="departmentList" value="${deptInfo.node}"
									data-tt-id="<%=j%>" id="${deptInfo.node}"> <label
									for="${deptInfo.node}" class="labelText">${deptInfo.nodeDesc}</label></li>



							</c:if>
							<%
								j++;
							%>
						</c:forEach>

					</c:if>
				</ul>
			</div>
			<!-- End of hierarchy Title -->
			<div class="heirachyBottom">
				<span class="totalCount"> <label>Total:<strong
						id="deptLstCnt"></strong></label>
				</span>

			</div>
			<!-- End of hierarchy bottom -->

		</div>
		<!-- End of hierarchy Content -->


		<!-- Category -->
		<div class="hierarchyContent" id="catDiv">

			<div class="hierarchyTitle">
				<h3>Category</h3>
			</div>
			<!-- End of hierarchy Title -->

			<div class="hierarchyList">

				<div class="noSelection" id="noSelectionCat">
					<label>Please select any department to see it's associated
						categories.</label>
				</div>
				<!-- End of no selection -->

				<label class="loading hideBlock">&nbsp;</label>

				<ul id="categoryLst" class="hideBlock">
					<li class="category"></li>
				</ul>
			</div>
			<!-- End of hierarchy Title -->

			<div class="heirachyBottom">
				<span id="categoryLstTotal" class="totalCount hideBlock"> <label>Total:<strong
						id="categoryLstCnt"></strong></label>
				</span>
			</div>
			<!-- End of heirachy bottom -->

		</div>
		<!-- End of hierarchy Content -->
		<!-- Sub-category -->
		<div class="hierarchyContent" id="subCatDiv">

			<div class="hierarchyTitle">
				<h3>Sub-category</h3>
			</div>
			<!-- End of hierarchy Title -->

			<div class="hierarchyList">

				<div class="noSelection" id="subCat">
					<label>Please select any category to see sub-categories.</label>
				</div>
				<!-- End of -->

				<label class="loading hideBlock">&nbsp;</label>

				<ul class="hideBlock" id="subCategoryLst">
				</ul>
			</div>
			<!-- End of hierarchy Title -->

			<div class="heirachyBottom">
				<span id="subCatTotal" class="totalCount hideBlock"> <label>Total:<strong
						id="subTotal"></strong></label>
				</span> <span class="heirachyAction hideBlock"> <!-- 	<label class="actionBtn">Go</label> -->
				</span>
			</div>
			<!-- End of heirachy bottom -->

		</div>
		<!-- End of hierarchy Content -->
		<!-- Segment -->
		<div class="hierarchyContent lastContent" id="segDiv">

			<div class="hierarchyTitle">
				<h3>Segment</h3>
			</div>
			<!-- End of hierarchy Title -->



			<div class="hierarchyList">

				<div class="noSelection" id="segment">
					<label>Please select any sub-category to see segments.</label>
				</div>
				<!-- End of -->

				<label class="loading hideBlock">&nbsp;</label>

				<ul class="hideBlock" id="segmentLst">

				</ul>
			</div>
			<!-- End of hierarchy Title -->

			<div class="heirachyBottom">
				<span id="segmentTotal" class="totalCount hideBlock"> <label>Total:<strong
						id="segmentTotalCnt"></strong></label>
				</span> <span id="segmentBtn" class="heirachyAction hideBlock"> <!-- <label class="actionBtn">Go</label> -->
				</span>

			</div>
			<!-- End of heirachy bottom -->

		</div>
		<!-- End of hierarchy Content -->


	</div>
	<!-- end of hierarchy Wrapper -->






	<div class="parameter clearfix">
		<label for="article" title="${properties.Article}">Article</label> <input
			type="#" class="textbox articleSearchText" name="articleNo"
			id="articleNo" placeHolder="Search By">
		<div class="searchByOptions">
			<input type="radio" checked="" id="number" value="number"
				name="searchByOptions"><label class="labelText" for="number">Number</label>
			<input type="radio" id="description" value="description"
				name="searchByOptions"><label class="labelText"
				for="description">Description</label> <input type="radio"
				id="reference" value="reference" name="searchByOptions"><label
				class="labelText" for="reference">EAN</label>
		</div>
	</div>
	<!-- End of parameter -->
	<div class="parameter  ">
		<!-- <div class="parameter"> -->
		<label for="sourceOfSupply" title="${properties.SourceofSupply}">Source
			of Supply</label> <span class="reportRadio"> <input type="radio"
			name="sourceSupply" value="all" id="all" checked><label
			for="all" class="labelText">All</label> <input type="radio"
			name="sourceSupply" value="warehouse" id="warehouse"><label
			for="warehouse" class="labelText">Warehouse</label> <input
			type="radio" name="sourceSupply" value="vendor" id="vendor"><label
			for="vendor" class="labelText">Vendor</label>
		</span>
		<!-- End of parameter -->

		<div class="parameter supplierSource IBTSource">
			<span id="vendorField" class=""> <input type="#"
				class="textbox" name="supplier" id="supplier"
				placeHolder="Enter supplier no. or name"> <label
				class="linkBtn" id="verifySupplier"><label
					class="advancedSearch">Verify</label></label>

			</span>
		</div>
		<!-- End of parameter -->

	</div>

	<%-- <div class="parameter">
		<label for="sourceOfSupply" title="${properties.SourceofSupply}">Source of Supply</label> <span
			class="reportRadio"> <input type="radio" name="sourceSupply"
			value="all" id="all" checked><label for="all"
			class="labelText">All</label> <input type="radio" name="sourceSupply"
			value="warehouse" id="warehouse"><label for="warehouse"
			class="labelText">Warehouse</label> <input type="radio"
			name="sourceSupply" value="vendor" id="vendor"><label
			for="vendor" class="labelText">Vendor</label>
		</span>
		<!-- End of report radio -->



		<div class="parameter supplierSource IBTSource">

			<span id="allField"> <input type="#" class="textbox"
				style="visibility: hidden;">

			</span> <span id="warehouseField" class="hideBlock"> <select
				class="selectOptions" id="warehouseDropDown" name="warehouseVal">
					<option value="All">All</option>
					<c:forEach items="${whList}" var="whVal">
						<option value="${whVal.siteNo}" id="${whVal.siteNo}">${whVal.siteNo}
							| ${whVal.siteName}</option>
					</c:forEach>
			</select>

			</span> <span id="vendorField" class="hideBlock"> <input type="#"
				class="textbox" name="supplier" id="supplier"
				placeHolder="Enter vendor no. or name"> <label
				class="linkBtn" id="verifySupplier"><label
					class="advancedSearch">Verify</label></label>

			</span>
		</div>
		<!-- End of parameter -->

	</div>  --%>
	<!-- End of parameter -->


	<hr class="sectionDivider clearfix" />


	<div class="parameter ">
		<label for="promotionsDropDown" title="${properties.Promoti}">Promotions</label>
		<select class="selectOptions" name="promotionsDropDown"
			id="promotionsDropDown" title="${properties.P_All}">
			<option value="All" title="${properties.P_All}">All</option>
			<option value="New" title="${properties.P_New}">New</option>
			<option value="Modified" title="${properties.P_Modified}">Modified</option>
			<option value="Old" title="${properties.P_Old}">Current</option>
		</select>
	</div>
	<!-- End of parameter -->

	<div class="parameter">
		<label for="promoType" title="${properties.Type}">Type</label> <select
			class="selectOptions" name="promoType" id="promoType"
			title="${properties.T_All}">
			<option value="All" title="${properties.T_All}">All</option>
			<option value="C" title="${properties.T_Central}">Central</option>
			<option value="I" title="${properties.Store}">In-store</option>
		</select>
	</div>
	<!-- End of parameter -->

	<hr class="sectionDivider clearfix" />

	<div class="parameter clearfix">
		<label for="group" title="${properties.SortBy}">Sort By</label> <select
			class="selectOptions supplyDrop" title="${properties.Category}"
			name="sortByOptions" id="sortByOptions">
			<option value="Category" title="${properties.Category}">Category</option>
			<option value="Display" title="${properties.Display}">Display</option>
			<option value="Media" title="${properties.Media}">Media</option>
			<!-- <option value="Promotion Details">Promotion Details</option>
			<option value="Sales">Sales</option> -->

		</select>
	</div>
	<!-- End of parameter -->


	<div class="parameter clearfix parameterRow">
		<label for="filter" title="${properties.FiltersBy}">Filter By</label>
		<span class="multipleOptions"> <span class="option"> <label
				title="${properties.MinDiscount}">Min. Discount</label> <input
				type="#" class="textbox textboxDefaultText numberBox restrict"
				maxlength="2" name="minDiscount" id="minDiscount">%
		</span> <!-- End of options --> <span class="option"> <label
				title="${properties.DisplayType}">Display Type</label> <select
				class="selectOptions" name="displayType" id="displayType">
					<option value="0">Select</option>
					<c:forEach items="${promoDisplayList}" var="promoDisplayList">
						<option value="${promoDisplayList.displayTypeCode}"
							id="${promoDisplayList.displayTypeCode}"
							title="${promoDisplayList.displayTypeDesc}">${promoDisplayList.displayTypeCode}</option>
					</c:forEach>

					<!-- 
										<option value="FGE">FGE</option>
										<option value="TV">TV</option> -->
			</select>
		</span> <!-- End of options --> <span class="option"> <label
				title="${properties.OMUnit}" class="diffOm">Difference in OM</label>
				<input type="#"
				class="textbox textboxDefaultText numberBox restrict" id="omVal"
				name="omVal"> <span class="reportRadio"> <input
					type="radio" name="diffOM" value="unit" id="unit" checked><label
					for="unit" class="labelText" title="${properties.OMUnit}">Unit</label>
					<input type="radio" name="diffOM" value="perc" id="perc"><label
					for="perc" class="labelText" title="${properties.OMPerc}">%</label>
			</span> <!-- End of report radio -->


		</span> <!-- End of options -->
		</span>
		<!-- End of multiple options -->


	</div>
	<!-- End of parameter -->

	<hr class="sectionDivider clearfix" />


	<div class="parameter clearfix onlyCheckbox">
		<input type="checkbox" name="actioned" value="actioned" id="actioned"><label
			for="actioned" class="labelText" title="${properties.Previously}">Don't
			show previously actioned articles</label>
	</div>
	<!-- End of parameter -->

	<div id="residualQtyDiv" class="parameter clearfix onlyCheckbox">
		<input type="checkbox" name="residualQty" value="residualQty"
			id="residualQty"><label for="residualQty" class="labelText"
			title="${properties.DispResiQty}">Show articles with Display
			/ Residual Qty. only</label>
	</div>
	<!-- End of parameter --><!-- New fix to include display Qty in Current week as well -->
	<div class="parameter clearfix onlyCheckbox">
			<input type="checkbox" name="displayQty" value="displayQty"
				id="displayQty"><label for="displayQty" class="labelText"
				title="${properties.DisplQuan}">Show articles containing display quantity</label>
		</div>
	<!-- End of parameter -->



</div>
