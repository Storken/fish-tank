import { createRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { sleep } from '../utils/sleep'
import Bubble from './bubble'

const FishContainer = styled.div.attrs(
  ({ startPosition }: { startPosition: number }) => ({
    style: {
      top: `${startPosition}%`
    }
  })
)`
  position: absolute;
  width: 100%;
`

const PixelFish = styled.img.attrs(
  ({ duration, reverse }: { duration: number; reverse: boolean }) => ({
    style: {
      left: `${reverse ? '-60px' : '100vw'}`,
      animation: `${reverse ? 'ltr' : 'rtl'} ${duration}s forwards`
    }
  })
)`
  position: absolute;

  @keyframes ltr {
    0% {
      transform: translateX(0) scaleX(-1);
    }
    100% {
      transform: translateX(130vw) scaleX(-1);
    }
  }

  @keyframes rtl {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-130vw);
    }
  }
`

type FishProps = {
  duration: number
  reverse: boolean
  startY: number
  index: number
}

const Fish: React.FC<FishProps> = ({ duration, reverse, startY, index }) => {
  const [bubbles, setBubbles] = useState<JSX.Element[]>([])
  const [bubbleIndex, setBubbleIndex] = useState(0)
  const fishRef = createRef()
  const [tick, setTick] = useState(0)
  const [isDead, setIsDead] = useState(false)

  const updateTick = async () => {
    await sleep(Math.random() + 0.5)
    setTick((tick + 1) % 3)
  }

  useEffect(() => {
    if (!isDead) {
      generateFishBubble()
      updateTick()
    }
  }, [tick])

  const removeSelf = async () => {
    await sleep(duration)
    setIsDead(true)
  }

  useEffect(() => {
    removeSelf()
  }, [])

  const generateFishBubble = async () => {
    const rect = (fishRef.current as HTMLImageElement).getBoundingClientRect()

    let x = Math.floor(rect.x)
    if (reverse) x += rect.width

    setBubbles([
      ...bubbles,
      <Bubble
        key={`fish-${index}-bubble-${bubbleIndex}`}
        startY={startY}
        startX={x}
      />
    ])

    setBubbleIndex(bubbleIndex + 1)
  }

  if (isDead) return null

  return (
    <FishContainer
      //@ts-ignore
      startPosition={startY}
    >
      <PixelFish
        height='40'
        src='/assets/pixel-fish.svg'
        // @ts-ignore
        duration={duration}
        // @ts-ignore
        reverse={reverse}
        // @ts-ignore
        ref={fishRef}
      />
      {bubbles.map(bubble => bubble)}
    </FishContainer>
  )
}

export default Fish
