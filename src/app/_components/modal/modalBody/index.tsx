'use client';

import { MouseEvent, TouchEvent, useRef, useState } from 'react';
import { usePreventScroll } from '@hooks';
import { ModalBodyProps } from '@types';
import { Portal } from '@components';

import styled from './styles.module.scss';

export function ModalBody({ children, hideModal }: ModalBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startCursorPosition = useRef<number>(0);
  const startDrag = useRef<boolean>(false);
  const [movingCursorPosition, setMovingCursorPosition] = useState<number>(0);

  usePreventScroll();

  const handleDragStart = (event: MouseEvent<HTMLButtonElement>) => {
    startDrag.current = true;
    startCursorPosition.current = event.pageX;
  };

  const handleDragMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (!startDrag.current) return;

    const deltaX = event.pageX - startCursorPosition.current;
    if (deltaX >= 0) return;

    setMovingCursorPosition(deltaX);
  };

  const handleDragEnd = () => {
    if (!startDrag.current) return;

    if (Math.abs(movingCursorPosition) > 150 && containerRef.current) {
      containerRef.current.dispatchEvent(new Event('click', { bubbles: true }));
    }

    setMovingCursorPosition(0);
    startDrag.current = false;
  };

  const handleTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    startCursorPosition.current = event.targetTouches[0].pageX;
  };

  const handleTouchMove = (event: TouchEvent<HTMLButtonElement>) => {
    const deltaX = event.targetTouches[0].pageX - startCursorPosition.current;
    if (deltaX >= 0) return;

    setMovingCursorPosition(deltaX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(movingCursorPosition) > 150 && containerRef.current) {
      containerRef.current.dispatchEvent(new Event('click', { bubbles: true }));
    }

    setMovingCursorPosition(0);
  };

  const prevent = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Portal>
      <div
        className={styled.modal_wrapper}
        ref={containerRef}
        onClick={hideModal}>
        <div
          className={styled.modal}
          style={{
            transform: `translateX(${movingCursorPosition}px)`,
          }}
          onClick={prevent}>
          <button
            className={styled.modal_left_btn}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onClick={hideModal}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <div />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
}
