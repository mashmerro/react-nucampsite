// src/components folder will be custom components we will make
// This file is a module because there's an export
// Since this file is a React component, it MUST return a React element
// images from: public/assets/images
import React, { Component } from 'react';   // Default React import, { named import called 'Component' }

class Directory extends Component {     // create a child class (Directory) from parent class (Component) that we imported on line 3
    constructor(props) {     // 'props' : keyword in React | constructor is not always required
        super(props);        // 'this.props' is already in the 'Component' parent class so use 'super()'
        this.state = {       // 'state' : property in React that always holds an object. 'campsites' is its property with diff arr
            campsites: [
                {
                    id: 0,
                    name: 'React Lake Campground',
                    image: 'assets/images/react-lake.jpg',
                    elevation: 1233,
                    description: "Nestled in the foothills of the Chrome Mountains, this campground on the shores of the pristine React Lake is a favorite for fly fishers."
                },
                {
                    id: 1,
                    name: 'Chrome River Campground ',
                    image: 'assets/images/chrome-river.jpg',
                    elevation: 877,
                    description: "Spend a few sunny days and starry nights beneath a canopy of old-growth firs at this enchanting spot by the Chrome River."
                },
                {
                    id: 2,
                    name: 'Breadcrumb Trail Campground',
                    image: 'assets/images/breadcrumb-trail.jpg',
                    elevation: 2901,
                    description: "Let NuCamp be your guide to this off-the-beaten-path, hike-in-only campground."
                },
                {
                    id: 3,
                    name: 'Redux Woods Campground',
                    image: 'assets/images/redux-woods.jpg',
                    elevation: 42,
                    description: "You'll never want to leave this hidden gem, deep within the lush Redux Woods."
                }
            ]
        };
    }

    render() {  // must have 1 return statement
        // 'directory' : variable that will return an array of elements
        //  grab the array from 'this.state.campsites' | .map() will return a new array 
        const directory = this.state.campsites.map(campsite => {
            return (    // Notice: This return is FROM THIS ARROW FUNCTION NOT THE WHOLE COMPONENT
                        // Since we're rendering an array of elements, you MUST ADD A 'key' attribute to the parent class (this usually represents an ID {this.state.campsites.id})
                <div key={campsite.id} className="col"> 
                    <img src={campsite.image} alt={campsites.name} />
                    <h2>{campsite.name}</h2>
                    <p>{campsite.description}</p>
                </div>
                // This is all JSX, so if we want to call something, use {}
            );
        });     
        return (        // Notice: returns 1 element (div=container parent class) and its children
                        // 'className' for React js instead of 'class' in HTML
                        // { javascript variable (line 45) is getting called (or rendered in this case) } must have curly braces inside of JSX
            <div className="container">     
                <div className="row">       
                    {directory}             
                </div>
            </div>
        );
    }
}

export default Directory;   // go to 'App.js' then add:  '  import Directory from './components/DirectoryComponent';   '
                            //      > still on 'App.js', render it in the return statement of 'render()' with its 
                            //         class name 'Directory' (line 7) by  ' <Directory /> '