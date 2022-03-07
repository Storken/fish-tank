import React, { createContext, ReactNode, useContext, useState } from 'react'
import Fish from '../components/fish'

type FishContextProps = {
  fishes: JSX.Element[]
  generateFish: () => void
}

type FishProviderProps = {
  children: ReactNode
}

export const FishContext: React.Context<FishContextProps> = createContext<
  FishContextProps
>({} as FishContextProps)

export const FishContextProvider = ({ children }: FishProviderProps) => {
  const [fishes, setFishes] = useState<JSX.Element[]>([])
  const [fishIndex, setFishIndex] = useState(0)

  const generateFish = () => {
    const nextFishId = fishIndex + 1
    const reverse = Math.random() * 10 > 5
    const startY = Math.floor(Math.random() * 90) + 5
    const duration = Math.floor(Math.random() * 10 + 8)

    setFishes([
      ...fishes,
      <Fish
        key={`fish-${nextFishId}`}
        index={nextFishId}
        duration={duration}
        reverse={reverse}
        startY={startY}
      />
    ])

    setFishIndex(nextFishId)
  }

  return (
    <FishContext.Provider
      value={{
        generateFish,
        fishes
      }}
    >
      {children}
    </FishContext.Provider>
  )
}

export default function useFish () {
  const context = useContext(FishContext)

  return context
}
