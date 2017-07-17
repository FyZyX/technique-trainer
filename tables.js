/**
 * Created by Brandon Brown on 7/16/2017.
 */
var hardTable = require('./hardTable');
var softTable = require('./softTable');

/**
 * A function that when given the value of the players current hand and the value of the dealers current hand returns the move to be made.
 * @param pHand the total value of the players hand (between 17 & 7).
 * @param dHand the total value of the dealers hand (Ace = 11).
 * @returns {*} the move to be made (h: hit, NC: stay, db:double).
 */
function hardHand(pHand, dHand){
    let pHandTotal = pHand.reduce(function(a, b) { return a + b; }, 0);
    if (pHandTotal > 17) { pHandTotal = 17; }
    else if (pHandTotal < 7) { pHandTotal = 7; }
    return hardTable[pHandTotal.toString()][dHand.toString()];
}
/**
 *
 * @param pHand the total value of the players hand (between 21 & 13).
 * @param dHand the total value of the dealers hand (Ace = 11).
 * @returns {*} the move to be made (h: hit, NC: stay, db:double).
 */
function softHand(pHand,dHand){
var isSoft = false;
    if (pHand.includes(11)){ isSoft = true; }
    console.log(isSoft);
    let pTotal = pHand.reduce(function(a,b){return a+b},0);
    if (!isSoft){
        return hardHand(pHand,dHand); //this is a hard hand
    }else
        if (pTotal > 20) { pTotal = 20; }
        else if (pTotal < 13) { pTotal = 7; }
        return softTable[pTotal.toString()][dHand.toString()];
}
console.log(hardHand([8, 3], 6)); //(val of player hand,val of dealer hand)
console.log(softHand([1,12], 6)); //(val of player hand,val of dealer hand)
