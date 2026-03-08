/* ============================================
   THE SASCHA EXPERIENCE - JavaScript
   Warning: This code contains excessive fun.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Launch all the chaos
    initConfetti();
    initTypewriter();
    initFloatingEmojis();
    initScrollReveal();
    initCursorTrail();
    initClickCounter();
    initLoadingSection();
    initPonySparkles();
    initFooterHearts();
    initParallax();
    initSillyPageTitle();
    initTestimonials();
    initRiggedSlider();
    initCoolnessTest();
    initDontClickBtn();
    initKonamiCode();
    initConsoleEasterEgg();
    initIntroMusic();
});

/* ============================================
   CONFETTI BURST ON PAGE LOAD
   ============================================ */
function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#FF69B4', '#00D4FF', '#FFD700', '#7FFF00', '#e94560', '#FF6347', '#9B59B6'];
    const shapes = ['rect', 'circle'];

    // Create 150 confetti pieces
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 12 + 5,
            h: Math.random() * 8 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            velocity: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.2,
            drift: (Math.random() - 0.5) * 2,
            opacity: 1,
            fadeRate: 0.003 + Math.random() * 0.003,
        });
    }

    let animationId;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let allDone = true;

        confettiPieces.forEach(p => {
            if (p.opacity <= 0) return;
            allDone = false;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();

            // Physics
            p.y += p.velocity;
            p.x += p.drift;
            p.angle += p.angularVelocity;
            p.velocity += 0.05; // gravity

            // Fade out when past screen
            if (p.y > canvas.height * 0.7) {
                p.opacity -= p.fadeRate * 3;
            }
        });

        if (!allDone) {
            animationId = requestAnimationFrame(animate);
        } else {
            // Clean up canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
        }
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
function initTypewriter() {
    const messages = [
        'Warning: Too much awesomeness ahead',
        'Professional blur artist. Part-time doner critic.',
        'Caution: May cause spontaneous laughter',
        'Loading maximum Sascha energy...',
        '404: Modesty not found',
        'She came. She saw. She blurred the photo.',
        'If lost, check nearest doner shop.'
    ];

    const typewriterEl = document.getElementById('typewriter');
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentMessage = messages[messageIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typewriterEl.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80 + Math.random() * 40; // slightly random for human feel
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500; // Pause before next
        }

        setTimeout(type, typingSpeed);
    }

    // Start after hero animation completes
    setTimeout(type, 2000);
}

/* ============================================
   FLOATING EMOJIS IN HERO
   ============================================ */
