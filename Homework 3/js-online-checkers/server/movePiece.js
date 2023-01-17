const RED_PAWN = 1;
const BLACK_PAWN = 2;
const RED_QUEEN = 3;
const BLACK_QUEEN = 4;
const GREEN_PAWN = 5;
const YELLOW_PAWN = 6;
const GREEN_QUEEN = 7;
const YELLOW_QUEEN = 8;
const TOP_ROW = 0;
const BOTTOM_ROW = 5;

module.exports = ({ game, destination, selectedPiece }) => {
  if (
    selectedPiece.i === undefined ||
    selectedPiece.j === undefined
  )
    return;
  const i = selectedPiece.i;
  const j = selectedPiece.j;
  const di = destination.i;
  const dj = destination.j;
  const distanceI = destination.i - selectedPiece.i;
  const distanceJ = destination.j - selectedPiece.j;
  const oneCellForwardI =
    i + Math.abs(distanceI) / distanceI;
  const oneCellForwardJ =
    j + Math.abs(distanceJ) / distanceJ;
  const destinationPiece = game.board[di][dj];
  const piece = game.board[i][j];

  // only move to empty spaces
  if (destinationPiece !== 0) return;

  // mustn't move diagonal
  if (Math.abs(distanceI) === Math.abs(distanceJ)) return;

  // red pawn can't move up
  if (piece === RED_PAWN && di < i) return;
  if (piece === RED_PAWN && dj > j) return;

  // black pawn can't move down
  if (piece === BLACK_PAWN && di > i) return;
  if (piece === BLACK_PAWN && dj < j) return;

  // green pawn can't move down
  if (piece === GREEN_PAWN && di > i) return;
  if (piece === GREEN_PAWN && dj > j) return;

  // yellow pawn can't move up
  if (piece === YELLOW_PAWN && di < i) return;
  if (piece === YELLOW_PAWN && dj < j) return;

  // can only move 1 or 2 slots
  if (Math.abs(distanceI) > 2) return;

  if (Math.abs(distanceI) === 2) {
    // check if jumping a piece
    const middlePiece =
      game.board[oneCellForwardI][oneCellForwardJ];
    if (middlePiece === 0) return;
    if (middlePiece !== piece) {
      game.board[oneCellForwardI][oneCellForwardJ] = 0;
    } else {
      return;
    }
  }

  game.board[di][dj] = game.board[i][j];
  game.board[i][j] = 0;

  if (piece === RED_PAWN && di === BOTTOM_ROW) {
    game.board[di][dj] = RED_QUEEN;
  } else if (piece === BLACK_PAWN && di === TOP_ROW) {
    game.board[di][dj] = BLACK_QUEEN;
  } else if (piece === GREEN_PAWN && di === TOP_ROW) {
    game.board[di][dj] = GREEN_QUEEN;
  } else if (piece === YELLOW_PAWN && di === BOTTOM_ROW) {
    game.board[di][dj] = YELLOW_QUEEN;
  }

  if (game.turn === 'red') {
    game.turn = 'green';
  } else if (game.turn === 'green') {
    game.turn = 'black';
  } else if (game.turn === 'black') {
    game.turn = 'yellow';
  } else if (game.turn === 'yellow') {
    game.turn = 'red';
  }
};
