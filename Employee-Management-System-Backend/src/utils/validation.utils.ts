/**
 *
 * @param email: string | null | undefined
 * @returns boolean
 */
export function isValidEmail(email: string | null | undefined): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email.trim());
}

/**
 *
 * @param phoneNumber: string | null | undefined
 * @returns boolean
 */
export function isValidPhoneNumber(
  phoneNumber: string | null | undefined
): boolean {
  if (!phoneNumber || typeof phoneNumber !== "string") {
    return false;
  }

  let cleanedNumber = phoneNumber.trim();

  if (cleanedNumber.startsWith(SINGAPORE_COUNTRY_CODE)) {
    cleanedNumber = cleanedNumber.substring(3);
  }

  cleanedNumber = cleanedNumber.replace(/[\s-]/g, "");

  const sgPhoneRegex = /^[689]\d{7}$/;

  return sgPhoneRegex.test(cleanedNumber);
}

/**
 *
 * @param string
 * @returns boolean
 */
export function isValidDate(dateValue: string | null | undefined): boolean {
  try {
    if (!dateValue || typeof dateValue !== "string") {
      return false;
    }
    const dateObj = new Date(dateValue);
    if (isNaN(dateObj.getTime())) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

/**
 *
 * @param string
 * @returns boolean
 */
export function isValidPastDate(dateValue: string | null | undefined): boolean {
  try {
    if (!dateValue || typeof dateValue !== "string") {
      return false;
    }
    const dateObj = new Date(dateValue);
    if (isNaN(dateObj.getTime())) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj.getTime() < today.getTime();
  } catch (e) {
    return false;
  }
}
