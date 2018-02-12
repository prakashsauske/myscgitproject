/**
 * jWizard: a jQuery UI Wizard Widget
 *
 * @author Dominic Barnes <dominic@dbarnes.info>
 * @version 2.0.0
 */
(function ($, undefined) {

/**
 * A minimal configuration wizard widget
 *
 * @name   jWizard jQuery UI Widget
 * @author Dominic Barnes <dominic@dbarnes.info>
 *
 * @requires jQuery
 * @requires jQuery UI Widget Factory
 * @requires jQuery UI ProgressBar
 */
$.widget("db.progressbar", $.ui.progressbar, {
    _create: function () {
        if (this._super) {
            this._super();
        } else {
            $.ui.progressbar.prototype._create.call(this);
        }

        if (this.options.label) this._createLabel();
        this._refreshValue();
    },

    destroy: function () {
        if (this.options.label) this._destroyLabel();

        if (this._super) {
            this._super();
        } else {
            $.ui.progressbar.prototype.destroy.call(this);
        }
    },

    _refreshValue: function () {
        if (this._superApply) {
            this._superApply(arguments);
        } else {
            $.ui.progressbar.prototype._refreshValue.apply(this, arguments);
        }

        if (this.label) this._updateLabel();
    },

    _setOption: function (key) {
        if (key === "value" && this.options.label) {
            this._updateLabel();
        }

        if (this._superApply) {
            this._superApply(arguments);
        } else {
            $.ui.progressbar.prototype._setOption.apply(this, arguments);
        }
    },

    _createLabel: function () {
        if (this.label) return;

        this.label = $('<span class="ui-progressbar-label"></span>').appendTo(this.element);
        this._updateLabel();
    },

    _updateLabel: function () {
        var options = this.options,
            text = options.label === "count" ? this._count() : this._percentage() + "%";

        if (options.append) text += " " + options.append;

        this.label.text(text).position({
            my: "center",
            at: "center",
            of: this.element
        });
    },

    _destroyLabel: function () {
        this.label.remove();
        this.label = null;
    },

    _count: function () {
        return this.value() + " of " + this.options.max;
    },

    options: {
        label:  null, // "percentage", "count", OR null/false
        append: false // text to append to the label
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

$.widget("db.jWizard", {
    $steps: null, // all steps
    $current: null, // current/active step
    widgetEventPrefix: "wizard",

    _create: function () {
        var o = this.options;

        if (this._super) {
            this._super();
        } else {
            $.Widget.prototype._create.call(this);
        }

        if (o.disabled) this.disable();

        this.element.addClass("ui-widget jw-widget");
        this._buildSteps();
        if (o.title) this._buildTitle();
        if (o.menu) this._buildMenu();
        this._buildButtons();
        if (o.progress) this._buildProgress();
    },

    destroy: function () {
        var o = this.options;

        this.element.removeClass("ui-widget jw-widget jw-hasprogress");
        if (o.progress) this._destroyProgress();
        this._destroyButtons();
        if (o.menu) this._destroyMenu();
        if (o.title) this._destroyTitle();
        this._destroySteps();

        if (this._super) {
            this._super();
        } else {
            $.Widget.prototype.destroy.call(this);
        }
    },

    first: function () {
        return this.step(this.$steps.first());
    },

    last: function () {
        return this.step(this.$steps.last());
    },

    cancel: function () {
        // TODO: ui data
        this._trigger("cancel");
    },

    prev: function () {
        return this.step(this.$current.prev());
    },

    next: function () {
        return this.step(this.$current.next());
    },

    finish: function () {
        // TODO: ui data
        this._trigger("finish");
    },

    step: function ($step) {
        var wizard = this,
            dfd = $.Deferred();

        if (typeof $step === "number") {
            $step = this.$steps.eq($step);
        }

        function goback() {
            wizard._enter(wizard.$current).then(dfd.resolve, dfd.reject);
        }

        function proceed() {
            wizard._enableButtons();
            dfd.resolve();
        }

        this._disableButtons();

        this._leave(this.$current).then(function () {
            wizard._enter($step).then(proceed, goback);
        }, goback);

        return dfd.promise();
    },

    _leave: function ($step) {
        var hide   = $.Event("stephide"),
            dfd    = $.Deferred(),
            effect = this.options.effects.steps.hide;

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

    _enter: function ($step) {
        var wizard = this,
            show   = $.Event("stepshow"),
            dfd    = $.Deferred(),
            effect = this.options.effects.steps.show;

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
    _buildTitle: function () {
        if (this.$title) return;

        this.$title = $('<h2 class="jw-title" />');

        this.$header = $('<div class="jw-header ui-widget-header ui-corner-top ui-helper-clearfix">')
            .append(this.$title)
            .prependTo(this.element);

        this._updateTitle();
    },

    // Update .jw-title
    _updateTitle: function () {
        var $title = this.$title;

        if ($title) {
            $title.text(this.$current.data("jwizard-title"));
        }
    },

    // Destroy .jw-header
    _destroyTitle: function () {
        this.$header.remove();

        this.$title = this.$header = null;
    },

    /**
     * Initializes the step collection.
     *
     * Any direct children <div> (with a title or data-jwizard-title attr)
     * or <fieldset> (with a <legend>) are considered steps, and there should
     * be no other sibling elements.
     *
     * Lastly, a <div class"jw-steps-wrap"> is wrapped around all the steps to
     * isolate them from the rest of the widget.
     */
    _buildSteps: function () {
        var $steps = this.$steps = this.element.children();

        $steps.addClass("jw-step").each(function () {
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

        $steps.hide().wrapAll($("<div />", {
            "class": "jw-content ui-widget-content ui-helper-clearfix",
            html: '<div class="jw-steps-wrap" />'
        }));

        this.$current = this.$steps.first().show();
    },

    /**
     * Destroys the step wrappers and restores the steps to their original state
     */
    _destroySteps: function () {
        this.$steps.show()
            .unwrap().unwrap() // Unwrap 2x: .jw-steps-wrap + .jw-content
            .removeData("jwizard-title")
            .removeClass("jw-step");

        this.$steps = null;
    },

    /**
     * Builds the menu based on the collection of steps
     * Assigns a class to the main <div> to indicate to CSS that there is a menu
     * Binds a click event to each of the <a> that will change the step
     * accordingly when clicked
     */
    _buildMenu: function () {
        var wizard = this;
        this.element.addClass("jw-hasmenu");

        if (this.$menu) return;

        this.$menu = $("<ol>", {
            class: "jw-menu",
            html: $.map(this.$steps, function (step) {
                var title = $(step).data("jwizard-title");
                return '<li><a href="javascript:void(0);">' + title + '</a>';
            }).join("")
        }).menu({
            select: function (e, ui) {
                wizard.step(ui.item.index());
            }
        });

        this.$menuWrap = $('<div class="jw-menu-wrap">')
            .append(this.$menu)
            .prependTo(this.element.children(".jw-content"));

        this._updateMenu();
    },

    _updateMenu: function () {
        if (!this.$menu) return;

        var index = this.$current.index();

        this.$menu.children("li")
            .removeClass("ui-state-highlight ui-state-disabled")
            .eq(index).addClass("ui-state-highlight").end()
            .slice(index).addClass("ui-state-disabled");
    },

    /**
     * Removes the 'jw-hasmenu' class and pulls the menu out of the DOM entirely
     */
    _destroyMenu: function () {
        this.element.removeClass("jw-hasmenu");
        this.$menu.menu("destroy");
        this.$menuWrap.remove();

        this.$menu = this.$menuWrap = null;
    },

    _buildProgress: function () {
        if (this.$progress) return;

        var options   = $.extend({}, this.options.progress),
            location  = options.location,
            $progress = $("<div>").appendTo(this.element.find(location));

        delete options.location;
        options.max = this.$steps.length;

        this.element.addClass("jw-hasprogress");
        this.$progress = $progress.progressbar(options).addClass("jw-progress");
        this._updateProgress();
    },

    _updateProgress: function () {
        if (!this.$progress) return;

        var $current = this.$current,
            index = $current ? $current.index() : 0;

        this.$progress.progressbar("value", index);
    },

    _destroyProgress: function () {
        this.element.removeClass("jw-hasprogress");
        this.$progress.progressbar("destroy").remove();
        this.$progress = null;
    },

    /**
     * @private
     * @description This generates the <button> elements for the main navigation and binds `click` handlers to each of them
     * @see this._changeStep()
     */
    _buildButtons: function () {
        var wizard = this,
            $footer = $("<div>", {
                "class": "jw-footer ui-widget-header ui-corner-bottom popupActionsWrapper",
                html: '<div class="jw-buttons ui-helper-clearfix"></div>'
            });

        $.each(this.options.buttons, function (type, data) {
            var options = $.extend({}, data),
                icons = options.icons;

            delete options.icons;

            options.class = options["class"] || "";
            options.class += " jw-button-" + type;

            if (data) {
                wizard["$" + type] = $('<label>', options)
                    .button({
                        icons: icons
                    })
                    .appendTo($footer.children(".jw-buttons"));
            }
        });

        this.element.append($footer);

        if (this._on) {
            this._on({
                "click .jw-button-cancel": function () {
                    wizard.cancel();
                },
                "click .jw-button-prev": function () {
                    wizard.prev();
                },
                "click .jw-button-next": function () {
                    wizard.next();
                },
                "click .jw-button-finish": function () {
                    wizard.finish();
                }
            });
        } else {
            this.element
                .on("click", ".jw-button-cancel", function () {
                    wizard.cancel();
                })
                .on("click", ".jw-button-prev", function () {
                    wizard.prev();
                })
                .on("click", ".jw-button-next", function () {
                    wizard.next();
                })
                .on("click", ".jw-button-finish", function () {
                    wizard.finish();
                });
        }

        this._updateButtons();
    },

    /**
     * @private
     * @description Updates the visibility status of each of the buttons depending on the end-user's progress
     * @see this._changeStep()
     */
    _updateButtons: function () {
        var $steps   = this.$steps,
            $current = this.$current,
            $prev    = this.$prev,
            $next    = this.$next,
            $finish  = this.$finish;
        $('.errorDiv h4').text('');
        switch ($current.index()) {
        case 0:
            $prev.hide();
            $next.show();
            $finish.hide();
           // $next.removeAttr('onclick');
            $next.attr('onclick','validateFields();');
            $('#invoice').focus();
            break;

        case $steps.length - 1:
            $prev.show();
            $next.hide();
            $finish.show();
            $finish.attr('onclick','submitForm();');
            $('#temperature').focus();
            break;

        default:
            $prev.show();
            $next.show();
            $finish.hide();
            $next.attr('onclick','validate();');
            $('#invoiceConfirm').focus();
            break;
        }
    },

    _destroyButtons: function () {
        this.element.find(".jw-footer").remove();
    },

    _disableButtons: function () {
        this.element.find(".jw-footer").find("button").addClass("ui-state-disabled");
    },

    _enableButtons: function () {
        this.element.find(".jw-footer").find("button").removeClass("ui-state-disabled");
    },

    option: function (key, value) {
        if (this._superApply) {
            this._superApply(arguments);
        } else {
            if (arguments.length < 1 || key.indexOf(".") === -1) {
                $.Widget.prototype.option.apply(this, arguments);
            } else {
                var current = this.options,
                    path = key.split("."),
                    len = path.length - 1;

                $.each(path, function (x, part) {
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

    _setOption: function (key, value) {
        if (this._superApply) {
            this._superApply(arguments);
        } else if (key === "disabled") {
            $.Widget.prototype._setOption.apply(this, arguments);
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

    options: {
        title: true,

        menu: true,

        buttons: {
            
            prev: {
            	"class": "actionBtn",
				text: "Back",
                type: "button",
               "id":"prev",
                
            },
            next: {
				"class": "actionBtn",
                text: "Next",
                type: "button",
                "id":"next",
                
                
            },
			finish: {
                "class": "ui-state-highlight actionBtn",
                text: "Proceed",
                type: "button",
                "id":"finish",
                
            },
			cancel: {
                "class": "secondaryActionBtn",
                text: "Cancel",
                type: "reset",
                "id":"cancel",
                "onclick":"clearAll();"
                
            }
        },

        progress: {
            label: "count",
            append: "Complete",
            location: ".jw-header"
        },

        effects: {
            // TODO: title, menu, progress
            steps: {
                hide: {
                    effect:    "blind",
                    direction: "left",
                    duration:  150
                },
                show: {
                    effect:    "blind",
                    direction: "left",
                    duration:  150
                }
            }
        }
    }
});

}(jQuery));






function validate()	
{
	
	if($('#receiveAmount').is(':checked'))
	{
		
		if($('#invoiceConfirm').val()=="")
		{
		$('#next').removeClass('jw-button-next');
		$('.errorDiv h4').text('Please re-enter invoice number for confirmation');
		$('#invoiceConfirm').focus();
		}
		else if($('#invoice').val()!=$('#invoiceConfirm').val())
		{
		$('#next').removeClass('jw-button-next');
		$('.errorDiv h4').text('Invoice number doesnt match with basic information');
		$('#invoiceConfirm').focus();
		}
	else if($('#amountConfirm').val()=="")
	{
		$('#next').removeClass('jw-button-next');
		$('.errorDiv h4').text('Please re-enter total amount for confirmation');
		$('#amountConfirm').focus();
	}
	else if(Number($('#amount').val())!=Number($('#amountConfirm').val()))
	{
		$('#next').removeClass('jw-button-next');
		$('.errorDiv h4').text('Total amount doesnt match with basic information');
		$('#amountConfirm').focus();
	}
	else if($('#gstConfirm').val()=="")
	{
		//gst not same
		$('#next').removeClass('jw-button-next');
		$('.errorDiv h4').text('Please re-enter gst for confirmation');
		$('#gstConfirm').focus();
	}
		else if(Number($('#gst').val())!=Number($('#gstConfirm').val()))
		{
			//gst not same
			$('#next').removeClass('jw-button-next');
			$('.errorDiv h4').text('GST doesnt match with basic information');
			$('#gstConfirm').focus();
		}
		else
			{$('#next').addClass('jw-button-next');setTimeout(function(){$('#temperature').focus();},500);}
	
	}
	else if($('#receiveDocket').is(':checked'))
	{
		if($('#docketConfirm').val()=="")
		{
			//invoice not same
		
		$('#next').removeClass('jw-button-next');
		$('.errorDiv h4').text('Please re-enter delivery docket for confirmation');
		$('#docketConfirm').focus();
		
		}
		else if($('#docket').val()!=$('#docketConfirm').val())
			{
				//invoice not same
			
			$('#next').removeClass('jw-button-next');
			$('.errorDiv h4').text('Delivery docket number doesnt match with the basic information');
			$('#docketConfirm').focus();
			
			}
		else
		{
			$('#next').addClass('jw-button-next');
			setTimeout(function(){$('#temperature').focus();},500);
			$('#temperature').focus();
		}
	}
}


function validateFields()
{
	if($('#receiveAmount').is(':checked'))
	{
		
	if($('#invoice').val()=="")
	{
	$('#next').removeClass('jw-button-next');
	$('.errorDiv h4').text('Please enter invoice number');
	$('#invoice').focus();
	}
else if($('#amount').val()=="")
{
	$('#next').removeClass('jw-button-next');
	$('.errorDiv h4').text('Please enter total amount');
	$('#amount').focus();
}
else if($('#gst').val()=="")
{
	//gst not same
	$('#next').removeClass('jw-button-next');
	$('.errorDiv h4').text('Please enter gst');
	$('#gst').focus();
}
else if(Number($('#gst').val())>Number($('#amount').val()))
{
	$('#next').removeClass('jw-button-next');
	$('#GstText').text("GST cannot be larger than the Total Amount. Please re-enter.");
	$( "#dialog-modalGST" ).dialog( "open" );
	//gst not same
	//$('#next').removeClass('jw-button-next');
	///$('.errorDiv h4').text('Please enter gst');
	//$('#gstConfirm').focus();
}
else if(Number($('#gst').val())==Number($('#amount').val()))
{
	$('#next').removeClass('jw-button-next');
	$('#GstText').text("GST cannot be the same as the Total Amount. Please re-enter.");
	$( "#dialog-modalGST" ).dialog( "open" );
	//gst not same
	//$('#next').removeClass('jw-button-next');
	///$('.errorDiv h4').text('Please enter gst');
	//$('#gstConfirm').focus();
}
else if($('#amount').val().length>14)
{
	$('#next').removeClass('jw-button-next');
	$('.errorDiv h4').text('Total amount should not exceed 14 characters');
	$('#amount').focus();
}
else if($('#gst').val().length>14)
{
	$('#next').removeClass('jw-button-next');
	$('.errorDiv h4').text('Gst should not exceed 14 characters');
	$('#amount').focus();
}
else
	{$('#next').addClass('jw-button-next');
	$('#invoiceConfirm').focus();
	setTimeout(function(){$('#invoiceConfirm').focus();},500);
	}
	}
else
{
	if($('#docket').val()=="")
			{
				//invoice not same
			
			$('#next').removeClass('jw-button-next');
			$('.errorDiv h4').text('Please enter docket number');
			$('#docketConfirm').focus();
			
			}
		else
		{
			$('#next').addClass('jw-button-next');
$('#docketConfirm').focus();
setTimeout(function(){$('#docketConfirm').focus();},500);
		}
	}
}

function submitForm(){
	if(temperatureFlag==true)
	{
if($("#temperature").val()!=""){
	if(quesLevel==1)
		{
		
			if($('#dialog-modal #ansyes').is(':checked')==true)
			{
				callNextPopup();
			}
			else
			{
				$('#wizard').submit();	
			}
		}
	else if(quesLevel==2)
		{

			if($('#dialog-modal #ansyes').is(':checked')==true)
			{
				callCancelOrder();
			}
			else
			{
				$('.formQuestion').addClass('hideBlock');
				$('.warningMessage h4').text('');
				$("#temperature").val('').focus();	
			}
		}else if(quesLevel==4){
			if($('#dialog-modal #ansyes').is(':checked')==true){
				callNextPopupPetrol(quesLevel);
				quesLevel=6;
			}else{

				$('#wizard').submit();
				$( "#dialog-modalTemperature" ).dialog( "close" );
				
			}
			
		}else if(quesLevel==5){
			if($('#dialog-modal #ansyes').is(':checked')==true){
				call5thquestionPetrol(quesLevel);
				quesLevel=8;
			}else{

				call4thquestionPetrol(quesLevel);
				quesLevel=7;
				
			}
			
		}else if(quesLevel==6){
			if($('#dialog-modal #ansyes').is(':checked')==true){

				$('#wizard').submit();
				$( "#dialog-modalTemperature" ).dialog( "close" );
			}else{
				call3rdquestionPetrol(quesLevel);
				quesLevel=5;
				
			}
			
		}else if(quesLevel==7){
			$('#wizard').submit();
			
		}else if(quesLevel==8){
			if($('#dialog-modal #ansyes').is(':checked')==true){

				callCancelOrder();
			}else{
				$('#wizard').submit();
				$( "#dialog-modalTemperature" ).dialog( "close" );
				
				
			}
			
		}else if(quesLevel==10){
			//do nothing
			
		}/*else if(quesLevel==9){
			if($('#dialog-modal #ansyes').is(':checked')==true){

				callCancelOrder();
				quesLevel=9;
				
			}else{
				//temporary cancel--will be replaced with zero qty receive.
				$('#wizard').submit();
				$( "#dialog-modalTemperature" ).dialog( "close" );
				
				
			}
			
		}*/else{
			$('#wizard').submit();
		}/*
	else
		{
		$('#wizard').submit();
		}*/
		}
		else
			{
			$('.errorDiv h4').text('Please enter temperature');
			$("#temperature").focus();
			}
	}
	else
		{
		//alert(temperatureFlag);
		if($('#receiveAmount').is(':checked'))
		{
			
			if($('#invoiceConfirm').val()=="")
			{
			$('#next').removeClass('jw-button-next');
			$('.errorDiv h4').text('Please re-enter invoice number for confirmation');
			$('#invoiceConfirm').focus();
			}
			else if($('#invoice').val()!=$('#invoiceConfirm').val())
			{
			$('#next').removeClass('jw-button-next');
			$('.errorDiv h4').text('Invoice number doesnt match with basic information');
			$('#invoiceConfirm').focus();
			}
		else if($('#amountConfirm').val()=="")
		{
			$('#next').removeClass('jw-button-next');
			$('.errorDiv h4').text('Please re-enter total amount for confirmation');
			$('#amountConfirm').focus();
		}
		else if(Number($('#amount').val())!=Number($('#amountConfirm').val()))
		{
			$('#next').removeClass('jw-button-next');
			$('.errorDiv h4').text('Total amount doesnt match with basic information');
			$('#amountConfirm').focus();
		}
		else if($('#gstConfirm').val()=="")
		{
			//gst not same
			$('#next').removeClass('jw-button-next');
			$('.errorDiv h4').text('Please re-enter gst for confirmation');
			$('#gstConfirm').focus();
		}
			else if(Number($('#gst').val())!=Number($('#gstConfirm').val()))
			{
				//gst not same
				$('#next').removeClass('jw-button-next');
				$('.errorDiv h4').text('GST doesnt match with basic information');
				$('#gstConfirm').focus();
			}
			else
				{$('#next').addClass('jw-button-next');
				$('#wizard').submit();}
		
		}
		else if($('#receiveDocket').is(':checked'))
		{
			if($('#docketConfirm').val()=="")
			{
				//invoice not same
			
			$('#next').removeClass('jw-button-next');
			$('.errorDiv h4').text('Please re-enter delivery docket for confirmation');
			$('#docketConfirm').focus();
			
			}
			else if($('#docket').val()!=$('#docketConfirm').val())
				{
					//invoice not same
				
				$('#next').removeClass('jw-button-next');
				$('.errorDiv h4').text('Delivery docket doesnt match with basic information');
				$('#docketConfirm').focus();
				
				}
			else
			{
				$('#next').addClass('jw-button-next');
				$('#wizard').submit();
			}
		}
		
		}	
}
function clearAll() {	
	$('.textbox').val('');
	$('#ui-id-2,#receiveAmount').click();
	$('.formQuestion').addClass('hideBlock');
}

function callNextPopupPetrol(quesLevel){

	 //2nd question
	 	var question="Are products hard frozen?";

	 			$('.formQuestion p').text(question);
				$('.warningMessage h4').text('');
				quesLevel=6;
				$('.warningMessage h4').addClass('hideBlock');
				$('.formQuestion').removeClass('hideBlock');
				$('.formQuestion p').removeClass('hideBlock');
				
				
	 	}

function call4thquestionPetrol(quesLevel){

	 //4th question
	 var question4="Temperature too high.Refer to Food Safety Guide and receive rejected items as zero QTY. Ok?";
	

	 			$('.formQuestion p').text('');
				$('.warningMessage h4').text(question4);
				quesLevel=7;
				$('.radioHide').addClass('hideBlock');
				$('.warningMessage h4').removeClass('hideBlock');
				$('.formQuestion').addClass('hideBlock');
				
				
	 	}
function call5thquestionPetrol(quesLevel){

	 //5th question
	 var question5="Entire load is being rejected/cancelled due to incorrect temperature. Is this correct?";

	 			$('.formQuestion p').text('');
				$('.warningMessage h4').text(question5);
				quesLevel=8;
				$('.warningMessage h4').removeClass('hideBlock');
				$('.formQuestion p').addClass('hideBlock');
				
				
	 	}
function call3rdquestionPetrol(quesLevel){

	 //5th question
	 var question3="Temperature too high. Will entire order be rejected/cancelled?";

	 			$('.formQuestion p').text('');
				$('.warningMessage h4').text(question3);
				quesLevel=5;
				$('.warningMessage h4').removeClass('hideBlock');
				$('.formQuestion p').addClass('hideBlock');
				
				
				
	 	}
/*function call6thquestionPetrol(quesLevel){

	 //5th question
	 var question3="Do you wish to receive  every item in this order as ZERO Qty?";

	 			$('.formQuestion p').text(question3);
				$('.warningMessage h4').text('');
				quesLevel=9;
				$('.warningMessage h4').addClass('hideBlock');
				$('.formQuestion').removeClass('hideBlock');
				$('.formQuestion p').removeClass('hideBlock');
				
				
	 	}*/

tempChange=false;