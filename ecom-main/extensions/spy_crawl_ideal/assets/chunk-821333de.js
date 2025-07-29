const Y = (_) =>
    new Promise((T, s) => {
      try {
        chrome.storage.local.get([_], function (E) {
          T(E[_]);
        });
      } catch (E) {
        s(E);
      }
    }),
  H = (_, T) =>
    new Promise((s, E) => {
      try {
        chrome.storage.local.set({ [_]: T }, function () {
          s();
        });
      } catch (S) {
        E(S);
      }
    }),
  t = (_) =>
    new Promise((T, s) => {
      try {
        chrome.storage.local.remove([_], function () {
          T();
        });
      } catch (E) {
        s(E);
      }
    }),
  o = (_) =>
    new Promise((T, s) => {
      try {
        chrome.storage.local.get(_, function (E) {
          T(E);
        });
      } catch (E) {
        s(E);
      }
    });
var c = { get: Y, set: H, remove: t, getKeys: o };
const O = "HEYETSY_LICENCE_CODE",
  a = "HEYETSY_ME",
  R = "HEYETSY_BUTTON",
  n = "HEYETSY_IFRAME",
  A = "HEYETSY_SIDE_BAR_POSITION",
  I = "HEYETSY_SIDE_BAR_BEHAVIOR",
  e = "HEYETSY_SHOP_ACTIVE",
  C = "HEYETSY_SHOP_BUTTON",
  r = "HEYETSY_SHOP_IFRAME",
  D = "HEYETSY_SHOP_SIDE_BAR_POSITION",
  G = "HEYETSY_SHOP_SIDE_BAR_BEHAVIOR",
  L = "HEYETSY_LISTING_ACTIVE",
  N = "HEYETSY_CARD_SHOW",
  B = "HEYETSY_CARD_STYLE",
  P = "HEYETSY_CARD_TEXT_COLOR",
  i = "HEYETSY_CARD_BACKGROUND_COLOR",
  l = "HeyEtsy.com",
  m = "HEYETSY_CARD_SHOW_CATEGORIES",
  U = "HEYETSY_CARD_SHOW_TAGS",
  d = "HEYETSY_POWER_BUTTON",
  g = "HEYETSY_HIGHLIGHT_SETTINGS",
  h = "HEYETSY_HIGHLIGHT_TEXT_COLOR",
  u = "HEYETSY_HIGHLIGHT_BACKGROUND_COLOR",
  y = "https://welcome.ytuong.dev",
  V = "https://welcome.ytuong.dev",
  f =
    "https://go.crisp.chat/chat/embed/?website_id=42aa050c-6688-434d-8d90-745825bfd8ec",
  W = "https://welcome.ytuong.dev",
  w = "classic",
  M = "modern",
  v = "minimal",
  p = "#111827",
  K = "#ffffff",
  F = !0,
  X = !0,
  b = "CURRENT_VERSION_EVENT",
  x = {
    daily_views: "Daily Views",
    original_creation_days: "Days Created",
    sold: "Sold",
  };
export {
  a as A,
  R as B,
  p as C,
  n as D,
  A as E,
  I as F,
  W as G,
  l as H,
  x as I,
  V as U,
  y as W,
  K as a,
  f as b,
  N as c,
  O as d,
  B as e,
  P as f,
  i as g,
  g as h,
  u as i,
  m as j,
  U as k,
  c as l,
  v as m,
  F as n,
  X as o,
  M as p,
  C as q,
  D as r,
  G as s,
  e as t,
  w as u,
  L as v,
  d as w,
  b as x,
  h as y,
  r as z,
};
