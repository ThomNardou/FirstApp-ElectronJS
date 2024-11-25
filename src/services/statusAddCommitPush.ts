import git from "isomorphic-git";
import dotenv from "dotenv";

dotenv.config();

const statusAddCommitPush = async (
  repoPath: string,
  message: string
): Promise<string> => {
  try {
    const status = await git.statusMatrix({
      fs: require("fs"),
      dir: repoPath,
    });

    if (status.length === 0) return 'empty';

    for( const [filepath, head, index, workdir] of status) {
      if (index === 0 && workdir === 1) {
        await git.remove({ fs: require("fs"), dir: repoPath, filepath });
      }
    }

    console.log(status);

    // Ajouter toutes les modifications à l'index
    await git.add({ fs: require("fs"), dir: repoPath, filepath: "." });

    // Commit des changements
    await git.commit({
      fs: require("fs"),
      dir: repoPath,
      message,
      author: { name: "Thomas Nardou", email: "" },
    });

    // Push vers le dépôt distant
    await git.push({
      fs: require("fs"),
      http: require("isomorphic-git/http/node"),
      dir: repoPath,
      remote: "origin",
      ref: "main",
      onAuth: () => ({
        username: process.env.TOKEN as string,
      }),
    });

    return "success";
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export default statusAddCommitPush;
