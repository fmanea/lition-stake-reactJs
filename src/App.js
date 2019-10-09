import React from 'react';
import { Component } from 'react';
import { Button, Form, textFormPairContainer, Label, Input, FormText } from 'reactstrap';
import './App.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import logo from './lition_logo_bw_black.png';
import Switch from "react-switch";



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
    value: 10
  },
  {
    value: 20
  },
  {
    value: 30
  },
  {
    value: 40,
    label: '100k',
  },
  {
    value: 50
  },
  {
    value: 60
  },
  {
    value: 70
  },

  {
    value: 80,
    label: '200k',
  },
  {
    value: 90
  },
  {
    value: 100
  },
  {
    value: 110
  },
  {
    value: 120,
    label: '300k',
  },
  {
    value: 130
  },
  {
    value: 140
  },
  {
    value: 150
  },
  {
    value: 160,
    label: '400k',
  },
  {
    value: 170
  },
  {
    value: 180
  },
  {
    value: 190
  },
  {
    value: 200,
    label: '500k',
  },
];

const marksUseCases = [
  {
    value: 4,
    label: '4',
  },
  {
    value: 8
  },
  {
    value: 12
  },
  {
    value: 16
  },
  {
    value: 20
  },
  {
    value: 24
  },
  {
    value: 28
  },
  {
    value: 32
  },
  {
    value: 36,
  },
  {
    value: 40
  },
  {
    value: 44
  },
  {
    value: 48
  },
  {
    value: 52
  },
  {
    value: 56
  },
  {
    value: 60
  },
  {
    value: 64
  },
  {
    value: 68
  },
  {
    value: 72
  },
  {
    value: 76
  },
  {
    value: 80
  },
  {
    value: 84
  },
  {
    value: 88
  },
  {
    value: 92
  },
  {
    value: 96
  },
  {
    value: 100,
    label: '100',
  },
];

