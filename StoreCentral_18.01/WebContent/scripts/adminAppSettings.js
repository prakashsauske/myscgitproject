var manageMenuMap = {};
var activityTabContent = '';
var activityTabContent_rf = '';
var activityTabContentForAllRoles = '';
var activityTabContentForAllRoles_rf = '';
var clickCount = 1;
var currentSaleOrg = '';
var currentBan = '';
var currentRoleId = '';
var $clickedAddItem = '';
var allRoleExcludeInfoMap = {};
var allRoleAccessInfoMap = {};
var roleMap = {};
var roleArray = [];
var allRoleText = '';
var functionsMap = {};
var oldAllRowCheckBoxChecked = '';
var oldAllRowCheckBoxUnChecked = '';
var oldRowCheckBoxChecked = '';
var oldRowCheckBoxUnChecked = '';
var oldReadRadioChecked = '';
var oldReadRadioUnChecked = '';
var oldFullRadioChecked = '';
var oldFullRadioUnchecked = '';
var oldAllCheckBoxChecked = '';
var oldAllCheckBoxUnchecked = '';
var oldIncludeStoreLabel = '';
var oldExcludeStoreLabel = '';
var currentPlatform = 'BW';
$(document)
  .ready(function() {
    // add store pop up, called the below code to configure the
    // pop up
    // Edit functions popup
    $("#dialog-editFunctions")
      .dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        minHeight: 200,
        width: 400
      });
    $("#dialog-editFunctions")
      .parent()
      .addClass("popupWrapper");
    // replicate settings pop up, called the below code to
    // configure the
    // pop up
    $("#dialog-replicate")
      .dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        minHeight: 200,
        maxHeight: 600,
        width: 550
      });
    $("#dialog-replicate")
      .parent()
      .addClass("popupWrapper");
    // alert box pop up, called the below code to configure the
    // pop up
    $("#dialog-modal")
      .dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        minHeight: 100,
        maxHeight: 600,
        width: 400
      });
    $("#dialog-modal")
      .parent()
      .addClass("popupWrapper");
    // to create the sales org tab, below code is used
    $('#platform-tab').tabs();
    $("#tabs-BW,#tabs-RF")
         .tabs({
           collapsible: true,
           active: false
     });
    // to set the role tab as vertical tab
    $(".roleTabs ul")
      .addClass("ui-tabs-role");
    $(".roleTabs li")
      .removeClass("ui-corner-top")
      .addClass("ui-corner-left");
    // Code to show and hide add Aisle
    $("#addActionBtn,#dialog-editFunctions #closeLink")
      .click(function() {
        $("#tableAddAction")
          .removeClass('hideBlock');
        $('.verifyNm')
          .val('')
          .focus();
        $("#tableAddAction .errorDiv")
          .addClass('hideBlock');
      });
    // Code to show and hide add Aisle
    $("#dialog-editFunctions #closeLink")
      .click(function() {
        $("#tableAddAction")
          .addClass('hideBlock');
        // $('.verifyNm').val('').focus();
      });
    $(document)
      .keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          if ($("#dialog-editFunctions")
            .dialog('isOpen')) {
            $('.verifyStore')
              .click();
          }
        }
      });
    // Back button click
    $('#backBtn')
      .click(function() {
        window.location.replace("../login/homepage.htm");
      });
    // For Replicate Settings, to configure replicate settings
    // wizard
    $("#wizard")
      .jWizard();
    // $('.tabContent').tabs();
    $(".jw-button-finish span")
      .text("Apply");
    $("#menu")
      .menu({
        position: {
          my: "right top",
          at: "right top+20"
        }
      });
    // forming the acitivity content for the first time
    formActivityTabsContent();
    // forming the acitivity content for all roles for the first
    // time
    formAllRolesActivityTabsContent();
    // after forming the content, on click of role, append the
    // content
    // and form the tab
    $('.roleTabs li').click(function() {
        if ($(this).hasClass('ui-tabs-active')) {
          currentRoleId = $(this).find('a').attr('id');
          if (currentRoleId == 'allRoles') {
            currentRoleId = 'all';
          }
          formActivityTab();
          bindActivityContent();
          disableAllRoles();
          if (currentRoleId != 'all') {
            getUncheckDetails(true);
          }
          if (currentRoleId == 'all') {
            getAllRoleExcludeDtl(2);
            findUncheckedEnabledCheckboxes();
            $('.replicate').parent().addClass('hideBlock');
          } else {
            $('.replicate').parent().removeClass('hideBlock');
          }
          var tab = $(this).children().attr('href');
          $('.menuTabs:visible div').removeClass('hideBlock');
          if ($('.menuTabs:visible').find('tr:visible').length == 2 && $('.menuTabs:visible').find('tr:visible').length == 0) {
            $('.menuTabs:visible .nofunctions').removeClass('hideBlock');
            $('.menuTabs:visible div').addClass('hideBlock');
            $('.menuTabs:visible ul li').removeClass('ui-tabs-active').removeClass('ui-state-active');
          } else {
            $('.menuTabs div').removeClass('hideBlock');
            $('.menuTabs:visible .nofunctions').addClass('hideBlock');
          }
          var isEditable = $(tab).find('.menuTabs div').is(':visible');
          if (!isEditable) {
            $('.functionsTabs:visible .pageActions').addClass('hideBlock');
          } else {
            $('.functionsTabs:visible .pageActions').removeClass('hideBlock');
          }
        }
        // Adjusting the step 3 margin
        $('.ui-menus-panel.ui-tabs-panel')
          .width($('.ui-vertical-tabs:visible')
            .width() - $('.ui-tabs-role.ui-tabs-nav:visible')
            .width() - 35);
        $('.ui-menus-panel.ui-tabs-panel')
          .css('min-height', $('.sales-org-tab')
            .height - 10);
      });
    $('.salesOrgTab')
      .click(function() {
        if ($(this)
          .parent()
          .hasClass('ui-tabs-active')) {
          // to create the role tab, below
          // code is used
          $(".roleTabs")
            .tabs({
              collapsible: true,
              active: false
            })
            .addClass("ui-helper-clearfix");
          currentSaleOrg = this.id;
          currentBan = this.text;
          getAllRoleDetails(1);
          var selectedSalesOrgId = $(this)
            .attr('href');
          var isAnyRoleSelected = $(selectedSalesOrgId)
            .find('.roleTab')
            .parent()
            .hasClass('ui-tabs-active');
          if (isAnyRoleSelected) {
            currentRoleId = $('.roleTabs:visible li.full-width.ui-tabs-active a')
              .attr('id') != '' ? $('.roleTabs:visible li.full-width.ui-tabs-active a')
              .attr('id') : '';
            if (currentRoleId == 'allRoles') {
              currentRoleId = 'all';
            }
          } else {
            currentRoleId = '';
          }
        }
      });
    // verify and add button click on add store pop up
    $('.verifyStore')
      .click(function() {
        $("#dialog-editFunctions .errorDiv ")
          .addClass('hideBlock');
        $("#dialog-editFunctions .errorDiv label")
          .text('');
        var storeNo = $('.verifyNm')
          .val()
          .trim();
        if (storeNo == '') {
          $("#dialog-editFunctions .errorDiv ")
            .removeClass('hideBlock');
          $("#dialog-editFunctions .errorDiv label")
            .text('Please fill the store numer');
          $('.verifyNm')
            .focus();
        } else if ($("#dialog-editFunctions tr#" + storeNo)
          .length == 0) {
          $.ajax({
            type: "get",
            url: "verifySiteNo.htm",
            data: {
              siteNo: $('.verifyNm')
                .val()
                .trim(),
              salesOrg: currentSaleOrg
            },
            beforeSend: function() {
              startLoading();
            },
            success: function(response) {
              var content = '';
              if (response != 'false' && response != 'mandatory' && currentSaleOrg == response.split('-')[1] ) {
                content += '<tr id="' + response.split('-')[2] + '" class="appended" ><td>' + response.split('-')[2] + ' - ' + response.split('-')[3] + '</td>' + '<td class="centerValue"><label class="linkBtn" id="DeleteExpiryRecord-1"> <label class="deleteRecord">Delete</label>' + '</label></td></tr>';
                $("#dialog-editFunctions tbody")
                  .append(content);
                bindAddStoreContent();
                $('.verifyNm')
                  .val('')
                  .focus();
              }else if (response != 'false' && (currentSaleOrg != response.split('-')[1])) {
            	  $("#dialog-editFunctions .errorDiv ")
                  .removeClass('hideBlock');
                $("#dialog-editFunctions .errorDiv label")
                  .text('Invalid Store no. for the '+currentBan+' Banner');
                $('.verifyNm')
                  .focus();
              }
                            
              else {
                $("#dialog-editFunctions .errorDiv ")
                  .removeClass('hideBlock');
                $("#dialog-editFunctions .errorDiv label")
                  .text('Invalid Store no.');
                $('.verifyNm')
                  .focus();
              }
              stopLoading();
            },
            error: function() {
              // $(
              // "#dialog-editFunctions").dialog('open');//.removeClass('visible-hide');
              $("#dialog-editFunctions .errorDiv ")
                .removeClass('hideBlock');
              $("#dialog-editFunctions .errorDiv label")
                .text('Invalid Store no.');
              $('.verifyNm')
                .focus();
            }
          });
        } else {
          $("#dialog-editFunctions .errorDiv ")
            .removeClass('hideBlock');
          $("#dialog-editFunctions .errorDiv label")
            .text('Store already added in the list');
          $('.verifyNm')
            .focus();
        }
      });
    bindAddStoreContent();
    $('.save-app-settings')
      .unbind('click');
    $('.save-app-settings')
      .click(function() {
        if (currentRoleId != 'all') {
          saveApplicationSettings();
        } else {
          saveAllRoleSet();
        }
      });
    $('.replicate')
      .click(function() {
        if (!$('.replicate')
          .parent()
          .hasClass('disabled')) {
          startLoading();
          openReplicateSettings();
          bindReplicateSettingsContent();
          findUncheckedEnabledCheckboxesinReplicatePopUp();
          $('.jw-menu-wrap li:first')
            .click();
          stopLoading();
        }
      });
    $("#dialog-modal-alertBox")
      .dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        minHeight: 120,
        maxHeight: 600,
        width: 350
      });
    $("#dialog-modal-alertBox")
      .parent()
      .addClass("popupWrapper");
    // added for defect no 114 to allow only numbers in the store no field 
    $(".verifyNm")
      .keypress(function(e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
          //display error message
          return false;
        }
      });
    //temp fix for ignore Repares for bigW
    /*$('body')
      .on('click', '[href="#menuTabs-1060-all-RC"]', function() {
        $('#menuTabs-1060-all-RC')
          .find('input')
          .prop('disabled', true);
        //$('.save-app-settings').addClass('hideBlock');
      });*/
  });

