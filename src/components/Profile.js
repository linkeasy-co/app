import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import meImg from "../images/me.jpeg";
import exxon from "../images/exxon.png";
import baires from "../images/bairesdev.png";
import omens from "../images/omens.png";
import digi from "../images/digi.png";

const Profile = () => {
    const [carrousselIndex, setCarrousselIndex] = useState(0);
    const [workIndex, setWorkIndex] = useState(0);

    const carrousselContent = [
        (
            <Grid
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            >
                <Typography style={{ textAlign: "center" }}>
                    I am a software and data engineer specializing in system architecture, data pipelines, and cloud infrastructure. With expertise in Ruby on Rails, Node.js, React.js, and Palantir Foundry, I build scalable, efficient solutions. Holding an MBA in Software Engineering, I blend technical skill with strategic thinking to drive impactful projects and digital transformation. Passionate about turning data into actionable insights.
                </Typography>
            </Grid>
        ),
    ];

    const workContent = [
        (
            <Grid
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            >
                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <img
                        alt="BairesDev"
                        src={baires}
                        style={{ objectFit: "contain", width: 100, height: 100, borderRadius: "50%" }} // Adicionado borderRadius
                    />
                    <img
                        alt="ExxonMobil"
                        src={exxon}
                        style={{ objectFit: "contain", width: 100, height: 100, borderRadius: "50%" }} // Adicionado borderRadius
                    />
                </Grid>
                <Typography style={{ textAlign: "center", marginTop: "15px" }}>
                    <strong>BairesDev & ExxonMobil</strong><br />
                    Data and Foundry Engineer (2024 - Current): Developing scalable solutions and innovative data pipelines for operational and business intelligence.
                </Typography>
            </Grid>
        ),
        (
            <Grid
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            >
                <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                    <img
                        alt="Omens"
                        src={omens}
                        style={{ objectFit: "contain", width: 100, height: 100, borderRadius: "50%" }} // Adicionado borderRadius
                    />
                </Grid>
                <Typography style={{ textAlign: "center", marginTop: "15px" }}>
                    <strong>Omens</strong><br />
                    Tech Lead - Ruby on Rails (2024): Led development teams to deliver high-performance systems, improving application scalability and reliability.
                </Typography>
            </Grid>
        ),
        (
            <Grid
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            >
                <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                    <img
                        alt="Digigrow"
                        src={digi}
                        style={{ objectFit: "contain", width: 100, height: 100, borderRadius: "50%" }} // Adicionado borderRadius
                    />
                </Grid>
                <Typography style={{ textAlign: "center", marginTop: "15px" }}>
                    <strong>Digigrow</strong><br />
                    Intern to Tech Lead (2021-2024): Progressed from intern to leadership role, implementing efficient solutions and mentoring junior developers.
                </Typography>
            </Grid>
        ),
    ];

    const handleWorkLeftClick = () => {
        setWorkIndex((prevIndex) => (prevIndex === 0 ? workContent.length - 1 : prevIndex - 1));
    };

    const handleWorkRightClick = () => {
        setWorkIndex((prevIndex) => (prevIndex === workContent.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Grid container spacing={2} style={{ position: "relative", backgroundColor: "lightGray" }}>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Avatar alt="Giovanni Cabral" src={meImg} sx={{ width: 150, height: 150 }} />
            </Grid>


            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", padding: "0", margin: "0" }}>
                <Grid item style={{ textAlign: "center" }}>
                    <h1>Giovanni Cabral</h1>
                    <h2>Data and Foundry Engineer</h2>
                </Grid>
            </Grid>

            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", padding: "0px 70px" }}>
                {carrousselContent[carrousselIndex]}
            </Grid>

            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", padding: "20px 70px" }}>
                {workContent[workIndex]}
            </Grid>

            <IconButton
                onClick={handleWorkLeftClick}
                style={{
                    position: "absolute",
                    left: "20px",
                    top: "80%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#4CAF50",
                    color: "white",
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton
                onClick={handleWorkRightClick}
                style={{
                    position: "absolute",
                    right: "20px",
                    top: "80%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#4CAF50",
                    color: "white",
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Grid>
    );
};

export default Profile;
