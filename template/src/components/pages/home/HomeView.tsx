import { useConfigContext, useLangContext, useNotification,useModalContext } from "@aabdelmonaem/core-lib";
import styles from './home.module.css';


const HomeView = () => {
    const {getConfig} = useConfigContext();
    const notification = useNotification();
    const handleShow = (variant:any) => {
		notification.show({
			message: 'This is a sample Notification content displayed',
			variant,
		});
	};
    const [showModal, hideModal] = useModalContext(() => (
        <div role="dialog" className="modal">
          <p>This is a modal window</p>
          <button onClick={hideModal}>Close</button>
        </div>
      ));
      return (
        <div className='App'>
    
          <h3>useNotification hook</h3>
          <div className='card'>
            <button className='button' onClick={() => handleShow('error')}>
              Show Error
            </button>
            <button
              className='button'
              onClick={() => handleShow('success')}
            >
              Show Success
            </button>
            <button className='button' onClick={() => handleShow('info')}>
              Show Info
            </button>
          </div>
          <h3>useModalContext hook</h3>
          <button onClick={showModal}>Show modal</button>
        </div>
      );
};

export default HomeView;