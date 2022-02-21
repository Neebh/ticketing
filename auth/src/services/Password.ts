import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);
export class Password {


    static async toHash(password: string): Promise<string> {
        const salt = randomBytes(8).toString('hex');
        const passwordHash = await scryptAsync(password, salt, 64) as Buffer;
        return `${passwordHash.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashPassword, salt] = storedPassword.split('.');
        const passwordHash = await scryptAsync(suppliedPassword, salt, 64) as Buffer;
        return passwordHash.toString('hex') === hashPassword;
    }
}