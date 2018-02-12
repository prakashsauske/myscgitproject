<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="popupContent">

	<div class="popupData popupTitle">

		<h4 class="warning hideBlock">
			Selected supplier: <strong class="vend-name"></strong>
		</h4>

		<label class="linkBtn"><label class="unselect hideBlock">Unselect
				Supplier</label></label>

	</div>
	<!-- End of pop up data -->

	<label id="nodataMsg"></label>
	<div class="popupData" id="popupDataDiv2">
		<div class="tableInfo">

			<div class="">
				<c:if test="${size >0}">
					<h4>
						Total <strong class="total-count-list">${size}</strong> results
						found for '<strong class="searchString">${vendordesc}</strong>'
					</h4>
				</c:if>
				<%-- <c:if test="${size==0}">
	<h4 >
			

	</h4>
	</c:if> --%>
			</div>
			<!-- End of table title -->


		</div>
		<!-- End of table info -->
	</div>
	<!-- End of pop up data -->




	<c:if test="${not empty vendorList}">
		<% int i=0;%>
		<div class="ContentTableWrapper">
			<table class="ContentTable" cellspacing="0">
				<tr>
					<th>Article #</th>
					<th>Description</th>
					<th>SOH</th>
					<th>OM</th>
					<th width="40px" class="centerValue lastColumn">Select</th>
				</tr>

				<c:forEach items="${vendorList}" var="vendorList">

					<tr class="article-list" id="<%=i%>">
						<td id="artNo<%=i%>" class="art-no">${vendorList.articleNo}</td>
						<td id="artName<%=i%>">${vendorList.description}</td>
						<td id="soh<%=i%>">${vendorList.SOH}</td>
						<td id="om<%=i%>">${vendorList.OM}</td>
						<input type="hidden" value="${vendorList.vendorNo}"
							class="vendor-no" />
						<input type="hidden" value="${vendorList.vendorName}"
							class="vendor-name" />
						<td class="sorted centerValue lastColumn"><input
							type="checkbox" class="checkbox"></td>
					</tr>
					<%i++; %>
				</c:forEach>
				<input type="hidden" value="<%=i%>" id="sizeCheck1" />

				<input type="hidden" value="${nodata}" id="nodata" />
				<input type="hidden" value="${divideSubmit}" id="divideSubmit" />
				<input type="hidden" value="${receiveCall}" id="receiveCall" />
				<input type="hidden" value="${receiveCall1}" id="receiveCall1" />

				<input type="hidden" id="msgChk" value="${msgChk}" />

			</table>
		</div>
		<!-- End of content table wrapper -->
	</c:if>
	<div class="popupActionsWrapper">
		<label><strong>Note:</strong> You need to create an order for
			single supplier.</label> <span class="popupActions"> <label
			class="secondaryActionBtn"
			onclick="$('#dialog-modal2').dialog('close');">Cancel</label> <label
			class="actionBtn addToList hideBlock linkBtn2"
			onclick="$('#dialog-modal2').dialog('close');addToList();">Add
				to Order List <span class="list-count hideBlock"></span>
		</label>

		</span>
	</div>
	<!-- End of popup actions-->
</div>
<!-- End of popupContent -->

