/** @param {import(".").NS } ns */

export async function main(ns) {
    ns.tail();
    // ns.resizeTail();
    // ns.moveTail();
    ns.disableLog("ALL");
    let initialscan = (ns.scan('home'));
    let servers = [];
    for (let s in initialscan) {
        let item = initialscan[s];
        servers.push(item);
        }
    let numServers = servers.length;
    let i = 1;
    let logger = [];
    while (i <= numServers) {
        for (let c in servers) {
            let server = servers[c];
            const updateScan = ns.scan(server);
            let maxValue = ns.getServerMaxMoney(server);
            let sLevel = ns.getServerRequiredHackingLevel(server);
            let pLevel = ns.getHackingLevel();
            for (const x in updateScan) {
                let addServer = updateScan[x];
                if (!servers.includes(addServer)) {
                servers.push(addServer);
                }
            }
            if (maxValue > 0 && sLevel < pLevel && logger.indexOf(server) == -1) {
                logger.push(server);
            }
        }
        i++
    }
    for (let l in logger) {
        let pot = logger[l];
        let maxValue = ns.getServerMaxMoney(pot);
        let formattedValue = maxValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        let sLevel = ns.getServerRequiredHackingLevel(pot);
        ns.print('--- ' + pot + ": " + formattedValue + ' ---');
        ns.print('// level:' + sLevel + ']]]');
    }
}