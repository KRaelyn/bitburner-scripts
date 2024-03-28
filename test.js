/** @param {import(".").NS } ns */

import * as pf from "./pwnfunctions.js";

export async function main(ns) {
    ns.tail();
    ns.disableLog("ALL");
    let targets = pf.deepScan(ns)
    await ns.print('target list: ' + targets.toString());
    await ns.print('hackable ' + pf.isHackable(ns, 'catalyst'));
    await ns.print('pwnable: ' + pf.isPwnable(ns, 'catalyst'));
    await ns.print('best target is ' + pf.findTarget(ns, targets));
    await ns.print('target is pwned? ' + pf.pwn(ns, 'catalyst'));
}