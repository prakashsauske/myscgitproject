<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<input type="hidden" id="option" value="${model.param.option}" />
<c:choose>
	<c:when
		test="${model.param.option=='multiple' || model.param.option=='single'}">
		<div class="tableInfo">

			<div class="tableTitle">
				<c:if test="${userList.size()!=0}">
					<h4 id="DescriptionTableTitle1">
						Total <strong id="resultSize">${userList.size()}</strong> results
						found for '<strong class="searchString">
							${model.param.submitBy} </strong>'
					</h4>
				</c:if>
				<c:if test="${userList.size()==0}">
					<h4>Sorry, no results found for your search criteria. Please
						try again</h4>
				</c:if>
			</div>
			<!-- End of table title -->

		</div>
		<!-- End of table info -->
		<c:if test="${userList.size()>0}">
			<%
		int i = 0;
	%>
			<div class="ContentTableWrapper">
				<table class="ContentTable" cellspacing="0">
					<tr>
						<th>User Id</th>
						<th>User Name</th>
						<th width="25px" class="lastColumn">&nbsp;</th>
					</tr>

					<c:forEach items="${userList}" var="userList">

						<tr>
							<td id="userId<%=i%>">${userList.value}</td>
							<td id="userName<%=i%>">${userList.key}</td>
							<td class="sorted lastColumn"><label
								class="linkBtn linkBtn2" id="select<%=i%>"><label
									class="selectItem" onclick="selectUser(<%=i%>)">Select</label></label></td>
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
</c:choose>