function setPlateForm(platform){
	currentPlatform = platform;
}
function openReplicateSettings() {
  var newLi = '<ul>';
  var copyLi = $('.menuTabs:visible li');
  var copyDiv = $('.menuTabs:visible div');
  var newInnerDivStart = '<div class="ContentTableWrapper"><label class="help-text nofunctions hideBlock">There are no activities available for this function.</label><table cellspacing="0" class="ContentTable"><thead><tr>' + '<th class="centerValue" width="10px"><input type="checkbox" class="select-all-menu" name="sel" checked="checked" ></th>' + '<th class="lastColumn">Activities</th></tr></thead><tbody>';
  var newInnerDivEnd = '</tbody></table></div>';
  var totalDivContent = '';
  var indDivContent = '';
  copyLi.filter(function() {
    var text = $(this)
      .find('a')
      .text();
    var link = $(this)
      .find('a')
      .attr('href');
    var newLink = link.split('-')[0] + '-' + link.split('-')[1] + '-' + 'replic' + '-' + link.split('-')[3];
    newLi += '<li><a href="' + newLink + '">' + text + '</a></li>';
  });
  newLi += '</ul>';
  // //console.log(newLi)
  copyDiv.filter(function() {
    var oldId = $(this)
      .attr('id');
    var newId = oldId.split('-')[0] + '-' + oldId.split('-')[1] + '-' + 'replic' + '-' + oldId.split('-')[3];
    indDivContent = '<div id="' + newId + '">' + newInnerDivStart;
    $(this)
      .find('tr.collapsed')
      .filter(function() {
        indDivContent += '<tr id="' + $(this)
          .attr('id') + '"><td class="centerValue"><input class="menu-checkbox" type="checkbox"';
        /*
         * if($(this).find('td
         * .menu-checkbox').prop('checked')){
         * indDivContent += ' checked '; }
         */
        /*if ($(this)
          .find('td .menu-checkbox')
          .prop('disabled')) {
          indDivContent += ' disabled ';
        } else if ($(this)
          .find('td .menu-checkbox')
          .prop('checked')) {
          indDivContent += ' checked ';
        }*/
        indDivContent += '></td><td class="lastColumn">' + $(this)
          .find('td:first')
          .next()
          .find('label')
          .text() + '</td></tr>';
      });
    totalDivContent += indDivContent + newInnerDivEnd + '</div>';
  });
  // //console.log(totalDivContent)
  var newRoleContent = '<thead><tr><th class=" centerValue" width="10px"><input class="select-all-menu" type="checkbox" name="sel"></th>' + '<th class="lastColumn">Roles</th></tr></thead>';
  var copyRolesLi = $('.roleTabs:visible li.full-width');
  copyRolesLi.filter(function() {
    if ($(this)
      .find('a')
      .attr('id') == currentRoleId) {
      $('#dialog-replicate .popupData .alertText strong')
        .text($(this)
          .find('a')
          .text());
    } else {
      if ($(this)
        .find('a')
        .text() != 'All Roles') newRoleContent += '<tr id="' + $(this)
        .find('a')
        .attr('id') + '"><td class=" centerValue"><input type="checkbox" class="menu-checkbox" name="sel"></td><td class="lastColumn">' + $(this)
        .find('a')
        .text() + '</td></tr>';
    }
  });
  // //console.log(newRoleContent);
  $('.step-2-form table')
    .html(newRoleContent);
  $('#functions')
    .html(newLi + totalDivContent);
  if ($('.tabContent #functions')
    .hasClass('ui-tabs')) {
    $('.tabContent #functions')
      .tabs('destroy');
  }
  $('.tabContent #functions')
    .tabs();
  // var flag = 'Y';
  $('#dialog-replicate')
    .dialog('open');
  // getUncheckDetails(flag);
  $('#functions li')
    .unbind('click');
  $('#functions li')
    .click(function() {
      findUncheckedEnabledCheckboxesinReplicatePopUp();
    });
}

function formActivityTabsContent() {
  // rootCodeMap its defined in the userAccess.js file
  // if any new tab created in the nav bar please update the rootCodeMap
  //var currentSalesOrg=$('.salesOrgTab ').parent('.ui-state-active').attr('aria-labelledby');
  if (manageMenuMapJson != null && manageMenuMapJson != undefined && manageMenuMapJson != '' && $.parseJSON(manageMenuMapJson) != undefined && rootCodeMap != null && rootCodeMap != undefined) {
    manageMenuMap = $.parseJSON(manageMenuMapJson);
    var list = [];
    var ul_content = '<ul class="ui-tabs-menus">';
    var div_table_content = '<label class="help-text">Define access level and stores for each activities within <span></span></label>' + '<table cellspacing="0" class="ContentTable treetable drilldownTable" id="initial-"><tbody><tr>' + '<th rowspan="2" width="10px"><input type="checkbox" class="select-all-menu allRowCheckBox" checked="checked"></th>' + '<th rowspan="2">Activities</th><th class="centerValue columnDivider" colspan="2">Access Level</th>' + '<th class="centerValue columnDivider" colspan="2">Include Stores</th>' + '<th class="centerValue columnDivider" rowspan="2" width="50px">Exclude Stores</th></tr>' + '<tr class="subHeader"><th class="centerValue" width="85px">Read Only</th>' + '<th class="centerValue columnDivider" width="85px">Full</th>' + '<th class="centerValue" width="85px">All</th>' + '<th class="centerValue columnDivider" width="85px">Only a few </th></tr>';
    var div_end_content = '</tbody></table><label class="legend-text">Legend: <strong>Read Only</strong> - View Access, ' + '<strong>Full</strong> - View, Add & Edit Access </label></div>';
    var div_inner_content = '';
    var div_main_content = '';
    var div_noFunctions_content = '<label class="help-text nofunctions hideBlock">There are no activities available for this function.</label>';
    var div_start_content='';
    var div_end_content_rf = '</tbody></table><label class="legend-text">Legend: <strong>Read Only</strong> - View Access, ' + '<strong>Full</strong> - View, Add & Edit Access </label></div>';
    var ul_content_rf = '<ul class="ui-tabs-menus">';
    var div_inner_content_rf = '';
    var div_main_content_rf = '';
	var div_start_content_rf='';
    for (m in manageMenuMap) {
      //added to ignore repair centre for BIGw
      //if(currentSalesOrg=='1060' && m=='RC') continue;
      	if(m!=null && m!=undefined && m.split('_').length >1){
			if(m.split('_')[2] == 'BW'){
				list = manageMenuMap[m];

				ul_content += '<li><a href="#menuTabs-' + m + '">' + $(rootCodeMap)
				.attr(m) + '</a></li>';
				div_start_content = '<div id="menuTabs-' + m + '" class="ui-menus">';
				div_inner_content = '';
				for (var i = 0; i < list.length; i++) {
				div_inner_content += '<tr id="row-' + list[i].code + '" data-tt-id="1" class="drillsOpenDefault collapsed">' + '<td><span class="indenter" style="padding-left: 0px;"></span><input class="menu-checkbox rowCheckBox" type="checkbox" ></td>' + '<td><label>' + list[i].description + '</label></td><td class="centerValue columnDivider"><input class="read-only readRadio" type="radio" disabled="disabled" name="access-radio-' + m + '-' + i + list[i].code + '" /></td>' + '<td class="centerValue columnDivider"><input type="radio" class="full-acc fullRadio" disabled="disabled"  name="access-radio-' + m + '-' + i + list[i].code + '" checked /></td>' + '<td id="startDate-1" class="centerValue "><input class="all-store-checkbox allCheckBox" disabled="disabled"  type="checkbox" checked="checked"/></td>' + '<td id="endDate-1" class="centerValue include-store  columnDivider">' + '<label class="linkBtn"><a class="disable"><label class="addRow includeStore addBtn hideBlock includeStoreLabel">Add</label></a></label></td>' + '<td class="centerValue exclude-store columnDivider">' + '<label class="linkBtn"><a class="disable"><label class="addRow excludeStore addBtn excludeStoreLabel">Add</label></a></label></td></tr>';
				}
				div_main_content += (div_start_content + div_table_content + div_inner_content + div_end_content);
			}else{
				list = manageMenuMap[m];

				ul_content_rf += '<li><a href="#menuTabs-' + m + '">' + $(rootCodeMap).attr(m) + '</a></li>';
				div_start_content_rf = '<div id="menuTabs-' + m + '" class="ui-menus">';
				div_inner_content_rf = '';
				for (var i = 0; i < list.length; i++) {
				div_inner_content_rf += '<tr id="row-' + list[i].code + '" data-tt-id="1" class="drillsOpenDefault collapsed">' + '<td><span class="indenter" style="padding-left: 0px;"></span><input class="menu-checkbox rowCheckBox" type="checkbox" ></td>' + '<td><label>' + list[i].description + '</label></td><td class="centerValue columnDivider"><input class="read-only readRadio" type="radio" disabled="disabled" name="access-radio-' + m + '-' + i + list[i].code + '" /></td>' + '<td class="centerValue columnDivider"><input type="radio" class="full-acc fullRadio" disabled="disabled"  name="access-radio-' + m + '-' + i + list[i].code + '" checked /></td>' + '<td id="startDate-1" class="centerValue "><input class="all-store-checkbox allCheckBox" disabled="disabled"  type="checkbox" checked="checked"/></td>' + '<td id="endDate-1" class="centerValue include-store  columnDivider">' + '<label class="linkBtn"><a class="disable"><label class="addRow includeStore addBtn hideBlock includeStoreLabel">Add</label></a></label></td>' + '<td class="centerValue exclude-store columnDivider">' + '<label class="linkBtn"><a class="disable"><label class="addRow excludeStore addBtn excludeStoreLabel">Add</label></a></label></td></tr>';
				}
				div_main_content_rf += (div_start_content_rf + div_table_content + div_inner_content_rf + div_end_content_rf);
			}
		}
    }
    ul_content += '</ul>';
	ul_content_rf += '</ul>';
    activityTabContent = (ul_content + div_noFunctions_content + div_main_content);
	activityTabContent_rf = (ul_content_rf + div_noFunctions_content + div_main_content_rf);
  }
}

