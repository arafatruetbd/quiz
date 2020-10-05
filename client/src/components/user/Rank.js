import React, { Fragment } from 'react';

const Rank = ({r,index}) => {
 return (
  <Fragment>
  <table className="table" style={{textAlign:'center'}}>
    {index < 1 ? (
      <thead>
      <tr>
        <th className="hide-sm">Username</th>
        <th className="hide-sm">Score</th>
        <th className="hide-sm">Rank</th>      
      </tr>
    </thead>
    ) : '' }
    
    <tbody>
      <tr>
     <td>{r.user.username}</td>
     <td>{r.score}</td>
     <td>{index+1}</td>
      </tr>
    </tbody>
  </table>
</Fragment>
 ) 
}

export default Rank
