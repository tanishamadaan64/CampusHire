import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { isStudent } from "../auth/isAuthorized";
import Company from "./Company";
import CreateCompany from "../CreateCompany";
function Home() {
    const [studentData, setStudentData] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const chartRef = useRef(null);
    const pieChartRef = useRef(null);
    const ctcChartRef = useRef(null);
    useEffect(() => {
        // Fetch student data sorted by batch
        axios.get("http://localhost:5000/api/get/students?sortBy=batch")
            .then(response => {
                setStudentData(response.data);
            })
            .catch(error => {
                console.error("Error fetching student data:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch company data sorted by CTC
        axios.get("http://localhost:5000/api/get/companies?sortBy=offered_ctc")
            .then(response => {
                console.log("Company data:", response.data); // Log company data
                setCompanyData(response.data);
            })
            .catch(error => {
                console.error("Error fetching company data:", error);
            });
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            renderBarChart();
        }
        if (pieChartRef.current) {
            renderPieChart();
        }
        if (ctcChartRef.current) {
            renderCTCChart();
        }
    }, [studentData, companyData]);

    const renderBarChart = () => {
        const batchCounts = {};
        // Count students by batch
        studentData.forEach(student => {
            const { batch } = student;
            if (batchCounts[batch]) {
                batchCounts[batch]++;
            } else {
                batchCounts[batch] = 1;
            }
        });
        // Convert batch counts to chart data format
        const chartData = {
            labels: Object.keys(batchCounts),
            datasets: [
                {
                    label: "Number of Students",
                    backgroundColor: "rgba(7, 65, 115,1)",
                    borderColor: "rgba(0,0,0,1)",
                    borderWidth: 0,
                    data: Object.values(batchCounts)
                }
            ]
        };
        // Destroy existing Chart instance
        if (chartRef.current && chartRef.current.chartInstance) {
            chartRef.current.chartInstance.destroy();
        }
        // Render new chart
        const ctx = chartRef.current.getContext("2d");
        chartRef.current.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    xAxes: [{
                        type: 'category',
                        scaleLabel: {
                            display: true,
                            labelString: 'Batch'
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        beginAtZero: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of Students'
                        }
                    }]
                }
            }
        });
    };

    const renderPieChart = () => {
        const branchCounts = {};
        // Count students by branch
        studentData.forEach(student => {
            const { branch } = student;
            if (branchCounts[branch]) {
                branchCounts[branch]++;
            } else {
                branchCounts[branch] = 1;
            }
        });
        // Convert branch counts to chart data format
        const chartData = {
            labels: Object.keys(branchCounts),
            datasets: [
                {
                    label: "Number of Students",
                    backgroundColor: [
                        'rgb(45, 70, 185)',
                        'rgb(255, 75, 145)',
                        'rgb(255, 184, 76)',
                        'rgb(71, 9, 56)',
                        'rgb(26, 62, 89)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 0,
                    data: Object.values(branchCounts)
                }
            ]
        };
        // Destroy existing Pie Chart instance
        if (pieChartRef.current && pieChartRef.current.chartInstance) {
            pieChartRef.current.chartInstance.destroy();
        }
        // Render new Pie Chart
        const ctx = pieChartRef.current.getContext("2d");
        pieChartRef.current.chartInstance = new Chart(ctx, {
            type: 'pie',
            data: chartData,
            options: {
                title: {
                    display: true,
                    text: 'Students by Branch'
                }
            }
        });
    };

    const renderCTCChart = () => {
        console.log("Rendering CTC Chart...");
        const ctcCounts = {};
        // Count companies by CTC
        companyData.forEach(company => {
            const { offered_ctc } = company;
            if (ctcCounts[offered_ctc]) {
                ctcCounts[offered_ctc]++;
            } else {
                ctcCounts[offered_ctc] = 1;
            }
        });
        // Convert CTC counts to chart data format
        const chartData = {
            labels: Object.keys(ctcCounts),
            datasets: [
                {
                    label: "Number of Companies",
                    backgroundColor: "rgb(18, 55, 42)",
                    borderColor: "rgba(0,0,0,1)",
                    borderWidth: 0,
                    data: Object.values(ctcCounts)
                }
            ]
        };
        // Destroy existing CTC Chart instance
        if (ctcChartRef.current && ctcChartRef.current.chartInstance) {
            ctcChartRef.current.chartInstance.destroy();
        }
        // Render new CTC Chart
        const ctx = ctcChartRef.current.getContext("2d");
        ctcChartRef.current.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        scaleLabel: {
                            display: true,
                            labelString: 'CTC (Cost to Company)'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });
    };

    return (
        <div>
    {!isStudent() && (
        <div>
            <div className="d-flex">
                <div className="d-flex flex-column col-6" style={{ marginRight: '1px' }}>
                    <h4>Students by Batch</h4>
                    <canvas ref={chartRef} style={{ maxHeight: '350px', maxWidth: '500px' }} />
                </div>
                <div className="d-flex flex-column justify-content-center col-6">
                    <h4>Students by Branch</h4>
                    <canvas ref={pieChartRef} style={{ maxHeight: '300px', maxWidth: '500px' }} />
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-column col-6" style={{ marginRight: '1px' }}>
                    <h4>Companies by CTC</h4>
                    <canvas ref={ctcChartRef} style={{ maxHeight: '350px', maxWidth: '500px' }} />
                </div>
            </div>
        </div>
    )}
    {isStudent() && (
        <div className="container">
            <h1 className="mt-3 mb-5 fw-bold text-center">Welcome to the Student Placement Portal</h1>
            <p className="mt-3 lead fw-bold ">Explore career opportunities with companies visiting our campus:</p>
            <ul>
                <li>Stay updated on visiting companies and their recruitment processes.</li>
                <li>Discover internship and job openings tailored to your interests.</li>
                <li>Access insights into company profiles, cultures, and growth prospects.</li>
            </ul>
            <p className="mt-3 lead fw-bold">Prepare for success:</p>
            <ul>
                <li>Receive interview preparation resources and tips customized for visiting companies.</li>
                <li>Engage with mock interview sessions and skill-building workshops.</li>
                <li>Network with industry professionals and expand your connections.</li>
            </ul>
            <p className="mt-3 lead fw-bold">Empower your career growth:</p>
            <ul>
                <li>Seek guidance from career advisors to navigate your career path effectively.</li>
                <li>Participate in professional development opportunities to enhance your skills and employability.</li>
            </ul>
            <p className="mt-4 lead fw-bold text-center">"Join us in shaping your career journey and seizing the opportunities available through our student portal!"</p>
        </div>
    )}
</div>

    );

}

export default Home;
