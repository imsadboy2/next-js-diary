'use client'

import { ResponsivePie } from '@nivo/pie'


const Chart = ({ data /* see data tab */ }:any) => (
    <ResponsivePie
        
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        sortByValue={true}
        innerRadius={0.1}
        padAngle={3}
        cornerRadius={6}
        activeOuterRadiusOffset={6}
        colors={{ scheme: 'pastel1' }}
        borderColor={{ theme: 'background' }}
        enableArcLinkLabels={false}
        arcLinkLabelsTextOffset={8}
        arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
        arcLinkLabelsOffset={13}
        arcLinkLabelsDiagonalLength={20}
        arcLinkLabelsStraightLength={23}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabel={e=>e.id+" "+e.value+"%"}
        arcLabelsSkipAngle={5}
        arcLabelsRadiusOffset={0.6}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        theme={{text: { fontSize : 20, fontWeight: 900}}}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 80,
                itemsSpacing: 3,
                itemWidth: 100,
                itemHeight: 80,
                itemTextColor: '#000',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 15,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default Chart