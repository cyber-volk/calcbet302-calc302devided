'use client'

import { useSpring, config } from '@react-spring/web'

export const useSlideAnimation = (direction: 'left' | 'right' | 'up' | 'down' = 'right') => {
  const getTransform = () => {
    switch (direction) {
      case 'left':
        return 'translateX(-100%)'
      case 'right':
        return 'translateX(100%)'
      case 'up':
        return 'translateY(-100%)'
      case 'down':
        return 'translateY(100%)'
    }
  }

  return useSpring({
    from: { opacity: 0, transform: getTransform() },
    to: { opacity: 1, transform: 'translate(0%)' },
    config: config.gentle
  })
}

export const useFadeAnimation = (delay: number = 0) => {
  return useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay,
    config: config.molasses
  })
}

export const useScaleAnimation = (scale: number = 0.95) => {
  return useSpring({
    from: { opacity: 0, transform: `scale(${scale})` },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.wobbly
  })
}

export const useShakeAnimation = () => {
  return useSpring({
    from: { x: 0 },
    to: async (next) => {
      await next({ x: -5 })
      await next({ x: 5 })
      await next({ x: -3 })
      await next({ x: 3 })
      await next({ x: 0 })
    },
    config: { tension: 300, friction: 10 }
  })
}

export const useRotateAnimation = (degrees: number = 360) => {
  return useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: `rotate(${degrees}deg)` },
    config: config.slow
  })
}

export const useFlipAnimation = () => {
  return useSpring({
    from: { transform: 'perspective(600px) rotateX(0deg)' },
    to: { transform: 'perspective(600px) rotateX(360deg)' },
    config: config.slow
  })
}

export const usePulseAnimation = () => {
  return useSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'scale(1.05)' })
        await next({ transform: 'scale(1)' })
      }
    },
    config: config.gentle
  })
}