function formAllRolesActivityTabsContent() {
  // rootCodeMap its defined in the userAccess.js file
  // if any new tab created in the nav bar please update the rootCodeMap
  if (manageMenuMapJson != null && manageMenuMapJson != undefined && manageMenuMapJson != '' && manageMenuMap != undefined && manageMenuMap != null && manageMenuMap != '' && rootCodeMap != null && rootCodeMap != undefined) {
    var ul_content = '<ul class="ui-tabs-menus">';
	var ul_content_rf = '<ul class="ui-tabs-menus">';
    var div_table_content = '<label class="help-text">Activate activities access across roles</label>' + '<table cellspacing="0" class="ContentTable treetable drilldownTable" id="initial-"><tbody><tr>' + '<th rowspan="2" width="10px"><input type="checkbox" class="select-all-menu allRowCheckBox" checked="checked" ></th>' + '<th rowspan="2">Activities</th><th class="" colspan="2" style="text-align: center;">Current Access Level (for Roles)</th></tr>' + '<tr class="subHeader"><th class="" style="width: 35%;text-align: center;" >Read Only</th>' + '<th class=" columnDivider" style="width: 35%;text-align: center;" >Full</th></tr>';
    var div_end_content = '</tbody></table><label class="legend-text">Legend: <strong>Read Only</strong> - View Access, ' + '<strong>Full</strong> - View, Add & Edit Access </label></div>';
    var list = [];
    var div_inner_content = '';
    var div_main_content = '';
	var div_inner_content_rf = '';
    var div_main_content_rf = '';
    for (m in manageMenuMap) {
			list = manageMenuMap[m];
			div_start_content = '<div id="menuTabs-' + m + '" class="ui-menus">';
		if(m!= null && m!=undefined && m.split('_').length>1){
			if(m.split('_')[2] == 'BW'){
				ul_content += '<li><a href="#menuTabs-' + m + '">' + $(rootCodeMap).attr(m) + '</a></li>';
				div_inner_content = '';
				for (var i = 0; i < list.length; i++) {
					div_inner_content += '<tr id="row-' + list[i].code + '" data-tt-id="1" class="drillsOpenDefault collapsed">' + '<td><span class="indenter" style="padding-left: 0px;"></span><input class="menu-checkbox rowCheckBox" type="checkbox" ></td>' + '<td> <label>' + list[i].description + '</label></td><td class=" columnDivider read-only-text" style="width: 35%;"></td>' + '<td class=" columnDivider  full-text" style="width: 35%;"></td></tr>';
				}
				div_main_content += (div_start_content + div_table_content + div_inner_content + div_end_content);
			}else{
				ul_content_rf += '<li><a href="#menuTabs-' + m + '">' + $(rootCodeMap).attr(m) + '</a></li>';
				div_inner_content_rf = '';
				for (var i = 0; i < list.length; i++) {
					div_inner_content_rf += '<tr id="row-' + list[i].code + '" data-tt-id="1" class="drillsOpenDefault collapsed">' + '<td><span class="indenter" style="padding-left: 0px;"></span><input class="menu-checkbox rowCheckBox" type="checkbox" ></td>' + '<td> <label>' + list[i].description + '</label></td><td class=" columnDivider read-only-text" style="width: 35%;"></td>' + '<td class=" columnDivider  full-text" style="width: 35%;"></td></tr>';
				}
				div_main_content_rf += (div_start_content + div_table_content + div_inner_content_rf + div_end_content);
			}
		}
    }
    ul_content += '</ul>';
	ul_content_rf += '</ul>';
    activityTabContentForAllRoles = (ul_content + div_main_content);
	activityTabContentForAllRoles_rf = (ul_content_rf + div_main_content_rf);
  }
}

function formActivityTab() {
  if ($('.menuTabs:visible li').length == 0 && activityTabContent != '' && activityTabContent != undefined) {
	var flag= (currentPlatform == 'RF' ? true : false);
    if (currentRoleId != 'all'){
    	$('.menuTabs:visible').html(flag ? activityTabContent_rf : activityTabContent);
    }else{
    	$('.menuTabs:visible').html(flag ? activityTabContentForAllRoles_rf : activityTabContentForAllRoles);
    }
    
    $('.ui-tabs-menus li').click(function() {
        $('help-text span').text($(this).find('a').text());
      });
    
    // change the content id's based on the sales org and role
    var salesOrg = '';
    var platform = '';
    try {
      var $menu = $('.menuTabs:visible');
      $menu.filter(function() {
        //console.log();
    	salesOrg = $(this).attr('id').split('-')[2];
        var roleId = $(this).attr('id').split('-')[3];
        var $div = $(this).find('div');
        var $li = $(this).find('li a');
        $li.filter(function() {
        	if(($(this).attr('href').split('-')[1] == 'RC_BW' && salesOrg != '1060')){
        		$(this).addClass('hideBlock');
        	}
    		$(this).attr('href', $(this).attr('href').split('-')[0] + '-' + salesOrg + '-' + roleId + '-' + $(this).attr('href').split('-')[1]);
        });
        $div.filter(function() {
        	if(($(this).attr('id').split('-')[1] == 'RC_BW' && salesOrg != '1060')){
        		$(this).addClass('hideBlock');
        	}
    		$(this).attr('id', $(this).attr('id').split('-')[0] + '-' + salesOrg + '-' + roleId + '-' + $(this).attr('id').split('-')[1]);
        });
      });
      // changed the radio button id with sales org
      $('.drillsOpenDefault:visible').filter(function() {
          if ($(this).find('input:radio') != undefined && $(this).find('input:radio') != null 
        		  && $(this).find('input:radio').attr('name') != undefined && $(this).find('input:radio').attr('name') != null) 
        	  $(this).find('input:radio').attr('name', $(this).find('input:radio').attr('name').replace('radio', salesOrg + '-' + currentRoleId));
        });
    } catch (err) {
      //console.log(err);
    }
    // trigger the horizantal tabs
  }
  $(".menuTabs:visible")
    .tabs({
      collapsible: true,
      active: false
    });
}