function initFloatingEmojis() {
    const container = document.getElementById('emoji-container');
    const emojis = ['❤️', '⭐', '🌯', '🐴', '🍕', '🎉', '✨', '🏄', '🎪', '🤸', '🍝', '📸', '🎭', '🐶', '🧶', '🍷'];

    function spawnEmoji() {
        const emoji = document.createElement('span');
        emoji.classList.add('floating-emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        // Random position and timing
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        emoji.style.animationDuration = (Math.random() * 5 + 5) + 's';

        container.appendChild(emoji);

        // Cleanup after animation
        setTimeout(() => {
            emoji.remove();
        }, 12000);
    }

    // Spawn emojis periodically
    setInterval(spawnEmoji, 800);

    // Spawn initial batch
    for (let i = 0; i < 8; i++) {
        setTimeout(spawnEmoji, i * 300);
    }
}

/* ============================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Don't unobserve - let them re-trigger if you scroll back
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ============================================
   CURSOR TRAIL (Hearts follow cursor)
   ============================================ */
function initCursorTrail() {
    const trailContainer = document.getElementById('cursor-trail');
    const hearts = ['❤️', '💖', '💕', '✨', '⭐', '💫'];
    let lastTime = 0;
    const throttleMs = 80; // spawn a heart every 80ms max
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    function spawnTrail(x, y) {
        const now = Date.now();
        if (now - lastTime < throttleMs) return;
        lastTime = now;

        const heart = document.createElement('span');
        heart.classList.add('trail-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = (Math.random() * 10 + 12) + 'px';

        trailContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    document.addEventListener('mousemove', (e) => {
        spawnTrail(e.clientX, e.clientY);
    });

    if (isTouchDevice) {
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            spawnTrail(touch.clientX, touch.clientY);
        }, { passive: true });
    }
}

/* ============================================
   CLICK COUNTER EASTER EGG
   ============================================ */
function initClickCounter() {
    const btn = document.getElementById('click-counter-btn');
    const countEl = document.getElementById('click-count');
    const messageEl = document.getElementById('click-message');
    let count = 0;

    const milestoneMessages = {
        1: 'Nice! Keep going!',
        5: 'Sascha would be proud.',
        10: 'Now THAT\'s dedication.',
        25: 'You really love Sascha, huh?',
        50: 'Okay this is getting serious.',
        69: 'Nice.',
        100: 'You absolute LEGEND. 🏆',
        150: 'Your finger must hurt.',
        200: 'Sascha has been notified of your devotion.',
        300: 'At this point you deserve a medal.',
        420: 'Blaze it (responsibly).',
        500: 'FIVE HUNDRED. You are unhinged. We love you.',
        666: 'The devil appreciates your clicks.',
        777: 'JACKPOT! 🎰',
        1000: 'ONE THOUSAND. This website is now YOUR website. Congrats.',
    };

    btn.addEventListener('click', () => {
        count++;
        countEl.textContent = count;

        // Scale animation
        btn.style.transform = 'scale(0.85)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);

        // Spawn a mini emoji burst
        for (let i = 0; i < 3; i++) {
            spawnClickEmoji(btn);
        }

        // Milestone messages
        if (milestoneMessages[count]) {
            messageEl.textContent = milestoneMessages[count];
            messageEl.style.color = '#FFD700';
            setTimeout(() => {
                messageEl.style.color = 'rgba(255,255,255,0.4)';
            }, 3000);
        }

        // Mega mode at certain thresholds
        if (count % 50 === 0) {
            btn.classList.add('mega');
            setTimeout(() => btn.classList.remove('mega'), 500);
        }

        // Change button color gradually
        const hue = (count * 3) % 360;
        btn.style.borderColor = `hsl(${hue}, 100%, 60%)`;
    });

    function spawnClickEmoji(button) {
        const emojis = ['❤️', '⭐', '🎉', '✨', '💖', '🔥', '🌯', '🐴'];
        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'absolute';
        emoji.style.fontSize = '1.5rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '100';

        const rect = button.getBoundingClientRect();
        emoji.style.left = rect.left + rect.width / 2 + (Math.random() - 0.5) * 60 + 'px';
        emoji.style.top = rect.top + 'px';

        emoji.style.transition = 'all 1s ease-out';
        document.body.appendChild(emoji);

        requestAnimationFrame(() => {
            emoji.style.transform = `translateY(-${80 + Math.random() * 80}px) rotate(${Math.random() * 360}deg)`;
            emoji.style.opacity = '0';
        });

        setTimeout(() => emoji.remove(), 1000);
    }
}

/* ============================================
   FAKE LOADING SECTION
   ============================================ */
function initLoadingSection() {
    const progressBar = document.getElementById('fake-progress');
    const messages = document.querySelectorAll('#loading-messages p');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the loading animation
                progressBar.classList.add('animate');

                // Show messages one by one
                messages.forEach((msg, i) => {
                    setTimeout(() => {
                        msg.classList.add('show');
                    }, (i + 1) * 700);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.getElementById('loading-section'));
}

/* ============================================
   PONY SPARKLES
   ============================================ */
function initPonySparkles() {
    const container = document.getElementById('pony-sparkles');
    let isVisible = false;

    // Create sparkles when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
        });
    }, { threshold: 0.1 });

    observer.observe(document.getElementById('pony'));

    function spawnSparkle() {
        if (!isVisible) {
            requestAnimationFrame(() => setTimeout(spawnSparkle, 200));
            return;
        }

        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        sparkle.style.animationDelay = Math.random() * 0.5 + 's';

        const colors = ['#FFD700', '#FF69B4', '#00D4FF', '#fff', '#7FFF00'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.background = color;
        sparkle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;

        container.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 3000);

        setTimeout(spawnSparkle, 150 + Math.random() * 200);
    }

    spawnSparkle();
}

