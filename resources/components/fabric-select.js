import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
	is: "fabric-select",
	_template: html`
		<style>
			:host{display:block;}
			.layout.vertical{@apply(--layout-vertical);}
			.layout.horizontal{@apply(--layout-horizontal)}
			.fit{@apply(--layout-fit)}
			.flex, .flex-1{@apply(--layout-flex)}
			.fabric-select{
				background-color:#FFF;
				position: relative;font-size: 16px;
				display: inline-block;box-sizing:border-box;
				width:100%;max-width: 100%;
				@apply --fabric-select-inner;
			}
			.fabric-select.tiny{width:100px}
			.is-focused .fabric-select-label,
			.is-dirty .fabric-select-label,
			.has-placeholder .fabric-select-label{
			    visibility: hidden;
			}
			:host(.fabric-select--floating-label) .is-focused .fabric-select-label,
			:host(.fabric-select--floating-label) .is-dirty .fabric-select-label,
			:host(.fabric-select--floating-label) .has-placeholder .fabric-select-label,
			:host(.fabric-select--floating-label) .has-input .fabric-select-label{
				-webkit-transform: translateY(-75%) scale(0.75);
			    transform: translateY(-75%) scale(0.75);
			    width: 133%;
				visibility: visible;
			}
			:host(.fabric-select--floating-label) .fabric-select-label {
			    transition-duration: .2s;
			    transition-timing-function: cubic-bezier(.4,0,.2,1);
			}
			.fabric-select-label {
			    color: rgba(0,0,0,.26);
			    font-size: 16px;
			    left: 0;
			    right: 0;
			    pointer-events: none;
			    position: absolute;
			    display: block;
			    top:25px;
			    width: 100%;
			    overflow: hidden;
			    white-space: nowrap;
			    text-align: left;
			    font: inherit;
			    color: var(--paper-input-container-color, var(--secondary-text-color));
			    -webkit-transition: -webkit-transform 0.25s, width 0.25s;
			    transition: transform 0.25s, width 0.25s;
			    -webkit-transform-origin: left top;
			    transform-origin: left top;
			    box-sizing:border-box;
				@apply --paper-font-common-nowrap;
			    @apply --paper-font-subhead;
			}

			.fabric-select-label.hide{display:none}
			.fabric-select .fabric-select-holder{
			    @apply --layout-horizontal;
			    @apply --layout-wrap;
			    box-sizing:border-box;
			    padding:25px 5px 5px;
			    min-height:30px;
			    position:relative;
			    border-bottom:1px solid #DDD;
			    @apply --fabric-select-holder;
			}
			.fabric-select .chip{
				@apply --layout-horizontal;
				@apply --layout-center;
				border:1px solid #DDD;
				margin-right:5px;
				margin-bottom:3px;
				margin-top:4px;
				white-space:nowrap;
				padding:0px 5px;
				user-select:none;
				height:20px;
				@apply --paper-font-subhead;
				@apply --fabric-select-chip;
			}
			.fabric-select .chip .chip-action{
				border-radius:50%;
				border:0px;
				background:transparent;
				padding:0px;
				color:#150101;
				line-height:1;
				margin-left:5px;
				cursor:pointer;
				width: 17px;
    			height: 17px;
    			@apply --fabric-select-chip-action;
			}
			.fabric-select .chip .chip-action iron-icon{
				width:13px;height:13px;
			}
			.fabric-select .chip button:focus{
				@apply --fabric-select-chip-action-focus;
			}
			.fabric-select .fabric-select-holder .chip button::-moz-focus-inner{border:0px}
			.fabric-select-input{
				border:0px;outline:none;padding:0px;margin:0px;position:absolute;height:1px;width:50%;
				@apply --paper-font-subhead;
				z-index:-1;opacity:0;
			}
			.fabric-select .fabric-select-holder:after{
			    content: " ";
			    position: absolute;
			    bottom: -1px;
			    left: 50%;
			    right: 50%;
			    background: #3f51b5;
			    height: 2px;
			    transition:all 0.2s ease;
			}
			.fabric-select.is-focused .fabric-select-holder:after{left: 0%;right: 0%;}
			.fabric-select-list{width:100%;max-width:100%}
			.fabric-select-list .item{cursor:pointer;}
			.fabric-select-list .item:hover{background-color:#eee}

			.fabric-select-inputbox{
			    -webkit-flex-basis: .000000001px;
			  -ms-flex-preferred-size: .000000001px;
			          flex-basis: .000000001px;
			     -webkit-box-flex: 1;
			  -webkit-flex-grow: 1;
			  -ms-flex-positive: 1;
			          flex-grow: 1;
			  -webkit-flex-shrink: 1;
			  -ms-flex-negative: 1;
			          flex-shrink: 1;
			  -webkit-flex: 1;
			      -ms-flex: 1;
			          flex: 1;
			    min-width:50px;outline-style: none;
			    border: 0px solid #ddd;
			    padding:2px 5px;margin: 0px;display:inline-block;font-size:16px;height:22px;
			    @apply --paper-font-subhead;
			    @apply --fabric-select-input;
			}
			.fabric-select-inputbox:focus{outline-width: 0px;}
			.chip .chip-text{font-family: "Helvetica","Arial",sans-serif; @apply --fabric-select-chip-text;}
			:host(.no-chips) .chip{border:0px;background-color:transparent;line-height:1;padding-left:0px;height:auto;}
			:host(.no-chips) .chip .chip-action{display:none;}
			:host(.no-chips) .chip .chip-text{font-size: 16px;}
			:host(.no-chips) .fabric-select-holder{min-height:49px}
			:host(.fabric-select--floating-label) .fabric-select-holder{
				margin-top:18px;
			}
			:host(:not(.fabric-select--floating-label)) .fabric-select-label{
				top:0px;
			}
			:host(.no-chips.fabric-select--floating-label) .fabric-select-holder{
				min-height:29px;
			}
			:host(.no-chips:not(.fabric-select--floating-label)) .fabric-select-holder{
				min-height:29px;padding-top:5px
			}

			:host(.inline-list-items) .fabric-select-list .item:not(.hide){
			  display:inline-block;
			  padding:0px 5px;min-height:20px;background-color:#ececec;
			  margin:2px 4px;
			  @apply --fabric-select-inline-item;
			}
			:host(.inline-list-items) .fabric-select-list paper-listbox{
				white-space:normal;
				@apply --fabric-select-inline-item-paper-listbox;
			}
			:host(.inline-list-items) .fabric-select-list .item.is-selected{background-color:#767676;color:#FFF}
			:host(.inline-list-items) .fabric-select-list .item:hover{
				background-color:#d2d2d2;color:rgba(0,0,0,.87);
			}
			:host(.inline-list-items) #dropdownContent{padding:0px 0px;min-height:100px}
			:host(.hide-selected) .fabric-select-list .item.iron-selected{display:none;}
		</style>
		<div id="content" class="fabric-select">
			<label class="fabric-select-label" hidden$="[[!label]]">[[label]]</label>
			<div class="fabric-select-holder" id="display"></div>
			<!--div>selected:[[selected]]</div-->
			<paper-menu-button id="menuButton" restore-focus-on-close="[[restoreFocusOnClose]]" vertical-align="[[verticalAlign]]" opened="{{dropdownOpened}}">
				<span slot="dropdown-trigger" class="dropdown-trigger"></span>
				<div slot="dropdown-content" class="dropdown-content fabric-select-list" id="dropdownContent" >
					<template is="dom-if" if="[[allSelected]]">
						<paper-item>[[noItemText]]</paper-item>
					</template>
					<template is="dom-if" if="[[multiple]]">
						<paper-listbox id="dropdownMenu" selected-values="{{selected}}" attr-for-selected="dataid" multi>
							<template is="dom-repeat" items="[[listItems]]">
								<paper-item class="item" hidden$="[[item.isHidden]]" dataid$="[[getMenuItemId(item, items)]]">[[getMenuItemText(item, items)]]</paper-item>
							</template>
						</paper-listbox>
					</template>
					<template is="dom-if" if="[[!multiple]]">
						<paper-listbox id="dropdownMenu" selected="{{selected}}" attr-for-selected="dataid">
							<template is="dom-repeat" items="[[listItems]]">
								<paper-item class="item" hidden$="[[item.isHidden]]" dataid$="[[getMenuItemId(item, items)]]">[[getMenuItemText(item, items)]]</paper-item>
							</template>
						</paper-listbox>
					</template>
				</div>
			</paper-menu-button>
			<input class="fabric-select-input" name$="[[_inputName(this.inputName)]]" />
			<a id="focusEl"></a>
		</div>
	`,
	properties:{
		items:{type: Array},
		selected:{type: Array, value: [],notify:true},
		inputPlaceholder: String,
		inputName:{type: String, value: ""},
		newPrefix: {type:String, value: "[n]:"},
		valueKey:{type: String, value: "value"},
		textKey:{type: String, value: "text"},
		allowNew: Boolean,
		required: Boolean,
		multiple: {type: Boolean, value: false},
		singleTimeFilter: Boolean,
		autoClose: Boolean,
		disableInput: {type: Boolean,value: false},
		listItems:{type: Array, value: []},
		minDropdownWidth:{type: Number, value: 100},
		dontCloseList:Boolean,
		directEntry:Boolean,
		restoreFocusOnClose:{type: Boolean, value: false},
		label:String
	},
	observers:[
		"onSelectedChanged(selected, selected.*)",
		"onItemsChanged(items, items.*)",
		"onDropDownOpenedChanged(dropdownOpened)"
	],
	ready : function() {
		this.$el = $(this.$.content);
		this.init();
	},
	_inputName: function(name){
		return name || "fabric-select[]";
	},
	attached:function(){
		this.onWindowResize();
	},
	onWindowResize:function(){
		var width = this.getBoundingClientRect().width;
		if(width < this.minDropdownWidth)
			width = this.minDropdownWidth
		//console.log("width", width)
		this.$.dropdownContent.style.width = width+"px";
		this.$.menuButton.$.dropdown.notifyResize();
	},
	filterNewValue: function(v){
		if(!v)
			return
		var item = {};
		item[this.valueKey] = v;
		item[this.textKey] = v;
		return item;
	},
	getMenuItemId: function(d){
		return d[this.valueKey]
	},
	getMenuItemText: function(d){
		return d[this.textKey]
	},
	displayItemTplFn: function(d){
		return '<span class="chip" data-value="'+d[this.valueKey]+'">'+
		    '<span class="chip-text">'+d[this.textKey]+'</span>'+
		    '<button type="button" class="chip-action delete-btn" data-value="'+d[this.valueKey]+'">'+
		    	'<iron-icon icon="close"></iron-icon>'+
		    '</button>'+
		'</span>'
	},
	initInput: function(){
		var self = this;
		this._items = this._items || {};
		var $el = self.$el;

		if(this.disableInput){
			if(this.$inputBox)
				this.$inputBox.hide();
			return 
		}

		if(self.$inputBox)
			return;

		self.$inputBox = $('<input class="fabric-select-inputbox" name="" />');
		self.$display.append(self.$inputBox);
		$el.addClass("has-input");
		self.$input.attr("tabindex", "-1");

		self.$inputBox.on("keyup.fabric-select", function(e){
			self.onInputBoxKeyUp(e);
		})
		self.$inputBox.on("keydown.fabric-select", function(e){
			var value = self.$inputBox.val();
			if(e.which == 13 || (value && e.key.toLowerCase() == "tab")){
				if(!self.directEntry || !self.matchDirectEntry(value))
					e.preventDefault();
			}
		})
		self.$inputBox.on("focus.fabric-select", function(e){
			self.onInputFocus(e);
		})
		self.$inputBox.on("blur.fabric-select", (e)=>{
			this.closeList(200);
		})

		if(!$el.hasClass('fabric-select--floating-label')){
			self.$inputBox.attr("placeholder", this.inputPlaceholder || "");
			return
		}

		self.$inputBox.attr("placeholder", $el.find("label").text());
	},
	init: function(){
		var self = this;
		var $el 	= self.$el;
		self.$display = $(this.$.display);
		
		self.$input = $el.find(".fabric-select-input");
		self.initInput();
		self.$input.on("focus.fabric-select", function(e){
			self.onHiddenInputFocus(e);
		})
		self.$input.on("blur.fabric-select", function(e){
			self.onHiddenInputBlur(e);
		})
		self.$input.on("keydown.fabric-select", function(e){
			self.onHiddenInputKeyDown(e);
		})
		self.initSelected();

		self.$display.on("click.fabric-select", function(e){
			self.onDisplayClick(e, $(this));
		});
		$el.find("label").on("focus.fabric-select", function(e){
			self.onInputFocus(e);
		})

		self.initRequiredAttr();
		self.updateDisplay();

		//$(window).off('resize.fabric-select').on('resize.fabric-select', self.onWindowResize.bind(self));
	},
	onItemsChanged: function(){
		this.buildList();
		this.updateDisplay();
	},
	initRequiredAttr: function(){
		var isRequired = !!this.required
		if(isRequired && this.$el.height() > 0)
			this.$input.attr("required", "true")
	},
	initSelected: function(){
		if (!this.multiple)
			this.selected = this.getSelected()[0] || "";
	},
	onHiddenInputFocus: function(e){
		var focused = this.$el.hasClass("is-focused")
		if(!focused)
			this.openList();
	},
	onHiddenInputKeyDown: function(e){
		if(e.which == 9){//if tab, shift+tab
			this.$el.removeClass("is-focused")
			return
		}
		if(this.$inputBox){
			this.$inputBox.focus();
			return
		}
		e.preventDefault();
		this.openList();
	},
	focus: function(){
		if(this.$inputBox){
			this.$inputBox.focus();
			return
		}
		this.$.display.focus();
	},
	onHiddenInputBlur: function(){

	},
	onInputFocus: function(){
		this.openList()
	},
	onDisplayClick: function(e, $el){
		e.preventDefault();
		e.stopPropagation();
		var $btn = $(e.target).closest(".delete-btn", 5);
		if ($btn.length) {
			this.focusPrevBtn($btn)
			this.toggleValue($btn.data("value"))
			return
		};
		this.openList();
	},
	focusPrevBtn: function($btn){
		var self = this;
		var $tag = $btn.closest(".chip");
		
		var $sibling = $tag.prev('.chip');
		if(!$sibling.length)
			$sibling = $tag.next('.chip');

		if($sibling.length){
			setTimeout(()=>{
				var $tag = this.$display.find('[data-value="'+$sibling.data("value")+'"]');
				if($tag.length)
					$tag.find('.delete-btn').focus();
			}, 200)
		}else if(this.$inputBox){
			this.$inputBox.focus();
		}
	},
	deleteCount:1,
	onInputBoxKeyUp: function(e){
		var self = this;
		this.openList();
		var value = self.$inputBox.val();
		var key = e.key.toLowerCase();
		if(e.which != 13 && !(value && key == "tab")){
			if(!value && key == "backspace"){
				if(self.deleteCount >0)
					self.removeLastTag()

				self.deleteCount++;
			}else{
				self.deleteCount = 0;
			}
			
			self.debounce("filterList", function(){
				self.filterList(value);
			}, 200)
			return
		}

		var filtered = self.filterNewValue(value);
		if(!filtered)
			return;
		if(!this.dontCloseList)
			this.closeList();

		var _value = filtered[this.valueKey];
		if(!this.directEntry || !this.matchDirectEntry(_value))
			e.preventDefault();
		self.resetInputBox(0);

		filtered[this.valueKey] = filtered[this.valueKey].replace(/[ ]{2,}/g, " ");
		filtered[this.textKey] = filtered[this.textKey].replace(/[ ]{2,}/g, " ");

		var v = self.newPrefix+filtered[this.valueKey].replace(/,/g, "-").replace(/[ ]{2,}/g, " ");
		var selected = this.getSelected();
		//if already selected
		if(selected.map((a)=>{return a.toLowerCase(); }).indexOf(v.toLowerCase()) > -1)
			return

		var valueLower = filtered[this.valueKey].toLowerCase();
		
		var items = self.get("items");
		var found = false
		for(var i=0; i<items.length; i++){
			if(items[i][this.textKey] == undefined || items[i][this.valueKey] == undefined)
				continue;
			if(	(items[i][this.textKey]+"").toLowerCase() == valueLower 
				|| (items[i][this.valueKey]+"").toLowerCase() == valueLower){
				found = items[i];
				break
			}
		}

		if(found){//if have entered value
			v = found[this.valueKey];
		}else{
			if(this.directEntry && this.matchDirectEntry(_value)){
				this.selected = _value;
				return;
			}
			if(!this.allowNew)
				return
			v = self.newPrefix+filtered[this.valueKey].replace(/,/g, "[COMMA]");
			var newItem = {};
			newItem[this.valueKey] = v;
			newItem[this.textKey] = filtered[this.textKey];

			items.push(newItem);
			self.set("items", items);
			self.buildList();
		}
		self.toggleValue(v);

	},
	matchDirectEntry: function(value){
		return value && /^https?:\/\//.test(value);
	},
	filterList: function(value){
		var self = this;

		if(!value){
			_.each(this.listItems, (item, index)=>{
				this.set("listItems."+index+".isHidden", false);
			})
			return;
		}

		value = value.toLowerCase();

		_.each(this.listItems, (item, index)=>{
			var hide = item[this.textKey].toLowerCase().indexOf(value) !== 0;
			this.set("listItems."+index+".isHidden", hide);
		})
	},
	removeLastTag: function(){
		var selected = this.getSelected();
		var l = selected.length;
		if(!l)
			return;
		this.toggleValue(selected[l-1])
	},
	resetInputBox: function(delay){
		if(!this.$inputBox)
			return
		var selected = this.getSelected();
		if(this.directEntry && selected[0] && this.matchDirectEntry(selected[0])){
			this.$inputBox.val(selected[0]);
		}else{
			this.$inputBox.val("");
		}
		this.deleteCount = 1;
		if(delay > 0)
			this.debounce("filterList", ()=>{
				this.filterList("");
			}, 200)
		else
			this.filterList("");
	},
	toggleValue: function(value){
		var selected 	= [];
		var push 		= true;

		$.each(this.getSelected(), (index, v)=>{
			if(v == value){
				push = false;
				return
			}else if(this.multiple){
				selected.push(v);
			}
		});

		if (push)
			selected.push(value);

		this.updateSelected(selected);
	},
	getSelected: function(){
		if(!this.selected)
			return [];
		if(!_.isArray(this.selected))
			return [this.selected]
		return this.selected
	},
	updateSelected: function(selected){
		if(this.multiple)
			this.selected = selected;
		else
			this.selected = selected.length? selected[0] : "";
	},
	onSelectedChanged:function(){
		if(!this.$input)
			return
		this.$input.val(this.getSelected().join(",")).trigger("change").trigger("changed")
		this.updateDisplay();
		this.fire("selected-changed", {selected: this.getSelected()})
	},
	updateDisplay: function(){
		if(!this.$display)
			return
		this.$display.find(":not(input)").remove();
		var displayItemTplFn = this.displayItemTplFn.bind(this)
		var selected = this.getSelected();
		if(this.$inputBox){
			if(this.directEntry && selected[0] && this.matchDirectEntry(selected[0])){
				this.$inputBox.val(selected[0]);
			}else{
				this.$inputBox.val("");
			}
		}
		/*
		if(this.directEntry && this.matchDirectEntry(selected[0])){
			var d ={};
			d[this.valueKey] = selected[0];
			d[this.textKey] = selected[0];
			var $tpl = displayItemTplFn(d, this);
			if(!$tpl)
				return
			if(this.$inputBox)
				$($tpl).insertBefore(this.$inputBox);
			else
				this.$display.append($tpl);
		}
		*/
		if(this.$inputBox){
			$.each(selected, (index, value)=>{
				if(!this._items[value])
					return
				var $tpl = displayItemTplFn(this._items[value], this);
				if(!$tpl)
					return
				$($tpl).insertBefore(this.$inputBox);
			});
		}else{
			$.each(selected, (index, value)=>{
				if(!this._items[value])
					return
				var $tpl = displayItemTplFn(this._items[value], this);
				if(!$tpl)
					return
				this.$display.append($tpl);
			});
		}

		this.$el.toggleClass("is-dirty", !!selected.length)
		this.onWindowResize();
	},
	getValueToItem:function(value){
		return this._items[value]
	},
	buildListItems: function(){
		this._items = {};
		var newPrefix = this.newPrefix;
		this.set("listItems", []);
		var listItems = [];
		$.each(this.items, (index, item)=>{
			var value = item[this.valueKey];
			this._items[value] = item;
			if(!newPrefix || (value+"").indexOf(newPrefix) !==0)
				listItems.push(item);
		});

		this.set("listItems", listItems);
		//console.log("this.selected", this.selected)
		//console.log("listItems", this.listItems )
	},
	buildList: function(){
		//console.log("buildList:this.selected", this.selected)
		this.buildListItems();

		var selectedUpdated = false;
		var selected = [];
		$.each(this.getSelected(), (index, v)=>{
			if(this.directEntry && this.matchDirectEntry(v)){
				selected[selected.length] = v;
				return;
			}
			if(!this._items[v]){
				selectedUpdated = true;
			}else{
				selected[selected.length] = v;
			}
		})
		this.updateSelected(selected);

		if(selectedUpdated && this.$input)
			this.$input.val(this.getSelected().join(",")).trigger("change").trigger("changed");

	},
	openList: function(){
		this.onWindowResize();
		this.dropdownOpened = true;
		if(this.setTimeoutId){
			clearTimeout(this.setTimeoutId)
			this.setTimeoutId = null;
		}
	},
	closeList: function(delay){
		if(delay){
			this.setTimeoutId = setTimeout(()=>{
				this.resetInputBox(200);
				this.dropdownOpened = false;
				this.setTimeoutId = null;
			}, delay);
		}else{
			this.resetInputBox(200);
			this.dropdownOpened = false;
		}
	},
	onDropDownOpenedChanged:function(){
		if(!this.$el)
			return;

		var hasFocus = this.dropdownOpened;
		if(!hasFocus && this.$inputBox)
			hasFocus = this.$inputBox.is(":focus");
		this.$el.toggleClass("is-focused", hasFocus);
	}
});