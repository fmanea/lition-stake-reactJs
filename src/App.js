import React from 'react';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './App.css';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      stakedTokens: 1000,
      tokenPrice: 0.1,
      txNumber: 80000,
      txCost: 0.01,
      nodeCategory: 1.0,
      isGenesisPhase: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    
  }

  result = () => { 
    if (this.state.isGenesisPhase== true)
    {
      return (this.state.stakedTokens * 0.00001 * this.state.txNumber * this.state.txCost / 800 * parseFloat(this.state.nodeCategory)*2.74 );
    }
    return (this.state.stakedTokens * 0.00001 * this.state.txNumber * this.state.txCost / 800 * parseFloat(this.state.nodeCategory) );
   };

  handleChange(evt) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleCheckboxChange(evt)
  {
    this.setState({ [evt.target.name]: evt.target.checked });
  }

  render() {
    return (
      <form>
        <FormGroup>
          <label>Staked Tokens</label>
          <input type="number" name="stakedTokens" value={this.state.stakedTokens} onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <label>Lition Token Price(USD)</label>
          <input type="number" name="tokenPrice" value={this.state.tokenPrice} onChange={this.handleChange} />
        </FormGroup> 

        <FormGroup>
          <label>Average Number of Transactions</label>
          <input type="number" name="txNumber" value={this.state.txNumber} onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <label>Per Transaction Cost(USD)</label>
          <input type="number" name="txCost" value={this.state.txCost} onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for="nodeCategorySelect">Node Category</Label>
          <Input type="select" name="nodeCategory" id="nodeCategorySelect" onChange={this.handleChange} >
            <option value="1">Node</option>
            <option value="2">Trust Node</option>
            <option value="1.2">Lition Pool Staking 1 Month</option>
            <option value="1.4">Lition Pool Staking 3 Months</option>
            <option value="1.6">Lition Pool Staking 6 Months</option>
            <option value="1.8">Lition Pool Staking 12 Months</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <label>Genesis Phase Activated</label>
          <input type="checkbox" name="isGenesisPhase" onChange={this.handleCheckboxChange} />
        </FormGroup>

        <FormGroup>
          <label>My Current Lition Value(USD) =    </label>
          <label>{(this.state.tokenPrice*this.state.stakedTokens).toFixed(2) + "$"}</label>
        </FormGroup>

        <FormGroup>
          <label>Average Daily Earning(USD) =    </label>
          <label>{(this.result()).toFixed(2)+"$"}</label>
        </FormGroup>

        <FormGroup>
          <label>Average Monthly Earning(USD) =    </label>
          <label>{(this.result() *30).toFixed(2)+"$"}</label>
        </FormGroup>

        <FormGroup>
          <label>Average Yearly Earning(USD) =    </label>
          <label>{(this.result() *365).toFixed(2)+"$"}</label>
        </FormGroup>

        <FormGroup>
          <label>Annual Staking Rate =    </label>
          <label>{(this.result() *365 / this.state.tokenPrice / this.state.stakedTokens * 100 ).toFixed(2)+"%"}</label>
        </FormGroup>
        <FormGroup>
          <label>Contribute 1 lit for this community tool (ETH Wallet) =    </label>
          <label>0x8e4b7c6aE8EC30cbf7Bb6F0a6DD87AB96e3710eb</label>
        </FormGroup>
        <FormGroup>
          <label>GitHub Link for improvements =    </label>
          <label>https://github.com/fmanea/lition-stake-reactJs.git</label>
        </FormGroup>

      </form>
    );
  }
}


function App() {
  return (new Login()
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  );
}



export default App;
