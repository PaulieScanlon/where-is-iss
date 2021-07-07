import React, { FunctionComponent } from 'react'

import { AppProvider } from '../../context/app-context'

export const PageElement: FunctionComponent = ({ children }) => {
  return <AppProvider>{children}</AppProvider>
}
