import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (animationFn, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && animationFn) {
      const ctx = gsap.context(() => {
        animationFn(elementRef.current);
      }, elementRef);

      return () => ctx.revert();
    }
  }, dependencies);

  return elementRef;
};

export const useScrollTrigger = (animationFn, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && animationFn) {
      const ctx = gsap.context(() => {
        animationFn(elementRef.current);
      }, elementRef);

      return () => ctx.revert();
    }
  }, dependencies);

  return elementRef;
};

export const useTimeline = (animationFn, dependencies = []) => {
  const elementRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && animationFn) {
      timelineRef.current = gsap.timeline();
      const ctx = gsap.context(() => {
        animationFn(elementRef.current, timelineRef.current);
      }, elementRef);

      return () => {
        timelineRef.current?.kill();
        ctx.revert();
      };
    }
  }, dependencies);

  return { elementRef, timeline: timelineRef.current };
};

