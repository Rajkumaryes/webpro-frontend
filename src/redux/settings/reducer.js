import { CHANGE_LOCALE,CHANGE_LANGUAGE_DATA,GET_LANGUAGE,
  CHANGE_USERNAME,CHANGE_PROFILE_IMAGE,CHANGE_ROLE,CHANGE_NAME,GET_ROLE_PERMISSION} from '../actions';
import { getCurrentLanguage,getCurrentRole_id,getCurrentUsername } from '../../helpers/Utils';

const INIT_STATE = {
  locale: getCurrentLanguage(),
  languageData: [],
  language: [],
  username :getCurrentUsername(),
  profile_image:'',
  name:'',
  role :getCurrentRole_id(),
  role_permission_data:[],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload };
    case CHANGE_LANGUAGE_DATA:
        return { ...state, languageData: action.payload  };
    case GET_LANGUAGE:
        return { ...state, language: action.payload  };
    case CHANGE_USERNAME:
      return { ...state, username: action.payload  };
    case CHANGE_NAME:
        return { ...state, name: action.payload  };
    case CHANGE_PROFILE_IMAGE:
        return { ...state, profile_image: action.payload  };
    case CHANGE_ROLE:
          return { ...state, role: action.payload  };
    case GET_ROLE_PERMISSION:
      return { ...state, role_permission_data: action.payload  };
    default:
      return { ...state };
  }
};
