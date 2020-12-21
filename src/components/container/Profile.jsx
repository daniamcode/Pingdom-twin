import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import EnhancedTableProfile from "../presentational/ProfileTable";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addProfileWeb } from "../../redux/actions/profileActions";
import { useDispatch } from "react-redux";
import basicOnFieldChange from "../../scripts/basicOnFieldChange";
import { useSelector } from "react-redux";
import { loadProfile } from "../../redux/actions/profileActions";
import ProfileDelayGraph from "../presentational/ProfileDelayGraph";
import Login from "./Login";
import Spinner from "../presentational/Spinner";
import mapProfileDelayGraph from "../../scripts/mapProfileDelayGraph";
import ownErrorMessage from "../../scripts/ownErrorMessage";

const Profile = (props) => {
  let [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const addWebsite = (url) => dispatch(addProfileWeb(url));
  const rawRows = useSelector((state) => state.profileReducer.profile);

  let profileDelayGraphMapped = mapProfileDelayGraph(
    rawRows?.response?.data?.responses
  );
  console.log(profileDelayGraphMapped);
  const name = useSelector((state) => state.googleReducer.authResponse?.name);
  const token = useSelector((state) => state.googleReducer.authResponse?.token);
  const isLoading = useSelector(
    (state) => state.profileReducer.profile?.isLoading
  );
  const error = useSelector((state) => state.profileReducer.profile?.error);

  useEffect(() => {
    if (token) {
      dispatch(loadProfile(token));
      const interval = setInterval(() => {
        dispatch(loadProfile(token));
      }, 60000);
  
      return () => clearInterval(interval);
    }
  }, [dispatch, token]);

  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    addWebsite(url);
  }
  return (
    <>
      {!token ? (
        <div className="profile__message__container">
          <p className="profile__message">
            Open the padlock to get access to your profile:
          </p>
          <Login />
        </div>
      ) : isLoading ? (
        <div className="spinner-active">
          <Spinner />
        </div>
      ) : error?.response ? (
        <h1 className="profile__message__error">
          {ownErrorMessage(error.response)}
        </h1>
      ) : (
        <main className="profile">
          <h1 className="profile__title">Profile of {name}</h1>
          <div id="profile-delay-chart" className="profile__chart">
            <h2 className="profile-delay-chart__title">
              Performance:
            </h2>
            <ProfileDelayGraph
              profileDelayGraphMapped={profileDelayGraphMapped}
            />
          </div>
          <div className="profile__add-title">
            <h3 key={url}>Add a url to be followed (up to 5):</h3>
            <form className="profile__add" onSubmit={handleSubmit}>
              <div className="status__form-inner-container">
                <TextField
                  id="filled-basic"
                  variant="filled"
                  className="status__form-input"
                  placeholder="Write any url here"
                  name="url"
                  required
                  value={url}
                  onChange={(event) =>
                    basicOnFieldChange(event.target.value, setUrl)
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="status__form-button"
                  type="submit"
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
          <div className="profile__table">
            <EnhancedTableProfile rawRows={rawRows} />
          </div>
        </main>
      )}
    </>
  );
};

export default Profile;
