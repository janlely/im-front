if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const f=e=>n(e,a),r={module:{uri:a},exports:t,require:f};s[a]=Promise.all(c.map((e=>r[e]||f(e)))).then((e=>(i(...e),t)))}}define(["./workbox-1bb06f5e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"7c43310ffa57ee6812ccf9074beaf2db"},{url:"/_next/static/6nyfHJcsiIn57jwEccHh9/_buildManifest.js",revision:"5321b55d0060156bcb418a97e5d75a7b"},{url:"/_next/static/6nyfHJcsiIn57jwEccHh9/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/238-65694fb267fdd50c.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/479-e2d5396be2f186df.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/4bd1b696-7ca2760f8db741a1.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/517-a6c417f8598f24a8.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/607-2cf46a1622eec0d0.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/app/_not-found/page-1a277dc2bc8727e9.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/app/chat/page-ba2177d99039702f.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/app/layout-187d8707ba0fc8f0.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/app/login/page-630f0b9fc8ed1b93.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/app/page-d79acbdc2931af73.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/main-app-86307b4ee13d88ef.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/main-c297e3086bc0d651.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-6f70ff32514c1b7e.js",revision:"6nyfHJcsiIn57jwEccHh9"},{url:"/_next/static/css/d3df112486f97f47.css",revision:"d3df112486f97f47"},{url:"/_next/static/css/e8b25ec9fff3876c.css",revision:"e8b25ec9fff3876c"},{url:"/_next/static/media/0610ebff456d6cfc-s.woff2",revision:"8786f06e95694337521729d147b3f669"},{url:"/_next/static/media/21ed5661b47f7f6d-s.p.woff2",revision:"91c3bc1f55db641843550a62e39f0031"},{url:"/_next/static/media/8a9e72331fecd08b-s.woff2",revision:"f8a4d4cec8704b696ec245377c0e188e"},{url:"/_next/static/media/bde16c1724335d95-s.woff2",revision:"c56527d8c69315a82039a810338fd378"},{url:"/_next/static/media/e3b8d441242e07fb-s.woff2",revision:"8699475078b0c1b86dbe7ad907bb4e81"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icons/icon-128x128.png",revision:"134717facf899f233f8beb5431cbc18b"},{url:"/icons/icon-192x192.png",revision:"fca1e74d24acd71509766c28326ae8d2"},{url:"/icons/icon-512x512.png",revision:"73e40e24f64b64d730ff39a4728b2cc5"},{url:"/manifest.json",revision:"ee8461842b376189c9dd83d323a95032"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));