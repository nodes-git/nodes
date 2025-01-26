// Immediate console log to verify script loading
console.log('Script loaded');

// Loader Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-container');
    const mainContent = document.querySelector('.main-content');
    const letters = document.querySelectorAll('.loader-text span');
    const oFill = document.querySelector('.o-fill');
    const loaderLogo = document.querySelector('.loader-logo');
    const loaderCircle = document.querySelector('.loader-circle');
    
    // Timeline for the animation sequence
    const tl = gsap.timeline();
    
    // Type out NODES
    letters.forEach((letter, index) => {
        tl.to(letter, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        }, index * 0.15);
    });
    
    // Animate O fill
    tl.to(oFill, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
    })
    
    // O breathing animation
    .to(oFill, {
        scale: 1.2,
        duration: 0.8,
        repeat: 2,
        yoyo: true,
        ease: 'power1.inOut'
    })
    
    // Expand O to fill screen
    .to(oFill, {
        scale: 50,
        duration: 1,
        ease: 'power2.inOut'
    })
    
    // Hide loader and show content
    .to(loader, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            loader.style.display = 'none';
            mainContent.style.visibility = 'visible';
            gsap.to(mainContent, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
});

// 3D Animation
let scene, camera, renderer, particles;

function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('hero-canvas').appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
        
        colors[i] = 0;
        colors[i + 1] = 1; // cyan
        colors[i + 2] = 1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    camera.position.z = 5;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
    });
    
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
        
        particles.rotation.x += mouseY * 0.5;
        particles.rotation.y += mouseX * 0.5;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize 3D scene
init3D();

// Mobile Menu
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    menuIcon.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuIcon.contains(e.target)) {
        menuIcon.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// GSAP Animations
const heroTimeline = gsap.timeline({ delay: 1.5 });

heroTimeline
    .from('.hero-content', {
        duration: 1,
        opacity: 0,
        y: 100,
        ease: "power4.out"
    })
    .from('.hero h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    }, "-=0.5")
    .from('.hero p', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out"
    }, "-=0.7")
    .from('.cta-btn', {
        duration: 1,
        y: 20,
        opacity: 0,
        ease: "power3.out"
    }, "-=0.7");

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Scroll Animations

// Service cards animation
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        delay: i * 0.1,
        ease: "power3.out"
    });
});

// Contact form animation
gsap.from('#contact-form', {
    scrollTrigger: {
        trigger: '#contact-form',
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    },
    duration: 1,
    opacity: 0,
    y: 50,
    ease: "power3.out"
});

// Services Section Animations

// Section header animation
gsap.from('.section-header', {
    scrollTrigger: {
        trigger: '.section-header',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Service cards stagger animation
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services-grid',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: {
        amount: 0.6,
        grid: 'auto',
        from: 'start'
    },
    ease: 'power3.out'
});

// Service cards hover effect
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Parallax effect on service cards
serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 20;
        const yPercent = (y / rect.height - 0.5) * 20;
        
        gsap.to(card, {
            rotationY: xPercent,
            rotationX: -yPercent,
            duration: 0.5,
            ease: 'power1.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'power1.out'
        });
    });
});

// Navbar scroll effect
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector('nav');
    
    if (prevScrollpos > currentScrollPos) {
        navbar.style.transform = "translate(-50%, 0)";
    } else {
        navbar.style.transform = "translate(-50%, -100%)";
    }
    prevScrollpos = currentScrollPos;
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing form handling');
    
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.submit-btn');
    const successPopup = document.getElementById('successPopup');
    
    console.log('Form found:', form);
    console.log('Submit button found:', submitBtn);
    console.log('Popup found:', successPopup);

    // Initialize Supabase
    const supabaseUrl = 'https://wesgmamdvqheffusxrjx.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlc2dtYW1kdnFoZWZmdXN4cmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzI1MzIsImV4cCI6MjA1MTM0ODUzMn0.-jN5nl5St6LYq3HG1ctoxZuDcpuW8fMxsYzdFECiPwQ';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    function showPopup() {
        successPopup.classList.add('show');
        setTimeout(() => {
            successPopup.classList.remove('show');
        }, 3000);
    }

    // Handle form submission
    form.onsubmit = async function(e) {
        e.preventDefault();
        console.log('Form submission started');

        // Validate form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = (document.getElementById('country-code').value + document.getElementById('phone').value).trim();

        if (!name || !email || !phone) {
            console.error('Form validation failed');
            submitBtn.innerHTML = 'Please fill all fields <span>↺</span>';
            submitBtn.style.backgroundColor = '#ff0000';
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error('Invalid email format');
            submitBtn.innerHTML = 'Invalid email format <span>↺</span>';
            submitBtn.style.backgroundColor = '#ff0000';
            return false;
        }

        const formData = {
            name,
            email,
            phone,
            submitted_at: new Date().toISOString()
        };

        console.log('Form data:', formData);

        // Show loading state
        submitBtn.innerHTML = 'Sending... <span>→</span>';
        submitBtn.disabled = true;

        try {
            console.log('Attempting to submit to Supabase...');
            
            // Check if Supabase client is initialized
            if (!supabase) {
                throw new Error('Supabase client not initialized');
            }

            const { data, error } = await supabase
                .from('contacts')
                .insert([formData]);

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            console.log('Submission successful:', data);
            
            // Reset form
            form.reset();
            
            // Show success state
            submitBtn.innerHTML = 'Sent Successfully <span>✓</span>';
            submitBtn.style.backgroundColor = '#00ff00';
            showPopup();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = 'Get Started <span>→</span>';
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 2000);

        } catch (error) {
            console.error('Submission error:', error);
            
            // Show specific error message based on error type
            let errorMessage = 'Error! Try Again';
            if (error.message.includes('network')) {
                errorMessage = 'Network Error! Check Connection';
            } else if (error.message.includes('not initialized')) {
                errorMessage = 'Service Error! Try Later';
            }
            
            submitBtn.innerHTML = `${errorMessage} <span>↺</span>`;
            submitBtn.style.backgroundColor = '#ff0000';
            submitBtn.disabled = false;
        }

        return false;
    };
});
