// LFS Shanghai — Place Database
// 98+ Shanghai places, organized by category
// Updated: 2026-05-17 | Source: trip.com + LFS local knowledge

window.CATEGORIES = [
  { id:'all',      label:'Бүгд',          icon:'🗺' },
  { id:'culture',  label:'Үзэх ёстой',    icon:'🏛' },
  { id:'hidden',   label:'Нуугдмал',      icon:'💎' },
  { id:'museum',   label:'Музей & Урлаг', icon:'🖼' },
  { id:'temple',   label:'Сүм & Шашин',   icon:'⛩' },
  { id:'shopping', label:'Шоппинг',       icon:'🛍' },
  { id:'food',     label:'Хоол & Кафе',   icon:'🍜' },
  { id:'relax',    label:'Амрах & Парк',  icon:'🌿' },
  { id:'night',    label:'Шөнийн амьдрал',icon:'🌙' },
  { id:'daytrip',  label:'Өдрийн аялал',  icon:'🚌' },
];

window.PLACES = [

  // ══════════════════════════════════════════════
  // 🏛  ҮЗЭХ ЁСТОЙ — Must-See Attractions
  // ══════════════════════════════════════════════
  {
    id:'bund', name:'The Bund', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌆', bg:'linear-gradient(135deg,#1a1a2e,#16213e)',
    metro:'Line 2/10 · East Nanjing Rd · Exit 3', cost:0, costLabel:'Үнэгүй',
    time:'1–3 цаг', rating:'4.8', reviews:'157,400',
    desc:'Шанхайн хамгийн алдартай газар. 1.6 км явган зам, колониал барилга, Пудунгийн панорама.',
    lfs:'LFS: 20:00-аас очвол гэрэлт үзэмж хамгийн сайн. Завиар аялал ¥35-аас.',
    arrivalGuide:[
      '🚇 East Nanjing Road буудал, Exit 3-аар гарна',
      '🚶 Зүүн зүгт The Bund тэмдэгийг дагаж ~800м алхана (10 мин)',
      '🌊 Хуанпу мөрний эрэгт хүрч, хойш (зүүн тийш) явган зам эхэлнэ',
      '📸 Хамгийн сайн зураг: Бүндийн хойд хэсэгт нарны жаргалт / шөнийн гэрлийн үед',
      '⚠️ Оройн 20:00–22:00 хамгийн дүүрэн — хурдан явж байгаарай'
    ],
    tags:['culture','photo','night','budget']
  },
  {
    id:'oriental_pearl', name:'Oriental Pearl Tower', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1506158669146-619067262a00?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🔴', bg:'linear-gradient(135deg,#7b0000,#c0392b)',
    metro:'Line 2 · Lujiazui · Exit 1', cost:210, costLabel:'¥150–210',
    time:'1–2 цаг', rating:'4.7', reviews:'176,800',
    desc:'468м өндөр Шанхайн тэмдэгт цамхаг. Тунгалаг ажиглалтын зам, Sky Walk, 360° панорама.',
    lfs:'LFS: Нарны жаргалтаас 30 мин өмнө орвол шилжилтийн гэрлийг харна.',
    arrivalGuide:[
      '🚇 Lujiazui буудал, Exit 1-ээр гарна',
      '🔴 Гарснаасаа Oriental Pearl Tower шууд харагдана (~300м)',
      '🚶 Луцзяцуйн дугуй талбай дагуж баруун тийш алхана (5 мин)',
      '🎫 1-р давхарт тасалбар авах лааны орно — онлайн захиалга байвал 2-р давхарт шууд орно',
      '💡 Sky Walk (тунгалаг ажиглалт) ¥30 нэмэлт — урьдчилан шийдэж явна уу'
    ],
    tags:['culture','photo','night']
  },
  {
    id:'yu_garden', name:'Yu Garden', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1645490431810-08d8e3c59e17?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏯', bg:'linear-gradient(135deg,#2d5a27,#4a7c59)',
    metro:'Line 10/14 · Yuyuan · Exit 1', cost:40, costLabel:'¥40 (оргил) / ¥30 (чөлөөт)',
    time:'1–2 цаг', rating:'4.7', reviews:'53,600',
    desc:'1559 оны Мин гүрний уламжлалт цэцэрлэг. 2 га талбайд дэнж, цөөрөм, чулуун хашлага.',
    lfs:'LFS: Өглөө 09:00 хүртэл хүн цөөн. WeChat-аар онлайн захиалга хийвэл дараалалгүй орно.',
    arrivalGuide:[
      '🚇 Yuyuan буудал (Line 10 эсвэл Line 14), Exit 1-ээр гарна',
      '🚶 Fuyou Road дагуж зүүн тийш ~200м алхана (3 мин)',
      '🌉 Zig-zag гүүр (九曲桥) харагдана — энэ л орох зам',
      '🎫 Орох хаалга зүүн талд, тасалбар авах зогсоолд зог',
      '⏰ Нээлтийн цаг: 08:30–17:00 (сүүлийн орох 16:30)',
      '📱 WeChat дээр "豫园" гэж хайгаад урьдчилан тасалбар авбал хурдан'
    ],
    tags:['culture','tradition','family']
  },
  {
    id:'shanghai_tower', name:'Shanghai Tower', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1574504500022-de9a6309a501?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🗼', bg:'linear-gradient(135deg,#0a0a2e,#1a1a5e)',
    metro:'Line 2 · Lujiazui · Exit 6', cost:180, costLabel:'¥120–180',
    time:'1–2 цаг', rating:'4.8', reviews:'45,000',
    desc:'Дэлхийн 2-р өндөр барилга (632м). 128-р давхарт ажиглалтын тавцан. Лифт 55 секундэд.',
    lfs:'LFS: Өглөө 09:00–11:00 дараалал бага. Орой нарны жаргалтаас 1 цаг өмнө очвол.',
    arrivalGuide:[
      '🚇 Lujiazui буудал, Exit 6-аар гарна — Shanghai Tower-тай шууд underground холбоотой',
      '🏙 Гарснаасаа Shanghai Tower-ийн B1 давхарт байна',
      '🎫 2-р давхарт тасалбар авах лааны орно (онлайн захиалга байвал хурдан)',
      '⏫ Дэлхийн хамгийн хурдан лифт — 55 секундэд 128-р давхарт хүргэнэ',
      '📱 Урьдчилан: trip.com эсвэл official сайтаас тасалбар захиал'
    ],
    tags:['culture','photo','night']
  },
  {
    id:'jin_mao', name:'Jin Mao Tower', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1614221330834-9399e5631af3?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'✨', bg:'linear-gradient(135deg,#1a3a00,#2e6f00)',
    metro:'Line 2 · Lujiazui · Exit 3', cost:120, costLabel:'¥120',
    time:'1 цаг', rating:'4.6', reviews:'28,000',
    desc:'88 давхар алтан цамхаг. 88-р давхарт ажиглалтын тавцан — Shanghai Tower, SWFC-тэй зэрэгцэн.',
    lfs:'LFS: Луцзяцуйн 3 цамхагийг зэрэг харахын тулд эхлээд Jin Mao-д гар.',
    arrivalGuide:[
      '🚇 Lujiazui буудал, Exit 3-аар гарна',
      '🚶 Shanghai Tower-ийн баруун талд байх алтан цамхаг — ~200м',
      '🎫 Гол хаалгаар орж 1-р давхарт тасалбар авна (¥120)',
      '⏫ Лифтээр 88-р давхарт — 3 цамхагийн дунд ажиглалтын тавцан',
      '⏰ Өдөр бүр 08:30–21:00 нээлттэй'
    ],
    tags:['culture','photo']
  },
  {
    id:'swfc', name:'Shanghai World Financial Center', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1535356795203-50b2eb73f96c?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏙', bg:'linear-gradient(135deg,#002244,#004488)',
    metro:'Line 2 · Lujiazui · Exit 6', cost:180, costLabel:'¥100–180',
    time:'1 цаг', rating:'4.6', reviews:'22,000',
    desc:'"Лааз нээгч" хэлбэртэй 492м цамхаг. 100-р давхарт шилэн ажиглалтын тавцан.',
    lfs:'LFS: Орой 21:00-ийн өмнө очвол Бүндийн гэрэл хоёуланд харагдана.',
    arrivalGuide:[
      '🚇 Lujiazui буудал, Exit 6-аар гарна (Shanghai Tower-тай ижил гарц)',
      '🚶 Exit 6-аас зүүн тийш ~100м — SWFC-ийн үүдэнд хүрнэ',
      '🎫 1-р давхарт тасалбар авна: 94F (¥100) эсвэл 100F Sky Walk (¥180)',
      '🪟 100-р давхарт шилэн ажиглалтын тавцан — гишгэхэд дороо хот харагдана',
      '⏰ Өдөр бүр 08:00–22:00 нээлттэй'
    ],
    tags:['culture','photo']
  },
  {
    id:'nanjing_road', name:'Nanjing Road (East)', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1506158278516-d720e72406fc?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🚶', bg:'linear-gradient(135deg,#8b0000,#dc143c)',
    metro:'Line 2/10 · East Nanjing Rd · Exit 1', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.5', reviews:'85,000',
    desc:'Дэлхийн хамгийн завгүй явган тэрэгний зам. 1.2 км урт хөлөг дэлгүүр, брэнд, хоолны газар.',
    lfs:'LFS: Шөнийн гэрэл их тод. People\'s Square-аас Бүнд хүртэл алхаарай.',
    arrivalGuide:[
      '🚇 East Nanjing Road буудал, Exit 1-ээр гарна',
      '🛍 Явган тэрэгний зам шууд эхэлнэ — баруун тийш People\'s Square, зүүн тийш Бүнд',
      '🚶 Бүнд хүртэл алхвал ~15 мин (1.2 км)',
      '⚡ Орой 19:00–22:00 хамгийн гэрэлтэй, хамгийн завгүй цаг'
    ],
    tags:['culture','shopping','night']
  },
  {
    id:'peoples_square', name:"People's Square", cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏛', bg:'linear-gradient(135deg,#1565c0,#1e88e5)',
    metro:"Line 1/2/8 · People's Square · Exit 1", cost:0, costLabel:'Үнэгүй',
    time:'1 цаг', rating:'4.5', reviews:'40,000',
    desc:'Хотын гол цэг. Шанхайн музей, урлагийн музей, хот төлөвлөлтийн үзэсгэлэн нэг дор.',
    lfs:'LFS: Амралтын өдөр "гэрлэлтийн зах" — зочин хүүхдийн намтрыг харуулдаг.',
    arrivalGuide:[
      "🚇 People's Square буудал, Exit 1-ээр гарна",
      '🏛 Гарснаасаа өмнө зүгт Shanghai Museum харагдана (талбайн өмнөд хэсэг)',
      '🌳 Талбайгаар алхаж People\'s Park-руу орж болно (баруун хэсэг)',
      '🏙 Urban Planning Museum: Exit 1-ээс зүүн тийш 3 мин'
    ],
    tags:['culture','budget']
  },
  {
    id:'lujiazui', name:'Lujiazui Financial District', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1612756336279-b9eb5b6b71d9?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌃', bg:'linear-gradient(135deg,#0d1117,#1f2937)',
    metro:'Line 2 · Lujiazui · Exit 1', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.8', reviews:'60,000',
    desc:'Шанхай цамхаг, SWFC, Jin Mao гурав зэрэгцэн оршдог дэлхийн хамгийн гайхалтай цамхаг бүлэг.',
    lfs:'LFS: Бүндээс харалдаа. Шөнийн гэрэлтийн үед хамгийн сайн зураг авагдана.',
    arrivalGuide:[
      '🚇 Lujiazui буудал, Exit 1-ээр гарна',
      '🌃 Гарснаасаа гурван цамхаг харагдана — Shanghai Tower (хамгийн өндөр, мушгиасан), SWFC (лааз нээгч), Jin Mao (алтан)',
      '🚶 Луцзяцуйн дугуй зам дагуж тойрон алхвал бүх цамхгийн урд зогсож зураг авч болно',
      '🌊 Бүнд харалдааны эрэгт хүрэхийн тулд Lujiazui Rd дагуж ~15 мин алхана'
    ],
    tags:['culture','photo','night']
  },
  {
    id:'former_french', name:'Former French Concession', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1523281855495-b46cf55b1e7e?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌸', bg:'linear-gradient(135deg,#4a0e4e,#7b2d8b)',
    metro:'Line 1 · Hengshan Road / Changshu Road', cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.7', reviews:'35,000',
    desc:'Колониал барилга, мод бүхий гудамж, кофе шоп, бутик дэлгүүр. Шанхайн хамгийн романтик хэсэг.',
    lfs:'LFS: Wukang Road, Anfu Road, Xinhua Road — гурвыг нийлүүлж алхаарай.',
    arrivalGuide:[
      '🚇 Line 1 Hengshan Road буудал эсвэл Changshu Road буудалд буун гарна',
      '🚶 Changshu Road Exit 1-ээс хойш алхаад Wukang Road руу баруун эргэнэ (~5 мин)',
      '📸 Wukang Mansion (нум барилга) Wukang Road-ын хойд үзүүрт — хамгийн алдартай цэг',
      '🚶 Wukang Road дагуж өмнө зүгт алхаад Anfu Road-тай огтлолцоход зүүн тийш эргэнэ',
      '☕ Anfu Road дагуж кофе шоп, бутик дэлгүүрүүдийг тойрч алхана (~30-40 мин)',
      '⚠️ Өглөө 10:00-аас өмнө очвол хүн цөөн, зураг авхад тохиромжтой'
    ],
    tags:['culture','photo','food','relax']
  },
  {
    id:'huangpu_river', name:'Huangpu River Cruise', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1508742066636-3b9fb738ee0e?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🚢', bg:'linear-gradient(135deg,#00305a,#005a99)',
    metro:'Line 2/10 · East Nanjing Rd · Exit 3', cost:100, costLabel:'¥100–220',
    time:'1–2 цаг', rating:'4.6', reviews:'18,000',
    desc:'Хуанпу мөрнөөс Бүнд болон Пудунгийн тэнгэр багалзуурыг далайн аялалаар үзнэ.',
    lfs:'LFS: 19:00-ийн аялал хамгийн гайхалтай. 1 цагийн аялал хамгийн алдартай.',
    arrivalGuide:[
      '🚇 East Nanjing Road буудал, Exit 3-аар гарна',
      '🚶 Бүнд рүү алхаад Shiliupu Wharf (十六铺码头) хайна — Бүндийн өмнөд хэсэг',
      '🚢 Тасалбар авах зогсоол буудлын дэргэд — 1 цаг / 2 цагийн аялал сонгоно',
      '🌃 19:00-ийн аялалд заавал урьдчилан захиалах — онлайн эсвэл буудал дээр'
    ],
    tags:['culture','photo','night']
  },
  {
    id:'shanghai_disneyland', name:'Shanghai Disneyland', cat:'culture', catLabel:'Үзэх ёстой',
    img:'https://images.unsplash.com/photo-1616680687799-ea36d6fb2173?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏰', bg:'linear-gradient(135deg,#1a0050,#4b0082)',
    metro:'Line 11 · Disney Resort', cost:475, costLabel:'¥475–779',
    time:'8–12 цаг', rating:'4.7', reviews:'120,000',
    desc:'Азийн хамгийн орчин үеийн Disney парк. Pirates of Caribbean, TRON, Star Wars rides.',
    lfs:'LFS: Даваа–Лхагва хүн цөөн. Дэлхийн хамгийн урт TRON ride-д 2+ цаг дараалал.',
    arrivalGuide:[
      '🚇 Line 11 Disney Resort буудалд буун гарна (хотын төвөөс ~40 мин)',
      '🚶 Exit 1-ээс Disney Town болон тасалбарын танхимын тэмдэгийг дагана (~5 мин алхаа)',
      '🎫 Тасалбар: trip.com эсвэл Disneyland апп-аас урьдчилан захиалах нь зайлшгүй',
      '📱 Shanghai Disney Resort апп дотор ride wait time, FastPass байдаг — заавал татаж авна',
      '⏰ Нэг өдрийн тасалбар ¥475–779; парк 09:00–21:00 нээлттэй',
      '⚠️ TRON, Pirates дараалал урт — эрт очиж эхлэхийг зөвлөнө (09:00-д хаалга нэмэлт)'
    ],
    tags:['culture','family']
  },

  // ══════════════════════════════════════════════
  // 💎  НУУГДМАЛ ГАЗАР — Hidden Gems & Local Favorites
  // ══════════════════════════════════════════════
  {
    id:'tianzifang', name:'Tianzifang', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1567762694593-134db1c4f131?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🎨', bg:'linear-gradient(135deg,#4a235a,#7d3c98)',
    metro:'Line 9 · Dapuqiao · Exit 1', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.6', reviews:'25,000',
    desc:'1930-иад оны шикүмэн гудамж дотор урлаг, дизайны хороолол. Кофе шоп, гараар хийсэн бараа.',
    lfs:'LFS: Ажлын өдрийн өглөө хамгийн хүнгүй. Уур амьсгалаар Тяньцзыфан = жинхэнэ шанхай.',
    arrivalGuide:[
      '🚇 Dapuqiao буудал, Exit 1-ээр гарна',
      '🚶 Гарснаасаа шууд урд зүгт Taikang Road харагдана (~100м)',
      '🎨 Taikang Road 210 хаяг — Tianzifang-ийн гол орох хаалга',
      '🌀 Нарийн гудамжаар орж гарахад 30–40 мин хангалттай',
      '☕ Гадна талын кофе шопуудын үнэ илүү боломжийн байна'
    ],
    tags:['hidden','photo','shopping','budget']
  },
  {
    id:'m50', name:'M50 Creative Park', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🖼', bg:'linear-gradient(135deg,#1a3a4a,#2e6f8e)',
    metro:'Line 13 · Jiangning Road · Exit 1', cost:0, costLabel:'Үнэгүй',
    time:'1–3 цаг', rating:'4.5', reviews:'15,000',
    desc:'Хуучин нэхмэлийн үйлдвэрт 100+ орчин үеийн урлагийн галерей. ShanghART болон бусад.',
    lfs:'LFS: Сана гараг–Бямба 10:00–17:00 нээлттэй. Сучжоу голын эрэгт алхаарай.',
    arrivalGuide:[
      '🚇 Jiangning Road буудал, Exit 1-ээр гарна',
      '🚶 Сучжоу голын эрэгт хойш алхана (~400м, 5 мин)',
      '🏭 50 Moganshan Road хаяг — том төмөр хаалга',
      '🖼 Доторх галерейнүүд ихэвчлэн үнэгүй, зарим нь ¥10–30',
      '⏰ Мягмар–Ням 10:00–18:00, Даваа гараг хаалттай'
    ],
    tags:['hidden','photo','budget']
  },
  {
    id:'wukang_road', name:'Wukang Road', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1531969112524-ac37343c7941?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌸', bg:'linear-gradient(135deg,#6a1b9a,#9c27b0)',
    metro:'Line 11 · Jiaotong University · Exit 7', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.7', reviews:'8,000',
    desc:'1920-иад оны колониал барилга бүхий гудамж. Тренди кофе, нарийн боов, бутик дэлгүүр.',
    lfs:'LFS: Wukang Mansion урд хэсэг хамгийн Instagram-able. Өглөө 10:00 хүртэл хүнгүй.',
    arrivalGuide:[
      '🚇 Jiaotong University буудал, Exit 7-аар гарна',
      '🚶 Wukang Road руу хойш ~5 мин алхана',
      '🏛 Wukang Mansion (нум хэлбэрийн барилга) харагдана — энэ л хамгийн алдартай цэг',
      '📸 Mansion урдаас зургаа авахад завгүй байна — эрт очих нь зохимжтой',
      '☕ Тойрч алхаад кофе шопуудаар ор — Ferguson Lane ойролцоо'
    ],
    tags:['hidden','photo','food']
  },
  {
    id:'fuxing_park', name:'Fuxing Park', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1645526629357-16bbd762c8d5?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌿', bg:'linear-gradient(135deg,#1b5e20,#2e7d32)',
    metro:'Line 10/13 · Xintiandi · Exit 1', cost:0, costLabel:'Үнэгүй',
    time:'30–60 мин', rating:'4.6', reviews:'10,000',
    desc:'Францын хэв маягийн хуучин цэцэрлэг. Өглөөний тай чи, маажонг. Орон нутгийн амьдрал.',
    lfs:'LFS: 06:00–09:00 орон нутгийн тай чи харахад хамгийн сайн. Xintiandитай нийлүүл.',
    arrivalGuide:[
      '🚇 Xintiandi буудал, Exit 1-ээр гарна',
      '🚶 Хойш Fuxing Road дагуж ~5 мин алхана',
      '🌿 Цэцэрлэгийн хаалга Gaolan Road дагуу байна',
      '🧘 Өглөө 06:00–09:00 тай чи, маажонг тоглоог нь харах боломжтой',
      '⏰ Өдөр бүр 06:00–18:00 нээлттэй, үнэгүй'
    ],
    tags:['hidden','relax','budget']
  },
  {
    id:'sinan_mansions', name:'Sinan Mansions', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1618933198854-ee406476827c?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏚', bg:'linear-gradient(135deg,#3e2723,#6d4c41)',
    metro:'Line 10/13 · Xintiandi', cost:0, costLabel:'Үнэгүй',
    time:'1 цаг', rating:'4.5', reviews:'5,000',
    desc:'1920-иад оны хуучин чулуун байшингуудыг сэргээсэн нийтийн хороолол. Ресторан, кофе, бутик.',
    lfs:'LFS: Tianzifang-аас 10 мин алхна. Sun Yat-sen-ий хуучин орон сууц бас байдаг.',
    arrivalGuide:[
      '🚇 Line 10 эсвэл Line 13 Xintiandi буудал, Exit 6-аар гарна',
      '🚶 Xintiandi-аас Sinan Road руу өмнө зүгт ~5 мин алхана',
      '🏚 Sinan Road 45–65 хаяг — 1920-иад оны сэргээгдсэн байшингийн цогцолбор',
      '☕ Ресторан, кофе шопуудаас аль нэгийг сонгож амарч болно',
      '⚠️ Sun Yat-sen-ий хуучин орон сууц (Sinan Road 7) ойролцоо — үнэгүй орж болно'
    ],
    tags:['hidden','culture','food']
  },
  {
    id:'1933_millfun', name:'1933 Old Millfun', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1563678041155-ddb6ca6296af?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏭', bg:'linear-gradient(135deg,#263238,#37474f)',
    metro:'Line 4 · Dalian Road', cost:0, costLabel:'Үнэгүй',
    time:'1 цаг', rating:'4.4', reviews:'6,000',
    desc:'1933 оны хуучин мал нядалгааны байрыг уран бүтээлийн кластер болгосон. Бетон архитектур өвөрмөц.',
    lfs:'LFS: Инстаграмт архитектур. Хоол, соёлын арга хэмжээ ихтэй. Бямба шөнийн зах.',
    arrivalGuide:[
      '🚇 Line 4 Dalian Road буудал, Exit 1-ээр гарна',
      '🚶 Dalian Road дагуж өмнө зүгт ~500м алхана (6–7 мин)',
      '🏭 1933 Old Millfun: Shajing Road 10 хаяг — том бетон барилга',
      '📸 Доторх гарам, хонгил, тойрог хэлбэрийн бетон архитектур — зураг авахад гайхалтай',
      '⏰ Өдөр бүр 10:00–22:00 нээлттэй, оролт үнэгүй'
    ],
    tags:['hidden','photo']
  },
  {
    id:'duolun_road', name:'Duolun Road Cultural Street', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1617550702778-ac78537dd90a?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'📚', bg:'linear-gradient(135deg,#1a237e,#283593)',
    metro:'Line 3/8 · Hongkou Football Stadium', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.4', reviews:'4,000',
    desc:'Мэдрэмжтэй хуучин Хонгко хэсэг. Антик дэлгүүр, хуучин номын газар, 1930-иад оны архитектур.',
    lfs:'LFS: Lu Xun Museum ойролцоо. Жинхэнэ хуучин Шанхайн уур амьсгал.',
    arrivalGuide:[
      '🚇 Line 3 эсвэл Line 8 Hongkou Football Stadium буудал, Exit 2-аар гарна',
      '🚶 Sichuan North Road дагуж хойш ~5 мин алхана',
      '📚 Duolun Road-ын орох хаалга харагдана — хэлтэрхий бронзон дүр бүхий гудамж',
      '🏛 Гудамжаар алхахдаа антик дэлгүүр, Lu Xun Museum-ийг тойрно',
      '⏰ Гудамж үргэлж нээлттэй; Lu Xun Museum Мяг–Ням 09:00–17:00'
    ],
    tags:['hidden','culture','budget']
  },
  {
    id:'qibao', name:'Qibao Ancient Town', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1602997009277-72a4121380ac?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏘', bg:'linear-gradient(135deg,#5d4037,#8d6e63)',
    metro:'Line 9 · Qibao', cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.5', reviews:'30,000',
    desc:'1000 жилийн настай жижиг хот. Уламжлалт хоол, гар урлал, цайны газар. Метроор 30 мин.',
    lfs:'LFS: Metro 9-р шугам Qibao буудалд. Тулар наадмаар очих бол хүн их байна.',
    arrivalGuide:[
      '🚇 Line 9 Qibao буудал, Exit 2-аар гарна',
      '🚶 Буудлаас өмнө зүгт ~300м алхахад хуучин хот хаалга харагдана',
      '🏘 Qibao Old Street-ийн гол гудамжаар орж суваг, гүүрнүүдийг дагаж алхана',
      '🍢 Уламжлалт хоолны лааз хоёр талдаа олон — шарсан тофу, чихэрлэг боов амтатай',
      '⏰ Өдөр бүр 09:00–17:30 нээлттэй; хотын төвөөс ~30 мин'
    ],
    tags:['hidden','tradition','food','family']
  },
  {
    id:'zhujiajiao', name:'Zhujiajiao Ancient Town', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1648530040338-c977397965ea?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'⛵', bg:'linear-gradient(135deg,#006064,#0097a7)',
    metro:'Line 17 · Zhujiajiao + автобус', cost:0, costLabel:'Үнэгүй · завь ¥20–60',
    time:'3–4 цаг', rating:'4.6', reviews:'43,000',
    desc:'Хотоос 42км, Мин-Чин гүрний сувагт усны эртний хот. Чулуун гүүр, цайны газар, завь.',
    lfs:'LFS: Өглөө 09:00-д очвол хүнгүй. LFS тусгай аялал зохицуулна.',
    arrivalGuide:[
      '🚇 Line 17 Zhujiajiao буудал, Exit 1-ээр гарна (хотын төвөөс ~1 цаг)',
      '🚶 Буудлаас хуучин хот хүртэл явган эсвэл тур бус (~10 мин, ¥5)',
      '🎫 Оролтын тасалбар: ¥80 (үндсэн газрууд оролцсон) эсвэл ¥20–60 завиар аялах нэмэлт',
      '⛵ Суваг дагуух завин аялал ¥20–60 — хамгийн сайн туршлага',
      '⏰ Өдөр бүр 08:30–17:30 нээлттэй',
      '⚠️ Амралтын өдрүүд маш дүүрэн — ажлын өдрийн өглөө очих нь зохимжтой'
    ],
    tags:['hidden','tradition','photo','relax']
  },
  {
    id:'chongming', name:'Chongming Island', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1550590947-302613e51d1a?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌾', bg:'linear-gradient(135deg,#33691e,#558b2f)',
    metro:'Metro + Tunnel Bus', cost:0, costLabel:'Ойролцоо ¥50',
    time:'Бүтэн өдөр', rating:'4.4', reviews:'12,000',
    desc:'Шанхайн хамгийн том арал. Байгалийн нөөц газар, шувуудын аялал, ногоон тариалан.',
    lfs:'LFS: Хотоос 1.5 цаг. Байгаль хайрладаг, амрахыг хүсэгчдэд зориулсан.',
    arrivalGuide:[
      '🚇 Metro Line 3 эсвэл Line 6-р Bao\'an Highway буудалд хүрнэ',
      '🚌 Буудлын ойролцоох автобусны зогсоолоос Tunnel Bus No.1 (¥9) сууна',
      '🌾 Автобус Чансин мөрний туннелиар дамжиж Chongming Island-д буулгана (~1.5 цаг нийт)',
      '🚲 Арлын дотор дугуй хөлслөх нь хамгийн тохиромжтой (~¥30–50/өдөр)',
      '⏰ Бүтэн өдрийн аялалд зориулж өглөө эрт хөдлөх нь зохимжтой'
    ],
    tags:['hidden','relax','daytrip']
  },
  {
    id:'anfu_road', name:'Anfu Road Café Street', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1517309230475-6736d926b979?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'☕', bg:'linear-gradient(135deg,#4e342e,#6d4c41)',
    metro:'Line 1 · Changshu Road', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.6', reviews:'7,000',
    desc:'Шанхайн хамгийн тренди кофе гудамж. Indie кофе шоп, авто ном дэлгүүр, ногоон мод.',
    lfs:'LFS: Өглөөний кофенд хамгийн сайн. Орон нутгийн залуучуудын дуртай хороолол.',
    arrivalGuide:[
      '🚇 Line 1 Changshu Road буудал, Exit 1-ээр гарна',
      '🚶 Changshu Road дагуж хойш ~2 мин алхаад Anfu Road-тай огтлолцох газарт зүүн тийш эргэнэ',
      '☕ Anfu Road дагуж явахад хоёр талдаа indie кофе шоп, номын дэлгүүр, бутик байна',
      '📚 Pop-up номын дэлгүүр болон жижиг галерейнүүд байнга шинэ нэгэн нэмэгддэг',
      '⏰ Кофе шопууд ихэвчлэн 08:00–22:00 нээлттэй'
    ],
    tags:['hidden','food','photo']
  },
  {
    id:'south_bund', name:'South Bund & Cool Docks', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏗', bg:'linear-gradient(135deg,#1a1a2e,#2d2d5e)',
    metro:'Line 4 · Nanpu Bridge', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.5', reviews:'8,000',
    desc:'Хуучин агуулахыг ресторан, кофе болгосон. Бүнд шиг шуугиантай биш, тайван уур амьсгал.',
    lfs:'LFS: Шөнийн цагт Бүнд ба Пудун хоёулаа харагдана. Хүнгүй Бүнд гэж бодоод.',
    arrivalGuide:[
      '🚇 Line 4 Nanpu Bridge буудал, Exit 1-ээр гарна',
      '🚶 Зүүн тийш мөрний эрэг рүү ~5 мин алхана — Cool Docks хаалга харагдана',
      '🏗 Cool Docks: Zhongshan South Road 479 хаяг — хуучин агуулахын цогцолбор',
      '🌉 Мөрний эрэгт гарахад Бүнд, Пудунгийн тэнгэр баалзуур хоёулаа харагдана',
      '⏰ Ресторан, барууд ихэвчлэн 11:00–24:00 нээлттэй'
    ],
    tags:['hidden','photo','night','food']
  },
  {
    id:'east_bund', name:'East Bund (Mingzhu Ring Road)', cat:'hidden', catLabel:'Нуугдмал газар',
    img:'https://images.unsplash.com/photo-1627484986972-e544190b8abb?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌉', bg:'linear-gradient(135deg,#0a2340,#1a4080)',
    metro:'Line 6 · Yuanshen Road', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.5', reviews:'5,000',
    desc:'Пудунгийн шинэ урлагийн дүүрэг. Хуанпу мөрний зүүн эрэгт орчин үеийн уран барилга.',
    lfs:'LFS: 2023 онд нэгдсэн шинэ газар. Long Museum East Bund зөвхөн энд.',
    arrivalGuide:[
      '🚇 Line 6 Yuanshen Road буудал, Exit 1-ээр гарна; эсвэл Line 14 Yunjin Road буудал',
      '🚶 Буудлаас Huangpu мөрний эрэг рүү ~10 мин алхана',
      '🌉 East Bund урлагийн кластер: Binjiang Avenue дагуу мөрний эрэгт байна',
      '🖼 Long Museum East Bund, Shanghai International Arts Festival Theatre ойролцоо',
      '⏰ Гадна эрэгний зам үргэлж нээлттэй; Long Museum Мяг–Ням 10:00–18:00'
    ],
    tags:['hidden','museum','photo']
  },

  // ══════════════════════════════════════════════
  // 🖼  МУЗЕЙ & УРЛАГ — Museums & Art
  // ══════════════════════════════════════════════
  {
    id:'shanghai_museum', name:'Shanghai Museum', cat:'museum', catLabel:'Музей & Урлаг',
    img:'https://images.unsplash.com/photo-1713006947005-70c6b2796b68?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏛', bg:'linear-gradient(135deg,#3d2c8d,#6a5acd)',
    metro:"Line 1/2/8 · People's Square · Exit 1", cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.8', reviews:'30,000',
    desc:'Хятадын урлагийн нэн чухал музей. Хүрэл эдлэл, каллиграф, шаазан, нефрит — 120,000+ үзмэр.',
    lfs:'LFS: Урьдчилан онлайн бүртгүүлэх шаардлагатай. Ням гарагт хамгийн дүүрэн.',
    booking:'Онлайн урьдчилан бүртгүүлэх шаардлагатай (үнэгүй)',
    arrivalGuide:[
      "🚇 People's Square буудал, Exit 1-ээр гарна",
      '🚶 Өмнө зүгт талбай дундуур ~3 мин алхана',
      '🏛 Shanghai Museum талбайн урд захад байна — том дугуй барилга',
      '📱 ЗААВАЛ: shan.hai-museum.com дээр паспортоор урьдчилан бүртгэнэ (үнэгүй)',
      '⏰ Мягмар–Ням 09:00–17:00 (сүүлийн орох 16:00), Даваа гараг хаалттай'
    ],
    tags:['museum','culture','budget','family']
  },
  {
    id:'natural_history', name:'Shanghai Natural History Museum', cat:'museum', catLabel:'Музей & Урлаг',
    img:'https://images.unsplash.com/photo-1585592221803-03d9d7f56e52?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🦕', bg:'linear-gradient(135deg,#1b5e20,#388e3c)',
    metro:'Line 13 · Natural History Museum', cost:30, costLabel:'¥30',
    time:'2–3 цаг', rating:'4.8', reviews:'15,000',
    desc:'Дэлхийн шилдэг байгалийн түүхийн музейн нэгэн. Динозаврын яс, амьтны коллекц, хүмүүний хувьсал.',
    lfs:'LFS: Хүүхэдтэй гэр бүлд хамгийн тохиромжтой. Жинхэнэ T-Rex яс байдаг.',
    arrivalGuide:[
      '🚇 Line 13 Natural History Museum буудал (自然博物馆), Exit 1-ээр гарна',
      '🚶 Гарснаасаа музей шууд харагдана — Yan\'an West Road 510 хаяг',
      '🎫 Тасалбар ¥30; онлайн захиалга: nhm.sh.cn вэбсайт эсвэл WeChat-аар',
      '🦕 Динозаврын танхим 3-р давхарт, амьтан, далайн амьтан 1–2-р давхарт',
      '⏰ Мягмар–Ням 09:00–17:15 (Даваа гараг хаалттай)'
    ],
    tags:['museum','family','budget']
  },
  {
    id:'urban_planning', name:'Shanghai Urban Planning Exhibition Center', cat:'museum', catLabel:'Музей & Урлаг',
    img:'https://images.unsplash.com/photo-1567574446891-7aef076416ec?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏙', bg:'linear-gradient(135deg,#006064,#00838f)',
    metro:"Line 1/2/8 · People's Square · Exit 1", cost:30, costLabel:'¥30',
    time:'1–2 цаг', rating:'4.5', reviews:'8,000',
    desc:'Шанхайн ирээдүйн хот төлөвлөлтийн 1:500 масштабын гайхалтай загвар. Хотыг дээрээс харна.',
    lfs:'LFS: Шанхай хотыг бүхэлд нь нэг дор харах сонирхолтой туршлага.',
    arrivalGuide:[
      "🚇 People's Square буудал, Exit 1-ээр гарна",
      '🚶 Зүүн тийш талбай дагуж ~3 мин алхана',
      '🏙 Том ногоон барилга — Urban Planning Exhibition Center',
      '⏰ Мягмар–Ням 09:00–17:00 (Даваа гараг хаалттай)'
    ],
    tags:['museum','culture','budget']
  },
  {
    id:'power_station_art', name:'Power Station of Art', cat:'museum', catLabel:'Музей & Урлаг',
    img:'https://images.unsplash.com/photo-1589648619563-16386829d31c?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'⚡', bg:'linear-gradient(135deg,#1a1a2e,#2d2d4e)',
    metro:'Line 4 · Luban Road', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.6', reviews:'10,000',
    desc:'Хуучин цахилгаан станцыг Хятадын зэрэглэлийн орчин үеийн урлагийн музей болгосон.',
    lfs:'LFS: Shanghai Biennale энд болдог. Орчин үеийн урлагт сонирхолтой хүмүүст.',
    arrivalGuide:[
      '🚇 Line 4 Luban Road буудал, Exit 1-ээр гарна',
      '🚶 Luban Road дагуж хойш ~5 мин алхана — том цахилгаан станцын барилга харагдана',
      '🏭 Power Station of Art: Huayuangang Road 200 хаяг, South Bund ойролцоо',
      '⚡ Хуучин цахилгаан станцын 165м өндөр яндан нь чиглэл олоход тусалдаг',
      '⏰ Мягмар–Ням 11:00–19:00 (Даваа гараг хаалттай); оролт үнэгүй'
    ],
    tags:['museum','photo','hidden']
  },
  {
    id:'rockbund_art', name:'Rockbund Art Museum', cat:'museum', catLabel:'Музей & Урлаг',
    img:'https://images.unsplash.com/photo-1671882774388-3bc6070ed0f8?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🎭', bg:'linear-gradient(135deg,#8b0000,#a00000)',
    metro:"Line 2/10 · Nanjing East Road", cost:60, costLabel:'¥60',
    time:'1 цаг', rating:'4.5', reviews:'5,000',
    desc:'Бүндийн дэргэд 1930-иад оны барилган дотор орчин үеийн урлагийн үзэсгэлэн.',
    lfs:'LFS: Бага хэмжээний, тоймтой үзэсгэлэн. Бүндтэй нийлүүлж үзэхэд тохиромжтой.',
    arrivalGuide:[
      '🚇 Line 2 эсвэл Line 10 East Nanjing Road буудал, Exit 3-аар гарна',
      '🚶 Бүндийн дагуу хойш ~5 мин алхаад Huqiu Road-тай огтлолцох газарт зүүн тийш эргэнэ',
      '🎭 Rockbund Art Museum: Huqiu Road 20 хаяг — 1930-иад оны Art Deco барилга',
      '🎫 Тасалбар ¥60; онлайн урьдчилан захиалж болно',
      '⏰ Мягмар–Ням 10:00–18:00 (Даваа гараг хаалттай)'
    ],
    tags:['museum','culture','photo']
  },
  {
    id:'long_museum_west', name:'Long Museum West Bund', cat:'museum', catLabel:'Музей & Урлаг',
    img:'https://images.unsplash.com/photo-1614636401882-aa1a36704629?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🖼', bg:'linear-gradient(135deg,#212121,#424242)',
    metro:'Line 7/12 · Longhua Middle Rd · Exit 2', cost:50, costLabel:'¥50',
    time:'1–2 цаг', rating:'4.7', reviews:'7,000',
    desc:'Хуучин нүүрс хаях байрны орчинд байрлах хувийн орчин үеийн урлагийн цуглуулга.',
    lfs:'LFS: West Bund аялалтай нийлүүл. Хятадын орчин үеийн урлагийн хамгийн сайн сан.',
    arrivalGuide:[
      '🚇 Longhua Middle Road буудал (Line 7 эсвэл Line 12), Exit 2-аас гарна',
      '🚶 Хуанпу мөрний эрэг рүү ~10 мин алхана',
      '🖼 Long Museum West Bund: 3398 Longteng Ave — мөрний эрэгт байна',
      '⏰ Мягмар–Ням 10:00–18:00 (Даваа гараг хаалттай)'
    ],
    tags:['museum','hidden','relax']
  },
  {
    id:'yuz_museum', name:'Yuz Museum (Yu Zhu)', cat:'museum', catLabel:'Музей & Урлаг',
    img:'https://images.unsplash.com/photo-1590274171261-3e14f2003541?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🎪', bg:'linear-gradient(135deg,#f57c00,#ef6c00)',
    metro:'Line 7/12 · Longhua Middle Rd · Exit 2', cost:100, costLabel:'¥100',
    time:'1–2 цаг', rating:'4.5', reviews:'4,000',
    desc:'Индонезийн бизнесмэн Budi Tek-ийн хувийн цуглуулга. Хуучин ангилалтаа MEGA арт бүтээлүүд.',
    lfs:'LFS: West Bund-ийн урлагийн кластерын хэсэг. Long Museum-тай нийлүүлэхэд тохиромжтой.',
    arrivalGuide:[
      '🚇 Line 7 эсвэл Line 12 Longhua Middle Road буудал, Exit 2-аар гарна',
      '🚶 Мөрний эрэг рүү зүүн тийш ~10 мин алхана',
      '🎪 Yuz Museum: Fenggu Road 35 хаяг — West Bund урлагийн кластерт байна',
      '🎫 Тасалбар ¥100; Мягмар–Ням 10:00–18:00 нээлттэй (Даваа гараг хаалттай)',
      '⚠️ Long Museum-тай нийлүүлж хагас өдрийн аялал болгоход тохиромжтой'
    ],
    tags:['museum','hidden']
  },
  {
    id:'jewish_refugees', name:'Shanghai Jewish Refugees Museum', cat:'museum', catLabel:'Музей & Урлаг',
    img:'https://images.unsplash.com/photo-1619435995099-f89dcf903622?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'✡️', bg:'linear-gradient(135deg,#1a3a5c,#2a5a8c)',
    metro:'Line 12 · Linping Road', cost:50, costLabel:'¥50',
    time:'1 цаг', rating:'4.7', reviews:'6,000',
    desc:'Дэлхийн 2-р дайны үед 20,000+ Еврей дүрвэгчдийг хамгаалсан Хонгко хороолол. Гуймэй синагог.',
    lfs:'LFS: Маш хөдлөлтэй түүхийн музей. Еврей, Хятад харилцааг харуулна.',
    arrivalGuide:[
      '🚇 Line 12 Linping Road буудал, Exit 1-ээр гарна',
      '🚶 Баруун тийш Changyang Road дагуж ~5 мин алхана',
      '✡️ Changyang Road 62 хаяг — Ohel Moishe синагог байна',
      '🎫 Орох тасалбар ¥50, паспорт авч явна',
      '⏰ Өдөр бүр 09:00–17:00 нээлттэй'
    ],
    tags:['museum','culture','hidden']
  },
  {
    id:'china_art_museum', name:'China Art Museum', cat:'museum', catLabel:'Музей & Урлаг',
    img:'https://images.unsplash.com/photo-1566972662411-fa488a405a0e?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🎨', bg:'linear-gradient(135deg,#c0392b,#e74c3c)',
    metro:'Line 7/8 · China Art Museum', cost:0, costLabel:'Үнэгүй',
    time:'2 цаг', rating:'4.5', reviews:'8,000',
    desc:'2010 EXPO-гийн Хятадын павильон дотор байрлах. Хятадын уламжлалт болон орчин үеийн урлаг.',
    lfs:'LFS: Том зориулалтын музей. Урьдчилан бүртгүүлэх шаардлагатай.',
    arrivalGuide:[
      '🚇 Line 7/8 China Art Museum буудал, Exit 2-аар гарна',
      '🏛 Гарснаасаа улаан өнгийн асар том павильон харагдана — 2010 EXPO-гийн Хятадын дэлгэц',
      '📱 Урьдчилан онлайн бүртгүүлэх шаардлагатай (үнэгүй)',
      '⏰ Мягмар–Ням 09:00–17:00, Даваа гараг хаалттай'
    ],
    tags:['museum','culture','budget']
  },

  // ══════════════════════════════════════════════
  // ⛩  СҮМ & ШАШИН — Temples & Religion
  // ══════════════════════════════════════════════
  {
    id:'jingan_temple', name:"Jing'an Temple", cat:'temple', catLabel:'Сүм & Шашин',
    img:'https://images.unsplash.com/photo-1559305984-b6421217abff?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'⛩', bg:'linear-gradient(135deg,#b7950b,#d4ac0d)',
    metro:"Line 2/7 · Jing'an Temple · Exit 1", cost:50, costLabel:'¥50',
    time:'1 цаг', rating:'4.6', reviews:'25,000',
    desc:'Хотын төвийн шинэ байшингуудын дунд орших 1700 жилийн настай буддын сүм. Алтан дээвэр.',
    lfs:'LFS: Орон нутгийн хүмүүс идэр настан нь мөрт морилдог. Шинэ жилийн наадмаар онцгой.',
    arrivalGuide:[
      "🚇 Jing'an Temple буудал, Exit 1-ээр гарна — сүм шууд харагдана",
      '🎫 Орох хаалган дахь тасалбарын лааны орно (¥50)',
      '🙏 Гол сүмд орохдоо малгайгаа авна, чимээгүй байна',
      '📸 Зураг авахдаа мөргөж буй хүмүүсийг зөвшөөрөлгүй авахгүй байна',
      '⏰ Өдөр бүр 07:30–17:00 нээлттэй'
    ],
    tags:['temple','culture','photo']
  },
  {
    id:'longhua_temple', name:'Longhua Temple', cat:'temple', catLabel:'Сүм & Шашин',
    img:'https://images.unsplash.com/photo-1637225999435-b65b96e1c9b2?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🛕', bg:'linear-gradient(135deg,#8b4513,#cd853f)',
    metro:'Line 11/12 · Longhua · Exit 1', cost:10, costLabel:'¥10',
    time:'1–2 цаг', rating:'4.6', reviews:'15,000',
    desc:'Шанхайн хамгийн эртний буддын сүм. Мод цамхаг, цэцэрлэг. 242 онд байгуулагдсан.',
    lfs:'LFS: Шинэ жилийн наадмаар хонх дуугарах ёслол алдартай. Гоё сэрүүн байдаг.',
    arrivalGuide:[
      '🚇 Longhua буудал (Line 11 эсвэл Line 12), Exit 1-ээр гарна',
      '🛕 Гарснаасаа Longhua сүмийн цамхаг харагдана (~200м)',
      '🎫 Орох тасалбар ¥10 — хаалган дэргэд авна',
      '🌸 Longhua Rd дагуж ирэхдээ персик цэцгийн мод олон — хаврын улиралд гайхалтай',
      '⏰ Өдөр бүр 07:00–17:00 нээлттэй'
    ],
    tags:['temple','culture','photo','family']
  },
  {
    id:'jade_buddha', name:'Jade Buddha Temple', cat:'temple', catLabel:'Сүм & Шашин',
    img:'https://images.unsplash.com/photo-1559049931-b99ecf20e679?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'💚', bg:'linear-gradient(135deg,#004d00,#006600)',
    metro:'Line 7/13 · Changshou Road', cost:50, costLabel:'¥50',
    time:'1 цаг', rating:'4.6', reviews:'20,000',
    desc:'1882 оны ногоон чулуун Будда хоёр бурхны байранд. Нэгийг нь 2 тн, 90 алтаар чимэглэсэн.',
    lfs:'LFS: Шанхайн хамгийн алдартай буддын сүм. Дагина хүмүүс олон. Хуучин хороолол.',
    arrivalGuide:[
      '🚇 Line 7/13 Changshou Road буудал, Exit 1-ээр гарна',
      '🚶 Хойш Anyuan Road дагуж ~5 мин алхана (Anyuan Road 170)',
      '🎫 Орох тасалбар ¥50 — хаалган дэргэд авна',
      '🙏 Нефрит Буддад зөвхөн тусгай тасалбараар нэмэлт ¥10-аар орно',
      '⏰ Өдөр бүр 08:00–17:00 нээлттэй'
    ],
    tags:['temple','culture','family']
  },
  {
    id:'chenghuang_temple', name:'Chenghuang Miao (City God Temple)', cat:'temple', catLabel:'Сүм & Шашин',
    img:'https://images.unsplash.com/photo-1614479830082-660569b8f78e?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏮', bg:'linear-gradient(135deg,#8b0000,#b22222)',
    metro:'Line 10/14 · Yu Garden', cost:10, costLabel:'¥10',
    time:'30–60 мин', rating:'4.4', reviews:'12,000',
    desc:'Юй цэцэрлэгийн дэргэдэх хотын суваргийн дааман Хятадын хот суваргийн даамд зориулсан сүм.',
    lfs:'LFS: Yu Garden-тэй нийлүүл. Шинэ жилийн наадмаар тусгай ёслол болдог.',
    arrivalGuide:[
      '🚇 Line 10/14 Yuyuan буудал, Exit 1-ээр гарна',
      '🚶 Зүүн тийш Fuyou Road дагуж ~3 мин алхана — Yu Garden-тэй нэг байрлалд',
      '🏮 Chenghuang Miao хаалга улаан торго чимэглэлтэй — шууд харагдана',
      '🎫 Орох тасалбар ¥10',
      '⏰ Өдөр бүр 08:30–17:00 нээлттэй'
    ],
    tags:['temple','culture','tradition']
  },
  {
    id:'qingpu_mosque', name:"Shanghai Mosque (Xiaotaoyuan)", cat:'temple', catLabel:'Сүм & Шашин',
    img:'https://images.unsplash.com/photo-1645490431810-08d8e3c59e17?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🕌', bg:'linear-gradient(135deg,#004d00,#2e7d32)',
    metro:'Line 1 · People\'s Square', cost:0, costLabel:'Үнэгүй',
    time:'30 мин', rating:'4.4', reviews:'3,000',
    desc:'Шанхайн гол лалын сүм. 1917 онд байгуулагдсан. Лалын шашинт аялагчдад чухал газар.',
    lfs:'LFS: Залрах цагт орохдоо дотогш дохих. Биеэ зохицуулсан хувцастай очно.',
    arrivalGuide:[
      "🚇 Line 1/2/8 People's Square буудал, Exit 1-ээр гарна",
      '🚶 Өмнө зүгт Fuyou Road руу ~5 мин алхана',
      '🕌 Xiaotaoyuan Street 52 хаяг — цагаан минарет харагдана',
      '⚠️ Залрах цагт (5 удаа өдөрт) зочин орохгүй байх. Биеэ зохицуулсан хувцас заавал',
      '⏰ Залрах цагаас бусад үед нээлттэй'
    ],
    tags:['temple','culture']
  },

  // ══════════════════════════════════════════════
  // 🛍  ШОППИНГ — Shopping
  // ══════════════════════════════════════════════
  {
    id:'nanjing_west', name:'Nanjing West Road (Luxury Strip)', cat:'shopping', catLabel:'Шоппинг',
    img:'https://images.unsplash.com/photo-1506158278516-d720e72406fc?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'💎', bg:'linear-gradient(135deg,#1a1a2e,#2d2d4e)',
    metro:"Line 2/7 · Nanjing West Road / Jing'an Temple", cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.6', reviews:'30,000',
    desc:'Plaza 66, Citic Square, Westgate Mall — Шанхайн тансаг брэндийн гол гудамж.',
    lfs:'LFS: Gucci, LV, Cartier бүгд энд байна. Хямдралгүй гэхдээ зочин чанарын дэлгүүр.',
    arrivalGuide:[
      "🚇 Line 2/7 Nanjing West Road буудал, Exit 1-ээр гарна",
      '💎 Гарснаасаа Plaza 66 (хамгийн өндөр хос цамхаг) харагдана',
      '🛍 Зүүн тийш Nanjing West Road дагуж алхвал Citic Square, Westgate Mall зэрэглэн',
      '⏰ Ихэнх дэлгүүр 10:00–22:00 нээлттэй'
    ],
    tags:['shopping']
  },
  {
    id:'plaza66', name:'Plaza 66', cat:'shopping', catLabel:'Шоппинг',
    img:'https://images.unsplash.com/photo-1506158278516-d720e72406fc?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏬', bg:'linear-gradient(135deg,#2c2c2c,#4a4a4a)',
    metro:"Line 2/7 · Nanjing West Road", cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.5', reviews:'15,000',
    desc:'Шанхайн хамгийн тансаг шоппинг молл. Hermès, Chanel, Dior, Louis Vuitton, Prada.',
    lfs:'LFS: Тансаг дэлгүүрт зочилхоор тусгайлан ирдэг хүмүүст. Хоолны газар мөн дээгүүр.',
    arrivalGuide:[
      "🚇 Line 2/7 Nanjing West Road буудал, Exit 1-ээр гарна",
      '🏬 Plaza 66 (1266 Nanjing West Road) буудлаас шууд харагдана',
      '💎 1-р давхар Hermès, Chanel, Dior; дээд давхар Prada, LV, Cartier',
      '🍽 5-р давхарт хоолны газрууд — захиалгагүй орж болно',
      '⏰ 10:00–22:00 нээлттэй'
    ],
    tags:['shopping']
  },
  {
    id:'ifc_mall', name:'IFC Mall (International Finance Centre)', cat:'shopping', catLabel:'Шоппинг',
    img:'https://images.unsplash.com/photo-1536238603907-1b919bddc1c0?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🛒', bg:'linear-gradient(135deg,#003366,#004d99)',
    metro:'Line 2 · Lujiazui', cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.6', reviews:'20,000',
    desc:'Луцзяцуйн хамгийн шилдэг шоппинг молл. Apple Store, брэнд дэлгүүр, гурав давхар.',
    lfs:'LFS: Shanghai Tower-тэй нэг байрлалд. Хоолны газрууд дэлхийн стандарттай.',
    arrivalGuide:[
      '🚇 Line 2 Lujiazui буудал, Exit 1-ээр гарна',
      '🏙 Underground гарцаар шууд IFC Mall B1 давхарт хүрнэ — гадагш гарах шаардлагагүй',
      '🍎 Дэд давхарт Apple Store, Zara; дээд давхарт брэнд дэлгүүрүүд',
      '🍽 3-р давхарт хоолны газрууд — Haidilao, Crystal Jade',
      '⏰ 10:00–22:00 нээлттэй'
    ],
    tags:['shopping','food']
  },
  {
    id:'grand_gateway', name:'Grand Gateway 66 (Xujiahui)', cat:'shopping', catLabel:'Шоппинг',
    img:'https://images.unsplash.com/photo-1579970191855-a56029032cb5?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏪', bg:'linear-gradient(135deg,#880000,#cc0000)',
    metro:'Line 1/9/11 · Xujiahui', cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.5', reviews:'25,000',
    desc:'Xujiahui хэсгийн хамгийн том шоппинг төв. Дундаас дээшлүүр хэлбэртэй барилга.',
    lfs:'LFS: Xujiahui электроникийн дүүрэгтэй нийлүүл. Техник хэрэгслийн хямд дэлгүүр ойролцоо.',
    arrivalGuide:[
      '🚇 Line 1/9/11 Xujiahui буудал, Exit 3-аар гарна',
      '🏪 Grand Gateway 66 гарцын урд шууд байна — нэг ч алхалгүй',
      '🛍 1–5 давхар дундаас дээшлүүр хэлбэрийн том молл',
      '💻 Xujiahui электроникийн дэлгүүр молл-оос баруун тийш ~3 мин',
      '⏰ 10:00–22:00 нээлттэй'
    ],
    tags:['shopping']
  },
  {
    id:'huaihai_road', name:'Huaihai Road (Shopping Street)', cat:'shopping', catLabel:'Шоппинг',
    img:'https://images.unsplash.com/photo-1598522331265-6af1f4c81771?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🛍', bg:'linear-gradient(135deg,#4a0e4e,#7d3c98)',
    metro:'Line 1 · South Huangpi Road', cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.5', reviews:'35,000',
    desc:'Nanjing Road-аас арай тайван, орон нутгийнхны дуртай дунд зэрэглэлийн шоппинг гудамж.',
    lfs:'LFS: iapm Mall энд байна. Хоолны газар болон кофе шоп баялаг.',
    arrivalGuide:[
      '🚇 Line 1 South Huangpi Road буудал, Exit 2-аар гарна',
      '🛍 Гарснаасаа Huaihai Middle Road дагуж зүүн эсвэл баруун тийш алхана',
      '🌟 iapm Mall баруун тийш ~5 мин, H&M / Zara зүүн тийш',
      '☕ Кофе шоп, ресторан бүх талаар байна',
      '⏰ Дэлгүүрүүд ихэвчлэн 10:00–22:00, iapm 02:00 хүртэл'
    ],
    tags:['shopping','food']
  },
  {
    id:'iapm_mall', name:'iapm Mall', cat:'shopping', catLabel:'Шоппинг',
    img:'https://images.unsplash.com/photo-1602334478926-52606b6fb3ba?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌟', bg:'linear-gradient(135deg,#1a0533,#4a0d6a)',
    metro:'Line 1 · South Huangpi Road', cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.7', reviews:'18,000',
    desc:'Шөнийн хоёр цаг хүртэл нээлттэй Шанхайн гайхамшигтай орчин үеийн молл.',
    lfs:'LFS: Din Tai Fung энд байна. Оройн хоолны дараа шоппинг хийхэд хамгийн тохиромжтой.',
    arrivalGuide:[
      '🚇 Line 1 South Huangpi Road буудал, Exit 2-аар гарна',
      '🚶 Зүүн тийш Huaihai Middle Road дагуж ~5 мин алхана (999 дугаар)',
      '🌟 Орчин үеийн нилэнхүй шилэн барилга — хамгийн гоёмсог молл',
      '🥢 B1 давхарт Din Tai Fung — урьдчилан захиалах нь зүйтэй',
      '⏰ 10:00–02:00 (шөнийн 2 цаг хүртэл нээлттэй)'
    ],
    tags:['shopping','food','night']
  },
  {
    id:'yuyuan_bazaar_shop', name:'Yuyuan Bazaar (Shopping)', cat:'shopping', catLabel:'Шоппинг',
    img:'https://images.unsplash.com/photo-1644611708972-5508a34357c6?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🧧', bg:'linear-gradient(135deg,#8b0000,#c0392b)',
    metro:'Line 10/14 · Yu Garden', cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.4', reviews:'40,000',
    desc:'Уламжлалт Хятад бэлэг, гар урлал, чай, торго худалдан авах хамгийн алдартай захын хороолол.',
    lfs:'LFS: Хятад бэлэг авахын хамгийн сайн газар. Тохиролцооны үнэ байдаг — тарга хийж болно.',
    arrivalGuide:[
      '🚇 Line 10/14 Yuyuan буудал, Exit 1-ээр гарна',
      '🚶 Fuyou Road дагуж зүүн тийш ~2 мин — захын хороолол эхэлнэ',
      '🧧 Чай, торго, нефрит, модон эдлэл, Хятад бэлэг — бүх зүйл энд',
      '💰 Тохиролцооны үнэ байдаг — анхны үнийг 30–50% хямдруулж болно',
      '⚠️ Бэлэгний чанарыг анхааралтай шалгах — жуулчны зах тул'
    ],
    tags:['shopping','tradition','culture']
  },
  {
    id:'super_brand_mall', name:'Super Brand Mall (Lujiazui)', cat:'shopping', catLabel:'Шоппинг',
    img:'https://images.unsplash.com/photo-1593616235572-815d800bc054?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏟', bg:'linear-gradient(135deg,#1a237e,#283593)',
    metro:'Line 2 · Lujiazui', cost:0, costLabel:'Үнэгүй',
    time:'2 цаг', rating:'4.4', reviews:'12,000',
    desc:'10 давхар 13 зуун дэлгүүртэй Луцзяцуйн хоёр дахь том молл. Синема, хоол бүгд байна.',
    lfs:'LFS: IFC Mall дүүрсэн бол Super Brand Mall-д ор. Хоолны давхар сайн.',
    arrivalGuide:[
      '🚇 Line 2 Lujiazui буудал, Exit 1-ээр гарна',
      '🚶 Өмнө зүгт Lujiazui Road дагуж ~5 мин алхана (168 дугаар)',
      '🏟 10 давхар том молл — кино театр, хоол, дэлгүүр бүгд нэг дор',
      '🍽 6-р давхарт хоолны газрууд — дотоодын брэнд, хямд хооллох боломж',
      '⏰ 10:00–22:00 нээлттэй'
    ],
    tags:['shopping','food']
  },
  {
    id:'xujiahui_electronics', name:'Xujiahui Electronics District', cat:'shopping', catLabel:'Шоппинг',
    img:'https://images.unsplash.com/photo-1667412069346-db95deccc8a5?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'💻', bg:'linear-gradient(135deg,#1a3a5c,#2e5a8e)',
    metro:'Line 1/9/11 · Xujiahui', cost:0, costLabel:'Үнэгүй',
    time:'2–3 цаг', rating:'4.3', reviews:'10,000',
    desc:'Хямд техник хэрэгсэл, утас, зурган машин, аудио тоног төхөөрөмжийн тусгай дүүрэг.',
    lfs:'LFS: Лааз нааш, нааш нь тохиролцооны үнэ. iPhone хакердасан байвал энд авна.',
    arrivalGuide:[
      '🚇 Line 1/9/11 Xujiahui буудал, Exit 3-аар гарна',
      '💻 Grand Gateway-ийн баруун талаар Caoxi North Road дагуж алхана',
      '🏪 Pacific Digital Plaza болон Metro City-д хамгийн олон техникийн дэлгүүр',
      '💰 Үнэ тохиролцоно — анхны үнийг хасуулж болно, харьцуулж үз',
      '⚠️ Хуурамч бараа байх тул алдартай дэлгүүрийн салбараас авах нь найдвартай'
    ],
    tags:['shopping']
  },

  // ══════════════════════════════════════════════
  // 🍜  ХООЛ & КАФЕ — Food & Cafes
  // ══════════════════════════════════════════════
  {
    id:'nanxiang', name:'Nanxiang Steamed Bun Restaurant', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1678026582164-24a5460c447a?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🥟', bg:'linear-gradient(135deg,#b71c1c,#e53935)',
    metro:'Line 10/14 · Yu Garden', cost:50, costLabel:'¥50/хүн',
    time:'1 цаг', rating:'4.6', reviews:'15,000',
    desc:'Чин гүрний үеэс тасралтгүй сяолунбаогоор алдартай газар. Нимгэн арьс, шөлтэй.',
    lfs:'LFS: 11:00-д очиж дараалалд ор. 3-р давхар хамгийн тохиромжтой.',
    arrivalGuide:[
      '🚇 Line 10/14 Yuyuan буудал, Exit 1-ээр гарна',
      '🚶 Zhujiajiao Road 85 хаяг руу ~3 мин алхана — zig-zag гүүрний дэргэд',
      '🥟 1-р давхар хямд, 3-р давхар тохилог (жижиг зааны суудал), цонхоор юй цэцэрлэг харагдана',
      '⏰ Өдөр бүр 07:00–20:00, дараалал ихтэй — 10:30-аас очиж ор',
      '⚠️ WeChat Pay эсвэл бэлэн мөнгөөр төлнө'
    ],
    tags:['food','culture','tradition']
  },
  {
    id:'jia_jia', name:'Jia Jia Tang Bao', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1694834589398-27b369c6f7a6?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🍱', bg:'linear-gradient(135deg,#4e342e,#795548)',
    metro:"Line 1/2/8 · People's Square", cost:30, costLabel:'¥30/хүн',
    time:'45 мин', rating:'4.3', reviews:'222',
    desc:'Орон нутгийн жинхэнэ таанбао газар. Жуулчдынх биш, Шанхайн иргэдийн тогтмол ирдэг газар.',
    lfs:'LFS: Cash-only. Өглөөний хоолоор хамгийн сайн. Орон нутгийн амт мэдэхийг хүсвэл заавал.',
    arrivalGuide:[
      "🚇 Line 1/2/8 People's Square буудал, Exit 1-ээр гарна",
      '🚶 Өмнө зүгт Huanghe Road руу ~5 мин (90 дугаар)',
      '🍱 Жижиг орон нутгийн газар — гаднаас харахад тансаг биш, гэхдээ сяолунбао нь дэлхийн чанарын',
      '💵 БЭЛЭН МӨНГӨӨР ТӨЛНӨ — карт авахгүй',
      '⏰ 07:00–19:00, ажлын өдрийн өглөө хамгийн хүнгүй'
    ],
    tags:['food','budget']
  },
  {
    id:'da_hu_chun', name:'Da Hu Chun (Shengjian)', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1657939728877-df03de19f9fe?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🫓', bg:'linear-gradient(135deg,#e65100,#ff6d00)',
    metro:"Line 2/10 · Nanjing East Road", cost:30, costLabel:'¥20–30/хүн',
    time:'45 мин', rating:'4.5', reviews:'2,700',
    desc:'90+ жилийн шэнцзяньбаогоор алдартай газар. Гадна шарсан арьс, дотор шөлтэй.',
    lfs:'LFS: Sichuan Road дахь эх салбар хамгийн жинхэнэ. Cash-аар төл.',
    arrivalGuide:[
      '🚇 Line 2/10 East Nanjing Road буудал, Exit 1-ээр гарна',
      '🚶 Хойш Sichuan Middle Road руу ~5 мин (2-р тоот эх салбар)',
      '🫓 Шэнцзяньбао: гадна шарсан, дотор шөлтэй — хазахдаа болгоомжтой халуун байна',
      '💵 БЭЛЭН МӨНГӨӨР ТӨЛНӨ — ¥2–3 нэг ширхэгт',
      '⏰ 06:30–20:00, өглөөний хоолоор хамгийн сайн'
    ],
    tags:['food','budget','tradition']
  },
  {
    id:'din_tai_fung', name:'Din Tai Fung', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🥢', bg:'linear-gradient(135deg,#880e4f,#c2185b)',
    metro:'Line 1 · South Huangpi Road', cost:200, costLabel:'¥200/хүн',
    time:'1.5 цаг', rating:'4.9', reviews:'12,000',
    desc:'Дэлхийн алдарт Taiwan сяолунбао ресторан. Шилдэг 50 дэлхийн ресторанд орсон. iapm Mall-д.',
    lfs:'LFS: Урьдчилан захиалга хийх шаардлагатай. Үнэ өндөр гэхдээ амтаа.',
    arrivalGuide:[
      '🚇 Line 1 South Huangpi Road буудал, Exit 2-аар гарна',
      '🚶 iapm Mall руу ~5 мин алхаад B1 давхарт орно',
      '🥢 Din Tai Fung iapm Mall-ын B1 давхарт — тэмдэглэгдсэн',
      '📱 Урьдчилан захиалга ЗААВАЛ: resdiary.com эсвэл ресторанд утасдана',
      '⏰ 11:00–22:00, амралтын өдөр хамгийн завгүй'
    ],
    tags:['food']
  },
  {
    id:'lost_heaven', name:'Lost Heaven (Yunnan)', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1556742524-750f2ab99913?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌶', bg:'linear-gradient(135deg,#4a1010,#8b2020)',
    metro:"Line 2/10 · Nanjing East Road", cost:200, costLabel:'¥150–200/хүн',
    time:'1.5 цаг', rating:'4.7', reviews:'5,000',
    desc:'Юньнань мужийн ургамлан хоол + экзотик амтлагч. Бүндийн дэргэд байрлана.',
    lfs:'LFS: Монголчуудад таалагдах амт. Жижиг хэмжээтэй тул урьдчилан захиал.',
    arrivalGuide:[
      '🚇 Line 2/10 East Nanjing Road буудал, Exit 3-аар гарна',
      '🚶 Бүнд рүү алхаад Yan\'an East Road 17 хайна (~5 мин)',
      '🌶 2 давхар — доош нь бар, дээш нь ресторан. Харалдаа Бүнд харагдана',
      '📱 Урьдчилан захиалга хийх нь зохимжтой',
      '⏰ 11:30–14:30, 17:30–22:30'
    ],
    tags:['food']
  },
  {
    id:'fu_1088', name:'Fu 1088 (Fu He Hui)', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏡', bg:'linear-gradient(135deg,#1a3a00,#2e6800)',
    metro:'Line 7 · Changshu Road', cost:400, costLabel:'¥300–500/хүн',
    time:'2 цаг', rating:'4.8', reviews:'3,000',
    desc:'Шанхайн тансаг ургамлан хоолны ресторан. Хуучин байшинд, Буддын философийн хоол.',
    lfs:'LFS: Веган, Buddhism хоолны дэлхийн шилдгийн нэгэн. Захиалга хамгийн чухал.',
    arrivalGuide:[
      '🚇 Line 7 Changshu Road буудал, Exit 1-ээр гарна',
      '🚶 Хойш Xinhua Road дагуж ~10 мин (1088 дугаар)',
      '🏡 1930-иад оны виллын байшин — харалдаа ойтой хаалгатай, нэр байхгүй',
      '📱 ЗААВАЛ урьдчилан захиалга — утас: 021-5239-7878 эсвэл WeChat',
      '⏰ 11:30–14:00, 17:30–21:00'
    ],
    tags:['food']
  },
  {
    id:'mr_mrs_bund', name:'Mr & Mrs Bund', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🍽', bg:'linear-gradient(135deg,#1a1a2e,#16213e)',
    metro:"Line 2/10 · Nanjing East Road", cost:400, costLabel:'¥300–500/хүн',
    time:'2 цаг', rating:'4.7', reviews:'4,000',
    desc:'Бүндийн харалдаа Францын хоолны тансаг ресторан. Орой 23:00 хүртэл хоол.',
    lfs:'LFS: Хамгийн романтик хоолны газар. Зусланд Бүндийг харж хоолло гэвэл тохиромжтой.',
    arrivalGuide:[
      '🚇 Line 2/10 East Nanjing Road буудал, Exit 3-аар гарна',
      '🚶 Бүнд дагуж өмнө зүгт ~5 мин, 18 Zhongshan East 1st Road (6F)',
      '🍽 6-р давхарт орох лифт байшингийн гол хаалгаар',
      '📱 Урьдчилан захиалга зайлшгүй — mrandmrsbund.com',
      '⏰ 17:30–23:00, хожуу хоол идэхэд тохиромжтой'
    ],
    tags:['food','night']
  },
  {
    id:'ultraviolet', name:'Ultraviolet by Paul Pairet', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1583475020831-fb4fbb497315?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌌', bg:'linear-gradient(135deg,#0d0033,#1a0066)',
    metro:'Хаяг нуугдмал — захиалгаар', cost:6000, costLabel:'¥6000/хүн',
    time:'4–5 цаг', rating:'4.9', reviews:'500',
    desc:'Дэлхийд ганцхан 10 суудалтай "мультисэнсор" хоолны газар. Asia\'s 50 Best #1.',
    lfs:'LFS: Дэлхийн хамгийн цор ганц туршлага. Хэдэн сар урьдаас захиалга хийх шаардлагатай.',
    arrivalGuide:[
      '🌌 ХАЯГ НУУГДМАЛ — захиалга хийсний дараа л өгнө',
      '📱 Захиалга: uvbypp.com — хэдэн сар урьдаас бүртгүүл (10 суудал)',
      '🚕 Захиалга баталгаажсаны дараа тухайн өдөр уулзах цэг мэдэгдэнэ',
      '💰 ¥6,000/хүн — дэлхийн хамгийн үнэтэй туршлагийн нэг',
      '⚠️ Хоёроос дөрвөн сарын өмнөөс захиалга хийх шаардлагатай'
    ],
    tags:['food']
  },
  {
    id:'hai_di_lao', name:'Haidilao Hot Pot', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1705636254195-60f1e917e05c?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🍲', bg:'linear-gradient(135deg,#cc0000,#ff0000)',
    metro:'Олон салбар бий', cost:150, costLabel:'¥100–200/хүн',
    time:'1.5–2 цаг', rating:'4.7', reviews:'50,000',
    desc:'Хятадын хамгийн алдартай халуун тавгийн ресторан. Дэлхий дахинд 1000+ салбар.',
    lfs:'LFS: Монголчуудад хамгийн дуртай хоол. Дараалал байвал нүүр арчдас, хумстай эрүүл хүнс өгнө.',
    arrivalGuide:[
      '🍲 Шанхайд 50+ салбар бий — хамгийн ойрын салбарыг сонго',
      '🚇 Хамгийн алдартай: Line 2 Lujiazui (IFC Mall 3F), Line 1 South Huangpi Road (iapm Mall)',
      '📱 Haidilao апп эсвэл WeChat-аар урьдчилан дугаарлана — дараалал ихтэй',
      '⏰ 10:00–06:00 (шөнийн 6 цаг хүртэл!) — дараалал байвал хүлээх газарт үйлчилгээ үнэгүй',
      '⚠️ Монгол хувцас тавих зориулалтын уут байдаг — асуугаарай'
    ],
    tags:['food','family']
  },
  {
    id:'spicy_joint', name:'Spicy Joint (Hunan)', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌶', bg:'linear-gradient(135deg,#7b0000,#c62828)',
    metro:'Олон салбар бий', cost:100, costLabel:'¥80–120/хүн',
    time:'1.5 цаг', rating:'4.6', reviews:'20,000',
    desc:'Хунань мужийн халуун шарсан мах, хумс, хөхөнцрийн амттай хоол. Шанхайд маш алдартай.',
    lfs:'LFS: Халуун идэхэд дуртай бол заавал. Монголчуудын хайрт хоол болж хувирсан.',
    arrivalGuide:[
      '🌶 Шанхайд олон салбар бий — People\'s Square болон Xintiandi ойролцоо',
      "🚇 Хамгийн ойр: Line 1/2/8 People's Square буудал",
      '🚶 Huangpi North Road дагуж ~5 мин, эсвэл Xintiandi салбар Line 10/13-аар',
      '📱 Weibo/WeChat дээр "辣府" гэж хайж хамгийн ойр салбарыг ол',
      '⏰ 11:00–22:00, оройн 18:00–20:00 хамгийн дүүрэн'
    ],
    tags:['food','budget']
  },
  {
    id:'noodle_bull', name:'Noodle Bull (Beef Noodles)', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1591214896508-22fc74d84a75?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🍜', bg:'linear-gradient(135deg,#4a2c00,#8b5e00)',
    metro:"Line 2/7 · Jing'an Temple", cost:60, costLabel:'¥40–80/хүн',
    time:'45 мин', rating:'4.5', reviews:'8,000',
    desc:'Жинхэнэ Ланьжоу гуа ногоотой гурил. Шанхайд хамгийн алдартай гуалын газар.',
    lfs:'LFS: Нэг л хэлбэрийн хоол гэхдээ маш сайн хийдэг. Хямд, цадмал.',
    arrivalGuide:[
      "🚇 Line 2/7 Jing'an Temple буудал, Exit 1-ээр гарна",
      "🚶 Jiangning Road дагуж хойш ~5 мин (Jiangning Road 537)",
      '🍜 Цэс Хятадаар ч, зурагтай ч байдаг — гол хоол: 红烧牛肉面 (улаан шөлтэй үхрийн гурил)',
      '⏰ 10:30–21:30 нээлттэй, өглөөний хоолоор хамгийн тохиромжтой'
    ],
    tags:['food','budget']
  },
  {
    id:'commune_social', name:'Commune Social', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1470114755716-3e1124c6c3bd?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🍷', bg:'linear-gradient(135deg,#2c1810,#5a3020)',
    metro:"Line 2/7 · Jing'an Temple", cost:300, costLabel:'¥200–400/хүн',
    time:'2 цаг', rating:'4.6', reviews:'3,000',
    desc:'Scott Melvin-ий тансаг тапас ресторан. Эклектик хоол, эклектик уур амьсгал.',
    lfs:'LFS: Хоолны дараа ижил барилгийн OMG Bar-д очно уу.',
    arrivalGuide:[
      "🚇 Line 2/7 Jing'an Temple буудал, Exit 1-ээр гарна",
      '🚶 Jiangning Road 511 руу ~5 мин алхана',
      '🍷 Доод давхар десертын бар, дээд давхар тапас ресторан',
      '📱 Урьдчилан захиалга зохимжтой: tableall.com эсвэл утсаар',
      '⏰ 12:00–14:30, 18:00–22:00'
    ],
    tags:['food','night']
  },
  {
    id:'yang_guofu', name:"Yang's Braised Mutton (Qing Zhen)", cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1562613498-8abe16e8373b?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🐑', bg:'linear-gradient(135deg,#3e1f00,#6b3500)',
    metro:'Олон салбар бий', cost:50, costLabel:'¥30–60/хүн',
    time:'45 мин', rating:'4.4', reviews:'15,000',
    desc:'Лалын шашинт хиамны хоолны алдарт сүлжээ. Хонины мах, хэвлий бар бүтээгдэхүүн.',
    lfs:'LFS: Монголчуудад маш дуртай. Хялаар цэвэр хоол. Xujiahui болон Jing\'an хэсэгт бий.',
    arrivalGuide:[
      '🐑 Шанхайд олон салбар бий — Xujiahui болон Jingan хэсэгт байна',
      "🚇 Хамгийн ойр: Line 1 Xujiahui Exit 3, эсвэл Line 2/7 Jing'an Temple",
      '🚶 Хамгийн ойр салбарт очихдоо Google Maps-т "杨国福" гэж хайна',
      '💵 ¥30–60/хүн — хямд, цэвэр хоол',
      '⏰ 10:00–21:00 ихэнх салбар'
    ],
    tags:['food','budget']
  },
  {
    id:'yuyuan_food', name:'Yuyuan Bazaar Street Food', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1644611708972-5508a34357c6?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🥮', bg:'linear-gradient(135deg,#5d4037,#8d6e63)',
    metro:'Line 10/14 · Yu Garden', cost:50, costLabel:'¥20–50/хүн',
    time:'1 цаг', rating:'4.5', reviews:'40,000',
    desc:'Шанхайн сяолунбао, шэнцзяньбао, чаны амттан бүгд нэг дор. Уламжлалт амт.',
    lfs:'LFS: 09:00-ийн өмнө очвол хүн цөөн. Nanxiang Steamed Bun ойролцоо.',
    arrivalGuide:[
      '🚇 Line 10/14 Yuyuan буудал, Exit 1-ээр гарна',
      '🚶 Zhonghualu болон Fuyou Road-ийн уулзварт street food гудамж эхэлнэ',
      '🥮 Алдартай зүйлс: Сяолунбао (蟹粉汤包), шэнцзяньбао, нарийн боов, загасны бөмбөлөг',
      '⏰ Өглөөний 07:00-аас нээгддэг — эрт очиж хамгийн шинэхэн амтыг хар',
      '⚠️ Бэлэн мөнгө авч явах нь зохимжтой'
    ],
    tags:['food','tradition','budget']
  },
  {
    id:'heji_crab', name:'He Ji Crab House (Hairy Crab)', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1625181581977-b910801d9b43?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🦀', bg:'linear-gradient(135deg,#004d3d,#007a60)',
    metro:'Line 10 · Xintiandi', cost:300, costLabel:'¥200–400/хүн',
    time:'1.5 цаг', rating:'4.6', reviews:'4,000',
    desc:'Шанхайн намрын тусгай хоол — үстэй далайн хавч. 10-р сараас 12-р сар хүртэл.',
    lfs:'LFS: Намрын улиралд заавал идэх ёстой Шанхайн онцлог хоол.',
    arrivalGuide:[
      '🚇 Line 10/13 Xintiandi буудал, Exit 1-ээр гарна',
      '🚶 Taicang Road дагуж ~5 мин (ресторан ойролцоо Xintiandi)',
      '🦀 10-р сараас 12-р сар хүртэл үстэй хавч байна — бусад үед тусгай цэс',
      '📱 Урьдчилан захиалга хийх шаардлагатай — их дүүрэн байдаг',
      '⏰ 11:30–14:00, 17:00–22:00'
    ],
    tags:['food']
  },
  {
    id:'coffee_compound', name:'Coffee Compound / Manner Coffee', cat:'food', catLabel:'Хоол',
    img:'https://images.unsplash.com/photo-1482859602406-7659b00979fb?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'☕', bg:'linear-gradient(135deg,#1a0a00,#3d1f00)',
    metro:'Олон газар бий', cost:30, costLabel:'¥20–40',
    time:'30–60 мин', rating:'4.6', reviews:'30,000',
    desc:'Шанхайн хамгийн алдартай орон нутгийн кофе сүлжээ. Starbucks-аас хямд, амт нь дүүлэн.',
    lfs:'LFS: Шанхайд 500+ салбар. Орон нутгийнхны кофе соёлын тэмдэг.',
    arrivalGuide:[
      '☕ Шанхайд 500+ салбар — аль ч хэсэгт байна',
      '🚇 French Concession: Line 1 Changshu Road; Xintiandi: Line 10/13 Xintiandi',
      '🚶 Google Maps-т "Manner Coffee" гэж хайвал хамгийн ойр салбарыг заана',
      '💰 Flat white/Latte ¥15–25 — Starbucks-аас 2 дахин хямд',
      '⚠️ Зарим жижиг салбар өөрийн аяга авчирвал ¥5 хөнгөлөлт өгнө'
    ],
    tags:['food','budget','hidden']
  },

  // ══════════════════════════════════════════════
  // 🌿  АМРАХ & ПАРК — Parks & Relax
  // ══════════════════════════════════════════════
  {
    id:'west_bund', name:'West Bund (Xuhui Riverside)', cat:'relax', catLabel:'Амрах',
    img:'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌅', bg:'linear-gradient(135deg,#0d3349,#1565c0)',
    metro:'Line 7/12 · Longhua Middle Rd · Exit 2  /  Line 11 · Yunjin Rd', cost:0, costLabel:'Үнэгүй',
    time:'1–3 цаг', rating:'4.7', reviews:'20,000',
    desc:'Хуанпу мөрний баруун эргийн урлаг, соёлын бүс. West Bund Art Museum, кофе шоп.',
    lfs:'LFS: Орой нарны жаргалт гайхалтай. Музей Мяг хаалттай.',
    arrivalGuide:[
      '🚇 Хамгийн ойр: Line 7/12 Longhua Middle Road буудал, Exit 2-аас гарна',
      '🚶 Мөрний эрэг рүү зүүн тийш ~10 мин алхана',
      '🌅 West Bund Art Center, Yuz Museum, Long Museum бүгд мөрний эрэгт зэрэгцэн байна',
      '☕ Кофе шопуудыг эрэгт дагаж алхахад олон байна',
      '⏰ West Bund Art Museum: Мяг–Ням 10:00–18:00, Мяг гараг хаалттай'
    ],
    tags:['relax','photo','museum']
  },
  {
    id:'xintiandi', name:'Xintiandi', cat:'relax', catLabel:'Амрах',
    img:'https://images.unsplash.com/photo-1618933198854-ee406476827c?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏮', bg:'linear-gradient(135deg,#8b1a1a,#cc4444)',
    metro:'Line 10/13 · Xintiandi · Exit 6', cost:0, costLabel:'Үнэгүй',
    time:'2 цаг', rating:'4.6', reviews:'30,000',
    desc:'Шикүмэн барилгуудыг трендит бар, ресторан, кофе болгосон. Өдөр кофе, шөнө коктейль.',
    lfs:'LFS: Fuxing Park-тай нийлүүл. Брunch-д 10:00–12:00 хамгийн сайн.',
    arrivalGuide:[
      '🚇 Xintiandi буудал, Exit 6-аар гарна — Xintiandi Plaza шууд харагдана',
      '🏮 Хойд хэсэг (North Block): ресторан, кофе, бутик',
      '🏚 Өмнөд хэсэг (South Block): CCP Museum, уламжлалт шикүмэн гэр',
      '🗺 Хоёр хэсгийн хооронд Xingye Road — алхаад 5 мин',
      '☕ Brunch: 10:00–12:00 завгүй биш, хамгийн сайн цаг'
    ],
    tags:['relax','night','food','photo','tradition']
  },
  {
    id:'people_park', name:"People's Park", cat:'relax', catLabel:'Амрах',
    img:'https://images.unsplash.com/photo-1705695373213-115c102714fd?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌳', bg:'linear-gradient(135deg,#1b5e20,#388e3c)',
    metro:"Line 1/2/8 · People's Square", cost:0, costLabel:'Үнэгүй',
    time:'1–2 цаг', rating:'4.5', reviews:'12,000',
    desc:'Хотын төв ногоон оазис. Гэрлэлтийн зах, тай чи, Шанхайн музейтэй ойрхон.',
    lfs:'LFS: Бямба, Ням гарагийн гэрлэлтийн зах Шанхайн ганцхан газар.',
    arrivalGuide:[
      "🚇 Line 1/2/8 People's Square буудал, Exit 12-аар гарна",
      '🌳 Гарснаасаа хойш Nanjing West Road дагуж ~3 мин — парк хаалга харагдана',
      '💒 Бямба, Ням гарагт гэрлэлтийн зах (중매 시장) парк дотор болдог',
      '⏰ Өдөр бүр 06:00–18:00, үнэгүй'
    ],
    tags:['relax','budget','photo','culture']
  },
  {
    id:'century_park', name:'Century Park', cat:'relax', catLabel:'Амрах',
    img:'https://images.unsplash.com/photo-1686933021138-dcf2ae971c26?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌲', bg:'linear-gradient(135deg,#1b5e20,#2e7d32)',
    metro:'Line 2 · Century Park', cost:10, costLabel:'¥10',
    time:'2–4 цаг', rating:'4.5', reviews:'15,000',
    desc:'Шанхайн хамгийн том парк. Нуур, цэцэгт татам, дугуй унах, шувуудын аялал.',
    lfs:'LFS: Хоол авч очиж пикник хийж болно. Хаврын цэцэг дэлгэрэх үед онцгой.',
    arrivalGuide:[
      '🚇 Line 2 Century Park буудал, Exit 1-ээр гарна',
      '🌲 Гарснаасаа шууд парк хаалга байна — алхах шаардлагагүй',
      '🎫 Орох тасалбар ¥10',
      '🚲 Дотор дугуй түрээслэж болно (¥30–50/цаг)',
      '⏰ Өдөр бүр 07:00–18:00 (зусдаа 07:00–19:00)'
    ],
    tags:['relax','family','budget']
  },
  {
    id:'gongqing_forest', name:'Gongqing Forest Park', cat:'relax', catLabel:'Амрах',
    img:'https://images.unsplash.com/photo-1700489610484-4f863812ac46?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌾', bg:'linear-gradient(135deg,#1a3a00,#2e6800)',
    metro:'Line 8 · Nenjiang Road', cost:15, costLabel:'¥15',
    time:'2–4 цаг', rating:'4.5', reviews:'8,000',
    desc:'Пудунгийн хамгийн том байгалийн парк. Ой, нуур, аялалын зам. Хот дотор байгаль.',
    lfs:'LFS: Century Park-аас арай алслагдсан ч хүн цөөн. Гэр бүлтэй очиход тохиромжтой.',
    arrivalGuide:[
      '🚇 Line 8 Nenjiang Road буудал, Exit 1-ээр гарна',
      '🚶 Зүүн тийш ~10 мин алхана — парк хаалга Junning Road дагуу',
      '🌾 Ой, нуур, явган зам, тоглоомын талбай бүгд байна',
      '🎫 Орох тасалбар ¥15',
      '⏰ Өдөр бүр 07:00–18:00'
    ],
    tags:['relax','family','budget']
  },
  {
    id:'expo_greenhouse', name:'Expo Culture Park Greenhouse', cat:'relax', catLabel:'Амрах',
    img:'https://images.unsplash.com/photo-1718114268138-4adae6613099?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🪴', bg:'linear-gradient(135deg,#004d40,#00897b)',
    metro:'Line 13 · Shibo Ave · Exit 4  /  Line 7 · Houtan · Exit 4', cost:70, costLabel:'¥70–100',
    time:'2 цаг', rating:'4.8', reviews:'1,900',
    desc:'Хуучин ган үйлдвэр дотор тропик ой, усан хүрхрээ, цөлийн ургамал.',
    lfs:'LFS: Мяг хаалттай. Ажлын өдрийн өглөө хүн цөөн. WeChat-аар заавал урьдчилан захиал.',
    booking:'WeChat-аар заавал урьдчилан захиална',
    arrivalGuide:[
      '🚇 Line 13 Shibo Ave (世博大道) буудал Exit 4, эсвэл Line 7 Houtan (后滩) буудал Exit 4',
      '🚶 Exit 4-аас Expo Culture Park тэмдгийг дагаж ~10 мин алхана',
      '📱 ЗААВАЛ: WeChat-ын "世博文化公园温室" account-аас тухайн өдрийн тасалбар урьдчилан авна',
      '🌿 Орох хаалган дээр QR код скан хийлгэнэ',
      '⏰ Мягмар–Ням 09:00–17:00 (сүүлийн орох 16:00), Даваа гараг хаалттай'
    ],
    tags:['relax','photo','family']
  },
  {
    id:'jing_an_sculpture', name:"Jing'an Sculpture Park", cat:'relax', catLabel:'Амрах',
    img:'https://images.unsplash.com/photo-1694049555855-a4b8d52fbcc8?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🗿', bg:'linear-gradient(135deg,#263238,#455a64)',
    metro:"Line 2/7 · Jing'an Temple", cost:0, costLabel:'Үнэгүй',
    time:'1 цаг', rating:'4.4', reviews:'6,000',
    desc:'Уран барималуудаар чимэглэгдсэн хотын жижиг цэцэрлэг. Жиньань сүмийн хажуудах.',
    lfs:'LFS: Алхаж очиж болно. Кофе аваад тайван суухад тохиромжтой.',
    arrivalGuide:[
      "🚇 Line 2/7 Jing'an Temple буудал, Exit 1-ээр гарна",
      "🗿 Гарснаасаа Jing'an Temple-ийн хажуудаа баруун тийш хэдхэн алхам",
      '🌿 Уран баримал, усан оргилуур, модтой жижиг тайван цэцэрлэг',
      '⏰ Өдөр бүр нээлттэй, үнэгүй'
    ],
    tags:['relax','budget','photo']
  },
  {
    id:'yuyuan_bazaar', name:'Yuyuan Bazaar Area', cat:'relax', catLabel:'Амрах',
    img:'https://images.unsplash.com/photo-1645490431810-08d8e3c59e17?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏪', bg:'linear-gradient(135deg,#5d4037,#8d6e63)',
    metro:'Line 10/14 · Yu Garden', cost:0, costLabel:'Үнэгүй',
    time:'1 цаг', rating:'4.5', reviews:'40,000',
    desc:'Юй цэцэрлэгийн эргэн тойрон дахь уламжлалт хороолол. Street food, захын дэлгүүр.',
    lfs:'LFS: 09:00-ийн өмнө очвол хүн цөөн. Чайны газрууд хямд сайн.',
    arrivalGuide:[
      '🚇 Line 10/14 Yuyuan буудал, Exit 1-ээр гарна',
      '🚶 Хаалгаасаа гарснаасаа шууд захын хороолол эхэлнэ',
      '🏪 Yu Garden тойрсон уламжлалт гудамж — дэлгүүр, street food, чайны газар',
      '⏰ Дэлгүүрүүд 09:00–21:00, street food 07:00-аас'
    ],
    tags:['relax','food','tradition','budget']
  },
  {
    id:'zhongshan_park', name:'Zhongshan Park', cat:'relax', catLabel:'Амрах',
    img:'https://images.unsplash.com/photo-1483580220364-711991b69625?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌼', bg:'linear-gradient(135deg,#1b5e20,#43a047)',
    metro:'Line 2/3/4 · Zhongshan Park', cost:0, costLabel:'Үнэгүй',
    time:'1 цаг', rating:'4.4', reviews:'10,000',
    desc:'Хуучин Жессфилдийн цэцэрлэг. Хотын баруун хэсгийн орон нутгийн амьдрал.',
    lfs:'LFS: Long Ridge Mall хажуудаа. Cloud Nine Mall-тай нийлүүлж болно.',
    arrivalGuide:[
      '🚇 Line 2/3/4 Zhongshan Park буудал, Exit 3-аар гарна',
      '🌼 Гарснаасаа хойш ~3 мин алхана — парк хаалга Changning Road дагуу',
      '🏪 Long Ridge Mall хажуудаа, Cloud Nine Mall ойролцоо',
      '⏰ Өдөр бүр 06:00–18:00, үнэгүй'
    ],
    tags:['relax','budget','shopping']
  },

  // ══════════════════════════════════════════════
  // 🌙  ШӨНИЙН АМЬДРАЛ — Nightlife
  // ══════════════════════════════════════════════
  {
    id:'flair_bar', name:'Flair Rooftop Bar (Ritz-Carlton)', cat:'night', catLabel:'Шөнийн амьдрал',
    img:'https://images.unsplash.com/photo-1614221330834-9399e5631af3?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🍸', bg:'linear-gradient(135deg,#1a0a00,#4a1000)',
    metro:'Line 2 · Lujiazui', cost:0, costLabel:'Ундаа ¥200–500/хүн',
    time:'2–3 цаг', rating:'4.8', reviews:'500',
    desc:'Ritz-Carlton-ны 58 давхарт дээврийн бар. Бүнд + Пудунгийн панорама. Коктейль, шерри.',
    lfs:'LFS: Захиалга зайлшгүй. 21:00-аас хамгийн сайн. Smart casual хувцас шаардлагатай.',
    arrivalGuide:[
      '🚇 Line 2 Lujiazui буудал, Exit 1-ээр гарна',
      '🚶 IFC Mall-ын хажуугаар Ritz-Carlton Shanghai Pudong хайна (~5 мин)',
      '🍸 Барийн орц: Ritz-Carlton-ны гол хаалгаар орж 58F гэж хэлнэ',
      '⚠️ Smart casual хувцас ЗААВАЛ. Урьдчилан захиалга зохимжтой',
      '⏰ 17:00–01:00, 21:00-аас хамгийн сайн'
    ],
    tags:['night','photo']
  },
  {
    id:'speak_low', name:'Speak Low', cat:'night', catLabel:'Шөнийн амьдрал',
    img:'https://images.unsplash.com/photo-1548850174-4bf3a73dbc0b?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🥃', bg:'linear-gradient(135deg,#1a1200,#3d2b00)',
    metro:'Line 10/13 · Xintiandi', cost:0, costLabel:'Коктейль ¥80–150',
    time:'2 цаг', rating:'4.7', reviews:'800',
    desc:'Нуугдмал хаалгатай 3 давхар бар. Asia\'s 50 Best Bars жагсаалтад орсон.',
    lfs:'LFS: Ширхэгийн дэлгүүрийн хаалгаар ор. 21:00-аас урьдчилан суудал захиал.',
    arrivalGuide:[
      '🚇 Line 10/13 Xintiandi буудал, Exit 6-аар гарна',
      '🚶 Fuxing Middle Road 579 хаяг руу ~5 мин алхана',
      '🥃 Гол хаалга: ШИРХЭГИЙН дэлгүүрийн хаалгаар орно — дотор нь нуугдмал хаалга байна',
      '📱 21:00-аас урьдчилан суудал захиалах нь зохимжтой',
      '⏰ 18:00–02:00'
    ],
    tags:['night']
  },
  {
    id:'sober_company', name:'Sober Company', cat:'night', catLabel:'Шөнийн амьдрал',
    img:'https://images.unsplash.com/photo-1517422688858-c17ab068121c?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🍹', bg:'linear-gradient(135deg,#0d0d2e,#1a1a5e)',
    metro:'Line 1 · Hengshan Road', cost:0, costLabel:'Коктейль ¥80–120',
    time:'2–3 цаг', rating:'4.6', reviews:'600',
    desc:'Азийн хамгийн алдартай барийн нэгэн. "Drinking challenge" концепц. Тренди.',
    lfs:'LFS: 20:00-аас орох нь тохиромжтой.',
    arrivalGuide:[
      '🚇 Line 1 Hengshan Road буудал, Exit 2-аар гарна',
      '🚶 Dongping Road руу ~5 мин алхана (Dongping Road 5)',
      '🍹 3 давхар бар — 1F хар дарсны сан, 2F коктейль бар, 3F клуб',
      '⏰ 20:00–02:00, Пүрэв–Бямба хамгийн завгүй'
    ],
    tags:['night']
  },
  {
    id:'fairmont_jazz', name:'Fairmont Peace Hotel Jazz Bar', cat:'night', catLabel:'Шөнийн амьдрал',
    img:'https://images.unsplash.com/photo-1529458026081-439a0f7715b6?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🎷', bg:'linear-gradient(135deg,#2c1810,#6b3a2a)',
    metro:"Line 2/10 · Nanjing East Road", cost:0, costLabel:'Ундаа ¥150–300 · 21:00–23:30',
    time:'2 цаг', rating:'4.9', reviews:'500',
    desc:'1930-аад оноос тасралтгүй домогт жазз бар. Бүндийн Ар Деко барилган дотор.',
    lfs:'LFS: Шанхайн ганцхан тийм газар. Smart casual хувцас. Захиалга зайлшгүй.',
    arrivalGuide:[
      '🚇 Line 2/10 East Nanjing Road буудал, Exit 3-аар гарна',
      '🚶 Бүнд дагуж хойш ~3 мин, 20 Nanjing East Road (Fairmont Peace Hotel)',
      '🎷 Гол хаалгаар орж Oak Room Jazz Bar хайна — 1-р давхар',
      '⚠️ Smart casual хувцас ЗААВАЛ. Урьдчилан суудал захиалах хэрэгтэй',
      '⏰ Хөгжим 21:00–23:30, 19:30-аас суудал нь дүүрдэг'
    ],
    tags:['night','culture','photo']
  },
  {
    id:'bar_rouge', name:'Bar Rouge', cat:'night', catLabel:'Шөнийн амьдрал',
    img:'https://images.unsplash.com/photo-1597531922242-823dbfca45bd?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'💃', bg:'linear-gradient(135deg,#8b0000,#cc0000)',
    metro:"Line 2/10 · Nanjing East Road", cost:100, costLabel:'Entrance ¥100+ · Ундаа ¥100–200',
    time:'3–4 цаг', rating:'4.4', reviews:'1,200',
    desc:'Бүндийн 7-р давхарт алдарт бар & клуб. Оройн харалдаа дэлхийд мэдэгдсэн.',
    lfs:'LFS: 22:00-аас шуугиантай болно. Dress code байдаг тул хувцасаа бэлд.',
    arrivalGuide:[
      '🚇 Line 2/10 East Nanjing Road буудал, Exit 3-аар гарна',
      '🚶 Бүнд дагуж өмнө зүгт ~5 мин, Bund 18 барилга (7F)',
      '💃 Барилгын гол хаалгаар орж лифтээр 7-р давхарт гарна',
      '⚠️ Dress code ЗААВАЛ — давчуу хувцас гэж биш, хямд хувцас бол оруулахгүй',
      '⏰ 18:00–04:00, 22:00-аас клуб горим'
    ],
    tags:['night','photo']
  },
  {
    id:'shelter_club', name:'Shelter (Underground)', cat:'night', catLabel:'Шөнийн амьдрал',
    img:'https://images.unsplash.com/photo-1652453738269-641352be3fbc?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🎵', bg:'linear-gradient(135deg,#0a0a0a,#1a1a1a)',
    metro:'Line 1 · Changshu Road', cost:50, costLabel:'Entrance ¥50–100',
    time:'3–5 цаг', rating:'4.5', reviews:'800',
    desc:'Хуучин цөмийн дайны бункерт байрлах Underground клуб. Хамгийн техно, дугуйрсан уур амьсгал.',
    lfs:'LFS: Шанхайн андерграунд хөгжмийн дүүрэг. Гурав дахь давхар гэж заримдаа хааддаг.',
    arrivalGuide:[
      '🚇 Line 1 Changshu Road буудал, Exit 1-ээр гарна',
      '🚶 Yongfu Road руу ~3 мин алхана (5 дугаар)',
      '🎵 Газар доорхи орц — жижиг тэмдэг харагдана, орохдоо шат буун',
      '⚠️ Хаалга 23:00-аас нэгддэг — эрт очвол хаалттай байж магадгүй',
      '⏰ Пүрэв–Бямба 22:00–04:00'
    ],
    tags:['night']
  },
  {
    id:'vue_bar', name:'Vue Bar (Grand Hyatt)', cat:'night', catLabel:'Шөнийн амьдрал',
    img:'https://images.unsplash.com/photo-1612756336279-b9eb5b6b71d9?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌃', bg:'linear-gradient(135deg,#1a0533,#2d0a5e)',
    metro:'Line 2 · Lujiazui', cost:0, costLabel:'Ундаа ¥150–250',
    time:'2 цаг', rating:'4.6', reviews:'700',
    desc:'Grand Hyatt-ын 87-р давхарт дугуй хэлбэртэй дээврийн бар. Jin Mao-гийн дотор.',
    lfs:'LFS: Flair-аас арай хямд. Shanghai Tower, SWFC дотроос харагдана.',
    arrivalGuide:[
      '🚇 Line 2 Lujiazui буудал, Exit 3-аар гарна',
      '🚶 Jin Mao Tower руу ~200м алхана (88 Century Avenue)',
      '🌃 Grand Hyatt-ын гол хаалгаар орж 87F Vue Bar хайна',
      '⏰ 17:30–01:00, захиалга зохимжтой'
    ],
    tags:['night','photo']
  },
  {
    id:'long_bar', name:'Long Bar (Waldorf Astoria)', cat:'night', catLabel:'Шөнийн амьдрал',
    img:'https://images.unsplash.com/photo-1563678041155-ddb6ca6296af?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🍾', bg:'linear-gradient(135deg,#1a0a00,#2a1500)',
    metro:"Line 2/10 · Nanjing East Road", cost:0, costLabel:'Коктейль ¥150–300',
    time:'2 цаг', rating:'4.7', reviews:'400',
    desc:'1930-иад оны Waldorf Astoria дотор 30м урт бар. Art Deco, vintage коктейль.',
    lfs:'LFS: Бүндийн хамгийн элэгдсэн тансаг бар. Хуучин Шанхайн уур амьсгал.',
    arrivalGuide:[
      '🚇 Line 2/10 East Nanjing Road буудал, Exit 3-аар гарна',
      '🚶 Бүнд дагуж өмнө зүгт ~2 мин, 2 Zhongshan East 1st Road (Waldorf Astoria)',
      '🍾 Үүдний гол хаалгаар орж Long Bar хайна — 30м урт бар',
      '⏰ 16:00–02:00'
    ],
    tags:['night','culture']
  },
  {
    id:'mint_club', name:'MINT (Rooftop Club)', cat:'night', catLabel:'Шөнийн амьдрал',
    img:'https://images.unsplash.com/photo-1690471713214-6e26969b89ed?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🎶', bg:'linear-gradient(135deg,#003300,#006600)',
    metro:'Line 2 · Nanjing West Road', cost:100, costLabel:'Entrance ¥100–200',
    time:'3–5 цаг', rating:'4.3', reviews:'500',
    desc:'Нанжин баруун гудамжин дахь дээврийн клуб. DJ, коктейль, хотын панорама.',
    lfs:'LFS: Bar Rouge-тай ойролцоо. 23:00-аас шуугиантай болно.',
    arrivalGuide:[
      '🚇 Line 2 Nanjing West Road буудал, Exit 1-ээр гарна',
      '🚶 Fumin Road дагуж хойш ~5 мин (318 Fumin Road)',
      '🎶 Лифтээр дээд давхарт — дээврийн клуб, хотын панорама',
      '⚠️ Dress code байдаг. Entrance ¥100–200',
      '⏰ 22:00–04:00, Пүрэв–Бямба'
    ],
    tags:['night']
  },

  // ══════════════════════════════════════════════
  // 🚌  ӨДРИЙН АЯЛАЛ — Day Trips
  // ══════════════════════════════════════════════
  {
    id:'suzhou', name:'Suzhou (1 hr train)', cat:'daytrip', catLabel:'Өдрийн аялал',
    img:'https://images.unsplash.com/photo-1614765437824-f5433016b7b6?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏛', bg:'linear-gradient(135deg,#1a3a5c,#2e6090)',
    metro:'Hongqiao Station → Suzhou North (35 min)', cost:120, costLabel:'Train ¥54–120',
    time:'Бүтэн өдөр', rating:'4.8', reviews:'80,000',
    desc:'"Зүүн Дорнодын Венец". Классик Хятад цэцэрлэг, сувагт ус, Humble Administrator\'s Garden.',
    lfs:'LFS: Шанхайгаас хамгийн хялбар өдрийн аялал. Train G буюу D-ээр ор.',
    arrivalGuide:[
      '🚇 Metro Line 2/10-оор Hongqiao Railway Station (虹桥火车站) хүрнэ — Exit 5/11',
      '🚆 G-поезд (高铁) эсвэл D-поезд авна: Suzhou Station (苏州站) эсвэл Suzhou North (苏州北)',
      '⏱ Зорчих хугацаа: 35–55 минут | Тасалбар: ¥54–120 (анги сонгоно)',
      '🚕 Suzhou Station-аас такси эсвэл автобус 1-р шугамаар Humble Administrator\'s Garden хүрнэ (~15 мин)',
      '📱 12306.cn эсвэл Trip.com-оор тасалбар захиалах — өдрийн өмнө захиал',
      '⚠️ Буцах тасалбарыг мөн урьдчилан авах нь зохимжтой'
    ],
    tags:['daytrip','culture','photo','tradition']
  },
  {
    id:'hangzhou', name:'Hangzhou & West Lake (1.5 hr)', cat:'daytrip', catLabel:'Өдрийн аялал',
    img:'https://images.unsplash.com/photo-1558422719-d6982435e4e4?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏞', bg:'linear-gradient(135deg,#004d40,#00796b)',
    metro:'Hongqiao Station → Hangzhou East (1 hr)', cost:200, costLabel:'Train ¥73–200',
    time:'Бүтэн өдөр', rating:'4.8', reviews:'100,000',
    desc:'Баруун нуур, цайны таримал, шинэ хот — Хятадын хамгийн гоё хот гэж алдаршсан.',
    lfs:'LFS: Дотор боомтоос буцаад хийн цай (Longjing) авахаа мартуузай.',
    arrivalGuide:[
      '🚇 Metro Line 2/10-оор Hongqiao Railway Station хүрнэ — Exit 5/11',
      '🚆 G-поезд авна: Hangzhou East Station (杭州东站) — 1 цаг',
      '⏱ Зорчих хугацаа: 60 минут | Тасалбар: ¥73–200',
      '🚇 Hangzhou East-аас Metro Line 1-ээр Longxiangqiao буудал руу (~30 мин) — West Lake ойролцоо',
      '📱 12306.cn эсвэл Trip.com-оор тасалбар захиалах',
      '⚠️ Буцах поезд 20:00-аас өмнө авах — сүүлийн поезд дүүрдэг'
    ],
    tags:['daytrip','culture','photo','relax']
  },
  {
    id:'wuzhen', name:'Wuzhen Water Town', cat:'daytrip', catLabel:'Өдрийн аялал',
    img:'https://images.unsplash.com/photo-1648530040338-c977397965ea?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'⛵', bg:'linear-gradient(135deg,#1a1a2e,#2d2d5e)',
    metro:'Bus from Hongqiao → Wuzhen (2 hr)', cost:150, costLabel:'¥150 (оролт)',
    time:'Бүтэн өдөр', rating:'4.7', reviews:'40,000',
    desc:'Хамгийн сайн хадгалагдсан усны эртний хот. Шөнө ч нээлттэй — гэрэлтэй үзэмж.',
    lfs:'LFS: Zhujiajiao-оос том, тохижсон. Шөнийн хувилбар онцгой гоё.',
    arrivalGuide:[
      '🚌 Hongqiao Bus Station (虹桥长途汽车站) эсвэл Shanghai South Station (上海南站)-аас автобус авна',
      '🚇 Эхлээд: Metro Line 10/17-оор Hongqiao Bus Station хүрнэ',
      '⏱ Автобусны хугацаа: ~2–2.5 цаг | Тасалбар: ¥60–80',
      '🏘 Автобус West Scenic Area (西栅) эсвэл East Scenic Area (东栅) дэргэд зогсоно',
      '🎫 Хотод орох тасалбар ¥150 (West + East хоёулаа)',
      '⚠️ Буцах сүүлийн автобус 17:00–18:00 орчим — хоцрохгүй байх'
    ],
    tags:['daytrip','tradition','photo']
  },
  {
    id:'tongli', name:'Tongli Ancient Town', cat:'daytrip', catLabel:'Өдрийн аялал',
    img:'https://images.unsplash.com/photo-1602997009277-72a4121380ac?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏮', bg:'linear-gradient(135deg,#5d4037,#8d6e63)',
    metro:'Train + Bus (Suzhou direction, 1.5 hr)', cost:100, costLabel:'¥100 (оролт)',
    time:'Бүтэн өдөр', rating:'4.6', reviews:'20,000',
    desc:'Zhujiajiao-оос илүү жижиг, хүнгүй усны хот. Жинхэнэ уламжлалт амьдрал.',
    lfs:'LFS: Zhujiajiao шиг жуулчинд нэрлэгдээгүй. Харин илүү жинхэнэ.',
    arrivalGuide:[
      '🚇 Metro Line 2/10-оор Hongqiao Railway Station хүрнэ',
      '🚆 Эхлээд Suzhou Station руу поезд авна (35 мин, ¥54)',
      '🚌 Suzhou North Bus Station-аас Tongli-руу автобус авна (~45 мин, ¥9)',
      '⏱ Нийт зорчих хугацаа: ~1.5–2 цаг Шанхайгаас',
      '🎫 Tongli-д орох тасалбар ¥100 (завь мөн орно)',
      '⚠️ Суживаас нийлүүлж нэг өдөрт хоёр хот үзэж болно'
    ],
    tags:['daytrip','hidden','tradition']
  },
  {
    id:'sheshan', name:'Sheshan National Forest Park', cat:'daytrip', catLabel:'Өдрийн аялал',
    img:'https://images.unsplash.com/photo-1713552422841-21ee541b1d8f?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🌲', bg:'linear-gradient(135deg,#1b5e20,#33691e)',
    metro:'Line 9 · Sheshan', cost:30, costLabel:'¥30',
    time:'Хагас өдөр', rating:'4.4', reviews:'12,000',
    desc:'Шанхайн ойн байгалийн цэцэрлэг. Уулын оройд Есүсийн гэр бүлийн Христийн сүм.',
    lfs:'LFS: Хотоос ойрхон байгаль. Хаврын цэцэглэлтийн үед онцгой.',
    arrivalGuide:[
      '🚇 Metro Line 9-оор Sheshan (佘山) буудал хүрнэ — ~50 минут хотоос',
      '🚶 Exit 1-аас парк хаалга руу ~500м алхана',
      '🎫 Ойн парк ¥30, Шошан Байгалийн нөөц газар тусдаа тасалбартай',
      '⛪ Оройн уулэн дээрх Католик чийрийн галыг үзэхийн тулд 30 мин явган авиралт хийнэ',
      '⏰ Өдөр бүр 06:00–17:00'
    ],
    tags:['daytrip','relax','family']
  },
  {
    id:'nanjing_trip', name:'Nanjing (1 hr 30 min train)', cat:'daytrip', catLabel:'Өдрийн аялал',
    img:'https://images.unsplash.com/photo-1550590947-302613e51d1a?auto=format&fit=crop&w=400&h=280&q=80',
    icon:'🏯', bg:'linear-gradient(135deg,#8b0000,#b22222)',
    metro:'Hongqiao → Nanjing South (1h 30m)', cost:200, costLabel:'Train ¥134–200',
    time:'Бүтэн өдөр', rating:'4.7', reviews:'60,000',
    desc:'Хятадын түүхийн тэмдэгт. Sun Yat-sen мавзолей, Нанжин Нуур, Конфуцийн сүм.',
    lfs:'LFS: 2 шөнийн аялалд хамгийн сайн. Гэхдээ нэг өдөрт үндсэн газрыг үзэж болно.',
    arrivalGuide:[
      '🚇 Metro Line 2/10-оор Hongqiao Railway Station хүрнэ — Exit 5/11',
      '🚆 G-поезд авна: Nanjing South Station (南京南站) — 1 цаг 15–30 мин',
      '⏱ Зорчих хугацаа: 75–90 минут | Тасалбар: ¥134–200',
      '🚇 Nanjing South-аас Metro Line 3-аар Nanjing South жишээлбэл Mausoleum буудал руу (~30 мин)',
      '🏯 Үндсэн газрууд: Sun Yat-sen Mausoleum (中山陵), Confucius Temple (夫子庙), Purple Mountain',
      '📱 12306.cn-оор тасалбар урьдчилан захиал — амралтын өдрүүдэд эрт дүүрдэг'
    ],
    tags:['daytrip','culture','history']
  }

]; // end window.PLACES

// Travel time estimates between place categories (minutes)
// Used for realistic itinerary scheduling
window.TRAVEL_TIMES = {
  // [from_cat][to_cat] = { metro: min, walk: min, taxi: min }
  // Default if not found: metro 20, walk 35, taxi 15
  same_area: { metro: 5,  walk: 15, taxi: 8  },
  adjacent:  { metro: 15, walk: 35, taxi: 12 },
  cross_city:{ metro: 30, walk: 90, taxi: 22 },
  daytrip:   { metro: 0,  walk: 0,  taxi: 0, bus: 60 }
};

// Place coordinates (approximate) for distance grouping
window.PLACE_AREAS = {
  // Area groups: places in same area = same_area travel
  bund_area:    ['bund','yu_garden','chenghuang_temple','nanxiang','yuyuan_bazaar','yuyuan_food','yuyuan_bazaar_shop','da_hu_chun','nanjing_road','rockbund_art','long_bar','fairmont_jazz'],
  pudong:       ['oriental_pearl','shanghai_tower','jin_mao','swfc','lujiazui','ifc_mall','super_brand_mall','flair_bar','vue_bar'],
  peoples_sq:   ['shanghai_museum','urban_planning','people_park','peoples_square','jia_jia','nanjing_west','plaza66'],
  jingan:       ['jingan_temple','jing_an_sculpture','noodle_bull','commune_social','sober_company','mint_club','nanjing_west'],
  french_conc:  ['former_french','xintiandi','fuxing_park','sinan_mansions','tianzifang','speak_low','wukang_road','anfu_road','lost_heaven','yang_guofu'],
  west_bund:    ['west_bund','long_museum_west','yuz_museum','expo_greenhouse'],
  xujiahui:     ['grand_gateway','xujiahui_electronics'],
  huaihai:      ['huaihai_road','iapm_mall','din_tai_fung'],
  daytrips:     ['suzhou','hangzhou','wuzhen','tongli','sheshan','nanjing_trip','zhujiajiao','chongming'],
};

