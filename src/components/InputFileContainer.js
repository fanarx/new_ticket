const React = require('react');
const ReactDOM = require('react-dom');
const InputList = require('./InputList');
const newId = require('../../utils/newId');

const InputFileContainer = React.createClass({
  
  getInitialState: function () {
    return {
      inputs: [],
      labels: [],
      inputLabels: {}
    }
  },
  
    onIE8Change: function (input) {
      var _this = this;
       input.attachEvent && input.attachEvent('onchange', function (e, inputId) {
          console.log('input changed', e, inputId);
          
          var inputId = $(e.srcElement).data('id');
            
          var splitted = e.srcElement.value.split('\\');
          var fileName = splitted[splitted.length - 1];
        
          if (_this.state.inputs.indexOf(inputId) > -1) {
            var newState = Object.assign({}, _this.state.inputLabels, {[inputId]: fileName});
            console.log('new state', newState);
            _this.setState({
              inputLabels: newState
            });
          }
          
        });
    },
  
  addInput: function (e) {
    console.log('e.target', e.target);
    
    var newInput = `input-${newId()}`;
    this.setState({
      inputs: [...this.state.inputs, newInput]
    }, function () {

      var input = ReactDOM.findDOMNode(this.refs['input-list'].refs[newInput]);
      
      this.onIE8Change(input);
      
      input.click();
      
    });
  },
  
  handleFileRemove: function (e) {
    console.log('inside: handleFileRemove' , e);
    var newInputs = this.state.inputs.filter(input => input !== e);
    this.setState({
      inputs: newInputs
    });
    //debugger;
  },
  
  handleChange: function (e, inputId) {
    //debugger;
console.log('inside handleChange');
    var splitted = e.target.value.split('\\');
    var fileName = splitted[splitted.length - 1];
    
    if (this.state.inputs.indexOf(inputId) > -1) {
      var newState = Object.assign({}, this.state.inputLabels, {[inputId]: fileName});
      console.log('new state', newState);
      this.setState({
        inputLabels: newState
      });
    }
  },
  
  render: function () {
    return (
      <div className="col-xs-12">
        <div className="reply-attachment" style={{paddingBottom: '15px', paddingTop: '10px'}}>
           <div onClick={this.addInput} className="btn btn-white btn-reply-attachment">
              <i className="reply-attachment-ico"></i>
           </div>
        </div>
        <InputList ref="input-list" 
                   inputs={this.state.inputs} 
                   labels={this.state.labels}
                   inputLabels={this.state.inputLabels}
                   onFileRemove={this.handleFileRemove} 
                   onChange={this.handleChange} />
      </div>
  );
  }

})

module.exports = InputFileContainer;