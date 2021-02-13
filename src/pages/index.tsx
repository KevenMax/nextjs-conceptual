import { GetServerSideProps } from 'next'

import SEO from '@/components/SEO'
import * as Styled from '@/styles/pages/Home'
interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

function Home({recommendedProducts}: HomeProps) {  
  const handleSum = async () => {
    const {sum} = (await import('@/lib/math')).default
    alert(sum(3,5));
  }

  return (
    <div>
      <SEO title='DevCommerce, your best e-commerce!' shouldExcludeTitleSufixx  image='boost.png'/>   
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

    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`)
  const recommendedProducts: IProduct[] = await response.json()

  return {
    props: {
      recommendedProducts,
    }
  }
}