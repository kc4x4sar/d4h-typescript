export enum CustomFieldType {
    Number = 'number',
    Text = 'text',
    Date = 'date',
}

export interface CustomField {
    id: number;
    type: CustomFieldType;
    label: string;
    value_string: string | null;
    value: string | null;
    bundle: unknown | null;
    member_edit_own: boolean;
}

export interface CustomFieldUpdate {
    id: number;
    value: string | null;
}