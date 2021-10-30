import Chart from "react-google-charts";
import load from "../logo.svg";

const Composite = (props) => {
    const loadData = () => {
        const header = [["Product Name", "Sales", "Profit"]];
        const productDetails = [
            ...new Set(
                props.filtered.map((product) => {
                    const details = [
                        product["Product Name"],
                        parseInt(product["Sales"]),
                        parseInt(product["Profit"]),
                    ];
                    header.push(details);
                })
            ),
        ];
        return header
    };

    return (
        <Chart
            width={"700px"}
            height={"300px"}
            chartType="BarChart"
            loader={
                <div>
                    <img src={load} className="App-logo" alt="load" />
                </div>
            }
            data={loadData()}
            options={{
                title: "Product, Sales, and Profit performance",
                chartArea: { width: "50%" },
                isStacked: true,
                hAxis: {
                    title: "Total Sales, Profit and loss",
                    minValue: 0,
                },
                vAxis: {
                    title: "City",
                },
            }}
            // For tests
            rootProps={{ "data-testid": "3" }}
        />
    );
};

export default Composite;
