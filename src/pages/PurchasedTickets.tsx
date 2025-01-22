import Title from '@/components/ui/Title';
import useGlobalStore from '@/store/useGlobalStore';
import usePurchasedStore from '@/store/usePurchasedStore';
import { formatDate } from '@/utils/formatDate';
import { Box, Button, Chip, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ruRU } from '@mui/x-data-grid/locales';
import PurchasedFilter from '@/components/filters/PurchasedFilter';

const PurchasedTickets: React.FC = () => {
  const purchases = usePurchasedStore((state) => state.purchases);
  const fetchPurchases = usePurchasedStore((state) => state.fetchPurchases);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setLoading = useGlobalStore((state) => state.setLoading);
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchPurchases();
      } catch (error) {
        console.error('Ошибка загрузки билетов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchPurchases]);

  const handleSearch = async (filters: {
    user_email?: string;
    price?: number;
    status?: string;
  }) => {
    setLoading(true);

    try {
      // Формируем объект с фильтрами, исключая пустые значения
      const sanitizedFilters: Record<string, string | number> = {};

      if (filters.user_email) {
        sanitizedFilters.user_email = filters.user_email;
      }
      if (typeof filters.price === 'number') {
        sanitizedFilters.price = filters.price;
      }
      if (filters.status) {
        sanitizedFilters.status = filters.status;
      }

      // Вызываем fetchTickets с очищенными фильтрами
      await fetchPurchases({ ...sanitizedFilters });
    } catch (error) {
      console.error('Ошибка фильтрации билетов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setLoading(true);
    try {
      await fetchPurchases();
    } catch (error) {
      console.error('Ошибка загрузки билетов:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'ticket_id',
      headerName: 'ID Билета',
      width: 220,
      sortable: false,
    },

    {
      field: 'user_id',
      headerName: 'ID Пользователя',
      width: 200,
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Статус',
      width: 150,
      renderCell: (params) => {
        const status = params.value; // Значение статуса из строки
        return (
          <Chip
            label={
              status === 'purchased'
                ? 'Куплен'
                : status === 'punched'
                  ? 'Пробит'
                  : 'Неизвестный статус'
            }
            color={
              status === 'purchased'
                ? 'success'
                : status === 'punched'
                  ? 'warning'
                  : 'default'
            }
            variant='outlined'
          />
        );
      },
    },
    {
      field: 'user_email',
      headerName: 'Почта',
      width: 200,
      sortable: false,
    },

    {
      field: 'price',
      headerName: 'Цена',
      width: 200,
      valueGetter: (value) => `${value} руб`,
      sortComparator: (v1, v2) => {
        const num1 = parseFloat(v1.replace(' руб.', ''));
        const num2 = parseFloat(v2.replace(' руб.', ''));
        return num1 - num2;
      },
    },
    {
      field: '$updatedAt',
      headerName: 'Дата обновления',
      width: 150,
      valueGetter: (value) => formatDate(value),
    },
  ];

  return (
    <div>
      <Title text='Купленные Билеты' />
      <Stack
        direction='row'
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Button
          onClick={() => setActiveFilter((prev) => !prev)}
          variant='contained'
          color='secondary'
        >
          {activeFilter ? 'Скрыть фильтр' : 'Показать фильтр'}
        </Button>
        {activeFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 1, ease: 'easeInOut' },
            }}
          >
            <PurchasedFilter
              onSearch={handleSearch}
              onClear={handleClear}
            />
          </motion.div>
        )}
      </Stack>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={purchases ? purchases : []}
          columns={columns}
          getRowId={(row) => row.$id}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableColumnFilter
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          isCellEditable={() => false}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};
export default PurchasedTickets;
