export const fields = [
  { name: 'name', label: 'Наименование', required: 'Введите наименование' },
  {
    name: 'phone',
    label: 'Телефон',
    required: 'Номер телефона обязателен',
    type: 'tel',
    validate: {
      isCorrectLength: (value: string) => {
        const digitsOnly = value.replace(/\D/g, '');
        return (
          digitsOnly.length === 11 ||
          'Введите корректный номер телефона (11 цифр)'
        );
      },
      startsWithSeven: (value: string) => {
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly.startsWith('7') || 'Номер должен начинаться с +7';
      },
    },
  },
  {
    name: 'email',
    label: 'Почтовый адрес',
    required: 'Введите почтовый адрес',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Введите корректный почтовый адрес',
    },
  },
  { name: 'comment', label: 'Комментарий', required: 'Введите комментарий' },
];
