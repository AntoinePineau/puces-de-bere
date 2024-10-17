
const descAvecInterieur = "1m20 linéaire avec angle sans table à l'intérieur"; const prixAvecInterieur = 2100;
const descSansInterieur = "1m20 linéaire sans angle sans table à l'intérieur"; const prixSansInterieur = 700;
const descExterieur = "1m20 linéaire sans angle sans table à l'extérieur"; const prixExterieur = 500;
const seatWidth = 141.6; //1m80 (table 60cm + 1m20 d'espace derrière)
const seatHeight = 94.4; // 1m20
const space = 188.8; //2m40
const angleL = 141.6; //1m80 (table 60cm + 1m20 d'espace derrière)
const anglel = 94.4; //1m20
//const topLeftX=915,topLeftY=2493,bottomRightX=5630,bottomRightY=4147;
const topLeftX=1795,topLeftY=2989,bottomRightX=6510,bottomRightY=4643;



function addSeat(seats:Seat[], seatId:string, portrait:boolean, angle:boolean, xCol:number, yLine:number, defaultDescription:String, defaultPrice:number, existingSeatIds:any) {
  var existingSeat = existingSeatIds ? existingSeatIds.get(seatId) : undefined;
  var tierId = existingSeat?existingSeat.id:0;
  var description = existingSeat?existingSeat.description:defaultDescription;
  var price = defaultPrice;//existingSeat?existingSeat.price:defaultPrice;
  var available = existingSeat?existingSeat.available:true;
  var tip = `${seatId}: `;
  var width = angle ? portrait ? anglel : angleL : portrait ? seatHeight : seatWidth;
  var height = angle ? !portrait ? anglel : angleL : !portrait ? seatHeight : seatWidth;
  tip += available ? `Disponible pour ${price/100}€ (${description})` : `Déjà réservé à ${existingSeat.paymentDetails.user.firstName} ${existingSeat.paymentDetails.user.lastName}`;
  const seat:Seat = { tierId:tierId, id: seatId, description: description, available: available, 
    price: price, x: xCol, y: yLine, w: width, h: height, inHelloAsso: existingSeat!==undefined, tip: tip };
  seats.push(seat);
  return {x: xCol + width + 1, y: yLine + height + 1};
}

