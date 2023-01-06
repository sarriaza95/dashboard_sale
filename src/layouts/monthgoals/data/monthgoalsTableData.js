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
query MonthGoal{
  monthGoals{
    data{
      attributes{
        MonthName
        AmountGoal
        AccumulateAmount
        isActive
      }
    }
  }
}
`

export default function monthgoalsTableData() {
  const {loading, data, error} = useQuery(CLIENTS);
  let rowsGoals = []
  let rows

  const Month = ({name}) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

    console.log(data)
  data ? data.monthGoals.data.map((goals)=>{
        console.log(goals)
        console.log(goals.attributes.isActive)
        let object_row = {month: <Month name={goals.attributes.MonthName} />,
        goal: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {goals.attributes.AmountGoal}
          </MDTypography>
        ),
        acumulate: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {goals.attributes.AccumulateAmount}
            </MDTypography>
          ),
          active: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {goals.attributes.isActive ? "True" : "False"}
            </MDTypography>
          ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),}
        rowsGoals.push(object_row)
        
      
    }):null
    console.log(rowsGoals);
    if(data){
      rows = rowsGoals
    }
    else{
      rows = [
        {
          month: <Month image={team2} name="John Michael" email="john@creative-tim.com" />,
          goal: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          acumulate: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          active: (
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
      { Header: "Month Name", accessor: "month", align: "left" },
      { Header: "Amount Goal", accessor: "goal", align: "center" },
      { Header: "Amount Acumulate", accessor: "acumulate", align: "center" },
      { Header: "Is Active", accessor: "active", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows
  }

};
