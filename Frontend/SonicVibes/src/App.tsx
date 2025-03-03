import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Button } from './components/ui/button'
const App = () => {
  return (
    <div>
      <header>
    <SignedOut>
      <SignInButton>
        <Button variant={"outline"}>Sign in</Button>
      </SignInButton>
    </SignedOut>

    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
    </div>
  )
}

export default App