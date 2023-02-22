let data = [];
const map1 = new Map();
let mapSort = new Map();
console.clear();
let x = [];
let y = [];

// Fetching data from local json
fetch("./data.json")
  .then((res) => res.json())
  .then((json) => {
    data = json;
  });

// grabbing the form
const form = document.querySelector(".form1");
const dateInput = form.querySelector("#date");

// Liosning to the submit event on the form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const dateValue = dateInput.value; // Get date input value
  const date = new Date(dateValue); // Convert to Date object

  console.log(dateValue); // Log the date object to the console
  // console.log((data[0].schedule_time).substring(12))

  const temp = data.filter(func);

  //   Function to filter the data and add that data in map
  function func(item) {
    let s = "";
    let c = 0;
    for (let i of item.schedule_time) {
      if (c > 10) break;
      else {
        s += i;
        c++;
      }
    }
    s.trim();
    if (item.item_date === dateValue) {
      console.log(s);
      if (map1.get(s) === undefined) {
        map1.set(s, 1);
      } else {
        let value = map1.get(s);
        map1.delete(s);
        map1.set(s, value + 1);
      }
    }

    return item.item_date === dateValue;
  }

  //   Reversing the map
  const mapSort = new Map([...map1.entries()].reverse());

  for (const [key, value] of mapSort) {
    x.push(key);
    y.push(value);
  }

  // get the canvas element
  const canvas = document.getElementById("myChart");

  // get the context
  const ctx = canvas.getContext("2d");

  // create a new chart
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: x,
      datasets: [
        {
          label: "# of meals scheduled vs day",
          data: y,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  document.querySelector(".newChart").addEventListener("click", function () {
    myChart.destroy();
    map1.clear();
    mapSort.clear();
    x = [];
    y = [];
    dateInput.value = "";
  });

  const form2 = document.querySelector(".form2");
  const dateInput2 = form2.querySelector("#date2");

  form2.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const dateValue2 = dateInput2.value; // Get date input value
    const date = new Date(dateValue); // Convert to Date object

    // Log the date object to the console

    let arr = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let item of data) {
      let time = item.schedule_time.substring(12);
      let date = item.schedule_time.substring(0, 10);
      if (date === dateValue2 && item.item_date === dateValue) {
        console.log(time);
        if (time >= "21:00:00" && time < "23:59:59") arr[0]++;
        else if (time >= "0:00:00" && time < "3:00:00") arr[1]++;
        else if (time >= "3:00:00" && time < "6:00:00") arr[2]++;
        else if (time >= "6:00:00" && time < "9:00:00") arr[3]++;
        else if (time >= "9:00:00" && time < "12:00:00") arr[4]++;
        else if (time >= "12:00:00" && time < "15:00:00") arr[5]++;
        else if (time >= "15:00:00" && time < "18:00:00") arr[6]++;
        else if (time >= "18:00:00" && time < "21:00:00") arr[7]++;
      }
    }

    // get the context
    const ctx2 = document.getElementById("myChart2").getContext("2d");

    // create a new chart
    const myChart2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: [
          "9pm-12am",
          "12am-3am",
          "3am-6am",
          "6am-9am",
          "9am-12pm",
          "12pm-3pm",
          "3pm-6pm",
          "6pm-9pm",
        ],
        datasets: [
          {
            label: "# of meals ordered vs time",
            data: arr,
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 159, 64, 0.8)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    document.querySelector(".newChart2").addEventListener("click", function () {
      myChart2.destroy();
      arr = [];
      dateInput2.value = "";
    });
  });
});
