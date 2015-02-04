
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
          DateGrid:function(width,height,dt){
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
              


             });

          }   
});
