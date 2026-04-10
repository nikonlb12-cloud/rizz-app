/* =============================================
   RIZZ ENGINE v4 — Stage + Vibe Matrix
   Tension & attraction, calibrated by stage
   ============================================= */

const RizzEngine = (() => {

  // === UTILITY ===
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  const emojis = {
    smooth: () => pick(['\u{1F60C}', '\u2728', '\u{1F60F}', '\u{1F4AB}']),
    witty: () => pick(['\u{1F602}', '\u{1F480}', '\u{1F3AC}', '\u{1F62D}']),
    bold: () => pick(['\u{1F525}', '\u{1F608}', '\u{1F4AF}', '\u26A1', '\u{1F440}']),
    flirty: () => pick(['\u{1F60A}', '\u{1F648}', '\u{1F618}', '\u2728', '\u{1F495}']),
    mysterious: () => pick(['\u{1F319}', '\u{1F5A4}', '\u{1F30C}', '\u2728']),
  };

  // === DYNAMIC FRAGMENTS ===
  const pullbacks = () => pick([
    'but I\'m not gonna say too much',
    'but I\'ll keep that to myself for now',
    'anyway, moving on before I say something I shouldn\'t',
    'but you didn\'t hear that from me',
    'I probably shouldn\'t have said that',
    'but I\'ll stop there',
  ]);

  const seeds = () => pick([
    'I keep picturing',
    'I can\'t stop thinking about',
    'something about you makes me wonder',
    'there\'s this thought I keep having about',
    'I\'ve been imagining',
  ]);

  const imaginations = () => pick([
    'what it would be like to hear you laugh',
    'what your voice sounds like',
    'if you\'re this fun over text what you\'re like in person',
    'what you smell like up close',
    'how it would feel to be next to you right now',
    'what you look like first thing in the morning',
    'if your hugs are as warm as your energy',
  ]);

  const heatedThoughts = () => pick([
    'what would happen if we were alone right now',
    'what you\'d do if I was right there with you',
    'what it would feel like to have you close',
    'the way your skin would feel against mine',
    'having you all to myself',
    'the sound you make when you\'re comfortable',
  ]);

  const closingMoves = () => pick([
    'I need to see you',
    'Come over',
    'I can\'t stop thinking about what happens next',
    'We\'ve waited long enough',
    'Tell me when you\'re free. Not a question, a statement',
    'I want you here',
  ]);

  // === CONTEXT ANALYZER ===
  function analyzeMessage(msg) {
    const lower = msg.toLowerCase().trim();
    return {
      isQuestion: /\?/.test(msg),
      isCompliment: /cute|pretty|handsome|beautiful|gorgeous|attractive|hot|fine|good.?looking|stunning|sexy/i.test(lower),
      isGreeting: /^(hey|hi|hello|yo|sup|what's up|heyy+|hii+|waddup)\b/i.test(lower),
      isDryText: lower.length < 10 && !/\?/.test(msg),
      isFlirty: /\u{1F618}|\u{1F60F}|\u{1F60D}|\u{1F970}|\u2764|\u{1F495}|\u{1F609}|wink|flirt|date|crush|kiss|babe|baby/iu.test(lower),
      isAboutPlans: /what.*do|plans|free|busy|hang|meet|grab|chill|come over|link up|when|available/i.test(lower),
      isAboutFun: /fun|hobby|hobbies|free time|interests|passion|enjoy/i.test(lower),
      isAboutWork: /work|job|career|school|study|college|major/i.test(lower),
      isAboutFood: /food|eat|dinner|lunch|coffee|restaurant|cook|hungry|brunch/i.test(lower),
      isAboutMusic: /music|song|listen|concert|playlist|spotify|artist|band/i.test(lower),
      isPlayful: /haha|lol|lmao|\u{1F602}|\u{1F923}|funny|joke|dead|crying/iu.test(lower),
      isLateReply: /took.*long|slow.*reply|late|ghost|ignore|respond/i.test(lower),
      isGoodTime: /great time|amazing|fun|wonderful|best|loved|enjoyed|awesome|incredible/i.test(lower),
      isPositive: /yes|yeah|yea|sure|definitely|absolutely|of course|down|bet|sounds good|love to|omg|wow/i.test(lower),
      isSharing: lower.length > 40,
      isSexual: /bed|sleep.*with|come over|your place|my place|alone|tonight|miss you|need you|want you|thinking.*about.*you/i.test(lower),
      isNight: /night|goodnight|gn|sleep|bed|late|tired/i.test(lower),
      wordCount: lower.split(/\s+/).length,
    };
  }

  // === STARTERS (stage = cold) ===
  function generateStarters(vibe) {
    const v = emojis[vibe];
    const starters = {
      smooth: [
        () => `I don't usually message first. But ${pick(["something about your profile pulled me in", "I couldn't scroll past you", "I had to know if your vibe matches your photos"])} ${v()}`,
        () => `I have a theory that people who ${pick(["travel alone", "read real books", "take sunset photos"])} are automatically more interesting. Testing it ${v()}`,
        () => `Okay I'm just going to say it \u2014 ${pick(["you've got an energy I can't quite read", "there's something about you I need to figure out", "your vibe is magnetic"])} ${v()}`,
        () => `Something tells me you're the type who ${pick(["makes everyone in the room curious", "doesn't realize the effect you have on people", "is way more dangerous than you look"])} ${v()}`,
        () => `Not gonna lie, I've been staring at your profile trying to think of something clever. ${pick(["Gave up. Here's honesty instead", "Failed. You're too distracting", "Then realized you'd probably respect realness more"])} ${v()}`,
        () => `I was going to play it cool but ${pick(["that felt fake", "you deserve more than games", "honestly? I just wanted to talk to you"])}. What's one thing about you that would surprise me? ${v()}`,
      ],
      witty: [
        () => `My opening line strategy: ${pick(["Google 'best openers' \u2192 cringe \u2192 just be myself", "overthink for 20 mins \u2192 type 'hey' \u2192 delete \u2192 try this"])} ${v()}`,
        () => `Quick compatibility test: ${pick(["pineapple on pizza \u2014 yes or no?", "morning person or chaos gremlin?", "do you double text or have self-control?"])} ${v()}`,
        () => `Fun fact: ${pick(["you just made me stop doom-scrolling", "I rewrote this 4 times", "this is my first message today and I picked you"])}. I feel like that says something ${v()}`,
        () => `I'm not saying I analyzed your profile but I definitely ${pick(["formed opinions", "noticed we have the same energy", "realized you're my kind of trouble"])} ${v()}`,
        () => `On a scale of 'hey' to actually creative, I'm aiming for a 7. ${pick(["What's the wildest thing you did this month?", "Give me your most controversial opinion"])} ${v()}`,
      ],
      bold: [
        () => `I'll skip the small talk \u2014 ${pick(["you caught my eye and I'm not pretending you didn't", "I think we'd have insane chemistry", "something about you tells me you can handle directness"])} ${v()}`,
        () => `Here's the deal: ${pick(["I'm interesting, I'm real, and I think you're worth the risk", "one conversation with me and you'll want another"])}. ${pick(["Your move", "Show me what you've got"])} ${v()}`,
        () => `I'm going to be honest \u2014 I almost didn't message because ${pick(["you're intimidatingly attractive", "I wasn't sure I could keep up"])}. But ${pick(["I'd regret not trying", "here I am"])} ${v()}`,
        () => `First impression? ${pick(["You look like trouble and I'm here for it", "You seem like you'd match my intensity"])}. ${pick(["Prove me right", "Challenge accepted?"])} ${v()}`,
      ],
      flirty: [
        () => `Is it weird that I'm ${pick(["smiling at my phone right now", "already a little nervous", "genuinely excited to talk to you"])}? Because ${pick(["that's happening", "I can't help it"])} ${v()}`,
        () => `I have a confession \u2014 I've been ${pick(["thinking of an excuse to message you", "trying to play it cool and failing", "wanting to say hi all day"])}. So here I am ${v()}`,
        () => `Hi, I'm your new favorite notification ${v()} ${pick(["Let me earn it though", "No pressure, just vibes"])}`,
        () => `Okay but ${pick(["how are you this cute", "your smile is genuinely unfair", "you're making everyone else here invisible"])} \u2014 I had to say something ${v()}`,
      ],
      mysterious: [
        () => `I almost didn't message you. Then I saw ${pick(["that one photo", "something in your profile", "something I can't explain"])} and changed my mind ${v()}`,
        () => `I have a question for you. But I'll save it. First \u2014 ${pick(["tell me something nobody knows about you", "what's on your mind right now?"])} ${v()}`,
        () => `Most people here are an open book. You seem more like ${pick(["a whole library", "a locked journal", "a story I want to read slowly"])} ${v()}`,
        () => `There's something about ${pick(["people who don't try too hard", "quiet confidence", "your energy"])} that makes me want to ${pick(["know more", "take my time with you"])} ${v()}`,
      ],
    };
    return shuffle(starters[vibe].map(fn => fn())).slice(0, 3);
  }

  // ===========================================
  // MAIN REPLY GENERATOR — Stage + Vibe Matrix
  // ===========================================
  function generateReplies(msg, vibe, stage) {
    const s = analyzeMessage(msg);
    const v = emojis[vibe];
    stage = stage || 'talking'; // default
    let pool = [];

    // =============================================
    // STAGE: COLD — First contact, haven't spoken
    // Psychology: curiosity, value demonstration, low pressure
    // =============================================
    if (stage === 'cold') {
      // Cold stage always generates starters regardless of input
      return generateStarters(vibe);
    }

    // =============================================
    // STAGE: JUST TALKING — Early convo, rapport building
    // Psychology: be interesting, ask questions, light push-pull
    // =============================================
    if (stage === 'talking') {
      if (vibe === 'smooth') {
        if (s.isGreeting && s.isDryText) {
          pool.push(
            `Hey ${v()} ${pick(["I was hoping you'd text", "Perfect timing", "You just made my phone interesting"])}`,
            `There she is ${v()} ${pick(["So what's on your mind?", "Talk to me"])}`,
            `${pick(["Look who it is", "And there's the notification I wanted"])} ${v()}`,
          );
        } else if (s.isCompliment) {
          pool.push(
            `${pick(["Careful", "Easy"])} \u2014 compliments like that are how people catch feelings ${v()} ${pick(["Not that I'm complaining", "You're not so bad yourself"])}`,
            `That ${pick(["means a lot coming from you", "hit different"])} ${v()} The feeling is mutual`,
            `You're making me smile and I don't smile easy ${v()}`,
          );
        } else if (s.isAboutFun || s.isAboutPlans) {
          pool.push(
            `Right now my favorite thing is ${pick(["this conversation", "trying to figure you out"])} ${v()} You're intriguing`,
            `I keep it spontaneous. ${pick(["Tell me something unexpected about your week", "What's your guilty pleasure?"])} ${v()}`,
          );
        } else if (s.isAboutFood) {
          pool.push(
            `${pick(["Foodie energy is attractive", "Now you're speaking my language"])} ${v()} ${pick(["What's your go-to order?", "Tell me your guilty pleasure food"])}`,
          );
        } else if (s.isAboutMusic) {
          pool.push(
            `Music taste says everything ${v()} ${pick(["Send me your top 3 and I'll judge gently", "What do you listen to at 2am?"])}`,
          );
        } else if (s.isPlayful) {
          pool.push(
            `Your humor is ${pick(["one of my favorite things about you already", "genuinely attractive"])} ${v()} ${pick(["Don't let it go to your head", "Keep it coming"])}`,
            `See this is why you're ${pick(["fun to talk to", "different from everyone else"])} ${v()} We have the same brain`,
          );
        } else if (s.isQuestion) {
          pool.push(
            `${pick(["Good question", "I love that you asked that"])} ${v()} ${pick(["I'll tell you but you owe me one back", "The answer might surprise you"])}`,
            `I'll answer that \u2014 but first ${pick(["tell me something unexpected about you", "you have to answer one of mine"])} ${v()}`,
          );
        } else if (s.isLateReply) {
          pool.push(
            `Worth the wait though right? ${v()} ${pick(["I was being mysterious", "Good things take time"])}`,
            `My bad. ${pick(["I was thinking about what to say and got distracted", "I'll make it up to you with amazing conversation"])} ${v()}`,
          );
        } else if (s.isSharing) {
          pool.push(
            `I love that you ${pick(["trust me with that", "opened up"])} ${v()} ${pick(["Most people keep it surface. You're different", "That tells me good things about you"])}`,
          );
        } else {
          pool.push(
            `${pick(["You've got my attention", "I'm interested"])} \u2014 ${pick(["that doesn't happen easily", "keep going"])} ${v()}`,
            `There's something about you that's ${pick(["intriguing", "magnetic", "different"])} ${v()} I keep coming back for more`,
            `${pick(["I like where this is going", "This is fun"])} ${v()} ${pick(["Tell me more", "I want to know everything"])}`,
          );
        }
      }

      if (vibe === 'witty') {
        if (s.isGreeting && s.isDryText) {
          pool.push(
            `"Hey"?? ${pick(["I know your thumbs work", "Give me something to work with"])} ${v()} ${pick(["Lucky for you I'm interesting enough for both of us", "Don't worry, I'll carry this"])}`,
            `You texted 'hey' like I'm not ${pick(["the most entertaining person in your phone", "about to make your night"])} ${v()}`,
          );
        } else if (s.isCompliment) {
          pool.push(
            `I know ${v()} But it hits different from someone with ${pick(["impeccable taste", "actual taste"])}. ${pick(["Tell me more though", "Your turn \u2014 what's your biggest flex?"])}`,
            `Adding that to my ${pick(["ego", "collection of evidence that I'm a catch"])} ${v()} You're one to talk though`,
          );
        } else if (s.isPlayful) {
          pool.push(
            `You're ${pick(["dangerously funny", "making my phone the most interesting thing in the room"])} ${v()} ${pick(["My friends are going to hear about you", "You made the list"])}`,
          );
        } else if (s.isQuestion) {
          pool.push(
            `Oh we're doing Q&A now? ${pick(["I should've prepared slides", "Let me dodge this gracefully"])} ${v()} ${pick(["But seriously \u2014 ", "Okay fine \u2014 "])}${pick(["you first", "ask me something harder"])}`,
          );
        } else {
          pool.push(
            `I'm screenshotting this as proof that ${pick(["two people can vibe this hard", "I'm charming"])} ${v()}`,
            `You're ${pick(["disturbingly fun to talk to", "ruining my productivity", "becoming my favorite notification"])} ${v()}`,
            `This conversation has more chemistry than ${pick(["my entire DM history", "a Netflix show", "most relationships I know"])} ${v()}`,
          );
        }
      }

      if (vibe === 'bold') {
        if (s.isGreeting && s.isDryText) {
          pool.push(
            `Don't 'hey' me ${pick(["when there's clearly more to say", "I know that's not all you got"])} ${v()} ${pick(["Say what's on your mind", "Give me your real energy"])}`,
          );
        } else if (s.isCompliment) {
          pool.push(
            `I know. And you're bold for saying it ${v()} ${pick(["That's attractive", "I respect that"])}. The feeling is very mutual`,
          );
        } else {
          pool.push(
            `${pick(["I'll be direct", "No filter"])} \u2014 ${pick(["you're interesting and I want to know more", "I haven't been this invested in a convo in a while"])} ${v()}`,
            `${pick(["Real talk", "Honestly"])} \u2014 ${pick(["you stand out", "there's something here and we both know it"])} ${v()}`,
          );
        }
      }

      if (vibe === 'flirty') {
        if (s.isGreeting && s.isDryText) {
          pool.push(
            `Hiii ${v()} ${pick(["I smile every time your name pops up", "You just made my day better"])}`,
            `Hey you ${v()} ${pick(["I may have checked my phone hoping it was you", "My mood just shifted. Your fault"])}`,
          );
        } else if (s.isCompliment) {
          pool.push(
            `Stop you're gonna make me blush ${v()} ${pick(["But also never stop", "Now I'm smiling like an idiot"])}`,
            `${pick(["Too sweet", "Okay smooth talker"])} ${v()} ${pick(["I could say the same about you times ten", "The feeling is extremely mutual"])}`,
          );
        } else {
          pool.push(
            `You're making it ${pick(["impossible to play it cool", "hard to focus on anything else"])} ${v()} And I don't even mind`,
            `Every text from you makes me a little more ${pick(["hooked", "attached", "interested"])} ${v()} You should know that`,
          );
        }
      }

      if (vibe === 'mysterious') {
        if (s.isGreeting && s.isDryText) {
          pool.push(
            `Hey. ${pick(["Perfect timing", "Interesting"])} ${v()} ${pick(["Tell me something real", "What's actually on your mind?"])}`,
          );
        } else if (s.isCompliment) {
          pool.push(
            `Thank you. But the parts of me you'd find most interesting? ${pick(["You haven't discovered those yet", "Those take time"])} ${v()}`,
          );
        } else {
          pool.push(
            `${pick(["There's something about this I didn't expect", "You're different"])} ${v()} ${pick(["I mean that as the highest compliment", "Make of that what you will"])}`,
            `I don't give my attention easily. ${pick(["You've earned it", "That should tell you something"])} ${v()}`,
          );
        }
      }
    }

    // =============================================
    // STAGE: HEATING UP — Chemistry confirmed, tension building
    // Psychology: push-pull, emotional escalation, future pacing, desire seeds
    // =============================================
    if (stage === 'heating') {
      if (vibe === 'smooth') {
        if (s.isCompliment) {
          pool.push(
            `${pick(["Careful", "Watch it"])} \u2014 compliments like that are how people catch feelings ${v()} ${pullbacks()}`,
            `That ${pick(["made me feel something", "hit different coming from you"])} ${v()} ${pick(["I could say things about you too but I'm holding back", "The feeling is dangerously mutual"])}`,
            `You're trying to make me blush ${v()} It's working, ${pullbacks()}`,
          );
        } else if (s.isFlirty || s.isSexual) {
          pool.push(
            `You're ${pick(["playing with fire", "testing my self-control"])} and I think you know it ${v()} ${pullbacks()}`,
            `${pick(["Oh we're going there?", "So that's the energy tonight?"])} ${v()} I've been thinking the same thing ${pullbacks()}`,
            `${seeds()} ${imaginations()} ${v()} ${pullbacks()}`,
          );
        } else if (s.isGoodTime) {
          pool.push(
            `${pick(["Me too", "Same", "I haven't stopped thinking about it"])} ${v()} ${pick(["You do something to me and I can't explain it", "It's been on my mind all day"])}`,
            `That was ${pick(["better than I expected", "different in the best way"])} ${v()} ${seeds()} ${imaginations()}`,
          );
        } else if (s.isNight) {
          pool.push(
            `Late night you is my favorite you ${v()} ${pick(["Something about texting at night feels more real", "I might think about you before I fall asleep"])}`,
            `Goodnight texts from you hit different ${v()} ${pick(["Don't stay up thinking about me. Actually, do", "Sleep well... I'll be in your dreams"])}`,
          );
        } else if (s.isPlayful) {
          pool.push(
            `Your humor is ${pick(["dangerously attractive", "one of my favorite things about you"])} ${v()} ${pick(["I'm actually getting attached", "Don't let it go to your head"])}`,
            `See this is why you're ${pick(["dangerous", "trouble", "my favorite person to text"])} ${v()} I blame you for my good mood`,
          );
        } else if (s.isQuestion) {
          pool.push(
            `${pick(["Good question", "Hmm"])} \u2014 ${pick(["I'll tell you but only because you asked nicely", "the answer might surprise you"])} ${v()} ${pullbacks()}`,
          );
        } else if (s.isLateReply) {
          pool.push(
            `Worth the wait though right? ${v()} ${pick(["I had you thinking about me", "Absence makes the heart grow fonder"])}`,
          );
        } else {
          pool.push(
            `There's ${pick(["something about you I can't figure out", "this energy between us"])} ${v()} ${pick(["And I keep coming back for more", "I'm not fighting it"])}`,
            `${pick(["You've got my full attention", "I'm invested", "Keep going"])} \u2014 ${pick(["that doesn't happen easily", "you're making this addictive"])} ${v()}`,
            `${pick(["I like where this is going", "You're making me feel things"])} ${v()} ${pullbacks()}`,
          );
        }
      }

      if (vibe === 'witty') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `Oh so we're doing this? ${v()} ${pick(["I was trying to behave but you ruined that", "My filter just left the chat"])}. ${pullbacks()}`,
            `You just ${pick(["activated something", "unlocked a dangerous side of me"])} ${v()} ${pick(["I'll behave. Probably", "Handle with care"])}`,
          );
        } else if (s.isNight) {
          pool.push(
            `Goodnight but ${pick(["I'm definitely in your dreams and I'm not sorry", "you're the last person I'm texting tonight. Read into that"])} ${v()}`,
          );
        } else {
          pool.push(
            `This conversation has me ${pick(["feeling things and I'm blaming you", "more invested than I planned", "catching feelings and I have receipts"])} ${v()}`,
            `You're ${pick(["dangerously fun", "becoming my problem", "ruining my peace of mind"])} and I'm ${pick(["here for it", "not even mad", "100% okay with it"])} ${v()}`,
          );
        }
      }

      if (vibe === 'bold') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `${pick(["Don't start something you can't finish", "Finally, someone who matches my energy"])} ${v()} ${pick(["You have no idea what's going through my mind", "I like that you're not shy about it"])}`,
            `${pick(["You just flipped a switch", "That's the energy I've been waiting for"])} ${v()} ${seeds()} ${imaginations()} ${pick(["...and that's the PG version", "...and I'm not sorry"])}`,
          );
        } else if (s.isPositive) {
          pool.push(
            `${pick(["Good", "That's what I wanted to hear"])} ${v()} ${pick(["Because I've been thinking about you more than I should", "Don't make me catch feelings \u2014 too late"])}`,
          );
        } else if (s.isNight) {
          pool.push(
            `Goodnight ${v()} ${pick(["You're going to be in my head tonight", "Last thought before sleep? Probably you"])}`,
          );
        } else {
          pool.push(
            `${pick(["No filter", "Real talk"])} \u2014 ${pick(["there's something between us", "you're on my mind more than you should be", "I want to know everything about you"])} ${v()}`,
            `${pick(["Honestly", "Straight up"])} \u2014 ${pick(["you make me feel something", "talking to you does something to me"])} ${v()} ${pullbacks()}`,
          );
        }
      }

      if (vibe === 'flirty') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `You're literally making my heart do that thing ${v()} ${pick(["Stop... actually don't stop", "I'm in trouble aren't I"])}`,
            `${pick(["The tension right now", "This conversation is doing things to me"])} ${v()} ${pick(["I don't want it to stop", "I might say something I can't take back"])}`,
            `${seeds()} ${imaginations()} ${v()} ${pick(["Is that weird? I don't care", "You started it"])}`,
          );
        } else if (s.isGoodTime) {
          pool.push(
            `Me too ${v()} Like ${pick(["genuinely I haven't stopped thinking about it", "it was the kind of moment you replay in your head"])}. ${pick(["I want more of that", "You're stuck with me now"])}`,
          );
        } else if (s.isNight) {
          pool.push(
            `Goodnight ${v()} ${pick(["Sweet dreams... but the ones about me can be a little dangerous", "I'm going to be lying here thinking about you"])}`,
          );
        } else {
          pool.push(
            `You're making it ${pick(["impossible to play it cool", "really hard to focus"])} ${v()} And I don't even mind`,
            `Every text from you makes me more ${pick(["hooked", "gone", "attached"])} ${v()} ${pick(["You should know that", "This wasn't the plan but here we are"])}`,
          );
        }
      }

      if (vibe === 'mysterious') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `${pick(["You're getting closer", "Careful", "That's a door you're opening"])} ${v()} ${pick(["I have thoughts about you I'm not sharing yet", "There's a version of this that happens after midnight"])}... ${pullbacks()}`,
            `${pick(["Interesting", "I was wondering when you'd show me this side"])} ${v()} ${seeds()} ${imaginations()}. ${pick(["But I'll wait", "Patience"])}`,
          );
        } else if (s.isNight) {
          pool.push(
            `Late night is when ${pick(["the real conversations happen", "I stop filtering", "I think about you the most"])} ${v()} ${pick(["But I'll save that for next time", "Dream about me"])}`,
          );
        } else {
          pool.push(
            `${pick(["There's something about this I didn't expect", "You're different"])} ${v()} ${pick(["I mean that as the highest compliment", "You've earned my attention"])}`,
            `${seeds()} ${pick(["something about you I can't figure out", "this energy between us", "the tension in this conversation"])} ${v()} ${pick(["I can't explain it", "And I'm not fighting it"])}`,
          );
        }
      }
    }

    // =============================================
    // STAGE: CLOSING IN — Strong connection, escalating desire
    // Psychology: direct desire, vulnerability, physical imagination, urgency
    // =============================================
    if (stage === 'closing') {
      if (vibe === 'smooth') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `The things I want to say to you right now... ${v()} ${pick(["I'm holding back and it's killing me", "You're making it really hard to behave"])}`,
            `${seeds()} ${heatedThoughts()} ${v()} ${pick(["And honestly I'm done pretending I'm not thinking about it", "Is it obvious? I don't care"])}`,
            `You keep this up and I won't be responsible for what I say next ${v()} ${pick(["You've been warned", "Last chance to change the subject"])}`,
          );
        } else if (s.isNight) {
          pool.push(
            `I wish you were here right now. ${pick(["Not in a cute way. In a real way", "I keep imagining what tonight would look like with you"])} ${v()}`,
            `Goodnight but ${pick(["I'd rather be saying that in person", "what I'm picturing right now isn't PG", "you're all I'm going to think about"])} ${v()}`,
          );
        } else if (s.isGoodTime) {
          pool.push(
            `It's only going to get better ${v()} ${pick(["I have plans for us. In my head at least", "Next time \u2014 no time limit"])}`,
            `${pick(["You have no idea what you do to me", "The effect you have on me is dangerous"])} ${v()} ${pick(["I need you to know that", "And I'm done hiding it"])}`,
          );
        } else if (s.isCompliment) {
          pool.push(
            `You're ${pick(["the only one who makes me feel like this", "doing things to me with just your words"])} ${v()} ${pick(["Imagine what would happen in person", "And you're not even trying"])}`,
          );
        } else if (s.isPositive) {
          pool.push(
            `${pick(["Good", "Perfect"])} ${v()} Because I've been thinking about ${pick(["having you close", "what happens when we stop texting and start doing"])} and I'm not pretending otherwise`,
          );
        } else {
          pool.push(
            `I'm past the point of playing games ${v()} ${pick(["I want you. Plain and simple", "You're in my head and I like it there", "Tell me you feel this too"])}`,
            `${closingMoves()} ${v()} ${pick(["I'm done being patient", "This tension needs resolving", "You know it too"])}`,
            `${seeds()} ${heatedThoughts()} ${v()} And I'm done being subtle about it`,
          );
        }
      }

      if (vibe === 'witty') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `My brain just switched from "be funny" to "be honest" and honestly? ${pick(["I want you here", "The things I'm thinking aren't PG", "You broke me"])} ${v()}`,
            `I was trying to keep this light but you ${pick(["made that impossible", "keep pulling me deeper", "changed the rules"])} ${v()} ${pick(["No complaints though", "Terms accepted"])}`,
          );
        } else {
          pool.push(
            `We passed the "just texting" phase ${pick(["three conversations ago", "when I started checking my phone for you", "the moment I started overthinking my replies"])} ${v()} ${pick(["Just stating facts", "The evidence is clear"])}`,
            `If this tension was a stock I'd invest everything ${v()} ${pick(["Returns looking incredible", "Bull market energy", "I'm all in"])}`,
          );
        }
      }

      if (vibe === 'bold') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `${pick(["Stop teasing and come find out", "You know exactly what you're doing"])} ${v()} ${pick(["I'm done holding back", "I want you and I'm not being subtle about it"])}`,
            `${closingMoves()} ${v()} ${pick(["No more games", "I mean it", "Your call... but I think we both know what you'll say"])}`,
          );
        } else if (s.isNight) {
          pool.push(
            `Tonight ${pick(["I don't want to say goodnight", "would be better if you were here", "I'm thinking about you in ways I shouldn't"])} ${v()}`,
          );
        } else {
          pool.push(
            `${pick(["I'm done pretending", "Cards on the table"])} \u2014 ${pick(["I want you. Not just conversation", "this has gone past texting and we both know it"])} ${v()} ${pick(["What are you going to do about it?", "When?"])}`,
            `${pick(["Real talk", "No more holding back"])} \u2014 ${pick(["the way I feel about you is past the point of subtle", "you're not just in my head, you're under my skin"])} ${v()}`,
          );
        }
      }

      if (vibe === 'flirty') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `I literally cannot handle you ${v()} ${pick(["Come here right now", "You're killing me in the best way", "I need you to stop... no actually don't"])}`,
            `${seeds()} ${heatedThoughts()} ${v()} ${pick(["And I'm blushing even typing this", "My heart is doing overtime", "You have NO idea"])}`,
            `The things I'd whisper to you if you were here right now ${v()} ${pick(["I can't type them", "You'd never want to leave", "I'm getting flustered just thinking about it"])}`,
          );
        } else if (s.isNight) {
          pool.push(
            `I don't want to say goodnight. I want to say ${pick(["come over", "stay up with me", "tell me what you'd do if you were here"])} ${v()}`,
          );
        } else {
          pool.push(
            `I'm not just catching feelings anymore \u2014 ${pick(["they caught me", "I fell", "I'm in deep and I like it"])} ${v()} ${pick(["It's your fault", "And I want you to know"])}`,
            `${pick(["I miss you and you haven't even left", "I crave your attention", "I need more of you"])} ${v()} ${pick(["Is that too much? I don't care", "Blame yourself"])}`,
          );
        }
      }

      if (vibe === 'mysterious') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `I've been holding back things I want to say to you ${v()} ${pick(["Maybe tonight I stop", "You're making it harder to wait", "Ask me the right question and I'll tell you everything"])}`,
            `There are thoughts I have about you at night that ${pick(["I've never typed before", "would change everything", "make me want you here"])} ${v()} ${pick(["One day I'll tell you. Maybe tonight", "Come find out"])}`,
          );
        } else if (s.isNight) {
          pool.push(
            `Late night with you feels different ${v()} ${pick(["Like we're the only two people awake", "This is when I want you most", "The thoughts get louder when it's quiet"])}`,
          );
        } else {
          pool.push(
            `I've stopped pretending this is casual ${v()} ${pick(["You're under my skin", "I want to know every version of you", "The desire is quiet but it's deafening"])}`,
            `${pick(["Some things need to be said in person", "I have something to tell you but not over text"])} ${v()} ${pick(["Soon", "When the moment is right", "You'll know when"])}`,
          );
        }
      }
    }

    // Deduplicate and return 3
    const unique = [...new Set(pool)];
    return shuffle(unique).slice(0, 3);
  }

  return { generateReplies, generateStarters, analyzeMessage };
})();