function bindActivityContent() {
  $('.all-store-checkbox').unbind('click');
  $('.all-store-checkbox').click(function() {
      if ($(this).is(':checked')) {
        $(this).parent().parent().find('td .includeStore').removeClass('addRow').addClass('hideBlock');
        $(this).parent().parent().find('td .excludeStore').removeClass('addRow').addClass('addRow addBtn').removeClass('hideBlock');
        $(this).parent().parent().find('.grey').removeClass('disable').removeClass('grey');
      } else {
        $(this).parent().parent().find('td .includeStore').removeClass('addRow').addClass('addRow addBtn').removeClass('hideBlock');
        $(this).parent().parent().find('td .excludeStore').removeClass('addRow').addClass('hideBlock');
        $(this).parent().parent().find('.grey').removeClass('disable').removeClass('grey');
      }
      if ($(this).closest('tr').find('.addBtn:visible').text().trim() != 'Add') {
        $(this).closest('tr').find('.addBtn:visible').removeClass('addRow');
      }
      unbindAddBtn();
    });
  
  $('.select-all-menu').unbind('click');
  $('.select-all-menu').click(function() {
      if ($(this).is(':checked')) {
        $(this).closest('table').find('.menu-checkbox:not(:disabled)').prop('checked', true);
        var $reqContent = $(this).closest('table').find('.menu-checkbox:visible:not(:disabled):checked').closest('tr');
        $reqContent.find('input[type="radio"]').removeAttr('disabled');
        $reqContent.find('.all-store-checkbox').removeAttr('disabled');
        $reqContent.find('.addBtn').parent().removeClass('disable').removeClass('grey');
        unbindAddBtn();
      } else {
        $(this)
          .closest('table')
          .find('.menu-checkbox:not(:disabled)')
          .prop('checked', false);
        $(this)
          .closest('table')
          .find('input[type="radio"]')
          .attr('disabled', 'disabled'); /* .removeAttr('checked'); */
        $(this)
          .closest('table')
          .find('input[type="radio"]')
          .attr('disabled', 'disabled');
        $(this)
          .closest('table')
          .find('.all-store-checkbox')
          .attr('disabled', 'disabled');
        $(this)
          .closest('table')
          .find('.addBtn')
          .parent()
          .unbind('click');
        $(this)
          .closest('table')
          .find('.addBtn')
          .parent()
          .addClass('disable')
          .addClass('grey');
      }
    });
  $('.menu-checkbox')
    .unbind('click');
  $('.menu-checkbox')
    .click(function() {
      $(this)
        .closest('table')
        .find('.select-all-menu')
        .prop('checked', false);
      if ($(this)
        .is(':checked')) {
        $(this)
          .closest('tr')
          .find('input[type="radio"]')
          .removeAttr('disabled');
        $(this)
          .parent()
          .parent()
          .find('.all-store-checkbox')
          .removeAttr('disabled');
        $(this)
          .parent()
          .parent()
          .find('.addBtn')
          .parent()
          .removeClass('disable')
          .removeClass('grey');
        if ($(this)
          .parent()
          .parent()
          .closest('table')
          .find('.menu-checkbox:visible:not(:disabled):checked')
          .length == $(this)
          .parent()
          .parent()
          .closest('table')
          .find('.menu-checkbox:visible:not(:disabled)')
          .length) {
          $(this)
            .parent()
            .parent()
            .closest('table')
            .find('tr:first')
            .find('th:first')
            .find('.select-all-menu')
            .prop('checked', true);
        }
      } else {
        $(this)
          .closest('tr')
          .find('input[type="radio"]')
          .attr('disabled', 'disabled');
        $(this)
          .parent()
          .parent()
          .find('.all-store-checkbox')
          .attr('disabled', 'disabled');
        $(this)
          .parent()
          .parent()
          .find('.includeStore')
          .text('Add')
          .removeClass('addRow')
          .addClass('addRow')
          .removeClass('storeCntPadding');
        $(this)
          .parent()
          .parent()
          .find('.excludeStore')
          .text('Add')
          .removeClass('addRow')
          .addClass('addRow')
          .removeClass('storeCntPadding');
        $(this)
          .parent()
          .parent()
          .find('.addBtn')
          .parent()
          .unbind('click');
        $(this)
          .parent()
          .parent()
          .find('.addBtn')
          .parent()
          .addClass('disable')
          .addClass('grey');
      }
      unbindAddBtn();
    });
  $('.functionsTabs:visible .pageActions')
    .addClass('hideBlock');
  $('.menuTabs li')
    .unbind('click');
  $('.menuTabs li')
    .click(function() {
      $('.menuTabs:visible div')
        .removeClass('hideBlock');
      findUncheckedEnabledCheckboxes();
      if ($(this)
        .hasClass('ui-tabs-active')) {
        if ($('.menuTabs:visible')
          .find('tr:visible')
          .length != 2 && $('.menuTabs:visible')
          .find('tr:visible')
          .length != 0) {
          $('.functionsTabs:visible .pageActions')
            .removeClass('hideBlock');
          $('.menuTabs:visible .nofunctions')
            .addClass('hideBlock');
          $('.menuTabs:visible div')
            .removeClass('hideBlock');
        } else if ($('.menuTabs:visible')
          .find('tr:visible')
          .length == 2) {
          $('.functionsTabs:visible .pageActions')
            .addClass('hideBlock');
          $('.menuTabs:visible .nofunctions')
            .removeClass('hideBlock');
          $('.menuTabs:visible div')
            .addClass('hideBlock');
        }
      } else if (!$(this)
        .hasClass('ui-tabs-active')) {
        $('.functionsTabs:visible .pageActions')
          .addClass('hideBlock');
        $('.menuTabs:visible .nofunctions')
          .addClass('hideBlock');
      }
      /*
       * setTimeout(function(){
       * if($('.drillsOpenDefault:visible').length==0){
       * $('.functionsTabs:visible
       * .pageActions').addClass('hideBlock');
       * $('.ui-menus:visible').html('<label
       * class="help-text">No function available to select.</label>'); }
       * else{ $('.functionsTabs:visible
       * .pageActions,.ui-menus:visible').removeClass('hideBlock'); }
       * },2);
       */
    });
  unbindAddBtn();
}

function unbindAddBtn() {
  // add store button click event
  $('.addBtn')
    .parent()
    .unbind('click');
  $('.addBtn')
    .parent()
    .click(function() {
      if (!($(this)
          .hasClass('disable'))) {
        $clickedAddItem = $(this);
        hideEditPopError();
        $("#dialog-editFunctions tbody .appended")
          .remove();
        if ($(this)
          .find('label')
          .text()
          .trim() == 'Add') {
          $("#dialog-editFunctions")
            .dialog('open');
          $('.addstore-popup-save-btn')
            .unbind('click');
          $('.addstore-popup-save-btn')
            .click(function() {
              if ($('#dialog-editFunctions .ContentTable tbody tr')
                .length > 1) {
                saveStore();
              } else {
                $("#addActionBtn")
                  .trigger('click');
                $("#dialog-editFunctions .errorDiv ")
                  .removeClass('hideBlock');
                $("#dialog-editFunctions .errorDiv label")
                  .text('Please add a store to save.');
              }
            });
        } else {
          var id = $(this)
            .closest('tr')
            .attr('id')
            .split('-')[1];
          openAddStoreContent(id);
        }
      }
    });
}

