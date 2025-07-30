class ProductTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProductTypeError';
    }
}

// Storage management class
class StorageManager {
    static async getStoredProducts() {
        try {
            const stored = localStorage.getItem('product_ids_etsy');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error parsing stored products:', error);
            return [];
        }
    }

    static async getProductData(productId) {
        try {
            const data = localStorage.getItem(productId);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error parsing product data for ${productId}:`, error);
            return null;
        }
    }
    static async getItem(item) {
        return localStorage.getItem(item);
    }
}

// Product data processing class
class ProductProcessor {
    static createProductObject(dataHeyEtsy, productType, teamId, sellerId, options = {}) {
        if (!dataHeyEtsy) return null;

        try {
            // console.log(dataHeyEtsy)
            return {
                item_id: dataHeyEtsy.id_etsy,
                banner: options.images?.[0] || '',
                images: options.images || [],
                store: options.shopName,
                title: options.title || '',
                tags: dataHeyEtsy.data_hey_etsy.tags,
                product_type: productType || '',
                views_24h: dataHeyEtsy.data_hey_etsy.views_24h || '',
                total_views: dataHeyEtsy.data_hey_etsy.views || '',
                estimated_revenue: dataHeyEtsy.data_hey_etsy.estimated_revenue || '',
                rate_favorite: dataHeyEtsy.data_hey_etsy.hey || '',
                total_farvorites: dataHeyEtsy.data_hey_etsy.num_favorers || '',
                last_modified: dataHeyEtsy.data_hey_etsy.last_modified || '',
                original_creation: dataHeyEtsy.data_hey_etsy.original_creation || '',
                sold_24h: dataHeyEtsy.data_hey_etsy.sold || '',
                total_sold: dataHeyEtsy.data_hey_etsy.total_sold || '',
                hey_etsy_tags: dataHeyEtsy.data_hey_etsy.tags || '',
                market: 'Etsy',
                daily_views: dataHeyEtsy.data_hey_etsy.daily_views || '',
                team_id: teamId,
                seller_id: sellerId
            };
        } catch (error) {
            console.error('Error creating product object:', error);
            return null;
        }
    }
}

let Etsy = class extends Initial {
    constructor() {
        super();
        this.domain = location.origin;
        this.href = location.href;
        this.productType = '';
        this.storage = null;
        this.user = null;
        this.config = null;
        this.init().catch(error => {
            console.error('Initialization error:', error);
        });
    }

    async init() {
        await this.build();
        await this.initializeButton();
        await this.loadStorage();
        const self = this;
        const etsy = null;
        chrome.runtime.sendMessage({ cmd: 'getConfig' }, function (response) {
            if (!response) {
                console.error('No response received from getConfig');
                return;
            }
            if (response && response.config) {
                console.log(response.config)
                self.config = response.config;
            }
        });
        window.addEventListener('message', (event) => {
            if (event.source !== window) return;

            if (event.data.type === 'FROM_PAGE') {
                try {
                    const parsed = JSON.parse(event.data.data); // chỉ cần nếu bạn đã stringify
                    console.log(parsed)
                    window.Etsy = parsed;
                } catch (e) {
                    console.error('Error parsing data from page:', e, event.data.data);
                }
            }
        });

        const script = document.createElement('script');
        console.log(chrome.runtime.getURL('spyer/sites/etsy/inject.js'))
        script.src = chrome.runtime.getURL('spyer/sites/etsy/inject.js');
        (document.head || document.documentElement).appendChild(script);
        script.remove();
    }

    expToast(type, msg) {
        let x = document.querySelector(".exp-spy-snackbar");
        x.innerText = msg;
        x.className = "exp-spy-snackbar";
        x.classList.add("show");
        x.classList.add(type);
        setTimeout(function () {
            x.className = "exp-spy-snackbar";
        }, 3000);
    }

    async loadStorage() {
        this.storage = await new Promise(resolve => {
            chrome.storage.local.get(['session'], resolve);
        });
        this.user = this.storage.session.user;
    }

    // async validateProductType() {
    //     const productTypeSelect = document.querySelector('select[name="product-type-etsy"]');
    //     if (!productTypeSelect) {
    //         this.expToast("error", "Product type selector not found");
    //         return null;
    //     }
    //
    //     const productType = productTypeSelect.value;
    //     if (!productType) {
    //         this.expToast("error", "Please choose a product type before loading data!");
    //         return null;
    //     }
    //
    //     return productType;
    // }

    async initializeButton() {
        let checkBtnPush = null;
        let checkForm = null;
        const maxWaitTime = 30000;
        const startTime = Date.now();

        const inintForm = async () => {
            const submitFormExpLogin = async (request) => {
                let fetchApi = await fetch(request.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token_user: request.userToken })
                });

                let convertJson = await fetchApi.json();

                let response = await convertJson.result;

                return response;
            };

            const form = document.querySelector('form.form-submit-token-user-ecom');

            if (form) {
                if (checkForm) {
                    clearInterval(checkForm)
                }

                chrome.storage.local.get(['dataUser'], function (result) {
                    if (result.dataUser) {
                        form.querySelector('sup#alert-status-user-login-exp').innerHTML = `<span style="color: red">Welcome ${result.dataUser.role} ${result.dataUser.name} team ${result.dataUser.team} Login!</span>`;
                    }
                });

                form.addEventListener('submit', async (e) => {
                    e.preventDefault()

                    const apiUrl = `${window.DOMAIN}`
                    const userToken = form.querySelector('input').value

                    if (apiUrl && userToken) {
                        let response = await submitFormExpLogin({ apiUrl: apiUrl + '/users/show', userToken: userToken });

                        if (await response == 'User not found') {
                            this.expToast('error', await response)
                        } else {
                            form.querySelector('sup#alert-status-user-login-exp').innerHTML = `<span style="color: red">Welcome ${await response.role} ${await response.name} team ${await response.team} Login!</span>`;

                            chrome.storage.local.set({ dataUser: await response }, function () { });
                        }
                    } else {
                        this.expToast('error', `Please login via ${window.DOMAIN} before using!`)
                    }
                })
            }
        }

        const initButton = async () => {
            const button = document.querySelector('button.exp-btn-push');
            if (button) {
                if (checkBtnPush) {
                    clearInterval(checkBtnPush);
                }

                button.addEventListener("click", async (e) => {
                    e.preventDefault();
                    // document.querySelector('button.exp-btn-push').classList.add("is-loading");
                    const self = this;
                    chrome.storage.local.get(['session'], async function (result) {
                        if (result.session) {
                            const user = result.session.user;
                            if (window.location.pathname.includes("listing")) {
                                await self.getProduct();
                            } else {
                                await self.getProducts();
                            }
                        } else {
                            self.expToast("error", "Please login first!");
                        }
                    });
                });
            }
        };

        checkBtnPush = setInterval(() => {
            initButton();
            if (Date.now() - startTime > maxWaitTime) {
                clearInterval(checkBtnPush);
                console.log('Button not found after 30 seconds');
            }
        }, 1000);

        checkForm = setInterval(() => {
            inintForm();
            if (Date.now() - startTime > maxWaitTime) {
                clearInterval(checkForm);
                console.log('Button not found after 30 seconds');
            }
        }, 1000);

        await initButton();

        await inintForm();
    }

    async getProducts() {
        // const productType = await this.validateProductType();
        // if (!productType) {
        //     return;
        // };

        const storedProductIds = await StorageManager.getStoredProducts();

        if (!storedProductIds.length) {
            this.expToast("info", "No stored products found");
            return;
        }

        const teamId = this.user?.team_id;
        const sellerId = this.user?.id;
        if (!sellerId) {
            this.expToast("error", "Seller info not found. Please login again.");
            return;
        }

        const products = await Promise.all(
            storedProductIds.map(async (productId) => {
                const storedData = await StorageManager.getProductData(productId);
                if (!storedData) return null;

                const element = document.querySelector(`a[data-listing-id="${storedData.id_etsy}"]`);
                if (!element) return null;

                const options = {
                    shopName: element.querySelector('p.streamline-seller-shop-name__line-height')?.querySelectorAll('span')[4]?.textContent.trim() || '',
                    title: element.querySelector('h3')?.textContent.trim() || '',
                    images: [element.querySelector('img')?.getAttribute('src') || '']
                };

                return ProductProcessor.createProductObject(storedData, '', teamId, sellerId, options);
            })
        );

        const validProducts = products.filter(product => product !== null);

        if (validProducts.length) {
            await this.push(validProducts);
            this.expToast("success", `Successfully processed ${validProducts.length} products`);
        } else {
            this.expToast("error", "No valid products found");
        }
    }

    async getProduct() {

        const productEtsyId = window.Etsy.Context.data.listing_id;
        if (!productEtsyId) {
            this.expToast("error", "Product ID not found");
            return;
        }
        const teamId = this.user?.team_id;
        const sellerId = this.user?.id;

        if (!sellerId) {
            this.expToast("error", "Seller info not found. Please login again.");
            return;
        }
        console.log(productEtsyId)
        let dataHeyEtsy = await StorageManager.getItem(productEtsyId);
        console.log(dataHeyEtsy);
        if (dataHeyEtsy) {
            dataHeyEtsy = JSON.parse(dataHeyEtsy);
            const dataSc = JSON.parse(document.querySelector("[type=\"application/ld+json\"]").innerText);

            const images = [];
            document.querySelectorAll("[class*=\"listing-page-image\"] [data-image-id] img[data-src-zoom-image]")
                .forEach(el => images.push(el.getAttribute("src")));

            const options = {
                images: images,
                shopName: dataSc.brand.name,
                title: dataSc.name
            };

            const product = ProductProcessor.createProductObject(
                dataHeyEtsy,
                '',
                teamId,
                sellerId,
                options
            );

            if (product) {
                await this.push([product]);
                this.expToast("success", "Product processed successfully");
            } else {
                reject(new Error("Failed to create product object"));
            }
        } else {
            console.log('no data hst');
            return
        }
    }
};