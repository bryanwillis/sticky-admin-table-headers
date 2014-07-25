! function(e, t) {
    "use strict";

    function i(i, d) {
        var n = this;
        n.$el = e(i), n.el = i, n.id = o++, n.$window = e(t), n.$document = e(document), n.$el.bind("destroyed", e.proxy(n.teardown, n)), n.$newHeader = null, n.$oldHeader = null, n.isSticky = !1, n.hasBeenSticky = !1, n.leftOffset = null, n.topOffset = null, n.init = function() {
            n.$el.each(function() {
                var t = e(this);
                t.css("padding", 0), n.$oldHeader = e("thead:first", this), n.$newHeader = n.$oldHeader.clone(), t.trigger("newHeader." + s, [n.$newHeader]), n.$newHeader.addClass("newWPListTable"), n.$newHeader.css("display", "none"), n.$oldHeader.addClass("oldWPListTable"), n.$oldHeader.after(n.$newHeader), n.$printStyle = e('<style type="text/css" media="print">.newWPListTable{display:none !important;}.oldWPListTable{position:static !important; background-color:#ffffff !important;}</style>'), e("head").append(n.$printStyle)
            }), n.setOptions(d), n.updateWidth(), n.toggleHeaders(), n.bind()
        }, n.destroy = function() {
            n.$el.unbind("destroyed", n.teardown), n.teardown()
        }, n.teardown = function() {
            n.isSticky && n.$oldHeader.css("position", "static"), e.removeData(n.el, "plugin_" + s), n.unbind(), n.$newHeader.remove(), n.$oldHeader.removeClass("oldWPListTable"), n.$oldHeader.css("visibility", "visible"), n.$printStyle.remove(), n.el = null, n.$el = null
        }, n.bind = function() {
            n.$scrollableArea.on("scroll." + s, n.toggleHeaders), n.isWindowScrolling || (n.$window.on("scroll." + s + n.id, n.setPositionValues), n.$window.on("resize." + s + n.id, n.toggleHeaders)), n.$scrollableArea.on("resize." + s, n.toggleHeaders), n.$scrollableArea.on("resize." + s, n.updateWidth)
        }, n.unbind = function() {
            n.$scrollableArea.off("." + s, n.toggleHeaders), n.isWindowScrolling || (n.$window.off("." + s + n.id, n.setPositionValues), n.$window.off("." + s + n.id, n.toggleHeaders)), n.$scrollableArea.off("." + s, n.updateWidth), n.$el.off("." + s), n.$el.find("*").off("." + s)
        }, n.toggleHeaders = function() {
            n.$el && n.$el.each(function() {
                var t, i = e(this),
                    s = n.isWindowScrolling ? isNaN(n.options.fixedOffset) ? n.options.fixedOffset.outerHeight() : n.options.fixedOffset : n.$scrollableArea.offset().top + (isNaN(n.options.fixedOffset) ? 0 : n.options.fixedOffset),
                    o = i.offset(),
                    l = n.$scrollableArea.scrollTop() + s,
                    d = n.$scrollableArea.scrollLeft(),
                    a = n.isWindowScrolling ? l > o.top : s > o.top,
                    r = (n.isWindowScrolling ? l : 0) < o.top + i.height() - n.$newHeader.height() - (n.isWindowScrolling ? 0 : s);
                a && r ? (t = o.left - d + n.options.leftOffset, n.$oldHeader.css({
                    position: "fixed",
                    "margin-top": 0,
                    left: t,
                    "z-index": 1
                }), n.leftOffset = t, n.topOffset = s, n.$newHeader.css("display", ""), n.isSticky || (n.isSticky = !0, n.updateWidth()), n.setPositionValues()) : n.isSticky && (n.$oldHeader.css("position", "static"), n.$newHeader.css("display", "none"), n.isSticky = !1, n.resetWidth(e("td,th", n.$newHeader), e("td,th", n.$oldHeader)))
            })
        }, n.setPositionValues = function() {
            var e = n.$window.scrollTop(),
                t = n.$window.scrollLeft();
            !n.isSticky || 0 > e || e + n.$window.height() > n.$document.height() || 0 > t || t + n.$window.width() > n.$document.width() || n.$oldHeader.css({
                top: n.topOffset - (n.isWindowScrolling ? 0 : e),
                left: n.leftOffset - (n.isWindowScrolling ? 0 : t)
            })
        }, n.updateWidth = function() {
            if(n.isSticky) {
                n.$oldHeaderCells || (n.$oldHeaderCells = e("th,td", n.$oldHeader)), n.$newHeaderCells || (n.$newHeaderCells = e("th,td", n.$newHeader));
                var t = n.getWidth(n.$newHeaderCells);
                n.setWidth(t, n.$newHeaderCells, n.$oldHeaderCells), n.$oldHeader.css("width", n.$newHeader.width())
            }
        }, n.getWidth = function(i) {
            var s = [];
            return i.each(function(i) {
                var o, l = e(this);
                if("border-box" === l.css("box-sizing")) o = l.outerWidth();
                else {
                    var d = e("th", n.$oldHeader);
                    if("collapse" === d.css("border-collapse"))
                        if(t.getComputedStyle) o = parseFloat(t.getComputedStyle(this, null).width);
                        else {
                            var a = parseFloat(l.css("padding-left")),
                                r = parseFloat(l.css("padding-right")),
                                f = parseFloat(l.css("border-width"));
                            o = l.outerWidth() - a - r - f
                        } else o = l.width()
                }
                s[i] = o
            }), s
        }, n.setWidth = function(e, t, i) {
            t.each(function(t) {
                var s = e[t];
                i.eq(t).css({
                    "min-width": s,
                    "max-width": s
                })
            })
        }, n.resetWidth = function(t, i) {
            t.each(function(t) {
                var s = e(this);
                i.eq(t).css({
                    "min-width": s.css("min-width"),
                    "max-width": s.css("max-width")
                })
            })
        }, n.setOptions = function(i) {
            n.options = e.extend({}, l, i), n.$scrollableArea = e(n.options.scrollableArea), n.isWindowScrolling = n.$scrollableArea[0] === t
        }, n.updateOptions = function(e) {
            n.setOptions(e), n.unbind(), n.bind(), n.updateWidth(), n.toggleHeaders()
        }, n.init()
    }
    var s = "fixWPListTables",
        o = 0,
        l = {
            fixedOffset: 0,
            leftOffset: 0,
            scrollableArea: t
        };
    e.fn[s] = function(t) {
        return this.each(function() {
            var o = e.data(this, "plugin_" + s);
            o ? "string" == typeof t ? o[t].apply(o) : o.updateOptions(t) : "destroy" !== t && e.data(this, "plugin_" + s, new i(this, t))
        })
    }
}(jQuery, window),
function(e) {
    e("table.wp-list-table").fixWPListTables({
        fixedOffset: e("#wpadminbar")
    })
}(jQuery);
