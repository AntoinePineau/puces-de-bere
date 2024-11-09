import { NextResponse } from 'next/server';
import { getAccessToken, getAllTickets, getSoldTickets } from '@/app/utils/helloasso';

export async function GET() {
  try {
    const token = await getAccessToken();
    const allTickets = await getAllTickets(token);

    var index = 1, totalPages = 1000, enrichedTickets = allTickets;
    do {
      const soldTickets = await getSoldTickets(token, index);
      enrichedTickets = enrichTickets(enrichedTickets, soldTickets);
      totalPages = soldTickets.pagination.totalPages;
    }
    while(index<totalPages);

    // Check the structure of tickets
    console.log('Tickets:', enrichedTickets);

    return NextResponse.json(enrichedTickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

function enrichTickets(allTickets, soldTickets) {
  return allTickets.map(ticket => {
      const soldTicket = soldTickets.data.find(p => p.tierId === ticket.id);

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