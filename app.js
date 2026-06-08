document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupScrollspy();
  setupCodeCopy();
  setupTerminalSimulation();
  setupAdPopup();
});

// =============================================
// 1. Tab Switcher Logic
// =============================================
function setupTabs() {
  const navButtons = document.querySelectorAll('.nav-btn[data-tab]');
  const tabContents = document.querySelectorAll('.tab-content');
  const getStartedBtn = document.getElementById('hero-get-started');

  function switchTab(tabId) {
    navButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabContents.forEach(content => {
      if (content.id === `tab-${tabId}`) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    // Handle ad visibility based on active tab
    if (tabId === 'home') {
      showAdPopup();
    } else {
      hideAdPopup();
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // CTA button triggers docs tab and scrolls to top
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      switchTab('docs');
      const readerPanel = document.getElementById('docs-reader-panel');
      if (readerPanel) {
        readerPanel.scrollTop = 0;
      }
    });
  }
}

// =============================================
// 2. Scrollspy & Sidebar Smooth Scrolling
// =============================================
function setupScrollspy() {
  const readerPanel = document.getElementById('docs-reader-panel');
  const sections = document.querySelectorAll('.doc-section');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  if (!readerPanel || sections.length === 0 || sidebarLinks.length === 0) return;

  // Click handler: scroll smoothly to target section (handles mobile and desktop scrolling)
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          // On mobile, the window itself scrolls, offset by sticky horizontal header and sidebar (110px)
          const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        } else {
          // On desktop, the reader panel scrolls internally
          const containerTop = readerPanel.getBoundingClientRect().top;
          const targetTop = targetSection.getBoundingClientRect().top;
          const scrollPosition = readerPanel.scrollTop + (targetTop - containerTop) - 20;

          readerPanel.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scroll handler: highlight sidebar link based on scroll position (handles window scrolling on mobile, container on desktop)
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  };

  readerPanel.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', handleScroll);

  function updateActiveSection() {
    const isMobile = window.innerWidth <= 768;
    let activeSectionId = '';

    if (isMobile) {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Check if we are at the bottom of the page
      if (scrollY + clientHeight >= scrollHeight - 30) {
        activeSectionId = sections[sections.length - 1].id;
      } else if (scrollY <= 50) {
        activeSectionId = sections[0].id;
      } else {
        // Find which section is visible under the sticky horizontal nav (120px offset)
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionTop = sections[i].getBoundingClientRect().top; // relative to viewport
          if (sectionTop <= 130) {
            activeSectionId = sections[i].id;
            break;
          }
        }
      }
    } else {
      const containerTop = readerPanel.getBoundingClientRect().top;
      const scrollTop = readerPanel.scrollTop;
      const scrollHeight = readerPanel.scrollHeight;
      const clientHeight = readerPanel.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        activeSectionId = sections[sections.length - 1].id;
      } else if (scrollTop === 0) {
        activeSectionId = sections[0].id;
      } else {
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionTop = sections[i].getBoundingClientRect().top;
          if (sectionTop - containerTop <= 80) {
            activeSectionId = sections[i].id;
            break;
          }
        }
      }
    }

    if (activeSectionId) {
      sidebarLinks.forEach(link => {
        if (link.getAttribute('data-target') === activeSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Scroll sidebar to keep active link visible (supports vertical sidebar for desktop and horizontal for mobile)
      const activeLink = document.querySelector('.sidebar-link.active');
      const sidebar = document.getElementById('docs-sidebar');
      if (activeLink && sidebar) {
        const isHorizontal = window.innerWidth <= 768;
        if (isHorizontal) {
          const linkLeft = activeLink.offsetLeft;
          const sidebarScrollLeft = sidebar.scrollLeft;
          const sidebarWidth = sidebar.clientWidth;

          if (linkLeft < sidebarScrollLeft || linkLeft > sidebarScrollLeft + sidebarWidth - 80) {
            sidebar.scrollTo({
              left: linkLeft - sidebarWidth / 3,
              behavior: 'smooth'
            });
          }
        } else {
          const linkTop = activeLink.offsetTop;
          const sidebarScrollTop = sidebar.scrollTop;
          const sidebarHeight = sidebar.clientHeight;

          if (linkTop < sidebarScrollTop || linkTop > sidebarScrollTop + sidebarHeight - 40) {
            sidebar.scrollTo({
              top: linkTop - sidebarHeight / 3,
              behavior: 'smooth'
            });
          }
        }
      }
    }
  }
}

// =============================================
// 3. Code Clipboard Copy Helper
// =============================================
function setupCodeCopy() {
  const copyButtons = document.querySelectorAll('.code-copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const container = button.closest('.code-container');
      const codeBlock = container.querySelector('.code-block');
      const textToCopy = codeBlock.textContent;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ copied';
        button.style.borderColor = 'var(--accent-primary)';
        button.style.color = 'var(--accent-primary)';

        setTimeout(() => {
          button.textContent = originalText;
          button.style.borderColor = '';
          button.style.color = '';
        }, 1500);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });
}

