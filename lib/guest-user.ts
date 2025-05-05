export const guestUser = {
  id: 'guest-user',
  firstName: 'Guest',
  lastName: 'User',
  fullName: 'Guest User',
  primaryEmailAddress: {
    emailAddress: 'guest@example.com',
  },
  imageUrl: '/guest-avatar.png',
  createdAt: new Date().toISOString(),
};

export function isGuestUser(userId?: string | null): boolean {
  return userId === 'guest-user';
} 