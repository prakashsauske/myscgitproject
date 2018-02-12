var changeFlagVerify=false;
/**
 * jWizard: a jQuery UI Wizard Widget
 * 
 * @author Dominic Barnes <dominic@dbarnes.info>
 * @version 2.0.0
 */
var selectedArticles='';
(function($, undefined) {

	/**
	 * A minimal configuration wizard widget
	 * 
	 * @name jWizard jQuery UI Widget
	 * @author Dominic Barnes <dominic@dbarnes.info>
	 * 
	 * @requires jQuery
	 * @requires jQuery UI Widget Factory
	 * @requires jQuery UI ProgressBar
	 */
	$
			.widget(
					"db.progressbar",
					$.ui.progressbar,
					{
						_create : function() {
							if (this._super) {
								this._super();
							} else {
								$.ui.progressbar.prototype._create.call(this);
							}

							if (this.options.label)
								this._createLabel();
							this._refreshValue();
						},

						destroy : function() {
							if (this.options.label)
								this._destroyLabel();

							if (this._super) {
								this._super();
							} else {
								$.ui.progressbar.prototype.destroy.call(this);
							}
						},

						_refreshValue : function() {
							if (this._superApply) {
								this._superApply(arguments);
							} else {
								$.ui.progressbar.prototype._refreshValue.apply(
										this, arguments);
							}

							if (this.label)
								this._updateLabel();
						},

						_setOption : function(key) {
							if (key === "value" && this.options.label) {
								this._updateLabel();
							}

							if (this._superApply) {
								this._superApply(arguments);
							} else {
								$.ui.progressbar.prototype._setOption.apply(
										this, arguments);
							}
						},

						_createLabel : function() {
							if (this.label)
								return;

							this.label = $(
									'<span class="ui-progressbar-label"></span>')
									.appendTo(this.element);
							this._updateLabel();
						},

						_updateLabel : function() {
							var options = this.options, text = options.label === "count" ? this
									._count()
									: this._percentage() + "%";

							if (options.append)
								text += " " + options.append;

							this.label.text(text).position({
								my : "center",
								at : "center",
								of : this.element
							});
						},

						_destroyLabel : function() {
							this.label.remove();
							this.label = null;
						},

						_count : function() {
							return this.value() + " of " + this.options.max;
						},

						options : {
							label : null, // "percentage", "count", OR
							// null/false
							append : false
						// text to append to the label
						}
					});

	/**
	 * A minimal configuration wizard widget
	 * 
	 * @required jQuery
	 * @required jQuery UI Widget Factory
	 * @required jQuery UI Button
	 * @optional jQuery UI ProgressBar
	 * @required jQuery UI Menu
	 */

	$
			.widget(
					"db.jWizard",
					{
						$steps : null, // all steps
						$current : null, // current/active step
						widgetEventPrefix : "wizard",

						_create : function() {
							var o = this.options;

							if (this._super) {
								this._super();
							} else {
								$.Widget.prototype._create.call(this);
							}

							if (o.disabled)
								this.disable();

							this.element.addClass("ui-widget jw-widget");
							this._buildSteps();
							if (o.title)
								this._buildTitle();
							if (o.menu)
								this._buildMenu();
							this._buildButtons();
							if (o.progress)
								this._buildProgress();
						},

						destroy : function() {
							var o = this.options;

							this.element
									.removeClass("ui-widget jw-widget jw-hasprogress");
							if (o.progress)
								this._destroyProgress();
							this._destroyButtons();
							if (o.menu)
								this._destroyMenu();
							if (o.title)
								this._destroyTitle();
							this._destroySteps();

							if (this._super) {
								this._super();
							} else {
								$.Widget.prototype.destroy.call(this);
							}
						},

						first : function() {
							return this.step(this.$steps.first());
						},

						last : function() {
							return this.step(this.$steps.last());
						},

						cancel : function() {
							// TODO: ui data
							this._trigger("cancel");
						},

						prev : function() {
							return this.step(this.$current.prev());
						},

						next : function() {
							//if(dontGo)
							
							return this.step(this.$current.next());
								
						},

						finish : function() {
							// TODO: ui data
							this._trigger("finish");
						},

						step : function($step) {
							var wizard = this, dfd = $.Deferred();
							if(!changeFlagVerify){
								changeFlagVerify=true;
							if (typeof $step === "number") {
								$step = this.$steps.eq($step);
							}

							function goback() {
								wizard._enter(wizard.$current).then(
										dfd.resolve, dfd.reject);
							}

							function proceed() {
								wizard._enableButtons();
								dfd.resolve();
							}

							this._disableButtons();

							this._leave(this.$current).then(function() {
								wizard._enter($step).then(proceed, goback);
							}, goback);

							return dfd.promise();
							}/*else{
								showWarn('Do you want to discard the changes');
								$('.yesBtn').unbind('click');
								$('.yesBtn').click(function(){
									$('#dialog-modal-alertBox').dialog('close');
									$('.backBtn').removeClass('hideBlock');
									$('#prev').click();
									
								});
							}*/
						
						},

						_leave : function($step) {
							var hide = $.Event("stephide"), dfd = $.Deferred(), effect = this.options.effects.steps.hide;

							function done() {
								$step.trigger("stephidden");
								dfd.resolve();
							}

							if ($step) {
								$step.trigger(hide);
								if (hide.isDefaultPrevented()) {
									dfd.reject();
								} else {
									if (this._hide) {
										this._hide($step, effect, done);
									} else {
										$step.hide(effect, done);
									}
								}
							} else {
								dfd.resolve();
							}

							return dfd.promise();
						},

						_enter : function($step) {
							var wizard = this, show = $.Event("stepshow"), dfd = $
									.Deferred(), effect = this.options.effects.steps.show;

							function done() {
								wizard.$current = $step;

								wizard._updateTitle();
								wizard._updateMenu();
								wizard._updateButtons();
								wizard._updateProgress();

								$step.trigger("stepshown");
								dfd.resolve();
							}

							if ($step) {
								$step.trigger(show);
								if (show.isDefaultPrevented()) {
									dfd.reject();
								} else {
									if (this._show) {
										this._show($step, effect, done);
									} else {
										$step.show(effect, done);
									}
								}
							} else {
								dfd.resolve();
							}

							return dfd.promise();
						},

						// Generates .jw-header > .jw-title
						_buildTitle : function() {
							if (this.$title)
								return;

							this.$title = $('<h2 class="jw-title" />');

							this.$header = $(
									'<div class="jw-header ui-widget-header ui-corner-top ui-helper-clearfix">')
									.append(this.$title)
									.prependTo(this.element);

							this._updateTitle();
						},

						// Update .jw-title
						_updateTitle : function() {
							var $title = this.$title;

							if ($title) {
								$title
										.text(this.$current
												.data("jwizard-title"));
							}
						},

						// Destroy .jw-header
						_destroyTitle : function() {
							this.$header.remove();

							this.$title = this.$header = null;
						},

						/**
						 * Initializes the step collection.
						 * 
						 * Any direct children <div> (with a title or
						 * data-jwizard-title attr) or <fieldset> (with a
						 * <legend>) are considered steps, and there should be
						 * no other sibling elements.
						 * 
						 * Lastly, a <div class"jw-steps-wrap"> is wrapped
						 * around all the steps to isolate them from the rest of
						 * the widget.
						 */
						_buildSteps : function() {
							var $steps = this.$steps = this.element.children();

							$steps.addClass("jw-step").each(function() {
								var $step = $(this), title;

								if ($step.is("fieldset")) {
									title = $step.find("legend").text();
								} else {
									title = $step.attr("title");
								}

								if (title) {
									$step.data("jwizard-title", title);
								}
							});

							$steps
									.hide()
									.wrapAll(
											$(
													"<div />",
													{
														"class" : "jw-content ui-widget-content ui-helper-clearfix",
														html : '<div class="jw-steps-wrap" />'
													}));

							this.$current = this.$steps.first().show();
						},

						/**
						 * Destroys the step wrappers and restores the steps to
						 * their original state
						 */
						_destroySteps : function() {
							this.$steps.show().unwrap().unwrap() // Unwrap
							// 2x:
							// .jw-steps-wrap
							// +
							// .jw-content
							.removeData("jwizard-title").removeClass("jw-step");

							this.$steps = null;
						},

						/**
						 * Builds the menu based on the collection of steps
						 * Assigns a class to the main <div> to indicate to CSS
						 * that there is a menu Binds a click event to each of
						 * the <a> that will change the step accordingly when
						 * clicked
						 */
						_buildMenu : function() {
							var wizard = this;
							this.element.addClass("jw-hasmenu");

							if (this.$menu)
								return;

							this.$menu = $(
									"<ol>",
									{
										class : "jw-menu",
										html : $
												.map(
														this.$steps,
														function(step) {
															var title = $(step)
																	.data(
																			"jwizard-title");
															return '<li><a href="javascript:void(0);">'
																	+ title
																	+ '</a>';
														}).join("")
									}).menu({
								select : function(e, ui) {
									wizard.step(ui.item.index());
								}
							});

							this.$menuWrap = $('<div class="jw-menu-wrap">')
									.append(this.$menu).prependTo(
											this.element
													.children(".jw-content"));

							this._updateMenu();
						},

						_updateMenu : function() {
							if (!this.$menu)
								return;

							var index = this.$current.index();

							this.$menu.children("li").removeClass(
									"ui-state-highlight ui-state-disabled").eq(
									index).addClass("ui-state-highlight").end()
									.slice(index).addClass("ui-state-disabled");
						},

						/**
						 * Removes the 'jw-hasmenu' class and pulls the menu out
						 * of the DOM entirely
						 */
						_destroyMenu : function() {
							this.element.removeClass("jw-hasmenu");
							this.$menu.menu("destroy");
							this.$menuWrap.remove();

							this.$menu = this.$menuWrap = null;
						},

						_buildProgress : function() {
							if (this.$progress)
								return;

							var options = $.extend({}, this.options.progress), location = options.location, $progress = $(
									"<div>").appendTo(
									this.element.find(location));

							delete options.location;
							options.max = this.$steps.length;

							this.element.addClass("jw-hasprogress");
							this.$progress = $progress.progressbar(options)
									.addClass("jw-progress");
							this._updateProgress();
						},

						_updateProgress : function() {
							if (!this.$progress)
								return;

							var $current = this.$current, index = $current ? $current
									.index()
									: 0;

							this.$progress.progressbar("value", index);
						},

						_destroyProgress : function() {
							this.element.removeClass("jw-hasprogress");
							this.$progress.progressbar("destroy").remove();
							this.$progress = null;
						},

						/**
						 * @private
						 * @description This generates the <button> elements for
						 *              the main navigation and binds `click`
						 *              handlers to each of them
						 * @see this._changeStep()
						 */
						_buildButtons : function() {
							var wizard = this, $footer = $(
									"<div>",
									{
										"class" : "jw-footer ui-widget-header ui-corner-bottom popupActionsWrapper",
										html : '<div class="jw-buttons ui-helper-clearfix"></div>'
									});

							$
									.each(
											this.options.buttons,
											function(type, data) {
												var options = $
														.extend({}, data), icons = options.icons;

												delete options.icons;

												options.class = options["class"]
														|| "";
												options.class += " jw-button-"
														+ type;

												if (data) {
													wizard["$" + type] = $(
															'<label>', options)
															.button({
																icons : icons
															})
															.appendTo(
																	$footer
																			.children(".jw-buttons"));
												}
											});

							this.element.append($footer);

							if (this._on) {
								this._on({
									"click .jw-button-cancel" : function() {
										wizard.cancel();
									},
									"click .jw-button-prev" : function() {
										if(!checkForChange()){
										$('.backBtn').removeClass('hideBlock');
										changeFlagVerify=false;
										$('.fixedHeader').addClass('hideBlock');
										$('.fixedHeader  .futureweek ').addClass('hideBlock');
										$('.fixedHeader  .currentweek ').removeClass('hideBlock');
										wizard.prev();
										}else{
											//if(!changeFlagVerify)
											showWarn('Do you want to save changes?');
											/*else{
												changeFlagVerify=false;
												wizard.prev();
											}*/
										}
									$('.yesBtn').unbind('click');
									$('.yesBtn').click(function(){
										$('#dialog-modal-alertBox').dialog('close');
										$('.saveBtn:visible').click();
										
									});
									$('.noBtn').unbind('click');
									$('.noBtn').click(function(){
										$('#dialog-modal-alertBox').dialog('close');
										$('.backBtn').removeClass('hideBlock');
										changeFlagVerify=false;
										$('.fixedHeader  .futureweek ').addClass('hideBlock');
										$('.fixedHeader  .currentweek ').removeClass('hideBlock');
										$('.fixedHeader').addClass('hideBlock');
										wizard.prev();
									});
									
									
									},
									"click .jw-button-next" : function() {
										changeFlagVerify=false;
										addDtls='';
										if(selectedArticles.trim()!=''){
											var articles=selectedArticles;
											data = $('#promotionsPlanning').serialize();
											data=data+"&selectedArticles="+articles;
											selectedArticles='';
											
											$
											.ajax({
												type : "post",
												url : "loadArticles.htm",
												data : data,
												//async:false,
												beforeSend : function() {
													//startLoading();
													fullScreenLoader();
												},
												success : function(response) {
													$.loader('close');
													//fullScreenLoader();
													var option = $("<h4>").html(response).find("#option")
															.val();
													if (option == 'promotionDetails') {
														fullScreenLoader();
														if($('#sections').hasClass('ui-tabs-anchor') || $('#sections').hasClass('ui-tabs'))
															$('#sections').tabs('destroy');
														$('#sections').html('');
														$('#sections').html(response);
														$('#sections').tabs({
															beforeActivate: function( event, ui ) {beforeActiveTab(event,ui);}
														});
														setTimeout(function(){
														$('#sec-0').children().children().first('h3').click();
														if($('#sections ul li:first').text().trim()!='In-Store' && $('#sec-0').children().find('h3')!=undefined && $('#sec-0').children().find('h3').length==0){
															$('li[aria-controls="sec-0"] a').click();
															}
														$('.letters').filter(function(){
															var val=$(this).text().trim();
															var flag=true;
															for(var i=0;i<$('.keyList').text().trim().split(':').length;i++){
															if(val==$('.keyList').text().trim().split(':')[i])
															flag=false;
															}
															if(flag){
															$(this).parent().addClass('ui-state-disabled');
															}
															if(val==$('.keyList').text().trim().split(':')[1])
																$(this).click();
															});
														
														},500);
														$('#accordion-1 h3:first').click();
														
														wizard.next();
														$('.backBtn').addClass('hideBlock');
														
													
													} 
													else if (option == 'articleListJson') {
														fullScreenLoader();
														var data = $("<h4>").html(response).find("#articleList")
														.text();
														if($('#sections').hasClass('ui-tabs-anchor') || $('#sections').hasClass('ui-tabs'))
														$('#sections').tabs('destroy');
														
														$('#sections').html('');
														$('#sections').html(response);
														//console.log(data);
														
														iterateArticles(data,'default');
														wizard.next();
														$('.backBtn').addClass('hideBlock');
													}else if (option == 'articleHierarchy') {
														fullScreenLoader();
														var data = $("<h4>").html(response).find("#articleList")
														.text(); 
														if($('#sections').hasClass('ui-tabs-anchor'))
														$('#sections').tabs('destroy');
														
														$('#sections').tabs({
															beforeActivate: function( event, ui ) {beforeActiveTab(event,ui);}
														});
														//$('.ui-tabs-status-default.default-0 a').click();
														$('.letters').filter(function(){
															var val=$(this).text().trim();
															var flag=true;
															for(var i=0;i<$('.keyList').text().trim().split(':').length;i++){
															if(val==$('.keyList').text().trim().split(':')[i])
															flag=false;
															}
															if(flag){
															$(this).parent().addClass('ui-state-disabled');
															}
															if(val==$('.keyList').text().trim().split(':')[1])
																$(this).click();
															});
														$('#accordion-1 h3:first').click();
														
														//iterateArticles(data,'default-0');
														wizard.next();
														$('.backBtn').addClass('hideBlock');
													}else if(option=='noDat'){
														showError('Sorry no results returned for your search criteria. Please try again.');
													}
													else if (option.trim().length>0) {
														showError(option);
													}else {
														
														showError('Sorry no results returned for your search criteria. Please try again.');
													}
													stopLoading();
													bindContentsOfDetail();
													if($('#sections ul li:first').text().trim()=='In-Store' || $('#sections ul li:first').text().trim()=='% OFF'){
														$('#sections ul li:first a').click();
														}
													$('#dialog-modal2 .popupActionsWrapper label:first').addClass('hideBlock');
												},
												error : function() {
													// goToLogin();
													$.loader('close');
												},
											});
											
										}
										else if(validateFields())
										{
											data = $('#promotionsPlanning').serialize();
											var departmentId=$('#departmentInPromotions').val();
											data=data+"&departmentId="+departmentId;
											
											$
													.ajax({
														type : "post",
														url : "loadArticles.htm",
														data : data,
														//async:false,
														beforeSend : function() {
															//startLoading();
															fullScreenLoader();
														},
														success : function(response) {
															$.loader('close');
															var bindFlag = true;
															//fullScreenLoader();
															var option = $("<h4>").html(response).find("#option")
																	.val();
															//console.log("option"+option);
															if (option.trim() == 'noData' || option.trim() == 'No Data Found') {
																showError('Sorry no results returned for your search criteria. Please try again.');
																bindFlag = false;
															} else if (option == 'promotionDetails') {
																fullScreenLoader();
																$('body').scrollTop(0);
																
																if($('#sections').hasClass('ui-tabs-anchor') || $('#sections').hasClass('ui-tabs'))
																	$('#sections').tabs('destroy');
																$('#sections').html('');
																$('#sections').html(response);
																$('#sections').tabs({
																	  beforeActivate: function( event, ui ) {beforeActiveTab(event,ui);}
																});
																setTimeout(function(){
																	//$('#sec-0').children().children().first('h3').click();
																	if($('#sections ul li:first').text().trim()!='In-Store' && $('#sec-0').children().find('h3')!=undefined && $('#sec-0').children().find('h3').length==0){
																		$('li[aria-controls="sec-0"] a').click();
																		}
																var firstTab='';
																	$('.letters').filter(function(){
																	var val=$(this).text().trim();
																	var flag=true;
																	for(var i=0;i<$('.keyList').text().trim().split(':').length;i++){
																	if(val==$('.keyList').text().trim().split(':')[i])
																	flag=false;
																	}
																	if(flag){
																	$(this).parent().addClass('ui-state-disabled');
																	}
																	else if(flag==false && firstTab==''){
																		firstTab=val;
																		$(this).click();
																	}
																	
																	});
																},10);
																wizard.next();
																$('.backBtn').addClass('hideBlock');
															} else if (option == 'multipleResult') {
																showDescriptionPopup(response);
																bindMultipleSelect();
																bindArticleCheck();
															}else if (option == 'articleListJson') {
																fullScreenLoader();
																var data = $("<h4>").html(response).find("#articleList")
																.text();
																if($('#sections').hasClass('ui-tabs-anchor') || $('#sections').hasClass('ui-tabs'))
																$('#sections').tabs('destroy');
																$('#sections').html('');
																$('#sections').html(response);
																iterateArticles(data,'default');
																wizard.next();
																$('.backBtn').addClass('hideBlock');
															}else if (option == 'articleHierarchy') {
																fullScreenLoader();
																var data = $("<h4>").html(response).find("#articleList")
																.text(); 
																if($('#sections').hasClass('ui-tabs-anchor') || $('#sections').hasClass('ui-tabs'))
																$('#sections').tabs('destroy');
																
																$('#sections').html('');
																$('#sections').html(response);
																$('#sections').tabs({
																	beforeActivate: function( event, ui ) {beforeActiveTab(event,ui);}
																});
																//$('.ui-tabs-status-default.default-0 a').click();
																$('.letters').filter(function(){
																	var val=$(this).text().trim();
																	var flag=true;
																	for(var i=0;i<$('.keyList').text().trim().split(':').length;i++){
																	if(val==$('.keyList').text().trim().split(':')[i])
																	flag=false;
																	}
																	if(flag){
																	$(this).parent().addClass('ui-state-disabled');
																	}
																	if(val==$('.keyList').text().trim().split(':')[1])
																		$(this).click();
																	});
																$('#accordion-1 h3:first').click();
																wizard.next();
																$('.backBtn').addClass('hideBlock');
															}else if(option=='noDat'){
																showError('Sorry no results returned for your search criteria. Please try again.');
																bindFlag = false;
															}else if (option.trim().length>0) {
																showError(option);
																bindFlag = false;
															}else {
																showError('Sorry no results returned for your search criteria. Please try again.');
																bindFlag = false;
															}
															stopLoading();
															if(bindFlag){
																bindContentsOfDetail();
																if($('#sections ul li:first').text().trim()=='In-Store' || $('#sections ul li:first').text().trim()=='% OFF'){
																	$('#sections ul li:first a').click();
																	}
															}
															$('#dialog-modal2 .popupActionsWrapper label:first').addClass('hideBlock');
														},
														error : function() {
															// goToLogin();
														},
													});


										
										}
									},
									"click .jw-button-finish" : function() {
										wizard.finish();
									}
								});
							} else {
								this.element.on("click", ".jw-button-cancel",
										function() {
											//wizard.cancel();
										}).on("click", ".jw-button-prev",
										function() {
											$('.fixedHeader  .futureweek ').addClass('hideBlock');
											$('.fixedHeader  .currentweek ').removeClass('hideBlock');
											$('.fixedHeader').addClass('hideBlock');
											wizard.prev();
											//$('.backBtn').removeClass('hideBlock');
										}).on("click", ".jw-button-next",
										function() {
											wizard.next();
											//$('.backBtn').addClass('hideBlock');
										}).on("click", ".jw-button-finish",
										function() {
											wizard.finish();
										});
							}

							this._updateButtons();
						},

						/**
						 * @private
						 * @description Updates the visibility status of each of
						 *              the buttons depending on the end-user's
						 *              progress
						 * @see this._changeStep()
						 */
						_updateButtons : function() {
							var $steps = this.$steps, $current = this.$current, $prev = this.$prev, $next = this.$next, $finish = this.$finish;
							$('.errorDiv h4').text('');
							switch ($current.index()) {
							case 0:
								$prev.hide();
								$next.show();
								$finish.hide();
								// $next.removeAttr('onclick');
								//$next.attr('onclick', 'validateFields();');
								$('#invoice').focus();
								break;

							case $steps.length - 1:
								$prev.show();
								$next.hide();
								//$finish.show();
								$finish.attr('onclick', 'submitForm();');
								$('#temperature').focus();
								break;

							default:
								$prev.show();
								$next.show();
								$finish.hide();
								$next.attr('onclick', 'validate();');
								$('#invoiceConfirm').focus();
								break;
							}
						},

						_destroyButtons : function() {
							this.element.find(".jw-footer").remove();
						},

						_disableButtons : function() {
							this.element.find(".jw-footer").find("button")
									.addClass("ui-state-disabled");
						},

						_enableButtons : function() {
							this.element.find(".jw-footer").find("button")
									.removeClass("ui-state-disabled");
						},

						option : function(key, value) {
							if (this._superApply) {
								this._superApply(arguments);
							} else {
								if (arguments.length < 1
										|| key.indexOf(".") === -1) {
									$.Widget.prototype.option.apply(this,
											arguments);
								} else {
									var current = this.options, path = key
											.split("."), len = path.length - 1;

									$.each(path, function(x, part) {
										if (x >= len) {
											current[part] = value;
										} else {
											current = current[part];
										}
									});

									this._setOption(path[0], value);
								}
							}
						},

						_setOption : function(key, value) {
							if (this._superApply) {
								this._superApply(arguments);
							} else if (key === "disabled") {
								$.Widget.prototype._setOption.apply(this,
										arguments);
							}

							switch (key) {
							case "title":
								this[value ? "_buildTitle" : "_destroyTitle"]();
								break;

							case "menu":
								this[value ? "_buildMenu" : "_destroyMenu"]();
								break;

							case "buttons":
								this._destroyButtons();
								this._buildButtons();
								break;

							case "progress":
								this._destroyProgress();
								this._buildProgress();
								break;
							}
						},

						options : {
							title : true,

							menu : true,

							buttons : {

								prev : {
									"class" : "actionBtn",
									text : "Back",
									type : "button",
									"id" : "prev",
									//"onclick" : "backValidation();"
								},
								next : {
									"class" : "actionBtn",
									text : "Next",
									type : "button",
									"id" : "next",

								},
								finish : {
									"class" : "ui-state-highlight actionBtn",
									text : "Proceed",
									type : "button",
									"id" : "finish",

								},
								cancel : {
									"class" : "secondaryActionBtn hideBlock",
									text : "Reset",
									type : "reset",
									"id" : "cancel",
									//"onclick" : "backValidation();"

								}
							},

							progress : {
								label : "count",
								append : "Complete",
								location : ".jw-header"
							},

							effects : {
								// TODO: title, menu, progress
								steps : {
									hide : {
										effect : "blind",
										direction : "left",
										duration : 150
									},
									show : {
										effect : "blind",
										direction : "left",
										duration : 150
									}
								}
							}
						}
					});

}(jQuery));

