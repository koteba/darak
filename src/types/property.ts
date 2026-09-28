export type Purpose = 'sale' | 'rent'
export type PropertyType = 'apartment' | 'villa' | 'office' | 'land' | 'shop' | 'warehouse'
export interface Agent { name: string; phone: string; avatar: string; listingsCount: number }
export interface Property {
  id: string; title: string; slug: string; purpose: Purpose; propertyType: PropertyType
  city: string; neighborhood: string; price: number; currency: 'USD' | 'SYP'
  bedrooms: number; bathrooms: number; area: number; floor: number; buildingAge: number
  furnished: boolean; featured: boolean; createdAt: string; description: string
  amenities: string[]; images: string[]; agent: Agent
  coordinates: { lat: number; lng: number }; status: 'available' | 'reserved' | 'sold'
}
export interface ViewingRequest { propertyId: string; name: string; phone: string; date: string; time: string; message: string }
