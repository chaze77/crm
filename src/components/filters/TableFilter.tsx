import { useState } from 'react';
import { IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

interface FilterProps {
  onSearch: (filters: { name?: string; cost?: number; $id?: string }) => void;
  onClear: () => void;
}

const TableFilter: React.FC<FilterProps> = ({ onSearch, onClear }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState<number | ''>('');
  const [id, setId] = useState('');

  const handleSearch = () => {
    onSearch({
      name: name || undefined,
      cost: cost !== '' ? cost : undefined, // Если поле пустое, убираем фильтр
      $id: id || undefined,
    });
  };

  const handleClear = () => {
    setName('');
    setCost('');
    setId('');
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
          label='Наименование'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          size='small'
          label='Цена'
          value={cost}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(Number(value)) || value === '') {
              setCost(value === '' ? '' : Number(value));
            }
          }}
          sx={{ maxWidth: '150px' }}
        />
        <TextField
          size='small'
          label='ID'
          value={id}
          onChange={(e) => setId(e.target.value)}
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

export default TableFilter;
