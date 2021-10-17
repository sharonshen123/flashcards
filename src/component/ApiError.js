import React from 'react';
import '../App.css';



function ApiError() {

  return (
    <>
      <div className="error-content container">
        <div className="alert alert-danger">
          <h3>Error</h3><hr /><label>Some issue with network or no data.</label>
          <span>Navigate to Home Page and try again</span>
        </div>
      </div>
    </>
  )
}
export default ApiError;