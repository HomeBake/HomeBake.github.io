import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Login } from './login'
import { useState } from 'react'
import { GoogleMaps } from './google-maps'
import { PageTemplate } from './page-template'
import { Controls } from './controls'
const queryClient = new QueryClient()

export type TValues = {
  conversion: number[];
  footage: number[];
  revenue: number[];
  receipt: number[];
}



function App() {
  const [authToken, setAuthToken] = useState<string>()
  const [values, setValues] = useState<TValues>({
    conversion: [0,1],
    footage: [100, 400],
    revenue: [100000,1000000],
    receipt: [0, 10000],
  })

  
  return (
    <GoogleOAuthProvider clientId='117965972006-esbtot2qu644pvc67mra8cqlrlpk2n07.apps.googleusercontent.com'>
      <QueryClientProvider client={queryClient}>
        <PageTemplate 
            leftSlot={!authToken ? <Login onSuccess={setAuthToken}/> : <Controls values={values} setValues={setValues}/>}
            rightSlot={authToken ? <GoogleMaps filterValues={values} authToken={authToken}/> : <></>}
          />
        <script async defer src='//maps.googleapis.com/maps/api/js?callback=initMap'></script>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}

export default App