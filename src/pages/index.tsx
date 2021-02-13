import { GetServerSideProps } from 'next'
import * as Styled from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({recommendedProducts}: HomeProps) {  
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3002/recommended')
  const recommendedProducts = await response.json()

  return {
    props: {
      recommendedProducts,
    }
  }
}