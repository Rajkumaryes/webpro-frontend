import { NotificationManager } from './components/common/react-notifications';

export const createNotification = (message,type, className) => {
    const cName = className || '',title = '';
    switch (type) {
      case 'primary':
        NotificationManager.primary(
            message,
          title,
          3000,
          null,
          null,
          cName
        ); 
        break;
      case 'secondary':
        NotificationManager.secondary(
            message,
          title,
          3000,
          null,
          null,
          cName
        );
        break;
      case 'info':
        NotificationManager.info(message, title, 3000, null, null, cName);
        break;
      case 'success':
        NotificationManager.success(
            message,
          title,
          // alert('ll'),
          3000,
          null,
          null,
          cName
        );
        break;
      case 'warning':
        NotificationManager.warning(
          message,
          title,
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          message,
          title,
          5000,
          () => {
            // alert('callback');
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };