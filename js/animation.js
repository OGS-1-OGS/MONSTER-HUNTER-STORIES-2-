$(document).ready(function () {
    // 页面加载完成后的动画初始化
    initAnimation();

    // 滚动时检测元素是否进入视口
    $(window).on('scroll', function () {
        checkAnimElements();

        // 处理首屏背景
        if ($(window).scrollTop() > 50) {
            $('#firstView').addClass('scrolled');
        }
    });

    // 添加：强制触发一次滚动事件，确保初始位置的元素可以正确判断
    setTimeout(function () {
        $(window).trigger('scroll');
    }, 500);

    // 初始化动画元素
    function initAnimation() {
        // 专门处理首屏元素，确保它们被正确隐藏
        $('#firstView .logo, #firstView .platform, #firstView .leadArea, #firstView .mainTxt, #firstView .videoArea, #firstView .btn_buy').css({
            opacity: 0,
            transform: 'translateY(40px)'
        }).addClass('is-anim').attr('data-anim', 'elem');

        // 隐藏所有带有is-anim类的元素
        $('.is-anim').css({
            opacity: 0,
            transform: 'translateY(40px)'
        });

        // 初次检测元素 - 增加延迟，确保初始状态是隐藏的
        setTimeout(function () {
            checkAnimElements();
        }, 300);
    }

    // 检测元素是否进入视口
    function checkAnimElements() {
        $('.is-anim').each(function () {
            if (isElementInViewport(this) && !$(this).hasClass('animated')) {
                animateElement($(this));
            }
        });
    }

    // 元素动画效果
    function animateElement($elem) {
        $elem.addClass('animated');

        // 根据data-anim属性应用不同动画
        var animType = $elem.data('anim');

        if (animType === 'elem') {
            // 基本淡入上移效果
            $elem.css({
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 1.2s ease, transform 1.2s ease'
            });
        } else if (animType === 'image') {
            // 图片特殊效果
            $elem.css({
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 1.5s ease, transform 1.5s ease'
            });
        } else {
            // 默认动画，确保所有元素都有效果
            $elem.css({
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 1.2s ease, transform 1.2s ease'
            });
        }
    }

    // 检测元素是否在视口中 - 修改判断逻辑，让首屏元素需要滚动更多才显示
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // 首屏元素需要更多滚动
        if ($(el).closest('#firstView').length > 0) {
            return rect.top <= windowHeight * 0.6 && rect.bottom >= 0;
        }

        // 其他元素正常判断
        return rect.top <= windowHeight * 0.85 && rect.bottom >= 0;
    }
}); 