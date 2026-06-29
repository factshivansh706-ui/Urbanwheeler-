import React, { useEffect, useRef, useState } from 'react';
import { ActiveRide } from '../types';

interface MapSimulationProps {
  pickupName: string;
  destinationName: string;
  activeRide: ActiveRide | null;
  pickupLatLng?: [number, number] | null;
  destinationLatLng?: [number, number] | null;
}

// Map logical pixel positions of Uttarkashi popular locations
const LOCATION_COORDS: Record<string, { x: number; y: number }> = {
  "Santri's CSC, Joshiyara": { x: 380, y: 350 },
  'Kashi Vishwanath Temple': { x: 420, y: 220 },
  'Gangotri Temple Complex': { x: 700, y: 100 },
  'Jolly Grant Airport, Dehradun': { x: 150, y: 500 },
  'Chinyalisaur Helipad Lake': { x: 260, y: 380 },
};

const getLatLngCoords = (latLng: [number, number] | null | undefined, name: string): { x: number; y: number } => {
  if (LOCATION_COORDS[name]) {
    return LOCATION_COORDS[name];
  }
  if (!latLng) {
    return LOCATION_COORDS["Santri's CSC, Joshiyara"];
  }
  const [lat, lng] = latLng;
  // If local to Uttarkashi region: lat around 30.0 to 31.5, lng around 78.0 to 79.5
  if (lat > 30.0 && lat < 31.5 && lng > 78.0 && lng < 79.5) {
    const latDelta = lat - 30.7251;
    const lngDelta = lng - 78.4370;
    
    // Scale factors
    const x = 380 - (lngDelta * 10000);
    const y = 350 - (latDelta * 50000);
    
    return {
      x: Math.max(100, Math.min(700, x)),
      y: Math.max(100, Math.min(500, y)),
    };
  } else {
    // Outside local bounds. Let's generate a beautiful deterministic offset near Joshiyara.
    const hash = (lat + lng) * 1000;
    const offsetX = (Math.abs(Math.sin(hash)) * 80) - 40; // -40 to 40
    const offsetY = (Math.abs(Math.cos(hash)) * 60) - 30; // -30 to 30
    return {
      x: 380 + offsetX,
      y: 350 + offsetY,
    };
  }
};

