import { GetServerSideProps } from 'next'
import Link from 'next/link'
import SEO from '@/components/SEO'
import * as Styled from '@/styles/pages/Home'
import { client } from '@/lib/prismic'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'

interface HomeProps {
  recommendedProducts: Document[];
}

function Home({recommendedProducts}: HomeProps) {  

  return (
    <div>
      <SEO title='DevCommerce, your best e-commerce!' shouldExcludeTitleSufixx  image='boost.png'/>   
      <Styled.Section>
        <Styled.Title>Hello World!</Styled.Title>

        <Styled.List>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <Styled.Item key={recommendedProduct.id}>
                <Link href={`catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                    
                  </a>
                </Link>
              </Styled.Item>
            )
          })}
        </Styled.List>
        
      </Styled.Section>

    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
}