/*
* 作者：黑曜石.C 2010-04-22
* 版权没有，随便使用！
*/

(function ($) {
    $.fn.dBox = function (options) {
        var defaults = {
            opacity: 0.6,
            drag: true,
            title: 'dBox',
            content: '',
            left: 400,
            top: 200,
            width: 600,
            height: 300,
            setPos: false,
            overlay: true,
            loadStr: 'Loading',
            ajaxSrc: '',
            iframeSrc: ''
        };
        var opts = $.extend(defaults, options);

        //build html code of the dBox
        var dBoxHtml = "<div id='dBox' style='background-color:#FFF;border:solid 2px #00E;position:absolute;z-index:100;'>";
        dBoxHtml += "<div id='d_head' style='width:100%;height:20px;border-bottom:solid 1px #00E;'>";
        dBoxHtml += "<div id='d_title' style='float:left;width:90%;color:#00E'>" + opts.title + "</div>";
        dBoxHtml += "<div id='d_close' style='float:right;cursor:pointer;margin-right:5px;color:#00E'>[x]</div>";
        dBoxHtml += "</div>";
        dBoxHtml += "<div id='d_content' style='width:100%;height:100%;padding:3px;'>" + opts.content + "</div>";
        dBoxHtml += "</div>";

        var dBoxBG = "<iframe id='d_iframebg' style='position:absolute;top:0;left:0;width:0;height:0;border:none;'></iframe><div id='d_bg' style='background-color:#000;z-index:99;position:absolute;top:0;left:0;'></div>";
        var loading = "<div id='d_loading' style='position:fixed;top:48%;left:48%;z-index:100;border:solid 1px #000;'>" + opts.loadStr + "</div>";

        //click event
        $(this).click(function () {
            $("body").append(dBoxHtml);
            //case ajax
            if (opts.ajaxSrc != "") {
                $("#d_content").append("<div id='d_ajax' style='width:" + (opts.width - 6) + "px;height:" + (opts.height - 26) + "px;overflow:scroll;'><div id='d_ajaxcontent'></div></div>");
                $("#d_ajaxcontent").load(opts.ajaxSrc);
            }
            //case iframe
            else if (opts.iframeSrc != "") {
                $("#d_content").append("<iframe frameborder='0' width='" + (opts.width - 6) + "' height='" + (opts.height - 26) + "' src='" + opts.iframeSrc + "'>");
            }
            addCSS();
            //case drag
            if (opts.drag == true) {
                drag();
            }
            $("#d_close").click(dBoxRemove);
            return false;
        });

        //add css to the dBox
        function addCSS() {
            var pos = setPosition();
            $("#dBox").css({ "left": pos[0], "top": pos[1], "width": opts.width + "px", "height": opts.height + "px" });
            if (opts.overlay) {
                var wh = getPageSize();                
                $(dBoxBG).appendTo("body").css({ "opacity": opts.opacity, "width": wh[0], "height": wh[1] });
            }
        }

        //close the dBox
        function dBoxRemove() {
            if ($("#dBox")) {
                $("#dBox").stop().fadeOut(200, function () {
                    $("#dBox").remove();
                    if (opts.overlay) {
                        $("#d_bg").remove();
                        $("#d_iframebg").remove();
                    }
                });
            }
        }

        //drag the dBox
        //this event contains four events(handle.mousedown,move,out,up)
        function drag() {
            var dx, dy, moveout;
            var handle = $("#dBox").find("#d_head>#d_title").css('cursor', 'move');
            handle.mousedown(function (e) {
                //cal the distance between e and dBox
                dx = e.clientX - parseInt($("#dBox").css("left"));
                dy = e.clientY - parseInt($("#dBox").css("top"));
                //bind mousemove event and mouseout event to the dBox
                $("#dBox").mousemove(move).mouseout(out).css({ "opacity": opts.opacity });
                handle.mouseup(up);
            });
            move = function (e) {
                moveout = false;
                win = $(window);
                var x, y;
                if (e.clientX - dx < 0) {
                    x = 0;
                } else {
                    if (e.clientX - dx > (win.width() - $("#dBox").width())) {
                        x = win.width() - $("#dBox").width();
                    } else {
                        x = e.clientX - dx;
                    }
                }
                if (e.clientY - dy < 0) {
                    y = 0;
                } else {
                    y = e.clientY - dy;
                }
                $("#dBox").css({
                    left: x,
                    top: y
                });
            }
            out = function (e) {
                moveout = true;
                setTimeout(function () {
                    moveout && up(e);
                }, 10);
            }
            up = function (e) {
                $("#dBox").unbind("mousemove", move).unbind("mouseout", out).css("opacity", 1);
                handle.unbind("mouseup", up);
            }
        }

        //calc the size of the page to put the mask layer cover the whole document
        function getPageSize() {
            if ($(window).height() > $(document).height()) {
                h = $(window).height();
            } else {
                h = $(document).height();
            }
            w = $(window).width();
            return Array(w, h);
        }

        //calc the position of the dBox to put the dBox in the center of current window
        function setPosition() {
            if (opts.setPos) {
                l = opts.left;
                t = opts.top;
            } else {
                var w = opts.width;
                var h = opts.height;

                var width = $(document).width();
                var height = $(window).height();
                var left = $(document).scrollLeft();
                var top = $(document).scrollTop();

                var t = top + (height / 2) - (h / 2);
                var l = left + (width / 2) - (w / 2);
            }
            return Array(l, t);
        }
    };
})(jQuery);