function getUncheckDetails(flag) {
	
  $.ajax({
    url: "getExcludeOption.htm",
    data: {
      salesOrg: currentSaleOrg,
      platform: currentPlatform,
      roleId: currentRoleId != null && currentRoleId != undefined && currentRoleId != 'all' ? currentRoleId : '',
      accessLevel: currentRoleId != null && currentRoleId != undefined && currentRoleId != 'all' ? '' : "1"
    },
    type: "get",
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      var output = '';
      var list = [];
      if (response != null && response != undefined && response != '' && $.parseJSON(response) != undefined) {
        output = $.parseJSON(response);
        functionsMap = output.activityOptionsMapJson;
        if (functionsMap != null && functionsMap != '' && functionsMap != undefined) {
          for (m in functionsMap) {
            list = functionsMap[m];
            var storeList = [];
            if (list.length > 1) {
              storeList = list[1];
            } else {
              storeList = list[0];
            }
            var $content_div = '';
            $content_div = $('#menutabs-' + currentPlatform+ '-'  + currentSaleOrg + '-' + currentRoleId);
            var $each_tr = $content_div.find('#row-' + m);
            // for selcting the read access radio button
            if (list[0].accessFlag != undefined && list[0].accessFlag != '' && list[0].accessFlag != null && list[0].accessFlag == 'R' && $each_tr.find('input[type="radio"]:first') != undefined) {
              $each_tr.find('input[type="radio"]:first').prop('checked', true);
            }
            // for displaying include or exclude stores
            if (storeList.includeExcludeFlag != undefined && storeList.includeExcludeFlag != '' && storeList.includeExcludeFlag != null) {
              if (storeList.includeExcludeFlag == 'I') {
                $each_tr.find('.all-store-checkbox').attr('checked', false);
                if (storeList.siteCnt > 0 && storeList.siteNo != "") 
                	$each_tr.find('.includeStore').text(storeList.siteCnt).removeClass('addRow').addClass('addBtn').removeClass('hideBlock');
                
                $each_tr.find('.excludeStore').text('Add').removeClass('addRow').removeClass('addBtn').addClass('hideBlock');
                // unchekOnrowLevel = false;
              } else if (storeList.includeExcludeFlag == 'E') {
                if (storeList.siteCnt > 0 && storeList.siteNo != "") 
                	$each_tr.find('.excludeStore').text(storeList.siteCnt).removeClass('addRow').addClass('addBtn').removeClass('hideBlock');
                
                $each_tr.find('.includeStore').text('Add').removeClass('addRow').removeClass('addBtn').addClass('hideBlock');
                // unchekOnrowLevel = false;
              }
            }
            // Unchecking the individual check box
            $each_tr.find('.menu-checkbox')
              .prop('checked', true);
            $each_tr.find('input[type="radio"]')
              .removeAttr('disabled');
            $each_tr.find('input[type="radio"]')
              .removeAttr('disabled');
            $each_tr.find('.all-store-checkbox')
              .attr('checked', true)
              .removeAttr('disabled');
            $each_tr.find('.addBtn')
              .parent()
              .removeClass('disable')
              .removeClass('grey');
            $each_tr.removeClass('hideBlock');
          }
        }
      }
      unbindAddBtn();
      findUncheckedEnabledCheckboxes();
      stopLoading();
    },
    error: function() {
      // goToLogin();
    }
  });
}

function bindAddStoreContent() {
  // delete button click event
  $('.deleteRecord')
    .unbind('click');
  $('.deleteRecord')
    .click(function() {
      $(this)
        .closest('tr')
        .remove();
    });
  // add store popup cancel button click event
  $('.addstore-popup-cancel-btn')
    .unbind('click');
  $('.addstore-popup-cancel-btn')
    .click(function() {
      $('#dialog-editFunctions .errorDiv.parameter label')
        .text('');
      $('.verifyNm')
        .val('');
      $("#dialog-editFunctions")
        .dialog('close');
    });
  // add store popup save button click event
  if ($('#dialog-editFunctions .ContentTable tbody tr')
    .length > 1) {
    $('.addstore-popup-save-btn')
      .unbind('click');
    $('.addstore-popup-save-btn')
      .click(function() {
        saveStore();
      });
  } else {
    $('.addstore-popup-save-btn')
      .unbind('click');
    $('.addstore-popup-save-btn')
      .click(function() {
        if ($('#dialog-editFunctions .ContentTable tbody tr')
          .length > 1) {
          saveStore();
        } else {
          $("#dialog-editFunctions .errorDiv ")
            .removeClass('hideBlock');
          $("#dialog-editFunctions .errorDiv label")
            .text('Please add a store to save.');
        }
      });
  }
}

function hideEditPopError() {
  $("#dialog-editFunctions .errorDiv ")
    .addClass('hideBlock');
  $("#dialog-editFunctions .errorDiv label")
    .text('');
}

function openAddStoreContent(functionCode) {
  $.ajax({
    url: "getStoreDtl.htm",
    data: {
      salesOrg: currentSaleOrg,
      roleId: currentRoleId,
      platform: currentPlatform,
      code: functionCode
    },
    type: "get",
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      var output = '';
      var list = [];
      var content = '<tr><th class="">Store</th><th class="centerValue" width="45px">Actions</th></tr>';
      if (response != null && response != undefined && response != '' && $.parseJSON(response) != undefined) {
        output = $.parseJSON(response);
        list = output.activityOptionsList;
        if (list != null && list != '' && list != undefined && list.length > 0) {
          for (var i = 0; i < list.length; i++) {
            content += '<tr id="' + list[i].siteNo + '" class="appended"><td>' + list[i].siteNo + ' - ' + list[i].siteDesc + '</td>' + '<td class="centerValue"><label class="linkBtn" id="DeleteExpiryRecord-1"> <label class="deleteRecord">Delete</label>' + '</label></td></tr>';
          }
          $("#dialog-editFunctions tbody")
            .html(content);
          bindAddStoreContent();
          $("#dialog-editFunctions .errorDiv ")
            .addClass('hideBlock');
          hideEditPopError();
          $("#dialog-editFunctions")
            .dialog('open');
        }
      }
      stopLoading();
    },
    error: function() {
      // goToLogin();
    }
  });
}

function saveStore() {
  var activityObj = [];
  var $selectedStores = $('#dialog-editFunctions tbody .appended');
  var roleList = [];
  roleList.push(currentRoleId);
  var levelList = [];
  levelList.push('3');
  levelList.push('2');
  /*
   * if ($clickedAddItem != '' && $clickedAddItem != undefined &&
   * $clickedAddItem != null && $selectedStores != undefined &&
   * $selectedStores != null && $selectedStores != '' &&
   * $selectedStores.length > 0) {
   */
  var obj = '{}';
  var objNew = '{}';
  var includeExcludeFlag = ($clickedAddItem.find('label')
    .hasClass('includeStore')) ? 'I' : 'E';
  var functionCode = $clickedAddItem.closest('tr')
    .attr('id')
    .split('-')[1];
  var store = '';
  var storeCnt = $selectedStores.length;
  var accessFlag = '';
  if ($clickedAddItem.closest('tr')
    .find('.read-only')
    .is(':checked')) accessFlag = 'R';
  // selected stores
  $selectedStores.filter(function() {
    store = $(this)
      .attr('id');
    obj = {
      "code": functionCode,
      "accessFlag": "",
      "accessLevel": "3",
      "includeExcludeFlag": includeExcludeFlag,
      "roleId": currentRoleId,
      "screenFunctionFlag": "SC",
      "siteNo": store,
      "salesOrg": currentSaleOrg
    };
    activityObj.push(obj);
    /*if (includeExcludeFlag == 'E') {
    	obj = {
    		"code" : functionCode,
    		"accessLevel" : "2",
    		"roleId" : currentRoleId,
    		"screenFunctionFlag" : "SC",
    		"salesOrg" : currentSaleOrg
    	};
    	activityObj.push(obj);
    }*/
    //}
  });
  obj = {
    "accessFlag": accessFlag,
    "code": functionCode,
    "accessLevel": "2",
    "roleId": currentRoleId,
    "screenFunctionFlag": "SC",
    "salesOrg": currentSaleOrg
  };
  activityObj.push(obj);
  //console.log(activityObj);
  /*
   * if (activityObj != null && activityObj != undefined && activityObj.length >
   * 0) {
   */
  var data = {
    salesOrg: currentSaleOrg,
    roleId: currentRoleId,
    activityOptionsList: activityObj,
    accessLevel: "3",
    code: functionCode,
    roleList: roleList,
    levelList: levelList,
    platform: currentPlatform,
    deleteAllFlag: "N"
  };
  saveSettings(data, true, storeCnt, '');
  // }
  // }
}

function saveAllRoleSet() {
  var activityObj = [];
  var uncheckedItems = $('.menuTabs:visible .menu-checkbox:not(:checked)');
  var checkedItems = $('.menuTabs:visible .menu-checkbox:checked');
  var obj = '{}';
  var functionCode = '';
  var roleList = [];
  var codeList = [];
  // roleList.push(currentRoleId);
  var levelList = [];
  levelList.push('1');
  var unCheckedLevelList = [];
  var checkedCodeList = [];
  var unCheckedCodeList = [];
  unCheckedLevelList.push(2);
  unCheckedLevelList.push(3);
  // unCheckedLevelList.push(1);
  // unchecked item
  uncheckedItems.filter(function() {
    functionCode = $(this)
      .closest('tr')
      .attr('id')
      .split('-')[1];
    /*
     * obj = { "code" : functionCode, "accessFlag" : "", "accessLevel" :
     * "1", "includeExcludeFlag" : "", "roleId" : "", "screenFunctionFlag" :
     * "SC", "siteNo" : "", "salesOrg" : currentSaleOrg };
     * activityObj.push(obj);
     */
    unCheckedCodeList.push(functionCode);
  });
  // checked item
  checkedItems.filter(function() {
    functionCode = $(this)
      .closest('tr')
      .attr('id')
      .split('-')[1];
    obj = {
      "code": functionCode,
      "accessFlag": "",
      "accessLevel": "1",
      "includeExcludeFlag": "",
      "roleId": "",
      "screenFunctionFlag": "SC",
      "siteNo": "",
      "salesOrg": currentSaleOrg
    };
    activityObj.push(obj);
    checkedCodeList.push(functionCode);
  });
  //console.log(activityObj);
  /*
   * if (activityObj != null && activityObj != undefined && activityObj.length >
   * 0) {
   */
  var data = {
    salesOrg: currentSaleOrg,
    roleId: "",
    activityOptionsList: activityObj,
    accessLevel: "1",
    roleList: roleList,
    levelList: levelList,
    codeList: codeList,
    deleteAllFlag: "Y",
    unCheckedLevelList: unCheckedLevelList,
    unCheckedCodeList: unCheckedCodeList,
    checkedCodeList: checkedCodeList,
    checkedLevelList: levelList
  };
  saveAllRoleSettings(data, false, '', '');
  // }
}

