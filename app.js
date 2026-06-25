/* global AsciinemaPlayer */

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupScrollspy('docs-sidebar', 'docs-reader-panel', '.doc-section');
  setupCodeCopy();
  setupTerminalSimulation();
  setupThemeToggle();
  setupPromptGenerator();
  setupWaitlistModal();
  setupEnterpriseWaitlist();
  setupMobileMenu();
  setupInteractiveHowItWorks();

  // Initialize home player on initial load
  initTabPlayers('home');
});

// =============================================
// 1. Tab Switcher Logic & Asciinema Loader
// =============================================
const players = {};

function initPlayer(elementId, castName) {
  if (players[elementId]) return;
  const container = document.getElementById(elementId);
  if (!container) return;

  const castContent = window.CAST_DATA && window.CAST_DATA[castName];
  if (!castContent) {
    console.error(`No cast content found for ${castName}`);
    return;
  }

  try {
    // Pass the parsed cast content object directly to bypass file:// CORS blocks
    players[elementId] = AsciinemaPlayer.create({ data: castContent }, container, {
      speed: 1,
      idleTimeLimit: 2,
      poster: "npt:0:01",
      autoPlay: elementId === 'demo-player', // Autoplay homepage demo player
      loop: true
    });
  } catch (e) {
    console.error(`Failed to initialize asciinema player for ${elementId}:`, e);
  }
}

function initTabPlayers(tabId) {
  if (tabId === 'home') {
    initPlayer('demo-player', 'watch');
  } else if (tabId === 'docs') {
    initPlayer('player-init', 'init');
    initPlayer('player-record', 'record');
    initPlayer('player-watch', 'watch');
    initPlayer('player-show', 'show');
    initPlayer('player-status', 'status');
    initPlayer('player-mcp', 'mcp');
  }
}

function setupTabs() {
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    // Update active class for header navigation buttons
    const headerNavButtons = document.querySelectorAll('.nav-btn[data-tab], .mobile-nav-btn[data-tab]');
    headerNavButtons.forEach(btn => {
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

    // Reset scroll positions
    window.scrollTo({ top: 0 });
    const docsPanel = document.getElementById('docs-reader-panel');
    if (docsPanel) docsPanel.scrollTop = 0;

    // Initialize players for this tab
    initTabPlayers(tabId);
  }

  // Attach tab switching listener to all elements with data-tab attribute
  const allTabTriggers = document.querySelectorAll('[data-tab]');
  allTabTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Prevent standard link behavior if it's just a tab toggle
      if (btn.tagName === 'A' && btn.getAttribute('href') === '#') {
        e.preventDefault();
      }
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Clicking logo goes home
  const logoTriggers = document.querySelectorAll('.logo-container');
  logoTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      switchTab('home');
      // Collapse mobile menu if open
      const dropdown = document.getElementById('mobile-dropdown-menu');
      const burger = document.getElementById('hamburger-btn');
      if (dropdown && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
        burger.classList.remove('open');
      }
    });
  });

  // Footer How It Works scroll triggers
  const howItWorksTriggers = document.querySelectorAll('.footer-link-btn-how-it-works');
  howItWorksTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab('home');
      setTimeout(() => {
        const section = document.getElementById('home-how-it-works');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    });
  });

  // Generic copy-on-click for all npm install code pills (.code-pill)
  const copyPills = document.querySelectorAll('.code-pill');
  copyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const commandText = 'npm install -g devmemory-ai';
      navigator.clipboard.writeText(commandText).then(() => {
        const originalText = pill.textContent;
        pill.textContent = '✓ copied';
        
        const originalBg = pill.style.backgroundColor;
        const originalBorder = pill.style.borderColor;
        const originalColor = pill.style.color;

        pill.style.backgroundColor = '#16a34a'; // green
        pill.style.borderColor = '#16a34a';
        pill.style.color = '#ffffff';

        setTimeout(() => {
          pill.textContent = originalText;
          pill.style.backgroundColor = originalBg;
          pill.style.borderColor = originalBorder;
          pill.style.color = originalColor;
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy command:', err);
      });
    });
  });

  // Pro docs link button in pricing
  const proPricingBtn = document.getElementById('pricing-pro-docs-btn');
  if (proPricingBtn) {
    proPricingBtn.addEventListener('click', () => {
      switchTab('docs');
      setTimeout(() => {
        const targetSection = document.getElementById('pro-overview');
        const readerPanel = document.getElementById('docs-reader-panel');
        if (targetSection && readerPanel) {
          const isMobile = window.innerWidth <= 768;
          if (isMobile) {
            const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - 110;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
          } else {
            const containerTop = readerPanel.getBoundingClientRect().top;
            const targetTop = targetSection.getBoundingClientRect().top;
            const scrollPosition = readerPanel.scrollTop + (targetTop - containerTop) - 20;
            readerPanel.scrollTo({ top: scrollPosition, behavior: 'smooth' });
          }
        }
      }, 100);
    });
  }

  // Footer links doc target scrolling
  const docTargetBtns = document.querySelectorAll('[data-doc-target]');
  docTargetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-doc-target');
      setTimeout(() => {
        const targetSection = document.getElementById(targetId);
        const readerPanel = document.getElementById('docs-reader-panel');
        if (targetSection && readerPanel) {
          const isMobile = window.innerWidth <= 768;
          if (isMobile) {
            const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - 110;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
          } else {
            const containerTop = readerPanel.getBoundingClientRect().top;
            const targetTop = targetSection.getBoundingClientRect().top;
            const scrollPosition = readerPanel.scrollTop + (targetTop - containerTop) - 20;
            readerPanel.scrollTo({ top: scrollPosition, behavior: 'smooth' });
          }
        }
      }, 150);
    });
  });
}

