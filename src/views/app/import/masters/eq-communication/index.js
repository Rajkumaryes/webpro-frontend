import React, { Component } from 'react';
import { Row } from 'reactstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Label, Input, Button } from 'reactstrap';
import { createNotification } from '../../../../../toast';
import { onChangeLanguage } from '../../../../../helper'
import { eqmasterService } from '../../../../../redux/imports/eqmaster/saga'
import Loading from "react-fullscreen-loading";
class RegisterUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      eq: '',
      loading: false
    };
  }

  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    this.setState({
      loading: true
    })
    eqmasterService.fetcheqmaster()
      .then((res) => {
        this.setState({
          loading: false

        })
        if (res.status === true) {
          if (res.data) {
            if (res.data.length > 0) {
              this.setState({
                name: res.data[0].name,
                eq: res.data[0].eq,
              })
            }
          }
        }
        else {
          this.setState({
            name: '',
            eq: ''
          })
        }

      })
      .catch((error) => {
        this.setState({
          loading: false
        })
      });
  }

  onSubmit() {
    const { eq } = this.state;

    if (eq !== "") {
      this.setState({
        loading: true
      })
      eqmasterService.updateeqAPI(eq)
        .then((res) => {
          this.setState({
            loading: false
          })
          if (res.status) {
            createNotification('Updated', 'success', 'filled')
          }
          else {
            createNotification(res.message, 'error', 'filled')
          }

        })
        .catch((error) => {
          this.setState({
            loading: false
          })
        });

    }
    else {
      createNotification('Please fill mandatory field', 'error', 'filled')
    }

  }

  render() {

    const { name, eq, loading } = this.state
    const { locale, languageData, match } = this.props
    return (
      <div>
        <title> {onChangeLanguage(locale, 'EQ Master', languageData)}</title>
        {loading &&
          <div>
            <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
          </div>
        }
        <Row>
          <Colxx xxs="12">
            <div className="row">
              <div className="col-md-10">
                <Breadcrumb heading={onChangeLanguage(locale, 'EQ Master', languageData)} match={match} />
              </div>
              <div className="col-md-2">
                <Button color="secondary" className="fontstyle button-width" onClick={() => this.onSubmit()}>
                  {onChangeLanguage(locale, 'Submit', languageData)}
                </Button>
              </div>
            </div>
            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="4" className="mb-4">
            <Label> {onChangeLanguage(locale, 'Name', languageData)}</Label>
          </Colxx>

          <Colxx xxs="8" className="mb-4">
            <Input
              type="text"
              disabled={true}
              placeholder={onChangeLanguage(locale, 'Name', languageData)}
              value={name} ></Input>
          </Colxx>

        </Row>
        <Row>
          <Colxx xxs="4" className="mb-4">
            <Label> {onChangeLanguage(locale, 'Eq', languageData)}<a style={{ color: 'red' }}>*</a></Label>
          </Colxx>

          <Colxx xxs="8" className="mb-4">
            <Input
              type="number"
              placeholder={onChangeLanguage(locale, 'Eq', languageData)}
              value={eq}
              onChange={(e) => this.setState({ eq: e.target.value })} ></Input>
          </Colxx>

        </Row>


      </div>
    );
  }
}


const mapStateToProps = ({ settings }) => {
  const { locale, languageData } = settings;
  return { locale, languageData };
};
export default injectIntl(
  connect(mapStateToProps, {

  })(RegisterUser)
);

