/** @param {import(".").NS } ns */

import { checkHasRoot, portOpener, checkScript, threadShare } from "./pwnfunctions.js";

export async function main(ns) {
  ns.tail();
  const payloadSource = 'home';
  let initialscan = (ns.scan(payloadSource));
  let servers = [];
  for (let s in initialscan) {
    let item = initialscan[s];
    servers.push(item);
  }
  let numServers = servers.length;
  let i = 1;
  while (true /* i <= numServers */) {
    for (const c in servers) {
      const server = servers[c];
      const updateScan = ns.scan(server);

      for (const x in updateScan) {
        let addServer = updateScan[x];
        if (!servers.includes(addServer)) {
          servers.push(addServer);
        }
      }

      let cHR = checkHasRoot(ns, server);
      let portsNeeded = ns.getServerNumPortsRequired(server);
      if (!cHR && portsNeeded > 0) {
        portOpener(ns, server);
        try {
          ns.nuke(server);
        } catch {
          continue;
        }

      } else if (!cHR && portsNeeded == 0) {
        try {
          ns.nuke(server);
        } catch {
          continue;
        }

      }
      const oldFiles = ['hackv3.js', 'weakenv3.js', 'growv3.js'];
      const files = ['hackv4.js', 'weakenv4.js', 'growv4.js'];

      for (const f in files) {
        let file = files[f];
        let serverHasFiles = ns.fileExists(file, server);
        let hasCash = ns.getServerMaxMoney(server);
        let proxyName = String(server + '-bot');
        let waitTime = 100;
        if (cHR && !serverHasFiles && hasCash > 0) {
          ns.scp(file, server, payloadSource);
          if (ns.scriptRunning(oldFiles[f], server)) {
            ns.scriptKill(oldFiles[f], server);
          }
        } 
        
        let ramAvailable = ns.getServerMaxRam(server);
        if (cHR && !checkScript(ns, file, server) && hasCash > 0 && ramAvailable >= 6) {
          try {
            ns.scp(file, server, payloadSource);
            ns.exec(file, server, threadShare(ramAvailable, 2), server, waitTime);
          } catch {
            ns.scp(file, server, payloadSource);
            ns.scriptKill(oldFiles);
            ns.exec(file, server, threadShare(ramAvailable, 2), server, waitTime);
          }
          
        } /* else if (cHR && ramAvailable < 2 && hasCash > 0) {
          let currentMoney = ns.getServerMoneyAvailable('home');
          let toPurchaseServer = ns.getPurchasedServerCost(128);
          
          if (currentMoney >= toPurchaseServer) {
            if (!servers.includes(proxyName)) {
              ns.purchaseServer(proxyName, 64);
            }
          }
        }

        if (servers.indexOf(proxyName) > -1 && !checkScript(ns, file, proxyName)) {
          ns.print(proxyName);
          let proxyRam = ns.getServerMaxRam(proxyName);
          try {
            ns.scp(file, proxyName, payloadSource);
            ns.exec(file, proxyName, threadShare(proxyRam, 1.96), server);
          } catch {
            ns.scriptKill(oldFiles);
            ns.exec(file, proxyName, threadShare(proxyRam, 1.96), server);
          }
        } */
      }
    }
    await ns.sleep(10000);
    // i++;
  }
}


