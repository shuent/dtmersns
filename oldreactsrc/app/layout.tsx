import { NavBar } from './navbar'
import Provider from './provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
