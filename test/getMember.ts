import D4H from '../lib/src/d4h'
import * as dotenv from 'dotenv';

dotenv.config()
const apiToken = process.env['apiToken']

if (!apiToken) {
    throw new Error('apiToken is not defined in the environment variables.');
}

// console.log(`Your API Token is: ${apiToken}`);

const d4hInstance = new D4H(apiToken);
const getmember = async (team: string, contextId: number, id: number) => {

    //const memberdata = await d4hInstance.getMember(team, contextId, id)
    console.log(id)
    const memberdata = await d4hInstance.getMembers(team, contextId)

    return memberdata
}

const logMember = async () => {
    const member = await getmember('team', 1614, 85292);
   // console.log(`${JSON.stringify(member, null, 2)}`);

   // const memberName = member.name
   // const memberDEM = member.ref

   console.log(member)
}

logMember();