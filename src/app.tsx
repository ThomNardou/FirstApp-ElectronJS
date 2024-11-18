import React, { useState } from "react";
import Button from "@mui/joy/Button";

const App = () => {
  const [cloneStatus, setCloneStatus] = useState<string>("");
  const [pushStatus, setPushStatus] = useState<string>("");

  const handleCloneClick = async () => {
    const repoUrl = "https://github.com/ThomNardou/greenteam.git";
    setCloneStatus("Clonage en cours...");
    const res = await window.electron.ipcRenderer.invoke("clone-repo", repoUrl);
    // const res = await window.Electron?.ipcRenderer.invoke('clone-repo', repoUrl);
    setCloneStatus(res);
  };

  const handlePushClick = async () => {
    const repoPath = `C:/Users/pk88yte/Documents/greenteam`;
    const message = "Delete all test files";
    const res = await window.electron.ipcRenderer.invoke(
      "status-add-commit-push",
      repoPath,
      message
    );
    // const res = await window.Electron?.ipcRenderer.invoke('status-add-commit-push', repoPath, message);
    setCloneStatus(res);
  };

  return (
    <div>
      <h1>Hello, Electron!</h1>
      <p>I hope you enjoy using basic-electron-react-boilerplate. Test</p>
      <Button color="primary" onClick={handleCloneClick} variant="outlined">Cloner le repos</Button>
      <Button color="primary" onClick={handlePushClick} variant="outlined">Push le repos</Button>
      <p>{cloneStatus}</p>

      <p>{pushStatus}</p>
    </div>
  );
};

export default App;
