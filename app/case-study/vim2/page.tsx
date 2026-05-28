import { redirect } from 'next/navigation'

// Old URL — permanently redirect to canonical /case-study/vim7
export default function VIM2Redirect() {
  redirect('/case-study/vim7')
}
