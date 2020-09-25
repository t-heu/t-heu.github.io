/*jshint esversion: 6 */
const container = document.querySelector('.game');

const game_narration = document.querySelector('.game-narration');
const play = document.getElementById("play");

var x_campo = document.querySelector('#x_campo');
const o_campo = document.querySelector('#o_campo');

const banner = document.querySelector(".banner");
const winning_symbol = document.getElementById("s");
const winning_text = document.getElementById("w");

const score_x = document.getElementById("score_x");
const score_o = document.getElementById("score_o");

const tic_tac_toe = {
  id: "",
  board: ['', '', '', '', '', '', '', '', ''],
  symbols: {
    option_symbols: ['〇','✕'],
    options: ['<span class="oo">〇</span>', '<span class="xx">✕</span>'],
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
    x: '✕',
    o: '〇',
    input_x: null,
    input_o: null
  },
  container_element: null,
  gameover: false,
  select: 2,
  // player_turn: 0,
  default_player: 0,
  game_narration: null,
  players_on: 0,

  startup: function(container, xx, oo, game_narration) {
    this.container_element = container;
    this.players.input_x = xx;
    this.players.input_o = oo;
    this.game_narration = game_narration;
    this.gameover = true;
  },

  new_game_online: function() {
    let data = {
      board: this.board,
      createdat: firebase.database.ServerValue.TIMESTAMP,
      score_x: this.score.score_x,
      score_o: this.score.score_o,
      players_on: 1,
      player_turn: this.default_player,
    }

    // procura uma partida 
    firebase.database().ref('tic').once("value", snapshot => {
      snapshot.forEach(item => {
        if (item.val().players_on === 1) {
          if (item.key) this.id = item.key
          this.default_player = 1
          this.update_game_online({players_on: 2})
          this.game_narration.textContent = "LOADING...!";
          this.listen_game_online().then(() => this.game_narration.textContent = "〇 turn | YOU - 〇")
        }
      })
    }).then(() => {
      if (this.id) {
        this.listen_game_online()
        this.draw()
      }
  
      if (!this.id) {
        this.id = firebase.database().ref().child("tic").push().key;
        let updates = {}
        updates['/tic/' + this.id] = data
        firebase.database().ref().update(updates)
          .then(() => {
            this.game_narration.textContent = "LOADING...!";
            this.listen_game_online().then(() => this.game_narration.textContent = "〇 turn | YOU - ✕")
            console.log('created')
          })
          .catch(() => {
            console.log('not created')
          })
      }
    })
  },

  update_game_online: function(info) {
    if (!this.id) return 'ERROR ID';

    let game_ref = firebase.database().ref('/tic/' + this.id)
    let updates = {}
    updates = {...info};
    game_ref.update(updates)
      .then(() => {
        console.log('updated')
      })
      .catch(() => {
        console.log('not updated')
      })
  },

  listen_game_online: async function() {
    if (!this.id) return 'ERROR ID';

    let game_ref = firebase.database().ref('/tic/' + this.id)

    game_ref.once('child_changed')
      .then((snapshot) => {
        /*if (snapshot.key === 'player_turn') {
          console.log(snapshot.val(), ' "player_turn" updated')
          this.player_turn = snapshot.val()
        }*/

        if (snapshot.key === 'players_on') {
          // console.log(snapshot.val(), ' "players_on" updated')
          this.players_on = snapshot.val()
          this.draw()
          this.listen_game_online()
          //this.setNarrationText();
        }

        if (snapshot.key === 'board') {
          // console.log(snapshot.val(), ' "board" updated')
          snapshot.val().map((element, index) => {
            this.board.map((element2, index2) => {
              if (index === index2) {
                if (!(element === element2)) {
                  this.make_play(index, false)
                  this.board = snapshot.val()
                }
              }
            })
          }) 
        }
      })
      .catch(() => {
        console.log('no listen')
      })
  },

  make_play: function(position, verify = true) {
    if (this.gameover) return false;
    
    // console.log(this.symbols.turn_index === 1 ? 0 : 1, this.default_player)
    if (this.select === 3) {
      this.listen_game_online()
      if (verify && this.default_player != (this.symbols.turn_index === 1 ? 0 : 1)) {
        return false
      }
    }
    
    if (this.board[position] === '') {
      this.board[position] = this.symbols.options[this.symbols.turn_index]
      this.setNarrationText();
      if (this.select === 3) {
        this.update_game_online({
          board: this.board, 
          // player_turn: this.default_player
        })
        this.listen_game_online()
      }
      this.draw()
      
      let {
        winning_sequences_index,
        winner_symbol
      } = this.check_winning_sequences(this.symbols.options[this.symbols.turn_index])

      if (this.check_draw()) {
        this.stylize_winner_sequence(3)
        this.game_is_over()
        return;
      }

      if (winning_sequences_index >= 0) {
        this.game_is_over();
        this.stylize_winner_sequence(this.symbols.turn_index, winner_symbol);
      } else {
        this.who_plays_machine_or_player()
      }
      return true;
    } else {
      return false;
    }
  },

  draw: function() {
    let content = '';

    for (let i = 0; i < this.board.length; i++) {
      content += `<div onclick="tic_tac_toe.make_play(${i})">${this.board[i]}</div>`;
    }

    this.container_element.innerHTML = content
  },

  check_draw: function() {
    for (let i in this.board) {
      if (this.board[i] == '')
        return false;
    }
    return true;
  },

  check_winning_sequences: function(symbol) {
    for (let i in this.sequences) {
      if (this.board[this.sequences[i][0]] == symbol && this.board[this.sequences[i][1]] == symbol && this.board[this.sequences[i][2]] == symbol) {
        console.log(symbol)
        return {
          winning_sequences_index: i,
          winner_symbol: symbol
        };
      }
    }
    return -1;
  },

  stylize_winner_sequence: function(index, winner_symbol) {
    play.style.display = 'none'

    if (index === 3) {
      winning_symbol.innerHTML = "<span class='xx'>✕</span><span class='oo'>〇</span>";
      winning_text.innerText = "OLD!";
    } else {
      winning_symbol.innerHTML = winner_symbol
      winning_text.innerText = "WIN!";
      index === 0 ? this.score.score_o += 1 : this.score.score_x += 1;
      index === 0 ? score_o.innerHTML = `${this.symbols.option_symbols[index]} ${this.score.score_o}` : score_x.innerHTML = `${this.symbols.option_symbols[index]} ${this.score.score_x}`
    }

    setTimeout(() => {
      play.style.display = 'inline-block'
      container.style.display = "none"
      banner.style.display = "flex"
    }, 1000);
  },

  start: function() {
    container.style.display = "grid";
    x_campo.style.display = "none";
    o_campo.style.display = "none";
    banner.style.display = "none";

    this.players.o = !this.players.input_o.value ? '〇' : this.players.input_o.value;

    this.players.x = !this.players.input_x.value ? '✕' : this.players.input_x.value;

    this.board.fill('');

    if (this.symbols.turn_index === 1) {
      this.game_narration.textContent = this.players.x + ' turn!';
    } else {
      this.game_narration.textContent = this.players.o + ' turn!';
    }

    this.gameover = false;
    play.innerText = "REPLAY";
    if (this.select != 3) this.draw();

    if (this.select === 1) {
      if (this.symbols.turn_index === 1) {
        this.machine();
      }
    }

    if (this.select === 3) {
      this.new_game_online()
    }
  },

  setNarrationText: function() {
    this.game_narration.textContent = `${this.symbols.turn_index === 1 ? this.players.o : this.players.x} turn ${this.select === 3 ? `| YOU - ${this.symbols.option_symbols[this.default_player === 1 ? 0 : 1]}` : ''}`;
  },

  game_is_over: function() {
    if (this.id) {
      const dbDel = firebase.database().ref().child(`/tic/${this.id}`);

      dbDel.remove()
        .then(function() {
          console.log("Remove succeeded.")
          this.id = ""
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message)
        });
    }
    this.gameover = true;
    this.game_narration.textContent = 'game over';
    play.innerText = "Jogar novamente?"
  },

  who_plays_machine_or_player: function() {
    this.symbols.change();
    if (this.select === 1 && this.symbols.turn_index === 1) {
      this.machine(this.symbols.options[this.symbols.turn_index]);
    }
  },

  machine: function() {
    if (this.machine_strategic_move(this.symbols.options[this.symbols.turn_index]) > -1) {
      this.make_play(this.machine_strategic_move(this.symbols.options[this.symbols.turn_index]));
    } else if (this.machine_strategic_move(this.symbols.options[this.turn_index === 0 ? 1 : 0]) > -1) {
      this.make_play(this.machine_strategic_move(this.symbols.options[this.turn_index === 0 ? 1 : 0]));
    } else {
      this.make_play(this.machine_random_move());
    }
  },

  machine_strategic_move: function(symbol) {
    let score;
    for (let i = 0; i < this.sequences.length; i++) {
      score = 0;
      if (this.board[this.sequences[i][0]] == symbol)
        score++;
      if (this.board[this.sequences[i][1]] == symbol)
        score++;
      if (this.board[this.sequences[i][2]] == symbol)
        score++;

      if (score == 2) {
        if (this.board[this.sequences[i][0]] == '') {
          return this.sequences[i][0];
        }
        if (this.board[this.sequences[i][1]] == '') {
          return this.sequences[i][1];
        }
        if (this.board[this.sequences[i][2]] == '') {
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

tic_tac_toe.startup(container, x_campo, o_campo, game_narration);
