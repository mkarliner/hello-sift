/**
 * Hello Sift Sift. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this._suHandler = this.onStorageUpdate.bind(this);
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView(state) {
    console.log('hello-sift: loadView', state);
    // Register for storage update events on the "x" bucket so we can update the UI
    this.storage.subscribe(['who'], this._suHandler);
    switch (state.type) {
      case 'email-thread':
        return {
          html: 'email-thread.html',
          data: {}
        };
      case 'summary':
        return {
          html: 'summary.html',
          data: {name: "no-one"} //this.getX()
        };
      default:
        console.error('hello-sift: unknown Sift type: ', state.type);
    }
  }

  // Event: storage update
  onStorageUpdate(value) {
    console.log('hello-sift: onStorageUpdate: ', value);
    return this.getName().then(xe => {
      // Publish events from 'who' to view
	  console.log("OSU: ", xe)
      this.publish('name', xe);
    });
  }

   getName() {
    return this.storage.getAll({
      bucket: 'who',
		keys: ['whoname']
    }).then((values) => {
      console.log('hello-sift: getName returned:', values);
      return {
		  name: values[0].value
      };
    });
  }

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
