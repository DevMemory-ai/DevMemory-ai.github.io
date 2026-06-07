document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupScrollspy();
  setupCodeCopy();
  setupTerminalSimulation();
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

  // Click handler: scroll smoothly to target section
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const containerTop = readerPanel.getBoundingClientRect().top;
        const targetTop = targetSection.getBoundingClientRect().top;
        const scrollPosition = readerPanel.scrollTop + (targetTop - containerTop) - 20;

        readerPanel.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll handler: highlight sidebar link based on scroll position
  let ticking = false;
  readerPanel.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  function updateActiveSection() {
    const containerTop = readerPanel.getBoundingClientRect().top;
    const scrollTop = readerPanel.scrollTop;
    const scrollHeight = readerPanel.scrollHeight;
    const clientHeight = readerPanel.clientHeight;

    let activeSectionId = '';

    // Check if we're at the bottom — force the last section
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      activeSectionId = sections[sections.length - 1].id;
    } else if (scrollTop === 0) {
      // At the very top, select first section
      activeSectionId = sections[0].id;
    } else {
      // Normal: find which section is currently visible
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionTop = sections[i].getBoundingClientRect().top;
        if (sectionTop - containerTop <= 80) {
          activeSectionId = sections[i].id;
          break;
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

      // Scroll sidebar to keep active link visible
      const activeLink = document.querySelector('.sidebar-link.active');
      const sidebar = document.getElementById('docs-sidebar');
      if (activeLink && sidebar) {
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
