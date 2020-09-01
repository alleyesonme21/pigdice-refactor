export function Player(name,id,isTurn) {
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

export function updateDisables(player) {
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