import React from 'react';
import {useParams, Link} from 'react-router-dom';

export default function Edit() {
    let { id } = useParams();
    let obj = new Object();

    try {
        let item = localStorage.getItem(id);
        obj = JSON.parse(item); 
    }
    catch(ex) {
        return(<div>The product was not found</div>);
    }

    if(obj !== null && obj.EAN !== null) {
        return (
            <EditForm obj={obj} />
        );      
    }
    else return <h2> The product was not found </h2>;      
}

class EditForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Name: props.obj.Name,
        Type: props.obj.Type,
        EAN: props.obj.EAN,
        Weight: props.obj.Weight,
        Color: props.obj.Color,
        Quantity: props.obj.Quantity,
        Price: props.obj.Price
      };
      // Save the EAN code if it is changed
      this.EAN = props.obj.EAN;
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(event) {
        
        let updated = {
            Name: this.state.Name,
            Type: this.state.Type,
            EAN: this.state.EAN,
            Weight: this.state.Weight,
            Color: this.state.Color,
            Quantity: this.state.Quantity,
            Price: this.state.Price
        };
        
        let jsonified = JSON.stringify(updated);

        localStorage.setItem(this.EAN, jsonified);
        
        alert('You changes have been changed');
        event.preventDefault();
    }
    
    render() {
      return (
        <div className="col-md-4 offset-md-4 text-left">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label for="ean">EAN code:</label>
                    <input
                        id="ean"
                        className="form-control"
                        name="EAN"
                        type="text"
                        value={this.state.EAN}
                        onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="name">Name:</label>
                    <input
                        id="name"
                        className="form-control"
                        name="Name"
                        type="text"
                        value={this.state.Name}
                        onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="type">Type:</label>
                    <input
                        id="type"
                        className="form-control"
                        name="Type"
                        type="text"
                        value={this.state.Type}
                        onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="weight">Weight:</label>
                    <input
                        id="weight"
                        className="form-control"
                        name="Weight"
                        type="number"
                        step="0.1"
                        min="0"
                        value={this.state.Weight}
                        onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="color">Color:</label>
                    <input
                        id="color"
                        className="form-control"
                        name="Color"
                        type="text"
                        value={this.state.Color}
                        onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="qty">Quantity:</label>
                    <input
                        id="qty"
                        className="form-control"
                        name="Quantity"
                        type="number"
                        min="0"
                        step="1"
                        value={this.state.Quantity}
                        onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="price">Price:</label>
                    <input
                        id="price"
                        className="form-control"
                        name="Price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={this.state.Price}
                        onChange={this.handleInputChange} />
                </div>

                <input className="btn btn-dark mr-1" type="submit" value="Save changes" />
                <Link className="btn btn-success" to={`/`}> Go back </Link>
            </form>
        </div>
        
      );
    }
}