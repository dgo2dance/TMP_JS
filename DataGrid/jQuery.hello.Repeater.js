/*
  creator:duansy
*/

jQuery.fn.extend({
         

        


         // RepeaterCleat:
        RepeaterClear:function(){
        this.each(function(index, val) {
        	 /* iterate through array or object */
        	 if($(this).data("_ItemTemplate")==null){
                $(this).data("_ItemTemplate",$(this).find(".itemtemplate").toHTML());
        	 }
        	 $(this).find('.itemtemplate').remove();
        });
        },


        //RepeaterSetItemClass:
        RepeaterSetItemClass:function(class1,class2,hoverClass){
            this.each(function() {
            	 /* iterate through array or object */
                 if(class1==null || class2==null || hoverClass==null)
                 	return;
                    
                    $(this).data('_class1', class1);
                    $(this).data('_class2', class2);
                    $(this).data('_hoverClass', hoverClass);
                 //
                    if($(this).data("_DataSrc")!=null){
                    	var domtype=$(this).find(".itemtemplate").attr('nodeName');

                    	$(this).find("domtype").addClass("class1");
                    	$(this).find(domtype+":nth-child(evev)").addClass("class2");

                    	$(this).find(domtype).hover(
                    		function(){
                            $(this).addClass(hoverClass);
                    		},
                    		function(){
                             $(this).removeClass(hoverClass);
                    		}
                    		);
                    }
            });
        },

             
});