// =============================================
// 2. Scrollspy & Sidebar Smooth Scrolling
// =============================================
function setupScrollspy(sidebarId, readerPanelId, sectionSelector) {
  const readerPanel = document.getElementById(readerPanelId);
  const sidebar = document.getElementById(sidebarId);
  if (!readerPanel || !sidebar) return;

  const sections = readerPanel.querySelectorAll(sectionSelector);
  const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
  if (sections.length === 0 || sidebarLinks.length === 0) return;

  // Click handler: scroll smoothly to target section
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('data-target');
      const targetSection = readerPanel.querySelector(`#${targetId}`);

      if (targetSection) {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          // On mobile, scroll window offset by sticky header/sidebar (110px)
          const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        } else {
          // On desktop, scroll reader panel internally
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

  // Scroll handler: highlight active section link
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

      if (scrollY + clientHeight >= scrollHeight - 30) {
        activeSectionId = sections[sections.length - 1].id;
      } else if (scrollY <= 50) {
        activeSectionId = sections[0].id;
      } else {
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionTop = sections[i].getBoundingClientRect().top;
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
      const targetMatchId = activeSectionId;
      sidebarLinks.forEach(link => {
        if (link.getAttribute('data-target') === targetMatchId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Keep active sidebar link scrolled into view
      const activeLink = sidebar.querySelector('.sidebar-link.active');
      if (activeLink) {
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

  function typeCommand() {
    if (charIdx < command.length) {
      inputEl.textContent += command.charAt(charIdx);
      charIdx++;
      setTimeout(typeCommand, 100 + Math.random() * 60);
    } else {
      setTimeout(runWatcherSimulation, 500);
    }
  }

  function runWatcherSimulation() {
    appendLine('[DevMemory] Started watching /home/dev/spaghetti-code');

    setTimeout(() => {
      appendLine('[DevMemory] Listening for file edits (cooldown: 15s) and new Git commits...');
      appendLine("[DevMemory] Run 'devmemory terminate' (or press Ctrl+C) to stop.");
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

  setTimeout(typeCommand, 700);
}

// =============================================
// 5. Light/Dark Mode Theme Toggle (Light Default)
// =============================================
function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const mobileToggleBtn = document.getElementById('mobile-theme-toggle');
  const logoImgs = document.querySelectorAll('#header-logo, .header-logo-mobile');

  const updateLogo = (theme) => {
    logoImgs.forEach(img => {
      img.src = theme === 'dark' ? 'logos/icon-dark-48.svg' : 'logos/icon-light-48.svg';
    });
  };

  const setThemeState = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      if (toggleBtn) toggleBtn.textContent = 'Light';
      if (mobileToggleBtn) mobileToggleBtn.textContent = 'Light';
      updateLogo('dark');
    } else {
      document.body.classList.remove('dark-mode');
      if (toggleBtn) toggleBtn.textContent = 'Dark';
      if (mobileToggleBtn) mobileToggleBtn.textContent = 'Dark';
      updateLogo('light');
    }
  };

  // Check saved theme
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    setThemeState(false);
  } else {
    setThemeState(true);
  }

  const handleToggle = () => {
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
      localStorage.setItem('theme', 'light');
      setThemeState(false);
    } else {
      localStorage.setItem('theme', 'dark');
      setThemeState(true);
    }
  };

  if (toggleBtn) toggleBtn.addEventListener('click', handleToggle);
  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', handleToggle);
}

// =============================================
// 6. Prompt Generator Tool Logic
// =============================================
const PROVIDER_MODELS = {
  gemini: ['gemini-2.5-flash', 'gemini-2.5-pro'],
  openai: ['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-5-haiku-latest', 'claude-3-5-sonnet-latest'],
  openrouter: ['google/gemini-2.5-flash', 'anthropic/claude-3.5-sonnet'],
  deepseek: ['deepseek-chat', 'deepseek-coder'],
  groq: ['llama-3.3-70b-versatile', 'mixtral-8x7b-32768'],
  together: ['Meta-Llama-3.1-70B-Instruct-Turbo'],
  ollama: ['qwen2.5-coder:0.5b', 'llama3:8b'],
  custom: ['custom-model-name']
};

function setupPromptGenerator() {
  const modal = document.getElementById('prompt-generator-modal');
  const openNavBtn = document.getElementById('nav-prompt-gen');
  const openDocsBtn = document.getElementById('pro-open-generator-btn');
  const closeBtn = document.getElementById('prompt-modal-close-btn');

  const typeSelect = document.getElementById('prompt-type');
  const providerSelect = document.getElementById('prompt-provider');
  const modelInput = document.getElementById('prompt-model');
  const modelDatalist = document.getElementById('model-suggestions');
  const keyInput = document.getElementById('prompt-key');
  const licenseInput = document.getElementById('prompt-license');
  const limitInput = document.getElementById('prompt-limit');
  const cooldownInput = document.getElementById('prompt-cooldown');

  const generateBtn = document.getElementById('prompt-generate-btn');
  const outputContainer = document.getElementById('prompt-output-container');
  const outputBlock = document.getElementById('prompt-output-block');
  const copyBtn = document.getElementById('prompt-copy-btn');

  if (!modal) return;

  // Open Handlers
  const openModal = () => {
    modal.classList.add('active');
    updateModelSuggestions();
  };

  if (openNavBtn) openNavBtn.addEventListener('click', openModal);
  if (openDocsBtn) openDocsBtn.addEventListener('click', openModal);

  // Close Handlers
  const closeModal = () => {
    modal.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Dynamic Datalist suggestions
  function updateModelSuggestions() {
    const provider = providerSelect.value;
    const models = PROVIDER_MODELS[provider] || [];
    
    modelDatalist.innerHTML = '';
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      modelDatalist.appendChild(option);
    });

    if (models.length > 0) {
      modelInput.value = models[0];
    }
  }

  providerSelect.addEventListener('change', updateModelSuggestions);

  // Prompt compiler
  generateBtn.addEventListener('click', () => {
    const type = typeSelect.value;
    const provider = providerSelect.value;
    const model = modelInput.value.trim() || PROVIDER_MODELS[provider][0];
    const key = keyInput.value.trim() || '[your_api_key_here]';
    const license = licenseInput.value.trim() || '';
    const limit = limitInput.value.trim() || '0';
    const cooldown = cooldownInput.value.trim() || '10';

    let promptText;

    if (type === 'setup') {
      promptText = 
`Help me configure DevMemory globally in my system. Please invoke the \`devmemory_init\` tool with \`global: true\` using the following details:

- Provider: ${provider}
- API Key: ${key}
- Model: ${model}
- Rate Limit: ${limit}
- Cooldown: ${cooldown}
${license ? `- License Key: ${license}\n` : ''}
Note: Before starting the MCP server, please download and run the DevMemory AI desktop application (available for macOS, Windows, and Linux) to activate your license key. Once activated, the local MCP server daemon starts automatically on port 31414.

Once initialized globally, DevMemory will automatically configure all of my current and future projects, copying this configuration locally and spinning up the background watcher daemon automatically whenever I open a new project.`;
    } else {
      promptText = 
`Help me edit my DevMemory configuration. Please call the \`devmemory_init\` tool to update the configuration with the following details:

- Provider: ${provider}
- API Key: ${key}
- Model: ${model}
- Rate Limit: ${limit}
- Cooldown: ${cooldown}
${license ? `- License Key: ${license}\n` : ''}
- Global Update: true

Update only the requested options and leave the remaining configuration options unchanged.`;
    }

    outputBlock.textContent = promptText;
    outputContainer.classList.remove('hidden');
  });

  // Copy handler
  copyBtn.addEventListener('click', () => {
    const textToCopy = outputBlock.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✓ copied';
      copyBtn.style.borderColor = 'var(--accent-primary)';
      copyBtn.style.color = 'var(--accent-primary)';

      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 1500);
    }).catch(err => {
      console.error('Copy failed:', err);
    });
  });
}

