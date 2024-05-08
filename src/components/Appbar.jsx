import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { userState } from "../stores/atoms/user";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userEmailState } from "../stores/selectors/userEmail";
import { userLoadingState } from "../stores/selectors/isUserLoading";
const Appbar = () => {
  const setUser = useSetRecoilState(userState);
  const userEmail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(userLoadingState);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
        position: "sticky",
        top: "0",
        background: "#eeeeee",
      }}
    >
      <div>
        <Typography variant="h6">Coursera</Typography>
      </div>
      {!isLoading && (
        <div>
          {!userEmail && (
            <div>
              <Button
                size="small"
                variant="contained"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button size="small" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
            </div>
          )}
          {userEmail && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button onClick={() => navigate("/createcourse")} variant="text">
                Add Course
              </Button>
              <Button onClick={() => navigate("/courses")} variant="text">
                Courses
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  localStorage.setItem("token", null);
                  setUser({
                    isLoading: false,
                    userEmail: null,
                  });
                  navigate("/signin");
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Appbar;
