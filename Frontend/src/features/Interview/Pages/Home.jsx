import React from 'react'
import '../styles/Home.scss'

const Home = () => {
  return (
    <main className="home">
        <div className="interview-input-group">
        <div className="left">
            <label htmlFor="job-Description">Job Description</label>
            <textarea name="jobDescription" id="jobDescription" placeholder='Enter Job Description here'></textarea>
        </div>

        <div className="right">
            <div className="input-group">
                <p>Resume <small className='highlight'>(Use Resume and Self-Description together for best result)</small></p>
                <label className='file-label' htmlFor="resume">Upload Resume</label>
                <input hidden type="file" name='resume' id='resume' accept='.pdf' />
            </div>
            <div className="input-group">
                <label htmlFor="SelfDescription">Self Description</label>
               <textarea name="selfDescription" id="selfDescription" placeholder='Describe Yourself'></textarea>
            </div>
            <button className='button primary-button'>Generate interview Report</button>
        </div>
        </div>
    </main>
  )
}

export default Home