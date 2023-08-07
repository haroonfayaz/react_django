import React from 'react'

const Table = (props) => {
  return (
    <>
    <div className="container ">
    <div className="row">
    <div className="col-6">
      <table className="table">
            <thead>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                </tr>
                </thead>
                    <tbody>
                <tr>
                <th scope="row">{props.id}</th>
                <td>{props.name}</td>
                <td>{props.email}</td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>
        </div>
    </>
  )
}

export default Table;
