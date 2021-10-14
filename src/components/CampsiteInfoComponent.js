import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

// 3 FUNCTIONAL COMPONENTS
function RenderCampsite({campsite}) {   // destructure campsite property from the props object
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

function RenderComments({comments}) {   // destructure comments property from the props object
    if (comments) {
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => 
                    <div key={comment.id} className="pb-3">
                        <p>{comment.text}<br/>
                        --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', 
                        day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p>
                    </div>)
                }
            </div>
        );
    }
    return <div />
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return(
            <div className="container">
                <div className="row">
                    <RenderCampsite campsite={(props.campsite)} />
                    <RenderComments comments={(props.campsite.comments)} />
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