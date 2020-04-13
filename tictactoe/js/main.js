/*jshint esversion: 6 */

const Ref = firebase.database().ref()
var id = "";

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

const game_data = {}

const tic_tac_toe = {
  board: ['', '', '', '', '', '', '', '', ''],
  symbols: {
    //option: ['〇','✕'],
    options: ['<span class="oo">〇</span>', '<span class="xx">✕</span>'],
    turn_index: 0,
    change: function() {
      this.turn_index = (this.turn_index === 0 ? 1 : 0);
    }
  },
  container_element: null,
  gameover: false,
  turn: 2,
  game_narration: null,
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

  // inicialização
  init: function(container, xx, oo, game_narration) {
    this.container_element = container;
    this.players.input_x = xx;
    this.players.input_o = oo;
    this.game_narration = game_narration;
    this.gameover = true;
  },

  // jogadas
  make_play: function(position) {
    if (this.gameover) return false;

    if (this.board[position] === '') {
      this.board[position] = this.symbols.options[this.symbols.turn_index]
      this.setNarrationText();
      this.draw();

      let {
        winning_sequences_index,
        winner
      } = this.check_winning_sequences(this.symbols.options[this.symbols.turn_index])

      if (this.check_draw()) {
        this.stylize_winner_sequence(3)
        this.game_is_over()
        return;
      }

      if (winning_sequences_index >= 0) {
        this.game_is_over();
        this.stylize_winner_sequence(this.symbols.turn_index);
      } else {
        this.who_plays_machine_or_player()
      }
      return true;
    } else {
      return false;
    }
  },

  who_plays_machine_or_player: function() {
    this.symbols.change();
    if (this.turn == 1) {
      //this.symbols.change();
      if (this.symbols.turn_index == 1) {
        this.machine(this.symbols.options[this.symbols.turn_index]);
      }
    }
    /*else if(this.turn == 3 && this.symbols.turn_index == 1) {
         this.symbols.change();
         //this.player_online()
         //this.onli()*/
    //} else {
    //this.symbols.change();
    //}
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
        return {
          winning_sequences_index: i,
          winner: symbol
        };
      }
    }
    return -1;
  },

  stylize_winner_sequence: function(i) {
    play.style.display = 'none'
    if (i == 0) {
      winning_symbol.innerHTML = "<span class='oo'>〇</span>";
      winning_text.innerText = "WIN!";
      this.score.score_o += 1;
      score_o.innerHTML = '〇 - ' + this.score.score_o;
    }

    if (i == 1) {
      winning_symbol.innerHTML = "<span class='xx'>✕</span>";
      winning_text.innerText = "WIN!";
      this.score.score_x += 1;
      score_x.innerHTML = '✕ - ' + this.score.score_x;
    }

    if (i == 3) {
      winning_symbol.innerHTML = "<span class='xx'>✕</span><span class='oo'>〇</span>";
      winning_text.innerText = "OLD!";
    }

    setTimeout(function() {
      play.style.display = 'inline-block'
      container.style.display = "none"
      banner.style.display = "flex"
    }, 1000);
  },

  machine: function() {
    //Jogar para ganhar | Jogar para defesa
    if (this.machine_strategic_move(this.symbols.options[this.symbols.turn_index]) > -1) {
      this.make_play(this.machine_strategic_move(this.symbols.options[this.symbols.turn_index]));
    } else if (this.machine_strategic_move(this.symbols.options[this.turn_index === 0 ? 1 : 0]) > -1) {
      this.make_play(this.machine_strategic_move(this.symbols.options[this.turn_index === 0 ? 1 : 0]));
    } else {
      this.make_play(this.machine_random_move());
    }
  },

  // robo estratégia
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
    this.draw();

    if (this.turn === 1) {
      if (this.symbols.turn_index === 1) {
        this.machine();
      }
    }
  },

  setNarrationText: function() {
    this.game_narration.textContent = (this.symbols.turn_index === 1) ? this.players.o + ' turn!' : this.players.x + ' turn!';
  },

  draw: function() {
    let content = '';

    for (let i = 0; i < this.board.length; i++) {
      content += `<div onclick="tic_tac_toe.make_play(${i})">${this.board[i]}</div>`;
    }
    this.container_element.innerHTML = content

    if (this.turn == 3) {
      //console.log(this.board)
      //this.board = ["", "", "", "", "", "", "", "", '<span class="oo">〇</span>']
      this.player_online()
      this.onli()
    }
  },

  // jogador online
  player_online: function() {
    const hopperRef = Ref.child("tic");
    const dbEdit = Ref.child(`/tic/${id}`)

    let data = {
      board: this.board,
      createdat: firebase.database.ServerValue.TIMESTAMP
    }

    if (id != "") {
      return dbEdit.update({ "board": data.board })
    } else {
      const ids = hopperRef.push(data).key;
      const db = Ref.child(`/tic/${ids}`)
      return db.update({ "id": ids }), id = ids
    }
  },

  onli: function() {
    const game_ref = firebase.database().ref('tic')
    // game_ref.once(child_changed)
    /*game_ref.once('child_added')
      .then(function(snapshot) {
        console.log(prevChildKey)
        console.log(snapshot)
        document.getElementById("a"). innerHTML = snapshot.val().board
        //tic_tac_toe.board = snapshot.val().board
      })
      .catch(function(e) {
        console.warn(e)
      })*/

    game_ref.once("value", snapshot => {
      snapshot.forEach(item => {
        //document.getElementById("a"). innerHTML = item.val().board
        this.board = item.val().board
      })
    })
  },

  game_is_over: function() {
    if (id != "") {
      const dbDel = Ref.child(`/tic/${id}`);

      dbDel.remove()
        .then(function() {
          console.log("Remove succeeded.")
          id = ""
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message)
        });
    }
    this.gameover = true;
    this.game_narration.textContent = 'game over';
    play.innerText = "Jogar novamente?"
  }
}

tic_tac_toe.init(container, x_campo, o_campo, game_narration);