/**
 * Dr. Sameer Shroff - Portfolio & Technical Services
 * Pure Vanilla JavaScript Client Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjectFiltering();
  initProjectModal();
  initContactForm();
  initClipboard();
  initBackToTop();
  setCurrentYear();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to stored theme or system preference (or dark as default)
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

/* ==========================================================================
   2. Responsive Navigation & Scroll Spy
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky header class toggle
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active Link Tracking via Scroll position
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          links.forEach(l => l.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  }
}

/* ==========================================================================
   3. Projects Filter Bar
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Project Deep-Dive Modal
   ========================================================================== */
const projectData = {
  'pinn-dynamics': {
    tag: 'Machine Learning & Dynamics',
    title: 'Physics-Informed Neural Networks for High-Dimensional Dynamical Systems',
    overview: 'Developed physics-informed deep learning architectures (PINNs) and neural surrogate models that embed conservation laws and Hamiltonian invariants directly into the loss function.',
    methodology: [
      'Implemented automatic differentiation workflows to evaluate continuous spatial and temporal derivatives.',
      'Enforced dynamic equilibrium equations as soft constraints in the loss formulation, bounding extrapolation error.',
      'Trained deep operator networks (DeepONets) to map parametric operational variations to full-field stress-strain responses.',
      'Validated surrogate models against high-fidelity non-linear transient FEA datasets.'
    ],
    outcomes: [
      'Accelerated nonlinear transient response evaluation by over 450x compared to standard explicit solvers.',
      'Maintained global energy and momentum conservation to within 0.15% error bounds.',
      'Enabled near real-time surrogate queries for design optimization and digital-twin calibration.'
    ],
    tech: ['Python', 'PyTorch', 'Scientific Computing', 'Surrogate Modeling', 'Nonlinear Dynamics', 'NumPy/SciPy']
  },
  'mems-friction': {
    tag: 'Mechanics of Materials',
    title: 'Micromechanical Friction & Contact Dynamics in MEMS',
    overview: 'Doctoral research and applied investigation at Carnegie Mellon University focusing on tribological behavior, contact topography, adhesion mechanics, and dynamic friction at the micro- and nanoscale.',
    methodology: [
      'Designed and executed in-situ micro-tribometer experiments to measure friction forces and shear strength under controlled environmental conditions.',
      'Formulated multi-asperity contact mechanics models incorporating real surface roughness metrics from atomic force microscopy (AFM).',
      'Developed analytical friction evolution equations accounting for capillary condensation and surface passivation coatings.'
    ],
    outcomes: [
      'Published foundational research on friction transitions and static-to-dynamic contact stability in micro-devices.',
      'Predicted wear degradation thresholds and prolonged MEMS actuator longevity in critical applications.',
      'Mentored junior researchers and fellows in experimental mechanics techniques and data reduction.'
    ],
    tech: ['Experimental Mechanics', 'MEMS', 'Tribology', 'Surface Mechanics', 'AFM', 'MATLAB']
  },
  'shock-dynamics': {
    tag: 'Computational Simulation',
    title: 'Nonlinear Structural Dynamics & Extreme Shock Response',
    overview: 'Advanced transient dynamic modeling of structural components subject to extreme mechanical shocks, dynamic impact, and multi-axial cyclic loading.',
    methodology: [
      'Formulated large-deformation, elastoplastic continuum models using explicit and implicit numerical integration schemes.',
      'Constructed parameterized FE meshes with localized refinement around stress concentrators and contact interfaces.',
      'Executed modal and transient response spectrum analyses to identify resonance frequencies and shock transmission pathways.'
    ],
    outcomes: [
      'Quantified critical stress concentrations and safety margins under stringent qualification requirements.',
      'Formulated localized dampening and structural redesign recommendations to arrest crack initiation.',
      'Delivered comprehensive design verification reports for high-consequence engineering hardware.'
    ],
    tech: ['FEA', 'Structural Dynamics', 'Abaqus / ANSYS', 'Shock Analysis', 'Continuum Mechanics', 'Python']
  },
  'constitutive-modeling': {
    tag: 'Mechanics & Simulation',
    title: 'Automated Multi-Scale Constitutive Modeling Pipeline',
    overview: 'Engineered an automated algorithmic framework that calibrates crystal plasticity and continuum yield surfaces from microstructural characterization and mechanical test data.',
    methodology: [
      'Built a parameter optimization engine using Bayesian optimization and gradient-free genetic algorithms.',
      'Bridged representative volume element (RVE) micromechanical simulations with macro-scale anisotropic yield criteria.',
      'Created custom user-defined material subroutines (UMAT / VUMAT) in Fortran and C++ for seamless FE integration.'
    ],
    outcomes: [
      'Cut constitutive parameter calibration cycle time from days to hours.',
      'Enhanced fidelity of ductile damage prediction under complex non-proportional loading trajectories.',
      'Standardized automated testing verification suites across engineering teams.'
    ],
    tech: ['Constitutive Modeling', 'Multi-Scale FEA', 'Python Automation', 'UMAT/VUMAT', 'Bayesian Optimization']
  },
  'scientific-toolkit': {
    tag: 'Scientific Software',
    title: 'High-Performance Scientific Computing Toolkit',
    overview: 'A clean, high-performance modular toolkit for scientific dynamics simulations, state-space modeling, automated signal filtering, and modal identification.',
    methodology: [
      'Implemented vectorized sparse matrix solvers and adaptive Runge-Kutta numerical integrators.',
      'Built an end-to-end data pipeline for spectral analysis, fast Fourier transforms (FFT), and dynamic mode decomposition (DMD).',
      'Designed a streamlined Python API with optimized C/C++ backend kernels.'
    ],
    outcomes: [
      'Enabled rapid prototyping of control algorithms and physical system identification.',
      'Distributed internally for multi-disciplinary engineering analysis and data processing.',
      'Features full unit test coverage and automated documentation generators.'
    ],
    tech: ['Python', 'C/C++', 'NumPy', 'SciPy', 'DMD', 'Signal Processing']
  },
  'thermal-structural': {
    tag: 'Computational Simulation',
    title: 'Coupled Multi-Physics Thermal-Stress Assessment',
    overview: 'High-fidelity coupled thermal-structural analysis for components subjected to severe thermal gradients, transient heating cycles, and creep-fatigue interaction.',
    methodology: [
      'Implemented sequential and direct coupled thermal-mechanical field equations.',
      'Analyzed temperature-dependent non-linear material degradation and thermal expansion constraints.',
      'Evaluated cumulative fatigue usage factors according to industry ASME / nuclear design codes.'
    ],
    outcomes: [
      'Identified thermal fatigue risk hotspots prior to prototype fabrication.',
      'Optimized cooling geometries, reducing peak thermal stresses by 28%.',
      'Established codified safety margins under worst-case operational transients.'
    ],
    tech: ['Multi-Physics FEA', 'Thermal-Structural', 'Fatigue & Creep', 'ASME Boiler & Pressure Code', 'ANSYS']
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewDetailBtns = document.querySelectorAll('.view-project-btn');

  if (!modalOverlay) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-tag').textContent = data.tag;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-overview').textContent = data.overview;

    const methodList = document.getElementById('modal-methodology');
    methodList.innerHTML = '';
    data.methodology.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      methodList.appendChild(li);
    });

    const outcomesList = document.getElementById('modal-outcomes');
    outcomesList.innerHTML = '';
    data.outcomes.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      outcomesList.appendChild(li);
    });

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      techContainer.appendChild(span);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Contact Form Validation & Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Please provide details about your inquiry');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) return;

    // Construct Mailto Fallback Link to ensure user can directly send from their client
    const subject = encodeURIComponent(`[Website Inquiry] ${serviceInput.value} - ${nameInput.value}`);
    const body = encodeURIComponent(
      `Hello Dr. Shroff,\n\n` +
      `My name is ${nameInput.value} (${emailInput.value}).\n\n` +
      `Service / Project Scope: ${serviceInput.value}\n\n` +
      `Message:\n${messageInput.value}\n\n` +
      `Best regards,\n${nameInput.value}`
    );
    const mailtoUri = `mailto:ssmeer1988@gmail.com?subject=${subject}&body=${body}`;

    // Simulate sending / Trigger mailto
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showToast('Inquiry drafted! Launching your email client to send to ssmeer1988@gmail.com.');
      form.reset();
      window.location.href = mailtoUri;
    }, 600);
  });

  function showError(inputEl, msg) {
    inputEl.classList.add('invalid');
    const errorEl = inputEl.nextElementSibling;
    if (errorEl && errorEl.classList.contains('form-error')) {
      errorEl.textContent = msg;
    }
  }

  function clearError(inputEl) {
    inputEl.classList.remove('invalid');
  }

  // Remove errors on input
  form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });
}

/* ==========================================================================
   6. Copy to Clipboard Functionality
   ========================================================================== */
function initClipboard() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy') || 'ssmeer1988@gmail.com';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${textToCopy} to clipboard!`);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied ${textToCopy} to clipboard!`);
      });
    });
  });
}

/* ==========================================================================
   7. Toast Notification Handler
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span class="toast-message"></span>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   8. Back to Top Smooth Scroll
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   9. Set Current Dynamic Year
   ========================================================================== */
function setCurrentYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = year;
  });
}
