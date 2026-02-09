// Split text BEFORE anything else runs
function splitText(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const text = el.innerText;
    el.innerHTML = text.split('').map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
  });
}

// Run text splitting immediately
splitText('h1, h2, .edu h3');

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Faster loader fade
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        loader.style.display = 'none';
        // Immediate reveal logic for current view
        gsap.to('#home', { opacity: 1, scale: 1, duration: 0.8 });
        gsap.from('#home .char', {
          y: 20,
          opacity: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "expo.out"
        });
      }
    });
  }, 400); // Drastically reduced wait time

  // Add magnetic effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-2px)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });

  // Animate cards on scroll - DISABLED (conflicts with section visibility)
  // const cards = document.querySelectorAll('.card');
  // cards.forEach((card, index) => {
  //   gsap.from(card, {
  //     scrollTrigger: {
  //       trigger: card,
  //       start: 'top 85%',
  //       toggleActions: 'play none none reverse'
  //     },
  //     y: 50,
  //     opacity: 0,
  //     duration: 0.8,
  //     delay: index * 0.1,
  //     ease: "power3.out"
  //   });
  // });
});

// --- HUD MENU LOGIC ---
const menuToggle = document.getElementById('menu-toggle');
const hudMenu = document.getElementById('hud-menu');
const menuLinks = document.querySelectorAll('.menu-link');

// Character splitting for menu links - REMOVED (was hiding menu items)

menuToggle.addEventListener('click', () => {
  const isActive = hudMenu.classList.toggle('active');
  menuToggle.setAttribute('data-text', isActive ? 'CLOSE' : 'MENU');
  menuToggle.innerText = isActive ? 'CLOSE' : 'MENU';

  if (isActive) {
    // Simple stagger animation for menu links
    menuLinks.forEach((link, index) => {
      gsap.fromTo(link,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out"
        }
      );
    });
  }
});

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    hudMenu.classList.remove('active');
    menuToggle.setAttribute('data-text', 'MENU');
    menuToggle.innerText = 'MENU';

    gsap.to(window, {
      duration: 1.5,
      scrollTo: document.querySelector(target).offsetTop - 100,
      ease: "power3.inOut"
    });
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (hudMenu.classList.contains('active') &&
    !e.target.closest('#hud-menu .menu-content') &&
    !e.target.closest('#menu-toggle')) {
    hudMenu.classList.remove('active');
    menuToggle.setAttribute('data-text', 'MENU');
    menuToggle.innerText = 'MENU';
  }
});

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && hudMenu.classList.contains('active')) {
    hudMenu.classList.remove('active');
    menuToggle.setAttribute('data-text', 'MENU');
    menuToggle.innerText = 'MENU';
  }
});


// --- THREE.JS SPATIAL BACKGROUND ---
let scene, camera, renderer, spatialObjects = [], starsMesh;

try {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true, antialias: true });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(50);

  // Spacial Objects (Geometries representing "Innovation")
  const geometries = [
    new THREE.IcosahedronGeometry(8, 1)
  ];

  const materials = [
    new THREE.MeshStandardMaterial({ color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.2 })
  ];

  geometries.forEach((geo, i) => {
    const mesh = new THREE.Mesh(geo, materials[i]);
    mesh.position.set(0, 0, -20);
    scene.add(mesh);
    spatialObjects.push(mesh);
  });

  // Lights
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(20, 20, 20);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(pointLight, ambientLight);

  // Stars/Noise Field
  const starsGeometry = new THREE.BufferGeometry();
  const starsCount = 5000;
  const posArray = new Float32Array(starsCount * 3);
  for (let i = 0; i < starsCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 400;
  }
  starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const starsMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0x38bdf8, transparent: true, opacity: 0.4 });
  starsMesh = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starsMesh);

  function animate() {
    requestAnimationFrame(animate);
    spatialObjects.forEach((obj, i) => {
      obj.rotation.x += 0.002 * (i + 1);
      obj.rotation.y += 0.003 * (i + 1);
    });
    starsMesh.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
} catch (error) {
  console.warn('WebGL not available, skipping 3D background:', error);
  // Hide canvas if WebGL fails
  const canvas = document.getElementById('bg-canvas');
  if (canvas) canvas.style.display = 'none';
}

// --- GSAP ORANO-STYLE SPATIAL ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

// HUD Progress Indicator Logic
const indicators = document.querySelectorAll('.section-indicator');
const navSections = document.querySelectorAll('section');

function triggerGlitch() {
  const glitch = document.getElementById('glitch-overlay');
  glitch.classList.remove('trigger-glitch');
  void glitch.offsetWidth; // Trigger reflow
  glitch.classList.add('trigger-glitch');
}

navSections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => {
      activateIndicator(i);
      triggerGlitch();
    },
    onEnterBack: () => {
      activateIndicator(i);
      triggerGlitch();
    }
  });
});

function activateIndicator(index) {
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === index);
  });
}

