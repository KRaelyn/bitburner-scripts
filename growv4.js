/** @param {import(".").NS } ns */
export async function main(ns) {
    const server = ns.args[0];
    const waitTime = ns.args[1];
    const serverMaxValue = ns.getServerMaxMoney(server);
    const hundredthValue = serverMaxValue * 0.01;
    const growLimit = serverMaxValue - hundredthValue;

    while(true) {
        let serverValue = ns.getServerMoneyAvailable(server);
        ns.print("grow limit is: " + growLimit);
        ns.print("current value is: " + serverValue);
        let serverReady = ns.read('grow-weak.txt');
        if (serverValue < growLimit && serverReady == 'weakened!') {
            await ns.grow(server);
            await ns.write('grow-weak.txt','growth!', 'w');
        } else {
        ns.print("no growth, waiting...");
            await ns.sleep(5000);
        }
    }
}