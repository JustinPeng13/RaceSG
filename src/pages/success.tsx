import { store } from '@/lib/store'
import { sgidClient } from '@/lib/sgidClient'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { GetServerSideProps } from "next";



export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionId = context.req.cookies.sessionId

  // Pass sessionId to the page as a prop
  return {
    props: {
      sessionId,
    },
  }
}

interface RedirectProps {
  searchParams: { [key: string]: string | undefined }
  sessionId: string | undefined
}

const getAndStoreUserInfo = async (code: string, sessionId: string) => {
  const session = store.get(sessionId)

  if (!session) {
    throw new Error('Session not found')
  }

  const { nonce, codeVerifier } = session

  if (!codeVerifier) {
    throw new Error('Code verifier not found')
  }

  // Exchange auth code for access token
  const { accessToken, sub } = await sgidClient.callback({
    code,
    nonce,
    codeVerifier,
  })

  // Request user info with access token
  const { data } = await sgidClient.userinfo({
    accessToken,
    sub,
  })

  // Store userInfo and sgID in memory
  const updatedSession = {
    ...session,
    userInfo: data,
    sub,
  }
  store.set(sessionId, updatedSession)

  return updatedSession
}

export default async function Redirect({ searchParams, sessionId }: RedirectProps) {
  // Auth code is retrieved from the URL search params
  const code = searchParams?.code
  if (!code) {
    throw new Error(
      'Authorization code is not present in the url search params',
    )
  } else if (!sessionId) {
    throw new Error("Session ID not found in browser's cookies")
  }

  const { state, userInfo, sub } = await getAndStoreUserInfo(code, sessionId)

  // HTML page is generated in the server
  return (
    <div>
      <div>Logged in successfully!</div>

      {sub ? <div>{`sgID: ${sub}`}</div> : null}
      {Object.entries(userInfo ?? {}).map(([field, value]) => (
        <div>{`${field}: ${value}`}</div>
      ))}
      {state ? <div>{`Favourite ice cream flavour: ${state}`}</div> : null}

      <Link href="/user-info">View user info</Link>
    </div>
  )
}