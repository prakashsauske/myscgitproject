<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<title>Daily Store Profiles</title>



<link href="../../styles/jqueryUI.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/common_new.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/navBar.css?version=${properties.version}" rel="stylesheet" type="text/css" />
<link href="../../styles/simplePagination.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />
<link href="../../styles/${user.imgLocation}.css?version=${properties.version}" rel="stylesheet"
	type="text/css" />

<script src="../../scripts/jquery-1.9.1.js?version=${properties.version}"></script>
<script src="../../scripts/jquery-ui.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/date-formatter.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/dailyStoreProfile.js?version=${properties.version}"></script>



</head>
<body>
	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='../login/goingHome.htm'>Home</a></li>
						<li class="currentPage">Daily Store Profiles</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock" id="statusImg">We are
						getting data, please wait</label> <label class="secondaryActionBtn"
						id="backBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->







		</div>
		<!-- End of head wrapper -->
		<form:form id="dailyStoreProfileForm"
			modelAttribute="dailyStoreProfileReport">
			<input type="hidden" id="recentProfileDate"
				value='${recentProfileDate}' />

			<div class="contentWrapper reportWrapper">


				<div class="articleAdditionalInfo">



					<div id="accordion">

						<h3>Generate Daily Store Profile Report</h3>
						<div>


							<div class="formWrapper">

								<div class="parameter">
									<label for="store" class="mandatory">Date</label> <input
										type="#" class="textbox defaultTextbox inputDate" name="date"
										id="store" placeholder="dd/mm/yyyy" />
								</div>
								<!-- End of parameter -->

								<div class="parameter hideBlock">
									<label for="override">Profile Indicator</label> <span
										class="reportRadio"> <input type="radio"
										name="profileIndicator" value="all" id="all"><label
										for="all" class="labelText">All</label> <input type="radio"
										name="profileIndicator" value="standard" id="standard"><label
										for="standard" class="labelText">Standard</label> <input
										type="radio" name="profileIndicator" value="override"
										id="override"><label for="override" class="labelText"
										checked>Override</label>
									</span>
								</div>
								<!-- End of parameter -->


								<div class="parameter clearfix">
									<label for="department">Department</label> <select
										class="selectOptions" id="department" name="deparmentNo">
										<option value="">All</option>
										<c:forEach items="${model.deptInfoList}" var="deptInfo">
											<option value="${deptInfo.node}">${deptInfo.nodeDesc}</option>
										</c:forEach>

									</select>
								</div>
								<!-- End of parameter -->



								<div class="formActions">
									<label class="actionBtn" id="generateReport">Generate
										Report</label> <label class="secondaryActionBtn" id="closeLink"
										onclick="$('.ui-accordion-header').click();">Close</label>
								</div>
								<!-- End of form actions -->

							</div>
							<!-- End of content table wrapper -->
							</form>

						</div>
						<!-- End of div for jQuery handling -->


					</div>
					<!-- End of ui-accordion -->



					<!-- For displaying report results -->

					<div class="ContentTableWrapper" id="reportContent">


						<div class="tableInfo hideBlock tableStart">

							<div class="tableTitle nodataMessage hideBlock" id="errorMsgDiv">
								<h4 id="errorMsg">
									<c:if test="${not empty noResults}">${noResults}</c:if>
								</h4>

								<!-- End of table title -->



							</div>
							<div class="tableTitle totalRecord hideBlock">
								<h4>
									Daily Store Profile from <strong id="fromDate"></strong> to <strong
										id="toDate"></strong>
								</h4>
							</div>
							<div class="paginationWrapper hideBlock paginationDiv"
								id="paginationDiv1">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>

						</div>


						<div class="tableFooter hideBlock">
							<div class="legend legentClass hideBlock">
								<label> Legend: <label class="standard hideBlock">Standard</label>
									<label class="promotion">Override</label></label>
							</div>
							<div
								class="paginationWrapper bottomPagination hideBlock paginationDiv"
								id="paginationDiv2">
								<div class="pagination-holder clearfix">
									<div id="compact-pagination"
										class="compact-theme simple-pagination"></div>
								</div>
							</div>
						</div>
					</div>


					<!-- End of Content Table Wrapper-->



				</div>
				<!-- End of article Additional Info -->


			</div>
			<!-- End of content wrapper -->

		</form:form>
		<input type="hidden" id="multiArtIndex" name="multiArtIndex" value="" />
		<input id="navBarHighlight" type="hidden" value="reports" />
	</div>
	<%@include file="footer.jsp"%>


	<div id="dialog-modal" title="Daily Store Profile">
		<div class="popupContent">

			<div class="popupData">


				<h4 class="alertText" id="alertBox"></h4>



				<div class="popupActionsWrapper">
					<span class="popupActions"> <label class="actionBtn"
						onmousedown="$( '#dialog-modal' ).dialog( 'close' );" id="okBtn">OK</label>
					</span>
				</div>
				<!-- End of popup actions-->



			</div>
		</div>
		<!-- End of popupContent -->
	</div>






</body>
</html>
