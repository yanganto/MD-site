var btf = {
    // 修改时间显示"最近"
    diffDateExact: function (d, more = false) {
        const dateNow = new Date();
        const datePost = new Date(d);
        const dateDiff = dateNow.getTime() - datePost.getTime();
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;

        let result;
        if (more) {
            const monthCount = dateDiff / month;
            const dayCount = dateDiff / day;
            const hourCount = dateDiff / hour;
            const minuteCount = dateDiff / minute;

            if (monthCount >= 1) {
                result = datePost.toLocaleDateString().replace(/\//g, "-");
            } else if (dayCount >= 1) {
                result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
            } else if (hourCount >= 1) {
                result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
            } else if (minuteCount >= 1) {
                result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
            } else {
                result = GLOBAL_CONFIG.date_suffix.just;
            }
        } else {
            result = parseInt(dateDiff / day);
        }
        return result;
    },

    debounce: function (func, wait, immediate) {
        let timeout
        return function () {
            const context = this
            const args = arguments
            const later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    },

    throttle: function (func, wait, options) {
        let timeout, context, args
        let previous = 0
        if (!options) options = {}

        const later = function () {
            previous = options.leading === false ? 0 : new Date().getTime()
            timeout = null
            func.apply(context, args)
            if (!timeout) context = args = null
        }

        const throttled = function () {
            const now = new Date().getTime()
            if (!previous && options.leading === false) previous = now
            const remaining = wait - (now - previous)
            context = this
            args = arguments
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout)
                    timeout = null
                }
                previous = now
                func.apply(context, args)
                if (!timeout) context = args = null
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining)
            }
        }

        return throttled
    },

    sidebarPaddingR: () => {
        const innerWidth = window.innerWidth
        const clientWidth = document.body.clientWidth
        const paddingRight = innerWidth - clientWidth
        if (innerWidth !== clientWidth) {
            document.body.style.paddingRight = paddingRight + 'px'
        }
    },

    snackbarShow: (text, showActionFunction = false, duration = 2000, actionText = false) => {
        const { position, bgLight, bgDark } = GLOBAL_CONFIG.Snackbar;
        const bg = document.documentElement.getAttribute("data-theme") === "light" ? bgLight : bgDark;
        const root = document.querySelector(":root");
        root.style.setProperty("--wjx-snackbar-time", duration + "ms");

        Snackbar.show({
            text: text,
            backgroundColor: bg,
            onActionClick: showActionFunction,
            actionText: actionText,
            showAction: actionText,
            duration: duration,
            pos: position,
            customClass: "snackbar-css",
        });
    },

    initJustifiedGallerys: function (selector) {
        selector.forEach((function(t) {
                btf.isHidden(t) || fjGallery(t, {
                    itemSelector: ".fj-gallery-item",
                    rowHeight: 240,
                    gutter: 4,
                    onJustify: function() {
                        this.$container.style.opacity = "1"
                    }
                })
            }
        ))
        document.querySelectorAll('#article-container .loadings')[0]?.classList.remove("loadings");
    },

    diffDate: (d, more = false) => {
        const dateNow = new Date()
        const datePost = new Date(d)
        const dateDiff = dateNow.getTime() - datePost.getTime()
        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24
        const month = day * 30

        let result
        if (more) {
            const monthCount = dateDiff / month
            const dayCount = dateDiff / day
            const hourCount = dateDiff / hour
            const minuteCount = dateDiff / minute

            if (monthCount > 12) {
                // result = datePost.toLocaleDateString().replace(/\//g, '-')
                result = datePost.toLocaleDateString()
            } else if (dayCount >= 7) {
                // } else if (monthCount >= 1) {
                result = datePost.toLocaleDateString().substr(5)
                // result = parseInt(monthCount) + ' ' + GLOBAL_CONFIG.date_suffix.month
            } else if (dayCount >= 1) {
                result = parseInt(dayCount) + '' + GLOBAL_CONFIG.date_suffix.day
            } else if (hourCount >= 1) {
                // result = '最近'
                result = parseInt(hourCount) + ' ' + GLOBAL_CONFIG.date_suffix.hour
            } else if (minuteCount >= 1) {
                // result = '最近'
                result = parseInt(minuteCount) + ' ' + GLOBAL_CONFIG.date_suffix.min
            } else {
                result = GLOBAL_CONFIG.date_suffix.just
            }
        } else {
            result = parseInt(dateDiff / day)
        }
        return result
    },

    loadComment: (dom, callback) => {
        if ('IntersectionObserver' in window) {
            const observerItem = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    callback()
                    observerItem.disconnect()
                }
            }, {threshold: [0]})
            observerItem.observe(dom)
        } else {
            callback()
        }
    },


    scrollToDest: (e,t)=>{
        if (e < 0 || t < 0)
            return;
        const n = window.scrollY || window.screenTop;
        if (e -= 70,
        "CSS"in window && CSS.supports("scroll-behavior", "smooth"))
            return void window.scrollTo({
                top: e,
                behavior: "smooth"
            });
        let o = null;
        t = t || 500,
            window.requestAnimationFrame((function i(s) {
                    if (o = o || s,
                    n < e) {
                        const r = s - o;
                        window.scrollTo(0, (e - n) * r / t + n),
                            r < t ? window.requestAnimationFrame(i) : window.scrollTo(0, e)
                    } else {
                        const r = s - o;
                        window.scrollTo(0, n - (n - e) * r / t),
                            r < t ? window.requestAnimationFrame(i) : window.scrollTo(0, e)
                    }
                }
            ))
    },

    fadeIn: (ele, time) => {
        ele.style.cssText = `display:block;animation: to_show ${time}s`
    },

    fadeOut: (ele, time) => {
        ele.addEventListener('animationend', function f() {
            ele.style.cssText = "display: none; animation: '' "
            ele.removeEventListener('animationend', f)
        })
        ele.style.animation = `to_hide ${time}s`
    },

    getParents: (elem, selector) => {
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem
        }
        return null
    },

    siblings: (ele, selector) => {
        return [...ele.parentNode.children].filter((child) => {
            if (selector) {
                return child !== ele && child.matches(selector)
            }
            return child !== ele
        })
    },

    /**
     *
     * @param {*} selector
     * @param {*} eleType the type of create element
     * @param {*} id id
     * @param {*} cn class name
     */
    wrap: function (selector, eleType, id = '', cn = '') {
        const creatEle = document.createElement(eleType)
        if (id) creatEle.id = id
        if (cn) creatEle.className = cn
        selector.parentNode.insertBefore(creatEle, selector)
        creatEle.appendChild(selector)
    },

    unwrap: function (el) {
        const elParentNode = el.parentNode
        if (elParentNode !== document.body) {
            elParentNode.parentNode.insertBefore(el, elParentNode)
            elParentNode.parentNode.removeChild(elParentNode)
        }
    },

    isJqueryLoad: (fn) => {
        if (typeof jQuery === 'undefined') {
            getScript(GLOBAL_CONFIG.source.jQuery).then(fn)
        } else {
            fn()
        }
    },

    isHidden: (ele) => ele.offsetHeight === 0 && ele.offsetWidth === 0,

    getEleTop: (ele) => {
        let actualTop = ele.offsetTop
        let current = ele.offsetParent

        while (current !== null) {
            actualTop += current.offsetTop
            current = current.offsetParent
        }

        return actualTop
    },

    animateIn: (ele, text) => {
        ele.style.display = "block";
        ele.style.animation = text;
    },

    animateOut: (ele, text) => {
        ele.addEventListener("animationend", function f() {
          ele.style.display = "";
          ele.style.animation = "";
          ele.removeEventListener("animationend", f);
        });
        ele.style.animation = text;
    },

    addGlobalFn: (key, fn, name = false, parent = window) => {
        const globalFn = parent.globalFn || {};
        const keyObj = globalFn[key] || {};
    
        if (name && keyObj[name]) return;
    
        name = name || Object.keys(keyObj).length;
        keyObj[name] = fn;
        globalFn[key] = keyObj;
        parent.globalFn = globalFn;
      },

    addEventListenerPjax: (ele, event, fn, option = false) => {
        ele.addEventListener(event, fn, option);
        btf.addGlobalFn("pjax", () => {
          ele.removeEventListener(event, fn, option);
        });
      },

    //过滤標籤
    changeContent: (content,length = null)=>{
        if (content === '') return content

        content = content.replace(/<img.*?src="(.*?)"?[^\>]+>/ig, '[圖片]') // replace image link
        content = content.replace(/<a[^>]+?href=["']?([^"']+)["']?[^>]*>([^<]+)<\/a>/gi, '[聯結]') // replace url
        content = content.replace(/<pre><code>.*?<\/pre>/gi, '[程式]') // replace code
        content = content.replace(/<[^>]+>/g, "") // remove html tag

        if (length!=null){
            if (content.length > length) {
                content = content.substring(0, length) + '...'
            }
        }

        return content
    }

}

