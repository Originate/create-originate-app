import { Env } from "./env";
export declare class ConfigService {
    env: Env;
    constructor();
    get isDev(): boolean;
    /**
     * Checks that `NODE_ENV == "development"`, and adds an extra sanity check
     * that `DATABASE_URL` is local to avoid synchronizing schema to a production
     * database.
     */
    get isDevDatabase(): boolean;
    get isTest(): boolean;
    get isLocalDatabase(): boolean;
}
//# sourceMappingURL=config.service.d.ts.map