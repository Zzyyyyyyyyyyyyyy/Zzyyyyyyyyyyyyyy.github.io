/* ============================================
   Enhanced Navbar JavaScript - Global
   处理滚动进度条更新和首次访问动画
   ============================================ */

(function() {
    'use strict';

    // 如果是首次访问（没有navbarVisited标记），在动画结束后标记为已访问
    if (!sessionStorage.getItem('navbarVisited')) {
        setTimeout(function() {
            sessionStorage.setItem('navbarVisited', '1');
            document.documentElement.classList.add('navbar-visited');
        }, 1500); // 动画时长 1s + 延迟 0.5s
    }

    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        const progressBar = document.querySelector('.scroll-progress-bar');

        if (!progressBar) {
            console.warn('Scroll progress bar element not found');
            return;
        }

        // 更新滚动进度条
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercentage + '%';
        }

        // 监听滚动事件
        window.addEventListener('scroll', updateScrollProgress, { passive: true });

        // 初始化时更新一次
        updateScrollProgress();
    });
})();
