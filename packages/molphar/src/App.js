import './index.css'
import {useState, useEffect} from 'react'
import {supabase} from './utils/supabaseClient'
import Auth from './Auth'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {EditorLayout} from "./editor/EditorLayout";


export default function App() {
  const [session, setSession] = useState(null);


  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Auth session={session}/>}/>
        <Route path="/app" element={<EditorLayout session={session}/>}/>
      </Routes>
    </Router>
  )
}
