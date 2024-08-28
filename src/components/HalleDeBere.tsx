'use client';
import React, { useState, useEffect, useRef } from 'react';
import HalleDeBereVide from '@/atoms/HalleDeBereVide';
import { Seat, getSeats } from '@/atoms/getSeats';
import { useCart } from '../context/CartContext';
import 'svg-pan-zoom';

export default function HalleDeBere() {
  const seats:Seat[] = getSeats();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { dispatch } = useCart();

  const toggleSeat = (id:string) => {
    const seatToggled:Seat = seats.find(seat => seat.id === id) as Seat;
    selectedSeats.includes(id) ? 
      dispatch({
        type: 'REMOVE_ITEM',
        id: id ,
      }) : 
      dispatch({
        type: 'ADD_ITEM',
        item: { id:id, description:seatToggled.description, price:seatToggled.price, quantity: 1 },
      });
    
    setSelectedSeats(prev =>
      prev.includes(id) ? prev.filter(seat => seat !== id) : [...prev, id]
    );
  };
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Load the script dynamically and initialize it
    import('svg-pan-zoom').then(module => {
      const svgPanZoom = module.default;
      if(svgRef.current) {
        svgPanZoom(svgRef.current, {
          zoomEnabled: true,
          controlIconsEnabled: true,
          fit: true,
          center: true,
          preventMouseEventsDefault: true
        });

        // Add event listeners to handle pinch-zoom
        const handleTouchStart = (e: TouchEvent) => {
          if (e.touches.length > 1) {
            e.preventDefault();  // Prevent the page from zooming
          }
        };

        const handleTouchMove = (e: TouchEvent) => {
          if (e.touches.length > 1) {
            e.preventDefault();  // Prevent the page from zooming
          }
        };

        svgRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
        svgRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
        svgRef.current.addEventListener('gesturestart', (e) => {
          e.preventDefault();  // Prevent page zoom
        }, { passive: false });
        
        // Clean up event listeners on component unmount
        return () => {
          if (svgRef.current) {
            svgRef.current.removeEventListener('touchstart', handleTouchStart);
            svgRef.current.removeEventListener('touchmove', handleTouchMove);
          }
        };
      }
    });
    Array.from(document.querySelectorAll('#seats text')).forEach(t=>{
      var text = t as SVGTextElement;
      const dataForAttr = text.attributes.getNamedItem('data-for');
      if(dataForAttr) {
        var rect = document.getElementById(dataForAttr.value) as unknown as SVGRectElement | null;
        if(rect) {
          // Get the rectangle's dimensions and position
          const rectX = parseFloat(rect.getAttribute('x') ?? '0');
          const rectY = parseFloat(rect.getAttribute('y') ?? '0');
          const rectWidth = parseFloat(rect.getAttribute('width') ?? '0');
          const rectHeight = parseFloat(rect.getAttribute('height') ?? '0');
        
          // Get the bounding box of the text
          const bbox = text.getBBox();
          const textWidth = bbox.width;
          const textHeight = bbox.height;
        
          // Calculate the position to center the text
          const centerX = rectX + (rectWidth - textWidth) / 2;
          const centerY = rectY + (rectHeight + textHeight) / 2 - 5;
        
          // Set the x and y attributes to center the text
          text.setAttribute('x', ''+centerX);
          text.setAttribute('y', ''+centerY);
        }
      }
    })

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
              fill={selectedSeats.includes(seat.id) ? 'green' : 'grey'}
              onClick={() => toggleSeat(seat.id)}
              onTouchStart={() => toggleSeat(seat.id)}
              className="cursor-pointer"
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
              className="cursor-pointer"
              onClick={() => toggleSeat(seat.id)}              
              onTouchStart={() => toggleSeat(seat.id)}>{seat.id}</text>
          ))}
        </g>
        </g>
      </svg>
  );
}
