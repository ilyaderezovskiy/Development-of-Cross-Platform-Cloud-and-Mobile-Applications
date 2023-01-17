let nextGameId = 0;

const movePiece = require('./movePiece');

const games = [];

const getGameForPlayer = (player) => {
  return games.find((g) =>
    g.players.find((p) => p.socket === player)
  );
};

exports.getGames = () =>
  games.map((g) => {
    const { players, ...game } = g;
    return {
      ...game,
      numberOfPlayers: players.length,
    };
  });

exports.createGame = ({ player, name }) => {
  const game = {
    name,
    turn: 'red',
    players: [
      {
        socket: player,
        color: 'red',
      },
    ],
    chat: [],
    id: nextGameId++,
    board: [
      [6, 6, 6, 1, 1, 1],
      [6, 6, 0, 0, 1, 1],
      [6, 0, 0, 0, 0, 1],
      [2, 0, 0, 0, 0, 5],
      [2, 2, 0, 0, 5, 5],
      [2, 2, 2, 5, 5, 5],
    ],
  };
  games.push(game);
  return game;
};

exports.movePiece = ({
  player,
  selectedPiece,
  destination,
}) => {
  const game = getGameForPlayer(player);
  movePiece({ game, destination, selectedPiece });
};

exports.getGameById = (gameId) =>
  exports.getGames().find((g) => g.id === gameId);

exports.addPlayerToGame = ({ player, gameId }) => {
  const game = games.find((g) => g.id === gameId);

  if (game.players.length === 2) {
    game.players.push({
      color: 'black',
      socket: player,
    });
  
    return 'black';
  }

  if (game.players.length === 1) {
    game.players.push({
      color: 'green',
      socket: player,
    });
  
    return 'green';
  }

  if (game.players.length === 3) {
    game.players.push({
      color: 'yellow',
      socket: player,
    });
  
    return 'yellow';
  }
  
};

exports.endGame = ({ player, winner }) => {
  const game = getGameForPlayer(player);
  // players might disconnect while in the lobby
  if (!game) return;
  games.splice(games.indexOf(game), 1);
  game.players.forEach((currentPlayer) => {
    if (player !== currentPlayer.socket)
      currentPlayer.socket.emit('end-game');
    if (winner) currentPlayer.socket.emit('winner', winner);
  });
};

exports.isGameOver = ({ player }) => {
  const game = getGameForPlayer(player);

  let redCount = 0;
  let blackCount = 0;
  let greenCount = 0;
  let yellowCount = 0;

  for (let i = 0; i < game.board.length; i++) {
    for (let j = 0; j < game.board[i].length; j++) {
      if (
        game.board[i][j] === 1 ||
        game.board[i][j] === 3
      ) {
        redCount++;
      }
      if (
        game.board[i][j] === 2 ||
        game.board[i][j] === 4
      ) {
        blackCount++;
      }
      if (
        game.board[i][j] === 5 ||
        game.board[i][j] === 7
      ) {
        greenCount++;
      }
      if (
        game.board[i][j] === 6 ||
        game.board[i][j] === 8
      ) {
        yellowCount++;
      }
    }
  }
  if (redCount === 0 && blackCount === 0 && greenCount === 0) {
    return 'yellow';
  } else if (redCount === 0 && yellowCount === 0 && greenCount === 0) {
    return 'black';
  } else if (redCount === 0 && yellowCount === 0 && blackCount === 0) {
    return 'green';
  } else if (blackCount === 0 && yellowCount === 0 && greenCount === 0) {
    return 'red';
  }  else {
    return false;
  }
};

exports.addChatMessage = ({ player, message }) => {
  const game = getGameForPlayer(player);
  game.chat.push(message);
};
