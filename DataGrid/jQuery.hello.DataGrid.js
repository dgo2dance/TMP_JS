/*
 creator: duansy
*/

jQuery.fn.extend({
           DataGridClear:function(){
           $(this).RepeaterClear();
           },

           DataGridSetItemClass:function(class1,class2,hoverClass){
           $(this).RepeaterSetItemClass(class1,class2,hoverClass);
           },
      

          //
          DataGridSetWidth:function(width){
          $(this).data('MyTable').width(width);
          $(this).data('TableBodyArea').width(width);
          $(this).data('TableHeadArea').width(width);
          },
             
          //
          DataGrid:function(width,height,dt){
             this.each(function(){
              
              var TableBody=$(this);
              var MyTableId="hello-table-"+TableBody.attr('id');
              if($(this).data('Drawd')){
              	TableBody.Repeater(dt);
              	TableBody.find('.itemtemplate').slice(1).find('td').css('width', 'auto');
              	var tds=TableBody.data('TableHead').find('td');
              	tds.each(function(index, el) {
              		var td =$(this);
              	//	$('string/element/array/function/jQuery object/string, context')
              	     $(TableBody.find('tr:first').find('td')[tds.index(td)]).css('width',td.css('width'));
              	});
              	return;
              }

              // 开始渲染表格=========================================
              //
              TableBody.addClass('TableBody');
              TableBody.wrap("<div id=' "+MyTableId+"' class='hello-table'></div>");
              var MyTable=$('#'+MyTableId);
              TableBody.data('MyTable', MyTable);
              TableBody.before("<table class='TableHead' ></Table>");
              var TableHead=MyTable.find('.TableHead');
              TableBody.before("<table class='TabledHead' ></table>");
              var TableHead=MyTable.find(".TableHead");
              TableBody.data('TableHead', TableHead);
              TableBody.wrap('<div class="TableBodyArea"></div>');
              TableHead.wrap("<div class='TableHeadArea' onselectstart='return false;'></div>");
              var TableBodyArea=MyTable.find('.TableBodyArea');
              var TableHeadArea=MyTable.find('.TableHeadArea');
              TableBody.data('TableBodyArea',TableBodyArea);
              TableBody.data('TableHeadArea',TableHeadArea);

              //调整大小
              TableHead.css('width', '10px');
              TableBody.css('width', '10px');
              MyTable.css('width', width);
              TableBodyArea.css('width', width);
              TableBodyArea.css('height', height);

              TableBody.find('.header').clone().prependTo(TableHead);
              var itemtds=TableBody.find('.itemtemplate').find('td');
              var headtds=TableBody.find('.header').find('td');
              itemtds.each(function() {
              	var itemtd=$(this);
              	itemtd.css('width', $(headtds[itemtds.index(itemtd)])
              		.css('width'));
              });

              TableBody.find('.header').remove();
              
              //结束渲染表格
              
              //添加滚动事件
              TableBodyArea.scroll(function() {
              	/* Act on the event */
              	var m1=0-parseInt(TableBodyArea.attr('scrollLeft'));
              	TableHead.css('margin-left',m1);
              });
              
              //添加排序
              var tds=TableHead.find('td');
              tds.each(function() {
              	var td=$(this);
                var tdcontent=td.html();
                if (td.attr('sort')=='true')
                	tdcontent="<span class='sorticon'>↓</span><div class='headtdcontent'>"+tdcontent+"</div>";
                  td.html("<div id='"+td.attr('id')+"-resizer' class='resizer'>&nbsp;</div>"+tdcontent);

                  //添加排序--------------
                var tdindex=tds.index(td);
                var tddatatype='string';
                if(td.attr('datatype')!=null)
                	tddatatype =td.attr('datatype');
                if(td.attr('sort')=='true'){
                   var hc=td.find('.headtdcontent');
                   hc.mouseover(function() {
                   	/* Act on the event */
                   	td.find('.sorticon').show();
                   });
 
                   hc.mouseout(function() {
                   	/* Act on the event */
                   	td.find('.sorticon').hide();
                   });
                    
                   hc.toggle(function(){
                   	td.find('.sorticon').html('r');
                   	 sortTable(TableBody,tdindex,tddatatype); 
                                    $(TableBody).DataGridSetItemClass($(this).data("_class1"),$(this).data("_class2"),$(this).data("_hoverClass"));
                               },function(){
                                   td.find('.sorticon').html('↓');
                                   sortTable(TableBody,tdindex,tddatatype); 
                                   $(TableBody).DataGridSetItemClass($(this).data("_class1"),$(this).data("_class2"),$(this).data("_hoverClass"));
                               }) ;
                }
                //--------------------------
                 var tx=0;
                 var IsMouseDown=false;
                 var td_width=parseInt(td.css('width'));
                 td.find('.resizer').mousedown(function() {
                 	/* Act on the event */
                 	var event = window.event ? window.event : arguments[0];
                 	var ex = event.x ? event.x: event.clientX;
                 	tx=ex;
                 	td_width=parseInt(td.css('width'));
                 	IsMouseDown=true;
                 });

                 //
                 $(document).mouseover(function() {
                 	/* Act on the event */
                 	if(IsMouseDown){
                 		var event = window.event ? window.event : arguments[0];
                 		var ex = event.x ? event.x : event.clientX;
                 		var tdw=td_width+(ex-tx);
                 		td.css('width', tdw);
                 		return;
                 		 $(TableBody.find('tr:first').find('td')[tds.index(td)]).css('width',tdw);
                 	}
                 });

                    $(document).mouseup(function(){
                    tx=0;
                    IsMouseDown=false ;
                    
                    var ml=0-parseInt(TableBodyArea.attr('scrollLeft'));
                    TableHead.css('margin-left',ml);
                    
                    var tdw=td.css('width');
                    $(TableBody.find('tr:first').find('td')[tds.index(td)]).css('width',tdw);
                });
              });

              //结束为表头添加动作响应-----------
               TableBody.find('td').live('dblclick', function() {
               	/* Act on the event */
               	var td=$(this);
                if(td.attr('editable')=='true'){

                	var text=td.text();

                	var html="<input type='text' class='TdEditTextBox' value='"+$.trim(text)"' />";
                	td.html(html);
                    td.addClass("tdediting");

                    //
                      $(this).find('.TdEditTextBox').focus().focus().focus().focus();
                       $(this).find('.TdEditTextBox').blur(function(){
                        var val=$(this).val();
                        td.html(val);
                         td.removeClass("tdediting");
                     });

                }

               });

                 $(this).data('Drawed',true);
                  TableBody.DataGrid(width,height,dt );
             });

          }   
});
