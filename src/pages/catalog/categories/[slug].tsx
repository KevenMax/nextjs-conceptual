import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

interface ICategory {
  id: string;
  title: string;
}

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Product({products}: CategoryProps) {
  const router = useRouter()

  if(router.isFallback){
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              {product.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3002/categories`)
  const categories: ICategory[] = await response.json()

  const paths = categories.map((category: ICategory) => {
    return {
      params: { slug: category.id }
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3002/products?category_id=${slug}`)
  const products: IProduct[] = await response.json()

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}