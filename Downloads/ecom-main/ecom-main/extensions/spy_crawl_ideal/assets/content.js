
const getUser = async () => {
    return await fetch(`${window.location.origin}/api/auth/session`, {
        credentials: "include" // gửi cookie kèm request
    }).then(
        response => response.json(),
    ).then(
        (json) => {
            console.log('json', json)
            chrome.runtime.sendMessage({ cmd: 'authenticated', session: json }, (response) => {
                console.log('response', response)
                setLicenseCode(response)
            });
            chrome.storage.local.set({
                session: json
            });
            licenseCodeHst();
        },
    ).catch(error => error);
}
const setLicenseCode = async (licenseCode) => {
    chrome.storage.local.set({
        HEYETSY_LICENCE_CODE: licenseCode
    });
}
window.addEventListener('load', async () => {
    console.log('content.js load')
    await getUser();
});