import { useRef, useState, ReactNode } from 'react';

export interface SwipeAction {
 icon: ReactNode;
 label: string;
 textColor: string;
 bgColor: string;
 onClick: () => void;
}

interface SwipeableCardProps {
 children: ReactNode;
 actions?: SwipeAction[];
 className?: string;
 /** Called when user taps the card without swiping */
 onTap?: () => void;
}

const ACTION_ITEM_WIDTH = 68;
/** Min horizontal travel (px) that counts as a swipe, not a tap */
const SWIPE_THRESHOLD = 8;

export function SwipeableCard({
 children,
 actions = [],
 className = '',
 onTap,
}: SwipeableCardProps) {
 const [swipeOffset, setSwipeOffset] = useState(0);
 const isDragging = useRef(false);
 const startX = useRef(0);
 const lastOffset = useRef(0);
 const didSwipe = useRef(false); // true if touch moved beyond SWIPE_THRESHOLD

 const totalActionWidth = actions.length * ACTION_ITEM_WIDTH;
 const snapThreshold = totalActionWidth * 0.45;

 if (actions.length === 0) {
 return (
 <div className={className} onClick={onTap}>
 {children}
 </div>
 );
 }

 const handleTouchStart = (e: React.TouchEvent) => {
 isDragging.current = true;
 didSwipe.current = false;
 startX.current = e.touches[0].clientX;
 lastOffset.current = swipeOffset;
 };

 const handleTouchMove = (e: React.TouchEvent) => {
 if (!isDragging.current) return;
 const deltaX = startX.current - e.touches[0].clientX;
 if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
 didSwipe.current = true;
 }
 const raw = lastOffset.current + deltaX;
 const clamped = Math.max(0, Math.min(raw, totalActionWidth));
 setSwipeOffset(clamped);
 };

 const handleTouchEnd = () => {
 isDragging.current = false;

 if (!didSwipe.current) {
 // Pure tap — onClick will fire next and handle navigation
 // If card was open, close it
 if (swipeOffset > 0) {
 setSwipeOffset(0);
 lastOffset.current = 0;
 }
 return;
 }

 // It was a swipe — snap open or closed
 if (swipeOffset > snapThreshold) {
 setSwipeOffset(totalActionWidth);
 lastOffset.current = totalActionWidth;
 } else {
 setSwipeOffset(0);
 lastOffset.current = 0;
 }
 };

 const handleClick = () => {
 // Only navigate if it was a clean tap (not a swipe) and card is closed
 if (!didSwipe.current && swipeOffset === 0) {
 onTap?.();
 }
 };

 const close = () => {
 setSwipeOffset(0);
 lastOffset.current = 0;
 };

 return (
 <div className={`relative overflow-hidden ${className}`}>

 {/* Revealed action strip */}
 <div
 className="absolute inset-y-0 right-0 flex"
 style={{ width: totalActionWidth }}
 >
 {actions.map((action, i) => (
 <button
 key={i}
 onClick={(e) => { e.stopPropagation(); action.onClick(); close(); }}
 style={{ width: ACTION_ITEM_WIDTH }}
 className={`flex flex-col items-center justify-center gap-1 h-full transition-opacity active:opacity-70 ${action.bgColor}`}
 >
 <span className={action.textColor}>{action.icon}</span>
 <span className={`text-[10px] font-normal tracking-wide ${action.textColor}`}>
 {action.label}
 </span>
 </button>
 ))}
 </div>

 {/* Swipeable content layer */}
 <div
 onTouchStart={handleTouchStart}
 onTouchMove={handleTouchMove}
 onTouchEnd={handleTouchEnd}
 onClick={handleClick}
 style={{
 transform: `translateX(-${swipeOffset}px)`,
 transition: isDragging.current
 ? 'none'
 : 'transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
 cursor: onTap ? 'pointer' : 'default',
 }}
 >
 {children}
 </div>
 </div>
 );
}
