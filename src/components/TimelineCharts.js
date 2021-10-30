import Chart from "react-google-charts";
import load from "../logo.svg";

const TimelineCharts = (props) => {
    const loadData = () => {
        const header = [
            [
                { type: "string", id: "Product" },
                { type: "date", id: "Start" },
                { type: "date", id: "End" },
            ],
        ];
        const productDetails = [
            ...new Set(
                props.filtered.map((product) => {
                    const details = [
                        product["Product Name"],
                        Date.parse(product["Order Date"]),
                        Date.parse(product["Ship Date"]),
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
            chartType="Timeline"
            loader={
                <div>
                    <img src={load} className="App-logo" alt="load" />
                </div>
            }
            data={loadData()}
            options={{
                title: "Product sales chart",
                showRowNumber: true,
            }}
            rootProps={{ "data-testid": "1" }}
        />
    );
};

export default TimelineCharts;