function saveAllCheckedStore() {
  var storeCheckedItems = $('.functionsTabs:visible .all-store-checkbox:checked');
  var functionCode = '';
  var codeList = [];
  var levelList = [];
  var roleList = [];
  roleList.push(currentRoleId);
  levelList.push(3);
  storeCheckedItems.filter(function() {
    functionCode = $(this)
      .closest('tr')
      .attr('id')
      .split('-')[1];
    codeList.push(functionCode);
  });
  // //console.log(codeList);
  if (codeList != null && codeList != undefined && codeList.length > 0) {
    var data = {
      salesOrg: currentSaleOrg,
      roleId: currentRoleId,
      // activityOptionsList : [],
      accessLevel: "3",
      roleList: roleList,
      levelList: levelList,
      codeList: codeList,
      platform: currentPlatform,
      includeExcludeFlag: "I"
    };
    deleteStoreSettings(data, false, '');
  }
}

function deleteStoreSettings(data, storeLevel, storeCnt) {
	data['platform'] = currentPlatform;
  $.ajax({
    url: "deleteStoreSettings.htm",
    data: JSON.stringify(data),
    contentType: "application/json",
    type: "post",
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      if (response != null && response != undefined && response != '') {
        showAlert('Application settings has been saved successfully.');
      }
      stopLoading();
    },
    error: function() {
      showAlert('Technical issue occured,Please contact java support.');
    }
  });
}

function saveApplicationSettings() {
  includeStoreFlag = false;
  $('.all-store-checkbox:visible:not(:checked):not(:disabled)')
    .closest('tr')
    .find('.includeStore')
    .each(function() {
      if ($(this)
        .text() == "Add") includeStoreFlag = true;
    });
  if (includeStoreFlag) {
    showAlert('Please include store(s) before you proceed');
  } else {
    var activityObj = [];
    var unCheckedLevelList = [];
    var unCheckedCodeList = [];
    var uncheckedItems = $('.functionsTabs:visible .menu-checkbox:not(:checked)');
    // var uncheckedItems = $('.functionsTabs:visible
    // .menu-checkbox:not(:checked):not(:disabled)');
    var checkedItems = $('.functionsTabs:visible .menu-checkbox:checked:not(:disabled)');
    //var readOnlyItems = $('.functionsTabs:visible .read-only:checked:not(:disabled)');
    var obj = '{}';
    var functionCode = '';
    var roleList = [];
    roleList.push(currentRoleId);
    var levelList = [];
    levelList.push('2');
    //unCheckedLevelList.push(2);
    unCheckedLevelList.push(3);
    // unCheckedLevelList.push(1);
    // unchecked item
    uncheckedItems.filter(function() {
      functionCode = $(this)
        .closest('tr')
        .attr('id')
        .split('-')[1];
      /*
       * obj = { "code" : functionCode, "accessFlag" : "", "accessLevel" :
       * "1", "includeExcludeFlag" : "", "roleId" : "", "screenFunctionFlag" :
       * "SC", "siteNo" : "", "salesOrg" : currentSaleOrg };
       * activityObj.push(obj);
       */
      unCheckedCodeList.push(functionCode);
    });
    // checked item
    checkedItems.filter(function() {
      functionCode = $(this)
        .closest('tr')
        .attr('id')
        .split('-')[1];
      var accessFlag = '';
      if ($(this)
        .closest('tr')
        .find('.read-only')
        .is(':checked')) accessFlag = 'R';
      obj = {
        "code": functionCode,
        "accessFlag": accessFlag,
        "accessLevel": "2",
        "includeExcludeFlag": "",
        "roleId": currentRoleId,
        "screenFunctionFlag": "SC",
        "siteNo": "",
        "salesOrg": currentSaleOrg
      };
      activityObj.push(obj);
    });
    //console.log(activityObj);
    var data = {
      salesOrg: currentSaleOrg,
      roleId: currentRoleId,
      activityOptionsList: activityObj,
      accessLevel: "2",
      roleList: roleList,
      levelList: levelList,
      platform: currentPlatform,
      unCheckedLevelList: unCheckedLevelList,
      unCheckedCodeList: unCheckedCodeList
    };
    saveSettings(data, false, true, '');
    // }
  }
}

function saveSettings(data, storeLevel, storeCnt, roleList) {
    //platform: currentPlatform,
	data['platform'] = currentPlatform;
  $.ajax({
    url: "saveApllicationSettings.htm",
    data: JSON.stringify(data),
    contentType: "application/json",
    type: "post",
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      if (response != null && response != undefined && response != '') {
        //console.log(response);
        if (storeLevel && $("#dialog-editFunctions")
          .dialog('isOpen')) {
          $("#dialog-editFunctions")
            .dialog('close');
          if (storeCnt == 0) {
            $clickedAddItem.find('label')
              .text('Add')
              .removeClass('addRow')
              .addClass('addRow')
              .removeClass('storeCntPadding');
            if ($clickedAddItem.find('label')
              .hasClass('includeStore')) {
              $clickedAddItem.closest('tr')
                .find('.excludeStore')
                .removeClass('hideBlock')
                .removeClass('addRow')
                .addClass('addRow')
                .removeClass('storeCntPadding');
              $clickedAddItem.closest('tr')
                .find('.excludeStore')
                .parent()
                .removeClass('disable')
                .removeClass('grey')
                .removeClass('storeCntPadding');
              $clickedAddItem.closest('tr')
                .find('.includeStore')
                .addClass('hideBlock')
                .removeClass('storeCntPadding');
              $clickedAddItem.closest('tr')
                .find('.all-store-checkbox')
                .prop('checked', true);
            }
          } else {
            $clickedAddItem.find('label')
              .text(storeCnt)
              .removeClass('addRow')
              .addClass('storeCntPadding');
            if ($clickedAddItem.find('label')
              .hasClass('includeStore')) {
              $clickedAddItem.closest('tr')
                .find('.excludeStore')
                .text('Add')
                .addClass('hideBlock')
                .removeClass('addRow')
                .addClass('addRow')
                .removeClass('storeCntPadding');
            }
            if ($clickedAddItem.find('label')
              .hasClass('excludeStore')) {
              $clickedAddItem.closest('tr')
                .find('.includeStore')
                .text('Add')
                .addClass('hideBlock')
                .removeClass('addRow')
                .addClass('addRow')
                .removeClass('storeCntPadding');
            }
          }
          unbindAddBtn();
          stopLoading();
        }
        /*
         * else if (!storeLevel &&
         * $("#dialog-replicate").dialog('isOpen')) {
         * copyStoreList(roleList); // stopLoading(); }
         */
        else if (storeCnt && response == 'success') {
          saveAllCheckedStore();
        }
        /*
         * else if (storeCnt == '' && response == 'success' &&
         * roleList == '') { getAllRoleDetails(1); }
         */
        else {
          showAlert(response);
          stopLoading();
        }
      }
      reloadUserAccess();
    },
    error: function() {
      // goToLogin();
      showAlert("Technical issue occured,Please contact java support.");
      stopLoading();
    }
  });
}

function saveAllRoleSettings(data, storeLevel, storeCnt, roleList) {
	data['platform'] = currentPlatform;
  $.ajax({
    url: "saveAllRoleSettings.htm",
    data: JSON.stringify(data),
    contentType: "application/json",
    type: "post",
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      if (response != null && response != undefined && response != '') {
        //console.log(response);
        getAllRoleDetails(1);
        stopLoading();
        showAlert("Application settings has been saved successfully.");
      }
      reloadUserAccess();
    },
    error: function() {
      // goToLogin();
      showAlert('Technical issue occured,Please contact java support.');
      stopLoading();
    }
  });
}

function bindReplicateSettingsContent() {
  $('#dialog-replicate .select-all-menu')
    .unbind('click');
  $('#dialog-replicate .select-all-menu')
    .click(function() {
      if ($(this)
        .is(':checked')) {
        $(this)
          .closest('table')
          .find('.menu-checkbox:not(:disabled)')
          .prop('checked', true);
      } else {
        $(this)
          .closest('table')
          .find('.menu-checkbox:not(:disabled)')
          .prop('checked', false);
      }
    });
  $('#dialog-replicate .ContentTableWrapper .menu-checkbox')
    .unbind('click');
  $('#dialog-replicate .ContentTableWrapper .menu-checkbox')
    .click(function() {
      findUncheckedEnabledCheckboxesinReplicatePopUp();
    });
}

