'use client'
import React, { useEffect, useState, useRef } from 'react';
import HalleDeBereVide from '@/atoms/HalleDeBereVide';
import { Seat, getSeats } from '@/atoms/getSeats';
import { useCart } from '../context/CartContext';
import 'svg-pan-zoom';

export default async function HalleDeBere() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const { state, dispatch } = useCart();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    async function fetchSeats() {
      const fetchedSeats = await getSeats();
      setSeats(fetchedSeats);
    }
    fetchSeats();
  }, []);

  const isSeatSelected = (id: string) => {
    return state.items.some(item => item.id === id);
  };

  const toggleSeat = (id: string) => {
    const seatToggled: Seat = seats.find(seat => seat.id === id) as Seat;
    if (isSeatSelected(id)) {
      dispatch({
        type: 'REMOVE_ITEM',
        id: id,
      });
    } else {
      dispatch({
        type: 'ADD_ITEM',
        item: { id: id, description: seatToggled.description, price: seatToggled.price, quantity: 1 },
      });
    }
  };

  useEffect(() => {
    import('svg-pan-zoom').then(module => {
      const svgPanZoom = module.default;
      if (svgRef.current) {
        svgPanZoom(svgRef.current, {
          zoomEnabled: true,
          controlIconsEnabled: true,
          fit: true,
          center: true,
          preventMouseEventsDefault: true
        });

        const handleTouchStart = (e: TouchEvent) => {
          if (e.touches.length > 1) {
            e.preventDefault();
          }
        };

        const handleTouchMove = (e: TouchEvent) => {
          if (e.touches.length > 1) {
            e.preventDefault();
          }
        };

        svgRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
        svgRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
        svgRef.current.addEventListener('gesturestart', (e) => {
          e.preventDefault();
        }, { passive: false });
        
        return () => {
          if (svgRef.current) {
            svgRef.current.removeEventListener('touchstart', handleTouchStart);
            svgRef.current.removeEventListener('touchmove', handleTouchMove);
          }
        };
      }
    });

    Array.from(document.querySelectorAll('#seats text')).forEach(t => {
      var text = t as SVGTextElement;
      const dataForAttr = text.attributes.getNamedItem('data-for');
      if (dataForAttr) {
        var rect = document.getElementById(dataForAttr.value) as unknown as SVGRectElement | null;
        if (rect) {
          const rectX = parseFloat(rect.getAttribute('x') ?? '0');
          const rectY = parseFloat(rect.getAttribute('y') ?? '0');
          const rectWidth = parseFloat(rect.getAttribute('width') ?? '0');
          const rectHeight = parseFloat(rect.getAttribute('height') ?? '0');
        
          const bbox = text.getBBox();
          const textWidth = bbox.width;
          const textHeight = bbox.height;
        
          const centerX = rectX + (rectWidth - textWidth) / 2;
          const centerY = rectY + (rectHeight + textHeight) / 2 - 5;
        
          text.setAttribute('x', ''+centerX);
          text.setAttribute('y', ''+centerY);
        }
      }
    });
  }, []);

  return (
    <svg ref={svgRef} id="halledebere" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="500px" viewBox="920 300 3300 1768" preserveAspectRatio="xMidYMid meet" className="cursor-grab border-2" style={{ touchAction: 'manipulation' }}>
      <g enableBackground="new">
        <HalleDeBereVide/>
        <g id="seats">
          {seats.map(seat => (
            <rect
              key={seat.id}
              id={seat.id}
              x={seat.x}
              y={seat.y}
              width={seat.w}
              height={seat.h}
              fill={!seat.available ? 'red' : isSeatSelected(seat.id) ? 'green' : 'grey'}
              onClick={seat.available ? () => toggleSeat(seat.id) : undefined}
              onTouchStart={seat.available ? () => toggleSeat(seat.id) : undefined}
              style={{ cursor: seat.available ? "cursor-pointer" : "not-allowed" }}
            />
          ))}
          {seats.map(seat => (
            <text 
              key={'seat-'+seat.id}
              id={'seat-'+seat.id}
              data-for={seat.id}
              x={seat.x+seat.w/4} 
              y={seat.y+seat.h/40+10+seat.h/5} 
              fill="white" 
              stroke="white"
              fontSize="20"
              onClick={seat.available ? () => toggleSeat(seat.id) : undefined}
              onTouchStart={seat.available ? () => toggleSeat(seat.id) : undefined}
              style={{ cursor: seat.available ? "cursor-pointer" : "not-allowed" }}
            >
              {seat.id}
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
}