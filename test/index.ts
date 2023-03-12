import D4H, { GetMembersOptions } from "d4h-typescript"
import Config from "./config"

let api = new D4H(Config.d4hToken);

let getMembersOptions: GetMembersOptions = {
    includeDetails: true,
    includeCustomFields: true,
};

let main = async function() {
    try {
        let members = await api.getMembers(getMembersOptions);
        console.log(`Retrieved ${members.length} members.`);
    } catch (err) {
        console.log(JSON.stringify(err));
        return;
    }

    try {
        let groups = await api.getGroups();
        console.log(`Retrieved ${groups.length} groups.`);
    } catch (err) {
        console.log(JSON.stringify(err));
        return;
    }
    
}

main().then(() => console.log("Execution complete"));