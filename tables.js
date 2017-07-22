/**
 * Created by Brandon Brown on 7/16/2017.
 */
var hardTable = require('./hardTable');

/**
 * A function that when given the value of the players current hand and the value of the dealers current hand returns the move to be made.
 * @param pHand the total value of the players hand (between 17 & 7).
 * @param dHand the total value of the dealers hand (Ace = 11).
 * @returns {*} the move to be made (h: hit, NC: stay, db:double).
 */
function hardHand(pHand, dHand){
    var table = hardTable;
    if (pHand[0] === 'A' || pHand[1] === 'A') {
      table = softTable;
    }
    let pHandTotal = pHand.reduce(function(a, b) { return a + b; }, 0);
    if (pHandTotal > 17) { pHandTotal = 17; }
    else if (pHandTotal < 7) { pHandTotal = 7; }
    return table[pHandTotal.toString()][dHand.toString()];
}
console.log(hardHand([8, 3], 6)); //(val of player hand,val of healer hand)

