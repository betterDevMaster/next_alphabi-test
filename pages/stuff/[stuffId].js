import React from 'react'
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'
import Header from '../../components/Header'

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

const StuffPage = () => {
  const AuthUser = useAuthUser()
  const router = useRouter()
  const { stuffId } = router.query
  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Stuff - A dynamic page example</h3>
          <p>You're looking at this stuff: {stuffId}</p>
        </div>
      </div>
    </div>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(StuffPage)