<Script>
		$(document).ready(function(){
			$('.unselect').click(function(){
				$('.article-list').filter(function(){
					if($(this).find('.checkbox').is(':checked')==true)	
						$(this).find('.checkbox').click();
					});	
				$('.article-list').removeClass('hideBlock');
				$('.list-count,.unselect,.warning,.addToList').addClass('hideBlock');	
				});
			
		});
		function addToList(){
			var strIndex="";
			$('.article-list').filter(function(){
				if($(this).find('.checkbox').is(':checked')==true)	
					{if(strIndex!="")
					strIndex=strIndex+":"+$(this).attr('id');	
					else
					strIndex=$(this).attr('id');}
				});
			$('#desIndex').val(strIndex);
			$('tr td').addClass('cursorProgress');
			var id=$(this).attr("id");
			
			$("#articleNo").val($("#artNo"+id+"").text());
			$("#artNo").val($("#artNo"+id+"").text());
			//$('#desIndex').val(id);
			if($( "#dialog-modal2" ).dialog( "isOpen" ))

                $("#dialog-modal2").dialog( "close" );  
			
			$('#statusImg').removeClass('loading hideBlock');
			$('#statusImg').addClass('loading');
			if($('#divideSubmit').val()=='Y')
				{
			$('#manualOrderSearchSubmit').attr('action','addArticleDescription.htm');
			$('#manualOrderSearchSubmit').attr('method','GET');
			$('#manualOrderSearchSubmit').submit(); 
				}
			else if($('#divideSubmit').val()=='N')
				{
			$('#ibtSite').attr('action','addArticleDescription.htm');
			$('#ibtSite').attr('method','GET');
			$('#ibtSite').submit();
				}

			
			if($('#receiveCall').val()=='M')
			{
		$('#receiveForm').attr('action','addArticleDescriptionDetail.htm');
		$('#receiveForm').attr('method','GET');
		$('#receiveForm').submit();
			}
			if($('#receiveCall1').val()=='O')
			{
		$('#pReqForm').attr('action','addArticlePreqDescriptionDetail.htm');
		$('#pReqForm').attr('method','GET');
		$('#pReqForm').submit();
			}
			if($('#receiveCall1').val()=='P')
			{
		$('#pReqForm').attr('action','addPoArticleDescriptionDetail.htm');
		$('#pReqForm').attr('method','GET');
		$('#pReqForm').submit();
			}			
		}

		function bindMultipleSelect(){
			$('.checkbox').click(function(){
				if($(this).is(':checked')){
					vendorNo=$(this).parent().parent().find('.vendor-no').val();
					$('.article-list').filter(function(){
						if($(this).find('.vendor-no').val()!=vendorNo && $(this).find('.vendor-no').val()!=undefined)	
							$(this).addClass('hideBlock');
					});	
					$('.unselect,.warning,.addToList').removeClass('hideBlock');
					$('.vend-name').text($(this).parent().parent().find('.vendor-name').val());	
								
				}
				else {
					var countFlag=false;
					$('.article-list').filter(function(){
						if($(this).find('.checkbox').is(':checked')==true)	
							countFlag=true;	
					});	
					if(countFlag==false){
						$('.article-list').removeClass('hideBlock');
						$('.unselect,.addToList').addClass('hideBlock');
					if(($('#supplier').val()!="" && $('#supplier').val()!=undefined) || ($('.vendor-name-no').first()!=undefined && $('.vendor-name-no').first().text()!="") || $('#supplier-no-preq').val()!=undefined && $('#supplier-no-preq').val()!="")
							$('.warning').removeClass('hideBlock');
						else
							$('.warning').addClass('hideBlock');	
					}
					else{
						if($('#supplier').val()!="")
						$('.unselect').addClass('hideBlock');
					}
					
				}
				var count=0;
				$('.article-list').filter(function(){
					if($(this).find('.checkbox').is(':checked')==true)	
					count++;	
				});
				if(count==0)
					$('.list-count').addClass('hideBlock');
				else{
					$('.list-count').text('('+count+')');
					$('.list-count').removeClass('hideBlock');
				}
				if(($('#supplier').val()!=undefined && $('#supplier').val()!=""))
					$('.unselect').remove();
				if($('.vend-name').text()=="" || $('.vend-name').text()==undefined)
					$('.vend-name').text("No Vendor Linked");
				if(($('input[name=ibtSiteType]:radio:checked').val()=="Store" || $('input[name=ibtSiteType]:radio:checked').val()=="Warehouse" || $('input[name=sourceSupply]:radio:checked').val()=="2"))
					$('.article-list').removeClass('hideBlock');
				if($('#supplier-no-ibt').val()!=undefined && $('#supplier-no-ibt').val()!="")
					$('.article-list').removeClass('hideBlock');
				$('.total-count-list').text($('.article-list').length-$('.article-list').filter(":hidden").length);
			});

			// End of click
			
			vendorNo=$('.article-list').find('.vendor-no').val();

			//Remove existing Articles
			$('.article-no').filter(function(){
				var artNo=$(this).text().trim();
				$('.article-list').filter(function(){
					if($(this).find('.art-no').text().trim()==artNo)	
						$(this).remove();
				});		
			});
			
			//Remove other vendors
			if($('#supplier').val()!=undefined && $('#supplier').val()!=""){
				vendNo=$('#supplier').val().split('-')[0].trim();
				$('.article-list').filter(function(){
					if($(this).find('.vendor-no').val()!=vendNo && $(this).find('.vendor-no').val()!=undefined)	
						$(this).remove();
				});		
			}

			//Remove unlinked vendor
			if(!($('input[name=ibtSiteType]:radio:checked').val()=="Store" || $('input[name=ibtSiteType]:radio:checked').val()=="Warehouse" || $('input[name=sourceSupply]:radio:checked').val()=="2" || ($('#supplier-no-ibt').val()!=undefined && $('#supplier-no-ibt').val()!=""))){
				$('.article-list').filter(function(){
					if($(this).find('.vendor-no').val()==undefined || $(this).find('.vendor-no').val()=="")	
						$(this).remove();
				});
			}
			
			
			//Remove unselect supplier option in pReq
			if($('#supplier-no-preq').val()!=undefined && $('#supplier-no-preq').val()!=""){
				 vendorNo=parseInt($('#supplier-no-preq').val());
					$('.article-list').filter(function(){
					if($(this).find('.vendor-no').val().trim()!=vendorNo)	
						$(this).remove();
						
				}); 
				$('.unselect').remove();
			}

			if($('#supplier-no-ibt').val()!=undefined && $('#supplier-no-ibt').val()!=""){
				$('.article-list').removeClass('hideBlock');
				$('.unselect,.warning').remove();
			}
			if(($('input[name=ibtSiteType]:radio:checked').val()=="Store" || $('input[name=ibtSiteType]:radio:checked').val()=="Warehouse" || $('input[name=sourceSupply]:radio:checked').val()=="2")){
				$('.article-list').removeClass('hideBlock');
				$('.unselect,.warning').remove();
			}
			if($('#supplier-no-ibt').val()!=undefined && $('#supplier-no-ibt').val()!=""){
				$('.article-list').removeClass('hideBlock');
				$('.unselect,.warning').remove();
			}

			
			vendName="";
			if($('.article-no').length!=0){
				$('.warning').removeClass('hideBlock');
				if($('#supplier').val()!=undefined && $('#supplier').val()!=""){
					vendName=$('#supplier').val().split('-')[1];
					vendorNo=$('#supplier').val().split('-')[0].trim();
					$('.article-list').filter(function(){
						if($(this).find('.vendor-no').val().trim()!=vendorNo)	
							$(this).remove();
					});	
				}
				else if($('#supplier-name-preq').val()!=undefined && $('#supplier-name-preq').val()!="")
					vendName=$('#supplier-name-preq').val();				
			}
			else{
			$('.warning').removeClass('hideBlock');
			if($('#supplier').val()!=undefined && $('#supplier').val()!="")
					vendName=$('#supplier').val().split('-')[1];
			if($('#supplier-name-preq').val()!=undefined && $('#supplier-name-preq').val()!="")
					vendName=$('#supplier-name-preq').val();
			}
			$('.total-count-list').text($('.article-list').length-$('.article-list').filter(":hidden").length);
			setTimeout(function(){
				if($('.article-list').length==0){
						if($('#articleNo').val()!=undefined)
						articleNo=$('#articleNo').val();
					else
						articleNo=$('#artEan').val();
					var articleType=$('input[name=articleType]:radio:checked').val();
					if(($('input[name=ibtSiteType]:radio:checked').val()=="Store" || $('input[name=ibtSiteType]:radio:checked').val()=="Warehouse" || $('input[name=sourceSupply]:radio:checked').val()=="2") || ($('#supplier-no-ibt').val()!=undefined && $('#supplier-no-ibt').val()!=""))
						msg="Article(s) of  description '<strong>"+articleNo+"</strong>' are already added to the list"
					else if(articleType=="description")
						msg="Article(s) of  description '<strong>"+articleNo+"</strong>' related to the vendor '<strong>"+vendorNo+"</strong>' are already added to the list"
					else if(articleType=="ArticleNumber")
						msg="Article number '<strong>"+articleNo+"</strong>' related to the vendor '<strong>"+vendorNo+"</strong>' is already added to the list"
					else
						msg="Article EAN '<strong>"+articleNo+"</strong>' related to the vendor '<strong>"+vendorNo+"</strong>' is already added to the list"
					$('.dialog-modal2 .popupData').html('');
					$('.dialog-modal2 #popupDataDiv2').css('height','95px').html(msg);
					$('.dialog-modal2 .ContentTableWrapper,.dialog-modal2 .secondaryActionBtn').addClass('hideBlock');
					$('.dialog-modal2 .addToList').removeClass('hideBlock').removeAttr('onclick').html('OK').attr('onclick','$("#dialog-modal2").dialog("close");');
				}
				},50);
			$('.vend-name').text(vendName);	
			$('.warning').removeClass('hideBlock');
			if(vendName=="" || vendName==undefined)
				$('.warning,.unselect').addClass('hideBlock');
		}
		</Script>
