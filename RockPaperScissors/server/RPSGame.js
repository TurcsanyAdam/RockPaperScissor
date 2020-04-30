class RpsGame {

    constructor(p1, p2) {
        this._players = [p1, p2];
        this._turns = [null, null];
        this.p1Wins = 0;
        this.p2Wins = 0;

        this._sendToPlayers('Rock Paper Scissors Starts!');

        this._players.forEach((player, idx) => {
            player.on('turn', (turn) => {
                this._onTurn(idx, turn);
            });
        });
    }

    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit('message', msg);
    }

    _sendToPlayers(msg) {
        this._players.forEach((player) => {
            player.emit('message', msg);
        });
    }

    _onTurn(playerIndex, turn) {
        this._turns[playerIndex] = turn;
        this._sendToPlayer(playerIndex, `You selected ${turn}`);

        this._checkGameOver();
    }

    _checkGameOver() {
        const turns = this._turns;
        
        
        
        if (turns[0] && turns[1]) {

            setTimeout(() => { this._sendToPlayers("3"); }, 1000);
            setTimeout(() => { this._sendToPlayers("2"); }, 2000);
            setTimeout(() => { this._sendToPlayers("1"); }, 3000);
            setTimeout(() => { this._sendToPlayers("GO!"); }, 4000);
            setTimeout(() => {
                this._sendToPlayers('Game over ' + turns.join(' : '));
                this._getGameResult();
                this._turns = [null, null];
                this._sendToPlayers('Next Round!!!!');}, 5000);
            
            
        }
    }

    _getGameResult() {

        const p0 = this._decodeTurn(this._turns[0]);
        const p1 = this._decodeTurn(this._turns[1]);

        const distance = (p1 - p0 + 3) % 3;

        switch (distance) {
            case 0:
                this._sendToPlayers('Draw!');
                this._sendToPlayers(`Current standing: Player 1: ${this.p1Wins} win(s) --- Player 2: ${this.p2Wins} win(s)`);
                break;

            case 1:
                this.p1Wins += 1;
                this._sendWinMessage(this._players[0], this._players[1]);
                this._sendToPlayers(`Current standing: Player 1: ${this.p1Wins} win(s) --- Player 2: ${this.p2Wins} win(s)`);
                break;

            case 2:
                this.p2Wins += 1;
                this._sendWinMessage(this._players[1], this._players[0]);         
                this._sendToPlayers(`Current standing: Player 1: ${this.p1Wins} win(s) --- Player 2: ${this.p2Wins} win(s)`);
                break;
        }
    }

    _sendWinMessage(winner, loser) {
        winner.emit('message', `You won!`);
        loser.emit('message', 'You lost!');
    }

    _decodeTurn(turn) {
        switch (turn) {
            case 'rock':
                return 0;
            case 'scissors':
                return 1;
            case 'paper':
                return 2;
            default:
                throw new Error(`Could not decode turn ${turn}`);
        }
    }


}

module.exports = RpsGame;
