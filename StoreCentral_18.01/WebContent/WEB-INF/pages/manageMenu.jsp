<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="ContentTableWrapper parent manageMenu-${salesOrgMap.key}">
	<div class="hierarchyWrapper settingsWrapper">
		<div class="tableInfo">
			<div class="tableTitle">
				<h4>
					<strong>Select features to be available for users</strong>
				</h4>
			</div>
		</div>
		<c:forEach items="${manageMenuMap}" var="manageMenuMap">
			<c:set var="menuOptionMap" value="${manageMenuMap.value}"></c:set>
			<c:choose>
				<c:when test="${manageMenuMap.key==properties.Lookup}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Lookup</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="lookupListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="lookupListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="lookupListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										class="labelText radioLable lookupListMenu_${salesOrgMap.key}"><label
										for="lookupListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">${menuOptionMapList.description}
									</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="lookupListMenuTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageMenuMap.key==properties.Orders}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Orders</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="orderListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="orderListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="orderListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										class="labelText radioLable orderListMenu_${salesOrgMap.key}"><label
										for="orderListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="orderListMenuTotal_${salesOrgMap.key}">6</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageMenuMap.key==properties.Reports}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Reports</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li class="alreadyAddedRow"><input type="checkbox"
										checked="checked"
										name="reportsListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="reportsListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="reportsListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										class="labelText radioLable reportsListMenu_${salesOrgMap.key}"><label
										for="reportsListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="reportsListMenuTotal_${salesOrgMap.key}">5</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageMenuMap.key==properties.StockManagement}">
					<div class="hierarchyContent lastContent">
						<div class="hierarchyTitle">
							<h3>Stock Management</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="stockManagementListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="stockManagementListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="stockManagementListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										class="labelText radioLable stockManagementListMenu_${salesOrgMap.key}"><label
										for="stockManagementListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="stockManagementListMenuTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<%-- <c:when test="${manageMenuMap.key==properties.Promotions}">
					<div class="hierarchyContent lastContent">
						<div class="hierarchyTitle">
							<h3>Promotions</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="promoListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="promoListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="promoListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										class="labelText radioLable promoListMenu_${salesOrgMap.key}"><label
										for="promoListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="promoListMenuTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when> --%>
				<c:when test="${manageMenuMap.key==properties.Pricing}">
					<div class="hierarchyContent ">
						<div class="hierarchyTitle">
							<h3>Pricing</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="pricingListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="pricingListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="pricingListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										class="labelText radioLable pricingListMenu_${salesOrgMap.key}"><label
										for="pricingListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="pricingListMenuTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageMenuMap.key==properties.Ticketing}">
					<div class="hierarchyContent">
						<div class="hierarchyTitle">
							<h3>Ticketing</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										class="labelText radioLable ticketing_${salesOrgMap.key}"
										name="ticketingListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="ticketingListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="ticketingListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"><label
										for="ticketingListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">
											${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="ticketingListMenuTotal_${salesOrgMap.key}">1</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				
				<c:when test="${manageMenuMap.key==properties.RepairCentre}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Repair Centre</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="repairListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="repairListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="repairListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										class="labelText radioLable repairListMenu_${salesOrgMap.key}"><label
										for="repairListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="repairListMenuTotal_${salesOrgMap.key}"></strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				
				<c:when test="${manageMenuMap.key==properties.Admin}">
					<div class="hierarchyContent noProcess">
						<div class="hierarchyTitle">
							<h3>Admin</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="adminListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="adminListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="adminListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										class="labelText radioLable adminListMenu_${salesOrgMap.key}"><label
										for="adminListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="adminListMenuTotal_${salesOrgMap.key}">6</strong>
									selected
							</label>
							</span>
						</div>
					</div>
				</c:when>
				<c:when test="${manageMenuMap.key==properties.OtherTools}">
					<div class="hierarchyContent lastContent">
						<div class="hierarchyTitle">
							<h3>Other Tools</h3>
						</div>
						<div class="hierarchyList">
							<ul>
								<c:forEach items="${menuOptionMap}" var="menuOptionMapList">
									<li><input type="checkbox" checked="checked"
										name="otherToolsListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										value="otherToolsListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										id="otherToolsListMenu_${salesOrgMap.key}_${menuOptionMapList.code}"
										class="labelText radioLable otherToolsListMenu_${salesOrgMap.key}"><label
										for="otherToolsListMenu_${salesOrgMap.key}_${menuOptionMapList.code}">${menuOptionMapList.description}</label></li>
								</c:forEach>
							</ul>
						</div>
						<div class="heirachyBottom">
							<span class="totalCount"> <label>Total:<strong
									class="otherToolsListMenuTotal_${salesOrgMap.key}">1</strong>
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
		<label class="actionBtn"><label class="thumbUpMenu"
			id="saveBtn_${salesOrgMap.key}">Save</label></label> <label
			class="secondaryActionBtn cancelBtn-${salesOrgMap.key}"
			onclick="javaScript:window.location.href='../login/goingHome.htm'"
			id="cancelBtn_${salesOrgMap.key}">Cancel</label>
	</div>
</div>