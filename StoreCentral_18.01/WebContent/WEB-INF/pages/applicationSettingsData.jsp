<input id="navBarHighlight" type="hidden" value="home" />

<input id="menuExcludeMap" type="hidden"
	value="<c:forEach items="${menuExcludeMap}" var="menuExcludeMap"> 
		<c:set var="menuExcludeMapValue" value="${menuExcludeMap.value}"></c:set>
		<c:forEach items="${menuExcludeMapValue}" var="menuExcludeMapValueList"> 
		${menuExcludeMap.key}:${menuExcludeMapValueList},</c:forEach></c:forEach>" />

<input id="funcExcludeMap" type="hidden"
	value="<c:forEach items="${funcExcludeMap}" var="funcExcludeMap"> 
		<c:set var="funcExcludeMapValue" value="${funcExcludeMap.value}"></c:set>
		<c:forEach items="${funcExcludeMapValue}" var="funcExcludeMapValueList"> 
		${funcExcludeMap.key}:${funcExcludeMapValueList},</c:forEach></c:forEach>" />


<input id="additionalAccess" type="hidden"
	value="<c:forEach items="${additionalAccess}" var="additionalAccess"> 
		${additionalAccess},</c:forEach>" />