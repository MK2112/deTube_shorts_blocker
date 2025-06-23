// ==UserScript==
// @name            Shorts Blocker
// @name:de         Shorts Blocker
// @name:es         Shorts Blocker
// @name:fr         Shorts Blocker
// @name:it         Shorts Blocker
// @name:pt         Shorts Blocker
// @name:ru         Shorts Blocker
// @name:ja         Shorts Blocker
// @name:ko         Shorts Blocker
// @name:zh-CN      Shorts Blocker
// @name:zh-TW      Shorts Blocker
// @name:nl         Shorts Blocker
// @name:pl         Shorts Blocker
// @name:sv         Shorts Blocker
// @name:da         Shorts Blocker
// @name:no         Shorts Blocker
// @name:fi         Shorts Blocker
// @name:tr         Shorts Blocker
// @name:ar         Shorts Blocker
// @name:he         Shorts Blocker
// @name:hi         Shorts Blocker
// @name:th         Shorts Blocker
// @name:vi         Shorts Blocker
// @version         0.0.1
// @description     Blocks YT Shorts elements and redirects Shorts URLs to standard video pages.
// @description:de  Blockiert YT Shorts und leitet Shorts-URLs zu normalen Videoseiten um.
// @description:es  Bloquea Shorts en YT y redirige las URLs a la vista normal de video.
// @description:fr  Bloque les Shorts sur YT et redirige les liens vers la page vidéo classique.
// @description:it  Blocca gli Shorts di YT e reindirizza agli URL video standard.
// @description:pt  Bloqueia os Shorts do YT e redireciona os links para vídeos normais.
// @description:ru  Блокирует Shorts на YT и перенаправляет на обычные страницы видео.
// @description:ja  YTのShortsをブロックし、通常の動画ページにリダイレクトします。
// @description:ko  YT Shorts를 차단하고 일반 동영상 페이지로 리디렉션합니다.
// @description:zh-CN 阻止YT Shorts，并重定向到标准视频页面。
// @description:zh-TW 阻止YT Shorts，並重新導向至一般影片頁面。
// @description:nl  Blokkeert YT Shorts en leidt om naar normale videopagina's.
// @description:pl  Blokuje Shorts na YT i przekierowuje na standardowe strony wideo.
// @description:sv  Blockerar YT Shorts och omdirigerar till vanliga videosidor.
// @description:da  Blokerer YT Shorts og omdirigerer til almindelige videosider.
// @description:no  Blokkerer YT Shorts og videresender til vanlige videosider.
// @description:fi  Estää YT Shortsit ja ohjaa tavallisille videosivuille.
// @description:tr  YT Shorts'u engeller ve standart video sayfasına yönlendirir.
// @description:ar  يحظر Shorts على YT ويعيد التوجيه إلى صفحات الفيديو العادية.
// @description:he  חוסם את YT Shorts ומפנה לדפי וידאו רגילים.
// @description:hi  YT Shorts को ब्लॉक करता है और सामान्य वीडियो पृष्ठ पर रीडायरेक्ट करता है।
// @description:th  บล็อก Shorts ของ YT และเปลี่ยนเส้นทางไปยังหน้าวิดีโอปกติ
// @description:vi  Chặn Shorts trên YT và chuyển hướng đến trang video thông thường.
// @author          Your Name or Alias
// @namespace       https://github.com/your-repo/shorts-blocker
// @supportURL      https://github.com/your-repo/shorts-blocker/issues
// @license         MIT
// @match           *://www.youtube.com/*
// @match           *://m.youtube.com/*
// @match           *://www.youtube-nocookie.com/*
// @grant           none
// @run-at          document-start
// @compatible      firefox
// @compatible      edge
// @compatible      safari
// ==/UserScript==


(function () {
    'use strict';

    // --- Redirect Shorts URL to normal watch URL ---
    function redirectIfShortsURL(url) {
        const shortsRegex = /^https:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})(\?.*)?$/;
        const match = url.match(shortsRegex);
        if (match) {
            const videoId = match[1];
            const query = window.location.search || '';
            const newUrl = `https://www.youtube.com/watch?v=${videoId}${query}`;
            window.location.replace(newUrl);
        }
    }

    // Initial check on script start
    redirectIfShortsURL(window.location.href);

    // Monitor for SPA navigations (URL changes)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            redirectIfShortsURL(currentUrl);
        }
    }).observe(document, { subtree: true, childList: true });

    // --- Block Shorts UI elements ---
    const BLOCK_SELECTORS = [
        'ytd-reel-shelf-renderer',
        'a[title="Shorts"]',
        'div#dismissible.style-scope.ytd-rich-shelf-renderer'
    ];

    function removeShortsElements() {
        BLOCK_SELECTORS.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
        });
    }

    const observer = new MutationObserver(removeShortsElements);

    const initElementObserver = () => {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
            removeShortsElements();
        } else {
            requestAnimationFrame(initElementObserver);
        }
    };
    initElementObserver();
})();
