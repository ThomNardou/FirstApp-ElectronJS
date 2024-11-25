import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

const App = () => {
  const [cloneStatus, setCloneStatus] = useState<string>("");
  const [pushStatus, setPushStatus] = useState<string>("");
  const [commitName, setCommitName] = useState<string>("Some changes made");

  const handleCloneClick = async () => {
    const repoUrl = "https://github.com/ThomNardou/greenteam.git";
    setCloneStatus("loading");
    const res = await window.electron.ipcRenderer.invoke("clone-repo", repoUrl);
    // const res = await window.Electron?.ipcRenderer.invoke('clone-repo', repoUrl);
    setCloneStatus(res);

    setTimeout(() => {
      setCloneStatus("");
    }, 3000)
  };

  const handlePushClick = async () => {
    const repoPath = `C:/Users/pk88yte/Documents/greenteam`;
    const message = "Delete all test files";
    setPushStatus("loading");
    const res = await window.electron.ipcRenderer.invoke(
      "status-add-commit-push",
      repoPath,
      message
    );
    setPushStatus(res);

    setTimeout(() => {
      setPushStatus("");
    }, 3000)
  };

  const renderAlert = (status: string) => {
    if (status === "empty") {
      return <Alert severity="info">No Changes</Alert>;
    }
    else if (status === "success") {
      return <Alert severity="success">Opération réussie</Alert>;
    }
    else if (status === "error") {
      return <Alert severity="error">Opération échouée</Alert>;
    }
    else if (status === "loading") {
      return <Alert severity="warning">Loading...</Alert>;
    }
    else {
      return null;
    }
  }

  return (
    <div>
      <h1>Welcome to Github Desktop</h1>
      <p>Current message : {commitName}</p>
      <TextField id="standard-basic" label="Commit Message" variant="standard" onChange={(e) => setCommitName(e.target.value)} />
      <Button color="primary" onClick={handleCloneClick}>Cloner le repos</Button>
      <Button color="primary" onClick={handlePushClick}>Push le repos</Button>
      {renderAlert(cloneStatus)}
      {renderAlert(pushStatus)}
    </div>
  );
};

export default App;
