import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const SplitText = ({
  text = '',
  className = '',
  delay = 30,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'words',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  textAlign = 'left',
  tag: Tag = 'span',
  onLetterAnimationComplete,
  ...props
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  const items = splitType === 'chars' ? text.split('') : text.split(' ');

  useGSAP(
    () => {
      if (!isVisible || !containerRef.current) return;

      const elements = containerRef.current.querySelectorAll('.split-item');
      gsap.fromTo(
        elements,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            if (onLetterAnimationComplete) onLetterAnimationComplete();
          },
        }
      );
    },
    { dependencies: [isVisible, text, delay, duration, ease, splitType], scope: containerRef }
  );

  return (
    <Tag
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ textAlign }}
      {...props}
    >
      {items.map((item, idx) => (
        <span
          key={idx}
          className="split-item inline-block whitespace-pre"
          style={{ willChange: 'transform, opacity' }}
        >
          {item}{splitType === 'words' && idx < items.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
