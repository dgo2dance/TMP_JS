
-----------------------
overflow:

visible	
hidden	
scroll	
auto	
inherit	

http://www.w3school.com.cn/cssref/pr_pos_overflow.asp

----------------------
transition:

transition: property duration timing-function delay;






-----------------------
posotion:

absolute 生成绝对定位的元素，相对于static定位以外的第一个父元素进行定位。
fixed    生成绝对定位的元素，相对于浏览器窗口进行定位。
         元素的位置通过left  top   right   bottom  属性进行规定
relative 生成相对定位的元素，相对于其正常位置进行定位。
         因此，“left:20” 会向元素的LEFT位置添加20像素。
   
static   默认值。没有定位，元素出现在正常的流中。
inherit  规定应该从父元素继承position属性的值。

http://www.w3school.com.cn/cssref/pr_class_position.asp

----------------------
opacity:

value  规定不透明度 。 从0.0(完全透明)到1.0(完全不透明)
inherit   应该从父元素继承opacity属性的值。

----------------------
CSS3 @keyframes规则用于创建动画。 在@keyframes中规定某项CSS样式，就能创建由当前样式逐渐改为新样式的动画效果。

IE10 及FIREFOX  OPERA CHOROME 支持@keyframes规则和animation属性

Chrome和safari 需要前缀 -webkit -

div{
	animation: frame 5s;
	-moz-animation: frame 5s;   /*firefox*/
	-webkit-animation: frame 5s; /*safari 和 chrome*/
	-o-animation: frame 5s;   /*opera*/
}

---------------------
transform  

在CSS3中transform包括以下几种： 

rotate 旋转
skew   扭曲
scale  缩放
translate  移动
matrix  矩阵变形

transform:rotate(30deg)
transform:translate(100px,20px)
transform:translateX(20px)
transform:translateY(40px)

transform:scale(2,1.5)


transform-origin可以改变元素基点位置。默认没有使用transform-origin改变元素基点位置的情况下，transform进行的操作都是以元素自己中心位置进行的变化。

transform-origin:(left,top)
transform-origin:right



---------------------------
jquery one方法

one() 方法为被选元素附加一个或多个事件处理程序，并规定当事件发生时运行的函数。

当使用one()方法时，每个元素只能运行一次事件处理器函数。

$(selector).one(event,data,function)



------------------------
jQuery.date() 向被选元素附加数据，或者从被选元素中获取数据
$("#btn1").click(function(){
  $("div").data("greeting", "Hello World");
});
$("#btn2").click(function(){
  alert($("div").data("greeting"));
});


----------------------
jQuery.find() 

find() 方法获得当前元素集合中每个元素的后代，通过选择器、jQuery 对象或元素来筛选


----------------------
attr()

设置或者返回被选元素的属性值


----------------------
wrap() 方法把每个被选元素放置在指定的 HTML 内容或元素中。



----------------------
clone() 方法生成被选元素的副本，包含子节点、文本和属性。
$(selector).clone(includeEvents)

includeEvents  可选，规定是否复制元素的所有事件处理 。 默认地，不包含事件处理器。




-----------------------

prependTo() 方法在被选元素的开头（仍位于内部）插入指定内容。


-----------------------
scroll()
当用户滚动指定的元素时，会发生scroll事件
scroll事件适用于所有可滚动的元素和window对象
scroll()方法触发scroll事件，或规定当发生scroll事件时运行的函数

$("div").scroll(function(){
	$("span").text(x+=1);
})

--------------------------
toggle()
toggle()方法切换元素的可见状态。
如果被选元素可见，则隐藏这些元素，如果被选元素隐藏，则显示这些元素

callback参数，为toggle函数执行

函数原型:  toggle(even,odd)

函数含义:  每次点击时切换要调用的函数

函数说明:  如果点击了一个匹配的元素，则触发指定的第一个函数，当再次点击同一元素时，则触发指定的第二个函数。随后的每次点击都重复对这两个函数的轮番调用, 可以使用unbind("click")来删除。

返回值:  jQuery