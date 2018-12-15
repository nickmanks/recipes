import ReactDOM from 'react-dom';

/**
 * Wraps `ReactDOM.createPortal` as a component to allow easier testing
 * with enzyme and provide more consistent component coding style.
 *
 * usage:
 * ```javascript
 *  export class MyComponent extends React.Component {
 *    render() {
 *      return (
 *        <Portal elem={this.elem}>
 *          <Dialog />
 *        </Portal>
 *      )
 *    }
 *  }
 * ```
 *
 * Enzyme does not support portals. Using a compomnent to wrap the protal API
 * allows easy comparision of shallow renders and also does not get in the way
 * of full mounts.
 * The portal class can also be easyly mocked using `jest.fn(()=> ()=> null)`
 * without affecting the shallow render behaviour.
 */
const Portal = ({elem, children})=> ReactDOM.createPortal(children, elem);

export default Portal;
