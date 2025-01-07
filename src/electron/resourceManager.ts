import osUtils from "os-utils";
import fs from "fs";

const POLLING_INTERVAL = 1000;

export const pollResources = () => {
  setInterval(async () => {
    const CPUUsage = await getCPUUsage();
    const RAMUsage = getRAMUsage();
    const storageData = getStorageData();

    console.log(`CPU usage -> ${CPUUsage}%`);
    console.log(`RAM usage -> ${RAMUsage}%`);
    console.log(`Storage usage -> ${storageData.usage}%`);
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
