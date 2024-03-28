/** @param {import(".").NS } ns */

import * as pf from "./pwnfunctions.js";

export async function main(ns) {
    target = ns.args[0];
    ns.tail();
    const bots = ns.args[1];
    const files = ['growv4.js', 'weakenv4.js', 'hackv4.js'];
    /* const initScan = (ns.scan('home'));


     for (let s in initScan) {
        let bot = initScan[s];
        ns.print('checking bot: ' + bot);
        let botFinder = ns.getServerMaxRam(bot);
        if (botFinder >= 8000) {
            bots.push(bot);
        }
      }
    */
    bots.forEach(bot => {
        files.forEach(file => {
            let scrThreads = pf.threadCount(ns, bot, file);
            ns.scriptKill(file, bot);
            ns.scp(file, bot, 'home');
            // ns.exec(file, bot, threadShare(botRam, 2.1), target, 300000);
            ns.exec(file, bot, scrThreads, target);
        })
    });
    /*
    for (let b in bots) {
        let bot = bots[b];
        // let botRam = ns.getServerMaxRam(bot);
        for (let f in files) {
            let file = files[f];
            let oldfile = oldfiles[f];
            // let target = 'rho-construction';
            ns.print('checking ' + file);
            ns.scriptKill(file, bot);
            ns.scp(file, bot, 'home');
            ns.print('file transfer complete: ' + file);
            // ns.exec(file, bot, threadShare(botRam, 2.1), target, 300000);
            let scrThreads = threadCount(ns, bot, file);
            ns.exec(file, bot, scrThreads, target, 300000);
            ns.print('file executed: ' + file);
        }
    }
    */
}