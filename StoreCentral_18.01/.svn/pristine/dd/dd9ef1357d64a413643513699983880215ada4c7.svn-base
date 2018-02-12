<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- heirarchy popup  -->
<div id="dialog-hierarchy" title="Select Department Hierachy">
	<div class="popupContent">

		<div class="popupData contentWrapper">

			<div class="hierarchyWrapper clearfix" id="articleHierarchy">

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
							<label>Please select any department to see it's
								associated categories.</label>
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




			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Select</label>
					<label class="secondaryActionBtn">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End hierarchy popup -->

<!--  table settings  -->
<div id="dialog-tableSettings" title="Customize Columns">
	<div class="popupContent">

		<div class="popupData">

			<h4 class="alertText">Select the list of columns you would like
				to see.</h4>

			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">

				</table>
			</div>
			<!-- End of content table wrapper -->

			<div class="popupActionsWrapper">
				<label class="settingsMsg"></label> <span class="popupActions">
					<label class="actionBtn applyColumnStng">Apply Column
						Settings</label> <label class="secondaryActionBtn cancelColumnStng">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of save search popup -->
<!--  save search  -->
<div id="dialog-saveSearch" title="Save Search">
	<div class="popupContent">

		<div class="popupData">

			<div class="formWrapper">
				<div class="parameter">
					<label for="name">New Search Name</label> <input type="#" id="name"
						class="textbox">
				</div>
			</div>
			<!-- End of form wrapper -->


			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Save</label>
					<label class="secondaryActionBtn">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->
		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of save search popup -->


<!-- multiple articles pop up-->
<div id="dialog-savedSearch" title="My saved search">
	<div class="popupContent">


		<div class="popupData">

			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
						<th width="30px" class="centerValue">&nbsp;</th>
						<th>Name</th>
						<th class="centerValue" width="40px">Delete</th>
					</tr>
					<tr>
						<td class="sorted centerValue lastColumn"><input type="radio"
							name="savedSearchList" value="save1" id="save1"></td>
						<td><label for="save1">Normal PReq for 12/12/12</label></td>
						<td class="centerValue"><label class="linkBtn"> <label
								class="deleteRecord">Delete</label>
						</label></td>
					</tr>
					<tr class="lastRow">
						<td class="sorted centerValue lastColumn"><input type="radio"
							name="savedSearchList" value="save2" id="save2"></td>
						<td><label for="save2">All Allocations till date</label></td>
						<td class="centerValue"><label class="linkBtn"> <label
								class="deleteRecord">Delete</label>
						</label></td>
					</tr>

				</table>
			</div>
			<!-- End of content table wrapper -->

			<div class="popupActionsWrapper">
				<span class="popupActions"> <label class="actionBtn">Go</label>
					<label class="secondaryActionBtn">Cancel</label>
				</span>
			</div>
			<!-- End of popup actions-->

		</div>
		<!-- End of pop up data -->

	</div>
	<!-- End of popupContent -->
</div>
<!-- End of saved Search popup -->
