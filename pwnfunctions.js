/** @param {import(".").NS } ns */

export function checkHasRoot(ns, server) {
    let hasRoot = ns.hasRootAccess(server);
    if (hasRoot) {
        return true;
    } else {
        return false;
    }
}
  
export function portOpener(ns, server) {
    const files = ['BruteSSH.exe', 'relaySMTP.exe', 'FTPCrack.exe', 'SQLInject.exe', 'HTTPWorm.exe'];
    let p = 0
    
    function checkFilePres(ns, file) {
        let fileConfirmed = ns.fileExists(file);
        if (fileConfirmed) {
        return true;
        } else {
        return false;
        }
    }
   
    for (let i in files) {
        
        let file = files[i];
        if (checkFilePres(ns, file)) {
            if (file.includes('BruteSSH')) {
            ns.brutessh(server);
            p++
            } else if (file.includes('relaySMTP')) {
            ns.relaysmtp(server);
            p++
            } else if (file.includes('FTPCrack')) {
            ns.ftpcrack(server);
            p++
            } else if (file.includes('SQLInject')) {
            ns.sqlinject(server);
            p++
            } else if (file.includes('HTTPWorm')) {
            ns.httpworm(server);
            p++
            }
        }
        
    }
    return p;
}

export function checkScript(ns, script, machine) {
    let check = ns.scriptRunning(script, machine);
    if (check) {
        return true;
    } else {
        return false;
    }
} 

export function deepScan(ns) {
    let servers = ns.scan('home');
    let i = 0;
    while (i < servers.length) {
      i++
      servers.forEach((server) => { 
          let uS = ns.scan(server);
          uS.forEach(server => {
              servers.indexOf(server) < 0 ? servers.push(server) : null;
          });
        });
    }
    let targetList = servers.filter((val, ind) => servers.indexOf(val) === ind);
    return targetList;
  }
  
  export function isHackable(ns, target) {
    const pLevel = ns.getHackingLevel();
    const sLevel = ns.getServerRequiredHackingLevel(target);
    if (pLevel >= sLevel) {
      return true;
    } else {
      return false;
    }
  }
  
export function isPwnable(ns, target) {
    let portsReq = ns.getServerNumPortsRequired(target);
    const files = [
        'FTPCrack.exe',
        'RelaySMTP.exe',
        'HTTPWorm.exe',
        'SQLInject.exe',
        'BruteSSH.exe'];
    files.forEach(file => ns.fileExists(file, 'home') ? portsReq-- : null);
    if (portsReq <= 0) {
        portOpener(ns, target);
        return true;
    } else {
        return false;
    }
}
  
  export function findTarget(ns, tL) {
    let targets = tL.filter(
        (cdt) => isHackable(ns, cdt) && isPwnable(ns, cdt));
    let tC = targets.map(target => ns.getServerMaxMoney(target));
    let bestMatch = targets[tC.indexOf(tC.reduce((a, b) => a > b ? a : b))];
    return bestMatch;
  }

export function pwn(ns, target) {
    let rootStat = ns.hasRootAccess(target);
    let pwnable = isPwnable(ns, target);
    let hackable = isHackable(ns, target);
    let servCash = ns.getServerMoneyAvailable(target);
    if (!rootStat) {
        if (pwnable && hackable) {
            ns.nuke(target);
        rootStat = ns.hasRootAccess(target);
        } else if (pwnable && !hackable) {
            ns.nuke(target);
            rootStat = ns.hasRootAccess(target);
        }
    }
    return rootStat;
}
  
export function threadCount(ns, scripts, bot) {
    let sRam = scripts.map(script => ns.getScriptRam(script));
    const botRam = ns.getServerMaxRam(bot);
    let botDivRam = Math.floor(botRam / scripts.length);
    let maxThreads = sRam.map(value => Math.floor(botDivRam / value));
    let tCount = maxThreads.reduce((a, b) => a < b ? a : b);
    return tCount >= 1 ? tCount : 1;
    
    /*const scrRam = ns.getScriptRam(script);
    let botRammed = ns.getServerUsedRam(bot);
    let threadCount = Math.floor(botRam - botRammed / scrRam);
    return threadCount >= 1 ? threadCount : 1;*/
}

export function threadShare(tCount, files) {
    files.forEach(file => threadCount(ns, script, bot))
    let threads = Math.floor(tCount / 3);
    return threads >= 1 ? threads : 1;
}