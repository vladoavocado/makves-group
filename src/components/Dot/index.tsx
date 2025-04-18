type DotProps = {
    cx?: number;
    cy?: number;
    payloadKey?: string;
    payload?: any;
    color?: string;
};

export function Dot({ cx, cy, payload, payloadKey, color }: DotProps) {
    const isConditionMet = payload && payloadKey ? payload[payloadKey] > 1 : false;
    const fill = isConditionMet ? "red" : color;

    console.log({isConditionMet, fill, payload});

    return <circle cx={cx} cy={cy} r={4} fill={fill} strokeWidth={2} />;
}
