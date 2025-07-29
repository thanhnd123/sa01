
let Shopify = class extends Initial {
    constructor() {
        super();
        this.domain = location.origin;
        this.href = location.href;
        this.initialize();
    }

    async initialize() {
        console.log('init shopify')
        await this.init();
        let self = this;
        await this.build(function () {
            if (document.querySelector('.exp-template') !== null) {
                let button = document.querySelector('button.exp-btn-push')
                console.log(button);
                if (button) {
                    button.addEventListener("click", async (e) => {
                        e.preventDefault();
                        button.classList.add("is-loading");
                        try {
                            if (self.href.indexOf("/products/") !== -1) {
                                await self.getProduct()
                            } else if (self.href.indexOf("/collections/") !== -1 || self.href.indexOf("/search") !== -1) {
                                await self.getProducts()
                            }
                        } catch (error) {
                            console.error('Error in button click:', error);
                            expToast("error", "An error occurred: " + error.message);
                        } finally {
                            button.classList.remove("is-loading");
                        }
                    });
                }
            }
        });
    }

    async init() {
        if (document.querySelector('.exp-template')) {
            let last = document.querySelectorAll('.exp-template').length;
            document.querySelectorAll('.exp-template').forEach(function (el, key) {
                if (key !== last - 1)
                    el.remove()
            });
        }
    }

    getDOMProducts() {
        let products = [];
        document.querySelectorAll('.product-wrap').forEach(function (_product) {
            let banner = new URL('https:' + _product.querySelector('.image__container img').getAttribute('src'))
            let pathName = banner.pathname;
            let fileName = pathName.substring(pathName.lastIndexOf('/') + 1);
            if (fileName.lastIndexOf('_') !== -1 && fileName.lastIndexOf('.') !== -1) {
                fileName = fileName.slice(0, fileName.lastIndexOf('_')) + fileName.slice(fileName.lastIndexOf('.'), fileName.length);
                pathName = pathName.substring(0, pathName.lastIndexOf('/') + 1);
                banner = banner.origin + pathName + fileName;
            } else {
                console.log(_product);
                banner = banner.origin + banner.pathname;
            }
            console.log(banner);
            let itemId = new URL(window.location.origin + _product.querySelector('a').getAttribute('href'))
            itemId = itemId.pathname.substring(itemId.pathname.lastIndexOf('/') + 1)
            let title = _product.querySelector('.hidden-product-link').textContent
            let product = {
                type: "",
                title: title,
                banner: banner,
                images: [],
                item_id: itemId,
                tags: [],
                store: location.host,
                market: "shopify"
            };
            products.push(product);
        })
        console.log(products);
        if (products.length === 0) {
            expToast("error", "No more product!");
            return;
        }
        this.push(products);
    }

    async getProducts() {
        try {
            if (location.pathname.indexOf('collections') !== -1) {
                let nUrl = location.protocol + location.host + location.pathname + "/products.json";
                await this.ajaxLoadProduct(nUrl);
            }
            else {
                expToast("error", "Cant push this page (platform Shopify)");
            }
        } catch (error) {
            console.error('Error in getProducts:', error);
            expToast("error", "Failed to get products: " + error.message);
        }
    }

    async getProduct() {
        let nUrl = location.protocol + location.host + location.pathname + ".json" + location.search;
        let images = [];
        let that = this;
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Message port timeout'));
            }, 30000); // 30 seconds timeout

            chrome.runtime.sendMessage({
                action: 'xhttp',
                method: 'GET',
                url: nUrl,
            }, async function (response) {
                clearTimeout(timeout);
                if (chrome.runtime.lastError) {
                    console.error('Runtime error:', chrome.runtime.lastError);
                    expToast("error", "Cant push this page (platform Shopify)");
                    reject(chrome.runtime.lastError);
                    return;
                }
                if (response.success === false) {
                    expToast("error", "Cant push this page (platform Shopify)");
                    reject(response);
                    return;
                }
                let _product = response.json.product;
                console.log(_product);
                let _images = _product.images;
                let images = [];
                let banner = _product.image.src;
                let bannerWidth = null;
                if (_product.image.width !== undefined) {
                    bannerWidth = _product.image.width;
                }
                if (_images !== undefined)
                    _images.forEach((_image) => {
                        images.push(_image.src);
                        if (bannerWidth != null && _image.width !== undefined && _image.width > bannerWidth) {
                            banner = _image.src;
                            bannerWidth = _image.width;
                        }
                    });
                let product = {
                    type: "",
                    title: _product.title,
                    banner: banner,
                    images: images,
                    item_id: _product.handle,
                    tags: [],
                    store: location.host,
                    market: "shopify"
                };
                await that.pushProduct([product]);
                resolve();
            });
        });
    }

    async ajaxLoadProduct(nUrl, page = 1, limit = 50, products = []) {
        let that = this;
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Message port timeout'));
            }, 30000); // 30 seconds timeout

            chrome.runtime.sendMessage({
                action: 'xhttp',
                method: 'GET',
                url: nUrl + "?page=" + page + "&limit=" + limit,
            }, async function (response) {
                clearTimeout(timeout);
                if (chrome.runtime.lastError) {
                    console.error('Runtime error:', chrome.runtime.lastError);
                    expToast("error", "Cant push this page (platform Shopify)");
                    reject(chrome.runtime.lastError);
                    return;
                }
                if (response.success === false) {
                    expToast("error", "Cant push this page (platform Shopify)");
                    reject(response);
                    return;
                }
                let data = response;
                let _products = data.products;
                _products.forEach((_product) => {
                    let _images = _product.images;
                    let images = [];
                    let banner = null;
                    let bannerWidth = 0;
                    if (_images !== undefined)
                        _images.forEach((_image) => {
                            images.push(_image.src);
                            if (_image.width !== undefined && _image.width > bannerWidth) {
                                banner = _image.src;
                                bannerWidth = _image.width;
                            }
                        });
                    let product = {
                        type: "",
                        title: _product.title,
                        banner: banner,
                        images: images,
                        item_id: _product.handle,
                        tags: _product.tags,
                        store: location.host,
                        market: "shopify"
                    };
                    products.push(product);
                });
                if (products.length >= 50 && _products.length === limit) {
                    await that.pushProduct(products, false);
                    setTimeout(async function () {
                        await that.ajaxLoadProduct(nUrl, ++page, limit, [])
                    }, 1200);
                }
                else if (_products.length === limit) {
                    setTimeout(async function () {
                        await that.ajaxLoadProduct(nUrl, ++page, limit, products)
                    }, 1200);
                } else {
                    await that.pushProduct(products);
                }
                resolve();
            });
        });
    }

    async pushProduct(products, end = true) {
        try {
            if (products.length > 6) {
                let _products = products.splice(0, 6);
                await this._pushProduct(_products, end);
                await this.pushProduct(products, end);
            }
            else {
                await this._pushProduct(products, end);
            }
        } catch (error) {
            console.error('Error in pushProduct:', error);
            expToast("error", "Failed to push products: " + error.message);
        }
    }

    async _pushProduct(products, end = true) {
        try {
            await this.push(products, end);
        } catch (error) {
            console.error('Error in _pushProduct:', error);
            expToast("error", "Failed to push products: " + error.message);
        }
    }
}
    ;
