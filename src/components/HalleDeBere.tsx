'use client'
import React, { useEffect, useState, useRef } from 'react';
import HalleDeBereVide from '@/atoms/HalleDeBereVide';
import { Seat, getSeats } from '@/atoms/getSeats';
import { useCart } from '../context/CartContext';
import 'svg-pan-zoom';

export default function HalleDeBere({ exposantsMode = false }: { exposantsMode?: boolean }) {
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
        item: { id: id, tierId: seatToggled.tierId, description: seatToggled.description, price: seatToggled.price, quantity: 1 },
      });
    }
  };

  useEffect(() => {
    import('svg-pan-zoom').then(module => {
      const svgPanZoom = module.default;
      if (svgRef.current) {
        const panZoomInstance = svgPanZoom(svgRef.current, {
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
          panZoomInstance.destroy(); // Clean up the pan-zoom instance
        };
      }
    });
  }, []);

  
  useEffect(() => {
    if (svgRef.current) {
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
    }
  }, [seats]);

  return (
    <div style={{ background:'#fff', border:'dashed 4px #f7a81b', padding: '.5em', width: '100%' }}>
    <svg ref={svgRef} id="halledebere" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height={exposantsMode ? "1000px" : "500px"} viewBox="0 1370 9361.11 3800" preserveAspectRatio="xMidYMid meet" className="cursor-grab border-2" style={{ touchAction: 'manipulation', backgroundImage: `url(${new URL('/texture_bg.png', window.location.origin)})` }}>
        <g style={{/*transform: 'translate(-660pt, -370pt)'*/}}>
          <HalleDeBereVide/>
        </g>
        <g id="seats">
          {seats.map(seat => (
            <rect
              key={seat.id}
              id={seat.id}
              x={seat.x}
              y={seat.y}
              width={seat.w}
              height={seat.h}
              fill={!seat.available ? 'gray' : isSeatSelected(seat.id) ? '#f7a81b' : seat.isAngle ? '#17458f' : !seat.inHelloAsso ? 'dimgrey' : 'black'}
              onClick={seat.available ? () => toggleSeat(seat.id) : undefined}
              onTouchStart={seat.available ? () => toggleSeat(seat.id) : undefined}
              style={{ cursor: seat.available ? "pointer" : "not-allowed" }}
            >
              <title>{seat.tip}</title>
            </rect>
          ))}
          {seats.map(seat => (
            !exposantsMode && (
              <text 
                key={'seat-'+seat.id} 
                id={'seat-'+seat.id}
                data-for={seat.id}
                x={seat.x} 
                y={seat.y} 
                fill="white" 
                stroke="white"
                fontSize="40"
                onClick={seat.available ? () => toggleSeat(seat.id) : undefined}
                onTouchStart={seat.available ? () => toggleSeat(seat.id) : undefined}
                style={{ cursor: seat.available ? "pointer" : "not-allowed" }}
              >
                {seat.id}
                <title>{seat.tip}</title>
              </text>
            )
            || ( 
            seat.available && (
              <text key={'seat-'+seat.id} id={'seat-'+seat.id} data-for={seat.id} x={seat.x} y={seat.y} fill="white" stroke="white" fontSize="40" >
                {seat.id}
                <title>{seat.tip}</title>
              </text>
            )
            || (
              <>
                <text 
                key={'seat1-'+seat.id} 
                id={'seat1-'+seat.id} 
                data-for={seat.id} 
                x={seat.x} 
                y={seat.y} 
                fill="white" 
                stroke="white" 
                fontSize="15" 
                transform={seat.w < seat.h ? `translate(115,20) rotate(90, ${seat.x}, ${seat.y})` : undefined}
                >
                {seat.exposantLastName}
                <title>{seat.tip}</title>
                </text>
              </>
            )
          )
          ))}
      </g>
    </svg>
    </div>
  );
}