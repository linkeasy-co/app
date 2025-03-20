import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import meImg from "../images/me.jpeg";

const Profile = () => {
    const [carrousselIndex, setCarrousselIndex] = useState(0);
    const [workIndex, setWorkIndex] = useState(0); // Novo estado para o carrossel de experiências de trabalho

    // Array de componentes diretamente no carrossel
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
                    I specialize in building and optimizing high-performance applications and data pipelines
                    that drive business intelligence and operational efficiency.
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
                <Typography style={{ textAlign: "center" }}>
                    Passionate about bridging the gap between software engineering and data-driven
                    decision-making, creating scalable, intelligent solutions.
                </Typography>
            </Grid>
        ),
    ];

    // Conteúdo do segundo carrossel (Experiências de Trabalho)
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
                <Typography style={{ textAlign: "center" }}>
                    **Company A** - Software Engineer (2018-2020): Developed scalable microservices and optimized data pipelines to improve system performance by 30%.
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
                <Typography style={{ textAlign: "center" }}>
                    **Company B** - Data Engineer (2020-2022): Designed and implemented ETL processes and big data solutions, transforming raw data into actionable insights.
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
                <Typography style={{ textAlign: "center" }}>
                    **Company C** - Cloud Infrastructure Engineer (2022-Present): Optimized cloud-native architectures for reliability and scalability, reducing operational costs by 25%.
                </Typography>
            </Grid>
        ),
    ];

    // Funções para navegação
    const handleLeftClick = () => {
        setCarrousselIndex((prevIndex) => (prevIndex === 0 ? carrousselContent.length - 1 : prevIndex - 1));
    };

    const handleRightClick = () => {
        setCarrousselIndex((prevIndex) => (prevIndex === carrousselContent.length - 1 ? 0 : prevIndex + 1));
    };

    const handleWorkLeftClick = () => {
        setWorkIndex((prevIndex) => (prevIndex === 0 ? workContent.length - 1 : prevIndex - 1));
    };

    const handleWorkRightClick = () => {
        setWorkIndex((prevIndex) => (prevIndex === workContent.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Grid container spacing={2} style={{ position: "relative" }}>
            {/* Avatar */}
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Avatar alt="Giovanni Cabral" src={meImg} sx={{ width: 150, height: 150 }} />
            </Grid>

            {/* Cabeçalhos */}
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", padding: "0", margin: "0" }}>
                <Grid item style={{ textAlign: "center" }}>
                    <h1>Giovanni Cabral</h1>
                    <h2>Data and Foundry Engineer</h2>
                </Grid>
            </Grid>

            {/* Primeiro Carrossel */}
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", padding: "0px 70px" }}>
                {carrousselContent[carrousselIndex]}
            </Grid>

            {/* Navegação Primeiro Carrossel */}
            <IconButton
                onClick={handleLeftClick}
                style={{
                    position: "absolute",
                    left: "20px",
                    top: "60%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#4CAF50",
                    color: "white",
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton
                onClick={handleRightClick}
                style={{
                    position: "absolute",
                    right: "20px",
                    top: "60%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#4CAF50",
                    color: "white",
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>

            {/* Segundo Carrossel: Experiências de Trabalho */}
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", padding: "20px 70px" }}>
                {workContent[workIndex]}
            </Grid>

            {/* Navegação Segundo Carrossel */}
            <IconButton
                onClick={handleWorkLeftClick}
                style={{
                    position: "absolute",
                    left: "20px",
                    top: "90%",
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
                    top: "90%",
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
