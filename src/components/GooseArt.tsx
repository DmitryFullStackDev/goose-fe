import { Box, styled } from '@mui/material';

const AsciiArtBox = styled(Box)`
  font-family: monospace;
  line-height: 1.2;
  text-align: center;
  user-select: none;
  width: 300px;
  margin: 0 auto;

  @media (max-width: 490px) {
    width: 220px;
    font-size: 11px;
  }
`;

export const GooseArt = () => {
  return (
    <AsciiArtBox>
      {'            ░░░░░░░░░░░░░░░            \n'}
      {'          ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░          \n'}
      {'        ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░        \n'}
      {'        ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░        \n'}
      {'      ░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░      \n'}
      {'    ░░▒▒▒▒░░░░▓▓▓▓▓▓▓▓▓▓▓▓░░░░▒▒▒▒░░  \n'}
      {'    ░░▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▒▒░░  \n'}
      {'    ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░  \n'}
      {'      ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░    \n'}
      {'        ░░░░░░░░░░░░░░░░░░░░░░░░░░    \n'}
    </AsciiArtBox>
  );
};
