import Chart from "react-google-charts";
import load from "../logo.svg";

const TableCharts = (props) => {
    const loadData = () => {
        const header = [
            [
                { type: "string", label: "Product Name" },
                { type: "number", label: "Price" },
                { type: "number", label: "Profit" },
                { type: "number", label: "Quanity" },
                { type: "string", label: "Date Ordered" },
            ],
        ];
        const productDetails = [
            ...new Set(
                props.filtered.map((product) => {
                    const details = [
                        product["Product Name"],
                        parseInt(product["Sales"]),
                        parseInt(product["Profit"]),
                        parseInt(product["Quantity"]),
                        product["Order Date"],
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
            chartType="Table"
            loader={
                <div>
                    <img src={load} className="App-logo" alt="load" />
                </div>
            }
            data={loadData()}
            options={{
                showRowNumber: true,
            }}
            rootProps={{ "data-testid": "1" }}
        />
    );
};

export default TableCharts;
