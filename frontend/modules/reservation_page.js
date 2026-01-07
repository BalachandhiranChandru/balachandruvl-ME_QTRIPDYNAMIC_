import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const url = config.backendEndpoint + "/reservations";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    return null;
  }


  // Place holder for functionality to work in the Stubs
  // return null;
}

// Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  const noReservationBanner = document.getElementById("no-reservation-banner");
  const reservationTableParent = document.getElementById("reservation-table-parent");
  const reservationTableBody = document.getElementById("reservation-table");

  if (reservations.length == 0) {
    noReservationBanner.style.display = "block";
    reservationTableParent.style.display = "none";
    return;
  } else {
    noReservationBanner.style.display = "none";
    reservationTableParent.style.display = "block";
  }

  reservationTableBody.innerHTML = "";

  reservations.forEach(reservation => {
    const { id, name, date, price, time, person, adventureName, adventure } = reservation;
    // console.log( id, name, date, price, time, person, adventureName, adventure);
    const formattedDate = new Date(date).toLocaleDateString("en-IN");
    const formattedTime = new Date(time).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    }).replace(" at ", ", ");

    const tableRowElement = document.createElement("tr");
    tableRowElement.id = id;
    
    tableRowElement.innerHTML = `
      <tr><a href="../detail/?adventure=${adventure}">${adventureName}</a></tr>
      <td>${name}</td>
      <td>${adventureName}</td>
      <td>${person}</td>
      <td>${formattedDate}</td>
      <td>${price}</td>
      <td>${formattedTime}</td>
      <td>
        <div class="reservation-visit-button" id=${id}>
          <a href="../detail/?adventure=${adventure}">Visit Adventure</a>
        </div>
      </td>
    `;
    // reservationTableBody.append(tableRowElement);
    let myTable= document.getElementById("reservation-table");
    myTable.append(tableRowElement);
  });
}
// function addReservationToTable(reservations) {
//   // TODO: MODULE_RESERVATIONS
//   // 1. Add the Reservations to the HTML DOM so that they show up in the table
//   if (!Array.isArray(reservations) || reservations.length === 0) {
//     return; // Exits the function if there's no valid data to process.
//   }
//   const reservationBodyEleme = document.getElementById("reservation-table");
//   console.log(reservations);
//   reservations.map(reservation => {
//     const { id, name, date, price, time, person, adventureName, adventure } = reservation;
//     const tableRowElement = document.createElement("tr");
//     tableRowElement.innerHTML = `
//       <th>${id}</th>
//       <td>${name}</td>
//       <td>${adventureName}</td>
//       <td>${person}</td>
//       <td>${date}</td>
//       <td>${price}</td>
//       <td>${time}</td>
//       <td>
//         <div class="reservation-visit-button" id=${id}>
//           <a href="../detail/?adventure=${adventure}">Visit</a>
//         </div>
//       </td>
//     `;
//     reservationBodyEleme.append(tableRowElement);
//     console.log(reservationBodyEleme);
//   })

//   //Conditionally render the no-reservation-banner and reservation-table-parent

//   /*
//     Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
//     The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

//     Note:
//     1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
//     2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
//   */

// }

export { fetchReservations, addReservationToTable };
