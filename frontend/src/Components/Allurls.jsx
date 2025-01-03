import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CardActions,
  Tooltip,
  IconButton,
} from "@mui/material";
import AppContext from "../Context/context.jsx";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoWindow from "./InfoWindow.jsx";
import DeleteWindow from "./DeleteWindow.jsx";
const Allurls = () => {
  const [urls, setUrls] = useState();
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const token = localStorage.getItem("token");
  const [selected, setSelected] = useState();
  const [deleteWindow, setDeleteWindow] = useState();
  const [infoWindow, setInfoWindow] = useState();
  const { logged, apiUrl, setMessage, setAlertType, setOpen } =
    useContext(AppContext);
  useEffect(() => {
    // if (!logged) return;
    axios
      .get(`${apiUrl}/api/url`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setUrls(res.data.urls);
        } else {
          console.log(res);
        }
      })
      .catch((e) => {
        setAlertType("error");
        setMessage(e.data.message);
        setOpen(true);
        console.log(e);
      });
  }, []);
  const { user } = useContext(AppContext);
  const handleClose = (option) => {
    option === "info" ? setInfoWindow(false) : setDeleteWindow(false);
  };
  const handleDelete = (id) => {
    console.log("Deleting URL with ID:", id);
    axios
      .delete(`${apiUrl}/api/url/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);

        axios
          .get(`${apiUrl}/api/url`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((re) => {
            if(re.status === 200){
            setAlertType("success");
            setMessage("Url deleted...");
            setOpen(true);
            }else{
              setAlertType('error');
              setMessage(re.data.message);
              setOpen(true);
            }
            console.log(re);
            setUrls(re.data.urls);
          })
          .catch((er) => {
            setAlertType("error");
            setMessage(er.data.message);
            setOpen(true);
            console.log(er);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInfo = (url) => {
    // Handle info logic here (show more details or open in a new page)
    console.log("Info for URL:", url);
  };

  const handleCopy = (text, index) => {
    console.log(text);
    navigator.clipboard
      .writeText(text)
      .then((res) => {
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 1500);
        console.log("Successfully copied to clipboard");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {logged ? (
        <Box sx={{ padding: "2rem", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Your URLs
          </Typography>
          {urls && urls.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "5vh",
              }}>
              {urls.map((url, index) => (
                <Card
                  sx={{ boxShadow: 3 }}
                  key={url._id}
                  style={{ width: "34vw" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {url.title || "No Title"}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      <strong>Target URL:</strong>{" "}
                      <a
                        href={url.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        {url.targetUrl}
                      </a>
                      &nbsp;
                      <Tooltip
                        title={copiedIndex === index + "a" ? "Copied" : ""}
                        open={copiedIndex === index + "a"}>
                        <IconButton
                          onClick={() => {
                            handleCopy(url.targetUrl, index + "a");
                          }}>
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <Typography variant="body2" color="primary">
                      <strong>Short URL:</strong>{" "}
                      <a
                        href={`${apiUrl}/${url.shortUrl}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {`${apiUrl}/${url.shortUrl}`}
                      </a>
                      &nbsp;
                      <Tooltip
                        title={copiedIndex === index + "b" ? "Copied" : ""}
                        open={copiedIndex === index + "b"}>
                        <IconButton
                          onClick={() => {
                            handleCopy(url.shortUrl, index + "b");
                          }}>
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setSelected(url);
                        setInfoWindow(true);
                        handleInfo(url);
                      }}>
                      Info
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setSelected(url);
                        setDeleteWindow(true);
                        // handleDelete(url._id);
                      }}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          ) : (
            <Typography variant="h6" color="textSecondary">
              No URLs available.
            </Typography>
          )}
          {infoWindow && (
            <InfoWindow handleClose={handleClose} item={selected} />
          )}
          {deleteWindow && (
            <DeleteWindow
              handleDelete={handleDelete}
              item={selected}
              handleClose={handleClose}
            />
          )}
        </Box>
      ) : (
        <Box
          sx={{ padding: "20px", textAlign: "center", marginTop: "20px" }}
          style={{ width: "60vw" }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Please login to continue
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Allurls;