/* ============================================
   FOOTER FLOATING HEARTS
   ============================================ */
function initFooterHearts() {
    const container = document.getElementById('footer-hearts');
    let isVisible = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
        });
    }, { threshold: 0.1 });

    observer.observe(document.getElementById('footer'));

    function spawnHeart() {
        if (!isVisible) {
            setTimeout(spawnHeart, 500);
            return;
        }

        const heart = document.createElement('span');
        heart.classList.add('float-heart');
        const heartEmojis = ['❤️', '💖', '💕', '💗', '💝', '💜', '🧡', '💛'];
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);
        setTimeout(spawnHeart, 400 + Math.random() * 600);
    }

    spawnHeart();
}

/* ============================================
   PARALLAX EFFECT ON HERO
   ============================================ */
function initParallax() {
    // Skip parallax on touch devices — it needs mousemove
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;

    const hero = document.getElementById('hero');
    const heroContent = hero.querySelector('.hero-content');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        heroContent.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
}

/* ============================================
   SILLY PAGE TITLE ANIMATION
   ============================================ */
function initSillyPageTitle() {
    const titles = [
        'THE SASCHA EXPERIENCE',
        '✨ SASCHA ✨',
        '🌯 DONER QUEEN 🌯',
        '📸 BLUR MASTER 📸',
        '🐴 PONY WHISPERER 🐴',
        'SASCHA > EVERYONE',
        '🏄 SUP CHAMPION 🏄',
        'LOADING MORE SASCHA...',
    ];

    let i = 0;
    setInterval(() => {
        i = (i + 1) % titles.length;
        document.title = titles[i];
    }, 3000);
}

/* ============================================
   TESTIMONIALS CAROUSEL
   ============================================ */
function initTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('testimonial-dots');
    let currentIndex = 0;

    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.testimonial-dot');

    function goToSlide(index) {
        cards[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = index;
        cards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Auto-rotate every 4 seconds
    setInterval(() => {
        goToSlide((currentIndex + 1) % cards.length);
    }, 4000);
}

/* ============================================
   RIGGED SLIDER (always snaps back to 10)
   ============================================ */
function initRiggedSlider() {
    const slider = document.getElementById('rigged-slider');
    const valueDisplay = document.getElementById('slider-value');
    const message = document.getElementById('slider-message');

    const messages = {
        10: 'Perfect score. As expected.',
        9: 'Almost... but no. Try again.',
        8: 'You think 8 is acceptable? Think again.',
        7: 'Seven?! SEVEN?! How dare you.',
        6: "That's mathematically incorrect.",
        5: 'The slider has feelings, you know.',
        4: 'The pony just fainted from disrespect.',
        3: 'SECURITY! We have a problem here!',
        2: 'The doner is VERY upset with you.',
        1: 'ERROR: Value too low. Sascha.exe has crashed.',
    };

    slider.addEventListener('input', () => {
        const val = parseInt(slider.value);
        valueDisplay.textContent = val + '/10';
        message.textContent = messages[val] || 'Hmm...';

        if (val < 10) {
            message.style.color = '#e94560';
            // Snap back to 10 after a brief moment
            setTimeout(() => {
                slider.value = 10;
                valueDisplay.textContent = '10/10';
                message.textContent = 'Nice try. The correct answer is 10. It\'s always 10.';
                message.style.color = '#7FFF00';
                setTimeout(() => {
                    message.textContent = 'Perfect score. As expected.';
                    message.style.color = 'rgba(255,255,255,0.5)';
                }, 2000);
            }, 1200);
        }
    });
}

/* ============================================
   COOLNESS TEST (rigged, Sascha always wins)
   ============================================ */
function initCoolnessTest() {
    const input = document.getElementById('name-input');
    const btn = document.getElementById('coolness-btn');
    const result = document.getElementById('coolness-result');

    const responses = [
        "HAHAHA. No. {name} is cool, but Sascha is cooler. It's science.",
        "We ran the numbers. {name}: 7.2/10 coolness. Sascha: infinity/10. Sorry.",
        "{name}? More like {name}-NOT-AS-COOL-AS-SASCHA. (We're sorry.)",
        "Our advanced algorithm determined that {name} is approximately 0.003% as cool as Sascha.",
        "NOPE. Sascha wins. {name} gets a participation trophy though. 🏆",
        "We asked the pony. The pony said '{name} who?' Brutal. Savage. Rekt.",
        "Error: Cannot compute. {name}'s coolness is too low relative to Sascha.",
    ];

    btn.addEventListener('click', () => {
        const name = input.value.trim() || 'Anonymous';
        const response = responses[Math.floor(Math.random() * responses.length)];
        result.textContent = response.replace(/\{name\}/g, name);

        // Shake the result in
        result.style.animation = 'none';
        result.offsetHeight; // force reflow
        result.style.animation = 'fadeSlideUp 0.5s ease forwards';
    });

    // Also trigger on Enter
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
    });
}

