<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div
	class="ContentTableWrapper parent manageFunc-${salesOrgMap.key} hideBlock">

	<div class="articleHead hideBlock">
		<div class="articleHeaderWrapper">
			<h2 class="articleTitle">
				Role <select class="selectOptions">
					<option id="All" value="All">All</option>
					<%-- <c:forEach items="${roleList}" var="roleList">
						<option id="${roleList.code}" value="${roleList.code}">${roleList.desc}</option>
					</c:forEach> --%>
				</select>


			</h2>
			<p>
				<label class="articlePriceLabel">Select a role to activate
					various features for it. </label>
			</p>
		</div>

	</div>
	<!-- End of Article head -->

	<div class="hierarchyWrapper settingsWrapper">
		<div class="tableInfo">
			<div class="tableTitle">
				<h4>
					<strong>Select features to be available for users </strong>
				</h4>
			</div>
		</div>
		<c:forEach items="${manageFunctionMap}" var="manageFunctionMap">
			<c:set var="menuOptionMap" value="${manageFunctionMap.value}"></c:set>
			<c:choose>
				<c:when test="${manageFunctionMap.key==properties.Lookup}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Lookup</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="lookupListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="lookupListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="lookupListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable lookupListFunc_${salesOrgMap.key}"><label
										for="lookupListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="lookupListFuncTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageFunctionMap.key==properties.Orders}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Orders</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="orderListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="orderListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="orderListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable orderListFunc_${salesOrgMap.key}"><label
										for="orderListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="orderListFuncTotal_${salesOrgMap.key}">6</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageFunctionMap.key==properties.Reports}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Reports</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li class="alreadyAddedRow"><input type="checkbox"
										checked="checked"
										name="reportsListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="reportsListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="reportsListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable reportsListFunc_${salesOrgMap.key}"><label
										for="reportsListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="reportsListFuncTotal_${salesOrgMap.key}">5</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageFunctionMap.key==properties.StockManagement}">
					<div class="hierarchyContent lastContent">
						<div class="hierarchyTitle">
							<h3>Stock Management</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="stockManagementListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="stockManagementListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="stockManagementListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable stockManagementListFunc_${salesOrgMap.key}"><label
										for="stockManagementListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="stockManagementListFuncTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageFunctionMap.key==properties.Pricing}">
					<div class="hierarchyContent ">
						<div class="hierarchyTitle">
							<h3>Pricing</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="pricingListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="pricingListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="pricingListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable pricingListFunc_${salesOrgMap.key}"><label
										for="pricingListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="pricingListFuncTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				
				
				<c:when test="${manageFunctionMap.key==properties.Ticketing}">
					<div class="hierarchyContent">
						<div class="hierarchyTitle">
							<h3>Ticketing</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										class="labelText radioLable ticketing_${salesOrgMap.key}"
										name="ticketingListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="ticketingListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="ticketingListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"><label
										for="ticketingListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">
											${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="ticketingListFuncTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				
				<c:when test="${manageFunctionMap.key==properties.RepairCentre}">
					<div class="hierarchyContent">
						<div class="hierarchyTitle">
							<h3>Repair Centre</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										class="labelText radioLable repairListFunc_${salesOrgMap.key}"
										name="repairListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="repairListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="repairListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"><label
										for="repairListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">
											${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="repairListFuncTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				
				<c:when test="${manageFunctionMap.key==properties.Admin}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Admin</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="adminListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="adminListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="adminListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable adminListFunc_${salesOrgMap.key}"><label
										for="adminListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="adminListFuncTotal_${salesOrgMap.key}">6</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageFunctionMap.key==properties.Promotions}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Promotions</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="promoListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="promoListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="promoListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable promoListFunc_${salesOrgMap.key}"><label
										for="promoListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="promoListFuncTotal_${salesOrgMap.key}">6</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageFunctionMap.key==properties.OtherTools}">
					<div class="hierarchyContent lastContent">
						<div class="hierarchyTitle">
							<h3>Other Tools</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="otherToolsListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="otherToolsListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="otherToolsListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable otherToolsListFunc_${salesOrgMap.key}"><label
										for="otherToolsListFunc_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="otherToolsListFuncTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>

			</c:choose>
		</c:forEach>
	</div>
	<div class="pageActions ">
		<label class="actionBtn"><label class="thumbUpFunc"
			id="saveBtn_${salesOrgMap.key}">Save</label></label> <label
			class="secondaryActionBtn cancelBtn-${salesOrgMap.key}"
			onclick="javaScript:window.location.href='../login/goingHome.htm'"
			id="cancelBtn_${salesOrgMap.key}">Cancel</label>
	</div>
</div>