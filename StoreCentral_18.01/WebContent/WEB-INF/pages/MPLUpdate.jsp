<!DOCTYPE html>
<html>
<head>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<title>Stock Search</title>



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
<script type="text/javascript" src="../../scripts/jquery.treetable.js?version=${properties.version}"></script>
<script type="text/javascript" src="../../scripts/StockSearch.js?version=${properties.version}"></script>


</head>
<body>

	<div class="mainWrapper woolworths">

		<div class="headWrapper">
			<%@include file="header.jsp"%>

			<div class="breadcrumbWrapper">
				<div class="breadcrumbs">
					<label class="breadcrumbLabel"> You are here: </label>
					<ul>
						<li><a href='#'>Home</a></li>
						<li><a href='#'>MPL / SC Adjustment</a></li>
						<li class="currentPage">MPL / SC Update</li>
					</ul>
				</div>
				<!-- End of breadcrumbs -->

				<div class="statusWrapper">
					<label class="loading hideBlock">We are getting data,
						please wait</label> <label class="secondaryActionBtn">Back</label>
				</div>
				<!-- End of status wrapper -->

			</div>
			<!-- End of breadcrumb wrapper -->




		</div>
		<!-- End of head wrapper -->
		<form action="sohSearchArticle.htm" id="sohSubmit" method="get">


			<div class="contentWrapper">

				<div class="articleHead">
					<div class="articleHeaderWrapper">
						<h2 class="articleTitle">98903 - Asahi Beer Super Dry Bottle
							330ml</h2>
						<p>
							<label class="articlePriceLabel">Department: <strong>xxx</strong></label>
							<label class="articlePriceLabel">|</label> <label
								class="articlePriceLabel">Category: <strong>xxx</strong></label>
							<label class="articlePriceLabel">|</label> <label
								class="articlePriceLabel">Sub-category: <strong>xxx</strong></label>
							<label class="articlePriceLabel">|</label> <label
								class="articlePriceLabel">Segment: <strong>xxx</strong></label>
						</p>
					</div>
					<div class="articleActionBtns">
						<label class="actionBtn" id="articleHistory"><label
							class="notepad">History</label></label>
					</div>
				</div>


				<div class="articleContent orderDetails">


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
				<!-- End of article content -->



			</div>
			<!-- End of content wrapper -->

			<input type="hidden" id="multiArtIndex" name="multiArtIndex" value="" />
		</form>
		<input id="navBarHighlight" type="hidden" value="stockManage" />
	</div>

	<%@include file="footer.jsp"%>





	<script>
	//document.forms[0].autocomplete="off";
	$( "#dialog-modal2" ).dialog({				
		autoOpen: false,
		modal: true,
		resizable: false,
		minHeight: 200,
		maxHeight: 600,
		width: 700
	});
	$(".secondaryActionBtn").click(function(e) {

		
		window.location.href="../login/goingHome.htm";
	});
	//$("#dialog-modal2").parent().addClass("popupWrapper");
	
	
	</script>

</body>
</html>
