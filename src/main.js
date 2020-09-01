import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import { Player, updateDisables } from './pigdice.js';



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