// =============================================
// 7. Pro Waitlist Modal Logic
// =============================================
function setupWaitlistModal() {
  const modal = document.getElementById('waitlist-modal');
  const buyBtn = document.getElementById('pricing-pro-buy-btn');
  const closeBtn = document.getElementById('waitlist-modal-close-btn');
  const form = document.getElementById('waitlist-form');
  const successMsg = document.getElementById('waitlist-success-message');
  const emailInput = document.getElementById('waitlist-email');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
    if (successMsg) successMsg.classList.add('hidden');
  };

  const closeModal = () => {
    modal.classList.remove('active');
  };

  if (buyBtn) buyBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = emailInput ? emailInput.value : '';
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : 'Join Waitlist';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      fetch('https://formspree.io/f/xnjyrnvz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email })
      })
      .then(response => {
        if (response.ok) {
          if (successMsg) {
            successMsg.textContent = '✓ Thank you! You have been added to the waitlist.';
            successMsg.style.color = 'var(--accent-primary)';
            successMsg.classList.remove('hidden');
          }
          if (form) {
            form.reset();
          }
          setTimeout(() => {
            closeModal();
          }, 2000);
        } else {
          throw new Error('Formspree submission rejected');
        }
      })
      .catch(err => {
        console.error('Waitlist submission failed:', err);
        if (successMsg) {
          successMsg.textContent = '✗ Submission failed. Please try again.';
          successMsg.style.color = 'var(--accent-warn)';
          successMsg.classList.remove('hidden');
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      });
    });
  }
}

