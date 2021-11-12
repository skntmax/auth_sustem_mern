import axios from 'axios'
import React,{useEffect} from 'react'
import { useHistory } from 'react-router'
export default function Logout() {
   let history =useHistory()
    useEffect(() => {
    try{
    console.log("logout ")

        axios.get('/logout').then(res=>{
             if(res.data.success==1) {
                  history.push('/')
             }
        }).catch(err=>{
             alert(err)
        }) 

    }catch(err){
        alert(err)
    }


   }, [])

    return (
        <>
            
        </>
    )
}
