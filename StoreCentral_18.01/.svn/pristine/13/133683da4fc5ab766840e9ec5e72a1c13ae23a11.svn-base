<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div
	class="ContentTableWrapper parent manageRoles-${salesOrgMap.key} hideBlock">

	<div class="articleHead ">
		<div class="articleHeaderWrapper">
			<h2 class="articleTitle">
				Role <select class="selectOptions roleDrop"
					id="roleDrop-${salesOrgMap.key}">
					<!-- <option id="All" value="All">All</option> -->
					<c:forEach items="${roleList}" var="roleList">
						<c:if test="${salesOrgMap.key==roleList.salesOrg}">
							<option id="${roleList.code}" value="${roleList.code}">${roleList.desc}</option>
						</c:if>
					</c:forEach>
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
					<strong>Select features to be available for users with '<strong
						class="roleName-${salesOrgMap.key}">${roleList.get(0).desc}</strong>'
						role
					</strong>
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
										name="lookupListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="lookupListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="lookupListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable lookupListRole_${salesOrgMap.key}"><label
										for="lookupListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="lookupListRoleTotal_${salesOrgMap.key}">1</strong>
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
										name="orderListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="orderListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="orderListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable orderListRole_${salesOrgMap.key}"><label
										for="orderListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="orderListRoleTotal_${salesOrgMap.key}">6</strong>
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
										name="reportsListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="reportsListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="reportsListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable reportsListRole_${salesOrgMap.key}"><label
										for="reportsListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="reportsListRoleTotal_${salesOrgMap.key}">5</strong>
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
										name="stockManagementListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="stockManagementListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="stockManagementListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable stockManagementListRole_${salesOrgMap.key}"><label
										for="stockManagementListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="stockManagementListRoleTotal_${salesOrgMap.key}">1</strong>
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
										name="pricingListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="pricingListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="pricingListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable pricingListRole_${salesOrgMap.key}"><label
										for="pricingListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="pricingListRoleTotal_${salesOrgMap.key}">1</strong>
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
										name="ticketingListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="ticketingListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="ticketingListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"><label
										for="ticketingListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">
											${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="ticketingListRoleTotal_${salesOrgMap.key}">1</strong>
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
										class="labelText radioLable repairListRole_${salesOrgMap.key}"
										name="repairListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="repairListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="repairListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"><label
										for="repairListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">
											${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="repairListRoleTotal_${salesOrgMap.key}">1</strong>
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
										name="adminListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="adminListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="adminListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable adminListRole_${salesOrgMap.key}"><label
										for="adminListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="adminListRoleTotal_${salesOrgMap.key}">6</strong>
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
										name="promoListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="promoListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="promoListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable promoListRole_${salesOrgMap.key}"><label
										for="promoListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="promoListRoleTotal_${salesOrgMap.key}">6</strong>
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
										name="otherToolsListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										value="otherToolsListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										id="otherToolsListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}"
										class="labelText radioLable otherToolsListRole_${salesOrgMap.key}"><label
										for="otherToolsListRole_${salesOrgMap.key}_${menuOptionMapList.code}_${menuOptionMapList.type}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="otherToolsListRoleTotal_${salesOrgMap.key}">1</strong>
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
		<label class="actionBtn"><label class="thumbUpRole"
			id="saveBtn_${salesOrgMap.key}">Save</label></label> <label
			class="secondaryActionBtn cancelBtn-${salesOrgMap.key}"
			onclick="javaScript:window.location.href='../login/goingHome.htm'"
			id="cancelBtn_${salesOrgMap.key}">Cancel</label>
	</div>
</div>