/** @param {import(".").NS } ns */

import * as pf from 'pwnfunctions.js';
import { threadShare } from './pwnfunctions';

export async function main(ns) {
    ns.tail();
    while(true) {
        // scan all servers and place them in an array
        const targetList = pf.deepScan(ns);
        // initialize filtered array
        let bots = [];
        
        // iterate through target list, auto open ports if possible, nuke if possible,
        // and add to bot array if nuked and hackable
        targetList.forEach(target =>
            pf.pwn(ns, target) ? bots.push(target) : null);
        // search final array for most valuable hackable target
        let botTarget = pf.findTarget(ns, bots);
        await ns.print(botTarget);
        // check if current target is still the best target
        // if not, change target
        let lastT = ns.read('last-target.txt');
        if (lastT != botTarget) {
            const files = ['growv4.js', 'weakenv4.js', 'hackv4.js'];
            bots.forEach(bot => {
                let scrThreads = pf.threadCount(ns, files, bot);
                ns.killall(bot);
                files.forEach(file => {
                    ns.scp(file, bot, 'home');
                    ns.exec(file, bot, scrThreads, botTarget);
                })

            });
            if (!ns.scriptRunning('purchaseserver.js', 'home')) {
                ns.exec('purchaseserver.js', 'home');
            }
            if (!ns.scriptRunning('purchaseserver.js', 'home')) {
                ns.exec('upgradeserver.js', 'home');
            }
        await ns.write('last-target.txt', botTarget, 'w');
        }
        await ns.sleep(60000);
    }
}