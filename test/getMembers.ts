import D4H from '../lib/src/d4h'
import * as dotenv from 'dotenv';

dotenv.config()
const apiToken = process.env['apiToken']

if (!apiToken) {
    throw new Error('apiToken is not defined in the environment variables.');
}

// console.log(`Your API Token is: ${apiToken}`);

const d4hInstance = new D4H(apiToken);
const getmembers = async (team: string, contextId: number) => {

    const memberdata = await d4hInstance.getAnimals(team, contextId)

    return memberdata
}

const logMember = async () => {
    const members = await getmembers('team', 1614);

   console.log(`${JSON.stringify(members, null, 2)}`);

}

logMember();