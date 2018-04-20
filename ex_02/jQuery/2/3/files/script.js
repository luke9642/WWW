let player1 = {
    id: 'player1',
    mark: 'X',
    name: 'Player 1',
    style: 'player1_cell',
    score_el: 'player1_wins',
    wins: 0
};

let player2 = {
    id: 'player2',
    mark: 'O',
    name: 'Player 2',
    style: 'player2_cell',
    score_el: 'player2_wins',
    wins: 0
};

let players = [player1, player2];
let current_player = 0;
const num_of_cols = 3;
const num_of_rows = 3;

function restart() {
    for(let i=0; i<num_of_cols*num_of_rows;++i)
    {
        let cell = $("<div></div>")
            .addClass("cell")
            .appendTo("#game_map")
            .attr("id", i);
        if ( i % num_of_cols === 0 ){
            cell.before('<div class="clear"></div>');
        }
    }

    players.forEach(function(player) {
        console.log(player);
        console.log($("#" + player.id + "_wins").text());
        $("#" + player.id + "_wins").text(player.wins);
    });

    $("#game_map .cell")
        .on("click", playMove)
        .on('mouseover', hoverCell)
        .on('mouseout', leaveCell);

    initTurn();

    function initTurn() {
        $("#player_mark").text(players[current_player].mark);
        $("#player_name").text(players[current_player].name);
    }

    function playMove() {
        $(this).addClass(players[current_player].style)
            .addClass("marked")
            .text(players[current_player].mark)
            .trigger("mouseout")
            .off("click mouseover mouseout");

        const playerOptional = checkAndProcessWin();
        if (playerOptional === 0) {
            current_player = (++current_player) % players.length;
            initTurn();
        } else {
            alert("Koniec gry");
            $("#wins").css("display", "initial");
            $("#player_wins").text(playerOptional);
            players[playerOptional].wins++;
            empty();
            restart();
        }

        return false;
    }

    function hoverCell() {
        $(this).addClass("hover");
        return false;
    }

    function leaveCell() {
        $(this).removeClass("hover");
        return false;
    }

    function empty() {
        $("#game_map > *").remove();
    }

    function checkAndProcessWin(){
        wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7],
            [2,5,8], [0,4,8], [6,4,2]];
        for (k in wins) {
            pattern = wins[k];
            p = $("#"+pattern[0]).text()
                + $("#"+pattern[1]).text()
                + $("#"+pattern[2]).text();
            if (p==="XXX") return 1;
            if (p==="OOO") return 2;
        }
        return 0;
    }

}

$(document).ready(restart);