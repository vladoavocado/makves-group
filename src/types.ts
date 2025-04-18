type NumericKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type WithStats<T> = T & {
    [K in NumericKeys<T> as `${string & K}ZScore`]?: number;
} & {
    [K in NumericKeys<T> as `${string & K}ZColor`]?: string;
}

export type DataItem = {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}

export type DataItemWithAttributes = WithStats<DataItem>;

export type Dataset = DataItem[];

export type DatasetWithAttributes = DataItemWithAttributes[];

export type DatasetOptions = {
    color: string;
}