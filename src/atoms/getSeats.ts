
const descAvecInterieur = "1m20 linéaire avec angle sans table à l'intérieur"; const prixAvecInterieur = 1800;
const descSansInterieur = "1m20 linéaire sans angle sans table à l'intérieur"; const prixSansInterieur = 600;
const descExterieur = "1m20 linéaire sans angle sans table à l'extérieur"; const prixExterieur = 400;

function addSeat(seats:Seat[], seatId:string, seatWidth:number, seatHeight:number, xCol:number, yLine:number, defaultDescription:String, defaultPrice:number, existingSeatIds:any) {
  var existingSeat = existingSeatIds ? existingSeatIds.get(seatId) : undefined;
  var description = existingSeat?existingSeat.description:defaultDescription;
  var price = existingSeat?existingSeat.price:defaultPrice;
  var available = existingSeat?existingSeat.available:true;
  var tip = `${seatId}: `;
  tip += available ? `Disponible pour ${price/100}€ (${description})` : `Déjà réservé à ${existingSeat.paymentDetails.user.firstName} ${existingSeat.paymentDetails.user.lastName}`;
  const seat:Seat = { id: seatId, description: description, available: available, 
    price: price, x: xCol, y: yLine, w: seatWidth, h: seatHeight, inHelloAsso: existingSeat!==undefined, tip: tip };
  seats.push(seat);
  return {x: xCol + seatWidth + 1, y: yLine + seatHeight + 1};
}

