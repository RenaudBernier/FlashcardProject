import {get} from '@/app/api/firestore.js'

export default async function getcards(path) {
    const folder = await get(path);
}