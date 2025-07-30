import { W as i, U as d, l as h, d as m } from "./chunk-821333de.js";
import { H as f } from "./chunk-863d424b.js";
import { u as r } from "./chunk-448aa6a6.js";
(async function (a) {
    a.runtime.onInstalled.addListener(function (t) {
        // t.reason === chrome.runtime.OnInstalledReason.INSTALL &&
        //     chrome.tabs.create({ url: i }, function (s) {
        //         console.log("New tab launched with " + i);
        //     });
    }),
        // a.runtime.setUninstallURL(d),
        a.runtime.onMessage.addListener(async function (t, s) {
            switch (t.type) {
                case "SAVED_LISTING":
                    const { payload: c } = t;
                    await r(c);
                    break;
                case "META_DATA":
                    var n = t.data;
                    for (let e = 0; e < n.length; e++) {
                        const l = n[e];
                        await r(l);
                    }
                    const o = await h.get(m);
                    o &&
                        fetch(`${f}/bulk/meta/listings`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                Authorization: `Bearer ${o}`,
                            },
                            body: JSON.stringify(n),
                        })
                            .then((e) => (e.ok ? e.json() : Promise.reject(e)))
                            .then((e) => { })
                            .catch((e) => { });
                    break;
            }
        });
})(chrome);
