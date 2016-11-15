/**
 * Hello Sift Sift. Frontend view entry point.
 */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

export default class MyView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
	this.controller.subscribe('name', this.onHello.bind(this));
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftview
  presentView(value) {
    console.log('hello-sift: presentView: ', value);
	document.getElementById("name").textContent =  value.data.name;
	document.getElementById("hook-uri").textContent =  value.data.hook_uri;
  };

  willPresentView(value) {
    console.log('hello-sift: willPresentView: ', value);
  };
  
  onHello(data) {
    console.log('tutorial-sift: onHello: ', data);
    Object.keys(data).forEach((k) => {
      document.getElementById(k).textContent = data[k];
    });
  }

}

registerSiftView(new MyView(window));
