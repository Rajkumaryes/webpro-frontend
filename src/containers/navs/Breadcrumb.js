/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IntlMessages from '../../helpers/IntlMessages';
import { adminRoot } from '../../constants/defaultValues';
import {Title_data} from './breadscrumtitle'
import {setContainerClassnames,changeSelectedBreadcrumbMenu} from '../../redux/actions';
import {getValue} from '../../helper'
import {onChangeLanguage} from '../../helper'

const getMenuTitle = (sub) => 
{
  if('/'+sub===adminRoot) 
  {
    return "Home"
  }
  else
  {
    return getValue(Title_data,'foldername','title',sub)
  }
  
};

const getUrl = (path, sub, index) => {
  return path.split(sub)[0] + sub;
};

const BreadcrumbContainer = ({ heading, match,
  setContainerClassnamesAction,selectedMenuHasSubItems,changeSelectedBreadcrumbMenuAction }) => {
  return (
    <>
      {heading && (
        <h1 style = {{marginTop:'7px'}}>
          {heading}
        </h1>
      )}
      <BreadcrumbItems match={match} 
      selectedMenuHasSubItems = {selectedMenuHasSubItems}
      changeSelectedBreadcrumbMenuAction= {changeSelectedBreadcrumbMenuAction}
      setContainerClassnamesAction = {setContainerClassnamesAction} />
    </>
  );
};

const BreadcrumbItems = ({ match,setContainerClassnamesAction,changeSelectedBreadcrumbMenuAction }) => {
  const path = match.path.substr(1);
  let paths = path.split('/');
  if (paths[paths.length - 1].indexOf(':') > -1) {
    paths = paths.filter((x) => x.indexOf(':') === -1);
  }
  paths = paths.filter((item, index) => index !== 0)
  const menuButtonClick = (e,url) => {
    if(!url.includes('dashboard'))
    {
      e.preventDefault();
        setTimeout(() => {
          const event = document.createEvent('HTMLEvents');
          event.initEvent('resize', false, false);
          window.dispatchEvent(event);
        }, 350);

        changeSelectedBreadcrumbMenuAction(url)
        setContainerClassnamesAction(
          3,
          'menu-sub-hidden sub-show-temporary',
          true
        );
    }
  
  };
  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => {
          return (
            <BreadcrumbItem key={index} active={index === 0}>
              {index === 0 ? (
                  <span  style = {{color:'black',cursor:'pointer'}} onClick = {(e)=>menuButtonClick(e,`/${getUrl(path, sub, index)}`)}>
                    {!sub.includes('dashboard') ? getMenuTitle(sub) : ''}
                  </span>
              ) : (
                getMenuTitle(sub)
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};
const mapStateToProps = ({ menu }) => {
  const { selectedMenuHasSubItems } = menu;
  return {selectedMenuHasSubItems};
};
export default withRouter(
  connect(mapStateToProps, {
  setContainerClassnamesAction: setContainerClassnames,
  changeSelectedBreadcrumbMenuAction:changeSelectedBreadcrumbMenu
  })(BreadcrumbContainer)
);

// export default BreadcrumbContainer;
