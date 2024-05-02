import Chart from "react-apexcharts";

const PieChart = (props) => {
  const { series, options } = props;

  return (
    <Chart
      options={options}
      type="pie"
      width="100%"
      height="70%"
      series={series}
    />
  );
};

export default PieChart;
