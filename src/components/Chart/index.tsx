import React, {useMemo} from 'react';
import { DatasetWithAttributes } from "../../types";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {useZScoreDataset} from "../../hooks";
import {Dot} from "../Dot";

type ChartProps = {
    data: DatasetWithAttributes;
};

export function Chart({ data }: ChartProps) {
    const metrics = useMemo(() => ['uv' as const, 'pv' as const], []);
    const colors = useMemo(() => ({ uv: '#82ca9d', pv: '#8884d8' }), []);
    const dataWithZScore = useZScoreDataset(data, metrics, colors);
    const dataLength = dataWithZScore.length - 1;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={dataWithZScore}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend
                    payload={metrics.map((metric) => ({
                        value: metric,
                        type: "line",
                        id: metric,
                        color: colors[metric],
                    }))}
                />
                {metrics.map((metric) => {
                    const id = `gradient-${metric}`;

                    return <defs key={metric}>
                        <linearGradient
                            id={id}
                            x1="0%"
                            y1="0"
                            x2="100%"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                        >
                            {dataWithZScore.map((entry, index) => {
                                return (
                                    <stop
                                        key={index}
                                        offset={`${Math.round(index / dataLength) * 100}%`}
                                        stopColor={entry[`${metric}ZColor`]}
                                    />
                                );
                            })}
                        </linearGradient>
                    </defs>
                })}

                {metrics.map((metric) => {
                   return <Line
                       stroke={`url(#gradient-${metric})`}
                       type="monotone"
                       dataKey={metric}
                       dot={<Dot payloadKey={`${metric}ZScore`} color={colors[metric]} />}
                       activeDot={<Dot payloadKey={`${metric}ZScore`} color={colors[metric]} />}
                   />
                })}
            </LineChart>
        </ResponsiveContainer>
    );
}