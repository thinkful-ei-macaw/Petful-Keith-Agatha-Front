import React, { Component } from "react";
import './info.css'

export default class Info extends Component {
  render(){
    return(
      <>
        <div className='howStuffWorks'>
          <h3 className='howTo'>How To Use Petful</h3>
          <img src='https://sterlingshelter-animalshelterinc.netdna-ssl.com/wp-content/uploads/2017/09/adoption.jpg' alt='adopt today!' />
          <h4>Here is how you use Petful</h4>
          <p className='description'>You head over to the Adopt page and type your name in.  You will have to 
            wait your turn, because it is first come first served.  This is also how 
            it works for the pets; you may only adopt the pet that has been here the 
            longest.
          </p>
        </div>
      </>
    )
}
}