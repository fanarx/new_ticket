var React = require('react');

const InputList = React.createClass({
  propTypes: {
    inputs: React.PropTypes.array.isRequired,
    labels: React.PropTypes.array.isRequired,
    inputLabels: React.PropTypes.object.isRequired,
    onFileRemove: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  
  render: function () {
    console.log('this.props.inputLabels',this.props.inputLabels);
    let inputs = this.props.inputs.map(input => 
    <input ref={input} onChange={(evt) => this.props.onChange(evt, input)} type="file" data-id={input} key={input} multiple />
    );
    
    let inputLabels = this.props.inputs.map(input => {
       
       if (this.props.inputLabels[input]) {
         console.log('innnnnnnn is working');
        return  <span key={input} className="label label-default">{this.props.inputLabels[input]} <i data-item={input} style={{cursor: 'pointer'}} onClick={this.props.onFileRemove.bind(null, input)}> X </i></span>
      }
    }
    
    
    );
    
    return (
      <div>
        {inputs}
        <div className="well">
          {inputLabels}
        </div>
      </div>
  );
  }

})

module.exports = InputList;