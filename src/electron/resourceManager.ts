import osUtils from "os-utils";
import os from "os";
import fs from "fs";
import type { BrowserWindow } from "electron";

const POLLING_INTERVAL = 500;

export const pollResources = (mainWindow: BrowserWindow) => {
  setInterval(async () => {
    const CPUUsage = await getCPUUsage();
    const RAMUsage = getRAMUsage();
    const storageData = getStorageData();

    mainWindow.webContents.send("statistics", { CPUUsage, RAMUsage, storageData: storageData.usage });
    // console.log(`CPU usage -> ${CPUUsage}%`);
    // console.log(`RAM usage -> ${RAMUsage}%`);
    // console.log(`Storage usage -> ${storageData.usage}%`);
  }, POLLING_INTERVAL);
};

const getCPUUsage = () => {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  })
};

const getRAMUsage = () => 1 - osUtils.freememPercentage();

const getStorageData = () => {
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize  * stats.bfree;

  return {
    total: Math.floor(total / 1000000000),
    usage: 1 - (free / total)
  };
};

export const getStaticData = () => {
  const totalStorage = getStorageData().total;
  const CPUModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

  return { totalStorage, CPUModel, totalMemoryGB };
};
