/* ═══════════════════════════════════════════════════════
   LFS SHANGHAI — FOOD DATABASE
   Буудал + Attraction бүрт хоол, кофе, өглөөний газрууд
   ═══════════════════════════════════════════════════════ */

window.FOOD_DB = {

  /* ── HOTELS ─────────────────────────────────────────── */
  hotels: [
    {
      id: 'renaissance',
      name: 'Renaissance Shanghai Lujiazui Hotel',
      nameShort: 'Renaissance Lujiazui',
      metro: 'Lujiazui Station · Line 2',
      places: [
        { name:"Yang's Dumpling (小杨生煎 东方明珠店)", walk:5, metro:"Lujiazui Station, Exit 1", price:30, hours:"08:30–20:30", menu:"photo", desc:"Хрустэл ёроолтой, шөлтэй шарсан боов — Шанхайн хамгийн алдартай.", keyword:"小杨生煎 (东方明珠店)", meal:"breakfast" },
        { name:"Wagas (沃歌斯 陆家嘴环路店)", walk:6, metro:"Lujiazui Station, Exit 1", price:75, hours:"08:00–20:30", menu:"yes", desc:"Западын хэв маягийн эрүүл хоол, яйц, авокадо, шүүс.", keyword:"Wagas沃歌斯 (陆家嘴环路店)", meal:"breakfast" },
        { name:"Tims Coffee (天好咖啡 东方明珠店)", walk:6, metro:"Lujiazui Station, Exit 1", price:35, hours:"07:30–21:00", menu:"yes", desc:"Канадын кофе брэнд — бэйгл, сэндвич, өглөөний сет.", keyword:"Tims天好咖啡 (东方明珠店)", meal:"breakfast" },
        { name:"McDonald's (麦当劳 陆家嘴地铁站店)", walk:8, metro:"Lujiazui Station, Exit 2", price:25, hours:"06:30–22:00", menu:"yes", desc:"Метроны станцанд байрлах — McMuffin, кофе хурдан авах.", keyword:"麦当劳 (陆家嘴地铁站店)", meal:"breakfast" },
        { name:"Baker & Spice (上海国金中心商场店)", walk:10, metro:"Lujiazui Station, Exit 6", price:60, hours:"08:00–22:00", menu:"yes", desc:"Европын хэв маягийн бэйкери — зуурмагийн нан, croissant.", keyword:"Baker & Spice (上海国金中心商场店)", meal:"breakfast" },
        { name:"Starbucks (星巴克 滨江大道店)", walk:3, metro:"Lujiazui Station, Exit 1", price:40, hours:"07:30–22:00", menu:"yes", desc:"Бүндийн харагдах байршилтай — өглөөний панорама + кофе.", keyword:"星巴克 (滨江大道店)", meal:"coffee" },
        { name:"Manner Coffee (上海国金中心商场店)", walk:8, metro:"Lujiazui Station, Exit 6", price:22, hours:"07:30–21:00", menu:"yes", desc:"Шанхайн дуртай specialty кофе — хямд, чанартай.", keyword:"Manner Coffee (上海国金中心商场店)", meal:"coffee" },
        { name:"Luckin Coffee (瑞幸咖啡 上海览海国际广场店)", walk:10, metro:"Lujiazui Station, Exit 4", price:20, hours:"07:00–20:00", menu:"yes", desc:"App дээр захиалж алаад аваад явна — хамгийн хурдан.", keyword:"瑞幸咖啡 (上海览海国际广场店)", meal:"coffee" }
      ]
    },
    {
      id: 'yunrui',
      name: 'Yunrui Hotel Zhongshan Park',
      nameShort: 'Yunrui (Zhongshan Park)',
      metro: 'Zhongshan Park Station · Line 2/3/4',
      places: [
        { name:"Lao Sheng Xing (老盛兴汤包馆 定西店)", walk:5, metro:"Zhongshan Park Station, Exit 5", price:20, hours:"06:00–20:00", menu:"photo", desc:"Уламжлалт Шанхайн таанбао, шэнцзяньбао, scallion нудел.", keyword:"老盛兴汤包馆 (定西店)", meal:"breakfast" },
        { name:"Babi Bun (巴比鲜肉包 定西路店)", walk:2, metro:"West Yan'an Road Station, Exit 1", price:8, hours:"05:30–19:30", menu:"photo", desc:"Шанхайн хамгийн алдартай хурдан өглөөний мантуу + шар буурцгийн сүү.", keyword:"巴比鲜肉包 (定西路店)", meal:"breakfast" },
        { name:"Yonghe King (永和大王 中山公园店)", walk:10, metro:"Zhongshan Park Station, Exit 2", price:25, hours:"06:00–22:00", menu:"yes", desc:"Тайваны хэв маягийн сохор хурга, шар буурцгийн сүү, youtiao.", keyword:"永和大王 (中山公园店)", meal:"breakfast" },
        { name:"Qiuxiage Dim Sum (秋霞阁 定西路店)", walk:7, metro:"Zhongshan Park Station, Exit 5", price:15, hours:"06:30–19:30", menu:"photo", desc:"Гар хийцийн ногооны болон улаан буурцгийн мантуу — орон нутгийн дуртай.", keyword:"秋霞阁 (定西路店)", meal:"breakfast" },
        { name:"Fuchun Xiaolong (富春小笼馆 愚园路店)", walk:12, metro:"Zhongshan Park Station, Exit 7", price:35, hours:"06:30–20:30", menu:"photo", desc:"Хуучин Шанхайн уур амьсгалтай домогт таанбао газар.", keyword:"富春小笼馆 (愚园路店)", meal:"breakfast" },
        { name:"Manner Coffee (延安西路地铁站店)", walk:8, metro:"West Yan'an Road Station, Exit 1", price:20, hours:"07:00–19:30", menu:"yes", desc:"Метроны станцанд байрлах — specialty flat white аваад явна.", keyword:"Manner Coffee (延安西路地铁站店)", meal:"coffee" },
        { name:"Starbucks (星巴克 长宁龙之梦店)", walk:10, metro:"Zhongshan Park Station, Exit 2", price:40, hours:"07:00–22:00", menu:"yes", desc:"Том, тохилог — croissant, эмж, стандарт эспрессо.", keyword:"星巴克咖啡 (长宁龙之梦店)", meal:"coffee" },
        { name:"Manner Coffee (长宁来福士烘焙店)", walk:11, metro:"Zhongshan Park Station, Exit 3", price:22, hours:"07:30–22:00", menu:"yes", desc:"Raffles City дотор — craft кофе + шинэхэн бэйкери.", keyword:"Manner Coffee (长宁来福士烘焙店)", meal:"coffee" }
      ]
    },
    {
      id: 'home-inn',
      name: 'Home Inn Selected (Expo Park)',
      nameShort: 'Home Inn (Expo Park)',
      metro: 'Houtan Station · Line 7',
      places: [] /* ← дата ирэхэд нэмнэ */
    },
    {
      id: 'yitel',
      name: 'Yitel Hotel (Pudian Road)',
      nameShort: 'Yitel (Pudian Road)',
      metro: 'Pudian Road Station · Line 4/6',
      places: [] /* ← дата ирэхэд нэмнэ */
    }
  ],

  /* ── ATTRACTIONS ─────────────────────────────────────── */
  /* placeIds: planner дахь place.id-уудтай тохируулсан */
  attractions: [
    {
      key: 'bund',
      name: 'The Bund (外滩)',
      placeIds: ['bund', 'fairmont_jazz', 'huangpu_river', 'south_bund', 'mr_mrs_bund', 'long_bar', 'bar_rouge'],
      places: [
        { name:"Shanghai Lao Lao (外滩姥姥家常菜)", walk:5, metro:"East Nanjing Road Station, Exit 2", price:85, hours:"11:00–14:00, 17:00–21:30", menu:"photo", desc:"Тухтай гэр ахуйн хоол — чихэрлэг гахайн өвдөгний мах.", keyword:"外滩姥姥家常菜", meal:"lunch" },
        { name:"Lost Heaven Yunnan (花马天堂 外滩店)", walk:8, metro:"East Nanjing Road Station, Exit 3", price:180, hours:"11:30–14:00, 17:30–22:30", menu:"yes", desc:"Юнань мужийн үндэстний хоол — Англи менютэй, уур амьсгал гайхалтай.", keyword:"花马天堂云南餐厅 (外滩店)", meal:"lunch" },
        { name:"Yang's Dumpling (小杨生煎 河南中路店)", walk:7, metro:"East Nanjing Road Station, Exit 7", price:30, hours:"06:30–20:30", menu:"photo", desc:"Хрустэл ёроолтой шарсан таанбао — хурдан, хямд, амттай.", keyword:"小杨生煎 (河南中路店)", meal:"lunch" },
        { name:"Starbucks Reserve (星巴克臻选 益丰外滩源店)", walk:6, metro:"East Nanjing Road Station, Exit 6", price:50, hours:"07:00–22:00", menu:"yes", desc:"Хуучин тоосгон барилган дотор — premium Reserve кофе.", keyword:"星巴克臻选 (益丰外滩源店)", meal:"coffee" },
        { name:"% Arabica (上海外滩源店)", walk:7, metro:"East Nanjing Road Station, Exit 6", price:45, hours:"08:00–20:00", menu:"yes", desc:"Киото гаралтай минималист specialty кофе шоп.", keyword:"%Arabica (上海外滩源店)", meal:"coffee" },
        { name:"Mr & Mrs Bund (外滩18号店)", walk:4, metro:"East Nanjing Road Station, Exit 2", price:650, hours:"17:30–23:00", menu:"yes", desc:"Дэлхийд алдартай орчин үеийн Францын хоол — Пудунгийн панорама.", keyword:"Mr & Mrs Bund (外滩18号店)", meal:"dinner" },
        { name:"Captain Bar (船长酒吧餐厅)", walk:5, metro:"East Nanjing Road Station, Exit 2", price:160, hours:"17:00–02:00", menu:"yes", desc:"Дээвэр дээрх бар — Бүнд харагдах тохилог хямд оройн хоол.", keyword:"船长酒吧 (福州路店)", meal:"dinner" }
      ]
    },
    {
      key: 'yu-garden',
      name: 'Yu Garden (豫园)',
      placeIds: ['yu_garden', 'yuyuan_bazaar', 'yuyuan_bazaar_shop', 'yuyuan_food', 'chenghuang_temple', 'nanxiang'],
      places: [
        { name:"Nanxiang Steamed Bun (南翔馒头店)", walk:2, metro:"Yuyuan Garden Station, Exit 1", price:90, hours:"08:00–21:30", menu:"photo", desc:"Шанхайн таанбао-гийн эх нутаг — зайны дэлгүүрт байрлах домогт газар.", keyword:"南翔馒头店 (豫园店)", meal:"lunch" },
        { name:"Shanghai Lao Fandian (上海老饭店)", walk:3, metro:"Yuyuan Garden Station, Exit 1", price:200, hours:"10:00–22:00", menu:"yes", desc:"100 жилийн түүхтэй — Eight-Treasure Duck шиг уламжлалт хоол.", keyword:"上海老饭店 (豫园店)", meal:"lunch" },
        { name:"Dahuchun (大壶春)", walk:6, metro:"Yuyuan Garden Station, Exit 7", price:30, hours:"08:00–21:00", menu:"photo", desc:"Michelin зөвлөмжтэй — зузаан арьстай, доороо хрустэл шарсан бао.", keyword:"大壶春 (四川南路店)", meal:"lunch" },
        { name:"Huxin Pavilion Teahouse (湖心亭茶楼)", walk:1, metro:"Yuyuan Garden Station, Exit 1", price:120, hours:"08:30–21:00", menu:"yes", desc:"Лотосын цөөрөм дээр буй Шанхайн хамгийн эртний цайны газар.", keyword:"湖心亭茶楼", meal:"coffee" },
        { name:"Starbucks (星巴克 豫园商城店)", walk:2, metro:"Yuyuan Garden Station, Exit 1", price:50, hours:"08:00–21:30", menu:"yes", desc:"Минь-Чин гүрний хэв маягийн байшинд байрлах Starbucks.", keyword:"星巴克 (豫园商城店)", meal:"coffee" },
        { name:"Lu Bo Lang (绿波廊)", walk:2, metro:"Yuyuan Garden Station, Exit 1", price:240, hours:"07:00–22:00", menu:"yes", desc:"Дэлхийн удирдагчид зочилсон — нарийн боов, уламжлалт Шанхайн хоол.", keyword:"绿波廊 (豫园店)", meal:"dinner" },
        { name:"Dexing Hall (德兴馆)", walk:9, metro:"Yuyuan Garden Station, Exit 3", price:55, hours:"10:00–22:00", menu:"photo", desc:"Хуучин хороолол дахь — гахайн махтай шөлт нудел.", keyword:"德兴馆 (广东路店)", meal:"dinner" }
      ]
    },
    {
      key: 'lujiazui',
      name: 'Shanghai Tower / Lujiazui (上海中心大厦)',
      placeIds: ['shanghai_tower', 'oriental_pearl', 'flair_bar', 'lujiazui', 'jin_mao', 'swfc', 'ifc_mall', 'super_brand_mall', 'vue_bar'],
      places: [
        { name:"Din Tai Fung (鼎泰丰 上海国金中心店)", walk:4, metro:"Lujiazui Station, Exit 6", price:160, hours:"11:00–14:30, 17:00–21:30", menu:"yes", desc:"Олон улсад алдартай — нарийн таанбао, маш сайн үйлчилгээ.", keyword:"鼎泰丰 (上海国金中心商场店)", meal:"lunch" },
        { name:"Jade Garden (翠园 国金中心店)", walk:4, metro:"Lujiazui Station, Exit 6", price:260, hours:"11:00–14:30, 17:30–21:30", menu:"yes", desc:"Хүрхрийн гялбаатай гахайн хавиргатай Кантоны хоол.", keyword:"翠园 (上海国金中心商场店)", meal:"lunch" },
        { name:"Charme Restaurant (港丽餐厅 正大广场店)", walk:6, metro:"Lujiazui Station, Exit 1", price:115, hours:"11:00–21:30", menu:"photo", desc:"Хонконгийн кафе — honey toast box, шарсан мах.", keyword:"港丽餐厅 (正大广场店)", meal:"lunch" },
        { name:"Manner Coffee (上海中心大厦店)", walk:1, metro:"Lujiazui Station, Exit 6", price:20, hours:"07:30–20:00", menu:"yes", desc:"Shanghai Tower-ийн доторх — шууд авах specialty кофе.", keyword:"Manner Coffee (上海中心大厦店)", meal:"coffee" },
        { name:"Peet's Coffee (皮爷咖啡 国金中心店)", walk:4, metro:"Lujiazui Station, Exit 6", price:45, hours:"07:30–21:30", menu:"yes", desc:"Калифорнийн premium кофе — IFC молл дотор.", keyword:"Peet's Coffee皮爷咖啡 (上海国金中心商场店)", meal:"coffee" },
        { name:"Paradise Dynasty (乐天皇朝 上海中心大厦店)", walk:1, metro:"Lujiazui Station, Exit 6", price:110, hours:"11:00–14:30, 17:00–21:30", menu:"yes", desc:"8 өнгийн таанбао нэг торонд — нэг нэгээр нь амтлаарай.", keyword:"乐天皇朝 (上海中心大厦店)", meal:"dinner" },
        { name:"Morton's Steakhouse (莫尔顿牛排馆 国金中心店)", walk:4, metro:"Lujiazui Station, Exit 6", price:680, hours:"17:00–22:00", menu:"yes", desc:"Дэлхийд алдартай Америк стейк хаус — Луцзяцзуйгийн панорама.", keyword:"莫尔顿牛排馆 (上海国金中心商场店)", meal:"dinner" }
      ]
    },
    {
      key: 'xintiandi',
      name: 'Xintiandi (新天地)',
      placeIds: ['xintiandi', 'fuxing_park', 'speak_low', 'sinan_mansions', 'huaihai_road', 'iapm_mall', 'sober_company', 'heji_crab', 'west_bund', 'long_museum_west', 'yuz_museum', 'longhua_temple', 'expo_greenhouse', 'china_art_museum'],
      places: [
        { name:"Crystal Jade (翡翠酒家 新天地店)", walk:3, metro:"Xintiandi Station, Exit 6", price:190, hours:"11:00–14:30, 17:00–21:30", menu:"yes", desc:"Шикүмэн байшинд байрлах — нарийн Кантоны dim sum.", keyword:"翡翠酒家 (新天地店)", meal:"lunch" },
        { name:"Simply Thai (天泰餐厅 新天地店)", walk:2, metro:"Xintiandi Station, Exit 6", price:150, hours:"11:00–22:00", menu:"yes", desc:"Урт жилийн туршлагатай Тайландын хоол — Англи хэлтэй үйлчлэгч.", keyword:"Simply Thai天泰 (新天地店)", meal:"lunch" },
        { name:"Din Tai Fung (鼎泰丰 新天地店)", walk:3, metro:"Xintiandi Station, Exit 6", price:165, hours:"11:00–15:00, 17:00–22:00", menu:"yes", desc:"Шилэн гал тогоотой — таанбао хийж буйг харж болно.", keyword:"鼎泰丰 (新天地店)", meal:"lunch" },
        { name:"Blue Bottle Coffee (蓝瓶咖啡 新天地店)", walk:3, metro:"Xintiandi Station, Exit 1", price:45, hours:"08:00–21:00", menu:"yes", desc:"Хуучин тоосгон хана + орчин үеийн minimalist дизайн.", keyword:"蓝瓶咖啡 (新天地店)", meal:"coffee" },
        { name:"Green & Safe (新天地店)", walk:4, metro:"Xintiandi Station, Exit 2", price:90, hours:"08:00–22:30", menu:"yes", desc:"Органик маркет кафе — шинэ салат, бэйкери, эспрессо.", keyword:"Green & Safe (新天地店)", meal:"coffee" },
        { name:"The Refinery Gastropub (新天地店)", walk:2, metro:"Xintiandi Station, Exit 6", price:185, hours:"11:00–23:30", menu:"yes", desc:"Гадна тавцантай — гриль, craft пиво, Западын хоол.", keyword:"The Refinery新天地店", meal:"dinner" },
        { name:"El Bodegon Steakhouse (马当路店)", walk:4, metro:"South Huangpi Road Station, Exit 2", price:210, hours:"11:30–14:00, 17:00–22:30", menu:"yes", desc:"Аргентины стейк хаус — сочный таслагдсан мах, улаан дарс.", keyword:"El Bodegon (马当路店)", meal:"dinner" }
      ]
    },
    {
      key: 'tianzifang',
      name: 'Tianzifang / French Concession (田子坊)',
      placeIds: ['tianzifang', 'wukang_road', 'former_french', 'anfu_road', 'm50', 'power_station_art'],
      places: [
        { name:"Lotus Land Indian (莲池印度餐厅 田子坊店)", walk:2, metro:"Dapuqiao Station, Exit 1", price:125, hours:"11:00–22:00", menu:"yes", desc:"Гудамжны лабиринт дотор — butter chicken, garlic naan.", keyword:"莲池印度餐厅 (田子坊店)", meal:"lunch" },
        { name:"Teddy Bear Thai (泰迪之家 田子坊店)", walk:1, metro:"Dapuqiao Station, Exit 1", price:110, hours:"11:00–21:30", menu:"yes", desc:"Баавгайн тоглоомоор дүүрэн Тайландын хоол — pineapple fried rice.", keyword:"泰迪之家泰式料理 (田子坊店)", meal:"lunch" },
        { name:"Cha's Restaurant (查餐厅 思南路店)", walk:8, metro:"Dapuqiao Station, Exit 4", price:85, hours:"11:00–21:30", menu:"photo", desc:"Ретро Хонконгийн диний — scrambled egg, сүүн цай.", keyword:"查餐厅 (思南路店)", meal:"lunch" },
        { name:"Café Dan (丹咖啡)", walk:1, metro:"Dapuqiao Station, Exit 1", price:65, hours:"10:00–18:00", menu:"yes", desc:"Гудамжны тайван булан — siphon кофе, Японы чихэр.", keyword:"丹咖啡", meal:"coffee" },
        { name:"Manner Coffee (日月光中心广场店)", walk:3, metro:"Dapuqiao Station, Exit 2", price:20, hours:"07:30–22:00", menu:"yes", desc:"Молл дотор — хурдан, хямд, тогтмол чанартай.", keyword:"Manner Coffee (日月光中心广场店)", meal:"coffee" },
        { name:"Co. Cheese Melt Bar (建国西路店)", walk:8, metro:"Dapuqiao Station, Exit 4", price:90, hours:"11:30–22:30", menu:"yes", desc:"Зуурсан бяслагтай хайрсан сэндвич — Хунан гахайн махтай.", keyword:"Co.Cheese Melt Bar (建国西路店)", meal:"dinner" },
        { name:"Bellagio Cafe (鹿港小镇 日月光店)", walk:3, metro:"Dapuqiao Station, Exit 2", price:115, hours:"11:00–21:30", menu:"photo", desc:"Тайваны диний — Three-Cup Chicken, манго мөс.", keyword:"鹿港小镇 (日月光中心广场店)", meal:"dinner" }
      ]
    },
    {
      key: 'peoples-square',
      name: "People's Square / Shanghai Museum (人民广场)",
      placeIds: ['peoples_square', 'shanghai_museum', 'people_park', 'jia_jia', 'urban_planning', 'century_park', 'din_tai_fung', 'hai_di_lao', 'spicy_joint', 'yang_guofu', 'lost_heaven', 'coffee_compound', 'qingpu_mosque'],
      places: [
        { name:"Barbarossa Restaurant (芭芭露莎)", walk:3, metro:"People's Square Station, Exit 9", price:170, hours:"11:00–23:00", menu:"yes", desc:"Нуурт тавьсан Мароккийн шилэн павильон — Газар дундын тэнгисийн хоол.", keyword:"Barbarossa芭芭露莎餐厅", meal:"lunch" },
        { name:"Jia Jia Tang Bao (佳家汤包 黄河路店)", walk:6, metro:"People's Square Station, Exit 8", price:45, hours:"06:30–20:30", menu:"photo", desc:"Хялгасан арьс, хайрцаг дүүрэн шөл — хамгийн жинхэнэ таанбао.", keyword:"佳家汤包 (黄河路店)", meal:"lunch" },
        { name:"Yang's Dumpling (小杨生煎 黄河路店)", walk:6, metro:"People's Square Station, Exit 8", price:25, hours:"06:30–21:30", menu:"photo", desc:"Дундаж зэрэглэлийн гудамжны хоол — хрустэл шарсан бао.", keyword:"小杨生煎 (黄河路店)", meal:"lunch" },
        { name:"Seesaw Coffee (来福士广场店)", walk:4, metro:"People's Square Station, Exit 15", price:35, hours:"08:00–22:00", menu:"yes", desc:"Шанхайн анхны specialty кофе брэндийн нэгэн — creamy latte.", keyword:"Seesaw Coffee (上海来福士广场店)", meal:"coffee" },
        { name:"Starbucks Reserve (星巴克臻选 世茂广场店)", walk:5, metro:"People's Square Station, Exit 19", price:45, hours:"07:30–22:30", menu:"yes", desc:"Гурван давхар premium флагшип — явган тэрэгний харагдацтай.", keyword:"星巴克臻选 (上海世茂广场店)", meal:"coffee" },
        { name:"Haidilao Hotpot (海底捞 来福士广场店)", walk:4, metro:"People's Square Station, Exit 15", price:145, hours:"09:00–05:00", menu:"yes", desc:"Дэлхийд алдартай хотпот — маникюр, нудел эргүүлэх шоу.", keyword:"海底捞火锅 (上海来福士广场店)", meal:"dinner" },
        { name:"Grandma's Home (外婆家 新世界城店)", walk:5, metro:"People's Square Station, Exit 7", price:75, hours:"11:00–14:00, 16:30–21:30", menu:"photo", desc:"Том гэр бүлийн ресторан — чихэрлэг гахайн мах, соритмог тахиа.", keyword:"外婆家 (新世界城店)", meal:"dinner" }
      ]
    },
    {
      key: 'jingan',
      name: "Jing'an Temple (静安寺)",
      placeIds: ['jingan_temple', 'nanjing_west', 'plaza66', 'jing_an_sculpture', 'jade_buddha', 'natural_history', 'commune_social', 'noodle_bull', 'fu_1088', 'grand_gateway', 'xujiahui_electronics', 'zhongshan_park', 'gongqing_forest'],
      places: [
        { name:"Din Tai Fung (鼎泰丰 芮欧百货店)", walk:3, metro:"Jing'an Temple Station, Exit 4", price:160, hours:"11:00–14:30, 17:00–21:30", menu:"yes", desc:"Шилэн гал тогоотой — хэрхэн таанбао хийхийг харна.", keyword:"鼎泰丰 (芮欧百货店)", meal:"lunch" },
        { name:"Crystal Jade (翡翠酒家 久光百货店)", walk:2, metro:"Jing'an Temple Station, Exit 2", price:155, hours:"11:00–14:30, 17:00–21:30", menu:"yes", desc:"Хонконгийн Кантоны хоол — шарсан нугас, dim sum.", keyword:"翡翠酒家 (久光百货店)", meal:"lunch" },
        { name:"Wagas (静安嘉里中心店)", walk:3, metro:"Jing'an Temple Station, Exit 6", price:75, hours:"08:00–21:30", menu:"yes", desc:"Англи менютэй — лосось ороосон нутаг, шинэ шүүс.", keyword:"Wagas沃歌斯 (静安嘉里中心店)", meal:"lunch" },
        { name:"Peet's Coffee (静安嘉里中心店)", walk:3, metro:"Jing'an Temple Station, Exit 6", price:42, hours:"07:30–21:30", menu:"yes", desc:"Харанхуй шарсан blend — flat white, бяслагтай нан.", keyword:"Peet's Coffee皮爷咖啡 (静安嘉里中心店)", meal:"coffee" },
        { name:"Manner Coffee (铜仁路一店)", walk:4, metro:"Jing'an Temple Station, Exit 6", price:20, hours:"07:30–19:30", menu:"yes", desc:"Гудамжны цонхон дэлгүүр — specialty espresso, хямд.", keyword:"Manner Coffee (铜仁路一店)", meal:"coffee" },
        { name:"Calypso Restaurant (地中海餐厅·酒吧)", walk:3, metro:"Jing'an Temple Station, Exit 6", price:250, hours:"11:30–23:00", menu:"yes", desc:"Шилэн байшин дотор — Неаполитан pizza, Итали pasta.", keyword:"Calypso地中海餐厅·酒吧", meal:"dinner" },
        { name:"Beef & Liberty Burger (静安嘉里中心店)", walk:3, metro:"Jing'an Temple Station, Exit 6", price:130, hours:"11:00–22:00", menu:"yes", desc:"Artisan бургер — зузаан патти, craft пиво, sweet potato fries.", keyword:"Beef & Liberty尚牛社会 (静安嘉里中心店)", meal:"dinner" }
      ]
    },
    {
      key: 'disneyland',
      name: 'Shanghai Disneyland (上海迪士尼乐园)',
      placeIds: ['shanghai_disneyland'],
      places: [
        { name:"Barbossa Grilled BBQ (巴波萨烧烤)", walk:5, metro:"Disney Resort Station, Exit 2", price:100, hours:"11:00–20:00", menu:"yes", desc:"Паркийн доторх — BBQ хавирга, тахиа.", keyword:"巴波萨烧烤", meal:"lunch" },
        { name:"Pinocchio Flatbread Kitchen (皮诺丘乡村厨房)", walk:5, metro:"Disney Resort Station, Exit 2", price:95, hours:"11:00–20:00", menu:"yes", desc:"Mickey хэлбэртэй pizza, халуун нудел — Fantasyland дотор.", keyword:"皮诺丘乡村厨房", meal:"lunch" },
        { name:"The Cheesecake Factory (芝乐坊 迪士尼小镇店)", walk:4, metro:"Disney Resort Station, Exit 1", price:195, hours:"11:00–21:30", menu:"yes", desc:"Паркийн гадна Disneytown — том portion, алдарт cheesecake.", keyword:"The Cheesecake Factory芝乐坊餐厅", meal:"lunch" },
        { name:"Starbucks (星巴克 迪士尼小镇店)", walk:4, metro:"Disney Resort Station, Exit 1", price:45, hours:"07:00–22:00", menu:"yes", desc:"Казино хэв маягийн flagship — Монгол хэлтэй биш ч ойлгомжтой.", keyword:"星巴克 (迪士尼小镇店)", meal:"coffee" },
        { name:"HeyTea (喜茶 迪士尼小镇店)", walk:4, metro:"Disney Resort Station, Exit 1", price:28, hours:"09:00–22:00", menu:"yes", desc:"Хятадын хамгийн алдартай сүүн цай — бяслагтай оройн сүүн цай.", keyword:"喜茶 (迪士尼小镇店)", meal:"coffee" },
        { name:"Royal Banquet Hall (皇家宴会厅)", walk:1, metro:"Disney Resort Station, Exit 2", price:450, hours:"11:30–20:00", menu:"yes", desc:"Цайзны дотор — Disney дүрүүдтэй уулзаж, Западын хоол идэнэ.", keyword:"皇家宴会厅", meal:"dinner" },
        { name:"Wolfgang Puck Kitchen (沃夫冈派克 迪士尼小镇店)", walk:5, metro:"Disney Resort Station, Exit 1", price:220, hours:"11:00–21:30", menu:"yes", desc:"Калифорнийн стейк, wood-fired pizza — Disneytown.", keyword:"Wolfgang Puck Kitchen+Bar (迪士尼小镇店)", meal:"dinner" }
      ]
    },
    {
      key: 'zhujiajiao',
      name: 'Zhujiajiao Water Town (朱家角)',
      placeIds: ['zhujiajiao', 'qibao', 'chongming', 'sheshan'],
      places: [
        { name:"Ah Po Cha Lou Teahouse (阿婆茶楼)", walk:4, metro:"Zhujiajiao Station, Exit 1", price:85, hours:"09:00–19:30", menu:"photo", desc:"Сувгийн дэргэдх — голын загас, ногоон цай.", keyword:"阿婆茶楼", meal:"lunch" },
        { name:"Linjia Grandma Restaurant (临家老大娘)", walk:3, metro:"Zhujiajiao Station, Exit 1", price:75, hours:"10:00–20:30", menu:"photo", desc:"Хулсан навчаар ороосон гахайн хөлийн хоол — орон нутгийн амт.", keyword:"临家老大娘", meal:"lunch" },
        { name:"Maoshi Zongzi Stall (茂氏阿婆粽)", walk:5, metro:"Zhujiajiao Station, Exit 1", price:15, hours:"08:00–18:00", menu:"no", desc:"Гудамжны стенд — цагаан будаатай гахайн мах + давслаг өндөгний шарагдсан.", keyword:"茂氏阿婆粽", meal:"lunch" },
        { name:"Starbucks (星巴克 青浦朱家角店)", walk:6, metro:"Zhujiajiao Station, Exit 1", price:40, hours:"08:30–20:00", menu:"yes", desc:"Хуучин Хятад барилган дотор — стандарт кофе, гайхалтай дизайн.", keyword:"星巴克 (青浦朱家角店)", meal:"coffee" },
        { name:"Moments in Cats Bookstore (猫的天空之城 朱家角店)", walk:5, metro:"Zhujiajiao Station, Exit 1", price:38, hours:"09:30–21:00", menu:"yes", desc:"Номын дэлгүүр + кафе — сүүн цай, ирээдүйд илгээх захидал.", keyword:"猫的天空之城概念书店 (朱家角店)", meal:"coffee" },
        { name:"Zhujiajiao No.1 Teahouse (朱家角第一茶楼)", walk:5, metro:"Zhujiajiao Station, Exit 1", price:95, hours:"08:30–21:00", menu:"photo", desc:"Хамгийн эртний цайны газар — гүүрний гэрэлт орой.", keyword:"朱家角第一茶楼", meal:"dinner" },
        { name:"Waterfront Home Cooking (古镇水乡人家小菜)", walk:4, metro:"Zhujiajiao Station, Exit 1", price:80, hours:"10:30–21:00", menu:"photo", desc:"Мөрний дээр тавцан — усны хавч, голын загас.", keyword:"古镇水乡人家小菜", meal:"dinner" }
      ]
    },
    {
      key: 'nanjing-road',
      name: 'Nanjing Road (南京路步行街)',
      placeIds: ['nanjing_road', 'da_hu_chun', 'rockbund_art', 'east_bund', '1933_millfun', 'duolun_road', 'jewish_refugees', 'mint_club', 'shelter_club', 'ultraviolet'],
      places: [
        { name:"Shen Da Cheng (沈大成 南京东路总店)", walk:2, metro:"People's Square Station, Exit 14", price:40, hours:"06:30–21:00", menu:"photo", desc:"1875 оноос — нудел, цагаан будааны зууш, хурдан.", keyword:"沈大成 (南京东路总店)", meal:"lunch" },
        { name:"Bi Feng Tang Dim Sum (避风塘 第一食品店)", walk:3, metro:"People's Square Station, Exit 19", price:95, hours:"10:00–22:00", menu:"photo", desc:"Хонконгийн haa gaw, BBQ pork bun — том заал.", keyword:"避风塘 (第一食品商店店)", meal:"lunch" },
        { name:"Xin Ya Cantonese (新雅粤菜馆)", walk:3, metro:"East Nanjing Road Station, Exit 1", price:130, hours:"11:00–14:00, 17:00–21:00", menu:"yes", desc:"Түүхэн Кантоны ресторан — шарсан мах, Англи меню.", keyword:"新雅粤菜馆", meal:"lunch" },
        { name:"HeyTea (喜茶 上海第一百货店)", walk:2, metro:"People's Square Station, Exit 19", price:25, hours:"09:30–22:00", menu:"yes", desc:"Бяслагтай оройн сүүн цай — дагуул явах.", keyword:"喜茶 (上海第一百货店)", meal:"coffee" },
        { name:"Manner Coffee (第一百货商业中心店)", walk:3, metro:"People's Square Station, Exit 19", price:20, hours:"07:30–22:00", menu:"yes", desc:"Дэлгүүр хэсэж явааид кофе авах хамгийн хурдан.", keyword:"Manner Coffee (第一百货商业中心店)", meal:"coffee" },
        { name:"Haidilao Hotpot (海底捞 第一百货店)", walk:2, metro:"People's Square Station, Exit 19", price:150, hours:"09:00–07:00", menu:"yes", desc:"Хотпот + нудел эргүүлэх шоу + маникюр — оройн хоолны шилдэг сонголт.", keyword:"海底捞火锅 (第一百货店)", meal:"dinner" },
        { name:"Jia Jia Tang Bao (佳家汤包 黄河路店)", walk:6, metro:"People's Square Station, Exit 8", price:45, hours:"06:30–20:30", menu:"photo", desc:"Хайрцаг шөлтэй нимгэн арьстай — дагуул явах хямд оройн хоол.", keyword:"佳家汤包 (黄河路店)", meal:"dinner" }
      ]
    }
  ]
};

/* ── HELPER: place ID → attraction key ─────────────────── */
window.FOOD_DB.getAttractionForPlace = function(placeId) {
  return this.attractions.find(a => a.placeIds.includes(placeId)) || null;
};

/* ── HELPER: Amap universal deep link ──────────────────── */
window.FOOD_DB.amapLink = function(keyword) {
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(keyword)}&city=%E4%B8%8A%E6%B5%B7&src=lfs`;
};
