import { NextResponse } from 'next/server';
import { getAccessToken, getAllTickets, getSoldTickets } from '@/app/utils/helloasso';

export async function GET() {
  try {
    const token = await getAccessToken();
    const allTickets = await getAllTickets(token);

    var index = 1, enrichedTickets = allTickets, soldTickets = [];
    do {
      const soldTicketsTemp = await getSoldTickets(token, index);
      if(soldTicketsTemp == null) {
        break;
      }
      console.log(`Page ${index} Sold ${soldTicketsTemp.data.length} Tickets : total pages ${soldTicketsTemp.pagination.totalPages}`);
      soldTickets = soldTickets.concat(soldTicketsTemp.data);
      index = index + 1;
    }
    while(true);

    enrichedTickets = enrichTickets(enrichedTickets, soldTickets);
    console.log('Enriched Tickets:', enrichedTickets.length);

    return NextResponse.json(enrichedTickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

function enrichTickets(allTickets, soldTickets) {
  return allTickets.map(ticket => {
      const soldTicket = soldTickets.find(p => p.tierId === ticket.id);

      if (soldTicket) {
          return {
              ...ticket,
              available: false,
              paymentDetails: {
                  orderId: soldTicket.order.id,
                  payer: soldTicket.payer,
                  user: soldTicket.user,
                  ticketUrl: soldTicket.ticketUrl,
                  qrCode: soldTicket.qrCode,
                  amount: soldTicket.amount,
                  state: soldTicket.state
              }
          };
      } else {
          // Si le ticket n'a pas été payé, ajouter une indication
          return {
              ...ticket,
              available: true
          };
      }
  });
}