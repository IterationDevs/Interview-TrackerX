import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../routes/useAuth';
import axios from 'axios';

const modalTitle = {
  add: 'Add new application',
  edit: 'Edit application',
};

const ApplicationsModal = ({
  setShowModal,
  action,
  currentApp,
  setUpdateState,
}) => {
  const [job_title, setJobTitle] = useState(currentApp.job_title || '');
  const [company, setCompany] = useState(currentApp.company || '');
  const [how_applied, setHowApplied] = useState(currentApp.how_applied || '');
  const [date_applied, setDateApplied] = useState(
    currentApp.date_applied || ''
  );
  const [location, setLocation] = useState(currentApp.location || '');
  const [url, setUrl] = useState(currentApp.url || '');
  const [found_by, setFoundBy] = useState(currentApp.found_by || '');
  const [notes, setNotes] = useState(currentApp.notes || '');
  const [app_status, setAppStatus] = useState(currentApp.app_status || '');

  const auth = useAuth();
  const history = useHistory();

  const addApplication = async (body) => {
    try {
      const res = await axios.post(`/user/${auth.user.id}/application`, body);
      console.log('res==>', res);

      console.log('new application added');
      setShowModal({ action: null, id: null });
      setUpdateState(true); // add from Lee
    } catch (error) {
      console.log('error.response.status ===> ', error.response.status);
      if (error.response.status === 401) {
        history.push('/');
      }
      console.log(
        'Error in addApplication of ApplicationsModel component: ',
        error.response.data.err
      );
    }
  };

  const editApplication = async (body) => {
    console.log('call edit app');
    try {
      const res = await axios.put(
        `/user/${auth.user.id}/application/${currentApp.id}`,
        body
      );
      console.log('res==>', res);

      console.log('new application added');
      setShowModal({ action: null, id: null });
      setUpdateState(true); // add from Lee
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/');
      }
      console.log(
        'Error in editApplication of ApplicationsModel component: ',
        error.response.data.err
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      job_title,
      company,
      how_applied,
      date_applied,
      url,
      location,
      found_by,
      notes,
      app_status,
    };

    if (action === 'edit') {
      editApplication(body);
    } else {
      addApplication(body);
    }
  };

  console.log('currentapp', currentApp);
  return (
    <div id="div3" className="modalWrapper">
      <div className="modalBackground">
        <h2>{modalTitle[action]}</h2>
        <form
          // onSubmit={handleSubmit} doesn't work
          id="list"
          className="modalForm"
        >
          <label>
            Job Title
            <input
              type="text"
              // placeholder="Job Title"
              id="job_title"
              value={job_title}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Company
            <input
              type="text"
              // placeholder="company"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </label>
          <label>
            How I applied
            <input
              type="text"
              placeholder="e.g. email, company website, Glassdoor,..."
              id="how_applied"
              value={how_applied}
              onChange={(e) => setHowApplied(e.target.value)}
              required
            />
          </label>
          <label>
            Date applied
            <input
              type="date"
              // placeholder="Date applied"
              id="date_applied"
              value={date_applied.slice(0, 10)}
              onChange={(e) => setDateApplied(e.target.value)}
              required
            />
          </label>
          <label>
            Location
            <input
              type="text"
              // placeholder="Location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label>
            URL
            <input
              type="text"
              // placeholder="URL"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          <label>
            Found by
            <input
              type="text"
              placeholder="e.g. recruiter/agency, linkedIn, Google,..."
              id="found_by"
              value={found_by}
              onChange={(e) => setFoundBy(e.target.value)}
              required
            />
          </label>
          <label>
            Notes
            <input
              type="text"
              // placeholder="Notes"
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </label>
          <label>
            App Status
            <select
              // type="text"
              id="app_status"
              value={app_status}
              onChange={(e) => setAppStatus(e.target.value)}
              required
            >
              <option value="1">Not Applied</option>
              <option value="2">Applied</option>
              <option value="3">Phone Screening</option>
              <option value="4">Technical Interview</option>
              <option value="5">Interviewing</option>
              <option value="6">Offer Received</option>
              <option value="7">Offer Accepted</option>
              <option value="8">Offer Rejected</option>
              <option value="9">Application Rejected</option>
              <option value="10">Not Interested</option>
            </select>
          </label>
          <div className="modalButtonWrapper">
            <button
              className="modalButton"
              onClick={() => setShowModal({ action: null, id: null })}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modalButton"
              onClick={handleSubmit}
            >
              Save{' '}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationsModal;
