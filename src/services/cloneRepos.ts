import git from 'isomorphic-git';

const cloneRepos = async (repoUrl: string): Promise<string> => {
    const repoName = repoUrl.split("/").pop()?.replace(".git", "");
    const localPath = `C:/Users/${require("os").userInfo().username}/Documents/${repoName}`;
    try {
        await git.clone({
            fs: require("fs"),
            http: require("isomorphic-git/http/node"),
            dir: localPath,
            url: repoUrl,
            singleBranch: true,
            depth: 1,
        });
        return "success";
    } catch (error) {
        return "error";
    }
};

export default cloneRepos;