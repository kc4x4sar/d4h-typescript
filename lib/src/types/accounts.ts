export interface Account {
    id: number;
    resourceType: string;
}

export interface ContextOwner {
    resourceType: string;
    id: number;
    title?: string;
    owner?: ContextOwner;
}

export interface Permissions {
    [key: string]: {
        [action: string]: boolean;
    };
}

export interface Context {
    id: number;
    owner: ContextOwner;
    name: string;
    hasAccess: boolean;
    resourceType: string;
    permissions: Permissions;
}

export interface WhoAmIType {
    account: Account;
    context: Context;
}