// =============================================
// 8. Enterprise Waitlist Form Logic
// =============================================
function setupEnterpriseWaitlist() {
  const form = document.getElementById('enterprise-waitlist-form');
  const emailInput = document.getElementById('enterprise-waitlist-email');
  const successMsg = document.getElementById('enterprise-waitlist-success-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput ? emailInput.value : '';
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Join Enterprise Waitlist';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    fetch('https://formspree.io/f/xnjyrjgq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email: email, type: 'enterprise-waitlist' })
    })
    .then(response => {
      if (response.ok) {
        if (successMsg) {
          successMsg.textContent = '✓ Added to enterprise waitlist!';
          successMsg.style.color = 'var(--accent-primary)';
          successMsg.classList.remove('hidden');
        }
        form.reset();
      } else {
        throw new Error('Formspree rejection');
      }
    })
    .catch(err => {
      console.error('Enterprise waitlist failed:', err);
      if (successMsg) {
        successMsg.textContent = '✗ Submission failed. Try again.';
        successMsg.style.color = 'var(--accent-warn)';
        successMsg.classList.remove('hidden');
      }
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  });
}

// =============================================
// 8. Mobile Navigation Dropdown & Hamburger
// =============================================
function setupMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');
  if (!hamburgerBtn || !mobileDropdownMenu) return;

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle('open');
    mobileDropdownMenu.classList.toggle('hidden');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileDropdownMenu.contains(e.target) && e.target !== hamburgerBtn && !hamburgerBtn.contains(e.target)) {
      hamburgerBtn.classList.remove('open');
      mobileDropdownMenu.classList.add('hidden');
    }
  });

  // Close when clicking a nav option
  const mobileNavBtns = mobileDropdownMenu.querySelectorAll('.mobile-nav-btn, .mobile-github-link');
  mobileNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hamburgerBtn.classList.remove('open');
      mobileDropdownMenu.classList.add('hidden');
    });
  });
}

