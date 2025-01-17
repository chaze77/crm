import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import useTicketStore from '@/store/useTicketStore';

const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ticket = useTicketStore((state) => state.ticket);
  const getById = useTicketStore((state) => state.getById);
  const reset = useTicketStore((state) => state.resetCategory);
  const create = useTicketStore((state) => state.create);
  const update = useTicketStore((state) => state.update);
  const deleteItem = useTicketStore((state) => state.delete);
  const navigate = useNavigate();
  const { selectedMuseum } = useOutletContext<{
    selectedMuseum: any;
  }>();

  const [formState, setFormState] = useState({
    name: '',
    cost: '',
    museum_id: selectedMuseum,
  });

  const [createMode, setCreateMode] = useState<boolean>(!id);
  const [editMode, setEditMode] = useState<boolean>(createMode);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getById(id);
      setCreateMode(false);
      setEditMode(false); // Отключаем режим редактирования по умолчанию
    }
  }, [id, getById]);

  useEffect(() => {
    if (ticket) {
      setFormState({
        ...formState,
        name: ticket.name || '',
        cost: ticket.cost?.toString() || '',
      });
    }
  }, [ticket]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cost' && value && isNaN(Number(value))) {
      setError('Стоимость должна быть числом');
      return;
    }
    setError(null);

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formState.name.trim()) {
      setError('Название обязательно');
      return;
    }

    if (!formState.cost || isNaN(Number(formState.cost))) {
      setError('Стоимость обязательна и должна быть числом');
      return;
    }

    const payload = {
      ...formState,
      cost: Number(formState.cost),
    };

    if (createMode) {
      await create(payload);
    } else if (id) {
      await update(id, payload);
    }
    setEditMode(false); // Выходим из режима редактирования после сохранения
    navigate('/tickets');
  };

  const close = () => {
    reset();
    setFormState({
      museum_id: '',
      name: '',
      cost: '',
    });
    navigate('/tickets');
  };

  const handleDelete = async () => {
    if (id) {
      await deleteItem(id);
    }
    navigate('/tickets');
  };

  const handleEdit = () => {
    setEditMode(true); // Включаем режим редактирования
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: 'auto',
        mt: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography
        variant='h4'
        mb={2}
      >
        {createMode ? 'Создание билета' : 'Редактирование билета'}
      </Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
      >
        <TextField
          fullWidth
          label='Название'
          name='name'
          value={formState.name}
          onChange={handleInputChange}
          margin='normal'
          error={!formState.name.trim() && Boolean(error)}
          helperText={!formState.name.trim() ? 'Название обязательно' : ''}
          disabled={!editMode} // Отключаем поле, если не режим редактирования
        />
        <TextField
          fullWidth
          label='Стоимость (рубли)'
          name='cost'
          value={formState.cost}
          onChange={handleInputChange}
          margin='normal'
          error={Boolean(error)}
          helperText={error}
          type='text'
          disabled={!editMode} // Отключаем поле, если не режим редактирования
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          {editMode && (
            <Button
              variant='contained'
              color='primary'
              onClick={handleSave}
            >
              {createMode ? 'Создать' : 'Сохранить'}
            </Button>
          )}
          {!createMode && !editMode && (
            <Button
              variant='contained'
              color='primary'
              onClick={handleEdit}
            >
              Редактировать
            </Button>
          )}
          {!createMode && (
            <Button
              variant='outlined'
              color='error'
              onClick={handleDelete}
            >
              Удалить
            </Button>
          )}
          <Button
            variant='text'
            color='secondary'
            onClick={close}
          >
            Отмена
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketDetails;
