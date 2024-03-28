/** @param {import(".").NS } ns */

export async function main(ns) {
    const payloadSource = 'home';
    const servers = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym", "zer0", "max-hardware", "nectar-net", "neo-net", "silver-helix", "phantasy", "omega-net", "computek", "avmnite-02h", "the-hub", "johnson-ortho", "netlink", "crush-fitness", "rothman-uni", "catalyst", "zb-institute", "summit-uni", "syscore", "rho-construction", "lexo-corp", "alpha-ent", "aevum-police", "millenium-fitness", "global-pharm", "galactic-cyber", "aerocorp", "snap-fitness", "omnia", "deltaone", "unitalife", "defcomm", "icarus", "univ-energy", "solaris", "zeus-med", "infocomm", "taiyang-digital", "zb-def", "nova-med", "microdyne", "run4theh111z", "titan-labs", "applied-energetics", "helios", "vitalife", "fulcrumtech", "stormtech", "kuai-gong", ".", "omnitek", "4sigma", "clarkinc", "b-and-a", "blade", "nwo", "powerhouse-fitness", "The-Cave", "ecorp", "fulcrumassets", "megacorp"];
    
    while (true) {
  
        for (let s in servers) {
            let server = servers[s];
            let serverMaxValue = ns.getServerMaxMoney(server);
            let unMax = serverMaxValue * 0.90;
            let serverValue = ns.getServerMoneyAvailable(server);
            let pLevel = ns.getHackingLevel();
            let sLevel = ns.getServerRequiredHackingLevel(server);
            let canHack = sLevel <= pLevel;
            if (canHack) {
                while (serverValue < unMax && serverMaxValue > 0) {
                    await ns.grow(server);
                    serverValue = ns.getServerMoneyAvailable(server);
                    await ns.sleep(1000);
                }
            } else {
                continue;
            }
        }
      await ns.sleep(1000);
    }
}
  