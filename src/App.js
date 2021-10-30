import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./datamellon.png";
import load from "./logo.svg";

import Barcharts from "./components/Barcharts";
import Composite from "./components/Composite";
import PieCharts from "./components/PieCharts";
import TableCharts from "./components/TableCharts";
import TimelineCharts from "./components/TimelineCharts";

function App() {
    const [initData, setInitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(false);

    const [state, setState] = React.useState("Alabama");
    const [states, setStates] = React.useState([]);

    const [segment, setSegment] = React.useState("Corporate");
    const [segments, setSegments] = React.useState([]);

    const [category, setCategory] = React.useState("Office Supplies");
    const [categories, setCategories] = React.useState([]);

    const [filtered, setFiltered] = React.useState([]);

    const getData = async () => {
        try {
            fetch(
                "https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub",
                {
                    method: "POST",
                    body: JSON.stringify({ angular_test: "angular-developer" }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            )
                .then((response) => response.json())
                .then((json) => {
                    setInitData(json);

                    setStates(
                        [
                            ...new Set(
                                json.map((state) => {
                                    return state[`State`];
                                })
                            ),
                        ].sort()
                    );

                    setSegments([
                        ...new Set(
                            json.map((segment) => {
                                return segment[`Segment`];
                            })
                        ),
                    ]);

                    setCategories([
                        ...new Set(
                            json.map((category) => {
                                return category[`Category`];
                            })
                        ),
                    ]);

                    setFiltered(
                        json.filter(
                            (item, index) =>
                                item.Segment === `${segment}` &&
                                item.State === `${state}` &&
                                item.Category === `${category}`
                        )
                    );
                    setIsLoading(false);
                });
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const updateFilter = async (type, value) => {
        switch (type) {
            case "state":
                setState(value);
                setReload(true);
                break;
            case "segment":
                setSegment(value);
                setReload(true);
                break;
            case "category":
                setCategory(value);
                setReload(true);
                break;
            default:
                console.log("invalid");
        }
    };

    const filterItem = async () => {
        setIsLoading(true);
        try {
            setFiltered(
                initData.filter(
                    (item, index) =>
                        item.Segment === `${segment}` &&
                        item.State === `${state}` &&
                        item.Category === `${category}`
                )
            );
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const hotReload = () => {
        if (reload) {
            filterItem();
            setReload(false);
        }
    };

    return (
        <div className="App">
            {hotReload()}
            {isLoading ? (
                <div className="body">
                    <div className="element">
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="mt-5">
                            <img src={load} className="App-logo" alt="load" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-3 fixed-top d-flex justify-content-center align-items-center h-100">
                            <div className="">
                                <img
                                    src={logo}
                                    className="img-fluid mb-3"
                                    alt="logo"
                                />
                                <select
                                    className="form-select form-select-sm spaceBottom"
                                    value={state}
                                    onChange={(event) =>
                                        updateFilter(
                                            "state",
                                            event.target.value
                                        )
                                    }
                                >
                                    {states.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="form-select form-select-sm spaceBottom"
                                    value={segment}
                                    onChange={(event) =>
                                        updateFilter(
                                            "segment",
                                            event.target.value
                                        )
                                    }
                                >
                                    {segments.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="form-select form-select-sm spaceBottom"
                                    value={category}
                                    onChange={(event) =>
                                        updateFilter(
                                            "category",
                                            event.target.value
                                        )
                                    }
                                >
                                    {categories.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-5 fw-bold gray">Coming Soon</p>
                                <select
                                    class="form-select form-select-sm spaceBottom"
                                    aria-label="Disabled"
                                    disabled
                                >
                                    <option selected>Quantity</option>
                                </select>
                                <select
                                    class="form-select form-select-sm spaceBottom"
                                    aria-label="Disabled"
                                    disabled
                                >
                                    <option selected>Order Date</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-9 offset-3 ">
                            {filtered.length < 1 ? (
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <div>
                                        <h3 className="text-danger fw-light">
                                            No Information
                                        </h3>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 class="fw-bold mt-2 ">Bar Chart </h3>
                                    <div className="shadow-sm p-4 mb-4 mt-4">
                                        <Barcharts filtered={filtered} />
                                    </div>

                                    <h3 class="fw-bold ">
                                        Composite Bar Chart{" "}
                                    </h3>
                                    <div className="shadow-sm p-4 mb-5 mt-4">
                                        <Composite filtered={filtered} />
                                    </div>

                                    <h3 class="fw-bold ">Pie Chart </h3>
                                    <div className="shadow-sm p-4 mb-5 mt-4">
                                        <PieCharts filtered={filtered} />
                                    </div>

                                    <h3 class="fw-bold ">TimeLine Chart </h3>
                                    <div className="shadow-sm p-4 mb-5 mt-4">
                                        <TimelineCharts filtered={filtered} />
                                    </div>

                                    <h3 class="fw-bold "> Tables </h3>
                                    <div className="shadow-sm p-4 mb-5 mt-4">
                                        <TableCharts filtered={filtered} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
