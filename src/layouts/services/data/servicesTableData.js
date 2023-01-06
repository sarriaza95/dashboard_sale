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

const SERVICE =  gql`
query Services{
    services{
      data{
        attributes{
          Name
          Description
        }
      }
    }
  }
`

export default function servicesTableData() {
  const {loading, data, error} = useQuery(SERVICE);
  let rowsServices = []
  let rows

  const Name = ({name}) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
    console.log(data)
  data ? data.services.data.map((service)=>{
        console.log(service)
        let object_row = {service: <Name name={service.attributes.Name} />,
        description: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {service.attributes.Description}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),}
        rowsServices.push(object_row)
        
      
    }):null
    console.log(rowsServices);
    if(data){
      rows = rowsServices
    }
    else{
      rows = [
        {
          service: <Name image={team2} name="John Michael" email="john@creative-tim.com" />,
          description: (
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
      { Header: "Service Name", accessor: "service", align: "left" },
      { Header: "Description", accessor: "description", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows
  }

};
