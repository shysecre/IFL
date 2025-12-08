import React from 'react'
import ReactDOM from 'react-dom/client'
import appIcon from '@/resources/build/icon.png'
import { ErrorBoundary } from '@/app/components/ErrorBoundary'
import { WindowContextProvider, menuItems } from '@/app/components/window'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { App } from '@/app'
import { HashRouter } from 'react-router'
import { PlaylistsProvider } from '@/app/providers/PlaylistProvider'
import { SettingsProvider } from '@/app/providers/SettingsProvider'

const main = async () => {
  ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <HashRouter>
          <SettingsProvider>
            <PlaylistsProvider>
              <AuthProvider>
                <WindowContextProvider titlebar={{ title: 'IFL', icon: appIcon, menuItems }}>
                  <App />
                </WindowContextProvider>
              </AuthProvider>
            </PlaylistsProvider>
          </SettingsProvider>
        </HashRouter>
      </ErrorBoundary>
    </React.StrictMode>
  )
}

main().catch(console.error)
