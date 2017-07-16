/**
 * Created by Brandon Brown on 7/16/2017.
 */

 var hardTable = [
    [17,["NC","NC","NC","NC","NC","NC","NC","NC","NC","NC"]],
    [16,["NC","NC","NC","NC","NC","h","h","h","h","h"]],
    [15,["NC","NC","NC","NC","NC","h","h","h","h","h"]],
    [14,["NC","NC","NC","NC","NC","h","h","h","h","h"]],
    [13,["NC","NC","NC","NC","NC","h","h","h","h","h"]],
    [12,["h","h","NC","NC","NC","h","h","h","h","h"]],
    [11,["db","db","db","db","db","db","db","db","db","db"]],
    [10,["db","db","db","db","db","db","db","db","h","h"]],
    [9,["db","db","db","db","db","h","h","h","h","h"]],
    [8,["h","h","h","db","db","h","h","h","h","h"]],
    [7,["h","h","h","h","h","h","h","h","h","h"]]
];
/**
 * A function that when given the value of the players current hand and the value of the dealers current hand returns the move to be made.
 * @param pHand the total value of the players hand (between 17 & 7).
 * @param dHand the total value of the dealers hand (Ace = 11).
 * @returns {*} the move to be made (h: hit, NC: stay, db:double).
 */
function hardHand(pHand, dHand){
    if(pHand > 17){
        pHand = 17;
    }else if(pHand < 7 ){pHand = 7;}
    var move = hardTable[(17 - pHand)];
    var dealer = move[1];
    return dealer[dHand - 2];

}
console.log(hardHand(11,6)); //(val of player hand,val of healer hand)