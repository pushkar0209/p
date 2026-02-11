document.addEventListener('DOMContentLoaded', () => {
    // Music Control
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.play().catch(e => console.log("Audio play failed: ", e));
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // Envelope Interaction
    const envelope = document.getElementById('open-envelope');
    const promisesSection = document.getElementById('promises');

    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            scrollToSection('promises');
            promisesSection.classList.add('active');
        }, 1000); // Wait for open animation
    });

    // Intersection Observer for Fade-in effects
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.screen').forEach(section => {
        observer.observe(section);
    });

    // Typing Effect for Final Message
    const text = "To the love of my life, thank you for making every day brighter. I promise to cherish you always. Happy Promise Day! ❤️";
    const typingElement = document.getElementById('typing-text');
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    // Trigger typing when message section is in view
    const messageSection = document.getElementById('message');
    const msgObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (typingElement.innerHTML === "") { // Only type once
                typeWriter();
                startConfetti();
            }
        }
    }, { threshold: 0.5 });

    msgObserver.observe(messageSection);

    // Celebrate Button
    document.getElementById('celebrate-btn').addEventListener('click', () => {
        startConfetti();
        alert("I Love You Bujji! ❤️");
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            // Small delay to allow display flex to apply before opacity transition
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        }
    });
});

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.classList.add('active'); // Ensure it fades in
    }
}

// Simple Confetti Implementation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function startConfetti() {
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 6.2
        });
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.y += p.speed;
        p.x += Math.sin(p.angle);
        p.angle += 0.05;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.y > canvas.height) {
            particles.splice(index, 1);
        }
    });

    if (particles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
