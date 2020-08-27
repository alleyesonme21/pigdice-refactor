// Player

function Player(name,id,isTurn) {
    this.name = name,
    this.id = id,
    this.isTurn = isTurn,
    this.pointTotal = 0,
    this.turnPointTotal = 0,
    this.diceRolls = 0
}

var dice = {
    sides: 6,
    roll: function() {
        let randoNumber = Math.floor(Math.random()*this.sides)+1;
        return randoNumber
    }
}

Player.prototype.roll = function() {
    const roll = dice.roll();
    this.diceRolls +=1;
    if (roll === 1) {
        this.turnPointTotal = 0;
        this.isTurn = false;
        updateDisables(this);
    } else {
        this.turnPointTotal += roll;
        if ((this.pointTotal + this.turnPointTotal) >= 100) {
            window.open("https://giphy.com/gifs/memecandy-cOtvwSHKaFK3Ul1VVu/fullscreen")
            location.reload();// update display: winner --> this.name
        } 
    }
    console.log(this.diceRolls);
    return roll;
}

Player.prototype.hold = function() {
    this.pointTotal += this.turnPointTotal;
    this.turnPointTotal = 0;
    this.isTurn = false;
}

function updateDisables(player) {
    if (player.id == 1) {
        $("#playerTwoHold").prop("disabled", false);
        $("#playerOneHold").prop("disabled", true);
        $("#playerTwoRoll").prop("disabled", false);
        $("#playerOneRoll").prop("disabled", true);
    } else if (player.id == 2) {
        $("#playerTwoHold").prop("disabled", true);
        $("#playerOneHold").prop("disabled", false);
        $("#playerTwoRoll").prop("disabled", true);
        $("#playerOneRoll").prop("disabled", false);
    }
}

/* Player.prototype.win = function() {
    // victory display
    // update display: winner --> this.name
    // update display: point total --> this.pointTotal
    // reload
} */

// UI Logic
$(document).ready(function(){
   // Player Sign Up Logic
    let playerOne;
    let playerTwo;
    $("#playerOneSignUp").submit(function(event) {
        event.preventDefault();
        const name = $("input#playerOneName").val();
        playerOne = new Player(name,1,true);
        $("#playerOneEnterName").html(name);
        console.log(playerOne);
        $("#playerOneSignUpGroup").fadeOut(1000,function() {
            $("#playerOneGameGroup").fadeIn(1000);
        });
    })
    $("#playerTwoSignUp").submit(function(event) {
        event.preventDefault();
        const name = $("input#playerTwoName").val();
        $("#playerTwoEnterName").html(name);
        playerTwo = new Player(name,2,false);
        console.log(playerTwo);
        $("#playerTwoSignUpGroup").fadeOut(1000,function() {
            $("#playerTwoGameGroup").fadeIn(1000);
        });
    })
    // Roll & Hold Button Logic
    $("button#playerOneRoll").click(function() {
        const result = playerOne.roll();
        updatePlayerOneTurnTotal(playerOne,result);
        if (result != 1) {
            updateDisables(playerTwo);
        }
    })
    $("button#playerOneHold").click(function() {
        playerOne.hold();
        updatePlayerOneOverallTotal(playerOne);
        updateDisables(playerOne);
    })
    $("button#playerTwoRoll").click(function() {
        const result = playerTwo.roll();
        updatePlayerTwoTurnTotal(playerTwo,result);
        if (result != 1) {
            updateDisables(playerOne);
        }
    })
    $("button#playerTwoHold").click(function() {
        playerTwo.hold();
        updatePlayerTwoOverallTotal(playerTwo);
        updateDisables(playerTwo);
    })
});

function updatePlayerOneTurnTotal(player,roll) {
    $("#playerOneTurnTotal").text(player.turnPointTotal);
    $("#playerOneCurrentRoll").text(roll);
    $("#playerOneTotalRoll").text(player.diceRolls);
}

function updatePlayerOneOverallTotal(player) {
    $("#playerOneOverallTotal").text(player.pointTotal);
}

function updatePlayerTwoTurnTotal(player,roll) {
    $("#playerTwoTurnTotal").text(player.turnPointTotal);
    $("#playerTwoCurrentRoll").text(roll);
    $("#playerTwoTotalRoll").text(player.diceRolls);
}

function updatePlayerTwoOverallTotal(player) {
    $("#playerTwoOverallTotal").text(player.pointTotal);
}
