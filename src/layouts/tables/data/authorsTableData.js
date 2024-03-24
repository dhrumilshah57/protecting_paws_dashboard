/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import ImageModal from "ImageModal";
import S3 from "react-aws-s3-typescript";
import { useState, useEffect } from "react";

export default function data() {
  const [images, setImages] = useState([]);
  const fetchImages = () => {
    const ReactS3Client = new S3({
      accessKeyId: "AKIA5FTZBV5V5QLBMG7W",
      secretAccessKey: "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",
      bucketName: "animalpicsdata",
      region: "us-east-2",
      s3Url: "https://animalpicsdata.s3.us-east-2.amazonaws.com",
    });
    ReactS3Client.listFiles()
      .then((data) => {
        setImages(data.data.Contents);
        console.log(data.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchImages(); // Fetch images when component mounts
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <img
        src={image}
        style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
        width="100"
        height="50"
      />
      {/* <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox> */}
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Image", accessor: "Image", align: "left" },
      { Header: "Time", accessor: "Time", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Date", accessor: "Date", align: "center" },
    ],

    // rows: [
    //   {
    //     Image: imageComponents,
    //     Time: <Job title="Manager" description="Organization" />,
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     Date: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         23/04/18
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Edit
    //       </MDTypography>
    //     ),
    //   },
    // ],
    rows: images
      .filter((image) => image.Key.startsWith("animal_detection"))
      .sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified))
      .map((image, index) => ({
        // Image: <img key={index} src={image.publicUrl} width={200} height={200} />,
        Image: <ImageModal imageBase64={image.publicUrl} />,
        // Time: <Job title={image.LastModified} />,
        Time: <Job title={new Date(image.LastModified).toLocaleTimeString()} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        Date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {new Date(image.LastModified).toLocaleDateString()}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      })),
  };
}
