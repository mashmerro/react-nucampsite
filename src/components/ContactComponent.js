import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap'   // import react breadcrumbs component
import { Link } from 'react-router-dom';    // for linking to a page (similar to <a href=>)

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
        this.handleInputChange = this.handleInputChange.bind(this); // bind it to the parameter 'event' == .bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);   // bind it to the parameter 'event' == .bind(this)
    }

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

    // Event handler for when the user submits the form
    handleSubmit(event) {
        console.log("Current state is: " + JSON.stringify(this.state));     // JSON.stringify() : global method that converts js object into a string
        alert("Current state is: " + JSON.stringify(this.state));
        event.preventDefault();     // .preventDefault()    : submitting a form usually refreshes a page so this stops that
    }

    render () {
        // anytime there's a change in the input fields, calls 'validate' method with its args and stores it in 'errors' variable
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email); // 'errors' is a local variable (diff from 'validate' method above)
        // set this 'errors' variable in the 'invalid' attribute on inputs we're validating
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
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"                                        
                                        value={this.state.firstName}
                                        invalid={errors.firstName}
                                        onBlur={this.handleBlur("firstName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        invalid={errors.lastName}
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        invalid={errors.phoneNum}
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phoneNum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        invalid={errors.email}
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 4, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" name="feedback"
                                        rows="12"
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
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