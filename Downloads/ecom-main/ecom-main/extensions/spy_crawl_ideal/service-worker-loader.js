import env_variables from './config.js'

function expToast(type, msg) {
    let x = document.getElementById("exp-spy-snackbar");
    x.innerText = msg;
    x.className = "";
    x.classList.add("show");
    x.classList.add(type);
    setTimeout(function () {
        x.className = "";
    }, 3000);
}

const xhr = (options, callback) => {
    fetch(options.url, {
        method: options.method ? options.method.toUpperCase() : "GET",
        headers: options.headers,
        body: options.data,
    }).then(response => response.json()).then(json => callback({ success: true, json: json })).catch(error => callback({ success: false, error: error }));
}

import './assets/chunk-dec0e0a6.js';

// Gộp tất cả message listeners vào một
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Service worker received message:', request);

    // Xử lý xhttp requests
    if (request.action === "xhttp") {
        let options = {
            url: request.url,
            data: request.data,
            headers: request.headers,
            method: request.method ? request.method.toUpperCase() : "GET",
        };
        xhr(options, sendResponse);
        return true; // Giữ port mở cho async response
    }

    // Xử lý alert messages
    if (request.action == 'alertMessage') {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                const tabId = tabs[0].id;
                const message = request.message;

                chrome.tabs.executeScript(tabId, {
                    code: `expToast("error", ${JSON.stringify(message)});`,
                });
            }
        );
        return false;
    }

    // Xử lý user login token success
    if (request.action == 'user_login_token_success') {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                const tabId = tabs[0].id;
                const data = request.data;

                chrome.tabs.executeScript(tabId, {
                    code: `expToast("success", 'Welcome ${JSON.stringify(data.role)} ${JSON.stringify(data.name)} team ${JSON.stringify(data.team)} Login!');`,
                });
            }
        );
    return false;
    }

    // Xử lý get_html command
    if (request.cmd === "get_html") {
        xhr(
            {
                url: chrome.extension.getURL("content_scripts.html"),
            },
            sendResponse
        );
        return true; // Giữ port mở cho async response
    }

    // Xử lý authenticated command
    if (request.cmd === "authenticated") {
        licenseCodeHst();
        return false;
    }

    // Xử lý getConfig command
    if (request.cmd === "getConfig") {
        sendResponse({ config: env_variables() });
        return false; // Sync response
    }

    // Xử lý push_products command
    if (request.cmd === "push_products") {
        // Xử lý async function đúng cách
        pushProducts(request.data).then(response => {

        sendResponse({ success: response.success, message: response.message });
        }).catch(error => {
            console.error('Push products error:', error);
            sendResponse({ success: false, message: error.message || 'Failed to push products' });
        });
        return true; // Giữ port mở cho async response
    }

    return false;
});

function get(action, request, sendResponse) {
    fetch(action, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }).then(
        response => response.json(),
    ).then(
        json => sendResponse(json),
    ).catch(
        error => error
    );
}

async function post(action, request, sendResponse) {
    await fetch(action, {
        method: "POST",
        body: JSON.stringify(request.data),
        headers: { 'Content-Type': 'application/json' }
    }).then(
        response => response.json(),
    ).then(
        json => sendResponse({ status: json.status, message: json.message }),
    ).catch(
        error => error
    );
}

const licenseCodeHst = async () => {
    return await fetch(`${env_variables().api_url}/heyetsy/get-token-hey-etsy`).then(
        response => response.json(),
    ).then(
        (json) => {
            chrome.storage.local.set({
                HEYETSY_LICENCE_CODE: json.result
            });
        }
    ).catch(error => console.log(error));
}

async function pushProducts(data) {
    try {
        let session = await chrome.storage.local.get('session');
        data['session'] = session.session;
        console.log(data);
    let response = await fetch(`${env_variables().api_url}/ideals/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let result = await response.json();
        console.log('Service worker: API response:', result);
        return { success: true, message: result.message || 'Success' };
    } catch (error) {
        console.log('Service worker: API error:', error);
        return { success: false, message: error.message || 'Failed to push products' };
    }
}

