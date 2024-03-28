/** @param {import(".").NS } ns */

export async function main(ns) {
    const ramPurchase = 2048;
    const serverCost = ns.getPurchasedServerCost(ramPurchase);
    // initialize iterable server number
    let serverNum = 1;
    ns.print(serverCost);
    while (serverNum <= 10) {
      // check current funds
      let currentFunds = ns.getServerMoneyAvailable('home');
      // name server
      let serverName = "bot-" + serverNum
      // check current funds against server cost. if possible, buy a new server
      if (currentFunds > serverCost) {
        ns.purchaseServer(serverName, ramPurchase);
        serverNum++;
      } else {
        await ns.sleep(30000);
      }
    }
  }