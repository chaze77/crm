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
import { Box, Button } from '@mui/material';
import Title from '@/components/ui/Title';

const Tickets = () => {
  const tickets = useTicketStore((state) => state.tickets);
  const fetchTickets = useTicketStore((state) => state.fetchTickets);
  const navigate = useNavigate();

  const { selectedMuseum } = useOutletContext<{
    selectedMuseum: any;
  }>();

  useEffect(() => {
    if (selectedMuseum) {
      fetchTickets({ museum_id: selectedMuseum });
    }
  }, [fetchTickets, selectedMuseum]);

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
      backgroundColor: theme.palette.action.selected, // Эффект при наведении
    },
  }));

  const handleRowClick = (ticketId: string) => {
    navigate(`/ticket-details/${ticketId}`); // Переход на страницу с деталями билета
  };

  return (
    <div>
      <Title text='Билеты' />
      <Box sx={{ mb: 2 }}>
        {' '}
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate('/ticket-details')}
        >
          Добавить
        </Button>
      </Box>

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
                  style={{ cursor: 'pointer' }}
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
    </div>
  );
};

export default Tickets;
