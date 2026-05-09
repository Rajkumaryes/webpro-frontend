import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import { createNotification } from '../../../../../toast';
import { onChangeLanguage } from '../../../../../helper';
import { customdateService } from '../../../../../redux/productivty/customdate/saga';

class MasterPage extends Component {
  state = {
    loading: false,
    approveDateEnabled: false,
    howManyDays: '',
    isSubmitting: false,
    validationError: ''
  };

  componentDidMount() {
    this.fetchData();
  }

fetchData() {
    this.setState({ loading: true });

    customdateService.approvedatefetchapi()
        .then((res) => {
            console.log("API Response:", res.data);
            this.setState({ loading: false });

           if (res.status && Array.isArray(res.data) && res.data.length > 0) {
                const firstRecord = res.data[0];

                this.setState({
                    recordId: firstRecord.id, // store id
                    approveDateEnabled: !!firstRecord.approvedate,
                    howManyDays: firstRecord.approvedays ? String(firstRecord.approvedays) : ''
                });
            } else {
                this.setState({
                    recordId: null, // no existing row
                    approveDateEnabled: false,
                    howManyDays: ''
                });
            }

        })
        .catch((error) => {
            this.setState({ loading: false });
            console.error('Fetch error:', error);
        });
}




  /** Unified Create/Update API */
saveCustomDateConfig = (enabled, approvedays) => {
    const { recordId } = this.state;
    this.setState({ isSubmitting: true });

    // Call update if id exists, otherwise create
    const savePromise = recordId
        ? customdateService.approvedateupdateapi(recordId, enabled, approvedays) // backend update
        : customdateService.approvedatecreateapi(enabled, approvedays);          // backend create

    savePromise
        .then((res) => {
            this.setState({ isSubmitting: false });
            if (res.status) {
                createNotification('Configuration saved', 'success', 'filled');
                this.fetchData(); // refresh after save
            } else {
                createNotification(res.message || 'Save failed', 'error', 'filled');
            }
        })
        .catch(() => {
            this.setState({ isSubmitting: false });
            createNotification('Error saving configuration', 'error', 'filled');
        });
};


handleApproveDateToggle = (checked) => {
    const { howManyDays, recordId } = this.state;

    this.setState({
        approveDateEnabled: checked,
        howManyDays: checked ? howManyDays : '',
        validationError: ''
    });

    if (!checked && recordId) {
        // Delete the row
        customdateService.approvedateupdateapi(recordId, false, 0)
            .then((res) => {
                if (res.status) {
                    createNotification('Configuration removed', 'success', 'filled');
                    this.fetchData(); // reload
                } else {
                    createNotification(res.message || 'Delete failed', 'error', 'filled');
                }
            })
            .catch(() => {
                createNotification('Error deleting configuration', 'error', 'filled');
            });
    }
};


  handleDaysInputChange = (e) => {
    const value = e.target.value;
    let validationError = '';

    if (value && !/^\d*$/.test(value)) {
      validationError = 'Only numbers allowed';
      this.setState({ validationError });
      return;
    }

    if (value && (parseInt(value) < 1 || parseInt(value) > 365)) {
      validationError = 'Enter value between 1-365 days';
    }

    this.setState({ howManyDays: value, validationError });
  };

  handleSaveConfiguration = () => {
    const { howManyDays, validationError, approveDateEnabled } = this.state;

    if (!approveDateEnabled) {
      createNotification('Please enable Approve Date first', 'error', 'filled');
      return;
    }
    if (validationError) {
      createNotification(validationError, 'error', 'filled');
      return;
    }
    if (!howManyDays || parseInt(howManyDays) <= 0) {
      createNotification('Please enter number of days', 'error', 'filled');
      return;
    }

    this.saveCustomDateConfig(true, parseInt(howManyDays));
  };

  handleDaysKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSaveConfiguration();
    }
  };

  renderCustomDateSection() {
    const { approveDateEnabled, howManyDays, validationError, isSubmitting, locale, languageData } = this.state;

    return (
      <div style={{
        padding: '24px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#121C50', marginBottom: '8px', fontSize: '20px', fontWeight: '600' }}>
            {onChangeLanguage(locale, 'Approve Date Configuration', languageData)}
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            {onChangeLanguage(locale, 'Enable toggle, enter days and click Save to configure', languageData)}
          </p>
        </div>

        {/* Toggle + Input + Save */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: approveDateEnabled ? '1fr 280px 120px' : '1fr',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            backgroundColor: approveDateEnabled ? '#fef7f0' : '#f8fafc',
            border: `2px solid ${approveDateEnabled ? 'green' : '#e2e8f0'}`,
            borderRadius: '10px'
          }}>
            <div>
              <Label style={{
                fontWeight: '600',
                color: approveDateEnabled ? '#121C50' : '#64748b',
                fontSize: '16px',
                marginBottom: '6px',
                display: 'block'
              }}>
                {onChangeLanguage(locale, 'Enable Approve Date', languageData)}
              </Label>
              <div style={{
                color: approveDateEnabled ? 'green' : '#94a3b8',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {approveDateEnabled ? 'Approve date is active' : 'Click to enable approve date'}
              </div>
            </div>
            <Switch
              checked={approveDateEnabled}
              onChange={this.handleApproveDateToggle}
              disabled={isSubmitting}
              style={{ backgroundColor: approveDateEnabled ? 'green' : undefined }}
            />
          </div>

          {/* Days Input */}
          {approveDateEnabled && (
            <div style={{ position: 'relative' }}>
              <Input
                type="text"
                placeholder="Enter days (1-365)"
                value={howManyDays}
                onChange={this.handleDaysInputChange}
                onKeyPress={this.handleDaysKeyPress}
                disabled={isSubmitting}
                style={{
                  height: '60px',
                  border: validationError ? '2px solid #ef4444' : '2px solid #d1d5db',
                  borderRadius: '10px',
                  fontSize: '15px',
                  padding: '0 20px'
                }}
              />
              {validationError && (
                <div style={{ position: 'absolute', top: '100%', left: '0', color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {validationError}
                </div>
              )}
            </div>
          )}

          {/* Save Button */}
          {approveDateEnabled && (
            <Button
              onClick={this.handleSaveConfiguration}
              disabled={!howManyDays || validationError || isSubmitting}
              style={{
                height: '60px',
                backgroundColor: howManyDays && !validationError ? '#121C50' : '#94a3b8',
                borderColor: howManyDays && !validationError ? '#121C50' : '#94a3b8',
                color: 'white',
                fontWeight: '600',
                fontSize: '15px',
                borderRadius: '10px'
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          )}
        </div>

        {/* Quick Select */}
        {approveDateEnabled && (
          <div style={{ marginBottom: '0' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              padding: '20px 24px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #e2e8f0'
            }}>
              <Label style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                Quick Select:
              </Label>
              {['7', '30', '90', '180'].map(days => (
                <Button
                  key={days}
                  size="sm"
                  outline
                  onClick={() => this.setState({ howManyDays: days, validationError: '' })}
                  disabled={isSubmitting}
                  style={{
                    borderColor: howManyDays === days ? '#EF6432' : '#cbd5e1',
                    color: howManyDays === days ? '#EF6432' : '#64748b',
                    backgroundColor: howManyDays === days ? '#fef7f0' : 'transparent',
                    fontSize: '13px',
                    fontWeight: '600',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '2px solid'
                  }}
                >
                  {days} Days
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { locale, languageData, match } = this.props;

    return (
      <>
        <title>{onChangeLanguage(locale, 'Approve Date', languageData)}</title>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading={onChangeLanguage(locale, 'Approve Date', languageData)} match={match} />
            <Separator className="separator-margin" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            {this.renderCustomDateSection()}
          </Colxx>
        </Row>
      </>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return {
    currentUser,
    locale: 'en',
    languageData: {}
  };
};

export default withRouter(connect(mapStateToProps, {})(MasterPage));
