import React, {useState} from 'react'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { supabase } from '../supabaseClient'

function Nav({session, setSession}) {
  
    const loginSubmit = async ()=>{
        const { data } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
            console.log(data.user.id)
            if(data){
                setSession(data)
            }            
    }
    


    const logoutSubmit = async ()=>{
        const { error } = await supabase.auth.signOut()
        console.log(error)
       setSession(null);
    }
    if (session != null){
        return (
            <>
              <Toolbar sx={{ borderBottom: 1, borderColor: 'divider',marginBottom:10 }}>
              
                <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="center"
                  noWrap
                  sx={{ flex: 1 }}
                >
                  Kennected Test
                </Typography>
                
                <Button variant="outlined" size="small" onClick={()=>logoutSubmit()}>
                  Log Out
                </Button>
              </Toolbar>
              
            </>
          );
    }
    else {
    return ( 
        <>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            Kennected TW
          </Typography>
          <IconButton>
           
          </IconButton>
          <Button variant="outlined" size="small" onClick={()=>loginSubmit()}>
            Log In
          </Button>
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
        >
        </Toolbar>
      </>
)
    }

  

}

export default Nav;