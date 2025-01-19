import { useState } from 'react';
import { IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

interface FilterProps {
  onSearch: (filters: {
    userEmail?: string;
    price?: number;
    status?: string;
  }) => void;
  onClear: () => void;
}

const PurchasedFilter: React.FC<FilterProps> = ({ onSearch, onClear }) => {
  const [userEmail, setUserEmail] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [status, setStatus] = useState('');

  const handleSearch = () => {
    onSearch({
      userEmail: userEmail || undefined,
      price: price !== '' ? price : undefined, // Если поле пустое, убираем фильтр
      status: status || undefined,
    });
  };

  const handleClear = () => {
    setUserEmail('');
    setPrice('');
    setStatus('');
    onClear();
  };

  return (
    <div>
      <Stack
        direction='row'
        spacing={1}
      >
        <TextField
          size='small'
          label='Почта'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <TextField
          size='small'
          label='Цена'
          value={price}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(Number(value)) || value === '') {
              setPrice(value === '' ? '' : Number(value));
            }
          }}
          sx={{ maxWidth: '150px' }}
        />
        <TextField
          size='small'
          label='Статус'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ maxWidth: '150px' }}
        />
        <Stack direction='row'>
          <IconButton
            color='primary'
            aria-label='search'
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            color='warning'
            aria-label='clear'
            onClick={handleClear}
          >
            <RotateLeftIcon />
          </IconButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default PurchasedFilter;
