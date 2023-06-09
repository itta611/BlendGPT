import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect, useRef } from 'react';

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const scrollElementRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const scrollElement = scrollElementRef.current;

    scrollElement.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
      if (
        (scrollElement.scrollLeft <= 0 && e.deltaY < 0) ||
        (scrollElement.scrollLeft >= maxScrollLeft && e.deltaY > 0)
      )
        return;
      e.preventDefault();
      scrollElement.scrollLeft += e.deltaY;
    });
  });
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={classNames('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full" ref={scrollElementRef}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={classNames(
      'flex touch-none select-none transition-colors w-[640px]',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' && 'h-2.5 border-t border-t-transparent p-[1px] flex-col',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-white/20" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
