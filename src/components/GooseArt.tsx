import { Box, styled } from '@mui/material';

const AsciiArtBox = styled(Box)`
  font-family: monospace;
  white-space: pre;
  line-height: 1.2;
  text-align: center;
  user-select: none;
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