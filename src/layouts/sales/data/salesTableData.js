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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import moment from "moment";

// Billing page components
import Bill from "layouts/billing/components/Bill";

//graphql components
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const SALES =  gql`
query Sales{
    sales (sort: "SaleDate:desc"){
      data{
        attributes{
          SaleDate
          SaleAmount
          sales_agent{
            data{
              attributes{
                FirstName
                LastName
                
              }
            }
          }
          client{
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
      }
    }
  }
`

function SalesInformation() {
    const {loading, data, error} = useQuery(SALES);
    let rowsSales = []
    let rows
    let BusinessName, Email, FirstName, LastName, PhoneNumber, SoldBy_F, SoldBy_L

    data ? data.sales.data.map((sale)=>{
        console.log(sale.attributes.client.data.attributes.BusinessName);
        BusinessName= sale.attributes.client.data.attributes.BusinessName;
        Email = sale.attributes.client.data.attributes.Email;
        FirstName = sale.attributes.client.data.attributes.FirstName;
        LastName = sale.attributes.client.data.attributes.LastName;
        PhoneNumber = sale.attributes.client.data.attributes.PhoneNumber;
        SoldBy_F= sale.attributes.sales_agent.data.attributes.FirstName;
        SoldBy_L= sale.attributes.sales_agent.data.attributes.LastName;
        let object_row = [
            <Bill
            name={FirstName +" " + LastName}
            company={BusinessName}
            email={Email}
            Phone={PhoneNumber}
            SoldBy={SoldBy_F +" " + SoldBy_L}
            SaleDate= {moment(sale.attributes.SaleDate).utc().format('YYYY-MM-DD')}
            SaleAmount= {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(sale.attributes.SaleAmount)}
          />
        ]
        rowsSales.push(object_row)
    }):null
    if(data){
      rows = rowsSales
    }
    else{
        rows = [
            <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            Phone="FRB1235476"
            SoldBy="FRB1235476"
          />,
          <Bill
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            Phone="FRB1235476"
            SoldBy="FRB1235476"
          />,
          <Bill
            name="ethan james"
            company="fiber notion"
            email="ethan@fiber.com"
            Phone="FRB1235476"
            SoldBy="FRB1235476"
            noGutter
          />
        ]
    }
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Sales List
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {rows}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default SalesInformation;
