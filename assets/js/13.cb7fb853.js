(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{294:function(t,s,e){"use strict";e(50);var i={data:()=>({query:"",focused:!1,focusIndex:0,placeholder:void 0}),computed:{showSuggestions(){return this.focused&&this.suggestions&&this.suggestions.length},suggestions(){const t=this.query.trim().toLowerCase();if(!t)return;const{pages:s}=this.$site,e=this.$localePath;console.log(e);const i=s=>s&&s.title&&s.title.toLowerCase().indexOf(t)>-1,a=[];for(let t=0;t<s.length&&!(a.length>=6);t++){const n=s[t];if(this.getPageLocalePath(n)===e)if(i(n))a.push(n);else if(n.headers)for(let t=0;t<n.headers.length&&!(a.length>=6);t++){const s=n.headers[t];i(s)&&a.push(Object.assign({},n,{path:n.path+"#"+s.slug,header:s}))}}return a}},methods:{getPageLocalePath(t){for(const s in this.$site.locales||{})if("/"!==s&&0===t.path.indexOf(s))return s;return"/"},onUp(){console.log(this.showSuggestions),this.showSuggestions&&(this.focusIndex>0?this.focusIndex--:this.focusIndex=this.suggestions.length-1)},onDown(){console.log(this.showSuggestions),this.showSuggestions&&(this.focusIndex<this.suggestions.length-1?this.focusIndex++:this.focusIndex=0)},go(t){this.showSuggestions&&(this.$router.push(this.suggestions[t].path),this.query="",this.focusIndex=0)},focus(t){this.focusIndex=t},unfocus(){this.focusIndex=-1}}},a=(e(308),e(12)),n={data:()=>({showNav:!1,totalCount:0,categoryCount:0}),created(){this.getAllBlogsNum(),this.getAllCategoryNum()},components:{SearchBox:Object(a.a)(i,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"search-box"},[e("input",{ref:"input",class:{focused:t.focused},attrs:{"aria-label":"Search",placeholder:"请输入你想要搜索的内容...",autocomplete:"off",spellcheck:"false"},domProps:{value:t.query},on:{input:function(s){t.query=s.target.value},focus:function(s){t.focused=!0},blur:function(s){t.focused=!1},keyup:[function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.go(t.focusIndex)},function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"up",38,s.key,["Up","ArrowUp"])?null:t.onUp(s)},function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"down",40,s.key,["Down","ArrowDown"])?null:t.onDown(s)}]}}),t._v(" "),t.showSuggestions?e("ul",{staticClass:"suggestions",on:{mouseleave:t.unfocus}},t._l(t.suggestions,(function(s,i){return e("li",{key:i,staticClass:"suggestion",class:{focused:i===t.focusIndex},on:{mousedown:function(s){return t.go(i)},mouseenter:function(s){return t.focus(i)}}},[e("a",{attrs:{href:s.path},on:{click:function(t){t.preventDefault()}}},[e("span",{staticClass:"page-title"},[t._v(t._s(s.title||s.path))]),t._v(" "),s.header?e("span",{staticClass:"header"},[t._v("> "+t._s(s.header.title))]):t._e()])])})),0):t._e()])}),[],!1,null,"89631566",null).exports},methods:{handleMobileNav(){this.showNav=!this.showNav},getAllBlogsNum(){let t=this.$site.pages;t=t.filter(t=>{const{date:s}=t.frontmatter;return void 0!==s}),this.totalCount=t.length},getAllCategoryNum(){let t=this.$site.pages;t=t.filter(t=>{const{date:s}=t.frontmatter;return void 0!==s});let s=[];t.forEach(t=>{let e=t.frontmatter.category;s.push(e)}),this.categoryCount=new Set(s).size}}},o=(e(309),Object(a.a)(n,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("nav",{staticClass:"topbar"},[e("span",{staticClass:"logo"},[e("span",{staticClass:"logo-text"},[t._v(t._s(t.$themeConfig.logo||"L"))])]),t._v(" "),e("ul",{staticClass:"menu"},[e("li",{staticClass:"menu-item"},[e("router-link",{staticClass:"link",attrs:{to:"/"}},[t._v("主页")])],1),t._v(" "),e("li",{staticClass:"menu-item"},[e("router-link",{staticClass:"link",attrs:{to:"/blog"}},[t._v("博客")])],1),t._v(" "),e("li",{staticClass:"menu-item"},[e("router-link",{staticClass:"link",attrs:{to:"/photography"}},[t._v("摄影")])],1),t._v(" "),e("li",{staticClass:"menu-item"},[e("router-link",{staticClass:"link",attrs:{to:"/tag"}},[t._v("标签")])],1),t._v(" "),e("li",{staticClass:"menu-item"},[e("router-link",{staticClass:"link",attrs:{to:"/category"}},[t._v("分类")])],1),t._v(" "),e("li",{staticClass:"menu-item"},[e("router-link",{staticClass:"link",attrs:{to:"/timeline"}},[t._v("时间线")])],1),t._v(" "),e("li",{staticClass:"menu-item"},[e("router-link",{staticClass:"link",attrs:{to:"/contact"}},[t._v("联系我")])],1)]),t._v(" "),e("div",{staticClass:"search"},[e("i",{staticClass:"iconfont iconsearch"}),t._v(" "),e("search-box")],1),t._v(" "),e("span",{staticClass:"mobile-nav",on:{click:t.handleMobileNav}},[e("i",{staticClass:"iconfont iconnav"})]),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("nav",{directives:[{name:"show",rawName:"v-show",value:t.showNav,expression:"showNav"}],staticClass:"mobile-nav-item"},[e("div",{staticClass:"header-button"},[e("i",{staticClass:"iconfont iconback",on:{click:t.handleMobileNav}})]),t._v(" "),e("div",{staticClass:"header-info"},[e("div",{staticClass:"avatar"},[e("img",{staticClass:"avatar-img",attrs:{src:t.$themeConfig.infoCard.headerPic,alt:""}})]),t._v(" "),e("span",{staticClass:"name"},[t._v(t._s(t.$themeConfig.infoCard.name))]),t._v(" "),e("i",{staticClass:"mail"},[t._v(t._s(t.$themeConfig.infoCard.mail))]),t._v(" "),e("div",{staticClass:"statistics"},[e("span",{staticClass:"articles"},[t._v("\n            "+t._s(t.totalCount)+"\n            "),e("i",{staticClass:"white"},[t._v(" 文章")])]),t._v(" "),e("span",{staticClass:"verticle-line white"},[t._v("|")]),t._v(" "),e("span",{staticClass:"link"},[t._v("\n            "+t._s(t.categoryCount)+"\n            "),e("i",{staticClass:"white"},[t._v(" 分类")])])])]),t._v(" "),e("div",{staticClass:"line"}),t._v(" "),e("ul",{staticClass:"nav-menu"},[e("li",{staticClass:"nav-menu-item",on:{click:t.handleMobileNav}},[e("router-link",{attrs:{to:"/"}},[e("i",{staticClass:"iconfont iconhome"}),t._v(" "),e("i",{staticClass:"white"},[t._v("主页")])])],1),t._v(" "),e("li",{staticClass:"nav-menu-item",on:{click:t.handleMobileNav}},[e("router-link",{attrs:{to:"/blog"}},[e("i",{staticClass:"iconfont iconblog"}),t._v(" "),e("i",{staticClass:"white"},[t._v("博客")])])],1),t._v(" "),e("li",{staticClass:"nav-menu-item",on:{click:t.handleMobileNav}},[e("router-link",{attrs:{to:"/photography"}},[e("i",{staticClass:"iconfont iconblog"}),t._v(" "),e("i",{staticClass:"white"},[t._v("摄影")])])],1),t._v(" "),e("li",{staticClass:"nav-menu-item",on:{click:t.handleMobileNav}},[e("router-link",{attrs:{to:"/tag"}},[e("i",{staticClass:"iconfont iconlabel"}),t._v(" "),e("i",{staticClass:"white"},[t._v("标签")])])],1),t._v(" "),e("li",{staticClass:"nav-menu-item",on:{click:t.handleMobileNav}},[e("router-link",{attrs:{to:"/category"}},[e("i",{staticClass:"iconfont iconfenlei-"}),t._v(" "),e("i",{staticClass:"white"},[t._v("分类")])])],1),t._v(" "),e("li",{staticClass:"nav-menu-item",on:{click:t.handleMobileNav}},[e("router-link",{attrs:{to:"/timeline"}},[e("i",{staticClass:"iconfont icontimeline"}),t._v(" "),e("i",{staticClass:"white"},[t._v("时间线")])])],1),t._v(" "),e("li",{staticClass:"nav-menu-item",on:{click:t.handleMobileNav}},[e("router-link",{attrs:{to:"/contact"}},[e("i",{staticClass:"iconfont iconother"}),t._v(" "),e("i",{staticClass:"white"},[t._v("联系我")])])],1)])])])],1)}),[],!1,null,null,null));s.a=o.exports},295:function(t,s,e){},296:function(t,s,e){},308:function(t,s,e){"use strict";e(295)},309:function(t,s,e){"use strict";e(296)},333:function(t,s,e){},334:function(t,s,e){},361:function(t,s,e){"use strict";e(333)},362:function(t,s,e){"use strict";e(334)},370:function(t,s,e){"use strict";e.r(s);var i=e(294),a={},n=(e(361),e(12)),o=Object(n.a)(a,(function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"footer"},[this._m(0),this._v(" "),s("div",{staticClass:"right"},[this._v("\n    "+this._s(this.$themeConfig.footer.copyright)+"\n  ")])])}),[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"left"},[e("div",{staticClass:"wave-libra"},[e("div",{staticClass:"wavetext"},[e("div",{staticClass:"coast delay"},[e("div",{staticClass:"wave-rel-wrap"},[e("div",{staticClass:"wave delay"})])]),t._v(" "),e("div",{staticClass:"text text-l"},[t._v("L")]),t._v(" "),e("div",{staticClass:"text text-i"},[t._v("i")]),t._v(" "),e("div",{staticClass:"text text-b"},[t._v("b")]),t._v(" "),e("div",{staticClass:"text text-r"},[t._v("r")]),t._v(" "),e("div",{staticClass:"text text-a"},[t._v("a")])])])])}],!1,null,null,null).exports,l={name:"layout",components:{Navbar:i.a,Footer:o}},c=(e(362),Object(n.a)(l,(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"app"},[e("Navbar"),t._v(" "),e("div",{staticClass:"bg"}),t._v(" "),e("div",{staticClass:"content"},[e("span",{staticClass:"content-text header-text animated slow bounceInLeft"},[t._v(t._s(t.$themeConfig.home.title))]),t._v(" "),e("span",{staticClass:"content-text sub-text animated slow lightSpeedIn"},[t._v(t._s(t.$themeConfig.home.subTitle))]),t._v(" "),e("router-link",{staticClass:"contact",attrs:{to:"/contact"}},[e("i",{staticClass:"iconfont iconcontact"}),t._v("\n      联系我\n    ")])],1),t._v(" "),e("Footer")],1)}),[],!1,null,"7a95237a",null));s.default=c.exports}}]);