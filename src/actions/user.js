export const USER_FB_INITIALIZED = 'USER_FB_INITIALIZED';
export const USER_SET = 'USER_SET';

export const userFBInitialized = () => ({
  type: USER_FB_INITIALIZED,
});

export const userSet = (payload = {}) => ({
  type: USER_SET,
  payload,
});
