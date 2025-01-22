import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { Controller, useForm } from 'react-hook-form';

import { fields } from '@/constants/formValues';
import useRegisterStore from '@/store/useRigisterStore';
import Spinner from '../ui/Spinner';
import useGlobalStore from '@/store/useGlobalStore';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

const RegisterForm = () => {
  const register = useRegisterStore((state) => state.register);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      comment: '',
    },
  });

  const theme = useTheme();

  const onSubmit = async (data: FormValues) => {
    try {
      await register(data);
      navigate('/success');
      reset();
    } catch (error) {
      console.error('Ошибка при обработке формы:', error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ maxWidth: '500px', width: '100%' }}>
        <Typography
          variant='h4'
          sx={{
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.typography.h5.fontSize,
            },
            textAlign: 'left',
          }}
          gutterBottom
        >
          Заявка на регистрацию
        </Typography>
      </Box>
      <Stack
        component='form'
        width='100%'
        maxWidth='500px'
        onSubmit={handleSubmit(onSubmit)}
        spacing={3}
        sx={{ mb: 3 }}
      >
        {fields.map(({ name, label, required, type, validate, pattern }) => (
          <Controller
            key={name}
            name={name as keyof FormValues}
            control={control}
            rules={{
              required: required as string,
              validate,
              pattern,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={label}
                error={!!errors[name as keyof FormValues]}
                helperText={errors[name as keyof FormValues]?.message}
                onChange={(e) => field.onChange(e.target.value)} // Для TextField требуется явно обработать onChange
                type={type === 'tel' ? 'tel' : 'text'} // Устанавливаем тип input для телефонного поля
              />
            )}
          />
        ))}

        <Button
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          sx={{
            backgroundColor: '#2a1771',
            '&:hover': {
              backgroundColor: '#7d63b8',
            },
            textTransform: 'none',
          }}
        >
          Отправить
        </Button>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}
        >
          <Typography>Уже есть аккаунт</Typography>
          <Button
            size='small'
            color='secondary'
            onClick={() => navigate('/')}
          >
            Войти
          </Button>
        </Box>
      </Stack>
      {isLoading && <Spinner />}
    </Container>
  );
};

export default RegisterForm;
