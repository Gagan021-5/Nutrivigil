import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, Heart, Droplet, Shield, Scale, AlertCircle, ChevronDown, CheckCircle, XCircle, Zap, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Protocol = () => {
    const [openProtocol, setOpenProtocol] = useState(null);

    const protocols = [
        {
            id: 'diabetes',
            title: 'Diabetes Management',
            icon: <Activity className="w-6 h-6" />,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/30',
            description: 'Manage blood sugar levels through mindful carbohydrate intake and balanced nutrition.',
            dos: [
                'Choose low-glycemic index foods',
                'Monitor carbohydrate portions',
                'Include fiber-rich foods',
                'Eat regular, balanced meals',
                'Stay hydrated with water'
            ],
            donts: [
                'Avoid sugary drinks and sodas',
                'Limit white bread and refined grains',
                'Skip processed snacks high in sugar',
                'Avoid fruit juices with added sugar',
                'Minimize fried and fatty foods'
            ],
            nutrients: [
                { name: 'Carbohydrates', note: 'Monitor intake, choose complex carbs' },
                { name: 'Fiber', note: 'Aim for 25-30g daily' },
                { name: 'Sugar', note: 'Limit added sugars, watch natural sugars' },
                { name: 'Protein', note: 'Include lean sources at each meal' }
            ]
        },
        {
            id: 'hypertension',
            title: 'Hypertension (High Blood Pressure)',
            icon: <Heart className="w-6 h-6" />,
            color: 'from-red-500 to-pink-500',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/30',
            description: 'Control blood pressure through reduced sodium intake and heart-healthy foods.',
            dos: [
                'Choose fresh, whole foods',
                'Use herbs and spices for flavor',
                'Include potassium-rich foods',
                'Eat fruits and vegetables daily',
                'Select low-sodium options'
            ],
            donts: [
                'Avoid adding table salt',
                'Limit processed and canned foods',
                'Skip salty snacks and chips',
                'Avoid pickled and preserved foods',
                'Minimize restaurant and fast food'
            ],
            nutrients: [
                { name: 'Sodium', note: 'Limit to <2,300mg daily (ideally <1,500mg)' },
                { name: 'Potassium', note: 'Increase intake (bananas, spinach)' },
                { name: 'Calcium', note: 'Support with low-fat dairy' },
                { name: 'Magnesium', note: 'Include nuts, seeds, whole grains' }
            ]
        },
        {
            id: 'heart',
            title: 'Heart Disease',
            icon: <Heart className="w-6 h-6" />,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/30',
            description: 'Protect heart health by managing cholesterol, fats, and maintaining healthy weight.',
            dos: [
                'Choose lean proteins (fish, poultry)',
                'Include omega-3 fatty acids',
                'Eat plenty of vegetables and fruits',
                'Select whole grains over refined',
                'Use healthy oils (olive, avocado)'
            ],
            donts: [
                'Avoid trans fats and partially hydrogenated oils',
                'Limit saturated fats (red meat, butter)',
                'Skip fried and greasy foods',
                'Avoid high-cholesterol foods',
                'Minimize processed meats'
            ],
            nutrients: [
                { name: 'Saturated Fat', note: 'Limit to <7% of daily calories' },
                { name: 'Cholesterol', note: 'Keep below 200mg daily' },
                { name: 'Omega-3', note: 'Eat fatty fish 2x per week' },
                { name: 'Fiber', note: 'Helps lower cholesterol' }
            ]
        },
        {
            id: 'kidney',
            title: 'Kidney Disease',
            icon: <Droplet className="w-6 h-6" />,
            color: 'from-teal-500 to-cyan-500',
            bgColor: 'bg-teal-500/10',
            borderColor: 'border-teal-500/30',
            description: 'Support kidney function by managing protein, potassium, phosphorus, and sodium.',
            dos: [
                'Control protein portions (consult dietitian)',
                'Choose low-potassium fruits and vegetables',
                'Select low-phosphorus foods',
                'Stay within fluid limits if prescribed',
                'Monitor portion sizes carefully'
            ],
            donts: [
                'Avoid high-potassium foods (bananas, oranges)',
                'Limit dairy and high-phosphorus foods',
                'Skip processed foods high in sodium',
                'Avoid dark colas and certain beverages',
                'Minimize protein from red meat'
            ],
            nutrients: [
                { name: 'Protein', note: 'Moderate intake as advised by doctor' },
                { name: 'Potassium', note: 'Limit to recommended levels' },
                { name: 'Phosphorus', note: 'Avoid additives in processed foods' },
                { name: 'Sodium', note: 'Keep intake low' }
            ]
        },
        {
            id: 'obesity',
            title: 'Obesity & Weight Management',
            icon: <Scale className="w-6 h-6" />,
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/30',
            description: 'Achieve healthy weight through balanced nutrition, portion control, and mindful eating.',
            dos: [
                'Eat nutrient-dense, low-calorie foods',
                'Practice portion control',
                'Include plenty of vegetables',
                'Choose lean proteins',
                'Stay physically active regularly'
            ],
            donts: [
                'Avoid sugary beverages and snacks',
                'Limit high-calorie processed foods',
                'Skip large portions and second helpings',
                'Avoid eating out of boredom or stress',
                'Minimize fried and fatty foods'
            ],
            nutrients: [
                { name: 'Calories', note: 'Create a moderate deficit (500-750 cal/day)' },
                { name: 'Protein', note: 'Helps preserve muscle during weight loss' },
                { name: 'Fiber', note: 'Promotes fullness and satiety' },
                { name: 'Water', note: 'Drink plenty to support metabolism' }
            ]
        },
        {
            id: 'allergies',
            title: 'Food Allergies',
            icon: <Shield className="w-6 h-6" />,
            color: 'from-yellow-500 to-orange-500',
            bgColor: 'bg-yellow-500/10',
            borderColor: 'border-yellow-500/30',
            description: 'Avoid allergens and prevent cross-contamination while maintaining balanced nutrition.',
            dos: [
                'Read all food labels carefully',
                'Ask about ingredients when eating out',
                'Carry emergency medication (if prescribed)',
                'Inform others about your allergies',
                'Find safe alternatives for nutrients'
            ],
            donts: [
                'Never consume known allergens',
                'Avoid foods with unclear ingredients',
                'Don\'t assume "may contain" is safe',
                'Avoid cross-contaminated surfaces',
                'Don\'t risk trying new foods without checking'
            ],
            nutrients: [
                { name: 'Common Allergens', note: 'Milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soy' },
                { name: 'Nutritional Gaps', note: 'Replace nutrients from avoided foods' },
                { name: 'Cross-Contamination', note: 'Be vigilant in food preparation' },
                { name: 'Emergency Plan', note: 'Always be prepared' }
            ]
        }
    ];

    const toggleProtocol = (id) => {
        setOpenProtocol(openProtocol === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]">
                <div className="max-w-7xl mx-auto">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Health Protocols
                            </h1>
                            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Evidence-based dietary guidelines tailored to your specific health conditions
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Supported Conditions */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Supported Health Conditions</h2>
                    
                    <div className="space-y-4">
                        {protocols.map((protocol, index) => (
                            <motion.div
                                key={protocol.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className={`${protocol.bgColor} border ${protocol.borderColor} rounded-2xl overflow-hidden backdrop-blur-sm`}
                            >
                                {/* Protocol Header */}
                                <button
                                    onClick={() => toggleProtocol(protocol.id)}
                                    className="w-full px-6 py-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${protocol.color} flex items-center justify-center text-white`}>
                                            {protocol.icon}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-bold">{protocol.title}</h3>
                                            <p className="text-sm text-gray-400">{protocol.description}</p>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ${
                                            openProtocol === protocol.id ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Protocol Content */}
                                <AnimatePresence>
                                    {openProtocol === protocol.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 space-y-6 border-t border-gray-700/50">
                                                {/* Do's and Don'ts */}
                                                <div className="grid md:grid-cols-2 gap-6 pt-6">
                                                    {/* Do's */}
                                                    <div className="bg-[#0a0e1a]/50 p-5 rounded-xl border border-green-500/20">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                                            <h4 className="font-bold text-green-400">Recommended (Do's)</h4>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {protocol.dos.map((item, idx) => (
                                                                <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                                                                    <span className="text-green-400 mt-1">✓</span>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Don'ts */}
                                                    <div className="bg-[#0a0e1a]/50 p-5 rounded-xl border border-red-500/20">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <XCircle className="w-5 h-5 text-red-400" />
                                                            <h4 className="font-bold text-red-400">Avoid (Don'ts)</h4>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {protocol.donts.map((item, idx) => (
                                                                <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                                                                    <span className="text-red-400 mt-1">✗</span>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Key Nutrients */}
                                                <div className="bg-[#0a0e1a]/50 p-5 rounded-xl border border-purple-500/20">
                                                    <h4 className="font-bold text-purple-400 mb-4 flex items-center gap-2">
                                                        <AlertCircle className="w-5 h-5" />
                                                        Key Nutrients to Monitor
                                                    </h4>
                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        {protocol.nutrients.map((nutrient, idx) => (
                                                            <div key={idx} className="text-sm">
                                                                <span className="font-semibold text-white">{nutrient.name}:</span>
                                                                <span className="text-gray-400 ml-1">{nutrient.note}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Help */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]/30">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How NutriVigil Helps</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800 text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mx-auto mb-4">
                                <Brain className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI Protocol Analysis</h3>
                            <p className="text-gray-400">
                                Our AI cross-references food items with your selected health protocols to provide accurate recommendations
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800 text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mx-auto mb-4">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Personalized Recommendations</h3>
                            <p className="text-gray-400">
                                Get tailored nutrition advice based on your specific health conditions and dietary needs
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800 text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white mx-auto mb-4">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Real-Time Safety Checks</h3>
                            <p className="text-gray-400">
                                Instant traffic light signals (Green/Yellow/Red) for every food you scan based on your protocols
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Medical Disclaimer */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-2xl p-8"
                    >
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-2xl font-bold text-yellow-400 mb-3">Important Medical Disclaimer</h3>
                                <div className="space-y-3 text-gray-300">
                                    <p>
                                        <strong>NutriVigil provides educational information and general guidance only.</strong> Our recommendations are based on evidence-based dietary guidelines but should not replace professional medical advice, diagnosis, or treatment.
                                    </p>
                                    <p>
                                        Always consult your healthcare provider, registered dietitian, or qualified medical professional before making significant changes to your diet, especially if you have existing health conditions or take medications.
                                    </p>
                                    <p>
                                        Individual nutritional needs vary greatly based on medical history, current health status, medications, and other factors. What works for one person may not be appropriate for another.
                                    </p>
                                    <p className="font-semibold text-yellow-400">
                                        In case of emergency or severe symptoms, seek immediate medical attention.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-purple-500/20">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Set up your health profile and receive personalized nutrition recommendations
                        </p>
                        <Link 
                            to="/scanner" 
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                        >
                            <Zap className="w-5 h-5" />
                            Start Scanning Food
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Protocol;
