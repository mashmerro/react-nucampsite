import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, Label  } from 'reactstrap'
import { Link } from 'react-router-dom';    // for linking to a page (similar to <a href=>)
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            touched: {
                name: false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {           
        this.setState({         
            isModalOpen: !this.state.isModalOpen    
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);    
        // when form is submitted, postComment action creator will create an action (using the values from this form)
    }

    render() {
         return(
             <div>
                <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" /> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select defaultValue="1" model=".rating" id="rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                    validators={{      
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }} 
                                />
                                <Errors                             
                                        className="text-danger"        
                                        model=".author"       
                                        show="touched"           
                                        component="div"                 
                                        messages={{                    
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea model=".text" id="text" name="text" rows="6" className="form-control"/>
                            </div>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal> 
             </div>  
         );
     };
 }

// 3 FUNCTIONAL COMPONENTS
function RenderCampsite({campsite}) {   // destructure campsite property from the props object
    return(
        <div className="col-md-5 m-1">
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
        // 'in' : is a FadeTransform attribute to run transition when being mounted
        // transformProps={{ exitTransform: 'scale(0.5) translateY(50%)'}}  : sets initial scale of 50% to normal value that makes a pop effect and move vertically
        //          : {outer curly: to embed js inside jsx {inner curly: object's properties}}
    );
}

function RenderComments({comments, postComment, campsiteId}) {   // destructure object properties from the props
    if (comments) {
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                                <div>
                                    <p>{comment.text}<br/>
                                        --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', 
                                        day: '2-digit'}).format(new Date(Date.parse(comment.date)))
                                        }
                                    </p>
                                </div>
                            </Fade>
                        );  // fade effect in each comments as they're rendered
                        // stagger animation for all comments (one by one)
                    })}
                </Stagger>  
                <CommentForm campsiteId={campsiteId} postComment={postComment} /> 
            </div>
                // <CommentForm pass the campsiteId and postComment to its child component/>
        );
    }
    return <div />
}

function CampsiteInfo(props) {
    // To wait for the server to be loaded
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    // If there's an error on the server when we try to fetch campsite's data
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    
    if (props.campsite) {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>                                                    
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id} />
                </div>
            </div>
        );
    }
    return <div />
}

// CLASS COMPONENT EXAMPLE EQUIVALENT TO 3 FUNCTIONAL COMPONENTS 
/*          EX:
class CampsiteInfo extends Component {
    renderCampsite(campsite) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(comments) {
        if (comments) {
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => 
                        <div key={comment.id} className="pb-3">{comment.text}<br/>
                            --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </div>)
                    }
                </div>
            );
        }
        return <div />
    }

    render() {
        if (this.props.campsite) {
            return(
                <div className="container">
                    <div className="row">
                        {this.renderCampsite(this.props.campsite)}
                        {this.renderComments(this.props.campsite.comments)}
                    </div>
                </div>
            );
        }
        return <div />
    }
}
*/
export default CampsiteInfo;