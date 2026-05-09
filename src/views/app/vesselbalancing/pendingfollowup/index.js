import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { onChangeLanguage, convertLocalToUTCDate, getValue } from '../../../../helper'
import Select from 'react-select';
import moment from 'moment';
import { emailhandlingService } from '../../../../redux/bookingprocess/emailhandling/saga'
import { createNotification } from '../../../../toast';
import { activityService } from '../../../../redux/vesselbalancing/activity/saga'
import { statusofcaseService } from '../../../../redux/vesselbalancing/statusofcase/saga';
import Workbook from 'react-excel-workbook'
import * as clipboard from 'clipboard-polyfill/text'
import { Table, Checkbox } from 'antd';
import{regionService} from '../../../../redux/vesselbalancing/region/saga'
import{areaService} from '../../../../redux/vesselbalancing/area/saga'
import{subareaService} from '../../../../redux/vesselbalancing/subarea/saga'
import Loading from "react-fullscreen-loading";
import { vesselbalancingService } from '../../../../redux/vesselbalancing/vesselbalancing/saga';
import { pendingfollowupService } from '../../../../redux/vesselbalancing/pendingfollowup/saga';
import { pendingtypeService } from '../../../../redux/vesselbalancing/pendingtype/saga';
import { sub } from 'date-fns';

class PendingFollowUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            start_time: new Date(),
            end_time: '',
            updated_start_time: new Date(),
            region: '',
            area: '',
            sub_area: '',
            case_number_subject: '',
            status: '',
            pending_type: '',
            number_instance: '',
            pendifollowupcount: '',
            pendifollowupcountlast: '',
            regiondata: [],
            areadata: [],
            teamdata: [],
            pendingtypedata: [],
            is_submit: false,
            is_search: false,
            case_email_subject: '',
            activity_level: '',
            pending_type: '',
            loading: false,
        };
    }
    componentDidMount() {
        this.fetchregion()
        this.fetcharea()
        this.fetchteam()
        this.fetchpendingtype()
    }
    clearValue() {
        this.setState({
            user_id: '',
            start_time: moment(new Date()).format('MM/DD/YYYY hh:mm:ss a'),
            end_time: '',
            region: '',
            area: '',
            sub_area: '',
            case_number_subject: '',
            status: '',
            pending_type: '',
            number_instance: '',
            is_submit: false,
            is_search: false,
            case_email_subject: '',
            activity_level: '',
        })

    }
    fetchpendingtype() {
        this.setState({
            loading: true
        })
        pendingtypeService.fetchpendingtype()
            .then((res) => {
                this.setState({
                    loading: false
                })
                if (res.status) {
                    let filterstatus = res.data
                    var regionlist = filterstatus.map(function (cusmaidid) {
                        return { label: cusmaidid.name, value: cusmaidid.id.toString() };
                    });
                    this.setState({
                        pendingtypedata: regionlist,
                    })
                }
            })
            .catch((error) => { this.setState({ loading: false }) });
    }
    fetchregion() {
        regionService.fetchregion()
            .then((res) => {
                if (res.status) {
                    // let filterstatus = (res.data).filter(item => item.status === 1)
                    let filterstatus = res.data
                    var regionlist = filterstatus.map(function (cusmaidid) {
                        return { label: cusmaidid.region, text: cusmaidid.region, value: cusmaidid.id.toString() };
                    });
                    this.setState({
                        regiondata: regionlist,
                    })
                }
                else {
                    this.setState({ loading: false })
                }
            })
            .catch((error) => { });
    }
    fetcharea() {
        areaService.fetcharea()
            .then((res) => {
                if (res.status) {
                    // let filterstatus = (res.data).filter(item => item.status === 1)
                    let filterstatus = res.data
                    var regionlist = filterstatus.map(function (cusmaidid) {
                        return {
                            label: cusmaidid.name,
                            value: cusmaidid.id.toString(), region: cusmaidid.region
                        };
                    });
                    this.setState({
                        areadata: regionlist,
                    })
                }
                else {
                    this.setState({ loading: false })
                }
            })
            .catch((error) => { });
    }

    fetchteam() {
        this.setState({ loading: true })
        subareaService.fetchsubarea()
            .then((res) => {
                this.setState({ loading: false })
                if (res.status) {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var regionlist = filterstatus.map(function (cusmaidid) {
                        return {
                            label: (cusmaidid.name),
                            value: cusmaidid.name, area: cusmaidid.area, country_code: cusmaidid.country_code,
                            region: cusmaidid.region, geo_code: cusmaidid.country_code
                        };
                    });
                    this.setState({
                        team_data: regionlist,
                    })
                }
            })
            .catch((error) => { this.setState({ loading: false }) });
    }
    getArrayValue(array, value, key) {
        var list = []
        if (array && array !== null && value !== '' && value !== null) {
            list = array.filter(item => item[key] === value)
        }
        return list
    }
    handlechangeregion = (selectedOptions) => {
        const { areadata } = this.state;
        console.log("areadata",areadata)
        // Filter areas where area.region matches selected region ID
        const filteredAreas = areadata.filter(item => item.region === selectedOptions.value);
        this.setState({
            region: selectedOptions.value,
            areadata: filteredAreas,
            filteredAreas: filteredAreas, // store filtered list
            sub_area: '',
            area: ''
        });
    };

    handlechangearea = (selectedOptions) => {
        const { team_data } = this.state

        const filteredTeams = team_data.filter(item => item.area === selectedOptions.value);
        this.setState({
            area: selectedOptions.value,
            teamdata: filteredTeams, sub_area: ''
        })
    }
    handlechangeteam = (selectedOptions) => {
        const { areadata, regiondata, team_data, pendingtypedata } = this.state
        let areaname = getValue(team_data,'value','area',selectedOptions.value)
        let regionname = getValue(team_data,'value','region',selectedOptions.value)
         let filteredAuditTypes = (pendingtypedata || []).filter(
            option => option.region === regionValue
        );
        this.setState({
            sub_area: selectedOptions.value,
            area:areaname,
            region:regionname,
            pendingtypedata: filteredAuditTypes
        })
    }
    onSubmit() {
        const { region, area, sub_area, case_email_subject, activity_level, pending_type, number_instance, status, start_time } = this.state

        if (region !== '' && area !== '' && sub_area !== '' && case_email_subject !== '' && activity_level !== '' && pending_type !== '' && number_instance !== '' && status !== '') {
            const end_time = moment(new Date()).format('hh:mm:ss a');
            let end_date = convertLocalToUTCDate(new Date()),
                start_date = convertLocalToUTCDate(updated_start_time),
                updatedstarttime = convertLocalToUTCDate(updated_start_time),
                updated_end_time = convertLocalToUTCDate(new Date())
            pendingfollowupService.creatependingfollowup(region, area, sub_area, case_email_subject, activity_level, pending_type, number_instance, status, start_time,
                end_time, updatedstarttime, updated_end_time
            )
                .then((res) => {
                    this.setState({
                        end_time: end_time,
                        loading: false,
                        isSubmitting: false
                    })
                    if (res.status) {
                        createNotification('Created', 'success', 'filled')
                        this.onrefresh()
                        this.fetchBookingCount()
                        //window.location.reload(true);
                    }
                    else {
                        createNotification(res.message, 'error', 'filled');
                    }
                })
                .catch((error) => {
                    this.setState({
                        loading: false,
                        isSubmitting: false
                    })
                });
        } else {
            this.setState({
                is_submit: true,
                isSubmitting: false
            })
            createNotification('Please fill mandatory field', 'error', 'filled')
        }
    }

    render() {
        const { loading, user_id, start_time, end_time, region, area, sub_area, case_number_subject, status, pending_type, number_instance, regiondata, areadata,team_data, teamdata,
            pendifollowupcount, pendifollowupcountlast, is_submit, is_search, case_email_subject, activity_level, pendingtypedata } = this.state
        const { match, locale, languageData, username } = this.props
        const activitydata = [
            { label: 'DP Voyage', value: 'DP Voyage' },
            { label: 'Shipment', value: 'Shipment' },
        ]
        return (
            <>
                <title>{onChangeLanguage(locale, 'Pending Follow-up', languageData)}</title>
                <Row>
                    <Colxx xxs="12">
                        <div className="row">
                            <div className="col-md-8">
                                <Breadcrumb heading={onChangeLanguage(locale, 'Pending Follow-up', languageData)} match={match} />
                            </div>
                            <div className="col-md-2">
                                <h2 style={{ marginTop: '15px' }}>Total EQ : {pendifollowupcount}</h2>
                            </div>
                            <div className="col-md-2">
                                <h2 style={{ marginTop: '15px' }}>Last EQ : {pendifollowupcountlast}</h2>
                            </div>
                        </div>

                        <Separator className="separator-margin" />
                    </Colxx>
                </Row>
                {loading &&
                    <div>
                        <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
                    </div>
                }
                <div>
                    <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '30px' }}>
                        <div className="row">
                            <div className="col-md-3 space-margin"  >
                                <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>{onChangeLanguage(locale, 'user ID', languageData)}</a><br></br>
                                    {username}</Label>
                            </div>
                            <div className="col-md-3 space-margin"  >
                                <Label className="fontstyle normal-font" ><a >{onChangeLanguage(locale, 'Start Date Time', languageData)}</a><br></br>
                                    {moment(start_time).format('MM/DD/YYYY hh:mm:ss a')}
                                </Label>

                            </div>
                            <div className="col-md-3 space-margin"  >
                                <Label className="fontstyle normal-font" ><a >{onChangeLanguage(locale, 'End Date Time', languageData)}</a>
                                    <br></br>
                                    {end_time !== '' && moment(end_time).format('MM/DD/YYYY hh:mm:ss a')}</Label>
                            </div>
                            {/* <div className="col-md-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Region', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                                <Select
                                    className={is_submit === true && region === '' ? "error-border-select" : "react-select fontstyle"}
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    placeholder={onChangeLanguage(locale, 'Region', languageData)}
                                    value={regiondata.filter(option => option.value === region)}
                                    options={regiondata}
                                    isDisabled={is_search === true ? true : false}
                                    onChange={this.handlechangeregion}
                                />
                            </div>
                            <div className="col-md-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Area', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                                <Select
                                    className={is_submit === true && area === '' ? "error-border-select" : "react-select fontstyle"}
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    placeholder={onChangeLanguage(locale, 'Area', languageData)}
                                    value={areadata.filter(option => option.value === area)}
                                    options={areadata}
                                    isDisabled={is_search === true ? true : false}
                                    onChange={this.handlechangearea}
                                />
                            </div> */}
                            <div className="col-md-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Sub Area', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                                <Select
                                    className={is_submit === true && sub_area === '' ? "error-border-select" : "react-select fontstyle"}
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    placeholder={onChangeLanguage(locale, 'Sub Area', languageData)}
                                    value={team_data?.find(option => option.value === sub_area) || null}
                                    options={team_data || []}
                                    isDisabled={is_search === true ? true : false}
                                    onChange={this.handlechangeteam}
                                    // onChange={({ value }) => this.setState({ sub_area: value })}
                                />
                            </div>
                            <div className="col-md-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Case / Email Subject', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                                <Input className={is_submit === true && case_email_subject === '' ? "error-border" : "fontstyle text-background"}
                                    value={case_email_subject}
                                    onChange={(e) => this.setState({ case_email_subject: e.target.value })}
                                />
                            </div>
                            <div className="col-md-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Activity Level', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                                <Select
                                    className={is_submit === true && activity_level === '' ? "error-border-select" : "react-select fontstyle"}
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    placeholder={onChangeLanguage(locale, 'Activity Level', languageData)}
                                    value={activitydata.filter(option => option.value === activity_level)}
                                    options={activitydata}
                                    isDisabled={is_search === true ? true : false}
                                    onChange={({ value }) => this.setState({ activity_level: value })}
                                />
                            </div>
                            <div className="col-md-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Pending Type', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                                <Select
                                    className={is_submit === true && pending_type === '' ? "error-border-select" : "react-select fontstyle"}
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    placeholder={onChangeLanguage(locale, 'Activity Level', languageData)}
                                    value={pendingtypedata.filter(option => option.value === pending_type)}
                                    options={pendingtypedata}
                                    isDisabled={is_search === true ? true : false}
                                    onChange={({ value }) => this.setState({ pending_type: value })}
                                />
                            </div>
                            <div className="col-md-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Number of Instances', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                                <Input className={is_submit === true && number_instance === '' ? "error-border" : "fontstyle text-background"}
                                    value={number_instance}
                                    type="number"
                                    onChange={(e) => this.setState({ number_instance: e.target.value })}
                                />
                            </div>
                            <div className="col-md-3 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Status', languageData)}<a style={{ color: 'red' }}>*</a></Label>
                                <Input className={is_submit === true && status === '' ? "error-border" : "fontstyle text-background"}
                                    value={status}
                                    onChange={(e) => this.setState({ status: e.target.value })}
                                />
                            </div>
                            <div className="row text-center">
                                <Button className="button-width" color="primary"
                                    onClick={() => this.onSubmit()} disabled={this.state.isSubmitting}
                                >
                                    {onChangeLanguage(locale, 'Save', languageData)}
                                </Button>
                                <Button className="button-width"
                                    color="secondary"
                                    onClick={() => this.clearValue()}
                                >
                                    {onChangeLanguage(locale, 'Refresh', languageData)}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}
const mapStateToProps = ({ settings }) => {
    const { locale, languageData, username } = settings;
    return { locale, languageData, username };
};
export default withRouter(
    connect(mapStateToProps, {

    })(PendingFollowUp)
);