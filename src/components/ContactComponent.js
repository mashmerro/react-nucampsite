import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap'   // import react breadcrumbs component
import { Link } from 'react-router-dom';    // for linking to a page (similar to <a href=>)
import { Control, LocalForm, Errors } from 'react-redux-form';      // redux components instead of using regular form components

// Check if there's a value. If returns false, the test failed it will create an error validation
const required = val => val && val.length;  // function(val) checks => if there's a val (not underfined or null) && val.length (greater than 0)

// Check for char length
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
/*** FUNCTION EQUIVALENT: ***
 function(len) { 
     function(val) {return true if max length has not been exceeded || if val's length is less than or equal to max}
    returns true/ false for maxLength 
}
 *****/

// Check if value is a number
const isNumber = val => !isNaN(+val);   // !isNaN(+val) : +val turns the value into a number, !isNan : if it's a number

// Check for a valid email
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);    
/****  
 ^beginning of input[begins with A-Z & only chars that are valid in an email]+repeat previous[] 
 @[A-Z chars or 0-9 or .-]+repeat previous[] 
 \.required dot[domain extension A-Z]{that's 2-4 letters}$end of input/i case insensitive
.test(val)  : checks the passed in val to see if it passes the regex pattern
****/
class Contact extends Component {
    constructor (props) {
        super(props);
        this.state = {          // default values, initialize form fields input to empty string
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,       // submitting the form agrees to be contacted or not
            contactType: 'By Phone',
            feedback: '',
            touched: {      // checked if user has clicked on the input fields
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);   // bind it to the parameter 'event' == .bind(this)
    }

    // Event handler for when the user submits the form
    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));     // JSON.stringify() : global method that converts js object into a string
        alert("Current state is: " + JSON.stringify(values));
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>                                                
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>
                
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10"> 
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstName" id="firstName" name="firstName" //model=".firstName"   : tells redux to store in the property 'firstName'
                                        placeholder="First Name"    
                                        className="form-control"        // add with redux instead of <input>       
                                        validators={{                   // redux validator attribute
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}             
                                    />
                                    <Errors                             // attributes of error validation
                                        className="text-danger"         // color red
                                        model=".firstName"              // points to firstName property from state
                                        show="touched"                  // show the validation when it's been touched (additional state we added in this class)
                                        component="div"                 // wrap each error message in a div
                                        messages={{                     // messages if it returns false with these conditions:
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastName" id="lastName" name="lastName"   //model=".lastName" : always the same as attribute 'name' with a dot
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} 
                                    />  
                                    <Errors 
                                        className="text-danger"        
                                        model=".lastName"              
                                        show="touched"                  
                                        component="div"               
                                        messages={{                   
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>                        
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Control.text model=".phoneNum" id="phoneNum" name="phoneNum"   //model=".phoneNum"    : 'model' is similar to 'value' in a form html
                                        placeholder="Phone number"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(10),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }}   
                                    />
                                    <Errors 
                                        className="text-danger"        
                                        model=".phoneNum"              
                                        show="touched"                  
                                        component="div"               
                                        messages={{                   
                                            required: 'Required',
                                            minLength: 'Must be at least 10 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required,
                                            validEmail
                                        }}   
                                    />
                                    <Errors 
                                        className="text-danger"        
                                        model=".email"              
                                        show="touched"                  
                                        component="div"               
                                        messages={{                   
                                            required: 'Required',
                                            validEmail: 'Invalid email address'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 4, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox
                                                model=".agree"
                                                name="agree"
                                                className="form-check-input"
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Control.select model=".contactType" name="contactType"
                                            className="form-control">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="12"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;

// <Col md={10}> is similar to:  <div className="col-md-10">       (Can use interchangeably)
// <Col md={{size: 4, offset: 2}}>  is similar to:  <div className="col-md-4 offset-md-2">     (sets responsize col size and responsive offset)
// 'value' attribute  : for input fields
// 'invalid' attribute  : for input fields with errors validating
// 'checked' attribute    : for checkbox
// 'onChange' attribute : set on input fields for an event handler
// 'onSubmit' attribute :  set on the whole form field for an event handler
// 'onBlur' attribute   : set on input fields for when user enters and moves away from this field firing an event handler
// <FormFeedback>   : element to show error messages

/***********  BEFORE REDUX: ***********
this.handleSubmit = this.handleSubmit.bind(this);   // bind it to the parameter 'event' == .bind(this)

// Method for validating input fields (args)
    validate(firstName, lastName, phoneNum, email) {    // holds error messages for each fields in the arg
        const errors = {    // initialize as en empty string (no errors)
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        };
        
        // First name field 
        if (this.state.touched.firstName) { 
            if (firstName.length < 2) {
                errors.firstName = 'First name must be at least 2 characters.';
            } else if (firstName.length > 15) {
                errors.firstName = 'First name must be 15 or less characters.';
            }
        }

        // Last name field
        if (this.state.touched.lastName) {
            if (lastName.length < 2) {
                errors.lastName = 'Last name must be at least 2 characters.';
            } else if (lastName.length > 15) {
                errors.lastName = 'Last name must be 15 or less characters.';
            }
        }

        // Phone number field
        const reg = /^\d+$/;    // checking the phone value making sure it only contains digits (returns boolean)
        if (this.state.touched.phoneNum && !reg.test(phoneNum)) {   // has the phone field been touched & does it have only digits
            errors.phoneNum = 'The phone number should contain only numbers.';
        }

        if (this.state.touched.email && !email.includes('@')) {     // has the email field been touched & does the email field contain an '@' 
            errors.email = 'Email should contain an @';
        }

        return errors;  // now storing it in 'validate' method. returns error object (either default to an empty string or corresponding property with an error message)
    };

    // Event handler for when the user submits the form
    handleSubmit(event) {
        console.log("Current state is: " + JSON.stringify(this.state));     // JSON.stringify() : global method that converts js object into a string
        alert("Current state is: " + JSON.stringify(this.state));
        event.preventDefault();
    }

 // Event handler for when the user has entered an input field and leaves it
 handleBlur = (field) => () => {     // arrow function is similar to :   this.handleBlur = this.handleBlur.bind(this); 
    this.setState({
        touched: {...this.state.touched, [field]: true} // we don't wanna change the entire 'touched' object
        // [field]  : property that triggered this event, 'true': so we know it's been touched
    });
}

// Event handler for when the user makes changes on the input fields
handleInputChange(event) {
    // Makes it easier to reference target and name
    const target = event.target;    
    const name = target.name;   // event.target.name
    const value = target.type === 'checkbox' ? target.checked : target.value; 
    // if-- target type triggered is a checkbox, then-- we get the value from the target's checked attribute (boolean), 
    //      if not-- we get it from the target's value

    this.setState({     // change this.state
        [name]: value       // change the 'name' property to value
        // We want 'name' to be flexible depending on what triggered this event (all input fields)
    });
}

render() {
    // anytime there's a change in the input fields, calls 'validate' method with its args and stores it in 'errors' variable
    const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email); // 'errors' is a local variable (diff from 'validate' method above)
    // set this 'errors' variable in the 'invalid' attribute on inputs we're validating
    return();
}
*********************************************/