// =============================================
// 4. Retro Terminal Simulator
// =============================================
function setupTerminalSimulation() {
  const inputEl = document.getElementById('term-input');
  const termBody = document.getElementById('term-body');

  if (!inputEl || !termBody) return;

  const command = 'devmemory watch';
  let charIdx = 0;

  function appendLine(text, className = 'term-output') {
    const div = document.createElement('div');
    div.className = 'term-line';

    if (className === 'term-prompt') {
      div.innerHTML = `<span class="term-prompt">${text}</span>`;
    } else {
      div.className = `term-line ${className}`;
      div.textContent = text;
    }

    termBody.appendChild(div);
    termBody.scrollTop = termBody.scrollHeight;
  }

  // Typing effect
  function typeCommand() {
    if (charIdx < command.length) {
      inputEl.textContent += command.charAt(charIdx);
      charIdx++;
      setTimeout(typeCommand, 100 + Math.random() * 60);
    } else {
      setTimeout(runWatcherSimulation, 500);
    }
  }

  // Simulated output
  function runWatcherSimulation() {
    appendLine('[DevMemory] Started watching /home/dev/spaghetti-code');

    setTimeout(() => {
      appendLine('[DevMemory] Listening for file edits (cooldown: 15s) and new Git commits...');
      appendLine('[DevMemory] Press Ctrl+C to stop.');
    }, 350);

    setTimeout(() => {
      appendLine('');
      appendLine('[DevMemory] Detected new Git commit: Fix auth token refresh');
      appendLine('[DevMemory] Recording build memory automatically...');
    }, 1600);

    setTimeout(() => {
      appendLine('[DevMemory] Build memory saved: build-007-fix-auth-token-refresh.md');
      appendLine('[DevMemory] Memory successfully updated!');
    }, 3000);

    setTimeout(() => {
      appendLine('');
      appendLine('[DevMemory] Detected stabilized changes in: api/routes.py, models/user.py');
    }, 4500);

    setTimeout(() => {
      appendLine('[DevMemory] Enter prompt description: Add rate limiting middleware', 'term-prompt');
    }, 5500);

    setTimeout(() => {
      appendLine('[DevMemory] Generating build memory...');
    }, 6200);

    setTimeout(() => {
      appendLine('[DevMemory] Build memory saved: build-008-rate-limiting-middleware.md');
      appendLine('[DevMemory] Memory successfully updated!');
      appendLine('');
      appendLine('dev@potato-pc:~/spaghetti-code$ ', 'term-prompt');
    }, 7200);
  }

  // Start after a short delay
  setTimeout(typeCommand, 700);
}

// =============================================
// 5. Sponsored Ad Popup Logic
// =============================================
let adOverlayTimeout = null;

function showAdPopup() {
  const overlay = document.getElementById('ad-overlay');
  if (!overlay) return;

  if (adOverlayTimeout) {
    clearTimeout(adOverlayTimeout);
  }

  // Show the ad after a brief delay for smoother loading experience
  adOverlayTimeout = setTimeout(() => {
    overlay.classList.add('active');
  }, 1200);
}

function hideAdPopup() {
  const overlay = document.getElementById('ad-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
  if (adOverlayTimeout) {
    clearTimeout(adOverlayTimeout);
    adOverlayTimeout = null;
  }
}

function setupAdPopup() {
  const overlay = document.getElementById('ad-overlay');
  const closeBtn = document.getElementById('ad-close-btn');
  const adLink = document.getElementById('ad-link');

  if (!overlay || !closeBtn) return;

  // Show on initial page load (since Home is active by default)
  showAdPopup();

  // Close on close button click
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideAdPopup();
  });

  // Close on clicking outside the modal
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      hideAdPopup();
    }
  });

  // Close when clicking the ad link (so modal is closed if they return)
  if (adLink) {
    adLink.addEventListener('click', () => {
      hideAdPopup();
    });
  }
}
