const USER_ID_KEY = 'movieapp_user_id';

const generateUserId = (): string => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 11);
  return `user_${timestamp}_${randomPart}`;
};

export const getUserId = (): string => {
  try {
    let userId = sessionStorage.getItem(USER_ID_KEY);
    
    if (!userId) {
      userId = generateUserId();
      sessionStorage.setItem(USER_ID_KEY, userId);
      console.log('✅ New user ID generated:', userId);
    } else {
      console.log('✅ Existing user ID retrieved:', userId);
    }
    
    return userId;
  } catch (error) {
    console.warn('⚠️ sessionStorage unavailable, using temporary ID');
    return generateUserId();
  }
};

export const clearUserId = (): void => {
  try {
    sessionStorage.removeItem(USER_ID_KEY);
    console.log('🗑️ User ID cleared');
  } catch (error) {
    console.warn('⚠️ Could not clear user ID');
  }
};