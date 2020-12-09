import React, { Component } from 'react'
import './Form.css';
import actions from "../../store/actions"
import { connect } from 'react-redux'

let FIRST_NAME_INPUT_FIELD_NAME = "firstName";
let LAST_NAME_INPUT_FIELD_NAME = "lastName";
let EMAIL_INPUT_FIELD_NAME = "email";
let PHONE_NUMBER_INPUT_FIELD_NAME = "phoneNumber";

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitText: "",
            firstName: {
                value: '',
                label: "First Name",
                required: true,
                errorMsg: "",
                errorMsgOptions: {
                    emptyValue: 'You must fill this field',
                    invalidValue: 'First name can not contain characters other than letters'
                },
                validationFunc: (value) => /^[a-z ,.'-]+$/i.test(value)
            },
            lastName: {
                value: "",
                label: "Last Name",
                required: true,
                errorMsg: "",
                errorMsgOptions: {
                    emptyValue: 'You must fill this field',
                    invalidValue: 'Last name can not contain characters other than letters'
                },
                validationFunc: (value) => /^[a-z ,.'-]+$/i.test(value)
            },
            email: {
                value: "",
                label: "Email",
                required: true,
                errorMsg: "",
                errorMsgOptions: {
                    emptyValue: 'You must fill this field',
                    invalidValue: 'Please enter a valid email address'
                },
                validationFunc: (value) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)
            },
            phoneNumber: {
                value: '',
                label: "Cell Number",
                required: true,
                errorMsg: "",
                errorMsgOptions: {
                    emptyValue: 'You must fill this field',
                    invalidValue: 'Please enter a valid phone number (Ex. XXX-XXXXXXX)'
                },
                validationFunc: (value) => /[0-9]{3}-[0-9]{7}/.test(value)
            },
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.checkFormValidity()
            ? this.setState({submitText: "Form submitted successfully!"})
            : this.setState({submitText: "Submitting failed! Some fields were not filled correctly."})
        console.log(this.checkFormValidity())
    };

    checkFormValidity = () => {
        return this.props.firstName
        && this.props.lastName
        && this.props.email
        && this.props.phoneNumber;
    }

    onChangeValue = (event) => {
        const state = { ...this.state }[event.target.name];
        const { value } = event.target;
        console.log("state", event.target.name)
        state["value"] = value;
        let update = {};
        switch(event.target.name) {
            case FIRST_NAME_INPUT_FIELD_NAME:
                update = {firstName: state};
                break;
            case LAST_NAME_INPUT_FIELD_NAME:
                update = {lastName: state};
                break;
            case EMAIL_INPUT_FIELD_NAME:
                update = {email: state};
                break;
            case PHONE_NUMBER_INPUT_FIELD_NAME:
                update = {phoneNumber: state}
                break;
            default:
                update = {};
        }
        this.setState(update);
    }

    onInputFocusOut = (event) => {
        this.updateValidationText(event.target.name);
    }

    updateValidationText = (inputFieldName) => {
        const inputRowState = this.state[inputFieldName];
        let newErrMsg = "";
        if(inputRowState.validationFunc(inputRowState.value)) {
            this.props.setValidated({inputFieldName: inputFieldName, newValue: true})
        }
        else {
            this.props.setValidated({inputFieldName: inputFieldName, newValue: false})
            if(inputRowState.value === "") {
                newErrMsg = inputRowState.errorMsgOptions.emptyValue;
            }
            else {
                newErrMsg = inputRowState.errorMsgOptions.invalidValue;
            }
        }
        inputRowState["errorMsg"] = newErrMsg;
        let update = {};
        switch(inputFieldName) {
            case FIRST_NAME_INPUT_FIELD_NAME:
                update = {firstName: inputRowState};
                break;
            case LAST_NAME_INPUT_FIELD_NAME:
                update = {lastName: inputRowState};
                break;
            case EMAIL_INPUT_FIELD_NAME:
                update = {email: inputRowState};
                break;
            case PHONE_NUMBER_INPUT_FIELD_NAME:
                update = {phoneNumber: inputRowState}
                break;
            default:
                update = {};
        }
        this.setState(update);
    }

    InputRow = (props) => {
        return <div className="input-row-wrapper">
            <div className="input-row-inner-wrapper">
                <label className="input-label">{props.label}:</label>
                <input
                    className="input-row"
                    name={props.name}
                    type="text"
                    placeholder={props.exampleText}
                    value={props.value}
                    onBlurCapture={this.onInputFocusOut}
                    onChange={this.onChangeValue}
                    required
                />
            </div>
            <div className="invalid-text-row">{props.errorMsg}</div>
        </div>
    }

    render() {
        return <div className="form-wrapper">
            <form className="form"
                noValidate
                onSubmit={this.onSubmit}>
                <this.InputRow
                    label={this.state.firstName.label}
                    name={FIRST_NAME_INPUT_FIELD_NAME}
                    exampleText="Ex. Tom"
                    value={this.state.firstName.value}
                    errorMsg={this.state.firstName.errorMsg}
                />
                <this.InputRow
                    label={this.state.lastName.label}
                    name={LAST_NAME_INPUT_FIELD_NAME}
                    exampleText="Ex. Gropper"
                    value={this.state.lastName.value}
                    errorMsg={this.state.lastName.errorMsg}
                />
                <this.InputRow
                    label={this.state.email.label}
                    name={EMAIL_INPUT_FIELD_NAME}
                    exampleText="Ex. GropperTom@Gmail.com"
                    value={this.state.email.value}
                    errorMsg={this.state.email.errorMsg}
                />
                <this.InputRow
                    label={this.state.phoneNumber.label}
                    name={PHONE_NUMBER_INPUT_FIELD_NAME}
                    exampleText="Ex. 123-4567890"
                    value={this.state.phoneNumber.value}
                    errorMsg={this.state.phoneNumber.errorMsg}
                />
                <div className="submit-button-wrapper">
                    <button className="submit-button" type="submit">Submit</button>
                    <b>{this.state.submitText}</b>
                </div>
            </form>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phoneNumber: state.phoneNumber
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setValidated: (value) => { dispatch(actions.setValidated(value))}
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
