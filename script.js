document.getElementById('flightForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const flightNumber = document.getElementById('flightNumber').value.trim();
  const apiKey = '8c539e791182e2f06a8c398456993997'; // Your real API key

  const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Loading...';

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      resultDiv.innerHTML = 'No flight data found.';
      return;
    }

    const flight = data.data[0];
    const departure = flight.departure;
    const arrival = flight.arrival;

    function formatTime(timeStr) {
      return timeStr ? new Date(timeStr).toLocaleString() : 'N/A';
    }

    resultDiv.innerHTML = `
      <h3>${flight.airline.name} - ${flight.flight.iata}</h3>
      <p><strong>Status:</strong> ${flight.flight_status}</p>

      <h4>🛫 Departure</h4>
      <p><strong>Airport:</strong> ${departure.airport}</p>
      <p><strong>Scheduled Time:</strong> ${formatTime(departure.scheduled)}</p>
      <p><strong>Estimated Time:</strong> ${formatTime(departure.estimated)}</p>
      <p><strong>Terminal:</strong> ${departure.terminal || 'N/A'}</p>
      <p><strong>Gate:</strong> ${departure.gate || 'N/A'}</p>

      <h4>🛬 Arrival</h4>
      <p><strong>Airport:</strong> ${arrival.airport}</p>
      <p><strong>Scheduled Time:</strong> ${formatTime(arrival.scheduled)}</p>
      <p><strong>Estimated Time:</strong> ${formatTime(arrival.estimated)}</p>
      <p><strong>Terminal:</strong> ${arrival.terminal || 'N/A'}</p>
      <p><strong>Gate:</strong> ${arrival.gate || 'N/A'}</p>
    `;

  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = 'Error fetching flight data.';
  }
});
