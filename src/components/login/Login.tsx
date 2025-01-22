import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import useAuthStore from '@/store/useAuthStore';
import useGlobalStore from '@/store/useGlobalStore';
import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await login(data.email, data.password);
  };

  useEffect(() => {
    if (user) {
      console.log('user updated:', user);
    }
  }, [user]);

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
      <Box
        width='100%'
        maxWidth='500px'
        sx={{ textAlign: 'left', mb: 2 }}
      >
        <Typography
          variant='h4'
          gutterBottom
        >
          Вход
        </Typography>
        <Typography
          color='text.secondary'
          variant='body2'
          sx={{ textAlign: 'left', lineHeight: 1.6 }}
        >
          Нет аккаунта?
          <br />
          Попросите администратора выдать вам данные для входа или{' '}
          <Button
            onClick={() => navigate('/registration')}
            variant='text'
            color='primary'
            size='small'
            sx={{
              textTransform: 'none',
              padding: 0,
              minWidth: 'auto',
            }}
          >
            зарегистрируйтесь
          </Button>
          .
        </Typography>
      </Box>

      {/* Форма авторизации */}
      <Box
        component='form'
        width='100%'
        maxWidth='500px'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          spacing={3}
          sx={{ mb: 3 }}
        >
          {/* Поле для email */}
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Введите почтовый адрес',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Введите корректный почтовый адрес',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Почтовый адрес'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Поле для пароля */}
          <Controller
            name='password'
            control={control}
            rules={{
              required: 'Введите пароль',
              minLength: {
                value: 8,
                message: 'Пароль должен быть не менее 8 символов',
              },
              maxLength: {
                value: 20,
                message: 'Пароль должен быть не более 20 символов',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Пароль'
                type='password'
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Stack>

        {/* Кнопка или индикатор загрузки */}
        {isLoading ? (
          <Spinner />
        ) : (
          <Button
            fullWidth
            size='large'
            type='submit'
            variant='contained'
          >
            Войти
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Login;
