import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Checkbox } from 'antd';
import { onChangeLanguage, getTimeDifference, getstarttimeendtimeDifferencebew, permittedusers, getValue, convertLocalToUTCDate } from '../../../../helper'
import { InvoiceService } from '../../../../redux/Dispute-process/invoice/saga';
import { createNotification } from '../../../../toast';
import { PaymentService } from '../../../../redux/projectmasters/diputemaster/paymentterms/saga'
import { CurrencyService } from '../../../../redux/projectmasters/diputemaster/currency/saga'
import { CollectionService } from '../../../../redux/projectmasters/diputemaster/collection/saga'
import { LayoutService } from '../../../../redux/projectmasters/diputemaster/layouttype/saga'
import { LanguageService } from '../../../../redux/projectmasters/diputemaster/language/saga'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: '',
            document: '',
            dispute: '',
            phase: '',
            status: '',
            collection_ref: '',
            invoice_number: '',
            invoice_no: '',
            date: '',
            ref_invoice: '',
            total_amount: '',
            additional_number: '',
            accounting_system: '',
            payer: '',
            collector: '',
            creater: '',
            created_by: '',
            changed_by: '',
            payment_base: '',
            payment_terms: '',
            payment_due: '',
            date_of_activity: '',
            currency: '',
            collection_kind: '',
            date_of_roe: '',
            language: '',
            layout_type: '',
            print_option: [],
            paymentdata: [],
            general_print: [],
            currencydata: [],
            collectionkiddata: [],
            layouttypedata: [],
            languagedata: [],
            data: [],
            loading: false,
            is_submit: false,
            updated_start_time: new Date(),
            invoicecount: '',
            invoicecountlast: '',
        };
    }
    componentDidMount() {
        this.fetchData()
        this.fetchpayemnt()
        this.fetchcurrency()
        this.fetchcollection()
        this.fetchlayout()
        this.fetchlanguage()
        this.fetchInvoiceCount()
    }
    fetchInvoiceCount() {
        this.setState({ loading: true })
        const { username } = this.props
        // console.log(username)
        InvoiceService.fetchInvoiceCount(username)
            .then((res) => {
                if (res.status) {
                    let filterstatus = res.data;
                    let lastdata = res.lastcount;
                    this.setState({
                        invoicecount: filterstatus,
                        invoicecountlast: lastdata
                    })
                }
                else {
                    this.setState({ loading: false })
                }
            })
            .catch((error) => { });
        this.setState({ loading: false })

    }
    fetchData() {
        this.setState({
            loading: true
        })
        InvoiceService.fetchapi()
            .then((res) => {
                if (res.status) {
                    this.setState({
                        data: res.data,
                    })
                }
                else {
                    this.setState({ loading: false })
                }
            })
            .catch((error) => { });
        this.setState({ loading: false })
    }
    fetchpayemnt() {
        this.setState({
            loading: true
        })
        PaymentService.fetchpayment()
            .then((res) => {
                this.setState({ loading: false })
                if (res.status) {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var regionlist = filterstatus.map(function (regionname) {
                        return { label: regionname.name, value: (regionname.id).toString() };
                    });
                    this.setState({
                        paymentdata: regionlist,
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }
    fetchcurrency() {
        this.setState({
            loading: true
        })
        CurrencyService.fetchcurrency()
            .then((res) => {
                this.setState({ loading: false })
                if (res.status) {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var regionlist = filterstatus.map(function (regionname) {
                        return { label: regionname.name, value: (regionname.id).toString() };
                    });
                    this.setState({
                        currencydata: regionlist,
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }
    fetchlanguage() {
        this.setState({
            loading: true
        })
        LanguageService.fetchLanguage()
            .then((res) => {
                this.setState({ loading: false })
                if (res.status) {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var regionlist = filterstatus.map(function (regionname) {
                        return { label: regionname.name, value: (regionname.id).toString() };
                    });
                    this.setState({
                        languagedata: regionlist,
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }
    fetchcollection() {
        this.setState({
            loading: true
        })
        CollectionService.fetchcollection()
            .then((res) => {
                this.setState({ loading: false })
                if (res.status) {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var regionlist = filterstatus.map(function (regionname) {
                        return { label: regionname.name, value: (regionname.id).toString() };
                    });
                    this.setState({
                        collectionkiddata: regionlist,
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }
    fetchlayout() {
        this.setState({
            loading: true
        })
        LayoutService.fetchlayout()
            .then((res) => {
                this.setState({ loading: false })
                if (res.status) {
                    let filterstatus = (res.data).filter(item => item.status === 1)
                    var regionlist = filterstatus.map(function (regionname) {
                        return { label: regionname.name, value: (regionname.id).toString() };
                    });
                    this.setState({
                        layouttypedata: regionlist,
                    })
                }

            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
            });
    }
    clearvalue() {
        this.setState({
            invoice: '',
            document: '',
            dispute: '',
            phase: '',
            status: '',
            collection_ref: '',
            invoice_number: '',
            invoice_no: '',
            date: '',
            ref_invoice: '',
            total_amount: '',
            additional_number: '',
            accounting_system: '',
            payer: '',
            collector: '',
            creater: '',
            created_by: '',
            changed_by: '',
            payment_base: '',
            payment_terms: '',
            payment_due: '',
            date_of_activity: '',
            currency: '',
            collection_kind: '',
            date_of_roe: '',
            language: '',
            layout_type: '',
            print_option: [],
            general_print: [],
            is_submit: false,
        })
    }

    onChangeRadio(value) {
        this.setState({ document: value })
    }
    onchangeprint(value) {

        var charge_value = [...this.state.print_option]
        if (charge_value.includes(value)) {
            charge_value = charge_value.filter(e => e !== value);
        }
        else {
            charge_value.push(value)
        }
        this.setState({ print_option: charge_value })
    }
    onchangegeneralprint(value) {

        var charge_value = [...this.state.general_print]
        if (charge_value.includes(value)) {
            charge_value = charge_value.filter(e => e !== value);
        }
        else {
            charge_value.push(value)
        }
        this.setState({ general_print: charge_value })
    }
    onSubmit() {
        const { invoice, document, dispute, phase, status, collection_ref, invoice_number, invoice_no, date,
            ref_invoice, total_amount, additional_number, accounting_system, payer, collector, creater,
            created_by, changed_by, payment_base, payment_terms, payment_due, date_of_activity, currency,
            collection_kind, date_of_roe, language, layout_type, print_option,
            general_print, updated_start_time } = this.state;
        if (invoice !== '' && document !== '' && dispute !== '' && phase !== '' && status !== '' && collection_ref !== '') {
            const { username } = this.props
            let end_date = convertLocalToUTCDate(new Date()),
                start_date = convertLocalToUTCDate(updated_start_time),
                updatedstarttime = convertLocalToUTCDate(updated_start_time),
                updated_end_time = convertLocalToUTCDate(new Date())
            InvoiceService.createapi(invoice, document, dispute, phase, status, collection_ref, invoice_number, invoice_no, date,
                ref_invoice, total_amount, additional_number, accounting_system, payer, collector, creater,
                created_by, changed_by, payment_base, payment_terms, payment_due, date_of_activity, currency,
                collection_kind, date_of_roe, language, layout_type, print_option,
                general_print, start_date, end_date, updatedstarttime, updated_end_time, username)
                .then((res) => {
                    this.setState({
                        loading: false
                    })
                    if (res.status) {
                        createNotification('Created', 'success', 'filled')
                        this.fetchData()
                        this.fetchInvoiceCount()
                        this.setState({
                            invoice: '',
                            document: '',
                            dispute: '',
                            phase: '',
                            status: '',
                            collection_ref: '',
                            invoice_number: '',
                            invoice_no: '',
                            date: '',
                            ref_invoice: '',
                            total_amount: '',
                            additional_number: '',
                            accounting_system: '',
                            payer: '',
                            collector: '',
                            creater: '',
                            created_by: '',
                            changed_by: '',
                            payment_base: '',
                            payment_terms: '',
                            payment_due: '',
                            date_of_activity: '',
                            currency: '',
                            collection_kind: '',
                            date_of_roe: '',
                            language: '',
                            layout_type: '',
                            print_option: [],
                            general_print: [],
                            is_submit: false,
                        })
                    }
                    else {
                        createNotification('Invoice Number Already Exist', 'error', 'filled');
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
    render() {
        const { invoice, document, dispute, phase, status, collection_ref, invoice_number, invoice_no, date, invoicecount, invoicecountlast,
            ref_invoice, total_amount, additional_number, accounting_system, payer, collector, creater,
            created_by, changed_by, payment_base, payment_terms, payment_due, date_of_activity, currency,
            collection_kind, date_of_roe, language, layout_type, print_option, general_print, loading,
            is_submit, paymentdata, collectionkiddata, currencydata, layouttypedata, languagedata } = this.state
        const { match, languageData, locale } = this.props
        return (
            <>
                <title>{onChangeLanguage(locale, 'Invoice Cancellation', languageData)}</title>
                <Row>
                    <Colxx xxs="12">
                        <div className="row">
                            <div className="col-md-8">
                                <Breadcrumb heading={onChangeLanguage(locale, 'Invoice Cancellation', languageData)} match={match} />
                            </div>
                            <div className="col-md-2" >
                                <h2 style={{ marginTop: '15px' }}>Total EQ : {invoicecount}</h2>
                            </div>
                            <div className="col-md-2">
                                <h2 style={{ marginTop: '15px' }}>Last EQ : {invoicecountlast}</h2>
                            </div>
                        </div>
                        <Separator className="separator-margin" />
                    </Colxx>
                </Row>
                <div>
                    <div className="publishuser-card-component" style={{ borderRadius: '10px', marginBottom: '30px' }}>
                        <div className="publish-title" >
                            <Row>
                                <Colxx xxs="12">
                                    <Label className="fontstyle"
                                        style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Revenue Dispute Details', languageData)}</Label>

                                </Colxx>
                            </Row>
                        </div>
                        <div className="row" style={{ padding: '10px' }}>
                            <div className="col-md-4 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Invoice', languageData)}
                                    <a style={{ color: 'red' }}>*</a></Label>
                                <Input
                                    className={is_submit === true && invoice === '' ? "error-border" : "fontstyle text-background"}
                                    // placeholder = 'End date'
                                    value={invoice}
                                    onChange={(e) => this.setState({ invoice: e.target.value })}
                                />
                            </div>

                            <div className="col-md-4 space-margin">
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Document', languageData)}
                                    <a style={{ color: 'red' }}>*</a></Label>
                                <Input
                                    className={is_submit === true && document === '' ? "error-border" : "fontstyle text-background"}
                                    // placeholder = 'End date'
                                    value={document}
                                    onChange={(e) => this.setState({ document: e.target.value })}
                                />
                            </div>
                            <div className="col-md-4 space-margin"  >
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Dispute', languageData)}
                                    <a style={{ color: 'red' }}>*</a></Label>
                                <Input
                                    className={is_submit === true && dispute === '' ? "error-border" : "fontstyle text-background"}
                                    // placeholder = 'End date'
                                    value={dispute}
                                    onChange={(e) => this.setState({ dispute: e.target.value })}
                                />

                            </div>
                            <div className="col-md-4 space-margin"  >
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Phase', languageData)}
                                    <a style={{ color: 'red' }}>*</a></Label>
                                <Input
                                    className={is_submit === true && phase === '' ? "error-border" : "fontstyle text-background"}
                                    // placeholder = 'End date'
                                    value={phase}
                                    onChange={(e) => this.setState({ phase: e.target.value })}
                                />

                            </div>
                            <div className="col-md-4 space-margin"  >
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Status', languageData)}
                                    <a style={{ color: 'red' }}>*</a></Label>
                                <Input
                                    className={is_submit === true && status === '' ? "error-border" : "fontstyle text-background"}
                                    // placeholder = 'End date'
                                    value={status}
                                    onChange={(e) => this.setState({ status: e.target.value })}
                                />

                            </div>
                            <div className="col-md-4 space-margin"  >
                                <Label className="fontstyle normal-font" >{onChangeLanguage(locale, 'Collection Reference', languageData)}
                                    <a style={{ color: 'red' }}>*</a></Label>
                                <Input
                                    className={is_submit === true && collection_ref === '' ? "error-border" : "fontstyle text-background"}
                                    // placeholder = 'End date'
                                    value={collection_ref}
                                    onChange={(e) => this.setState({ collection_ref: e.target.value })}
                                />

                            </div>

                        </div>
                        {/* <div className = "row" style = {{padding:'15px'}}>
                        <div className = "col-md-5"></div>
                        <div className = "col-md-4">
                            <Button 
                            style={{width:'150px'}}
                            className = "button-width" color="secondary"  
                            onClick={()=>this.onSubmit()}
                                >
                                Save 
                            </Button>
                        </div>
                    </div> */}

                    </div>
                    <div className="publishuser-card-component" style={{ borderRadius: '10px', marginBottom: '10px' }}>
                        <div className="publish-title" >
                            <Row>
                                <Colxx xxs="12">
                                    <Label className="fontstyle"
                                        style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Basic Information', languageData)}</Label>

                                </Colxx>
                            </Row>
                        </div>
                        <div className="row" style={{ padding: '10px' }}>
                            <div className="col-md-12 space-margin"  >
                                <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>{onChangeLanguage(locale, 'Invoice Number', languageData)}</a> :  <span className="btn-hover">{invoice}</span></Label>
                            </div>

                        </div>
                    </div>
                    <div className="publishuser-card-component" style={{ borderRadius: '10px', marginBottom: '10px' }}>
                        <div className="publish-title" >
                            <Row>
                                <Colxx xxs="12">
                                    <Label className="fontstyle"
                                        style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'F0020 Invoice Details', languageData)}</Label>

                                </Colxx>
                            </Row>
                        </div>
                        <div>
                            <div>
                                <div className="publish-title1" >
                                    <Row>
                                        <Colxx xxs="12">
                                            <Label className="fontstyle"
                                                style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Basics', languageData)}</Label>

                                        </Colxx>
                                    </Row>
                                </div>

                                <div className="row" style={{ padding: '10px' }}>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Invoice Number', languageData)}</a><br></br>  {invoice}</Label>
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Date', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            // value = {date}  
                                            type="date"
                                            onChange={(e) => this.setState({ date: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Reference Invoice', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            type="number" min="0" step='1'
                                            onKeyDown={this.handleKeypress}
                                            value={ref_invoice}
                                            onChange={(e) => this.setState({ ref_invoice: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Total Amount', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={total_amount}
                                            onChange={(e) => this.setState({ total_amount: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Additional Number', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={additional_number}
                                            onChange={(e) => this.setState({ additional_number: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Accounting System', languageData)}</a> </Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={accounting_system}
                                            onChange={(e) => this.setState({ accounting_system: e.target.value })}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="publish-title1" >
                                    <Row>
                                        <Colxx xxs="12">
                                            <Label className="fontstyle"
                                                style={{ fontWeight: 700, fontSize: '15px' }}>{onChangeLanguage(locale, 'Involved Orgaisations', languageData)}</Label>

                                        </Colxx>
                                    </Row>
                                </div>

                                <div className="row" style={{ padding: '10px' }}>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Payer', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={payer}
                                            onChange={(e) => this.setState({ payer: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Collector', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={collector}
                                            onChange={(e) => this.setState({ collector: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Creater', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={creater}
                                            onChange={(e) => this.setState({ creater: e.target.value })}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="publish-title1" >
                                    <Row>
                                        <Colxx xxs="12">
                                            <Label className="fontstyle"
                                                style={{ fontWeight: 700, fontSize: '15px' }}>
                                                {onChangeLanguage(locale, 'State', languageData)}
                                            </Label>

                                        </Colxx>
                                    </Row>
                                </div>

                                <div className="row" style={{ padding: '10px' }}>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Created By', languageData)}
                                        </a>
                                        </Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={created_by}
                                            onChange={(e) => this.setState({ created_by: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Changed By', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={changed_by}
                                            onChange={(e) => this.setState({ changed_by: e.target.value })}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="publish-title1" >
                                    <Row>
                                        <Colxx xxs="12">
                                            <Label className="fontstyle"
                                                style={{ fontWeight: 700, fontSize: '15px' }}>
                                                {onChangeLanguage(locale, 'Specials', languageData)}</Label>

                                        </Colxx>
                                    </Row>
                                </div>

                                <div className="row" style={{ padding: '10px' }}>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Payment Base Date', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'

                                            value={payment_base}
                                            onChange={(e) => this.setState({ payment_base: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Payment Terms', languageData)}</a><br></br>
                                        </Label>
                                        <Select
                                            className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={paymentdata.filter(option => option.value === payment_terms)}
                                            options={paymentdata}
                                            onChange={({ value }) => this.setState({ payment_terms: value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Payment Due Date', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            // type="date"
                                            value={payment_due}
                                            onChange={(e) => this.setState({ payment_due: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Date of Activity', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={date_of_activity}
                                            onChange={(e) => this.setState({ date_of_activity: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Currency', languageData)}</a><br></br>
                                        </Label>
                                        <Select
                                            className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={currencydata.filter(option => option.value === currency)}
                                            options={currencydata}
                                            onChange={({ value }) => this.setState({ currency: value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Collection Kind', languageData)}</a><br></br>
                                        </Label>
                                        <Select
                                            className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={collectionkiddata.filter(option => option.value === collection_kind)}
                                            options={collectionkiddata}
                                            onChange={({ value }) => this.setState({ collection_kind: value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Date of ROE', languageData)}</a></Label>
                                        <Input
                                            className={"fontstyle text-background"}
                                            // placeholder = 'End date'
                                            value={date_of_roe}
                                            onChange={(e) => this.setState({ date_of_roe: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Language', languageData)}</a> </Label>
                                        <Select
                                            className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={languagedata.filter(option => option.value === language)}
                                            options={languagedata}
                                            onChange={({ value }) => this.setState({ language: value })}
                                        />
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700 }}>
                                            {onChangeLanguage(locale, 'Layout Type', languageData)}</a><br></br>
                                        </Label>
                                        <Select
                                            className="react-select fontstyle"
                                            classNamePrefix="react-select"
                                            name="form-field-name"
                                            value={layouttypedata.filter(option => option.value === layout_type)}
                                            options={layouttypedata}
                                            onChange={({ value }) => this.setState({ layout_type: value })}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="publish-title1" >
                                    <Row>
                                        <Colxx xxs="12">
                                            <Label className="fontstyle"
                                                style={{ fontWeight: 700, fontSize: '15px' }}>
                                                {onChangeLanguage(locale, 'Print Option', languageData)}
                                            </Label>

                                        </Colxx>
                                    </Row>
                                </div>

                                <div className="row" style={{ padding: '10px' }}>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Payer')}
                                            onChange={() => this.onchangeprint('Payer')}>
                                            <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                {onChangeLanguage(locale, 'Payer', languageData)}</a></Label></Checkbox>

                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Customer')}
                                            onChange={() => this.onchangeprint('Customer')}>
                                            <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                {onChangeLanguage(locale, 'Customer', languageData)}</a></Label></Checkbox>

                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Shipper')}
                                            onChange={() => this.onchangeprint('Shipper')}>
                                            <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                {onChangeLanguage(locale, 'Shipper', languageData)}</a></Label></Checkbox>

                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Consignee')}
                                            onChange={() => this.onchangeprint('Consignee')}><Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Consignee', languageData)}</a></Label></Checkbox>
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Forwarder')}
                                            onChange={() => this.onchangeprint('Forwarder')}><Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Forwarder', languageData)}</a></Label></Checkbox>
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Notify 1')}
                                            onChange={() => this.onchangeprint('Notify 1')}><Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Notify 1', languageData)}</a></Label></Checkbox>
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Po Number')}
                                            onChange={() => this.onchangeprint('Po Number')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Po Number', languageData)}</a></Label></Checkbox>
                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Shippment')}
                                            onChange={() => this.onchangeprint('Shippment')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Shippment', languageData)}</a></Label></Checkbox>

                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Container')}
                                            onChange={() => this.onchangeprint('Container')}>
                                            <Label className="fontstyle normal-font" ><a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                {onChangeLanguage(locale, 'Container', languageData)}</a></Label></Checkbox>

                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Cargo Item')}
                                            onChange={() => this.onchangeprint('Cargo Item')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Cargo Item', languageData)}</a></Label></Checkbox>

                                    </div>
                                    <div className="col-md-2 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={print_option.includes('Document')}
                                            onChange={() => this.onchangeprint('Document')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Document', languageData)}</a></Label></Checkbox>
                                    </div>

                                </div>

                            </div>
                            <div>
                                <div className="publish-title1" >
                                    <Row>
                                        <Colxx xxs="12">
                                            <Label className="fontstyle"
                                                style={{ fontWeight: 700, fontSize: '15px' }}>
                                                {onChangeLanguage(locale, 'General Print Option', languageData)}
                                            </Label>
                                        </Colxx>
                                    </Row>
                                </div>

                                <div className="row" style={{ padding: '10px' }}>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Exchange Rate')}
                                            onChange={() => this.onchangegeneralprint('Exchange Rate')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Exchange Rate', languageData)}</a></Label></Checkbox>

                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Container Group')}
                                            onChange={() => this.onchangegeneralprint('Container Group')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Container Group', languageData)}</a></Label></Checkbox>

                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Fright Statement')}
                                            onChange={() => this.onchangegeneralprint('Fright Statement')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Fright Statement', languageData)}</a>
                                            </Label></Checkbox>
                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Shippers Address')}
                                            onChange={() => this.onchangegeneralprint('Shippers Address')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Shippers Address', languageData)}</a>
                                            </Label></Checkbox>

                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Consignees Address')}
                                            onChange={() => this.onchangegeneralprint('Consignees Address')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Consignees Address', languageData)}</a>
                                            </Label></Checkbox>
                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Local ROE')}
                                            onChange={() => this.onchangegeneralprint('Local ROE')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Local ROE', languageData)}</a>
                                            </Label></Checkbox>
                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('DG Details')}
                                            onChange={() => this.onchangegeneralprint('DG Details')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'DG Details', languageData)}</a>
                                            </Label></Checkbox>
                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Invoice Positions')}
                                            onChange={() => this.onchangegeneralprint('Invoice Positions')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Invoice Positions', languageData)}</a>
                                            </Label></Checkbox>
                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Traffi Currency Summary')}
                                            onChange={() => this.onchangegeneralprint('Traffi Currency Summary')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Traffi Currency Summary', languageData)}</a>
                                            </Label></Checkbox>
                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Commodity Information')}
                                            onChange={() => this.onchangegeneralprint('Commodity Information')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Commodity Information', languageData)}
                                                </a>
                                            </Label></Checkbox>
                                    </div>
                                    <div className="col-md-3 space-margin"  >
                                        <Checkbox color="blue" style={{ marginRight: '6px' }}
                                            checked={general_print.includes('Marks And Numbers')}
                                            onChange={() => this.onchangegeneralprint('Marks And Numbers')}>
                                            <Label className="fontstyle normal-font" >
                                                <a style={{ fontWeight: 700, marginLeft: '10px' }}>
                                                    {onChangeLanguage(locale, 'Marks And Numbers', languageData)}</a>
                                            </Label></Checkbox>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="row text-center" style={{ margin: '0px 5px' }}>

                            <Button className="button-width" color="primary"
                                onClick={() => this.onSubmit()}>
                                {onChangeLanguage(locale, 'Save', languageData)}
                            </Button>

                            <Button
                                style={{ width: '150px' }}
                                className="button-width" color="secondary"
                                onClick={() => this.clearvalue()}>
                                {onChangeLanguage(locale, 'Refresh', languageData)}
                            </Button>

                        </div>
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

