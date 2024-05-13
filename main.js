const fs = require('fs');

async function checkAccount(wallet) {
    try {
        const response = await fetch(`https://eligibility.holograph.foundation/api/eligibility/${wallet}`);

        if (response.status == 200) {
            const data = await response.json();
            return {success: true, data: data}
        }
    } catch(e) {return {success: false, err: e}}
}

async function main() {
    const wallets = fs.readFileSync('./wallets.txt', 'utf8').split('\n');

    for (const wallet of wallets) {
        const result = await checkAccount(wallet);
        if (result.success) {
            console.log(`${wallet} | Eligible: ${result.data.status} - ${result.data.amount} HLG`);
        }
    }
}

main()