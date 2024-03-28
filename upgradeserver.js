/** @param {NS} ns */
export async function main(ns) {
    const servers = ['n00dles-bot-0', 'n00dles-bot-1', , 'johnson-ortho-bot-0', 'johnson-ortho-bot-1', 'crush-fitness-bot-0', 'crush-fitness-bot-1', 'computek-bot-0', 'computek-bot-1', 'syscore-bot-0',  'syscore-bot-1', 'snap-fitness-bot-0', 'snap-fitness-bot-1', 'nova-med-bot-0', 'zb-def-bot-0', 'zb-def-bot-1'];
    const ramPurchase = 8192;
    const serverCost = ns.getPurchasedServerCost(ramPurchase);
    ns.print(serverCost);
    for (let s in servers) {
        let server = servers[s];
        try {
            ns.upgradePurchasedServer(server, ramPurchase);
        } catch {
            continue;
        }
       
    }
  }