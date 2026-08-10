/*!
 * LFS Shanghai — Багцын нэгдсэн өгөгдөл (single source of truth)
 * ═══════════════════════════════════════════════════════════════
 * Багцын нэр, үнэ, багтсан зүйлс, хуваарь, шинжилгээ — БҮГД энд.
 * Өөр ямар ч файлд эдгээрийг гараар бичихгүй.
 *
 * Үнэ эсвэл контент солих бол:
 *   1. Энэ файлыг зас
 *   2. node scripts/build-packages.js   ← /packages/ хуудсуудыг дахин үүсгэнэ
 *   3. git commit && git push
 *
 * Энэ файл браузер (window.LFS_PACKAGES) болон Node (require) хоёуланд ажиллана.
 */
(function (root, factory) {
  var data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.LFS_PACKAGES = data;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* Үнэ хэдий хүртэл хүчинтэй (Google Offer.priceValidUntil).
     ⚠️ ЭНЭ ОГНОО ӨНГӨРВӨЛ Google хайлтын үр дүнд үнэ харуулахаа болино.
     Жилд нэг удаа шинэчил — build script нь 60 хоног үлдэхэд сануулна. */
  var PRICE_VALID_UNTIL = '2027-06-30';

  // ── 23 төрлийн шинжилгээ (Шинжилгээ + Аялал багцад багтсан) ──
  var TEST_GROUPS = [
    {
      icon: '🖼️',
      title: { mn: 'Дүрс диагностик', en: 'Imaging diagnostics' },
      items: [
        { mn: ['MRI', 'Соронзон резонанст томографи'], en: ['MRI', 'Magnetic resonance imaging'] },
        { mn: ['CT', 'Компьютер томографи'], en: ['CT scan', 'Computed tomography'] },
        { mn: ['Зүрхний эхо', 'Echocardiogram'], en: ['Echocardiogram', 'Cardiac ultrasound'] },
        { mn: ['Рентген оншлогоо', 'X-Ray'], en: ['X-Ray', 'Radiographic imaging'] }
      ]
    },
    {
      icon: '🧪',
      title: { mn: 'Лабораторийн шинжилгээ', en: 'Laboratory tests' },
      items: [
        { mn: ['Цусны дэлгэрэнгүй шинжилгээ', ''], en: ['Complete blood count', ''] },
        { mn: ['Цусны биохимийн шинжилгээ', ''], en: ['Blood biochemistry', ''] },
        { mn: ['Шээсний дэлгэрэнгүй шинжилгээ', ''], en: ['Complete urinalysis', ''] },
        { mn: ['Чихрийн шижингийн сорил', ''], en: ['Diabetes screening', ''] },
        { mn: ['Инсулин тодорхойлох', ''], en: ['Insulin test', ''] },
        { mn: ['Бөөрний үйл ажиллагаа / Үзлэг', 'лаборатори + эхо'], en: ['Kidney function / exam', 'lab + ultrasound'] }
      ]
    },
    {
      icon: '🩺',
      title: { mn: 'Нарийн мэргэжлийн үзлэг', en: 'Specialist consultations' },
      items: [
        { mn: ['Зүрхний үзлэг', ''], en: ['Cardiology', ''] },
        { mn: ['Зүрх судасны систем', ''], en: ['Cardiovascular system', ''] },
        { mn: ['Уушгины үзлэг', ''], en: ['Pulmonology', ''] },
        { mn: ['Гэдэсний үзлэг / Эхо', ''], en: ['Gastroenterology / ultrasound', ''] },
        { mn: ['Чих, хамар, хоолой', ''], en: ['ENT — ear, nose, throat', ''] },
        { mn: ['Сонсголын шалгалт', ''], en: ['Hearing test', ''] },
        { mn: ['Нүдний үзлэг', ''], en: ['Eye examination', ''] },
        { mn: ['Эмэгтэйчүүдийн үзлэг', ''], en: ['Gynaecology', ''] },
        { mn: ['Дотоод шүүрлийн булчирхай', ''], en: ['Endocrinology', ''] }
      ]
    },
    {
      icon: '🔬',
      title: { mn: 'Мэргэжлийн оношлогоо', en: 'Specialised diagnostics' },
      items: [
        { mn: ['Бамбай булчирхайн үзлэг / Эхо', ''], en: ['Thyroid exam / ultrasound', ''] },
        { mn: ['Хөхний үзлэг / Эхо', ''], en: ['Breast exam / ultrasound', ''] }
      ]
    },
    {
      icon: '📊',
      title: { mn: 'Ерөнхий & функциональ', en: 'General & functional' },
      items: [
        { mn: ['Биеийн индекс (BMI)', 'ерөнхий үзлэг'], en: ['Body composition (BMI)', 'general check'] },
        { mn: ['Зүрхний бичлэг (ЭКГ / ECG)', 'функциональ'], en: ['ECG / electrocardiogram', 'functional'] }
      ]
    }
  ];

  // ── Нэмэлтээр сонгох боломжтой (багцад ОРООГҮЙ) ──
  var ADDON_TESTS = [
    { icon: '🎯', mn: ['Хавдрын маркер', 'Tumor markers · Лаборатори'], en: ['Tumor markers', 'Laboratory'] },
    { icon: '🔎', mn: ['Бүдүүн, нарийн гэдэсний дуран', 'Багажийн оношлогоо'], en: ['Colonoscopy', 'Endoscopic diagnostics'] },
    { icon: '🔍', mn: ['Ходоодны дуран', 'Gastroscopy · Багажийн оношлогоо'], en: ['Gastroscopy', 'Endoscopic diagnostics'] },
    { icon: '🫀', mn: ['Зүрх, уушгины ангиографи', 'Дүрс оношлогоо'], en: ['Cardiac & pulmonary angiography', 'Imaging diagnostics'] }
  ];

  // ── Зургийн сан (гарчигаар нь бүлэглэсэн) ──
  var PHOTOS = {
    hospital: [
      { src: '/img/health/hospital-reception.jpg', bg: 'linear-gradient(135deg,#1055a0,#3d8ef0)', icon: '🏥', mn: '光明中医院 · Хүлээлгийн танхим', en: 'Guangming Hospital · Waiting Area' },
      { src: '/img/health/hospital-atrium.jpg', bg: 'linear-gradient(135deg,#0a3060,#1055a0)', icon: '🏛️', mn: 'Эмнэлгийн үндсэн барилга', en: 'Main Building' },
      { src: '/img/health/hospital-lobby.jpg', bg: 'linear-gradient(135deg,#0d2a5a,#1a4fa0)', icon: '🚪', mn: 'Лобби · Орох хэсэг', en: 'Lobby & Entrance' },
      { src: '/img/health/hospital-hallway.jpg', bg: 'linear-gradient(135deg,#1a1a3a,#2a3a7a)', icon: '🛏️', mn: 'Коридор · Тасгууд', en: 'Corridor & Wards' },
      { src: '/img/health/hospital-ward.jpg', bg: 'linear-gradient(135deg,#0a2a3a,#1a5a8a)', icon: '💺', mn: 'VIP хүлээлгийн өрөө', en: 'VIP Waiting Room' },
      { src: '/img/health/hospital-corridor.jpg', bg: 'linear-gradient(135deg,#2a1a0a,#5a3a0a)', icon: '🏃', mn: 'Дотоод коридор', en: 'Interior Corridor' },
      { src: '/img/health/hospital-exterior.jpg', bg: 'linear-gradient(135deg,#0a2a1a,#1a5a3a)', icon: '🌿', mn: 'Эмнэлгийн гадна тал', en: 'Exterior' },
      { src: '/img/health/hospital-interior.jpg', bg: 'linear-gradient(135deg,#0a1a3a,#1a3a7a)', icon: '✨', mn: 'Дотоод засал', en: 'Interior' },
      { src: '/img/health/hospital-vip.jpg', bg: 'linear-gradient(135deg,#1a0a3a,#3a1a7a)', icon: '👑', mn: 'VIP давхар', en: 'VIP Floor' },
      { src: '/img/health/hospital-floor.jpg', bg: 'linear-gradient(135deg,#0a0a2a,#1a1a5a)', icon: '📐', mn: 'Давхрын ерөнхий байдал', en: 'Floor Overview' },
      { src: '/img/health/hospital-suite.jpg', bg: 'linear-gradient(135deg,#0a2a3a,#1a5a8a)', icon: '🛌', mn: 'VIP тасаг', en: 'VIP Suite' },
      { src: '/img/health/hospital-clinic.jpg', bg: 'linear-gradient(135deg,#0a2a3a,#1a5a8a)', icon: '🩻', mn: 'Оношилгооны кабинет', en: 'Diagnostic Room' }
    ],
    city: [
      { src: '/img/health/Bund2.jpg', bg: 'linear-gradient(135deg,#071e3d,#1a4fa8)', icon: '🌃', mn: 'The Bund · шөнийн гэрэлтэй', en: 'The Bund · Night Lights' },
      { src: '/img/health/pexels-olivia-cai-2152171456-32062049.jpg', bg: 'linear-gradient(135deg,#1a2a4a,#2a5fc4)', icon: '⛵', mn: 'The Bund · завиар аялал', en: 'The Bund · River Cruise' },
      { src: '/img/health/Bund1.jpg', bg: 'linear-gradient(135deg,#2a3a5a,#4a7fd4)', icon: '🏛️', mn: 'The Bund · өдрийн цагт', en: 'The Bund · Daytime' },
      { src: '/img/health/pexels-daciana-cristina-visan-2149801141-35049458.jpg', bg: 'linear-gradient(135deg,#0a0a1a,#1a1a4a)', icon: '🌆', mn: 'Шанхайн тэнгэрийн шугам · шөнө', en: 'Shanghai Skyline · Night' },
      { src: '/img/health/pexels-keeper-32467111.jpg', bg: 'linear-gradient(135deg,#0a0a2a,#1a2a5a)', icon: '🛩️', mn: 'Агаараас харсан Шанхай', en: 'Shanghai from Above' },
      { src: '/img/health/Tower1.jpg', bg: 'linear-gradient(135deg,#0a1a3a,#1e3fa0)', icon: '🏙️', mn: 'Shanghai Tower · 632м', en: 'Shanghai Tower · 632m' },
      { src: '/img/health/pexels-mohamed-does-349386075-37430246.jpg', bg: 'linear-gradient(135deg,#0a2a4a,#1a6fc4)', icon: '☁️', mn: 'Shanghai Tower · ойроос', en: 'Shanghai Tower · Up Close' },
      { src: '/img/health/pexels-blackcurrant-great-2016663774-33407837.jpg', bg: 'linear-gradient(135deg,#0a0a2a,#2a1a5a)', icon: '💜', mn: 'Oriental Pearl Tower · шөнө', en: 'Oriental Pearl Tower · Night' },
      { src: '/img/health/pexels-daniel-reynaga-337914704-35521663.jpg', bg: 'linear-gradient(135deg,#1a2a0a,#2a5a1a)', icon: '🏯', mn: 'Yu Garden · хуучин хот', en: 'Yu Garden · Shanghai Tower View' },
      { src: '/img/health/pexels-christiana-dj-2160372921-36675533.jpg', bg: 'linear-gradient(135deg,#2a1a0a,#6a3a0a)', icon: '🏮', mn: 'Yu Garden · хуучин хотын хаалга', en: 'Yu Garden · Old City Gate' },
      { src: '/img/health/pexels-tonynojmansk-186688133-18332508.jpg', bg: 'linear-gradient(135deg,#3a1a0a,#8a4a1a)', icon: '⛩️', mn: 'Yu Garden · уламжлалт архитектур', en: 'Yu Garden · Traditional Architecture' },
      { src: '/img/health/pexels-zydeaosika-2261055-4139229.jpg', bg: 'linear-gradient(135deg,#1a0a2a,#4a0a6a)', icon: '🌟', mn: 'Nanjing Road · шөнийн гэрэл', en: 'Nanjing Road · Night Lights' },
      { src: '/img/health/pexels-anderson-wei-2151965849-34647784.jpg', bg: 'linear-gradient(135deg,#1a2a1a,#2a5a2a)', icon: '🛍️', mn: 'Xintiandi · The Hub', en: 'Xintiandi · The Hub' },
      { src: '/img/health/pexels-brunafisantos-35132188.jpg', bg: 'linear-gradient(135deg,#0a2a3a,#1a5a7a)', icon: '🏢', mn: 'Xintiandi · шилэн цамхгууд', en: 'Xintiandi · Glass Towers' },
      { src: '/img/health/pexels-bingqian-li-230971044-36064465.jpg', bg: 'linear-gradient(135deg,#2a1a0a,#5a3a1a)', icon: '🏚️', mn: 'French Concession · хуучин дүүрэг', en: 'French Concession · Old Quarter' },
      { src: '/img/health/pexels-nazmiazmir-33826186.jpg', bg: 'linear-gradient(135deg,#0a1a0a,#1a3a1a)', icon: '☕', mn: 'Starbucks Roastery · гадна', en: 'Starbucks Reserve Roastery · Outside' },
      { src: '/img/health/tangi-bertin-4WoSeG-5tzI-unsplash.jpg', bg: 'linear-gradient(135deg,#1a0a00,#3a1a00)', icon: '✨', mn: 'Starbucks Roastery · дотор', en: 'Starbucks Reserve Roastery · Inside' },
    ],
    zoo: [
      { src: '/img/health/pexels-tkirkgoz-15278918.jpg', bg: 'linear-gradient(135deg,#1a1a0a,#3a3a0a)', icon: '🐯', mn: 'Shanghai Zoo · цагаан бар', en: 'Shanghai Zoo · White Tiger' },
      { src: '/img/health/pexels-tkirkgoz-11857237.jpg', bg: 'linear-gradient(135deg,#0d3a1a,#1a6a2a)', icon: '🦌', mn: 'Shanghai Zoo · буга', en: 'Shanghai Zoo · Deer' },
      { src: '/img/health/pexels-cagri-besli-387362595-16751136.jpg', bg: 'linear-gradient(135deg,#1a2a0a,#3a5a1a)', icon: '🦓', mn: 'Shanghai Zoo · тахь', en: 'Shanghai Zoo · Zebra' }
    ]
  };

  // ── 5 өдрийн аяллын хөтөлбөр (Шинжилгээ + Аялал) ──
  var ITIN_FULL = [
    {
      day: 1,
      title: { mn: 'Ирэлт · Нисэх онгоцны буудлаас угтах', en: 'Arrival · Airport pickup' },
      desc: {
        mn: '17:00 цагт нисэх онгоцны буудлаас угтаж, эмнэлэгт хүргэнэ. Анхдагч зөвлөгөө өгч, маргаашийн шинжилгээнд бэлтгэнэ.',
        en: 'We meet you at the airport at 17:00 and take you to the hospital. Initial consultation and preparation for the next day’s checkup.'
      }
    },
    {
      day: 2,
      title: { mn: 'VIP Шинжилгээ · Хотын тойрон аялал', en: 'VIP checkup · City tour' },
      desc: {
        mn: 'Өглөө шинжилгээнд орж, хариугаа орчуулагч, хувийн сувилагчтайгаа хамт авна. Дараа нь хотын төвөөр аялна — алдарт Nanjing Road, The Bund, голоор завиар явж, Shanghai Tower-ийн дээрээс гарч үзнэ.',
        en: 'Morning checkup, with results explained by your interpreter and personal nurse. Then the city centre — Nanjing Road, The Bund, a river cruise and the top of Shanghai Tower.'
      }
    },
    {
      day: 3,
      title: { mn: 'Амьтны хүрээлэн · Yu Garden', en: 'Shanghai Zoo · Yu Garden' },
      desc: {
        mn: '370 гаруй нэр төрлийн 10,000 гаруй амьтантай Shanghai Zoo-г үзнэ. Luxury дээд зэрэглэлийн буфет хоол идэж, Yu Garden-оор зочилно.',
        en: 'Shanghai Zoo, home to over 10,000 animals across 370+ species. Luxury buffet lunch, then a visit to Yu Garden.'
      }
    },
    {
      day: 4,
      title: { mn: 'Шоппинг · Xintiandi · LV · Starbucks үйлдвэр', en: 'Shopping · Xintiandi · LV · Starbucks Roastery' },
      desc: {
        mn: 'Xintiandi Plaza-д орж, Louis Vuitton дэлгүүрийг үзэж, дэлхийд цорын ганц нээлттэй Starbucks үйлдвэрт зочилно.',
        en: 'Xintiandi Plaza, the Louis Vuitton store, and the world’s only open Starbucks Reserve Roastery.'
      }
    },
    {
      day: 5,
      title: { mn: 'Буцах · Нисэх онгоцны буудалд хүргэх', en: 'Departure · Airport drop-off' },
      desc: {
        mn: 'Өглөө нисэх онгоцны буудалд хүргэж, Монгол руу амжилттай буцна.',
        en: 'Morning transfer to the airport for your flight home.'
      }
    }
  ];

  // ── 1 өдрийн ажиллагаа (Энгийн шинжилгээ) ──
  var ITIN_BASIC = [
    {
      day: 1,
      title: { mn: 'VIP шинжилгээ — нэг өдөрт', en: 'VIP checkup — in a single day' },
      desc: {
        mn: 'Өглөө эмнэлэгт ирж, хувийн сувилагч, Монгол орчуулагчтайгаа шинжилгээнд орно. Дараалалгүй, 2–3 цагт бүх шинжилгээ дуусч, хариугаа мөн өдөртөө Монгол + Англи хэлээр авна.',
        en: 'Arrive at the hospital in the morning and go through your checkup with a personal nurse and Mongolian interpreter. No queues — everything is done in 2–3 hours and results come the same day in Mongolian and English.'
      }
    }
  ];

  // ── 5 өдрийн хөтөлбөр (Зөвхөн аялал — шинжилгээгүй) ──
  var ITIN_TRAVEL = [
    {
      day: 1,
      title: { mn: 'Ирэлт · Нисэх онгоцны буудлаас угтах', en: 'Arrival · Airport pickup' },
      desc: {
        mn: 'Нисэх онгоцны буудлаас угтаж, хотын төвийн зочид буудалд хүргэнэ. Орой хотын анхны танилцуулга аялал.',
        en: 'Airport pickup and transfer to your city-centre hotel. An introductory evening walk through the city.'
      }
    },
    {
      day: 2,
      title: { mn: 'The Bund · Nanjing Road · Shanghai Tower', en: 'The Bund · Nanjing Road · Shanghai Tower' },
      desc: {
        mn: 'Хотын төвөөр аялна — алдарт Nanjing Road, The Bund, голоор завиар явж, Shanghai Tower-ийн дээрээс хотыг харна.',
        en: 'The city centre — Nanjing Road, The Bund, a river cruise, and the view from the top of Shanghai Tower.'
      }
    },
    {
      day: 3,
      title: { mn: 'Shanghai Disneyland · Luxury буфет · Yu Garden', en: 'Shanghai Disneyland · Luxury buffet · Yu Garden' },
      desc: {
        mn: 'Shanghai Disneyland-д зочилно — тасалбар үнэд багтсан. Luxury дээд зэрэглэлийн буфет хоол идэж, Yu Garden-оор мөн зочилно.',
        en: 'A day at Shanghai Disneyland — entrance ticket included in the price. Luxury buffet lunch and a visit to Yu Garden.'
      }
    },
    {
      day: 4,
      title: { mn: 'Шоппинг · Xintiandi · LV · Starbucks үйлдвэр', en: 'Shopping · Xintiandi · LV · Starbucks Roastery' },
      desc: {
        mn: 'Xintiandi Plaza-д орж, Louis Vuitton дэлгүүрийг үзэж, дэлхийд цорын ганц нээлттэй Starbucks үйлдвэрт зочилно.',
        en: 'Xintiandi Plaza, the Louis Vuitton store, and the world’s only open Starbucks Reserve Roastery.'
      }
    },
    {
      day: 5,
      title: { mn: 'Буцах · Нисэх онгоцны буудалд хүргэх', en: 'Departure · Airport drop-off' },
      desc: {
        mn: 'Өглөө нисэх онгоцны буудалд хүргэж, Монгол руу амжилттай буцна.',
        en: 'Morning transfer to the airport for your flight home.'
      }
    }
  ];

  var PACKAGES = [
    {
      id: 'full',
      sku: 'LFS-FULL',
      slug: 'health-travel',
      order: 1,
      active: true,
      featured: true,
      emoji: '🥇',
      name: { mn: 'Шинжилгээ + Аялал багц', en: 'Health + Travel Package' },
      badge: { mn: 'Хамгийн алдартай', en: 'Most popular' },
      badgeClass: 'gold-badge',
      price: { mnt: 4600000, cny: null, usd: 1310 },
      days: 5, nights: 4,
      duration: { mn: '5 өдөр / 4 шөнө', en: '5 days / 4 nights' },
      tagline: {
        mn: '5 өдөр / 4 шөнө · Нислэг, буудал, хоол бүгд багтсан',
        en: '5 days / 4 nights · Flights, hotel and meals all included'
      },
      allIn: {
        mn: 'Бүх зардал үнэд багтсан — нэмэлт төлбөргүй',
        en: 'Everything included — nothing extra to pay'
      },
      hotel: { included: true, stars: 5, nights: 4 },
      flightIncluded: true,
      hasTests: true,
      // Компакт картад харагдах гол 4 мөр
      key: [
        { icon: '✈️', mn: '<strong>Нислэгийн тасалбар</strong> — очиж, буцах', en: '<strong>Return flight tickets</strong> — included' },
        { icon: '🏨', mn: '<strong>5 одтой зочид буудал</strong> · 4 шөнө', en: '<strong>5-star hotel</strong> · 4 nights' },
        { icon: '🏥', mn: '<strong>VIP эмнэлэг</strong> — 23 төрлийн шинжилгээ', en: '<strong>VIP medical checkup</strong> — 23 tests' },
        { icon: '🧑‍💼', mn: 'Хөтөч, орчуулагч, хоол, унаа, тасалбар — бүгд үнэд', en: 'Guide, interpreter, meals, transport, tickets' }
      ],
      includes: {
        mn: ['Нислэгийн тасалбар — очиж, буцах', '5 одтой зочид буудал · 4 шөнө', 'Унаа, тээвэр — хотын дотор бүрэн', 'Хөтөч + Монгол орчуулагч', 'Хоол — өдөр тутмын', 'Үзвэрийн бүх тасалбар', 'VIP эмнэлгийн үйлчилгээ — 23 төрлийн шинжилгээ'],
        en: ['Return flight tickets', '5-star hotel · 4 nights', 'All city transport', 'Guide + Mongolian interpreter', 'Daily meals', 'All entrance tickets', 'VIP medical service — 23 tests']
      },
      highlights: {
        mn: ['Цусны ерөнхий шинжилгээ', 'Цусны биохими — элэг, бөөр, чихэр', 'Зүрхний ЭКГ шинжилгээ', 'Уушгины рентген зураг', 'Хэт авиан шинжилгээ — элэг, бөөр, дотоод эрхтэн', 'Цусны даралт, биеийн жин, өндөр', 'Нүдний үзлэг', 'Хувийн сувилагч + Монгол орчуулагч', 'Шинжилгээний хариу Монгол + Англи хэлээр', 'Нисэх буудлаас угтах + буудалд хүргэх', 'Эмнэлгийн VIP тасагт өглөөний цайтай хонох'],
        en: ['Complete blood analysis', 'Blood biochemistry — liver, kidney, glucose', 'ECG — electrocardiogram', 'Chest X-ray', 'Ultrasound — liver, kidney, internal organs', 'Blood pressure, weight, height', 'Eye examination', 'Personal nurse + Mongolian interpreter', 'Results in Mongolian and English', 'Airport pickup and drop-off', 'Overnight in hospital VIP suite with breakfast']
      },
      desc: {
        mn: 'Шанхайн шилдэг VIP эмнэлэгт 23 төрлийн иж бүрэн шинжилгээ хийлгэж, хотын онцлох газруудаар аялах 5 өдрийн бүрэн аялал. Нислэг, 5 одтой буудал, хоол, унаа, үзвэрийн тасалбар бүгд үнэд багтсан.',
        en: 'A full 5-day trip: 23 comprehensive medical tests at Shanghai’s leading VIP hospital, plus the city’s highlights. Flights, 5-star hotel, meals, transport and entrance tickets are all included in the price.'
      },
      itinerary: ITIN_FULL,
      photoSets: ['hospital', 'city', 'zoo'],
      cardPhotos: [
        { src: '/img/health/Tower1.jpg', pos: 'center 15%', bg: 'linear-gradient(135deg,#0a1a3a,#1e3fa0)', icon: '🏙️', mn: 'Shanghai Tower · 632м', en: 'Shanghai Tower · 632m' },
        { src: '/img/health/Bund2.jpg', pos: '', bg: 'linear-gradient(135deg,#071e3d,#1a4fa8)', icon: '🌃', mn: 'The Bund · шөнийн гэрэлтэй', en: 'The Bund · Night Lights' },
        { src: '/img/health/pexels-tkirkgoz-15278918.jpg', pos: 'center 55%', bg: 'linear-gradient(135deg,#1a1a0a,#3a3a0a)', icon: '🐯', mn: 'Shanghai Zoo · цагаан бар', en: 'Shanghai Zoo · White Tiger' },
        { src: '/img/health/pexels-daniel-reynaga-337914704-35521663.jpg', pos: 'center 30%', bg: 'linear-gradient(135deg,#1a2a0a,#2a5a10)', icon: '🏮', mn: 'Yu Garden · хуучин хот', en: 'Yu Garden · Old City' }
      ],
      meta: {
        title: { mn: 'Шинжилгээ + Аялал багц — ₮4,600,000 · LFS Shanghai', en: 'Health + Travel Package — ₮4,600,000 · LFS Shanghai' },
        desc: {
          mn: 'Шанхайн VIP эмнэлэгт 23 төрлийн шинжилгээ + 5 өдрийн аялал. Нислэг, 5 одтой буудал, хоол, унаа бүгд үнэд багтсан. ₮4,600,000 / хүн.',
          en: '23 medical tests at Shanghai’s top VIP hospital plus a 5-day city tour. Flights, 5-star hotel, meals and transport included. ₮4,600,000 per person.'
        },
        image: '/img/health/Tower1.jpg'
      }
    },
    {
      id: 'basic',
      sku: 'LFS-BASIC',
      slug: 'basic-checkup',
      order: 2,
      active: true,
      featured: false,
      emoji: '🩺',
      name: { mn: 'Энгийн шинжилгээний багц', en: 'Basic Checkup Package' },
      badge: { mn: 'Энгийн багц', en: 'Basic checkup' },
      badgeClass: 'blue-badge',
      price: { mnt: 1899000, cny: null, usd: 539 },
      days: 1, nights: 0,
      duration: { mn: '1 өдөр', en: '1 day' },
      tagline: {
        mn: 'Зөвхөн суурь шинжилгээ · 1 өдөр · нислэг ороогүй',
        en: 'Basic checkup only · 1 day · flights not included'
      },
      allIn: null,
      hotel: { included: false, stars: null, nights: 0 },
      flightIncluded: false,
      hasTests: false,
      key: [
        { icon: '🏥', mn: 'Цус, биохими, ЭКГ, рентген, хэт авиан шинжилгээ', en: 'Blood, biochemistry, ECG, X-ray, ultrasound' },
        { icon: '👩‍⚕️', mn: 'Хувийн сувилагч + Монгол орчуулагч', en: 'Personal nurse + Mongolian interpreter' },
        { icon: '⚡', mn: 'Дараалалгүй — 2–3 цагт бүгд дуусна', en: 'No queues — everything done in 2–3 hours' },
        { icon: '📄', mn: 'Хариу мөн өдөртөө, Монгол + Англи хэлээр', en: 'Results the same day, in Mongolian and English' }
      ],
      includes: {
        mn: ['Цусны ерөнхий шинжилгээ', 'Цусны биохими — элэг, бөөр, чихэр', 'Зүрхний ЭКГ шинжилгээ', 'Уушгины рентген зураг', 'Хэт авиан шинжилгээ — элэг, бөөр, дотоод эрхтэн', 'Цусны даралт, биеийн жин, өндөр', 'Нүдний үзлэг', 'Хувийн сувилагч + Монгол орчуулагч', 'Шинжилгээний хариу Монгол + Англи хэлээр', 'Нисэх буудлаас угтах + буудалд хүргэх', 'Дараалалгүй — 2–3 цагт бүх шинжилгээ дуусна'],
        en: ['Complete blood analysis', 'Blood biochemistry — liver, kidney, glucose', 'ECG — electrocardiogram', 'Chest X-ray', 'Ultrasound — liver, kidney, internal organs', 'Blood pressure, weight, height', 'Eye examination', 'Personal nurse + Mongolian interpreter', 'Results in Mongolian and English', 'Airport pickup and drop-off', 'No queues — the full checkup takes 2–3 hours']
      },
      highlights: null,
      notIncluded: { mn: 'Нислэг ороогүй. Хот аялал ороогүй — зөвхөн шинжилгээний багц.', en: 'Flights not included. No sightseeing — this is a checkup-only package.' },
      desc: {
        mn: 'Шанхайн шилдэг VIP эмнэлэгт хувийн сувилагч, Монгол орчуулагчтай суурь шинжилгээгээ нэг өдөрт хийлгэнэ. Дараалалгүй, хариу мөн өдөртөө. Нислэг, аялал ороогүй — зөвхөн шинжилгээ.',
        en: 'A basic checkup at Shanghai’s leading VIP hospital in a single day, with a personal nurse and Mongolian interpreter. No queues, results the same day. Flights and sightseeing are not included — checkup only.'
      },
      itinerary: ITIN_BASIC,
      photoSets: ['hospital'],
      cardPhotos: [
        { src: '/img/health/hospital-reception.jpg', pos: '', bg: 'linear-gradient(135deg,#1055a0,#3d8ef0)', icon: '🏥', mn: '光明中医院 · Xinchang Branch · Shanghai', en: 'Guangming TCM Hospital · Xinchang Branch' }
      ],
      meta: {
        title: { mn: 'Энгийн шинжилгээний багц — ₮1,899,000 · LFS Shanghai', en: 'Basic Checkup Package — ₮1,899,000 · LFS Shanghai' },
        desc: {
          mn: 'Шанхайн VIP эмнэлэгт суурь шинжилгээ нэг өдөрт. Дараалалгүй, Монгол орчуулагч, хувийн сувилагчтай, хариу мөн өдөртөө. ₮1,899,000 / хүн.',
          en: 'A basic checkup at a Shanghai VIP hospital in a single day, with a Mongolian interpreter and personal nurse. Results the same day. ₮1,899,000 per person.'
        },
        image: '/img/health/hospital-reception.jpg'
      }
    },
    {
      id: 'travel',
      sku: 'LFS-TRAVEL',
      slug: 'travel-only',
      order: 3,
      active: true,
      featured: false,
      emoji: '🗺️',
      name: { mn: 'Зөвхөн аяллын багц', en: 'Travel Only Package' },
      badge: { mn: 'Шинэ', en: 'New' },
      badgeClass: 'green-badge',
      price: { mnt: 3200000, cny: null, usd: 910 },
      days: 5, nights: 4,
      duration: { mn: '5 өдөр / 4 шөнө', en: '5 days / 4 nights' },
      tagline: {
        mn: '5 өдөр / 4 шөнө · Нислэг, буудал, хоол бүгд багтсан · Disneyland',
        en: '5 days / 4 nights · Flights, hotel and meals included · Disneyland'
      },
      allIn: {
        mn: 'Бүх зардал үнэд багтсан — нэмэлт төлбөргүй',
        en: 'Everything included — nothing extra to pay'
      },
      hotel: { included: true, stars: 5, nights: 4 },
      flightIncluded: true,
      hasTests: false,
      key: [
        { icon: '✈️', mn: '<strong>Нислэгийн тасалбар</strong> — очиж, буцах', en: '<strong>Return flight tickets</strong> — included' },
        { icon: '🏨', mn: '<strong>5 одтой зочид буудал</strong> · 4 шөнө', en: '<strong>5-star hotel</strong> · 4 nights' },
        { icon: '🏰', mn: '<strong>Shanghai Disneyland</strong> — тасалбар үнэд', en: '<strong>Shanghai Disneyland</strong> — ticket included' },
        { icon: 'ℹ️', mn: 'Эрүүл мэндийн шинжилгээ <strong>ороогүй</strong>', en: 'Medical checkup <strong>not included</strong>' }
      ],
      includes: {
        mn: ['Нислэгийн тасалбар — очиж, буцах', '5 одтой зочид буудал · 4 шөнө', 'Унаа, тээвэр — хотын дотор бүрэн', 'Хөтөч + Монгол орчуулагч', 'Хоол — өдөр тутмын', 'Үзвэрийн бүх тасалбар (Disneyland орно)', 'Nanjing Road · The Bund · голоор завиар · Shanghai Tower', 'Shanghai Disneyland · Luxury буфет · Yu Garden', 'Xintiandi · Louis Vuitton · Starbucks үйлдвэр', '24/7 Монгол хэлээр дэмжлэг'],
        en: ['Return flight tickets', '5-star hotel · 4 nights', 'All city transport', 'Guide + Mongolian interpreter', 'Daily meals', 'All entrance tickets (Disneyland included)', 'Nanjing Road · The Bund · river cruise · Shanghai Tower', 'Shanghai Disneyland · luxury buffet · Yu Garden', 'Xintiandi · Louis Vuitton · Starbucks Roastery', '24/7 support in Mongolian']
      },
      highlights: null,
      notIncluded: {
        mn: 'Эрүүл мэндийн шинжилгээ ороогүй. Шинжилгээ хийлгэхийг хүсвэл Шинжилгээ + Аялал багцыг сонгоно уу.',
        en: 'No medical checkup. Choose the Health + Travel Package if you want the checkup.'
      },
      desc: {
        mn: 'Шинжилгээ + Аялал багцтай яг ижил аялал — нислэг, 5 одтой буудал, хоол, унаа, үзвэрийн тасалбар бүгд үнэд багтсан. Ялгаа нь: эрүүл мэндийн шинжилгээ ороогүй, харин амьтны хүрээлэнгийн оронд Shanghai Disneyland орсон.',
        en: 'The same trip as the Health + Travel Package — flights, 5-star hotel, meals, transport and entrance tickets all included. The differences: no medical checkup, and Shanghai Disneyland replaces the zoo day.'
      },
      itinerary: ITIN_TRAVEL,
      photoSets: ['city'],
      cardPhotos: [
        { src: '/img/health/pexels-zydeaosika-2261055-4139229.jpg', pos: '', bg: 'linear-gradient(135deg,#1a0a2a,#4a0a6a)', icon: '🌟', mn: 'Nanjing Road · шөнийн гэрэл', en: 'Nanjing Road · Night Lights' },
        { src: '/img/health/Bund2.jpg', pos: '', bg: 'linear-gradient(135deg,#071e3d,#1a4fa8)', icon: '🌃', mn: 'The Bund · шөнийн гэрэлтэй', en: 'The Bund · Night Lights' },
        { src: '/img/health/pexels-anderson-wei-2151965849-34647784.jpg', pos: '', bg: 'linear-gradient(135deg,#1a2a1a,#2a5a2a)', icon: '🛍️', mn: 'Xintiandi · The Hub', en: 'Xintiandi · The Hub' },
        { src: '/img/health/pexels-nazmiazmir-33826186.jpg', pos: '', bg: 'linear-gradient(135deg,#0a1a0a,#1a3a1a)', icon: '☕', mn: 'Starbucks Roastery', en: 'Starbucks Roastery' }
      ],
      meta: {
        title: { mn: 'Зөвхөн аяллын багц — ₮3,200,000 · LFS Shanghai', en: 'Travel Only Package — ₮3,200,000 · LFS Shanghai' },
        desc: {
          mn: 'Шанхайд 5 өдөр 4 шөнө — нислэг, 5 одтой буудал, хоол, Disneyland тасалбар бүгд багтсан. Эрүүл мэндийн шинжилгээгүй. ₮3,200,000 / хүн.',
          en: '5 days and 4 nights in Shanghai — flights, 5-star hotel, meals and a Disneyland ticket all included. No medical checkup. ₮3,200,000 per person.'
        },
        image: '/img/health/Bund2.jpg'
      }
    }
  ];

  // Хуучин линк эвдрэхгүй байх alias
  var ALIAS = { altan: 'full', gold: 'full', mungun: 'basic', silver: 'basic' };

  function byId(id) {
    var key = ALIAS[id] || id;
    for (var i = 0; i < PACKAGES.length; i++) if (PACKAGES[i].id === key) return PACKAGES[i];
    return null;
  }

  function priceLabel(p) {
    return '₮' + p.price.mnt.toLocaleString('en-US');
  }

  function testCount() {
    return TEST_GROUPS.reduce(function (n, g) { return n + g.items.length; }, 0);
  }

  return {
    PACKAGES: PACKAGES,
    PRICE_VALID_UNTIL: PRICE_VALID_UNTIL,
    TEST_GROUPS: TEST_GROUPS,
    ADDON_TESTS: ADDON_TESTS,
    PHOTOS: PHOTOS,
    ALIAS: ALIAS,
    byId: byId,
    priceLabel: priceLabel,
    testCount: testCount
  };
});
