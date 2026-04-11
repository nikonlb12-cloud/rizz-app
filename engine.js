/* =============================================
   RIZZ ENGINE v5 — Bio-Aware + Stage + Vibe
   Every response tailored to her profile
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

  const pullbacks = () => pick([
    'but I\'m not gonna say too much',
    'but I\'ll keep that to myself for now',
    'anyway, moving on before I say something I shouldn\'t',
    'but you didn\'t hear that from me',
    'but I\'ll stop there',
  ]);

  const seeds = () => pick([
    'I keep picturing', 'I can\'t stop thinking about',
    'something about you makes me wonder', 'I\'ve been imagining',
  ]);

  const imaginations = () => pick([
    'what it would be like to hear you laugh',
    'what your voice sounds like',
    'how it would feel to be next to you right now',
    'if your hugs are as warm as your energy',
  ]);

  const heatedThoughts = () => pick([
    'what would happen if we were alone right now',
    'what you\'d do if I was right there with you',
    'having you all to myself',
  ]);

  // =============================================
  // BIO / PROFILE PARSER
  // Extracts specific interests, traits, keywords
  // =============================================
  function parseBio(text) {
    if (!text) return { topics: [], raw: '' };
    const lower = text.toLowerCase();
    const found = [];

    const topicMap = {
      travel:    { pattern: /travel|wanderlust|adventure|passport|backpack|explore|globe|world|abroad|trip|vacation|nomad|fly|airport/i, labels: ['travel', 'adventure', 'exploring'] },
      hiking:    { pattern: /hik(e|ing|er)|trail|mountain|nature|outdoor|camp(ing)?|backpack/i, labels: ['hiking', 'the outdoors', 'nature'] },
      gym:       { pattern: /gym|lift|workout|fitness|crossfit|gains|bodybuilding|weight|deadlift|squat/i, labels: ['the gym', 'working out', 'fitness'] },
      yoga:      { pattern: /yoga|meditat|mindful|stretch|pilates|zen/i, labels: ['yoga', 'mindfulness'] },
      running:   { pattern: /run(ning|ner)?|marathon|5k|10k|jog/i, labels: ['running', 'staying active'] },
      dogs:      { pattern: /dog|pup|puppy|pupper|doggo|fur.?baby|golden.?retriever|labrador|frenchie|husky/i, labels: ['dogs', 'your dog'] },
      cats:      { pattern: /cat|kitten|kitty|cat.?mom|cat.?dad|feline/i, labels: ['cats', 'your cat'] },
      coffee:    { pattern: /coffee|latte|espresso|caffeine|matcha|cafe|barista/i, labels: ['coffee', 'caffeine'] },
      wine:      { pattern: /wine|vineyard|sommelier|merlot|pinot|rosé|winery/i, labels: ['wine', 'good wine'] },
      cooking:   { pattern: /cook(ing)?|chef|bake|baking|recipe|kitchen|foodie|food.?lover/i, labels: ['cooking', 'food'] },
      sushi:     { pattern: /sushi|ramen|japanese|thai|pho/i, labels: ['sushi', 'good food'] },
      pizza:     { pattern: /pizza/i, labels: ['pizza'] },
      brunch:    { pattern: /brunch|mimosa|bottomless/i, labels: ['brunch'] },
      music:     { pattern: /music|concert|festival|live.?music|gig|band|spotify|playlist/i, labels: ['music', 'live music'] },
      singing:   { pattern: /sing(ing|er)?|karaoke|vocal/i, labels: ['singing', 'karaoke'] },
      dancing:   { pattern: /danc(e|ing|er)|salsa|bachata|club/i, labels: ['dancing'] },
      art:       { pattern: /art(ist)?|paint(ing)?|draw(ing)?|creative|gallery|museum|sculpt/i, labels: ['art', 'being creative'] },
      photo:     { pattern: /photo(graphy|grapher)?|camera|shoot|portrait|film.?photo/i, labels: ['photography'] },
      reading:   { pattern: /read(ing)?|book|novel|bookworm|library|literature|kindle/i, labels: ['reading', 'books'] },
      writing:   { pattern: /writ(e|ing|er)|poet(ry)?|journal|blog/i, labels: ['writing'] },
      movies:    { pattern: /movie|film|cinema|netflix|streaming|binge|watch/i, labels: ['movies', 'Netflix'] },
      gaming:    { pattern: /gam(e|ing|er)|xbox|playstation|nintendo|pc.?game|twitch/i, labels: ['gaming'] },
      sports:    { pattern: /football|soccer|basketball|tennis|volleyball|surfing|snowboard|ski(ing)?|skate/i, labels: ['sports'] },
      beach:     { pattern: /beach|ocean|sea|surf|coast|island|tropical|tan/i, labels: ['the beach', 'the ocean'] },
      fashion:   { pattern: /fashion|style|outfit|designer|model(ing)?|runway/i, labels: ['fashion', 'style'] },
      tattoo:    { pattern: /tattoo|ink|tatted|body.?art/i, labels: ['tattoos'] },
      nurse:     { pattern: /nurse|nursing|nurs|healthcare|hospital|medical|ER|ICU/i, labels: ['nursing', 'healthcare'] },
      teacher:   { pattern: /teach(er|ing)?|educator|school|classroom|professor/i, labels: ['teaching'] },
      student:   { pattern: /student|uni(versity)?|college|study|degree|grad(uating)?|major/i, labels: ['studying'] },
      entrepreneur: { pattern: /entrepreneur|business|startup|founder|CEO|hustle|grind|self.?made/i, labels: ['ambition', 'hustling'] },
      spirituality: { pattern: /spiritual|astrology|zodiac|manifest|energy|crystal|chakra|universe|vibe/i, labels: ['spiritual things', 'good energy'] },
      plants:    { pattern: /plant|garden(ing)?|succulent|cactus|green.?thumb|botanical/i, labels: ['plants', 'gardening'] },
      thrifting: { pattern: /thrift|vintage|retro|second.?hand|antique|flea.?market/i, labels: ['thrifting', 'vintage finds'] },
    };

    // Extract matching topics
    for (const [key, data] of Object.entries(topicMap)) {
      if (data.pattern.test(lower)) {
        found.push({ key, label: pick(data.labels) });
      }
    }

    // Extract specific place names or unique phrases OCR caught
    const places = lower.match(/\b(london|paris|new york|tokyo|bali|miami|la|nyc|ibiza|barcelona|amsterdam|dubai|thailand|mexico|italy|greece|spain|portugal|australia|hawaii)\b/gi) || [];
    if (places.length > 0) {
      found.push({ key: 'place', label: places[0].charAt(0).toUpperCase() + places[0].slice(1) });
    }

    // Extract age if present
    const ageMatch = lower.match(/\b(1[89]|2\d|3[0-5])\b/);
    const age = ageMatch ? ageMatch[1] : null;

    // Extract zodiac
    const zodiacMatch = lower.match(/\b(aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces)\b/i);
    const zodiac = zodiacMatch ? zodiacMatch[1].charAt(0).toUpperCase() + zodiacMatch[1].slice(1) : null;

    // Extract height
    const heightMatch = lower.match(/\b([4-6]'?\s*[0-9]{1,2}"?|[4-6]\s*foot|[4-6]\s*ft)\b/i);
    const height = heightMatch ? heightMatch[0] : null;

    return {
      topics: found,
      places,
      age,
      zodiac,
      height,
      raw: text,
      hasContext: found.length > 0 || places.length > 0 || zodiac !== null,
    };
  }


  // =============================================
  // PERSONALIZED STARTERS — Built from bio data
  // =============================================
  function generatePersonalizedStarters(vibe, bio) {
    const v = emojis[vibe];
    const t = bio.topics;
    const pool = [];

    // Get 1-2 random topics to reference
    const shuffledTopics = shuffle(t);
    const t1 = shuffledTopics[0];
    const t2 = shuffledTopics[1];

    if (vibe === 'smooth') {
      if (t1) pool.push(
        `I saw ${t1.label} in your profile and honestly that's what made me stop scrolling ${v()} ${pick(["Tell me more", "I need to know the story behind that", "I have so many questions"])}`,
        `So you're into ${t1.label}? ${pick(["That's already a green flag", "Okay you just got way more interesting", "I think I like you already"])} ${v()}`,
        `A girl who's into ${t1.label}... ${pick(["that's rare and I'm here for it", "you just went from interesting to irresistible", "I knew there was something about you"])} ${v()}`,
      );
      if (t2) pool.push(
        `${t1.label} AND ${t2.label}? ${pick(["You're literally my type", "Okay this is actually dangerous", "We might have too much in common"])} ${v()}`,
      );
      if (bio.zodiac) pool.push(
        `A ${bio.zodiac} with taste? ${pick(["Now you've really got my attention", "That explains the energy", "I should've known"])} ${v()}`,
      );
      if (bio.places.length > 0) pool.push(
        `You've been to ${bio.places[0].charAt(0).toUpperCase() + bio.places[0].slice(1)}? ${pick(["I need the full story", "Okay we definitely need to compare travel notes", "That tells me everything I need to know about you"])} ${v()}`,
      );
      // Generic but profile-aware fallback
      pool.push(
        `Your whole profile has this ${pick(["energy", "vibe", "aura"])} I can't explain ${v()} ${pick(["I had to say something", "I needed to know if you're as interesting as you look"])}`,
      );
    }

    if (vibe === 'witty') {
      if (t1) pool.push(
        `I was going to send "hey" but then I saw ${t1.label} in your bio and thought ${pick(["she deserves better", "I can actually work with this", "okay this girl has taste"])} ${v()}`,
        `Your bio says ${t1.label} and I immediately thought "${pick(["finally someone with actual personality", "okay she's dangerous", "we'd either be best friends or a disaster"])}" ${v()}`,
      );
      if (t1 && t2) pool.push(
        `${t1.label} and ${t2.label}? Pick a struggle ${v()} ${pick(["Just kidding, I respect the range", "You're either amazing or chaotic and I'm here for both"])}`,
      );
      if (bio.zodiac) pool.push(
        `A ${bio.zodiac}... ${pick(["explain why I should risk it", "my horoscope warned me about you", "this is either perfect or terrible. No in between"])} ${v()}`,
      );
      pool.push(
        `Your profile did something to me and I'm now ${pick(["overthinking my opener", "questioning if I'm good enough", "convinced we'd vibe"])} ${v()}`,
      );
    }

    if (vibe === 'bold') {
      if (t1) pool.push(
        `Saw ${t1.label} in your bio. ${pick(["I need to know if you're as passionate about it as I think", "That already tells me we'd click", "I respect it"])} ${v()} ${pick(["Tell me more", "I'm listening"])}`,
        `You're into ${t1.label}. I'm into you. ${pick(["Simple math", "That's where we start", "Let's not overcomplicate this"])} ${v()}`,
      );
      if (t2) pool.push(
        `${t1.label}, ${t2.label}... You're ${pick(["exactly my type and I'm not hiding it", "the kind of trouble I've been looking for"])} ${v()}`,
      );
      pool.push(
        `Your profile tells me you're ${pick(["not basic", "different", "the kind of person I actually want to know"])}. ${pick(["Prove me right", "Your move"])} ${v()}`,
      );
    }

    if (vibe === 'flirty') {
      if (t1) pool.push(
        `Okay so you're into ${t1.label}? ${pick(["That's adorable and I need to hear everything", "I'm already smiling and I haven't even messaged yet", "You just got 10x cuter"])} ${v()}`,
        `The fact that you like ${t1.label} makes me want to ${pick(["text you all day", "learn everything about you", "fall for you a little bit"])} ${v()}`,
      );
      if (t1 && t2) pool.push(
        `A girl who's into ${t1.label} AND ${t2.label}? ${pick(["My heart can't handle this", "I think I just developed a crush", "You're literally a dream"])} ${v()}`,
      );
      if (bio.zodiac) pool.push(
        `A ${bio.zodiac}? ${pick(["That explains why I can't stop staring at your profile", "My weakness honestly", "I knew I was in trouble"])} ${v()}`,
      );
      pool.push(
        `Your profile is ${pick(["giving main character energy", "unfairly attractive", "making me nervous and I love it"])} ${v()}`,
      );
    }

    if (vibe === 'mysterious') {
      if (t1) pool.push(
        `I noticed ${t1.label} in your bio. ${pick(["There's a story there I want to hear", "That tells me more than you think", "Most people skip the details. I don't"])} ${v()}`,
        `${t1.label}. Interesting. ${pick(["Tell me something about it nobody else knows", "I have questions but I'll earn the answers"])} ${v()}`,
      );
      if (bio.zodiac) pool.push(
        `A ${bio.zodiac}. ${pick(["That changes things", "I had a feeling", "This is starting to make sense"])} ${v()}`,
      );
      pool.push(
        `Your profile says a lot. But ${pick(["I think there's more hidden underneath", "I want to know the parts you don't show everyone", "the most interesting thing about you isn't written there"])} ${v()}`,
      );
    }

    return shuffle(pool).slice(0, 3);
  }


  // =============================================
  // GENERIC STARTERS — No bio context
  // =============================================
  function generateGenericStarters(vibe) {
    const v = emojis[vibe];
    const starters = {
      smooth: [
        () => `I don't usually message first. But ${pick(["something about your profile pulled me in", "I couldn't scroll past you"])} ${v()}`,
        () => `Okay I'm just going to say it \u2014 ${pick(["you've got an energy I can't quite read", "there's something about you I need to figure out"])} ${v()}`,
        () => `Something tells me you're the type who ${pick(["makes everyone in the room curious", "doesn't realize the effect you have"])} ${v()}`,
        () => `Not gonna lie, I've been staring at your profile trying to think of something clever. ${pick(["Gave up. Here's honesty instead", "Then realized you'd respect realness more"])} ${v()}`,
        () => `I was going to play it cool but ${pick(["that felt fake", "honestly? I just wanted to talk to you"])}. What's one thing about you that would surprise me? ${v()}`,
      ],
      witty: [
        () => `My opening line strategy: ${pick(["Google 'best openers' \u2192 cringe \u2192 just be myself", "overthink for 20 mins \u2192 type 'hey' \u2192 delete \u2192 try this"])} ${v()}`,
        () => `Quick compatibility test: ${pick(["pineapple on pizza \u2014 yes or no?", "morning person or chaos gremlin?", "do you double text or have self-control?"])} ${v()}`,
        () => `Fun fact: ${pick(["you just made me stop doom-scrolling", "I rewrote this 4 times", "this is my first message today and I picked you"])} ${v()}`,
        () => `On a scale of 'hey' to actually creative, I'm aiming for a 7. ${pick(["What's the wildest thing you did this month?", "Give me your most controversial opinion"])} ${v()}`,
      ],
      bold: [
        () => `I'll skip the small talk \u2014 ${pick(["you caught my eye and I'm not pretending you didn't", "something about you tells me you can handle directness"])} ${v()}`,
        () => `Here's the deal: ${pick(["I'm interesting, I'm real, and I think you're worth the risk", "one convo with me and you'll want another"])}. ${pick(["Your move", "Show me what you've got"])} ${v()}`,
        () => `First impression? ${pick(["You look like trouble and I'm here for it", "You seem like you'd match my intensity"])}. ${pick(["Prove me right", "Challenge accepted?"])} ${v()}`,
      ],
      flirty: [
        () => `Is it weird that I'm ${pick(["smiling at my phone right now", "already a little nervous", "genuinely excited to talk to you"])}? ${v()}`,
        () => `I have a confession \u2014 I've been ${pick(["thinking of an excuse to message you", "trying to play it cool and failing"])}. So here I am ${v()}`,
        () => `Hi, I'm your new favorite notification ${v()} ${pick(["Let me earn it though", "No pressure, just vibes"])}`,
      ],
      mysterious: [
        () => `I almost didn't message you. Then I saw ${pick(["that one photo", "something I can't explain"])} and changed my mind ${v()}`,
        () => `Most people here are an open book. You seem more like ${pick(["a whole library", "a locked journal", "a story I want to read slowly"])} ${v()}`,
        () => `There's something about ${pick(["people who don't try too hard", "quiet confidence", "your energy"])} that makes me want to ${pick(["know more", "take my time with you"])} ${v()}`,
      ],
    };
    return shuffle(starters[vibe].map(fn => fn())).slice(0, 3);
  }


  // =============================================
  // PUBLIC STARTERS ENTRYPOINT
  // =============================================
  function generateStarters(vibe, bioText) {
    const bio = parseBio(bioText);
    if (bio.hasContext && bio.topics.length > 0) {
      return generatePersonalizedStarters(vibe, bio);
    }
    return generateGenericStarters(vibe);
  }


  // =============================================
  // CONTEXT ANALYZER (for reply mode)
  // =============================================
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


  // =============================================
  // MAIN REPLY GENERATOR — Stage + Vibe + Context
  // =============================================
  function generateReplies(msg, vibe, stage, bioText) {
    const s = analyzeMessage(msg);
    const v = emojis[vibe];
    const bio = parseBio(bioText || msg);
    stage = stage || 'talking';
    let pool = [];

    // If this looks like a bio/profile (lots of interests, no conversation pattern),
    // generate personalized starters instead of treating it as a message
    if (bio.hasContext && bio.topics.length >= 2 && !s.isQuestion && !s.isGreeting && !s.isCompliment && !s.isFlirty && !s.isSexual) {
      return generatePersonalizedStarters(vibe, bio);
    }

    // Topic-aware fragments — reference her interests in replies
    const topicRef = () => {
      if (bio.topics.length > 0) {
        const t = pick(bio.topics);
        return pick([
          `especially with someone who's into ${t.label}`,
          `and the fact that you like ${t.label} makes it better`,
          `— plus your ${t.label} thing? Even more attractive`,
          `and I can already tell from the ${t.label} energy`,
        ]);
      }
      return '';
    };

    // =============================================
    // STAGE: COLD — Treat as starter generation
    // =============================================
    if (stage === 'cold') {
      return generateStarters(vibe, msg);
    }

    // =============================================
    // STAGE: JUST TALKING
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
            `That ${pick(["means a lot", "hit different"])} coming from you ${v()} The feeling is mutual`,
            `You're making me smile and I don't smile easy ${v()} ${topicRef()}`,
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
            `Your humor is ${pick(["one of my favorite things about you already", "genuinely attractive"])} ${v()} ${pick(["Keep it coming", "Don't let it go to your head"])}`,
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
          );
        } else if (s.isSharing) {
          pool.push(
            `I love that you ${pick(["trust me with that", "opened up"])} ${v()} ${pick(["Most people keep it surface. You're different", "That tells me good things about you"])}`,
          );
        } else {
          pool.push(
            `${pick(["You've got my attention", "I'm interested"])} \u2014 ${pick(["that doesn't happen easily", "keep going"])} ${v()} ${topicRef()}`,
            `There's something about you that's ${pick(["intriguing", "magnetic", "different"])} ${v()} I keep coming back for more`,
            `${pick(["I like where this is going", "This is fun"])} ${v()} ${pick(["Tell me more", "I want to know everything"])}`,
          );
        }
      }

      if (vibe === 'witty') {
        if (s.isGreeting && s.isDryText) {
          pool.push(
            `"Hey"?? ${pick(["Give me something to work with", "I accept nothing less than effort"])} ${v()} ${pick(["Lucky for you I'm interesting enough for both of us", "Don't worry, I'll carry this"])}`,
          );
        } else if (s.isCompliment) {
          pool.push(
            `I know ${v()} But it hits different from someone with ${pick(["impeccable taste", "actual taste"])}. ${pick(["Tell me more though", "Your turn"])}`,
          );
        } else {
          pool.push(
            `This conversation has more chemistry than ${pick(["my entire DM history", "a Netflix show"])} ${v()} ${topicRef()}`,
            `You're ${pick(["disturbingly fun to talk to", "ruining my productivity", "becoming my favorite notification"])} ${v()}`,
          );
        }
      }

      if (vibe === 'bold') {
        if (s.isGreeting && s.isDryText) {
          pool.push(
            `Don't 'hey' me ${pick(["when there's clearly more to say", "I know that's not all you got"])} ${v()} ${pick(["Say what's on your mind", "Give me your real energy"])}`,
          );
        } else {
          pool.push(
            `${pick(["I'll be direct", "No filter"])} \u2014 ${pick(["you're interesting and I want to know more", "I haven't been this invested in a convo in a while"])} ${v()} ${topicRef()}`,
            `${pick(["Real talk", "Honestly"])} \u2014 ${pick(["you stand out", "there's something here and we both know it"])} ${v()}`,
          );
        }
      }

      if (vibe === 'flirty') {
        if (s.isGreeting && s.isDryText) {
          pool.push(
            `Hiii ${v()} ${pick(["I smile every time your name pops up", "You just made my day better"])}`,
          );
        } else {
          pool.push(
            `You're making it ${pick(["impossible to play it cool", "hard to focus on anything else"])} ${v()} And I don't even mind ${topicRef()}`,
            `Every text from you makes me more ${pick(["hooked", "attached", "interested"])} ${v()} You should know that`,
          );
        }
      }

      if (vibe === 'mysterious') {
        if (s.isGreeting && s.isDryText) {
          pool.push(
            `Hey. ${pick(["Perfect timing", "Interesting"])} ${v()} ${pick(["Tell me something real", "What's actually on your mind?"])}`,
          );
        } else {
          pool.push(
            `${pick(["There's something about this I didn't expect", "You're different"])} ${v()} ${pick(["I mean that as the highest compliment", "Make of that what you will"])}`,
            `I don't give my attention easily. ${pick(["You've earned it", "That should tell you something"])} ${v()} ${topicRef()}`,
          );
        }
      }
    }

    // =============================================
    // STAGE: HEATING UP
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
            `${seeds()} ${imaginations()} ${v()} ${pullbacks()}`,
          );
        } else if (s.isNight) {
          pool.push(
            `Late night you is my favorite you ${v()} ${pick(["Something about texting at night feels more real", "I might think about you before I fall asleep"])}`,
            `Goodnight texts from you hit different ${v()} ${pick(["Don't stay up thinking about me. Actually, do", "Sleep well... I'll be in your dreams"])}`,
          );
        } else if (s.isPlayful) {
          pool.push(
            `Your humor is ${pick(["dangerously attractive", "one of my favorite things about you"])} ${v()} ${pick(["I'm actually getting attached", "Don't let it go to your head"])}`,
          );
        } else {
          pool.push(
            `There's ${pick(["something about you I can't figure out", "this energy between us"])} ${v()} ${pick(["And I keep coming back for more", "I'm not fighting it"])} ${topicRef()}`,
            `${pick(["You've got my full attention", "I'm invested"])} \u2014 ${pick(["that doesn't happen easily", "you're making this addictive"])} ${v()}`,
            `${pick(["I like where this is going", "You're making me feel things"])} ${v()} ${pullbacks()}`,
          );
        }
      }

      if (vibe === 'witty') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `Oh so we're doing this? ${v()} ${pick(["I was trying to behave but you ruined that", "My filter just left the chat"])}. ${pullbacks()}`,
          );
        } else {
          pool.push(
            `This conversation has me ${pick(["feeling things and I'm blaming you", "more invested than I planned"])} ${v()} ${topicRef()}`,
            `You're ${pick(["dangerously fun", "becoming my problem"])} and I'm ${pick(["here for it", "not even mad"])} ${v()}`,
          );
        }
      }

      if (vibe === 'bold') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `${pick(["Don't start something you can't finish", "Finally, someone who matches my energy"])} ${v()} ${pick(["You have no idea what's going through my mind", "I like that you're not shy"])}`,
          );
        } else {
          pool.push(
            `${pick(["No filter", "Real talk"])} \u2014 ${pick(["there's something between us", "you're on my mind more than you should be"])} ${v()} ${topicRef()}`,
            `${pick(["Honestly", "Straight up"])} \u2014 ${pick(["you make me feel something", "talking to you does something to me"])} ${v()} ${pullbacks()}`,
          );
        }
      }

      if (vibe === 'flirty') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `You're literally making my heart do that thing ${v()} ${pick(["Stop... actually don't stop", "I'm in trouble aren't I"])}`,
            `${seeds()} ${imaginations()} ${v()} ${pick(["Is that weird? I don't care", "You started it"])}`,
          );
        } else {
          pool.push(
            `You're making it ${pick(["impossible to play it cool", "really hard to focus"])} ${v()} And I don't even mind ${topicRef()}`,
            `Every text from you makes me more ${pick(["hooked", "gone", "attached"])} ${v()} ${pick(["You should know that", "This wasn't the plan but here we are"])}`,
          );
        }
      }

      if (vibe === 'mysterious') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `${pick(["You're getting closer", "Careful"])} ${v()} ${pick(["I have thoughts about you I'm not sharing yet", "There's a version of this that happens after midnight"])}... ${pullbacks()}`,
          );
        } else {
          pool.push(
            `${pick(["There's something about this I didn't expect", "You're different"])} ${v()} ${pick(["I mean that as the highest compliment", "You've earned my attention"])} ${topicRef()}`,
            `${seeds()} ${pick(["something about you I can't figure out", "the tension in this conversation"])} ${v()} ${pick(["I can't explain it", "And I'm not fighting it"])}`,
          );
        }
      }
    }

    // =============================================
    // STAGE: CLOSING IN
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
          );
        } else {
          pool.push(
            `I'm past the point of playing games ${v()} ${pick(["I want you. Plain and simple", "You're in my head and I like it there", "Tell me you feel this too"])}`,
            `${seeds()} ${heatedThoughts()} ${v()} And I'm done being subtle about it`,
            `I need to be honest with you ${v()} ${pick(["You do something to me nobody else does", "I haven't felt this way in a long time"])} ${topicRef()}`,
          );
        }
      }

      if (vibe === 'witty') {
        pool.push(
          `We passed the "just texting" phase ${pick(["three conversations ago", "when I started checking my phone for you"])} ${v()} ${pick(["Just stating facts", "The evidence is clear"])}`,
          `If this tension was a stock I'd invest everything ${v()} ${pick(["Returns looking incredible", "I'm all in"])}`,
        );
      }

      if (vibe === 'bold') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `${pick(["Stop teasing and come find out", "You know exactly what you're doing"])} ${v()} ${pick(["I'm done holding back", "I want you and I'm not being subtle"])}`,
          );
        } else {
          pool.push(
            `${pick(["I'm done pretending", "Cards on the table"])} \u2014 ${pick(["I want you. Not just conversation", "this has gone past texting"])} ${v()} ${pick(["What are you going to do about it?", "When?"])}`,
            `${pick(["Real talk", "No more holding back"])} \u2014 ${pick(["the way I feel about you is past the point of subtle", "you're not just in my head, you're under my skin"])} ${v()}`,
          );
        }
      }

      if (vibe === 'flirty') {
        if (s.isFlirty || s.isSexual) {
          pool.push(
            `I literally cannot handle you ${v()} ${pick(["Come here right now", "You're killing me in the best way"])}`,
            `The things I'd whisper to you if you were here right now ${v()} ${pick(["I can't type them", "You'd never want to leave"])}`,
          );
        } else {
          pool.push(
            `I'm not just catching feelings anymore \u2014 ${pick(["they caught me", "I fell", "I'm in deep"])} ${v()} ${pick(["It's your fault", "And I want you to know"])}`,
            `${pick(["I miss you and you haven't even left", "I crave your attention"])} ${v()} ${pick(["Is that too much? I don't care", "Blame yourself"])}`,
          );
        }
      }

      if (vibe === 'mysterious') {
        pool.push(
          `I've been holding back things I want to say to you ${v()} ${pick(["Maybe tonight I stop", "Ask me the right question and I'll tell you everything"])}`,
          `${pick(["Some things need to be said in person", "I have something to tell you but not over text"])} ${v()} ${pick(["Soon", "When the moment is right"])}`,
        );
      }
    }

    const unique = [...new Set(pool)];
    return shuffle(unique).slice(0, 3);
  }

  return { generateReplies, generateStarters, analyzeMessage, parseBio };
})();
