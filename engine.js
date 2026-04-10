/* =============================================
   RIZZ ENGINE v3 — Tension & Attraction Core
   Your wingman who understands desire psychology
   ============================================= */

const RizzEngine = (() => {

  // === UTILITY ===
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  const coinFlip = () => Math.random() > 0.5;

  const timeGreets = () => {
    const h = new Date().getHours();
    if (h < 12) return pick(['this morning', 'this early']);
    if (h < 17) return pick(['this afternoon', 'today']);
    if (h < 21) return pick(['tonight', 'this evening']);
    return pick(['this late', 'at this hour']);
  };

  const emojis = {
    smooth: () => pick(['\u{1F60C}', '\u2728', '\u{1F60F}', '\u{1F4AB}']),
    witty: () => pick(['\u{1F602}', '\u{1F480}', '\u{1F3AC}', '\u{1F62D}', '\u{1F90C}']),
    bold: () => pick(['\u{1F525}', '\u{1F608}', '\u{1F4AF}', '\u26A1', '\u{1F440}']),
    flirty: () => pick(['\u{1F60A}', '\u{1F648}', '\u{1F618}', '\u2728', '\u{1F495}']),
    mysterious: () => pick(['\u{1F319}', '\u{1F5A4}', '\u{1F4AD}', '\u{1F30C}', '\u2728']),
  };

  // === DYNAMIC FRAGMENTS ===
  // These inject randomness so no two users ever get the same line
  const tensions = () => pick([
    'something about you I can\'t figure out',
    'this energy between us',
    'the way you text',
    'how you make me feel through a screen',
    'whatever this is',
    'the tension in this conversation',
  ]);

  const imaginations = () => pick([
    'what it would be like to hear you laugh',
    'what your voice sounds like when you\'re being serious',
    'if you\'re this fun over text what you\'re like in person',
    'what you smell like up close',
    'how it would feel to be next to you right now',
    'what you look like first thing in the morning',
    'if your hugs are as warm as your energy',
  ]);

  const pullbacks = () => pick([
    'but I\'m not gonna say too much',
    'but I\'ll keep that to myself for now',
    'anyway, moving on before I say something I shouldn\'t',
    'but you didn\'t hear that from me',
    'I probably shouldn\'t have said that',
    'but I\'ll stop there',
    'but that\'s a conversation for another time',
  ]);

  const dares = () => pick([
    'I dare you to say something that surprises me',
    'say something bold. I want to see that side of you',
    'tell me something you wouldn\'t tell just anyone',
    'what\'s the most honest thing you could say to me right now?',
    'tell me what you\'re actually thinking',
    'say what\'s on your mind, unfiltered',
  ]);

  const seeds = () => pick([
    'I keep picturing',
    'I can\'t stop thinking about',
    'something about you makes me wonder',
    'I have this image in my head of',
    'there\'s this thought I keep having about',
    'I\'ve been imagining',
  ]);

  // === CONTEXT ANALYZER ===
  function analyzeMessage(msg) {
    const lower = msg.toLowerCase().trim();
    return {
      isQuestion: /\?/.test(msg),
      isCompliment: /cute|pretty|handsome|beautiful|gorgeous|attractive|hot|fine|good.?looking|stunning|sexy/i.test(lower),
      isGreeting: /^(hey|hi|hello|yo|sup|what's up|heyy+|hii+|waddup|howdy)\b/i.test(lower),
      isDryText: lower.length < 10 && !/\?/.test(msg),
      isFlirty: /\u{1F618}|\u{1F60F}|\u{1F60D}|\u{1F970}|\u2764|\u{1F495}|\u{1F609}|wink|flirt|date|crush|kiss|babe|baby/iu.test(lower),
      isAboutPlans: /what.*do|plans|free|busy|hang|meet|grab|chill|come over|link up|when|available/i.test(lower),
      isAboutFun: /fun|hobby|hobbies|free time|interests|passion|enjoy/i.test(lower),
      isAboutWork: /work|job|career|school|study|college|major|intern/i.test(lower),
      isAboutFood: /food|eat|dinner|lunch|coffee|restaurant|cook|hungry|brunch|pizza|sushi/i.test(lower),
      isAboutMusic: /music|song|listen|concert|playlist|spotify|artist|band|album/i.test(lower),
      isAboutTravel: /travel|trip|vacation|city|country|visit|fly|beach|abroad/i.test(lower),
      isAboutFitness: /hike|hiking|trail|mountain|nature|outdoor|gym|workout|lift|fitness|exercise|run|yoga/i.test(lower),
      isPlayful: /haha|lol|lmao|\u{1F602}|\u{1F923}|funny|joke|dead|crying/iu.test(lower),
      isLateReply: /took.*long|slow.*reply|late|ghost|ignore|respond|where.*been/i.test(lower),
      isGoodTime: /great time|amazing|fun|wonderful|best|loved|enjoyed|awesome|incredible|so good/i.test(lower),
      isPositive: /yes|yeah|yea|sure|definitely|absolutely|of course|down|bet|sounds good|i'd love|love to|omg|wow/i.test(lower),
      isNegative: /no|nah|not really|idk|maybe|i guess|can't|won't|busy|pass/i.test(lower),
      isSharing: lower.length > 40,
      isSexual: /bed|sleep.*with|come over|your place|my place|alone|tonight|miss you|need you|want you|thinking.*about.*you/i.test(lower),
      isNight: /night|goodnight|gn|sleep|bed|late|tired/i.test(lower),
      wordCount: lower.split(/\s+/).length,
      hasEmoji: /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}]/u.test(msg),
    };
  }

  // === CONVERSATION STARTERS ===
  function generateStarters(vibe) {
    const v = emojis[vibe];
    const starters = {
      smooth: [
        () => `I don't usually message first. But ${pick(["something about your profile pulled me in", "I couldn't scroll past you", "I had to know if your vibe matches your photos"])} ${v()}`,
        () => `I have a theory that people who ${pick(["travel alone", "read real books", "take sunset photos", "have dogs in their pics"])} are automatically more interesting. Testing it ${v()}`,
        () => `Okay I'm just going to say it \u2014 ${pick(["you've got an energy I can't quite read", "there's something about you I need to figure out", "your vibe is magnetic and I'm not even trying to resist"])} ${v()}`,
        () => `Something tells me you're the type who ${pick(["makes everyone in the room curious", "doesn't realize the effect you have on people", "is way more dangerous than you look"])} ${v()}`,
        () => `Not gonna lie, I've been staring at your profile trying to think of something clever. ${pick(["Gave up. Here's honesty instead", "Failed. You're too distracting", "Then realized you'd probably respect realness more"])} ${v()}`,
        () => `I was going to play it cool but ${pick(["that felt fake", "you deserve more than games", "honestly? I just wanted to talk to you"])}. What's one thing about you that would surprise me? ${v()}`,
      ],
      witty: [
        () => `My opening line strategy: ${pick(["Google 'best openers' \u2192 cringe \u2192 just be myself", "overthink for 20 mins \u2192 type 'hey' \u2192 delete \u2192 try this", "consult friends \u2192 ignore them \u2192 wing it"])} ${v()}`,
        () => `Quick compatibility test: ${pick(["pineapple on pizza \u2014 yes or no? (there's a right answer)", "morning person or chaos gremlin? (this decides everything)", "do you double text or have self-control? (I don't)"])} ${v()}`,
        () => `Fun fact: ${pick(["you just made me stop doom-scrolling", "I rewrote this 4 times", "this is my first message today and I picked you"])}. I feel like that says something ${v()}`,
        () => `I'm not saying I analyzed your profile but I definitely ${pick(["formed opinions about your taste", "noticed we have the same energy", "realized you're the kind of trouble I like"])} ${v()}`,
        () => `On a scale of 'hey' to actually creative, I'm aiming for a 7. ${pick(["What's the wildest thing you did this month?", "Give me your most controversial opinion", "Tell me something your friends don't know"])} ${v()}`,
      ],
      bold: [
        () => `I'll skip the small talk \u2014 ${pick(["you caught my eye and I'm not pretending you didn't", "I think we'd have insane chemistry", "something about you tells me you can handle directness"])} ${v()}`,
        () => `Here's the deal: ${pick(["I'm interesting, I'm real, and I think you're worth the risk", "one conversation with me and you'll want another", "I'm not here to waste your time or mine"])}. ${pick(["Your move", "Impress me", "Show me what you got"])} ${v()}`,
        () => `I'm going to be honest \u2014 I almost didn't message because ${pick(["you're intimidatingly attractive", "I wasn't sure I could keep up", "I don't do this often"])}. But ${pick(["I'd regret not trying", "fortune favors the bold", "here I am"])} ${v()}`,
        () => `First impression? ${pick(["You look like trouble and I'm absolutely here for it", "You have this energy that makes people curious", "You seem like you'd match my intensity"])}. ${pick(["Prove me right", "Tell me I'm wrong", "Challenge accepted?"])} ${v()}`,
      ],
      flirty: [
        () => `Is it weird that I'm ${pick(["smiling at my phone right now", "already a little nervous", "genuinely excited to talk to you"])}? Because ${pick(["that's happening", "I can't help it", "you did that"])} ${v()}`,
        () => `I have a confession \u2014 I've been ${pick(["thinking of an excuse to message you", "trying to play it cool and failing", "wanting to say hi all day"])}. So here I am ${v()}`,
        () => `Hi, I'm your new favorite notification ${v()} ${pick(["Let me earn it though", "No pressure, just vibes", "You'll see"])}`,
        () => `Okay but ${pick(["how are you this cute", "your smile is genuinely unfair", "you're making everyone else here invisible"])} \u2014 I had to say something ${v()}`,
      ],
      mysterious: [
        () => `I almost didn't message you. Then I saw ${pick(["that one photo", "something in your profile", "something I can't explain"])} and changed my mind ${v()}`,
        () => `I have a question for you. But I'll save it. First \u2014 ${pick(["tell me something nobody knows about you", "what's on your mind right now?", "what genuinely surprised you recently?"])} ${v()}`,
        () => `Most people here are an open book. You seem more like ${pick(["a whole library", "a locked journal", "a story I want to read slowly"])} ${v()}`,
        () => `There's something about ${pick(["people who don't try too hard", "quiet confidence", "your energy"])} that makes me want to ${pick(["know more", "keep talking", "take my time with you"])} ${v()}`,
      ],
    };
    return shuffle(starters[vibe].map(fn => fn())).slice(0, 3);
  }

  // === MAIN REPLY GENERATOR ===
  function generateReplies(msg, vibe) {
    const s = analyzeMessage(msg);
    const v = emojis[vibe];
    let pool = [];

    // =============================================
    // VIBE: SMOOTH
    // =============================================
    if (vibe === 'smooth') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `Hey ${v()} ${pick(["I was hoping you'd text me", "Perfect timing", "You just made my phone interesting"])} ${timeGreets()}`,
          `There she is ${v()} I had a feeling about you. ${pick(["So what's on your mind?", "Talk to me", "I'm all yours"])}`,
          `${pick(["Well well well", "Look who it is", "And there's the notification I wanted"])} ${v()} ${pick(["I was just thinking about you", "took you long enough", "right on time"])}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `${pick(["Careful", "Easy", "Watch it"])} \u2014 compliments like that are how people catch feelings ${v()} ${pick(["Not that I'm complaining", "Keep going though", pullbacks()])}`,
          `That ${pick(["means a lot coming from you", "hit different", "made me smile and I don't smile easy"])} ${v()} ${pick(["You're not so bad yourself", "I could say the same about you", "The feeling is very mutual"])}`,
          `You're trying to make me blush ${v()} It's working, ${pullbacks()}`,
        );
      } else if (s.isFlirty || s.isSexual) {
        pool.push(
          `You're ${pick(["playing with fire", "testing my self-control", "making this dangerous"])} and I think you know it ${v()} ${pullbacks()}`,
          `${pick(["Oh we're going there?", "So that's the energy tonight?", "Okay I see you"])} ${v()} I've been thinking ${pick(["the same thing but I was waiting for you to say it", "about you more than I should be", "about what it would be like"])}... ${pullbacks()}`,
          `${seeds()} ${imaginations()} ${v()} ${pullbacks()}`,
        );
      } else if (s.isAboutFun || s.isAboutPlans) {
        pool.push(
          `Right now? My favorite thing is ${pick(["this conversation", "trying to figure you out", "talking to someone who actually gets it"])} ${v()} ${pick(["You're intriguing", "I could do this all night", "Don't tell anyone I said that"])}`,
          `I keep it spontaneous. But lately I've been wanting ${pick(["more nights with good conversation", "someone who matches my energy", "whatever this is to keep going"])} ${v()}`,
        );
      } else if (s.isAboutFood) {
        pool.push(
          `${pick(["The way to my heart is through food", "Foodie energy is attractive energy", "Okay now you're really speaking my language"])} ${v()} ${pick(["I bet you're the kind of person who moans when the food is good", "There's something intimate about sharing a meal", "I want to know your guilty pleasure order"])}`,
        );
      } else if (s.isAboutMusic) {
        pool.push(
          `Music taste says everything about a person ${v()} ${pick(["Send me a song that makes you feel something and I'll do the same", "I want to know what you listen to at 2am", "There's a song that reminds me of you already and that's terrifying"])} `,
        );
      } else if (s.isGoodTime) {
        pool.push(
          `${pick(["Me too", "Same", "I haven't stopped thinking about it"])} ${v()} ${pick(["Like genuinely, it's been on my mind", "I don't usually feel this way", "You do something to me and I can't explain it"])}`,
          `That was different from what I expected. ${pick(["Better", "Way better", "Dangerously good"])} ${v()} ${seeds()} ${imaginations()}`,
        );
      } else if (s.isLateReply) {
        pool.push(
          `Worth the wait though right? ${v()} ${pick(["I was being mysterious", "I had you thinking about me didn't I", "Absence makes the heart grow fonder... or whatever"])}`,
          `My bad. ${pick(["I was thinking about you and got distracted", "I didn't want to seem too eager but clearly I failed", "I'll make it up to you. With attention"])} ${v()}`,
        );
      } else if (s.isNight) {
        pool.push(
          `Goodnight texts from you hit different ${v()} ${pick(["I might think about you before I fall asleep. No promises though", "Sleep well... but I'm definitely going to be in your dreams", "Don't stay up thinking about me. Actually, do"])}`,
          `${pick(["Late night you is my favorite you", "Something about texting you at night feels more... real", "The best conversations happen when the world goes quiet"])} ${v()}`,
        );
      } else if (s.isQuestion) {
        pool.push(
          `${pick(["Good question", "I love that you asked that", "Hmm"])} \u2014 ${pick(["I'll tell you but only because you asked nicely", "the answer might surprise you", "I don't usually share this"])} ${v()} ${pullbacks()}`,
          `I'll answer that \u2014 but first ${pick(["tell me something unexpected about you", "you have to answer one of mine", "what made you curious?"])} ${v()}`,
        );
      } else if (s.isPlayful) {
        pool.push(
          `Your humor is ${pick(["dangerously attractive", "one of my favorite things about you", "the reason I keep texting back"])} ${v()} ${pick(["Don't let it go to your head", "But also keep going", "I'm actually getting attached"]}`,
          `See this is why you're ${pick(["dangerous", "trouble", "my favorite person to text"])} ${v()} ${pick(["You get me", "We have the same brain", "I blame you for my good mood"])}`,
        );
      } else if (s.isPositive) {
        pool.push(
          `${pick(["Love that energy", "That's what I like to hear", "You just made my night"])} ${v()} ${pick(["Keep this energy forever", "I could get used to this", "You have no idea the effect you have on me"])}`,
        );
      } else if (s.isSharing) {
        pool.push(
          `I love that you ${pick(["trust me with that", "opened up", "feel comfortable enough to share that"])} ${v()} ${pick(["Most people keep it surface. You're different", "That tells me everything. All good things", "There's something about vulnerability that's genuinely attractive"])}`,
        );
      } else {
        pool.push(
          `${pick(["You've got my attention", "I'm invested", "Keep going"])} \u2014 ${pick(["that doesn't happen easily", "I want to know everything", "you're making this hard to stop"])} ${v()}`,
          `There's something about you that's ${pick(["intriguing", "magnetic", "addictive"])} ${v()} ${pick(["I can't figure it out", "And I keep coming back for more", "You should know that"])}`,
          `${pick(["I like where this is going", "You're making me feel things", "This conversation is doing something to me"])} ${v()} ${pullbacks()}`,
        );
      }
    }

    // =============================================
    // VIBE: WITTY
    // =============================================
    if (vibe === 'witty') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `"Hey"?? That's it? ${pick(["I know your thumbs aren't broken", "Give me something to work with", "I accept nothing less than effort"])} ${v()} ${pick(["Lucky for you I'm interesting enough for both of us", "I'll carry this conversation on my back", "Don't worry, I'll make this fun"])}`,
          `You texted 'hey' like I'm not ${pick(["the most entertaining person in your phone", "about to make your whole night better", "literally incredible at this"])} ${v()}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `I know ${v()} But it hits different from someone with ${pick(["impeccable taste", "actual taste", "clearly superior judgment"])}. ${pick(["Tell me more though", "Your turn \u2014 what's your biggest flex?", "Plot twist: you're worse"])}`,
          `Adding that to my ${pick(["ego", "growing collection of evidence that I'm a catch", "reasons to be confident today"])} ${v()} ${pick(["But seriously, the things I'd say about you if I had no filter...", "You're one to talk", pullbacks()])}`,
        );
      } else if (s.isFlirty || s.isSexual) {
        pool.push(
          `Oh so we're doing this? ${v()} ${pick(["I was trying to behave but you just ruined that", "My filter just left the chat", "I have thoughts. Dangerous ones"])}. ${pullbacks()}`,
          `You just ${pick(["activated something", "unlocked a side of me", "started something you might not be ready for"])} ${v()} ${pick(["But I'm going to be a gentleman about it... for now", "I'll behave. Probably", "Handle with care"])}`,
        );
      } else if (s.isAboutFun) {
        pool.push(
          `For fun I ${pick(["professionally overthink everything", "collect hobbies like they're Pokemon", "pretend to be productive while texting you"])} ${v()} ${pick(["But lately you've been my favorite distraction", "You're rapidly becoming my main hobby", "I'd rather keep talking to you honestly"])}`,
        );
      } else if (s.isPlayful) {
        pool.push(
          `You're ${pick(["dangerously funny", "making my phone the most interesting thing in the room", "the kind of trouble I actually want"])} ${v()} ${pick(["And that's a high bar", "My friends are going to hear about you", "I'm developing an unhealthy attachment and I'm fine with it"])}`,
        );
      } else if (s.isGoodTime) {
        pool.push(
          `Same. And I don't say that about ${pick(["everything", "most things", "anyone"])}. Just ${pick(["food, music, and apparently you", "select few things. You made the list", "you"])} ${v()}`,
        );
      } else if (s.isNight) {
        pool.push(
          `Goodnight but ${pick(["I'm definitely going to be in your dreams and I'm not apologizing", "don't think about me too hard... or do", "you're the last person I'm texting tonight. Read into that"])} ${v()}`,
        );
      } else {
        pool.push(
          `I'm screenshotting this convo as proof that ${pick(["I'm actually charming", "two people can vibe this hard", "you started it"])} ${v()} ${pick(["For legal reasons", "No jury would convict me", "In case you deny the chemistry later"])}`,
          `You're ${pick(["disturbingly fun to talk to", "ruining my productivity", "making me feel things and I'm blaming you"])} ${v()} ${pullbacks()}`,
        );
      }
    }

    // =============================================
    // VIBE: BOLD
    // =============================================
    if (vibe === 'bold') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `Don't 'hey' me ${pick(["like you haven't been thinking about this", "when both of us know there's more to say", "I know that's not all you got"])} ${v()} ${pick(["Say what's actually on your mind", "Give me your real energy", dares()])}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `I know. And you're bold for saying it \u2014 ${pick(["that's attractive", "I respect that", "most people just think it"])} ${v()} ${pick(["Your turn: you're the kind of person I think about when I shouldn't", "Now let me be honest \u2014 you're trouble", "Keep that energy. I dare you"])}`,
        );
      } else if (s.isFlirty || s.isSexual) {
        pool.push(
          `${pick(["Oh we're going there?", "Don't start something you can't finish", "Finally, someone who matches my energy"])} ${v()} ${pick(["I've been holding back and honestly it was killing me", "You have no idea what's going through my mind right now", "I like that you're not shy about it"])}`,
          `${pick(["You just flipped a switch", "That's the energy I've been waiting for", "Okay. Now you have my full attention"])} ${v()} ${seeds()} ${imaginations()} ${pick(["...and I'm not apologizing for it", "...and that's the PG version"])}`,
        );
      } else if (s.isAboutPlans || s.isAboutFun) {
        pool.push(
          `Right now? ${pick(["Honestly I'm thinking about you", "You're the most interesting thing on my schedule", "I'd rather keep doing this"])} ${v()} ${pick(["And I don't say that easily", "Take that however you want", "That should tell you something"])}`,
        );
      } else if (s.isPositive) {
        pool.push(
          `${pick(["Good", "That's what I wanted to hear", "Perfect"])} ${v()} ${pick(["Because I've been thinking about you more than I should", "Don't make me catch feelings \u2014 too late", "I'm getting dangerously comfortable with you"])}`,
        );
      } else if (s.isNight) {
        pool.push(
          `Goodnight ${v()} ${pick(["But just so you know, you're going to be in my head tonight", "Sleep well. I won't promise I will \u2014 you're distracting even when you're offline", "Last thought before sleep? Probably you. You should feel special about that"])}`,
        );
      } else if (s.isNegative) {
        pool.push(
          `${pick(["Fair enough", "I respect that", "No pressure"])} \u2014 but ${pick(["I think there's a part of you that's curious", "the offer to ruin your peace of mind is always open", "something tells me you'll change your mind"])} ${v()}`,
        );
      } else {
        pool.push(
          `${pick(["I'm going to be direct", "No filter", "Real talk"])} \u2014 ${pick(["there's something between us and we both feel it", "you're on my mind more than you should be", "I want to know everything about you and I'm not being subtle about it"])} ${v()}`,
          `${pick(["Straight up", "Honestly", "No games"])} \u2014 ${pick(["you make me feel something and I don't know what to do with it", "talking to you does something to me", "I haven't been this invested in a conversation in a long time"])} ${v()} ${pullbacks()}`,
        );
      }
    }

    // =============================================
    // VIBE: FLIRTY
    // =============================================
    if (vibe === 'flirty') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `Hiii ${v()} ${pick(["I smile every time your name pops up and it's becoming a problem", "You just made my " + timeGreets() + " better", "I was hoping you'd text \u2014 is that weird? I don't care"])}`,
          `Hey you ${v()} ${pick(["I may or may not have checked my phone hoping it was you", "My mood just shifted and it's 100% your fault", "You have this effect on me and I can't explain it"])}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `Stop you're going to make me blush ${v()} ${pick(["But also never stop", "You can't say things like that and not expect consequences", "Now I'm smiling like an idiot and my friends are judging me"])}`,
          `${pick(["Okay smooth talker", "You're too sweet", "Now I'm blushing AND overthinking"])} ${v()} ${pick(["I want to hear you say that to my face someday", "You're making it really hard to play it cool", "The things I would say back if I wasn't trying to behave..."])}`,
        );
      } else if (s.isFlirty || s.isSexual) {
        pool.push(
          `You're literally making my heart do that thing ${v()} ${pick(["Stop... actually don't stop ever", "I'm in trouble aren't I", "The butterflies are aggressive right now"])}`,
          `${pick(["The tension right now", "This conversation is doing things to me", "You have no idea what you're doing to me"])} ${v()} ${pick(["And I don't want it to stop", "I might say something I can't take back", pullbacks()])}`,
          `${seeds()} ${imaginations()} ${v()} ${pick(["Is that weird? I don't care", "Can't help it", "You started it"])}`,
        );
      } else if (s.isAboutFun || s.isAboutPlans) {
        pool.push(
          `Lately my favorite thing is ${pick(["pretending I'm not checking my phone for your texts", "whatever we're doing right now", "falling asleep to our conversations"])} ${v()} ${pick(["Is that a lot? That's a lot", "Don't tell anyone", "You're ruining me in the best way"])}`,
        );
      } else if (s.isGoodTime) {
        pool.push(
          `Me too ${v()} Like ${pick(["genuinely I haven't stopped thinking about it", "I keep smiling and my friends are giving me looks", "it was the kind of moment you replay in your head"])}. ${pick(["I want more of that", "When can I feel that again", "You're stuck with me now"])}`,
        );
      } else if (s.isNight) {
        pool.push(
          `Goodnight ${v()} ${pick(["I'll be the last thing you think about tonight and the first thing tomorrow \u2014 that's a promise", "Sweet dreams... but the ones about me can be a little dangerous", "Sleep tight. I'm going to be lying here thinking about you and that's your fault"])}`,
        );
      } else if (s.isPlayful) {
        pool.push(
          `${pick(["Your laugh must be incredible", "I bet you're even cuter when you laugh", "The fact that we have the same humor is honestly dangerous"])} ${v()} ${pick(["I can already picture it", "I want to hear it so bad", "We're in trouble"])}`,
        );
      } else {
        pool.push(
          `You're making it ${pick(["impossible to play it cool", "really hard to focus on anything else", "very clear that I'm catching feelings"])} ${v()} ${pick(["And I don't even mind", "I blame you entirely", "This wasn't the plan but here we are"])}`,
          `Every text from you makes me a little more ${pick(["hooked", "attached", "gone"])} ${v()} ${pick(["You should know that", "Is this what falling feels like?", pullbacks()])}`,
        );
      }
    }

    // =============================================
    // VIBE: MYSTERIOUS
    // =============================================
    if (vibe === 'mysterious') {
      if (s.isGreeting && s.isDryText) {
        pool.push(
          `Hey. ${pick(["Perfect timing", "Interesting", "I was just thinking about something"])} ${v()} ${pick(["Tell me something real about you", "I have a question but you go first", "What's on your mind? The real answer"])}`,
        );
      } else if (s.isCompliment) {
        pool.push(
          `${pick(["Thank you", "I appreciate that", "That's genuine"])}. But the parts of me you'd find most attractive? ${pick(["You haven't discovered those yet", "Those take time", "They come out at night"])} ${v()} ${pullbacks()}`,
        );
      } else if (s.isFlirty || s.isSexual) {
        pool.push(
          `${pick(["You're getting closer", "Careful", "That's a door you're opening"])} ${v()} ${pick(["I have thoughts about you that I'm not sharing yet", "The things I keep to myself would change this conversation", "There's a version of this conversation that happens after midnight"])}... ${pullbacks()}`,
          `${pick(["Interesting", "So that's where your mind goes", "I was wondering when you'd show me this side"])} ${v()} ${seeds()} ${imaginations()} ${pick(["But I'll wait", "Patience", "Good things come to those who wait"])}`,
        );
      } else if (s.isAboutFun || s.isAboutPlans) {
        pool.push(
          `I keep busy with things most people ${pick(["wouldn't guess", "don't expect", "find surprising"])} ${v()} ${pick(["I'll tell you... eventually", "Earn it", "That's a 3am conversation"])}`,
        );
      } else if (s.isQuestion) {
        pool.push(
          `That's a question with a ${pick(["long answer", "story behind it", "different answer at night"])} ${v()} ${pick(["I'll share when the moment is right", "Ask me again when it's late", "Some things are worth waiting for"])}`,
        );
      } else if (s.isNight) {
        pool.push(
          `Late night is when ${pick(["the real conversations happen", "I stop filtering", "I think about you the most"])} ${v()} ${pick(["But I'll save that for next time", "Goodnight... for now", "Dream about me. That's not a request"])}`,
        );
      } else if (s.isGoodTime) {
        pool.push(
          `I felt something too. ${pick(["I just wasn't sure if you noticed", "It surprised me", "That doesn't happen to me often"])} ${v()} ${pick(["There's more where that came from", "But the best parts are still hidden", "And I'm only getting started"])}`,
        );
      } else {
        pool.push(
          `${pick(["There's something about this I didn't expect", "You're different", "I don't give my attention easily"])} ${v()} ${pick(["And I mean that as the highest compliment", "You've earned it", "Make of that what you will"])}`,
          `${seeds()} ${tensions()} ${v()} ${pick(["I can't explain it", "It's pulling me in", "And I'm not fighting it"])}`,
        );
      }
    }

    // Deduplicate and return 3
    const unique = [...new Set(pool)];
    return shuffle(unique).slice(0, 3);
  }

  return { generateReplies, generateStarters, analyzeMessage };
})();
