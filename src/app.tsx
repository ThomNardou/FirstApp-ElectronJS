import React, { useState } from 'react';

const App = () => {
    const [cloneStatus, setCloneStatus] = useState<string>("");

    const handleCloneClick = async () => {
        const repoUrl = "https://github.com/ThomNardou/greenteam.git";
        setCloneStatus("Clonage en cours...");
        const res = await window.electron.ipcRenderer.invoke('clone-repo', repoUrl);
        // const res = await window.Electron?.ipcRenderer.invoke('clone-repo', repoUrl);
        setCloneStatus(res);
    };

    return (
        <div>
            <h1>Hello, Electron!</h1>
            <p>I hope you enjoy using basic-electron-react-boilerplate. Test</p>
            <button onClick={handleCloneClick}>Cloner le dépôt</button>
            <p>{cloneStatus}</p>
        </div>
    );
};

export default App;
