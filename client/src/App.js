import React from "react";
import "./App.css";
import Nav from './components/Navbar'
import Display  from "./components/Display";
import { useState, useEffect } from "react";
import { supabase } from './supabaseClient';

function App() {
  const [session, setSession] = useState(null); 
  useEffect(() => {
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    
  }, [])

  return (
    <>
      <Nav session={session} setSession={setSession}/>
      <Display session={session} setSession={setSession}></Display>
    </>
  );
}

export default App;