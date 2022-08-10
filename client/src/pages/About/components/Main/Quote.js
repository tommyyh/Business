import React from 'react';
import MainCSS from './m.module.scss';

const Quote = (
  {widthSize, heightSize, title, par, img, 
  titleMargin, contMargin, parWidth, infoWidth,
  topMargin}) => {
  const QuoteStyling = {
    width: widthSize,
    height: heightSize,
    marginTop: topMargin,
  };
  return (
    <div className={MainCSS.Quote} style={QuoteStyling} >
      <img src={img} alt="" style={{width: widthSize}}/>
      <h2 className={MainCSS.quote_header} style={{marginLeft: titleMargin}}>{title}</h2>

      <div className={MainCSS.quote_lower} style={{marginLeft: contMargin}}>
        <p className={MainCSS.quote_par} style={{width: parWidth}}>{par}</p> 
        <div className={MainCSS.quote_identity_cont} style={{width: infoWidth}}>
          <div className={MainCSS.quote_icon}></div>
          <div className={MainCSS.quote_identity}>
            <h4>Bilal uddin</h4>
            <p>CEO of Colo</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quote