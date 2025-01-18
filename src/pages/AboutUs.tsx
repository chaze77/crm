import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import useAuthStore from '@/store/useAuthStore';
import useInfoStore from '@/store/useInfoStore';
import Title from '@/components/ui/Title';
import { useOutletContext } from 'react-router-dom';
import { IInfo } from '@/types';

const AboutUs = () => {
  const fetchInfo = useInfoStore((state) => state.fetchInfo);
  const update = useInfoStore((state) => state.update);
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { info } = useOutletContext<{
    info: IInfo[];
  }>();

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
    await update(info[0].$id, formData);
    setEditMode(false);
  };

  return (
    <Box sx={{ maxWidth: '70%' }}>
      <Title text='О себе' />

      <Box sx={{ mb: 2 }}>
        {editMode && (
          <Button
            variant='contained'
            color='success'
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
        )}
        {!editMode && (
          <Button
            onClick={() => setEditMode(true)}
            variant='contained'
            color='warning'
          >
            Редактировать
          </Button>
        )}
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
        multiline
        rows={5}
        label='Информация'
        name='tikect_info'
        value={formData.tikect_info}
        onChange={handleChange}
        margin='normal'
        disabled={!editMode}
      />
    </Box>
  );
};

export default AboutUs;
