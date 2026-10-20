import React, { useRef, useState } from 'react';
import './whiteboard-page.css';

type Stroke = { points: Array<{ x: number; y: number }>; color: string; width: number };

export function WhiteboardPage({ title = 'Whiteboard' }: { title?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [color, setColor] = useState('#2563eb');
  const [width, setWidth] = useState(3);
  const drawing = useRef(false);
  const point = (event: React.PointerEvent<HTMLCanvasElement>) => { const canvas = canvasRef.current; if (!canvas) return { x: 0, y: 0 }; const rect = canvas.getBoundingClientRect(); return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height }; };
  const redraw = (items: Stroke[]) => { const canvas = canvasRef.current; const ctx = canvas?.getContext('2d'); if (!canvas || !ctx) return; ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; for (const stroke of items) { if (stroke.points.length < 2) continue; ctx.strokeStyle = stroke.color; ctx.lineWidth = stroke.width; ctx.beginPath(); ctx.moveTo(stroke.points[0].x, stroke.points[0].y); stroke.points.slice(1).forEach(p => ctx.lineTo(p.x, p.y)); ctx.stroke(); } };
  const start = (event: React.PointerEvent<HTMLCanvasElement>) => { drawing.current = true; event.currentTarget.setPointerCapture(event.pointerId); setStrokes(items => [...items, { points: [point(event)], color, width }]); };
  const move = (event: React.PointerEvent<HTMLCanvasElement>) => { if (!drawing.current) return; setStrokes(items => { const next = [...items]; const current = next[next.length - 1]; if (current) current.points.push(point(event)); requestAnimationFrame(() => redraw(next)); return next; }); };
  const clear = () => { setStrokes([]); requestAnimationFrame(() => redraw([])); };
  return <section className="whiteboard-page" aria-label="Binder whiteboard page"><header className="whiteboard-page__header"><div><span>PAGE / WHITEBOARD</span><h2>{title}</h2></div><div className="whiteboard-page__tools"><label>Pen <input type="color" value={color} onChange={event => setColor(event.target.value)} /></label><label>Size <input type="range" min="1" max="16" value={width} onChange={event => setWidth(Number(event.target.value))} /></label><button onClick={clear}>Clear</button></div></header><div className="whiteboard-page__paper"><canvas ref={canvasRef} width={1400} height={760} onPointerDown={start} onPointerMove={move} onPointerUp={() => { drawing.current = false; }} onPointerCancel={() => { drawing.current = false; }} /><div className="whiteboard-page__hint">Draw, sketch architecture, map workflows, plan tasks, or connect ideas. This page lives inside the binder.</div></div></section>;
}
