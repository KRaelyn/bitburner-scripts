/** @param {import(".").NS } ns */

// import { checkScript, threadShare } from "./pwnfunctions.js";

export async function main(ns) {
    const initScan = (ns.scan('home'));
    const ramPurchase = 8192;
    const serverCost = ns.getPurchasedServerCost(ramPurchase);

    while (true) {
        initScan.forEach(bot => {
            ns.print('checking bot: ' + bot);
            let botFinder = ns.getServerMaxRam(bot);
            let isBot = ns.getServerMoneyAvailable(bot)
            if (botFinder <= 8000 && isBot == 0) {
                ns.print(serverCost);
                ns.upgradePurchasedServer(bot, ramPurchase);
            }
        });
        await ns.sleep(600000);
    }
}