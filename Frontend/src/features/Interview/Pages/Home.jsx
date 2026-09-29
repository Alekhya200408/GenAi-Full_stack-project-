import React from 'react'

const Home = () => {
  return (
    <main className="home">
        <div className="left">
            <textarea name="jobDescription" id="jobDescription" placeholder='Enter Job Description hera'></textarea>
        </div>

        <div className="right">
            <div className="input-group">
                <label htmlFor="resume">Upload Resume</label>
                <input type="file" name='resume' id='resume' accept='.pdf' />
            </div>
            <div className="input-group">
                <label htmlFor="SelfDescription">Self Description</label>
               <textarea name="selfDescription" id="selfDescription" placeholder='Describe Yourself'></textarea>
            </div>
            <button className='generate-btn'>Generate interview Report</button>
        </div>
    </main>
  )
}

export default Home