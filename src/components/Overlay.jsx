import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, Instagram } from 'lucide-react'

const Section = ({ children, className = "" }) => (
    <section className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col justify-center ${className}`}>
        {children}
    </section>
)

const SectionCard = ({ children, className = "" }) => (
    <div className={`backdrop-blur-lg bg-slate-900/80 p-10 rounded-3xl border border-white/20 shadow-2xl ${className}`}>
        {children}
    </div>
)

export const Overlay = () => {
    return (
        <div className="w-full text-white font-sans">
            {/* 1. HERO */}
            <Section className="items-start">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="flex flex-col-reverse md:flex-row items-center md:items-center gap-8 md:gap-12">
                        <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-white drop-shadow-lg text-center md:text-left">
                            Syed Wasim<br />Mahmud
                        </h1>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
                            <img
                                src="/profile.jpeg"
                                alt="Syed Wasim Mahmud"
                                className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white/10 object-cover shadow-2xl"
                            />
                        </div>
                    </div>
                    <SectionCard className="mt-8 max-w-lg !p-6 !rounded-2xl">
                        <p className="text-xl md:text-2xl font-light text-white">
                            Motivated Data Analyst | Machine Learning | AI Solutions
                        </p>
                    </SectionCard>
                </motion.div>
            </Section>

            {/* 2. ABOUT */}
            <Section className="items-end text-right">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <SectionCard className="max-w-xl">
                        <h2 className="text-5xl font-bold mb-8 text-white text-right border-r-8 border-cyan-500 pr-6">About Me</h2>
                        <p className="text-lg text-white mb-6 leading-relaxed font-medium">
                            Data Analyst with a strong foundation in machine learning, predictive analytics, and AI solutions.
                            Proficient in Python, SQL, Power BI, and AI agent development. Focused on solving complex problems through data-driven insights.
                        </p>

                        <div className="text-left bg-black/40 p-6 rounded-xl border border-white/10">
                            <h3 className="font-bold text-cyan-300 mb-2 text-xl">Education</h3>
                            <p className="text-lg text-gray-100">
                                BCA - Data Analytics<br />
                                Univ. of Science & Tech Meghalaya<br />
                                (2022 - 2025)
                            </p>
                        </div>
                    </SectionCard>
                </motion.div>
            </Section>

            {/* 3. SKILLS */}
            <Section className="items-start">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-4xl"
                >
                    <SectionCard>
                        <h2 className="text-5xl font-bold mb-8 text-white pl-6 border-l-8 border-cyan-500">Skills</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-cyan-300 mb-2">Machine Learning Programming & Analytics</h3>
                                <p className="text-white text-base leading-relaxed font-medium">
                                    Python (Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Scipy, Statsmodels), MySQL, Excel (Advanced), Power BI, Tableau, DAX, Hypothesis Testing, A/B Testing, Supervised/Unsupervised Learning, Time Series Forecasting, Model Tuning, Hyperparameter Tuning, Feature Engineering, ML Pipeline, ETL Pipelines
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-cyan-300 mb-2">AI & Emerging Tech</h3>
                                <p className="text-white text-base leading-relaxed font-medium">
                                    Generative AI, Prompt Engineering, Google ADK, Google AI Studio, AI Agents
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-cyan-300 mb-2">Core Competencies</h3>
                                <p className="text-white text-base leading-relaxed font-medium">
                                    Statistical Analysis, Predictive Modeling, Data Cleaning, Data Visualization, EDA, Business Intelligence, Communication, Analytical Thinking
                                </p>
                            </div>
                        </div>
                    </SectionCard>
                </motion.div>
            </Section>

            {/* 4. CERTIFICATIONS */}
            <Section className="items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full pt-16 pb-8 flex flex-col"
                >
                    <SectionCard className="w-full h-full flex flex-col !p-8">
                        <h2 className="text-5xl font-bold mb-10 text-center text-white drop-shadow-md border-b-4 border-cyan-500 pb-4 inline-block mx-auto">Certifications</h2>

                        <div className="flex-1 overflow-y-auto pr-4 no-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Major Certs */}
                                <CertCard title="TuteDude: Data Science" provider="TuteDude" />
                                <CertCard title="Google Analytics" provider="Google" />
                                <CertCard title="Foundations of Prompt Engineering" provider="AWS" />
                                <CertCard title="AI Agents 5-Day Intensive" provider="Google X Kaggle" />
                                <CertCard title="Gen AI 5-Day Intensive" provider="Google X Kaggle" />

                                {/* Simulation/Job */}
                                <CertCard title="BCG Data Science Job Simulation" provider="Forage" />
                                <CertCard title="Deloitte Data Analytics Job Simulation" provider="Forage" />

                                {/* Technical */}
                                <CertCard title="Power BI" provider="Microsoft Learn" />
                                <CertCard title="Intermediate SQL" provider="HackerRank" />

                                {/* Kaggle Collection */}
                                <div className="md:col-span-2 lg:col-span-3 bg-black/40 p-6 rounded-xl border border-white/20 shadow-lg">
                                    <h3 className="text-xl font-bold text-cyan-300 mb-3">Kaggle Certifications</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "Intro to Programming", "Geospatial Analysis", "Machine Learning Explainability",
                                            "Intro to AI Ethics", "Computer Vision", "Intro to Game AI and Reinforcement Learning",
                                            "Pandas", "Data Visualization", "Data Cleaning", "Time Series",
                                            "Intro to Deep Learning", "Intermediate Machine Learning", "Feature Engineering",
                                            "Advanced SQL", "Intro to SQL", "Intro to Machine Learning"
                                        ].map((c, i) => (
                                            <span key={i} className="text-sm px-3 py-1 bg-white/10 rounded-full text-white border border-white/20 font-medium">{c}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionCard>
                </motion.div>
            </Section>

            {/* 5. JOB SIMULATIONS */}
            <Section className="items-end">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-5xl"
                >
                    <SectionCard>
                        <h2 className="text-5xl font-bold mb-12 text-white text-right pr-6 border-r-8 border-cyan-500">Job Simulations</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-black/40 p-8 rounded-2xl border border-white/20 hover:bg-black/60 transition-colors shadow-xl">
                                <h3 className="text-3xl font-bold text-white mb-2">Boston Consulting Group</h3>
                                <p className="text-cyan-300 font-bold text-lg mb-4">Data Scientist Job Simulation (June 2025)</p>
                                <p className="text-lg text-gray-100 leading-relaxed">
                                    Formulated hypotheses, engineered features to enhance model accuracy, and delivered actionable recommendations.
                                </p>
                            </div>

                            <div className="bg-black/40 p-8 rounded-2xl border border-white/20 hover:bg-black/60 transition-colors shadow-xl">
                                <h3 className="text-3xl font-bold text-white mb-2">Deloitte</h3>
                                <p className="text-cyan-300 font-bold text-lg mb-4">Data Analytics Job Simulation (June 2025)</p>
                                <p className="text-lg text-gray-100 leading-relaxed">
                                    Created Tableau dashboards and Excel analyses using machine telemetry to improve operational efficiency.
                                </p>
                            </div>
                        </div>
                    </SectionCard>
                </motion.div>
            </Section>

            {/* 6. PROJECTS */}
            <Section className="items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full pt-20 pb-10 flex flex-col"
                >
                    <SectionCard className="w-full h-full flex flex-col !p-8">
                        <h2 className="text-5xl font-bold mb-10 text-center text-white drop-shadow-md border-b-4 border-cyan-500 pb-4 inline-block mx-auto">Featured Projects</h2>

                        {/* Styled Scroll Container */}
                        <div className="flex-1 overflow-y-auto pr-4 space-y-6 no-scrollbar border border-white/20 rounded-xl p-6 bg-black/40">
                            <ProjectCard
                                title="Customer Segmentation with ML and Power BI Dashboard"
                                link="https://github.com/kevinnn-git/customer-segmentation-with-dashboard"
                                tags={['Python', 'MySQL', 'Power BI', 'K-Means Clustering', 'ETL']}
                                desc={
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li>Designed and developed a Customer Segmentation & Analytics Dashboard to uncover customer behavior patterns, identify high-value segments, and drive data-informed revenue growth strategies.</li>
                                        <li>Constructed an end-to-end ETL pipeline using MySQL and Python (Pandas, NumPy, Matplotlib, Seaborn) for data extraction, transformation, and feature engineering including RFM metrics, encoding, and statistical analysis.</li>
                                        <li>Implemented K-Means clustering and built interactive Power BI dashboards with advanced DAX calculations and visual storytelling, enabling business teams to make actionable decisions from customer and transaction insights.</li>
                                    </ul>
                                }
                            />
                            <ProjectCard
                                title="Sales Forecasting with XGB Regressor"
                                link="https://github.com/kevinnn-git/sales-prediction-using-ML"
                                tags={['Python', 'Machine Learning', 'XGBoost', 'Optuna', 'EDA']}
                                desc={
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li>Developed a Sales Forecasting Model to predict revenue trends using Python and advanced machine learning techniques for business decision optimization.</li>
                                        <li>Performed data cleaning, exploratory data analysis (EDA), and feature engineering, including label encoding to improve model accuracy.</li>
                                        <li>Trained and optimized an XGBoost Regressor with Optuna hyperparameter tuning, and evaluated performance using R², MAE, MAPE, RMSE, and SMAPE, ensuring robust and reliable forecasting results.</li>
                                    </ul>
                                }
                            />
                            <ProjectCard
                                title="Federated Data Intelligence Swarm"
                                link="https://github.com/kevinnn-git/The-Federated-Data-Intelligence-Swarm-Google-X-Kaggle-5-Day-AI-Agents-Intensive-"
                                tags={['Google Gemini', 'AI Agents', 'SQL', 'Security', 'Microservices']}
                                desc={
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li>Features an "Analyst Agent" powered by Google Gemini that translates natural language into SQL queries and automatically debugs its own code if errors occur.</li>
                                        <li>Utilizes a specialized "Compliance Agent" that intercepts query results to redact PII (such as names and emails) using a hybrid approach of Regex and AI reasoning.</li>
                                        <li>Simulates a microservices environment where agents act independently and communicate via a structured protocol, ensuring a strict separation between data retrieval and security enforcement.</li>
                                    </ul>
                                }
                            />
                            <ProjectCard
                                title="Diabetes Classification Pipeline"
                                link="https://github.com/kevinnn-git/KNN_DIABETIES"
                                tags={['KNN', 'SMOTE', 'Optuna', 'K-Fold CV', 'Pipeline']}
                                desc={
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li><strong>Objective:</strong> Built a robust, production-ready pipeline to predict diabetes risk.</li>
                                        <li><strong>Methods:</strong> Utilized K-Nearest Neighbors (KNN) within a streamlined pipeline and applied SMOTE to resolve class imbalance.</li>
                                        <li><strong>Optimization:</strong> Integrated Optuna for automated hyperparameter tuning of distance metrics and neighbor counts.</li>
                                        <li><strong>Validation:</strong> Implemented K-Fold Cross-Validation to ensure reliability and prevent overfitting.</li>
                                    </ul>
                                }
                            />
                            <ProjectCard
                                title="Context Aware Video Summary Assistant"
                                link="https://github.com/kevinnn-git/Context-Aware-Video-Summary-Assistant-with-RAG-Gemini"
                                tags={['RAG', 'Gemini API', 'FAISS', 'NLP', 'Sentence-Transformers']}
                                desc={
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li>Developed an AI-powered educational assistant that analyzes YouTube video transcripts to automatically generate summaries, flashcards, MCQs, and curated learning resources.</li>
                                        <li>Implemented transcript extraction and semantic search pipeline using youtube-transcript-api, Sentence-Transformers, and FAISS indexing for efficient text retrieval and contextual understanding.</li>
                                        <li>Integrated Retrieval-Augmented Generation (RAG) with Gemini API and fewshot prompting to produce structured educational content, enhancing knowledge retention and learning engagement through visuals, quizzes, and smart recommendations.</li>
                                    </ul>
                                }
                            />
                            <ProjectCard
                                title="Cardiac Disease Classification System"
                                link="https://github.com/kevinnn-git/Cardiac_Diagnostics-XGBoost"
                                tags={['XGBoost', 'Optuna', 'K-Fold CV', 'Healthcare', 'Diagnostic']}
                                desc={
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li><strong>Objective:</strong> Built a diagnostic model to predict cardiac disease presence with high sensitivity.</li>
                                        <li><strong>Methods:</strong> Utilized XGBoost for classification and Optuna for automated hyperparameter tuning.</li>
                                        <li><strong>Validation:</strong> Implemented K-Fold Cross-Validation to ensure model generalization and rigorous testing.</li>
                                        <li><strong>Outcome:</strong> Delivered a robust, reliable predictor suitable for critical healthcare use cases.</li>
                                    </ul>
                                }
                            />
                            <ProjectCard
                                title="Time Series Sales Forecasting & Seasonality Analysis"
                                link="https://github.com/kevinnn-git/Sarima_Sales_Forecasting"
                                tags={['SARIMA', 'ADF Test', 'ACF/PACF', 'Grid Search', 'Time Series']}
                                desc={
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li><strong>Objective:</strong> Developed a time series model to predict sales trends and decode seasonality.</li>
                                        <li><strong>Methods:</strong> Applied SARIMA for modeling and the ADF Test to ensure data stationarity.</li>
                                        <li><strong>Optimization:</strong> Used ACF/PACF plots for feature selection and Grid Search for hyperparameter tuning.</li>
                                        <li><strong>Outcome:</strong> Achieved a robust forecast by effectively separating temporal signals from noise.</li>
                                    </ul>
                                }
                            />
                            <ProjectCard
                                title="Titanic Survival Prediction"
                                link="https://github.com/kevinnn-git/Titanic_Naive_Bayes"
                                tags={['Naive Bayes', 'Scikit-learn', 'Optuna', 'K-Fold CV', 'Classification']}
                                desc={
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li><strong>Objective:</strong> Engineered a production-style classification workflow to predict passenger survival.</li>
                                        <li><strong>Methods:</strong> Built Scikit-learn Pipelines to prevent data leakage and implemented Naive Bayes for probabilistic classification.</li>
                                        <li><strong>Optimization:</strong> Integrated Optuna for automated, dynamic hyperparameter fine-tuning.</li>
                                        <li><strong>Validation:</strong> Applied K-Fold Cross-Validation to ensure model stability and generalizability.</li>
                                    </ul>
                                }
                            />
                            <ProjectCard
                                title="COVID-19 Analysis"
                                link="https://github.com/kevinnn-git/covid19-analysis-on-python"
                                tags={['Pandas', 'NumPy', 'Seaborn', 'Data Analysis', 'Visualization']}
                                desc={
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li><strong>Objective:</strong> Developed a Python-based COVID-19 Data Analysis Project using Pandas, NumPy, Matplotlib, and Seaborn for end-to-end data collection, cleaning, and exploratory analysis.</li>
                                        <li><strong>Analysis:</strong> Performed statistical analysis and data visualization to uncover key trends, patterns, and metrics influencing virus spread, mortality, and recovery rates.</li>
                                        <li><strong>Outcome:</strong> Generated analytical reports and actionable insights that supported data-driven decision-making and improved understanding of infection trends and public health impact.</li>
                                    </ul>
                                }
                            />
                        </div>
                    </SectionCard>
                </motion.div>
            </Section>

            {/* 7. CONTACT */}
            <Section className="items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="w-full max-w-2xl"
                >
                    <SectionCard className="text-center !p-12">
                        <h2 className="text-6xl font-bold mb-6 text-white drop-shadow-lg">Let's Connect</h2>
                        <p className="text-2xl text-cyan-200 mb-10 font-light">Ready to deliver data-driven solutions.</p>

                        <div className="flex flex-col gap-6 text-xl items-center">
                            <div className="flex gap-4 flex-wrap justify-center">
                                <a href="mailto:wasimmahmud266@gmail.com" className="flex items-center gap-3 hover:text-cyan-400 transition-colors bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/10">
                                    <Mail className="w-6 h-6" />
                                    <span>wasimmahmud266@gmail.com</span>
                                </a>
                                <a href="tel:+916002589358" className="flex items-center gap-3 hover:text-cyan-400 transition-colors bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/10">
                                    <Phone className="w-6 h-6" />
                                    <span>+91 60025 89358</span>
                                </a>
                            </div>

                            <div className="flex gap-6 justify-center mt-2 w-full flex-wrap">
                                <a href="http://github.com/kevinnn-git" target="_blank" className="flex items-center gap-2 hover:text-cyan-400 transition-all hover:scale-105 bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:border-cyan-400/50">
                                    <Github className="w-6 h-6" />
                                    <span>GitHub</span>
                                </a>
                                <a href="http://linkedin.com/in/wasim-mahmud266" target="_blank" className="flex items-center gap-2 hover:text-cyan-400 transition-all hover:scale-105 bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:border-cyan-400/50">
                                    <Linkedin className="w-6 h-6" />
                                    <span>LinkedIn</span>
                                </a>
                                <a href="https://www.instagram.com/syed.wasimm" target="_blank" className="flex items-center gap-2 hover:text-cyan-400 transition-all hover:scale-105 bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:border-cyan-400/50">
                                    <Instagram className="w-6 h-6" />
                                    <span>Instagram</span>
                                </a>
                            </div>
                        </div>
                    </SectionCard>
                </motion.div>
            </Section>
        </div>
    )
}

const CertCard = ({ title, provider }) => (
    <div className="bg-black/40 hover:bg-black/60 p-5 rounded-lg border border-white/20 transition-all shadow-lg group">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{title}</h3>
        <p className="text-sm text-cyan-200 mt-1 font-medium">{provider}</p>
    </div>
)

const ProjectCard = ({ title, desc, tags, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block bg-black/40 hover:bg-black/60 p-8 rounded-2xl border border-white/20 transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/10 hover:shadow-2xl group">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{title}</h3>
            <span className="text-lg text-gray-400 group-hover:text-white transition-colors">↗</span>
        </div>

        <div className="text-gray-100 text-base mb-6 leading-relaxed font-medium">
            {desc}
        </div>

        <div className="flex gap-2 flex-wrap">
            {tags.map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1 bg-cyan-900/40 text-cyan-200 rounded-full border border-cyan-500/30 font-semibold">{tag}</span>
            ))}
        </div>
    </a>
)
