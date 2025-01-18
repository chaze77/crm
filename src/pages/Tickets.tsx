import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useTicketStore from '@/store/useTicketStore';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import Title from '@/components/ui/Title';
import useGlobalStore from '@/store/useGlobalStore';

const Tickets = () => {
  const tickets = useTicketStore((state) => state.tickets);
  const fetchTickets = useTicketStore((state) => state.fetchTickets);
  const navigate = useNavigate();

  const isLoading = useGlobalStore((state) => state.isLoading);
  const setLoading = useGlobalStore((state) => state.setLoading);

  const { selectedMuseum } = useOutletContext<{
    selectedMuseum: string;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedMuseum) {
        setLoading(true); // Включаем состояние загрузки
        try {
          await fetchTickets({ museum_id: selectedMuseum });
        } catch (error) {
          console.error('Ошибка загрузки билетов:', error);
        } finally {
          setLoading(false); // Выключаем состояние загрузки
        }
      }
    };

    fetchData();
  }, [fetchTickets, selectedMuseum, setLoading]);

  const formatDate = (isoString: string): string => {
    return dayjs(isoString).format('DD.MM.YYYY');
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#002868',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  }));

  const handleRowClick = (ticketId: string) => {
    navigate(`/ticket-details/${ticketId}`);
  };

  return (
    <div>
      <Title text='Билеты' />
      <Box sx={{ mb: 2 }}>
        <Button
          variant='contained'
          color='success'
          onClick={() => navigate('/ticket-details')}
        >
          Добавить
        </Button>
      </Box>

      {/* Спиннер во время загрузки */}
      {isLoading ? (
        <Stack
          sx={{
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label='customized table'
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Наименование</StyledTableCell>
                <StyledTableCell align='left'>Цена</StyledTableCell>
                <StyledTableCell align='left'>Дата обновления</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets?.length ? (
                tickets.map((ticket) => (
                  <StyledTableRow
                    key={ticket.$id}
                    onClick={() => handleRowClick(ticket.$id)}
                  >
                    <StyledTableCell
                      component='th'
                      scope='row'
                    >
                      {ticket.name}
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      {ticket.cost} руб
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      {formatDate(ticket.$updatedAt)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={3}
                    align='center'
                  >
                    Нет данных
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Tickets;
