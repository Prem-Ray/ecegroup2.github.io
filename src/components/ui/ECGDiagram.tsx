import React, { useRef, useEffect } from 'react';
import { motion } from "framer-motion";

interface ECGDiagramProps {
    ecgData: string[]; 
}

const config = {
    graphWidth: 800,
    graphHeight: 200,
    lineColor: '#000',
    lineWidth: 1.5,
    backgroundColor: '#f8f9fa',
    gridColor: '#e0e0e0',
    pointsToShow: 800, // show more points to fill canvas
    verticalScale: 10, // adjust this to make waveform look nice
};

// const ecgData =  [2.09, -4.09, -0.01, 0, 0.4, -0.66, 0.53, 2.55, -2.04, 1, -0.9, -1.69, -0.67, -2.27, -2.03, -2.7, 0.03, -1.6, 0.44, -1.06, 0.99, 0.3, -0.47, 0.35, -0.16, -1.72, 2.63, 1.16, -1.58, 1.14, 2.11, -0.39, -0.04, 1, 2.8, -0.92, 1.31, 1.33, -0.17, -1.12, 3.29, 0.03, -1.4, 0.26, -0.57, 17.04, -17.1, 3.09, -0.79, -3.28, 2.57, 2.76, -0.52, -1.15, 3.28, -2.97, 1.3, -0.77, -0.68, -0.67, 2.33, -1.47, -0.25, -1.32, -0.03, -2.1, 0.79, -0.92, -1.89, -1.29, -0.83, -3.68, -1.87, -2.19, 1.18, -2.58, 1.54, 0.45, -0.35, -0.64, 0.54, 1.55, 1.96, -2.1, -0.51, 2.85, 1.88, -0.31, 1.57, -0.74, 2.63, 1.06, 5.11, 10.31, -15.57, -0.56, 2.64, 1.06, -1.09, 0.49, -3.05, 2.99, -0.7, 2.03, -0.2, -0.32, 1.57, -1.34, -0.33, -1.23, 1.28, -1.07, -1.01, 0.4, -0.86, -2.59, -1.36, -0.04, -3.2, 0.38, -1.66, 0.33, -0.97, 1, 0.6, 0.36, -2.36, 0.76, 2.28, -0.07, 0.89, 1.09, 1.31, -0.67, 4.33, 0.33, -2.47, 2.65, 0.17, 19.32, -19.77, 0.72, -0.13, 0.89, 0.89, -0.91, 0.81, -0.42, 1.86, -0.61, 2.04, 2.4, -0.46, -0.25, 0.18, -2.38, -4.94, -0.59, 1.04, 0.4, 0.44, 0.44, -1.66, -1.67, 0.73, -1.83, -0.48, -0.65, 0.24, -3.08, 2.49, -0.75, 0.32, -1.47, 1.05, 1.61, -0.14, 1.89, 1.99, 1, 2.4, -1.96, 0.6, 0.06, 2.61, 0.06, 2.11, 17.71, -19.03, 4.1, -2.39, -0.14, 1.49, -3.75, -0.28, 1.27, -1.57, 0.14, 1.81, 0.78, -0.92, -1.99, -2.6, -1.86, -0.89, -2.59, -1.36, -1.24, -0.82, 0.92, -2.81, 1.72, -2.13, 0.99, -1.1, 1.19, 1.72, 0.47, -2.35, -3.54, -2.45, 1.35, 0.24, -2.58, 0.84, 0.18, -3.28, 0.77, -0.52, 1.65, -1.54, 1.15, 0.11, 2.41, 2.14, 10.21, 7.82, -9.12, 2.29, 0.63, 0.66, 1.17, 3.72, -1.53, 1.85, 1.18, 0.62, 3.16, -0.38, 1.46, -0.65, -1.37, -2.54, -3.15, 0.68, -0.53, -0.75, -3.08, -1.41, -0.94, -0.89, -2.89, -0.19, -1.42, -3.34, 0.87, -4.11, 1.99, 1, 0.4, 0.14, -2.29, 0.87, -0.71, 0.83, 4.18, 2.92, -2.81, 1.02, 3.2, 1.82, 3.78, 5.68, 17.77, -18.62, 3.44, -1.06, -0.11, 0.59, 1.56, -0.74, 1.93, 0.99, -0.1, -0.81, -0.38, 0.46, -3.65, -1.87, -4.29, -2.03, -0.2, 0.58, 0.76, -1.92, 1.91, -1.61, -0.66, -0.27, -0.63, -1.56, -3.56, -0.76, -1.38, -0.24, -2.72, 1.63, -2.24, -0.52, 0.75, 0.67, 1.27, 1.83, 1.78, -1.82, 1.32, -2.07, -0.71, 0.83, 0.08, 15.61, -11.64, 3.04, 2.2, 0.92, -1.81, -0.18, 1.08, 2.71, 4.07, -1.29, -0.13, -1.71, 1.03, 0.4, -0.26, -0.93, -1.89, -1.49, -0.95, 0.21, -3.28, -2.63, 1.04, -1.9, -0.99, -0.5, -1.65, -1.46, 3.35, 1.94, -1.91, -0.09, 0.19, -1.88, 1.11, -0.49, -1.85, 0.32, 0.13, 2.11, -0.79, 3.12, 2.01, 1.2, 3.22, 0.22, 3.32, 13.03, -14.5, -0.65, -1.26, -0.73, 2.33, 1.23, 1.12, 2.21, -0.88, 1.41, -0.16, -1.42, -2.64, 2.34, -1.57, -3.46, -4.05, 1.4, -0.96, -2.9, 0.51, 1.05, 0.51, -1.55, -0.45, -2.15, -0.61, 0.54, -1.75, 0.63, 3.56, 0.16, -1.98, 0.2, -0.68, -1.87, 0.21, -0.58, 1.44, 0.24, 0.62, -2.84, 0.02, 1.7, 0.17, 3.52, 9.35, 1.94, -10.01, -2.1, 0.49, 2.85, -0.12, -0.01, 0.7, -1.93, -3.39, -3.24, -0.82, -0.18, -0.62, -0.96, -1.6, -1.96, -0.9, 1.71, -0.53, 2.05, 1.7, 0.97, 0.9, 0.99, 1.5, -0.55, 0.64, -1.34, 0.47, 1.95, 0.69, -2.93, -2.79, 1.92, 1.59, 0.86, 2.09, 3.61, -3.14, 1.39, 0.94, 1.49, -0.15, 4.98, 19.3, -17.87, 5.91, 0.89, 2.19, 2.02, 2.4, 0.64, 1.06, 1.21, 1.42, 2.74, 0.97, 0.6, -3.34, 0.47, -3.15, -0.22, -0.32, -0.63, 1.84, 1.38, 3.14, -3.69, -2.57, -3.46, -0.85, -2.98]



