/* =============================================
   RIZZ — AI Charm Coach
   Response Engine & App Logic
   ============================================= */

// ============================================
// RESPONSE ENGINE — Context-aware reply generation
// ============================================

const RizzEngine = (() => {
  // Detect context signals from the incoming message
  function analyzeMessage(msg) {
    const lower = msg.toLowerCase().trim();
    const signals = {
      isQuestion: /\?/.test(msg),
      isCompliment: /cute|pretty|handsome|beautiful|gorgeous|attractive|hot|fine|good.?looking|stunning/i.test(lower),
      isGreeting: /^(hey|hi|hello|yo|sup|what's up|heyy+|hii+|waddup)\b/i.test(lower),
      isDryText: lower.length < 10 && !/\?/.test(msg),
      isFlirty: /😘|😏|😍|🥰|❤|💕|😉|wink|flirt|date|crush|kiss/i.test(lower),
      isAboutPlans: /what.*do|plans|free|busy|hang|meet|grab|chill|come over|link up/i.test(lower),
      isAboutFun: /fun|hobby|hobbies|free time|interests|passion|enjoy/i.test(lower),
      isAboutWork: /work|job|career|school|study|college|major/i.test(lower),
      isAboutFood: /food|eat|dinner|lunch|coffee|restaurant|cook|hungry|brunch/i.test(lower),
      isAboutMusic: /music|song|listen|concert|playlist|spotify|artist|band/i.test(lower),
      isAboutTravel: /travel|trip|vacation|city|country|visit|fly|beach/i.test(lower),
      isAboutHiking: /hike|hiking|trail|mountain|nature|outdoor/i.test(lower),
      isAboutGym: /gym|workout|lift|fitness|exercise|run|yoga/i.test(lower),
      isPlayful: /haha|lol|lmao|😂|🤣|funny|joke/i.test(lower),
      isNervous: /nervous|shy|awkward|idk|umm|not sure/i.test(lower),
      isLateReply: /took.*long|slow.*reply|late|ghost|ignore|respond/i.test(lower),
      isGoodTime: /great time|amazing|fun|wonderful|best|loved|enjoyed|awesome|incredible/i.test(lower),
      isApology: /sorry|apologize|my bad|forgive/i.test(lower),
      hasMorning: /morning|good morning|gm/i.test(lower),
      hasNight: /night|goodnight|gn|sleep/i.test(lower),
      hasEmoji: /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(msg),
      wordCount: lower.split(/\s+/).length,
    };
    return signals;
  }

  // Build contextual responses per vibe
  function generateReplies(msg, vibe) {
    const s = analyzeMessage(msg);
    let pool = [];

    // ---- SMOOTH ----
    if (vibe === 'smooth') {
      if (s.isGreeting && s.isDryText) {
        pool = [
          "Well hey there 😌 I was wondering when you'd finally text me",
          "Hey you. I had a feeling I'd hear from you today ✨",
          "There she is. My day just got a whole lot better 😏",
          "Hey. I was just thinking about something... but I'll tell you later 😌",
          "The notification I've actually been waiting for. Hey 😏",
        ];
      } else if (s.isGreeting) {
        pool = [
          "Hey you 😌 Perfect timing — I was just about to text you",
          "Well if it isn't my favorite distraction. What's good? ✨",
          "Hey! I had a feeling you'd reach out today. Must be that connection 😏",
          "There's that name I like seeing on my phone. What's up? 😌",
        ];
      } else if (s.isCompliment) {
        pool = [
          "You're not so bad yourself 😌 But I think you already know that",
          "Careful with compliments like that... I might start catching feelings 😏",
          "I appreciate that. You've got great taste — in people too, clearly ✨",
          "That means a lot, coming from someone who literally stops me mid-scroll 😌",
          "You're making me blush and I don't blush easy. Well played 😏",
        ];
      } else if (s.isAboutFun || s.isAboutPlans) {
        pool = [
          "Honestly? I'm pretty spontaneous. The best moments are never planned. You should find that out firsthand 😌",
          "Right now my favorite hobby is trying to figure you out. You're intriguing ✨",
          "I keep it interesting — but I'd rather show you than tell you. When are you free? 😏",
          "A little bit of everything, but I've been wanting to try something new. Got any ideas? 😌",
        ];
      } else if (s.isAboutFood) {
        pool = [
          "I could talk about food all day, but I'd rather eat with you. Know any good spots? 😌",
          "My cooking is either a 10 or a fire hazard, no in between. Want to find out which? 😏",
          "That's dangerous — because if you like the same food as me, I might have to keep you around ✨",
          "The way to my heart is definitely through food. Sounds like you already know the shortcut 😌",
        ];
      } else if (s.isAboutMusic) {
        pool = [
          "Send me your top 3 songs right now. I'll judge you... gently 😏",
          "Music taste says everything about a person. I have a feeling yours is impeccable ✨",
          "We should make a playlist together. For... research purposes 😌",
          "If your music taste is as good as your conversation, we might have a problem 😏",
        ];
      } else if (s.isAboutTravel || s.isAboutHiking) {
        pool = [
          "I love exploring new places. Something about discovering things together just hits different ✨",
          "You and me, a sunset, and zero phone service. That's the vibe 😌",
          "The best adventures are the ones you don't plan. When are we going? 😏",
          "Travel is my love language. If you can keep up, we're gonna get along really well 😌",
        ];
      } else if (s.isGoodTime) {
        pool = [
          "Same here. I'm still smiling about it honestly 😌",
          "I had a great time too. You make everything effortless ✨",
          "Glad it wasn't just me feeling that. When's round two? 😏",
          "That was the most fun I've had in a while. You're trouble, you know that? 😌",
        ];
      } else if (s.isLateReply) {
        pool = [
          "Good things take time 😌 But I promise, I'm worth the wait",
          "My bad — I was living life so I'd have something interesting to tell you ✨",
          "I could give you an excuse, but honestly I'd rather just make it up to you. Coffee? 😏",
          "Fair point. Let me overcompensate with amazing conversation from here on out 😌",
        ];
      } else if (s.isAboutWork) {
        pool = [
          "I do something I actually love, which makes me either lucky or crazy. Maybe both 😌",
          "Work hard, live well — but right now I'm way more interested in what you do ✨",
          "I'll tell you all about it... over dinner? Feels like a face-to-face kind of conversation 😏",
        ];
      } else if (s.isPlayful) {
        pool = [
          "I love that energy. You're definitely my kind of person 😌",
          "Your humor is dangerously attractive, just so you know ✨",
          "See, this is why I keep texting you back. You actually get it 😏",
        ];
      } else if (s.isQuestion) {
        pool = [
          "That's actually a great question. But first — tell me something unexpected about you 😌",
          "I love that you're curious. Shows you've got depth ✨ The answer though... I'd rather tell you in person",
          "Hmm, I'll answer that — but only if you answer one of mine first 😏",
          "You're asking all the right questions. I think we're gonna vibe really well 😌",
        ];
      } else {
        pool = [
          "I like where this is going. Tell me more 😌",
          "You've got my full attention. That doesn't happen easily ✨",
          "There's something about the way you text that's just... different. In the best way 😏",
          "Keep talking like that and I might have to take you somewhere nice 😌",
          "Noted. You're definitely making an impression on me ✨",
        ];
      }
    }

    // ---- WITTY ----
    if (vibe === 'witty') {
      if (s.isGreeting && s.isDryText) {
        pool = [
          "\"Hey\"?? That's it? I know your thumbs aren't broken. Give me something to work with here 😂",
          "Hey yourself. I'm gonna need at least 3 more words before I emotionally invest 😂",
          "We're starting with 'hey'? Bold strategy. Let's see how this plays out 🎬",
          "You texted 'hey' like I'm not the most interesting person in your phone right now 💀",
          "That 'hey' was so dry I need to go get water. Try again with some seasoning 😂",
        ];
      } else if (s.isGreeting) {
        pool = [
          "Oh so we're texting now? I should probably act surprised 😂",
          "Hey! Fun fact: you're the only notification I didn't swipe away today. Feel special 😏",
          "Finally! I was about to file a missing persons report for your texting skills 💀",
          "Oh hey, my phone's favorite person. What trouble are we causing today? 😂",
        ];
      } else if (s.isCompliment) {
        pool = [
          "I know 💅 But it's nice to hear it from someone with taste",
          "You're just now noticing? I've been cute this whole time 😂",
          "Thank you! I'll add that to my collection of reasons to be confident 😏",
          "Plot twist: you're cuter but I wasn't gonna say anything... okay I said it 💀",
          "My mirror tells me that every morning but it hits different from you 😂",
        ];
      } else if (s.isAboutFun) {
        pool = [
          "For fun? Oh you know, the usual — world domination, Netflix, snacks. In that order 😂",
          "I'm basically a professional at doing nothing productively. It's an art form really 🎨",
          "Fun? I'm texting you right now aren't I? This IS my fun 😏",
          "I collect hobbies like I collect red flags — enthusiastically and with zero regrets 😂",
        ];
      } else if (s.isAboutFood) {
        pool = [
          "My relationship with food is the most stable one I've ever had tbh 😂",
          "I hope you're ready because my food takes are CONTROVERSIAL. Pineapple on pizza? Absolutely 🍍",
          "I'm basically a food critic but with the budget of a college student 💀",
          "I eat like I'm reviewing for a food blog nobody reads. Presentation matters 😂",
        ];
      } else if (s.isLateReply) {
        pool = [
          "Sorry I was busy being mysterious and unavailable. It's a full-time job 😂",
          "My bad, I was in a heated argument with my snooze button. I lost. Again 💀",
          "I reply at the speed of plot in a Christopher Nolan movie. Complex but worth it 🎬",
          "Listen, I'm fashionably late to everything — replies included 😂",
        ];
      } else if (s.isGoodTime) {
        pool = [
          "Same! And I don't say that about everything. Just food, dogs, and apparently you 😂",
          "10/10 would do again. Would also give it a Yelp review but that's weird 💀",
          "I tried to play it cool about it but I literally cannot. That was so fun 😭",
          "Honestly if our vibe was a movie it'd be critically acclaimed. Sequel? 🎬",
        ];
      } else if (s.isAboutMusic) {
        pool = [
          "My music taste is basically my entire personality at this point 😂 Ready to be judged?",
          "I'll send you a song but be warned — if you don't like it we can't be friends anymore 💀",
          "My Spotify Wrapped is basically a cry for help with a great soundtrack 🎵",
        ];
      } else if (s.isQuestion) {
        pool = [
          "Oh we're doing Q&A now? I should've prepared a PowerPoint 📊",
          "Great question. Award-winning question. I'll accept that question 😂 Now let me dodge it gracefully...",
          "I'm gonna answer that with a question: are you always this interesting or is today special? 😏",
          "Let me think about that while you tell me your most unpopular opinion 😂",
        ];
      } else {
        pool = [
          "I'm saving this conversation as proof that I'm actually charming 😂",
          "You're fun. Like, 'I'm gonna tell my friends about you' fun 😏",
          "My brain just did a little happy dance reading that. Very professional though 💀",
          "This conversation is getting dangerously interesting. I should probably charge admission 🎟",
          "You get me. That's rare. Most people need subtitles 😂",
        ];
      }
    }

    // ---- BOLD ----
    if (vibe === 'bold') {
      if (s.isGreeting && s.isDryText) {
        pool = [
          "Don't 'hey' me like you haven't been thinking about texting me all day 🔥",
          "Hey. So when are we making plans or are we just gonna keep pretending we don't want to?",
          "That 'hey' was timid. I know there's more you want to say. Say it 😈",
          "Hey back. Now skip the small talk — what's really on your mind?",
        ];
      } else if (s.isCompliment) {
        pool = [
          "I know. And you're bold for saying it — I respect that. Your turn to hear the truth: you're stunning 🔥",
          "Keep that same energy. I like someone who says what they mean",
          "You've got good taste. Now let me prove you right — dinner this week?",
          "That just earned you a date. I don't make the rules 🔥",
        ];
      } else if (s.isAboutPlans || s.isAboutFun) {
        pool = [
          "Why are we still typing? Let's do something about it. Friday, 8pm. You pick the place 🔥",
          "Here's what I think — we should stop texting and go actually live. You in?",
          "I'm free this week and honestly I'd rather spend it with you than anyone else. Let's go",
          "I don't do boring. So whatever we do, it's going to be memorable. Trust me 🔥",
        ];
      } else if (s.isGoodTime) {
        pool = [
          "We did. And honestly I don't want to wait another week to see you again",
          "Good. Because I already know the next thing we're doing together 🔥",
          "That was just the preview. The full experience is even better. Let's make it happen",
          "I felt it too. Let's not overthink it — when are you free next?",
        ];
      } else if (s.isLateReply) {
        pool = [
          "You're right. I owe you. Let me make it up to you — properly, in person",
          "Fair. No excuses. But I'm here now and I'm giving you 100% of my attention",
          "I deserved that. But I promise you — I'm worth the wait. Let me prove it 🔥",
        ];
      } else if (s.isFlirty) {
        pool = [
          "Oh we're going there? Good. I've been holding back and honestly it was killing me 🔥",
          "Finally, someone who matches my energy. This is about to get interesting",
          "I love that you're not shy about it. You just jumped to the top of my list 😈",
          "Keep that energy. We're going to be trouble together and I'm here for it 🔥",
        ];
      } else if (s.isQuestion) {
        pool = [
          "I could answer that over text... or I could tell you over drinks. Pick wisely 🔥",
          "That's a great question. Here's a better one — when are we actually meeting?",
          "Instead of playing 20 questions, let's just go somewhere and find out everything in person",
        ];
      } else {
        pool = [
          "You've got my attention. Not a lot of people manage that. Don't waste it 🔥",
          "I'm gonna be honest — I'm interested. And I don't say that lightly",
          "Stop being so interesting, I'm trying to play it cool over here and you're making it impossible 😈",
          "I could keep texting you or I could take you somewhere you won't forget. Your call 🔥",
          "Real talk — there's something here and I think we both feel it. Let's explore that",
        ];
      }
    }

    // ---- FLIRTY ----
    if (vibe === 'flirty') {
      if (s.isGreeting && s.isDryText) {
        pool = [
          "Hiii 😊 I was literally just thinking about you... no that's not a line, that's the truth",
          "Hey cutie 😘 You have impeccable timing because my day needed this",
          "Heyy ✨ There's this thing where I smile every time your name pops up. It's becoming a problem",
          "Oh hey you 😊 My phone just became my favorite thing. Weird how that works when you text",
        ];
      } else if (s.isGreeting) {
        pool = [
          "Heyyy! You just made my whole day and it's barely started 😊",
          "Well look who it is 😘 I was wondering how long you'd make me wait",
          "Hi! Fair warning: talking to you is dangerously addictive ✨",
          "Hey you! I hope you're having a great day — it just got better on my end 😊",
        ];
      } else if (s.isCompliment) {
        pool = [
          "Stopppp you're making me blush 🙈 But also don't stop, it's working",
          "That is SO sweet 😊 You're not so bad yourself... like, really not bad at all 😘",
          "Okay smooth talker 😏 But seriously that made my whole week. You're adorable",
          "You can't just say things like that and expect me not to fall for you 🙈",
          "Now I'm blushing AND smiling. You're dangerous, you know that? 😘",
        ];
      } else if (s.isAboutFun || s.isAboutPlans) {
        pool = [
          "Hmm well lately my favorite thing to do is talk to you sooo 😊 Are you free this week? I'm just curious... 👀",
          "I mean, I could tell you... or I could show you? Just a thought 😘",
          "Everything's more fun with the right person. I think I found the right person 😊",
          "Well right now I'm into texting cute people. So basically just you ✨",
        ];
      } else if (s.isAboutFood) {
        pool = [
          "I love food almost as much as I love your texts... ALMOST 😊",
          "Is this your way of asking me to dinner? Because the answer is absolutely yes 😘",
          "Feed me and tell me I'm pretty and I'm yours forever. Simple terms 🙈",
          "Okay but if you cook for me I will quite literally never leave ✨",
        ];
      } else if (s.isGoodTime) {
        pool = [
          "Me too 🙈 Like genuinely, I haven't stopped thinking about it",
          "Same! I keep smiling about it like an idiot and my friends are giving me looks 😊",
          "It was so good. You're so good. When can I see you again? Asking for me 😘",
          "I had the BEST time. You're officially my favorite person to hang out with ✨",
        ];
      } else if (s.isLateReply) {
        pool = [
          "I was just about to double text you and I'm not even sorry about it 🙈",
          "You're forgiven because you're cute. But only this once 😘",
          "I may have checked my phone a few (dozen) times... but who's counting? 😊",
          "It's okay, I was busy being patient and attractive while I waited ✨",
        ];
      } else if (s.isFlirty) {
        pool = [
          "Okay you're literally making my heart do that thing 🙈 Stop... actually no, keep going",
          "You are TROUBLE and I am 100% here for it 😘",
          "Sir/ma'am this level of flirting should be illegal. I'm filing a report... after I reply 😊",
          "The chemistry here is actually insane. Do you feel it too or is it just me? ✨",
        ];
      } else if (s.isQuestion) {
        pool = [
          "Oooh good question! But I'm more curious about you honestly 😊 You first!",
          "I'll tell you anything you want to know. I'm an open book for you 😘",
          "The fact that you want to know things about me is actually so cute 🙈",
        ];
      } else {
        pool = [
          "You're literally the highlight of my day and I just wanted you to know that 😊",
          "I catch myself smiling at my phone because of you and it's becoming a thing 🙈",
          "How are you this easy to talk to? Like it's actually unfair ✨",
          "Every time you text me I get a little more hooked. You should know that 😘",
          "I'm trying to play it cool but you make it really really hard 🙈",
        ];
      }
    }

    // ---- MYSTERIOUS ----
    if (vibe === 'mysterious') {
      if (s.isGreeting && s.isDryText) {
        pool = [
          "Hey. I was actually just thinking about something you said last time... 🌙",
          "Hi. Perfect timing — I'm in one of those moods where I actually want to talk to someone",
          "Hey you. I have a question for you — but ask me something first",
          "Hey. I was going to text you later tonight, but you beat me to it",
        ];
      } else if (s.isGreeting) {
        pool = [
          "Hey. You caught me at an interesting moment. What's on your mind? 🌙",
          "Hi. I'm glad you texted — I had something I wanted to tell you",
          "Hey. There's something different about tonight. Good timing",
        ];
      } else if (s.isCompliment) {
        pool = [
          "Thank you. There's a lot more to me than meets the eye though 🌙",
          "That's sweet. But I think what you'd find most attractive about me, you haven't discovered yet",
          "You're perceptive. Most people don't notice what you just noticed",
          "I appreciate that. But honestly, the best parts of me are the ones you learn over time 🌙",
        ];
      } else if (s.isAboutFun || s.isAboutPlans) {
        pool = [
          "I keep myself busy with things most people don't know about. I'll tell you sometime... in person 🌙",
          "Hmm. That's a longer conversation. The kind that happens at 2am over coffee",
          "I'd rather show you my world than describe it. Some things don't translate to text",
          "I'm into a few things most people find unexpected. You'd have to earn that intel though 🌙",
        ];
      } else if (s.isGoodTime) {
        pool = [
          "I felt something too. I just wasn't sure if you noticed 🌙",
          "It was good. Different from what I expected, in the best way",
          "Same. There's a lot more where that came from... if you're curious",
          "I'm still thinking about it, if I'm being honest. That doesn't happen often 🌙",
        ];
      } else if (s.isLateReply) {
        pool = [
          "I was somewhere I couldn't text. I'll tell you about it when I see you 🌙",
          "Some things are worth waiting for. I think you know that",
          "I had my reasons. But I'm here now — and I'm all yours",
        ];
      } else if (s.isAboutWork) {
        pool = [
          "I do something that keeps me up at night — in a good way. I'll tell you more when we're face to face 🌙",
          "Let's just say I'm building something. You'll be impressed later",
          "I keep my professional life separate. But for you, I might make an exception 🌙",
        ];
      } else if (s.isQuestion) {
        pool = [
          "That's a question with a long answer. Let me think about how I want to tell you 🌙",
          "I could answer that... but I think I'd rather keep you curious for now",
          "You ask the kind of questions that make me want to actually open up. That's rare",
          "The answer to that would surprise you. Let me save it for when I can see your reaction 🌙",
        ];
      } else {
        pool = [
          "There's something about this conversation I didn't expect. In a good way 🌙",
          "You're different from what I anticipated. I mean that as a high compliment",
          "I don't give people my attention easily. You've earned it",
          "Interesting. You just revealed more about yourself than you think 🌙",
          "I'm starting to think meeting you wasn't random",
        ];
      }
    }

    // Shuffle and pick 3 unique responses
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }

  return { generateReplies, analyzeMessage };
})();


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
  const exampleChips = document.querySelectorAll('.example-chip');

  // Image upload elements
  const fileInput = document.getElementById('file-input');
  const btnUpload = document.getElementById('btn-upload');
  const imagePreviewStrip = document.getElementById('image-preview-strip');
  const dropOverlay = document.getElementById('drop-overlay');
  const ocrStatus = document.getElementById('ocr-status');
  const ocrStatusText = document.getElementById('ocr-status-text');

  let currentVibe = 'smooth';
  let isGenerating = false;
  let history = JSON.parse(localStorage.getItem('rizz_history') || '[]');
  let lastIncomingMsg = '';
  let imageQueue = []; // Array of { dataUrl, file } objects
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
    // Text input
    messageInput.addEventListener('input', handleInput);
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    // Send button
    btnSend.addEventListener('click', handleSend);

    // Vibe pills
    vibePills.forEach(pill => {
      pill.addEventListener('click', () => {
        vibePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentVibe = pill.dataset.vibe;
      });
    });

    // Example chips
    exampleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        messageInput.value = chip.dataset.example;
        handleInput();
        messageInput.focus();
      });
    });

    // Clear / New
    btnClear.addEventListener('click', resetChat);

    // History
    btnHistory.addEventListener('click', openHistory);
    btnCloseHistory.addEventListener('click', closeHistory);
    historyOverlay.addEventListener('click', closeHistory);
    btnClearHistory.addEventListener('click', clearHistory);

    // Image upload
    btnUpload.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);

    // Drag & Drop
    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', handleDrop);

    // Paste image from clipboard
    document.addEventListener('paste', handlePaste);
  }

  function handleInput() {
    const val = messageInput.value;
    charCount.textContent = `${val.length} / 1000`;

    // Auto-resize
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';

    // Toggle send button — active if text OR images present
    if ((val.trim().length > 0 || imageQueue.length > 0) && !isGenerating) {
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
      showToast(`${imageQueue.length} screenshot${imageQueue.length > 1 ? 's' : ''} attached 📸`);
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
        <button class="btn-remove-image" onclick="App.removeImage(${img.id})" title="Remove">×</button>
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
          logger: () => {} // suppress logs
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

  async function handleSend() {
    const msg = messageInput.value.trim();
    const hasImages = imageQueue.length > 0;
    if ((!msg && !hasImages) || isGenerating) return;

    isGenerating = true;

    // Capture images before clearing
    const sentImages = [...imageQueue];

    // Hide welcome, show messages
    welcomeScreen.style.display = 'none';
    messagesContainer.classList.add('active');

    // Clear input & images
    messageInput.value = '';
    clearAllImages();
    handleInput();

    // If we have images, run OCR first
    let extractedText = '';
    if (sentImages.length > 0) {
      // Show images in chat immediately
      addIncomingMessage(msg, sentImages, null);

      // Run OCR silently — text feeds into the engine but isn't shown
      extractedText = await extractTextFromImages(sentImages);
    } else {
      addIncomingMessage(msg, [], null);
    }

    // Determine text to feed to the engine
    // Priority: manual text > extracted OCR text > fallback
    const textForEngine = msg || extractedText || 'Hey';
    lastIncomingMsg = textForEngine;

    // Show typing indicator
    const typingEl = addTypingIndicator();
    chatArea.scrollTop = chatArea.scrollHeight;

    // Simulate generation delay
    const delay = 700 + Math.random() * 1100;
    setTimeout(() => {
      typingEl.remove();

      const replies = RizzEngine.generateReplies(textForEngine, currentVibe);
      addResponseGroup(replies, currentVibe);

      saveToHistory(msg || extractedText, replies, currentVibe, sentImages.length > 0);

      isGenerating = false;
      handleInput();

      chatArea.scrollTop = chatArea.scrollHeight;
    }, delay);
  }

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
      ? `📸 Their message (${images.length} screenshot${images.length > 1 ? 's' : ''})`
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
      smooth: '😏 Smooth',
      witty: '😂 Witty',
      bold: '🔥 Bold',
      flirty: '😘 Flirty',
      mysterious: '🌙 Mysterious',
    };

    const el = document.createElement('div');
    el.className = 'message response-group';

    let cardsHTML = replies.map((reply, i) => `
      <div class="response-card" data-reply="${escapeAttr(reply)}">
        <div class="response-card-top">
          <span class="response-number">Option ${i + 1}</span>
          <button class="btn-copy" onclick="App.copyReply(this, '${escapeAttr(reply)}')">
            <span>📋</span> Copy
          </button>
        </div>
        <div class="response-text">${escapeHtml(reply)}</div>
      </div>
    `).join('');

    el.innerHTML = `
      <div class="response-group-header">
        <span class="vibe-badge">${vibeLabels[vibe]}</span>
      </div>
      <div class="response-options">${cardsHTML}</div>
    `;

    messagesContainer.appendChild(el);

    // Add regenerate button
    const regenBtn = document.createElement('button');
    regenBtn.className = 'btn-regenerate';
    regenBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 4 23 10 17 10"/>
        <polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
      Regenerate
    `;
    regenBtn.addEventListener('click', () => handleRegenerate(el, regenBtn));
    messagesContainer.appendChild(regenBtn);

    // Stagger animation
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

  function handleRegenerate(groupEl, regenBtn) {
    if (isGenerating || !lastIncomingMsg) return;
    isGenerating = true;

    // Remove old responses & regen button
    groupEl.remove();
    regenBtn.remove();

    // Show typing
    const typingEl = addTypingIndicator();

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      typingEl.remove();
      const replies = RizzEngine.generateReplies(lastIncomingMsg, currentVibe);
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
          <span>🕐</span>
          <p>No history yet. Start cooking!</p>
        </div>
      `;
      return;
    }

    historyList.innerHTML = history.map(item => {
      const time = new Date(item.timestamp);
      const timeStr = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + 
                      ' · ' + time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      const imgBadge = item.hasImage ? '📸 ' : '';
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
      btnEl.innerHTML = '<span>✓</span> Copied!';
      btnEl.classList.add('copied');
      showToast('Copied to clipboard — go get em 🔥');
      setTimeout(() => {
        btnEl.innerHTML = '<span>📋</span> Copy';
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
