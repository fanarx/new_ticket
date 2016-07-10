const React = require('react');
const InputList = require('./InputList');
const newId = require('../../utils/newId');

const InputFileContainer = React.createClass({
  
  getInitialState: function () {
    return {
      inputs: ['input-0', 'input-1']
    }
  },
  
  addInput: function () {
    var newInput = `input-${newId()}`;
    this.setState({
      inputs: [...this.state.inputs, newInput]
    })
  },
  
  handleFileRemove: function (e) {
    console.log('inside: handleFileRemove' , e);
    var newInputs = this.state.inputs.filter(input => input !== e);
    this.setState({
      inputs: newInputs
    });
    //debugger;
  },
  
  handleChange: function (e) {
    debugger;
  },
  
  render: function () {
    return (
      <div className="col-xs-12">
        <div className="reply-attachment" style={{paddingBottom: '15px', paddingTop: '10px'}}>
           <div onClick={this.addInput} className="btn btn-white btn-reply-attachment">
              <i className="reply-attachment-ico"></i>
           </div>
        </div>
        <InputList ref="input-list" inputs={this.state.inputs} onFileRemove={this.handleFileRemove} onChange={this.handleChange} />
      </div>
  );
  }

})

module.exports = InputFileContainer;