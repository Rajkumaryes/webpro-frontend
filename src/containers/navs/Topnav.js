/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState,useEffect } from 'react';
import { injectIntl } from 'react-intl';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {onChangeLanguage} from '../../helper'
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
  setLanguageData,
  setLanguage,
  setUserName,
  setRole,
  setName,
  setProfileImage
} from '../../redux/actions';

import {
  menuHiddenBreakpoint,
  adminRoot,
  imageURL,
  appVersion,
  LiveBuild
} from '../../constants/defaultValues';
import TopnavNotifications from './Topnav.Notifications';
import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import { getDirection, setDirection } from '../../helpers/Utils';
import {logoutAPI} from '../../helpers/authheader';
import{languageService} from '../../redux/language/saga'
import{languagedataService} from '../../redux/languagedata/saga'
import{userService} from '../../redux/users/saga'
import HapagLogo from '../../assets/img/app_image/logo_white.png'
import ProfileImage from '../../assets/img/app_image/profile.png'


const TopNav = ({
  intl,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  locale,
  setLanguageDataAction,
  setLanguageAction,
  setuserNameAction,
  username,
  setRoleAction,
  setNameAction,
  name,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  changeLocaleAction,
  languageData,
  language,
  setProfileImageAction,
  profile_image,
}) => {
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  useEffect(() => {
    fetchLanguage()
    fetchLanguageData()
    if(localStorage.getItem('user_id') !== null)
    {
        let user_id = localStorage.getItem('user_id')
       fetchprofile(user_id)
    }
  }, []);

  const fetchLanguage = () =>
  {
    languageService.fetchlanguageData()
    .then((res) => { 
      if(res.status)
        {
          if(res.data)
          {
            setLanguageAction(res.data.filter((x) => x.status !== 0))
          }
         
        }            
  
      })
      .catch((error) => {});  
  }
  const fetchLanguageData = () =>
  {
    languagedataService.fetchlanguagedata()
    .then((res) => { 
      if(res.status)
        {
          if(res.data)
          {
            var list = []
            for(var i = 0 ;i <res.data.length;i++)
            {
              var dict  = res.data[i]
              let languagedata = {};
              try {
                if (dict.languagedata) {
                  languagedata = JSON.parse(dict.languagedata);
                }
              } catch (e) {
                // If parsing fails, keep an empty object and warn in console
                // This avoids uncaught runtime exceptions when backend returns invalid JSON
                // eslint-disable-next-line no-console
                console.warn('Failed to parse languagedata for language entry', e, dict.languagedata);
                languagedata = {};
              }
              dict.languagedata = languagedata
              list.push(dict)
            }
            setLanguageDataAction(list)
          }
         
        }            
  
      })
      .catch((error) => {});  
  }
  function fetchprofile(user_id)  {
    userService.fetchprofile(user_id)
       .then((res) => {
          if(res.data)
        {
          setuserNameAction(res.data.username,res.data.id)
          setNameAction(res.data.name)
          setRoleAction(res.data.role_id)
          if(res.data.profile_image_path !== null && res.data.profile_image_path !== "")
          {
          
            setProfileImageAction(res.data.profile_image_path)
          }
          
        }
    })
    .catch(error => {
    console.log('ERROR ==>', error)})
 }
  const search = () => {
    // history.push(`${searchPath}?key=${searchKeyword}`);
    history.push('/app/blank-page')
    setSearchKeyword('');
  };



  const handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        search();
        elem.classList.remove('mobile-view');
        removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        addEventsSearch();
      }
    } else {
      search();
    }
    e.stopPropagation();
  };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  const addEventsSearch = () => {
    document.addEventListener('click', handleDocumentClickSearch, true);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };


  const handleLogout = () => {
    console.log('logout');
    logoutAPI()
    localStorage.clear()
    history.push('/user/login')
  };
  
  const gotoProfile = () => {
    history.push(adminRoot + '/profile');
    };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();
    console.log("lkkgl " , JSON.stringify(_clickCount))
    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };
  const handleChangeLocale = (_locale, direction) => {

    console.log("kjjvgh" , JSON.stringify(_locale))
    changeLocaleAction(_locale);

  };


  const { messages } = intl;
  let language_data = language.map(value => {
    return {name:value.name ,id: value.key, direction: 'ltr'}; })
  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>

        {/* <div className="search">
          <span
              className="search-icon"
              onClick={(e) => handleSearchIconClick(e)}
            >
            <i className="simple-icon-magnifier" />
          </span>
          <Input className = "searchplaceholder" style = {{marginLeft:'23px'}}
            placeholder={onChangeLanguage(locale,'Search',languageData) +  "..."}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => handleSearchInputKeyPress(e)}
          />
         
        </div> */}
         <p className="to-small-font" style={{color:'#c8c5c5',marginTop:'12px'}}>Version : {appVersion}</p>
     
      
      </div>
      
         <img src={HapagLogo} alt="thumbnail"  style = {{width :'160px',height:'32px',marginTop:'8px'}}/>
         


      <div className="navbar-right">
          <TopnavNotifications  />
        {/* {isDarkSwitchActive && <TopnavDarkSwitch />}
        <div className="header-icons d-inline-block align-middle">
          <TopnavEasyAccess />
          
          <button
            className="header-icon btn btn-empty d-none d-sm-inline-block"
            type="button"
            id="fullScreenButton"
            onClick={toggleFullScreen}
          >
            {isInFullScreen ? (
              <i className="simple-icon-size-actual d-block" />
            ) : (
              <i className="simple-icon-size-fullscreen d-block" />
            )}
          </button>
        </div> */}
          <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{locale.toUpperCase()}</span>
            </DropdownToggle>
            {language_data.length > 0 &&
            <DropdownMenu className="mt-3" right>
              {language_data.map((l) => {
                return (
                  <DropdownItem
                    onClick={() => handleChangeLocale(l.id, l.direction)}
                    key={l.id}
                  >
                    {l.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          }
          </UncontrolledDropdown>
        </div>
     
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1" style = {{color:'white'}}>{name}</span>
              {/* <span>
              {(profile_image && profile_image !== null && profile_image !== '')  ?
                <img alt="Profile" src={imageURL+profile_image}   />:
                <img alt="Profile" src={ProfileImage} />
                }
              </span> */}
              <span>
                <img 
                  alt="Profile" 
                  src={profile_image ? imageURL + profile_image : ProfileImage} 
                  onError={(e) => e.target.src = ProfileImage} 
                />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <DropdownItem onClick={() => gotoProfile()}>{onChangeLanguage(locale,'Profile',languageData)} </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleLogout()}>
              {onChangeLanguage(locale,'Sign Out',languageData)} 
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale ,languageData,language,username,name,profile_image } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    languageData,
    language,
    username,
    name,
    profile_image
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    changeLocaleAction: changeLocale,
    setLanguageDataAction : setLanguageData,
    setLanguageAction : setLanguage,
    setuserNameAction:setUserName,
    setRoleAction:setRole,
    setNameAction:setName,
    setProfileImageAction:setProfileImage,
  })(TopNav)
);
