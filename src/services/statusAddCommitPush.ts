import git from 'isomorphic-git';
import dotenv from 'dotenv';

dotenv.config();

const statusAddCommitPush = async (repoPath: string, message: string): Promise<string> => {
    console.log("username : ", process.env.USERNAME);
    try {
        await git.add({ fs: require("fs"), dir: repoPath, filepath: "." });
  
        await git.commit({
          fs: require("fs"),
          dir: repoPath,
          message,
          author: { name: "Thomas Nardou", email: "" },
        });

  
        await git.push({
          fs: require("fs"),
          http: require("isomorphic-git/http/node"),
          dir: repoPath,
          remote: "origin",
          ref: "main",
          onAuth: () => ({ username: process.env.USERNAME as string, password: process.env.PASSWORD as string }),
        });
  
        return "Push réussi";
      } catch (error) {
        return `Erreur lors du push : ${error}`;
      }
}

export default statusAddCommitPush;