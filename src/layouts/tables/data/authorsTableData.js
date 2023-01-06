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

const SALESAGENT =  gql`
query Agents ($month: String!){
  salesAgents{
    data{
      attributes{
        Email
        FirstName
        LastName
        agent_goals (filters:{MonthName:{eq:$month}}){
          data{
            attributes{
              MonthName 
              AccumulateGoal
              AmountGoal1
              AmountGoal2
              AmountGoal3
            }
          }
        }
      }
    }
  }
}
`

export default function authorsTableData() {
  const [dataagent, setdataagent] = useState(null)
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();
  const actual_month = monthNames[d.getMonth()];
  const {loading, data, error} = useQuery(SALESAGENT,{
    variables: {month: actual_month}
  });
  let rowsAgents = []
  let rows
  let goal
  let month_name
  let amount1, amount2, amount3
  

  const Agent = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
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
    
  data ? data.salesAgents.data.map((agents)=>{
        console.log(agents)
        {agents.attributes.agent_goals.data.map((goals)=>{
          goal= goals.attributes.AccumulateGoal;
          month_name = goals.attributes.MonthName;
          amount1 = goals.attributes.AmountGoal1;
          amount2 = goals.attributes.AmountGoal2;
          amount3 = goals.attributes.AmountGoal3;
        })}
        console.log(agents.attributes.FirstName);
        let object_row = {agent: <Agent image={team2} name={agents.attributes.FirstName} />,
        lastname: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {agents.attributes.LastName}
          </MDTypography>
        ),
        email: <Email title={agents.attributes.Email} />,
        accumulate: <Email title={goal} />,
        month: <Email title={month_name} />,
        goal1: <Email title={amount1} />,
        goal2: <Email title={amount2} />,
        goal3: <Email title={amount3} />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),}
        rowsAgents.push(object_row)
        console.log(rowsAgents);
      
    }):null
    console.log(rowsAgents);
    if(data){
      rows = rowsAgents
    }
    else{
      rows = [
        {
          agent: <Agent image={team2} name="John Michael" email="john@creative-tim.com" />,
          lastname: <Email title="Manager" description="Organization" />,
          email: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          accumulate: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          month: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          goal1: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          goal2: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          goal3: (
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
      { Header: "Agent Name", accessor: "agent", align: "left" },
      { Header: "Lastname", accessor: "lastname", align: "center" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Accumulate Goal", accessor: "accumulate", align: "center" },
      { Header: "Month", accessor: "month", align: "center" },
      { Header: "Goal 1", accessor: "goal1", align: "center" },
      { Header: "Goal 2", accessor: "goal2", align: "center" },
      { Header: "Goal 3", accessor: "goal3", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows
  }

};