// const ECGDiagram: React.FC<ECGDiagramProps> = () => {
    const ECGDiagram: React.FC<ECGDiagramProps> = ({ ecgData })   =>{
    
    // const ecgData = [4.35, 0.54, 0.75, 0.88, 0.69, 1.07, -0.39, 1.56, 1.26, -0.57, -1.66, 1.13, 2.41, 0.04, -1.7, 36.23, -26.08, -5.91, 0.41, 1.14, 0.51, 2.55, 1.06, 3.11, 2.11, 3.51, -1.35, -4.23, -4.62, -1.36, -0.24, -0.22, 0.98, 0.3, -0.67, 1.63, 0.66, -3.53, 0.35, -0.97, -0.2, -0.22, 1.38, 0.84, 0.58, 0.16, -2.68, 0.33, 0.53, -1.15, -0.21, 32.28, -31.97, -1.4, 0.16, 0.42, 1.74, -0.83, -0.28, 1.27, 1.53, 2.25, -0.77, -2.98, -3.2, -0.22, -0.22, 0.98, 0.8, 1.78, 1.18, 0.32, 2.33, -0.57, 0.74, 1.17, 0.92, 0.49, 0.65, 1.56, 0.66, 0.17, -1.68, 0.83, -0.22, -0.42, -1.94, 25.51, -15.55, -9.05, 0.39, -0.56, 0.74, 0.77, 0.28, 1.13, 2.61, -0.94, -0.79, -5.18, -4.42, -3.14, -1.71, 1.03, -0.7, 0.83, 0.58, -1.74, 0.63, -0.04, 1, 0.1, 1.21, -0.28, 0.27, 0.63, 0.76, -0.02, -0.7, 0.43, 0.14, -1.69, 10.33, 22.53, -32.75, 1.43, -0.36, -0.24, 0.58, 0.46, 2.25, 1.72, 1.47, 0.35, -4.27, -4.23, -2.22, -1.32, -1.13, 0.89, -0.11, -0.01, -0.1, 1.79, -1.42, -0.04, 1.3, -0.67, -0.07, 1.09, 1.41, 0.34, -0.47, -0.75, 0.43, 1.44, -4.16, 25.58, 1.06, -21.29, 0.57, 0.66, 0.67, 2.47, 1.15, 2.41, 3.64, 1.16, 0.32, -3.37, -2.94, -2.79, 0.02, -0.7, 0.23, -0.48, 0.85, 0.29, -0.77, -0.28, -0.83, -0.18, -1.02, 0.1, 0.11, -0.59, 2.04, -0.2, -1.92, -0.89, 0.21, -0.18, -0.22, 3.28, 29.23, -32.78, 1.32, -0.07, 0.39, 1.54, 1.15, 1.82, 3.08, 2.81, 0.48, -1.45, -3.35, -3.53, -1.05, -0.41, 1.66, 0.07, 0.51, 1.25, -0.87, -0.09, 0.09, 0.51, -1.15, 0.29, -0.57, -0.26, -0.43, -0.24, -0.92, -1.79, 0.52, -0.85, -0.68, 1.03, 31.4, -33.56, 0.24, 1.42, -0.56, 0.74, 0.57, 2.26, 1.33, 2.43, -0.06, -1.31, -4.43, -3.24, -0.32, -1.53, 0.85, -0.02, 0.4, 0.34, 1.13, 0.51, -0.15, 1.49, 0.25, -0.18, 0.58, 2.16, 0.42, 0.74, 0.07, -1.39, 0.16, 0.32, -2.97, 19.5, 10.05, -27.49, 0.75, 0.48, 1.05, 0.3, 0.23, 2.32, 1.53, 0.65, 0.27, -3.17, -5.32, -1.93, -0.29, -0.53, -0.35, 0.56, 0.56, -0.34, 0.67, -0.83, 0.12, -0.19, 0.48, 0.75, -0.03, 0.9, -0.31, 1.77, 0.48, -1.05, -1.41, 0.06, 0.81, 0.18, -0.98, 31.2, -24.88, -4.39, 0.86, 0.49, 0.45, 0.94, 1.39, 3.04, 1.2, 1.22, -1.58, -4.96, -3.8, -1.38, -1.04, -0.2, 0.18, 0.32, -0.77, 0.32, 0.63, -0.84, 0.12, 0.91, -1.81, 0.12, -0.19, 1.18, 0.52, 0.55, -0.74, -1.07, 0.69, 0.77, 0.38, 2.54, 29.05, -31.29, 0.97, 0.4, 1.54, 0.25, 1.43, 2.24, 1.82, 1.88, 2.19, -1.38, -5.04, -2.7, -1.37, -0.64, -0.26, 0.47, 0.55, -0.45, 0.46, -0.55, -0.96, 0.1, -0.29, 0.77, -0.92, 0.81, -0.92, 0.01, 0.3, 0.93, -1.91, -1.09, 0.79, -0.52, -4.25, 22.67, 8.87, -28.11, 1.09, -0.09, 0.89, 0.99, 1.9, 2.29, 1.83, 2.58, -0.24, -3.52, -3.75, -1.18, -1.82, 0.52, 1.35, -0.06, 0.69, -0.23, 0.88, -0.71, 0.93, -0.41, -0.94, 0.01, -0.6, 1.24, -0.18, 0.88, 0.09, -1.19, -1.32, -0.13, 0.39, -1.06, -0.11, 31.79, -32.12, -1.21, 1.18, -0.48, 0.65, 1.47, 0.55, 2.05, 1.61, 2.26, -1.87, -3.29, -4.03, -1.1, -0.11, 0.69, 0.97, 0.5, 0.75, -0.13, 0.79, 0.18, 1.02, 0.4, -0.56, 1.44, 0.24, 0.92, 0.39, 1.14, -1.39, -0.64, 0.94, -1.11, -3.31, 15.87, 16.49, -30.65, 1.63, -0.74, 0.53, 0.55, 1.36, 1.14, 2.11, 1.91, -0.71, -3.87, -4.59, -3.56, -1.76, 0.22, -0.18, -0.52, 0.25, 0.22, 0.82, -0.52, 0.75, -0.73, 0.83, 0.68, -0.13, 1.49, 0.55, 0.85, -1.31, -0.23, 0.48, 0.75, -3.63, 24.54, -0.35, -21.03, 0.9, 0.59, 0.86, 0.59, 1.66, 1.37, 1.54, 1.15, -0.78]
    // ;
    console.log('in child',ecgData)
    
    // Step 1: Remove the square brackets and single quotes
    const cleanedString = ecgData.join(',').replace(/[\[\]']/g, "");

    // Step 2: Split the string into an array based on the commas
    const stringArray = cleanedString.split(",");

    // Step 3: Convert each string to a number
    const numericArray = stringArray.map(value => Number(value));

    // Output the numeric array
    console.log('new array to plot',numericArray);

    
    
    
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        initCanvas(canvas, ctx);
        drawECG(canvas,ctx);
    }, []);

    const initCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        canvas.width = config.graphWidth;
        canvas.height = config.graphHeight;
        canvas.style.backgroundColor = config.backgroundColor;
        drawGrid(ctx);
    };

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, config.graphWidth, config.graphHeight);
        ctx.strokeStyle = config.gridColor;
        ctx.lineWidth = 0.5;

        for (let x = 0; x <= config.graphWidth; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, config.graphHeight);
            ctx.stroke();
        }

        for (let y = 0; y <= config.graphHeight; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(config.graphWidth, y);
            ctx.stroke();
        }
    };

    const drawECG = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const points = numericArray.slice(0, config.pointsToShow);
        const maxY = Math.max(...points);
        const minY = Math.min(...points);
        const paddingY = 0.1 * (maxY - minY); // 10% vertical padding
        const adjustedMax = maxY + paddingY;
        const adjustedMin = minY - paddingY;
        const rangeY = adjustedMax - adjustedMin;
    
        ctx.beginPath();
        ctx.strokeStyle = config.lineColor;
        ctx.lineWidth = config.lineWidth;
    
        const xScale = config.graphWidth / (points.length - 1);
    
        points.forEach((value, index) => {
            const x = index * xScale;
            const y = config.graphHeight - ((value - adjustedMin) / rangeY) * config.graphHeight;
    
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
    
        ctx.stroke();
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;;
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'ecg-diagram.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };
    
    
   
return (
    <div className="flex items-center justify-center rounded-lg min-h-[50vh] bg-[#212121]" style={{ fontFamily: 'Arial, sans-serif' }}>
        <div className="border border-gray-300 rounded-2xl shadow-xl p-6 bg-[#f8f9fa] text-center w-[850px]">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">ECG Diagram</h1>
            <canvas ref={canvasRef} className="mb-6 w-full rounded-md shadow-sm" />
            
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadImage}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
                ⬇️ Download ECG Image
            </motion.button>
        </div>
    </div>
);

    
    
};

export default ECGDiagram;
