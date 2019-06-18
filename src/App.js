import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import DynamicTable from './DynamicTable/DynamicTable'

class App extends Component {
  state = {
    rows: [
      { id: 1, name: "Neutron 3", company: "Izotope", details: "30% off", added: "2019/6/4", ends: "2019/6/30", link: { text: "AudioDeluxe", url: "https://www.audiodeluxe.com/products/audio-plug-ins/izotope-neutron-3-advanced" }},
      { id: 2, name: "Tverb", company: "Eventide", details: "70% off", added: "2019/6/3", ends: "2019/6/25", link: { text: "JRR Shop", url: "https://www.jrrshop.com/eventide-tverb" }},
      { id: 3, name: "Addictive Drums", company: "XLN Audio", details: "50% off", added: "2019/6/2", ends: "2019/6/25", link: { text: "AudioDeluxe", url: "https://www.audiodeluxe.com/products/xln-audio-addictive-drums-2-custom" }},
    ]
  }

  columns = [
    { title: 'Plugin', key: 'name' },
    { title: 'Company', key: 'company' },
    { title: 'Details', key: 'details' },
    { title: 'Added', key: 'added' },
    { title: 'End', key: 'ends' },
    { title: 'Store', key: 'link', type: 'link' },
  ]

  clickHandler = (id) => {
    const rows = [...this.state.rows]
    rows.splice(rows.findIndex(r => r.id === id), 1)
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
