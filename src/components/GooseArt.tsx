import { Box, styled } from '@mui/material';

const AsciiArtBox = styled(Box)`
  font-family: monospace;
  line-height: 1.2;
  text-align: center;
  user-select: none;
  width: 300px;
  margin: 0 auto;
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