/* ============================================
   DON'T CLICK THIS BUTTON (it runs away)
   ============================================ */
function initDontClickBtn() {
    const btn = document.getElementById('dont-click-btn');
    const message = document.getElementById('dont-click-message');
    let clickCount = 0;
    let clones = [];

    const messages = [
        "I SAID DON'T CLICK!",
        "Are you serious right now?",
        "Okay that's it. I'm leaving.",
        "YOU CAN'T CATCH ME",
        "STOP IT",
        "I'm multiplying now. Good luck.",
        "This is getting out of hand.",
        "You brought this on yourself.",
    ];

    btn.addEventListener('click', () => {
        clickCount++;
        message.textContent = messages[Math.min(clickCount - 1, messages.length - 1)];

        if (clickCount >= 3) {
            // Button starts running away
            btn.classList.add('running');
            moveButton(btn);
        }

        if (clickCount >= 6) {
            // Spawn clone buttons
            const clone = btn.cloneNode(true);
            clone.classList.add('running', 'tiny');
            clone.textContent = 'HELP';
            clone.style.left = Math.random() * (window.innerWidth - 100) + 'px';
            clone.style.top = Math.random() * (window.innerHeight - 50) + 'px';
            document.body.appendChild(clone);
            clones.push(clone);

            // Make clones run from cursor
            clone.addEventListener('mouseenter', () => moveButton(clone));
            clone.addEventListener('click', () => {
                clone.textContent = '💀';
                setTimeout(() => clone.remove(), 500);
            });
        }

        if (clickCount >= 10) {
            // Calm down - remove all clones after chaos
            message.textContent = "Okay okay, you win. Everyone calm down.";
            setTimeout(() => {
                clones.forEach(c => c.remove());
                clones = [];
                btn.classList.remove('running');
                btn.style.position = '';
                btn.style.left = '';
                btn.style.top = '';
                clickCount = 0;
                setTimeout(() => {
                    message.textContent = "";
                    btn.textContent = "DO NOT CLICK THIS";
                }, 2000);
            }, 2000);
        }
    });

    function moveButton(button) {
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 60;
        button.style.left = Math.random() * maxX + 'px';
        button.style.top = Math.random() * maxY + 'px';
    }

    // Make button dodge the mouse
    btn.addEventListener('mouseenter', () => {
        if (clickCount >= 3) {
            moveButton(btn);
        }
    });
}

