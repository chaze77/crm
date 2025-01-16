import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import useAuthStore from '@/store/useAuthStore';
import useInfoStore from '@/store/useInfoStore';
import Title from '@/components/ui/Title';
import { useOutletContext } from 'react-router-dom';

const AboutUs = () => {
  // Получаем данные из сторов
  // const info = useInfoStore((state) => state.info);
  const fetchInfo = useInfoStore((state) => state.fetchInfo);
  const update = useInfoStore((state) => state.update);
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { info } = useOutletContext<{
    info: any;
  }>();

  // Локальное состояние для инпутов
  const [formData, setFormData] = useState({
    name: '',
    tikect_info: '',
    address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await fetchUser();
      }

      if (user) {
        await fetchInfo({ user: user.$id });
      }
    };

    fetchData();
  }, [fetchUser, fetchInfo, user]);

  // Заполняем инпуты при наличии данных
  useEffect(() => {
    if (info && info.length > 0) {
      setFormData({
        name: info[0].name || '',
        tikect_info: info[0].tikect_info || '',
        address: info[0].address || '',
      });
    }
  }, [info]);

  // Обработчик изменения инпутов
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      console.log('Updated data:', formData);
      // Предположим, update - это функция для обновления данных
      await update(info[0].$id, formData);
      // await fetchInfo({ user: user.$id });
      setEditMode(false); // Устанавливаем режим редактирования в false только при успешном выполнении
      console.log('Данные успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      // Вы можете также показать уведомление об ошибке, если нужно
    }
  };

  return (
    <Box sx={{ maxWidth: '70%' }}>
      <Box sx={{ mb: 4 }}>
        <Title text='О себе' />
      </Box>

      <Stack
        direction='row'
        spacing={2}
      >
        <TextField
          fullWidth
          label='Наименование'
          name='name'
          value={formData.name}
          onChange={handleChange}
          margin='normal'
          disabled={!editMode}
        />

        <TextField
          fullWidth
          label='Адрес'
          name='address'
          value={formData.address}
          onChange={handleChange}
          margin='normal'
          disabled={!editMode}
        />
      </Stack>
      <TextField
        fullWidth
        multiline // Делаем поле многострочным
        rows={5} // Указываем количество строк
        label='Информация'
        name='tikect_info'
        value={formData.tikect_info}
        onChange={handleChange}
        margin='normal'
        disabled={!editMode}
      />

      {editMode && (
        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Обновить
        </Button>
      )}
      {!editMode && (
        <Button
          onClick={() => setEditMode(true)}
          variant='contained'
          color='secondary'
          sx={{ mt: 2 }}
        >
          Редактировать
        </Button>
      )}
    </Box>
  );
};

export default AboutUs;
