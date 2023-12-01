// TableWithApi.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, generateTableHeaders, renderTableData } from '@modules/Table';

export default function Confirm() {
  const [reservationData, setReservationData] = useState([]);

  axios
    .get('http://140.238.0.188:3001/reservations')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://140.238.0.188:3001/reservations');
        setReservationData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Table>
      <thead>{generateTableHeaders(reservationData)}</thead>
      <tbody>{renderTableData(reservationData)}</tbody>
    </Table>
  );
}
