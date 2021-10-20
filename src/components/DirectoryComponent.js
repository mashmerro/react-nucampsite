// src/components folder will be custom components we will make
// This file is a module because there's an export. Removed all state data since this will be a presentational component
// Since this file is a React component, it MUST return a React element
// images from: public/assets/images
import React from 'react';   // Default React import, { named import called 'Component' }
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'   // import react card and breadcrumbs component
import { Link } from 'react-router-dom';    // for linking to a page (similar to <a href=>)

// renders each card with different campsite details
function RenderDirectoryItem({campsite}) { // destrucure props object
    // no constructor/ render(), only 1 return
    return (
        <Card>  
            <Link to={`/directory/${campsite.id}`}>
                <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}
// <Link to={`/directory/${campsite.id}`}></Link>   : url dynamic link that will change based on campsite clicked with their corresponding id          

function Directory(props) {     // create a child class (Directory) from parent class (Component) that we imported on line 3
    // 'directory' : variable that will return an array of elements
    //  grab the array from 'this.state.campsites' | .map() will return a new array 
    // this.state.campsites.map doesn't have a property anymore so change to -> this.props.campsites.map (since it's now being passed as props)
    const directory = props.campsites.map(campsite => {
        return (    // Notice: This return is FROM THIS ARROW FUNCTION NOT THE WHOLE COMPONENT
                    // Since we're rendering an array of elements, you MUST ADD A 'key' attribute to the parent class (this usually represents an ID {this.state.campsites.id})
                    // <Card> elements are imported from line  6, replaced: <h2> to <CardTitle>
                    // if we click on one of these cards, it will show its description
                    // <Card onClick={() => this.onCampsiteSelect(campsite)}>  onClick event handler returning the function onCampsiteSelect
            <div key={campsite.id} className="col-md-5"> 
                <RenderDirectoryItem campsite={campsite} />
            </div>
            // This is all JSX, so if we want to call something, use {}
        );
    });     
    return (        // Notice: returns 1 element (div=container parent class) and its children
                    // 'className' for React js instead of 'class' in HTML
                    // { javascript variable (line 45) is getting called (or rendered in this case) } must have curly braces inside of JSX
        <div className="container">   
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>                                                
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>  
            <div className="row">       
                {directory}             
            </div>                
        </div>
    );
    
}

/*******    MORE EXAMPLES   *******
// Local state: other parts of the app cannot see it
// To pass state data from Component A to Component B, include that data as an attribute when rendering B inside A
class ExampleParentComponent extends Component {    // 'ExampleParentComponent' is a class that will hold local state (needs a constructor)
    constructor(props) {
        super(props);
        this.state = {
            number: 333
        }
    }
    render() {
        return <ExampleChildComponent number={this.state.number} greeting="Hello World" />;     // 'number' or 'greeting' variable can be any name 
                                                                                                // as long as it's the same as the property name you're passing
                                                                                                // then provide its value (can be #'s or string)
    }
}

class ExampleChildComponent extends Component {     // 'ExampleChildComponent' is the child class, will receive 'ExampleParentComponent's data
    render() {
        return <div>{this.props.number} {this.props.greeting}</div>     // access the data 
    };
}
// Then add <ExampleParentComponent /> before the closing tag </div> on the return value of render() in class Directory
// This will add '333 Hello World' output on the webpage

************************************/

export default Directory;   // go to 'App.js' then add:  '  import Directory from './components/DirectoryComponent';   '
                            //      > still on 'App.js', render it in the return statement of 'render()' with its 
                            //         class name 'Directory' (line 7) by  ' <Directory /> '