indicators.forEach((ind, i) => {
  ind.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: navSections[i].offsetTop - 100,
      ease: "power3.inOut"
    });
  });
});

// 2. Spatial Camera Journey - DISABLED FOR STABILITY
// if (camera && scene) {
//   gsap.to(camera.position, {
//     scrollTrigger: {
//       trigger: 'body',
//       start: 'top top',
//       end: 'bottom bottom',
//       scrub: 1.5,
//     },
//     z: 100,
//     y: -50,
//     x: 20
//   });
// }

// 3. Section Visibility on Scroll - SIMPLIFIED
const sections = document.querySelectorAll('section');
sections.forEach((section, i) => {
  // Just ensure sections are visible, no fade out
  gsap.set(section, { opacity: 1 });

  // Optional: Add a subtle scale effect on enter
  ScrollTrigger.create({
    trigger: section,
    start: 'top 90%',
    onEnter: () => {
      gsap.from(section, {
        scale: 0.98,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  });
});

// 4. Glitch Button Data Prep
document.querySelectorAll('.btn, .resume-btn').forEach(btn => {
  const glitchTarget = btn.querySelector('.glitch-target');

  if (glitchTarget) {
    glitchTarget.classList.add('glitch-btn');
    glitchTarget.setAttribute('data-text', glitchTarget.innerText);
  } else {
    // If no specific target, apply to button (skip if it has an icon to avoid breakage)
    if (btn.querySelector('svg')) return;

    btn.classList.add('glitch-btn');
    btn.setAttribute('data-text', btn.innerText);
  }
});

// Animate tech stack items - DISABLED (hiding content)
// const techItems = document.querySelectorAll('.tech-item');
// gsap.from(techItems, {
//   scrollTrigger: {
//     trigger: '.tech-stack-grid',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   },
//   y: 30,
//   opacity: 0,
//   stagger: 0.05,
//   duration: 0.6,
//   ease: "back.out(1.2)"
// });

// Animate project cards - DISABLED (hiding content)
// const projects = document.querySelectorAll('.proj');
// gsap.from(projects, {
//   scrollTrigger: {
//     trigger: '.projects',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   },
//   y: 40,
//   opacity: 0,
//   stagger: 0.15,
//   duration: 0.8,
//   ease: "power3.out"
// });

// Animate certificate cards - DISABLED (hiding content)
// const certCards = document.querySelectorAll('.cert-card');
// gsap.from(certCards, {
//   scrollTrigger: {
//     trigger: '.certificates',
//     start: 'top 80%',
//     toggleActions: 'play none none reverse'
//   },
//   scale: 0.9,
//   opacity: 0,
//   stagger: 0.08,
//   duration: 0.6,
//   ease: "back.out(1.1)"
// });

// 5. Mouse Interaction for Spacial Depth - DISABLED FOR STABILITY
// document.addEventListener('mousemove', (e) => {
//   const x = (e.clientX / window.innerWidth - 0.5) * 4;
//   const y = (e.clientY / window.innerHeight - 0.5) * 4;

//   if (scene) {
//     gsap.to(scene.rotation, {
//       y: x * 0.1,
//       x: -y * 0.1,
//       duration: 1,
//       ease: "power2.out"
//     });
//   }

//   document.querySelectorAll('.card').forEach(card => {
//     const rx = (e.clientY - window.innerHeight / 2) / 30;
//     const ry = (window.innerWidth / 2 - e.clientX) / 30;
//     card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
//   });
// });

// --- CORE UTILITIES (MODALS, NAV) ---
const resumeModal = document.getElementById('resumeModal');
const resumeFrame = document.getElementById('resumeFrame');
const downloadBtn = document.getElementById('downloadResume');
const modalTitle = resumeModal ? resumeModal.querySelector('h3') : null;

function openPdfModal(pdfUrl, title) {
  if (!resumeModal || !resumeFrame) return;
  resumeFrame.src = '';
  setTimeout(() => {
    resumeFrame.src = pdfUrl + "#toolbar=0";
    if (downloadBtn) downloadBtn.href = pdfUrl;
    if (modalTitle) modalTitle.textContent = title;
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 10);
}

document.getElementById('openResume')?.addEventListener('click', () => openPdfModal('/assets/cv/srijan-pandey-cv.pdf', 'Srijan_Pandey_Resume.pdf'));

document.addEventListener('click', (e) => {
  const certCard = e.target.closest('.cert-card');
  if (certCard) {
    if (e.target.closest('.download')) return;
    const pdfUrl = certCard.getAttribute('data-pdf');
    const title = certCard.getAttribute('data-title') || 'Certificate.pdf';
    if (pdfUrl) openPdfModal(pdfUrl, title);
  }
});

document.getElementById('closeResume')?.addEventListener('click', () => {
  resumeModal.classList.remove('active');
  document.body.style.overflow = '';
  resumeFrame.src = '';
});

document.addEventListener("click", (e) => {
  if (resumeModal && e.target === resumeModal) {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
    resumeFrame.src = '';
  }
});
