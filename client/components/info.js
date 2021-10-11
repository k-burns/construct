import React from 'react'

const Info = () => {
  return (
    <div className='info-container'>
      <h1 className='info-title'>Welcome to Construct-A-Duck!</h1>
      <div className = 'info-contents'>
      <h3 className='info-about-title'>Why A 3-D Duck?</h3>
      <p className='info-p'>
        Rubber ducks are known for their great listening skills. They are
        especially skilled at software engineering and solving bugs in code.
        Create and save little 3D friends to read your code to. You'll be amazed
        about how great a helper they can be!
      </p>
      <h5 className='info-subtitle'>
        More Information about rubber duck debugging
      </h5>
      <a href='https://rubberduckdebugging.com/' target='_blank'>
        rubberduckdebugging.com
      </a>
      <h5 className='info-subtitle'>
        Want a physical little buddy to talk to? Here are some sites we
        recommend!
      </h5>
      <div className='ducksite-container'>
        <a href='https://www.whattheduckky.com' target='_blank'>
          Help a couple by getting your friend from their dream store!
        </a>
        <h6>OR</h6>
        <a href='https://ducksinthewindow.com/' target='_blank'>
          Choose from a huge selection of friends!
        </a>
      </div>
      </div>
    </div>
  )
}

export default Info
