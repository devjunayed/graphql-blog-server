import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET
    }
}

