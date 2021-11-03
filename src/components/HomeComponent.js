import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';  // showcase features via card in homepage
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components'; // animate the card component

function RenderCard({item, isLoading, errMess}) {
    // Execute if statements is isLoading and errMess are truthy
    if (isLoading) {    
        return <Loading />;
    }
    if (errMess) {
        return <h4>{errMess}</h4>
    }
    
    // Else if falsy for both, return this:
    return (
        <FadeTransform in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
        // 'in' : is a FadeTransform attribute to run transition when being mounted
        // transformProps={{ exitTransform: 'scale(0.5) translateY(50%)'}}  : sets initial scale of 50% to normal value that makes a pop effect and move vertically
        //          : {outer curly: to embed js inside jsx {inner curly: object's properties}}
    );
}

function Home(props) {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.campsite} 
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.promotion} 
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.partner}
                        isLoading={props.partnerLoading}
                        errMess={props.partnerErrMess} />
                </div>
            </div>
        </div>
    );      // retrieved from HomeComponent
}

export default Home;