var React = require('react');

const InputList = React.createClass({
  propTypes: {
    inputs: React.PropTypes.array.isRequired,
    onFileRemove: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  },
  
  render: function () {
    
    let inputs = this.props.inputs.map(input => 
    <input onChange={this.props.onChange} type="file" key={input} multiple />
    );
    
    let inputLabels = this.props.inputs.map(input =>
      <span key={input} className="label label-default">{input} <i data-item={input} style={{cursor: 'pointer'}} onClick={this.props.onFileRemove.bind(null, input)}> X </i></span>
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