function getAllRoleDetails(accessLevel) {
  $.ajax({
    url: "getExcludeOption.htm",
    data: {
      salesOrg: currentSaleOrg,
      accessLevel: accessLevel,
      platform : currentPlatform
    },
    type: "get",
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      var output = '';
      var functionsMap = {};
      if (response != null && response != undefined && response != '' && $.parseJSON(response) != undefined) {
        output = $.parseJSON(response);
        functionsMap = output.activityOptionsMapJson;
        if (functionsMap != null && functionsMap != '' && functionsMap != undefined) {
          allRoleExcludeInfoMap = functionsMap;
          if (currentRoleId == 'all') {
            getAllRoleExcludeDtl(2);
          }
          // clearReadAndFullText();
        }
      }
      unbindAddBtn();
      stopLoading();
    },
    error: function() {
      showAlert("Technical issue occured,Please contact java support.");
    }
  });
}

function disableAllRoles() {
  if (allRoleExcludeInfoMap != null && allRoleExcludeInfoMap != '' && allRoleExcludeInfoMap != undefined) {
    var $content_div = $('#menutabs-'+ currentPlatform + '-' + currentSaleOrg + '-' + currentRoleId);
    toggleFunctionDisable($content_div);
    if (currentRoleId != 'all') {
      var $each_tr = $content_div.find('tr.drillsOpenDefault.collapsed');
      $each_tr.filter(function() {
        var code = $(this)
          .attr('id')
          .split('-')[1];
        if ($(allRoleExcludeInfoMap)
          .attr(code) == undefined) {
          $(this)
            .find('.menu-checkbox')
            .attr('disabled', 'disabled');
          $(this)
            .find('td:first')
            .next()
            .find('label')
            .addClass('lable-disable');
          $(this)
            .find('input[type="radio"]')
            .attr('disabled', 'disabled');
          /*
           * $(this).find('input[type="radio"].full-acc')
           * .attr('disabled', 'disabled');
           */
          $(this)
            .find('.all-store-checkbox')
            .attr('checked', true)
            .attr('disabled', 'disabled');
          $(this)
            .find('.addBtn')
            .parent()
            .unbind('click');
          $(this)
            .find('.addBtn')
            .text('Add');
          $(this)
            .find('.addBtn')
            .addClass('addRow');
          $(this)
            .find('.addBtn')
            .parent()
            .addClass('disable')
            .addClass('grey');
          $(this)
            .addClass('hideBlock');
        } else {
          $(this)
            .removeClass('hideBlock');
        }
      });
      unbindAddBtn();
    } else {
      for (m in allRoleExcludeInfoMap) {
        var $each_tr = $content_div.find('#row-' + m);
        $each_tr.find('.menu-checkbox')
          .prop('checked', true);
        $(this)
          .removeClass('hideBlock');
      }
    }
  }
}

function toggleFunctionDisable($content_div) {
  var $each_tr = $content_div.find('tr');
  $each_tr.filter(function() {
    $(this)
      .find('.menu-checkbox')
      .removeAttr('disabled')
      .attr('checked', false);
    $(this)
      .find('label')
      .removeClass('lable-disable');
    $(this)
      .find('input[type="radio"].full-acc')
      .attr('disabled', 'disabled')
      .prop('checked', true);
    $(this)
      .find('input[type="radio"]')
      .attr('disabled', 'disabled');
    $(this)
      .find('.all-store-checkbox')
      .attr('disabled', 'disabled')
      .attr('checked', true);
    $(this)
      .find('.addBtn')
      .parent()
      .addClass('disable')
      .addClass('grey');
    // $(this).find('.menu-checkbox').closest('tr').addClass('hideBlock');
  });
  // unbindAddBtn();
}

function getAllRoleExcludeDtl(accessLevel) {
  $.ajax({
    url: "getExcludeOption.htm",
    data: {
      salesOrg: currentSaleOrg,
      accessLevel: accessLevel,
      platform : currentPlatform
    },
    type: "get",
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      var output = '';
      var functionsMap = {};
      allRoleText = '';
      roleArray = [];
      $('.roleTabs:visible li.full-width')
        .filter(function() {
          if ($(this)
            .find('a')
            .text() != 'All Roles') {
            // //console.log($(this).find('a').text());
            $(roleMap)
              .attr($(this)
                .find('a')
                .attr('id'), $(this)
                .find('a')
                .text());
            roleArray.push($(this)
              .find('a')
              .attr('id'));
            if (allRoleText == '') {
              allRoleText += $(this)
                .find('a')
                .text();
            } else {
              allRoleText += ',' + $(this)
                .find('a')
                .text();
            }
          }
        });
      if (response != null && response != undefined && response != '' && $.parseJSON(response) != undefined) {
        output = $.parseJSON(response);
        functionsMap = output.activityOptionsMapJson;
        if (functionsMap != null && functionsMap != '' && functionsMap != undefined) {
          var list = [];
          var accessMap = {};
          for (m in functionsMap) {
            list = functionsMap[m];
            var tempMap = {};
            var read_text = '';
            var full_text = '';
            for (var i = 0; i < list.length; i++) {
              if (list[i].accessFlag == 'R') {
                if (read_text == '') {
                  if (list[i].roleId != undefined && $(roleMap)
                    .attr(list[i].roleId) != undefined) read_text += $(roleMap)
                    .attr(list[i].roleId);
                } else {
                  if (list[i].roleId != undefined && $(roleMap)
                    .attr(list[i].roleId) != undefined) read_text += ',' + $(roleMap)
                    .attr(list[i].roleId);
                }
              } else {
                if (full_text == '') {
                  if (list[i].roleId != undefined && $(roleMap)
                    .attr(list[i].roleId) != undefined) full_text += $(roleMap)
                    .attr(list[i].roleId);
                } else {
                  if (list[i].roleId != undefined && $(roleMap)
                    .attr(list[i].roleId) != undefined) full_text += ',' + $(roleMap)
                    .attr(list[i].roleId);
                }
              }
            }
            /*
             * for ( var i = 0; i < roleArray.length; i++) { if
             * ($(tempMap).attr(roleArray[i]) == undefined) { if
             * (full_text == '') { full_text +=
             * $(roleMap).attr(roleArray[i]); } else { full_text +=
             * ',' + $(roleMap).attr(roleArray[i]); } } }
             */
            if (read_text != '') {
              $(accessMap)
                .attr(m + '-R', '');
              $(accessMap)
                .attr(m + '-R', read_text);
            }
            if (full_text != '') {
              $(accessMap)
                .attr(m + '-F', '');
              $(accessMap)
                .attr(m + '-F', full_text);
            }
            /*
             * if (read_text == '' && full_text == '') {
             * $(accessMap).attr(m, 'N'); }
             */
          }
          allRoleAccessInfoMap = accessMap;
          formReadAndFullText();
        }
      }
      // unbindAddBtn();
      stopLoading();
    },
    error: function() {
      // goToLogin();
    }
  });
}

function formReadAndFullText() {
  var allRolesTr = $('#menutabs-'+currentPlatform +'-' + currentSaleOrg + '-all .drillsOpenDefault.collapsed');
  allRolesTr.filter(function() {
    var code = $(this)
      .attr('id')
      .split('-')[1];
    $(this)
      .find('.full-text')
      .text('');
    $(this)
      .find('.read-only-text')
      .text('');
    // var check = ($(this).find('.menu-checkbox').prop('checked'));
    if ($(allRoleAccessInfoMap)
      .attr(code + '-R') != undefined) {
      $(this)
        .find('.read-only-text')
        .text($(allRoleAccessInfoMap)
          .attr(code + '-R'));
    }
    if ($(allRoleAccessInfoMap)
      .attr(code + '-F') != undefined) {
      $(this)
        .find('.full-text')
        .text($(allRoleAccessInfoMap)
          .attr(code + '-F'));
    }
    /*
     * else if ($(allRoleAccessInfoMap).attr(code) == undefined &&
     * check) { $(this).find('.full-text').text(allRoleText); }
     */
    /*
     * else { $(this).find('.full-text').text('');
     * $(this).find('.read-only-text').text(''); }
     */
  });
}

function clearReadAndFullText() {
  var allRolesTr = $('#menutabs-' +currentPlatform +'-'+ currentSaleOrg + '-all .drillsOpenDefault.collapsed');
  allRolesTr.filter(function() {
    var code = $(this)
      .attr('id')
      .split('-')[1];
    if ($(allRoleExcludeInfoMap)
      .attr(code) != undefined) {
      $(this)
        .find('.full-text')
        .text('');
      $(this)
        .find('.read-only-text')
        .text('');
    }
  });
}

