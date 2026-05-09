import React, { Component } from "react";
import { Row, Button, Input, Label, Card, CardBody } from "reactstrap";
import Select from "react-select";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Colxx, Separator } from '../../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../../containers/navs/Breadcrumb';
import { createNotification } from '../../../../../toast';
import { onChangeLanguage } from '../../../../../helper';
import{userService} from '../../../../../redux/users/saga'
import { caseallocationsService } from '../../../../../redux/bookingamendment/caseallocations/saga'

class UserAllocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      number_of_count: "",
      selectedUsers: [],
      user_data : [],
    };
  }

  componentDidMount()
  {
    this.fetchUserData();
  }
  fetchUserData() {
    const { username } = this.props;
    this.setState({ loading: true });
    userService.fetchuser_underTlManager(username)
      .then((res) => {
        this.setState({ loading: false });
        if (res.status && Array.isArray(res.users)) {
          // Map API response to react-select format: { value, label }
          const userOptions = res.users.map(item => ({
            value: item.user,
            label: `${item.name} (${item.user})`
          }));
          this.setState(
            { user_data: userOptions },
            () => this.fetchAllocatedUsers() // <-- call here
          );
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }
  fetchAllocatedUsers = () => {
    caseallocationsService.fetchallocatedusers()
      .then((res) => {
        if (res.status && Array.isArray(res.data) && res.data.length > 0) {
          const { user_data } = this.state;
          const record = res.data[0];
          // Split the comma-separated string into an array
          const allocatedUserIds = record.allocated_users
            ? record.allocated_users.split(',').map(u => u.trim()).filter(Boolean)
            : [];
          // Map user IDs to option objects for react-select
          const selectedUsers = user_data.filter(opt =>
            allocatedUserIds.includes(opt.value)
          );
          this.setState({
            selectedUsers,
            number_of_count: record.case_count || ""
          });
        }
      })
      .catch(() => {
        // handle error if needed
      });
  };

  handleNumberOfCountChange = (e) => {
    this.setState({ number_of_count: e.target.value });
  };

  handleUserChange = (selectedUsers) => {
    this.setState({ selectedUsers });
  };

  handleSubmit = () => {
    const { number_of_count, selectedUsers } = this.state;
    let usersToSubmit = selectedUsers;
    if (!Array.isArray(usersToSubmit)) {
      usersToSubmit = [usersToSubmit];
    }
    // Map to value (user id) and filter out empty
    usersToSubmit = usersToSubmit
      .map(u => (u && typeof u === "object" ? u.value : u))
      .filter(u => !!u && String(u).trim() !== "");

    console.log("usersToSubmit", usersToSubmit); // ["ADMIN", "SUBRARJ"]

    if (!number_of_count) {
      createNotification('Please enter Number of Count.', 'error', 'filled');
      return;
    }
    if (!usersToSubmit.length) {
      createNotification('Please select at least one user.', 'error', 'filled');
      return;
    }
    const usersAsString = usersToSubmit.join(",");
    this.setState({ loading: true });
    caseallocationsService.createallocatedusers(
      number_of_count,
      usersAsString // This will be ["ADMIN", "SUBRARJ"]
    )
      .then((res) => {
          this.setState({ loading: false });
          if (res.status) {
            this.setState({
              number_of_count: "",
              selectedUsers: [],
            });
            createNotification('Submitted successfully!', 'success', 'filled');
            this.fetchAllocatedUsers()
          } else {
            createNotification(res.message || 'Submission failed.', 'error', 'filled');
          }
        })

      .catch((error) => {
        this.setState({ loading: false });
        createNotification('Submission failed.', 'error', 'filled');
      });
  };

  render() {
    const { locale, languageData, match } = this.props;
    const { number_of_count, selectedUsers, user_data } = this.state;
    return (
      <>
      <style>{`
        .ua-center-wrap {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ua-card {
          max-width: 520px;
          width: 100%;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 32px 24px;
          background: #fff;
          margin: 40px auto;
        }
        .ua-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .ua-label {
          font-weight: bold;
          margin-bottom: 8px;
        }
        .ua-input, .ua-select .react-select__control {
          border-radius: 8px !important;
          font-size: 16px;
          background: #f6f8fa !important;
          border: 1px solid #e0e0e0 !important;
          min-height: 44px;
          padding: 10px 14px;
        }
        .ua-select .react-select__control {
          min-height: 44px !important;
          box-shadow: none !important;
        }
        .ua-select .react-select__menu {
          border-radius: 8px !important;
          font-size: 16px !important;
        }
        .ua-submit-btn {
          border-radius: 24px;
          padding: 10px 36px;
          font-size: 16px;
          font-weight: 600;
          background: #ff6a2b;
          border: none;
          box-shadow: 0 2px 8px rgba(255,106,43,0.08);
        }
        @media (max-width: 600px) {
          .ua-card {
            padding: 18px 6px;
          }
          .ua-submit-btn {
            width: 100%;
            padding: 10px 0;
          }
        }
      `}</style>
      <title>{onChangeLanguage(locale, 'User Allocation', languageData)}</title>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading={onChangeLanguage(locale, 'User Allocation', languageData)} match={match} />
          <Separator className="separator-margin" />
          <div className="ua-center-wrap">
            <Card className="ua-card">
              <CardBody>
                <div className="ua-form-grid">
                  <div>
                    <Label className="ua-label">
                      Number of Count <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      type="number"
                      min={1}
                      value={number_of_count}
                      onChange={this.handleNumberOfCountChange}
                      placeholder="Enter Number of Count"
                      className="ua-input"
                    />
                  </div>
                  <div>
                    <Label className="ua-label">
                      User Name (Multi Select) <span style={{ color: "red" }}>*</span>
                    </Label>
                    <div className="ua-select">
                      <Select
                        isMulti
                        options={user_data}
                        value={selectedUsers}
                        onChange={this.handleUserChange}
                        classNamePrefix="react-select"
                        placeholder="Select Users"
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      className="ua-submit-btn"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Colxx>
      </Row>
    </>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, languageData, username } = settings;
  return { locale, languageData, username };
};
export default withRouter(
  connect(mapStateToProps, {})(UserAllocation)
);