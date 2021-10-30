import Chart from "react-google-charts";
import load from "../logo.svg";

const PieCharts = (props) => {
    const loadData = () => {
        const header = [["Product Name", "Sales"]];
        const productDetails = [
            ...new Set(
                props.filtered.map((product) => {
                    const details = [
                        product["Product Name"],
                        parseInt(product["Sales"]),
                    ];
                    header.push(details);
                })
            ),
        ];
        return header;
    };

    return (
        <Chart
            width={"700px"}
            height={"300px"}
            chartType="PieChart"
            loader={
                <div>
                    <img src={load} className="App-logo" alt="load" />
                </div>
            }
            data={loadData()}
            options={{
                title: "Product sales chart",
            }}
            rootProps={{ "data-testid": "1" }}
        />
    );
};

export default PieCharts;