/* ============================================
   KONAMI CODE EASTER EGG
   (Up Up Down Down Left Right Left Right B A)
   ============================================ */
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiIndex = 0;
    const overlay = document.getElementById('konami-overlay');

    document.addEventListener('keydown', (e) => {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

        if (key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateUltimateSaschaMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateUltimateSaschaMode() {
        // Show the overlay
        overlay.classList.remove('hidden');
        document.body.classList.add('konami-mode');

        // Big confetti burst
        initConfetti();

        // Close overlay on click
        overlay.addEventListener('click', () => {
            overlay.classList.add('hidden');
        }, { once: true });

        // Auto-close after 4 seconds
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 4000);

        // The konami body class stays forever (cursor change, extra animations)
    }
}

/* ============================================
   INTRO MUSIC (Web Audio API Synth Jingle)
   ============================================ */
function initIntroMusic() {
    let audioCtx = null;
    let isPlaying = false;
    let musicNodes = [];
    let loopInterval = null;

    // Create the floating music toggle button
    const btn = document.createElement('button');
    btn.classList.add('music-toggle');
    btn.setAttribute('aria-label', 'Toggle music');
    btn.innerHTML = `
        <span class="music-icon">
            <span class="bars">
                <span class="bar" style="height:6px"></span>
                <span class="bar" style="height:6px"></span>
                <span class="bar" style="height:6px"></span>
                <span class="bar" style="height:6px"></span>
            </span>
        </span>
    `;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        if (isPlaying) {
            stopMusic();
        } else {
            playMusic();
        }
    });

    function createAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playMusic() {
        const ctx = createAudioContext();
        isPlaying = true;
        btn.classList.add('playing');

        // Fun, upbeat melody — bouncy and catchy
        // Notes as frequencies (C major pentatonic + extras)
        const NOTE = {
            C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00,
            A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25,
            G3: 196.00, A3: 220.00, B3: 246.94, F5: 698.46, G5: 783.99
        };

        // Main melody: fun, bouncy, loopable (in 8th notes, BPM ~140)
        const bpm = 140;
        const eighth = 60 / bpm / 2; // duration of an 8th note
        const melody = [
            { note: NOTE.C5, dur: 1 },
            { note: NOTE.E5, dur: 1 },
            { note: NOTE.G4, dur: 1 },
            { note: NOTE.A4, dur: 1 },
            { note: NOTE.E5, dur: 2 },
            { note: NOTE.D5, dur: 1 },
            { note: NOTE.C5, dur: 1 },

            { note: NOTE.A4, dur: 1 },
            { note: NOTE.G4, dur: 1 },
            { note: NOTE.A4, dur: 1 },
            { note: NOTE.C5, dur: 1 },
            { note: NOTE.D5, dur: 2 },
            { note: null,     dur: 2 }, // rest

            { note: NOTE.E5, dur: 1 },
            { note: NOTE.D5, dur: 1 },
            { note: NOTE.C5, dur: 1 },
            { note: NOTE.A4, dur: 1 },
            { note: NOTE.G4, dur: 2 },
            { note: NOTE.E4, dur: 1 },
            { note: NOTE.G4, dur: 1 },

            { note: NOTE.A4, dur: 1 },
            { note: NOTE.C5, dur: 1 },
            { note: NOTE.D5, dur: 1 },
            { note: NOTE.E5, dur: 1 },
            { note: NOTE.C5, dur: 3 },
            { note: null,     dur: 1 }, // rest
        ];

        // Bass line (simple root notes, whole notes)
        const bass = [
            { note: NOTE.C4 / 2, dur: 8 },
            { note: NOTE.A3 / 2, dur: 8 },
            { note: NOTE.F4 / 2, dur: 8 },
            { note: NOTE.G3 / 2, dur: 8 },
        ];

        function playSequence() {
            if (!isPlaying) return;
            const startTime = ctx.currentTime + 0.05;

            // Master gain
            const masterGain = ctx.createGain();
            masterGain.gain.value = 0.3;
            masterGain.connect(ctx.destination);
            musicNodes.push(masterGain);

            // Play melody
            let melodyTime = startTime;
            melody.forEach(({ note, dur }) => {
                if (note !== null) {
                    // Main osc (square for retro feel)
                    const osc = ctx.createOscillator();
                    osc.type = 'square';
                    osc.frequency.value = note;

                    const gain = ctx.createGain();
                    gain.gain.setValueAtTime(0.15, melodyTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, melodyTime + dur * eighth - 0.02);

                    osc.connect(gain);
                    gain.connect(masterGain);

                    osc.start(melodyTime);
                    osc.stop(melodyTime + dur * eighth);
                    musicNodes.push(osc, gain);

                    // Add a soft triangle harmony an octave lower
                    const osc2 = ctx.createOscillator();
                    osc2.type = 'triangle';
                    osc2.frequency.value = note / 2;

                    const gain2 = ctx.createGain();
                    gain2.gain.setValueAtTime(0.06, melodyTime);
                    gain2.gain.exponentialRampToValueAtTime(0.01, melodyTime + dur * eighth - 0.02);

                    osc2.connect(gain2);
                    gain2.connect(masterGain);

                    osc2.start(melodyTime);
                    osc2.stop(melodyTime + dur * eighth);
                    musicNodes.push(osc2, gain2);
                }
                melodyTime += dur * eighth;
            });

            // Play bass
            let bassTime = startTime;
            bass.forEach(({ note, dur }) => {
                if (note !== null) {
                    const osc = ctx.createOscillator();
                    osc.type = 'triangle';
                    osc.frequency.value = note;

                    const gain = ctx.createGain();
                    gain.gain.setValueAtTime(0.12, bassTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, bassTime + dur * eighth - 0.05);

                    osc.connect(gain);
                    gain.connect(masterGain);

                    osc.start(bassTime);
                    osc.stop(bassTime + dur * eighth);
                    musicNodes.push(osc, gain);
                }
                bassTime += dur * eighth;
            });

            // Simple percussion (noise bursts on beats)
            const totalDuration = melody.reduce((sum, n) => sum + n.dur, 0);
            for (let i = 0; i < totalDuration; i += 2) {
                const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
                const data = noiseBuffer.getChannelData(0);
                for (let s = 0; s < data.length; s++) {
                    data[s] = (Math.random() * 2 - 1) * 0.3;
                }
                const noise = ctx.createBufferSource();
                noise.buffer = noiseBuffer;

                const noiseGain = ctx.createGain();
                noiseGain.gain.setValueAtTime(i % 4 === 0 ? 0.08 : 0.04, startTime + i * eighth);
                noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + i * eighth + 0.05);

                noise.connect(noiseGain);
                noiseGain.connect(masterGain);
                noise.start(startTime + i * eighth);
                musicNodes.push(noise, noiseGain);
            }

            // Loop duration = total 8th notes * eighth duration
            const loopDuration = totalDuration * eighth * 1000;
            loopInterval = setTimeout(playSequence, loopDuration - 50);
        }

        playSequence();
    }

    function stopMusic() {
        isPlaying = false;
        btn.classList.remove('playing');

        if (loopInterval) {
            clearTimeout(loopInterval);
            loopInterval = null;
        }

        // Gracefully disconnect all nodes
        musicNodes.forEach(node => {
            try {
                if (node.stop) node.stop();
                node.disconnect();
            } catch (e) { /* already stopped */ }
        });
        musicNodes = [];
    }
}

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */
function initConsoleEasterEgg() {
    console.log('%c STOP! ', 'color: red; font-size: 72px; font-weight: bold; text-shadow: 3px 3px 0 #000;');
    console.log('%c This is Sascha\'s website. No hacking allowed. ', 'font-size: 18px; color: #FF69B4; font-family: Comic Sans MS;');
    console.log('%c Sascha is watching you right now. 👀 ', 'font-size: 14px; color: gray;');
    console.log('%c Try the Konami Code for a secret... ⬆⬆⬇⬇⬅➡⬅➡BA ', 'font-size: 12px; color: #FFD700;');
    console.log('%c 🐴 The pony approves this message. ', 'font-size: 12px; color: #7FFF00;');
}
