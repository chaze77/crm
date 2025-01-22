import React, { useState, useEffect } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import TableFilter from '@/components/filters/TableFilter';
import useTicketStore from '@/store/useTicketStore';
import useGlobalStore from '@/store/useGlobalStore';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Title from '@/components/ui/Title';
import { motion } from 'framer-motion';
import { ruRU } from '@mui/x-data-grid/locales';
import { formatDate } from '@/utils/formatDate';

const TestTickets: React.FC = () => {
  const tickets = useTicketStore((state) => state.tickets);
  const fetchTickets = useTicketStore((state) => state.fetchTickets);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setLoading = useGlobalStore((state) => state.setLoading);
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState(false);

  const { selectedMuseum } = useOutletContext<{ selectedMuseum: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedMuseum) {
        setLoading(true);
        try {
          await fetchTickets({ museum_id: selectedMuseum });
        } catch (error) {
          console.error('Ошибка загрузки билетов:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [fetchTickets, selectedMuseum, setLoading]);

  //   const formatDate = (isoString: string): string => {
  //     return dayjs(isoString).format('DD.MM.YYYY');
  //   };

  const handleSearch = async (filters: {
    name?: string;
    cost?: number;
    $id?: string;
  }) => {
    setLoading(true);

    try {
      // Формируем объект с фильтрами, исключая пустые значения
      const sanitizedFilters: Record<string, string | number> = {};

      if (filters.name) {
        sanitizedFilters.name = filters.name;
      }
      if (typeof filters.cost === 'number') {
        sanitizedFilters.cost = filters.cost;
      }
      if (filters.$id) {
        sanitizedFilters.$id = filters.$id;
      }

      // Вызываем fetchTickets с очищенными фильтрами
      await fetchTickets({ museum_id: selectedMuseum, ...sanitizedFilters });
    } catch (error) {
      console.error('Ошибка фильтрации билетов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setLoading(true);
    try {
      await fetchTickets({ museum_id: selectedMuseum });
    } catch (error) {
      console.error('Ошибка загрузки билетов:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Наименование', width: 220 },
    {
      field: 'cost',
      headerName: 'Цена',
      width: 200,
      valueGetter: (value) => `${value} руб`,
      sortComparator: (v1, v2) => {
        const num1 = parseFloat(v1.replace(' руб.', ''));
        const num2 = parseFloat(v2.replace(' руб.', ''));
        return num1 - num2;
      },
    },
    { field: '$id', headerName: 'ID', width: 200, sortable: false },
    {
      field: '$updatedAt',
      headerName: 'Дата обновления',
      width: 150,
      valueGetter: (value) => formatDate(value),
    },
    {
      field: 'actions', // Уникальное имя поля
      headerName: 'Действие',
      width: 150,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='warning'
          size='small'
          onClick={() => navigate(`/ticket-details/${params.row.$id}`)} // Обработчик для редактирования
        >
          Редактировать
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title text='Test Tickets' />
      <Stack
        direction='row'
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Button
          variant='contained'
          color='success'
          onClick={() => navigate('/ticket-details')}
        >
          Добавить
        </Button>
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
            <TableFilter
              onSearch={handleSearch}
              onClear={handleClear}
            />
          </motion.div>
        )}
      </Stack>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tickets}
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

export default TestTickets;
