import React from 'react'

const Modal = ({ newDepartmentName, setNewDepartmentName, onSave }) => {
  return (
    <>
    <div className="mod">
        {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary mod" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Department
            </button>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Enter Department Name </h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <input type="text" 
                    className="form-control" 
                    placeholder="Enter department name"
                    value={newDepartmentName}
                    onChange={(e) => setNewDepartmentName(e.target.value)} 

                />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={onSave} data-bs-dismiss="modal">Save </button>
                </div>
                </div>
            </div>
            </div>
            
            
    </>
  )
}

export default Modal;