let wjx_cookiesTime = null
,wjx_keyboard = false
,wjx_intype = false
,lastSayHello = ""
,refreshNum = 1;
// 私有函数
var wjx = {
    // 检测显示模式
    darkModeStatus: function () {
        let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
        if (theme == 'light') {
            $(".menu-darkmode-text").text("深色模式");
        } else {
            $(".menu-darkmode-text").text("淺色模式");
        }
    },

    // 首页bb
    initIndexEssay: function() {
        if (document.querySelector("#bber-talk")) {
            $(".swiper-wrapper .swiper-slide").each(function () {
                var text = $(this)[0].innerText;
                if (text != 'undefined') {
                    $(this).text(btf.changeContent(text));
                }
            })
            new Swiper(".swiper-container",{
                direction: "vertical",
                loop: !0,
                autoplay: {
                    delay: 3e3,
                    pauseOnMouseEnter: !0
                }
            })
        }
    },


    // 只在首页显示
    onlyHome: function () {
        var urlinfo = window.location.pathname;
        urlinfo = decodeURIComponent(urlinfo);
        if (urlinfo == '/') {
            $('.only-home').attr('style', 'display: flex');
        } else {
            $('.only-home').attr('style', 'display: none');
        }
    },

    //是否在首页
    is_Post: function () {
        var url = window.location.href;  //获取url
        if (url.indexOf("/archives/") >= 0) { //判断url地址中是否包含code字符串
            return true;
        } else {
            return false;
        }
    },


    //监测是否在页面开头
    addNavBackgroundInit: function() {
        var e = 0
            , t = 0;
        document.body && (e = document.body.scrollTop),
        document.documentElement && (t = document.documentElement.scrollTop),
        0 != (e - t > 0 ? e : t) && (document.getElementById("page-header").classList.add("nav-fixed"),
            //document.getElementById("page-header").classList.add("nav-visible"),
            $("#cookies-window").hide())
    },

    // 页脚相關網站
    addFriendLinksInFooter: function () {
        var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
        if(!footerRandomFriendsBtn) return;
        footerRandomFriendsBtn.style.opacity = "0.2";
        footerRandomFriendsBtn.style.transitionDuration = "0.3s";
        footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
        // 从静态接口获取数据，根据需要换成defer加载或者inline内嵌
        function getLinks(){
            const fetchUrl = "/data/friends.json"
            fetch(fetchUrl)
                .then(res => res.json())
                .then(json => {
                    saveToLocal.set('links-data', JSON.stringify(json.groups), 10 / (60 * 24))
                    renderer(json.groups);
                })
        }
        function renderer(data){
            const linksUrl = GLOBAL_CONFIG.source.links.linksUrl
            const num = GLOBAL_CONFIG.source.links.linksNum
            // 去重
            var map = new Map();
            data.forEach(item => {
                for (let link of item.links) {
                    map.set(link["display_name"], link);
                }            
            });
            var friends = [...map.values()]
            var randomFriendLinks = getArrayItems(friends, num);
            var htmlText = '';
            for (let i = 0; i < randomFriendLinks.length; ++i) {
                var item = randomFriendLinks[i]
                htmlText += `<a class='footer-item' href='${item.url}'  target="_blank" rel="noopener nofollow external">${item.display_name}</a>`;
            }
            htmlText += `<a class='footer-item' href='${linksUrl}'>${GLOBAL_CONFIG.lang == 'zh-Hant' ? '更多' : 'More'}</a>`
            if(document.getElementById("friend-links-in-footer")){
                document.getElementById("friend-links-in-footer").innerHTML = htmlText;
            }
        }
        function friendLinksInFooterInit(){
            const data = saveToLocal.get('links-data')
            if (data) {
                renderer(JSON.parse(data))
            } else {
                getLinks()
            }
            setTimeout(()=>{
                footerRandomFriendsBtn.style.opacity = "1";
            }, 300)
        }
        friendLinksInFooterInit();
    },

    //禁止图片右键单击
    stopImgRightDrag: function () {
        var img = $("img");
        img.on("dragstart", function () {
            return false;
        });
    },

    //置顶文章横向滚动
    topPostScroll: function () {
        if (document.getElementById("recent-post-top")) {
            let xscroll = document.getElementById("recent-post-top");
            xscroll.addEventListener("mousewheel", function (e) {
                //计算鼠标滚轮滚动的距离
                let v = -e.wheelDelta / 2;
                xscroll.scrollLeft += v;
                //阻止浏览器默认方法
                if (document.body.clientWidth < 768) {
                    e.preventDefault();
                }
            }, false);
        }
    },

    topCategoriesBarScroll: function () {
        if (document.getElementById("category-bar-items")) {
            let xscroll = document.getElementById("category-bar-items");
            xscroll.addEventListener("mousewheel", function (e) {
                //计算鼠标滚轮滚动的距离
                let v = -e.wheelDelta / 2;
                xscroll.scrollLeft += v;
                //阻止浏览器默认方法
                e.preventDefault();
            }, false);
        }
    },

    //作者卡片问好
    sayhi: function () {
        if (GLOBAL_CONFIG.profileStyle == 'default') {
            if (document.querySelector('#author-info__sayhi')) {
                document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是";
            }
        }else{
            if (document.querySelector('#author-info__sayhi')) {
                document.getElementById("author-info__sayhi").innerHTML = getTimeState();
            }
        }

    },

    // 二维码
    qrcodeCreate: function () {
        if (document.getElementById('qrcode')) {
            document.getElementById("qrcode").innerHTML = "";
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: window.location.href,
                width: 250,
                height: 250,
                colorDark: "#000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    },

    // 刷新即刻短文瀑布流
    reflashEssayWaterFall: function() {
        document.querySelector("#waterfall") && setTimeout((function() {
                waterfall("#waterfall"),
                    document.getElementById("waterfall") && document.getElementById("waterfall").classList.add("show")
            }
        ), 500)
    },

    // 下载图片
    downloadImage: function (imgsrc, name) { //下载图片地址和图片名
        rm.hideRightMenu();
        if (rm.downloadimging == false) {
            rm.downloadimging = true;
            btf.snackbarShow('下載中，請稍候…', false, 10000)
            setTimeout(function () {
                let image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function () {
                    let canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    let context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);
                    let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
                    let a = document.createElement("a"); // 生成一个a元素
                    let event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = name || "photo"; // 设置图片名稱
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                };
                image.src = imgsrc;
                btf.snackbarShow('已下載，請尊重智慧產權');
                rm.downloadimging = false;
            }, "10000");
        } else {
            btf.snackbarShow('下載中，請稍候…');
        }
    },

    //隐藏今日推荐
    hideTodayCard: function() {
        document.getElementById("topGroup") && document.getElementById("topGroup").classList.add("hideCard")
    },

    //更改主题色
    changeThemeColor: function (color) {
        if (document.querySelector('meta[name="theme-color"]') !== null) {
            document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
        }
    },

    //自适应主题色
    initThemeColor: function () {
        if (wjx.is_Post()) {
            const currentTop = window.scrollY || document.documentElement.scrollTop
            if (currentTop === 0) {
                let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--wjx-main');
                wjx.changeThemeColor(themeColor);
            } else {
                let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--wjx-background');
                wjx.changeThemeColor(themeColor);
            }
        } else {
            let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--wjx-background');
            wjx.changeThemeColor(themeColor);
        }
    },

    //跳转到指定位置
    jumpTo: function (dom) {
        $(document).ready(function () {
            $("html,body").animate({
                scrollTop: $(dom).eq(i).offset().top
            }, 500 /*scroll实现定位滚动*/); /*让整个页面可以滚动*/
        });
    },

    //显示加载动画
    showLoading: function () {
        document.getElementById("loading-box").classList.remove("loaded");
        let cardColor = getComputedStyle(document.documentElement).getPropertyValue('--wjx-card-bg');
        wjx.changeThemeColor(cardColor);
    },

    //隐藏加载动画
    hideLoading: function () {
        document.getElementById("loading-box").classList.add("loaded");
    },

    //显示中控台
    showConsole: function () {
        $('.console-card-group-reward').attr('style', 'display: none');
        $('.console-card-group').attr('style', 'display: flex');
        document.querySelector("#console").classList.add("show");
    },

    //隐藏中控台
    hideConsole: function () {
        document.querySelector("#console").classList.remove("show");
    },

    //快捷键功能开关
    keyboardToggle: function () {
        if (wjx_keyboard) {
            wjx_keyboard = false;
            document.querySelector("#consoleKeyboard").classList.remove("on");
            localStorage.setItem('keyboardToggle', 'false');
        } else {
            wjx_keyboard = true;
            document.querySelector("#consoleKeyboard").classList.add("on");
            localStorage.setItem('keyboardToggle', 'true');
        }
    },

    //滚动到指定id
    scrollTo: function(e) {
        const t = document.getElementById(e);
        if (t) {
            const e = t.getBoundingClientRect().top + window.pageYOffset - 80
                , o = window.pageYOffset
                , n = e - o;
            let a = null;
            window.requestAnimationFrame((function e(t) {
                    a || (a = t);
                    const l = t - a
                        , i = (c = Math.min(l / 0, 1)) < .5 ? 2 * c * c : (4 - 2 * c) * c - 1;
                    var c;
                    window.scrollTo(0, o + n * i),
                    l < 600 && window.requestAnimationFrame(e)
                }
            ))
        }
    },

    //隐藏侧边栏
    hideAsideBtn: () => { // Hide aside
        const $htmlDom = document.documentElement.classList
        $htmlDom.contains('hide-aside')
            ? saveToLocal.set('aside-status', 'show', 2)
            : saveToLocal.set('aside-status', 'hide', 2)
        $htmlDom.toggle('hide-aside')
        $htmlDom.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.add("on") : document.querySelector("#consoleHideAside").classList.remove("on")
    },
    toPage: function() {
        var e = document.querySelectorAll(".page-number")
            , t = parseInt(e[e.length - 1].innerHTML)
            , o = document.getElementById("toPageText")
            , n = parseInt(o.value);
        if (!isNaN(n) && n > 0 && "0" !== ("" + n)[0] && n <= t) {
            var url = window.location.href;

            var photosIndexOf = url.indexOf("?group") >= 0 ? url.indexOf("?group") : -1;
            if (photosIndexOf >= 0) {//图库页面
                var new_url = url.substr(0,photosIndexOf);
                var group = url.substr(photosIndexOf)
                var a, l = new_url.replace(/\/page\/\d$/, "");
                a = 1 === n ? l : l + (l.endsWith("/") ? "" : "/") + "page/" + n,
                    document.getElementById("toPageButton").href = a + group
            }else{
                var a, l = url.replace(/\/page\/\d$/, "");

                if (n == 1){
                    var baseUrl = paginatorFirstUrl;
                }else{
                    var baseUrl = paginatorBaseUrl + n;
                }
                document.getElementById("toPageButton").href = baseUrl
                // a = 1 === n ? l : l + (l.endsWith("/") ? "" : "/") + "page/" + n,
                //     document.getElementById("toPageButton").href = a
            }
            //首页有第一屏就跳转指定位置
            scrollToPost();
        }
    },
    changeSayHelloText: function() {
        const greetings = GLOBAL_CONFIG.helloText.length == 0 ? ["🤖️ 重度狂潛病患者"] : GLOBAL_CONFIG.helloText
            , authorInfoSayHiElement = document.getElementById("author-info__sayhi");
        // 如果只有一个问候语，设置为默认值
        if (greetings.length === 1) {
            authorInfoSayHiElement.textContent = greetings[0];
            return;
        }
        let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        for (; randomGreeting === lastSayHello; )
            randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        authorInfoSayHiElement.textContent = randomGreeting,
            lastSayHello = randomGreeting
    },

    getRandomInt: function(e, t) {
        return Math.floor(Math.random() * (t - e)) + e
    },

    //初始化console图标
    initConsoleState: function() {
        document.documentElement.classList.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.add("on") : document.querySelector("#consoleHideAside").classList.remove("on")
    },

    addEventListenerChangeMusicBg: function () {
        const anMusicPage = document.getElementById("anMusic-page");
        const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");

        anMusicPage.querySelector("meting-js").aplayer.on("loadeddata", function () {
            wjx.changeMusicBg();
            console.info("player loadeddata");
        });

        aplayerIconMenu.addEventListener("click", function () {
            $(".music-mask").css("display","block")
            $(".music-mask").css("animation","0.5s ease 0s 1 normal none running to_show")
        });
        $(".music-mask").click(function(){
            anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
            $(".music-mask").hide();
        })
    },

};
