/*	
jQuery.autocomplete.js
author:duansy
date:2015-02-10
version:1.0.0
*/
(function($){
   $.fn.extend({
      'AutoComplete':function(option){
      	return this.each(function() {
      		if(!(this && this.tagName === 'INPUT' && this.type === 'text') )
      			return;
      		//	alert('Autocomplete-------------');
      			this.controller = new Controller(this,option);
      	});
      }

   });

           // --------------- Construct 

           var Controller = function(input, option){
           	this.option = $.extend(false, {
              // style
              // 'width': 320,
              'maxHeight': null,
              'itemHeight': null,
              'listStyle': 'normal',
              'listDirection': 'down',

              //data
              'data': [],
              'ajaxDataType': 'json',        // string 'json' or 'xml'
              'ajaxParams': {},              // function,string , object
              'ajaxTimeout':3000,            // number
              'ajaxType': 'GET',             // string 'GET' OR 'POST'
              'maxItemts': 20,               // number

              //event
      //      'matchHandler': defaultMatchHandler,        // function
     //       'emphasisHandler': defaultEmphasisHandler,  // function
              'createItemHandler': null,                  //function
              'beforeLoadDataHandler': null,
              'afterSelectedHandler': null,

              //behavior
              'async': false,
              'emphasis': true,

              // debug
              'onerror': null
           	}, option);
           	
           	// alert('Controller---------------test');
           	// alert('this.option.ajaxTimeout----'+this.option.ajaxTimeout);
           	// alert('this.option.width----'+this.option.width);
            
          
            _setupInputView.apply(this,[input]);
            _setupSearchView.apply(this);

           };

           // ------------private Method Here  -----------------
           // set the input text
           var  _setupInputView = function(input){
              
              var that = this;

              this.inputView = $(input);
          //    alert('_setupInputView------');
              this.inputView
              .attr('autocomplete','off')
              .keyup(this._keyup = function(event){
                  switch(event.keyCode){
                       case 13:  //enter
                       case 16:  // shift
                       case 17:  //ctrl
                       case 37:  //left
                       case 38: //up
                       case 39:  //right
                       case 40:  //down
                         break;
                       case 27:  //esc
              //            alert('KEY TEST------------ESC');
                          break;
                       default:
              //            alert('ELSE KEY -----------');
                          _search.apply(that);
                  }
              })
              .keydown(this._keydown = function(event){
                 switch(event.keyCode){
                 case 38: // up
	                 _move.apply(that,['up']);
	                 break;
                 
                 case 40: //down
                     _move.apply(that,['down']);
                     break;

                 case 13: //enter
                     var isSearchViewVisible = that.searchView.is(':visible');
                     _select.apply(that);
                     if(isSearchViewVisible)
                        return false;
                        break;    



                 }

              })
              .blur(this._blur = function(){

              	 $(document).one('click', function() {
              	 	/* Act on the event */
              	 	//失去焦点时，隐藏
              	 	_emptySearchView.apply(that);
              	 });
              });
           } ;

          // move the up or down
            var _move = function(dir){
            var selected = this.searchView.find('li.selected');

            if(selected.size())
            	var nextSelected = dir === 'up' ? selected.prev() : selected.next();
            else 
            	var nextSelected = dir === 'up' ? this.searchView.find('li').last() : this.searchView.find('li').first();

            if(nextSelected.size()){
                
                this.searchView.find('li').removeClass('selected');

                nextSelected.addClass('selected');

                var itemHeight = nextSelected.outerHeight();

                var itemTop = nextSelected.position().top;

                if(itemHeight + itemTop >
                	this.searchView.height())
                	this.searchView.scrollTop(this.searchView.scrollTop() + itemTop +
                		itemHeight - this.searchView.height());
                else if(itemTop < 0)
                	this.searchView.scrollTop(this.searchView.scrollTop() + itemTop);
                }

            };

            
               
           // setup the tip div     
           var _setupSearchView = function(){
           
            var that = this;
            this.searchView = $("<div class='ac'><ul></ul></div>")
            .appendTo(document.body)
            .on('mouseenter','li',function(){
            	that.searchView.find("li.selected").removeClass("selected");
            	$(this).addClass('selected');
            })
            .on('mouseleave','li',function(){
            	$(this).removeClass('selected');
            })
            .on('click', 'li', function(){
               _select.apply(that);
               _emptySearchView.apply(that);
            })
            .css('font-size', this.inputView.css('font-size'));

            $(window).resize(function(){
    //          _locateSearchView.apply(that);
            });
           };

          
           // select the button  选择某一项
           var _select = function(){
           
           var that = this;
           selected = this.searchView.find('li.selected');

           if(selected.size()){

           	var data = selected.data('data');
           
            alert('----select data----'+data.value);
            this.inputView.val(data.value);
         //   if()

         _emptySearchView.apply(this);
             }
           };

            //隐藏提示框
           var _emptySearchView = function(){
            this.searchView.find('ul').empty();
            this.searchView.hide();

           };

           // begin show the search  div
           var _search = function(){

               var that = this,
                keyword = this.inputView.val(),
                data = ['one','two','three','four'],
                loadDataFlag = true,
                result = [];

                if($.trim(keyword).length == 0){
                	_emptySearchView.apply(that);
                	return;
                }

               // invoke beforeLoadDataHandler if exists
         

              // ajax get the data
              if(loadDataFlag){
               if($.isArray(this.option.data)){
               	  data = this.option.data;
               }else if ($.isFunction(this.option.data)){
                 try{
                 	data = this.option.data.apply(this,[keyword]);
                 }catch(e){
                 	return;
                 }

               } else if (typeof(this.option.data) === 'string') {
                  try{
                     data = _ajaxSend.apply(this, [keyword]);
                  }catch (e){
                  	return;
                  }
               }
              }

              // handle the data  put the data into result
              $.each(data,function(index,value){
                if(that.option.maxItemts > 0 && result.length >= that.option.maxItemts)
                	return false;

                console.log('_handle the data put the data into result---');
                console.log('_ type of value--'+typeof(value));
                  console.log(typeof(value) === 'string');

                if($.isPlainObject(value)){
                	var item = $.extend(false,{}, value);
                } else if (typeof(value) === 'string')
                     {
                     	 console.log('_handle the data put the data into result--item-'+value);
                     	var item ={'label': value, 'value': value, 'image': value};
                     }

                     result.push(item);

              });
                  
                    console.log('_handle the data put the data into result---'+result);

              // show the SearchView
              if(keyword == this.inputView.val()){
              	if(result.length > 0)

              		// alert('_search------------');
              	    // alert('_search_keyword-------'+keyword);
              	    // alert('_search_result-----'+result);
              		_showSearchView.apply(this,[result]);
              } 

           };

             // function ajax  get the function
             var _ajaxSend = function(keyword){
                 jQuery.support.cors = true;
                 var that = this,
                     data = [],
                     ajaxOption = {
                     	'async' : false,
                     	'dataType' : that.option.ajaxDataType,
                     	'type': that.option.ajaxType,
                     	'timeout': this.option.ajaxTimeOut,

                        'success': function(theData, textStatus,jqXHR){
                        	if(that.option.ajaxDataType === 'xml'){
                                $(theData).find('item').each(
                                     function() {
                                      var item = {
                                      'value': $(this).text(),
                                      'label': $(this).text()

                                      };
                                       for (var i=0; i<this.attributes.length; i++) {
                                var key = this.attributes[i].nodeName,
                                    value = this.attributes[i].nodeValue;

                                item[key] = value;
                            };
                            data.push(item);


                                     });

                        	}  else if(that.option.ajaxDataType === 'json') {
                        		data = theData;
                        	} else {
                        		throw '遇到未知的参数';
                        	}
                        },
                        'error': function(jqXHR,textStatus,errorThrown){
                             throw errorThrown;
                        }
                     };

                     if($.isPlainObject(this.option.ajaxParams)){
                     	ajaxOption['data'] = $.extend (false, {'keyword': keyword},this.option.ajaxParams);
                     } else if ($.isFunction(this.option.ajaxParams)){
                     	ajaxOption['data'] = $.extend(false,{'keyword': keyword}, this.option.ajaxParams.apply(this,[keyword]));
                     } else if (typeof(this.option.ajaxParams) === 'string'){
                     	ajaxOption['data'] = "keyword" + keyword + "&" + this.option.ajaxParams;
                     } else {
                     	throw '遇到未知的ajax参数！';
                     }
                    $.ajax(this.option.data, ajaxOption);
                    return data;
             };


         // 创建提示框内容
         var _createItems = function(result){
         	  // alert('_createItems-------');
             var that =this,
                 container = this.searchView.find('ul').empty();
             // alert('_createItems-----NEXT--'+container);

             $.each(result, function(index,data){
              
              var item = $("<li><div></div></li>").appendTo(container)
                                                  .addClass('that.option.listStyle')
                                                  .data("data",data)
                                                  .find("div");
              // alert('_createItems---that.option.listStyle---'+that.option.listStyle);
              switch(that.option.listStyle){
                  case 'normal':
                  item.append("<span>"+data.label+"</span>");
                  break;
              }                

              if(that.option.itemHeight > 0){
                   item.height(that.option.itemHeight)
                       .css('max-height', that.option.itemHeight);
              }                    
             });
         };


          //  显示搜索框
           var _showSearchView = function(result){
            
            var that = this;
            if(this.option.listDirection === 'up')
            	result = result.reverse();

            try{

            	// alert('_showSearchView-------');
            	_createItems.apply(that,[result]);

               // 定位补全列表
               _locateSearchView.apply(this);

               //计算并设定补全列表的宽度
               this.searchView.css("width",_calcWidth.apply(this)+'px');

            } catch(ex) {
       //       _error.apply(this,[ex+'']);
              return;
            }
               //显示列表
               // this.searchView.show(1000);
               this.searchView.show();
           };

           // 定位补全列表
           var _locateSearchView = function(){
           	// alert('_locateSearchView------------');
               if(this.option.listDirection === 'down'){
             //  	alert(this.inputView.offset().top);
               	var top = this.inputView.offset().top+this.inputView.outerHeight();
               } else if(this.option.listDirection === 'up'){
               	var top = this.inputView.offset().top-this.searchView.outerHeight();
               }else {
               	  throw '遇到未知的listDirection参数！';
               }

               var left = this.inputView.offset().left;
               console.log('-------left'+left);
               console.log('-------top'+top);
               this.searchView.css("top",top+"px")
                              .css("left",left+"px");
           };

           //计算宽度
            var _calcWidth = function(){
           	if(typeof(this.option.width) === 'string' && this.option.width.toLowerCase() === 'auto' ){
           		// alert('this.width');
           		// alert(this.inputView.outerWidth());
           		return this.inputView.outerWidth() -2;
           	} else if(typeof(this.option.width) === 'number'){
           		return this.option.width;
           	} else {
           		throw '遇到未知的width参数';
           	}
           };

  })(jQuery);