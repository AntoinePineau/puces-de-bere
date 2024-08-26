import { NextResponse } from 'next/server';
import { getAccessToken, getAllTickets, getSoldTickets } from '../../utils/helloasso';

export async function GET() {
  try {
    const token = await getAccessToken();
    const allTickets = await getAllTickets(token);
    const soldTickets = await getSoldTickets(token);

    const enrichedTickets = enrichTickets(allTickets, soldTickets);

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
      const soldTicket = soldTickets.find(p => p.tierId === ticket.id);

      if (soldTicket) {
          return {
              ...ticket,
              isPaid: true,
              details: {
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
              isPaid: false
          };
      }
  });
}