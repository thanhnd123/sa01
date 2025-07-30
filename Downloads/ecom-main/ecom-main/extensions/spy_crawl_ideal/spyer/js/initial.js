
class Initial {
    getDomain = () => {
        let domain;

        if (typeof DataCenter === undefined) {
            expToast("error", "Missing domain! contact dev");
            return;
        }
        return domain
    }

    getToken = () => {
        if (typeof DataCenter !== undefined) {
            let initialEl = document.querySelector("#exp-embed-initial");
            if (initialEl) {
                console.log(initialEl.getAttribute('data-sv'));
                if (initialEl.getAttribute('data-sv') !== "null") {
                    return initialEl.getAttribute('data-token');
                } else {
                    expToast("error", "DC SPY Missing Token!");
                    return;
                }
            }
        } else {
            return token
        }
    }

    async build(callback = null) {
        console.log(document.querySelector('.exp-template'));
        if (document.querySelector('.exp-template') === null) {
            let template = document.createElement("div");
            template.classList.add("exp-template");
            template.style.position = "fixed";
            template.style.bottom = "calc(50%)";
            template.style.right = "10px";
            template.style.zIndex = "9999";
            template.style.textAlign = "center";
            template.style.padding = "10px";
            template.style.fontSize = "13px";

            let form = document.createElement("form");
            form.classList.add("form-submit-token-user-ecom");

            form.innerHTML = `<sup id="alert-status-user-login-exp" style="margin-bottom: 2px"></sup>`;

            let button = document.createElement("button");
            button.classList.add("exp-btn-push");
            button.classList.add("exp-btn");
            button.style.display = "block";
            button.style.padding = "5px 10px";
            button.style.background = "#4F46E5";
            button.style.opacity = "0.7";
            button.style.outline = "0";
            button.style.fontWeight = "600";
            button.style.color = "white";
            button.style.border = "1px solid #4F46E5";
            button.style.lineHeight = "1rem";
            button.style.height = "2.5rem";
            button.style.borderRadius = "5px";
            button.setAttribute("type", "button");
            button.innerText = "+ Sync";
            template.appendChild(button);

            let alertElement = document.createElement("div");
            alertElement.id = "exp-spy-snackbar";
            alertElement.classList.add('exp-spy-snackbar');
            document.body.appendChild(alertElement);

            document.body.appendChild(template);
        }
        if (callback) {
            callback();
        }
    }

    getBlob = async function (url) {
        let that = this;
        if (url.includes("www.jas-apparel.co.uk")) {
            url = 'https://' + url;
        }
        return fetch(
            url
        ).then(response => response.blob())
            .then(async function (blob) {
                return await that.blobToBase64(blob);
            })
    }
    blobToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    updateImages = async function (product) {
        let banner = await this.getBlob(product.banner);
        product.banner = banner;
        if (product.images !== undefined && product.images.length > 0) {
            let _images = [];
            let count = 0;
            for (const image of product.images) {
                let img = await this.getBlob(image);
                _images.push(img);
                count++;
                if (count == 6) {
                    break;
                }
            }
            product.images = _images;
        }
    }
    exceptPlatform = () => {
        // if (DataCenter === "https://work-space.teamexp.net") {
        let platforms = [
            'amazon',
            'etsy',
            'ebay',
            'tiktok'
        ];
        let urlOrigin = location.host;
        let except = false;
        platforms.forEach(function (platform) {
            if (urlOrigin.indexOf(platform) !== -1) {
                except = platform;
                return false;
            }
        })
        if (except) {
            document.querySelector("button.exp-btn-push").classList.remove("is-loading");
            expToast("error", "Not support " + except + " platform !");
            return true;
        }
        // }
        // return false;
    }
    push = async function (products, end = true) {
        let _product = [];
        let dataRequest = {};
        for (const product of products) {
            if (product.seller_id !== undefined) {
                chrome.storage.local.get(['session'], function (result) {
                    if (result.session && result.session.user) {
                        const user = result.session.user;
                        dataRequest['session'] = result.session;
                        product.seller_id = user.id;
                    }
                });
            }
            _product.push(product);
        }
        dataRequest['products'] = _product;
        dataRequest['type_request'] = 'tool_spy_crawl';

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Message port timeout'));
            }, 30000); // 30 seconds timeout

            chrome.runtime.sendMessage({ cmd: "push_products", data: dataRequest }, function (response) {
                clearTimeout(timeout);
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                    return;
                }
                if (response && response.success === false) {
                    expToast("error", "Cant push this page");
                    reject(response);
                    return;
                }
                expToast("success", "Push Successfully!");
                resolve(response);
            });
        });
    }

    pushInject = async function (products, end = true, convertImage = false) {
        let campaign_id = document.querySelector(".exp-template .exp-input[name=\"campaign_id\"]").value;
        if (campaign_id.length === 0) {
            expToast("error", "Please input campaign ID!");
            return;
        }
        let key = CryptoJS.MD5(JSON.stringify({
            products: products,
            campaign_id: campaign_id
        }));
        key = key.toString();
        if (chrome.storage !== undefined)
            chrome.storage.sync.set({
                previousCampaign: campaign_id
            }, function () {
                return campaign_id;
            });
        let _product = [];
        for (const product of products) {
            const _udpated = await this.updateImages(product);
            _product.push(product);
        }
        products = _product;

        let xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            let data = JSON.parse(xhttp.responseText);
            if (data === null) {
                expToast("error", "Please check your config! (missing token)");
            }
            if (data.status === "succeed") {
                expToast("success", "Push Successfully!");
            } else {
                expToast("error", data.msg);
            }
        };
        xhttp.onerror = function () {
            let data = JSON.parse(xhttp.responseText);
            if (data === null) {
                expToast("error", "Please check your config! (missing token)");
            }
            if (data.status === "succeed") {
                expToast("success", "Push Successfully!");
            } else {
                expToast("error", data.msg);
            }
        };
        let host = document.querySelector('#exp-embed').getAttribute('data-sv');
        let token = document.querySelector('#exp-embed').getAttribute('data-token');
        xhttp.open("POST", host + "/api/campaigns/products", true);
        xhttp.setRequestHeader("token", token);
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.send(JSON.stringify({
            products: products,
            campaign_id: campaign_id,
            key: key
        }));
    }
}
