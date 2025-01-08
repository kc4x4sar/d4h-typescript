// Import environment variables before anything else
import * as dotenv from "dotenv"
dotenv.config();

import D4H, { GetMembersOptions } from "d4h-typescript"
import { env } from "process"

const token = env["D4H_TOKEN"]!;

let api = new D4H(token);

let getMembersOptions: GetMembersOptions = {
//    includeDetails: true,
//    includeCustomFields: true,
};

let main = async function() {
    const testGetMembers = false
    const testGetGroups = false
    const testGetMember = false

    // Only execute update code on an instance where that's OK.
    // Double-check your API key. Double-check what you're modifying.
    // try {
    //     const memberId = 103636 // Set this to a real ID
    //     await api.updateMemberAsync(memberId, {})
    // } catch (err) {
    //     console.log(JSON.stringify(err))
    //     return
    // }

    if (testGetMembers) {
        try {
            const context = 'team'
            const contextId = 1234
            const members = await api.getMembers(context, contextId, getMembersOptions)
            console.log(`Retrieved ${members.length} members.`)
        } catch (err) {
            console.log(JSON.stringify(err))
            return
        }
    }

    if (testGetGroups) {
        try {
            const context = 'team'
            const contextId = 1234
            const groups = await api.groups.getMemberGroups(context, contextId)
            console.log(`Retrieved ${groups.length} groups.`)
        } catch (err) {
            console.log(JSON.stringify(err))
            return
        }
    }

    if (testGetMember) {
        try {
            const context = 'team'
            const contextId = 1234
            const memberId = 103636
            const member = await api.getMember(context, contextId, memberId, { includeDetails: true })
            console.log(`Retrieved single member: ${member.name}`)
    
            // Only execute update code on an instance where that's OK.
            // Double-check your API key. Double-check what you're modifying.
            // const unitStatusField = member.custom_fields?.find(f => f.label === "Secondary Email")
            // if (unitStatusField) {
            //     await api.updateCustomFields(
            //         member,
            //         [{ id: unitStatusField.id, value: "test email" }],
            //         /* onlyMemberEditOwn */ true)
            // } else {
            //     throw new Error('Failed to find custom field')
            // }
        } catch(err) {
            console.log((err as Error).message);
            return
        }
    }
}

main().then(() => console.log("Execution complete"));