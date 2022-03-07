import styled from 'styled-components'

const FishBubble = styled.div.attrs(({ y, x }: { y: number; x: number }) => ({
  style: {
    top: `${y}%`,
    left: `${x}px`
  }
}))`
  position: absolute;
  height: 4px;
  width: 4px;
  background-color: white;
  animation: up 1.5s linear forwards;

  @keyframes up {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-200px);
      opacity: 0;
    }
  }
`

type BubbleProps = {
  startY: number
  startX: number
}

const Bubble: React.FC<BubbleProps> = ({ startY, startX }) => {
  return (
    <FishBubble
      // @ts-ignore
      y={startY}
      // @ts-ignore
      x={startX}
    />
  )
}

export default Bubble
