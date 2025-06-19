export interface Recipe {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  ingredients: {
    ar: string[];
    en: string[];
  };
  instructions: {
    ar: string[];
    en: string[];
  };
  prepTime: {
    ar: string;
    en: string;
  };
  servings: {
    ar: string;
    en: string;
  };
  difficulty: {
    ar: string;
    en: string;
  };
  tips: {
    ar: string[];
    en: string[];
  };
  image: string;
  category: 'popular' | 'bakery' | 'desserts' | 'beverages';
}

export const recipeData: Recipe[] = [
  {
    id: '1',
    name: { ar: 'كشري مصري', en: 'Egyptian Koshari' },
    description: { 
      ar: 'كشري بالعدس والحمص والأرز والمكرونة مع الصلصة والدقة', 
      en: 'Rice, lentils, chickpeas, pasta with tomato sauce and fried onions' 
    },
    ingredients: {
      ar: [
        '2 كوب أرز مصري',
        '1 كوب عدس أسود',
        '1 كوب حمص مسلوق',
        '2 كوب مكرونة صغيرة',
        '3 حبات بصل كبيرة',
        '4 حبات طماطم',
        '3 ملاعق كبيرة معجون طماطم',
        '2 ملعقة كبيرة خل',
        '1 ملعقة صغيرة كمون',
        '1 ملعقة صغيرة كزبرة ناشفة',
        'شطة حسب الرغبة',
        'ملح وفلفل أسود',
        'زيت للقلي'
      ],
      en: [
        '2 cups Egyptian rice',
        '1 cup black lentils',
        '1 cup cooked chickpeas',
        '2 cups small pasta',
        '3 large onions',
        '4 tomatoes',
        '3 tbsp tomato paste',
        '2 tbsp vinegar',
        '1 tsp cumin',
        '1 tsp dried coriander',
        'Hot pepper to taste',
        'Salt and black pepper',
        'Oil for frying'
      ]
    },
    instructions: {
      ar: [
        'اسلقي العدس في ماء مغلي مع قليل من الملح حتى ينضج',
        'اسلقي الأرز في ماء مغلي مملح حتى ينضج',
        'اسلقي المكرونة في ماء مغلي مملح حتى تنضج',
        'اقطعي البصل شرائح رفيعة واقليه في الزيت حتى يصبح ذهبي اللون',
        'اخرجي نصف البصل واتركيه ينشف من الزيت',
        'أضيفي الطماطم المقطعة ومعجون الطماطم للبصل المتبقي',
        'أضيفي الكمون والكزبرة والملح والفلفل والخل',
        'اتركي الصلصة تنضج على نار هادئة لمدة 15 دقيقة',
        'في طبق التقديم، ضعي طبقة من الأرز ثم العدس ثم المكرونة',
        'اسكبي الصلصة فوق الخليط وزيني بالبصل المقلي',
        'قدمي الكشري ساخناً مع الشطة حسب الرغبة'
      ],
      en: [
        'Boil lentils in salted water until tender',
        'Cook rice in salted boiling water until done',
        'Cook pasta in salted boiling water until al dente',
        'Slice onions thinly and fry in oil until golden',
        'Remove half the onions and drain on paper towels',
        'Add chopped tomatoes and tomato paste to remaining onions',
        'Add cumin, coriander, salt, pepper, and vinegar',
        'Simmer sauce on low heat for 15 minutes',
        'In serving dish, layer rice, then lentils, then pasta',
        'Pour sauce over the mixture and garnish with fried onions',
        'Serve hot koshari with hot sauce on the side'
      ]
    },
    prepTime: { ar: '45 دقيقة', en: '45 minutes' },
    servings: { ar: '4-6 أشخاص', en: '4-6 people' },
    difficulty: { ar: 'متوسط', en: 'Medium' },
    tips: {
      ar: [
        'تأكدي من قلي البصل جيداً حتى يصبح مقرمش',
        'يمكن إضافة الحمص المقلي للتزيين',
        'الكشري يُقدم تقليدياً مع الشطة والثوم'
      ],
      en: [
        'Make sure to fry onions well until crispy',
        'You can add fried chickpeas for garnish',
        'Koshari is traditionally served with hot sauce and garlic'
      ]
    },
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    category: 'popular'
  },
  {
    id: '2',
    name: { ar: 'ملوخية باللحمة', en: 'Molokhia with Meat' },
    description: { 
      ar: 'ملوخية مصرية أصلية مع قطع اللحمة والأرز الأبيض', 
      en: 'Traditional Egyptian molokhia with meat pieces and white rice' 
    },
    ingredients: {
      ar: [
        '500 جرام ملوخية مفرومة',
        '500 جرام لحمة مقطعة قطع متوسطة',
        '1 حبة بصل متوسطة',
        '4 فصوص ثوم',
        '2 ملعقة كبيرة سمن بلدي',
        '1 ملعقة صغيرة كزبرة ناشفة',
        '6 أكواب مرق اللحمة',
        'ملح وفلفل أسود',
        'أرز أبيض للتقديم'
      ],
      en: [
        '500g chopped molokhia',
        '500g meat cut into medium pieces',
        '1 medium onion',
        '4 garlic cloves',
        '2 tbsp ghee',
        '1 tsp dried coriander',
        '6 cups meat broth',
        'Salt and black pepper',
        'White rice for serving'
      ]
    },
    instructions: {
      ar: [
        'اسلقي اللحمة مع البصل والملح حتى تنضج واحتفظي بالمرق',
        'في مقلاة، اقلي الثوم المفروم في السمن حتى يذبل',
        'أضيفي الكزبرة الناشفة وحركي لثواني',
        'أضيفي الملوخية المفرومة وحركي جيداً',
        'أضيفي المرق الساخن تدريجياً مع التحريك المستمر',
        'اتركي الملوخية تغلي ثم خففي النار واتركيها تنضج لمدة 10 دقائق',
        'أضيفي قطع اللحمة المسلوقة',
        'تبلي بالملح والفلفل حسب الذوق',
        'قدمي الملوخية ساخنة مع الأرز الأبيض'
      ],
      en: [
        'Boil meat with onion and salt until tender, reserve broth',
        'In a pan, fry minced garlic in ghee until fragrant',
        'Add dried coriander and stir for seconds',
        'Add chopped molokhia and stir well',
        'Gradually add hot broth while stirring continuously',
        'Bring molokhia to boil, then reduce heat and simmer for 10 minutes',
        'Add boiled meat pieces',
        'Season with salt and pepper to taste',
        'Serve hot molokhia with white rice'
      ]
    },
    prepTime: { ar: '60 دقيقة', en: '60 minutes' },
    servings: { ar: '4-5 أشخاص', en: '4-5 people' },
    difficulty: { ar: 'متوسط', en: 'Medium' },
    tips: {
      ar: [
        'لا تتركي الملوخية تغلي كثيراً حتى لا تصبح لزجة',
        'يمكن إضافة الدجاج بدلاً من اللحمة',
        'تُقدم مع الأرز الأبيض والسلطة'
      ],
      en: [
        'Don\'t let molokhia boil too much to avoid becoming slimy',
        'You can use chicken instead of meat',
        'Serve with white rice and salad'
      ]
    },
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    category: 'popular'
  },
  {
    id: '19',
    name: { ar: 'فطير مشلتت', en: 'Feteer Meshaltet' },
    description: { 
      ar: 'فطير مشلتت مصري أصلي بالسمن البلدي', 
      en: 'Original Egyptian layered pastry with local ghee' 
    },
    ingredients: {
      ar: [
        '3 أكواب دقيق',
        '1 كوب ماء دافئ',
        '1 ملعقة صغيرة ملح',
        '1 ملعقة صغيرة سكر',
        '2 ملعقة كبيرة زيت',
        '200 جرام سمن بلدي',
        'دقيق للرش'
      ],
      en: [
        '3 cups flour',
        '1 cup warm water',
        '1 tsp salt',
        '1 tsp sugar',
        '2 tbsp oil',
        '200g ghee',
        'Flour for dusting'
      ]
    },
    instructions: {
      ar: [
        'اخلطي الدقيق مع الملح والسكر',
        'أضيفي الماء الدافئ والزيت واعجني حتى تحصلي على عجينة ناعمة',
        'اتركي العجينة ترتاح لمدة 30 دقيقة',
        'قسمي العجينة إلى 6 كرات',
        'افردي كل كرة رقيقة جداً على سطح مدقوق',
        'ادهني كل طبقة بالسمن البلدي',
        'اطوي الطبقات فوق بعض مع دهن كل طبقة بالسمن',
        'اتركي العجينة ترتاح 15 دقيقة أخرى',
        'افردي العجينة مرة أخرى بحذر',
        'اطبخي الفطير في مقلاة على نار متوسطة حتى يصبح ذهبي اللون من الجهتين'
      ],
      en: [
        'Mix flour with salt and sugar',
        'Add warm water and oil, knead until smooth dough forms',
        'Let dough rest for 30 minutes',
        'Divide dough into 6 balls',
        'Roll each ball very thin on floured surface',
        'Brush each layer with ghee',
        'Fold layers on top of each other, brushing each with ghee',
        'Let dough rest for another 15 minutes',
        'Carefully roll out the dough again',
        'Cook feteer in a pan over medium heat until golden on both sides'
      ]
    },
    prepTime: { ar: '90 دقيقة', en: '90 minutes' },
    servings: { ar: '4-6 أشخاص', en: '4-6 people' },
    difficulty: { ar: 'صعب', en: 'Hard' },
    tips: {
      ar: [
        'العجينة يجب أن تكون رقيقة جداً حتى تشف من خلالها',
        'استخدمي السمن البلدي للحصول على أفضل طعم',
        'يُقدم مع العسل أو الجبن أو المربى'
      ],
      en: [
        'Dough should be very thin, almost transparent',
        'Use local ghee for the best flavor',
        'Serve with honey, cheese, or jam'
      ]
    },
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg',
    category: 'bakery'
  },
  {
    id: '29',
    name: { ar: 'أم علي', en: 'Om Ali' },
    description: { 
      ar: 'أم علي مصرية باللبن والمكسرات والزبيب', 
      en: 'Egyptian Om Ali with milk, nuts and raisins' 
    },
    ingredients: {
      ar: [
        '4 أكواب لبن',
        '2 كوب فطير أو رقاق مكسر',
        '1/2 كوب مكسرات مشكلة (لوز، بندق، فستق)',
        '1/4 كوب زبيب',
        '1/4 كوب جوز هند مبشور',
        '3 ملاعق كبيرة سكر',
        '1 ملعقة صغيرة فانيليا',
        'قشطة للتقديم'
      ],
      en: [
        '4 cups milk',
        '2 cups broken pastry or phyllo',
        '1/2 cup mixed nuts (almonds, hazelnuts, pistachios)',
        '1/4 cup raisins',
        '1/4 cup shredded coconut',
        '3 tbsp sugar',
        '1 tsp vanilla',
        'Cream for serving'
      ]
    },
    instructions: {
      ar: [
        'حمصي قطع الفطير في الفرن حتى تصبح ذهبية اللون',
        'في إناء، اغلي اللبن مع السكر والفانيليا',
        'ضعي قطع الفطير المحمصة في أطباق التقديم',
        'أضيفي المكسرات والزبيب وجوز الهند',
        'اسكبي اللبن المغلي فوق الخليط',
        'اتركي الخليط ينقع لمدة 5 دقائق',
        'قدمي أم علي ساخنة مع القشطة'
      ],
      en: [
        'Toast pastry pieces in oven until golden',
        'In a pot, boil milk with sugar and vanilla',
        'Place toasted pastry pieces in serving bowls',
        'Add nuts, raisins, and coconut',
        'Pour hot milk over the mixture',
        'Let mixture soak for 5 minutes',
        'Serve Om Ali hot with cream'
      ]
    },
    prepTime: { ar: '20 دقيقة', en: '20 minutes' },
    servings: { ar: '4 أشخاص', en: '4 people' },
    difficulty: { ar: 'سهل', en: 'Easy' },
    tips: {
      ar: [
        'يمكن استخدام الكرواسون بدلاً من الفطير',
        'أضيفي القشطة في النهاية للحصول على طعم أغنى',
        'يُقدم ساخناً في الشتاء'
      ],
      en: [
        'You can use croissants instead of pastry',
        'Add cream at the end for richer taste',
        'Serve hot in winter'
      ]
    },
    image: 'https://images.pexels.com/photos/5946965/pexels-photo-5946965.jpeg',
    category: 'desserts'
  }
];