const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const StakedTokensSlider = withStyles({
  root: {
    color: '#30acc1',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    border: '5px solid #30acc1',
    marginTop: -12,
    marginLeft: -14,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  track: {
    height: 6,
    backgroundColor: '#30acc1',
  },
  rail: {
    height: 6,
    opacity: 0.3,
    backgroundColor: '#30acc1',
  },
  mark: {
    backgroundColor: '#30acc1',
    height: 6,
    width: 1,
    marginTop: 6,

  },
  markActive: {
    opacity: 1,
    backgroundColor: '#30acc1',
  },
  markLabel: {
    marginTop: 10
  }
})(Slider);

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
      genesisPhaseCheckboxState: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleStakedTokensSlider = this.handleStakedTokensSlider.bind(this);
    this.handleUseCasesSlider = this.handleUseCasesSlider.bind(this);

  }

  result = () => {
    if (this.state.isGenesisPhase == true) {
      return (this.state.stakedTokens * this.state.tokenPrice * 0.1 * this.state.nodeCategory / 365);
    }
    return (this.state.stakedTokens * 0.00001 * this.state.txNumber * this.state.txCost / 800 * parseFloat(this.state.nodeCategory));
  };

  normalResult = () => {
    return (this.state.stakedTokens * 0.00001 * this.state.txNumber * this.state.txCost / 800 * parseFloat(this.state.nodeCategory));
  };

  handleChange(evt) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [evt.target.name]: evt.target.value }, () => this.checkDisableGenesisPhase());
    if (evt.target.name == "useCases") {
      let newTxNumber = evt.target.value * 20000;
      this.setState({ "txNumber": newTxNumber }, () => this.checkDisableGenesisPhase());
    }
    if (evt.target.name == "tokenPrice") {
      let newTxCost = (evt.target.value * 0.1).toFixed(2);
      this.setState({ "txCost": newTxCost }, () => this.checkDisableGenesisPhase());
    }

  }

  checkDisableGenesisPhase() {

    if ((this.normalResult() * 365) > (this.state.tokenPrice * this.state.stakedTokens * 0.1 * this.state.nodeCategory )) {
      this.setState({ "genesisPhaseCheckboxState": true });
      this.setState({ "isGenesisPhase": false });
    }
    else {
      this.setState({ "genesisPhaseCheckboxState": false });
    }

  }

  handleCheckboxChange(evt) {
    this.setState({ "isGenesisPhase": evt });
  }

  handleStakedTokensSlider(evt, value) {
    this.setState({ "stakedTokens": value * 2500 });
  }

  handleUseCasesSlider(evt, value) {
    let newTxNumber = value * 20000;
    this.setState({ "useCases": value });
    this.setState({ "txNumber": newTxNumber }, () => this.checkDisableGenesisPhase());
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
      <div className='container'>
        <div className='content'>

          <div className='imageContainer'>
            <img className='litionLogoImage' src={logo} />
            <span>
              Staking
               <br />
              Calculator
              </span>
          </div>
          <div className="userInputContainer">
            <div className='textFormPairContainer'>
              <p >Staked Tokens</p>
              <p className="litAmmount">{this.state.stakedTokens + " LIT"}</p>
              <StakedTokensSlider className="stakedTokensSlider"
                name="stakedTokens"
                aria-label="discrete-slider-small-steps"
                defaultValue={1}
                marks={marks}
                valueLabelDisplay="off"
                min={0}
                max={200}
                step={1}
                onChange={this.handleStakedTokensSlider}
              />
            </div>
            <div className='textFormPairContainer'>
              <p >Use Cases</p>
              <p className="litAmmount">{this.state.useCases}</p>
              <StakedTokensSlider 
                name="useCases"
                aria-label="discrete-slider-small-steps"
                defaultValue={1}
                marks={marksUseCases}
                valueLabelDisplay="off"
                min={4}
                max={100}
                step={1}
                onChange={this.handleUseCasesSlider}
              />
            </div>
            <div className='textFormPairContainer'>
              <p>Node Type</p>
              <Input type="select" name="nodeCategory" id="nodeCategorySelect" className='inputContainer' onChange={this.handleChange} >
                <option value="1">Node</option>
                <option value="2">Trust Node</option>
                <option value="1.2">Lition Pool Staking 1 Month</option>
                <option value="1.4">Lition Pool Staking 3 Months</option>
                <option value="1.6">Lition Pool Staking 6 Months</option>
                <option value="1.8">Lition Pool Staking 12 Months</option>
              </Input>
            </div>

            <div className='textFormPairContainer'>
              <p>Average Number of Transactions</p>
              <Input type="number" name="txNumber" step="1000" className='inputContainer' value={this.state.txNumber} onChange={this.handleChange} />
            </div>

            <div className='textFormPairContainer'>
              <p>Cost Per Transaction(USD)</p>
              <Input type="number" name="txCost" step="0.01" className='inputContainer' value={this.state.txCost} onChange={this.handleChange} />
            </div>

            <div className='textFormPairContainer'>
              <p>Lition Token Price(USD)</p>
              <Input type="number" name="tokenPrice"  step="0.1" className='inputContainer' value={this.state.tokenPrice} onChange={this.handleChange} />
            </div>

            <div className='textFormPairContainer'>
              <label>Activate Genesis Phase</label>
              <Switch
                name="isGenesisPhase"
                checked={this.state.isGenesisPhase}
                onChange={this.handleCheckboxChange}
                disabled={this.state.genesisPhaseCheckboxState}
                onColor="#30acc1"
                onHandleColor="#30acc1"
                handleDiameter={28}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={15}
                width={50}
                className="react-switch"
                id="material-switch"
              />
            </div>

          </div>
          <div className='resultingIncomeContainer'>
            <p>Resulting Income</p>
            <p>{(this.result()).toFixed(2) + "$"}/day</p>
            <p>{(this.result() * 30).toFixed(2) + "$"}/month</p>
            <p>{(this.result() * 365).toFixed(2) + "$"}/year</p>
            <p>{(this.result() * 365 / this.state.tokenPrice / this.state.stakedTokens * 100).toFixed(2) + "%"} - annual Staking Rate</p>
            <p>{(this.state.tokenPrice * this.state.stakedTokens).toFixed(2) + "$"} - my LIT value</p>
          </div>
          <div className='optionalInformationContainer'>
            <a href="https://medium.com/lition-blog/lit-staking-update-33d4035082c8<">Medium Article</a>
            <a href="https://github.com/fmanea/lition-stake-reactJs.git/">GitHub Link</a>
            <a href="https://etherscan.io/address/0x8e4b7c6aE8EC30cbf7Bb6F0a6DD87AB96e3710eb">Donate 1 lit</a>
          </div>
        </div>
      </div>
    );
  }
}


function App() {
  return (new Login()
  );
}

export default App;










