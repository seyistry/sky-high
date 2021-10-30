import Chart from "react-google-charts";
import load from "../logo.svg";

const Barcharts = (props) => {
    const year2014 = props.filtered.filter(
        (item) => item["Order Date"].substr(-4) === "2014"
    );
    const year2015 = props.filtered.filter(
        (item) => item["Order Date"].substr(-4) === "2015"
    );
    const year2016 = props.filtered.filter(
        (item) => item["Order Date"].substr(-4) === "2016"
    );
    const year2017 = props.filtered.filter(
        (item) => item["Order Date"].substr(-4) === "2017"
    );

    const totalSales = (items) => {
        let num = 0;
        const sumValues = items.map(
            (item) => (num = parseInt(item.Sales) + num)
        );
        return num;
    };

    const totalProfits = (items) => {
        let num = 0;
        const sumValues = items.map(
            (item) => (num = parseInt(item.Profit) + num)
        );
        return num;
    };

    const sales2014 = totalSales(year2014);
    const sales2015 = totalSales(year2015);
    const sales2016 = totalSales(year2016);
    const sales2017 = totalSales(year2017);

    const profit2014 = totalProfits(year2014);
    const profit2015 = totalProfits(year2015);
    const profit2016 = totalProfits(year2016);
    const profit2017 = totalProfits(year2017);

    return (
        <Chart
            width={"700px"}
            height={"300px"}
            chartType="Bar"
            loader={<div><img src={load} className="App-logo" alt="load" /></div>}
            data={[
                ["Year", "Sales", "Profit"],
                ["2014", sales2014, profit2014],
                ["2015", sales2015, profit2015],
                ["2016", sales2016, profit2016],
                ["2017", sales2017, profit2017],
            ]}
            options={{
                // Material design options
                chart: {
                    title: "Company Performance",
                    subtitle: "Sales, and Profit: 2014-2017",
                },
            }}
            // For tests
            rootProps={{ "data-testid": "2" }}
        />
    );
};

export default Barcharts;
