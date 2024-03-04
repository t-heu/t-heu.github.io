const container = document.querySelector('.game');

const game_narration = document.querySelector('.game-narration');
const play = document.getElementById("play");

const x_campo = document.querySelector('#x_campo');
const o_campo = document.querySelector('#o_campo');

const banner = document.querySelector(".banner");
const winning_symbol = document.getElementById("s");
const winning_text = document.getElementById("w");

const score_x = document.getElementById("score_x");
const score_o = document.getElementById("score_o");

const tic_tac_toe = {
  board: ['', '', '', '', '', '', '', '', ''],
  symbols: {
    option_symbols: ['〇', '✕', '〇✕'],
    turn_index: 0,
    change: function() {
      this.turn_index = (this.turn_index === 0 ? 1 : 0);
    }
  },
  sequences: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  score: {
    score_x: 0,
    score_o: 0
  },
  players: {
    x: '',
    o: ''
  },
  container_element: null,
  gameover: false,
  select: 2,
  game_narration: null,
  id: null,
  name: '',
  ref: function() {
    return this.id ? firebase.database().ref(`ttt/${this.id}`) : firebase.database().ref('ttt');
  },

  inicialize: function(container, xx, oo, game_narration) {
    this.container_element = container;
    this.players.o = oo.value ? oo.value : this.symbols.option_symbols[0];
    this.players.x = xx.value ? xx.value : this.symbols.option_symbols[1];
    this.game_narration = game_narration;
    this.gameover = true;
  },
  
  start: function() {
    container.style.display = "grid";
    x_campo.style.display = "none";
    o_campo.style.display = "none";
    banner.style.display = "none";

    this.board.fill('');
    this.setNarrationText();
    
    if (this.select === 1 || this.select === 2) {
      this.gameover = false;
      play.innerText = "REPLAY";
      this.draw();
    }
    
    if (this.select === 1 && this.symbols.turn_index === 1) {
      this.machine();
    }
    
    if (this.select === 3) {
      this.matchmaker();
      this.watchGame();
    }
  },
  
  matchmaker: function() {
    const arr = [];
    
    this.ref().once('value', (snapshot) => {
      snapshot.forEach(data => {
        const game = data.val();

        if (game.state === 'ROOM') {
          arr.push({
            game, 
            id: data.key
          })
        }
      });
    }).then(() => {
      const res = arr.every(data => {
        // logic.... game, id....
        this.id = data.id;
        this.ref().update({
          p2: this.name,
          state: 'JOINED'
        });
        return false
      });
      
      if (res) {
        const id = this.ref().push({
          board: this.board,
          p1: this.name,
          p2: '',
          state: 'ROOM'
        });
        this.id = id.key;
      }
    })
  },
  
  watchGame: function() {
    this.ref().on('child_changed', (snapshot) => {
      const data = snapshot.val();
      
      if (data === 'JOINED') {
        this.draw();
      }
      
      if (data.length > 0) {
        this.board = data;
        this.draw();
      }
      //this.symbols.change();
      //this.setNarrationText();
    });
  },

  make_play: function(position) {
    if (this.gameover) return;
    
    if (this.board[position] !== '') return;

    this.board[position] = this.symbols.option_symbols[this.symbols.turn_index]
    this.draw();
    
    if (this.select === 3) {
      this.ref().update({
        board: this.board
      });
    }
    
    if (this.check_winning_sequences(this.symbols.option_symbols[this.symbols.turn_index])) {
      this.game_is_over();
      this.stylize_winner_sequence(this.symbols.turn_index);
      return;
    }
    
    if (this.check_draw()) {
      this.stylize_winner_sequence(2);
      this.game_is_over();
      return;
    }
    
    this.symbols.change();
    this.setNarrationText();
    if (this.select === 1 && this.symbols.turn_index === 1) {
      this.machine();
    }
  },

  draw: function() {
    let content = '';

    for (let i = 0; i < this.board.length; i++) {
      const classe = this.board[i] === this.symbols.option_symbols[0]
    
      content += `
        <div onclick="tic_tac_toe.make_play(${i})">
          <span class=${classe ? "oo" : "xx"}>${this.board[i]}</span>
        </div>`;
    }

    this.container_element.innerHTML = content;
  },

  check_draw: function() {
    for (let i in this.board) {
      if (this.board[i] === '')
        return false;
    }
    return true;
  },

  check_winning_sequences: function(symbol) {
    for (let i in this.sequences) {
      if (this.board[this.sequences[i][0]] === symbol && this.board[this.sequences[i][1]] === symbol && this.board[this.sequences[i][2]] === symbol) {
        return true;
      }
    }
    return false;
  },

  stylize_winner_sequence: function(index) {
    if (index === 2) {
      winning_symbol.innerHTML = `<span class='xx'>${this.symbols.option_symbols[1]}</span><span class='oo'>${this.symbols.option_symbols[0]}</span>`;
    }
    
    if (index === 0) {
      this.score.score_o +=1;
      score_o.innerHTML = `${this.symbols.option_symbols[index]} - ${this.score.score_o}`;
      winning_symbol.innerHTML = `<span class="oo">${this.symbols.option_symbols[index]}</span>`;
    }
    
    if (index === 1) {
      this.score.score_x = +1;
      score_x.innerHTML = `${this.symbols.option_symbols[index]} - ${this.score.score_x}`;
      winning_symbol.innerHTML = `<span class="xx">${this.symbols.option_symbols[index]}</span>`;
    }
    
    winning_text.innerText = (index === 2 ? "OLD!" : "WIN!");
  },
  
  setNarrationText: function() {
    /*if (this.select === 3) {
      this.game_narration.innerText = 'sua vez'
      return;
    }*/
    
    this.game_narration.innerText = `${this.symbols.turn_index === 1 ? this.players.x : this.players.o} turn`;
  },

  game_is_over: function() {
    this.gameover = true;
    this.game_narration.innerText = 'game over';
    play.innerText = "Jogar novamente?";
    
    if (this.select === 3) {
      this.ref().update({
        state: 'FINISHED'
      });
    }
    
    setTimeout(() => {
      play.style.display = 'inline-block';
      container.style.display = "none";
      banner.style.display = "flex";
    }, 1000);
  },

  machine: function() {
    if (this.machine_strategic_move(this.symbols.option_symbols[this.symbols.turn_index]) > -1) {
      this.make_play(this.machine_strategic_move(this.symbols.option_symbols[this.symbols.turn_index]));
    } else if (this.machine_strategic_move(this.symbols.option_symbols[this.turn_index === 0 ? 1 : 0]) > -1) {
      this.make_play(this.machine_strategic_move(this.symbols.option_symbols[this.turn_index === 0 ? 1 : 0]));
    } else {
      this.make_play(this.machine_random_move());
    }
  },

  machine_strategic_move: function(symbol) {
    let score;
    for (let i = 0; i < this.sequences.length; i++) {
      score = 0;
      if (this.board[this.sequences[i][0]] === symbol)
        score++;
      if (this.board[this.sequences[i][1]] === symbol)
        score++;
      if (this.board[this.sequences[i][2]] === symbol)
        score++;

      if (score === 2) {
        if (this.board[this.sequences[i][0]] === '') {
          return this.sequences[i][0];
        }
        if (this.board[this.sequences[i][1]] === '') {
          return this.sequences[i][1];
        }
        if (this.board[this.sequences[i][2]] === '') {
          return this.sequences[i][2];
        }
      }
    }
    return -1;
  },

  machine_random_move: function() {
    let position;
    do {
      position = Math.floor(Math.random() * 8);
    } while (this.board[position] !== '');
    return position;
  },
}

tic_tac_toe.inicialize(container, x_campo, o_campo, game_narration);
