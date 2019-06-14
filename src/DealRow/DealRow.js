import React from 'react'
const dealrow = props => {
      return (
        <tr onClick={props.click}>
            <td>{props.plugin}</td>
            <td>{props.company}</td>
            <td>{props.details}</td>
            <td>{props.added}</td>
            <td>{props.end}</td>
            <td>{props.store}</td>
        </tr>
      );
    }

  export default dealrow;