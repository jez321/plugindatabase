import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import DealRow from './DealRow/DealRow'
import DealTable from './DealTable/DealTable'

class App extends Component {
  state = {
    deals: [
      { plugin: "Neutron 3", company: "Izotope", details: "30% off", added: "2019/6/4", end: "2019/6/30", store: "AudioDeluxe" },
      { plugin: "T-verb", company: "Eventide", details: "70% off", added: "2019/6/3", end: "2019/6/25", store: "JRR Shop" },
    ]
  }

  clickHandler = (i) => {
    const deals = [...this.state.deals]
    deals.splice(i, 1)
    this.setState({ deals: deals });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span style={ { color: "#115599" } }>Plugin</span> Database
        </header>
        <div>
          <DealTable clicked={ this.clickHandler } deals={this.state.deals} />
        </div>
      </div>
    );
  }
}

export default App;
