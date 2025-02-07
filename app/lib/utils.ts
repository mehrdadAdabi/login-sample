export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const mobileRegex = /^09\d{11}$/;

export const validateEmailOrPhone = (value: string): boolean => {
  return emailRegex.test(value) || mobileRegex.test(value);
};

export const setInLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeInLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
