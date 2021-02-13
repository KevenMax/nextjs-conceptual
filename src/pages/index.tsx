import { useEffect, useState } from 'react'
import * as Styled from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetch('http://localhost:3002/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data)
      })
    })
  }, [])
  return (
      <Styled.Section>
        <Styled.Title>Hello World!</Styled.Title>

        <Styled.List>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <Styled.Item key={recommendedProduct.id}>
                {recommendedProduct.title}
              </Styled.Item>
            )
          })}
        </Styled.List>
      </Styled.Section>
  )
}
