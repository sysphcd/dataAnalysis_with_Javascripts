import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef} from 'react';
import * as d3 from 'd3';

function App() {

  // 1 setup initial data and settings
  const initialData = [
    {
      name: "Car",
      value:10,
    },
    {
      name: "Food",
      value:3,
    },
    {
      name: "Telephone",
      value:9,
    },
    {
      name: "Electricity",
      value:7,
    },
    {
      name: "Cinema",
      value:7,
    },
  ];

  const width = 500;
  const height = 150;
  const padding =20;
  const maxValue = 20;

  const [chartdata, setChartdata] = useState(initialData); 

  const svgRef = useRef()

  // 2 setup random data generator and SVG canvas
  const newData = () => chartdata.map(
    function (d) {
      d.value = Math.floor(Math.random() * (maxValue + 1))
      return d
    }
  )

  useEffect(
    ()=>{
      // 3 setup functions for scales
       // define xscales
        const xScale = d3.scalePoint()
                        .domain(chartdata.map((d)=> d.name))
                        .range([(0+padding), (width-padding)])

        console.log('x Start - End ', xScale('Car'), xScale('Cinema'))
        //define yscales 
        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(chartdata, function (d) {return d.value})])
                        .range([(height-padding), (0+padding) ])
        console.log('y Start - End ', yScale(0),yScale(10))
      // 4 setup functions to draw lines
        const line = d3.line()
                      .x((d)=>xScale(d.name))
                      .y((d)=>yScale(d.value))
                      .curve(d3.curveMonotoneX)

        console.log('chart draw', line(chartdata))
      // 5 draw line :target specific attribute
        d3.select(svgRef.current)
        .select('path')
        .attr('d', (value)=>line(chartdata))
        .attr('fill', 'none')
        .attr('stroke', 'white')
      // 6 setup functions to draw x and y axes
        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

      // 7 draw x and y axes
        d3.select('#xaxis').remove()
        d3.select(svgRef.current)
          .append('g')
          .attr('transform', `translate(0,${height-padding})`)
          .attr('id','xaxis')
          .call(xAxis)

        d3.select('#yaxis').remove()
        d3.select(svgRef.current)
          .append('g')
          .attr('transform', `translate(${padding},0)`)
          .attr('id','yaxis')
          .call(yAxis)

    }, [chartdata]
  )



  return (
    <div className="App">
      <header className="App-header">

        {/* canvas area */}
        <svg id="chart"  ref={svgRef} viewBox="0 0 500 150">
          {/* <rect width="500" height="150" fill="blue" /> */}
          {/* draw a line from (50,50) position : d="M50,50 L100,150" */}
          <path d="" fill="none" stroke="white" strokeWidth="5" />
          {/* <path d="M20,20L135,97L250,30.999999999999996L365,53.00000000000001L480,53.00000000000001" fill="none" stroke="white" strokeWidth="5" /> */}

        </svg>
        <p>
          <button type="button" onClick={()=> setChartdata(newData())}>
            {/* Chart data --> {JSON.stringify(chartdata)} */}
            Click to refresh data
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
