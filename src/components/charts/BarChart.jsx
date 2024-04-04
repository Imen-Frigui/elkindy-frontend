import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'events-bar-chart',
        },
        colors: ['#7091F5'], 
        xaxis: {
          categories: props.chartData.labels,
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        fill: {
          opacity: 1,
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          align: 'center',
          margin: 20,
          style: {
            fontSize: '24px',
          },
        },
      },
      series: [
        {
          name: 'Event Count',
          data: props.chartData.datasets[0].data,
        },
      ],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData) {
      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            categories: this.props.chartData.labels,
          },
        },
        series: [
          {
            name: 'Event Count',
            data: this.props.chartData.datasets[0].data,
          },
        ],
      });
    }
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="350"
        />
      </div>
    );
  }
}

export default BarChart;
