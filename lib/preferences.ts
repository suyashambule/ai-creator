export interface UserPreferences {
  notificationsEnabled: boolean;
  darkMode: boolean;
  language: string;
}

export const defaultPreferences: UserPreferences = {
  notificationsEnabled: true,
  darkMode: false,
  language: 'en',
};

// Load preferences from localStorage
export const loadPreferences = (): UserPreferences => {
  if (typeof window === 'undefined') {
    return defaultPreferences;
  }
  
  try {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return defaultPreferences;
  }
};

// Save preferences to localStorage
export const savePreferences = (preferences: UserPreferences): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
};

// Save a single preference
export const savePreference = <K extends keyof UserPreferences>(
  key: K, 
  value: UserPreferences[K]
): void => {
  const currentPreferences = loadPreferences();
  const updatedPreferences = {
    ...currentPreferences,
    [key]: value,
  };
  savePreferences(updatedPreferences);
}; 