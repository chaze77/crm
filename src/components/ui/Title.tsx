import { Typography } from '@mui/material';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <Typography
      variant='h4'
      gutterBottom
      sx={(theme) => ({
        color: theme.typography.h4.color,
        mb: 2,
      })}
    >
      {text}
    </Typography>
  );
};

export default Title;
