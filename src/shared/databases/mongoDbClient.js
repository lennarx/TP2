import { MongoClient } from "mongodb"
import { URI} from '../configs/config.js'

const client = new MongoClient(URI);

await client.connect();

export const database = client.db('TP2');