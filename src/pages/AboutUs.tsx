import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import useAuthStore from '@/store/useAuthStore';
import useInfoStore from '@/store/useInfoStore';

const AboutUs = () => {
  // Получаем данные из сторов
  const info = useInfoStore((state) => state.info);
  const fetchInfo = useInfoStore((state) => state.fetchInfo);
  const update = useInfoStore((state) => state.update);
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const [editMode, setEditMode] = useState<boolean>(false);

  // Локальное состояние для инпутов
  const [formData, setFormData] = useState({
    name: '',
    tikect_info: '',
    address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      // Если пользователь не загружен, загружаем его
      if (!user) {
        await fetchUser();
      }

      // Если пользователь существует, загружаем информацию
      if (user) {
        await fetchInfo({ user });
      }
    };

    fetchData();
  }, [fetchUser, fetchInfo, user]); // Указываем все зависимости

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
    console.log('Updated data:', formData);
    await update(info[0].$id, formData);
  };

  return (
    <Box sx={{ maxWidth: '70%' }}>
      <Button onClick={() => setEditMode(true)}>Редактировать</Button>
      <Stack
        direction='row'
        spacing={2}
      >
        <TextField
          fullWidth
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          margin='normal'
          disabled={!editMode}
        />

        <TextField
          fullWidth
          label='Address'
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
        label='Ticket Info'
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
          Submit
        </Button>
      )}
    </Box>
  );
};

export default AboutUs;
