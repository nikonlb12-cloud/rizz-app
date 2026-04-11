/* Engine loaded from engine.js */

// ============================================
// APP LOGIC
// ============================================
const App = (() => {
  // DOM Elements
  const chatArea = document.getElementById('chat-area');
  const welcomeScreen = document.getElementById('welcome-screen');
  const messagesContainer = document.getElementById('messages-container');
  const messageInput = document.getElementById('message-input');
  const btnSend = document.getElementById('btn-send');
  const btnClear = document.getElementById('btn-clear');
  const btnHistory = document.getElementById('btn-history');
  const btnCloseHistory = document.getElementById('btn-close-history');
  const btnClearHistory = document.getElementById('btn-clear-history');
  const historyOverlay = document.getElementById('history-overlay');
  const historySidebar = document.getElementById('history-sidebar');
  const historyList = document.getElementById('history-list');
  const charCount = document.getElementById('char-count');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const vibePills = document.querySelectorAll('.vibe-pill');
  const stagePills = document.querySelectorAll('.stage-pill');
  const exampleChips = document.querySelectorAll('.example-chip');

  // Image upload elements
  const fileInput = document.getElementById('file-input');
  const btnUpload = document.getElementById('btn-upload');
  const imagePreviewStrip = document.getElementById('image-preview-strip');
  const dropOverlay = document.getElementById('drop-overlay');
  const ocrStatus = document.getElementById('ocr-status');
  const ocrStatusText = document.getElementById('ocr-status-text');

  let currentVibe = 'smooth';
  let currentStage = 'cold';
  let isGenerating = false;
  let history = JSON.parse(localStorage.getItem('rizz_history') || '[]');
  let lastIncomingMsg = '';
  let imageQueue = [];
  let dragCounter = 0;

  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.id = 'lightbox';
  lightbox.innerHTML = '<img src="" alt="Full size screenshot">';
  document.body.appendChild(lightbox);
  lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

  // Initialize
  function init() {
    setupEventListeners();
    renderHistory();
  }

  function setupEventListeners() {
    messageInput.addEventListener('input', handleInput);
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    btnSend.addEventListener('click', handleSend);

    vibePills.forEach(pill => {
      pill.addEventListener('click', () => {
        vibePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentVibe = pill.dataset.vibe;
        // Auto-regenerate if conversation is active
        if (lastIncomingMsg && !isGenerating) handleRegenerate();
      });
    });

    // Stage pills
    stagePills.forEach(pill => {
      pill.addEventListener('click', () => {
        stagePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentStage = pill.dataset.stage;
        // Auto-regenerate if conversation is active
        if (lastIncomingMsg && !isGenerating) handleRegenerate();
      });
    });

    exampleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        messageInput.value = chip.dataset.example;
        handleInput();
        messageInput.focus();
      });
    });

    btnClear.addEventListener('click', resetChat);
    btnHistory.addEventListener('click', openHistory);
    btnCloseHistory.addEventListener('click', closeHistory);
    historyOverlay.addEventListener('click', closeHistory);
    btnClearHistory.addEventListener('click', clearHistory);

    btnUpload.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);

    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', handleDrop);
    document.addEventListener('paste', handlePaste);
  }

  function handleInput() {
    const val = messageInput.value;
    charCount.textContent = `${val.length} / 1000`;

    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';

    // Send button always active (empty = starters mode)
    if (!isGenerating) {
      btnSend.classList.add('active');
      btnSend.disabled = false;
    } else {
      btnSend.classList.remove('active');
      btnSend.disabled = true;
    }
  }

  // ---- Batch Image Handling ----
  function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    files.forEach(f => addImageToQueue(f));
    fileInput.value = '';
  }

  function handleDragEnter(e) {
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1) dropOverlay.classList.add('active');
  }

  function handleDragLeave(e) {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) dropOverlay.classList.remove('active');
  }

  function handleDrop(e) {
    e.preventDefault();
    dragCounter = 0;
    dropOverlay.classList.remove('active');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    files.forEach(f => addImageToQueue(f));
  }

  function handlePaste(e) {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) addImageToQueue(file);
        return;
      }
    }
  }

  function addImageToQueue(file) {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) {
      showToast('Image too large (max 10MB)');
      return;
    }
    if (imageQueue.length >= 10) {
      showToast('Max 10 screenshots at a time');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      imageQueue.push({ dataUrl: e.target.result, id: Date.now() + Math.random() });
      renderImagePreviews();
      handleInput();
      showToast(`${imageQueue.length} screenshot${imageQueue.length > 1 ? 's' : ''} attached`);
    };
    reader.readAsDataURL(file);
  }

  function removeImageFromQueue(id) {
    imageQueue = imageQueue.filter(img => img.id !== id);
    renderImagePreviews();
    handleInput();
  }

  function renderImagePreviews() {
    if (imageQueue.length === 0) {
      imagePreviewStrip.classList.remove('active');
      imagePreviewStrip.innerHTML = '';
      return;
    }

    imagePreviewStrip.classList.add('active');
    imagePreviewStrip.innerHTML = imageQueue.map((img, i) => `
      <div class="image-preview-card">
        <img src="${img.dataUrl}" alt="Screenshot ${i + 1}">
        <span class="preview-count">${i + 1}</span>
        <button class="btn-remove-image" onclick="App.removeImage(${img.id})" title="Remove">\u00D7</button>
      </div>
    `).join('');
  }

  function clearAllImages() {
    imageQueue = [];
    imagePreviewStrip.classList.remove('active');
    imagePreviewStrip.innerHTML = '';
    ocrStatus.classList.remove('active');
    handleInput();
  }

  function openLightbox(imgSrc) {
    lightbox.querySelector('img').src = imgSrc;
    lightbox.classList.add('active');
  }

  // ---- OCR ----
  async function extractTextFromImages(images) {
    if (!images || images.length === 0) return '';

    ocrStatus.classList.add('active');
    ocrStatusText.textContent = `Reading ${images.length} screenshot${images.length > 1 ? 's' : ''}...`;

    let allText = [];

    try {
      for (let i = 0; i < images.length; i++) {
        ocrStatusText.textContent = `Reading screenshot ${i + 1} of ${images.length}...`;
        const result = await Tesseract.recognize(images[i].dataUrl, 'eng', {
          logger: () => {}
        });
        const text = result.data.text.trim();
        if (text) allText.push(text);
      }
    } catch (err) {
      console.error('OCR error:', err);
      showToast('Could not read screenshot text');
    }

    ocrStatus.classList.remove('active');
    return allText.join('\n---\n');
  }

  // ---- SEND ----
  async function handleSend() {
    const msg = messageInput.value.trim();
    const hasImages = imageQueue.length > 0;
    if (isGenerating) return;

    // STARTERS MODE: no text + no images = generate openers
    if (!msg && !hasImages) {
      return generateStartersFlow();
    }

    isGenerating = true;
    const sentImages = [...imageQueue];

    welcomeScreen.style.display = 'none';
    messagesContainer.classList.add('active');

    messageInput.value = '';
    clearAllImages();
    handleInput();

    let extractedText = '';
    if (sentImages.length > 0) {
      addIncomingMessage(msg, sentImages, null);
      extractedText = await extractTextFromImages(sentImages);
    } else {
      addIncomingMessage(msg, [], null);
    }

    const textForEngine = msg || extractedText || 'Hey';
    lastIncomingMsg = textForEngine;

    const typingEl = addTypingIndicator();
    chatArea.scrollTop = chatArea.scrollHeight;

    const delay = 700 + Math.random() * 1100;
    setTimeout(() => {
      typingEl.remove();
      const replies = RizzEngine.generateReplies(textForEngine, currentVibe, currentStage);
      addResponseGroup(replies, currentVibe);
      saveToHistory(msg || extractedText, replies, currentVibe, sentImages.length > 0);
      isGenerating = false;
      handleInput();
      chatArea.scrollTop = chatArea.scrollHeight;
    }, delay);
  }

  // ---- STARTERS MODE ----
  function generateStartersFlow() {
    isGenerating = true;
    welcomeScreen.style.display = 'none';
    messagesContainer.classList.add('active');

    const sysEl = document.createElement('div');
    sysEl.className = 'message message-incoming';
    sysEl.innerHTML = `
      <div class="message-bubble">
        <div class="message-label">\u26A1 Conversation Starters</div>
        <div class="message-text">No screenshot? No problem. Here are openers crafted to start a real conversation and stand out from every other message in her DMs.</div>
      </div>
    `;
    messagesContainer.appendChild(sysEl);

    const typingEl = addTypingIndicator();
    chatArea.scrollTop = chatArea.scrollHeight;

    const delay = 700 + Math.random() * 1100;
    setTimeout(() => {
      typingEl.remove();
      const starters = RizzEngine.generateStarters(currentVibe);
      lastIncomingMsg = '__starters__';
      addResponseGroup(starters, currentVibe);
      saveToHistory('Conversation Starters', starters, currentVibe, false);
      isGenerating = false;
      handleInput();
      chatArea.scrollTop = chatArea.scrollHeight;
    }, delay);
  }

  // ---- MESSAGES ----
  function addIncomingMessage(text, images, extractedText) {
    const el = document.createElement('div');
    el.className = 'message message-incoming';

    let imagesHTML = '';
    if (images && images.length > 0) {
      if (images.length === 1) {
        imagesHTML = `
          <div class="message-image">
            <img src="${images[0].dataUrl}" alt="Conversation screenshot" onclick="App.openLightbox(this.src)">
          </div>
        `;
      } else {
        imagesHTML = `<div class="message-images">${images.map((img, i) => `
          <div class="message-image">
            <img src="${img.dataUrl}" alt="Screenshot ${i + 1}" onclick="App.openLightbox(this.src)">
          </div>
        `).join('')}</div>`;
      }
    }

    const textHTML = text ? `<div class="message-text">${escapeHtml(text)}</div>` : '';
    const label = images && images.length > 0
      ? `\uD83D\uDCF8 Their message (${images.length} screenshot${images.length > 1 ? 's' : ''})`
      : 'Their message';

    el.innerHTML = `
      <div class="message-bubble">
        <div class="message-label">${label}</div>
        ${textHTML}
        ${imagesHTML}
      </div>
    `;
    messagesContainer.appendChild(el);
  }

  function addTypingIndicator() {
    const el = document.createElement('div');
    el.className = 'message typing-indicator';
    el.innerHTML = `
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <span class="typing-label">Cooking up some rizz...</span>
    `;
    messagesContainer.appendChild(el);
    chatArea.scrollTop = chatArea.scrollHeight;
    return el;
  }

  function addResponseGroup(replies, vibe) {
    const vibeLabels = {
      smooth: '\uD83D\uDE0F Smooth',
      witty: '\uD83D\uDE02 Witty',
      bold: '\uD83D\uDD25 Bold',
      flirty: '\uD83D\uDE18 Flirty',
      mysterious: '\uD83C\uDF19 Mysterious',
    };

    const stageLabels = {
      cold: '\u{1F9CA} Cold Open',
      talking: '\u{1F4AC} Just Talking',
      heating: '\u{1F525} Heating Up',
      closing: '\u{1F608} Closing In',
    };

    const existingGroups = messagesContainer.querySelectorAll('.response-group').length;
    const roundNum = existingGroups + 1;

    const el = document.createElement('div');
    el.className = 'message response-group';

    let cardsHTML = replies.map((reply, i) => `
      <div class="response-card" data-reply="${escapeAttr(reply)}">
        <div class="response-card-top">
          <span class="response-number">Option ${i + 1}</span>
          <button class="btn-copy" onclick="App.copyReply(this, '${escapeAttr(reply)}')">
            <span>\uD83D\uDCCB</span> Copy
          </button>
        </div>
        <div class="response-text">${escapeHtml(reply)}</div>
      </div>
    `).join('');

    el.innerHTML = `
      <div class="response-group-header">
        <span class="stage-badge">${stageLabels[currentStage]}</span>
        <span class="vibe-badge">${vibeLabels[vibe]}</span>
        ${roundNum > 1 ? `<span class="round-badge">Round ${roundNum}</span>` : ''}
      </div>
      <div class="response-options">${cardsHTML}</div>
    `;

    const existingRegen = messagesContainer.querySelector('.btn-regenerate');
    if (existingRegen) existingRegen.remove();

    messagesContainer.appendChild(el);

    const regenBtn = document.createElement('button');
    regenBtn.className = 'btn-regenerate';
    regenBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 4 23 10 17 10"/>
        <polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
      More options
    `;
    regenBtn.addEventListener('click', handleRegenerate);
    messagesContainer.appendChild(regenBtn);

    const cards = el.querySelectorAll('.response-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      setTimeout(() => {
        card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 120);
    });
  }

  function handleRegenerate() {
    if (isGenerating || !lastIncomingMsg) return;
    isGenerating = true;

    const existingRegen = messagesContainer.querySelector('.btn-regenerate');
    if (existingRegen) existingRegen.remove();

    const typingEl = addTypingIndicator();

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      typingEl.remove();
      // Use starters or replies based on mode
      const replies = lastIncomingMsg === '__starters__'
        ? RizzEngine.generateStarters(currentVibe)
        : RizzEngine.generateReplies(lastIncomingMsg, currentVibe, currentStage);
      addResponseGroup(replies, currentVibe);
      isGenerating = false;
      chatArea.scrollTop = chatArea.scrollHeight;
    }, delay);
  }

  function resetChat() {
    messagesContainer.innerHTML = '';
    messagesContainer.classList.remove('active');
    welcomeScreen.style.display = '';
    lastIncomingMsg = '';
    isGenerating = false;
    clearAllImages();
    messageInput.focus();
  }

  // History
  function saveToHistory(msg, replies, vibe, hasImages) {
    const entry = {
      id: Date.now(),
      message: msg,
      replies: replies,
      vibe: vibe,
      timestamp: new Date().toISOString(),
    };
    if (hasImages) entry.hasImage = true;
    history.unshift(entry);
    if (history.length > 50) history = history.slice(0, 50);
    localStorage.setItem('rizz_history', JSON.stringify(history));
    renderHistory();
  }

  function renderHistory() {
    if (history.length === 0) {
      historyList.innerHTML = `
        <div class="history-empty">
          <span>\uD83D\uDD50</span>
          <p>No history yet. Start cooking!</p>
        </div>
      `;
      return;
    }

    historyList.innerHTML = history.map(item => {
      const time = new Date(item.timestamp);
      const timeStr = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
                      ' \u00B7 ' + time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      const imgBadge = item.hasImage ? '\uD83D\uDCF8 ' : '';
      return `
        <div class="history-item" onclick="App.loadHistory(${item.id})">
          <div class="history-item-text">${imgBadge}"${escapeHtml(item.message)}"</div>
          <div class="history-item-meta">
            <span class="history-item-vibe">${item.vibe}</span>
            <span>${timeStr}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function loadHistory(id) {
    const item = history.find(h => h.id === id);
    if (!item) return;

    resetChat();
    closeHistory();

    lastIncomingMsg = item.message;
    welcomeScreen.style.display = 'none';
    messagesContainer.classList.add('active');
    addIncomingMessage(item.message);
    addResponseGroup(item.replies, item.vibe);

    setTimeout(() => {
      chatArea.scrollTop = chatArea.scrollHeight;
    }, 100);
  }

  function openHistory() {
    historySidebar.classList.add('active');
    historyOverlay.classList.add('active');
  }

  function closeHistory() {
    historySidebar.classList.remove('active');
    historyOverlay.classList.remove('active');
  }

  function clearHistory() {
    history = [];
    localStorage.removeItem('rizz_history');
    renderHistory();
    showToast('History cleared');
  }

  // Copy
  function copyReply(btnEl, text) {
    navigator.clipboard.writeText(text).then(() => {
      btnEl.innerHTML = '<span>\u2713</span> Copied!';
      btnEl.classList.add('copied');
      showToast('Copied to clipboard \u2014 go get em \uD83D\uDD25');
      setTimeout(() => {
        btnEl.innerHTML = '<span>\uD83D\uDCCB</span> Copy';
        btnEl.classList.remove('copied');
      }, 2000);
    });
  }

  // Toast
  function showToast(text) {
    toastText.textContent = text;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 2500);
  }

  // Utility
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  init();

  // Public API
  return { copyReply, loadHistory, openLightbox, removeImage: removeImageFromQueue };
})();
