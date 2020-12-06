
import React from 'react'

import { Carousel } from 'antd';




const contentStyle = {
    width:'400px',
    height: '400px',
    // color: '#fff',
    // lineHeight: '160px',
    // textAlign: 'center',
    // background: "red",
  };
  
  const imgStyle = {
    width:'400px',
    height: '400px',
  }

function Detail(){
    return (
        <div className='qf-lunbo'>
        <Carousel autoplay>
            <div className='qf-img'>
               <h3 style={contentStyle} >
                    
                   <img src={'/images/02.jpg'} style={imgStyle}/>
               </h3>
            </div>
            <div>
               <h3 style={contentStyle} >
              
                    <img src={'/images/03.png'} style={imgStyle}/>
               </h3>
            </div>
            <div>
               <h3 style={contentStyle} >
              
                   <img src={'/images/04.png'} style={imgStyle}/>   
               </h3>
            </div>
            <div>
                <h3 style={contentStyle} >
              
                   <img src={'/images/06.png'} style={imgStyle}/>
                </h3>
            </div>
      </Carousel>
      </div>
    )
}


  export default Detail