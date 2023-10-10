import { useState } from "react";
import sun from "../assets/img/sun.png";
import moon from "../assets/img/moon.png";
import { Link } from "react-router-dom";

export const Nav = () => {
    const [currentTemp, setCurrentTemp] = useState("");
    const [wind, setWind] = useState("");
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");

    fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=2585eb18e183453e830183343230610&q=budapest"
    )
        .then((response) => response.json())
        .then((data) => {
            setCurrentTemp(data.current.temp_c);
            setWind(data.current.wind_kph);
            setSunrise(data.forecast.forecastday[0].astro.sunrise);
            setSunset(data.forecast.forecastday[0].astro.sunset);
        });

    var currentHour = new Date().getHours();
    var currentMinute = new Date().getMinutes().toString().padStart(2, "0");

    const apiSunrise24h = convertTo24HourFormat(sunrise);
    const apiSunset24h = convertTo24HourFormat(sunset);

    const apiSunriseParts = apiSunrise24h.split(":");
    const sunriseHour = parseInt(apiSunriseParts[0], 10);

    const apiSunsetParts = apiSunset24h.split(":");
    const sunsetHour = parseInt(apiSunsetParts[0], 10);

    function convertTo24HourFormat(time12h) {
        // Regular expression to match valid 12-hour time format
        var timeRegex = /^(\d{1,2}):(\d{2})\s?([APap][Mm])$/;

        // Check if the input time format matches the regular expression
        var timeTokens = time12h.match(timeRegex);

        // If the input format is invalid, return an error message
        if (!timeTokens) {
            return "Invalid time format";
        }

        var hours = parseInt(timeTokens[1]);
        var minutes = parseInt(timeTokens[2]);
        var period = timeTokens[3].toLowerCase();

        // Convert 12-hour time to 24-hour format
        if (period === "pm" && hours < 12) {
            hours += 12;
        } else if (period === "am" && hours === 12) {
            hours = 0;
        }

        // Format the hours and minutes to have leading zeros if necessary
        var formattedHours = hours.toString().padStart(2, "0");
        var formattedMinutes = minutes.toString().padStart(2, "0");

        // Return the time in 24-hour format
        return formattedHours + ":" + formattedMinutes;
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg sticky-top d-flex justify-content-evenly">
                <div className="weatherIcon">
                    <img
                        src={
                            currentHour >= sunriseHour &&
                            currentHour <= sunsetHour
                                ? sun
                                : moon
                        }
                        alt=""
                    ></img>{" "}
                    {currentHour}:{currentMinute}
                </div>
                <div>
                    Current weather in Budapest: {currentTemp}°C with a wind of{" "}
                    {wind}km/h.
                </div>

                <div>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="w-100 d-flex justify-content-center text-center">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <button>
                                    <Link to={"/"}>Home</Link>
                                </button>
                            </li>
                            <li class="nav-item">
                                <button>
                                    <Link to={"/task"}>Task</Link>
                                </button>
                            </li>
                            <li class="nav-item">
                                <button>
                                    <Link to={"/cat"}>Cat</Link>
                                </button>
                            </li>
                            <li class="nav-item">
                                <button>
                                    <Link to={"/ilyennincs"}>
                                        Non-existing menu
                                    </Link>
                                </button>
                            </li>
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown link
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <Link to={"/"}>Home</Link>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <Link to={"/task"}>Task</Link>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <Link to={"/cat"}>Cat</Link>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <Link to={"/ilyennincs"}>
                                                Non-existing menu
                                            </Link>{" "}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