// =============================================
// 12. Interactive Stepper (How It Works)
// =============================================
function setupInteractiveHowItWorks() {
  // Stepper Step Navigation
  const stepBtns = document.querySelectorAll('.step-nav-btn');
  const stepViews = document.querySelectorAll('.step-view');
  
  if (stepBtns.length === 0) return;

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-step');
      
      // Update navigation active state
      stepBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update content view active state
      stepViews.forEach(v => v.classList.remove('active'));
      const activeView = document.getElementById(`step-view-${step}`);
      if (activeView) {
        activeView.classList.add('active');
      }
    });
  });

  // Vault File Explorer Mockup Interactivity (Step 4)
  const fileButtons = document.querySelectorAll('.vault-tree-file');
  const previewFilename = document.getElementById('vault-preview-filename');
  const previewLang = document.getElementById('vault-preview-lang');
  const previewBody = document.getElementById('vault-preview-body');

  const fileContents = {
    config: {
      name: 'config.json',
      lang: 'JSON',
      body: `{
  "model": "claude-3-5-sonnet",
  "temperature": 0.2,
  "max_context_tokens": 120000,
  "dashboard": {
    "port": 31415,
    "enabled": true
  }
}`
    },
    brain: {
      name: 'project-brain.md',
      lang: 'Markdown',
      body: `# DevMemory Project Brain

## Current Architecture
* Local watch daemon on port 31415
* Local MCP server running on port 31414
* Cryptographic hardware bound activation

## Design Decisions
* Offline first local JWT validation
* Stored in encrypted file ~/.devmemory_secure_token.json`
    },
    changelog: {
      name: 'changelog.md',
      lang: 'Markdown',
      body: `# Changelog

## [2026-06-24] Security Audit Sanitization
* Implemented automated input sanitation checks
* Audited memory leak in watcher file descriptors
* Implemented local MCP server on port 31414`
    },
    context: {
      name: 'FULL_PROJECT_CONTEXT.md',
      lang: 'Markdown',
      body: `# FULL PROJECT CONTEXT

This file compiles the current project-brain, latest changelog entries,
and watcher timeline diagnostics to load as a single unified context.`
    },
    watcher: {
      name: 'watcher.log',
      lang: 'LOG',
      body: `[2026-06-24 17:01:30] [info] Background daemon active.
[2026-06-24 17:01:31] [info] Watcher workspace bound to /Users/umimac/DevMemory
[2026-06-24 17:03:45] [event] File save: src/routes/auth.js (modified)
[2026-06-24 17:03:46] [info] Compilation complete: 7 agents processed successfully.`
    }
  };

  fileButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const fileKey = btn.getAttribute('data-file');
      const fileData = fileContents[fileKey];
      if (fileData && previewFilename && previewLang && previewBody) {
        fileButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        previewFilename.textContent = fileData.name;
        previewLang.textContent = fileData.lang;
        previewBody.textContent = fileData.body;
      }
    });
  });

  // MCP Configuration Switcher (Step 5)
  const mcpTabs = document.querySelectorAll('.mcp-tab');
  const mcpConfigBody = document.getElementById('mcp-config-body');

  const mcpConfigs = {
    cursor: `{
  "mcpServers": {
    "devmemory": {
      "type": "sse",
      "url": "http://localhost:31414/sse"
    }
  }
}`,
    claude: `{
  "mcpServers": {
    "devmemory": {
      "command": "devmemory",
      "args": ["mcp"]
    }
  }
}`
  };

  mcpTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const clientKey = tab.getAttribute('data-mcp-client');
      const configText = mcpConfigs[clientKey];
      if (configText && mcpConfigBody) {
        mcpTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        mcpConfigBody.textContent = configText;
      }
    });
  });
}

