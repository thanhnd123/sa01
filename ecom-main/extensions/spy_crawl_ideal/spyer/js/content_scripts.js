if (document.querySelector('.exp-template') === null)
    document.addEventListener('readystatechange', function () {
        if (location.host === "www.etsy.com") {
            new Etsy();

        } else if (location.host === "www.redbubble.com") {
            new Redbubble();
        } else if (location.host === "www.amazon.com") {
            new Amazon();
        } else if (location.host === "www.ebay.com") {
            new Ebay();
        } else if (location.host === "www.jas-apparel.co.uk") {
            new JasApparel();
        } else {
            if (
                document.body.classList.contains("theme-flatsome")
                || document.body.classList.contains("woo-variation-swatches-theme-flatsome-child")
                || document.body.classList.contains("theme-oxygen-is-not-a-theme") || document.querySelector('#flatsome-main-css')
                || document.body.classList.contains("woocommerce-js")
            ) {
                new Woo();
            } else if (document.querySelector("body.wvs-theme-resources")) {
                new WooThemeCanvas();
            } else if (typeof window.sbsdk !== "undefined" || document.getElementById('sentry-cdn') != null) {
                injectScript(chrome.extension.getURL('sites/klaviyo.js'), 'body');
            } else if (location.host === "puzzlehd.com") {
                new Puzzlehd();
            } else if (location.host === "displate.com") {
                new Displate();
            } else if (location.host === 'www.impawards.com') {
                new Impazazzlewards();
            } else if (document.evaluate("/html/body//script[contains(text(),\"TeeChip\")]", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue) {
                new Dzeetee();
            } else if (location.host === 'viralstyle.com') {
                new Viralstyle();
            } else if (document.querySelector('.storefront-page') || window.location.pathname === "/_/search" || document.querySelector('body[ng-controller="BuyCtrl"]')) {
                injectScript(chrome.extension.getURL('sites/store_front.js'), 'body');
            } else if (location.host === 'www.teepublic.com') {
                new TeenPublic();
            } else if (location.host === 'www.zazzle.com') {
                new Zazzle();
            } else if (location.host === 'www.walmart.com') {
                new Walmart();
            } else if (document.body.classList.contains("theme-shoptimizer")) {
                new WooShopTimizer();
            } else if (document.body.classList.contains("theme-pangja")) {
                new WooPangja();
            } else if (location.host === 'shirt.woot.com') {
                new ShirtWoot();
            } else if (location.host === 'expressmytee.com') {
                new ExpressMyTee();
            } else if (location.host === 'payonteer.com') {
                new PayOnTeer();
            } else if (location.host === 'eroltos.com') {
                new Eroltos();
            } else if (location.host === 'www.shirtstore.se') {
                new ShirtStore();
            } else if (location.host === 'www.snorgtees.com' && document.querySelector('body.catalog-product-view')) {
                new Snorgtees();
            } else if (document.body.classList.contains("theme-bb-theme")) {
                new WooBbTheme();
            } else if (location.host === 'www.carousell.sg') {
                new Carousell();
            } else if (location.host === 'poshmark.com') {
                new Poshmard();
            } else if (location.host === 'www.anime1688.com') {
                new Anime1688();
            } else if (location.host === 'www.wish.com') {
                new Wish();
            } else if (location.host === 'www.shopdisney.com') {
                new ShopDisney();
            } else if (location.host === 'www.hottopic.com') {
                new HotTopic();
            } else if (location.host === 'society6.com') {
                new Society6();
            } else if (location.host === 'www.tisortfabrikasi.com') {
                new Tisortfabrikasi();
            } else if (document.querySelector('body.theme-storefront') || ((document.querySelector('body.archive') || document.querySelector('body.single-product')) && document.querySelector('body.woocommerce'))) {
                new WooStoreFront();
            } else if (location.host === "www.gearbubble.com" || ['www.familysistershops.com'].indexOf(location.host) !== -1) {
                new GearBubble();
            } else if (location.host === "www.theshirtlist.com") {
                new TheShirtList();
            } else if (location.host === "www.forfansbyfans.com") {
                new ForFanByFans();
            } else if (location.host === "www.merchbar.com") {
                new MerchBar();
            } else if (location.host === "www.nerdkungfu.com") {
                new NerdKungfu();
            } else if (location.host === "www.europosters.eu") {
                new EuroPosters();
            } else if (location.host === "moosfy.com") {
                new Moosfy();
            } else if (location.host === "eigengift.com") {
                new Eigengift();
            } else if (location.host === "www.ktecknonltd.com") {
                new Ktecknonltd();
            } else if (location.host === "www.wyierblog.com") {
                new Wyierblog();
            } else if (location.host === "www.zavvi.com") {
                new Zavvi();
            } else if (location.host === "shirtbea.com" || location.host === "shirtoont.com") {
                new Codeigniter();
            } else if (location.host === "www.teeshirtpalace.com") {
                new Teeshirtpalace();
            } else if (location.host === "www.mhempearth.com") {
                new mhempearth();
            } else if (location.host === "www.spreadshirt.com") {
                new Spreadshirt();
            } else if (location.host === "fineartamerica.com"
                || document.querySelector('#searchEngineResultsParentDiv .searchengineresultdiv')
                || document.querySelector('#productPreviewDiv')) {
                new Fineartamerica();
            } else if (location.host === "www.lorajewel.com") {
                new Lorajewel();
            } else if (location.host.indexOf('www.ubuy') !== -1) {
                new Ubuy();
            } else if (location.host === "www.rdynolabs.com") {
                new Rdynolabs();
            } else if (location.host === "www.mumzworld.com") {
                new Mumzworld();
            } else if (location.host === "www.fanatics.com") {
                new Fanatics();
            } else if (location.host === "www.pngitem.com") {
                new Pngitem();
            } else if (location.host === "www.carstickers.com") {
                new Carstickers();
            } else if (location.host === "getstickerpack.com") {
                new Getstickerpack();
            } else if (location.host === "peastores.com") {
                new Peastores();
            } else if (location.host === "chaest.com") {
                new Chaest();
            } else if (location.host === "www.mikeypet.com") {
                new Mikeypet();
            } else if (location.host === "cosandi.com") {
                new Cosandi();
            } else if (location.host === "www.chyroll.com") {
                new Chyroll();
            } else if (location.host === "sealiontee.com") {
                new Sealiontee();
            } else if (document.querySelector('#wix-first-paint')) {
                new Wix();
            } else if (location.host === "trendsdelta.com") {
                new Trendsdelta();
            } else if (document.querySelector('#scroll-mark')) {
                new StyledComponents()
            } else if (document.querySelector('#vite-legacy-entry')) {
                injectScript(chrome.extension.getURL('sites/vitelegacy.js'), 'body');
                // new Vitelegacy();
            } else if (location.host === "merchgears.com") {
                new Trendsdelta();
            } else if (location.host === "www.cafepress.com") {
                new Cafepress();
            } else if (location.host === "www.cafepress.com") {
                new Cafepress();
            } else if (location.host.indexOf("myspreadshop.com") !== -1) {
                new Myspreadshop();
            } else if (location.host.indexOf("flinkmagnet.com") !== -1) {
                new Flinkmagnet();
            } else if (location.host.indexOf("emp-online.com") !== -1) {
                new Emponline();
            } else if (location.host.indexOf("trendswanna.com") !== -1) {
                new Trendswanna();
            } else if (location.host.indexOf("bestsuts.com") !== -1) {
                new Bestsuts();
            } else if (location.host.indexOf("rightjake.com") !== -1) {
                new Rightjake();
            } else if (location.host.indexOf("printfuns.com") !== -1) {
                new Printfuns();
            } else if (location.host.indexOf("www.vinyldisorder.com") !== -1) {
                new Vinyldisorder();
            } else if (location.host.indexOf("www.minted.com") !== -1) {
                new Minted();
            } else if (location.host.indexOf("gossby.com") !== -1) {
                new Gossby();
            } else if (location.host.indexOf("tee4lives.com") !== -1) {
                new Tee4lives();
            } else if (location.host.indexOf("crosfil.com") !== -1) {
                new Crofil();
            } else if (document.querySelector("#shopify-digital-wallet") || document.querySelector('.shopify-section')) {
                // injectScript(chrome.extension.getURL('sites/shopify.js'), 'body');
                new Shopify();
            } else if (location.host.indexOf("www.prezzybox.com") !== -1) {
                injectScript(chrome.extension.getURL('sites/prezzybox.js'), 'body');
            } else if (location.host.indexOf('www.gifts.ie') !== -1) {
                new Giftsie();
            } else if (location.host.indexOf('helloyoucandles.com') !== -1) {
                new Helloyoucandles();
            } else if (location.host.indexOf('the-pebble-tree-602373.shoplightspeed.com') !== -1) {
                new Pebble();
            } else if (location.host.indexOf('www.giftsforyounow.com') !== -1) {
                new Giftsforyounow();
            } else if (location.host.indexOf('printerval.com') !== -1) {
                new Printerval();
            } else if (location.host.indexOf('www.notonthehighstreet.com') !== -1) {
                new Notonthehighstreet();
            } else if (location.host.indexOf('customtrendding.com') !== -1) {
                new Customtrendding();
            } else if (location.host.indexOf('senprints.com') !== -1) {
                new Senprints();
            }
            else if (location.host.indexOf('www.thebamboo.vn') !== -1) {
                new Thebamboo();
            }
            else if (location.host.indexOf('www.forallgifts.com') !== -1) {
                new Forallgift();
            }
            else if (location.host.indexOf('gefrints.com') !== -1) {
                new Gefrints();
            }

            function injectScript(file, node) {

                let th = document.getElementsByTagName(node)[0];
                let helper = document.createElement('script');
                helper.setAttribute('type', 'text/javascript');
                helper.setAttribute('src', chrome.extension.getURL('js/helpers.js'));
                helper.setAttribute('data-sv', DataCenter);
                helper.setAttribute('data-token', token);
                helper.setAttribute('data-host', host);
                helper.setAttribute('id', 'exp-embed-helper');
                th.appendChild(helper);

                let init = document.createElement('script');
                init.setAttribute('type', 'text/javascript');
                init.setAttribute('src', chrome.extension.getURL('js/init.js'));
                init.setAttribute('data-sv', DataCenter);
                init.setAttribute('data-token', token);
                init.setAttribute('data-host', host);
                init.setAttribute('id', 'exp-embed-init');
                th.appendChild(init);

                let crypto = document.createElement('script');
                crypto.setAttribute('type', 'text/javascript');
                crypto.setAttribute('src', chrome.extension.getURL('js/crypto/core.js'));
                crypto.setAttribute('data-sv', DataCenter);
                crypto.setAttribute('data-token', token);
                crypto.setAttribute('data-host', host);
                crypto.setAttribute('id', 'exp-embed-crypto-core');
                th.appendChild(crypto);

                let cryptoMd5 = document.createElement('script');
                cryptoMd5.setAttribute('type', 'text/javascript');
                cryptoMd5.setAttribute('src', chrome.extension.getURL('js/crypto/md5.js'));
                cryptoMd5.setAttribute('data-sv', DataCenter);
                cryptoMd5.setAttribute('data-token', token);
                cryptoMd5.setAttribute('data-host', host);
                cryptoMd5.setAttribute('id', 'exp-embed-crypto-core');
                th.appendChild(cryptoMd5);


                let initial = document.createElement('script');
                initial.setAttribute('type', 'text/javascript');
                initial.setAttribute('src', chrome.extension.getURL('js/initial.js'));
                initial.setAttribute('data-sv', DataCenter);
                initial.setAttribute('data-token', token);
                initial.setAttribute('data-host', host);
                initial.setAttribute('id', 'exp-embed-initial');
                th.appendChild(initial);

                let injectSite = document.createElement('script');
                injectSite.setAttribute('type', 'text/javascript');
                injectSite.setAttribute('src', file);
                injectSite.setAttribute('data-sv', DataCenter);
                injectSite.setAttribute('data-token', token);
                injectSite.setAttribute('data-host', host);
                injectSite.setAttribute('id', 'exp-embed');
                th.appendChild(injectSite);
            }
        }
    }, false);
