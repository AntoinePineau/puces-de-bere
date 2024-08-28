import React, { useState, useEffect, useRef } from 'react';
import HalleDeBereVide from '@/atoms/HalleDeBereVide';
import { Seat, getSeats } from '@/atoms/getSeats';
import { useCart } from '../context/CartContext';
import SvgPanZoom from 'svg-pan-zoom';

export default function HalleDeBere() {
  const seats: Seat[] = getSeats();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { dispatch } = useCart();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const panZoomRef = useRef<SvgPanZoom.Instance | null>(null);

  const toggleSeat = (id: string) => {
    const seatToggled: Seat = seats.find(seat => seat.id === id) as Seat;
    selectedSeats.includes(id) ? 
      dispatch({
        type: 'REMOVE_ITEM',
        id: id,
      }) : 
      dispatch({
        type: 'ADD_ITEM',
        item: { id: id, description: seatToggled.description, price: seatToggled.price, quantity: 1 },
      });
    
    setSelectedSeats(prev =>
      prev.includes(id) ? prev.filter(seat => seat !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const initializePanZoom = async () => {
      const SvgPanZoom = (await import('svg-pan-zoom')).default;
      if (svgRef.current) {
        panZoomRef.current = SvgPanZoom(svgRef.current, {
          zoomEnabled: true,
          controlIconsEnabled: true,
          fit: true,
          center: true,
          minZoom: 0.5,
          maxZoom: 10,
          zoomScaleSensitivity: 0.3,
        });

        let initialPinchDistance = 0;
        let initialZoom = 1;

        const handleTouchStart = (e: TouchEvent) => {
          if (e.touches.length === 2) {
            initialPinchDistance = getPinchDistance(e.touches);
            initialZoom = panZoomRef.current?.getZoom() || 1;
          }
        };

        const handleTouchMove = (e: TouchEvent) => {
          if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = getPinchDistance(e.touches);
            const zoomFactor = currentDistance / initialPinchDistance;
            
            if (panZoomRef.current) {
              const newZoom = initialZoom * zoomFactor;
              panZoomRef.current.zoom(newZoom);
            }
          }
        };

        svgRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
        svgRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
          if (svgRef.current) {
            svgRef.current.removeEventListener('touchstart', handleTouchStart);
            svgRef.current.removeEventListener('touchmove', handleTouchMove);
          }
          if (panZoomRef.current) {
            panZoomRef.current.destroy();
          }
        };
      }
    };

    initializePanZoom();
  }, []);

  useEffect(() => {
    // Center text in seats (unchanged)
    // ... (keep the existing text centering logic)
  }, []);

  const getPinchDistance = (touches: TouchList): number => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <svg 
      ref={svgRef} 
      id="halledebere" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      version="1.1" 
      width="100%" 
      height="500px" 
      viewBox="920 300 3300 1768" 
      preserveAspectRatio="xMidYMid meet" 
      className="cursor-grab border-2" 
      style={{ touchAction: 'none' }}
    >
      <g enableBackground="new">
        <HalleDeBereVide/>
        <g id="seats">
          {seats.map(seat => (
            <React.Fragment key={seat.id}>
              <rect
                id={seat.id}
                x={seat.x}
                y={seat.y}
                width={seat.w}
                height={seat.h}
                fill={selectedSeats.includes(seat.id) ? 'green' : 'grey'}
                onClick={() => toggleSeat(seat.id)}
                className="cursor-pointer"
              />
              <text 
                id={`seat-${seat.id}`}
                data-for={seat.id}
                fill="white" 
                stroke="white"
                fontSize="20"
                className="cursor-pointer"
                onClick={() => toggleSeat(seat.id)}
              >
                {seat.id}
              </text>
            </React.Fragment>
          ))}
        </g>
      </g>
    </svg>
  );
}