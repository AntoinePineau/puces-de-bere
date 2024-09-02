const descAvecInterieur = "1m20 linéaire avec angle sans table à l'intérieur"; const prixAvecInterieur = 1800;
const descSansInterieur = "1m20 linéaire sans angle sans table à l'intérieur"; const prixSansInterieur = 600;
const descSansExterieur = "1m20 linéaire sans angle sans table à l'extérieur"; const prixSansExterieur = 400;

function addSeat(seats:Seat[], seatId:string, seatWidth:number, seatHeight:number, xCol:number, yLine:number, defaultDescription:String, defaultPrice:number, existingSeatIds:any) {
  var existingSeat = existingSeatIds ? existingSeatIds[seatId] : undefined;
  const seat:Seat = { id: seatId, description: existingSeat?existingSeat.description:defaultDescription, available: !existingSeat, 
    price:existingSeat?existingSeat.price:defaultPrice, x: xCol, y: yLine, w: seatWidth, h: seatHeight };
  seats.push(seat);
}

function addColumn(seats:any[], seatWidth:number, seatHeight:number, xCol:number, letter:String, startIndex:number, existingSeatIds:any) {
  addSeat(seats, `${letter}${startIndex}`, seatWidth, seatHeight*2, xCol, 1238,  descAvecInterieur, prixAvecInterieur, existingSeatIds); // A11
  for(var i=1;i<=6;i++) { // A12 ... A17
    addSeat(seats, `${letter}${startIndex+i}`, seatWidth, seatHeight, xCol, 1286+(seatHeight+1)*i, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  addSeat(seats, `${letter}${startIndex+7}`, seatWidth, seatHeight*2, xCol, 1636, descAvecInterieur, prixAvecInterieur, existingSeatIds); // A18
}

export function getSeats():Seat[] {
  var existingSeats:any[] = [];
  fetch('/api/tickets').then(response => response.json()).then(data => existingSeats = data);
  
  const seatWidth = 94; //2m40 (table 60cm + 1m80 d'espace derrière)
  const seatHeight = 47; // 1m20
  const space = seatWidth*2 + 11;

  const seats:Seat[] = [];
  const existingSeatIds = new Set(existingSeats.map(seat => seat.label));

  // Column A1 ... A10
  var col = 1306;
  
  addSeat(seats, `A1`, seatWidth, seatHeight*2, col, 1254,  descAvecInterieur, prixAvecInterieur, existingSeatIds); // A1
  for(var i=2;i<=7;i++) { // A2 ... A7
    addSeat(seats, `A${i}`, seatWidth, seatHeight, col, 1186+(seatHeight+1)*i,  descSansInterieur, prixSansInterieur, existingSeatIds); // A2 ... A7
  }
  addSeat(seats, `A8`, seatWidth, seatHeight*2, col, 1254,  descAvecInterieur, prixAvecInterieur, existingSeatIds); // A8
  
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

  // Column H1 ... H7
  col = col + seatWidth+1;
  addColumn(seats, seatWidth, seatHeight, col, 'H', 1, existingSeatIds);

  col = col + space;

  // Column H8 ... H19
  for(var i=1;i<=12;i++) { 
    addSeat(seats, `H${8+i}`, seatWidth, seatHeight, col, 1185+(seatHeight+1)*i,  descSansInterieur, prixSansInterieur, existingSeatIds);
  }

  // Line N
  for(var i=1;i<=50;i++) { 
    addSeat(seats, `N${i}`, seatWidth, seatHeight, 1258+(seatHeight+1)*i /*1315*/, 1083, descSansInterieur, prixSansInterieur, existingSeatIds);
  }

  // Line S
  for(var i=1;i<=43;i++) { 
    addSeat(seats, `S${i}`, seatWidth, seatHeight, 1310+(seatHeight+1)*i, 1815, descSansInterieur, prixSansInterieur, existingSeatIds);
  }

  // Line R
  for(var i=1;i<=43;i++) { 
    addSeat(seats, `R${i}`, seatWidth, seatHeight, 1460+(seatHeight+1)*i, 805, descSansInterieur, prixSansInterieur, existingSeatIds);
  }

  // Line X
  for(var i=1;i<=43;i++) { 
    addSeat(seats, `X${i}`, seatWidth, seatHeight, 3640+(seatHeight+1)*i, 1860, descSansExterieur, prixSansExterieur, existingSeatIds);
  }
  

  // Line Y
  for(var i=1;i<=43;i++) { 
    addSeat(seats, `Y${i}`, seatWidth, seatHeight, 3640+(seatHeight+1)*i, 1180, descSansExterieur, prixSansExterieur, existingSeatIds);
  }

  // Line Z
  for(var i=1;i<=43;i++) { 
    addSeat(seats, `Z${i}`, seatWidth, seatHeight, 4200+(seatHeight+1)*i, 805, descSansExterieur, prixSansExterieur, existingSeatIds);
  }
  
  return seats;
}

export type Seat = {
  id: string;  // The ID of the seat, e.g., 'A1'
  description: string;  // The description of the seat
  available: boolean;  // The availability of the seat
  price: number;   // The price of the seat
  x: number;   // The x-coordinate of the seat
  y: number;   // The y-coordinate of the seat
  w: number;   // The width of the seat
  h: number;   // The height of the seat
}