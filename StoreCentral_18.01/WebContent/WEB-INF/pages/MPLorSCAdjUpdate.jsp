<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<input type="hidden" id="option" value="${model.param.option}" />
<c:choose>
	<c:when test="${model.param.option=='1'}">
		<div class="tableInfo">

			<div class="tableTitle">
				<c:if test="${articleSearchResutlsList.size()!=0}">
					<h4 id="DescriptionTableTitle">
						Total <strong id="resultSize">${articleSearchResutlsList.size()}</strong>
						results found for '<strong class="searchString">
							${model.param.articleNo} </strong>'
					</h4>
				</c:if>
				<c:if test="${articleSearchResutlsList.size()==0}">
					<h4 id="DescriptionTableTitle">Sorry, no results found for
						your search criteria. Please try again</h4>
				</c:if>
			</div>
			<!-- End of table title -->

		</div>
		<!-- End of table info -->
		<c:if test="${not empty articleSearchResutlsList}">
			<%
		int i = 0;
	%>
			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
						<th>Article No</th>
						<th>Description</th>
						<th>UOM</th>
						<th width="25px" class="lastColumn">&nbsp;</th>
					</tr>

					<c:forEach items="${articleSearchResutlsList}" var="vendorList">

						<tr class="article-result">
							<td id="artNo<%=i%>">${vendorList.articleNo}</td>
							<td id="artName<%=i%>">${vendorList.description}</td>
							<td id="uom<%=i%>">${vendorList.uom}</td>
							<td class="sorted lastColumn"><label
								class="linkBtn linkBtn2" id="<%=i%>"><label
									class="selectItem"
									onclick="selectItem(<%=i%>,${vendorList.articleNo},'${vendorList.uom}')">Select</label></label></td>
						</tr>
						<%
											i++;
										%>
					</c:forEach>

				</table>
			</div>
			<!-- End of content table wrapper -->
		</c:if>
	</c:when>
	<c:when test="${model.param.option=='2'}">
		<c:if test="${not empty articleSelected}">
			<div class="articleHead updateContent">
				<div class="articleHeaderWrapper">
					<h2 class="articleTitle">${articleSelected.articleNo} -
						${articleSelected.description}</h2>
					<p>
						<label class="articlePriceLabel">Department: <strong>${articleSelected.dept}<c:if
									test="${not empty articleSelected.dept && not empty articleSelected.deptName}"> - </c:if>${articleSelected.deptName}
						</strong></label> <label class="articlePriceLabel">|</label> <label
							class="articlePriceLabel">Category: <strong>xxx</strong></label>
						<label class="articlePriceLabel">|</label> <label
							class="articlePriceLabel">Sub-category: <strong>xxx</strong>
						</label> <label class="articlePriceLabel">|</label> <label
							class="articlePriceLabel">Segment: <strong>xxx</strong></label>
					</p>
				</div>
				<div class="articleActionBtns">
					<label class="actionBtn" id="articleHistory"><label
						class="notepad">History</label></label>
				</div>
			</div>


			<div class="articleContent orderDetails updateContent">


				<div class="articleContentInner">

					<div class="articleDetails">
						<div class="tableActionsWrapper">
							<form method="POST" action="" id="">
								<div class="formWrapper">

									<h4 class="sectionTitle">EA</h4>

									<div class="parameter staticInfo">
										<label>Default MPL: <strong>2</strong></label>

									</div>
									<!-- End of parameter -->

									<div class="parameter">
										<label for="mpl">Current MPL:</label> <input type="#"
											class="textbox numberBox">
									</div>
									<!-- End of parameter -->

									<div class="parameter staticInfo">
										<label>Default Shelf Capacity: <strong>10</strong></label>
									</div>
									<!-- End of parameter -->

									<div class="parameter">
										<label for="shelf">Current Shelf Capacity:</label> <input
											type="#" class="textbox numberBox">
									</div>
									<!-- End of parameter -->






									<h4 class="sectionTitle">MPK</h4>

									<div class="parameter staticInfo">
										<label>Default MPL: <strong>2</strong></label>

									</div>
									<!-- End of parameter -->

									<div class="parameter">
										<label for="mpl">Current MPL:</label> <input type="#"
											class="textbox numberBox">
									</div>
									<!-- End of parameter -->

									<div class="parameter staticInfo">
										<label>Default Shelf Capacity: <strong>10</strong></label>
									</div>
									<!-- End of parameter -->

									<div class="parameter">
										<label for="shelf">Current Shelf Capacity:</label> <input
											type="#" class="textbox numberBox">
									</div>
									<!-- End of parameter -->







									<h4 class="sectionTitle">CAR</h4>

									<div class="parameter staticInfo">
										<label>Default MPL: <strong>2</strong></label>

									</div>
									<!-- End of parameter -->

									<div class="parameter">
										<label for="mpl">Current MPL:</label> <input type="#"
											class="textbox numberBox">
									</div>
									<!-- End of parameter -->

									<div class="parameter staticInfo">
										<label>Default Shelf Capacity: <strong>10</strong></label>
									</div>
									<!-- End of parameter -->

									<div class="parameter">
										<label for="shelf">Current Shelf Capacity:</label> <input
											type="#" class="textbox numberBox">
									</div>
									<!-- End of parameter -->


									<div class="formActions">
										<label class="actionBtn" id="saveSOH" tabindex="0"
											id="saveSOH">Save</label> <label class="secondaryActionBtn"
											tabindex="0" id="cancelSOH">Cancel</label>
									</div>
									<!-- End of form actions -->




								</div>
								<!-- End of content table wrapper -->
							</form>
						</div>
					</div>
					<!-- End of article details -->
				</div>
				<!-- End of article content inner -->
			</div>
		</c:if>
	</c:when>
	<c:otherwise>
		<div class="tableInfo">

			<div class="tableTitle nodataMessage" id="errorMsgDiv">
				<h4 id="msg">
					<c:if test="${not empty noDataFound}">${noDataFound}</c:if>
				</h4>

				<!-- End of table title -->
			</div>
		</div>
	</c:otherwise>
</c:choose>
