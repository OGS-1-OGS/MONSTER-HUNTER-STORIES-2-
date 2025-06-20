// Handle page load animation
document.addEventListener('DOMContentLoaded', function () {
    // Set up background
    const bgElement = document.getElementById('bgVideo');

    // Try to load video background with fallback
    tryLoadVideo();

    // Set up egg pattern selection
    setupEggSelector();

    // Start animation sequence
    setTimeout(function () {
        document.body.classList.add('start-animation');

        // Start egg hatching animation after delay
        setTimeout(function () {
            document.querySelector('.egg-container').classList.add('egg-hatching');
        }, 2000);
    }, 500);

    // Function to attempt loading video background
    function tryLoadVideo() {
        // Check if video is supported
        const testVideo = document.createElement('video');

        if (testVideo.canPlayType('video/mp4')) {
            // Create video element
            const videoElement = document.createElement('video');
            videoElement.autoplay = true;
            videoElement.loop = true;
            videoElement.muted = true;
            videoElement.playsinline = true; // Important for iOS
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.objectFit = 'cover';

            // Add video source
            const source = document.createElement('source');
            source.src = './videos/bg-video.mp4';
            source.type = 'video/mp4';

            // Error handling
            videoElement.addEventListener('error', createBackgroundFallback);

            videoElement.appendChild(source);
            bgElement.appendChild(videoElement);

            // If video doesn't start playing within 3s, use fallback
            setTimeout(function () {
                if (videoElement.readyState === 0 || videoElement.error || videoElement.paused) {
                    createBackgroundFallback();
                }
            }, 3000);

            // Try to force play for browsers that block autoplay
            videoElement.play().catch(() => {
                createBackgroundFallback();
            });
        } else {
            // Video not supported, use fallback
            createBackgroundFallback();
        }
    }

    // Create a fallback gradient background
    function createBackgroundFallback() {
        bgElement.innerHTML = ''; // Clear any child elements
        bgElement.style.background = 'linear-gradient(135deg, #002952 0%, #004C8C 50%, #0078C8 100%)';
        bgElement.style.opacity = '1';
    }

    // Set up egg pattern selector functionality
    function setupEggSelector() {
        const eggOptions = document.querySelectorAll('.egg-option');
        const dragonEgg = document.querySelector('.dragon-egg');

        eggOptions.forEach(function (option) {
            option.addEventListener('click', function () {
                // Remove selected state from all options
                eggOptions.forEach(function (opt) {
                    opt.classList.remove('selected');
                });

                // Add selected state to clicked option
                this.classList.add('selected');

                // Apply the pattern to the dragon egg
                dragonEgg.className = 'dragon-egg ' + this.dataset.pattern;
            });
        });
    }
});

// Add accessibility features
document.addEventListener('keydown', function (event) {
    // Use arrow keys to navigate egg options
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const options = document.querySelectorAll('.egg-option');
        const selected = document.querySelector('.egg-option.selected');

        if (!selected) return;

        let currentIndex = Array.from(options).indexOf(selected);

        if (event.key === 'ArrowLeft') {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        } else {
            currentIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        }

        options[currentIndex].click();
        options[currentIndex].focus();
    }

    // Enter key to continue
    if (event.key === 'Enter') {
        const continueBtn = document.querySelector('.continue-btn');
        if (continueBtn) {
            continueBtn.click();
        }
    }
});

// Add performance optimization
window.addEventListener('load', function () {
    // Add performance marks
    if (window.performance && window.performance.mark) {
        window.performance.mark('animation-start');
    }

    // Optimize animations for low-power devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        // Apply simpler animations for users who prefer reduced motion
        document.documentElement.classList.add('reduced-motion');
    }
}); 