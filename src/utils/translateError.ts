// utils/translateError.ts
import errorMessages from '@/constants/errorMessages';

export const translateError = (errorText: string): string => {
  // Ищем, включен ли текст ошибки в словарь
  for (const [key, message] of Object.entries(errorMessages)) {
    if (errorText.includes(key)) {
      return message;
    }
  }

  // Если не нашли совпадения, возвращаем сообщение по умолчанию
  return errorMessages.default;
};
