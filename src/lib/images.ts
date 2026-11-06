// Verified 200 OK portrait photos from Unsplash for care team, clients, and avatars
export const VERIFIED_CARE_AVATARS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80', // Smiling professional clinician
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80', // Cheerful clinical specialist
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80', // Male care coordinator
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80', // Support specialist
  'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=160&auto=format&fit=crop&q=80', // Senior participant
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=160&auto=format&fit=crop&q=80', // Senior client
];

// Clean, high-resolution SVG avatar fallback data URI (in case network is offline or blocked)
export const DEFAULT_AVATAR_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' fill='none'%3E%3Crect width='80' height='80' rx='20' fill='%23E2E8F0'/%3E%3Cpath d='M40 42c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm0 6c-8.837 0-24 4.477-24 13.333V66h48v-4.667C64 52.477 48.837 48 40 48z' fill='%2394A3B8'/%3E%3C/svg%3E";

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = DEFAULT_AVATAR_FALLBACK
) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallbackSrc;
};