function addColumn(seats:any[], seatWidth:number, seatHeight:number, xCol:number, letter:String, startIndex:number, existingSeatIds:any) {
  var xy = addSeat(seats, `${letter}${startIndex}`, seatWidth, seatHeight*2, xCol, 1256, descAvecInterieur, prixAvecInterieur, existingSeatIds); // A11
  for(var i=1;i<=6;i++) { // A12 ... A17
    xy = addSeat(seats, `${letter}${startIndex+i}`, seatWidth, seatHeight, xCol, xy.y, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  addSeat(seats, `${letter}${startIndex+7}`, seatWidth, seatHeight*2, xCol, xy.y, descAvecInterieur, prixAvecInterieur, existingSeatIds); // A18
}

export async function getSeats():Promise<Seat[]> {
  var existingSeats:any[] = [];
  await fetch('/api/tickets').then(response => response.json()).then(data => existingSeats = data);
  
  const seatWidth = 94; //2m40 (table 60cm + 1m80 d'espace derrière)
  const seatHeight = 47; // 1m20
  const space = seatWidth*2 + 12;

  const seats:Seat[] = [];
  const existingSeatIds = new Map();
  existingSeats.forEach(seat => existingSeatIds.set(seat.label, seat));

  // Column A1 ... A10
  var col = 1308;
  
  var xy = addSeat(seats, `A0`, seatWidth, seatHeight*2, col, 1207, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  for(var i=2;i<=8;i++) { // A2 ... A9
    xy = addSeat(seats, `A${i}`, seatWidth, seatHeight, col, xy.y,  descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  addSeat(seats, `A10`, seatWidth, seatHeight*2, col, xy.y,  descAvecInterieur, prixAvecInterieur, existingSeatIds);
  
  // Column A9 ... A15
  col = col + space;
  addColumn(seats, seatWidth, seatHeight, col, 'A', 11, existingSeatIds);
  
  for (let charCode = 'B'.charCodeAt(0); charCode <= 'G'.charCodeAt(0); charCode++) {
    var letter = String.fromCharCode(charCode);
    // Column B1 ... B7 to G1 ... G7
    col = col + seatWidth+1;
    addColumn(seats, seatWidth, seatHeight, col, letter, 1, existingSeatIds);

    // Column B8 ... B14 to G8 ... G14
    col = col + space;
    addColumn(seats, seatWidth, seatHeight, col, letter, 9, existingSeatIds);
  }

  // Column H1 ... H8
  col = col + seatWidth+1;
  addColumn(seats, seatWidth, seatHeight, col, 'H', 1, existingSeatIds);

  col = col + space;

  xy = addSeat(seats, `H9`, seatWidth, seatHeight, col+5, 1180,  descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `H10`, seatWidth, seatHeight, col+5, xy.y,  descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `H11`, seatWidth, seatHeight, col+5, xy.y+seatHeight*2-5,  descSansInterieur, prixSansInterieur, existingSeatIds);
  // Column H12 ... H18
  for(var i=1;i<=7;i++) { 
    xy = addSeat(seats, `H${11+i}`, seatWidth, seatHeight, col+5, xy.y,  descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `H19`, seatWidth, seatHeight, col-5, xy.y+seatHeight*2.5,  descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `H20`, seatWidth, seatHeight, col-5, xy.y,  descSansInterieur, prixSansInterieur, existingSeatIds);

  // Line N
  xy = addSeat(seats, `N1`, seatHeight*2, seatWidth, 1461, 1083, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  xy = addSeat(seats, `N2`, seatHeight, seatWidth, xy.x, 1083, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `N3`, seatHeight*2, seatWidth, xy.x, 1083, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  addSeat(seats, `N4`, seatWidth-8, seatHeight, xy.x+seatWidth+5, 1083-seatHeight-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `N5`, seatHeight*2, seatWidth, xy.x+seatWidth+5, 1083, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  xy = addSeat(seats, `N6`, seatHeight*2, seatWidth, xy.x, 1083, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  addSeat(seats, `N7`, seatWidth-7, seatHeight, xy.x-seatWidth+5, 1083-seatHeight-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `N8`, seatHeight*2, seatWidth, xy.x+seatWidth-12, 1083, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  for(var i=9;i<=23;i++) { 
    xy = addSeat(seats, `N${i}`, seatHeight, seatWidth, xy.x, 1083, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `N24`, seatHeight, seatWidth, xy.x+seatWidth/4, 1083, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  for(var i=25;i<=30;i++) { 
    xy = addSeat(seats, `N${i}`, seatHeight, seatWidth, xy.x, 1083, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `N31`, seatHeight, seatWidth, xy.x+seatWidth/4, 1083, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  for(var i=32;i<=36;i++) { 
    xy = addSeat(seats, `N${i}`, seatHeight, seatWidth, xy.x, 1083, descSansInterieur, prixSansInterieur, existingSeatIds);
  }

  // Line S
  for(var i=1;i<=5;i++) { 
    xy = addSeat(seats, `S${i}`, seatHeight, seatWidth, 1263+(seatHeight+1)*i, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `S6`, seatHeight, seatWidth, xy.x+seatHeight, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S7`, seatHeight, seatWidth, xy.x, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S8`, seatHeight, seatWidth, xy.x+seatHeight*2, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  for(var i=1;i<=7;i++) { 
    xy = addSeat(seats, `S${8+i}`, seatHeight, seatWidth, xy.x, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `S16`, seatHeight, seatWidth, xy.x+seatHeight/2, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S17`, seatHeight, seatWidth, xy.x, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S18`, seatHeight, seatWidth, xy.x+seatHeight*2, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  for(var i=1;i<=7;i++) { 
    xy = addSeat(seats, `S${18+i}`, seatHeight, seatWidth, xy.x, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `S26`, seatHeight, seatWidth, xy.x+seatHeight/2, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S27`, seatHeight, seatWidth, xy.x, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S28`, seatHeight, seatWidth, xy.x+seatHeight*7/4, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  for(var i=1;i<=7;i++) { 
    xy = addSeat(seats, `S${28+i}`, seatHeight, seatWidth, xy.x, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `S36`, seatHeight, seatWidth, xy.x+seatHeight/2, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S37`, seatHeight, seatWidth, xy.x, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);

  // Line R
  for(var i=1;i<=43;i++) { 
    addSeat(seats, `R${i}`, seatHeight, seatWidth, 1460+(seatHeight+1)*i, 805, descSansInterieur, prixSansInterieur, existingSeatIds);
  }

  // Line X
  for(var i=1;i<=33;i++) { 
    addSeat(seats, `X${i}`, seatHeight, seatWidth, 3640+(seatHeight+1)*i, 1870, descExterieur, prixExterieur, existingSeatIds);
  }

  // Line Y
  for(var i=1;i<=20;i++) { 
    addSeat(seats, `Y${i}`, seatHeight, seatWidth*2, 3640+(seatHeight+1)*i, 1037, descExterieur, prixExterieur, existingSeatIds);
  }
  xy = addSeat(seats, `Y21`, seatWidth*2, seatHeight, 3703, 1413, descExterieur, prixExterieur, existingSeatIds);
  for(var i=1;i<=5;i++) { 
    xy = addSeat(seats, `Y${21+i}`, seatWidth*2, seatHeight, xy.x-seatWidth*2-1, xy.y, descExterieur, prixExterieur, existingSeatIds);
  }

  // Line Z
  xy = addSeat(seats, `Z1`, seatHeight, seatWidth*2, 4647, 726, descExterieur, prixExterieur, existingSeatIds);
  for(var i=1;i<=12;i++) { 
    xy = addSeat(seats, `Z${1+i}`, seatHeight, seatWidth*2, xy.x, xy.y-seatWidth*2-1, descExterieur, prixExterieur, existingSeatIds);
  }
  xy = addSeat(seats, `Z14`, seatWidth*2, seatHeight, 5271, 920, descExterieur, prixExterieur, existingSeatIds);
  for(var i=1;i<=10;i++) { 
    xy = addSeat(seats, `Z${15+i}`, seatWidth*2,  seatHeight, xy.x-seatWidth*2-1, xy.y, descExterieur, prixExterieur, existingSeatIds);
  }
  xy = addSeat(seats, `Z26`, seatWidth*2,  seatHeight, xy.x-seatWidth*2-1, xy.y+seatHeight*4, descExterieur, prixExterieur, existingSeatIds);
  for(var i=1;i<=3;i++) { 
    xy = addSeat(seats, `Z${26+i}`, seatWidth*2,  seatHeight, xy.x-seatWidth*2-1, xy.y, descExterieur, prixExterieur, existingSeatIds);
  }
  
  return seats;
}

export type Seat = {
  id: string;  // The ID of the seat, e.g., 'A1'
  description: string;  // The description of the seat
  available: boolean;  // The availability of the seat
  inHelloAsso: boolean; // If the Seats exists in HelloAsso
  tip: string; // Title to display on hover
  price: number;   // The price of the seat
  x: number;   // The x-coordinate of the seat
  y: number;   // The y-coordinate of the seat
  w: number;   // The width of the seat
  h: number;   // The height of the seat
}