function saveReplicationSettings() {
  var uncheckedItems = $('.step-1-form .menu-checkbox:checked:not(:disabled)');
  var uncheckedRoles = $('.step-2-form .menu-checkbox:checked');
  var functionCode = '';
  var roleList = [];
  var codeList = [];
  var roleId = '';
  // unchecked roles
  uncheckedRoles.each(function() {
    roleId = $(this)
      .closest('tr')
      .attr('id');
    roleList.push(roleId);
  });
  if (roleList != null && roleList != undefined && roleList.length != 0 && roleList != '') {
    if (!$('.step-2-form .errorDiv')
      .hasClass('hideBlock')) $('.step-2-form .errorDiv')
      .addClass('hideBlock');
    // unchecked functions
    uncheckedItems.filter(function() {
      functionCode = $(this)
        .closest('tr')
        .attr('id')
        .split('-')[1];
      codeList.push(functionCode);
    });
    if(codeList != null && codeList != undefined && codeList.length != 0 && codeList != ''){
    	copyStoreList(roleList, codeList);
    }else{
    	$('<div class="errorDiv parameter replicate-error" id="repicate-err"><label>Please select any function to replicate.</label></div>').insertAfter('#dialog-replicate #cancel');
    }
  } else if ((roleList == null || roleList == undefined || roleList.length == 0 || roleList == '') && (uncheckedRoles == '' || uncheckedRoles.length == 0 || uncheckedRoles == null || uncheckedRoles == undefined)) {
	  $('<div class="errorDiv parameter replicate-error" id="repicate-err"><label>Please select any roles to replicate.</label></div>').insertAfter('#dialog-replicate #cancel');
  }
}

function copyStoreList(roleList, codeList) {
  var levelList = [];
  levelList.push(2);
  levelList.push(3);
  if (roleList != null && roleList != undefined && roleList.length > 0) {
    var data = {
      salesOrg: currentSaleOrg,
      roleId: currentRoleId,
      accessLevel: "3",
      roleList: roleList,
      levelList: levelList,
      codeList: codeList,
      deleteAllFlag: "N"
    };
    copyStoreSettings(data, false, '');
  }
}

function copyStoreSettings(data, storeLevel, storeCnt) {
	data['platform']= currentPlatform;
  $.ajax({
    url: "copyAppSettings.htm",
    data: JSON.stringify(data),
    contentType: "application/json",
    type: "post",
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      if (response != null && response != undefined && response != '') {
        //console.log(response);
        if ($("#dialog-replicate")
          .dialog('isOpen')) {
          $("#dialog-replicate")
            .dialog('close');
          showAlert("Application settings has been saved successfully.");
        }
      }
      reloadUserAccess();
      stopLoading();
    },
    error: function() {
      showAlert("Technical issue occured,Please contact java support.");
    }
  });
}

function reloadUserAccess(data, storeLevel, storeCnt) {
  $.ajax({
    url: "getUserAccess.htm",
    data: (data),
    // contentType : "application/json",
    type: "get",
    beforeSend: function() {
      startLoading();
    },
    success: function(response) {
      if (response != null && response != undefined && response != '') {
        //console.log(response);
        $('#userAccess')
          .val(response);
        securityMatrix();
      }
      stopLoading();
      //temp quick fix -xmtu6 
      $('.drillsOpenDefault:visible')
        .each(function() {
          if ($(this)
            .find('.all-store-checkbox')
            .prop('checked')) $(this)
            .find('.includeStoreLabel')
            .text('Add')
            .removeClass('addRow')
            .addClass('addRow')
            .removeClass('storeCntPadding');
        });
    },
    error: function() {
      // goToLogin();
    }
  });
}

function findUncheckedEnabledCheckboxes() {
  if (($('.menuTabs:visible .menu-checkbox:visible:not(:disabled):checked')
      .length > 0) && ($('.menuTabs:visible .menu-checkbox:visible:not(:disabled)')
      .length) > 0 && $('.menuTabs:visible .menu-checkbox:visible:not(:disabled):checked')
    .length == $('.menuTabs:visible .menu-checkbox:visible:not(:disabled)')
    .length) {
    $('.menuTabs:visible .select-all-menu:visible')
      .prop('checked', true);
    $('.menuTabs:visible .select-all-menu:visible')
      .prop('disabled', false);
  } else if ($('.menuTabs:visible .menu-checkbox:visible:disabled')
    .length == $('.menuTabs:visible .menu-checkbox:visible')
    .length) {
    $('.menuTabs:visible .select-all-menu:visible')
      .prop('checked', false);
    $('.menuTabs:visible .select-all-menu:visible')
      .prop('disabled', true);
  } else {
    $('.menuTabs:visible .select-all-menu:visible')
      .prop('checked', false);
    $('.menuTabs:visible .select-all-menu:visible')
      .prop('disabled', false);
  }
}

function findUncheckedEnabledCheckboxesinReplicatePopUp() {
  $('.step-1-form .menu-checkbox:disabled')
    .closest('tr')
    .addClass('hideBlock');
  if ($('.step-1-form')
    .is(':visible')) {
    // $('.step-1-form
    // .menu-checkbox:disabled').closest('tr').addClass('hideBlock');
    if ($('#functions .ContentTableWrapper:visible tr:visible')
      .length == 1) {
      $('#functions .ContentTable:visible')
        .addClass('hideBlock');
      $('#functions .ContentTableWrapper:visible .nofunctions ')
        .removeClass('hideBlock');
    } else {
      $('#functions .ContentTableWrapper:visible')
        .removeClass('hideBlock');
      $('#functions .ContentTableWrapper:visible .nofunctions ')
        .addClass('hideBlock');
    }
    if (($('.step-1-form .menu-checkbox:visible:checked:not(:disabled)')
        .length > 0) && ($('.step-1-form .menu-checkbox:visible:not(:disabled)')
        .length) > 0 && ($('.step-1-form .menu-checkbox:visible:checked:not(:disabled)')
        .length == $('.step-1-form .menu-checkbox:visible:not(:disabled)')
        .length)) {
      $('#functions .ContentTableWrapper:visible .select-all-menu:visible')
        .prop('checked', true);
      $('#functions .ContentTableWrapper:visible .select-all-menu:visible')
        .prop('disabled', false);
    } else if ($('.step-1-form .menu-checkbox:visible:disabled')
      .length == $('.step-1-form .menu-checkbox:visible')
      .length) {
      $('#functions .ContentTableWrapper:visible .select-all-menu:visible')
        .prop('checked', false);
      $('#functions .ContentTableWrapper:visible .select-all-menu:visible')
        .prop('disabled', true);
    } else {
      $('#functions .ContentTableWrapper:visible .select-all-menu:visible')
        .prop('checked', false);
      $('#functions .ContentTableWrapper:visible .select-all-menu:visible')
        .prop('disabled', false);
    }
  }
  if ($('.step-2-form')
    .is(':visible')) {
    if ($('.step-2-form .menu-checkbox:visible:checked')
      .length == $('.step-2-form .menu-checkbox:visible')
      .length) {
      $('#dialog-replicate .ContentTableWrapper:visible .select-all-menu:visible')
        .prop('checked', true);
    } else {
      $('#dialog-replicate .ContentTableWrapper:visible .select-all-menu:visible')
        .prop('checked', false);
    }
  }
}

function showWarning(msg) {
  $('#dialog-modal-alertBox')
    .dialog('open');
  $('#dialog-modal-alertBox #alertBox')
    .text(msg);
  $('#okBtn')
    .addClass('hideBlock');
  $('.yesBtn,.noBtn')
    .removeClass('hideBlock');
}

function showAlert(msg) {
  $('#dialog-modal-alertBox')
    .dialog('open');
  $('#dialog-modal-alertBox #alertBox')
    .text(msg);
  $('#okBtn')
    .removeClass('hideBlock');
  $('.yesBtn,.noBtn')
    .addClass('hideBlock');
}

function checkForChange() {}

function oldSettings() {
  var $menu = $('.menuTabs:visible');
  $menu.filter(function() {
    oldAllRowCheckBoxChecked = $(this)
      .find('.allRowCheckBox:not(:disabled):checked');
    oldAllRowCheckBoxUnChecked = $(this)
      .find('.allRowCheckBox:not(:disabled):not(:checked)');
    oldRowCheckBoxChecked = $(this)
      .find('.rowCheckBox:not(:disabled):checked');
    oldRowCheckBoxUnChecked = $(this)
      .find('.rowCheckBox:not(:disabled):not(:checked)');
    oldReadRadioChecked = $(this)
      .find('.readRadio:not(:disabled):checked');
    oldReadRadioUnChecked = $(this)
      .find('.readRadio:not(:disabled):not(:checked)');
    oldFullRadioChecked = $(this)
      .find('.fullRadio:not(:disabled):checked');
    oldFullRadioUnchecked = $(this)
      .find('.fullRadio:not(:disabled):not(:checked)');
    oldAllCheckBoxChecked = $(this)
      .find('.allCheckBox:not(:disabled):checked');
    oldAllCheckBoxUnchecked = $(this)
      .find('.allCheckBox:not(:disabled):not(:checked)');
    oldIncludeStoreLabel = $(this)
      .find('.includeStoreLabel')
      .text();
    oldExcludeStoreLabel = $(this)
      .find('.excludeStoreLabel')
      .text();
  });
}