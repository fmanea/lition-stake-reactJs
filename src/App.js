import React from 'react';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 5
  },
  {
    value: 10
  },
  {
    value: 15
  },
  {
    value: 20,
    label: '20k',
  },
  {
    value: 40 ,
    label: '40k',
  },
  {
    value: 60,
    label: '60k',
  },
  {
    value: 80,
    label: '80k',
  },
  {
    value: 100,
    label: '100k',
  },
];

function valuetext(value) {
  return `${value}k`;
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}


class Login extends Component {

  constructor() {
    super();
    this.state = {
      stakedTokens: 1000,
      tokenPrice: 0.1,
      useCases: 4,
      txNumber: 80000,
      txCost: 0.01,
      nodeCategory: 1.0,
      isGenesisPhase: false,
      genesisPhaseCheckboxState: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

  }

  result = () => {
    if (this.state.isGenesisPhase == true) {
      return (this.state.stakedTokens * 0.00001 * this.state.txNumber * this.state.txCost / 800 * parseFloat(this.state.nodeCategory) * 2.74);
    }
    return (this.state.stakedTokens * 0.00001 * this.state.txNumber * this.state.txCost / 800 * parseFloat(this.state.nodeCategory));
  };


  handleChange(evt) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [evt.target.name]: evt.target.value }, () => this.checkDisableGenesisPhase());
    if ( evt.target.name == "useCases" )
    {
      let newTxNumber = evt.target.value * 20000;
      this.setState( { "txNumber" : newTxNumber }, () => this.checkDisableGenesisPhase());
    }
    
  }

  checkDisableGenesisPhase(){
    
    if ( (this.result() * 365) > (this.state.tokenPrice * this.state.stakedTokens * 0.2)) 
    {
      this.setState( { "genesisPhaseCheckboxState" : "true" } );
    }
    else
    {
      this.setState( { "genesisPhaseCheckboxState" : "" } );
    }

  }

  handleCheckboxChange(evt) {
    this.setState({ [evt.target.name]: evt.target.checked });
  }


  render() {
    const classes = makeStyles(theme => ({
      root: {
        width: 300,
      },
      margin: {
        height: theme.spacing(3),
      },
    }));
    return (
      <div className={classes.root}>
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
            <Label for="useCasesSelect">Use Cases</Label>
            <Input type="select" name="useCases" id="useCasesSelect" onChange={this.handleChange} >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="30">30</option>
              <option value="60">60</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <label>Average Number of Transactions</label>
            <input type="number" name="txNumber" value={this.state.txNumber} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Cost Per Transaction(USD)</label>
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
            <input type="checkbox" name="isGenesisPhase" className="form-check-input" onChange={this.handleCheckboxChange}  disabled={this.state.genesisPhaseCheckboxState} />
          </FormGroup>

          <FormGroup>
            <label>My Current Lition Value(USD) =    </label>
            <label>{(this.state.tokenPrice * this.state.stakedTokens).toFixed(2) + "$"}</label>
          </FormGroup>

          <FormGroup>
            <label>Average Daily Earning(USD) =    </label>
            <label>{(this.result()).toFixed(2) + "$"}</label>
          </FormGroup>

          <FormGroup>
            <label>Average Monthly Earning(USD) =    </label>
            <label>{(this.result() * 30).toFixed(2) + "$"}</label>
          </FormGroup>

          <FormGroup>
            <label>Average Yearly Earning(USD) =    </label>
            <label>{(this.result() * 365).toFixed(2) + "$"}</label>
          </FormGroup>

          <FormGroup>
            <label>Annual Staking Rate =    </label>
            <label>{(this.result() * 365 / this.state.tokenPrice / this.state.stakedTokens * 100).toFixed(2) + "%"}</label>
          </FormGroup>
          <label>Assumption: Lition Transaction is always 10% of Lition Price</label>
          <FormGroup>
            <label>Contribute 1 lit for this community tool (ETH Wallet) =    </label>
            <label>0x8e4b7c6aE8EC30cbf7Bb6F0a6DD87AB96e3710eb</label>
          </FormGroup>
          <FormGroup>
            <label>GitHub Link for improvements =    </label>
            <a>https://github.com/fmanea/lition-stake-reactJs.git/</a>
          </FormGroup>
          <FormGroup>
            <label>Medium article used for calculation =    </label>
            <a>https://medium.com/lition-blog/lit-staking-update-33d4035082c8</a>
          </FormGroup>

        </form>
      {/* A JSX comment 

        <div className={classes.margin} />
        <Typography id="discrete-slider-small-steps" gutterBottom>
          Custom marks
      </Typography>
        <Slider
          defaultValue={0}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={100}
        /> */}
       
      </div>
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










