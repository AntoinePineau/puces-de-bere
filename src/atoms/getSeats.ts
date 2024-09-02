function addColumn(seats:any[], seatWidth:number, seatHeight:number, xCol:number, letter:string, startIndex:number) {
  seats.push({ id: `${letter}${startIndex}`, description: "1m20 linéaire avec angle sans table à l'intérieur", available: true, 
    price:1800, x: xCol, y: 1238, w: seatWidth, h: seatHeight*2 }); // A11
  for(var i=1;i<=6;i++) { // A12 ... A17
    seats.push({ id: `${letter}${startIndex+i}`, description: "1m20 linéaire sans angle sans table à l'intérieur", available: true, 
      price:600, x: xCol, y: 1286+(seatHeight+1)*i, w: seatWidth, h: seatHeight });
  }
  seats.push({ id: `${letter}${startIndex+7}`, description: "1m20 linéaire avec angle sans table à l'intérieur", available: true, 
    price:1800, x: xCol, y: 1636, w: seatWidth, h: seatHeight*2 }); // A18
}

export function getSeats():Seat[] {
  
  const seatWidth = 94; //2m40 (table 60cm + 1m80 d'espace derrière)
  const seatHeight = 47; // 1m20
  const space = seatWidth*2 + 5;

  const seats:Seat[] = [];

  // Column A1 ... A9
  var col = 1306;
  for(var i=1;i<=9;i++) { // A1 ... A9
    seats.push({ id: `A${i}`, description: "1m20 linéaire sans angle sans table à l'intérieur", available: true, 
      price:600, x: col, y: 1240+(seatHeight+1)*i, w: seatWidth, h: seatHeight });
  }
  
  // Column A11 ... A28
  col = col + space;
  addColumn(seats, seatWidth, seatHeight, col, 'A', 11);
  
  for (let charCode = 'B'.charCodeAt(0); charCode <= 'G'.charCodeAt(0); charCode++) {
    var letter = String.fromCharCode(charCode);
    // Column B1 ... B8 to G1 ... G8
    col = col + seatWidth+1;
    addColumn(seats, seatWidth, seatHeight, col, letter, 1);

    // Column B9 ... B16 to G9 ... G16
    col = col + space;
    addColumn(seats, seatWidth, seatHeight, col, letter, 9);
  }

  // Column H1 ... H8
  col = col + seatWidth+1;
  addColumn(seats, seatWidth, seatHeight, col, 'H', 1);

  col = col + space;

  // Column H9 ... H12
  for(var i=1;i<=12;i++) { 
    seats.push({ id: `H${8+i}`, description: "1m20 linéaire sans angle sans table à l'intérieur", available: true, 
      price:600, x: col, y: 1185+(seatHeight+1)*i, w: seatWidth, h: seatHeight });
  }

  // Line N
  for(var i=1;i<=50;i++) { 
    seats.push({id: `N${i}`, description: "1m20 linéaire sans angle sans table à l'intérieur", available: true, 
      price:600, x: 1258+(seatHeight+1)*i, /*1315*/ y: 1083, w: seatHeight, h: seatWidth });
  }

  // Line S
  for(var i=1;i<=43;i++) { 
    seats.push({ id: `S${i}`, description: "1m20 linéaire sans angle sans table à l'intérieur", available: true, 
      price:600, x: 1310+(seatHeight+1)*i, y: 1815, w: seatHeight, h: seatWidth });
  }

  // Line R
  for(var i=1;i<=43;i++) { 
    seats.push({ id: `R${i}`, description: "1m20 linéaire sans angle sans table à l'intérieur", available: true, 
      price:600, x: 1460+(seatHeight+1)*i, y: 805, w: seatHeight, h: seatWidth });
  }

  // Line X
  for(var i=1;i<=43;i++) { 
    seats.push({ id: `X${i}`, description: "1m20 linéaire sans angle sans table à l'intérieur", available: true, 
      price:600, x: 3640+(seatHeight+1)*i, y: 1860, w: seatHeight, h: seatWidth });
  }
  

  // Line Y
  for(var i=1;i<=43;i++) { 
    seats.push({ id: `Y${i}`, description: "1m20 linéaire sans angle sans table à l'intérieur", available: true, 
      price:600, x: 3640+(seatHeight+1)*i, y: 1180, w: seatHeight, h: seatWidth });
  }

  // Line Z
  for(var i=1;i<=43;i++) { 
    seats.push({ id: `Z${i}`, description: "1m20 linéaire sans angle sans table à l'intérieur", available: true, 
      price:600, x: 4200+(seatHeight+1)*i, y: 805, w: seatHeight, h: seatWidth });
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