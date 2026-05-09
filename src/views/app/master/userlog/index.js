import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Table} from 'antd';
import { Button,Input} from 'reactstrap';
import { onChangeLanguage } from '../../../../helper'
import Loading from "react-fullscreen-loading";
import{userService} from '../../../../redux/users/saga';
import moment from 'moment';
import { INDEX_PAGE_SIZE_OPTIONS } from "../../../../constants/defaultValues";

class MasterPage extends Component {
    constructor(props) {
      super(props);
      this.state = {  
        loading:false, 
        data:[],
        username:'',
        page: 1,
        pageSize: 25,
        total: 0,
      };
    }
  
    componentWillMount()
    {
        this.clearvalue();
       
    }
    clearvalue() {

      this.setState({
        page: 1,
        pageSize: 25,
        total: 0,
        username: '',
      })
      this.fetchpagination(1, 25, '')
    }
    fetchpagination(page, per_page, username) {  
      this.setState({
        pageSize: per_page,
        page: page,
        loading:true,
      })
      userService.fetchuserlogpagination(page, per_page, username)
        .then((res) => {  
          this.setState({
            loading : false
          })
          if(res.status)
          {
            if (res.data) {
              this.setState({
                data: res.data,
                total: res.total
              })
            }
  
          } else {
            this.setState({
              data: [],
              pageSize: 25,
              page: 1,
              total: 0
            })
  
          }
    
            
            
      })
      .catch((error) => { 
        this.setState({
          loading : false
        })
        });   
   }
   onSearch() {
    const {username} = this.state
    if(username !== '')
    {
      this.fetchpagination(1, 25, username)
    }
    
  }
   
   paginationOptions = {
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (_, pageSize) => {
      this.setState({
        pageSize: pageSize
      })

    },
    onChange: (page, pageSize) => {
      const { username} = this.state
      this.fetchpagination(page, pageSize, username,)
    },
    pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
    // total: this.state.total  ,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
  };
    render()
    {
        const {match,locale, languageData} = this.props
        const {data,username,loading} = this.state
       
        const columns = [
		
            {
                title: onChangeLanguage(locale, 'User ID', languageData),
                dataIndex: 'user_id',
                key: 'user_id',
                render: (text, record) => (	
                  <div>
                     {text}
                  </div>
              ),
              },
             
                {
                  title: onChangeLanguage(locale, 'Date and Time', languageData),
                  dataIndex: 'created_at',
                  key: 'created_at',
                  render: (text, record) => ( 
                    <div>
                      {text !== null ? moment(text).format('MM/DD/YYYY hh:mm:ss a'):''}
                    </div>
                ),
                },

              {
                title: onChangeLanguage(locale, 'Log', languageData),
                dataIndex: 'logs',
                key: 'logs',
              },
              
              
        ]
        const pagination = {
          ...this.paginationOptions,
          total: this.state.total,
          current: this.state.page,
          pageSize: this.state.pageSize,
        };
        return (
            <>
             {loading &&
              <div>
                <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
              </div>
            }
            <title>User Log</title>
            <Row>
              <Colxx xxs="12">
                <div className = "row">
                    <div className = "col-md-10">
                        <Breadcrumb heading="User Log" match={match} />
                    </div>
                   

                </div>
             
             
              <Separator className = "separator-margin"/>
              </Colxx>
            </Row>
            <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '15px' }}>
              <Row>
                 <div className = "col-md-10 space-margin">
                  <Input className="fontstyle text-background"
                    placeholder={onChangeLanguage(locale, 'User ID', languageData)}
                    value={username}
                    onChange={(e) => this.setState({ username: (e.target.value).toUpperCase() })} />
                </div>
                <div className = "col-md-2 space-margin text-center">
                  <Button className="button-width" color="primary" onClick={() => this.onSearch()}>
                    {onChangeLanguage(locale, 'Search', languageData)}
                  </Button>
                  <Button className="button-width" color="secondary"  onClick={() => this.clearvalue()} style={{ margin: '0px 2px' }}>
                    {onChangeLanguage(locale, 'Reset', languageData)}
                  </Button>
                </div>
              </Row>
            </div>
            
            <Table
              dataSource={data}
              columns={columns}
              pagination={pagination}
              rowKey={record => record.id}
              rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
              onChange={this.handleTableChange}

            />
			

        </>
        )
    }

}

const mapStateToProps = ({ settings }) => {
  const { locale, languageData } = settings;
  return { locale, languageData };
};
export default injectIntl(
  connect(mapStateToProps, {

  })(MasterPage)
);

