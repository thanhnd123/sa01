(function() {
    try {
        const data = JSON.stringify(window.Etsy);
        window.postMessage({ type: 'FROM_PAGE', data }, '*');
    } catch (e) {
        window.postMessage({ type: 'FROM_PAGE', data: "ERROR: " + e.message }, '*');
    }
    })();