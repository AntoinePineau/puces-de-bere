function addColumn(seats:any[], seatWidth:number, seatHeight:number, xCol:number, letter:string, startIndex:number) {
  seats.push({ id: `${letter}${startIndex}`, x: xCol, y: 1311, w: seatWidth, h: seatHeight*2 }); // A13
  for(var i=1;i<=6;i++) { // A14 ... A19
    seats.push({ id: `${letter}${startIndex+i}`, x: xCol, y: 1352+(seatHeight+2)*i, w: seatWidth, h: seatHeight });
  }
  seats.push({ id: `${letter}${startIndex+7}`, x: xCol, y: 1647, w: seatWidth, h: seatHeight*2 }); // A20
}

export function getSeats():any[] {
  
  const seatWidth = 80; //2m40 (table 60cm + 1m80 d'espace derrière)
  const seatHeight = 40; // 1m20

  const seats = [];

  // Column A1 ... A12
  var col = 1310;
  for(var i=1;i<=12;i++) { // A1 ... A12
    seats.push({ id: `A${i}`, x: col, y: 1185+(seatHeight+2)*i, w: seatWidth, h: seatHeight });
  }
  
  // Column A1 ... A20
  col = col + seatWidth*2 + seatWidth/4;
  addColumn(seats, seatWidth, seatHeight, col, 'A', 13);
  
  for (let charCode = 'B'.charCodeAt(0); charCode <= 'H'.charCodeAt(0); charCode++) {
    var letter = String.fromCharCode(charCode);
    // Column B1 ... B8 to H1 ... H8
    col = col + seatWidth+2;
    addColumn(seats, seatWidth, seatHeight, col, letter, 1);

    // Column B9 ... B16 to H9 ... H16
    col = col + seatWidth*2 + seatWidth/4;
    addColumn(seats, seatWidth, seatHeight, col, letter, 9);
  }

  // Column I1 ... I8
  col = col + seatWidth+2;
  addColumn(seats, seatWidth, seatHeight, col, 'I', 1);

  col = col + seatWidth*5/2;

  return seats;
}