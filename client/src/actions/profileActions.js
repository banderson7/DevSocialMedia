import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_EXPERIENCE,
  GET_EDUCATION,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS
} from './types';

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(clearErrors());
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get experience
export const getExperience = id => dispatch => {
  dispatch(clearErrors());
  axios
    .get(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_EXPERIENCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXPERIENCE,
        payload: {}
      })
    );
};

// Update experience
export const updateExperience = (id, expData, history) => dispatch => {
  axios
    .put(`/api/profile/experience/${id}`, expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  if (window.confirm('Are you sure? This can not be undone.')) {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get education
export const getEducation = id => dispatch => {
  dispatch(clearErrors());
  axios
    .get(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_EDUCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EDUCATION,
        payload: {}
      })
    );
};

// Update education
export const updateEducation = (id, eduData, history) => dispatch => {
  axios
    .put(`/api/profile/education/${id}`, eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  if (window.confirm('Are you sure? This can not be undone.')) {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can not be undone.')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
