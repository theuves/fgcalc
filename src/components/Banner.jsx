import React from 'react';

export default function Banner() {
    return (
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white py-8 mb-10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">
                            Open Source AWS Fargate Calculator
                        </h2>
                        <p className="text-purple-100 text-base md:text-lg leading-relaxed">
                            Calculate your AWS Fargate costs instantly! This free tool helps you estimate pricing
                            for your containerized workloads with precision and ease.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <a
                            href="https://github.com/theuves/fgcalc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            ⭐ Star on GitHub
                        </a>
                        <a
                            href="https://fidalgoitsolutions.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-100 hover:text-white text-sm underline transition-colors duration-200"
                        >
                            Powered by Fidalgo IT Solutions
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
