import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'
import type { ReactNode } from 'react'

import mainStyle from '~/styles/main.css'
import MainNavigation from './components/MainNavigation'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: mainStyle },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

export function Head({ title }: { title?: string }) {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
      {title && <title>{title}</title>}
    </head>
  )
}

function Document({
  title,
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <html lang="en">
      <Head title={title} />
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <MainNavigation />
      <Outlet />
    </Document>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`Error | ${error.status}`}>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </Document>
    )
  } else if (error instanceof Error) {
    return (
      <Document title="Error">
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </Document>
    )
  } else {
    return (
      <Document title="Error">
        <h1>Unknown Error</h1>
      </Document>
    )
  }
}
