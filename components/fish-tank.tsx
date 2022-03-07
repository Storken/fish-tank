import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useFish from '../contexts/fishes'
import { sleep } from '../utils/sleep'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

const FishTank = () => {
  const { generateFish, fishes } = useFish()
  const [tick, setTick] = useState(0)

  const updateTick = async () => {
    await sleep(2)
    setTick((tick + 1) % 3)
  }

  useEffect(() => {
    generateFish()
    updateTick()
  }, [tick])

  return <Container>{fishes.map(element => element)}</Container>
}

export default FishTank
