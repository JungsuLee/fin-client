import React, { useEffect, useRef } from 'react';
import { scaleBand, select, axisBottom } from 'd3';
import { Card } from '@blueprintjs/core';
import { months } from '../../pages/helpers';


export default (props: {
    title: string,
    data: number[],
}) => {
    const svgRef = useRef(null);
    const legendRef = useRef(null);
    const normalize = (value: number) => Number((value / 1000).toFixed(1)) * 10;
    
    useEffect(() => {
        if (svgRef.current) {
            const len = props.data.length ;
            const w = 600;
            const h = 120;
            const svg = select(svgRef.current);
            const xScale = scaleBand()
                .domain(months.map(m => m.slice(0,3)))
                .range([0, w]);
            const xAxis = axisBottom(xScale);
            svg
                .append('g')
                .attr('transform', `translate(0,${h})`)
                .call(xAxis)
            svg
                .selectAll('rect')
                .data(props.data)
                .join('rect')
                .attr('x', (d, i) => i * (w / len))
                .attr('y', (d: any) => h - normalize(d))
                .attr('fill', (d, i) => {
                    if (i % 3 === 0) {
                        return 'teal';
                    } else if (i % 3 === 1) {
                        return 'tomato';
                    } else if (i % 3 === 2) {
                        return 'purple';
                    } else {
                        return '';
                    }
                })
                .attr('width', 15)
                .attr('height', (d: any) => normalize(d))
            
            const legendSvg = select(legendRef.current);
            legendSvg
                .selectAll('circle')
                .data(['teal', 'tomato', 'purple'])
                .join('circle')
                .attr('r', 5)
                .attr('cx', 540)
                .attr('cy', (d, i) => (12 * i) + 10)
                .attr('fill', (d) => d)
            legendSvg
                .selectAll('text')
                .data(['offering', 'expense', 'revenue'])
                .join('text')
                .text((d) => d)
                .attr('x', 550)
                .attr('y', (d, i) => (13 * i) + 12)
                
        }
    }, [props.data])

    return <Card>
        <h3>{props.title}</h3>
        <div>
            <svg width={600} height={50} ref={legendRef} />
        </div>
        <div>
            <svg width={600} ref={svgRef} />
        </div>
    </Card>
}