function addColumn(seats:any[], xCol:number, letter:String, startIndex:number, existingSeatIds:any) {
  var xy = addSeat(seats, `${letter}${startIndex}`, false, true, xCol, topLeftY+seatWidth+space, descAvecInterieur, prixAvecInterieur, existingSeatIds); // A11
  for(var i=1;i<=8;i++) { // A12 ... A17
    xy = addSeat(seats, `${letter}${startIndex+i}`, false, false, xCol, xy.y, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  addSeat(seats, `${letter}${startIndex+9}`, false, true, xCol, xy.y, descAvecInterieur, prixAvecInterieur, existingSeatIds); // A18
}

export async function getSeats():Promise<Seat[]> {
  var existingSeats:any[] = [];
  await fetch('/api/tickets').then(response => response.json()).then(data => existingSeats = data);

  const seats:Seat[] = [];
  const existingSeatIds = new Map();
  existingSeats.forEach(seat => existingSeatIds.set(seat.label, seat));

  var xy = {x:topLeftX, y:topLeftY};

  // Column A1 ... A10
  var col = topLeftX;
  
  xy = addSeat(seats, `A1`, false, true, col, topLeftY+seatWidth+15, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  for(var i=2;i<=11;i++) { 
    xy = addSeat(seats, `A${i}`, false, false, col, xy.y,  descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `A12`, false, true, col, xy.y,  descAvecInterieur, prixAvecInterieur, existingSeatIds);

  
  col = col + seatWidth + space;
  addColumn(seats, col, 'A', 13, existingSeatIds);
  
  for (let charCode = 'B'.charCodeAt(0); charCode <= 'I'.charCodeAt(0); charCode++) {
    var letter = String.fromCharCode(charCode);
    // Column B1 ... B7 to I1 ... I7
    col = col + seatWidth+1;
    addColumn(seats, col, letter, 1, existingSeatIds);

    // Column B8 ... B14 to I8 ... I14
    col = col + seatWidth + space;
    addColumn(seats, col, letter, 9, existingSeatIds);
  }

  // Column J1 ... J8
  col = col + seatWidth+1;
  addColumn(seats, col, 'J', 1, existingSeatIds);

  col = col + seatWidth + space;

  xy = addSeat(seats, `J11`, false, false, col+5, topLeftY+seatWidth,  descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `J12`, false, false, col+5, xy.y,  descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `J13`, false, false, col+5, xy.y+anglel+seatHeight/2,  descSansInterieur, prixSansInterieur, existingSeatIds);
  // Column J12 ... J18
  for(var i=1;i<=7;i++) { 
    xy = addSeat(seats, `J${13+i}`, false, false, col+5, xy.y,  descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `J21`, false, false, col-10, xy.y+seatHeight*2.5,  descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `J22`, false, false, col-10, xy.y,  descSansInterieur, prixSansInterieur, existingSeatIds);

  // Line N
  xy = addSeat(seats, `N1`, true, true, topLeftX+seatWidth+space-15, topLeftY, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  xy = addSeat(seats, `N2`, true, false, xy.x, topLeftY, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `N3`, true, false, xy.x, topLeftY, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `N4`, true, false, xy.x, topLeftY, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `N5`, true, true, xy.x, topLeftY, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  addSeat(seats, `N6`, false, false, xy.x+seatWidth+seatHeight/2, topLeftY-seatHeight-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `N7`, true, true, xy.x+seatWidth+seatHeight/2, topLeftY, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  xy = addSeat(seats, `N8`, true, false, xy.x, topLeftY, descSansInterieur, prixSansInterieur, existingSeatIds);
  var xyN6 = xy;
  xy = addSeat(seats, `N9`, true, false, xy.x, topLeftY, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `N10`, true, true, xy.x, topLeftY, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  addSeat(seats, `N11`, false, false, xy.x-seatWidth, topLeftY-seatHeight-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `N12`, true, true, xy.x+seatWidth+39, topLeftY, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  xy = addSeat(seats, `N13`, true, false, xy.x, topLeftY, descSansInterieur, prixSansInterieur, existingSeatIds);
  for(var i=14;i<=28;i++) { 
    xy = addSeat(seats, `N${i}`, true, false, xy.x, topLeftY, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `N29`, true, false, xy.x+seatWidth/4, topLeftY, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  for(var i=30;i<=35;i++) { 
    xy = addSeat(seats, `N${i}`, true, false, xy.x, topLeftY, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `N36`, true, false, xy.x+seatWidth/4, topLeftY, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  for(var i=37;i<=42;i++) { 
    xy = addSeat(seats, `N${i}`, true, false, xy.x, topLeftY, descSansInterieur, prixSansInterieur, existingSeatIds);
  }

  // Line S
  xy.x = topLeftX;
  for(var i=1;i<=6;i++) { 
    xy = addSeat(seats, `S${i}`, true, i==1, xy.x, bottomRightY-seatWidth, i==1 ? descAvecInterieur : descSansInterieur, i==1 ? prixAvecInterieur : prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `S7`, true, false, xy.x+seatHeight/2, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S8`, true, false, xy.x, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S9`, true, false, xy.x+seatWidth+seatHeight/3, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  for(var i=1;i<=7;i++) { 
    xy = addSeat(seats, `S${9+i}`, true, false, xy.x, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `S17`, true, false, xy.x+seatHeight/2, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S18`, true, false, xy.x, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S19`, true, false, xy.x+seatHeight*2, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  for(var i=1;i<=7;i++) { 
    xy = addSeat(seats, `S${19+i}`, true, false, xy.x, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `S27`, true, false, xy.x+seatHeight/2, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S28`, true, false, xy.x, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S29`, true, false, xy.x+seatHeight*7/4, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  for(var i=1;i<=7;i++) { 
    xy = addSeat(seats, `S${29+i}`, true, false, xy.x, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `S37`, true, false, xy.x+seatHeight/2, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S38`, true, false, xy.x, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `S39`, true, false, xy.x, bottomRightY-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);


  // Line R
  for(var i=1;i<=5;i++) { 
    xy = addSeat(seats, `R${i}`, true, false, topLeftX+seatWidth+space*3/4+(seatHeight+1)*i, topLeftY-seatHeight-seatWidth-angleL-space, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  addSeat(seats, `R6`, true, true, xy.x, xy.y-seatWidth-1, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  addSeat(seats, `R7`, false, false, xy.x+seatWidth/3, xy.y-seatHeight-seatWidth-2, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `R8`, true, false, xy.x+space*7/4, xy.y-seatHeight*2-seatWidth, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `R9`, true, false, xy.x, xy.y-seatWidth-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `R10`, true, true, xy.x+space*13, xy.y-seatHeight, descAvecInterieur, prixAvecInterieur, existingSeatIds);  
  for(var i=11;i<=17;i++) { 
    xy = addSeat(seats, `R${i}`, true, false, xy.x, xy.y-seatWidth-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  var xyX18 = xy.x+space*2-seatHeight;
  xy = addSeat(seats, `R18`, true, false, xyX18, xy.y-seatWidth, descAvecInterieur, prixAvecInterieur, existingSeatIds);  
  for(var i=19;i<=22;i++) { 
    xy = addSeat(seats, `R${i}`, true, false, xy.x, xy.y-seatWidth-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `R23`, false, false, xy.x+seatHeight*2, xy.y-seatWidth-seatHeight-2, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  xy = addSeat(seats, `R24`, false, false, xy.x, xy.y-seatHeight-1, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  xy = addSeat(seats, `R25`, true, false, xy.x, xy.y-seatHeight*3/2, descAvecInterieur, prixAvecInterieur, existingSeatIds); 
  xy = addSeat(seats, `R26`, true, false, xy.x, xy.y-seatWidth-1, descSansInterieur, prixSansInterieur, existingSeatIds);  
  xy = addSeat(seats, `R27`, true, false, xy.x, xy.y-seatWidth-1, descSansInterieur, prixSansInterieur, existingSeatIds);  
  xy = addSeat(seats, `R37`, true, false, xyX18-seatHeight, xy.y+space+seatWidth*9/10+seatHeight+5, descSansInterieur, prixSansInterieur, existingSeatIds);
  var xyR37 = xy;
  for(var i=36;i>=28;i--) { 
    xy = addSeat(seats, `R${i}`, true, false, xy.x, xy.y-seatWidth-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy = addSeat(seats, `R39`, false, false, xyR37.x-seatHeight*4/3-seatWidth*2-3, xyR37.y-seatHeight/2-seatWidth-2, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `R38`, false, false, xy.x, xy.y-seatHeight-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  xy = addSeat(seats, `R46`, true, false, xyR37.x-space*9-seatHeight+seatHeight/3, xyR37.y-seatWidth-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  var xyR46 = xy;
  for(var i=45;i>=40;i--) { 
    xy = addSeat(seats, `R${i}`, true, false, xy.x, xy.y-seatWidth-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy.x = xyR46.x-seatHeight-seatWidth*4-seatWidth/2-4;
  for(var i=50;i>=47;i--) { 
    xy = addSeat(seats, `R${i}`, false, false, xy.x, xyR46.y-seatWidth-seatHeight+10, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy.x = xy.x-4*seatWidth-seatWidth/2-3-space*5;
  for(var i=54;i>=51;i--) { 
    xy = addSeat(seats, `R${i}`, false, false, xy.x, xy.y-seatHeight-1, descSansInterieur, prixSansInterieur, existingSeatIds);
  }
  xy.x = xyN6.x-anglel-1;
  for(var i=56;i>=55;i--) { 
    xy = addSeat(seats, `R${i}`, true, true, xy.x, xyR46.y-seatWidth-1, descAvecInterieur, prixAvecInterieur, existingSeatIds);
  }


  // Line X
  for(var i=1;i<=33;i++) { 
    addSeat(seats, `X${i}`, true, false, bottomRightX+(seatHeight+1)*i+5, bottomRightY-3*seatWidth/4, descExterieur, prixExterieur, existingSeatIds);
  }

  // Line Y
  for(var i=1;i<=20;i++) { 
    addSeat(seats, `Y${i}`, true, false, bottomRightX+(seatHeight+1)*(i-1)+30, topLeftY+seatWidth, descExterieur, prixExterieur, existingSeatIds);
  }
  xy = addSeat(seats, `Y21`, false, false, bottomRightX+seatHeight*2, topLeftY+seatWidth+seatHeight*5/2+space, descExterieur, prixExterieur, existingSeatIds);
  for(var i=1;i<=7;i++) { 
    xy = addSeat(seats, `Y${21+i}`, false, false, bottomRightX+seatHeight*2, xy.y, descExterieur, prixExterieur, existingSeatIds);
  }

  // Line Z
  const zX=8520,zY=2100;
  xy = addSeat(seats, `Z1`, true, false, zX, zY, descExterieur, prixExterieur, existingSeatIds);
  for(var i=1;i<=12;i++) { 
    xy = addSeat(seats, `Z${1+i}`, true, false, xy.x, zY, descExterieur, prixExterieur, existingSeatIds);
  }
  xy = addSeat(seats, `Z14`, false, false, xy.x-anglel-seatWidth, xy.y+space, descExterieur, prixExterieur, existingSeatIds);
  for(var i=1;i<=12;i++) { 
    xy = addSeat(seats, `Z${15+i}`, false, false, xy.x-seatWidth, xy.y, descExterieur, prixExterieur, existingSeatIds);
  }
  xy = addSeat(seats, `Z28`, false, false, xy.x-seatWidth, xy.y+space*2, descExterieur, prixExterieur, existingSeatIds);
  for(var i=1;i<=2;i++) { 
    xy = addSeat(seats, `Z${28+i}`, false, false, xy.x-seatWidth, xy.y, descExterieur, prixExterieur, existingSeatIds);
  }
  

  return seats;
}

export type Seat = {
  tierId: number; // ID in helloasso
  id: string;  // The name of the seat, e.g., 'A1'
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
