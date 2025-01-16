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
import { Button } from '@mui/material';

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
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    cursor: 'pointer', // Устанавливаем курсор pointer
    '&:hover': {
      backgroundColor: theme.palette.action.selected, // Эффект при наведении
    },
  }));

  const handleRowClick = (ticketId: string) => {
    navigate(`/ticket-details/${ticketId}`); // Переход на страницу с деталями билета
  };

  return (
    <div>
      <Button variant='outlined'>Добавить</Button>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label='customized table'
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align='right'>Cost</StyledTableCell>
              <StyledTableCell align='right'>Updated Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <StyledTableRow
                key={ticket.$id}
                onClick={() => handleRowClick(ticket.$id)} // Добавляем обработчик клика
              >
                <StyledTableCell
                  component='th'
                  scope='row'
                >
                  {ticket.name}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {ticket.cost} руб
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {formatDate(ticket.$updatedAt)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tickets;
