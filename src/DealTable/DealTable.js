import React from 'react'
import DealRow from '../DealRow/DealRow'

const dealtable = props => {
    const allDeals = props.deals.map((deal, i) => {
      console.log("render " + i)
      return <DealRow plugin={deal.plugin} company={deal.company} details={deal.details} added={deal.added} end={deal.end} store={deal.store} click={() => props.clicked(i)} />
    })
      return (
        <table>
          <thead>
          <tr>
            <th>Plugin</th>
            <th>Company</th>
            <th>Details</th>
            <th>Added</th>
            <th>End</th>
            <th>Store</th>
          </tr>
        </thead>
        <tbody>
          { allDeals }
        </tbody>
      </table>
      );
    }

  export default dealtable;