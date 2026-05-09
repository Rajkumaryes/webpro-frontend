import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Button, Collapse } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Checkbox,Input } from 'antd';
import CustomRadioButton from '../../../RadioButton'
import moment from 'moment';
import Workbook from 'react-excel-workbook'
// import { teamService } from '../../../../redux/Export/masters/exportteam/saga'
// import { reportService } from '../../../../redux/Export/report/saga'
import { createNotification } from '../../../../toast';
import { onChangeLanguage, getTimeDifference, permittedusers, getValue, convertLocalToUTCDate, getCountryName } from '../../../../helper'
import { IndexingsheetService } from '../../../../redux/testing/inputsheet/saga'
import Loading from "react-fullscreen-loading";
import { roleService } from '../../../../redux/role/saga'
// import { teamsiteService } from '../../../../redux/Export/masters/teamsite/saga';
// import { issuecodeService } from '../../../../redux/Export/masters/issuercode/saga';
import { getValue_D1040, getValue_S8100 } from '../../pasteData'
import * as clipboard from "clipboard-polyfill/text";
import DatePickerDate from "../../datePickerDate";
import { PieChart } from 'react-minimal-pie-chart';
import {CanvasJSChart} from 'canvasjs-react-charts';
import "react-datepicker/dist/react-datepicker.css";
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Sidebar extends Component {
    constructor(props) {
        super(props);
        // this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            loading: false,
            selectedParentMenu: '',
            viewingParentMenu: '',
            collapsedMenus: [],
            errortype: [],
            auditorRemarks: '',
            correctedRemarks: '',
            category: [],
            customtypedata: [],
            end_time: '',
            start_time: new Date(),
            updated_start_time: new Date(),
            time_taken: '',
            shipment_type: '',
            mtd_type: '',
            exception: '',
            mtd_number: '',
            customer: '',
            doc_cutoff: '',
            aggregated_status: '',
            type: '',
            date: '',
            time: '',
            medium: '',
            shipment_no: '',
            bl: '',
            etd: '',
            main_pol: '',
            main_voyage: '',
            main_pod: '',
            issuer: '',
            hbl: '',
            team: '',
            teamdata: [],
            no_of_container: '',
            tat_time: '',
            no_of_cargoitem: '',
            no_of_hbl: '',
            last_pod: '',
            shipper_coder: '',
            mr_code: '',
            auditsheet: false,
            aggregate_status: '',
            read: false,
            draft: false,
            sdc: false,
            free_time: false,
            credit: false,
            collapse: false,
            pod_end: '',
            consignee: '',
            frob_shipment: '',
            is_search: false,
            user_id: '',
            isadmin: false,
            is_submit: false,
            issuecode_data: [],
            data: [],

            origin_requirements: [],
            country_requirements: [],
            customer_requirements: [],
            teamsite_data: [],

        };
    }
    componentDidMount() {

        this.setState({
            start_time: new Date(),

        })
        //this.fetchteam()
        this.fetchroleData()
        // this.fetchIssueCodeData()
        // this.fetchteamsite()


    }

    // handleKeyDown(event) {
    //     let charCode = String.fromCharCode(event.which).toLowerCase();
    //      if(event.ctrlKey && charCode === 's') {
    //       this.onSubmit()
    //       event.preventDefault();
    //       console.log("Ctrl + S pressed");
    //     }
    //     if(event.metaKey && charCode === 's') {
    //       this.onSubmit()
    //       event.preventDefault();
    //       console.log("Cmd + S pressed");
    //     }
    //   }

    fetchInput() {
        this.setState({ loading: true })
        IndexingsheetService.fetchIndexingsheet()
            .then((res) => {
                if (res.status) {
                    this.setState({
                        data: res.data,
                        loading: false
                    })
                }
                else {
                    this.setState({ loading: false })
                }
            })
            .catch((error) => { });
        this.setState({
            loading: false
        })
    }
    fetchIssueCodeData() {
        this.setState({
            loading: true
        })
        issuecodeService.fetchissuecode()
            .then((res) => {
                this.setState({
                    loading: false

                })
                if (res.status) {

                    this.setState({
                        issuecode_data: res.data,

                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }

    fetchroleData() {
        this.setState({
            loading: true
        })
        roleService.fetchroleData()
            .then((res) => {
                this.setState({
                    loading: false

                })
                if (res.status) {
                    var role_id = localStorage.getItem("role_id")
                    let is_admin = permittedusers(res.data, role_id)
                    this.setState({
                        isadmin: is_admin
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }
    fetchteam() {
        this.setState({
            loading: true
        })
        teamService.fetchteams()
            .then((res) => {
                this.setState({ loading: false })
                if (res.status) {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var teamlist = filterstatus.map(function (cusmaidid) {
                        return { label: cusmaidid.team_name, value: (cusmaidid.id).toString(), country_code: cusmaidid.country_code };
                    });
                    this.setState({
                        teamdata: teamlist,
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }
    fetchteamsite() {
        this.setState({
            loading: true
        })
        teamsiteService.fetchteamsite()
            .then((res) => {
                this.setState({ loading: false })
                if (res.status) {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    this.setState({
                        teamsite_data: filterstatus,
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }
    fetchData() {
        const { mtd_number } = this.state
        if (mtd_number !== "") {
            this.setState({
                loading: true,
                is_submit: false
            })
            IndexingsheetService.fetchIndividualIndexingsheet(mtd_number)
                .then((res) => {

                    this.setState({ loading: false })
                    this.clearvalue()
                    if (res.status) {
                        this.setValue(res.data)
                    }
                    else {
                        createNotification(res.message, 'error', 'filled');
                    }

                })
                .catch((error) => {
                    this.setState({
                        loading: false
                    })
                });
        }
        else {
            createNotification('Please Enter Mtd Number', 'error', 'filled')
        }
    }
    validDate(date, title) {
        var date_value = '', isfill = false
        if (date && date !== null && date !== '') {

            var end_date = new Date(date)
            if (Object.prototype.toString.call(end_date) === "[object Date]") {
                if (isNaN(end_date.getTime())) {
                    console.log("date is not valid")
                }
                else {
                    date_value = end_date
                    console.log("date is valid")
                    isfill = true
                }
            } else {
                console.log("not a date")
            }

        }
        if (isfill === false) {
            createNotification(`Please Enter ${title} (MM/DD/YYYY)`, 'error', 'filled')
        }

        return date_value

    }
    validTime(timess, title) {
        var timevalue = '', isfill = true;
        if (timess && timess !== null && timess !== '') {
            console.log("kjgkjgkj ", timess)
            var isvalid = moment(timess, ["h:mm:ss A"]).format("HH:mm:ss");
            console.log("kjgkjgkj ", isvalid)
            if (isvalid !== 'Invalid date') {
                timevalue = isvalid
            }
            else {
                isfill = false
            }

            if (isfill === false) {
                createNotification(`Please Enter ${title} (hh:mm:ss AM/PM)`, 'error', 'filled')
            }
        }
        return timevalue

    }


    setValue(record) {

        if (record !== null && record) {
            this.setState({

                start_time: record.start_time,
                end_time: record.end_time,
                time_taken: record.time_taken,
                shipment_type: record.shipment_type,
                mtd_type: record.mtd_type,
                exception: record.exception,
                mtd_number: record.mtd_number,
                customer: record.customer,
                doc_cutoff: this.validDate(record.doc_cutoff, 'Doc Cut-Off'),
                aggregated_status: record.aggregated_status,
                type: record.type,
                date: this.validDate(record.date, 'Date'),
                time: record.time,
                medium: record.medium,
                shipment_no: record.shipment_no,
                bl: record.bl,
                etd: this.validDate(record.etd, 'ETD'),
                main_pol: record.main_pol,
                main_voyage: record.main_voyage,
                main_pod: record.main_pod,
                issuer: record.issuer,
                hbl: record.hbl,
                team: record.team,
                no_of_container: record.no_of_container,
                tat_time: record.tat_time,
                no_of_cargoitem: record.no_of_cargoitem,
                no_of_hbl: record.no_of_hbl,
                last_pod: record.last_pod,
                shipper_coder: record.shipper_coder,
                mr_code: record.mr_code,
                auditsheet: record.auditsheet,
                aggregate_status: record.aggregate_status,
                read: record.read,
                draft: record.draft,
                sdc: record.sdc,
                free_time: record.free_time,
                credit: record.credit,
                collapse: record.collapse,
                pod_end: record.pod_end,
                consignee: record.consignee,
                frob_shipment: record.frob_shipment,
                user_id: record.user_id,
                is_search: true
            })
        }

        setTimeout(() => {
            this.searchTeamSite()
        }, 500);

    }
    clearvalue() {

        this.setState({

            start_time: new Date(),
            updated_start_time: new Date(),
            end_time: '',
            time_taken: '',
            shipment_type: '',
            mtd_type: '',
            exception: '',
            mtd_number: '',
            customer: '',
            doc_cutoff: '',
            aggregated_status: '',
            type: '',
            date: '',
            time: '',
            medium: '',
            shipment_no: '',
            bl: '',
            etd: '',
            main_pol: '',
            main_voyage: '',
            main_pod: '',
            issuer: '',
            hbl: '',
            team: '',
            no_of_container: '',
            tat_time: '',
            no_of_cargoitem: '',
            no_of_hbl: '',
            last_pod: '',
            shipper_coder: '',
            mr_code: '',
            auditsheet: false,
            aggregate_status: '',
            read: false,
            draft: false,
            sdc: false,
            free_time: false,
            credit: false,
            collapse: false,
            pod_end: '',
            consignee: '',
            frob_shipment: '',
            is_search: false,
            user_id: '',
            is_submit: false,
            origin_requirements: [],
            country_requirements: [],
            customer_requirements: [],


        })
    }
    searchTeamSite() {
        const { issuer, shipper_coder, mr_code, consignee, customer,
            teamdata, teamsite_data, last_pod, team, pod_end, main_pod } = this.state
        var country_code = ''
        if ((pod_end).trim() !== '' && pod_end !== null)
        {
            country_code = pod_end.substring(0, 2)
        }
        else if (last_pod.trim() !== ''&&  last_pod !== null) {
            country_code = last_pod.substring(0, 2)
           
        }
        else if (main_pod.trim() !== '' && main_pod !== null) {
            country_code = main_pod.substring(0, 2)
           
        }

        console.log("lbkjbkj country_code = ", country_code)
        console.log("lbkjbkj issuer = ", issuer)
        console.log("lbkjbkj shipper_coder = ", shipper_coder)
        console.log("lbkjbkj mr_code = ", mr_code)
        console.log("lbkjbkj consignee = ", consignee)
        console.log("lbkjbkj customer = ", customer)
        if (country_code !== '' && issuer !== '') {
            var teams = getValue(teamdata, 'value', 'label', team)
            console.log("lbkjbkj teams = ", teams)
            this.setState({
                loading: true,
            })
            var customer_title = getValue(teamsite_data, 'team', 'customer', team),
                origin_title = getValue(teamsite_data, 'team', 'origin', team),
                country_title = getValue(teamsite_data, 'team', 'country', team)
            reportService.fetchTeamSiteapi(teams, issuer, shipper_coder, mr_code, consignee, country_code,
                customer, customer_title, origin_title, country_title)
                .then((res) => {

                    this.setState({ loading: false })
                    if (res) {
                        if (res.orgi) {
                            this.setState({
                                origin_requirements: res.orgi
                            })
                        }
                        if (res.cou) {
                            this.setState({
                                country_requirements: res.cou
                            })
                        }
                        if (res.cus && res.cus !== null) {
                            var list = []
                            const data = res.cus
                            for(var i = 0; i < data.length;i++)
                            {
                                var dict = data[i]
                                if((dict.MR !== null && dict.MR !== '') || (dict.CU !== null && dict.CU !== '') ||
                                (dict.CN !== null && dict.CN !== '') || (dict.SH !== null && dict.SH !== ''))
                                {
                                    list.push(dict)
                                }
                            }
                            this.setState({
                                customer_requirements: list
                            })
                        }
                    }


                })
                .catch((error) => {
                    this.setState({
                        loading: false
                    })
                });
        }
        else {
            createNotification(`Please Enter Mandatory Field`, 'error', 'filled')
        }

    }
    onChangeRadio(value) {
        this.setState({ mtd_type: value })
    }
    onChangeRadioException(value) {
        this.setState({ exception: value })
    }
    onChangeshipmenttype(value) {
        this.setState({ shipment_type: value })
    }
    onChangeRadiohBl(value) {
        this.setState({ hbl: value })
    }
    onChangeaggregate(value) {
        this.setState({ aggregate_status: value })
    }


    async onPasteD1040() {
        clipboard.readText().then((text) => {
            var record = getValue_D1040(text)
            console.log(text, 'tetttttt')
            console.log("kjbkj ", JSON.stringify(record))
            this.setState({
                shipment_no: record.shipment_no,
                mtd_number: record.mtd_number,
                issuer: record.issuer,
                main_pod: record.main_pod,
                doc_cutoff: this.validDate(record.doc_cutoff, 'Doc Cut-Off'),
                aggregated_status: record.aggregated_status,
                type: record.type,
                date: this.validDate(record.date, 'Date'),
                time: this.validTime(record.time, 'Time'),
                medium: record.medium,
                bl: record.bl,
                etd: this.validDate(record.etd, 'ETD'),
                main_pol: record.main_pol,
                main_voyage: record.main_voyage,
                customer: record.customer,
                pod_end: record.pod_end,
                last_pod: record.last_pod,
            })
            if (record.issuer !== "") {
                this.getteamvalue(record.issuer)
            }
            createNotification('Please Wait to load Requirement','success','filled')
            setTimeout(() => {
                this.searchTeamSite()
            }, 500);
        });

    }
    getteamvalue(value) {
        console.log("kjbkj issuer = ", value)
        this.setState({
            issuer: value,
            team: getValue(this.state.issuecode_data, 'issure_code', 'team', value)
        })
    }


    async onPasteS8100() {
        clipboard.readText().then((text) => {
            var record = getValue_S8100(text)
            console.log("kjbkj ", JSON.stringify(record))
            this.setState({
                shipper_coder: record.shipper_coder,
                mr_code: record.mr_code,
                consignee: record.consignee


            })
            createNotification('Please Wait to load Requirement','success','filled')
            // setTimeout(() =>{
            //     this.searchTeamSite()
            // }, 500);

        });
       

    }
    onChangeFileUpload(files) {

    }


    setCollapse() {

        this.setState({
            collapse: !this.state.collapse
        })
    }
    onSubmit() {
        const { start_time, no_of_container, no_of_cargoitem, no_of_hbl, mtd_number, customer,
            issuer, shipper_coder, mr_code, main_pod, doc_cutoff, aggregated_status, type, date, time, medium, shipment_no,
            bl, etd, main_pol, main_voyage, last_pod, auditsheet, aggregate_status, exception, shipment_type,
            mtd_type, hbl, read, draft, sdc, free_time, credit, team, pod_end, consignee, frob_shipment, isadmin, updated_start_time } = this.state;



        var is_fill = false
        if (isadmin === true) {
            if (start_time != "" && no_of_container !== "" && no_of_cargoitem !== "" && no_of_hbl !== "" && mtd_number !== "" &&
                customer !== "" && issuer !== "" && shipper_coder !== "" && mr_code !== "" && main_pod !== "" && doc_cutoff !== "" &&
                aggregated_status !== "" && type !== "" && date !== "" && medium !== "" && shipment_no !== "" && bl !== "" && etd !== "" &&
                main_pol !== "" && main_voyage !== "" && last_pod !== "" && exception !== "" && shipment_type !== "" &&
                mtd_type !== "" && hbl !== "" && aggregate_status !== "" && read !== false) {
                is_fill = true
            }
        }
        else {
            if (start_time != "" && no_of_container !== "" && no_of_cargoitem !== ""
                && no_of_hbl !== "" && mtd_number !== "" && shipment_no !== "" && read !== false
                && exception !== "" && shipment_type !== "" && mtd_type !== ""&& hbl !== "" && aggregate_status !== "" 
                && shipper_coder !== '' && mr_code !== '') {
                is_fill = true
            }
        }
        if (is_fill === true) {
            var dates = (date !== '' && date !== null) ? moment(date).format('MM/DD/YYYY') : ''
            var etd_date = (etd !== '' && etd !== null) ? moment(etd).format('MM/DD/YYYY') : ''

            var doc_cutoff_date = (doc_cutoff !== '' && doc_cutoff !== null) ? moment(doc_cutoff).format('MM/DD/YYYY') : ''
            var end_time = new Date(), updated_end_time = new Date()
            var time_taken = getTimeDifference(start_time, new Date())
            console.log('kvbkvhh time_taken', time_taken)
            var tat_time = ''
            if (date !== "" && time !== "") {
                console.log("kvbkvhh date ", dates)
                console.log("kvbkvhh time ", time)
                console.log("kvbkvhh ", new Date(dates + " " + time))
                tat_time = getTimeDifference(new Date(), new Date(dates + " " + time))
                console.log("kvbkvhh ", tat_time)
            }
            const { username } = this.props
            

            this.setState({
                end_time: end_time,
                time_taken: time_taken,
                tat_time: tat_time
            })

            this.setState({
                loading: true
            })

            
            IndexingsheetService.createIndexingsheet(username, time_taken, no_of_container, no_of_cargoitem, no_of_hbl, mtd_number, customer,
                issuer, shipper_coder, mr_code, main_pod, doc_cutoff_date, aggregated_status, type, dates, time, medium, shipment_no,
                bl, etd_date, main_pol, main_voyage, tat_time, last_pod, auditsheet, aggregate_status, exception, shipment_type,
                mtd_type, hbl, read, draft, sdc, free_time, credit, team, pod_end, consignee, frob_shipment,
                convertLocalToUTCDate(start_time),
                convertLocalToUTCDate(end_time),
                convertLocalToUTCDate(updated_start_time),
                convertLocalToUTCDate(updated_end_time))
                .then((res) => {
                    this.setState({
                        loading: false
                    })
                    if (res.status) {
                        createNotification('Success', 'success', 'filled')
                        this.clearvalue()
                    }
                    else {
                        createNotification(res.message, 'error', 'filled');
                    }
                })
                .catch((error) => {
                    this.setState({
                        loading: false
                    })
                });

        }
        else {
            this.setState({
                is_submit: true
            })
            createNotification('Please fill mandatory field', 'error', 'filled')
        }

    }

    renderTemplateadmin() {
        const { languageData, locale } = this.props
        const { data, isadmin, teamdata } = this.state
        var array = data.map(record => {
            return {
                'start_time': record.start_time,
                'end_time': record.end_time,
                'time_taken': record.time_taken,
                'shipment_type': record.shipment_type,
                'mtd_type': record.mtd_type,
                'exception': record.exception,
                'mtd_number': record.mtd_number,
                'customer': record.customer,
                'doc_cutoff': record.doc_cutoff,
                'aggregated_status': record.aggregated_status,
                'type': record.type,
                'date': record.date,
                'time': record.time,
                'medium': record.medium,
                'shipment_no': record.shipment_no,
                'bl': record.bl,
                'etd': record.etd,
                'main_pol': record.main_pol,
                'main_voyage': record.main_voyage,
                'main_pod': record.main_pod,
                'issuer': record.issuer,
                'hbl': record.hbl,
                'team': getValue(teamdata, 'value', 'label', record.team),
                'no_of_container': record.no_of_container,
                'tat_time': record.tat_time,
                'no_of_cargoitem': record.no_of_cargoitem,
                'no_of_hbl': record.no_of_hbl,
                'last_pod': record.last_pod,
                'shipper_coder': record.shipper_coder,
                'mr_code': record.mr_code,
                'auditsheet': record.auditsheet,
                'aggregate_status': record.aggregate_status,
                'read': record.read,
                'draft': record.draft,
                'sdc': record.sdc,
                'free_time': record.free_time,
                'credit': record.credit,
                'collapse': record.collapse,
                'pod_end': record.pod_end,
                'consignee ': record.consignee,
                'frob_shipment': record.frob_shipment,
                'user_id': record.user_id,

            };
        })
        return (

            <Workbook filename="Input_Sheet.xlsx" element={
                <Button className="button-width" color="secondary" style={{ width: '150px' }}
                >{onChangeLanguage(locale, 'Download', languageData)}
                </Button>
            }>
                <Workbook.Sheet data={array} name="Sheet A">
                    <Workbook.Column label="User ID" value="user_id" />
                    <Workbook.Column label="Start Date Time" value="start_time" />
                    <Workbook.Column label="End Date Time" value="end_time" />
                    <Workbook.Column label="Time Taken" value="time_taken" />
                    <Workbook.Column label="No of Container" value="no_of_container" />
                    <Workbook.Column label="No of Cargo Item" value="no_of_cargoitem" />
                    <Workbook.Column label="No of HBL" value="no_of_hbl" />
                    <Workbook.Column label="MTD Number" value="mtd_number" />
                    <Workbook.Column label="Customer" value="customer" />
                    <Workbook.Column label="Issuer" value="issuer" />
                    <Workbook.Column label="Shipper Coder" value="shipper_coder" />
                    <Workbook.Column label="MR Code" value="mr_code" />
                    <Workbook.Column label="Team" value="team" />
                    <Workbook.Column label="Main POD" value="main_pod" />
                    <Workbook.Column label="Doc Cut-off" value="doc_cutoff" />
                    <Workbook.Column label="Aggregated Status" value="aggregated_status" />
                    <Workbook.Column label="Shipment Number" value="shipment_no" />
                    <Workbook.Column label="Main Voyage" value="main_voyage" />
                    {/* <Workbook.Column label="Type" value="type" />
                    <Workbook.Column label="Date" value="date" />
                    <Workbook.Column label="Time" value="time" /> */}
                    {/* <Workbook.Column label="Medium" value="medium" />
                    <Workbook.Column label="BL" value="bl" />
                    <Workbook.Column label="ETD" value="etd" />
                    <Workbook.Column label="Main POL" value="main_pol" /> */}
                    <Workbook.Column label="TAT Time" value="tat_time" />
                    <Workbook.Column label="Last POD" value="last_pod" />
                    <Workbook.Column label="Shipment Type" value="shipment_type" />
                    <Workbook.Column label="MTD Type" value="mtd_type" />
                    <Workbook.Column label="POD/End" value="pod_end" />
                    <Workbook.Column label="Consignee" value="consignee" />
                    {/* <Workbook.Column label="Audit Sheet" value="auditsheet" />
                    <Workbook.Column label="Aggregate Status" value="aggregate_status" />
                    <Workbook.Column label="Exception" value="exception" />
                   
                    <Workbook.Column label="HBL" value="hbl" />
                    <Workbook.Column label="I have read and processed the shipment as per the above requirements" value="read" />
                    <Workbook.Column label="Draft Sent" value="draft" />
                    <Workbook.Column label="SDC Y" value="sdc" />
                    <Workbook.Column label="Free Time Checked" value="free_time" />
                    <Workbook.Column label="Credit Check" value="credit" /> */}

                </Workbook.Sheet>
            </Workbook>


        );
    }
    renderTemplate() {
        const { languageData, locale } = this.props
        const { data, teamdata } = this.state
        var array = data.map(record => {
            return {
                'start_time': record.start_time,
                'end_time': record.end_time,
                'time_taken': record.time_taken,
                'shipment_type': record.shipment_type,
                'mtd_type': record.mtd_type,
                'exception': record.exception,
                'mtd_number': record.mtd_number,
                'customer': record.customer,
                'doc_cutoff': record.doc_cutoff,
                'aggregated_status': record.aggregated_status,
                'type': record.type,
                'date': record.date,
                'time': record.time,
                'medium': record.medium,
                'shipment_no': record.shipment_no,
                'bl': record.bl,
                'etd': record.etd,
                'main_pol': record.main_pol,
                'main_voyage': record.main_voyage,
                'main_pod': record.main_pod,
                'issuer': record.issuer,
                'hbl': record.hbl,
                'team': getValue(teamdata, 'value', 'label', record.team),
                'no_of_container': record.no_of_container,
                'tat_time': record.tat_time,
                'no_of_cargoitem': record.no_of_cargoitem,
                'no_of_hbl': record.no_of_hbl,
                'last_pod': record.last_pod,
                'shipper_coder': record.shipper_coder,
                'mr_code': record.mr_code,
                'auditsheet': record.auditsheet,
                'aggregate_status': record.aggregate_status,
                'read': record.read,
                'draft': record.draft,
                'sdc': record.sdc,
                'free_time': record.free_time,
                'credit': record.credit,
                'collapse': record.collapse,
                'pod_end': record.pod_end,
                'consignee ': record.consignee,
                'frob_shipment': record.frob_shipment,
                'user_id': record.user_id,

            };
        })
        return (

            <Workbook filename="Input_Sheet.xlsx" element={
                <Button className="button-width" color="secondary" style={{ width: '150px' }}
                >{onChangeLanguage(locale, 'Download', languageData)}
                </Button>
            }>
                <Workbook.Sheet data={array} name="Sheet A">
                <Workbook.Column label="User ID" value="user_id" />
                    <Workbook.Column label="Start Date Time" value="start_time" />
                    <Workbook.Column label="End Date Time" value="end_time" />
                    <Workbook.Column label="Time Taken" value="time_taken" />
                    <Workbook.Column label="No of Container" value="no_of_container" />
                    <Workbook.Column label="No of Cargo Item" value="no_of_cargoitem" />
                    <Workbook.Column label="No of HBL" value="no_of_hbl" />
                    <Workbook.Column label="MTD Number" value="mtd_number" />
                    <Workbook.Column label="Customer" value="customer" />
                    <Workbook.Column label="Issuer" value="issuer" />
                    <Workbook.Column label="Shipper Coder" value="shipper_coder" />
                    <Workbook.Column label="MR Code" value="mr_code" />
                    <Workbook.Column label="Team" value="team" />
                    <Workbook.Column label="Main POD" value="main_pod" />
                    <Workbook.Column label="Doc Cut-off" value="doc_cutoff" />
                    <Workbook.Column label="Aggregated Status" value="aggregated_status" />
                    <Workbook.Column label="Shipment Number" value="shipment_no" />
                    <Workbook.Column label="Main Voyage" value="main_voyage" />
                    <Workbook.Column label="TAT Time" value="tat_time" />
                    <Workbook.Column label="Last POD" value="last_pod" />
                    <Workbook.Column label="Shipment Type" value="shipment_type" />
                    <Workbook.Column label="MTD Type" value="mtd_type" />
                    <Workbook.Column label="POD/End" value="pod_end" />
                    <Workbook.Column label="Consignee" value="consignee" />
                </Workbook.Sheet>
            </Workbook>


        );
    }
    handleKeypress(e) {
        const characterCode = e.key
        if (characterCode === 'Backspace') return

        const characterNumber = Number(characterCode)
        if (characterNumber >= 0 && characterNumber <= 9) {
            if (e.currentTarget.value && e.currentTarget.value.length) {
                return
            } else if (characterNumber === 0) {
                e.preventDefault()
            }
        } else {
            e.preventDefault()
        }
    }

    handleChange(date) {
        this.setState({
            date: date
        })
    }
    onKeyPressValue_row(e) {

        if (e.key == 'Enter') {

            const { mr_code } = this.state
            console.log('jvjhcjg ', mr_code);
            if (mr_code !== '') {
                // this.RetrieveSPData()
            }

        }
    }

    render() {
        const { user_id, start_time, end_time, time_taken, no_of_container, no_of_cargoitem, no_of_hbl, mtd_number, customer,
            issuer, shipper_coder, mr_code, main_pod, doc_cutoff, aggregated_status, type, date, time, medium, shipment_no,
            bl, etd, main_pol, main_voyage, last_pod, auditsheet, aggregate_status, exception, collapse, shipment_type,
            mtd_type, hbl, team, teamdata, read, draft, sdc, free_time, credit, loading, tat_time, pod_end, is_submit, is_search, isadmin,
            consignee, origin_requirements, country_requirements, customer_requirements } = this.state
        const { match, languageData, locale, username } = this.props
        const options = {
			animationEnabled: true,
			title: {
				text: "Customer Satisfaction"
			},
			subtitles: [{
				text: "71% Positive",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "Unsatisfied", y: 5 },
					{ name: "Very Unsatisfied", y: 31 },
					{ name: "Very Satisfied", y: 40 },
					{ name: "Satisfied", y: 17 },
					{ name: "Neutral", y: 7 }
				]
			}]
		}
        return (
            <>
                <title>{onChangeLanguage(locale, 'Automation Dashboard', languageData)}</title>
                {loading &&
                    <div>
                        <Loading loading={true} background="rgba(239,100,50, 0.1)" loaderColor="#EF6432" />
                    </div>
                }
                <Row>
                    <Colxx xxs="12">

                        <div className="row">
                            <div className="col-md-10">
                                <Breadcrumb heading={onChangeLanguage(locale, 'Automation Dashboard', languageData)} match={match} />
                            </div>
                            {/* <div className = "col-md-2">
                        <Button className = "button-width" color="primary" style= {{width :'100%'}}>
                            <i className = "simple-icon-cloud-upload" style= {{margin :'0px 4px',fontSize:'12px'}}/>
                            <a style= {{margin :'0px'}} > Upload</a>
                            <input type="file" name="file" id="File-1" onClick ={(e) => e.target.value=null }
                                className = "filepicker_customButton"
                                style = {{width : '80%',marginLeft :'-56%'}}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={({target: { files }}) => this.onChangeFileUpload(files)}/>
                        </Button>
                    </div> */}
                            {/* <div className = "col-md-2" >
                       {isadmin === true ?this.renderTemplateadmin():this.renderTemplate()}
                       </div> */}
                        </div>

                        <Separator className="separator-margin" />
                    </Colxx>
                </Row>
                {/* onKeyDown={this.handleKeyDown} */}
                <div>
                    <div className="publishuser-card-component" style={{ padding: '10px', borderRadius: '10px', marginBottom: '15px' }}>
                        <div className="row">

                        </div>
                        {/* <Collapse isOpen={collapse}>

                            <div className="row">


                             
                            </div>
                        </Collapse> */}
                        {/* <PieChart style={{ width: 250, height:250 }}  radius={50}
  data={[
    { title: 'Employee 1', value: 10,  color: '#1E2758 ' },
    { title: 'Employee 2', value: 15, color: '#6699cc' },
    { title: 'Employee 3', value: 20, color: '#6AABD2' },
  ]}
/>; */}
<CanvasJSChart options = {options}/>


                    </div>
 
                    


                    <div className="row text-center" style={{ margin: '0px 5px' }}>
                        {/* <Button className="button-width" color="secondary"
                            onClick={() => this.onPasteD1040()}
                        >
                            {onChangeLanguage(locale, 'Paste From D1040', languageData)}
                        </Button> */}
                        {/* <Button className="button-width" color="primary"
                            onClick={() => this.fetchData()}
                        >
                            {onChangeLanguage(locale, 'Find', languageData)}
                        </Button> */}
                        {/* <Button className="button-width" color="primary"
                            onClick={() => this.onSubmit()}
                        >
                            {onChangeLanguage(locale, 'Save', languageData)}
                        </Button>
                        <Button className="button-width" color="secondary"
                            onClick={() => this.clearvalue()}
                        >{onChangeLanguage(locale, 'Refresh', languageData)}</Button> */}
                    </div>


                </div>
            </>
        )
    }
}
const mapStateToProps = ({ settings }) => {
    const { locale, languageData, username } = settings;
    return { locale, languageData, username };
};
export default withRouter(
    connect(mapStateToProps, {

    })(Sidebar)
);

