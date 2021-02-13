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
  const handleSum = async () => {
    const {sum} = (await import('../lib/math')).default
    alert(sum(3,5));
  }

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
        <button onClick={handleSum}>Sum!</button>
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