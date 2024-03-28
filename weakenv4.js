/** @param {import(".").NS } ns */
export async function main(ns) {
    const server = ns.args[0];
    const serverMinSec = ns.getServerMinSecurityLevel(server) + 1;
  
    while(true) {
      let serverSec = ns.getServerSecurityLevel(server);
      if (serverSec > serverMinSec){
        await ns.weaken(server);
        await ns.print('server weakened!');
        await ns.write('grow-weak.txt','weakened!', "w")
      } else {
        ns.print("server crippled. waiting...");
        await ns.sleep(5000);
      }
    }
  }