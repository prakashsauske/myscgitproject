<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<ul>
	<c:if test="${not empty promSearchResultMetadata}">
		<c:set var="count" value="0"></c:set>
		<c:set var="keyList" value=""></c:set>
		<c:set var="metaDataSize" value="${promSearchResultMetadata.size()}"></c:set>
		<c:forEach var="promSearchResultMetadata"
			items="${promSearchResultMetadata}">
			<c:set var="promSearchResultMetadataList"
				value="${promSearchResultMetadata.value}"></c:set>
			<c:if
				test="${promSearchResultMetadataList.get(0).firstLevelType!='TABS'}">
				<li title="${promSearchResultMetadataList.get(0).dispDesc}"
					class="ui-tabs-status-default"><a href="#sec-${count}"
					<c:if  test="${promSearchResultMetadataList.get(0).secondLevelType=='NONE' && (promSearchResultMetadataList.get(0).firstLevelType=='MEDIA' || promSearchResultMetadataList.get(0).firstLevelType=='DISC' )}"> onclick="getArticles($(this),'${promSearchResultMetadata.key}','${count}','tabs','1')" </c:if>>
						<c:if
							test="${promSearchResultMetadataList.get(0).firstLevelType=='MEDIA'}">
							<c:if
								test="${empty promSearchResultMetadataList.get(0).mediaDes}">In-Store</c:if>
							<c:if
								test="${not empty promSearchResultMetadataList.get(0).mediaDes}">${promSearchResultMetadataList.get(0).mediaDes}</c:if>
						</c:if> <c:if
							test="${promSearchResultMetadataList.get(0).firstLevelType!= 'MEDIA'}">${promSearchResultMetadata.key}</c:if>
						<label class="tabStatus">&nbsp;</label>
				</a></li>
			</c:if>

			<c:if
				test="${promSearchResultMetadataList.get(0).firstLevelType =='TABS' && (metaDataSize-1)==count}">
				<c:set var="keyList"
					value="${keyList}:${promSearchResultMetadata.key}"></c:set>
				<span class="keyList hideBlock"><c:out value="${keyList}"></c:out></span>
				<li><a href="#section-1" class="letters">A</a></li>
				<li><a href="#section-2" class="letters">B</a></li>
				<li><a href="#section-3" class="letters">C</a></li>
				<li><a href="#section-4" class="letters">D</a></li>
				<li><a href="#section-5" class="letters">E</a></li>
				<li><a href="#section-6" class="letters">F</a></li>
				<li><a href="#section-7" class="letters">G</a></li>
				<li><a href="#section-8" class="letters">H</a></li>
				<li><a href="#section-9" class="letters">I</a></li>
				<li><a href="#section-10" class="letters">J</a></li>
				<li><a href="#section-11" class="letters">K</a></li>
				<li><a href="#section-12" class="letters">L</a></li>
				<li><a href="#section-13" class="letters">M</a></li>
				<li><a href="#section-14" class="letters">N</a></li>
				<li><a href="#section-15" class="letters">O</a></li>
				<li><a href="#section-16" class="letters">P</a></li>
				<li><a href="#section-17" class="letters">Q</a></li>
				<li><a href="#section-18" class="letters">R</a></li>
				<li><a href="#section-19" class="letters">S</a></li>
				<li><a href="#section-20" class="letters">T</a></li>
				<li><a href="#section-21" class="letters">U</a></li>
				<li><a href="#section-22" class="letters">V</a></li>
				<li><a href="#section-23" class="letters">W</a></li>
				<li><a href="#section-24" class="letters">X</a></li>
				<li><a href="#section-25" class="letters">Y</a></li>
				<li><a href="#section-26" class="letters">Z</a></li>
				<li><a href="#section-27" class="letters">OTHERS</a></li>
			</c:if>
			<c:set var="keyList"
				value="${keyList}:${promSearchResultMetadata.key}"></c:set>
			<c:set var="count" value="${count+1}"></c:set>
		</c:forEach>
	</c:if>
</ul>