export default function MapSimulation({
  pickupName,
  destinationName,
  activeRide,
  pickupLatLng,
  destinationLatLng,
}: MapSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Local state for drifting nearby drivers when idle
  const [nearbyDrivers, setNearbyDrivers] = useState<
    Array<{ id: number; x: number; y: number; angle: number; speed: number; type: string }>
  >([]);

  // Initialize nearby driver bikes and cabs
  useEffect(() => {
    const types = ['bike_rental', 'scooter_rental', 'taxi_local', 'taxi_suv'];
    const drivers = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 380 + (Math.random() - 0.5) * 200,
      y: 320 + (Math.random() - 0.5) * 150,
      angle: Math.random() * Math.PI * 2,
      speed: 0.25 + Math.random() * 0.35,
      type: types[i % types.length],
    }));
    setNearbyDrivers(drivers);
  }, []);

  // Handle ResizeObserver to make the canvas fluidly fill its parent container
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.max(width, 280),
          height: Math.max(height, 350),
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    // Get coordinates for active pickup/destination
    const pCoord = getLatLngCoords(pickupLatLng, pickupName);
    const dCoord = destinationName ? getLatLngCoords(destinationLatLng, destinationName) : null;

    // Scale coordinates from logical (800x600) to actual canvas size
    const getActualCoords = (logicalX: number, logicalY: number) => {
      return {
        x: (logicalX / 800) * dimensions.width,
        y: (logicalY / 600) * dimensions.height,
      };
    };

    // Update drifting nearby drivers
    const updatedDrivers = [...nearbyDrivers];

    const drawMap = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 1. Draw premium dark theme city grids background
      ctx.fillStyle = '#0a0a0c'; // Absolute luxury black
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw elegant topological ring contours for mountains
      ctx.strokeStyle = '#121216';
      ctx.lineWidth = 1;
      
      const drawContour = (cx: number, cy: number, radius: number) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      };
      
      drawContour(dimensions.width * 0.15, dimensions.height * 0.2, 50);
      drawContour(dimensions.width * 0.15, dimensions.height * 0.2, 90);
      drawContour(dimensions.width * 0.15, dimensions.height * 0.2, 130);
      
      drawContour(dimensions.width * 0.85, dimensions.height * 0.15, 60);
      drawContour(dimensions.width * 0.85, dimensions.height * 0.15, 110);
      drawContour(dimensions.width * 0.85, dimensions.height * 0.15, 160);

      // 2. Draw Bhagirathi River weaving elegantly down the hills
      ctx.strokeStyle = '#1e3a8a'; // Deep water blue
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      
      // Draw winding river curve
      const p1 = getActualCoords(0, 50);
      const p2 = getActualCoords(200, 180);
      const p3 = getActualCoords(350, 360);
      const p4 = getActualCoords(500, 380);
      const p5 = getActualCoords(800, 550);
      
      ctx.moveTo(p1.x, p1.y);
      ctx.bezierCurveTo(p2.x, p2.y, p3.x, p3.y, p5.x, p5.y);
      ctx.stroke();

      // Inner lighter river stream
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 4;
      ctx.stroke();

      // 3. Draw mountain passes roads (curvy, not blocky)
      ctx.strokeStyle = '#1e1e24'; // Mountain road color
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Himalayan National Highway
      ctx.beginPath();
      const rh1 = getActualCoords(50, 550);
      const rh2 = getActualCoords(250, 420);
      const rh3 = getActualCoords(380, 350); // Joshiyara CSC
      const rh4 = getActualCoords(420, 220); // Kashi Vishwanath
      const rh5 = getActualCoords(600, 140);
      const rh6 = getActualCoords(750, 50);
      
      ctx.moveTo(rh1.x, rh1.y);
      ctx.quadraticCurveTo(rh2.x, rh2.y, rh3.x, rh3.y);
      ctx.quadraticCurveTo(rh4.x, rh4.y, rh6.x, rh6.y);
      ctx.stroke();

      // Highway dashes
      ctx.strokeStyle = '#ca8a04'; // Mountain yellow divider
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 8]);
      ctx.stroke();
      ctx.setLineDash([]); // Reset

      // Side mountain roads to Chinyalisaur Helipad
      ctx.strokeStyle = '#1e1e24';
      ctx.lineWidth = 8;
      ctx.beginPath();
      const r1 = getActualCoords(260, 380); // Chinyalisaur
      const r2 = getActualCoords(380, 350); // Joshiyara
      ctx.moveTo(r1.x, r1.y);
      ctx.lineTo(r2.x, r2.y);
      ctx.stroke();

      // Side road to Jolly Grant Airport
      ctx.beginPath();
      const r_air = getActualCoords(150, 500);
      ctx.moveTo(r_air.x, r_air.y);
      ctx.lineTo(r1.x, r1.y);
      ctx.stroke();

      // 4. Draw Nearby Captains wandering if no active ride or in searching phase
      const rideStatus = activeRide ? activeRide.status : 'idle';

      if (rideStatus === 'idle' || rideStatus === 'searching') {
        updatedDrivers.forEach((driver) => {
          // Update driver wandering position
          driver.x += Math.cos(driver.angle) * driver.speed;
          driver.y += Math.sin(driver.angle) * driver.speed;

          // Boundary checks for mountain limits
          if (driver.x < 120 || driver.x > 680) {
            driver.angle = Math.PI - driver.angle;
          }
          if (driver.y < 100 || driver.y > 500) {
            driver.angle = -driver.angle;
          }
          // Randomly change direction slightly
          if (Math.random() < 0.02) {
            driver.angle += (Math.random() - 0.5) * 1.5;
          }

          const actCoords = getActualCoords(driver.x, driver.y);

          // Draw dynamic drifting vehicle dots
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#facc15';
          ctx.fillStyle = '#facc15'; // Taxi Yellow
          ctx.beginPath();
          ctx.arc(actCoords.x, actCoords.y, 4.5, 0, Math.PI * 2);
          ctx.fill();

          // Heading direction indicator
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(actCoords.x, actCoords.y);
          ctx.lineTo(
            actCoords.x + Math.cos(driver.angle) * 7,
            actCoords.y + Math.sin(driver.angle) * 7
          );
          ctx.stroke();
          ctx.shadowBlur = 0; // Reset shadow
        });
      }

      // 5. Draw active routes and pins
      const pickupActual = getActualCoords(pCoord.x, pCoord.y);

      if (dCoord) {
        const destActual = getActualCoords(dCoord.x, dCoord.y);

        // Draw dotted route between pickup and destination
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.2)';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(pickupActual.x, pickupActual.y);
        ctx.bezierCurveTo(
          (pickupActual.x + destActual.x) / 2 + 30,
          (pickupActual.y + destActual.y) / 2 - 30,
          (pickupActual.x + destActual.x) / 2 - 30,
          (pickupActual.y + destActual.y) / 2 + 30,
          destActual.x,
          destActual.y
        );
        ctx.stroke();

        // Glowing animated route highlight
        const t = (Date.now() % 2500) / 2500;
        ctx.strokeStyle = '#eab308'; // Premium gold
        ctx.lineWidth = 3.5;
        ctx.setLineDash([12, 24]);
        ctx.lineDashOffset = -t * 120;
        ctx.beginPath();
        ctx.moveTo(pickupActual.x, pickupActual.y);
        ctx.bezierCurveTo(
          (pickupActual.x + destActual.x) / 2 + 30,
          (pickupActual.y + destActual.y) / 2 - 30,
          (pickupActual.x + destActual.x) / 2 - 30,
          (pickupActual.y + destActual.y) / 2 + 30,
          destActual.x,
          destActual.y
        );
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // Draw Destination Pin (White Pearl Pin)
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffffff';
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(destActual.x, destActual.y, 7.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#09090b';
        ctx.beginPath();
        ctx.arc(destActual.x, destActual.y, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Destination Label Card
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.fillStyle = 'rgba(15, 15, 17, 0.95)';
        ctx.beginPath();
        ctx.roundRect(destActual.x - 55, destActual.y - 34, 110, 20, 6);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = '500 8.5px "Plus Jakarta Sans"';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('DESTINATION HUB', destActual.x, destActual.y - 21);
      }

      // Draw Pickup Pin (Bright Yellow)
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#facc15';
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(pickupActual.x, pickupActual.y, 8.5, 0, Math.PI * 2);
      ctx.fill();

      // Outer ripple if searching
      if (rideStatus === 'searching') {
        const rippleRad = 14 + (Date.now() % 1200) * 0.025;
        const opacity = Math.max(0, 1 - (Date.now() % 1200) / 1200);
        ctx.strokeStyle = `rgba(250, 204, 21, ${opacity})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(pickupActual.x, pickupActual.y, rippleRad, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = '#09090b';
      ctx.beginPath();
      ctx.arc(pickupActual.x, pickupActual.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Pickup Label Card
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.roundRect(pickupActual.x - 45, pickupActual.y - 34, 90, 20, 6);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = 'bold 8.5px "Plus Jakarta Sans"';
      ctx.fillStyle = '#09090b';
      ctx.textAlign = 'center';
      ctx.fillText('URBAN PICKUP', pickupActual.x, pickupActual.y - 21);

      // 6. Draw active driver vehicle if matching is active
      if (activeRide && activeRide.rideOption && dCoord) {
        const destActual = getActualCoords(dCoord.x, dCoord.y);
        let vehiclePos = { x: 0, y: 0 };
        let vehicleAngle = 0;

        if (activeRide.status === 'assigned' || activeRide.status === 'arriving') {
          // Driver approaching pickup. Start from a fixed offset, moving towards pickup.
          const driverStart = { x: pCoord.x - 140, y: pCoord.y + 70 };
          const startAct = getActualCoords(driverStart.x, driverStart.y);
          const ratio = activeRide.progress / 100;

          vehiclePos.x = startAct.x + (pickupActual.x - startAct.x) * ratio;
          vehiclePos.y = startAct.y + (pickupActual.y - startAct.y) * ratio;
          vehicleAngle = Math.atan2(pickupActual.y - startAct.y, pickupActual.x - startAct.x);

          // Draw arriving driver path
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([4, 6]);
          ctx.beginPath();
          ctx.moveTo(startAct.x, startAct.y);
          ctx.lineTo(pickupActual.x, pickupActual.y);
          ctx.stroke();
          ctx.setLineDash([]);
        } else if (activeRide.status === 'ongoing') {
          // Driver moving from pickup to destination along curves
          const ratio = activeRide.progress / 100;
          // Curve interpolation approximation
          const midX = (pickupActual.x + destActual.x) / 2;
          const midY = (pickupActual.y + destActual.y) / 2;
          
          // Bezier point calculation
          const cx1 = midX + 30;
          const cy1 = midY - 30;
          const cx2 = midX - 30;
          const cy2 = midY + 30;

          const interpolateCubic = (p0: number, p1: number, p2: number, p3: number, t: number) => {
            const temp = 1 - t;
            return temp * temp * temp * p0 + 3 * temp * temp * t * p1 + 3 * temp * t * t * p2 + t * t * t * p3;
          };

          vehiclePos.x = interpolateCubic(pickupActual.x, cx1, cx2, destActual.x, ratio);
          vehiclePos.y = interpolateCubic(pickupActual.y, cy1, cy2, destActual.y, ratio);

          // Calculate small future tangent for heading direction
          const delta = 0.01;
          const nextRatio = Math.min(1, ratio + delta);
          const nextX = interpolateCubic(pickupActual.x, cx1, cx2, destActual.x, nextRatio);
          const nextY = interpolateCubic(pickupActual.y, cy1, cy2, destActual.y, nextRatio);
          vehicleAngle = Math.atan2(nextY - vehiclePos.y, nextX - vehiclePos.x);
        } else if (activeRide.status === 'completed') {
          vehiclePos = destActual;
          vehicleAngle = 0;
        }

        if (activeRide.status !== 'searching') {
          // Draw matched premium vehicle capsule
          ctx.save();
          ctx.translate(vehiclePos.x, vehiclePos.y);
          ctx.rotate(vehicleAngle);

          // Draw differently depending on scooter vs cab
          const isTwoWheeler = activeRide.rideOption.category === 'rental';

          if (isTwoWheeler) {
            // Bike icon
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#eab308';
            ctx.fillStyle = '#eab308';
            ctx.beginPath();
            ctx.roundRect(-7, -2.5, 14, 5, 2);
            ctx.fill();
            
            // Rider helm
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(-2, 0, 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Car body
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#facc15';
            ctx.fillStyle = '#facc15';
            ctx.beginPath();
            ctx.roundRect(-9, -5.5, 18, 11, 3.5);
            ctx.fill();

            // Windshield
            ctx.fillStyle = '#09090b';
            ctx.fillRect(1, -3.5, 3.5, 7);
          }

          ctx.restore();
          ctx.shadowBlur = 0;

          // Draw status text near vehicle
          ctx.font = 'bold 9.5px "Plus Jakarta Sans"';
          ctx.fillStyle = '#facc15';
          ctx.textAlign = 'center';
          const textY = activeRide.status === 'ongoing' ? vehiclePos.y - 15 : vehiclePos.y + 18;
          const statusText =
            activeRide.status === 'ongoing'
              ? `EN ROUTE (${activeRide.progress}%)`
              : activeRide.rideOption.category === 'rental' 
              ? 'BIKE READY AT JOSHIYARA' 
              : 'CAPTAIN ARRIVING';
          ctx.fillText(statusText, vehiclePos.x, textY);
        }
      }

      animationId = requestAnimationFrame(drawMap);
    };

    drawMap();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions, pickupName, destinationName, activeRide, nearbyDrivers]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[350px] md:min-h-[450px] rounded-2xl overflow-hidden border border-white/60 shadow-2xl glass-card">
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="block w-full h-full" />
      
      {/* Top Floating Glass Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="glass-premium px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 text-zinc-800 shadow-md pointer-events-auto border-white/50">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
          <span>Uttarkashi Live GPS Map</span>
        </div>
        
        {activeRide?.status === 'ongoing' && (
          <div className="glass-premium px-3.5 py-1.5 rounded-full text-xs font-bold text-yellow-600 flex items-center gap-1 shadow-md pointer-events-auto border-white/50">
            <span>Speed: 32 km/h (Hills)</span>
          </div>
        )}
      </div>

      {/* Grid coordinates decorative styling bottom right */}
      <div className="absolute bottom-4 right-4 pointer-events-none font-mono text-[9px] text-zinc-500 glass-premium px-2 py-0.5 rounded border border-white/40 shadow-sm">
        LAT: 30.7251° N / LON: 78.4370° E
      </div>
    </div>
  );
}
