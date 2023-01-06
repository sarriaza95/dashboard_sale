/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Top Floor Marketing - Sale Dashboard - v1.0.0
=========================================================

* Copyright 2023 Top Floor Marketing (https://topfloormarketing.net/)

Coded by https://topfloormarketing.net/

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

// Images
import team2 from "assets/images/team-2.jpg";
/* import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg"; */

const CLIENTS =  gql`
query Clients{
    clients{
      data{
        attributes{
          FirstName
          LastName
          BusinessName
          Email
          PhoneNumber
        }
      }
    }
  }
`

export default function clientsTableData() {
  const {loading, data, error} = useQuery(CLIENTS);
  let rowsClients = []
  let rows

  const Client = ({name}) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Email = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      
    </MDBox>
  );
    console.log(data)
  data ? data.clients.data.map((clients)=>{
        console.log(clients)
        let object_row = {client: <Client name={clients.attributes.FirstName} />,
        lastname: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {clients.attributes.LastName}
          </MDTypography>
        ),
        business: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {clients.attributes.BusinessName}
            </MDTypography>
          ),
          phone: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {clients.attributes.PhoneNumber}
            </MDTypography>
          ),
        email: <Email title={clients.attributes.Email} />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),}
        rowsClients.push(object_row)
        
      
    }):null
    console.log(rowsClients);
    if(data){
      rows = rowsClients
    }
    else{
      rows = [
        {
          client: <Client image={team2} name="John Michael" email="john@creative-tim.com" />,
          lastname: <Email title="Manager" description="Organization" />,
          business: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          email: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          phone: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          action: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
          ),
        }
      ]
    }
  return {
    columns: [
      { Header: "Client Name", accessor: "client", align: "left" },
      { Header: "Client Lastname", accessor: "lastname", align: "center" },
      { Header: "Business Name", accessor: "business", align: "center" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Phone Number", accessor: "phone", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows
  }

};
