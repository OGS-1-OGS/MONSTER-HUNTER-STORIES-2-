/**
 * 首屏专用动画控制
 * 完全分离首屏动画逻辑，确保可靠执行
 */
(function () {
    // 定义全局动画参数，确保所有元素统一
    var animationParams = {
        duration: '1.2s',         // 与其他元素一致的持续时间
        easing: 'ease',           // 缓动函数
        baseDelay: 0.1,           // 基础延迟
        transformDistance: '40px' // 位移距离
    };

    // 立即添加一个初始化函数，确保即使在DOM加载前也能执行
    function init() {
        // 等待DOM基本结构加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startAnimation);
        } else {
            // 如果已经加载完成，直接执行
            startAnimation();
        }
    }

    // 主要动画初始化函数
    function startAnimation() {
        // 获取首屏所有需要添加动画的元素
        var firstView = document.getElementById('firstView');

        // 确保首屏区域存在
        if (!firstView) return;

        // 清除页面中可能存在的冲突样式标签（保留预加载样式）
        var conflictingStyles = document.querySelectorAll('style:not(#preload-styles)');
        for (var i = 0; i < conflictingStyles.length; i++) {
            var style = conflictingStyles[i];
            var content = style.textContent || '';
            if (content.indexOf('#firstView') !== -1 ||
                content.indexOf('contsInner') !== -1 ||
                content.indexOf('opacity: 0') !== -1) {
                style.parentNode.removeChild(style);
            }
        }

        // 应用初始状态 - 强制隐藏所有内容
        applyInitialState();

        // 监听滚动事件
        window.addEventListener('scroll', handleScroll);

        // 移除预加载样式，让我们的动画控制生效
        setTimeout(removePreloadStyles, 100);

        // 首次触发检查
        setTimeout(function () {
            handleScroll();
        }, 300);
    }

    // 移除预加载样式，让动画控制生效
    function removePreloadStyles() {
        // 首先将元素设置为可见但仍然透明
        var elements = document.querySelectorAll('.is-anim, #firstView .contsInner > *, #firstView .mv');
        elements.forEach(function (elem) {
            elem.style.visibility = 'visible';
        });

        // 移除或禁用预加载样式
        var preloadStyle = document.getElementById('preload-styles');
        if (preloadStyle) {
            preloadStyle.disabled = true;

            // 添加准备好的类到body
            document.body.classList.add('content-ready');
        }
    }

    /**
     * 应用初始隐藏状态到所有首屏元素
     */
    function applyInitialState() {
        // 获取首屏
        var firstView = document.getElementById('firstView');

        // 为首屏添加特殊类
        firstView.classList.add('animation-ready');

        // 获取所有主要容器内的直接子元素
        var mainElements = firstView.querySelectorAll('.contsInner > *');
        mainElements.forEach(function (elem, index) {
            // 清除可能存在的内联样式
            elem.removeAttribute('style');

            // 应用新样式，使用全局动画参数
            elem.style.opacity = '0';
            elem.style.transform = 'translateY(' + animationParams.transformDistance + ')';
            elem.style.transition = 'opacity ' + animationParams.duration + ' ' + animationParams.easing +
                ', transform ' + animationParams.duration + ' ' + animationParams.easing;
            elem.style.transitionDelay = (animationParams.baseDelay * index) + 's';
            elem.dataset.animIndex = index;
        });

        // 特殊处理背景元素
        var mvElem = firstView.querySelector('.mv');
        if (mvElem) {
            mvElem.removeAttribute('style');
            mvElem.style.opacity = '0';
            mvElem.style.transform = 'translateY(' + (parseInt(animationParams.transformDistance) / 2) + 'px)';
            mvElem.style.transition = 'opacity ' + animationParams.duration + ' ' + animationParams.easing +
                ', transform ' + animationParams.duration + ' ' + animationParams.easing;
        }

        // 处理其他可能的动画元素
        var animElements = document.querySelectorAll('.is-anim');
        animElements.forEach(function (elem) {
            if (!elem.closest('#firstView')) {
                elem.style.opacity = '0';
                elem.style.transform = 'translateY(' + animationParams.transformDistance + ')';
            }
        });
    }

    /**
     * 处理滚动事件
     */
    function handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 检测是否应该显示首屏
        if (scrollTop > 10) {
            showFirstScreen();
        }
    }

    /**
     * 显示首屏所有元素
     */
    function showFirstScreen() {
        // 移除滚动监听器，只需执行一次
        window.removeEventListener('scroll', handleScroll);

        // 添加已滚动类
        var firstView = document.getElementById('firstView');
        firstView.classList.add('scrolled');

        // 使所有元素可见
        var mainElements = firstView.querySelectorAll('.contsInner > *');
        mainElements.forEach(function (elem) {
            elem.style.opacity = '1';
            elem.style.transform = 'translateY(0)';
        });

        // 显示背景
        var mvElem = firstView.querySelector('.mv');
        if (mvElem) {
            mvElem.style.opacity = '1';
            mvElem.style.transform = 'translateY(0)';
        }
    }

    // 立即初始化
    init();
})();