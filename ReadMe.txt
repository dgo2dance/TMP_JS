
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