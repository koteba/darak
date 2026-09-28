import type { Property, PropertyType, Purpose } from '../types/property'
const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`
const IMG = { apt: 'photo-1560448204-e02f11c3d0e2', house: 'photo-1600585154340-be6161a56a0c', villa: 'photo-1512917774080-9991f1c4c750', office: 'photo-1497366216548-37526070297c', living: 'photo-1502672260266-1c1ef2d93688', home: 'photo-1564013799919-ab600027ffc6', flat: 'photo-1522708323590-d24dbb6b0267', tower: 'photo-1486406146926-c627a92ad1ab', land: 'photo-1500382017468-9049fed747ef' }
const agents = [
  { name: 'ليلى الحلبي', phone: '0944 123 456', avatar: '', listingsCount: 24 },
  { name: 'محمد العيسى', phone: '0933 765 210', avatar: '', listingsCount: 17 },
  { name: 'معلن مباشر', phone: '0955 300 812', avatar: '', listingsCount: 1 },
]
type Seed = [string, Purpose, PropertyType, string, string, number, number, number, number, boolean, boolean, string[], string[]]
const seeds: Seed[] = [
  ['شقة حديثة مطلة على المدينة', 'sale', 'apartment', 'دمشق', 'المزة', 145000, 3, 2, 150, true, true, ['apt', 'living', 'flat'], ['تكييف', 'مصعد', 'شرفة', 'موقف سيارات']],
  ['فيلا مع حديقة ومسبح', 'sale', 'villa', 'ريف دمشق', 'صحنايا', 420000, 5, 4, 400, false, true, ['villa', 'house', 'home'], ['حديقة', 'مسبح', 'حراسة', 'تدفئة مركزية']],
  ['شقة مفروشة للإيجار الشهري', 'rent', 'apartment', 'دمشق', 'أبو رمانة', 600, 2, 1, 95, true, true, ['flat', 'living', 'apt'], ['إنترنت', 'تكييف', 'مفروشة']],
  ['مكتب إداري في قلب المدينة', 'rent', 'office', 'حلب', 'العزيزية', 900, 0, 1, 120, false, false, ['office', 'tower'], ['مصعد', 'إنترنت', 'حراسة']],
  ['أرض سكنية بإطلالة بحرية', 'sale', 'land', 'اللاذقية', 'الشاطئ الأزرق', 85000, 0, 0, 600, false, true, ['land', 'home'], ['قرب من مواصلات', 'إطلالة بحرية']],
  ['محل تجاري على شارع رئيسي', 'rent', 'shop', 'حمص', 'الحمراء', 450, 0, 1, 60, false, false, ['tower', 'office'], ['واجهة زجاجية', 'حراسة']],
  ['شقة عائلية قرب المدارس', 'sale', 'apartment', 'طرطوس', 'الكورنيش', 98000, 3, 2, 130, false, false, ['home', 'apt', 'flat'], ['شرفة', 'قرب من مدارس', 'تدفئة مركزية']],
  ['مستودع مجهز للتخزين', 'rent', 'warehouse', 'حلب', 'الشيخ نجار', 700, 0, 1, 500, false, false, ['tower', 'land'], ['موقف شاحنات', 'حراسة']],
]
export const properties: Property[] = seeds.map((s, i) => ({
  id: String(i + 1), title: s[0], slug: `property-${i + 1}`, purpose: s[1], propertyType: s[2], city: s[3], neighborhood: s[4],
  price: s[5], currency: 'USD', bedrooms: s[6], bathrooms: s[7], area: s[8], floor: (i % 5) + 1, buildingAge: i % 4 * 3,
  furnished: s[9], featured: s[10], createdAt: `2026-0${9 - (i % 6)}-1${i % 9}`,
  description: `${s[0]} في منطقة ${s[4]} بمدينة ${s[3]}. عقار نظيف وجاهز، بموقع مميز وخدمات قريبة، ومناسب لمن يبحث عن راحة وقيمة واضحة. للاستفسار أو ترتيب معاينة تواصل مع المعلن.`,
  amenities: s[12], images: s[11].map((k) => U(IMG[k as keyof typeof IMG])),
  agent: agents[i % 3], coordinates: { lat: 33.5 + i * 0.1, lng: 36.3 + i * 0.1 }, status: 'available',
}))
