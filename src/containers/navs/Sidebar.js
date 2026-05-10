import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
// React 18's createRoot lives in 'react-dom/client', but findDOMNode is exported from the legacy entry.
// Use the legacy entry here because this component relies on findDOMNode().
// No need for react-dom here after refactor; using a ref instead of findDOMNode
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {onChangeLanguage} from '../../helper'
import{roleService} from '../../redux/role/saga'

import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
  changeSelectedBreadcrumbMenu,
  setRolePermission,
} from '../../redux/actions';

import sideMenuItems from './menu';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: '',
      collapsedMenus: [],
      menuItems:[]
    };
    // ref for the sidebar container to replace findDOMNode usage
    this.containerRef = React.createRef();
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    
    this.fetchrole_permissionData()
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener('resize', this.handleWindowResize);
  }
  fetchrole_permissionData() {  

    roleService.fetchrolepermissionData()
      .then((res) => { 
      
        if(res.status === true)
          {
            if(res.data)
            {
              localStorage.setItem("menuData", JSON.stringify(res.data));
              this.props.setRolePermission(res.data);
              this.setMenuItem(res.data)
            }
            
          }            
    
    })
    .catch((error) => { 
     });   
 }
 setMenuItem(data)
 {
   if(data)
   {
     var role_id = localStorage.getItem('role_id')
     if(role_id !== null)
     {
        var list = [],menudata=[]
        for(var i = 0; i<data.length;i++)
        {
             var subs = [],children = data[i].children,value = {key:data[i].key}
             if(data[i].role_id.includes(parseInt(role_id)))
             {
                for(var j = 0; j<children.length;j++)
                {
                  if(children[j].role_id.includes(parseInt(role_id)))
                  {
                    subs.push(children[j])
                  }
                }
                value.subs = subs
                list.push(value)
             }
        }

        var path = "" , isget_path = false
        for(i = 0; i<list.length;i++)
        {
              for(j = 0; j<sideMenuItems.length;j++)
              {
                  value = {...sideMenuItems[j]}
                  value.subs = []
                  if(list[i].key  === sideMenuItems[j].key)
                  {
                    var subs_arr = this.getmenuItem(list[i].subs,sideMenuItems[j].subs)
                    value.subs = subs_arr
                    if(isget_path === false && subs_arr.length > 0)
                    {
                      isget_path = true
                      path = subs_arr[0].to
                    }
                    menudata.push(value)
                  }
              }
        }
        // console.log("kjbkjv " , JSON.stringify(menudata))
        this.setState({
          menuItems:menudata
        })
        if(path !== "")
        {
          localStorage.setItem('mainpath',path);
        }

        this.setSelectedLiActive(this.setHasSubItemStatus);
        

     }
   }

 }

 getmenuItem(data,sideMenuItems,index)
 {
  
    var subs = [] 
     for(var i = 0; i<data.length;i++)
    {
          for(var j = 0; j<sideMenuItems.length;j++)
          {
              if(data[i].key  === sideMenuItems[j].key)
              {
                subs.push(sideMenuItems[j])
              }
          }
    }

    return subs
 }

  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      this.props.selectedMenuHasSubItems
    );
  };

  handleDocumentClick = (e) => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.setState({
      viewingParentMenu: '',
    });
    this.toggle();
  };

  getMenuClassesForResize = (classes) => {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(' ').filter((x) => x !== '');
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden');
      }
    }
    return nextClasses;
  };

  getContainer = () => {
    return this.containerRef.current;
  };

  toggle = () => {
    const hasSubItems = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubItems);
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter((x) => x !== '')
      : '';
    let clickIndex = -1;

    if (!hasSubItems) {
      if (
        currentClasses.includes('menu-default') &&
        (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1;
      } else if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0;
      } else if (
        currentClasses.includes('menu-hidden') ||
        currentClasses.includes('menu-mobile')
      ) {
        clickIndex = 0;
      }
    } else if (
      currentClasses.includes('menu-sub-hidden') &&
      menuClickCount === 3
    ) {
      clickIndex = 2;
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      clickIndex = 0;
    }
    if (clickIndex >= 0) {
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      );
    }
  };

  handleProps = () => {
    this.addEvents();
  };

  addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };

  removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  setSelectedLiActive = (callback) => {
    const {menuItems} = this.state
    const oldli = document.querySelector('.sub-menu  li.active');
    if (oldli != null) {
      oldli.classList.remove('active');
    }

    const oldliSub = document.querySelector('.third-level-menu  li.active');
    if (oldliSub != null) {
      oldliSub.classList.remove('active');
    }

    /* set selected parent menu */
    const selectedSublink = document.querySelector(
      '.third-level-menu  a.active'
    );
    if (selectedSublink != null) {
      selectedSublink.parentElement.classList.add('active');
    }

    const selectedlink = document.querySelector('.sub-menu  a.active');
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add('active');
      this.setState(
        {
          selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
            'data-parent'
          ),
        },
        callback
      );
    } else {
      const selectedParentNoSubItem = document.querySelector(
        '.main-menu  li a.active'
      );
      if (selectedParentNoSubItem != null) {
        this.setState(
          {
            selectedParentMenu: selectedParentNoSubItem.getAttribute(
              'data-flag'
            ),
          },
          callback
        );
      } else if (this.state.selectedParentMenu === '') {
        this.setState(
          {
            selectedParentMenu:menuItems.length > 0 ? menuItems[0].key : '',
          },
          callback
        );
      }
    }
    
  };

  setHasSubItemStatus = () => {
    const hasSubmenu = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubmenu);
    this.toggle();
  };

  getIsHasSubItem = () => {
    const { selectedParentMenu,menuItems } = this.state;
    const menuItem = menuItems.find((x) => x.key === selectedParentMenu);
    if (menuItem)
      return !!(menuItem && menuItem.subs && menuItem.subs.length > 0);
    return false;
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive(this.setHasSubItemStatus);
      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  

  openSubMenu = (e, menuItem) => {
    const selectedParent = menuItem.key;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    this.props.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.setState({
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent,
      });
      this.toggle();
    } else {
      e.preventDefault();

      const { containerClassnames, menuClickCount } = this.props;

      console.log("ljkbkjh containerClassnames " , containerClassnames)
      console.log("ljkbkjh menuClickCount " , menuClickCount)
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        this.props.addContainerClassname(
          'sub-show-temporary',
          containerClassnames
        );
      }
      this.setState({
        viewingParentMenu: selectedParent,
      });
    }
    this.props.changeSelectedBreadcrumbMenu('')
  };

  toggleMenuCollapse = (e, menuKey) => {
    e.preventDefault();
    const { collapsedMenus } = this.state;
    if (collapsedMenus.indexOf(menuKey) > -1) {
      this.setState({
        collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
      });
    } else {
      collapsedMenus.push(menuKey);
      this.setState({
        collapsedMenus,
      });
    }
    return false;
  };

  filteredList = (menuItems, string) => {
    const { currentUser: { role } } = this.props;
    return menuItems.filter(x => (x.roles && x.roles.includes(role)) || !x.roles)

  }

  render() {


    const {
      selectedParentMenu,
      viewingParentMenu,
      collapsedMenus,
      menuItems
    } = this.state;
    const {locale,languageData,menu_path} = this.props
    return (
      <div className="sidebar" ref={this.containerRef}>
        <div className="main-menu" >
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {menuItems &&
                  this.filteredList(menuItems, "menuitems469").map((item) => {
                    return (
                      <NavItem
                        key={item.key}
                        className={classnames({
                          active:
                            (selectedParentMenu === item.key &&
                              viewingParentMenu === '') ||
                            viewingParentMenu === item.key,
                        })}
                      >
                        {item.newWindow ? (
                          <a
                            href={item.to}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className={item.icon} />{' '}
                            {onChangeLanguage(locale,`${item.label}`,languageData)} 
                          </a>
                        ) : (
                            <NavLink
                              to={item.to}
                              onClick={(e) => this.openSubMenu(e, item)}
                              data-flag={item.key}
                            >
                              <i className={item.icon} />{' '}
                              {onChangeLanguage(locale,`${item.label}`,languageData)} 
                            </NavLink>
                          )}
                      </NavItem>
                    );
                  })}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {menuItems &&
                this.filteredList(menuItems, "menuitems513").map((item) => {
                  return (
                    <Nav
                      key={item.key}
                      className={classnames({
                        'd-block':
                         ( (this.state.selectedParentMenu === item.key &&
                            this.state.viewingParentMenu === '') ||
                          this.state.viewingParentMenu === item.key || menu_path === item.to),
                      })}
                      data-parent={item.key}
                    >
                      {item.subs &&
                        this.filteredList(item.subs, "item.subs").map((sub, index) => {
                          return (
                            <NavItem
                              key={`${item.key}_${index}`}
                              className={`${
                                sub.subs && sub.subs.length > 0
                                  ? 'has-sub-item'
                                  : ''
                                }`}
                            >
                              {sub.newWindow ? (
                                <a
                                  href={sub.to}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <Row>
                                    <Colxx xxs="1">
                                     <i className={sub.icon} />
                                    </Colxx>
                                    <Colxx xxs="10">
                                    {onChangeLanguage(locale,`${sub.label}`,languageData)} 
                                    </Colxx>
                                  </Row>
                                 
                                 
                                </a>
                              ) : sub.subs && sub.subs.length > 0 ? (
                                <>
                                  <NavLink
                                    className={`rotate-arrow-icon opacity-50 ${
                                      collapsedMenus.indexOf(
                                        `${item.key}_${index}`
                                      ) !== -1
                                        ? ''
                                        : 'collapsed'
                                      }`}
                                    to={sub.to}
                                    id={`${item.key}_${index}`}
                                    onClick={(e) =>
                                      this.toggleMenuCollapse(
                                        e,
                                        `${item.key}_${index}`
                                      )
                                    }
                                  >
                                      <Row>
                                          <Colxx xxs="1">
                                          <i className="simple-icon-arrow-down" />
                                          </Colxx>
                                          <Colxx xxs="10">
                                            <span style = {{fontSize:'14px',fontWeight:600}}>{onChangeLanguage(locale,`${sub.label}`,languageData)}</span>
                                          </Colxx>
                                        </Row>
                                   
                                  </NavLink>

                                  <Collapse
                                    isOpen={
                                      collapsedMenus.indexOf(
                                        `${item.key}_${index}`
                                      ) !== -1
                                    }
                                  >
                                    <Nav 
                                    
                                    className="third-level-menu">
                                      {this.filteredList(sub.subs, "subs.subs").map((thirdSub, thirdIndex) => {
                                        return (
                                          <NavItem
                                            key={`${item.key}_${index}_${thirdIndex}`} >
                                            {thirdSub.newWindow ? (
                                              <a
                                              href={thirdSub.to}
                                              rel="noopener noreferrer"
                                              target="_blank">
                                              {onChangeLanguage(locale,`${thirdSub.label}`,languageData)}
                                               <Row>
                                               <Colxx xxs="1">
                                               <i className={thirdSub.icon} />
                                               </Colxx>
                                               <Colxx xxs="10">
                                               </Colxx>
                                             </Row>
                                              </a>
                                            ) : (
                                                <NavLink 
                                                to={thirdSub.to}>
                                                  <Row>
                                                    <Colxx xxs="1">
                                                    <i className={thirdSub.icon} />
                                                    </Colxx>
                                                    <Colxx xxs="10">
                                                    {onChangeLanguage(locale,`${thirdSub.label}`,languageData)}
                                                    </Colxx>
                                                  </Row>
                                                </NavLink>
                                              )}
                                          </NavItem>
                                        );
                                      })}
                                    </Nav>
                                  </Collapse>
                                </>
                              ) : (
                                    <NavLink to={sub.to}>
                                       <Row>
                                          <Colxx xxs="1">
                                           <i className={sub.icon} />
                                          </Colxx>
                                          <Colxx xxs="10">
                                          {onChangeLanguage(locale,`${sub.label}`,languageData)}
                                          </Colxx>
                                      </Row>
                                    </NavLink>
                                  )}
                            </NavItem>
                          );
                        })}
                    </Nav>
                  );
                })}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu, authUser,settings }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
    menu_path
  } = menu;
  const { locale ,languageData,language,role} = settings;
  const { currentUser } = authUser;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
    currentUser,
    role,
    locale ,languageData,language,
    menu_path
  };
};
export default withRouter(
  connect(mapStateToProps, {
    setContainerClassnames,
    addContainerClassname,
    changeDefaultClassnames,
    changeSelectedMenuHasSubItems,
    changeSelectedBreadcrumbMenu,
    setRolePermission,
  })(Sidebar)
);
