// Import environment variables before anything else
import * as dotenv from "dotenv"
dotenv.config();

import D4H, { GetMembersOptions } from "d4h-typescript"
import { env } from "process"

const token = env["D4H_TOKEN"]!;

let api = new D4H(token);

let getMembersOptions: GetMembersOptions = {
    includeDetails: true,
    includeCustomFields: true,
};

let main = async function() {
    // Only execute update code on an instance where that's OK.
    // Double-check your API key. Double-check what you're modifying.
    /*try {
        const memberId = 0000 // Set this to a real ID
        await api.updateMemberAsync(memberId, {
            notes: null,
        })
    } catch (err) {
        console.log(JSON.stringify(err));
        return;
    }*/

    try {
        const members = await api.getMembersAsync(getMembersOptions);
        console.log(`Retrieved ${members.length} members.`);
    } catch (err) {
        console.log(JSON.stringify(err));
        return;
    }

    try {
        const groups = await api.getGroupsAsync();
        console.log(`Retrieved ${groups.length} groups.`);
    } catch (err) {
        console.log(JSON.stringify(err));
        return;
    }
}

main().then(() => console.log("Execution complete"));