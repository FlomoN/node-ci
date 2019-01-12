import { spawn, exec } from "child_process";

exec('if exist tsf-tictactoe rd /s /q tsf-tictactoe', (error, stdout, stderr) => {
  if (error) {
    console.log("Failed to delete " + error);
  } else {
    console.log("Old Directory Deleted");
    gitClone();
  }
});

function gitClone() {
  exec('git clone https://github.com/FlomoN/tsf-tictactoe.git', (error, stdout, stderr) => {
    if (error) {
      console.log("Failed to clone: " + error);
    } else {
      console.log("Git cloned.");
      npmInstall();
    }
  });
}

function npmInstall() {
  exec("npm install", { cwd: "./tsf-tictactoe" }, (error, stdout, stderr) => {
    if (error) {
      console.log("npm install failed " + error);
    } else {
      console.log("Dependencies installed");
      startApp();
    }
  });
}

function startApp() {
  console.log("Starting...");
  exec("npx parcel src/index.html", { cwd: "./tsf-tictactoe" }, (error, stdout, stderr) => {
    if (error) {
      console.log("Couldn't Execute App" + error);
    } else {
      console.log("Closed");
    }
  });
}