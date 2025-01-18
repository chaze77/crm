import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Box, Button, Stack, TextField } from '@mui/material';
import useTicketStore from '@/store/useTicketStore';
import Title from '@/components/ui/Title';
import Modal from '@/components/ui/CustomModal';

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
    selectedMuseum: string;
  }>();

  const [formState, setFormState] = useState({
    name: '',
    cost: '',
    museum_id: selectedMuseum,
  });

  const [createMode, setCreateMode] = useState<boolean>(!id);
  const [editMode, setEditMode] = useState<boolean>(createMode);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false); // Состояние модального окна для удаления

  useEffect(() => {
    if (id) {
      getById(id);
      setCreateMode(false);
      setEditMode(false);
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
    setEditMode(false);
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
    setEditMode(true);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <Box
      sx={{
        maxWidth: '70%',
      }}
    >
      <Title text={createMode ? 'Создание билета' : 'Редактирование билета'} />
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Stack
          direction='row'
          spacing={2}
        >
          {editMode && (
            <Button
              variant='contained'
              color='success'
              onClick={handleSave}
            >
              {createMode ? 'Создать' : 'Сохранить'}
            </Button>
          )}
          {!createMode && !editMode && (
            <Button
              variant='contained'
              color='warning'
              onClick={handleEdit}
            >
              Редактировать
            </Button>
          )}
          <Button
            variant='contained'
            color='neutral'
            onClick={close}
          >
            Отмена
          </Button>
        </Stack>

        {!createMode && (
          <Button
            variant='contained'
            color='error'
            onClick={openDeleteModal}
          >
            Удалить
          </Button>
        )}
      </Box>

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
          error={Boolean(error)}
          helperText={error}
          disabled={!editMode}
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
          disabled={!editMode}
        />
      </Box>

      {/* Модальное окно для подтверждения удаления */}
      <Modal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        content='Вы уверены, что хотите удалить этот билет?'
      />
    </Box>
  );
};

export default TicketDetails;
