import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';  // showcase features via card in homepage
import { Loading } from './LoadingComponent';

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
        <Card>
            <CardImg src={item.image} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
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
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>
        </div>
    );      // retrieved from HomeComponent
}

export default Home;