import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import DynamicTable from './DynamicTable/DynamicTable'

class App extends Component {
  state = {
    rows: [
      [ "Neutron 3", "Izotope", "30% off", "2019/6/4", "2019/6/30", "AudioDeluxe" ],
      [ "T-verb",  "Eventide", "70% off", "2019/6/3",  "2019/6/25", "JRR Shop" ],
    ]
  }

  columns = [
    { name: 'Plugin', },
    { name: 'Company' },
    { name: 'Details' },
    { name: 'Added' },
    { name: 'End' },
    { name: 'Store' },
  ]

  clickHandler = (i) => {
    const rows = [...this.state.rows]
    rows.splice(i, 1)
    this.setState({ rows: rows });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span style={ { color: "#115599" } }>Plugin</span> Database
        </header>
        <section>
          <DynamicTable columns={this.columns} clicked={ this.clickHandler } rows={this.state.rows} />
        </section>
      </div>
    );
  }
}

export default App;
