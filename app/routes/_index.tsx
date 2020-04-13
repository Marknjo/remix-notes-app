import type { LinksFunction, V2_MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import homeStyles from '~/styles/home.css'

export const meta: V2_MetaFunction = () => [
  {
    name: 'description',
    content: 'A notes app',
  },
  {
    title: 'Notes Pad',
  },
]

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your notes</h1>
      <p>Try our early beta and never loose track of your notes again!</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  )
}

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: homeStyles,
  },
]
