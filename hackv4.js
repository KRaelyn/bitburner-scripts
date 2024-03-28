/** @param {import(".").NS } ns */

export async function main(ns) {
    const server = ns.args[0];
    const serverMaxValue = ns.getServerMaxMoney(server);
    const hackableValue = serverMaxValue * 0.1;
  
    while(true) {
        let serverValue = ns.getServerMoneyAvailable(server);
        
        let pLevel = ns.getHackingLevel();
        const sLevel = ns.getServerRequiredHackingLevel(server);
        let canHack = sLevel <= pLevel;
        let valueThresh = serverValue > hackableValue;
        await ns.sleep(100);
        ns.print("minimum value required to hack: " + hackableValue);
        ns.print("current value is: " + serverValue); 
        
        await ns.sleep(100);
        if (canHack && valueThresh){
            await ns.hack(server);
        } else {
            ns.print("parameters not met. waiting to hack");
        await ns.sleep(5000);
        }
    }
  }