function validate() {}

function validateFields() {
	hideError();
	//var flag=true;
	var depFlag = false;
	if ($('#depH').is(':checked')) {
		$('#deptlst li .department').each(function() {
			if ($(this).prop('checked'))
				depFlag = true;
		});
	}
	
	if ($('#promotionWeek').val()=='Select') {
		//$('#next').removeClass('jw-button-next');
		//flag=false;
		$('#promotionWeek').focus();
		showError('Please select the Promotion week.');
		return false;
	}else if (($('#articleNo').val().trim() == '' && ($('#departmentInPromotions').val() == 'Select' && (!($('#depH')
			.is(':checked')) || ($('#depH').is(':checked') && !depFlag))))) {
		//$('#next').removeClass('jw-button-next');
		//flag=false;
		showError('Article/Department required, please select valid article/department');
		return false;
	} else if ($('#minDiscount').val().trim() != ''
			&& parseInt($('#minDiscount').val().trim()) == 0) {
		//flag=false;
		showError('Minimum Discount % value not valid, please enter a valid minimum discount %');
		return false;
		//$('#next').removeClass('jw-button-next');
	} else if ($('#articleNo').val().trim() != ""
			&& $('#number').is(':checked')
			&& isNaN($('#articleNo').val().trim())) {
		//flag=false;
		showError('Please a valid article number.');
		$('#articleNo').focus();
		return false;
		//$('#next').removeClass('jw-button-next');
	} /*else if ($('#warehouse').is(':checked')
			&& $('#warehouseDropDown').val() == 'warehouseDropDownSelect') {
		//flag=false;
		showError('Please select a warehouse.');
		return false;
		//$('#next').removeClass('jw-button-next');
	} else if ($('#vendor').is(':checked') && $('#supplier').val().trim() == '') {
		//flag=false;
		showError('Please select a vendor.');
		$('#supplier').focus();
		return false;
		//$('#next').removeClass('jw-button-next');
	}*/ else if ($('#unit').is(':checked')
			&& parseInt($('#omVal').val().trim()) <= 1) {
		//flag=false;
		showError('OM Differ value not valid, please enter a value of 2 or greater.');
		return false;
		//$('#next').removeClass('jw-button-next');
	}else {
		return true;
	}
	

}

function submitForm() {
}
function clearAll() {
	//$('.textbox').val('');
	//$('#ui-id-2,#receiveAmount').click();
	//$('.formQuestion').addClass('hideBlock');
}
function showWarning(text) {
	$('#errorMsgText').text(text);
	$("#newerrorMsgDiv,.tableStart").removeClass('hideBlock');//defect 14600
	$("#newerrorMsgDiv").addClass('tableTitle nodataMessage');//defect 14600
	$("#newerrorMsgDiv").removeClass('tableTitle errorDiv');//defect 14600
}
function showError(text) {
	$('#errorMsgText').text(text);
	$("#newerrorMsgDiv,.tableStart").removeClass('hideBlock');//defect 14600
	$("#newerrorMsgDiv").removeClass('tableTitle nodataMessage');//defect 14600
	$("#newerrorMsgDiv").addClass('tableTitle errorDiv');//defect 14600

}
function showDescriptionPopup(response){
	$('.dialog-modal2').html(response);
	if (!$("#dialog-modal2").dialog("isOpen")) {
		$("#dialog-modal2").parent().addClass(
				"popupWrapper");
		$("#dialog-modal2").dialog("open");
	}
}
