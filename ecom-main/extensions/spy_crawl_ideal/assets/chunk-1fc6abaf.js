import { D as Ht, __tla as Hr } from "./chunk-52add7e1.js";
import { C as ke, a as Se, H as Ee, b as Vt } from "./chunk-821333de.js";
import { H as Zt, a as ne } from "./chunk-863d424b.js";
let zt,
    Lt,
    Te,
    Gt,
    jt,
    Wt,
    Kt,
    Jt,
    Yt,
    Qt,
    Xt,
    er,
    tr,
    rr,
    ir,
    et,
    or,
    nr,
    sr,
    ar,
    cr,
    pr,
    dr,
    lr,
    ur,
    hr,
    gr,
    fr,
    Vr = Promise.all([
        (() => {
            try {
                return Hr;
            } catch { }
        })(),
    ]).then(async () => {
        let tt,
            rt,
            it,
            ot,
            nt,
            st,
            at,
            ct,
            pt,
            dt,
            lt,
            T,
            se,
            Ae,
            Ce,
            ut,
            ht,
            U,
            Me,
            j,
            $e;
        (tt = "9529018d309e074306f3515f9fbf51bc"),
            (Lt = !1),
            (jt = "OPEN_EVENT"),
            (Yt = "USE_LOGIN_LICENCE_CODE"),
            (lr = "OPEN_UI_CUSTOMIZATION_PAGE"),
            (ar = "CARD_SHOW_EVENT"),
            (zt = "CARD_STYLING_EVENT"),
            (pr = "CARD_TEXT_COLOR_EVENT"),
            (dr = "CARD_BACKGROUND_COLOR_EVENT"),
            (sr = "SIDEBAR_POSITION_EVENT"),
            (nr = "SIDEBAR_BEHAVIOUR_EVENT"),
            (Kt = "SERVICE_GET_ME"),
            (or = "SERVICE_ERROR"),
            (Gt = "JS_ERROR"),
            (Wt = "REFRESH_ME"),
            (Jt = "TURN_ON_POWER_BUTTON"),
            (ur = "SHOP_SHOW_EVENT"),
            (gr = "SHOP_SIDEBAR_BEHAVIOUR_EVENT"),
            (fr = "OPEN_HIGHLIGHT_SETTINGS_PAGE"),
            (hr = "SHOP_LISTING_EVENT"),
            (Te = "heyetsy-card-container"),
            (rt =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path opacity=".4" d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43c-1.78 0-3.51.52-5.09 1.49-1.58.98-3 2.41-4.16 4.23-1 1.57-1 4.12 0 5.69 2.31 3.64 5.69 5.72 9.25 5.72 1.78 0 3.51-.52 5.09-1.49 1.58-.98 3-2.41 4.16-4.23 1-1.56 1-4.12 0-5.69ZM12 16.04c-2.24 0-4.04-1.81-4.04-4.04S9.76 7.96 12 7.96s4.04 1.81 4.04 4.04-1.8 4.04-4.04 4.04Z" fill="currentColor"></path><path d="M11.998 9.14a2.855 2.855 0 0 0 0 5.71c1.57 0 2.86-1.28 2.86-2.85s-1.29-2.86-2.86-2.86Z" fill="currentColor"></path></svg>'),
            (it =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path d="M22 22H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h20c.41 0 .75.34.75.75s-.34.75-.75.75Z" fill="currentColor"></path><path d="M9.75 4v18h4.5V4c0-1.1-.45-2-1.8-2h-.9c-1.35 0-1.8.9-1.8 2Z" fill="currentColor"></path><path opacity=".4" d="M3 10v12h4V10c0-1.1-.4-2-1.6-2h-.8C3.4 8 3 8.9 3 10ZM17 15v7h4v-7c0-1.1-.4-2-1.6-2h-.8c-1.2 0-1.6.9-1.6 2Z" fill="currentColor"></path></svg>'),
            (ot =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path d="M22 8.692c0 1.19-.19 2.29-.52 3.31H2.52c-.33-1.02-.52-2.12-.52-3.31 0-3.09 2.49-5.59 5.56-5.59 1.81 0 3.43.88 4.44 2.23a5.549 5.549 0 0 1 4.44-2.23c3.07 0 5.56 2.5 5.56 5.59Z" fill="currentColor"></path><path opacity=".4" d="M21.48 12c-1.58 5-6.45 7.99-8.86 8.81-.34.12-.9.12-1.24 0C8.97 19.99 4.1 17 2.52 12h18.96Z" fill="currentColor"></path></svg>'),
            (nt =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path opacity=".4" d="M22 8.691c0 1.19-.19 2.29-.52 3.31-1.58 5-6.45 7.99-8.86 8.81-.34.12-.9.12-1.24 0-.64-.22-1.45-.59-2.32-1.11-.56-.33-.65-1.11-.19-1.57l11.28-11.28c.54-.54 1.49-.31 1.68.43.11.45.17.92.17 1.41Z" fill="currentColor"></path><path d="M22.53 1.471a.754.754 0 0 0-1.06 0l-2.34 2.34c-.79-.45-1.71-.71-2.69-.71-1.81 0-3.43.88-4.44 2.23a5.549 5.549 0 0 0-4.44-2.23c-3.07 0-5.56 2.5-5.56 5.59 0 1.19.19 2.29.52 3.31.65 2.07 1.87 3.8 3.25 5.17l-4.3 4.3c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l20-20c.29-.29.29-.77 0-1.06Z" fill="currentColor"></path></svg>'),
            (st =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path d="M16.75 3.56V2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.5h-6.5V2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.56c-2.7.25-4.01 1.86-4.21 4.25-.02.29.22.53.5.53h16.92c.29 0 .53-.25.5-.53-.2-2.39-1.51-4-4.21-4.25Z" fill="currentColor"></path><path opacity=".4" d="M21 10.838v1.74c0 .61-.54 1.08-1.14.98-.28-.04-.57-.07-.86-.07a5.51 5.51 0 0 0-5.5 5.5c0 .46.18 1.1.37 1.68a.998.998 0 0 1-.95 1.32H8c-3.5 0-5-2-5-5v-6.16c0-.55.45-1 1-1h16c.55.01 1 .46 1 1.01Z" fill="currentColor"></path><path d="M8.5 15c-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71.23-.23.58-.34.91-.27.06.01.12.03.18.06.06.02.12.05.18.09l.15.12c.18.19.29.45.29.71 0 .26-.11.52-.29.71l-.15.12c-.06.04-.12.07-.18.09-.06.03-.12.05-.18.06-.07.01-.14.02-.2.02ZM12 15c-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71.38-.37 1.05-.37 1.42 0 .18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM8.5 18.499c-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71.1-.09.2-.16.33-.21.37-.16.81-.07 1.09.21.18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM21.83 16.17a4.008 4.008 0 0 0-5.66 0 4.008 4.008 0 0 0 0 5.66 4.008 4.008 0 0 0 5.66 0 4.008 4.008 0 0 0 0-5.66Zm-.76 3.39c-.13.14-.32.22-.53.22h-.74v.78c0 .21-.08.39-.22.53s-.32.22-.53.22c-.41 0-.75-.34-.75-.75v-.78h-.75a.749.749 0 1 1 0-1.5h.75v-.71a.749.749 0 1 1 1.5 0v.71h.74c.42 0 .75.34.75.75 0 .21-.08.4-.22.53Z" fill="currentColor"></path></svg>'),
            (at =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path d="M16.75 3.56V2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.5h-6.5V2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.56c-2.7.25-4.01 1.86-4.21 4.25-.02.29.22.53.5.53h16.92c.29 0 .53-.25.5-.53-.2-2.39-1.51-4-4.21-4.25Z" fill="currentColor"></path><path opacity=".4" d="M20 9.84c.55 0 1 .45 1 1V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5v-6.16c0-.55.45-1 1-1h16Z" fill="currentColor"></path><path d="m14.84 14.99-.5.51h-.01l-3.03 3.03c-.13.13-.4.27-.59.29l-1.35.2c-.49.07-.83-.28-.76-.76l.19-1.36c.03-.19.16-.45.29-.59l3.04-3.03.5-.51c.33-.33.7-.57 1.1-.57.34 0 .71.16 1.12.57.9.9.61 1.61 0 2.22Z" fill="currentColor"></path></svg>'),
            (ct =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path d="m19.75 15.41-.85-.85c.44-.67.7-1.46.7-2.32C19.6 9.9 17.7 8 15.36 8c-2.34 0-4.24 1.9-4.24 4.24 0 2.34 1.9 4.24 4.24 4.24.86 0 1.66-.26 2.32-.7l.85.85c.17.17.39.25.61.25.22 0 .44-.08.61-.25.33-.34.33-.89 0-1.22Z" fill="currentColor"></path><path opacity=".4" d="M5.41 2h13.17c1.1 0 2 .91 2 2.02v2.22c0 .81-.5 1.82-1 2.32l-4.29 3.84c-.6.51-1 1.52-1 2.32v4.34c0 .61-.4 1.41-.9 1.72l-1.4.91c-1.3.81-3.09-.1-3.09-1.72v-5.35c0-.71-.4-1.62-.8-2.12L4.31 8.46c-.5-.51-.9-1.41-.9-2.02V4.12c.01-1.21.91-2.12 2-2.12Z" fill="currentColor"></path></svg>'),
            (pt =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path opacity=".4" d="M21.37 11.39v5.99c0 2.76-2.24 5-5 5H7.63c-2.76 0-5-2.24-5-5v-5.92c.76.82 1.84 1.29 3.01 1.29 1.26 0 2.47-.63 3.23-1.64A3.754 3.754 0 0 0 12 12.75c1.28 0 2.42-.6 3.11-1.6.77.99 1.96 1.6 3.2 1.6 1.21 0 2.31-.49 3.06-1.36Z" fill="currentColor"></path><path d="M14.99 1.25h-6l-.74 7.36c-.06.68.04 1.32.29 1.9.58 1.36 1.94 2.24 3.46 2.24 1.54 0 2.87-.86 3.47-2.23.18-.43.29-.93.3-1.44v-.19l-.78-7.64Z" fill="currentColor"></path><path opacity=".6" d="m22.36 8.27-.29-2.77c-.42-3.02-1.79-4.25-4.72-4.25h-3.84l.74 7.5c.01.1.02.21.02.4.06.52.22 1 .46 1.43.72 1.32 2.12 2.17 3.58 2.17 1.33 0 2.53-.59 3.28-1.63.6-.8.87-1.81.77-2.85ZM6.59 1.25c-2.94 0-4.3 1.23-4.73 4.28l-.27 2.75c-.1 1.07.19 2.11.82 2.92.76.99 1.93 1.55 3.23 1.55 1.46 0 2.86-.85 3.57-2.15.26-.45.43-.97.48-1.51l.78-7.83H6.59v-.01Z" fill="currentColor"></path><path d="M11.35 16.66a2.495 2.495 0 0 0-2.23 2.49v3.23h5.75V19.5c.01-2.09-1.22-3.08-3.52-2.84Z" fill="currentColor"></path></svg>'),
            (dt =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path opacity=".4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2Z" fill="currentColor"></path><path d="M18.82 10.579c.4 0 .73-.33.73-.73 0-.4-.33-.73-.73-.73h-3.61l.39-3.5c.04-.4-.24-.76-.65-.81-.4-.04-.76.24-.81.65l-.41 3.66H10.9l.39-3.5c.04-.4-.24-.76-.65-.81-.4-.04-.76.24-.81.65l-.4 3.66H5.9c-.4 0-.73.33-.73.73 0 .4.33.73.73.73h3.37l-.32 2.85H5.18c-.4 0-.73.33-.73.73 0 .4.33.73.73.73h3.61l-.39 3.5c-.04.4.24.76.65.81h.08c.37 0 .68-.28.73-.65l.41-3.66h2.84l-.39 3.5c-.04.4.24.76.65.81h.08c.37 0 .68-.28.73-.65l.41-3.66h3.53c.4 0 .73-.33.73-.73 0-.4-.33-.73-.73-.73h-3.37l.32-2.85h3.75Zm-5.56 2.84h-2.84l.32-2.85h2.84l-.32 2.85Z" fill="currentColor"></path></svg>'),
            (lt =
                '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; " viewBox="0 0 24 24" fill="none"><path d="M7.24 2h-1.9C3.15 2 2 3.15 2 5.33v1.9c0 2.18 1.15 3.33 3.33 3.33h1.9c2.18 0 3.33-1.15 3.33-3.33v-1.9C10.57 3.15 9.42 2 7.24 2Z" fill="currentColor"></path><path opacity=".4" d="M18.67 2h-1.9c-2.18 0-3.33 1.15-3.33 3.33v1.9c0 2.18 1.15 3.33 3.33 3.33h1.9c2.18 0 3.33-1.15 3.33-3.33v-1.9C22 3.15 20.85 2 18.67 2Z" fill="currentColor"></path><path d="M18.67 13.43h-1.9c-2.18 0-3.33 1.15-3.33 3.33v1.9c0 2.18 1.15 3.33 3.33 3.33h1.9c2.18 0 3.33-1.15 3.33-3.33v-1.9c0-2.18-1.15-3.33-3.33-3.33Z" fill="currentColor"></path><path opacity=".4" d="M7.24 13.43h-1.9C3.15 13.43 2 14.58 2 16.76v1.9C2 20.85 3.15 22 5.33 22h1.9c2.18 0 3.33-1.15 3.33-3.33v-1.9c.01-2.19-1.14-3.34-3.32-3.34Z" fill="currentColor"></path></svg>'),
            (T = {
                429: "#ea580c",
                401: "#dc2626",
                402: "#ca8a04",
                default: "#dc2626",
            }),
            (se = {
                429: "#fed7aa",
                401: "#fecaca",
                402: "#fef08a",
                default: "#fecaca",
            }),
            (Ae = {
                429: '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem;" viewBox="0 0 24 24" fill="none"><path d="M15.22 6.55H5.78c-.28 0-.54.01-.78.02-2.37.14-3 1.01-3 3.71v.58c0 .55.45 1 1 1h15c.55 0 1-.45 1-1v-.58c0-2.98-.76-3.73-3.78-3.73ZM3 13.36c-.55 0-1 .45-1 1v2.91C2 20.25 2.76 21 5.78 21h9.44c2.97 0 3.75-.72 3.78-3.57v-3.07c0-.55-.45-1-1-1H3Zm3.96 5.2H5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.72c.41 0 .75.34.75.75s-.34.75-.76.75Zm5.59 0H9.11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.44a.749.749 0 1 1 0 1.5Z" fill="#ea580c"></path><path d="M22.002 13.332v-5.24c0-3.13-1.79-4.49-4.49-4.49h-8.93c-.76 0-1.44.11-2.04.34-.47.17-.89.42-1.23.75-.18.17-.04.45.22.45h10.87c2.25 0 4.07 1.82 4.07 4.07v7.17c0 .25.27.39.45.21.69-.73 1.08-1.8 1.08-3.26Z" fill="#ea580c"></path></svg>',
                401: '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem;" viewBox="0 0 24 24" fill="none"><path d="M18.75 8v2.1c-.44-.06-.94-.09-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2c-.56.01-1.06.04-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8Z" fill="#dc2626"></path><path opacity=".4" d="M22 15v2c0 4-1 5-5 5H7c-4 0-5-1-5-5v-2c0-3.34.7-4.59 3.25-4.9.44-.06.94-.09 1.5-.1h10.5c.56.01 1.06.04 1.5.1C21.3 10.41 22 11.66 22 15Z" fill="#dc2626"></path><path d="M8 16.999c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.18-.19-.29-.45-.29-.71 0-.13.03-.26.08-.38s.12-.23.21-.33c.1-.09.2-.16.33-.21.37-.16.81-.07 1.09.21.09.1.16.21.21.33.05.12.08.25.08.38 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM12 17c-.27 0-.52-.11-.71-.29-.09-.1-.16-.21-.21-.33A.995.995 0 0 1 11 16c0-.27.11-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.44.29.71 0 .13-.03.26-.08.38s-.12.23-.21.33c-.19.18-.45.29-.71.29ZM16 17c-.26 0-.52-.11-.71-.29-.18-.19-.29-.44-.29-.71 0-.27.11-.52.29-.71.38-.37 1.05-.37 1.42 0 .04.05.08.1.12.16.04.05.07.11.09.17.03.06.05.12.06.18.01.07.02.14.02.2 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29Z" fill="#dc2626"></path></svg>',
                402: '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem;" viewBox="0 0 24 24" fill="none"><path d="M15.22 6.55H5.78c-.28 0-.54.01-.78.02-2.37.14-3 1.01-3 3.71v.58c0 .55.45 1 1 1h15c.55 0 1-.45 1-1v-.58c0-2.98-.76-3.73-3.78-3.73ZM3 13.36c-.55 0-1 .45-1 1v2.91C2 20.25 2.76 21 5.78 21h9.44c2.97 0 3.75-.72 3.78-3.57v-3.07c0-.55-.45-1-1-1H3Zm3.96 5.2H5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.72c.41 0 .75.34.75.75s-.34.75-.76.75Zm5.59 0H9.11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.44a.749.749 0 1 1 0 1.5Z" fill="#ca8a04"></path><path d="M22.002 13.332v-5.24c0-3.13-1.79-4.49-4.49-4.49h-8.93c-.76 0-1.44.11-2.04.34-.47.17-.89.42-1.23.75-.18.17-.04.45.22.45h10.87c2.25 0 4.07 1.82 4.07 4.07v7.17c0 .25.27.39.45.21.69-.73 1.08-1.8 1.08-3.26Z" fill="#ca8a04"></path></svg>',
                default:
                    '<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem;" viewBox="0 0 24 24" fill="none"><path opacity=".4" d="M21.76 15.92 15.36 4.4C14.5 2.85 13.31 2 12 2s-2.5.85-3.36 2.4l-6.4 11.52c-.81 1.47-.9 2.88-.25 3.99.65 1.11 1.93 1.72 3.61 1.72h12.8c1.68 0 2.96-.61 3.61-1.72.65-1.11.56-2.53-.25-3.99Z" fill="#dc2626"></path><path d="M12 14.75c-.41 0-.75-.34-.75-.75V9c0-.41.34-.75.75-.75s.75.34.75.75v5c0 .41-.34.75-.75.75ZM12 17.999c-.06 0-.13-.01-.2-.02a.636.636 0 0 1-.18-.06.757.757 0 0 1-.18-.09l-.15-.12c-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71l.15-.12c.06-.04.12-.07.18-.09.06-.03.12-.05.18-.06.13-.03.27-.03.39 0 .07.01.13.03.19.06.06.02.12.05.18.09l.15.12c.18.19.29.45.29.71 0 .26-.11.52-.29.71l-.15.12c-.06.04-.12.07-.18.09-.06.03-.12.05-.19.06-.06.01-.13.02-.19.02Z" fill="#dc2626"></path></svg>',
            }),
            (Ce = {
                429: "Too many requests",
                401: "Invalid API key",
                402: "Payment required",
                default: "Oops! Something went wrong",
            }),
            (ut = {
                429: "Oops! You've limited your requests.",
                401: "Oops! Your API key is invalid.",
                402: "Upgrade to the paid plan to use it.",
                default: "Oops! Something went wrong.",
            }),
            (ht = {
                429: `<a href="${ne}/pricing" target="_blank" style="font-weight: 700; text-decoration: underline; display: flex; align-items: center; color: ${T[429]}">
  <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-right: 0.5rem" viewBox="0 0 24 24" fill="none"><path d="M15.408 18.592c-.4 0-.73-.33-.73-.73 0-.4.33-.73.73-.73 2.82 0 5.12-2.3 5.12-5.12 0-2.82-2.3-5.12-5.12-5.12a5.13 5.13 0 0 0-5.12 5.12c0 .4-.33.73-.73.73-.4 0-.73-.33-.73-.73 0-3.63 2.95-6.59 6.59-6.59 3.64 0 6.58 2.95 6.58 6.58s-2.95 6.59-6.59 6.59Z" fill="${T[429]}"></path><path d="M8.59 5.41c.4 0 .73.33.73.73 0 .4-.33.73-.73.73a5.13 5.13 0 0 0-5.12 5.12c0 2.82 2.3 5.12 5.12 5.12 2.82 0 5.12-2.3 5.12-5.12 0-.4.33-.73.73-.73.4 0 .73.33.73.73 0 3.63-2.95 6.59-6.59 6.59C4.94 18.58 2 15.63 2 12s2.95-6.59 6.59-6.59Z" fill="${T[429]}"></path></svg>
  <span style="color: ${T[429]}">Upgrade</span>
  </a>`,
                401: `<a href="${ne}/api-tokens" target="_blank" style="font-weight: 700; text-decoration: underline; display: flex; align-items: center; color: ${T[401]}">
  <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-right: 0.5rem" viewBox="0 0 24 24" fill="none"><path d="M15.408 18.592c-.4 0-.73-.33-.73-.73 0-.4.33-.73.73-.73 2.82 0 5.12-2.3 5.12-5.12 0-2.82-2.3-5.12-5.12-5.12a5.13 5.13 0 0 0-5.12 5.12c0 .4-.33.73-.73.73-.4 0-.73-.33-.73-.73 0-3.63 2.95-6.59 6.59-6.59 3.64 0 6.58 2.95 6.58 6.58s-2.95 6.59-6.59 6.59Z" fill="${T[401]}"></path><path d="M8.59 5.41c.4 0 .73.33.73.73 0 .4-.33.73-.73.73a5.13 5.13 0 0 0-5.12 5.12c0 2.82 2.3 5.12 5.12 5.12 2.82 0 5.12-2.3 5.12-5.12 0-.4.33-.73.73-.73.4 0 .73.33.73.73 0 3.63-2.95 6.59-6.59 6.59C4.94 18.58 2 15.63 2 12s2.95-6.59 6.59-6.59Z" fill="${T[401]}"></path></svg>
  <span style="color: ${T[401]}">Get API key</span>
  </a>`,
                402: `<a href="${ne}/payment" target="_blank" style="font-weight: 700; text-decoration: underline; display: flex; align-items: center; color: ${T[402]}">
  <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-right: 0.5rem" viewBox="0 0 24 24" fill="none"><path d="M15.408 18.592c-.4 0-.73-.33-.73-.73 0-.4.33-.73.73-.73 2.82 0 5.12-2.3 5.12-5.12 0-2.82-2.3-5.12-5.12-5.12a5.13 5.13 0 0 0-5.12 5.12c0 .4-.33.73-.73.73-.4 0-.73-.33-.73-.73 0-3.63 2.95-6.59 6.59-6.59 3.64 0 6.58 2.95 6.58 6.58s-2.95 6.59-6.59 6.59Z" fill="${T[402]}"></path><path d="M8.59 5.41c.4 0 .73.33.73.73 0 .4-.33.73-.73.73a5.13 5.13 0 0 0-5.12 5.12c0 2.82 2.3 5.12 5.12 5.12 2.82 0 5.12-2.3 5.12-5.12 0-.4.33-.73.73-.73.4 0 .73.33.73.73 0 3.63-2.95 6.59-6.59 6.59C4.94 18.58 2 15.63 2 12s2.95-6.59 6.59-6.59Z" fill="${T[402]}"></path></svg>
  <span style="color: ${T[402]}">Upgrade</span>
  </a>`,
                default: `<a href="${Vt}" target="_blank" style="font-weight: 700; text-decoration: underline; display: flex; align-items: center; color: ${T.default}">
  <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem; height: 1.25rem; margin-right: 0.5rem" viewBox="0 0 24 24" fill="none"><path d="M15.408 18.592c-.4 0-.73-.33-.73-.73 0-.4.33-.73.73-.73 2.82 0 5.12-2.3 5.12-5.12 0-2.82-2.3-5.12-5.12-5.12a5.13 5.13 0 0 0-5.12 5.12c0 .4-.33.73-.73.73-.4 0-.73-.33-.73-.73 0-3.63 2.95-6.59 6.59-6.59 3.64 0 6.58 2.95 6.58 6.58s-2.95 6.59-6.59 6.59Z" fill="${T.default}"></path><path d="M8.59 5.41c.4 0 .73.33.73.73 0 .4-.33.73-.73.73a5.13 5.13 0 0 0-5.12 5.12c0 2.82 2.3 5.12 5.12 5.12 2.82 0 5.12-2.3 5.12-5.12 0-.4.33-.73.73-.73.4 0 .73.33.73.73 0 3.63-2.95 6.59-6.59 6.59C4.94 18.58 2 15.63 2 12s2.95-6.59 6.59-6.59Z" fill="${T.default}"></path></svg>
  <span style="color: ${T.default}">Contact us</span>
  </a>`,
            }),
            (U = {
                VIEWS: "Views",
                DAILY_VIEWS: "Daily Views",
                FAVORITES: "Favorites",
                FAVORITES_RATE: "Favorites Rate",
                CREATED_AT: "Created At",
                UPDATED_AT: "Updated At",
                SIMILAR: "View Similar Products",
                SHOP: "\u{1F449} Go To Shop",
                TAGS: "Tags",
                CATEGORIES: "Categories",
            }),
            (Me = {
                VIEWS: "views",
                DAILY_VIEWS: "daily_views",
                FAVORITES: "num_favorers",
                FAVORITES_RATE: "hey",
                CREATED_AT: "original_creation",
                UPDATED_AT: "last_modified",
            }),
            (j = {
                VIEWS: rt,
                DAILY_VIEWS: it,
                FAVORITES: ot,
                FAVORITES_RATE: nt,
                CREATED_AT: st,
                UPDATED_AT: at,
                SIMILAR: ct,
                SHOP: pt,
                TAGS: dt,
                CATEGORIES: lt,
            }),
            (Qt = (e, t = {}) => {
                t.textColor || ke, t.backgroundColor || Se;
                const r = document.createElement("div");
                return (
                    (r.id = Te),
                    (r.innerHTML = `
    <div style="position: absolute; left: 0; top: 25%; width: 100%; z-index: 9999;">
        <div style="padding: 1rem; margin-left: auto;margin-right: auto; ">
            <div style="display: flex;" class="animate-pulse">
                <div style="padding-top: 0.25rem;padding-bottom: 0.25rem; flex: 1 1 0%; ">
                    <div style="background-color: #ffffff; height: 1rem; border-radius: 0.375rem; margin-top: 1rem;"></div>
                    <div style="background-color: #ffffff; height: 1rem; border-radius: 0.375rem; margin-top: 1rem;"></div>
                    <div style="background-color: #ffffff; height: 1rem; border-radius: 0.375rem; margin-top: 1rem;"></div>
                    <div style="background-color: #ffffff; height: 1rem; border-radius: 0.375rem; margin-top: 1rem;"></div>
                </div>
            </div>
        </div>
    </div>
    `),
                    r
                );
            }),
            (tr = (e, t, r = {}) => {
                var u;
                let i = r.textColor || ke,
                    n = r.backgroundColor || Se;
                (r == null ? void 0 : r.isHighlight) &&
                    ((i = "#ffffff"),
                        (n = (r == null ? void 0 : r.highlightBackgroundColor) || Ht));
                const s = document.createElement("div");
                s.id = Te;
                const a = Object.keys(U).map((c) => {
                    var d, h, _, l;
                    if (!t[Me[c]])
                        switch (c) {
                            case "SIMILAR":
                                return `
            <div style="display: flex; align-items: center; ">
              <div
                    style="display: flex; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.25rem;padding-right: 0.25rem; margin-left: 0.25rem; color: #1F2937; align-items: center; border-radius: 0.375rem; "
                >
                <div class="heyetsy-icon heyetsy-icon__danger">
                    <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                        ${U[c]}
                    </div>
                    <span style="padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 0.5rem; background-color: ${n}; color: ${i}; border-radius: 0.375rem; display: flex; flex-direction: column;">
                        <a href="https://www.etsy.com/listing/${e}/similar" target="_blank" style="display: flex; flex-direction: column;background-color: ${n}; color: ${i};">
                        ${j[c]}
                        </a>
                    </span>
                </div>
            </div>`;
                            case "SHOP":
                                return `
          <div
                    style="display: flex; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.25rem;padding-right: 0.25rem; margin-left: 0.25rem; color: #1F2937; align-items: center; border-radius: 0.375rem; "
                >
                <div class="heyetsy-icon heyetsy-icon__danger">
                    <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                        ${U[c]}
                    </div>
                    <span style="padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 0.5rem; background-color: ${n}; color: ${i}; border-radius: 0.375rem; display: flex; flex-direction: column;">
                        <a href="${Zt + "/r/s/" + t.u
                                    }" target="_blank" style="display: flex; flex-direction: column;background-color: ${n}; color: ${i};">
                            ${j[c]}
                        </a>
                    </span>
                </div>
            </div>`;
                            case "TAGS":
                                const g =
                                    (h =
                                        (d = t == null ? void 0 : t.tags) == null
                                            ? void 0
                                            : d.replace(/'/g, "\\'")) == null
                                        ? void 0
                                        : h.replace(/"/g, '\\"');
                                return `
                <div
                          style="display: flex; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.25rem;padding-right: 0.25rem; margin-left: 0.25rem; color: #1F2937; align-items: center; border-radius: 0.375rem; "
                      >
                      <div class="heyetsy-icon heyetsy-icon__danger">
                          <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                              ${U[c]}
                          </div>
                          <div onClick="navigator.clipboard.writeText('${g}').then((e)=>{this.querySelector('#copied').style.display='flex'; setTimeout(()=>{this.querySelector('#copied').style.display='none';}, 1000);})"
                                style="padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 0.5rem; background-color: ${n}; color: ${i}; border-radius: 0.375rem; display: flex;cursor: pointer; item-align: center;">
                            ${j[c]}
                            <div id="copied" style=" font-weight: 500;font-size: 1rem; margin-left: 0.25rem; display:none;">
                              Copied!
                            </div>
                          </div>
                      </div>
                  </div>`;
                            case "CATEGORIES":
                                const f =
                                    (l =
                                        (_ = t == null ? void 0 : t.categories) == null
                                            ? void 0
                                            : _.replace(/'/g, "\\'")) == null
                                        ? void 0
                                        : l.replace(/"/g, '\\"');
                                return `
                          <div
                                    style="display: flex; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.25rem;padding-right: 0.25rem; margin-left: 0.25rem; color: #1F2937; align-items: center; border-radius: 0.375rem; "
                                >
                                <div class="heyetsy-icon heyetsy-icon__danger">
                                    <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                                        ${U[c]}
                                    </div>
                                    <div onClick="navigator.clipboard.writeText('${f}').then((e)=>{this.querySelector('#copied').style.display='flex'; setTimeout(()=>{this.querySelector('#copied').style.display='none';}, 1000);})"
                                          style="padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 0.5rem; background-color: ${n}; color: ${i}; border-radius: 0.375rem; display: flex;cursor: pointer; item-align: center;">
                                      ${j[c]}
                                      <div id="copied" style=" font-weight: 500;font-size: 1rem; margin-left: 0.25rem; display:none;">
                                        Copied!
                                      </div>
                                    </div>
                                </div>
                            </div></div>`;
                            default:
                                return `
            <div
                    style="display: flex; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.25rem;padding-right: 0.25rem; margin-left: 0.25rem; color: #1F2937; align-items: center; border-radius: 0.375rem; "
                >
                <div class="heyetsy-icon heyetsy-icon__danger">
                    <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                        ${U[c]}
                    </div>
                    <span style="padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 0.5rem; background-color: ${n}; color: ${i}; border-radius: 0.375rem; display: flex; flex-direction: column; margin-right: 0.5rem;">${j[c]}</span>
                </div>
                <span style="display: inline-block; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.5rem;padding-right: 0.5rem; border-radius: 0.25rem; background-color: ${n}; color: ${i}; font-weight: 500;font-size: 1.125rem;">
                    0
                </span>
            </div> `;
                        }
                    return `
      <div
          style="display: flex; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.25rem;padding-right: 0.25rem; margin-left: 0.25rem; color: #1F2937; align-items: center; border-radius: 0.375rem; "
      >
          <div class="heyetsy-icon heyetsy-icon__danger">
            <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                ${U[c]}
            </div>
            <span style="padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 0.5rem; background-color: ${n}; color: ${i}; border-radius: 0.375rem; display: flex; flex-direction: column; margin-right: 0.5rem;">${j[c]
                        }</span>
          </div>
          <span style="display: inline-block; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.5rem;padding-right: 0.5rem; border-radius: 0.25rem; background-color: ${n}; color: ${i}; font-weight: 500;font-size: 1.125rem;">
            ${t[Me[c]]}
          </span>
      </div> `;
                });
                return (
                    (s.innerHTML = `
    <div style="position: absolute; top: -1.5rem; right: 0; z-index: 25;">
        <div style="display: flex; align-items: center;">
        <div class="heyetsy-icon heyetsy-icon__danger" style="margin-right: 0.25rem; ${t.views_24h > 0 ? "" : "display: none;"
                        }">
            <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                Views in the Last 24 Hours
            </div>
            <div style="display: flex; align-items: center; padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 1rem; background-color: #f3f4f6; border-radius: 0.375rem; color: #334155; font-weight: 500;font-size: 1.125rem;border-style: dashed;border-width: 2px;">
            <p style="margin-left: 0.25rem; color: #111827; font-weight: 500;font-size: 1.25rem;">
                ${(u = t == null ? void 0 : t.views_24h) == null
                            ? void 0
                            : u.toLocaleString()
                        }+ Views
            </p>
        </div>
          </div>
        <div class="heyetsy-icon heyetsy-icon__danger" style="margin-right: 0.25rem; ${t.sold > 0 ? "" : "display: none;"
                        }">
            <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                Sold in the Last 24 Hours
            </div>
            <div style="display: flex; align-items: center; padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 1rem; background-color: #f3f4f6; border-radius: 0.375rem; color: #334155; font-weight: 500;font-size: 1.125rem;border-style: dashed;border-width: 2px;">
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.75rem; height: 1.75rem; " viewBox="0 0 24 24" fill="none"><path d="m13.3 8.11 1.32 2.64c.18.36.66.72 1.06.78l2.39.4c1.53.26 1.89 1.36.79 2.46L17 16.26c-.31.31-.49.92-.39 1.36l.53 2.31c.42 1.82-.55 2.53-2.16 1.58l-2.24-1.33c-.41-.24-1.07-.24-1.48 0L9.01 21.5c-1.61.95-2.58.24-2.16-1.58l.53-2.31c.1-.43-.08-1.04-.39-1.36L5.14 14.4c-1.1-1.1-.74-2.21.79-2.46l2.39-.4c.4-.07.88-.42 1.06-.78l1.32-2.64c.71-1.44 1.89-1.44 2.6-.01ZM6 9.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v7c0 .41-.34.75-.75.75ZM18 9.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v7c0 .41-.34.75-.75.75ZM12 4.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75Z" fill="currentColor"></path></svg>
            <p style="margin-left: 0.25rem; color: #111827; font-weight: 500;font-size: 1.25rem;">
                ${t.sold} Sold
            </p>
            <span style="display: flex;position: absolute;height: 1rem;width: 1rem;top: 0px;right: 0px;margin-top: -0.25rem;margin-right: -0.25rem;">
                <span class="animate-ping" style="position: absolute;display: inline-flex;height: 100%;width: 100%;border-radius: 9999px;background-color: #38bdf8;opacity: 0.75;"></span>
                <span style="position: relative;display: inline-flex;border-radius: 9999px;height: 1rem;width: 1rem;background-color: #0ea5e9;"></span>
            </span>
        </div>
          </div>
          </div>
    </div>
    <div style="position: absolute; top: -1rem; left: 0; z-index: 25;">
        <div style="border-radius: 0.25rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #14b8a6;">
            <p style="color: #fff;font-size: 11px;font-weight: bold;">
            ${Ee}
            </p>
        </div>
      </div>
      <div style=" position: absolute; left: 0.125rem; top: 10%; padding-top: 0.5rem;padding-left: 0.5rem; width: 100%; z-index: 25;">
         ${a.join("")}
      </div>
      `),
                    s
                );
            }),
            (ir = (e) => {
                let t = e.status || "default";
                const r = `
    <div
          style="display: flex; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.25rem;padding-right: 0.25rem; margin-left: 0.25rem; color: ${T[t]}; align-items: center; border-radius: 0.375rem; "
      >
          <div class="heyetsy-icon heyetsy-icon__danger">
            <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                ${Ce[t]}
            </div>
            <span style="padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 0.5rem; background-color: ${se[t]}; border-radius: 0.375rem; display: flex; flex-direction: column; margin-right: 0.5rem;">
            ${Ae[t]}
            </span>
          </div>
          <span style="display: inline-block; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.5rem;padding-right: 0.5rem; border-radius: 0.25rem; background-color: ${se[t]}; color: ${T[t]}; font-weight: 500;font-size: 1.125rem;">
            ${ut[t]}
          </span>
      </div>
      <div
          style="display: flex; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.25rem;padding-right: 0.25rem; margin-left: 0.25rem; color: ${T[t]}; align-items: center; border-radius: 0.375rem; "
      >
                <div class="heyetsy-icon heyetsy-icon__danger">
                    <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                        ${Ce[t]}
                    </div>
                    <span style="padding-top: 0.25rem;padding-bottom: 0.25rem; padding-left: 0.5rem;padding-right: 0.5rem; background-color: ${se[t]}; border-radius: 0.375rem; display: flex; flex-direction: column; margin-right: 0.5rem;">
                    ${Ae[t]}
                    </span>
                </div>
                <span style="display: inline-block; padding-top: 0.125rem;padding-bottom: 0.125rem; padding-left: 0.5rem;padding-right: 0.5rem; border-radius: 0.25rem; background-color: ${se[t]}; color: ${T[t]}; font-weight: 500;font-size: 1.125rem;">
                ${ht[t]}
                </span>
            </div></div>`,
                    i = document.createElement("div");
                return (
                    (i.innerHTML = `
        <div style=" position: absolute; left: 0.125rem; top: 0.5rem; padding-top: 0.5rem;padding-left: 0.5rem; width: 100%; z-index: 25;">
            ${r}
    </div>`),
                    i
                );
            }),
            ($e = {
                AF: "Afghanistan",
                AX: "Aland Islands",
                AL: "Albania",
                DZ: "Algeria",
                AS: "American Samoa",
                AD: "Andorra",
                AO: "Angola",
                AI: "Anguilla",
                AQ: "Antarctica",
                AG: "Antigua And Barbuda",
                AR: "Argentina",
                AM: "Armenia",
                AW: "Aruba",
                AU: "Australia",
                AT: "Austria",
                AZ: "Azerbaijan",
                BS: "Bahamas",
                BH: "Bahrain",
                BD: "Bangladesh",
                BB: "Barbados",
                BY: "Belarus",
                BE: "Belgium",
                BZ: "Belize",
                BJ: "Benin",
                BM: "Bermuda",
                BT: "Bhutan",
                BO: "Bolivia",
                BA: "Bosnia And Herzegovina",
                BW: "Botswana",
                BV: "Bouvet Island",
                BR: "Brazil",
                IO: "British Indian Ocean Territory",
                BN: "Brunei Darussalam",
                BG: "Bulgaria",
                BF: "Burkina Faso",
                BI: "Burundi",
                KH: "Cambodia",
                CM: "Cameroon",
                CA: "Canada",
                CV: "Cape Verde",
                KY: "Cayman Islands",
                CF: "Central African Republic",
                TD: "Chad",
                CL: "Chile",
                CN: "China",
                CX: "Christmas Island",
                CC: "Cocos (Keeling) Islands",
                CO: "Colombia",
                KM: "Comoros",
                CG: "Congo",
                CD: "Congo, Democratic Republic",
                CK: "Cook Islands",
                CR: "Costa Rica",
                CI: "Cote D'Ivoire",
                HR: "Croatia",
                CU: "Cuba",
                CY: "Cyprus",
                CZ: "Czech Republic",
                DK: "Denmark",
                DJ: "Djibouti",
                DM: "Dominica",
                DO: "Dominican Republic",
                EC: "Ecuador",
                EG: "Egypt",
                SV: "El Salvador",
                GQ: "Equatorial Guinea",
                ER: "Eritrea",
                EE: "Estonia",
                ET: "Ethiopia",
                FK: "Falkland Islands (Malvinas)",
                FO: "Faroe Islands",
                FJ: "Fiji",
                FI: "Finland",
                FR: "France",
                GF: "French Guiana",
                PF: "French Polynesia",
                TF: "French Southern Territories",
                GA: "Gabon",
                GM: "Gambia",
                GE: "Georgia",
                DE: "Germany",
                GH: "Ghana",
                GI: "Gibraltar",
                GR: "Greece",
                GL: "Greenland",
                GD: "Grenada",
                GP: "Guadeloupe",
                GU: "Guam",
                GT: "Guatemala",
                GG: "Guernsey",
                GN: "Guinea",
                GW: "Guinea-Bissau",
                GY: "Guyana",
                HT: "Haiti",
                HM: "Heard Island & Mcdonald Islands",
                VA: "Holy See (Vatican City State)",
                HN: "Honduras",
                HK: "Hong Kong",
                HU: "Hungary",
                IS: "Iceland",
                IN: "India",
                ID: "Indonesia",
                IR: "Iran, Islamic Republic Of",
                IQ: "Iraq",
                IE: "Ireland",
                IM: "Isle Of Man",
                IL: "Israel",
                IT: "Italy",
                JM: "Jamaica",
                JP: "Japan",
                JE: "Jersey",
                JO: "Jordan",
                KZ: "Kazakhstan",
                KE: "Kenya",
                KI: "Kiribati",
                KR: "Korea",
                KW: "Kuwait",
                KG: "Kyrgyzstan",
                LA: "Lao People's Democratic Republic",
                LV: "Latvia",
                LB: "Lebanon",
                LS: "Lesotho",
                LR: "Liberia",
                LY: "Libyan Arab Jamahiriya",
                LI: "Liechtenstein",
                LT: "Lithuania",
                LU: "Luxembourg",
                MO: "Macao",
                MK: "Macedonia",
                MG: "Madagascar",
                MW: "Malawi",
                MY: "Malaysia",
                MV: "Maldives",
                ML: "Mali",
                MT: "Malta",
                MH: "Marshall Islands",
                MQ: "Martinique",
                MR: "Mauritania",
                MU: "Mauritius",
                YT: "Mayotte",
                MX: "Mexico",
                FM: "Micronesia, Federated States Of",
                MD: "Moldova",
                MC: "Monaco",
                MN: "Mongolia",
                ME: "Montenegro",
                MS: "Montserrat",
                MA: "Morocco",
                MZ: "Mozambique",
                MM: "Myanmar",
                NA: "Namibia",
                NR: "Nauru",
                NP: "Nepal",
                NL: "Netherlands",
                AN: "Netherlands Antilles",
                NC: "New Caledonia",
                NZ: "New Zealand",
                NI: "Nicaragua",
                NE: "Niger",
                NG: "Nigeria",
                NU: "Niue",
                NF: "Norfolk Island",
                MP: "Northern Mariana Islands",
                NO: "Norway",
                OM: "Oman",
                PK: "Pakistan",
                PW: "Palau",
                PS: "Palestinian Territory, Occupied",
                PA: "Panama",
                PG: "Papua New Guinea",
                PY: "Paraguay",
                PE: "Peru",
                PH: "Philippines",
                PN: "Pitcairn",
                PL: "Poland",
                PT: "Portugal",
                PR: "Puerto Rico",
                QA: "Qatar",
                RE: "Reunion",
                RO: "Romania",
                RU: "Russian Federation",
                RW: "Rwanda",
                BL: "Saint Barthelemy",
                SH: "Saint Helena",
                KN: "Saint Kitts And Nevis",
                LC: "Saint Lucia",
                MF: "Saint Martin",
                PM: "Saint Pierre And Miquelon",
                VC: "Saint Vincent And Grenadines",
                WS: "Samoa",
                SM: "San Marino",
                ST: "Sao Tome And Principe",
                SA: "Saudi Arabia",
                SN: "Senegal",
                RS: "Serbia",
                SC: "Seychelles",
                SL: "Sierra Leone",
                SG: "Singapore",
                SK: "Slovakia",
                SI: "Slovenia",
                SB: "Solomon Islands",
                SO: "Somalia",
                ZA: "South Africa",
                GS: "South Georgia And Sandwich Isl.",
                ES: "Spain",
                LK: "Sri Lanka",
                SD: "Sudan",
                SR: "Suriname",
                SJ: "Svalbard And Jan Mayen",
                SZ: "Swaziland",
                SE: "Sweden",
                CH: "Switzerland",
                SY: "Syrian Arab Republic",
                TW: "Taiwan",
                TJ: "Tajikistan",
                TZ: "Tanzania",
                TH: "Thailand",
                TL: "Timor-Leste",
                TG: "Togo",
                TK: "Tokelau",
                TO: "Tonga",
                TT: "Trinidad And Tobago",
                TN: "Tunisia",
                TR: "Turkey",
                TM: "Turkmenistan",
                TC: "Turks And Caicos Islands",
                TV: "Tuvalu",
                UG: "Uganda",
                UA: "Ukraine",
                AE: "United Arab Emirates",
                GB: "United Kingdom",
                US: "United States",
                UM: "United States Outlying Islands",
                UY: "Uruguay",
                UZ: "Uzbekistan",
                VU: "Vanuatu",
                VE: "Venezuela",
                VN: "Viet Nam",
                VG: "Virgin Islands, British",
                VI: "Virgin Islands, U.S.",
                WF: "Wallis And Futuna",
                EH: "Western Sahara",
                YE: "Yemen",
                ZM: "Zambia",
                ZW: "Zimbabwe",
            }),
            (et = function (t) {
                return $e.hasOwnProperty(t) ? $e[t] : t;
            });
        let Ie, Oe, gt, ft, _t, mt, yt, W, K, qe, vt;
        (Ie = "heyetsy-card-container"),
            (Oe = {
                429: "#ea580c",
                401: "#dc2626",
                402: "#ca8a04",
                default: "#dc2626",
            }),
            (gt = {
                429: "#fed7aa",
                401: "#fecaca",
                402: "#fef08a",
                default: "#fecaca",
            }),
            (ft = {
                429: '<svg xmlns="http://www.w3.org/2000/svg" style="width: 2.5rem; height: 2.5rem;" viewBox="0 0 24 24" fill="none"><path d="M15.22 6.55H5.78c-.28 0-.54.01-.78.02-2.37.14-3 1.01-3 3.71v.58c0 .55.45 1 1 1h15c.55 0 1-.45 1-1v-.58c0-2.98-.76-3.73-3.78-3.73ZM3 13.36c-.55 0-1 .45-1 1v2.91C2 20.25 2.76 21 5.78 21h9.44c2.97 0 3.75-.72 3.78-3.57v-3.07c0-.55-.45-1-1-1H3Zm3.96 5.2H5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.72c.41 0 .75.34.75.75s-.34.75-.76.75Zm5.59 0H9.11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.44a.749.749 0 1 1 0 1.5Z" fill="#ea580c"></path><path d="M22.002 13.332v-5.24c0-3.13-1.79-4.49-4.49-4.49h-8.93c-.76 0-1.44.11-2.04.34-.47.17-.89.42-1.23.75-.18.17-.04.45.22.45h10.87c2.25 0 4.07 1.82 4.07 4.07v7.17c0 .25.27.39.45.21.69-.73 1.08-1.8 1.08-3.26Z" fill="#ea580c"></path></svg>',
                401: '<svg xmlns="http://www.w3.org/2000/svg" style="width: 2.5rem; height: 2.5rem;" viewBox="0 0 24 24" fill="none"><path d="M18.75 8v2.1c-.44-.06-.94-.09-1.5-.1V8c0-3.15-.89-5.25-5.25-5.25S6.75 4.85 6.75 8v2c-.56.01-1.06.04-1.5.1V8c0-2.9.7-6.75 6.75-6.75S18.75 5.1 18.75 8Z" fill="#dc2626"></path><path opacity=".4" d="M22 15v2c0 4-1 5-5 5H7c-4 0-5-1-5-5v-2c0-3.34.7-4.59 3.25-4.9.44-.06.94-.09 1.5-.1h10.5c.56.01 1.06.04 1.5.1C21.3 10.41 22 11.66 22 15Z" fill="#dc2626"></path><path d="M8 16.999c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.18-.19-.29-.45-.29-.71 0-.13.03-.26.08-.38s.12-.23.21-.33c.1-.09.2-.16.33-.21.37-.16.81-.07 1.09.21.09.1.16.21.21.33.05.12.08.25.08.38 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM12 17c-.27 0-.52-.11-.71-.29-.09-.1-.16-.21-.21-.33A.995.995 0 0 1 11 16c0-.27.11-.52.29-.71.37-.37 1.04-.37 1.42 0 .18.19.29.44.29.71 0 .13-.03.26-.08.38s-.12.23-.21.33c-.19.18-.45.29-.71.29ZM16 17c-.26 0-.52-.11-.71-.29-.18-.19-.29-.44-.29-.71 0-.27.11-.52.29-.71.38-.37 1.05-.37 1.42 0 .04.05.08.1.12.16.04.05.07.11.09.17.03.06.05.12.06.18.01.07.02.14.02.2 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29Z" fill="#dc2626"></path></svg>',
                402: '<svg xmlns="http://www.w3.org/2000/svg" style="width: 2.5rem; height: 2.5rem;" viewBox="0 0 24 24" fill="none"><path d="M15.22 6.55H5.78c-.28 0-.54.01-.78.02-2.37.14-3 1.01-3 3.71v.58c0 .55.45 1 1 1h15c.55 0 1-.45 1-1v-.58c0-2.98-.76-3.73-3.78-3.73ZM3 13.36c-.55 0-1 .45-1 1v2.91C2 20.25 2.76 21 5.78 21h9.44c2.97 0 3.75-.72 3.78-3.57v-3.07c0-.55-.45-1-1-1H3Zm3.96 5.2H5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.72c.41 0 .75.34.75.75s-.34.75-.76.75Zm5.59 0H9.11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.44a.749.749 0 1 1 0 1.5Z" fill="#ca8a04"></path><path d="M22.002 13.332v-5.24c0-3.13-1.79-4.49-4.49-4.49h-8.93c-.76 0-1.44.11-2.04.34-.47.17-.89.42-1.23.75-.18.17-.04.45.22.45h10.87c2.25 0 4.07 1.82 4.07 4.07v7.17c0 .25.27.39.45.21.69-.73 1.08-1.8 1.08-3.26Z" fill="#ca8a04"></path></svg>',
                default:
                    '<svg xmlns="http://www.w3.org/2000/svg" style="width: 2.5rem; height: 2.5rem;" viewBox="0 0 24 24" fill="none"><path opacity=".4" d="M21.76 15.92 15.36 4.4C14.5 2.85 13.31 2 12 2s-2.5.85-3.36 2.4l-6.4 11.52c-.81 1.47-.9 2.88-.25 3.99.65 1.11 1.93 1.72 3.61 1.72h12.8c1.68 0 2.96-.61 3.61-1.72.65-1.11.56-2.53-.25-3.99Z" fill="#dc2626"></path><path d="M12 14.75c-.41 0-.75-.34-.75-.75V9c0-.41.34-.75.75-.75s.75.34.75.75v5c0 .41-.34.75-.75.75ZM12 17.999c-.06 0-.13-.01-.2-.02a.636.636 0 0 1-.18-.06.757.757 0 0 1-.18-.09l-.15-.12c-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71l.15-.12c.06-.04.12-.07.18-.09.06-.03.12-.05.18-.06.13-.03.27-.03.39 0 .07.01.13.03.19.06.06.02.12.05.18.09l.15.12c.18.19.29.45.29.71 0 .26-.11.52-.29.71l-.15.12c-.06.04-.12.07-.18.09-.06.03-.12.05-.19.06-.06.01-.13.02-.19.02Z" fill="#dc2626"></path></svg>',
            }),
            (_t = {
                429: "Too many requests",
                401: "Invalid API key",
                402: "Payment required",
                default: "Oops! Something went wrong",
            }),
            (mt = {
                429: "Oops! You've reached the maximum number of requests.",
                401: "Oops! It seems like your API key is invalid.",
                402: "Hey there! <br> Please upgrade to the paid plan to use it.",
                default: "Oops! Something went wrong.",
            }),
            (yt = {
                429: `<a href="${ne}/pricing" target="_blank" style="font-weight: 700; text-decoration: underline; ">Upgrade</a>`,
                401: `<a href="${ne}/api-tokens" target="_blank" style="font-weight: 700; text-decoration: underline; ">Get licence</a>`,
                402: `<a href="${ne}/payment" target="_blank" style="font-weight: 700; text-decoration: underline; ">Upgrade</a>`,
                default: `<a href="${Vt}" target="_blank" style="font-weight: 700; text-decoration: underline; ">Contact us</a>`,
            }),
            (W = {
                VIEWS: "Views",
                FAVORITES: "Favorites",
                CREATED_AT: "Created",
                UPDATED_AT: "Updated",
                SIMILAR: "Similar",
                SHOP: "Shop",
                TAGS: "Tags",
                CATEGORIES: "Categories",
            }),
            (K = {
                VIEWS: "#e11d48",
                DAILY_VIEWS: "#e11d48",
                FAVORITES: "#2563eb",
                FAVORITES_RATE: "#ca8a04",
                CREATED_AT: "#0d9488",
                UPDATED_AT: "#0d9488",
                SIMILAR: "#0d9488",
                SHOP: "#0d9488",
                TAGS: "#0d9488",
            }),
            (qe = { CREATED_AT: "original_creation", UPDATED_AT: "last_modified" }),
            (vt = {
                CREATED_AT: "The listing was created.",
                UPDATED_AT: "When it is sold, renewed, or updated.",
            }),
            (Xt = (e, t = {}) => {
                t.textColor || ke;
                const r = t.backgroundColor || Se,
                    i = document.createElement("div");
                return (
                    (i.id = Ie),
                    (i.innerHTML = `
    <div style="padding-top: 16px; cursor: default; position: relative;">
        <div style="border-width: 2px; border-color: #e5e7eb;background-color: ${r};border-radius: 6px; padding: 16px;width: 100%;margin-left: auto;margin-right: auto;border-style: solid;">
            <div style="display: flex;" class="animate-pulse">
                <div style="padding-top: 0.25rem;padding-bottom: 0.25rem; flex: 1 1 0%; ">
                    <div style="background-color: #9ca3af; height: 1rem; border-radius: 0.375rem;"></div>
                    <div style="background-color: #9ca3af; height: 1rem; border-radius: 0.375rem; margin-top: 1rem;"></div>
                    <div style="background-color: #9ca3af; height: 1rem; border-radius: 0.375rem; margin-top: 1rem;"></div>
                    <div style="background-color: #9ca3af; height: 1rem; border-radius: 0.375rem; margin-top: 1rem;"></div>
                </div>
            </div>
        </div>
        <div style="position: absolute;right: 5px;top: 0;border-radius: 0.375rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #0d9488;">
            <p style="color: #fff;font-weight: 500;">
                ${Ee}
            </p>
        </div>
    </div>
    `),
                    i
                );
            }),
            (er = (e, t, r = {}) => {
                var c;
                let i = (r == null ? void 0 : r.textColor) || ke,
                    n = (r == null ? void 0 : r.backgroundColor) || Se;
                const s = (r == null ? void 0 : r.isHighlight) || !1;
                s &&
                    ((i = "#ffffff"),
                        (n = (r == null ? void 0 : r.highlightBackgroundColor) || Ht));
                const a = document.createElement("div");
                a.id = Ie;
                const u = Object.keys(W).map((d) => {
                    var h, _, l, g, f, b;
                    if (!t[qe[d]])
                        switch (d) {
                            case "VIEWS":
                                return `
                <div style="display: flex;justify-content: space-between;padding-top: 0.75rem;padding-bottom: 0.75rem;">
                    <dt style="color: ${i};">Views</dt>
                    <dd style="font-weight: bold;color: ${s ? i : K.VIEWS};">
                        <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem;">
                            <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                                This is the estimated average daily view.
                            </div>
                            <div>
                                ${t.daily_views} (Avg)
                            </div>
                        </div>
                    </dd>
                    <dd style="font-weight: bold;color: ${s ? i : K.VIEWS};">
                        <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem;">
                            <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                                Total views of the listing.
                            </div>
                            <div>
                                ${t.views}
                            </div>
                        </div>
                    </dd>
                </div>`;
                            case "FAVORITES":
                                return `
                <div style="display: flex;justify-content: space-between;padding-top: 0.75rem;padding-bottom: 0.75rem;">
                    <dt style="color: ${i};">Favorites</dt>
                    <dd style="font-weight: bold;color: ${s ? i : K.FAVORITES
                                    };">
                        <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem;">
                            <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                                This is the rate of favorites per 100 views.
                            </div>
                            <div>
                                ${t.hey}%
                            </div>
                        </div>
                    </dd>
                    <dd style="font-weight: bold;color: ${s ? i : K.FAVORITES
                                    };">
                        <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem;">
                            <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                                Total number of favorites for this listing.
                            </div>
                            <div>
                                ${t.num_favorers}
                            </div>
                        </div>
                    </dd>
                </div>`;
                            case "SIMILAR":
                                return (
                                    `
            <div style="display: flex;justify-content: space-between;padding-top: 0.75rem;padding-bottom: 0.75rem;align-items: center;">
                <dt style="color: ${i};"><a href="https://www.etsy.com/listing/${e}/similar" target="_blank" style="font-weight: bold;color: ${i} !important;">\u{1F449} View market products</a></dt>
                <dd style="font-weight: bold;color: ${i};">` +
                                    (((t == null ? void 0 : t.cr) || 0) > 0
                                        ? `<div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem;">
                        <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                            Estimated conversion rate of the listing.
                        </div>
                        <div style="display: flex;align-items: center;position: relative;border-radius: 0.375rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #d97706;color: white;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4" style="width: 16px;height: 16px;">
                            <path d="M12 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1ZM6.5 6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6ZM2 9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9Z" />
                            </svg>
                            <p style="margin-left: 0.25rem; font-weight: 500;color: white !important;">~${(t == null ? void 0 : t.cr) || 0
                                        }%</p>
                        </div>
                    </div>`
                                        : "") +
                                    `</dd>
            </div>`
                                );
                            case "SHOP":
                                const v = (t == null ? void 0 : t.shop_sold) || 0;
                                return (
                                    `
            <div style="display: flex;justify-content: space-between;padding-top: 0.75rem;padding-bottom: 0.75rem;align-items: center;">
                <dt style="display: flex;align-items: center;color: ${i};">
                ` +
                                    (t != null && t.shop_country
                                        ? `
                <div class="heyetsy-icon heyetsy-icon__danger" style="display: flex;align-items: center;margin: 0.25rem;">
                    <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                        Seller's country: ${et(
                                            t == null ? void 0 : t.shop_country
                                        )}
                    </div>
                    <img src="https://flagcdn.com/${(h = t == null ? void 0 : t.shop_country) == null
                                            ? void 0
                                            : h.toLowerCase()
                                        }.svg" style="height: 22px;margin-right: 0.5rem;border: 1px solid #e5e7eb;border-radius: 0.375rem;">
                </div>
                `
                                        : "") +
                                    `<a href="${Zt + "/r/s/" + t.u
                                    }" target="_blank" style="color: ${i} !important;font-weight: bold;">\u{1F449} Go to shop</a></dt>
                <dd style="font-weight: bold;color: ${i} !important;">
                    <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem; ${v > 0 ? "" : "display: none;"
                                    }">
                        <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                            Recent daily sales of the shop's items.
                        </div>
                        <div style="display: flex;align-items: center;position: relative;border-radius: 0.375rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #ef4444;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 20px;height: 20px; color: white">
                            <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                            <p style="margin-left: 0.25rem; font-weight: 500;color: white !important;">
                                ${v}+ Sold
                            </p>
                        </div>
                    </div>
                </dd>
            </div>`
                                );
                            case "TAGS":
                                if ((r == null ? void 0 : r.cardShowTags) === !1) return "";
                                const E =
                                    ((_ = t == null ? void 0 : t.tags) == null
                                        ? void 0
                                        : _.split(",").filter(Boolean)) || [];
                                if (E.length === 0)
                                    return `
            <div style="display: flex; flex-direction: column; justify-content: space-between;padding-top: 0.75rem;padding-bottom: 0.75rem;">
                <dt style="color: ${i}; padding-bottom: 0.5rem;">
                    <span>${W[d]}</span>
                </dt>
                <dd style="font-weight: bold;color: ${i} !important;">No tags found</dd>
            </div>`;
                                const S =
                                    (g =
                                        (l = t == null ? void 0 : t.tags) == null
                                            ? void 0
                                            : l.replace(/'/g, "\\'")) == null
                                        ? void 0
                                        : g.replace(/"/g, '\\"');
                                return `
            <div style="display: flex; flex-direction: column; justify-content: space-between;padding-top: 0.75rem;padding-bottom: 0.75rem;">
                <dt style="color: ${i}; padding-bottom: 0.5rem;">
                    <span>${W[d]}</span>
                    <button onClick="navigator.clipboard.writeText('${S}').then((e)=>{this.innerText = 'Copied!';setTimeout(()=>{this.innerText = 'Copy'}, 1000);}).catch((e)=>{this.innerText = 'Error!';setTimeout(()=>{this.innerText = 'Copy'}, 1000);})"
                        type="button" style="margin-left: 8px; padding: 4px 8px; border-radius: 4px; color: white; background-color: #0d9488; cursor: pointer;font-size: 12px; border: none; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);">
                    Copy
                    </button>
                    <a href="https://heyetsy.com/suggestions?tags=${S}" target="_blank" style="margin-left: 8px; padding: 4px 8px; border-radius: 4px; color: white !important; background-color: #2563eb; cursor: pointer;font-size: 12px; border: none; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);">
                        Suggestions
                    </a>
                </dt>
                <dd style="font-weight: bold;color: ${i} !important; padding-top: 0.5rem; padding-bottom: 0.5rem;">${E.map(
                                    ($) => `<a href="https://www.etsy.com/search?q=${$ == null ? void 0 : $.trim()
                                        }&ref=search_bar" target="_blank" style="text-decoration: none !important;text-transform: lowercase;display: inline-flex; align-items: center; gap: 0.5rem; margin: 2px; border-radius: 0.375rem; padding-left: 0.5rem; padding-right: 0.5rem; padding-top: 0.25rem; padding-bottom: 0.25rem; font-size: 11px; font-weight: 400; color: #1F2937 !important; border: 1px solid #E5E7EB; background-color: #FFFFFF;">
                    ${$ == null ? void 0 : $.trim()}
                </a>`
                                ).join("")}</dd>
            </div>`;
                            case "CATEGORIES":
                                return (r == null ? void 0 : r.cardShowCategories) === !1
                                    ? ""
                                    : `
                <div style="display: flex; flex-direction: column; justify-content: space-between;padding-top: 0.75rem;padding-bottom: 0.75rem;">
                    <dt style="color: ${i}; padding-bottom: 0.5rem;">
                        <span>${W[d]}</span>
                        <button onClick="navigator.clipboard.writeText('${(b =
                                        (f = t == null ? void 0 : t.categories) == null
                                            ? void 0
                                            : f.replace(/'/g, "\\'")) == null
                                        ? void 0
                                        : b.replace(/"/g, '\\"')
                                    }').then((e)=>{this.innerText = 'Copied!';setTimeout(()=>{this.innerText = 'Copy'}, 1000);}).catch((e)=>{this.innerText = 'Error!';setTimeout(()=>{this.innerText = 'Copy'}, 1000);})"
                          type="button" style="margin-left: 8px; padding: 4px 8px; border-radius: 4px; color: white; background-color: #0d9488; cursor: pointer;font-size: 12px; border: none; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);">
                    Copy
                    </button>
                    </dt>
                    <dd style="font-weight: bold;color: #0d9488 !important;padding-left: 10px;padding-right: 10px;padding-top: 5px;padding-bottom: 5px;background-color: #f1f5f9;border-radius: 6px;font-size: 11px;">${(t == null ? void 0 : t.categories) ||
                                    "No categories found"
                                    }</dd>
                </div>`;
                            default:
                                return `
            <div style="display: flex;justify-content: space-between;padding-top: 0.75rem;padding-bottom: 0.75rem;">
                <dt style="color: ${i};">${W[d]}</dt>
                <dd style="font-weight: bold;color: ${s ? i : K[d] || i
                                    };">0</dd>
            </div>`;
                        }
                    return `
    <div style="display: flex;justify-content: space-between;padding-top: 0.75rem;padding-bottom: 0.75rem;">
        <dt style="color: ${i};">${W[d]}</dt>
        <dd style="font-weight: bold;color: ${s ? i : K[d] || i};">
            <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem;">
                <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                    ${vt[d] || "N/A"}
                </div>
                <div>
                    ${t[qe[d]]}
                </div>
            </div>
        </dd>
    </div>`;
                });
                return (
                    (a.innerHTML = `
  <div style="padding-top: 1.25rem; cursor: default; position: relative;">
    <div style="font-size: 14px !important; font-weight: bold; border-style: solid; border-width: 2px; border-color: #e5e7eb;background-color: ${n}; border-radius: 0.375rem; padding: 1rem; width: 100%; margin-left: auto;margin-right: auto;border: 2px solid; border-color: transparent; box-shadow: 0 0 0 2px #e5e7eb, 0 0 0 4px ${n};">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); margin-top: 1rem;">
        <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem; ${t.sold > 0 ? "" : "display: none;"
                        }">
                <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                  Sold in the Last 24 Hours
                </div>
                <div style="display: flex;align-items: center;justify-content: center;position: relative;border-radius: 0.375rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #22c55e;">
                <svg xmlns="http://www.w3.org/2000/svg" style="width: 20px;height: 20px; color: white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
                  </svg>
                    <p style="margin-left: 0.25rem; font-weight: 500;color: white !important;">
                        ${t.sold}+ Sold
                    </p>
                  </div>
              </div>
        <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem; ${(t == null ? void 0 : t.views_24h) > 0 ? "" : "display: none;"
                        }">
              <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                Views in the Last 24 Hours
              </div>
              <div style="display: flex;align-items: center;justify-content: center;border-radius: 0.375rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #f97316;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 20px;height: 20px; color: white">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  <p style="margin-left: 0.25rem; font-weight: 500;color: white !important;">
                      ${(c = t == null ? void 0 : t.views_24h) == null
                            ? void 0
                            : c.toLocaleString()
                        }+ Views
                  </p>
                </div>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); margin-bottom: 1rem; ">
        <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem; ${t != null && t.total_sold ? "" : "display: none;"
                        }">
                <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                  Estimated Total Sales
                </div>
                <div style="display: flex;align-items: center;justify-content: center;position: relative;border-radius: 0.375rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #3b82f6;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 20px;height: 20px; color: white">
                    <path fill-rule="evenodd" d="M8.5 3.528v4.644c0 .729-.29 1.428-.805 1.944l-1.217 1.216a8.75 8.75 0 013.55.621l.502.201a7.25 7.25 0 004.178.365l-2.403-2.403a2.75 2.75 0 01-.805-1.944V3.528a40.205 40.205 0 00-3 0zm4.5.084l.19.015a.75.75 0 10.12-1.495 41.364 41.364 0 00-6.62 0 .75.75 0 00.12 1.495L7 3.612v4.56c0 .331-.132.649-.366.883L2.6 13.09c-1.496 1.496-.817 4.15 1.403 4.475C5.961 17.852 7.963 18 10 18s4.039-.148 5.997-.436c2.22-.325 2.9-2.979 1.403-4.475l-4.034-4.034A1.25 1.25 0 0113 8.172v-4.56z" clip-rule="evenodd" />
                </svg>
                    <p style="margin-left: 0.25rem; font-weight: 500;color: white !important;">
                        ${(t == null ? void 0 : t.total_sold) || 0}+ Sold
                    </p>
                  </div>
            </div>
            <div class="heyetsy-icon heyetsy-icon__danger" style="margin: 0.25rem; ${t != null && t.estimated_revenue ? "" : "display: none;"
                        }">
                <div class="heyetsy-tooltip heyetsy-tooltip__dang" style=" font-weight: 500;font-size: 1.125rem;">
                  Estimated Revenue
                </div>
                <div style="display: flex;align-items: center;justify-content: center;position: relative;border-radius: 0.375rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #a855f7;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 20px;height: 20px; color: white">
                    <path fill-rule="evenodd" d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z" clip-rule="evenodd" />
                </svg>
                    <p style="margin-left: 0.25rem; font-weight: 500;color: white !important;">
                        ${(t == null ? void 0 : t.estimated_revenue) || "N/A"}
                    </p>
                  </div>
            </div>
        </div>
        <dl class="divide-y-2 divide-gray-200" style="margin-bottom: 0px;">
            ${u.join("")}
        </dl>
    </div>
    <div style="position: absolute;right: 5px;top: 0;border-radius: 0.375rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #0d9488;">
        <p style="color: #fff;font-weight: 500;">
            ${Ee}
        </p>
    </div>
</div>`),
                    a
                );
            }),
            (rr = (e) => {
                let t = e.status || "default";
                const r = `
        <div style="display: flex; margin-left: auto;margin-right: auto; background-color: ${gt[t]}; justify-content: center; align-items: center; width: 5rem; height: 5rem; border-radius: 9999px; ">
                ${ft[t]}
            </div>
                <div style="line-height: 1.625; text-align: center; color: ${Oe[t]};">
                    <p style="font-weight: bold;">${_t[t]}</p>
                    <p>${mt[t]}</p>
                    ${yt[t]}
                </div>`,
                    i = document.createElement("div");
                return (
                    (i.innerHTML = `
    <div style="padding-top: 16px; cursor: default; position: relative;">
        <div style="font-size: 14px !important; border-style: solid; border-width: 2px; border-color: ${Oe[t]}; border-radius: 6px; padding: 16px; width: 100%; margin-left: auto;margin-right: auto;">
            <div style="display: flex; margin-top: 16px; color: #B45309; flex-direction: column; justify-content: center; align-items: center; ">
                ${r}
            </div>
        </div>
        <div style="position: absolute;right: 5px;top: 0;border-radius: 0.375rem;padding-top: 0.25rem;padding-bottom: 0.25rem;padding-left: 0.5rem;padding-right: 0.5rem;background-color: #0d9488;">
            <p style="color: #fff;font-weight: 500;">
                ${Ee}
            </p>
        </div>
    </div>`),
                    i
                );
            });
        var F = { DEBUG: !1, LIB_VERSION: "2.45.0" },
            C;
        if (typeof window > "u") {
            var bt = { hostname: "" };
            C = {
                navigator: { userAgent: "" },
                document: { location: bt, referrer: "" },
                screen: { width: 0, height: 0 },
                location: bt,
            };
        } else C = window;
        var ge = Array.prototype,
            _r = Function.prototype,
            wt = Object.prototype,
            J = ge.slice,
            ae = wt.toString,
            fe = wt.hasOwnProperty,
            A = C.console,
            R = C.navigator,
            x = C.document,
            ce = C.opera,
            _e = C.screen,
            q = R.userAgent,
            Be = _r.bind,
            xt = ge.forEach,
            kt = ge.indexOf,
            St = ge.map,
            mr = Array.isArray,
            De = {},
            o = {
                trim: function (e) {
                    return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                },
            },
            w = {
                log: function () {
                    if (F.DEBUG && !o.isUndefined(A) && A)
                        try {
                            A.log.apply(A, arguments);
                        } catch {
                            o.each(arguments, function (e) {
                                A.log(e);
                            });
                        }
                },
                warn: function () {
                    if (F.DEBUG && !o.isUndefined(A) && A) {
                        var e = ["Mixpanel warning:"].concat(o.toArray(arguments));
                        try {
                            A.warn.apply(A, e);
                        } catch {
                            o.each(e, function (t) {
                                A.warn(t);
                            });
                        }
                    }
                },
                error: function () {
                    if (F.DEBUG && !o.isUndefined(A) && A) {
                        var e = ["Mixpanel error:"].concat(o.toArray(arguments));
                        try {
                            A.error.apply(A, e);
                        } catch {
                            o.each(e, function (t) {
                                A.error(t);
                            });
                        }
                    }
                },
                critical: function () {
                    if (!o.isUndefined(A) && A) {
                        var e = ["Mixpanel error:"].concat(o.toArray(arguments));
                        try {
                            A.error.apply(A, e);
                        } catch {
                            o.each(e, function (t) {
                                A.error(t);
                            });
                        }
                    }
                },
            },
            Re = function (e, t) {
                return function () {
                    return (
                        (arguments[0] = "[" + t + "] " + arguments[0]),
                        e.apply(w, arguments)
                    );
                };
            },
            Ne = function (e) {
                return {
                    log: Re(w.log, e),
                    error: Re(w.error, e),
                    critical: Re(w.critical, e),
                };
            };
        (o.bind = function (e, t) {
            var r, i;
            if (Be && e.bind === Be) return Be.apply(e, J.call(arguments, 1));
            if (!o.isFunction(e)) throw new TypeError();
            return (
                (r = J.call(arguments, 2)),
                (i = function () {
                    if (!(this instanceof i))
                        return e.apply(t, r.concat(J.call(arguments)));
                    var n = {};
                    n.prototype = e.prototype;
                    var s = new n();
                    n.prototype = null;
                    var a = e.apply(s, r.concat(J.call(arguments)));
                    return Object(a) === a ? a : s;
                }),
                i
            );
        }),
            (o.each = function (e, t, r) {
                if (e != null) {
                    if (xt && e.forEach === xt) e.forEach(t, r);
                    else if (e.length === +e.length) {
                        for (var i = 0, n = e.length; i < n; i++)
                            if (i in e && t.call(r, e[i], i, e) === De) return;
                    } else
                        for (var s in e)
                            if (fe.call(e, s) && t.call(r, e[s], s, e) === De) return;
                }
            }),
            (o.extend = function (e) {
                return (
                    o.each(J.call(arguments, 1), function (t) {
                        for (var r in t) t[r] !== void 0 && (e[r] = t[r]);
                    }),
                    e
                );
            }),
            (o.isArray =
                mr ||
                function (e) {
                    return ae.call(e) === "[object Array]";
                }),
            (o.isFunction = function (e) {
                try {
                    return /^\s*\bfunction\b/.test(e);
                } catch {
                    return !1;
                }
            }),
            (o.isArguments = function (e) {
                return !!(e && fe.call(e, "callee"));
            }),
            (o.toArray = function (e) {
                return e
                    ? e.toArray
                        ? e.toArray()
                        : o.isArray(e) || o.isArguments(e)
                            ? J.call(e)
                            : o.values(e)
                    : [];
            }),
            (o.map = function (e, t, r) {
                if (St && e.map === St) return e.map(t, r);
                var i = [];
                return (
                    o.each(e, function (n) {
                        i.push(t.call(r, n));
                    }),
                    i
                );
            }),
            (o.keys = function (e) {
                var t = [];
                return (
                    e === null ||
                    o.each(e, function (r, i) {
                        t[t.length] = i;
                    }),
                    t
                );
            }),
            (o.values = function (e) {
                var t = [];
                return (
                    e === null ||
                    o.each(e, function (r) {
                        t[t.length] = r;
                    }),
                    t
                );
            }),
            (o.include = function (e, t) {
                var r = !1;
                return e === null
                    ? r
                    : kt && e.indexOf === kt
                        ? e.indexOf(t) != -1
                        : (o.each(e, function (i) {
                            if (r || (r = i === t)) return De;
                        }),
                            r);
            }),
            (o.includes = function (e, t) {
                return e.indexOf(t) !== -1;
            }),
            (o.inherit = function (e, t) {
                return (
                    (e.prototype = new t()),
                    (e.prototype.constructor = e),
                    (e.superclass = t.prototype),
                    e
                );
            }),
            (o.isObject = function (e) {
                return e === Object(e) && !o.isArray(e);
            }),
            (o.isEmptyObject = function (e) {
                if (o.isObject(e)) {
                    for (var t in e) if (fe.call(e, t)) return !1;
                    return !0;
                }
                return !1;
            }),
            (o.isUndefined = function (e) {
                return e === void 0;
            }),
            (o.isString = function (e) {
                return ae.call(e) == "[object String]";
            }),
            (o.isDate = function (e) {
                return ae.call(e) == "[object Date]";
            }),
            (o.isNumber = function (e) {
                return ae.call(e) == "[object Number]";
            }),
            (o.isElement = function (e) {
                return !!(e && e.nodeType === 1);
            }),
            (o.encodeDates = function (e) {
                return (
                    o.each(e, function (t, r) {
                        o.isDate(t)
                            ? (e[r] = o.formatDate(t))
                            : o.isObject(t) && (e[r] = o.encodeDates(t));
                    }),
                    e
                );
            }),
            (o.timestamp = function () {
                return (
                    (Date.now =
                        Date.now ||
                        function () {
                            return +new Date();
                        }),
                    Date.now()
                );
            }),
            (o.formatDate = function (e) {
                function t(r) {
                    return r < 10 ? "0" + r : r;
                }
                return (
                    e.getUTCFullYear() +
                    "-" +
                    t(e.getUTCMonth() + 1) +
                    "-" +
                    t(e.getUTCDate()) +
                    "T" +
                    t(e.getUTCHours()) +
                    ":" +
                    t(e.getUTCMinutes()) +
                    ":" +
                    t(e.getUTCSeconds())
                );
            }),
            (o.strip_empty_properties = function (e) {
                var t = {};
                return (
                    o.each(e, function (r, i) {
                        o.isString(r) && r.length > 0 && (t[i] = r);
                    }),
                    t
                );
            }),
            (o.truncate = function (e, t) {
                var r;
                return (
                    typeof e == "string"
                        ? (r = e.slice(0, t))
                        : o.isArray(e)
                            ? ((r = []),
                                o.each(e, function (i) {
                                    r.push(o.truncate(i, t));
                                }))
                            : o.isObject(e)
                                ? ((r = {}),
                                    o.each(e, function (i, n) {
                                        r[n] = o.truncate(i, t);
                                    }))
                                : (r = e),
                    r
                );
            }),
            (o.JSONEncode = (function () {
                return function (e) {
                    var t = e,
                        r = function (n) {
                            var s =
                                /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                                a = {
                                    "\b": "\\b",
                                    "	": "\\t",
                                    "\n": "\\n",
                                    "\f": "\\f",
                                    "\r": "\\r",
                                    '"': '\\"',
                                    "\\": "\\\\",
                                };
                            return (
                                (s.lastIndex = 0),
                                s.test(n)
                                    ? '"' +
                                    n.replace(s, function (u) {
                                        var c = a[u];
                                        return typeof c == "string"
                                            ? c
                                            : "\\u" +
                                            ("0000" + u.charCodeAt(0).toString(16)).slice(-4);
                                    }) +
                                    '"'
                                    : '"' + n + '"'
                            );
                        },
                        i = function (n, s) {
                            var a = "",
                                u = "    ",
                                c = 0,
                                d = "",
                                h = "",
                                _ = 0,
                                l = a,
                                g = [],
                                f = s[n];
                            switch (
                            (f &&
                                typeof f == "object" &&
                                typeof f.toJSON == "function" &&
                                (f = f.toJSON(n)),
                                typeof f)
                            ) {
                                case "string":
                                    return r(f);
                                case "number":
                                    return isFinite(f) ? String(f) : "null";
                                case "boolean":
                                case "null":
                                    return String(f);
                                case "object":
                                    if (!f) return "null";
                                    if (((a += u), (g = []), ae.apply(f) === "[object Array]")) {
                                        for (_ = f.length, c = 0; c < _; c += 1)
                                            g[c] = i(c, f) || "null";
                                        return (
                                            (h =
                                                g.length === 0
                                                    ? "[]"
                                                    : a
                                                        ? `[
` +
                                                        a +
                                                        g.join(
                                                            `,
` + a
                                                        ) +
                                                        `
` +
                                                        l +
                                                        "]"
                                                        : "[" + g.join(",") + "]"),
                                            (a = l),
                                            h
                                        );
                                    }
                                    for (d in f)
                                        fe.call(f, d) &&
                                            ((h = i(d, f)), h && g.push(r(d) + (a ? ": " : ":") + h));
                                    return (
                                        (h =
                                            g.length === 0
                                                ? "{}"
                                                : a
                                                    ? "{" + g.join(",") + l + "}"
                                                    : "{" + g.join(",") + "}"),
                                        (a = l),
                                        h
                                    );
                            }
                        };
                    return i("", { "": t });
                };
            })()),
            (o.JSONDecode = (function () {
                var e,
                    t,
                    r = {
                        '"': '"',
                        "\\": "\\",
                        "/": "/",
                        b: "\b",
                        f: "\f",
                        n: `
`,
                        r: "\r",
                        t: "	",
                    },
                    i,
                    n = function (g) {
                        var f = new SyntaxError(g);
                        throw ((f.at = e), (f.text = i), f);
                    },
                    s = function (g) {
                        return (
                            g && g !== t && n("Expected '" + g + "' instead of '" + t + "'"),
                            (t = i.charAt(e)),
                            (e += 1),
                            t
                        );
                    },
                    a = function () {
                        var g,
                            f = "";
                        for (t === "-" && ((f = "-"), s("-")); t >= "0" && t <= "9";)
                            (f += t), s();
                        if (t === ".") for (f += "."; s() && t >= "0" && t <= "9";) f += t;
                        if (t === "e" || t === "E")
                            for (
                                f += t, s(), (t === "-" || t === "+") && ((f += t), s());
                                t >= "0" && t <= "9";

                            )
                                (f += t), s();
                        if (((g = +f), !isFinite(g))) n("Bad number");
                        else return g;
                    },
                    u = function () {
                        var g,
                            f,
                            b = "",
                            v;
                        if (t === '"')
                            for (; s();) {
                                if (t === '"') return s(), b;
                                if (t === "\\")
                                    if ((s(), t === "u")) {
                                        for (
                                            v = 0, f = 0;
                                            f < 4 && ((g = parseInt(s(), 16)), !!isFinite(g));
                                            f += 1
                                        )
                                            v = v * 16 + g;
                                        b += String.fromCharCode(v);
                                    } else if (typeof r[t] == "string") b += r[t];
                                    else break;
                                else b += t;
                            }
                        n("Bad string");
                    },
                    c = function () {
                        for (; t && t <= " ";) s();
                    },
                    d = function () {
                        switch (t) {
                            case "t":
                                return s("t"), s("r"), s("u"), s("e"), !0;
                            case "f":
                                return s("f"), s("a"), s("l"), s("s"), s("e"), !1;
                            case "n":
                                return s("n"), s("u"), s("l"), s("l"), null;
                        }
                        n('Unexpected "' + t + '"');
                    },
                    h,
                    _ = function () {
                        var g = [];
                        if (t === "[") {
                            if ((s("["), c(), t === "]")) return s("]"), g;
                            for (; t;) {
                                if ((g.push(h()), c(), t === "]")) return s("]"), g;
                                s(","), c();
                            }
                        }
                        n("Bad array");
                    },
                    l = function () {
                        var g,
                            f = {};
                        if (t === "{") {
                            if ((s("{"), c(), t === "}")) return s("}"), f;
                            for (; t;) {
                                if (
                                    ((g = u()),
                                        c(),
                                        s(":"),
                                        Object.hasOwnProperty.call(f, g) &&
                                        n('Duplicate key "' + g + '"'),
                                        (f[g] = h()),
                                        c(),
                                        t === "}")
                                )
                                    return s("}"), f;
                                s(","), c();
                            }
                        }
                        n("Bad object");
                    };
                return (
                    (h = function () {
                        switch ((c(), t)) {
                            case "{":
                                return l();
                            case "[":
                                return _();
                            case '"':
                                return u();
                            case "-":
                                return a();
                            default:
                                return t >= "0" && t <= "9" ? a() : d();
                        }
                    }),
                    function (g) {
                        var f;
                        return (
                            (i = g),
                            (e = 0),
                            (t = " "),
                            (f = h()),
                            c(),
                            t && n("Syntax error"),
                            f
                        );
                    }
                );
            })()),
            (o.base64Encode = function (e) {
                var t =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    r,
                    i,
                    n,
                    s,
                    a,
                    u,
                    c,
                    d,
                    h = 0,
                    _ = 0,
                    l = "",
                    g = [];
                if (!e) return e;
                e = o.utf8Encode(e);
                do
                    (r = e.charCodeAt(h++)),
                        (i = e.charCodeAt(h++)),
                        (n = e.charCodeAt(h++)),
                        (d = (r << 16) | (i << 8) | n),
                        (s = (d >> 18) & 63),
                        (a = (d >> 12) & 63),
                        (u = (d >> 6) & 63),
                        (c = d & 63),
                        (g[_++] = t.charAt(s) + t.charAt(a) + t.charAt(u) + t.charAt(c));
                while (h < e.length);
                switch (((l = g.join("")), e.length % 3)) {
                    case 1:
                        l = l.slice(0, -2) + "==";
                        break;
                    case 2:
                        l = l.slice(0, -1) + "=";
                        break;
                }
                return l;
            }),
            (o.utf8Encode = function (e) {
                e = (e + "")
                    .replace(
                        /\r\n/g,
                        `
`
                    )
                    .replace(
                        /\r/g,
                        `
`
                    );
                var t = "",
                    r,
                    i,
                    n = 0,
                    s;
                for (r = i = 0, n = e.length, s = 0; s < n; s++) {
                    var a = e.charCodeAt(s),
                        u = null;
                    a < 128
                        ? i++
                        : a > 127 && a < 2048
                            ? (u = String.fromCharCode((a >> 6) | 192, (a & 63) | 128))
                            : (u = String.fromCharCode(
                                (a >> 12) | 224,
                                ((a >> 6) & 63) | 128,
                                (a & 63) | 128
                            )),
                        u !== null &&
                        (i > r && (t += e.substring(r, i)), (t += u), (r = i = s + 1));
                }
                return i > r && (t += e.substring(r, e.length)), t;
            }),
            (o.UUID = (function () {
                var e = function () {
                    for (var i = 1 * new Date(), n = 0; i == 1 * new Date();) n++;
                    return i.toString(16) + n.toString(16);
                },
                    t = function () {
                        return Math.random().toString(16).replace(".", "");
                    },
                    r = function () {
                        var i = q,
                            n,
                            s,
                            a = [],
                            u = 0;
                        function c(d, h) {
                            var _,
                                l = 0;
                            for (_ = 0; _ < h.length; _++) l |= a[_] << (_ * 8);
                            return d ^ l;
                        }
                        for (n = 0; n < i.length; n++)
                            (s = i.charCodeAt(n)),
                                a.unshift(s & 255),
                                a.length >= 4 && ((u = c(u, a)), (a = []));
                        return a.length > 0 && (u = c(u, a)), u.toString(16);
                    };
                return function () {
                    var i = (_e.height * _e.width).toString(16);
                    return e() + "-" + t() + "-" + r() + "-" + i + "-" + e();
                };
            })());
        var Et = [
            "ahrefsbot",
            "baiduspider",
            "bingbot",
            "bingpreview",
            "facebookexternal",
            "petalbot",
            "pinterest",
            "screaming frog",
            "yahoo! slurp",
            "yandexbot",
            "adsbot-google",
            "apis-google",
            "duplexweb-google",
            "feedfetcher-google",
            "google favicon",
            "google web preview",
            "google-read-aloud",
            "googlebot",
            "googleweblight",
            "mediapartners-google",
            "storebot-google",
        ];
        (o.isBlockedUA = function (e) {
            var t;
            for (e = e.toLowerCase(), t = 0; t < Et.length; t++)
                if (e.indexOf(Et[t]) !== -1) return !0;
            return !1;
        }),
            (o.HTTPBuildQuery = function (e, t) {
                var r,
                    i,
                    n = [];
                return (
                    o.isUndefined(t) && (t = "&"),
                    o.each(e, function (s, a) {
                        (r = encodeURIComponent(s.toString())),
                            (i = encodeURIComponent(a)),
                            (n[n.length] = i + "=" + r);
                    }),
                    n.join(t)
                );
            }),
            (o.getQueryParam = function (e, t) {
                t = t.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
                var r = "[\\?&]" + t + "=([^&#]*)",
                    i = new RegExp(r),
                    n = i.exec(e);
                if (n === null || (n && typeof n[1] != "string" && n[1].length))
                    return "";
                var s = n[1];
                try {
                    s = decodeURIComponent(s);
                } catch {
                    w.error("Skipping decoding for malformed query param: " + s);
                }
                return s.replace(/\+/g, " ");
            }),
            (o.cookie = {
                get: function (e) {
                    for (
                        var t = e + "=", r = x.cookie.split(";"), i = 0;
                        i < r.length;
                        i++
                    ) {
                        for (var n = r[i]; n.charAt(0) == " ";)
                            n = n.substring(1, n.length);
                        if (n.indexOf(t) === 0)
                            return decodeURIComponent(n.substring(t.length, n.length));
                    }
                    return null;
                },
                parse: function (e) {
                    var t;
                    try {
                        t = o.JSONDecode(o.cookie.get(e)) || {};
                    } catch { }
                    return t;
                },
                set_seconds: function (e, t, r, i, n, s, a) {
                    var u = "",
                        c = "",
                        d = "";
                    if (a) u = "; domain=" + a;
                    else if (i) {
                        var h = Tt(x.location.hostname);
                        u = h ? "; domain=." + h : "";
                    }
                    if (r) {
                        var _ = new Date();
                        _.setTime(_.getTime() + r * 1e3),
                            (c = "; expires=" + _.toGMTString());
                    }
                    s && ((n = !0), (d = "; SameSite=None")),
                        n && (d += "; secure"),
                        (x.cookie =
                            e + "=" + encodeURIComponent(t) + c + "; path=/" + u + d);
                },
                set: function (e, t, r, i, n, s, a) {
                    var u = "",
                        c = "",
                        d = "";
                    if (a) u = "; domain=" + a;
                    else if (i) {
                        var h = Tt(x.location.hostname);
                        u = h ? "; domain=." + h : "";
                    }
                    if (r) {
                        var _ = new Date();
                        _.setTime(_.getTime() + r * 24 * 60 * 60 * 1e3),
                            (c = "; expires=" + _.toGMTString());
                    }
                    s && ((n = !0), (d = "; SameSite=None")), n && (d += "; secure");
                    var l = e + "=" + encodeURIComponent(t) + c + "; path=/" + u + d;
                    return (x.cookie = l), l;
                },
                remove: function (e, t, r) {
                    o.cookie.set(e, "", -1, t, !1, !1, r);
                },
            });
        var Pe = null,
            me = function (e, t) {
                if (Pe !== null && !t) return Pe;
                var r = !0;
                try {
                    e = e || window.localStorage;
                    var i = "__mplss_" + Ue(8),
                        n = "xyz";
                    e.setItem(i, n), e.getItem(i) !== n && (r = !1), e.removeItem(i);
                } catch {
                    r = !1;
                }
                return (Pe = r), r;
            };
        (o.localStorage = {
            is_supported: function (e) {
                var t = me(null, e);
                return (
                    t ||
                    w.error("localStorage unsupported; falling back to cookie store"),
                    t
                );
            },
            error: function (e) {
                w.error("localStorage error: " + e);
            },
            get: function (e) {
                try {
                    return window.localStorage.getItem(e);
                } catch (t) {
                    o.localStorage.error(t);
                }
                return null;
            },
            parse: function (e) {
                try {
                    return o.JSONDecode(o.localStorage.get(e)) || {};
                } catch { }
                return null;
            },
            set: function (e, t) {
                try {
                    window.localStorage.setItem(e, t);
                } catch (r) {
                    o.localStorage.error(r);
                }
            },
            remove: function (e) {
                try {
                    window.localStorage.removeItem(e);
                } catch (t) {
                    o.localStorage.error(t);
                }
            },
        }),
            (o.register_event = (function () {
                var e = function (i, n, s, a, u) {
                    if (!i) {
                        w.error("No valid element provided to register_event");
                        return;
                    }
                    if (i.addEventListener && !a) i.addEventListener(n, s, !!u);
                    else {
                        var c = "on" + n,
                            d = i[c];
                        i[c] = t(i, s, d);
                    }
                };
                function t(i, n, s) {
                    var a = function (u) {
                        if (((u = u || r(window.event)), !!u)) {
                            var c = !0,
                                d,
                                h;
                            return (
                                o.isFunction(s) && (d = s(u)),
                                (h = n.call(i, u)),
                                (d === !1 || h === !1) && (c = !1),
                                c
                            );
                        }
                    };
                    return a;
                }
                function r(i) {
                    return (
                        i &&
                        ((i.preventDefault = r.preventDefault),
                            (i.stopPropagation = r.stopPropagation)),
                        i
                    );
                }
                return (
                    (r.preventDefault = function () {
                        this.returnValue = !1;
                    }),
                    (r.stopPropagation = function () {
                        this.cancelBubble = !0;
                    }),
                    e
                );
            })());
        var yr = new RegExp(
            '^(\\w*)\\[(\\w+)([=~\\|\\^\\$\\*]?)=?"?([^\\]"]*)"?\\]$'
        );
        (o.dom_query = (function () {
            function e(n) {
                return n.all ? n.all : n.getElementsByTagName("*");
            }
            var t = /[\t\r\n]/g;
            function r(n, s) {
                var a = " " + s + " ";
                return (" " + n.className + " ").replace(t, " ").indexOf(a) >= 0;
            }
            function i(n) {
                if (!x.getElementsByTagName) return [];
                var s = n.split(" "),
                    a,
                    u,
                    c,
                    d,
                    h,
                    _,
                    l,
                    g,
                    f,
                    b,
                    v = [x];
                for (_ = 0; _ < s.length; _++) {
                    if (
                        ((a = s[_].replace(/^\s+/, "").replace(/\s+$/, "")),
                            a.indexOf("#") > -1)
                    ) {
                        (u = a.split("#")), (c = u[0]);
                        var E = u[1],
                            S = x.getElementById(E);
                        if (!S || (c && S.nodeName.toLowerCase() != c)) return [];
                        v = [S];
                        continue;
                    }
                    if (a.indexOf(".") > -1) {
                        (u = a.split(".")), (c = u[0]);
                        var $ = u[1];
                        for (c || (c = "*"), d = [], h = 0, l = 0; l < v.length; l++)
                            for (
                                c == "*" ? (f = e(v[l])) : (f = v[l].getElementsByTagName(c)),
                                g = 0;
                                g < f.length;
                                g++
                            )
                                d[h++] = f[g];
                        for (v = [], b = 0, l = 0; l < d.length; l++)
                            d[l].className &&
                                o.isString(d[l].className) &&
                                r(d[l], $) &&
                                (v[b++] = d[l]);
                        continue;
                    }
                    var he = a.match(yr);
                    if (he) {
                        c = he[1];
                        var L = he[2],
                            Fr = he[3],
                            X = he[4];
                        for (c || (c = "*"), d = [], h = 0, l = 0; l < v.length; l++)
                            for (
                                c == "*" ? (f = e(v[l])) : (f = v[l].getElementsByTagName(c)),
                                g = 0;
                                g < f.length;
                                g++
                            )
                                d[h++] = f[g];
                        (v = []), (b = 0);
                        var G;
                        switch (Fr) {
                            case "=":
                                G = function (I) {
                                    return I.getAttribute(L) == X;
                                };
                                break;
                            case "~":
                                G = function (I) {
                                    return I.getAttribute(L).match(new RegExp("\\b" + X + "\\b"));
                                };
                                break;
                            case "|":
                                G = function (I) {
                                    return I.getAttribute(L).match(new RegExp("^" + X + "-?"));
                                };
                                break;
                            case "^":
                                G = function (I) {
                                    return I.getAttribute(L).indexOf(X) === 0;
                                };
                                break;
                            case "$":
                                G = function (I) {
                                    return (
                                        I.getAttribute(L).lastIndexOf(X) ==
                                        I.getAttribute(L).length - X.length
                                    );
                                };
                                break;
                            case "*":
                                G = function (I) {
                                    return I.getAttribute(L).indexOf(X) > -1;
                                };
                                break;
                            default:
                                G = function (I) {
                                    return I.getAttribute(L);
                                };
                        }
                        for (v = [], b = 0, l = 0; l < d.length; l++)
                            G(d[l]) && (v[b++] = d[l]);
                        continue;
                    }
                    for (c = a, d = [], h = 0, l = 0; l < v.length; l++)
                        for (f = v[l].getElementsByTagName(c), g = 0; g < f.length; g++)
                            d[h++] = f[g];
                    v = d;
                }
                return v;
            }
            return function (n) {
                return o.isElement(n)
                    ? [n]
                    : o.isObject(n) && !o.isUndefined(n.length)
                        ? n
                        : i.call(this, n);
            };
        })()),
            (o.info = {
                campaignParams: function () {
                    var e =
                        "utm_source utm_medium utm_campaign utm_content utm_term".split(
                            " "
                        ),
                        t = "",
                        r = {};
                    return (
                        o.each(e, function (i) {
                            (t = o.getQueryParam(x.URL, i)), t.length && (r[i] = t);
                        }),
                        r
                    );
                },
                searchEngine: function (e) {
                    return e.search("https?://(.*)google.([^/?]*)") === 0
                        ? "google"
                        : e.search("https?://(.*)bing.com") === 0
                            ? "bing"
                            : e.search("https?://(.*)yahoo.com") === 0
                                ? "yahoo"
                                : e.search("https?://(.*)duckduckgo.com") === 0
                                    ? "duckduckgo"
                                    : null;
                },
                searchInfo: function (e) {
                    var t = o.info.searchEngine(e),
                        r = t != "yahoo" ? "q" : "p",
                        i = {};
                    if (t !== null) {
                        i.$search_engine = t;
                        var n = o.getQueryParam(e, r);
                        n.length && (i.mp_keyword = n);
                    }
                    return i;
                },
                browser: function (e, t, r) {
                    return (
                        (t = t || ""),
                        r || o.includes(e, " OPR/")
                            ? o.includes(e, "Mini")
                                ? "Opera Mini"
                                : "Opera"
                            : /(BlackBerry|PlayBook|BB10)/i.test(e)
                                ? "BlackBerry"
                                : o.includes(e, "IEMobile") || o.includes(e, "WPDesktop")
                                    ? "Internet Explorer Mobile"
                                    : o.includes(e, "SamsungBrowser/")
                                        ? "Samsung Internet"
                                        : o.includes(e, "Edge") || o.includes(e, "Edg/")
                                            ? "Microsoft Edge"
                                            : o.includes(e, "FBIOS")
                                                ? "Facebook Mobile"
                                                : o.includes(e, "Chrome")
                                                    ? "Chrome"
                                                    : o.includes(e, "CriOS")
                                                        ? "Chrome iOS"
                                                        : o.includes(e, "UCWEB") || o.includes(e, "UCBrowser")
                                                            ? "UC Browser"
                                                            : o.includes(e, "FxiOS")
                                                                ? "Firefox iOS"
                                                                : o.includes(t, "Apple")
                                                                    ? o.includes(e, "Mobile")
                                                                        ? "Mobile Safari"
                                                                        : "Safari"
                                                                    : o.includes(e, "Android")
                                                                        ? "Android Mobile"
                                                                        : o.includes(e, "Konqueror")
                                                                            ? "Konqueror"
                                                                            : o.includes(e, "Firefox")
                                                                                ? "Firefox"
                                                                                : o.includes(e, "MSIE") || o.includes(e, "Trident/")
                                                                                    ? "Internet Explorer"
                                                                                    : o.includes(e, "Gecko")
                                                                                        ? "Mozilla"
                                                                                        : ""
                    );
                },
                browserVersion: function (e, t, r) {
                    var i = o.info.browser(e, t, r),
                        n = {
                            "Internet Explorer Mobile": /rv:(\d+(\.\d+)?)/,
                            "Microsoft Edge": /Edge?\/(\d+(\.\d+)?)/,
                            Chrome: /Chrome\/(\d+(\.\d+)?)/,
                            "Chrome iOS": /CriOS\/(\d+(\.\d+)?)/,
                            "UC Browser": /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
                            Safari: /Version\/(\d+(\.\d+)?)/,
                            "Mobile Safari": /Version\/(\d+(\.\d+)?)/,
                            Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
                            Firefox: /Firefox\/(\d+(\.\d+)?)/,
                            "Firefox iOS": /FxiOS\/(\d+(\.\d+)?)/,
                            Konqueror: /Konqueror:(\d+(\.\d+)?)/,
                            BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
                            "Android Mobile": /android\s(\d+(\.\d+)?)/,
                            "Samsung Internet": /SamsungBrowser\/(\d+(\.\d+)?)/,
                            "Internet Explorer": /(rv:|MSIE )(\d+(\.\d+)?)/,
                            Mozilla: /rv:(\d+(\.\d+)?)/,
                        },
                        s = n[i];
                    if (s === void 0) return null;
                    var a = e.match(s);
                    return a ? parseFloat(a[a.length - 2]) : null;
                },
                os: function () {
                    var e = q;
                    return /Windows/i.test(e)
                        ? /Phone/.test(e) || /WPDesktop/.test(e)
                            ? "Windows Phone"
                            : "Windows"
                        : /(iPhone|iPad|iPod)/.test(e)
                            ? "iOS"
                            : /Android/.test(e)
                                ? "Android"
                                : /(BlackBerry|PlayBook|BB10)/i.test(e)
                                    ? "BlackBerry"
                                    : /Mac/i.test(e)
                                        ? "Mac OS X"
                                        : /Linux/.test(e)
                                            ? "Linux"
                                            : /CrOS/.test(e)
                                                ? "Chrome OS"
                                                : "";
                },
                device: function (e) {
                    return /Windows Phone/i.test(e) || /WPDesktop/.test(e)
                        ? "Windows Phone"
                        : /iPad/.test(e)
                            ? "iPad"
                            : /iPod/.test(e)
                                ? "iPod Touch"
                                : /iPhone/.test(e)
                                    ? "iPhone"
                                    : /(BlackBerry|PlayBook|BB10)/i.test(e)
                                        ? "BlackBerry"
                                        : /Android/.test(e)
                                            ? "Android"
                                            : "";
                },
                referringDomain: function (e) {
                    var t = e.split("/");
                    return t.length >= 3 ? t[2] : "";
                },
                properties: function () {
                    return o.extend(
                        o.strip_empty_properties({
                            $os: o.info.os(),
                            $browser: o.info.browser(q, R.vendor, ce),
                            $referrer: x.referrer,
                            $referring_domain: o.info.referringDomain(x.referrer),
                            $device: o.info.device(q),
                        }),
                        {
                            $current_url: C.location.href,
                            $browser_version: o.info.browserVersion(q, R.vendor, ce),
                            $screen_height: _e.height,
                            $screen_width: _e.width,
                            mp_lib: "web",
                            $lib_version: F.LIB_VERSION,
                            $insert_id: Ue(),
                            time: o.timestamp() / 1e3,
                        }
                    );
                },
                people_properties: function () {
                    return o.extend(
                        o.strip_empty_properties({
                            $os: o.info.os(),
                            $browser: o.info.browser(q, R.vendor, ce),
                        }),
                        { $browser_version: o.info.browserVersion(q, R.vendor, ce) }
                    );
                },
                pageviewInfo: function (e) {
                    return o.strip_empty_properties({
                        mp_page: e,
                        mp_referrer: x.referrer,
                        mp_browser: o.info.browser(q, R.vendor, ce),
                        mp_platform: o.info.os(),
                    });
                },
            });
        var Ue = function (e) {
            var t =
                Math.random().toString(36).substring(2, 10) +
                Math.random().toString(36).substring(2, 10);
            return e ? t.substring(0, e) : t;
        },
            vr = /[a-z0-9][a-z0-9-]*\.[a-z]+$/i,
            br = /[a-z0-9][a-z0-9-]+\.[a-z.]{2,6}$/i,
            Tt = function (e) {
                var t = br,
                    r = e.split("."),
                    i = r[r.length - 1];
                (i.length > 4 || i === "com" || i === "org") && (t = vr);
                var n = e.match(t);
                return n ? n[0] : "";
            },
            ye = null,
            ve = null;
        typeof JSON < "u" && ((ye = JSON.stringify), (ve = JSON.parse)),
            (ye = ye || o.JSONEncode),
            (ve = ve || o.JSONDecode),
            (o.toArray = o.toArray),
            (o.isObject = o.isObject),
            (o.JSONEncode = o.JSONEncode),
            (o.JSONDecode = o.JSONDecode),
            (o.isBlockedUA = o.isBlockedUA),
            (o.isEmptyObject = o.isEmptyObject),
            (o.info = o.info),
            (o.info.device = o.info.device),
            (o.info.browser = o.info.browser),
            (o.info.browserVersion = o.info.browserVersion),
            (o.info.properties = o.info.properties);
        var N = function () { };
        (N.prototype.create_properties = function () { }),
            (N.prototype.event_handler = function () { }),
            (N.prototype.after_track_handler = function () { }),
            (N.prototype.init = function (e) {
                return (this.mp = e), this;
            }),
            (N.prototype.track = function (e, t, r, i) {
                var n = this,
                    s = o.dom_query(e);
                if (s.length === 0) {
                    w.error("The DOM query (" + e + ") returned 0 elements");
                    return;
                }
                return (
                    o.each(
                        s,
                        function (a) {
                            o.register_event(a, this.override_event, function (u) {
                                var c = {},
                                    d = n.create_properties(r, this),
                                    h = n.mp.get_config("track_links_timeout");
                                n.event_handler(u, this, c),
                                    window.setTimeout(n.track_callback(i, d, c, !0), h),
                                    n.mp.track(t, d, n.track_callback(i, d, c));
                            });
                        },
                        this
                    ),
                    !0
                );
            }),
            (N.prototype.track_callback = function (e, t, r, i) {
                i = i || !1;
                var n = this;
                return function () {
                    r.callback_fired ||
                        ((r.callback_fired = !0),
                            !(e && e(i, t) === !1) && n.after_track_handler(t, r, i));
                };
            }),
            (N.prototype.create_properties = function (e, t) {
                var r;
                return typeof e == "function" ? (r = e(t)) : (r = o.extend({}, e)), r;
            });
        var ee = function () {
            this.override_event = "click";
        };
        o.inherit(ee, N),
            (ee.prototype.create_properties = function (e, t) {
                var r = ee.superclass.create_properties.apply(this, arguments);
                return t.href && (r.url = t.href), r;
            }),
            (ee.prototype.event_handler = function (e, t, r) {
                (r.new_tab =
                    e.which === 2 || e.metaKey || e.ctrlKey || t.target === "_blank"),
                    (r.href = t.href),
                    r.new_tab || e.preventDefault();
            }),
            (ee.prototype.after_track_handler = function (e, t) {
                t.new_tab ||
                    setTimeout(function () {
                        window.location = t.href;
                    }, 0);
            });
        var be = function () {
            this.override_event = "submit";
        };
        o.inherit(be, N),
            (be.prototype.event_handler = function (e, t, r) {
                (r.element = t), e.preventDefault();
            }),
            (be.prototype.after_track_handler = function (e, t) {
                setTimeout(function () {
                    t.element.submit();
                }, 0);
            });
        var wr = Ne("lock"),
            At = function (e, t) {
                (t = t || {}),
                    (this.storageKey = e),
                    (this.storage = t.storage || window.localStorage),
                    (this.pollIntervalMS = t.pollIntervalMS || 100),
                    (this.timeoutMS = t.timeoutMS || 2e3);
            };
        At.prototype.withLock = function (e, t, r) {
            !r && typeof t != "function" && ((r = t), (t = null));
            var i = r || new Date().getTime() + "|" + Math.random(),
                n = new Date().getTime(),
                s = this.storageKey,
                a = this.pollIntervalMS,
                u = this.timeoutMS,
                c = this.storage,
                d = s + ":X",
                h = s + ":Y",
                _ = s + ":Z",
                l = function (S) {
                    t && t(S);
                },
                g = function (S) {
                    if (new Date().getTime() - n > u) {
                        wr.error(
                            "Timeout waiting for mutex on " +
                            s +
                            "; clearing lock. [" +
                            i +
                            "]"
                        ),
                            c.removeItem(_),
                            c.removeItem(h),
                            v();
                        return;
                    }
                    setTimeout(function () {
                        try {
                            S();
                        } catch ($) {
                            l($);
                        }
                    }, a * (Math.random() + 0.1));
                },
                f = function (S, $) {
                    S()
                        ? $()
                        : g(function () {
                            f(S, $);
                        });
                },
                b = function () {
                    var S = c.getItem(h);
                    if (S && S !== i) return !1;
                    if ((c.setItem(h, i), c.getItem(h) === i)) return !0;
                    if (!me(c, !0))
                        throw new Error(
                            "localStorage support dropped while acquiring lock"
                        );
                    return !1;
                },
                v = function () {
                    c.setItem(d, i),
                        f(b, function () {
                            if (c.getItem(d) === i) {
                                E();
                                return;
                            }
                            g(function () {
                                if (c.getItem(h) !== i) {
                                    v();
                                    return;
                                }
                                f(function () {
                                    return !c.getItem(_);
                                }, E);
                            });
                        });
                },
                E = function () {
                    c.setItem(_, "1");
                    try {
                        e();
                    } finally {
                        c.removeItem(_),
                            c.getItem(h) === i && c.removeItem(h),
                            c.getItem(d) === i && c.removeItem(d);
                    }
                };
            try {
                if (me(c, !0)) v();
                else throw new Error("localStorage support check failed");
            } catch (S) {
                l(S);
            }
        };
        var Ct = Ne("batch"),
            H = function (e, t) {
                (t = t || {}),
                    (this.storageKey = e),
                    (this.storage = t.storage || window.localStorage),
                    (this.reportError = t.errorReporter || o.bind(Ct.error, Ct)),
                    (this.lock = new At(e, { storage: this.storage })),
                    (this.pid = t.pid || null),
                    (this.memQueue = []);
            };
        (H.prototype.enqueue = function (e, t, r) {
            var i = {
                id: Ue(),
                flushAfter: new Date().getTime() + t * 2,
                payload: e,
            };
            this.lock.withLock(
                o.bind(function () {
                    var n;
                    try {
                        var s = this.readFromStorage();
                        s.push(i), (n = this.saveToStorage(s)), n && this.memQueue.push(i);
                    } catch {
                        this.reportError("Error enqueueing item", e), (n = !1);
                    }
                    r && r(n);
                }, this),
                o.bind(function (n) {
                    this.reportError("Error acquiring storage lock", n), r && r(!1);
                }, this),
                this.pid
            );
        }),
            (H.prototype.fillBatch = function (e) {
                var t = this.memQueue.slice(0, e);
                if (t.length < e) {
                    var r = this.readFromStorage();
                    if (r.length) {
                        var i = {};
                        o.each(t, function (a) {
                            i[a.id] = !0;
                        });
                        for (var n = 0; n < r.length; n++) {
                            var s = r[n];
                            if (
                                new Date().getTime() > s.flushAfter &&
                                !i[s.id] &&
                                ((s.orphaned = !0), t.push(s), t.length >= e)
                            )
                                break;
                        }
                    }
                }
                return t;
            });
        var Mt = function (e, t) {
            var r = [];
            return (
                o.each(e, function (i) {
                    i.id && !t[i.id] && r.push(i);
                }),
                r
            );
        };
        H.prototype.removeItemsByID = function (e, t) {
            var r = {};
            o.each(e, function (n) {
                r[n] = !0;
            }),
                (this.memQueue = Mt(this.memQueue, r));
            var i = o.bind(function () {
                var n;
                try {
                    var s = this.readFromStorage();
                    if (((s = Mt(s, r)), (n = this.saveToStorage(s)), n)) {
                        s = this.readFromStorage();
                        for (var a = 0; a < s.length; a++) {
                            var u = s[a];
                            if (u.id && !!r[u.id])
                                return this.reportError("Item not removed from storage"), !1;
                        }
                    }
                } catch {
                    this.reportError("Error removing items", e), (n = !1);
                }
                return n;
            }, this);
            this.lock.withLock(
                function () {
                    var n = i();
                    t && t(n);
                },
                o.bind(function (n) {
                    var s = !1;
                    if (
                        (this.reportError("Error acquiring storage lock", n),
                            !me(this.storage, !0) && ((s = i()), !s))
                    )
                        try {
                            this.storage.removeItem(this.storageKey);
                        } catch (a) {
                            this.reportError("Error clearing queue", a);
                        }
                    t && t(s);
                }, this),
                this.pid
            );
        };
        var $t = function (e, t) {
            var r = [];
            return (
                o.each(e, function (i) {
                    var n = i.id;
                    if (n in t) {
                        var s = t[n];
                        s !== null && ((i.payload = s), r.push(i));
                    } else r.push(i);
                }),
                r
            );
        };
        (H.prototype.updatePayloads = function (e, t) {
            (this.memQueue = $t(this.memQueue, e)),
                this.lock.withLock(
                    o.bind(function () {
                        var r;
                        try {
                            var i = this.readFromStorage();
                            (i = $t(i, e)), (r = this.saveToStorage(i));
                        } catch {
                            this.reportError("Error updating items", e), (r = !1);
                        }
                        t && t(r);
                    }, this),
                    o.bind(function (r) {
                        this.reportError("Error acquiring storage lock", r), t && t(!1);
                    }, this),
                    this.pid
                );
        }),
            (H.prototype.readFromStorage = function () {
                var e;
                try {
                    (e = this.storage.getItem(this.storageKey)),
                        e &&
                        ((e = ve(e)),
                            o.isArray(e) ||
                            (this.reportError("Invalid storage entry:", e), (e = null)));
                } catch (t) {
                    this.reportError("Error retrieving queue", t), (e = null);
                }
                return e || [];
            }),
            (H.prototype.saveToStorage = function (e) {
                try {
                    return this.storage.setItem(this.storageKey, ye(e)), !0;
                } catch (t) {
                    return this.reportError("Error saving queue", t), !1;
                }
            }),
            (H.prototype.clear = function () {
                (this.memQueue = []), this.storage.removeItem(this.storageKey);
            });
        var xr = 10 * 60 * 1e3,
            pe = Ne("batch"),
            D = function (e, t) {
                (this.errorReporter = t.errorReporter),
                    (this.queue = new H(e, {
                        errorReporter: o.bind(this.reportError, this),
                        storage: t.storage,
                    })),
                    (this.libConfig = t.libConfig),
                    (this.sendRequest = t.sendRequestFunc),
                    (this.beforeSendHook = t.beforeSendHook),
                    (this.stopAllBatching = t.stopAllBatchingFunc),
                    (this.batchSize = this.libConfig.batch_size),
                    (this.flushInterval = this.libConfig.batch_flush_interval_ms),
                    (this.stopped = !this.libConfig.batch_autostart),
                    (this.consecutiveRemovalFailures = 0);
            };
        (D.prototype.enqueue = function (e, t) {
            this.queue.enqueue(e, this.flushInterval, t);
        }),
            (D.prototype.start = function () {
                (this.stopped = !1),
                    (this.consecutiveRemovalFailures = 0),
                    this.flush();
            }),
            (D.prototype.stop = function () {
                (this.stopped = !0),
                    this.timeoutID &&
                    (clearTimeout(this.timeoutID), (this.timeoutID = null));
            }),
            (D.prototype.clear = function () {
                this.queue.clear();
            }),
            (D.prototype.resetBatchSize = function () {
                this.batchSize = this.libConfig.batch_size;
            }),
            (D.prototype.resetFlush = function () {
                this.scheduleFlush(this.libConfig.batch_flush_interval_ms);
            }),
            (D.prototype.scheduleFlush = function (e) {
                (this.flushInterval = e),
                    this.stopped ||
                    (this.timeoutID = setTimeout(
                        o.bind(this.flush, this),
                        this.flushInterval
                    ));
            }),
            (D.prototype.flush = function (e) {
                try {
                    if (this.requestInProgress) {
                        pe.log("Flush: Request already in progress");
                        return;
                    }
                    e = e || {};
                    var t = this.libConfig.batch_request_timeout_ms,
                        r = new Date().getTime(),
                        i = this.batchSize,
                        n = this.queue.fillBatch(i),
                        s = [],
                        a = {};
                    if (
                        (o.each(
                            n,
                            function (d) {
                                var h = d.payload;
                                this.beforeSendHook &&
                                    !d.orphaned &&
                                    (h = this.beforeSendHook(h)),
                                    h && s.push(h),
                                    (a[d.id] = h);
                            },
                            this
                        ),
                            s.length < 1)
                    ) {
                        this.resetFlush();
                        return;
                    }
                    this.requestInProgress = !0;
                    var u = o.bind(function (d) {
                        this.requestInProgress = !1;
                        try {
                            var h = !1;
                            if (e.unloading) this.queue.updatePayloads(a);
                            else if (
                                o.isObject(d) &&
                                d.error === "timeout" &&
                                new Date().getTime() - r >= t
                            )
                                this.reportError("Network timeout; retrying"), this.flush();
                            else if (
                                o.isObject(d) &&
                                d.xhr_req &&
                                (d.xhr_req.status >= 500 ||
                                    d.xhr_req.status === 429 ||
                                    d.error === "timeout")
                            ) {
                                var _ = this.flushInterval * 2,
                                    l = d.xhr_req.responseHeaders;
                                if (l) {
                                    var g = l["Retry-After"];
                                    g && (_ = parseInt(g, 10) * 1e3 || _);
                                }
                                (_ = Math.min(xr, _)),
                                    this.reportError("Error; retry in " + _ + " ms"),
                                    this.scheduleFlush(_);
                            } else if (
                                o.isObject(d) &&
                                d.xhr_req &&
                                d.xhr_req.status === 413
                            )
                                if (n.length > 1) {
                                    var f = Math.max(1, Math.floor(i / 2));
                                    (this.batchSize = Math.min(
                                        this.batchSize,
                                        f,
                                        n.length - 1
                                    )),
                                        this.reportError(
                                            "413 response; reducing batch size to " + this.batchSize
                                        ),
                                        this.resetFlush();
                                } else
                                    this.reportError(
                                        "Single-event request too large; dropping",
                                        n
                                    ),
                                        this.resetBatchSize(),
                                        (h = !0);
                            else h = !0;
                            h &&
                                this.queue.removeItemsByID(
                                    o.map(n, function (b) {
                                        return b.id;
                                    }),
                                    o.bind(function (b) {
                                        b
                                            ? ((this.consecutiveRemovalFailures = 0), this.flush())
                                            : (this.reportError(
                                                "Failed to remove items from queue"
                                            ),
                                                ++this.consecutiveRemovalFailures > 5
                                                    ? (this.reportError(
                                                        "Too many queue failures; disabling batching system."
                                                    ),
                                                        this.stopAllBatching())
                                                    : this.resetFlush());
                                    }, this)
                                );
                        } catch (b) {
                            this.reportError("Error handling API response", b),
                                this.resetFlush();
                        }
                    }, this),
                        c = {
                            method: "POST",
                            verbose: !0,
                            ignore_json_errors: !0,
                            timeout_ms: t,
                        };
                    e.unloading && (c.transport = "sendBeacon"),
                        pe.log("MIXPANEL REQUEST:", s),
                        this.sendRequest(s, c, u);
                } catch (d) {
                    this.reportError("Error flushing request queue", d),
                        this.resetFlush();
                }
            }),
            (D.prototype.reportError = function (e, t) {
                if ((pe.error.apply(pe.error, arguments), this.errorReporter))
                    try {
                        t instanceof Error || (t = new Error(e)), this.errorReporter(e, t);
                    } catch (r) {
                        pe.error(r);
                    }
            });
        var kr = "__mp_opt_in_out_";
        function Sr(e, t) {
            qt(!0, e, t);
        }
        function Er(e, t) {
            qt(!1, e, t);
        }
        function Tr(e, t) {
            return Ot(e, t) === "1";
        }
        function It(e, t) {
            if (Cr(t))
                return (
                    w.warn(
                        'This browser has "Do Not Track" enabled. This will prevent the Mixpanel SDK from sending any data. To ignore the "Do Not Track" browser setting, initialize the Mixpanel instance with the config "ignore_dnt: true"'
                    ),
                    !0
                );
            var r = Ot(e, t) === "0";
            return (
                r &&
                w.warn(
                    "You are opted out of Mixpanel tracking. This will prevent the Mixpanel SDK from sending any data."
                ),
                r
            );
        }
        function de(e) {
            return Ve(e, function (t) {
                return this.get_config(t);
            });
        }
        function V(e) {
            return Ve(e, function (t) {
                return this._get_config(t);
            });
        }
        function te(e) {
            return Ve(e, function (t) {
                return this._get_config(t);
            });
        }
        function Ar(e, t) {
            (t = t || {}),
                Fe(t).remove(He(e, t), !!t.crossSubdomainCookie, t.cookieDomain);
        }
        function Fe(e) {
            return (
                (e = e || {}),
                e.persistenceType === "localStorage" ? o.localStorage : o.cookie
            );
        }
        function He(e, t) {
            return (t = t || {}), (t.persistencePrefix || kr) + e;
        }
        function Ot(e, t) {
            return Fe(t).get(He(e, t));
        }
        function Cr(e) {
            if (e && e.ignoreDnt) return !1;
            var t = (e && e.window) || C,
                r = t.navigator || {},
                i = !1;
            return (
                o.each([r.doNotTrack, r.msDoNotTrack, t.doNotTrack], function (n) {
                    o.includes([!0, 1, "1", "yes"], n) && (i = !0);
                }),
                i
            );
        }
        function qt(e, t, r) {
            if (!o.isString(t) || !t.length) {
                w.error(
                    "gdpr." + (e ? "optIn" : "optOut") + " called with an invalid token"
                );
                return;
            }
            (r = r || {}),
                Fe(r).set(
                    He(t, r),
                    e ? 1 : 0,
                    o.isNumber(r.cookieExpiration) ? r.cookieExpiration : null,
                    !!r.crossSubdomainCookie,
                    !!r.secureCookie,
                    !!r.crossSiteCookie,
                    r.cookieDomain
                ),
                r.track &&
                e &&
                r.track(r.trackEventName || "$opt_in", r.trackProperties, {
                    send_immediately: !0,
                });
        }
        function Ve(e, t) {
            return function () {
                var r = !1;
                try {
                    var i = t.call(this, "token"),
                        n = t.call(this, "ignore_dnt"),
                        s = t.call(this, "opt_out_tracking_persistence_type"),
                        a = t.call(this, "opt_out_tracking_cookie_prefix"),
                        u = t.call(this, "window");
                    i &&
                        (r = It(i, {
                            ignoreDnt: n,
                            persistenceType: s,
                            persistencePrefix: a,
                            window: u,
                        }));
                } catch (d) {
                    w.error(
                        "Unexpected error when checking tracking opt-out status: " + d
                    );
                }
                if (!r) return e.apply(this, arguments);
                var c = arguments[arguments.length - 1];
                typeof c == "function" && c(0);
            };
        }
        var Z = "$set",
            re = "$set_once",
            B = "$unset",
            Y = "$add",
            P = "$append",
            Q = "$union",
            z = "$remove",
            Mr = "$delete",
            Bt = {
                set_action: function (e, t) {
                    var r = {},
                        i = {};
                    return (
                        o.isObject(e)
                            ? o.each(
                                e,
                                function (n, s) {
                                    this._is_reserved_property(s) || (i[s] = n);
                                },
                                this
                            )
                            : (i[e] = t),
                        (r[Z] = i),
                        r
                    );
                },
                unset_action: function (e) {
                    var t = {},
                        r = [];
                    return (
                        o.isArray(e) || (e = [e]),
                        o.each(
                            e,
                            function (i) {
                                this._is_reserved_property(i) || r.push(i);
                            },
                            this
                        ),
                        (t[B] = r),
                        t
                    );
                },
                set_once_action: function (e, t) {
                    var r = {},
                        i = {};
                    return (
                        o.isObject(e)
                            ? o.each(
                                e,
                                function (n, s) {
                                    this._is_reserved_property(s) || (i[s] = n);
                                },
                                this
                            )
                            : (i[e] = t),
                        (r[re] = i),
                        r
                    );
                },
                union_action: function (e, t) {
                    var r = {},
                        i = {};
                    return (
                        o.isObject(e)
                            ? o.each(
                                e,
                                function (n, s) {
                                    this._is_reserved_property(s) ||
                                        (i[s] = o.isArray(n) ? n : [n]);
                                },
                                this
                            )
                            : (i[e] = o.isArray(t) ? t : [t]),
                        (r[Q] = i),
                        r
                    );
                },
                append_action: function (e, t) {
                    var r = {},
                        i = {};
                    return (
                        o.isObject(e)
                            ? o.each(
                                e,
                                function (n, s) {
                                    this._is_reserved_property(s) || (i[s] = n);
                                },
                                this
                            )
                            : (i[e] = t),
                        (r[P] = i),
                        r
                    );
                },
                remove_action: function (e, t) {
                    var r = {},
                        i = {};
                    return (
                        o.isObject(e)
                            ? o.each(
                                e,
                                function (n, s) {
                                    this._is_reserved_property(s) || (i[s] = n);
                                },
                                this
                            )
                            : (i[e] = t),
                        (r[z] = i),
                        r
                    );
                },
                delete_action: function () {
                    var e = {};
                    return (e[Mr] = ""), e;
                },
            },
            k = function () { };
        o.extend(k.prototype, Bt),
            (k.prototype._init = function (e, t, r) {
                (this._mixpanel = e), (this._group_key = t), (this._group_id = r);
            }),
            (k.prototype.set = te(function (e, t, r) {
                var i = this.set_action(e, t);
                return o.isObject(e) && (r = t), this._send_request(i, r);
            })),
            (k.prototype.set_once = te(function (e, t, r) {
                var i = this.set_once_action(e, t);
                return o.isObject(e) && (r = t), this._send_request(i, r);
            })),
            (k.prototype.unset = te(function (e, t) {
                var r = this.unset_action(e);
                return this._send_request(r, t);
            })),
            (k.prototype.union = te(function (e, t, r) {
                o.isObject(e) && (r = t);
                var i = this.union_action(e, t);
                return this._send_request(i, r);
            })),
            (k.prototype.delete = te(function (e) {
                var t = this.delete_action();
                return this._send_request(t, e);
            })),
            (k.prototype.remove = te(function (e, t, r) {
                var i = this.remove_action(e, t);
                return this._send_request(i, r);
            })),
            (k.prototype._send_request = function (e, t) {
                (e.$group_key = this._group_key),
                    (e.$group_id = this._group_id),
                    (e.$token = this._get_config("token"));
                var r = o.encodeDates(e);
                return this._mixpanel._track_or_batch(
                    {
                        type: "groups",
                        data: r,
                        endpoint: this._get_config("api_host") + "/groups/",
                        batcher: this._mixpanel.request_batchers.groups,
                    },
                    t
                );
            }),
            (k.prototype._is_reserved_property = function (e) {
                return e === "$group_key" || e === "$group_id";
            }),
            (k.prototype._get_config = function (e) {
                return this._mixpanel.get_config(e);
            }),
            (k.prototype.toString = function () {
                return (
                    this._mixpanel.toString() +
                    ".group." +
                    this._group_key +
                    "." +
                    this._group_id
                );
            }),
            (k.prototype.remove = k.prototype.remove),
            (k.prototype.set = k.prototype.set),
            (k.prototype.set_once = k.prototype.set_once),
            (k.prototype.union = k.prototype.union),
            (k.prototype.unset = k.prototype.unset),
            (k.prototype.toString = k.prototype.toString);
        var m = function () { };
        o.extend(m.prototype, Bt),
            (m.prototype._init = function (e) {
                this._mixpanel = e;
            }),
            (m.prototype.set = V(function (e, t, r) {
                var i = this.set_action(e, t);
                return (
                    o.isObject(e) && (r = t),
                    this._get_config("save_referrer") &&
                    this._mixpanel.persistence.update_referrer_info(document.referrer),
                    (i[Z] = o.extend(
                        {},
                        o.info.people_properties(),
                        this._mixpanel.persistence.get_referrer_info(),
                        i[Z]
                    )),
                    this._send_request(i, r)
                );
            })),
            (m.prototype.set_once = V(function (e, t, r) {
                var i = this.set_once_action(e, t);
                return o.isObject(e) && (r = t), this._send_request(i, r);
            })),
            (m.prototype.unset = V(function (e, t) {
                var r = this.unset_action(e);
                return this._send_request(r, t);
            })),
            (m.prototype.increment = V(function (e, t, r) {
                var i = {},
                    n = {};
                return (
                    o.isObject(e)
                        ? (o.each(
                            e,
                            function (s, a) {
                                if (!this._is_reserved_property(a))
                                    if (isNaN(parseFloat(s))) {
                                        w.error(
                                            "Invalid increment value passed to mixpanel.people.increment - must be a number"
                                        );
                                        return;
                                    } else n[a] = s;
                            },
                            this
                        ),
                            (r = t))
                        : (o.isUndefined(t) && (t = 1), (n[e] = t)),
                    (i[Y] = n),
                    this._send_request(i, r)
                );
            })),
            (m.prototype.append = V(function (e, t, r) {
                o.isObject(e) && (r = t);
                var i = this.append_action(e, t);
                return this._send_request(i, r);
            })),
            (m.prototype.remove = V(function (e, t, r) {
                o.isObject(e) && (r = t);
                var i = this.remove_action(e, t);
                return this._send_request(i, r);
            })),
            (m.prototype.union = V(function (e, t, r) {
                o.isObject(e) && (r = t);
                var i = this.union_action(e, t);
                return this._send_request(i, r);
            })),
            (m.prototype.track_charge = V(function (e, t, r) {
                if (!o.isNumber(e) && ((e = parseFloat(e)), isNaN(e))) {
                    w.error(
                        "Invalid value passed to mixpanel.people.track_charge - must be a number"
                    );
                    return;
                }
                return this.append("$transactions", o.extend({ $amount: e }, t), r);
            })),
            (m.prototype.clear_charges = function (e) {
                return this.set("$transactions", [], e);
            }),
            (m.prototype.delete_user = function () {
                if (!this._identify_called()) {
                    w.error(
                        "mixpanel.people.delete_user() requires you to call identify() first"
                    );
                    return;
                }
                var e = { $delete: this._mixpanel.get_distinct_id() };
                return this._send_request(e);
            }),
            (m.prototype.toString = function () {
                return this._mixpanel.toString() + ".people";
            }),
            (m.prototype._send_request = function (e, t) {
                (e.$token = this._get_config("token")),
                    (e.$distinct_id = this._mixpanel.get_distinct_id());
                var r = this._mixpanel.get_property("$device_id"),
                    i = this._mixpanel.get_property("$user_id"),
                    n = this._mixpanel.get_property("$had_persisted_distinct_id");
                r && (e.$device_id = r),
                    i && (e.$user_id = i),
                    n && (e.$had_persisted_distinct_id = n);
                var s = o.encodeDates(e);
                return this._identify_called()
                    ? this._mixpanel._track_or_batch(
                        {
                            type: "people",
                            data: s,
                            endpoint: this._get_config("api_host") + "/engage/",
                            batcher: this._mixpanel.request_batchers.people,
                        },
                        t
                    )
                    : (this._enqueue(e),
                        o.isUndefined(t) ||
                        (this._get_config("verbose")
                            ? t({ status: -1, error: null })
                            : t(-1)),
                        o.truncate(s, 255));
            }),
            (m.prototype._get_config = function (e) {
                return this._mixpanel.get_config(e);
            }),
            (m.prototype._identify_called = function () {
                return this._mixpanel._flags.identify_called === !0;
            }),
            (m.prototype._enqueue = function (e) {
                Z in e
                    ? this._mixpanel.persistence._add_to_people_queue(Z, e)
                    : re in e
                        ? this._mixpanel.persistence._add_to_people_queue(re, e)
                        : B in e
                            ? this._mixpanel.persistence._add_to_people_queue(B, e)
                            : Y in e
                                ? this._mixpanel.persistence._add_to_people_queue(Y, e)
                                : P in e
                                    ? this._mixpanel.persistence._add_to_people_queue(P, e)
                                    : z in e
                                        ? this._mixpanel.persistence._add_to_people_queue(z, e)
                                        : Q in e
                                            ? this._mixpanel.persistence._add_to_people_queue(Q, e)
                                            : w.error("Invalid call to _enqueue():", e);
            }),
            (m.prototype._flush_one_queue = function (e, t, r, i) {
                var n = this,
                    s = o.extend({}, this._mixpanel.persistence._get_queue(e)),
                    a = s;
                !o.isUndefined(s) &&
                    o.isObject(s) &&
                    !o.isEmptyObject(s) &&
                    (n._mixpanel.persistence._pop_from_people_queue(e, s),
                        i && (a = i(s)),
                        t.call(n, a, function (u, c) {
                            u === 0 && n._mixpanel.persistence._add_to_people_queue(e, s),
                                o.isUndefined(r) || r(u, c);
                        }));
            }),
            (m.prototype._flush = function (e, t, r, i, n, s, a) {
                var u = this,
                    c = this._mixpanel.persistence._get_queue(P),
                    d = this._mixpanel.persistence._get_queue(z);
                if (
                    (this._flush_one_queue(Z, this.set, e),
                        this._flush_one_queue(re, this.set_once, i),
                        this._flush_one_queue(B, this.unset, s, function (v) {
                            return o.keys(v);
                        }),
                        this._flush_one_queue(Y, this.increment, t),
                        this._flush_one_queue(Q, this.union, n),
                        !o.isUndefined(c) && o.isArray(c) && c.length)
                ) {
                    for (
                        var h,
                        _ = function (v, E) {
                            v === 0 && u._mixpanel.persistence._add_to_people_queue(P, h),
                                o.isUndefined(r) || r(v, E);
                        },
                        l = c.length - 1;
                        l >= 0;
                        l--
                    )
                        (h = c.pop()), o.isEmptyObject(h) || u.append(h, _);
                    u._mixpanel.persistence.save();
                }
                if (!o.isUndefined(d) && o.isArray(d) && d.length) {
                    for (
                        var g,
                        f = function (v, E) {
                            v === 0 && u._mixpanel.persistence._add_to_people_queue(z, g),
                                o.isUndefined(a) || a(v, E);
                        },
                        b = d.length - 1;
                        b >= 0;
                        b--
                    )
                        (g = d.pop()), o.isEmptyObject(g) || u.remove(g, f);
                    u._mixpanel.persistence.save();
                }
            }),
            (m.prototype._is_reserved_property = function (e) {
                return (
                    e === "$distinct_id" ||
                    e === "$token" ||
                    e === "$device_id" ||
                    e === "$user_id" ||
                    e === "$had_persisted_distinct_id"
                );
            }),
            (m.prototype.set = m.prototype.set),
            (m.prototype.set_once = m.prototype.set_once),
            (m.prototype.unset = m.prototype.unset),
            (m.prototype.increment = m.prototype.increment),
            (m.prototype.append = m.prototype.append),
            (m.prototype.remove = m.prototype.remove),
            (m.prototype.union = m.prototype.union),
            (m.prototype.track_charge = m.prototype.track_charge),
            (m.prototype.clear_charges = m.prototype.clear_charges),
            (m.prototype.delete_user = m.prototype.delete_user),
            (m.prototype.toString = m.prototype.toString);
        var Ze = "__mps",
            ze = "__mpso",
            Le = "__mpus",
            Ge = "__mpa",
            je = "__mpap",
            We = "__mpr",
            Ke = "__mpu",
            Dt = "$people_distinct_id",
            we = "__alias",
            le = "__timers",
            $r = [Ze, ze, Le, Ge, je, We, Ke, Dt, we, le],
            y = function (e) {
                (this.props = {}),
                    (this.campaign_params_saved = !1),
                    e.persistence_name
                        ? (this.name = "mp_" + e.persistence_name)
                        : (this.name = "mp_" + e.token + "_mixpanel");
                var t = e.persistence;
                t !== "cookie" &&
                    t !== "localStorage" &&
                    (w.critical(
                        "Unknown persistence type " + t + "; falling back to cookie"
                    ),
                        (t = e.persistence = "cookie")),
                    t === "localStorage" && o.localStorage.is_supported()
                        ? (this.storage = o.localStorage)
                        : (this.storage = o.cookie),
                    this.load(),
                    this.update_config(e),
                    this.upgrade(e),
                    this.save();
            };
        (y.prototype.properties = function () {
            var e = {};
            return (
                o.each(this.props, function (t, r) {
                    o.include($r, r) || (e[r] = t);
                }),
                e
            );
        }),
            (y.prototype.load = function () {
                if (!this.disabled) {
                    var e = this.storage.parse(this.name);
                    e && (this.props = o.extend({}, e));
                }
            }),
            (y.prototype.upgrade = function (e) {
                var t = e.upgrade,
                    r,
                    i;
                t &&
                    ((r = "mp_super_properties"),
                        typeof t == "string" && (r = t),
                        (i = this.storage.parse(r)),
                        this.storage.remove(r),
                        this.storage.remove(r, !0),
                        i && (this.props = o.extend(this.props, i.all, i.events))),
                    !e.cookie_name &&
                    e.name !== "mixpanel" &&
                    ((r = "mp_" + e.token + "_" + e.name),
                        (i = this.storage.parse(r)),
                        i &&
                        (this.storage.remove(r),
                            this.storage.remove(r, !0),
                            this.register_once(i))),
                    this.storage === o.localStorage &&
                    ((i = o.cookie.parse(this.name)),
                        o.cookie.remove(this.name),
                        o.cookie.remove(this.name, !0),
                        i && this.register_once(i));
            }),
            (y.prototype.save = function () {
                this.disabled ||
                    this.storage.set(
                        this.name,
                        o.JSONEncode(this.props),
                        this.expire_days,
                        this.cross_subdomain,
                        this.secure,
                        this.cross_site,
                        this.cookie_domain
                    );
            }),
            (y.prototype.remove = function () {
                this.storage.remove(this.name, !1, this.cookie_domain),
                    this.storage.remove(this.name, !0, this.cookie_domain);
            }),
            (y.prototype.clear = function () {
                this.remove(), (this.props = {});
            }),
            (y.prototype.register_once = function (e, t, r) {
                return o.isObject(e)
                    ? (typeof t > "u" && (t = "None"),
                        (this.expire_days = typeof r > "u" ? this.default_expiry : r),
                        o.each(
                            e,
                            function (i, n) {
                                (!this.props.hasOwnProperty(n) || this.props[n] === t) &&
                                    (this.props[n] = i);
                            },
                            this
                        ),
                        this.save(),
                        !0)
                    : !1;
            }),
            (y.prototype.register = function (e, t) {
                return o.isObject(e)
                    ? ((this.expire_days = typeof t > "u" ? this.default_expiry : t),
                        o.extend(this.props, e),
                        this.save(),
                        !0)
                    : !1;
            }),
            (y.prototype.unregister = function (e) {
                e in this.props && (delete this.props[e], this.save());
            }),
            (y.prototype.update_campaign_params = function () {
                this.campaign_params_saved ||
                    (this.register_once(o.info.campaignParams()),
                        (this.campaign_params_saved = !0));
            }),
            (y.prototype.update_search_keyword = function (e) {
                this.register(o.info.searchInfo(e));
            }),
            (y.prototype.update_referrer_info = function (e) {
                this.register_once(
                    {
                        $initial_referrer: e || "$direct",
                        $initial_referring_domain: o.info.referringDomain(e) || "$direct",
                    },
                    ""
                );
            }),
            (y.prototype.get_referrer_info = function () {
                return o.strip_empty_properties({
                    $initial_referrer: this.props.$initial_referrer,
                    $initial_referring_domain: this.props.$initial_referring_domain,
                });
            }),
            (y.prototype.safe_merge = function (e) {
                return (
                    o.each(this.props, function (t, r) {
                        r in e || (e[r] = t);
                    }),
                    e
                );
            }),
            (y.prototype.update_config = function (e) {
                (this.default_expiry = this.expire_days = e.cookie_expiration),
                    this.set_disabled(e.disable_persistence),
                    this.set_cookie_domain(e.cookie_domain),
                    this.set_cross_site(e.cross_site_cookie),
                    this.set_cross_subdomain(e.cross_subdomain_cookie),
                    this.set_secure(e.secure_cookie);
            }),
            (y.prototype.set_disabled = function (e) {
                (this.disabled = e), this.disabled ? this.remove() : this.save();
            }),
            (y.prototype.set_cookie_domain = function (e) {
                e !== this.cookie_domain &&
                    (this.remove(), (this.cookie_domain = e), this.save());
            }),
            (y.prototype.set_cross_site = function (e) {
                e !== this.cross_site &&
                    ((this.cross_site = e), this.remove(), this.save());
            }),
            (y.prototype.set_cross_subdomain = function (e) {
                e !== this.cross_subdomain &&
                    ((this.cross_subdomain = e), this.remove(), this.save());
            }),
            (y.prototype.get_cross_subdomain = function () {
                return this.cross_subdomain;
            }),
            (y.prototype.set_secure = function (e) {
                e !== this.secure && ((this.secure = !!e), this.remove(), this.save());
            }),
            (y.prototype._add_to_people_queue = function (e, t) {
                var r = this._get_queue_key(e),
                    i = t[e],
                    n = this._get_or_create_queue(Z),
                    s = this._get_or_create_queue(re),
                    a = this._get_or_create_queue(B),
                    u = this._get_or_create_queue(Y),
                    c = this._get_or_create_queue(Q),
                    d = this._get_or_create_queue(z, []),
                    h = this._get_or_create_queue(P, []);
                r === Ze
                    ? (o.extend(n, i),
                        this._pop_from_people_queue(Y, i),
                        this._pop_from_people_queue(Q, i),
                        this._pop_from_people_queue(B, i))
                    : r === ze
                        ? (o.each(i, function (_, l) {
                            l in s || (s[l] = _);
                        }),
                            this._pop_from_people_queue(B, i))
                        : r === Le
                            ? o.each(i, function (_) {
                                o.each([n, s, u, c], function (l) {
                                    _ in l && delete l[_];
                                }),
                                    o.each(h, function (l) {
                                        _ in l && delete l[_];
                                    }),
                                    (a[_] = !0);
                            })
                            : r === Ge
                                ? (o.each(
                                    i,
                                    function (_, l) {
                                        l in n ? (n[l] += _) : (l in u || (u[l] = 0), (u[l] += _));
                                    },
                                    this
                                ),
                                    this._pop_from_people_queue(B, i))
                                : r === Ke
                                    ? (o.each(i, function (_, l) {
                                        o.isArray(_) && (l in c || (c[l] = []), (c[l] = c[l].concat(_)));
                                    }),
                                        this._pop_from_people_queue(B, i))
                                    : r === We
                                        ? (d.push(i), this._pop_from_people_queue(P, i))
                                        : r === je && (h.push(i), this._pop_from_people_queue(B, i)),
                    w.log("MIXPANEL PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):"),
                    w.log(t),
                    this.save();
            }),
            (y.prototype._pop_from_people_queue = function (e, t) {
                var r = this._get_queue(e);
                o.isUndefined(r) ||
                    (o.each(
                        t,
                        function (i, n) {
                            e === P || e === z
                                ? o.each(r, function (s) {
                                    s[n] === i && delete s[n];
                                })
                                : delete r[n];
                        },
                        this
                    ),
                        this.save());
            }),
            (y.prototype._get_queue_key = function (e) {
                if (e === Z) return Ze;
                if (e === re) return ze;
                if (e === B) return Le;
                if (e === Y) return Ge;
                if (e === P) return je;
                if (e === z) return We;
                if (e === Q) return Ke;
                w.error("Invalid queue:", e);
            }),
            (y.prototype._get_queue = function (e) {
                return this.props[this._get_queue_key(e)];
            }),
            (y.prototype._get_or_create_queue = function (e, t) {
                var r = this._get_queue_key(e);
                return (
                    (t = o.isUndefined(t) ? {} : t), this.props[r] || (this.props[r] = t)
                );
            }),
            (y.prototype.set_event_timer = function (e, t) {
                var r = this.props[le] || {};
                (r[e] = t), (this.props[le] = r), this.save();
            }),
            (y.prototype.remove_event_timer = function (e) {
                var t = this.props[le] || {},
                    r = t[e];
                return o.isUndefined(r) || (delete this.props[le][e], this.save()), r;
            });
        var Je,
            M,
            Rt = 0,
            Ir = 1,
            Or = function (e) {
                return e;
            },
            ue = function () { },
            O = "mixpanel",
            Nt = "base64",
            qr = "json",
            ie = C.XMLHttpRequest && "withCredentials" in new XMLHttpRequest(),
            Pt = !ie && q.indexOf("MSIE") === -1 && q.indexOf("Mozilla") === -1,
            xe = null;
        R.sendBeacon &&
            (xe = function () {
                return R.sendBeacon.apply(R, arguments);
            });
        var Ut = {
            api_host: "https://api-js.mixpanel.com",
            api_method: "POST",
            api_transport: "XHR",
            api_payload_format: Nt,
            app_host: "https://mixpanel.com",
            cdn: "https://cdn.mxpnl.com",
            cross_site_cookie: !1,
            cross_subdomain_cookie: !0,
            error_reporter: ue,
            persistence: "cookie",
            persistence_name: "",
            cookie_domain: "",
            cookie_name: "",
            loaded: ue,
            store_google: !0,
            save_referrer: !0,
            test: !1,
            verbose: !1,
            img: !1,
            debug: !1,
            track_links_timeout: 300,
            cookie_expiration: 365,
            upgrade: !1,
            disable_persistence: !1,
            disable_cookie: !1,
            secure_cookie: !1,
            ip: !0,
            opt_out_tracking_by_default: !1,
            opt_out_persistence_by_default: !1,
            opt_out_tracking_persistence_type: "localStorage",
            opt_out_tracking_cookie_prefix: null,
            property_blacklist: [],
            xhr_headers: {},
            ignore_dnt: !1,
            batch_requests: !0,
            batch_size: 50,
            batch_flush_interval_ms: 5e3,
            batch_request_timeout_ms: 9e4,
            batch_autostart: !0,
            hooks: {},
        },
            Ft = !1,
            p = function () { },
            Ye = function (e, t, r) {
                var i,
                    n = r === O ? M : M[r];
                if (n && Je === Rt) i = n;
                else {
                    if (n && !o.isArray(n)) {
                        w.error("You have already initialized " + r);
                        return;
                    }
                    i = new p();
                }
                return (
                    (i._cached_groups = {}),
                    i._init(e, t, r),
                    (i.people = new m()),
                    i.people._init(i),
                    (F.DEBUG = F.DEBUG || i.get_config("debug")),
                    !o.isUndefined(n) &&
                    o.isArray(n) &&
                    (i._execute_array.call(i.people, n.people), i._execute_array(n)),
                    i
                );
            };
        (p.prototype.init = function (e, t, r) {
            if (o.isUndefined(r)) {
                this.report_error(
                    "You must name your new library: init(token, config, name)"
                );
                return;
            }
            if (r === O) {
                this.report_error(
                    "You must initialize the main mixpanel object right after you include the Mixpanel js snippet"
                );
                return;
            }
            var i = Ye(e, t, r);
            return (M[r] = i), i._loaded(), i;
        }),
            (p.prototype._init = function (e, t, r) {
                (t = t || {}), (this.__loaded = !0), (this.config = {});
                var i = {};
                if (!("api_payload_format" in t)) {
                    var n = t.api_host || Ut.api_host;
                    n.match(/\.mixpanel\.com$/) && (i.api_payload_format = qr);
                }
                if (
                    (this.set_config(
                        o.extend({}, Ut, i, t, {
                            name: r,
                            token: e,
                            callback_fn: (r === O ? r : O + "." + r) + "._jsc",
                        })
                    ),
                        (this._jsc = ue),
                        (this.__dom_loaded_queue = []),
                        (this.__request_queue = []),
                        (this.__disabled_events = []),
                        (this._flags = { disable_all_events: !1, identify_called: !1 }),
                        (this.request_batchers = {}),
                        (this._batch_requests = this.get_config("batch_requests")),
                        this._batch_requests)
                ) {
                    if (!o.localStorage.is_supported(!0) || !ie)
                        (this._batch_requests = !1),
                            w.log(
                                "Turning off Mixpanel request-queueing; needs XHR and localStorage support"
                            );
                    else if ((this.init_batchers(), xe && C.addEventListener)) {
                        var s = o.bind(function () {
                            this.request_batchers.events.stopped ||
                                this.request_batchers.events.flush({ unloading: !0 });
                        }, this);
                        C.addEventListener("pagehide", function (u) {
                            u.persisted && s();
                        }),
                            C.addEventListener("visibilitychange", function () {
                                x.visibilityState === "hidden" && s();
                            });
                    }
                }
                (this.persistence = this.cookie = new y(this.config)),
                    (this.unpersisted_superprops = {}),
                    this._gdpr_init();
                var a = o.UUID();
                this.get_distinct_id() ||
                    this.register_once({ distinct_id: a, $device_id: a }, "");
            }),
            (p.prototype._loaded = function () {
                this.get_config("loaded")(this), this._set_default_superprops();
            }),
            (p.prototype._set_default_superprops = function () {
                this.persistence.update_search_keyword(x.referrer),
                    this.get_config("store_google") &&
                    this.persistence.update_campaign_params(),
                    this.get_config("save_referrer") &&
                    this.persistence.update_referrer_info(x.referrer);
            }),
            (p.prototype._dom_loaded = function () {
                o.each(
                    this.__dom_loaded_queue,
                    function (e) {
                        this._track_dom.apply(this, e);
                    },
                    this
                ),
                    this.has_opted_out_tracking() ||
                    o.each(
                        this.__request_queue,
                        function (e) {
                            this._send_request.apply(this, e);
                        },
                        this
                    ),
                    delete this.__dom_loaded_queue,
                    delete this.__request_queue;
            }),
            (p.prototype._track_dom = function (e, t) {
                if (this.get_config("img"))
                    return (
                        this.report_error(
                            "You can't use DOM tracking functions with img = true."
                        ),
                        !1
                    );
                if (!Ft) return this.__dom_loaded_queue.push([e, t]), !1;
                var r = new e().init(this);
                return r.track.apply(r, t);
            }),
            (p.prototype._prepare_callback = function (e, t) {
                if (o.isUndefined(e)) return null;
                if (ie) {
                    var r = function (a) {
                        e(a, t);
                    };
                    return r;
                } else {
                    var i = this._jsc,
                        n = "" + Math.floor(Math.random() * 1e8),
                        s = this.get_config("callback_fn") + "[" + n + "]";
                    return (
                        (i[n] = function (a) {
                            delete i[n], e(a, t);
                        }),
                        s
                    );
                }
            }),
            (p.prototype._send_request = function (e, t, r, i) {
                var n = !0;
                if (Pt) return this.__request_queue.push(arguments), n;
                var s = {
                    method: this.get_config("api_method"),
                    transport: this.get_config("api_transport"),
                    verbose: this.get_config("verbose"),
                },
                    a = null;
                !i &&
                    (o.isFunction(r) || typeof r == "string") &&
                    ((i = r), (r = null)),
                    (r = o.extend(s, r || {})),
                    ie || (r.method = "GET");
                var u = r.method === "POST",
                    c = xe && u && r.transport.toLowerCase() === "sendbeacon",
                    d = r.verbose;
                t.verbose && (d = !0),
                    this.get_config("test") && (t.test = 1),
                    d && (t.verbose = 1),
                    this.get_config("img") && (t.img = 1),
                    ie ||
                    (i
                        ? (t.callback = i)
                        : (d || this.get_config("test")) &&
                        (t.callback = "(function(){})")),
                    (t.ip = this.get_config("ip") ? 1 : 0),
                    (t._ = new Date().getTime().toString()),
                    u && ((a = "data=" + encodeURIComponent(t.data)), delete t.data),
                    (e += "?" + o.HTTPBuildQuery(t));
                var h = this;
                if ("img" in t) {
                    var _ = x.createElement("img");
                    (_.src = e), x.body.appendChild(_);
                } else if (c) {
                    try {
                        n = xe(e, a);
                    } catch (E) {
                        h.report_error(E), (n = !1);
                    }
                    try {
                        i && i(n ? 1 : 0);
                    } catch (E) {
                        h.report_error(E);
                    }
                } else if (ie)
                    try {
                        var l = new XMLHttpRequest();
                        l.open(r.method, e, !0);
                        var g = this.get_config("xhr_headers");
                        if (
                            (u && (g["Content-Type"] = "application/x-www-form-urlencoded"),
                                o.each(g, function (E, S) {
                                    l.setRequestHeader(S, E);
                                }),
                                r.timeout_ms && typeof l.timeout < "u")
                        ) {
                            l.timeout = r.timeout_ms;
                            var f = new Date().getTime();
                        }
                        (l.withCredentials = !0),
                            (l.onreadystatechange = function () {
                                if (l.readyState === 4)
                                    if (l.status === 200) {
                                        if (i)
                                            if (d) {
                                                var E;
                                                try {
                                                    E = o.JSONDecode(l.responseText);
                                                } catch ($) {
                                                    if ((h.report_error($), r.ignore_json_errors))
                                                        E = l.responseText;
                                                    else return;
                                                }
                                                i(E);
                                            } else i(Number(l.responseText));
                                    } else {
                                        var S;
                                        l.timeout &&
                                            !l.status &&
                                            new Date().getTime() - f >= l.timeout
                                            ? (S = "timeout")
                                            : (S =
                                                "Bad HTTP status: " + l.status + " " + l.statusText),
                                            h.report_error(S),
                                            i && i(d ? { status: 0, error: S, xhr_req: l } : 0);
                                    }
                            }),
                            l.send(a);
                    } catch (E) {
                        h.report_error(E), (n = !1);
                    }
                else {
                    var b = x.createElement("script");
                    (b.type = "text/javascript"),
                        (b.async = !0),
                        (b.defer = !0),
                        (b.src = e);
                    var v = x.getElementsByTagName("script")[0];
                    v.parentNode.insertBefore(b, v);
                }
                return n;
            }),
            (p.prototype._execute_array = function (e) {
                var t,
                    r = [],
                    i = [],
                    n = [];
                o.each(
                    e,
                    function (a) {
                        a &&
                            ((t = a[0]),
                                o.isArray(t)
                                    ? n.push(a)
                                    : typeof a == "function"
                                        ? a.call(this)
                                        : o.isArray(a) && t === "alias"
                                            ? r.push(a)
                                            : o.isArray(a) &&
                                                t.indexOf("track") !== -1 &&
                                                typeof this[t] == "function"
                                                ? n.push(a)
                                                : i.push(a));
                    },
                    this
                );
                var s = function (a, u) {
                    o.each(
                        a,
                        function (c) {
                            if (o.isArray(c[0])) {
                                var d = u;
                                o.each(c, function (h) {
                                    d = d[h[0]].apply(d, h.slice(1));
                                });
                            } else this[c[0]].apply(this, c.slice(1));
                        },
                        u
                    );
                };
                s(r, this), s(i, this), s(n, this);
            }),
            (p.prototype.are_batchers_initialized = function () {
                return !!this.request_batchers.events;
            }),
            (p.prototype.init_batchers = function () {
                var e = this.get_config("token");
                if (!this.are_batchers_initialized()) {
                    var t = o.bind(function (r) {
                        return new D("__mpq_" + e + r.queue_suffix, {
                            libConfig: this.config,
                            sendRequestFunc: o.bind(function (i, n, s) {
                                this._send_request(
                                    this.get_config("api_host") + r.endpoint,
                                    this._encode_data_for_request(i),
                                    n,
                                    this._prepare_callback(s, i)
                                );
                            }, this),
                            beforeSendHook: o.bind(function (i) {
                                return this._run_hook("before_send_" + r.type, i);
                            }, this),
                            errorReporter: this.get_config("error_reporter"),
                            stopAllBatchingFunc: o.bind(this.stop_batch_senders, this),
                        });
                    }, this);
                    this.request_batchers = {
                        events: t({
                            type: "events",
                            endpoint: "/track/",
                            queue_suffix: "_ev",
                        }),
                        people: t({
                            type: "people",
                            endpoint: "/engage/",
                            queue_suffix: "_pp",
                        }),
                        groups: t({
                            type: "groups",
                            endpoint: "/groups/",
                            queue_suffix: "_gr",
                        }),
                    };
                }
                this.get_config("batch_autostart") && this.start_batch_senders();
            }),
            (p.prototype.start_batch_senders = function () {
                this.are_batchers_initialized() &&
                    ((this._batch_requests = !0),
                        o.each(this.request_batchers, function (e) {
                            e.start();
                        }));
            }),
            (p.prototype.stop_batch_senders = function () {
                (this._batch_requests = !1),
                    o.each(this.request_batchers, function (e) {
                        e.stop(), e.clear();
                    });
            }),
            (p.prototype.push = function (e) {
                this._execute_array([e]);
            }),
            (p.prototype.disable = function (e) {
                typeof e > "u"
                    ? (this._flags.disable_all_events = !0)
                    : (this.__disabled_events = this.__disabled_events.concat(e));
            }),
            (p.prototype._encode_data_for_request = function (e) {
                var t = o.JSONEncode(e);
                return (
                    this.get_config("api_payload_format") === Nt &&
                    (t = o.base64Encode(t)),
                    { data: t }
                );
            }),
            (p.prototype._track_or_batch = function (e, t) {
                var r = o.truncate(e.data, 255),
                    i = e.endpoint,
                    n = e.batcher,
                    s = e.should_send_immediately,
                    a = e.send_request_options || {};
                t = t || ue;
                var u = !0,
                    c = o.bind(function () {
                        return (
                            a.skip_hooks || (r = this._run_hook("before_send_" + e.type, r)),
                            r
                                ? (w.log("MIXPANEL REQUEST:"),
                                    w.log(r),
                                    this._send_request(
                                        i,
                                        this._encode_data_for_request(r),
                                        a,
                                        this._prepare_callback(t, r)
                                    ))
                                : null
                        );
                    }, this);
                return (
                    this._batch_requests && !s
                        ? n.enqueue(r, function (d) {
                            d ? t(1, r) : c();
                        })
                        : (u = c()),
                    u && r
                );
            }),
            (p.prototype.track = de(function (e, t, r, i) {
                !i && typeof r == "function" && ((i = r), (r = null)), (r = r || {});
                var n = r.transport;
                n && (r.transport = n);
                var s = r.send_immediately;
                if ((typeof i != "function" && (i = ue), o.isUndefined(e))) {
                    this.report_error("No event name provided to mixpanel.track");
                    return;
                }
                if (this._event_is_disabled(e)) {
                    i(0);
                    return;
                }
                (t = t || {}), (t.token = this.get_config("token"));
                var a = this.persistence.remove_event_timer(e);
                if (!o.isUndefined(a)) {
                    var u = new Date().getTime() - a;
                    t.$duration = parseFloat((u / 1e3).toFixed(3));
                }
                this._set_default_superprops(),
                    (t = o.extend(
                        {},
                        o.info.properties(),
                        this.persistence.properties(),
                        this.unpersisted_superprops,
                        t
                    ));
                var c = this.get_config("property_blacklist");
                o.isArray(c)
                    ? o.each(c, function (_) {
                        delete t[_];
                    })
                    : this.report_error(
                        "Invalid value for property_blacklist config: " + c
                    );
                var d = { event: e, properties: t },
                    h = this._track_or_batch(
                        {
                            type: "events",
                            data: d,
                            endpoint: this.get_config("api_host") + "/track/",
                            batcher: this.request_batchers.events,
                            should_send_immediately: s,
                            send_request_options: r,
                        },
                        i
                    );
                return h;
            })),
            (p.prototype.set_group = de(function (e, t, r) {
                o.isArray(t) || (t = [t]);
                var i = {};
                return (i[e] = t), this.register(i), this.people.set(e, t, r);
            })),
            (p.prototype.add_group = de(function (e, t, r) {
                var i = this.get_property(e);
                if (i === void 0) {
                    var n = {};
                    (n[e] = [t]), this.register(n);
                } else i.indexOf(t) === -1 && (i.push(t), this.register(n));
                return this.people.union(e, t, r);
            })),
            (p.prototype.remove_group = de(function (e, t, r) {
                var i = this.get_property(e);
                if (i !== void 0) {
                    var n = i.indexOf(t);
                    n > -1 && (i.splice(n, 1), this.register({ group_key: i })),
                        i.length === 0 && this.unregister(e);
                }
                return this.people.remove(e, t, r);
            })),
            (p.prototype.track_with_groups = de(function (e, t, r, i) {
                var n = o.extend({}, t || {});
                return (
                    o.each(r, function (s, a) {
                        s != null && (n[a] = s);
                    }),
                    this.track(e, n, i)
                );
            })),
            (p.prototype._create_map_key = function (e, t) {
                return e + "_" + JSON.stringify(t);
            }),
            (p.prototype._remove_group_from_cache = function (e, t) {
                delete this._cached_groups[this._create_map_key(e, t)];
            }),
            (p.prototype.get_group = function (e, t) {
                var r = this._create_map_key(e, t),
                    i = this._cached_groups[r];
                return (
                    (i === void 0 || i._group_key !== e || i._group_id !== t) &&
                    ((i = new k()), i._init(this, e, t), (this._cached_groups[r] = i)),
                    i
                );
            }),
            (p.prototype.track_pageview = function (e) {
                o.isUndefined(e) && (e = x.location.href),
                    this.track("mp_page_view", o.info.pageviewInfo(e));
            }),
            (p.prototype.track_links = function () {
                return this._track_dom.call(this, ee, arguments);
            }),
            (p.prototype.track_forms = function () {
                return this._track_dom.call(this, be, arguments);
            }),
            (p.prototype.time_event = function (e) {
                if (o.isUndefined(e)) {
                    this.report_error("No event name provided to mixpanel.time_event");
                    return;
                }
                this._event_is_disabled(e) ||
                    this.persistence.set_event_timer(e, new Date().getTime());
            });
        var Br = { persistent: !0 },
            Qe = function (e) {
                var t;
                return (
                    o.isObject(e)
                        ? (t = e)
                        : o.isUndefined(e)
                            ? (t = {})
                            : (t = { days: e }),
                    o.extend({}, Br, t)
                );
            };
        (p.prototype.register = function (e, t) {
            var r = Qe(t);
            r.persistent
                ? this.persistence.register(e, r.days)
                : o.extend(this.unpersisted_superprops, e);
        }),
            (p.prototype.register_once = function (e, t, r) {
                var i = Qe(r);
                i.persistent
                    ? this.persistence.register_once(e, t, i.days)
                    : (typeof t > "u" && (t = "None"),
                        o.each(
                            e,
                            function (n, s) {
                                (!this.unpersisted_superprops.hasOwnProperty(s) ||
                                    this.unpersisted_superprops[s] === t) &&
                                    (this.unpersisted_superprops[s] = n);
                            },
                            this
                        ));
            }),
            (p.prototype.unregister = function (e, t) {
                (t = Qe(t)),
                    t.persistent
                        ? this.persistence.unregister(e)
                        : delete this.unpersisted_superprops[e];
            }),
            (p.prototype._register_single = function (e, t) {
                var r = {};
                (r[e] = t), this.register(r);
            }),
            (p.prototype.identify = function (e, t, r, i, n, s, a, u) {
                var c = this.get_distinct_id();
                if (
                    (this.register({ $user_id: e }), !this.get_property("$device_id"))
                ) {
                    var d = c;
                    this.register_once(
                        { $had_persisted_distinct_id: !0, $device_id: d },
                        ""
                    );
                }
                e !== c &&
                    e !== this.get_property(we) &&
                    (this.unregister(we), this.register({ distinct_id: e })),
                    (this._flags.identify_called = !0),
                    this.people._flush(t, r, i, n, s, a, u),
                    e !== c &&
                    this.track(
                        "$identify",
                        { distinct_id: e, $anon_distinct_id: c },
                        { skip_hooks: !0 }
                    );
            }),
            (p.prototype.reset = function () {
                this.persistence.clear(), (this._flags.identify_called = !1);
                var e = o.UUID();
                this.register_once({ distinct_id: e, $device_id: e }, "");
            }),
            (p.prototype.get_distinct_id = function () {
                return this.get_property("distinct_id");
            }),
            (p.prototype.alias = function (e, t) {
                if (e === this.get_property(Dt))
                    return (
                        this.report_error(
                            "Attempting to create alias for existing People user - aborting."
                        ),
                        -2
                    );
                var r = this;
                return (
                    o.isUndefined(t) && (t = this.get_distinct_id()),
                    e !== t
                        ? (this._register_single(we, e),
                            this.track(
                                "$create_alias",
                                { alias: e, distinct_id: t },
                                { skip_hooks: !0 },
                                function () {
                                    r.identify(e);
                                }
                            ))
                        : (this.report_error(
                            "alias matches current distinct_id - skipping api call."
                        ),
                            this.identify(e),
                            -1)
                );
            }),
            (p.prototype.name_tag = function (e) {
                this._register_single("mp_name_tag", e);
            }),
            (p.prototype.set_config = function (e) {
                if (o.isObject(e)) {
                    o.extend(this.config, e);
                    var t = e.batch_size;
                    t &&
                        o.each(this.request_batchers, function (r) {
                            r.resetBatchSize();
                        }),
                        this.get_config("persistence_name") ||
                        (this.config.persistence_name = this.config.cookie_name),
                        this.get_config("disable_persistence") ||
                        (this.config.disable_persistence = this.config.disable_cookie),
                        this.persistence && this.persistence.update_config(this.config),
                        (F.DEBUG = F.DEBUG || this.get_config("debug"));
                }
            }),
            (p.prototype.get_config = function (e) {
                return this.config[e];
            }),
            (p.prototype._run_hook = function (e) {
                var t = (this.config.hooks[e] || Or).apply(this, J.call(arguments, 1));
                return (
                    typeof t > "u" &&
                    (this.report_error(e + " hook did not return a value"), (t = null)),
                    t
                );
            }),
            (p.prototype.get_property = function (e) {
                return this.persistence.props[e];
            }),
            (p.prototype.toString = function () {
                var e = this.get_config("name");
                return e !== O && (e = O + "." + e), e;
            }),
            (p.prototype._event_is_disabled = function (e) {
                return (
                    o.isBlockedUA(q) ||
                    this._flags.disable_all_events ||
                    o.include(this.__disabled_events, e)
                );
            }),
            (p.prototype._gdpr_init = function () {
                var e =
                    this.get_config("opt_out_tracking_persistence_type") ===
                    "localStorage";
                e &&
                    o.localStorage.is_supported() &&
                    (!this.has_opted_in_tracking() &&
                        this.has_opted_in_tracking({ persistence_type: "cookie" }) &&
                        this.opt_in_tracking({ enable_persistence: !1 }),
                        !this.has_opted_out_tracking() &&
                        this.has_opted_out_tracking({ persistence_type: "cookie" }) &&
                        this.opt_out_tracking({ clear_persistence: !1 }),
                        this.clear_opt_in_out_tracking({
                            persistence_type: "cookie",
                            enable_persistence: !1,
                        })),
                    this.has_opted_out_tracking()
                        ? this._gdpr_update_persistence({ clear_persistence: !0 })
                        : !this.has_opted_in_tracking() &&
                        (this.get_config("opt_out_tracking_by_default") ||
                            o.cookie.get("mp_optout")) &&
                        (o.cookie.remove("mp_optout"),
                            this.opt_out_tracking({
                                clear_persistence: this.get_config(
                                    "opt_out_persistence_by_default"
                                ),
                            }));
            }),
            (p.prototype._gdpr_update_persistence = function (e) {
                var t;
                if (e && e.clear_persistence) t = !0;
                else if (e && e.enable_persistence) t = !1;
                else return;
                !this.get_config("disable_persistence") &&
                    this.persistence.disabled !== t &&
                    this.persistence.set_disabled(t),
                    t &&
                    o.each(this.request_batchers, function (r) {
                        r.clear();
                    });
            }),
            (p.prototype._gdpr_call_func = function (e, t) {
                return (
                    (t = o.extend(
                        {
                            track: o.bind(this.track, this),
                            persistence_type: this.get_config(
                                "opt_out_tracking_persistence_type"
                            ),
                            cookie_prefix: this.get_config("opt_out_tracking_cookie_prefix"),
                            cookie_expiration: this.get_config("cookie_expiration"),
                            cross_site_cookie: this.get_config("cross_site_cookie"),
                            cross_subdomain_cookie: this.get_config("cross_subdomain_cookie"),
                            cookie_domain: this.get_config("cookie_domain"),
                            secure_cookie: this.get_config("secure_cookie"),
                            ignore_dnt: this.get_config("ignore_dnt"),
                        },
                        t
                    )),
                    o.localStorage.is_supported() || (t.persistence_type = "cookie"),
                    e(this.get_config("token"), {
                        track: t.track,
                        trackEventName: t.track_event_name,
                        trackProperties: t.track_properties,
                        persistenceType: t.persistence_type,
                        persistencePrefix: t.cookie_prefix,
                        cookieDomain: t.cookie_domain,
                        cookieExpiration: t.cookie_expiration,
                        crossSiteCookie: t.cross_site_cookie,
                        crossSubdomainCookie: t.cross_subdomain_cookie,
                        secureCookie: t.secure_cookie,
                        ignoreDnt: t.ignore_dnt,
                    })
                );
            }),
            (p.prototype.opt_in_tracking = function (e) {
                (e = o.extend({ enable_persistence: !0 }, e)),
                    this._gdpr_call_func(Sr, e),
                    this._gdpr_update_persistence(e);
            }),
            (p.prototype.opt_out_tracking = function (e) {
                (e = o.extend({ clear_persistence: !0, delete_user: !0 }, e)),
                    e.delete_user &&
                    this.people &&
                    this.people._identify_called() &&
                    (this.people.delete_user(), this.people.clear_charges()),
                    this._gdpr_call_func(Er, e),
                    this._gdpr_update_persistence(e);
            }),
            (p.prototype.has_opted_in_tracking = function (e) {
                return this._gdpr_call_func(Tr, e);
            }),
            (p.prototype.has_opted_out_tracking = function (e) {
                return this._gdpr_call_func(It, e);
            }),
            (p.prototype.clear_opt_in_out_tracking = function (e) {
                (e = o.extend({ enable_persistence: !0 }, e)),
                    this._gdpr_call_func(Ar, e),
                    this._gdpr_update_persistence(e);
            }),
            (p.prototype.report_error = function (e, t) {
                w.error.apply(w.error, arguments);
                try {
                    !t && !(e instanceof Error) && (e = new Error(e)),
                        this.get_config("error_reporter")(e, t);
                } catch (r) {
                    w.error(r);
                }
            }),
            (p.prototype.init = p.prototype.init),
            (p.prototype.reset = p.prototype.reset),
            (p.prototype.disable = p.prototype.disable),
            (p.prototype.time_event = p.prototype.time_event),
            (p.prototype.track = p.prototype.track),
            (p.prototype.track_links = p.prototype.track_links),
            (p.prototype.track_forms = p.prototype.track_forms),
            (p.prototype.track_pageview = p.prototype.track_pageview),
            (p.prototype.register = p.prototype.register),
            (p.prototype.register_once = p.prototype.register_once),
            (p.prototype.unregister = p.prototype.unregister),
            (p.prototype.identify = p.prototype.identify),
            (p.prototype.alias = p.prototype.alias),
            (p.prototype.name_tag = p.prototype.name_tag),
            (p.prototype.set_config = p.prototype.set_config),
            (p.prototype.get_config = p.prototype.get_config),
            (p.prototype.get_property = p.prototype.get_property),
            (p.prototype.get_distinct_id = p.prototype.get_distinct_id),
            (p.prototype.toString = p.prototype.toString),
            (p.prototype.opt_out_tracking = p.prototype.opt_out_tracking),
            (p.prototype.opt_in_tracking = p.prototype.opt_in_tracking),
            (p.prototype.has_opted_out_tracking = p.prototype.has_opted_out_tracking),
            (p.prototype.has_opted_in_tracking = p.prototype.has_opted_in_tracking),
            (p.prototype.clear_opt_in_out_tracking =
                p.prototype.clear_opt_in_out_tracking),
            (p.prototype.get_group = p.prototype.get_group),
            (p.prototype.set_group = p.prototype.set_group),
            (p.prototype.add_group = p.prototype.add_group),
            (p.prototype.remove_group = p.prototype.remove_group),
            (p.prototype.track_with_groups = p.prototype.track_with_groups),
            (p.prototype.start_batch_senders = p.prototype.start_batch_senders),
            (p.prototype.stop_batch_senders = p.prototype.stop_batch_senders),
            (y.prototype.properties = y.prototype.properties),
            (y.prototype.update_search_keyword = y.prototype.update_search_keyword),
            (y.prototype.update_referrer_info = y.prototype.update_referrer_info),
            (y.prototype.get_cross_subdomain = y.prototype.get_cross_subdomain),
            (y.prototype.clear = y.prototype.clear);
        var oe = {},
            Dr = function () {
                o.each(oe, function (e, t) {
                    t !== O && (M[t] = e);
                }),
                    (M._ = o);
            },
            Rr = function () {
                M.init = function (e, t, r) {
                    if (r)
                        return M[r] || ((M[r] = oe[r] = Ye(e, t, r)), M[r]._loaded()), M[r];
                    var i = M;
                    oe[O]
                        ? (i = oe[O])
                        : e && ((i = Ye(e, t, O)), i._loaded(), (oe[O] = i)),
                        (M = i),
                        Je === Ir && (C[O] = M),
                        Dr();
                };
            },
            Nr = function () {
                function e() {
                    e.done ||
                        ((e.done = !0),
                            (Ft = !0),
                            (Pt = !1),
                            o.each(oe, function (i) {
                                i._dom_loaded();
                            }));
                }
                function t() {
                    try {
                        x.documentElement.doScroll("left");
                    } catch {
                        setTimeout(t, 1);
                        return;
                    }
                    e();
                }
                if (x.addEventListener)
                    x.readyState === "complete"
                        ? e()
                        : x.addEventListener("DOMContentLoaded", e, !1);
                else if (x.attachEvent) {
                    x.attachEvent("onreadystatechange", e);
                    var r = !1;
                    try {
                        r = C.frameElement === null;
                    } catch { }
                    x.documentElement.doScroll && r && t();
                }
                o.register_event(C, "load", e, !0);
            };
        function Pr() {
            return (Je = Rt), (M = new p()), Rr(), M.init(), Nr(), M;
        }
        var Ur = Pr(),
            Xe = Ur;
        Xe.init(tt, { debug: !1 }),
            (cr = {
                trackEvent: async (e, t) => { },
                setUserProperties: async (e) => {
                    e != null && e.email && Xe.identify(e.email), e && Xe.people.set(e);
                },
            });
    });
export {
    zt as C,
    Lt as D,
    Te as H,
    Gt as J,
    jt as O,
    Wt as R,
    Kt as S,
    Jt as T,
    Yt as U,
    Vr as __tla,
    Qt as a,
    Xt as b,
    er as c,
    tr as d,
    rr as e,
    ir as f,
    et as g,
    or as h,
    nr as i,
    sr as j,
    ar as k,
    cr as l,
    pr as m,
    dr as n,
    lr as o,
    ur as p,
    hr as q,
    gr as r,
    fr as s,
};
