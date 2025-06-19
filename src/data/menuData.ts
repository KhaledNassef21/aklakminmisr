export interface MenuItem {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  price: number;
  image: string;
  category: 'popular' | 'bakery' | 'desserts' | 'beverages';
}

export const menuData: MenuItem[] = [
  // الأكلات الشعبية المصرية
  {
    id: '1',
    name: { ar: 'كشري مصري', en: 'Egyptian Koshari' },
    description: { ar: 'كشري بالعدس والحمص والأرز والمكرونة مع الصلصة والدقة', en: 'Rice, lentils, chickpeas, pasta with tomato sauce and fried onions' },
    price: 25,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    category: 'popular'
  },
  {
    id: '2',
    name: { ar: 'ملوخية باللحمة', en: 'Molokhia with Meat' },
    description: { ar: 'ملوخية مصرية أصلية مع قطع اللحمة والأرز الأبيض', en: 'Traditional Egyptian molokhia with meat pieces and white rice' },
    price: 35,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    category: 'popular'
  },
  {
    id: '3',
    name: { ar: 'بط محشي', en: 'Stuffed Duck' },
    description: { ar: 'بط محشي بالأرز والخضار والتوابل المصرية الأصلية', en: 'Duck stuffed with rice, vegetables and authentic Egyptian spices' },
    price: 65,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    category: 'popular'
  },
  {
    id: '4',
    name: { ar: 'فتة باللحمة', en: 'Fatta with Meat' },
    description: { ar: 'فتة مصرية بالأرز الأبيض واللحمة والشوربة والثوم', en: 'Egyptian fatta with white rice, meat, broth and garlic' },
    price: 40,
    image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
    category: 'popular'
  },
  {
    id: '5',
    name: { ar: 'طاجن بامية باللحمة', en: 'Okra Stew with Meat' },
    description: { ar: 'طاجن بامية مطبوخة باللحمة والصلصة على الطريقة المصرية', en: 'Okra cooked with meat and tomato sauce, Egyptian style' },
    price: 38,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    category: 'popular'
  },
  {
    id: '6',
    name: { ar: 'طاجن عكاوي', en: 'Okawi Stew' },
    description: { ar: 'طاجن عكاوي باللحمة والخضار المشكلة', en: 'Mixed vegetable stew with meat, Egyptian style' },
    price: 35,
    image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
    category: 'popular'
  },
  {
    id: '7',
    name: { ar: 'طاجن بطاطس باللحمة', en: 'Potato Stew with Meat' },
    description: { ar: 'طاجن بطاطس مطبوخة باللحمة والصلصة', en: 'Potato stew cooked with meat and tomato sauce' },
    price: 32,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    category: 'popular'
  },
  {
    id: '8',
    name: { ar: 'كبدة اسكندراني', en: 'Alexandrian Liver' },
    description: { ar: 'كبدة مقلية بالفلفل الأخضر والطماطم على الطريقة الاسكندرانية', en: 'Fried liver with green peppers and tomatoes, Alexandrian style' },
    price: 28,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    category: 'popular'
  },
  {
    id: '9',
    name: { ar: 'ممبار', en: 'Mombar' },
    description: { ar: 'ممبار محشي بالأرز والخضار والتوابل المصرية', en: 'Stuffed intestines with rice, vegetables and Egyptian spices' },
    price: 32,
    image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
    category: 'popular'
  },
  {
    id: '10',
    name: { ar: 'حمام محشي', en: 'Stuffed Pigeon' },
    description: { ar: 'حمام محشي بالأرز والكبدة والقوانص على الطريقة المصرية', en: 'Pigeon stuffed with rice, liver and gizzards, Egyptian style' },
    price: 45,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    category: 'popular'
  },
  {
    id: '11',
    name: { ar: 'مسقعة', en: 'Moussaka' },
    description: { ar: 'مسقعة باذنجان مقلي باللحمة المفرومة والصلصة', en: 'Fried eggplant with minced meat and tomato sauce' },
    price: 30,
    image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
    category: 'popular'
  },
  {
    id: '12',
    name: { ar: 'محشي ورق عنب', en: 'Stuffed Grape Leaves' },
    description: { ar: 'ورق عنب محشي بالأرز واللحمة المفرومة والتوابل المصرية', en: 'Grape leaves stuffed with rice, minced meat and Egyptian spices' },
    price: 30,
    image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
    category: 'popular'
  },
  {
    id: '13',
    name: { ar: 'محشي كرنب', en: 'Stuffed Cabbage' },
    description: { ar: 'كرنب محشي بالأرز واللحمة المفرومة والتوابل', en: 'Cabbage stuffed with rice, minced meat and spices' },
    price: 28,
    image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
    category: 'popular'
  },
  {
    id: '14',
    name: { ar: 'محشي كوسة', en: 'Stuffed Zucchini' },
    description: { ar: 'كوسة محشية بالأرز واللحمة المفرومة والتوابل', en: 'Zucchini stuffed with rice, minced meat and spices' },
    price: 32,
    image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg',
    category: 'popular'
  },
  {
    id: '15',
    name: { ar: 'باذنجان مقلي', en: 'Fried Eggplant' },
    description: { ar: 'باذنجان مقلي مع الصلصة والثوم على الطريقة المصرية', en: 'Fried eggplant with tomato sauce and garlic, Egyptian style' },
    price: 22,
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    category: 'popular'
  },
  {
    id: '16',
    name: { ar: 'كفتة وأرز', en: 'Kofta with Rice' },
    description: { ar: 'كفتة مشوية مع الأرز الأبيض والسلطة', en: 'Grilled kofta with white rice and salad' },
    price: 35,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    category: 'popular'
  },
  {
    id: '17',
    name: { ar: 'طاجن مكرونة باللحمة', en: 'Pasta Casserole with Meat' },
    description: { ar: 'طاجن مكرونة باللحمة والصلصة في الفرن', en: 'Baked pasta casserole with meat and tomato sauce' },
    price: 30,
    image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
    category: 'popular'
  },
  {
    id: '18',
    name: { ar: 'طاجن مكرونة بالسجق', en: 'Pasta Casserole with Sausage' },
    description: { ar: 'طاجن مكرونة بالسجق البلدي والصلصة في الفرن', en: 'Baked pasta casserole with local sausage and tomato sauce' },
    price: 32,
    image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
    category: 'popular'
  },

  // المخبوزات والفطير
  {
    id: '19',
    name: { ar: 'فطير مشلتت', en: 'Feteer Meshaltet' },
    description: { ar: 'فطير مشلتت مصري أصلي بالسمن البلدي', en: 'Original Egyptian layered pastry with local ghee' },
    price: 15,
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg',
    category: 'bakery'
  },
  {
    id: '20',
    name: { ar: 'فطير بالسكر والعسل', en: 'Feteer with Sugar & Honey' },
    description: { ar: 'فطير محشي بالسكر والعسل الأبيض', en: 'Feteer stuffed with sugar and white honey' },
    price: 18,
    image: 'https://images.pexels.com/photos/4109112/pexels-photo-4109112.jpeg',
    category: 'bakery'
  },
  {
    id: '21',
    name: { ar: 'فطير حادق بالجبن', en: 'Savory Feteer with Cheese' },
    description: { ar: 'فطير حادق محشي بالجبن الأبيض والأعشاب', en: 'Savory feteer stuffed with white cheese and herbs' },
    price: 20,
    image: 'https://images.pexels.com/photos/4109112/pexels-photo-4109112.jpeg',
    category: 'bakery'
  },
  {
    id: '22',
    name: { ar: 'فطير حادق بالسجق', en: 'Savory Feteer with Sausage' },
    description: { ar: 'فطير حادق محشي بالسجق البلدي والطماطم', en: 'Savory feteer stuffed with local sausage and tomatoes' },
    price: 25,
    image: 'https://images.pexels.com/photos/4109112/pexels-photo-4109112.jpeg',
    category: 'bakery'
  },
  {
    id: '23',
    name: { ar: 'فطير حادق باللحمة المفرومة', en: 'Savory Feteer with Minced Meat' },
    description: { ar: 'فطير حادق محشي باللحمة المفرومة والبصل', en: 'Savory feteer stuffed with minced meat and onions' },
    price: 28,
    image: 'https://images.pexels.com/photos/4109112/pexels-photo-4109112.jpeg',
    category: 'bakery'
  },
  {
    id: '24',
    name: { ar: 'عيش بلدي', en: 'Baladi Bread' },
    description: { ar: 'عيش بلدي مصري طازج من الفرن', en: 'Fresh Egyptian baladi bread from the oven' },
    price: 8,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    category: 'bakery'
  },
  {
    id: '25',
    name: { ar: 'رقاق باللحمة', en: 'Roqaq with Meat' },
    description: { ar: 'رقاق مصري باللحمة المفرومة والبصل', en: 'Egyptian roqaq with minced meat and onions' },
    price: 30,
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg',
    category: 'bakery'
  },

  // الحلويات الشرقية
  {
    id: '26',
    name: { ar: 'كنافة', en: 'Kunafa' },
    description: { ar: 'كنافة مصرية بالجبن والقشطة والشربات', en: 'Egyptian kunafa with cheese, cream and syrup' },
    price: 25,
    image: 'https://images.pexels.com/photos/4553003/pexels-photo-4553003.jpeg',
    category: 'desserts'
  },
  {
    id: '27',
    name: { ar: 'قطايف', en: 'Qatayef' },
    description: { ar: 'قطايف محشية بالمكسرات والقشطة', en: 'Qatayef stuffed with nuts and cream' },
    price: 20,
    image: 'https://images.pexels.com/photos/4553003/pexels-photo-4553003.jpeg',
    category: 'desserts'
  },
  {
    id: '28',
    name: { ar: 'رز بلبن', en: 'Rice Pudding' },
    description: { ar: 'رز بلبن مصري محلى بالسكر ومزين بالقرفة', en: 'Egyptian rice pudding sweetened with sugar and garnished with cinnamon' },
    price: 15,
    image: 'https://images.pexels.com/photos/7937467/pexels-photo-7937467.jpeg',
    category: 'desserts'
  },
  {
    id: '29',
    name: { ar: 'أم علي', en: 'Om Ali' },
    description: { ar: 'أم علي مصرية باللبن والمكسرات والزبيب', en: 'Egyptian Om Ali with milk, nuts and raisins' },
    price: 20,
    image: 'https://images.pexels.com/photos/5946965/pexels-photo-5946965.jpeg',
    category: 'desserts'
  },
  {
    id: '30',
    name: { ar: 'بسبوسة', en: 'Basbousa' },
    description: { ar: 'بسبوسة مصرية بالسميد واللوز والشربات', en: 'Egyptian semolina cake with almonds and syrup' },
    price: 18,
    image: 'https://images.pexels.com/photos/4553003/pexels-photo-4553003.jpeg',
    category: 'desserts'
  },
  {
    id: '31',
    name: { ar: 'جلاش', en: 'Goulash' },
    description: { ar: 'جلاش مصري بالمكسرات والعسل', en: 'Egyptian goulash with nuts and honey' },
    price: 22,
    image: 'https://images.pexels.com/photos/4553003/pexels-photo-4553003.jpeg',
    category: 'desserts'
  },

  // المشروبات
  {
    id: '32',
    name: { ar: 'سوبيا', en: 'Sobia' },
    description: { ar: 'مشروب السوبيا المصري المنعش', en: 'Refreshing Egyptian sobia drink' },
    price: 10,
    image: 'https://images.pexels.com/photos/1383775/pexels-photo-1383775.jpeg',
    category: 'beverages'
  },
  {
    id: '33',
    name: { ar: 'خروب', en: 'Carob' },
    description: { ar: 'مشروب الخروب الطبيعي المنعش', en: 'Natural refreshing carob drink' },
    price: 8,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    category: 'beverages'
  },
  {
    id: '34',
    name: { ar: 'كركديه', en: 'Hibiscus' },
    description: { ar: 'كركديه مصري طبيعي بارد أو ساخن', en: 'Natural Egyptian hibiscus, cold or hot' },
    price: 8,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    category: 'beverages'
  },
  {
    id: '35',
    name: { ar: 'عصير مانجو', en: 'Mango Juice' },
    description: { ar: 'عصير مانجو طبيعي طازج', en: 'Fresh natural mango juice' },
    price: 12,
    image: 'https://images.pexels.com/photos/1383775/pexels-photo-1383775.jpeg',
    category: 'beverages'
  },
  {
    id: '36',
    name: { ar: 'تمر هندي', en: 'Tamarind' },
    description: { ar: 'عصير التمر هندي الطبيعي المنعش', en: 'Refreshing natural tamarind juice' },
    price: 10,
    image: 'https://images.pexels.com/photos/1383775/pexels-photo-1383775.jpeg',
    category: 'beverages'
  },
  {
    id: '37',
    name: { ar: 'لبن رايب', en: 'Buttermilk' },
    description: { ar: 'لبن رايب طبيعي منعش', en: 'Natural refreshing buttermilk' },
    price: 8,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    category: 'beverages'
  },
  {
    id: '38',
    name: { ar: 'مياه معدنية', en: 'Mineral Water' },
    description: { ar: 'مياه معدنية طبيعية', en: 'Natural mineral water' },
    price: 5,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    category: 'beverages'
  }
];
