/* =============================================
   RIZZ ENGINE v2 — Behavioral Psychology Core
   Your friend who always knows the right thing to say
   ============================================= */

const RizzEngine = (() => {

  // === UTILITY: Randomization helpers ===
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  const coinFlip = () => Math.random() > 0.5;

  // Dynamic fragments to make every response unique
  const timeGreets = () => {
    const h = new Date().getHours();
    if (h < 12) return pick(['this morning', 'this early', 'before noon']);
    if (h < 17) return pick(['this afternoon', 'today', 'right now']);
    if (h < 21) return pick(['this evening', 'tonight', 'right now']);
    return pick(['this late', 'tonight', 'at this hour']);
  };

  const fillers = {
    honestly: pick(['honestly', 'genuinely', 'real talk', 'not gonna lie', 'truth is', 'lowkey']),
    interesting: pick(['interesting', 'intriguing', 'different', 'refreshing', 'unexpected']),
    good: pick(['incredible', 'amazing', 'perfect', 'unreal', 'wild']),
  };

  const emojis = {
    smooth: () => pick(['😌', '✨', '😏', '💫', '🤙']),
    witty: () => pick(['😂', '💀', '🎬', '😭', '🤌']),
    bold: () => pick(['🔥', '😈', '💯', '⚡', '👀']),
    flirty: () => pick(['😊', '🙈', '😘', '✨', '💕']),
    mysterious: () => pick(['🌙', '🖤', '💭', '🌌', '✨']),
  };

  // Dynamic detail injectors — making every response one-of-a-kind
  const spots = () => pick([
    'that new place downtown', 'this spot I just found', 'somewhere with a rooftop',
    'this hidden gem I know', 'the best place in the city', 'a spot with the best vibes',
    'this place with live music', 'a cafe with the best coffee', 'somewhere cozy',
    'this restaurant everyone\'s been talking about', 'a bar with crazy good cocktails'
  ]);

  const activities = () => pick([
    'grab coffee', 'get food', 'go for a walk', 'check out this spot',
    'get drinks', 'try this new restaurant', 'go on an adventure',
    'explore the city', 'cook something', 'watch the sunset'
  ]);

  const timeframes = () => pick([
    'this weekend', 'Friday night', 'sometime this week', 'soon',
    'tomorrow', 'one of these days', 'when you\'re free next'
  ]);

  // === CONTEXT ANALYZER ===
  function analyzeMessage(msg) {
    const lower = msg.toLowerCase().trim();
    return {
      isQuestion: /\?/.test(msg),
      isCompliment: /cute|pretty|handsome|beautiful|gorgeous|attractive|hot|fine|good.?looking|stunning|sexy/i.test(lower),
      isGreeting: /^(hey|hi|hello|yo|sup|what's up|heyy+|hii+|waddup|howdy)\b/i.test(lower),
      isDryText: lower.length < 10 && !/\?/.test(msg),
      isFlirty: /😘|😏|😍|🥰|❤|💕|😉|wink|flirt|date|crush|kiss|babe|baby/i.test(lower),
      isAboutPlans: /what.*do|plans|free|busy|hang|meet|grab|chill|come over|link up|when|available/i.test(lower),
      isAboutFun: /fun|hobby|hobbies|free time|interests|passion|enjoy/i.test(lower),
      isAboutWork: /work|job|career|school|study|college|major|intern/i.test(lower),
      isAboutFood: /food|eat|dinner|lunch|coffee|restaurant|cook|hungry|brunch|pizza|sushi/i.test(lower),
      isAboutMusic: /music|song|listen|concert|playlist|spotify|artist|band|album/i.test(lower),
      isAboutTravel: /travel|trip|vacation|city|country|visit|fly|beach|abroad/i.test(lower),
      isAboutFitness: /hike|hiking|trail|mountain|nature|outdoor|gym|workout|lift|fitness|exercise|run|yoga/i.test(lower),
      isPlayful: /haha|lol|lmao|😂|🤣|funny|joke|dead|crying/i.test(lower),
      isLateReply: /took.*long|slow.*reply|late|ghost|ignore|respond|where.*been/i.test(lower),
      isGoodTime: /great time|amazing|fun|wonderful|best|loved|enjoyed|awesome|incredible|so good/i.test(lower),
      isPositive: /yes|yeah|yea|sure|definitely|absolutely|of course|down|bet|sounds good|i'd love|love to|omg|wow/i.test(lower),
      isNegative: /no|nah|not really|idk|maybe|i guess|can't|won't|busy|pass/i.test(lower),
      isAboutHer: /tell.*about you|what.*you like|describe|who are you|your type/i.test(lower),
      isSharing: lower.length > 40,
      wordCount: lower.split(/\s+/).length,
      hasEmoji: /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}]/u.test(msg),
    };
  }

  // === CONVERSATION PHASE DETECTOR ===
  // Determines where in the conversation arc we are
  function detectPhase(msg, s) {
    if (s.isGreeting && s.isDryText) return 'opener';
    if (s.isGreeting) return 'early';
    if (s.isAboutPlans || s.isPositive) return 'bridge';
    if (s.isGoodTime || s.isFlirty) return 'close';
    return 'build';
  }

  // === CONVERSATION STARTERS (no screenshot mode) ===
  function generateStarters(vibe) {
    const v = emojis[vibe];
    const starters = {
      smooth: [
        () => `I don't usually message first, but ${pick(['your smile caught me off guard', 'something about your profile stopped my scroll', 'I had to know the person behind that photo'])} ${v()}`,
        () => `I have a theory that people who ${pick(['love dogs', 'travel solo', 'read actual books', 'listen to good music', 'take candid photos'])} are automatically more interesting. Testing it now ${v()}`,
        () => `Okay I'm just going to say it — ${pick(["you've got this energy I can't quite figure out", "your vibe is different and I mean that as a compliment", "I've been trying to think of something clever but honestly your photos left me speechless"])} ${v()}`,
        () => `Something tells me you're the kind of person who ${pick(["makes everywhere they go more fun", "has a story behind every photo", "laughs at their own jokes (same)", "orders dessert first"])} ${v()}`,
        () => `Not going to hit you with a pickup line because ${pick(["you deserve better than that", "I actually want to talk to you", "they never work anyway"])}. So instead — ${pick(["what's the best thing that happened to you this week?", "what's something you're excited about right now?", "tell me your most unpopular opinion"])} ${v()}`,
        () => `I was going to play it cool and wait, but ${pick(["life's too short for that", "I figured why not", "honestly I just wanted to talk to you"])}. What's your ${pick(["favorite way to spend a Sunday?", "go-to comfort food?", "best travel story?"])} ${v()}`,
      ],
      witty: [
        () => `On a scale of "hey" to actually creative, I'm going to aim for at least a solid 7 here — ${pick(["what's the wildest thing you did this month?", "quick, tell me your most controversial food take", "let's skip the small talk, what are you passionate about?"])} ${v()}`,
        () => `My opening line strategy: ${pick(["Google 'best pickup lines' → realize they're all terrible → just be genuine", "overthink for 20 minutes → type 'hey' → delete it → try this instead", "consult my friends → ignore their advice → wing it"])} ${v()}`,
        () => `I'm not saying I stalked your profile but I definitely ${pick(["formed some strong opinions about your music taste", "noticed we have the same vibe and I need to investigate", "spent way too long trying to be clever about this"])}. Anyway, hi ${v()}`,
        () => `Fun fact: ${pick(["you just made me stop doom-scrolling", "I've rewritten this message 4 times", "this is my first message today and I chose you"])}. I feel like that says something ${v()}`,
        () => `Quick compatibility test: ${pick(["pineapple on pizza — yes or no? (there's a right answer)", "morning person or night owl? (this determines everything)", "Netflix or actually going out? (trick question, the answer is both)"])} ${v()}`,
      ],
      bold: [
        () => `I'll skip the games — ${pick(["you caught my attention and I'd rather be direct about it", "I think we should talk and see what happens", "something about you tells me we'd have a great time together"])} ${v()}`,
        () => `Here's my pitch: ${pick(["I'm fun, I'm honest, and I think you're worth messaging first", "one conversation with me and you'll want a second one", "I'd rather meet in person than text forever"])}. ${pick(["You in?", "What do you say?", "Ball's in your court"])} ${v()}`,
        () => `First impressions matter so here's mine — ${pick(["you look like trouble in the best way", "I think we'd vibe really well", "you seem like someone who matches my energy"])}. ${pick(["Prove me right", "Tell me I'm wrong", "Let's find out"])} ${v()}`,
        () => `I'm going to be honest — I almost didn't message because ${pick(["I figured someone like you gets a hundred messages a day", "I wasn't sure I could be interesting enough", "I usually don't do this"])}. But ${pick(["I'd regret not trying", "here I am", "you're worth the risk"])} ${v()}`,
      ],
      flirty: [
        () => `Is it weird that I've been smiling at my phone since I saw your profile? Because ${pick(["that's definitely happening right now", "my friends are definitely judging me", "I should probably stop but I can't"])} ${v()}`,
        () => `I have a confession — I've been ${pick(["looking for an excuse to message you", "trying to play it cool but failing miserably", "wanting to say hi but couldn't think of anything cute enough"])}. So here I am, just going for it ${v()}`,
        () => `Okay but ${pick(["how are you this cute?", "your smile in that photo is genuinely unfair", "you're making everyone else on this app look boring"])} — I had to say something ${v()}`,
        () => `Hi, I'm your new favorite notification ${v()} ${pick(["Let me earn that title though", "No pressure, just vibes", "Feel free to prove me wrong"])}`,
      ],
      mysterious: [
        () => `I almost didn't message you. Then I saw ${pick(["that one photo and changed my mind", "something in your profile that made me curious", "something I can't quite explain"])} ${v()}`,
        () => `I have a question for you, but I'll save it. First — ${pick(["tell me something nobody knows about you", "what's on your mind right now?", "what's the last thing that genuinely surprised you?"])} ${v()}`,
        () => `There's something about ${pick(["the way you carry yourself", "people who don't try too hard", "your energy"])} that tells me this conversation could be ${pick(["interesting", "different", "worth having"])} ${v()}`,
        () => `Most people here are an open book. You seem more like ${pick(["a whole library", "a locked journal", "a story I want to read"])} ${v()}`,
      ],
    };
    return shuffle(starters[vibe].map(fn => fn())).slice(0, 3);
  }

  // === MAIN REPLY GENERATOR ===
  function generateReplies(msg, vibe) {
    const s = analyzeMessage(msg);
    const phase = detectPhase(msg, s);
    const v = emojis[vibe];
    let pool = [];

    // === BRIDGE/CLOSE TEMPLATES (used across vibes to push toward IRL) ===
    const bridgeLines = [
      () => `${pick(["You know what", "Real talk", "Honestly"])} — texting is cool but I feel like our energy would be ${pick(["even better", "way more fun", "next level"])} in person. Let's ${activities()} ${timeframes()} ${v()}`,
      () => `Okay we clearly vibe. ${pick(["So here's my move", "Next step", "I'll just say it"])} — let me take you to ${spots()} ${timeframes()} ${v()}`,
      () => `I'm having way too much fun texting you and that usually means ${pick(["we'd have an amazing time hanging out", "we should definitely meet up", "I need to see if you're this fun in person"])} ${v()}`,
    ];

    const closeLines = [
      () => `This is the part where I ${pick(["shoot my shot", "make my move", "stop being smooth and just ask"])} — let's ${activities()} ${timeframes()}. I know ${spots()} ${v()}`,
      () => `I'm convinced we need to hang out. ${pick(["Not asking, telling", "This isn't a question anymore", "I've already decided"])} ${v()} What's your schedule like ${timeframes()}?`,
      () => `We've been going back and forth and I love it — but I'd rather ${pick(["hear your laugh in person", "see that smile across from me", "actually hang out with you"])}. ${pick(["Coffee? Dinner? Adventure?", "When are you free?", "Pick a day, I'll plan the rest"])} ${v()}`,
    ];

    // Inject bridge/close into later phases regardless of vibe
    if (phase === 'close' || (phase === 'bridge' && coinFlip())) {
      pool.push(...bridgeLines.map(fn => fn()));
      pool.push(...closeLines.map(fn => fn()));
    }

    // === VIBE-SPECIFIC RESPONSES ===
    if (vibe === 'smooth') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `Hey ${v()} ${pick(["I was hoping you'd text me", "Perfect timing, I just got interesting", "You just made my phone worth picking up"])} ${timeGreets()}`,
          `There she is ${v()} I had a feeling about you ${timeGreets()}. ${pick(["So what's on your mind?", "Talk to me", "Tell me something good"])}`,
          `${pick(["Well well well", "Look who it is", "And there's the notification I wanted"])} ${v()} I was ${pick(["just thinking about what to say if you texted", "wondering when you'd come around", "about to text you first honestly"])}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `${pick(["Careful", "Watch it", "Easy"])} — compliments like that are how people catch feelings ${v()} ${pick(["But I appreciate you. You've got great taste", "Not that I'm complaining", "Tell me more though, I'm listening"])}`,
          `That ${pick(["actually means a lot", "hit different coming from you", "made my whole day and it's barely started"])} ${v()} ${pick(["You're not too bad yourself", "I could say the same about you honestly", "The feeling is mutual, trust me"])}`,
        );
      } else if (s.isAboutFun || s.isAboutPlans) {
        pool.push(
          `${pick(["Honestly", "Real talk"])} — I'd rather show you than tell you ${v()} Let's ${activities()} ${timeframes()} and you can see for yourself`,
          `I keep it spontaneous. The best moments in life aren't planned — ${pick(["they just happen with the right person", "and something tells me you get that", "which is why we should just link up and see what happens"])} ${v()}`,
          `Right now? My favorite thing to do is ${pick(["find new spots around the city", "try things I've never done", "make plans with interesting people"])}. ${pick(["And you qualify", "You seem like you'd be down", "Something tells me we'd have fun"])} ${v()}`,
        );
      } else if (s.isAboutFood) {
        pool.push(
          `${pick(["Foodie detected", "Okay we're speaking my language now", "This is where I shine"])} ${v()} I know ${spots()} — we should go ${timeframes()}. ${pick(["My treat", "You pick the cuisine, I'll pick the spot", "Fair warning: I take food very seriously"])}`,
          `The way to my heart is 100% through food ${v()} ${pick(["And I know this spot that would blow your mind", "We should cook together sometime honestly", "Let me take you somewhere — I promise it's worth it"])}`,
        );
      } else if (s.isAboutMusic) {
        pool.push(
          `Music taste is the #1 compatibility test and ${pick(["I have a feeling you'd pass", "something tells me yours is fire", "I'm ready to be judged"])} ${v()} ${pick(["Send me your top 3 right now", "We should swap playlists", "Actually — let's go to a concert together and find out"])}`,
        );
      } else if (s.isGoodTime) {
        pool.push(
          `${pick(["Same — and that's rare for me", "I'm glad it wasn't just me feeling that", "I haven't stopped thinking about it"])} ${v()} When's round two? Because I already have ${pick(["ideas", "a plan", "somewhere in mind"])}`,
          `That was ${pick(fillers.good)} ${v()} But ${pick(["honestly that was just the preview", "I think we can top it", "the next one will be even better"])}. Let's ${activities()} ${timeframes()}`,
        );
      } else if (s.isPositive) {
        pool.push(
          `${pick(["Love that energy", "That's what I like to hear", "See, this is why I fw you"])} ${v()} ${pick(["So let's make it happen", "I'm free " + timeframes(), "What's your schedule looking like?"])}`,
          `${pick(["Bet", "Say less", "Perfect"])} ${v()} I know ${spots()} — ${pick(["you're going to love it", "it's exactly your vibe", "trust me on this one"])}`,
        );
      } else if (s.isLateReply) {
        pool.push(
          `Worth the wait though right? ${v()} ${pick(["Let me make it up to you", "I owe you for that — coffee?", "I'm here now and you've got my undivided attention"])}`,
        );
      } else if (s.isSharing) {
        pool.push(
          `I love that you're ${pick(["opening up like this", "actually real about it", "not afraid to share that"])} ${v()} ${pick(["Most people keep it surface level. You're different", "That tells me a lot about you — all good things", "We should definitely talk about this more — but in person"])}`,
        );
      } else if (s.isQuestion) {
        pool.push(
          `${pick(["Great question", "I love that you asked that", "Hmm"])} — but I'd rather tell you in person ${v()} ${pick(["It's a better story face to face", "Some things don't translate over text", "Let's " + activities() + " and I'll tell you everything"])}`,
          `I'll answer that — but first ${pick(["tell me something unexpected about you", "you have to answer one of mine", "what made you curious about that?"])} ${v()}`,
        );
      } else {
        pool.push(
          `${pick(["You've got my attention", "I'm invested now", "Keep going"])} — ${pick(["that doesn't happen easily", "and I want to know more", "but some things are better in person"])} ${v()} Let's ${activities()} ${timeframes()}`,
          `There's something about you that's ${pick([fillers.interesting])} ${v()} ${pick(["I can't quite figure it out over text though", "We should hang out and I'll figure it out", "Tell me more — or better yet, show me in person"])}`,
          `${pick(["I like where this is going", "You're making it really easy to want to hang out with you", "This conversation is proof we need to meet up"])} ${v()}`,
        );
      }
    }

    if (vibe === 'witty') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `"Hey" — ${pick(["the universal text for 'I thought about you but couldn't think of anything clever'", "bold opening, let's see where this goes", "the appetizer before the main course of conversation"])} ${v()} ${pick(["I expect more from you next time", "Lucky for you I'm interesting enough for both of us", "I'll carry this conversation on my back if I have to"])}`,
          `You sent "hey" like I'm not ${pick(["the most fun person in your phone right now", "about to make your whole evening better", "literally the best texter you'll ever meet"])} ${v()}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `I know ${v()} But it's nice to hear from someone with ${pick(["impeccable taste", "working eyes", "clearly superior judgment"])}. ${pick(["Your turn — what's your biggest flex?", "Now say it to my face over " + activities(), "Plot twist: you're cuter"])}`,
          `Thank you I'll add that to my ${pick(["growing collection of compliments", "reasons to be confident today", "evidence that I'm a catch"])} ${v()} ${pick(["But seriously — let's hang out so you can collect more evidence", "Wanna see if I'm this charming in person?"])}`,
        );
      } else if (s.isAboutFun) {
        pool.push(
          `For fun I ${pick(["professionally overthink everything", "collect hobbies like they're Pokemon", "alternate between being productive and lying on my couch pretending I don't exist"])} ${v()} But ${pick(["I'm way more fun in person", "the real question is what are WE doing " + timeframes(), "I'd rather show you my fun side over " + activities()])}`,
        );
      } else if (s.isAboutFood) {
        pool.push(
          `My food takes are ${pick(["legally controversial", "strong enough to end friendships", "the only thing I'm passionate about"])} ${v()} ${pick(["Let's argue about it over dinner", "I'll prove my taste at " + spots(), "The only way to settle this is " + activities() + " " + timeframes()])}`,
        );
      } else if (s.isPositive) {
        pool.push(
          `${pick(["Excellent", "Perfect answer", "You passed the vibe check"])} ${v()} ${pick(["Let's celebrate with " + activities(), "I knew I liked you", "See you " + timeframes() + " then?"])}`,
        );
      } else if (s.isLateReply) {
        pool.push(
          `I forgive you but only because ${pick(["you're cute enough to get away with it", "I was busy being mysterious anyway", "my schedule was packed with being awesome"])} ${v()} ${pick(["Make it up to me — " + activities() + "?", "You owe me quality time now", "Penalty: you have to hang out with me"])}`,
        );
      } else {
        pool.push(
          `I'm saving this conversation as proof that ${pick(["I'm actually charming", "two people can vibe this hard over text", "we need to hang out immediately"])} ${v()} ${pick(["When are we making this happen?", "Let's take this offline", activities() + " " + timeframes() + "?"])}`,
          `You're ${pick(["dangerously fun to talk to", "making my phone the most interesting thing in the room", "the kind of person I'd actually want to hang out with"])} ${v()} ${pick(["And that's a high bar", "So let's actually do it", "Prove me right — " + timeframes()])}`,
        );
      }
    }

    if (vibe === 'bold') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `Don't "hey" me — ${pick(["I know you had something better to say", "say what's actually on your mind", "we're past that"])} ${v()} ${pick(["I'm worth more than three letters", "Give me your best opener and I'll match it", "Let's skip to the part where we make plans"])}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `I know. And you're bold for saying it — ${pick(["respect", "I like that", "most people think it but don't say it"])} ${v()} Your turn to hear the truth: ${pick(["you're the reason I opened this app today", "we should stop texting and go out", "I want to take you to " + spots()])}`,
        );
      } else if (s.isAboutPlans || s.isAboutFun) {
        pool.push(
          `Why are we still typing? ${v()} ${pick(["Friday. 8pm. You pick the place", "Let's " + activities() + " — I'm free " + timeframes(), "I don't do boring and neither do you. Let's go"])}`,
          `Here's what's happening — we're going to ${activities()} ${timeframes()} ${v()} ${pick(["I'll find the spot", "You pick, I'll show up", "No excuses, no rain checks"])}`,
        );
      } else if (s.isPositive) {
        pool.push(
          `${pick(["That's what I wanted to hear", "Bet", "Let's go then"])} ${v()} I know ${spots()} — ${pick(["be ready " + timeframes(), "send me your number and I'll set it up", "I'll handle the details, you just show up"])}`,
        );
      } else if (s.isNegative) {
        pool.push(
          `${pick(["I respect that", "Fair enough", "No pressure"])} — but I think you'd change your mind if ${pick(["you saw what I had planned", "we actually hung out", "you gave me one shot"])} ${v()} ${pick(["Just saying", "The offer stands", "Think about it"])}`,
        );
      } else {
        pool.push(
          `I'm going to be direct — ${pick(["I'm interested and I don't say that lightly", "I think we should meet up", "I'd rather get to know you over " + activities() + " than keep texting"])} ${v()} ${pick(["Your move", "What do you say?", "When are you free?"])}`,
          `${pick(["Real talk", "Straight up", "No games"])} — ${pick(["every text makes me more sure we should hang", "I want to see if the energy matches in person", "you're too interesting for just texting"])} ${v()} Let me take you to ${spots()} ${timeframes()}`,
        );
      }
    }

    if (vibe === 'flirty') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `Hiii ${v()} ${pick(["There's this thing where I smile every time I see your name pop up", "You literally just made my " + timeGreets() + " better", "I was hoping you'd text — is that weird? I don't care"])}`,
          `Hey you ${v()} ${pick(["I may or may not have checked my phone hoping it was you", "My day just went from a 6 to a 10", "You have impeccable timing because I was just thinking about you"])}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `Stop you're going to make me blush ${v()} ${pick(["But also never stop", "You can't say things like that and not expect me to fall for you", "Say it again but this time to my face over " + activities()])}`,
          `${pick(["Okay smooth talker", "You're literally too sweet", "Now I'm blushing AND smiling"])} ${v()} ${pick(["I think you need to tell me that in person", "We should hang out so I can return the compliment properly", "You're dangerously charming, you know that?"])}`,
        );
      } else if (s.isAboutFun || s.isAboutPlans) {
        pool.push(
          `${pick(["Lately my favorite thing is talking to you", "Everything's more fun with the right person", "I have so many ideas for us"])} ${v()} ${pick(["Are you free " + timeframes() + "? Asking for me", "Let's " + activities() + " — I promise I'm even cuter in person", "Let me plan something for us"])}`,
        );
      } else if (s.isPositive) {
        pool.push(
          `${pick(["Yesss", "I was hoping you'd say that", "You just made my whole week"])} ${v()} ${pick(["I'm already excited", "Let's do " + timeframes(), "I might be too happy about this but I don't care"])} — ${activities()} at ${spots()}? ${v()}`,
        );
      } else if (s.isGoodTime) {
        pool.push(
          `Me too ${v()} Like ${pick(["genuinely I haven't stopped thinking about it", "I keep smiling when I think about it and my friends are judging me", "it was so perfect"])}. ${pick(["When can I see you again?", "Round two soon please?", "Let's do it again " + timeframes()])}`,
        );
      } else {
        pool.push(
          `You're making it ${pick(["really hard to play it cool", "impossible not to smile", "very clear that I need to see you in person"])} ${v()} ${pick(["Let's " + activities() + " " + timeframes(), "I need to see if you're this adorable face to face", "How are you this easy to talk to?"])}`,
          `Every time you text I get a little more hooked ${v()} ${pick(["We should probably hang out before I catch actual feelings", "Let's meet up and see what happens", "I think " + activities() + " " + timeframes() + " is the move"])}`,
        );
      }
    }

    if (vibe === 'mysterious') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `Hey. ${pick(["Perfect timing", "Interesting", "I was just thinking about something"])} ${v()} ${pick(["I have a question for you — but you go first", "Tell me something nobody knows about you", "What's on your mind right now?"])}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `${pick(["I appreciate that", "Thank you", "That is sweet"])}. But the best parts of me? ${pick(["You haven't seen those yet", "Those take time to discover", "You'd have to earn that"])} ${v()} ${pick(["Maybe over " + activities() + " sometime", "In person is a different experience", "Some things are better discovered, not told"])}`,
        );
      } else if (s.isAboutFun || s.isAboutPlans) {
        pool.push(
          `I keep myself busy with things most people ${pick(["don't expect", "wouldn't guess", "find surprising"])} ${v()} ${pick(["I'd tell you but it's better if I show you", "Come find out — " + timeframes(), "It's a longer story. The kind that happens over " + activities()])}`,
        );
      } else if (s.isQuestion) {
        pool.push(
          `That's a question with a ${pick(["long answer", "story behind it", "different answer depending on the day"])} ${v()} ${pick(["Let me save it for when I can see your reaction", "I'll tell you — but in person", "Meet me at " + spots() + " and I'll explain everything"])}`,
        );
      } else {
        pool.push(
          `${pick(["There's something about this conversation I didn't expect", "You're different from what I anticipated", "I don't give people my attention easily"])} ${v()} ${pick(["And I mean that as a high compliment", "You've earned it", "Let's see where this goes — maybe " + activities() + " " + timeframes()])}`,
          `I'm starting to think ${pick(["meeting you wasn't random", "we should take this conversation somewhere real", "texting isn't enough anymore"])} ${v()} ${pick(["I know " + spots(), "Let me show you my world", "Some connections are better explored in person"])}`,
        );
      }
    }

    // Deduplicate and return 3
    const unique = [...new Set(pool)];
    return shuffle(unique).slice(0, 3);
  }

  return { generateReplies, generateStarters, analyzeMessage };
})();
