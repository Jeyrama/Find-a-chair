/*
So you've found a meeting room - phew! 
You arrive there ready to present, and find that someone has taken one or more of the chairs!! 
You need to find some quick.... check all the other meeting rooms to see if all of the chairs are in use.

Your meeting room can take up to 8 chairs. 
Need will tell you how many have been taken. 
You need to find that many.

Find the spare chairs from the array of meeting rooms. 
Each meeting room tuple will have the number of occupants as a string. 
Each occupant is represented by 'X'. 
The room tuple will also have an integer telling you how many chairs there are in the room.

You should return an array of integers that shows how many chairs you take from each room in order, 
up until you have the required amount.

Example:
  [['XXX', 3], ['XXXXX', 6], ['XXXXXX', 9], ['XXX',2]] when you need 4 chairs:
    result -> [0, 1, 3] no chairs free in room 0, take 1 from room 1, take 3 from room 2. 
    no need to consider room 3 as you have your 4 chairs already.

    If you need no chairs, return "Game On". 
    If there aren't enough spare chairs available, return "Not enough!".
*/


// Solution

function meeting(rooms, need) {
  if (need <= 0) {
    return 'Game On';
  }
  const taken = [];
  for (const [{ length: chairs }, people] of rooms) {
    const take = Math.min(Math.max(people - chairs, 0), need);
    taken.push(take)
    need -= take;
    if (need <= 0) {
      return taken;
    }
  }
  return 'Not enough!';
}

// or

function meeting(x, need){
  
  // IF WE DON'T NEED CHAIRS
  // OR NEED IS NOT DEFINED, return ... 
  
  if (!need || need == 0) {return 'Game On'};
  
  // GET ARRAY WITH FREE CHAIRS PER ROOM
  // Sometimes there are more ppl inside the room, than chairs, ... 
  
  let freeChairsInRooms = x
    .map(r => { let i = r[1] - r[0].length; return i <= 0 ? 0 : i; })
  
  // SUM UP ALL AVAILABLE CHAIRS,
  // AND CHECK IF EVEN ENOUGH, IF ELSE return ...
  
  if (freeChairsInRooms.reduce((a,b) => a+b,0) < need) { return 'Not enough!' } 
  
  // NOW START AT ROOM 1, TAKING OUT CHAIRS,
  // BUT CHECK IF WE HAVE ENOUGH ALREADY,
  // IF ENOUGH, STOP TAKING and return ... 
  
  let took = [];
  for (let i = 0; i < freeChairsInRooms.length; i++) {
    let chairs = freeChairsInRooms[i];
    if (need != 0) {
      if (need - chairs >= 0) { 
        need -= chairs; took.push(chairs)
      }
      else { 
        took.push(need); need -= need
      }
    } else { 
      break; 
    }
  }
    
  return took;
} 