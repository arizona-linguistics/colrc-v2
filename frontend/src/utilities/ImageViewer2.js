import React, { Component } from 'react';
import Lightbox from 'react-images';
import theme from 'react-images';
 
class ImageViewer2 extends Component {
  constructor() {
    super();
    this.state = {
    	lightboxIsOpen: true
     };
  }	
  render() {
    return (
      <Lightbox
        images={[{ src: 'http://lorempixel.com/1000/600/nature/3/' }, { src: 'http://lorempixel.com/1000/600/nature/2/' }]}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
    );
  }
}
export default ImageViewer2;