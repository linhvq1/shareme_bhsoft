import React from 'react'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '../client'

function Login() {

  // const responseGoogle = (response)=>{
  //     localStorage.setItem('user', JSON.stringify(response.profileObj))

  //     const {name, googleID, imageUrl} = response.profileObj

  //     const doc = {
  //       _id: googleID,
  //       _type: 'user',
  //       userName: name,
  //       image: imageUrl,
        
  //     }
  // }
  const navigate = useNavigate()

  function handleCallbackResponse(response) {

    let userObject = jwt_decode(response.credential)
    console.log(userObject)

    localStorage.setItem('user', JSON.stringify(userObject))

    const {name, picture, jti} = userObject

    const doc = {
      _id: jti,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc)
      .then(()=>{
        navigate('/',{replace: true})
      })
  }

  React.useEffect(()=>{
    /* global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signIdDiv"),
      {theme: "outline", size:  "large"},
    )
  },[])

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay

          className='w-full h-full object-cover'
        />
      </div>

      <div className='absolute flex flex-col justify-center items-center top-0 left-0 bottom-0 right-0 bg-blackOverlay'>
        <div className='p-5'>
          <img src={logo} width="130px" alt='logo'/>
        </div>

        <div className='shadow-2xl' id='signIdDiv'>
          {/* <GoogleLogin 
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`} // dung id google cua minh de dang nhap nay
            render={(renderProps)=>(
              <button
                type='button'
                className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                onClick={renderProps.onClick}  // xu li thong tin dang nhap
                disabled={renderProps.disabled} // disabled 
              >
                <FcGoogle className='mr-4'/> Sign in with Google
              </button>
            )}

            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Login