export declare const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
export declare enum Package {
    Frontend = "frontend",
    Backend = "backend"
}
export declare const FRONTEND_REGEXP: RegExp;
export declare const BACKEND_REGEXP: RegExp;
export declare class UnreachableCaseError extends Error {
    constructor(val: never);
}
export declare function copyTemplate(srcDir: string, targetDir: string): void;
export declare function updateTemplate(appName: string, targetDir: string, port: number): void;
export declare function editPackageJson(appName: string, targetDir: string, packageName: Package): void;
export declare function editEnvFile(port: number, targetDir: string, packageName: Package): void;
export declare function searchReplaceFile(regexp: RegExp, replace: string, filename: string): void;
export declare function findEmptyPort(): Promise<number>;
//# sourceMappingURL=helpers.d.ts.map